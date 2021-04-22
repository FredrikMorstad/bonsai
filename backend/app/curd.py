from sqlalchemy.orm import Session
from . import models, schemas

def getPlant(db: Session, plant_id: int):
    return db.query(models.Plant).filter(models.Plant.id == plant_id).first()

def createPlant(db: Session, data: float):
    db_plant = models.Plant(data=data)
    db.add(db_plant)
    db.commit()
    db.refresh(db_plant)
    return db_plant

