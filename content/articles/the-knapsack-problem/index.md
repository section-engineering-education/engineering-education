---
layout: engineering-education
status: publish
published: true
url: /the-knapsack-problem/
title: Breaking Down The Knapsack Problem
description: In this article, we will discuss two approaches to the Knapsack Problem, including a pseudo-polynomial time solution using dynamic programming and different polynomial time approximations.
author: ian-jorquera
date: 2020-07-10T00:00:00-06:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/the-knapsack-problem/hero.jpg
    alt: knapsack example image
---

Imagine you are a world-class thief, and you have just burglarized a house with many valuable artifacts. You have brought a backpack or a knapsack, but it can only contain a limited amount of weight. Your goal is to leave with the highest combined value of items that fit in your bag, but how do you pick these items and what is the optimal value? This is the Knapsack Problem.
<!--more-->

For example, let's say there are five items and the knapsack can hold 20 pounds.

- A signed baseball that weighs 3 pounds and is worth $5,000.
- A bottle of wine that weighs 4 pounds and is worth $7,000
- A medieval helmet that weight 5 pounds, worth $5,000
- A painting that weighs 8 pounds and is worth $8,000
- A porcelain vase that weighs 10 pounds and is worth $11,000

### Creating the algorithm
For starters, we can think about a brute force approach where we consider every possible combination. But this would be incredibly inefficient as we would have to check $2^n-1$ total combinations if there were $n$ items.

