### Introduction
Flyaway is a version control system that is used to maintain database migrations across all application instances. This article will create a student management system that will manage database migrations with the flyaway migration tool. 

### Prerequisites
1. [Java Development Kit](https://www.oracle.com/java/technologies/downloads/) installed on your computer.
2. [MySQL](https://www.mysql.com/) installed on your computer.
3. Knowledge in [Spring Boot](https://spring.io/projects/spring-boot).
4. Favorite IDE/Code editor installed.
   
### Project setup
1. On your browser, open [spring initializr](https://start.spring.io/).
2. Input the project name as `migration`, group name as `com.migrations`.
3. Add `Spring Web`, `Spring Data JPA`, `Flyway migration` and `MySQL Driver` as dependencies.
4. Click generate to download the boilerplate project code as a compressed file.
5. Uncompress the downloaded file and open the project in your favourite code editor.
   
#### Domain
1. Create a Student pojo and add the code below.
```java
@Entity // Indicated that the class is a database model
@Table(name = "student") // sets the name of the table that the model with mapped to
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

#### Repository
1. Create Java interface named `StudentRepository`.
2. Add the code snippet below to the interface created above.
```java
@Repository // Marks the interface as a JPA repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findStudentByEmail(String email); // Custom method to enable quering a student by email address

    void deleteStudentByEmail(String email); //Custom method to eneble deletion of a student by email address
}

```

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
#### Configuration
On the resources folder, add the code snippet below to the `application.properties` file. 
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
1. In the resource folder, create a new folder, `db`.
2. Create another folder named `migrations` in the `db` folder created above.
3. Create a SQL filename `V1__init.sql` and add the code snippet below.
   
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
The above code snippet creates the `student` table in the database when the application is run. 

> Although Hibernate can create the database tables automatically without the SQL statements, Hibernate developers discourage using the automated database table creation tool since it does not produce an optimized SQL code

### Database Setup
Create a database named `fly_migrations` through the terminal as shown below or through the PHPMyAdmin web interface.

```bash
elvis@elvis:~$ sudo mysql
[sudo] password for elvis: 
mysql> create database flyway_migrations;
Query OK, 1 row affected (0.01 sec)

mysql> 
```
Run the application by executing the command `./mvnw spring-boot:run`. Then, on the command line, execute the command `sudo mysql` to start MySQL CLI. 
Next, execute the command `select * from flyway_schema_history` as shown below.
//result two

When we rerun the application and check the student's table if We inserted the data, we see the results below.

#### Inserting data through flyway migrations
In the `db` folder created above, create a new SQL file named `V2_data.sql` and add the SQL script below.

```sql
insert into student(email, first_name, last_name, course, registration_number)
values ("test@outlook.com", "test1", "tester1", "Computer science", "ABA1112");
insert intbooto student(email, first_name, last_name, course, registration_number)
values ("tester2@outlook.com", "test2", "tester2", "Computer science", "ABA7712");

```
When we check the flyway migrations table, we see that the data was inserted and recorded.
### Testing
//result
When we check the flyway migrations table, we can see that the data was inserted and migration recorded.
//devs
Now that we have created a table and inserted data into the database, execute the command below if we want to roll back the last migration that we performed.

```bash
$ ./flyway undo
```

The command above rollbacks the last migration, In our case, it will remove the data inserted into the database from the second script.

### Conclusion
Now that you have learnt how to manage Spring Boot database migrations with the flyway migration tool, try implementing an application, create at least three migrations and try rolling back to the previous migrations. You can download the complete source code [here]().
