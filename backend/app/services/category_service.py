"""Category service"""

class CategoryService:
    """Category business logic"""
    
    async def create_category(self, user_id: str, category_data):
        """Create new category"""
        pass
    
    async def list_categories(self, user_id: str):
        """List user categories"""
        pass
    
    async def get_category(self, category_id: str):
        """Get category details"""
        pass
    
    async def get_category_stats(self, category_id: str):
        """Get category spending statistics"""
        pass
    
    async def update_category(self, category_id: str, category_data):
        """Update category"""
        pass
    
    async def delete_category(self, category_id: str):
        """Delete category"""
        pass
