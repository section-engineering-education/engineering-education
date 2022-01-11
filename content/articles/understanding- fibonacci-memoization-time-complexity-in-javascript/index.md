### Understanding Fibonacci memoization time complexity in Javascript

#### Introduction
First let's start by understanding what is a Fibonacci number, what is memoization, and what time complexity means. We get the Fibonacci number by adding two previous numbers in a Fibonacci sequence. Memoization is an optimization procedure used to speed up computer programs by storing the values of distinct function calls and then returning the stored input when the same function is called again. The time complexity in a computer program describes the amount of time taken by the computer to run an algorithm.

In this tutorial, we will be using Dynamic programming to solve the Fibonacci sequence and learn about the time complexity of our solutions. Dynamic programming problems are mostly solved using two ways which are **tabulation**(bottom-up) and **memoization**(top-down). But we will be talking about memoization.
#### Prerequisites
To effectively understand the tutorial, the reader will need the following:

- Basic understanding of JavaScript.
- A suitable IDE such as VS Code.
- Familiarity with the recursive approach.

#### key takeaways
- What are Fibonacci numbers?
- What is the time complexity?
- How to implement memoization in JavaScript
- How to use recursion to solve Dynamic programming questions
- Understand how time complexity is reduced by memoization improving code runtime

#### Fibonacci sequence time complexity analysis
```js
fib (n)
{
if n<=1
return n
else
return fib(n-1)+fib(n-2)
}
```
In our code above if n is less or equal to 1, we simply return n, or else we make two recursive calls to calculate fib of n-1 and fib of n-2. 

#### Time complexity calculation
When we try to analyze the time complexity of programs we assume that each simple operation takes one unit of time. So if we call method `fib()` of n, n being greater than 1 we first perform a comparison with 1 in `n<=1`, and because n is greater than 1 it goes to the else condition control of the program and here we make two recursive calls where we pass arguments `n-1` and `n-2`.

***Recursive formular to write fibonacci numbers mathematically***
```
For seed values F(0) = 0 and F(1) = 1
F(n) = F(n-1) + F(n-2)
```
So Let's say the time taken to calculate fib of n is `T(n)`.The recursive equation of a Fibonacci number is `T(n)=T(n-1)+T(n-2)+O(1)`. The equation means, the time  we will take to calculate `fib(n)` equals the sum of time we will take to calculate `fib(n-1)` and `fib(n-2)`. We should also include constant time to perform addition.

Fibonacci is now defined as:
```
F(n) = F(n-1)+F(n-2)
```
The characteristic equation for this function will be:
```
x^2 = x+1
x^2 – x–1 = 0
```
### Dynamic programming
 The steps to writing a Dynamic programming solution are :
- You first write the recursive code.
- Then memoize the return value. The memoized return value is used to reduce recursive calls.

#### Classic recursive implementation of a Fibonacci function
"When requested to write a function `fib n` that takes in a number as an argument.Whereby the function is supposed to return the Nth number of the Fibonacci sequence. "~fibonacci questions
- 1 is supposed to be the first and second number of the sequence 
- we should then sum the previous two, e.g 5+8=13 to generate the next number of the sequence 
- Your number needs to take a position of the sequence e.g the 7th Fibonacci number is 13

```
         n :1,2,3,4,5, 6,7, 8,9
    fib (n):1,1,2,3,5,8,13,21,34...
```
#### Example
```js
const fib =(n)=>{
if (n<=2)return 1;
```
In the code above we are taking in a number and returning the number of the Fibonacci sequence. In other words, if I am given sum n that is less than or equal to 2 then what I should do is just return 1. This is because the first two numbers of the Fibonacci sequence are 1. 

```js
 return fib (n-1)+fib(n-2)
 };
 ```
Since we don't know the third Fibonacci number, the function in the code above does its work. It knows that the 3rd Fibonacci number is a sum of the 1st and the 2nd. It runs itself for the 1st and 2nd numbers to figure out that both of them are 1. Now it sums them up and returns them to the original instance of the function which now sums up 2 and 1 to arrive at the result 3.
 
 we should test our code, what I'll do is call examples of the `fib()` function. So I'll try Fib of 6,7,8. The output should be 813 and 21.
 ```js
 console.log(fib(6));
  console.log(fib(7));
 console.log(fib(8));
 ```
There we have it right. 813 and 21. So this is the classic implementation of Fibonacci, and we did solve it recursively.

What I want to do is give  a larger number to this `fib()` function. So what if I asked for the 70th  Fibonacci number, seems like something reasonable to ask for. So if I give this code a shot, 
```js
 console.log(fib(70));
```
Looks like the first three calls of Fibonacci do work fine, I get 813 and 21. But the fourth call take too much time. So obviously, this Fibonacci function needs some work.

### Visualizing the fib function
We will use a recursive tree to visualize our problem. Let's trace through what happens when we call `fib` with number 7. Starting with 7 we will branch out our tree. We will start by subtracting 1 `(n-1)` at the left branch and 2 `(n-2)` at the right branch. Use the same logic on other nodes of the structure. Our base cases are 2 and 1 when we reach there we can't branch out further.

In this case, we will build the entire tree and stop branching out whenever we have a base case scenario. Remember that the numbers inside of the nodes here represent the `n` that we passed in. That being said, if we have the visualization, how does this tree calculate?

***Call tree without Memoization***

