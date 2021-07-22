###A Beginner's guide to memoization and Dynamic Programming in Python

as we saw in [this]('https://www.section.io/engineering-education/introduction-to-dynamic-programming/) article, Dynamic programming is the algorithm technique where we break down a problem into smaller, simpler subproblems then find the solutions to these smaller subproblems and use these solutions to find an optimal solution to the original problem.
In this article, we are going to talk about a dynamic programming technique called memoization and we are going to use it to solve an optimization problem.

###Table of contents
[Prerequisites](#prerequisites)

[Memoization](#memoization)

[The 0-1 knapsack problem](#knapsack)

[Python Solution to the 0-1 knapsack problem](#implementation)

[How to apply memoization to the solution](#solution)

###prerequisites<a name='prerequisites'></a>
1. A basic understanding of data structures and algorithms
2. Basic knowledge of Python
3. A basic understanding of Recursion
### what is memoization? <a name='memoization'></a>
memoization is the process of saving the results of a function to a cache in order to improve its performance.
It is the technique where we ensure that the function does not run more than once for the same inputs; instead, we return a cached result to reduce the running time.
It is similar to tabulation except that while tabulation uses the bottom-up approach, memoization uses a top-down approach. This means that when approaching a problem with tabulation, we save the results starting with smaller, lower values going up whereas in memoization we start from the larger values going down.
In the fibonacci example given in the tutorial linked above we can see that we started from values 2 up towards the value passed on to the function.
```python
for i in range(2, n):
   term = array[i - 1] + array[i - 2]
   array.append(term)
   # return the nth term of the array
return array[n - 1]
```
The memoized version of this is going to look like this:
```python
def mem_fib(n, array):
    '''
    n is the fib number,
    array is an array of n+1 numbers
    '''
    if n<=1:
        array[n]=n
    if array[n] is None:
        array[n] = mem_fib(n-1, array)+mem_fib(n-2, array)
    return array[n]
```
In the memoized version you can see that we started from the values n-1 and n-2 going downwards.
Now that you know what memoization is, let's use it to solve a common programming problem.
###The 0-1 Knapsack problem<a name='knapsack'></a>
The 0-1 knapsack problem is an optimization problem where you are given a set of items, their weights and values, and a knapsack. Your task is to determine the combination of items that are going to give maximum value without reaching the weight limit of your knapsack.
For every item in the list, we can either include it in the knapsack or discard it(This is where the 0-1 name comes from).
In the coding implementation of this problem, you are given two arrays, one is the weights array and the other is the values array. You are also given a weight W which is the maximum weight the knapsack can carry.
From the definition alone, we can see that this problem can be solved using Dynamic Programming. This is because it has overlapping subproblems that when solved lead towards solving the whole problem.

###how to solve the 0-1 Knapsack problem in python <a name='implementation'></a>
One way of solving this problem is by writing a recursive function that calls itself twice; the first is where we have included the current item in the knapsack and the second time is when we have ignored the current item.
Our function then compares the results of both calls and returns the maximum value. If we iterate through all the items while doing this then eventually we are going to get the optimal solution.
Let us write the recursive solution first then we will think of ways to memoize it.
our function is going to look like this:
```python
def knapsack(W,weights, values, n):

```
where W is the remaining capacity of the knapsack, weights is the array of weights and values is the array of values our items are worth. n is the length of both arrays.
A recursive function must have a base case. Our base case here is going to be when the knapsack is full(when the remaining available weight we are allowed to add is equal to 0) or when there are no more items on the list
```python
    if n==0 or W==0:
        return 0
```
next, we are going to decide whether to include an item or ignore it.
To do this we have to first check whether the weight of the item is bigger than the remaining capacity.
If the weight of the current item is less than the allowed capacity, we get the max of either ignoring it or adding it to the bag.
```python
    if weights[n-1]<=W:
        return max(values[n-1]+knapsack(W-weights[n-1], weights, values, n-1), knapsack(W, weights, values, n-1))
```
If it is, we ignore it and recursively call self with the same values minus this current element.
```python
    else:
        return knapsack(W, weights, values, n-1)
```


Whether we choose to include it or ignore it, we have to 'pop' the current element from the array, that is we make the next recursive call without it.
This is easy to achieve because we are passing the length of the array, and we are using indices for comparison. All we have to do is decrement the size of the array and in the next call, we are going to be using the next item.
This recursive solution takes exponential time, let's see how we can optimize it to reduce the time complexity.

### how can we use memoization in our function? <a name='solution'></a>
As you can see, there are two values that our recursive function depends on, the remaining capacity that we are allowed to add to the knapsack and the number of items.
We can save the results of the maximum weight when we consider each item so that we don't have to recalculate it every time we encounter it.
Before executing a calculation we can check whether we had already saved the result of such a calculation.
If it exists, we return it instead of recalculating it. We can choose to save them to a regular list or a dictionary. A dictionary has faster lookups so let's use it.
```python

    memodict = {} #initialize empty dict
    def knapsack(W,weights, values, n):
        if n==0 or W==0:
            return 0
        key = str(n)+str(W) #create a string key for each calculation
        val = memodict.get(key)
        if val is not None:
            return val
        if weights[n-1]<=W:
            memodict[key] = max(values[n-1]+knapsack(W-weights[n-1], weights, values, n-1), knapsack(W, weights, values, n-1))
        elif weights[n-1]>W:
            memodict[key] = knapsack(W, weights, values, n-1)

        return memodict[key]

```
#Complexity Analysis
For the unmemoized version, the time complexity is O(2^n) because there are redundant calculations we are making.
For the memoized version, the time complexity is O(n*W) that is the table size by the capacity of the knapsack.

#Conclusion
Memoization is a useful trick to have under your belt when solving a dynamic programming problem, we've seen how we can use it to decrease the time complexity
from 2^n to n*W.

#Resources
[GeeksforGeeks](https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/)
[Hackerearth](https://www.hackerearth.com/)


