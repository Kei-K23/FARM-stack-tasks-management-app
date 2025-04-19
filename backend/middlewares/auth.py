from fastapi import Header, HTTPException
from ..services.user import UserService
from ..core.jwt import decode_token


async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Invalid authorization header format")
    token = authorization.split(" ")[1]
    payload = decode_token(token=token)
    user = await UserService.find_by_id(payload["user_id"])
    return user
