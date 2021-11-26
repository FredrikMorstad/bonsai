from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from ..schemas import Tokens, Login_payload, RefreshToken, RefreshTokenPayload, User_base
from ..db import get_db
from ..utils import create_token, create_refresh_token, decode_token
from ..cruds.user import get_user_by_id, get_user_by_email

router = APIRouter()

@router.post("/login", response_model=Tokens)
def login(request: Request, payload: Login_payload, db:Session = Depends(get_db)):
    login_exception = HTTPException(401, "invalid Email or password")

    user = get_user_by_email(db, payload.email)
    if not user:
        raise login_exception

    valid_password = user.validate_password(payload.password)
    if not valid_password:
        raise login_exception

    token = create_token(user)
    refresh_token = create_refresh_token(user)
    return {"access_token" : token, "refresh_token": refresh_token}

@router.post('/renew', response_model=Tokens)
def renew(request: Request, refreshToken: RefreshToken, db:Session = Depends(get_db)):
    token_data = RefreshTokenPayload.parse_obj(decode_token(refreshToken.refresh_token))

    user = get_user_by_id(db, token_data.user_id)

    if not user:
        # Edge case
        raise HTTPException(
            400, 'The member associated with refresh token no longer exists')

    return {"access_token": create_token(user), "refresh_token": create_refresh_token(user)}
