import uvicorn
from fastapi import FastAPI
from app import db
from app.api import user_endpoint, plant_endpoint, log_endpoint, measurement_endpoint, auth


def create_app():
    app = FastAPI(
        title=db.get_title(),
        docs_url="/",
    )

    app.include_router(user_endpoint.router, prefix="/api/user", tags=['User'])
    app.include_router(auth.router, prefix="/api/auth", tags=['Auth'])
    app.include_router(plant_endpoint.router, prefix="/api/plant", tags=['Plant'])
    app.include_router(log_endpoint.router, prefix="/api/log", tags=['Log'])
    app.include_router(measurement_endpoint.router, prefix="/api/measurment", tags=['Measurement'])

    return app

app = create_app()

if __name__ == "__main__":
    uvicorn.run("manage:app", host="0.0.0.0", port=5000, reload=True)
