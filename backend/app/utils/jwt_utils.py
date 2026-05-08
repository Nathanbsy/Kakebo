"""JWT token utilities"""
from datetime import datetime, timedelta
from typing import Optional

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Create JWT access token"""
    pass

def verify_token(token: str):
    """Verify JWT token"""
    pass

def decode_token(token: str):
    """Decode JWT token"""
    pass
