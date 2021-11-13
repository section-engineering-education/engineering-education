A graph is a non-linear data structure that consists of:-

1. Some grouped vertices are also called nodes.

2. Some ordered pairs of the form (u, v) are called edges.

A graph is like a tree but without any cycles. We do not have a root node in graphs. Below, is an example of a graph with four nodes or vertex and six edges or lines. We don't have a limitation of how many connections we can have from one node. If two nodes are connected, we say they are adjacent or neighbors. `John` and `bob` are neighbors. `John` and `Sam` are not because they are not connected.

[image of a Graph](/engineering-education/graph-cycle-detection/graphexample.png/)

If the edges have a direction, we say we have a directed graph. From the directed graph image below, `John` is connected to `Bob` but the opposite is not true. This is like how Twitter works. If you follow someone, there is a connection from your account to their account. Not the other way round unless they follow you as well.

[image of a directed-graph](/engineering-education/graph-cycle-detection/directed-graph.png/)

There are undirected graphs as well. An example of this can be Facebook. When you add a friend, there is a connection from you to them. The Vice verse is true. The connections do not have a direction.

The edges can also have weights. We use these weights to represent how strong the connection is, For example, Facebook. When two people communicate, we can put more weight on them. We then use that to show their best friends using the nodes that have the highest weights.

[Image of Weighted Graph](/engineering-education/graph-cycle-detection/weightedgraph.png/)

With this brief description, we can get to know what a cycle is and how to detect that in a graph.

#### Prerequisite

To be able to follow this article well, one needs:

