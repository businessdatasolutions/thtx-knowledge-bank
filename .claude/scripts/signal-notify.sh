#!/bin/bash

# Debug logging
exec >> /tmp/claude-hook.log 2>&1
echo "=== Hook triggered at $(date) ==="
echo "PWD: $(pwd)"
echo "INPUT:"
cat | tee /tmp/hook-input.json

PHONE="+31657721448"
GROUP_ID="H0zMbaAsiCaXmwvm+yf6T28sGPvov6+Qxg1HWHrNqj8="

MESSAGE=$(cat /tmp/hook-input.json | jq -r '.message // "Awaiting input"')
TIMESTAMP=$(date "+%H:%M:%S")

echo "Sending: $MESSAGE"
/opt/homebrew/bin/signal-cli -u "$PHONE" send -g "$GROUP_ID" -m "🤖 [$TIMESTAMP]: $MESSAGE"
echo "Exit code: $?"