### SEARCHING AND SORTING USING MATLAB
### Introduction
Searching is the act of going or looking through (a place, area, etc.) carefully in order to find something while sorting Sorting is any process of arranging items systematically. This is something that is mostly popular in databases.
Here, we will look at the two closely related problems: Searching and sorting. Both problems appear in applications involving databases, and without efficient solutions to these problems, databases would be virtually useless. They would be useless because databases that are large enough to hold the information we need would be too large to use. They would be too large to use because it would take too long to find what we are looking for inside them.
In this article we will look at the how to apply the Searching and sorting in Matlab.

### Prerequisites
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.


The simplest search algorithm is sequential search, also known as linear
search. In this method, the target number that is being sought is compared
with the first member of the database, then with the second, etc., until either
the number is found, or the end of the database is reached, whichever comes
first. Instead of dealing with a real database, let’s work on the simplest version of the search problem. We are given a vector of numbers and a target
value. Our task is to search for that target value in the vector. If we find it,
then the answer we give is the index of the element that we found.
If we do not find it, we return an impossible index, say, −1, as a flag that indicates that the search failed. That flag is crucial to the search algorithm because there must be some means of informing the searcher that the target is
not there
“flag” means a value indicating a special condition. In this case, the condition
is “target not found”, or “search failure”.)
The function, sequential_search, below carries out the sequential search:
```matlab
function index = sequential_search ...
(vector,target,first,last)
%SEQUENTIAL_SEARCH
% SEQUENTIAL_SEARCH(VECTOR,TARGET,FIRST,LAST) returns
% smallest index for which TARGET == VECTOR(index) or
% -1, if TARGET not found within VECTOR(FIRST:LAST).
found = false; % Assume the target is not in vector
for n = first:last
 if target == vector(n)
 found = true; % We found it...
 break; % so we quit looking for it!
 end
end
index = n;
if ~found
 index = -1;
end
```
First we note that we have used the line continuation operator (...) to continue a statement on to the next line. Such continuation has nothing to do
with functionality. Next we note that that there are four arguments. Argument 1 is the vector to be searched; Argument 2 is the target that we are
searching for; Arguments 3 and 4 give the beginning and the end, respectively, of the range of indices over which we wish to search. Most of the time,
when we call the function, we will set first to 1 and last to the full length
of vector, but sometimes we may wish to search only a limited range. Arguments 3 and 4 are there to provide this option. So for example, if we wish to
search all of a vector, named accounts, for the number stored in smith, we
would give the call,
```matlab
sequential_search(accounts, smith, 1, length(accounts))
```
but, if we wish to search only within, say, accounts(450:5600), we would
give the call,
```matlab
sequential_search(accounts, smith, 450, 5600)
```
As promised, this function returns –1, as a flag indicating failure, where failure means that the target value is not equal to any of the elements in the vector. To assist in setting the flag, we have used an internal flag called found
and the built-in functions false and true

### Sorting
A sorting algorithm that is not very efficient, but is simple enough to be readily understood is the selection sort. Here is a function that implements the
selection-sort algorithm:
```matlab
1. function v = selection_sort(v)
2.
3. %SELECTION_SORT sort in ascending order
4. % V = SELECTION_SORT(V) sorts vector V into
5. % ascending order. The method used is
6. % selection sort.
7. for m = 1:length(v)-1
8. m_min = m;
9. for n = m+1:length(v)
10. if v(n) < v(m_min)
11. m_min = n;
12. end
13. end
14. if m_min ~= m
15. temp = v(m);
16. v(m) = v(m_min);
17. v(m_min) = temp;
18. end
19.end
```
It is used as follows,
vs = selection_sort(vu);
where vu is the vector to be sorted and vs is a vector containing the same elements as vs but arranged in ascending order.
To learn how the selection sort works, we will follow an example all the way
through (laboriously!) step-by-step
