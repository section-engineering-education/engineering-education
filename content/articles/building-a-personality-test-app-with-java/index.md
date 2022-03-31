---
layout: engineering-education
status: publish
published: true
url: /building-a-personality-test-app-with-java/
title: Building a Personality Test App with Java
description: The goal of this tutorial is to make convincing concepts clearer and understandable enough for beginners and show the implementation of the multi-dimensional array in java.
author: badmus-kola
date: 2021-09-20T00:00:00-16:35
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/building-a-personality-test-app-with-java/hero.jpeg
   alt: Personality test hero image
---
If you are trying to build a personality test app or a quiz app, this article is for you. This article will use the concept of Java arrays, StringBuilder class, exception handling, and format specifiers in Java to make a personality test app.
<!--more-->

### Table of contents
- [How the personality test works](#how-the-personality-test-works)
- [Prerequisites](#prerequisites)
- [Introduction to Java arrays](#introduction-to-java-arrays)
- [How to create arrays](#how-to-create-arrays)
- [Building the personality test app](#building-the-personality-test-app)
- [Explaining the methods](#explaining-the-methods)
- [Conclusion](#Conclusion)
- [Reference](#reference)

### How the personality test works
According to Isabel Briggs Myers, there are sixteen types of personality identities, and there are four vital elements of categorizing people into the various sixteen personality identities. 

The four key elements are:
1. Introversion (I) or Extroversion (E).
2. Sensing (S) or Intuition (N).
3. Thinking (T) or Feeling (F).
4. Judging (J) or Perceiving (P).

You can find detailed information about the various personality types [here](https://www.truity.com/page/16-personality-types-myers-briggs).

To learn more about the above key elements, kindly follow this [link](https://www.verywellmind.com/the-myers-briggs-type-indicator-2795583).

### Prerequisites
To follow along with this tutorial, you need to have:
- Java JDK 8.0 and above.
- A Java IDE.
- Test [Questions](https://pdfcoffee.com/the-myers-test-pdf-free.html) in a PDF format.

### Introduction to Java arrays
#### Definition of arrays
An array in Java is a set of elements of the same data type, either a primitive or reference type. Java can create one-dimensional arrays and multidimensional arrays. 

A single-dimensional array can be represented as a list of the same data type, usually defined in one square bracket. In contrast, a multidimensional array depicts the structure of a table with rows and columns.

#### Declaration of arrays
We declare a single-dimensional array like this:

```java
int [ ] oneDarray;
```

At this point, an array object is yet to be created. 

It is similar to declaring an integer like this:
```java
int number;
```

We declare a two-dimensional array like this:
```java
int [ ][ ] twoDarray;
```

The square brackets show the dimensions; for instance, a three-dimensional array will have three square brackets. The int implies that the data type of each element is of type integer, and we give our array a variable name. 

The variable name is a reference name that can be anything, although we are expected to adhere to Java naming conventions.

```java
int [ ] oneDarray, numbers[];
// is the same as
int oneDarray [], numbers[][];
```

### How to create arrays
We create arrays with the new keyword or with array literals. The index of the array is a fixed size. Each element has its respective default values.

#### Creating an array with the new keyword
We create an empty array like this:
```java
int[ ] emptyArray = new int[0]; // this is an empty array
```

Below is an array of integers. With four positions, default values are zeros.

```java
int [] arrayInt = new int [4] // array of integers;
```

We set up an integer array that contains four positions. 

Next, we will see a loop that goes around each position and prints the value at each position:

```java
for (int i=0; i &lt; arrayInt.length; i++) {
​ System.out.println(arrayInt[i]);
}
```

Arrays of objects with four indices, default values are null for all reference types.

```java
Object[] arrOfObjects = new Objects[4]; // array of Objects
```

```java
String [] arrayOfStrings= new int [4] // array of Strings;
```

#### Creating an array with array literals
```java
String [ ] subjects = {“English”,”Mathematics”};
```

Whenever we declare and initialize an array with array literals, we wouldn't need the new keyword except for a boolean data type. 

We declare and initialize boolean values like this:
```java
boolean [ ] boolValues = new boolean { true,false,true,false};//exception to array literal rule.
```

Change the value of a specific element by using the index of the array.

```java
String [] oneDstringValue ={“room”, ”door”}
oneDstringValue [1] = “stores”;
```

Now that we went over a brief introduction to some basics of Java array, let's dive into building our app.

### Building the personality test app
#### Step One: Create a file with the name PersonalityTest.java

In this file, define a class with the same name PersonalityTest like this:

```java
public class PersonalityTest {
```

#### Step Two: Define the main method
```java
public static void main(String[] args) {
```

#### Step Three: Numbering of questions
Declare and initialize an integer variable for numbering your questions. It is declared and assigned in the class and not the main method because it is a static variable.

```java
static int questionNumber = 1;
```

#### Step Four: Create array for questions using array literals
In our main method, let's declare and initialize our array of questions with array literals.

For our app, we will be storing strings, so we can store values in our array like this;

```java
String[] extroversionVsIntroversionTest = {
      "A. expend energy, enjoy groups. B. conserve energy, enjoy one-on-one",
      "A. more outgoing, think out loud. B. more reserved, think to yourself",
      "A. seek many tasks, public activities, interaction with others. "+
              "B. seek private, solitary activities with quiet to concentrate,"
      "A.external, communicative, express yourself. B. internal, reticent, keep to yourself",
      "A. active, initiate. B. reflective, deliberate"};

String[] sensingVsIntuitionTest = {
      "A. interpret literally. B. look for meaning and possibilities",
      "A. practical, realistic, experiential. B. imaginative, innovative, theoretical",
      "A. standard, usual, conventional. B. different, novel, unique",
      "A. focus on here-and-now\" .B.look to the future, global perspective, \"big picture\"",
      "A. facts, things, \ "what is\". B. ideas, dreams, \ "what could be,\" philosophical"
};

String[] thinkingVsFeelingTest = {
      "A. logical, thinking, questioning. B. empathetic, feeling, accommodating",
      "B. candid, straight forward, frank. B.tactful, kind, encouraging",
      "A. firm, tend to criticize, hold the line. B. gentle, tend to appreciate, conciliate",
      "A. tough-minded, just B.tender-hearted, merciful",
      "A. matter of fact, issue-oriented B. sensitive, people-oriented, compassionate",
};

String[] judgingVsPerceivingTest = {
      "A. organized, orderly. B. flexible, adaptable",
      "A. plan, schedule B. unplanned, spontaneous",
      "A. regulated, structured B. easygoing, "live\" and "let live\"",
      "A. preparation, plan ahead. B. go with the flow, adapt as you go",
      "A. control, govern B. latitude, freedom"};
```

#### Step Five: Create arrays for answers with the new keyword
We will be using them to collect users input in A's and B's and then save to our array in 0's and 1's. Remember that by default, int is equal to 0 in an array. 

Java now knows that we want an integer array with indices. Once Java has executed the lines, a default value is assigned to the arrays; because we have an integer array, all positions will have an identical default of 0 as their values.

```java
int[] extrovertVsIntrovertAnswersStorage = new int[5];
int[] sensingVsIntuitionsAnswersStorage = new int[5];
int[] thinkingVsFeelingAnswersStorage = new int[5];
int[] judgingVsPerceivingAnswersStorage = new int[5];
```

#### Step Six: Create a StringBuilder object
The StringBuilder class is used to create a mutable String. The code sample below creates an empty StringBuilder with a default capacity of 16. 

It must be noted that StringBuilder class is more efficient than implementing an empty string. Each time we add to an empty string we create an object which tend to be less efficient.

```java
StringBuilder result = new StringBuilder();
```

#### Step Seven: Serve the questions and collect the answers
This method serves questions and gets back A's or B's from the console but saves them into our array as 0s and 1s.

```java
iterate(extroversionVsIntroversionTest,extrovertVsIntrovertAnswersStorage);
iterate(sensingVsIntuitionTest,sensingVsIntuitionsAnswersStorage);
iterate(thinkingVsFeelingTest,thinkingVsFeelingAnswersStorage);
iterate(judgingVsPerceivingTest,judgingVsPerceivingAnswersStorage);
```

#### Step Eight: Calculate answers
Find the sum of numbers in the array.

```java
int sumOfAsInExtroversion = sum(extrovertVsIntrovertAnswersStorage);
int sumOfAsInSensing = sum(sensingVsIntuitionsAnswersStorage);
int sumOfAsInThinking = sum(thinkingVsFeelingAnswersStorage);
int sumOfAsInJudging = sum(judgingVsPerceivingAnswersStorage);
```

#### Step Nine: Personality typing
We call the append method in the String builder class and compare the result of the test.

```java
// appends personality type accordingly
if (sumOfAsInExtroversion &lt; 3) result.append("I");
else {
result.append("E");
}
if (sumOfAsInSensing &lt; 3) result.append("N");
else {
result.append("S");
}
if (sumOfAsInThinking &lt; 3) result.append("F");
else {
result.append("T");
}
if(sumOfAsInJudging &lt; 3) result.append("P");
else{
result.append("J");
}
```

#### Step Ten: Displays personality types in a table
Print personality results in a table.

```java
System.out.println("\nYour choice at a glance\n");
```

The code sample below displays the heading of our table.

```java
System.out.printf("|%5s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s |%n", " ", "A", "B"," ", "A", "B", " ", "A", "B", " ", "A", "B");
```

We set number of questions to 1 because we want to display all question numbers in our table.

```java
int numbering = 1;
```

The code sample below repeats '-' 74 times on a single line. We use this to demarcate our table sections.

```java
System.out.printf("%s%n", "-".repeat(74));
```

The code sample below displays number of questions in a table. It ranges from 1 to 20. We then use our method to mark our users options accordingly.

```java
for (int i = 0; i&lt; extrovertVsIntrovertAnswersStorage.length; i++) {
 System.out.printf("|%5d | %3s | %3s | %3d | %3s | %3s | %3d | %3s | %3s | %3d | %3s | %3s |%n", numbering++,
 placeCheckmark(extrovertVsIntrovertAnswersStorage[i],1),
 placeCheckmark(extrovertVsIntrovertAnswersStorage[i], 2),
 numbering++, placeCheckmark(sensingVsIntuitionsAnswersStorage[i], 1),
 placeCheckmark(sensingVsIntuitionsAnswersStorage[i], 2),
 numbering++,
 placeCheckmark(thinkingVsFeelingAnswersStorage[i], 1),
 placeCheckmark(thinkingVsFeelingAnswersStorage[i], 2), numbering++,
 placeCheckmark(judgingVsPerceivingAnswersStorage[i], 1),
 placeCheckmark(judgingVsPerceivingAnswersStorage[i], 2));
}
```

```java
System.out.printf("%s%n", "-".repeat(74));
```

The code sample below displays in a table, the number of time A and B exist in the array and also displays the personality type.

```java
System.out.printf("|%5s | %3d | %3d | %3s | %3d | %3d | %3s | %3d | %3d | %3s | %3d | %3d |%n", "TOTAL",countNumbers(extrovertVsIntrovertAnswersStorage, 1), countNumbers(extrovertVsIntrovertAnswersStorage, 0),
 " ", countNumbers(sensingVsIntuitionsAnswersStorage, 1), countNumbers(sensingVsIntuitionsAnswersStorage, 0), " ",
 countNumbers(thinkingVsFeelingAnswersStorage, 1),
 countNumbers(thinkingVsFeelingAnswersStorage, 0), " ",
 countNumbers(judgingVsPerceivingAnswersStorage, 1), countNumbers(judgingVsPerceivingAnswersStorage, 0));System.out.printf("%s%n", "-".repeat(74)); System.out.printf("|%5s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s |%n", " ", "E", "I"," ", "S", "N", " ", "T", "F", " ", "J", "P");
System.out.println("Your personality type is " + result);
```

The code sample below displays the website link for information about user's personality identity.

```java
System.out.print("For your personality interpretation, visit : ");
System.out.println("https://www.truity.com/page/16-personality-types-myers-briggs");
}
```

### Explaining the methods
This method handles exceptions, and ignores whitespaces, and capitalization in our I/O operations.

All the methods are static, so we must declare them outside the main method and call them within it.

```java
public static String getOption(Scanner input){
String option;
while (true){
      try {
          option = input.nextLine();
          if(option.trim().equalsIgnoreCase("A".trim()) || option.trim().equalsIgnoreCase("B".trim())){
              return option;
          }else {
              throw new IllegalArgumentException("Wrong choice; choose A or B");
          }
      }catch (IllegalArgumentException ex){
         System.err.println(ex.getMessage());
   }
}
}
```

#### Method for serving questions and getting options
This method takes two arrays. The first array contains the list of questions, while the second array contains 0s by default. We aim to collect an option from the user. 

If the option is an A, it saves it into our collection as 1. Alternatively, if the choice is a B, it retains the default value (the default values in the list of answers are zeros).

```java
public static void iterate(String[] questions, int[] answers) {
Scanner scanner = new Scanner(System.in);
   String optionAorB;
   for (int number = 0; number &lt; questions.length; number++) {
      System.out.printf("Question %d%n", questionNumber++);
      System.out.println(questions[number]);
System.out.println("Pick an option: A or B");
      optionAorB = getOption(scanner);
      if ((optionAorB.equalsIgnoreCase("A"))){
          answers[number] = 1;
      }
}
}
```

#### Method for summing the number of A's and B's
This method takes an array of numbers and return the sum of numbers in it. Therefore, we use it to count the number of A's and B's in our answers at all level. 

This enables us to set a personality type with if statement. Remember that an A is denoted as 1, and a B is denoted as zero.

```java
public static int sum(int[] intArrays){
int sum = 0;
for(int number : intArrays) sum += number;
   return sum;
}
```

#### Format specifiers method
This method is used to place tick marks on every option picked. We only used it in our table.

```java
public static String placeCheckmark(int num, int position){
       return (num == 1 && position == 1) || (num == 0 && position == 2) ? String.format("%c", '\u2713') : "";
   }
```

#### Method for counting number of zeros and ones in our array
This method takes an array and a number. It finds the number of times the number exists in the array.

```java
public static int countNumbers(int[] numArray, int number){
int count = 0;
for(int num : numArray){
      if(num == number) count++;
}
return count;
}
```

### Conclusion
In this article, we learned about working with arrays, format specifiers, methods, and exception handling. You can find the source code of this project [here](https://github.com/CaptainBKola/myJavaProjects/commit/989ab6f8527c0c8f5ac3f7b8bf13ff1253ed2eba).

Happy coding!

### Reference
- [An Overview of the Myers-Briggs Type Indicator](https://www.verywellmind.com/the-myers-briggs-type-indicator-2795583)
- [Myers & Briggs' 16 Personality Types](https://www.truity.com/page/16-personality-types-myers-briggs)

---

Peer Review Contributions by: [Ruth Mare](/engineering-education/authors/ruth-mare/)
