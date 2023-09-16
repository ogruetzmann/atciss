"""Application controllers - metar."""

from typing import Annotated, List, Optional, cast
from atciss.app.views.controller import Controller
from fastapi import APIRouter, Depends

from pydantic import TypeAdapter

from ..controllers.auth import get_user
from ..models import User

from ..utils.redis import RedisClient


router = APIRouter()


@router.get(
    "/controller/",
    tags=["vatsim"],
)
async def controller_get(
    user: Annotated[User, Depends(get_user)],
) -> List[Controller]:
    """Get online Vatsim controllers."""
    redis_client = RedisClient.open()

    controllers = []
    controller_keys = await redis_client.keys("vatsim:controller:*")
    for c in controller_keys:
        controller_json = cast(Optional[str], await redis_client.get(c))
        if controller_json is None:
            continue
        controllers.append(TypeAdapter(Controller).validate_json(controller_json))

    return controllers
