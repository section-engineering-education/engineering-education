---
layout: engineering-education
status: publish
published: true
url: /why-and-when-you-should-use-kubernetes/
title: Why and When You Should Use Kubernetes
description: This article will provide an overview of why and when you should use Kubernetes. It will also explain when organizations should not use Kubernetes. 
author: erick-wekesa
date: 2021-08-02T00:00:00-11:10
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-and-when-you-should-use-kubernetes/hero.jpg
    alt: Kubernetes example Image
---
Kubernetes is a powerful container management tool. It automates the deployment and management of containers. It is the next big wave in cloud computing. It’s easy to see why businesses migrate their infrastructure and architecture to reflect a cloud-native, data-driven era.
<!--more-->
Before a business decides to use Kubernetes, the question of why or when Kubernetes should be used is important. This article will address this issue and explain when organizations should not use this technology.

### Key takeaways

By the end of this article, readers should be able to:

1. Understand the overview of Kubernetes and container orchestration

2. Know the top reasons why a business should go for Kubernetes and the benefits it offers

3. Understand when Kubernetes can be used

4. Understand when you should not use Kubernetes

### Overview of containers and container orchestration
A new technology called Cloud Natives has been adopted by many organizations as a deployment approach for the software they build. Container technology is the key enabler to this Cloud Natives approach.

Containers are a solution to the problem of how to get the software to run reliably when moved from one computing environment to another. An example will be moving an application from a test environment to a production environment or moving an application from a physical machine to a VM or a public cloud. With this containerized approach, you will be always sure that your application will work right regardless.

Containers are usually made up of components that include runtime, system libraries, system tools, system settings, and code. All these components are usually bundled into a lightweight executable package. Many containers can be deployed on a single OS and share the same Operating system kernel.

With the ability to have many containers being deployed in a single environment, organizations need orchestration tools to help them in such deployments. This is where Kubernetes comes in. Kubernetes, also known as K8s. Is an open-source system for automating deployment, scaling, and management of containerized applications.

### Why an organization should use Kubernetes
#### Kubernetes is unlikely to become obsolete
Kubernetes has been built by Google engineers and is being supported by them. These engineers have experience in building scalable applications. The Kubernetes ecosystem is developing as new products are being added to it. You will also find out that most cloud vendors support K8. It is for sure that this service will be there for many years.

#### Promotes business growth
By using Kubernetes, organizations have experienced a lot of growth. The software development cycle is more efficient and Productive. Some of the benefits realized from Kubernetes use include but are not limited to:

1) Short software development life cycle.

2) Organizations have been able to move to the cloud.

3) There has been an improvement in resource utilization.

#### Improved system availability and scalability
Scalability is the ability of a system or network to grow and manage increased demands. Availability is the time a system remains operational to perform its required tasks in a specific period. Kubernetes has the ability to make a system available and scalable.

One might have an application that is CPU intensive. The application also has increased traffic at certain times because of business needs. Kubernetes will make the resource scale up when need be. It will also scale down should the load decrease. With this, your application will be more stable.

#### Can be cheaper than other alternatives
Some applications need larger computing resources. Kubernetes will be the best solution for you cost-wise. Kubernetes will help you from paying for resources that you do not need. Or resources that you do not use. This is possible because of its auto-scaling capability as discussed above.

### When an organization should use Kubernetes
#### When an organization wants to move to the cloud-native approach to develop and deploy applications
As an organization, you may currently be thinking of moving to the cloud in the cloud soon. At the moment, building for the cloud may not be an option the organization prefers. Working on-premise could be the best solution. In such a scenario, building on top of containers and Kubernetes is best.

It is a way to prepare the organization to move to the cloud soon. Take note that the movement from on-premise to the cloud may not be a seamless migration. But, it will be way better as compared to building on virtual machines and moving to a cloud Infrastructure as a Service.

#### When the organization needs to scale
When the application you have built reaches a point where it needs to scale. At that point, your application will be containing many services. They may need to talk to each other and need scaling up and down depending on different factors. Doing it on Kubernetes may be a better choice for the organization. At this point, the organization should start to think about orchestration.

#### When the organization wants to practice consistent deployment
Kubernetes is part of the CI/CD pipeline. It will help with the deployment of your application into the production environment. The deployment will nnnnnnwithout having any downtime. Point to note is that the task of building, testing and delivering your application to a container registry is not part of Kubernetes. There are specific CI/CD tools for building and testing.

#### When thinking of building a service like Kubernetes
It is not advisable to build this on your own. You will fail many times before you start to see the results of your hard work. Make sure that your organization has a really good reason to take this approach. The most ideal is to use either the Azure Kubernetes service or AWS.

### When should an organization not use Kubernetes?
#### When developing a monolithic application.
When one is developing a monolithic application. With Monolithic architecture, the components of the application developed are dependent on each other. This is from the input/output operation to the processing and rendering of the data. With containers, your application will be divided into separate independent components.

#### Little or no time to learn
When the organization does not have the time it requires to get its employees to learn how to use Kubernetes. It has a steep learning curve. Kubernetes is a massive tool that requires enough time to learn. Your team also needs to get a good knowledge of Kubernetes before they can start using it in their development process. It is quite complex.

### Conclusion
Kubernetes is a powerful tool to learn and use. As an organization, one has to do their analysis well to make sure that Kubernetes is a fit for their current application development. As great as Kubernetes is, it does not fit every team or application.

Happy Learning!

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
