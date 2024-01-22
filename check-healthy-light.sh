#!/bin/bash

# Function to check if a service is alive
check_service() {
  local service=$1
  local url=$2
  local timeout=$3
  local start_time=$(date +%s)

  while true; do
    status=$(curl -s "$url" | grep "OK")

    if [ -n "$status" ]; then
      echo "$service is alive"
      exit 0
    fi

    current_time=$(date +%s)
    elapsed_time=$((current_time - start_time))

    if [ $elapsed_time -ge $timeout ]; then
      echo "$service did not become alive within $timeout seconds"
      exit 1
    fi

    echo "$service not yet live"
    sleep 5
  done
}

# Check backend
check_service "Backend" "http://localhost:3000/api/alive" 120 &

# Check frontend
check_service "Frontend" "http://localhost:5000/" 120 &

wait
