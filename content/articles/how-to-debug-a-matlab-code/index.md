### HOW TO DEBUG MATLAB CODE
### Introduction
Errors occur everywhere in this world, and programmers, to are not excluded when writing their codes. It could be caused by writing a code that the software doesn't understand or mistyping. When you run your software with these errors, the program will not run or give unexpected results. It is not running because it doesn't understand the code, and it offers incredible results due to misinterpretation of the code. These errors are called a bug. The process of analyzing your code to remove these errors is debugging.
Debugging a code at some points may be hectic since it involves locating the error. Also, Matlab's error statement may sometimes be challenging to understand. This article will look at how to find the mistake in a code and how to correct them. Besides that, Matlab has an inbuilt debugger that helps in debugging codes. We will also look at this tool and how to use it.

### Prerequisites
- [Matlab](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [matlab](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Types of errors in Matlab
Matlab, just as other software, can detect errors. The program stops running or gives wrong results when these errors occur in the code. Generally, there are three main types of errors that may arise when using Matlab. These errors are such as;
1. Syntax error
2. logical errors
3. Runtime errors

### 1. Syntax errors
The syntax is the rule that defines the meaning of various symbols in a program. They tell the computer how to read and translate the multiple codes. Every software or language posses its syntax. Syntax errors occur when a programmer uses the wrong syntax to write his/her code or a mistyping when writing the program. They are as well known as typing errors. 
An example is typing `plog` instead of `plot`. The excellent news about Matlab is it shows the error, and in large codes, for syntax errors, it locates the position of the error. So let's have an example of an error and see how Matlab raises the flag to show the error.

```Matlab
fprintf(today is my birthday)
```
When we run this code, Matlab raises a flag to show the availability of an error, and the execution stops. So this is how it appears.
![matlab error flag](engineering-education/how-to-debug-matlab-code/debug-one.png)

Here, the programmer probably forgot to add some symbols to the code. Thus the execution of the code stops, and Matlabs tells the position of the error for the syntax errors.
Another syntax error may occur due to the misspelling of a variable. For example, you define a variable but misspell it when using it. For example;

```matlab
temp = 15;
newtemp = tem + 3
```
When we execute the above code, we get the below results.

![matlab error flag](engineering-education/how-to-debug-matlab-code/debug_two.png)

Generally, there are many causes of syntax errors in Matlab. As you continue learning Matlab, You will learn the various syntax errors and how to spot and correct these multiple errors. 

### 2. Logical errors
Logic errors occur when there is a problem with the logic of the program. Though logical errors do not cause the program to crash or stop the execution process, it gives a wrong or unexpected result. These errors may be hectic to spot. In addition, because the code runs and provides output, there is no error flag raised to help situate the error. It can be frustrating, especially if you do not know about debugging.
For example;
```matlab
%print odd numbers from 1 to 10
for i = 1:10
if rem(i,2) == 0
disp(i)
end
end
```
We expect our program to display the odd number, but the output is not as we expected. The results are as shown below;

![matlab logical error](engineering-education/how-to-debug-matlab-code/debug_three.png)

### 3. Runtime error
These are errors that occur during the execution of a program. They can either occur on the software or the hardware, and this causes a malfunction on either. Locating these errors should be done since they may result in critical safety and even business operation concerns. Runtime errors can cause a system of high integrity to fail, which can cause disastrous results. They are, at some point, the reason for various system failures. This type of error is hard to detect since it involves anticipating every possible execution of your software. Anticipation is the process of testing every likely behavior of your program. It involves testing all the possible combinations of variables or input or all possible decision paths at least once. It is so hectic for large programs.

### Debugging of Matlab codes
Matlab has some great debugging tools that help you to find the various errors in your code. The central concept of debugging is that of a breakpoint. A breakpoint is something that pauses code execution at the location. For example, if you want Matlab to pause before executing a particular line of code, you will place breakpoints there. Click on dashes next to the number line in a Matlab script or function to create a breakpoint.

![Breakpoint](engineering-education/how-to-debug-matlab-code/debug_four.png)

If we modify the script or function we are debugging, breakpoints turn to grey until the changes are saved. When they turn to grey, it means that the breakpoints are not active. If we run the code in the above image, we have,

![breakpoint](engineering-education/how-to-debug-Matlab-code/debug_five.png)

The letter K shows that a debugger is controlling the program, and it has stopped. The green arrow next to the breakpoint indicates that the execution stopped there since there is a breakpoint there. It means the execution stopped before executing this line.

![Stopped at breakpoint](engineering-education/how-to-debug-Matlab-code/debug_six.png)
 
At the top of Matlab's window, we have the various debugging components you can use to debug your code. To get all these components, click on the dropdown button of the breakpoint shown in the image above. When you click that, you get the options as shown below.

![Various debugging tools](engineering-education/how-to-debug-Matlab-code/debug_seven.png)

Now we will discuss the various actions of each. We will not discuss the clear all, set/clear, enable/disable, and set conditions since they are explained in the window.
![Explained meaning](engineering-education/how-to-debug-Matlab-code/debug_fourteen.png)
- Step-This is the command used to execute the current line. 
- Step in -Used to get a user-defined function when used in the current line. It calls the function but stops on the first line of that function.
- Step out -To move to the following line of a function if a function was initially called using the `step in` function. If the function or variable was defined in the command window, it returns to the window.
- Continue-It is used for the continuation of the execution of the program to completion unless another breakpoint is encountered in the process of execution.
- Quit debugging-It exits the debugging mode and does not finish the execution of the current function.

### Sample debugging process
Lets debug this function
```matlab
function x = rand_int(n,m)

x = randi(n,m);
fprintf('The last element is %d\n', x(n,m))
```
When we run this Matlab function, we have an error as shown below;
![sample error](engineering-education/how-to-debug-Matlab-code/debug_eight.png)

We see Matlab is demanding more arguments from our error message. We will place a breakpoint in the third line and re-run the program. We get the result as shown;

![Sample debugging steps](engineering-education/how-to-debug-Matlab-code/debug_nine.png)

We will input arguments to our function right in front of the `k` in the command window. For this case, we will add the code below in front of the `k`.
```Matlab
rand_int(3,2)
```
After making this correction, we click on the `step` to see its effect.
![Sample debugging steps](engineering-education/how-to-debug-Matlab-code/debug_ten.png)

If we look at Matlab's workspace, we have something interesting. So let's have a look.

![sampling debugging](engineering-education/how-to-debug-matlab-code/debug_eleven.png)
If we look at the workspace, our variables have been assigned a value, but the matrix that we get is a 2x2 matrix, not what we expect. We can type `whos` in the command window to see more details about our variables.

![sample debugging](engineering-education/how-to-debug-Matlab-code/debug_twelve.png) 

Remember the `K>>` act just as normal command window; you can do anything, plot, assign any variable a value we wish, e.t.c. The only difference is that the window now belongs to the active function and, in our case, `rand_int`.
We might want to know the values of our variables, but the important part is to use the `size` function to check the dimension of the array stored in variable `x`, which shows that it is a 2x2 matrix.

![sample debugging](engineering-education/how-to-debug-matlab-code/debug_thirteen.png)

At this point, you can now locate your source of error and make a necessary update. Once this is done, we can clear all the breakpoints using `clear all` and then `quit debugging`. 

### Conclusion
Debugging is so essential part of a programmer. It is used to avoid problems that may occur due to the various errors caused by a program. Though it may be so hectic and tedious at points, you got no option as a programmer. It makes it necessary for all programmers to be equipped with this skill. You need to understand what you are doing and the expected result from all your program lines for proper debugging. It also makes debugging easy, especially when locating the logical errors.
