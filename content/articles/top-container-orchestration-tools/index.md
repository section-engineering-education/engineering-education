---
layout: engineering-education
status: publish
published: true
url: /top-container-orchestration-tools/
title: Top Container Orchestration tools
description: This tutorial will be a brief dive into understanding Containers technology. We'll deep dive into various orchestration tools, and explore them in detail.
author: esther-waithera
date: 2021-06-15T00:00:00-16:30
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/top-container-orchestration-tools/hero.jpg
    alt: Containers hero image
---
If you have applications to develop, deploy, and run, containers can come in handy. [Containers](https://www.section.io/modules/edge-containers-as-a-service/) are a technology that enables you to package an application to run with its dependencies quickly and effectively from one computing environment to another.
<!--more-->
With containers, applications are moved seamlessly between servers. Therefore, you need a management system that automatically runs containers, shuts them down when needed, and controls how containers access resources. This is where orchestration tools come into play.

Container orchestration tools enable developers to manage and automate containerized application tasks. These tasks include linking containers, running instances, provisioning hosts, and rescheduling failed containers.

Container orchestration tools help in extending the lifecycle of applications, help ease deployment, and help manage application configurations. These tools also improve container security by setting limits while accessing containers.

This article will introduce you to container orchestration tools. It will also give you an overview of container orchestration and why it is important.

### Table of contents
- [Introduction to container orchestration](#introduction-to-container-orchestration)
- [Why container orchestration is important](#why-container-orchestration-is-important)
- [Top container orchestration tools](#top-container-orchestration-tools)

### Prerequisites
A thorough understanding of [Docker](/engineering-education/getting-started-with-docker/), [containers](/engineering-education/getting-started-with-container-as-a-service/), and [why it is popular](/engineering-education/why-is-docker-so-popular/) is essential before reading this article.

### Introduction to container orchestration
To understand the problem solved by [container orchestration](https://docs.docker.com/get-started/orchestration/). Think of a case where you have two containers:
- A front-end application container
- A back-end application container

These two containers need to work together as one. The solution to the above problem is container orchestration.

Container orchestration is the automation of all processes of organizing and managing containers. Container orchestration automates deploying, scheduling, management, and networking of containers. Organizations that deploy, manage, and host containers should use container orchestration. It helps you to deploy the application in different environments seamlessly.

[Microservices](https://microservices.io/) is an architectural design that splits your application into multiple services. Instead of having one extensive application that handles all the tasks, you break it down into independent processes. 

Each microservice will have a separate logic function for your application. The different microservices communicate when handling tasks. Communication is done via HTTP, and well-defined APIs are essential.

Microservices in containers make it straightforward to orchestrate services such as scalability, security, storage, flexibility, and networking. At the same time, we need a set of tools to manage these containers. This is where container orchestration tools come in handy.

### Why container orchestration is important
Container orchestration manages the life cycle of containers in dynamic environments. Developers use container orchestration to automate and manage tasks in an application. 

While containers help improve the developer's productivity. Container orchestration benefits enterprises by optimizing their DevOps and operational activities.

Orchestration manages and automates tasks that include:
- Configuration and scheduling
- Provision and deployment
- Resource allocation
- Containers availability
- Monitoring the health of container
- Securing interactions between containers
- Load balancing, service routing, and traffic routing between containers.
- Adding or removing containers to balance the workload. 
- Moving containers from one host to another if resources are limited or when a host shuts down.

### Top container orchestration tools
Container orchestration tools manage many containers and microservices for your organization.
There are multiple container orchestration tools used for container management. This article will discuss popular tools like Kubernetes, Docker Swarm, Apache Mesos, and others.

#### Kubernetes
[Kubernetes](https://kubernetes.io/) is an open-source platform that was designed and developed by Google. Currently, Kubernetes is maintained by [Cloud Native Computing Foundation](https://www.cncf.io/). It is the leading container orchestration system. This is because container solutions widely adopt it as it is user-friendly.
Kubernetes automates deployment, scaling, and management of container applications.

Organizations using Kubernetes include:
- [Google](https://www.google.com/)
- [Udemy](https://www.udemy.com/)
- [Shopify](https://www.shopify.com/)
- [Slack](https://slack.com/intl/en-ke/)

![Kubernetes Architecture](/engineering-education/top-container-orchestration-tools/kubernetes-architecture.jpg)

[Image source](https://sensu.io/blog/how-kubernetes-works)

Kubernetes architecture consists of four major components:
1. **Node** - It handles the running of tasks in a container. Nodes serve as hosts for container runtimes and ease communication between containers.
2. **Cluster** - Composed of nodes that handle sharing of resources and manage containerized applications.
3. **Replication Controllers** - They are responsible for scheduling and resource allocation on containers.
4. **Pods** - A scheduling unit that allocates resources to containers. 

##### Features of Kubernetes
- Provides powerful scheduling features.
- It is secure with Google's Network policies
- Easy to deploy and manage applications.
- Enhanced portability.
- Enable container isolation by removing interdependencies.

#### Google Kubernetes Engine (GKE)
[GKE](https://cloud.google.com/kubernetes-engine) is a cloud orchestration tool hosted on the Google Cloud Platform. Kubernetes power GKE clusters. It has all Kubernetes functionalities. These functionalities include deployment, scaling, administration, and management of containerized applications.

GKE enables developers to smoothen operations based on application requirements. It provides CI/CD tools to help DevOps improve productivity while building and managing containers.

Organizations using GKE include:
- [The New York Times](nytimes.com/international/)
- [Shopify](https://www.shopify.com/)
- [Delivery Hero](https://www.deliveryhero.com/)

##### Features of GKE 
- GKE enables developers to streamline operations based on application needs.
- Provides automated deployment, scaling, and upgrading.
- Enhance portability.
- Google improves the GKE platform and make it robust and reliable

#### Amazon Elastic Container Service (ECS)
[Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_instances.html) is an orchestration tool that runs container clusters on [Amazon EC2 instances](https://aws.amazon.com/ec2/instance-types/). ECS powers services such as Amazon Sage Maker, Amazon Batch, and Amazon recommendation engine.

Amazon ECS provides a reliable, scalable, and secure orchestration platform. Therefore Amazon ECS can be considered appropriate for critical and sensitive applications.

Organization using ECS include:
- [Gartner](https://www.gartner.com/en)
- [Stanley Black & Decker](https://www.stanleyblackanddecker.com/)

##### Features of ECS
- Run and manage containers
- Efficient load balancing
- Container Registry make applications compatible within different environments.
- ECS integrates with other AWS services to display greater capabilities.

#### Azure Kubernetes Service (AKS)
[AKS](https://azure.microsoft.com/en-us/services/kubernetes-service/) is an open-source container orchestration tool that is a managed Kubernetes service hosted on the Azure cloud platform. AKS offers a serverless continuous integration (CI) and continuous deployment (CD) occurrence. Also, AKS offers scalability, end-to-end deployment, and availability.

Azure Kubernetes offer services that help DevOps in software development, such as planning, administration practices, and development practices. All these services are hosted on Microsoft Azure, and DevOps use them to benefit their requirements.

Organizations using AKS include:
- [Carmax](http://carmax.com/)
- [Unitedhealth Group](http://unitedhealthgroup.com/)
- [Quest Diagnostics](http://questdiagnostics.com/)
- [Northrop Grumman](http://northropgrumman.com/)

##### Features of AKS
- AKS manage, build, and scale microservice-based apps.
- Administer rules across clusters with Azure Policy.
- It is scalable.

#### Docker Swarm
[Docker Swarm](https://docs.docker.com/engine/swarm/key-concepts/) is a container orchestration tool for Docker applications. It gives you the most straightforward route for orchestrating a Docker hosts cluster. Docker is simple and does not need more software. It, thus, suits small-scale enterprises handling container technology.

Organizations using Docker Swarm include:
- [Dell](http://delltechnologies.com/)
- [VMware](http://vmware.com/)
- [Perspecta](http://perspecta.com/)

![Docker Swarm Architecture](/engineering-education/top-container-orchestration-tools/docker-swarm.jpg)

[Image source](https://www.docker.com/blog/docker-built-in-orchestration-ready-for-production-docker-1-12-goes-ga/)

Docker Swarm architecture consists of the following components:
- **Swarm** - It is similar to a cluster in Kubernetes. Composed of nodes with at least one master and several worker nodes.
- **Swarm Manager** - The master node controls activities in the swarm by assigning tasks to worker nodes. It manages container operations deployed on different hosts.
- **Worker Node** - It collects and executes tasks from the swarm manager.

##### Features of Docker Swarm
- Does not require extra software for setup.
- Docker Swarm containers are portable and lightweight.
- Cluster management integrated with Docker Engine.
- Enhance scalability by load balancing.
- Decentralized design.
- It is secure.
- Multi-host networking.

#### Apache Mesos
[Mesos](http://mesos.apache.org/documentation/latest/) is an open-source tool developed by [University of California at Berkeley](https://en.wikipedia.org/wiki/Apache_Mesos). It is a cluster management tool that can effectively perform container orchestration. 

Apache Mesos handle resource sharing and allocation across different containers. It enables resource allocation using kernel features such as [CGroups in Linux](https://www.kernel.org/doc/html/latest/admin-guide/cgroup-v1/cgroups.html) and [Zones in Solaris](https://en.wikipedia.org/wiki/Solaris_Containers).

Organizations using Apache Mesos include:
- [Apple](http://www.apple.com/)
- [Airbnb](http://www.airbnb.com/)
- [eBay](https://www.ebay.com/)
- [Netflix](http://www.netflix.com/)

![Apache Mesos Architecture](/engineering-education/top-container-orchestration-tools/apache-mesos.jpg)

[Image source](http://mesos.apache.org/documentation/latest/architecture/)

Mesos architecture consists of the below components:
- **Master Mesos** - A master node that manages Mesos agents.
- **Master Agents** - Executes tasks sent by the framework.
- **Marathon API** - Enable balancing of loads.
- **Scheduler** - It uses Mesos to start and stop workloads.

##### Features of Apache Mesos
- Mesos has built-in frameworks.
- It supports API languages such as Python, Java, and C++.
- Mesos lightweight interface allows the deployment of more than 10,000 nodes.

### Conclusion
Container technology is growing fast, and more cloud deployment technologies are coming up. Thus container orchestration tools will keep advancing. Finally, you came to the end of the article. 

I hope this article has given a clear understanding of: 
- Container orchestration.
- Container orchestration tools.

Happy learning!

#### Resources
- [Docker Docs](https://www.docker.com/resources/what-container)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
