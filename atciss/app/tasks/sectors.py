import logging
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

from pydantic import TypeAdapter

from ..utils import AiohttpClient, RedisClient, repeat_every

log = logging.getLogger(__name__)

# check https://github.com/lennycolton/vatglasses-data/tree/main/data
SECTOR_REGIONS = ["austria", "czechia", "germany", "poland"]
# TODO add italy and switzerland when available

Coordinate = Tuple[str, str] | Tuple[float, float]


@dataclass
class Sector:
    points: List[Coordinate]
    min: Optional[int] = None
    max: Optional[int] = None


@dataclass
class Airspace:
    id: str
    group: str
    owner: List[str]
    sectors: List[Sector] = field(default_factory=list)


@dataclass
class SectorGroup:
    name: str


@dataclass
class Colour:
    hex: str


@dataclass
class Position:
    pre: List[str]
    type: str
    frequency: str
    callsign: str
    colours: List[Colour] = field(default_factory=list)


@dataclass
class Airport:
    callsign: str
    coord: Coordinate
    topdown: List[str]


@dataclass
class SectorData:
    airspace: List[Airspace]
    groups: Dict[str, SectorGroup]
    positions: Dict[str, Position]
    callsigns: Dict[str, Dict[str, str]]
    airports: Dict[str, Airport]


@repeat_every(seconds=3600, logger=log)
async def fetch_sector_data() -> None:
    """Periodically fetch sector data."""
    redis_client = await RedisClient.open()
    aiohttp_client = AiohttpClient.get()

    data: Dict[str, SectorData] = {}
    for region in SECTOR_REGIONS:
        res = await aiohttp_client.get(
            "https://raw.githubusercontent.com/lennycolton/vatglasses-data/main/data"
            + f"/{region}.json"
        )
        data[region] = TypeAdapter(SectorData).validate_python(
            await res.json(content_type="text/plain")
        )

    log.info("Sector data received")

    async with redis_client.pipeline() as pipe:
        for region, region_data in data.items():
            pipe.set(
                f"sector:airports:{region}", TypeAdapter(Dict[str, Airport]).dump_json(region_data.airports)
            )
            pipe.set(
                f"sector:positions:{region}",
                TypeAdapter(Dict[str, Position]).dump_json(region_data.positions),
            )
            pipe.set(
                f"sector:airspaces:{region}",
                TypeAdapter(List[Airspace]).dump_json(region_data.airspace),
            )
        await pipe.execute()
