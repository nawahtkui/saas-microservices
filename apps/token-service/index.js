import "dotenv/config";
import express from "express";

const app = express();

/* ===============================
   Service configuration
================================ */
const SERVICE_NAME = process.env.SERVICE_NAME || "token-service";
const PORT = Number(process.env.PORT) || 3004;

/* ===============================
   Health endpoint (STANDARD)
================================ */
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: SERVICE_NAME,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* ===============================
   Server start
================================ */
app.listen(PORT, () => {
  console.log(`🪙 ${SERVICE_NAME} running on port ${PORT}`);
});

