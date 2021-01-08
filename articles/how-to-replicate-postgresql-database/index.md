---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-replicate-postgresql-database/
title: Replication of PostgreSQL Database
description: This article will go over the replication of postgreSQL database process. We will be using Ubuntu 18.04 LTS and PostgreSQL 10. 
author: sylvester-tamba
date: 2021-01-08T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-replicate-postgresql-database/hero.jpg
    alt: Replication of PostgreSQL Database example image
---
Replication is the act of reproducing or copying something, Several Relational Database Management Systems (RDMS) have different ways to achieve this. PostgreSQL is an open-source RDMS, and it is what we are going to use in this article to show how replication is achieved.
<!--more-->
### Introduction
For replication to be achieved in PostgreSQL there must be two servers that can communicate with each other. It will identify this server as master, which is the master server or the production server and the other one is the Slave server or Replica server or standby server that will have a copy of master server data.

It synchronizes the data in such a way that if the master server fails, one can continue to run with the slave database without any problem. Replication is important to avoid fail over, whereby the primary database fails and due to business continuity, there is a need for recovery. This recovery will depend on the replicated database created on the slave server.

### Why use replication
- **Online Transaction Processing (OLTP) Performance** - removing reporting query load from OLTP system improves both query time and transaction processing time. Query time is the time it takes for database management systems to execute a query which is greatly reduced when using replication. Transaction processing time is the duration it takes for given queries to be executed before a transaction is completed.
- **Data migration** - which comes about either through system deployment or change of database server hardware.
- **System Testing in Parallel** - when upgrading a new system one needs to make sure the new system works well with existing data, hence the need to test with a production database copy before deployment.
- **Fault Tolerance** - in case the main server fails the standby server can act as a server since the contained data is the same.

For this to happen there must be communication between the two hosts or two servers, through a network or internet as shown below.

![LOCAL-EXAMPLE](/engineering-education/how-to-replicate-postgresql-database/local-network.png)

[Internet Example - *Image Source*](/engineering-education/how-to-replicate-postgresql-database/internet-network.png)

### Installing PostgreSQL
For this article, we will be using Ubuntu 18.04 LTS and PostgreSQL 10. Several Linux distributions can be used as server operating systems. It is important to note that one can set up Replication in any operating system.

Make sure you have installed the Linux Ubuntu server. To install PostgreSQL 10 in Ubuntu 18.04 LTS one must follow the following steps. This must be done to both servers that is the master server and slave server.

- Import the PostgreSQL signing key by typing the following command in Terminal.

```bash
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O- | sudo apt-key add -
```

- Add PostgreSQL repository by typing the following command in terminal.

```bash
echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" | 
sudo tee /etc/apt/sources.list.d/postgresql.list
```

- Update Repository Index typing the command below in terminal.

```bash
sudo apt-get update
```

- Install PostgreSQL package using apt command.

```bash
sudo apt-get install -y postgresql-10
```

- Set password for postgres user using the following command.

```bash
sudo passwd postgres
```

### Setting up replication in master rerver
- Login to the PostgreSQL database with the following command.

```bash
su - postgres
```

![postgres-login](/engineering-education/how-to-replicate-postgresql-database/postgres-login.png)

- Create replication user with the following command.

```bash
 psql -c "CREATEUSER replication REPLICATION LOGIN CONNECTION LIMIT 1 ENCRYPTED PASSWORD'YOUR_PASSWORD';"
```

- Edit pg\_hba.cnf with any nano application in Ubuntu and add the configuration.

`file edit command`

```bash
nano /etc/postgresql/10/main/pg_hba.conf
```

**Configuration**

```bash
host  replication       replication   MasterIP/24   md5
```

![postgres-login](/engineering-education/how-to-replicate-postgresql-database/pg_hba-edit.png)

`MasterIP is the IP address of the Master Server Computer`

- Open and edit postgresql.conf and put the following configuration or uncomment if it is commented in the master server
file edit command.

```bash
nano /etc/postgresql/10/main/postgresql.conf
```

**Configuration**

```bash
listen_addresses = 'localhost,MasterIP'

wal_level = replica

wal_keep_segments = 64

max_wal_senders = 10
```

- Restart PostgreSQL in master main server.

```bash
systemctl restart postgresql
```

### Setting up replication in slave server
- Login to PostgreSQL RDMS with the command below.

```bash
su - postgres
```

- Stop postgresql service from working to enable us to work on it with the command below.

```bash
systemctl stop postgresql
```

- Edit pg\_hba.conf file with this command and add configuration.

**Edit Command**

```bash
nano /etc/postgresql/10/main/pg_hba.conf
```

**Configuration**

```bash
host  replication       replication   MasterIP/24   md5
```

- Open and edit postgresql.conf <span style="mso-spacerun:yes">&nbsp;</span> in the slave server and put the following configuration or uncomment if it is commented.

**Edit Command**

```bash
nano /etc/postgresql/10/main/postgresql.conf
```

**Configuration**

```bash
listen_addresses = 'localhost,SlaveIP'

wal_keep_segments = 64

wal_level = replica

hot_standby = on

max_wal_senders = 10
```

`SlaveIP is the address of the slave server`

- Access PostgreSQL data directory in the slave server and remove everything.

```bash
cd /var/lib/postgresql/10/main
```

```bash
rm -rfv *
```

- Copy PostgreSQL master server data Directory files to PostgreSQL slave server data directory. Write this command in slave server.

```bash
pg_basebackup -h MasterIP -D /var/lib/postgresql/11/main/ -P -U

replication --wal-method=fetch
```

- Enter master server postgres password and press enter.

- Need for recovery.conf file in data directory to be created and add the following command.

**Edit Command**

```bash
nano /var/lib/postgresql/10/main/recovery.conf
```

**Configuration**

```bash
standby_mode          = 'on'

primary_conninfo      = 'host=MasterIP port=5432 user=replication password=YOUR_PASSWORD'

trigger_file = '/tmp/MasterNow'
```

`YOUR_PASSWORD is the password for replication user in master server PostgreSQL created`

- Start slave PostgreSQL since it had been stopped.

```bash
systemctl start postgresql
```

- Create database or table in master PostgreSQL database and observer in slave PostgreSQL database.

**Login to the master server**

```bash
su - postgres
psql
```

**Create a table named 'testtable' and insert data to the table by running the following postgres queries in the terminal.**

```sql
CREATE TABLE testtable (websites varchar(100));
INSERT INTO testtable VALUES ('section.com');
INSERT INTO testtable VALUES ('google.com');
INSERT INTO testtable VALUES ('github.com');
```

- Observe the slave server postgres database by:

**Logging in to the slave server**

```bash
su - postgres
psql
```

**Check data on 'testtable' by running the following postgres queries in the terminal.**

```sql
select * from testtable;
```

You should be able to observe the same data as the one in the master server.

### Conclusion
In summary, if you can view the data in the slave server database after making changes in the master server database then you have successfully set up PostgresSQL master to slave replication. 

Happy Coding!

---
Peer Review Contributions by: [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)