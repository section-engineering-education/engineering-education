Routing
When using the internet, our devices send requests to servers stored in some data center in form of packets. Likewise, the servers return back responses to the requests using data packets.
These packets' journey from the data center to our devices whether smartphones, laptops etc form the internet's backbone.
However, controlling these packets from the data source to the destination through the wide complicated global network is not a walk in the park.
This is where routing comes in. It is done by specialised networking hardware called routers.
Routers select an appropriate path that will ensure the packets arrive faster and safely.
Take an example of when one wants to get home situated in an estate from his/her workplace located in a city center. During rush hours, cities are usually characterised by traffic snarlups on their roads. The person will then use Google maps to check the route with less traffic and manouvre the way home.
In the same way, routers use algorithms to make logical data decisions to select appropriate paths for forwarding the packets. The decisions are made using the current network states of where the packets would pass through.

There are two types of routing:
Static
Dynamic

In static routing, the routing tables information don't change after being manually set up by a network administrator. In a case of a network break in the link, this information doesn't change unless the change is done manually.
This is the exact opposite of dynamic routing where the tables update themselves dynamically in discrete time steps according to the current network states such as link failures, traffic changes etc.
The Link state algorithm is used in dynamic routing. It basically checks the states of the links between nodes and make decisions.
Link State algorithm
Link state consists of two algorithms:
Dikjstra's shortest path algorithm
Reliable flooding algorithm

Dijkstra's algorithm
These algorithm is too wide to explain it in detail here. Here I will only discusss it briefly and later on, I will dive into it in detail in another article.
This algorithm was created by a Dutch computer scientist Edsger Wybe Dijkstra and with it routers find the shortest path between nodes in a network.
It starts with the source node and analyses the network using all parameters and finds the shortest path between it and other nodes.
Once a shortest path between a node and the source node, the node is marked as visited and sequentially added to the path.
The algorithm stores the currently known shortest path from each node to the source node and will update this information if it finds a shorter path.
This continues until all nodes are added and a path is established.
  An example
The algorithm will generate the shortest path from node 0 to all other nodes 1,2,3,4,5,6 in the graph assuming the weights of the graph represents distances between the nodes.

We have this list of distances initially.


We got zero as the first distance because it is the distance from the source node to itself.
Since other distances have not been determined yet, we show them using the infinity symbol.
We also have a list of visited nodes. We mark node 0 because we are starting with it. 
{0}

In the diagram, we mark a visited node by adding a red border around it.


We start checking the distance of adjacent nodes to 0(nodes 1 & 2).
We only add a node if the distance between node 0 and the node if the shortest.
From 0 to 1, the distance is 2 while from 0 to 2, the distance is 6. Clearly, the distance to node 1 is the shortest, so we add node 1 to the path.

We then mark 1 as visited and add it to the path.

{0,1}


Next nodes are 2 and 3. 
From 0-1-3 is (2+5) = 7.
From 0-2 is 6.
We will choose a node with the shortest distance to node 0 which is 2.
 This will continue till all the bodes are marked as visited and added.



{0,1,2}

The final result will be this:


{0,1,2,3,4,5,6}

Reliable flooding algorithm
As the name suggests, it floods each router in a network with all other neighbouring routers information such as the IP addresses, costs of the network, health of the networks etc using link state packets of the routers.
 Take for example in a LAN with 5 routers A, B, C, D, E .

Each router has its state info which it passes to its neighbour. A will send to B. B to C and D until all of them have all the states.
They can then independently apply the Dijkstra's algorithm to foward packets.
This is not always the case with interconnected routers as shown below where the process of passing the link states goes on and on without stopping hence creating a condition called looping e.g A will pass its packet to B, B then forwards it to C and C passes it again to A.

A unique ID is given to each link state packets so that this problem is overcome.
When C and B receives the packet from A , C does not send it again to B and B does not send it to C.
At the global level, applying flooding can be unachievable therefore protocols are required to help in implementing it.
I will talk about one, the OSPF(Open Shortest Path First) protocol.
This protocol divides the wide networks into local areas forming a backbone area which shares atleast one router from the bordering areas. These shared routers form the border routers.
Flooding occurs at these local areas and when a packet needs to go to another local area, it will pass through the backbone area.
This helps in reducing the size of the routing tables and improves the scalability of the network.


That's all for now. We have seen how routers do packets forwarding hence enabling communication take place. Let's meet at my next article which talks about the Dijkstra's algorithm in detail.
