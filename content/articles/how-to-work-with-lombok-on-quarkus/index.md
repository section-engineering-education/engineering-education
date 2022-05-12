---
layout: engineering-education
status: publish
published: true
url: /how-to-work-with-lombok-on-quarkus/
title: Getting Started With Quarkus
description: This tutorial will provide a step by step guide on how to use Lombok library on a Quarkus project. It aims at providing an insight into the features of Lombok by building a Movie application.
author: chris-mutua
date: 2021-11-30T00:00:00-11:15
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-work-with-lombok-on-quarkus/hero.png
    alt: Lombok Quakus image example
---

Java language is an extensive language for app development. However, it is challenging for beginners due to the loss of syntactical terms required to be mastered. This loss confuses beginners.
<!--more-->
The great news is that Frameworks such as SpringBoot, Micronaut, Quarkus, and others have integrated easy-to-use libraries. These libraries provide annotations to quickly and effortlessly replace blocks of code with short annotations.

Lombok is an example of one of these libraries. "Project Lombok", as it is known, is a Java library that simplifies Java. For example, it takes away the writing of Getters, Setters, or Equal methods, among many others, by using one or more annotations. In addition, the class has a fully-featured builder, automated logging variables, and more. This article discusses and allows one to get hands-on experience on Lombok in a Quarkus project.

### Table of Contents

