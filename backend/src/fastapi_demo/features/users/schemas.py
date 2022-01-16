from pydantic import BaseModel


class Simple(BaseModel):
    nickname: str
    email: str


class Serializer(Simple):
    id: int


class Create(Simple):
    password: str


class Token(BaseModel):
    user_id: int
    access_token: str
    token_type: str
    refresh_token: str
    expires_in: int
