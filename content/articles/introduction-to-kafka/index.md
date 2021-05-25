---
layout: engineering-education
status: publish
published: true
url: /introduction-to-kafka/
title: Introduction to Kafka
description: This article serves to introduces the readers to the basics of Kafka, its history, architecture, and installation.
author: adith-bharadwaj
date: 2020-08-07T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-kafka/hero.jpg
    alt: introduction-to-kafka
---

_Kafka is a high-throughput distributed messaging system, owned and maintained by the [Apache software foundation](https://www.apache.org/), which has become one of the most popular open-source data processing tools in the world_. Kafka is used by many tech giants such as Uber, LinkedIn, Twitter, Netflix, etc for real-time processing of data. Before we install Kafka, it's important to understand its architecture and history.

### What is Kafka?

#### History

Kafka was developed by a team of engineers at [LinkedIn](https://engineering.linkedin.com/blog/2016/04/kafka-ecosystem-at-linkedin). _The engineers were trying to solve the problem of low-latency ingestion of large amounts of event data from the LinkedIn website_.

**Event data** is data that is generated when users register to a website, login, follow people, or like and share posts. These actions are called user events, and companies like LinkedIn track these events performed by the users and analyze the data to gain insights on customer activities to increase their retention rate. LinkedIn generates massive amounts of event data every single day, and they wanted to process this data in real-time.

Existing tools such as [RabbitMQ](https://www.rabbitmq.com/) and [ActiveMQ](http://activemq.apache.org/) were general-purpose [messaging queues](https://www.cloudamqp.com/blog/2014-12-03-what-is-message-queuing.html) that supported a wide range of protocols such as AMQP, MQTT, etc. _However, these messaging queues do not store the data once they are consumed_.

Unlike other messaging systems, the message queue in Kafka is **persistent**, and data sent is stored until a specified retention period has passed. Kafka was designed for high-throughput, fast, and scalable data streaming and offers much **higher performance** with limited resources than message brokers like RabbitMQ and ActiveMQ.

Apache Kafka is a **publish-subscribe** messaging platform, also called a message broker, designed to process [streaming data](https://aws.amazon.com/streaming-data/) in real-time and feed it for fast and scalable operations. It is a distributed streaming platform used for data processing, streaming analysis, data storage, and data visualization.

Kafka offers the ability to manage protocols across several clusters and store them in categories called **topics**. It provides a powerful platform for building distributed applications that can handle billions of events.

Kafka is used for capturing big data and real-time analysis in a variety of applications, including data mining, analytics, data visualization, and machine learning.

#### What is a publish-subscribe messaging system?

_Publish-subscribe messaging is a method of communication in which messages are exchanged between the sender and the receiver where neither of them is aware of the other's identity_. In other words, the sender (also called Publisher or Producer) and the receiver (also called subscriber or consumer) are **independent** of each other and are loosely coupled. In this system, messages are durable and are highly available for processing.

Unlike the point-to-point system where a particular message can only be consumed by one consumer, in this model, consumers can subscribe to one or more topics and consume all the messages on that topic.

![publish-subscribe](/engineering-education/introduction-to-kafka/publish-subscribe.png)

### Architecture and terminologies

In Kafka, data is referred to as a message. In other words, a message refers to a stream or array of bytes that contain some information. These are some Kafka terminologies that we need to bear in mind:

1. **Topics**

_A topic is a name or a unique id given to a category or feed to which streams of records or messages are sent_.

In Kafka, topics can have zero or more consumers that receive the data that is written to it. For example, if we want to send information about stocks, we can create a topic called "stocks", and multiple producers can send messages to that topic. The topic can also have multiple consumers collecting information about stock prices.

2. **Brokers**

_Brokers, also called Kafka nodes or Kafka servers, are responsible for facilitating between the producers and consumers_. They act as a "middleman" and store the data sent by the producer and allow the consumer to fetch the messages in a topic.

In a Kafka cluster where multiple producers and consumers are interacting with each other, brokers are essential and act as a "load balancer". Brokers can have multiple partitions of topics, and these partitions can either be a leader or a replica(a message is replicated multiple times to provide fault tolerance). The leader is responsible for all writes and reads to a topic and coordinates with the other replicas. If something happens to the leader or it is unable to function, a replica becomes the new leader, thus providing fault-tolerance.

3. **producers**

_Producers are applications that generate data and publish or send messages to one or more topics in Kafka brokers_. They do not send messages directly to the recipient. For example, if a producer generates stock data, it can write this data to a topic called "stocks" through the broker.

4. **Consumers**

_Consumers are applications that can read or receive data from one or more topics that they have subscribed to in a broker_. For example, if the producer writes to a topic called "stocks", the consumer can subscribe to that topic and pull all the messages from that topic through the broker.

5. **Cluster**

_Kafka shows its true potential when it used in a distributed system with multiple nodes working together_. A Kafka cluster is a set of two or more broker nodes. These clusters manage various activities and can efficiently distribute the load, therefore, providing high throughput and high availability.

Producers send data to a particular Kafka topic at regular intervals of time, and the broker stores these messages in different partitions. Consumers can subscribe to a specific topic and can consume messages through the broker. Zookeeper coordinates between the Kafka brokers and consumers that continuously consume the data.

[Zookeeper](https://zookeeper.apache.org/) helps keep track of the various partitions, topics, and which nodes they are stored in so that the consumer can easily retrieve the location of a topic or a message. Kafka keeps track of messages being sent to the consumer by using **offsets**. Offsets are unique ids given to messages stored in a partition. The first message gets an offset of zero, the second message gets an offset of 1, and so on. If a consumer stops consuming messages, Kafka stores the most recent offset sent to the consumer. Once the consumer resumes pulling data, Kafka simply sends the message with the next offset value and resumes the operation.

![architecture](/engineering-education/introduction-to-kafka/kafka-architecture.png)

### Installation

Kafka requires Java (OpenJDK 8) on your system. Follow [this](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04#installing-specific-versions-of-openjdk) tutorial to install java.

1. Kafka uses Zookeeper. Therefore, we first need to install Zookeeper on our systems. Download Zookeeper from the [official website](https://zookeeper.apache.org/releases.html)

2. Extract the tar file.

```bash
tar -zxf <zookeeper version>
```

3. Download Kafka from the [official website](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.5.0/kafka_2.12-2.5.0.tgz)

4. Move the tar file to any convenient location in your system.

5. Extract the tar file by running the following command:

```bash
tar -xzf <kafka version that you downloaded>
```

You have successfully installed Kafka on your system.

### Setting up a Kafka producer and consumer in Python

Let us build a simple Kafka pipeline using the [kafka-python](https://pypi.org/project/kafka-python/) module that allows us to communicate with Kafka. To install kafka-python, run the following command on the terminal:

```bash
# To install it on python3
sudo pip3 install kafka-python

# To install it on python2
sudo pip install kafka-python
```

1. Navigate to the Kafka folder and Start Zookeeper by running the following command on the terminal:

```bash
bin/zookeeper-server-start.sh config/zookeeper.properties
```

2. Open another terminal and start the Kafka server or broker:

```bash
bin/kafka-server-start.sh config/server.properties
```

3. Create a Kafka topic in a different terminal. I will create a topic called "test" by running the following command:

```bash
bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic test
```

This creates a topic called "test" with 1 replica and 1 partition on port 2181 running on our localhost. We can see a list of topics by running:

```bash
bin/kafka-topics.sh --list --zookeeper localhost:2181
```

4. Create a file called consumer.py and add the following code:

```python
from kafka import KafkaConsumer
# create a consumer that consumes messages from the topic called "test"
consumer = KafkaConsumer('test', bootstrap_servers=['localhost:9092'])

# print the message received by the consumer
for message in consumer:
    print (message)

```

Open a new terminal and run:

```bash
python3 consumer.py
```

5. Create producer.py that sends "Hello world" to the consumer.

```python
from kafka import KafkaProducer
# create a producer
producer = KafkaProducer(bootstrap_servers=['localhost:9092'])
producer.send('test', b'Hello world')
```

Open a new terminal and run:

```bash
python3 producer.py
```

You will see "Hello world" displayed on the terminal.

### Further reading

[Zookeeper tutorial](https://www.tutorialspoint.com/zookeeper/index.htm)

[Kafka vs RabbitMQ](https://www.upsolver.com/blog/kafka-versus-rabbitmq-architecture-performance-use-case)

[Creating a message broker using Kafka](https://kafka.apache.org/quickstart)

[kafka-python docs](https://kafka-python.readthedocs.io/en/master/usage.html)
