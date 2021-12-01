---
layout: engineering-education
status: publish
published: true
url: /statefull-vs-stateless-architectures/
title: Statefull vs Stateless Architectures
description: In this article, we will explore Quality of Service and its importance to a network.
author: sudi-david
date: 2021-11-26T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /understanding-quality-of-service/hero.png
    alt: Statefull vs Stateless Architectures Hero Image
---

When developing applications and services, developers consider various factors to ensure their applications run in the most optimum way. Factors such as the scalability of the application/service, the hardware need such as networks speed and bandwidth required by the application, and the amount of temporary and permanent storage form a few of the factors that developers consider during the application development process. Additionally, developers consider the processing time, mainly determined by processor speed and application building architecture.

### Learning Points 
The article will cover:
-	How stateful and stateless architectures affect the running of an application/ service on a server. 
-	A short history to get you acquainted with what stateful and stateless application/ services mean. 
-	A list of the various protocols that utilize each of the mentioned architectures. 
-	The difference between the architectures. 
-	The advantages and disadvantages of the two architectures.

Let's get started!

### Prerequisite
1.	You should know internet protocols such as HTTP, UDP, TCP DNS SMTP, FTP, TCP, POP3, and TELNET as I will only feature a basic discussion of these protocols within the article.
2.	Have a basic understanding of the difference between GraphQL, REST, and SOAP application programming interfaces (APIs) 
3.	You should have founding knowledge of networks bandwidths, servers, and clients.

### Introduction 
During the 1980s, servers handled most of the complex computations as clients were limited in the scope of operations that they could fulfill. However, as time passed by, a global increase in web usage led to the development of the Hypertext Transfer Protocol (HTTP), web browsers, and other client-side software and hardware.

Coincidentally, the rise in web usage led to an increase in the number of clients, as the clients could also handle many of the functions previously performed on servers.

### What Are Stateful and Stateless Architectures 

These are architectural frameworks that define how users interact with services on the internet. Stateful architecture-based services maintain track of clients' records or sessions and apply different functionalities to similar user inputs based on the user's previous records. In a stateless design, services rely on the clients to keep track of transaction records, concentrating on operations that change the system’s resources rather than its state.

The main difference between the two architectures is how they handle states. In a stateful-based system, additional information is reserved on the server-side, saving the present transaction's state as it waits for the proceeding user requests. 

In a stateless-based system, extra information is held on the client-side. Thus, as the system conveys different information, each session reminds the server of its preceding sessions through cookies.

### Network Protocols and their Architectures

Network protocols are divided into two: 
- Stateful protocols. 
- Stateless protocols. 

### Examples of Stateless Protocols 
  

- The Hypertext Transfer Protocol (HTTP): The foundation on which the World Wide Web was built.
- The User Datagram Protocol: Used in real-time services like video communications 
- Domain Name System (DNS). 
- The Simple Mail Transfer Protocol – the foundation of email services.
- The Post Office Protocol – which is stateless across sessions.
- The Internet Protocol, which, as the name suggests, is the basis of the internet.

On the other hand, the receiver can keep session state/status info from the previous requests in a stateful network protocol.

### Examples of Stateful Protocols
- The File Transfer Protocol (FTP).

> The traditional FTP server couples with the client in an interactive session where while in session, a user is provided with a way to verify and set a few variables, all stored server-side, as part of the session state.

- Telnet 
- The Transmission Control Protocol (TCP)

### API-Based Internet Services and their Relation to Stateful and Stateless Architectures

The move to switch from a stateful designed system to a stateless alternative is linked to the popularity of the diverse ways of building application programming interfaces (APIs) and web apps. At the start of the 21st century, the Simple Object Access Protocol (SOAP) was a prevalent design pattern. The design pattern allowed the creation of stateful architectures, evident from the services and applications developed during the period. 

Because of their stateless design, RESTful services grew in popularity and finally surpassed SOAP's utilization. In the design world, GraphQL is gaining traction. RESTful services, like GraphQL-based services, are stateless. Thus, end-users have a lot of influence over what data is sent to and from the servers.

### Differences Between Stateless and Stateful Architectures
The main differences between the two architectures relate to how they handle user states and sessions. These differences are highlighted in the table below.

**Stateless**|**Stateful**
:-----:|:-----:
It relies on clients to store session state information using cookies and local storage.|Rely on servers to store session state information.
Server design is simple as it does not handle most of the functionality.|Server design is complex as it handles a lot of complexity
The server can process requests quickly as it only needs to look at the request given to it. The request contains all of the information the server needs to process it.|The server handles user requests relatively slower compared to stateless architectures servers. The server must manage the state sessions on its own. Thus, responses get to the client much slower.
The server and client are independent and loosely coupled.|The server and client are dependent on each other.
The server and client are independent and loosely coupled.|The server and client are dependent on each other.
Servers in this architecture are crash-proof. They can be restarted after a failure. The other servers could continue to handle a user request when the server handling it goes down.|Servers in this architecture do not recover easily from a crash. They store session status and information about a client during sessions. So if they crash, the session has to start over.


### Advantages of Stateless Architecture
1.	A network's monitoring system does not need to read the information beyond a single request to comprehend it, which improves visibility. This is because every request is handled in isolation.
2.	They simplify the design of the server since most functionality is handled client-side.
3.	It is very reliable as it recovers from partial failures easily. The server does not need to store any particular state or session; thus, a failed server can restart or transfer the client's request to another server of the same organization.
4.	Scalability is achieved easily. Since the servers do not have to store session states, resources can be freed to handle other incoming requests.
5.	They can handle multiple sessions simultaneously since every request is isolated.
6.	Memory usage on the server-side is reduced because the information used to handle requests is not stored there.

### The Disadvantage of Stateless Protocols 
1.	Recurring poor network performances. This might occur when increasing the redundant data sent in sequences of requests. Remember, we mentioned that data is not left on the server in a stateless network architecture.

### The Advantage of Stateful Architecture
1.	A stateful architecture may add a security advantage to systems. That is why many banks rely on it to allow users to make online transactions. Its disadvantages, however, outweigh its benefits.

### The Disadvantages of Stateful Architecture
1.	It does not quickly recover from partial failures. When a server fails, it cannot just restart or pass a user request to another server because it needs to hold the session state along with the details.
2.	As much of the complex functionality is handled server-side, an intricate server design is needed to design the server.
3.	Too much dependency between server and client that when one side fails, all connections are lost, and the running process has to start over.

### Conclusion

The majority of modern systems are developed using a stateless design. The server-focused stateful approach, in which clients were passive interfaces reliant on servers to perform most of the computing tasks, gave rise to the popularity of the stateless architecture.

Advances in technology, combined with the introduction of powerful client computers, promoted a shift to a stateless preferred environment. This allowed developers to spend their time and effort on product development rather than solving technical issues, like server software implementation, common in stateful-based systems.

---

Peer Review Contributions by: 