
# The Knapsack Problem
Imagine you're a world-class thief, and you have just burgled a house with many valuable artifacts. You have brought a backpack or a knapsack, but it can only contain a limited amount of weight. Your goal is to leave with the highest combined value of items that fit in your bag. But how do you pick these items, and what is the optimal value? This is the Knapsack Problem.

For example, let's say there are five items. 

- A signed baseball that weighs 3 pounds and is worth $5,000.
- A bottle of wine that weighs 4 pounds and is worth $7,000
- A medieval helmet that weight 5 pounds, worth $5,000
- A painting that weighs 8 pounds and is worth $8,000
- A porcelain vase that weighs 10 pounds and is worth $11,000

If the backpack can hold 20 pounds what items do you take? For this problem, the optimal value ends up being $25,000 which is achieved by selecting all the items except the porcelain vase.

## Creating the algorithm

For starters, we can think about a brute force approach where we consider every possible combination. But this would be incredibly inefficient as we would have to check $2^n-1$ total combinations if there were $n$ items.

The Knapsack problem is [NP-Hard](https://en.wikipedia.org/wiki/NP-hardness), meaning it is computationally very challenging to solve. Assuming $P \neq NP$, there exists no proper polynomial solution to this problem. In this article, we will discuss both a pseudo-polynomial time solution using dynamic programming and different polynomial approximations for the knapsack problem.

### Dynamic Programming
Dynamic programming determines an optimal solution by first finding optimal solutions to subproblems. Let's see how this applies to the knapsack problem.

When creating our subproblems, we want to think about how different choices lead to different values. For the problem presented above, it is helpful to ask whether or not the porcelain vase is in our optimal solution. This provides us with two choices or subproblems: selecting the vase and not selecting the vase. If we selected the vase, our optimal value would represent the value of the vase plus the optimal solution for the remaining items, which is our first subproblem. Assuming we take the vase we want to determine the optimal solution for the remaining 10 pounds of our bag. Alternatively, if we don't select the vase, we can think about the subproblem being the optimal value of all the items except the vase. We can use the results of these problems to determine if adding the porcelain vase provides the optimal solution. This shows that we can take our original problem and split it into two new instances of the knapsack problem. We can again split these problems into two more instances by asking if the next item is in the knapsack or not, effectively breaking the problem into smaller pieces.

Implementing this method, we might have situations where the same subproblem in needed twice. For these cases, it is helpful to store all the solutions in a table. Along the top of the table, we will have all the possible maximum weights and on the side, we will list each of the items. Each box on the table will represent an instance of the knapsack problem and contain the optimal value for that problem, once we calculate it. For example, in the table below the box with the star represents the subproblem considering the first three items with a maximum weight of nine. 

In general, each element of the table represents the subproblem considering all items up until the element's row and the weight of its column. Notice that we ignore all the items in the rows below the element's row. With this logic, the solution to our entire problem, considering all items and the max weight, is the cell in the final row and the rightmost column. Any sub-problem with no items or weight of zero will produce an optimal value of zero. We will refer to these bases cases as the zeroth row and column. This should make sense as these cases represent situations were no items can be placed in the knapsack. We will call these our bases cases, and they have already been placed into the table. Later we will go over how we can backtrack with our table to determine the optimal subset of items.

<p align="center"> <img src="https://lh3.googleusercontent.com/pw/ACtC-3dHrlyWbuGKi8Mfl00HMpXKtSJTPPrYey_XQzLUAcD-CTe0dT5kvX7Mw7X1mew_5NbdoOthtsAZ7vb94mxdEo7LInwEZORfamEswA6VXGMiWSgDXXrhnb0hgqWgoU6QksERCQTTUtioScfV8Z4oxeBgOg=w1679-h359-no?authuser=0"> </p>

Consider again the element in the table with the star. In this case, we want to ask, is the item in the third row in our optimal solution. This gives us our two subproblems to consider: taking the item and not taking the item. These subproblems have been denoted with the triangle and square respectively. For the triangle, we subtracted out the weight of the third item to construct our subproblem and now we want to determine the optimal solution of the remaining two items and our remaining weight. For the square, we didn't select the item, so the weight for the subproblem doesn't change but again we are only considering the first two items. To find the value of the star, we take the maximum of these situations. We can repeat this splitting process for both the triangle and square until we hit the base cases.

How can we turn this idea into code? Let's denote the table as the two-dimensional array $k$. Each element $k[i,j]$ represents the $i$th row and the $j$th column. We also want two additional arrays, one for the values $v$, and one for the weights $w$. With these definitions, $k[3,9]$ will represent the box with the star. And $v_3$ and $w_3$ will represent and value and weight of the third item, with value five.

This entire process can be written as a recurrence. For any subproblem $k[i,j]$ we must first ask if there is room for the item at index $i$ in the knapsack. So we must compare the weight of the item, $w_i$ to the max weight for our subproblem $j$. If it is possible to include the item, we have to consider both cases again and find the max between the two. If we select the item, our optimal value can be written as $v_i+k[i-1,j-w_i]$. This is the sum of the current item's value $v_i$ and the optimal solution to the subproblem of the remaining items and the remaining weight, $k[i-1,j-w_i]$. If we don't include the item, the optimal value will be the subproblem considering all the items before the current item, $k[i-1,j]$. This would also be the same subproblem to consider if the knapsack didn't have enough room for the item originally. This recurrence can be written as follows. 

$$ k[i,j]=   \left\{
\begin{array}{ll}
      \max(v_i+k[i-1,j-w_i],\, k[i-1,j]) & w_i \leq j\\
      k[i-1,j] & \text{otherwise}\\
\end{array} 
\right.  $$


A python implementation using this recurrence is shown below. In this implementation, we employ a bottom-up approach: first calculating each of the elements of the first row and then working up to the final row. This makes it so our recurrence never tries to access elements of our table that haven't already been calculated. Alternatively, we could implement a recursive approach and only calculating the elements of the table as needed.

```python
# let w be a list of weights. ex:[3,4,5,8,10]
# let v be a list of values. ex:[5000,7000,5000,8000,11000]
# let max_weight be the original max weight of the knapsack
def knapsack(w, v, max_weight):
    w = [None] + w  # Make the first element None
    v = [None] + v  # Make the first element None
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

With this method of completing the table and solving for the optimal total value, we can determine the optimal subset of items. Below we have the completed table for the problem presented above.

<p align="center"> <img src="https://lh3.googleusercontent.com/pw/ACtC-3cdIgUeqGTwClet1VeuPNEDT0Q2BQOTBgJEHe069TTm1EEfxJlyUCqryBqfgsVLhNAJfj5tEU5gdNC-byf02RbRewWOTahyXAHXrv4ae7qtub4evIK-bb-roouLG_mJFQ9EBhtvpfcDUndpdA5x2k-6fg=w1710-h352-no?authuser=0"> </p>

To obtain the items in our solution, we start at the solution square, the bottom right. We can use our recurrence, to determine which case, either selecting the item or not selecting it leads to our optimal solution. For example, let's look at the solution square in the above table, with value 25. The case for selecting the last item would result in a value of $v_5+k[4, 10] = 11 + 12 = 23$. Not selecting the item would result in the optimal value $k[4,20] = 25$. This tells us our optimal solution came from not selecting this last item. We can then draw an array pointing to this next subproblem $k[4,20]$ to help denote this and we can repeat this process at the next subproblem. We see that not selecting this next item, of weight eight, leads to the non-optimal solution of $k[3,20] = 17$. And selecting it leads to the optimal solution of $v_4+k[3,12]=17+8=25$. Again we will draw an arrow pointing to this next subproblem. We can continue this process until we get to a zero, element which would tell us no more item will be added. The arrows representing the completed path are shown in the previous table. With this process, we would determine the optimal subset is the first four items or everything not including the vase.

This process of backtracking in python would be as follows.
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

To see both of these functions together look [here](https://repl.it/@jorqueraian/KnapsackProblem). This solution has a time and space complexity of O\($nW$\) where $n$ is the number of elements and $W$ is our maximum weight. We can see this is the case because there are $nW$ total cells in the table and each cell takes constant time to populate. Therefore, creating our table is O\($nW$\). Backtracking requires us to consider each of the element so we have time complexity O\($n$\). This is a pseudo-polynomial time solution as its runtime is polynomial but depends on the integer $W$ as well as the size of input $n$. But the time complexity in terms of just the input size will have a non-polynomial upper bound. We still do not have a true polynomial solution and assuming $P\neq NP$ there will never exist a polynomial solution.

### Polynomial Approximation
Although it is likely impossible to create a polynomial algorithm, it is important to note the existence of multiple polynomial approximations. To begin with, we can implement a greedy approach and select elements of the highest value to weight ratio. This ends up being a mediocre approximation with O($n$) time complexity, but we can still do much better with the accuracy.

The knapsack problem has a [fully polynomial-time approximation scheme](https://en.wikipedia.org/wiki/Polynomial-time_approximation_scheme). This means it can approximate a solution to any desired precision in polynomial time. Provided with the variable $\epsilon$ our approximated optimal value will be at most a $(1 - \epsilon)$ factor below the true optimal solution. For example, if the true optimal solution was 100 and we pick $\epsilon = .1$ the worst approximation we could obtain is for a solution of value 90.

This approximation uses another dynamic programming method of solving the knapsack problem with time complexity O($n^2\max_i(v_i)$) where $v_{max} = \max_i(v_i)$ is the maximum value of an item. A first glance this is a pseudo-polynomial time solution as it depends on $v_{max}$. But by adjusting each of the values to be proportional to $n$ we can obtain a polynomial solution. We did not cover this algorithm in the previous section as it only performs well for small values of $v_{max}$, and poorly in most other cases. This algorithm is shown below.

```python
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
    # FLip solution because we added things backwards
    return solution[::-1]
```
To create an approximation for the knapsack problem, we want to provide this new algorithm with a value of $v_{max}$ that is proportional to $n$. To do this we must resize the values array. Our approximation will resize the values such that $v_{max}$ is proportional to $n\epsilon^{-1}$ making the time complexity of this approximation O($n^3\epsilon^{-1}$). This has polynomial time complexity as $\epsilon$ is a constant, independent of the problem, unlike $W$ and $v_{max}$. The code for the approximation is shown below.

```python
def knapsack_approx(w, v, max_weight, eps):  
    b = eps/(2*len(w)) * max(v)
    v_p = [int(v[i]/b) for i in range(len(v))]  # Rescale values
    # Run second knapsack that has complexity O(n^2e^{-1})
    return recover_solution2(knapsack2(w, v_p), w, v_p, max_weight)
```
To test out this approximation along side the original algorithm look [here](https://repl.it/@jorqueraian/KnapsackProblem).

## Conclusion