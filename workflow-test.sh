FIREBASE_KEY_JSON=$(cat .env | grep FIREBASE_KEY_JSON | cut -d '=' -f2)

# Run local-initialize and wait for completion
sudo act -P self-hosted=ghcr.io/catthehacker/ubuntu:full-latest --env FIREBASE_KEY_JSON="$FIREBASE_KEY_JSON"

