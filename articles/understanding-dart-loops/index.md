---
layout: engineering-education
status: publish
published: true
url: /engineering-education/understanding-loops-and-iteration-in-dart/
title: Understanding Loops and Iteration in Dart
description: In this article, the readers will understand about the different types of loops in Dart and how to use them.
author: diana-mutheu
date: 2020-12-22T00:00:00-18:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-loops-and-iteration-in-dart/hero.jpg
    alt: Understanding loops and iteration in Dart image
---
Dart is a programming language that is scalable and can write simple scripts or full-featured applications. It is an object-oriented and dynamic language. Dart was developed by Google. Like most programming languages, it contains loops and iterations.
<!--more-->
If one is familiar with [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) or [Kotlin](https://en.wikipedia.org/wiki/Kotlin_(programming_language)), then elements of Dart Language will be easier to understand.

### Introduction
A loop is defined as a segment of code that executes multiple times.

Iteration refers to the process in which the code segment is executed once. One iteration refers to 1-time execution of a loop. A loop can undergo many iterations. 

### Development environment
To write Dart programs, you can either use the [DartPad Online Editor](https://dartpad.dartlang.org/) or you can install the [Dart SDK](https://dart.dev/get-dart), install [IntelliJ IDEA](https://www.jetbrains.com/idea/), and integrate the Dart plugin to IntelliJ IDEA IDE.

### Table of contents
- [General loop structure](#general-loop-structure)
- [Loops in Dart](#loops-in-dart)
   - [For loop](#for-loop)
   - [While loop](#while-loop)
   - [Do-While loop](#do-while-loop)
- [Other key concepts](#other-key-concepts)
   - [Break keyword](#break-keyword) 
   - [Continue keyword](#continue-keyword) 
- [Applications of loops](#applications-of-loops)
- [Further reading](#further-reading)
- [Conclusion](#conclusion)

### General loop structure

There are two types of loops:
1. **Definite Loops**: These refer to loops where we know the number of times we want to execute the code.

2. **Indefinite Loops**: These refer to loops where we do not know the number of times we want to execute the code.

All the loop types mentioned above have the following characteristics:

- *Counter Variable* - Also known as the Initializer. It keeps track of the number of times a loop is executed.

- *Increment or Decrement Counter Variable*  - This refers to the number in which counter variable increases or decreases after each iteration.

- *Condition Check* - Every loop will have a condition that will be checked on each Iteration. If the condition is evaluated to true, then the next iteration will get executed.

Loops can be classified into two types based on condition checking:

  1. Entry controlled loops - These are loops in which the condition is checked first and then the iteration is executed.

  2. Exit controlled loops - These are loops in which an iteration is executed and then the condition is checked afterwards.

### Loops in Dart
The syntax of Dart loops is similar to the ones in Java Programming Language.

There are three loops in Dart:

#### For loop
**Syntax of For loop:**

```Dart
void main(){

   for (initialize counter variable; condition; increment/decrement){  
       //put your code here;
   }

}
```

**How the For loop works:**

**Initialize counter - Condition check - Execute code - Increment**.

1. The counter variable is initialized. The initialization occurs only once, it won't be executed on every iteration. 

2. Then the condition is checked. If the condition is evaluated as true, then the code block will be executed. If not, the code block will not be executed.

3. The counter variable will be incremented and the condition is evaluated again with the new value of the counter variable. This process repeats itself until the condition isn't met.

***Example:***

```Dart
void main(){
  for(var i = 0; i<4; i++){
     print ("Hello");
   }
}
```

Output : 

```bash
Hello
Hello
Hello
Hello
```

Here the value of the counter variable will increase by `1` for every iteration. If the value of `i` becomes equal to `4` or more, the loop will be terminated since the condition states that the value of `i` should be less than `4`. The code block prints `Hello`, hence the output is `Hello` written four times for (0,1,2,3) < 4.

#### While loop
**Syntax of a While loop:**
```Dart
void Main(){
   
   // initialize counter variable;
   while(condition){
      //code;
      //increment/decrement;
    }

}
```

**How the While loop works:**

**Initialize counter - Condition check - Execute code - Increment**.

1. We Initialize the counter variable outside the while block. 

2. It begins with the condition check, if it's true, then the code block will be executed. 

3. The value of the counter variable is incremented or decremented, and the new value of the counter variable goes through the condition check. 

4. This process will continue until the condition check is false.

> NOTE: We must always increment/decrement the counter variable inside the while block. Failure to do so will create a never-ending loop.

***Example:***

```Dart
void main(){
  int i = 0;
   while(i<3){
      print("Hello");
      i++;
   }
}
```

Output:

```bash
Hello
Hello
Hello
```

Our condition check will begin with the statement `0 < 3` which is true. Therefore the code executes and prints out the first hello. Then, the value of `i` increases by one to 1. 

Now, the condition `1 < 3` is still true, so the code executes. This goes on until the value of the counter variable is `3`. Once the condition is `3 < 3` which is false. The loop terminates and three `Hello`s get printed. 

#### Do-While Loop
**Syntax of Do-While Loop:**

```Dart
void main(){
   
   // initialize counter variable
   do {
      // code;
      // increment/decrement;
   } while(condition);

}
```

**How the Do-While loop works:**

**Initialize counter - Execute code - Increment - Condition check**.

1. The counter variable will be initialized outside the do-while block and the code block will be executed regardless of the condition for the first time.

2. Then, the condition will be checked. If it's evaluated to `true`, the loop will proceed to the next iteration.

3. The iterations will continue until the condition is evaluated as `false`. 

> Note: The code block in the `do-while` loop is executed at least once.

***Example:***

```Dart
void main(){
   int i = 0;
   do {
      print ("Hello");
      i++;
   } while (i<5);
}
```

Output:

```bash
Hello
Hello
Hello
Hello
Hello
```

The code is executed for the first time and then the counter variable is incremented by one. The loop then checks the condition `1 < 5`. Since this is `true`, the loop will proceed to the next iteration. 

In the next iteration, the counter variable is incremented by one. The loop then checks the condition `2 < 5`.  Since this is `true`, the loop will proceed to the next iteration. This will continue until the value of the counter variable is `5`. This time the condition check `5 < 5` will be evaluated as `false`, so the loop ends after printing 5 `Hello`s.

### Other key concepts
#### Break keyword

We use the `break` keyword to forcefully end a loop. It comes in handy when you want a partial output or to terminate the loop when a certain condition is met.

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
```

Output:

```bash
Hello
Hello
Hello
Hello
Hello
Hello
```

This code will terminate the loop after printing six `Hello`s because of the break statement.

#### Continue keyword
We use the `continue` keyword to skip some code and proceed to the next iteration.

***Example:***

```Dart
void main(){
 for (int i = 1; i<=8; i++){
    if(i == 5){
       continue;
    }
    print (i);
  }
}
```

Output:

```bash
1
2
3
4
6
7
8
```

In the example, when `i` becomes 5, the loop is forced to the next iteration, thus skipping the print statement.

### Applications of loops
Here are some positive and negative applications of loops:

- **Writing a Music Player**: A music player has a loop that enables it to play from one song to the next systematically.

- **Cycling through values**: Loops are used to print out values in an extensive list. For example, the names of students in a school.

```Dart
void main(){
   List grade_one_students = ["John", "Mark", "Alex"];
   for(String student in grade_one_students){
      print(student);
   }
}
```

Output:

```bash
John
Mark
Alex
```

It loops over all the elements stored in the list and prints them out.

- **Create computer viruses**: Malicious programmers use loops to create [computer viruses](https://en.wikipedia.org/wiki/Computer_virus) by using the While loop and embedding it to software downloads. If we write a while loop without the increment or decrement counter variable, it creates a never-ending loop which leads to unnecessary storage and memory consumption on devices. This causes the devices to crash or behave abnormally.

***Caution: DO NOT RUN THIS CODE!!!***

```Dart
void main(){
   int i = 0;
   while(i<3){
      print("Hello");
   }
}
```

The code will print out an endless string of the word `Hello`. Note that we are not incrementing the counter variable.

### Conclusion 
Loops and iteration may seem complicated and a bit challenging to new developers while learning a new language. The goal of this article was to make it easier to understand them in Dart programming language. Practice will increase your skill and understanding of these loops.

I've listed a couple extra links as further reading down below:

### Further reading
To get a better grip on the topic, take a look at these resources:

- [Dart's official documentation](https://dart.dev/samples#control-flow-statements)

- [Udemy course for Dart](https://www.udemy.com/course/dart-beginners-course/?couponCode=7CA93B47A390A81961E3)

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)


