# SaaS Microservices Backend

Production-ready **SaaS backend architecture** built with Node.js and Microservices.

This project provides a solid foundation for building developer platforms, internal tools, or SaaS products.

---

## ✨ Features

- 🔐 JWT Authentication (Auth Service)
- 🌐 API Gateway (env-based routing)
- 🧩 Microservices architecture
- 🐳 Docker & docker-compose ready
- 🧪 Health checks for all services
- ⚙️ Environment-based configuration
- 📄 Clean API documentation

---

## 🧱 Architecture Overview


Client
|
v
API Gateway (3010)
|
|-- Auth Service (3003)
|-- API Core (3002)
|-- Token Service (3004)
|-- NFT Service (3005)


All external traffic goes through the **API Gateway**.

---

## 🚀 Getting Started

### Local Development (without Docker)

Start services manually:

```bash
# Auth Service
cd apps/auth-service
node index.js

# API Core
cd apps/api-core
pnpm dev

# Token Service
cd apps/token-service
node index.js

# NFT Service
cd apps/nft-service
node index.js

# API Gateway
cd apps/api-gateway
node index.js


Gateway will be available at

http://localhost:3010


Docker (Recommended) 

Docker is supported on Linux, macOS, Windows (WSL).



docker compose up --build

Gateway:

http://localhost:3010

📄 API Documentation 

Full API documentation is available here:

➡️ docs/api.md

Includes:

Authentication endpoints

JWT usage

Gateway routes

Health checks

Error codes


Authentication Flow 

Register user

Login to receive JWT

Send JWT via Authorization: Bearer <token>

Access protected routes through Gateway


🧪 Health Check

curl http://localhost:3010/health


Returns aggregated health of all services

🗂️ Project Structure 



apps/
  api-core/
  api-gateway/
  auth-service/
  token-service/
  nft-service/

docs/
  api.md

docker-compose.yml


🧠 Use Cases 

SaaS backend foundation

Developer platforms

Internal tools

API-first products

Microservices learning reference

📌 Status 

✅ Stable
✅ Production-ready foundation
🚧 Business logic can be extended

📜 License 

MIT



