---
layout: engineering-education
status: publish
published: true
url: /dynamic-programming-in-javascript-using-tabulation/
title: Dynamic Programming In Javascript using Tabulation
description: A React Component is a small, reusable code responsible for rendering HTML. In React, we can define a component as a class or a function. 
author: valentine-gatwiri
date: 2022-07-04T00:00:00-12:15
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/dynamic-programming-in-javascript-using-tabulation/hero.jpg
    alt: React Components Instantiation Hero Image
---
Tabulation is one of the methods used when solving dynamic programming problems. You start by filling up a table and then figure out the solution to the problem based on the result on the table.
<!--more-->
It is a Bottom-up method. We start solving the problems from the base cases (bottom) and gathering answers to the top. Tabulation implementation is iterative.

The advantage of using tabulation is that it's fast as we directly access previous states from the table. If all sub-problems must be solved once, tabulation is better because all the entries must be filled one by one.

### Prerequisites
To effectively understand the tutorial the reader will need the following:
- A basic understanding of Javascript.
- A suitable IDE such as js complete or VS Code.
- A basic understanding of Dynamic programming.

> Note: After writing your code in js complete, in your chrome browser click on the navigation menu on the top right side of the browser, navigate to more tools then select developer tools to open the console. The console displays the output.

### Key takeaways
- What is tabulation?
- What is iteration?
- Implementation of a gridTraveler.
- Visualization of a gridTraveler.
- Tabulation time complexity.
- Implementing tabulation algorithm. 
- Writing tabulation code.

### Visualizing the problem
You have to comprehend the problem first before tackling it. In this article, we will be solving a grid traveler problem. For example, GridTraveler (1,1) should return one because there is only one way to travel as shown below:

```bash
|1,1 |
|:---:|
```

GridTraveler(2,3) should return three because there are three unique ways to travel: 

![Iteration-visualization](/engineering-education/dynamic-programming-in-javascript-using-tabulation/iteration-visualization.png)

As shown above you can travel using these ways:
- Right, Right, Down
- Right, Down, Right
- Down, Right, Right

You have to visualize your grid traveler problem as a table. The table should be related to the input size. When creating a 2-dimensional table to illustrate the grid, figure out the scope of your table based on the problem input. 

Then initialize the values within the table. Make sure to select compatible types e.g if your problem asks you to return an integer, then initialize the values of your table with integers. After initializing the table with default values select a significant seed value. 

The selected seed value should guide you in filling the rest of the table. In our grid traveler table, we will begin with a one-by-one grid where the answer is obvious, that will be the foundation upon which we fill the table. Then iterate through the table. Look at the problem to figure out the logic that fills other positions of the table according to the current position.    

In our grid traveler problem, we are looking at the right or the downside grid of our current position. This will enable us to compute the logic of our problem. Concentrate on the choices you have in any case of the problem. For example, do you move rightward? Or do you move downward? In our grid.

#### Implementing the algorithm
Let’s solve a 2D grid from the top left corner. Our objective is to move to the bottom right corner, we have two potential moves, that is to move to the right or down. How many methods can we use to travel to the goal, if we have a grid of measurements, k by n?

We will be going through a grid traveler of a two-by-two grid, hence our output will be two. We will make a table that is approximately the size of the input. In our table, there are two inputs, which illustrate the number of rows and the number of columns. We will create a 2D array to compare to that. Our two-dimensional array has dimensions three by three. By giving it a three-by-three array, the bottom right index will be (2,2).

After setting the dimensions for our table. We will figure out the seed values to use. We will count the number of ways to travel through the grid by beginning in the top left corner of the grid.

The initial value to pick is usually zero. Zero by zero will be zero. This is because if any of our sides contains zero, that means our grid contains nothing. Let's fill our grid with zero to make it simple to work with.

Index one by one should return 1 as shown in the grid. This will give us a basis to implement our algorithm. What we want to do now is iterate via this table and produce the logic that merges the values in the table, basically merging distinct sub-problems to solve our problem. 

![Iteration](/engineering-education/dynamic-programming-in-javascript-using-tabulation/iteration.jpeg)

We will now take this one and then add it to our right and down neighbor. That turns them both into one as shown below. Hence we will encode that on our table. We can only move to the right or downward contributing our current element to them. 

![Iteration1](/engineering-education/dynamic-programming-in-javascript-using-tabulation/iteration1.jpeg)

