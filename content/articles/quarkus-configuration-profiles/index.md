Working with Quarkus as a Reactive framework is easy and appealing to Java users. It comes with exciting features such as hot reloading, reactive program development capabilities, quick boot and reboot time, MicroProfile specification support, among many others. 

In this article, one will be able to learn about Quarkus profiles. These are like a collection of settings that can be assigned a specific tag to access them quickly. But, of course, access depends on the current environment in use.

### Table of Contents
- [Key takeaways](#key-takeaways)
- [Prerequisites](#prerequisites)
- [What is Quarkus Configuration Profiles?](#what-is-quarkus-configuration-profiles)
- [Checking and configuring application properties](#checking-and-configuring-application-properties)
  - [Creating a new Quarkus project](#creating-a-new-quarkus-project)
    - [Project structure](#project-structure)
  - [Set up some configurations](#set-up-some-configurations)
  - [Testing the configurations](#testing-the-configurations)
- [Configuring the application using Quarkus configuration profiles](#configuring-the-application-using-quarkus-configuration-profiles)
  - [Quarkus' Configuration Profile formats](#quarkus-configuration-profile-formats)
  - [Using default configuration profiles](#using-default-configuration-profiles)
  - [Using user defined configuration profile](#using-user-defined-configuration-profile)
- [Setting up and using variables in different profiles](#setting-up-and-using-variables-in-different-profiles)
  - [Setting up variables](#setting-up-variables)
  - [Injecting the variables](#injecting-the-variables)
  - [Testing the variables](#testing-the-variables)
    - [Testing in the dev profile](#testing-in-the-dev-profile)
    - [Testing in the prototype profile](#testing-in-the-prototype-profile)
- [Configuration profiles in YAML files](#configuration-profiles-in-yaml-files)
- [Conclusion](#conclusion)
- [References](#references)

### Key takeaways
Some points to be taken in by the end of the article follow up include:
- What is Quarkus Configuration Profiles
- Importance of configuration profiles
- Some ways of setting up configuration profiles in Quarkus. These include setting the profiles in the `application.properties` and 'YAML' files.
- Easily navigating between the profiles set during the development stages.

### Prerequisites
For one to follow up with the code examples and explanations given in the article, the following will be required:
- Java Development Kit installed on the machine. The recommendation is the latest JDK in the market. JDK 17 is used for the article.
- A good Java IDE. The recommendation is the latest version of the IntelliJ Ultimate edition. This choice is because it supports MicroProfile, among which Quarkus is one of them. IntelliJ version `2021.2.2` was used for the article, as seen in the screenshot captured.
- Familiar with databases.
- A good internet connection. The internet is for fetching indexes for quick development. It will also be used in the generation of the project.

> **NOTE**:- These pre-requisites may change as time goes by ever since the day that the article is published.
> Make sure to follow up on _the latest versions_ of the technologies mentioned above.
> The appearance of the applications used may also differ based on the release dates.

### What is Quarkus Configuration Profiles?

Quarkus, like any other MicroProfile, follows the MicroProfile specifications. This property makes it to be able to allow developers to set the variables found in the whole project seamlessly so that they can be accessed in the project scope during different project life cycles.
The settings of the project are usually stored in the `application.properties` file. The file can be located in the `resources` folder found in the `main` folder. Some variables that can be set include pointing out to **Datasource** such as _postgresql_ or _mysql_, **Datasource properties** and settings such as the _username_, _password_, _url_ and _access port_ among others.

Configuration files can hold variables needed during the operation of the application. These can include variables that are to be isolated from the main application source code files. The variables can later be injected into the application when needed only.
Developers always prefer to use the config files to set the overall system properties and environment variables.

Quarkus' configuration profiles are like containers that hold on settings and variables to be used in the overall application or during a particular phase in the project life cycle. They can hold one or multiple variables and settings. When used, for example, during a phase, they override similar settings or variable data set before.

Setting up these profiles is advantageous since one can quickly switch when the app is under different development stages. These are such as from development to testing and from testing to production. The switching between configurations does not require additional settings. The framework automatically does the switching for one.

### Checking and configuring application properties

In this section, the configuration of a Quarkus project is going to be shown.
To be able to configure the properties of the application in Quarkus, do the following:

#### Create a new Quarkus project

- Open up IntelliJ and click on create a new project.
- Select Quarkus as the framework to be used.
- Then, set it up as shown in the images below:

![New Quarkus project](/engineering-education/quarkus-configuration-profiles/new-quarkus-project.png "New Quarkus project")

- Set the following as its dependencies:

![Application dependencies](/engineering-education/quarkus-configuration-profiles/new-quarkus-project-dependencies.png "Application dependencies")

> An alternative way is by using the [Quarkus project initializer site](https://code.quarkus.io/).

##### Project Structure

The newly created application directory structure is as shown below:

```shell
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

- Locate the `application.properties` file located at the _main_ folder as shown below:

![Location of the application.properties file](/engineering-education/quarkus-configuration-profiles/application.properties-file-location.png "Location of the application.properties file")

The file is for the overall application during phases such as development, testing and production.

- Run the app using the command below:

```shell
./mvnw compile quarkus:dev
```

In case it cannot run using the command above, try:

```shell
mvn compile quarkus:dev
```

As seen, the app runs at port _8080_ by default.

- Access the application through a new and separate terminal using:

```shell
curl http://localhost:8080/hello
```

#### Set up some configurations

- Open the 'application.properties' file.
- In it do the following:
  - Set the HTTP port that takes in the requests and gives out the responses to port `8081` from the normal `8080`.
  - The kind of data source. In this case, it will be PostgreSQL
  - The database credentials (Username and password)
  - The JDBC url. This is always used to establish a connection between the application and the database in use.
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

- Now re-run the application and check on which port it now runs on.

Notice that it runs on the newly set port.

- On a new terminal, access the application using the code below:

```shell
curl http://localhost:8081/hello
```

### Configuring the application using Quarkus configuration profiles

Achieve this by following steps following:

- Learn on How to set up the configuration formats
- Set up the configuration profiles
- Test the configuration profiles set

#### Quarkus' Configuration Profile formats

The available configuration profiles for Quarkus are three. These are:

- **dev**: This is only active in the _development_ phase. For instance, when executing `./mvnw compile quarkus:dev`.
- **test**: Its application is in the _test_ phase. For instance, when executing the `./mvnw compile quarkus:test`.
- **prod**: This is only active in the _production_ phase. For instance, when executing `./mvnw package`. This is because the settings will be applied to the packaged application used in the operational environment.

Quarkus recognizes by default the profiles above. However, this does not mean that one cannot add other customizable profiles apart from the three mentioned above. This method is shown later on.

The configuration profiles have a particular format for them to be recognized and separated from another. It begins with the percentage or modulus sign (%), followed by the profile name and the variable or settings. Finally, these will be separated by a period sign (`.`).
It will be ended by the value to be held.

This formart will look as follows:

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

To use the following in the application, simply copy and paste the following to the application.properties file:

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

- **Dev mode**

Now run the application using the development configuration profile by running it in dev mode.
Do this by running this code in the terminal:

```shell
./mvnw compile quarkus:dev
```

Notice in the logs that the app is running on port 8082.

Access it by running on the other separate terminal the following command:

```shell
curl http://localhost:8082/hello
```

- **Test mode**

Run the following:

```shell
./mvnw compile quarkus:test
```

- **Production mode**

The settings will allow the application to be packaged as an '_uber-jar_' file type. An **uber-jar** file has all its dependencies, unlike the typical _jar_ file, which has its dependencies in a separate location.

Run the following:

```shell
./mvnw package
```

Check the packaged file inside the 'target' folder.
Run the jar file by executing the following command:

```shell
java -jar target/quarkus-config-profiles-1.0-SNAPSHOT-runner.jar
```

This can be accessed via:

```shell
curl http://localhost:8085/hello
```

One can also change the data source based on those available. For example, one can choose `H2` instead of Postgres or any other as needed.
This can be set differently for different profiles.
For instance, it is possible to run the application with a local database server in the development phase while deploying the packaged application that uses a remote database in the production mode.

#### Using user defined configuration profile

- Use the same format as shown above to accomplish this. For example, for a profile with the name "prototype", under the other profiles, do the following:

```properties
# Prototype stage
%prototype.quarkus.http.port=9095
%prototype.quarkus.log.console.level=ALL
```

- Run the app in the profile set by running the following:

```shell
./mvnw compile quarkus:dev -Dquarkus.profile=prototype
```

This command means that the development mode will be run using the 'prototype' configuration profile. This configuration profile will be used instead of the _'dev'_.

- Access the app via:

```shell
curl http://localhost:9095/hello
```

### Setting up and using variables in different profiles

Variables set in this location can be injected into the application following the Java EE and MicroProfile standards and specifications.
The variables can override the previously set environment variable value depending on the configuration profile in use.

#### Setting up variables

- To add variables, for instance, variables called '_name_', '_age_' and '_height_' that belong to a '_**person**_' object add the code below to the file under the **GLOBAL** configuration settings:

```properties
# Global variables
person.name=john
person.age=28
person.height=165
```

- Add below the 'dev' profile the following:

```properties
# Dev variables
%dev.person.name=alice
%dev.person.age=20
%dev.person.height=154
```

- Add below the 'test' profile the following:

```properties
# Test variables
%test.person.name=mike
%test.person.age=22
%test.person.height=170
```

- Add below the 'prod' profile the following:

```properties
# Production variables
person.name=tom
person.age=12
person.height=100
```

- Add below the 'prototype' profile the following:

```properties
# Prototype variables
person.name=jane
person.age=54
person.height=174
```

#### Injecting the variables

- Head over to the 'ExampleResource.java' file.
- Add the following code in the file inside the class. That is above the other blocks:

```java
    @ConfigProperty(name = "person.name")
    String name;

@ConfigProperty(name = "person.age")
    String age;

@ConfigProperty(name = "person.height")
    String height;
```

- Add another End-point in the class. The endpoint will be accessed via `http://localhost:8081/hello/person`. Its code is as follows:

```java
    @Path("/person")
@GET
@Produces(MediaType.TEXT_PLAIN)
public String person() {
        return "The person is " + name + " of age " + age + " yrs and of height of " + height + " cm";
        }
```

- In the 'test' folder, search for the 'ExampleResourceTest.java' file and open it.
- Add the code below in the class:

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

This shall be used to check if the output of the profile used is as expected.

#### Testing the variables

##### Testing in the dev profile

- Run the application using the following:

```shell
./mvnw compile quarkus:dev
```

- In another terminal, access it using `curl http://localhost:8082/hello/person`.

The results will be '_The person is mike of age 22 yrs and of the height of 170 cm_'. This is because when the tests are run, it will use the _test_ profile.

- On the terminal with the logs, key in `r` to run the tests. If it produces a successful output, then all is well.

##### testing in the prototype profile

- Run the application using the following:

```shell
./mvnw compile quarkus:dev -Dquarkus.profile=prototype
```

- In another terminal, access it using `curl http://localhost:9095/hello/person`.
- On the terminal with the logs, key in `r` to run the tests. If it produces a successful output, then all is well.
  The expected output is, '_The person is jane of age 54 yrs and of the height of 174 cm_'.

### Configuration profiles in YAML files

Another method in which one can configure profiles in Quarkus is by use of the YAML files.

To do this, follow the steps below:

- Open up a new terminal and run the command below. The command will add the `quarkus-config-yaml` extension that enables quick and easy use of the YAML files in the project.

```shell
./mvnw quarkus:add-extension -Dextensions="io.quarkus:quarkus-config-yaml"
```
Alternatively, add the block of code below inside the `pom.xml` file inside the dependencies section:

```xml
<!--Add the quarkus-config-yaml extension to your project-->
<dependency>
  <groupId>io.quarkus</groupId>
  <artifactId>quarkus-config-yaml</artifactId>
</dependency>
```

- Reload the whole project by right-clicking on the 'pom.xml' file and selecting the 'Reload project' option under the 'Maven' option.
  Similarly, just restart the IDE, and it will refresh the project.
- Rename the 'application.properties' file to 'application.properties.OLD'. This will make its contents available in the system but not used in the application. This aids in referring to the configurations when converting them into the YAML file.
- In the same location as the 'application.properties.OLD' file, create a new file named 'application.yml'.
- Now, use the indentation formatting styles to translate the configs from the 'application.properties.OLD' to the 'application.yml' file. This is shown below:

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

- Re-run the application in the prototype profile using:

```shell
./mvnw compile quarkus:dev -Dquarkus.profile=prototype
```

- Test the outcome by running:

```shell
curl http://localhost:9095/hello/person
```

The output is '_The person is jane of age 54 yrs and of height of 174 cm_'. Run the tests in the log terminal by pressing `r`. The tests will run successfully as before.
This proves that the configurations in the 'application.properties' file are equal to that in the 'application.yml' file.

- Try re-running the project in the other profiles.
- Add new profile configurations and variables and run the application in them.

Find the Repository with the article right [here](https://github.com/justusmbuvi/Quarkus-Configuration-profiles). Clone it and use it as per the licenses.

### Conclusion

The following were learned in the article:

- What is Quarkus configuration profiles
- Setting up configurations in Quarkus
- Using and testing configurations in the project
- Setting up configurations in Quarkus using configuration profiles in:
  - application.properties file
  - YAML files
- Testing the configuration profiles

****

### References

- [Quarkus Hibernate ORM](https://quarkus.io/guides/hibernate-orm)

