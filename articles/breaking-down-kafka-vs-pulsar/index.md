---
layout: engineering-education
status: publish
published: true
url: /engineering-education/breaking-down-kafka-vs-pulsar/
title: Artificial Intelligence for Smarter Cybersecurity
description: 
author: eric-kahuha
date: 2020-11-12T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/breaking-down-kafka-vs-pulsar/hero.jpg
    alt:  example image
---
Messaging systems are essential for their ability to enable remote communication and transfer of data. Apache Pulsar and Apache Kafka are two widely used messaging systems. Recently, Pulsar has emerged as a serious competitor to Kafka and is being embraced in use cases where Kafka dominated.
<!--more-->
This article compares Kafka and Pulsar in terms of architecture, geo-replication, and use cases.

### An Overview of Apache Kafka
[LinkedIn](https://engineering.linkedin.com/blog/2019/apache-kafka-trillion-messages) released [Apache Kafka](https://kafka.apache.org/) in 2011. The open-source event streaming platform is founded on the abstraction of a distributed commit log. It can manage trillions of events daily. Kafka&#39;s functionality comprises of publish/subscribe (pub/sub), processing of event streams, and permanent storage.

### An Overview of Apache Pulsar
The original idea behind the development of [Apache Pulsar](https://pulsar.apache.org/) was to create a queuing system. But this has expanded in the latest releases to incorporate event streaming features. [Yahoo](http://www.yahoo.com/) originally developed Pulsar. But [Apache Software Foundation](https://www.apache.org/) has now taken over the control of the project.

Pulsar&#39;s developers wanted to create a program that could provide solutions to corporations that other open-source alternatives could not offer at the time. Consequently, Pulsar was founded to handle millions of partitions and topics with complete support for [multi-tenancy](https://www.gartner.com/en/information-technology/glossary/multitenancy#:~:text=Multitenancy%20is%20a%20reference%20to,logically%20isolated%2C%20but%20physically%20integrated.) and [geo-replication](https://en.wikipedia.org/wiki/Geo-replication).

### Architecture
Kafka is comprised of [Kafka Broker and ZooKeeper](https://kafka.apache.org/documentation/#brokerconfigs). The older version of ZooKeeper was used to store data relating to consumer groups such as topic consumption offsets. But this has changed since then to include leadership election, service delivery, and metadata storage for the cluster.

The messaging capabilities of Kafka are centered on the Kafka Broker. Kafka Broker terminates consumer and producer connections, sends messages to consumers and accepts new messages from producers. Kafka Broker&#39;s storage for messages on disk provides message guarantees. Kafka Broker&#39;s stateful nature means that a broker can only contain the complete state for its topics. If a broker fails, not just any broker can serve as a replacement.

The Pulsar architecture has three major components: [BookKeeper Bookie](https://bookkeeper.apache.org/docs/4.6.1/admin/bookies/), Pulsar Broker, and ZooKeeper. Pulsar&#39;s ZooKeeper provides metadata storage, leadership elections, and service delivery. This is also the case with Kafka ZooKeeper.

Pulsar differs from Kafka by separating the messaging storage and messaging serving functions. It does this separation using the BookKeeper Bookie and Pulsar Broker components. The BookKeeper Bookies stores messages. The Pulsar Broker serves messages between consumers and producers. With such a layered architecture, the Pulsar Broker is stateless. This allows for any broker to take over from another failed broker.

### Geo-Replication
Pulsar&#39;s developers intended to create a message distribution application that could allow users to replicate messages between geographically different data centers. The geo-replication feature is fully integrated into Pulsar&#39;s administration interfaces. You can disable or enable the geo-replication feature at the namespace level.

As an administrator, you can decide on which topics to replicate. For individual producers, they can execute specific datacenters from receiving copies of messages that they publish.

Pulsar&#39;s geo-replication feature supports many [topologies](https://beginnersbook.com/2019/03/computer-network-topology-mesh-star-bus-ring-and-hybrid/), including full-mesh, active-active, edge aggregation, and active-standby. Typical geo-replication setups perform message replication asynchronously. But with Pulsar, you can do synchronous geo-replication.

In summary, Pulsar&#39;s geo-replication functionality is rich and can support almost all configurations. The management and configuration of geo-replication is fully integrated into Pulsar. This way, you do not need extensions or external packages.

In Kafka documentation, geo-replication is referred to as mirroring. Kafka replicates messages from one cluster to another through the [MirrorMaker](https://cwiki.apache.org/confluence/pages/viewpage.action?pageId=27846330) tool. MirrorMaker connects [Kafka Producer](https://kafka.apache.org/10/javadoc/org/apache/kafka/clients/producer/KafkaProducer.html) in one center to a [Kafka Consumer](https://kafka.apache.org/26/javadoc/index.html?org/apache/kafka/clients/consumer/KafkaConsumer.html) in another center.

Kafka also has another geo-replication option, [uReplicator](https://eng.uber.com/ureplicator-apache-kafka-replicator/). Uber developed the uReplicator tool to address the challenges of MirrorMaker. As a result, the performance, operations, and scalability of MirrorMaker improved. The tool also offered a better geo-replication. However, as an independent distributed system, users can operate controller and worker nodes parallel with the Kafka cluster. Commercial solutions to Kafka geo-replication such as Confluent Replicator also exist.

Although geo-replication is possible in Kafka, it is not simple, like in Pulsar. You have to choose among many solutions, run parallel tools, or even a whole distributed system to support Kafka&#39;s geo-replication.

### Use Cases
Originally developed as a unified pub/sub messaging platform, Pulsar has grown to become an event streaming and unified messaging platform. Pulsar is composed of a complete set of tools necessary to provide all the basics essential for building event streaming applications.

Pulsar relies on pulsar function, pulsar protocol handler, and [pulsar IO](https://pulsar.apache.org/docs/en/2.3.1/io-overview/) to provide routing capabilities. These routing capabilities include message transformation, message enrichment, and content-based routing. Pulsar&#39;s routing capabilities are more advanced compared to Kafka&#39;s.

Besides, Pulsar&#39;s deployment model for functions and connectors is much flexible. You can run these functions and connectors within a broker to allow for easy deployment. Or else, run them in a dedicated pool of nodes, as the case with Kafka streams. This will allow for massive scale-out. You can also configure Pulsar to schedule connector workloads and functions as pods. This is possible considering that Pulsar integrates seamlessly with [Kubernetes](https://kubernetes.io/).

### Conclusion
Pulsar is still young compared to the more mature Kafka. Kafka is developed and suitable for high scale use cases. However, Pulsar&#39;s ecosystem is expanding and developing, with new use cases being added and its technology evolving rapidly. Besides, Pulsar is less complex to scale and operate.

Kafka&#39;s level of maturity and resiliency has captured the attention of many users. Kafka Connect is a host for multiple data sources. Confluent and Amazon offer managed services making it easier to get large Kafka clusters up and running, unlike in the previous years.

Apache Pulsar has captured the market for users intending to build a multi-tenant and geo-replicated messaging system from the start. Also, those with large storage needs choose Pulsar over Kafka.

In short, Pulsar is advantageous to organizations working to embrace event streaming and unified messaging platform. But for those in need of an enterprise solution that covers much more than what Pulsar offers, Kafka is an excellent choice.
