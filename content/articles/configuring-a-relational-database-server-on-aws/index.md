---
layout: engineering-education
status: publish
published: true
url: /configuring-a-relational-database-server-on-aws/
title: How to Configure a Relational Database Server on AWS
description: This tutorial will guide the reader on how to configure a relational database server on Amazon Web Services.
author: 
date: 2021-07-25T00:00:00-06:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/configuring-a-relational-database-server-on-aws/hero.png
    alt: Configuring a Relational Database Server on AWS
---
There are numerous reasons as to why you should use Amazon Web Services to host your database. One of them is that AWS offers a variety of options for scaling and safeguarding your databases.
<!--more-->
However, navigating the AWS configuration settings might prove difficult and existing documentations are not always user-friendly.

Therefore, this article will help you set up a relational database server on AWS. We will use [MySQL Workbench](https://www.mysql.com/products/workbench/) to connect to the RDS.

### Setting up a Security Group
The first step is to sign in to your [AWS account](https://console.aws.amazon.com/?nc2%3Dh_m_mc*)

![AWS Sign in Page](/engineering-education/configuring-a-relational-database-server-on-aws/aws_signin_page.png)

In the `search bar`, type `Security groups`. Then select `Security groups` under `Features`.

![AWS search for security groups](/engineering-education/configuring-a-relational-database-server-on-aws/search_secutiry_group.png) 

In the new page, select `Create Security Groups`, as shown below:

![AWS create security group](/engineering-education/configuring-a-relational-database-server-on-aws/aws_create_security_group.png)

We now need to enter the details of the new security group we are creating, as demonstrated below:

![AWS security group detaIls](/engineering-education/configuring-a-relational-database-server-on-aws/aws_security_group_detail.png)

Another critical step is to set the `inbound` and `outbound `rules of the security group. 

The `inbound rules` specify the type of traffic that will be allowed into the server. 

`Outbound rules` determine the traffic that will leave the MYSQL server.

The `source` and `destination` value for inbound and outbound rules are set to `any` by default. You might want to set it to the IP of your production server so that the database only sends and receives traffic from this server. This makes the database server less vulnerable. 

![AWS set inbound and outbound rules](/engineering-education/configuring-a-relational-database-server-on-aws/aws_firewall_rules.png)

Save the `new security group`, as shown below: 

![Saving security group](/engineering-education/configuring-a-relational-database-server-on-aws/aws_save_secutiry_group.png)

### Setting up a Relational Database Server
On the AWS management console, input `RDS` in the `search bar` and select `RDS`.

![Search for rds](/engineering-education/configuring-a-relational-database-server-on-aws/aws_search_rds.png)

Under the `Create database` section, select `Create database`.

![Create database](/engineering-education/configuring-a-relational-database-server-on-aws/aws_create_database.png)

To set up the `MySQL` database, navigate to the `Engine Options`, select `MySQL`. In the `template` section, choose the `free tier` option.

![Configuration page](/engineering-education/configuring-a-relational-database-server-on-aws/aws_rds_configuration_page_1.png)

![Configuration page](/engineering-education/configuring-a-relational-database-server-on-aws/aws_rds_configuration_page_2.png)

Fill out the `fields` in the `Settings` section as follows:

![Settings configuration](/engineering-education/configuring-a-relational-database-server-on-aws/aws_rds_configuration_setting.png)

Leave all other default settings on the page and scroll down to the `connectivity` part. We need to specify the `security group` that we created earlier in this section.

In the `Existing VPC` security group menu under the `Connectivity` section, search for the security group and name it as `helloworld-db`. We also need to enable public access.

![Search vpc](/engineering-education/configuring-a-relational-database-server-on-aws/aws_rds_search_vpc.png)

![Select vpc security group](/engineering-education/configuring-a-relational-database-server-on-aws/aws_rds_select_vpc.png)

Select the `security group` and proceed to the next step.

In the `Additional Configuration` section, set the name of the initial database. 

![Set database name](/engineering-education/configuring-a-relational-database-server-on-aws/u94_rbkhcn4anyu8zjsh.png)

Finally, click on the `Create database` button 

![Create database button](/engineering-education/configuring-a-relational-database-server-on-aws/aws_rds_create_database_button.png)

In the new page, you’ll see an option to view your database credentials. 

![View database credentials](/engineering-education/configuring-a-relational-database-server-on-aws/aws_rds_create_db_credentials.png)

This will display the credentials you entered when creating the database. You can view other parameters by clicking on the database name. 

![Connecting parameters](/engineering-education/configuring-a-relational-database-server-on-aws/aws_rds_connecting_params.png)

### Connecting the RDS Server to MySQL Workbench
MySQL workbench is an integrated development environment for the MySQL server. You can download it from [here](https://dev.mysql.com/downloads/workbench/).

![mysql workbench setup](/engineering-education/configuring-a-relational-database-server-on-aws/mysql_workbench_1.png)

![mysql workbench setup](/engineering-education/configuring-a-relational-database-server-on-aws/mysql_workbench_2.png)

![mysql workbench setup](/engineering-education/configuring-a-relational-database-server-on-aws/mysql_workbench_3.png)

If case you did not set a password, you will be prompted to do so. 

![mysql password](/engineering-education/configuring-a-relational-database-server-on-aws/mysql_workbench_password.png)

We can now execute SQL queries.

![Execute sql query](/engineering-education/configuring-a-relational-database-server-on-aws/mysql_create_table_query.png)

### Connecting to the RDS server with Python
In this section , we will use the MySQL Connector Python module to communicate with the MySQL server. 

We need the following parameters to establish the connection:

| Parameter |  Description  |
| -----------| ---------------                   |
| Username | The username you entered while creating the RDS  |
| Password          | The password you entered while creating the RDS|
| Host name  | This can be seen in the Connectivity&Security section   |
| Database name| The database name you entered in the additional information section|

Next we should install the `mysql-connector-python` library using the command below:

```py
pip install mysql-connector-python
```

We can now create `tables` and perform `CRUD` operations.

### Creating a database table

```py
import mysql.connector
try:
    # Create Connection
    connection = mysql.connector.connect(
        host="helloworld.cb06vljwaire.us-east-1.rds.amazonaws.com",
        database="mydatabase",
        user="wiseman",
        password="your password",
    )
    # SQL query to create a new table
    create_table_query = """CREATE TABLE people ( 
                             id int(11) NOT NULL,
                             firstname varchar(250) NOT NULL,
                             lastname varchar(250) NOT NULL,
                             age  INT NOT NULL,
                             PRIMARY KEY (Id)) """
    cursor = connection.cursor()
    result = cursor.execute(create_table_query)
except mysql.connector.Error as error:
    print("Failed to create table in MySQL: {}".format(error))
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")
```

To create the database table, we initiated the database connection in the `connection` variable. The keyword arguments passed into the `mysql.connector.connect` method is the credentials we discussed earlier (host, database, user, password). The actual query was created in the `create_table_query`. Also, take note that we have to create a connection cursor in the `cursor` variable. We executed the query in the `result` variable. In case you are wondering why the code is in a `try/except` block, it is good practice to execute database calls in a `try/except` block (if something goes wrong, the whole program won't crash).

### Conclusion
In this tutorial, we have configured a Relational Database Server on Amazon Web Services successfully. We also explored how to establish a connection with the RDS using MySQL Workbench and Python.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)