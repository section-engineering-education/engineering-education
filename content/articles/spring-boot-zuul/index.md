### Introducion
Zuul server is an application server that handles routing in a micorservice architecture in Spring Boot applications. Zuul handles the dynamic routing of requests to the specific microservices. Zuul is built to make it easier to route requests dynamically, monitoring verious services, and to provide a single point of entry for all requests, ensuring that all the requests are secure since it handles request filtering before routing to the specific service.

In this tutorial, we will build a two services:-
1. Student service - This service will handle the student related requests and reports.
2. Course service -  This service will handle course related requests i.e creating courses, enrolling students, etc.

In addition to the above services, we will also have the following services:-
1. Zuul server service - This service will handle all the requests and routing to other services.
2. Eureka service - It is through this service that other services will discover each other and be able to communicate with each other.
    
### Prerequisites
For a better understanding of the concepts, we will be using the following resources:-
1. Knowledeg in [Spring Boot](https://spring.io/guides/gs/spring-boot/).
2. [JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) installed on your computer.
3. IDE of your choice installed on your computer. For this guide I use [IntelliJ IDEA](https://www.jetbrains.com/idea/).
  
### Table of contents
- [Introducion](#introducion)
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Project Setup](#project-setup)
  - [Student Service](#student-service)
  - [Course Service](#course-service)
  - [Zuul Service](#zuul-service)
  - [Eureka Service](#eureka-service)
  - [Edge Server](#edge-server)
- [Testing](#testing)
- [Conclusion](#conclusion)
### Project Setup
#### Student Service
```java
@SpringBootApplication
@EnableDiscoveryClient
public class StudentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentServiceApplication.class, args);
    }

}
```

```java

@Data
@Builder
@AllArgsConstructor
public class Student {
    private final String name;
    private final String regNo;
}

```

```java
@RestController
@RequestMapping("/api") 
public class StudentController {
    //Returns a list of students
    @GetMapping("/students")
    public ResponseEntity<List<Student>> test() {
        return new ResponseEntity<>(returnStudentList(), HttpStatus.OK);
    }
    //Generates list of students
    public List<Student> returnStudentList() {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Peter Johnson", "ADM 112"));
        students.add(new Student("Jim William", "ADF 112"));
        students.add(new Student("Mercy Peterson", "ADK 112"));
        return students;
    }
}
```
```yml
server.port=8100 #port for the service
spring.application.name=student-service #name of the service
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/ #eureka server url

```
#### Course Service
```java
@Data
@AllArgsConstructor
public class Course {
    private final String name;
    private final String id;
}

```

```java
@RestController//Marks the as a REST controller
@RequestMapping("/api/course")//The base URL for the controller
public class CourseController {
    //Function returns a list of courses 
    @GetMapping
    public ResponseEntity<List<Course>> getCourses() {
        return new ResponseEntity<>(getCourseList(), HttpStatus.OK);
    }
    //Function generates a list of courses
    private List<Course> getCourseList() {
        List<Course> courses = new ArrayList<>();
        courses.add(new Course("Computer Science", "1"));
        courses.add(new Course("Computer Engineering", "2"));
        courses.add(new Course("Software Engineering", "3"));
        return courses;
    }
}
```

```yaml
server.port=8200 # The port for the service
spring.application.name=course-service # The name of the service
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/ # The URL of the eureka server
```
#### Zuul Service
```java
@SpringBootApplication
@EnableZuulProxy
public class ZuulServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuulServerApplication.class, args);
    }

}

```

```yml
server.port=8050 # The port for the service
spring.application.name=zuul-edge-server # The name of the service
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/ # The URL of the eureka server

```

```yml
spring:
  servlet:
    multipart:
      max-file-size: 1000MB
      max-request-size: 1000MB
zuul:
  host:
    connect-timeout-millis: 10000
    socket-timeout-millis: 60000

hystrix:
  command:
    default:
      execution:
        isolation:
          thread:
            timeoutInMilliseconds: 60000
```
#### Eureka Service
```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }

}

```

```yml
server.port=8761 # The port for the service
eureka.client.registerWithEureka=false # Disable registration with eureka
eureka.client.fetchRegistry=false # Disable fetching of registry from eureka server
eureka.server.waitTimeInMsWhenSyncEmpty=0 # Disable waiting for eureka server

```
#### Edge Server
```java
@SpringBootApplication
public class EdgeServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EdgeServerApplication.class, args);
    }

}

```

```yml
server.port=8060 # The port for the service
spring.application.name=gateway-edge-server # The name of the service
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/ # The URL of the eureka server
spring.cloud.gateway.discovery.locator.enabled=true # Enable discovery locator
spring.cloud.gateway.discovery.locator.lowerCaseServiceId=true # Enable lower case service id

```

```yml
spring:
  cloud:
    gateway:
      default-filters:
        - name: RequestSize
          args:
            maxSize: 50000000
```
### Testing
### Conclusion
Upto this point, we have covered the basics of deploying microservices using Spring Boot. Try challenging yourself by converting the monolith applications you have to a micorservice architecture with Zuul as the API gateway, you will realise how applications build with microservices are much easier to maintain and scale.
