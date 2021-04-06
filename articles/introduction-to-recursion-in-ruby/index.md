Recursion occurs when a method is defined in terms of itself. Some problems in programing are solved by breaking them down into smaller sub-problems which can be solved using various ways for instance using helper methods and recursion. Recursion can be used to solve complex mathematical problems by breaking them down into smalller ones. We are going to go over simple recursion calls, complex ones and strategies of recursive programing. 

### Prerequisites
1. A basic understanding of the [ruby](https://www.tutorialspoint.com/ruby/index.htm) programing language.
2. A text editor, preferrably [vs code](https://code.visualstudio.com/download).

### Introduction 
It is common that most people use helper methods to solve complex problems. In a helper method you call a method from a different method. Recursion is almost similar except that you are caling the method inside the same method. Recursive programing is mostly used in solving mathematical problems. 

Lets us write our first simple recursive method (although broken).
```rb
def say_hi
    p "hi"
    say_hi
end

say_hi # prints "hi" until it crashes
```
You will notice that the method still obeys all the rules as a normal method and wont run unless we call it. 
Lets see how the code works:
* When we call *say_hi* for the first time we print *"hi"* and call *say_hi* again. 
* The second call runs through the method defination again and prints *"hi"* again, this pattern continues until the method crashes with a stack error.

our *say_hi* method enters an infinite loop. Every time we call a method some of the system memory is alocated to the execution of that method, since we print *"hi"* without ending we will run out of memory and our program will crush with displaying this error *"SystemStackError: stack level too deep"*. 

### Parts of a recursive method 
When using recursive methods we need to find a way to stop our program from looping forever. In this case we use a statement that halts the recursion. 
A recursive method has two important parts:
* *Base case* where we stop the recursion by not making another call.
* *Recursive step* where we progress the recursion by making other calls. 
   
let us write a working recursive method.
The recursive method will calculate the factorial of any given number (n). To get the fatorial of a number we need to get the product of all whole numbers between 1 and the number inclusive, for instance if we write down the fctorial of several numbers we will notice a pattern. 
```
# factorial(4) = 4 * 3 * 2 * 1
# factorial(3) = 3 * 2 * 1
# factorial(2) = 2 * 1
# factorial(1) = 1 
```
In the a above factorials you notice that the numbers keep decreasing by one. 
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
2. Solve the imediate next case of the problem and test it. 
3. Using the code in step 2, generalize it for each level of the problem. 


  


