from .views import router


def init_app(app):
    app.include_router(router)
