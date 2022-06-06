#!/bin/bash

# This script works exactly like `eval $(minikube docker-env)` except
# it will detect and fix paths for WSL. This code could be simpler if this was
# a `source`-d script but the current implemenetation keeps the usage the same
# as vanilla minikube.

translate_path () {
  local line cert_path

  if ! command -v wslpath >/dev/null
  then
    cat
    return
  fi

  while read -r line
  do
    case "${line}" in
      'export DOCKER_CERT_PATH="'*)
        # extract right-hand-side of `=`
        cert_path="${line#*=}"
        # trim surrounding quotes
        cert_path="${cert_path#\"}"
        cert_path="${cert_path%\"}"
        # convert Windows path to WSL path
        cert_path=$(wslpath -u "${cert_path}")
        # render new line
        printf 'export DOCKER_CERT_PATH="%s"\n' "${cert_path}"
        ;;
      *)
        printf '%s\n' "${line}"
    esac
  done
}

main () {
  minikube docker-env --shell bash |
    translate_path |
    sed '/^# eval/d'

  printf '# eval $(%s)\n' "$0"
}

main "$@"
