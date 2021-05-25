---
layout: engineering-education
status: publish
published: true
url: /engineering-education/greedy-algorithms/
title: Optimizing Stock Price Profit using Greedy Algorithms
description: In this article we will explore the greedy algorithm approach to obtain the maximum profit given a list of indices when optimizing a stock price profit program.
author: lalithnarayan-c
date: 2020-12-07T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/greedy-algorithms/hero.jpg
    alt: Stock Price Greedy Algorithm example image
---
Stock markets are where buyers and sellers connect to buy and sell stocks, which are shares of ownership in a public company. Many people have become millionaires by trading. 
<!--more-->
In today's era, many companies offer solutions to test out our strategies on previous data. We call this back-testing. If the strategies return good profits during back-testing, we can deploy it in the live markets.

One aspect of back-testing is knowing the maximum potential profit. We compute the maximum potential gain from stock prices and compare the strategy's performance to the maximum profit possible. Once the back-testing method is at par with the maximum profit, we deploy it into real-time analysis.

### Problem statement
Given a list of prices over a timeframe, we compute the maximum possible profit possible through performing one buy operation or one sell operation at a given time. At a given timestamp, only one of the two operations can be used. The total number of buying and selling operations that can be performed are unlimited. 

### Greedy approach 
We will be using the greedy method to obtain the maximum possible profit. The [greedy method](https://en.wikipedia.org/wiki/Greedy_algorithm) is a type of problem-solving strategy, where the best possible solution at the current instance is chosen. 

Unlike other algorithms, that consider the optimal solution over a more extensive timeframe, greedy algorithms make decisions at the given time instance. 

This results in efficient computations and faster results. However, there is a downside to this approach. The greedy approach might not always provide the most optimal solution. This occurs because it considers only the current instance to make a decision. 

In this problem, we will understand the nature of greedy algorithm and determine the maximum possible profit. Let's begin.

### An introduction to the greedy solution
In this problem, the greedy method is used to maximize the profit given a list of values. The greedy algorithm obtains the profit by going with the amount that looks best at each timestamp. This project's scope is limited to previous data and can not model the fluctuations and variations in stock markets. We assume that pre-historic data is available.

### Given input
The input to the program is a list of historical values (integers). It's stored in an array. Python's list is an efficient implementation of the dynamic array. The advantage of the dynamic array is that it grows automatically when additional elements are inserted, and no space is available for the new element. 

The amortized cost of insertion of an element into a dynamic array is O(1), whereas the worst case is still Θ(n).

### Desired output
The program outputs the maximum possible profit given the list of prices. The output of the program is of type int. Since we are dealing with profits, it's efficient to round off to the nearest ₹.

### Greedy approach: Pseudo code
The pseudo-code explains the algorithm to calculate the maximum profit. 

Given a list of prices, we init:
```txt
function maximize_profit(price_list):
    {
    IF length(price_list)<2 THEN
        raise an Error and exit the program
    
    READ the first price from price_list and STORE it in minimum_price
    READ the first and second prices from price_list and COMPUTE the difference between the second and first prices. STORE it in maximum_profit. 
    
    FOR day, value in enumerate(price_list)
        if day EQUALS 0:
        CONTINUE
        STORE value in current_stock_price
        COMPUTE the difference between current_stock_price and minimum price and STORE it in tentative_profit
        COMPUTE the maximum of maximum_profit and tentative profit. UPDATE the variable maximum_profit with the maximum computed. COMPUTE the minimum of minimum_price and current_stock_price. UPDATE the variable
        minimum_price with the minimum computed. 
    
    ENDFOR
    
    RETURN maximum_profit
}

function main():

{
    STORE the list of prices in PRICE_LIST
    CALL the function maximize_profit with argument PRICE_LIST
    STORE the value returned by the function in variable PROFIT
    print PROFIT on the console. 
}
```

### Greedy approach: Code
We will code the greedy algorithm in this section. Using the pseudo code given above, we convert it into a Python code. You may choose to use any language of your choice. 

```python
def maximize_profit(price_list):
    if len(price_list) < 2:
        raise ValueError('Getting a profit requires at least 2 prices')
    
    min_price = price_list[0]
    max_profit = price_list[1] - price_list[0]
    
    for day in range(1, len(price_list)):
        stock_price_current = price_list[day]
        tentative_profit = stock_price_current - min_price
        max_profit = max(max_profit, tentative_profit)
        min_price = min(min_price, stock_price_current)
    
    return max_profit

# inputs
price1 = [1, 5, 3, 2]
price2 = [7, 2, 8, 9]
price3 = [1, 6, 7, 9]
price4 = [9, 7, 4, 1]
price5 = [10, 5, 1, 0]
price6 = [100, 180, 260, 310, 40, 535, 695]

print(" List"," --> Profit(₹)")

print("1.", price1, "--> ₹", maximize_profit(price1))
print("2.",price2,"--> ₹",maximize_profit(price2))
print("3.",price3,"--> ₹",maximize_profit(price3))
print("4.",price4,"--> ₹",maximize_profit(price4))
print("5.",price5,"--> ₹",maximize_profit(price5))
print("6.",price6,"--> ₹",maximize_profit(price6))
```


### Output
The output of the code is given below:

```bash
     List      --> Profit(₹)
1. [1, 5, 3, 2] --> ₹ 4
2. [7, 2, 8, 9] --> ₹ 7
3. [1, 6, 7, 9] --> ₹ 8
4. [9, 7, 4, 1] --> ₹ -2
5. [10, 5, 1, 0] --> ₹ -1
6. [100, 180, 260, 310, 40, 535, 695] --> ₹ 655
```

### Output analysis
Let's analyze the output obtained. 

#### Case 1:
*Input List*: [1,5,3,2]

*Output*: **Maximum Profit: 4** : **Buy at 1** : **Sell at 5**

#### Case 2:
*Input List*: [9,7,4,1]

*Output*: **Maximum Profit: -2** : **Buy at 9** : **Sell at 7**

#### Case 3:
Input: Large numbers, more extensive list:

*Input List*: [100,180,260,310,40,535,695]

*Output*: **Maximum Profit: 655** : **Buy at 40** : **Sell at 695**

##### Optimal solution:
- Buy at 100, Sell at 310
- Buy at 40, Sell at 695

**Total Profit = 865**

### Advantages of the greedy approach
- The worst-case time complexity of the function `maximize_profit()` is Θ(n).
- Space Complexity of the function is Θ(1).
- The program completes execution within one pass of the entire list.
- Since it uses a greedy approach, the profits are added up in each step, thereby ensuring profit.
  
### Limitations of the greedy approach
- The program can work with only one buy and one sell operation due to its greedy nature. It fails to sell and buy at multiple time stamps.
- Greedy algorithm solutions are not always optimal. Therefore, the maximum profit computed may be a local maximum. The program can fail to reach the global maxima. For example, the optimal solution in scenario-3 is 865. The output of the greedy algorithm is 655. 

The same problem can be solved using other programming paradigms such as [divide and conquer](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm), [dynamic programming](https://en.wikipedia.org/wiki/Dynamic_programming), etc. The next article in this series will be solving the same problem using divide and conquer. 

Divide and conquer algorithms divide the problem into many sub-problems until the sub-problems can be solved directly. Then the solutions obtained are put together to get the final answer. 

### Conclusion
In this article, we considered the greedy approach to obtain the maximum profit given a list of indices. Observe that the option of performing multiple buys and sell operations are never used. I hope the intuition behind the greedy approach was presented well. Do let me know what you think about the approach taken to solve the problem. Feedback is highly appreciated.

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)