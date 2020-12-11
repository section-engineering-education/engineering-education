###Introduction
If you’ve ever written any software in your life, you would know that bugs are an inevitable problem. One useful tool to help you resolve bugs faster is writing unit tests. A unit test is a piece of code used to test the smallest components of your program. Usually, this would refer to individual methods/functions. In this tutorial, we will be learning to use two popular java frameworks for unit testing i.e. JUnit and Mockito.

###Prerequisites
Before beginning this tutorial, I will be assuming you have some basic knowledge of Maven. We will use it to get our dependencies for these frameworks. Additionally, some knowledge of the theory behind unit testing would be great but is not required. Lastly, to make things easy I will assume you are using an IDE with JUnit integration. Most popular java IDEs like Eclipse and Intellij do so, which allow you to easily run your tests. We will not go over the specifics of running tests in particular IDEs or with Maven.

###Setup
To begin, we will be setting up a basic Maven project. To get the dependencies we need for these frameworks, add the following to your `pom.xml` file.

```Xml
<dependencies>
   <dependency>
       <groupId>org.junit.platform</groupId>
       <artifactId>junit-platform-launcher</artifactId>
       <version>1.7.0</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>org.junit.jupiter</groupId>
       <artifactId>junit-jupiter-engine</artifactId>
       <version>5.7.0</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>org.junit.vintage</groupId>
       <artifactId>junit-vintage-engine</artifactId>
       <version>5.7.0</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>org.junit.jupiter</groupId>
       <artifactId>junit-jupiter-api</artifactId>
       <version>5.7.0</version>
       <scope>test</scope>
   </dependency>
   <dependency>
       <groupId>org.mockito</groupId>
       <artifactId>mockito-core</artifactId>
       <version>3.6.0</version>
       <scope>test</scope>
   </dependency>
</dependencies>
```

As well, make sure you set up the appropriate java version since JUnit 5 uses features of Java 8.

```xml
<properties>
   <maven.compiler.target>1.8</maven.compiler.target>
   <maven.compiler.source>1.8</maven.compiler.source>
</properties>
```

Now that we have gotten our dependencies installed, let’s begin. For simplicity, we will be writing unit tests for a class called `Calculator`. This will have methods for simple math operations which we will be testing. All our test files will be under `src > main > test > java`.

###The Architecture of JUnit Tests
Before we get our hands dirty, let’s go over some basic *theory* behind JUnit and unit testing. When we write unit tests, each test is a separate method of a test class. Whenever we run a test, JUnit creates a new instance of our test class to invoke its corresponding method. When designing our tests, we should ensure that they are independent of each other. **Normally, one test cannot rely on another preceding or proceeding it**. This is because with JUnit, we cannot predict the order in which it will run our tests. Suppose we wanted a test to alter an array for another test. This would make our lives more difficult since their order is not guaranteed. There would be a good chance that the second test runs first so the first test does not alter the array for it. In theory, you could put them in order using the `@Order` annotation. Yet, even still it is best practice to keep tests independent. Keeping your tests independent makes it possible to run your tests in parallel and is just cleaner to read. As well, there may be more complications when one attempts to share a variable instance between tests. As mentioned earlier, before running each test JUnit creates a new instance of our test class. So attempting to share instance variables between tests to have them affect each other would not work. Now that we got that out of the way, we can begin writing our first tests.

###Writing Our First Unit Tests
First, our calculator will need a basic addition method to add two integers. As a good unit testing practice, we should aim for our tests to try dealing with every method specification. In particular, you want to write tests for common use cases as well as possible edge cases. One good place to look for these edge cases would be at the edge of the range of possible inputs. In some cases, it may also be worth testing how well our method handles massive inputs. To demonstrate, let's look at a couple of examples. Suppose we were testing a method involving arrays. We would want to see how it works with empty arrays, arrays of the expected size, arrays with a single element, and perhaps very large inputs. As another example: suppose we were working with a method involving some iteration. You would want a test with a condition causing no iteration, the expected types of cases, and something involving a single iteration. Going back to our Calculator class, let's think about what types of tests we want for an `add` method. We would want to test the case of two positive integers, two negative integers, and one positive and negative integer. Depending on how we intend to use the method, it could also be good to test how it would deal with integer overflow. For simplicity, let’s ignore the case of integer overflow and test the other cases.

