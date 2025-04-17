from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    mongo_uri: str
    mongo_db: str
    secret_key: str
    algorithm: str
    access_token_expire_minutes: str

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
