from sqlalchemy import Column, Integer, Float
from .db import Base


class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    data = Column(Float)
