Search algorithms are important because they solve various problems in artificial intelligence. There are various search algorithms in AI. This article takes you through search algorithms, including their importance and properties. It will also provide the classification of search algorithms and identify the popular search algorithms in AI. 

### What is a search algorithm?
Search algorithms are algorithms that help in solving search problems. A search problem consists of a search space, start state and goal state. Search algorithms help the AI agents to attain the goal state through the assessment of scenarios and alternatives. 

The algorithms provide search solutions through a sequence of actions that transform the initial state to the goal state. Without these algorithms, AI machines and applications cannot implement search functions and find viable solutions.

### Importance of search algorithms
The following explain how and why the search algorithms are important in artificial intelligence:
- **Solving problems:** Search algorithms enhance the solving of problems in artificial intelligence through logical search mechanisms such as problem definition, actions and search space.
- **Search programming:** Many AI tasks can be programmed in terms of search, which enhances the formulation of the solution to a given problem. 
- **Goal based agents:** Search algorithms enhance the effective operation of goal based agents. These agents solve problems by searching the most ideal series of actions that can provide the best solution to a problem. 
- **Support production systems:** Search algorithms support the operation of production systems in AI. These are systems that support AI applications through the use of rules and the procedures for implementing them. Production systems use search algorithms to search for the sequence of rules that can result to the desired action. 
- **Neural network systems:** These algorithms are also important in neural network systems. These are computing systems that consist of interconnected nodes, hidden layer, input layer and output layer. Neural networks are used to perform various tasks in artificial intelligence. Search algorithms enhance the searching of connection weights that will lead to the desired input-output mapping. 
  
### Properties of search algorithms
Search algorithms have the following main properties:
- **Completeness:** A search algorithm can be said to be complete if it provides a solution for a given input if there exists at least one solution for this input. 
- **Optimality:** Search algorithms are also characterized by optimal solutions. These are the best solutions given by the search algorithms at the lowest path cost. 
- **Time Complexity:** These algorithms have a maximum time needed to accomplish a task or provide a solution. The time taken is usually based on the complexity of the task. 
- **Space Complexity:** They have a maximum memory or storage space needed when conducting a search operation. This memory is also based on the complexity of the task. 
  
### How search algorithms work
Artificial intelligence is made possible through AI agents. These agents perform tasks towards achieving a certain goal and establish the actions that can result to the desired goal. The series of these actions provide the solution to the problem.  

The AI agents find the best solution for the problem by searching all the possible alternatives or solutions. The process of searching is done using the search algorithms.

Search algorithms work in two main phases: defining the problem and searching in the search space.

#### Defining the problem
Before formulating a problem, various factors need to be defined to enable the search algorithms to perform the required course of action. Defining these factors provide the basis for searching and providing a solution. The following are the factors that need to be defined:
- **Initial state:** This is the start state in which the search starts. 
- **State space:** These are all the possible states that can be attained from the initial state through a series of actions. 
- **Actions:** These are the steps, activities or operations undertaken by AI agents in a particular state. 
- **Goal state:** This is the endpoint or the desired state. 
- **Goal test:** This is a test conducted to establish whether a particular state is a goal state.
- **Path cost:** This is the cost associated to a given path taken by the agents. 
  
#### Searching in the search space
After defining the factors described above, the agents use the search algorithms to perform searching in the search space. A search space is an abstract configuration that consists a search tree of possible solutions.

A search tree is used to configure the series of actions. The initial state is configured as the root of the search tree. The branches are the actions while the nodes are the outcomes of the actions. 

When we have a given problem in AI, the search algorithm will identify the initial state, state space, actions, goal state and the path cost. From the initial state, a series of actions will be performed as the search algorithms search for the goal state. 

For every state attained by the AI agents, the search algorithms will conduct a goal test to establish whether the state is the desired state. If a particular state attained by the agents is not the goal state, then the search algorithm will continue searching until the goal state is attained. 

The series of actions that transform the initial state to the endpoint or goal state provide the solution to the associated search problem. Real life problems in AI use a series of actions to achieve a desired state from a defined initial state.

### Types of search algorithms
Search algorithms can be divided into two broad categories: uninformed search algorithms and informed search algorithms.

The following image shows the classification of search algorithms:

![Search Algorithms](/engineering-education/understanding-search-algorithms-in-ai/search-algorithms.png)

