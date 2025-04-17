from db.mongo import userCollection
from schemas.user import UserCreate, UserResponse, UserUpdate
from models.user import User
from fastapi import HTTPException
from core.security import get_password_hash
from datetime import datetime
from bson import ObjectId


class UserService:
    @staticmethod
    async def create(user: UserCreate):
        if await userCollection.find_one({"email": user.email}):
            raise HTTPException(
                status_code=400, detail="Email already registered")

        hashed_pass = get_password_hash(user.password)
        user_data = User(username=user.username,
                         email=user.email, password=hashed_pass, created_at=datetime.utcnow(), updated_at=datetime.utcnow()).model_dump()

        result = await userCollection.insert_one(user_data)
        user_data["_id"] = result.inserted_id

        return UserResponse(**user_data)

    @staticmethod
    async def find_all(limit: int = 10, skip: int = 0, search: str = "", email: str = ""):
        query = {}

        if search:
            query["username"] = {"$regex": search, "$options": "i"}

        if email:
            query["email"] = {"$regex": f"^{email}$", "$options": "i"}

        user_cursor = userCollection.find(query).skip(
            0).limit(limit).sort("createdAt", -1)

        users = [UserResponse(**user) async for user in user_cursor]
        return users

    @staticmethod
    async def find_by_id(user_id: str):
        user = await userCollection.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        return UserResponse(**user)

    @staticmethod
    async def update(user_id: str, data: UserUpdate):
        update_data = data.model_dump(exclude_unset=True)
        if "password" in update_data:
            update_data["password"] = get_password_hash(
                update_data["password"])
        update_data["updated_at"] = datetime.utcnow()

        result = await userCollection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})

        if result.modified_count == 0:
            raise HTTPException(
                status_code=404, detail="User not found or no changes")
        return await UserService.find_by_id(user_id)

    @staticmethod
    async def delete(user_id: str):
        result = await userCollection.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=404, detail="User not found")

        return {"message": "User deleted successfully"}
