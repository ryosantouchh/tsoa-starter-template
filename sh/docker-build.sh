#!/bin/bash

build() {
  echo "Build Docker Image..."
  docker build --no-cache -t ryosantouchh/tsoa-poc-api-app:dev -f ./docker/Dockerfile .
  docker push ryosantouchh/tsoa-poc-api-app:dev
}

build

