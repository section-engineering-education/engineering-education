
Unlike the early times when data was stored on papers and cabinets, data is now all around us. Data is the backbone of almost every modern business models. With the current steep growth of the database technology, as a developer building an application to store some data online. The big question you should be asking yourself is which database model will fit your application model. Knowing which database structure to use is critical to building outstanding applications. SQL or NoSQL? We will dive into these two databases, understand their structures, explore them in-depth, and understand how they work. These two database structures do one thing, to store data, but the approach to do this may differ.

### What SQL

SQL is the most popular database structure.  SQL (commonly pronounced as 'see quell') stands for the structured query language.  SQL is a language used for writing query statements to interact and communicate with relational databases. A relational database is a database that has a tabular schema to store data in terms of rows and columns. Each column contains data that are called attributes, and each row is called a record. The data in the tables can be related to each other hence the 'relational database'. A collection of these multiple tables in a database is what we are calling a schema. A relation is simply a decorative phrase for a table.
Relations can exit in different ways, such as
- One to one 
- One to many
- Many to many

SQL statements will help you perform CRUD operations such as CREATE, READ, UPDATE, and DELETE. These operations will help you to retrieve and modify data.
If we were to have a student info database with table student and course, this is how we can represent a relation in an SQL database.

![SQL database table](/engineering-education/sql-or-nosql-when-to-choose-what/tables.png)

![SQL](/engineering-education/sql-or-nosql-when-to-choose-what/sql.png)

SQL is a simple language that is extremely powerful. You can create multiple databases with multiple tables to store data with foreign key mapping. Each row in the SQL database has its specific value characters, such as text and integers.

![Relations](/engineering-education/sql-or-nosql-when-to-choose-what/relations.png)

