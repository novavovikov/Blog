#!/bin/sh
set -e

#settings
export NETWORK="blog_net"
export DOCKERFILE="$PWD/proxy/Dockerfile"
export DOCKERFILE_TAG="proxy_nginx"

#let's go
docker rm -f "$DOCKERFILE_TAG" || true
docker build --no-cache \
  --force-rm \
  -f "$DOCKERFILE" \
  -t "$DOCKERFILE_TAG" .

docker run --network "$NETWORK" \
  --name "$DOCKERFILE_TAG" \
  -p 80:80 -p 443:443 \
  -d "$DOCKERFILE_TAG"
