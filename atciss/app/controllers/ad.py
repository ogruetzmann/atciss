"""Application controllers - metar."""
from typing import Annotated, Dict, List, cast
from fastapi import APIRouter, Depends, Query

from ..tasks.dfs_ad import Aerodrome
from ..utils.redis import RedisClient

from .auth import get_cid

router = APIRouter()


@router.get(
    "/aerodrome/",
    tags=["wx"],
)
async def ad_get(
    icao: Annotated[List[str], Query(...)], cid: Annotated[str, Depends(get_cid)]
) -> Dict[str, Aerodrome]:
    """Get METAR for airport."""
    redis_client = RedisClient.open()

    ads = {}
    for i in icao:
        i = i.upper()
        ad_json = cast(str, await redis_client.get(f"dfs:ad:{i}"))
        ads[i] = Aerodrome.model_validate_json(ad_json)

    return ads
