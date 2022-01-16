from fastapi import APIRouter, Depends, HTTPException, status

from ..users.utils import get_current_user
from ..users.schemas import Serializer as SerializedUser

from .schemas import Model, SimpleSong
from .models import Song as Entity


router = APIRouter(prefix="/songs", tags=["songs"])


@router.get("/")
async def list_for_user(user: SerializedUser = Depends(get_current_user)):
    entities = await Entity.query.where(Entity.user_id == user["id"]).gino.all()
    result = [
        Model(
            id=entity.id,
            title=entity.title,
            artist=entity.artist,
        )
        for entity in entities
    ]
    return result


@router.get("/{uid}")
async def get(uid: int, _: SerializedUser = Depends(get_current_user)):
    if entity := await Entity.query.where(Entity.id == uid).gino.first():
        return entity.to_dict()
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The requested resource does not exist.",
        )


@router.post("/")
async def add(entity: SimpleSong, user: SerializedUser = Depends(get_current_user)):
    entity_created = await Entity.create(
        title=entity.title,
        artist=entity.artist,
        user_id=user["id"],
    )
    return entity_created.to_dict()


@router.delete("/{uid}")
async def delete(uid: int, user: SerializedUser = Depends(get_current_user)):
    if entity := await Entity.query.where(
        Entity.id == uid, Entity.user_id == user["id"]
    ).gino.first():
        return await entity.delete()
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The requested resource does not exist.",
        )
