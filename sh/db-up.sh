#!/bin/bash

up() {
  echo "Starting Containers..."
  docker compose -f ./docker/docker-compose.local.yaml up -d
}

up

