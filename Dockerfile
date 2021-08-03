FROM ubuntu:bionic

ENV BRANCH "local"

RUN apt-get update && \
    apt-get install -y \
        ca-certificates \
        nodejs \
        npm \
        python-pip \
        wget && \
    update-ca-certificates

# Hugo
ENV HUGO_VERSION=0.69.2
RUN wget https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz -O hugo.tar.gz && \
    tar -xzf hugo.tar.gz && \
    rm hugo.tar.gz && \
    mv hugo /usr/bin && \
    chmod 755 /usr/bin/hugo

# awscli
RUN pip install awscli

# node + yarn
ENV VERSION=v11.11.0 NPM_VERSION=6 YARN_VERSION=latest
ENV NODE_VERSION 11.11.0

RUN npm i -g n && \
    n ${NODE_VERSION}

RUN npm install -g yarn

# Website source
RUN mkdir -p /src
WORKDIR /src
COPY package.json yarn.lock /src/
RUN yarn install
COPY . /src/

CMD ["/usr/bin/hugo", "server", "--bind", "0.0.0.0"]
