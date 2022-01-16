from pydantic import BaseModel


class SimpleSong(BaseModel):
    title: str
    artist: str

class Model(SimpleSong):
    id: int