---
layout: engineering-education
status: publish
published: true
url: /ensuring-acid-compliance-in-database-transactions/
title: ACID Compliance in Database Transactions
description: This article will have a look at database transactions and all the four components of ACID compliance.
author: eric-kahuha
date: 2020-12-03T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/ensuring-acid-compliance-in-database-transactions/hero.jpg
    alt: ACID compliance databases example image
---
Applying the ACID (atomicity, consistency, isolation, and durability) properties to database modifications is the best way to ensure databases reliability, accuracy, and successful transactions.
<!--more-->
Often, you will need to conduct some operations on your database (database transactions). We must complete these changes with care to ensure that you do not corrupt the database's data.

In this article, we will have a look at database transactions and all the four components of ACID compliance.

### Database transactions
Any operation performed within a database, including updating data or creating new records, is referred to as a database transaction. Every database transaction is treated independently from other transactions.

Transactions in a database environment provide reliable work units. These work units facilitate correct recovery from failures and maintain database consistently even in cases of system failure.

Execution in a database may stop (abruptly), either wholly or partially, resulting in many uncompleted database operations with unclear transaction status.

Suppose you are tasked to enter new students records in the school's student database. Then your computer goes down while entering the 78th record.

Are the first 77 records you entered lost? If the database is ACID compliant, it will keep the first 77 records and discard the 78th record.

Another purpose of database transactions is to isolate programs accessing a database concurrently, thus preventing erroneous outcomes from these programs.

### ACID compliance
Database transactions that are automatic, consistent, isolated, and durable are said to be ACID compliant. Now let us discuss each of these four ACID properties of database transactions.

#### Atomicity
Database transactions contain multiple parts of the transaction. Successful transactions are those that complete all the parts of a transaction.

Atomicity ensures that all aspects of a transaction are successful. Otherwise, the transaction becomes incomplete. Incomplete transactions fail, reducing the risk of the database being corrupted.

Let's say that you want to withdraw $100 from your bank account and transfer the same amount to your relative's account.

There exist two transactions in this scenario: withdrawing $100 from your account and transferring $100 to your relative's account.

Each transaction is treated as a separate transaction. If withdrawing $100 from your account (first transaction) were to fail due to a server crash during the transaction, you won't be able to transfer the money to your relative's account.

#### Consistency
Consistency in a database transaction dictates that data within the database should comply with data validation rules.

Any transaction that does not follow data validation rules is [rolled back](https://en.wikipedia.org/wiki/Rollback_(data_management)), and the database goes back into the initial state it was before the transaction started.

This is essential in avoiding data inconsistency and maintaining data integrity.

Say you want to withdraw $100 from your account, but you only have a balance of $60. Consistency will prevent you from withdrawing the money and ensures that that particular transaction is aborted.

#### Isolation
ACID compliance databases guarantee the individuality of each transaction by ensuring that no transaction affects another transaction.

The isolation property facilitates simultaneous transaction processing securely and independently and without interference. Isolation does not guarantee the transactions' order, meaning that it can execute any transaction first.

For instance, say that you want to withdraw $70 and send your relative $50 from the same account with a balance of $200. Either it will require you to wait until your relative's transaction of $50 is complete (you will then withdraw from the remaining balance of $150).

Either that or your relative will have to wait for your transaction of $70 to complete (and your relative will then withdraw from the remaining balance of 130).

#### Durability
Durability guarantees that completed transactions survive permanently, even in instances of system failure. This way, data within the database remains uncorrupted after a service crash, outage, or other failures.

Every time portions of the database or the entire database are restarted, the system references [changelogs](https://en.wikipedia.org/wiki/Changelog#) to ensure transaction durability.

Your relative can withdraw $50 only after your transaction is completed and updated in the database in the example above.

Assuming that the system fails before it logs your transaction in the database, your relative cannot withdraw any money, and the account will return to its initial consistent state.

### How ACID works in practice
There are various techniques used to enforce ACID compliance, as we will discuss below.

The [write-ahead logging](https://www.postgresql.org/docs/9.1/wal-intro.html) (WAL) technique enforces integrity, durability, and atomicity by ensuring that all transaction details are first written to a log that includes undo and redo information.

In case of a transaction failure, the database checks the log and compares its contents to the database's state before the transaction failure.

Imagine your computer loses power while you are in the middle of performing a transaction.

When you restart your machine, the program will need to know the state of the operation before your computer powered off unexpectedly, that is, whether it failed, succeeded, or succeeded partially.

The write-ahead log comes to ensure that the program checks this log and compares what we expected it to perform when it suddenly lost power to what it could execute.

With this basis, the program may keep things as they were, complete what it had started, or undo what it had started.

Another technique to ensure ACID compliance is [shadow paging](https://www.geeksforgeeks.org/shadow-paging-dbms/). This [copy-on-write](https://www.computerhope.com/jargon/c/copy-on-write.htm#) technique avoids in-place page updates and instead allocates a shadow page when a page is modified.

You can modify this shadow page without minding consistency constraints because it has no references from other pages on disk.

Pages that referred to the original page can only be updated to refer to the new page once the shadow page is ready to become durable. The page is considered automatic because it's activated only when it's ready.

The [two-phase commit](https://link.springer.com/referenceworkentry/10.1007%2F978-0-387-39940-9_2#) (2PC) protocol ensures ACID compliance for database transactions.

The automatic commitment protocol for distributed systems contains the prepare phase (phase 1) and the commit phase (phase 2).

In phase 1, all resource managers save transaction updates in stable storage. Servers [commit](https://www.techopedia.com/definition/16/commit) and write data records in a log.

Servers unable to write data in a log respond with a failure message, while the successful ones respond with an OK message.

Phase 2 starts after a successful phase 1 and when all participants send an OK response.

In this phase, all resource managers must commit, enabling [nodes](https://docs.oracle.com/cd/B10191_01/calendar.903/b10093/nodes.htm#) to log their commits in a record and notify the coordinator of the successful commits.

In the case that phase 1 fails, phase 2 notifies resource managers to abort the transaction. In this event, servers will roll back, and each node will send feedback for accomplished rollbacks.

### Conclusion
ACID-compliant database management systems are maintained with utmost data security and integrity. Organizations can derive value from such databases and prevent data from being corrupted.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
