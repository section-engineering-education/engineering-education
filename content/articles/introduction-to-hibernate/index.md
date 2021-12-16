### Introduction
Hibernate is a java object-relational mapping (ORM) and durability framework that lets you map regular Java objects to database tables. Hibernate's primary objective is to relieve the developer of typical data persistence-related chores.
### Hibernate Definition
Hibernate is a Java technique that enables developing database-interactive Java applications more easier.
It's an ORM (Object Relational Mapping) tool that's open source and lightweight.
### Table of contents
- [Hibernate Architecture](#hibernate-architecture)
- [Architecture Components ](#architecture-components)
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

### Hibernate Architecture
Hibernate has a layered architecture that allows users to operate without having to know the core APIs. To provide durable features, Hibernate makes use of the databases and configurable information. Hibernate's architecture is divided into four levels:

    1. Application Java
    2. Hibernate Framework
    3. Backhand API
    4. Database level
The Hibernate Application Architecture is depicted in the diagram below at a high level:
![High-Level View Architecture](/engineering-education/introduction-to-hibernate/high.png)
The Hibernate Application Architecture is depicted in full below, along with its key core classes:
![Detailed View Architecture](/engineering-education/introduction-to-hibernate/detailed.png)

#### Components of Hibernate Architecture 
Each of the Application Level class objects is summarized in this section.

#### SessionFactory Object
SessionFactory is a session and client factory for the ConnectionProvider. In a second-level cache, data is saved..

#### Session Object
The session object serves as a link between the database and the application's data. It is a tiny object that wraps the JDBC connection. It's a factory for transactions, queries, and criteria. 

#### Transaction Object
The user interface for transactions provides the single set of activities specified by the transaction object, as well as functions for transaction processing.
#### ConnectionProvider
It's a factory for JDBC connections. It hides the application's connection to the DataSource.

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
Here's an example of  implementation of Hibernate.It is for one-to-one biderectional mapping.
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
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(name = "customer_name")
	private String customer_name;

	@Column(name = "custmer_id")
	private String custmer_id;

	@Column(name = "customer_email")
	private customer_email;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "location_id", referencedColumnName = "id")
	private Location location;
	
}
//This is location.java class
//import  the same packages  as the one imported in customer.java class
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
			session.save(customer1);
			session.save(customer2);
			
			
			k.commit();
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
            factory.close();
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




