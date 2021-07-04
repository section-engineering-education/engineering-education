### Transaction management in database
### Introduction
A Transaction is a unit of work performed against a database. They are units of work accomplished in a logical order, whether manually by the end-user or automatically by an application.

A transaction will comprise one or more changes to the database. For example, creating, updating, or deleting a record from a table. It is important to control these transactions to ensure the integrity of data and handle database errors. We can group  SQL queries and execute them together as part of a single transaction.

### Prerequisities
Before learning this tutorial you need to have basics in SQL(structured query language) and understand how to create a database which we will be working from and performing our transactions against.

### Transaction states 
There are various database transaction states as follows.
1. Active state- this is the state in which a transaction execution process begins. Operations such as read or write are performed on the database.
2. Partially committed- a transaction is partially committed after the end of a transaction.
3. Committed stage- After a transaction execution is completed successfully the transaction is in committed state. All the changes made against the database are recorded permanently.
4. Failed state- A transaction is in the failed state if the transaction is aborted when in active state or in an instance when one of the checks fails.
5. Terminated state- This state happens once the transaction leaving the system cannot be restarted once again.

### Transaction properties 
There are four main properties of a transaction represented in the acronym ACID referring to; Atomicity, Consistency, Isolation, and Durability.

1. Atomicity- A transaction cannot be subdivided and can only be executed as a whole and is treated as an atomic unit. It is either all the operations are carried out or none are performed.
2. Consistency- After any transaction is carried out in a database it should remain consistent. No transaction should affect the data residing in the database adversely.
3. Isolation- In the case of many transactions that need to be executed in a database simultaneously, then each transaction will be executed as if it was a single transaction. Therefore the execution of a single transaction should not affect the execution of other transactions.
4. Durability- From durable, all changes made must be permanent such that once the transaction is committed the effects of the transaction cannot be reversed. In case of system failure or unexpected shutdown and changes made by a complete transaction are not written to the disk, during restart the changes should be remembered and restored.

### Transactional control commands
The transactional commands are used with the Data Manipulation Language (DML) commands such as INSERT, UPDATE, and DELETE. These commands cannot be used with the Data Definition Language because they are automatically committed to the database. Below are the transaction commands;

1. COMMIT- Saves the changes done against the database.
2. ROLLBACK- Restores the changes done.
3. SAVEPOINT- creates a point within the transactions in which to ROLLBACK.
4. SET TRANSACTION- Gives a name to a transaction.

### COMMIT command
The COMMIT command is used to save changes invoked to a database by a transaction. The COMMIT command saves all transactions in the database from the last COMMIT or ROLLBACK commands.
The COMMIT command syntax;

```SQL
COMMIT
```
An example would delete the records from the table that have fees=40000 and commit the changes in the database.

```SQL
DELETE FROM STUDENTS
WHERE FEES = 40000;
COMMIT;
```
This command will delete the row from the table which has fees equal to 40000 and save the changes to the database.

### ROLLBACK command
The ROLLBACK command is used to restore back the changes or undo the transactions made to the database but have not been saved or committed to the database.
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
The SAVEPOINT command syntax is as follows;

```SQL
SAVEPOINT SAVEPOINT_NAME;
```

Unlike the ROLLBACK command that undoes a group of transactions, the SAVEPOINT command serves only in the creation of a SAVEPOINT among all the transaction statements.
The following is a syntax for rolling back to a SAVEPOINT;

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

Upon releasing a savepoint command the ROLLBACK command cannot undo or restore the transactions since the last SAVEPOINT.

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