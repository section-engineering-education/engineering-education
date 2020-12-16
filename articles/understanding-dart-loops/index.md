### Introduction
Dart is a programming language that is scalable and can be used to write simple scripts or full-featured applications. It is object-oriented and dynamic.
Dart was developed by Google. Like most programming languages, it contains loops and iterations. If you are familiar with [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) or [Kotlin](https://en.wikipedia.org/wiki/Kotlin_(programming_language)), then elements of Dart Language will be easier to understand.

A Loop is defined as a segment of code which is executed multiple times.

Iteration refers to the process in which the code segment is executed once. One iteration refers to 1-time execution of a loop. The loop can undergo many iterations. 

### Development Environment
To write Dart programs:

- You can use the **[DartPad Online Editor](https://dartpad.dartlang.org/)** OR

- You can use this method if you are familiar with [`Java`](https://en.wikipedia.org/wiki/Java_(programming_language)) or [`Kotlin`](https://en.wikipedia.org/wiki/Kotlin_(programming_language)). **[Install Dart SDK ](https://dart.dev/get-dart)**, **[Install IntelliJ IDEA ](https://www.jetbrains.com/idea/)** and integrate the Dart plugin to IntelliJ IDEA IDE.

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
- [Conclusion](#conclusion)

### General Loop Structure
There are two types of loops:

1. **Definite Loops**
These refer to loops where we know the number of times that we want to execute the code. For example, The `For Loop`.

2. **Indefinite Loops**
These refer to loops where we do not know the number of times that we want to execute the code. For example, the `While Loop` and the `Do-While Loop`.

The loop mentioned above have the following characteristics:

- *Counter Variable* - It is also known as the Initializer. It keeps track of the number of times a loop is executed.

- *Increment or Decrement Counter Variable*  - This refers to the number in which the counter variable increases or decreases for each iteration.

- *Condition Check* - Every loop will have a condition that will be checked on each iteration. If the condition is evaluated to true, the next iteration will get executed.

Loops can be classified into two types based on condition checking:

  1. Entry controlled loops - These are loops in which the condition is checked first and then the Iteration is executed.

  2. Exit controlled loops - These are loops in which an iteration is executed and then the condition is checked afterward.

### Loops in Dart
We should note that the syntax of Dart Loops is like the ones in Java Programming Language.

There are three loops in Dart:

#### For Loop

For Loop is an example of a [Definite Loop](#definite-loops).

**Syntax of For Loop:**

```Dart
for (initializer; condition; increment/decrement){  
   //put your code here;
}
```

**How the For Loop works:**

**Initialize - Condition Check - Code Execute - Increment**.

1. The counter variable is initialized. The initialization occurs only once, it won't be executed on every iteration. 

2. Then the condition is checked. If the condition is evaluated as true, then the code executes. If not, the code will not be executed.

3. The condition is evaluated again with the new value of the counter variable. This process repeats itself until the condition isn't met.

***Example:***

```Dart
void main(){
  for(var i = 0; i < 4; i++){
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

Here the value of the counter variable will increase by one from 0 based on the increment specified for every iteration. If the value of i becomes equal to four or more, the loop is terminated since the condition states that the value of i should be less than 4. The code block prints Hello, hence the output is Hello written four times for (0,1,2,3) < 4.

#### While Loop

**Syntax of While Loop.**
```Dart
void Main(){
   // initialize counter variable;
   
   while(condition){
   
      //code;
      
<<<<<<< HEAD
      //increment/decrement;

=======
      increment/decrement;
>>>>>>> bb48334e034eed75c3a77d4f725b3183d75e3120
    }
}
```

**How the While Loop works:**

**Condition Check - Code Execute - Increment**.

1. We Initialize the counter variable outside the while block. 

2. It begins with the condition check, if it's true, the code executes. 

3. The value of the counter variable then increments or decrements, and the new counter variable goes through the condition check. 

4. It will continue until the condition check is false.

> NOTE: 
> We must always have the increment or decrement part of the While Loop, failure to which will create a never-ending loop.

***Example:***

```Dart
void main(){
  int i = 0;
<<<<<<< HEAD

   while(i<3){
      
=======
   while(i < 3){
>>>>>>> bb48334e034eed75c3a77d4f725b3183d75e3120
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
<<<<<<< HEAD
Our condition check begins with 0<3 which is true therefore the code executes and prints out the first hello. The value of i the increases by one to 1 and the condition 1<3 is still true, so the code executes. The new variable becomes (2<3) and ends when the condition is (3<3) which is false. Hence three hellos get printed. 
=======

Our condition check begins with 0<3 which is true therefore the code executes and prints out the first hello. The value of i increases by one to 1 and the condition 1<3 is still true, so the code executes. It goes, the new variable becomes (2<3) and ends when the condition is now (3<3) which is false. Hence three hellos get printed. 
>>>>>>> bb48334e034eed75c3a77d4f725b3183d75e3120

#### Do-While Loop

The do-While loop is an example of [Indefinite Loops](#indefinite-loops).

**Syntax of Do-While Loop:**

```Dart
void main(){
   // initialize counter variable

   do {
      //code;
     
<<<<<<< HEAD
      //increment/decrement;
  
=======
      increment/decrement;
>>>>>>> bb48334e034eed75c3a77d4f725b3183d75e3120
   } while(condition);
}
```

**How the Do-While Loop works:**

**Code Execution - Increment - Condition Check**.

1. Code executes then the counter variable initialized outside the syntax increments or decrements. 

2. The condition check - The condition is checked. if it's met, the code block is executed again,

3. The code execution will continue until the condition check turns false. 

> Note that the code block in the Do-While loop executes at least once.

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

The code first executes then the counter variable increments by one. It then checks the condition (1<5). It is true, so the loop will begin again. The code executes, then the counter variable increments by one. It then checks the condition (2<5). It meets the condition. This will continue until the value of the counter variable is 5. This time the condition check (5<5) will be evaluated as false, so the loop ends after printing 5 hellos.

### Other Key Concepts
#### Break Keyword

<<<<<<< HEAD
We use the `break` keyword to 'forcefully' end a loop without changing the main loop statement. It comes in handy when you want a partial output and not to display all the elements.
=======
We use the `Break Keyword` to forcefully end a loop. It comes in handy when you want a partial output on a certain condtion and not to run all iterations.
>>>>>>> bb48334e034eed75c3a77d4f725b3183d75e3120

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
This code will end the loop after printing six hellos because of the break statement.

#### Continue Keyword

We use the `continue` keyword to skip code or a loop iteration after the continuation and proceed with the rest of the iteration.

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
In the example, when i becomes 5, it skips the print statement, the rest of the loop continues.

### Applications of Loops
Here are some positive and negative applications of loops:

1. **Writing a Music Player Code**: A music player has a loop that enables it to play from one song to the next systematically.

2. **Cycling through values**: It is the use of loops to print out values in an extensive list. ***For example***, Names of students in a school.

```Dart
void main(){
   
   List grade_one_students = ["John", "Mark", "Alex"];
   
   for(String student in grade-one-students){

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

3. **Create computer viruses**: Malicious programmers use loops to create [Computer Viruses](https://en.wikipedia.org/wiki/Computer_virus) by using the While loop and embedding it to software downloads. If we write a while loop without the increment or decrement counter variable, it creates a never-ending loop which leads to unnecessary storage and memory consumption on devices. This courses the devices to crash or behave abnormally.

***Caution: DO NOT RUN THIS CODE!!!***

```Dart
void main(){

   int i = 0;

   while(i<3){
     
      print("Hello");
      
   }

}
```

<<<<<<< HEAD
The code will print out an endless string of the word Hello.
=======
Output :

``` 
   Hello
   Hello
```

The code will print out an endless string of the word "Hello".
>>>>>>> bb48334e034eed75c3a77d4f725b3183d75e3120

### Further Reading
To get a better grip on the topic, look at these resources:

 - The [Dart's Official document](https://dart.dev/samples#control-flow-statements)

 - You can have a look at this course from Udemy for [Dart Beginners Course](https://www.udemy.com/course/dart-beginners-course/?couponCode=7CA93B47A390A81961E3)

### Conclusion 
Loops and Iteration may seem complicated and a bit challenging to new developers while learning a new language. This article has made it easier to understand them in Dart Programming Language, and the knowledge gained used and applied to other languages Loop Control Statements. Practice will make the understanding of these control statements increase.
