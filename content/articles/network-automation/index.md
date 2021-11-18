---
layout: engineering-education
status: publish
published: true
url: /network-automation/
title: Network Automation
description: This article will discuss the concept of network automation. It will also look at web service APIs and network management tools. 
author: rabo-james-bature
date: 2021-08-12T00:00:00-04:10
topics: [Networking]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/network-automation/hero.jpg
    alt: Network Automation Hero Image
---
During the industrial age, automation was used to reduce and potentially eliminate the need for human intervention in industries, thus making the process self-driven. 
<!--more-->
In the current era, configuration management tools are used to automate devices such as routers, switches, firewalls, and servers. Automation reduces the time taken to set up networks, especially in large organizations.

### Goal
This article will provide an overview of network automation and some of the automation tools in use. It will also take you through Application Programming Interfaces (APIs) and various types of web service APIs.

### Prerequisites 
To follow along, the reader needs a basic understanding of networking. 

### Table of contents 
- [What is automation?](#what-is-automation?)
- [Application Programming Interface (API)](#application-programming-interface-api)
- [Types of Web Service APIs](#types-of-web-service-apis)
- [Extensible Markup Language Remote Procedure Call (XML-RPC)](#extensible-markup-language-remote-procedure-call-xml-rpc)
- [Simple Object Access Protocol (SOAP)](#simple-object-access-protocol-soap)
- [JavaScript Object Notation Remote Procedure Call (JSON-RPC)](#javascript-object-notation-remote-procedure-call-json-rpc)
- [Representational State Transfer (REST)](#representational-state-transfer-rest)
- [Network management tools](#network-management-tools)
- [Further reading](#further-reading)

### What is automation?
Automation can be seen as the mechanism or process in which a system is configured to operate with minimal or no human intervention. This process is applied in different fields including the manufacturing and healthcare sectors. 

In networking, automation is the process in which networking devices such as routers, switches, firewalls, and servers are configured with little or no human intervention. 

An automated network provides greater control and fewer errors in network configuration. This factor reduces network downtime significantly. 

Network automation is achieved using the Application Programming Interface (API). APIs support sharing of data formats used in network configurations. 

### Application Programming Interface (API)
An API allows an organization to expose a defined set of data or services for public or private consumption.  

APIs can either be internal, partner, or public:
- **Internal APIs:** These APIs are used exclusively within an organization. They are restricted to specific members.
- **Partner APIs:** These APIs allow business partners to access functions such as online catalog, ordering, and reconciliation.
- **Public APIs:** They are also referred to as external APIs. They are designed primarily for external consumers and can be used with few restrictions. 

APIs use specific **data formats** to store and exchange data. 

The data formats include:
- Javascript Objects Notation (JSON)
- Extensible Markup Language (XML)
- YAML Ain’t Markup Language (YAML)

### Types of Web Service APIs
Today,  there are different types of APIs to accommodate varying needs and device requirements. 

These APIs can be categorized into:
- Simple Object Access Protocol (SOAP)
- Representational State Transfer (REST)
- Extensible Markup Language - Remote Procedure Call (XML-RPC)
- JavaScript Object Notation - Remote Procedure Call (JSON-RPC)

#### Extensible Markup Language (XML-RPC)
XML- RPC APIs are based on the principle of Remote Procedure Call (RPC). This principle was developed by James E. White. 

It allows a process of calling functions via remote access to execute some specific codes and return the information. In XML-PRC, data transfer is controlled by HTTP, while the data is displayed using XML. 
 
The XML-RPC was developed by Microsoft in collaboration with Dave Winer. This refined form led to the Simple Object Access Protocol (SOAP).

#### Simple Object Access Protocol (SOAP)
APIs facilitate the sharing of data between applications. However, this data exchange can be complex because of the variety of programming languages used to build different software. 

To simplify the process, Simple Object Access Protocol (SOAP) APIs use the Extensible Markup Language (XML). 

XML is understood by all programming languages and supports the sharing of data using the HyperText Transfer Protocol (HTTP) or Simple Mail Transfer Protocol (SMT).

#### JavaScript Object Notation (JSON-RPC)
JSON-RPC is a simple protocol that allows data or notification to be sent to a server without the server responding. 

JSON-RPC protocol uses few commands and is similar to XML-RPC. It allows multiple calls to be sent to the server. 

#### Representational State Transfer (REST)
This protocol allows web services to share data. It is easier to use when compared to SOAP because it is faster, lightweight, and more scalable. REST accounts for about 80% of APIs in use today. 

REST APIs use [HTTP methods](https://www.restapitutorial.com/lessons/httpmethods.html) such as `POST`, `GET`, `PUT`, `PATCH`, and `DELETE` to exchange  data. 

All APIs built using the REST architectural design are referred to as RESTful APIs and usually conform to the following guidelines: 

- **Server-client:** The server contains the resources while the client requests permission to use such resources from the server.
- **Stateless:** It is stateless because the client information is not stored on the server. 
- **Cacheable:** The client can cache and streamline data for improved performance. 
- **Uniform interface:** RESTful APIs utilize a uniform interface to share information between the server and the client in a standardized way.

### Network management tools
In the past, networking devices and services that needed to be configured were done manually using the Command Line Interface (CLI). This method is time-consuming and error-prone. 

To solve these problems, various network automation management tools were developed. RESTful APIs were used to configure networks across hundreds of networking devices. 

These tools are:
- Ansible
- Chef
- Puppet
- SaltStack

#### Ansible
Ansible is an open-source IT automation tool sponsored by Red Hat. It uses the REST API architecture to describe how all systems in a network inter-relate. It supports the management of multiple systems rather than one system at a time. 

Ansible relies on network nodes to send small programs called **ansible modules** for execution. 
 
Ansible modules are executed over Secure Shell (SSH) by default and can reside in any machine. A terminal program is used to configure the network, version control, as well as keep track of all changes and contents. 

#### Saltstack
Saltstack is a flexible network configuration management tool that allows the simultaneous configuration of networks. It supports both agent-based and agentless configurations. 

This means that a dedicated device known as the **Salt master** is used to control the configuration. Other devices will have to periodically connect to the **Master** for an update. 

Saltstack uses the **pillar** keyword to refer to its instructions and specifications for device configuration. 

#### Puppet 
Puppet is a network automation tool produced by Puppet.Inc. The company was founded in 2005 by Luke Kanies. 

Puppet uses declarative language to manage various IT life cycles. It was built using Ruby programming language and supports both agentless and agent-based configuration management for system configuration. 

For agent-based configuration management, Puppet uses the **Puppet master** to create a set of instructions and stores them in a file known as the `puppet manifest`. 

The instructions can then be applied directly to the system, compiled into a catalog, and distributed using a REST API architecture.

#### Chef 
Just like Puppet, Chef is written in Ruby programming language. Users can outline how it manages applications and utilities using written **recipes** which are then grouped in a **cookbook** for easy management.  

The recipes describe which packages should be installed and which services should run to accelerate application delivery, DevOps collaboration, and network uptime. 

Chef is an agent-based configuration management tool that uses **chef master** for network automation. 

### Conclusion
In this article, we have discussed network automation and APIs. We also highlighted some of the vital tools during networking. You can, therefore, use this knowledge to manage networks more effectively.

### Further reading 
- [Ansible](https://www.ansible.com/resources/get-started)
- [Puppet](https://learn.puppet.com/instructorledtraining)
- [Saltstack](https://docs.saltproject.io/en/getstarted/)
- [Chef](https://learn.chef.io/tracks)

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
