---
layout: engineering-education
status: publish
published: true
url: /what-is-kubernetes/
title: What is Kubernetes?
description: Kubernetes can expose a container using the DNS name or its own IP address. If traffic to a single container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.
author: gregory-manley
date: 2020-03-16T00:00:00-07:00
topics:
 - Edge Computing
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-kubernetes/hero.jpg
    alt: Kubernetes container management system
---
Kubernetes is an automatic container management system. While it is not a traditional, all-inclusive Platform as a Service (PaaS), due to it operating at the container level, it provides some features common to PaaS such as deployment, scaling, load balancing and monitoring.
<!--more-->

Kubernetes, or K8s, is an open-source system that is used to automate deployment, scaling and management of containerized applications. It provides a framework to run distributed systems, taking care of scaling and failover for your applications.

### What Does Kubernetes Do?
According to [Kubernetes](kubernetes.io/docs/concepts/overview/what-is-kubernetes), the open-source container orchestration system provides you with:

#### Service Discovery and Load Balancing
Kubernetes can expose a container using the DNS name or its own IP address. If traffic to a single container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.

#### Storage Orchestration
Kubernetes allows you to automatically mount a storage system of your choice.

#### Automated Rollouts and Rollbacks
You can describe the desired state for your deployed containers and Kubernetes will automatically adapt to the desired state.

#### Automatic Bin Packing
Provide Kubernetes with a cluster of nodes to run containerized tasks, defining how much CPU and RAM each container needs.

#### Self-Healing
Containers that fail are automatically restarted. Kubernetes kills containers that do not respond to the user-defined health check, and does not advertise the containers until they are ready to serve.

#### Secret and Configuration Management
Allows you to store and manage sensitive information (OAuth tokens, SSH keys, etc.)

Basically, Kubernetes is an automatic container management system, allowing developers to focus on designing, building, and upgrading  applications.

### Applications of Kubernetes

Kubernetes runs on many platforms, including Amazon Web Services, Microsoft Azure, and Google Cloud Platform, along with the ability to host it on-premise. K8s applications are generally enterprise-ready containerized solutions.

Some notable examples of K8s applications are:

- GitLab
- CloudBees
- Neo4j
- Seldon
- Aerospike
- Couchbase
- WordPress
- Prometheus
- Section

These are not the only Kubernetes applications out there, and you could even build your own. These applications have the advantage of being easily scalable and new containers can be automatically spawned to minimize down time.

To sum Kubernetes up, it is an automatic container management system. While it is not a traditional, all-inclusive Platform as a Service (PaaS) system, due to it operating at the container level, it provide some features common to PaaS such as deployment, scaling, load balancing and monitoring. All in all, Kubernetes is a great system to implement if you deploy a server side application and want high reliability, low downtime, and great load balancing.
