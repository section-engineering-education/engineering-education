---
layout: engineering-education
status: publish
published: true
url: /why-is-docker-so-popular/
title: Why is Docker so Popular
description: In this article, we will talk about Docker, the reasons to use it, why is has become so popular, and finally its benefits. Docker allows you to break down your application into smaller services. Each service is like a microcomputer. 
author: moses-m
date: 2021-05-25T00:00:00-13:30
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-is-docker-so-popular/hero.png
    alt: Container Image
---
[Docker](https://www.docker.com/) is an open-source [container technology](https://www.docker.com/resources/what-container) used by developers and system admins to build, ship, and run distributed applications. Docker has been a game-changer since its release in [2013](https://en.wikipedia.org/wiki/Docker_(software)#History). 
<!--more-->
It has become a massively popular [containerization technology](/engineering-education/history-of-container-technology/). In this article, we will discuss why Docker is a big deal.
### The game changer
Before the arrival of Docker, developers used virtualization technology to develop applications, which worked fine in their own environment. The problem was when the same application reached production; it wouldnt work correctly due to the difference in the computing environments. This technology didn't support microservices architecture. For example, large applications couldn't be broken down into small services.

Before Docker, microservices were deployed using virtualization. Meaning multiple virtual machines were installed on a single host machine. Individual virtual machines were used to run individual microservices. The disadvantage of this approach was that it used to waste many resources. 

The microservices running in these virtual machines were not using the full potential of memory, processing power, and disk space. So imagine having hundreds of such microservices running, the resource wastage would be enormous.

With the introduction of Docker, a developer can build and deploy an application in containerized environments. This ensures that applications run the same regardless of where they are or what computer or environment they are in. Docker containers, in essence, can be deployed to any computer, infrastructure, or cloud with no compatibility problems.

These containers act like microcomputers with specific jobs, each with its own operating system and its own isolated CPUs, memory, and network resources.

![Docker vs. virtual machines](/engineering-education/why-is-docker-so-popular/docker-vs-virtual-machines.png)

[Image Source](https://codingthesmartway.com/docker-beginners-guide-part-1-images-containers/)

This was a massive step for the microservices architecture. Unlike the virtual machine, a Docker container does not require you to pre-allocate resources. A container takes the resources according to the need of the application. Thus achieving optimal utilization of the available computing resources.

### The popularity of Docker
Since the introduction of Docker and Docker containers, the growth has been relatively tremendous. Let's check some metrics that show how Docker trends its popularity among developers.

Every year, stack overflow releases [survey results](https://insights.stackoverflow.com/survey/) of how developers cope with different technologies in the world of computing. Let's check at the [2020 survey](https://insights.stackoverflow.com/survey/2020) which included 65000 respondents.

The survey shows that Windows and Linux are the most popular platforms. Notably, there was an immense growth of container technologies such as Docker and Kubernetes.

Docker was the third most popular platform and correlated technologies. About 35% of the respondent uses Docker.

![How popular Docker is](/engineering-education/why-is-docker-so-popular/how-popular-docker-is.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-platforms-all-respondents5)

Many of these respondents have shown a great interest in container technologies. Docker is the second most loved platform. This means that developers who use such platforms are satisfied with these technologies. They are interested in developing and using container technologies more often.

![Most loved technologies](/engineering-education/why-is-docker-so-popular/most-loved-technologies.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-platforms-loved5)

It also appeared that Docker is the most wanted technology, and most developers want to learn more about it.

![Most wanted technologies](/engineering-education/why-is-docker-so-popular/most-wanted-technologies.jpg)

[Image Source](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-platforms-wanted5)

This metrics are a testimonial that Docker is widespread, and the popularity is growing rapidly.

### Reasons why is Docker so popular
Why does everyone loves and seems to be interested in Docker?

#### 1. The microservices architecture
Docker allows you to break down your application into smaller services. Each service is like a microcomputer. Each with a specific function and can be isolated from other services. 

You can control several containers as part of a single application, like running an app and a database together. For example, WordPress, where you need the WordPress API and a database to run as a single web app.

The advantages of this are:
- The application becomes easier to maintain as you only target a specific service at a time.
- When one service goes down, it does not significantly impact the whole application.
- Whenever required, modifications can be brought into a single service without worrying much about the dependencies of other services.

In short, a service can be easily added, removed, stopped, and restarted without affecting others on the same host machine.

#### 2. Compatibility
Docker containers, unlike virtual machines, can be distributed on any platform without causing compatibility issues. Your application will remain system agnostic, making it easier to use, build, manage, and deploy to any host system or cloud.

#### 3. Resource effective
Docker is a form of virtualization in which (unlike virtual machines) the resources are allocated directly by the host. This helps you to run many Docker containers instead of only a few virtual machines. Each container self assigns resources on the need of the application.

Docker uses a [layered file system](https://ilearnedhowto.wordpress.com/tag/layered-filesystem/). This gives Docker the ability to use less disk space as it can reuse files efficiently. For example, if you have multiple [Docker images](/engineering-education/docker-concepts/) using the same base image, Docker will only keep a single copy of the files needed and share them with each container. This creates vast economies of scale, making your application cost-effective.

#### 4. Cost effective
Let's take the case of virtual machines. Where you have a single server, and you want to run multiple services. Imagine that every application will need its own operating system. Basically, you are running multiple operating systems on the same physical hardware. This way, you're wasting resources such as CPU, RAM, and hard drive.

Another issue is the operating system licenses. Let's say you are using Windows operating system. You'll have to buy those licenses. All of this will force you to pay a lot of money.

In Docker, all containers will share the same operating system. Each container runs its own full-fledged application and its application dependencies. Moreover, if several containers use the same dependencies ([Docker container images](https://searchitoperations.techtarget.com/definition/Docker-image)), they can reuse them without reinstalling the same dependency instance within your [Docker engine](https://docs.docker.com/engine/).

#### 5. Portability
Usually, when creating an application, you would install many programs and tools onto your application's server. The whole application is tied to the machine where this server is. Sharing such applications can be tricky. With Docker, you can take the entire application and contain it in a container.

You write instructions indicating how to set up a server just the way you need it to work. You set every technology stack that your application requires to run in a single configuration file. You can redeploy these configurations on any other server and duplicate the application functionality.

This affects the compatibility as well. Let's say you have Node.js version 5.0.0, and I have the Node.js version 16.0.0. When running this application on these two platforms, something might be affected in terms of version compatibility. With Docker, you set all these version configurations to get your application to work. , if it works on my side, it will work for you or anybody else.

#### 6. Continuous Integration/Continuous Deployment (CI/CD)
On the other side, this approach encourages [CI/CD](/engineering-education/an-introduction-to-cicd-tools/). This is a [DevOps](/engineering-education/what-it-takes-to-be-a-devops-engineer/) methodology designed to encourage developers to share code repositories on time and more generally with other developers. Developers can then deploy, test, operate, and monitor application code fast and efficiently.

### Conclusion
Containerization technologies are here to stay. It is the right way to package your application and move it around your infrastructure. Many developers and companies are adopting these approaches, with Docker leading the way. 

Some of the big [companies that use Docker](https://www.featuredcustomers.com/vendor/docker/customers) include PayPal, Uber, eBay, Shopify, Spotify, Quora, etc.

Docker is revolutionizing the IT world across the board. It is speeding up development, testing, and server deployments. If you haven’t learned Docker, check it and see how you can use it to containerize your next project.

Happy coding!

### Further reading
1. [Understanding Docker Concepts](/engineering-education/docker-concepts/)
2. [Getting Started with Docker](/engineering-education/getting-started-with-docker/)
3. [A Brief History of Container Technology](/engineering-education/history-of-container-technology/)
4. [How to Create Spring Boot Docker Images](/engineering-education/spring-docker/)
5. [How to Create Django Docker Images](/engineering-education/django-docker/)
6. [Building A Node.js Application Using Docker](/engineering-education/building-a-nodejs-application-using-docker/)
7. [Debugging a Node.js app running in Docker](/engineering-education/debug-node-docker/)
8. [Containerizing WordPress with Docker-Compose](/engineering-education/docker-wordpress-containerizing-wordpress-with-docker-compose/)

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
