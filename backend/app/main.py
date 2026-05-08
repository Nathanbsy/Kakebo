"""
FastAPI main application entry point
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routes here
# from app.routes import auth, transactions, categories, reports, exports, analytics

app = FastAPI(
    title="Kakeibo API",
    description="Personal finance management system",
    version="0.1.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
# app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
# app.include_router(transactions.router, prefix="/api/transactions", tags=["Transactions"])
# app.include_router(categories.router, prefix="/api/categories", tags=["Categories"])
# app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
# app.include_router(exports.router, prefix="/api/exports", tags=["Exports"])
# app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Kakeibo API is running"}

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
