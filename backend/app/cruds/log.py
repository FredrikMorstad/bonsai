from sqlalchemy.orm import Session
from app.schemas import Log_base
from app.models import Log

def create_log(db: Session, new_entry: Log_base):
    db_log = Log(**new_entry.dict())
    db.add(db_log)
    db.commit()
    return db_log

def get_plant_log(db: Session, pid: int):
    return db.query(Log).filter(Log.plant_pid == pid).all()

