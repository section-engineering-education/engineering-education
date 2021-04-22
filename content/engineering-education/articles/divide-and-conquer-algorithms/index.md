---
layout: engineering-education
status: publish
published: true
url: /engineering-education/divide-and-conquer-algorithms/
title: Divide and Conquer Method using Stock Price Optimization Problem
description: In this article we will explore the algorithm to find the maximum possible profit given a list of historical prices. We will also discuss the advantages and disadvantages of the divide and conquer paradigm.
author: lalithnarayan-c
date: 2020-12-15T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/divide-and-conquer-algorithms/hero.jpg
    alt: divide and conquer method example image
---
Consider the scenario of the stocks and the stock markets. Everyday, millions of people trade equities and commodities on various exchanges across the globe. These processes are being technically equipped, and a majority of the functions are being automated. Algorithmic trading represents one such area of interest for brokerage firms. 
<!--more-->
### Understanding divide and conquer method using stock price optimization problem
Algorithmic trading involves coming up with new algorithms to predict the future price of a stock or commodity. However, before deploying it live, it is tested on historical data. This is called back-testing.

If the returns are comparable to the maximum possible profit during back-testing, then the algorithm is considered stable. On the other hand, if the returns are not close to the maximum potential profit, they are not yet ready to be deployed. This article will consider the algorithm to find the maximum possible profit given a list of historical prices. 

### Background 
We are given a list of historical prices over a specific period. Given the list, we will compute the maximum possible profit from the historical prices. One can perform either a *BUY* transaction or a *SELL* transaction at a given timestamp. The total number of buying and selling operations that can be executed is not limited.

### Objective
- We will use the divide and conquer paradigm to solve the maximization problem. The divide and conquer method recursively breaks down the problem into smaller sub-problems until they can be solved directly. The solutions to these sub-problems are then combined to give a solution to the original problem. 
- We will also discuss the advantages and disadvantages of the divide and conquer paradigm.

### Divide and Conquer Paradigm
[Divide and Conquer Paradigm](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm) is an algorithmic design approach used in problems that have a recursive structure to it. It is based on multi-branched recursion. 

The algorithm operates by breaking down the problem into smaller sub-problems, making the problem small enough to be solved directly. In this article, we will observe the recursive approach taken to optimize the profit.

At the end of this article, we will also analyze the advantages and limitations of this programming paradigm. 

### Given list of prices
We are given a list of prices. The indices of the list indicate the day number. The values of the list indicate the stock value on a respective day.

### Given input 
We are given a pythonic list of historical prices. Python's list implements dynamic array under the hood. Dynamic arrays are resourceful as the size grows as and when required. 

This saves space. Moreover, the amortized cost of inserting an element is O(1). The worst-case scenario is Θ(n) when the size of the array is doubled.

### Desired output
The output is the maximum potential profit rounded to the nearest ₹. We will output an integer, but depending on the accuracy of the output required, the data type can be chosen accordingly.

### Pseudocode
Let us look at the pseudocode for the problem above. The pseudocode explains the entire solution and is invariant to programming languages. The logic below is to split the problem into the smallest sub-problems and compute the profits. If the local profit is greater than the global profit, then the global profit value is updated.

```bash
function maximize_profit(list_of_prices, starting_index, ending_index):
{
    IF length(list_of_prices)<2 THEN
        raise an Error and exit the program
    
    INITIALIZE maximum_profit to 0
    # base condition for recursion
    IF starting_index > ending_index THEN
        return maximum_profit
    FOR buying_counter in list_of_prices
        FOR selling_counter in list_of_prices
            UPDATE tentative_profit with the difference of the current two prices at hand
            RECURSIVELY call maximize_profit on the following two slices of the list:
            1. start: buy -1
            2. sell: end
            ADD the values obtained to the variable tentative_profit
            COMPUTE the maximum of maximum_profit and tentative profit
            & UPDATE the variable maximum_profit with the maximum computed.
        ENDFOR
    ENDFOR
    
    RETURN maximum_profit
}

function main():
{
    STORE the list of prices in LIST_OF_PRICES
    CALL maximize_profit() with argument LIST_OF_PRICES
    STORE the value returned by the function in variable PROFIT
    print PROFIT on the console. 
}
```

