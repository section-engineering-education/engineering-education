#!/bin/sh
# test -z "${DEBUG}" || 
set -o xtrace
set -o errexit

# This script calculates the hashes of the content of all the source files used
# to build a Docker image and outputs a prefix of the resulting hash to be used
# as the image.

# The hash is calculated without actualling build the image so that it can be
# calculated for injection into yaml files without first needing to perform a
# potentially time and resource intensive build of each yaml-referenced image.

# CAVEATS:
#  * Does not support images built with Build Args but we know this can be
#    solved by hashing the args separately when this capability is needed.
#  * Changes to external dependencies fetched during the build, e.g. apt-get or
#    wget, will not alter the hash. Reduce external dependencies where feasible,
#    and use explicitly versioned references to external dependencies otherwise.

main () {
  local image_dir=$1 dockerfilename=$2 versionTag=$3 dockerfile_override iid

  if [ -z "${image_dir}" ]
  then
    printf 'Usage: %s <image_dir>\n' "$0" >&2
    return 1
  fi

  if [ -z "${dockerfilename}" ]
  then
    dockerfilename="Dockerfile"
  fi

  if [ ! -s "${image_dir}/${dockerfilename}" ]
  then
    printf 'Expected non-empty %s in directory "%s".\n' "${dockerfilename}" "${image_dir}" >&2
    return 1
  fi

  if grep -qi 'Dockerfile' "${image_dir}/.dockerignore" 2>/dev/null
  then
    printf 'WARNING: Dockerfile is in .dockerignore. Dockerfile content will not influence the tag.\n' >&2
    # CONSIDER promote to error and abort, or calculate the Dockerfile hash externally.
  fi

  # The temporary Dockerfile needs to exist in the image directory otherwise
  # the Docker CLI modifies the .dockerignore file in transit with randomised
  # contents resulting in a different hash on every build.
  dockerfile_override="${image_dir}/.dockerfile.content-tag-467279"
  trap 'rm -f "${dockerfile_override}"' RETURN

  # By calculating the hashes inside a Docker build, we see exactly the same
  # results of the Docker build context (with .dockerignore file processing)
  # as the actual build but without needing to re-implement it ourselves.
  cat <<'EOF' >"${dockerfile_override}"
FROM busybox:1
WORKDIR /src/
ENTRYPOINT ["/bin/sh", "-c", "find . -type f \\! -path ./.dockerfile.content-tag-467279 \\! -path ./.imagename -exec sha256sum -b {} +"]
COPY . /src/
EOF

  iid=$(
    docker image build -q -f "${dockerfile_override}" "${image_dir}"
  )

  docker container run --rm "${iid}" |
    LC_ALL=C sort -k1.67 | # 67 is the offset of the filename after the hash
    sha256sum -b |
    cut -c-5 |
    sed "s/$/${versionTag}/"
}

main "$@"
