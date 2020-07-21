
*Kafka is a high-throughput distributed messaging system, owned and maintained by the [Apache software foundation](https://www.apache.org/), which has become one of the most popular open-source data processing tools in the world*. Kafka is used in many tech giants such as Uber, LinkedIn, Twitter, Netflix, etc for real-time processing of data. Before we install Kafka, let us understand its architecture and history. 

### What is Kafka?
#### History
Kafka was developed by a team of engineers at [LinkedIn](https://engineering.linkedin.com/blog/2016/04/kafka-ecosystem-at-linkedin). *The engineers were trying to solve the problem of low-latency ingestion of large amounts of event data from the LinkedIn website*. **Event data** is data that is generated when users register to a website, login, follow people, or like and share posts. These actions are called user events, and companies like LinkedIn track these events performed by the users and analyze the data to gain insights on customer activities to increase their retention rate. LinkedIn generates massive amounts of event data every single day, and They wanted to process this data in real-time. 

Existing tools such as [RabbitMQ](https://www.rabbitmq.com/) and [ActiveMQ](http://activemq.apache.org/) were general-purpose [messaging queues](https://www.cloudamqp.com/blog/2014-12-03-what-is-message-queuing.html) that supported a wide range of protocols such as AMQP, MQTT, etc. *However, these messaging queues do not store the data once they are consumed*. Unlike these messaging systems, the message queue in Kafka is **persistent**, and data sent is stored until a specified retention period has passed. Kafka was designed for high-throughput, fast, and scalable data streaming and offers much **higher performance** with limited resources than message brokers like RabbitMQ and ActiveMQ. 

Apache Kafka is a **publish-subscribe** messaging platform, also called a message broker, designed to process [streaming data](https://aws.amazon.com/streaming-data/) in real-time and feed it for fast and scalable operations. It is a distributed streaming platform used for data processing, streaming analysis, data storage, and data visualization. Kafka offers the ability to manage protocols across several clusters and store them in categories called **topics**. It provides a powerful platform for building distributed applications that can handle billions of events. Kafka is used for capturing big data and real-time analysis in a variety of applications, including data mining, analytics, data visualization, and machine learning.

#### What is a publish-subscribe messaging system?
*Publish-subscribe messaging is a method of communication in which messages are exchanged between the sender and the receiver where neither of them is aware of the other's identity*. In other words, the sender(also called Publisher or Producer) and the receiver(also called subscriber or consumer) are **independent** of each other and are loosely coupled. In this system, messages are durable and are highly available for processing. Unlike the point-to-point system where a particular message can only be consumed by one consumer, in this model, consumers can subscribe to one or more topics and consume all the messages on that topic. 

![publish-subscribe](/engineering-education/introduction-to-kafka/publish-subscribe.png)

### Architecture and terminologies
In Kafka, data is referred to as a message. In other words, a message refers to a stream or array of bytes that contain some information. These are some Kafka terminologies that we need to bear in mind:

1. **Topics**

*A topic is a name or a unique id given to a category or feed to which streams of records or messages are sent*. In Kafka, topics can have zero or more consumers that receive the data that is written to it. For example, if we want to send information about stocks, we can create a topic called "stocks", and multiple producers can send messages to that topic. The topic can also have multiple consumers collecting information about stock prices.

![topics](/engineering-education/introduction-to-kafka/topic.png)

2. **Brokers**

*Brokers, also called Kafka nodes or Kafka servers, are responsible for facilitating between the producers and consumers*. They act as a "middleman" and store the data sent by the producer and allow the consumer to fetch the messages in a topic. In a Kafka cluster where multiple producers and consumers are interacting with each other, brokers are essential and act as a "load balancer". Brokers can have multiple partitions of topics, and these partitions can either be a leader or a replica(a message is replicated multiple times to provide fault tolerance). The leader is responsible for all writes and reads to a topic and coordinates with the other replicas. If something happens to the leader or it is unable to function, a replica becomes the new leader, thus providing fault-tolerance. 

3. **producers**

*Producers are applications that generate data and publish or send messages to one or more topics in Kafka brokers*. They do not send messages directly to the recipient. For example, if a producer generates stock data, it can write this data to a topic called "stocks" through the broker.  

4. **Consumers**

*Consumers are applications that can read or receive data from one or more topics that they have subscribed to in a broker*. For example, if the producer writes to a topic called "stocks", the consumer can subscribe to that topic and pull all the messages from that topic through the broker. 

5. **Cluster**

*Kafka shows its true potential when it used in a distributed system with multiple nodes working together*. A Kafka cluster is a set of two or more broker nodes. These clusters manage various activities and can efficiently distribute the load, therefore, providing high throughput and high availability. 

Producers send data to a particular Kafka topic at regular intervals of time, and the broker stores these messages in different partitions. Consumers can subscribe to a specific topic and can consume messages through the broker. Zookeeper coordinates between the Kafka brokers and consumers that continuously consume the data. 

[Zookeeper](https://zookeeper.apache.org/) helps keep track of the various partitions, topics, and which nodes they are stored in so that the consumer can easily retrieve the location of a topic or a message. Kafka keeps track of messages being sent to the consumer by using **offsets**. Offsets are unique ids given to messages stored in a partition. The first message gets an offset of zero, the second message gets an offset of 1 and so on. If a consumer stops consuming messages, Kafka stores the most recent offset sent to the consumer. Once the consumer resumes pulling data, Kafka simply sends the message with the next offset value and resumes the operation. 

![architecture](/engineering-education/introduction-to-kafka/kafka-architecture.png)

### Installation
Kafka requires Java(OpenJDK 8) on your system. Follow [this](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-18-04#installing-specific-versions-of-openjdk) tutorial to install java.

1. Kafka uses Zookeeper. Therefore We first need to install Zookeeper on our systems. Download Zookeeper from the [official website](https://zookeeper.apache.org/releases.html)

2. Extract the tar file.
```
tar -zxf <zookeeper version>
``` 

3. Download Kafka from the [official website](https://www.apache.org/dyn/closer.cgi?path=/kafka/2.5.0/kafka_2.12-2.5.0.tgz)

4. Move the tar file to any convenient location in your system.

5. Extract the tar file by running the following command:
```
tar -xzf <kafka version that you downloaded>
```
You have successfully installed Kafka on your system. 

### Further reading

[Zookeeper tutorial](https://www.tutorialspoint.com/zookeeper/index.htm)

[Kafka vs RabbitMQ](https://www.upsolver.com/blog/kafka-versus-rabbitmq-architecture-performance-use-case)

[Creating a message broker using Kafka](https://kafka.apache.org/quickstart) 
