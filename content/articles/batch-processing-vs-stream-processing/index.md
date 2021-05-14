---
layout: engineering-education
status: publish
published: true
url: /batch-processing-vs-stream-processing/
title: Batch Processing vs. Stream Processing
description: This article will discuss batch processing and stream processing, their benefits, a few drawbacks, and some use cases.
author: eric-kahuha
date: 2021-01-21T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/batch-processing-vs-stream-processing/hero.jpg
    alt: Batch Processing vs. Stream Processing example image
---
Organizations are leveraging cloud technologies and big data to promote a data-driven decision making culture, modernize data centers, and improve traditional information technology structure. Cloud computing has transformed the data analytics industry in many aspects.
<!--more-->
Particularly, cloud-based technologies ensure proper data management structure. However, this is faced with the challenge of getting large volumes of data processed faster. Batch processing and stream processing are two primary solutions to process large data sets faster.

This article discusses batch processing and stream processing, their benefits, drawbacks, and use cases.

### An overview of batch processing
In batch processing, large data volumes are processed in a batch or a group within a specified time interval. The batch processing system is programmed so that once it is fed with a set of data files as input, it processes the data and then produces a set of data files as output.

You have to wait for a certain amount of raw data to accumulate before running the extract, transform, load (ETL) process in batch processing. [ETL](https://www.webopedia.com/definitions/etl/) represents three database functions (extract, transform, load), that pull data out of a database, transform the data by performing concatenations, calculations, and loads the data into another data warehouse system.

Basically, in batch processing, data is available for analysis after an hour or a few days. Batch ETL is run on a specified schedule, for instance, every 24 hours. You can also set the system to run batch ETL once the data reaches a certain limit.

### An overview of stream processing
In-stream processing, data is processed as soon as it arrives at the storage layer, unlike in batch processing, where you have to wait for data to accumulate. The data generated is processed in sub-second timeframes. 

For end-users, data processing occurs in real-time. Since this is a stateless operation, data processing only involves a simple calculation or transformation.

Stream processing queries continuous data stream and detects conditions quickly within a limited time. Stream processing systems are fed on actions that happen in real-time such as web page clicks, sensor readings, e-commerce transactions, social media messages, and more.

Stream processing is used to detect complex world problems and provide a reasonable response for a better outcome. Machine learning techniques for predictive maintenance rely on stream processing. Real-time predictive maintenance provides fast detection and classification of developing faults as well as their locations.

The use of complex event processing technology enables the surveillance of systems state in real-time. Thus, identifying the causes of faults while evaluating the status of the technical components. This information provides the basis for initiating various maintenance measures within the maintenance planning framework.

### Batch processing pros and cons

#### Pros
- Batch processing is the most applicable when dealing with large volumes of data or transactions.
- Data processing is done independently.
- It is a cost-effective method of data processing.

#### Cons
- Users must carefully prepare input data meant for batch processing before running it on a computer.
- Issues with data, program crashes, and errors occurring during batch processing may halt the whole process. These include minor data errors like typos in dates.

### Stream processing pros and cons

#### Pros
- Data is always up to date when using stream processing. This way, an organization can respond to issues and events in the shortest time possible.
- Data is updated in real-time to help organizations detect patterns and gain insights into possible threats or opportunities.
- Instances of delay while performing stream processing are minimal.

#### Cons
- Stream processing is both expensive and complex.
- Information auditing in stream processing is challenging.

### Use cases of batch processing
Batch processing is applied in use cases involving large data sets and projects requiring deeper data analysis. 

Batch processing is used in:
- Payroll systems to calculate salaries for all the employees. Payroll systems collect, hold all the related data, and process the bill as a batch at the end of a specified period, say a month.
- Billing systems by telecom operator companies to process millions of call detail records and calculate telecom services rates.
- Bank invoice systems to make monthly statements for all account holders.
- Manufacturing industries for the daily report of product line operations.

Examples of batch processing systems include distributed programming platforms such as [GraphX](https://spark.apache.org/graphx/), [HTCondor](https://research.cs.wisc.edu/htcondor/), and [MapReduce](https://hadoop.apache.org/).

### Use cases of real-time stream processing
Stream processing is applied in use cases that respond to new data immediately generated as opposed to when data crosses a predefined threshold. Some data is most valuable at the time it is created. 

Other data require a response, that is, processing and data collection, at the time data it is generated. Stream processing is most applicable to use cases that involve such kinds of data sets.

Stream processing is used in:
- Online transaction fraud detection solutions to generate near-instant reactions. Stream processing platforms detect anomalies in e-commerce transactions in real-time and stop fraudulent transactions from completing.
- Applications requiring continuous output for incoming data such as social media sentiment analysis, sensor reading, and the stock market.

Examples of stream processing systems are big data programming platforms like [Spark Streaming](https://spark.apache.org/streaming/), [S4](https://ieeexplore.ieee.org/document/5693297), and [Storm](https://storm.apache.org/) streaming.

### Conclusion
Both stream and batch processing have their benefits and drawbacks, depending on the project at hand. Organizations that want to remain agile tend to use stream processing more often, while those defined by legacy systems mostly use batch processing .

The most significant factor for data processing teams is flexibility. Different projects have different requirements, and this article has prepared teams to find the best data processing solution for each use case.

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

