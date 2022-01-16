from datetime import datetime
from fastapi_demo.models import db


class Comment(db.Model):
    __tablename__ = "comments"

    id = db.Column(db.BigInteger(), primary_key=True)

    song_id = db.Column(db.BigInteger(), db.ForeignKey("songs.id"))
    user_id = db.Column(db.BigInteger(), db.ForeignKey("users.id"))

    data = db.Column(db.String())
    created_at = db.Column(db.DateTime(), default=datetime.now(), nullable=False)
