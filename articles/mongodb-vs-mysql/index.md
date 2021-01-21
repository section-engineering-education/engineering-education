A few years ago, applications had just a handful number of users. Today, the number of people using applications has immensely grown, which calls for more developed databases to support thousands of users.

This article will extensively enumerate the difference between relational and non-relational databases, and specifically MySQL and MongoDB. It will highlight the advantages and disadvantages of using the two to help you choose the best depending on the project situation.

### Relational and Non-relational database
[Relational databases](https://www.oracle.com/database/what-is-a-relational-database/#:~:text=A%20relational%20database%20is%20a,of%20representing%20data%20in%20tables) store and provide access to data points related to another. Most applications use relational databases. They work best when they use limited sized data. Relational databases are insufficient when they have to handle a large volume of data such as the internet, multimedia, and social media.
[Non-relational databases or NoSQL](https://www.mongodb.com/nosql-explained) (Not only SQL database), unlike MySQL, stores data in a non-tabular format. NoSQL can handle unstructured data such as e-mails, documents, multimedia, and social media more efficiently. They are best to use whenever one has a large volume of data. 

MySQL is an excellent example of a relational database, while MongoDB is an excellent example of a non-relational database.

### MongoDB

MongoDB is a document database with scalability and flexibility that supports querying and indexing as per users' needs. It is a popular document-oriented and NoSQL database. The first MongoDB version was released in the year 2010. 

MongoDB does not require a fixed structure and is flexible to change in its schema-free implementation. Meaning it does not require a logical configuration of database parts. 
It is highly scalable and available. MongoDB is highly efficient and reliable. It is suitable for storage capacity and speed demands.

#### BSON Files
Documents in MongoDB are created and stored in BSON files (BSON stands for Binary JSON). BSON file is a modified version of [JSON](https://www.json.org/json-en.html) (JavaScript Object Notation) files and supports all JavaScript files. JSON is a lightweight data-interchange format, easy for humans to read and write and for machines to parse and generate. JSON was derived from JavaScript, though it is independent of the language. BSON is preferable to JSON because it is easy to study, faster, and requires less storage. 

### MySQL

It is an open-source and a relational database management system. The concept behind MySQL is that data is stored in rows and tables, then classified into a database. MySQL uses SQL language to access and manipulate the database. SQL does the following in the database:
1. Enables query execution.
2. It enables data retrieval.
3. Allows inserting, updating, and deleting of records.
4. Allows creating new databases.
5. Allows creating new tables and views.

Each table in MySQL stores separates information. The concept of MySQL [Joins](https://www.techopedia.com/definition/1213/join#:~:text=A%20join%20is%20an%20SQL,a%20relationship%20between%20the%20tables.&text=The%20type%20of%20join%20a,which%20records%20the%20query%20selects) is applied. Join operations concept is a method of inter-linking data in one or more tables based on a standard column's values between the tables. Joins minimizes data duplication chances across the tables. 

Examples of platforms run by MySQL include Linux UNIX and Windows. Examples of web-based applications that use MySQL include Facebook, Twitter, YouTube, etcetera.

### MySQL and MongoDB feature comparison

| Feature | MySQL | MongoDB |
| --- | --- | --- |
| Programming language | It is written in C++ and C languages. | It is written in C++. |
| Access language | MySQL operational language is [Structured Query Language](https://www.dataversity.net/structured-query-language-sql/#) (SQL). | MongoDB functional language is [unstructured query language](https://www.dataversity.net/unql-a-standardized-query-language-for-nosql-databases/) - JSON. |
| Database type | It is a relational database management system (RDBMS). | It is a document-oriented database designed for storing, retrieving, and managing document-oriented information. |
| [Schemas](https://www.tutorialspoint.com/dbms/dbms_data_schemas.htm) (Skelton structure that represents the logic of the database). | It has a strict schema. Before storing anything, one needs to define tables and columns clearly. Also, ensure that every row in the table should have the same column. | It has a dynamic schema. Several documents can be dropped with no relation, only that documents need to be supported by data structures. |
| Attack risks and security | It is prone to [SQL injection attacks](https://www.imperva.com/learn/application-security/sql-injection-sqli/) (a vector that uses malicious SQL code). It has a privileged-based security model; it authenticates any user and gives users privileges on specific tasks, such as creating, selecting, or inserting.  | Less risk of attack. Its design makes it hard to attack. Unlike MySQL, MongoDB uses role-based authentication. Its security procedures include authentication, auditing, and authorization.  |
| Organized By | Data is organized by a table, row, and columns. | Data is organized by collection, document, and field classification. |
| Performance | It is better for smaller databases and more general solutions. | It is better for handling massive, unstructured data sets as it has in-memory speed. |
| Developer | Oracle corporation does the ongoing development. | MongoDB, Inc. does the ongoing development. |
| Scaling | MySQL is vertically scalable. More powerful CPU and RAM are needed to increase the size of data in a server. | MongoDB is horizontally scalable. It is possible to increase more servers or create clusters with multiple servers. |
| Support provider | It offers [Oracle lifetime support](https://www.mysql.com/support/), though at different versions. Each level offers a knowledge base, maintenance releases, bug fixes, patches, and updates. | Offers Enterprise-Grade Support. It allows flexibility to upgrade to the newer versions. It has unlimited access to security fixes, updates, and many more. |
| Community of users | MySQL started several years ago. It enjoys a large community of users. It is extensively tested to ensure stability. | It has a relatively smaller community than that of MySQL, as it is newer. |
| Command speed | MySQL is slower than MongoDB in executing the same commands like the select, update, and insert. | MongoDB is faster since it is written in C++, which is an object-oriented language.  |

### MongoDB vs. MySQL: Advantages and disadvantages.

#### Advantages of using MongoDB

1. MongoDB's schema is flexible. It can be modified to fit the user's needs. One can input data in whatever data model without any predefined schema. Also, the user is free to change data format or model any time without any hurdle.
2. It is scalable. Using replica sets in MongoDB is possible. To increase the data load, one needs to add more server hardware power and more machine resources.  
3. It supports expansion in that it allows the addition of machines and RAM to the system. It is data-intensive, stores a lot of information, and queries a lot of data.
4. It also allows for document validation and integrated systems.

#### Disadvantages of using MongoDB

1. It uses very high memory, and it may have massive data, some useless over time.
2. It limits the document size to 16MB. Hence it requires more procedures for one to store a large file with more than 16MB.
3. In some instances, it is comparatively slow compared to NoSQL, which leads to poor page response.

#### Advantages of using MySQL

- It has been around for quite some time; hence publications and knowledge sources are many. It is a community-driven database.
- It supports a password security system, and therefore it's somehow secure. It uses Transport Layer Security and Secure Socket Layer to encode and decode to ensure that data is accessible to the only intended user.
- It can handle large unstructured data faster than MongoDB.

#### Disadvantages of using MySQL.

- It may take a lot of time and effort to perform some tasks, even for some tasks requiring an automatic update, such as incremental back-ups.
- It is not easily scalable. It is not possible to use replica sets in MySQL. In some exceptional instances, scaling in MySQL is done using a robust server or even complex sharding (breaking large tables into smaller ones across the multiple servers) solution is done. Powerful servers are not only costly but also challenging to handle. 
- It has no in-built [XML](https://en.wikipedia.org/wiki/XML#:~:text=Extensible%20Markup%20Language%20(XML)%20is,free%20open%20standards%E2%80%94define%20XML) (Extensible Markup Language) and [OLAP](https://olap.com/olap-definition/) (Online Analytical Processing). MySQL requires more procedures in requesting scripts into XML format, as one has to send the script which connects to MySQL, retrieves and formats to XML, and is returned to the client, which consumes more time.

### Conclusion
Both MySQL and MongoDB are essential databases. Even after the emergence of non-relational data, relational data are still important databases. It is unlikely that they will be extinct or even threatened by the emergence of non-relational databases.

It is the developer's job to decide, depending on the project, which database to use. The developer should choose carefully considering the requirements of the application and features of the database.

MySQL is flexible, high-performance, and easy to manage data. However, suppose the developer comes across characteristics of the project with the complexity of data, big sized data, growing data, and the need for object querying. In that case, it is advisable to change from MySQL to MongoDB.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
