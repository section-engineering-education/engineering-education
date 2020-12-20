#Understanding the Big O notation
We all need a way to measure the performance (efficiency) of our algorithms as they scale up.
The analysis of the efficiency is performed by considering the amount of resources, in this case **time** and **space**, an algorithm consumes as a function of the **size of the inputs** of the algorithm.
The space used is determined by the number and sizes of variables together with the data structures being used while the time is determined by the elementary operations that must be performed during the algorithm execution.
This methodology is independent of the software and hardware environment that takes into account of all possible inputs.
This is done by a high-level description of the algorithm by associating each algorithm with a function **f(n)** that characterises the running time of the algorithm in terms of the input size **n**.
Given functions **f(n)** and **g(n)**, we do say that *f(n) is Big O of g(n)* being written as:

`f(n) is O(g(n))`

Therefore Big O, pronounced as Big Oh), describes how good the performance of your algorithm is as the input data grows larger.
 
It assists us in knowing which algorithm suits which task and which one is not by estimating the different runtimes of the algorithms. The estimation of the manner in which the runtime varies with the problem size is called the **runtime complexity** of an algorithm.

An easy illustration of how different algorithms use different durations is a tale of a South African telecommunication company with a slow network speed and a pigeon. The company wanted to send some information to its other office which was 50 miles apart. The information was given to the duo using  data signals and an envelope respectively. Ironicallly, the pigeon delivered the data ahead of the telco network. Here, the pigeon could deliver any amount of information whether too large or too little at the same constant speed while the network's delivery time was inversely proportional to the amount of information being sent.

There are several notations of the Big O and here am going to discuss a few of them which are:
-**O(1)**
-**O(n)**
-**O(n<sup>2)**
-**O(log<sub>2</sub>n)**

At the end of the article, we will estimate the Big O of a sample algorithm.

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

`def show_array_elements(array):`
    `for i in range (len(array)):`    
        `print(array[i]+"\n")`

The code takes in an array using the function `show_array_elements()` and displays the array elements.
If the array passed in as an argument only has **1** element, then the algorithm will only take **1 operation** to run and would similarly take **300** operations for an array with **300 elements**. The number of times the loop iterates depends on the number of the array elements.

###3. O(n<sup>2</sup>) Quadratic Runtime complexity
The algorithm varies with the square of the problem size, n.
Example:
`def add_array_elements(array):`  

    sum = 0  
     for i in range (len(array)):      
        for j in range (len(array)):         
         sum += array[i]+array[j] 
         
    return sum

The code has two loops, the *outer* and the *inner*. The outer loop iterates n times giving an element to the inner loop which again loops n times, per one loop of the outer array, adding the element given by the outer array and all the array elements.

Taking a case where the array has 3 elements; the outer loop takes  3 operations in total to iterate over each element. For each 3 operations of the outer loop, the inner loop also takes 3 operations to iterate over each element. That is 3 × 3 operations amounting to 9.

###4. O(log<sub>2</sub>n)- Logarithmic Runtime complexity
This is associated with the binary search algorithm which searches by doing necessary halvings to get the item being searched.
The essence of this method is to compare the value being searched for, let's name it *X*, with the middle element of the array and if X is not found there, we then decide which half of the array to look at next. This is repeated until X is found.
The expected number of steps depends on the number of halvings needed to get from n elements to 1 element.
Have a look at the code and graphical illustrations below:

`def binary_search(array, query):`
 ` lower_bound = 0`
 ` upper_bound = len(array)-1`
  `found_bool = False`
 `while (lower_bound <= upper_bound and found_bool == False):`
 `middle_value = (lower_bound + upper_bound) // 2`
        
        if array[middle_value] == query:
           found_bool = True
           return found_bool
        elif query > array[middle_value]:
           lower_bound = middle_value + 1 
           
        else:
           upper_bound = middle_value - 1
           
    return found_bool

`array = [1,2,3,4,5,6,7,8,9]`
`query = 7`

`val_found = binary_search(array, query)`

#####Step 1
The code takes in a sorted array with 9 elements through the function `binary_search()` and searches for the value, the parameter named query, 7. It divides it in half and checks if 7 is in the middle.

