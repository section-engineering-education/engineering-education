

# Building a Myers Briggs Personality Test App with Java

If you are trying to build a personality test app or a quiz app, this article is for you. In this article, you will learn about Java arrays, StringBuilder class, exception handling, and format specifiers in Java.

I came across the Myers Briggs personality test, and then I thought I could do something magical by building a personality test app with Java.


[TOC]



# How the Personality Test Works

According to **Isabel Briggs Myers**, there are sixteen types of personality identities, and there are four vital elements of categorizing people into the various sixteen personality identities. The four key elements are:



* **Introversion (I) or Extraversion (E)**
* **Sensing (S) or Intuition (N)**
* **Thinking (T) or Feeling (F)**
* **Judging (J) or Perceiving (P)**

You can find more information on the personality types [here](https://www.truity.com/page/16-personality-types-myers-briggs)


# The Four Key Elements 



1. **Extraversion – Introversion.** We test the source and direction of a person’s energy expression. Extravert energy is mainly in the external world, while introverts’ power is mostly from their inner world.
2. **Sensing – Intuition.** We test the method by which someone perceives information. Sensing means that a person mainly believes in the knowledge he receives directly from the external world. Intuition suggests that a person thinks about the information he receives from the inner or imaginative world.
3. **Thinking – Feeling.** We** **test how a person processes information. “Thinking” means that a person makes a decision mainly through logic. Feeling means that, as a rule, they decide based on emotion, i.e., based on what they think they should do.
4. **Judging – Perceiving.** We test how a person implements the information they have processed. Judging means that a person organizes all of his life events and sticks to his plans. Perceiving tests indicates that they are inclined to improvise and explore alternative options.


# Prerequisites



* Java JDK 8.0 and above
* A Java IDE


# Introduction to Java Arrays.


# What are Arrays?

Array in Java is a collection of elements of the same data type, either a primitive or reference type. Java can create one-dimensional arrays and multidimensional arrays. A single-dimensional array is diagrammatically represented like a list of elements of the same data type, usually defined with one square bracket. In contrast, a multidimensional array takes the form of a table with rows and columns. 


# Declaration of Arrays

We declare a single dimensional array like this;

```java

  int [ ] oneDarray; 

```

At this point, an array object is yet to be created. It is similar to declaring an integer like this;

```java 

int number;

```

We declare a two-dimensional array like this;

```java

int [ ][ ] twoDarray;

```

The square brackets show the dimensions; for instance, a three-dimensional array will have three square brackets. The int implies that the data type of each element is of type integer, and we give our array a variable name. The variable name is a  reference name that can be anything, although we are expected to adhere to java naming conventions. 

```java

int [ ] oneDarray, numbers[]; 

// is the same as 

int oneDarray [], numbers[][];

```


# How to Create Arrays

We create arrays with the new keyword or with array literals. The index of the array is fixed size. Each element has its respective default values. 


## Creating an Array With the New Keyword

We create an empty array like this;

```java

int[ ]  emptyArray = new int[0]; // this is an empty array

```

Below is an array of Integers. With four positions, default values are zeros.

```java

int [] arrayInt = new int [4] // array of integers; 

```

We set up an integer array that contains four positions. Next, we will see a loop that goes around each position and prints the value at each position:

```java

for (int i=0; i &lt; arrayInt.length; i++) { 

​ System.out.println(arrayInt[i]); 

}

```

Arrays of Objects With four indices, default values are null for all reference types.

```java

Object[] arrOfObjects = new Objects[4]; // array of Objects

```

```java

String [] arrayOfStrings= new int [4] // array of Strings; 

```


## Creating an array with Array Literals.  

```java

String [ ] subjects = {“English”,”Mathematics”}; 

```

Whenever we declare and initialize an array with array literals, we wouldn't need the new keyword except for a boolean data type. We declare and  initialize boolean values like this;

```java

boolean [ ] boolValues =  new boolean { true,false,true,false};//exception to array literal rule.

```

Change the value of a specific element by using the index of the array.

```java

String [] oneDstringValue ={“room”, ”door”}

oneDstringValue [1] = “stores”;

```

After the brief introduction to some basics of java array, let's dive into building our app.


# Building the Personality Test App


## Step One: Create a file with the name PersonalityTest.java

 In this file, define a class with the same name PersonalityTest like this;

```java

public class PersonalityTest {

```


## Step Two: Define the Main Method

```java

public static void main(String[] args) {

```


## Step Three: Numbering of Questions.

Declare and initialize an integer variable for numbering your questions. It is declared and assigned in the class and not the main method because it is a static variable. 

**```**java

static int questionNumber = 1;

```


## Step Four:  Create Array For Questions  Using Array Literals.

In our main method, let’s declare and initialize our array of questions with array literals.

For our app, we are storing Strings, so we store values in our array like this;

```java

String[] extroversionVsIntroversionTest = {

       "A. expend energy, enjoy groups. B. conserve energy, enjoy one-on-one",

       "A. more outgoing, think out loud. B. more reserved, think to yourself",

       "A. seek many tasks, public activities, interaction with others. " +

               "B. seek private, solitary activities with quiet to concentrate,"

       "A.external, communicative,  express yourself. B. internal, reticent, keep to yourself",

       "A. active, initiate. B. reflective, deliberate"};

String[] sensingVsIntuitionTest = {

       "A. interpret literally. B. look for meaning and possibilities",

       "A. practical, realistic, experiential. B. imaginative, innovative, theoretical",

       "A. standard, usual, conventional. B. different, novel, unique",

       "A. focus on here-and-now\" .B.look to the future, global perspective, \"big picture\"",

       "A. facts, things, \"what is\". B. ideas, dreams, \"what could be,\" philosophical"

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

       "A. regulated, structured B. easygoing, “live\" and “let live\"",

       "A. preparation, plan ahead. B. go with the flow, adapt as you go",

       "A. control, govern B. latitude, freedom"};

```


## Step Five: Create  Array for  Answers With The New Keyword:

We will be using them to collect answers in “1”s and “0”s. Remember that by default, int is equal to 0 in an array. So, Java now knows that we want an integer array with indices. Once Java has executed the lines, a default value is assigned to the arrays; because we have an integer array, all positions will have an identical default of 0 as their values.

```java

int[] extrovertVsIntrovertAnswersStorage = new int[5];

int[] sensingVsIntuitionsAnswersStorage = new int[5];

int[] thinkingVsFeelingAnswersStorage = new int[5];

int[] judgingVsPerceivingAnswersStorage = new int[5];

```


## Step Six: Create a StringBuilder Object

The StringBuilder class is used to create a mutable String. The code sample below creates an empty StringBuilder with a default capacity of 16. 

```java

StringBuilder result = new StringBuilder();

```


## Step Seven: Serve the Questions And Collect the Answers.

This method serves questions and gets back A’s or B’s from the console but saves them into our array as 0s and 1s.

```java

iterate(extroversionVsIntroversionTest,extrovertVsIntrovertAnswersStorage);

iterate(sensingVsIntuitionTest,sensingVsIntuitionsAnswersStorage);

iterate(thinkingVsFeelingTest,thinkingVsFeelingAnswersStorage);

iterate(judgingVsPerceivingTest,judgingVsPerceivingAnswersStorage);

```


## Step Six: Calculate Answers

Finds the sum of the ones and zeros in the user's collection of options.

```java

int sumOfAsInExtroversion = sum(extrovertVsIntrovertAnswersStorage);

int sumOfAsInSensing = sum(sensingVsIntuitionsAnswersStorage);

int sumOfAsInThinking = sum(thinkingVsFeelingAnswersStorage);

int sumOfAsInJudging = sum(judgingVsPerceivingAnswersStorage);

```


## Step Seven: Personality Typing

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


## Step Eight: Displays Personality types In A Table

```java

       // print personality results in a table.

   System.out.println("\nYour choice at a glance\n");

   System.out.printf("|%5s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s |%n", " ", "A", "B",

           " ", "A", "B", " ", "A", "B", " ", "A", "B");

   int numbering = 1;

   System.out.printf("%s%n", "-".repeat(74));

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

   System.out.printf("%s%n", "-".repeat(74));

   System.out.printf("|%5s | %3d | %3d | %3s | %3d | %3d | %3s | %3d | %3d | %3s | %3d | %3d |%n", "TOTAL",

           countNumbers(extrovertVsIntrovertAnswersStorage, 1), countNumbers(extrovertVsIntrovertAnswersStorage, 0),

           " ", countNumbers(sensingVsIntuitionsAnswersStorage, 1), countNumbers(sensingVsIntuitionsAnswersStorage, 0), " ",

           countNumbers(thinkingVsFeelingAnswersStorage, 1),

           countNumbers(thinkingVsFeelingAnswersStorage, 0), " ",

           countNumbers(judgingVsPerceivingAnswersStorage, 1), countNumbers(judgingVsPerceivingAnswersStorage, 0));

   System.out.printf("%s%n", "-".repeat(74));

   System.out.printf("|%5s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s | %3s |%n", " ", "E", "I",

           " ", "S", "N", " ", "T", "F", " ", "J", "P");

   System.out.println("Your personality type is " + result);

   System.out.print("For your personality interpretation, visit : ");

   System.out.println("https://www.truity.com/page/16-personality-types-myers-briggs");

}

```


# Explaining the Methods.

 This Method Handles Exceptions, Ignores Whitespaces, and Capitalization in our I/O Operations.

All the methods are static methods, so it is essential we declare them outside the main method and can call them within the main method.

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


## This Method Serves Questions and Gets Options.

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


## Method for Summing the Number of A’s and B’s 

```java

public static int sum(int[] intArrays){

   int sum = 0;

   for(int number : intArrays) sum += number;

    return sum;

}

```

The method is used as Format Specifiers. 

```java

public static String placeCheckmark(int num, int position){

        return (num == 1 && position == 1) || (num == 0 && position == 2) ? String.format("%c", '\u2713') : "";

    }

```


## Method for Counting  Number of Zeros And Ones In Our Array 

```java

public static int countNumbers(int[] numArray, int number){

   int count = 0;

   for(int num : numArray){

       if(num == number) count++;

   }

   return count;

}

```


# Conclusion 

In this article, we learned about working with arrays, format specifiers, methods, and exception handling. You can find the source code of this project [here](https://github.com/CaptainBKola/myJavaProjects/commit/989ab6f8527c0c8f5ac3f7b8bf13ff1253ed2eba). You can also click the fork button to create a copy that you can modify.

Happy coding!


## **Reference**

Michael B. White (**Mastering Java**)

[Dietel Dietel ](https://deitel.com/wp-content/uploads/2019/11/java-how-to-program-11-early-objects-table-of-contents.pdf )
[Google](google.com)
[Myers Briggs Personality Interpretation](https://www.truity.com/page/16-personality-types-myers-briggs)
