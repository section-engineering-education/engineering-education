Applications and websites nowadays have millions of requests coming to them from end-users. The end-user expects that the application should serve them back with the correct images or texts requested. A component can fail or get overwhelmed by the incoming requests. It leads to a bad user experience. For the applications to perform and be available, we must include a load balancer in them. Before load balancing, there was a different approach to make applications available. The solution was to add servers to the infrastructure. It was too costly. Load balancing got introduced to solve the problem of cost. Balancing the load is done by a dedicated load balancer making the user experience great.

### Key takeaways:

At the end of the article the learner will be able to:

1. Understand what Load Balancing is.

2. Walk Through of How a Load Balancer Performs it Tasks

3. Know the Advantages of using Load balancers.

4. The different types of Load balancer algorithms that one can use in an application.

### What is Load Balancing.

To understand the concept of load balancing, we will use a scenario of a website that gets quickly famous in a short time. Let's say we have a machine that hosts mywebsite.com. It is associated with a public-facing IP address of e.g. 1.2.3.4 to keep things simple. We have a user that wants to access the application through a domain name that is mapped to the IP address. The user makes a request and receives a response from the server. This works well for just a single user. Taking that single user and multiplying by let us say, 100,000 users. You will have 100,000 requests coming to the server. When these requests come in very fast over some time, the individual machine gets overworked and explodes. It won't be able to handle any more traffic. To solve this kind of problem, one may think of introducing a new machine. This machine will have a different public-facing IP address of let us say 5.6.7.8. Instead of users having to hit this first machine, others can be directed to the second machine. This too has a problem. How does one know which machine to hit? This is where load balancing comes to play. 

A load balancer is a component that sits between application servers like the two servers described above and the request that comes from the users. Instead of the IP of the servers being public, we convert them to private so that they are not exposed to the public internet. We then give the load balancer a public IP address e.g. 6.7.8.9. When the user makes requests to the application, the DNS resolution is going to point to the load balancer IP address. When the request comes to the load balancer, it already knows which IP addresses of the application servers are available to receive requests. It, therefore, decides which server to route the traffic to.

[](/loadbalancingzs.png/)

### Walk Through of How a Load Balancer Performs it Tasks

1. A user opens up a web page. Example section.io.

2. A request is made by the user. A frontend server receives the request and figures out where to forward the request. 

3. The backend server processes the request and sends a response back to the frontend server. Meanwhile, the backend server does report its status to the load balancer.

4. Finally the frontend server returns the response to the user.

One can use load balancers on different layers of an application. It includes:

1. Between user and web server.

2. Between web servers and internal platform layers like cache or API servers

3. Between the API server layer and the database.

### The Advantages of Load Balancing in Applications.

1. Faster user experience. If a request is passed to a server that is down, it gets redirected immediately to an available server. Users won't have to wait for long for a response in such a case.

2. Easy maintenance is achieved. This is because, with the software load balancer, no upgrade is needed. In case of a failure, another instance of the load balancer or server can be put up automatically to service. 

3. Has an additional layer of security to an application. The ability of a load balancer to distribute traffic across a cluster of servers can prevent attacks such as Distributed Denial of Service (DDoS). When one server is overloaded by a DDos, the load balancer will avoid that server. It will push traffic to the rest of the servers apart from the one that has been attacked. This way, the load balancer will eliminate a single point of application failure and reduce the chances of other servers being attacked. 

4. Load balancers can encrypt incoming requests and decrypt outgoing responses so that the backend servers don't perform expensive operations by doing the encryption and decryption on backend servers.

5. Scalability is easier done with Load balancers. It is easy to keep the services or application up and running even when changing the server infrastructure. When there is a need by an organization to change its infrastructure, applications that have load balancers will not be affected by such changes. They still will continue functioning as before. Scaling up and down depending on the processes performed on the servers is easily achievable. 

6. At times, the application does not keep track of user sessions. A load balancer can come in and issue cookies. The cookies enable the client requests to be routed to the correct server instance.


### Load Balancer Algorithms

1. Round Robin:- It is the most used load balancing algorithm. It is easy to implement and easy to understand. How does it work? An example would be having two servers waiting for requests from a load balancer. When the first request comes, the load balancer will send that request to the first server. When a second request comes assuming from a different client, that request gets sent to the second server. At this point, we do not have additional servers. The second server is the last on the list of servers. As soon as the third request comes in, it gets redirected to the first server. The subsequent request will be redirected to the second server and so on in a cyclic fashion. This algorithm is ideal for servers with similar specs. In the event where the server specs are not identical, one of the servers will become overloaded. It leads to failure or downtime of the overloaded server.

2. Weighted Round Robin:- This algorithm almost resembles the previous one. That is Round Robin. The difference between the two is, in Weighted round robin, when we have a server with more specs than the rest, then that is the server that will be assigned more requests. We tell the load balancer beforehand which server has a higher capacity than the rest. Each node is usually given weight during the setup of the load balancer. For example, we have two servers with the weight of 5 and 2 . We have six incoming requests. The first 5 requests will be directed to the first server. The last request gets directed to the second server.

3. Least Connections:- You can find a situation where even though the servers have different weights, one server gets overloaded than the other. One reason could be that clients connected to server two stay longer than those connected to server one. It causes the total connections in server two to accumulate. The clients in server one are connecting and disconnecting almost at the same time. The weight remains the same. As a result, server two resources get depleted faster. In such circumstances, the least connection algorithm will be a great fit. The least connection considers the number of connections that are active for each server. When a request is made by a client the algorithm will determine which server has the least number of active connections and assign the new connection to that server.

4. IP Hash:- In this method, the Ip address of the client is hashed, and then the request is redirected to the server. The hashing algorithm generates uniformly random hash code. We, therefore, expect the server to have uniformly random codes. Therefore, the IP address of the user is used to determine which server we should direct our request to. 
