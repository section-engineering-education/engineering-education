---
layout: engineering-education
status: publish
published: true
url: /what-is-kafka-how-to-build-and-dockerize-a-kafka-cluster/
title: What is Kafka? How to Build and Dockerize a Kafka Cluster
description: In this article, we will be introduced to Kafka. We will be using Kafka to build a Kafka cluster and Docker to Dockerize the Kafka cluster.
author: faith-musyoka
date: 2021-07-27T00:00:00-04:30
topics: [Containers]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/what-is-kafka-how-to-build-and-dockerize-a-kafka-cluster/hero.png
   alt: Docker Kafka Image
---
[Kafka](https://kafka.apache.org/) is an open-source, distributed event streaming platform. It enables developers to collect, store and process data to build real-time event-driven applications at scale. It allows developers to build applications that continuously produce and consume streams of data records, making the application a high-performance data pipeline.
<!--more-->
### How does a Kafka application work?
Let's say a company has a source and a target system with an aim to exchange data. In this case, a company is not using Kafka architecture. However, when this company grows, it will have many target systems and source systems that need to exchange data with one another.

This means there are more interaction environments that the company needs to configure, such as choosing network protocols and data formats to determine data shapes and data evolutions.

If a company has ten such source systems and fifteen target systems, the company needs to have at least 150 well-established connections to enable data interactions between these systems. Thus, each time you integrated a source system with a target system, you will have an increased load of connections that the application needs to make.

Let's take a case of traditional HTTP networks protocol where a client sends a message to a server. Due to a load of connections, this means the server has a high possibility of being slow to respond to the client. In this case, the client is coupled with the server. If the server is slow, we get low latency. If the server dies, the request fails and has to be retried. This is where Kafka comes to the rescue.

A Kafka sever works just like this messaging system. However, the Kafka server is used as a message broker. In a Kafka server, we have two primary abstractions, a producer and a consumer. Producers produce content and publish it to the Kafka server. A consumer consumes this content from the Kafka server. In this case, every producer can generate some messages and post them on a Kafka server. A consumer can then consume these messages directly from the Kafka server. This way, Kafka acts as a broker between the two.

![apache-kafka-diagram](/engineering-education/what-is-kafka-how-to-build-and-dockerize-a-kafka-cluster/apache-kafka-diagram.png)

[Image source](https://blog.softwaremill.com/what-is-apache-kafka-and-what-are-kafka-use-cases-871666dd4eed)

And often, a Kafka server is referred to as a broker. It acts as a system where you can store messages. A consumer who may be interested in the message will get the message from the Kafka broker. This creates a lot of architectural advantages with scalability and high availability. We can scale producers (clients) to produce more messages, more brokers (Kafka) to deal with messages, and scale consumers (servers) to process messages.

### Why we need Kafka
Kafka is referred to as a distributed application. Kafka will be referred to as a Kafka cluster in the production environment due to it being a distributed platform. A Kafka cluster comprises more than one Kafka broker. This way, data is distributed across several networks of different brokers.

Unlike the traditional HTTP networks, a Kafka cluster is fault-tolerant. The system will still operate whenever one component fails. Furthermore, Kafka can replicate data across several brokers. When a producer produces a message, Kafka will use a replication factor to publish these messages across different Kafka brokers.

In each broker, messages are stored as a topic. Topics can be divided into partitions, and the message goes into a partition. We can tell Kafka to store copies of that message on separate brokers in different partitions. This way, when a broker dies, messages are not lost.

In addition, an interested consumer can subscribe to these topics and start receiving messages in order with an index number assigned to each message. Furthermore, if the consumer fails or crashes, it can use the index number to retry and continue where it left off.

![apache-kafka-partitions](/engineering-education/what-is-kafka-how-to-build-and-dockerize-a-kafka-cluster/apache-kafka-partitions.png)

[Image source](https://www.cloudkarafka.com/blog/part1-kafka-for-beginners-what-is-apache-kafka.html)

The concept of topics and partitions makes a Kafka cluster more scalable. This means you can scale a Kafka application based on the low requirements and the number of users you have. This way, you can add new brokers whenever necessary. Or increase the number of consumers and push more messages by scaling the number of partitions in a broker.

This guide will discuss some essential concepts of Kafka and Docker and finally dockerize a Kafka application using Docker. This way, it becomes platform-independent. In this way, it becomes platform agnostic. This allows us to run our services on any operating system without having to make any changes to the operating system or installing new dependencies.

#### Prerequisites
To follow along with this article, it is crucial to have the following:

- Prior experience [working with Docker](/engineering-education/getting-started-with-docker/)

- [Docker and docker-compose](https://www.docker.com/products/docker-desktop) installed on your computer.

- Ensure you have [git bash](https://gitforwindows.org/) installed on your computer.

You can check the above installations by running the following commands respectively:

```bash
docker --version
```

And:

```bash
docker-compose --version
```

In case one of them yields an error, be sure to install it before proceeding.

### Goal
In this tutorial, we will:

- Set up a Kafka cluster using `docker-compose`.
- Create a topic inside the Kafka cluster.
- View all created topics inside the Kafka cluster.

### Step 1: Adding a docker-compose script
We will start by creating a project directory and then a  `docker-compose.yml` file at the root of our project to dockerize a Kafka cluster. In this `docker-compose.yml`, we will define the version and the services we want to run as follows:

```yml
version: '3'
services:
  zookeeper:
    image: wurstmeister/zookeeper
    container_name: zookeeper
    ports:
      - '2181:2181'
  kafka:
    image: wurstmeister/kafka
    container_name: Kafka
    ports:
      - '9092:9092'
    environment:
      KAFKA_ADVERTISED_HOST_NAME: localhost
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
```

From the above script, we are:

- Defining the version we want to use for `docker-compose`.
- Defining the two services we want to run. That is Zookeeper and Kafka.
  - Kafka - To create the Kafka instance.
  - Zookeeper - Kafka depends on it to provide various levels of management such as metadata storage, leader election, health check, etc.

![kafka broker](/engineering-education/what-is-kafka-how-to-build-and-dockerize-a-kafka-cluster/kafka-broker.png)

[Image source](https://data-flair.training/blogs/kafka-broker/)

Each service has the following properties

- Image of the service from DockerHub.
- A name for the container.
- A port number that the container will run on for accessibility.
- An environment variable that will be replaced during Docker creation.

### Step 2: Executing docker-compose.yml script
Open the terminal from your project folder and run the following command to start the containers that we have set in the docker-compose.yml script.

```bash
docker-compose -f docker-compose.yml up -d
```

The above command will install all the dependencies needed and start the containers in a background mode. Then, you can verify if the containers are up and running. Run this command.

```bash
docker ps
```

![running-containers](/engineering-education/what-is-kafka-how-to-build-and-dockerize-a-kafka-cluster/running-containers.png)

### Step 3: Executing the Kafka container
Get into the Kafka container by executing the below command:

```bash
docker exec -it kafka /bin/sh
```

The above command will execute the Kafka container in an interactive mode using bash.

In the resulting bash terminal, we will create a topic. To do this, we will follow the following steps.

1. First, navigate to the `kafka` folder inside the `opt` folder. This command below will help you do so.

```bash
cd opt/kafka
```

2. Execute the `kafka-topics.sh` script inside the bin folder to create a topic using the command below.

```bash
./bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic test
```

In the above command, we are creating a topic with the following declarations.

1. `--create` - To imply we are creating a topic.
2. `--zookeeper` - The zookeeper container that is running together with its port.
3. `--replication-factor` - The number of copies we want for this topic in the cluster.
4. `--partitions` - The number of divisions of the topic for producer-consumer scalability.
5. `--topic` - The name of the topic we want to create.

Once you have executed the above command, the name of the topic should be returned. To check your topics, run:

```bash
./bin/kafka-topics.sh --list --zookeeper zookeeper:2181
```

From above, we are executing the `kafka-topics.sh` script in the bin folder, passing the `--list` to list and the `--zookeeper`, which is the running container with its port.

At this point, you have a working Kafka cluster with its Zookeeper. To stop the containers, you can run this command:

```bash
docker-compose down
```

### Conclusion
As you move messages from point A to point B, the Kafka broker is useful for data replication. Kafka is built on a high-performance architecture that ensures low latency, scalability, and throughput. Event streaming and processing systems rely on Kafka as their backbone. This ensures system health by providing unified real-time data feeds.

Some of the everyday use cases of Kafka include daily news feeds, such as the New York Times. It stores and distributes real-time news to its readers using Apache Kafka streams. Messaging applications, LinkedIn, for example, is estimated to process five trillion messages per day.

Kafka is used by Netflix for both real-time monitoring and event processing. Kafka is used by Cloudflare for log processing and analytics pipelines. They can now collect hundreds of billions of events from various servers. Uber, Adidas, PayPal, Cisco, and Pinterest, to name a few, are among the companies that use Kafka.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
