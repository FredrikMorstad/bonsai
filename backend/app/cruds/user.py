from sqlalchemy.orm import Session
from pydantic import EmailStr
from app.schemas import New_user
from app.models import User

def get_user_by_id(db: Session, id: int):
    return db.query(User).filter(User.user_id == id).first()

def get_user_by_email(db: Session, email: EmailStr):
    return db.query(User).filter(User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, new_user: New_user):
    db_user = User(**new_user.dict())
    db.add(db_user)
    db.commit()
    return db_user

