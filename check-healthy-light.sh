#!/bin/bash

# Function to check if a service is alive
check_service() {
  local service=$1
  local url=$2
  local timeout=$3
  local start_time=$(date +%s)

  while true; do
    status=$(curl -fail -s "$url" | grep "OK")

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

# Check command-line arguments
if [ "$#" -ne 3 ]; then
  echo "Usage: $0 <service_name> <url> <timeout>"
  exit 1
fi

service_name=$1
url=$2
timeout=$3

# Check service
check_service "$service_name" "$url" "$timeout"
