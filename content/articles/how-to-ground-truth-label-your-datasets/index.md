---
layout: engineering-education
status: publish
published: true
url: /how-to-ground-truth-label-your-datasets/
title: How to Ground Truth Label Your Datasets 
description: In this tutorial we will create ground truth data for object detection and semantic segmentation. We will use algorithms to automate the labeling process and integrate ground truth information from other sensors.
author: linet-achieng
date: 2021-12-01T00:00:00-09:35
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-ground-truth-label-your-datasets/hero.jpg
    alt: How to ground truth label your datasets Hero Image
---
Ground truth labeling is the process of checking machine learning results for accuracy in the real world. For example, autonomous driving systems can move without a human driver or human intervention. 
<!--more-->
Instead, these types of cars perceive the environment using sensors. For example, the ground truth labeler app labels videos and images for automotive applications.

We all know that labeling is a tedious and time-consuming process. But, it is necessary to create test data to evaluate our perception algorithms accurately. A ground truth labeler is a tool that we have created to reduce some of these pain points. 

This tutorial will look at creating ground truth data for object detection and semantic segmentation. We will use algorithms to automate the labeling process and integrate ground truth information from other sensors.

### Prerequisites
To follow along with this tutorial, you'll need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- An understanding of [MATLAB](/engineering-education/getting-started-with-matlab/) basics.

### How to locate the app
To find this app:
- At the top of the window, click on `APPS` and click on the dropdown arrow as shown below:

![image](/engineering-education/how-to-ground-truth-label-your-datasets/ground1.png)

- Locate the ground truth labeler in the automation section.

![image 2](/engineering-education/how-to-ground-truth-label-your-datasets/ground2.png)

- Click on the ground truth labeler to open it.

Ground truth labeler allows us to label videos and images for automotive applications. As we all know, labeling is a tedious and time-consuming process, but it is necessary. 

It gives us test data to evaluate the perception algorithm. 

Our workflow for this tutorial will be:
- Creating ground truth data for the detection and semantic segmentation.
- Using an algorithm to automate the labeling process.
- Integrating ground truth information from other sensors.

### Creating ground truth data for object detection and semantic segmentation
Once we open the app, we need to load data into it. To do this, click on `load` at the top-left corner.

If you click on it, the app will ask about the data type you are inputting. As you can see, we have three options: video, image sequence, and custom reader. 

The most common file format for data in this app is video and image sequences. But, we use the custom reader if you have a different file format from those mentioned.

For this tutorial, we will load a 25-second video into the app. After doing this, we start with the ROI (region of interest) label by clicking on the label button.

![labeling button](/engineering-education/how-to-ground-truth-label-your-datasets/ground3.png)

When you click on it, the following window opens up:

![new window](/engineering-education/how-to-ground-truth-label-your-datasets/ground4.png)

Now, let us begin with `vehicle` then click `ok`. Note that you can label your data before defining the ROI. 

Also, this app has a workspace shown below where all your labels are stored, and you can see them.

![workspace](/engineering-education/how-to-ground-truth-label-your-datasets/ground5.png)

After completing this, label the vehicle with the bounding box. To label the data with a bounding box, click on the label at the top of the workspace.

![vehicles labelled](/engineering-education/how-to-ground-truth-label-your-datasets/ground6.png)

Let us label the sub-labels. Sub-labels are parts that are associated with a parent label. For example, we can have vehicle number plates or even wheels as the sub-labels. 

Let's, for example, name our vehicles `tarlight`. To label, the sub-labels, click on the `sub-labels` right next to the `label` button and label them on your input using bounding boxes. 

You can have as many bounding boxes as you want. If you click on the `sub-label` button, a new window like that of labeling prompts the user to input the name of the sub-labels.

To make the labels on the input image, you have to select the bounding box of the parent label, and then you make your label inside the bounding box of this main bounding box. If you do not select the parent label first, you will not make your sub-labels. 

From the definition, sub-labels are parts of the parent data or ROI.

![vehicles and the sublabels](/engineering-education/how-to-ground-truth-label-your-datasets/ground7.png)

We can assign attributes for our labels and sub-labels. Attribute information makes up the metadata associated with the label. 

