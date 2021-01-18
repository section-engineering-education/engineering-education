### Dijkstra's Shortest Path Algorithm using Python

In this article, we are going to talk about how Dijkstra's algorithm finds the shortest path between nodes in a network and use a Python script in illustrating the same.

We shall first talk about basic graph concepts because we are going to use them in this article.

#### A basic introduction to Graphs

Graphs are pictorial representations of data structures used to show connections between pairs of elements. The graphs in our case represent a network topology. The connections are referred to as **edges** while the elements are called **nodes**.
We have three types of graphs:
- **Undirected:** You can move using the edges towards any direction.
- **Directed:** The direction you can move is specified and shown using arrows.
- **Weighted:** The edges of weighted graphs denote a certain metric like distance, time taken to move using the edges.

#### Dijkstra's Shortest Path algorithm

These algorithm is used to calculate and find the shortest path between nodes using the weights given in a graph. (In a network, the weights are given by link state packets and contain information such as the health of the routers, traffic costs etc).

##### Summary of the working

It starts with the source node and finds the rest of the distances from the source node.
Dijkstra's algorithm keeps track of the currently known distance from the source node to the rest of the nodes and dynamically updates these values if a shorter path is found.

A node is then marked as **visited** and added to the path if the distance between it and the source node is the shortest. This continues until all the nodes have been added in the path and finally we get a shortest path from the source node to all other nodes which packets in a network can follow to their destination.

- We need **positive** weights because they have to be added in the computations to achieve our goal. Negative weights would make the algorithm not to give the desired results.

#### An example illustrating the working of the algorithm

The source node here is node **0**. We assume the weights show the distances.

Initially we have this list of distances. We mark the initial distances as INF(infinity) because we have not yet determined the actual distance except for node 0 because the distance from the node 0 to itself is 0.

|NODE|DISTANCE|
---|---|
0|0
1|INF
2|INF
3|INF
4|INF
5|INF
6|INF

We also have a list to keep track of the visited nodes only and since we have started with node 0, we add it to the list.

**{0}**



