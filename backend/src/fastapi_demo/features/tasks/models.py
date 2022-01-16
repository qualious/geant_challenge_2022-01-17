from fastapi_demo.models import db


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.BigInteger(), primary_key=True)
    title = db.Column(db.Unicode())
    description = db.Column(db.Unicode(), default="<no-description>")
    due_date = db.Column(db.Date)
