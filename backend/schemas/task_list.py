from pydantic import BaseModel, Field
from typing import Optional
from .common import PyObjectId
from datetime import datetime
from bson import ObjectId
from typing import List


class TaskListCreate(BaseModel):
    title: str
    description: str
    user_id: str


class TaskListUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class TaskListResponse(BaseModel):
    id: PyObjectId = Field(alias="_id")
    title: str
    description: str
    user_id: PyObjectId = Field(alias="user_id")
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class TaskListPaginationResponse(BaseModel):
    data: List[TaskListResponse]
    count: int
