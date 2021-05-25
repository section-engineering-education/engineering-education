---
layout: engineering-education
status: publish
published: true
url: /engineering-education/breadth-first-search/
title: Solving a Maze with Breadth First Search
description: Pathfinding is a very common task in computing. It's used for directions, and enemy AI in video games. Breadth-first Search (BFS) is one pathfinding algorithm which we can use to solve a maze.
author: mike-white
date: 2020-08-07T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/breadth-first-search/hero.jpg
    alt: breadth first search maze image
---
How can we find the fastest way from point A to point B? Solving problems like this is very common in computing. An enemy AI in a video game needs to be able to find the fastest way to the player. Google Maps needs to find the fastest way to your destination. Here, we just want to solve a maze.
<!--more-->

[There](https://en.wikipedia.org/wiki/Depth-first_search) [are](https://en.wikipedia.org/wiki/Djikstra%27s_Algorithm) [several](https://en.wikipedia.org/wiki/A*_search_algorithm) [pathfinding](https://en.wikipedia.org/wiki/B*) [algorithms](https://en.wikipedia.org/wiki/Best-first_search). The one we'll focus on today is Breadth-first Search or BFS. This algorithm is guaranteed to give the fastest path on an unweighted graph.

### What is a Graph?

![Picture of a graph. The black circles are vertices and the red lines are edges.](normal_graph.png)

This is a graph. Unlike in a tree, a graph is allowed to have circular references. Each point of the graph is called a *vertex*. The lines that connect the vertices are called *edges*.

Some graphs may be *weighted*, meaning that some edges are longer than others. Some edges may be *directed*, as in, the connection can only go in one direction.

![A graph with weights and directed edges](complex_graph.png)

We’ll be focusing on unweighted graphs because BFS isn’t very useful otherwise. BFS can work on directed graphs, but figuring how to do that will be left as an exercise to the reader.

### Creating a HashMap

We need to be able to store a graph on the computer’s memory. Each vertex can simply be represented as a list of its neighbors.

```java
// in case you can't tell, these examples are using Java
class Vertex {
    private LinkedList<Vertex> adjacents;

    public Vertex() {
        this.adjacents = new LinkedList<>();
    }

    public void addAdjacent(Vertex adjacentVertex) {
        adjacents.add(adjacentVertex);
    }

    public LinkedList<Vertex> getAdjacents() {
        return this.adjacents;
    }

    // you probably want to override the hash() function
}
```

A graph can be a HashMap containing a name for each vertex, and the vertex. If you don't know what a HashMap is, you may want to look at [this article](https://www.section.io/engineering-education/data-structures-python-part-1/).

```java
class Graph {
    private HashMap<String, Vertex> vertices;

    public Graph() {
        this.vertices = new HashMap<>();
    }

    public Vertex addVertex(String name) {
        Vertex vertex = new Vertex();
        vertices.put(name, vertex);
        return vertex;
    }

    public void addEdge(String vertex1, String vertex2) {
        Vertex v1 = vertices.get(vertex1);
        Vertex v2 = vertices.get(vertex2);

        v1.addAdjacent(v2);
        v2.addAdjacent(v1);
    }
}
```

### Traversing the Graph

We need a [Queue](https://www.section.io/engineering-education/data-structures-python-part-1/#linear-data-structures) of vertices to traverse. Whenever we reach a certain vertex, we add all its adjacent vertices to the queue, unless that vertex was already reached. We'll need a [HashSet](https://www.section.io/engineering-education/data-structures-python-part-1/#non-linear-data-structures) to store which vertices we've already reached. We'll make a `breadthFirstTraversal` method which contains the following.

```java
public void breadthFirstTraversal(String start, String end) {
    Vertex startVert = vertices.get(start);
    Vertex endVert = vertices.get(end);

    LinkedList<Vertex> queue = new LinkedList<>(); // LinkedList implements Queue
    HashSet<Vertex> visited = new HashSet<>();

    visited.add(startVert); // this is the first vertex

    Vertex current = startVert; // the current vertex to check
    while (current != endVert) { // repeats until the end is reached

        LinkedList<Vertex> adjacents = current.getAdjacents(); // get adjacents

        for (Vertex v: adjacents) { // add all the adjacents
            if (!visited.contains(v)) { // but only if it hasn't already been traversed
                visited.add(v);
                queue.add(v);
            }
        }

        current = queue.remove(); // goes to the next vertex
    }
}
```

### Creating a Path
Of course, all this algorithm does is traverse the graph. We need a path. Luckily, this is surprisingly simple. For each vertex, we'll need to store the previous vertex. We can just change the HashSet to be a HashMap to do this. We'll need a list of vertices for the path. We'll start by adding the last vertex's previous, then its previous, and so on until we reach the beginning.

```java
public LinkedList<Vertex> breadthFirstSearch(String start, String end) {
    Vertex startVert = vertices.get(start);
    Vertex endVert = vertices.get(end);

    LinkedList<Vertex> queue = new LinkedList<>(); // LinkedList implements Queue
    HashMap<Vertex, Vertex> visited = new HashMap<>();

    visited.put(startVert, null); // this is the first vertex

    Vertex current = startVert; // the current vertex to check
    while (current != endVert) { // repeats until the end is reached

        LinkedList<Vertex> adjacents = current.getAdjacents(); // get adjacents

        for (Vertex v: adjacents) { // add all the adjacents
            if (!visited.containsKey(v)) { // but only if it hasn't already been traversed
                visited.put(v, current);
                queue.add(v);
            }
        }

        current = queue.remove(); // goes to the next vertex
    }

    // create the path
    LinkedList<Vertex> path = new LinkedList<>();
    path.addFirst(current);
    while (current != startVert) {
        current = visited.get(current);
        path.addFirst(current); // addFirst is used to get the correct order
    }

    return path;
}
```
**The next several images demonstrate how exactly this code works:**

![](/engineering-education/breadth-first-search/demo2_1.png)

![](/engineering-education/breadth-first-search/demo2_2.png)

![](/engineering-education/breadth-first-search/demo2_3.png)

![](/engineering-education/breadth-first-search/demo2_4.png)

![](/engineering-education/breadth-first-search/demo2_5.png)

### Solving the Maze

In case you were wondering, all you would need to do to solve a maze with this is to turn it into a graph

![A maze. The maze contains a lot of black circles with letters inside of them, connected by red lines](/engineering-education/breadth-first-search/maze.png)
