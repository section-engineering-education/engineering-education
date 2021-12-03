---
layout: engineering-education
status: publish
published: true
url: /how-to-debug-matlab-code/
title: How to Debug Matlab Code
description: This article will discuss how to find and correct errors in Matlab code. We will also look at how to use an inbuilt debugger to analyze code.
author: paul-juma
date: 2021-08-11T00:00:00-02:25
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-debug-matlab-code/hero.jpg
    alt: Matlab Code Example Image
---
Errors occur everywhere in the world. In programming, these errors could be caused by writing code that the software does not understand or by mistyping.
<!--more-->
When you try running a program that has errors, it may either fail or give unexpected results.

The software may not run because it does not understand the code. Also, it might give unexpected results due to misinterpretation of the code. These errors are also known as bugs.

The process of analyzing code to identify and remove errors is known as debugging.

Debugging may be hectic and tiring. Furthermore, Matlab's error statements may be challenging to understand.

### Goal
This article will discuss how to find and correct errors in Matlab code. We will also look at how to use Matlab's inbuilt debugger to debug code.

### Prerequisites
To follow along, you need to have:
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- A basic understanding of [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/).

### Types of errors in Matlab
Matlab is capable of detecting errors. The program stops running or gives wrong results due to bugs.

The three main types of errors that may arise when using Matlab are:
1. Syntax errors
2. Logical errors
3. Runtime errors

### 1. Syntax errors
Syntax is the rule that defines the meaning of various symbols in a program. It tells the computer how to read and translate multiple codes. Every programming language has its syntax.

Syntax errors occur when a programmer uses the wrong syntax or mistypes a word when coding. An example is typing `plog` instead of `plot`.

Fortunately, Matlab can show these errors. It points the developer to the specific location or position of the error.

Let's have an example of an error and see how Matlab raises the flag to show it.

```Matlab
fprintf(today is my birthday)
```

When we run this code, execution stops, and Matlab raises a flag to show that there is an error.

Output:

![matlab error flag](/engineering-education/how-to-debug-matlab-code/debug-one.png)

In the example above, the programmer probably forgot to add some symbols to the code. Therefore, execution of the code was stopped and Matlab located the position of the error.

A syntax error may also occur due to a misspelled variable.

For example, you can define a variable but misspell it when using it, as shown below:

```matlab
temp = 15;
newtemp = tem + 3
```

When we execute the code above, we get the following results:

![matlab error flag](/engineering-education/how-to-debug-matlab-code/debug-two.png)

Generally, there are many causes of syntax errors in Matlab. As you continue learning Matlab, you will learn various syntax errors and how to spot and correct them.

### 2. Logical errors
Logical errors occur when there is a problem with the program's logic. Although logical errors do not cause the program to crash, they can lead to wrong or unexpected results. Therefore, these errors may be difficult to spot.

In addition, because the code runs and provides output, there is no error flag raised to help identify the error. It can be frustrating, especially if you do not know how to debug.

Example:

```matlab
%print odd numbers from 1 to 10
for i = 1:10
if rem(i,2) == 0
disp(i)
end
end
```

In the example above, the program should display odd numbers. However, the results are not what we expected.

Output:

![Matlab logical error](/engineering-education/how-to-debug-matlab-code/debug-three.png)

### 3. Runtime errors
Runtime errors occur during program execution. They can either be caused by a software or hardware issue.

These errors should be fixed since they may result in critical issues. For instance, runtime errors can cause an entire system to fail.

A runtime error is hard to detect since it involves anticipating every possible output of your software.

Anticipation is the process of testing every likely behavior of your program. It involves evaluating all the possible combinations of variables, input, and decision paths.

### Debugging Matlab code
Matlab has some great debugging tools that can help you find errors in your code. 

For example, a breakpoint allows the developer to pause code execution at a specific location. If you want Matlab to pause before executing a particular line of code, you will place a breakpoint there.

Click on the dashes next to the number line in a Matlab script or function to create a breakpoint, as demonstrated below:

![Breakpoint](/engineering-education/how-to-debug-matlab-code/debug-four.png)

If we modify the script or the function we are debugging, breakpoints turn grey until the changes are saved. Grey indicates that the breakpoints are not active.

If we run the code in the image above, we get:

![breakpoint](/engineering-education/how-to-debug-matlab-code/debug-five.png)

The letter `K` shows that a debugger is controlling the program, and it has stopped. The green arrow next to the breakpoint indicates that the execution stopped since there is a breakpoint. It means that the next line was not executed.

![Stopped at breakpoint](/engineering-education/how-to-debug-matlab-code/debug-six.png)

At the top of Matlab's window, we have various debugging components that you can use to debug your code. 

To access all these components, click on the `dropdown` button of the breakpoint shown in the image above.

You will see the following options:

![Various debugging tools](/engineering-education/how-to-debug-matlab-code/debug-seven.png)

Let's discuss the functions of each option. The purpose of `clear all`, `set/clear`, `enable/disable`, and `set` conditions is explained in the Matlab window.

![Explained meaning](/engineering-education/how-to-debug-matlab-code/debug-fourteen.png)

- `Step` - This is used to execute the current line.
- `Step in` - It is used to get a user-defined function. It calls the function but stops on the first line of that function.
- `Step out` - It is used to move to the next line of a function if it was initially called using the `step in` option. 
- `Continue` - It continues execution of the program to completion unless another breakpoint is encountered.
- `Quit debugging` - It exits debugging mode and does not finish the execution of the current function.

### Sample debugging process
Let's debug this function:

```matlab
function x = rand_int(n,m)

x = randi(n,m);
fprintf('The last element is %d\n', x(n,m))
```

When we run this Matlab function, we have the following error:

![sample error](/engineering-education/how-to-debug-matlab-code/debug-eight.png)

From the error message above, we see that Matlab is demanding more arguments. 

Let's place a breakpoint in the third line and re-run the program.

We get the result below:

![Sample debugging steps](/engineering-education/how-to-debug-matlab-code/debug-nine.png)

We should include arguments to our function right in front of the `k` in the command window. For example, we will add the code below in front of the `k`.

```Matlab
rand_int(3,2)
```

After making this correction, click on the `step` to see its effect.

![Sample debugging steps](/engineering-education/how-to-debug-matlab-code/debug-ten.png)

If we look at Matlab's workspace, we will see something interesting.

![sampling debugging](/engineering-education/how-to-debug-matlab-code/debug-eleven.png)

In the workspace, our variables have been assigned a value, but the matrix that we get is a `2 x 2` matrix. This is not what we expect.

We can type `whos` in the command window to see more details about our variables.

![sample debugging](/engineering-education/how-to-debug-matlab-code/debug-twelve.png)

Remember the `K>>` acts just as a normal command window. The developer can do anything including plotting and assigning values to variables. The only difference is that the window belongs to the active function, and in our case, `rand_int`.

We use the `size` function to check the dimension of the array stored in variable `x`, which shows that it is a `2 x 2` matrix.

![sample debugging](/engineering-education/how-to-debug-matlab-code/debug-thirteen.png)

At this point, you can locate the source of the error and make appropriate changes. Once this is done, we can clear all the breakpoints using `clear all` and then `quit debugging`.

### Conclusion
Debugging is essential in programming. It is used to avoid problems that may occur due to various errors in a program. 

Therefore, all developers must be equipped with debugging skills. Furthermore, they should understand how a program works, as well as the expected output. This makes debugging easy, especially when checking for logical errors.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
