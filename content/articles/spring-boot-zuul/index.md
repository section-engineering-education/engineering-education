---
layout: engineering-education
status: publish
published: true
url: /spring-cloud-zuul/
title: Spring Cloud Routing and Filtering using Zuul Gateway Service
description: In this tutorial, we will build Spring Boot microservices integrate Zuul API gateway to filter and route requests to various services 
author: nicholas-odhiambo
date: 2022-03-17T00:00:00-09:58
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-cloud-zuul/hero.jpg
    alt: Spring Cloud routing and filtering using Zuul gateway service
---

### Introducion
Zuul server is an application server that handles routing in a microservices architecture in Spring Boot applications. Zuul handles the dynamic routing of requests to specific microservices. Zuul is built to make it easier to route requests dynamically, monitor various services, and provide a single entry point for all requests, ensuring that all the requests are secure since it handles request filtering before routing to the specific service.

In this tutorial, we will build two services:-
1. **Student service** - This service will handle student-related requests and reports.
2. **Course service** -  This service will handle course-related requests, i.e. creating courses, enrolling students, etc.

In addition to the above services, we will also have the following services:-
1. **Zuul server service** - This service will handle all the requests and routing to other services.
2. **Eureka service** - Through this service, other services will discover each other and be able to communicate with each other.
    
