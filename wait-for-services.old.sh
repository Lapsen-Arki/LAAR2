#!/bin/sh

set -e

timeout=${TIMEOUT:-60}

echo "Waiting for services to be ready..."

# Use a tool like netcat or wget to check the availability of services

# Example with wget
# until wget -qO- http://backend:3000 && wget -qO- http://frontend:5000; do
#     sleep 1
#     timeout=$((timeout - 1))
#     if [ "$timeout" -eq 0 ]; then
#         echo "Timeout reached. Services not ready."
#         exit 1
#     fi
# done

# Example with netcat
echo backend frontend
until nc -z backend 3000 && nc -z frontend 5000; do
    sleep 1
    timeout=$((timeout - 1))
    if [ "$timeout" -eq 0 ]; then
        echo "Timeout reached. Services not ready."
        exit 1
    fi
done

echo "Services are ready!"