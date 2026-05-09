"""Configuration for analytics service"""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Analytics service settings"""

    # Service
    SERVICE_NAME: str = "kakeibo-analytics"
    SERVICE_VERSION: str = "0.1.0"

    # Server
    API_PORT: int = 8001
    DEBUG: bool = True

    # TypeScript Backend
    BACKEND_URL: str = "http://localhost:8000"

    # Google Sheets (optional)
    GOOGLE_SHEETS_CREDENTIALS: str | None = None

    # Power BI (optional)
    POWERBI_API_KEY: str | None = None

    class Config:
        env_file = ".env"


settings = Settings()
