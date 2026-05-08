"""Report service"""

class ReportService:
    """Report generation logic"""
    
    async def get_monthly_report(self, user_id: str, month: int, year: int):
        """Generate monthly report"""
        pass
    
    async def get_yearly_report(self, user_id: str, year: int):
        """Generate yearly report"""
        pass
    
    async def get_custom_report(self, user_id: str, start_date, end_date):
        """Generate custom period report"""
        pass
