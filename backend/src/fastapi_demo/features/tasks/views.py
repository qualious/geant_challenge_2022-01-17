from datetime import date

from fastapi import APIRouter

from pydantic import BaseModel

from .models import Task as Entity


router = APIRouter(prefix="/tasks", tags=["tasks"])


class SimpleModel(BaseModel):
    title: str
    desc: str
    due: date


@router.get("/")
async def get_all():
    entities = await Entity.query.gino.all()
    result = [
        SimpleModel(
            title=entity.title,
            desc=entity.description,
            due=entity.due_date,
        )
        for entity in entities
    ]
    return result


@router.get("/{uid}")
async def get(uid: int):
    entity = await Entity.get_or_404(uid)
    return entity.to_dict()


@router.post("/")
async def add(entity: SimpleModel):
    entity_created = await Entity.create(
        title=entity.title,
        description=entity.desc,
        due_date=entity.due,
    )
    return entity_created.to_dict()


@router.delete("/{uid}")
async def delete(uid: int):
    entity = await Entity.get_or_404(uid)
    await entity.delete()
    return dict(id=uid)
