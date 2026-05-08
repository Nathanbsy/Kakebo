# Kakeibo - Personal Finance Management System

A personal finance management application based on the Japanese Kakeibo methodology.

**Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS  
**Backend:** FastAPI + Python + PostgreSQL  
**Integrations:** Google Sheets, Power BI, Excel Export

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 12+
- Docker (optional)

### Development Setup

#### Using Docker (Recommended)
```bash
docker-compose up -d
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

#### Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
kakeibo/
├── backend/              # Python FastAPI backend
│   ├── app/
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Pydantic DTOs
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Business logic
│   │   └── ...
│   └── requirements.txt
├── frontend/             # Next.js React frontend
│   ├── app/              # Pages & layouts
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   └── ...
├── docker-compose.yml
├── ARCHITECTURE.md       # Detailed architecture guide
└── README.md
```

## 📚 Documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed project design and implementation roadmap.

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh token
- `POST /api/auth/logout` - User logout

### Transactions
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Create transaction
- `GET /api/transactions/{id}` - Get transaction
- `PUT /api/transactions/{id}` - Update transaction
- `DELETE /api/transactions/{id}` - Delete transaction

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category
- `GET /api/categories/{id}` - Get category
- `GET /api/categories/{id}/stats` - Get category stats
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

### Reports & Analytics
- `GET /api/reports/monthly` - Monthly report
- `GET /api/reports/yearly` - Yearly report
- `GET /api/analytics/trends` - Spending trends
- `GET /api/analytics/forecast` - Spending forecast
- `GET /api/analytics/comparison` - Month comparison

### Exports
- `POST /api/exports/sheets` - Export to Google Sheets
- `POST /api/exports/excel` - Generate Excel file
- `POST /api/exports/powerbi` - Send to Power BI
- `GET /api/exports/history` - Export history

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16.2.6
- React 19.2.4
- TypeScript 5
- Tailwind CSS 4
- Axios

**Backend:**
- FastAPI
- SQLAlchemy
- PostgreSQL
- Python-Jose (JWT)
- Pydantic

**DevOps:**
- Docker & Docker Compose
- PostgreSQL in container

## 📝 Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update values in `.env` as needed

3. For production, ensure to:
   - Change `JWT_SECRET_KEY` to a secure value
   - Set `DEBUG=False` on backend
   - Configure proper database credentials

## 🧪 Testing

**Backend:**
```bash
cd backend
pytest
```

**Frontend:**
```bash
cd frontend
npm test
```

## 📖 Development Phases

See [ARCHITECTURE.md](./ARCHITECTURE.md#-fluxo-de-desenvolvimento) for detailed development roadmap.

## 🤝 Contributing

[Add contribution guidelines]

## 📄 License

[Add license info]

## 🎯 Features Planned

- [x] Project structure & setup
- [ ] User authentication (JWT)
- [ ] Transaction management (CRUD)
- [ ] Category management
- [ ] Monthly/yearly reports
- [ ] Google Sheets integration
- [ ] Power BI integration
- [ ] Excel export
- [ ] Advanced analytics
- [ ] Spending forecasting
- [ ] Email reports

## 👥 Support

[Add support information]
