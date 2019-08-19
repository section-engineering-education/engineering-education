---
layout: engineering-education
status: publish
published: true
title: A Brief History of Container Technology
description: A brief history of container technology and how it has fundamentally altered the development of software today.
author: Bora Basyildiz
date: 2019-08-19T00:00:00-07:00
topics: [containers]
excerpt_separator: <!--more-->
images:

  - url: /assets/images/education/container-technology-history.jpg
    alt: container technology history
---
### The Beginning
Container technology is a method of packaging an application so it can be run with isolated dependencies, and they have fundamentally altered the development of software today due to their compartmentalization of a computer system. Yet, where did this technology come from, and what is the history of container tech?

<!--more-->
Container technology was born in 1979 with Unix version 7 and the chroot system. The chroot system isolates a process by restricting an application’s access to a specific directory, where this directory comprised of a root and child directories. This system was the first glimpse of an isolated process, and it was soon adopted and added into BSD OS in 1982; however, container technology would unfortunately not progress over the next two decades and remain dormant.

### The Adolescent Years
Container technology finally picked up steam in the 2000s with the introduction of Free BSD Jails. “Jails” are partitions of a computer, where there could be multiple jails/partitions on the same system. This jail system was further refined in 2001 with Linux VServer with the partitioning of resources, which was later linked to the linux kernel with OpenVZ in 2005, and jails were combined with boundary separation to create in Solaris Containers in 2004. After jails, container tech further progressed with the introduction of control groups in 2006.

Control Groups or cgroups were implemented for accounting and isolating the usage of resources like the CPU and memory. They were soon used and built upon in LXC (linuX Containers) in 2008, and this was the most complete and stable version of container technology at the time, as it worked on the Linux kernel without any patches. Due to LXC’s reliability and stability, many other technologies built on LXC, the first of which to be Warden in 2011 and more importantly Docker in 2013.

### The Golden Age
Even though container technology had remarkable improvements from 2000-2011, the introduction of Docker changed everything and single-handedly led to a Renaissance in container technology. Docker built its foundation on two systems, LXC and libcontainers. Libcontainers came from LMCTFY, which was an open source container stack where applications created and managed their own subcontainers. In addition to building on previous software, Docker had an easy to use GUI and was capable of having multiple applications with different OS requirements run on a single OS. Due to these phenomenal qualities, Docker blew up, leading to 100 million downloads within a year, and after Docker’s success, another technology, rkt (pronounced Rocket), tried to fix some of Docker’s problems by incorporating more rigorous security and production requirements.

The impact and popularity of both these technologies grew as they both interacted with Cloud Native Computing Foundation, a global hub of developers, foundations, and vendors. This spurred community involvement and collaboration, which continued to grow after Microsoft allowed Linux containers (which included rkt and Docker) to be natively run on Windows computers in 2016. Previously, containers were mostly linux based technology, but this decision lead to Microsoft becoming a major influence in container technology, seen by both Process and Hyper-V containers on Windows computers.

Container technology’s momentum continued in 2017 through the introduction of the Kubernetes, which was a highly effective container orchestration technology. After Kubernetes’ inclusion into cloud providers like CNCF and its support from Docker, it became the industry standard, and the combination of Kubernetes and other container tools, such as Flannel, lead to further improvements in container technology. In 2019 one still sees the Golden age of container technology, and it continues to reach the masses through Containerd, Containership, and many other pro-container figures and websites, leading to continual popularity and progression in the container technology industry.
