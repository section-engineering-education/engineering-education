### SEARCHING AND SORTING USING MATLAB
### Introduction
Searching is the process of locating a given object or data within a large number of data. Sorting is the arrangement of data in a specific required order. These algorithms are used in the computer database. A computer database is where all the computer data is stored. In the absence of these algorithms, locating various data in the computer is likely to take a lot of time; thus, these algorithms simplify this process and minimize the time search and sorting. There are various applications of searching and sorting, but the primary application is locating data within a given vector similar to the target.

### Prerequisites
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Searching
The main target of the search is the uniqueness of the data. For example, if you go to a bank, they ask for your bank number to get your bank account. It is made possible by search algorithms. There are two types of search algorithms. These are;
- Sequential
- Binary search

### 1. Sequential search
It is also known as linear search. Here, the target variable is compared to the entire vector or stop in a variable similar to the target. For example, we are given a vector and a target value to locate. First, we should identify the target value within this vector. If we find a similar variable, we give its index as the output, and if we don't, we provide an impossible index as the output. This impossible index could be something like -1. It is to show that the value is not found.
```matlab
function index = sequential_search(vector, target, first, last)
found = false;                %Assumming target not found
for n = first:last
if target == vector(n)
found = true;                  % Here we have found the target
break;                         % Here we quit the search
end
end
index = n;                      % index of our target
if ~found
index = -1;                      % If not found, the index is -1
end
```
In our function, we have four inputs. The first input is the vector(n) in which we are locating our targeted value. The second input is the target that we are searching for. The third and the fourth are the first and the last value of our vector. In most cases, our first value is always one, and the last value is the entire length of the vector. But in case you want to search up to a given limit, then you input your range in the first and the last values. We also use the internal flag `found`, `true`, and `false` functions to determine whether we found our target or not.  

### Example
We have a vector M = [ 3 2 6 34 22 98 77 45 99 12] and we want to find 34. We will call our function as shown below;
```matlab
sequential_search(M, 34, 1, 10)
```
When we execute this, we get the output which is the index of our target value which is 4.

![index for the target](/engineering-education/searching-and-sorting-using-matlab/search_one.png)

For extensive data, it takes time for sequential search to locate a given data. This is because it compares all the data with the target value to get a similar variable. For fast searching, you need first to sort your data, but this is not the case for sequential search. Therefore, it is the only algorithm that is used to search unsorted data.

### 2. Binary search
This is used to search for a sorted list of data.

### Recursive Implementation of binary search
Here, it is a search in which you already know about. For example, looking for a contact on your phone. You already know the page on which the contact you may need may appear. When you look at one name on the page, then you already know whether the target name is there or not. This continues, and you reach a point where you don't look at the contacts sequentially but instead scan. When you apply this process, you are applying your recursive approximation of binary search. The function for binary search is;
```Matlab
function index = binary_search_recursive(vector,target,first,last)
mid = fix( (first + last)/2 );
```
Here, the mid variable is found, and if this average brings a decimal value, we use the `fix` function to correct them into a whole number or value.
```Matlab
if ~(first <= last) % In case first and last values are out of order
index = -1;          % Returns -1 to show the value is not in the list.
```
Here, if the target is not within the range, then the index is returned as -1. 
```matlab
elseif target == vector(mid)
index = mid; % found it!
```
Here, the mid element is compared to the target. if they are equal, then the search is successful and output returned.
```matlab
elseif target < vector(mid)
index = binary_search_recursive(vector,target,first, mid-1);
```
Here, in case the target is less than the mid element. The mid element and all values that follow it are eliminated. The search for the range before the mid element. `binary_search_recursive(vector, target, first, mid-1)` is used to call our function to search for the range of elements that comes before mid element else target is greater, and it searches for the values after the mid element.
```matlab
else
index = binary_search_recursive(vector,target,mid+1, last);
end
```
Finally, we call our function to search for the values after the mid element and the result given in the output. 
This method is referred to as binary. It's because it constantly divides the list into two. For example, if you want to search a value in the range 1-100, the search ranges will be 100, 50, 25, 12, 6, 3, 1. It means we will have seven calls of our function to find the target. If we look at this, we see that the binary search has carried less than 40 comparisons to reach the target compared to the sequential search, which could have taken 100 comparisons if the target is not within the range. 

