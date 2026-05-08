"""Transaction routes"""
from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

# from app.schemas.transaction import TransactionCreate, TransactionResponse
# from app.services.transaction_service import TransactionService

router = APIRouter()

# @router.get("/", response_model=List[TransactionResponse])
# async def list_transactions():
#     """List all transactions"""
#     pass

# @router.post("/", response_model=TransactionResponse)
# async def create_transaction(transaction: TransactionCreate):
#     """Create new transaction"""
#     pass

# @router.get("/{transaction_id}", response_model=TransactionResponse)
# async def get_transaction(transaction_id: str):
#     """Get transaction details"""
#     pass

# @router.put("/{transaction_id}", response_model=TransactionResponse)
# async def update_transaction(transaction_id: str, transaction: TransactionCreate):
#     """Update transaction"""
#     pass

# @router.delete("/{transaction_id}")
# async def delete_transaction(transaction_id: str):
#     """Delete transaction"""
#     pass
