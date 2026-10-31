# ADR 002: Next.js with Hybrid SSR/SSG/ISR for Public Site and Admin UI

## Status
Accepted

## Context
We need exceptional SEO discoverability, sub-2-second load times on mobile devices, and an integrated private administrative backoffice.

## Decision
We chose **Next.js (App Router)** with React Server Components.
- Public marketing pages (Home, About, How We Work, Legal) use **Static Site Generation (SSG)** for optimal edge delivery.
- Dynamic listings (Services, Projects, Products) use **Incremental Static Regeneration (ISR)**.
- The Admin portal (`/admin`) is rendered with interactive client boundaries behind authentication and excluded from search indexes (`noindex`).

## Consequences
- Single unified React codebase for marketing and operations.
- Minimal client-side JavaScript sent to public visitors (<150KB gzipped).
- Lighthouse performance scores of 90+ achievable on low-bandwidth networks.
