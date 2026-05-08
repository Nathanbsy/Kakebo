"""JWT authentication middleware"""
from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthCredentials

# from app.utils.jwt_utils import verify_token

security = HTTPBearer()

async def verify_jwt(credentials: HTTPAuthCredentials = Depends(security)):
    """Verify JWT token"""
    token = credentials.credentials
    # payload = verify_token(token)
    # return payload
    pass
