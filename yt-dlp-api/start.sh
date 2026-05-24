#!/bin/bash
while true; do
  echo "Starting yt-dlp API server..."
  node /home/z/my-project/yt-dlp-api/server.js
  echo "Server stopped, restarting in 3s..."
  sleep 3
done
