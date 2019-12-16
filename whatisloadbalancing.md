## What is Load Balancing

Modern internet infrastructure requires multiple computers to serve a website or internet application reliably around the globe. But each of these computers has a different external IP address. While this would not be a problem if all of the computers hosted a different application, DNS (Domain Name Server) and mobile applications rely on a single IP to connect to.

### What Does a Load Balancer Do?
According to [NGINX](https://www.ngnix.com/resources/glossary/load-balancing/), "a load balancer acts as the "traffic cop" sitting in front of your servers and routing client request across all servers capable of fulfilling those requests in a manner that maximizes speed and capacity utilization and ensures that no one server is overworked, which could degrade performance."

Since modern web application could serve hundreds of thousands of concurrent requests. These applications must return the correct and desired information to the client. By adding more than one server to serve this information, a load balancer is placed into function. [NGINX](https://www.ngnix.com/resources/glossary/load-balancing/) says that the main functions of a load balancer are:

<ul>
  <li>Distribute client requests or network load efficiently across multiple servers</li>
  <li>Ensures high availability and reliability by sending requests only to servers that are online</li>
  <li>Provides the flexibility to add or subtract servers as demand dictates</li>
</ul>

### What Are Some of the Common Load Balancing Algorithms?
A load balancer has to determine how to route the incoming traffic to one of the available servers. To do this, they will follow an algorithm, which can range from simple to very complex. 

<ul>
  <li>Round Robin</li>
  <ul>
    <li>Round Roving is a simple algorithm where the Load Balancer forwards traffic to each server in its system in a known and given order.
  </ul>
  <li>Least Connections</li>
  <ul>
    <li>With this algorithm, whenever a new request comes in, it is forwarded to the server with the fewest current connections.</li>
  </ul>
  <li>IP Hashing</li>
  <ul>
    <li>This method determines where the request is forwarded to by the hash of the IP address. By using this algorithm, Load Balancers can automatically forward repeat users (from the same computer) to the same server. These types of systems can help sites like those that have shopping carts and store that information on the server.</li>
  </ul>
</ul>
  
Many modern internet applications require the use of Load Balancers due to the immense amount of traffic. By adding a load balancer to a web application you not only increase the amount of servers that support a single application, but you also increase the reliably of an application due to backups and fallback servers. This system allows for sites like Google and Amazon to have a high online time, with almost no downtime by relying on a multitude of computers networked together with a Load Balancer.
