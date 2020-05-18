#!/bin/sh
set -e

export USER_ID=$(id -u)
export GROUP_ID=$(id -g)

export COMPOSE_FILE=./docker-compose.yml

docker-compose build
docker-compose up --force-recreate --remove-orphans