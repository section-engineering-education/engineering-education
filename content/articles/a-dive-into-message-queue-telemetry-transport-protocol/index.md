### Inntroduction 
Smart inverters act as the principal connection between distributed energy resources and the power bus in an environment with an increasing number of non-traditional power sources. In microgrids, where many DERs must be monitored and coordinated, this function is much more critical. Even under distributed control, the system must compensate for voltage and frequency fluctuations caused by local controllers, therefore MGs must incorporate appropriate communication connections. A communications system is also necessary for efficient functioning. This article intends to talk about wireless communication architecture based on the MQTT protocol.
### Table of contents

- [An overview of MQTT](#an-overview-of-mqtt)
- [Communication between MQTT Client and Broker](#communication-between-mqtt-client-and-broker)
- [Insights into the workings of MQTT](#insights-into-the-workings-of-mqtt)
- [Topic](#topic)
- [Conclusion](#conclusion)

### An overview of MQTT
The MQTT convention characterizes two sorts of organization elements: a message dealer and numerous buyers. An MQTT broker is a server that receives all client signals and routes them to the correct receivers. A MQTT client is any device that runs a MQTT library and connects to a MQTT broker via the internet. (anything from a microcontroller to a full-fledged server).

The data is organized into a subject hierarchy. Whenever a publisher has fresh data to release, it transmits a control signal along with the data to the linked broker. Following that, the information is relayed to any users who have registered to that topic through the broker. The publisher does not require information on the number of subscribers or their location, and subscribers do not require information on the publishers.

Unless the message's publisher has categorized it as a retained message, a broker discards a message on a subject with no current subscribers. A MQTT message with the retained flag set is referred to as a retained message. For the given subject, the broker saves the most recent retained message as well as the associated QoS.After subscribing to a subject pattern that corresponds to the topic of the retained message, each client receives the message instantly. Only one communication is saved per subject by the broker. This enables new subscribers to a topic to get the most up-to-date information without having to wait for the publisher's next update.

At the point when the distributing customer interfaces with the specialist interestingly and the representative identifies that the distributing customer has out of nowhere disengaged, the distributing customer can set up a default message to communicate to endorsers. 

Customers just speak with an agent, regardless of whether a framework might comprise of many representative workers trading information dependent regarding the matters of their present supporters.

Clients only communicate with a broker, even if a system may consist of many broker servers exchanging data based on the subjects of their current subscribers.

MQTT use the TCP protocol for data transmission. MQTT-SN, a variant, is used via various transports such as UDP or Bluetooth.

MQTT offers connection credentials in raw text format without any security or authentication mechanisms. This can be accomplished by encrypting and protecting the sent data against interception, modification, or forgery using TLS.

### Communication between MQTT Client and Broker
The MQTT broker is a piece of software that runs on a computer (on-premises or in the cloud), and it can either be self-built or hosted by a third party. There are both open-source and proprietary options to choose from.

MQTT utilizes the title [`Topic`](#topic)  instead of the expected beneficiary's location since the intermediary capacities as a mail center. Assuming you need a duplicate of the message, buy in to that subject. A solitary agent can send messages to an enormous number of customers (one to numerous capacities). A solitary supporter might get data from various sources. 

By distributing and buying in, every customer might deliver and get information, i.e., the gadgets can communicate sensor information while as yet getting setup data or control orders (MQTT is a bi-directional correspondence convention). Data exchange, device management, and control are all aided by this.

The broker can save the data as retained messages (requires database client subscription) so that new subscribers to the subject can get the most recent value right away.

The broker keeps track of all the session information in "permanent sessions" when the devices turn on and off.

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

Non-encrypted communication utilizes port 1883, whereas encrypted communication utilizes port 8883, which uses SSL/TLS. The customer approves and confirms the worker's declaration during the SSL/TLS handshake. The customer may likewise offer the representative a customer declaration during the handshake. This can be utilized by the dealer to affirm the customer's recognizable proof. In spite of the way that SSL/TLS customer side endorsements are not piece of the MQTT standard, specialists are progressively taking on them to improve on customer confirmation. 

SSL/TLS may not generally be a choice or even wanted because of the MQTT convention's attention on asset compelled and Internet of Things (IoT) gadgets. A cleartext username and password are used for authentication in certain situations. The username and password can be seen as a part of a CONNECT/CONNACK packet sequence. Moreover, certain agents, especially open specialists that publicize on the web, energize mysterious customers. The username and secret phrase are both left clear when this occurs. 

MQTT is a lightweight convention since it just takes a little measure of code to handle each message, as its name recommends. Each message includes the following information:
- a two-byte fixed-height header
- a changeable header that may or may not be used
- limit on the size of the message payload of 256 megabytes
- level of service quality

A client can use the publish, subscribe, unsubscribe, and ping actions throughout the communication phase. The publish action delivers a binary data block (content) to the publisher-specified topic.
Message binary large objects (BLOBs) up to 256 MB in size are supported by MQTT. The material will be displayed in a format that is particular to the application.

### Topic
In MQTT, a subject is a UTF-8 string used by the broker to filter messages for each connected client. Each topic is broken down into one or more tiers. Each subject level is separated by the forward slash, also known as the topic level separator. The case of both the themes and the levels is important.

The wildcard is an MQTT feature that allows subjects and levels to be more flexible and user-friendly.

There are two sorts of wildcards in MQTT Topics:

- `+` for a single level.- The "+" sign is a single-level wildcard that can be used to substitute a single level in a topic.
For example, if a client wants to know about all of the tables in the house, they will subscribe to the topic:

As a result, any published material about tables, inside kitchens, living rooms, bedrooms, and other relevant topics can be found on this subject.

- `#` is a multi-level indicator.- 
The "#" sign represents a multi-level wildcard that can be used to substitute many levels in a topic.
For example, if a client wants to know about all of the objects in the kitchen, living room, bedroom, or any other ground-floor room, they will subscribe to the topic:


As a consequence, any material provided on topics like kitchen products, bedroom things, and living room items will be available here. For this situation, information on an assortment of levels might be gotten.

### Conclusion
From the article above, we have learned what message queue telemetry transport protocol is and an insight into its working condition. After reading this article, we hope you now have a better idea of what the MQTT protocol is, how it works, and what it's best used for. 