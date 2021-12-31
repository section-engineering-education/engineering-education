---
layout: engineering-education
status: publish
published: true
url: /price-tracker-with-python-selenium-twilio/
title: How to Build an Amazon Price Tracker using Python, Selenium, and Twilio
description: This tutorial will show the reader how to use Twilio's Programmable SMS service in Python to build a price tracker. 
author: muhammed-ali
date: 2021-12-23T00:00:00-09:33
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/price-tracker-with-python-selenium-twilio/hero.jpg
    alt: Authentication using Facebook Hero Image
---
Hibernate is a Java object-relational mapping (ORM) framework that lets you map regular objects to database tables. 
<!--more-->
[Hibernate's](https://hibernate.org/) primary objective is to relieve the developer of typical data persistence-related chores. This ORM framework is open-source and lightweight.

### Table of contents
- [Hibernate architecture](#hibernate-architecture)
- [Architecture components](#architecture-components)
- [Installation process](#installation-process) 
- [Advantages of Hibernate](#advantages-of-hibernate)
- [Disadvantages of Hibernate](#disadvantages-of-hibernate)
- [Hibernate example](#hibernate-example)
- [Conclusion](#conclusion)

### Hibernate architecture
Hibernate has a layered architecture that allows users to operate without being aware of the core APIs. 

To provide unique features, Hibernate makes use of databases and other configurable information.

Hibernate's architecture is divided into four major levels:
- Hibernate framework
- Backhand API
- Java application layer
- Database level

Hibernate's architecture is shown in the following diagram:

![High-Level View Architecture](/engineering-education/introduction-to-hibernate/high.jpg)

The diagram below highlights Hibernate's core classes:

![Detailed View Architecture](/engineering-education/introduction-to-hibernate/detailed.jpg)

### Architecture components
Application-level class objects are summarized in this section:

- SessionFactory object: SessionFactory is a session and client factory for the ConnectionProvider. It saves data in the second-level cache.

- Session object: The session object serves as a link between the database and the application's data. It is a tiny object that wraps the JDBC connection. It acts as a factory for transactions, queries, as well as other criteria. 

- Transaction object: The transaction interface provides different functions or methods required for data management.

- ConnectionProvider: It's a factory for JDBC connections. In other words, it hides the application's connection to the data source.

- TransactionFactory: This is an optional factory that is used for different transactions.

### Installation process 
Hibernate works quite well on the Eclipse IDE. If you have not installed Eclipse IDE, you can download it from [here](http://www.hibernate.org/downloads). 

The basic steps for downloading and installing Hibernate in the Eclipse IDE are as follows:

Step 1: Select `Help` >> `Eclipse Marketplace` from the Eclipse IDE's menu bar.
  
Step 2: Type `JBoss Tool` on the search box and click on `Go`.

Step 3: Choose the latest version of `JBoss Tools` and click `Install`.

![Hibernate1](/engineering-education/introduction-to-hibernate/hibernate1.jpg)

Step 4: From the `marked tools`, select and download the Hibernate tool.

Then click on `confirm` to set up the hibernate tools.

![Hibernate2](/engineering-education/introduction-to-hibernate/hibernate2.jpg)

Step 5: Accept the terms in the license agreement and click on the `Finish` button.

Step 6: Restart Eclipse IDE to ensure that all changes are reflected.

Step 7: To validate whether the Hibernate Tools are correctly installed, click on `File` >> `New` >> `Others` and then search for `Hibernate`.

![Hibernate3](/engineering-education/introduction-to-hibernate/hibernate3.jpg)

### Advantages of Hibernate
Hibernate framework is simple to use. It's mapping procedure needs only a few lines of code. 

The following are some of Hibernate's advantages:

#### Object Relational Mapping(ORM)
ORM conveniently resolves data mismatches between an application's object-oriented
classes and a relational database. Hibernate's flexibility and power are enhanced by this functionality.

#### Database Independent
Hibernate is database-agnostic. It can connect to any database, including MySQL, Oracle, DB2, and Sybase.

A database can be made portable by simply altering the 'database dialect' variable in the config file.

#### Fast Performance
Hibernate uses cache to keep items in memory. This reduces the number of times they are accessed from the database. 

#### Hibernate Query Language
Hibernate supports HQL which is a sophisticated query language. This language is both more efficient and object-oriented than SQL. 

Functionalities such as inheritance, polymorphism, association, as well as other object-oriented concepts can be implemented using HQL.

#### Persistence and transparency
This guarantees that software objects and database tables are connected automatically. It also eliminates a lot of boilerplate code.

In the long-run, these features decrease overall development time and costs.

#### Open source
Hibernate is an open-source program which has numerous advantages. The source code
for this lightweight framework can be downloaded freely.

#### Scalability
Hibernate is a scalable database. It can adapt to any setting, as well as accomondate a huge number of users.

#### Hibernate is simple to learn
Hibernate is an easy-to-use framework for beginners. It's simple to understand and implement. It reduces developers' workload by handling database updates automatically.

### Disadvantages of Hibernate
Though Hibernate offers numerous advantages, it also has certain disadvantages. They
include:

Firstly, Hibernate is slower when compared to JDB. This is because it creates a large number of SQL queries at runtime.

Secondly, Hibernate does not support multiple insertions. Besides, some JDBC-supported queries are not allowed by Hibernate. 

Thirdly, Hibernate is not suitable for a small project. Small projects usually have few tables, and thus adopting the whole Hibernate framework is quite time-consuming.

Hibernate is quite poor when it comes to batch processing. It's, therefore, better to stick with JDBC during batch processing.

Learning Hibernate also takes a lot of time and effort.

#### Hibernate Example
Here's an example of bi-directional mapping using Hibernate.

```java
 //This is customer.java class
import java.io.Serializable;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.CascadeType;
import javax.persistence.Column;

@Entity
public class customer implements Serializable {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)//to autogenerate the primary key
	private Long id;

	@Column(name = "customer_name")
	private String customer_name;

	@Column(name = "custmer_id")
	private String custmer_id;

	@Column(name = "customer_email")
	private customer_email;

	@OneToOne(cascade = CascadeType.ALL)//creating a one to one relationship
	@JoinColumn(name = "location_id", referencedColumnName = "id")//joining  the two tables
	private Location location;
}

//This is location.java class
//import  the same packages as the one imported in customer.java class
@Entity
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "state")
	private String state;

	@Column(name = "state_number")
	private String state_number;

	@OneToOne(cascade = CascadeType.ALL, mappedBy = "location")
	private Customer customer;

}

//main class
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.hibernate.SessionFactory;
import java.util.List;
import org.hibernate.cfg.Configuration;
import com.netsurfingzone.entity.Location;
import com.netsurfingzone.entity.Customer;

public class Main {
	public static void main(String[] args) {
		SessionFactory factory = null;
		Session session = null;
		Configuration configuration = new Configuration().configure();
		try {

			factory = configuration.buildSessionFactory();
			session = factory.openSession();
			Transaction k = session.beginTransaction();
			
			
			Customer customer1 = new Customer();
			customer1.setCustomerName("Kelvin");
			customer1.setCustomerId("56");
			customer1.setCustomerEmail("kelvin@gmail.com");
			
			Customer customer2 = new Customer();
			customer2.setCustomerName("Joy");
			customer2.setCustomerId("26");
			customer2.setCustomerEmail("joy@gmail.com");
			
			Location location1 = new Location();
			location1.setState("Turs");
			location1.setStateNumber(51");
			Location location2 = new Location();
			location2.setState("Rouds");
			location2.setStateNumber(45");
			
			
			customer1.setLocation(location1);
			customer2.setLocation(location2);
			session.save(customer1);//saves the customer details 
			session.save(customer2);
			
			
			k.commit();//commit the transaction
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
            factory.close();
			session.close();
			
		}
	}

}
```

class, we have customer_id,customer_name, and customer_email and in the Location class, we have state and state_number which are all private data. 

We then create session objects for the two classes i.e Customer class and Location Class in the Main class. We join the two columns by using "@JoinColumn()" and giving the name to that column. 

The location details for the two customers are automatically saved once we save the customer details, this is because the cascade type was set to ALL. We then commit the transaction hence joining the two tables.

### Conclusion
Hibernate is an ORM technology that is used to map database structures to Java objects in real-time.

The use of Hibernate, a persistent framework, lets developers concentrate solely on developing business logic code, although they must also write an accurate and reliable persistence
layer.

#### Further Reading
- [What is Hibernate in Java and why do we need it?](https://www.edureka.co/blog/what-is-hibernate-
in-java/)
- [Introduction to Hibernate](https://www.wideskills.com/hibernate/introduction-to-hibernate)
- [Hibernate framework](https://en.wikipedia.org/wiki/Hibernate_(framework))

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)