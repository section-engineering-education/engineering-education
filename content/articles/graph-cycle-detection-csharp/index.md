---
layout: engineering-education
status: publish
published: true
url: /graph-cycle-detection-csharp/
title: Cycle Detection in a Graph in C#
description: In this article we will go over graphs that have a cycle. This concept helps us detect infinite loops in a computer program.
author: erick-wekesa
date: 2021-12-24T00:00:00-15:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/graph-cycle-detection-csharp/hero.jpg
   alt: cycle Detection in C sharp image graph
---
Graphs are one of the most versatile data structures. This is because they allow us to solve interesting problems. They are used in social networks and GPS applications. 
<!--more-->
One can apply it anywhere you want to model the relationship between a bunch of objects. In this article, our primary focus will be on graphs that have a cycle. It is important to know this concept to help us detect infinite loops in a computer program.

#### Prerequisites
To be able to follow this article well, one needs:
- To have [Visual Studio](https://visualstudio.microsoft.com/) installed.
- Have an understanding of [Recursion](https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=163s).
- Some understanding of how to build a graph using an [adjacency list](/engineering-education/graphs-in-data-structure-using-cplusplus/) and matrix.
- A basic understanding of C# or any object-oriented programming language.

#### Key takeaways
- A brief overview of a graph.
- Understand what a cycle is in a graph.
- Understand how to detect a cycle. 
 - Depth-first search algorithm. 
 - Cycle detection on a directed graph. 
 - Cycle detection on an undirected graph.
- Understand different applications of cycle detection.

### A brief overview of a graph
A graph is like a tree but without any cycles. We do not have a root node in graphs. Below, is an example of a graph with four nodes or vertex and six edges or lines. We don't have a limitation of how many connections we can have from one node.

If two nodes are connected, we say they are adjacent or neighbors. `John` and `bob` are neighbors. `John` and `Sam` are not because they are not connected.

![image of a Graph](/engineering-education/graph-cycle-detection-csharp/graphexample.png)

If the edges have a direction, we say we have a directed graph. From the directed graph image below, `John` is connected to `Bob` but the opposite is not true. This is how Twitter works. If you follow someone, there is a connection from your account to their account. Not the other way round unless they follow you as well.

![image of a directed-graph](/engineering-education/graph-cycle-detection-csharp/directed-graph.png)

There are undirected graphs as well. An example of this can be Facebook. When you add a friend, there is a connection from you to them. The Vice verse is true. The connections do not have a direction.

The edges can also have weights. We use these weights to represent how strong the connection is, For example, on Facebook when two people communicate, we can put more weight on them. We then use that to show their best friends using the nodes that have the highest weights.

![Image of Weighted Graph](/engineering-education/graph-cycle-detection-csharp/weightedgraph.png)

With this brief description, we can better understand what a cycle is and how to detect that in a graph.

### What is a cycle in graphs?
A cycle in a graph is where the first and the last vertices are the same. If one starts from one vertex, travels along a path, and ends up at the starting vertex, then this path is a cycle. 

> Cycle detection is the process of finding a cycle.

In our example below, we have a cycle in the path `1` to `3` to `4` and back to `1`. There is no cycle in the top part of the graph. These are paths `1` to `2` to `6` and `1` to `2` to `7`. In any search, if you know there is a possibility of a cycle, you need to manage it.

When this is not managed, your algorithm will run infinite times. This leads to a `StackOverflow` exception error.

![Image of Cycle Graph](/engineering-education/graph-cycle-detection-csharp/Cyclegraph.png)

#### An example of how an infinite loop occurs
Let's look up node `6`. If we start our search going through the path of `1` to `3` to `4`, we will get back to `1`. We have detected a loop at this point. There is no way of ending it. This cycle will keep going. Thus, we will never get to `6`.

### How to detect a cycle
To detect a cycle in a graph, a depth-first search algorithm is the best algorithm to use.

#### Depth first search
Depth First Search (DFS), is a graph traversal method. We start our search from a particular vertex. We then explore all other vertexes as long as we can go along that path. When reaching the end of that path, we do a backtrack up to the point where we began from. 

The stack data structure is the best when doing backtracking.

![Image of DFS](/engineering-education/graph-cycle-detection-csharp/dfs.png)

#### Example of how DFS works
From the DFS diagram above, say `1` is our start node. We look at the first item that will be in our adjacency matrix. That is `2`. Instead of queueing nodes next to `1`, we queue nodes that are next to `2`. So we will go to `6`.

If `6` is the node we were looking for, we stop. Let us assume it is not. We backtrack to `2`. From `2`, we look for other nodes that are connected to it. That is `7`. Since `7` does not have any other connected node and it isn't what we are looking for. We then backtrack to `2`. We have finished visiting all nodes connected to `2`. So we backtrack to `1`.

From `1`, we check which other node is connected to it. We have `3`. We visit node `3` and check the nodes connected to it. We have `8`. We visit `8`. It is the last node. No other node is connected to it. If it isn't what we are looking for we backtrack to `3`. `3` does not have other nodes connected to it. We backtrack back to `1`.

We again check from our list for any other node connected to `1`. We have `4`. We visit `4`. `4` doesn't have any other node connected to it. We backtrack to `1`. `1` still has `5` connected to it. We visit `5` and backtrack back to `1`. We are done visiting all nodes.

### Implementing cycle detection using DFS
#### 1. Cycle detection in a directed graph
To detect a cycle in a graph, we visit the node, mark it as visited. Then visit all the nodes connected through it. A cycle will be detected when visiting a node that has been marked as visited and part of the current path.

![Image of Cycle Graph](/engineering-education/graph-cycle-detection-csharp/Cyclegraph.png)

Below is an explanation of how to detect a cycle, using the cycle graph image above as our reference.

We declare two boolean array variables. One is called visited. The other is called path. The size of both arrays will be the number of vertexes. In this case, 7. The path variable is key. This is because it is what will help us determine if we have found a cycle.  

These two boolean array variables are first initialized to false. When we visit each node we mark the visited variable as true. We also mark the path variable as true. 
1. Visit node `1`. Mark it as visited. Mark it as part of our current path. Call node `2`.
2. Visit node `2`. Mark it as visited. Mark it as part of our current path. Call node `5`.
3. Visit node `5`. Mark it as visited. Mark it as part of our current path. No node is connected to it. Remove it from our current path by marking the path variable at this point/index as false. Leave visited as true. Return to node `2`.
4. Visit node `6`. Mark it as visited. Mark it as part of our current path. Node `6` has no children. Remove it from our current path. Leave it as visited true.
5. Return from node `2` to node `1`. Remove node `2` from our current path. This is because we have finished visiting all the nodes that are connected to it.

We have visited nodes `1`, `2`, `5`, `6`, and only node `1` is part of the current path.

>Note that all these nodes are marked as visited.

6. From node `1`, go to node `3` mark it as visited and part of our current path. Call its child node `4`.
7. Visit node `4` mark it as visited and part of our current path. Call its child node `1`.

At this point, we find that `1` is part of our current path. It is also marked as visited. A cycle is detected.

### Code implementation of cycle detection in C#
1. Open Visual Studio. Create a Console Application called `GraphCycleDetect`.
2. In the `Main()` method we create a jagged array `graph`. This is what will hold our vertexes and show how they are connected. This is what we will use to construct our adjacency matrix. It will be a representation of the graph.
3. We call the `MakeGraph()` function. Pass the number of vertexes and the `graph` as the parameters to that function. Below is the code that implements steps 1 to 3.

```c#
 public static void Main(string[] args)
       {
 // Created the jagged array. It contains the vertexes and how they are to be connected.
 // E.g. new int[]{ 1,2}, means 1 is to be connected to 2
 int[][] graph = new int[][]
           {

 new int[]{ 1,2},

 new int[]{ 1,3},

 new int[]{ 1,4},

 new int[]{ 1,5},

 new int[]{ 2,6},

 new int[]{ 2,7},

 new int[]{ 3,4},

 new int[]{ 4,1},

           };
 // this is the total number of nodes in our graph
 int nodes = 8;
 // we call the MakeGraph method. This is the method that will constract the graph for us.
 var hasCycle = MakeGraph(graph, nodes);
 // This will print for us the result on the output window. If we find a cycle it will print:
 //Does the graph have a cycle ? ---> true
 // If the graph does not have a cycle it will print
 //Does the graph have a cycle ? ---> false
 Console.WriteLine($"Does the graph have a cycle ? ---> {hasCycle}");

 // A built-in c# Static method that reads the next line of character.
 //The result will stay on the output window when we add this line.
 Console.ReadLine();

       }

```

4. Construct the adjacency matrix in the `MakeGraph()` function.
- Declare a dictionary data structure, `ls`. This is what will store our adjacency list/graph.
- Declare a visited boolean variable, `visited`. Its size is the number of nodes.
- Declare a path boolean variable, `path`. Its size is the number of nodes.
- Populate the dictionary with node values.
- Iterate through the nodes. For each iteration:
 - Call the `DFS()` function.
- If the `MakeGraph()` function returns a `true`, a cycle has been detected. Otherwise, there is no cycle when it returns `false`.

Below is the code implementation of step 4 above.
```c#

 private static bool MakeGraph(int[][] graph, int nodes)
       {
 // This is the dictionary for storing the adjacency list.
 //It is of the type, int that will hold a node and List<int> that will hold all other nodes 
 //attached to the int node.
 /* E.G. This is how our graph will look like 
                    1-> 2,3,4
                    2-> 6,7
                    3-> 4
                    4-> 1
                */
 Dictionary<int, List<int>> ls = new Dictionary<int, List<int>>();
 // We declare a visited bool array variable. We will store the visited nodes in it.
 bool[] visited = new bool[nodes];
 // We declare a path bool array variable. We will store all nodes in our current path here.
 bool[] path = new bool[nodes];
 // Loop through our jagged array, graph.
 for (int i = 0; i < graph.Length; i++)
           {
 // As we loop, check whether our dictionary already contains the node at index[i][0]
 // of our jagged array, graph. If it is not there, we add it to the dictionary, ls
 if (!ls.ContainsKey(graph[i][0]))
               {
 ls.Add(graph[i][0], new List<int>());
               }
 // this line of code will connect the nodes. E.g. If we are given { 1,2}, we added 1 to our dictionary
 // on the line  ls.Add(graph[i][0], new List<int>());
 //Therefore, in this next line,ls[graph[i][0]].Add(graph[i][1]); we connect the 1 to the 2
 ls[graph[i][0]].Add(graph[i][1]);

           }
 // We start our traversal here. We could also say that this is where we start our path from.
 for (int i = 0; i < nodes; i++)
           {
 // We do our Dfs starting from the node at i in this case our start point will be 0;
 // For each Dfs, we are checking if we will find a cycle. If yes, we immediately return true.
 // A cycle has been found.
 if (Dfs(ls, i, visited, path))

 return true;

           }
 // If in our for loop above, we never found a cycle, then we will return false.
 // A cycle was not detected.
 return false;

       }

```

5. Create a boolean `DFS()` function that detects whether there is a cycle or not. Below is the code for the same. We use recursion for backtracking. 

If a cycle is detected, we return `true`, otherwise, we return `false`.
```c#
 private static bool Dfs(Dictionary<int, List<int>> graph, int start, bool[] visited, bool[] path)
       {
 // If we find that we marked path[start] true, we return true.
 // This means that we have come back to the node we started from hence a cycle has
 // been found.
 if (path[start])
           {
 return true;
           }
 // If we didn't find a cycle from the code block above, we mark visited[start] to true.
 visited[start] = true;

 //  We also mark path[start] to true. This will help us know that the node start is on our
 //  current path.
 path[start] = true;

 // We check whether our graph contains the start node. Sometimes the start node is not in our graph.
 // Thus, if we do our traversal on such a node, an exception will be thrown. This is because the node does
 // not exist.
 if (graph.ContainsKey(start))
           {
 // We start our traversal from our start node of the graph.
 for each (var item in graph[start])

               {
 //We do our recursion
 // At this point, if the start node returned a true in our recursive call, then we say that cycle has been
 // found. We return true immediately.
 if (DFS(graph, item, visited, path))
                   {
 return true;
                   }

               }

           }
 // If we have traversed the whole path from the start node and never found a cycle, we start removing
 // those nodes from this path. This is done recursively using c# inbuilt stack also called the call stack.
 path[start] = false;
 // If we did not find a cycle, we return false.
 return false;

       }

```

The output of the above code after running will be:

![Image of Output](/engineering-education/graph-cycle-detection-csharp/output1.png)

### 2. Cycle detection in undirected Graph.
We just talked about finding a cycle in a directed graph. The approach will be a little different in an undirected graph.

#### Why?
Below we have an example image of an undirected graph. This graph has no direction. This means, there is a connection from `A` to `B`. There is also another connection from `B` to `A`. Using the previous approach, we start our traversal from node `A`. 

We visit `A` and mark it as part of our current path. We then visit the node that is connected to it. That is `B`. We mark it as visited and in the current path set. Because there is an edge from `B` to `A` and `A` is part of the current path. A cycle is detected.

With the above approach, a cycle will always be detected between every two nodes connected by an edge. We need to come up with a dfs algorithm for Undirected Graph. Always finding a cycle between two edges.

![Image of Undirected Graph](/engineering-education/graph-cycle-detection-csharp/unidirected.png)

#### Correct dfs algorithm to detect a cycle in an undirected graph
To avoid finding a cycle between two edges we do the following. As we traverse the graph, we should pass the parent of each node to its neighbors. This will prevent going back to the parent. Below is an elaborate explanation.

In the diagram below, we add another edge `C` to form a cycle. We start our depth-first search from any node. Let us say `A`. We put `A` in the set of current path nodes. We then explore the neighbors of `A`. We can go to `B` or `C`. The order does not matter.

We go to `B`. `B` has two neighbors, `A` and `C`. We do not want to go back to where we came from. As we move from `A` to `B`, we should pass `A` as the parent node. When exploring the neighbors of `B` we will know we came from `A`. We won't go in the direction of `A`. We go to `C`.

Add `C` to the current path set. We pass `B` as the parent node. `C` has one other neighbor `A`. We have already visited `A`. It is part of our current path set as well. A cycle is detected.

![Image of Undirected Graph](/engineering-education/graph-cycle-detection-csharp/unidirected-1.png)

#### Code implemetation of cycle detection in unidirected graph
1. Open Visual Studio. Create a Console Application called `UnidirectedGraphCycleDetect`.
2. In the `Main()` method we create a jagged array `graph`. This is what will hold our vertexes and show how they are connected.
3. We call the `MakeGraph()` function. Pass the number of vertexes and the `graph` as the parameters to that function. Below is the code that implements steps 1 to 3.

```c#

 public static void Main(string[] args)
       {

 char[][] graph = new char[][]
           {
 new char[]{ 'A','B'},

 new char[]{ 'B','A'},

 new char[]{ 'B','C'},

 new char[]{ 'C','B'},

 new char[]{ 'C','A'},

 new char[]{ 'A','C'},

           };

 int nodes = 4;

 var hasCycle = MakeGraph(graph, nodes);

 Console.WriteLine($"Does the graph have a cycle ? ---> {hasCycle}");

 Console.ReadLine();

       }

```
4. Construct the adjacency matrix in the `MakeGraph()` function. The concept is still the same as the one of the directed graphs for the function `MakeGraph()` below. The difference is in the variables. In the directed graph code example, we used `int` values. Here we are using `char` values.

```c#
 private static bool MakeGraph(char[][] graph, int nodes)
    {
 Dictionary<int, List<char>> ls = new Dictionary<int, List<char>>();

 bool[] visited = new bool[100];

 bool[] path = new bool[100];

 for (int i = 0; i < graph.Length; i++)
           {
 if (!ls.ContainsKey(graph[i][0]))
               {
 ls.Add(graph[i][0], new List<char>());
               }

 ls[graph[i][0]].Add(graph[i][1]);

           }

 for (int i = 0; i < ls.Count; i++)
           {
 if (HasCycle(ls, ls.ElementAt(i).Key, visited, -1))
 return true;
           }

 return false;

    }

```

5. We will add a new method called `HasCycle()` to our existing class. `HasCyle()` is the Dfs Function in this case. Below is the code that implements cycle detection in an undirected graph. 

>Note that the line `if (current != parent)`, we first check if we are going back to the parent node. If no, `no cycle` has been found. Otherwise, `a cycle is found`.

```c#
 public static bool HasCycle(Dictionary<int, List<char>> connections, int start, bool[] visited, int parent)
       {
 visited[start] = true;
 // Traverse the graph starting from the start node.
 foreach (var item in connections[start])
           {

 if (!visited[item])
               {
 // This is our recursive call. If in our recursion we find a cycle, we immediately return a true.
 if (HasCycle(connections, item, visited, start))

                   {
 return true;
                   }

               }

 var current = (int)item;
 // This is where the difference comes from the directed graph. As we traverse, we check whether the node is a parent.
 // If not then it means that a cycle has been found. We return true.
 if (current != parent)
               {
 return true;
               }

           }
 //If we haven't found a cycle we return false.
 return false;

       }
```



The output of the above code after running it will be:

![Image of Output](/engineering-education/graph-cycle-detection-csharp/output1.png)

### Application of cycle detection
- It is often used in distributed message-based algorithms.
- Used in concurrent systems to detect deadlocks.
- Used in cryptographic systems. It determines the keys of a message that can map that same message to the same encrypted value.

### Conclusion
In this article, we have gone over DFS traversal. It is the best algorithm used to detect a cycle in a graph. It is an important concept especially when one finds themselves having to apply it. I hope this article has made the concept of cycle detection on graphs clear.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
