---
layout: engineering-education
status: publish
published: true
url: /engineering-education/what-is-jenkins/
title: What is Jenkins
description: Developers use Jenkins to continuously build and test software projects, making it easier to integrate changes to the project and making it easier for users to obtain a good build with no errors and bugs.
author: judy-nduati
date: 2020-09-17T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-jenkins/hero.jpg
    alt: Jenkins Continuous Integration tool
---
Continuous Integration (CI) is a software development practice where developers integrate code into a shared repository frequently during [development](https://www.martinfowler.com/articles/continuousIntegration.html). Jenkins is a Continuous Integration (CI) tool and an open-source tool written in Java.
<!--more-->
Jenkins achieves Continuous Integration with the help of multiple plugins. Developers mostly use Jenkins for Continuous Integration because of its flexibility and the number of plugins it supports. The most commonly used Jenkins plugins are [Maven](https://plugins.jenkins.io/maven-plugin/), [GitHub](https://plugins.jenkins.io/github/), [Kubernetes](https://plugins.jenkins.io/kubernetes/), [Performance Plugin](https://plugins.jenkins.io/performance/), and [Job DSL plugin](https://plugins.jenkins.io/job-dsl/).

### What is Jenkins?
Developers use Jenkins to continuously build and test software projects, making it easier to integrate changes to the project, and making it easier for users to obtain a good build with no errors and bugs. Jenkins allows developers to continuously deliver a software project by integrating with many of development, deployment, and testing technologies such as JMeter, Selenium, and Taurus.

### What is Continuous Integration?
CI is a development practice whereby developers are required to commit changes to the source code in a shared repository more frequently. CI says developers must integrate code early and often, so every time changes are pushed to the repository (such as GitHub), the project code should be checked into, compiled, and tested. Continuous Integration has improved the productivity of developers, this is because the code is built and tested automatically. Confirming to the developer that the code is working well, thus enabling the developer to concentrate on [providing value to the customer](https://rollout.io/blog/continuous-delivery-can-elevate-developer-productivity/#:~:text=Enter%20continuous%20delivery.,worrying%20that%20you%20broke%20something.).

CI allows developers to encounter fewer conflicts while interacting with code. This is because once the code is merged continuously, there are less chances of breaking [what already exists](https://medium.com/the-making-of-whereby/why-continuous-integration-is-so-important-7bb63ba5dc57).

CI improves project predictability because code problems such as bugs and errors are [caught and solved earlier](https://www.researchgate.net/publication/266632251_Experienced_Benefits_of_Continuous_Integration_in_Industry_Software_Product_Development_A_Case_Study/link/54bc05a90cf253b50e2d149b/download).
Continuous Integration allows development teams to get fast feedback about changes made on a specific project, this is an easier way of solving problems when they are found because the code is still fresh in the developer's mind. It also automates the process of compiling, testing, and reporting the project source code.

When a developer push changes into a repository, the CI server gets notified about the changes. The CI server either pulls the repository after a few minutes to see if there are any changes or the repository actively calls the CI server to let it know when there are changes. It then clones the repository and builds the project.

If the project fails, the CI server notifies the team. The continuous integration server finally generates various reports, such as the line coverage of the project test or style issues found on the [project code](https://www.edureka.co/blog/what-is-jenkins/).

### Why Continuous Integration is Needed
- Using CI, developers tend to experience fewer conflicts when integrating code, this is because when code gets merged, it does not easily break. Even if it breaks, the problem is easily resolved.
- A developer may forget to run the project code before checking the changes, a CI server will not, and the problem would be caught early on and resolved quickly.
- CI supports automation through the process of building or compiling, testing, and reporting to the development team.
- CI allows continuous delivery to [take place](https://medium.com/the-making-of-whereby/why-continuous-integration-is-so-important-7bb63ba5dc57).
- Using CI locating and fixing bugs becomes very easy because developers do not have to wait too long to get the test results.
- Developers are notified continuously about the build status, test results, and how the application is doing.

### Problems Developers Faced before Continuous Integration
Earlier before Continuous Integration was introduced, a team of developers (working from different locations) would individually implement a few classes, methods, and functions. They would write code and run tests to ensure that the classes, methods, and functions work properly. Then assume the software project would build and run smoothly because the classes, methods, and functions all tested well.

They would then integrate the programs and combine them to create a larger program, but suddenly everything would break. There would be issues with integration, the code failed to compile, all sorts of bugs would arise, and things would stop working out. This was also called [integration hell](https://www.solutionsiq.com/agile-glossary/integration-hell/#:~:text=Integration%20Hell%20refers%20to%20the,that%20it%20can%20finally%20integrate.).

Integration hell is a major problem to software projects and it is a risk to their success. Seeing as it was hard to estimate how long it would take to fix the things that went wrong. Developers had to figure out what went wrong first, and that could be very hard to do in a large project. After diagnosing the problems, again, time had to be spent fixing them, the project budget could also increase due to this, and the project's success would be compromised. The solution to integration hell was continuous integration, a development practice that enabled code to be merged safely, continuously, and a solution that would [detects problems instantly](https://youteam.io/blog/8-tools-you-need-to-work-with-remote-developers/).

### Continuous Integration with Jenkins
Jenkins achieves Continuous Integration with the help of plugins. It has over a thousand plugins that integrate with every tool in the CI and CD (continuous delivery) toolchain.
These are the most common Jenkins plugins,
- [Job DSL (Domain Specific Language) Plugin](https://github.com/jenkinsci/job-dsl-plugin)
It enables developers to automate Jenkins Installations and use Groovy to define jobs.
- [GitHub](https://github.com/timols/jenkins-gitlab-merge-request-builder-plugin)
It allows developers to automate a code review and merge code.
- [Build Pipeline Plugin](https://github.com/jenkinsci/build-pipeline-plugin)
It enables the creation of chain connected jobs helping project managers get a clearer picture of all stages in the project.
- [Performance Plugin](https://wiki.jenkins.io/display/JENKINS/Performance+Plugin)
Allows developers to view the project's performance using graphs and charts.
- [Maven](https://github.com/jenkinsci/maven-plugin)
It helps with monitoring.
- [Kubernetes](https://github.com/jenkinsci/kubernetes-plugin)
It enables developers to automate the process of running Jenkins agents.


The use of Jenkins has helped developers get feedback faster after the code is integrated, this is useful because if code (and when the code) breaks, the developers can know what the issue was and how it will be resolved.

### Features of Jenkins
 - Easy Configuration

 Setting up Jenkins is easy, and the web interface makes it is easy for developers to check for any errors. Also, they get great built-in help.

 - Easy Installation

 Jenkins is a self-contained Java program. It allows developers to run on the most popular operating systems such as Windows, Mac OS, and Linux.

 - Plugins

 Plugins are tools that make Jenkins more powerful for developers and continuous integration teams. Plugins allow Jenkins to integrate with development, testing, and deployment tools.

 - Extensibility

 Jenkins is extensible, developers can configure them to fit with their environment in almost endless different ways. The extensibility can be continued with Jenkin's new releases, thus ensuring teams have the latest version of Jenkins.

 - Distributed

 Jenkins efficiently distributes work across multiple machines, helping with faster builds, tests, and deployments across multiple platforms.

### Conclusion
In conclusion, CI is vital for software development. Continuous Integration has impacted and benefited developers in massive ways, such as experiencing fewer conflicts during code integration, detecting problems easily, and increasing developer's productivity. This is because programs can be built and tested automatically and continuously. Jenkins is a tool that enables developers to achieve Continuous Integration with the help of plugins that add more value to CI.

---
Peer Review Contributions by: [Sophia Raji](/engineering-education/authors/sophia-raji/)
