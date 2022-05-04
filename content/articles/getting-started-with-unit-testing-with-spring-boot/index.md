---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-unit-testing-with-spring-boot/
title: Getting Started With Unit Testing With Spring Boot
description: This article will help the reader understand how to write unit tests with Spring Boot
author: serah-muthoni
date: 2022-05-03T00:00:00-04:30
topics: [API]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/getting-started-with-unit-testing-with-spring-boot/hero.png 
   alt: Spring Boot Testing Hero Image
---
Writing decent unit tests is a skill that takes a long time to perfect. Unit testing is one of the ways that developers ensure that individual units or components work correctly.
<!--more-->
Before any code is deployed, it is subjected to unit testing to fulfill quality standards. Unit testing ensures that Spring Boot applications and their components are working as expected.

### Prerequisites
For this tutorial, the reader would need:
- Basic knowledge of Java programming 
- Basic knowledge of Spring Boot
- An IDE installed. For this tutorial, we will use [IntelliJ IDEA Ultimate](https://www.jetbrains.com/idea/business/).

### Getting started
Before starting with the unit testing, let's first understand why it's important:

#### Advantages of unit testing
- Unit testing allows developers to locate and fix bugs earlier.

- It facilitates high-quality code. By running the test several times, developers gain confidence when changing the code. 

- Unit testing can boost a person's coding skills. Through this process, developers can learn how to write better code.

### Best practices for unit testing
Below are some of the best practices when writing unit testing:

####  Separate the functionality that needs to be evaluated.
The functionality to be tested should be isolated by restricting the context in which loaded components are used. This is achieved by using the `@Test` annotation. 

The advantage of this approach is that it is easy to locate tricky bugs and thus, promote clean production.

This particular feature, if used wisely, can help developers test large applications without impacting performance negatively.

#### Loading functionality in slices
It is crucial to restrict the application context to only the Spring components included in the test scenario. This is achieved by including them in the annotation declaration.

#### Use the `@DataJpaTest` Annotation
To increase the performance of different components, we use the `@DataJpaTest` annotation.

This is because it will not load `beans` annotated with`@Service`, `@Controller`, and the entire application context.

#### Performing tests that are database-related
It's good to simulate database-interacting beans and disable Spring Boot test DB initialization for the Spring profile where the tests are executed. 

You should always keep this practice in mind when testing controllers.

#### Make your test simple
Whenever senior developers teach unit testing to beginners, they should always ensure that the tests are straightforward. 

To achieve this, developers should keep the test with low cyclomatic complexity. Cyclomatic complexity is a coding statistic that shows how many different execution pathways a procedure can take. 

Developers are less likely to introduce problems when working on code with a lesser complexity since it is easier to understand and maintain.

### Reasons for testing
#### Repositories
The repository is a bridge between the application and the database. It is tested to ensure that relationships between the database and the applications have been correctly implemented.

#### Services
This is the layer where the business logic is implemented. It is tested to ensure that the business logic is correct.

### How to test controllers
Let us now look at how to test controllers in Spring Boot. To accomplish this, you will need to import some dependencies using the *Spring Initializer* and *IntelliJ IDEA Ultimate*. 

In *IntelliJ IDEA Ultimate*, let's create a Spring Boot application using the Spring Initializr service. 

Open `file>new>project` and select *Spring Initializr* as shown below:

> Note: If you're not using IntelliJ IDEA Ultimate, you'll need to go to the [Spring Initializer](https://start.spring.io/) and add the *Spring Web* dependency to your project. Generate the zipped file and then open it using your favorite IDE.

![Spring Initializer](/engineering-education/getting-started-with-unit-testing-with-spring-boot/spring-initializer.png)

> Note: I have renamed my Package name to `unittesting`.

Click next to proceed. Type *web* to search the required dependencies in the search bar. Select *Spring Web* and click *finish* to download the *initializr* template:

![Spring Initializer](/engineering-education/getting-started-with-unit-testing-with-spring-boot/spring-initializer-dependency.png)

We've prepared the environment successfully.🔥 Now we need to test the controller. In `/src/main/java/unittesting` create a new package named `controller`. 

Proceed to create a Java class named `HelloContoller.java` in  `/src/main/java/unittesting/controller`. Within that file, add the code below:

```java
package unittesting.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello(@RequestParam(name = "name", defaultValue = "Hello world") String name){
        return name;
    }
}
```

Let's look at the code snippet above:
- `@GetMapping` is an annotation used to map the request to the method.
- `@RequestParam` is an annotation used to map the request parameter to the method parameter.
- `@RestController` is an annotation used to indicate that the class is a controller.

The next step is to generate the controller test.  In the `HelloController.java` file, right-click and select `Generate..>Test..` in the menu. 

Select the available method (which we want to test) under the *member* and click *ok*.

![Spring Initializer](/engineering-education/getting-started-with-unit-testing-with-spring-boot/testing.png)

A new file `/src/test/java/unittesting/controller/HelloControllerTest.java` will be created. Modify the file to have the code below:

```java
package unittesting.controller;
import org.junit.jupiter.api.Test;
// import all the static methods from the Assertions class, so we may use them in this class
import static org.junit.jupiter.api.Assertions.*;

class HelloControllerTest {
    @Test
    void hello() {
        HelloController controller = new HelloController(); // instance of the controller
        String response = controller.hello("Hello world"); // act
        assertEquals("Hello world", response); // assert
    }
}
```

So far, we have created a test without including the Spring context. We should now generate another test using the *JUnit 5* extension. It will have Spring extensions provided by Spring.  

Repeat the same procedure to generate another test. Name the second test class `HelloControllerIntTest.java`. In `/src/test/java/controller/HelloControllerIntTest.java`, modify the code, as shown below:

```java
package unittesting.controller;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
@ExtendWith({SpringExtension.class})
@WebMvcTest(HelloController.class)
class HelloControllerIntTest {
    @Autowired
    private MockMvc mvc;
    @Test
    void hello() throws Exception {
        RequestBuilder request = MockMvcRequestBuilders.get("/hello");
        MvcResult result = mvc.perform(request).andReturn();
        assertEquals("Hello world", result.getResponse().getContentAsString());
    }
}
```
In the code snippet above:
- `@ExtendWith` is an annotation used to extend the test with the SpringExtension.
- `@WebMvcTest` auto-configures the MockMVC (so we can auto-wire it as demonstrated in the code above). We specify the class we want to test.

Let's test the controller to be sure it works correctly.

In the `HelloControllerTest.java` file, right-click and run `HelloControllerTest`. You should see the test passes, as shown below:

![Test output](/engineering-education/getting-started-with-unit-testing-with-spring-boot/output.png)

### Conclusion
Congratulations! You have successfully tested the controller. There are various ways to create unit tests in Spring Boot. In this tutorial, we have learned how to conduct tests using MockMV.

---
Peer Review Contributions by: [John Amiscaray](/engineering-education/authors/john-amiscaray/)