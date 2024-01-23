#!/bin/sh

container_names=("laar_backend" "laar_frontend")

for container_name in "${container_names[@]}"; do
  sudo timeout 30s sh -c "until docker inspect --format='{{.State.Health.Status}}' $container_name 2>/dev/null | grep -q 'healthy'; do
    echo 'Waiting for container to be healthy...'
    sleep 2
  done"
  echo "Container $container_name is healthy."
done
