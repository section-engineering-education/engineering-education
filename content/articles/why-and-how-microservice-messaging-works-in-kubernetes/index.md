---
layout: engineering-education
status: publish
published: true
url: /why-and-how-microservice-messaging-works-in-kubernetes/
title: Why and How Microservice Messaging Works in Kubernetes
description: This article will share the benefits of messaging in Kubernetes and briefly look at KubeMQ, which attempts to address some of the traditional problems with messaging in Kubernetes.
author: martha-ngugi
date: 2021-07-13T00:00:00-15:40
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-and-how-microservice-messaging-works-in-kubernetes/hero.jpg
    alt: Why and How Microservice messaging works in Kubernetes Hero image
---
Connecting and maintaining the growing number of [microservices](https://microservices.io/) in [Kubernetes](https://kubernetes.io/) can be a struggle and challenging. It is evident that as the number of microservices increases, the more difficult and complex it is to maintain them.
<!--more-->
Messaging offers an excellent solution to the above issue, but [message queues](https://www.ibm.com/cloud/learn/message-queues) come with some problems.

This article will look at the benefits messaging in Kubernetes offers and the difficulties experienced with legacy solutions. It will also look at how [KubeMQ](https://kubemq.io/) attempts to address the problems of messaging in Kubernetes.

### Why do we need messaging in Kubernetes?
As mentioned earlier, when the microservice-based architecture grows, the difficulty of connecting each of these distributed services also increases.

In messaging, issues such as availability, security, and latency need to be addressed for each point-to-point communication.

Furthermore, the higher the number of services would mean more potential connections between them. For example, if we have an environment with only three services, we would have three potential numbers of connections as shown below:

![three services](/engineering-education/why-and-how-microservice-messaging-works-in-kubernetes/service-three.png)

If we increase the number of services to five, the number of potential connections also increases to ten, as illustrated below:

![five services](/engineering-education/why-and-how-microservice-messaging-works-in-kubernetes/service-five.png)

In general, if we denote services with the letter `n` then the number of potential connections can be determined as `n(n-1)/2`.
It would not be viable for organizations with a large number of services.

However, through the use of messaging queue, the connections can be centralized. Considering the number of connections will be the same as the number of services, this will result in a solution that can scale linearly, as shown below:

![three services](/engineering-education/why-and-how-microservice-messaging-works-in-kubernetes/many-services.png)

Messaging solves the security and availability issues since each microservice communicates with the message queue. Furthermore, it is recommended when microservices are enormous. That is why messaging queue architecture is preferred when running a vast number of microservices in Kubernetes. 

For this reason, best practices should be considered when selecting and implementing a messaging queue as the entire architecture will depend on its reliability and scalability.

Deploying a messaging queue in Kubernetes allows one to avoid platform-lock-in. It keeps a messaging queue platform-agnostic and ensures that microservices architecture is consistent regardless of the platform.

>Note: There are still several platform-specific messaging solutions from other known cloud providers. Kubernetes is the preferred [orchestration](https://www.redhat.com/en/topics/automation/what-is-orchestration) solution because it works effectively with other major cloud providers.

### Setbacks experienced when implementing messaging in Kubernetes
There are difficulties experienced when running a message queue in Kubernetes. Before we dive into the setbacks, let us first look at the differences between a typical microservice and a standard message queue as summarized below:

|**Typical microservice**|**Legacy message queue**|
| :- | :- |
|It does not require many resources|It is resource-intensive|
|It is stateless|It is stateful|
|Its deployment is easy|It requires complex deployment|
|It can be scaled horizontally|It can only be scaled vertically|

#### In depth
First, microservices are not resource-intensive. Each service performs a single purpose, hence more diminutive in size and more agile. In contrast, legacy messaging queues are large and resource-intensive applications.

A microservice is stateless. This means it does not maintain any state of the application within itself. However, a bigger number of legacy messaging queues function better as databases and often require persistent storage. Persistent storage in Kubernetes is well handled with [Persistent Volume API](https://kubernetes.io/docs/concepts/storage/persistent-volumes/), which is quite hectic for legacy solutions.

The difference in resource usage generally means that microservices can be deployed quickly. Microservices can be deployed fast as standalone or as a part of the cluster. On the other hand, since legacy messaging queues are resource-intensive, they require complex deployment instructions and a dedicated team to do the initial setup and maintenance.

Lastly, microservices are horizontally scalable. This means the scaling is done by deploying additional service instances. It would mean that it's easy for a service to scale infinitely, with high availability and generally at a cheaper cost. 

In contrast, due to high resource requirements and challenges in deploying legacy messaging queues, they can only be vertically scaled. This means a larger, more expensive machine would be required.

As we mentioned above, issues arising from using message queues would mean a huge cost and time investment will be required, reducing its value on the overall architecture.

However, the above issues are not directly inherent to messaging. They are challenges that were experienced when messaging queues were designed and adopted.

We can use Kubernetes native messaging queue such as `KubeMQ` to address the issues above, as explained in the next section of this article.

### Using a Kubernetes-native approach
KubeMQ seems to be a perfect solution to address Kubernetes-related messaging issues. 

It perfectly does this in the following ways:
- **Kubernetes-native.** This means that it easily integrates with Kubernetes and can be deployed as a [Kubernetes cluster](https://www.vmware.com/topics/glossary/content/kubernetes-cluster). KubeMQ also comes with [operators](https://operatorhub.io/operator/kubemq-operator) that automate tasks beyond what Kubernetes natively offers. 

KubeMQ has features that assist with lifecycle management. It also supports [cluster persistency](https://docs.kubemq.io/learn/cluster-scale#cluster-persistency) through local volume and PVCs.
Kubernetes-native also implies that it can operate on any cloud provider and be deployed on-premises or hybrid cloud environments.

- It is **lightweight**. Docker containers are typically smaller in size compared to legacy solutions. It means it can be virtually deployed anywhere and enables new use cases like edge deployments for IoT device support. Even if KubeMQ is relatively small in size, it can support a variety of [messaging patterns](https://kubemq.io/product-messaging-patterns/).

- It is **extensible**. It has prebuilt connectors such as [Bridges](https://kubemq.io/kubemq-bridges/), [Targets](https://kubemq.io/kubemq-targets/), and [Sources](https://kubemq.io/kubemq-sources/) that allow it to connect to various applications and services. Thus, it does not require custom integrations. Bridges enable KubeMQ clusters to interact with each other, allowing KubeMQ to connect to the various cloud enviroments, whether on-premises or edge environments.

### Summary
This article has covered the advantages of a message queue and has gone through the challenges around implementing messaging in Kubernetes.

We have also taken a quick overview of KubeMQ as the lightweight and Kubernetes-native solution that can provide many advantages compared to legacy solutions.

Happy learning!

---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
