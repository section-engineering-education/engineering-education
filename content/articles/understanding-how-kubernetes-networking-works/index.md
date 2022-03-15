---
layout: engineering-education
status: publish
published: true
url: /understanding-how-kubernetes-networking-works/
title: Understanding How Kubernetes Networking Works
description: In this article, we will go through the basics of Kubernetes networking. The article will provide an overview of how networking works in Kubernetes.   
author: bridget-mwikali
date: 2021-07-28T00:00:00-05:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-how-kubernetes-networking-works/hero.jpg
    alt: kubernetes networking example image
---
Communication within a Kubernetes cluster partly depends on Kubernetes networking. Kubernetes networking enables the configuration of communication with the k8s network. It also manages many operations, including exposing containers to the internet and handling internal container communication.

The Kubernetes cluster is made up of various pods and nodes. Understanding how Kubernetes networking enhances communication between these components is critical.
<!--more-->
This article introduces readers to Kubernetes networking and explains how networking works in Kubernetes. It also discusses various networking types in Kubernetes.

### What is Kubernetes networking?
Networking is a critical aspect of Kubernetes. It is an enabler of communication between Kubernetes components. Kubernetes networking also allows these components to communicate with other applications.

Unlike other networking platforms, the Kubernetes networking platform allows you to run distributed systems and share machines between applications without allocating ports. With Kubernetes networking, you do not need to map ports between containers and hosts. This is because the networking is designed on a flat network structure.

In a typical flat network, devices are connected to a single switch instead of several separate switches. This is to reduce the number of switches and routers on the network.

### How does networking work in Kubernetes?
Components in a Kubernetes platform include nodes, applications, containers, and pods. These components communicate using different networking methods. The methods are as highlighted below.

- Internet-to-service networking
- Container-to-container networking
- Pod-to-pod networking
- Pod-to-service networking

Let's discuss each of the above networking types in a Kubernetes cluster in detail.

### Internet-to-service networking
Internet connectivity is critical when using Kubernetes for either internal or external applications. It is through this connectivity that distributed teams collaborate, and users access your services.

Ingress and egress techniques help to set up external access. These two policies are set up with either [blacklisting or whitelisting](https://consoltech.com/blog/blacklisting-vs-whitelisting/) to control traffic in and out of a network.

#### Egress
This process routes traffic from the node to an external connection. An internet gateway is a must-have for this process to succeed. This gateway is attached to a virtual private cloud (VPC). Virtual private clouds are secure, isolated private cloud computing environments hosted within public clouds.

Using network address translation ([NAT](https://www.geeksforgeeks.org/network-address-translation-nat)), the internet gateway maps IPs between the users and the machine hosting the node. Since the gateway does not map individual pods on the node, Kubernetes relies on [clusterIP and iptables](https://kubernetes.io/docs/concepts/services-networking/service/) to complete the communication process.

#### Ingress
Communication is a two-way process. It is through the ingress process that external clients communicate to Kubernetes services. It allows some connections and blocks some from communication to Kubernetes services depending on a set of defined rules.

### Container-to-container networking
It is straightforward for containers situated in the same pod to communicate with each other. They do so using different methods. The main two are:

- Inter-process communications (IPC)
- Shared volumes

Here is a look at these methods in detail.

#### Inter-process communications (IPC)
Containers in a pod use standard inter-process communications like [POSIX shared memory](https://newrelic.com/ ), [semaphores](https://en.wikipedia.org/wiki/Semaphore_(programming)), and [SystemV](https://en.wikipedia.org/wiki/UNIX_System_V) to communicate. This is possible because such containers share the same IPC namespace. Inter-process communication refers to a mechanism that allows data exchange between multiple processes in an operating system.

IPC namespaces contain unique POSIX message queue filesystems and System V IPC identifiers. Only members of a namespace have access to objects created by the parent IPC namespace. Processes in other IPC namespaces are blocked from accessing such objects.

#### Shared volumes in a Kubernetes pod
Containers in a given pod can share or access data stored in Kubernetes volumes using a shared directory on the host. Data stored in these volumes is not lost even when containers restart.

Kubernetes volumes and pods have the same lifetime. The volume exists and holds data as long as the associated pod exists, which means that the shared volume ceases to exist when that pod is destroyed. Not even an identical replacement of that pod can save this situation; the volume must be recreated from scratch.

### Pod-to-pod networking
Pods in Kubernetes are allocated a unique IP address which they use to communicate with each other. However, communication between pods is not complete without nodes. Thus, understanding the interaction between nodes will give us a clear outlook of how pod-to-pod communication happens.

#### Inter-node communication
Nodes located in different pods communicate through this method. Let us take this example to help us understand this communication method better. Assume there are four pods networks: Pod 'A', pod 'B', pod 'C', and pod 'D'. Suppose we have two root networks: Pods 'A' and 'B' are located in the first network and pods 'C' and 'D' in the second.

If you want to transfer a packet from pod 'A' to pod 'D', in Linux networking, for instance, this is what happens.

The packet leaves pod 'A' network and goes into the root network through veth0. This packet has to pass through the [Linux bridge](https://developers.redhat.com/blog/2018/10/22/introduction-to-linux-interfaces-for-virtual-networking#) to help it find its destination. The node has no goal within its pod, so it is sent back to interface eth0. It then leaves the first node for the routing table.

The objective of the [routing table](https://searchnetworking.techtarget.com/definition/routing-table) is to route the packet to the required node. This node is located in pod 'D'. Before reaching the bridge, the packet first passes through node 2, and is directed to its intended destination.

#### Intra-node communication
Nodes contained in the same pod communicate through intra-node communication. Intra-node communication can be explained in the same way as inter-node communication. But in this case, the packet travels from pod 'A' at eth0 and goes to the root network through veth0. It then goes to the designated IP passing through the bridge.

### Pod-to-service networking
Like containers, pods are ephemeral. Containers can go down at any moment, which may lead to the loss of all data stored in them. Same way, pods have IP addresses that may disappear unexpectedly. When this happens, Kubernetes replaces the lost IP addresses with new ones. So, each pod gets allocated a single IP address.

An abstraction layer set on top of pods solves this problem. It helps communicate with the pods and eliminates the need to track pods as they start, die, and get rescheduled without affecting the application.

Kubernetes services handle the abstraction layer. These services assign a single IP address to each set of pods. This enables the routing of traffic addressed to a pod through the virtual IP address of the service. As a result, Kubernetes overcomes the dynamic nature of pods networking and blocks unhealthy and dying pods from receiving traffic.

### Conclusion
Understanding how Kubernetes networking works is an excellent start for Kubernetes users. This article has helped you learn the concepts of Kubernetes networking. It has explained the four different networking methods that components in a Kubernetes platform, such as nodes, applications, containers, and pods, communicate through.

Happy learning.

### Resources
[How Sweet is Kubernetes?](https://www.section.io/engineering-education/how-sweet-is-kubernetes/)

[Getting Started with Kubernetes](https://www.section.io/engineering-education/introduction-to-kubernetes/)

[How Kubernetes Pods Work](https://www.section.io/engineering-education/how-kubernetes-pods-work/)

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
