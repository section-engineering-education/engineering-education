---
layout: engineering-education
status: publish
published: true
url: /bigdecimal-and-primitive-data-type-arithmetic-program-in-java/
title: BigDecimal and Primitive Data Type Arithmetic Program in Java
description: This articles introduces the reader to the basic arithmetic operations that can be performed on BigDecimal as well as between BigDecimal and primitive data types.
author: bonface-ndolo
date: 2021-09-22T00:00:00-03:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/bigdecimal-and-primitive-data-type-arithmetic-program-in-java/hero.jpg
    alt: BigDecimal and Primitive Data Type Arithmetic Program in Java Hero Image
---

Because of their inaccuracy, floating-point data types cannot be used in financial calculations. This is why Java provides a separate class named BigDecimal for executing operations. And, reducing the chances of calculation errors. 
<!--more-->
On double numbers, the BigDecimal class provides arithmetic, scale management, rounding, comparison, format conversion, and hashing functions. It compensates for the time complexity, however, by handling large and small floating-point integers with exceptional precision.

These basic arithmetic operations can be performed on BigDecimal and between BigDecimal and primitive data types. This is what our article will cover. While both `BigInteger` and `BigDecimal` support arbitrary-precision integers, BigDecimal only supports arbitrary-precision fixed-point numbers. 

BigDecimal/BigInteger is not advisable if you're constructing a low-latency application where every microsecond counts. Let us look at our first example of Adding, subtracting, and multiplying two large decimal integers with a Java program:

```Java
import java.io.*;
import java.math.BigDecimal;
class Example {
    public static void main(String[] args)
    {

        // Declaration of the bigdecimal numbers
        BigDecimal first1 = new BigDecimal("25.35557");
        BigDecimal sec2 = new BigDecimal("55.3767");
         //actual arithmetic addition operation
        System.out.println("Adding first1 and sec2 = "
                           + (first1.add(sec2)));

        // actual arithmetic subtraction operation
        System.out.println("Subtracting first1 and sec2 = "
                           + (first1.subtract(sec2)));

        // actual arithmetic multiplication operation
        System.out.println(
            "Multiplying first1 and sec2 = "
            + (first1.multiply(sec2)));
    }
}
```

Output:

```
Adding first1 and sec2 = 80.73227
Subtracting first1 and sec2 = -30.02113
Multiplying first1 and sec2 = 1404.107793
```

We have done three operations on our two declared BigDecimals. For example the subtraction, addition, and the addition operations. There is now a point to note here, we did not perform the division operation because of one reason that I will be giving.

Because the division of the two numbers is non-terminating, there is an error that will occur. And, we know that BigDecimal was established to provide the highest level of precision. As a result, it generates an error. 

We'll fix it in the following code, where we'll divide the same integers, but this time the data type will be double. Thus, there should be no errors and some responses.


Let us have the second example below:

```Java
import java.io.*;
class Example {
    public static void main(String[] args)
    {
        double first1 = 25.35557;
        double sec2 = 55.3767;
        System.out.println("Dividing first1 and sec2 = "
                           + (sec2 / first1));
    }
}
```

Output:

```
Dividing first1 and sec2 = 0.45787434
```

### Primitive data types
We have done several operations on our BigDecimal objects. Now, we'll attempt to do the same with primitive data types.

Let us now look at our third example:

```Java
import java.io.*;
import java.math.BigDecimal;
class Example {
    public static void main(String[] args)
    {

        // Declaring an integer number and BigDecimal object
        BigDecimal first1 = new BigDecimal("15");
        int sec2 = 20;
         // Adding both of them
        System.out.println("Adding first1 and sec2 ="
                           + first1.add(sec2));
    }
}
```

> Upon running the code above, there will be an error that will happen to state that `int` cannot be converted to `BigDecimal`.

The error that occurs happens since the operation can only be performed on BigDecimal objects, and this is the case. Our primitive data type must be converted into a BigDecimal object using the BigDecimal class's constructor. 

We are constructing a new object of class BigDecimal with the same value as `sec2` and providing it directly to the `add()` method as an argument. The code below resolves the problem in the following way:

```Java
import java.io.*;
import java.math.BigDecimal;
class Example {
    public static void main(String[] args)
    {

        // Declaring a BigDecimal object and integer number
        BigDecimal first1 = new BigDecimal("15");
        int sec2 = 20;
        System.out.println(
            "Adding first1 and sec2 = "
            + first1.add(new BigDecimal(sec2)));
    }
}
```

Output:

```
Adding first1 and sec2 = 35
```

Lastly, look at the following example showing the arithmetic operations between `BigDecimal` and `int` to understand it better:

```Java
import java.io.*;
import java.math.BigDecimal;
class Example {
    public static void main(String[] args)
    {

        // Declaring an integer number and a BigDecimal object
        BigDecimal first1 = new BigDecimal("15");
        int sec2 = 20;
        System.out.println(
            "Adding first1 and sec2 = "
            + first1.add(new BigDecimal(sec2)));

        System.out.println(
            "Subtracting first1 and sec2 = "
            + first1.subtract(new BigDecimal(sec2)));

        System.out.println(
            "Multiplying first1 and sec2 = "
            + first1.multiply(new BigDecimal(sec2)));

        System.out.println(
            "Dividing first1 and sec2 = "
            + first1.divide(new BigDecimal(sec2)));
    }
}
```

Output:

```
Adding first1 and sec2 = 35
Subtracting first1 and sec2 = -5
Multiplying first1 and sec2 = 300
Dividing first1 and sec2 = 0.75
```

> No null values are allowed in a database, application, or view and everything is initialized with new BigDecimal(0). Or,  you execute null checks on every use of nullable values.

### Need for BigDecimal
There is a lot of fun to be had with floating-point numbers. A double type is commonly used for quantities unless the value is an integer, in which case an int type is usually acceptable. 

Also, a float or a long can be used, depending on the size of a value's value type. It should be noted that these kinds are the very worst thing you can use when dealing with money. They do not provide the correct value, but rather one that can be stored in a binary format. 

### About primitive data types
They are the simplest types. It is possible to design your complicated kinds by using primitive types as a starting point for development. 

Primitive types are easier to use in applications since they boost the performance by a large amount. Object-based implementation of primitive types would result in a considerable performance.

As a result of their name, they can relate to a wide range of objects. The non-primitive data types in Java, but, are built by programmers. 

For the same reason, primitive types are more efficient when compared with instances of wrapper classes.

### Primal and non-primitive data types
Primal and non-primitive data types differ primarily in their underlying data types:
- This means that Java comes with a set of primitive types that are already specified.
- In contrast, primitive types cannot be used to call methods to execute particular actions.
- While a primitive type always has a value, other types can be null.

### Conclusion
A BigDecimal is a means to represent numbers that is accurate. Having a Double gives you a certain level of precision in your game. 

When working with doubles of varying magnitudes, the smaller one could be dropped from the sum because the magnitude difference is so huge. This would not happen with BigDecimal.

BigDecimal has the drawback of being slower and more difficult to write algorithms with.

I hope this article was helpful, thank you.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
