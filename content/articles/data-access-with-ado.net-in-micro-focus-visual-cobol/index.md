### Introduction
`ADO` is a Microsoft technology that stands for `ActiveX Data Object`. It is a collection of ActiveX controls that give you programmatic access to Microsoft's most recent data access technologies. As the name suggests, it's a wrapper for fundamental database access techniques.

`ADO.NET` is the next step in data access technology advancement. Using the previously mentioned ADO technology, `ADO.NET` extends this by adding XML into a common model that applies to both relational and text-based XML data. First-class languages are supported by the .NET Framework's .NET API, which is managed code. .NET can use the classes that have already been established, rather than having to reinvent the wheel when it comes to data access. It's essentially a set of access and manipulation processes that a developer can utilize to gain access to his or her data. The best part is that you don't need to install anything because it's already included in the .NET Framework.

### Table of contents:
- [Basic ADO Flow](#basic-ado-flow)
- [Preparation](#preparation)
- [Create a Connection](#create-a-connection)
- [Create a Command](#create-a-command)
- [Read the Data](#read-the-data)
- [Housekeeping](#housekeeping)
- [Other Data Providers](#other-data-providers)
- [Wrap-Up](#wrap-up)

### Basic ADO Flow
What do I do now that Microsoft has provided me with this one-of-a-kind library of data access procedures? How can I get started? What do I look for when I am looking for a place to stay? We will start by looking at `SQL Server's namespace`, which governs data access. At the end of this article, we will go over different data providers, but for now, we will stick with SQL Server. System.Data.SqlClient is the namespace to remember if you want to connect to SQL Server.

> Keep this namespace in mind. It's critical!

There are presently 16 classes in the SQLClient namespace. These classes provide a programmatic way to establish connections to databases, verify permissions, manage exceptions, and do other duties related to data access. Let's get started using ADO.

To view data object, follow this basic procedure:
1. Establish a link to the data object.
2. Make a command that the data object will follow.
3. Consider the data that the data object has provided.

To complete the actions listed above, we will need to employ the following classes:
1. System.Data.SqlClient.SqlConnection
2. System.Data.SqlClient.SqlCommand
3. System.Data.SqlClient.SqlDataReader

### Preparation
For this project, I used a safe console application. To begin, we must declare the variables that will be used. We will need to make a variable to hold the data, one to hold the connection attributes, and another to hold the SQL statements we will be issuing. Any exceptions that we encounter when reading from the database are noted. In the working-storage section, all of these items are listed below.

```SQL
working-storage section.
sqlConnection type System.Data.SqlClient.SqlConnection.
sqlDataReader type System.Data.SqlClient.SqlDataReader.
sqlCommand    type System.Data.SqlClient.SqlCommand.
```
These are the essential objects that will allow us to connect to the database engine and use ADO, as well as get information from the database engine about the operations we run there.

A few functional fields will be added next, as well as a few fields for storing data we'll be retrieving from the database. The following are the contents of the completed working-storage section:


```sql
working-storage section.
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

It's worth noting that I can mix and match the types of data definitions. Some variables were defined using typical COBOL syntax for the PIC clause, while others were defined using standard .NET data types. By enabling this option, some of your source code can now be used without worrying about data type conversion. To read data from a table using ADO, we've generated all of the necessary divisions and references. We must now carry out the measures mentioned above.

### Create a Connection
In order to use a database, we must first establish a connection. If you've ever used ODBC with embedded SQL, you'll know that you must first establish the connection in the Control Panel's ODBC administrators panel before issuing the SQL connect query. "EXEC SQL CONNECT TO DATABASE END-EXEC" was comparable to the connect statement.

The connection in ADO is significantly more straightforward. To establish a database connection, the SQLConnection object is needed. One of the advantages of ADO is that we no longer need to configure the connection in the ODBC administration panel, which simplifies the configuration and distribution. Instead, we just construct our database connection string, create a database connection, and call the 'Open' method on the new object. The connection is formed in our example using the following code:

```sql
set sqlConnection to new type System.Data.SqlClient.SqlConnection.
set sqlConnection::ConnectionString to
"Data Source=WIN8VC23\SQL12DEV;Initial Catalog-Northwind;User ID-sa;Password-NFUSER;MultipleActiveResultsSets=True".
invoke sqlConnection::Open().
```

The statement creates a "NEW" SQLConnection object with the name sqlConnection. The connection string attribute is then used to give parameters for the connection. The "Open" method of sqlConnection is then used to establish the connection in the following statement. The connection string is the most difficult component of this operation. We've specified the User ID, password, and database to which we're attempting to connect. Workspace variables that contain the connection string can be created and passed to methods for setting up connections, or they can be created directly in the connection-starting procedure. The connection string can be defined in a variety of ways. Only one example of syntax can be shown. (If you have any issues about the connection strings, talk to your DBA or IT staff, or look them up on MSDN.)

### Create a Command
Now that we've created our connection, we need to inform the database of what we're trying to accomplish. A command structure is used to do this. If you've ever used embedded SQL, you'll know what I'm talking about. Your prior statement would have been "EXEC SQL SELECT * FROM EMPLOYEES END-EXEC." We're going to pull some data from the Employee database and present it in the console window. The following statements are used to establish the command:

```bash
set sqlCmd to "SELECT FirstName, LastName, HomePhone FROM Employees".
set sqlCommand to new type System.Data.SqlClient.SqlCommand(sqlCmd, sqlConnection).
set sqlDataReader to sqlCommand::ExecuteReader.
```

I established a WORKING-STORAGE variable and transferred my Select statement into it for this stage of the procedure. My user's input allows me to build a Select statement. A work can be completed in many ways, and this is just one of them. A SQLCOMMAND instance must be established after the command string has been generated. 

The only parameters necessary for the SQLCOMMAND class to function are the connection object (you must tell it where to execute the command) and the command to execute. The `execute reader` command is the way you'll use to return the data to you after you've instantiated the SQL COMMAND. As a result, you will be provided with a data reader object that you can use to access your data. Use what method to determine if it returns data or not.

### Read the Data
OK! A database connection has been made. The data should have returned when we formed and ran a command against the connection. How can you know if any data has been returned? In addition to the alternatives listed above, here is a quick way to verify. We'll use the 'Read' method to get data from the data reader object. The Read method produces a Boolean result that indicates whether data was read or not. True or B"1" will be the value if there is information. "False" will be returned if no data has been read. DataFound will be set by adding a returning line to our read statement, and then checking if we have any data to pry from the filesystem. 

The Perform statement is used since we don't know how much data we'll have to deal with. The function we'll use is "GetString," and it'll return a string to a variable we've specified in WORKING-STORAGE based on an ordinal location inside the dataset. Always remember that when working with arrays,.NET utilizes offset zero, thus the first field we'll access will be zero, followed by 1 and then 2.

Consider the following code for reading data as an example: 
.
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

We did a 'primer' read of the data before starting the Perform loop, as you can see. This is noteworthy because if we don't have any data to process, we won't run the Perform loop. Perform loop contains three "GetString" calls, which return the employee's first name, last name & home phone number. We keep track of how many records we've read and use the console to display the most recent one. Finally, we check to see if there is any more data to process, and if there is, we either repeat the method or exit the Perform loop.

When you run the sample application, the following data should be displayed:

![output of our project](engineering-education/data-access-with-ado.net-in-micro-focus-visual-cobol/output.png)


Is there anything out of place? Perhaps there's a little something off about this picture.In contrast, there is too much space between the last name and the phone number, while there is just enough between the first and last names. Why? Working in a managed environment and using managed code types provides a number of benefits, one of which is the environment's ability to present information in a much more structured and clear manner. Working-Storage specifies the first name as a string entity, and the last name as a normal COBOL data type of 'PIC X(20)', respectively. Our data is automatically scaled based on how many non-space characters are present when we display it. The amount of characters defined by the COBOL data type is displayed, which in this example is ‘20.' Experiment with the definitions in the section Working-Storage. Change the data type of the last name to ‘string' to see how it affects the display.

### Housekeeping
After that, we processed all of our information. As a result, the Perform loop is terminated. We must close the data reader and the connection before we can terminate the program. On the console, we display a message and wait for the user to quit by pressing the enter key. To show you the screen display, we run the "Accept" statement. The following is the housekeeping code:

```SQL
invoke sqlDataReader::Close().
invoke sqlConnection::Close().
display "Press enter to exit...".
accept junk from console.

goback.
```

### Other Data Providers
This article demonstrated how to use ADO for SQL Server to access data. Oracle and IBM have both given managed namespaces for their respective database environments, allowing for similar capability.

You'll need `ODP .NET`, or Oracle Data Provider for .NET, if you're dealing with Oracle. Here's where you can learn more about ODP .NET. Oracle.DataAccess.The client is the namespace you'll be working with. Go to the Oracle manual for further information.

The [IBM Data Server Provider for.NET](https://www.ibm.com/docs/en/db2/10.5?topic=net-provider-support-microsoft-entity-framework) must be installed for IBM. If you're using IBM DB2, you'll be dealing with IBM.Data.DB2, and if you're using Informix, you'll be working with IBM.Data.Informix.

### Wrap-Up
Data access in the Microsoft .NET environment can assist save time, automate operations, and simply show data. The steps provided in this article should assist you in comprehending the processing requirements. This article demonstrated how to develop ADO-based software by hand. Additionally, Micro Focus has provided an ADO Connection Editor and an OpenESQL utility for developing SQL-enabled source code as additional support.

### Conclusion
In this article, we have learned how to access data with ADO.NET In Micro Focus Visual COBOL. We also have learned about the basic ADO Flow of data, the Preparation, how to create a Connection, creating a Command, read the Data, understood what housekeeping is, knowing other data providers, and finally understand what Wrap-Up is.
