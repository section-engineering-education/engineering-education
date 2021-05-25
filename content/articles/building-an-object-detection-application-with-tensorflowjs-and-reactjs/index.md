---
layout: engineering-education
status: publish
published: true
url: /building-an-object-detection-application-with-tensorflowjs-and-reactjs/
title: Building an Object Detection Application with Tensorflow.js and React.js on Ubuntu 20.04
description: Object detection is a method in computer vision and image processing that allows us to find and locate where multiple objects are in an image or video. This algorithm draws bounding boxes around one or more objects in the image or video after detecting an object.
author: sharon-kinyan
date: 2021-05-25T00:00:00-11:30
topics: []
excerpt_separator: <!--more-->
images:
  
  - url: /engineering-education/building-an-object-detection-application-with-tensorflowjs-and-reactjs/hero.jpg
    alt: object detection example image
---
In this article we will create an object detection application with Tensorflow.js and React.js on Ubuntu 20.04.
<!--more-->
Have you ever wondered how a self-driving car operates on its own? Or how the face unlock feature on your mobile phone works? The answer is through object detection.

So what is object detection?

Object detection is a method in computer vision and image processing that allows us to find and locate where multiple objects are in an image or video. This algorithm draws bounding boxes around one or more objects in the image or video after detecting an object. These bounding boxes are defined by a point, width, and height. It then assigns the objects class labels, i.e., cat, dog, or car.

### Prerequisites
To follow this article along - the reader will need the following:
1. You need to have [Visual Studio](https://visualstudio.microsoft.com/) code editor installed on your computer. 
2. A Linux operating system is preferred over Windows. For Linux users, any Linux operating system is preferred, but I used Ubuntu 20.04 for this project. 
3. A machine with really good hardware specs is recommended for your machine to run the program on your local computer without peril i.e., a powerful processor and RAM of 4GB and above. 
4. A webcam is also required to perform object detection in real-time.

### Goals
In this tutorial, we will put in place the following tasks:
1. Access the React.js and Tensorflow.js Computer Vision Template.
2. Install Tensorflow.js and setup the pre-built models.
3. Build a React.js app that accesses the webcam.
4. Make detection from the webcam in real-time.

*Let's get started!*

### How it works
1. Use React.js for the standalone front-end application.
2. Capture images from the webcam for object detection.
3. Achieve detection using TensorFlow.js.

### Accessing the React computer vision template
First, we are going to clone my publicly available [ReactComputerVisionTemplate](https://github.com/wmkinyan/ReactComputerVisionTemplate) on Github. This template contains all the code we need to get started.

In our command-line interface, go to the drive that you want to clone into. We will need to run the following command to clone the template:

```bash
git clone https://github.com/wmkinyan/ReactComputerVisionTemplate
```

Please make sure the 'git' command is installed before you try the command above. If not, you can install 'git' by issuing the command:

```bash
sudo apt install git
```

Next, we will need to open the template on VSCode by issuing the following command on the command line interface:

```bash
code .
```

That's 'code' followed with a full stop. That command should fire up our code editor.

It is important to note that these next steps will now be performed on the VSCode editor. We will need to start our React app using the 'npm start' command. This command is issued on the vs code's terminal. 

This command is going to start our react app and open a new browser. It will go directly to the 'localhost 3000' by default. This is where our React app is going to start. 

Please make sure the 'npm' command is installed on your computer before issuing the 'npm start' command. If not, install it using the following command:

```bash
sudo apt install npm
```

After issuing the 'npm install' command, you should see a 'node_modules' folder installed in your list of files in the ReactComputerVisionTemplate folder.

### Installing TensorFow.js and setting up pre-built models
We will use Microsoft's [COCO SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd) pre-trained model, which allows us to perform real-time object detection on images.

On the 'App.js' folder, we will import TensorFlow and the pre-built model into our application by issuing the following commands:

```bash
    import * as tf from "@tensorflow/tfjs";
    import * as cocossd from "@tensorflow-models/coco-ssd";
```

The first command will first import the TensorFlow module into our application. The second command then imports the COCO SSD model from the TensorFlow model.

### Building the React.js app
We first import all the dependencies on the 'App.js' folder, including the React.js library, TensorFlow.js, and the COCO SSD pre-trained model. It imports the required dependencies into our application. 

```bash
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
```

The second thing that we are going to do is to load our 'cocossd' model. 

This is achieved by issuing the following command:

```bash
    const net = await cocossd.load();
```

We first create a new variable called 'net'. We then wait for the 'cocossd' model to load. We use the 'load()' method for this task.

### Make detection using TensorFlow.js
The third thing that we want to do here is to make the detection using our computer webcam. We achieve this by issuing the following command:

```bash
    const obj = await net.detect(video);
```

What this code does is first create a variable called 'obj'. It then uses the 'net' variable we created earlier to get the video properties such as the width and height. By passing the video input from our webcam, ideally, we should detect an object in the video.

As much as it detects objects on the video, it is not drawing anything to the screen. We need the application to draw bounding boxes where the objects are being detected and assign class labels to them, i.e., cat, person, etc.

Finally, once the objects have been detected in the webcam video, we can draw bounding boxes to show where these objects are being detected and assign class labels. This is accomplished by using the function below in the 'utilities.js' folder.

```bash
    export const drawRect = (detections, ctx) =>{
    // Loop through each prediction
    detections.forEach(prediction => {
  
      // Extract boxes and classes
      const [x, y, width, height] = prediction['bbox']; 
      const text = prediction['class']; 
  
      // Set styling
      const color = Math.floor(Math.random()*16777215).toString(16);
      ctx.strokeStyle = '#' + color
      ctx.font = '18px Arial';
  
      // Draw rectangles and text
      ctx.beginPath();   
      ctx.fillStyle = '#' + color
      ctx.fillText(text, x, y);
      ctx.rect(x, y, width, height); 
      ctx.stroke();
    });
  }
```

This is then imported into the main 'App.js' file using the command:

```bash
    import { drawRect } from "./utilities";
```

It is then executed with the command:

```bash
    drawRect(obj, ctx);
```

This enables bounding boxes to be drawn on the video.

To access and tinker with the complete block of code, you can find it [here](https://github.com/wmkinyan/RealTimeObjectDetectionTFJSReact/).

### Conclusion
That wraps it up! In this tutorial, we learned how to build an object detection application using the TensorFlow library in the React app.

*Happy coding!*

### References
1. [React](https://reactjs.org/)
2. [TensorFlow](https://www.tensorflow.org/)
3. [COCO SSD](https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
