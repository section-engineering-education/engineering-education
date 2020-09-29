---
layout: engineering-education
status: publish
published: true
url: /engineering-education/graph-data-structure-python-part1/
title: Using the Graph Data Structure in Python, Part 1
description: Graphs are special, non-linear data structures that are charaterized by a group of vertices, connected by edges.
author: saiharsha-balasubramaniam
date: 2020-09-29T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/graph-data-structure-python-part1/hero.jpg
    alt: graphs
---

Graphs are complex, non-linear data structures that are characterized by a group of vertices, connected by edges.

<!--more-->

In this article, let us look into the basics of graphs, the different types of graphs and their representation.

For more background on the different types of data structures in Python, check out the following articles:

- [Introduction to Data Structures](/engineering-education/data-structures-python-part-1/)
- [List](/engineering-education/list-data-structure-python/)
- [Stack](/engineering-education/stack-data-structure-python/)
- [Queue](/engineering-education/queue-data-structure-python/)
- [Linked Lists](/engineering-education/linked-list-data-structure-python/)
- [Binary Trees](/engineering-education/binary-tree-data-structure-python/)
- [Heaps](/engineering-education/heap-data-structure-python/)

_Note: **Prerequisites** - Make sure you have some basic Python knowledge before diving into this article. It is a good idea to check out linear data structures like Lists and Linked Lists. (links are given above)_

### Table of Contents

