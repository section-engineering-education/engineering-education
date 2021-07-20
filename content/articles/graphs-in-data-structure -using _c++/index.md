#### Introduction
Graphs are mathematical structures that represent the pairwise relationship between objects. A graph is a flow structure that represents the relationships between various objects. It can be visualized by using the following two basic components:<sub>de</sub>

* **Adjacency Matrix** 
An adjacency matrix is a V*V binary matrix A. Element A<sup>i,j</sup> is 1 if there is an edge#### Introduction
Graphs are mathematical structures that represent a pairwise relationship between objects. A graph is a flow structure that represents the relationships between various objects. It can be visualized by using the following two basic components:
* **Nodes**: These are the most important components in any graph. Nodes are entities whose relationships are expressed using edges. If a graph comprises 2 nodes A and B and an undirected edge between them, then it expresses a bi-directional relationship between the nodes and the edge.

* **Edges**: Edges are the components that are used to represent the relationships between various nodes in a graph. An edge between two nodes express one way or two-way relationship between the nodes

#### Some real-life application

* **Google Maps**: To find the route based on the shortest route/time.
* **Social Networks**: Connecting with friends on social media where each user is a vertex, and when users connect they create an edge.
* **Web Search**: google, to search for webpages, where pages on the internet are linked to each other by hyperlinks, each page is a vertex and the link between two pages is an edge.
* **Recommendation System**: On eCommerce websites, relationship graphs are used to show recommendations.

#### Type of Graphs :
* **Undirected**: An undirected graph is a graph in which all the edges are bi-directional example i.e the edges do not point in any specific direction

* **Directed**: A directed graph is a graph in which all the edges are uni-directional i.e the edges point in a single direction.

* **Weighted**: weighted graph, each edges assigned a weight or cost. Consider a graph of 4 nodes as in the diagram below. As you can see each edge has a weight/cost assigned to it. If you want to go from vertex 1 to vertex 3, you can take one of the following 3 paths: 
    * 1->2->3
    * 1->3
    * 1->4->3

Therefore the total cost of each path will be as follows:

The total cost of  1->2->3 will be (1+2) i.e 3 units 

The total cost of 1-> 3 will be 1 unit

The total cost of 1->4->3 will be (3+2) i.e 5 units

* **Cyclic**: A graph is cyclic if the graph comprises a path that starts from a vertex and ends at the same vertex. that path is called a cycle. An acyclic graph is a graph that has no cycle.

{IMG}}}}}}}}}}}}

cycle present in the above graph (0->1->2).
A tree is an undirected graph in which any vertices are connected by only one path. A tree is an acyclic graph and has N-1 edges where N is the number of vertices. Each node in a graph may have one or multiple parent nodes. However, in a tree, each node (except the root node) comprises exactly one parent node.

**Note**: A root node has no parent.

A tree cannot contain any cycles or self-loops, however, the same does not apply to graphs.

{{{IMG}}}}}}}}}}

### Graph Representation 
You can represent a graph in many ways. The two most common ways of representing a graph are as follows:

* **Adjacency Matrix** 
An adjacency matrix is a V*V binary matrix A. Element A<sub>i,j</sub> is 1 if there is an edge from vertex i to vertex j else A<sub>i,j</sub> is 0.

  **Note**: A binary matrix is a matrix in which the cells can have only one of two possible values - either 0 or 1.

The adjacency matrix can also be modified for the weighted graph in which instead of storing 0 or 1 in A<sub>i,j</sub> the weight or cost of the age will be stored.

In an undirected graph, if A<sub>i,j</sub> = 1, then A<sub>i,j</sub> =1.

In a directed graph, if A<sub>i,j</sub> = 1, then may or may not be 1.

The adjacency matrix provides constant-time access (O(1)) to determine if there is an edge between two nodes. Space complexity of the adjacency matrix is O(V<sup>2</sup>).

* **Adjacency List**
The other way to represent a graph is by using an adjacency list. An adjacency list is an array A of separate lists. Each element of the array A<sub>i</sub> is a list, which contains all the vertices that are adjacent to vertex i.

For a weighted graph, the weight or cost of the edge is stored along with the vertex in the list using pairs. In an undirected graph, if vertex j is in list A<sub>i</sub> the vertex i will be in list A<sub>j</sub>.

The space complexity of the adjacency list is O(V +E) because in the adjacency list information is stored only for those edges that exist in the graph. In a lot of cases, where a matrix is sparse using an adjacency matrix may not be very useful. This is because using an adjacency matrix will take up a lot of space where most of the elements will be 0, anyway. In such cases, using an adjacency list is better.

{IMG}}}}}}}}}}}}}}}}}123

Representation of an undirected graph,
* An undirected graph G having 5 vertices and seven edges
* An adjacency-list representation of G
* The adjacency-matrix representation of G

**Code for Adjacency list representation of graph** : 
