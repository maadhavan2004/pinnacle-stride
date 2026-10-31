# PinnacleStride Platform

> **Build Beyond. Stride Ahead.**  
> A product-building technology startup that also delivers custom digital solutions to businesses.

---

## 🏛 System Architecture Overview

This monorepo houses the complete public website, admin operations portal, shared TypeScript packages, and backend REST API for **PinnacleStride**.

```
pinnacle-stride/
├─ apps/
│  ├─ web/              # Next.js 15 (App Router): Public Site + /admin backoffice
│  └─ api/              # NestJS Fastify REST API (/api/v1) & Prisma ORM
├─ packages/
│  ├─ ui/               # Shared Design System tokens, Logo, buttons, & accessible primitives
│  ├─ schemas/          # Shared Zod schemas & TypeScript type contracts
│  └─ content/          # Structured services, delivery stages, team profiles, & legal docs
├─ infra/
│  ├─ compose/          # Docker Compose definitions (Postgres 16, Redis 7, MinIO, Mailpit)
│  └─ caddy/            # Caddyfile reverse-proxy with automated TLS & HTTP/3
└─ docs/                # Architecture Decision Records (ADRs) & specifications
```

---

## 🚀 Quickstart & Local Development

### Prerequisites
- **Node.js**: v22 LTS or newer
- **pnpm**: v9+ (or v12)
- **Docker**: For local PostgreSQL, Redis, MinIO, and Mailpit services

### 1. Install Workspace Dependencies
```bash
pnpm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```

### 3. Spin Up Local Infrastructure (Postgres, Redis, MinIO, Mailpit)
```bash
docker compose -f infra/compose/compose.dev.yml up -d
```

### 4. Run Database Migrations & Seeds
```bash
pnpm db:migrate
pnpm db:seed
```

### 5. Launch Development Servers (Turborepo)
```bash
pnpm dev
```

- **Public Marketing Website**: [http://localhost:3000](http://localhost:3000)
- **Admin Operations Portal**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Backend API & Swagger Docs**: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)
- **Mailpit Email Testing UI**: [http://localhost:8025](http://localhost:8025)

---

## 🛡 Security & Privacy Principles
- **No Third-Party Tracking**: Cookieless privacy-conscious metrics.
- **Honeypot & Rate Limiting**: Protection on public contact endpoints.
- **Data Minimisation**: Compliance with India's DPDP Act and international privacy frameworks.
- **Strict Type Safety**: Shared Zod schemas between client forms and backend DTOs.
- **WCAG 2.2 Level AA**: Keyboard operability, visible focus indicators, and accessible contrast.
