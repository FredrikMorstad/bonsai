from pydantic import BaseModel

class Plant(BaseModel):
    id: int
    data: float

    class Config:
        orm_mode = True
