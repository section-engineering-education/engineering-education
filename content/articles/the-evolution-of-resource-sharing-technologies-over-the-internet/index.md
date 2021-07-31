---
layout: engineering-education
status: publish
published: true
url: /the-evolution-of-resource-sharing-technologies-over-the-internet/
title: The Evolution Of Resource Sharing Technologies over the Internet
description: This article will discuss the different methods that have been implemented over the years to enable resource sharing over the internet. We will go over examples such as COBRA OMG, DCOM, Java RMI to name a few.
author: kioko-mulwa
date: 2021-01-19T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/the-evolution-of-resource-sharing-technologies-over-the-internet/hero.jpg
    alt: Resource Sharing Technologies example image

---
With the growth of the internet and the web, there has always been a need for resource sharing and collaboration. As we could work more effectively through collaborating with others. This often involved the sharing or interaction of various software products.
<!--more-->
There arose the need for distributed computing. However, one of the biggest challenges of distributed computing was how to get software components located in different geographic locations to interact in a standardized way. They created several technologies to try and meet this need.

### 1. CORBA
Common Object Request Broker Architecture ([CORBA](https://en.wikipedia.org/wiki/Common_Object_Request_Broker_Architecture)) is regarded as a standard by the Object Management Group (OMG). It is viewed as a distributed object that enables different operating systems, computing hardware, and programming languages to work together through a provided interchange. Regardless of whether the systems in use are object-oriented or not, they can still make use of CORBA which is implemented by an object-oriented model.

The object request broker (ORB) allows clients to call methods from a remote object. In simpler terms, it helps objects make a request to and get responses from one another, whether on the same machine or across the network. This was made possible using the CORBA Interface Definition Language (IDL).

While the CORBA standard was very promising, several issues were encountered. The biggest of which was the poor implementation of the standard. There was also quite a bit of politics brought about by competing vendors, who tried to steer the standard in a particular direction. The standard was also a bit too complicated.

CORBA was built with the aim of:
- Improving the use of distributed systems.
- It is currently used in Object-oriented programming.
- Allowing multiple programming languages to communicate with each other.

### 2. DCOM
Distributed Component Object Model ([DCOM](https://en.wikipedia.org/wiki/Distributed_Component_Object_Model)) is one of Microsoft Technologies many developments for communication in software components on networked computers. Being a major competitor to CORBA, the two technologies were seen to one day be the standard for code models and reuse of service over the internet.

Being based on the Component Object Model (COM) allowed clients and servers to communicate in the same computer network through a set of interfaces. However, both these technologies (DCOM and CORBA) faced crippling difficulties when working with internet firewalls.

### 3. Java RMI
Remote Method Invocation ([RMI](https://www.javatpoint.com/RMI)), is applied in Java as an API due to its ability to create distributed applications. The RMI allows a Java object to invoke methods on remote Java objects running in different [JVMs](https://www.guru99.com/java-virtual-machine-jvm.html) (Java Virtual Machines). RMI's design was later enhanced to accommodate CORBA. This now meant that Java objects could interact with remote non-Java objects.

### 4. Web Services
A [web service](https://en.wikipedia.org/wiki/Web_service) is a standards-based, language-agnostic software entity that accepts specially formatted requests from other software entities on remote machines via vendor and transports neutral communication protocols, producing application-specific responses. Simply put, a web service is an API that facilitates standards-based application-to-application communication.

Unlike CORBA, DCOM, or RMI, which rely on binary messaging, making it harder to play well with many internet technologies - web services use human-readable messaging. This is the crucial advantage web services has over the preceding technologies. The most commonly used web services are, SOAP and REST web services.

#### SOAP Web Services
Simple Object Access Protocol commonly known as SOAP is considered a messaging protocol that allows the interchange of data in a distributed and decentralized environment. SOAP works with many application-layer protocols, namely, HTTP, SMTP, TCP, or UDP. SOAP relies exclusively on the XML format to provide messaging services. The protocol is built with security, authorization, and error-handling in mind.

Enterprise-level web services are known to use SOAP especially if the transaction is highly complex or if there is a need for high security. Its application ranges from telecommunication services, payment gateways, and financial services among others. It most common API being PayPal's API, that allows payment through PayPal services or credit card.

#### REST Web Services
Representational State Transfer also known as REST is relatively new and has quickly become very popular. Developers usually find SOAP burdensome to use. For example, in order to build a SOAP API using JavaScript language, you can find yourself writing several lines of code just to accomplish the simple task of converting to the required XML structure.

REST ability to transmit data in multiple formats such as JSON, XML, plain text, YAML, and HTML makes it one of its most loved features by API providers. Due to the human-readable format and being lightweight, REST has gained a lot of traction. JSON data format being the most commonly applied, can be used in any programming language despite its name.

Data transmission can only be achieved through HTTP protocols in REST. However, lower level principles do not have a predefined method of implementation. Instead, REST provides guidelines in the form of architectural principles or constraints but does not enforce them. RESTful web services are built using the REST architectural principles.

The following five architectural principles are used to develop a REST API:

1. **Uniform Interface** - The URI used to request resources from the server should be the same for all clients.
2. **Client-Server Separation** - The client and server should interact through requests and responses, and they should be independent at all times.
3. **Statelessness** - All the information needed by the server should be made using only one request. This is in order to avoid server-side sessions.
4. **Cacheable resources** - Details on whether the data is cacheable or not should be contained in the server responses.
5. **Layered System** - Requests and responses should not be affected in cases where there might be the several layers between the client and server.

### Conclusion
In this article, we discuss the different methods that have been implemented over the years to enable resource sharing over the internet. We can take away that the technologies change over time depending on the data transferred and its current application. The future could hold far better resource sharing technologies than what we currently have.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