| 1|2|3|4|5|6|7|8|9|
--|--|--|--|---|----|--|---|---|


#####Step 2
The middle value is 5 and our algorithm checks it with 7 and since 7 is greater than 5, then it will move to the right hand side since 7 is greater than 5.

| 1|2|3|4|~~5~~|6|7|8|9|
--|--|--|--|---|----|--|---|---|

#####Step 3
We now have an array with 4 elements. The algorithm will divide it by half to get two arrays with 6 & 7 and 8 & 9.
The one with 8 & 9 will be ignored and the algorithm will now check and compare 6 and 7.

|~~6~~|~~7~~|8|9|
|----|--|---|---|

#####Step 4
The comparison will be done and we will arrive at 7.
|7|
|---|
Further example inputs and the **maximum** number of steps to be taken are shown in the table below:
| n |log<sub>2</sub>n|
|---|---|
|10| 4|
|100| 7|
|1000| 10|
|10000| 14|
|100000| 17|

##Determining the Big-O Notation of a Code
Here we look at the best case and worst case scenarios.
####Best and Worst Case Scenarios
We will base our inferences based on the code below:

`def linear_search(array, query):`
  `lin_found_bool=False`
    `while(lin_found_bool == False):`

      for i in range (len(array)):
        if array[i] == query:
           lin_found_bool=True
        else
            lin_found_bool=False


`def binary_search(array, value):`
    `lower_bound = 0`
   ` upper_bound = len(array)-1`
    `found_bool = False`
    `while (lower_bound <= upper_bound and found_bool == False):`

        middle_value = (lower_bound + upper_bound) // 2
        
        if array[middle_value] == value:
           found_bool = True
           return found_bool
          
        elif value > array[middle_value]:
           lower_bound = middle_value + 1 
           
        else:
           upper_bound = middle_value - 1
           
    return found_bool

`array = [1,2,3,4,5,6,7,8,9]`
`value = 7`

The best case for `linear_search()` would be finding the value 1, O(1), while the worst case would be finding the last array element or a value not included in the array O(n). This is due to the fact that it needs to traverse each element giving a O(n) complexity.

The best case for the `binary_search()` would be searching the value of 5, which is the value in the middle of the array O(1).
The worst case would be searching the value 1 or 10, the first and the last elements of the array, or a value not included in the array.
This is because the algorithm needs to make the halvings necessary until it reaches the first and the last elements (O(log<sub>2</sub>n)).


##Estimating the Big O notation of a code
We need to always look at the worst case scenario perspective.
We will estimate the Big O of the code below (We are simply estimating its complexity, I have not put any conditional checks for the code):
`def array_arithmetic(array):`
    
    value = 0  # O(1) complexity
        for i in range (len(array)): # O(n) complexity
    
        for j in range (len(array)-10): # O(10) complexity
        
            for k in range (len(array)//2): # O(n/2) complexity
                
                value += array[i] + array[j] + array[k] # O(1) complexity
           
    return value # O(1) complexity

We should start with the innermost loop.
1. The inner most loop has **O(n/2)** complexity while its operation has **O(1)** complexity.
    The inner most loop therefore has **(n/2) * (1)** complexity.

2. The second inner loop has O(10) complexity and the inner loop (in No. 1) of this loop has **O(n/2)** meaning the whole second inner loop has **(10) * (n/2) = O(5n)** complexity.

3. Lastly, outer loop has **O(n)** complexity. The inner loop (No. 2) of this outer loop has in total **O(5n)** complexity.
So, they have **n*5n = 5n<sup>2</sup>** complexity.

4. Combining the loop's complexity together with the two operations outside the loop, we get **1+1+5n<sup>2</sup> = O(2+5n<sup>2</sup>)**.

We drop all constants when estimating the Big O notation in that we remain with  O(n<sup>2</sup>) instead of **O(2+5n<sup>2</sup>)**. 
The code above therefore has **O(n<sup>2</sup>)** complexity.

That's all for now. Hope you will consider the scalability of your algorithm next time you write one.