1. To have [Visual Studio](https://visualstudio.microsoft.com/) installed.

2. Have an understanding of Recursion. [Recursion](https://www.youtube.com/watch?v=IJDJ0kBx2LM&t=163s)

3. Some understanding of how to build a graph using an adjacency list and matrix.

   -[Adjacency list](https://www.section.io/engineering-education/graphs-in-data-structure-using-cplusplus/)

#### Key Takeaways 

- Understand What is a Cycle in a Graph.

- Understand How to detect a Cycle. 

      1) Depth-first search algorithm.

            - Cycle Detection on a directed graph

            - Cycle Detection on an undirected graph

- Understand different applications of cycle detection.

### What Is A Cycle In Graphs?

A cycle in a graph is where the first and the last vertices are the same. If one starts from one vertex, travels along a path, and ends up at the starting vertex, then this path is a cycle. Cycle detection is the process of finding a cycle.

In our example below, we have a cycle in the path `1` to `3`to `4` and back to `1`. There is no cycle in the top part of the graph. These are paths `1` to `2` to `6` and `1` to `2` to `7`. In any search, if you know there is a possibility of a cycle, you need to manage it. When this is not managed, your algorithm will run infinite times. This leads to a StackOverflow exception error.

[Image of Cycle Graph](/engineering-education/graph-cycle-detection/Cyclegraph.png/)

#### An example of how an infinite loop occurs.

Let's lookup for node `6`. If we start our search going through the path of `1` to `3` to `4`, we will get back to `1`. We have detected a loop at this point. There is no way of ending it. This cycle will keep going. Thus, we will never get to `6`.

### How To Detect A Cycle.

There are different algorithms one can use to detect a cycle. These include:-

1. #### Depth First Search.

Depth First Search (DFS), is a graph traversal method. We start our search from a particular vertex. We then explore all other vertexes as long as we can go along that path. On reaching the end of that path, we do a backtrack up to the point where we began from. The stack data structure is the best for doing the backtracking.

[Image of DFS](/engineering-education/graph-cycle-detection/dfs.png/)

#### Example Of How DFS Works.

From the DFS diagram above, say `1` is our start node. We look at the first item that will be in our adjacency matrix. That is `2`.Instead of queueing nodes adjacent to `1`, we queue nodes that are adjacent to `2`. So we will go to `6`. If `6` is the node we were looking for we stop. Let us assume it is not. We backtrack to `2`. From `2`, we look for other nodes that are connected to it. That is `7`. Since `7` does not have any other connected node and it isn't what we are looking for, we backtrack to `2`. We have finished visiting all nodes connected to `2`. So we backtrack to `1`.

From `1`, we check which other node is connected to it. We have `3`. We visit node `3` and check the nodes connected to it. We have `8`. We visit `8`. It is the last node. No other node is connected to it. If it isn't what we are looking for we backtrack to `3`. `3` does not have other nodes connected to it. We backtrack back to `1`.

We again check from our list for any other node connected to `1`. We have `4`. We visit `4`. `4` doesn't have any other node connected to it. We backtrack to `1`. `1` still has `5` connected to it. We visit `5` and backtrack back to `1`. We are done visiting all nodes.

#### Implementing Cycle Detection Using DFS.

To detect a cycle in a graph, we visit the node, mark it as visited. Then visit all the nodes connected to it. A cycle will be detected when visiting a node that has been marked as visited. The node will also be part of the current path. Below is an explanation, using the cycle graph image.

We declare two boolean array variables. One is called visited. The other is called path. The size of both arrays will be the number of vertexes. In this case, 6. They are first initialized to false.

1. Visit node `1`. Mark it as visited. Mark it as part of our current path. Call node `2`.

2. Visit node `2`. Mark it as visited. Mark it as part of our current path. Call node `5`.

3. Visit node `5`. Mark it as visited. Mark it as part of our current path. No node is connected to it. Remove it from our current path by marking it as false. Leave visited as true. Return to node `2`.

4. Visit node `6`. Mark it as visited. Mark it as part of our current path. Node `6` has no children. Remove it from our current path. Leave it as visited true.

5. Return from node `2` to node `1`. Remove node `2` from our current path. This is because we have finished visiting all the nodes that are connected to it.

We have visited nodes `1`, `2`, `5`, `6`, and only node `1` is part of the current path. Note that all these nodes are marked as visited.

6. Go to node `3` mark it as visited and part of our current path. Call its child node `4`.

7. Visit node `4` mark it as visited and part of our current path. Call its child node `1`.

At this point, we find that `1` is part of our current path. It is also visited. A cycle is detected.

### Code Implementation of Cycle Detection In C#.

1. Open Visual Studio. Create a Console Application called GraphCycleDetect.

2. In the main method we create a jagged array. This is what will show how vertexes are connected.

3. We Declare a variable to hold the number of vertexes.

4. We Call the MakeGraph function. Pass the number of vertexes and the graph as the parameters to that function. Below is the code that implements steps 1 to 4.

```c#

       public static void Main(string[] args)

       {

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

           int nodes = 8;

           var hasCycle = MakeGraph(graph, nodes);

           Console.WriteLine($"Does the graph have a cycle ? ---> {hasCycle}");

           Console.ReadLine();

       }

```

7. Construct a graph in the MakeGraph function.

  - Declare a Dictionary data structure. This is what will store our adjacency list/graph.

  - Declare a visited boolean variable. Its size is the number of nodes.

  - Declare a path boolean variable. Its size is the number of nodes.

  - Populate the dictionary with values.

  - Iterate through the nodes. For each iteration:-

    - Call the DFS function.

  - If the function returns a true, a cycle has been detected. Otherwise, there is no cycle when it returns false.

  Below is the code implementation of step 7 above.

```c#

       private static bool MakeGraph(int[][] graph, int nodes)

       {

           Dictionary<int, List<int>> ls = new Dictionary<int, List<int>>();

           bool[] visited = new bool[nodes];

           bool[] path = new bool[nodes];

           for (int i = 0; i < graph.Length; i++)

           {

               if (!ls.ContainsKey(graph[i][0]))

               {

                   ls.Add(graph[i][0], new List<int>());

               }

               ls[graph[i][0]].Add(graph[i][1]);

           }

           for (int i = 0; i < nodes; i++)

           {

               if (DFS(ls, i, visited, path))

                   return true;

           }

           return false;

       }

```

6. Create a boolean DFS function that detects whether there is a cycle or not. Below is the code for the same. We use recursion for backtracking. If a cycle is detected, we return true, otherwise, we return false.

```c#

       private static bool DFS(Dictionary<int, List<int>> graph, int start, bool[] visited, bool[] path)

       {

           if (path[start])

           {

               return true;

           }

           visited[start] = true;

           path[start] = true;

           if (graph.ContainsKey(start))

           {

               foreach (var item in graph[start])

               {

                   if (DFS(graph, item, visited, path))

                   {

                       return true;

                   }

               }

           }

           path[start] = false;

           return false;

       }

```

### OUTPUT

[Image of Output](/engineering-education/graph-cycle-detection/output1.png/)

2. ### Cycle Detection in Undirected Graph.

In the above example, we have talked about finding a cycle in a directed graph. That algorithm does not work for undirected graphs.

####  Why?

Below we have a graph. Using the previous algorithm, We put `A` and `B` in the current path set. Because there is an edge from `B` to `A` and `A` is part of the current path. A cycle is detected. The algorithm thinks there is a cycle in this graph. A cycle will always be detected between every two nodes connected by an edge. We need a different algorithm for Undirected Graph.

[Image of Graph](/engineering-education/graph-cycle-detection/unidirected.png/)

As we traverse the graph, we should pass the parent of each node to its neighbors. This will prevent going back to the parent.

In the diagram below, we add another edge to form a cycle. We start our depth-first search from any node. Let us say `A`. We put `A` in the set of current path nodes. We then explore the neighbors of `A`. We can go to `B` or `C`. The order does not matter.

We go to `B`. `B` has two neighbors, `A` and `C`. We do not want to go back to where we came from. As we move from `A` to `B`, we should pass `A` as the parent node. When exploring the neighbors of `B` we will know we came from `A`. We won't go in the direction of `A`. We go to `C`.

Add `C` to the current path set. , we pass `B` as the parent node. `C` has one other neighbor `A`. We have already visited `A`. It is part of our current part set as well. A cycle is detected.

[Image of Undirected Graph](/engineering-education/graph-cycle-detection/unidirected.png/)

#### Code Implemetation

We will add a new method called HasCycle to our existing class. HasCyle is the DFS Function. Below is the code that implements cycle detection in an undirected graph. Note that on line `if (current != parent)`, we first check if we are going back to the parent node. If yes, no cycle has been found. Otherwise, a cycle is found.

```c#

       public static bool HasCycle(Dictionary<int, List<char>> connections, int start, bool[] visited, int parent)

       {

           visited[start] = true;

           foreach (var item in connections[start])

           {

               if (!visited[item])

               {

                   if (HasCycle(connections, item, visited, start))

                   {

                       return true;

                   }

               }

               var current = (int)item;

               if (current != parent)

               {

                   return true;

               }

           }

           return false;

       }

```

In this particular example, we are dealing with characters.  we will change the MakeGraph function and Main function. The concept is still the same as for the directed graph for these two functions.

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

### OUTPUT

[Image of Output](/engineering-education/graph-cycle-detection/output1.png/)

### Application of Cycle Detection

1. It is used a lot in distributed message-based algorithms.

2. Used in concurrent systems to detect deadlocks.

3. Used in cryptographic systems. It determines the keys of a message that can map that same message to the same encrypted value.

### Conclusion

I hope that after going through this article, the concept of cycle detection is clearer to you. Happy Coding!
