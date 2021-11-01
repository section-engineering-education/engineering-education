### Introduction
Java offers some sophisticated methods that make optimum use of streams and lambda expressions. These allow you to build an assembly line using functional programming principles. One of these methods, filter(), is an intermediate operation that receives data from a stream and produces a new stream after changing the data based on a condition. In this guide, we will have a look at how we can use this method to its fullest extent. 

### Prerequisites
Before going through this tutorial the reader should:
- Have basic knowledge of Java programming language
- Have some experience working with Java streams
- Know the basics of [maven](https://maven.apache.org/what-is-maven.html)

### Table of Contents
- [Overview of the Stream Filter Method in Java](#overview-of-the-stream-filter-method-in-java)
- [Using the Stream Filter Method](#using-the-stream-filter-method)
- [Collection Filtering](#collection-filtering)
- [Filtering Data Based on a Variety of Criteria](#filtering-data-based-on-a-variety-of-criteria)
- [Methods for Dealing with Exceptions](#methods-for-dealing-with-exceptions)

### Overview of the Stream Filter Method in java.
The filter() function of the Java stream allows you to narrow down the stream's items based on a criterion. If you only want items that are even on your list, you can use the filter method to do this. This method accepts a predicate as an input and returns a list of elements that are the results of that predicate.

It is possible to get a stream of items from this stream that meet a particular predicate with the filter() method. This is a step-between process. Performing an intermediate action like filter() does not really filter anything, but instead generates a new stream that, when browsed, includes the items of the first stream that satisfy the provided predicate. These operations are always lazy.

### Using the Stream filter method
Java stream offers the filter() method, which allows you to filter stream elements based on a predicate you specify. You can conveniently get only even elements from your list by using the filter method. This method accepts a predicate as a parameter and returns a stream of elements that are the results of the predicate.

A Stream interface's filter() method identifies elements in a stream that satisfy a criterion. It is a Stream interface intermediate operation.

The following is the method signature for the Stream filter() function:
```Java
Stream<q> filter(Predicate<? super q> predicate)
```

Notice how it accepts a Predicate object as a parameter. A predicate is a logical interface to a functional interface. Therefore, you may also send a lambda expression to this function.

### Collection filtering
The filter() function is often used to handle collections. We can use it to create a list of workers who have earned more than 90 marks, specifying the predicate as a lambda.

```Java
List<Employee> employeeWith90MarksAndAbove = employees
  .stream()
  .filter(q -> q.getMarks() > 90)
  .collect(Collectors.toList());
```
Additionally, methods reference, which again is shorthand for such a lambda expression, may also be used.

```Java
List<Employee> employeeWith90MarksAndAbove = employees
  .stream()
  .filter(Employee::hasOverNinetyMarks)
  .collect(Collectors.toList());
```
In this particular instance, we enhance our Employee class by adding the hasOverNinetyMarks method:

```Java
public boolean hasOverNinetyMarks() 
{
    return this.marks > 90;
}
```
When we use these two approaches, we obtain the same result:

```Java
assertThis(employeeWith90MarksAndAbove).hasSize(3);
assertThis(employeeWith90MarksAndAbove).contains(george, mike);
```

### Filtering data based on a variety of criteria
In addition, we may utilize several criteria with the filter to our advantage. We might, for instance, use a combination of points and names to narrow the results:

```Java
List<Employee> georgeWith90MarksAndAbove = employees
  .stream()
  .filter(q -> q.getMarks() > 90 && q.getIdentity().startsWith("George"))
  .collect(Collectors.toList());

  assertThis(georgeWith90MarksAndAbove).hasSize(1);
  assertThis(georgeWith90MarksAndAbove).contains(george);
```

**Explanation**
We used multiple conditions with filter() such as marks and the identity of the employees

### Methods for dealing with exceptions
The filter method is used to evaluate predicates that do not throw exceptions when they are evaluated. The functional interfaces of the Java programming language do not specify any kind of exceptions, whether checked or unchecked. Functional Interfaces given by the JDK are inadequate for dealing with exceptions; the resulting code becomes complex and complicated when dealing with them.

The handling of exceptions in lambda expressions shall next be explored in detail using several alternative approaches.

#### Using a Custom Wrapper
Adding a `profilePictureUrl` to our Employee object will be the first thing we do.

```Java
private String profilePictureUrl;
```
Furthermore, we will create a simple `hasValidProfilePicture()` function to verify whether or not the profile picture is still valid:

```Java
public boolean hasValidProfilePicture() throws IOException
{
    URL url = new URL(this.profilePictureUrl);
    HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
    return connection.getResponseCode() == HttpURLConnection.HTTP_OK;
}
```

When the method `hasValidProfilePicture()` is called, an IOException is issued. Now, if we attempt to sort the clients based on this criterion. We will have the following.

```Java
List<Employee> employeesWithValidProfilePicture = employees
  .stream()
  .filter(Employee::hasValidProfilePicture)
  .collect(Collectors.toList());
```

**Explanation**
Filtering the employee with this method, hasValidProfile, will bring us an error:

```
Incompatible throw type java.io.IOException inside the function phrase
```

As shown in the following illustration, one way of handling it is to encapsulate it in the try-catch block.

```Java
List<Employee> employeesWithValidProfilePicture = employees
        .stream()
        .filter(q ->
        {
            try {
                return q.hasValidProfilePicture();
            }    catch (IOException x) {
                 // needs to take care of the stated exception
                 return false;
            }
        }).collect(Collectors.toList());
```

To prevent an exception generated by our predicate from being caught, you may wrap it in an unchecked exception such as from a RuntimeException.

#### Using Throwing Function
We may also make use of the `ThrowingFunction` library as an alternative.

Using ThrowingFunction, a free open-source package that can be downloaded, we can handle checked exceptions in Java functional interfaces with relative simplicity.

The first step is to include the throwing function dependency in our pom.xml file:

```XML
<dependency>
    <groupId>pl.touk</groupId>
    <artifactId>throwing-function</artifactId>
    <version>1.3</version>
</dependency>
```

Exception handling in predicates is simplified with the `ThrowingPredicate` class, which also contains the unchecked() method for encapsulating checked exceptions.

This action is illustrated below in the following code:

```Java
List employeesWithValidProfilePicture = employee
  .stream()
  .filter(ThrowingPredicate.unchecked(Employee::hasValidProfilePicture))
  .collect(Collector.toList());
```

### Conclusion
In this tutorial, we have looked at how to use the filter() method in Java to filter out specific items from streams. In the process, we made use of lambda expressions to specify the predicate to filter with. In addition to that, we have also looked at the different approaches for dealing with exceptions handling.

Happy Coding!

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)