- [Graphs: Introduction](#graphs:-introduction)
- [Applications of Graphs](#applications-of-graphs)
- [Types of Graphs](#types-of-graphs)
- [Representing Graphs](#representing-graphs)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Graphs: Introduction

Graphs are non-linear data structures made up of two major components:

- **Vertices** -- Vertices are entities in a graph. Every vertex has a value associated with it. For example, if we represent a list of cities using a graph, the vertices would represent cities.

- **Edges** -- Edges represent the relationship between the vertices in the graph. Edges may or may not have a value associated with them. For example, if we represent a list of cities using a graph, the edges would represent the distance between cities.

![Graph Diagram](/engineering-education/graph-data-structure-python-part1/graph.png)

_Figure: Graph ([Source](https://www.andrew.cmu.edu/course/15-121/lectures/Trees/trees.html))_

### Applications of Graphs

Graphs are used everywhere, even in the fields of physics and chemistry. A few applications of graphs are:

- Graphs are used to visualize data organization.

- Directed Graphs are used in Google's Page Ranking Algorithm.

- Social Networking uses graphs to represent different users as vertices and edges to represent connections between users.

- In a mapping application, graphs are used to represent places. They use shortest path algorithms to calculate the shortest distance between points on the map.

### Types of Graphs

There are many types of graphs, based on weights, direction, interconnectivity and special properties. Let us now look at the most common types of graphs.

- [Based on Direction](#based-on-direction)
- [Based on Weights](#based-on-weights)
- [Special Graphs](#special-graphs)

#### Based on Direction

##### Undirected Graphs

- In an undirected graph, the edges have no path or direction.

- If there is a path from vertex X to vertex Y, then there is a path from vertex Y to vertex X.

- edge (X, Y) represents the edge connecting vertex X to vertex Y.

- That is, `edge (X, Y) == edge (Y, X)`.

![Undirected Graph](/engineering-education/graph-data-structure-python-part1/undirected-graph.png)

_Figure: Undirected Graph ([Source](https://pediaa.com/what-is-the-difference-between-directed-and-undirected-graph/))_

##### Directed Graphs

- In a directed graph or digraph, the edges have orientation.

- If there is a path from vertex X to vertex Y, then there necessarily need not exist a path from vertex Y to vertex X.

- That is, `edge (X, Y) != edge (Y, X)`.

![Directed Graphs](/engineering-education/graph-data-structure-python-part1/directed-graph.png)

_Figure: Directed Graph ([Source](https://pediaa.com/what-is-the-difference-between-directed-and-undirected-graph/))_

#### Based on Weights

##### Weighted Graphs

- A weighted graph has a value associated with every edge.
- The value may represent quantities like cost, distance, time, etc.., depending on the graph.
- An edge of a weighted graph is represented as, `(u, v, w)`.
  - `u` -> Source vertex
  - `v` -> Destination vertex
  - `w` -> Weight associated to go from u to v.

![Weighted Graphs](/engineering-education/graph-data-structure-python-part1/weighted-graph.png)

_Figure: Weighted Graph ([Source](https://www.clipartmax.com/middle/m2i8Z5i8G6b1b1b1_directed-weighted-ex1-directed-weighted-graph/))_

##### Unweighted Graphs

- An unweighted graph does not have a value associated with every edge.
- An edge of an unweighted graph is represented as, `(u, v)`.
  - `u` -> Source vertex
  - `v` -> Destination vertex

![Unweighted Graphs](/engineering-education/graph-data-structure-python-part1/unweighted-graph.png)

_Figure: Unweighted Graph ([Source](https://www.researchgate.net/figure/Unweighted-Undirected-Graph_fig3_327864836))_

#### Special Graphs

##### Trees

- An undirected graph with zero cycles is called a tree.

- A cycle in a graph is a sequence with the first and last vertices in the sequence repeating.

- It has X vertices and X-1 edges.

![Tree - Graphs](/engineering-education/graph-data-structure-python-part1/tree-graph.png)

*Figure: Tree ([Source](https://en.wikipedia.org/wiki/Tree_(graph_theory)))*

##### Rooted Tree

- A rooted tree is a tree which has a designated root node.

- If edges point away from the root, it is called an **arborescence / out-tree**.

- If edges point towards the root, it is called an **anti-arborescence / in-tree**.

![Rooted Tree](/engineering-education/graph-data-structure-python-part1/rooted-trees.png)

_Figure: Rooted Tree_

##### Directed Acyclic Graphs

- Directed Acyclic Graphs or DAGs are directed graphs with no cycles.

- They represent structures with dependencies.

- All arborescences are DAGs, but not all DAGs are arborescences.

![Directed Acyclic Graph](/engineering-education/graph-data-structure-python-part1/dag.png)

_Figure: Directed Acyclic Graph ([Source](https://en.wikipedia.org/wiki/Directed_acyclic_graph))_

##### Complete Graphs

- Complete graphs have a unique edge between every pair of vertices.

- A complete graph `n` vertices has `(n*(n-1)) / 2` edges and is represented by Kn.

![Complete Graph](/engineering-education/graph-data-structure-python-part1/complete-graph.png)

_Figure: Complete Graph ([Source](https://www.geeksforgeeks.org/mathematics-graph-theory-basics/))_

### Representing Graphs

There are multiple ways of using data structures to represent a graph. The three most common ways are:

- [Adjacency Matrix](#adjacency-matrix)
- [Adjacency List](#adjacency-list)
- [Edge List](#edge-list)

#### Adjacency Matrix

- An Adjacency Matrix is a very simple way to represent a graph.

- The element `**A[i][j]**` represents the cost of moving from vertex `i` to vertex `j`.

- Example,

```python
graph = [[0, 1, 2],
         [2, 0, 5],
         [4, 5, 0]]
```

- The above adjacency matrix represents a graph that has 3 vertices. The cost of moving from vertex 0 to vertex 1 is 1, the cost of moving from vertex 0 to vertex 2 is 2, and so on.

- Usually, the cost of travelling from a vertex to itself is zero.

- **Advantages and Disadvantages of Adjacency Matrix**

| Advantages                                         | Disadvantages                                     |
| -------------------------------------------------- | ------------------------------------------------- |
| Space efficient for dense graph representation.    | Space Complexity of this Data Structure - O(V^2). |
| Time complexity of getting an edge weight is O(1). | Iterating through the edges takes O(V^2) time.    |
| Simplest Graph Representation.                     |                                                   |

#### Adjacency List

- An adjacency list represents a graph as a list that has vertex-edge mappings.

- Example, A → [(B, 4), (C, 1)] represents an adjacency list where the vertex A is connected to B (weight 4) and C (weight 1).

- This works really well for sparse graphs.

- **Advantages and Disadvantages of Adjacency List**

| Advantages                             | Disadvantages                            |
| -------------------------------------- | ---------------------------------------- |
| Space efficient for sparse graphs.     | Less space efficient for dense graphs.   |
| Iterating over the edges is efficient. | Edge weight lookup is O(E). (worse case) |
|                                        | Slightly more complex to represent.      |

#### Edge List

- An edge list represents the graph as an unstructures list of edges.

- Example,

```python
graph = [(C, A, 4), (A, C, 1), (B, C, 6),
         (A, B, 4), (C, B, 1), (C, D, 2)]
```

- Not widely used because this representation lacks structure.

- **Advantages and Disadvantages of Edge List**

| Advantages                             | Disadvantages                            |
| -------------------------------------- | ---------------------------------------- |
| Space efficient for sparse graphs.     | Less space efficient for dense graphs.   |
| Iterating over the edges is efficient. | Edge weight lookup is O(E). (worse case) |
| Extremely simple representation.       | This representation lacks structure.     |

### Conclusion

In this article, we learnt about the various types of graphs, their representations and their applications. To summarize,

- **Types of Graphs**

  - Based on Direction

    - Undirected Graph
    - Directed Graph

  - Based on Weights

    - Weighted Graph
    - Unweighted Graph

  - Special Graphs
    - Tree
    - Rooted Tree
    - Directed Acyclic Graph
    - Complete Graph

- **Graph Representation**

  - Adjacency Matrix

    - Used for dense graphs

  - Adjacency List

    - Used for sparse graphs

  - Edge List
    - Used for simple representation

### Further Reading

To know more about graphs, check out the following pages:

- Practice Graphs -- [LeetCode](https://leetcode.com/tag/graph/)
- Graph Theory [Notes](https://www.cpp.edu/~ftang/courses/CS241/notes/graph.htm)
- Graph Representation -- [HackerEarth](https://www.hackerearth.com/practice/algorithms/graphs/graph-representation/tutorial/)
