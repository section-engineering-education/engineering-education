---
layout: engineering-education
status: publish
published: true
url: /engineering-education/introduction-to-elastic-stack/
title: Introduction to Elastic Stack (ELK)
description: This article will cover the basics of Elastic Stack - which is a log management platform that can search, visualize, and manage log files.
author: elly-omondi
date: 2021-02-04T00:00:00-06:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-elastic-stack/hero.jpg
    alt: Elastic Stack image
---
[*Elastic stack (ELK - Elasticsearch, Logstash, and Kibana)*](https://www.elastic.co/elastic-stack) is a bundle of software components that can search, visualize, and manage log files (end to end log analysis).
<!--more-->
Computing devices perform activities and processes that upon completion result in logs that are stored as files. This log data can be present in servers (i.e. from completed user authentication processes) as well as mobile devices (i.e from activity log).
The Elastic stack (ELK) provides a log management platform for these log files.
### Overview
This article will cover:

- [What is Elastic Stack](#What-is-elastic-stack)

- [Components of the Elastic Stack](#Components-of-the-elastic-stack)

- [How ELK Works](#How-ELK-works)

- [Benefits of using ELK](#Benefits-of-using-ELK)

### What is Elastic Stack
Elastic stack, popularly known as the ELK Stack, is a bundle of software tools that provide the ability to search, view and manage log files. The ELK stack processes the logs (in any format) from all systems and applications in use and stores them as a JSON document.

The ELK gives users the ability to analyze these logs, to create meaningful visualisations, to perform infrastructure and system monitoring, allows develepors to do efficient troubleshooting, identify, and raise security issues.

The ELK stack is popular because it is an open-source software. Along with this, it is an easily scalable software which makes it the perfect choice for personal use as well as deploying it in your organization.

There is also a vendor supported paid version of the software suite with added functionality and added cloud support.

For many years, the Elastic Stack existed as a collection of three tools, (hence the acronym ELK), which included:

1. Elasticsearch

2. Logstash

3. Kibana

Recently, a fourth component, Beats, was added to the suite by the Elastic company. Thus, the Elastic Stack is made up of four independent, powerful, and compatible open source tools. All of the components of the stack can be used as standalone applications as they are compatible with a multitude of other applications.

![Flow diagram](/engineering-education/introduction-to-elastic-stack/flow-diagram.png)

[Image Source](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZVZmZFPL7blODx-p4eva1gachnZ407hX1Eg&usqp=CAU
)
### Components of the Elastic Stack
1. ### Elasticsearch
[**Elasticsearch**](https://www.elastic.co/elasticsearch/) is a distributed search and analytics engine (with Apache Lucene as the base). This distributed, open-source tool acts as the engine of the entire suite and supports all data types/formats i.e. texts, semi-structured data or even unstructured data.

It is essentially a really powerful database where all the logs are stored for other applications to retrieve later. Elasticsearch prides itself in scalability, robustness, speed and in its ability of sharding large data sets.

Sharding is the horizontal partitioning of data in a database to produce other sets of data that are spread across multiple computers on separate database server instances.

Its two primary roles within the stack are:
1. Storing and indexing data.

2. Search engine for querying data.

The search operations can be performed by some popular programming languages like Java and Python. Elasticsearch does not require schema since it is a NoSQL database and stores data in JSON format.

This software component can be installed and configured on-prem in Ubuntu, Windows, and Mac environments or be hosted and run on a cloud environment.

2. ### Logstash
[**Logstash**] (https://www.elastic.co/logstash) is an open source tool that imports data (logs), transforms and then sends them to Elasticsearch. Logstash uses pipeline architecture in the process of retrieving and sending data to Elasticsearch or other engines involved.

It supports diverse data types like logs, packets, or events that it collects from different sources.

Logstash comes with several default configurations when installed but also allows users to customize it to their preferred configurations. Logstash uses input, filter, and output plugins for transformation of logs and events.

#### Features of Logstash
- Cross platform - Logstash can run on any platform since it is built on JVM architecture.

- Versitile - accepts wide range of data formats.

- Supports HTTP requests and responses.

- Plugin Support - allows other software components to be added to enhance its features.

3. ### Kibana
[**Kibana**](https://www.elastic.co/kibana) is an open-source tool for data visualization and exploration that acts as a front end for the Elasticstack.

Kibana comes with a graphical user interface to generate and present data more intuitively. The graphical interface provides a better usability experience.

Since Elasticsearch supports curl and JSON queries, integrating Kibana with Elasticsearch makes browsing and data querying faster.
Kibana can be installed on users' devices or be run in a cloud environment.

Kibana provides the following visualizations features:

- Canvas

- Maps

- Time Series Visual Builder (TSVB)

4. ### Beats
[**Beats**](https://www.elastic.co/beats/) are open-source data collectors/shippers that can be installed in servers to send operational data directly to Elasticsearch or through Logstash for processing.

Beats act as agents for capturing diverse data types, i.e., audit data, log files, network traffic, and windows event logs, which can then become visible in Kibana after being transformed.

The Beats application involved in data shipping is determined by the data file being retrieved i.e:
- Winlogbeat - ships Windows Event log.
- Packetbeat - ships network traffic.
- Filebeat - ships system log files.

![Beats](/engineering-education/introduction-to-elastic-stack/beats-logo-color.png)

### How ELK works
Every event or process in a computer is documented as a log file. The following processes occur within the stack when using ELK for log analysis or log management.

- Beat applications like Filebeat or Winlogbeat collect the log files based on the servers involved, then parse the logs to Logstash or Elasticsearch directly.

- Elasticsearch, which is a searchable database, receives the incoming pipelined data from Logstash and stores them ready for querying and transformation.

- Kibana then presents the transformed and analyzed data through [dashboards](https://www.elastic.co/guide/en/kibana/current/dashboard.html) in a visually appealing manner, i.e., through the use of histograms, graphs, and heat maps based on the settings that are configured by users at installation.

### Benefits of using ELK
- ELK is dynamic and scalable - it supports small scale data as well as large scale data based on users tuning, thus giving small corporations a chance to perform log analysis.

- ELK is centralized - provides centralized logging thus can help identify and resolve issues related to multiple servers connected to it within a short time. This feature also provides real-time infrastructure monitoring of all servers.

- ELK is simple to set up, provision, and run just with a few clicks, both locally and in the cloud.

- Being an open-source suite, this log analysis platform is cost-effective.

### Relevant resources
- [Elastic Stack](https://www.elastic.co/elastic-stack)

- [Beats](https://www.elastic.co/beats/)

- [Kibana](https://www.elastic.co/kibana)

- [Dashboard](https://www.elastic.co/guide/en/kibana/current/dashboard.html)

- [ELK](https://www.tutorialspoint.com/how_to_deploy_the_elk_stack_in_production/index.asp)

---
Peer Review Contributions by: [Aakash Rawal](engineering-education/authors/aakash-rawal/) & [Louise Findlay](/engineering-education/authors/louise-findlay/)
