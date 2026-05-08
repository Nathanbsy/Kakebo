"""Report schemas"""
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ReportResponse(BaseModel):
    """Report response schema"""
    id: str
    user_id: str
    name: Optional[str]
    report_type: str
    frequency: str
    enabled: bool
    created_at: datetime
    
    class Config:
        from_attributes = True