Starting, we create a new class called `Calculator`. This class will have an `add` method as follows.

```java
public class Calculator {

   public int add(int a, int b){

       return a + b;

   }

}
```

From here, we create a new class in our `test/java` folder named `CalculatorTest`. As the name suggests, this is where our tests will go. First, let’s make a test for when we add 2 to 2. To create our first test, we simply create a new void method with the `@Test` annotation:

```java
@Test
void test1() {

}
```

As the name suggests, this tells JUnit to treat our method as a test. Within each test, we need to make comparisons between our expected and actual results. We do so using static methods of the `org.junit.jupiter.api.Assertions` class. With this in mind, we need to assert that our `add` method returns 4 when called with two 2’s as arguments. To do so, we use the static `assertEquals` method of the Assertions class as follows.

```java
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {

   private Calculator calc = new Calculator();

   @Test
   void test1() {

       // Assert that our Calculator instance returns 4 when adding 2 + 2
       assertEquals(4, calc.add(2, 2));

   }

}
```

Note that we can call the `assertEquals` method directly because of the static import.

Very easy right? We just created our first unit test for the `add` method of our `Calculator` class. Now that you understand the basic structure of a unit test, let’s create our other tests:

```java
@Test
void test2(){

    assertEquals(3, calc.add(4, -1));

}

@Test
void Test3(){

   assertEquals(-2, calc.add(-1, -1));

}
```

###The BeforeEach Annotation
Suppose now that we had to perform some operation on the object we are testing before each test. For example: what if we also needed to populate a custom data structure before each test? Directly repeating the same initialization in each test would reduce code maintainability. As a good practice, we want to condense repeating code into reusable chunks. To solve this problem, we can create a void method with the `@BeforeEach` annotation. JUnit calls methods with this annotation before each test. This is particularly useful when we want to set up each test in a particular, and more involved way.

###Display Names
To help increase the readability of our tests, we can change their name when run. To do so, we use the `@DisplayName` annotation with the desired name as an argument. One good naming convention I’ve seen for tests is `When <StateBeingTested> expect <ExpectedBehavior>`. As an example, we would name the test we just made: `When adding 2 and 2 expect 4`.

###Nested Test Classes
Before we begin writing tests for other calculator methods, let’s organize this test class a bit. This class will have tests for all the methods in the `Calculator` class. This gives it the potential to get disorganized. To improve the organization, we will use nested test classes. These are simply nested classes in our test class with the `@Nested` annotation. We put tests for one method in a single class.

```java
// Set display name for nested class
@Nested
@DisplayName("Testing the add method: ")
class AdditionTests{

   // Set Display name for our test as: "When adding 2 and 2, expect 4"
   @Test
   @DisplayName("When adding 2 and 2, expect 4")
   void test1() {

       assertEquals(4, calc.add(2, 2));

   }

   @Test
   @DisplayName("When adding 4 and -1, expect 3")
   void test2(){

       assertEquals(3, calc.add(4, -1));

   }

   @Test
   @DisplayName("When adding -1 and -1, expect -2")
   void Test3(){

       assertEquals(-2, calc.add(-1, -1));

   }

}
```

###Testing a Divide Method
Now let’s practice and learn more by creating tests for a `divide` method. Let's first think about the types of tests we should write for this method. Thinking about edge cases, one critical test to write would test the case of zero division. Aside from that, we should test different combinations of sizes of divisors and dividends. For simplicity’s sake let’s only write a test for zero division. Notice for this case we would want our `divide` method to throw an `IllegalArgumentException`. To test this behavior, we would need to use the `assertThrows` method of the `Assertions` class:

```java
@Nested
@DisplayName("Testing the divide method: ")
class DivisionTests{

   @Test
   @DisplayName("When dividing by zero, expect an Arithmetic Exception")
   void test1() {

       // Takes the expected exception and an executable with the code we expect to throw an exception
       assertThrows(IllegalArgumentException.class, () -> calc.divide(1, 0));

   }

}
```

Note, the second parameter we gave to the `assertThrows` method was in the form of a **lambda expression**. In case you are not familiar with these, you can learn about it from [my article on functional programming](https://www.section.io/engineering-education/functional-programming-in-java/).

###Introduction to Mockito
Now that we got the basics of JUnit covered, let’s see where Mockito comes into the picture. Often there are cases where we create classes that rely on the service of others. As an example, suppose we wanted a `power` method for our `Calculator` class. This method uses the help of a `multiply` method of a `MultiplicationService` class. When we write tests for the `power` method, the accuracy of the `multiply` method could affect our results. There can be cases where it appears as if the `power` method is not working but it was an error in the `multiply` method. In which case, our tests are no longer a test of a single unit, but of two, the `power` and `multiply` method. In cases like this, Mockito provides us a solution. Mockito is a framework used to create mock objects for the case of unit testing. It would allow us to hard-code the behavior of a fake `MultiplicationService`. This assures us that the `multiply` method will work as intended, and allows us to test the `power` method in isolation.

To show you how this works, let’s try implementing a test for this `power` method. This test will simply verify that our `power` method returns 4 when called with 2 and 2 as parameters. Note, we will make our `Calculator` class accept the `MultiplicationService` from its constructor. This would allow us to give it our mock object for use in the test. Starting, we need to import all the static methods of the `Mockito` class:

```java
import static org.mockito.Mockito.*;
```

Next, we need to add the following lines of code on top of our test class.

```java
// Create a mock object of type MultiplicationService
private final MultiplicationService multiplier = mock(MultiplicationService.class);
private final Calculator calc = new Calculator(multiplier);
```

Before we write our test, let’s look at the implementation of the `power` method to see how it uses the `multiply` method.

```java
public double power(double a, double b){

   double result = 1;
   for(int i = 0; i < b; i++){

       result = multiplier.multiply(result, a);

   }

   return result;

}
```

The `power` method iterates `b` number of times, multiplying the result by `a`. Thus, it calls the `multiply` method 2 times, first with 1 and 2 as arguments, then 2 and 2. These method calls return 2.0 and 4.0 respectively. Thus, we need to set up our mock object to have these behaviors.

```java
@Test
@DisplayName("When evaluating 2^2, expect 4.0")
void test1() {

   // The when and thenReturn methods come from the org.mockito package.
   when(multiplier.multiply(1, 2)).thenReturn(2.0);
   when(multiplier.multiply(2, 2)).thenReturn(4.0);

   assertEquals(4.0, calc.power(2,2));

}
```

As intuitively as that, we set up our mock object to return the right values the `power` method needs. Note that with Mock objects we do not give a proper implementation of the `multiply` method. We simply hard-code the expected results for the method calls that the `power` method uses.

###Conclusion
In this tutorial, we have gone over the basics of JUnit and Mockito. We learned how to write unit tests, how to create mock objects, and some useful tips along the way. With these new tools at your disposal, you should be able to better maintain and improve your code. This is an especially useful tool to make you a more productive programmer. This is by no means a comprehensive guide on what there is to know about the two frameworks. To learn more, I highly recommend looking at the documentation for [JUnit](https://junit.org/junit5/docs/current/user-guide/) and [Mockito](https://javadoc.io/doc/org.mockito/mockito-core/latest/index.html). Finally, if you want a reference to all the code written here, refer to this [repository](https://github.com/john-amiscaray/JUnitAndMockitoExample).
