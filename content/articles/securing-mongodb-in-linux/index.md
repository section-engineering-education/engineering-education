### Content
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Check the environment](#check-the-environment)
- [Securing MongoDB](#securing-mongodb)
- [Create a user with system access](#create-a-user-with-system-access)
- [Turn on authentication](#turn-on-authentication)
- [Testing Authentication Settings](#testing-authentication-settings)
- [Conclusion](#conclusion)


### prerequisites
To complete the tutorial, one needs the following:
- A server running Ubuntu 20.05. Needing a non-root authoritative user as well as a UFW-configured proxy server.
- MongoDB installed on your server.

### Introduction
MongoDB is a popular document database used in modern web applications. MongoDB is not secure by default. You're going to have a difficult time if you install MongoDB and launch it without configuring it for authentication. People can browse, write, delete, or modify data on your server without ever needing to log in or authenticate. Securing the database is simple and may be completed in a few steps. In this editorial, I'll show you how to protect your MongoDB setup by using some activation command lines.
### Check the environment 
The command below checks if MongoDB is running in the Linux kernel. We can run the command below in the terminal to check the connection:

```bash
#call mongod and specify the path.
mongod --dbpath = "C:\data\mongo"
#or use this below to check.
ps -e|grep 'Mongod'
```
Something similar to this will appear to MongoDB is installed.
Output
989070 ttys023 2:43.486 ./mongodb

### securing MongoDB
MongoDB is secured using the specific procedure:
- Create a user with system access.
- Turn on authentication.
- Assign administrative users access to the database.
###  Create a user with system access
MongoDB version accepts connection from local Unix socket. As a result, it cannot connect a huge internet connection. Furthermore, authentication is disabled by default. That is users, having MongoDB installed can have full access to the database. To add an Administrative user, connect to the Mongo shell prompt. 
To connect to the Mongo shell prompt, we use the command below:

```bash
mongo
```
Output
MongoDB shell version v3.6.7

connecting to: mongodb 127.0.0.1/27027 

The shell's version is displayed. More warnings are displayed, indicating database access control is not enabled. Access to the data and database for reading and writing is still unrestricted. That is, anyone with access to the server can control the database.

To have shown how to access Mongo's:
```bash
#The command returns lists of every database on the server.
show dbs
```
 something like this will appear:
```
db-job-admin   0.0091GB
db-jobs-new  0.0009GB
db-config  0.0001GB
local   0.0100GB
```
The output above displays only the default databases. Any user can still find sensitive data in one system. To end this vulnerability, we add an administrative user, first by connecting to the admin database. Information like passwords, roles, and usernames are stored here.
```bash
use admin
```
MongoDB environment comes installed with several Javascript-based shell methods, which are being used to manage the database. An example is a DB.createUser method used to add a new user to the database when the method is executed.

To run the db.createUser method, we use the command:
```bash
db.createUser(
```
The method requires one to specify login credentials, passwords, usernames, and roles of the user. MongoDB stores data in JSON-like documents, thus when creating users all you are doing is creating documents to hold user data in fields. Curly braces are used to start and end JSON documents in MongoDB. Note MongoDB will not be able to register the `db.createuser` method without closing parenthesis.
```bash

    use admin
    db.createUser({
     "user":"AndrewOwino",
     "pwd":"andrew@1234",
 # enter roles:
roles: [ { "role":"userAdminAnyDatabase", db: "admin" }]
 
# enter a closing brace. 
}
#enter a closing parenthesis.
}
```

The method executes properly to prompt the user to input password as shown:

```
Output

Enter password:
Choose a strong password of your choice, and then you will receive a confirmation that the user  is added: 
Output
Successfully added user: {
    "user" : "Andrew",
    "roles" : [
        {
            "role" : "userAdminAnyDatabase",
            "db" : "admin"
        },
        "AdminDatabase"
    ]
}

```
After the operations of creating an admin user, exit the MongoDB. Users will be allowed to enter details after authentication is enabled and the MongoDB daemon restarts. we can as well restart using the command below:
```bash
mongod --auth --dbpath="C:\data\mongo"
#press enters key to execute.
```

### Turn on authentication
To activate authentication, make changes to `mongod.conf files.` After enabling it, restart the Mongo service. Users will still be able to access the database without verification, but they are unable to implement changes or alter any records until they provide correct user credentials, such as a passcode.
To open configuration file using nano:
```
sudo nano /etc/mongod.conf
 ```
 Nagivate down find the commented-out security section:
```bash
/etc/mongod.conf
```
Run the command below:
```bash

/etc/mongod.conf

security:
```
Add authorization parameter and set it to enable. It will look like this: 
```
/etc/mongod.conf

security:
  authorization: enabled
```

### Testing Authentication Settings
To start testing the authentication added if working correctly, one needs to connect without specifying credentials, then check if the actions are restricted. To check, use the command:
```bash
mongo
```
No warning will appear since authentication is already enabled. The output will appear similar to this:

```
Output
MongoDB shell version v4.5.0
connecting to: mongodb://128.2.1.0:27097/?compressor=disabled&gssapiservicename=mongodb
shell helper=show@src/mongo/shell.js.840:42
MongoDB server version: 3.6.0
```

To confirm whether your access is restricted, run the `show dbs` command again:
```bash
show dbs
```
If the command does not return any information, we can say that the authentication setting is running as expected. Again one will not create users or perform other tasks without authentication.  Exit the shell by pressing `CTRL + C.`
To check if the administrative user authenticates, we run the following commands to connect the user.  The '-u flag' comes before the name of users to whom you connect. The '-p flag' requests the user for a password.
 
```bash
mongo -u Andrew -p --authentication database admin
 ```
 Enter user password when prompted. Then issue shows the DBS command to show if the authentication is enabled:

```bash
showDBSs
 ```
Because authentication was successful, the command will return a list of all databases running on the server as shown below:

```
Output
admin   0.000GB
config  0.000GB
local   0.000GB
```
Show that authentication is enabled successfully. 
### Conclusion
By completing this tutorial, we will be in the condition of having an administrative MongoDB set. Afterward, users can create roles and change usernames in the database.