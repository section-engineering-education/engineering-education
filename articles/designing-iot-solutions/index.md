---
layout: engineering-education
status: publish
published: 
url: /engineering-education/designing-iot-solutions/
title: Designing IoT Solutions
description: This article will cover the basics of IoT and the building blocks of IoT solutions. At the end of the article, the reader will learn how IoT solutions work. 
author: elly-omondi
date: 2021-04-06T00:00:00-20:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/designing-iot-solutions/hero.jpg
    alt: IoT example image
---

As a tech enthusiast, I bet you have heard of buzzwords like IoT or Big data spoken by many. But what is IoT and why is it considered the best evolution of the Internet that drives the 4th Industrial revolution. In this article, you will learn the design lifecycle for IoT solutions.


### Overview
This article will cover:

- [What is IoT](#What-is-IoT)

- [IoT Architecture](#IoT-Architecture)

- [IoT Protocols](#IoT-Protocols)

- [IoT Development Platforms and Use cases](#IoT-Development-Platforms-and-Use-Cases)

### What is IoT

[* Internet of Things (IoT)*]() is a network of physical objects or devices – “things” – that are embedded with sensors, software, and other technologies for the purpose of exchanging data among the devices on the internet to help organizations solve problems.

As the devices reduce in size, the complexity in hardware and software increases, with more storage and compute power tied to each device.
 
The network of devices can be attached to almost anything- ordinary household objects to complex machines that run industrial processes. 

IoT technology leverages low-cost computing devices, growing cloud technologies, big data, and advanced analytics platforms to provide cutting-edge solutions that have proved profitable for every industry.

These solutions have been on the rise due to a reduction in hardware costs and an increase in the software capabilities of the connected devices. 
The connected devices can manage tasks, analyze opportunities and transfer this information securely to backend systems that take action or report incidents. 

#### IoT solutions examples:

- Wearable health monitors
- Home automation systems.
- Industrial control and monitoring systems.


### IoT Architecture

IoT solutions send out voluminous messages every second with rich information about processes, anomalies, and inconsistencies that the devices are configured to monitor.
The data may be sent to central databases or a hub that has processing capabilities.



#### Elements of IoT Architecture

1. *Connectivity*


IoT solutions rely on the connectivity of things/devices. Devices, for example, connect to devices in other regions through a centralized gateway or an IoT platform. 

2.  *Identity*

IoT solutions that run on cloud platforms require devices to be registered and assigned an identity for connectivity. 
For any connected device that fails to broadcast its identity information as it tries to communicate, the connectivity should close.


3.  *Capture*
IoT solutions require data, and the frequency of data capture is crucial. IoT devices should capture information based on the solution intended. For example, a device can capture moisture content in the air or soil as parameters for agricultural IoT solutions. 

4.  *Ingestion*

Out of the data sent by devices, meaningful information needs to be extracted. For this reason, an IoT platform that is capable of consuming millions of data to retrieve valuable insights is required.

5. *Storage*

IoT solutions deal with voluminous and valuable data that require analytics. Storage solutions are required to guarantee adequate throughput and latency, high availability, scalability, and security for the ever-growing data from devices. 

6. *Transformation and Analytics*


The data in storage solutions are filtered, sorted, enriched, and transformed into consumable components for APIs further downstream. 
The transformed data becomes the input for analytics APIs/platforms depending on the IoT solution that is required.

7. *Presentation*

Information from the analytics end that contains patterns and answers can is presented through dashboards and reports.
The dashboards present information that helps realize new organizational values.


### IoT Protocols
Interaction among devices, user applications, and gateways occur in a structured manner because of the IoT protocols. These protocols act as the language of IoT technology used to send messages (data) in the network. 

Protocol choice depends on the IoT solution/use case to be developed as well as the environment that will host the software application of the IoT solution.

Examples of IoT protocols

1.	Advanced Message Queuing Protocol (AMQP) 
2.	Message Queue Telemetry Transport (MQTT) protocol.



**MQTT**

[MQTT](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/mqtt-v3.1.1.html) is a messaging protocol that works on publish/subscribe model and runs on top of TCP/IP.

This protocol is widely used in IoT solutions because its architecture is simple, lightweight, and works well in environments with an unreliable network. 

The MQTT protocol is a device to-server protocol that captures data from various electronic devices and sends the data to registered servers.

When working on IoT solutions that require less power and memory, MQTT is suitable because it supports devices with minimum bandwidth use cases, low energy consumption, and little processing and memory resources.

Such solutions include;
- Electric meters
- Vehicle detectors.
- Fire detectors

**AMQP**

[AMQP](https://www.kelltontech.com/kellton-tech-blog/internet-of-things-protocols-standards) is a software layer protocol for message-oriented architecture that provides routing and queuing.

This protocol is a reliable technology that works with messages and queues and supports point-to-point communication.
AMQP as a protocol is efficient, portable, and secure, with low overhead, making it perfect for Internet of Things applications.



#### IoT Development Platforms and Use Cases

An IoT development platform is a set of layered technologies operating as IoT gateway, IoT middleware, and cloud platforms that are readily available for prototyping and rapid development of IoT solutions. 


#### Roles of IoT platforms.
+ Handling communication protocols.
+ Ensuring security and identity of devices and applications.
+ Harmonizing data from the connected devices.
+ Providing multiple endpoints for various types of processing.
+ Providing industry communication protocols i.e. AMQP


IoT hub is an example of development platforms for IoT solutions. Because IoT projects are complex, IoT hubs exist to fasten the development and delivery of solutions.

Cloud platforms such as Azure host IoT hub where that acts as middleware for IoT solutions. Azure IoT hub provides reliable and secure communications between IoT devices and IoT applications that run on the cloud.



### Relevant Resources

1. [IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/about-iot-hub#:~:text=IoT%20Hub%20is%20a%20managed,and%20the%20devices%20it%20manages.&text=IoT%20Hub%20supports%20communications%20both,the%20cloud%20to%20the%20device.)

2. [IoT](https://en.wikipedia.org/wiki/Internet_of_things).

3. [IoT protocols](https://azure.microsoft.com/en-us/overview/internet-of-things-iot/iot-technology-protocols/)
 
4. [Azure for Architects](https://pdfcoffee.com/ebookazureplatform-azure-for-architectspdf-pdf-free.html)


