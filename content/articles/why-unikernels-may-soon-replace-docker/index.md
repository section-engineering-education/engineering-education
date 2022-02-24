---
layout: engineering-education
status: publish
published: true
url: /why-unikernels-may-soon-replace-docker/
title: Why Unikernels May Soon Replace Docker
description: This article will cover how containers are facing competition from unikernels. It will provide an overview of unikernels and explain the specific reasons why they may replace containers.  
author: lilian-ogoti
date: 2021-07-09T00:00:00-09:35
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-unikernels-may-soon-replace-docker/hero.jpg
    alt: unikernels example image
---
As cloud-based technology grows, a new competitor to containerization has emerged. As a result, [unikernels](http://unikernel.org/) seems a great candidate to replace the container-based infrastructure. The fact remains that containers have positively evolved the cloud technology world, but they are not yet what [DevOps](https://azure.microsoft.com/en-us/overview/what-is-devops/#culture) requires.  
<!--more-->
This article provides an overview of unikernels and explains why they may soon replace containers. 

### An overview of Unikernels
Unikernels are a new software infrastructure paradigm concerned to realize the DevOps dreams. They provide specialized, single-address space machine images.

A unikernel consists of the following components:
- System libraries.
- Language runtime.
- Necessary applications.

These components are built together to form one bootable [Virtual Machine](https://www.vmware.com/topics/glossary/content/virtual-machine) (VM) image that can execute on a [hypervisor](https://www.vmware.com/topics/glossary/content/hypervisor).

### Comparison between Containers and Unikernels
The critical aspect of comparing the two is that containers still differentiate between operators responsible for managing the applications and the developers who code the application.

In contrast, unikernels strive to meet the DevOps requirements by doing away with the above barrier and ensuring that the development team bundles everything needed into the deployment unit.

Furthermore, deploying unikernel applications requires rebuilding the Virtual Machine again using configuration tools such as [Terraform](https://www.terraform.io/intro/index.html) and [Jenkins](https://www.jenkins.io/doc/book/).

### Reasons why Unikernels may replace containers
#### Unikernels avoid vendor-lock-ins
The main advantage of using unikernels in the organization's infrastructure is that they add agility and avoid vendor lock-in. A unikernel is a Virtual Machine at its core; it also supports multiple cloud providers and platform-independent.

Furthermore, the basic unikernel unit of computing is a Virtual Machine, which means that it is easy to shuffle between different cloud platforms. 

Unikernels adopts the [serverless](https://www.redhat.com/en/topics/cloud-native-apps/what-is-serverless) approach. Of course, the term serverless does not mean there is no server, but most of the time, it needs minimal support and oversight by the operations team.

#### Containers are still too complex
Although containers have solved many problems in the DevOps space, containers as paradigms were not what DevOps would want the future to be.

The complexity involved when operating containers is often very time-consuming for the teams. Also, the teams often find out that the tools are not as perfect as expected and often cause issues in production.

Operating containers may require the whole operations team to assist in managing and deploying a Kubernetes-based application. On the other hand, to deploy a unikernel to [Google Cloud](https://cloud.google.com/) nowadays via Ops is a matter of few commands, and it will be up and running within minutes.

#### Virtualization
The cloud technology came from virtualization, not containers. Unikernels are [cloud-native](https://www.infoworld.com/article/3281046/what-is-cloud-native-the-modern-way-to-develop-software.html). As mentioned earlier, a Virtual Machine is the base unit of the cloud. Cloud providers now utilize hardware like [ASICs](https://www.sciencedirect.com/topics/engineering/application-specific-integrated-circuits) and [FPGAs](https://learn.sparkfun.com/tutorials/how-does-an-fpga-work/all) to improve the network speeds, minimize disk access times, and then expose them to the Virtual Machine layer.

Cloud architecture may adopt unikernels as they are deployed as Virtual Machines. They also do away with much of the [legacy](https://www.talend.com/resources/what-is-legacy-system) that is not needed.

#### Unikernels enforce DevOps
With unikernels, the developer has to combine everything they need into their deployment unit. To deploy an application, the entire Virtual Machine gets rebuilt and takes less space and time. To ascertain how much memory the application is using is easy as the developer can build their observability and configure logs to the appropriate service.

The developer is not concerned about [ssh](https://searchsecurity.techtarget.com/definition/Secure-Shell), usernames and passwords, text editor, or [shell](https://linuxcommand.org/lc3_writing_shell_scripts.php). Therefore, they can only experiment with their application and fix the issue locally without shifting the responsibility to Ops.

#### Unikernels avoid the complexity of Kubernetes
Containers and their application, [Kubernetes](https://kubernetes.io/), have many problems, which is why they may not be around forever. 

Containers have a possibility of losing the organization's databases. However, it is unlikely to happen with unikernels since one can pause, stop, restart and even live migrate databases with ease. Also, there is no need to use third-party software to do any of the above tasks since they are regarded as plain Virtual Machines.

Kubernetes face serious performance issues, and for this reason, most organizations are considering de-containerization.

#### Unikernels are secure
One of the most significant advantages of unikernels is when it comes to security, compared to containers. In addition, the architecture has many features that either prevent or disable specific attacks altogether.

Below are some of the security features of unikernels:
- **No shell access** - Most remote code execution attacks the shell to alter the system they are attacking. However, since unikernels do not have a shell, the attacker does not have this chance.

- **No Syscalls** - On Linux-based systems, [system calls](https://www.geeksforgeeks.org/introduction-of-system-call) are often used to call the Operating System (OS) and attack computer systems. Unikernels do not have the OS, and therefore there are no system calls. They only operate on [function calls](https://docs.microsoft.com/en-us/cpp/c-language/function-calls). The hackers will have to understand the exact memory layout of the application to call the operating system.

- **No access to Ring 0** - Unikernels execute in [kernel space](https://www.sciencedirect.com/topics/computer-science/kernel-address-space) with root privileges. The reason for unikernels to execute in kernel space is that they manage [page tables](https://www.geeksforgeeks.org/page-table-entries-in-page-table/) and virtual hardware.
A hypervisor sets up the Virtual Machine before it is loaded and makes [para-virtualized](https://www.sciencedirect.com/topics/computer-science/paravirtualization) interfaces to the hardware, making access to [ring 0](https://www.futurelearn.com/info/courses/computer-systems/0/steps/53514) unnecessary.

### Conclusion

In my opinion, Containers will fade at the end. This is because the technological paradigms constantly shift as the industry grows. 

Unikernels can be the next generation of cloud infrastructure because of their size, security, and performance. These features have led them to megatrends like microservices and serverless technology while combating data breaches, crypto-jacking, and other problems.

Happy Learning!

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)