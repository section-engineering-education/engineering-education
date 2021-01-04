![hero.jpg](/engineering-education/the-evolution-of-resource-sharing-technologies-over-the-internet/hero.jpg)

With the growth of the internet and the web, there has always been a need for resource sharing and collaboration. We could work more effectively through collaborating with others. This often involved the sharing or interaction of various software products. There was a need for distributed computing. However, one of the biggest challenges of distributed computing was how to get software components located in different geographic locations to interact in a standardized way. Several technologies were created to try and meet this need.

### 1. CORBA OMG

[CORBA](https://en.wikipedia.org/wiki/Common_Object_Request_Broker_Architecture), which stands for the Common Object Request Broker Architecture (CORBA), is a standard defined by the Object Management Group (OMG). It is a distributed object which provides an interchange that enables collaboration between systems on different operating systems, programming languages, and computing hardware. It uses an object-oriented model, although the systems that use the CORBA do not have to be object-oriented. The object request broker (ORB) allows clients to call methods from a remote object. In simple terms, it helps objects make a request to and get responses from one another, whether on the same machine or across the network. This was made possible using the CORBA Interface Definition Language (IDL).

While the CORBA standard was very promising, several issues were encountered. The biggest of which was the poor implementation of the standard. Also, there was quite a bit of politics brought about by competing vendors, who tried to steer the standard in a particular direction. The standard was also a bit too complex.

CORBA was built with the aim of:
 - Improve the use of distributed systems.
 - It is currently used in Object-oriented programming
 - Allowing multiple programming languages to communicate with each other

### 2. DCOM

Stands for [Distributed Component Object Model](https://en.wikipedia.org/wiki/Distributed_Component_Object_Model). It is a proprietary Microsoft technology for communication between software components on networked computers. DCOM was a major competitor to CORBA. These technologies saw them as one day becoming the model for code and service-reuse over the internet. Being based on the Component Object Model (COM) allowed clients and servers to communicate in the same computer through a set of interfaces. However, both these technologies (DCOM and CORBA) faced crippling difficulties when working with internet firewalls.

### 3. Java RMI

RMI stands for [Remote Method Invocation](https://www.javatpoint.com/RMI). It is an API that provides a mechanism to create distributed applications in java. The RMI allows a java object to invoke methods on remote java objects running in different [JVMs](https://www.guru99.com/java-virtual-machine-jvm.html) (Java Virtual Machines). RMI's design was later enhanced to accommodate CORBA. This now meant that Java objects could interact with remote non-Java objects.

### 4. Web Services

A [web service](https://en.wikipedia.org/wiki/Web_service) is a standards-based, language-agnostic software entity that accepts specially formatted requests from other software entities on remote machines via vendor and transports neutral communication protocols, producing application-specific responses. Simply put, a web service is an API that facilitates standards-based application-to-application communication. Unlike CORBA, DCOM, or RMI, which rely on binary messaging, it is harder to play well with many internet technologies - web services use human-readable messaging. This is the key advantage web services have over the preceding technologies. There are two types of web services commonly used, namely SOAP and REST web services.

 * **SOAP Web Services**

    SOAP stands for Simple Object Access Protocol. It is a messaging protocol for interchanging data in a decentralized and distributed environment. SOAP works with many application-layer protocols, namely, HTTP, SMTP, TCP, or UDP. SOAP relies exclusively on the XML format to provide messaging services. The protocol is built with Security, authorization, and error-handling in mind.

    SOAP is more suitable for enterprise-level web services that require high security and transactions that are highly complex. SOAP is commonly used in financial services, payment gateways, telecommunication services, etc. It most common API being PayPal's API, which allows payment through PayPal services or credit card.

* **REST Web Services**

    REST stands for Representational State Transfer. It is relatively new and has quickly become very popular. Developers usually find SOAP burdensome to use. For example, working with SOAP in JavaScript means converting even the simplest of tasks into the required XML structure.

    On the other hand, REST allows API providers to deliver data in multiple formats such as plain text, HTML, XML, YAML, and JSON. This is one of the most loved features of REST. Due to the human-readable format and being lightweight, REST has gained a lot of traction. Despite its name, we can use JSON with any programming language - not just JavaScript.

    REST, however, can only use the HTTP protocol for data transmission. REST also does not prescribe how to implement its principles at a lower level. Instead, it provides guidelines in the form of architectural principles or constraints but does not enforce them. Web services built following the REST architectural principles are called RESTful web services. To create a REST API, you need to follow five architectural principles:

    1. **Uniform Interface** - Requests from different clients should look the same. That is, the same resources should not have more than one URI.
    2. **Client-Server Separation** - The client and the server should not act as one but should be independent, which means that their only form of interaction is through requests and responses.
    3. **Statelessness** - There should not be any server-side sessions. A single request should contain all the information the server needs to know.
    4. **Cacheable resources** - Server responses should contain information about whether the data they send is cacheable or not.
    5. **Layered System** - There might be several layers of servers between the client and the server that returns the response. This should not affect either the request or the response.

### Conclusion

In this article we discuss the different methods that have been implemented over the years to enable resources sharing over the internet. From this we can take away that the technologies change over time depending on the data transferred and its current application. The future could hold far better resource sharing technologies than what we currently have.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
