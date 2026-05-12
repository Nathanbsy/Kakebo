# 🏗️ Arquitetura Reestruturada - Kakeibo

## 📋 Visão Geral (2.0)

Kakeibo agora utiliza uma **arquitetura moderna e escalável**:

```
┌─────────────────────────────────────────────────────────────┐
│               FRONTEND (Next.js + React)                    │
│         Dashboard | Transações | Relatórios                 │
│                (localhost:3000)                              │
└────────────────┬────────────────────────────────────────────┘
                 │
            HTTP/REST API
                 │
┌────────────────▼────────────────────────────────────────────┐
│        BACKEND (Node.js + Express + TypeScript)             │
│    APIs | Auth | CRUD | Validação | Caching                │
│                (localhost:8000)                              │
└────────────────┬────────────────────────────────────────────┘
     ┌───────────┼───────────┬──────────────┐
     │           │           │              │
   MySQL    Analytics    Sheets API    Power BI API
  (Dados)   (Python)   (Exportar)    (Relatórios)
            (8001)
```

## 🎯 Principais Mudanças

### ✅ Backend Principal: TypeScript
- **Express.js** para API REST
- **Prisma** como ORM (type-safe, migrações automáticas)
- **Zod** para validação de schemas
- **JWT** para autenticação
- **Muito mais rápido** de desenvolver e manter

### ✅ Python: Apenas para Análises
- Isolado em serviço separado (`analytics-service`)
- Responsável por:
  - Análises avançadas de dados
  - Previsões e tendências
  - Detecção de anomalias
  - Integração com Google Sheets
  - Conexão com Power BI
  - Geração de relatórios complexos

### ✅ Banco de Dados: MySQL
- Sem problemas de PostgreSQL
- Mais acessível para contratação
- Comunidade maior

## 📁 Estrutura de Pastas (Nova)

```
kakeibo/
├── frontend/                          # Projeto Next.js atual
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/                    # Grupo de rotas autenticação
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (dashboard)/               # Grupo de rotas autenticado
│   │   │   ├── page.tsx               # Dashboard principal
│   │   │   ├── transactions/page.tsx
│   │   │   ├── categories/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       └── (opcional: proxy)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionList.tsx
│   │   ├── CategoryManager.tsx
│   │   └── Charts/
│   │       ├── MonthlySpending.tsx
│   │       ├── CategoryBreakdown.tsx
│   │       └── TrendAnalysis.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useTransactions.ts
│   │   └── useReports.ts
│   ├── services/
│   │   └── api.ts                    # Cliente Axios configurado
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   └── validators.ts
│   └── package.json
│
├── backend/                           # Novo: Python FastAPI
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                   # Entrada da aplicação
│   │   ├── config.py                 # Variáveis de ambiente
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── transaction.py
│   │   │   ├── category.py
│   │   │   └── report.py
│   │   ├── schemas/                  # Pydantic DTOs
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── transaction.py
│   │   │   └── report.py
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── auth.py               # POST /auth/login, /auth/register
│   │   │   ├── transactions.py       # CRUD transações
│   │   │   ├── categories.py         # CRUD categorias
│   │   │   ├── reports.py            # GET relatórios/análises
│   │   │   ├── exports.py            # GET /exports/sheets, /exports/excel
│   │   │   └── analytics.py          # GET análises/tendências
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── auth_service.py       # Lógica autenticação
│   │   │   ├── transaction_service.py
│   │   │   ├── report_service.py
│   │   │   ├── sheets_service.py     # Integração Google Sheets
│   │   │   ├── bi_service.py         # Integração Power BI
│   │   │   └── export_service.py
│   │   ├── db/
│   │   │   ├── __init__.py
│   │   │   ├── database.py           # Configuração SQLAlchemy
│   │   │   └── migrations/           # Alembic migrations
│   │   ├── middleware/
│   │   │   ├── __init__.py
│   │   │   └── auth.py               # JWT verification
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── jwt_utils.py
│   │       └── validators.py
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── test_auth.py
│   │   ├── test_transactions.py
│   │   └── test_reports.py
│   ├── requirements.txt               # Dependências Python
│   ├── .env.example
│   └── README.md
│
├── docker-compose.yml                # Orquestração containers
├── .env.example                      # Variáveis de ambiente
├── ARCHITECTURE.md                   # Este arquivo
└── README.md
```

---

## 🔌 Stack Tecnológico

### **Frontend (Next.js)**
- **Framework**: Next.js 16.2.6 com App Router
- **UI**: React 19.2.4 + TypeScript
- **Estilo**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Gráficos**: Recharts ou Chart.js (adicionar)
- **Autenticação**: JWT (localStorage)
- **Validação**: Zod ou React Hook Form

### **Backend (Python)**
- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Banco de Dados**: MySQL
- **Autenticação**: Python-Jose (JWT)
- **Validação**: Pydantic
- **Async**: Uvicorn
- **Migrações**: Alembic
- **Testes**: Pytest

### **Integrações Externas**
- **Google Sheets API**: google-auth-oauthlib, gspread
- **Excel**: openpyxl ou pandas
- **Power BI**: Power BI REST API
- **Email**: SMTPLib (relatórios por email)

### **DevOps**
- **Containerização**: Docker + Docker Compose
- **Database**: MySQL em container
- **Proxy**: Nginx (opcional, em produção)

---

## 📊 Modelo de Dados (Database Schema)

