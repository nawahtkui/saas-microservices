#!/data/data/com.termux/files/usr/bin/bash

PID_FILE=".dev-pids"

if [ ! -f "$PID_FILE" ]; then
  echo "ℹ️ No running services found."
  exit 0
fi

echo "🛑 Stopping all services..."
kill $(cat "$PID_FILE") 2>/dev/null
rm "$PID_FILE"
echo "✅ All services stopped"
