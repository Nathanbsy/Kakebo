"""
Application configuration and environment variables
"""
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    """Application settings from environment variables"""
    
    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/kakeibo"
    
    # JWT
    JWT_SECRET_KEY: str = "your-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_HOURS: int = 24
    
    # API
    API_PREFIX: str = "/api"
    DEBUG: bool = True
    
    # Google Sheets (optional)
    GOOGLE_SHEETS_CREDENTIALS: Optional[str] = None
    
    # Power BI (optional)
    POWERBI_API_KEY: Optional[str] = None
    
    class Config:
        env_file = ".env"

settings = Settings()
