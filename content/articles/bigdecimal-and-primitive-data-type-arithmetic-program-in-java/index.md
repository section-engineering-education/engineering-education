### Introduction
Because of their inaccuracy, floating-point data types cannot be used in financial calculations. This is why Java provides a separate class named "BigDecimal" for executing operations and reducing the chances of calculation errors. On double numbers, the BigDecimal class provides arithmetic, scale management, rounding, comparison, format conversion, and hashing functions. It compensates for the time complexity, however, by handling extremely large and extremely small floating-point integers with exceptional precision.

These basic arithmetic operations can be performed on BigDecimal as well as between BigDecimal and primitive data types, which is what our essay will cover.

Let us look at our first example of Adding, subtracting, and multiplying two large decimal integers with a Java program.:
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
**OUTPUT**
```
Adding first1 and sec2 = 80.73227
Subtracting first1 and sec2 = -30.02113
Multiplying first1 and sec2 = 1404.107793
```
We just did three operations on our two declared BigDecimals i.e
the subtraction, addition, and the addition operations. There is now a point to note here, we did not perform the division operation because of one reason that I will be giving.

Because the division of the two numbers is non-terminating, there is an error that will occur, and we know that BigDecimal was established to provide the highest level of precision. As a result, it generates an error. We'll fix it in the following code, where we'll divide the same integers, but this time the data type will be double, therefore there should be no errors and some responses.

let us have the second example below:
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
**OUTPUT**
```
Dividing first1 and sec2 = 0.45787434
```
### Primitive Data Types
We have done several operations on our BigDecimal objects, now we'll attempt to accomplish the same with primitive data types.
Lets now look at our third example 
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
>Upon running the code above, there will be an error that will happen to state that int cannot be converted to BigDecimal.

The error that occurs happens since the operation can only be performed on BigDecimal objects, and this is the case. Our primitive data type must be converted into a BigDecimal Object using the BigDecimal Class's constructor. The code below resolves the problem in the following way. We are constructing a new object of class BigDecimal with the same value as sec2 and providing it directly to the add() method as an argument.
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
**OUTPUT**
```
Adding first1 and sec2 = 35
```
Lastly now look at the following example showing the arithmetic operations between BigDecimal and int to understand it better.
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
**OUTPUT**
```
Adding first1 and sec2 = 35
Subtracting first1 and sec2 = -5
Multiplying first1 and sec2 = 300
Dividing first1 and sec2 = 0.75
```
### Conclusion
A BigDecimal is a means to represent numbers that is accurate. Having a Double gives you a certain level of precision in your game. When working with doubles of varying magnitudes, the smaller one could be dropped from the sum because the magnitude difference is so huge. This would not happen with BigDecimal.

BigDecimal has the drawback of being slower and more difficult to write algorithms with.

I hope this article was helpful, thank you.