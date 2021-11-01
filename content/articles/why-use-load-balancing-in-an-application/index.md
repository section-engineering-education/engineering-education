---
layout: engineering-education
status: publish
published: true
url: /why-use-a-load-balancer-in-an-application/
title: Why Use a Load Balancer in an application.
description: This article will explain how to improve user experience using a load balancer in an application.
author: margaret-sitati
date: 2021-10-28T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-use-load-balancing-in-an-application/hero.jpg
    alt: Why Use Load Balancing in an Application Hero Image
---
Applications and websites nowadays have millions of requests coming in from end-users. End-users expect that the application responds with the correct images or texts requested.

<!--more-->

Application components can fail or get overwhelmed by the incoming requests. It leads to a bad user experience. For the applications to perform and be available, we must include a load balancer in them. 

Before load balancing, there was a different approach to making applications available. The solution was to add servers to the infrastructure, which was uneconomic. When load balancing was introduced, the problem of cost was solved. Balancing the load is done by a dedicated load balancer which improves user experience.

### Key takeaways:

At the end of the article the learner will be able to:

1. Understand what load balancing is.

2. Walk through of how a load balancer performs its tasks.

3. Know the advantages of using load balancers.

4. Know the different types of load balancer algorithms that one can use in an application.

### What is Load Balancing?

To understand the concept of load balancing, we will use a scenario of a website that gets famous in a short time. 

Let's say we have a machine that hosts `mywebsite.com`. It is associated with a public-facing IP address of e.g. `1.2.3`.4 to keep things simple. We have a user that wants to access the application through a domain name that is mapped to the IP address. The user makes a request and receives a response from the server. The response will be delivered fast. This works well for a single user. 

Taking that single user and multiplying by let us say, `100,000` users. You will have 100,000 requests coming to the server. The requests can come in very fast. This causes the individual machine to get overworked and explode. It won't be able to handle any more traffic. 

To solve this kind of problem, one may think of introducing a new machine. This machine will have a different public-facing IP address of say `5.6.7.8`. Instead of all users having to hit the first machine, others can be directed to the second machine. This too has a problem. How does one know which machine to hit? This is where load balancing comes to play. 

A load balancer is a component. It sits between application servers and the request that comes from the users. 

With load-balancing, the IP of the servers becomes private. They won't be exposed to the public-facing internet. The load balancer is then given a public IP address e.g. `6.7.8.9`. At this point, the users make requests. The DNS resolution is going to point to the load balancer IP address. The load balancer will then know which IP addresses of the application servers are available to receive requests. It, thus, decides which server to route the traffic to.

![image of a load balancer](/engineering-education/why-use-load-balancing-in-an-application/loadbalancing.png/)

### A walk through of how an application load balancer performs its tasks

1. A user opens up a web page. Example `section.io`.

2. A request is made by the user. A frontend server receives the request and figures out where to forward the request. 

3. The backend server processes the request and sends a response to the frontend server. Meanwhile, the backend server reports its status to the load balancer.

4. Finally the frontend server returns the response to the user.

One can use load balancers on different layers of an application. It includes:

1. Between a user and a web server.

2. Between web servers and internal platform layers like cache or API servers

3. Between the API server layer and the database.

### Advantages of load balancing in applications.

1. Faster user experience. If a request is passed to a server that is down, it gets redirected immediately to an available server. Users won't have to wait for long for a response in such a case.

2. Easy maintenance. With the software load balancer, no upgrade is needed. In case of a failure, another instance of the load balancer or server can be put up to service. 

3. Has an extra layer of security to an application. Load balancers can distribute traffic across a cluster of servers. It helps prevent attacks such as Distributed Denial of Service (DDoS). When one server is overloaded by a DDos, the load balancer will avoid that server. It will push traffic to the rest of the servers apart from the one that is attacked. It also cut a single point of application failure.

4. Load balancers can encrypt incoming requests and decrypt outgoing responses. Thus, the backend servers don't perform expensive operations. Encrypting and decrypting requests on the server itself is expensive. 

5. Scalability is easier done with load balancers. An organization may want to change its infrastructure. Applications that have load balancers will not be affected by such changes. The application will continue functioning as before. Scaling up and down the servers is achievable. 

6. At times, the application does not keep track of user sessions. A load balancer can come in and issue cookies. The cookies enable the client requests to be routed to the correct server instance.

### Load Balancer Algorithms

1. Round Robin:- It is the most used load balancing algorithm. It is easy to implement and easy to understand. 
   
   **How does it work?** 

    An example would be having two servers waiting for requests from a load balancer. When the first request comes, the load balancer will send that request to the first server.

    A second request comes assuming from a different client. That request gets sent to the second server. At this point, we do not have more servers. The second server is the last on the list of servers. 

    As soon as the third request comes in, it gets redirected to the first server. The next request will be redirected to the second server and so on in a cyclic manner. 

    This algorithm is ideal for servers with similar specifications. In the event where the server specs are not identical, one of the servers will become overloaded. It leads to failure or downtime of the overloaded server.

2. Weighted Round Robin:- This algorithm almost resembles the previous one. That is Round Robin. Sometimes, we do have servers with different specifications. With the Weighted Round robin, it looks at the server that has more specs than the rest. That is the server that requests will be routed to. 

     We inform the load balancer beforehand which server has a higher capacity than the rest. Each node is usually given weights during the setup of the load balancer. For example, we have two servers with the weight of 5 and 2 . We have six incoming requests. The first 5 requests will be directed to the first server. The last request gets directed to the second server.

3. Least Connections:-  Servers with different weights do get overloaded as well.  One reason could be that clients connected to server two stay longer than those connected to server one. It causes the total connections in server two to accumulate. The clients in server one are connecting and disconnecting almost at the same time. Thus, the weight remains the same. As a result, server two resources get depleted faster. In such circumstances, the least connection algorithm will be a great fit.

     It considers the number of connections that are active for each server. A request is made by a client. The algorithm will determine which server has the least number of active connections and assign the new connection to that server.

4. IP Hash:- In this method, the Ip address of the client is hashed, and then the request is redirected to the server. The hashing algorithm generates uniformly random hash code. We therefore expect the server to have uniformly random codes. Therefore, the IP address of the user is used to determine which server we should direct our request to. 

### Conclusion

A load balancer increases the reliability of an application. It should thus be prioritized when implementing a software solution.

Hope you find this helpful

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
