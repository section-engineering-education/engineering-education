---
layout: engineering-education
status: publish
published: true
url: /how-kubernetes-pods-work/
title: How Kubernetes Pods Work
description: In this article we will discuss Kubernetes Pods, their model types, benefits, how they work, and how they communicate with each other in Kubernetes.
author: eric-kahuha
date: 2021-02-06T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-kubernetes-pods-work/hero.jpg
    alt: Kubernetes Pods image
---
In [cloud computing](/introduction-to-cloud-computing/), a pod is a high-level structure and the tiniest execution object in [Kubernetes](/what-is-kubernetes/). These pods are temporary. If one pod fails, Kubernetes simultaneously models a copy so that the work keeps going on.
<!--more-->
The pods are usually in one or several collections. Today, the usage of Kubernetes has become the go-to solution in cloud software management.

This is the case because Kubernetes use pods, that do not run containers directly. As long as a container shares the same pod with another container, they can access the local network and resources.

This article discusses Kubernetes Pods, their model types, benefits, how they work, and how they communicate with each other in Kubernetes.

### What are Kubernetes pods?
Before we get to what exactly Kubernetes pods are, it would help if you briefly understood some definitions of the resources inside a Kubernetes system.

A node is a unit of computing hardware in a cluster. It is essentially one machine in the whole arrangement called a cluster. The cluster refers to the linked hardware nodes under one network creating one machine. 

So much so, it becomes one powerful device as a whole. In case one node fails, the work is seamlessly divided among the remaining fully functional nodes in the cluster, and the system remains operating optimally.

As mentioned earlier, Kubernetes pods create replicas when one fails. But that is not the only reason why copies exist. Even when there is no failure or heavy traffic, replicas still run to reduce failure probability and achieve an optimal load balance in the cluster.

Kubernetes individual pods have their own designated Internet Protocol (IP) address, making pod-to-pod communication easier. Each pod has its own persistent storage volumes. Besides, every Kubernetes pod contains unique configuration data that dictates precisely how a specific container should operate.

A good example to put things into perspective would be if a server only responds to [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP#) inquiries, the Kubernetes architecture uses pods. These pods wrap one or more containers and can manage the request without fail.

### Pod model types
#### One-container-per-pod
This model entails pods operated by a single container, and it is the most common in Kubernetes. Here pods are managed by Kubernetes, which is an indirect approach to running the container.

This pod model is the most widely recognized Kubernetes’ use case. A pod is used as a wrapper around a single container, eliminating the need for Kubernetes to manage the containers directly. Kubernetes would manage the pods in this case. 

#### Multi-container pods
These are pods operating several containers clustered together as one. These containers are co-related, and they do share resources like storage. The whole system works in unison such that one container may approach a certain task as data storage, while the other updates the files.

Every pod in this model is built only to run one application at a time, thus being more efficient. Scaling up is possible, although one has to scale up the number of nodes used to match the load balance. 

This is called replication in the Kubernetes architecture. The replicated pods are modeled and run as a unit by workload resources through [replication controllers](https://kubernetes.io/docs/concepts/workloads/controllers/replicationcontroller/).

Multi-container pods are used in adapters, bridges, and proxies to connect the main container to the external world. For example, they are used as helper containers to reroute requests from the primary container to the external world. Thus, allowing the main container to connect to a localhost without a service discovery.

### Benefits of a pod
#### Productivity improvement
The first notable benefit of using pods is an increase in productivity within the system. The very simplistic node-to-node communication in the delegation and completion of tasks makes operations run smoothly and in the shortest time possible.

#### Scalability
It is possible to scale up your system using pods, and that is by simply adding nodes into the cluster to scale up your operations. This scaling-up must, however, be done properly for the best outcome.

#### Efficiency improvement
Efficiency is also improved in the replication process, which duplicates a failing pod and delegates that duty to another pod. The replication process focuses on enhancing efficiency by reducing failure probability and increasing productivity.

### How does a pod work?
Pods are a product of controllers that are responsible for managing operations within the Kubernetes system. Controllers facilitate the rollout, replication, and the overall state of the pods in a cluster. The controller is the delegator of replication of pods if one pod fails.

There are three main kinds of controllers, namely, [jobs](https://kubernetes.io/docs/concepts/workloads/controllers/job/), [deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/), and [statefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/). Jobs are short-lived such that they only exist until a job is complete.

Deployments set in motion updates for the pods and the replication process. Deployments can create a new [Replicaset](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/#) or eradicate the already existing deployments to formulate a new one with the previously used resources. 

Deployments are also used to declare a new state of the pods by updating the PodTemplateSpec where the ReplicaSet is created; it oversees the pods&#39; moving at a controlled rate. PodTemplateSpec refers to an object that describes the pods that will be created.

Deployments help check the overall status of a rollout, and its scaling up facilitates more workload in the cluster, improving overall efficiency.

A deployment is paused to fix certain constraints in the system to declare a new rollout resumption. Deployments clean up any old ReplicaSets that are not useful anymore.

StatefulSets are a set of pods with unique, unwavering, and persistent hostnames maintained no matter their schedule. The information is kept in a persistent disk linked to the Statefulset.

### Pod-to-pod communications in Kubernetes
Pods communicate with each other through the [localhost](https://en.wikipedia.org/wiki/Localhost#). This happens for pods within one container. 

Those from different containers use coordinated shared network resources like ports to communicate. Pods sharing a container have the same IP address as well as a similar port space. Communication is also facilitated through inter-process communication channels, container to container.

Different pods in different containers have separate IP addresses. This means they can only communicate after a special configuration is achieved like an IP network.

### Conclusion
Kubernetes pods look promising towards the future for cloud computing. Pods&#39; enhancement of productivity, efficiency, scalability, and prevention of system failure is commendable. Kubernetes pods are certainly something to look into. 

But remember, it has its challenges too, which you must analyze and find your way around them. All in all, it is a technology development heading directly to the top of the list of the best! 

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)