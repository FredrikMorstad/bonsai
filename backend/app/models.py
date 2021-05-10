from sqlalchemy import Table, Column, Integer, Float, String, DateTime, types, ForeignKey
from sqlalchemy.schema import PrimaryKeyConstraint
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from sqlalchemy_utils import EmailType, NumericRangeType, PhoneNumberType
from passlib.hash import pbkdf2_sha256
from .db import Base
import datetime

user_plant_table = Table( 'user_plant', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.user_id')),
    Column('pid', Integer, ForeignKey('plants.pid'))
)

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(30), nullable=False)
    last_name = Column(String(45), nullable=False)
    username = Column(String(45), unique=True)
    email = Column(EmailType, unique=True)
    password = Column(String(300), nullable=False)
    role = Column(String(40), default='user')
    # phone = Column(PhoneNumberType)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_login = Column(DateTime(timezone=True), server_default=func.now())

    plants = relationship("Plant", secondary=user_plant_table, back_populates="users")

    def __init__(self, password: str, **kwargs):
        self.password = pbkdf2_sha256.hash(password)
        super().__init__(password=self.password, **kwargs)

    def validate_password(self, password: str):
        return pbkdf2_sha256.verify(password, self.password)

class Plant(Base):
    __tablename__ = "plants"

    pid = Column(Integer, primary_key=True, index=True)
    name = Column(String(30), nullable=False)
    age = Column(Integer)
    type = Column(String(50), nullable=False)
    temperature_min = Column(Float, nullable=False)
    temperature_max = Column(Float, nullable=False)
    humidity_min = Column(Float, nullable=False)
    humidity_max = Column(Float, nullable=False)
    soil_moisture_min = Column(Float, nullable=False)
    soil_moisture_max = Column(Float, nullable=False)
    region = Column(String, nullable=False)
    critical = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    users = relationship("User", secondary=user_plant_table, back_populates='plants')

class Log(Base):
    __tablename__ = "logs"
    
    plant_pid = Column(Integer, ForeignKey('plants.pid', ondelete='CASCADE'), nullable=False)
    timestamp = Column(DateTime(timezone=True), default=func.now(), nullable=False)
    action = Column(Integer, nullable=False)

    __table_args__ = (
        PrimaryKeyConstraint('plant_pid', 'timestamp'), {}
    )

class Measurement(Base):
    __tablename__ = "measurements"

    plant_pid = Column(Integer, ForeignKey('plants.pid', ondelete='CASCADE'), nullable=False)
    log_timestamp = Column(Integer, ForeignKey('plants.pid', ondelete='CASCADE'), nullable=False)
    temperature = Column(Float)
    humidity = Column(Float)
    soil_moisture = Column(Float)

    __table_args__ = (
        PrimaryKeyConstraint('plant_pid', 'log_timestamp'), {}
    )

class MCU(Base):
    __tablename__ = "mcu"
    plant_pid = Column(Integer, ForeignKey('plants.pid'), primary_key=True)
    model = Column(String(30), nullable=False)
    secret_key = Column(String(300), nullable=False)
