---
layout: engineering-education
status: publish
published: true
url: /engineering-education/conditional-automation-in-driving/
title: Conditional Automation in Driving - Level 3 Autonomous Cars
description: This article will serve as an introduction to conditional automation in driving. In conditional automation, the level 3 car performs safety-critical functions such as acceleration, deceleration, and steering.
author: onesmus-mbaabu
date: 2020-12-01T00:00:00-20:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/conditional-automation-in-driving/hero.jpg
    alt: Conditional Automation in Driving example image
---
Autonomous driving is gaining momentum in the automobile industry. Developers have gained interest in this area because of the application of artificial intelligence (AI) and internet of things (IoT) in driving. Conditional automation is a level of autonomous driving that is currently under production.
<!--more-->
### What is an autonomous car?
An autonomous car is a car that uses technology to operate with little or no assistance from human drivers. Self-driving is achieved with the help of artificial intelligence, cameras, and sensors. The technology that is used in developing these cars is evolving.

#### Levels of autonomous driving
Before focusing on conditional automation in driving, it's important to look at the various levels of automation in driving.

There are six autonomy levels in driving.

These are:

- **Level 0: No automation**- In this level, the car does not have technological capabilities that enhance self-driving. The car is controlled by a human driver.
- **Level 1: Driver-assist**- The driver does most of the operations. There is the automation of some individual controls. For example, electronic stability control can enhance the stability of the vehicle.
- **Level 2: Partial automation**- In this level, two or more controls can be automated simultaneously. There is higher automation than in level 1.
- **Level 3: Conditional Automation**-  There is higher automation than in level 2. The car can control a significant number of operations.
- **Level 4: High Automation**- All critical functions are automated. The driver does not control the car at any time.
- **Level 5: Full automation**- This is the highest level of automation. All functions are automated, and the car can carry human passengers with no human interaction.

### Introduction to conditional automation in driving
Conditional automation is the third level of automation in driving. This level consists of approximately 75% automation. In conditional automation, the level 3 car performs safety-critical functions such as acceleration, deceleration, and steering.

A level 3 cars can also monitor the road and surroundings. It requires the human driver to be aware in case of self-driving failures. When the autonomous car fails, it will require the driver to retake control.

In level 3 cars, the human driver is simply a co-driver who will only take control under certain conditions. The driver can engage in other things, like watching the surroundings or texting.

The autonomous car will handle situations that require an immediate response. For example, when another vehicle suddenly appears in front of the car, the vehicle will perform emergency braking.

### Key features of a level 3 autonomous car
A level 3 autonomous car has certain technological features that facilitate self-driving.

#### Computer power
A computer system is required in a level 3 car to enhance the processing of information and activities within the car. Extreme computing power is required to support the automation of controls (more than the traditional CPUs).

Graphical processing units (GPUs) are used by automobile companies for processing. However, GPUs haven't been effective enough to provide the sufficient processing power needed in self-driving cars. This made Tesla introduce [neural network acceleration chips (NNA)](https://www.youtube.com/watch?v=CJfAmGdA_RI), that have a higher processing capacity than GPU.

An alternative AI acceleration chip that can be used in autonomous driving is the field-programmable gate array (FPGA). FPGAs are better than GPUs in terms of computational power and power efficiency. However, GPUs are more cost-efficient than these chips. They also provide platforms that are easier to use than FPGAs.  

#### Cameras
Cameras are used to capture the road and surrounding environments. The captured images help the autonomous car to choose the right control depending on the situation. For example, if the camera senses an image in front of the car, it will initiate a braking control. It translates the visual data collected using cameras into 3D actionable data.

There are various cameras in the car. Failure in one of these cameras may affect the driving of the car. Technical problems or extreme weather may lead to camera failure. A good example of a technical problem is touchscreen failure on the dashboard. As a result, it won't display the rearview image, which may affect the reversing of the vehicle.

Cameras perform well in cold, sunny, and windy weather. Yet, extreme weather such as storms and fog may lead to poor visibility. In such cases, the cameras may not capture visual data effectively. Other sensors may play an important role of detecting other nearby objects during such situations.

Autonomous cars are fitted with infrared cameras to further improve visibility. Infrared cameras have additional capabilities beyond normal cameras, that enable them to perform well in darkness.

#### Radar
A level 3 car uses radar to detect the distance and presence of objects that are in front of the car. Radar helps the car achieve control in normal and extreme weather.

It can enhance self-driving in situations where cameras have limited visibility (for example snow, rain or fog). It achieves this through the use of radio waves. Radar is good at estimating the distance between objects. However, it has limitations with the classification of objects.