When we do the iterations it helps us to have consistent logic. We will continue adding them that way to fill up our table. In the last position, both neighbors will contribute one adding up to two.

We have completed iterating via the whole grid. Now we can move through a two-by-two grid using two different ways:
- Right, Down
- Down, Right

### Time and space complexity
Before we implement the code, you can already predict its complexity. The complexity is determined by the dimensions of the table. The table has k rows and n columns. When we iterate via the table, it will take O(kn) time and a space for the 2D array, which is still O(kn) space.

### Code implementation
Let's work on implementing this grid traveler tabulation code. So we'll start by initializing our table. Then we will create the correct number of rows by calling Array. We will then add the dimensions.
```js
const gridTraveller=(k,n)=>{
const table=Array(k+1)
```

We should then make sure the elements inside the array are sub-arrays. We will do that by calling fill on the array we just created. And thereafter, we will map over it.

```js
.fill()
.map(()=>Array(n+1));
console.log(table);
};
```

Mapping over the array ensures that every single element of the array is a new array. Now we have roughly k rows and n columns. When we print out, two by three:console.log(gridTraveller(2,3)); and run the code above, it looks like we have a four-by-three array. This is because we increased our initial dimensions by one.

Now that we have the correct shape of our table, we need to insert some good starting/seed values. For now, we will fill the entire table with zeros. So let’s make a new sub-array by adding .fill(0)) before .map(()=>Array(n+1);.

When we run our [code](https://jscomplete.com/playground/s822954), we will have a table with zeros. Which will be better than an empty table.

When we add the code below, the table at position `1,1` will be one. This is our base case.

```js
table[1][1]=1;
```

There's only one way to travel through a one-by-one grid. As demonstrated, now we have the elements of one in place. Let’s iterate through our grid to fill other parts. We will use nested loops for this.

```js
for (let i = 0; i <= k; i++) {
for (let j = 0; j <= n; j++) {
```

We will now take our current element `i` and `j` at the table , and add it into our right and down neighbor. If our row is i and our column is j, we will perform some calculations on i and j. If we want to increment our right neighbor, we will look at the table at position `i, j +1`, which would be direct to our right.

```js
const current =table[i][j];
table[i][j+1]+=current;//add to the right neighbor
table[i+1][j]+=current;//adds to the down neighbor
```

We should keep in mind what is going on at the borders of our grid. If we're at the last part of a row and we do j+1, we will go out of our border. For us not to go out, on the increment expressions, let's add conditional statements.

So, `if( j +1<= n)`, then we will increment to the end. Likewise,`if( i+1<= k)`, we will also increment. Hence j should use n because that's the number of columns and then i should use k because that is the number of rows.

We are iterating through every area of our table, and we are going to take the elements at our current position, and add them into our right neighbor, as well as our down neighbor, only if they exist. After we finish filling the table, our final solution will be at point k at the bottom right corner.

Lastly `return table [k][n]`; this stops the execution of our function and returns our value, then print 2 by 3, 3 by 3, 3 by 2,1 by 1, 4 by 4 and 2 by 2 using the code below and run your code:

```js
console.log(gridTraveller(2,3));
console.log(gridTraveller(3,3));
console.log(gridTraveller(1,1));
console.log(gridTraveller(4,4));
console.log(gridTraveller(2,2));
```

***Here is our full code:***

```js
const gridTraveler= (n, k) => {
const table = Array(k + 1)
.fill()
. map(() => Array(n + 1).fill(0));
 
table[1][1] = 1;
 
for (let i = 0; i <= k; i++) {
for (let j = 0; j <= n; j++) {
const current=table[i][j];
if (j + 1 <= n) table[i][j + 1] += current;
if (i + 1 <= k)table[i + 1][j] += current;
 
  }
}
return table [k][n];

};
console.log(gridTraveler(1, 1));
console.log(gridTraveler(2, 2));
console.log(gridTraveler(2, 3));
console.log(gridTraveler(3, 3));
console.log(gridTraveler(4, 4));
//output  1,2,3,6,20
```

Full code in JS Complete [here](https://jscomplete.com/playground/s822849).

### Conclusion
When solving a problem using tabulation, you must first envision the problem as a table. Size the table based on input, then initialize the table with default values.  Then identify the trivial answer in the table, iterate through the table and then fill further parts based on the recent position.

Hope you found this article useful.

You can now apply this tutorial to structure your algorithms better and thus, write a better program.

Happy coding.
