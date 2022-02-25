INTEGRATING MONGODB WITH JAVA

MongoDB is a NoSQL database where records get stored in documents. It uses JSON syntax a JavaScript Object Notation to store data. When integrating MongoDB with java it uses a different syntax.
In this article, you'll learn how to connect MongoDB with java using eclipse and learn CRUD (create, read, update and delete) operations using Java and MongoDB Java Driver. MongoDB is based on a document model written in C++, JavaScript, and python.

### Table of Contents

1. [Prerequisites](#prerequisites) 
2. [MongoDB versus Relational Database Management System](#MongoDB-versus-Relational-Database-Management-System) 
3. [Connecting MongoDB with Java](#Connecting-MongoDB-with-Java) 
4. [Creating MongoDB collection](#Creating-MongoDB-collection) 
5. [Insert data in the collection](#Insert-data-in-the-collection) 
6. [Update data in the collection](#Update-data-in-the-collection) 
7. [Delete data in the collection](#Delete-data-in-the-collection) 
8. [Delete the collection](#Delete-the-collection) 
9. [Eclipse versus Intellij Idea in MongoDB integration with java](#Eclipse-versus-Intellij-Idea-in-MongoDB-integration-with-java) 
9. [Conclusion](#Conclusion) 


### Prerequisites

To follow along with this tutorial you'll need the following:
- A basic understanding of the Java language
- Eclipse IDE installed In your OS
- MongoDB installed in your OS
- MongoDB java connector
- Java JDK

### MongoDB versus Relational Database Management System

- MongoDB is a nonrelational database while Relational Database Management System is a relational database.
- MongoDB stores data using Json docs, while RDBMS stores data using rows and columns.
- MongoDB uses collections while RDBMS uses tables.
- No schema definition is required in MongoDB, but a clear schema is required in RDBMS.
- Database in MongoDB is easy to scale, while in RDBMS options for scalability are more limited.
- RDBMS is slower than MongoDB.

### Connecting MongoDB with Java.

In Eclipse, create a new project. Right-click on the file created, click on properties, and on the java build path, you'll add the MongoDB java connector that you downloaded and then click on AddExternalJARS to create a connection between MongoDB and java. Make sure the MongoDB server is running before using eclipse.


How to run the MongoDB server

1. Open two command prompt windows
2. The installed MongoDB in local drive c is navigated in one of the cmd prompts.

```
 C:\Program Files\MongoDB\Server\5.0\bin>
```
3. To run the MongoDB server, type mongod in the terminal. Since you haven't created the folder, this is how you create it by writing the snippet below in your terminal.
```
C:\Program Files\MongoDB\Server\5.0\bin>mongod --dbpath=mongodata
```
4. After creating the folder, type mongod, and after running, it starts the MongoDB server. The current cmd prompt should not be closed.
```
  C:\Program Files\MongoDB\Server\5.0\bin>mongod
```
5. To run commands on MongoDB, you need to run the mongo command in the other cmd prompt type the command for MongoDB to open the shell.
```
C:\Program Files\MongoDB\Server\5.0\bin>mongo
```
After you run the code, you can show how many databases are currently available within your MongoDB

![Available Databases](integrating-mongodb-with-java/available-databases.png)

To connect to the database, you need to import different packages as shown below:

```java
import java.net.UnknownHostException;
import java.util.Iterator;
import org.bson.Document;
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
create a mongo client inside the public static void main as shown below
```java
public static void main(String[] args) throws UnknownHostException {
MongoClient mongoClient= new MongoClient( "localhost", 27017);
MongoDatabase db=mongoClient.getDatabase("SchoolManagementSystem");
```
### Creating MongoDB collection

To create a collection type the code below after the created mongo client.
```java
MongoCollection<Document> collection= db.getCollection("students");
```
To confirm if the collection has been created type show collections in the cmd terminal.

![Created Collections](integrating-mongodb-with-java/created-collections.png)

### Insert data in the collection
Add the following code in your java class after the created collection.
```java
Document doc=new Document("name", "Christine Muthoni");
doc.append("id", "CT201/100091/20");
doc.append("course", "Clinical Medicine");
doc.append("Gender", "Female");
collection.insertOne(doc);
System.out.println("Insert is completed");
   
Document doc2=new Document("name", "Esther Wacera");
doc2.append("id", "CT201/10999/14");
doc2.append("course", "Civil Engineering");
doc2.append("Gender", "Female");
collection.insertOne(doc2);
System.out.println("Insert is completed");
```
In the cmd terminal type 
```
 myCursor=db.students.find({})
```
which confirms if the data has been inserted.
It should appear something close to this:

![Inserted Data](integrating-mongodb-with-java/insert-data.png)

### Update data in the collection
To make changes to existing data you use the update function which will be written as follows:

```java
collection.updateOne(Filters.eq("name", "Esther Wacera"), Updates.set ("Course", "Computer Science"));
```
In the cmd terminal type 
```
 myCursor=db.students.find({})
```
which shows the updated data as shown below:
![Updated Data](integrating-mongodb-with-java/update-data.png)

### Delete data in the collection
To delete any unwanted data the delete function is used as shown below.
```java
collection.deleteOne(Filters.eq("name", "Christine Muthoni"));
collection.deleteOne(Filters.eq("name", "Esther Wacera"));
 ```

In the cmd terminal type 
```
 myCursor=db.students.find({})
```
which shows the deleted data as shown below:
![Deleted Data](integrating-mongodb-with-java/delete-data.png)

### Delete the collection
To delete a collection that has been created the code below is used.

```java
collection.drop();
```
### Eclipse versus Intellij Idea in MongoDB integration with java
The CRUD operations are performed the same way in IntelliJ and Eclipse, But connecting MongoDB with java in eclipse is different. The IntelliJ idea makes use of dependencies which are Jason files in javascript. here, the java driver is included in the dependencies.

Create a new class (SRC-main-Java-new class) and import the following packages
```java
import com.mongodb.*;
import java.net.UnknownHostException;
```
Inside the public class created, a client should be initialized to run the project with the mongo client syntax. You can decide to declare your client's collections and databases as static in the main file as shown below.
```java
import com.mongodb.*;
import java.net.UnknownHostException;
public class mongoDB {
public static MongoClient mongoClient;
public static DB database;
public static DBCollection collectiontest
public static void main(string[]args) throws UnknownHostExcepton { 
.
.
.
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
[More on connecting mongodb with java using ecllipse](https://www.jetbrains.com/help/idea/mongodb.html)

### conclusion
In this tutorial, we have looked at how to set up MongoDB server. We have also looked at how to establish a connection between mongodb and java and how to operate with different CRUD operations.I hope you found this article helpful.

!Happy coding.









