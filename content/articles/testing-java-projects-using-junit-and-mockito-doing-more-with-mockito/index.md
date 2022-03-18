---
layout: engineering-education
status: publish
published: true
url: /testing-java-projects-using-junit-and-mockito-doing-more-with-mockito/
title: Testing Java Projects using JUnit and Mockito - Part 2
description: This tutorial will help the reader understand JUnit and Mockito. You will also learn about argument matchers, dealing with exceptions, stubbing void methods, and querying mock objects.
author: ehis-edemakhiota
date: 2022-02-25T00:00:00-08:24
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/testing-java-projects-using-junit-and-mockito-doing-more-with-mockito/hero.jpg
   alt: Testing Java Projects using JUnit and Mockito - Part 2 Example Image
---
[Unit testing](https://en.wikipedia.org/wiki/Unit_testing) is the most vital form of testing. Unit testing offers a method to test the individual code components as isolated units. The key in unit testing is the isolation of program units.
<!--more-->
[Mockito](https://site.mockito.org/) is one of the most popular mocking frameworks for Java projects. It offers intuitive matchers that allow programmers to mock the behaviors of dependencies.

The tutorial aims to guide readers on how to write effective unit tests using Mockito and JUnit.

This tutorial is a continuation of [Testing Java Projects using JUnit and Mockito](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/), which gives an introduction to Mockito and guides readers on how to integrate Mockito into a Java project amongst other things. It is highly recommended that you read it before continuing further.

### Pre-requisites
As a pre-requisite, the reader should have the following:
- Basic knowledge of how to use the `when-then` directive to perform basic stubbing. If you are new to testing with Mockito or if you need a refresher, please visit my earlier tutorial [here](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/).
- A basic understanding of how to work with Java.
- A basic understanding of how to use [JUnit](https://en.wikipedia.org/wiki/JUnit) for unit testing.
- To have [Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/) installed on your computer.
- To have [IntelliJ](https://www.jetbrains.com/idea/download/) code editor installed.
- To have [Maven](https://maven.apache.org/) installed.

### Goals
After reading this tutorial, the reader should have a good understanding of the following:
- How to use the Mockito Argument Matchers.
- How to stub void methods with Mockito.
- How to test for exceptions with Mockito.
- How to query mock objects for their details.

Before we get started, you must read about the example of the Hostel management system that we used in our [previous tutorial](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/).

The system under test is for a hostel management system that supports the following actions:
- Students can register on the system.
- Students can request a bed space.
- Finding all students in a Hostel by providing the name of the Hostel.
- Find all students in a room by providing the room id.

### How to use the Mockito argument matchers
Mockito `ArgumentsMatchers` allow you to write generic directives that respond to a wider range of values instead of hardcoding specific values.

Consider the following test case - `testSaveMethod` in which we hardcode a `Student` object - `student` that our `save` method is expected to receive as an argument.

Using `ArgumentMatchers`, we can make our stubbing directives flexible enough to receive any argument that matches what is expected by our stubbed method:

```java
// some parts are skipped for the sake of brevity
@Mock
StudentRepo studentRepo;

@Test
void testSaveMethod(){
  Student student = Student.builder()
  .firstName("John")
  .lastName("Doe")
  .matricNo("MAT100419")
  .password("securedPassword")
  .registrationTime(LocalDateTime.now())
  .gender(Gender.MALE).build();
  when(studentRepo.save(any(Student.class))).thenReturn(student);
  }
```

The argument matcher `any` directs our mock `studentRepo` object to return `student` when its `save` method is called with any argument that is of type `Student`.

To use the `ArgumentMatchers` in your test class, you have to first import the 'ArgumentMatchers` class from Mockito as follows:

```jave
import static org.mockito.ArgumentMatchers.*;
```
Many argument matchers can be defined in the `ArgumentMatcher` class. Some of them are described below:

#### ArgumentMatchers.any()
The `any` argument matcher receives an object of type `Class` as an argument. It performs a type check on whatever argument comes into the stubbed method.

Mockito triggers a compile-time exception if the argument does not belong to the class expected by the stubbed method. For instance, if our stubbed method is expecting to receive a `Student` object and we pass in an `Employee` object.

Usage of the `any` argument matcher is demonstrated as follows:

```java
@ExtendWith(MockitoExtension.class)// add the Mockito Extension to JUnit
@Slf4j //add Lombok's logger
class StudentRepoTest {
  @Mock
  StudentRepo studentRepo;

  @Test
  void testSaveMethod() throws Exception {
    // create a student object using Lombok's builder
    Student student = Student.builder()
      .firstName("John")
      .lastName("Doe")
      .matricNo("MAT100419")
      .password("securedPassword")
      .registrationTime(LocalDateTime.now())
      .gender(Gender.MALE).build();
    when(studentRepo.save(any(Student.class), anyString())).thenReturn(student);
    Student returnedStudent = studentRepo.save(student, student.getName());
    log.info("Returned Student → {}", returnedStudent);
    assertThat(returnedStudent, hasProperty("firstName", equalTo("John")));
    assertThat(returnedStudent, hasProperty("lastName", equalTo("Doe")));
    assertThat(returnedStudent, hasProperty("matricNo", equalTo("MAT100419")));
    assertThat(returnedStudent, hasProperty("gender", equalTo(Gender.MALE)));
  }
}
```

In the above code snippet:
- First, we created a mock object of `StudentRepo`.
- Next, in our test case, we created a `Student` object `student` using Lombok's `builder` pattern.
- Using the `when-then` directive, we stubbed the `save` method on our mock object `studentRepo` to accept any argument of type  `Student` and type `String`, to the returning `student` whenever it is called.
- Finally, we made the call to the save method and performed assertions on the return value of the `save` method.

> You can use the `isA` argument matcher in the same way as you use the `any` argument matcher.

The `isA` argument matcher has the same functionality as the `any` argument matcher.

Usage of the `isA` argument matcher is demonstrated below:

```java
@ExtendWith(MockitoExtension.class)
class StudentRepoTest {
  @Mock
  StudentRepo studentRepo;
  @Test
  void testSaveMethod() throws Exception {
    Student student = Student.builder()
      .firstName("John")
      .lastName("Doe")
      .matricNo("MAT100419")
      .password("securedPassword")
      .registrationTime(LocalDateTime.now())
      .gender(Gender.MALE).build();
    when(studentRepo.save(isA(Student.class))).thenReturn(student);
    Student returnedStudent = studentRepo.save(student);
    log.info("Returned Student → {}", returnedStudent);
    assertThat(returnedStudent, hasProperty("firstName", equalTo("John")));
    assertThat(returnedStudent, hasProperty("lastName", equalTo("Doe")));
    assertThat(returnedStudent, hasProperty("matricNo", equalTo("MAT100419")));
    assertThat(returnedStudent, hasProperty("gender", equalTo(Gender.MALE)));
  }
}
```

#### ArgumentMatchers.anyString()
Just like the `any` argument matcher, the `anyString` argument matcher also performs a type check on whatever argument comes into the stubbed method.

Mockito triggers a compile-time error if a *non-string* is passed as an argument to the stubbed method.

To demonstrate the usage of the `anyString` argument matcher, let us assume that our `save` method that we defined earlier takes a string argument. Then, our test case will be as follows:

```java
//some parts are skipped for the sake of brevity
@Test
void testSaveMethod() throws Exception {
  Student student = Student.builder()
  .firstName("John")
  .lastName("Doe")
  .matricNo("MAT100419")
  .password("securedPassword")
  .registrationTime(LocalDateTime.now())
  .gender(Gender.MALE).build();
  when(studentRepo.save(anyString())).thenReturn(student);
  Student returnedStudent = studentRepo.save("John Doe");
  log.info("Returned Student → {}", returnedStudent);
  assertThat(returnedStudent, hasProperty("firstName", equalTo("John")));
  assertThat(returnedStudent, hasProperty("lastName", equalTo("Doe")));
  assertThat(returnedStudent, hasProperty("matricNo", equalTo("MAT100419")));
  assertThat(returnedStudent, hasProperty("gender", equalTo(Gender.MALE)));
```

Some other argument matchers that can be used in similar ways to `any`, `isA` and `anyString` argument matchers include:
- `anyInt()` - The stubbed method accepts any argument that qualifies as an integer.
- `anyBoolean()` - The stubbed method accepts any argument that qualifies as a boolean.
- `anyByte()` - The stubbed method accepts any argument that qualifies as a byte.
- `anySet()` - The stubbed method accepts any argument that qualifies as a set.
- `anyIterable()` - The stubbed method accepts any argument that qualifies as an iterable (an iterable is any data structure that returns an iterator which can be iterated over such as a list, a set, a stack, a queue or a map).
- `anyCollection()` - The stubbed method accepts any argument that qualifies as a collection (a collection is a data structure that exists as an aggregation of related or unrelated items. Queues, Stacks, Maps, Lists and Sets are also collections).

You can read the [Mockito Argument Matchers documentation](https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/ArgumentMatchers.html) for more information on mockito's `ArgumentMatcher`.

It is important to note the following two points when using argument matchers:
1. You cannot use an argument matcher as the return value of a stubbed method. The return value of the stubbed method must always be specific. In other words, you cannot do this:

`when(studentRepository.save(any(Student.class))).thenReturn(any(Student.class));`

Trying to use an argument matcher as the return value of a stubbed method induces the stubbed method to return a `null` value.

2. If you decide to stub a method that takes more than one argument with argument matchers, then all the arguments must be represented using matchers. If you want one of your arguments in your stubbing directive to be represented by a hard-coded value, then you must use the `eq` matcher.

To explain this, let us say that our `save` method takes two arguments:

```java
public Student save(Student student, String name) throws Exception {
  if (student == null) {
  throw new NullPointerException("student object cannot be null");
  }
  log.info("Student {} saved into the database", name);
  database.put(student.getId(), student);
  return student;
  }
```

We cannot use an argument matcher to represent one of the arguments is the stubbing directive as follows:

```jave
when(studentRepo.save(any(Student.class), "John Doe")).thenReturn(any(Student.class))
```
If an argument matcher is used to represent one of the arguments in a stubbing directive, then all of the other arguments must be represented by argument matchers.

Imagine that the `save` method above takes an object of class `Student` and a string as parameters. Now, we want to direct the `save` method to perform an action when any `Student` object and a string equalling "John Doe" are passed as parameters.

The test case demonstrating usage of the `eq` argument matcher will be as follows:

```jave
when(studentRepo.save(any(Student.class), eq("John Doe"))).thenReturn(any(Student.class))
```

Now, we are specifying that the second argument passed into the stubbed `save` method must be equal to "John Doe". If we pass "John Mash" as an argument instead of "John Doe" in our method call, our stubbed method returns a `null` object.

```java
@Test
void testSaveMethod() throws HostelManagementException {
  Student student = Student.builder()
  .firstName("John")
  .lastName("Doe")
  .matricNo("MAT100419")
  .password("securedPassword")
  .registrationTime(LocalDateTime.now())
  .gender(Gender.MALE).build();
  when(studentRepo.save(any(Student.class), eq("John Doe"))).thenReturn(student);
  Student returnedStudent = studentRepo.save(student, "John Mash");
  System.out.println(returnedStudent);
  }
```

**Output:**

```bash
null
```

The above code snippet prints a `null` output because, in our `when-then` stubbing directive, we specified that when the `save` method is invoked on our mock `studentRepo` with any `Student` object and a string equalling "John Doe" as arguments.

But, since we are passing in "John Mash" as the second argument hence the `when-then` does not apply.

### How to stub void methods with Mockito
You can stub void methods using the following Mockito methods:

- `doNothing` - The `doNothing` directive is the default behavior of all void methods. The `doNothing` directive is usually used with mockito's `ArgumentCaptor` or mockito's `verify` method.

#### Using doNothing() with ArgumentCaptor
Let us say that we want to stub our `save` method which is defined as follows:

```java
public void save(Student student, String name) throws Exception {
  if (student == null) {
  throw new NullPointerException("student object cannot be null");
  }
  log.info("Student {} saved into the database", name);
  database.put(student.getId(), student);
  }
```

The `save` method takes two parameters - a `Student` object and a `String`.

If the `Student` object is `null` then a `NullPointerException` is triggered. If the `Student` object is not null, then the `String` object is logged and then the `Student` object is saved in a map against its `id` field.

To write a test case for our `save` method, first, we have to import the `ArgumentCaptor` class as follows:

```java
import org.mockito.ArgumentCaptor;
```

Next, we create an argument captor for the class of objects that we want to capture:

```java
@Captor
ArgumentCaptor<Student> studentArgumentCaptor;
```

In the snippet above, we created an argument capture for the `Student` class.

We can now proceed to use the `doNothing` directive in our test case as follows:

```java
@Test
void testDoNothingDirective() throws Exception {
    Student student = Student.builder()
                .firstName("John")
                .lastName("Doe")
                .matricNo("MAT100419")
                .password("securedPassword")
                .gender(Gender.MALE)
                .registrationTime(LocalDateTime.now())
                .build();
    doNothing().when(studentRepo).save(studentArgumentCaptor.capture(), stringArgumentCaptor.capture());
    studentRepo.save(student, student.getName());
    Student capturedStudent = studentArgumentCaptor.getValue();
    String capturedString = stringArgumentCaptor.getValue();
    assertThat(capturedStudent, hasProperty("firstName", equalTo("John")));
    assertThat(capturedStudent, hasProperty("lastName", equalTo("Doe")));
    assertThat(capturedStudent, hasProperty("matricNo", equalTo("MAT100419")));
    assertThat(capturedStudent, hasProperty("gender", equalTo(Gender.MALE)));
    assertThat(capturedString, equalTo("John Doe"));
}
```

The  line that reads - `doNothing().when(studentRepo).save(studentArgumentCaptor.capture(), stringArgumentCaptor.capture());` is interpreted as "*do nothing when* the mocked `studentRepository` is invoked with `any` student object".

#### Using `doNothing()` with `verify`
The `doNothing` directive can also be used with Mockito's `verify` method.

The following code snippet demonstrates using Mockito's `verify` method with the `doNothing` directive:

```java
@Test
void testDoNothingDirectiveWithVerify() Exception {
    Student student = Student.builder()
                .firstName("John")
                .lastName("Doe")
                .matricNo("MAT100419")
                .password("securedPassword")
                .gender(Gender.MALE)
                .registrationTime(LocalDateTime.now())
                .build();
    doNothing().when(studentRepo).save(any(Student.class), anyString());
    studentRepo.save(student, student.getName());
    verify(studentRepo, times(1)).save(student, student.getName());
}
```

First, we direct the mock object `studentRepo` to do nothing when it is called with arguments that match any `Student` object and any `String`.

Mockito's `verify` method is used to verify that the `save` method is invoked when the actual call to the `save` method is made.

##### doThrow
The `doThrow` directive triggers an exception whenever you pass a certain parameter into your stubbed method.

To demonstrate how to use the `doThrow` directive, let us consider the following method receives a `student` object and a `string` object as parameters.

The `save` method throws a `NullPointerException` if the `student` object is null:

``` java
public void save(Student student, String name) throws Exception {
  if (student == null) {
    throw new NullEntityException("student object cannot be null");
  }
  log.info("Student {} saved into the database", name);
  database.put(student.getId(), student);
}
```

##### thenThrow
It is vital to test that your application throws exceptions when specific error conditions are encountered. Mockito has the `thenThrow()` and  `doThrow()` directives that allow us to direct our mock objects to throw exceptions when certain conditions are met.

To demonstrate the `theThrow` directive, let us write the `thenThrow` version of the test case in which we used the `doThrow` directive.

The following snippet demonstrates the usage of `thenThrow` with the `when` directive:

``` java
@Test
void testDoThrow() throws Exception {
  doThrow(NullPointerException.class).when(studentRepo).save(any(), anyString());
  assertThrows(NullPointerException.class, ()->studentRepo.save(null, "John Doe"));
}
```

##### doAnswer
You use the `doAnswer` stubbing directive when you want to return a value at the point of interaction with the mock object. Usage of the `doAnswer` directive is demonstrated below:

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

We can override the answer to any method by implementing the [Answer](https://javadoc.io/static/org.mockito/mockito-core/3.2.4/org/mockito/stubbing/Answer.html) interface which has a method `getArgument` that gives us access to the arguments passed into the stubbed method at invocation.

In our test case above, we know that our argument is a `Student` object.

Since we know that only one argument is passed into our `save` method at invocation, we retrieve the value of the argument using the `answer.getArgument(0)` method (`0` refers to the first argument, `1` refers to the second argument and so on.) We assert that the value of the retrieved argument is equal to the value of `student` defined earlier in the test case.

### How to query mock objects for their details
Mockito's static method `mockingDetails` is used to determine if a mock object is a mock or a spy.

It is important to know the details of mock objects used in our tests so that you know how to use them well. This skill is useful when on a group or company project.

Let us say that we define a mock object and a spy object as follows:

``` java
@Mock
StudentRepoMock studentRepoMock
@Spy
StudentRepoSpy studentRepoSpy
//some parts are skipped for brevity sake

@Test
void demonstrateMockingDetails() {
  System.out.println("Is a mock object?- " + mockingDetails(studentRepository).isMock());
  System.out.println("Is a spy object?- " +mockingDetails(hostelRepository).isSpy());
}
```

**Output:**

```bash
Is a mock object?- true
Is a spy object?- true
```

### Conclusion
In this tutorial, we have demonstrated the following:
- How to use Mockito's argument matchers.
- How to test for error conditions using Mockito.
- How to test void methods using Mockito.
- How to determine the details of mock objects.

I hope that you enjoyed this tutorial and learned something. Please consider leaving feedback on the article below. You can follow me on Twitter [@ehizman](https://twitter.com/ehizman_tutorEd). This will help me write more valuable content.

You can find the code for this tutorial [here](https://github.com/ehizman/bedspaces).

I look forward to hearing from you. Always code with &#10084;&#65039;.

### References
- [Mastering Unit Testing Using Mockito and JUnit by Sujoy Acharya](https://www.amazon.com/Mastering-Testing-Using-Mockito-JUnit-ebook/dp/B00LUGB048)
- [Mocking Void Methods with Mockito](https://www.baeldung.com/mockito-void-methods)
- [Forming Mockito grammar](https://stackoverflow.com/questions/11462697/forming-mockito-grammars)
- [Mockito ArgumentMatchers](https://www.baeldung.com/mockito-argument-matchers)
- [Mockito Argument Matchers docs](https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/ArgumentMatchers.html)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)