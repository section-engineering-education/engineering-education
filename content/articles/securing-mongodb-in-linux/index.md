
### Securing MongoDB in Linux

### Content

- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Check the environment](#check-the-environment)
- [Securing MongoDB](#securing-mongodb)
- [Create a user with system access](#create-a-user-with-system-access)
- [Turn on authentication](#turn-on-authentication)
- [Authentication Testing](#authentication-testing)
- [Wrapping it up](#wrapping-it-up)

### prerequisites

Before you start reading this tutorial you need to have the  following in your machine:

- [Ubuntu](https://ubuntu.com/download/server) 20.05 server installed. 
- UFW-configured proxy server.
- Installed [MongoDB](https://www.mongodb.com/try/download/community)

### Introduction

MongoDB is one of the most used modern web applications for a database. MongoDB is not secure by default. Once installed, one will have a difficult time before configuring it for authentication, since people can browse, write, delete, or modify data on your server without ever needing to log in or authenticate. Securing the database is simple and may be completed in a few steps. In this article, I'll show you how to protect your MongoDB setup by using some activation command lines.

### Check the environment

To check if MongoDB is running on Linux kernel, we use the command below:

```bash
#call mongod and specify the path.
mongod --dbpath = "C:\data\mongo"
#or use this below to check.
ps -e|grep 'Mongod'
```
The output if MongoDB is installed will be similar to this:
`909070 ttys023 2:43.486 ./mongodb`
To configure MongoDB we navigate to the default file location `/etc/mongodb.conf` where it runs on the default port. To change this file location, we use the command below:

```bash
$sudo Andrew/local/etc/mongodb.conf
```

If MongoDB is installed on the same machine where your web app is installed, there may be some communication between the database with the application to end this kind of linkage set the Ip address to 127.0.0.1 this automatically ends communication via the internet.

```bash
#network 
net:
    port: 27274
    bindIp: 127.0.0.1
```

Through binding Ip address this ensures that MongoDB runs in a safe network environment thus safeguarding incoming connection. This is done by changing the Ip address using the bind command:

```bash
#binding command for secure Vlan connection
bindIp: 192.168.1.7
```

### securing MongoDB

To secure your MongoDB, we use the following steps:

- Create a user with admin access.
- Turn on authentication.
- Assign administrative users access to the database.

### Create a user with system access

MongoDB version accepts connection from local Unix socket. As a result, it cannot connect a huge internet connection. Furthermore, authentication is disabled by default. Users having MongoDB installed can still have access to the database. To secure your database you need to add administrative user. To add an administrative user, we first connect to the Mongo  shell prompt using the command below: 

```bash
$mongo
```

The output displays the shell's version, the connection of MongoDB that is its IP address, and more warnings indicating database access control is not enabled. This shows that reading and writing to the database is unrestricted, insecure and anyone with access to the server can have control of the database. Due to this, we can check the list of databases available to the server. By running the command below:

```bash
#The command returns lists of every database on the server.
show dbs
```

 something like this will appear:

```output
db-job-admin   0.0091GB
db-jobs-new  0.0009GB
db-config  0.0001GB
local   0.0100GB
```

The output displays default databases, and any user can still find important data in one system. To end this situation, we add an administrative user by connecting to the database. To start connecting to the database, we call an admin user to the database using the command below:

```bash
use admin
```

Since the MongoDB environment comes installed with several JSON-based methods used in managing the database, we will use the javascript-based shell method that is used to create a user. The `db.createUser` method is used to add new users to the database. To run the db.createUser method, we use the command:

```bash
db.createUser({user, getLastError})
#field user contains the documents with authentication information about the user.
#getlasError can be optional, writes and checks if the user exists.
```

The method requires users to create a new user, if exists, an error message will return showing that the database already exists. when creating the user, you need to specify login credentials, passwords, and roles of the user to the database. As we have stated before, MongoDB stores data in JSON documents that hold data in its fields. For a JSON document to execute without any error message, one need to use curly braces to start and end the document created as shown below:
```bash
#note that without closing parenthesis MongoDB will still not run.
    use admin
    db.createUser({
        user: "AndrewKulundeng'",
        pwd: "xandrew12@12",#enter roles, closing braces and parenthis.
        role: [{role:"userAdminAnyDatabase", dp:"admin"}]})
```

The method executes properly to prompt the user to input password as shown:

```Output
*enter password used when creating the database, press enters to execute.*
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

Exist MongoDB after the operation. Users will be allowed to enter details after authentication is enabled and the MongoDB daemon restarts. we can as well restart using the command below:

```bash
mongod --auth --dbpath="C:\data\mongo" 0r
#press enters key to execute.
$sudo systemctl restart mongodb
```

### Turn on authentication

To make authentication to enable, edit `mongod.conf files` as we have done before then restart your mongo service. This will still allow users to access the database without varifying for passwords. They will not be able to make changes to the database since they do not have the correct username and password. Open the configuration file using the command below and move down to the security. Remove the #sign to the security and add authorization colon and set it to enable as shown:

```bash

usr/etc/mongod.conf
security:
```

Then add authentication parameter and set it to enable. Note that authorization is indented it will look like this:

```output
security:
  authorization: "enabled"
```
Close the command line and restart the mongo using the command:
```bash
$ sudo systemctl restart mongod
```

### Authentication Testing

To test the authentication is working correctly, connect to the database without placing the credentials and check the action of the database you are accessing if it's restricted or not. To check, use the command:

```bash
$mongo
```

No warning will appear since authentication is already enabled. The output will appear similar to this:

```Output
MongoDB shell version v3.5.0
```

The command `show dbs` is used to show if access is restricted.

```bash
show dbs
```

If there is no message displayed, we say that the authentication is running as expected. Users will not be able to access the database anad modify any other things in the database. Exit the shell by pressing `CTRL + C.` To check if the administrative user authenticates, we run the following commands to connect the user. The `-u` flag for a user to connect to and the `-p` flag requests the user for a password.

```bash
mongo -u AndrewKulundeng' -p --authentication database admin
```

Enter user password when prompted. Then issue shows the DBS command to show if the authentication is enabled:

```bash
showdbs
```

The command will return a list of databases that are currently running on the server. Thus showing that authentication is enabled successfully.

```Output
The output will show the admin, config file, and the local host to which the server is running.
admin 0.0056GB
config 0.00067GB
local 127.68.390/44
```

### Adding user to the database

To add a user to the command we use the command below:

```bash
-create new database
    >use std(student)#then create usernamed John and password
db.create({user:'John', pwd:'John@12?!', role:[{role:'manage', db: 'std',}]})
```
You can check if the user has been added using the commands discussed above.

### Wrapping it up

By completing this tutorial, we will be in the condition of having an administrative MongoDB set. Afterward, users can create roles and change usernames in the database.

Thanks for reading!
