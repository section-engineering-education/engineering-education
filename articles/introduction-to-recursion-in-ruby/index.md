Recursion occurs when a method is defined in terms of itself. Some programming problems are solved by breaking them down into smaller sub-problems that can be solved using various ways, for instance, using helper methods and recursion. Recursion can be used to solve complex mathematical problems by breaking them down into smaller ones. We are going to go over simple recursion calls, complex ones and strategies of recursive programming. 

### Prerequisites
1. A basic understanding of the [ruby](https://www.tutorialspoint.com/ruby/index.htm) programing language.
   
2. A text editor, preferably [vs code](https://code.visualstudio.com/download).

### Introduction 
Commonly, most people use helper methods to solve complex problems. In a helper method, you call a method from a different method. Recursion is almost similar, except that you are calling the method inside the same method. Recursive programming is mostly used in solving mathematical problems. 

Let us write our first simple recursive method (although broken).

```rb
def say_hi
    p "hi"
    say_hi
end

say_hi # prints "hi" until it crashes
```

You will notice that the method still obeys all the rules as a normal method and won't run unless we call it. 
Let's see how the code works:
* When we call *say_hi* for the first time, we print *"hi"* and call *say_hi* again.
   
* The second call runs through the method definition again and prints *"hi"* again; this pattern continues until the method crashes with a stack error.

Our *say_hi* method enters an infinite loop. Every time we call a method, some of the system memory is allocated to the execution of that method; since we print *"hi"* without stopping, we will run out of memory, and our program will crash, displaying this error *"SystemStackError: stack level too deep"*.  

### Parts of a recursive method 
When using recursive methods, we need to find a way to stop our program from looping forever. In this case, we use a statement that halts the recursion. 
A recursive method has two important parts:
* *Base case* where we stop the recursion by not making another call.
  
* *Recursive step* where we progress the recursion by making other calls. 
   
Let us write a recursive working method.
The recursive method will calculate the factorial of any given number (n). To get the factorial of a number, we need to get the product of all whole numbers between 1 and the number inclusive; for instance, if we write down the factorial of several numbers, we will notice a pattern. 
 
```
# factorial(4) = 4 * 3 * 2 * 1
# factorial(3) = 3 * 2 * 1
# factorial(2) = 2 * 1
# factorial(1) = 1 
```
In the above factorials, you notice that the numbers keep decreasing by one. 
The factorials can also be written as 
```
# factorial(4) = 4 * factorial(3)
# factorial(3) = 3 * factorial(2)
# factorial(2) = 2 * factorial(1)
# factorial(1) = 1 
 ```

 The recursive implementation of factorial will be:

```rb
def factorial(num)
 return 1 if num == 1 # base case 
  num * factorial(num - 1); # recursive step 
end

factorial(4) # => 24
```

### How to solve a problem recursively 
1. Identify the base case. The base case should completely cover the scenarios where the argument is small, that we can tell the result without having to do any calculation.
    
2. Solve the immediate next case of the problem and test it.  
   
3. Using the code in step 2, generalize it for each level of the problem.  

### Iteration vs recursion 
All recursive methods can be implemented iteratively using loops and no recursion. 
Let's try to implement the factorial method using iteration.  

```rb
def factorial(num)
 facto = 1
  (1..num).each do |i|
    facto *= i
  end

  facto
end
```
While it is possible to write any recursive method iteratively, the iterative method tends to be more complicated than the recursive method. When one is deciding whether to solve a problem recursively or iteratively, they should use the one that is natural to their mind.

### Stack creation in  recursive calls
A stack is a data structure that is used to stow objects. Using the *push* operation, items can be individually added to the stack for storing. Using a *pop* operation, items can be removed/retrieved from the stack. Think of a pile of plates in a kitchen. When cleaning them, you pile them onto each other *"push"*. When using the plates, you *"pop"* the top plates out of the pile. 
Each time a recursive call is made, it adds to the stack until it gets to the base case. Stack frames are elements of a stack, and they contain the local variables of a method. In the event of an infinite loop, the stack grows until the system runs out of memory which is called *stack overflow*.

### Steps for programming recursively 
1. Create a recursive decomposition: figure out how the problem decomposes recursively. Through this, you are able to reduce a big problem towards the base case.
   
2. Figure out the base case: The stack stops growing once the base case is reached and the evaluation of the other recursive calls starts. 
   
3. Solve one level up from the base case: Evaluate the result of the method in case there is one recursive call to make. Make sure your evaluation generalizes. 
   
4. Check that the values being returned from any case are of the same data type: If your recursive method results are in a string, then all cases should return a string.  



  


