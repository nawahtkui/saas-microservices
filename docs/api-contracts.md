

# API Contracts – Nawah SaaS

## Overview
This document defines the API contracts for Nawah SaaS.
It describes how the Dashboard communicates with backend services
through a single entry point: `api-core`.

The goal is to keep contracts clear, stable, and easy to evolve.

---

## Architecture Decision
- `api-core` is the **API Gateway**
- All external clients (Dashboard, future integrations) communicate only with `api-core`
- Internal services are never accessed directly by clients

---

## Authentication
All protected endpoints require a valid JWT.

### Header

Authorization: Bearer <JWT_TOKEN


---

## Base URL (Development)



http://localhost:3000



---

## Auth Endpoints

### POST /auth/login
Authenticate a user and return a JWT.

**Request**
```json
{
  "email": "admin@nawah.io",
  "password": "********"
}


Response


{
  "token": "jwt_token_here",
  "role": "admin"
}



User Endpoints GET /me 

Return information about the currently authenticated user.

Response


{
  "id": "user_id",
  "email": "admin@nawah.io",
  "role": "admin"
}


Token Service Endpoints GET /tokens/balance 

Return token balance for the authenticated user.

Response


{
  "symbol": "NWTK",
  "balance": "1000"
}



POST /tokens/transfer 

Transfer tokens to another address.

Request


{
  "to": "0xADDRESS",
  "amount": "100"
}

Response

{
  "status": "success",
  "txId": "transaction_id"
}


NFT Service Endpoints POST /nft/mint 

Mint a new NFT.

Reques


{
  "name": "Nawah NFT",
  "metadataUrl": "ipfs://..."
}


Response

{
  "nftId": "nft_id",
  "status": "minted"
}



GET /nft/:id

Retrieve NFT details.

Response

{
  "id": "nft_id",
  "name": "Nawah NFT",
  "owner": "0xADDRESS"
}


Error Format 

All errors follow a unified structure


{
  "error": true,
  "message": "Error description"
}


Versioning 

No versioning in MVP

Future versions will use /v1, /v2, etc.


Status 

Current state: Minimal API contracts

Intended use: MVP and internal development


