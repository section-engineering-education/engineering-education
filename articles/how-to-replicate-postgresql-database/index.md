Replication is the act of reproducing or copying with something Several Relational Database Management Systems have different ways to achieve this. PostgreSQL being an open-source RDMS is what we are going to use in this article and show how replication is achieved.

### Introduction

For replication to be achieved in PostgreSQL there must be two servers that can be able to communicate with each other. This server will be identified as Master which is the Master server or the production server and the other one is the Slave server or Replica server or standby server which will have a copy of master server data. The data is synchronized in such a way that if the Master server fails one can continue to run with the slave database without any problem.

Replication is important to avoid Failover whereby the primary database fails and due to business continuity, there is a need for recovery. This recovery will depend on the replicated database created on Slave Server.

### Why Replication

1. **Online Transaction Processing (OLTP) Performance** \- removing reporting query load from OLTP system improves both query time and transaction processing time\.Query time is the time it takes for a database management systems to execute a query which is greatly reduced when using replication\. Transaction processing time is a duration it takes for given queries to be executed before a transaction is completed\.
2. **Data migration** \- which comes about either through system deployment or change of database server hardware\.
3. **System Testing in Parallel** \- when upgrading a new system there need to make sure the new system works well with existing data hence need to test with production database copy before deployment\.
4. **Fault Tolerance** \- in case the main server fails the standby server can act as a server since the contained data is the same\.

For this to happen there must be communication between the two hosts or two servers that is through a network or internet as shown below.

![LOCAL-EXAMPLE](how-to-replicate-postgresql-database/local-network.png)

![INTERNET-EXAMPLE](how-to-replicate-postgresql-database/internet-network.png)

### Installing PostgreSQL

For this article, we will use Ubuntu 18.04 LTS and PostgreSQL 10. Several Linux distributions can be used as server operating systems. It is important to note that one can set up Replication in any operating system.

Make sure you have installed the Linux Ubuntu server. To install PostgreSQL 10 in Ubuntu 18.04 LTS one must follow the following steps. This must be done to both servers that is the Master Server and Slave Server.

1. Import PostgreSQL signing key by typing the following command in Terminal

``` bash
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O- | sudo apt-key add -
```

2. Add PostgreSQL repository by typing the following command in terminal

``` bash
echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" | 
sudo tee /etc/apt/sources.list.d/postgresql.list
```

3. Update Repository Index typing the command below in terminal

``` bash
sudo apt-get update
```

4. Install PostgreSQL package using apt command

``` bash
sudo apt-get install -y postgresql-10
```

5. Set password for postgres user using the following command

``` bash
sudo passwd postgres
```

### Setting up Replication in Master Server

1. Login to the PostgreSQL database with the following command

``` bash
su - postgres
```

![postgres-login](how-to-replicate-postgresql-database/postgres-login.png)

2. Create replication user with the following command

``` bash
 psql -c "CREATEUSER replication REPLICATION LOGIN CONNECTION LIMIT 1 ENCRYPTED PASSWORD'YOUR_PASSWORD';"
```

3. Edit pg\_haba.cnf with any nano application in ubuntu and add the configuration

`file edit command`

``` bash
nano /etc/postgresql/10/main/pg_hba.conf
```

**Configuration**

``` bash
host  replication       replication   MasterIP/24   md5
```

![postgres-login](how-to-replicate-postgresql-database/pg_hba-edit.png)

`MasterIP is the IP address of the Master Server Computer`

4. Open and Edit postgresql.conf and put the following configuration or uncomment if it is commented in the master server
file edit command

``` bash
nano /etc/postgresql/10/main/postgresql.conf
```

**Configuration**

``` bash
listen_addresses = 'localhost,MasterIP'

wal_level = replica

wal_keep_segments = 64

max_wal_senders = 10
```

5. Restart PostgreSQL in Master main server

``` bash
systemctl restart postgresql
```

### Setting up Replication in Slave Server

1. Login to PostgreSQL RDMS with the command below

``` bash
su - postgres
```

2. Stop postgresql service from working to enable us to work on it with the command below

``` bash
systemctl stop postgresql
```

3. Edit pg\_hba.conf file with this command and add configuration

**Edit Command**

``` bash
nano /etc/postgresql/10/main/pg_hba.conf
```

**Configuration**

``` bash
host  replication       replication   MasterIP/24   md5
```

4. Open and Edit postgresql.conf<span style="mso-spacerun:yes">&nbsp;</span>in slave server and put the following configuration or uncomment if it is commented

**Edit Command**

``` bash
nano /etc/postgresql/10/main/postgresql.conf
```

**Configuration**

``` bash
listen_addresses = 'localhost,SlaveIP'

wal_keep_segments = 64

wal_level = replica

hot_standby = on

max_wal_senders = 10
```

`SlaveIP is the address of the Slave Server`

5. Access PostgreSQL data directory in the Slave server and remove everything

``` bash
cd /var/lib/postgresql/10/main
```

``` bash
rm -rfv *
```

6. Copy PostgreSQL Master Server data Directory files to PostgreSQL Slave Server Data directory. Write this command in Slave Server

``` bash
pg_basebackup -h MasterIP -D /var/lib/postgresql/11/main/ -P -U

replication --wal-method=fetch
```

7. Enter Master Server postgres password and press Enter.
8. Need for recovery.conf file in data Directory to be created and add the following command

**Edit Command**

``` bash
nano /var/lib/postgresql/10/main/recovery.conf
```

**Configuration**

``` bash
standby_mode          = 'on'

primary_conninfo      = 'host=MasterIP port=5432 user=replication password=YOUR_PASSWORD'

trigger_file = '/tmp/MasterNow'
```

`YOUR_PASSWORD is the password for replication user in Master server PostgreSQL created`

9. Start slave PostgreSQL since it had been stopped

``` bash
systemctl start postgresql
```

10. Create database or table in Master PostgreSQL database and observer in Slave PostgreSQL Database

**Login to master server**

``` bash
su - postgres
psql
```

**Create a  table named 'testtable' and insert data to the table by running the following postgres queries in the terminal**

``` sql
CREATE TABLE testtable (websites varchar(100));
INSERT INTO testtable VALUES ('section.com');
INSERT INTO testtable VALUES ('google.com');
INSERT INTO testtable VALUES ('github.com');
```

11. Observe the slave server postgres database by

**Login to master server**

### Conclusion

In summary, if you can view data in slave server database after making changes in master server database then you would have successfully set up PostgresSQL master to slave replication.