### Python code 
We convert the pseudocode given above into Python code. Try coding it on your own. The solution is given below.

```py
def maximize_profit(price_list, start, end):
    if(len(price_list)<2):
        raise ValueError('At least 2 prices required')
    
    maximum_profit = 0
    if start >= end:
        return maximum_profit
    for buy in range(start, end):
        for sell in range(buy+1, end+1):
            tentative_profit = price_list[sell] - price_list[buy] + maximize_profit(price_list, start, buy - 1) + maximize_profit(price_list, sell, end)
            maximum_profit = max(maximum_profit, tentative_profit)
        
    return maximum_profit

# inputs
price1 = [1, 5, 3, 2]
price2 = [7, 2, 8, 9]
price3 = [1, 6, 7, 9]
price4 = [9, 7, 4, 1]
price5 = [10, 5, 1, 0]
price6 = [100, 180, 260, 310, 40, 535, 695]

print("     List", "     --> Profit(₹)")
print("1.", price1, "--> ₹", maximize_profit(price1,0,len(price1)-1))
print("2.", price2, "--> ₹", maximize_profit(price2,0,len(price2)-1))
print("3.", price3, "--> ₹", maximize_profit(price3,0,len(price3)-1))
print("4.", price4, "--> ₹", maximize_profit(price4,0,len(price4)-1))
print("5.", price5, "--> ₹", maximize_profit(price5,0,len(price5)-1))
print("6.", price6, "--> ₹", maximize_profit(price6,0,len(price6)-1))
```

### Output 
The program outputs the following profits:

```bash
     List      --> Profit(₹)
1. [1, 5, 3, 2] --> ₹ 4
2. [7, 2, 8, 9] --> ₹ 7
3. [1, 6, 7, 9] --> ₹ 8
4. [9, 7, 4, 1] --> ₹ 0
5. [10, 5, 1, 0] --> ₹ 0
6. [100, 180, 260, 310, 40, 535, 695] --> ₹ 865
```

### Output analysis
Let's analyze the edge cases. This helps us identify the advantages and disadvantages of the divide and conquer approach.

#### Case 1:
*Input List*: [1,5,3,2]

*Output*: **Maximum Profit**: 4:
**Buy** at **1**:
**Sell** at **5**

*Best Profit Possible*: 4

#### Case 2:
*Input List*: [9,7,4,1]

*Output*: **Maximum Profit**: 0 :**Buy** at **9**
:**Sell** at **7**

*Best Profit Possible*: -2

In this case, the output remains at 0 and does not output negative numbers. Therefore, this approach can be used to find only the greatest *profit* possible. 

#### Case 3:
*Input List:* [100,180,260,310,40,535,695]

*Output*: **Maximum Profit**: 865

*Optimal Solution*

**Buy** at **100**, **Sell** at **310**
**Buy** at **40**, Sell at **695**

**Total Profit** = 865

Compared to the greedy approach, this method gives the optimal solution to the problem. We observed that the maximum profit in the greedy method was 655. 

In this case, the total profit is 865. We solved the above problem using the greedy method in the earlier article. You may go through the solution at this [link](/engineering-education/greedy-algorithms/). 

### Advantages 
- The program can work with many buy and sell operations due to its recurring property. Multiple buy and sell operations take place, and the best profits are returned. 
- Divide and Conquer algorithm's solutions are always optimal. The comparison of code output: scenario - 3 shows the same. The greedy algorithm outputs 655, whereas the divide and conquer algorithm outputs 865.

### Disadvantages
- The worst-case time complexity of the function `maximize_profit`() is Θ(n^2*log(n)). The time complexity is arrived at through computational methods. A good exercise would be to come up with recurrence relations for the above algorithm. 
- Space complexity of the function is Θ(log(n)). This is computed using the maximum memory utilization by the program at a given time. At any given time, the algorithm has a maximum of `log(n)` function calls. Each function call represents the function solving a subproblem. 
- The program requires multiple passes over slices of the entire list.
- The minimum profit is 0. Losses are not accounted for and displayed by the program. The base case drives DNC methods, and in this case, the base case is when `starting_index`> `ending_index.` When the following happens, 0 is returned.

### Conclusion
In this article, we have covered the divide and conquer algorithm and considered an example to show how it works. I hope you enjoyed reading this article, as much as I enjoyed writing it.

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
