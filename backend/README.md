# Kakeibo Backend - TypeScript

Modern backend API for Kakeibo personal finance application built with Express, TypeScript, and MySQL.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Zod

## 📦 Installation

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start development server
npm run dev
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Transactions
- `GET /api/transactions` - List user transactions
- `GET /api/transactions/:id` - Get transaction details
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction

### Categories
- `GET /api/categories` - List user categories
- `GET /api/categories/:id` - Get category details
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Reports
- `GET /api/reports/monthly` - Monthly report
- `GET /api/reports/annual` - Annual report

## 🧪 Testing

```bash
npm test
```

## 🐳 Docker

```bash
docker-compose up
```

## 📁 Project Structure

```
backend-ts/
├── src/
│   ├── config/           # Configuration files
│   ├── modules/          # Feature modules (auth, transactions, etc)
│   ├── shared/           # Shared utilities, types, middleware
│   └── index.ts          # Entry point
├── prisma/
│   └── schema.prisma     # Database schema
└── package.json
```
