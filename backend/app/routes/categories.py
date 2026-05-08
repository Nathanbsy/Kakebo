"""Category routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

# from app.schemas.category import CategoryCreate, CategoryResponse
# from app.services import category_service

router = APIRouter()

# @router.get("/", response_model=List[CategoryResponse])
# async def list_categories():
#     """List all categories"""
#     pass

# @router.post("/", response_model=CategoryResponse)
# async def create_category(category: CategoryCreate):
#     """Create new category"""
#     pass

# @router.get("/{category_id}", response_model=CategoryResponse)
# async def get_category(category_id: str):
#     """Get category details"""
#     pass

# @router.get("/{category_id}/stats")
# async def get_category_stats(category_id: str):
#     """Get category statistics"""
#     pass

# @router.put("/{category_id}", response_model=CategoryResponse)
# async def update_category(category_id: str, category: CategoryCreate):
#     """Update category"""
#     pass

# @router.delete("/{category_id}")
# async def delete_category(category_id: str):
#     """Delete category"""
#     pass
