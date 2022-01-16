from fastapi import APIRouter, Depends, HTTPException, status
from asyncpg.exceptions import ForeignKeyViolationError

from ..users.utils import get_current_user
from ..users.schemas import Serializer as SerializedUser

from .schemas import Model, SimpleComment
from .models import Comment as Entity

router = APIRouter(prefix="/comments", tags=["comments"])


@router.get("/")
async def list_for_user(user: SerializedUser = Depends(get_current_user)):
    entities = (
        await Entity.query.where(Entity.user_id == user["id"])
        .order_by(Entity.created_at)
        .gino.all()
    )
    result = [
        Model(
            song_id=entity.song_id,
            user_id=user["id"],
            data=entity.data,
        )
        for entity in entities
    ]
    return result


@router.get("/{sid}")
async def list_for_song(sid: int, user: SerializedUser = Depends(get_current_user)):
    entities = (
        await Entity.query.where(Entity.song_id == sid)
        .order_by(Entity.created_at)
        .gino.all()
    )
    result = [
        Model(
            id=entity.id,
            song_id=entity.song_id,
            user_id=entity.user_id,
            data=entity.data,
        )
        for entity in entities
    ]
    return result


@router.get("/{uid}")
async def get(uid: int, user: SerializedUser = Depends(get_current_user)):
    if (
        entity := await Entity.query.where(Entity.id == uid)
        .where(Entity.user_id == user["id"])
        .gino.first()
    ):
        return entity.to_dict()
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The requested resource does not exist.",
        )


@router.post("/{sid}")
async def add(
    sid: int, entity: SimpleComment, user: SerializedUser = Depends(get_current_user)
) -> Model:
    try:
        entity_created = await Entity.create(
            song_id=sid,
            user_id=user["id"],
            data=entity.data,
        )
        return entity_created.to_dict()
    except ForeignKeyViolationError as e:
        raise HTTPException(
            status_code=status.HTTP_406_NOT_ACCEPTABLE,
            detail=e.detail,
        )


@router.delete("/{uid}")
async def delete(uid: int, user: SerializedUser = Depends(get_current_user)):
    if (
        entity := await Entity.query.where(Entity.id == uid)
        .where(Entity.user_id == user["id"])
        .gino.first()
    ):
        return await entity.delete()
    else:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The requested resource does not exist.",
        )
