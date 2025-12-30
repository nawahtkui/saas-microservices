import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3010;
const SERVICE_NAME = process.env.SERVICE_NAME || "api-gateway";

const SERVICES = {
  auth: process.env.AUTH_SERVICE_URL,
  api: process.env.API_CORE_URL,
  token: process.env.TOKEN_SERVICE_URL,
  nft: process.env.NFT_SERVICE_URL,
};

for (const [name, url] of Object.entries(SERVICES)) {
  if (!url) {
    throw new Error(`Missing ${name.toUpperCase()}_SERVICE_URL`);
  }
}

// Gateway health
app.get("/health", async (_req, res) => {
  const results = {};

  for (const [name, url] of Object.entries(SERVICES)) {
    try {
      const r = await fetch(`${url}/health`);
      results[name] = await r.json();
    } catch {
      results[name] = { status: "down" };
    }
  }

  res.json({
    gateway: SERVICE_NAME,
    status: "ok",
    timestamp: new Date().toISOString(),
    services: results,
  });
});

// Proxy helper
async function proxy(req, res, target) {
  try {
    const r = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.authorization || "",
      },
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : JSON.stringify(req.body),
    });

    const data = await r.text();
    res.status(r.status).send(data);
  } catch (e) {
    res.status(502).json({ error: "Service unreachable" });
  }
}

// Routes
app.use("/auth", (req, res) =>
  proxy(req, res, `${SERVICES.auth}${req.originalUrl}`)
);

app.use("/api", (req, res) =>
  proxy(req, res, `${SERVICES.api}${req.originalUrl.replace("/api", "")}`)
);

app.use("/token", (req, res) =>
  proxy(req, res, `${SERVICES.token}${req.originalUrl.replace("/token", "")}`)
);

app.use("/nft", (req, res) =>
  proxy(req, res, `${SERVICES.nft}${req.originalUrl.replace("/nft", "")}`)
);

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
});

