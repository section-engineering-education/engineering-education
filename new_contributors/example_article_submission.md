## Example Article Submission

title: A Brief History of Container Technology

description: A brief history of container technology and how it has fundamentally altered the development of software today.


### The Beginning
Container technology is a method of packaging an application so it can be run with isolated dependencies, and they have fundamentally altered the development of software today due to their compartmentalization of a computer system. Yet, where did this technology come from, and what is the history of container tech?

Container technology was born in 1979 with [Unix version 7](https://en.wikipedia.org/wiki/Version_7_Unix) and the [chroot system](https://en.wikipedia.org/wiki/Chroot). The chroot system isolates a process by restricting an application’s access to a specific directory, where this directory comprised of a root and child directories. This system was the first glimpse of an isolated process, and it was soon adopted and added into [BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution) OS in 1982; however, container technology would unfortunately not progress over the next two decades and remain dormant.

### The Adolescent Years
Container technology finally picked up steam in the 2000s with the introduction of [Free BSD Jails](https://www.freebsd.org/about.html). “Jails” are partitions of a computer, where there could be multiple jails/partitions on the same system. This jail system was further refined in 2001 with [Linux VServer](http://www.linux-vserver.org/Welcome_to_Linux-VServer.org) with the partitioning of resources, which was later linked to the linux kernel with [OpenVZ](https://openvz.org/) in 2005, and jails were combined with boundary separation to create in [Solaris Containers](https://en.wikipedia.org/wiki/Solaris_Containers) in 2004. After jails, container tech further progressed with the introduction of control groups in 2006.

[Control Groups](https://en.wikipedia.org/wiki/Cgroups) or cgroups were implemented for accounting and isolating the usage of resources like the CPU and memory. They were soon used and built upon in [LXC (linuX Containers)](https://linuxcontainers.org/lxc/introduction/) in 2008, and this was the most complete and stable version of container technology at the time, as it worked on the Linux kernel without any patches. Due to LXC’s reliability and stability, many other technologies built on LXC, the first of which to be [Warden](https://www.altoros.com/blog/cloud-foundry-containers-warden-docker-and-garden/) in 2011 and more importantly [Docker](https://www.docker.com/) in 2013.

### The Golden Age
Even though container technology had remarkable improvements from 2000-2011, the introduction of Docker changed everything and single-handedly led to a Renaissance in container technology. Docker built its foundation on two systems, LXC and libcontainers. Libcontainers came from [LMCTFY](https://github.com/google/lmctfy), which was an open source container stack where applications created and managed their own subcontainers. In addition to building on previous software, Docker had an easy to use GUI and was capable of having multiple applications with different OS requirements run on a single OS. Due to these phenomenal qualities, Docker blew up, leading to 100 million downloads within a year, and after Docker’s success, another technology, [rkt](https://coreos.com/rkt/) (pronounced Rocket), tried to fix some of Docker’s problems by incorporating more rigorous security and production requirements.

The impact and popularity of both these technologies grew as they both interacted with [Cloud Native Computing Foundation](https://www.cncf.io/), a global hub of developers, foundations, and vendors. This spurred community involvement and collaboration, which continued to grow after Microsoft allowed Linux containers (which included rkt and Docker) to be natively run on Windows computers in 2016. Previously, containers were mostly linux based technology, but this decision lead to Microsoft becoming a major influence in container technology, seen by both [Process and Hyper-V containers](https://docs.microsoft.com/en-us/virtualization/windowscontainers/manage-containers/hyperv-container) on Windows computers.

Container technology’s momentum continued in 2017 through the introduction of the Kubernetes, which was a highly effective container orchestration technology. After Kubernetes’ inclusion into cloud providers like CNCF and its support from Docker, it became the industry standard, and the combination of [Kubernetes](https://kubernetes.io/docs/concepts/overview/what-is-kubernetes/) and other container tools, such as [Flannel](https://coreos.com/flannel/docs/latest/), lead to further improvements in container technology. In 2019 one still sees the Golden age of container technology, and it continues to reach the masses through [Containerd](https://containerd.io/), [Containership](https://containership.io/), and many other pro-container figures and websites, leading to continual popularity and progression in the container technology industry.

Other subject matter samples:
- https://www.section.io/blog/prometheus-querying/
- https://www.section.io/blog/debug-headers-best-practices/
- https://www.section.io/blog/real-user-monitoring-performance-optimization/
- https://www.section.io/blog/varnish-cache-503-error-guru-meditation/
