---
layout: engineering-education
status: publish
published: true
url: /fundamentals-of-container-security/
title: Fundamentals of Container Security
description: In this tutorial, you will learn about Containers, and the best practices to follow to make them secure.
author: ck-muithi
date: 2021-06-15T00:00:00-18:00
topics: [Containers, Security]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/fundamentals-of-container-security/hero.jpg
    alt: Contianer security image
---
[Containers](https://www.section.io/modules/edge-containers-as-a-service/) are executable units of an application that are packaged, along with its libraries and dependencies which are required to run an application. Containers make it possible for developers to deploy and maintain applications seamlessly across different environments.
<!--more-->
To grasp the security issues surrounding container technology, we must first understand what containers are and their role in the software development life-cycle.

[Container technology](/engineering-education/topic/containers/) has changed how developers and teams ship, deploy, and maintain code, but this has come with its fair share of security risks.

In this article, we will explore some of the risks faced by containers, how they affect containers and what are the best counter-measures.

### Table of contents
- [Security risks](#security-risks)
- [Container security best practices](#container-security-best-practices)
- [Summary](#summary)

### Prerequisites
In this article, we will presume that you are familiar with container technology. This includes what containers are, and how to deploy and maintain a containers.

### Security risks
#### Risks associated with the host operating system
In the container stack, the operating system is located under the containers. Containers share the same kernel instance but are physically separated.

**Large attack surface** - An attack surface is a set of various angles from which a malicious attacker can exploit the host operating system. There are several utilities and modules in a general-purpose operating system. Any vulnerable service in the operating system provides an avenue to compromise the containers hosted by the said operating system.

**Inadequate user authentication** - If the administrator does not carefully provide correct level authentication for a group of users, a malicious or careless user can affect or subvert the operation of other containers managed by other teams.

**Shared kernel** - Containers provide application-level separation of resources, but containers deployed on bare metal provide an inter-object vulnerable surface if the kernel has known and exploitable vulnerabilities.

#### Image risks
Images are static archive files that are compromised of system libraries, system tools, and other components an application needs to run on a container environment.

A container image is made up of system file layers, that have been created on top of a parent or core image.

A container platform, such as Docker or Windows containers, uses the build command to construct an image from scratch.

#### Image misconfiguration
During configurations, a developer/administrator may assign greater privileges to the wrong type of user, services running in the background such as SSH may offer exploitable network risks.

#### Embedded malware
Malicious files may be placed in images, which are just collections of files bundled together, without the knowledge of the engineering team.

Such malware could be used to exfiltrate data, destroy data, or even encrypt important files. The malware would have the same functionalities as any other image component, allowing it to be exploited in a variety of ways, such as gaining persistent access.

#### Leaking of private keys and tokens
To facilitate secure communication between components, many applications require private keys or tokens. For example, an application may need a secret key to connect to an external service like a user analytic platform.

Other examples of secret keys include SSH authentication keys and service account tokens. Secure Shell Protocol (SSH) is a networking protocol that allows for safe system administration and file transfers over a network.

These private keys can be integrated directly into the image file system when an application is bundled as an image. This method poses a security risk since anyone who has access to the image can access the secret tokens, which in turn leads to unauthorized access.

### Container risks
#### Vulnerabilities within the runtime software
A vulnerable runtime environment exposes all containers it supports, and also the host operating system, to a most likely greater security risk. There should be a regular security vulnerability assessment to determine if there is any component at risk.

#### Unbounded network access from containers
A network that does not offer comprehensive intrusion detection, or that can't monitor to ensure that containers are unable to send traffic across networks may pose a security risk. It is wise to have varying degrees of sensitivity, such as a development environment to external testing.

A network model that has inter-container networking also increases the attack surface. If one container is compromised by an attacker, then the other containers in the same network are also at risk.

### Container security best practices
We've gone through several attack scenarios affecting container protection, but the risk of being breached can still be reduced by doing the following:

1. Using container-specific operating systems - The attack surface is greatly reduced when operating systems designed to host containers are used as opposed to general-purpose operating systems. General-OS have numerous services and components, if one of this service has a security vulnerability the containers and by extension, its host can be compromised.

2. Use of advanced malware analysis tool - With an advanced malware analysis tool, engineers will be able to discover malware embedded in container images before it can cause harm to the organization.

3. Proper storage of secret keys and tokens - Secrets should be kept separate from container images and made available dynamically at runtime as needed. Most orchestrators provide a secret key management feature.

4. Unbounded administrative access - Administrators should use an access management approach in which individuals are only permitted the ability to do certain tasks on the hosts, containers, and images required by their job roles. Such as the development team only having access to containers used in development.

### Summary
In this article, we have gone through what containers are, what are the security risks associated with container technology, and how best to mitigate these risks.

To learn more about container security, be sure to read these articles by our fellow contributors [Docker Security - Best Practices to Secure a Docker Container](/engineering-education/best-practices-to-secure-a-docker-container/) and also [Basics of Linux Container Security](/engineering-education/getting-started-with-linux-container-security/).

I hope you took something beneficial away from it. 

Happy hacking and stay safe.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)