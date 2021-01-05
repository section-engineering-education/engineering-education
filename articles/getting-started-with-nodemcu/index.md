---
layout: engineering-education
status: publish
published: true
url: /engineering-education/getting-started-with-nodemcu/
title: Getting started with NodeMCU
description: A tutorial on introduction to microcontroller, NodeMCU, and its uses in IoT.
author: srishilesh-p-s
date: 2021-01-00T00:00:00-00:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/getting-started-with-nodemcu/hero.jpg
    alt: Getting started with NodeMCU
---
In this article, we will learn about the NodeMCU microcontroller. By the end of the article, you will have an overview of what a microcontroller is, what NodeMCU is, and its use in the Internet of Things. You will also learn step-by-step procedures for building a simple program to control the blinking of LEDs using NodeMCU.
<!--more-->
As a prerequisite, a little knowledge about [C programming language](https://en.wikipedia.org/wiki/C_(programming_language)) would help to follow this article along.

### Table of contents
- [Microcontroller](#microcontroller)
- [NodeMCU](#nodemcu)
- [Step by Step Guide](#step-by-step-guide)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Microcontroller
> According to [Wikipedia](https://en.wikipedia.org/wiki/Microcontroller), A microcontroller (MCU for microcontroller unit) is a small computer on a single metal-oxide-semiconductor (MOS) integrated circuit (IC) chip. A microcontroller contains one or more CPUs (processor cores) along with memory and programmable input/output peripherals.

In simple words, a Microcontroller can be called a mini-computer with an in-built CPU processor, Memory, and other I/O peripherals.

Microcontrollers come with different configurations and architectures depending on the application it is used for. It is being used extensively in various industries like Manufacturing, Robotics, Automation, the Internet of Things, and so on.

For example, Microcontrollers are used as embedded devices in appliances like ACs and Washing machines which enables humans to interact with the devices. They contain in-built programs for simplifying human tasks.

### NodeMCU
In this article, we will be focusing on the NodeMCU microcontroller. NodeMCU stands for Node MicroController Unit. The below image shows a NodeMCU microcontroller board.

![NodeMCU ESP2866](/engineering-education/getting-started-with-nodemcu/nodemcu.png)

[Image Source](https://cityos-air.readme.io/docs/esp8266-nodemcu)

> According to [this](https://components101.com/development-boards/nodemcu-esp8266-pinout-features-and-datasheet) article, NodeMCU is an open-source Lua based firmware and development board specially targeted for IoT based applications. It includes firmware that runs on the ESP8266 Wi-Fi SoC from Espressif Systems, and hardware that is based on the ESP-12 module.

#### Features
- NodeMCU ESP12 module contains Tensilica Xtensa® 32-bit LX106 RISC microprocessor.
- Operates at 80 to 160 MHz.
- Operating voltage of 3.3V.
- 128KB RAM and 4MB of Flash memory.
- Contains inbuilt 802.11b/g/n WiFi transceiver.
- Contains 17 GPIOs (General Purpose Input Output).
- Provides serial communication via the UART interface.

All the above components with several additional features can be seen in this pin diagram.

![ESP2866 Pin Diagram](/engineering-education/getting-started-with-nodemcu/pin-diagram.png)

[Image source](https://randomnerdtutorials.com/esp8266-pinout-reference-gpios/)

When compared with other microcontrollers like Arduino, we see that:
- NodeMCU comes with 128KB RAM, whereas Arduino has 2KB RAM.
- NodeMCU has 4MB ROM, whereas Arduino has 32KB ROM.
- NodeMCU comes with a MicroUSB port, but Arduino requires a USB-B type.
- The development board for NodeMCU is much smaller when compared with others.
- NodeMCU is very cheap with a cost of 5 USD.

### Step by Step Guide
#### Setup
Before we get started with building a simple project, it's required to set up the [Arduino IDE](https://www.arduino.cc/en/software/) for the [NodeMCU](https://en.wikipedia.org/wiki/NodeMCU) board as mentioned in [this](https://create.arduino.cc/projecthub/electropeak/getting-started-w-nodemcu-esp8266-on-arduino-ide-28184f) tutorial.

#### Requirements
On following [this](https://create.arduino.cc/projecthub/electropeak/getting-started-w-nodemcu-esp8266-on-arduino-ide-28184f) tutorial, ensure that you have performed the below-mentioned tasks:

- Installed Arduino IDE.
- Added NodeMCU ESP2866 in the Arduino IDE board manager.
- Connect the NodeMCU ESP2866 hardware to the computer using a USB cable.
- Verify if the connection is established, by heading over to the `Device Manager` and check for `COM5` port availability under the `Ports` section.

#### Code for blinking LEDs
NodeMCU ESP2866 board has 2 inbuilt LED's with pins `GPIO2` and `GPIO16`.

To assign the LEDs to the GPIO pins, we have to create a variable and assign the respective pin, as shown below.

```c
int LED1 = 2;      // Assign LED1 to pin GPIO2
int LED2 = 16;     // Assign LED2 to pin GPIO16
```

Now, inside the `setup()` method, we have to set both the LEDs as `OUTPUT` pins using the `pinMode()` function. This function maps the pin to the type of interface. The type of interface can either be `INPUT` or `OUTPUT`.

For demonstration, we use both the LEDs as `OUTPUT` interfaces as shown below:

```c
void setup() {
  // Initialize GPIO2 and GPIO16 as output interfaces
  pinMode(LED1, OUTPUT); // Set pin 2 as OUTPUT
  pinMode(LED2, OUTPUT); // Set pin 16 as OUTPUT
}
```

In the `loop()` method, we write code that runs continuously until the exit conditions are met. For our example, it is expected to light up LEDs alternatively with a delay of 1 second each.

```c
// This function runs forever
void loop() {
  digitalWrite(LED1, LOW);    // LED1 - OFF
  digitalWrite(LED2, HIGH);   // LED2 - ON
  delay(1000);                // Delay of 1 second
  digitalWrite(LED1, HIGH);   // LED1 - ON
  digitalWrite(LED2, LOW);    // LED2 - OFF
  delay(1000);                // Delay of 1 second
}
```

Now, our code is ready for compilation and uploading. To compile your code, press `Ctrl + R`. After compilation, the compiled binary codes are uploaded to the NodeMCU hardware by pressing `Ctrl + U`. You will see the screen as shown below:

![ESP2866 Code Uploading](/engineering-education/getting-started-with-nodemcu/uploading.png)

On following the above-mentioned steps correctly, you can see both the LEDs blinking alternatively with a delay of 1 second each.

![Result](/engineering-education/getting-started-with-nodemcu/result.gif)

[Image Source](https://steemit.com/arduino/@makerhacks/blinking-leds-with-python-how-to-code-in-micro-python-on-the-esp8266-nodemcu)

### Conclusion
To conclude, we have learned about what microcontrollers are, what a NodeMCU is, and its usage in the Internet of Things. We also learned a step by step procedure for building a simple project for blinking LEDs.

To summarize:

- We learned about microcontrollers.

- We learned about NodeMCU and its uses in the Internet of Things.

- We built a project for the blinking of LEDs.

### Further Reading
- [Microcontrollers on Wikipedia](https://en.wikipedia.org/wiki/Microcontroller)
- [NodeMCU on Wikipedia](https://en.wikipedia.org/wiki/NodeMCU)
- [NodeMCU Specifications and Features](https://components101.com/development-boards/nodemcu-esp8266-pinout-features-and-datasheet)
- [Detailed specifications](https://lastminuteengineers.com/esp8266-nodemcu-arduino-tutorial/)

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)