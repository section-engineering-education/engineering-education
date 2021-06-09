---
layout: engineering-education
status: publish
published: true
url: /visual-database-design-with-mysql-workbench/
title: Visual Database Design with MySQL Workbench
description: This article will be an introduction to visual database design. This tutorial will cover database design and modeling with MySQL Workbench. MySQL is used by database administrators, system developers, and database developers.
author: benson-kariuki
date: 2021-01-18T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/visual-database-design-with-mysql-workbench/hero.jpg
    alt: Visual Database Design with MySQL Workbench Image
---
MySQL Workbench is a graphical visual database design tool with multiple functionalities. This tutorial will cover database design and modeling with MySQL Workbench.
<!--more-->
### Prerequisites
This article is suitable for beginner to intermediate MySQL Workbench users. It requires no prior knowledge of MySQL Workbench. 

However, knowledge in [relational databases](http://www.geeksengine.com/database/design/) and database design may be required. To get started with the MySQL database, check the [MySQL Tutorial]( https://www.mysqltutorial.org/) website.
 
### Introduction to MySQL Workbench
There are two editions of MySQL Workbench: the community edition and the commercial edition. The community edition is open source. Both editions are available for three major platforms; MS Windows, macOS, and Linux. The commercial edition comes with more functionalities at a cost. 

Some of the extra functionalities available in the commercial edition are:
-   [MySQL Enterprise backup](https://www.mysql.com/products/enterprise/backup.html)
-   [MySQL Firewall](https://www.mysql.com/products/enterprise/firewall.html)
-   [MySQL Audit](https://www.mysql.com/products/enterprise/audit.html)

MySQL Workbench has five main functions:

#### Database design (data modeling)
This involves creating simple to complex entity-relationship (ER) models. Reverse engineering creates a database from ER models. Forward engineering creates an ER model from a live database.

#### Developing SQL
MySQL Workbench has a built-in SQL editor with syntax highlighting and auto-complete. It is used to interact with the MySQL Server.

#### Administration
Some of the MySQL Workbench database administrative functions are:
- Backup
- Recovery
- Audit
- Monitoring server performance
- Checking database health
- User management

MySQL Workbench has a visual performance dashboard. The visual performance dashboard enables database administrators to view key performance indicators. Below is a screenshot of the MySQL Workbench visual performance dashboard.

![MySQL Workbench performance dashboard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-performance-dashboard.jpg)

[Image source](https://www.mysql.com/common/images/products/mysql_wb_performance_dashboard_win.png)

#### Data migration
MySQL Workbench is used to migrate databases from other relational database management systems (RDBMS). Some of the supported RDBMS are PostgreSQL, MS SQL Server, SQLite, MS Access, Sybase, and Sybase SQL Anywhere.

#### MySQL enterprise support
MySQL Workbench enterprise edition supports [MySQL enterprise products](https://dev.mysql.com/doc/index-enterprise.html).

In this tutorial, the focus will be on database design.

### Setting up MySQL Workbench
Workbench is one of the MySQL products. Use MySQL Installer to manage MySQL products installations. Find the list of MySQL Workbench supported platforms on [MySQL official website](https://www.mysql.com/support/supportedplatforms/workbench.html). For the MySQL Workbench hardware requirements, check the image below.

![MySQL Workbench hardware requirements](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-hw-requirements.jpg)

[Image source](https://www.mysql.com/support/supportedplatforms/workbench.html)

#### Installing MySQL Workbench on Windows
Download MySQL Installer from the [official website](https://dev.mysql.com/downloads/installer/). Install MySQL Workbench using the downloaded installer. For this installation, I recommend the default configurations, as shown in the screenshot below.

![MySQL installer Windows](/engineering-education/visual-database-design-with-mysql-workbench/mysql-installer.jpg)

The `Developer Default` setup type comes with MySQL Workbench and other developer tools. 

You can find more detailed installation guidelines for MySQL Workbench on [MySQL Workbench Manual](https://dev.mysql.com/doc/workbench/en/wb-installing.html).

#### Verifying MySQL Workbench installation
Launch MySQL Workbench. 

You can do this from the installation wizard.
- Linux: Launch by typing the command `mysql-workbench`. Alternatively, navigate to `Activities > MySQL WorkBench`.
- macOS: Navigate to `Applications > MySQL Workbench`.
- Windows: Navigate to `Start > Programs > MySQL > MySQL Workbench`.

Make sure there is a connection to the MySQL Server local instance, as shown in the screenshot below. If there is no connection, click the `+` icon to create a new connection, as highlighted in the screenshot below.

![MySQL Workbench first time launch Windows](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-first-time-launch.jpg)

Provide the connection details.

![MySQL Workbench creating new connection](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-create-new-connection.jpg)

The created connection will be displayed, as shown in the screenshot below.

![MySQL Workbench connection](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-connections.jpg)

### Database design with MySQL Workbench
This section will create a new ER model and then translate it into a physical MySQL database. On MySQL Workbench, navigate to `File` > `New Model` as shown below.

![creating a new EER model](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-create-new-model.jpg)

Save the model. Double click `MySQL Schema` and change the name from `mydb` to `booksdb`. Click the `Add Diagram` icon to create a new EER diagram. Refer to the screenshot below.

![MySQL Workbench schema rename](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-rename-schema.jpg)

After adding a new diagram, a new window will be opened, as in the screenshot below.

![MySQL Workbench interface](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-modeling-interface.jpg)

#### Scenario
In this tutorial, we will model and create a database that will be used to keep book details. The database should store books with author and publisher details. We will skip the [database normalization process](https://www.studytonight.com/dbms/database-normalization.php) details. 

The final database will have three main entities with attributes, as shown below:
1. **Book:** id, title, ISBN, publisher, total_pages, publication_year, author.
2. **Author:** id, first_name, last_name.
3. **Publisher:** id, name.

We will use the information in the tables below to design the ER model. All the column names have been defined. Primary keys, foreign keys, and datatypes are also outlined.

**Book table**

column name | data type | can be null | index type | auto_increment
--- | --- | --- | --- | ---
id | integer | no | primary key | yes
isbn | varchar(45) | no | unique
publisher | integer | no |foreign key
author | integer | no |foreign key
total_pages | integer | no
publication_year | year(4) | no
title | varchar(255) | no

**Author table**

column name | data type | can be null | index type | auto_increment
--- | --- | --- | --- | ---
id | integer | no | primary key | yes
first_name | varchar(45)| no
last_name | varchar(45)| no

**Publisher table**

column name | data type | can be null | index type | auto_increment
--- | --- | --- | --- | ---
id | integer| no | primary key | yes
name | varchar(45) |no|

The relationships between the entities are as below:
- The relationship between the book and the author is many-to-many. An author can have multiple publications. A book can also have multiple authors. This type of relationship requires an extra table called a [bridge table](https://www.ibm.com/support/knowledgecenter/SSEP7J_11.1.0/com.ibm.swg.ba.cognos.ug_fm.doc/c_dyn_query_bridge_tables.html). MySQL Workbench automatically creates a bridge table when we add a many-to-many relationship.
- The relationship between the book and the publisher is one-to-many. A book can only have one publisher. A publisher can publish multiple books. 

Using MySQL Workbench, we will design an enhanced entity-relationship (EER) diagram. MySQL Workbench allows us to create tables, edit the attributes, and create relationships between the tables.

#### The visual design interface
The diagram below shows a MySQL Workbench design window screenshot. The window has different panels highlighted in different colors.

![MySQL Workbench interface](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-visual-design-window.jpg)

##### The vertical toolbar panel
The vertical toolbar has different tools used in creating EER diagrams. The screenshot below shows all the tools. Hovering the mouse pointer on each tool will show the name or the function of each tool.

![MySQL Workbench vertical toolbar](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-vertical-toolbar.jpg)

There are six tools used to create different types of relationships in MySQL Workbench. `1:1` is read as one-to-one; `1:n` is read as one-to-many, `n:m` is read as many-to-many.

#### Add tables
We are going to add three tables to the EER model. The animation below shows the process of adding a table and the columns.

![MySQL Workbench creating a table animation](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-creating-table.gif)

To add a table, follow these steps:
- Select the table tool on the vertical tools panel, then click anywhere on the EER diagram canvas. This creates a table with no columns.
- Double click the table created to open the table properties window.
- On the table properties window, change the table name.
- Add columns to the table. To add new columns, click on the last blank column. Edit the column name and select the appropriate data type for each column.
- Please do not add the columns described as foreign keys. MySQL Workbench has an easier way of adding them by creating relationships, and the foreign keys are added automatically.
- Select all the column properties such as primary key, not null, unique, and autoincrement.
- Repeat the process for all the tables.

Your EER diagram should look as shown below.

![MySQL Workbench EER](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-incomplete-eer.jpg)

#### Add relationships
We will add two different relationships to the EER diagram.

##### One-to-many relationship
There is a one-to-many relationship between the book and the publisher. We will use the relationship tools to add relationships. To create a one-to-many relationship, make sure that one of the tables has a primary key. 

Select the appropriate relationship tool. In this case, we are going to use the one-to-many non-identifying relationship. Click the table on the "many" side. In this case, it is the book table. 

Click the table containing the referenced key. In this case, it is the publisher table. A foreign key is created on the book table with the default name as `fk_book_has_author_book`. To change the foreign key properties, double click the connection line to open the relationship editor.

##### Many-to-many relationship
There is a many-to-many relationship between the book and the author. Select the many-to-many relationship tool. Click on the book table, then click on the author table as shown in the animation below. A bridge table with the name `book_has_author` is generated automatically.

![MySQL Workbench creating relationships animation](/engineering-education/visual-database-design-with-mysql-workbench/mysql-workbench-creating-relationships.gif)

After creating the relationships, the EER diagram will be as shown in the screenshot below.

![MySQL Workbench database model](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-final-book-db-model.jpg)

You can find the EER diagram workbench file created in this tutorial on [Github](https://github.com/Tsanguu/MySQL-Workbench-database-design-tutorial).

### Forward engineering with MySQL Workbench
The visual database model created can be transformed into a physical database. This process is known as forward engineering. SQL code is generated and executed on a target MySQL Server. This is easier than writing the code manually. 

#### Step 1

To launch forward engineering wizard, Navigate to `Databases` > `Forward Engineer`. 

![MySQL Workbench forward engineer](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-forward-engineering-step-1.jpg)

#### Step 2

Create a new connection to MySQL Server or select an existing one, as shown in the screenshot below. 

Click `NEXT`.

![MySQL Workbench forward engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-forward-engineering-step-2-connecting-to-dbms.jpg)

#### Step 3

The wizard gives us SQL export options. For this exercise, use the default selected options.

![MySQL Workbench forward engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-forward-engineering-step-3-set-options.jpg)

#### Step 4

Select the objects you would like to include in the EER diagram. These will include tables, views, routines, users, and triggers. In this exercise, we only have tables. 

Make sure the option to import 4 table objects is selected, then click `NEXT`.

![MySQL Workbench forward engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-forward-engineering-step-4-select-objects.jpg)

#### Step 5

In this step, we are provided with the generated SQL script. Find the SQL file generated in this tutorial on [Github](https://github.com/Tsanguu/MySQL-Workbench-database-design-tutorial).

![MySQL Workbench forward engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-forward-engineering-step-5-review-sql.jpg)

#### Step 6

This is the final step. Click finish to commit. The generated SQL file is used to create a physical database in the connected MySQL Server.

![MySQL Workbench forward engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-forward-engineering-step-6-progress.jpg)

To view the database created on MySQL Workbench, navigate to `Database` > `Connect to Database`. Choose an existing connection to connect to MySQL Server or create a new one. The database created will be as shown in the screenshot below.

![MySQL Workbench databases](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-databases.jpg)

### Reverse engineering with MySQL Workbench
Reverse engineering enables us to have a better view of an existing database. A physical database is converted to an EER diagram. We will be reverse engineering the database we created earlier. Reverse engineering can be done while using a MySQL Create Script or by using a live database. 

In this tutorial, we will use the live database we created in the [forward engineering](#forward-engineering-with-mysql-workbench
) section. 

Follow these steps:

#### Step 1

Navigate to `Database` > `Reverse Engineer`.

![MySQL Workbench reverse engineer](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-step-1.jpg)

#### Step 2

Create a new connection to the MySQL Server or select an existing one, as shown in the screenshot below. 

Click `NEXT`.

![MySQL Workbench reverse engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-step-2-connecting-to-dbms.jpg)

#### Step 3

Review the information displayed and make sure that the connection was successful, then click `NEXT`.

![MySQL Workbench reverse engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-step-3-connecting-to-dbms-fetch-info.jpg)

#### Step 4

Select the schema you would like to reverse engineer. In this case, select `booksdb`, then click `NEXT`.

![MySQL Workbench reverse engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-step-4-select-schema.jpg)

#### Step 5

The results of the tasks carried out are displayed in the wizard below. Review the results, then click `NEXT`.

![MySQL Workbench reverse engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-step-5-retrieve.jpg)

#### Step 6

We are prompted to select the objects to reverse engineer. By default, all the available objects are selected. Leave the default options, then click `NEXT`.

![MySQL Workbench reverse engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-step-6-select-objects.jpg)

#### Step 7

The wizard shows the reverse engineering progress. In the screenshot below, the process was successful. In case of an error, check error details by clicking `Show Logs`. 

Click `NEXT`.

![MySQL Workbench reverse engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-step-7-progress.jpg)

#### Step 8

This step shows the summary of the objects generated. In this case, we have four table objects. 

Click `Finish`.

![MySQL Workbench reverse engineer wizard](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-step-8-results.jpg)

#### Output

The EER diagram below is generated. You can save it for later use.

![MySQL Workbench EER Diagram](/engineering-education/visual-database-design-with-mysql-workbench/mysql-wb-reverse-engineering-eer-output.jpg)

### Conclusion
MySQL Workbench is such a useful tool. It can be used by MySQL database administrators, system developers, and database developers. You can create a database from an ER model without writing MySQL statements. At first, the tool may seem complex to use, but with time it gets easier. Practice makes perfect.

Happy Coding!
