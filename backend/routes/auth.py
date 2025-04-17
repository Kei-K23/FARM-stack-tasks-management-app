from fastapi import APIRouter, HTTPException
from ..schemas.user import UserResponse, UserCreate, LoginRequest, Token
from ..services.user import UserService
from ..core.security import verify_password
from ..core.jwt import create_access_token

router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])


@router.post("/register", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate):
    return await UserService.create(user)


@router.post("/login", response_model=Token, status_code=200)
async def create_user(data: LoginRequest):
    user = await UserService.find_with_pass_by_email(data.email)
    if not user or not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"user_id": user["_id"]})

    return Token(access_token=access_token,
                 user=UserResponse(**user))
