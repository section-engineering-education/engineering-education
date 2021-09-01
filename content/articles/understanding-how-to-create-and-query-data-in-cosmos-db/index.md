 ### Introduction
As a document database, Cosmos DB can be used either with SQL API or with MongoDB API, depending on your preference. As a result, we may run various types of queries and communicate with the database using schema-free documents. A collection is a grouping of documents that are of the same type. In this post, we'll look at how to create documents or collections that meet business needs. We'll also go over how to leverage the SQL API to create document-based applications.

As a result, by the end of this article, the reader will have a better understanding of the following points: The core notion of document models in Azure Cosmos DB, as well as partitioning collections and querying data in a Cosmos DB database using the SQL API

### Table of contents
- [Document and collection overview with relations](#document-and-collection-overview-with-relations)
- [The document database's structure](#the-document-database's-structure)
- [Document system generated properties](#document-system-generated-properties)
- [Partitioning collections in Cosmos DB](#partitioning-collections-in-cosmos-db)
- [Perform different types of queries on SQL-API based Cosmos DB](#perform-different-types-of-queries-on-sql-api-based-cosmos-db)

### Document and collection overview with relations
The document database model is supported by Cosmos DB. The document database model, which is comparable to the relational database paradigm, may be unfamiliar to some of us. Let's start by comparing the logical design of a document database to that of a relational database like Microsoft SQL Server.  

![Table of Comparisons](engineering-education-understanding-how-to-create-and-query-data-in-cosmos-db-comparison-table.png)

A document is the logical unit of data in a document database, equal to a relational row. Each document may have a unique set of characteristics and related values. Aside from the requirement that each document with in database have a unique identifier, there are no restrictions on the schema of a document; each document in a document database can have a distinct set of attributes. In Cosmos DB, a collection is a group of documents that are stored together; collections are frequently used to aggregate documents with similar characteristics.

A serialized version of a programming object is represented by a document in any document database. As a result, it sometimes allows for some data duplication (or denormalization) to give simple query functionality and improved efficiency. Because they do not enable JSON operations in queries, many document model-based database systems, such as MongoDB, always force simple queries. However, the Cosmos DB SQL API does provide a type of JOIN syntax, which will be covered later in this article.

### The document database's structure.
In a Cosmos DB SQL API-based database, documents are often saved in JSON format. JSON is a popular standard for sending structured data over the Internet. Its type system is based on a subset of JavaScript. JSON objects can be parsed into native objects in almost all computer languages. GeoJSON - a JSON extension used for encoding geospatial information such as geographical latitude and longitude – is supported by the SQL API.

There are a few crucial aspects to note when it comes to document structure in a document database:
- Each document contains some system characteristics by default, such as _rid, _etag, _ts, and _self.
- Each document must be under 2 MB in total size.
- If the document contains binary blobs of data and its size exceeds 2 MB, it must be saved as an attachment.
- Documents are saved as JSON data.
- GeoJSON is supported by Document Database for geometry-related data.
- If the application or source data does not have it, it is automatically added (as a GUID) to each document.

### Document System Generated Properties
When a document is added to a Cosmos DB SQL API database, it receives several system-generated properties. The names of all system-generated attributes begin with an underscore (_). 

- **_ts**: Since January 1, 1970, the timestamp of the document's most recent update, expressed in seconds.
- **_etag**: Used to manage concurrency.
- **_rid**: Unique Internal Identifier
- **_self**: A distinct URI for the document

A property called ID must be present in every document in a SQL API database. If you don't give the database an ID attribute when creating a document, it will construct one for you based on a globally unique identifier (GUID).

### Partitioning Collections in Cosmos DB
Cosmos DB provides both logical and physical segmentation to ensure consistent data performance at any scale.

1. **Logical partitioning**- 

The selection of a partitioning key is our primary design focus when creating a collection. A logical partition, which is a collection of all the data associated with each key value, is defined by a partitioning key. The scope of unique keys and atomic transactions in the collection is determined by the logical boundary set by a partitioning key; a unique key or transaction cannot extend beyond a single logical partition.

2. **Physical partitioning**-

Once we've assigned a partitioning key and a throughput threshold to your collection, Cosmos DB handles the provisioning and scaling for you. Our data is stored in physical partitions, which are made up of a block of disk space and the CPU and memory resources that go with it (the quantity of storage, CPU, and memory vary depending on the amount of throughput allocated to your collection).

![Physical partitioning](engineering-education-understanding-how-to-create-and-query-data-in-cosmos-db-physical-partitioning.png)

Partitioning on the physical level Even if all data associated with a single partitioning key is kept in a single physical partition, physical partitions do not correspond one-to-one with partitioning key values. Instead, each physical partition is assigned several partitioning keys. To assign partitioning key values to physical partitions, a pseudo-random hash of the partitioning key value is employed. A physical partition may include data for many collections in specific instances. Cosmos DB enables collections of any size by separating divisions as they fill up. Regardless of whether a partition key is defined, this automatic scaling behavior is performed to every collection that is given with 1,000 RU/s or greater throughput. Collections with Fixed scaling can only expand up to a certain size limit; collections with Unlimited scaling can grow as big as they want.

### Perform Different Types of Queries on SQL-API Based Cosmos DB
If you've written SELECT statements in a relational database using an ANSI SQL compliant database engine, you'll be familiar with the Cosmos DB SQL API's dialect of SQL for querying documents using SELECT statements. The JSON format is used by the SQL API to return results. In the context of a single collection, all queries are run. The following clauses made up a SQL API SELECT Clause, as shown below

- SELECT clause
- FROM clause
- JOIN clause
- WHERE clause
- ORDER BY clause

> The last four clauses are options whereas the first clause is not optional.

A SELECT query that returns all of the documents in a collection is shown below. This query returns a JSON array containing the documents.

```
SELECT * FROM p  
```
The query returns the Title and Name properties from each document in the collection using projection in the example below. The FROM clause is required when using projection.

```
SELECT p.Title, p.Name FROM p  
```

The query in this example returns the Title and Name properties from each document in the collection using property name syntax. The FROM clause is required when using property name syntax.

```
SELECT p["Title"], p["Name"] FROM p  
```

In this case, the query returns the Title property, as well as the FirstName and LastName properties from each document in the collection's Name subdocument.

```
SELECT p.Title, p.Name.FirstName, p.Name.LastName FROM p  
SELECT p["Title"], p["Name"]["FirstName"] FROM p  
```

The first query in this example employs a WHERE clause to return all documents with the current address. State value equal to WA. The IN keyword is used in the second example to return records from several states.

```
//one state  
SELECT * FROM p WHERE p.CurrentAddress.State = "WA"  
//three states  
SELECT * FROM p WHERE p.CurrentAddress.State IN ("WA","VA","CA")  
```

#### Use join
Even though the SQL API query language supports the JOIN clause in SELECT queries, it has less capability than ANSI SQL JOIN clauses. Distinct types of joins—inner, left outer, right outer, full outer, and cross—are supported by ANSI SQL between rows in the same table or different tables. The SQL API, on the other hand, only supports cross joins; the ON clause, which is used in ANSI SQL to define how two tables are linked, is not available. Furthermore, the SQL API JOIN clause cannot be used to join two documents; it can only be used to join within a document, between a document and its subdocuments.

```
SELECT p.Name, p.CurrentAddress.City AS CurrentCity, h.City AS EarlierCity  
FROM p  
JOIN h IN p.AddressHistory 
```

#### Aggregate functions
In SELECT queries, aggregate functions can be used to summarize data; aggregate functions are used in the SELECT clause. The following aggregate functions are supported by the SQL API query language: `COUNT \sSUM \sAVG \sMAX \sMIN`

Although aggregate functions have a similar syntax to ANSI SQL, the SQL API query language does not support the GROUP BY clause, which means you can't construct subtotals for multiple values of the same property in a single query. In the SELECT clause of your queries, we can employ many aggregate functions.

The query gives the average, maximum, and some of the _ts property of the documents in a collection, as well as a count of all the documents in the collection, in the following example:

```
SELECT AVG(c._ts) AS avg, MAX(c._ts) AS max, SUM(c._ts) AS sum, COUNT(1) AS count  
FROM c  
```

#### Function indexing
Indexes are used in relational and nonrelational database systems to increase database performance by giving fast access to property values when responding to equality, range, or order queries. In addition to the space required to store the data, an index takes up space in the database. While indexing increases read performance, it also reduces write performance because any indexes must be updated in tandem with database updates.

The primary index is created by automatically indexing all documents in a collection by partition key and id.

Based on the parameters in the collection's default index policy, Cosmos DB produces secondary indexes on all documents added to the collection by default. You may find that the default policy is adequate for your purposes, but you can tweak the default index policy in some ways to improve your collection's performance. The Scale and Settings blade in the Azure Portal Data Explorer allows you to view and update the index policy for a collection.

### Conclusion 
The document architecture of the Cosmos DB database is described in this article. We also covered the Cosmos DB Partitioning idea and how to use Cosmos DB to run various types of queries.
