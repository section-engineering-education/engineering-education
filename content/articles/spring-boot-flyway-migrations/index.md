### Introduction
Flyaway is a version control system that is used to maintain database migrations across all application instances. This article will create a student management system that will manage database migrations with the flyaway migration tool. 

### Prerequisites
1. [Java Development Kit]() installed on your computer.
2. [MySQL]() installed on your computer.
3. Knowledge in [Spring Boot]().
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

    @PostMapping
    public ResponseEntity<Student> saveStudent(@RequestBody Student student) {
        return new ResponseEntity<>(studentRepository.save(student), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        return new ResponseEntity<>(studentRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable("email") String email) {
        return new ResponseEntity<>(studentRepository.findStudentByEmail(email).orElseThrow(IllegalStateException::new), HttpStatus.OK);
    }

    @PutMapping("/{email}")
    public ResponseEntity<Student> updateStudent(@PathVariable("email") String email, @RequestBody Student student) {
        Student dbStudent = studentRepository.findStudentByEmail(email).orElseThrow(IllegalAccessError::new);
        dbStudent.setCourse(student.getCourse());
        dbStudent.setFirstName(student.getFirstName());
        dbStudent.setLastName(student.getLastName());
        return new ResponseEntity<>(studentRepository.save(dbStudent), HttpStatus.OK);
    }

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
    id                  bigint(20) not null AUTO_INCREMENT,
    first_name          varchar(100) not null,
    last_name           varchar(100) not null,
    email               varchar(100) not null,
    course              varchar(100) not null,
    registration_number varchar(50)  not null,
    primary key (id),
    unique key UK_email(email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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

```sql
insert into student(email, first_name, last_name, course, registration_number)
values ("test@outlook.com", "test1", "tester1", "Computer science", "ABA1112");
insert into student(email, first_name, last_name, course, registration_number)
values ("tester2@outlook.com", "test2", "tester2", "Computer science", "ABA7712");

```
### Testing
```bash
mysql> select * from student;
+----+------------+-----------+---------------------+------------------+---------------------+
| id | first_name | last_name | email               | course           | registration_number |
+----+------------+-----------+---------------------+------------------+---------------------+
|  1 | test1      | tester1   | test@outlook.com    | Computer science | ABA1112             |
|  2 | test2      | tester2   | tester2@outlook.com | Computer science | ABA7712             |
+----+------------+-----------+---------------------+------------------+---------------------+
2 rows in set (0.00 sec)
```

```bash
mysql> select * from flyway_schema_history;
+----------------+---------+-------------+------+---------------------+------------+--------------+---------------------+----------------+---------+
| installed_rank | version | description | type | script              | checksum   | installed_by | installed_on        | execution_time | success |
+----------------+---------+-------------+------+---------------------+------------+--------------+---------------------+----------------+---------+
|              1 | 1       | init        | SQL  | V1__init.sql        |  571144569 | elvis        | 2021-10-09 21:45:31 |             25 |       1 |
|              2 | 2       | initialdata | SQL  | V2__initialdata.sql | -686915055 | elvis        | 2021-10-09 22:02:12 |              5 |       1 |
+----------------+---------+-------------+------+---------------------+------------+--------------+---------------------+----------------+---------+
2 rows in set (0.00 sec)

mysql> 

```

### Conclusion
Now that you have learnt how to manage Spring Boot database migrations with the flyway migration tool, try implementing an application, create at least three migrations and try rolling back to the previous migrations. You can download the complete source code [here]().
