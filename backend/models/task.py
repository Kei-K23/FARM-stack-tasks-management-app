from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from ..schemas.common import PyObjectId


class Task(BaseModel):
    title: str
    description: str
    task_list_id: PyObjectId
    due_date: datetime
    priority: str  # TODO avoid magic string here -> LOW, MEDIUM, HIGH
    status: str  # TODO avoid magic string here -> TO_DO, IN_PROGRESS, REVIEW, DONE
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
