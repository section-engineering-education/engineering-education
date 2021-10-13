---
layout: engineering-education
status: publish
published: true
url: /getting-experiential-on-a-quarkus-project/
title: Getting Started With Quarkus
description: In this tutorial, we will get started on Quarkus and learn how we can develop Quarkus projects using different tools and software environments.
author: chris-mutua
date: 2021-08-20T00:00:00-11:50
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/getting-experiential-on-a-quarkus-project/hero.png
    alt: Quarkus project image example
---
Quarkus is an effective, open-source, Java native framework used for creating and managing Kubernetes native Java stack, microservices, and serverless environments which are optimized for the open JDK and the GraalVM runtime.
<!--more-->
Similar to the Spring Boot framework, Quarkus is a combination of different Java libraries and standards providing you consolidation along with improvements on the JVM.

Although this framework is young compared to the language (over 20 years old), it has promising features and results that make it useful to developers.

Quarkus is natively integrated with Java libraries, hence you don't have to learn anything new.

In this tutorial, we will get started on Quarkus and learn how we can develop Quarkus projects using different tools and software environments.

### Table of Contents
- [Key takeaways](#key-takeaways)
- [Prerequisites](#prerequisites)
- [Quarkus briefs](#quarkus-briefs)
- [Comparison between Quarkus and other Java frameworks](#comparison-between-quarkus-and-other-java-frameworks)
- [Getting started with a Quarkus project](#getting-started-with-a-quarkus-project)
  - [Quarkus.io project initializer](#quarkusio-project-initializer) - [Folder structure](#folder-structure)
    - [Using Visual Studio Code](#using-visual-studio-code)
    - [Using IntelliJ](#using-intellij)
- [Compiling your Quarkus project](#compiling-your-quarkus-project)
- [Quarkus extensions](#quarkus-extensions)
- [Running tests of the Endpoint](#running-tests-of-the-endpoint)
- [Adding a website template to Quarkus resources](#adding-a-website-template-to-quarkus-resources)
- [Building the application](#building-the-application)
- [Running the created application](#running-the-created-application)
- [Testing the application using JConsole and IntelliJ profiler](#testing-the-application-using-jconsole-and-intellij-profiler)
- [Building and runnning a Quarkus project in a Docker container](#building-and-running-a-quarkus-project-in-a-docker-container)
- [Conclusion](#conclusion)
- [Further activities](#further-activities)
- [References](#references)

### Key takeaways
At the end of this article, the reader should learn the following:
- A comparison between Quarkus and other Java frameworks.
- Quarkus prerequisites.
- Advantages and trade-offs of Quarkus framework.
- Creation of a Quarkus application using different methods or tools, such as from the [https://code.quarkus.io/](https://code.quarkus.io/) website, using Visual Studio Code and IntelliJ.
- Quarkus project structure.
- Differences between the Quarkus framework and the Spring Boot framework.
- Testing Quarkus resources usage using JConsole.

### Prerequisites
For easy follow-up on this article, you need to have:
- A modern IDE that supports Java frameworks installed on your machine. This may either be Visual Studio Code or IntelliJ (Ultimate version) or any other. We shall focus on the two in this article.
- A stable internet connection for dependency downloads.
- JDK 11+ of any distribution installed. This is because Quarkus is not supported with lower versions than 11.
- Gradle or Apache Maven 3.8.1+ installed.
- Java programming skills.
- Must have interacted with at least one Java framework.
- A stable internet connection.

### Quarkus briefs
Some features provided by Quarkus include:
- **Hot reload**: Each code change will reload and the differences will be automatically reflected in the system.
- **Imperative and Reactive development**: That is, it supports both synchronous and asynchronous operations.
- **Standards and Libraries**: More Libraries built on known standards easily support full-stack development.

### Comparison between Quarkus and other Java frameworks
Java is a well-built and supported language. It has many available frameworks for large and small projects.

The frameworks include:
- Spring
- Spring Boot
- Hibernate
- Struts
- Google Web Toolkit (GWT)
- Blade
- Grails
- Quarkus
- Micronaut
- Microprofile

Applications are built based on algorithms and data structures, while frameworks are chosen based on performance and efficiency.

Below is a look at the similarities and differences between Quarkus and other Java frameworks such as Spring Boot, Micronaut, and Microprofile.

#### Quarkus vs Spring Boot
_**Similarities**:_
- Both use spring web dependencies.
- Both have similar REST points.
- Both are built using Maven and Gradle into JAR files.

_**Differences**:_
- Quarkus' applications are faster and more efficient than Spring Boot's. Quarkus was built for performance and efficiency,taking the least amount of memory, boot, and response time.
- Quarkus is a modern framework, while Spring Boot has stayed in the industry for a long time.
- Compared to Quarkus, Spring Boot has a great community due to its time present. Quarkus has an increasing community.

#### Quarkus vs Micronaut
_**Similarities**:_
- Both are modern frameworks.
- Both are built for micro-services and serverless applications.
- Both are built for JDK and GraalVM.

_**Differences**:_
- Quarkus relies more on Java Enterprises and Eclipse MicroProfile APIs, while Micronaut defines its APIs and is more based on the Spring and Grails frameworks.
- Quarkus is based on an extension architecture that makes it integrate easily with third-party frameworks, while Micronaut has an Aspect-Oriented Programming (AOP) implementation that doesn't use reflection to define cross-cutting concerns.

> **[GraalVM](https://www.graalvm.org/)**: A high-performance JDK distribution.

#### Quarkus vs Microprofile
_**Similarities**:_
- Both are centered on micro-services and serverless applications.
- Both are compatible with each other since Quarkus is an implementation of Microprofile which is well-built based on the given specifications.

_**Differences**:_
- While Microprofile is used to do micro-services specification in the Java enterprise environment, Quarkus is an **implementation** of Microprofile which is well-built based on the given specifications.

Quarkus boasts of its reload speed and memory efficiency when built and run on Native environment via [GraalVM](https://www.graalvm.org/) followed by the JVM compared to the Traditional environment.

![Quarkus efficiency and performance](/engineering-education/getting-experiential-on-a-quarkus-project/Quarkus_efficiency_image.png "This shows how Quarkus performs in Native, JVM, and Traditional environments")
_(Photo from Official Quarkus website)_

### Getting started with a Quarkus project
We can use the tools below to create a Quarkus project:
- [Quarkus.io](https://code.quarkus.io/) project initializer.
- Using Visual Studio Code.
- Using IntelliJ.

#### Quarkus.io project initializer
[Quarkus.io](https://code.quarkus.io/) project initializer, just like the [Spring initializer](https://start.spring.io/) or [Micronaut initializer](https://micronaut.io/launch), is used to quickly create a Quarkus project together with all needed dependencies.

Just head over to the site.

![code.quarkus.io](/engineering-education/getting-experiential-on-a-quarkus-project/code.quarkus.io.png "The main code.quarkus.io page")
_(Screenshot by Author)_

You can do the following:
- Rename the _Group_, _Artifact_, and the _Build Tool_.
- Search and select the needed dependencies before generating your project zip file. Dependencies can also be added using the Quarkus CLI as you will see later on.
- Add more configurations such as the SNAPSHOT version and availability of Starter code by clicking on the 'CONFIGURE MORE OPTIONS'.

Go ahead and generate your project with the following:
- **Group**: org.ecommerce.quarkus
- **Artifact**: ecommerce-quarkus
- **Build Tool**: <_Select your build tool_>

_Select your build tool_: That is whether Maven or Gradle.

- **Dependencies**: RESTEasy JAX-RS - This will help you create REST API endpoints using JAX-RS.
- Click on the `Generate your Application` button to generate your app.
- Download the zip file, extract it and open it on your preferred IDE.
- You notice that you can also 'Push to GitHub' directly by clicking on the dropdown button.

##### Folder structure
The following shows you how the application folder looks like if you have used Maven as your build tool:

```bash
.
├── .mvn
├── src
│   ├── main
│       ├── docker
│       ├── java
│       └── resources
│   └── test
├── mvnw.cmd
├── mvnw
├── .gitignore
├── .dockerignore
├── pom.xml
└── README.md
```

Folder structure if you use Gradle

```bash
.
├── gradle
├── src
│   ├── main
│       ├── docker
│       ├── java
│       └── resources
│   ├── native-test
│   └── test
├── .gitignore
├── .dockerignore
├── build.gradle
├── gradle.properties
├── gradlew
├── gradle.bat
├── settings.gradle
├── pom.xml
└── README.md
```

Availability of Dockerfile in the project indicates that it can support micro-services for your project in containers.

The project lacks the `main class`, as in the Spring Boot framework, inside the `ecommerce-quarkus/src/main/java/org/ecommerce/quarkus`. 

It has the `EcommerceResource.java` file which by default has a simple `hello` REST endpoint.

#### Using Visual Studio Code
- Open up VS Code. Make sure that Java tools are well installed. Some are shown [here](https://code.visualstudio.com/docs/languages/java).
- Click on the extensions tab.
- Search for `Quarkus` in the extensions tab identified by `redhat.vscode-quarkus`, built by the 'Redhat team'.
- Its preview is as shown below:

![VSCode Quarkus extension](/engineering-education/getting-experiential-on-a-quarkus-project/VSCode-Quarkus-extension.png "VSCode-Quarkus-extension.png")
_(Screenshot by Author)_

- Install it and restart the application.
- You will notice that when you wait for some time, the application automatically opens up a new Quarkus initializer window.

The window will look as follows:

![VSCode-Quarkus-start.png](/engineering-education/getting-experiential-on-a-quarkus-project/VSCode-Quarkus-start.png "VSCode-Quarkus-start.png")
_(Screenshot by Author)_

- If it does not, just navigate to the command palette found in the `Views` menu.
- Search for Quarkus and choose `Create a Quarkus project`.
- On the pop-up window that displays, select the build tool, then the `groupIdartifactId`, project version, package name, resource name (i.e. EcommerceResource).
- Select `extensions` or the `dependencies` (RESTEasy JAX-RS) by searching and clicking on it.
- Once done, click `Enter` to move to the next step.
- Select whether to use a starter code or not.
- Select the folder to generate the Project.
- Now, select whether to open the project on the current or new window by adding it to the current workspace.

#### Using IntelliJ
- Launcher your IntelliJ application.
- Click on the `Create New Project` button.
- On the left-hand side of the opened window, select Quarkus as your project type.

> Intellij provides you with the text inputs for your project's _Group_, _Artifact_, _Build Tool_, _Language_ (Java or Kotlin), and _Project SDK_.

![Quarkus IntelliJ start](/engineering-education/getting-experiential-on-a-quarkus-project/Quarkus-IntelliJ-start.png "Quarkus IntelliJ start")
_(Screenshot by Author)_

- It then automatically fetches the files for your project, extracts them, and opens them up.

![Quarkus IntelliJ start extensions](/engineering-education/getting-experiential-on-a-quarkus-project/Quarkus-IntelliJ-start-extensions.png "Quarkus IntelliJ start extensions")
_(Screenshot by Author)_

### Compiling your Quarkus project
Compilation of the application is done using the `mvnw` file found inside the project folder ('ecommerce-quarkus'). Make sure that you are in the folder which shall be your working directory, otherwise, run the command below:

```bash
cd ecommerce-quarkus
```

You can now compile your application.

Do this by running the following command in the terminal window:

**Maven**:

```bash
./mvnw compile quarkus:dev
```

This builds the app in development mode, allowing live reloading (hot reload).

You can follow the instructions provided on the terminal to navigate around.

**Gradle**:

As for a Gradle project, run:

```shell
./gradlew quarkusDev
```

In the output displayed to the Terminal, you will see the _URL_ to access the application together with the installed features.

This is shown in the image below:

![Compilation development terminal](/engineering-education/getting-experiential-on-a-quarkus-project/dev-terminal.png "Compilation development terminal")
_(Screenshot by Author)_

By default, Quarkus on `http://localhost:8080/` request, will return the file in the `ecommerce-quarkus/src/main/resources/META-INF/resources/`.

Commonly, the `index.html` file found there will be your output. Access the app using the browser or terminal to view the outputs.

**Browser**:

In the browser, open `localhost:8080` or `http://0.0.0.0:8080/` to access the application.

You will see the `index.html` file found inside `ecommerce-quarkus/src/main/resources/META-INF/resources`.

The _Application configurations_ are always set in `ecommerce-quarkus/src/main/resources` inside the `application.properties` file.

Since Quarkus now ships with the `Dev mode user interface (Dev UI)` available, you can use it to run and view the project in a dev mode.

Just access it in your browser using `http://localhost:8080/q/dev/`. This functionality is only available in dev mode.

![dev-ui](/engineering-education/getting-experiential-on-a-quarkus-project/dev-ui.png "dev-ui")
_(Screenshot by Author)_

You can now easily add configurations for the project using the interface by clicking on the `Config Editor` button.

**Terminal**:

If you have **_curl_** installed, you can enter the command `curl http://localhost:8080/hello` in the terminal window to give the _return_ value as an output.

Change the return value to `Second hot reload!` and save. Now the output will automatically be modified utilizing the hot reload functionality.

Whenever a request is fetched, the application records the action in the terminal.

You can also notice that it is utilizing the [`Vert.X`](https://vertx.io/) framework per the terminal output as shown in the image below:

![vert.x-worker](/engineering-education/getting-experiential-on-a-quarkus-project/vert.x-worker.png "vert.x-worker.png")
_(Screenshot by Author)_

> What is Vert.X?
> [**Vert.X**](https://vertx.io/): is an _Open source toolkit_ that is used to build distributed reactive systems on the top of the JVM using an asynchronous development model.

To add built-in injection for instance, from the configurations, you will just need to do the following in the `EcommerceResource.java` file:
- First import the application configurations.
- Inject and configure the property to be injected into the file for use or display.
- Return the values as your output.

```java
package org.ecommerce.quarkus;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class EcommerceResource {
    @Inject
    @ConfigProperty(name="greeting")
    String greeting;

    @Inject
    @ConfigProperty(name="key")
    String key;

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return greeting + " " + key;
    }
}
```

In the `application.properties` file, add the following:
- A configuration property named `greeting` and its value as 'Hi Docs?'
- Another one with the configuration property named `key` and its value like '4455'

```java
greeting = Hi Docs?
key = 4455
```

- Save all and run `http://localhost:8080/hello` to see the return value as `Hi Docs? 4455`.X-RS. This will help you create REST API endpoints using JAX-RS.
- Click on the `Generate your Application` button to generate your app.
- Download the zip file, extract it and open it on your preferred IDE.

You can notice that you can also `Push to GitHub` directly by clicking on the dropdown options in the button.

### Quarkus extensions
You can view **all** extensions supported by Quarkus in the terminal using the command below:

```bash
 ./mvnw quarkus:list-extensions
```

If you need to install more than one additional extensions, install:
- JSON-B
- Hibernate Reactive with Panache

Run the command below to install them:

```bash
./mvnw quarkus:add-extension -Dextensions="quarkus-jsonb, quarkus-hibernate-reactive-panache"
```

The extensions are fetched using their unique identifier in which the names are separated with hyphens (found on the right column of the displayed list).

> _Remember to separate the extensions with commas._

Check the '**pom.xml**' file for the installed dependencies.

For instance, for the installed '_JSON-B_' extensions, you will see the code below:

```xml
    <dependency>
      <groupId>io.quarkus</groupId>
      <artifactId>quarkus-jsonb</artifactId>
    </dependency>
```

To install all extensions matching a globalizing pattern is possible.

For example, installing all which have 'Hibernate' in their name can be done as follows:

```bash
./mvnw quarkus:add-extension -Dextensions="hibernate-*"
```

To uninstall a Quarkus dependency, just head over to the '**pom.xml**' file and delete the dependency and the properties inside its tags.

These may include the _groupId_ and the _artifactId_.

Re-compile and re-build the application.

### Running tests of the endpoint
Run the tests found in the '**test**' folder to see if the endpoints are working correctly. Open the `EcommerceResourceTest` file found in the `test/java/org.ecommerce.quarkus` folder.

Since you had made the output of the Endpoint to be `Hi Docs? 4455`, change it to replace it with that of the initial results.

```java
package org.ecommerce.quarkus;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class EcommerceResourceTest {

    // Change the expected output
    @Test
    public void testHelloEndpoint() {
        given()
          .when().get("/hello")
          .then()
             .statusCode(200)
             .body(is("Hi Docs? 4455"));
    }

}
```

### Adding a website template to Quarkus resources
To add a website template to be automatically displayed when `http://localhost:8080/` (default URL with no endpoints) is accessed:
- Head over to this [link](https://themewagon.com/themes/free-responsive-bootstrap-4-html5-food-website-template-cake/) and download the free cakes' template to try it out. You can find and download other free templates at [https://themewagon.com/themes](https://themewagon.com/themes).
- Once downloaded, extract it and copy paste all the contents inside the folder to the 'resources' folder mentioned previously.
- The contents include the `index.html'` and all its styling and scripts.

![Static webpage template](/engineering-education/getting-experiential-on-a-quarkus-project/template.png "Static webpage template")
_(Screenshot by Author)_

- Open the browser and access it via `http://localhost:8080/`. Find the output through the terminal using `curl http://localhost:8080/`.
- Stop the application using the `q` or `Ctrl + C` command in the interactive terminal.

### Building the application
Build or package the application into a _JAR_ using the following command:

**Maven**:

```bash
./mvnw package
```

or in **Gradle** using:

```bash
./gradlew quarkusDev
```

You can perform both the build and clean process which will remove all the previous build output in the build directory.

- In **Maven**:

```bash
./mvnw clean package
```

If the tests take too long to run or produce errors, that is the dependency compatibility tests which you can skip by:

```bash
./mvnw -DskipTests=true package
```

The advantage of this command is that it leads to faster builds and few errors. On the contrary, it might include future dependency unseen errors.

When done successively, it creates the `quarkus-run.jar` file in the `target/quarkus-app/` folder.

> **NOTE**: The application _JAR_ file created is not an _über-jar_ type.
> This is because the dependencies are copied into the `target/quarkus-app/lib/` directory.
>
> An _**über-jar**_ is also known as a **Fat** jar, which is a JAR file with all its dependencies.
> You can build an _über-jar_ by running:
>
> ```shell
> ./mvnw package -Dquarkus.package.type=uber-jar
> ```

### Running the created application
Run the newly created JAR file using:

```bash
java -jar target/quarkus-app/quarkus-run.jar
```

The application is now of a smaller size and more efficient. It has all dependencies and resources needed and can be accessed.

### Testing the application using JConsole and IntelliJ profiler
**JConsole** is an open-source graphical JVM and Java applications monitoring tool used to monitor applications running on both local and remote machines.

It comes with a JDK installation hence no additional installations are needed.

Open it by running `jconsole` in a new terminal. On the newly opened window, select your `running local process.`

Run your packaged application by using the command:

```bash
java -jar target/quarkus-app/quarkus-run.jar
```

That is the `quarkus-run.jar` JVM, connect to it.

![JConsole Quarkus app](/engineering-education/getting-experiential-on-a-quarkus-project/JConsole-Quarkus.png "JConsole Quarkus app")
_(Screenshot by Author)_

Now, fetch some data on the end-points in terminal windows as before.

![JConsole Quarkus Resources](/engineering-education/getting-experiential-on-a-quarkus-project/JConsole-Quarkus-resources.png "JConsole Quarkus Resources")
![JConsole VM Summary](/engineering-education/getting-experiential-on-a-quarkus-project/JConsole-VM-Summary.png "JConsole VM Summary")
_(Screenshots by Author)_

Observe the application performance in terms of the metrics below:
- CPU threads in usage
- CPU usage
- Memory heap usage
- MBeans
- Classes as shown below:

You can use the `IntelliJ profiler` as a `JConsole substitute` to view Java processes or even snapshots. It is located in your status bar as shown below.

When you open it, it shows running JVMs and if you either click or right-click on any, it will show you drop-down options.

![Intellij profiler](/engineering-education/getting-experiential-on-a-quarkus-project/Intellij-profiler.png "Intellij profiler")
_(Screenshot by Author)_

Available options include: CPU and memory live charts, attach the profiler to process (Java flight recorder, Async profiler), capture memory snapshots, and get thread dump.

Select the `CPU memory live charts` options:

![Intellij profiler stats](/engineering-education/getting-experiential-on-a-quarkus-project/Intellij-profiler-stats.png "Intellij profiler stats")
_(Screenshot by Author)_

### Building and running a Quarkus project in a docker container
- Before building the container image, first run the following in a new terminal window:

```bash
./mvnw package
```

This command packages the application before the image is created.

- Now run the command below to build the image:

```bash
docker build -f src/main/docker/Dockerfile.jvm -t quarkus/ecommerce-quarkus-jvm .
```

- Run the container using the following terminal command:

```bash
docker run -i --rm -p 8080:8080 quarkus/ecommerce-quarkus-jvm
```

This exposes the internal application port _8080_ to the host port, _8080_.

Additionally, it removes the container once closed due to the presence of the `--rm` docker option.

You can stop the container using `docker stop quarkus/ecommerce-quarkus-jvm` and remove it using `docker rm quarkus/ecommerce-quarkus-jvm`.

To create and store the image into your local machine, remove the `--rm` (remove) options.

Run `docker ps -a` to view your container in the list of locally stored containers.

You can access the docker container application by first running it using the command above and then opening `http://localhost:8080/` in the browser or terminal.

### Conclusion
Quarkus is a modern Java framework built with performance and efficiency in mind for micro-services and serverless applications. It is based on Microprofile standards which define micro-services rules and utilizes Java EE dependencies.

The following is a list of the concepts discussed in this tutorial:
- What Quarkus is and the problems the developers tried to solve when creating it.
- Comparison between Quarkus and other Java frameworks such as Spring boot, Microprofile, and Micronaut.
- How to get started with Quarkus using [Quarkus.io](https://code.quarkus.io/), visual studio Code, and IntelliJ development environments.
- How to compile, build, and run Quarkus applications in both Operation and development environments.
- How to add website templates in the project and other endpoints.
- Adding more dependencies to the project.
- Creating Quarkus native applications.
- Testing the application and profiling how it utilizes system resources using JConsole and the IntelliJ built-in profiler.
- Working with Quarkus applications inside Docker containers.

### Further activities
- Build a native Quarkus image using GraalVM as illustrated [here](https://quarkus.io/guides/building-native-image).
- Quarkus can be used to run another application inside it on a separate port by placing it inside the resources. Try this out and route the endpoints in your project to fetch values from a database.
- Try using Quarkus to create a distributed micro-services application by utilizing Kubernetes and Kafka dependencies available.

### References
- [Free cakes' website template](https://themewagon.com/themes/free-responsive-bootstrap-4-html5-food-website-template-cake/)
- [Other free templates](https://themewagon.com/themes/)
- [RESTEasy JAX-RS guide](https://quarkus.io/guides/rest-json)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
