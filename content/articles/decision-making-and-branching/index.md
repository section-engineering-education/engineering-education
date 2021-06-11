### Decision making and branching in Java
### Introduction 
Java programs contains set of statements that are executed in the order in which they appear. There are times when the order of statements allignment has to be changed based on certain conditions so as to meet specified conditions. The decision making happens so as to direct the computer on what statements to execute based their occurrence. Branching involves the breaking of the code's sequential order and moving to another part of the code.
Conditional branching occurs when branching is followed by a particular condition.

### prerequisites
Before learning this tutorial you need to have knowledge in Java and  have some simple basics in programming. As a learner you need to understand how to run and compile java programs.

### Decision making using if statement 
The if statement is an example of a decision making statement in control of statement execution. The if statement is a two-wayed decision statement and is used  together with an expression. The computer evaluates the expression first depending on whether the expression is true or false and transfers the controls to a statement.
Example of decision making using if statements are;
1. if(room=dark)
turn on lights
2. if (marks>=40)
pass
3. if (age>=18)
adult
if statements are based on the complexity of conditions.

### The simple if else statement
A syntax of a simple else if statement;
```Java
if(test expression)
{
    statement-block:
}
statement-x:
```
The statement-block is a single statement or a group of statements that is executed once the test expression is true and if otherwise it is skipped and the statement-x  executed instead.
consider the following program;
```Java
if (category==mathematics)
{
    marks=marks+bonus_marks;
}
system.out.println(marks)
```
The program tests the category type of the learner and if the learner is in the category type of mathematics then addditional bonus_marks for the mathematics category are added. For other categories no bonus_marks added.
When testing for two conditions that is weight and age we have;
```Java
if(weight>50) 
if(age>20)
count=count+1;
```
If the weight is greater than 50 the statement is executed which in turn is another if statement. This if statement tests for age and if age is greater than 20 then the count is incremented by 1.
### The if...else statement
The if else statement is almost simmilar to the if statement and can be said to be extended by the if statement. The if...else statement syntax
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
If the test expression happens to be true then the block of true statement is executed if not then the block of false statement is executed. Here in either case  one of the statement must be executed either the block of true statements or of false block statement.
Consider this example of an if else statement;
```Java
if (gender==male)
boy=boy+1
else
girl=girl+1
```
If the gender is male the statement boy=boy+1 is executedand skips the else part because the expression is correct. If the gender was say female then the statement boy=boy+1 would be skipped and the else part for girl=girl+1 executed.
Program counting odd and even numbers:
```Java
class count
{
    public static void main(string[]args)
    {
        int number[]={40, 61,34,99,71,50,120};
        int even =0, odd=0;
        for(int i=0;1 < number.length;i++)
        {if ((number[i]%2)==0)
        {
            even +=1;
        }
        else
        {
            odd +=1;
        }
        }
        system.out.println("Even Numbers:" + even
        "oddnumbers :"+ odd);
    }
}
```
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
If the test condition a is false then statement-3 is executed otherwise if the test condition a is true it proceeds to test condition b which if it is true the statement-1 is executed and if false the statement-2 is executed.
When nesting the if...else statements every if should be matched with an else statement. In nesting if...else statements in java you consideran else as linked to the closest non-terminated if.
Using the nested if...else in an example:
```Java
class largest
{
    public static void main(string[]args)
    {
        int i=40, j=23, k=50;
        system.out.println("largest value is:");
        if i>j
        {
            if i>k
            {
                system.out.println(i);
            }
            else
            {
                system.out.println(k);
            }
        }
        else
        {
            if(c>b)
            {
                system.out.println(k);
            }
            else
            {
                system.out.println(j);
            }
        }
    }
}
```
### the else..if ladder
The else if ladder is used when multipath decisions are involved, where a multipath decision is a chain of ifs in the case that every statement associated with an else is an if.
A syntax of an else if ladder:
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
The evaluation of conditions is done from the top moving to the bottom and excecution happens when the true condition is found  and the control transfered to statement-x.  
The final else containing the default statement is executed when all conditions are false.
Let us consider an example using the else if ladder:
consider the grading of students in a school
marks  grade
80-100  first class
60-79   second upper
40-59   second lower
0-39    pass
the grading of students can be done using an else if ladder
```Java
if(marks>79)
grade="first class";
else if(marks>59)
grade="second upper";
else if(marks>49)
grade="second lower";
else
grade="fail";
system.out.println("Grade:" +grade);
```
### The switch statement
The switch statement is used to test the value of a given variable against a list of given of case values.When a match is found, a block of statements that is assosiated with that case is executed.
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
The case labels are constant expressions that is value-1,value-2... and should be unique within a switch statement.
The switch labels in a switch statement ends in a colon(:).
When the switch expression is executed the value of the expression is compared to the case labels given and if a case value matches the value of switch expression then the block that follows that case is executed.
The break statement at the end of the block shows the end of a case and exits from the switch statement and moves the control statement-x. The default value is executed once a match is not found in any of the case labels given.
```Java
switch(day)
{
    case 1:
    system.out.println("Monday");
    break;
    case 2:
    system.out.println("Tuesday");
    break;
    case 3:
    system.out.println("wednesday");
    break;
    case 4:
    System.out.println("Thursday");
    break;
    case 5:
    system.out.println("Friday");
    break;
    case 6:
    system.out.println("saturday");
    break;
    case 7:
    system.out.println("sunday");
    break;
    default:
    system.out.println("provide correct day of the week")

}