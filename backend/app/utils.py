from fastapi import Request, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from math import floor
from .schemas import User_model
from jwt import encode, decode, DecodeError
from datetime import datetime, timedelta
from .schemas import AccessTokenPayload

SECRET_KEY = "TMP-SECRET-KEY"

security = HTTPBearer()

def authorize(request: Request, token: HTTPAuthorizationCredentials=Depends(security)):
    t = decode_token(token.credentials)
    return AccessTokenPayload(**t)

def create_token(user: User_model):
    return encode({
        'user_id' : user.user_id ,
        'exp' : datetime.utcnow() + timedelta(minutes=20),
        'iat': datetime.utcnow()
    }, SECRET_KEY, algorithm="HS256")

def decode_token(token: bytes):
    try :
        return decode(token.encode("utf-8"), SECRET_KEY, algorithms="HS256")
    except DecodeError:
        raise HTTPException(401, 'Invalid token format')

CRITICAL_OFFSET = 4
OFFSET = 6

action_map = {
    0 : "default",
    1 : "Watering",
    2 : "Picture",
    3 : "Light switch",
    4 : "Measurement",
    5 : "fertilize",
}

critical_type = ["temperature", "humidity", "soil_moisture"]
critical_status = ["high-enter", "high-leave", "low-enter", "low-leave"]

def get_critical_msg(x):
    # removes offset created by action_map
    x = (x - OFFSET) 
    type_idx = floor(x/CRITICAL_OFFSET)
    status_idx = x % CRITICAL_OFFSET
    return critical_type[type_idx] + "-" + critical_status[status_idx]

def valid_action(number: int):
    return 0 <= number < 17

def get_action_msg(number: int):
    if not valid_action(number):
        return
    msg = action_map[number] if number <= 5 else get_critical_msg(number)
    return msg
