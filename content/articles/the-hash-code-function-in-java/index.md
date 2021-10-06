Using a hash function, you can change the value of a given key to something else. A mathematical procedure generates a new value using a hash function. A hash value, or simply a hash, is the outcome of a hash function.

### Prerequisites
- Have a piece of basic knowledge on how to use either IntelliJ IDEA or Eclipse.
- Have basic knowledge on Lombok (For our POJO classes, the Lombok library can avoid the generation of boilerplate code. And all of this takes place throughout the compilation process.) [Lombok-maven ](https://search.maven.org/classic/#search%7Cga%7C1%7Clombok)
- Have a piece of information about [Commons-lang](https://search.maven.org/classic/#search%7Cga%7C1%7Capache-commons-lang) for the Apache commons lang's to generate a hash code. 
- Know how to use Java's Simple Logging Facade (SLF4J). It serves as a front for a variety of logging systems. ​

### Introduction
In Java, one of the most basic computer science concepts is "hashing." Java's hashCode function does the hashing for us.
By employing hashing techniques, it is possible to map data to a representational integer value. A hash code in Java is an integer number associated with every object.  Hashing is implemented in HashTables and HashMaps, two common data structures.

### Table of Contents.
- [Overview on hashCode() in Java](#overview-on-hashcode-in-java)
- [Using hashCode() in Data Structures](#using-hashcode-in-data-structures)
- [Understanding How hashCode() Works](#understanding-how-hashcode-works)
- [A Naive hashCode() Implementation](#a-naive-hashcode-implementation)
- [Improving the hashCode() Implementation](#improving-the-hashcode-implementation)
- [Handling Hash Collisions](#handling-hash-collisions)

### Overview on hashCode() in Java
In Java, the hashCode idea works according to a specific set of criteria. Two things have the same hashcode if they are the same. It is not necessarily true, however, to say the opposite. There will be a huge difference in the hashcodes of two identical items if they're stored in two distinct places in memory.
The hashCode function returns the input value's hashed integer value when called on an instance of the HashCode class.
> Here are some important ideas to keep in mind:
- When a program executes, multiple calls to hashCode will return the very same type of integer value, unless the Object passed into the equals function changes. Within the next implementation, the integer value will not have to be the same.
- If the equals method determines that two or more entities are equal, then their associated hashes must be as well.
- As long as the equals method does not agree on the equality of two or more objects, the hashes of those items will be uneven.
> To override the `equals` method, we must also override the hash method. This is vital to keep in mind.

### Using hashCode() in Data Structures
Sometimes, even the most basic actions on collections are inefficient. As an example, if you have a long list, this results in a linear search, and that will be completely ineffective.

```Java
List<String> content = Arrays.asList("Example ", "of ", "Code");
if (content.contains("hashcode")) 
  {
    System.out.println("Hash code is used");
      }
```
To address this issue, Java incorporates a range of data structures. Hash tables, for example, are used by numerous Map interface implementations.
Hash table collections use the hashCode() method to compute the hash value of a given key. Then they store the data using this value internally, making access operations significantly faster.

### Understanding How hashCode() Works
The `hashCode()` just returns the hashing algorithm's resulting integer value. Objects with a similar hash code (according to equals()) must be equal. It isn't necessary to return separate hash codes for various items in a hash function.
>The following is stated in the general hashCode() function.
- As long as no data utilized in equals evaluations on the object is modified, hashCode() must return the same value each time it is called on the same object during the runtime of a Java application. In other words, this value does not have to be the same from one application execution to another.
- Two objects that satisfy the equalsObject test have the same `hashCode` value if and only if they are equal in some other way.
- If the equals `java.lang.Object` function determines that two objects are not equal, then invoking the hashCode technique on each of the two elements does not have to return distinct integer values. Integer results for different objects produce distinct hash tables, but developers ought to be aware of this.
> Object's `hashCode()` method returns separate integers for different objects to the extent that it's practical. However, the `JavaTM` programming language does not require this implementation approach, which is more commonly used to transform an object's internal reference to an integer.

### A Naive hashCode() Implementation
Creating a nave hashCode() implementation that complies with the contract outlined above is a simple task.
This will be demonstrated by creating a class that overrides the default implementation of the method.

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
The equals() and hashCode() methods in the User class have special implementations that strictly follow the contracts. Furthermore, submitting any fixed value using hashCode() is legal.

Because all objects would be kept in the same bucket in this approach, the effectiveness of hash tables would be reduced to almost nothing.

A hash table search is executed linearly in this situation and does not provide any actual benefit. (Handling Hash Collisions) follows where we'll delve more into this concept.

###  Improving the hashCode() Implementation
We will make an effort to make the present hashCode() implementation better by incorporating all fields from the User class.

```Java
@Override
public int codeHash()
 {
    return (int) phoneNo * userName.codeHash() * adress.codeHash();
 }

```
**Explanation**
Fundamentally, this hashing algorithm is superior to the previous one. As a result, the object's hash code is computed by simply multiplying the different hash codes of the userName, address, and phoneNo. fields, respectively. As long as we maintain consistency with the equals() method, this will be a good hashCode() implementation.

#### Implementation of Standard hashCode()
Upon utilizing better hashing methods, hash tables perform better when generating hash codes. 

To make computational hash codes more unique, let's look at an example of a standard approach that uses two prime numbers.

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
It's not necessary to implement the hashCode() and equals() functions every time; understanding their duties is sufficient. This is because the majority of IDEs are capable of generating their hashCode() and equals() implementations. Since Java 7, the Objects. hash() utility method was deployed to make it easy to perform hashing.

```Java
Objects.hash(userName, adress)
```
This concept can be shown by utilizing different IDEs. We can opt to use the `IntelliJ IDE` or use `Eclipse IDE`.

Using IntelliJ will produce the following outcome:
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
Using the ` Eclipse` will produce the following results;

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
We may develop an efficient hashCode() implementation employing Lombok instead of the IDE-based mentioned methods above.
> In this situation, `Lombok-maven` must be included in the `pom. xml`dependencies:

Adding `@EqualsAndCodeHash` to the code class is all that is required from here on out.

```Java
@EqualsAndCodeHash 
public class Code 
  {
    //In this section, the concepts of fields and procedures will be examined.
  }
```
The `commons-lang Maven dependency can be included in the pom file to request that `Apache Commons Lang` generate a hashCode() implementations for us.

```XML
<dependency>
    <groupId>commons-lang</groupId>
    <artifactId>commons-lang</artifactId>
    <version>2.6</version>
</dependency>
```
In addition, the hashCoden may be used as follows:

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
In general, when implementing hashCode, there is no one-size-fits-all solution (). It should be noted that all of these implementations make use of the number 21 in some way. This is because number 21 has a great property. A bitwise shift can be used in place of multiplication, which is significantly faster than the usual multiplication method.

```
21 * j == (j << 7) - j
```
### Handling Hash Collisions
The inherent nature of hash tables reveals an important element among these data structures: they are fast. Even with a highly efficient hashing method, two or more items can have a similar hash code, even if they are unequal in some way. The result of this is that the hash table keys for both situations will all result in a similar bucket, even though their hash codes were indeed different.

The term for this type of collision is a hash collision, and we have several approaches dealing with it, each with pros and cons. When it comes to handling collisions, Java's HashMap uses a special approach.
> A link is automatically created between objects that are saved in the same bucket. After that, the linked list in the bucket index is utilized to store hashes of each object. An alternative would be to store the objects in a linked list that can be retrieved linearly.

The HashMap implementation in Java 8 received an intriguing upgrade with the release of Java 8. Linked lists are replaced by treemaps when the bucket size exceeds a particular threshold. `O(logn)` lookup can be achieved rather than `pessimistic O(n)` in this way (n).

###  Creating a Trivial Application
Now we can check out the standard `hashCode` to see how well it works. 
`SLF4J` *A Java logging framework like Log4j 2 or Logback has an abstraction layer called SLF4J, or Basic Logging Facade for Java. This makes it possible to deploy alternative logging frameworks without having to update any code.* May be used to recording a message to the console whenever a method in our Java app is executed. The app will insert certain user entities into the HashMap using SLF4J.

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
After this, we will look at how the hashCode implementation will be in the following example.

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
When an entity is saved inside the hash map and tested using the containsKey() function, the hashCode() method is called and the evaluated hash code is displayed to the console. ​
>A few mathematical notions (such as prime and arbitrary integers), as well as logical and fundamental mathematical operations, are often needed to produce effective hashCode() implementations.

Without using these strategies, we can still build hashCode() properly. Everything else is just a matter of checking to see if and how the hashing method treats unequal objects differently (). ​

### Conclusion
We now know more about Java's hashCode() and how it operates, how it fits into collections, and how to effectively implement it. I urge the reader to use the information to gather more knowledge on this very important concept. 

Happy coding!