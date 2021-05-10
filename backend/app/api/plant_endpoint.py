from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db, Base, engine
from ..schemas import Plant_base, Plant_model
from ..curds.plant import create_plant, get_plant

Base.metadata.create_all(bind=engine)
router = APIRouter()

@router.get("/{pid}", response_model=Plant_base)
def get_plant_by_pid(pid:int, db: Session=Depends(get_db)):
    return get_plant(db, pid)

@router.post("/", response_model=Plant_base)
def create_new_plant(new_plant: Plant_base, db: Session=Depends(get_db)):
    db_plant = create_plant(db, new_plant)
    return db_plant
