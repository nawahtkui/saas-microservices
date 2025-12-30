import express from "express";

const app = express();
const PORT = 3010;

// Timeout (ms) لكل خدمة
const TIMEOUT = 2000;

// قائمة الخدمات
const services = [
  { name: "api-core", url: "http://localhost:3002/health" },
  { name: "auth-service", url: "http://localhost:3003/health" },
  { name: "token-service", url: "http://localhost:3004/health" },
  { name: "nft-service", url: "http://localhost:3005/health" },
];

// fetch مع timeout
async function fetchWithTimeout(url, timeout) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

app.get("/health", async (_req, res) => {
  const results = {};
  let healthy = 0;
  let unhealthy = 0;

  await Promise.all(
    services.map(async (service) => {
      try {
        const data = await fetchWithTimeout(service.url, TIMEOUT);
        results[service.name] = data;

        if (data.status === "ok") {
          healthy++;
        } else {
          unhealthy++;
        }
      } catch {
        results[service.name] = {
          status: "error",
          error: "Service unreachable or timeout",
        };
        unhealthy++;
      }
    })
  );

  const overallStatus = unhealthy === 0 ? "ok" : "degraded";

  res.json({
    gateway: "api-gateway",
    status: overallStatus,
    timestamp: new Date().toISOString(),
    summary: {
      total: services.length,
      healthy,
      unhealthy,
    },
    services: results,
  });
});

app.listen(PORT, () => {
  console.log(`🌐 API Gateway running on port ${PORT}`);
});

