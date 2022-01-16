from datetime import datetime
from fastapi_demo.models import db


class Song(db.Model):
    __tablename__ = "songs"

    id = db.Column(db.BigInteger(), primary_key=True)

    user_id = db.Column(db.BigInteger(), db.ForeignKey("users.id"))

    title = db.Column(db.String(), nullable=False)
    artist = db.Column(db.String(), nullable=False)
