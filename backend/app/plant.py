from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .db import session_local, engine
from . import curd, models, schemas

router = APIRouter()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = session_local()
    try :
        yield db
    finally:
        db.close()

@router.get("/{pid}", response_model=schemas.Plant)
def get_plant(pid:int, db: Session=Depends(get_db)):
    plant = curd.getPlant(db, plant_id=pid)
    print(plant)
    if not plant:
        raise HTTPException(status_code=400, detail="Plant not found")
    return plant

@router.post("/", response_model=schemas.Plant)
def create_plant(data:float, db: Session=Depends(get_db)):
    return curd.createPlant(db, data=data)
    
