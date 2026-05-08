"""Authentication routes"""
from fastapi import APIRouter, Depends, HTTPException, status

# from app.schemas.user import UserCreate, UserLogin, UserResponse
# from app.services.auth_service import AuthService

router = APIRouter()

# @router.post("/register", response_model=UserResponse)
# async def register(user: UserCreate):
#     """Register new user"""
#     pass

# @router.post("/login")
# async def login(credentials: UserLogin):
#     """User login"""
#     pass

# @router.post("/refresh")
# async def refresh_token():
#     """Refresh JWT token"""
#     pass

# @router.post("/logout")
# async def logout():
#     """User logout"""
#     pass