- [Key takeaways](#key-takeaways)
- [Pre-requisites](#pre-requisites)
- [Setup IDE for Lombok](#setup-ide-for-lombok)
- [Create a Lombok Quarkus project](#create-a-lombok-quarkus-project)
- [Create a Movies sample project](#create-a-movies-sample-project)
- [Lombok features](#lombok-features)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways
At the end of this article, the reader should be well conversant with the following:
- How to set up Lombok in a Quarkus project
- How to set up tests in Quarkus to test the Lombok project functionality
- How to deal with Getters and Setters in Lombok
- Access levels and constructors in Lombok
- EqualsAndHashCode and ToString annotations in Lombok
- Exclude and Data annotations
- Accessors and NotNull
- Builder, BuilderDefault, and Singular annotations in Lombok
- Slf4j, Lombok configurations, and custom logs

### Pre-requisites
To follow along with this article, the reader should have the following:
- Java language prior knowledge
- Java SDK installed on the machine. The latest SDK version is recommended. Download it in [this](https://www.oracle.com/java/technologies/downloads/) link to install on Windows, Mac, or Linux. To install it step by step in the Terminal, follow the steps shown [here](https://opensource.com/article/19/11/install-java-linux).
- The ultimate version of IntelliJ is preferred since it has many tools in the store. Click [here](https://www.jetbrains.com/idea/download/) to download the IDE.
- A good internet connection to fetch additional resources.

> As for the requirements, the pre-requisites may change as time goes by since ever since the article is published. We used JDK version `17`, VS Code version `1.61`, and IntelliJ Ultimate version `2021.2.3` for the screenshots.

### Setup IDE for Lombok
#### IntelliJ ultimate setup
The IDE requires the Lombok plugin to work with Quarkus in a Quarkus project efficiently. 

Head over to the `Settings/plugins` option, then search for 'Lombok' to install the plugin. It will look as shown below:

![Lombok IntelliJ plugin](/engineering-education/how-to-work-with-lombok-on-quarkus/Lombok-intellij-pliugin.png)

After a successful installation, restart the IDE.

#### Setup for VS Code
As for VS code, ensure that it has the Quarkus tools installed as an extension. The extension is shown below:
![VS Code Quarkus tools](/engineering-education/how-to-work-with-lombok-on-quarkus/quarkus-tools-vs-code.png)

- Search for 'Lombok' and install the Lombok annotations for VS Code. Check out its appearance in the image below:
![Lombok VS Code support](/engineering-education/how-to-work-with-lombok-on-quarkus/lombok-annotations-vs-code.png)

- Restart it to make sure it reflects the changes.

### Create a Lombok Quarkus project
#### Quarkus Lombok project IntelliJ
Create a new project of the following structure:
- _Name_: Lombok-tutorial
- _Group_: org.gs
- _Artifact_: Lombok-tutorial

![New Quarkus project in IntelliJ](/engineering-education/how-to-work-with-lombok-on-quarkus/new-quarkus-lombok-intellij.png)

- In the next window, do not add any dependencies

#### Quarkus Lombok project in Visual Studio Code
After the installation of the extensions, follow the steps below:
- Open up the Command Palette. Do this by heading over to the View/Command Palette option.
- Search Quarkus
- Select on the 'Generate a Quarkus project' option

![New Quarkus project in VS Code](/engineering-education/how-to-work-with-lombok-on-quarkus/new-quarkus-lombok-vs-code.png)

- Set the following:
  - _Build tool_: Maven
  - _GroupId_: org.gs
  - _Artifact Id_: lombok-tutorial
  - No extensions

#### Quarkus Lombok project in Quarkus.io starter

- Head over to [Quarkus.io starter](https://code.quarkus.io/) website.
- Set the following for the project:
  - _ArtifactId_: lombok-tutorial
  - _Group_: org.gs

![New Quarkus Lombok project using Quarkus.io starter](/engineering-education/how-to-work-with-lombok-on-quarkus/new-quarkus-lombok-intellij.png)

- Download the zip code generated, extract it and open it up with the IDE or code editor.

### Folder Structure
The following is the project folder structure:

```shell
.
├── Lombok-tutorial
│   └── src
│     ├── main
│         ├── docker
│         ├── Java
│         └── resources
│             └── META-INF
│     └── test
│   ├── .dockerignore
│   ├── .gitignore
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── Lombok-tutorial.iml
│   └── README.md
```

- Delete the files found inside the following folders: `Java`, `resources`, and `test`.

### Create a Movies sample project

Create a new `Movie.java` file inside the java folder and in the file, add the following snippets.

```Java
import java.net.URL;

/**
* The type Movie.
  */
  public class Movie {
  private Long id;
  private String title;
  private String description;
  private String country;
  private int rating;
  private URL officialSite;
  private String language;

  /**
  * Instantiates a new Movie.
    */
    public Movie(Long id, String title, String description, String country, int rating, URL officialSite, String language) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.country = country;
    this.rating = rating;
    this.officialSite = officialSite;
    this.language = language;
    }

  //An empty constructor
  public Movie() {

  }

  //Set Getters and Setters
  public Long getId() {
  return id;
  }

  public void setId(Long id) {
  this.id = id;
  }

  public String getTitle() {
  return title;
  }

  public void setTitle(String title) {
  this.title = title;
  }

  public String getDescription() {
  return description;
  }

  public void setDescription(String description) {
  this.description = description;
  }

  public String getCountry() {
  return country;
  }

  public void setCountry(String country) {
  this.country = country;
  }

  public int getRating() {
  return rating;
  }

  public void setRating(int rating) {
  this.rating = rating;
  }

  public URL getOfficialSite() {
  return officialSite;
  }

  public void setOfficialSite(URL officialSite) {
  this.officialSite = officialSite;
  }

  public String getLanguage() {
  return language;
  }

  public void setLanguage(String language) {
  this.language = language;
  }
  }
```

In the `pom.xml` file, add the code below that adds the Jupiter JUnit package under the dependencies section. This dependency allows testing of the project and running of additional test units.

```xml
<!--junit-jupiter.version-->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter-engine</artifactId>
    <version>${junit-jupiter.version}</version>
    <scope>test</scope>
</dependency>
```

Add this code below before the dependencies section. This section holds some variables which state the versions of the dependencies used. For example, that of `JUnit` is `5.8.1`. First, reload the IDE or project to apply the changes made, then in the next step, create a new file inside the `test` folder. Name it `MovieTest.java` file.

```xml
<!--dependecies versions used-->
<properties>
<maven.compiler.source>17</maven.compiler.source>
<maven.compiler.target>17</maven.compiler.target>
<junit-jupiter.version>5.8.1</junit-jupiter.version>
<project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
</properties>
```

Now reload the IDE or project to apply the changes made, then in the next step, create a new file inside the `test` folder. Name it `MovieTest.java` file.
In it, paste the following code:

```Java
/**
* The type Movie test.
  */
  class MovieTest {

  private Movie movie;

  /**
  * Sets up.
  *
  * @throws MalformedURLException the malformed url exception
    */
    @BeforeEach
    void setUp() throws MalformedURLException {
    movie = new Movie();
    movie.setTitle("The Lord of the Rings: The Fellowship of the Ring");
    movie.setDescription("In the second age of Middle-earth, the lords of Elves...");
    movie.setCountry("New Zealand - United States");
    movie.setLanguage("English");
    movie.setRating(8);
    movie.setOfficialSite(new URL("https://www.lordsoftherings.com"));
    movie.setId(1L);
    }

// Test the getId method
  @Test
  void getId() {
  assertNotNull(movie);
  assertEquals(1L, movie.getId());
  }

  /**
  * Sets id.
    */
     // Test the setId method
    @Test
    void setId() {
    assertNotNull(movie);
    movie.setId(2L);
    assertEquals(2L, movie.getId());
    }

 // Test the getTitle method
  @Test
  void getTitle() {
  assertNotNull(movie);
  assertEquals("The Lord of the Rings: The Fellowship of the Ring", movie.getTitle());
  }

 // Test the setTitle method
  @Test
  void setTitle() {
  assertNotNull(movie);
  movie.setTitle("The Fellowship of the Ring");
  assertEquals("The Fellowship of the Ring", movie.getTitle());
  }

 // Test the getDescription method
  @Test
  void getDescription() {
  assertNotNull(movie);
  assertEquals("In the second age of Middle-earth, the lords of Elves...", movie.getDescription());
  }

 // Test the setDescription method
  @Test
  void setDescription() {
  assertNotNull(movie);
  movie.setDescription("The lord of Elves, in the second age...");
  assertEquals("The lord of Elves, in the second age...", movie.getDescription());
  }

 // Test the getCountry method
  @Test
  void getCountry() {
  assertNotNull(movie);
  assertEquals("New Zealand - United States", movie.getCountry());
  }

 // Test the setCountry method
  @Test
  void setCountry() {
  assertNotNull(movie);
  movie.setCountry("NZ - US");
  assertEquals("NZ - US", movie.getCountry());
  }

 // Test the getRating method
  @Test
  void getRating() {
  assertNotNull(movie);
  assertEquals(8, movie.getRating());
  }

 // Test the setRating method
  @Test
  void setRating() {
  assertNotNull(movie);
  movie.setRating(9);
  assertEquals(9, movie.getRating());
  }

  // Test the getOfficialSite method
  @Test
  void getOfficialSite() {
  assertNotNull(movie);
  assertEquals("https://www.lordsoftherings.com", movie.getOfficialSite().toString());
  }

  /**
  * Sets official site.
  *
  * @throws MalformedURLException the malformed url exception
    */
    // Test the setOfficialSite method
    @Test
    void setOfficialSite() throws MalformedURLException {
    assertNotNull(movie);
    movie.setOfficialSite(new URL("http://www.lordsoftherings.com"));
    assertEquals("http://www.lordsoftherings.com", movie.getOfficialSite().toString());
    }

  // Test the getLanguage method
  @Test
  void getLanguage() {
  assertNotNull(movie);
  assertEquals("English", movie.getLanguage());
  }

  // Test the setLanguage method
  @Test
  void setLanguage() {
  assertNotNull(movie);
  movie.setLanguage("EN");
  assertEquals("EN", movie.getLanguage());
  }
  }
```

Run the tests with the IDE. If the run option is not visible, right-click on the tests file and select the run option. The outcome will look as follows:

![Running the tests](/engineering-education/how-to-work-with-lombok-on-quarkus/running-tests.png)

### Add Lombok dependencies
In the `pom.xml` file, add the following lines of code under the dependencies section. These will allow the app to utilize the Project Lombok annotations.

```xml
<!-- Require lombok for the project -->
<dependency>
<groupId>org.projectlombok</groupId>
<artifactId>lombok</artifactId>
<version>${lombok.version}</version>
<scope>provided</scope>
</dependency>
```

In the properties section (under the `properties` tags), specify the version of Lombok to be used in the project. Accomplish this by adding the following line of code:

```xml
<!-- Specify the version to be used -->
<lombok.version>1.18.20</lombok.version>
```

Reload the app once more. This line of code allows the IDE to fetch the project dependencies for development purposes.

### Lombok features

#### Getters and Setters
These will reduce the code of the project. It does it by replacing the Getters and Setters methods used by annotations. Lombok adds the scenes methods in a separate file keeping the code clean and straightforward. Remove the Getters and Setters methods initially created in the `Movie.java` file, then add the following code above the Movie class.

```Java
// Create getters and setters methods
@Getter @Setter
```
Next, rerun the tests to determine whether the code structure has not changed. If they all run successfully, the code's structure has not changed. At the moment, if you head over to the `target` folder and open the `Movie` class, you will notice that all the Getters and Setter methods are automatically declared here but used in the code.

The Project Lombok dependency uses the __Just-In-Time__ (JIT) implementation to create all these methods only before needed, e.g., before the run.

Hence, the methods generated will be seen after running the actual project or tests.

> Getters and Setters will be applied to all the items in the class since they have been added before the class. However, if they are only needed for one item, they will be applied only before that item.

#### NoArgsConstructor and the AllArgsConstructor
These are used to create constructors for the program. There are two types of constructors available in the `Movie.java` file. These are the No-argument and the All-argument constructors.  These are shown below:

##### No argument Constructor

```Java
/**
* Instantiates a new Movie.
*/
// No argument constructor
public Movie() {

    }
```

##### All argument Constructor

```java
// All argument constructor
public Movie(Long id, String title, String description, String country, int rating, URL officialSite, String language) {
this.id = id;
this.title = title;
this.description = description;
this.country = country;
this.rating = rating;
this.officialSite = officialSite;
this.language = language;
}
```

- Add the `NoArgsConstructor` and `AllArgsConstructor` annotations to the code below the `Getters` and `Setters` annotations:

```Java
// Generate the NoArgsConstructor and AllArgsConstructor
@NoArgsConstructor
@AllArgsConstructor
```

Delete the `No argument` and `all arguments` constructors initially created from the file.

> NOTE: Do not delete the constructors found in the test file.

- Rerun the test. It proves that all runs as expected.
- Check for the `Movie.class` file in the target folder for the code added automatically to it.

#### AccessLevel
It is used to describe how the items can be accessed in the program. E.g., privately, publicly, protected, and many more. In addition, this annotation is helpful in cases where the Setters and Getters are not applied to other variables by default. For example:

- Above the `private Long id;` line, add the following:

```java
// Generate Setters with the private access level
@Setter(AccessLevel.PRIVATE)
```

- Above the `private URL officialSite;` line, add the following:

```Java
// Generate Setters with the protected access level
@Setter(AccessLevel.PROTECTED)
```

- Add another variable to the code known as minutes, as shown below:

```Java
// Variable declaration and initialization
private final int minutes = 120;
```

- Above it, add the following:

```java
import lombok.Getter;

// Generate Getters and Setters with the private access level
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
```

In this case, the following error will be popped-up:

![Runtime error](/engineering-education/how-to-work-with-lombok-on-quarkus/set-id-error.png)

The variable is inaccessible by Project Lombok due to its access level. Therefore, the easiest solution to such errors is to remove the access level or change its access level type to `none`.
- Remove the access level from the id of type long.
- Rerun the tests.

#### ToString
`ToString` annotation is used to generate the `toString()` method, which returns the class name followed with all fields in order and separated with commas.

- Add the annotation `ToString` to the Java Bean just above the class.
- Rerun the tests.
- If successful, head over to the `Movies.java` file found in the target folder.
- Find the `ToString` method automatically generated. It looks as shown below:

```java
//Return class name, all fields separated by commas in a string form
public String toString() {
Long var10000 = this.getId();
return "Movie(id=" + var10000 + ", title=" + this.getTitle() + ", description=" + this.getDescription() + ", country=" + this.getCountry() + ", rating=" + this.getRating() + ", officialSite=" + this.getOfficialSite() + ", language=" + this.getLanguage() + ", minutes=" + this.getMinutes() + ")";
}
```

#### EqualsAndHashCode
- Like in the other annotations, add the `EqualsAndHashCode` to the Movie class.

```Java
// Generate the Equals and HashCode methods
@EqualsAndHashCode
```

The `EqualsAndHashCode` annotation is used to generate the equals(Object other) and hashcode() methods. By default, the methods use all present fields as their arguments.
- Run the tests
- Check the changes in the `Movie.class` file in the target folder.

##### Exclude option
It is not a feature but rather an option for the features. If wanted or needed, some fields can be excluded from use in the functions or included. This exclusion is by the use of the `exclude` option. For example, in the `Movies.java` file, add the `exclude` option to the `ToString` and `EqualsAndHashCode` annotations as shown below:

```Java
// Don't include minutes variable in the ToString, Equals and HashCode methods
@ToString(exclude = "minutes")
@EqualsAndHashCode(exclude = "minutes")
```

Remember, minutes were included in the initial `ToString` function created above.

- Rerun the tests.
- Check the changes in the `Movie.class` file in the target folder. Notice that the minutes field is excluded from the `ToString` and `EqualsAndHashCode` functions.

#### Data
The `Data` annotation automatically generates the Getters and Setters, ToString, and EqualsAndHashCode methods. Go to the `Movie.java` file in the src folder and delete and replace all the `Getters` and `Setters`, `ToString`, and `EqualsAndHashCode` annotations by the `Data` annotation.

```Java
// Generates the Getters and Setters, ToString, and EqualsAndHashCode methods
@Data
```

- Rerun the tests.
- Check the changes in the `Movie.class` file in the target folder. Notice that the annotation replaces the others, yet it is super short.

#### NotNull
This annotation makes sure that the parameter or field is not passed as an empty value. Add the `NotNull` annotations before the id, title, and rating fields. An example is shown below:

```Java
// Ensure that the parameter or field is not passed as an empty value
@NotNull
private Long id;
```

Create a new function in the class that calculates the sum by adding the value held in the minutes field to an argument passed to it.

```java
// Simple function that adds an input to the minutes variable
int getMinutesPlusX(@NotNull int x){
return this.minutes + x;
}
```

Since it has the `NotNull` annotation near the argument being passed to it, it will not allow that argument to be passed as a blank field.

- Run the tests
- Check the changes in the `Movie.class` file in the target folder. Notice that the annotation will not allow a null value to be passed, even for the recently created function, as seen in the code generated in the `Movie.class` file found in the target folder.

```java
// Annotation won't allow null values
public int getMinutesPlusX(@NotNull int x) {
Objects.requireNonNull(this);
return 120 + x;
}
```

#### Accessors
Lombok has an interesting annotation by the name `Accessors`. This annotation removes the prefix used in fields getters and setters methods. It can both be added to the whole class or per field as required. It has different options such as fluent, chain, and prefix.

- Add the `Accessors` annotation to the id field as shown below:

```Java
// Remove the prefix in fields generated by the Getters and Setters methods
@NotNull
@Accessors(fluent = true)
private Long id;
```

- Run the tests

It produces the error as shown below:

![Can't find setId Error](/engineering-education/how-to-work-with-lombok-on-quarkus/can't-find-setId.png)

- Head over to the `Movie.class` found in the target folder. Notice that the prefix `Set` and `Get` before the field `id` is no longer there.
  It just remains to be `id`. So it is by utilizing Java's function overloading capability.
- Solve the error above by replacing all instances of `getId` and `setId` with `id` in the `MovieTest.java` file.
  Also, change the `id` function to a different name, say `idFunc()`.
- Rerun the tests again

It returns a success message.

#### Builder, Builder.Default and Singular
The `Builder` annotation does the following:

- Adds a static class with the same static method
- An empty private no-args constructor
- A Setter-like method for every parameter
- A build method that calls the method and passes in each field.
- A private non-static non-final field for every parameter
- A toString method
- A builder method instantiating a new builder instance in the class

To see out its functionality, do the following:

- Add the `Builder` annotation to the `Movie` class. It looks like this:

```Java
@Builder
```

- Rerun the tests
- Check if there is an addition of the `builder()` function in the `Movie.class` file.

In the `Movie.class` file in the target folder, it adds the following block of code:

```java
// The Annotation creates this builder code block
public static Movie.MovieBuilder builder() {
return new Movie.MovieBuilder();
}
```

Do a test using the `builder()` method created. Do this by following the steps below:
- Delete all the code block shown below:

```java
movie = new Movie();
movie.setTitle("The Lord of the Rings: The Fellowship of the Ring");
movie.setDescription("In the second age of Middle-earth, the lords of Elves...");
movie.setCountry("New Zealand - United States");
movie.setLanguage("English");
movie.setRating(8);
movie.setOfficialSite(new URL("https://www.lordsoftherings.com"));
movie.id(1L);
```

- In the same file, now add the following block of code:

```java
// It does just like the former code by setting the return values expected
movie = Movie.builder().title("The Lord of the Rings: The Fellowship of the Ring")
.description("In the second age of Middle-earth, the lords of Elves...")
.country("New Zealand - United States")
.language("English")
.rating(8)
.officialSite(new URL("https://www.lordsoftherings.com"))
.id(1L)
.build();
```

The code above uses the same returns as the former code but the `builder()` function to set them up. Rerun the tasks of testing the application to see if the code block works as expected. The return type is a success.

In the MovieBuilder class inside the `Movie.class` file generated after the tests run, one notices that it has the following in it:

```Java
private Long id;
private String title;
private String description;
private String country;
private int rating;
private URL officialSite;
private String language;
```

It lacks the integer of the name `minutes`. This lack is because it uses the final keyword. To solve this, use an annotation provided by Project Lombok called `@Builder.Default`. Then, add it above the `minutes` as shown below:

```Java
// Use Builder.Default to get through the final keyword
@Getter(AccessLevel.PRIVATE)
@Setter(AccessLevel.PRIVATE)
@Builder.Default
private final int minutes = 120;
```

- Run all the tests as before.
Check if some additional code is generated in the `Movie.class` file.

The following code is added to the class:

```Java
private boolean minutes$set;
private int minutes$value;
```

together with:

```java
public Movie build() {
int minutes$value = this.minutes$value;
if (!this.minutes$set) {
minutes$value = Movie.$default$minutes();
}
```

It shows that it has been added to the file.

- Now, add a list of strings of the name `cast` in the `Movie.java` file. It is as shown below:

```Java
// Add a list of strings with the name 'cast'
private List<String> cast;
```

- Run the tests
- Open up the `Movie.class` file

Notice that it adds a method that passes the whole list of strings as shown below:

```Java
// This method generated passes the whole list of strings
public Movie.MovieBuilder cast(List<String> cast) {
this.cast = cast;
return this;
}
```

- Add the following line of code above it before rerunning the tests:

```java
// This line passes a single string element inside the list of string cast
@Singular("cast")
```

The `Singular` annotation does the following:
- Instead of generating a Setter method, 2 Getter methods are generated
- It sets one to add a single element while the other all the elements to the collection.

- Run all the tests
- View the `Movie.class` file

Notice that now the application generates a code that adds an element inside the string of list cast as shown below, among others:

```Java
// Adds an element inside the string of list cast
public Movie.MovieBuilder cast(Collection<? extends String> cast) {
```

#### Slf4j, Lombok.config and CustomLog

Slf4j is a simple logging framework abstraction. To use the Slf4j, a new Maven dependency has to be added. In the `pom.xml` file, add the following inside the dependencies section:

```xml
<!--Slf4j dependency-->
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.6</version>
</dependency>
```

Reload the application to fetch the dependency and add it to the project, then add the following annotation to the `Movie.java` file:

```Java
// Adds the log variables to the class generated
@Slf4j
```

Lombok will provide one with log variables to write the log out of the box. It can be info, debug, or error log. For example, add the line below in the `getMinutesPlusX` function:

```Java
// Generate the log variables of the type 'info'
log.info("Adding {}", x);
```

Add the line below in the `MovieTest.java` file:

```Java
/*
* Add another test to the application
* The expected output is 121 */
  @Test
  void getMinutesPlusX() {
  int minutesPlusX = movie.getMinutesPlusX(1);
  assertNotNull(minutesPlusX);
  assertEquals(121, minutesPlusX);
  }
```

Run all the tests, then check out for the log of the type `info` generated in the log generated at the console. It should look as shown below:

![Log of type 'info' generated](/engineering-education/how-to-work-with-lombok-on-quarkus/log-info.png)

In addition, it generates the following in the `Movie.class` file:

```java
// Generated line of code
private static final Logger log = LoggerFactory.getLogger(`Movie.class`);
```

One can use the `topic` option to change the name of the log being output. To do this, modify the annotation used to as shown below:

```Java
// Specify the custom topic of all logs generated
@Slf4j(topic="MovieDAO")
```

Run the tests once more, then check for the difference in the output console. It has a custom name instead of the default. It looks as follows:

![Changes in the Log Topic](/engineering-education/how-to-work-with-lombok-on-quarkus/log-topic.png)

Lombok allows developers to use custom loggers such as the Java Logger. To do this, follow these steps:

- Add a new file in the root directory and name it `lombok.config`.
- Add the following custom configurations to it so that it allows the app to use Java Logger for logs

```properties
lombok.log.fieldisstatic = false
lombok.log.custom.declaration = java.util.logging.Logger java.util.logging.Logger.getLogger(NAME)(TOPIC)
```

For this configuration to be used, replace the `@Slf4j(topic="MovieDAO")` annotation with the `@CustomLog` annotation. Modify the `log.info("Adding {}", x);` line to give the final output as shown:

```java
// Modify the getMinutesPlusX function in order to produce logs as required
public int getMinutesPlusX(@NotNull int x){
log.info("Adding " + x);
return this.minutes + x;
}
```

![Custom logging using Java Logger](/engineering-education/how-to-work-with-lombok-on-quarkus/custom-logs.png)

### Conclusion
In conclusion, the above article provided deep insight into setting up an IDE for developing a Quarkus project with Lombok. As a result, we created a simple project to demonstrate the concept and in-depth discussion of Getters and Setters, NoArgsConstructor and the AllArgsConstructor, AccessLevel, ToString, EqualsAndHashCode, Data, NotNull, Accessors, Builder, and Slf4j.

You can find more about this topic in the [official documentaion](https://github.com/projectLombok/Lombok).

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
