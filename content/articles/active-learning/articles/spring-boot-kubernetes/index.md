---
layout: engineering-education
status: publish
published: true
url: /spring-boot-kubernetes/
title: How to deploy a Spring Boot application to Kubernetes cluster
description: This tutorial will go over the basics of Kubernetes and explain a step by step process of deploying a Spring Boot application to a Kubernetes cluster
author: flavian-adhiambo
date: 2021-08-05T00:00:00-05:41
topics: [Containers]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-boot-kubernetes/hero.png
    alt: How to deploy a Spring Boot application to Kubernetes cluster
---

Containerization is bundling together the application source code and the dependencies required to run the application. Kubernetes is a container orchestration tool that makes it possible to run several instances of an application across a distributed system of servers. As a result, Kubernetes simplifies the processing of scaling applications in the cloud. This article explains how to build a Spring Boot Docker container and deploy it to a Kubernetes cluster.


### Prerequisites
- [JDK](https://www.oracle.com/java/technologies/javase-downloads.html) installed on your computer.
- [Docker](https://www.section.io/engineering-education/getting-started-with-docker/) installed on your computer.
- [Minikube](https://kubernetes.io/docs/tasks/tools/) installed on your computer.

### Objective
By the end of this tutorial: 
1. You should know various directives used in Dockerfile and how to create a Dockerfile.
2. You should be capable of creating Kubernetes deployment and service files.

### Application setup
We will be using [spring initializr](https://start.spring.io/) to bootstrap our application.
1. Navigate to [spring initialzr](https://start.spring.io/) on your browser.
2. Input `SpringKubernates` as the application name.
3. Add `spring web`, `H2`, and `Spring data JPA` as the project dependencies.
4. Leave other configurations as default and click on generate button to download the bootstrapped application source code.
5. Uncompress the downloaded file and open the project in your favorite IDE. I am using [Intelij IDEA](https://www.jetbrains.com/idea/promo/?gclid=CjwKCAjwo4mIBhBsEiwAKgzXOMcm-SIRDDfjhlLa3SdVytQzrj_NZfKKTL6ILTyVS5i8fWo5F50IhRoC5zoQAvD_BwE).
   
#### Application Data layer
1. In the root project package, create a new Java file named `Student.java`.
2. In the `Student.java` file created above, add the code snippet below.

```java
@NoArgsConstructor //adds a constructor with no arguments 
@AllArgsConstructor // adds a constructor with all arguments
@Getter // adds getter methods for all fields
@Setter // adds setter methods for all fields
@Entity // adds JPA annotations / marks this class as an entity
public class Student {
    @Id // adds a primary key
    @GeneratedValue(strategy = GenerationType.AUTO) //Indicates that the Id field is automatically generated
    private Long id;
    private String name;
    private String regNo;
    private String course;
}
```
In the code snippet above, we create a `Student` entity representing a table in the database.

#### Application repository layer
In the root project package, create a new Java file named `StudentRepository.java` and add the code snippets below.
```java
// Repo class that contains all the methods to interact with the database
public interface StudentRepository extends JpaRepository<Student, Long> {
}
```

#### Application controller layer
Create a Java file named `StudentController.java` in the root project package and add the code snippet below.

```java
@RestController // marks the class as a controller
@RequestMapping("/api/students") // Root path to the API endpoints in this class
public class StudentController {
    private final StudentRepository repository;

    public StudentController(StudentRepository repository) {
        this.repository = repository;
    }

    @GetMapping // Get request that returns all students
    public ResponseEntity<List<Student>> getAll() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}") // Get request that returns a specific student with the provided Id
    public ResponseEntity<Student> getStudentById(@PathVariable String id) {
        return new ResponseEntity<>(repository.findById(Long.valueOf(id))
                .orElseThrow(() -> new IllegalStateException("Student with id " + id + " not found")), HttpStatus.OK);
    }

    @PostMapping // Post request that creates a new student in the database
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return new ResponseEntity<>(repository.save(student), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}") // Delete request that deletes a student in the database
    public ResponseEntity<String> deleteStudent(@PathVariable String id) {
        repository.deleteById(Long.valueOf(id));
        return new ResponseEntity<>("Student deleted", HttpStatus.NO_CONTENT);
    }
}

```

### Creating Dockerfile
A Dockerfile is a blueprint that describes how Docker will create the image. The directives on the Dockerfile are executed in the order in which they are written.

Create a file named `Dockerfile` in the root project directory and add the code snippets below.

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
- `EXPOSE 8080` directive exposes port 8080 in the image.
- `COPY target/*.jar /opt/app.jar` directory copies the jar file in the `target` folder (when using Maven) or `build` folder (when using Gradle) into the working directory in a file named `app.jar` in the image.
- `ENTRYPOINT exec java $JAVA_OPTS -jar app.jar` directive executes the jar file and starts the Spring Boot application.

#### Building the Docker image
Now that we have created the Dockerfile, we can proceed to create an image from the Dockerfile.

> Ensure that Docker is running before executing the command below.

To build the Docker image, execute the command below.
```bash
docker build -t spring-boot-test .
```
- The command above creates a Docker image named `spring-boot-test`.
- `.` indicates that Dockerfile is in the current directory.

### Creating Kubernetes deployment file
In the root project directory, create a new file named `deployment.yaml` and add the code snippet below.
```yaml
apiVersion: v1 # Kubernetes API version
kind: Service # Kubernetes resource kind we are creating
metadata: # Metadata of the resource kind we are creating
  name: spring-test-service
spec:
  selector:
    app: spring-test-app
  ports:
    - protocol: "TCP"
      port: 8080 # The port that the service is running on in the cluster
      targetPort: 8080 # The port exposed by the service
  type: LoadBalancer # type of the service. LoadBalancer indicates that our service will be external.
---
apiVersion: apps/v1
kind: Deployment # Kubernetes resource kind we are creating
metadata:
  name: spring-test-app
spec:
  selector:
    matchLabels:
      app: spring-test-app
  replicas: 2 # Number of replicas that will be created for this deployment
  template:
    metadata:
      labels:
        app: spring-test-app
    spec:
      containers:
        - name: spring-test-app 
          image: spring-boot-test # Image that will be used to containers in the cluster
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 8080 # The port that the container is running on in the cluster
```
The code snippet above has two parts separated by `---`:
1. `Service` - a service exposes our application outside the Kubernetes cluster. It acts as the load balancer that distributes requests made to our application to various instances of the application running in the cluster.
2. `Deployment` - a deployment is a blueprint that is used to create instances of our application in the cluster.

#### Deploying to Kubernetes
Now that we have created the Kubernetes deployment file, we can deploy it to the cluster.
Execute the command below to deploy the application to the cluster.
```bash
kubectl apply -f deployment.yaml
```
> **Note**: ensure that minikube is running before executing the command above. Start minikube by executing the command `minikube start`.

We can check on the Kubernetes dashboard that the deployment is running with no errors. Start the Kubernetes dashboard by executing the command `minikube enable dashboard`.

![Kubernetes dashboard](/engineering-education/spring-boot-kubernetes/kubernetes-dashboard.png)

Our application is now running successfully in the Kubernetes cluster, but we can't access it from outside the cluster. To access our application from outside the cluster, we need to expose the service.

Execute the command below to get a list of the available services in the cluster.
```bash
$ kubectl get services
NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
flask-test-service      LoadBalancer   10.107.76.196    <pending>     6000:32111/TCP   51d
kubernetes              ClusterIP      10.96.0.1        <none>        443/TCP          76d
mongo-express-service   LoadBalancer   10.98.170.37     <pending>     8081:30000/TCP   30d
mongodb-service         ClusterIP      10.99.13.235     <none>        27017/TCP        31d
spring-test-app         LoadBalancer   10.96.88.167     <pending>     8080:30750/TCP   2d
spring-test-service     LoadBalancer   10.107.183.251   <pending>     8080:30507/TCP   22d

```
From the list above, we can see that our service `spring-test-service` is running, but the external IP address is `<pending>`. To expose the service, execute that command below.
```bash
$ minikube service spring-test-service
❗  Executing "docker container inspect minikube --format={{.State.Status}}" took an unusually long time: 6.215910582s
💡  Restarting the docker service may improve performance.
|-------------|-----------------------|---------------|-----------------------------|
| NAMESPACE   | NAME                  | TARGET PORT   | URL                         |
| ----------- | --------------------- | ------------- | --------------------------- |
| default     | spring-test-service   | 8080          | http://192.168.49.2:8080    |
| ----------- | --------------------- | ------------- | --------------------------- |
🎉  Opening service default/spring-test-service in default browser...

```
We can now access our application from the URL [http://192.168.49.2:8080](http://192.168.49.2:8080) generated by minikube.


### Conclusion
Now that you have learned how to deploy a Spring Boot application to a Kubernetes cluster. Deploy a Spring Boot application cluster and provide it with a database. You can download the complete source code [here](https://replit.com/@flavianadhiambo/springbootkubernetes).

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)