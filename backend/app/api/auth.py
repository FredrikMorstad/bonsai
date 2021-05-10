from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..schemas import Tokens, Login_payload
from ..db import get_db
from ..utils import create_token
from ..curds.user import get_user_by_email

router = APIRouter()

@router.post("/login", response_model=Tokens)
def login(payload: Login_payload, db:Session = Depends(get_db)):
    login_exception = HTTPException(401, "invalid Email or password")

    user = get_user_by_email(db, payload.email)
    if not user:
        raise login_exception

    valid_password = user.validate_password(payload.password)
    if not valid_password:
        raise login_exception
    token = create_token(user)
    return {"access_token" : token}
