### Introduction
Hibernate is a java object-relational mapping (ORM) and durability framework that lets you map regular Java objects to database tables. Hibernate's primary objective is to relieve the developer of typical data persistence-related chores.
### What is Hibernate?
Hibernate is a Java technology that makes it easier to createdatabase-interactive Java applications.
It's an ORM (Object Relational Mapping) tool that's open source and lightweight.
### Table of contents
- [Architecture](#architecture)
- [Components of Hibernate Architecture](#components-of-hibernate-architecture)
  1. [SessionFactory object](#1-sessionFactory-object)
  2. [session object](#2-session-object)
  3. [Transaction object](#3-transaction-object)
  4. [ConnectionProvider](#2-connectionProvider)
  5. [TransactionFactory](#2-transactionFactory)
- [Installation process](#installation-process) 
- [Advantages of Hibernate](#advantages-of-hibernate)
- [Disadvantages of Hibernate](#disadvantages-of-hibernate)
- [Hibernate example](#hibernate-example)
- [Conclusion](#conclusion)

### Architecture
Hibernate offers a layered design that allows users to work without needing to understand the 
underlying APIs.Hibernate uses the database and configuration data to deliver persistence functions.
There are four levels to Hibernate's architecture:

    1.Java application level
    2. Hibernate Framework level
    3. Backhand API level
    4. Database level
The Hibernate Application Architecture is depicted in the diagram below at a high level:
![High-Level View Architecture](/engineering-education/introduction-to-hibernate/high.png)
The Hibernate Application Architecture is depicted in full below, along with its key core classes:
![Detailed View Architecture](/engineering-education/introduction-to-hibernate/detailed.png)

#### Components of Hibernate Architecture 
This part provides a summary of each of the Hibernate Application Architecture class objects.

#### SessionFactory Object
The ConnectionProvider's SessionFactory is a session and client factory. It stores data in a 
second-level cache.

#### Session Object
The session object acts as a conduit between the data in the database and the application. It encapsulates
the JDBC connection and is a small object. It is a Transaction, Query, and Criteria factory. It has a compulsory first-level cache of data.

#### Transaction Object
The atomic unit of work is specified by the transaction object and methods for
transaction management is provided via the user interface for transactions.

#### ConnectionProvider
It's a JDBC connection factory. It hides the application's connection to the DataSource.

#### TransactionFactory
This is a factory that is used for transactions and it is optional.

#### Installation process 
It is expected that you have already installed the most recent version of Eclipse IDE on your computer.
If you have not installed Eclipse IDE, you can download it from here http://www.hibernate.org/downloads. 
The basic steps for downloading and installing Hibernate on your eclipse IDE are as follows:

Step 1:Select "Help" >> "Eclipse Marketplace..." from the Eclipse IDE's menu bar.
  
Step 2:Type "JBoss Tool" on the search box and click on "Go".

Step 3:Choose the latest version of JBoss Tools available and click "Install".
      ![Hibernate1](/engineering-education/introduction-to-hibernate/Hibernate.png)
step 4:Diselect the marked tools from the list and select only Hibernate tool to download.
Then click on "confirm" to set up the hibernate tools.
        ![Hibernate2](/engineering-education/introduction-to-hibernate/Hibernate2.png)
Step5: Accept the terms of the license agreement and click on "Finish".

Step6: Restart Eclipse IDE to make sure that all changes are have been made effectively.

Step 7:To validate whether the Hibernate Tools is correctly installed, click on under "File" >> "New" >>
 "Others" and search for "Hibernate".
     ![Hibernate3](/engineering-education/introduction-to-hibernate/Hibernate3.png)
### Advantages of Hibernate
Hibernate framework is simple to use and the mapping procedure with Hibernate needs only a few
lines of code. The following are some of the advantages of Hibernate:

#### 1.Object Relational Mapping(ORM)
ORM conveniently resolves data mismatches between an application's object-oriented
classes and a relational database. Hibernate's flexibility and power are enhanced by this functionality.

#### 2.Database Independent
Hibernate is database-agnostic. It can connect to any database, including MySQL, Oracle, DB2, and Sybase.
A database can be made portable by simply altering the 'database dialect' variable in the config file.

#### 3.Fast Performance
Hibernate uses the caching notion to keep items in memory, reducing the number of times they are accessed
from the database. Caching is used from within by the hibernate framework thus making its speed to be excellent.

#### 4.Hibernate Query Language
Hibernate includes HQL, a sophisticated query language. 
This query language is both more efficient and object-oriented than SQL. Inheritance, polymorphism,
association, and other object-oriented concepts, may be implemented using HQL.

#### 5.Persistence with Transparency
This guarantees that the software's objects and database tables are automatically connected.
This functionality eliminates the need for developers to write lines of connection code.
Hibernate's transparent persistence allows it to decrease development time and costs.

#### 6. OPen source
Hibernate is an open-source program that comes with a free product license. The source page
for this lightweight program can be downloaded freely.

#### 7.Scalability
Hibernate is a scalable database. It can adapt to any setting as it may be a small intranet app
with a few users or a huge essential app with a high number of users. Both apps are supported similarly by Hibernate.

#### 8. Hibernate is simple to learn
Hibernate is an easy-to-use framework for programmers. It's simple to understand and put into
practice. Because the framework handles database updates automatically, a developer's workload is
significantly reduced.

### Disadvantages of Hibernate
Though Hibernate offers numerous advantages, it also has certain disadvantages. These disadvantages
includes:

#### 1.Slower compared to JDBC
Because Hibernate creates a large number of SQL queries at runtime depending upon the mapping, 
it is a little slower compared to JDBC.

#### 2.Multiple insertion are not permitted
Some JDBC-supported queries are not allowed by Hibernate. For instance, using a single query, 
it is not possible to put several objects into the same table. To insert each item,
the programmer must create a new query.

#### 3.Not suitable for a small project
Because a small project has fewer tables, adopting the whole Hibernate framework is more
time-consuming than beneficial.

#### 4. Batch processing has a poor track record in Hibernate
For batch processing, it's best to stick with plain JDBC because Hibernate's performance 
is not great.

#### 5.Alot of effort to learn API 
Learning Hibernate takes a lot of time and effort. As a result, learning Hibernate is not a simple task.

#### Hibernate Example
Following is a demonstration of how Hibernate may be used to offer Java persistence in a single
package. We'll walk through the various procedures required in developing a Java application with
Hibernate.

Step 1:Creating the Java Plain Old Java Project class (or classes) that will be saved to the database,
depending on the application. Let us create a class called "Student".

public class Student {
   private int studentId;
   private String firstName; 
   private String surname;   
   private int age;  

   public Student() {}
   public Student(String fname, String surname, int age) {
      this.firstName = fname;
      this.lastName = surname;
      this.age= age;
   }
   
   public int getId() {
      return studentId;
   }
   
   public void setStudentId( int StudentId ) {
      this. studentId= studentId;
   }
   
   public String getFirstName() {
      return firstName;
   }
   
   public void setFirstName( String first_name ) {
      this.firstName = first_name;
   }
   
   public String getSurName() {
      return surName;
   }
   
   public void setSurName( String sur_name ) {
      this.surName = sur_name;
   }
   
   public int getAge() {
      return age;
   }
   
   public void setAge( int age ) {
      this.age = age;
   }
}

Step 2:Create tables in the database. Each object would have its table, 
and you are ready to offer persistence.

create table Student (
   studentId INT NOT NULL auto_increment,
   first_name VARCHAR(30) NOT NULL,
   sur_name  VARCHAR(30) NOT NULL,
   age     INT  default NULL,
   PRIMARY KEY (studentId)
);

Step 3:Create a mapping file that tells Hibernate how to map the specified 
class to database tables.

<?xml version = "1.0" encoding = "utf-8"?>
<!DOCTYPE hibernate-mapping PUBLIC 
"-//Hibernate/Hibernate Mapping DTD//EN"
"http://www.hibernate.org/dtd/hibernate-mapping-3.0.dtd"> 

<hibernate-mapping>
   <class name = "Student" table = "STUDENT">
      
      <meta attribute = "class-description">
         This class contains the student detail. 
      </meta>
      
      <id name = "studentId" type = "int" column = "studentId">
         <generator class="native"/>
      </id>
      
      <property name = "firstName" column = "first_name" type = "string"/>
      <property name = "surName" column = "sur_name" type = "string"/>
      <property name = "age" column = "age" type = "int"/>
      
   </class>
</hibernate-mapping>

Step 4:Lastly, we'll build our application class and launch it using the main() function.
We'll use this application to save a few Student records before performing create, read, update
and delete operations on them.

import java.util.List; 
import java.util.Date;
import java.util.Iterator; 
 
import org.hibernate.HibernateException; 
import org.hibernate.Session; 
import org.hibernate.Transaction;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class ManageStudent {
   private static SessionFactory factory; 
   public static void main(String[] args) {
      
      try {
         factory = new Configuration().configure().buildSessionFactory();
      } catch (Throwable ex) { 
         System.err.println("Failed to create sessionFactory object." + ex);
         throw new ExceptionInInitializerError(ex); 
      }
      
      ManageStudent MS = new ManageStudent();

      /* Add few student records in database */
      Integer empID1 = MS.addStudent("David", "Richards", 1000);
      Integer empID2 = MS.addStudent("Jesse", "Ben", 5000);
      Integer empID3 = MS.addStudent("Kelvin", "Wesly", 10000);

      /* List down all the students */
      ME.listStudent();

      /* Update student's records */
      ME.updateStudent(empID1, 5000);

      /* Delete an student from the database */
      ME.deleteStudent(empID2);

      /* List down new list of the student */
      ME.listStudent();
   }
   
   /* Method to CREATE an Student in the database */
   public Integer addStudent(String fname, String surname, int age){
      Session session = factory.openSession();
      Transaction x = null;
      Integer studentID = null;
      
      try {
         tx = session.beginTransaction();
          Student student = new Student(fname, surname, age);
         studentID = (Integer) session.save(student); 
         x.commit();
      } catch (HibernateException e) {
         if (x!=null) x.rollback();
         e.printStackTrace(); 
      } finally {
         session.close(); 
      }
      return studentID;
   }
   
   /* Method to  READ all the student */
   public void listStudent( ){
      Session session = factory.openSession();
      Transaction x = null;
      
      try {
         x = session.beginTransaction();
         List student = session.createQuery("FROM Student").list(); 
         for (Iterator iterator =student.iterator(); iterator.hasNext();){
            Student student = (Student) iterator.next(); 
            System.out.print("First Name: " + student.getFirstName()); 
            System.out.print("  SurName: " + student.geSurName()); 
            System.out.println("  Age: " + student.getAge()); 
         }
         x.commit();
      } catch (HibernateException e) {
         if (x!=null) x.rollback();
         e.printStackTrace(); 
      } finally {
         session.close(); 
      }
   }
   
   /* Method to UPDATE age for an student */
   public void updateStudent(Integer studentID, int age ){
      Session session = factory.openSession();
      Transaction x = null;
      
      try {
         tx = session.beginTransaction();
         Student student = (Student)session.get(Student.class, StudentID); 
         student.setAge( age );
		 session.update(student); 
         x.commit();
      } catch (HibernateException e) {
         if (x!=null) x.rollback();
         e.printStackTrace(); 
      } finally {
         session.close(); 
      }
   }
   
   /* Method to DELETE an student from the records */
   public void deleteStudent(Integer StudentID){
      Session session = factory.openSession();
      Transaction x = null;
      
      try {
         x = session.beginTransaction();
         Student student = (Student)session.get(Student.class, StudentID); 
         session.delete(student); 
         x.commit();
      } catch (HibernateException e) {
         if (x!=null) x.rollback();
         e.printStackTrace(); 
      } finally {
         session.close(); 
      }
   }
}

### Conclusion
Hibernate is an ORM technology that is used to map database structures to Java objects in real-time.
The use of Hibernate, a persistent framework, lets developers concentrate solely on developing business logic code, although they must also write an accurate and reliable persistence
layer.

#### Further Reading
1. [What is Hibernate in Java and Why do we need it?](https://www.edureka.co/blog/what-is-hibernate-
in-java/)
2. [Introduction to Hibernate](https://www.wideskills.com/hibernate/introduction-to-hibernate)
3.[Hibernate (framework)](https://en.wikipedia.org/wiki/Hibernate_(framework))




