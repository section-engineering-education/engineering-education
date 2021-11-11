---
layout: engineering-education
status: publish
published: true
url: /big-decimal-and-primitive-data-type-in-java/
title: BigDecimal and Primitive Data Types in Java
description: This articles introduces the reader to the basic arithmetic operations that can be performed on BigDecimal, as well as between BigDecimal and primitive data types.
author: bonface-ndolo
date: 2021-09-30T00:00:00-06:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/big-decimal-and-primitive-data-type-in-java/hero.jpg
    alt: BigDecimal and Primitive Data Type in Java Hero Image
---
Because of their inaccuracy, floating-point data types cannot be used in financial calculations. This is why Java provides a separate class named BigDecimal for executing operations. BigDecimal reduces the chances of calculation errors.
<!--more-->
On double numbers, the BigDecimal class provides arithmetic, scale management, rounding, comparison, format conversion, and hashing functions. It compensates for the time complexity by handling large and small floating-point integers with exceptional precision.

These basic arithmetic operations can be performed on BigDecimal, and between BigDecimal and primitive data types. This is what we will cover in this article.

While both `BigInteger` and `BigDecimal` support arbitrary-precision integers, BigDecimal only supports arbitrary-precision, fixed-point numbers. BigDecimal/BigInteger is not advisable if you are constructing a low-latency application where every microsecond counts.

Let us look at our first example of adding, subtracting, and multiplying two large decimal integers with a Java program:

```Java
import java.io.*;
import java.math.BigDecimal;
class Example {
    public static void main(String[] args)
    {

        // Declaration of the BigDecimal numbers
        BigDecimal first1 = new BigDecimal("25.35557");
        BigDecimal sec2 = new BigDecimal("55.3767");
         // Actual arithmetic addition operation
        System.out.println("Adding first1 and sec2 = "
                           + (first1.add(sec2)));

        // Actual arithmetic subtraction operation
        System.out.println("Subtracting first1 and sec2 = "
                           + (first1.subtract(sec2)));

        // Actual arithmetic multiplication operation
        System.out.println(
            "Multiplying first1 and sec2 = "
            + (first1.multiply(sec2)));
    }
}
```

Output:

```bash
Adding first1 and sec2 = 80.73227
Subtracting first1 and sec2 = -30.02113
Multiplying first1 and sec2 = 1404.107793
```

We have done three operations on our two declared BigDecimals; subtraction, addition, and multiplication operations.

There is a point to note here, we did not perform the division operation because the division of the two numbers is non-terminating.

This throws an error. Yet we know that BigDecimal was established to provide the highest level of precision.

We will fix it in the following code, where we will divide the same integers, but this time the data type will be double. Thus, there should be no errors.

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

```bash
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

Upon running the code above, an error stating that `int` cannot be converted to `BigDecimal` will be thrown.

The error that occurs happens since the operation can only be performed on BigDecimal objects. Our primitive data type must be converted into a BigDecimal object using the BigDecimal class's constructor.

We are constructing a new object of class BigDecimal with the same value as `sec2` and providing it directly to the `add()` method as an argument.

The code below resolves the problem in the following way:

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

```bash
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

```bash
Adding first1 and sec2 = 35
Subtracting first1 and sec2 = -5
Multiplying first1 and sec2 = 300
Dividing first1 and sec2 = 0.75
```

No null values are allowed in a database, application, or view. Everything is initialized with new BigDecimal(0). Or, you execute null checks on every use of nullable values.

### Need for BigDecimal
There is a lot of fun to be had with floating-point numbers. A double type is commonly used for quantities unless the value is an integer, in which case an int type is usually acceptable.

Also, a float, or a long can be used, depending on the size of a value's `value` type.

It should be noted that these kinds are the very worst thing you can use when dealing with money. They do not provide the correct value, but rather one that can be stored in a binary format.

### About primitive data types
They are the simplest types. It is possible to design your complicated kinds by using primitive types as a starting point for development.

Primitive types are easier to use in applications since they boost the performance by a large amount. Object-based implementation of primitive types would result in a considerable performance.

As a result of their name, they can relate to a wide range of objects. The non-primitive data types in Java, however, are built by programmers.

For the same reason, primitive types are more efficient when compared to instances of wrapper classes.

### Primal and non-primitive data types
Primal and non-primitive data types differ primarily in their underlying data types. This means that Java comes with a set of primitive types that are already specified.

In contrast, primitive types cannot be used to call methods to execute particular actions.

While a primitive type always has a value, other types can be null.

### Conclusion
A BigDecimal is a means to represent numbers that are accurate. Having a `double` gives you a certain level of precision in your game.

When working with doubles of varying magnitudes, the smaller one could be dropped from the sum because the magnitude difference is so huge. This would not happen with BigDecimal.

BigDecimal has the drawback of being slower, and more difficult to write algorithms with.

I hope this article was helpful.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
