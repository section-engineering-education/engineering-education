---
layout: engineering-education
status: publish
published: true
url: /mocking-with-junit-and-mockito-the-why-and-how/
title: Testing Java Projects using JUnit and Mockito
description: This tutorial will help the reader understand JUnit and Mockito. It will also demonstrate how to use these concepts to test Java projects.
author: ehis-edemakhiota
date: 2022-01-18T00:00:00-14:11
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/mocking-with-junit-and-mockito-the-why-and-how/hero.png
    alt: Mocking with JUnit and Mockito - The Why and How
---
The essence of unit testing is to verify that our code works regardless of its dependencies. 
<!--more-->
Imagine that we want to write a mock test for a service that depends on a database to process orders.

To test our service, we can use a mock implementation of a database instead of having to use an actual database. 

This is possible since we know how an actual database behaves in different scenarios. Mocking enables us to test code independent of its dependencies. As a result, we can achieve introspection and code isolation.

In this tutorial, we will test the service class of a Hostel Management System built using:
- Java
- [Hamcrest](http://hamcrest.org) - A framework that provides intuitive matchers for testing.
- [JUnit5](https://junit.org/junit5/) - A Java test engine.
- [AssertJ](https://github.com/assertj/assertj-core) - A library that provides fluent assertions for Java unit tests. We use AssertJ in this project because Hamcrest does not offer an intuitive API for testing exceptions.
- [Spark web framework](https://sparkjava.com/) - A lightweight Java web framework for exposing API endpoints.

You can find the project in this [repository](https://github.com/ehizman/bedspaces).

### Prerequisites
As a prerequisite for this tutorial, the reader should have the following:
- An understanding of Java programming language.
- A basic knowledge of how to use Data Transfer Objects (DTOs) to receive requests and send out responses.
- A basic knowledge of how to use the [ModelMapper](http://modelmapper.org/) for mapping models to each other.
- Knowledge of how to use [Lombok](https://projectlombok.org/) and its associated methods.
- A basic understanding of how to use [JUnit](https://en.wikipedia.org/wiki/JUnit) for unit tests.
- Java Development Kit (JDK) [installed](https://www.oracle.com/java/technologies/downloads/) on your computer.
- IntelliJ code editor [installed](https://www.jetbrains.com/idea/download/).
- Maven [installed](https://maven.apache.org/).
- Internet access to download other Maven dependencies.

### Goals
At the end of this tutorial, the reader should understand the following:
1. How mock objects work, as well as the different methods used by mocking frameworks.
2. Why mocking is essential.
3. How to integrate Mockito dependency into a Java project.
4. How to use simple Mockito stubbing mechanisms.
5. How to verify method invocation using `Mockito.verify`
6. How to use `ArgumentCaptor` for verifying arguments passed to stubbed methods.
7. How to create user-defined responses from mocks using the `Answer` interface.

### Why mocking is essential
A test double is a mock implementation of an external dependency used to test a system's interaction with the external dependency. 

In Mockito, we generally refer to all kinds of test doubles as mocks, but in reality, they can fall into one of the following three categories: stubs, mocks, and spies.

| Type |                                                        Description                                                         |
|------|:--------------------------------------------------------------------------------------------------------------------------:|
| Stub | A *stub* is an object that always returns a specified value regardless of which parameters we pass into the stub's methods |
| Mock |    A *mock* is an object whose behavior - in the form of parameters and return values - we declare before running a test    |
| Spy  |           A *spy* is an object that logs interactions. Spies are useful for verifying interactions with a system           |

Mockito supports the creation of mock objects and spies. Mocking is a powerful concept in testing across languages. Without mocking:

- It will take much boilerplate code to set up some system dependencies (web servers, databases, and services that require calls made over the internet) for testing our system.
- The execution of the test suite will also be slow.
- It will be impossible to test error conditions, exceptions, and functions that perform time-consuming tasks such as deleting files.

Disadvantages of mocks include:
- Mocking systems make our test classes run slowly since they depend on [reflection](https://en.wikipedia.org/wiki/Reflective_programming)
- Over mocking leads to over-abstraction. This makes our code extremely complicated.

[Robert C. Martin](https://en.wikipedia.org/wiki/Robert_C._Martin) suggests mocking sparingly. He recommends that we "mock across architecturally significant boundaries, but not within those boundaries." 

He means that we should only mock out the database, web servers, and any other external service. 

For example, parts of our code that interact with SMTP servers to send emails or perform I/O operations.

### How mock objects work
This [article on devopedia](https://devopedia.org/mock-testing) suggests that there are two types of mocking frameworks - Proxy-based and Classloader remapping-based frameworks.

In Proxy-based mocking, a proxy object imitates the actual object. We inject the proxy object as a dependency through either the constructor or the setter. 

Dependency Injection (DI) frameworks such as Spring utilize this form of mocking. It is also used by frameworks such as *EasyMock*, *JMock*, and *Mockito*.

However, this type of mocking is limited when it comes to static/private/final methods or final classes.

In classloader remapping-based mocking, the `.class` file of a dependency is remapped to the `.class` file of the mock object by the class-loader.

Therefore, when a dependency is required the mock object is loaded instead of the actual object. Mocking frameworks such as *JMockit* and *PowerMock* support this form of mocking.

Classloader remapping-based mocking can mock static/private/final methods or final classes, unlike proxy-based mocking.

### Mockito in use
This section demonstrates the use of Mockito while building a Hostel Management System. The system supports the following actions:
- Students can register on the system.
- Students can request a bed space.
- You can find all students in a Hostel by providing the name of the Hostel.
- You can find all students in a room by providing the room id.

The domain classes used in this program are *Hostel, Room, Student, HostelName, BedSpace, and Gender*.

The system's class diagrams are as shown below:

![hostel-management-system-class-diagram](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/hostel-management-system-class-diagram.png)

> *Hostel* represents a real-world Hostel.

- The system comprises two male hostels and two female hostels.
- Each *Hostel* consists of twenty *Rooms*.
- Each *Room* consists of four *Bedspaces*.

The `HostelRepository` exists as an array of `Hostel` objects, and the `StudentRepository` is a map of student `matricNo: student-object` pairs.

The `StudentServiceImpl` class is dependent on the `StudentRespository` class and the `HostelRepository` class.

### Setting up Mockito
To use Mockito, we first need to add the following dependencies to our ```pom.xml``` file:

```xml
<dependencies>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
        <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.assertj</groupId>
      <artifactId>assertj-core</artifactId>
      <version>3.21.0</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.mockito</groupId>
      <artifactId>mockito-core</artifactId>
      <version>4.1.0</version>
      <scope>test</scope>
    </dependency>
</dependencies>
```

**The following methods describe the different ways of using Mockito:**

#### Using plain Mockito to create mocks
We can create mock manually using [Mockito::mock](http://static.javadoc.io/org.mockito/mockito-core/2.2.28/org/mockito/Mockito.html#mock(java.lang.Class)).

```java
private HostelRepository hostelRepository = Mockito.mock(HostelRepository.class);
private StudentRepository studentRepository = Mockito.mock(StudentRepository.class);
private StudentService studentService = new StudentService(hostelRepository, studentRepository);
```

In the above example, we mocked the `HostelRepository` and `StudentRepository`. Then, we passed the mock objects into the constructor of the `StudentService` (the system under test).

#### Initializing Mocks with Mockito Annotations
The [MockitoAnnotations::initMocks](https://static.javadoc.io/org.mockito/mockito-core/2.2.28/org/mockito/MockitoAnnotations.html) is used to create mocks programmatically by annotating the objects to mock with the [@Mock](https://static.javadoc.io/org.mockito/mockito-core/2.2.28/org/mockito/Mock.html) annotation. 

We use Mockito annotations when we have several dependencies to mock.

```java
class StudentServiceImpl_StubbingTests {
    private StudentService studentService;
    @Mock
    private StudentRepository studentRepository;
    @Mock
    private HostelRepository hostelRepository;
    private RegistrationDto registrationRequest;
    private Student student;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        studentService = new StudentServiceImpl(studentRepository, hostelRepository);
    }
    //test cases excluded for the sake of brevity
}
```

We create mocks using the `@Mock` annotation on fields that we intend to mock. 

To initialize our mocks, we call `MockitoAnnotations.openMocks(this)` in the `@BeforeEach` section before injecting the mocks into the constructor of our service.

#### Using JUnit Jupiter's MockitoExtension
[JUnit 5](https://junit.org/junit5/) provides the [org.mockito:mockito-JUnit-jupiter](https://search.maven.org/search?q=g:org.mockito%20AND%20a:mockito-junit-jupiter) extension.

To use the extension, we add the following dependency to our `pom.xml` file.

```xml
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>3.12.4</version>
    <scope>test</scope>
</dependency>
```

> This single dependency replaces both the `mockito core` and the `junit` dependencies defined above.

We then add `@ExtendWith(MockitoExtension.class)` to the test class and annotate fields that we want to mock with the `@Mock`  annotation.

The Mockito extension makes our test classes neat and concise, as shown below:

```java
@ExtendWith(MockitoExtension.class)
class StudentServiceImpl_StubbingTests {
    private StudentService studentService;
    @Mock
    private StudentRepository studentRepository;
    @Mock
    private HostelRepository hostelRepository;
    private RegistrationDto registrationRequest;
    private Student student;

    @BeforeEach
    void setUp() {
        //we inject the mocks into the studentServiceImpl
        studentService = new StudentServiceImpl(studentRepository, hostelRepository);
    }
    //test cases excluded for the sake of brevity
}
```

#### Using @InjectMocks with Spring
When using Spring, we can inject a mock object into Spring's `ApplicationContext` making use of the `@MockBean` annotation:

```java
@ExtendWith(MockitoExtension.class)
class StudentServiceImplTest {
    @MockBean
    private StudentRepository studentRepository;
    @MockBean
    private HostelRepository hostelRepository;
    @InjectMocks
    private StudentService studentService;

    //test cases excluded for the sake of brevity
}
```

> `@MockBean` is a SpringBoot annotation. Spring automatically injects the mock object as a replacement for the actual object wherever a dependency of an appropriate bean is required.

### Knowing when to use Mockito.mock and @MockBean from Springboot
We use `Mockito.mock` when our test does not rely on the `SpringBoot` container. `Mockito.mock` is fast and ensures the isolation of each test component.

We use `@MockBean` from SpringBoot when our test relies on the SpringBoot container, and when we want to mock one of the container's beans. 

Typical usage of SpringBoot `@MockBean` is in writing controller tests with test classes annotated with `@WebMvcTest`.

### Defining the behavior of mock objects
We use stubbing operations to define the behaviors of mock objects. The simple stubbing directive `when(something).thenReturn(somethingElse)` allows us to return a given value whenever we invoke a specific method.

The `when()` method represents a *trigger*. The `when` trigger does not work when the method is void.

We can import `Mockito.when` as follows:

```java
import static org.mockito.Mockito.when;
```

There are several use cases for the `when-then` directive:

1. `when- thenReturn()` - This stubbing directive returns a particular hardcoded value whenever we invoke a specific method on a mock object.

To demonstrate the `when- theReturn()` directive, let us consider the *student can register* use-case of our hostel management system.

![register-student-activity-diagram](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/register-student-activity.png)

The `registerStudent` method code snippet is shown below:

```java
@Override
public StudentDto registerStudent(RegistrationRequest registrationRequest) throws Exception {
    Optional<Student> optionalStudent = studentRepository.findById(registrationRequest.matricNo());
    if (optionalStudent.isPresent()){
        throw new HostelManagementException("Matric number is not unique");
    }
    Student student = ModelMapperConfig.getMapper().map(registrationRequest, Student.class);
    student = studentRepository.save(student);
    return ModelMapperConfig.getMapper().map(student, StudentDto.class);
}
```

The test case code snippet for `registerStudent` method is as follows:

```java
@Test
void registerStudentTest() throws Exception {
    RegistrationRequest registrationRequest = new RegistrationRequest(" John", "Doe","securedPassword","MAT100419", Gender.MALE);
    Student studentToSave = Student.builder()
                                .firstName("John")
                                .lastName("Doe")
                                .matricNo("MAT100419")
                                .password("securedPassword")
                                .gender(Gender.MALE).build();

    when(studentRepository.save(any(Student.class))).thenReturn(studentToSave);

    StudentDto studentDto = studentService.registerStudent(registrationRequest);

    assertThat(studentDto, hasProperty("firstName", equalTo("John")));
    assertThat(studentDto, hasProperty("lastName", equalTo("Doe")));
    assertThat(studentDto, hasProperty("matricNo", equalTo("MAT100419")));
    assertThat(studentDto, hasProperty("gender", equalTo(Gender.MALE)));
}
```

The `save` method in the `studentRepository` class is stubbed to return `studentToSave` object whenever we invoke the `save` method.

> The `any(Student.class)` [Mockito Argument Matcher](https://javadoc.io/doc/org.mockito/mockito-core/latest/org/mockito/ArgumentMatchers.html) means that whenever we invoke the `save` method with any object of the `Student` class, the mock `studentRepository` will return `studentToSave` object.


2. `when- thenThrow(e)` - This throws an exception whenever we invoke the stubbed method. To explain how `when- thenThrow` works, let us stub the `save` method in our `StudentRepository`, as demonstrated below:

```java
public Student save(Student student) throws HostelManagementException {
    if (student == null){
    throw new NullEntityException("student object cannot be null");
    }
    database.put(student.getId(), student);
    return student;
}
```

We can direct our mock `studentRepository` to throw a `NullEntityException` whenever a null object is passed into the `save` method as follows:

```java
when(studentRepository.save(null)).thenThrow(NullPointerException.class);
```

3. `thenAnswer(Answer answer)` - Instead of returning a hard-coded value, we can use the `thenAnswer(Answer answer)` stubbing method to return a user-defined value computed at runtime. In this case, `Answer` is an interface. 

To demonstrate the usage of the `thenAnswer()` stubbing method, let us add a `registrationTime` field of type `LocalDateTime` to our `Student` model.

`thenAnswer` makes sense in this scenario because we want our mock to return the exact time a student registered.

To do this:

First, we declare a variable `time` in our test class and initialize it to `null` in our `@BeforeEach`.

```java
@ExtendWith(MockitoExtension.class)
class StudentServiceImpl_StubbingTests {
private StudentService studentService;

@Mock
private StudentRepository studentRepository;

@Mock
private HostelRepository hostelRepository;
private LocalDateTime time;

    @BeforeEach
    void setUp() {
        time = null;
        studentService = new StudentServiceImpl(studentRepository, hostelRepository);
    }
}
```

Next, we create a getter method called `getTime` that will return the value of the `time` variable whenever it is called:

```java
private LocalDateTime getTime() {
    time = LocalDateTime.now();
    return time;
}
```

Finally, we write our test case as follows:

```java
@Test
void registerStudentTest_WithRegistrationTime() throws Exception {
    RegistrationRequest registrationRequest = new RegistrationRequest(
        "John",
        "Doe",
        "securedPassword",
        "MAT100419",
        Gender.MALE);
    when(studentRepository.save(any(Student.class))).thenAnswer(answer->{
        return Student.builder()
                .firstName("John")
                .lastName("Doe")
                .matricNo("MAT100419")
                .password("securedPassword")
                .registrationTime(getTime())
                .gender(Gender.MALE).build();
    });
    StudentDto studentDto = studentService.registerStudent(registrationRequest);

    assertThat(studentDto, hasProperty("firstName", equalTo("John")));
    assertThat(studentDto, hasProperty("lastName", equalTo("Doe")));
    assertThat(studentDto, hasProperty("matricNo", equalTo("MAT100419")));
    assertThat(studentDto, hasProperty("registrationTime", equalTo(time)));
    assertThat(studentDto, hasProperty("gender", equalTo(Gender.MALE)));
}
```

4. `thenCallRealMethod()` - This method invokes the actual function on a mock object. When we use `thenCallRealMethod` or `doCallRealMethod`, instance variables defined in the class we are mocking are not initialized. 

However, with a Mockito *spy* we can create a more realistic interaction with our mock object.

Let us say we want to return the names of all students that have bed spaces in two hostels - *HALL3* and *HALL4*. 

Also, let's say that `returnNamesOfAllStudentsInAHostel` method in the `studentServiceImpl` class involved some complex algorithm in finding all students in a hostel and returning their names in a list. 

In this scenario, we will want to call the actual implementation of the `returnNamesOfAllStudentsInAHostel` method because it interfaces with many methods in other classes.

The activity diagram for the `returnNamesOfAllStudentsInAHostel` method is as shown below:

![return-names-of-all-students-in-a-hostel](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/return-names-of-all-students-in-hostel-diagram.png)

The implementation of `returnNamesOfAllStudentsInAHostel` method is given as follows:

```java
public List<String> returnNamesOfAllStudentsInAHostel(String hostelName) throws Exception {
    List<String> studentNames = new ArrayList<>();
    Hostel hostel = hostelRepository.findHostelByName(hostelName);
    for (Student student: studentRepository.findAll()) {
            if (student.getBedSpaceId().contains(hostel.getName().name())){
            studentNames.add(student.getName());
        }
    }
    return studentNames;
}
```

The test case for `returnNamesOfAllStudentsInAHostel` method will be as follows:

```java
@Test
void testReturnNamesOfAllStudentsInAHostel() throws Exception {
    List<StudentDto> registeredStudents = registerStudents();
    for (StudentDto dto: registeredStudents) {
        studentService.assignBedSpace(dto);
    }
    when(studentRepository.findAll()).thenCallRealMethod();
    when(hostelRepository.findHostelByName(anyString())).thenCallRealMethod();
    List<String> studentsInHall3 = studentService.returnNamesOfAllStudentsInAHostel("HALL3");
    List<String> studentsInHall1 = studentService.returnNamesOfAllStudentsInAHostel("HALL1");

    assertThat(studentsInHall3, hasSize(2));
    assertThat(studentsInHall3, hasItems("John Doe", "Peter Rabbit"));
    assertThat(studentsInHall1, hasSize(2));
    assertThat(studentsInHall1, hasItems("Mary Fallow", "Patricia Lemon"));
}

private List<StudentDto> registerStudents() throws Exception {
    RegistrationRequest firstRegistrationRequest = new RegistrationRequest("John", "Doe", "securedPassword", "MAT100419", Gender.MALE);
    RegistrationRequest secondRegistrationRequest = new RegistrationRequest("Mary", "Fallow", "securedWassword", "MAT100420", Gender.FEMALE);
    RegistrationRequest thirdRegistrationRequest = new RegistrationRequest("Peter", "Rabbit", "securedDassword", "MAT100421", Gender.MALE);
    RegistrationRequest fourthRegistrationRequest = new RegistrationRequest("Patricia", "Lemon", "securedBassword", "MAT100422", Gender.FEMALE);
    StudentDto firstStudentDto = studentService.registerStudent(firstRegistrationRequest);
    StudentDto secondStudentDto = studentService.registerStudent(secondRegistrationRequest);
    StudentDto thirdStudentDto = studentService.registerStudent(thirdRegistrationRequest);
    StudentDto fourthStudentDto = studentService.registerStudent(fourthRegistrationRequest);

    return new ArrayList<>(List.of(firstStudentDto, secondStudentDto,
    thirdStudentDto, fourthStudentDto));
}
```

First, we make a call to a helper method- `registerStudents` which registers students and then returns a list of `StudentDto` objects.

The use of `when- thenCallRealMethod`. `when(studentRepository.findAll()).thenCallRealMethod()`  instructs the `studentRepository` to make a real call to the `findAll` method. 

`when(hostelRepository.findHostelByName(anyString()).thenCallRealMethod()` instructs the `hostelRepository` to make a real call to the `save` method whenever any `String` object is passed into it.

However, when we run our test case, we get the following error:

```bash
java.lang.NullPointerException: Cannot invoke "java.util.Map.getOrDefault(Object, Object)" because "this.database" is null
```

We get this error because, as explained earlier, creating a mock object of a class will skip all constructor and initializer calls. Ttherefore, the instance variables that we initialized in the constructor will be null.

To fix the error, we create *spies* of the dependencies using one of the following methods:

```java
// 1. Using Mockito- JUnit extension
@Spy
StudentRepository studentRepository;

@Spy
HostelRepository hostelRepository;
```

```java
// 2. Using Mockito static methods
StudentRepository studentRepository = spy(StudentRepository.class);

HostelRepository hostelRepository = spy(HostelRepository.class);
```

```java
//3. Using ```org.mockito.Mockito.CALLS_REAL_METHODS```
StudentRepository studentRepository = Mockito.mock(StudentRepository.class, CALLS_REAL_METHODS
);

HostelRepository hostelRepository = spy(HostelRepository.class);
```

We refactor our test class by creating partial mocks of our dependencies. [Partial mocking](https://stackoverflow.com/questions/14970516/use-mockito-to-mock-some-methods-but-not-others) enables us to mock some methods without mocking others.

```java
@ExtendWith(MockitoExtension.class)
public class StudentServicePartialMockingTests {
    private StudentService studentService;
    @Spy
    private StudentRepository studentRepository;
    @Spy
    private HostelRepository hostelRepository;

    @BeforeEach
    void setUp() throws Exception {
        studentService = new StudentServiceImpl(studentRepository, hostelRepository);
    }

    @Test
    void testReturnNamesOfAllStudentsInAHostel() throws Exception {
        List<StudentDto> registeredStudents = registerStudents();
        for (StudentDto dto: registeredStudents) {
            studentService.assignBedSpace(dto);
        }
        List<String> studentsInHall3 = studentService.returnNamesOfAllStudentsInAHostel("HALL3");
        List<String> studentsInHall1 = studentService.returnNamesOfAllStudentsInAHostel("HALL1");

        assertThat(studentsInHall3, hasSize(2));
        assertThat(studentsInHall3, hasItems("John Doe", "Peter Rabbit"));
        assertThat(studentsInHall1, hasSize(2));
        assertThat(studentsInHall1, hasItems("Mary Fallow", "Patricia Lemon"));
    }

  private List<StudentDto> registerStudents() throws Exception {
    RegistrationRequest firstRegistrationRequest = new RegistrationRequest("John", "Doe", "securedPassword", "MAT100419", Gender.MALE);
    RegistrationRequest secondRegistrationRequest = new RegistrationRequest("Mary", "Fallow", "securedWassword", "MAT100420", Gender.FEMALE);
    RegistrationRequest thirdRegistrationRequest = new RegistrationRequest("Peter", "Rabbit", "securedDassword", "MAT100421", Gender.MALE);
    RegistrationRequest fourthRegistrationRequest = new RegistrationRequest("Patricia", "Lemon", "securedBassword", "MAT100422", Gender.FEMALE);
    StudentDto firstStudentDto = studentService.registerStudent(firstRegistrationRequest);
    StudentDto secondStudentDto = studentService.registerStudent(secondRegistrationRequest);
    StudentDto thirdStudentDto = studentService.registerStudent(thirdRegistrationRequest);
    StudentDto fourthStudentDto = studentService.registerStudent(fourthRegistrationRequest);

    return new ArrayList<>(List.of(firstStudentDto, secondStudentDto,
      thirdStudentDto, fourthStudentDto));
  }
}
```

When we *spy* on a class, Mockito spins an actual class object but now interactions with the object can be logged.

> Notice that we have removed the `when-then` directives from our test case.

We refactor the test case for the `registerStudent` method as follows:

```java
@Test
void registerStudentTest() throws Exception {
    RegistrationRequest registrationRequest = new RegistrationRequest("John", "Fallow","my_password", "PSC1004396", Gender.MALE);
    Student student = Student.builder()
                            .firstName("John")
                            .lastName("Fallow")
                            .matricNo("PSC100419")
                            .password("my_password")
                            .gender(Gender.MALE).build();
    doReturn(student).when(studentRepository).save(any(Student.class));
    StudentDto studentDto = studentService.registerStudent(registrationRequest);
    assertThat(studentDto, hasProperty("firstName", equalTo("John")));
    assertThat(studentDto, hasProperty("lastName", equalTo("Fallow")));
    assertThat(studentDto, hasProperty("matricNo", equalTo("PSC100419")));
    assertThat(studentDto, hasProperty("gender", equalTo(Gender.MALE)));
}
```

`doReturn(student).when(studentRepository).save(any(Student.class))` is similar to `when(studentRepository.save(any(Student.class)).thenReturn(student)`.  

There is an important pitfall to note when using spy objects with the  `when then` directive. The actual method will be called (because `studentRepository.save(any(Student.class))` is evaluated before `when(..)` at runtime). 

Using the `when-then` directive with spies can be a problem if the method contains logic that we do not want to invoke. Hence, we use `doReturn(student).when(studentRepository).save(any(Student.class))`.

At this point, it is important to highlight that the `do… when` directive can be used as an alternative to the `when - then` directive:

- `when(studentRepository.save(any(Student.class))).thenReturn(student)` can be rewritten as `doReturn(student).when(studentRepository).save(any(Student.class))`.

- `when(studentRepository.save(null)).thenThrow(NullEntityException.class)` can be rewritten as `doThrow(NullEntityException.class).when(studentRepository).save(null)`.

``` java
when(studentRepository.save(any(Student.class))).thenAnswer(answer->{
  return Student.builder()
  .firstName("John")
  .lastName("Doe")
  .matricNo("MAT100419")
  .password("securedPassword")
  .registrationTime(getTime())
  .gender(Gender.MALE)
  .build();
  });
```

The above code can be rewritten as:
  
```java
doAnswer(answer->{ return Student.builder()
                .firstName("John")
                .lastName("Doe")
                .matricNo("MAT100419")
                .password("securedPassword")
                .registrationTime(getTime())
                .gender(Gender.MALE).build();
    }).when(studentRepository).save(any(Student.class))
```

### Verifying method invocation using Mockito.verify()
Mockito's static `verify` method helps us confirm if a stubbed method was invoked and the number of times it was called. `verify` becomes handy when testing `void` methods.

#### How to use Mockito.verify()
The `verify` method is overloaded. It can take `Times` as an argument. `Times` accepts an integer argument (`wantedNumberOfInvocations`).

If we pass *1* as an argument to `Times`, it infers that the stubbed method will be invoked only once in the testing path.

If we pass *0* as an argument to `Times`, it means that we do not expect the stubbed method to be invoked in the testing path.

Passing a negative number to the `Times` constructor, triggers a "`MockitoException -org.mockito.exceptions.base.MockitoException` " with the error message - " *Negative value is not allowed here.*"

The following demonstrates how we can `verify` using several [verification modes](https://www.javadoc.io/doc/org.mockito/mockito-core/2.2.6/org/mockito/verification/VerificationMode.html).

1. `times(int wantedNumberOfInvocations)` - This verifies the number of times a stubbed method is invoked. Our test case fails if the stubbed method is not invoked the specified `wantedNumberOfInvocations` times.

To demonstrate this, let's consider the *assign bed-space to student* use case of our Hostel Management System.

![Assign bed space to student](/engineering-education/mocking-with-junit-and-mockito-the-why-and-how/assign-bedspace-to-student.png)

The implementation of the `assignBedSpace` method is as follows:

``` java
@Override
public void assignBedSpace(StudentDto studentDto) throws Exception {
    Student student = studentRepository.findById(studentDto.getId()).orElseThrow(()->
            new HostelManagementException("student with specified matric number not found!"));
    BedSpace bedSpace;
    if(studentDto.getGender()== Gender.FEMALE){
        bedSpace = hostelRepository.returnAvailableFemaleSpace();
    }
    else{
        bedSpace = hostelRepository.returnAvailableMaleSpace();
    }
    student.setBedSpaceId(bedSpace.getId());
    bedSpace.setEmpty(false);
}
```

```java
public BedSpace returnAvailableMaleSpace() throws NoAvailableBedspaceException {
    try {
        return availableBedSpacesForMales.poll();
    }
    catch(NoSuchElementException exception){
        throw new NoAvailableBedspaceException(exception.getMessage());
    }
}
```

Our test class for verifying the number of invocation of specific methods of mocked objects is as shown below:

```java
public class StudentServiceImpl_VerifyTests {
    private StudentService studentService;
    @Spy
    private StudentRepository studentRepository;
    @Spy
    private HostelRepository hostelRepository;
    private LocalDateTime time;
    private Student student;

    @BeforeEach
    void setUp() {
        time = null;
        studentService = new StudentServiceImpl(studentRepository, hostelRepository);
    }
}
```

The test case is as follows:

```java
@Test
void test_assignBedSpaceToStudent() throws Exception {
    RegistrationRequest registrationRequest = new RegistrationRequest("John", "Doe", "securedPassword", "MAT100419", Gender.MALE);

    StudentDto studentDto = studentService.registerStudent(registrationRequest);
    verify(studentRepository, times(1)).findById("MAT100419");
    reset(studentRepository);
    studentService.assignBedSpace(studentDto);
    verify(studentRepository, times(1)).findById("MAT100419");
    verify(hostelRepository, times(0)).returnAvailableFemaleSpace();
    verify(hostelRepository, times(1)).returnAvailableMaleSpace();
}
```
In the above code:

- First, we attempt to register a student. Next, we verify that the `findById` method is invoked on the `studentRepository` spy only once with an argument of value - "MAT100419".
- We then reset the behavior of our mock object using Mockito's static `reset` method.
- Next, we attempt to assign a space to a student.
- We verify that we correctly invoked the `findById` method on the `studentRepository` spy exactly once with an argument of value- "MAT100419".
- We also verify that the `returnAvailableFemaleSpace` method is not invoked since our subject is a male student.
- Finally, we verify that `returnAvailableMaleSpace` is invoked only once.

2. `never()` - This method signifies that the stubbed method is never invoked on the mock object. As an alternative, we can use `times(0)` to represent the same scenario. 

The test fails if the stubbed method is invoked at least once. To demonstrate this functionality, let's consider the following test case for the `returnNamesOfAllStudentsInARoom` method.

```java
@Test
void test_returnNamesOfStudentInARoom() throws Exception {
    RegistrationRequest firstRegistrationRequest = new RegistrationRequest("John", "Doe", "securedPassword", "MAT100419", Gender.MALE);

    RegistrationRequest secondRegistrationRequest = new RegistrationRequest("Mary", "Fallow", "securedPassword", "PSC100419", Gender.FEMALE);

    StudentDto firstStudentDto = studentService.registerStudent(firstRegistrationRequest);
    StudentDto secondStudentDto = studentService.registerStudent(secondRegistrationRequest);
    studentService.assignBedSpace(firstStudentDto);
    studentService.assignBedSpace(secondStudentDto);
    reset(studentRepository);//This reset is put here to re-initialize before interaction with returnTheNamesOfAllStudentsInARoom()
    List<String> studentNames = studentService.returnTheNamesOfAllStudentsInARoom("HALL3 Room 1");
    verify(studentRepository,never()).findById(anyString());
    verify(studentRepository, times(1)).findAll();
    assertThat(studentNames).contains("John Doe");
    studentNames = null;
    reset(studentRepository);
    studentNames = studentService.returnTheNamesOfAllStudentsInARoom("HALL1 Room 1");
    verify(studentRepository,never()).findById(anyString());
    verify(studentRepository, times(1)).findAll();
    assertThat(studentNames).contains("Mary Fallow");
}
```

In the above code, we verify that the `findById` method is never invoked on the `studentRepository` spy object.

3. `atLeastOnce()` - This method signifies that we invoked the stubbed method at least once. It fails if the stubbed method is not invoked at all.

To verify that the `findById` method is called on the `studentRepository` object at least once with a string as a parameter, we can write:

```java
verify(studentRepository, atLeastOnce()).findById(anyString());
```

4. `at Least(int minNumberOfInvocations)` - This function verifies that a stubbed method is invoked at least `minNumberOfInvocation` times. 

It works well if the method is called more than the `minNumberOfInvocation` times. However, it fails if the method is not called at least `minNumberOfInvocation` times.

```java
verify(studentRepository, atLeast(1)).findById(anyString());
```

5. `atMost(int maxNumberOfInvocation)` - This helps us to verify that a stubbed method is called at the `maxNumberOfInvocation` times.

```java
verify(studentRepository, atMost(1)).findById(anyString());
```

6. `only()` - The `only` function helps us verify that the stubbed method is invoked on the mock object. 

It fails if any other method is invoked on the mock object besides the specified function. Let's say that we want to return the names of all students in the student repository. 

We can verify that only the `findAll` method is called on `studentRepository` as follows:

``` java
verify(studentRepository, only()).findAll();
```
7. `timeOut(int millis)` - This method verifies that a stubbed function is invoked on a mock object within a specified time range.

#### Verifying zero and no more interactions
The `verifyNoInteractions(Object... mocks)` method is used to verify that no method was invoked on the specified mock objects.

```java
studentService.findStudentById("MAT100419");
verifyNoInteractions(hostelRepository);
```
#### Verifying the order of interactions
Mockito provides the [InOrder](https://www.javadoc.io/static/org.mockito/mockito-core/2.6.9/org/mockito/InOrder.html#verifyNoMoreInteractions) interface that allows us to verify the order of interactions with mock objects.

There are three versions of `Inorder`:

`verify (Syntax: <T> T verify(T mock))` - This verifies that an interaction with a mock object happened once in order. The following snippet demonstrates how to use the `InOrder.verify` method:

```java
void testTheOrderOfInteractions() throws Exception {
    RegistrationRequest registrationRequest = new RegistrationRequest("John", "Doe", "securedPassword", "MAT100419", Gender.MALE);
    StudentDto studentDto = studentService.registerStudent(registrationRequest);
    studentService.assignBedSpace(studentDto);
    InOrder inorder = inOrder(studentRepository, hostelRepository);
    inorder.verify(studentRepository).findById(anyString());
    inorder.verify(hostelRepository).returnAvailableMaleSpace();
}
```

In the above code, we are verifying that when bed space is assigned to a student, the `studentRepository` object is interacted with once by invoking the `findById` method with any string passed in as a parameter.

Next, we are verifying that the `hostelRepository` object is interacted with once by invoking the `returnAvailableMaleSpace` method.

`Verify` with [verification mode](https://www.javadoc.io/static/org.mockito/mockito-core/2.6.9/org/mockito/verification/VerificationMode.html) passed in as an argument (`Syntax: T mock, VerificationMode mode`). It verifies that interaction occurred with a mock object once but with verification mode passed in as an argument.

```java
@Test
void testTheOrderOfInteractionWithVerificationModePassedAsAnArgument() throws Exception {
    RegistrationRequest registrationRequest = new RegistrationRequest("John", "Doe", "securedPassword", "MAT100419", Gender.MALE);
    StudentDto studentDto = studentService.registerStudent(registrationRequest);
    studentService.assignBedSpace(studentDto);
    InOrder inorder = inOrder(studentRepository, hostelRepository);
    inorder.verify(studentRepository, times(1)).findById(anyString());
    inorder.verify(hostelRepository, times(1)).returnAvailableMaleSpace();
    inorder.verify(hostelRepository, never()).findHostelByName(“HALL 3”);
}
```

Here we are verifying that to assign a bed space to a student:
- First, the `findById` method is invoked on the mock `studentRepository` object once.
- Next, the `returnAvailableMaleSpace` method is invoked on the mock `hostelRepository` object exactly once.
- Finally, we verify that the `findHostelByName` method is never called on the mock `hostelRepository` object.


> It is possible to use `verify` with any argument as in the line - `inorder.verify(studentRepository, times(1)).findById(anyString())`. 

verifyNoMoreInteractions(`Syntax: void verifyNoMoreInteractions()`) - This verifies that no more interactions happened in order. The order of verification matters which makes it different from `Mockito.verifyNoMoreInteractions(Object )`. 

More specifically, the `verifyNoMoreInteractions` method ensures no interaction is left for verification.

To demonstrate this, let's borrow an example from the [Java documentation](https://www.javadoc.io/static/org.mockito/mockito-core/2.6.9/org/mockito/InOrder.html#verifyNoMoreInteractions()) for `InOrder` interface

```java
mock.foo(); //1st
mock.bar(); //2nd
mock.baz(); //3rd

InOrder inOrder = inOrder(mock);

inOrder.verify(mock).bar(); //2nd
inOrder.verify(mock).baz(); //3rd (last method)
// passes because there are no more interactions after last method:
inOrder.verifyNoMoreInteractions();
//however this fails becauhttps://site.mockito.org/javadoc/current/org/mockito/ArgumentCaptor.htmlse 1st method was not verified:
Mockito.verifyNoMoreInteractions(mock);
```
> The `Mockito.verifyNoMoreInteractions(mock)` line fails because not all the interactions have been verified.

### Verifying an argument using `ArgumentCaptor`
[`ArgumentCaptor`](https://site.mockito.org/javadoc/current/org/mockito/ArgumentCaptor.html) is useful in mock testing. It allows us to access arguments passed to the method under test.

To use `ArgumentCaptor`, we first import `import org.mockito.ArgumentCaptor`.
With the aid of the Mockito- JUnit extension.

We can then simply create an argument captor for a class as follows:

```java
@Captor
ArgumentCaptor<Student> studentArgumentCaptor;
```

Without the Mockito- JUnit extension, we can create an argument captor for class `Student` as follows:
`ArgumentCaptor<Student> studentArgumentCaptor = ArgumentCaptor.forClass(Student.class)`

Our test case is as follows:
```java
@Test
void capturingArgumentsUsingArgumentCaptor() throws Exception {
  RegistrationRequest registrationRequest = new RegistrationRequest("John", "Doe", "securedPassword", "MAT100419", Gender.MALE);

  //The following lines asserts that our ModelMapper works as expected
  StudentDto studentDto = studentService.registerStudent(registrationRequest);
  verify(studentRepository).save(studentArgumentCaptor.capture());
  Student student = studentArgumentCaptor.getValue();
  assertThat(studentDto.getFirstName()).isEqualTo(student.getFirstName());
  assertThat(studentDto.getLastName()).isEqualTo(student.getLastName());
  assertThat(studentDto.getMatricNo()).isEqualTo(student.getMatricNo());
  assertThat(studentDto.getRegistrationTime()).isEqualTo(student.getRegistrationTime());
}
```

`verify(studentRepository).save(studentArgumentCaptor.capture())` verifies that the student repository mock object is called.

`studentArgumentCaptor.capture()` captures the argument that we passed into the save method.

`Student student = studentArgumentCaptor.getValue()` retrieves the value that was captured by `studentArgumentCaptor` and gives it a student reference.

> ArgumentCaptor also has a method `getAllValues` that returns a list.

We can rewrite the above test suite as:

```java
@Test
void capturingArgumentsUsingArgumentCaptor_DemonstratingGetAllValues() throws Exception {
    RegistrationRequest registrationRequest = new RegistrationRequest("John", "Doe", "securedPassword", "MAT100419", Gender.MALE);

    //The following lines asserts that our ModelMapper works as expected
    StudentDto studentDto = studentService.registerStudent(registrationRequest);
    verify(studentRepository).save(studentArgumentCaptor.capture());
    Student student = studentArgumentCaptor.getAllValues().get(0);
    assertThat(studentDto.getFirstName()).isEqualTo(student.getFirstName());
    assertThat(studentDto.getLastName()).isEqualTo(student.getLastName());
    assertThat(studentDto.getMatricNo()).isEqualTo(student.getMatricNo());
    assertThat(studentDto.getRegistrationTime()).isEqualTo(student.getRegistrationTime());
}
```
`studentArgumentCaptor.getAllValues` returns a list of students(in this case our list contains only one student)

> Although, we can use the `ArgumentCaptor` with `Mockito.when`, we should avoid doing so. When stubbing, we should use an `ArgumentMatcher` instead. `any()`, `anyString()`, `anyInt()`, and `anyBoolean()` are all examples of argument matchers.

To demonstrate the reasons why we should avoid stubbing with `ArgumentCaptor`, let's consider a simple test case for the `registerStudent` method in the `StudentService` class:

```java
@Test
void registerStudentTest() throws Exception {
// these parts are skipped for brevity sake
  when(studentRepository.save(any(Student.class))).thenReturn(studentToSave);
  StudentDto studentDto = studentService.registerStudent(registrationRequest);
  assertThat(studentDto, hasProperty("firstName", equalTo("John")));
  assertThat(studentDto, hasProperty("lastName", equalTo("Doe")));
  assertThat(studentDto, hasProperty("matricNo", equalTo("MAT100419")));
  assertThat(studentDto, hasProperty("gender", equalTo(Gender.MALE)));
}
```

Next, consider the same test but using an `ArgumentCaptor` instead:

```java
@Test
void registerStudentTest() throws Exception {
//these parts are skipped for brevity sake
  when(studentRepository.save(studentArgumentCaptor.capture())).thenReturn(studentToSave);
  StudentDto studentDto = studentService.registerStudent(registrationRequest);
  assertThat(studentDto, hasProperty("firstName", equalTo("John")));
  assertThat(studentDto, hasProperty("lastName", equalTo("Doe")));
  assertThat(studentDto, hasProperty("matricNo", equalTo("MAT100419")));
  assertThat(studentDto, hasProperty("gender", equalTo(Gender.MALE)));
}
```

As demonstrated above, our tests are difficult to read when we use `argument captors` instead of `argument matchers` in stubbing methods.

Also, if the `studentService.registerStudent(registrationRequest)` does not call `studentRepository.save(student)`, it will trigger an exception:

> `org.mockito.exceptions.base.MockitoException`: No argument value was captured!

We get this error because the stubbed method has not captured an argument. Using `ArgumentCaptor` instead of an Argument Matcher when stubbing methods misdirects to an exception in the test instead of the specific method that we are testing.

### Conclusion
In this tutorial, we have successfully learned how to write unit tests using Mockito, as well as the different types of mocking frameworks.

We also discussed the different ways of creating mock objects using Mockito, and how to perform basic stubbing in Mockito using the `when- then` directive. 

Finally, we concluded by highlighting how to use argument captors. The code is accessible from this [repository](https://github.com/ehizman/bedspaces)

Happy Coding!

### Further reading
- [Using Mockito ArgumentCaptor](https://www.baeldung.com/mockito-argumentcaptor).
- [Testing with Hamcrest](https://www.baeldung.com/java-junit-hamcrest-guide).
- [Mockito ArgumentMatchers](https://www.baeldung.com/mockito-argument-matchers).
- [Mockito Verify Cookbook](https://www.baeldung.com/mockito-verify).
- [Stubbing and Mocking with Mockito and JUnit](https://semaphoreci.com/community/tutorials/stubbing-and-mocking-with-mockito-2-and-junit).
- [Interface InOrder](https://www.javadoc.io/doc/org.mockito/mockito-core/2.6.9/org/mockito/InOrder.html).
- [Mockito - verifyNoMoreInteractions() and verifyNoInteractions()](https://www.logicbig.com/tutorials/unit-testing/mockito/verify-no-more-interactions.html).
- [Interface VerificationMode](https://www.javadoc.io/doc/org.mockito/mockito-core/2.2.6/org/mockito/verification/VerificationMode.html).
- [Clean Unit Tests with Mockito](https://reflectoring.io/clean-unit-tests-with-mockito/).
- [mockito/InOrder](https://github.com/mockito/mockito/blob/main/src/main/java/org/mockito/InOrder.java)
- [When to mock](https://blog.cleancoder.com/uncle-bob/2014/05/10/WhenToMock.html).

---
Peer Review Contributions by: [Joel Kanyi](/engineering-education/authors/joel-kanyi/)
