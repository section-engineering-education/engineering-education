---
layout: engineering-education
status: publish
published: true
url: /hibernate-one-to-one-mapping/
title: Developing a One-to-one Mapping Application Leveraging Hibernate
description: In this tutorial a reader will learn how to create, read, update and delete data using hibernate by applying a one-to-one mapping strategy.
author: david-mbochi
date: 2021-04-05T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/hibernate-one-to-one-mapping/hero.jpg
    alt: One-to-one Mapping Application Leveraging Hibernate
---
This tutorial is for Java developers who have little or no knowledge of working with hibernate and in need of reducing the SQL queries written in a particular project. It also comes in handy for Hibernate enthusiasts who want to understand how [object relational mapping](https://hibernate.org/) is implemented. 
<!--more-->
### Introduction
Plus all the different features it offers to ease the development process. Hibernate was [started in 2001](https://en.wikipedia.org/wiki/Hibernate_(framework)#:~:text=Hibernate%20was%20started%20in%202001,and%20supplementing%20certain%20missing%20features.) by Gavin King with colleagues from Cirrus Technologies as an alternative to using EJB2-style entity beans. The original goal was to offer better persistence capabilities than those offered by EJB2. 

[173 companies reportedly use Hibernate](https://stackshare.io/hibernate) in their tech stacks including Platform, Trendyol Group, and WealthSiple.

In this tutorial, the reader will learn how to create a one-to-one relationship application where a customer can only have one subscription.

### Table of contents
- Setting up the development environment.
- Creating the database and configuring hibernate configuration file.
- Creating the entities.
- Creating and executing the main app.

### Prerequisites
Basic Java knowledge working with [object oriented programming](https://www.w3schools.com/java/java_oop.asp#:~:text=Java%20%2D%20What%20is%20OOP%3F,contain%20both%20data%20and%20methods.&text=OOP%20provides%20a%20clear%20structure%20for%20the%20programs), how to implement [composition](https://www.geeksforgeeks.org/composition-in-java/#:~:text=The%20composition%20is%20a%20design,that%20refers%20to%20other%20objects.) between entities, [SQL](https://www.w3schools.com/sql/sql_intro.asp) commands, [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/mysql-installer-setup.html) shell/bash, and Intellij but feel free to use any environment preferred.

### Step 1: Setting up the development environment
Java development kit is required to run the application successfully, use the following link to install Java 11 on your computer.

- [JDK 11 installation guide](https://www.youtube.com/watch?v=wcZj4JH6lbQ)

Install MySQL server using the following link.

- [MySQL installation guide](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/mysql-installer-setup.html)

After successfully installing MySQL and setting up database credentials, use the following command to log in to MySQL.

```MySQL
mysql -u username -p
```

A prompt will ask for your password and on entering, access will be granted showing the information below.

![MySQL login](/engineering-education/hibernate-one-to-one-mapping/mysql-login.png)

Maven is a build tool for managing Java projects. Maven is based on the project object model (POM) which is an XML file containing configuration details and information about the project. 

The dependencies can be obtained from [maven central repository](https://mvnrepository.com/) and added to the POM file where maven will be responsible for source code generation, code compilation, and JAR files packaging of the compiled code.

This will occur in a local repository where they will be accessed when a new maven project is created. The required dependencies will be downloaded automatically by maven, and added to the classpath of your project once they are added to the POM file.

Eclipse provides an easier way to create a maven project through archetypes. Archetypes are used to create new maven projects that contain template files for a given maven project. You can think of it as a collection of starter files for Java or a web project.
 
Common archetypes are:
- Maven-archetype-quickstart - This is an archetype to generate a sample maven project good for standalone projects.
- maven-archetype-webapp - This is an archetype to generate a sample maven project for Java web applications.

In Eclipse, click File, new, other, maven, and then maven project. Press next and select maven-archetype-quickstart, on the window that opens fill out the group id and artifact id which represents the package and project name respectively.

Click Finish to generate a new maven project that contains all the files to be used in a standalone application. 

In IntelliJ click file, new, project, and on the window that opens select maven, then click next and give your project a name. This will create a new maven project which has the following structure.

![maven structure](/engineering-education/hibernate-one-to-one-mapping/maven-structure.png)

Add the following dependencies to the file named pom.xml after the properties closing tag.

```maven
 <dependencies>
        <!-- Hibernate's core ORM functionality -->
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-core</artifactId>
            <version>5.3.6.Final</version>
        </dependency>

        <!-- JDBC driver for MySQL -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>8.0.12</version>
        </dependency>

        <!-- Support for Java 9/10/11 -->
        <dependency>
            <groupId>javax.xml.bind</groupId>
            <artifactId>jaxb-api</artifactId>
            <version>2.3.0</version>
        </dependency>

        <dependency>
            <groupId>com.sun.xml.bind</groupId>
            <artifactId>jaxb-core</artifactId>
            <version>2.3.0</version>
        </dependency>

        <dependency>
            <groupId>com.sun.xml.bind</groupId>
            <artifactId>jaxb-impl</artifactId>
            <version>2.3.0</version>
        </dependency>

        <dependency>
            <groupId>com.sun.activation</groupId>
            <artifactId>javax.activation</artifactId>
            <version>1.2.0</version>
        </dependency>
    </dependencies>
```

### Step 2: Creating the database and configuring hibernate configuration file
Use the following command to create a new database for the application.

```sql
create database database_name;
```

In IntelliJ create a new file under resources named hibernate.cfg.xml or any name preferred and add the following properties.

```java
<!DOCTYPE hibernate-configuration PUBLIC
        "-//Hibernate/Hibernate Configuration DTD 3.0//EN"
        "http://www.hibernate.org/dtd/hibernate-configuration-3.0.dtd">

<hibernate-configuration>

    <session-factory>

        <!-- JDBC Database connection settings -->
        <property name="connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="connection.url">jdbc:mysql://localhost:3306/database_name?useSSL=false&amp;serverTimezone=UTC</property>
        <property name="connection.username">username</property>
        <property name="connection.password">password</property>

        <!-- JDBC connection pool settings ... using built-in test pool -->
        <property name="connection.pool_size">10</property>

        <!-- Select our SQL dialect -->
        <property name="dialect">org.hibernate.dialect.MySQL8Dialect</property>

        <!-- Echo the SQL to stdout -->
        <property name="show_sql">true</property>
        
        <!-- Set the current session context -->
        <property name="current_session_context_class">thread</property>

       <property name="hibernate.hbm2ddl.auto">update</property>
 
    </session-factory>

</hibernate-configuration>
```

- The first section contains the connection details for the database including database URL, username, and password.  
- The connection pool minimizes the number of connections opened between the application and the database.
- Dialect specifies the type of database used in hibernate so that hibernate generates the appropriate type of SQL statements.  
- show_sql will write all SQL statements to the console.  
- current_session_context_class sets the class that implements the current session context.  
- hibernate.hbm2dl.auto of type update will automatically create the tables in the database if the tables don't exist during the first execution then it will update records after entities are created maintaining the data.

### Step 3: Creating the entities
Create a class named customer with the following details:
- id
- firstName
- lastName
- email
- constructor with all the fields apart from the id as it will be generated
- toString method to view the object instances data.

```java
import javax.persistence.*;

@Entity
@Table(name = "customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "sub_id")
    private Subscription subscription;


    public Customer(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public Customer() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Subscription getSubscription() {
        return subscription;
    }

    public void setSubscription(Subscription subscription) {
        this.subscription = subscription;
    }

    @Override
    public String toString() {
        return "Student{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
```

- @Entity - Marks the class as a database table to be created by Hibernate.  
- @Table(name="customer") - Tells hibernate that the table name will be called customer.
- @Id - primary key of the current entity.
- @GeneratedValue - an auto-incrementing strategy for the primary key.
- @Column - denotes the name of the fields to be created in the database by Hibernate.  
- @OneToOne(cascade = CascadeType.ALL) - This shows that one customer has one subscription and the cascade type of all tells hibernate that the CRUD operation done to the customer should also be cascaded to the subscription. For example, if a customer is deleted, their subscription should also be deleted.  
- @JoinColumn(name = "sub_id") - Tells hibernate to look for column sub_id in the customer table and to use the information to find the appropriate subscription for the customer.

After creating the customer class, create a subscription class with the following details.
- id
- name
- price
- description
- constructor without the id
- toString method

```java
import javax.persistence.*;

@Entity
@Table(name = "subscription")
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Double price;

    @Column(name = "description")
    private String descrition;


    @OneToOne(cascade = {
            CascadeType.MERGE,
            CascadeType.PERSIST,
            CascadeType.REFRESH,
            CascadeType.DETACH
    },mappedBy = "subscription")
    private Customer customer;

    public Subscription() {

    }

    public Subscription(String name, Double price, String descrition) {
        this.name = name;
        this.price = price;
        this.descrition = descrition;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescrition() {
        return descrition;
    }

    public void setDescrition(String descrition) {
        this.descrition = descrition;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @Override
    public String toString() {
        return "Package{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", descrition='" + descrition + '\'' +
                '}';
    }
}
```

The CascadeType.REMOVE has been left out to avoid deleting the customer once a subscription is deleted to demonstrate cascading in action.

mappedBy = "subscription" - added to mark the relationship as bi-directional meaning when a subscription is loaded the customer can be identified and vice versa.

### Step 4: Creating and executing the main app
In this stage, the following will be covered.
- Creating a new customer.
- Retrieving customer by id and assigning a new subscription to the customer using a setter method.
- Retrieving customer by id and deleting to see cascade delete applied to the subscription.
- Retrieve and update a customer using a setter method.

#### Create a new customer
```java
import com.javadev.hibernate.demo.entity.Customer;
import com.javadev.hibernate.demo.entity.Subscription;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class CreateCustomer {
    public static void main(String[] args) {
        //create session factory
        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(Customer.class)
                .addAnnotatedClass(Subscription.class)
                .buildSessionFactory();
        //create session
        Session session = factory.getCurrentSession();
        try {
            //create the object
            Customer tempCustomer = new Customer("john","doe","john@javadev.com");

            //start a transaction
            session.beginTransaction();
            //save the object
            System.out.println("Saving the customer");
            session.persist(tempCustomer);

            //commit the transaction
            session.getTransaction().commit();
            System.out.println("Done!!");
        }finally {
            //clean up code
            session.close();
            factory.close();
        }

    }
}
```

When the main app is executed, a table customer and subscription will be created and a new row will be inserted in the customer table, use the following command to see the created tables and inserted row.

```SQL
use database_name;

show tables;

select * from customer;
```

The new customer entry will be returned by the query and note the sub_id is null.

![create customer](/engineering-education/hibernate-one-to-one-mapping/create-customer.png)


#### Retrieving customer by id and assigning a new subscription to the customer using a setter method

```java
import com.javadev.hibernate.demo.entity.Customer;
import com.javadev.hibernate.demo.entity.Subscription;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class CreateCustomerSubscription {
    public static void main(String[] args) {
        //create session factory
        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(Customer.class)
                .addAnnotatedClass(Subscription.class)
                .buildSessionFactory();
        //create session
        Session session = factory.getCurrentSession();
        try {
            int theId =1;

            Subscription subscription = new Subscription("Beginner",1400.00,"This subscription is for beginners");
            //start a transaction
            session.beginTransaction();

            //read a customer
            Customer customer = session.get(Customer.class,theId);

            customer.setSubscription(subscription);
            //save the object
            System.out.println("Saving the customer");
            session.persist(customer);

            //commit the transaction
            session.getTransaction().commit();
            System.out.println("Done!!");
        }finally {
            //clean up code
            session.close();
            factory.close();
        }

    }
}

```

A new record will be inserted in the subscription table and the customer sub_id column will be updated with the foreign key id referencing subscription that the customer was set to. This is because of the CascadeType.ALL which was set in the customer class.

![customer subscription](/engineering-education/hibernate-one-to-one-mapping/customer-subscription.png)

#### Retrieving customer by id and deleting to see cascade delete applied to the subscription

```java
import com.javadev.hibernate.demo.entity.Customer;
import com.javadev.hibernate.demo.entity.Subscription;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class DeleteSubscription {
    public static void main(String[] args) {
        //create session factory
        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(Customer.class)
                .addAnnotatedClass(Subscription.class)
                .buildSessionFactory();
        //create session
        Session session = factory.getCurrentSession();
        try {

            int theId =1;
            session.beginTransaction();

            //read a subscription
            Subscription subscription = session.get(Subscription.class,theId);

            subscription.getCustomer().setSubscription(null); //brakes the bidirectional link of customer and subscription

            session.delete(subscription);

            //commit the transaction
            session.getTransaction().commit();
            System.out.println("Done!!");
        }finally {
            //clean up code
            session.close();
            factory.close();
        }

    }
}

```

>Note that because there was a bi-directional link between customer and subscription the link must be broken for deleting a subscription to work.

Deleting a subscription will maintain the customer due to CascadeType.REMOVE being left out in subscription class.

![deleting subscription](/engineering-education/hibernate-one-to-one-mapping/deleting-subscription.png)

The subscription table will return an empty set while the customer table column sub_id will be updated to null.

#### Retrieve and update a customer using a setter method

```java
import com.javadev.hibernate.demo.entity.Customer;
import com.javadev.hibernate.demo.entity.Subscription;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class UpdateCustomer {
    public static void main(String[] args) {
        //create session factory
        SessionFactory factory = new Configuration()
                .configure("hibernate.cfg.xml")
                .addAnnotatedClass(Customer.class)
                .addAnnotatedClass(Subscription.class)
                .buildSessionFactory();
        //create session
        Session session = factory.getCurrentSession();
        try {

            //start a transaction
            session.beginTransaction();

            int customerId =1;

            //read a customer
            Customer tempCustomer = session.get(Customer.class,customerId);

            //update customer last name
            tempCustomer.setLastName("bilal");

            //save the object
            System.out.println("Saving the customer");

            session.persist(tempCustomer);

            //commit the transaction
            session.getTransaction().commit();
            System.out.println("Done!!");
        }finally {
            //clean up code
            session.close();
            factory.close();
        }

    }
}
```

![updating customer](/engineering-education/hibernate-one-to-one-mapping/updating-customer.png)

### Conclusion
By covering and implementing these operations, a reader should be more confident to approach a one-to-one Hibernate task and deliver as required. 

At this point, the reader has learned how to create, read, update and delete data using hibernate by applying a one-to-one mapping strategy. 

In the next tutorial, the reader will learn how how to perform CRUD operations using a one-to-many mapping strategy.     

Happy coding!

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
