# Network Automation and Automation Tools 
![Hero image](/network-automation/hero.jpg)

[source](https://unsplash.com/photos/TbHPvVcZ_f4)
During the industrial age, automation was used to reduce and potentially eliminate the need for human intervention in industries, thus making the process self-driven. 
Because setting up networks, especially in large organizations can be time-consuming, configuration management tools are used to automate the configuration of network devices such as routers, switches, firewalls, and servers.
In this article, we  will look at network automation and some automation tools in use.

### Goals
At the end of this article, it is expected that the reader should learn:
- What automation and network automation is
- What Application Programing Interface (API) is
- Different configuration management tools
- About Ansible, Chef puppet, and Saltstack 

### Prequisites 
This article gives an overview of network automation and automation tools, to follow along, the reader is expected to have a basic understading of networking. 

### Table of contents 
- [What is automation?](#what_is_automation?)
- [Application Programming Interface (API)](#application_programming_interface (API))
- [Types of Web Service APIs](#types_of_Web_Service_apis)
  - [Extensible Markup Language Remote Procedure Call XML-RPC)](#extensible_markup_manguage_remote-procedure_call_(XML-RPC))
  - [Simple Object Access Protocol (SOAP)](#simple_object_access_protocol_(SOAP))
  - [JavaScript Object Notation Remote Procedure Call (JSON-RPC)](#javascript_object-notation_remote_procedure_call_(JSON-RPC))
  - [Representational State Transfer (REST)](#representational_state_transfer_(REST))
- [Network management tool](#network_management_tool)
- [ Network management tools](#network_management_tools)
  - [Ansible](#ansible)
  - [Saltstack](#saltstack)
  - [Puppet](#ppuet)
  - [Chef](#chef)
[Conclusion](#conclusion)
[Further reading](#further_reading)

### What is automation?
Automation can be seen as the mechanism or process in which a system is configured to operate with minimal or no human intervention. This process has cut across different fields, from the manufacturing industry to health, and security. But in networking, automation is the process in which networking devices such as routers, switches, firewalls, and servers are configured with less or no human intervention. 
Despite the claims of high-quality network management by humans, an automated network provides greater control and fewer errors in network configuration, thus reducing network downtime. 
Network automation is achieved using Application Programming Interface (API) to share data formats used to configure network and networking devices automatically. 

### Application Programming Interface (API)
 API is an application or process in which an organization exposes a defined set of data or services for public consumption.  This process allows other applications to access data or services such as; products catalog, phone listings, order status, and network device information and status. 

### Types of Web Service APIs
With the World Wide Web gaining more popularity day by day as the result of internet access becoming readily available, different types of APIs were developed to accommodate different users need and end device requirements over the web, these APIs can be categorized into:
- Simple Object Access Protocol (SOAP)
- Representational State Transfer (REST)
- Extensible Markup Language- Remote Procedure Call (XML-RPC)
- JavaScript Object Notation -Remote Procedure Call (JSON-RPC)

#### Extensible Markup Language Remote Procedure Call (XML-RPC)
XML- RPC APIs are built on the principle of Remote Procedure Call (RPC). This principle was developed by James E. White. It allows a process of calling functions via remote access to execute some specific codes and return the information. In XML-PRC, data transfer is controlled by HTTP, while the data displayed is using XML. 
 The XML-RPC was developed by Microsoft in closed collaboration with Dave Winer, the refined form of it gave the Simple Object Access Protocol (SOAP)

#### Simple Object Access Protocol (SOAP)
APIs exchange data between applications, but this data exchange between different applications can be complex because of the variety of programming languages used to build different applications. To simplify the process, Simple Object Access Protocol (SOAP) APIs, uses the Extensible Markup Language (XML) which is understood by all programming languages to transport and share data using the HyperText Transfer Protocol (HTTP) or Simple Mail Transfer Protocol (SMT).

#### JavaScript Object Notation Remote Procedure Call (JSON-RPC)
JSON-RPC is a simple protocol that allows data or notification to be sent to a server without the server responding. This protocol uses very few commands and is similar to XML-RPC and allows multiple calls to be sent to the server. 

#### Representational State Transfer (REST)
This is an architectural design developed for web services to share data. It is considered easier to use when compared to SOAP because it is faster, lightweight, and has increased scalability, as such it accounts for about 80%  of APIs in use today.  
REST APIs use the HTTP methods: POST, GET, PUT, PATCH, and DELETE to exchange  data [HTTP method](https://www.restapitutorial.com/lessons/httpmethods.html)
All APIs built using the REST architectural design is referred to as RESTful APIs and they conform to the following guidelines: 
- Server-client: The server contains the resources while the client requests permission to use such resources from the server.
Stateless: It is stateless because client information is not stored on the server, rather it is stored in the client. 
- Cacheable: The client can cache and streamline data for improved performance. 
- Uniform interface: RESTful APIs use a uniform interface to share information between the server and the client in a standard form.
- 
Because RESTful APIs account for 80% of web APIs, network management tools are built using the REST architectural design. 

  ### Network management tools
At the initial stage of networking, all devices and all services that need to be configured were done manually using the Command Line Interface (CLI). This method is time-consuming and error-prone leading to network downtime. To solve this problem and increase network uptime, various network automation management tools were developed using RESTful APIs to configure networks across hundreds of networking devices. These tools reduce time taking and erros in configuring networks. 
These tools are:
- Ansible
- Chef
- Puppet
- SaltStack

#### Ansible
![Ansible](/network-automation/ani.png)
[source](https://bryxx.eu/bryxx-puppet-service-delivery-partner)
Ansible is a simple IT automation tool that is an open-source community project sponsored by Red Hat. It uses the REST API architecture to describe how all systems in a network inter-relate and allows  for the managing of multiple systems rather than one system at a time. 
 Ansible uses a playbook for automation and orchestration (how it performs automation by listing which tasks need to happen one at a time).This is achieved by connecting network nodes and pushing out small programs called “ansible modules” to them and they are executed. 
 These modules are executed over Secure Shell (SSH) by default and can reside in any machine, meaning that it is agentless and any device can be the controller, using a terminal program to configure the network and version control to keep track of all changes and contents. 

#### Saltstack
![Saltstack](/network-automation/salt.png)
[Source](https://sixfeetup.com/blog/saltstack-for-server-config-management)

Saltstack is a flexible network configuration management tool that allows simultaneous configuration of networks
Saltstack support both agent-based and agentless configuration, meaning a dedicated device known as the Salt master is used to control the configuration and all other devices will have to periodically connect to the **Master** for an update. 
salt stack uses **Pillar**  as the name for its instructions and specifications for the configuration to be applied on each device. 

#### Puppet 
![Puppet](/network-automation/puppet.png)
(https://bryxx.eu/bryxx-puppet-service-delivery-partner/)
Puppet is a network automation tool produced by Puppet.Inc which was was founded in 2005 by Luke Kanies. It uses declarative language to manage various IT life cycles. Puppet was built using Ruby programming language and it supports both agentless and agent-based configuration management for configuring, provisioning, and patching of applications and operating systems. 

  For agent-based configuration management, Puppet uses the **Puppet master** to create a set of instructions to be executed and stores them in a file known as the “puppet manifest”  which can then be applied directly on the system and compiled into a catalog and distributed using a REST API architecture [Wikipedia](https://en.wikipedia.org/wiki/Puppet_(software))

#### Chef 
![Chef](/network-automation/chef.png)
[source](https://en.wikipedia.org/wiki/Chef_(software))
 Just like Puppet, Chef is written in Ruby programming language. Users describe how it manages applications and utilities using written **recipes** which are then grouped in a **cookbook** for easy management.  The recipes describe which packages should be installed and which services should be running [Wikipedia](https://en.wikipedia.org/wiki/Chef_(software)), to accelerate application delivery, DeOPs collaboration, and network uptime. 

Chef is an agent-based configuration management tool that uses “chef master to manage orchestration and automation of network tacks. 

### Summary 
In this article, the reader have learned: 
- Network automation is about
- What are APIs  and different types of web service APIs
-  What network management tools are and different network management tools

### Further reading.
In this article, different network management tools were discussed, to use these tools in configuring networks, more in-depth knowledge is required, for these reasons the links below are given to help the reader. 
- [Ansible](https://www.ansible.com/resources/get-started)
- [Puppet](https://learn.puppet.com/instructorledtraining)
- [Saltstack](https://docs.saltproject.io/en/getstarted/)
- [Chef](https://learn.chef.io/tracks)