from jwt import decode, ExpiredSignatureError, InvalidTokenError
from typing import Optional, Dict, Any
from fastapi import Depends, HTTPException, status

from .auth import oauth2
from .schemas import Serializer
from .models import User as Entity
from fastapi_demo.config import config


async def authenticate(nickname: str, password: str) -> Optional[Dict[str, Any]]:
    if user := await Entity.query.where(Entity.nickname == nickname).gino.first():
        if user.verify_password(password):
            return user.as_dict()
        return None
    return None


async def get_current_user(token: str = Depends(oauth2)) -> Dict[str, Any]:
    try:
        payload = decode(
            token.encode("utf-8"), config("SECRET"), algorithms=[config("ALGORITHM")]
        ).get("payload")
        if user := await Entity.get(payload.get("id")):
            return user.as_dict()
    except ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Expired token.",
        )
    except InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=e.detail,
        )
    raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found.",
        )
