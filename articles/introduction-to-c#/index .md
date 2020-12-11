# Introduction to C#
C# is pronounced as "C-Sharp".
### Why C#?

C# is a modern object-oriented programming language that is portable and requires a .NET framework on a machine for it to run.

The performance of C# is exceptional in terms of speed and it can cheaply use resources. Many applications can be created using C#. Some of these are given as follows:

- Web applications
- Networking applications
- Database applications
- Mobile application
- Games
- service applications 
- And so much more.


C# is a friendlier and easier language to understand for beginners compared to other programming languages like C and C++.

Programs written in C# use the .NET Framework to run. .NET is a framework used to create applications and run the .NET software. It was developed by Microsoft and runs primarily on Windows operating systems. There is an open-source project as well – it's called Mono which delivers a cross-platform.
In this tutorial, we need it to compile and run our code.

To get started, you will need:
- An IDE(Integrated Development Environment) for writting and compiling code. We will be using [Visual Studio](https://visualstudio.microsoft.com/vs/community/).



### Installing C# 
Once you have downloaded and installed Visual Studio, choose .NET desktop development and click *Modify*.
![vscode](installation.png)

After the installation, click *Launch* to get started.  

On the new window,choose *Create new project*.
![newproject](vs1.png)

On the click, choose *"Install more tools and features"* then click *Next*.

![newproject](Newproject2.png)

Choose *Console App (.NET Core)* from the list and click *Next*.

![newproject](Consoleapp.png)

Enter your preferred project name and click *Create*. In this case, I will name my file *HelloWorld*.

![newproject](projectname.png)

Visual Code will automatically generate some code of C# for you.

![newproject](Program.png)

Let us look at the code.

Below is the code that will be generated. It is a *Hello World* program.

```C#
using System;

    namespace HelloWorld
        {
            class Program
            {
            static void Main(string[] args){
                Console.WriteLine("Hello World!");
            }
        }
    }
```

For you to run the program, press the *F5* key on your keyboard.
This will compile and run your code. A  console window will open with the following output:

```
Hello World!

C:\Users\Username\source\repos\HelloWorld\HelloWorld\bin\Debug\netcoreapp3.0\HelloWorld.exe (process 13784) exited with code 0.
To automatically close the console when debugging stops, enable Tools->Options->Debugging->Automatically close the console when debugging stops.
Press any key to close this window . . .
```

### C# Syntax

From the above code, we created a program that prints out "Hello World". Let us look at each line while modifying our program:

```C#
//This is a C# program
using System;

  namespace HelloWorld
    {
        class Program
            {
            static void Main(string[] args){
                Console.WriteLine("Hello World!");
                Console.ReadLine();
                }
            }
        }
```
Here:


**Line 1:** 

```c#
//This is a C# program
```

The line starts with two forward slashes which makes it a comment. C# ignores this line when executing the code. This is a single-line comment. Comments are used by programmers to explain more about the line(what the line does). This concept is so important when a group of programmers are working together as it makes your code more readable to the others.

For multiple-line comment,we use ` /*`and ends with `*/` :

```C#
/* C# is a programming language used to create Web applications and Mobile applications.

It is an amazing language. */
```

Any text between `/*` and `*/` will be ignored by C#.

**Line 2:**
 ```C#
 using System
 ```

In C#, it means that we can use the classes available in the system. It contains commonly-used types and classes. 
You can explore more in the [C# docs](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-directive).

**Line 3:**
 ```C#
 namespace HelloWorld{}
 ``` 

Namespaces are used in C# to organize and provide a level of separation of codes. It is a container that consists of classes, methods, and other namespaces.

**Line 4:**
 ``` C#
 class Program{}
 ```

A class is a container that contains data and methods. Since C# is Object-oriented programming, creating a class is mandatory for each program. In our case, we are creating a class called `Program`.

**Line 5:** 
```C#
static void Main(string[] args)
```
Any program execution starts from the `Main` method. Any code outside the `Main` method will not be executed **unless** it is called. Every C# program must have the `Main` method.

**Line 6:**
 ```C#
 Console.WriteLine("Hello World!");
 ```

`Console.WriteLine()` is used to print out text on the console. It prints a string and moves to the start of the next line. In our case, it is used to output *"Hello World"*.

We can also use `Console.Write()` that print a string in the same line without moving to the next line.  You can learn more on Console.WriteLine() and Console.Write() [here](https://www.programiz.com/csharp-programming/basic-input-output).

**Line 7** 
```C#
Console.ReadLine();
```

`Console.ReadLine()` is used to read the next characters in the input system.
In the above program, as soon as the user enters a character(s) and presses the ENTER key, it terminates.

`Console.Read()`can also be used to read the next character in the input system.

```Console.ReadKey()``` can also be used to obtain the next key pressed by the user. It is mostly used to hold the console for the user until he presses a key.

**Note:**
- Each line in C# ends with a semi-colon(;).
- C# follows a top to bottom order when executing the program.
- C# is a case-sensitive language. This means that it treats lowercase and uppercase characters differently.e.g `program` and `Program` mean different things.

**Congratulations!** You just wrote your first C# program.

Let's write another program that calculates the sum of two numbers entered by the user.
```C#
//This is a C# program that adds two numbers
using System;

    namespace HelloWorld
        {
            class Program
            {       
                static void Main(string[] args){
                    Console.WriteLine("Enter your first number: ");
                    int num1= Convert.ToInt32(Console.ReadLine());
                    Console.WriteLine("Enter your second number: ");
                    int num2= Convert.ToInt32(Console.ReadLine());
                    Console.WriteLine("Your Sum is "num1 + num2);//prints the sum of the two numbers 
                    Console.ReadLine();
               }
         }
    }

```


Here's how your program output will look like:

```
Enter your first number: 2

Enter your second number: 5

Your Sum Is 7
```
Let us look at the new things in our program:

```c#
int num1= Convert.ToInt32(Console.ReadLine());
```

`int num1` means that we are creating a memory location to hold an integer (int). In our case, we have named the integer **num1**.

Just like integers, we have `double` data type which stores fractional numbers:
```C#
double num1;
```

`Convert.ToInt32()`When we prompt the user to enter any details, C# takes the input as strings therefore, we have to convert the strings to numbers using the `Convert.ToInt32()` method above. 

```C#
Console.ReadLine()
```
It takes data from the user and allocates it to the memory location we had created earlier. 

### Takeaways
In this tutorial we looked at setting up a C# development environment. We also looked at a sample C# program that prints "Hello World". We have looked at the various methods of collecting user inputs and using them in our program (Adding two numbers).