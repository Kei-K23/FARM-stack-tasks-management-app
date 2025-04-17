from motor.motor_asyncio import AsyncIOMotorClient
from ..core.config import settings

client = AsyncIOMotorClient(settings.mongo_uri)
db = client[settings.mongo_db]
user_collection = db.get_collection("users")
task_list_collection = db.get_collection("task_lists")
