from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from ..cruds.user import get_user_by_email, get_user_by_username, get_user_by_id, create_user
from ..schemas import New_user, User_base, AccessTokenPayload
from ..db import get_db, Base, engine
from ..utils import authorize, create_token

Base.metadata.create_all(bind=engine)
router = APIRouter()

def check_unique(db: Session, email: str, username: str):
    if get_user_by_email(db, email):
        return "Email already in use"
    if get_user_by_username(db, username):
        return "Username already in use"

@router.get("/", response_model=User_base)
def get_user_with_token(db: Session=Depends(get_db), token: AccessTokenPayload=Depends(authorize)):
    user = get_user_by_id(db, token.user_id)
    if not user:
        raise HTTPException(status_code=404, detail='Could not find user')
    return user

@router.post('/', response_model=User_base)
def create_new_user(new_user: New_user, db: Session=Depends(get_db)):
    error_msg = check_unique(db, email=new_user.email.lower(), username=new_user.username)

    if error_msg:
        raise HTTPException(status_code=409, detail=error_msg)

    return create_user(db, new_user)


