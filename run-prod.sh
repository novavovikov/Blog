#!/bin/sh
set -e

export USER_ID=$(id -u)
export GROUP_ID=$(id -g)

export FLASK_ENV=production
export COMPOSE_FILE=./docker-compose.yml

docker-compose build --no-cache
docker-compose up -d --force-recreate