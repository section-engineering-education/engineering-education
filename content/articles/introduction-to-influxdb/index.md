---
layout: engineering-education
status: publish
published: true
url: /introduction-to-influxdb/
title: Introduction to InfluxDB
description: In this tutorial, we will go through the basics of time-series data and the most popular time-series database called InfluxDB. We will install InfluxDB on our local system and execute an array of queries on time-series data.
author: adith-bharadwaj
date: 2021-01-20T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-influxdb/hero.jpg
    alt: Introduction to InfluxDB Hero Image
---
DBMS or database management systems play a key role as the foundational building blocks of any modern application. Whether you are a database administrator, a developer, or an IT professional, extensive knowledge of databases is essential. In this article, we will look at a class of databases called time-series databases and understand how they work.
<!--more-->
We are also going to explore the basics of the most popular time-series database called Influx DB. By the end of this article, you will have Influx DB installed on your system and be able to execute custom queries. 
  
### Table of contents
- [Prerequisites](#prerequisites)
- [Time Series Database](#time-series-database)
- [InfluxDB](#influxdb)
- [Installing InfluxDB](#installing-influxdb)
- [Running InfluxDB](#running-influxdb)
- [Executing Queries](#executing-queries)
- [Conclusion](#conclusion)
  
### Prerequisites
- Basic understanding of [database management systems](https://www.tutorialspoint.com/dbms/index.htm).
- Basic understanding of [Python](https://www.python.org/about/gettingstarted/).

### Time series database
According to the [official documentation](https://www.influxdata.com/time-series-database/), a time-series database (TSDB) is a database optimized for timestamped or time-series data. Time series data are simply measurements or events that are tracked, monitored, downsampled, and aggregated over time. 

Furthermore, time-series databases are built to specifically handle this type of data with a timestamp associated with it. 

Let us consider a few examples to understand this better. The stock market is a very volatile and time-dependent system. It is essential to monitor and store this information along with the timestamp of when the transactions happened. Another example would be gathering sensor data on temperature, pressure, or humidity. 

These data types require a time associated with each record to help us understand the "trend" or analyze a pattern that changes over time. However, one might ask: Why can't we just add a column/field called time and keep track of the timestamp when the event occurred. 

This is possible, but there are two ways to do this: When we get a new record or data for a particular value such as temperature, should we overwrite the previous reading, or should we create a new row in the database? 

Both methods will provide the current or most recent values. However, we can only analyze the trend of how the system changes over a period of time if we insert a new row. This is what time-series databases are optimized to do.

### InfluxDB
InfluxDB is the most popular open-source time-series database, created by a company called Influx data in 2013. InfluxDB provides APIs for various popular programming languages such as Python, Golang, Java, etc. 

#### Installing InfluxDB
1. Head over to [this](https://portal.influxdata.com/downloads/) link to download InfluxDB from the official website. 

![Select](/engineering-education/introduction-to-influxdb/select.png)

2. Click on v1.8.3. It will open a window providing various options to download it. Choose the most convenient method and follow the commands given. Since I am using Ubuntu, I will execute the following commands:

```bash
wget https://dl.influxdata.com/influxdb/releases/influxdb_1.8.3_amd64.deb
sudo dpkg -i influxdb_1.8.3_amd64.deb
```

![Download](/engineering-education/introduction-to-influxdb/download.png)

3. You can also install it using Docker. Run the following command:

```bash
docker pull influxdb:1.8
```

Congratulations! You have successfully installed InfluxDB on your system. 

#### Running InfluxDB
Now that you have InfluxDB installed on your system, you can run it and execute commands using the terminal or command line. InfluxDB also provides an aesthetic UI where you can run queries and create databases. 

However, the UI is deprecated in the 1.8.3 version and is available in the 2.0.3 version. If you wish to use the UI, install the 2.0.3 version instead. 

According to the [official documentation](https://docs.influxdata.com/influxdb/v1.8/tools/influxd/), The `influxd` command starts and runs all the processes necessary for InfluxDB to function. 

Open a terminal or command line and execute the following command:

```bash
influxd
```

![influxd](/engineering-education/introduction-to-influxdb/influxd.png)

This starts the server and runs all the processes necessary for InfluxDB. Open another terminal window and execute the following command to get access to the InfluxDB shell:

```bash
influx
```
![Influx](/engineering-education/introduction-to-influxdb/influx.png)

This starts a shell that allows us to execute queries. 

#### Executing queries
Now that you have the Influx shell running, let's execute some queries:

Create a database called "test" by executing the following command:

```sql
CREATE DATABASE test
```

To see if the database has been created or not, execute the `show` databases command:

```sql
SHOW DATABASES	
```
![Show](/engineering-education/introduction-to-influxdb/show_databases.png)

To use and switch to "test", execute the `use` command:

```sql
USE test
```

InfluxDB requires a certain format for inserting data. Every record or row is referred to as a "point" and has 4 elements: 

- **measurement:** The name of the measurement and requires one measurement per point. This is similar to the "table" in a conventional database system such as SQL.

- **tag:** This is a key-value pair that corresponds to a row in the table.  

- **field:** The field is an optional argument and is a set of key-value pairs that store information. 

- **timestamp:** This is also an optional argument that tells us the time at which the data was inserted. If the timestamp is not specified, InfluxDB automatically stores the current time as the timestamp. 

For more information on these elements, have a look at the [official documentation](https://docs.influxdata.com/influxdb/cloud/reference/key-concepts/data-elements/). 

The format for inserting data is as follows:

```sql
INSERT <measurement name>,key1=value1 key2=value2 key3=value3 ..... , fields(optional), timestamp(optional)
```

Let's create a measurement called temperature that stores the temperature at a certain location. Remember, a measurement is similar to a table in SQL.

```sql
INSERT temperature,location=USA value=25
INSERT temperature,location=CANADA value=27
INSERT temperature,location=INDIA value=24
```

Now, we have inserted 3 rows into the measurement called temperature. We can make sure you don't give a space between the comma that separates "temperature" and "location" because this will throw a syntax error. 

To view the inserted data, execute the following query:

```sql
SELECT * FROM temperature
```

![Select temp](/engineering-education/introduction-to-influxdb/select_temperature.png)

### Conclusion
In this tutorial, we have gone through the basics of time-series data and the most popular time-series database called InfluxDB. We installed InfluxDB on our local system and executed an array of queries on time-series data. In the next tutorial, we will build an analytics system using the API provided by InfluxDB for Python. 

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
