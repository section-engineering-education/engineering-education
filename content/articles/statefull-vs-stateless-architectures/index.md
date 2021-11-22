
When developing applications and services, developers consider various factors to ensure their applications run in the most optimum way. A few of the factors that developers consider when developing an application or internet service include the scalability of the application/service; the hardware needs such as networks speed and bandwidth required by the application, the amount of storage both temporary and permanent and, the processing time of these applications which is mostly determined by processor speed and application building architecture.

### Learning Points 
The article will cover:
-	How stateful and stateless architectures affect the running of an application/ service on a server. 
-	A short history to get you acquainted with what stateful and stateless application/ services mean. 
-	The various protocols utilize each of the listed architectures. 
-	The difference between the architectures 
-	The advantages and disadvantages of the two architectures. 
Let's get started!

### Prerequisite
1.	You should know internet protocols such as HTTP, UDP, TCP DNS SMTP, FTP, TCP, POP3 and TELNET as I will only feature a basic discussion of these protocols within the article.
2.	Have a basic understanding of the difference between Graph QL, REST and SOAP application programming interfaces (APIs) 
3.	You should have founding knowledge of networks bandwidths, servers, and clients.

### A Bit of History
Before the late 1990s,  computers were limited in hardware and software, leaving powerful servers to do all of the heavy liftings. However, as time passed, a global increase in web usage led to the development of the Hypertext Transfer Protocol (HTTP), web browsers, and other client-side software and hardware. 
Coincidentally, the rise in web usage led to an increase in the number of clients, as the clients could also handle many of the functions previously performed on servers.

### What Are Stateful And Stateless Architectures 
These are the architectures that dictate the user experiences in specific ways in services. Services that utilize stateful architecture keep track of user transactions or sessions and react differently to similar user inputs based on that history. However, with stateless architecture, services depend on clients/endpoints to maintain sessions and centre around processes that manipulate resources rather than the state.

Generally, the line that separates the two architectures is that which defines how they handle states. In stateful architecture, additional information is stored server-side, recording the current session's state and waiting for the next instructions. 

In stateless architecture, additional information is stored on the client-side, carrying different information with each session 'reminding' the server of the previous sessions. Practically, this is commonly implemented using cookies or local storage.

### Network Protocols and Their Architectures
Network protocols are divided into two: stateful protocols and stateless protocols. Whether a protocol is stateful or stateless depends on how long the state of interaction with it is being recorded and how that information needs to be stored.

The receiver cannot keep the session state from preceding requests in a stateless network protocol. The sender (or server) sends an important session state to the receiver while ensuring that every request can be processed in isolation, meaning without linking with the session state from past demands kept by the receiver. They do not have to depend or wait on recommendations that follow.

### Examples of Stateless Protocols 
- The Hypertext Transfer Protocol (HTTP): The foundation on which the World Wide Web was built.
- The User Datagram Protocol: Used in real-time services like video communications 
- Domain Name System (DNS), 
- The Simple Mail Transfer Protocol – the foundation of email services,
-The Post Office Protocol – which is stateless across sessions
- The Internet Protocol, which, as the name suggests, is the basis of the internet.
On the other hand, the receiver can keep session state/status info from the previous requests in a stateful network protocol.

### Examples of Stateful Protocols 
- The File Transfer Protocol (FTP).
> The traditional FTP server couples with the client in an interactive session where while in session, a user is provided with a way to verify and set a few variables, all stored server-side, as part of the session state.
- Telnet.
- The Transmission Control Protocol (TCP).

### API-Based Internet Services and Their Relation to Stateful and Stateless Architectures
The move to switch from the traditional stateful to stateless architecture is linked to the popularity of the diverse ways of building application programming interfaces (APIs) and web apps. Simple Object Access Protocol (SOAP) was the most popular at the beginning of the 21st century. SOAP allowed the creation of stateful architectures, and that is what many services and applications followed. 

RESTful services utilize the Representational State Transfer, or REST design pattern followed a practice that was always stateless and became even more popular, overshadowing SOAP. Graph QL is becoming more popular in design. Like RESTful services, Graph QL-based services are completely stateless, and they grant clients much more control over which data is fetched from the servers.

### Differences Between Stateless and Stateful Architectures
The main difference between the two architectures is how they handle user states and sessions. The differences between the two areas are highlighted in the table below:
**Stateless**|**Stateful**
:-----:|:-----:
Rely on clients to store session state information using cookies and local storage.|Rely on servers to store session state information.
Server design is simple as it does not handle most of the functionality.|Server design is complex as it handles a lot of complexity
The server handles requests much faster as it does not need to look beyond the single request sent to it as the request contains all the information the server needs to handle it.|The server handles user requests relatively slower compared to stateless architectures servers. The server has to manage the state sessions all on its own, thus, a response gets to the client much slower.
The server and client are independent and loosely coupled.|The server and client are dependent on each other.
Servers in this architecture are crash-proof. They can be restarted after a failure. The other servers could continue to handle a user request when the server handling it goes down.|Servers in this architecture do not recover easily from a crash. They store session status and information about a client during sessions. So if they crash, the session has to start over.

### Advantages Stateless Architecture
1.	A network's monitoring system does not need to read the information beyond a single request to comprehend it, which improves visibility. This is because, every request is handled in isolation.
2.	They simplify the design of the server since most functionality is handled client-side.
3.	It is very reliable as it recovers from partial failures easily. The server does not need to store any particular state or session; thus, a failed server can restart or transfer the client's request to another server of the same organization.
4.	Scalability is achieved easily. Since the servers do not have to store session states, resources can be freed to handle other incoming requests.
5.	They can easily handle multiple sessions simultaneously since every request is isolated.
6.	Memory usage on the server-side is reduced. This is because the information used to handle requests is not stored there.

### Disadvantages of Stateless Protocols 

Recurring poor network performances. This might occur when increasing the redundant data sent in sequences of requests. Remember, we mentioned that data is not left on the server in a stateless network architecture.

### Advantages of Stateful Architecture

Stateful architecture may add a security advantage to systems. That is why many banks rely on it to allow users to make online transactions. 

### Disadvantages of Stateful Architecture

1.	It does not easily recover from partial failures. When a server fails, it cannot just restart or pass a user request to another server because it needs to hold the session state along with the details.
2.	As much of the complex functionality is handled server-side, an intricate server design is needed to design the server.
3.	Too much dependency between server and client that when one side fails, all connections are lost, and the running process has to start over.

### Conclusion
Stateful architecture only made sense in a server-focused world where clients were merely passive interfaces dependent on powerful servers. Now that our clients have more computational power with better software and web services are often required to scale to millions of users, both design patterns and software have seen the need to evolve. Most software companies have already made a move from stateful to stateless architectures. This allows them to have more time to focus majorly on the product than on technical issues like server software implementation. It also allows them to scale just in case their products explode in the market easily.
