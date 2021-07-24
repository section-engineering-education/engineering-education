---
layout: engineering-education
status: publish
published: true
url: /transaction-management-in database/
title: Transaction management in database
description: 
author: paul-mwangi
date: 2021-07-08T00:00:00-07:41
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/transaction-management-in database/hero.jpg
    alt: Transaction management in database
---
### Introduction
A transaction is a logical unit of work performed on a database. They are logically ordered units of work completed by the end-user or an application. A transaction is made up of one or more database modifications. Creating, updating, or deleting a record from a table, for example. To preserve data integrity and address database issues, it's critical to keep track of these transactions. We can bundle SQL queries together and run them as a single transaction


### Prerequisities
Before learning this tutorial you need to have basics in SQL(structured query language) and understand how to create a database which we will be working from and performing our transactions against.

### Transaction states 
There are various database transaction states as follows.
1. Active state- this is the state in which a transaction execution process begins. Operations such as read or write are performed on the database.
2. Partially committed- means that a transaction is only partially committed once it has been completed.
3. Committed stage- After a transaction execution is completed successfully the transaction is in committed state.All changes made to the database are permanently documented.
4. Failed state- If a transaction is aborted while in the active state, or if one of the checks fails, the transaction is in the failed state.
5. Terminated state- This state happens once the transaction leaving the system cannot be restarted once again.

### Transaction properties 
There are four main properties of a transaction represented in the acronym ACID referring to; Atomicity, Consistency, Isolation, and Durability.

1. Atomicity- A transaction cannot be subdivided and can only be executed as a whole and is treated as an atomic unit. It is either all the operations are carried out or none are performed.
2. Consistency- After any transaction is carried out in a database it should remain consistent. No transaction should affect the data residing in the database adversely.
3. Isolation- When several transactions need to be conducted in a database at the same time, each transaction is treated as if it were a single transaction. As a result, the completion of a single transaction should have no bearing on the completion of additional transactions.
4. Durability- From durable, all changes made must be permanent such that once the transaction is committed the effects of the transaction cannot be reversed. In case of system failure or unexpected shutdown and changes made by a complete transaction are not written to the disk, during restart the changes should be remembered and restored.

### Transactional control commands
The Data Manipulation Language (DML) instructions are utilized with the transactional commands such as INSERT, UPDATE, and DELETE. These commands cannot be used with the Data Definition Language because they are automatically committed to the database. Below are the transaction commands; 

1. COMMIT- Saves the changes done against the database.
2. ROLLBACK- Redoes the changes done before being commited to the database.
3. SAVEPOINT-saves a point in a transaction on which to carry out a rollback.
4. SET TRANSACTION- Gives a name to a transaction.

### COMMIT command
The COMMIT command saves changes made to a database as part of a transaction. The COMMIT command preserves all database transactions since the previous COMMIT or ROLLBACK command.
The syntax of the COMMIT command; 

```SQL
COMMIT
```
We can delete the records from the table that have fees=40000 and commit the changes in the database.

```SQL
DELETE FROM STUDENTS
WHERE FEES = 40000;
COMMIT;
```
This command will delete the row from the table which has fees equal to 40000 and save the changes to the database.

### ROLLBACK command
The ROLLBACK command can only be used to undo transactions from the last ROLLBACK or COMMIT command issued.
The ROLLBACK command syntax is as follows;

```SQL
ROLLBACK;
```

Consider deleting a record from the table where fees =40000 and ROLLBACK the changes;

```SQL
DELETE FROM STUDENTS
WHERE FEES = 40000;
ROLLBACK;
```

The delete operation would not change the records of the database therefore the results would be the same and the database remains unchanged.

### SAVEPOINT command
This command rolls back a transaction to a point in the database without having to roll back the entire transaction.
The SAVEPOINT command syntax;

```SQL
SAVEPOINT SAVEPOINT_NAME;
```

Unlike the ROLLBACK command, which reverses a set of transactions, the SAVEPOINT command just creates a SAVEPOINT among all transaction statements.
Rolling back to a SAVEPOINT;

```SQL
ROLLBACK TO SAVEPOINT_NAME;
```

We can delete three records from the STUDENTS table. We create a SAVEPOINT before each delete, this enables us to ROLLBACK to any SAVEPOINT any time to get back to the original state of the record.

```SQL
SAVEPOINT SP1;

DELETE FROM STUDENTS WHERE ID = 1;

SAVEPOINT SP2;

DELETE FROM STUDENTS WHERE ID= 2;

SAVEPOINT SP3;

DELETE FROM STUDENTS WHERE ID= 3;
```

The following operations for deletion have taken place, in case you want to redo the records for the student with id= 2 we ROLLBACK to the SAVEPOINT SP2. The operations on SP1 cannot be retrieved since SP2 happened after SP1. Therefore SAVEPOINTS SP1 and SP2 are retrieved back.

```SQL
ROLLBACK TO SP2;
```

### RELEASE SAVEPOINT command 
This command is used to delete a SAVEPOINT created
The RELEASE SAVEPOINT command syntax;

