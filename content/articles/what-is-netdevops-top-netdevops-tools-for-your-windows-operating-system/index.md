---
layout: engineering-education
status: publish
published: true
url: /what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/
title: What is NetDevOps? The top NetDevOps Tools for your Windows OS
description: In this article we shall explore the top NetDevOps tools for the Windows Operating System. Discuss the development toolset network developers need to set up for Windows workstation as a development environment for networking.
author: edwin-wachira
date: 2021-09-08T00:00:00-10:00
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/hero.png
    alt: NetDevOps example
---
As an engineer, you must have heard of the term [DevOps](/engineering-education/what-it-takes-to-be-a-devops-engineer/) (development and operations). This is a combination of methodologies, concepts, and technologies aimed to rapidly boost an organizations capacity to provide services and applications quicker. This allows you to constantly develop software solutions for your clients at high velocity to remain competitive in the market.
<!--more-->
The network ecosystem is one of the essential components of information technology, yet it is viewed as sophisticated and fragile. This brings in fear of network modifications, preventing the networking teams from delivering the agility demanded by today's digital enterprises.

As a NetDevOp engineer, your network infrastructure is completely managed and described by code around the [CI/CD pipeline](/engineering-education/an-introduction-to-cicd-tools/). 

So there's no more logging into the live routers by typing passwords, typing commands (where a typo can bring down the whole network), cut and paste the entire configuration over a console, etc.

This article will teach the basic concept of NetDevOps. Discuss the development toolset network developers need to set up for Windows workstation as a development environment for networking.

Network engineering is heavily carried on Linux-based OS. This article will help the network engineers who work on the Windows operating system learn the tools they need. Thus making it easier and faster to work as a network NetDevOp.

### Prerequisites
This article assumes you have some basic understanding of the following topics:
- Basic understanding of what [DevOps](/engineering-education/what-it-takes-to-be-a-devops-engineer/) entails.
- Know what [CI/CD pipeline](/engineering-education/an-introduction-to-cicd-tools/) is.
- Basic knowledge of working and building networking models.
- Good understanding of networking toolsets.

### What is NetDevOps
Working in an organization that makes little changes several times a year (from medium to large enterprises) would be a goal for most engineers. This relies mainly on automation, continuous integration, continuous deployment, configuration generation, data collection, software updates, testing, monitoring, logging, etc.

You can consider DevOps as a delivery pipeline that comprises cycles for coding, creating, evaluating, and deploying. Teams are not siloed. Different teams are merged into a single unit. To achieve continuous integration and delivery, engineers such as programmers, system analysts, and IT administrators work across the whole application lifecycle.

![DevOps diagram](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/devops-diagram.png)

