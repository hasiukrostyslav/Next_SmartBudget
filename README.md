# Smart Budget

A full-stack personal finance application to track income, expenses, and transactions — all in one place.

> **Smart Money, Bright Tomorrow**

---

## Features

### Implemented

- **Authentication** — Sign up, sign in and sign out with email and password (Auth.js credentials provider, JWT sessions). A session lasts 7 days and is re-checked against the account every 5 minutes. Sign-in and sign-up attempts are rate limited. After signing in you return to the page that asked you to.
- **Transactions** — Create, edit, copy and delete transactions; change the status or delete several at once
- **Categories** — 35 income and expense categories
- **Search, filters and sorting** — Search by name or note; filter by category, account (card or cash), currency, status and type; sort by name, category, account, date, amount, note or status. The state lives in the URL, so a filtered list can be bookmarked or shared
- **Pagination** — Server-side, with a choice of page size
- **Multi-currency** — EUR, GBP, HUF, PLN, UAH, USD, stored as exact decimals
- **Transaction status** — Completed, pending, failed or canceled
- **Dark / light theme** — Follows the operating system until you pick one
- **Responsive layout** — The auth pages, sidebar, modals and transaction list work on phone-sized screens

### Planned (routes stubbed, not yet implemented)

- Dashboard overview and charts
- Cards
- Deposits and investments
- Loans
- Savings goals
- Payments
- Profile and settings

---

## Tech Stack

| Layer         | Technology                                                   |
| ------------- | ------------------------------------------------------------ |
| Framework     | Next.js 16 (App Router, Turbopack)                           |
| UI            | React 19, Tailwind CSS 4, Lucide React, Radix Tooltip        |
| Forms         | React Hook Form 7, Zod 4                                     |
| Notifications | React Toastify                                               |
| Auth          | Auth.js (next-auth 5 beta), bcryptjs                         |
| ORM           | Prisma 7 with the `pg` driver adapter                        |
| Database      | PostgreSQL (hosted on Neon)                                  |
| Testing       | Vitest, Testing Library, jsdom, PGlite                       |
| Language      | TypeScript 6                                                 |
| Tooling       | ESLint 9 (eslint-config-next), Prettier 3, GitHub Actions CI |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/auth/             # Public routes: login, signup
│   ├── (protected)/dashboard/   # Signed-in routes
│   │   ├── transactions/        # The transactions list
│   │   └── cards/ deposits/ loans/ payments/ savings/ profile/ settings/   # (planned)
│   ├── api/auth/[...nextauth]/  # Auth.js route handler
│   └── error.tsx, global-error.tsx, not-found.tsx   # Error and 404 pages; the dashboard has its own error.tsx and loading.tsx
├── auth/                        # Auth.js config, credentials and session checks
├── components/
│   ├── forms/                   # Form components
│   ├── layouts/                 # Sidebar, header, footer, containers
│   └── ui/                      # Reusable UI primitives
├── context/                     # ThemeContext
├── hooks/                       # Custom React hooks
├── lib/
│   ├── actions/                 # Server Actions (mutations only)
│   ├── data/                    # Reads for Server Components (the page caches them per request)
│   ├── db/                      # Prisma client and queries
│   ├── schemas/                 # Zod schemas for every input
│   ├── constants/               # App-wide constants and UI config
│   ├── utils/                   # Helpers
│   ├── env.ts                   # Environment variables, validated on first use
│   └── rateLimit.ts             # Sign-in and sign-up rate limiting
├── styles/                      # Tailwind entry, animations and component classes
├── types/                       # Shared TypeScript types
├── routes.ts                    # Route paths shared by the proxy and pages
└── proxy.ts                     # Route protection and redirects
prisma/
├── schema.prisma                # User, Account, Transaction, RateLimit
├── migrations/                  # Migration history
└── seed.mjs                     # Sample transactions for local development
scripts/replay-migrations.mjs    # Replays every migration into an empty database
docs/transactions-query.md       # The search, filter and sort behaviour, and how Express differs
.github/                         # CI workflow and Dependabot
```

---

## Database

- **User** — Email and bcrypt password hash
- **Account** — Reserved for OAuth providers; credentials sign-in does not use it
- **Transaction** — Amount, currency, category, type, payment method, status and note
- **RateLimit** — Fixed-window counters for sign-in and sign-up

The database is shared with the Express server of the React client (`react_smart_budget/server`). This repository's schema and migrations define it, so both apps change together. Rows created here get Prisma `cuid()` ids and rows created by the Express server get `cuid2` ids; both are valid.

---

## Prerequisites

- Node.js 22.22.2 or later in the 22 line, or 24.15 or later: the range Vitest 5, jsdom 30 and Prisma 7.10 support. CI uses the version in `.nvmrc`
- npm
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

---

## Environment Variables

Copy the example file and fill it in:

```bash
cp .env.example .env
```

| Variable              | Required           | Purpose                                                                                                 |
| --------------------- | ------------------ | ------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`        | Yes                | PostgreSQL connection URL                                                                               |
| `AUTH_SECRET`         | Yes                | At least 32 characters; generate one with `npx auth secret`                                             |
| `SEED_USER_EMAIL`     | For seeding        | The existing account `npx prisma db seed` adds transactions to                                          |
| `TEST_DATABASE_URL`   | For DB tests       | A disposable database the integration tests write to                                                    |
| `SHADOW_DATABASE_URL` | For `migrate diff` | An empty database Prisma can reset                                                                      |
| `TRUSTED_PROXY_HOPS`  | No                 | Proxies in front of the app that append to `X-Forwarded-For` (default 1); rate limits key clients on it |

