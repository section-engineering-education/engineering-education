#! /bin/bash
test -z "${DEBUG}" || set -o xtrace
set -o errexit

cd "$(dirname "$0")"
ci_dir="$(pwd)"
export DEPLOY_LOCAL=true

echo Testing Minikube status...

if minikube status | head -n 1 | grep -o "Stopped"
then
    echo Starting Minikube...
    minikube start
else
    echo Running
fi
test -n "${DOCKER_HOST}" || eval $(${ci_dir}/minikube-docker-env.sh)

echo Building images...

skip_push="true" "${ci_dir}/docker-update-build-push.sh" ../ Dockerfile.kei section-enged "-dev" "k8s/base"

kubectl apply -k ../k8s/overlays/dev
