#!/bin/sh
set -e

export USER_ID=$(id -u)
export GROUP_ID=$(id -g)

docker-compose -f docker-compose.yml -f docker-compose.dev.yml build --force-rm
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --force-recreate --remove-orphans
