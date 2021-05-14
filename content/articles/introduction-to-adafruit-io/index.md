---
layout: engineering-education
status: publish
published: true
url: /introduction-to-adafruit-io/
title: Introduction to Adafruit IO
description: Introduction to IoT deployment with Adafruit IO. In this article, we have covered the basics of IoT and cloud computing. We will also build a simple project for better understanding.
author: srishilesh-p-s
date: 2021-02-25T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/introduction-to-adafruit-io/hero.jpg
    alt: Introduction to Adafruit IO
---
In this article, we will learn about a cloud platform called Adafruit IO for the deployment of IoT solutions. By the end of this article, you will get an overview of how IoT solutions are deployed in the cloud, how Adafruit IO helps in easier deployment, and we also build a simple project in Python for demonstration.
<!--more-->
As a prerequisite, a background knowledge of IoT deployments and cloud computing would help beginners.

### Table of contents
- [Introduction to Internet of Things (IoT)](#introduction-to-internet-of-things-iot)
- [Introduction to cloud computing](#introduction-to-cloud-computing)
- [Adafruit IO](#adafruit-io)
- [Step by step guide](#step-by-step-guide)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Introduction to Internet of Things (IoT)
> According to [Wikipedia](https://en.wikipedia.org/wiki/Internet_of_things), Internet of things (IoT) describes a network of physical objects (things) that are embedded with sensors, software, and other technologies to connect and exchange data with other devices and systems over the Internet.

In the Internet of Things, the "Things" are uniquely identified based on the property of communication and identifying objects. "Things" can be classified based on people, machines, and information. For example, computers, sensors, TVs, books, etc. can be called "Things".

When these "Things" possess certain characteristics of connecting them via "Internet", we called them "Internet of Things".

Characteristics of IoT are:
- **Connectivity** - Things must be connected (either wired or wireless).
- **Intelligence and Identity** - Data extracted is important, and identity helps in tracking them.
- **Scalability** - Capability to handle massive data simultaneously.
- **Dynamic and Self-adapting** - Must be able to work on different conditions.
- **Architecture** - Must be hybrid and cannot be homogenous.
- **Safety** - Privacy of data is the most important.

### Introduction to cloud computing
Cloud computing is the means of storing and accessing data over the Internet instead of using them locally. It allows the sharing of resources across devices through centralized storage.

Features of cloud computing are as shown below:

![Features of cloud computing](/engineering-education/introduction-to-adafruit-io/cloud-computing-features.jpg)

*Source: Features of cloud computing by [DataFlair](https://data-flair.training/blogs/features-of-cloud-computing/)*

Cloud computing can be classified into 3 types of services:
1. Infrastructure as a Service (IaaS) - Provides processing, storage, and physical resources for computing.
2. Platform as a Service (PaaS) - Created apps that can be deployed in the cloud.
3. Software as a Service (SaaS) - 3rd party business operations that can be deployed in the cloud.

### Adafruit IO
Having a better understanding about the Internet of Things and Cloud computing, let's now go over what [Adafruit IO](https://io.adafruit.com) is about, and how it works.

With the rise in digital transformations, IoT deployments in the cloud have become more popular. By deploying IoT solutions on the cloud, we have the following benefits:
- **Cost** - Reduces the cost of computing and storage by using various cloud services.
- **Scalability** - The "pay-as-you-go" pricing model allows a flexible pay model, also allowing scalability of the application.
- **Data control** - Data backup and recovery with high security.
- **Server uptime** - Allows very minimum or no downtime, with high server availability.

Adafruit IO is one such cloud provider focusing more on IoT deployments on the cloud. Adafruit IO supports different hardware like Raspberry PI, ESP2866, and Arduino. 

IoT developers prefer Adafruit IO over other IoT cloud providers for the following reasons:
- **Powerful API** - Provides us libraries for various programming languages, which also provides the built-in user interface support.
- **Dashboard** - Understanding data via charts and graphs enables us to make better decisions.
- **Privacy** - Data is secured in the cloud platform with better encryption algorithms.
- **Documentation & Community** - Many blogs with amazing community support allows continuous developments of the products.

### Step by step guide
In our previous article on ["Getting started with NodeMCU"](/getting-started-with-nodemcu/), we learned about what NodeMCU is, and we also built a simple project for the blinking of LEDs. In continuation of the previous article, let's learn about its deployment on the cloud.

It is highly recommended to go through the [previous article](/getting-started-with-nodemcu/), before continuing.

#### Objective
In our previous article, we worked with NodeMCU on blinking lights of built-in LEDs. In this article, to demonstrate Adafruit IO works, we will send (publish) the LED brightness readings to the Adafruit IO cloud via Arduino IDE (written in C), and receive (subscribe) them via a Python server.

#### Installation
Follow the installation guide to get setup:
- Sign up by creating a new account in [Adafruit IO](https://io.adafruit.com).
- Make note of your private key by heading over to the "My Key" section.
- Then, "Create a new dashboard" with the desired name.
- In local setup, install a Python package called `Adafruit_IO` using `pip install Adafruit_IO`.
- Similarly, make sure to go through the previous article on how to set up the existing development environment.

#### Implementation - Publisher module
In Arduino IDE, we have to import the necessary library to publish the values. To import, use `#include <Adafruit_MQTT_Client.h>`.

We also have to define certain constants for initializing the server.

```c
#define username "[TYPE YOUR USERNAME]"
#define key "[TYPE YOUR SECRET KEY]"
#define server "io.adafruit.com"
#define password "[TYPE YOUR PASSWORD]"
#define dashboard "[TYPE YOUR DASHBOARD NAME]"
```

After defining the constants, let's initialize by creating a client model.

```c
Adafruit_MQTT_Client mqtt(&esp,server,port,username,key); // Creates a Adafruit client model
Adafruit_MQTT_Publish feed = Adafruit_MQTT_Publish(&mqtt,username"/feeds/"dashboard); // Initializes the server by specifying the dashboard path
```

Now, let's increase the brightness of the LED, by running a for-loop from 10 to 100 while publishing the values in the Adafruit cloud. For publishing values, we make use of `publish()` function to send the values to the respective Adafruit IO cloud.

```c
// Publish the values from 10 to 100 using "feed.publish()"
for (int i = 10; i <= 100; i ++) {
  feed.publish(i);
}
```

#### Implementation - Subscriber module
Now, in this section, let's receive (subscribe) the brightness readings and display them on the LED.

To initialize the model, we have to specify certain constants and import necessary packages.

```python
from Adafruit_IO import Client, Feed, RequestError

ADAFRUIT_IO_KEY = "[TYPE YOUR IO_KEY]"
ADAFRUIT_IO_USERNAME = "[TYPE YOUR USERNAME]"
```

Initialize the cloud, by specifying the username and key, as shown below:

```python
aio = Client(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY) # Calling Client() constructor
digitalio = aio.feeds('[TYPE YOUR DASHBOARD NAME]')
```

Now, let's set up the LED by connecting the NodeMCU.

```python
# LED setup
led = digitalio.DigitalInOut(board.D5) # Setup LED at Pin 5
led.direction = digitalio.Direction.OUTPUT # Sets the direction of LED to an output
```

To subscribe to the readings from Adafruit IO, we will make use of `receive(digital.key)` function.

```python
while True:
  data = aio.receive(digital.key) 
  led.value = int(data.value) # Set the LED to the feed value
  time.sleep(0.5) # Timeout so we don't flood adafruit-io with requests
```

In the snippet above, we subscribe the data from the cloud, and set the brightness of LED by assigning the value to `led.value`. 

#### Result
Finally, our code is ready for compilation and to be uploaded. To compile your code, press `Ctrl + R`. After compilation, the compiled binary codes are uploaded to the NodeMCU hardware by pressing `Ctrl + U`. 

You will see the screen as shown below:

![Code compilation](/engineering-education/introduction-to-adafruit-io/uploading.png)

*Compilation of the source code*

After the compilation, the values will be uploaded into the Adafruit IO cloud. To subscribe to the values, run the python file using a terminal. To run a python file, type `python [filename].py`.

The output can be seen in the LEDs, where the brightness level increases from 10 to 100. The change in brightness level would be very minimum. To note a significant change in the brightness, loop through the values accordingly with bigger increments.

Thus, we have published the values from a client module to the Adafruit IO cloud, subscribed those values to another client, and displayed the LEDs based on the brightness levels.

![Result](/engineering-education/introduction-to-adafruit-io/result.gif)

*Source: GIF by [Steemit](https://steemit.com/arduino/@makerhacks/blinking-leds-with-python-how-to-code-in-micro-python-on-the-esp8266-nodemcu)*

### Conclusion
To conclude, we have learned about IoT deployments on the cloud using Adafruit IO. We also built a simple project as a demonstration.

To learn more about Adafruit IO, visit their [official documentation](https://learn.adafruit.com) page.

To summarize:
- We learned about IoT and cloud computing.

- We understood the advantages of deploying IoT solutions on the cloud.

- We learned about the cloud provider called Adafruit IO.

- We learned how to work with Adafruit IO, by building a simple project.

### Further reading
- [Getting started with NodeMCU](https://www.section.io/engineering-education/getting-started-with-nodemcu)
- [Adafruit IO documentation](https://io.adafruit.com/api/docs/#adafruit-io-http-api)
- [Learn more about Adafruit IO](https://learn.adafruit.com/adafruit-io/overview)
- [Features of Cloud computing](https://data-flair.training/blogs/features-of-cloud-computing/)
- [Internet of Things - Wikipedia](https://en.wikipedia.org/wiki/Internet_of_things)
- [Adafruit IO - Python](https://learn.adafruit.com/adafruit-io-basics-digital-output/python-code)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
