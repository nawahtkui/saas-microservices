# API Documentation

This document describes the public API exposed through the **API Gateway**.

All requests go through the gateway:

http://localhost:3010


---

## Services Overview

| Service        | Base Path | Description                    |
|----------------|----------|--------------------------------|
| Auth Service   | /auth    | Authentication & JWT           |
| API Core       | /api     | Core application APIs          |
| Token Service  | /token   | Token-related operations       |
| NFT Service    | /nft     | NFT-related operations         |

---

# Authentication (JWT)

## Register

**POST** `/auth/register`

### Request
```json
{
  "email": "user@test.com",
  "password": "secret123"
}

Response

{
  "message": "User registered"
}



Login

POST /auth/login

Request


{
  "email": "user@test.com",
  "password": "secret123"
}


Response

{
  "access_token": "<JWT_TOKEN>",
  "token_type": "Bearer"
}



Get Current User

GET /auth/me

Headers

Authorization: Bearer <JWT_TOKEN>

Response

{
  "id": "user_id",
  "role": "user"
}


Health Checks Gateway Health 

GET /health

Returns the status of all services.

Example Response 

{
  "gateway": "api-gateway",
  "status": "ok",
  "services": {
    "auth": { "status": "ok" },
    "api": { "status": "ok" },
    "token": { "status": "ok" },
    "nft": { "status": "ok" }
  }
}



ServiceEndpointauth-service/healthapi-core/healthztoken-service/healthnft-service/health

| Service       | Endpoint |
| ------------- | -------- |
| auth-service  | /health  |
| api-core      | /healthz |
| token-service | /health  |
| nft-service   | /health  |



Authentication Flow 

Register user via /auth/register

Login via /auth/login

Receive JWT access token

Send token in Authorization header

Access protected routes


Error Responses


CodeMeaning400Bad Request401Unauthorized403Forbidden409Conflict502Service Unreachable



Notes 

All authentication is handled via JWT

Gateway forwards tokens as-is

No cookies or sessions are used

Designed for SaaS & Developer Platforms