The knapsack problem is [NP-Hard](https://en.wikipedia.org/wiki/NP-hardness), meaning it is computationally very challenging to solve. Assuming $P \neq NP$, there exists no proper polynomial-time solution to this problem. In this article, we will discuss both a [pseudo-polynomial time solution](https://www.geeksforgeeks.org/pseudo-polynomial-in-algorithms/) using dynamic programming and different polynomial time approximations for the knapsack problem.

### Dynamic Programming
Dynamic programming determines an optimal solution by first finding optimal solutions to subproblems. If a problem can be solved in this manner it is said to have *optimal substructure*. Let's see how this applies to the knapsack problem.

When creating our subproblems, we want to think about how different choices lead to different values. For the problem presented above, it is helpful to ask whether or not the porcelain vase is in our optimal solution. This provides us with two subproblems or two possible solutions: selecting the vase and not selecting the vase.

If we selected the vase, our optimal value would represent the value of the vase plus the optimal solution for the remaining items. Assuming we take the vase, we want to determine the optimal solution for the remaining 10 pounds of our bag and the remaining items. This is our first subproblem.

Alternatively, if we don't select the vase, we need to find the optimal value of all the items except the vase. This is our second subproblem. We can use the results of these two subproblems to determine if adding the porcelain vase leads to an optimal solution. Notice that these two subproblems are both themselves instances of the knapsack problem, considering only four items and a max weight of 20 and 10 respectively.

This shows that we can take our original problem and split it into two new instances of the knapsack problem. We can again split these new instances into two more problems by asking if the next item is in the knapsack or not. This effectively breaks the problem into smaller pieces and shows that the knapsack problem has an optimal substructure.

Implementing this method, of splitting our problem into two, we might have situations where the same subproblem is needed twice. For these cases, it is helpful to store all the previously solved solutions in a table. Along the top of the table, we will have all the possible maximum weights and on the side, we will list each of the items. So each row will represent the subset of items from the first item to the item of that row. Each box on the table will represent an instance of the knapsack problem and contain the optimal value for that problem once we calculate it. For example, in the table below, the box with the star represents the subproblem considering the first three items with a maximum weight of nine.

![Table and Arrows](/engineering-education/the-knapsack-problem/table-empty.png)<br>
In general, each element of the table represents the subproblem, considering all items up until the element's row and the weight of its column. Notice that we ignore all the items in the rows after the element's row. With this logic, the solution to our entire problem, considering all items and the max weight, is the cell in the final row and the rightmost column.

Any sub-problem with no items or weight of zero will produce an optimal value of zero. We will refer to these as the base cases and they occur in the zeroth row and zeroth column. This should make sense as these cases represent situations were no items can be placed in the knapsack.

Consider again the element in the table with the star. In this case, we want to ask, is the item in the third row in our optimal solution. This gives us our two subproblems to consider: taking the item and not taking the item. These subproblems have been denoted with the triangle and square respectively. For the triangle, we subtracted out the weight of the third item to construct our subproblem. Now we want to determine the optimal solution of the remaining two items and the remaining weight. For the square, we didn't select the item, so the weight for the subproblem doesn't change, but again we are only considering the first two items. To find the value of the star, we take the maximum of these situations. But first, we would need to solve for the triangle and square. We can repeat this splitting process for both the triangle and square until we hit the base cases.

Let's denote the table as the two-dimensional array $k$. Each element $k[i,j]$ represents the $i$th row and the $j$th column. We also want two additional arrays, one for the values $v$, and one for the weights $w$. With these definitions, $k[3,9]$ will represent the box with the star. And $v_3$ and $w_3$ will represent the value and weight of the third item, with value and weight five. Notice that our table is `0` indexed but the two arrays are `1` indexed. This is done to better align them and in code will require us to add a NULL element to the arrays.

For any subproblem or element in the table $k[i,j]$, we must first ask if there is room for the item at index $i$ in the knapsack. So we must compare the weight of the item $w_i$ to the max weight for our subproblem $j$. If it is possible to include the item, we have to consider both cases of adding and not adding the item $i$ and find the max between the two.

If we select the item, our optimal value can be written as $v_i+k[i-1,j-w_i]$. This is the sum of the current item's value $v_i$ and the optimal solution to the subproblem of the remaining items and the remaining weight, $k[i-1,j-w_i]$.

If we don't include the item, the optimal value will be the subproblem considering all the items before the current item, $k[i-1,j]$. This would also be the same subproblem to consider if the knapsack didn't have enough room for the item originally. This process can then be written as the following recurrence.

<div>
$$ 
k[i,j]=\left\{
\begin{array}{l}
      \max(v_i+k[i-1,j-w_i],\, k[i-1,j]) & w_i \leq j\\
      k[i-1,j]  &\text{otherwise}\\
\end{array} 
\right.
$$
</div>

A python implementation using this recurrence is shown below. In this implementation, we employ a bottom-up approach: first calculating each of the elements of the first row and then working up to the final row. This makes it so our recurrence never tries to access elements of our table that haven't already been calculated. Alternatively, we could implement a recursive top-down approach and only calculate the elements of the table as needed.

```python
# let w be a list of weights. ex:[3,4,5,8,10]
# let v be a list of values. ex:[5000,7000,5000,8000,11000]
# let max_weight be the original max weight of the knapsack
import numpy as np
def knapsack(w, v, max_weight):
    w = [None] + w  # Make the first element None. So it starts at index 1
    v = [None] + v  # Make the first element None. So it starts at index 1
    # We do this to make the w and v arrays line up with the rows of the 2D array.
    # This initializes our table with the base cases to 0.
    k = np.array([[0]*(max_weight + 1)]*(len(w) + 1))

    # Loop though all elements of the table, ignoring the base cases
    for i in range(1, len(w) + 1):  # each row
            for j in range(1, max_weight + 1):  # each column
	            # For each i, j we will apply the reccurence
                if w[i] <= j:
                    k[i, j] = max(v[i] + k[i-1, j-w[i]], k[i-1, j])
                else:
                    k[i, j] = k[i-1, j]
    # Returns the table. As the table will be used to reconstruct the solution.
    # The optimal value can be found at the element k[len(w)-1, max_weight]
    return k
```

With this method, we can complete the table with optimal total values for all subproblems. With the completed table we can determine the optimal subset of items by looking at the completed table.

![Table Empty](/engineering-education/the-knapsack-problem/table-arrows.PNG)

To obtain the items in our solution, we start at the solution square, the bottom right. We can use our recurrence to determine which case, either selecting the item or not selecting it, leads to our optimal solution.

For example, let's look at the solution square in the above table, with value 25. The case for selecting the last item would result in a value of $v_5+k[4, 10] = 11 + 12 = 23$. Not selecting the item would result in the optimal value $k[4,20] = 25$. This tells us our optimal solution came from not selecting this last item. We can then draw an array pointing to this next subproblem $k[4,20]$, and repeat this process.

We see that not selecting this next item, of weight eight, leads to the non-optimal solution of $k[3,20] = 17$. And selecting it leads to the optimal value of $v_4+k[3,12]=17+8=25$. So we know we select the second to last item. Again we will draw an arrow pointing to the next subproblem $k[3, 12]$. We can continue this process until we get to a zero-element.

The arrows representing this process are shown in the previous table. We would then determine that the optimal subset consists of the first four items, or everything not including the vase. And this would have an optimal value of 25 thousand dollars.

This process is called backtracking and in python would be as follows.
```python
def recover_solution(k, w):  
    w = [None] + w # Make the first element None  
    i = k.shape[0] - 1  
    j = k.shape[1] - 1  
    solution = []  
    while i > 0 and j > 0:  
    # Does not adding item i give us the solution?  
    if k[i, j] == k[i - 1, j]:  
        i -= 1  
    else:
        # Or does adding item i give us the solution?
        # In this case we want to the the corresponding index to solution  
        solution.append(i-1)  # Add i-1 becasue we added None
        j -= w[i]  
        i -= 1  
    # Flip solution because we added things backwards  
    return solution[::-1]
```

To see both of these functions together, look [here](https://repl.it/@jorqueraian/KnapsackProblem). This solution has a time and space complexity of O$(nW)$ where $n$ is the number of elements and $W$ is our maximum weight. We can see this because there are $nW$ total cells in the table and each cell takes constant time to populate. Therefore, creating our table is O$(nW)$.

Backtracking requires us to consider each of the items, so we have time complexity O$(n)$. This means the time complexity of the entire problem would be O$(nW)$. This is a pseudo-polynomial time solution as its runtime is polynomial but depends on the integer $W$ as well as the size of input $n$ and therefore is not truly polynomial. A truly polynomial solution would be one that is polynomial and only depends on the input size $n$.

Although this solution is more efficient than the brute force solution, it may still have a non-polynomial upper bound. Assuming $P\neq NP$ there will never exist a truly polynomial-time solution, so this solution is one the most efficient solutions.


### Polynomial Time Approximation
Although it is likely impossible to create a polynomial-time algorithm, it is important to note the existence of multiple polynomial approximations. To begin with, we can implement a greedy approach and select elements of the highest value to weight ratio. This ends up being a mediocre approximation with O$(n\log{n})$ time complexity, as we would have to sort the items. An implementation of this greedy approach can be found [here](https://repl.it/@jorqueraian/KnapsackProblem). We can still do much better with accuracy.

The knapsack problem has a [fully polynomial-time approximation scheme](https://en.wikipedia.org/wiki/Polynomial-time_approximation_scheme). This means it can approximate a solution to any desired precision in polynomial time. Provided with the variable $\epsilon$ we can obtain an approximated optimal value at most a $(1 + \epsilon)$ factor below the true optimal solution. As this precision metric approaches zero, or 100% accuracy, we would start to see non-polynomial run time.

This approximation uses an alternative dynamic programming method of solving the knapsack problem with time complexity O$(n^2\max_i(v_i))$ where $v_{max} = \max_i(v_i)$ is the maximum value of the items. This is also a pseudo-polynomial time solution as it is polynomial in time but depends on $v_{max}$.

We did not cover this algorithm in the previous section, as it only performs well for very small values of $v_{max}$ and is only really used for this approximation. We will compare the performance of this algorithm with the previous algorithm in the conclusion section.

The code for this algorithm is shown below. An in-depth explanation of this algorithm can be found in section 11.8 in the textbook listen in the sources section.

```python
import numpy as np
def knapsack2(w, v):
    # Must assume all values of v > 0 and values of w are < max_weight
    w = [None] + w  # Make the first element None
    v = [None] + v  # Make the first element None
    M = np.array([[0]*(sum(v[1:]) + 1)]*(len(w)))
    for i in range(1, len(w)):
        for V in range(1, sum(v[1:i+1]) + 1):
            if V > sum(v[1:i]):
                M[i, V] = w[i] + M[i-1, V-v[i]]
            else:
                M[i, V] = min(M[i-1, V], w[i] + M[i-1, max(0, V-v[i])])
    # optimal value is the biggest index j such that m[n, j] <= max_weight
    return M
def recover_solution2(M, w, v, max_weight):
    i = M.shape[0] - 1
    V = M.shape[1] - 1
    while M[i, V] > max_weight:
        V -= 1
    w = [None] + w  # Make the first element None
    v = [None] + v  # Make the first element None
    solution = []
    while i > 0 and V > 0:
        if M[i, V] == w[i] + M[i - 1, max(0, V - v[i])]:
            solution.append(i-1)
            V = max(0, V - v[i])
        i -= 1
    # Flip solution because we added things backwards
    return solution[::-1]
```

To create an approximation for the knapsack problem, we want to provide this new algorithm with a value of $v_{max}$ that is proportional to $n$ and therefore no longer dependent on an integer input for the problem. This will give us a true polynomial algorithm. Our approximation will resize the values such that $v_{max}$ is proportional to $n\epsilon^{-1}$, making the time complexity of this approximation O$(n^3\epsilon^{-1})$. This has a polynomial-time complexity, as $\epsilon$ is a constant, independent of the problem, unlike $W$ and $v_{max}$. The code for the approximation is shown below.

```python
def knapsack_approx(w, v, max_weight, eps):  
    b = eps/(2*len(w)) * max(v)
    v_p = [int(v[i]/b) for i in range(len(v))]  # Rescale values
    # Run second knapsack that has complexity O(n^2 * v_{max}) = O(n^2 * ne^{-1})
    return recover_solution2(knapsack2(w, v_p), w, v_p, max_weight)
```
To test out this approximation, look [here](https://repl.it/@jorqueraian/KnapsackProblem).

### Conclusion
Finally, let's look at how well our approximation works, concerning both accuracy and time.

I have randomly generated the following example, but I encourage the reader to investigate their own examples [here](https://repl.it/@jorqueraian/KnapsackProblem).

```python
# Array of the weight and values for each item.
w_arr = [288, 853, 291, 102, 529, 90, 132, 717, 417, 285]
v_arr = [321, 942, 339, 31, 463, 149, 50, 745, 395, 377]
# Weight limit for the knapsack
maximum_weight = 2000
```
We can run this example with each of the implementations we have gone over and compare their results. The first implementation is the pseudo-polynomial dynamic programming solution as presented in the dynamic programming section. We will also look at our alternative dynamic programming solution presented in the approximation section. Then we will consider our two approximations, the greedy approximation, and the fully polynomial-time approximation. We can see the results, over five trials, of each of these algorithms in the following table.

|Algorithm|Result|Average runtime (Seconds)|
|:---|:---:|:---:|
|Dynamic Programming Solution|2213|0.08455|
|Alternative Dynamic Programming Solution|2213|0.14044
|Greedy Approximation|2178|0.00004
|fully polynomial-time approximation, $\epsilon = 1$|2202|0.00179
|fully polynomial-time approximation, $\epsilon = .5$|2213|0.00309

As we can see, both of our approximation algorithms resulted in very good approximations. Our fully polynomial-time approximation was even able to achieve the exact solution.

In general, it depends on the situation that we encounter, to decide what solution we would want to use. For example, if we have a problem with high values but a small maximum weight it would make sense to use our first dynamic programming solution. Its runtime is O$(nW)$, so the low maximum weight would be beneficial. If we had a larger maximum weight, it would no longer make sense to use this algorithm. Instead, we might want to use our alternative dynamic programming solution or one of our approximations.

## Sources
Kleinberg, J. Tardos, E. (2006). Algorithm Design. Cornell University.

<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });

    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>
