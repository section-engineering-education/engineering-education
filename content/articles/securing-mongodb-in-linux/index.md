### Content
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Check the environment](#check-the-environment)
- [Securing MongoDB](#securing-mongodb)
- [Wrapping it up](#wrapping-it-up)

### Prerequisites
For a quick walkthrough in this editorial guide, you need to have the following in your machine:
- [Ubuntu](https://ubuntu.com/download/server) 20.04 server OS installed. 
- [MongoDB](https://www.mongodb.com/try/download/community)  installed.

### Introduction
MongoDB is one of the most used modern web applications to create databases. Despite the benefits of MongoDB, one of its default perks is security issues. Since MongoDB allows users to view, write, remove, and edit data on your server without requiring authentication, this may cause problems to your database. In just a few minutes, you'll discover how to secure and activate authentication on MongoDB.

### Securing MongoDB
To secure MongoDB, we will follow the steps below:
1. Create a user with admin access.
2. Turn on authentication.
3. Assign administrative users access to the database.
### 1. Create a user with system access
To create a user with system access, open the Linux terminal and run the command below to check if MongoDB runs in your system.
```bash
sudo sytemctl status mongodb
```
 ![1](/engineering-education/securing-mongodb-in-linux/1.png)

Next, connect to the shell using the command below:
```bash
$ mongo
```
![2](/engineering-education/securing-mongodb-in-linux/2.png)

The output above displays the shell version and more warnings showing that the database is unrestricted from users and anyone with access to the server controls the database.

Next, check list of databases in the shell by running the command below:
```bash
show dbs
```
![3](/engineering-education/securing-mongodb-in-linux/3.png)

The output above shows the default databases, and any user can find valuable data in the system. 

Next, connect to the admin database using the command below:
```bash
> use admin
```
![4](/engineering-education/securing-mongodb-in-linux/4.png)

Since the MongoDB environment comes installed with several `JSON-based methods` used in managing the database, we will use the `javascript-based` shell methods used to create a user. We initiate the `db.createUser` method to add new users to the database. 
```bash
db.createUser({user, getLastError})#field user contains the documents with authentication information about the user.
#getlasError can be optional, writes and checks if the user exists.
```
The method requires users to create a new user. Note that an error message appears if the data is present. When creating the user, you need to specify login credentials, passwords, and roles to the database. As mentioned before, MongoDB stores data in JSON documents that hold data in its fields. For a JSON document to execute without any error message, one needs to use curly braces to start and end the document.
The entire process is as shown from connecting admin to creating admin user:
```bash
    > use admin
    > db.createUser({
    ...		user: "Benard",
    ...		pwd: passwordPrompt(),
    #enter roles, closing braces and parenthis.
    ...		roles: [{role: "readwite", db: "config"}
				   ]
				   })
```
![5](/engineering-education/securing-mongodb-in-linux/5.png)

>**NOTE** Without closing the parenthesis, MongoDB will not run.
Next, exit the shell using the following command:
```bash
 exit
``` 
 Next, restart the mongo shell using the command below:
```bash
$ sudo systemctl restart mongodb
```
We will be proceed to authentication of the MongoDB server after creating a user with system access.

### 2. Turn on authentication
Edit the `mongod.conf` file and restart the mongo service to allow authentication. Though enabling authentication will still allow users to access the database without verifying passwords, they will not be able to make changes to the database since they do not have the correct username and password.
To access the `mongod.conf` configuration file, execute the command below: 
```bash
sudo nano usr/etc/mongod.conf
```
![6](/engineering-education/securing-mongodb-in-linux/6.png)
Next, remove the #sign from the security line, we add authorization and set it to enable. 
>**Note:** that `authorization` has two spaces from margin and looks like this:
```bash
security:
  authorization: "enabled"
```
Next, restart the MongoDB using the command below:
```bash
$ sudo systemctl restart mongod
```
Next, varify status of mongo shell using the command below:
```bash
$ sudo systemctl status mongod
```
The command will show that MongoDB is active and running in your system, as shown below.
![7](/engineering-education/securing-mongodb-in-linux/7.png)

Now that we have enabled authentication, we will proceed to test if it works correctly.

### Authentication Testing
When testing if authentication is working correctly, we need to connect to the database without placing the credentials. Then we check the actions of the database accessed if it's restricted. Execute the command below to connect to the shell:
```bash
$ mongo
```
There will be no warning that will appear to the database since authentication is enabled. 

![8](/engineering-education/securing-mongodb-in-linux/8.png)

 To confirm if access is limited, we can run the command below:
```bash
show dbs
```
When there is no message displayed, it means authentication is running as expected. Users will not be able to access the database and modify any other things in the database. Exit the shell by pressing `CTRL + C.` 
Next, check if the administrative user authenticates; we run the following commands to connect the user. 
```bash
mongo -u Benard -p --authenticationDatabase admin
 ```

 ![9](/engineering-education/securing-mongodb-in-linux/9.png)

The `-u` represents a flag for a user to connect to, and the `-p`  represents a flag requesting a user for a password.
Enter user password when prompted. Then issue shows the DBS command to show if the authentication is enabled:
```bash
show dbs
```

![10](/engineering-education/securing-mongodb-in-linux/10.png)

The output above only shows list of database that are currently running in the server after authentication is enabled.

### 3. Adding a user to the database
To add a new user to the database,  we use the command below:
```bash
> create new database
    > use std(student)#then create usernamed John and password
db.create({user:'John', pwd:'John@12?!', role:[{role:'manage', db: 'std',}]})
```

### Conclusion
By reading this tutorial, you will be in a position to secure MongoDB database server. In brief the tutorial explains how to add users to your database, set authentication and also add new users to the database. Thanks for taking time reading my tutorial.

### More reading
Check official [mongo](https://www.mongodb.com/) documentation.
