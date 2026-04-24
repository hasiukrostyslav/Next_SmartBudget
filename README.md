# Smart Budget

A full-stack personal finance application to track income, expenses, and transactions — all in one place.

> **Smart Money, Bright Tomorrow**

---

## Features

### Implemented

- **Authentication** — Sign up, log in, and log out with email/password via NextAuth
- **Transaction Management** — Create, edit, and delete financial transactions
- **Transaction Categorization** — 35+ categories for income and expenses
- **Bulk Operations** — Delete multiple or all transactions, change status in bulk
- **Filtering & Sorting** — Filter by category, type, and payment method; sort by 6 fields
- **Pagination** — Server-side paginated transaction lists
- **Multi-currency Support** — UAH, USD, EUR, PLN, HUF, GBP
- **Payment Method Tracking** — Assign payment methods to transactions
- **Transaction Status** — COMPLETED, FAILED, PENDING states
- **Dark / Light Theme** — System-aware theme toggle

### Planned (routes stubbed, not yet implemented)

- Dashboard analytics and charts
- Cards management
- Deposits and investments tracking
- Loans management
- Savings goals
- Payments overview
- User settings

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TailwindCSS 4, Lucide React |
| Animations | Motion |
| Forms | React Hook Form 7, Zod 4 |
| Notifications | React Toastify |
| Auth | NextAuth 5 (beta) |
| ORM | Prisma 7 |
| Database | PostgreSQL (hosted on Neon) |
| Language | TypeScript 6 |
| Linting | ESLint 9 (flat config) |
| Formatting | Prettier 3 (with TailwindCSS class sorting) |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/                  # Public auth routes (login, signup, forgot-password)
│   ├── (protected)/             # Authenticated dashboard routes
│   │   └── dashboard/
│   │       ├── transactions/    # Transaction CRUD pages
│   │       ├── cards/           # (planned)
│   │       ├── deposits/        # (planned)
│   │       ├── loans/           # (planned)
│   │       ├── payments/        # (planned)
│   │       ├── savings/         # (planned)
│   │       ├── profile/
│   │       └── settings/        # (planned)
│   └── api/auth/[...nextauth]/  # NextAuth catch-all route
├── auth/                        # NextAuth config and utilities
├── components/
│   ├── forms/                   # Form components
│   ├── layouts/                 # Sidebar, Header, Footer, Dialog
│   └── ui/                      # Reusable UI primitives
├── lib/
│   ├── actions/                 # Next.js Server Actions
│   ├── db/                      # Prisma client + query functions
│   ├── schemas/                 # Zod validation schemas
│   ├── constants/               # App-wide constants and UI config
│   └── utils/                   # Helper utilities
├── context/                     # React Context (ThemeContext)
├── hooks/                       # Custom React hooks
└── types/                       # TypeScript type definitions
prisma/
├── schema.prisma                # Database schema (User, Account, Transaction)
└── migrations/                  # Migration history
```

---

## Database Schema

Three main models:

- **User** — email/password auth; relations to Accounts and Transactions
- **Account** — OAuth provider integration (NextAuth adapter)
- **Transaction** — Financial records with category, amount, currency, status, payment method

---

## Prerequisites

- Node.js 18+
- npm 9+
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

---

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Create a `.env.local` file:

```env
AUTH_SECRET=your-nextauth-secret
```

Generate `AUTH_SECRET` with:

```bash
npx auth secret
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/hasiukrostyslav/Next_SmartBudget.git
cd Next_SmartBudget

# Install dependencies (also generates Prisma client)
npm install

# Apply database migrations
npx prisma migrate deploy

# Start development server
npm run dev
```

---

## Available Scripts

```bash
npm run dev      # Start dev server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Author

[Rostyslav Hasiuk](https://github.com/hasiukrostyslav)
