## Fundamentals of container security

### Introduction

To grasp the security issues surrounding container technology, we must first understand what containers are and their role in the software development life-cycle.

Containers are executable units of application that are packaged, along with their libraries and any dependencies required to run the application. Containers make it possible for developers to deploy and maintain applications seamlessly across different environments.

Container technology has changed how developers and teams ship, deploy and maintain code, but this has come with its fair share of security risks. In this article, we will explore some of the risks, how they affect containers and how best counter-measures.


### Security Risks

#### Risks associated with the host operating system

In the container stack, the operating system is located under the containers. Containers share the same kernel instance but are physically separated from one another.

**large attack surface**- An attack surface is a set of various angles from which a malicious attacker can exploit the host operating system. There are several utilities and modules in a general-purpose operating system. Any vulnerable service is the operating system provides an avenue to compromise the containers hosted by the said operating system.

**Inadequate user  authentication**- If the administrator does not carefully provide correct level authentication for a group of users, a malicious or careless user can affect or subvert the operation of other containers managed by other teams.

**shared kernel**- Containers provide application-level separation of resources, but containers deployed on bare metal provide an inter-object vulnerable surface if the kernel has known and exploitable vulnerabilities.

#### Image Risks

Images are static archive files that include components used to run a given application.

**Image misconfiguration**
During configurations, a developer/administrator may assign greater privileges to the wrong type of user, services running in the background such as SSH may offer exploitable network risks.

**Embedded malware**
Just as we had described images are just collections of files packaged together, malicious files could be included without the knowledge of the engineering team. Such malware could be used to exfiltrate data, destroy data or even encrypt important files. The malware would have the same capabilities as any other component within the image and thus could be used to gain persistent access.

**Leaking of private keys and tokens**
Many applications require private keys or tokens to enable secure communication between components. For example, an application may need a secret key to connect to an external service like a user analytic platform. Other examples of secrets keys include SSH authentication keys and service account tokens. When an application is packaged into an image, these secrets can be embedded directly into the image file system this practice creates a security risk because anyone with access to the image can easily access the secret tokens.

### Container Risks

**Vulnerabilities within the runtime software**
A vulnerable runtime exposes all containers it supports, and also the host operating system, to potentially greater security risk. There should be a regular security vulnerability assessment to determine if there is any component at risk.

**Unbounded network access from containers**
A network that does not offer comprehensive intrusion detection that can monitor and ensure containers are not able to send traffic across networks of different sensitivity levels, such as development to external testing.

A network model that has inter-container networking also increases the attack surface, in that if one container is compromised by an attacker the other containers in the same network are also at risk.

### Container security best practices

We've gone through several attack scenarios affecting container protection, but the risk of being breached can still be reduced by doing the following:

1. Using container-specific operating systems- The attack surface is greatly reduced when operating systems designed to host containers are used as opposed to general-purpose operating systems. General-OS have many services and components, if one of this service has a security vulnerability the containers it is hosting can be compromised.

2. Use of advanced malware analysis tool -With an advanced malware analysis tool, the engineers will be able to discover malware embedded in container images before it can cause harm to the organization.

3. Proper storage of secret keys and tokens- Secrets should be stored outside of container images and provided dynamically at runtime as needed. Most orchestrators provide a secret key management feature.

4. Unbounded administrative access- Administrators should use an access management model in which users are only granted the ability to perform the specific task on the specific hosts, containers, and images their job roles require i.e the development team will only have access to containers used in development only.

### Summary

In this article, we have gone through what containers are, what are the security risks associated with the container technology, and how best to mitigate these risks.

I hope you have learned something useful from it. Happy hacking and stay safe.
