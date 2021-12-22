---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-container-as-a-service/
title: Getting Started with Container as a Service
description: This article will cover the evolution of container technology into a container as a service model, the essence of CaaS to developers, and the building blocks of container as a service. At the end of the article, the reader will learn how to work with available CaaS tools. 
author: elly-omondi
date: 2021-05-24T00:00:00-14:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-container-as-a-service/hero.jpg
    alt: Containers
---
There seems to be a trend where solutions nowadays rely on the (as a service) model/offering. I bet you have heard of Infrastructure as a Service, Platform as a Service, and even more. Containers have joined the trend with the evolution of the Container as a Service model for container-based solutions.
<!--more-->
Before reading any further, for an introduction to container technology, you can check out [this article](/engineering-education/history-of-container-technology/).

### Table of content
This article will cover:
- [What is Container as a Service?](#What-is-Container-as-a-Service-(CaaS))
- [Why Container as a Service?](#why-CaaS)
- [Benefits of Container as a Service](#Benefits-of-Container-as-a-Service)
- [Container as a Service tools](#The-container-as-a-service-tool)
- [Working with Amazon EC2 Container Service](#Working-with-Amazon-Elastic-Container-Service)

### What is Container as a Service (CaaS)
Tasks such as configuring, uploading, scaling, and migrating containers in cloud environments usually become overwhelming, more so when performed on a significant scale level. 

For this reason, a cloud-based service model, CaaS, is available to help software developers and IT practitioners run their routine tasks easily. With containerized applications being on the rise, major cloud vendors had to offer this container infrastructure and management as a service model.

[Container as a Service](https://www.atlassian.com/continuous-delivery/microservices/containers-as-a-service) is an automated hosting and deployment platform for containerized applications. With CaaS in place, DevOps teams can scale, run, manage, and organize containers and container-based applications without worrying about the underlying infrastructure upon which cloud containers is it running on.

CaaS rely on container-based virtualization, Application Programming Interfaces, and web portal interfaces to provide the above-managed services.

### Why CaaS

CaaS provides the development team with abstraction necessary for DevOps to concentrate on product and service delivery. This results to streamlined development benefits in terms of scaling and cost-cutting in the eployment pipelines.

CaaS providers also offer container orchestration engines to deploy and run many containers, thus relieving DevOps teams the need to run and maintain their own machines.

The following services and components make CaaS stand out among IaaS, PaaS, and other "as service" models:

1. *Container registry*:  Software developers create containers through [images](https://phoenixnap.com/kb/docker-image-vs-container). The developers pull the images stored in registries/ repositories such as docker hubs for container provisioning. CaaS providers host these container registries for management services.

2. *Container management*: CaaS provides management and monitoring platforms to ensure containers are correctly provisioned, up and running, load-balanced, and in good health.

3. *Rich set of Developer Tools*: Through application programming interfaces, CLIs, and web portals, the automation, monitoring, and management tasks are bundled together for accessibility and ease of use in CaaS.

CaaS is more suitable for Microservice oriented applications because of the independent Infrastructure that such applications rely on.

Like other 'as a service' models available, CaaS provides flexible options where users only pay for resources they are using.

### Benefits of Container as a Service
- *Efficiency*: applications deployed through CaaS benefit from performance optimization configurations like Elastic Load Balancing, Log aggregation, Monitoring, and even health checks. These configurations ensure that development teams build highly visible and available distributed systems and applications.

- *Speed*: creating, replicating, and even spinning up a container and its applications take seconds with CaaS models available because  Infrastructure is given little concentration. The speed provided by  CaaS guarantees a lightweight process of a software release.

- *Portability*: CaaS provisioned containers provide flexibility for launching apps in any environment/platform (public/private clouds). This happens because all necessary dependencies and configuration files are bundled together with the running applications.

- *Security*: containerized applications run independently and in isolation with other containers. CaaS provides this isolation as a risk-minimizing feature that shields failures of one container and its apps from affecting other containers.
 
CaaS also makes it easier to launch application fixes, security patches, container level debugging, and required updates.

### The container as a service tool
CaaS provides a hosted container orchestration engine (majorly Kubernetes) to provide containers, manage container clusters, handle scaling and failure management, and maintain the security of the deployed containers. With CaaS, cloud vendors usually cover all the networking, auto-scaling services, log management and monitoring, CI/CD functions, and other automation activities.

Tools and platforms in CaaS are essential for integrating development and operations teams. Cloud market leaders have thus labored to provide these while using Kubernetes as the main orchestration engine to build upon.

Let's talk about the popular tools and projects that support and drive CaaS:

1. [Amazon Elastic Cloud Service (ECS)](https://aws.amazon.com/ec2/): Amazon efficiently manages clusters through AWS. ECS supports the cross-platform running of Docker containers and workloads.
This orchestration platform offers extensive security, reliability, and scalability for sensitive and critical applications.

2. [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/#getting-started): Microsoft provides AKS to help developers define and deploy complex Kubernetes applications. 

3. [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine): Google is the pioneer of Kubernetes, offers impactful services through GKE. These services speed up the development life-cycle of applications through pre-built deployment templates for Kubernetes applications and containers.

4. [Section Edge Containers as a Service](https://www.section.io/modules/edge-containers-as-a-service/): Section extends Containers as a Service from cloud to edge. Built on the backbone on Kubernetes, Section's Edge CaaS solution distributes containers across a flexible global edge network, delivering performance, security, and scalability benefits.
 
### Working with Amazon Elastic Container Service (ECS)
This section will illustrate the basics of Amazon Elastic container service.

Amazon Elastic Container Service allows developers to work with APIs and web interfaces when launching, monitoring and managing container-based applications in Amazon Web Services.

Amazon ECS works with Elastic container registry, a repository for docker container images, to define all the settings required to launch container-based applications. The registry can be manipulated by task definitions(JSON-formatted files).

[Task definition files](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html) prepare containers and applications to run on Amazon ECS by specifying parameters to be used in launching such containers.

An example of a task definition file that shows CPU and Memory limit, web server type, and application launch type is shown below:
```JSON
{
    "family": "webserver",
    "containerDefinitions": [
        {
            "name": "web",
            "image": "nginx",
            "memory": "100",
            "cpu": "99"
        },
    ],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "networkMode": "awsvpc",
    "memory": "512",
    "cpu": "256",
}
```

Containers and applications can be launched on Amazon ECS through [AWS Fargate](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) launch type or through [EC2](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) launch type.
An Amazon ECS launch type determines the type of infrastructure on which your tasks and services are hosted.

To get more feel of Amazon ECS, you can check out the [AWS site](https://aws.amazon.com/ecs/getting-started/).

### Conclusion
Development teams should take advantage of CaaS offering to change their production life cycle because businesses experience immense benefits after adopting the CaaS model.

Happy coding!

### References
1. [Container as a Service](https://www.atlassian.com/continuous-delivery/microservices/containers-as-a-service).
2. [Amazon Elastic Cloud Service](https://aws.amazon.com/ecs/getting-started/).
3. [Azure Kubernetes Service](https://azure.microsoft.com/en-us/services/kubernetes-service/#getting-started).
4. [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine).


---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)