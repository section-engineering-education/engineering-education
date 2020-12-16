### Introduction
Dart is a programming language that is scalable and can be used to write simple scripts or full-featured applications. It is an object-oriented, dynamic language developed by Google. Like most programming languages, it contains loops and iterations. If one is familiar with [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) or [Kotlin](https://en.wikipedia.org/wiki/Kotlin_(programming_language)), then elements of Dart Language will be easier to understand.

A Loop is defined as a segment of code that executes multiple times.

Iteration refers to the process in which the code segment is executed once. One iteration refers to 1-time execution of a loop. The loop can undergo many iterations. 

### Development Environment
To write Dart programs:

- You can use the **[DartPad Online Editor](https://dartpad.dartlang.org/)** OR

- You can use this method if you are familiar with [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) or [Kotlin](https://en.wikipedia.org/wiki/Kotlin_(programming_language)) , **[Install Dart SDK](https://dart.dev/get-dart)**, **[Install IntelliJ IDEA](https://www.jetbrains.com/idea/)** and integrate the Dart plugin to IntelliJ IDEA IDE.

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

1. **Definite Loops**
These refer to loops where we know the number of times we want to execute the code.For example, the `for` Loop.

2. **Indefinite Loops**
These refer to loops where we do not know the number of times we want to execute the code. For example, the `while` loop and the `do-while` loop.

All the loop types mentioned above have the following characteristics:

- *Counter Variable* - It is also known as the Initializer. It keeps track of the number of times a loop is executed.

- *Increment or Decrement Counter Variable*  - This refers to the number in which counter variable increases or decreases it meets the condition.

- *Condition Check* - Every loop will have a condition which will be checked on each Iteration. If the condition is evaluated to true, then the next iteration will get executed.

Loops can be classified into two types based on condition checking:

  1. Entry controlled loops - These are loops in which the condition is checked first and then the iteration is executed.

  2. Exit controlled loops - These are loops in which an iteration is executed and then the condition is checked afterward.

### Loops in Dart
We should note that the syntax of Dart loops is similar to the ones in Java Programming Language.

There are three loops in Dart:

#### For Loop
For Loop is an example of a definite loop.

**Syntax of For Loop:**

```Dart
void main(){

   for (initializer; condition; increment/decrement){
  
       //put your code here;

    }

}
```

**How the For Loop works:**

**Initialize - Condition Check - Code Execute - Increment**.

1. The counter variable is initialized. The initialization occurs only once, it won't be executed on every iteration. 

2. Then the condition is checked. If the condition is evaluated as true, then the code executes. If not, the code will not be executed.

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

```
Hello
Hello
Hello
Hello
```

Here the value of the counter variable will increase by 1. If the value of `i` becomes equal to `4` or more, the loop will be terminated since the condition states that the value of `i` should be less than `4`. The code block prints `Hello`, hence the output is `Hello` written four times for (0,1,2,3) < 4.

#### While Loop

**Syntax of While Loop:**
```Dart
void Main(){
   
   // initialize counter variable;

   while(condition){
      
      //code;
      
      //increment/decrement;

    }

}
```

**How the While Loop works:**

**Condition Check - Code Execute - Increment**.

1. We Initialize the counter variable outside the while block. 

2. It begins with the condition check, if it's true, then the code executes. 

3. The value of the counter variable then increments or decrements, and the new value of the counter variable goes through the condition check. 

4. It will continue until the condition check is false.

> NOTE: We must always have the increment/decrement part of the While Loop, failure to do so will create a never-ending loop.

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

```
Hello
Hello
Hello
```

Our condition check begins with `0 < 3` which is true. Therefore the code executes and prints out the first hello. Then, the value of `i` increases by one to 1. Now, the condition `1 < 3` is still true, so the code executes. This goes on until the the value of the counter variable will be `3`. Now, the condition is `3 < 3` which is false. Hence, the loop terminates and three `Hello`s get printed. 

#### Do-While Loop

Do-While loop is an example of an indefinite Loop.

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

**How the Do-While Loop works:**

**Code Execution - Increment - Condition Check**.

1. The counter variable will be initilized and the code block will be executed once regardless of the condition for the first time.

2. Then, the condition will be checked. If it's evaluvated to `true`, the loop will proceed to the next iteration.

3. The iterations will continue until the condition is evaluvated as `false`. 

> Note that the code block in `do-while` loop executes at least once.

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

```
Hello
Hello
Hello
Hello
Hello
```

The code is executed for the first time and then the counter variable is incremented by one. The loop then checks the condition `1 < 5`. Since this is `true`, the loop will proceed to the next iteration. In the next iteration, the counter variable is incremented by one. The loop then checks the condition `2 < 5`.  Since this is `true`, the loop will proceed to the next iteration. This will continue until the value of the counter variable is `5`. This time the condition check `5 < 5` will be evaluated as `false`, so the loop ends after printing 5 `Hello`s.

### Other Key Concepts
#### Break Keyword

We use the `break` keyword to forcefully end a loop without changing the main loop statement. It comes in handy when you want a partial output or want to terminate the loop when a certain condtion is met.

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

```
Hello
Hello
Hello
Hello
Hello
Hello
```

This code will terminate the loop after printing six `Hello`s because of the break statement.

#### Continue Keyword

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

```
1
2
3
4
6
7
8
```

In the example, when `i` becomes 5, the loop is forced to the next iteration, thus skipping the print statement.

### Applications of Loops
Here are some positive and negative applications of loops:

1. Writing a Music Player.

A music player has a loop that enables it to play from one song to the next systematically.

2. Cycling through values.
It is the use of loops to print out values in an extensive list. ***For example***, Names of students in a school.

```Dart
void main(){
   List grade_one_students = ["John", "Mark", "Alex"];
   for(String student in grade_one_students){
      print(student);
   }
}
```
Output:

```
John
Mark
Alex
```

It loops over all the elements stored in the list and prints them out.

3. Create computer viruses.

Malicious programmers use loops to create [Computer Viruses](https://en.wikipedia.org/wiki/Computer_virus) by using the While loop and embedding it to software downloads. If we write a while loop without the increment or decrement counter variable, it creates a never-ending loop which leads to unnecessary storage and memory consumption on devices. This courses the devices to crash or behave abnormally.

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

### Further Reading
To get a better grip into the topic, look at these resources:

 - The [Dart's Official document](https://dart.dev/samples#control-flow-statements)

 - You can have a look at this course from Udemy for [Dart Beginners Course](https://www.udemy.com/course/dart-beginners-course/?couponCode=7CA93B47A390A81961E3)

### Conclusion 
Loops and Iteration may seem complicated and a bit challenging to new developers while learning a new language. This article has made it easier to understand them in Dart Programming Language, and the knowledge gained used and applied to other languages Loop Control Statements. Practice will make the understanding of these control statements increase.

