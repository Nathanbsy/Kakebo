# Kakeibo Backend

Backend API for Kakeibo personal finance application built with FastAPI and Python.

## 📋 Overview

Python backend with FastAPI, PostgreSQL database, and integrations with Google Sheets and Power BI for advanced reporting and analytics.

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- PostgreSQL 12+
- pip or conda

### Installation

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Setup environment:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Run migrations:
```bash
alembic upgrade head
```

5. Start server:
```bash
uvicorn app.main:app --reload --port 8000
```

Server will be available at http://localhost:8000

## 📚 API Documentation

Swagger UI: http://localhost:8000/docs
ReDoc: http://localhost:8000/redoc

## 📁 Project Structure

```
app/
├── main.py              # FastAPI application
├── config.py            # Configuration
├── models/              # SQLAlchemy models
├── schemas/             # Pydantic DTOs
├── routes/              # API endpoints
├── services/            # Business logic
├── db/                  # Database setup
├── middleware/          # Custom middleware
└── utils/               # Utilities
tests/                   # Test suite
requirements.txt         # Python dependencies
```

## 🧪 Testing

```bash
pytest
pytest -v              # Verbose
pytest --cov          # With coverage
```

## 🔌 Integrations

- Google Sheets API
- Power BI REST API
- Excel Export (openpyxl)

## 📝 Environment Variables

See `.env.example` for configuration options.

## 🤝 Contributing

[Add contribution guidelines]

## 📄 License

[Add license info]
