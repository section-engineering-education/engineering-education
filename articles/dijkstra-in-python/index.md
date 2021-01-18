### Dijkstra's Shortest Path Algorithm using Python

In this article, we are going to talk about how Dijkstra's algorithm finds the shortest path between nodes in a network and use a Python script in illustrating the same.
A basic understanding of Python and its OOP concepts is needed.

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

We also have a list to keep track of the visited nodes only and since we have started with node 0, we add it to the list(We denote a visited node by adding an asterisk beside it in the table and a red border around it on the graph).

**{0}**

We check the distances 0 > 1 and 0 > 2 which are 2 and 6 respectively. We first update the distances from node 1 and 2 in the table.

|NODE|DISTANCE|
---|---|
0|0
1|2
2|6
3|INF
4|INF
5|INF
6|INF

We then choose the shortest one which is 0 > 1 and mark node 1 it as visited and we add it to the visited path list.

|NODE|DISTANCE|
---|---|
0|0
1|2*
2|6
3|INF
4|INF
5|INF
6|INF

**{0,1}**

Next, we check the nodes adjacent to the nodes added to the path(Nodes 2 and 3).
We then update our distance table with the distance from the source node to the new adjacent node, node 3 (2 + 5 = 7).

To choose what to add to the path, we select tyhe node with nthe shortest currently known distance to the source node which is 0 > 2 with distance 6.

|NODE|DISTANCE|
---|---|
0|0
1|2*
2|6*
3|7
4|INF
5|INF
6|INF

**{0,1,2}**

Next we have the distances 0 > 1 > 3(2 + 5 = 7) and 0 > 2 > 3(6 + 8 = 14) in which 7 is clearly the shorter distance, so we add node 3 to the path and mark it as visited.

|NODE|DISTANCE|
---|---|
0|0
1|2*
2|6*
3|7*
4|INF
5|INF
6|INF

**{0,1,2,3}**

We then check the next adjacent nodes(node 4 and 5) in which we have 0 > 1 > 3 > 4(7 + 10 = 17) for node 4 and 0 > 1 > 3 > 5(7 + 15 = 22) for node 5. We add node 4.

|NODE|DISTANCE|
---|---|
0|0
1|2*
2|6*
3|7*
4|17*
5|22
6|INF

**{0,1,2,3,4}**

In the same way, we check the adjacent nodes(node 5 and 6).

Node 5:
- Option 1: 0 > 1 > 3 > 5(7 + 15 = 22)
- Option 2: 0 > 1 > 3 > 4 > 5(17 + 6 = 23)
- Option 3: 0 > 1 > 3 > 4 > 6 > 5(17 + 2 + 6 = 25)
We choose 22.

Node 6
0 > 1 > 3 > 4 > 6(17 + 2 = 19)

|NODE|DISTANCE|
---|---|
0|0
1|2*
2|6*
3|7*
4|17*
5|22*
6|19*

**{0,1,2,3,4,5}**

#### Python code and explanation

We have the Python code below to illustrate the  above process:

