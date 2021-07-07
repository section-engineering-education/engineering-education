---
layout: engineering-education
status: publish
published: true
url: /what-is-edge-computing/
title: The Evolution of Computing to Edge Computing
description: In this article we will look at Edge computing and how it can address the concerns of latency, data security and privacy, battery life constraint in smaller devices, and bandwidth cost saving.
author: sharon-kinyan
date: 2021-07-02T00:00:00-17:30
topics: [Edge Computing]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-edge-computing/hero.png
    alt: edge computing example image 
---
There are vast amounts of data being collected from our mobile phones, autonomous vehicles, cell towers, and factories. This has led to a growing need for real-time data processing. 
<!--more-->

### Introduction
Before reading this article, a reader should be familiar with a variety of computing infrastructures and data storage resources such as [Google cloud](https://cloud.google.com/) and [Amazon Web Services](https://aws.amazon.com/) as they are the de-facto standards in many industries today. 

Real-time systems process data as the data is received, where a response is guaranteed in a stipulated timing constraint. A good example is the flight control system which receives information from different sensors. It processes data as it arrives. 

Yet, with most current systems, computation is centralized. This isn't ideal for real-time systems as they experience issues relating to latency, bandwidth, and privacy.

A possible solution? Edge Computing. With [edge computing](https://www.section.io/edge-compute-content-resources/), the computation happens near the physical location where the data is collected. This is in contrast to current practices where computation happens on centralized servers. Due to this, it is easier to create real-time insights.

The figure below depicts the centralized nature of cloud computing:

![Cloud Computing Paradigm](/engineering-education/what-is-edge-computing/cloud-computing.PNG)

*[Image Source: IEEE](https://ieeexplore.ieee.org/document/7488250/)*

But, before we venture further into edge computing, let's appreciate what preceded edge computing.

### Brief history
Computing used to be a process that you could solely and most commonly perform on your desktop computer or laptop. All computations and programs ran locally based on the data, information, and processing power the computer had access to at that moment. 

However, this type of computing was limiting as these devices could only hold so much data and had access to limited computational resources.

Then came the cloud computing era which became a game-changer. With cloud computing, data storage and computational resources exist in the cloud. This data is accessible in real-time from your mobile devices, tablets, smartwatches, and laptops. Cloud computing gave us access to larger storage capacities and computational resources. 

For instance, this enabled us to train machine learning models and store data that wouldn't otherwise be storable on our devices. Big technology companies such as Amazon, Microsoft, Google, and IBM are some of the industry players that identified an opportunity to offer these storage services and computation resources to businesses and individuals.

Yet, with cloud computing, there came about three main challenges. These challenges included *bandwidth limitations, latency problems, and privacy issues*.   

#### 1. Latency
It is the time delay associated with running a particular process. For example, in most of our mobile devices, we have either Apple's Siri or Google's Assistant feature. For these features to work, the device has to record your speech, send it to a cloud server where data compression and processing is performed. 

On the cloud, sometimes the servers have to talk to other servers to perform different functions on the data before sending the output feedback to your mobile phone. While this process is quick in most cases, it still does take time.

This could be problematic. Let's consider a case of autonomous vehicles. These vehicles need to make timely decisions depending on what's happening in their surrounding, for example, to avoid a car crash. 

What if the weather conditions are extreme, thereby increasing latency, and as a result, it takes longer to get feedback to have the car turn right and avoid a crash? Considering the amount of data being generated, the response time would be too long and would potentially result in a crash.

#### 2. Bandwidth
It is the amount of data that you can send in a certain period. For example, if I want to operate the Google Assistant feature which involves communicating with the cloud server. This action takes time depending on the amount of bandwidth you have to perform that task. 

A low bandwidth would mean that the information would take a longer time than if I had a higher bandwidth. We can see how this could be an inconvenience, especially for people in rural areas who may not have access to good internet.

#### 3. Privacy
Cloud computing has privacy implications. Let me explain this using an example. If you are using a machine learning-based financial system that requires you to upload sensitive data. 

That data then needs to be sent for processing to the cloud servers. There is always a possibility that this data could get hacked. 

If there was a way for that data to be processed on your phone rather than being sent to the cloud for processing, that would be a better option for your privacy. Most of the data used is produced on our smart devices, tablets, and mobile phones. 

Wouldn't it be better to process this data on our devices instead? This would ease the problems with latency, bandwidth, and privacy concerns. Edge computing helps solve these problems.

### Edge computing
Edge computing allows computing to be performed in a closer proximity to where the data is produced. We can refer to the "edge" as any computing performed between the sources of data i.e, mobile phones and the cloud infrastructure. Though edge devices are interlinked with the cloud, they only communicate with the servers when they have to.

Let's take a look at the edge computing paradigm.

![Edge Computing Paradigm](/engineering-education/what-is-edge-computing/edge-computing.PNG)

*[Image Source: IEEE](https://ieeexplore.ieee.org/document/7488250/)*

At the edge, the following tasks are performed:

#### 1. Computing offloading
This is where the [edge nodes offload part of the workload](https://www.section.io/cdn-edge-compute-platform/) that would have otherwise be done from the cloud.

#### 2. Data storage
Instead of data storage happening on the cloud, data is now stored on edge devices increasing the privacy of user data.

#### 3. Caching and processing
In an autonomous vehicle, data from cameras can now be processed at the edge ensuring shorter response times. 

#### 4. Handling requests
The edge nodes distribute requests and deliver services from the cloud to the user.

#### 5. Privacy protection
The [edge nodes greater provide privacy protection](https://www.section.io/security-edge-compute-platform/) to a user. Since data stays with the producer/user and is never sent to the cloud for processing.

#### 6. IoT management
IoT devices produce an impressive amount of data. With the help of the edge operating system (edgeOS), IoT devices can be connected and managed at home. This eliminates the need to subscribe to expensive internet bandwidth to send data to the cloud for processing.

#### 7. Service delivery
The [edge nodes provide service delivery](https://www.section.io/global-edge-network/) from the cloud to a user in case a user is in need of such services.  

These are tasks that traditionally, have been performed on the cloud. 

### Use cases for edge computing
Let's look at some examples to prove its benefits:

1. By moving from the cloud to the edge, researchers found that the response time on their facial recognition system reduced from 900ms to 169ms. You may read more about it [here](https://www.researchgate.net/publication/301691282_Fog_Computing_Platform_and_Applications). 

2. In the task of wearable cognitive assistance, researchers found out that using the edge reduced the energy consumption by 30-40% and response time to between 80 and 200ms. This is pretty significant. You can find more insight about this task [here](https://www.cs.cmu.edu/~satya/docdir/ha-mobisys2014.pdf).

3. Edge computing could enable smart cities. With our cities' population growing at faster paces, processing the huge amount of data at the edge would be an efficient solution. 

4. Real-time applications such as augmented reality, online gaming, and connected health are now faster and have shorter response times because of deploying nodes at the edge.

### Wrapping up
Edge computing has the potential to address the concerns of latency, data security and privacy, battery life constraint in smaller devices, and bandwidth cost saving. Edge computing is one of the technologies that will play an important role in the world of tomorrow. 

Feel free to visit our [Edge Content Library](https://www.section.io/edge-compute-content-resources/) for more resources dedicated to web performance, security, and scalability.

Happy learning!

### Reference
[Edge Computing: Vision and Challenges](https://ieeexplore.ieee.org/document/7488250)

---
Peer Review Contributions by: [Collins Ayuya](/engineering-education/authors/collins-ayuya/)

