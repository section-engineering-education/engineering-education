Replication is the act of reproducing or copying with something Several Relational Database Management Systems have different ways to achieve this. PostgreSQL being an open source RDMS is what we are going to use in this article and show how replication is achieved.

### Introduction

For replication to be achieved in PostgreSQL there must be two servers that can be able to communicate to each other. This server will be identified as Master which is the Master server or the production server and the other one is the Slave server or Replica server or standby Server which will have a copy of master server data. The data is synchronized in such a way that if the Master server fails one can continue to run with the slave database without any problem.
Replication is important to avoid Failover where by the primary database fails and due business continuity there is need for recovery. This recovery will depend on the replicated database created on Slave Server.

### Why Replication

1. Online Transaction Processing(OLTP) Performance- removing reporting query load from OLTP system improves both query time and transaction processing time
2. Data migration- which comes about either through system deployment or change of database server hardware
3. System Testing in Parallel- when upgrading a new system there need to make sure new system works well with existing data hence need to test with production database copy before deployment
4. Fault Tolerance- incase main server fails the standby server can act as server since the data contained is same

For this to happen there must be a communication between the two hosts or two servers that is through a network or internet as shown below.

![LOCAL-EXAMPLE](/How-to-Replicate-PostgreSQL-database/local-network.png)

![INTERNET-EXAMPLE](/How-to-Replicate-PostgreSQL-database/internet-network.png)

### Installing PostgreSQL

For this article we will use Ubuntu 18.04 LTS and PostgreSQL 10. There are several Linux distributions that are used as server operating systems. It is important to note that one can set up Replication in any operating system.

Make sure you have installed Linux Ubuntu server. To install PostgreSQL 10 in Ubuntu 18.04LTS one must follow the following steps. This must be done to both servers that is the Master Server and Slave Server.

1. import PostgreSQL signing key by typing following command in Terminal

<br>
```
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O- | sudo apt-key add -
```

2. Add PostgreSQL repository by typing following command in terminal

<br>
```
echo "deb http://apt.postgresql.org/pub/repos/apt/ bionic-pgdg main" | 
sudo tee /etc/apt/sources.list.d/postgresql.list
```

3. Update Repository Index typing the command below in terminal

<br>
```
sudo apt-get update
```

4. Install PostgreSQL package using apt command

```
sudo apt-get install -y postgresql-10
```

5. Set password for postgres user using following command

```
sudo passwd postgres
```
<br>
### Setting up Replication in Master  Server
<br>
1. Login to PostgreSQL database with the following command

<br>
```
Su - postgres
```

![postgres-login](/How-to-Replicate-PostgreSQL-database/postgres-login.png)

2. Create replication user with the following command
<br>
```
 psql -c "CREATEUSER replication REPLICATION LOGIN CONNECTION LIMIT 1 ENCRYPTED PASSWORD'YOUR_PASSWORD';"
```

3.  Edit pg\_haba.cnf with any nano app in ubuntu and add the configurtion

file edit command
<br>
```
nano /etc/postgresql/10/main/pg_hba.conf
```
<br>
configuration
<br>
```
host  replication       replication   MasterIP/24   md5
```
<br>
![postgres-login](/How-to-Replicate-PostgreSQL-database/pg_hba-edit.png)

`MasterIP is the IP address of the Master Server Computer`

4. Open and Edit postgresql.conf and put the following configuration or uncomment if it is commented in master server
file edit command

```
nano /etc/postgresql/10/main/postgresql.conf
```

configuration
<br>
```
listen_addresses = 'localhost,MasterIP'

wal_level = replica

wal_keep_segments = 64

max_wal_senders = 10
```

5. Restart PostgreSQL in Master main server

<br>
```
systemctl restart postgresql
```

### Setting up Replication in Slave  Server

1. Login to PostgreSQL RDMS with the command below
<br>
```
su - postgres
```
<br>
2. Stop postgresql service from working to enable us work on it with the command below
<br>
```
systemctl stop postgresql
```
<br>
3. Edit pg\_hba.conf file with this command and add configuration

edit command

```
nano /etc/postgresql/10/main/pg_hba.conf
```

Configuration
<br>
```
host  replication       replication   MasterIP/24   md5
```
<br>
4. Open and
Edit postgresql.conf<span style="mso-spacerun:yes">&nbsp;&nbsp;</span>in slave
server and put the following configuration or uncomment if it is commented

Edit command
<br>
```
nano /etc/postgresql/10/main/postgresql.conf
```

Configuration
<br>
```
listen_addresses = 'localhost,SlaveIP'

wal_keep_segments = 64

wal_level = replica

hot_standby = on

max_wal_senders = 10
```

`SlaveIP is address of the Slave Server`

5. Access PostgreSQL data directory in Slave server and remove everything
<br>
```
cd /var/lib/postgresql/10/main
```
<br>
```
rm -rfv *
```

6. Copy POstgreSQL Master Server data Directory files to POstgreSQL Slave Server Data directory.

Write this command in Slave Server

```
pg_basebackup -h MasterIP -D /var/lib/postgresql/11/main/ -P -U

replication --wal-method=fetch
```

Enter Master Server postgres password and press Enter

7. Need of recovery.conf file in data Directory to be created and add the following command

Edit command
<br>
```
nano /var/lib/postgresql/10/main/recovery.conf
```
<br>
Configuration
<br>
```
standby_mode          = 'on'

primary_conninfo      = 'host=MasterIP port=5432 user=replication password=YOUR_PASSWORD'

trigger_file = '/tmp/MasterNow'
```

`YOUR_PASSWORD is the password for replication user in Master server PostgreSQL created`

8.  Start slave PostgreSQL since it had been stopped
<br>
```
systemctl start postgresql
```
<br>
9\. Try creating any database or table in Master PostgreSQL database and observer in Slave PostgreSQL Database

10\. Done