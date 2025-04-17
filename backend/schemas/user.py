from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from ..schemas.common import PyObjectId
from datetime import datetime
from bson import ObjectId


class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    username: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]


class UserResponse(BaseModel):
    id: PyObjectId = Field(alias="_id")
    username: str
    email: EmailStr
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Token(BaseModel):
    access_token: str
    token_type: str