SQL databases need a server that runs a database management system (DBMS). Some of the common SQL databases include [MySQL](https://www.mysql.com/why-mysql/), [Oracle Database](https://www.oracle.com/database/), [PostgreSQL](https://www.postgresql.org/about/), [Microsoft SQL Server](https://www.microsoft.com/en-gb/sql-server/), and [MariaDB](https://mariadb.org/documentation/).

### NoSQL

NoSQL does not mean 'no SQL.' It is a non-SQL database structure with a non-relational mechanism for storing and retrieving data. Its data model does not have tabular schema as used in relational databases. You do not need to create tables (no rows and columns). NoSQL databases store and manage data in ways that allow high operational speed and great flexibility. It is used to build real-time web apps and big data to handle large quantities of unstructured and semi-structured data. They are designed to perform high levels of read and write while scaling horizontally. JSON is a common representation of non-structured data. NoSQL example context:

```sql
Database --> Collection(s) --> Objects(s)
```

If we refer back to SQL, the collection would be the table, and the object will be the rows and columns. Just like SQL, where a database has several tables, NoSQL creates multiple collections. In this case, there are no relations between the collections. Rows and columns will be the objects of the NoSQL.

Like SQL, NoSQL has a unique id that uniquely identifies a specific object within a collection. Nested objects and array are supported where an object can be inside another object. If we were to represent the SQL student info database in NoSQL, this how it would look like:

```json
{
"Student" {
        "_id: Objectld('14s5gg98we9d’)",
        "firstName: Alex",
        "lastName: Brooks",
        "username: alex09_b",
        "Courses": [{"name": "Web Dev"}, {"name": "React js"}]
    }
}
```
Some of the common NoSQL databases include [MongoDB](https://www.mongodb.com/what-is-mongodb), [Apache Cassandra](https://cassandra.apache.org/doc/latest/getting_started/index.html), [Google Cloud BigTable](https://cloud.google.com/bigtable), [Apache HBase](https://hbase.apache.org/), and [Redis](https://redis.io/).

### SQL or NoSQL (high-level differences)

#### Relation

SQL employs a kind of relationship that exists between two or more database tables. As we have explained above, NoSQL is non-relational.

To understand this point, think of two towns. Let's say town A, and town B. Take town A, where the residents understand only one language. They use it to do all sorts of communication and interaction around them day in day out. To change the language of this town will bring a lot of confusion and disruptions among the residents. Take town B, where the residents speak different languages. Everyone communicates and interacts with the world around them differently. There is no universal way to understand each other. When a new resident is introduced to this town, this new resident's language will affect no one.

Town A represents the relational SQL, and Town B represents the non-relational NoSQL. SQL is powerful and versatile. On the other hand, they are restrictive and structured with a pre-defined schema. If you choose to use them, your data must use and follow the same structure. And as in Town A, changing its structure would be difficult. It will disrupt your whole system. The language of SQL is tabular with rows and columns. You can only follow that structure.

On the other hand, NoSQL, like town B, has a dynamic, unstructured schema flexible to any new resident. This data can be
- Document-oriented
- Column-oriented
- Graph base or
- Key-value store.

It is extremely flexible.
- Each document you add has no defined structure.
- Each document has its own distributed structure.
- To add files in a document as you go.

#### Schema

Schema is a blueprint of how data is organized in a database. These two database models have a completely different database schema representation. To understand this further, check out this joke.

![Databases schema](/engineering-education/sql-or-nosql-when-to-choose-what/database-admins.jpg)

If these admins walked into an SQL bar, they would have defiantly found a table to enjoy their drink from. This means NoSQL has no tabular schema and SQL does.

#### Scalability

Think of a building near your neighborhood. Be the architect and check the possibility of adding more floors to the existing building to host more rooms. Would you propose adding more floors to the existing building, or would you build a new one? If you will add more floors, what are the chances of this building to remain stable? That the case here.

SQL is scaled vertically. This means that a server capacity can be increased by increasing specks such as CPU, RAM, and disk size (HDD or SDD) (more floors will be added to the existing building). Vertical scaling adds more power to your existing server. Of course, the downside of that is that there will be a limit point hit on how much power you can stretch your server. That is one of the restrictions of an SQL database approach that makes scaling to be hard.

On the contrary, NoSQL databases are scaled horizontally. You don't need to worry much about RAMs, CUPs, and disk size (create more buildings next to your neighborhood). Split the data across multiple servers. NoSQL will help you handle large and constantly changing data.

### SQL vs NoSQL (when to choose what)

How do you decide which database model to choose? Which is better? Which database fits your business/application model? These two databases are great, and they can leave you in a dilemma of not knowing which to choose. Why chose this and not the other, and it is okay to be in that position.

Let’s check some of the factors that will help you decide what fits your needs.

#### When to use NoSQL

- Fits well when a business model has a rapid growth of data, and the database has no clear schema definitions, especially when dealing with unstructured information. Rapid data growth needs highly flexible data models to scale out the needs of that application.
- If your business model has no defined schema or the data requirements and the schemas are constantly evolving.
- When dealing with IoT technology, NoSQL will be a great fit as it offers real-time insights for sensor data.
- Real-time transaction pieces of information such as customer behaviors, analytics information, financial markets, and trading activities would be great under NoSQL.  NoSQL will help you to check and watch real-time information transactions.
- When dealing with millions and millions of rows and columns, NoSQL will be a significant consideration. It provides fast read and writes access to big data.

#### When to use SQL

- The biggest win of SQL is when the legacy of your system needs a relational structure. SQL will be a natural fit. SQL thrives in such circumstances that need high-quality and well-managed relational database systems that are easy to setup.
- If your application requires multi-row transactions such as accounting and budget systems
- Pre-defined data structure with multi-row transactions which have set schemas such as inventory system that have distinct entities. SQL will be the match as it provides perfect nominalizations and simple queries that comply with ACID
    ACID represents:
    - A (atomicity) a database process transaction is either wholly executed or not executed at all.
    - C (consistency) only valid data is recorded to the database, and if a transaction was invalid, this database reverts to its former state. The inconsistent transaction is aborted, and an error is created into the error log.
    - I (isolation) a transaction is securely and independently processed without interfering with another transaction.
    - D (durability) if a transaction process is completed successfully, all its changes are stored permanently.

- If your system values data integrity, then worry out. SQL database system is designed to change the data type to the way you want them to be, i.e., integer, varchar, text, Boolean, date value, etc.

Let’s look at the 2020 [annual developer survey](https://insights.stackoverflow.com/survey) trends conducted by StackOverflow, involving over 65,000 respondents from over 180 countries.

- *[Most popular](https://insights.stackoverflow.com/survey/2020#technology-databases-all-respondents4) databases*

![most popular databases](/engineering-education/sql-or-nosql-when-to-choose-what/most-popular.png)

- *[Most popular databases among professional](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-wanted4) developers*

![most popular databases among professionals](/engineering-education/sql-or-nosql-when-to-choose-what/popular-among-professionals.png)

- *[Most loved](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-loved4) databases*

![most loved databases](/engineering-education/sql-or-nosql-when-to-choose-what/most-loved.png)

- *[Most wanted](https://insights.stackoverflow.com/survey/2020#technology-most-loved-dreaded-and-wanted-databases-wanted4) databases*

![most wonted databases](/engineering-education/sql-or-nosql-when-to-choose-what/most-wanted.png)