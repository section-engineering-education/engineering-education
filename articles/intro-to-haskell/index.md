
There are many functional programming languages, and Haskell is one of them. This article covers some aspects of functional programming with Haskell. It assumes that you are familiar with lists, functions, loops, and recursion. 

### The Basics of Functional Programming

[Functional programming](https://en.wikipedia.org/wiki/Functional_programming) is all about writing functions and using them to create a larger program. Besides, functional languages don't allow you to change a variable's value once you define it. As a result, you can substitute the value anywhere you see the expression. This idea is called [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency). 

### Haskell is Lazy

Haskell uses a non-strict ("lazy") evaluation. This means expressions aren't evaluated unless it's necessary. Here's an example of lazy evaluation preventing errors from being detected: 

```Haskell 
myfunc a b = a + 1 
-- myfunc takes in two nums a and b
-- returns the result of a + 1
```
Example Usage:
```
myfunc 2 (1 / 0)
=> 3
```
Hold on, why didn't Haskell raise a division by zero error? 

When `myfunc` is called with arguments `a = 2` and `b = 1 / 0`, only `a` gets evaluated because the
function body is `a + 1`. Since `b = 1 / 0` is never evaluated, no division by zero error is raised. 

Lazy evaluation brings up another interesting quirk in Haskell: infinite lists. 

Haskell doesn't bring up an error when we create the following list:

```Haskell
x = [1 ..] -- create an infinite list with all the natural numbers
take 5 x -- take the first 5 elements from x and return them
=> [1, 2, 3, 4, 5]
```
So what happened? Why doesn't Haskell inform us that we have a never-ending list?

Just like before, Haskell performed the lazy evaluation. 
When we said `take 5 x`, Haskell only took the first 5 elements and evaluated them. We didn't need the last element of the list, so Haskell never bothered to look for it. Thus, Haskell raised no infinite list error. 

### Pattern Matching with Functions

Pattern matching is frequently used instead of *if-statements* for conciseness. Let's see an example by writing a function that returns the first element in a list. 

```Haskell
-- getFirst takes in a list and returns the first element
getFirst [] = error "Unable to get first element"
getFirst (first:rest) = first
```
The function `getFirst` says: if the input list is empty (i.e., there is no "first" element), then raise an error.
Otherwise, we assume the input list must have at least one element. We split the list into `(first:rest),` where `first` is the first element of the list, and `rest` is the remaining sublist. 
For example, `getFirst [1,2,3]` evaluates `first = 1` and `rest = [2,3]`. 

Some example function usage:
```haskell
getFirst [5, 9, 3]
=> 5
getFirst [7, 0, 0]
=> 7
```

### Repeating Tasks with Haskell 

You might be familiar with using *for loops* to repeat a task multiple times. Functional languages use recursion instead.

Consider the following problem: we take a list of numbers, and we want to find the sum of all the elements. 

A Python programmer might solve the problem like this: 
```python
lst = [1, 2, 3]
total = 0
for num in lst:
    total += num # add each number to the total
print (total)
```
How would we solve this problem in a functional language? Recall that functional languages don't use loops. Instead, we can use pattern matching and recursion to perform iterative tasks.

```Haskell
-- getTotal takes in a list of numbers and returns the sum of all the elements
getTotal [] = 0 -- base case: the total for an empty list is 0
getTotal (first:rest) = first + (getTotal rest)
```
Example usage:
```haskell
getTotal [1,2,3] -- add up all the elements in [1,2,3]
=> 6
getTotal []
=> 0 
```

### More Resources for Haskell
You've learned ideas such as referential transparency, lazy evaluation, and pattern-matching in Haskell. You've also seen that recursion is used instead of *for-loops*, and it can make code a lot more concise. These topics are not exclusive to Haskell; they can be applied to other functional languages as well. To learn more about these concepts, I encourage you to read [Learn You a Haskell](http://learnyouahaskell.com/), which is available for free online.
The [HaskellWiki](https://wiki.haskell.org/Haskell) is another excellent resource for beginners. 

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
