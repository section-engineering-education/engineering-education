#!/bin/bash
test -z "${DEBUG}" || set -o xtrace
set -o errexit

# This script builds the Dockerfile in the specified directory.
# If a "prepare.sh" script is found in the same directory it is executed first.
# The docker-content-tag script is used to calculate the tag to use, the image
# name comes from the directory name, and the registry is hard-coded to AWS ECR.

readonly registry=hborrelli12

main () {
  local _pwd=$(pwd)
  cd "$(dirname "$0")"
  local script_root=$(pwd)
  cd "${_pwd}"

  local this=$0 image_dir=$1 dockerfilename=$2 containerName=$3 versionTag=$4 k8sDir=$5 tag full_image_name

  if [ -z "${image_dir}" ]
  then
    printf 'Usage: %s <image_dir>\n' "${image_dir}" >&2
    return 1
  fi

  if [ -z "${dockerfilename}" ]
  then
    dockerfilename="Dockerfile"
  fi

  cd "${image_dir}"
  image_dir=$(pwd)
  cd "${_pwd}"

  if [ ! -s "${image_dir}/${dockerfilename}" ]
  then
    printf 'Expected non-empty %s in directory "%s".\n' "${dockerfilename}" "${image_dir}" >&2
    return 1
  fi

  if [ -s "${image_dir}/prepare.sh" ]
  then
    if ! (
      cd "${image_dir}"
      bash "${image_dir}/prepare.sh" || return
    )
    then
      printf 'Prepare script in "%s" failed.\n' "${image_dir}" >&2
      return 1
    fi
  fi
  
  tag=$(bash "${script_root}/docker-content-tag.sh" "${image_dir}" "${dockerfilename}" "${versionTag}")
  full_image_name="${registry}/$(basename "${containerName}"):${tag}"

  printf 'tag: "%s"' "${tag}"
  printf 'full_image_name: "%s"' "${full_image_name}"
  
  # Look for YAMLs in the component k8s directory
  cd "${image_dir}/${k8sDir}"

  grep --recursive --include "*.yml" --files-with-matches "${containerName}" . | while read -r file ; do

    sed -i "s#hborrelli12/${containerName}:.*#${full_image_name}#" "${file}"
  done


  printf 'Building %s\n' "${full_image_name}"

  local docker_experimental docker_osarch
  read -r docker_experimental docker_osarch \
   < <(docker version -f '{{.Server.Experimental}} {{.Server.Os}}/{{.Server.Arch}}')

  local docker_args=()
  if [ 'linux/amd64' != "${docker_osarch}" ]; then
    if [ 'true' != "${docker_experimental}" ]; then
      printf 'Cannot build linux/amd64 Docker images on Docker daemon "%s" unless experimental features are enabled.\n' "${docker_osarch}" >&2
      return 1
    fi
    docker_args+=(--platform=linux/amd64)
  fi

  docker image build "${docker_args[@]}" --tag "${full_image_name}" --file "${image_dir}/${dockerfilename}" "${image_dir}"

  if [ "$skip_push" != "true" ]; then
    # Push to docker hub.
    docker push ${full_image_name}
  fi

  # TODO inject git commit, branch, jenkins job into image labels
  # TODO passthrough other docker image build parameters.
}

main "$@"
