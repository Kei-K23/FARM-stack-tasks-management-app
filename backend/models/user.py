from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class User(BaseModel):
    username: str
    email: EmailStr
    password: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
