### Spring Data MongoDB

### Prerequisites
1. JDK installed on your computer.
2. Favourite IDE.
3. Some knowledge of [Java](https://www.javatpoint.com/java-tutorial) and [Spring Boot](https://spring.io/projects/spring-boot).

### MongoDB terminology
**Database** It is a container for collections and can be thought of as similar to an RDBMS database, which is a container for Tables.
**Collection** It is equivalent to Tables in RDBMS, but unlike a collection, it has a dynamic schema. A collection exists within a database.
**Document** It is a single record in a MongoDB collection. It can be thought of as a row in RDBMS.
**Field** A document has zero or more fields. It's like an RDBMS column having a key-value pair.
**Embedded document** is an efficient and clean way to store related data, especially data that are regularly accessed together
**Primary key** uniquely identities a document.

### Creating application
We will be using [spring initializr](https://start.spring.io/) to create our application.
1. Open [Spring initializr](https://start.spring.io/) in your browser.
2. Select language to Kotlin.
3. Add `Spring Web`, `Spring Data JPA`, `H2 Database` dependencies.
4. Leave other configurations as default and click on generate the project.
5. Unzip the downloaded project and open it in your favorite IDE. I use [Intelij IDEA community](https://www.jetbrains.com/idea/download/#section=linux) that is available for free.
6. Sync the project with maven to download all the dependencies.


### Domain layer


### Controller layer


### Repository Layer


### Testing the endpoints

### Conclusion