![fibo](https://user-images.githubusercontent.com/61587290/148641468-cf520425-9d4c-4742-80d9-f104e3343f60.jpeg)

Let's take a look at some nodes in particular, as we can see in the figure below, this node has a base case, so it's going to return the value of one according to my base case. When we say return that just means, return to your call/parents. So this node of two is going to return one to a parent of three. In the same way. This node on the right-hand side of one is also a base case, it will also return one.

Both of those values that are returning go back to the parent of three, and three is going to add those two values of one plus one which will output two. And this makes a lot of sense because we know that the third Fibonacci number is two. So we can continue this process. ***NB:All the base cases return 1 to their parents.***

The values are going to add up. This process continues up the tree, just adding our left and right children. To get the answer we should return the very top of our tree, the final result is 13 which makes a lot of sense because at the start we said that the `fib 7-> 13`.

![fibb](https://user-images.githubusercontent.com/61587290/148641505-2038c776-4911-4c6f-a4c3-0eb26f2f6866.jpeg)
               
Now that we understand how to visualize a Fibonacci function. Let's get started on time complexity.
#### Time complexity
Classic recursive implementation usually has `0(2^n)` time complexity as shown above. For us to find the time complexity of our algorithm let's ask ourselves how many times will we be calling `fib()`?

Our tree's first level is one call: fib 7. We have two calls in the next level fib 6 and fib 5 . We have four calls in the next level. We have two additional nodes each time our node branches off, so it's `2*2*2... = 2^n.` making it `O(2^n)`, it's not usually `2^n`. You can see that in level 5 a node is missing and in level 6 there is only one node. This means that our tree is asymmetric.

####  Memoization
`o(2^n)` is not a desirable time complexity. This means if I ask for fib 70 it will take `2^70` steps to be executed. and hence I will get a very large number because it takes a lot of steps. So what I want to do is look for any repeated patterns that I see in the recursive nature of this problem. The subtrees duplicate themselves in the figure above.

What I will do now is capture a duplicate subtree, reuse these calculations then I should store that because later on, it might be useful when I need to recalculate I can just use my stored data.

We are now going to implement some memoization, Memoization is one of the overarching strategies we can use to solve any dynamic programming problems. Using memoization I am looking to store some duplicate sub-problems that way I can just get those results later on.

We will be using a JavaScript object to memoize our code. Our keys to the object will be the argument to our function and then the value will be our return value. So what I can do for my existing `fib()` function is I will just add some optional arguments. So we will assign a memo to an empty object as shown below:
```js
const fib=(n,memo={})=>{
}
```
This means if I were to call the `fib()` function and not pass in a second argument, by default it will create a `memo` in the code above as containing a new empty javascript object. What we need to do is treat it as if the `memo` is going to store `n` as the key and values are going to be just the return values for the `fib()` function.

We are going to check the existence of our argument `n` inside of our `memo` by adding a base case. And if it is there, then we can just get the stored value from that `memo` hence we will do an early return.
```js
if(n in memo)return memo[n];
// memo fetching logic
```
We are going to return the value that corresponds to the memo's key using the original argument `n` as a key in my `memo`. 
**NB: `(n in the memo)` condition is just some classic javascript syntax. I am checking if some key is inside of the javascript object**

Let's now store our entire result inside of our memo , our key is `n`. The key you use to access is always just what your argument is. I want to complete the original return so I can just go ahead and return what I just put in that memo, so I am not changing any return values. But now I am also saving the value inside of the memo object.
```js
memo [n]= fib(n-1)-fib(n-2);
return memo[n];
```
What I want to do now is make sure that all of these recursive function calls are accessing the same memo. So what I will do is I will pass in, that object to both of these calls.
```js
memo[n]=fib(n-1,memo)+fib(n-2,memo);
```
We only receive a top-level `memo` object whenever we make a top-level call at a fib because we are not passing in a second argument as shown in the `return memo[n];`.

However, if we take a look at my recursive calls I do pass in explicit second arguments and so they are going to receive the same `memo` object and it would be like it's passed by reference. This is because when you pass a Javascript object to a function you receive that exact object.

So basically I am giving my function calls a way to communicate to each other because they all have some sort of global information to reference across all the recursive trees.

##### Below is our complete memoized code:
```js
const fib=(n, memo ={})=>{
if(n in memo)return memo[n];
```
- In the above called the changes I made is I added a new argument and a new base case in the line above.

```js
if(n <=2) return 1;
memo[n]=fib(n-1, memo) + fib(n-2, memo);
return memo[n];
};
```
- Then added memo storing logic in line 4 but I did not change any of the functional logic.
- When we also check our test cases we see our runtime as improved greatly.

#### Tree implementation

![memo](https://user-images.githubusercontent.com/61587290/148676929-8c8a84f9-0fd0-4c0f-bde5-3562d7be6859.jpeg)

The  nodes with the red color around them are  returning the memoized result. If you ignore them, as you can see the algorithm gets called once for each value from 0 to n.

When you write a call tree for something larger or smaller than fib(7). Maybe fib(10) or fib(20). You'll see that it looks just like our tree in the image above.

#### Time complexity calculation 
Let's take  time complexity  of `n` to be`T(n)` , hence` T(n) = T(n-1) + T(n-2).` This is because `F(n-2)` is  the one which is in the cache when we calculate `F(n - 1)`, so the function of `F(n-2)` is 1(reading from cached equation), hence `T(n) = T(n-1) + 1 = T(n-2) + 2 = ... = T(n-n) + n.` And `T(0) is 1`, hence `T(n) = O(n + 1) = O(n)`.

#### conclusion
The pattern of overlapping problems to reduce the time complexity of the Fibonacci series from O(2n) to O(n) is known as Dynamic programming. For us, the dynamic program is going to be any instance where we have some larger Fibonacci problem and we can decompose it in to smaller instances of the same problem, hence we will have an overlapping structure.

happy learning!
