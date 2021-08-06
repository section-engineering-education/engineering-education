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

![AWS Sign in Page](/engineering-education/configuring-a-relational-database-server-on-aws/yx83_gcczm2gexkpkvnf.png)

In the `search bar`, type `Security groups`. Then select `Security groups` under `Features`.

![AWS search for security groups](/engineering-education/configuring-a-relational-database-server-on-aws/pg1md67csewa-8yf9vdz.png) 

In the new page, select `Create Security Groups`, as shown below:

![AWS create security group](/engineering-education/configuring-a-relational-database-server-on-aws/yp7kmuqrgmfdivlnupop.png)

We now need to enter the details of the new security group we are creating, as demonstrated below:

![AWS security group detaIls](/engineering-education/configuring-a-relational-database-server-on-aws/2a7sjkc7ytwleipuquvj.png)

Another critical step is to set the `inbound` and `outbound `rules of the security group. 

The `inbound rules` specify the type of traffic that will be allowed into the server. 

`Outbound rules` determine the traffic that will leave the MYSQL server.

The `source` and `destination` value for inbound and outbound rules are set to `any` by default. You might want to set it to the IP of your production server so that the database only sends and receives traffic from this server. This makes the database server less vulnerable. 

![AWS set inbound and outbound rules](/engineering-education/configuring-a-relational-database-server-on-aws/7qifp47qibfzscosytmu.png)

Save the `new security group`, as shown below: 

![Saving security group](/engineering-education/configuring-a-relational-database-server-on-aws/x2lp48ehuwrd3vg8dzds.png)

### Setting up a Relational Database Server
On the AWS management console, input `RDS` in the `search bar` and select `RDS`.

![Search for rds](/engineering-education/configuring-a-relational-database-server-on-aws/9ukto-b9k3tfjdrv8ey3.png)

Under the `Create database` section, select `Create database`.

![Create database](/engineering-education/configuring-a-relational-database-server-on-aws/woxpen43dcloznzlv1rg.png)

To set up the `MySQL` database, navigate to the `Engine Options`, select `MySQL`. In the `template` section, choose the `free tier` option.

![Configuration page](/engineering-education/configuring-a-relational-database-server-on-aws/gt0xuhlof8larfnforu8.png)

![Configuration page](/engineering-education/configuring-a-relational-database-server-on-aws/c_miqwf50spnlpaotgmo.png)

Fill out the `fields` in the `Settings` section as follows:

![Settings configuration](/engineering-education/configuring-a-relational-database-server-on-aws/xapdyknvnatvl6x6zs_x.png)

Leave all other default settings on the page and scroll down to the `connectivity` part. We need to specify the `security group` that we created earlier in this section.

In the `Existing VPC` security group menu under the `Connectivity` section, search for the security group and name it as `helloworld-db`. We also need to enable public access.

![Search vpc](/engineering-education/configuring-a-relational-database-server-on-aws/g7tw7wwvd-x-kwx2xr5u.png)

![Select vpc security group](/engineering-education/configuring-a-relational-database-server-on-aws/7ibngr6ut-c--igkyezn.png)

Select the `security group` and proceed to the next step.

In the `Additional Configuration` section, set the name of the initial database. 

![Set database name](/engineering-education/configuring-a-relational-database-server-on-aws/u94_rbkhcn4anyu8zjsh.png)

Finally, click on the `Create database` button 

![Create database button](/engineering-education/configuring-a-relational-database-server-on-aws/eok26fqxrcha19wihv3j.png)

In the new page, you’ll see an option to view your database credentials. 

![View database credentials](/engineering-education/configuring-a-relational-database-server-on-aws/qwjjgh1so94eyq4iz5he.png)

This will display the credentials you entered when creating the database. You can view other parameters by clicking on the database name. 

![Connecting parameters](/engineering-education/configuring-a-relational-database-server-on-aws/rnwspqsczi1jrjckra_-.png)

### Connecting the RDS Server to MySQL Workbench
MySQL workbench is an integrated development environment for the MySQL server. You can download it from [here](https://dev.mysql.com/downloads/workbench/).

![mysql workbench setup](/engineering-education/configuring-a-relational-database-server-on-aws/w0u3ogkybhjbm7fvtihe.png)

![mysql workbench setup](/engineering-education/configuring-a-relational-database-server-on-aws/z0dllyqtzsnq0ykitlkh.png)

![mysql workbench setup](/engineering-education/configuring-a-relational-database-server-on-aws/-u_e_1suveiyh8kbdcbz.png)

If case you did not set a password, you will be prompted to do so. 

![mysql password](/engineering-education/configuring-a-relational-database-server-on-aws/12oqesy3zgigzg4pf91f.png)

We can now execute SQL queries.

![Execute sql query](/engineering-education/configuring-a-relational-database-server-on-aws/-v0ixhizng6bemxiu4eg.png)

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

### Conclusion
In this tutorial, we have configured a Relational Database Server on Amazon Web Services successfully. We also explored how to establish a connection with the RDS using MySQL Workbench and Python.

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)