### Understanding Network Routing

![Routing](/engineering-education/network-routing/routing.jpeg)

When using the internet, our devices send requests to servers stored in various data centers in form of packets. Likewise, the servers return responses to the requests using data packets.</br>
These packets' journey to the data center from our devices and vice versa form the internet's backbone.</br>
Nevertheless, controlling these packets from the data source to the destination through the wide complicated global network is not a walk in the park.</br>
This is where routing comes in. It is done by specialized networking hardware called **routers**.</br>
Routers select an appropriate path that will ensure the packets arrive faster and safely.</br>

Take an example of when one wants to get home situated in an estate from his/her workplace located in a city center. During rush hours, cities are usually characterized by traffic snarl-ups on their roads. The person will then use Google maps to check the route with less traffic and maneuver all the way home.</br>
In the same way, routers use algorithms to make logical data decisions for selecting appropriate paths for forwarding the packets. The decisions are made using the current network states of where the packets would pass through.

There are two types of routing:</br>
- **Static**</br>
- **Dynamic**</br>

In **static routing**, *the routing tables information don't change after being manually set up* by a network administrator. In a case of a network break in the link, this information doesn't change unless the change is done manually.</br>
This is the exact opposite of **dynamic routing** where *the tables update themselves dynamically in discrete time steps according to the current network states* such as link failures, traffic changes, etc.</br>
A commonly used algorithm in dynamic routing is the **Link State algorithm**. It checks the states of the links between nodes and makes forwarding decisions.</br>
Let's discuss it.</br>
**Link State algorithm**</br>
Link state consists of two algorithms:</br>
- **Dijkstra's shortest path algorithm**</br>
- **Reliable flooding algorithm**</br>

***Dijkstra's algorithm***
I will briefly discuss this algorithm for it is too wide to explain in detail here. Later on, I will dive into it in detail in my next article.</br>
This algorithm was created by a Dutch computer scientist **Edsger Wybe Dijkstra** and with it, routers find the shortest path between nodes in a network.</br>
It starts with the router at the source node and analyses the network using all the parameters and finds the shortest path between it and other nodes.</br>
Once the shortest path between a node and the source node, the node is marked as **visited** and sequentially **added to the path**.</br>
The algorithm stores the currently known shortest path from each node to the source node and it will update this information if it finds a shorter path.</br>
This continues until all nodes are added and a path is established.</br>

*Example*</br>
The algorithm will generate the shortest path from node 0 to all other nodes 1,2,3,4,5,6 in the graph assuming the weights of the graph represents distances between the nodes.

![Graph1](/engineering-education/network-routing/routing1.png)

We have this list of distances initially.

|NODE|DISTANCE|
---|---|
0|0|
1|inf|
2|inf|
3|inf|
4|inf|
5|inf|
6|inf|

We got zero as the first distance because it is the distance from the source node to itself.
Since other distances have not been determined yet, we assume them to be infinite *(inf)*.
We also have a list of visited nodes. We mark node 0 because we are starting with it. 
(In the graph, we mark a visited node by adding a red border around it.)

**{0}**

![Graph2](/engineering-education/network-routing/routing3.png)

We start checking the distance of adjacent nodes to 0 (nodes 1 & 2).
We only add a node if the distance between node 0 and the node is the shortest.
From node 0 to node 1, the distance is 2 while from 0 to 2, the distance is 6. The distance to node 1 is the shortest, so we add node 1 to the path.</br>
*(We will mark added nodes by adding an asterisk beside them)*

![Graph3](/engineering-education/network-routing/routing4.png)

We then mark node 1 as visited and add it to our list. We add node 2 for we know its distance but we will mark it since it is not yet visited.

|NODE|DISTANCE|
---|---|
0|0 *|
1|2 *|
2|6|
3|inf|
4|inf|
5|inf|
6|inf|

**{0,1}**


The next nodes are node 2 and node 3. 
The distance 0-1-3 is (2+5) = 7.
The distance between 0-2 is 6.</br>
We will choose a node with the shortest distance from node 0 which is node 2.</br>

![Graph4](/engineering-education/network-routing/routing6.png)

|NODE|DISTANCE|
---|---|
0|0 *|
1|2 *|
2|6 *|
3|inf|
4|inf|
5|inf|
6|inf|

 This will continue till all the nodes are marked as visited and added.

**{0,1,2}**

The final result will be this:

![Graph5](/engineering-education/network-routing/routing8.png)


|NODE|DISTANCE|
---|---|
0|0 *|
1|2 *|
2|6 *|
3|7 *|
4|17 *|
5|22 *|
6|19 *|

**{0,1,2,3,4,5,6}**

***Reliable flooding algorithm***
As the name suggests, *it floods each router in a network with all other neighboring routers network state information* such as the IP addresses, costs of the network, the health of the networks, etc using **link-state packets** of the routers.</br>

 Take for example a LAN with 5 routers A, B, C, D, E.

![LAN-1](/engineering-education/network-routing/LAN-1.png)

Each router has its state info which it passes to its neighbors. A will send to B. B to C & D and so on until all of them have all the states.</br>
They can then independently apply Dijkstra's algorithm to forward packets.</br>
That said, this is not always the case with interconnected routers as shown below where the process of passing the link state packets goes on and on without stopping hence creating a condition called **looping** e.g A will pass its packet to B, B then forwards it to C and C passes it again to A.

![LAN-2](/engineering-education/network-routing/LAN-2.png)

A **unique ID** is given to each link-state packets so that this problem is solved.
When C and B receives the packet with the unique ID from A, it (A) does not send it again to B and B does not send it to C.</br>

At the global level, applying reliable flooding can be unachievable therefore protocols are required to help in implementing it.</br>
I will talk about one, the **OSPF**(Open Shortest Path First) protocol.</br>
This protocol divides the wide networks into **local areas** forming a **backbone area** which shares at least one router from the bordering local areas. These shared routers form the **border routers**.</br>
Flooding *occurs in these local areas* and when a packet needs to go to another local area, it will pass through the backbone area.</br>
This helps in reducing the size of the routing tables and improves the scalability of the network.

That's all for now. We have seen how routers do packet forwarding hence enabling communication to take place. Let's meet at my next article which talks more about Dijkstra's algorithm in detail.