### Example
We are given vector A = [2 13 17 22 29 43 64 73 82 89 99] and we want to locate 89 using our function.
```matlab
binary_search_recursive(A, 89, 1, length(A))
binary_search_recursive(A, 88, 1, length(A))  %unavailable 
```
![output for target and out of range](/engineering-education/searching-and-sorting-using-matlab/search_two.png)

In a duplicate value, the function gives the index of the value it first locates, unlike a sequential search that finds the first variable in the list.
### Iterative implementation of binary search
Here, the first and the last variables are set to be the first and the last indices of the range, respectively. The division of the list into smaller parts involves changing either the first or the last variable one at a time. It is done by moving the first towards the end and the last variable towards the first. It is made possible by the use of the `while`  loop. This while loop is halted when the first value is greater than the last, which means that the target is not found.
```matlab
function index = binary_search_iterative(vector,target,first,last)
found = false;
while first <= last && ~found
mid = fix( (first + last) /2 );
if target < vector(mid)
last = mid - 1;                   %moving towards the beginning
elseif target > vector(mid)
first = mid + 1 ;                 %moving towards the end
else
found = true;
end
end
if found
index = mid;                      %Return the index if found
else
index = -1;                       % Return -1 if not found
end
```
Incase we have a vector A = [2 13 17 22 29 43 64 73 82 89 99] and we want to locate 73, the the call of this function will be
```matlab
binary_search_iterative(A, 73, 1, length(A))
```
The output will be;
![index of 73](/engineering-education/searching-and-sorting-using-matlab/search_three.png)

### Sorting
We must know how to sort our data since we have seen the advantage of binary search over-sequential search. As we have seen before, binary search deals with sorted data. Generally, we have three types of sorts: selection sort, quick sort, and merge sort. First, we will look at quicksort and merge sort.

### 1. Quicksort
It is the most efficient type of sort and also easy to understand.
```matlab
function v = quicksort(v) 
if length(v)<=1, return, end
% Recursive case
less = v<v(1);
smaller = v(less);
```
Here, we produce elements which are less than v(1) and the output assigned to less. 
```matlab
remainder = v(~less);
remainder = remainder(2:end);
```
Here, we are creating the remainder list. The logic remains the same, but we replace the `less` with `~less` to mean `not less` and produce value greater than v(1). `remainder(2:end)` This code is to remove v(1) from the list. It then carries a quick sort for the smaller and the remainder list.
```Matlab
left = quicksort(smaller);
right = quicksort(remainder);
```
Generally, this quicksort divides the data into three parts: v (1), smaller, and remainder. v(1)is the first value in the vector. Smaller is a list consisting of all vectors less than v(1), while the remainder consists of all remaining values in vector(v). This quick sort is applied to v(1), smaller and remainder list. It sorts the smaller list, and this list we refer to as `left` and the remainder is sorted, and we call it `right`. So in calling our function, we use the `left` and the `right` that is;
```Matlab
v = [left, v(1), right]
```
### Example
Given a vector  M = [ 3 2 6 34 22 98 77 45 99 12], sort this vector using quicksort. To do this, we execute the command below;
```Matlab
quicksort(M)
```
The output will be;
![output](/engineering-education/searching-and-sorting-using-matlab/search_four.png)

### Merge sort
This algorithm is better than quicksort. In quicksort, the data is divided into three, but if you look at it keenly, the list v(1) in most cases, there is nothing done in that list. It makes it of no importance or use. In this case, merge sort divides the list into two equal parts, conducts a sort for the two parts separately, and then merges the two lists. The function for merge sort is
```Matlab
function v = merge_sort(v)
N = length(v);
if N == 1, return; % already sorted
else
mid = fix(N/2);              %Divides the vector into two
v1 = merge_sort(v(1:mid));    %Elements from the first to the mid are sorted
v2 = merge_sort(v(mid+1:end)); %Elements from the mid to the last are sorted
v = merge_sorted_lists(v1,v2);  %The two lists are merged
end
```

### Conclusion
Searching and sorting are fundamental algorithms in various activities. They make work easy and eases the handling of extensive data. But, as we can see, they are used and also to understand. Matlab provides a suitable environment for implementing these algorithms. It has built-in functions that prevent the code from being so bulky but straightforward to understand. This is an added advantage.
