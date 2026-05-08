"""Transaction model"""
from sqlalchemy import Column, String, DateTime, ForeignKey, Numeric, Date
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

class Transaction:
    """Transaction model template"""
    
    # __tablename__ = "transactions"
    # id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    # category_id = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    # amount = Column(Numeric(10, 2), nullable=False)
    # description = Column(String)
    # date = Column(Date, nullable=False)
    # type = Column(String)  # income, expense
    # method = Column(String)  # cash, card, bank_transfer
    # created_at = Column(DateTime, default=datetime.utcnow)
    # updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    pass