[Image source](https://aws.amazon.com/devops/what-is-devops/)

NetDevOp is simply DevOp for networks engineers and the intersection of DevOps and Networking. Similar to DevOps, NetDevOps combines toolsets, concepts, and methodologies to automate traditional and manual networking processes. In addition, it leverages its strengths from the DevOp concept. 

This includes the CI/CD and Infrastructure as Code (IaC). This ensures that minimal and periodic network changes are handled in a much more automated, efficient, and stable approach.

![DevOps for NetDevOps](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/netdevops.jpg)

[Image source](https://www.thefastmode.com/technology-solutions/15553-itential-launches-new-api-services-for-netdevops-implementation)

According to [NetDevOps survey report 2020](https://dgarros.github.io/netdevops-survey/reports/2020), Network engineers seem to love automating their network operations and management.

![NetDevOps survey operation automated tool](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/netdevops-survey-operation-automated-tool.png)

[Image source](https://dgarros.github.io/netdevops-survey/reports/2020)

### Top NetDevOps tools that are important for your Windows OS
Network engineers love working on Linux or some form of Unix OS as their network operating system. Some of the reasons why Linux is considered best when working on network-related operations include.

- Linux operating system is the foundation of most network-based OSs. This includes [Cisco IOS](https://www.cisco.com/c/en/us/products/ios-nx-os-software/ios-software-releases-listing.html), [Cisco NX-OS](https://www.cisco.com/c/en/us/products/ios-nx-os-software/nx-os/index.html), [Nexus OS](https://www.oreilly.com/library/view/troubleshooting-cisco-nexus/9780134783208/ch01.xhtml), and [Junos OS](https://www.juniper.net/documentation/us/en/software/junos/junos-overview/topics/concept/junos-software-introduction.html). This makes it easier to understand the Linux internals.
- Linux networking top most open source projects are built based on the Linux internals. This includes container technologies such as [LXC](https://linuxcontainers.org/) and [LXD](https://linuxcontainers.org/lxd/introduction/) and Docker container network isolation and OpenStack. For example, Docker leverages Linux namespaces along with basic Linux interfaces and [Lineage 2](https://forums.linuxmint.com/viewtopic.php?t=317896) (L2) internals to achieve network isolation from the base operating system.

However, as a NetDevOps engineer, your network tooling ecosystem will define how well you can leverage DevOps for network infrastructure. 

This starts with:
- Coding languages such as Python and Ansible,
- Network automation libraries such as Cisco or Juniper,
- Cloud computing, OpenStack, virtualization, source control, etc.

So let's discuss some essential tools that you would add to your Windows operating system network stack to make your NetDevOps more minimal and robust for automating and managing your network processes.

### Git
When working with networking projects, you would likely use source control systems. The control system tracks the changes done to the code over time in a database known as the repository.

[Git](https://git-scm.com/) is one of them. It's a text file repository for version control systems (VCS). It keeps track of how your project files have changed over time. This makes it easy to track project changes and roll back to any specific version of the monitored files at any moment. 

Essentially, Git aids in the collaboration of parallel activities and the management of projects across team members. Git allows a large number of team members to collaborate and work on team projects eﬀectively. Each engineer is maintaining their version of the program and is distributed on their computer. As a result, you can check the project history to see who made what modifications, why, and when.

Thereafter, each member's version of that project can be merged and integrated into the project's main version. And incase the recent file updates generate errors to the system, you can roll back the previous stable version.

Without a version control system, we'll have to constantly store copies of the entire project in various directories. This can be very slow and doesn't scale up, especially if multiple people work on the same project. This means you would have to constantly check the latest code for each member via email or other manual mechanisms. 

Then manually merge the changes to the main projects. And if the new changes generate errors, it will be hard to roll back to the previous stable version. This could cause an outage of the whole system, and it can consume a lot of time to restore it. In some cases, losing data or bringing the whole system down.

Apart from Git, there are other VCS that can be used. 

Such as:
- The centralized VCS - Team members access a centralized server to obtain the most recent version of the code and share their updates with others. They include Microsoft Team Foundation Server and Subversion.

- The distributed VCS - Each participant has a copy of the project on their local computer (local repository). Each member can then submit their changes to the centralized server (remote repository).

But why Git? Git is the most popular version control system because it's free to open source, super-fast, and scalable. In addition, it has well set and fast branching and merging, ensuring fast team member's collaborations.

In relation to Git, [GitHub](https://github.com/) allows publishing your code and configuration files to the GitHub repository remotely. It's free for public repositories cheap for private repositories.

In addition to Git, you can run [Git bash](https://gitforwindows.org/) terminals and bash scripts. For example, when working with network configuration, you will constantly run the command on the terminal/shell. However, you will note shell differences between Windows OS and on Linux or Mac.

Windows OS comes bundled with native command interpreters such as CMD and PowerShell interfaces. Nevertheless, you can use a third-party command interpreter such as Git Bash on your Windows workstation. The advantage of Git bash is that it provides a bash-like interface similar to what you would see inside of a Mac or a Linux workstation.

This way, you can also run bash scripts and work like we were working inside of that type of Linux environment.

### Python
Network configuration runs as code. Therefore, it would be essential to learn at least one programming language. This will aid in managing Network configurations and automation processes. [Python](https://www.python.org/downloads/windows/) is the programming language that most Network engineers enjoy working with.

![NetDevOps survey env language stack](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/netdevops-survey-env-language-stack.png)

[Image source](https://dgarros.github.io/netdevops-survey/reports/2020)

A lot of networking tools are written with Python. As a result, studying Python as a networking programming language will help you grasp how various Python written tools work and how to use them.

In addition, Python provides many free and open-source libraries and tools.

- Python automation framework. This includes Nornir, a pluggable multi-threaded framework. It has inventory management and concurrent task executions to help operate the collection of devices. Other automation libraries include Ansible, Salt, NAPALM.
- As a network engineer, you have to work with different data formats depending on the API or the source files. Python has almost every data format library that you can use to write or execute your APIs. These include JSON, XML, CSV, PyYAML, etc.
- API libraries. When writing down python code to execute a network base architecture, you will constantly make some API calls to a different server. Python makes it easier for you. Different libraries let you interact with different APIs such as REST API (HTTP requests), NETCONF, SNMP, Network CLI, etc.

In short, Python has any libraries you would want to use to make your networking model cleaner and better.

As a Windows OS user, you need [Python](https://www.python.org/downloads/windows/) installed on your computer and learn to automate your network workflows with Python drive code. The best thing about Python is that it is written in user-friendly syntax, making it very easy to understand.

### Choosing a text editor/IDE
While learning a programming language like Python, there are so many text editors and IDEs that you can use to write code. When writing this code, you want a text editor that is easy to use. Windows provide you with a Notepad text editor, which is very easy to use. Nevertheless, you want a text editor that lets you increase your productivity, workflow, and project structuring.

Two main free text editors provide developer-friendly features and functionalities that increase your productivity and how you write down your script. These are [Atom](https://atom.io/) and [Visual studio code](https://code.visualstudio.com/). 

The great thing about these two is that they have features such as inbuilt Version Control, code auto-completion, syntax highlighting, extension support, and multiple selection editing. These tools will help you improve your python development pipeline. Thus meeting NetDevOps become even much simpler.

To help you choose between the two, check this [Atom vs Visual Studio Code comparison](https://www.section.io/engineering-education/atom-vs-visual-studio-code-functionality-and-features-comparison/) guide. Compare and contrast the two and decide which one to choose depending on your requirement.

### Containerization technologies
[Containers](/engineering-education/history-of-container-technology/) help build, ship, deploy and scale applications with ease and dependently. Before containers, if you wanted to develop an application, you would start setting the environments necessary to run that application. This includes installing the necessary libraries and modules to use. 

Meaning you created configuration files manually. These environments are set at the base of the local computer. So it would be hard and time-consuming to transfer the application to another computer. As the other computer users have to set the same local environment, ensuring every version machines to the parent project. This means the code can easily break along different local environments.

Moreover, when deploying this application to another computer, there are chances that the modules and libraries you are using have been upgraded. Thus your production environment ends up with a different version of libraries. This will result in conflicting dependencies you used in the development environment.

The problem becomes even worse when you have different applications with different versions. You will have to manually manage different versions of different modules and libraries to be utilized by different applications. This can lead to possible overlapping application setups.

Containers solve such problems. Applications are easy to manage, start, restating, and stopping different applications with different libraries versioning. You can share the application in a different environment without any compatibility issues. 

This evolution is an abstraction that makes your workloads smaller and more portable. Check this [blog](/engineering-education/history-of-container-technology/) to learn more about the concept of containers.

#### Docker
One of the popular and scalable container technology is [Docker](https://www.docker.com/). At its core, a [Docker container](/engineering-education/running-and-managing-docker/) is a running executable that packages up all of the dependencies necessary for your application to run. 

Thus you no longer have to install these dependencies locally. You write the application instruction, and Docker will package, run and manage every dependency that specific application requires to carry out its fundamental, tightly coupled to the version of libraries and modules that it runs.

A Docker container creates a Docker image which is a template Docker container. Docker container is a running instance of that template. Thus you can share such images with other developers and then run that image just as you would on your computer. This will ship all the dependencies and versions your application runs on without breaking the code and ensuring the application remains environment agnostic. 

Check this tutorial to run more about the [Docker containers](/engineering-education/getting-started-with-docker/) and see how to run a containerized application. For example, while learning Python, you use Docker to run your Python application in such environments. Here is a guide that explains [how you containerize Python with Docker containers](/engineering-education/how-to-containerize-a-python-application/).

Containers are the best in leveraging the concept of Continuous Integration / Continuous Delivery. Although Docker being the popular one, there are other [container technologies such as Kubernetes](/engineering-education/deploy-docker-container-to-kubernetes-cluster/).

#### Kubernetes
[Kubernetes](/engineering-education/what-is-kubernetes/) is an open-source platform for managing containerized workloads and services, including declarative setup and automation capabilities. This enables you to run distributed systems robustly, complete with scaling and failover for your application. 

It is used as a [orchestration tool for containers technologies](/engineering-education/top-container-orchestration-tools/) such as Docker. Orchestration tools guarantee that each container is where it should be and that the containers can communicate. In this case, an application can perform a variety of tasks (services). 

An orchestrator divides each piece of functionality into smaller separate pieces. This means that if an update is required, only that specific service must be worked on. And even if it fails, the application as a whole is unaffected. This introduces a microservice concept with scaling advantages.

When you use Docker containers to build an application, all of the services are packed together with all of their dependencies and any necessary configuration. As a result, each service will run in its own container. Because you can add a new container, replace an older container, update, start, restart, or stop it, maintaining it is simple.

While managing these containers, that's where the power of Kubernetes comes in. Kubernetes is all about managing these containers. Kubernetes packages these services as a [cluster](/engineering-education/kubernetes-clusters-intro/) and automates how these containers communicate with each other. 

It ensures the application runs without downtime. In this case, when one container stops or fall into issues, Kubernetes will spin another container up and recover it all by itself, ensuring no downtime for that application.

The concept of Kubernetes is vast and exciting to learn. Check this guide to [get started with this fantastic technology](/engineering-education/introduction-to-kubernetes/).

As a network engineer, you might be wondering how this containerization technology will help you spin up a network model. Here are some examples of [Cisco DEVNET Sandbox Labs](https://developer.cisco.com/site/sandbox/).

1. CI/CD Sandbox pipeline toolset example:

![ci-cd-devnet-sandbox](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/ci-cd-devnet-sandbox.png)

[Image source](https://devnetsandbox.cisco.com/sandbox-instructions/CICD_Pipeline/helloworld.html)

This pipeline fits the integration and deployment of your code. It’s made from three tools.

- [Gogs](https://gogs.io/) - a self-hosted Git service.
- [Drone](https://docs.drone.io/) - a continuous delivery system.
- [Kubernetes](https://kubernetes.io/) – a container management platform.

Here is how these tools can be combined in the networking model.

![cisco-sanbox-lab-with-ci-cd-kubernetes](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/cisco-sanbox-lab-with-ci-cd-kubernetes.png)

[Image source](https://devnetsandbox.cisco.com/RM/Diagram/Index/be51af73-c9e9-4af7-89d2-42c1c71e1f09?diagramType=Topology)

The above sandbox provides a simple example of CI/CD basic mechanisms and flow. 

It can:
- Store, commit and manage your code in Gogs.
- Automatically build a Docker container from a code repository using Drone.
- Automatically store that container on Docker Registry, using Drone.
- Automatically deploy the container to a [Kubernetes pod](/engineering-education/how-kubernetes-pods-work/).

To spin up the above example on your computer, check this tutorial and see how you can [build, publish and deploy a network model with container technologies](https://devnetsandbox.cisco.com/sandbox-instructions/CICD_Pipeline/helloworld.html).

2. IOx CI/CD Pipeline Sandbox:

![iox-workflow](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/iox-workflow.png)

[Image source](https://devnetsandbox.cisco.com/RM/Diagram/Index/4d0cb9d9-350c-41fd-b4d2-57090155b069?diagramType=Topology)

The workflow above utilizes Cisco IOx Application Framework, [Gogs](https://gogs.io/), [Drone](https://docs.drone.io/) and [Kubernetes](https://kubernetes.io/) to create a Cisco IoT and Edge Compute application. [By making a Git commit]((https://devnetsandbox.cisco.com/RM/Diagram/Index/4d0cb9d9-350c-41fd-b4d2-57090155b069?diagramType=Topology)) to your repository, you may take code from a repository, create, commit, publish, and deploy Docker/container-based images into the [Cisco IOx Application Ecosystem](https://devnetsandbox.cisco.com/RM/Diagram/Index/4d0cb9d9-350c-41fd-b4d2-57090155b069?diagramType=Topology). It is built to leverage the CI/CD pipeline for your code.

Here is how the lab model looks like.

![cisco-iox-ci-cd-lab-model](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/cisco-iox-ci-cd-lab-model.png)

[Image source](https://devnetsandbox.cisco.com/RM/Diagram/Index/4d0cb9d9-350c-41fd-b4d2-57090155b069?diagramType=Topology)

In this CI/CD environment, the developer can:
- Store, commit and manage your code in Gogs.
- Automatically build a Docker container from a code repository using Drone.
- Automatically store that container on Docker Registry, using Drone.
- Automatically deploy the container to a Cisco IOx Edge Compute appliance.

To learn more about this workflow and how to implement it, check [this step-by-step tutorial](https://developer.cisco.com/learning/tracks/iot/cicd-iox/iox-app-building-cicd/step/1).

### Conclusion
You can utilize a variety of NetDevOps technologies to ensure that your network model incorporates the DevOps idea. These toolsets will assist you in packaging practically any model, delivering a clean and manageable workflow pipeline. Like DevOps, NetDevOps solutions result in substantial cultural shifts. 

Employees from a variety of professions must modify their daily work habits and procedures and collaborate. This mandates individuals from various professions to adapt their daily work habits and procedures to collaborate more effectively.

![cisco-network-culture-change](/engineering-education/what-is-netdevops-top-netdevops-tools-for-your-windows-operating-system/cisco-network-culture-change.png)

[Image source](https://www.cisco.com/c/en_in/index.html)

Other essential tools include:
- [Ansible](https://www.ansible.com/) - Ansible is a Red Hat-supported open-source technology. It enables you to control and configure several servers from a single place. Rather than manually configuring each server, you may use the [Ansible playbook](/engineering-education/it-automation-using-ansible/) to automate all of your operations. Check [how to run Ansible on Windows](https://www.youtube.com/watch?v=vE5unuqIauE&list=PLhfrWIlLOoKMduetaIJgOoQCyfiJNEX74&index=11).
- [Chef Infra](https://docs.chef.io/chef_overview/) - an infrastructure-to-code automation tool. It assists you in automating the build, deployment, and management of your whole networking infrastructure and ecosystem.
- [Puppet](https://puppet.com/) - a mechanism for managing server settings. It assists in the automation of IT operations. It is utilized in many aspects of IT automation, including network automation. You may use Puppet to automate the planned state of your server switches, routers, and other devices. Puppet may be used on both Unix and Windows platforms.
- [Postman](https://www.postman.com/) - for testing any [networking API that you develop](https://netdevops.me/2019/creating-a-bootstrap-based-front-end-for-your-simple-rest-service/) with the language of your choice.
- [Gitlab](https://about.gitlab.com/) - a remote VCS host where you can share and collaborate on your Git repositories with other developers. It's made to make sure that CI/CD covers the whole DevOps lifecycle. Furthermore, it assures that the whole development team collaborates on the same code source.
- A [Cloud Platform](/engineering-education/introduction-to-cloud-computing/) - for hosting network model codes.

Happy learning!

### Further reading
1. [What it Takes to be a DevOps Engineer](/engineering-education/what-it-takes-to-be-a-devops-engineer/)
2. [An Introduction to CI/CD Tools](/engineering-education/an-introduction-to-cicd-tools/)
3. [Automation Using Ansible](/engineering-education/it-automation-using-ansible/)
4. [Understanding Docker Concepts](/engineering-education/docker-concepts/)
5. [Getting Started with Docker](/engineering-education/getting-started-with-docker/)
6. [Setting up CI/CD for Python Packages using GitHub Actions](/engineering-education/setting-up-cicd-for-python-packages-using-github-actions/)
7. [Python Projects for Beginners](/engineering-education/python-projects-for-beginners/)
8. [How to Containerize a Python Application](/engineering-education/how-to-containerize-a-python-application/)
9. [What is Kubernetes?](/engineering-education/what-is-kubernetes/)
10. [How to Deploy Docker Container to a Kubernetes Cluster](/engineering-education/deploy-docker-container-to-kubernetes-cluster/)
11. [Getting Started with Kubernetes](/engineering-education/introduction-to-kubernetes/)
12. [Getting Started with Kubernetes Clusters](/engineering-education/kubernetes-clusters-intro/)
13. [Top Container Orchestration tools](/engineering-education/top-container-orchestration-tools/)
14. [Why and When You Should Use Kubernetes](/engineering-education/why-and-when-you-should-use-kubernetes/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
