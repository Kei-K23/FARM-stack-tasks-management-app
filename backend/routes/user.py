from fastapi import APIRouter
from ..schemas.user import UserResponse, UserCreate, UserUpdate
from ..services.user import UserService
from typing import List

router = APIRouter(prefix="/api/v1/users", tags=["Users"])


@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate):
    return await UserService.create(user)


@router.get("/", response_model=List[UserResponse], name="Get all users")
async def find_all_users():
    return await UserService.find_all()


@router.get("/{user_id}", response_model=UserResponse, name="Get user by id")
async def create_user(user_id: str):
    return await UserService.find_by_id(user_id)


@router.patch("/{user_id}", response_model=UserResponse, name="Update user")
async def create_user(user_id: str, user: UserUpdate):
    return await UserService.update(user_id=user_id, data=user)


@router.delete("/{user_id}", name="Delete user")
async def create_user(user_id: str):
    return await UserService.delete(user_id=user_id)