```sql
-- USERS
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  name VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CATEGORIES
CREATE TABLE categories (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR NOT NULL,
  icon VARCHAR,
  color VARCHAR,
  budget_limit DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- TRANSACTIONS
CREATE TABLE transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  category_id UUID REFERENCES categories(id),
  amount DECIMAL(10,2) NOT NULL,
  description VARCHAR,
  date DATE NOT NULL,
  type VARCHAR CHECK (type IN ('receita', 'despesa')),
  method VARCHAR CHECK (method IN ('dinheiro', 'cartão', 'transferência_bancária')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- REPORTS_CONFIG
CREATE TABLE reports_config (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR,
  report_type VARCHAR,
  frequency VARCHAR CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- BI_EXPORTS
CREATE TABLE bi_exports (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  destination VARCHAR (sheets, powerbi, excel),
  last_exported TIMESTAMP,
  status VARCHAR CHECK (status IN ('pending', 'success', 'failed')),
  error_message TEXT
);
```

---

## 🔐 Fluxo de Autenticação

```
1. User registra/faz login no Frontend
   ↓
2. Frontend envia credenciais para Backend (/auth/login)
   ↓
3. Backend valida e retorna JWT token
   ↓
4. Frontend armazena JWT em localStorage
   ↓
5. Requisições subsequentes incluem: Authorization: Bearer {token}
   ↓
6. Backend valida JWT em cada requisição (middleware)
```

---

## 📡 Endpoints da API (Backend)

### **Autenticação**
```
POST   /api/auth/register          # Novo usuário
POST   /api/auth/login             # Login
POST   /api/auth/refresh           # Renovar token
POST   /api/auth/logout            # Logout
```

### **Transações**
```
GET    /api/transactions           # Listar (com filtros: data, categoria)
POST   /api/transactions           # Criar nova
GET    /api/transactions/{id}      # Detalhes
PUT    /api/transactions/{id}      # Atualizar
DELETE /api/transactions/{id}      # Deletar
```

### **Categorias**
```
GET    /api/categories             # Listar
POST   /api/categories             # Criar
PUT    /api/categories/{id}        # Atualizar
DELETE /api/categories/{id}        # Deletar
GET    /api/categories/{id}/stats  # Estatísticas (gastos total, % do orçamento)
```

### **Relatórios & Análises**
```
GET    /api/reports/monthly        # Resumo mensal
GET    /api/reports/yearly         # Resumo anual
GET    /api/analytics/trends       # Tendências de gastos
GET    /api/analytics/forecast     # Previsão (ML opcional)
GET    /api/analytics/comparison   # Comparação mês a mês
```

### **Exportações**
```
POST   /api/exports/sheets         # Exportar para Google Sheets
POST   /api/exports/excel          # Gerar Excel
POST   /api/exports/powerbi        # Enviar para Power BI
GET    /api/exports/history        # Histórico de exportações
```

---

## 🚀 Fluxo de Desenvolvimento

### **Fase 1: MVP (Semanas 1-3)**
- [ ] Setup backend (FastAPI + MySQL)
- [ ] Autenticação (JWT)
- [ ] CRUD básico (transações, categorias)
- [ ] Dashboard simples no frontend
- [ ] Relatórios básicos (mensal, por categoria)

### **Fase 2: Integrações (Semanas 4-6)**
- [ ] Google Sheets API
- [ ] Exportação para Excel
- [ ] Gráficos avançados (Recharts)
- [ ] Filtros e busca
- [ ] Validações frontend/backend

### **Fase 3: BI & Analytics (Semanas 7-9)**
- [ ] Power BI integration
- [ ] Previsões (tendências, forecasting)
- [ ] Relatórios automáticos por email
- [ ] Configuração de alertas
- [ ] Mobile responsivo

### **Fase 4: Polish & Deploy (Semana 10+)**
- [ ] Testes (unit + integração)
- [ ] Docker + Docker Compose
- [ ] Otimizações performance
- [ ] Deploy (Vercel + Railway/Render)

---

## 🛠️ Setup Inicial

### **1. Backend Setup**
```bash
# Criar venv
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Configurar .env
cp .env.example .env

# Rodas migrations
alembic upgrade head

# Iniciar servidor
uvicorn app.main:app --reload --port 8000
```

### **2. Frontend Setup**
```bash
cd frontend
npm install
npm run dev  # localhost:3000
```

### **3. Docker (Opcional)**
```bash
docker-compose up -d
# Frontend: localhost:3000
# Backend: localhost:8000
# MySQL: localhost:3306
```

---

## 📦 Dependências Python (requirements.txt)

```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
mysql-connector-python==8.2.0
pydantic==2.5.0
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
alembic==1.13.0
google-auth-oauthlib==1.2.0
gspread==5.11.3
openpyxl==3.11.0
pandas==2.1.3
python-dotenv==1.0.0
pytest==7.4.3
pytest-asyncio==0.21.1
httpx==0.25.2
```

---

## 🔄 Fluxo de Dados (Exemplo: Nova Transação)

```
1. User preenche formulário no Frontend
   (TransactionForm.tsx)
   ↓
2. Frontend valida com Zod/React Hook Form
   ↓
3. POST /api/transactions com Axios
   {
     amount: 50.00,
     category_id: "uuid",
     description: "Café",
     date: "2026-05-08",
     type: "despesa",
     method: "dinheiro"
   }
   ↓
4. Backend recebe em routes/transactions.py
   ↓
5. Valida schema Pydantic
   ↓
6. Transaction Service processa
   ↓
7. SQLAlchemy salva no MySQL
   ↓
8. Retorna 201 Created + transaction object
   ↓
9. Frontend atualiza lista (TransactionList)
   ↓
10. Relatórios são atualizados automaticamente
```

---

## 🎯 Próximos Passos

1. **Criar estrutura backend** (`backend/` folder)
2. **Setup Docker Compose** (MySQL + FastAPI + Next.js)
3. **Implementar autenticação** (JWT)
4. **CRUD básico** (transações)
5. **Conectar frontend ao backend**
6. **Dashboard MVP**

Quer que eu comece com alguma dessas etapas?
