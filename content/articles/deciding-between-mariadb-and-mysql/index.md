---
layout: engineering-education
status: publish
published: true
url: /deciding-between-mariadb-and-mysql/
title: Choosing Between MariaDB and MySQL
description: This tutorial will outline the key differences and similarities of MariaDB and MySQL. It will also discuss the unique features of these database frameworks.  
author: ernest-mwangi
date: 2021-03-25T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/deciding-between-mariadb-and-mysql/hero.jpg
    alt: Choosing between MariaDB and MySQL
---
MariaDB, an open-source software, is a relational database that provides a SQL interface for data access. This database server is popular because it is robust, scalable, and fast. Its vast ecosystem of plugins, storage engines, amongst other tools, makes it unique for numerous use cases.
<!--more-->
MariaDB framework is one of the most popular database servers in the world. Companies such as [Google Inc.](https://about.google/), [WordPress](https://wordpress.com/), and [Wikipedia](https://www.wikipedia.org/) are some of the users of MariaDB. Since MariaDB was forked from MySQL, they share similar components.

### Goal
This article will discuss MariaDB, MySQL, and their key features. It also compares the two to help you choose the best database server that suits your needs.

### An overview of MariaDB
[MariaDB](https://mariadb.org/) is a default type of MySQL database system which is common in most Linux distributions. It is also supported by other operating systems including MacOS and Windows. 

MySQL is mostly used as a database replacement (or as a database option) in the LEMP ([Linux, Nginx, MariaDB, PHP](https://www.digitalocean.com/community/tutorials/what-is-lemp)) and LAMP ([Linux, Apache, MariaDB, PHP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)#)) stacks.

The [Oracle Corporation](https://www.oracle.com/corporate/) acquired MySQL in 2009. MariaDB was introduced later as concerns were raised about MySQL being open-source and freely accessible to users. Maintainers and developers perform monthly mergers to ensure that it is stable and secure.

MariaDB is available under the [General Public License](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html), version `2`. Supply of client libraries for [Open Database Connectivity](https://en.wikipedia.org/wiki/Open_Database_Connectivity), Java, and C are available under the [Lesser General Public License](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html), version `2.1` and higher.

MariaDB server exists in two editions; [MariaDB Community Server](https://mariadb.com/docs/features/mariadb-community-server/) and [MariaDB Enterprise Server](https://mariadb.com/docs/features/mariadb-enterprise-server/). 

You can download, modify, and use the MariaDB Community Server for free. MariaDB also allows you to have the client and server programs on different hosts.

### An overview of MySQL
[MySQL](https://www.mysql.com/) was developed as a Relational Database Management System (RDBMS). RDBMS is a model that structures data into columns and rows. A primary key distinctively identifies each row. These keys are "pegs" used by tables to outline a relation to a particular row. A `foreign key` allows a table to relate to another database table.

### Key features of MariaDB framework
- Backward compatibility - MariaDB data files are binary compatible with MySQL. Also, MySQL and MariaDB use similar client protocols.
- MariaDB is an open-source software that is developed and maintained by the community.
- MariaDB is based on MySQL community version and a [Percona Server](https://www.percona.com/software/mysql-database/percona-server).
- MariaDB supports many different SQL statements, rules, procedures, functions, modes, and server variables. It ships with various plugins such as the MariaDB audit plugin.
- It has new storage engines such as [XtraDB](https://mariadb.com/kb/en/about-xtradb/), [PBXT](https://mariadb.com/kb/en/pbxt-storage-engine/), [FederatedX](https://mariadb.com/kb/en/about-federatedx/).
- MariaDB has various new options, extensions, and bug fixes.

### Key features of MySQL Framework
- Scalability and flexibility - MySQL allows multi-threading which makes it scalable. In other words, it can manage a huge amount of data. MySQL's flexibility also supports many applications.
- High performance - MySQL is a fast database management system with numerous benchmark tests. It is more reliable and cheap due to its unique storage engine architecture that supports high performance. It performs efficiently without losing crucial functions. Furthermore, it has various cache memories.
- MySQL is easy to use. You only need basic knowledge of SQL to interact and write code using MySQL.
- MySQL uses a client/server architecture. This architecture supports communication between the server and many clients. Programs can, therefore, save and retrieve a significant amount of data.
- MySQL is secure. It consists of strong data security layers that protect sensitive data from malicious people. MySQL usually encrypts all passwords.

### Key differences between MariaDB and MySQL

| Feature | MariaDB | MySQL |
| --- | --- | --- |
| Storage engines| It contains 12 new engine stores that do not exist in MySQL. | It has fewer storage options than MariaDB. |
| Speed improvements | MariaDB has improved speed. | MySQL is not as fast as MariaDB. |
| Larger, faster connection pool | It has an advanced connection pool that can run and faster and support more than [200,000](https://mariadb.com/kb/en/incompatibilities-and-feature-differences-between-mariadb-103-and-mysql-57/) connections. | It cannot manage 200,000 connections at a time. |
| New extensions/ features | MariaDB has new extensions and features, including [WITH](https://mariadb.com/kb/en/with/), [JSON](https://mariadb.com/kb/en/json-functions/), [KILL](https://mariadb.com/kb/en/mysql_kill/) statements. | The new features found in MariaDB are unavailable in MySQL. |
| Priority code | MySQL uses propriety code in the Enterprise Edition. | MariaDB does not allow access to propriety content. |

### Conclusion
MariaDB can offer better performance with more updates and an open-source feature. MySQL has better security features and a strong following globally. I hope this comparison will allow you to choose the database server that best suits your needs. 

Happy coding!

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)