A missing or malformed required variable stops the server with the variable's name the first time it reads the environment, which is the first request, not `next start` itself. Don't set `NODE_ENV` in `.env`: Next.js sets it for each command.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/hasiukrostyslav/Next_SmartBudget.git
cd Next_SmartBudget

# Install dependencies (also generates the Prisma client)
npm install

# Configure the environment
cp .env.example .env

# Apply database migrations
npx prisma migrate deploy

# Start the development server
npm run dev
```

To fill a new account with sample data, sign up, then run:

```bash
SEED_USER_EMAIL=you@example.com npx prisma db seed
```

---

## Available Scripts

```bash
npm run dev        # Start the dev server with Turbopack
npm run build      # Build for production
npm run start      # Start the production server
npm run lint       # Run ESLint
npm run typecheck  # Generate route types and run tsc
npm test           # Run the test suite
npm run format     # Format with Prettier
npm run db:replay  # Replay all migrations into an empty in-memory database
```

---

## Testing and CI

`npm test` runs the unit and component tests. The database integration tests are skipped unless `TEST_DATABASE_URL` is set; point it at a database you can throw away.

GitHub Actions runs on every pull request and on pushes to `main`. It lints, type-checks, replays the migrations, applies them to a fresh PostgreSQL, checks that they match `schema.prisma`, runs the full test suite and builds the app.

---

## Deployment

Apply new migrations to the production database before deploying code that needs them:

```bash
npx prisma migrate deploy
```

Before the first deploy that includes `20260914120000_amount_to_decimal`, check that every stored amount fits `numeric(14,2)`. The Express server and older versions of this app accepted any number. One row out of range fails the migration, and Prisma then refuses further deploys until it is resolved:

```sql
SELECT count(*) FROM transactions
WHERE amount = 'NaN' OR amount IN ('Infinity', '-Infinity') OR abs(amount) >= 999999999999.995;
```

If the count isn't 0, fix those rows first. If a migration has already failed, fix the data, run `npx prisma migrate resolve --rolled-back <migration name>`, and deploy again.

The amount migration rewrites `transactions`, and the index migration replaces its index. Both hold an exclusive lock on the table while they run, and the restore migration briefly locks `users` as well. Deploy at a quiet time. Each of these migrations gives up after 5 seconds if another session holds a lock, instead of stalling both apps; if one times out, run `npx prisma migrate resolve --rolled-back <migration name>` and deploy again.

Until these migrations are deployed, `npx prisma migrate dev` fails against Neon or any copy of it (P3006 in the shadow database). `20260725120050_restore_pushed_schema` is dated before migrations Neon has already recorded, and `migrate dev` doesn't replay unapplied older migrations into the shadow database. Deploy first; a fresh database is not affected.

---

## Author

[Rostyslav Hasiuk](https://github.com/hasiukrostyslav)
