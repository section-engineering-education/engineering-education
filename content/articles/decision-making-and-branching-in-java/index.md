---
layout: engineering-education
status: publish
published: true
url: /decision-making-and-branching-in-java/
title: Understanding Decision making and Branching in Java
description: This article will guide you on the basics of decision making and branching in Java. Conditional statements allow the program to execute different lines of code.
author: george-wamama
date: 2021-07-27T00:00:00-05:02
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/decision-making-and-branching-in-java/hero.jpg
    alt: Decision-making and Branching in Java
---
Java statements are executed in a sequential manner, that is, the order in which they are arranged. However, there are scenarios where this sequence must be altered to meet specific requirements. In such cases, a decision is made to tell the computer which statements to execute. 
<!--more-->
Branching occurs when a program breaks or does not obey the sequential order and instead jumps to another part of the code. In conditional branching, the computer usually follows certain predefined conditions.

### Prerequisites
To follow along, you need to have some basic knowledge of Java. Furthermore, you must be in a position to work with IDEs like [Netbeans](https://netbeans.apache.org/download/index.html) and [Intellij](https://www.jetbrains.com/idea/download/download-thanks.html). 

### Decision-making using if statement 
An example of a decision-making statement under controlled supervision is the `if` statement. It is also a dual-track decision statement and is used in combination with an expression. 

When using the `if` statement, program execution depends on whether the results are true or false.

The structure and syntax of an `if` statement is shown below:

```Java
if(test expression){
    statement-block:
}

statement-x:
```

The `statement-block` can be a single or a group of statements that is executed only when the test expression is true.

Here is another example of an `if` statement:

```Java
if (category==mathematics){
    marks = marks+bonus_marks; // statement block
}
system.out.println(marks)
```

The program checks if the `category` type is `mathematics`. If this is `true` then additional bonus_marks are added to the student's score. 

### The if-else statement
The `if-else` condition can be regarded as an advancement in the `if` statement since the `if-else` statement has only a few upgrades from the `if` statement. 

Here is how the `if-else` syntax looks:

```Java
if(test expression){
    //block of true statement
}else{
    //block of false statement
}
statement-x
```

If the test expression is `true`, the true-statement-block is executed. If not then the false-code-block is executed. This is to say that, one condition must be executed.

Consider this `if-else` example:

```Java
if (gender==male){
  boy=boy+1
}else{
  girl=girl+1
}
```

If the `gender` is `male` then the `boy=boy+1` statement is executed. The `else` portion is skipped because the expression is true. 

If the `gender` was `female`, the statement `boy=boy+1` would be skipped and the `else` part for `girl=girl+1` is executed.

The following program uses an `if-else` statement to check if an entered number is an odd number or an even number:

```Java
import java.util.Scanner;

public class EvenOddnumbers {

    public static void main(String args[]) {

        Scanner reader = new Scanner(System.in);

        System.out.print("Enter any number: ");
        int num = reader.nextInt(); // getting user input using the scanner class

        if(num % 2 == 0){ //checks if number is divisible by 2 and has no remainder through modulo function
            System.out.println(num + " Number is even"); // Output when number is even
        }else{
            System.out.println(num + " Number is odd"); // Output when number is odd
        }
    }
}
```
The output of this program will be given and stated whether it is even or odd.

Using an `if-else` statement we can check if the current year is a leap year or not:

```Java
import java.util.*;
public class main {

   public static void main(String args[]) {
      String months[] = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", 
         "Oct", "Nov", "Dec"};
      
      int year;
      // Create a Gregorian calendar initialized
      // with the current date in the
      // default locale and timezone.
      
      GregorianCalendar gcalendar = new GregorianCalendar();
      
      // Display current  date information.
      System.out.print("Date: ");
      System.out.print(months[gcalendar.get(Calendar.MONTH)]);
      System.out.print(" " + gcalendar.get(Calendar.DATE) + " ");
      System.out.println(year = gcalendar.get(Calendar.YEAR));
      
      // Test if the current year is a leap year
      if(gcalendar.isLeapYear(year)) {
         System.out.println("The current year is a leap year");
      }else {
         System.out.println("The current year is not a leap year");
      }
   }
}
```
The program will output the current date according to the Gregorian calendar and state if it is a leap year or not.

### Nested if-else statement
A nested `if-else` statement is used when a number of decisions have to be involved.

Here is the structure of a nested `if-else` statement:

```Java
if(test condition a){
    if(test condition b){
        //statement-1;
    }else{
        //statement-2;
    }
}else{
    //statement-3;
}

statement-x;
```

If the `test condition a` is `false` then execution of `statement-3` will take place. 

On the other hand, if `test condition a` is `true`, the program proceeds to `test condition b` and executes the predefined conditions.

The following example uses a `nested if-else` statement:

```Java
public class Largest {
  public static void main(String[] args) {
        int i=40, j=23, k=50; //defining variables and assignment them values

        System.out.println("largest value is:");
        if (i>j){
            if (i>k){ //first nested if-else statement
                System.out.println(i);
            }else{
                System.out.println(k);
            }

        }else{

           if(j>k){ //second nested if-else statement
                System.out.println(k);
            }else{
                System.out.println(j);
            }
        }
    }
}
```

The above program will display the largest number which is `50`.

### The else-if ladder
The else-if ladder follows when [multipath](https://www.oreilly.com/library/view/programming-techniques-through/9788131705087/10_chap05.html) decisions are to be used.

Here is the syntax of an `else if` statement:

```Java
if(condition m)
{
  statement-a;
  }
  else if(condition n)
  {
  statement-b;
  }
  else if(condition o)
  {
  statement-c;
  }
  else if(condition p)
  {
  statement-n;
  }
  else
  {
  default-statement;
}
statement-x;
```

The conditions are evaluated from the first condition to the last condition in a logical order and when a true condition is found execution happens.

The final `else` statement containing the `default-statement` is executed when no conditions have been executed.

Let's use the `else-if` statements to create a simple program to grade students.

```Java
public class Main {
  public static void main(String[] args) {
   int marks = 22;

    if (marks >= 79) { //if a students marks are greater than 79
      System.out.println("First upper."); 
    } else if (marks >= 59 && marks < 79) { //if marks are greater than 59 but less than 79
      System.out.println("Second upper.");
    } else if(marks >= 49 && marks < 59) { //if marks are greater than 49 but less than 59
      System.out.println("Second lower.");
    } else if(marks < 49){
    System.out.println("fail");
    }
  }
}
```

### The switch statement
The `switch` statement compares a variable to a list of the possible values. 

When a match has detected the block of statements associated with that case is executed

The general structure of a `switch` statement is as follows:

```Java
switch (expression)
{
    case value-1:
      block-statement 1;
    break;
    case value-2:
      block-statement 2;
    break;
    default:
      default block statement;
    break;
}
statement-x;
```

The `case` labels are constant expressions and should always be unique.

In a `switch` statement, the `case labels` are separated by a full colon (:).

When running the `switch` code block, the `expression` value is compared to the provided `case` labels. If the` case` value matches the expression, the block in that `case` is executed and the loop breaks.

The `default` value is executed if a `match` is not found in any of the `case` labels.

Here is an example of a program that uses a `switch` statement to determine the week day:

```Java
public class Main {
  public static void main(String[] args) {
    int day = 8;
    switch (day) {
      case 1: //if day is 1
        System.out.println("Monday");
        break;
      case 2://if day is 2
        System.out.println("Tuesday");
        break;
      case 3://if day is 3
        System.out.println("Wednesday");
        break;
      case 4://if day is 4
        System.out.println("Thursday");
        break;
      case 5://if day is 5
        System.out.println("Friday");
        break;
      case 6://if day is 6
        System.out.println("Saturday");
        break;
      case 7://if day is 7
        System.out.println("Sunday");
        break;
        default://if the number is not in case labels
        System.out.println("enter valid day");
        break;
    }
  }
}

```

The output of the above program will be `enter valid day` because 8 is not within the defined case labels.

### Differences between the if-else statements and switch statments
1. The switch statement has many cases to test of which all can be incorrect prompting the system to display the default statement while the if-else statement has only two statements to be executed of which one is true to the expression and the other is false to the expression and does not have a default statement.
2. In the switch statements, the values depend on the choice of the user and a case is executed based on the match of the value and the case label while the value in an if-else statement is based on the conditions set for the if or else block.

### Simmilarities of the if-else statement and switch statement
1. The execution of this statements ends when a true match is found. For the `switch` statement when a match is found between the case labels, and for `if-else` statement when a true match of conditions is found.
2. They are used to control the flow of a program.

### Conclusion
Decision-making statements are very helpful especially in situations where a certain condition has to be met. They are also helpful when we want to sort data from the user. You can, therefore, use this knowledge to craft more powerful applications.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)