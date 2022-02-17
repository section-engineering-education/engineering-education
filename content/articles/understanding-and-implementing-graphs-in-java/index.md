---
layout: engineering-education
status: publish
published: true
url: /understanding-and-implementing-graphs-in-java/
title: Understanding and implementing graphs in Java
description: This tutorial will cover the types, implementation, and basic concepts of a graph as a data structure in Java.
author: teresia-mburu
date: 2022-01-24T00:00:00-14:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-and-implementing-graphs-in-java/hero.jpg
    alt: Understanding and implementing graphs in Java Hero Image
---
There are possibilities of storing information in a Java data structure graph. The idea of a graph depicts a network that links several different points in time. 
<!--more-->
While examining their data structure, we will learn about the many types of graphs, their implementation, and traversal. We'll also discuss how to create a graph in Java and the many operations performed on it as a data structure.

### Table of contents
- [Understanding graphs in Java](#understanding-graphs-in-java)
- [Graphs with various configurations](#graphs-with-various-configurations)
- [Storing graphs in memory](#storing-graphs-in-memory)
- [Representing graphs in code](#representing-graphs-in-code)
- [Graph implementation in Java](#graph-implementation-in-java)
- [Common operations to implement in Java](#common-operations-to-implement-in-java)
- [Graph traversal methods and their implementation](#graph-traversal-methods-and-how-they-are-implemented)
- [Depth-first traversal and its implementation](#depth-first-traversal-and-its-implementation)
- [Breadth-first traversal and its implementation](#breadth-first-traversal-and-its-implementation)

### Understanding graphs in Java
A graph is a data structure that stores data in connected groups of edges and vertices.. Vertices are the nodes that make up the structure. A vertex connects to another vertex to create a linkage.

There are several types of graphs, but the most common one is the directed acyclic graph (directed graph). It contains a set of connected vertices (V) and edges (E).

#### Types of graphs
Graphs come in many shapes and sizes described below:
- Line graph: It shows how a particular attribute evolves.
- Bar graph: It compares quantitative variables, such as the population of different cities or the proportion of the literate population across the country.

#### Key terms
Some terms are used, such as:
- Edge: This is a line responsible for connecting two vertices linked together. We usually represent it with a line.
- Vertex or node: This is a point formed when edges meet at an intersection. It is a data representation. While designating a vertex, we usually employ a circle, and a name must be assigned. You need more than one node to create a graph.
- Weight: According to a sticker somewhat on the side, it is an Edge.
- Path: This method moves from one point in a series to the next.

### Graphs with various configurations
1. Directed graphs: It is a collection of linked objects, with all of its edges pointing in the same direction. Instead of using lines, a directed graph uses arrows (edges). The direction of a node's path is indicated by its arrow. We may either proceed in one way or the other.
2. Weighted Graph: This graph assigns value to the graph edge. In most cases, the weight represents the difference between the two points.

### Storing graphs in memory
The following three ways shows how to store graphs in memory:
1. Nodes and vertices may be stored as objects, whereas edges as pointers.
2. Adjacency matrices can be used, and they should have equal rows and columns. A border appears when columns and rows overlap. A weighted edge is more essential than an unweighted edge, denoted by `1`.
3. In addition to storing, one can also use an adjacency list between graph nodes and vertices. A distinct set of adjacency list neighbors may be found for each node or vertex.

### Representing graphs in code
Adjacency matrices and adjacency lists are approaches to generate graphs.

#### Adjacency matrix
As the number of graph vertices increases, the number of adjacency matrix dimensions increases. Matrix cells have a value between `0` and `1`. A value of `1` indicates that the row and column's vertices are continuous, whereas `0` suggests they are not.

#### Adjacency list
An adjacency list is nothing more than an ordered collection of lists. The number of vertices in the graph equals the number of items in the array used to store it. This list includes all vertices within a certain distance of the index's vertex location.

### Graph implementation in Java
Java collections, such as the Generic class, can be used in place of a graph data structure because Java does not provide a default implementation of this data structure. Below is the syntax to use in the case of a generic object in Java:

```Java
BaseType <ParameterType> obj = new BaseType <ParameterType>();
```

> There is no way you can utilize primitive types as parameter types.

#### Defining a vertex

```Java
class Apex {
    String tag;
    Vertex(String tag) {
        this.tag = tag;
    }
}
```

Coding with Java collections implies overriding the `equals()` and `hashcode()` methods.

#### Defining vertex using an adjacency list

```Java
class Chart {
    private Plot<Apex, List<Vertex>> adjApexes;
}
```

In this case, the adjacency list is defined by the class `Plot` and an instance of `Chart.` In the graph, we can generate, update, and search. These are some ways we can utilize the graph data structure in.

### Common operations to implement in Java

1. Adding and eliminating vertices.

```Java
void addApex(String tag) {
    addApexes.putIfAbsent(new Apex(tag), new ArrayList<>());
}
void removeApex(String tag) {
    Apex x = new Apex(tag);
    adjApexes.values().stream().forEach(e -> e.remove(x));
    adjApex.remove(new Apex(tag));
}
```

These techniques accomplish the simple addition and deletion of items from the vertices set.

2. Adding an edge.

```Java
void addEdge(String tag1, String tag2) {
    Apex x1 = new Apex(tag1);
    Apex x2 = new Apex(tag2);
    adjApexes.get(x1).add(x2);
    adjApexes.get(x2).add(x1);
}
```

A new edge will be generated by this function and update the nearby vertices with the information from the new edge.

3. Using `removeEdge()` method.

```Java
void removeEdge(String tag1, String tag2) {
    Apex x1 = new Apex(tag1);
    Apex x2 = new Apex(tag2);
    List<Apex> eX1 = adjApexes.get(x1);
    List<Apex> eX2 = adjApexes.get(x2);
    if (eX1 != null)
        eX1.remove(x2);
    if (eX2 != null)
        eX2.remove(x1);
}
```

This method removes an edge.

4. Creating a graph.

We will use the methods we have created to build a basic graph as described earlier.

```Java
Plot createPlot() {
    Plot plot = new Plot();
    plot.addApex("kelvin");
    plot.addApex("James");
    plot.addApex("Daniel");
    plot.addApex("Ken");
    plot.addApex("Jane");
    plot.addEdge("Kelvin", "James");
    plot.addEdge("Kelvin", "Ken");
    plot.addEdge("James", "Daniel");
    plot.addEdge("Ken", "Daniel");
    plot.addEdge("James", "Jane");
    plot.addEdge("Ken", "Jane");
    return plot;
}
```

5. In a given vertex, we can obtain the adjacent vertices:

```Java
List<Apex> getAdjApexes(String tag) {
    return adjApexes.get(new Apex(tag));
}
```

### Graph traversal methods and their implementation
Any relevant action, such as searching inside the graph, requires traversing the graph.
A graph may be traversed using either the depth-first or the breadth-first approach.

#### Depth-first traversal and its implementation
Backtracking is at the heart of the Depth-first traversal (DFS) algorithm's design to discover the optimum answer. An algorithm searches from the first node to the last node. Reversing the path is achievable along the same route used to advance, known as backtracking.

```Java
package plot;

import java.io.*;
import java.util.*;
class Plot {
    private int Apexes;
    private LinkedList < Integer > adjlist[];
    Plot(int count_x) {
        Apexes = count_x;
        adjlist = new LinkedList[count_x];
        for (int i = 0; i < count_x; ++i)
            adjlist[i] = new LinkedList();
    }
    void addNewEdge(int x, int y) {
        adjlist[x].add(y);
    }
    void traversalDFS(int x, boolean vnodelist[]) {
        vnodelist[x] = true;
        System.out.print(x + " ");
        Iterator < Integer > i = adjlist[x].listIterator();
        while (i.hasNext()) {
            int n = i.next();
            if (!vnodelist[n])
                traversalDFS(n, vnodelist);
        }
    }
    void DFS(int v) {
        boolean visited[] = new boolean[Apexes];
        traversalDFS(v, visited);
    }
}
public class DepthFirstSearch {
    public static void main(String args[]) {
        Plot p = new Plot(20);
        p.addNewEdge(2, 4);
        p.addNewEdge(4, 6);
        p.addNewEdge(6, 8);
        p.addNewEdge(8, 10);
        p.addNewEdge(10, 14);
        p.addNewEdge(16, 6);
        p.addNewEdge(2, 10);
        p.addNewEdge(10, 10);
        p.addNewEdge(4, 12);
        p.addNewEdge(6, 14);
        System.out.println("This is the Depth-first traversal of graph: ");
        p.DFS(2);
    }
}
```

**Output**

```bash
This is the Depth-first traversal of the graph: 
2 4 6 8 10 14 12
```

#### Breadth-first traversal and its implementation
Breadth-first traversal (BFS) is the most used method to traverse a graph. Analyzing the nodes near the source node, which is the current node's child, forms the traversal's start, which means that you will spend most of your time going horizontally and checking out all of your nodes in the current layer. Repeat on the layer that follows.

- `BreadthFirstSearch.java`

```Java
package plot;

import java.util.*;
class Plot {
    private int Apexes;
    private LinkedList < Integer > adjlist[];
    Graph(int count_x) {
        Apexes = count_x;
        adjlist = new LinkedList[count_x];
        for (int i = 0; i < count_x; ++i)
            adjlist[i] = new LinkedList();
    }
    void addNewEdge(int x, int w) {
        adjlist[x].add(w);
    }
    void traversalBFS(int rnode) {
        boolean visitednode[] = new boolean[Apexes];
        LinkedList < Integer > vnodelist = new LinkedList < Integer > ();
        visitednode[rnode] = true;
        vnodelist.add(rnode);
        while (vnodelist.size() != 0) {
            rnode = vnodelist.poll();
            System.out.print(rnode + " ");
            Iterator < Integer > i = adjlist[rnode].listIterator();
            while (i.hasNext()) {
                int n = i.next();
                if (!visitednode[n]) {
                    visitednode[n] = true;
                    vnodelist.add(n);
                }
            }
        }
    }
}
public class BreadthFirstSearch {
    public static void main(String args[]) {
        Plot plot = new Plot(20);
        plot.addNewEdge(4, 10);
        plot.addNewEdge(6, 10);
        plot.addNewEdge(2, 4);
        plot.addNewEdge(4, 8);
        plot.addNewEdge(8, 2);
        plot.addNewEdge(12, 4);
        plot.addNewEdge(10, 12);
        plot.addNewEdge(2, 12);
        plot.addNewEdge(12, 6);
        plot.addNewEdge(6, 2);
        plot.addNewEdge(14, 6);
        plot.addNewEdge(6, 14);
        plot.addNewEdge(14, 10);
        System.out.println("This is the Breadth-first traversal sequence: ");
        plot.traversalBFS(4);
    }
}
```

**Output:**

```bash
This is the Breadth-first traversal sequence: 
4 10 8 12 2 6 14
```

### Conclusion
In this tutorial, we learned about the fundamental principles of a data structure, its application in Java, and the numerous operations performed on a graph. We also learned the many kinds of graphs, their implementation, and traversal over the graph.

Happy coding!
---
Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
