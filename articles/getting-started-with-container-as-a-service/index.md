---
layout: engineering-education
status: publish
published: 
url: /engineering-education/getting-started-with-container-as-a-service/
title: Getting started with Container as a Service
description: This article will cover the evolution of container technology into a container as a service model, the essence of CaaS to developers, and the building blocks of Container as a Service. At the end of the article, the reader will learn how to work with available CaaS tools. 
This article aims to help readers understand Container as Service and its benefits when working with containers.
author: elly-omondi
date: 2021-05-04T00:00:00-23:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-container-as-a-service/hero.jpg
    alt: CaaS example
---

There seems to be a trend where solutions nowadays rely on "the as a service" model/offering. I bet you have heard of Infrastructure as a Service, Platform as a Service, and even more.
Containers have joined the trend with the evolution of the Container as a Service model for container-based solutions.

<!--more-->

Before reading any further, for an introduction to container technology, you can check out this [article](https://www.section.io/engineering-education/history-of-container-technology/#:~:text=The%20Beginning&text=Container%20technology%20was%20born%20in,7%20and%20the%20chroot%20system.&text=This%20system%20was%20the%20first,two%20decades%20and%20remain%20dormant.)

### Overview
This article will cover:

- [What is Container as a Service](#what-is-container-as-a-service)
- [Why Container as a Service](#why-container-as-a-service)
- [Benefits of Container as a Service](#Benefits-of-container-as-a-service)
- [Container as a Service Tools](#Container-as-a-service-tools)
- [Working with Amazon EC2 Container Service](#Working-with-AmazonEC2-container-service)

### What is Container as a Service (CaaS)
Tasks such as configuring, uploading, scaling, and migrating containers in cloud environments usually become overwhelming, more so when performed on a significant scale level. 

For this reason, a cloud-based service model, CaaS, was developed to help software developers and IT practitioners run their routine tasks with ease. With containerized applications being on the rise, major cloud vendors inevitably had to offer this container infrastructure and management as a service model.

 [Container as a Service](https://www.atlassian.com/continuous-delivery/microservices/containers-as-a-service) is an automated hosting and deployment platform for containerized applications. With CaaS in place, DevOps teams can scale,  run, manage, and organize containers and container-based applications without worrying about the underlying infrastructure upon which cloud containers run on.

CaaS rely on container-based virtualization, Application Programming Interfaces, and web portal interfaces to provide the above-managed services.

### Why CaaS
CaaS provides the development team with a higher level of abstraction for DevOps to concentrate on product and service delivery. This streamlines the procedure of developing fully scaled container deployment pipelines.

CaaS providers also offer container orchestration engines to deploy and run many containers, thus relieving DevOps teams the need to run and maintain their own machines.

The following services and components make CaaS stand out among IaaS, PaaS, and other as service models:

1. *Container registry* – containers are provisioned through images. These images are stored in registries/ repositories such as docker hubs, where they are pulled to provision containers. CaaS providers host these container registries for management services.

2. *Container Management* - CaaS provides management and monitoring platforms to ensure containers are correctly provisioned, up and running, load-balanced, and in good health.

3. *Rich set of Developer Tools* – through application programming interfaces, CLIs, and web portals, the automation, monitoring, and management tasks are bundled together for accessibility and ease of use in CaaS.

CaaS is more suitable for Microservice oriented applications because of the independent Infrastructure that such applications rely on.

Like other 'as a service' models available, CaaS provides flexible options where users only pay for resources they are using.

### Benefits of Container as a Service
- *Efficiency* – Applications deployed through CaaS benefit from performance optimization through tools like Elastic Load Balancers, Log aggregation and Monitoring tools, and even health check. All these are configured to ensure that development teams build highly visible and available distributed systems and applications.

- *Speed* – creating, replicating, and even spinning up a container and its applications take seconds with CaaS models available because little concentration is given to Infrastructure. With speed provided in CaaS, a lightweight process of a software release is guaranteed.

-	*Portability* – running applications through CaaS containers provides flexibility for the apps to be launched in any environment/platform (public/private clouds). All necessary dependencies and configuration files are bundled together with the applications.

- *Security* – containerized applications run independently and in isolation with other containers. CaaS provides this isolation as a risk-minimizing feature that shields failures of one container and its apps from affecting other containers.
CaaS also makes it easier to launch application fixes, security patches, container level debugging, and required updates.

### The container as a Service tools
CaaS provides a hosted container orchestration engine (majorly Kubernetes) to provision containers, manage container clusters, handle scaling and failure management, and maintain the security of the deployed containers.  With CaaS, cloud vendors usually cover all networking, auto-scaling services, log management and monitoring, CI/CD functions, and other automation activities.

Tools and platforms in CaaS are essential for integrating development and operations teams. Cloud market leaders have thus labored to provide these while using Kubernetes as the main orchestration engine to build upon.

Below are popular tools and projects that support and drive CaaS:

1. [Amazon Elastic Cloud Service (ECS)]() – Amazon efficiently manages clusters through AWS. ECS supports the cross-platform running of Docker containers and workloads.
This orchestration platform offers extensive security, reliability, and scalability for and sensitive and critical applications.

2. [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/services/kubernetes-service/#getting-started) – Microsoft provides AKS to help developers define and deploy complex Kubernetes applications. 

3. [Google Kubernetes Engine (GKE)](https://cloud.google.com/kubernetes-engine)– Google being the pioneer of Kubernetes, offers impactful services through GKE. These services speed up the development life-cycle of applications through pre-built deployment templates for Kubernetes applications and containers.
 
### Working with Amazon Elastic Container Service(ECS)
This section will illustrate the basics of Amazon Elastic container service.

Amazon Elastic Container Service allows developers to work with APIs and web interfaces when launching, monitoring and managing container-based applications in Amazon Web Services.

Amazon ECS works with Elastic container registry, a repository for docker container images, to define all the settings required to launch container-based applications. The registry can be manipulated by task definitions(JSON-formatted files).

[Task definition files](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html) prepare containers and applications to run on Amazon ECS by specifying parameters to be used in launching such containers.

An example of a task definition file that shows CPU and Memory limit, web server type, and application launch type is shown below.
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
Containers and applications can be launched on Amazon ECS through [AWS Fargate] launch type(https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html) or through [EC2](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html)launch type.
An Amazon ECS launch type determines the type of infrastructure on which your tasks and services are hosted.

To get more feel of Amazon ECS and get your hands dirty, you can check out the [AWS site](https://aws.amazon.com/ecs/getting-started/).

### Conclusion
Development teams should take advantage of CaaS offering to change their production life cycle because businesses experience immense benefits after adopting the CaaS model.

### References
1. [COntainer as a Service]((https://www.atlassian.com/continuous-delivery/microservices/containers-as-a-service).
2. [ Amazon Elastic Cloud Service](https://aws.amazon.com/ecs/getting-started/).
3. [Azure Kubernetes Service](https://azure.microsoft.com/en-us/services/kubernetes-service/#getting-started).
4. [Google Kubernetes Engine](https://cloud.google.com/kubernetes-engine).
