#!/data/data/com.termux/files/usr/bin/bash

PID_FILE=".dev-pids"

# ===============================
# Guard: prevent double start
# ===============================
if [ -f "$PID_FILE" ]; then
  echo "⚠️ Services are already running."
  echo "Running PIDs:"
  cat "$PID_FILE"
  echo ""
  echo "🛑 Stop them first using:"
  echo " ./stop-dev.sh"
  exit 1
fi

echo "🚀 Starting all services..."

# ===============================
# api-core
# ===============================
echo "▶ api-core (3002)"
cd apps/api-core || exit 1
pnpm dev &
API_CORE_PID=$!

# ===============================
# auth-service
# ===============================
echo "▶ auth-service (3003)"
cd ../auth-service || exit 1
node index.js &
AUTH_PID=$!

# ===============================
# token-service
# ===============================
echo "▶ token-service (3004)"
cd ../token-service || exit 1
node index.js &
TOKEN_PID=$!

# ===============================
# nft-service
# ===============================
echo "▶ nft-service (3005)"
cd ../nft-service || exit 1
node index.js &
NFT_PID=$!

# ===============================
# api-gateway
# ===============================
echo "▶ api-gateway (3010)"
cd ../api-gateway || exit 1
node index.js &
GATEWAY_PID=$!

# ===============================
# back to root
# ===============================
cd ../../ || exit 1

# ===============================
# Save PIDs
# ===============================
echo "$API_CORE_PID $AUTH_PID $TOKEN_PID $NFT_PID $GATEWAY_PID" > "$PID_FILE"

echo ""
echo "✅ All services started successfully"
echo "PIDs:"
echo " api-core:      $API_CORE_PID"
echo " auth-service:  $AUTH_PID"
echo " token-service: $TOKEN_PID"
echo " nft-service:   $NFT_PID"
echo " api-gateway:   $GATEWAY_PID"
echo ""
echo "🌐 Gateway health:"
echo " curl http://localhost:3010/health"
echo ""
echo "🛑 To stop all services:"
echo " ./stop-dev.sh"

