---
layout: engineering-education
status: publish
published: true
url: /complex-event-processing/
title: Complex Event Processing
description: The demand for rapid, actionable decisions illustrates the importance for enabling technologies like Complex Event Processing (CEP).
author: earl-potters
date: 2020-03-20T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/complex-event-processing/hero.jpg
    alt: complex event processing
---
Big data companies use the term Event Cloud to refer to the massive amounts of data on events being collected. The demand for rapid, actionable decisions illustrates the importance of enabling technologies like Complex Event Processing (CEP).
<!--more-->

Data is all around us. Sensor networks, smart devices and mobile apps are continuously collecting more and more data.
>"90 percent of the data in the world today has been created in the last two years alone, creating 2.5 quintillion bytes of data every day - and with new devices, sensors and technologies emerging, the data growth rate will likely accelerate even more."
<cite>[IBM Marketing Cloud Report](https://www.mediapost.com/publications/article/291358/90-of-todays-data-created-in-two-years.html)</cite>

As we struggle to process and analyze the ever-growing streams of data in near-real time, the ability to react rapidly to changing trends or deliver up-to-date business and security intelligence can prove invaluable to a company's success or failure. With the availability of thousands to millions of data streams and incoming events, we are constantly challenged with how to proactively take effective actions. What is the solution? CEP addresses this exact problem.

### What is Complex Event Processing and why is it important?

CEP, according to the book *[High performance in-memory data grid with Apache Ignite](https://www.amazon.com/Performance-memory-computing-Apache-Ignite/dp/1365732355)* by Shamim Bhuiyan and Michael Zheludkov is primarily "an event processing concept that deals with the task of processing multiple events with the goal of identifying the meaningful events within the event cloud in real time or near real time."

The CEP processing paradigm can be found in a wide variety of industries including finance, security, and healthcare. For financial applications, CEP is often used for credit card fraud detection and stock market monitoring. Furthermore, security CEP is used to flag malicious agents and can even automate proper counter-measure responses. While in healthcare, CEP can be used to correlate care, treatment events, associated treatments, and insurance compliance regimes.

### How does CEP work?
CEP uses declarative rules to specify event processing logic. Its  ability to continuously match pattern incoming events is attributed to the following various techniques:

- Event-Pattern Detection
- Event Abstraction
- Event Filtering
- Event Aggregation and Transformation
- Detecting Relationships such as Causality
- Membership, and Timing Between Events
- Abstracting Event-Driven Processes

I won't go into detail, however, I will illustrate the general concept using an example of a car.

First, we need an event source, i.e. anything that provides information about the environment. This can be in the form of transactions, log files, edge processing/detection algorithms or sensors. For example, our car tires can move from 45 psi to 41 psi over 15 minutes. That is our event.

Next comes the event processing. In this step, we can make inferences on the data we received into meaning actions. This can be done using complex rule engines, neural networks, Bayesian networks, analytics or data and semantic rules. For example, our car losing tire pressure over an extended period of time results in the creation of the `LossOfTirePresure` event.

Finally, the last step is the response or action. In order to effectively respond to an event, actions are taken. These actions can be alerts, logging files, triggers for more complicated workflows, or automated actions. For the car example, the event 'LossOfTirePresure' can trigger a reaction process to note the pressure loss into the car's maintenance log and alert the driver via the car's portal that the tire pressure has decreased.

![CEP1](/engineering-education/complex-event-processing/cep1.jpeg)<br/>
*Image source: [Databricks](https://databricks.com/glossary/complex-event-processing)*

### What tools are available?
The most common tools used for Complex Event Processing according to the company [Databricks](https://databricks.com/glossary/complex-event-processing) are:
- Apache Spark Streaming used by Databricks
- Apache Flink used by Data Artisans
- Apache Samza used by LinkedIn
- Apache Storm used by Twitter
- Hadoop/MapReduce
- Amazon Kinesis Analytics
- Microsoft Azure Stream Analytics, Stream Insight
- Fujitsu Software Interstage Big Data Complex Event Processing Server
- IBM Streams, Operational Decision Manager (ODM)
- Oracle Stream Analytics and Stream Explore

These are just a number of open source streaming frameworks available that allow users to set up data processing engines on their devices.

### Want to know more?
If you are interested in practical applications using CEP, I recommend reading *High performance in-memory data grid with Apache Ignite* (referenced above) or the new book *[The Apache Ignite Book](https://leanpub.com/ignitebook)* by Shamim Bhuiyan and Michael Zheludkov. They provide code samples, scripts, and more in-depth examples throughout the book.
