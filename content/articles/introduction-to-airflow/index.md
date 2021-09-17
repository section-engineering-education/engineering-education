---
layout: engineering-education
status: publish
published: true
url: /introduction-to-airflow/
title: Introduction to Airflow
description: In this article, we are going to explore the basics of Airflow and understand what makes it so popular.
author: adith-bharadwaj
date: 2020-10-10T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-airflow/hero.jpg
    alt: airflow example image
---
According to the [official documentation](https://airflow.apache.org/), *Airflow is a platform created by the community to programmatically author, schedule, and monitor workflows*.
<!--more-->

Airflow is a scalable and extensible platform that is rapidly gaining popularity in the data science community. In this article, we are going to explore the basics of Airflow and understand what makes it so popular.

### What is Airflow?
*Airflow is an **open-source** tool, written in [Python](https://www.python.org), for automating and scheduling tasks and workflows.* A workflow can be defined as a sequence of tasks that run on a specific schedule or get triggered by an event. Workflows are frequently used to handle big data processing [pipelines](https://www.alooma.com/blog/what-is-a-data-pipeline). A pipeline is a set of data processing elements connected in series. In a data pipeline, the output of one element is given as input to the next element in the series and so on. Airflow was created by Airbnb and donated to the Apache software foundation as an open-source project.

A typical workflow looks like this:

```bash
<ul>
<li>Extract data from the source(database, API, etc.)</li>
<li>Process the data by sending it somewhere</li>
<li>Monitor the process</li>
<li>Store the data in a data warehouse</li>
<li>Transform the data and make it usable for analytics</li>
<li>Analyze the data and send the report by email.</li>
</ul>
```

Airflow automates the process of monitoring, scheduling, and distributing these tasks in workflow across nodes. In this context, a node is a computer or a [virtual machine](https://www.vmware.com/topics/glossary/content/virtual-machine). To accomplish this, Airflow provides a framework and a rich library to define these tasks in Python. It provides an aesthetic UI to view and monitor workflows in a web-based application and is extensible through plugins.

![pipeline](/engineering-education/introduction-to-airflow/pipelines.png)

### Core concepts
#### DAGs
[DAGs](https://en.wikipedia.org/wiki/Directed_acyclic_graph) are the core entities in Airflow's architecture. DAG stands for Directed Acyclic Graph. DAGs are a series of tasks that are executed as part of the workflow. For instance, each of the steps in the workflow described above is a part of the DAG. It describes the sequence in which tasks are executed and also tells us how tasks are dependent on each other. Some tasks might depend on the output of other tasks, and this creates a [dependency graph](https://en.wikipedia.org/wiki/Dependency_graph) that is managed by Airflow.  

![dags](/engineering-education/introduction-to-airflow/dag.png)

#### Operators
According to the documentation, an operator describes a single task in a workflow, and are usually (but not always) atomic, meaning they can stand on their own and don’t need to share resources with any other operators. In other words, an operator determines what a task does in the DAG. Some operators that Airflow provides are:

[BashOperator](https://airflow.apache.org/docs/stable/_api/airflow/operators/bash_operator/index.html#airflow.operators.bash_operator.BashOperator) - This operator can be used to execute bash commands in Python.

[PythonOperator](https://airflow.apache.org/docs/stable/_api/airflow/operators/python_operator/index.html#airflow.operators.python_operator.PythonOperator) - This operator can call functions written in Python.

[EmailOperator](https://airflow.apache.org/docs/stable/_api/airflow/operators/email_operator/index.html#airflow.operators.email_operator.EmailOperator) - This operator can be used to send emails to one or more recipients.

[SimpleHttpOperator](https://airflow.apache.org/docs/stable/_api/airflow/operators/http_operator/index.html#airflow.operators.http_operator.SimpleHttpOperator) - This operator is used to send HTTP requests. Navigate to [this](https://www.tutorialspoint.com/http/http_requests.htm) link to understand more about HTTP requests.

### Installing Airflow
Since Airflow is written completely in Python, we can use [pip](https://pip.pypa.io/en/stable/) (The package manager for Python). You can install Airflow on your local system by running the following command on the terminal:

```bash
pip3 install apache-airflow
```

Airflow configuration files and database info will be stored in the environment variable called AIRFLOW_HOME. According to [Wikipedia](https://en.wikipedia.org/wiki/PATH_(variable)), an environment variable or PATH variable on Unix-like operating systems specifies a set of directories where executable programs are located. In general, each executing process or user session has its own PATH setting. By default, Airflow will create the directory `~/airflow/`, but you can change the default path to a directory of your choice. To change the airflow home path, enter the following command on the terminal:

```bash
export AIRFLOW_HOME=<the path to the directory of your choice>
```

Example:
```bash
export AIRFLOW_HOME=~/adith/airflow
```

Airflow uses a database in the back-end to store [metadata](https://whatis.techtarget.com/definition/metadata) and other workflow-related information. In simple terms, metadata is data that describes other data. For example, metadata can be the number of rows or columns in the database, when the database was created, etc.

By default, [SQLite](https://www.sqlite.org/index.html), a lightweight, and beginner-friendly database is used by Airflow. You can change the default settings to a database of your choice by following [this documentation](https://airflow.apache.org/docs/stable/howto/initialize-database.html). Since SQLite is a beginner-friendly database, we are going to stick with that.

To initialize the database, type the following command in the terminal:

```bash
airflow initdb
```

As mentioned earlier, Airflow provides an aesthetic web UI that allows us to view and monitor the DAGs. To initialize the web server and start the web UI, type the following command on the terminal:

```bash
airflow webserver
```

This starts the server on your localhost. By default, Airflow uses [port](https://en.wikipedia.org/wiki/Port_(computer_networking)) 8080. A port is an endpoint that allows external devices to communicate with the computer. To run the UI in a different port, run the following command:

```bash
airflow webserver -p 8123
```

This starts the web UI in port 8123. To access it, go to a web browser of your choice and type: `http://localhost:8123`

Congratulations! You have successfully installed and run Apache Airflow on your local system.

### Conclusion and Further Reading
In conclusion, Airflow is a powerful framework to automate the process of workflow management and scheduling. Airflow can be used in a wide array of use cases such as:

1. [Data warehousing](https://www.tutorialspoint.com/dwh/dwh_data_warehousing.htm): To clean, organize, and store data in a data warehouse.
2. [Machine learning](https://en.wikipedia.org/wiki/Machine_learning): To automate and monitor various machine learning workflows.
3. [Email reporting](https://towardsdatascience.com/email-automation-with-python-72c6da5eef52): To automate the process of generating reports and sending them through emails, etc.

Another advantage is that Airflow is open source and has a great community of developers to support and contribute to the project. If you require a new operator or a new feature, you can customize and add your code making it highly extensible.

Whether you are a software developer, data engineer, or a data scientist, it would be helpful to learn and explore Airflow. In this article, we covered the basics of airflow and its installation. In the next article, we are going to write our very own application and run it using Airflow.

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
