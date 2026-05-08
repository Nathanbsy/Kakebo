"""Transaction schemas"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date
from decimal import Decimal

class TransactionCreate(BaseModel):
    """Transaction creation schema"""
    category_id: str
    amount: Decimal
    description: Optional[str] = None
    date: date
    type: str  # income, expense
    method: str  # cash, card, bank_transfer

class TransactionResponse(BaseModel):
    """Transaction response schema"""
    id: str
    user_id: str
    category_id: str
    amount: Decimal
    description: Optional[str]
    date: date
    type: str
    method: str
    created_at: datetime
    
    class Config:
        from_attributes = True