In our example, we have the vehicle as the parent label. So now the attribute for vehicles can be vehicles type. This attribute window allows the user to input various types as a list. You can have as many as you want.

![list of the vehicle types](/engineering-education/how-to-ground-truth-label-your-datasets/ground8.png)

After making your attributes, you click `ok`, which appears on the left side of the window. For example, you select the vehicle, move to the left, and choose the vehicle type below to label your vehicle types.

![giving vehicle type](/engineering-education/how-to-ground-truth-label-your-datasets/ground9.png)

We are happy with the labels. You may notice that the labels are not present when we switch frames, as shown below. To go to the next frame, click on the forward button circled in the image below:

![next frame](/engineering-education/how-to-ground-truth-label-your-datasets/ground10.png)

We'll notice that we can go ahead and repeat the entire process of labeling, but this will be redundant. Therefore, it is ideal to introduce automation in such scenarios.

### Use an algorithm to automate the labeling process.
There are so many in-built algorithms in Matlab that help with this. You can use an in-built algorithm or write your algorithm. To do this Matlab allows all these options. 

To use an algorithm, click on the `select algorithm` and select or import algorithm to use.

![algorithms](/engineering-education/how-to-ground-truth-label-your-datasets/ground11.png)

For this tutorial, we will use the `Point Tracker` algorithm. After selecting the algorithm, you select the vehicles you want to track. 

Also, you input how long you want to track it. It is specified beside the play section where you input the `start time` and `end time`. 

For example, we are going to track the cars for seven seconds.

![tracking](/engineering-education/how-to-ground-truth-label-your-datasets/ground12.png)

Once done, click on `automate`. Once clicked, the window will display the instruction to use the specified algorithm. Read through the instructions and click on the play button at the top of the window.

![automation](/engineering-education/how-to-ground-truth-label-your-datasets/ground12a.png)

Once completed, click on `accept`. You can look at the `label summary` to see how the labeling proceeded.

![label summary](/engineering-education/how-to-ground-truth-label-your-datasets/ground13.png)

### Other capabilities
Let's say that we want to label the lanes. In this case, we cannot use bounding boxes; we will use the line and label the lanes. It means that you draw lines on the lanes and label them.

![labeling the lane](/engineering-education/how-to-ground-truth-label-your-datasets/ground14.png)

You can also label individual pixels in the image using the `pixel label`. For example, let's say we want to label the road. We will make a label named `road` and use the `pixel` label. There is a future `flood fill` at the top of the window in the image below. It enables you to label a wide region at once.

![using pixel label](/engineering-education/how-to-ground-truth-label-your-datasets/ground15.png)

Note that you can erase sections that you never intended to label using `erase`. Because `flood fill` does the labeling randomly over a wide region, you should erase the mislabeling. Also, you can include those that you may have missed to label using the `brush`. 

Another feature called `smart polygon` allows us to make boundaries of what you want to label and makes its segmentation. After this you can save your work.

### Integrate ground truth information from other sensors
This feature allows you to integrate ground truth information from other signals. For example, let's open a video that has been time-synchronized with lidar data. 

To open this, execute the command below:

```Matlab
groundTruthLabeler('01_city_c2s_fcw_10s.mp4', 'ConnectorTargetHandle', @LidarDisplay);
```

> Note that the video `01_city_c2s_fcw_10s.mp4` is a Matlab video and it is readily available. So all you need to do is to execute the command in the command window.

This command opens up two windows.

![lidar windows](/engineering-education/how-to-ground-truth-label-your-datasets/ground16.png)

The first is the ground truth labeler with the video data and the point cloud player, which contains synchronized lidar data. You'll notice that it is synchronized because if you scrub through the lidar player, we are also scrubbing through the video player. 

It is important because lidar data can provide information that vision sensors alone cannot determine. For example, the lidar data provides the vehicle's distance from the surrounding objects.

### Conclusion
Ground truth labeler is very effective in the automation of the labeling process. Despite the labeling process being time-consuming and tedious, this app can do that with a button click. 

Also, as we have seen, using the app is very simple. This app opens the door for all the possible algorithm. 

It is now up to the user to decide the algorithm to use depending on what she/he does. However, as we know that the accuracy of algorithms varies, not restricting anything to specific algorithms is a good idea.

Happy coding!

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
