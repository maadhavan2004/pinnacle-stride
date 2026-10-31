# ADR 003: Cookie-Based Sessions with HttpOnly SameSite Flags for Admin Portal

## Status
Accepted

## Context
Administrative accounts have elevated privileges to triage leads, publish portfolio case studies, and alter public site content. Storing authentication tokens in `localStorage` exposes them to XSS attacks.

## Decision
We chose **HttpOnly, Secure, SameSite=Lax cookies** for session management with Argon2id password hashing and optional TOTP 2FA.

## Consequences
- Tokens cannot be accessed by client-side JavaScript, mitigating XSS exfiltration risks.
- CSRF protection is enforced via SameSite policies and double-submit tokens on mutating endpoints.
