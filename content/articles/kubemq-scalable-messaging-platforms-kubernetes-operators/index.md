---
layout: engineering-education
status: publish
published: true
url: /kubemq-scalable-messaging-platforms-kubernetes-operators/
title: How KubeMQ Users Build Scalable Messaging Platforms with Kubernetes Operators
description: This article will look at how and why KubeMQ uses operators to build messaging platforms. It will provide an overview of Kubernetes operators and highlight the benefits of KubeMQ.
author: ephraim-njoroge
date: 2021-07-28T00:00:00-17:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/kubemq-scalable-messaging-platforms-kubernetes-operators/hero.jpg
    alt: Kubernetes Operators example Image
---
The adoption of [Kubernetes](https://kubernetes.io/) has multiplied over the past years. According to surveys, it clearly shows that most organizations are adopting Kubernetes in their production environments.
<!--more-->
Adopting Kubernetes allows organizations to create the management layer that commodifies cloud and also build cross/hybrid-cross deployments that abstract the provider-specific implementations from the rest of the team.

Kubernetes comes with an important feature called [operators](https://kubernetes.io/docs/concepts/extend-kubernetes/operator). Operators assist in deploying and managing the applications' state by using [Kubernetes APIs](https://kubernetes.io/docs/concepts/overview/kubernetes-api/). 

They are important when deploying applications in cross or hybrid environments. They are also significant in managing and maintaining application states over multiple [Kubernetes clusters](https://www.vmware.com/topics/glossary/content/kubernetes-cluster) running together or [across clusters](https://cloud.google.com/architecture/heterogeneous-deployment-patterns-with-kubernetes).

This article concentrates on the use of operators and their functions in Kubernetes. It will also expound on how the [KubeMQ](https://kubemq.io/) utilizes features that operators offer to build complex yet scalable messaging solutions with minimal code and overhead.

### Overview of Kubernetes operators
Operators are application extensions that connect into Kubernetes APIs and the control plane to build and manage a [Custom Resource](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) (CR). The Custom Resource defines the preferred state of the application. The control plane component checks the custom resource to establish whether the application is running according to expectations.

For instance, an operator can deploy and scale a [pod](https://kubernetes.io/docs/concepts/workloads/pods/), back up and restore the database, manage the network services and ingresses, or even manage a persistent data store.

The operators can connect with native Kubernetes tools such as [kubectl](https://kubernetes.io/docs/tasks/tools/), which are usually used in managing complex deployments where the state is involved.

For example, users can utilize a [Helm chart](https://helm.sh/) to deploy and manage stateless applications like a web server. It is also possible to deploy stateful systems such as [PostgreSQL](https://www.postgresql.org/), [etcd](https://kubernetes.io/docs/tasks/administer-cluster/configure-upgrade-etcd/), and KubeMQ.
Operators can be attributed to the success of the tasks above.

### Core components of KubeMQ
KubeMQ is a message broker/queue and a messaging platform that develops a message-based architecture functioning across [multi/hybrid](https://www.cloudflare.com/learning/cloud/multicloud-vs-hybrid-cloud/) clouds and [edge computing](https://www.networkworld.com/article/3224893/what-is-edge-computing-and-how-it-s-changing-the-network.html).

With KubeMQ, services communicate with each other using any messaging pattern such as [pub/sub](https://cloud.google.com/pubsub/docs/overview), [streams](https://docs.cloudera.com/csp/2.0.1/howto-smm.html), and [queues](https://aws.amazon.com/message-queue/). KubeMQ is Kubernetes native and does not require much time to implement.

The KubeMQ consists of the following components:
- **Server** – It is deployed to every Kubernetes cluster, which manages the messaging processing.
- **Bridges** – They assist in developing the preferred messaging topology across Kubernetes clusters, transmitting messages between KubeMQ servers.
- **Sources**- These receive messages from existing systems such as [RabbitMQ](https://www.rabbitmq.com/) or [Kafka](https://kafka.apache.org/) and direct them to the KubeMQ platform.
- **Targets** – They transmit messages to third-party systems such as PostgreSQL, [Redis](https://redis.io/), [S3](https://aws.amazon.com/s3/), or other messaging systems like [ActiveMQ](https://activemq.apache.org/).

The components above allow the user to create a no-code-message-based microservices and [cross-cluster](https://www.improbable.io/blog/introducing-kedge-a-fresh-approach-to-cross-cluster-communication) messaging architecture on Kubernetes.

### Benefits of KubeMQ
KubeMQ comes with the following upsides:
- It is easy to deploy alongside depending on one’s Kubernetes workloads, making it easy to utilize it from the local development to production.
- It is Kubernetes workload, meaning it is used when a consistent messaging or queuing solution is required across different cloud providers or between cloud and on-premises.
- It solves many messaging requirements, making it possible to be a single solution that can be used in several other messaging solutions.
- It speeds up the development and production cycles.
- It saves operational costs for the organizations.
- It supports a variety of extensions to connect with microservices.

### Reasons why KubeMQ uses operators to build messaging platforms
#### CASE 1: KubeMQ and operators
For KubeMQ to operate at a native Kubernetes level, it is first deployed as an operator. One advantage of using KubeMQ is that it works well when small clusters are bundled together rather than having one massive cluster.

This leads to improved performance, better scalability, and resilience. The approach has had its success in utilizing operators as the management and deployment tool for KubeMQ.

The operators deploy clusters and verify if the KubeMQ bridges, sources, and targets are set appropriately for each cluster. It also extends to how KubeMQ was created to utilize [Go](https://github.com/kubemq-io/kubemq-go/blob/master/README.md). It improves KubeMQ performance and connects KubeMQ into native Kubernetes data models, events, and APIs; hence it is easy to manage the clusters' state. It also makes validation of the configuration easier.

Deploying KubeMQ as an operator also keeps overhead to a minimum. For instance, we can look at a big financial institution with many real-time messages enquiring for price quotes, a huge number of transactions, and client funding. An institution can opt for KubeMQ to reduce the high number of servers required to meet their vast needs. 

It will also allow the institution to reassign its operational overhead to other tasks instead of monitoring and maintaining the messaging infrastructure. At the same time, the institution can utilize the KubeMQ operator to scale its infrastructure based on the load. This can happen in the scenarios such as when the market closes, or demand decreases, meaning that the clusters can also be scaled down.

#### CASE 2: Cross/Hybrid cloud and operators
The KubeMQ operator assists in tracking the state. This is the main reason why KubeMQ is preferred for reliable cross/hybrid cloud deployments.

First, the state can verify that the required capacity and configurations are in place for each cluster. Comparing the required state in the Custom Resource against the existing state in Kubernetes enables the operator to ensure that errors are detected and addressed on time, capacity is added as per requirements, and the various bridges, sources, and targets are configured as needed.

For instance, a business can leverage these KubeMQ feature to run its messaging platform over [edge computing systems](https://www.section.io/modules/) alongside cloud deployments. It will ensure that better performance and reliability are guaranteed and allows the client to grow.

The business can scale with new services without interruptions or downtime. The business will need to set up new clusters and configure them as per its needs. The fact that the KubeMQ operator verifies the Custom Resource definition avoids deploying clusters with faulty configurations.

### Benefits of operators
The following are the main benefits of operators:
- They utilize Kubernetes-native systems and APIs.
- An operator’s Custom Resource definition allows configuration management and validation during the deployment time.
- They assist in tracking the required state against the existing state and address any issues found between them.
- Operators are well understood; hence organizations need no additional training for operational success.

### Conclusion
KubeMQ uses the operator model to enable users to build complex yet scalable messaging platforms with less coding and overhead. It also creates great business value to organizations. It allows them to address any business problems quickly and effectively with little resources while managing and maintaining their messaging infrastructure.

Happy learning!

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
