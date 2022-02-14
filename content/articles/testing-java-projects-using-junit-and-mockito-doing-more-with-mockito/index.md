### Introduction

How do we know that code works except by testing. Various forms of testing exist in software engineering. [Unit testing](https://en.wikipedia.org/wiki/Unit_testing) is the most vital form of testing. Unit testing offers a means to test the individual code components as isolated units. The key in unit testing is the isolation of program units.

[Mockito](https://site.mockito.org/) is the most popular mocking framework for Java projects today. Mockito offers intuitive matchers that allow programmers to mock the behaviours of dependencies.

The tutorial aims to guide readers on how to write effective unit tests using Mockito and JUnit. This tutorial is a continuation of [Testing Java Projects using JUnit and Mockito](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/), which gives an introduction to Mockito and guides readers on how to integrate Mockito into a Java project amongst other things. It is highly recommended that you read the earlier article before continuing.

### Prerequisite
As a prerequisite for this tutorial, you should have the following:

1. Basic knowledge of how to use the `when-then` directive to perform basic stubbing. If you are new to testing with Mockito or if you need a refresher, please visit my earlier tutorial-  [Testing Java Projects using JUnit and Mockito](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/).
2. An understanding of programming in Java.
3. A basic understanding of how to use [JUnit](https://en.wikipedia.org/wiki/JUnit) for unit tests.
4. Java Development Kit (JDK) [installed](https://www.oracle.com/java/technologies/downloads/) on your computer.
5. IntelliJ code editor [installed](https://www.jetbrains.com/idea/download/).
6. Maven [installed](https://maven.apache.org/).

The `StudentRepo` class shown below will be used as our system under test.

```java
@Slf4j
public class StudentRepo {
    private Map<String, Student> database = new HashMap<>();

    private void validate(String id) throws HostelManagementException {
        if (id == null || id.trim().equals("")){
            throw new Exception("invalid id provided");
        }
}

    public Student save(Student student) throws Exception {
        if (student == null){
            throw new NullEntityException("student object cannot be null");
        }
        database.put(student.getId(), student);
        return student;
}
```
`StudentRepo` contains two void methods- `validate` and `save`.

Method `validate` takes a string `id` as an argument. `validate` performs a check on `id`, if the `id` is `null` or is an empty string then an exception is raised with the message- “invalid id provided”.

Method `save` takes a `student` object as an argument. If the `student` object is null, then a `NullPointerException` is raised with the message- “student object cannot be null”. If the `student` object is not null, the `student` object is saved into the database, which is represented as a `HashMap`.

### Goals
You should understand the following after reading this tutorial:
- How to use the Mockito Argument Matchers.
- How to stub void methods with Mockito.
- How to test for exceptions with Mockito.
- How to query mock objects for their details.

### How to use the Mockito Argument Matchers
Mockito `ArgumentsMatchers` allow you to write generic directives that respond to a wider range of values instead of hardcoding specific values.

Consider the following test case- ‘testSaveMethod` in which we hardcode a `Student` object- `student` that our `save` method is expected to receive as an argument.

```java
@Mock
StudentRepo studentRepo;
// some parts are skipped for the sake of brevity

@Test
void testSaveMethod(){
    Student student = Student.builder()
                .firstName("John")
                .lastName("Doe")
                .matricNo("MAT100419")
                .password("securedPassword")
                .registrationTime(LocalDateTime.now())
                .gender(Gender.MALE).build();
    when(studentRepo.save(student)).thenReturn(student);
}
```

Using `ArgumentMatchers`, we can make our stubbing directives flexible enough to receive any argument that matches what is expected by our stubbed method:

```java
//some parts are skipped for the sake of brevity
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

The argument matcher- `any` above directs our mock `studentRepo` object to return `student` when its `save` method is called with any argument that is of type `Student`.

To use the `ArgumentMatchers` in your test class, you have to first import the ‘ArgumentMatchers` class from Mockito as follows:

`import static org.mockito.ArgumentMatchers.*;`

Many argument matchers are defined in the `ArgumentMatcher` class. Some of them are described below:
- `ArgumentMatchers.any()`: The `any` argument matcher receives an object of type `Class` as an argument. The `any` matcher performs a type check on whatever argument comes into the stubbed method. Mockito triggers a compile-time exception if the argument does not belong to the class expected by the stubbed method(for instance if our stubbed method is expecting to receive a `Student` object and we pass in an `Employee` object).

Usage of the `any` argument matcher is demonstrated as follows:

```java
@ExtendWith(MockitoExtension.class)// add the Mockito Extension to JUnit
@Slf4j //add Lombok’s logger
class StudentRepoTest {
    @Mock
    StudentRepo studentRepo;

    @Test
    void testSaveMethod() throws Exception {
    // create a student object using Lombok’s builder
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
* First, we created a mock object of StudentRepo
* Next, in our test case, we created a `Student` object- `student` using Lombok’s builder pattern.
* Using, our `when-then` directive, we stubbed the `save` method on our mock object (`studentRepo`) to accept any argument of type- `Student` and of type `String` and to the return `student` whenever it is called.
* Finally, we made the call to the save method and performed assertions on the return value of the `save` method

> You can use the  `isA` argument matcher in the same way as you use the `any` argument matcher.


The `isA` argument matcher has the same function as the `any` argument matcher.

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

- `ArgumentMatchers.anyString()`. Just like the `any` argument matcher, the `anyString` argument matcher also performs a type check on whatever argument comes into the stubbed method. Mockito triggers a compile-time error if a *non-string* is passed as an argument to the stubbed method.

To demonstrate the usage of the `anyString` argument matcher let us assume that our `save` method, which we defined earlier takes a string argument. Our test case will be as follows:
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
    Student returnedStudent = studentRepo.save(“John Doe”);
    log.info("Returned Student → {}", returnedStudent);
    assertThat(returnedStudent, hasProperty("firstName", equalTo("John")));
    assertThat(returnedStudent, hasProperty("lastName", equalTo("Doe")));
    assertThat(returnedStudent, hasProperty("matricNo", equalTo("MAT100419")));
    assertThat(returnedStudent, hasProperty("gender", equalTo(Gender.MALE)));
```
Some other argument matchers that can be used in similar ways to `any`, `isA` and `anyString` argument matchers include:

- `anyInt()`- The stubbed method accepts any argument that qualifies as an integer.
- `anyBoolean()`- The stubbed method accepts any argument that qualifies as a boolean.
- `anyByte()`- The stubbed method accepts any argument that qualifies as a byte.
- `anySet()`- The stubbed method accepts any argument that qualifies as a set.
- `anyIterable()`- The stubbed method accepts any argument that qualifies as an iterable(an iterable is any data structure that returns an iterator which can be iterated over such as a list, a set, a stack, a queue or a map).
- `anyCollection()`- The stubbed method accepts any argument that qualifies as a collection(a collection is a data structure that exists as an aggregation of related or unrelated items. Queues, Stacks, Maps, Lists and Sets are also collections).


You can read the [Mockito Argument Matchers docs](https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/ArgumentMatchers.html) for more information on mockito’s `ArgumentMatcher`.

> It is important to note the following two points when using argument matchers:

1. You cannot use an argument matcher as the return value of a stubbed method. The return value of our stubbed method must always be specific. In other words, you cannot do this:

`when(studentRepository.save(any(Student.class))).thenReturn(any(Student.class));`

Trying to use an argument matcher as the return value of a stubbed method induces the stubbed method to return a `null` value.

2. If you decide to stub a method that takes more than one argument with argument matchers, then all the arguments must be represented using matchers. If you want one of your arguments in your stubbing directive to be represented by a hard-coded value, then you must use the `eq` matcher.

To explain this, let us say that our say our `save` method takes two arguments:

```java
public Student save(Student student, String name) throws Exception {
    if (student == null){
        throw new NullPointerException("student object cannot be null");
    }
    log.info("Student {} saved into the database", name);
    database.put(student.getId(), student);
    return student;
}
```

We cannot use an argument matcher to represent one of the arguments is the stubbing directive as follows:

`when(studentRepo.save(any(Student.class), "John Doe")).thenReturn(any(Student.class))`.

If an argument matcher is used to represent one of the arguments in a stubbing directive, then all of the other arguments must be represented by argument matchers.
Imagine that our `save` method above, takes an object of class `Student` and a string as parameters. We want to direct the `save` method to perform an action when any `Student` object and a string equalling “John Doe” are passed as parameters. Our test case demonstrating usage of the `eq` argument matcher will be as follows:

`when(studentRepo.save(any(Student.class), eq("John Doe"))).thenReturn(any(Student.class))`

Now we are specifying that the second argument passed into the stubbed `save` method must equal “John Doe”. if we pass “John Mash” as an argument instead of “John Doe” in our method call, our stubbed method returns a `null` object.

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
> Output:
null

The above code snippet prints a `null` output because, in our `when- then` stubbing directive, we specified that when the `save` method is invoked on our mock `studentRepo` with any `Student` object and a string equalling “John Doe” as arguments. But in our method call, we are passing in “John Mash” as the second argument hence the `when- then` does not apply.

### How to stub void methods with Mockito
You can stub void methods using the following Mockito methods:

- `doNothing` - The `doNothing` directive is the default behaviour of all void methods. The `doNothing` directive is usually used with mockito’s `ArgumentCaptor` s or mockito’s `verify` method.

#### Using `doNothing()` with `ArgumentCaptor`
Let us say that we want to stub our save method which is defined as follows:

```java
public void save(Student student, String name) throws Exception {
    if (student == null){
        throw new NullPointerException("student object cannot be null");
    }
    log.info("Student {} saved into the database", name);
    database.put(student.getId(), student);
}
```
Our `save` method takes accepts two parameters- a `Student` object and a `String`. If the `Student` object is `null` then a `NullPointerException` is triggered. If the `Student` object is not null, then the `String` object is logged and then the `Student` object is saved in a map against its `id` field.

To write a test case for our `save` method, first, we have to import the `ArgumentCaptor` class as follows:

`import org.mockito.ArgumentCaptor;`

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

The  line that reads - `doNothing().when(studentRepo).save(studentArgumentCaptor.capture(), stringArgumentCaptor.capture());` is interpreted as- "**do nothing** **when** the mocked **studentRepository** is invoked with **any** student object".

#### Using `doNothing()` with `verify`
The `doNothing` directive can also be used with Mockito’s `verify` method.

The following code snippet demonstrates using Mockito’s `verify` method with the `doNothing` directive.

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
First, we direct the mock object- `studentRepo` to do nothing when it is called with arguments that match any `Student` object and any `String`.

Mockito’s `verify` method is used to verify that the `save` method is invoked when the actual call to the `save` method is made.

- `doThrow` - The `doThrow` directive triggers an exception whenever you pass a certain parameter into your stubbed method.
  To demonstrate how to use the `doThrow` directive, let us consider the following method receives a `student` object and a `string` object as parameters. The `save` method throws a `NullPointerException` if the `student` object is null:

``` java
public void save(Student student, String name) throws Exception {
  if (student == null){
    throw new NullEntityException("student object cannot be null");
  }
  log.info("Student {} saved into the database", name);
  database.put(student.getId(), student);
}
```
We can proceed to write a test case for our method that uses the `thenThrow` directive as follows:

``` java
@Test
void testDoThrow() throws Exception {
  doThrow(NullPointerException.class).when(studentRepo).save(any(), anyString());
  assertThrows(NullPointerException.class, ()->studentRepo.save(null, "John Doe"));
}
```

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
We can override the answer to any method by implementing the [Answer](https://javadoc.io/static/org.mockito/mockito-core/3.2.4/org/mockito/stubbing/Answer.html) interface, which has a method- `getArgument` that gives us access to the arguments passed into the stubbed method at invocation.

In our test case above, we know that our argument is a `Student` object. Since we know that only one argument is passed into our `save` method at invocation, we retrieve the value of the argument using the- `answer.getArgument(0)` method(0 refers to the first argument, 1 refers to the second argument and so on.) We assert that the value of the retrieved argument is equal to the value of `student` defined earlier in the test case.

### How to test for error conditions with Mockito
It is vital to test that your application throws exceptions when specific error conditions are encountered. Mockito has the `thenThrow` and  `doThrow()` (we have already seen how `doThrow` works) directives that allow us to direct our mock objects to throw exceptions when certain conditions are met.

To demonstrate the `theThrow` directive, let us write the `thenThrow` version of the test case in which we used the `doThrow` directive.

The following snippet demonstrates the usage of `thenThrow` with the `when` directive:

```java
 @Test
void testThenThrow() throws HostelManagementException {
    when(studentRepo.save(any(), anyString())).thenThrow(NullPointerException.class);
    assertThrows(NullPointerException.class, ()->studentRepo.save(null, "John Doe"));
}
```

### How to query mock objects for their details
Mockito’s static method - `mockingDetails` is used to determine if a mock object is a mock or a spy. It is important to know the details of mock objects used in our tests so that you know how to use them well. This skill is useful when on a group or company project.

The `mockingDetails` directive is demonstrated as follows:
Let us say that we define a mock object and a spy object as follows:

``` java
@Mock
StudentRepoMock studentRepoMock
@Spy
StudentRepoSpy studentRepoSpy
//some parts are skipped for brevity sake

@Test
void demonstrateMockingDetails(){
  System.out.println(“Is a mock object?- ” + mockingDetails(studentRepository).isMock());
  System.out.println(“Is a spy object?- ” +mockingDetails(hostelRepository).isSpy());
}
```
This produces the output:

```
Is a mock object?- true
Is a spy object?- true
```

### Conclusion
In  this tutorial, we have demonstrated the following:
- How to use Mockito’s argument matchers.
- How to test for error conditions using Mockito.
- How to test void methods using Mockito.
- How to determine the details of mock objects.

I hope that you enjoyed the tutorials and learnt something too. Please leave feedback on the article. You can follow me on Twitter on [@ehizman](https://twitter.com/ehizman_tutorEd). This will help me write more valuable content.

I look forward to hearing from you. Always code with &#10084;&#65039;.

### References
1. Mastering Unit Testing Using Mockito and JUnit- An advanced guide to mastering unit testing using Mockito and JUnit by Sujoy Acharya.
2. [Mocking Void Methods with Mockito](https://www.baeldung.com/mockito-void-methods)
3. [Forming Mockito grammar](https://stackoverflow.com/questions/11462697/forming-mockito-grammars)
4. [Mockito ArgumentMatchers](https://www.baeldung.com/mockito-argument-matchers)
5. [Mocktio Argument Matchers docs](https://javadoc.io/static/org.mockito/mockito-core/3.3.3/org/mockito/ArgumentMatchers.html)
