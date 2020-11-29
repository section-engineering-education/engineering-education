# Understanding Divide and Conquer Method using Stock Price Optimization Problem

Stock markets are where buyers and sellers represent ownership for the businesses listed on the markets. Many have become millionaires by trading. In today's era, many companies offer solutions to test out our strategies on previous data. This is called back-testing. If the approach returns good profits during back-testing, it can be deployed in the live markets. 

One of the aspects of back-testing is to know the maximum possible profit. We compute the maximum potential yield of stock prices and compare the strategy's performance to the maximum profit possible. Once the back-testing approach is at par with the maximum profit, it is deployed into the real-time analysis.

### Aim 

Given a list of prices over a time-frame, we compute the maximum possible profit possible through performing one buy operation or one sell operation at a given time. At a given time-stamp, only one of the two operations can be used. The total number of buying and selling operations that can be performed are unlimited.

### Objective

- In this program, the divide and conquer method is used to maximize the profit, given a list of values. The divide and conquer method recursively breaks down the problem into smaller sub-problems until they can be solved directly. The solutions to these sub-problems are then combined to give a solution to the original problem. 
- We discuss the advantages and disadvantages of the divide and conquer approach.

### Divide and Conquer Paradigm

[Divide and Conquer Paradigm](https://en.wikipedia.org/wiki/Divide-and-conquer_algorithm) is an algorithmic design approach used in problems that have a recursive structure to it. It is based on multi-branched recursion. The algorithm operates by breaking down the problem into smaller sub-problems thereby making the problem small enough to be solved directly. In this article, we will observe the recursive approach taken to optimize the profit.
At the end of this article, we will also analyze the advantages and limitations of this programming paradigm. 

### Given 

We are given a list of prices. The indices of the list indicate the day number. The values of the list indicate the stock value on a respective day.

### Given Input 

The input to the program is a list of historical values(integers). It is stored in an array. Python's list is an efficient implementation of the dynamic array. 

The advantage of the dynamic array is that it grows automatically when additional elements are inserted, and no space is available for the new element. The amortized cost of insertion of an element into a dynamic array is O(1), whereas the worst case is still Θ(n).

### Desired Output

The program outputs the maximum possible profit given the list of prices. The output of the program is of type int. Since we are dealing with profits, it is efficient to round off to the nearest ₹.

### Pseudo Code

Let us look at the pseudo code for the above problem. The pseudo code explains the entire solution and is invariant to programming languages. The logic below is to split the problem into smallest sub-problems and compute the profits. If the local profit is greater than the global profit then the value of the global profit is updated.

```txt
function maximize_profit(price_list, starting_index, ending_index):
{
    IF length(price_list)<2 THEN
        raise an Error and exit the program
    
    INITIALIZE maximum_profit to 0
    # base condition for recursion
    IF starting_index > ending_index THEN
        return maximum_profit
    FOR buying_counter in price_list
        FOR selling_counter in price_list
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
    STORE the list of prices in PRICE_LIST
    CALL the function maximize_profit with argument PRICE_LIST
    STORE the value returned by the function in variable PROFIT
    print PROFIT on the console. 
}
```

### Python Code 

We convert the pseudo code given above into Python code. Try coding it on your own. The solution is given below.

```py
def maximize_profit(price_list, start, end):
    if(len(price_list)<2):
        raise ValueError('Getting a profit requires at least 2 prices')
    
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

### Output Analysis

Let us analyze the edge cases. This helps us in identifying the advantages and disadvantages of the divide and conquer approach.

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

In this case, the output remains at 0 and does not output negative numbers. Therefore, this approach can be used to find only the greatest _profit_ possible. 

#### Case 3:

*Input List:*
[100,180,260,310,40,535,695]

*Output*: **Maximum Profit**: 865

*Optimal Solution*

**Buy** at **100**, **Sell** at **310**
**Buy** at **40**, Sell at **695**

**Total Profit** = 865

Compared to the greedy approach, this method gives the optimal solution to the problem. We observed that the maximum profit in greedy method was 655. In this case, the total profit is 865.

### Advantages 
- The program can work with many buy and sell operations due to its recurring property. Multiple buy and sell operations take place, and the best profits are returned 
- Divide and Conquer algorithm's solutions are always optimal. The comparison of code output: scenario- 3 shows the same. The greedy algorithm outputs 655, whereas the divide and conquer algorithm outputs 865.

### Disadvantages

- The worst-case time complexity of the function `maximize_profit`()  is Θ(n^2*log(n)) 
- Space Complexity of the function is Θ(log(n)).
- The program requires multiple passes over slices of the entire list.
- The minimum profit is 0. Losses are not accounted for and displayed by the program. The base case drives DNC methods, and in this case, the base case is when `starting_index`> `ending_index.` When the following happens, 0 is returned.

### Conclusion

In this article, we have covered the divide and conquer algorithm and considered an example to show the working of the same. I hope you enjoyed reading this article, as much as I enjoyed writing it.