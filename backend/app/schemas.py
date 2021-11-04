from typing import Optional
from pydantic import BaseModel, EmailStr
from datetime import datetime

class User_base(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: EmailStr

    class Config:
        orm_mode = True

class New_user(User_base):
    password: str 
    role: Optional[str]

class User_model(New_user):
    user_id: int
    role: str
    created_at: datetime
    last_login: datetime


class Plant_base(BaseModel):
    name: str
    type: str
    temperature_min: float
    temperature_max: float
    humidity_min: float
    humidity_max: float
    soil_moisture_min: float
    soil_moisture_max: float
    region: str

    class Config:
        orm_mode = True

class Plant_model(Plant_base):
    pid: int
    age: int
    critical: int
    created_at: datetime

class Log_base(BaseModel):
    plant_pid: int
    action: int
    
    class Config:
        orm_mode = True

class Log_model(Log_base):
    timestamp: datetime

class Measurement_base(BaseModel):
    plant_pid: int
    temperature: Optional[float]
    humidity: Optional[float]
    soil_moisture: Optional[float]

    class Config:
        orm_mode = True

class Measurement_model(Measurement_base):
    log_timestamp: datetime

class MCU_base(BaseModel):
    plant_pid: int
    model: str

    class Config:
        orm_mode = True

class MCU_model(MCU_base):
    secret_key = str

class AccessTokenPayload(BaseModel):
    exp: int
    iat: int
    user_id: str

class Login_payload(BaseModel):
    email: EmailStr
    password: str

    class Config:
        orm_mode = True

class Tokens(BaseModel):
    access_token: str
