from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..db import get_db, Base, engine
from ..schemas import Measurement_base,Measurement_model, Log_base
from ..cruds.plant import get_plant
from ..utils import valid_action
from ..api.log_endpoint import create_new_log_entry
from ..cruds.measurement import create_measurment

Base.metadata.create_all(bind=engine)
router = APIRouter()

@router.post("/", response_model=Measurement_base)
def create_new_measurement(measurment: Measurement_base, db:Session=Depends(get_db)):
    # create new log entry checks plant_pid
    log_entry_dict = {"plant_pid" : measurment.plant_pid, "action" : 4}
    entry = create_new_log_entry(Log_base(**log_entry_dict), db)

    entry_data = {**measurment.dict(), "log_timestamp" : entry.timestamp}
    m = create_measurment(db, Measurement_model(**entry_data))
    return m

    

