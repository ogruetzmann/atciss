"""Application controllers - metar."""
import logging
from typing import Annotated, Dict, List, cast

from fastapi import APIRouter, Depends, HTTPException, Query

from atciss.app.controllers.auth import get_cid

from ..views.notam import NotamModel

from ..utils.redis import RedisClient

router = APIRouter()
log = logging.getLogger(__name__)


@router.get(
    "/notam/",
    tags=["notam"],
)
async def notam_get(
    cid: Annotated[str, Depends(get_cid)],
    icao: Annotated[List[str], Query(...)],
) -> Dict[str, List[NotamModel]]:
    """Get METAR for airport."""
    redis_client = RedisClient.open()
    notams = {}

    for i in icao:
        i = i.upper()
        notam_keys = await redis_client.keys("notam:{}:*".format(i))
        notam_text = cast(list[str], await redis_client.mget(notam_keys))
        icao_notams = [NotamModel.from_str(n) for n in notam_text]
        notams[i] = icao_notams

    if len(notams) < 1:
        raise HTTPException(status_code=404)

    return notams
