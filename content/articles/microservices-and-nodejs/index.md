---
layout: engineering-education
status: publish
published: true
url: /microservices-and-nodejs/
title: Is Node.js a Good Choice to Create an App based on Micro-services
description: After reading this article, you should know the importance of using micro-services and the micro-services' key benefits when building apps. 
author: pius-macharia
date: 2021-01-07T00:00:00-15:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/microservices-and-nodejs/hero.jpg
    alt: Node.js and Microservices Image

---
Node.js and micro-services have an intense connection. Node.js was introduced in app development to make the building of apps based on micro-services easier. The principal idea was to break down Node.js apps into small, distributed nodes that would communicate with each other to make the whole application function.
<!-- more -->
After reading this article, you should know the importance of using micro-services, and the micro-services' key benefits when building apps. You should also know why Node.js coupled with micro-services is such a good technology to implement when building complex apps and the benefits Node.js can offer during development.

### What are micro-services?
Micro-services are a software design pattern which splits up huge applications into a set of small and simple applications or services. The small chunks of applications or services can then be maintained with ease, tested, and [loosely coupled](https://nordicapis.com/the-difference-between-tight-coupling-and-loose-coupling/). 

This is followed by the independent deployment of these applications in an organized manner around their business capabilities. Business capabilities are defined and expressed in business-oriented APIs, which encapsulates valuable assets to the business, and integrations to the system, which are adaptable for use in multiple contexts and can be reused depending on need.

Before the introduction of micro-services architecture, apps used to be built as [monoliths](http://www.codingthearchitecture.com/2014/11/19/what_is_a_monolith.html). They kept growing and growing which caused problems with their maintainability. The logical solution was to split them up into smaller bits, known as micro-services.

In a monolithic architecture, tasks are not clearly divided nor defined. For instance, fixing a login issue in a huge application could require a developer to first understand the whole codebase of an application, instead of just one straightforward process.

### Benefits of micro-services
The choice of technology when building applications is not as important compared to the business rationale. Introducing micro-services into an app development project provides tangible benefits, as highlighted below.

- Better structure: A well-structured app is usually easier to understand, meaning that any new features to be added to the app will be easier to design and implement. And therefore, less time and cost is spent on business analysis. Therefore, developers spend more time on development.

- Seamless implementation of complex products: Complex applications are difficult to conceptualize, build, and maintain. But with micro-services, they are broken down into small bits that are more manageable.

- Scalability: Scaling a monolithic app with a huge [blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) of tightly coupled code is difficult, since a lot of time is spent trying to figure out what is going on inside. With micro-services, it becomes more apparent, which are the bottlenecks, and therefore removing them is easier.

- Fewer errors: In a monolithic architecture looking for bugs is challenging and time consuming compared to micro-services where the small pieces of technology are kept with minimal errors and thus more manageable.

- Better performance: Every micro-service only does one job at a time, meaning that they are easy to tune and optimize for work efficiency.

- Resistance to vendor lock-in: This offers flexibility as different programming languages can be used depending on the problem.

### Understanding Node.js technology and its benefits
Node.js is an event-driven [JavaScript runtime](http://dolszewski.com/javascript/javascript-runtime-environment/) designed to build applications that can be scaled afterward and runs on the web. Micro-service-based apps built in Node.js can deliver a lot of benefits, as highlighted below.

- Performance and reliability: The app will be stable and can be scaled to infinity depending on cost. One of the great features of Node.js that enables this is its single-threaded asynchronous architecture meaning that it [spawns](https://subscription.packtpub.com/book/application_development/9781785289583/3/ch03lvl1sec34/how-to-spawn-a-process) child processes for some asynchronous tasks, however these tasks are invisible to a programmer and run deep under the hood.

- [Data replication](https://www.manageengine.com/device-control/data-replication.html), involves making multiple copies of data, storing them in different locations to improve accessibility within a network. This is easy with Node.js and is a micro-services requirement.

- Cost control: Instead of building another copy of the app which is the case with monolith apps, a micro-service, can be created that only replicates the part of the app that's needed, thus saving money.

- Easier maintenance and updates: Writing a new feature is easy, contrary to the monolithic app where there is a huge junk of code to be dealt with. The same happens for updates. The system can be improved incrementally in place of investing in a huge and costly code rewrite. Node.js supports this approach by enforcing a [modular](https://www.techopedia.com/definition/25972/modular-programming) and service-based structure of the application.

- Simplified development workflows: Developers can work on their respective parts of the app independently, unlike in monolith, where developers depend on each other during the app development process. This is one of the strengths of Node.js since a big app is broken down into small chunks, that are easy for developers to work on their parts independently without interfering with each other's work.

### Conclusion
This article has highlighted and explained the importance and benefits of micro-services and why Node.js is a good technology to consider when implementing this architecture. The benefits micro-services offer cannot be underestimated. They include painless scaling, cost control, and ease of development and updates. 

When building complex and high traffic applications, Node.js and micro-services are the best architectures to consider since they make application development and maintenance easier compared to monoliths.

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)