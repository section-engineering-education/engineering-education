### Introduction
Reactive programming is a programming paradigm that supports an asynchronous, event-driven, and non-blocking approach to data processing. The reactive programming paradigm organizes events and data as streams.

In the reactive programming paradigm, when a request is made, other tasks are executed while waiting for the results. When the data is available, a notification is sent with the data through the callback function. The reactive programming paradigm is suitable for data-driven applications such as chat apps.

In this tutorial, we are going to create a student management system using Spring Webflux and MongoDB.

### Prerequisites
- [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed on your computer.
- Your favorite IDE or editor installed.
- Knowledge of [Java](https://www.tutorialspoint.com/java/index.htm) and [Spring Boot](https://spring.io/projects/spring-boot).
- Knowledge of [MongoDB](https://www.mongodb.com/).

### Streams API
Software developers at Netflix, Twitter, Pivotal, and Redhat created the streams API. Streams API defines four interfaces below.

#### Publisher
The publisher interface emits events to subscribers based on the request sent by the subscribers. Thus, a single publisher can serve several subscribers.

```java
public interface Publisher<T> 
{
    public void subscribe(Subscriber<? super T> s);
}
```

#### Subscriber
The `Subscriber` interface listens and receives events from the `Publisher` interface. The `Subscriber` interface has four methods to handle the response from the `Publisher` interface.

```java
public interface Subscriber<T> 
{
    public void onSubscribe(Subscription s);
    public void onNext(T t);
    public void onError(Throwable t);
    public void onComplete();
}
```

#### Subscription
The `Subscription` interface defines a one-to-one relationship between the `Publisher` and `Subscriber` interfaces. It can be used to request data and also cancel the request.

```java
public interface Subscription<T> 
{
    public void request(long n);
    public void cancel();
}
```

#### Processor
The `Processor` interface represents the processing stage containing both the `Publisher` and the `Subscriber`.

```java
public interface Processor<T, R> extends Subscriber<T>, Publisher<R> 
{

}
```

> There are two popular implementations of the reactive streams, [RxJava](https://github.com/ReactiveX/RxJava) and [Project reactor](https://projectreactor.io/).

### Spring Webflux
Spring Webflux is similar to Spring MVC, but it supports reactive and non-blocking streams.

Webflux has two publishers:

#### Mono
`Mono` is a publisher that returns 0 or 1 element.
```java
Mono<String> mono = Mono.just("Jonh");
Mono<String> mono = Mono.empty();
```

#### Flux
`Flux` is a publisher that emits 0 or N elements.

```java
Flux<String> flux = Flux.just("x", "y", "z");
Flux<String> flux = Flux.fromArray(new String[]{"x", "y", "z"});
Flux<String> flux = Flux.fromIterable(Arrays.asList("x", "y", "z"));
 
// To subscribe, call the method
 
flux.subscribe();
```

### Application Setup
We are going to use [spring initializr](https://start.spring.io/) to generate our application startup code.
1. On your web browser, navigate to [spring initializr](https://start.spring.io/).
2. Input the group as `io.section` and name as `webfluxexample`.
3. Add `Spring webflux`, `Mongo reactive`, and `Lombok` as project dependencies.
4. Click generate to download the startup project files as a zip.
5. Extract the zip file and open the project in your favorite code editor or IDE.
6. Add the following dependencies below to the `pom.xml` file.
   ```xml
   <dependencies>
     <dependency>
        <groupId>javax.xml.bind</groupId>
        <artifactId>jaxb-api</artifactId>
        <version>2.3.0</version>
     </dependency>
     <dependency>
        <groupId>javax.servlet</groupId>
        <artifactId>javax.servlet-api</artifactId>
        <version>3.1.0</version>
        <scope>provided</scope>
     </dependency>
   </dependencies>
   ```

### Configuration layer

1. Create a new file named `MongoConfig.java` in the `config` package we created earlier and add the code snippet below.
   
```java
@Configuration
@EnableMongoRepositories(basePackages = "io.section.webfluxexample.repositories")
public class MongoDBConfig extends AbstractReactiveMongoConfiguration {

    @Value("${database.name}")
    private String databaseName;

    @Value("${database.host}")
    private String databaseHost;


    @Override
    protected String getDatabaseName() {
        return databaseName;
    }

    @Override
    public MongoClient reactiveMongoClient() {
        String name = databaseHost;
        return MongoClients.create(name);
    }

    @Bean
    public ReactiveMongoTemplate reactiveMongoTemplate() {
        return new ReactiveMongoTemplate(reactiveMongoClient(), getDatabaseName());
    }
}

```
> For instructions on creating MongoDB collection in Mongo atlas, read [Spring Data and MongoDB](/engineering-education/spring-data-mongodb/).


4. In the `config` package, create a new file named `WebFluxConfig.java` and add the code snippet below.
```java
@Configuration // Marks the class as configuration class
@EnableWebFlux // Enables Webflux in our application
public class WebFluxConfig implements WebFluxConfigurer {
}

```
5. In the resources directory, add the code snippet below in the `applications.properties` file.
```yml
database.name=myFirstDatabase # database name property
database.host = mongodb+srv://<username>:<password>@cluster0.mk0n7.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority #database connection string from mongo atlas
```

### Data layer
1. In the root project package, create a new package named `model`.
2. In the `model` package created above, create a new file named `Student.java` and add the code snippets below.
   
```java
@Scope(scopeName = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
@Document // Marks this class as a MongoDB document
@Data // Lombok annotation to generate getters, setters, toString, and equals methods
public class Student {
    @Id
    private int id;
    private String name;
    private String course;
}

```

### Repository layer
1. In the root project directory, create a new package named `repository`.
2. Create a new file named `StudentRepository.java` in the `repository` package created above.
    
```java
public interface StudentRepository extends ReactiveMongoRepository<Student, Integer> {
    @Query("{ 'name': ?0 }")
    Flux<Student> findByName(final String name); // Flux returns zero or n elements
}

```

### Service layer
1. In the root project package, create a new package named `service`.
2. Create a file named `StudentService.java` and add the code snippet below. 
```java
public interface StudentService {
    void createStudent(Student student); // Returns null after creating a student

    Mono<Student> findById(int id); // Returns 0 or a single student

    Flux<Student> findByName(String name); // Returns a list of students whose names match the searched name

    Flux<Student> findAll(); // Returns all students

    Mono<Student> update(Student student, int id); // Updates and returns the updated student

    Mono<Void> delete(int id); // Delete the student

}
```

3. In the `service` package, create a new file named `StudentServiceImpl.java` and add the code snippet below.
```java
@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository repository;
    // Saves the student into the database
    @Override
    public void createStudent(Student student) {

        repository.insert(student).subscribe();
    }
    // Finds a single student by id
    @Override
    public Mono<Student> findById(int id) {
        return repository.findById(id);
    }
    // Finds a list of students whose names match the searched name
    @Override
    public Flux<Student> findByName(String name) {
        return repository.findByName(name);
    }
    // Returns a list of all students from the database
    @Override
    public Flux<Student> findAll() {
        return repository.findAll();
    }
    // Saves a student into the database
    @Override
    public Mono<Student> update(Student student, int id) {
        return repository.findById(id) // tries to get a student with the specified id
                .doOnError(IllegalStateException::new) 
                .map(studentMap -> {
                    studentMap.setName(student.getName());
                    studentMap.setCourse(student.getCourse());
                    return studentMap;
                }).flatMap(repository::save); // Updates the student with the id passed if the student is present in the database
    }
    // Deletes a student from the database
    @Override
    public Mono<Void> delete(int id) {
        return repository.deleteById(id);
    }
}

```

### Controller layer
1. In the root project package, create a new package named `controllers`.
2. Create a new file named `StudentController.java` in the `controllers` package created above.
```java
@RestController // Marks this class as a REST controller
@RequestMapping("/api/students") // Sets the base URL for students API
@AllArgsConstructor // Lombok annotation to generates a constructor for the class
public class StudentController {
    private final StudentService service;
    // Handles the student creation POST request.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createStudent(Student student) {
        service.createStudent(student);
    }
    // Handles get student by id endpoint
    @GetMapping("/id/{id}")
    public ResponseEntity<Mono<Student>> getById(@PathVariable("id") int id) {
        Mono<Student> student = service.findById(id);
        HttpStatus status = student != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(student, status);
    }
    // Handles the search student by name endpoint
    @GetMapping("/name/{name}")
    public Flux<Student> getByName(@PathVariable("name") String name) {
        return service.findByName(name);
    }
    // Returns a list of students
    @GetMapping
    public Flux<Student> findAll() {
        return service.findAll();
    }
    // Updates the student with the provided id
    @PutMapping("/{id}")
    public Mono<Student> updateStudent(@RequestBody Student student, @PathVariable("id") int id) {
        return service.update(student, id);
    }
    // Deletes the student with the provided id
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable("id") int id) {
        service.delete(id).subscribe();
    }
}

```
We need to populate the database with some dummy data whenever our application starts.
In the application class, add the code snippet below.

```java
@SpringBootApplication
public class WebFluxExampleApplication {
    //This block of code executes everytime the application starts
    @Bean
    CommandLineRunner employees(StudentRepository studentRepository) {
        return args -> studentRepository
                .deleteAll() // deletes all the records in the database
                .subscribe(null, null, () -> Stream.of(
                                new Student(1, "Samuel", "Computer science"),
                                new Student(2, "Dana", "Electrical engineering"),
                                new Student(3, "Paul", "Pure and Applied mathematics"),
                                new Student(4, "Denis", "Software engineering")
                        )
                        .forEach(student -> {
                            studentRepository
                                    .save(student) // saves all the new records in the database
                                    .subscribe(System.out::println);

                        }));

    }


    public static void main(String[] args) {
        SpringApplication.run(WebFluxExampleApplication.class, args);
    }

}

```
### Testing
Let's run the application and test in postman.
#### Adding a student
Make a POST request to `http://localhost:8080/api/students` on postman, passing the JSON payload below in the request body.

```json
{
    "name": "Job", //Student name
    "course": "Software engineering" //student
}
```

#### Getting all students
Make a GET request to `http://localhost:8080/api/students` on Postman.

![Get all students](/engineering-education/spring-webflux/get_all.png)

#### Getting a student by id
Make a GET request to `http://localhost:8080/api/students/id/2` on Postman. Number 2 at the end of the URL is the id of the student.

![Get student by id](/engineering-education/spring-webflux/get_by_id.png)

#### Getting student by name
Make a GET request to `http://localhost:8080/api/students/name/Denis`on Postman. Denis is the name of the student whose details will be returned.

![Getting student by name](/engineering-education/spring-webflux/get_by_name.png)

#### Updating student details
Make a PUT request to `http://localhost:8080/api/students/2` on Postman, passing in the JSON payload below in the request body.

```json
{
    "id": 2,
    "name": "Diana",
    "course": "Electrical engineering"
}
```

![Updating student details](/engineering-education/spring-webflux/update.png)

#### Deleting a student
Make a DELETE request to `http://localhost:8080/api/students/2` on postman.
The number 2 at the end of the URL is the id of the student to be deleted.

![Deleting student](/engineering-education/spring-webflux/delete.png)

### Conclusion
With the knowledge you have gained from reading this article, try implementing a chat system using Spring Boot Webflux with any frontend client of your choice. You can download the complete source code [here](https://replit.com/@sumbaelvis/springwebflux#).
