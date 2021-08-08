---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-debug-matlab-code/
title: How to Debug Matlab Code
description: This article will look at how to find and correct errors in Matlab code. We will also look at how to use Matlab's inbuilt debugger to debug code.
author: paul-juma
date: 2021-08-07T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-debug-matlab-code/hero.jpg
    alt: Matlab code example image
---
Errors occur everywhere in this world; programming is no exception. Errors could be caused by writing code that the software does not understand or by mistyping.
<!--more-->
When you try running a software that has errors, the software may either not run or give unexpected results.

The software may not run because it does not understand the code. Also, it might give unexpected results due to misinterpretation of the code. These errors are also known as bugs.

The process of analyzing your code to identify and remove errors is known as debugging.

Debugging a code may be hectic since it involves locating the error. Also, Matlab's error statements may be challenging to understand.

This article will look at how to find and correct errors in Matlab code. We will also look at how to use Matlab's inbuilt debugger to debug code.

### Prerequisites
To follow through this article, you need to have:
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Types of errors in Matlab
Matlab, just like any other software, can detect errors. The program stops running or gives wrong results when errors occur in the code.

Generally, there are three main types of errors that may arise when using Matlab.

These errors are:
1. Syntax errors
2. logical errors
3. Runtime errors

### 1. Syntax errors
Syntax is the rule that defines the meaning of various symbols in a program. It tells the computer how to read and translate multiple code. Every software or language has its own syntax.

Syntax errors occur when a programmer uses the wrong syntax to write his/her code, or when he/she mistypes a word. An example is typing `plog` instead of `plot`.

The excellent news about Matlab is that it shows the error, and in large code bases, it locates the position of the error.

Let's have an example of an error and see how Matlab raises the flag to show it.

```Matlab
fprintf(today is my birthday)
```

When we run this code, execution stops and Matlab raises a flag to show that there is an error.

This is how it appears:

![matlab error flag](/engineering-education/how-to-debug-matlab-code/debug-one.png)

Here, the programmer probably forgot to add some symbols to the code. Therefore, execution of the code stops, and Matlab locates the position of the error.

A syntax error may also occur due to a misspelled variable.

For example, you define a variable but misspell it when using it. As shown:

```matlab
temp = 15;
newtemp = tem + 3
```

When we execute the code above, we get the following results:

![matlab error flag](/engineering-education/how-to-debug-matlab-code/debug-two.png)

Generally, there are many causes of syntax errors in Matlab. As you continue learning Matlab, you will learn various syntax errors and how to spot and correct them.

### 2. Logical errors
Logic errors occur when there is a problem with the logic of the program. Although logical errors do not cause the program to crash, they make a program give a wrong or unexpected result. These errors may be hectic to spot.

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

We expect our program to display odd numbers. However, the output is not as we expect.

The output is as shown below:

![matlab logical error](/engineering-education/how-to-debug-matlab-code/debug-three.png)

### 3. Runtime errors
These are errors that occur during the execution of a program. They can either occur on the software or the hardware; this causes a malfunction on either.

These errors should be fixed since they may result in critical issues or even business operation concerns. Runtime errors can cause a system of high integrity to fail.

Runtime errors are, at some point, the reason for various system failures. This type of error is hard to detect since it involves anticipating every possible output of your software.

Anticipation is the process of testing every likely behavior of your program. It involves testing all the possible combinations of variables, or input, or all possible decision paths at least once. It is hectic for large programs.

### Debugging Matlab code
Matlab has some great debugging tools that help you find various errors in your code. The central concept of debugging is that of a breakpoint.

A breakpoint is something that pauses code execution at a specific location. For example, if you want Matlab to pause before executing a particular line of code, you will place a breakpoint there.

Click on the dashes next to the number line in a Matlab script or function to create a breakpoint.

![Breakpoint](/engineering-education/how-to-debug-matlab-code/debug-four.png)

If we modify the script or the function we are debugging, breakpoints turn to grey until the changes are saved. When they turn to grey, it means that the breakpoints are not active.

If we run the code in the image above, we get:

![breakpoint](/engineering-education/how-to-debug-matlab-code/debug-five.png)

The letter K shows that a debugger is controlling the program, and it has stopped. The green arrow next to the breakpoint indicates that the execution stopped since there is a breakpoint. It means execution stopped before executing that line.

![Stopped at breakpoint](/engineering-education/how-to-debug-matlab-code/debug-six.png)

At the top of Matlab's window, we have various debugging components that you can use to debug your code. To get all these components, click on the dropdown button of the breakpoint shown in the image above.

When you click, you get the options shown below:

![Various debugging tools](/engineering-education/how-to-debug-matlab-code/debug-seven.png)

Let's discuss the various functions of each option. We will not discuss the clear all, set/clear, enable/disable, and set conditions since they are explained in the window.

![Explained meaning](/engineering-education/how-to-debug-matlab-code/debug-fourteen.png)

- Step - This is used to execute the current line.
- Step in - It is used to get a user-defined function. It calls the function but stops on the first line of that function.
- Step out - It is used to move to the next line of a function if the function was initially called using the `step in` option. If the function or variable was defined in the command window, it returns to the window.
- Continue - It continues execution of the program to completion unless another breakpoint is encountered.
- Quit debugging - It exits debugging mode and does not finish execution of the current function.

### Sample debugging process
Let's debug this function:

```matlab
function x = rand_int(n,m)

x = randi(n,m);
fprintf('The last element is %d\n', x(n,m))
```

When we run this Matlab function, we have an error as shown below:

![sample error](/engineering-education/how-to-debug-matlab-code/debug-eight.png)

from our error message, we see that Matlab is demanding more arguments. Let's place a breakpoint in the third line and re-run the program.

We get the result below:

![Sample debugging steps](/engineering-education/how-to-debug-matlab-code/debug-nine.png)

We should input arguments to our function right in front of the `k` in the command window. For this case, we will add the code below in front of the `k`.

```Matlab
rand_int(3,2)
```

After making this correction, click on the `step` to see its effect.

![Sample debugging steps](/engineering-education/how-to-debug-matlab-code/debug-ten.png)

If we look at Matlab's workspace, we have something interesting.

![sampling debugging](/engineering-education/how-to-debug-matlab-code/debug-eleven.png)

If we look at the workspace, our variables have been assigned a value, but the matrix that we get is a `2 x 2` matrix; not what we expect.

We can type `whos` in the command window to see more details about our variables.

![sample debugging](/engineering-education/how-to-debug-matlab-code/debug-twelve.png)

Remember the `K>>` acts just as a normal command window; you can do anything, plot, assign any value to any variable, etc. The only difference is that the window now belongs to the active function, and in our case, `rand_int`.

We might want to know the values of our variables, but the important part is to use the `size` function to check the dimension of the array stored in variable `x`, which shows that it is a `2 x 2` matrix.

![sample debugging](/engineering-education/how-to-debug-matlab-code/debug-thirteen.png)

At this point, you can locate the source of error and make a necessary update. Once this is done, we can clear all the breakpoints using `clear all` and then `quit debugging`.

### Conclusion
Debugging is so essential in programming. It is used to avoid problems that may occur due to various errors caused by a program. Although it may be hectic and tedious at some point, you have no other option but to fix them.

Therefore, it is necessary for all programmers to be equipped with this skill. You need to understand what you are doing and what you expect from the program.

This makes debugging easy, especially when locating logical errors.

Happy coding!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
