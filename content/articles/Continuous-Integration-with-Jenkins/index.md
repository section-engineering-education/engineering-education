---
layout: engineering-education
status: publish
published: true
url: /continuous-integration-with-jenkins/
title: Continuous Integration with Jenkins
description: This tutorial will help you understand Jenkins. This continuous integration tool helps in the management of software projects.
author: ruth-wambui
date: 2021-09-10T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/continuous-integration-with-jenkins/hero.jpg
    alt: Continuous Integration with Jenkins Hero Image
---
Today, software developers collaborate on different projects. For instance, they can contribute code to create specific frameworks.
<!--more-->
This process requires a version control system (VCS) where different developers can get code from other developers using pull requests, send their changes to other developers using push requests, and combine different code bases from different contributors using merge requests. 

We can automate this process using continuous integration. Tools such as Jenkins can be used for continuous integration. 

This article will focus on Jenkins as a tool for continuous integration. It is a popular open-source tool for automating different build processes. 

These processes are predefined and can be triggered by different processes, including time intervals and user actions.

### Understanding Jenkins and its role in the integration
Jenkins is open-source automation software that is used in continuous integration. It's written in Java using plugins that support the process of integration and delivery. This helps build and test software projects. 

Jenkins plays an important role by helping developers integrate changes to projects that in turn enables users to access new updates. 

Jenkins is compatible with a number of testing and deployment technologies thereby allowing continuous delivery. It facilitates continuous integration by supporting different languages, source code repositories using pipelines, and automation of other routine tasks.

Jenkins continuously tests projects during software development, detects, and reports any errors. This is done by performing a software build, and execution of a shell script. 

Jenkins, therefore, facilitates integration by conducting repository checks, preparing builds, deploying built-in test servers, generating feedback, and verifying source code repository changes.

### Basic setup of Jenkins
Before downloading and setting up Jenkins, users should check for certain prerequisites. This includes enough memory in the hard drive, and at least 1GB and 256MB RAM. 

You also need the latest version of Java usually Java Development Kit or Java Runtime Environment [JRE](https://www.ibm.com/cloud/learn/jre) installed.

Individuals must also download the latest version of Jenkins and install it using the setup wizard. 

After successful installation, a configuration is done to unblock Jenkins by entering the administrator password. Jenkins is then customized to the user's environment by installing all the essential [plugins](https://etc.usf.edu/techease/win/internet/what-is-a-plugin-how-do-i-install-it/) that create Jenkins jobs.

### What are pipelines, and how are they used with Jenkins?
In Jenkins, a [pipeline](https://www.jenkins.io/doc/book/pipeline/) is a collection of events and jobs interlinked with each other in a sequence. 

They are a combination of plugins that support the integration and implementation of continuous delivery in Jenkins. The pipeline has extensible automation servers that create code via Domain-Specific Languages [DSL](https://en.wikipedia.org/wiki/Domain-specific_language#Overview). 

Jenkin pipelines allow many users to access them. The system is robust and resumes automatically in case of restarts.

Pipelines are developed in two ways, namely, Scripted and [Declarative pipelines](https://www.jenkins.io/doc/book/pipeline/syntax/). 

A [scripted pipeline](https://www.jenkins.io/doc/book/pipeline/#scripted-pipeline-fundamentals) is based on a [Groovy Script](https://www.jenkins.io/doc/book/managing/script-console/#ji-toolbar) since they are Domain Specific languages. 

Declarative pipeline provides simple syntax to define a pipeline without a groovy script. 

Pipelines are written in a Jenkins file, making them durable, extensible, and easier to code. Jenkins pipelines involve the use of nodes that are machines capable of executing a pipeline.

A node can also be regarded as a stage block that defines distinct tasks to be performed in the entire pipeline.

### Benefits of Jenkins over other continuous integration tools
Jenkins is open-source and free to use. Users can download Jenkins with the source code online for free. They can also access the newest releases for their use. 

This ensures that better and more updated versions are available to developers.

By supporting a wide range of plugins such as [Jenkins Maven](https://plugins.jenkins.io/maven-plugin/), [Global Build Stats](https://plugins.jenkins.io/global-build-stats/), [Job Generator](https://plugins.jenkins.io/jobgenerator/), and Multiple SCMs, Jenkins grants developers added features and control over the inbuilt Jenkins feature. 

Such plugins help developers integrate Jenkins into their custom workplace for IT projects.

As a continuous integration tool, Jenkins is easy to use with updated documentation and support for all major operating systems. Users with basic IT skills can easily utilize the software. 

In addition, Jenkins is distributed using a quality Application Programming Interface [API](https://www.club-oracle.com/threads/apis-what-is-api.16190/) suite that enables the user to customize the amount of accessible data.

Due to its flexibility, Jenkins supports projects of various sizes and complexities. Furthermore, it does not limit the number of connected servers. Therefore, many teams can engage in continuous delivery without challenges.

Another benefit of Jenkins is that it has a huge developer community. This facilitates faster releases, bug fixes, and creative interactions

Jenkins also allows Source Code Management [SCM](https://www.atlassian.com/git/tutorials/source-code-management#:~:text=Source%20code%20management%20%28SCM%29%20is%20used%20to%20track,contributors.%20SCM%20is%20also%20synonymous%20with%20Version%20control) which supports different source code repositories. This enables developers to set different triggers after code changes in languages such as Java and Python.

### Shortcomings of using Jenkins as a continuous integration tool
One of the biggest disadvantages of Jenkins is the presence of many plugins. Some of these plugins do not provide optimal functionality. Some of the areas where plugins are required seem too basic. 

The second disadvantage relates to the way Jenkins is designed. It does not support the latest technologies such as Docker. 

Jenkins lacks enough collaborative features. It does not allow developers to see the commits done by other team members. It is, therefore, challenging to track the project's progress. 

Jenkins does not provide enough analytics on the end-to-end deployment cycle, which in turn hinders the overall tracking of the process. Additional personnel are required to manage the server. This, in turn, increases operational costs.

Happy learning!

### Further reading
- [Top 5 benefits of Jenkins pipeline](https://staragile.com/blog/what-is-jenkins-pipeline)
- [Jenkins: pros and cons.](https://ezeelive.com/jenkins-pros-cons/)
- [Advantages of Jenkins](https://apiumhub.com/tech-blog-barcelona/advantages-of-jenkins/)
- [Jenkins for continuous integration](https://www.dotnettricks.com/learn/devops/what-is-jenkins-jenkins-for-continuous-integration)
- [Setting up Jenkins](https://saucelabs.com/blog/a-getting-started-guide-to-setting-up-jenkins#:~:text=%20The%20basics%20of%20setting%20up%20a%20Jenkins,port%20for%20JNLP%20slave%20agents%20to...%20More%20)


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)