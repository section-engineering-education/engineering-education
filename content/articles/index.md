
### Content
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Check the environment](#check-the-environment)
- [Securing MongoDB](#securing-mongodb)
- [Create a user with system access](#create-a-user-with-system-access)
- [Turn on authentication](#turn-on-authentication)
- [Authentication Testing](#authentication-testing)
- [Wrapping it up](#wrapping-it-up)

### Prerequisites
Before you begin reading this tutorial, you need to have the following installed on your machine:
- [Ubuntu](https://ubuntu.com/download/server) 20.05 server 
- UFW-configured proxy server.
- [MongoDB](https://www.mongodb.com/try/download/community) 

### Introduction
MongoDB is one of the most used modern web applications for a database. However, MongoDB is not secure by default. As a result, configuring it for authentication may be difficult. For this reason, people can browse, write, delete, or modify data on your server without ever needing to log in or authenticate. In this tutorial, you will learn how to secure and activate authentication on MongoDB in a few steps.

### Check the environment
To check if MongoDB is running on Linux kernel, we use the command below:
```bash
#call mongod and specify the path.
mongod --dbpath = "C:\data\mongo"
#or use this below to check.
ps -e|grep 'Mongod'
```
When already installed, the output will appear similar to this:

```bash
909070 ttys023 2:43.486 ./mongodb
```
When performing configuration, we navigate to the default location `/etc/mongodb.conf` from the default port and change file location using the command below:


```bash
#myfiles is the drive locaton of the file.
$sudo myfiles/local/etc/mongodb.conf
```
When MongoDB and a Web app are running on the same system, they can communicate. To end such kind of linkage, we set the IP address to 127.0.0.1, thus will automatically end communication via the internet.

```bash
#network 
net:
    port: 27274
    bindIp: 127.0.0.1
```
By performing binding on IP addresses, we ensure that MongoDB runs in a safe network environment. Thus, safeguarding incoming connections. We can bind the Ip address by changing the IP address to the one in the command below:

```bash
#binding command for secure Vlan connection
bindIp: 192.168.1.7
```
### Securing MongoDB
To secure your MongoDB, we use the following steps:
1. Create a user with admin access.
2. Turn on authentication.
3. Assign administrative users access to the database.

### 1. Create a user with system access
MongoDB version accepts connection from local Unix socket. As a result, it cannot connect a huge internet connection. Thus, users having MongoDB installed can still have access to the database. To secure your database, we need to add an administrative user. To add an administrative user, we first connect to the Mongo shell prompt using the command below:

```bash
$mongo
```
The output displays the shell's version, the connection of MongoDB, that is, its IP address, and more warnings indicating database access control is not enabled. Meaning reading and writing to the database is unrestricted, insecure and anyone with access to the server can have control of the database. Due to this, we can check the list of databases available to the server. By running the command below:

```bash
#The command returns lists of every database on the server.
show dbs
```

If we run the command `show dbs`, we get our output like the one below:

```bash
db-job-admin   0.0091GB
db-jobs-new  0.0009GB
db-config  0.0001GB
local   0.0100GB
```
The output will display default databases, and any user can still find valuable data in one system. Therefore, we add an administrative user by connecting to the database. To start connecting to the database, we call an admin user to the database using the command below:

```bash
use admin
```

Since the MongoDB environment comes installed with several `JSON-based methods` used in managing the database, we will use the `javascript-based` shell method used to create a user. The `db.createUser` method adds new users to the database. We execute it using the command below:
```bash
db.createUser({user, getLastError})#field user contains the documents with authentication information about the user.
#getlasError can be optional, writes and checks if the user exists.
```
The method requires users to create a new user. Note that an error message appears if the data is present. When creating the user, you need to specify login credentials, passwords, and roles to the database. As mentioned before, MongoDB stores data in JSON documents that hold data in its fields. For a JSON document to execute without any error message, one need to use curly braces to start and end the document created as shown below:

```bash
#note that without closing the parenthesis, MongoDB will still not run.
    use admin
    db.createUser({
        user: "AndrewKulundeng'",
        pwd: "xandrew12@12",#enter roles, closing braces and parenthis.
        role: [{role:"userAdminAnyDatabase", dp:"admin"}]})
```
When the above method executes, a user will be prompt to enter a password as shown below:

```bash
#enter password used when creating the database.
Enter password: xandrew12@12
Output
Successfully added user: {
     user : "AndrewKulundeng'",
     roles : [
        {
            "role" : "userAdminAnyDatabase",
            "db" : "admin"
        }
      
    ]
}
```
Then exit MongoDB after the operation. Users will be allowed to enter details after authentication is enabled and the MongoDB daemon restarts. To restart the daemon, use the command below:
```bash
mongod --auth --dbpath="C:\data\mongo" 0r
#press enters key to execute.
$sudo systemctl restart mongodb
```
### 2. Turn on authentication
To make authentication to enable, edit `mongod.conf files` as we have done before and restart your mongo service. But it will still allow users to access the database without varifying for passwords. But they will not be able to make changes to the database since they do not have the correct username and password. We open the configuration file using the command below and move down to the security. Remove the #sign from the security line and add authorization colon and set it to enable as shown:

```bash
usr/etc/mongod.conf
security:
```
We will then add an authentication parameter and set it to enable. Note that `authorization` is indented and looks like this:

```bash
security:
  authorization: "enabled"
```
Close the command line and restart the mongo using the command:

```bash
$sudo systemctl restart mongod
```

### Authentication Testing
When testing if authentication is working correctly, we need to connect to the database without placing the credentials. Then we check the actions of the database accessed if it's restricted or not. Run the command below to check:

```bash
$mongo
```
There will be no warning that will appear to the database since authentication is enabled. The output will appear similar to this:


```bash
MongoDB shell version v3.5.0
```
We can run the command `show dbs` to show if access is restricted:

```bash
show dbs
```
When there is no message displayed, mean authentication is running as expected. Users will not be able to access the database and modify any other things in the database. Exit the shell by pressing `CTRL + C.` To check if the administrative user authenticates, we run the following commands to connect the user. The `-u` flag for a user to connect to and the `-p` flag requests a user for a password.
```bash
mongo -u AndrewKulundeng' -p --authentication database admin
 ```
Enter user password when prompted. Then issue shows the DBS command to show if the authentication is enabled:

```bash
showdbs
 ```
The command will return a list of databases currently running on the server. Thus, showing that authentication is enabled successfully.

```bash
The output will show the admin, config file, and the local host to which the server is running.
admin 0.0056GB
config 0.00067GB
local 127.68.390/44
```
### 3. Adding a user to the database
To add a user,  we use the command below:

```bash
-create new database
    >use std(student)#then create usernamed John and password
db.create({user:'John', pwd:'John@12?!', role:[{role:'manage', db: 'std',}]})
```


### Wrapping it up
By completing this tutorial, we will be in the condition of having an administrative MongoDB set. Afterward, users can create roles and change usernames in the database.
Thanks for reading!
