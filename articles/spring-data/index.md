### Java Persistence API (JPA)
JPA is a set of standards that defines how Java objects are represented in a database. JPA provides a set of annotations and interfaces that makes it possible to configure java objects and map them to relational database tables. Relationships between Java objects are provided through annotations (one-to-one, one-to-many, many-to-one, many-to-many). The implementations of the JPA specifications are provided by the object-relational mapping tools (ORM) like [Hibernate](https://hibernate.org/).
JPA makes it easier to switch from one ORM tool to another without refactoring code since it abstracts away the complexities involved with various ORM tools. JPA falls between the ORM and the application layer.

### Prerequisite
1. JDK installed on your computer.
2. Favourite IDE.
3. Some knowledge of [Java](https://www.javatpoint.com/java-tutorial) and [Spring Boot](https://spring.io/projects/spring-boot).

### Creating application
We will be using [spring initializr](https://start.spring.io/) to create our application.
1. Open [Spring initializr](https://start.spring.io/) in your browser.
2. Select language to Kotlin.
3. Add `Spring Web`, `Spring Data JPA`, `H2 Database` dependencies.
4. Leave other configurations as default and click on generate the project.
5. Unzip the downloaded project and open it in your favorite IDE. I use [Intelij IDEA community](https://www.jetbrains.com/idea/download/#section=linux) which is available for free.
6. Sync the project with maven to download all the dependencies.

### Domain
The domain package is where we will define our models.
1. In the root package where the `DemoApplication.kt` file exists, create a new package with the name `domain`.