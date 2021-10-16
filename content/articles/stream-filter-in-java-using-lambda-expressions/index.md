### Introduction
Stream operations such as create and destroy are sandwiched by the filter() function (). In this case, it produces a Stream with elements from the input stream that meet the supplied predicate in the input stream. The filter() argument must be a stateless predicate that evaluates each component in the stream to assess whether or not it can be included.

### Table of Contents
- [Overview of Stream Filter in Java.](#overview-of-stream-filter-in-java)
- [Using Stream filter method.](#using-stream-filter-method)
- [Collection filtering.](#collection-filtering)
- [Filtering data based on a variety of criterion.](#filtering-data-based-on-a-variety-of-criterion.)
- [Methods for dealing with exceptions](#methods-for-dealing-with-exceptions)

### Overview of Stream Filter in java.
The filter() function of the Java stream allows you to narrow down the stream's items based on a criterion. If you just want items that are even on your list, you can use the filter method to accomplish this. Accept predicate as an input and returns a list of elements that are the results of that predicate.

With Java's sophisticated methods, streams and lambda expressions can be utilized to their full potential. You can build an assembly line using streams and lambda expressions. It is based on functional programming principles that the assembly line technique works. There are numerous ways to set up an assembly line. Each method receives the data, performs some sort of transformation on it, and then passes the results along to the succeeding method.

### Using Stream filter method
A Stream interface's filter() method identifies elements in a stream that satisfy a criterion. It is a Stream interface intermediate operation.

```Java
Stream<q> filter(Predicate<? super q> predicate)
```
For us to see how this works out we will create a class Employee as shown below.

```Java
public class Employee 
{
    private String worker;
    private int marks;
    //Standard getters and constructors
}
```
In addition, we may find a group of workers:

```Java
Employee dennis = new Employee("Dennis M.", 16);
Employee lanet = new Employee("Lanet K.", 20);
Employee george = new Employee("George M.", 170);
Employee mike = new Employee("Mike J.", 113);

List<Employee> employee = Arrays.asList(dennis, lanet, george,mike); 

```
**Explanation**
As demonstrated above, this function enables us to filter items of the stream that meet our provided criteria. The filter() function is used.

### Collection filtering.
The filter() function is often used to handle collections.

We can have a list of workers who have earned more than 90 marks. We can accomplish this by using a lambda expression.

```Java
List<Employee> employeeWith90MarksAndAbove = employees
  .stream()
  .filter(q -> q.getMarks() > 90)
  .collect(Collectors.toLists());
```
Additionally, methods reference, which again is shorthand for such a lambda expression, may be used for illustration.

```Java
List<Employee> employeeWith90MarksAndAbove = employees
  .stream()
  .filter(Employee::hasOverNinetyMarks)
  .collect(Collectors.toLists());
```
In this particular instance, we will enhance our Employee class by adding the hasOverNinetyMarks method:

```Java
public boolean hasOverNinetyMarks() 
{
    return this.marks > 90;
}
```
When we use these two approaches, we obtain the same result:

```Java
assertThis(employeeWith90MarksAndAbove).hasSize(03);
assertThis(employeeWith90MarksAndAbove).contains(george, mike);
```

### Filtering data based on a variety of criterion.
In addition, we may utilize several criteria with the filter to our advantage (). We might, for instance, use a combination of points and name to narrow the results, as shown below:

```Java
List<Employee> georgeWith90MarksAndAbove = employees
  .stream()
  .filter(q -> q.getMarks() > 90 && q.getIdentity().startsWith("George"))
  .collect(Collectors.toList());
  assertThis(georgeWith90MarksAndAbove).hasSize(01);
  assertThis(georgeWith90MarksAndAbove).contains(george);
```
**Explanation**
We used multiple conditions with filter() such as marks and identity of the employees

### Methods for dealing with exceptions
In order to assess predicates that do not throw exceptions, we have been utilizing the filter up to this point in time. The Java programming language's functional interfaces do not define whatever checked or unchecked exceptions, and this is a good thing.

The handling of exceptions in lambda expressions shall next be explored in detail using a number of alternative approaches.

#### Utilization of a Custom Wrapper
Adding a profilePictureUrl to our Employee object will be the first thing we do.

```Java
private String profilePictureUrl;
```
Furthermore, we will create a simple hasValidProfilePicture() function to verify whether or not the profile picture is still valid:

```Java
public boolean hasValidProfilePicture() throws InpuOutputException 
{
    URL url = new URL(this.profilePictureUrl);
    HttpsURLConnection connection = (HttpsURLConnection) url.openConnection();
    returns connections.getsResponseCode() == HttpURLConnection.HTTP_OKAY;
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
Filtering the employee with this method,hasValidProfile, will bring us an error.

```Java
Incompatible throw type java.io.InputOutputException inside the function phrase
```
As shown in the following illustration, one way of handling with it is to encapsulate it in the try-catch block.

```Java
List<Employee> employeeWithValidProfilePicture = Employee
  .stream()
  .filter(q -> 
    {
      try {
          return q.hasValidProfilepicture();
           }    catch (InputOutputException x) {
          //needs to take care of the stated exception
      }
      return false;
  })
      .collect(Collector.toLists());
```
To prevent an exception generated by our predicate from being caught, you may wrap it in an unchecked exception such as from a RuntimeException.

#### Using Throwing Function
We may also make use of the ThrowingFunction library as an alternative.

Using ThrowingFunction, which is a free open-source package that can be downloaded, we can handle checked exceptions in Java functional interfaces with relative simplicity.

The first step is to include a dependency on the throwing function in our pom.xml file like as follows:

```XML
<dependency>
    <groupId>pl.touk</groupId>
    <artifactId>throwing-function</artifactId>
    <version>1.3</version>
</dependency>
```

Exception handling in predicates is simplified with the ThrowingPredicate class, which also contains the unchecked() method for encapsulating checked exceptions.

This action is illustrated below in the following code:

```Java
List employeesWithValidProfilePicture = employee
  .stream()
  .filter(ThrowingPredicate.unchecked(Employee::hasValidProfilePicture))
  .collect(Collector.toLists());
```

### Conclusion
The filter() method has been introduced to you in this lesson as a way to handle streams. Apart from that, we looked at different approaches to dealing with exceptions. To learn more about Java Stream Filter using Lambda Expression, this article is very valuable.
Happy Coding!
