"""Category model"""
from sqlalchemy import Column, String, DateTime, ForeignKey, Numeric
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

class Category:
    """Category model template"""
    
    # __tablename__ = "categories"
    # id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    # name = Column(String, nullable=False)
    # icon = Column(String)
    # color = Column(String)
    # budget_limit = Column(Numeric(10, 2))
    # created_at = Column(DateTime, default=datetime.utcnow)
    
    pass
