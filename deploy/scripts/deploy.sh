#!/bin/bash

set -e

echo "########## Deploying to server ##########"

echo "########## Check is folder is created ##########"
ssh "$SSH_USER"@"$SSH_HOST" "cd '$PROJECT_DIR' || mkdir -p '$PROJECT_DIR'"

echo "########## Copy .env files ##########"
scp .env          "$SSH_USER"@"$SSH_HOST":"$PROJECT_DIR"
scp .env.app  "$SSH_USER"@"$SSH_HOST":"$PROJECT_DIR"

echo "########## Pull images from Gitlab Container Registry ##########"
ssh "$SSH_USER"@"$SSH_HOST" "docker login -u '$CI_REGISTRY_USER' -p $CI_REGISTRY_PASSWORD $CI_REGISTRY"
ssh "$SSH_USER"@"$SSH_HOST" "cd '$PROJECT_DIR' && git pull"
ssh "$SSH_USER"@"$SSH_HOST" "cd '$PROJECT_DIR' && docker compose -f $DOCKER_COMPOSE_FILENAME pull"
ssh "$SSH_USER"@"$SSH_HOST" "cd '$PROJECT_DIR' && docker compose -f $DOCKER_COMPOSE_FILENAME up -d"
ssh "$SSH_USER"@"$SSH_HOST" 'docker rmi $(docker images --filter "dangling=true" -q --no-trunc)' || echo "Docker none images is not found"
ssh "$SSH_USER"@"$SSH_HOST" "docker logout $CI_REGISTRY"
