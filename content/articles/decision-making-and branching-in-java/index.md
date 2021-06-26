### Decision making and branching in Java

### Introduction 
Java statements are executed in a sequential order that is, the order in which they are arranged. There are scenarios when the sequence in which statements are aligned must be altered to meet specific requirements. The decision is made to tell the computer which statements to execute based on the order in which they occur. Branching occurs when a program breaks or does not obey the order and jumps to another part of the code.Conditional branching occurs when branching follows particular condition.

### Prerequisites
Before learning this tutorial you need to have knowledge in Java and  have some simple basics in programming. As a learner you need to understand how to run and compile java programs.

### Decision making using if statement 
The if statement is an example of a decision making statement in control of statement execution. The if statement is a dual-track decision statement and is used in combination with an expression. The evaluation of an expression depends on whether the results of the expression are true or false and transfers the controls to a statement.
Example of decision making using if statements are;
1. if(room=dark)
turn on lights
2. if (marks>=40)
pass
3. if (age>=18)
adult
if statements are based on the complexity of conditions.

### The simple if statement
The syntax of a simple if statement;

```Java
if(test expression)
{
    statement-block:
}
statement-x:
```

The statement-block is a single statement or a group of statements that is executed once the test expression is true and if otherwise it is skipped and the statement-x executed instead.
consider the following program;

```Java
if (category==mathematics)
{
    marks=marks+bonus_marks;
}
system.out.println(marks)
```

The program tests the category type of the learner and if the learner is in the category type of mathematics then additional bonus_marks for the mathematics category are added. For other categories, no bonus_marks added.
When testing for two conditions that is weight and age we have;

```Java
if(weight>50) 
if(age>20)
count=count+1;
```

If the weight is greater than 50 the statement is executed which in turn is another if statement. This if statement tests for age and if age is greater than 20 then the count is incremented by 1.

### The if...else statement
The if-else statement is almost similar to the if statement and can be said to be extended by the if statement. The if...else statement syntax;

```Java
if(test expression)
{
    block of true statement
}
else
{
    block of false statement
}
statement-x
```

If the test expression happens to be true then the block of a true statement is executed if not then the block of a false statement is executed. Here in either case one of the statement must be executed either the block of true statements or the block of false statements.
Consider this example of an if-else statement;

```Java
if (gender==male)
boy=boy+1
else
girl=girl+1
```

If the gender is male the statement boy=boy+1 is executed and skips the else part because the expression is true. If the gender was female then the statement boy=boy+1 would be skipped and the else part for girl=girl+1 executed.
Program checking odd or even number:

```Java
import java.util.Scanner;

public class EvenOddnumbers {

    public static void main(String[] args) {

        Scanner reader = new Scanner(System.in);

        System.out.print("Enter any number: ");
        int num = reader.nextInt();

        if(num % 2 == 0)
            System.out.println(num + " Number is even");
        else
            System.out.println(num + " Number is odd");
    }
}
```

When a number is entered a test is carried if the modulo is zero the output is given as even or else the output is odd.

### Nested if...else statement
When a series of decisions are to be involved we use the nested if-else statement and the if-else statements are used more than once.

```Java
if(test condition a)
{
    if(test condition b)
    {
        statement-1;
    }
    else
    {
    statement-2;
    }
}
else
{
    statement-3;
}
statement-x;
```

If the test condition a is false then statement-3 is executed otherwise if test condition a is true it proceeds to test condition b which if it is true the statement-1 is executed and if false the statement-2 is executed.
When nesting, the if...else statements every if should be matched with an else statement. In nesting if...else statements in java you consider an else as linked to the closest non-terminated if.
Using the nested if...else in an example:

```Java
public class Largest {
  public static void main(String[] args) {
        int i=40, j=23, k=50;
        System.out.println("largest value is:");
        if (i>j)
        {
            if (i>k)
            {
                System.out.println(i);
            }
            else
            {
         System.out.println(k);
            }
        }
        else
        {
            if(j>k)
            {
                System.out.println(k);
            }
            else
            {
                
                System.out.println(j);
            }
        }
    }
}
```
The system will display the largest number of the three that is 50.

### The else..if ladder
The else-if ladder is used when multipath decisions are involved, where a multipath decision is a chain of ifs in the case that every statement associated with an else is an if.
The syntax of an else if ladder:

```Java
if(condition a)
statement-1;
else if(condition b)
statement-2;
else if(condition c)
statement-3;
..
..
..
else if(condition v)
statement-n;
else
default-statement;
statement-x;
```

The evaluation of conditions is done from the top moving to the bottom and execution happens when the true condition is found and the control transferred to statement-x.  
The final else containing the default statement is executed when all conditions are false.
Let us consider an example using the else if ladder:
consider the grading of students in a school
marks  grade
80-100  first class
60-79   second upper
40-59   second lower
0-39    pass
the grading of students can be done using an else if ladder;

```Java
public class Main {
  public static void main(String[] args) {
   int marks = 22;
if (marks > 79) {
  System.out.println("First upper.");
} else if (marks > 59) {
  System.out.println("Second upper.");
} else if(marks > 49) {
  System.out.println("Second lower.");
} else if(marks < 49){
System.out.println("fail");
}
  }
}

```

The system will display fail because the marks are less than 49.

### The switch statement
The switch statement is used to compare the value of a variable to a list of possible values. A block of statements associated with that case are executed, when a match is detected it is executed.
The general form of a switch statement is as follows:

```Java
switch (expression)
{
    case value-1:
    block-1
    break;
    case value-2:
    block-2
    break;
    ..
    ..
    default:
    default block
    break;
}
statement-x;
```

The case labels are constant expressions with the values value-1, value-2, and so on, and they should be unique within the switch statement.
In a switch statement, the switch labels are separated by a colon (:).
When running the switch expression, the expression value is compared to the case labels provided, and if the case value matches the value of the switch expression, the block in that case is executed.
The break statement at the end of the block shows the end of a case and exits from the switch statement and moves the control statement-x. The default value is executed if a match is not found in any of the case labels within the switch.

```Java
public class Main {
  public static void main(String[] args) {
    int day = 8;
    switch (day) {
      case 1:
        System.out.println("Monday");
        break;
      case 2:
        System.out.println("Tuesday");
        break;
      case 3:
        System.out.println("Wednesday");
        break;
      case 4:
        System.out.println("Thursday");
        break;
      case 5:
        System.out.println("Friday");
        break;
      case 6:
        System.out.println("Saturday");
        break;
      case 7:
        System.out.println("Sunday");
        break;
        default:
        System.out.println("enter valid day");
        break;
    }
  }
}

```

The system in this case will display enter valid day because 8 is not within the case labels stated.

### Conclusion
Decision making statements are very helpful especially in situations where a certain condition has to be met. They are also helpful when we want to sort data from the user.
