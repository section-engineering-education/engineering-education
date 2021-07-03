Cache reduces the number of database reads resulting in reduced cost of operation and improved application speed. Spring Boot provides an abstraction layer for cache implementation. 

In this article, we are going to learn how to implement a cache in a Spring Boot REST application using Ehcache as the cache provider.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
  - [Domain layer](#domain-layer)
  - [Repository layer](#repository-layer)
  - [Service layer](#service-layer)
  - [Controller layer](#controller-layer)
  - [Configuaration layer](#configuaration-layer)
- [Testing](#testing)
- [Conclusion](#conclusion)

### Prerequisites
1. [JDK]() installed on your computer.
2. Knowledge of Spring Boot.

### Project setup
We are going to use [spring initializr](https://start.spring.io/) to bootstrap our application.

1. Visit [spring initializr](https://start.spring.io/), input the project name as `SpringBootCaching`.
2. Add `Spring Web`, `H2 database`, `Spring data JPA`, and `Lombok` as project dependencies.
3. Click on generate project button to download the project boilerplate code as a zip file.
4. Extract the zip file and open the uncompressed file in your favorite IDE.
5. In the `pom.xml` file in the dependencies section, add the dependencies below.
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
   - The above dependencies add `spring-boot-starter-cache` which is an abstraction layer implemented by Spring for cache manipulation and `Ehcache` is the cache provider we will be using in our application.

#### Domain layer
1. Create a new package named `domain` in the root project package.
2. Create a Java file named `Todo.java` and add the code snippet below.
   
```java
@Entity //Makes this class to be a JPA entity
@Getter //Creates setters for all the fields in the class
@Setter //Creates getters for all the fields in the class
@Builder //Creates a builder pattern for this class
@NoArgsConstructor //Creates a constructor with no arguements for this class
@AllArgsConstructor //Creates a constructor with all arguements for this class
public class Todo {
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
In the above code snippet, we are creating a `Todo` model that will hold an instance of a `todo` in the database.

#### Repository layer
1. Create a new package named `repository` in the root project package.
2. Create a new Java interface named `TodoRepository` in the `repository` package created above and add the code snippet below.
   
```java
public interface TodoRepository extends JpaRepository<Todo, Long> {

}

```
In the code snippet above, we create a `TodoRepository ` interface that extends the `JpaRepository` interface that has all the methods required to perform basic CRUD database operations.

#### Service layer
```java
public interface TodoService {
    List<Todo> getAllTodos();

    Todo getTodoById(Long id);

    Todo updateTodo(Todo todo, Long id);

    void createTodo(Todo todo);

    void deletedTodo(Long id);
}
```

```java
@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {
    private final TodoRepository todoRepository;

   // @Cacheable(cacheNames = "todos")
    @Override
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

   // @Cacheable(cacheNames = "todo", key = "#id")
    @Override
    public Todo getTodoById(Long id) {
        return todoRepository.getById(id);
    }

   // @CachePut(value = "todos", key = "#todo.id")
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

    @Override
    public void createTodo(Todo todo) {
        todoRepository.save(todo);
    }

    //@CacheEvict(value = "todo", key = "#id")
    @Override
    public void deletedTodo(Long id) {
        todoRepository.deleteById(id);
    }
}

```

#### Controller layer
```java
@RestController
@RequestMapping("/api/todos")
@AllArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping({"", "/"})
    public ResponseEntity<List<Todo>> getAllTodos() {
        return new ResponseEntity<>(todoService.getAllTodos(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Todo> getTodoById(@PathVariable Long id) {
        return new ResponseEntity<>(todoService.getTodoById(id), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<String> createTodo(Todo todo) {
        todoService.createTodo(todo);
        return new ResponseEntity<>("Todo Created successfully", HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo todo) {
        return new ResponseEntity<>(todoService.updateTodo(todo, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTodoById(@PathVariable Long id) {
        todoService.deletedTodo(id);
        return new ResponseEntity<>("Todo deleted successfully", HttpStatus.NO_CONTENT);
    }
}

```

#### Configuaration layer
```java
@EnableCaching
@Configuration
public class CacheConfig {
}
```

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

```yaml
spring.cache.jcache.config=classpath:ehcache.xml

```
### Testing

### Conclusion
Now that you have learned how to add caching to a Spring Boot application, implement caching in your applications to reduce unnecessary database queries. You can download the full source code (here)[].
