from sqlalchemy.orm import Session
from app.schemas import Measurement_model
from app.models import Measurement

def create_measurment(db: Session, measurement_entry: Measurement_model):
    measurment = Measurement(**measurement_entry.dict())
    db.add(measurment)
    db.commit()
    return measurment