[Image Source](https://media.geeksforgeeks.org/wp-content/uploads/AI-algos-1-e1547043543151.png)

#### Uninformed search algorithms
These algorithms are also called blind algorithms. This is because they don’t have supplementary information that can assist them attain the end goal other than the information given in the problem definition. 
These algorithms can further be categorized into the following algorithms:
- breadth-first search
- depth-first search
- uniform cost search

##### Breadth-first search
This is an algorithm used for searching graph or tree data structures. It begins at the tree root or search key and traverses all the neighbor nodes in the current depth level before progressing to the nodes existing in the next depth level. 

##### Depth-first search
This is an algorithm used for searching graph or tree data structures. Unlike the breadth-first search, it begins at the root node. It traverses the branch nodes and then backtracks. The data structure of this search uses the concept of LIFO (last in first out).

##### Uniform cost search
These algorithms differ from the breadth-first and depth-first algorithms in that they consider cost. When there are different paths for attaining the desired goal, the optimal solution of uniform cost algorithms is the solution that is associated with the least cost. 	

#### Informed search algorithms
These are heuristic algorithms that consist of the problem definition and supplementary information that assists in achieving the desired goal state. They are better at solving complex problems than the uninformed algorithms. 

Informed search algorithms can be further categorized into the following algorithms:
- greedy search
- A* tree search
- A* graph search
   
##### Greedy search
In greedy search algorithms, the node that is closest to the goal node is expanded. A heuristic function h (x) is used to calculate the closeness factor. h (x) is an estimate of the distance between one node and the end or goal node. The smaller the value of h (x), the nearer the node is to the goal. When the greedy search is searching for the best path to the goal node, it will choose nodes with the lowest possible values. 

##### A* tree search
This algorithm combines the attributes of the uniform cost algorithm and the greedy algorithm. The heuristic in this algorithm is a combination of the cost in the uniform cost algorithm (g (x)) and the greedy search cost (h (x)). The total cost is given as f (x). 

h (x) is known as the forward cost while g (x) is the backward cost. The forward cost estimates the distance between the current node and the goal node. The backward cost is the estimates the cumulative cost between a node and the root node. 

A* tree algorithm is optimal when the forward cost (h (x)) is less than or equal to the actual cost (h* (x)) for all nodes. This is called the admissibility property of A* tree algorithm. The strategy is to select the node with the lowest total cost value (f (x)). 

##### A* graph search 
The main limitation of the A* tree algorithm is that it wastes time as a result of re-exploring initially explored branches. A* graph algorithm overcomes this limitation by configuring a rule that prevents it from exploring the same node twice. 

In this algorithm, the optimal solution is obtained when the forward cost associated with one node A and another successive node B (h (A) – h (B)) is less than or equal to their backward cost g (A->B). This is called the consistency property of A* graph search. 

### Applications of search algorithms
#### Vehicle routing
Search algorithms are used in solving real life vehicle routing problems, which are optimization problems. A vehicle routing problem seeks to establish the optimal series of routes that should be taken by vehicles to deliver customers. This is a combinatorial optimization problem that seeks to minimize the cost and minimize the time taken to reach a given destination. The search algorithm is used to search for the best solution. 

#### Nurse scheduling problem
In the healthcare system, the provision of health care services 24 hours a day require the full time presence of nurses. Given that nurses cannot work without rest, scheduling is done to ensure the shifts are allocated optimally to enhance productivity. Search algorithms are applied in this case to solve the nurse scheduling problem. 

#### Retrieving records from databases
Search algorithms are also used to retrieve information or records from databases. The desired record is configured as the desired state. The algorithm searches in the search space and goal tests are made until the desired record is found. 

#### Industrial processes 
These algorithms are used in the optimization of industrial processes. A good example is in the case of chemical reaction, where the process may involve changing some parameters such as temperature or pressure. When the initial and desired states are defined, a series of actions are performed until the desired state (output) is attained.

### Conclusion
This article looked at the essentials of search algorithms in artificial intelligence. To summarize, we have learned the following:
1. Search algorithms are algorithms that help in solving search problems. A search problem consists of a search space, start state and goal state.
2. These algorithms are important because they help in solving AI problems and support other systems such as neural networks and production systems. 
3. The main properties of search algorithms include optimality, completeness, time complexity, and space complexity.
4. Search algorithms work by defining the problem (initial state, goal state, state space, space cost, etc) and conducting search operations to establish the best solution to the given problem. 
5. There are two main types of search algorithms: informed algorithms and uninformed algorithms. Informed algorithms include breadth-first, depth-first and uniform cost algorithms. Uninformed algorithms include greedy, A* tree and A* graph algorithms. 
6. The main applications of search algorithms include vehicle routing, nurse scheduling, record retrieval and industrial processes. 
   
Happy learning!
