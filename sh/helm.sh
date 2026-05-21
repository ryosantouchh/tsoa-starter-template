#!/bin/bash

helming() {
  echo "Deploying to cluster..."
  helm dep update ./deployments/charts/umbrella
  helm upgrade --install tsoa-poc ./deployments/charts/umbrella -f ./deployments/environment/local/values.yaml -f ./deployments/environment/local/secret.yaml --namespace api-app-local-namespace
}

helming

