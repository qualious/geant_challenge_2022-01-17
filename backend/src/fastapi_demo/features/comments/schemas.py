from pydantic import BaseModel


class SimpleComment(BaseModel):
    data: str


class Model(SimpleComment):
    id: int
    song_id: int
    user_id: int
