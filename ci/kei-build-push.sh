#!/bin/bash
test -z "${DEBUG}" || set -o xtrace
set -o errexit

cd "$(dirname "$0")"

cert=/etc/ssl/certs/ca-certificates.crt

main() {
  # Build new image with hash and push to docker
  bash docker-update-build-push.sh ../ Dockerfile section-enged
  
  setCluster
}

setCluster() {
  # Configure kubectl to talk to Kei
  
  # change the cert path depending on OS.
  if [[ "$OSTYPE" == "darwin"* ]]; then
    cert=/usr/local/etc/ca-certificates/cert.pem
  fi

  kubectl config set-cluster section \
  --server=https://1723596800.kube.api.section.io/ \
  --certificate-authority=$cert

  # 
  # Add $KEI_USER_TOKEN to repo....
  # Will this work as students will be creating PRs from forked repos???
  # 
  kubectl config set-credentials section-user --token=$KEI_USER_TOKEN

  kubectl config set-context my-section-application --cluster=section --user=section-user --namespace=default

  kubectl config use-context my-section-application

  kubectl version

  # Apply the yamls
  kubectl apply -k ../k8s/base
}

"$@"
