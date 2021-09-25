Applications and websites nowadays have millions of requests coming to them from end-users. The end-user expects that the application should serve them back with the correct images or texts requested. A component can fail or get overwhelmed by the incoming requests. It leads to a bad user experience. For the applications to perform and be available, we must include a load balancer in them. Before load balancing, there was a different approach to make applications available. The solution was to add servers to the infrastructure. It was too costly. Load balancing got introduced to solve the problem of cost. Balancing the load is done by a dedicated load balancer making the user experience great.

### Key takeaways:

At the end of the article the learner will be able to:

1. Understand what Load Balancing is.

2. Walk Through of How a Load Balancer Performs it Tasks

3. Know the Advantages of using Load balancers.

4. The different types of Load balancer algorithms that one can use in an application.

### What is Load Balancing.

In distributed systems, we usually have several servers that receive and respond to incoming traffic. Load Balancing becomes very important to such systems. It usually distributes traffic to a cluster of servers. Load balancing improves the application's availability and performance. At times the server is down or has an error. TheLoad Balancer will not send traffic to that server. Because it tracks the availability of a server as it distributes requests.

[](/loadbalancingzs.png/)

### Walk Through of How a Load Balancer Performs it Tasks

1. A user opens up a web page. Example section.io.

2. A request is made by the user. A frontend server receives the request and figures out where to forward the request. We will be discussing the various methods that one can use to determine how the request gets forwarded to the server. There is a point when there is no backend server available. In this case, the frontend server returns a predefined error message to the user. An example is the famous 404 error.

3. The backend server processes the request and sends a response back to the frontend server. Meanwhile, the backend server does report its status to the load balancer.

4. The frontend server returns the response to the user.

One can use load balancers on different layers of an application. It includes:

1. Between user and web server.

2. Between web servers and internal platform layers like cache or API servers

3. Between the API server layer and the database.

### The Advantages of Load Balancing in Applications.

1. Faster user experience. If a request is passed to a server that is down, it gets redirected immediately to an available server. Users won't have to wait for long for a response in such a case.

2. As a system administrator, one experiences a few failed or stressed components. Load balancing helps a lot. The load balancer has several devices that perform a little bit of work instead of one device.

3. Has an additional layer of security to an application.

4. Load balancers can encrypt incoming requests and decrypt outgoing responses so that the backend servers don't perform expensive operations.

5. Scalability is easier done with Load balancers. It is easy to keep the services up and running even when changing the server infrastructure.

6. At times, the application does not keep track of user sessions. A load balancer can come in and issue cookies. It enables the client requests to be routed to the correct instance.

### Load Balancer Algorithms

1. Round Robin:- It is the most used load balancing algorithm. It is easy to implement and easy to understand. How does it work? An example would be having two servers waiting for requests from a load balancer. When the first request comes, the load balancer will send that request to the first server. When a second request comes assuming from a different client, that request gets sent to the second server. At this point, we do not have additional servers. The second server is the last on the list of servers. As soon as the third request comes in, it gets redirected to the first server. The subsequent request will be redirected to the second server and so on in a cyclic fashion. This algorithm is ideal for servers with similar specs. In the event where the server specs are not identical, one of the servers will become overloaded. It leads to failure or downtime of the overloaded server.

2. Weighted Round Robin:- This algorithm almost resembles the previous one. That is Round Robin. The difference between the two is, in Weighted round robin, when we have a server with more specs than the rest, then that is the server that will be assigned more requests. We tell the load balancer beforehand which server has a higher capacity than the rest. Each node is usually given weight during the setup of the load balancer. For example, we have two servers with the weight of 5 and 2 . We have six incoming requests. The first 5 requests will be directed to the first server. The last request gets directed to the second server.

3. Least Connections:- You can find a situation where even though the servers have different weights, one server gets overloaded than the other. One reason could be that clients connected to server two stays longer than those connected to server one. It causes the total connections in server two to accumulate. The clients in server one are connecting and disconnecting almost at the same time. The weight remains the same. As a result, server two resources get depleted faster. In such circumstances, the least connection algorithm will be a great fit. The least connection considers the number of connections that are active for each server. When a request is made by a client the algorithm will determine which server has the least number of active connections and assign the new connection to that server.

4. IP Hash:- In this method, the Ip address of the client is hashed, and then the request is redirected to the server. The hashing algorithm generates uniformly random hash code. We, therefore, expect the server to have uniformly random codes.
