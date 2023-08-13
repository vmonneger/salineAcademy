#!/bin/bash

function docker_build {
  docker compose up --build -d
}

function docker_delete_db {
  docker compose stop db
  docker compose rm -f db
  docker volume rm salineacademy_db
}

function docker_delete_all {
  docker compose stop db
  docker compose stop front
  docker compose stop back
  docker compose rm -f db
  docker compose rm -f front
  docker compose rm -f back
  docker volume rm salineacademy_db
  docker volume rm salineacademy_node_modules_front
  docker volume rm salineacademy_node_modules_back
}

function docker_build_dev {
  NODE_ENV=DEV docker-compose -f docker-compose-dev.yml up -d --build
}

function usage {
  echo "Utilisation: $0 {docker-build-dev|docker-db-clean|docker-delete-all}"
  echo
  echo "docker-build-dev     - Build les images docker pour dev"
  echo "docker-db-clean      - Supprime la db et son volume"
  echo "docker-delete-all    - Supprime les containers et les volumes"
  exit 1
}

if [ -z "$1" ]; then
  usage
fi

case "$1" in
  docker-build-dev)
    docker_build_dev
    ;;
  docker-db-clean)
    docker_delete_db
    ;;
  docker-delete-all)
    docker_delete_all
    ;;
  *)
    usage
    ;;
esac

exit 0
