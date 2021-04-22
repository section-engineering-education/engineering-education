---
layout: engineering-education
status: publish
published: true
url: /engineering-education/understanding-dbms/
title: Understanding Database Architecture and Models
description: Learn the concepts of database and its three types of build architecture. Study the different aspects of the Hierarchical Data model, Network Data model, and Relational Data model.
author: kanishkvardhan-a-n
date: 2020-10-06T00:00:00-05:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-dbms/hero.jpg
    alt: Database Architecture and Models example image
---
Computers have made our lives easier by handling complicated calculations and solving complex problems. Hands down computers are one of the best inventions of mankind. While using computers and instilling them in our lives has made our work a piece of cake, maintaining them can be difficult to accomplish.
<!--more-->
### Memory Unit
Computers are constructed around an integral part called the **[Motherboard](https://en.wikipedia.org/wiki/Motherboard)**. Onto the motherboard, various working components are fixed such as processors, slots, controllers, buses, etc. The computer would not be functional if the motherboard had one faulty component. For the computer to run properly all the components rely on each other and work together. One such component is the **Memory Unit**.
This particular unit is responsible for storing everything the computer does or processes in the form of bytes.

Now as humans, we may not understand bytes or binaries. But the computer does, and it stores these instructions as data. The computer processes this data and generates the correct facts and figures in the form of output. This corresponds to only one instruction. The computer is capable of processing millions of instructions in any given second.

Now, handling and maintaining this many instructions can be a little tough and messy. This is where the [database](https://en.wikipedia.org/wiki/Database) comes into the picture. In simple words, a database is a collection of data that is neatly organized and arranged. There is certain software that helps us do this. These types of software are called **Database Management Systems (DBMS)**. Examples of DBMS software includes [Oracle Database](https://www.oracle.com/in/database/), [Microsoft Access](https://www.microsoft.com/en-in/microsoft-365/access), [MySQL](https://www.mysql.com/), etc.

### DBMS Architecture
DBMS are divided into multiple modules for better functioning. DBMS makes use of the fundamental concept of **client-server architecture**. In this type of model, the servers distribute the internet services and system solutions to the requested clients. Servers and Clients are present in the same system and are connected through a single internet network. To understand the structure of DBMS, they are classified into three types based on their build architecture:

#### One-Tier Architecture
One tier Client/Server architecture is the type of architecture where the user or the programmer can directly work on the DBMS. The changes or alterations made here will reflect on the database itself. Although this type is best-suited for programmers or administrators, and the end-users may not benefit from it. Sysops (system operators) use this type of architecture for development purposes.

#### Two-Tier Architecture
This type of architecture benefits the end-users a bit more. This type of DBMS works as a two-way system. Unlike the one-tier architecture, the end-user can establish a direct connection with the database using APIs. For this, ODBC (Open Database Connectivity) drivers are used. These drivers create an interface between the database (present on the server-side) and application program (present on the client-side). Once the client/server connection is secured, DBMS functionalities are ready to use. The user can now operate, manipulate, or optimize data.

#### Three-Tier Architecture
In this type of architecture, another layer is sandwiched between the client-side and the server-side. This intermediate layer is called the *Application Layer*. This layer is responsible for storing connectivity software and holds data transfer limitations. This layer makes sure that the right amount of data is being processed and transferred from the database to the client-side. From the user point of view, the application tier is a conceptualized form of the original database. Users are unaware of any tiers beyond this layer. Similarly from the database point of view, the application layer acts as the user. It is unaware of any tiers beyond this layer.

### Data Models
A model is a representation of something in its abstract form. Likewise, **a data model is a model that describes how data is represented or designed**. While there are many data models in use, some are detailed below:

#### Hierarchical Model
This [model](https://en.wikipedia.org/wiki/Hierarchical_database_model) was first developed by IBM around the year 1960. The model sorts the data in a *tree-like* structure. Each data element can be represented as a single node. Each child node is also called dependents. The node without any parent node is called the root node. A parent node can have n-child nodes, while a child node can have only one parent node. Thus, it symbolizes **one-to-one** and **one-to-many** relationships. This type of database model consists of records and the collection of similar types of records are known as record-type. These records are joined together through links.

Hierarchical data models are easier to understand. The node representation in the form of a tree-like structure makes the data easily accessible. But since the nodes are connected through links it makes the hierarchical model fixed. This prevents the possibility of expansion and modification of the structure. This is because once the connection is made between any two nodes, they are permanently linked. Thus, making it one of the major drawbacks of hierarchical models.

#### Network Model
This [model](https://en.wikipedia.org/wiki/Network_model) was introduced by CODASYL (Conference on Data System Languages) in 1969. A lot of its features are like the hierarchical model. The collection of similar types of records are called record-type. The data elements (nodes) are connected through links. But unlike the hierarchical model, links not only connect similar nodes but also connect two records. In a way, the records now act as the nodes. Thus, the nodes are linked to other nodes without any hierarchy. Because of this, any node can be accessed from any one of the many paths. This forms a graph-like structure for the network model.

Since the network model follows a graph-like structure, the possibility of a child node having many parent nodes is high. So technically this model symbolizes a **many-to-many** relationship. Because of the graph structure, the arrangement of the database can be compound and complex. The links traverse through many nodes and if anyone single link is damaged it can cause complexities to the whole structure. Therefore, the network model needs to be highly maintained.

#### Relational Model
This [model](https://en.wikipedia.org/wiki/Relational_model) was introduced by [E.F.Codd](https://en.wikipedia.org/wiki/Edgar_F._Codd) in 1969. One of the main properties that distinguish this model from the others is that there are no actual connections between the data elements. The data elements are arranged in the form of tables. The row part of the table describes the entity. The column part of the table describes the attribute of that entity. Each table is called a relation. Unlike other data-models, the tables are related to each other through a common attribute in relational models.

The relational model makes data sorting easier. This helps to improve the database querying. Because of that, it's user-friendly and is a leading choice for big companies in managing their data. Relational Databases are the databases that are constructed using this model. Codd developed 12 rules known as [Codd’s Rules](https://en.wikipedia.org/wiki/Codd%27s_12_rules) which define what it takes a database to be a **RDBMS (Relational Database Management System)**. Currently, there is no such system that follows all 12 rules.

### Conclusion
In this article, we learned the concepts of a database (Database Management Systems) and three types of build architecture. We studied the different aspects of the Hierarchical Data model, Network Data model, and Relational Data model.

### Additional Resources
[Database Management System](https://www.tutorialspoint.com/dbms/index.htm)

[DBMS-Architecture](https://www.javatpoint.com/dbms-architecture)

[Database | Oracle](https://www.oracle.com/database/what-is-database.html)

---
Peer Review Contributions by: [Gregory Manley](/engineering-education/authors/gregory-manley/)
