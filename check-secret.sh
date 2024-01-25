#!/bin/bash

API_BASE_URL="http://localhost:3000"  # Adjust with your API base URL

response=$(curl -s "${API_BASE_URL}/api/secret")

if [ "$response" == "true" ]; then
  echo "API is healthy. Response: $response"
else
  echo "API is not healthy. Response: $response"
fi
