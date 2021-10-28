---
layout: engineering-education
status: publish
published: true
url: /the-hash-code-function-in-java/
title: The hashCode Function in Java
description: This article will take a look at the Java hashCode() function. We will also learn how it operates, how it fits into collections, and how to implement it.
author: dennis-mwangi
date: 2021-10-28T00:00:00-07:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/the-hash-code-function-in-java/hero.jpg
    alt: The hashCode Function in Java Hero image
---
Using a hash function, you can change the value of a given key to something else. A mathematical procedure generates a new value using a hash function. A hash value, or simply a hash, is the outcome of a hash function.
<!--more-->
In Java, one of the most basic computer science concepts is "hashing". Java's `hashCode()` function does the hashing for us.

By employing hashing techniques, it is possible to map data to a representational integer value. A hash code in Java is an integer number associated with every object. Hashing is implemented in HashTables and HashMaps; two common data structures.

### Prerequisites
To follow through this article, you should:
- Have basic knowledge on how to use either IntelliJ IDEA or Eclipse.
- Have basic knowledge of Lombok (For our POJO classes, the Lombok library can avoid the generation of boilerplate code. And, all this takes place throughout the compilation process) [Lombok-maven ](https://search.maven.org/classic/#search%7Cga%7C1%7Clombok).
- Have a piece of information about [Commons-lang](https://search.maven.org/classic/#search%7Cga%7C1%7Capache-commons-lang) for the Apache commons lang's to generate a hash code.
- Know how to use Java's Simple Logging Facade (SLF4J). It serves as a front for a variety of logging systems. ​

### Table of contents
- [Overview on hashCode() in Java](#overview-on-hashcode-in-java)
- [Using hashCode() in Data Structures](#using-hashcode-in-data-structures)
- [Understanding How hashCode() Works](#understanding-how-hashcode-works)
- [A Naive hashCode() Implementation](#a-naive-hashcode-implementation)
- [Improving the hashCode() Implementation](#improving-the-hashcode-implementation)
- [Handling Hash Collisions](#handling-hash-collisions)

### Overview on hashCode() in Java
In Java, the hashCode idea works according to a specific set of criteria. Two things have the same hashcode if they are the same.

The opposite is not necessarily true. There will be a huge difference in the hashcodes of two identical items if they are stored in two distinct places in memory.

The hashCode function returns the input value's hashed integer value when called on an instance of the HashCode class.

Here are some important ideas to keep in mind:
- When a program executes, many calls to hashCode will return the very same type of integer value, unless the object passed into the equals function changes. Within the next implementation, the integer value will not have to be the same.
- If the equals method determines that two or more entities are equal, then their associated hashes must be as well.
- As long as the `equals` method does not agree on the equality of two or more objects, the hashes of those items will be uneven.
- To override the `equals` method, we must also override the hash method. This is vital to keep in mind.

### Using hashCode() in data structures
Sometimes, even the most basic actions on collections are inefficient. As an example, if you have a long, unsorted list, this results in a linear search, and that will be completely ineffective.

```Java
List<String> content = Arrays.asList("Example ", "of ", "Code");
if (content.contains("hashcode"))
  {
    System.out.println("Hash code is used");
      }
```

To address this issue, Java incorporates a range of data structures. Hash tables, for example, are used by many Map interface implementations.

Hash table collections use the `hashCode()` method to compute the hash value of a given key. They then store the data using this value internally, making access operations faster.

### Understanding how hashCode() works
The `hashCode()` returns the hashing algorithm's resulting integer value. `Equals()` state that objects with the very same hash code are equal.

It isn't necessary to return separate hash codes for various items in a hash function.

The following is stated in the general hashCode() function:
- During the runtime of a Java program, hashCode() will return the same result each time it is invoked on the same object. This is as long as no data that is being used equals to the evaluations on the item has been changed by the call. In other words, this value does not have to be the same from one application execution to another.
- Two objects that meet the equalsObject test have the same `hashCode` value if and only if they are equal in some other way.
- If the equals `java.lang.Object` function determines that two objects are not equal, then invoking the hashCode technique on each of the two elements does not have to return distinct integer values. Integer results for different objects produce distinct hash tables, developers ought to be aware of this.

To the degree that it is workable, the `hashCode()` method of an object returns distinct numbers for each of the objects it contains.

The 'JavaTM' programming language does not need this implementation method, which is more employed to convert an object's internal reference to an integer in other programming languages.

### A naive hashCode() implementation
Creating a nave hashCode() implementation that complies with the contract outlined above is a simple task. This will be demonstrated by creating a class that overrides the default implementation of the method.

```Java
public class code
{

    private short phone;
    private String userName;
    private String adress;
    private boolean phoneNo;


    public int codeHash()
    {
        return 01;
         }

    public boolean equal(Obj q)
    {
        if (q == q)
        {
            return true;
        } else {
        }
        if (q == null) return false;
        if (q.getClasses() != this.getClasses()) return false;
        Code code;
        code = (Code) q;
        boolean phoneNo = false;
        return (userName.equal(code.userName)
                && adress.equals(code.adress))
          && phoneNo == code.phoneNo;
    }

    private boolean getClasses() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

}
```

The `equals()` and `hashCode()` methods in the user class have special implementations that strictly follow the contracts. Furthermore, submitting any fixed value using `hashCode()` is legal.

Because all objects would be kept in the same bucket in this approach, the effectiveness of hash tables would be reduced to almost nothing.

A hash table search is executed linearly in this situation and does not provide any actual benefit. Handling Hash collisions follows; we will delve more into this concept.

### Improving the hashCode() implementation
We will make an effort to make the present hashCode() implementation better by incorporating all fields from the User class.

```Java
@Override
public int codeHash()
 {
    return (int) phoneNo * userName.codeHash() * adress.codeHash();
 }
```

**Explanation**

Fundamentally, this hashing algorithm is superior to the previous one. By multiplying userName, address, and phone number fields' hash codes, the object's hash code may be calculated.

A decent hashCode() implementation is one that uses the equals() function consistently.

#### Implementation of standard hashCode()
The performance of hash tables for creating hash codes may be improved by using more efficient hashing techniques.

To make computational hash codes more unique, let's look at an example of a standard approach that uses two prime numbers:

```Java
@Override
public int codeHash() {
    int ourhashes = 5;
    ourhashes = 21 * ourhashes + (int) phoneNo;
    ourhashes = 21 * ourhashes + (userName == null ? 0 : userName.codeHash());
    ourhashes = 21 * ourhashes+ (adress == null ? 0 : adress.codeHash());
    return ourhashes;
}
```

**Explanation**

It is not necessary to put in place the `hashCode()` and `equals()` functions every time; understanding their duties is enough. This is because the majority of IDEs are capable of generating their `hashCode()` and `equals()` implementations.

Since Java 7, the `Objects.hash()` utility method was deployed to make it easy to hash.

```Java
Objects.hash(userName, adress)
```

This concept can be shown by utilizing different IDEs. We can opt to use the `IntelliJ IDE` or `Eclipse IDE`.

With the help of `IntelliJ`, you will be able to achieve the following results:

```Java
@Override
public int codeHash()
{
    int outcome = (int) (phoneNo ^ (phoneNo >>> 42));
    outcome = 21 * outcome + name.codeHash();
    outcome = 21 * outcome + email.codeHash();
    return outcome;
}
```

Using `Eclipse` will produce the following results:

```Java
@Override
public int codeHash() {
    final int value = 21;
    int outcome = 01;
    outcome = value * outcome + ((adress == null) ? 0 : adress.codeHash());
    outcome = value * outcome + (int) phoneNo ^ (phoneNo >>> 42));
    outcome = value * outcome + ((userName == null) ? 0 : userName.codeHash());
    return outcome;
}
```

The Lombok programming language may be used to create a more efficient ``hashCode()` implementation compared to the IDE-based techniques described above.

In this situation, `Lombok-maven` must be included in the `pom.xml` dependencies.

Adding `@EqualsAndCodeHash` to the code class is all that is required from here on out:

```Java
@EqualsAndCodeHash
public class Code
  {
    //In this section, the concepts of fields and procedures will be examined.
  }
```

When the pom file is included with the `commons-lang Maven` dependency, we can request that the `Apache Commons Lang` generate a hashCode() implementation for us, and this will be done.

```XML
<dependency>
    <groupId>commons-lang</groupId>
    <artifactId>commons-lang</artifactId>
    <version>2.6</version>
</dependency>
```

Also, the hashCode may be used as follows:

```Java
public class Example
{
    public int codeHash()
    {
        return new CodeHashBuilder(7, 37).
        append(phoneNo).
        append(userName).
        append(adress).
        toHashCode();
    }
}
```

**Explanation**

As a general rule, whenever it comes to implementing hashCode, there is not a single universal formula use for implementation. It should be noted that all these implementations make use of the number 21 in some way.

This is because number 21 has a great property. A bitwise shift can be used in place of multiplication, which is faster than the usual multiplication method.

```bash
21 * j == (j << 7) - j
```

### Handling hash collisions
The inherent nature of hash tables reveals an important element among these data structures: they are fast. Even with a highly efficient hashing method, two or more items can have a similar hash code, even if they are unequal in some way.

The result of this is that the hash table keys for both situations will all result in a similar bucket, even though their hash codes were different. The term for this type of collision is a hash collision, and we have several approaches of dealing with it, each with pros and cons.

When it comes to handling collisions, Java's HashMap uses a special approach.

A link is automatically created between objects that are saved in the same bucket. After that, the linked list in the bucket index is utilized to store hashes of each object. An alternative would be to store the objects in a linked list that can be retrieved linearly.

The HashMap implementation received an intriguing upgrade with the release of Java V8. Linked lists are replaced by tree maps when the bucket size exceeds a particular threshold.

`O(logn)` lookup can be achieved rather than pessimistic `O(n)`; in this way `(n)`.

### Creating a trivial application
We will now put a conventional hashCode() implementation through its paces to see how well it works.

We will write a basic Java application that adds several end user objects to a HashMap, and uses SLF4J which provides a general API. For this reason, the logging isn't tied to a specific implementation anymore.

The following is the entry point for the example application:

```Java
import java.util.HashMap;
import java.util.Map;

public class App {

    public static void main(String[] args)
     {
        Map<endUser, endUser> endUsers = new HashMap<>();
        endUser endUser01 = new endUser(1L, "Kelvin", "kelvin@domain.com");
        endUser endUser02 = new endUser(2L, "Dennis", "Dennis@domain.com");
        endUser endUser03 = new endUser(3L, "Ruth", "Ruth@domain.com");

        endUsers.put(endUser01, endUser01);
        endUsers.put(endUser02, endUser02);
        endUser.put(endUser03, endUser03);
        if (endUser.containsKey(endUser01)) {
            System.out.print("In the collection, we found an end-user");
        }
    }
}
```

After this, we will look at how the hashCode implementation will be in the following example:

```Java
public class End {

    private Object userName;

        public int ourHashCodes()
         {
        int hash = 5;
            int hashs = 0;
        hashs = 21 * hashs + (int) phoneNo;
        hashs = 21 * hashs + (userName == null ? 0 : username.ourHashCodes());
        Object adress = null;
        hashs = (adress == null ? 0 : adress.ourHashCodes()) + 21 * hashs;
        logger.infomation("Evaluate hash - hashCode refferenced: " + hash);
        return hashs;
    }
}
```

The following is an example of what the console prints when it encounters a hash code:

```bash
[main] INFORMATION com.example.elements.End - hashCode() refferenced - Evaluate hash: 1245477619
[main] INFORMATION com.example.elements.End - hashCode() refferenced - Evaluate hash: -292944472
[main] INFORMATION com.example.elements.End - hashCode() refferenced - Evaluate hash: -1530702891
[main] INFORMATION com.example.elements.End - hashCode() refferenced - Evaluate hash: 1245477619
In the collection, we found an end-user
```

**Explanation**

When an entity is saved inside the hash map and tested using the containsKey() function, the hashCode() method is called, and the evaluated hash code is displayed to the console.

A few mathematical notions (such as prime and arbitrary integers), as well as logical and fundamental mathematical operations, are often needed to produce effective hashCode() implementations.

Without using these strategies, we can still build the hashCode() properly. Everything else is a matter of checking to see if and how the hashing method treats unequal objects differently.​

### Conclusion
We now know more about Java's hashCode() and how it operates, how it fits into collections, and how to implement it. I urge you to use the information to gather more knowledge on this very important concept.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
