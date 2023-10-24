import io
import re
from typing import Optional, cast
from urllib.parse import urljoin

from loguru import logger
import pyaixm
from astral import Observer
from astral.sun import sunrise, sunset
from bs4 import BeautifulSoup, Tag
from pydantic import AwareDatetime, BaseModel, computed_field, field_validator

from ..utils import AiohttpClient, ClientConnectorError, RedisClient


class Aerodrome(BaseModel):
    locationIndicatorICAO: str
    latitude: float
    longitude: float
    elevation: float

    @computed_field  # type: ignore[misc]
    @property
    def sunrise(self) -> AwareDatetime:
        # elevation in Observer is prominece not elevation above MSL
        return sunrise(Observer(self.latitude, self.longitude, 0))

    @computed_field  # type: ignore[misc]
    @property
    def sunset(self) -> AwareDatetime:
        # elevation in Observer is prominece not elevation above MSL
        return sunset(Observer(self.latitude, self.longitude, 0))

    @field_validator("elevation", "latitude", "longitude", mode="before")
    @classmethod
    def str_to_float_validator(cls, v: str) -> float:
        return float(v)


async def get_dfs_aixm_url(dataset: str) -> Optional[str]:
    async with AiohttpClient.get() as aiohttp_client:
        res = await aiohttp_client.get("https://aip.dfs.de/datasets/scripts/getAmdtData.php?amdt=0")
        html = BeautifulSoup(await res.text(), "html.parser")
    sibling_section = html.find("span", string=re.compile(f".*{dataset}.*"))

    if sibling_section:
        section = sibling_section.find_next_sibling(class_="release")
        if section and section.find("a"):
            path = cast(Tag, section.find("a"))["href"]
            return urljoin("https://aip.dfs.de/datasets/", cast(str, path))

    return None


async def fetch_dfs_ad_data() -> None:
    """Periodically fetch sector data."""
    redis_client = await RedisClient.get()

    try:
        keys = await redis_client.keys("dfs:ad:*")

        if len(keys):
            logger.info("DFS data already found, not fetching")
            return

        aixm_url = await get_dfs_aixm_url("AirportHeliport")

        if aixm_url is None:
            logger.error("Could not find AirportHeliport URL")
            return

        async with AiohttpClient.get() as aiohttp_client:
            res = await aiohttp_client.get(aixm_url)
            byts = io.BytesIO(await res.read())
        ad_data = pyaixm.parse(byts, resolve_xlinks=False)

    except ClientConnectorError as e:
        logger.error(f"Could not connect: {str(e)}")
        return

    arps = {
        ad.locationIndicatorICAO: ad.ARP
        for ad in ad_data
        if isinstance(ad, pyaixm.aixm_types.feature_types["AirportHeliport"])
        and isinstance(ad.locationIndicatorICAO, str)
    }

    async with redis_client.pipeline() as pipe:
        for icao, arp in arps.items():
            lat, long = arp.pos.split(" ")
            if isinstance(arp.elevation, str):
                ad = Aerodrome.model_validate(
                    {
                        "locationIndicatorICAO": icao,
                        "latitude": lat,
                        "longitude": long,
                        "elevation": arp.elevation,
                    }
                )
                pipe.set(f"dfs:ad:{icao}", ad.model_dump_json())

        await pipe.execute()
