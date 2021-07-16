# **How to create a REST API using Spring Boot, Maven, and MySQL**

![header-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/hero.png)

### Introduction
One of the benefits of REST APIs is the flexibility and scalability it gives to our application. Because the client and server are independent, the REST protocol separates the data storage and the UI from the server. With this, our application can be scaled quickly primarily due to the separation of concerns(the separation of the frontend from the server), which helps our application to be loosely coupled. This offers flexibility in modifying our code in the future as developers can easily integrate restful API without much-added work.

### Goal of the tutorial
This article teaches how to create a spring boot restful API that performs CRUD operations by making a database call to a MySQL database using Hibernate(an implementation of JPA(Java Persistence API). The application we will be building in this tutorial is an employee management system that registers employees, read, update and delete an employee's information. You will also learn how to document your APIs using Swagger UI.

### Key Takeaways

* How to create and set up a spring boot application with a tomcat server.
* MySQL Database Configuration in a Spring Boot project.
* You will learn how to implement Object Relational Mapping using Hibernate.
* Maven for dependency management.
* Exception Handling in Java.
* How to consume a rest API using postman.
* How to document API using Swagger.

### Prerequisites

To fully understand this tutorial, you are required to have the following in place:
* Good understanding of Java.
* At least fundamental knowledge of the Spring framework and Spring Boot. However I will explain everything in detail, so if you are new to the Spring framework don’t be afraid I will be your friend on this journey.
* [Java Development Kit(JDK)](https://www.oracle.com/java/technologies/javase-downloads.html) installed to install.
* [Postman](https://www.postman.com/downloads) installed or click on the link to download and install.
* [Maven](https://maven.apache.org/download.cgi) installed or click on the link to download and install.
* [IntelliJ](https://www.jetbrains.com/idea/download/) installed or click on the link to install. You can use any other IDEA of choice.

### 1. Project Initialization and Setup

There are different ways to set up a new spring boot application. One is using the [***spring initializer.***](https://start.spring.io).

#### 1.1 Project Initialization and Setup Using IntelliJ

In this tutorial I am going to show you how to initialize a spring boot project using Intellij. Intellij has an inbuilt feature to create a spring boot project that uses a Spring initializer which makes it easy to set up a project in no time at all. To get started Run IntelliJ IDEA and click create new project from File > New > Project.

The next step is to select Spring initializer(highlighted with green. If you look at the section highlighted with red you will realize that we are connecting to the spring initializer on the web.

![IntelliJ-Spring-initializer](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/intellij-spring-initializer.png)
Enter the Maven project properties of the project and click next
* Give the project a name. I’m going to call mine employee_app
* Choose the location where you want your project to reside. I’m going to keep mine on the desktop as you can see.
* For Type of project, Choose  Maven.* The language for this project will be java, so were are going to select Java.
* I will name the group “com.lekwacious” 
* I will call artifact employee_app
* Select Java SDK version. Mine is 16
* Select your Java version too.
* We are going to package our project as a jar file. So I have selected jar as the packaging. JAR is an acronym for  Java ARchive. It comes in a ZIP file format and is used for aggregating many files into one. 

Select the Spring Boot version(I have selected 2.5.2) and other required dependencies for your project. The correct Spring Boot Starters will be added Based on the selected dependencies added in the pom.xml file. After selecting these dependencies click the finish button.

 ![select-dependencies-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/select-dependencies.png)

For this project I have added three dependencies namely:
* Spring web: Makes you project a web application. The spring-boot-starter-web dependency transitively pulls in all dependencies related to web development. uses Spring MVC, REST, and Tomcat as a default embedded server.
* Spring Data JPA: Allow us to persist data in SQL databases using Spring Data and Hibernate which is an implementation of the JPA. JPA stands for Java Persistent API, It's a specification that is part of Java EE(Enterprise Edition) and defines an API for object-relational mappings and for managing persistent objects and relational databases. It is considered a standard approach for Object Relational Mapping. Being that JPA is a specification, it does not perform any operation by itself, as such requires implementation. Hibernate is one of those ORM(Object Relational Mapping) tools that implements JPA. Others include TopLink, MyBatis.
* MySQL Driver: It is a dependency that connects the MySQL database to a spring boot application.

#### 1.2 Project Initialization and Setup Using [**Spring Initializer***](https://start.spring.io/)

Alternatively, If you are not using IntelliJ you can use the [***Spring Initializer***](https://start.spring.io/) to set up your project. Enter the Maven project properties of the project including the dependencies as we did above and click on the generate button. This will generate a zip file and download it for you. Unzip it and open in your favorite IDEA and sync the dependencies with Maven.

 ![spring-initializer-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/spring-initializer.png)

 ### 2. Maven Dependency Management
The pom.xml file houses the dependencies, Maven plugins in our project.

The dependency section simply contains the dependecies we added to our project namely  MySQL Driver, Spring Data JPA and SpringWeb. 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.lekwacious</groupId>
    <artifactId>employee_app</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>employee_app</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>11</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

### 3. Configuring  MySQL, JPA, Hibernate
In the resources folder within the src/main folder, open application.properties file and write the below properties.

```properties
spring.datasource.url= jdbc:mysql://localhost:3306/employee_db?useSSL=false&serverTimezone=UTC&useLegacyDatetimeCode=false
spring.datasource.username= root
spring.datasource.password= smile

server.port=8081

spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5InnoDBDialect
spring.jpa.hibernate.ddl-auto = update
```

* spring.datasource.url:  Springboot uses the URL along with the credentials(in this case are the MySQL port(3306, the database name(employee_db)) to establish a database connection to our MySQL database.
* spring.datasource.username & spring.datasource.password properties are the MySQL database username and password. Please use the correct username and password of the MySQL server installed on your computer.
* I configure the port of our Spring Boot application to run on 8081. The default Spring boot port is 8080. I just showed you that you can configure the port to run on any port of your choice.
* Springboot.jpa.properties.hibernate.dialect: The SQL dialect makes Hibernate generate better SQL for the chosen database.

* We have set out DDL(Data definition language) to update. The update operation for example will attempt to add new columns, constraints, etc but will never remove a column or constraint that may have existed previously but no longer does as part of the object model from a prior run. Other values include “create-drop” drops objects on the schema leaving an empty database anytime you rerun your application. It is suitable when you are running a test.


### 4. The EntryPoint of the Application
By simply initializing your project, you are application is ready to be run. So simple? Yea, that the beauty of [spring boot](https://spring.io/projects/spring-boot), it makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".Locate the EmployeeAppApplication.java file in the src/main/java/com/lekwacious/employee_app folder.

```java
package com.lekwacious.employee_app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmployeeAppApplication.class, args);
    }

}
```

Spring boot applications should have an entry point class with the public static void main(String[] args) methods, which is annotated with the @SpringBootApplication annotation and will be used to bootstrap the application. It is the main method which is the entry point of the JVM to run your application.

The @SpringBootApplication annotation informs the Spring framework, when launched, to scan for Spring components inside this package and register them. It also tells Spring Boot to enable Autoconfiguration, a process where beans are automatically created based on classpath settings, property settings, and other factors. The @SpringBootApplication annotation has composed functionality from three annotations namely @EnableAutoConfiguration,@ComponentScan, and @Configuration. So we can say it is the shortcut for the three annotations.

Now run the application. You can do this by either clicking on the play button on your IDEA or running this command: mvn spring-boot:run on your command line. Navigate to the root of the project via the command line and execute the command. Boom! Tomcat started on port 8081 which is the port we configured our application to run.

 ![run-app-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/run-app.png)


 ### 5. Project Structure

We are going to structure our code into four, so create four packages as follows:
* **Data:** This subpackage will house our Data access layer, which will include our Domain and repository.
* **Service:** This is where our business logic will be.
* **Web:** This package will house our controllers.
* **Exceptions:** The is where all our custom exceptions will be. Throwing exceptions is very important in building a resilient system.

This structure will ensure that when a client makes a call to access a resource in the application, such client does not have direct access to our database, rather request is directed to our controller, Our controller calls the right service(the business logic) which then through our repository makes a call to our database. This architecture also ensures the separation of concerns. Below is the project Structure.

 ![project-structure-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/project-structure.png)

### 6. Creating The Domain Class

In the data package, create another package called models.
Inside the models package, create an enum class called Department. Enum is simple a constant in Java. The properties are implicitly final and static. Enums are primarily used to put all the constants that are not going to change eg days of the week. The department enum class should contain the following code:

```java
package com.lekwacious.employee_app.data.models;

public enum Department {
    HUMAN_RESOURCE,
    MARKETING,
    ENGINEERING
}

```
 Create another class called Employee with the following code:
 ```java
 package com.lekwacious.employee_app.data.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastname;
    private String phoneNumber;
    private String email;
    private double salary;
    @Enumerated(EnumType.STRING)
    private Department department;

    public Employee(){}

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastname='" + lastname + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", email='" + email + '\'' +
                ", salary=" + salary +
                ", department=" + department +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Double.compare(employee.salary, salary) == 0 && Objects.equals(id, employee.id) && Objects.equals(firstName, employee.firstName) && Objects.equals(lastname, employee.lastname) && Objects.equals(phoneNumber, employee.phoneNumber) && Objects.equals(email, employee.email) && department == employee.department;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, firstName, lastname, phoneNumber, email, salary, department);
    }
}

 ```
* **@Entity** annotates tells Spring that the Employee class which is simply a POJO(Plain Old Java Object) should be persisted on the database.
* **@Id** annotation Makes the id field the primary key of the employee table when it is persisted on the database.
* We have used the **@GeneratedValue** annotation to specify the primary key generation strategy. The value “auto” instructs the database to automatically generate a value for the field. Therefore the Id will be generated automatically.
* **@Enumerated** annotation converts our enum into a String.
* Next we created a no-argument constructor, setters, and getters for our field, and override the toString,  equals, and hashCode methods.


### 7. Adding Additional Maven Dependencies

In this section we are going to add additional deficiencies to the project.Go to [***Maven Repository***](https://mvnrepository.com/) search for the following dependencies and add them to the dependencies section of the pom.xml file:
* **Javax validation:** It is used to validate the fields of an object before persisting to in the database
* **Io springfox:** A dependency that will allow us document our APIs.
* Sync the newly added dependencies to the application.
* Your modified pom.xml should like this:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.2</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.lekwacious</groupId>
    <artifactId>employee_app</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>employee_app</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>11</java.version>
    </properties>
    <dependencies>
        <!--        newly added dependencies-->
        <dependency>
            <groupId>javax.validation</groupId>
            <artifactId>validation-api</artifactId>
        </dependency>
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-boot-starter</artifactId>
            <version>3.0.0</version>
        </dependency>
<!--        Already existing dependencies-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>

    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>


```

### 8. Payloads

Inside the data package, create a package with the name payloads. This package will have two sub-packages “request” and “response” to handle our request payloads and response payloads respectively.
####  8.1 Request Payloads
Inside the request package create an EmployeeRequest class with the following code:
```java
package com.lekwacious.employee_app.data.payloads.request;
import com.lekwacious.employee_app.data.models.Department;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class EmployeeRequest {
    @NotBlank
    @NotNull
    private String firstName;
    @NotBlank
    @NotNull
    private String lastname;
    @NotBlank
    @NotNull
    private String phoneNumber;
    @Email
    private String email;
    @NotBlank
    @NotNull
    private double salary;
    @NotBlank
    @NotNull
    @Enumerated(EnumType.STRING)
    private Department department;

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
}

```
* **@NotBlank and @NotNull:** These two annotation checks and validate the fields where they are mapped to ensure the values are not blank and null respectively.
* **@Email:** It validates that the annotated field is a valid email address.
* Next we created setters and getters of class.


#### 8.2 Response payload
Inside the response package create an ***MessageReponse class*** with the following code:
```java
package com.lekwacious.employee_app.data.payloads.response;

public class MessageResponse {

    private String message;

    public MessageResponse(String message){
        this.message = message;
    }

    public void setMessage(String message){
        this.message = message;
    }

    public String getMessage(){
        return message;
    }
}
```
* The above code is simply a POJO with one instance variable, a constructor, a mutator(setters), and an accessor(getters).


### 9. The Repository

Inside the data package, create a sub-package called a repository. Then create an interface called “EmployeeRepository” that extends JpaRepository. The JpaRepository is generic so it takes a model class(Type) and the data type of the primary key. Write the following code in the EmployeeRepository interface.

```java
package com.lekwacious.employee_app.data.repository;

import com.lekwacious.employee_app.data.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
}


```
* **@Repository** makes the interface a bean. It is treated identically to the **@Component** annotation, therefore it is a specialization of the @Component annotation. Beans are simply Java classes that spring knows.
* By extending the JpaRepository interface we inherit the “save”, “findAll”, “findById” etc methods.

### 10. The Employee Service
Create a service package under the employee_app package. This package is going to house our business logic. To ensure more separation of concerns we are going to divide our service into two,  an interface where the methods of our business logic will be declared and a concrete class that implements the interface. Create an interface with the name “employeeService” with the following code:
```java
package com.lekwacious.employee_app.service;

import com.lekwacious.employee_app.data.models.Employee;
import com.lekwacious.employee_app.data.payloads.request.EmployeeRequest;
import com.lekwacious.employee_app.data.payloads.response.MessageResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public interface EmployeeService {
    MessageResponse createEmployee(EmployeeRequest employeeRequest);
    Optional<Employee> updateEmployee(Integer employeeId, EmployeeRequest employeeRequest);
    void deleteEmployee(Integer employeeId);
    Employee getASingleEmployee(Integer employeeId);
    List<Employee> getAllEmployee();
}

```
* **@Component** annotation is a shorthand for the @Bean annotation. It registers the EmployeeService interface as a bean in the application context and makes it accessible during classpath scanning. 
* We created five methods that allow us to create, update, get and delete employees.


Next, create an *EmployeeServiceImpl class* that implements the *EmployeeService interface*. Write the following code:

```java
package com.lekwacious.employee_app.service;

import com.lekwacious.employee_app.data.models.Employee;
import com.lekwacious.employee_app.data.payloads.request.EmployeeRequest;
import com.lekwacious.employee_app.data.payloads.response.MessageResponse;
import com.lekwacious.employee_app.data.repository.EmployeeRepository;
import com.lekwacious.employee_app.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public MessageResponse createEmployee(EmployeeRequest employeeRequest) {
        Employee newEmployee = new Employee();
        newEmployee.setFirstName(employeeRequest.getFirstName());
        newEmployee.setLastname(employeeRequest.getLastname());
        newEmployee.setPhoneNumber(employeeRequest.getPhoneNumber());
        newEmployee.setEmail(employeeRequest.getEmail());
        newEmployee.setSalary(employeeRequest.getSalary());
        newEmployee.setDepartment(employeeRequest.getDepartment());
        employeeRepository.save(newEmployee);
        return new MessageResponse("New Employee created successfully");

    }

    @Override
    public Optional<Employee> updateEmployee(Integer employeeId, EmployeeRequest employeeRequest)  throws ResourceNotFoundException{
        Optional<Employee> employee = employeeRepository.findById(employeeId);
        if (employee.isEmpty()){
        throw new ResourceNotFoundException("Employee", "id", employeeId);
        }
        else
        employee.get().setFirstName(employeeRequest.getFirstName());
        employee.get().setLastname(employeeRequest.getLastname());
        employee.get().setPhoneNumber(employeeRequest.getPhoneNumber());
        employee.get().setEmail(employeeRequest.getEmail());
        employee.get().setSalary(employeeRequest.getSalary());
        employee.get().setDepartment(employeeRequest.getDepartment());
        employeeRepository.save(employee.get());
        return employee;
    }

    @Override
    public Employee getASingleEmployee(Integer employeeId) throws ResourceNotFoundException{
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee", "id", employeeId));
    }

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }
    @Override
    public void deleteEmployee(Integer employeeId) throws ResourceNotFoundException {
        if (employeeRepository.getById(employeeId).getId().equals(employeeId)){
            employeeRepository.deleteById(employeeId);
        }
        else throw new ResourceNotFoundException("Employee", "id", employeeId);
    }
}

```

* **@Service** is specifically a collection of library methods that manage one aspect of an application business logic. It is a specialized form of @Component. With the @Service annotation, the class is accessing registered in the application context and accessible during classpath scanning.
* **The @autowired** annotation is used to perform field dependency injection. It automatically injects the *EmployeeRespository interface* which is the dependent bean into the EmployeeServiceImpl class so we can use it. This is possible because *EmployeeRepository* is annotated with the ***@Repository*** annotation making it a bean.
* The EmployeeServiceImpl class implemented the EmployeeService interface by overriding the method and implementing them.
* The class throws an exception(*ResourceNotFoundException*- This is the custom exception class we created that extends RunTimeException) where the Id supplied to get a single employee does not exist on the database.

### 11. The Controller

Create a package called web under the *employee_app package*. This package is going to house the APIs controller. Create an *EmployeeController class* with the following code:
```java
package com.lekwacious.employee_app.web;

import com.lekwacious.employee_app.data.models.Employee;
import com.lekwacious.employee_app.data.payloads.request.EmployeeRequest;
import com.lekwacious.employee_app.data.payloads.response.MessageResponse;
import com.lekwacious.employee_app.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees () {
        List<Employee> footballers = employeeService.getAllEmployee();
        return new ResponseEntity<>(footballers, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployeeById (@PathVariable("id") Integer id) {
        Employee employee = employeeService.getASingleEmployee(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<MessageResponse> addEmployee( @RequestBody EmployeeRequest employee) {
        MessageResponse newEmployee = employeeService.createEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<MessageResponse> updateEmployee( @PathVariable Integer id, @RequestBody EmployeeRequest employee) {
        MessageResponse updateEmployee = employeeService.updateEmployee(id, employee);
        return new ResponseEntity<>(updateEmployee, HttpStatus.OK);
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Integer id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
}

```
* **@RestController:** This annotation marks the EmployeeController as an HTTP request handler and allows Spring to recognize it as a RESTful service.
* **@RequestMapping("/employee")** annotation sets the base path to the resource endpoints in the controller as /employee.
* Next we autowired the EmployeeService into our controller to use the methods declared implemented in it. This is dependency injection.
* **@GetMapping** is a shortcut for **@RequestMapping(method = RequestMethod.GET)**, and is used to map HTTP GET requests to the mapped controller methods. We used it to return all the employees and a single employee.
* **@PathVariable** annotation shows that a method parameter should be bound to a URI template variable.
* **@PostMapping** is a shorthand for @RequestMapping where the method is equal to POST. It is used to map HTTP POST request to the mapped controller methods.
* **@RequestBody:** This annotation takes care of binding the web request body to the method parameter with the help of the registered HttpMessageConverters. So when you make a POST request to the “/employee/add” URL with a Post JSON body, the HttpMessageConverters converts the JSON request body into a Post object and passes it to the addEmployee method.
* **@PutMapping** is a shorthand for @RequestMapping where the method is equal to PUT. It is used to map HTTP PUT request to the mapped controller methods.
* **@DeleteMapping:** Using this annotation makes the Mapped controller method to be ready for a delete operation. is a shortcut for **@RequestMapping(method = RequestMethod.DELETE)**.

### 12. Testing The Application with POSTMAN**
Now let's test our APIs with POSTMAN.

#### 12.1 Adding an employee
Let's rerun the application and then add an employee by making a POST request to localhost:8081/employee/add

 ![addemployee-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/add-employee.png)


Let’s check our MySQL database to confirm again. Boom! There we go  

 ![check-MySQL-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/check-mysql.png)

 #### 12.2 Get all Employees
Make a GET request to localhost:8081/employee/all to get all the employees. I have added an additional two employees already.

 ![getEmployee-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/get-employee.png)

 Boom! It has returned a list of all the employees. We can check MySQL workbench again.

  ![check-MySQL-again-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/check-mysql-for-get-employee.png)

#### 12.3 Get A Single Employee

Make a GET request to localhost:8081/employee/find/3 specifying the ID of the employee at the end of the URL, in our case ID is 3.

  ![getSingeEmployee-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/get-singe-employee.png)


#### 12.4 Update An Employee record**
Make a PUT request to localhost:8081/employee/update/3 specifying the ID of the employee at the end of the URL, in our case ID is 3. Add the fields to update as a requestBody.

  ![updateEmployee-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/update-mployee.png)


#### 12.5 Deleting An Employee**
Make a DELETE request to localhost:8081/employee/delete/3 adding to the end of the URL the ID of the todo to delete, in our case the ID is 3. We got a 200 OK showing a successful delete operation.

  ![deleteEmployee-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/delete-Employee.png)

We got a 200 OK showing a successful delete operation. If we check the MySQL database we should have only two employees left having deleted one employee. We deleted the employee with ID ==3.

  ![MySQL-recheck-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/mysql-recheck-for-delete.png)


### 13. Documenting The API with Swagger UI
We already added the io.springfox dependecy to the pom.xml. With this dependency we will document the API so that it will be easy for other developers to use it. Update your EmployeeController class to look as below:

```java
package com.lekwacious.employee_app.web;

import com.lekwacious.employee_app.data.models.Employee;
import com.lekwacious.employee_app.data.payloads.request.EmployeeRequest;
import com.lekwacious.employee_app.data.payloads.response.MessageResponse;
import com.lekwacious.employee_app.service.EmployeeService;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/employee")
//Line 19 to 24 is the newly added code for swagger documentation
@ApiResponses(value = {
        @io.swagger.annotations.ApiResponse(code = 400, message = "This is a bad request, please follow the API documentation for the proper request format"),
        @io.swagger.annotations.ApiResponse(code = 401, message = "Due to security constraints, your access request cannot be authorized"),
        @io.swagger.annotations.ApiResponse(code = 500, message = "The server is down. Please bear with us."),
}
)
public class EmployeeController {

    @Autowired
    EmployeeService employeeService;

    @GetMapping("/all")
    public ResponseEntity<List<Employee>> getAllEmployees () {
        List<Employee> footballers = employeeService.getAllEmployee();
        return new ResponseEntity<>(footballers, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Employee> getEmployeeById (@PathVariable("id") Integer id) {
        Employee employee = employeeService.getASingleEmployee(id);
        return new ResponseEntity<>(employee, HttpStatus.OK);
    }
    @PostMapping("/add")
    public ResponseEntity<MessageResponse> addEmployee( @RequestBody EmployeeRequest employee) {
        MessageResponse newEmployee = employeeService.createEmployee(employee);
        return new ResponseEntity<>(newEmployee, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public Optional<Employee> updateEmployee(@PathVariable Integer id, @RequestBody EmployeeRequest employee) {
        return employeeService.updateEmployee(id, employee);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("id") Integer id) {
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}


```

* We added the @ApiResponse annotation from swagger at the class level. As simple as this our APIs are fully documented.
* Go http://localhost:8081/swagger-ui/ to access the documentation and test that our APIs are still working properly.
* Use the Swagger API documentention at http://localhost:8081/swagger-ui/  to add an employee, get, update and delete an employee.

  ![Swagger-ui-image](/engineering-education/how-to-create-a-rest-api-using-spring-boot-maven-and-mysql/swagger-ui.png)


### 14. Conclusion

We have successfully built APIs with Spring Boot, use Maven as the dependency management and use MySQL to store data. You learned how to throw exceptions in your application in other to build a resilient system. You have also learned how to document your API using Swagger. You can clone the project on this [Git Repository](https://github.com/Lekwacious/employee-management-system.git). With this knowledge go ahead and build awesome APIs. In the next tutorial, I will show you have to do Test Driven Development and you learn how to write a unit test.