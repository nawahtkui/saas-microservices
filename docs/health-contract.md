# Health Endpoint Contract

This document defines the standard **Health Check Contract** used across all microservices.

## Endpoint

GET /health

## Response (200 OK)

{
  "status": "ok",
  "service": "<service-name>",
  "uptime": 123.45,
  "timestamp": "ISO-8601"
}

## Fields

status: service health
service: service name
uptime: process uptime in seconds
timestamp: response time

## Services

api-core:3002
auth-service:3003
token-service:3004
nft-service:3005

Status: Adopted
