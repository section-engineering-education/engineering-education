### Spring Data MongoDB
Spring Data MongoDB makes it possible to integrate a Spring Boot application with Mongo document database.

### Prerequisites
1. [JDK](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html) installed on your computer.
2. Your favorite IDE. I use [Intellij IDEA](https://www.jetbrains.com/idea/download/download-thanks.html) community edition.
3. Some knowledge of [Java](https://www.javatpoint.com/java-tutorial) and [Spring Boot](https://spring.io/projects/spring-boot).
4. [MongoDB](https://www.mongodb.com/try/download/community) installed on your computer.

### MongoDB terminology
**Database** is a container for collections and can be thought of as similar to an RDBMS database, which is a container for Tables.
**Collection** is equivalent to Tables in RDBMS, but unlike a table, it has a dynamic schema. A collection exists within a database.
**Document** is a single record in a MongoDB collection. It can be thought of as a row in RDBMS.
**Field** A document has zero or more fields. It's like an RDBMS column having a key-value pair.
**Embedded document** is an efficient and clean way to store related data, especially data that are regularly accessed together
**Primary key** uniquely identities a document.

### Creating application
We will be using [spring initializr](https://start.spring.io/) to create our application.
1. Open [Spring initializr](https://start.spring.io/) in your browser.
2. Select language to Kotlin.
3. Add `Spring Web`, `Spring Data MongoDB`, dependencies.
4. Leave other configurations as default and click on generate the project.
5. Unzip the downloaded project and open it in your favorite IDE. I use [Intelij IDEA community](https://www.jetbrains.com/idea/download/#section=linux) that is available for free.
6. Sync the project with maven to download all the dependencies.


### Domain layer
In the root package of our application, create a package named `domain`.
Create a kotlin file named `Todo.kt` in the domain package we have created above and add the code snippet below into the file.
```kotlin
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document

@Document(collection = "todo")
data class Todo(
    @Id
    val id: String,
    var title: String,
    var description: String,
    var isCompleted: Boolean
)
```
- `@Document(collection = "todo")` annotation marks the `Todo` data class as a MongoDB document that will be stored under the `todo` collection.
- `@Id` marks the `id` field as a unique object id in the MongoDB collection.

### Controller layer
In the root package of our application, create a package named `controllers`.
Create a kotlin file named `TodoController.kt` and add the code snippet below.
```kotlin
@RestController
@RequestMapping("/api/v1/todos/")
@CrossOrigin("*")
class TodoController(val todoService: TodoService) {
    //Get all todos in the database
    @GetMapping("")
    fun getAllTodos(): ResponseEntity<List<Todo>> {
        return ResponseEntity(todoService.getTodos(), HttpStatus.OK)
    }

    //Get Todo from the datababse by id
    @GetMapping("/{id}")
    fun getTodoById(@PathVariable("id") id: String): ResponseEntity<Todo> {
        return ResponseEntity(todoService.getTodoById(id), HttpStatus.OK)
    }

    //save a todo into the database
    @PostMapping("")
    fun saveTodo(@RequestBody todo: Todo): ResponseEntity<Any> {
        return ResponseEntity(todoService.saveTodo(todo), HttpStatus.CREATED)
    }

    //update todo
    @PutMapping("")
    fun updateTodo(@RequestBody todo: Todo): ResponseEntity<Any> {
        return ResponseEntity(todoService.updateTodo(todo), HttpStatus.OK)
    }

    //delete todo
    @DeleteMapping("/{id}")
    fun deleteTodo(@PathVariable("id") id: String): ResponseEntity<Any> {
        return ResponseEntity(todoService.deleteTodo(id), HttpStatus.NO_CONTENT)
    }

}
```
- `@CrossOrigin` annotation is used to configure the allowed origins.
- `@RestController` annotation is used to define a controller and to indicate that the return value of the methods should be bound to the web response body.
- `@RequestMapping` declares that all APIs URL in the controller will start with `/api/v1/todos/`.

### Repository Layer
In the root package of our application create a package named `repository` and create a kotlin file named `TodoRepository.kt`  within the `repository` package, add the code snippet below.
```kotlin
interface TodoRepository : MongoRepository<Todo, String> {
}
```
- `interface TodoRepository` interface extends the `MongoRepository` interface that contains all the CRUD functions that we will use to query our MongoDB collection.
  
### Service layer
In the root project package, create a package name `service` and add two kotlin files `TodoService.kt`, `TodoServiceImpl` with the code snippets below respectively.

```kotlin
interface TodoService {
    fun saveTodo(todo: Todo)

    fun getTodos(): List<Todo>

    fun getTodoById(id: String): Todo

    fun deleteTodo(id: String)

    fun updateTodo(todo: Todo)
}
```


```kotlin
@Service
class TodoServiceImpl(val todoRepository: TodoRepository) : TodoService {
    override fun saveTodo(todo: Todo) {
        todoRepository.save(todo)
    }

    override fun getTodos(): List<Todo> {
        return todoRepository.findAll()
    }

    override fun getTodoById(id: String): Todo {
        val todoQueried: Optional<Todo> = todoRepository.findById(id)
        if (todoQueried.isPresent) {
            return todoQueried.get()
        } else {
            throw IllegalStateException("Todo with id $id not found")
        }
    }

    override fun deleteTodo(id: String) {
        todoRepository.deleteById(id)
    }

    override fun updateTodo(todo: Todo) {
        val todoQueried: Optional<Todo> = todoRepository.findById(todo.id)
        if (todoQueried.isPresent) {
            val _todo = todoQueried.get()
            _todo.description = todo.description
            _todo.isCompleted = todo.isCompleted
            _todo.title = todo.title
            todoRepository.save(_todo)
        } else {
            throw IllegalStateException("Todo with id ${todo.id} is not found")
        }
    }
}
```
### Configurations
In the resources directory, open the `application.properties` file in your IDE and add the configurations below.
```yaml
spring.data.mongodb.database=todo_db
spring.data.mongodb.port=27017

```
- `spring.data.mongodb.database=todo_db` indicates that our database name is `todo_db`.
- `spring.data.mongodb.port=27017` indicates that we will be connecting to mongodb through port `27017`.

### Conclusion
Now that you have learned how to create a Spring Boot CRUD API in Kotlin and MongoDB, Add fields `dateCreated` and `lastModified` in the `Todo` data class.

Find the source code [here](https://github.com/paulodhiambo/mongodb).

Happy coding.