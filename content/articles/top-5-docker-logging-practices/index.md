---
layout: engineering-education
status: publish
published: true
url: /top-5-docker-logging-practices/
title: Top 5 Docker Logging Practices
description: In this article, we will learn about the Docker logging approaches, Docker logging challenges, and finally the pros and cons for the different logging methods.
author: bashiir-isla
date: 2021-06-30T00:00:00-02:00
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/top-5-docker-logging-practices/hero.png
    alt: Docker logging Hero Image
---
Logging is a critical part of the application development process. It lets you know what happened to your application when things go wrong. But logging in today's world of containerized apps is not the same as logging in traditional applications.
<!--more-->
Effective logging of containerized apps such as Docker involves logging the application, the host OS, and the Docker service. A clever application of various logging approaches and techniques will see your Dockerized apps logged effectively. 

In this article, we will explain what Docker logging is, highlight the challenges facing Docker logging, and have a look at the top five Docker logging practices.

### What is Docker logging?
With logs, you are informed of what happened or what is happening at every stack layer. Logs have the answers to the networking, infrastructure, application as well as storage layers.

As a routine, production applications register their issues and events during runtime. Traditionally, such information was written to a log file. But this inherited several problems, especially when trying to analyze the registers. The scenario becomes more complicated if your application has multiple instances running.

Docker introduced the concept of [logging drivers](https://docs.docker.com/config/containers/logging/configure) to solve such problems. Docker engine controls the output interfaces managing the application messages.

Further, Docker implemented the [Fluentd logging driver](https://docs.docker.com/config/containers/logging/fluentd/). Fluentd provides a structured and unified logging system.

### Docker logging challenges
Docker logging has its own share of challenges. The disposable and transient nature of Docker containers means you risk losing all the logs or data generated during the existence of that Docker container when the container shuts down. While this is arguably not a big issue and happens by default, a Docker container may shut down unexpectedly.

When this happens, you need to find out what went wrong with your containers. But it is not usually an easy task to deal with complex Docker environments with multiple containers running in large clusters.

You need to map the log events with their respective containers or applications. This is highly challenging, and that is why you need to master the best practices to logging your Docker container.

### Docker logging methods and best practices

#### Logging directly from your application
In this Docker logging method, applications inside containers handle their logging using a logging framework. A good example is the Java app that uses [Log4j2](https://logging.apache.org/log4j/2.x/), skipping the OS and Docker by sending the logs from the application to a remote centralized server.

With this solution, developers get the most control over the logging event. But this also creates an extra load on the application process. Containers are transient in nature. That means you need to ensure the logging framework is not limited to not only the container itself.

Otherwise, logs stored in the container's file system are lost if the container is shut down or terminated.

**Pros**
- Easy to master if you are familiar with logging frameworks.
- The independence of applications from containers and the host is a plus.

**Cons**
- You may have to forward the logs to remote storage or configure a persistent data volume to prevent data loss.

#### Logging using data volumes
The transient nature of containers dictates that you store log events in a [data volume](https://docs.docker.com/storage/volumes/) or forward the log events to a centralized logging service.

This ensures you have access to files inside the container even when the container shuts down. A data volume refers to a marked directory inside a container that holds commonly shared or persistent data. Even when the container shuts down, the chance of you losing your logs or data is minimal.

**Pros**
- A perfect solution when you need to centralize and store logs over a long-period.
- It allows sharing of a single data volume with multiple containers.

**Cons**
- You risk losing log data when moving containers to different hosts.

#### Docker logging driver
Docker provides [logging drivers](https://docs.docker.com/config/containers/logging/configure/) that you can use in your logging strategy. These drivers are configured to read data broadcast by the container's `stderr` or `stdout` streams.

The data is then written to a file on the host machine. The host machine holds log files by default but you can use the available drivers such as [awslogs](https://docs.amazonaws.cn/en_us/AmazonECS/latest/userguide/using_awslogs.html), [Splunk](https://www.splunk.com/), and [fluentd](https://www.fluentd.org/) to forward these events.

In the case that you are forwarding your log files over a Transmission Control Protocol (TCP) and then the connection becomes unreachable or fails, then the containers will shut down. It is essential to use [JSON-file](https://docs.docker.com/config/containers/logging/json-file/) driver when you are dealing with the `docker log` command. Otherwise, things will not work out.

**Pros**
- It centralizes logs to a single location.
- Native to Docker.

**Cons**
- Containers depend on the host machine for this approach to work.

#### Logging using the Sidecar approach
The Sidecar method is a great way to manage your microservices architectures. Sidecars run alongside the parent application, they share the same volume and network allowing you to extend your application functionalities.

This means that you do not need to install additional configurations to experience additional multiple capabilities from your primary application.

This approach uses logging containers to log your Docker environment. Each application container has a dedicated container to allow you to customize the logging solution for each app. The primary container saves log files to a volume. The logging container then tags and ships these files to third-party log management solutions.

**Pros**
- Handles logging automatically and thus easy to maintain.
- Allows full customization of each application's solution.

**Cons**
- Challenging to set up.
- Consumes more resources compared to the dedicated logging approach.
- You must treat both the logging container and the application as single units.

#### Dedicated logging container solution
Another method to log your Docker is to dedicate a container purely to collect logs. This method does not depend on a host machine. The dedicated logging container helps in managing log files within the Docker environment.

It also aggregates logs from other containers automatically and monitors, analyzes, and stores or forwards the files to a central location. Besides, it allows you to collect logs through streams of Docker API data, stats, and log events.

**Pros**
- Scaling is straightforward. You deploy more logging containers when the need arises.
- Dependencies on the host machine are eliminated.

**Cons**
- You need to define the logging container and the application container clearly.

### Conclusion
There are many approaches to logging your Docker containers. Each of them has its own strengths and weaknesses so there is no clearly defined solution to logging and managing your Docker logs.

However, I hope this guide has clarified the different options you have and enable you to make the most best choice for your use case to log your docker containers.

### Further reading
[Managing and Running Docker Containers](/engineering-education/running-and-managing-docker/)

[A Brief History of Container Technology](/engineering-education/history-of-container-technology/)

[Top 7 Docker Monitoring Tools](/engineering-education/top-7-docker-container-monitoring-tools/)

---
Peer Review Contributions by: [Ahmad Mardeni](/engineering-education/authors/ahmad-mardeni/)
