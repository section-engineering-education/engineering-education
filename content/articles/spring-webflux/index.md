Reactive programming is a programming paradigm that supports an asynchronous, event-driven, and non-blocking approach to data processing. The reactive programming paradigm organizes events and data as streams.

In the reactive programming paradigm, a request is made, other tasks are executed while waiting for the results. When the data is available, a notification is sent with the data through the callback function. The reactive programming paradigm is suitable for data-driven applications such as chat applications.

In this tutorial, we are going to create a student management system using Spring webflux and MongoDB.


### Prerequisites
- [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed on your computer.
- Your favorite IDE or editor installed.
- Knowledge of [Java](https://www.tutorialspoint.com/java/index.htm) and [Spring Boot](https://spring.io/projects/spring-boot).
- Knowledge of [Mongodb](https://www.mongodb.com/).

### Streams API
Software developers at Netflix, Twitter, Pivotal, and Redhat created the streams API. Streams API defines four interfaces below.

**Publisher**
The publisher interface emits events to subscribers based on the request sent by the subscribers. Thus, a single publisher can serve several subscribers.

```java
public interface Publisher<T> 
{
    public void subscribe(Subscriber<? super T> s);
}
```

**Subscriber**
`Subscriber` interface listens and receives events from the `Publisher` interface. `Subscriber` interface has four methods to handle the response from the `Publisher` interface.

```java
public interface Subscriber<T> 
{
    public void onSubscribe(Subscription s);
    public void onNext(T t);
    public void onError(Throwable t);
    public void onComplete();
}
```

**Subscription**
`Subscription interface defines a one-to-one relationship between the `Publisher` and `Subscriber` interfaces. It can be used to request data and also cancel the request.

```java
public interface Subscription<T> 
{
    public void request(long n);
    public void cancel();
}
```

**Processor**
`Processor` interface represents the processing stage containing both the `Publisher` and the `Subscriber`.

```java
public interface Processor<T, R> extends Subscriber<T>, Publisher<R> 
{

}
```

> There are two popular implementations of the reactive streams, [RxJava](https://github.com/ReactiveX/RxJava) and [Project reactor](https://projectreactor.io/).

### Spring webflux
Spring webflux is simmilar to Spring MVC , but it suppoerts reactive and non blocking streams.

Webflux has two publishers:

**Mono**
`Mono` publisher that returns 0 or 1 element.
```java
Mono<String> mono = Mono.just("Jonh");
Mono<String> mono = Mono.empty();
```

**Flux**
`Flux` is a publisher that emits 0 or N elements.

```java
Flux<String> flux = Flux.just("x", "y", "z");
Flux<String> flux = Flux.fromArray(new String[]{"x", "y", "z"});
Flux<String> flux = Flux.fromIterable(Arrays.asList("x", "y", "z"));
 
//To subscribe, call the method
 
flux.subscribe();
```

### Application Setup
We are going to use [spring initialr](https://start.spring.io/) to generate our application startup code.
1. On your web browser, navigate to [spring initialr](https://start.spring.io/).
2. Input the group as `io.section and name as `webfluxexample`.
3. Add `Spring webflux`,`Mongo reactive`, and `lombok` as project dependencies.
4. CLick generate to download the startup project files as a zip.
5. Extract the zip file and open the project in your favorite code editor or IDE.
6. Add dependencies below to `pom.xml` file.
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
1. Create a package named `config` in the project root package.
2. Create a file named `ApplicationConfig.java` and add the code snippet below.
    
```java
@Configuration //Marks the class as a configuration class
public class ApplicationConfig {
    //Method below sets the path to the application.properties file.
    @Bean
    public PropertyPlaceholderConfigurer placeholderConfigurer() {
        PropertyPlaceholderConfigurer configurer = new PropertyPlaceholderConfigurer();
        configurer.setLocation(new ClassPathResource("application.properties"));
        configurer.setIgnoreUnresolvablePlaceholders(true);
        return configurer;
    }
}
```
 - The code snippet above sets the path to the `application.properties` file, it contains the project configurations.

3. Create a new file named `MongoConfig.java` in the `config` package we created earlier and the code snippet below.
   
```java
@Configuration
@EnableMongoRepositories(basePackages = "io.section.webfluxexample.repositories")
public class MongoDBConfig extends AbstractReactiveMongoConfiguration {

    @Value("${database.name}")//Gets the database name from application.properties
    private String databaseName;
    //Mongodb connection string. Replace <username> and <password> with your mongodb username and password
    private String name = "mongodb+srv://<username>:<password>@cluster0.mk0n7.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    @Override
    protected String getDatabaseName() {
        return databaseName;
    }

    @Override
    public MongoClient reactiveMongoClient() {
        return MongoClients.create(name);
    }

    @Bean
    public ReactiveMongoTemplate reactiveMongoTemplate() {
        return new ReactiveMongoTemplate(reactiveMongoClient(), getDatabaseName());
    }
}

```
> For instructions on creating MongoDB collection in Mongo atlas, read [Spring Data and Mongodb](/engineering-education/spring-data-mongodb/).


4. In the `config` package, create a new file named `WebFLuxConfig.java` and add the code snippet below.
```java
@Configuration // marks the class as configuration class
@EnableWebFlux // Enables Webflux in out application
public class WebFLuxConfig implements WebFluxConfigurer {
}

```
5. In the resources directory, add the code snippet below in the `applications.properties` file.
```yml
database.name=myFirstDatabase # database name property
```

### Data layer
1. In the root project package, create a new package named `model`.
2. In the `model` package created above, create a new file named `Student.java` and add the code snippets below.
   
```java
@Scope(scopeName = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
@Document //Marks this class as a Mongodb document
@Data // Lombol annotation to generate getters, setters, toString and equals methods
public class Student {
    @Id
    private int id;
    private String name;
    private String course;
}

```

### Repository layer
1. In the root project directory, create a new package name `repository`.
2. Create a new file named `StudentRepository.java` in the `repository` package created above.
    
```java
public interface StudentRepository extends ReactiveMongoRepository<Student, Integer> {
    @Query("{ 'name': ?0 }")
    Flux<Student> findByName(final String name); //Flux returns zero or n elements
}

```

### Service layer
1. In the root project package, create a new package named `service`.
2. Create a file named `StudentService.java` and add the code snippet below. 
```java
public interface StudentService {
    void createStudent(Student student); // returns null after creating a student

    Mono<Student> findById(int id); // Returns 0 or a single student

    Flux<Student> findByName(String name); // Returns a list of students whose names match the searched name

    Flux<Student> findAll(); // Returns all students

    Mono<Student> update(Student student); // Updates and returns the updated student

    Mono<Void> delete(int id); //delete the student

}
```

3. In the `service` package, create a new file named `StudentServiceImpl.java` and add the code snippet below.
```java
@Service
@AllArgsConstructor
public class StudentServiceImpl implements StudentService {
    private final StudentRepository repository;
    //Saves the student into the database
    @Override
    public void createStudent(Student student) {

        repository.save(student).subscribe();
    }
    //Finds a single student by id
    @Override
    public Mono<Student> findById(int id) {
        return repository.findById(id);
    }
    //Finds a list of students whose names match the searched name
    @Override
    public Flux<Student> findByName(String name) {
        return repository.findByName(name);
    }
    //returns a list of all students from the database
    @Override
    public Flux<Student> findAll() {
        return repository.findAll();
    }
    //Saves a student into the database
    @Override
    public Mono<Student> update(Student student) {
        return repository.save(student);
    }
    //Deletes a student from the database
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
@AllArgsConstructor // Lombok annotation to generate constructor for the class
public class StudentController {
    private final StudentService service;
    //Handles the student creation POST request.
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createStudent(Student student) {
        service.createStudent(student);
    }
    //Handles get student by id endpoint
    @GetMapping("/{id}")
    public ResponseEntity<Mono<Student>> getById(@PathVariable("id") int id) {
        Mono<Student> student = service.findById(id);
        HttpStatus status = student != null ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(student, status);
    }
    //Handles the search student by name endpoint
    @GetMapping("/{name}")
    public Flux<Student> getByName(@PathVariable("name") String name) {
        return service.findByName(name);
    }
    //Returns a list of students
    @GetMapping
    public Flux<Student> findAll() {
        return service.findAll();
    }
    //Updates the student with the provided id
    @PutMapping("/{id}")
    public Mono<Student> updateStudent(@RequestBody Student student) {
        return service.update(student);
    }
    //Deletes the student with the provided id
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStudent(@PathVariable("id") int id) {
        service.delete(id).subscribe();
    }
}

```

### Conclusion
With the knowledge you have gained from reading this article, try implementing a chat system using Spring Boot webflux with any frontend client of your choice. You can download the complete source code [here](https://replit.com/@sumbaelvis/springwebflux#).
