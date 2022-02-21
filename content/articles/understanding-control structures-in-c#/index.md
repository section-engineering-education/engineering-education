<!--Header with a heading H3-->

### Introduction
Some issues in programming appear to be insurmountable,<!--Use simpler terms--> but you need not be concerned. The same way a computer works, one can overcome a large obstacle in life that appears to be more complicated by simply taking a simple step toward the solution. Complex problems are broken down into smaller pieces by the computer, which is then passed on to functions that provide answers (are implemented).
To execute all of this work well, one must first comprehend the **building blocks**. These building blocks will assist one in making various decisions in the program, for example, one may like to obtain a positive result while disregarding the negative one, or one may wish for the program to re-run a certain section of the code, necessitating the use of **control structures**. They will assist the program in choosing a specific path or direction, as a decision will be required. As a result, control structures will assess the variable and select the appropriate direction based on the parameter. As previously stated, we will introduce you to control structures in this article. Furthermore, we will give various examples of each statement for a better understanding of these control structures.

### Table of content
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Selection statements](#selection-statements)
   * [If statements](#if-statements)
   * [Else statement](#else-statement)
   * [Switch statements](#switch-statements)
- [Iteration statements](#iteration-statements)
   * [While statements](#while-statements)
   * [Do While](#do-while)
   * [For loop](#for-loop)
- [Jump statements](#jump-statements)
   * [Break statement](#break-statement)
   * [Goto statement](#goto-statement)
   * [Continue statement](#continue-statement)
   * [Return statement](#return-statement)
- [Conclusion](#conclusion)


#### Prerequisites
For better understanding, one should have the basics of building blocks from the C & C++ programming language.


### Selection statements
First, of all, we need a recall of the definition of a statement. In programming, statements can be instructions that are initiated by the user. For instance,
```C#
console.writeline("this is my statement");
``` 
In this sub-topic, we are going to look at;- if, else, else if and switch statements.

#### If statements
it has a specification where it only executes a true statement.

**syntax**
```C#
 if(condition)
 {
     statement;// it must be true
 }
```
 Example in form of a program.

 ```C#
using System;

namespace MyApplication
{
  class demo
  {
    static void Main(string[] args)
    {
      if (90> 9) // note that 'if' should be in lowercase otherwise  it will bring an error
      {
        Console.WriteLine("yes i agree 90 is greater");//what will be displayed
      }    
    }
  }
}
 ``` 
 The above program has been executed since the condition given is true (90>9) otherwise it won't execute.

#### Else statement
 This statement is opposite to that of 'if' above. It executes if the condition is false. The compiler has to go through the if first to check whether it meets the condition if not then come to **else statement**(the compiler evaluate line by line).

 **syntax**
 ```C#
 if(condition)
 {
     statement;//executes if conditiom is true
 }
else
{
    statement;// executes if conditiom is false
}
```
example
```C#
using System;

namespace MyApplication
{
  class demo
  {
    static void Main(string[] args)
    {
      if (9>90)
      // note that it should be in lowercase otherwise  it will bring an error
      {
        Console.WriteLine("yes i agree 90 is greater");
        // this will not be excuted
      }   
      else 
      {        
          Console.WriteLine("yes 9 is not greater 90");
          //this is what will be displayed.
      }
    }
  }
}
```

In the above program since the first statement doesn't meet the condition, the compiler will proceed to the next, which is 'else statement', and execute it.

#### Else if statement
For this statement to execute, the other above conditions in that program (if condition) should be false.

**syntax**
```C#
if(condition1)
{
    statement;
}
else if(condition2)
{
    statement;
}
else(condition3)
// this is executed when condition 1 and 2 are both false
{
    statement;
}
```
example
```C#
using System;

namespace MyApplication
{
  class demo
  {
    static void Main(string[] args)
    {
      int age = 18;
      if (age < 10) 
      {
        Console.WriteLine("still child.");
        // do not meet condition
      } 
      else if (age < 15) 
      {
        Console.WriteLine("adolescence stage.");
        //do not meet condition
      } 
      else 
      {
        Console.WriteLine("you are a man.");
        // meets condition
      }
    }
  }
}
```
**Output**
```bash
you are man
```
In the above program, the compiler will not execute the first and the second statement since they don't meet conditions. therefore the third statement will be executed.

#### Switch statements
Here the execution is done when the expression matches with the values in the case. The keyword **break** helps to save time for execution since the compiler breaks for the next case(expression).

**syntax**
```C#
switch(expression)
{
    case: 1  
              statement;
               break;
    case: 2
             statement;
              break;
    .
    .
    .
    case: n
           statement;
           break;
}
```
example
```C#
using System;

namespace MyApplication
{
  class demo
  {
    static void Main(string[] args)
    {
      int year = 2;
      switch (year) 
      {
        case 1:
                Console.WriteLine("2021");
                break;
        case 2:
                 Console.WriteLine("2022");
                 //it will output this we have switched it.
                  break;
        case 3:
                 Console.WriteLine("2023");
                break;
        case 4:
                  Console.WriteLine("2024");
                  break;
        
        
      }    
    }
  }
```
Output
```bash
2022
```
### Iteration statements
what to iterate?. It is to repeat something several times. Similarly, programming iteration means the same where you find an algorithm repeats itself several times until it achieves or meets specific conditions. Iteration statements are well/ famously known as loops.

#### While statements.
Programmers find it easy to learn and understand while statements.
Here, it keeps iterating as long as the statement meets the condition (true condition).
  
  **syntax**
  ```C#
  while(condition)
  statement;
  ```
  example

  ```C#
  using System;

namespace MyApplication
{
  class demo
  {
    static void Main(string[] args)
    {
      int j = 10;
      // we assign a value
      while (j <20 )
      // then the condition
      {
          Console.WriteLine(j);
        j++;
        //incrementing
      }
    }
  }
}
``` 
**explanation**
The program will execute numbers from 10 to 19 since the condition says to output `j` when `j<20` and already we know our `j` is equal to 10.

#### Do while. 
Do while is unlike while loop where we first look at the condition. Do while will first do/execute the statement before it looks whether the statement is true and thereafter it checks if it is true to repeat the loop.
 
 **syntax**
 ```C#
 do

 {
   statement;
 }
 while (condition)
 ```
  Demonstration
```C#
using System;

namespace MyApplication
{
  class demo
  {
    static void Main(string[] args)
    {
      int j = 10;
      do 
      {
          Console.WriteLine(j);
          //we output before checking the condition
        j++;
      } while(j<20);
    }
  }
}
```
#### For loop.
 The good thing we for loop one can know easily how many times will the system iterate or at what point will it stop and give feedback.

 **syntax**
```C#
for(initialization;condition; increment/decrement)
{
  statement;
}
```
Example
```C#
using System;

namespace MyApplication
{
  class demo
  {
    static void Main(string[] args)
    {
      int j = 10;
      for (j=10; j<15;j++)//the loop
      {
          Console.WriteLine(j);
        
      } 
    }
  }
}
```

**Explanation**
We have first initialized our 'j' to be equal to 10, then the condition is that 'j' can be valued between 9 and 15 since 10 is already involved, so it will output values from 10 to 14.

#### Jump statements
As the name suggests jump statements will transfer control from one place to another as per the condition. In this sub, the topic will learn some of the jump statements.

#### Break statement
The break statement is used when one needs the code to terminate some statement and perhaps go to the next. Like in switch statements it is used to terminate one statement and go to the next one or terminate the whole program.

**Example**
```C#
using System;
  
class demo
{
  
    
    static public void Main()
    {
  

        for (int j = 0; j < 5; j++) 
        {
            if (j == 4)
                // it will break when it reaches here
                break;
  
            Console.WriteLine("hello");
        }
    }
}
```
Output
```bash
hello
hello
hello
hello
```
The above program means, it will display 
'hello,' four times since the condition says it should break whenever it reaches 4th time.

#### Goto statements
This is a statement once encountered jumps to the specified location. Below we are going to learn (through example)how to implement the goto statement.

```C#
using System;

namespace demo
{
    class Program
    {
        static void Main(string[] args)
        {
          int j;
   for (j=5; j<15;j++)
           {
              if(j ==10 ) 
              {
                 goto endloop;//it will end the program once it gets that j is equal to ten
              }
              Console.WriteLine("j value: {0}", j);//outputing j
           }
        endloop: Console.WriteLine("Thank you for your time");
           
           Console.ReadLine();
        }
    }
}
```
Output
```Bash
j value: 5
j value:6
j value:7
j value:8
j value:9
 Thank you for your time
 ```
 The above program will display 5 to 9 since 'j' we already initiated it and gave it 5 . Therefore the compiler will jump up to 10 since our goto statement directs to 10.

#### Continue statement.
 These kinds of statements are mostly used when a programmer wants the program to skip a certain part of execution like for example in loop statements. Here once the compiler meets the continue statement, it jumps to begin the loop again as per the condition statement.

 **example**
 ```C#
using System;

class demo{

  
  public static void Main()// Main Method
  {
    
    
    for (int j = 1; j <= 7; j++) 
        {

    
      if (j == 3) // once the compiler reaches 3,it will skip it and continue with the next number after 3 which is 4
        continue;

      Console.WriteLine(j); // j is values from 1 to 7 , when 3 is excluded
    }
  }
}
```
#### Return statement.
Usually, the return statement in C# is used to stop the execution of the method where it appears and return control to the calling function. for example
```C#
using System;

class demo {


  static int sub(int b)
  {

    int sub = b - b;
    
    // the return statement
    return sub;
  }

  // Main Method
  static public void Main()
  {
    int number = 4;

    //  now calling subtraction function
    int result = sub(number);
    Console.WriteLine("The answer is {0}", result);
  }
}
```
The above program will return 0 since we have declared the same number 4, therefore our answer will be 0.
 

### Conclusion
In this article, we have learned the control structures in  C#. it has enabled us to know the selection statements, iteration statements(loops), and the jump statements where in each case we have given examples of how they are implemented.
