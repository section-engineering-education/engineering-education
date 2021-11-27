---
layout: engineering-education
status: publish
published: true
url: /how-to-ground-truth-label-your-datasets/
title: How to ground truth label your datasets 
description: In this tutorial, we will look at creating ground truth data for object detection and semantic segmentation. We will use algorithms to automate the labeling process and integrate ground truth information from other sensors.
author: linet-achieng
date: 2021-11-26T00:00:00-12:15
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-ground-truth-label-your-datasets/hero.jpg
    alt: How to ground truth label your datasets Hero Image
---
Ground truth labeling is the process of checking the results of machine learning for accuracy in the real world. For example, autonomous driving systems are cars that can move without a human driver or human intervention. 
<!--more-->
Instead, these types of cars perceive the environment using sensors. The ground truth labeler app allows us to label videos and images for automotive applications.

We all know that labeling is a tedious and time-consuming process but necessary to create test data to evaluate our perception algorithms. A ground truth labeler is a tool that we have created to reduce some of these pinpoints. 

In this tutorial, we will look at creating ground truth data for object detection and semantic segmentation. We will use algorithms to automate the labeling process and integrate ground truth information from other sensors.

### Prerequisites
To follow along with this tutorial, you'll need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- An understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### How to locate the app
To locate this app:
- At the top of the window, click on App's and click on the dropdown arrow.

![image](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground1.png)

- Locate the ground truth in the labeler in the automation section.

![image 2](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground2.png)

- Click on this app to open it.

Ground truth labeler app allows us to label videos and images for automotive applications. As we all know, labeling is a tedious and time-consuming process, but it is necessary. 

It gives us test data to evaluate the perception algorithm. Our workflow for this tutorial will be:
- Creating ground truth data for detection and semantic segmentation.
- Use an algorithm to automate the labeling process.
- Integrate ground truth information from other sensors.

### Creating ground truth data for object detection and semantic segmentation
Once we open the app, we need to load data into it. To do this, click on `load` at the top-left corner of the app.

If you click on it, the app asks about the type of data that you are inputting. As you can see, we have three options: video, image sequence, and custom reader. The most common file format for data in this app is video and image sequences. But, we use the custom reader if you have a different file format from those mentioned before.

For this tutorial, we are going to load a 25second video into the app. After doing this, we start by ROI label(region of interest) by clicking on the label button.

![labelling button](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground3.png)

When you click on this, the window below opens up.

![new window](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground4.png)

Now let's begin with that of `vehicle` then click `ok`. Note that you can label your data before defining the ROI. 

Also, this app has a workspace shown below where all your label is stored, and you can see them.

![workspace](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground5.png)

After completing this, label the vehicle with the bounding box. To label the data, with the bounding box around them, click on the label at the top of the workspace.

![vehicles labelled](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground6.png)

Let us label the sub-labels. Sub-labels are parts that are associated with a parent label.

For example, we can have vehicle number plates or even wheels as the sub-labels. Let's, for example, name our vehicles `tarlight`. To label, the sub-labels, click on the `sub-labels` right next to the `label` button and then label them on your input using bounding boxes. 

You can have as many bounding boxes as you want. If you click on the`sub-label` button, a new window like that of labeling prompts the user to input the name of the sub-labels.

To make the labels on the input image, you have to select the bounding box of the parent label, and then you make your label inside the bounding box of this main bounding box. If you don't select the parent label first, you won't be able to make your sub-labels. 

From the definition, sub-labels are parts of the parent data or ROI.

![vehicles and the sublabels](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground7.png)

We can assign attributes for our labels and sub-labels. Attribute information makes up the metadata associated with the label. 

In our example, we have the vehicle about the parent label. Now the attribute for vehicles can be vehicles type. 

This attribute window allows the user to input a variety of types as a list. You can have as many as you want.

![list of the vehicle types](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground8.png)

After making your attributes, you click `ok`, which appears on the left side of the window. For example, to label your vehicle types, you select the vehicle, move to the left, and choose the vehicle type below.

![giving vehicle type](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground9.png)

We are happy with our label, but you notice that if we go to another frame, the labels aren't there, as shown below. To go to the next frame, click on the forward circled in the image below:

![next frame](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground10.png)

We notice that we can go ahead and make the labeling again, but this will be tiresome and boring since it is just a repetition of what we did before. This is where now automation comes in.

### Use an algorithm to automate the labeling process.
There are so many in-built algorithms in Matlab that help you with this. You can use an in-built algorithm or write your algorithm to do this, Matlab accepts all these options. 

To use an algorithm, click on the `select algorithm` and select or import algorithm to use.

![algorithms](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground11.png)

For this tutorial, we are going to use the `Point Tracker`. After selecting the algorithm, you select the vehicles that you want to track. 

Also, you input how long you want to track it. It is specified beside the play section where you input the `start time` and `end time`. 

For example, we are going to track the cars for seven seconds.

![tracking](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground12.png)

After this, you click on `automate`. Once you click this, the window displays the instruction for using this algorithm. Read through these instructions and then click on the play at the top of the window.

![automation](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground12a.png)

Once it completes, click on the `accept`. You can look at the `label summary` to see how the labeling proceeded.

![label summary](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground13.png)

### Other capabilities
Let's say that we want to label the lanes. In this case, we don't use bounding boxes, we will use the line and be able to draw in lines.

![labelling the lane](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground14.png)

Also, you can label individual pixels in the image using the `pixel label`. Let's say, for example, we want to label the road, we will make a label road and use the pixel label.

![using pixel label](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground15.png)

Note that you can erase sections that you never intended to be labeled using `erase`, and they also include those that you may have missed using the `brush`. We also have a feature, `smart polygon`. This feature allows you to make a surrounding of what you want to label and makes its segmentation. After all these, you can save your work.

### Integrate ground truth information from other sensors.
This feature allows you to integrate ground truth information from other signals. For example, let's open a video that has been time-synchronized with lidar data. 

To open this, execute the command below:

```Matlab
groundTruthLabeler('01_city_c2s_fcw_10s.mp4', 'ConnectorTargetHandle', @LidarDisplay);
```

This command opens up two windows.

![lidar windows](/engineering-education/how-to-ground-truth-label-your-datasets-for-creating-autonomous-driving-systems-using-matlab-ground-truth-app/ground16.png)

The first is the ground truth labeler with the video data and the point cloud player, which contains synchronized lidar data. You notice that it is synchronized because if you scrub through the lidar player, we are also scrubbing through the video player. 

The importance of this is that lidar data can provide information that vision sensors alone cannot determine. For example, the lidar data provides the distance that the ego vehicle is from the surrounding objects.

### Conclusion
Ground truth labeler is so effective in the automation of the labeling process. Despite the labeling process that can be time-consuming and tedious, this app can do that with a button click. 

Also, as we have seen, using the app is very simple. This app opens the door for all the possible algorithm. 

It is now up to the user to decide the algorithm to use depending on what he does. As we know that the accuracy of algorithms varies, not restricting to certain algorithms is a good idea.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
