---
layout: engineering-education
status: publish
published: true
url: /engineering-education/deciding-between-mariadb-and-mysql/
title: Choosing Between MariaDB and MySQL
description: This tutorial outlines the key differences and similarities of MariaDB and MySQL. It also discusses the features of these database frameworks.  
author: 
date: 2021-03-17T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/deciding-between-mariadb-and-mysql/hero.jpg
    alt: Choosing between MariaDB and MySQL
---
MariaDB framework is among the most popular database servers in the world. [Google Inc.](https://about.google/), [WordPress](https://wordpress.com/), and [Wikipedia](https://www.wikipedia.org/) are some of the users of MariaDB. It powers numerous websites and supports the banking sector. Since MariaDB was forked from MySQL, they share similar components.
<!--more-->
MariaDB, an open-source software, is a relational database that provides an SQL interface for data access. The database server is popular because it is robust, scalable, and fast. Its vast ecosystem of plugins, storage engines, amongst other tools, makes it unique for numerous use cases.

### Goal
This article discusses MariaDB, MySQL, and their key features. It also compares the two to help you choose the best database server that suits your needs.

### An overview of MariaDB
[MariaDB](https://mariadb.org/) framework is a default type of MySQL database system which is common in most Linux distributions. It is also supported by other operating systems including macOS and Windows. MySQL is mostly used as a database replacement (or as a database option) in the LEMP ([Linux, Nginx, MariaDB, PHP](https://www.digitalocean.com/community/tutorials/what-is-lemp)) and LAMP ([Linux, Apache, MariaDB, PHP](https://en.wikipedia.org/wiki/LAMP_(software_bundle)#)) stack.

[Oracle Corporation](https://www.oracle.com/corporate/) acquired MySQL in 2009. MariaDB was introduced later as concerns were raised about MySQL being open-source and freely accessible to users. Maintainers and developers perform monthly mergers to ensure that it is stable and secure.

MariaDB is available under the [General Public License](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html), version `2`. Supply of client libraries for [Open Database Connectivity](https://en.wikipedia.org/wiki/Open_Database_Connectivity), Java, and C are available under the [Lesser General Public License](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.en.html), version `2.1` and higher.

MariaDB server exists in two editions; [MariaDB Community Server](https://mariadb.com/docs/features/mariadb-community-server/) and [MariaDB Enterprise Server](https://mariadb.com/docs/features/mariadb-enterprise-server/). You can download, modify and use the MariaDB Community Server for free. MariaDB uses a server/client model with a program that files needs from client programs. It is possible to have the client and server programs on different hosts.

### An overview of MySQL
[MySQL](https://www.mysql.com/) was developed as a Relational Database Management System (RDBMS). RDBMS is a model that structures data into columns and rows. A primary key distinctively identifies each row for the use of SQL jargon. These keys are pegs used by tables to outline a relation to a particular row. A primary key column in one table refers to a `foreign key` in a relatable database table.

### Key features of MariaDB framework
- Backward compatibility - MariaDB data files are binary compatible with the MySQL version. Also, MySQL and MariaDB client protocols are compatible.
- Open-source software - MariaDB is open-source. It is developed and maintained by the community.
- It is based on MySQL community Version and a [Percona Server](https://www.percona.com/software/mysql-database/percona-server).
- MariaDB supports many different SQL statements, rules, procedures, functions, user-defined functions, SQL modes, and server variables. It ships with various plugins like the MariaDB audit plugin.
- It has new storage engines such as [XtraDB](https://mariadb.com/kb/en/about-xtradb/), [PBXT](https://mariadb.com/kb/en/pbxt-storage-engine/), [FederatedX](https://mariadb.com/kb/en/about-federatedx/).
- MariaDB has various new options, extensions, bug fixes extensions, and storage engines.

### Key features of MySQL Framework
- Scalability and flexibility - The framework allows multi-threading, making it scalable. It can manage any amount of data. Its flexibility supports many applications.
- High performance - MySQL is a fast database management system with numerous benchmark tests. It is more reliable and cheap due to its unique storage engine architecture that provides high performance, unlike other databases. It performs efficiently without losing crucial functions of the software. It has various cache memories.
- Ease of use - MySQL is easy to use. You only need basic knowledge of SQL to interact and write codes using MySQL.
- It has client/server architecture - The framework follows a client/server architecture. In such architectures, there is a database server and many clients who communicate with the server. Application programs communicate with the server and save changes and query data.
- It is secure - MySQL consists of strong data security that protects sensitive data from malicious people. MySQL encrypts all passwords.

### Key differences between MariaDB and MySQL

| Feature | MariaDB | MySQL |
| --- | --- | --- |
| Storage engines| It contains 12 new engine stores that do not exist in MySQL. | It has fewer storage options than MariaDB. |
| Speed improvements | MariaDB has improved speed. | MySQL is not as fast as MariaDB. |
| Larger, faster connection pool | It has an advanced connection pool that can run and faster and support more than [200,000](https://mariadb.com/kb/en/incompatibilities-and-feature-differences-between-mariadb-103-and-mysql-57/) connections. | It cannot manage 200,000 connections at a time. |
| New extensions/ features | MariaDB has new extensions and features, including [WITH](https://mariadb.com/kb/en/with/), [JSON](https://mariadb.com/kb/en/json-functions/), [KILL](https://mariadb.com/kb/en/mysql_kill/) statements. | The new features found in MariaDB do not exist in MySQL. |
| Priority code | MySQL uses propriety code in the Enterprise Edition. | MariaDB does not allow access to propriety content as it is a closed source. |

### Conclusion
MariaDB offers better performance with more updates and an open-source feature. On the other hand, MySQL has better security features and a strong following globally. Therefore, this comparison allows you to choose which database server suits your needs. 

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)