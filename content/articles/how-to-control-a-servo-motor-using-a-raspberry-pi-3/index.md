---
layout: engineering-education
status: publish
published: true
url: /how-to-control-a-servo-motor-using-a-raspberry-pi-3/
title: How to Control a Servo Motor using a Raspberry Pi 3
description: This article will seek to explain how a raspberry pi can be programmed to control a servo motor. The aim is to simulate a simple IoT scenario where the motor simulates a car engine and the Raspberry Pi simulates the control system.
author: ruth-mare
date: 2021-11-30T00:00:00-17:40
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-control-a-servo-motor-using-a-raspberry-pi-3/hero.jpg
    alt: Servo Motor using a Raspberry Pi 3 Hero Image
---
The Internet of Things abbreviated as IoT, this concept has facilitated the easier remote control and integration of mobile and end devices.
<!--more-->
This article will go over a simple scenario of such an application where a raspberry pi can be used to control a motor.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction to Motors](#introduction-to-motors)
- [Comparison of Servos and DC Motors](#comparison-of-servos-and-dc-motors)
- [Setting up Raspberry Pi to control the Servo Motor](#setting-up-raspberry-pi-to-control-the-servo-motor)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should have:
1. Basic knowledge of [IoT](/engineering-education/an-overview-of-iot-technology/).
2. Basic knowledge and operation on [Raspberry Pi](raspberrypi.org).

### Introduction to motors
Motors are machines that operate to produce motion. This can be simply explained as changing of electric power into mechanical power. Electric current and the magnetic fields in a motor interact to produce force in the form of torque which in turn moves the motor shaft.

For a motor to produce that mechanical power, we need to provide it with adequate electrical power voltage range. This is because high voltages will mean increased power to the motor which results in wear and tear that can cause the motor to break.

How efficient the motor acts, depends on the quality of the motor.

### Comparison of Servos and DC motors
DC motors are great at rotating continuously in one direction through to 360 degrees while Servo motors can turn their shaft to a specific position only up to 180 degrees. These motors are used in adjusting the steering of remote-controlled cars and airplanes.

DC motors have a free-spinning speed of 3000 to 9000 rotations per minute which makes them suitable for driving light things that rotate at a fast speed.

Servo motors are made from DC motors by adding the following components:
- A position sensor for the motor shaft to track in what direction and how much the motor is turning in that direction.
- Some gear reduction to reduce the angle of rotation.
- An electric circuit that controls the motor to tell it the direction it should move and how much to turn to that direction.

Generally; a servo motor operation is geared towards getting the shaft of the motor to the desired position around 180 degrees from a reference point.

Examples of servo motors are shown in the images below:

![Servo motor diagram 1](/engineering-education/how-to-control-a-servo-motor-using-a-raspberry-pi-3/servo.png)

![Servo motor diagram 2](/engineering-education/how-to-control-a-servo-motor-using-a-raspberry-pi-3/servo-motor.png)

### Setting up Raspberry Pi to control the Servo motor
#### Step 1: Connecting the motor to Raspberry Pi through wires
Take note that the motor has a set of 3 wires, red, brown, and orange. The red one is `+ve` and the brown one is `-ve`. 

The orange wire is used to send the control signals i.e., pulse width modulation control signal. The 3 wires are connected to different pins on the raspberry pi.

Thus, for more flexibility, we will connect them using jumper cables as shown in the diagram below:

![Jumper cable connection](/engineering-education/how-to-control-a-servo-motor-using-a-raspberry-pi-3/jumper-cable.png)

We then connect the signal wire to `GPIO` pin 11, the positive to pin 4 which supplies 5 volts, and the `-ve` to pin 6 as shown in the diagram below:

![Pin connections on Pi](/engineering-education/ how-to-control-a-servo-motor-using-a-raspberry-pi-3/pi-pin-numbering.jpg)

#### Step 2: Programming the Raspberry Pi

#### 2.1 Importing libraries
We begin by importing the libraries essential for this task. In this case, time and Raspberi pi GPIO.

```bash
import RPi.GPIO as GPIO
import time
```

#### 2.2 Setting GPIO numbering mode
Here, we set the numbering mode of the GPIO to the board numbering mode so that the numbering is followed systematically according to the board.

```bash
GPIO.setmode(GPIO.BOARD)
```

#### 2.3 Setting pin 11 as an output and servo as pin 11 with PWM (Pulse Width Modulation)
We proceed to set pin 11 as the output:

```bash
GPIO.setup(11,GPIO.OUT)
```

Next, we set up a variable. I called my `servo` pin 11 with PWM. The 50 defines the pulse frequency at pin 11 and the 11 is simply the PIN number.

```bash
servo = GPIO.PWM(11,50)
```

#### 2.4 Start PWM running, but with a value of 0 i.e., pulse off

```bash
servo.start(0)
print ("Waiting for 1 second")
time.sleep(1)
```

#### 2.5 Rotating the Servo shaft
We define a variable duty and assign a random value say 2. In this case, it acts as the starting point in our intervals count.

We will then loop for duty values from 2 to 17. Given the interval division between 2 to 17 if duty is incremented by 1 every time the shaft moves, the motor will move the shaft. This is after every 1 second at intervals of 12 degrees each until the shaft rotates 180 degrees.

```bash
print ("Rotating at intervals of 12 degrees")
duty = 2
while duty <= 17:
servo.ChangeDutyCycle(duty)
time.sleep(1)
duty = duty + 1
```

#### 2.6 Time to turn back
To turn back the shaft to 0 degrees, we simply change the duty cycle to make one big 180 degrees turn back to 0 degrees.

```bash
print ("Turning back to 0 degrees")
servo.ChangeDutyCycle(2)
time.sleep(1)
servo.ChangeDutyCycle(0)
```

#### 2.7 Cleaning up the environment
We use the code snippet below to clean up the environment:

```bash
Servo.stop()
GPIO.cleanup()
print ("Everything's cleaned up")
```

### Conclusion
The above piece of code when ran all together would execute the turning of the motor shaft 180 degrees back and forth. Then, it will clean up the operating environment. You can try the same with more than one motor and see how fun this can get.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)