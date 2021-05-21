Type casting is a way of converting data from one data type to another data type. This process of data conversion is also known as type conversion or type coercion.

In Java, we can cast both reference and primitive data types. By using casting, data can not be changed but only the data type is changed.

**Note:** Type casting is not possible for a `Boolean` data type.

There are 13 types of conversion in java. But in this article, we will only look at 2 major types:

1. Implicit casting.
2. Explicit casting.

To read more on the other types of casting, refer to this [documentation](https://docs.oracle.com/javase/specs/jls/se10/html/jls-5.html).

### Implicit casting
This type of conversion is also known as **widening casting**. It happens automatically when converting from a narrower range data type to a wider range data type. It also means converting a lower data type like an `int` to a higher data type like a `double`.

Implicit casting takes place under two conditions:

- Compatibility of the data types. For example, data types such as numeric are compatible with other numeric data types **BUT** they are not compatible with boolean, char, or string data type. The same way `string` is not compatible with a boolean data type.

- If the targeted value to be converted is of smaller length e.g. 4 bytes, to larger data type e.g. 8 bytes.

Implicit casting follows the order of conversion as shown below:

```
Byte -> Short -> Char -> Int -> Long -> Float -> Double  
```

Let's look at an example of implicit type casting in Java. 

Here, we will convert an `int` value to a `long` value and finally to a `double` value by using a simple assignment operator.

```Java
public class Main {
  public static void main(String[] args) {
    int a = 20;
    long b = a;     //implicit casting from int to long data type
    double c = b;   // implicit casting from long to double data type

    System.out.println(a);
    System.out.println(b);
    System.out.println(c);
  }
}
```

Output:

```bash
20
20
20.0
```

We can also convert an `int` into a `double` data type by instantiating a `double` class or by using the `double.valueOf()` method. This way also applies to converting an int to a `long` data type.

You can read more on this [here](https://www.studytonight.com/java-type-conversion/how-to-convert-java-int-to-double).

### Explicit type casting

This type of casting involves assigning a data type of a high range to a lower range data type. This process of conversion is also referred to as narrowing type casting. This is done manually as you need to do the casting using the "()" operator. If we fail to do the casting, a compile-time error will be returned by the compiler.

Explicit casting follows the order of conversion as shown below:

```
Double -> FLoat -> Long -> Int -> Char -> Short -> Byte
```

Lets look at an example of explicit casting in Java:

```Java
public class Main  {  
  public static void main(String args[])  {  
    double d = 57.17;  
    int i = (int)d;  // Explicit casting from long to int data type
    System.out.println(d);  
    System.out.println(i);  //fractional part lost
  }  
}
```

Output:

```
57.17
57
57
```

In the example above, we have converted the double data type into an `int` data type. The decimal part of the value is lost after type casting.

### Java wrapper class

To convert a primitive data type into an object, we need the [wrapper classes](https://beginnersbook.com/2017/09/wrapper-class-in-java/). We can take `string` inputs from the users e.g "1234".  If we want to work with integers, we need to convert the `string` to `int` data type and vice versa. i.e

```Java
String a = "1234";
int b = Integer.parseInt(a);  // converting string to int
```

In Java, all primitive wrapper classes are immutable i.e when we create a new object, the old object cannot be changed without exception.

### Ways of creating wrapper objects 

1. Using wrapper class constructor.
2. Using wrapper class `valueOf()` method.

### 1. Using Double wrapper class constructor

We can cast an `int` to `double` data type by passing the value of `int` to the constructor of the `Double` Wrapper class.

**Example**

```java
public class Main {
  public static void main (String args[]) {
      
    int num = 67;

    Double myDouble = new Double(num); // using Double wrapper class
  
    // showing the double value
    System.out.println("My double is " + myDouble);
    
  }
}
```

Output:

```
My double is 67.0
```

### 2. Using Java Double valueOf() method

In this method, we convert `int` to `double` using the `valueOf()` method in the `Double` wrapper class.

```java
public class Main {
  public static void main (String[] args) {
      
    int myInt = 67;
  
    Double myDouble = Double.valueOf(myInt);// converting int to double using the Double valueOf() method
  
    System.out.println("My double is " + myDouble);
  }
}
```

Output:

```
My double is 67.0
```

### Conclusion
In this article, we have looked at the different ways of type casting our data type. We can now easily type cast from one data type to another.

Happy coding!
