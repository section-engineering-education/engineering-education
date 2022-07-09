---
layout: engineering-education
status: publish
published: true
url: /fibonacci-memoization-time-complexity-in-javascript/
title: Understanding Fibonacci Memoization Time Complexity in JavaScript
description: This article will help the reader understand Fibonacci memoization and it's time complexity in JavaScript. 
author: valentine-gatwiri
date: 2022-03-03T01:00:00-06:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/fibonacci-memoization-time-complexity-in-javascript/hero.jpg
    alt: Fibonacci memoization time complexity in Javascript Hero Image
---
Memoization is an enhancement procedure used to speed up computer programs by keeping the values of distinct function calls and returning the stored input when the same function is invoked again. 
<!--more-->
In software development, time complexity describes the time the computer takes to run an algorithm.

In this tutorial, we will use dynamic programming to solve the Fibonacci sequence and learn about the time complexity of our solutions. 

Dynamic programming problems are mostly solved using two ways: **tabulation** (bottom-up) and **memoization** (top-down). In this tutorial, we will focus more on memoization.

### Prerequisites
To effectively understand the tutorial, the reader needs:

- Some basic understanding of JavaScript.
- A suitable IDE such as VS Code.
- Familiarity with the recursive approach.

### key takeaways
- What are Fibonacci numbers?
- What is the time complexity?
- How to implement memoization in JavaScript.
- How to use recursion to solve Dynamic programming questions.
- Understand how time complexity is reduced by memoization.

### Dynamic programming
When engaging in dynamic programming, you need to:
- Write recursive code.
- Memoize the return value, which is used to reduce recursive calls.

#### Classic recursive implementation of a Fibonacci function
*1* is always the first and second number of the Fibonacci sequence:

```bash
n :1,2,3,4,5,6, 7, 8,9
fib (n):1,1,2,3,5,8,13,21,34...
```

We add the previous two numbers in the sequence, e.g. 5+8=13, to generate the next number in the sequence. The number needs to take a sequence position, e.g. 13 is the 7th Fibonacci number.

**Example:**

```js
const fib =(n)=>{
    if (n<=2)return 1;
}
```

In the above code, we are taking in a numerical value and returning the number of the Fibonacci sequence. 

In other words, if the sum of *n* is less than or equal to 2, then we will return 1. 

```js
 return fib (n-1)+fib(n-2)
```

The function in the above code can determine the 3rd Fibonacci number by adding the 1st and 2nd figures. Then, it runs to ensure that the 1st and 2nd numbers are 1. 

It then adds and returns them to the original instance of the function, which now adds *2* and *1*.
 
Let's now test our code to check its efficiency. We will calculate the Fib of *five, six*, and *seven*. The output should be *5, 8*, and *13*.

```js
console.log(fib(5));
console.log(fib(6));
console.log(fib(7));
```

The above code displays the expected results. Now, let's allocate a bigger number to the `fib()` function. First, we will determine the *70th* Fibonacci number as follows:

```js
console.log(fib(70));
```

Looks like the first three calls of Fibonacci worked fine. However, the fourth call takes a lot of time. We, therefore, need to modify the Fibonacci function for faster results.

### Visualizing the fib function
We will use a recursive tree to visualize our problem. But, first, let's trace through what happens when we call the `fib` method with 7. 

We will branch out our tree, starting at number 7. The first step is to subtract 1 `(n-1)` at the left branch and 2 `(n-2)` at the right node. 

Use the same logic on other nodes in the structure. Our base cases are 2 and 1 because we cannot branch out any further.

In this case, we will build the entire tree and stop branching out whenever we have a base case scenario. 

**Call tree without memoization**

![calltree tree](/engineering-education/fibonacci-memoization-time-complexity-in-javascript/calltree.jpeg)

We will have one and two as our base cases in our tree. Therefore, they will return 1 to the parent. We then add these two values to find the following number in the sequence. 

> Note that all base cases return 1 to their parents.

We will now add the values of the left and right children until we reach the top of our tree; the final result is 13.

![return tree](/engineering-education/fibonacci-memoization-time-complexity-in-javascript/returntree.jpeg)

#### Time complexity
As shown above, classic recursive implementation usually has `0(2^n)` time complexity. Therefore, to find the time complexity of our algorithm, we should consider how many times we will be calling `fib()`.

In the first level of the tree, we have one call: fib 7. There are two calls in the next level (fib 6 and fib 5) and four in the preceding level. 

Each time our node branches off, we have two additional nodes, so it's `2*2*2... = 2^n.` making it `O(2^n)`. Note that it's not usually `2^n`. 

You can see that in level 5, a node is missing, and in level 6, there is only one node. This means that our tree is *asymmetric*.

### Memoization
`0(2^n)` is not a desirable time complexity. If we ask for fib 70, it will take `2^70` steps to be executed. Therefore, we will get a large number because it takes a lot of steps. 

Let's search for any repeated sub-trees in the recursive nature of our tree. Then, the subtrees can duplicate themselves.

To implement memoization, we need to capture a duplicate subtree, reuse these calculations then store them. This information may be useful when we need to recalculate specific details.

We will be using a JavaScript object to memoize our code. The keys to the object will be the function's argument, while the value will be our return value. 

We need to add some optional arguments to our existing `fib()` function. Therefore, we will assign a memo to an empty object, as shown below:

```js
const fib=(n,memo={})=>{
}
```

This means if we call the `fib()` function without passing in an argument, a `memo` will be created by default.  

The `memo` will contain an empty JavaScript object. We will assume that the `memo` stores `n` as the key. The values will be returned from the `fib()` function.

We need to check for the existence of our argument `n` inside of our `memo` by adding a base case. If it's found, we can retrieve the stored value from that `memo` and thus, finish the execution quickly.