```python

class Graph(): 
    # A constructor to iniltialize the values
    def __init__(self, nodes):
        #distance array initialization
        self.distArray = [0 for i in range(nodes)]
        #visited nodes initialization
        self.vistSet = [0 for i in range(nodes)]
        #initializing the number of nodes
        self.V = nodes
        #initializing the infinity value
        self.INF = 1000000
        #initializing the graph matrix
        self.graph = [[0 for column in range(nodes)]  
                    for row in range(nodes)]
   
    def dijkstra(self, srcNode):
        for i in range(self.V):
          #initialise the distances to infinity first
          self.distArray[i] = self.INF
          #set the visited nodes set to false for each node
          self.vistSet[i] = False
        #initialise the first distance to 0
        self.distArray[srcNode] = 0
        for i in range(self.V): 
  
            # Pick the minimum distance node from  
            # the set of nodes not yet processed.  
            # u is always equal to srcNode in first iteration 
            u = self.minDistance(self.distArray, self.vistSet) 
  
            # Put the minimum distance node in the  
            # visited nodes set
            self.vistSet[u] = True
  
             # Update dist[v] only if is not in vistSet, there is an edge from 
            # u to v, and total weight of path from src to  v through u is 
            # smaller than current value of dist[v]
            for v in range(self.V): 
                if self.graph[u][v] > 0 and self.vistSet[v] == False and self.distArray[v] > self.distArray[u] + self.graph[u][v]: 
                        self.distArray[v] = self.distArray[u] + self.graph[u][v] 
  
        self.printSolution(self.distArray)

    #A utility function to find the node with minimum distance value, from 
	# the set of nodes not yet included in shortest path tree 
    def minDistance(self, distArray, vistSet): 
  
        # Initilaize minimum distance for next node
        min = self.INF
  
        # Search not nearest node not in the  
        # unvisited nodes
        for v in range(self.V): 
            if distArray[v] < min and vistSet[v] == False: 
                min = distArray[v] 
                min_index = v 
  
        return min_index

    def printSolution(self, distArray): 
        print ("Node \tDistance from 0")
        for i in range(self.V): 
            print (i, "\t", distArray[i])
#Display our table
ourGraph = Graph(7) 
ourGraph.graph = [[0, 2, 6, 0, 0, 0, 0], 
        [2, 0, 0, 5, 0, 0, 0], 
        [6, 6, 0, 8, 0, 0, 0], 
        [0, 0, 8, 0, 10, 15, 0], 
        [0, 0, 0, 10, 0, 6, 2], 
        [0, 0, 0, 15, 6, 0, 6], 
        [0, 0, 0, 0, 2, 6, 0],
        ]; 
  
ourGraph.dijkstra(0);

```

**Explanation**

We have  a constructor for giving initial `_init_` values and three user-defined functions:
- `printSolution()`
- `minDistance()`
- `dijkstra()`

The constructor takes the parameter `nodes` which is the number of nodes to analyze initializes respective values.

```python
#distance array initialization
self.distArray = [0 for i in range(nodes)]
#visited nodes initialization
self.vistSet = [0 for i in range(nodes)]
#initializing the number of nodes
self.V = nodes
#initializing the infinity value
self.INF = 1000000
#initializing the graph matrix
self.graph = [[0 for column in range(nodes)]  
    for row in range(nodes)]
```

`dijkstra()` takes a parameter the source node, `srcNode`. It then first initialises each distance to infinity and visited status to false to show the node is unvisited using a for loop and the initial distance from the source node to 0.

```python
self.distArray[i] = self.INF
self.vistSet[i] = False
```

In the next loop, it first picks the node with the minimum distance from the set of nodes not yet processed.`u` is always equal to `srcNode` in first iteration.
It then adds the node with the minimum distance in the visited nodes set by setting the value to `True`.

```python
u = self.minDistance(self.distArray, self.vistSet) 
self.vistSet[u] = True
```

In the last loop which is in the second loop, the code updates distance of the node from node 0, `dist[v]` only if is not in visited list array, `vistSet[]`, and if there is an edge from `u` to `v`, and total distance of path from `srcNode` to  `v` through `u` is less than current value of `dist[v]`.

```python

if self.graph[u][v] > 0 and self.vistSet[v] == False and self.distArray[v] > self.distArray[u] + self.graph[u][v]: 
    self.distArray[v] = self.distArray[u] + self.graph[u][v]

```

`minDistance()`checks for the nearest node in the `distArray` not included in the unvisited nodes in the array `vistSet[v]`. It then returns the node's index.
It takes two arrays as parameters `distArray` and `vistSet[v]`.

```python
min = self.INF
    for v in range(self.V): 
        if distArray[v] < min and vistSet[v] == False: 
            min = distArray[v] 
            min_index = v 
  
    return min_index
```

`printSolution()` is used to display the final results which is the nodes and their respective tables stored in an array `distArray`.

```python
print ("Node \tDistance from 0")
    for i in range(self.V): 
        print (i, "\t", distArray[i])
```
