FIREBASE_KEY_JSON=$(cat .env | grep FIREBASE_KEY_JSON | cut -d '=' -f2)
sudo act -P self-hosted=ghcr.io/catthehacker/ubuntu:full-latest -j local-build --env FIREBASE_KEY_JSON="$FIREBASE_KEY_JSON"