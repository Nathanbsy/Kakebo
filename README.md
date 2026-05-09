# Kakeibo - Personal Finance Management System

A personal finance management application based on the Japanese Kakeibo methodology with a **modern, scalable architecture**.

**Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS  
**Backend:** Node.js + Express + TypeScript + MySQL  
**Analytics:** Python (FastAPI) - Separate service for advanced analysis  
**Integrations:** Google Sheets, Power BI, Excel Export

## 🎯 Why TypeScript Backend?

- ⚡ **Faster Development**: Less boilerplate, more productivity
- 🛡️ **Type-Safe**: Catch errors at compile time, not runtime
- 📦 **Better Ecosystem**: npm packages, tooling, community
- 💼 **Easier Hiring**: TypeScript developers are in high demand
- 🚀 **Production Ready**: Proven at scale (Netflix, Airbnb, etc)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Docker & Docker Compose (optional, but recommended)

### With Docker (Recommended - 1 Command!)
```bash
docker-compose up -d
```

Services will be available at:
- 🎨 **Frontend:** http://localhost:3000
- 🔌 **Backend API:** http://localhost:8000
- 📊 **Analytics Service:** http://localhost:8001
- 🗄️  **Database:** localhost:3306

```bash
# Stop services
docker-compose down

# View logs
docker-compose logs -f backend
docker-compose logs -f analytics
```

### Manual Setup

#### 1️⃣ Backend (TypeScript)
```bash
cd backend-ts

# Install dependencies
npm install

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
# 🎉 Backend running on http://localhost:8000
```

#### 2️⃣ Analytics Service (Python)
```bash
cd analytics-service

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
cp .env.example .env

# Start analytics service
python -m uvicorn app.main:app --reload --port 8001
# 📊 Analytics service running on http://localhost:8001
```

#### 3️⃣ Frontend
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
# 🎨 Frontend running on http://localhost:3000
```

## 📊 Architecture Overview

```
┌──────────────────────────────────────┐
│     FRONTEND (Next.js)               │
│     Port: 3000                       │
└─────────────────┬────────────────────┘
                  │
         HTTP/REST Requests
                  │
     ┌────────────▼──────────────┐
     │  BACKEND (Node.js/TS)     │
     │  Port: 8000               │
     └────────────┬──────────────┘
                  │
       ┌──────────┼──────────────┐
       │          │              │
    MySQL    Analytics      Services
    (DB)     (Python)       (Sheets, BI)
             Port: 8001
```

## 📁 Project Structure

```
kakeibo/
├── backend-ts/           # ⭐ Node.js + TypeScript Backend (MAIN)
│   ├── src/
│   │   ├── config/       # Configuration
│   │   ├── modules/      # Feature modules
│   │   │   ├── auth/
│   │   │   ├── transactions/
│   │   │   ├── categories/
│   │   │   ├── reports/
│   │   │   └── exports/
│   │   ├── shared/       # Shared code
│   │   │   ├── types/    # TypeScript types
│   │   │   └── utils/    # Middleware, helpers
│   │   └── index.ts      # Entry point
│   ├── prisma/           # Database schema
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── analytics-service/    # ⭐ Python Analytics (ADVANCED)
│   ├── app/
│   │   ├── main.py       # FastAPI entry point
│   │   └── config.py
│   ├── requirements.txt
│   ├── Dockerfile
│   └── README.md
│
├── frontend/             # Next.js React frontend
│   ├── app/              # Pages & layouts
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   └── ...
│
├── backend/              # ⚠️ OLD Python backend (deprecated)
├── docker-compose.yml    # 🐳 All services
├── ARCHITECTURE.md       # 📚 Detailed guide
└── README.md
```

## 📚 Documentation

- 🏗️ [Full Architecture Guide](./ARCHITECTURE.md) - Detailed design, structure, and roadmap
- 📖 [Backend TypeScript README](./backend-ts/README.md) - API setup and development
- 🐍 [Analytics Service README](./analytics-service/README.md) - Python analytics service
- 📱 [Frontend README](./frontend/README.md) - React & Next.js setup

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Login with email & password

### Transactions
- `GET /api/transactions` - List all transactions (paginated)
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/:id` - Get single transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create new category
- `GET /api/categories/:id` - Get single category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Reports & Analytics
- `GET /api/reports/monthly` - Monthly financial report
- `GET /api/reports/annual` - Annual financial report
- `POST /analytics/analyze/trends` - Advanced trend analysis (Python)
- `POST /analytics/analyze/predictions` - Predictive analytics (Python)

## 🛠️ Tech Stack

**Frontend:**
- Next.js 16+ + React 19+
- TypeScript 5
- Tailwind CSS 4
- Axios

**Backend (TypeScript/Node.js):**
- Express.js
- Prisma (ORM)
- Zod (Validation)
- MySQL
- JWT Authentication

**Analytics Service (Python):**
- FastAPI
- Pandas, NumPy, Scikit-learn
- Google Sheets API
- Power BI API

**DevOps:**
- Docker & Docker Compose
- MySQL 8.0

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
