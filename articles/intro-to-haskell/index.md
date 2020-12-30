
There are many functional programming languages and Haskell is one of them. This article covers some aspects of functional programming with Haskell. It assumes that you are familiar with lists, functions, loops and recursion. 

# The Basics of Functional Programming

[Functional programming](https://en.wikipedia.org/wiki/Functional_programming) is all about writing functions and using them to create a larger program. In addition, functional languages don't allow you to change the value of a variable once you define it. As a result, you can substitute the value anywhere you see the expression. This idea is called [referential transparency](https://en.wikipedia.org/wiki/Referential_transparency). 

# Haskell is Lazy

Haskell uses non-strict ("lazy") evaluation. This means expressions aren't evaluated unless it's absolutely necessary. Here's an example of lazy evaluation preventing errors from being detected: 

```haskell 
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

```haskell
x = [1 ..] -- create an infinite list with all the natural numbers
take 5 x -- take the first 5 elements from x and return them
=> [1, 2, 3, 4, 5]
```
So what happened? Why doesn't Haskell inform us that we have a never-ending list?

Just like before, Haskell performed lazy evaluation. 
When we said `take 5 x`, Haskell only took the first 5 elements and evaluated them. The last element of the list wasn't needed, so Haskell never bothered to look for it. Thus, no infinite list error was raised. 

# Pattern Matching with Functions

Pattern matching is frequently used instead of *if-statements* for conciseness. Let's see an example by  writing a function which returns the first element in a list. 

```haskell
-- getFirst takes in a list and returns the first element
getFirst [] = error "Unable to get first element"
getFirst (first:rest) = first
```
The function `getFirst` says: if the input list is empty (i.e there is no "first" element), then raise an error.
Otherwise, we assume the input list must have at least one element. We split the list into `(first:rest)`, where `first` is the first element of the list and `rest` is the remaining sublist. 
For example, `getFirst [1,2,3]` evaluates `first = 1` and `rest = [2,3]`. 

Some example function usage:
```haskell
getFirst [5, 9, 3]
=> 5
getFirst [7, 0, 0]
=> 7
```

# Repeating Tasks with Haskell 

You might be familiar with using *for loops* to repeat a task multiple times. Functional languages use recursion instead.

Consider the following problem: we take a list of numbers and we want to find the sum of all the elements. 

A Python programmer might solve the problem like this: 
```python
lst = [1, 2, 3]
total = 0
for num in lst:
    total += num # add each number to the total
print (total)
```
How would we solve this problem in a functional language? Let's use pattern matching and recursion.

```haskell
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

# More Resources for Haskell
You've learnt ideas such as referential transparency, lazy evaluation and pattern-matching in Haskell. To learn more about these concepts, I encourage you to read [Learn You a Haskell](http://learnyouahaskell.com/). 
The [HaskellWiki](https://wiki.haskell.org/Haskell) is another great resource for beginners. 
