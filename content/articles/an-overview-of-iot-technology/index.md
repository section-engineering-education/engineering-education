---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-iot-technology/
title: An Overview of IoT Technology
description: This article will cover the basics of IoT and the building blocks of IoT solutions. At the end of the article, the reader will learn how IoT solutions work. 
author: elly-omondi
date: 2021-04-28T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-iot-technology/hero.jpg
    alt: IoT example image
---
In this article, we will learn the design lifecycle for IoT solutions. As a tech enthusiast, I bet you have heard of buzzwords like IoT or Big Data spoken by many. But what is IoT and why is it considered the best evolution of the Internet that drives the 4th Industrial revolution.
<!--more-->
Before reading any further, as an introduction to the 4th industrial revolution, you can check out this [article](/industry-4.0-and-cybersecurity/) as a refresher.

### Overview
This article will cover:
- [What is IoT](#what-is-iot)
- [IoT Architecture](#iot-architecture)
- [IoT Protocols](#iot-protocols)
- [IoT Development Platforms and Use cases](#iot-development-platforms-and-use-cases)

### What is IoT
The [Internet of Things (IoT)](https://en.wikipedia.org/wiki/Internet_of_things) is a network of physical objects or devices – “things” – that are embedded with sensors, software, and other technologies to exchange data among the devices on the internet to help organizations solve problems. 

For example, IoT solutions provide flexibility to the workforce as employees can work remotely with connected devices, thus organizations can incur lesser operational costs that relate to employee management.

The network of devices can be found/created almost everywhere and anywhere, from an ordinary household setting to a complex industrial environment with machines.

Over the years, the computing industry has evolved in terms of device capabilities, architectures, and even sizes. This has made IoT technology grow rapidly. With the intention to maximize efficiency and productivity in all its application areas.

As device sizes reduce, their software and hardware complexities increase, with more storage and compute power tied to each device. 

IoT solutions have thus, been on the rise due to an increase in the software capabilities and a reduction in hardware costs of the connected devices. 

IoT technology leverages low-cost computing devices, growing cloud technologies, big data, and advanced analytics platforms to provide cutting-edge solutions that have proved to be profitable for every industry.

The adoption of IoT in businesses provides insights from data gathered that can be used to redefine traditional business processes.

This has led to a reduction in the costs of running businesses, improved customer experience, and even the generation of new business opportunities. 

The growth in organizations is realized because connected devices can manage tasks, analyze opportunities and transfer this information securely to backend systems that take action or report incidents. 

#### IoT solutions examples
- Wearable health monitors.
- Home automation systems.
- Industrial control and monitoring systems.

Devices are mainly for capturing actionable data that may be susceptible to interception easily in case of failure of the organizations to implement relevant IoT security measures. 

To avoid solution outages due to security concerns, organizations should regulate access to data by the use of access controls.

Setting controls in an IoT environment will limit unauthorized activities at data transfer and connectivity levels thus reducing vulnerabilities and security issues in IoT solutions.

### IoT architecture
IoT solutions send out various messages every second with rich information about processes, anomalies, and inconsistencies that the devices are configured to monitor.

The data may be sent to central databases or a hub that has processing capabilities.

#### Elements of IoT architecture
1. *Connectivity* - IoT solutions rely on the connectivity of things/devices. Devices, for example, connect to devices in other regions through a centralized gateway or an IoT platform. 

2.  *Identity* - IoT solutions that run on cloud platforms require devices to be registered and assigned an identity for connectivity.

For any connected device that fails to broadcast its identity information as it tries to communicate, the connectivity should be closed.

3.  *Capture* - IoT solutions require data, and the frequency of data capture is crucial. IoT devices should capture information based on the solution intended. For example, a device can capture moisture content in the air or soil as parameters for agricultural IoT solutions. 

4.  *Ingestion* - Out of the data sent by devices, meaningful information needs to be extracted. For this reason, an IoT platform that is capable of consuming millions of data to retrieve valuable insights is required.

5. *Storage* - IoT solutions deal with vast and valuable data that requires analytics. Storage solutions are required to guarantee adequate throughput and latency, high availability, scalability, and security for the ever-growing data from devices. 

6. *Transformation and Analytics* - The data in storage solutions is filtered, sorted, enriched, and transformed into consumable components for APIs further downstream.

The transformed data becomes the input for analytics APIs/platforms depending on the IoT solution that is required.

7. *Presentation* - Information from the analytics end that contains patterns and answers can be presented through dashboards and reports.

The dashboards present information that helps realize new organizational values.

### IoT protocols
Interaction among devices, user applications, and gateways occur in a structured manner because of the IoT protocols. These protocols act as the language of IoT technology used to send messages (data) in the network. 

The type of protocol depends on the IoT solution/use case to be developed as well as the environment that will host the software application of the IoT solution.

Examples of IoT protocols include:
1. Advanced Message Queuing Protocol (AMQP). 
2. Message Queue Telemetry Transport (MQTT) protocol.

#### MQTT
[MQTT](http://docs.oasis-open.org/mqtt/mqtt/v3.1.1/mqtt-v3.1.1.html) is a messaging protocol that works on publish/subscribe model and runs on top of TCP/IP. This protocol is widely used in IoT solutions because its architecture is simple, lightweight, and works well in environments with an unreliable network. 

The MQTT protocol is a device to-server protocol that captures data from various electronic devices and sends the data to registered servers. 

When working on IoT solutions that require less power and memory, MQTT is suitable because it supports devices with minimum bandwidth use cases, low energy consumption, and little processing and memory resources.

Such solutions may include:
- Electric meters.
- Vehicle detectors.
- Fire detectors.

#### AMQP
[AMQP](https://www.kelltontech.com/kellton-tech-blog/internet-of-things-protocols-standards) is a software layer protocol for message-oriented architecture that provides routing and queuing of messages in business applications and IoT devices management. AMQP uses TCP connection protocol, therefore, it is reliable for client-server communications.

The protocol supports point-to-point communication reliably, with the ability to load balance the entire network when working with messages and queues.

AMQP has a wide range of security protocols such as SSL, TLS, and SALS for messaging. Hence making it more applicable for business transactions like financial services with more end-to-end confidentiality requirements. 

AMQP is also an open and standard protocol that allows our applications to run on different platforms and connect to each other therefore supporting a multi-vendor communications ecosystem. 

Unlike MQTT protocol, AMQP is preferred when developing solutions that require a high level of scalability and availability.

#### IoT development platforms and use cases
An IoT development platform is a set of layered technologies operating as [IoT gateway](https://www.lanner-america.com/blog/what-is-an-iot-gateway/) and [IoT middleware](https://www.leanix.net/en/blog/internet-of-things-middleware). 

It is used to interface components in an IoT network with cloud platforms, that are readily available for prototyping and rapid development of IoT solutions. The IoT hub is an example of a development platform for IoT solutions.

#### Roles of IoT platforms
- Handling communication protocols.
- Ensuring security and identity of devices and applications.
- Harmonizing data from the connected devices.
- Providing multiple endpoints for various types of processing.
- Providing industry communication protocols i.e. AMQP.
 
Because IoT projects are complex, IoT hubs exist to fasten the development and delivery of solutions. [AWS IoT Core](https://aws.amazon.com/iot-core/), [Google Cloud IoT core](https://www.leanix.net/en/blog/internet-of-things-middleware) and [Azure IoT](https://azure.microsoft.com/en-in/services/iot-hub/) provide hubs that acts as middleware for IoT solutions.

These IoT hubs are essential for reliability and secure communications between IoT devices and IoT applications that run on the cloud.

### Conclusion
Considering the immense benefits that IoT solutions bring to large, mid-range, and small organizations, it is enough to say that IoT technology is here to stay. It's projected that by 2030, close to 50 billion devices with a global presence will be connected through IoT technology.

It is therefore advisable for businesses and industries to develop their solutions and applications with IoT integration in mind for efficiency and future productivity purposes.

Happy learning!

### References
1. [IoT Hub](https://docs.microsoft.com/en-us/azure/iot-hub/about-iot-hub#:~:text=IoT%20Hub%20is%20a%20managed,and%20the%20devices%20it%20manages.&text=IoT%20Hub%20supports%20communications%20both,the%20cloud%20to%20the%20device.)

2. [IoT](https://en.wikipedia.org/wiki/Internet_of_things)

3. [IoT protocols](https://azure.microsoft.com/en-us/overview/internet-of-things-iot/iot-technology-protocols/)
 
4. [Azure for Architects](https://pdfcoffee.com/ebookazureplatform-azure-for-architectspdf-pdf-free.html)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
