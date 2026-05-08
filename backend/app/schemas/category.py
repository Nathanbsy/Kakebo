"""Category schemas"""
from pydantic import BaseModel
from typing import Optional
from decimal import Decimal

class CategoryCreate(BaseModel):
    """Category creation schema"""
    name: str
    icon: Optional[str] = None
    color: Optional[str] = None
    budget_limit: Optional[Decimal] = None

class CategoryResponse(BaseModel):
    """Category response schema"""
    id: str
    user_id: str
    name: str
    icon: Optional[str]
    color: Optional[str]
    budget_limit: Optional[Decimal]
    
    class Config:
        from_attributes = True
