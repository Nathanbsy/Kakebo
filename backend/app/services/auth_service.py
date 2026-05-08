"""Authentication service"""

class AuthService:
    """Authentication business logic"""
    
    async def register_user(self, user_data):
        """Register new user"""
        pass
    
    async def login_user(self, email: str, password: str):
        """Authenticate user"""
        pass
    
    async def verify_token(self, token: str):
        """Verify JWT token"""
        pass
    
    async def refresh_token(self, token: str):
        """Refresh JWT token"""
        pass
