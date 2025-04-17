from bson import ObjectId
from typing import Any
from pydantic import GetCoreSchemaHandler
from pydantic_core import core_schema
from pydantic.json_schema import GetJsonSchemaHandler


class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls, source_type: Any, handler: GetCoreSchemaHandler
    ) -> core_schema.CoreSchema:
        return core_schema.no_info_after_validator_function(
            cls.validate,
            core_schema.str_schema(),
            serialization=core_schema.to_string_ser_schema()
        )

    @classmethod
    def validate(cls, v: str) -> ObjectId:
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls, schema: core_schema.CoreSchema, handler: GetJsonSchemaHandler
    ) -> dict:
        return {"type": "string"}


def prepare_mongo_document(doc: dict) -> dict:
    doc["_id"] = str(doc["_id"])
    return doc
