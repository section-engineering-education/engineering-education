---
layout: engineering-education
status: publish
published: true
url: /engineering-education/graph-traversals-java/
title: Graph Implementation and Traversal Algorithms (Java)
description: This article will discuss graph implementation and traversal algorithms by going over some common graphs and how to traverse them with breadth-first search and depth-first search.
author: tenson-cai
date: 2020-12-17T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/graph-traversals-java/hero.jpg
    alt: traversal example image
---
Graphs are one of the most common data structures in computer science. Graphs are made up of nodes and edges. There are many applications for graph structures in the real world, including relationships (Facebook), locations (Google Maps), programming analysis, and more.
<!--more-->

![graph](/engineering-education/graph-traversals-java/graph.jpg)

By the end of this article, readers should know
1. What graphs are.
2. How graphs are implemented in code.
3. How to traverse a graph.
    - Breadth-first search iterative.
    - Depth-first search iterative and recursive.

<br />

### Types of graphs
There are different types of graphs, like undirected, directed, weighted, unweighted, etc. All graphs have nodes and edges, but there are different structures and properties between different types. 

Undirected graphs have directionless edges between nodes. 

Directed graphs have edges that point in a direction. Directed graphs can only be traversed in the direction the edges point. 

Unweighted graphs have zero value edges, while weighted graphs have non-zero value edges. These values can be positive or negative.

<br />

Undirected and Unweighted  |  Directed and Weighted	 |	
:-------------------------:|:-----------------------:|
|![undirected](/engineering-education/graph-traversals-java/undirected.png)|![directed](/engineering-education/graph-traversals-java/directed.png)

<br />
<br />

### How to implement a graph
All the code can be found here: https://repl.it/@tensoncai/Graph-Traversals-Java#Main.java 

Just press the Run button at the top to run.

#### Node object
First, we will create a Node object. It contains a value and an array list of neighboring nodes.

```java
import java.util.ArrayList;
import java.util.List;

public class Node {
	
	int value;
	List<Node> neighbors;

	public Node(int value) {
		this.value = value;
		neighbors = new ArrayList<>();
	}
	
	public void addEdge(Node to) {
		neighbors.add(to);
	}
}
```

#### Graph object
Next, we will implement the graph object and traversal methods. The code below will create an undirected graph, as shown before. Again, you can find the full code here: https://repl.it/@tensoncai/Graph-Traversals-Java#Main.java

```java
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Set;
import java.util.Stack;

class Main {
    public static void main(String[] args) {
    
        // Constructing the graph
        Node n0 = new Node(0);
        Node n1 = new Node(1);
        Node n2 = new Node(2);
        Node n3 = new Node(3);
        Node n4 = new Node(4);
        Node n5 = new Node(5);

        n0.addEdge(n1);
        n1.addEdge(n0);
        n1.addEdge(n3);
        n1.addEdge(n2);
        n2.addEdge(n1);
        n2.addEdge(n4);
        n3.addEdge(n1);
        n3.addEdge(n4);
        n3.addEdge(n5);
        n4.addEdge(n2);
        n4.addEdge(n3);
        n5.addEdge(n3);


        // Traversal methods

        System.out.println("BFS Iterative:");
        bfs(n0);
        System.out.println();

        System.out.println("DFS Iterative:");
        dfsIterative(n0);
        System.out.println();

        System.out.println("DFS Recursive:");
        dfsRecursive(n0, new HashSet<Integer>());
    
    }

    public static void bfs(Node startNode) {
        
        Queue<Node> queue = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();
        
        queue.add(startNode);
        visited.add(startNode.value);
        
        while (!queue.isEmpty()) {
            Node currentNode = queue.remove();
            System.out.println(currentNode.value);
            
            for (Node n : currentNode.neighbors) {
                if (!visited.contains(n.value)) {
                    queue.add(n);
                    visited.add(n.value);
                }
            }
        }
    }

    public static void dfsIterative(Node startNode) {
        Stack<Node> stack = new Stack<>();
        Set<Integer> visited = new HashSet<>();
        
        stack.push(startNode);
        
        while (!stack.isEmpty()) {
            Node currentNode = stack.pop();
            
            if (!visited.contains(currentNode.value)) {
                System.out.println(currentNode.value);
                visited.add(currentNode.value);
            }
            
            for (Node n : currentNode.neighbors) {
                if (!visited.contains(n.value)) {
                    stack.push(n);
                }
            }
        }
    }

    public static void dfsRecursive(Node startNode, Set<Integer> visited) {
        System.out.println(startNode.value);
        visited.add(startNode.value);
        
        for (Node n : startNode.neighbors) {
            if (!visited.contains(n.value)) {
                dfsRecursive(n, visited);
            }
        }
    }
}
```
<br />
<br />

