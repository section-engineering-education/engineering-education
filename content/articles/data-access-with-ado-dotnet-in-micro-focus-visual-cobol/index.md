### Introduction
Micro Focus Visual COBOL is a modern development package that enables developers to maintain, create, and upgrade their systems to streamline application development and delivery. Visual COBOL is a multi-language Integrated Development Environment (IDE).

`ADO` is a Microsoft technology that stands for `ActiveX Data Object`. It is a collection of [ActiveX](https://en.wikipedia.org/wiki/ActiveX) controls that give you programmatic access to Microsoft's most recent data access technologies.

In simple words, ADO acts as a middleware between the programming language and the database. The developers write programs to access the data, without knowing how the database is implemented.

`ADO.NET` is a collection of programming elements that allow programmers to retrieve data and data services from a database.  

Typically, programmers access and alter data in relational database systems (RDBMS), but they can also retrieve data from non-relational data sources.

First-class languages are supported by the `.NET` framework's API. `.NET` can access the existing classes using API, rather than having to reinvent the wheel for accessing the data.

It's essentially a set of access and manipulation processes that a developer can utilize to gain access to his or her data.

The best part is that you don't need to install anything, because it's already included in the `.NET` Framework.

### Prerequisite
- Install [Visual Studio Code](https://code.visualstudio.com/).
- Add [Microfocus COBOL extension](https://marketplace.visualstudio.com/items?itemName=Micro-Focus-AMC.mfcobol) to the Visual Studio code editor.
- Have some background information on database management.

### Table of contents
- [Objective](#objective)
- [What is data object?](#what-is-a-data-object)
- [Basic ADO flow](#basic-ado-flow)
- [Preparation](#preparation)
- [Create a Connection](#create-a-connection)
- [Create a Command](#create-a-command)
- [Read the Data](#read-the-data)
- [Housekeeping](#housekeeping)
- [Other Data Providers](#other-data-providers)
- [Wrap-Up](#wrap-up)

### Objective
By the end of this tutorial, the reader will have understood:
- How to establish a link to the data objects in ADO.NET.
- Create commands that will help to access the data objects using Micro Focus Visual Studio.

### What is a data object
A data object is indeed a storage area that holds a value or a set of values. Each value could be accessed by using an object's identifier like a variable.

Furthermore, each object has its data type.

For example:
- Products, sales, and customer are examples of data objects of a sales database.
- Patients may be objects of a medical database.
- Students, professors, and courses may be objects of an University database.

### Basic ADO flow
We will start by looking what `SQL Server's namespace` are, that governs data access.

At the end of this article, we will go over different data providers.

A namespace is a set of symbols often used to distinguish and relate objects of different types.

As a result of a namespace, every particular collection of objects will have unique names, allowing them to be identified easily.

> `System.Data.SqlClient` is the namespace to remember if you want to connect to SQL Server. The `.NET` data provider for SQL server is located in this namespace. 

To connect to SQL servers in `.NET` framework, you will start by writing the namespace:

```sql
using System.Data;
using System.Data.SqlClient;
```

There are presently 16 classes in the SQLClient namespace. These classes provide a programmatic way to establish connections to databases, verify permissions, manage exceptions, and do other duties related to data access.

Let's get started using ADO.

To view data object, follow this basic procedure:
1. Establish a link to the data object.
2. Create a command for the data object to act upon.
3. Read the data returned by the data object.

To complete the actions listed above, we will need to import the following classes:
1. System.Data.SqlClient.SqlConnection
2. System.Data.SqlClient.SqlCommand
3. System.Data.SqlClient.SqlDataReader

### Preparation
For this tutorial, we will use a safe console application.

Microsoft's data access technology (ADO.NET application) is one of safe console application. It's a part of the `.NET` framework that connects the `.NET` application to various data sources.

It has access to various basic data streams - standard input, standard output, and standard error.

To begin, we declare the variables and initialize them. One holds the connection attributes, and another holds the SQL statements.

In the working-storage area, you'll find record and data description entries for all the data items (commonly referred as data item description entries).

> According to [IBM](https://www.ibm.com/docs/en/cobol-zos/4.2?topic=overview-working-storage-section), working-storage section describes data records that are not part of data files but are developed and processed by a program or method. It also describes data items whose values are assigned in the source program or method and do not change during execution of the object program.

The working-storage section is a work ground where all the commands are written on as shown in the figure below:

![working storage section](engineering-education/data-access-with-ado-dotnet-in-microfocus-visual-cobol-storage-section.png)

```SQL
sqlConnection type System.Data.SqlClient.SqlConnection.
sqlDataReader type System.Data.SqlClient.SqlDataReader.
sqlCommand    type System.Data.SqlClient.SqlCommand.
```

These are the essential objects that will allow us to connect to the database engine, and fetch information about the operations.

Apart from the existing functional fields, we add fields for storing data.

The following are the contents of the completed working-storage section:

```sql
sqlConnection type System.Data.SqlClient.SqlConnection.
sqlDataReader type System.Data.SqlClient.SqlDataReader.
sqlCommand    type System.Data.SqlClient.SqlCommand.

sqlCmd             string.
dataFound          type System.Boolean.
recordsRead        pic 9(06)  value zeros.
LastName           pic x(20)  value spaces.
FirstName          string.
HomePhone          pic x(24)  value spaces.    
junk               pic x(01)  value spaces.
```

From the code above:
- We declare variables that hold:
  - the data in `sqlDataReader type System.Data.SqlClient.SqlDataReader`,
  - the connection attributes in `sqlConnection type System.Data.SqlClient.SqlConnection`, and
  - the SQL commands in `sqlCommand type System.Data.SqlClient.SqlCommand`.
- The command `dataFound type system.Boolean` is used for invoking the `sqlDataReader` to return `true` or `false`.
- The `recordsRead pic x(20) value spaces` customizes the length of the data to be read.
- The next three lines of code, we declare the variables ` FirstName, LastName and HomePhone` for customizing the PIC clause.
- The last line of code ends the declaration process by prompting that no other junk file should exceed the limit of declared variables.

> It's worth noting that we can mix and match the types of data definitions. Some variables were defined using typical COBOL syntax for the PIC clause, while others were defined using standard `.NET` data types.

By enabling this option, we need worry about the data type conversion.

> In many programming systems, a PIC clause is used to allow the user to customize how text is printed or presented. It describes the general characteristics and editing requirements of an elementary item

To alter a PIC clause, the user must type characters with various text combinations, such as adding letters or formatting a section of text.

### Create a connection
To use a database, we must first establish a connection.

When working with ODBC - embedded SQL, we must first establish the connection in the ODBC administrator panel before issuing the SQL connect query.

To establish ODBC connection, click `Administrative Tools` in the `Control Panel`, then click `Data Sources` under `Administrative Tools` (ODBC).

Setting up an ODBC connection is complicated.

In ADO, the connection is significantly more straightforward.

One of the key advantage of ADO is that, we no longer need to configure the connection in the ODBC administration panel.

Instead, we just construct the database connection string, create a database connection, and call the `Open` method for the new object.

In our example, the connection can be setup as shown in the following code:

```sql
set sqlConnection to new type System.Data.SqlClient.SqlConnection.
set sqlConnection::ConnectionString to
"Data Source=WIN8VC23\SQL12DEV;Initial Catalog-Northwind;User ID-sa;Password-NFUSER;MultipleActiveResultsSets=True".
invoke sqlConnection::Open().
```

From the code above:
- We create a new SQLConnection object with the name `sqlConnection`.
- Then, the connection string attribute is set up as the parameters for the connection.
- The `Open` method of `sqlConnection` is then used to establish the connection.

In the connection string, we've specified the User ID, password, and database that we are attempting to connect.

Workspace variables that contain the connection string can be created and passed to methods for setting up connections.

### Create a command
Now that we've created our connection, we need to inform the database of what we're trying to accomplish.

Earlier, we would have used `EXEC SQL SELECT * FROM EMPLOYEES END-EXEC` to fetch data from the Employees database.

The Employee database contains the variables we had declared earlier in the `Preparation heading`.

To understand how to create a SQL-server database [click here](https://www.wikihow.com/Create-a-SQL-Server-Database).

Now, with the knowledge learned, create a simple database `Employee database` with the fields `FirstName, LastName, HomePhone`.

We'll be using this database in our tutorial.

```bash
set sqlCmd to "SELECT FirstName, LastName, HomePhone FROM Employees".
set sqlCommand to new type System.Data.SqlClient.SqlCommand(sqlCmd, sqlConnection).
set sqlDataReader to sqlCommand::ExecuteReader.
```

The code above prompts the connection to only fetch the details related to employees. Then, the second line specifies the connection to be made to the `System.Data.SqlClient.SqlCommand` namespace.

We created a working-storage variable to hold the data from the `Select` statement. An SQL command instance `sqlCommand` must be established only after the command string has been generated. 

The only parameter necessary for a SQL command class is a connection object. You must specify where to execute the command and the command to execute.

The `ExecuteReader` command would be used to execute and return the data.

As a result, you will be provided with a data reader object that could be used to access the data.

### Read the data
A database connection has been made.

The data should have returned when we formed and ran a command against the connection. How can you know if any data has been returned? In addition to the alternatives listed above, here is a quick way to verify. We'll use the 'Read' method to get data from the data reader object. The Read method produces a Boolean result that indicates whether data was read or not. True will be the value if there is information. "False" will be returned if no data has been read. DataFound will be set by adding a returning line to our read statement, and then checking if we have any data to pry from the filesystem. 

The Perform statement is used since we don't know how much data we'll have to deal with. The function we'll use is "GetString," and it'll return a string to a variable we've specified in WORKING-STORAGE based on an ordinal location inside the dataset. Always remember that when working with arrays,.NET utilizes offset zero, thus the first field we'll access will be zero, followed by 1 and then 2.

Consider the following code for reading data as an example: 

```sql
set dataFound to true.
move zero to recordsRead.
invoke sqlDataReader::Read returning dataFound.
perform with test before until dataFound not equal to true 
    invoke sqlDataReader::GetString(0) returning FirstName
    invoke sqlDataReader::GetString(1) returning LastName
    invoke sqlDataReader::GetString(2) returning HomePhone
    add +1 to recordsRead
    display "Record: ", recordsRead, "Name: ", FirstName, " ",LastName," ", HomePhone
    invoke sqlDataReader::Read returning dataFound
end-perform.
```

From the command above, we invoke the data reader to read all the data values of the variables we had earlier declared in the `Preparation` heading. For example, the reader reads the strings(FirstName, LastName, and HomePhone) and then display their record using the code `display "record: "`. For every string the reader reads it returns the data found sequence loop until this command returns data found is not true. 

We did a 'primer' read of the data before starting the Perform loop, as you can see. This is noteworthy because if we don't have any data to process, we won't run the Perform loop. Perform loop contains three `GetString` calls, which return the employee's first name, last name & home phone number. We keep track of how many records we've read and use the console to display the most recent one. Finally, we check to see if there is any more data to process, and if there is, we either repeat the method or exit the Perform loop.

When you run the sample application, the following data should be displayed:

![output of our project](engineering-education/data-access-with-ado-dotnet-in-microfocus-visual-cobol/output.png)


Is there anything out of place? Perhaps there's a little something off about this picture. In contrast, there is too much space between the last name and the phone number, while there is just enough between the first and last names. Why? Working in a managed environment and using managed code types provides a number of benefits, one of which is the environment's ability to present information in a much more structured and clear manner. Working-Storage specifies the first name as a string entity, and the last name as a normal COBOL data type of 'PIC X(20)', respectively. Our data is automatically scaled based on how many non-space characters are present when we display it. The amount of characters defined by the COBOL data type is displayed, which in this example is ‘20.' Experiment with the definitions in the section Working-Storage. Change the data type of the last name to ‘string' to see how it affects the display.

### Housekeeping
After that, we processed all of our information. As a result, the Perform loop is terminated. We must close the data reader and the connection before we can terminate the program. On the console, we display a message and wait for the user to quit by pressing the enter key. To show you the screen display, we run the `Accept` statement. The following is the housekeeping code:

```SQL
invoke sqlDataReader::Close().
invoke sqlConnection::Close().
display "Press enter to exit...".
accept junk from console.

goback.
```
The first line in the above code closes the SQL data reader we initiated in the `Read data` heading, the second closes the SQL database connection we had earlier created in the `create connection` heading, the third line of code shows the dialog display to prompt the user to hit the enter key to implement the two lines of commands above. 

### Other Data Providers
This article demonstrated how to use ADO for SQL Server to access data. Oracle and IBM have both given managed namespaces for their respective database environments, allowing for similar capability.

You'll need `ODP .NET`, or Oracle Data Provider for .NET, if you're dealing with Oracle. Here's where you can learn more about ODP . NET. Oracle.DataAccess.The client is the namespace you'll be working with. Go to the Oracle manual for further information.

The [IBM Data Server Provider for.NET](https://www.ibm.com/docs/en/db2/10.5?topic=net-provider-support-microsoft-entity-framework) must be installed for IBM. If you're using IBM DB2, you'll be dealing with IBM.Data.DB2, and if you're using Informix, you'll be working with IBM.Data.Informix.

### Wrap-Up
Data access in the Microsoft .NET environment can assist save time, automate operations, and simply show data. The steps provided in this article should assist you in comprehending the processing requirements. This article demonstrated how to develop ADO-based software by hand. Additionally, Micro Focus has provided an ADO Connection Editor and an OpenESQL utility for developing SQL-enabled source code as additional support.

### Conclusion
In this article, we have learned how to access data with ADO.NET In Micro Focus Visual COBOL. We also have learned about the basic ADO Flow of data, the Preparation, how to create a Connection, creating a Command, read the Data, understood what housekeeping is, knowing other data providers, and finally understand what Wrap-Up is.

### Further reading
- [Function to Create an ADO Connection](https://community.microfocus.com/cobol/visualcobol/f/forumid-18/348985/function-to-create-an-ado-connection)
- [Oracle Data Access Connectivity (ODAC) 64bit Connection issue when using ADO.Net Connection Editor](https://community.microfocus.com/cobol/visualcobol/f/forumid-18/355802/oracle-data-access-connectivity-odac-64bit-connection-issue-when-using-ado-net-connection-editor)
- [Database Access](https://www.microfocus.com/documentation/visual-cobol/VC231/VS2012/GUID-62A76ED2-5851-47BD-A6EC-CA6830A3C745.html)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)