from bcrypt import checkpw
from typing import Dict, Any
from fastapi_demo.models import db

from .schemas import Serializer

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.BigInteger(), primary_key=True)
    nickname = db.Column(db.Unicode(), nullable=False, unique=True)
    email = db.Column(db.String(), nullable=False, unique=True)
    password = db.Column(db.LargeBinary(100), nullable=False)

    def verify_password(self, password) -> bool:
        return checkpw(password.encode("utf-8"), self.password)

    def serialize(self) -> Dict[str, Any]:
        return Serializer(**self.to_dict())

    def as_dict(self) -> Dict[str, Any]:
        return {k: v for k, v in self.to_dict().items() if k != "password"}