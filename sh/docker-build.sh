#!/bin/bash

build() {
  echo "Build Docker Image..."
  docker build -t ryosantouchh/api-app:dev -f ./docker/Dockerfile .
}

build

