---
layout: engineering-education
status: publish
published: true
url: /spring-boot-flyway-migrations/
title: Managing Spring Boot Database Migrations using Flyway
description: This article introduces readers to the Flyway version control system. This tool helps in performing and maintaining database migrations.
author: sumba-elvis
date: 2021-11-05T00:00:00-07:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spring-boot-flyway-migrations/hero.jpg
    alt: Flyway migrations image
---
Flyway is a version control system that is used to maintain database migrations across all application instances.
<!--more-->
In this article, we will create a student management system that monitors database migrations using Flyway. 

### Prerequisites
1. [Java Development Kit](https://www.oracle.com/java/technologies/downloads/) installed on your computer.
2. [MySQL](https://www.mysql.com/) installed on your computer.
3. Knowledge in [Spring Boot](https://spring.io/projects/spring-boot).
4. An IDE such as Eclipse or Netbeans installed.
   
### Project setup
1. On your browser, open [spring initializr](https://start.spring.io/).
2. Input the `project name` as `migration` and `group name` as `com.migrations`.
3. Add `Spring Web`, `Spring Data JPA`, `Flyway migration`, and `MySQL Driver` as dependencies.
4. Click `generate` to download the boilerplate project code as a compressed file.
5. Uncompress the downloaded file and open the project in your favorite code editor.
   
#### Domain
1. Create a `Student` class and add the code below.

```java
@Entity // Indicates that a class is a database model
@Table(name = "student") // sets the name of the table that the model will be mapped to
@Getter // Creates getters for all the variables in the class
@Setter // Creates setters for all the variables in the class
public class Student {
    @Id // Marks the variable as a primary key 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true,name = "email") //sets the database column name and sets it to unique
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "course")
    private String course;

    @Column(name = "registration_number")
    private String registrationNumber;
}

```

- `@Entity` annotation shows that the class is a persistent Java class.
- `@Id` annotation shows that the annotated field is the primary key.
- `@GeneratedValue` annotation is used to specify the generation strategy used for the primary key.
- `@Column` annotation defines the column in the database that maps the annotated field.
- `@Getter` annotation generates getters for all the fields in the `Student` class.
- `@Setter` annotation generates the setters for all the fields in the `Student` class.
- `@Table(name = "student")` indicates that the `Student` entity will be mapped to a table named `student` in the database.

#### Repository
Create an interface named `StudentRepository` and add the following code to the interface:

```java
@Repository // Marks the interface as a JPA repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findStudentByEmail(String email); // Custom method to enable quering a student by email address

    void deleteStudentByEmail(String email); //Custom method to eneble deletion of a student by email address
}
```

The `JpaRepository` interface takes in the model and the type of the ID, in our case the model is Student and the ID type is Long. 

We are now able to use all the JpaRepository methods including `save()`, `findOne()`, `findById()`, `findAll()`, `count()`, `delete()`, `deleteById()` without providing implementation.

- `@Repository` annotation marks this interface as a Spring Data JPA repository.

#### Controller

```java
@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentRepository studentRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    //Inserts a student into the database
    @PostMapping
    public ResponseEntity<Student> saveStudent(@RequestBody Student student) {
        return new ResponseEntity<>(studentRepository.save(student), HttpStatus.CREATED);
    }
    //Retrives all students from the database
    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        return new ResponseEntity<>(studentRepository.findAll(), HttpStatus.OK);
    }
    //Retrives a single student with the specified email from the database
    @GetMapping("/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable("email") String email) {
        return new ResponseEntity<>(studentRepository.findStudentByEmail(email).orElseThrow(IllegalStateException::new), HttpStatus.OK);
    }
    //Updates the student with the email passed as path variable
    @PutMapping("/{email}")
    public ResponseEntity<Student> updateStudent(@PathVariable("email") String email, @RequestBody Student student) {
        Student dbStudent = studentRepository.findStudentByEmail(email).orElseThrow(IllegalAccessError::new);
        dbStudent.setCourse(student.getCourse());
        dbStudent.setFirstName(student.getFirstName());
        dbStudent.setLastName(student.getLastName());
        return new ResponseEntity<>(studentRepository.save(dbStudent), HttpStatus.OK);
    }
    //Deletes a student with the email passed as the path variable
    @DeleteMapping("/{email}")
    public ResponseEntity<String> deleteStudent(@PathVariable("email") String email) {
        studentRepository.deleteStudentByEmail(email);
        return new ResponseEntity<>("Student deleted successfully", HttpStatus.NO_CONTENT);
    }
}

```

- `@RestController` annotation marks this class as a controller that can process the incoming HTTP requests.
- `@RequestMapping("/api/v1/students")` annotation sets the base path to the resource endpoints in the controller as /api/v1/students.
- `@GetMapping` annotation indicates that the function processes a GET request.
- `@PostMapping` annotation indicates that a function processes a POST request.
- `@PutMapping` annotation indicates that a function processes a PUT request.
- `@DeleteMapping` annotation indicates that a function processes a DELETE request.

#### Configuration
On the resources folder, add the code snippet below to the `application.properties` file:

```yaml
#  Sets the database URL
spring.datasource.url = jdbc:mysql://localhost:3306/flyway_migrations?useSSL=false
# Sets the database username
spring.datasource.username = mysql_username
# Sets the database password
spring.datasource.password = mysql_password
# Sets the database dialect to use, for example we use MySQL5InnoDBDialect since we are using MySQL
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL5InnoDBDialect
# Sets the database update strategy, we are using validate since we want to validate if the update is correct the changes made to database
spring.jpa.hibernate.ddl-auto = validate

```
In the resource folder, create a new folder named `db`. Then generate another folder named `migrations` in the `db` directory.

Next, create a SQL filename `V1__init.sql` and add the code snippet below:
   
```sql
CREATE TABLE student
(
    student_id                  bigint(20) not null AUTO_INCREMENT,
    first_name          varchar(50) not null,
    last_name           varchar(50) not null,
    email               varchar(50) not null,
    course              varchar(50) not null,
    registration_number varchar(50)  not null,
    primary key (student_id),
    unique key UK_email(email)
)
```

The above code creates the `student` table in the database. 

> You should not use an automated database table creation tool because it does not produce optimized SQL code.

### Database Setup
Create a database named `fly_migrations` through the terminal as shown below or through the PHPMyAdmin web interface:

```bash
elvis@elvis:~$ sudo mysql
[sudo] password for elvis: 
mysql> create database flyway_migrations;
Query OK, 1 row affected (0.01 sec)

mysql> 
```
Run the application by executing the command `./mvnw spring-boot:run`. Then, on the command line, input `sudo mysql` to start MySQL CLI. 

Next, execute the command `select * from flyway_schema_history` as shown below:

![first migration](/engineering-education/spring-boot-flyway-migrations/result_two.png)

When we rerun the application and check the student's table, we should see the following results:

#### Inserting data through Flyway migrations
In the `db` folder created above, create a new SQL file named `V2_data.sql` and add the SQL script below:

```sql
insert into student(email, first_name, last_name, course, registration_number)
values ("test@outlook.com", "test1", "tester1", "Computer science", "ABA1112");
insert intbooto student(email, first_name, last_name, course, registration_number)
values ("tester2@outlook.com", "test2", "tester2", "Computer science", "ABA7712");

```
When we check the Flyway migrations table, we see that the data was inserted successfully.

### Testing

![Second migration](/engineering-education/spring-boot-flyway-migrations/result.png)

The data was inserted in the table, as shown below:

![Result](/engineering-education/spring-boot-flyway-migrations/data.png)

Now that we have created a table and inserted data into the database, let's execute the following command to roll back our last migration.

```bash
$ ./flyway undo
```

The command above will remove data inserted into the database from the second script.

### Conclusion
In this tutorial, we have learned how to manage Spring Boot database migrations with the Flyway migration tool.

You can, therefore, use this knowledge to craft more quality applications.

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)