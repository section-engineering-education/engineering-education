---
layout: engineering-education
status: publish
published: true
url: /automatic-type-promotion/
title: Automatic Type Promotion
description: This article will cover a brief introduction to auto type promotion and method overloading and their relationships, reasons or circumstances under which you may be required to apply automatic type promotion and the different types or ways of implementing it. 
author: mackrine-awino
date: 2021-12-13T00:00:00-12:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/automatic-type-promotion/hero.jpg
    alt: Automatic type promotion Hero Image
---
Type promotion is a common occurrence in Java programming, which can be achieved automatically with primitive data types through the use of autotype promotion. It is also referred to as automatic data type promotion.
<!--more-->
Sometimes automatic type casting is confused with typecasting, which should not be the case as casting is achieved manually by a programmer during system coding. You should also understand that datatypes once promoted cannot be "depromoted".

Overloading is a concept in Java where different methods can have a common name. The methods, however, differ by the parameters that they take in or even their input data types.

Automatic type casting mainly occurs in method overloading; hence, it is incumbent that we understand both concepts clearly before we begin.

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Primitive data types and the acceptable promotions](#primitive-data-types-and-the-acceptable-promotions)
3. [Rules for Automatic Type promotion](#rules-for-automatic-type-promotion)
4. [Automatic Type promotion with method overloading](#automatic-type-promotion-with-method-overloading)
5. [Problems that may arise due to automatic type promotion](#problems-that-may-arise-due-to-automatic-type-promotion)
6. [Conclusion](#conclusion)

### Prerequisites
For a reader to understand this article, they should have:
- A basic understanding of Java programing language.

### Primitive data types and the acceptable promotions
- byte
- char
- short
- int
- long
- float
- double

Below is a diagrammatic illustration of possible type promotions:

![type promotions](/engineering-education/automatic-type-promotion/INT.png)

The Java code fragment below shows the variable declaration and instantiation of 2 variables, `num1` and `num2`, each byte. It then declares a variable `mult1` of type int and is expected to store the products of `num1` and `num2`.

``` java
byte num1 = 200;
byte num2 = 50;
int mult1 = num1*num2;
```

When the multiplication is done, the product cannot be contained in a `byte` location; hence the byte is promoted to int automatically using automatic type promotion, which allows the storage of the product in `int`.

### Rules for automatic type promotion
The following rules for type promotion must be followed when executing expressions in Java to achieve correct results:
- All variables of the types `byte`, `short`, and `char` must be auto type promoted to `int`.
- If any variable taking part in an operation is `long`, the operation result must be `long`.
- If any variable taking part in an operation is `float`, the operation result must `float`. 

The example below illustrates this:

```java
public class AutoTypePromotion {
 public static void main(String[] args) {
  short num1 = 6;
  int num2 = 100;
  float num3 = 7.67f;
  float result2 = (num2-num1) * num3;
  System.out.println("The output is: " + result2);
 }
}
``` 

The output is `720.98f`, a floating-point value, confirming the rule in question.

- If any variable taking part in an operation is `double`, the operation result must be `double`. 

An example is shown below illustrating this rule:

```java
public class AutoTypePromotion {
 public static void main(String[] args) {
  int num1 = 100;
  double num2 = 0.25;
  double result1 = num1/num2;
  System.out.println("The output: " + result1);
 }
}
```

The output of 25.0 is a double because the result of the expression automatically becomes a double, as stated by the above rule.

### Automatic type promotion with method overloading

```java
package example; 
class AutoTypepromotion  
{  
    void average(int x, long y)  
    {  
        System.out.println((x+y)/2);  
    }  
    void average(int x, int y, int z)  
    {  
        System.out.println((x+y+z)3);  
    }  
    public static void main(String[] args)  
    {  
        AutoTypepromotion s = new AutoTypepromotion();  
        s.average(20, 24);  
        s.average(16, 2, 9);  
    }  
}  
```

The code above fragment implements a method overloading by having two functions, each called average, with different parameters. Automatic type promotion is done, making the results `long` because one of the operands in operation was `long`.

### Problems that may arise due to automatic type promotion
As valuable as automatic type promotion is in Java, it may sometimes result in compilation confusions like the one shown in the illustratory diagram below:

![problem](/engineering-education/automatic-type-promotion/int2.png)

This error is caused by automatically promoting the type `byte` to the entire execution time. Therefore, typecasting needs to be performed explicitly if it has to be a byte.

Below is a full Java program illustrating Automatic type promotion:

```java
package com.dataflair.typeconversion;
public class AutomaticTypePromotion
{
    public static void main(String[] args) {
        
        float num4flt;
        int num1integer;
        short num2shrt;
        byte num3byt;
        double num5dble;
        long num6lng;

        // Above are variable declarations-datatypes are also indicated

        num3byt = 27;
        num2shrt = num3byt;
        num1integer = num2shrt;
        num6lng = num1integer;
        num4flt = num6lng;
        num5dble = num4flt;

    // Print statements for outputs

        System.out.println("Byte value "+ num3byt);
        System.out.println("Short value "+num2shrt);
        System.out.println("Integer value"+num1integer);
        System.out.println("Long value "+num6lng);
        System.out.println("Float value "+num4flt);
        System.out.println("Long value "+num5dble);

        //This illustrates automatic type promotion
    }
}
```

Output:

![output](/engineering-education/automatic-type-promotion/ou.png)

### Conclusion
Despite the benefits of automatic type promotion, some requirements do not support it. For example, it only supports [typecasting](https://www.javatpoint.com/type-casting-in-java) or widening.

This means [narrowing](https://www.tutorialspoint.com/narrowing-conversion-in-java#:~:text=Narrowing%20conversion%20is%20needed%20when,to%20integer%20using%20Narrowing%20Conversion.) is uncatered for; hence narrowing has to be done manually by the programmer, which raises the need to learn manual types of casting.

Happy coding!

---

Peer Review Contributions by: [Briana Nzivu](/engineering-education/authors/briana-nzivu/)
