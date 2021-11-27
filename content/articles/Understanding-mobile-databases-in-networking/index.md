### UNDERSTANDING MOBILE DATABASES IN NETWORKING

Mobile databases make data from database applications available to mobile users, and they support applications that involve data processing. In general, a mobile database connects computing devices over a wireless mobile network.
Mobile computing allows users to establish communication with other users and manage their work while on their move.
### Table of contents
- [ Properties of mobile databases](#Properties-of-mobile-databases)
- [ Types of mobile databases](#Types-of-mobile-databases)
- [Advantages of mobile databases](#Advantages-of-mobile-databases)
- [Disdvantages of mobile databases](#Disdvantages-of-mobile-databases)
- [Characteristics of mobile environments](#Characteristics-of-mobile-environments)
- [Requirements of mobile databases](#Requirements-of-mobile-databases)
- [Transaction management in mobile database systems](#Transaction-management-in-mobile-database-systems)
- [Existing mobile databases](#Existing-mobile-databases)
- [Conclusion](#conclusion)

### Properties of mobile databases
- It resides on mobile devices
- It provides a communication link between a central database server and other mobile links that allow a transfer.
- The mobile database connects the database of the main system.
- It enables users to view information while on the move.
- Mobile databases analyze data on mobile devices.

### Types of mobile databases

#### Client-server mobile database.

Here, the database server connects the client machines through a computer communication network.
The client machines have running application programs that users are using. The applications have interfaces in which the user can generate their queries.
The computer network makes it possible for the generated query to get accessed by the database. The database server will check the query, the required data for the query processing, which user has sent the query, and the respective authenticity of the new use.
The processed query will be made available to the respective client machine. The client machine displays the result so that the user can access the database. The central server checks the syntax of the commands from the client's queries.
The server hides the server system from the client and the end-user so that the user is unaware of the server's hardware and software.
#### Peer-to-Peer Mobile Database.
It is a database stored in the peers of a mobile peer-to-peer network. The database maintenance activities get distributed among clients where each mobile peer has a local database that stores and manages a collection of data items. The mobile peer-to-peer database is formed by local databases maintained by the mobile peers.
A client sends a request to other peer clients, where a request is forwarded until the data is found. The concept of a peer-to-peer database proposes searching local information like information of a temporary nature. For example, if there's the availability of a parking slot in a specific geographical area.
Applications of peer-to-peer mobile database

 - Social networks
 - Airport application.
 - Mobile E-commerce.
 - Transport safety and efficiency.

### Advantages of mobile databases

 - It provides wireless database access.   
 - Support and maintenance are easily done.
 - It is easy to manage.
 - It is used with multiple devices.

### Disadvantages of mobile databases

 - It is less secure.
 - Bandwidth is limited.
 - The mobile database consumes more power.

### Characteristics of mobile environments

- Restricted bandwidth of wireless networks 
- Less power supply
- It should enhance mobility
- It doesn't require many resources

### Requirements of mobile databases
1. Memory footprint- this is the amount of main memory an application uses while running. The size of the mobile database affects the overall application footprint. Mobile databases should have a small print since mobile devices have limited memory. 
2. Flash optimized storage system-mobile database needs to be optimized to make use of the new storage devices.
3. Data synchronization-mobile database should have the synchronize functionality to integrate different versions of data into a compatible version.
4. Security-mobile database should implement complete end security to ensure the transfer of data is secure.
5. Low power consumption- optimization needs to be done in mobile databases for efficient power consumption.
6. Self management-mobile database needs to support self-management and automatically perform the database administrator tasks.
7. Embeddable in applications database must be embeddable as a DLL file in the applications so that administrators can have direct access to mobile devices.

### Transaction management in mobile database systems

- A transaction is a unit of work carrying out instructions within a database management system. 
In a mobile environment, one should consider a restricted bandwidth because of the mobility of the host. 
- If the bandwidth is high, information is easily accessed as there's a strong connection while else if the bandwidth is low, there's a weak connection. Mobile transaction checks if the bandwidth is high or low, it can switch from a strong connection to a weak connection or conversely. With this, mobile users start transactions from anywhere maintaining consistency.
#### Mobile transaction models
1. Report and co-transaction model
2. Pre-serialization transaction model
3. Two-tire transaction model
4. Moflex transaction model

For more enquiries about transaction models visit [Overview of trasaction models](  https://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.22.2097&rep=rep1&type=pdf )
 
### Mobile database recovery
- Mobile database systems can store actual databases at one or multiple locations.
In case of failure, recovery of the mobile database system is possible. Mobile database recovery is more complex than the traditional database. 
#### Factors that affect recovery
1. The mobile device might be broken, stolen, or gets lost.
2. There are areas with poor network connection.
3. Network issues like the weakness of wireless links.
4. Mobility

The new recovery scheme is more efficient to use in mobile databases compared to the traditional one.
The main types of traditional schemes are the lazy and pessimistic approaches.
#### New scheme
Its main goal is managing and maintaining any changes made to the data.
It focuses on the recovery of the mobile unit at the time of handoff.
One should manage changes made to data to help recover the mobile unit when it fails.
The new scheme  groups a set of base stations
The new scheme considers two situations for recovery:
1. 1st situation 
If the mobile device recovers in the same base station where it crashed.
2. 2nd situation
If a mobile device moves to a new base station as you try to recover it, the old base station is unrecognized.
The old base station notifies the designated Base station(DBS about the data of the mobile device. The new base station then sends a query to the DBS for information about the mobile device and the data that was on it.

#### Advantages of the new scheme
1. It avoids multiple copies of data.
2. Data gets saved at one central place for faster recovery reducing recovery time.
3. Maintained data on the previous base station becomes an updated version in case of recovery.
#### Disadvantages of the new scheme
1. Base stations have the same DBS and data stored on one DBS gets overloaded sometimes.

### Existing mobile databases

 - Sybase SQL Anywhere.
 - Oracle lite
 - Microsoft SQL server compact
 - SQ lite
 - IBM DB2 everyplace (DB2e)

### conclusion
In conclusion, every device we use has a working database that makes data available to the users. After reading the article users should know how configuration takes place in mobile databases.