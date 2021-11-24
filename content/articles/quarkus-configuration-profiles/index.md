---
layout: engineering-education
status: publish
published: true
url: /quarkus-configuration-profiles/
title: Working with Quarkus Configuration Profiles
description: In this article, we will be learning about Quarkus profiles. These are a collection of settings that can be assigned a specific tag to access them quickly.
author: justus-mbuvi
date: 2021-11-24T00:00:00-11:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/quarkus-configuration-profiles/hero.png
    alt: Quarkus microprofile image
---

Working with Quarkus as a Reactive framework is accessible and appealing to Java users. It comes with exciting features such as hot reloading, reactive program development capabilities, quick boot and reboot time, [MicroProfile](https://microprofile.io) specification support, among many others.
<!--more-->
In this article, one will be able to learn about Quarkus profiles. These are a collection of settings that can be assigned a specific tag to access them quickly. However, access depends on the current environment in use.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Key takeaways](#key-takeaways)
- [What is Quarkus Configuration Profiles?](#what-is-quarkus-configuration-profiles)
- [Checking and configuring application properties](#checking-and-configuring-application-properties)
- [Configuring the application using Quarkus configuration profiles](#configuring-the-application-using-quarkus-configuration-profiles)
- [Setting up and using variables in different profiles](#setting-up-and-using-variables-in-different-profiles)
- [Configuration profiles in YAML files](#configuration-profiles-in-yaml-files)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
For one to follow up with the code examples and explanations given in the article, the following will be required:
- Latest Java Development Kit installed on the machine. Version 17 is used for the article.
- A good Java IDE. This article uses [IntelliJ](https://www.jetbrains.com/idea/download/) version `2021.2.2`.
- Basic concepts of Structured Query Language (SQL).
- A strong internet connection. The internet is for fetching indexes for quick development and project generation.

> Make sure to follow up on _the latest versions_ of the aforementioned technologies.
> The appearance of the applications may differ based on the release dates.

### Key takeaways
Some points to be taken in by the end of the article follow up include:
- What are Quarkus Configuration Profiles?
- Importance of configuration profiles.
- Some ways of setting up configuration profiles in Quarkus. These include setting the profiles in the `application.properties` and 'YAML' files.
- Easily navigating between the profiles set during the development stages.

### What is Quarkus Configuration Profiles?
Quarkus, like any other MicroProfile, follows the MicroProfile specifications. It allows developers to seamlessly set the variables found in the project and access them in the project scope during different life cycles.

The project's settings are usually stored in the `application.properties` file. In addition, developers can locate the file in the `resources` folder found in the `main` folder. Some variables that developers can set include pointing out to **Datasource** such as _postgresql_ or _mysql_, **Datasource properties** and settings such as the _username_, _password_, _url_, and _access port_ among others.  

Configuration files can hold variables needed during the operation of the application. These can include variables isolated from the main application source code files. Thus, the variables can later be injected into the application when needed only.
Developers prefer config files to set the overall system properties and environment variables.

Quarkus' configuration profiles are like containers that hold on settings and variables to be used in the overall application or during a particular phase in the project life cycle. They can contain one or multiple variables and settings. When used, for example, during a phase, they override similar settings or variable data set before.

Setting up these profiles is advantageous since one can quickly switch when the app is under different development stages. These are such as from development to testing and from testing to production. The switching between configurations does not require additional settings. The framework automatically does the switching for one.

### Checking and configuring application properties
In this section, the configuration of a Quarkus project will be shown.
To be able to configure the properties of the application in Quarkus, do the following:

#### Create a new Quarkus project
Open up IntelliJ (or any other IDE) and click on create a new project. Select Quarkus as the framework to be used. Then, set it up as shown in the images below:

![New Quarkus project](/engineering-education/quarkus-configuration-profiles/new-quarkus-project.png "New Quarkus project")

Set the following as its dependencies:

![Application dependencies](/engineering-education/quarkus-configuration-profiles/new-quarkus-project-dependencies.png "Application dependencies")

> An alternative way is by using the [Quarkus project initializer site](https://code.quarkus.io/).

##### Project Structure
The newly created application directory structure is as shown below:

```bash
.
├── quarkus-config-profiles
│   └── src
│     ├── main
│         ├── docker
│         ├── java
│         └── resources
│             └── META-INF
│                 ├── resources
│                 └── application.properties
│     └── test
│   ├── .dockerignore
│   ├── .gitignore
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── quarkus-config-profiles.iml
│   └── README.md
```

Locate the `application.properties` file located at the _main_ folder as shown below:

![Location of the application.properties file](/engineering-education/quarkus-configuration-profiles/application.properties-file-location.png "Location of the application.properties file")

The file is for the overall application during the development, testing, and production phases.

Run the app using the command below:

```bash
./mvnw compile quarkus:dev
```

In case it cannot run using the command above, try:

```bash
mvn compile quarkus:dev
```

As seen, the app runs at port _8080_ by default. Access the application through a new and separate terminal using:

```bash
curl http://localhost:8080/hello
```

#### Set up some configurations
Open the `application.properties` file. Next, proceed and edit it as follows:

- Set the HTTP port that takes in the requests and gives out the responses to port `8081` from the normal `8080`.
- The kind of data source. In this case, it will be PostgreSQL.
- The database credentials (Username and password).
- The JDBC URL. This URL is always used to connect the application and the database.
- Hibernate-ORM database generation property. This property provides one with complete Object Relational Mapper support.
- The log type is to be displayed in the console. That will be of the _INFO_ type.

This step is shown in the code below:
```properties
# Global
# Normal configurations
quarkus.http.port=8081
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=username
quarkus.datasource.password=password
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/my_db
quarkus.log.console.level=INFO
```

#### Testing the configurations
Restart the application and check on which port it's running on.

> Notice that it runs on the newly set port.

On a new terminal, access the application using the code below:

```bash
curl http://localhost:8081/hello
```

### Configuring the application using Quarkus configuration profiles
Achieve this by following the steps below:

- [Learn on setting up the configuration formats](#quarkus-configuration-profile-formats).
- Set up the configuration profiles.
- Test the configuration profiles set.

#### Quarkus' Configuration Profile formats
The available configuration profiles for Quarkus are three. These are:
- **dev**: This is only active in the _development_ phase. For instance, when executing `./mvnw compile quarkus:dev`.
- **test**: Its application is in the _test_ phase. For instance, when executing the `./mvnw compile quarkus:test`.
- **prod**: This is only active in the _production_ phase. For instance, when executing `./mvnw package`. Finally, developers will apply the settings to the packaged application used in the operational environment.

Quarkus recognizes by default the profiles above. However, this does not mean adding other customizable profiles apart from the three mentioned above is impossible. This method is shown later on.

The configuration profiles have a particular format for them to be recognized and separated from another. It begins with the percentage or modulus sign (%), followed by the profile name and the variable or settings. Finally, these will be separated by a period sign (`.`).
It will be ended by the value to be held.

This format will look as follows:
```properties
# An example of a configuration profile format
%{quarkus-profile-name}.configuration=value
%{quarkus-profile-name}.variable=value
```

So, for instance, if it is under the development profile, it can be:
```properties
%dev.quarkus.http.port=8082
```

That overrides the one in the default or the global configuration. Hence, the HTTP access port will be `8082` during the development phase.

#### Using default configuration profiles
To use the following in the application, copy and paste the following to the `application.properties` file:
```properties
# Global
# Normal configurations
quarkus.http.port=8081
quarkus.datasource.db-kind=postgresql
quarkus.datasource.username=username
quarkus.datasource.password=password
quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/my_db
quarkus.log.console.level=INFO

# Development configuration profile
%dev.quarkus.http.port=8082
%dev.quarkus.log.console.level=ALL

# Testing environment configuration profile
%test.quarkus.http.port=9090
%test.quarkus.log.console.level=DEBUG
%test.quarkus.datasource.db-kind=postgresql
%test.quarkus.datasource.username=username
%test.quarkus.datasource.password=password
%test.quarkus.datasource.jdbc.url=jdbc:postgresql://localhost:5432/my_db
%test.quarkus.http.access-log.enabled=true

# Production configuration profiles. This is mainly used for the final package before deployment
%prod.quarkus.package.type=uber-jar
%prod.quarkus.http.port=8085
```

**Dev mode**

Now run the application using the development configuration profile in dev mode.
Do this by running this code in the terminal:
```bash
./mvnw compile quarkus:dev
```

Notice in the logs that the app is running on port 8082.

Access it by running on the other separate terminal the following command:
```bash
curl http://localhost:8082/hello
```

**Test mode**

Run the following command:
```bash
./mvnw compile quarkus:test
```

**Production mode**

The settings will allow the application to be packaged as an '_uber-jar_' file type. An **uber-jar** file has all its dependencies, unlike the typical _jar_ file, which has its dependencies in a separate location.

Run the following command:
```bash
./mvnw package
```

Check the packaged file inside the 'target' folder.
Run the jar file by executing the following command:
```bash
java -jar target/quarkus-config-profiles-1.0-SNAPSHOT-runner.jar
```

One can access this running application via:
```bash
curl http://localhost:8085/hello
```

One can also change the data source based on those available. 

For example, one can choose `H2` instead of Postgres or any other as needed. Developers can set the data sources differently for different profiles.

For instance, it is possible to run the application with a local database server in the development phase while deploying the packaged application that uses a remote database in the Production mode.

#### Using user-defined configuration profile
Use the same format as shown above to accomplish this. For example, for a profile with the name "prototype", under the other profiles, do the following:
```properties
# Prototype stage
%prototype.quarkus.http.port=9095
%prototype.quarkus.log.console.level=ALL
```

Run the app in the profile set by running the following:
```bash
./mvnw compile quarkus:dev -Dquarkus.profile=prototype
```

This command means that the development mode will be run using the 'prototype' configuration profile. This configuration profile will be used instead of the _'dev'_.

Access the app via:

```bash
curl http://localhost:9095/hello
```

### Setting up and using variables in different profiles
Variables set in this location can be injected into the application following the Java EE and MicroProfile standards and specifications.
The variables can override the previously set environment variable value depending on the configuration profile in use.

#### Setting up variables
To add variables, for instance, variables called '_name_', '_age_' and '_height_' that belong to a '_**person**_' object add the code below to the file under the **GLOBAL** configuration settings:
```properties
# Global variables
person.name=john
person.age=28
person.height=165
```

Add the following under the 'dev' profile:
```properties
# Dev variables
%dev.person.name=alice
%dev.person.age=20
%dev.person.height=154
```

Add the following under the 'test' profile:
```properties
# Test variables
%test.person.name=mike
%test.person.age=22
%test.person.height=170
```

Add the following under the 'prod' profile:
```properties
# Production variables
person.name=tom
person.age=12
person.height=100
```

Add the following under the 'prototype' profile:
```properties
# Prototype variables
person.name=jane
person.age=54
person.height=174
```

#### Injecting the variables
Head over to the 'ExampleResource.java' file. Add the following code in the file inside the class. That is above the other blocks:
```java
@ConfigProperty(name = "person.name")
String name;

@ConfigProperty(name = "person.age")
String age;

@ConfigProperty(name = "person.height")
String height;
```

Add another endpoint in the class, then access it via `http://localhost:8081/hello/person`. Its code is as follows:
```java
@Path("/person")
@GET
@Produces(MediaType.TEXT_PLAIN)
public String person() {
  return "The person is " + name + " of age " + age + " yrs and of height of " + height + " cm";
}
```

In the 'test' folder, search for the `ExampleResourceTest.java` file and open it. Add the code below in the class:
```java
@Test
public void testPersonEndpoint() {
  given()
    .when().get("/hello/person")
    .then()
    .statusCode(200)
    .body(is("The person is mike of age 22 yrs and of height of 170 cm"));
}
```

This test shall be used to check if the output of the profile used is as expected.

#### Testing the variables
Now that we've set up the profiles in the previous section, let's proceed and carry out project tests as follows:

##### Testing in the dev profile
Run the application using the following:
```bash
./mvnw compile quarkus:dev
```

In another terminal, access it by running the following command:
```bash
 curl http://localhost:8082/hello/person.
```

The results will be '_The person is mike of age 22 yrs and of the height of 170 cm_'. The output of this result is because the _test_ profile is used when the tests are run.

On the terminal with the logs, key in `r` to run the tests. If it produces a successful output, then all is well.

##### Testing in the prototype profile
Run the application using the following:
```bash
./mvnw compile quarkus:dev -Dquarkus.profile=prototype
```

In another terminal, access it using `curl http://localhost:9095/hello/person`.

On the terminal with the logs, key in `r` to run the tests. If it produces a successful output, then all is well.

The expected output is, '_The person is jane of age 54 yrs and of the height of 174 cm_'.

### Configuration profiles in YAML files
Another method in which one can configure profiles in Quarkus is by use of the YAML files.

To do this, follow the steps below:

Open up a new terminal and run the command below:
```bash
./mvnw quarkus:add-extension -Dextensions="io.quarkus:quarkus-config-yaml"
```
The above command will add the `quarkus-config-yaml` extension that enables quick and easy use of the YAML files in the project.

Alternatively, add the block of code below inside the `pom.xml` file inside the dependencies section:
```xml
<!--Add the quarkus-config-yaml extension to your project-->
<dependency>
  <groupId>io.quarkus</groupId>
  <artifactId>quarkus-config-yaml</artifactId>
</dependency>
```

Reload the whole project by right-clicking on the `pom.xml` file and selecting the `Reload project` option under the `Maven` option. Similarly, just restart the IDE, and it will refresh the project.

Rename the `application.properties` file to `application.properties.OLD`. It makes its contents available in the system but not used in the application. This renaming aids in referring to the configurations when converting them into the YAML file.

In the exact location as the `application.properties.OLD` file, create a new file named `application.yml`.

Now, use the indentation formatting styles to translate the configs from the  `application.properties.OLD` to the `application.yml` file. It is shown below:
```yaml
# Global configurations and variables
quarkus:
  http:
    port: 8081
  datasource:
    db-kind: postgresql
    username: username
    password: password
    jdbc:
      url: jdbc:postgresql://localhost:5432/my_db
  hibernate-orm:
    database:
      generation: drop-and-create
  log:
    console:
      level: INFO

person:
  name: john
  age: 28
  height: 165

# Dev configurations and variables
"%dev":
  quarkus:
    http:
      port: 8082
    log:
      console:
        level: ALL
  person:
    name: alice
    age: 20
    height: 154

# Testing environment configuration profile
"%test":
  quarkus:
    http:
      port: 9090
      access-log:
        enabled: true
    log:
      console:
        level: DEBUG
    datasource:
      db-kind: postgresql
      username: username
      password: password
      jdbc:
        url: jdbc:postgresql://localhost:5432/my_db
  person:
    name: mike
    age: 22
    height: 170

# Production configuration profiles.
"%prod":
  http:
    port: 9095
  quarkus:
    package:
      type: uber-jar

# Prototype profile
"%prototype":
  quarkus:
    http:
      port: 9095
    log:
      console:
        level: ALL
  person:
    name: jane
    age: 54
    height: 174
```

Restart the application in the prototype profile using:
```bash
./mvnw compile quarkus:dev -Dquarkus.profile=prototype
```

Test the outcome by running:
```bash
curl http://localhost:9095/hello/person
```

The output is '_The person is jane of age 54 yrs and of height of 174 cm_'. Run the tests in the log terminal by pressing `r`. The tests will run successfully as before.  

This run proves that the configurations in the `application.properties` file are equal to that in the `application.yml` file.

Try restarting the project in the other profiles. Add new profile configurations and variables and run the application in them.

Find the Repository with the article right [here](https://github.com/justusmbuvi/Quarkus-Configuration-profiles). Then, clone it and use it as per the licenses.

### Conclusion
System development is a time-taking process involving several changes in settings as the product's environment changes. That led to the need for a quick way to switch between them, hence the introduction of configuration profiles.

In this article, we've discussed and learned what is Quarkus configuration profiles, types of the profiles such as the development, production, testing, and custom; setting them up in Quarkus in `application.properties` file and `YAML` files, and using and testing them in the project.

Find out more on Quarkus configuration profiles such as system properties, environment variables, MicroProfile configuration files, among many others [here](https://quarkus.io/guides/config-reference). You can discover more on Quarkus and its extensions [here](https://www.bookstack.cn/read/quarkus-1.7-en/fdda5b8a1dd02bf6.md).

### References
- [Quarkus Hibernate ORM](https://quarkus.io/guides/hibernate-orm)

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
