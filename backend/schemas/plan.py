from pydantic import BaseModel, Field
from typing import Optional
from .common import PyObjectId
from .task_list import TaskListResponse
from datetime import datetime
from bson import ObjectId
from typing import List


class PlanCreate(BaseModel):
    title: str
    description: str
    user_id: str


class PlanUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class PlanResponse(BaseModel):
    id: PyObjectId = Field(alias="_id")
    title: str
    description: str
    user_id: PyObjectId = Field(alias="user_id")
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PlanResponseWithTaskLists(BaseModel):
    id: PyObjectId = Field(alias="_id")
    title: str
    description: str
    user_id: PyObjectId = Field(alias="user_id")
    task_lists: List[TaskListResponse]
    created_at: Optional[datetime]
    updated_at: Optional[datetime]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class PlanPaginationResponse(BaseModel):
    data: List[PlanResponse]
    count: int