```js
if(n in memo)return memo[n];
// memo fetching logic
```

We used the original argument `n` as a key in our `memo` to return the value that correlates with the memo's key.

> `(n in the memo)` condition is just some classic JavaScript syntax. So we are checking if some key is inside the JavaScript object.

Let's store our entire result inside our memo; our key is `n`. We will complete our initial operation and return the results in the memo. Therefore, we will not change any return values. 

> Note that the access key should always be your argument.

```js
memo [n]= fib(n-1)-fib(n-2);
return memo[n];
```

The next step is to pass a memo object to all of the recursive calls:

```js
memo[n]=fib(n-1,memo)+fib(n-2,memo);
```

We only receive a top-level `memo` object whenever we make a top-level call at a `fib` function. This is because we are not passing in a second argument as shown in the `return memo[n]`.

Since we are not passing explicit second arguments in our recursive calls, they will receive the same `memo` object, and it will look like it's been passed by the reference.

**Below is our complete memoized code:**

```js
const fib=(n, memo ={})=>{
if(n in memo)return memo[ n];
```

We added a new argument and a base case in the above code changes.

```js
if(n <=2) return 1;
memo[n]=fib(n-1, memo) + fib(n-2, memo);
return memo[n];
```

We also added a memo storing logic as `memo[n]=fib(n-1, memo) + fib(n-2, memo)`. Note that we did not substitute any of the functional logic. These changes, therefore, allow our program runtime to improve greatly.

#### Tree implementation
![Memoized tree](/engineering-education/fibonacci-memoization-time-complexity-in-javascript/memoized.jpeg)

In the above image, the red nodes return the memoized result. The algorithm is called once for each value from *0 to n* if ignored.

A call tree for a figure more prominent than `fib(7)` will be the same as in the above image.

#### Fibonacci sequence - Time complexity analysis

```js
fib (n){
if n<=1//1 unit for comparison <=
    return n
else
    return fib(n-1)+fib(n-2)//3 units(2 for subtraction and 1 for addition)
}
```

In the above algorithm, if *n* is less or equal to *1*, we return *n*or make two recursive calls to calculate *fib of n-1* and *fib of n-2*. 

#### Time complexity calculation
You can use different formulas to calculate the time complexity of Fibonacci sequence.

When we analyze the time complexity of programs, we assume that each simple operation takes one unit of time. 

Therefore, if we call the `fib()` function of *n*, *n* being greater than 1, we will first perform a comparison with 1 in `n<=1`. 

Since *n* is greater than 1 it goes to the *else* condition control of the program. This is when we perform two recursive calls and pass arguments `n-1` and `n-2`.

Let's say the time taken to calculate the *fib* of *n* is `T(n)`.

```bash
series:0 1 1 2 3 5 8
//4 is the number of units
T(n)=T(n-1)+T(n-2)+4
T(0)=T(1)=1
T(n-1)=T(n-2)
T(n)={2T(n-2)+c}+c   [c=4]
  =2{2T(n-4)+c}+c
  =4T(n-4)+3c
  =8T(n-6)+7c
  =16T(n-8)+15c
T(n)=2^k T(n-2k+2^k-1)c
n-2k=>k=n/2
T(n)=2^n/2 T(0)+(2^n/2-1)c
T(n)=(1+c)*2^n/2=c
T(n) α 2^n/2 //(lower Bound)
```

- O(n)=> fib(iteration)-linear time algorithm
 
In the equation above, we are looking for the smallest value rounded up to the estimated value.

```bash
T(n-1)=T(n-2)
T(n)=2T(n-1)+c   [c=4]
  =4T(n-2)+3c
  =8T(n-3)+7c
  =2^k T(n-k)+(2^k-1)c
  n-k=0=>k=n
 T(n)=2^n T(0)+(2^n-1)c
 T(n)=(1+c)*2^n-c
 T(n) α 2^n //(upper bound)
```

- O(2^n)=>fib(recursion)-Exponential time algorithm
 
In the equation above, we are looking for the largest value rounded up to the estimated value.
 
On finding the solution to the above equation, we obtain the upper bound of Fibonacci as O(2^n). 

This is not the tight upper bound. However, Fibonacci can be mathematically represented as a linear recursive function to find the tight upper bound.

**Recursive formula for writing Fibonacci numbers mathematically**

```bash
For seed values F(0) = 0 and F(1) = 1
F(n) = F(n-1) + F(n-2)
```

The recursive equation of a Fibonacci number is `T(n)=T(n-1)+T(n-2)+O(1)`. This is because the time taken to compute `fib(n)` equals the quantity of time we will take to compute `fib(n-1)` and `fib(n-2)`. 

Therefore, we should also include constant time in the addition. Fibonacci is now defined as:

```bash
F(n) = F(n-1)+F(n-2)
```

#### Memoized time complexity calculation 
Let's take time complexity  of `n` to be `T(n)`, hence` T(n) = T(n-1) + T(n-2)`. 

This is because `F(n-2)` is in the cache when we calculate `F(n - 1)`. Therefore, the function of `F(n-2)` is 1 (reading from cached equation), hence `T(n) = T(n-1) + 1 = T(n-2) + 2 = ... = T(n-n) + n.` 

`T(0) is 1` will be regarded as `T(n) = O(n + 1) = O(n)`.

### Conclusion
In a Fibonacci sequence, the ratio of two successive Fibonacci numbers is close to the Golden ratio value of 1.618034.

The two different ways to find the Fibonacci sequences are recursive relation and the Golden ratio method.

You can use the knowledge gained from this article to structure your program better and thus, reduce time complexity.

Happy learning!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)