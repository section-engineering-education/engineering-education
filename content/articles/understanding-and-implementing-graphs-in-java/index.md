### Introduction
There are possibilities of storing information as necessitated by outlined in the Java data structure Graph. The idea of a graph depicts a network that links several different points in time.
While covering graph data structure we will additionally learn about the many kinds of graphs, their implementation, and traversal over the graph, as well as the fundamental principles of a graph as a data structure, its implementation in Java, and the numerous operations that can be performed on a graph.

### Table of contents
- [Understanding graphs in Java](#understanding-graphs-in-java)
- [Graphs With Various Configurations](#graphs-with-various-configurations)
- [Storing graphs in memory](#storing-graphs-in-memory)
- [Representing Graphs in Code](#representing-graphs-in-code)
- [Graph implementation in Java](#graph-implementation-in-java)
- [Common operations to implement in Java](#common-operations-to-implement-in-java)
- [Graph traversal methods and how they are implemented](#graph-traversal-methods-and-how-they-are-implemented)
- [Depth-first traversal and its implementation](#depth-first-traversal-and-its-implementation)
- [Breadth-first traversal and its implementation](#breadth-first-traversal-and-its-implementation)

### Understanding graphs in Java
A graph data structure holds related data like a network of people or cities. Nodes are vertices that make up the graph data structure. The linkages are formed as a connection of a vertex another forming edges
There are several types of graphs, but the most common one is the directed acyclic graph (directed Graph). Instead, it might be characterized as being made up of a set of connected vertices (V) and edges (E).

#### Types of graphs
Graphs come in many shapes and sizes, which are described below:
- A **line graph** is used to show how a certain attribute evolves.
- An example of a **bar graph** is a comparison of quantitative variables, such as the population of different cities or the proportion of the population that is literate across the country.

#### Key terms
Some terms are used, such as:
- **Edge**- This is a line responsible for connecting two vertices to which they are linked together. We usually represent it with a line.
- **Vertex or node**- It is formed When edges meet at an intersection. It is a data representation. While designating a vertex we usually employ the use of a circle and a name must be assigned. You need more than one node to create a graph.
- **Weight**-According to a sticker somewhat on the side, it's an Edge.
- **Path**- This method is employed while moving from one point in a series to the next.

### Graphs With Various Configurations
1. **Directed graphs:**
The graph's edges show the graph's orientation. Instead of using lines, a directed graph makes use of arrows (edges). The direction of a node's path is indicated by its arrow. We may either proceed in one way or the other.
2. **Weighted Graph:**
It usually assigns value to the graph edge. In most cases, the weight is used to represent the difference between the two points.

### Storing graphs in memory
In either of the following three ways there is a possibility of storing a graph in memory:
1. Nodes and vertices may be stored as objects, whereas edges can be stored as pointers.
2. To store a graph, you can use adjacency matrices with equal rows and columns. A border appears when columns and rows overlap. A weighted edge is more essential than an unweighted edge, which is denoted by number `1`.
3. An adjacency list between graph nodes and vertices can also be stored. Each node or vertex has an unique set of adjacency list neighbors.

### Representing Graphs in Code
Adjacency matrices and lists are two typical approaches to generate graphs.

#### Adjacency matrix
As the number of graph vertices increases, so does the number of adjacency matrix dimensions.
Matrix cells have a value between `0` and `1`. A value of `1` indicates that the row and column's vertices are continuous, whereas a value of `0` suggests that they aren't.

#### Adjacency list
An adjacency list is nothing more than a collection of lists arranged in a certain order. The graph has precisely the same number of vertices as there are elements in the array in which to store them.
The array index list contains all vertices nearest to the index's vertex.

### Graph implementation in Java
Java Collections, such as the Generic Class, can be used in place of a graph data structure because Java does not provide a default implementation of this data structure.
The syntax for creating a Java generic class object is shown below:

```Java
BaseType <ParameterType> obj = new BaseType <ParameterType>();
```

>Bear in mind that primitive types cannot be used as parameter types.

#### Defining a vertex

```Java
class Apex {
    String tag;
    Vertex(String tag) {
        this.tag = tag;
    }
}
```

Override the `equals()` and `hashCode()` methods as dealing with Java Collections requires it.

#### Defining vertex using an adjacency list:

```Java
class Chart {
    private Plot<Apex, List<Vertex>> adjApexes;
}
```

In this case, the adjacency list is defined by the class `Plot`, which is an instance of `Chart`.
We may employ the graph data structure along with the conventional techniques of generating, updating, and searching the graph.

### Common operations to implement in Java
1. Vertices are being added and eliminated.

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

Simple addition and deletion of items from the vertices Set is accomplished by using these techniques.
2. Adding edge

```Java
void addEdge(String tag1, String tag2) {
    Apex x1 = new Apex(tag1);
    Apex x2 = new Apex(tag2);
    adjApexes.get(x1).add(x2);
    adjApexes.get(x2).add(x1);
}
```

A new edge will be generated by this function as well as updating the nearby vertices with the information from the new edge.
3. Using `removeEdge()`

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

4. Creating a graph
We will make use of the methods we have created up to now to build a basic graph as described earlier.

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

5. In a given vertex we can obtain the adjacent vertices:

```Java
List<Apex> getAdjApexes(String tag) {
    return adjApexes.get(new Apex(tag));
}
```

### Graph traversal methods and how they are implemented.
Any relevant action, such as searching inside the graph, requires traversing the graph.
A graph may be traversed using either the depth-first or the breadth-first approach.

#### Depth-first traversal and its implementation
Backtracking to discover the optimum answer is at the heart of the Depth-first traversal (DFS) algorithm's design. Starting with the first node, an algorithm continues searching until it reaches the last node (a node that has no child).
Reversing the path is achievable along the same route that was used to advance. This is known as backtracking.

- `DepthFirstSearch.java`

```Java
package plot;

import java.io.*;   
import java.util.*;     
class Plot   
{         
private int Apexes;     
private LinkedList<Integer> adjlist[];     
Plot(int count_x)   
{   
Apexes = count_x;   
adjlist = new LinkedList[count_x];     
for (int i=0; i<count_x; ++i)   
adjlist[i] = new LinkedList();   
}     
void addNewEdge(int x, int y)   
{   
adjlist[x].add(y);     
}     
void traversalDFS(int x, boolean vnodelist[])   
{   
vnodelist[x] = true;   
System.out.print(x+" ");  
Iterator<Integer> i = adjlist[x].listIterator();   
while (i.hasNext())   
{     
int n = i.next();  
if (!vnodelist[n])
traversalDFS(n, vnodelist);   
}
}
void DFS(int v)   
{    
boolean visited[] = new boolean[Apexes];      
traversalDFS(v, visited);   
}   
}  
public class DepthFirstSearch  
{  
public static void main(String args[])   
{    
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

```java
This is the Depth-first traversal of graph: 
2 4 6 8 10 14 12
```

#### Breadth-first traversal and its implementation
To traverse a graph, Breadth-first traversal (BFS) is the most used method. The first step in the traversal procedure is to analyze nodes that are close to the source node (child of the current node).
This means that you'll spend most of your time going horizontally and checking out all of your nodes in the current layer. Go to the next layer and do it all over again.

- `BreadthFirstSearch.java`

```Java
package plot;

import java.util.*;     
class Plot   
{      
private int Apexes;    
private LinkedList<Integer> adjlist[];   
Graph(int count_x)   
{   
Apexes = count_x;   
adjlist = new LinkedList[count_x];     
for (int i=0; i<count_x; ++i)           
adjlist[i] = new LinkedList();   
}     
void addNewEdge(int x, int w)   
{   
adjlist[x].add(w);   
}      
void traversalBFS(int rnode)     
{   
boolean visitednode[] = new boolean[Apexes];     
LinkedList<Integer> vnodelist = new LinkedList<Integer>();   
visitednode[rnode]=true;     
vnodelist.add(rnode);   
while (vnodelist.size() != 0)    
{    
rnode = vnodelist.poll();   
System.out.print(rnode+" ");      
Iterator<Integer> i = adjlist[rnode].listIterator();   
while (i.hasNext())  
{        
int n = i.next();    
if (!visitednode[n])   
{     
visitednode[n] = true;    
vnodelist.add(n);   
}   
}   
}   
}   
}  
public class BreadthFirstSearch   
{   
public static void main(String args[])   
{    
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

```java
This is the Breadth-first traversal sequence: 
4 10 8 12 2 6 14
```

### Conclusion
In this tutorial, we learnt about the fundamental principles of a graph as a data structure, its implementation in Java, and the numerous operations that can be performed on a graph. We also learnt about the many kinds of graphs, their implementation, and traversal over the graph, as well as representing graphs in code and representing graphs in code.
Happy learning!