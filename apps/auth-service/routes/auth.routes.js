import express from "express";
import fs from "fs";
import path from "path";
import { hashPassword, verifyPassword } from "../lib/password.js";
import { signToken } from "../lib/jwt.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const dataPath = path.join(process.cwd(), "data", "users.json");

function readUsers() {
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
}

function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

export function authRoutes({ jwtSecret, jwtExpiresIn, bcryptRounds }) {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const users = readUsers();
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const password_hash = await hashPassword(password, bcryptRounds);
    users.push({
      id: Date.now().toString(),
      email,
      password_hash,
      role: "user",
      created_at: new Date().toISOString(),
    });

    writeUsers(users);
    return res.status(201).json({ message: "User registered" });
  });

  router.post("/login", async (req, res) => {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "email and password required" });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = signToken(
      { sub: user.id, role: user.role },
      jwtSecret,
      jwtExpiresIn
    );

    return res.json({ access_token: token, token_type: "Bearer" });
  });

  router.get("/me", requireAuth(jwtSecret), (req, res) => {
    return res.json({ id: req.user.sub, role: req.user.role });
  });

  return router;
}
