---
layout: engineering-education
status: publish
published: true
url: /stateful-vs-stateless-architectures/
title: Stateful vs Stateless Architectures
description: In this article, we will explore the differences and similarities of stateless and stateful architectures. We will also discuss how these architectures affect an application.
author: sudi-david
date: 2021-12-13T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/stateful-vs-stateless-architectures/hero.png
    alt: The Stateful vs Stateless Architectures Hero Image
---
When developing applications, developers consider several factors to ensure they run optimally. 
<!--more-->
These factors include the scalability of the application/service, hardware needs such as network speed and bandwidth, and the amount of temporary and permanent storage. 

Additionally, developers consider the processing time, processor speed, as well as the supported architectures.

### Goals
This article will cover:
- How stateful and stateless architectures affect an application, service, or server. 
- History of stateful and stateless architectures. 
- Protocols used by stateful and stateless architectures. 
- The difference and advantages of these architectures. 

Let's get started!

### Prerequisites
To follow along, you should:

1.  Be familiar with internet protocols such as HTTP, UDP, TCP DNS SMTP, FTP, TCP, POP3, and TELNET.

2.  Have a basic understanding of the difference between GraphQL, REST, and SOAP application programming interfaces (APIs) 

3.  Have some knowledge of networks bandwidths, servers, and clients.

### Introduction 
During the 1980s, servers handled most of the complex computations. Most client-side hardware were limited in the scope of operations that they could fulfill. 

However, as time passed, the internet became more popular and thus, led to the development of the Hypertext Transfer Protocol (HTTP), web browsers, and other client-side software and hardware.

Coincidentally, the rise in web usage led to an increase in the number of clients. This is because they could handle most of the functions previously performed on servers.

### What Are Stateful and Stateless Architectures 
Stateful and stateless architectures define how users interact with different services on the internet. 

Stateful-based services maintain track of clients' records or sessions. They apply different functionalities to similar user inputs based on previous records. 

On the other hand, stateless services rely on the clients to keep track of transaction data, focusing on operations that modify the system's resources instead of its state.

### Network protocols
The two types of network protocols are: 
- Stateful protocols. 
- Stateless protocols. 

### Examples of stateless protocols 
- The Hypertext Transfer Protocol (HTTP): The foundation of the World Wide Web.
- The User Datagram Protocol: Used in real-time services like video communication. 
- The Simple Mail Transfer Protocol: The foundation of email services.
- The Post Office Protocol is stateless across sessions.
- The Internet Protocol is the basis of the internet.

### Examples of stateful protocols
- The File Transfer Protocol (FTP). The traditional FTP server pairs with the client in an interactive session. A user is provided with a way to verify and set a few variables that are all stored on the server-side, as part of the session state.

- Telnet 
- The Transmission Control Protocol (TCP)

### API-based internet services and their relation to these architectures

The move from a stateful designed system to a stateless alternative is linked to application programming interfaces (APIs) and web apps. 

At the start of the 21st century, the popular design pattern was SOAP. This design pattern allowed the creation of stateful services and applications. 

RESTful services gained popularity to surpass SOAP's usage due to their stateless nature. However, their use was short as GraphQL is now the popular design. 

GraphQL outperforms the RESTful design pattern as it gives end-users the power to choose what data they wish to send to a server.

### Differences between stateless and stateful architectures
The main differences between the two architectures relate to handling user states and sessions. 

The table below highlights these differences.

**Stateless**|**Stateful**
:-----:|:-----:
It relies on clients to store session state information using cookies and local storage.| It depends on servers to store session state information.
Server design is simple as it does not handle most of the functionality.|Server design is complex as it handles a lot of functionality.
The server can process requests quickly as it only needs to look at the request passed to it. The request contains all the information the server needs to process.|The server handles user requests relatively slower than stateless-based servers. This is because the server must manage the state sessions on its own. Thus, responses get to the client much slower.
The server and client are independent and loosely coupled.|The server and client are dependent on each other.
Servers in this architecture are crash-proof. They can be restarted after a failure. Other servers could continue to handle a user request when a specific server handling it goes down.|Servers in this architecture do not recover quickly from a crash. They store session status and information about a client during sessions. So if they crash, the session has to start over.

### Advantages of stateless architecture
- A network's monitoring system does not need to read the information beyond a single request to comprehend it, which improves visibility. This is because the architecture handles every request in isolation.

- They simplify the design of the server since most functionality is handled client-side.

- It is reliable since it recovers from partial failures quickly. The server does not need to store any particular state or session; thus, a failed server can restart or transfer the client's request to another system.

- Scalability is achieved easily. Since the servers do not have to store session states. Therefore, the server can free resources to handle other incoming requests.

- They can handle multiple sessions simultaneously since every request is isolated.

- Memory usage on the server-side reduces because any information used to handle requests is not stored.

### Disadvantage of stateless protocols 
- Recurring poor network performances. This might occur when the redundant data in each request is increased. 

### Advantage of stateful architecture
- A stateful architecture adds a security layer to systems. This is why many banks rely on it to manage online transactions.

However, its disadvantages outweigh the benefits.

### The Disadvantages of Stateful Architecture
- It does not quickly recover from partial failures. When a server fails, it cannot restart or pass a user request to another server because it needs to hold the session state and data.

- It requires an intricate server design as many complex functions are handled on the server side.

- Too much dependency between the server and client. When one side fails, all connections are lost, and the running process has to start over.

### Conclusion
Today, most developers build their systems using a stateless design.

As a result, the server-focused stateful approach, in which clients were passive interfaces reliant on servers to perform most computing tasks, has lost popularity. This is due to its inability to scale, 

This explains why many people are adopting the stateless architecture.

Additionally, advances in technology, combined with the introduction of powerful client computers, promoted a shift to a stateless preferred environment. 

This allowed developers to spend their time and effort on product development rather than solving technical issues such as server software implementation, common in stateful-based systems.

---
Peer Review Contributions by: [Eric Kahuha](/engineering-education/authors/eric-kahuha/)