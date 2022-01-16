from fastapi import FastAPI
from importlib.metadata import entry_points
from logging import getLogger as get_logger
from fastapi.middleware.cors import CORSMiddleware

from .models import db


logger = get_logger(__name__)


def load_modules(app=None):
    for ep in entry_points()[f"{__package__}.modules"]:
        logger.info("Loading module: %s", ep.name)
        mod = ep.load()
        if not app:
            continue
        init_app = getattr(mod, "init_app", None)
        if not init_app:
            continue
        init_app(app)


origins = [
    "http://localhost:3000",
]

def get_app():
    app = FastAPI(title="FastAPI Demo")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    db.init_app(app)
    load_modules(app)
    return app
