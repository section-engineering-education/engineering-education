.PHONY: test build generate inspect deploy

export PATH := bin:$(PATH)
IMAGE_NAME=section-enged.section.io
IMAGE_NAME_BETA=section-enged.beta

all: build generate

build:
	docker build --tag $(IMAGE_NAME) .

build-beta:
	docker build --tag $(IMAGE_NAME_BETA) .

gen: generate
generate:
	docker run --rm --volume "$$(pwd)/public:/src/public" $(IMAGE_NAME) hugo --environment production

generate-beta:
	docker run --rm --volume "$$(pwd)/public:/src/public" $(IMAGE_NAME_BETA) hugo --environment staging

run:
	docker run --rm --volume "$$(pwd)/public:/src/public" $(IMAGE_NAME)

qgen:
	docker run --rm --volume "$$(pwd):/src" $(IMAGE_NAME) hugo --environment development

clean:
	rm -rf ./public/*

inspect:
	docker run --rm -ti --volume "$$(pwd):/src" $(IMAGE_NAME) bash

deploy:
  # capture AWS environment variables from the environment, and inject them into the container
	@env | grep ^AWS > .env
	docker run --env-file .env --rm --volume "$$(pwd)/public:/src/public" $(IMAGE_NAME) aws s3 sync --acl public-read --delete --exclude "docs/*" public/ s3://section-enged.section.io/
	@rm .env

deployKEI:
	docker system prune -f
	bash ./ci/kei-build-push.sh main

deployKEIBeta:
	docker system prune -f
	bash ./ci/kei-build-push.sh beta

deploy-beta:
	@# capture AWS environment variables from the environment, and inject them into the container
	@env | grep ^AWS > .env
	docker run --env-file .env --rm --volume "$$(pwd)/public:/src/public" $(IMAGE_NAME_BETA) aws s3 sync --acl public-read --delete --exclude "docs/*" public/ s3://section-enged-beta/
	@rm .env

enged:
	git submodule update --recursive --remote
	git commit -m "Point to latest engineering-education content" content/engineering-education
