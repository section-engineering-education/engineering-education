---
layout: engineering-education
status: publish
published: true
slug: virtual-machines-vs-containers
title: Advantages and Disadvantages of VMs vs Containers
description: Both Virtual Machines (VMs) and containers are used to increase the productivity of the development lifecycle, but each has their advantages and disadvantages. What are VMs and Containers.
author: jeremy-osborne
date: 2020-07-30T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/virtual-machines-vs-containers/hero.jpg
    alt: container image example
---
Both Virtual Machines (VMs) and containers are used to increase the productivity of the development life cycle. For containers specifically, 451 Research did a [study]([https://451research.com/images/Marketing/press_releases/Application-container-market-will-reach-2-7bn-in-2020_final_graphic.pdf](https://451research.com/images/Marketing/press_releases/Application-container-market-will-reach-2-7bn-in-2020_final_graphic.pdf) ) outlining that containers will be at a $2.7 billion market value in 2020. [Containers](https://www.cio.com/article/2924995/what-are-containers-and-why-do-you-need-them.html) and [VMs](https://en.wikipedia.org/wiki/Virtual_machine) are software instances that differ in size, resources, and use cases. While everyone loves a classic rivalry, VMs and containers don't offer this dichotomy but rather compliment each other. Rather than explaining the history and specific use cases of containers and VMs. I am going to outline their advantages and disadvantages to better help someone find a fit for their purposes.
<!--more-->

### **Advantages of VMs over Containers:**
- Virtual Machines offer more computing resources
    - While containers use the same operating system for every instance. A virtual machine uses the full bandwidth of the operating system. Rather than dividing resources among each instance. This allows for each instance in a virtual machine to have the full armory of the physical resources provided by the hardware. For simplicity, an instance in this context is used to mean a virtual copy of running an operating system.
- Stability and Security
    - In practice, a virtual machine has a longer average lifetime compared to a container. Which provides more productivity due to its ability to complete multiple tasks during the lifetime of the instance. This is because a virtual machine doesn't have to start and restart for each task.
    - A virtual machine is adjacently isolated to its neighboring servers. This provides increased security. For example, if one instance is compromised, it doesn't compromise the other neighboring instances.
- Management and Seniority
    - While containers seem to be the new kids on the block, virtual machines have roots as early as the 1960's with partitioning. This has allowed for the optimization of VMs over containers in the recent past.
    - The development of VMs has allowed for more automation of [load balancing](https://en.wikipedia.org/wiki/Load_balancing_(computing)) and optimized resource allocation compared to container systems. During the infancy of container systems, this heavily influenced the appeal for movement to virtual machines over container systems. However, more recent technologies have emerged to help with asset reallocation, such as Kubernetes.

### **Advantages of Containers over VMs:**
- Lightweight and Portability
    - Containers only use what is needed to run the virtual environment required, this allows containers to be mobile and quick in regards to different instances because they are not weighted by unused computing resources.
- Compartmentalization
    - Containers allow the development process to be localized thus increasing modularity. With increased modularity, any potential crashes or bottlenecks are more easily identified. This helps to quicken the troubleshooting and debugging processes.
- Startup Time
    - Given the lightweight nature of containers, the boot up time for a container is only a fraction of what a VM is. This allows for agile development and distributed applications to be more efficient. This is because of how small the software application size is.
    
### **Disadvantages of VMs**
- Security Issues
    - Snooping is a common problem in virtual machines. This is because of the lack of communication between virtual machines. It is hard to prevent this because, for security reasons, it is better for virtual machines to not communicate with each other. For example, if a server is encrypted, overloaded and has moved physical locations, maintaining the same configurations without communication between virtual instances can cause many security challenges.
- Size
    - Due to the size of the VMs, memory and storage leaves a large footprint which can cost a lot in overhead to maintain such large instances.
    - Startup time is also influenced by the size, compared to seconds for containers, VMs can take several minutes to get going.

### **Disadvantages of Containers**
- Communication Control
    - The same reason that allows VMs to stay secure, can be the downfall of containers. For example, if one container instance becomes compromised, due to the communication between instances, an attacker would be able to access the other containers due to their connection, thus compromising each instance in the kernel.
- Complexity of Orchestration
    - Orchestration efforts and complexity increase with containers. For virtual machines, there can be a single orchestration such as VMware Orchestration in the case for VMware, but for containers, there is a plethora of options to choose from, like Kubernetes, Mesos, Swarm, etc.

### Final Thought
If you are trying to consider which virtual instance is for you, there are two schools of thought to consider. While VMs are a large, bulky, and a secure option, containers provide a mobile, agile, and lightweight appeal. Each has their advantages and disadvantages, before choosing, consider the task at hand, and use this reference to help decide. Happy Hacking!
