from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..schemas import Log_base, Log_model
from ..curds.log import create_log, get_plant_log
from ..curds.plant import get_plant
from ..db import get_db, Base, engine
from ..utils import valid_action
from math import floor

Base.metadata.create_all(bind=engine)
router = APIRouter()

@router.post("/", response_model=Log_model)
def create_new_log_entry(new_entry: Log_base, db: Session=Depends(get_db)):
    if not valid_action(new_entry.action):
        raise HTTPException(400, detail="Invalid action")
    
    plant = get_plant(db, new_entry.plant_pid)

    if not plant:
        raise HTTPException(404, detail="Plant not found")

    log_entry = create_log(db, new_entry)
    return log_entry

@router.get("/{pid}")
def get_plant_log_by_pid(pid: int, db:Session=Depends(get_db)):
    plant = get_plant(db, pid)

    if not plant:
        raise HTTPException(404, detail="Plant not found")

    return get_plant_log(db, pid)
