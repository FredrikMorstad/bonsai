from sqlalchemy.orm import Session
from app.schemas import Plant_base
from app.models import Plant

def get_plant(db: Session, pid: int):
    return db.query(Plant).filter(Plant.pid == pid).first()

def create_plant(db: Session, new_plant: Plant_base):
    db_plant = Plant(**new_plant.dict())
    db.add(db_plant)
    db.commit()
    return db_plant

