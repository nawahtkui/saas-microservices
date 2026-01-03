# Authentication Flow – Nawah SaaS

## Overview
This document describes the basic authentication flow for Nawah SaaS.
The goal is to provide a simple, secure, and extensible authentication
mechanism suitable for early-stage development.

---

## Authentication Strategy
- Authentication is handled by a dedicated service: `auth-service`
- `api-core` acts as the API Gateway
- JSON Web Tokens (JWT) are used for stateless authentication
- Role-based access is supported (initially: `admin` only)

---

## User Roles
| Role  | Description |
|------|-------------|
| admin | Full access to dashboard and services |

---

## Auth Flow Steps

1. User accesses the Dashboard
2. User submits login credentials (email + password)
3. Dashboard sends credentials to `api-core`
4. `api-core` forwards request to `auth-service`
5. `auth-service` validates credentials
6. `auth-service` returns a signed JWT
7. `api-core` returns JWT to Dashboard
8. Dashboard stores JWT securely
9. JWT is attached to all subsequent API requests

---

## Token Handling
- JWT is sent via `Authorization` header:
