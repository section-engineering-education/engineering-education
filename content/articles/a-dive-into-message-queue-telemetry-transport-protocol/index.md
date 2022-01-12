---
layout: engineering-education
status: publish
published: true
url: /a-dive-into-message-queue-telemetry-transport-protocol/
title: Message Queue Telementary Transport Protocol
description: This article will go through wireless communication architecture based on the MQTT protocol.
author: Irene-njeri
date: 2021-10-14T00:00:00-03:15
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/a-dive-into-message-queue-telemetry-transport-protocol/hero.png
    alt: Message queue telementary transport protocol Hero Image
---

Smart inverters act as the principal connection between Distributed Energy Resources (DERs) and the power bus in an environment with an increasing number of non-traditional power sources. In Microgrids (Mgs), where many DERs must be monitored and coordinated, this function is much more critical.
<!--more-->
Even under distributed control, the system must compensate for voltage and frequency fluctuations caused by local controllers. Therefore MGs must incorporate appropriate communication connections. A communications system is also necessary for efficient functioning.

This article intends to talk about wireless communication architecture based on the MQTT protocol.

### Table of contents
- [An overview of MQTT](#an-overview-of-mqtt)
- [Communication between MQTT Client and Broker](#communication-between-mqtt-client-and-broker)
- [Insights into the workings of MQTT](#insights-into-the-workings-of-mqtt)
- [Topic in MQTT](#topic-in-mqtt)
- [Conclusion](#conclusion)

### An overview of MQTT
The MQTT convention characterizes two sorts of organization elements: a message dealer and numerous buyers. All client signals are received by an MQTT broker, which then passes them to the appropriate receivers. Thus, if a device runs an MQTT library and connects to a broker via the internet, it is an MQTT client. (anything from a microcontroller to a full-fledged server).

The subject hierarchies have been used to arrange the data. The connected broker receives a control signal every time the publisher publishes new data. Afterwards, the broker distributes the data to all those who have requested it through email or other means. Publishers are not obliged to disclose subscription numbers or locations, nor are they required to give information about their subscribers.

Anything sent on a topic that has no current subscribers will be removed by brokers unless the publisher categorizes it as a `retained message.` A retained message is an MQTT message that has the retained flag set. 

The broker keeps track of the most recent communication and its related grade of service for each topic. A message is sent immediately to any client that has subscribed to a subject pattern that matches the message's subject. 

Only one communication is saved per subject by the broker. This enables new subscribers to a topic to get the most up-to-date information without waiting for the publisher's next update.

When the distributing customer interfaces with the specialist interestingly and the representative identifies that the distributing customer has out of nowhere disengaged, the distributing customer can set up a default message to communicate to endorsers. 

Customers speak with an agent, regardless of whether a framework might comprise many representative workers trading information-dependent regarding the matters of their present supporters. Broker servers exchange data depending on their current subscribers' topics, but clients only interact with one broker server.

MQTT uses the TCP protocol for data transmission. MQTT-SN, a variant, is used via various transports such as UDP or Bluetooth. It offers connection credentials in raw text format without any security or authentication mechanisms. This can be accomplished by encrypting and protecting the sent data against interception, modification, or forgery using TLS.

### Communication between MQTT Client and Broker
The MQTT broker is a piece of software that runs on a computer (on-premises or in the cloud), and it can either be self-built or hosted by a third party. There are both open-source and proprietary options to choose from.

MQTT utilizes the title [`Topic`](#topic-in-mqtt) instead of the expected beneficiary's location since the intermediary capacities as a mail centre. Assuming you need a duplicate of the message, buy into that subject. A solitary agent can send messages to an enormous number of customers (one to numerous capacities). A solitary supporter might get data from various sources. 

By distributing and buying in, every customer might deliver and get information, i.e., the gadgets can communicate sensor information while getting setup data or control orders (MQTT is a bi-directional correspondence convention). Data exchange, device management, and control are all aided by this.

New subscribers will be provided with the most up-to-date information by storing the data as retained messages for brokers (which need a database client subscription). All session data is kept in 'permanent sessions,' even when switched on or off devices.

The following are the key benefits of using an MQTT broker:

- Connections between clients are no longer vulnerable or insecure.
- Scalable from one to tens of thousands of devices
- All client connection statuses are handled and tracked, including security credentials and certificates.
- Network burden is reduced without jeopardizing security (cellular or satellite network)

### Insights into the workings of MQTT
There are four phases to an MQTT session:

1. Connection
2. Authentication
3. Communication
4. Termination

TCP/IP associations are made with the agent utilizing either a standard port or a bespoke port characterized by the dealer's administrators. A reused client identity may cause a server to maintain an old session. Be aware of this when setting up the connection.

Non-encrypted communication utilizes port 1883, whereas encrypted communication utilizes port 8883, which uses SSL/TLS. The customer approves and confirms the worker's declaration during the SSL/TLS handshake. 

The customer may likewise offer the representative a customer declaration during the handshake. Again, the dealer can utilize this to affirm the customer's recognizable proof.

 Despite how SSL/TLS customer side endorsements are not a piece of the MQTT standard, specialists are progressively taking on them to improve customer confirmation. 

SSL/TLS may not generally be a choice or even wanted because of the MQTT convention's attention on asset compelled and Internet of Things (IoT) gadgets. A cleartext username and password are used for authentication in certain situations. 

The username and password can be seen as a part of a CONNECT/CONNACK packet sequence. Moreover, specific agents, especially open specialists that publicize on the web, energize mysterious customers. The username and secret phrase are both left clear when this occurs. 

MQTT is a lightweight protocol since it only requires a little code to process each message. The following data is included in each message:

- Two bytes of fixed header height
- A heading that may be utilized or not used, depending on the situation
- A 256-megabyte payload limit for messages
- the quality of the services provided

Customers may use publish, subscribe, unsubscribe, and ping at any time throughout the communication process. The publish action delivers a binary data block (content) to the publisher-specified topic.

When using MQTT, you may send BLOBs as large as 256 MB. The material will be displayed in a format that is particular to the application.

### Topic in MQTT
The UTF-8 string serves as the filter for each connected client's messages in MQTT. There are many levels to each subject. The forward slash, or topic level separator, is used to separate each subject level. The case of both the themes and the levels is essential.

The wildcard is an MQTT feature that allows subjects and levels to be more flexible and user-friendly. There are two sorts of wildcards in MQTT Topics:

- `+` for a single level.- The "+" sign is a single-level wildcard that can be used to substitute a single level in a topic.
For example, if a client wants to know about all of the tables in the house, they will subscribe to the topic:

As a result, any published material about tables, inside kitchens, living rooms, bedrooms, and other relevant topics can be found on this subject.

- `#` is a multi-level indicator.- 
The "#" sign represents a multi-level wildcard that can be used to substitute many levels in a topic.
For example, if a client wants to know about all of the objects in the kitchen, living room, bedroom, or any other ground-floor room, they will subscribe to the topic:

Consequently, any material provided on topics like kitchen products, bedroom things, and living room items will be available here. For this situation, information on an assortment of levels might be gotten.

### Conclusion
From the article above, we have learned what message queue telemetry transport protocol is and an insight into its working condition. After reading this article, we hope you now have a better idea of the MQTT protocol, how it works, and best. 

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