#### Sensors
Various sensors are used to detect situations and respond to them. For example, the sensors can detect a pedestrian crossing the road, which will prompt the braking system to stop the car.

LIDAR sensors are placed at the top of the car to provide 3D data on the area surrounding the car. These sensors use light waves to provide information regarding nearby objects. Inertial sensors, ultrasonic sensors, and GPS tracking sensors are utilized to monitor the performance of the autonomous car.

![Features of Level 3 Cars](/engineering-education/conditional-automation-in-driving/features-of-level-3-cars.png)

[Image Source: Trushield Insurance](https://www.trushieldinsurance.ca/wp-content/uploads/2015/06/Driverless-Car-Infographic-EN.png?x61594)

### How level 3 autonomous cars work
A level 3 car works through the coordination of hardware and software components. In the software component of the car, advanced technological systems have been programmed to initiate controls.

Various algorithms are used in this component. These include the regression algorithm, decision-making algorithm, pattern recognition algorithm, and clustering algorithm. These algorithms enhance object detection, decision making, and object recognition.

The hardware component performs the initiate controls. Some of the features in this component include Radar, Lidar, camera, sensors, and other physical parts of the car (for example: brakes, steering wheel, and tires).

Analyzing the key activities in driving can help explain how a level 3 car works.

- **Driving and stopping:** In level 3 cars, there is an Adaptive Cruise Control (ACC) system that helps in maintaining a specified level of speed. This system is also important in keeping a certain distance between the car and other cars. ACC can also enable the car to brake and come to a stop depending on the distance between cars.

- **Emergency braking:** Autonomous Braking Systems (ABSs) help with emergency braking to avoid accidents. ABSs use sensors to detect the likelihood of a crash. The system will prevent collision through the initiation of instant brakes.

- **Maintaining lanes:** Many would wonder how an autonomous car can maintain its lane on a highway. A lane-centering system enables the autonomous car to stay safely within its lane. It monitors the lane markings using cameras. When the vehicle is not within its lane, it will initiate a warning.

- **Parking:** Autonomous cars have parking sensors that help in scanning the surrounding environment when parking is initiated. When the vehicle is too close to an object, a warning sound will go off. The level 3 car has forward and reverse options that are needed during parking.

- **Traffic Lights:** Traffic rules need to be obeyed, whether or not a car is automated. Autonomous cars use a traffic sign recognition system (TSR) that uses image processing techniques to recognize traffic signs. It takes the color and shape of the traffic signs into account. The autonomous car performs controls based on the traffic sign indicated. For example, if the traffic sign indicates stop, the car will start braking and will come to a stop.

- **Driving at night:** Automatic night vision systems are employed to enhance cruising at night. Various technologies are used to detect objects. These include infrared sensors, Lidar, cameras, Radar, and GPS.

- **Driving in the rain:** Autonomous cars use vehicular rain sensors to detect rain. These sensors are water-sensitive. During rainy weather, the sensors will trigger certain actions such as closing open windows and convertible tops.

![How Level 3 Cars Work](/engineering-education/conditional-automation-in-driving/how-level-3-cars-work.png)

[Image Source: Landmark Dividend](https://www.landmarkdividend.com/wp-content/uploads/2018/05/Autonomous-Car-3.png)


### The future of automation
We expect the technology used in the automation of cars to develop. The current level of automation that has been applied in real-life is level 2. Technological innovation has enabled companies such as Tesla and Honda to engage in the development of advanced automation cars.

Recently, Honda was granted the permission to [sell autonomous cars (level 3) in Japan](https://news.yahoo.com/honda-wins-world-first-approval-115115427.html). In this regard, Honda is planning to engage in the [mass production of level 3 autonomous cars](https://techcrunch.com/2020/11/11/honda-to-mass-produce-level-3-autonomous-cars-by-march/). This is a sign that level 3 cars may be available for commercial use in the coming years.

It's also expected that Honda’s approval will ignite intensive competition in the car automation industry. Automobile companies like Kia, BMW, Mercedes Benz, and Hyundai are also aiming at producing level 3 automation cars. The end result will be advanced autonomous cars that will revolutionize driving.

The commercialization of level 3 cars will provide a platform for technological advancement in car automation. Continuous technological advancement will pave the way for fully automated cars. Although this may take a long time, it's still a big possibility.

### Resources
[Car Magazine](https://www.carmagazine.co.uk/car-news/tech/autonomous-car-levels-different-driverless-technology-levels-explained/)

[Cars.com](https://www.cars.com/articles/autonomous-driving-levels-and-what-they-mean-to-you-424979/)

[Consumer Reports](https://www.consumerreports.org/autonomous-driving/levels-of-car-automation/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
