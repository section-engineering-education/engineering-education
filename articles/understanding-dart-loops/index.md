### Introduction
`Dart` is a client-optimized language that is scalable and can write simple scripts or full-featured applications. It is an object-oriented, dynamic language developed by `Google`. Like most programming languages, it contains loops and iterations. If one is familiar with [`Java`](https://en.wikipedia.org/wiki/Java_(programming_language)) or [`Kotlin`](https://en.wikipedia.org/wiki/Kotlin_(programming_language)) then elements of Dart Language will prove to be easier.

A `Loop` is a code that determines the number of iterations that will occur if it meets a certain condition, while an `Iteration` is the number of times it can execute a loop. We also define a `Loop` as a programming structure that repeats a sequence of instructions until it meets a condition. We apply Loops to avoid unnecessary repetition of code and are a way of applying something to an unknown or not innumerable amount of things. Some applications of loops include adding sums of numbers, cycling through values, repeat functions, to mention a few.

### Prerequisites
To write Dart programs and implement knowledge from this article you need to have:

1. You can use the **[DartPad Online Editor](https://dartpad.dartlang.org/)** OR

2. You can use this method if you are familiar with [`Java`](https://en.wikipedia.org/wiki/Java_(programming_language)) or [`Kotlin`](https://en.wikipedia.org/wiki/Kotlin_(programming_language)), **[Install Dart SDK ](https://dart.dev/get-dart)**, **[Install IntelliJ IDEA ](https://www.jetbrains.com/idea/)** and integrate the Dart plugin to IntelliJ IDEA IDE.



### Table of Contents
- [General Loop Structure](#general-loop-structure)
- [Loops in Dart](#loops-in-dart)
   - [For Loop](#for-loop)
   - [While Loop](#while-loop)
   - [Do-While Loop](#do-while-loop)
- [Other Key Concepts](#other-key-concepts)
   - [Break Keyword](#break-keyword) 
   - [Continue Keyword](#continue-keyword) 
- [Applications of Loops](#applications-of-loops)
- [Further Reading](#further-reading)
- [Conclusion ](#conclusion)

### General Loop Structure

There are two types of loops:
1. #### Definite Loops
These are loops that we know the number of times we want to execute the code.***for example***: The `For Loop`, later on through this article, we shall come to understand that the for loop has a definite number of iterations known to the programmer.

2. #### Indefinite Loops
These refer to loops we do not know the number of times we want to execute the code. ***for example***: The `While Loop` and The `Do-While Loop`, later on in the article we shall come to understand what it means by the iterations not known to the user.

The general loop structure refers to the fundamental components of loops in all languages and usage. All the loop types mentioned above have the following components:

- *Counter Variable* - We also known this as the initializer. It is the starting point of the loop. Where it execute. 

- *Condition Check* - This is the condition a loop has to start or execute and after its met the loop ends.

- *Increment or Decrement Counter Variable*  - This refers to the number in which a counter variable increases or decreases for each loop that the condition check is true or met. 


### Loops in Dart
We should note that the syntax of Dart Loops are like the ones in Java Programming Language.

There are three major loops in Dart:

1. #### For Loop

For Loop is an example of [Definite Loops](#definite-loops).

>Syntax of For Loop.

```Dart
void main(){

   for (initializer; condition; increment/decrement){
  
   //put your code here;

}

}

```

>How the For Loop works.

This is the flow of the For Loop: 

**Initialize - Condition Check - Code Execute - Increament**.

The counter variable initializes, then it checks the condition if it's true the code executes, then the counter variable increases depending on the value of increment. The increased counter variable initializes and it checks the condition again. If it's still true, the code executes and so on until the condition check is false or not met, then the loop terminates.


***Example:***

```Dart

void main(){
for(var i = 0; i<4; i++){
    print ("Hello");
 
 }

}

/** Output : Hello
             Hello
             Hello
             Hello **/

```
Here the value of the initializer of the counter variable will increase by one from 0 based on the increment specified. If the value of i becomes equal to four or more, the loop terminates/ends since the condition states that the value of i should be less than 4. The loop is to print hello if the the condition is true, hence the output is hello written four times (0,1,2,3) < 4. 


2. #### While Loop

While Loop is an example of [Indefinite Loops](#indefinite-loops).

>Syntax of While Loop
```Dart

void Main(){
   // initialize counter variable;

   while(condition){
      
      //code;
      
      increment/decrement;

   }

}

```

>How the While Loop works.

This is the flow of the While Loop: 

**Condition Check - Code Execute - Increment**.

In the While Loop, we initialization of the counter variable outside the syntax. The loop begins with the condition check, if it's true, the code executes. The value of the counter variable is then increments or decrements, and the new counter variable goes through the condition check. This will continue until the condition check is false.

***Example:***

```Dart

void main(){
  int i = 0;

   while(i<3){
      print("Hello");
      i++;
   }

}

/** Output : Hello
             Hello
             Hello **/

```
In the example above, our condition check begins with 0<3 which is true therefore the code executes and prints out the first hello. The value of i the increases by one to 1 and the condition 1<3 is still true, so the code executes. This goes on for one more loop (2<3) and ends when the condition is now (3<3) which is false. Hence three hellos get printed.

3. #### Do-While Loop

Do-While Loop is an example of [Indefinite Loops](#indefinite-loops).

>Syntax of Do-While Loop.

```Dart

void main(){
   initialize counter variable;
   do{
      //code;
      increment/decrement;
   }while(condition);

}

```

>How the Do-While Loop works.

This is the flow of the Do-While Loop: 

**Code Execution - Increment - Condition Check**.

In Do-While Loop the code executes then the counter variable initialized outside the syntax increments or decrements. Then the condition check, if it's true the loop begins from code execution. The code execution will continue until the condition check turns false.

***Example:***

```Dart

void main(){
   int i = 0;

   do{
      print ("Hello");
      i++;
  }while (i<5);

}

/** Output : Hello
             Hello
             Hello
             Hello
             Hello **/

```
The code first executes then the counter variable increments by one. It then checks the condition (1<5). This is true, so the loop will begin again. The code executes, then the counter variable increments by one. It then checks the condition (2<5). This is true, so the loop starts again. This will continue until the code executes and the new counter variable is 5 and the condition checked is (5<5) which is false, so the loop ends after printing 5 hellos.


### Other Key Concepts

- #### Break Keyword

We use the `Break Keyword` to 'forcefully' terminate a loop without changing the main loop statement. This comes in handy when you want a partial output and not to display all the elements.

***Example:***

```Dart
void main(){

for (int i = 1; i<=10; i++){
   print ("Hello");

   if(i >= 6){
      break;
   }

}
   
}

/** Output : Hello
             Hello
             Hello
             Hello
             Hello **/

```
This code will end the loop after printing five hellos because of the break statement.

- #### Continue Keyword

We use the `Continue Keyword` to skip code or a loop iteration after the continuation and proceed with the rest of the iteration.

***Example:***

```Dart
void main(){

for (int i = 1; i<=8; i++){
   print (i);

   if(i == 5){
      continue;
   }

}
   
}

/** Output : 1
             2
             3
             4
             6
             7
             8 **/

```
In the example, when i becomes 5, it skips the print statement and 5 does not print since the rest of the loop continues.


### Applications of Loops

Here are some positive and negative applications of loops:

1. #### Writing a Music Player Code.

We base a music player on a loop program the enables it to play from one song to the next systematically.

2. #### Cycling through values.
It is the use of loops to print out values in an extensive list. ***for example:*** Names of students in a school.

```Dart
void main(){
   List grade-one-students = ["John", "Mark", "Alex"];
   
   for(String student in grade-one-students){

      print(student);

   }
}

/** Output : John
             Mark
             Alex **/

```
The code loops over all the elements stored in the list and prints them out.


3. #### Used to create computer viruses.
Malicious programmers use loops to create [Computer Viruses](https://en.wikipedia.org/wiki/Computer_virus) by using the While loop and embedding it to software downloads. If we write a while loop without the increment or decrement counter variable, it creates a never- ending loop which leads to unnecessary storage consumption on devices. This courses the devices to crash or behave abnormally.

***Caution: DO NOT RUN THIS CODE!!!***
```Dart
void main(){

   int i = 0;

   while(i<3){
      print("Hello");
      
   }

   /** Output : Hello
             Hello
             Hello
             Hello
             Hello ...**/

}

```
The code will print out an endless string of the word Hello.



### Further Reading

To get a better grip into loops and iteration in Dart, look at these resources:
 - The [Dart's Official Documention](https://dart.dev/samples#control-flow-statements)

- You can have a look at this course from Udemy for [Dart Beginners Course](https://www.udemy.com/course/dart-beginners-course/?couponCode=7CA93B47A390A81961E3)

### Conclusion 

`Loops` and `Iteration` may seem complicated and a bit challenging to new developers while learning a new language. This article has made it easier to understand the loops and iteration in Dart Programming Language, and the knowledge gained is used and applied to other languages `Loop Control Statements`. Practice will definitely make the understanding of these control statements increase.

