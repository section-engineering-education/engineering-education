Containerization is bundling together the application source code and the dependencies required to run the application. Kubernetes is a container orchestration tool that makes it possible to run several instances of an application across a distributed system of servers. Kubernetes simplifies the processing of scaling applications in the cloud. This article explains how to build a Spring Boot Docker container and deploy it to a Kubernetes cluster.


### Prerequisites
1. [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed on your computer.
2. [Docker](https://www.section.io/engineering-education/getting-started-with-docker/) installed on your computer.
3. [Minikube](https://kubernetes.io/docs/tasks/tools/) installed on your computer.

### Objective
By the end of this tutorial:- 
1. You should various directives used in Dockerfile and how to create a Dockerfile.
2. You should be capable of creating Kubernetes deployment and service files.


### Application setup
We will be using [spring initializr]() to bootstrap our application.
1. Navigate to [spring initialzr]() on your browser.
2. Input `SpringKubernates` as the application name.
3. Add `spring web`, `H2`, and `Spring data JPA` as the project dependencies.
4. Leave other configurations as default and click on generate button to download the bootstrapped application source code.
5. Unzip the downloaded file and open the project in your favorite IDE. I am using [Intelij IDEA]().
   
#### Application Data layer
1. In the root project package, create a new Java file named `Student.java`.

```java
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String regNo;
    private String course;
}
```

### Application repository layer
```java
public interface StudentRepository extends JpaRepository<Student, Long> {
}
```

### Application controller layer
```java
@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentRepository repository;

    public StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public ResponseEntity<List<Student>> helloWorld() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        return new ResponseEntity<>(repository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalStateException("Student with id " + id + " not found")), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return new ResponseEntity<>(repository.save(student), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable String id) {
        repository.deleteById(Long.valueOf(id));
        return new ResponseEntity<>("Student deleted", HttpStatus.NO_CONTENT);
    }
}

```

### Creating Dockerfile
A Dockefile is a blueprint that describes how Docker will create the image. The directives on the Dockerfile are executed in the order in which they are written.

In the root project directory, create a new file named `Dockerfile` and add the code snippets below.

```Dockerfile
FROM adoptopenjdk/openjdk11:jdk-11.0.2.9-slim
WORKDIR /opt
ENV PORT 8080
EXPOSE 8080
COPY target/*.jar /opt/app.jar
ENTRYPOINT exec java $JAVA_OPTS -jar app.jar
```
- `FROM adoptopenjdk/openjdk11:jdk-11.0.2.9-slim` directive adds `JDK 11` as our base image from where the application will run.
- `WORKDIR /opt` directive sets the directory `/opt` inside the image as the working directory.
- `ENV PORT 8080` directive creates an environment variable named `PORT` with the value `8080`.
- `EXPOSE 8080`directive exposes port 8080 in the image.
- `COPY target/*.jar /opt/app.jar` directory copies the jar file in the `target` folder (when using Maven) or `build` folder (when using Gradle) into the working directory in a file named `app.jar` in the image.
- `ENTRYPOINT exec java $JAVA_OPTS -jar app.jar` directive executes the jar file and starts the Spring Boot application.

#### Building the Docker image
Now that we have created the Dockerfile, we can proceed to create an image from the Dockefile.

> Ensure that Docker is running before executing the command below.

Execute the command below to build a Docker image.
```bash
$ docker build -t "spring-boot-test".
```
- The command above creates a Docker image named `spring-boot-test`.

### Creating Kubernetes deployment file

```yaml
apiVersion: v1
kind: Service
metadata:
  name: spring-test-service
spec:
  selector:
    app: spring-test-app
  ports:
    - protocol: "TCP"
      port: 8080
      targetPort: 8080
  type: LoadBalancer
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-test-app
spec:
  selector:
    matchLabels:
      app: spring-test-app
  replicas: 2
  template:
    metadata:
      labels:
        app: spring-test-app
    spec:
      containers:
        - name: spring-test-app
          image: spring-boot-test
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080
```

### Conclusion
Now that you have learned how to deploy a Spring Boot application to a Kubernetes cluster. Deploy a Spring Boot application cluster and provision it with a database. You can download the complete source code [here]().
