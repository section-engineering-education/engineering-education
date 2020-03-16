---
layout: engineering-education
status: publish
published: true
title: What is Kubernetes
description: Kubernetes can expose a container using the DNS name or its own IP address. If traffic to a single container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.
author: Gregory Manley
date: 2020-03-16T00:00:00-07:00
topics: [Edge Computing]
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/what-is-kubernetes.jpg
    alt: Kubernetes container management system
---
Kubernetes is an automatic container management system. While it is not a traditional, all-inclusive Platform as a Service (PaaS) system, due to it operating at the container level, it provide some features common to PaaS such as deployment, scaling, load balancing and monitoring.
<!--more-->

## What is Kubernetes

Kubernetes, or K8s, is an open-source system that is used to automate deployment, scaling and management of containerized applications. It provides a framework to run distributed systems, taking care of scaling and failover for your applications.

### What Does Kubernetes Do?

According to [Kubernetes](kubernetes.io/docs/concepts/overview/what-is-kubernetes) the software provides you with:

<ul>
    <li>Service Discovery and Load Balancing</li>
    <p>
        Kubernetes can expose a container using the DNS name or its own IP address. If traffic to a single container is high, Kubernetes is able to load balance and distribute the network traffic so that the deployment is stable.
    </p>
    <li>Storage Orchestration</li>
    <p>
        Kubernetes allows you to automatically mount a storage system of your choice.
    </p>
    <li>Automated Rollouts and Rollbacks</li>
    <p>
        You can describe the desired state for your deployed containers using Kubernetes and change the states to the desired state.
    </p>
    <li>Automatic Bin Packing</li>
    <p>
        Provide Kubernetes with a cluster of nodes to run containerized tasks, defining how much CPU and RAM each container needs.
    </p>
    <li>Self-Healing</li>
    <p>
        Containers that fail are automatically restarted. Kubernetes kills containers that do not respond to the user-defined health check, and does not advertise the containers until they are ready to serve.
    </p>
    <li>Secret and Configuration Management</li>
    <p>
        Allows you to store and manage sensitive information (OAuth tokens, SSH keys, etc.)
    </p>
</ul>

Basically, Kubernetes is an automatic container management system, allowing developers to focus on designing, building, and upgrading  applications.

### Applications of Kubernetes

Kubernetes runs on many platforms including Amazon Web Services, Microsoft Azure, and Google Cloud Platform, along with the ability to host it on-premise. K8s applications are generally enterprise-ready containerized solutions.

Some notable examples of K8s applications are:

<ul>
    <li>Gitlab</li>
    <li>CloudBees</li>
    <li>Neo4j</li>
    <li>Seldon</li>
    <li>Aerospike</li>
    <li>Couchbase</li>
    <li>WordPress</li>
    <li>Prometheus</li>
</ul>

These are not the only Kubernetes applications out there, and you could even build your own. These applications have the advantage of being easily scalable and new containers can be automatically spawned to minimize down time.

To sum Kubernetes up, it is an automatic container management system. While it is not a traditional, all-inclusive Platform as a Service (PaaS) system, due to it operating at the container level, it provide some features common to PaaS such as deployment, scaling, load balancing and monitoring. All in all, Kubernetes is a great system to implement if you deploy a server side application and want high reliability, low downtime, and great load balancing.

---

#### About the Author
<img style="float: left; padding-right: 5%; margin-bottom: 10px; width:30%;" src="/assets/images/education/authors/gregory-manley.jpg">Gregory Manley is a freshman at Colorado School of Mines where he is majoring in Computer Science and Computer Engineering. He is currently the owner of iTech News and a contributor for Section's Engineering Education Content Program. His management of iTech News has led him to work with many brands on writing technology focus articles.
