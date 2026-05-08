"""Report configuration model"""
from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from datetime import datetime

class Report:
    """Report configuration model template"""
    
    # __tablename__ = "reports_config"
    # id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    # name = Column(String)
    # report_type = Column(String)
    # frequency = Column(String)  # daily, weekly, monthly
    # enabled = Column(Boolean, default=True)
    # created_at = Column(DateTime, default=datetime.utcnow)
    
    pass