### Graph traversal algorithms
#### BFS iterative
[Breadth First Search](/engineering-education/breadth-first-search/) uses a queue to traverse the graph in a level like manner. A start node is added to the queue to start. 

As long as the queue is not empty, a node is removed and its unvisited neighbors are added to the queue. Since a graph may contain cycles, a visited hash set is used to keep track of all visited nodes. We only want to add unvisited nodes into the queue!

```bash
BFS pseudocode:
	Initialize a queue
	Initialize a visited hash set (this is just one way to keep track of visited nodes)
	Add start node to queue.
	Add start node's value to visited set.
	While the queue's size is not empty:
		Remove a node.
		Print the node's value.
		Add all unvisited neighbors into the queue and visited set.
	end
```
```java
public static void bfs(Node startNode) {
	Queue<Node> queue = new LinkedList<>();
	Set<Integer> visited = new HashSet<>();
	
	queue.add(startNode);
	visited.add(startNode.value);
	
	while (!queue.isEmpty()) {
		Node currentNode = queue.remove();
		System.out.println(currentNode.value);
		
		for (Node n : currentNode.neighbors) { // Check each neighbor node
			if (!visited.contains(n.value)) { // If neighbor node's value is not in visited set
				queue.add(n);
				visited.add(n.value);
			}
		}
	}
}
```
<br />

#### DFS iterative
Depth First Search is the opposite of BFS. It uses a stack instead to traverse the graph. A start node is pushed to the stack. As long as the stack is not empty, a node is popped, and its unvisited neighbors are added to the stack. 

The graph is traversed in-depth because the node that is popped off the stack is the most recently pushed. Just like in BFS, a visited set is used.

```bash
DFS pseudocode:
    Initialize a stack
    Initialize a visited hash set
    Push start node to stack.
    while the stack's size is not empty:
        Pop a node.
        If the node has not been visited:
            Print the node's value.
            Add node to visited set.
        end
        Add all unvisited neighbors into the stack.
    end
```
```java
public static void dfsIterative(Node startNode) {
    Stack<Node> stack = new Stack<>();
    Set<Integer> visited = new HashSet<>();

    stack.push(startNode);

    while (!stack.isEmpty()) {
        Node currentNode = stack.pop();

        if (!visited.contains(currentNode.value)) { // if current node has not been visited yet
            System.out.println(currentNode.value);
            visited.add(currentNode.value);
        }

        for (Node n : currentNode.neighbors) { // check each neighbor node. Push all unvisited nodes into stack
            if (!visited.contains(n.value)) {
                stack.push(n);
            }
        }
    }
}
```
<br />

#### DFS recursive
DFS can also be implemented recursively. Instead of using a stack, the DFS method is called upon seeing an unvisited node. We also need to pass a visited set as a parameter in the method to keep track of visited nodes.

```java
public static void dfsRecursive(Node startNode, Set<Integer> visited) {
    System.out.println(startNode.value);
    visited.add(startNode.value);

    for (Node n : startNode.neighbors) {
        if (!visited.contains(n.value)) {
            dfsRecursive(n, visited); // Call the recursive method here.
        }
    }
}
```

![graph](/engineering-education/graph-traversals-java/graph.jpg)

#### Outputs
The BFS output shows that the graph is traversed in layers. The DFS iterative and recursive outputs show the traversal in depth. The DFS outputs are in different orders, but the algorithms operate the same way. There are more than one valid DFS outputs.

```bash
BFS Iterative:
0
1
3
2
4
5

DFS Iterative:
0
1
2
4
3
5

DFS Recursive:
0
1
3
4
2
5
```

### Conclusion
This article looked over some common graphs and how to traverse them with breadth-first search and depth-first search.

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

