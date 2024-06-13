#!/bin/bash

set -e

echo "########## Processing enviroment variables ##########"
cp "$ENV_APP"   .env.app

echo "########## Pass additional enviroment variables ##########"
touch .env
echo "CI_REGISTRY=$CI_REGISTRY
CI_PROJECT_NAMESPACE=$CI_PROJECT_NAMESPACE
CI_PROJECT_NAME=$CI_PROJECT_NAME
COMMIT=$CI_COMMIT_SHORT_SHA" >> .env
