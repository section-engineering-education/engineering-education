# Data Structures in Python, Part 3

The next Data Structure we'll be looking into would be the Stack.

## Table of Contents

- [Stack: Introduction](#stack:-introduction)
- [Uses of Stacks](#uses-of-stacks)
- [Implementing Stacks](#implementing-stacks)
- [Practice Stacks](#practice-stacks)
- [Conclusion](#conclusion)

## Stack: Introduction
A Stack is a linear data structure. It stores items using the Last In, First Out(LIFO) manner. Whenever a new element is added to a stack, it is added to the top of the stack, and the top element is always removed first from a stack.

| ![Stack, Books](/pythonDS/stacks/images/stack-books.jpg) | A great analogy is stacking a pile of books. We always keep a new book on top and remove the topmost book. - Stacks are similar to queues in that they are linear collections of items and they differ by the order they are accessed in. Stacks are used in a variety of areas from Operating System Software, in Compilers and Language Parsing, and to implement other complex Data Structures like Trees and Graphs. |
|:---:|:---:|

```push``` in a stack is putting an item on top of the stack.

```pop``` in a stcak is taking out the top item in the stack.

![Push Pop](/pythonDS/stacks/images/pushpop.png)

## Uses of Stacks
Stacks are used extensively in a lot of places.

- **Compilers and Parsers --** Expression evaluation is done by stacks by postfix or prefix using stacks in compilers.
- **Activation Records --** 
    - An activation record is a data which keeps track of the procedure activities during runtime of a program.
    - When the function is called, an activation record is created for it and keeps track of parameters and information like local variables, return address, static and dynamic links and the return value.
    - This activation record is the fundamental part of programming languages and is **implemented** using a **stack**.
- **Web Browsers --** Web Browsers use a stack to keep track of URLs that you have visited previously. When you visit a new page, it is added to the stack and when you hit the back button, the stack is popped and the previous URL is accessed.
- **To implement other Data Structures --** Stacks are used to implement searches in Graphs and Trees, which are other complex data structures.

## Implementing Stacks

### Stack Methods
There are various functions that are associated with a stack. They are,
- stack.isEmpty()
    - It returns ```True``` if the stack is empty. Else, returns ```False```
    - Time Complexity - O(1)
- stack.length()
    - It returns the length of the stack.
    - Time Complexity - O(1)
- stack.top()
    - Returns a pointer/reference to the top element in the stack.
    - Time Complexity - O(1)
- stack.push(x)
    - Inserts the element, ```x``` to the top of the stack.
    - Time Complexity - O(1)
- stack.pop()
    - Removes the top element of the stack and returns it.
    - Time Complexity - O(1)

### Stack Implementations

In Python, we can implement the stack by various methods. We are gonna dive into two of the methods, the common method and the efficient method.

#### Stack using a List
We use the list methods, ```append``` and ```pop``` to implement a Stack.

```
class Stack:

    def __init__(self):
        """
        Initializing Stack.
        """
        self.stack = []

    def isEmpty(self) -> bool:
        return True if len(self.stack) == 0 else False

    def length(self) -> int:
        return len(self.stack)
    
    def top(self) -> int:
        return self.stack[-1]  

    def push(self, x: int) -> None:
        self.x = x
        self.stack.append(x)       

    def pop(self) -> None:
        self.stack.pop()
```

#### Stack using collection.Deque
Python ```collections``` are container classes that are used for data collection storage. They are highly optimized and are really fast, and they have a ton of methods built-in.
```Deque``` is one such python collection that is used for inserting and removing items. We can use it to create a faster implementation of a stack.

```
from collections import deque
class Stack:

    def __init__(self):
        """
        Initializing Stack.
        """
        self.stack = deque()

    def isEmpty(self) -> bool:
        return True if len(self.stack) == 0 else False

    def length(self) -> int:
        return len(self.stack)
    
    def top(self) -> int:
        return self.stack[-1]  

    def push(self, x: int) -> None:
        self.x = x
        self.stack.append(x)   

    def pop(self) -> None:
        self.stack.pop()
```

## Practice Stacks
Once you are done with understanding the stack and the basic implementation, practice the following problems and problem-sets in order to get a strong grasp on stacks.

- Infix to Postfix - [GeeksForGeeks](https://www.geeksforgeeks.org/stack-set-2-infix-to-postfix/)
- Next Greater Element - [GeeksForGeeks](https://www.geeksforgeeks.org/next-greater-element/)
- Postfix to Prefix - [GeeksForGeeks](https://www.geeksforgeeks.org/postfix-prefix-conversion/)
- Reverse a String using Stack - [GeeksForGeeks](https://www.geeksforgeeks.org/stack-set-3-reverse-string-using-stack/)
- Mini Parser - [LeetCode](https://leetcode.com/problems/mini-parser/)
- Simplify Path - [LeetCode](https://leetcode.com/problems/simplify-path/)
- More Stack Problems - [LeetCode](https://leetcode.com/tag/stack/)
- Stack Problem Set - [HackerRank](https://www.hackerrank.com/domains/data-structures?filters%5Bsubdomains%5D%5B%5D=stacks)

## Conclusion
Thus, we have learnt the implementation, importance and the application of stacks. This is one of the most important data structures and it is extensively asked in computer science related job interviews, and a strong knowledge on this topic would give you an edge.

Stay tuned for the next article in this series!