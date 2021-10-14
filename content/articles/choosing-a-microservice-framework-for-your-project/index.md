---
layout: engineering-education
status: publish
published: true
url: /choosing-a-microservice-framework-for-your-project/
title: Choosing an Appropriate Microservice Framework
description: This article will explain the importance of using microservices architecture and compare various microservice oriented frameworks 
author: martha-ngugi
date: 2021-10-06T00:00:00-02:30
topics: []
excerpt_separator: <!--more-->
images:

  - url:  /engineering-education/choosing-a-microservice-framework-for-your-project/hero.jpg
    alt: Microservices Framework Example Image
---
In the past years, applications have always been developed following the monolith architecture. They were coded from top to bottom as a single unit. 
<!--more-->
Most of the time, they had no structure and capabilities for future maintenance or upgrades, which posed several challenges. They were also difficult to debug or even add new features.

[Microservices architecture](https://microservices.io/) assists developers in building multiple smaller apps instead of one large application. 

A large application can be challenging to maintain. It's difficult to add new features and functionalities to such apps.

With the use of microservices architecture, developers can create a small application for each feature. Whenever a new feature is required, a new program is created. Each microservice can be developed and maintained independently.

However, businesses and developers may face challenges when choosing the right microservices frameworks to build robust applications at minimal time and cost. 

This article will highlight the aspects that should be considered when selecting a microservices framework for a project.

### Pros of the microservices architecture
There are several advantages of using microservices architecture, as highlighted below:
- They make the application **highly scalable** because all features are independent of each other. Therefore, it is easy to maintain or update them independently.
- Microservices architecture ensures **easy resource optimization and prioritization**. Each service has unique demands. Therefore, businesses can determine the appropriate scaling strategies to implement.
- Developers can easily **read and understand** the application codebases.
- They make the application **easy to maintain and upgrade**.
- They **cut down on costs and efforts** required during the deployment of the application. This is because each microservice is deployed independently. Also, developers only deploy the modified microservice and not the entire application.
- They make **application debugging easier** since one only deals with part of the application and not the whole application.
- They make **fault isolation easy**.
- They ensure that the **application has better fault tolerance** because developers can build more resilient individual services.
- They encourage **code reusability** since microservices are built and organized around business functionalities. Some of the features can be reused which saves development costs.

### Cons of the microservices architecture
The challenges faced when using microservices architecture in the application are discussed below:
- They may lead to **added complexity**, especially in scenarios where services cannot be separated from each other.
- They **negatively impact performance** whenever multiple services use the same tasks.
- Users may find the **application's UI confusing** due to different page loading speeds. 
- The application can also be challenging to maintain if the microservices have been developed using different programming languages.
- They make **integrated testing** challenging. It's hard to set up an end-to-end integration test environment, especially if components reside in other systems.
- They may complicate the development process, especially when different teams are involved. 

### Microservices framework selection criteria
Below are the criteria for selecting the proper framework for migrating from a monolith to a microservice framework.

#### Planning and organizing
**Requirement analysis**

Developers should identify their application's needs and determine whether they can be segmented into smaller functions with the required value. 

They should do it diligently to determine whether their application can be sub-divided into individual services without changing its core features or operations.

**Team preparation**

Migration from a monolithic to a microservices architecture is lengthy and tedious. Stakeholders and users should be aware of the time investment, cost, and technical specifications required for the infrastructural changes. 

**Development team preparedness**

Development teams should work independently since every microservice works as a separate application. Therefore, there should be different teams for each microservice. 

The teams should have the required skills and tools for developing, deploying, and managing their specified service.

#### Designing microservices
**Business functions and services**

Microservices should not be too large or small. If they are too large, it would mean that the organization would see the need to use microservices architecture. 

On the other hand, organizations may experience high operation costs that outweigh the benefits offered if the framework is too small.

**Microservices design**

Services should be designed to be loosely coupled with high cohesion, and single bounded. A loosely coupled service does not entirely depend on other services. 

High cohesion means that the service should only perform one function. Note that single-bounded implies that the service should be domain-specific with the domain's internal details and specific models.

Single bounded context also ensures that the microservice achieves a [Domain-Driven Design](https://www.ibm.com/garage/method/practices/code/domain-driven-design/).

**Using APIs and events for communication**

Services should not communicate with others directly. Instead, an API gateway that allows authentication, request, responses, and throttling services should be designed. 

Traffic can then be redirected from the API gateway to the services.

**Security concerns**

Microservices are vulnerable to attacks due to their distributed nature and structure. 

This means that a different, more secure approach such as the [DevSecOps model](https://snyk.io/devsecops/) has to be adopted compared to monolith architecture.

#### Developing microservice-based applications
- **Version control**: Each service should be kept in a separate repository for easy access and improved version control. It is also vital to keep logs.
- **Consistent development environments**: The services development environments should be deployed as VMs to ensure developers can familiarize themselves with the framework quickly.
- **Implement backward compatibility**: Intensive tests should be conducted to safeguard the system. It will also ensure backward compatibility for the API calls that respond to each user query. 

#### Data storage and management of microservices
**Implement different databases for each microservice**

The database that fulfills the service needs should be selected. Then the infrastructure that matches the data it contains should be customized for that microservice. 

A service mesh ensures that a robust microservice framework has been achieved. Each service is separately maintained but can still access other apps.

#### Deploying and hosting of microservices
**Separate microservices deployment**

It helps to save time when performing regular maintenance or upgrades. It also assists in preventing a single service from using significant resources. 

Therefore, a dedicated infrastructure that hosts each microservice should be implemented. This ensures that each microservice's fault is isolated from other components.

Such a measure improves fault tolerance and minimizes outages.

**Microservices containerization**

Microservices and containers work together efficiently. It's possible to deploy and manage individual applications independently without interfering with other containerized services. 

In addition, containers are platform-independent which is a vital feature of microservices architecture.

**Separate microservices build and deployment process automation**

Automation tools such as [Jenkins](https://www.jenkins.io/) automate [DevOps workflows](https://www.javatpoint.com/devops-workflow-and-principles) through [Continuous Integration and Delivery](https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html).

#### Maintenance and operations of microservices
**Use of centralized logging and monitoring system**

This system ensures that all microservices generate logs in a standard format. This assists in the identification of errors and implementation of appropriate solutions.

Additionally, a monitoring system can also help in detecting compromised resources early.

### Popular microservices frameworks
#### Spring Boot
It is a popular Java framework for developing microservices. It comes with various extension projects under [Spring Cloud](https://spring.io/projects/spring-cloud). 

Spring Boot supports the development of large-scale systems by initializing a simple architecture and combining several components. 

Spring Boot can be integrated with other frameworks through [Inversion Control](https://www.baeldung.com/inversion-control-and-dependency-injection-in-spring).

#### Eclipse Vert.X
It is a popular microservices framework developed by the Eclipse foundation. It supports multiple languages such as [Java](https://www.oracle.com/java/), [Kotlin](https://kotlinlang.org/), and [JavaScript](https://www.codecademy.com/learn/introduction-to-javascript). 

[Vertx](https://vertx.io/) is a tool kit that assists in building reactive microservices that run on the [Java Virtual Machine](https://www.infoworld.com/article/3272244/what-is-the-jvm-introducing-the-java-virtual-machine.html).

Eclipse Vert.x is event-driven and non-blocking. This means that applications built with it support concurrency using several kernel threads. It also lets the application scale with minimal hardware.

#### Oracle Helidon
Helidon consists of Java libraries collections that assist in writing microservices. It comes with two variants; the Helidon MP and SE. 

However, it has not been in the market for long and, therefore, is not fully mature. 

Nevertheless, [Helidon MP](https://helidon.io/docs/v2/#/mp/introduction/01_introduction) is popular among [Java EE](https://www.javatpoint.com/java-ee) developers, and it implements MicroProfile specifications. 

[Helidon SE](https://helidon.io/docs/v2/#/se/introduction/01_introduction) utilizes the latest [Java SE](https://www.javatpoint.com/java-se) features like [reactive streams](https://www.reactive-streams.org/), [fluent-style APIs](https://java-design-patterns.com/patterns/fluentinterface/), as well as asynchronous and functional programming.

#### GoMicro
It is an RPC-based library that offers vital building blocks for developing microservices using the [Go](https://golang.org/) language. 

It implements service discovery using communication via HTTP, [consul](https://www.consul.io/), and encoding using [Pub/Sub](https://cloud.google.com/pubsub/docs/overview), and [proto-rpc](https://grpc.io/docs/what-is-grpc/introduction/) or [json-rpc](https://www.jsonrpc.org/).

GoMicro helps address critical needs required to build highly scalable systems. It handles the complexity of distributed systems and offers simple abstractions that developers understand.

#### Molecular
This is a microservice architecture that utilizes Node.js and is popular among JavaScript developers. 

[Molecular](https://moleculer.services/docs/0.14/) is a fast, modern, and robust microservices framework that helps developers build efficient, reliable, and scalable services.

### Conclusion
As covered in the article, microservices assist in managing applications. However, moving from monolith architecture to microservices can be complex. 

The microservices implementation approach may differ for different organizations depending on their needs. 

Nevertheless, organizations can utilize the above criteria and best practices when choosing the right microservices for their applications.

As always, the primary goal for all microservices is to use a loosely coupled, distributed, and independent framework. In addition, microservices should follow the DevOps model that promotes automation and efficiency.

### Further reading
- [Monolith architecture](https://whatis.techtarget.com/definition/monolithic-architecture)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul)
