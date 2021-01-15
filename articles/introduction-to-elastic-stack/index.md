---
layout: engineering-education
status: publish
published: 
url: /engineering-education/introduction-to-elastic-stack/
title: Introduction to Elastic Stack(ELK)
description: This article will cover the basics of Elastic Stack - a log management platform
author: elly-omondi
date: 2021-11-08T00:00:00-01:00
topics: []
excerpt_separator: <!--more-->
images:


   - url: /engineering-education/introduction-to-elastic-stack/hero.jpg
    alt: ELK cover image 
---


[**Elastic stack** (ELK)](https://www.elastic.co/elastic-stack)  is a bundle of software components that can search, visualize, and manage log files(end to end log analysis).
<!--more-->

Computing devices perform activities and processes that upon completion result into logs that are stored as files. These log data can be  present in servers(i.e. from completed user authentication processes) as well as mobile devices (i.e from activity log).
The Elastic stack(ELK) provides a log management platform of these log files.



### Overview
This article will cover:
- [What is Elastic Stack](#What-is-elastic-stack)
- [Components of the Elastic Stack](#Components-of-the-elastic-stack)
- [How ELK Works](#CHow-ELK-works)
- [Benefits of using ELK](#Benefits-of-using-ELK)

### What is Elastic Stack

Elastic stack, popularly known as the ELK stack, is a bundle of software tools that provide the ability to search, view and manage log files. The ELK stack processes the logs(in any format) from all systems and applications in use and stores them as a JSON document.

The ELK gives users the ability to analyze these  logs to create meaningful visualisations, perform infrastructure and system monitoring, do efficient troubleshooting and even identify and raise security issues.

The ELK stack is popular because it is an open-source software. Along with this, it is an easily scalable software which makes it the perfect choice for personal use as well as deploying it in your organization. 

There is also a vendor supported paid version of the software suite with added functionality and added cloud support.

For many years, the Elastic Stack existed as a collection of 3 tools,(hence the acronym ELK),which included:
+ Elasticsearch
+ Logstash
+ Kibana

Recently, a fourth component, Beats , was added to the suite by the Elastic company.
The Elastic Stack is made up of 4 independent, powerful and compatible open source tools. All of the components of the stack can be used as standalone applications as they are compatible with a multitude of other applications.

![Flow diagram](/engineering-education/introduction-to-elastic-stack/Flow-diagram.png)

### Components of the Elastic Stack

1. ### Elasticsearch
[**Elasticsearch**] (https://www.elastic.co/elasticsearch/) is a distributed search and analytics engine (with apache lucene as the base).This distributed, open-source tool acts as the engine of the entire suite and supports all data types/formats i.e. texts, semi-structured data or even unstructured data. It is essentially a really powerful database where all the logs are stored for other applications to retrieve later. 
Elastic search prides itself in scalability, robustness, speed and in its ability of sharding large data sets.
Sharding is the horizontal partitioning of data in a database to produce other sets of data that are spread across multiple computers on separate database server instances.
Its two primary roles within the stack are:

- Storing and indexing data
- Search engine for querying data

The search operations can be performed by some popular programming languages like Java and Python.
Elasticsearch does not require schema since it is a NoSQL database and stores data in JSON format.
This Software Component can be installed and configured on-prem in Ubuntu, Windows and Mac environments or be hosted and run on a cloud environment (Majorly Amazon).

![Elasticsearch](/engineering-education/introduction-to-elastic-stack/elastic-search-logo-color.png)

2. ### Logstash
[**Logstash**] (https://www.elastic.co/logstash) is an open source tool that imports data(logs), transforms them and then send to elasticssearch. Logstash uses pipeline architecture in the process of retrieving and sending data to elastic search or other engines involved.
It supports diverse data types like logs, packets or events that it collects from different sources. 
Logstash comes with several default configurations when installed but also allows users to customize it to their preferred configurations. 
Log stash uses input , filter and output plugins for transformation of logs and events.

### Features of Logstash
* Cross platform - log stash can run on any platform since it is built on JVM architecture
* Versitile - accepts wide range of data formats
* Supports http requests and responses
* Plugin Support - allows other software components to be added into it too enhance its features.

![Logstash](/engineering-education/introduction-to-elastic-stack/logstash-logo-color.png)

3. ### Kibana
[**Kibana**] (https://www.elastic.co/kibana) is an open-source tool for data visualization and exploration that acts as a front end for the elastic stack.
Kibana comes with a graphical user interface to generate and present data more intuitively. The graphical interface provides a better usability experience.
Since elastic search supports curl and JSON queries, integrating Kibana with elastic search makes browsing and data querying faster.
Kibana can be installed on users' devices or be run in a cloud environment.


Kibana provides the following visualizations features:
   1. Canvas
   2. Maps 
   3. Time Series Visual Builder(TSVB)


![Kibana](/engineering-education/introduction-to-elastic-stack/kibana-logo-color.png)

4. ### Beats
[**Beats**] (https://www.elastic.co/beats/) are open-source data collectors/ shippers that can be installed in servers to send operational data directly to elasticsearch or through Logstash for processing.
Beats act as agents for capturing diverse data types, i.e., audit data, log files, network traffic, windows events log, which can then become visible in Kibana after being transformed.
The beat application involved in data shipping is determined by the data file being retrieved i.e :

- Winlogbeat - ships Windows Event log
- Packetbeat - ships network traffic
- Filebeat - ships system log files


![Beats](/engineering-education/introduction-to-elastic-stack/beats-logo-color.png)

### How ELK Works
Every event or process in a computer is documented as a log file.
The following processes occur within the stack when using ELK for log analysis or log management.

1. Beat applications like filebeat or winlogbeats collect the log files based on the servers involved, then parse the logs to Logstash or Elasticsearch directly.
2. Elasticsearch, which is a searchable database, receives the incoming pipelined data from Logstash and stores them ready for querying and transformation.
3 Kibana then presents data through [dashboards](https://www.elastic.co/guide/en/kibana/current/dashboard.html) in a visually appealing manner, i.e., through the use of histograms, graphs, and heat maps based on the settings that are configured by users at installation.

### Benefits of Using ELK
+ ELK is dynamic and scalable - support small scale data as well as large scale data based on users tuning, thus giving small corporations a chance to perform log analysis.
+ ELK is centralized - provides centralized logging thus can help identify and resolve issues related to multiple servers connected to it within a short time. This feature also provides real-time infrastructure monitoring of all servers.
+ ELK is simple to set up, provision, and run just with a few clicks, both locally and in the cloud.
+ Being an open-source suite, this log analysis platform is cost-effective.


### Relevant Resources
- [Elastic Stack](https://www.elastic.co/elastic-stack)
- [Beats](https://www.elastic.co/beats/)
- [Kibana](https://www.elastic.co/kibana)
- [dashboard] (https://www.elastic.co/guide/en/kibana/current/dashboard.html)
- [ELK](https://www.tutorialspoint.com/how_to_deploy_the_elk_stack_in_production/index.asp)