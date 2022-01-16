from jwt import encode
from typing import Optional, Dict
from bcrypt import hashpw, gensalt
from datetime import datetime, timedelta, timezone
from asyncpg.exceptions import UniqueViolationError
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import APIRouter, Depends, HTTPException, status

from fastapi_demo.config import config
from .utils import authenticate, get_current_user
from .models import User as Entity
from .schemas import Create, Token, Serializer as SerializedUser

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/")
async def add(entity: Create) -> Optional[SerializedUser]:
    try:
        entity_created = await Entity.create(
            nickname=entity.nickname,
            email=entity.email,
            password=hashpw(entity.password.encode("utf-8"), gensalt()),
        )
        return Token(
            user_id=entity_created.id,
            access_token=encode(
                dict(
                    payload=entity_created.as_dict(),
                    exp=datetime.now(tz=timezone.utc) + timedelta(seconds=3600),
                ),
                config("SECRET"),
            ),
            token_type="bearer",
            refresh_token="placeholder",
            expires_in="3600",
        )
    except UniqueViolationError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=e.detail,
        )


@router.get("/{uid}")
async def get(
    uid: int, _: SerializedUser = Depends(get_current_user)
) -> SerializedUser:
    entity = await Entity.get_or_404(uid)
    return entity.serialize()


@router.delete("/{uid}")
async def delete(
    uid: int, user: SerializedUser = Depends(get_current_user)
) -> Dict[str, int]:
    # NOTE: Ideally, we would have roles with which users can delete
    # other users. But for simplicity's sake only users can delete themselves.
    if uid == user["id"]:
        entity = await Entity.get_or_404(uid)
        await entity.delete()
        return dict(id=uid)
    else:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized.",
        )


@router.post("/token")
async def generate_token(
    form: OAuth2PasswordRequestForm = Depends(),
) -> Optional[Token]:
    if user := await authenticate(nickname=form.username, password=form.password):
        return Token(
            user_id=user["id"],
            access_token=encode(
                dict(
                    payload=user,
                    exp=datetime.now(tz=timezone.utc) + timedelta(seconds=3600),
                ),
                config("SECRET"),
            ),
            token_type="bearer",
            refresh_token="placeholder",
            expires_in="3600",
        )
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid username or password.",
    )


@router.get("/me")
async def me(user: SerializedUser = Depends(get_current_user)) -> SerializedUser:
    return user
