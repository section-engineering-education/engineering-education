---
layout: engineering-education
status: publish
published:
url: / how-to-control-a-servo-motor-using-a-raspberry-pi-3/
title: How to control a Servo Motor using a Raspberry Pi 3
description: This article will seek to explain how a raspberry pi can be programmed to control a servo motor. The aim is to simulate a simple IoT scenario where the motor simulates a car engine and the Raspberry Pi simulates the control system.
author: ruth-mare
date: 2021-11-13T00:00:00-11:51
topics: [Internet of Things]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/ how-to-control-a-servo-motor-using-a-raspberry-pi-3/hero.jpg
alt: How to control a Servo Motor using a Raspberry Pi 3 example image
---
Internet of Things or popularly abbreviated as IoT, has facilitated the easy remote control and integration of mobile and end devices. This is a simple scenario of such an application where a raspberry pi can be used to control a motor.
<!--more-->

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction to Motors](#introduction-to-motors)
- [Comparison of Servos and DC Motors](#comparison-of-servos-and-dc-motors)
- [Setting up Raspberry Pi to control the Servo Motor](#setting-up-raspberry-pi-to-control-the-servo-motor)
- [Conclusion](#conclusion)

### Prerequisites
1. Basic knowledge about the [Internet of Things](https://www.section.io/engineering-education/an-overview-of-iot-technology/).
2. Basic knowledge and operation on [Raspberry Pi](raspberrypi.org).


### Introduction to Motors
Motors are machines that operate to produce motion. This can be simply explained as changing of electric power into mechanical power.

Electric current and the magnetic fields in a motor interact to produce force in the form of torque which in turn moves the motor shaft.

For a motor to produce that mechanical power we need to provide it with electrical power in adequate voltage range because too high voltages will mean increased power of the motor which results to wear and tear that will make the motor break.

How efficient the motor is, depends on the quality of the motor.

### Comparison of Servos and DC motors
DC motors are great at rotating continuously in one direction through to 360 degrees while Servo motors can turn their shaft to a specific position only up to 180 degrees.

These motors are used in adjusting the steering of remote-controlled cars and airplanes.

DC motors have a free-spinning speed of 3000 to 9000 rotations per minute which makes them suitable for driving light things that rotate at a fast speed.

Servo motors are made from DC motors by adding the following components:
-	A position sensor for the motor shaft to track in what direction and how much the motor is turning in that direction.
-	Some gear reduction to reduce the angle of rotation.
-	An electric circuit that controls the motor to tell in what direction and how much to turn to that direction.

Generally; a servo motor operation is geared towards getting the shaft of the motor to a desired position around 180 degrees from a reference point.

Examples of servo motors are shown in the images below:
Diagram 1
![Servo motor diagram 1](/engineering-education/ how-to-control-a-servo-motor-using-a-raspberry-pi-3/servo.png)

Diagram 2
![Servo motor diagram 2](/engineering-education/ how-to-control-a-servo-motor-using-a-raspberry-pi-3/servo-motor.png)

### Setting up Raspberry Pi to control the Servo motor

#### Step 1: Connecting the motor to the raspberry pi through wires
Take note that the motor has a set of 3 wires, red, brown, and orange.

The red one is +ve and the brown one is -ve. The orange wire is used to transmit the control signals i.e., Pulse width modulation control signal.

The 3 wires are connected to different pins on the raspberry pi therefore, for flexibility we will connect them using jumper cables as shown in the diagram below:
![Jumper cable connection](/engineering-education/ how-to-control-a-servo-motor-using-a-raspberry-pi-3/jumper-cable.png)

We then connect the signal wire to GPIO pin 11, the positive to pin 4 which supplies 5 volts, and the -ve to pin 6 as shown in the diagram below:
![Pin connections on Pi](/engineering-education/ how-to-control-a-servo-motor-using-a-raspberry-pi-3/pi-pin-numbering.jpg)

#### Step 2: Programming the Raspberry Pi
**2.1 Importing libraries**
We begin by importing the libraries essential for this task, in this case, time and Raspberi pi GPIO:

```bash
import RPi.GPIO as GPIO
import time
```

**2.2 Setting GPIO numbering mode**
Here we set the numbering mode of the GPIO to the board numbering mode so that the numbering is followed systematically according to the board.

```bash
GPIO.setmode(GPIO.BOARD)
```

**2.3 Setting pin 11 as an output, and servo as pin 11 with PWM (Pulse Width Modulation)**
We proceed to set pin 11 as the output:

```bash
GPIO.setup(11,GPIO.OUT)
```

Next, we set up a variable I called mine servo as pin 11 with PWM.
The 50 defines the pulse frequency at pin 11 and the 11 is simply the pin number.

```bash
servo = GPIO.PWM(11,50)
```

**2.4 Start PWM running, but with a value of 0 i.e., pulse off**

```bash
servo.start(0)
print ("Waiting for 1 second")
time.sleep(1)
```

**2.5 Rotating the Servo shaft**
We define a variable duty and assign a random value say 2 in this case, which acts as the starting point in our intervals count.
We will then loop for duty values from 2 to 17. Given the interval division between 2 to 17 if duty is incremented by 1 every time the shaft moves, after every 1 second the motor will move the shaft at intervals of 12 degrees each until the shaft rotates 180 degrees.

```bash
print ("Rotating at intervals of 12 degrees")
duty = 2
while duty <= 17:
servo.ChangeDutyCycle(duty)
time.sleep(1)
duty = duty + 1
```
**2.6 Time to turn back**
To turn back the shaft to 0 degrees we simply change the duty cycle to make one big 180 degrees turn back to 0 degrees.
```bash
print ("Turning back to 0 degrees")
servo.ChangeDutyCycle(2)
time.sleep(1)
servo.ChangeDutyCycle(0)
```
**2.7 Cleaning up the environment**
We use the code snippet below to clean up the environment:
```bash
Servo.stop()
GPIO.cleanup()
print ("Everything's cleaned up")
```
### Conclusion
The above piece of code when run all together would execute turning of the motor shaft 180 degrees forth and back, then clean up the operating environment. You can try the same with more than one motor and see how fun this can get.
Happy coding!
