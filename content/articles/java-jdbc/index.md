---
layout: engineering-education
status: publish
published: true
url: /java-jdbc/
title: Getting Started with Java JDBC
description: This article introduces Java database connectivity. We will learn how to perform various database query operations from a Java application.
author: paul-juma
date: 2021-02-03T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/java-jdbc/hero.jpg
    alt: Java database connectivity (JDBC) example
---
Java database connectivity (JDBC) is an application programming interface that defines how Java programs connect and execute database queries. In this tutorial, we will create a simple console application that will perform a database create, read, update, and delete operation through JDBC API.
<!--more-->
### Prerequisites
To follow along, you will need the following:
1. Java development kit [JDK 11](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html) installed on your machine.
2. A code editor of your choice. I will use [Intellij community edition](https://www.jetbrains.com/idea/download/#section=linux), which is free.
3. Some basic knowledge in the [Java](https://www.javatpoint.com/java-tutorial) programming language.
4. Apache [XAMPP](https://www.apachefriends.org/download.html) installed on your computer.
5. Basic knowledge of [SQL](https://www.guru99.com/sql.html).

### Project setup
- In your code editor, create a new Java maven application.
- After the project is created, open the `pom.xml` file and add `mysql-connector` dependency as shown below. `mysql-connector` makes it possible to connect to the MySQL database from a java application.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>org.example</groupId>
    <artifactId>java-mysql</artifactId>
    <version>1.0-SNAPSHOT</version>
    <dependencies>
    <!-- mysql-connector dependency -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.22</version>
        </dependency>

    </dependencies>

    <properties>
        <maven.compiler.source>15</maven.compiler.source>
        <maven.compiler.target>15</maven.compiler.target>
    </properties>

</project>
```

- In the `src` package, create 3 Java files and name them `Main.java` that will contain our `main` method, `Student.java`, that will hold various students' information, and `MysqlAccess.java` that will contain our database access source code.

#### Student.java
This is a plain Java object (POJO) that will contain the student information.

```java
public class Student {
    private String name;
    private String email;
    private String course;

    public Student(String name, String email, String course) {
        this.name = name;
        this.email = email;
        this.course = course;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getCourse() {
        return course;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setCourse(String course) {
        this.course = course;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", course='" + course + '\'' +
                '}';
    }
}

```

- The `Student` class has three member variables: `name`, `course`, and `email`. They represent the students' details.
- The constructor of the `Student` class makes it possible to create a new Student every time an instance of the class is created.
The `getters` and `setters` make it possible to access the class member variables from outside the class.
- The `toString()` method returns a string representation of the class variables.
  
#### MysqlAccess.java
`MysqlAccess.java`class contains the methods that handle the database operations.

It has the following methods below:
- **databaseConnection()** establishes a database connection between our application and MYSQL database.
```java
  public void databaseConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        connect = DriverManager
            .getConnection("jdbc:mysql://localhost/school?serverTimezone=UTC&"
           + "user=root&password=");
        statement = connect.createStatement();
    }
```

- `connect = DriverManager.getConnection("jdbc:mysql://localhost/school?serverTimezone=UTC&user=root&password=");` sets up the database connection information. `school` is the database name, `root` is the database username, and the database password is a blank string ``.

- **getStudents()** method returns a list of students from the database. 
```java

    public List<Student> getStudents() {
        List<Student> students = new ArrayList<>();
        try {
            resultSet = statement
                    .executeQuery("select * from school.students");
            while (resultSet.next()) {
                student_name = resultSet.getString("name");
                student_email = resultSet.getString("email");
                student_course = resultSet.getString("course");
                Student student = new Student(student_name, student_email, student_course);
                students.add(student);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return students;
    }
```

- ` resultSet = statement.executeQuery("select * from school.students");` executes the `SELECT` query that gets all the students from the database and stores the result in the `resultSet`. 
- `while (resultSet.next())` loops through the result set to get all the students' data returned.

- **getStudentByEmail(String email)** returns a student from the database with the email password in the `SELECT` query.
```java
    public Student getStudentByEmail(String email) {
        try {
            resultSet = statement
                    .executeQuery("select * from school.students WHERE email= \'" + email + "\' LIMIT 1;");
            while (resultSet.next()) {
                student_name = resultSet.getString("name");
                student_email = resultSet.getString("email");
                student_course = resultSet.getString("course");
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());

        }
        return new Student(student_name, student_email, student_course);
    }
  ```

- **saveStudent(Student student)** inserts a new student passed to the method into the database.
```java
    public void saveStudent(Student student) {
        try {
            preparedStatement = connect
                    .prepareStatement("insert into  students values (?, ?, ?)");
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, student.getCourse());
            preparedStatement.setString(3, student.getEmail());
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }

    }
```

- **deleteStudent(String email)** deletes a student with the email passed to the `DELETE` query in the database.
```java

    public void deleteStudent(String email) {
        try {
            preparedStatement = connect
                    .prepareStatement("delete from school.students where email= ? ; ");
            preparedStatement.setString(1, email);
            preparedStatement.executeUpdate();

        } catch (Exception e) {
            System.out.println(e.getMessage());

        }

    }
```

- **updateStudent(Student student, String email)** updates the student information of the student with the email passed to the `UPDATE` query.
```java
    public void updateStudent(Student student, String email) {
        try {
            preparedStatement = connect
                    .prepareStatement("update students set name= ? where email= ? ;");
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, email);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
```

- **close()** closes the database connection.
```java
public void close() {
        try {
            if (resultSet != null) {
                resultSet.close();
            }

            if (statement != null) {
                statement.close();
            }

            if (connect != null) {
                connect.close();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
```

Full source code for the `MySqlAccess` class is shown below.

```java
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MySqlAccess {
    private Connection connect = null;
    private Statement statement = null;
    private PreparedStatement preparedStatement = null;
    private ResultSet resultSet = null;

    private String student_name;
    private String student_email;
    private String student_course;

    public void databaseConnection() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        connect = DriverManager
                .getConnection("jdbc:mysql://localhost/school?"
                        + "user=root&password=");
        statement = connect.createStatement();
    }

    public List<Student> getStudents() {
        List<Student> students = new ArrayList<>();
        try {
            resultSet = statement
                    .executeQuery("select * from school.students");
            while (resultSet.next()) {
                student_name = resultSet.getString("name");
                student_email = resultSet.getString("email");
                student_course = resultSet.getString("course");
                Student student = new Student(student_name, student_email, student_course);
                students.add(student);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return students;
    }

    public Student getStudentByEmail(String email) {
        try {
            resultSet = statement
                    .executeQuery("select * from school.students WHERE email= \'" + email + "\' LIMIT 1;");
            while (resultSet.next()) {
                student_name = resultSet.getString("name");
                student_email = resultSet.getString("email");
                student_course = resultSet.getString("course");
            }

        } catch (Exception e) {
            System.out.println(e.getMessage());

        }
        return new Student(student_name, student_email, student_course);
    }

    public void saveStudent(Student student) {
        try {
            preparedStatement = connect
                    .prepareStatement("insert into  students values (?, ?, ?)");
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, student.getCourse());
            preparedStatement.setString(3, student.getEmail());
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            System.out.println(e.getLocalizedMessage());
        }

    }

    public void deleteStudent(String email) {
        try {
            preparedStatement = connect
                    .prepareStatement("delete from school.students where email= ? ; ");
            preparedStatement.setString(1, email);
            preparedStatement.executeUpdate();

        } catch (Exception e) {
            System.out.println(e.getMessage());

        }

    }

    public void updateStudent(Student student, String email) {
        try {
            preparedStatement = connect
                    .prepareStatement("update students set name= ? where email= ? ;");
            preparedStatement.setString(1, student.getName());
            preparedStatement.setString(2, email);
            preparedStatement.executeUpdate();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void close() {
        try {
            if (resultSet != null) {
                resultSet.close();
            }

            if (statement != null) {
                statement.close();
            }

            if (connect != null) {
                connect.close();
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}
```

#### Main.java
In this class, we will create an instance of the `MySqlAccess` class and call its various methods to execute various database queries.
```java
import java.util.List;

public class Main {
    public static void main(String args[]) throws Exception {
        MySqlAccess dao = new MySqlAccess();
        //Creates a database connection
        System.out.println("Creating Database Connection");
        dao.databaseConnection();


        //Insert 2 students into the database
        System.out.println("Inserting Students to the database");
        Student peter = new Student("Peter John", "peter@gmail.com", "Computer Science");
        Student cathy = new Student("Catherine Williams", "catherine@gmail.com", "Electrical engineering");
        dao.saveStudent(peter);
        dao.saveStudent(cathy);

        //Get all Students from the database
        System.out.println("Getting all students from the database");
        List<Student> students = dao.getStudents();
        for (Student student : students) {
            System.out.println(student.toString());
        }

        //Get Student by email address
        System.out.println("Getting the students by email");
        Student student = dao.getStudentByEmail("peter@gmail.com");
        System.out.println(student.toString());

        //Updating student name
        System.out.println("updating student name");
        //Update Catherine Williams name to Catherine William
        cathy.setName("Catherine William");
        dao.updateStudent(cathy, cathy.getEmail());

        //delete student
        System.out.println("Deleting a student from the database");
        dao.deleteStudent("peter@gmail.com");

        //close the database connection
        System.out.println("Closing the database connection");
        dao.close();

    }
}
```

### Creating the database
- Start the Apache and MySQL servers from the XAMPP control panel.
- On the `http://localhost/phpmyadmin/` site on your browser, create a database with the name `school`.
- In the `school` database, create a table with the name `students`, with the fields `name` of the type `varchar` of length 100, `email` of the type `varchar` of length 100, and `course` of type `varchar` of length 100.

![Table structure](/engineering-education/java-jdbc/database_table_structure.png)
  
Run the application by executing the `main` function in the `Main` class.

### Conclusion
Now that you have learned how to perform various database query operations from a Java application. You can use this knowledge to build more complex applications.

Happy Coding!

---
Peer Review Contributions by: [Michael Barasa](/engineering-education/authors/michael-barasa/)
