### Introduction

How do we know that code works except by testing. Various forms of testing exist in software engineering. [Unit testing](https://en.wikipedia.org/wiki/Unit_testing) is the most vital form of testing. Unit testing offers a means to test the individual code components as isolated units. The key in unit testing is the isolation of program units. Programmers use stubs, spies and mock objects to mock out external dependencies. The use of stubs, spies and mock objects enable code isolation.


Mockito is the most popular mocking framework for Java projects today. Mockito offers intuitive matchers that allow programmers to mock the behaviours of dependencies.

The aim of this tutorial is to guide readers on how to write effective units tests using Mockito and JUnit. This tutorial is a continuation of [Testing Java Projects using JUnit and Mockito](https://www.section.io/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/), in which I provided an introduction to Mockito and guided readers on how to integrate Mockito into a Java project amongst other things. I recommend that you read the earlier article before continuing.

### Prerequisite
As a prerequisite for this tutorial, you should have the following:
1. Basic knowledge of how to use the `when-then` directive to perform basic stubbing. If you are new to testing with Mockito or if you need a referesher, please visit my earlier tutorial-  [Testing Java Projects using JUnit and Mockito](https://www.section.io/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/).
2. An understanding of programming in Java.
3. A basic understanding of how to use [JUnit](https://en.wikipedia.org/wiki/JUnit) for unit tests.
4. Java Development Kit (JDK) [installed](https://www.oracle.com/java/technologies/downloads/) on your computer.
5. IntelliJ code editor [installed](https://www.jetbrains.com/idea/download/).
6. Maven [installed](https://maven.apache.org/).

You can find the code for this tutorial [here](https://github.com/ehizman/bedspaces). The system under test  is a Hostel Management System that supports the following actions:
- Students can register on the system.
- Students can request a bed space.
- Finding all students in a Hostel by providing the name of the Hostel.
- Find all students in a room by providing the room id.

### Goals
You should understand the following after reading this tutorial:
- How to use the Mockito Argument Matchers.
- How to stub void methods with Mockito.
- How to test for exceptions with Mockito.
- How to query mock objects for their details.

  How to use the Mockito Argument Matchers.
  How to stub void methods with Mockito.
  How to test for exceptions with Mockito.
  How to query mock objects for their details.


### How to use the Mockito Argument Matchers
Mockito `ArgumentsMatchers` extension allows flexible stubbing or verification. Argument matchers allow you to write generic directives that respond to a wider range of values instead of hardcoding specific values. Importing the `ArgumentMatchers` class from Mockito gives you access Mockito's argument matchers.

`import static org.mockito.ArgumentMatchers.*;`

Many argument matchers are defined in the `ArgumentMatcher` class. I describe some of them below:
- `ArgumentMatchers.any()`: The `any` argument matcher receives an object of type `Class` as an argument. The `any` matcher performs a type check on whatever argument comes into the stubbed method. Mockito triggers a compile-time exception if the argument does not belong to the specified class.
Usage of `any` matcher is demonstrated as follows:

``` java
Student studentToSave = Student.builder()
                               .firstName("John")
                               .lastName("Doe")
                               .matricNo("MAT100419")
                               .password("securedPassword")
                               .registrationTime(LocalDateTime.now())
                               .gender(Gender.MALE).build();
when(studentRepository.save(any(Student.class))).thenReturn(studentToSave);
```

This means- for whatever Student object that you pass into the `studentRepository.save` method, return a specific object - studentToSave.
> You can use the  `isA` argument matcher in the same way as you use the `any` argument matcher.

This is demonstrated below:
`when(studentRepository.save(ArgumentMatchers.isA(Student.class))).thenReturn(student);`

- `ArgumentMatchers.anyString()`. `anyString` argument matcher also performs a type check on whatever argument comes into the stubbed method. If the argument is not a string then Mockito triggers a compile-time exception. Usage of the `anyString` argument matcher is demonstrated as follows:
```java
Student student = Student.builder()
                            .firstName("John")
                            .lastName("Doe")
                            .matricNo("MAT100419")
                            .password("securedPassword")
                            .gender(Gender.MALE).build();
when(studentRepository.findById(anyString())).thenReturn(Optional.of(student));
```
Some other argument matchers which can be used in similar ways to the argument matchers described above include:

- `anyInt()`
- `anyBoolean()`
- `anyByte()`
- `anySet()`
- `anyIterable()`
- `anyCollection()`


I suggest that you read the [Mockito Argument Matchers docs](https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/ArgumentMatchers.html) for further reading.

> It is important to note the following three points when using argument matchers:

1. You cannot use an argument matcher as the return value of our stubbed method. The return value of our stubbed method must always be a specific value.
2. You cannot use argument matchers outside verification or stubbing. In this case, Mockito will trigger an `InvalidUseOfMatchersException`
3. If you decide to stub a method that takes more than one argument with argument matchers, then all the arguments must be represented using matchers. If you want to want to use a specific in your stubbing directive then you must use the `eq` matcher. Usage of the `eq` matcher is demonstrated as follows:
   You cannot use an argument matcher as the return value of our stubbed method. The return value of our stubbed method must always be a specific value.
   You cannot use argument matchers outside verification or stubbing. In this case, Mockito will trigger an `InvalidUseOfMatchersException`
   If you decide to stub a method that takes more than one argument with argument matchers, then all the arguments must be represented using matchers. If you want to want to use a specific in your stubbing directive then you must use the `eq` matcher. Usage of the `eq` matcher is demonstrated as follows:

```java
Student student = Student.builder()
               .firstName("John")
               .lastName("Doe")
               .matricNo("MAT100419")
               .password("securedPassword")
               .gender(Gender.MALE).build();
when(studentRepository.findByStudentNameAndHostelName(eq("John Doe"), anyString())).thenReturn();
```

### How to stub void methods with Mockito
You can stub void methods using the following Mockito methods:

- `doNothing` - The `doNothing` directive is the default behaviour of all void methods. You can use the `doNothing` directive as follows:

`doNothing().when(studentRepository).save(any(Student.class))`

The above snippet is interpreted as- "**do nothing** **when** the mocked **studentRepository** is invoked with **any** student object". The `doNothing` directive is usually used with `ArgumentCaptor`s and `verify` directives.

- `doThrow` - The `doThrow` directive triggers an exception whenever you pass a certain parameter into your stubbed method. An example demonstrating the use of the `doThrow` directive is as follows:

`doThrow(NullPointerException.class).when(studentRepository).save(null)`

- `doAnswer` -You use the `doAnswer` stubbing directive when you want to return a value at the point of interaction with the mock object. Usage of the `doAnswer` directive is demonstrated below:

```java
Student student = Student.builder()
               .firstName("John")
               .lastName("Doe")
               .matricNo("MAT100419")
               .password("securedPassword")
               .registrationTime(getTime())
               .gender(Gender.MALE).build();

doAnswer(answer -> {
                    Student arg = answer.getArgument(0);
                    assertThat(arg, equalTo(student));
                    return null;
                    }).when(studentRepository).save(student);
studentRepository.save(student);
```
Java requires that lambdas return a value this is why there is a `return null` at the end of the lambda.

### How to test for error conditions with Mockito
It is vital to test that your application throws exceptions when specific error conditions are encountered. Mockito has the `thenThrow` and  `doThrow()`(which we have already seen) directives that allow us to direct our mock objects to throw exceptions.

The following snippet demonstrates the usage of `thenThrow` with the `when` directive:

```java
@Test
void testThatThrowsHostelManagementExceptionWhenANullOrEmptyStringIsPassedAsArgument() throws Exception {
    when(studentRepository.findById(null)).thenThrow(new HostelManagementException("User id cannot be null"));
    assertThrows(HostelManagementException.class, () -> studentRepository.findById(null));
}
```

### How to query mock objects for their details
Mockito’s static method - `mockingDetails` is used to determine if a mock object is a mock or a spy. It is important to know the details of mock objects used in our tests so that you know how to use them well. This skill is useful when on a group or company project.
### How to query mock objects for their details

Mockito’s static method - `mockingDetails` is used to determine if a mock object is a mock or a spy. It is important to know the details of mock objects used in our tests so that you know how to use them well. This skill is useful when on a group or company project.

The `mockingDetails` directive is demonstrated as follows:

- `assertTrue(mockingDetails(studentRepository).isMock())`


- `assertTrue(mockingDetails(hostelRepository).isSpy());`

### Conclusion
In  this tutorial, we have demonstrated the following:
- How to use Mockito’s argument matchers.
- How to test for error conditions using Mockito.
- How to test void methods using Mockito.
- How to determine the details of mock objects.

I hope that you enjoyed the tutorials and learnt something too. Please leave feedback on the article and the Github repository - [BedSpaces](https://github.com/ehizman/bedspaces). You can follow me on twitter on [@ehizman](https://twitter.com/ehizman_tutorEd). This will help me write more valuable content.

I look forward to hearing from you. Always code with &#10084;&#65039;.

### References
1. Mastering Unit Testing Using Mockito and JUnit- An advanced guide to mastering unit testing using Mockito and JUnit by Sujoy Acharya.
2. [Mocking Void Methods with Mockito](https://www.baeldung.com/mockito-void-methods)
3. [Forming Mockito grammar](https://stackoverflow.com/questions/11462697/forming-mockito-grammars)
4. [Mockito ArgumentMatchers](https://www.baeldung.com/mockito-argument-matchers)
5. [Mocktio Argument Matchers docs](https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/ArgumentMatchers.html)