### Prerequisites
For a better understanding of the concepts, we will be using the following resources:-
1. Knowledge in [Spring Boot](https://spring.io/guides/gs/spring-boot/).
2. [JDK 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) installed on your computer.
3. IDE of your choice installed on your computer. For this guide, I use [IntelliJ IDEA](https://www.jetbrains.com/idea/).
  
### Table of contents

- [Project Setup](#project-setup)
  - [Student Service](#student-service)
  - [Course Service](#course-service)
  - [Zuul Service](#zuul-service)
  - [Eureka Service](#eureka-service)
- [Conclusion](#conclusion)
  
### Project Setup

#### Student Service
1. Navigate to [spring initliazr](https://start.spring.io/) on your web browser.
2. Input the project name as "StudentService".
3. Add `Eureka Discovery`, `Spring Web` and `Lombok` as project dependencies.
4. Click on the generate button to download the project generated boilerplate code and dependencies as an archive file.
5. Unarchive the downloaded and open it in your favourite IDE.
6. Sync the project to download the dependencies from the central maven repository.
7. Update the `StudentServiceApplication` class with the code snippet below. 

```java
@SpringBootApplication
@EnableDiscoveryClient
public class StudentServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentServiceApplication.class, args);
    }

}
```

- `@EnableDiscoveryClient` is used to enable the discovery client. This makes it possible for other services to discover and communicate with this service through the Eureka service.

Since this service will handle student information, we will create a `Student` class to represent the student. So, in the root project directory, create a new Java class called `Student` and add the code snippet below.

```java

@Data
@Builder
@AllArgsConstructor
public class Student {
    private final String name;
    private final String regNo;
}

```
- `@Data` annotation is used to generate getters and setters for the fields. This cleans up our Student object, which would belong with the getters and setters included.
- `@Builder` annotation is used to generate a builder class for the class. It makes it possible to use the builder pattern with this class while creating instance objects.
- `@AllArgsConstructor` annotation is used to generate a constructor with all the fields.

We need to create a controller class for this service to handle the incoming HTTP requests. In the root project directory, create a new Java class called `StudentController` and add the code snippet below.

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
- `@RestController` annotation generates a REST controller class, making it possible to handle HTTP requests.
- `@RequestMapping("/api")` annotation is used to map the requests to the controller class.
- `test()` method is used to handle the HTTP request to `/api/students`, it returns a list of students from the `returnStudentList()` method in the response body.

To make this service discoverable, we need to configure the eureka service URL, give a name to this service and set a port on which this service will be running. Add the following configurations in the `application.yml` file. 
```yml
server.port=8100 #port for the service
spring.application.name=student-service #name of the service
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/ #eureka server url

```
#### Course Service
1. Navigate to [spring initliazr](https://start.spring.io/) on your web browser.
2. Input the project name as "CourseService".
3. Add `Eureka Discovery Client`, `Spring Web` and `Lombok` as project dependencies.
4. Click on the generate button to download the project generated boilerplate code and dependencies as an archive file.
5. Unarchive the downloaded and open it in your favourite IDE.
6. Sync the project to download the dependencies from the central maven repository.
7. Create a new Java class called `Course` and add the code snippet below. 
```java
@Data
@AllArgsConstructor
public class Course {
    private final String name;
    private final String id;
}

```
- This class will represent a course object.

In the root project directory, create a new Java class called `CourseController` and add the code snippet below.
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
- This class handles all the incoming HTTP requests. The `getCourses()` method returns a list of courses from the `getCourseList()` method in the response body.

We now need to configure this service to enable it to be registered in the eureka service. Add the following configurations in the `application.properties` file.
```yaml
server.port=8200 # The port for the service
spring.application.name=course-service # The name of the service
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/ # The URL of the eureka server
```
#### Zuul Service
1. Navigate to [spring initliazr](https://start.spring.io/) on your web browser.
2. Input the project name as "ZuulService".
3. Add `Eureka Server` as the project dependencies dependencies.
4. Unarchive the downloaded and open in your favorite IDE.
5. Add the dependecy below to the `dependecies` section on the `pom.xml` file.  
```xml
<!-- https://mvnrepository.com/artifact/org.springframework.cloud/spring-cloud-starter-netflix-zuul -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-zuul</artifactId>
    <version>2.2.10.RELEASE</version>
</dependency>

```
6. Sync the project to download the dependencies from the central maven repository.
7. Update the `ZuulServerApplication` class with the code snippet below.

```java
@SpringBootApplication
@EnableZuulProxy
public class ZuulServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ZuulServerApplication.class, args);
    }

}

```
- `@EnableZuulProxy` is used to enable the Zuul proxy. This makes it possible for the service to handle all the incoming requests and route them to the specific services discovered by the eureka server.

The Zuul server needs to communicate with the Eureka server to make it possible to route requests to the registered services. To configure the Zuul server, add the following configurations in the `application.properties` file.

```yml
server.port=8050 # The port for the service
spring.application.name=zuul-edge-server # The name of the service
eureka.client.serviceUrl.defaultZone=http://localhost:8761/eureka/ # The URL of the eureka server

```

Sometimes the requests might fail to reach the Eureka server, this is because the Eureka server might not be running. To ensure the requests are routed to the correct services, we need to configure the Zuul server to retry the requests if the eureka server is unavailable. Add the following configurations in the `application.properties` file.
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
1. Navigate to [spring initliazr](https://start.spring.io/) on your web browser.
2. Input the project name as "EurekaService".
3. Add `Eureka Server` as the project dependencies.
4. Click on the generate button to download the project generated boilerplate code and dependencies as an archive file.
5. Unarchive the downloaded and open it in your favourite IDE.
6. Sync the project to download the dependencies from the central maven repository.
7. Update the `EurekaServiceApplication` class with the following code.
```java
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }

}

```
- `@EnableEurekaServer` annotation is used to enable the eureka server. This makes it possible to register the services with the eureka server.

We finaly need to configure the eureka server to make this service discoverable. Add the following configurations in the `application.properties` file.
```yml
server.port=8761 # The port for the service
eureka.client.registerWithEureka=false # Disable registration with eureka
eureka.client.fetchRegistry=false # Disable fetching of registry from eureka server
eureka.server.waitTimeInMsWhenSyncEmpty=0 # Disable waiting for eureka server

```
Run the services and make an API call through the Zuul gateway to course service through [http://localhost:8050/api/course/](http://localhost:8050/api/course). We get the response shown below. We can make API requests to the course and student services through the Zuul service. This makes it easier to implement a filter and authorizations on the Zuul service to restrict data access based on user roles or authentication state.

```json
[
    {
        "name":"Computer Science",
        "id":1
    },
    {
        "name":"Information Technology",
        "id":2
    }
]
```
### Conclusion
Up to this point, we have covered the basics of deploying microservices using Spring Boot. Try challenging yourself by converting the monolith applications you have to a microservice architecture with Zuul as the API gateway. You will realise how applications built with microservices are much easier to maintain and scale.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
