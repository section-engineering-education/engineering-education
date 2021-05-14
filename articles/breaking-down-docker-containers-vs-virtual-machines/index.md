Containers(/engineering-education/history-of-container-technology/) and virtual machines (VMs) help maximize the value you get from the available software resources and computer hardware. Virtual machines are historically popular for their ability to allow users to run multiple operating systems simultaneously and share the same hardware resources. VMs are run by a hypervisor that allows a single host computer to support more than one guest virtual machine by sharing processing, memory, and other resources.

Container revolution is here with us, and it improves the visualization approach by providing greater efficiency. This is so because container technology eliminates the need for hypervisors and multiple virtual machines.

Both these two technologies are similar in many ways, including their abilities to improve IT efficiency, enhance software development lifecycle, offer application portability, and make the work of DevOps easier.

This article discusses how virtual machines and containers work and explains their main pros and cons. It also guides you on which approach to choose depending on your resources and needs.

### How VMs work

Virtual machines operate through [virtualization technology](https://en.wikipedia.org/wiki/Virtualization). This computing technology stimulates virtual hardware to create virtual versions of resources such as desktop computers and servers that allow multiple virtual machines to run on a single computer system. This way, users optimize the usage of their computer hardware resources.

In such an arrangement, the physical machine is referred to as the host and the VMs the guests. A [hypervisor](https://en.wikipedia.org/wiki/Hypervisor#) manages this process and provides resources such as storage and memory from the host computer to guests. VMs use the same hardware resources, meaning that their operations might overrun each other. Thankfully, the hypervisor schedules such procedures to avoid overrun. The presence of a hypervisor is a mandatory condition for virtual machines to work. It virtualizes and distributes host resources.

### How containers work

Containers are packages of software that include everything that the software needs to run, be it code, binaries, libraries, or dependencies. [Docker Swarm](https://docs.docker.com/engine/swarm/swarm-tutorial/) and [Kubernetes](https://kubernetes.io/) are two powerful container orchestration frameworks.

Components in a container are preserved on a code-based file known as the [image](https://wiki.aquasec.com/display/containers/What+is+a+Container+Image). The file includes all dependencies and libraries. The image consists of configuration files and [RPM packages](https://en.wikipedia.org/wiki/RPM_Package_Manager). Containers are so small and are loosely coupled together in their hundreds. As such, you need Kubernetes, OpenShift(https://www.openshift.com/) or other container orchestration platforms to manage and provision them.

### Containers pros

- A hardware hypervisor is not a requirement for containers to run because they are process-isolated. This makes containers much smaller than VMs. Containers also require fewer resources.
- Containers are fast. It takes only a few milliseconds to boot a Docker container from a container image. You'll have to wait for at least minutes to boot a VM and ensure it is ready for use.
- DevOps and other teams can share containers across multiple members. This is important to ensure portability across the development pipeline.

### Containers cons

- Containers lack a robust security infrastructure. Compared to VMs, containers have a weaker security boundary. This is especially so because of the lightweight isolation that containers provide from the host operating system and the containers within the same system.
- Containers run only one operating system. This is challenging for those wanting to run it across different operating systems.

### Virtual machines pros

- Virtual machines and associated tools are easier to access and work with. Docker container, for example, is associated with a complicated tooling ecosystem consisting of third-party and docker-managed tools.
- Virtual machines allow you to start a Docker instance within those VMs. You can also run the Docker container within the virtual machine. This means that VMs and containers can co-exist alongside each other.

### Virtual machines cons

- It will take you longer to migrate VM images between platforms or perform a successful backup. This is because VMs consume gigabytes.
- Physical servers support fewer virtual machines than containers considering that they encapsulate their entire server, including the operating system.
- You can take minutes to spin up a VM.

### Which one to use: virtual machines or Containers

Containers are lightweight, and thus you can move them easily across private, hybrid, pubic, or multi-cloud environments as well as [bare-metal](https://www.techopedia.com/definition/2153/bare-metal) systems. They provide an ideal environment for the deployment of cloud-native apps. These apps are collections of microservices created to meet the need for automated management and consistent development experience across hybrid, private, and multi-could environments.

You can choose containers when you need to:

- Package microservices.
- Move scalable information technology projects across different IT footprint that share the same OS.
- Instill CI/CD or DevOps practices.
- Build cloud-naive applications.

Virtual machines can run more operations than a single container. That is why VMs are best suited to running large, monolithic apps. But their expanded functionality makes them less portable. This functionality depends on the OS, libraries, and applications.

Virtual machines are best applicable when:

- Running different operating systems inside other operating systems. For example, running Unix on Linux.
- Housing traditional monolithic, legacy workloads.
- Isolating risky development cycles.
- Provisioning infrastructure resources, including servers, data, and networks.

### Conclusion

Virtual machines and containers alike continue to play significant roles in today's digital world. The two differ in many ways, but the most notable one is that containers allow users to virtualize an operating system, allowing multiple workloads to run on a single operating system instance. Virtual machines virtualize hardware resources to run on multiple operating system instances.

With containers running on VMs, organizations leverage their existing tools for monitoring, backup, and automation. Also, they use the existing virtual machine-savvy teams to operate and manage containerized environments.