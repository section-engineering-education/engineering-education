---
layout: engineering-education
status: publish
published: true
url: /introduction-to-yolo-algorithm-for-object-detection/
title: Introduction to YOLO Algorithm for Object Detection
description: This article will cover the basics of the YOLO algorithm for object detection. It will take readers through aspects such as the importance, working, and application of this algorithm.  
author: grace-karimi
date: 2021-04-15T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-yolo-algorithm-for-object-detection/hero.jpg
    alt:  yolo algorithm example image
---
YOLO is an algorithm that uses neural networks to provide real-time object detection. This algorithm is popular because of its speed and accuracy. It has been used in various applications to detect traffic signals, people, parking meters, and animals. 
<!--more-->
This article introduces readers to the YOLO algorithm for object detection and explains how it works. It also highlights some of its real-life applications.

### Introduction to object detection
Object detection is a phenomenon in [computer vision](/computer-vision-straight-lines/) that involves the detection of various objects in digital images or videos. Some of the objects detected include people, cars, chairs, stones, buildings, and animals.

This phenomenon seeks to answer two basic questions: 
1. *What is the object?* This question seeks to identify the object in a specific image. 
2. *Where is it?* This question seeks to establish the exact location of the object within the image. 

Object detection consists of various approaches such as [fast R-CNN](https://towardsdatascience.com/understanding-fast-r-cnn-and-faster-r-cnn-for-object-detection-adbb55653d97?gi=fea1a85170b6), [Retina-Net](https://developers.arcgis.com/python/guide/how-retinanet-works/), and [Single-Shot MultiBox Detector (SSD)](https://iq.opengenus.org/single-shot-detection-ssd-algorithm/). Although these approaches have solved the challenges of data limitation and modeling in object detection, they are not able to detect objects in a single algorithm run. **YOLO algorithm** has gained popularity because of its superior performance over the aforementioned object detection techniques.

### What is YOLO? 
YOLO is an abbreviation for the term ‘You Only Look Once’. This is an algorithm that detects and recognizes various objects in a picture (in real-time). Object detection in YOLO is done as a regression problem and provides the class probabilities of the detected images. 

YOLO algorithm employs convolutional neural networks (CNN) to detect objects in real-time. As the name suggests, the algorithm requires only a single forward propagation through a neural network to detect objects. 

This means that prediction in the entire image is done in a single algorithm run. The CNN is used to predict various class probabilities and bounding boxes simultaneously. 

The YOLO algorithm consists of various variants. Some of the common ones include tiny YOLO and YOLOv3.

### Why the YOLO algorithm is important

YOLO algorithm is important because of the following reasons:
- **Speed:** This algorithm improves the speed of detection because it can predict objects in real-time. 
- **High accuracy:** YOLO is a predictive technique that provides accurate results with minimal background errors. 
- **Learning capabilities:** The algorithm has excellent learning capabilities that enable it to learn the representations of objects and apply them in object detection.  

### How the YOLO algorithm works
YOLO algorithm works using the following three techniques:
- Residual blocks
- Bounding box regression
- Intersection Over Union (IOU)

#### Residual blocks
First, the image is divided into various grids. Each grid has a dimension of S x S. The following image shows how an input image is divided into grids. 

![Grids](/engineering-education/introduction-to-yolo-algorithm-for-object-detection/grids.png)

[Image Source](https://www.guidetomlandai.com/assets/img/computer_vision/grid.png)

In the image above, there are many grid cells of equal dimension. Every grid cell will detect objects that appear within them. For example, if an object center appears within a certain grid cell, then this cell will be responsible for detecting it. 

#### Bounding box regression
A bounding box is an outline that highlights an object in an image. 

Every bounding box in the image consists of the following attributes:
- Width (bw)
- Height (bh)
- Class (for example, person, car, traffic light, etc.)- This is represented by the letter c.
- Bounding box center (bx,by)

The following image shows an example of a bounding box. The bounding box has been represented by a yellow outline. 

![Bounding Box](/engineering-education/introduction-to-yolo-algorithm-for-object-detection/bounding-box.png)

[Image Source](https://appsilondatascience.com/assets/uploads/2018/08/bbox-1.png)

YOLO uses a single bounding box regression to predict the height, width, center, and class of objects. In the image above, represents the probability of an object appearing in the bounding box. 

#### Intersection over union (IOU)
Intersection over union (IOU) is a phenomenon in object detection that describes how boxes overlap. YOLO uses IOU to provide an output box that surrounds the objects perfectly. 

Each grid cell is responsible for predicting the bounding boxes and their confidence scores. The IOU is equal to 1 if the predicted bounding box is the same as the real box. This mechanism eliminates bounding boxes that are not equal to the real box. 

The following image provides a simple example of how IOU works. 

![IOU](/engineering-education/introduction-to-yolo-algorithm-for-object-detection/iou.jpeg)

[Image Source](https://miro.medium.com/max/640/1*VuAsK1Wwa_mOxW2nK2UovQ.jpeg)

In the image above, there are two bounding boxes, one in green and the other one in blue. The blue box is the predicted box while the green box is the real box. YOLO ensures that the two bounding boxes are equal. 

#### Combination of the three techniques
The following image shows how the three techniques are applied to produce the final detection results.

![How YOLO Algorithm Works](/engineering-education/introduction-to-yolo-algorithm-for-object-detection/how-yolo-algorithm-works.jpg)

[Image Source](https://www.guidetomlandai.com/assets/img/computer_vision/YOLO.PNG)

First, the image is divided into grid cells. Each grid cell forecasts B bounding boxes and provides their confidence scores. The cells predict the class probabilities to establish the class of each object. 

For example, we can notice at least three classes of objects: a car, a dog, and a bicycle. All the predictions are made simultaneously using a single convolutional neural network.

Intersection over union ensures that the predicted bounding boxes are equal to the real boxes of the objects. This phenomenon eliminates unnecessary bounding boxes that do not meet the characteristics of the objects (like height and width). The final detection will consist of unique bounding boxes that fit the objects perfectly. 

For example, the car is surrounded by the pink bounding box while the bicycle is surrounded by the yellow bounding box. The dog has been highlighted using the blue bounding box. 

### Applications of YOLO
YOLO algorithm can be applied in the following fields:
- **Autonomous driving:** YOLO algorithm can be used in autonomous cars to detect objects around cars such as vehicles, people, and parking signals. Object detection in autonomous cars is done to avoid collision since no human driver is controlling the car. 
- **Wildlife:** This algorithm is used to detect various types of animals in forests. This type of detection is used by wildlife rangers and journalists to identify animals in videos (both recorded and real-time) and images. Some of the animals that can be detected include giraffes, elephants, and bears.
- **Security:** YOLO can also be used in security systems to enforce security in an area. Let’s assume that people have been restricted from passing through a certain area for security reasons. If someone passes through the restricted area, the YOLO algorithm will detect him/her, which will require the security personnel to take further action.  

### Conclusion
This article has provided an overview of the YOLO algorithm and how it is used in object detection. This technique provides improved detection results compared to other object detection techniques such as Fast R-CNN and Retina-Net.  

To summarize:
- We have gained an overview of object detection and the YOLO algorithm.
- We have gone through the main reasons why the YOLO algorithm is important.
- We have learned how the YOLO algorithm works. We have also gained an understanding of the main techniques used by YOLO to detect objects. 
- We have learned the real-life applications of YOLO. 

Happy learning!

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
