from fastapi import FastAPI
from .routes.user import router as userRouter

app = FastAPI()
app.include_router(userRouter)
