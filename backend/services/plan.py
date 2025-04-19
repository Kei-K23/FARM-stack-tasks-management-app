from ..db.mongo import plan_collection
from ..schemas.plan import PlanCreate, PlanResponse, PlanUpdate
from ..schemas.common import prepare_mongo_document
from ..models.plan import Plan
from fastapi import HTTPException
from datetime import datetime
from bson import ObjectId


class PlanService:
    @staticmethod
    async def create(plan: PlanCreate):
        plan_data = Plan(title=plan.title, description=plan.description, user_id=plan.user_id,
                         created_at=datetime.utcnow(), updated_at=datetime.utcnow()).model_dump()
        result = await plan_collection.insert_one(plan_data)
        plan_data["_id"] = result.inserted_id

        return PlanResponse(**prepare_mongo_document(plan_data))

    @staticmethod
    async def find_all(limit: int = 10, skip: int = 0, search: str = ""):
        query = {}

        if search:
            query["title"] = {"$regex": search, "$options": "i"}

        total_count = await plan_collection.count_documents(query)

        plan_cursor = plan_collection.find(query).skip(
            skip).limit(limit).sort("created_at", -1)

        plans = [PlanResponse(**prepare_mongo_document(plan)) async for plan in plan_cursor]

        return {"data": plans, "count": total_count}

    @staticmethod
    async def find_by_id(plan_id: str):
        plan = await plan_collection.find_one({"_id": ObjectId(plan_id)})
        if not plan:
            raise HTTPException(status_code=404, detail="Plan not found")

        return PlanResponse(**prepare_mongo_document(plan))

    @staticmethod
    async def update(plan_id: str, data: PlanUpdate):
        update_data = data.model_dump(exclude_unset=True)
        update_data["updated_at"] = datetime.utcnow()

        result = await plan_collection.update_one({"_id": ObjectId(plan_id)}, {"$set": update_data})

        if result.modified_count == 0:
            raise HTTPException(
                status_code=404, detail="Plan not found or no changes")
        return await PlanService.find_by_id(plan_id)

    @staticmethod
    async def delete(plan_id: str):
        result = await plan_collection.delete_one({"_id": ObjectId(plan_id)})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404, detail="Plan not found")

        return {"message": "Plan deleted successfully"}
