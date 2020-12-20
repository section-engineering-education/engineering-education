#Understanding the Big O notation
We all need a way to measure the performance (efficiency) of our algorithms as they scale up.
The analysis of the efficiency is performed by considering the amount of resources, in this case **time** and **space**, an algorithm consumes as a function of the **size of the inputs** of the algorithm.
The space used is determined by the number and sizes of variables together with the data structures being used while the time is determined by the elementary operations that must be performed during the algorithm execution.
This methodology is independent of the software and hardware environment that takes into account of all possible inputs.
This is done by a high-level description of the algorithm by associating each algorithm with a function **f(n)** that characterises the running time of the algorithm in terms of the input size **n**.
Given functions **f(n)** and **g(n)**, we do say that *f(n) is Big O of g(n)* being written as:

`f(n) is O(g(n))`

Therefore Big O, pronounced as Big Oh), describes how good the performance of your algorithm is as the input data grows larger.
 
Big O assists us in knowing which algorithm suits which task and which one is not by estimating the different runtimes of the algorithms. The estimation of the manner in which the runtime varies with the problem size is called the runtime complexity of an algorithm.

An easy illustration of how different algorithms use different durations is a tale of a South African telecommunication company with a slow network speed and a pigeon. The company wanted to send some information to its other office which was 50 miles apart. The information was given to the duo using  data signals and an envelope respectively. Ironicallly, the pigeon delivered the data ahead of the telco network. Here, the pigeon could deliver any amount of information whether too large or too little at the same constant speed while the network's delivery time was inversely proportional to the amount of information being sent.

There are several notations of the Big O and here am going to discuss a few of them which are:
-**O(1)**
-**O(n)**
-**O(n<sup>2)**
-**O(log<sub>2** **n)**

*In the code examples, I used Python for illustrations but you can rewrite them using a language of your choice.*
###1. O(1) Constant Runtime complexity
This means that the algorithm does a fixed number of operations no matter the number of inputs. Let's look at the code snippet below:
`def first_element(array):`
    `print(array[0])`
The function `first_element()` takes an array passed in and prints the first element and does not consider how many elements are present in the array.
 Take a look at the graph representation below:

###2. O(n) Linear Runtime complexity
This means that the runtime complexity of your algorithm increases linearly with the size of the input data.
Example:
`def show_array_elements(array):
    for i in range (len(array)):    
        print(array[i]+"\n")`
The code takes in an array using the function `show_array_elements()` and displays the array elements.
If the array passed in as an argument only has **1** element, then the algorithm will only take 1 operation to run and would similarly take 300 operations for an array with 300 elements. The number of times the loop iterates depends on the number of the array elements.