```SQL
RELEASE SAVEPOINT savepoint_name;
```

The ROLLBACK command cannot reverse transactions because the last SAVEPOINT command has been released.

### SET TRANSACTION command 
This command is used to initiate a database transaction. It specifies the characteristics of the transaction following. It specifies a transaction to either be read-only or read-write.
The SET TRANSACTION syntax;

```SQL
SET TRANSACTION [READ WRITE | READ ONLY];
```


Considering an example of a table Students as below and try working with the transactions as above.

|ID | NAME   | REG NO  | COURSE     | FEES  |
|-- | :-----:| :------:| :---------:| -----:|
|1  | JOHN   |V20/630|Education|40000|
|2  | AHMED  |G4/270|Computer science|50000|
|3  | IAN    |A43/476|Engineering|62500|
|4  | JANE|A19/520|IT|41200|
|5  | ROBERT |P62/491|Nursing|43700|
|6  | HELLEN |V20/470|Education|22000|
|7  | JOAN   |P62/801|Nursing|18000|

Here is the program to create the table above;
```SQL
CREATE TABLE STUDENTS(Id integer PRIMARY KEY, Name text, Regno varchar, Course text, Fees integer);


INSERT INTO STUDENTS VALUES(1,'John', 'V20/680', 'Education', 40000);
INSERT INTO STUDENTS VALUES(2,'Ahmed', 'G4/270', 'Computer Science',50000);
INSERT INTO STUDENTS VALUES(3,'Ian', 'A43/476', 'Engineering', 62500);
INSERT INTO STUDENTS VALUES(4,'Jane', 'A19/520', 'IT', 41200);
INSERT INTO STUDENTS VALUES(5,'Robert','P62/491', 'Nursing',43700);
INSERT INTO STUDENTS VALUES(6,'Hellen', 'V20/470', 'Education', 22000);
INSERT INTO STUDENTS VALUES(7,'Joan','P62/801', 'Nursing',18000);
COMMIT;


SELECT * FROM STUDENTS;
```

When this command is executed the results are as follows;

```SQL
DELETE FROM STUDENTS
WHERE FEES = 40000;
COMMIT;
```
Output;
|ID | NAME   | REG NO  | COURSE     | FEES  |
|-- | :-----:| :------:| :---------:| -----:|
|2  | AHMED  |G4/270|Computer science|50000|
|3  | IAN    |A43/476|Engineering|62500|
|4  | JANE|A19/520|IT|41200|
|5  | ROBERT |P62/491|Nursing|43700|
|6  | HELLEN |V20/470|Education|22000|
|7  | JOAN   |P62/801|Nursing|18000|

The first row is deleted and the results saved.

Executing the rollback command the results are as follows;

```SQL
DELETE FROM STUDENTS
WHERE FEES = 18000;
ROLLBACK;
```

Since the execution that has happened was not saved then the rollback command can be executed:
Output:
|ID | NAME   | REG NO  | COURSE     | FEES  |
|-- | :-----:| :------:| :---------:| -----:|
|1  | JOHN   |V20/630|Education|40000|
|2  | AHMED  |G4/270|Computer science|50000|
|3  | IAN    |A43/476|Engineering|62500|
|4  | JANE|A19/520|IT|41200|
|5  | ROBERT |P62/491|Nursing|43700|
|6  | HELLEN |V20/470|Education|22000|
|7  | JOAN   |P62/801|Nursing|18000|

Executing the savepoint command we have the results as:

```SQL
SAVEPOINT SP1;

DELETE FROM STUDENTS WHERE ID = 1;

SAVEPOINT SP2;

DELETE FROM STUDENTS WHERE ID= 2;

SAVEPOINT SP3;

DELETE FROM STUDENTS WHERE ID= 3;
```
Output:
|ID | NAME   | REG NO  | COURSE     | FEES  |
|-- | :-----:| :------:| :---------:| -----:|
|4  | JANE|A19/520|IT|41200|
|5  | ROBERT |P62/491|Nursing|43700|
|6  | HELLEN |V20/470|Education|22000|
|7  | JOAN   |P62/801|Nursing|18000|

We have deleted from the table where id 1,2 and 3 exist but with savepoints SP1, SP2 and  SP3 respectively. We can now rollback to any point using the savepoints.

```SQL
ROLLBACK TO SP2;
```
Output:
|ID | NAME   | REG NO  | COURSE     | FEES  |
|-- | :-----:| :------:| :---------:| -----:|
|2  | AHMED  |G4/270|Computer science|50000|
|3  | IAN    |A43/476|Engineering|62500|
|4  | JANE|A19/520|IT|41200|
|5  | ROBERT |P62/491|Nursing|43700|
|6  | HELLEN |V20/470|Education|22000|
|7  | JOAN   |P62/801|Nursing|18000|

Rollback command applies to the operations that happened after the savepoint SP2 and since the savepoint SP1 had initially been executed before SP2 it cannot be rolledback

### Conclusion
With that now, you are able to carry out transactions in the database and work with your database and also how to gain access to your data in case of an unintentional delete. You can also try some more examples with your own database to enhance better understanding.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
