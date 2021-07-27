---
layout: engineering-education
status: publish
published: true
url: /spring-boot-caching/
title: Getting started with Spring Boot Caching
description: This tutorial will go over the basics of Spring Boot Caching, what Caching is, why it's needed, and how to implement it.
author: elizabeth-akinyi
date: 2021-07-27T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-boot-caching/hero.jpg
    alt: Getting Started with Spring Boot Caching Example Image
---
Caching is a mechanism used to enhance the performance of a system. It acts as a temporary memory that between the application and the persistent database.
<!--more-->
Cache memory stores only the recently used data items. This helps to reduce the number of database hits as much as possible.

Data access from in-memory is always faster than fetching from an external storages like databases, file systems, or other service calls.

We can set up a cache in a Spring Boot application using technologies like Hazelcast, Ehcache, or Redis. They are cache providers, since they provide a key-data to store the cached data.

In this article, we will learn how to implement a cache in a Spring Boot REST application using Ehcache as the cache provider. We are going to build a `Todo` REST APIs then add cache capabilities to the REST endpoints.

### Table of contents
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
- [Domain layer](#domain-layer)
- [Repository layer](#repository-layer)
- [Service layer](#service-layer)
- [Controller layer](#controller-layer)
- [Configuration layer](#configuration-layer)
- [Adding data into the Cache](#adding-data-into-the-cache)
- [Updating data in the cache](#updating-data-in-the-cache)
- [Deleting data from the cache](#deleting-data-from-the-cache)
- [Conclusion](#conclusion)

### Prerequisites
1. [JDK](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html) installed on your computer.
2. Knowledge of [Spring Boot](https://spring.io/projects/spring-boot).

### Project setup
We are going to use [Spring Initializr](https://start.spring.io/) to bootstrap our application.

1. Visit [Spring Initializr](https://start.spring.io/), and enter the project name as `SpringBootCaching`.
2. Add `Spring Web`, `H2 database`, `Spring data JPA`, and `Lombok` as project dependencies.
3. Click on the `Generate Project` button to download the project boilerplate code as a `zip` file.
4. Extract the `zip` file and open the uncompressed files in your favorite IDE.
5. In the `pom.xml` file in the dependencies section, add a few more dependencies as shown below:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-cache</artifactId>
    </dependency>

    <dependency>
        <groupId>javax.cache</groupId>
        <artifactId>cache-api</artifactId>
    </dependency>

    <dependency>
        <groupId>org.ehcache</groupId>
        <artifactId>ehcache</artifactId>
    </dependency>
</dependencies>
```

The above dependencies add `spring-boot-starter-cache`, an abstraction layer implemented by Spring for cache manipulation and `Ehcache` as the cache provider that we will use in our application.

### Domain layer
1. Create a package named `domain` in the root folder.
2. Create a Java file named `Todo.java` and add the code below:

```java
@Entity // Makes this class to be a JPA entity
@Getter // Creates setters for all the fields in the class
@Setter // Creates getters for all the fields in the class
@Builder // Creates a builder pattern for this class
@NoArgsConstructor // Creates a constructor with no arguements for this class
@AllArgsConstructor // Creates a constructor with all arguements for this class
class Todo {
    @Id // Marks the Id as the primary key
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    private String description;

}
```

In the above code snippet, we create a `Todo` model that will hold an instance of a `todo` in the database.

### Repository layer
1. Create a new package named `repository` in the root project package.
2. Create a new Java interface named `TodoRepository` in the `repository` package created above. Add the code snippet below:

```java
public interface TodoRepository extends JpaRepository<Todo, Long> {
}
```

In the code snippet above, we create a `TodoRepository` interface that extends the `JpaRepository` interface with all the methods required to perform basic CRUD database operations.

### Service layer
1. Create a new package named `service` in the root project directory.
2. In the `service` package created above, create a new Java interface named `TodoService.java`.

Add the below code snippet to the `TodoService` interface:

```java
// Interface that will be implemented to provide database operations
public interface TodoService {
    List<Todo> getAllTodos();
    Todo getTodoById(Long id);
    Todo updateTodo(Todo todo, Long id);
    void createTodo(Todo todo);
    void deletedTodo(Long id);
}
```

In the `service` package, create a new Java file named `TodoServiceImpl.java` and add the code snippet below:

```java
@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;
    // Gets a list of todos from the database
    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }
    // Gets a todo with the specified Id from the database
    @Override
    public Todo getTodoById(Long id) {
        return todoRepository.getById(id);
    }
    // Updates todo with the specified Id
    @Override
    public Todo updateTodo(Todo todo, Long id) {
        Todo newTodo = Todo
                .builder()
                .id(id)
                .description(todo.getDescription())
                .title(todo.getTitle())
                .build();
        todoRepository.save(newTodo);
        return newTodo;
    }
    // Creates a new todo in the database
    @Override
    public void createTodo(Todo todo) {
        todoRepository.save(todo);
    }
    // Deletes a todo with the specified Id in the database
    @Override
    public void deletedTodo(Long id) {
        todoRepository.deleteById(id);
    }
}
```

### Controller layer
1. Create a new package named `controllers` in the root project package.
2. In the `controllers` package, create a new file named `TodoController.java`.

Add the code snippet below in the `TodoController.java` file:

```java
@RestController
@RequestMapping("/api/todos")
@AllArgsConstructor
public class TodoController {
    private final TodoService todoService;
    // API endpoint returning a list of Todos
    @GetMapping({"", "/"})
    public ResponseEntity<List<Todo>> getAllTodos() {
        return new ResponseEntity<>(todoService.getAllTodos(), HttpStatus.OK);
    }
    // API endpoint returning a todo with the specied Id
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        return new ResponseEntity<>(todoService.getTodoById(id), HttpStatus.OK);
    }
    // API endpoint that creates a todo in the database with the request body
    @PostMapping("")
    public ResponseEntity<String> createTodo(Todo todo) {
        todoService.createTodo(todo);
        return new ResponseEntity<>("Todo Created successfully", HttpStatus.CREATED);
    }
    // API endpoint that allows for updating a Todo with a specified Id
    @PutMapping("{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        return new ResponseEntity<>(todoService.updateTodo(todo, id), HttpStatus.OK);
    }
    // API endpoint that allows users to delete Todo wit specified Id
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodoById(@PathVariable Long id) {
        todoService.deletedTodo(id);
        return new ResponseEntity<>("Todo deleted successfully", HttpStatus.NO_CONTENT);
    }
}
```

Run the application to confirm that everything is working as expected.

### Configuration layer
Now that we have a fully functional CRUD REST API application, we are going to learn how to add cache support in our application.

First, we need to create a configuration class to enable caching.

1. In the root project package, create a new package named `config`.
2. In the `config` package created above, create a new Java file named `CacheConfig.java`.

Add the below code snippet to the `CacheConfig.java` file:

```java
@EnableCaching
@Configuration
public class CacheConfig {
}
```

- `@EnableCaching` annotation enables the Spring Boot caching abstraction layer in our application.
- `@Configuration` annotation marks the `CacheConfig` class as a Spring configuration class.

> Ehcache cache provider requires an independent configuration to function correctly.

In the resources folder, create a new XML file named `ehcache.xml` and add the code snippet below:

```xml
<config
    xmlns:jsr107='http://www.ehcache.org/v3/jsr107'
    xmlns='http://www.ehcache.org/v3'>
<service>
    <jsr107:defaults enable-management="true" enable-statistics="true"/>
</service>

<cache alias="todos" uses-template="config-cache"/>
<cache alias="todo" uses-template="config-cache"/>

<cache-template name="config-cache">
    <expiry>
        <ttl unit="minutes">5</ttl>
    </expiry>
    <resources>
        <heap>1</heap>
        <offheap unit="MB">1</offheap>
    </resources>
</cache-template>
</config>
```

In the above code snippet, we set the time taken for the cache contents to be updated and the amount of memory to be used by the cache.

We need to inform our application of the path to the Ehcache configuration file.

To ensure the XML is added to our configuration, add the below line to `application.properties` file:

```yaml
spring.cache.jcache.config=classpath:ehcache.xml
```

### CRUD operations in cache
#### Adding data into the cache
In the `TodoServiceImpl.java` file, update the `getAllTodos()` method with the code snippet below:

```java
@Cacheable(cacheNames = "todos")
@Override
public List<Todo> getAllTodos() {
    return todoRepository.findAll();
}
```

The above method returns a list of `todos`. Here, it is annotated with ` @Cacheable(cacheNames = "todos")` annotation. This grabs the data returned from this method and stores them in a cache with key `todos`.

> Data in the cache is stored in a key-value pattern. The key is the name stored in the cacheName variable while the value is the data that is returned by the method annotated with @Cacheable annotation.

To add a single item into the cache, we need to add the `id` that will be used to retrieve the item and update it in the cache.

Update the `getTodoById()` method with the code snippet below:

```java
@Cacheable(cacheNames = "todo", key = "#id")
@Override
public Todo getTodoById(Long id) {
  return todoRepository.getById(id);
}
```

- `@Cacheable(cacheNames = "todo", key = "#id")` gets a `todo` with the provided `id` from the cache.

> **Note:** we pass the `id` as the key, since the cache stores data in the form of key-value pair. When we pass the `id` of the `todo`, we are expecting a `todo` data associated with that key.

#### Updating data in the cache
In the `TodoServiceImpl.java` file, update the `updateTodo()` method with the code snippet below:

```java
// Updates a todo with the specified Id in the cache and in the database. `#todo.id` gets the Id property from the `todo` passed to the `updateTodo` function. 
@CachePut(value = "todos", key = "#todo.id")
@Override
public Todo updateTodo(Todo todo, Long id) {
    Todo newTodo = Todo
    .builder()
    .id(id)
    .description(todo.getDescription())
    .title(todo.getTitle())
    .build();
    todoRepository.save(newTodo);
    return newTodo;
}
```

To update data in the cache, we use the `@CachePut` annotation to update the item's key.

#### Deleting data from the cache
In the `TodoServiceImpl.java` file, update the `deleteTodo()` with the code snippet below.

```java
@CacheEvict(value = "todo", key = "#id")
@Override
public void deletedTodo(Long id) {
    todoRepository.deleteById(id);
}
```

To delete data from the cache, we use the `@CacheEvict` annotation by passing the key of the specific item to be deleted.

> To delete all items from the cache, we set the attribute `allEntries` to true.

### Conclusion
Based on what we have learned, caching reduces the number of reads and writes operations on the database. In the case where a paid cloud database is used like Google Cloud SQL, the billing will be based on the read and write operations on the database. 

With reduced number of read and write operations, the cost of using the managed database can be reduced.

Now that you have learned how to add caching to a Spring Boot application, implement caching in other applications. You can download the complete source code [here](https://replit.com/@elizabeth962/springbootcache#).

To learn more about Ehcache, read the documentation [here](https://www.ehcache.org).

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)