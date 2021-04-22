import uvicorn
from fastapi import FastAPI
from app import plant, db

def create_app():
    app = FastAPI(
        title=db.get_title(),
        docs_url="/",
    )

    app.include_router(plant.router, prefix="/api/plant", tags=['plant'])

    return app

app = create_app()

if __name__ == "__main__":
    uvicorn.run("manage:app", host="0.0.0.0", port=5000, reload=True)
