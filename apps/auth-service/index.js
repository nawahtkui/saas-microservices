import "dotenv/config";
import express from "express";
import { authRoutes } from "./routes/auth.routes.js";

const app = express();
app.use(express.json());

const SERVICE_NAME = process.env.SERVICE_NAME || "auth-service";
const PORT = Number(process.env.PORT) || 3003;

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is required");
}

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: SERVICE_NAME,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(
  "/auth",
  authRoutes({
    jwtSecret: JWT_SECRET,
    jwtExpiresIn: JWT_EXPIRES_IN,
    bcryptRounds: BCRYPT_ROUNDS,
  })
);

app.listen(PORT, () => {
  console.log(`🔐 ${SERVICE_NAME} running on port ${PORT}`);
});

