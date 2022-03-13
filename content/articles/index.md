### Integrating MongoDB With Java

MongoDB is a NoSQL database that stores record as documents. It uses JSON syntax and JavaScript Object Notation to store data. When integrating MongoDB with Java, it uses a different syntax.
In this article, you'll learn how to connect MongoDB with Java using Eclipse and how to perform CRUD (create, read, update, and delete) operations using Java and the MongoDB Java Driver. MongoDB is based on a document model written in C++, JavaScript, and Python.

### Table of Contents 
- [Prerequisites](#prerequisite) 

- [Relational Database Management Systems vs MongoDB](#Relational-Database-Management-Systems-vs-MongoDB)

-  [Connecting MongoDB with Java](#Connecting-MongoDB-with-Java) 

- [Creating MongoDB collection](#Creating-MongoDB-collection)

- [Insert data into the collection](#Insert-data-into-the-collection) 

- [Update data in the collection](#Update-data-in-the-collection)

- [Delete data in the collection](#Delete-data-in-the-collection) 

- [Delete the collection](#Delete-the-collection)

- [Eclipse versus Intellij Idea in MongoDB integration with Java](#Eclipse-versus-Intellij-Idea-in-MongoDB-integration-with-java)  
- [Conclusion](#Conclusion)
 
### Prerequisite
To follow along with this tutorial, you'll need the following: 
- A basic understanding of the Java language
- Eclipse IDE installed on your OS- 
- MongoDB installed on your OS
- MongoDB Java Connector
- Java JDK 

### Relational Database Management Systems vs MongoDB
#### MongoDB is a non-relational database, while Relational Database Management System is a relational database.

Relational databases store data in rows and columns, also known as records. A relational database works by the use of keys to connect information from multiple tables, e.g., foreign keys and primary keys. On the other hand, data get stored in a non-relational database. There are no tables, rows, primary keys, or foreign keys, as there are in a relational database. MongoDB makes use of documents, which get stored in the form of BSON documents.
MySQL, Oracle, IBM DB2, and Microsoft SQL Server are some of the most popular RDBMS.
MongoDB, CouchDB, CouchBase, Cassandra, HBase, Redis, Riak, and Neo4J are the popular NoSQL databases.

#### MongoDB uses collections, whereas RDBMS uses tables.
Collections are how MongoDB organizes documents. In relational databases, collections are analogous to tables.

#### No schema definition is required in MongoDB, but a clear schema is required in RDBMS.

MongoDB allows unstructured data to be stored that is building your application without first defining the schema. Before adding data to a relational database, you must first define your schema. Because Since MongoDB does not require a predefined schema, it is much easier to update as data and requirements change. Which makes it much better than a relational database. Changing the schema structure of a relational database can be expensive and time-consuming.

#### Scaling in MongoDB and Relational DatabasesThe database must be scaled.
In MongoDB, it's easy to scale, while in RDBMS, the options for scalability are more limited.

### Connecting MongoDB with Java

To connect MongoDB with Java, you'll need to do the following.
In Eclipse, create a new project. Right-click on the file created, click on properties, and on the Java build path, you'll add the MongoDB Java connector that you downloaded and then click on AddExternalJARS to create a connection between MongoDB and Java. Make sure the MongoDB server is running before using Eclipse.
#### How to run the MongoDB server
- Open two command prompt windows
- The installed MongoDB in local drive c is navigated using one of the cmd prompts, bash. If you haven't installed your MongoDB, you can get help from this link. [Installing MongoDB](https://docs.mongodb.com/guides/server/install/)
``` 
C:\Program Files\MongoDB\Server\5.0\bin>

```  
- To run the MongoDB server, type ``mongod`` in the terminal.Since you haven't created the folder yet, this is how you create it by writing the snippet below in your terminal.

``` 
C:\Program Files\MongoDB\Server\5.0\bin>mongod --dbpath=mongodata

```
- After creating the folder, type mongod, and after running, it starts the MongoDB server. The current cmd prompt should not be closed.
``` 
C:\Program Files\MongoDB\Server\5.0\bin>mongod
```
- To run commands on MongoDB, you need to run the mongo command in the other cmd prompt and type the command for MongoDB to open the shell.
```
 C:\ Program Files\MongoDB\Server\5.0\bin>mongo
```
After you run the code, you can show how many databases are currently available within your MongoDB.

![Available Databases](integrating-mongodb-with-java/available-databases.png).

#### Connectivity
In this tutorial, you'll create a database called SchoolManagementSystems and populate it with a collection called Students. 

Every collection must contain data, and in this tutorial, I'll include the names of two students.
To connect to the database, you need to import different packages, as shown below:
```java 
import java.net.UnknownHostException; //Its used if the IP address of a hostname could not be determined
import java.util.Iterator; //an Iterator which is used to loop through collections is imported from java.util package
import org.bson.Document;// Parses a string in MongoDB Extended JSON format to a Document
import com.mongodb.*;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection; import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;
```
To connect to a running MongoDB instance, use MongoClient() inside the `public static void main` as shown below.The MongoClient instance represents a pool of database connections; even if you have multiple threads, you only need one instance of the MongoClient class.

```java 
// Creating a Mongo client
public static void main(String[] args) throws UnknownHostException {MongoClient mongoClient= new MongoClient( "localhost", 27017);//connecting to the database
MongoDatabase db=mongoClient.getDatabase("SchoolManagementSystem");
```
### Creating MongoDB collection
MongoDB stores data records as documents that are organized into collections.
To create a collection, type the code below after the created mongo client.

```java
MongoCollection> collection<Document>collection=db.getCollection("students");
```
 
To confirm if the collection has been created, type show collections in the cmd terminal.

![Created Collections](integrating-MongoDB-with-java/created-collections.png)

### Insert data into the collection

Add the following code to your Java class after the created collection.
```java
//inserting a new document in the collection which will be student number one.
Document doc=new Document("name","Christine Muthoni");doc.append("id", "CT201/100091/20");doc.append("course", "Clinical Medicine");doc.append("Gender", "Female");collection.insertOne(doc);System.out.println("Insert is completed");

//insert a new document in the collection, which will be student number two. 
Document doc2=new Document("name", "Esther Wacera");doc2.append("id", "CT201/10999/14");doc2.append("course", "Civil Engineering");doc2.append("Gender", "Female");collection.insertOne(doc2);System.out.println("Insert is completed");
```
In the cmd terminal type
``` 
myCursor=db.students.find({})
```
which confirms if the data has been inserted.
It should look something close to this:
![Inserted Data](integrating-mongodb-with-java/insert-data.png)

### Update data in the collection
To make changes to existing data, you use the update function, which will be written as follows:
```java
//It will replace the existing course, Civil Engineering to Computer Science.
collection.updateOne(Filters.eq("name", "Esther Wacera"), Updates.set ("Course", "Computer Science"));
```
In the cmd terminal type
``` 
myCursor=db.students.find({})
```
which shows the updated data as shown below:!
 
[Updated Data](integrating-mongodb-with-java/update-data.png)

### Delete data in the collection.
To delete any unwanted data, the delete function is used as shown below.
```java
collection.deleteOne(Filters.eq("name", "Christine Muthoni"));collection.deleteOne(Filters.eq("name", "Esther Wacera")); 
```
In the cmd terminal type
```
myCursor=db.students.find({})
```
which shows the deleted data as shown below:!

[Deleted Data](integrating-mongodb-with-java/delete-data.png)

### Delete the collection
 To delete a collection that has been created the code below is used.
 ``` java
  collection.drop();
 ```
 ### Eclipse versus Intellij Idea in MongoDB integration with java
The CRUD operations are performed the same way in IntelliJ and Eclipse, but connecting MongoDB with Java in Eclipse is different. The IntelliJ idea makes use of dependencies, which are Jason files in Javascript. Here, the Java driver is included in the dependencies.
Dependencies used should be added to the XML file. The following dependencies should be added:
```java      
<dependencies>
    <dependency>
        <groupId>org.mongodb</groupId>
        <artifactId>mongo-java-driver</artifactId>
        <version>3.12.10</version>
    </dependency>
</dependencies>
```
  
Create a new class (SRC-main-Java-new class) and import the following packages
```java
import com.mongodb.*; 
import java.net.UnknownHostException;

```
Inside the public class created, a client should be initialized to run the project with the mongo client syntax. You can decide to declare your client's collections and databases as static in the main file as shown below.
``` java
import com.MongoDB.*; 
import java.net.UnknownHostException;
public class mongoDB {
public static MongoClient mongoClient;
public static DB database;
public static DBCollection collectiontest
public static void main(string[]args) throws UnknownHostExcepton {mongoClient= new MongoClient(new MongoClientURL("mongodb://localhost:27017"));          
}
}
```
In the main class, you'll start the mongo client using the following code snippet.
  
```java
mongoClient= new MongoClient(new MongoClientURL("mongodb://localhost:27017"));
```
To instantiate the database add the following code.
```java
database= mongoClient.getDB(dbname: "SchoolManagementSystem);
```
To create a collection you use
```java
collectiontest=database.getCollection(name:"student");
```

[More on connecting MongoDB with Java using ecllipse](https://www.jetbrains.com/help/idea/mongodb.html)

### Conclusion
Java and MongoDB are two of the most popular software development technologies, so it's no surprise that they complement each other well. Whether you're developing on a local or on-premises MongoDB installation or going cloud-first with MongoDB Atlas, the MongoDB Java Driver and surrounding ecosystem make integrating MongoDB into your development process a breeze. In this tutorial, we have looked at setting up a MongoDB server. We have also looked at how to establish a connection between MongoDB and Java and how to operate with different CRUD operations. I hope you found this article helpful.!
Happy coding.