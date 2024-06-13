#!/bin/bash

set -e

echo "########## Testing env variables ##########"

#declare -a variables_arr=(
#"ENV_BACKEND" "ENV_FRONTEND" "ENV_DB"
#"SSH_USER" "SSH_HOST" "SSH_PRIVATE_KEY" "SSH_KNOWN_HOSTS"
#"PROJECT_DIR" "DOCKER_COMPOSE_FILENAME" "CI_ENVIRONMENT_SLUG"
#)
#
#for i in "${variables_arr[@]}"
#do
#  if [[ -z "$i" ]]; then
#    echo "missing env $i"
#  fi
##  echo {!var}
##  test -n "$var" || echo Fatal : missing env "var"
#done

ERROR="false"

test -n "$ENV_APP" || ERROR="ENV_APP"
test -n "$SSH_USER" || ERROR="SSH_USER"
test -n "$SSH_HOST" || ERROR="SSH_HOST"
test -n "$SSH_PRIVATE_KEY" || ERROR="SSH_PRIVATE_KEY"
test -n "$SSH_KNOWN_HOSTS" || ERROR="SSH_KNOWN_HOSTS"
test -n "$PROJECT_DIR" || ERROR="PROJECT_DIR"
test -n "$DOCKER_COMPOSE_FILENAME" || ERROR="DOCKER_COMPOSE_FILENAME"
test -n "$CI_ENVIRONMENT_SLUG" || ERROR="CI_ENVIRONMENT_SLUG"

if [ "$ERROR" != "false" ]; then
  echo "Fatal: missing variable $ERROR"
  exit 1
fi

echo "########## Variables successfully passed tests ##########"
