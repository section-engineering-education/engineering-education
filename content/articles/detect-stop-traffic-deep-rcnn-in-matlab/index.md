---
layout: engineering-education
status: publish
published: true
url: /detect-stop-traffic-deep-rcnn-in-matlab/
title: How to Detect Stop Traffic Signs using Deep R-NN in Matlab
description: In this tutorial we are going to use the R-CNN. We will use the image labeler application to create our pre-trained image database. Then transfer learning will be used where a pretrained R-CNN is retrained on its image dataset.
author: florence-atieno
date: 2021-12-01T00:00:00-17:55
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/hero.jpg
    alt: rcnn realtime matlab
---
R-CNN (Region with convolution neural network) is a deep learning approach used to detect various objects in an image. It finds its application in autonomous vehicles, smart surveillance systems, and facial expressions. 
<!--more-->
The models for object detection using R-CNN are based on three processes. The first process is finding the region in the image that may contain an object, that is, the region of the proposal. It then extracts the CNN features from the region and lastly classifies the object using the extracted features.

There are three variants of R-CNN. These are R-CNN, Fast R-CNN, and Faster R-CNN. As the name suggests, the speed of training and detection improves from the first to the last. 

In this tutorial, we are going to use the R-CNN. We will learn how to detect stop traffic signs using Deep R-NN in both real-time and offline mode using Matlab. We will use the image labeler application to create our pre-trained image database. Here, transfer learning is used where a pre-trained R-CNN is re-trained on its image dataset.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](/engineering-education/getting-started-with-matlab/) basics.

Models for object detection using R-CNNs are based on the following three processes:
1. Finding regions on the image that may contain an object. These regions are called regions proposals.
2. Extract CNN features from the region proposals.
3. Classify objects using extracted features.

There are three variants of an R-CNN. These are R-CNNs, fast R-CNN, and faster R-CNN.

![cnns](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopOne.png)

In this tutorial, we will implement the basic R-CNN.

### Scheme of R-CNN
The basic R-CNN detector first generates region proposals using a selective search algorithm such as search boxes. Unfortunately, these regions' proposals are `2000`, making this process slower since it has to locate the region proposals.

Each region is then cropped out from the image, resized, and reshaped to a square. It is then fed to the CNN for classification. Then a SVM trained using CNN features defines the region proposal bounding box.

![svm](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopThree.png)

The proposed scheme in image form is:

![proposed scheme](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopTwo.png)

### Database creation using Matlab's image labeler
Although we are using a pre-trained R-CNN network for the proposed work, it must be trained on our database for fine-tuning. It means that we must have an image database. It may not necessarily contain images, but a few images will be sufficient to fine-tune the pre-trained R-CNN.

We must define R-CNN's ROI (region of interest) by bounding boxes in an image. This image database with the ROI can be created using Matlab's image labeler app.

For the proposed work, we use a total of `60` images. These images are downloaded from the internet randomly. Since the images are of different sizes, we resize them to a common dimension which is `640px`. This is done to reduce the training and the testing time.

These images are then imported into the image labeler app for bounding box marking and exporting to Matlab's workspace or saved in a folder as a `.mat` file.

### How to use Matlab's image labeler
- Open the image labeler app.

![show location](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopFour.png)

- A new window opens up, and when you click on the load tab. Define the data source to import your dataset.

![loading data](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopFive.png)

- Import all the `60` images. Click on the ROI label definition to define your ROI using the bounding boxes.

![show roi label def](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopSix.png)

- A new window that asks you to give the label a name. Note that since we are using a pre-trained network, the name should be a `stopSign` since it is defined in the network.
- Click `ok` and then draw the bounding box around the stop sign image for all the images. It requires a lot of effort if you have thousands of images.

![show how your draw the ROI](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopSeven.png)

- Once you are done labeling the images, click on the export images and specify where you want to export them. For our case, we export to the current directory.

- Since we export to the workspace, we use the `label` format and give the variable name. Also, the variable name should be `stopSigns` due to the pre-trained network.

- Once all these are done, we see all the images exported to the workspace.

![images in the workspace](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopEight.png)

-  This is how you can use the image labeler to prepare your datasets. Then, after exporting the images, you can use them directly from the workspace or save them as a `.mat` file in the current directory by clicking on the `save`.

### Matlab code for training
We first load the layers of the pre-trained R-CNN and the image database. For the pre-trained R-CNN, we use Matlab in-built file `rcnnStopSigns.mat`.

```Matlab
%program to train an RCNN to detect stop signs
load('rcnnStopSigns', 'layers')   %loading layers of pre-trained RCNN
load stopsign.mat;     %loading image database for training
```

The in-built `.mat` file has many arguments, but we only need layers. So we need to display those layers, and we use the code below:
```Matlab
Igraph = layerGraph(layers);   %Getting layers
Igraph.Layers    %Displaying layers.
```

We then define the training options and train our dataset.
```matlab
%Define trainning options
options = trainingOptions('sgdm', 'MiniBatchSize', 32, 'initialLearnRate', 1e-6, 'MaxEpochs', 10);

%Trainning RCNN
rcnn = trainRCNNObjectDetector(stopSigns, layers, options, 'NegativeOverlapRange', [0 0.1]);
```

All the trained layers and correspondings layers will be stored in the `rcnn` variable when training is complete. You can save this `rcnn` for future testing, but you can still use it at the moment.

![image of the training process](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopNine.png)

### Matlab code for testing images (offline mode)
Here, we require the user to be providing the input image for detection. This image is then read before the detection.
```Matlab
%Reading input image
[filename, pathname]=uigetfile('*.*', 'Select test image');
filewithpath=strcat(pathname, filename);
img= imread(filewithpath);
```

This test image is stored in the variable `img`. The image is then passed to the detect function as an argument to perform detection.
```Matlab
[bbox, score, label] = detect(rcnn, img, 'MiniBatchSize', 32);   %Stop sign detection
nobox = size(score, 1); %sorting o the basis of scores
```

The bounding boxes coordinates detected will go to the `bbox` variable, all the confine scores will be stored to the `score` variable. Then, all the labels are stored in the `labels`.

Therefore, we need to find the number `f` the bounding boxes to know the corresponding number of the detected traffic stop signs. We then combine the `score` and `bbox` to form a matrix and then sort this matrix so that at the top, we have the entry of having the maximum score.

```Matlab
scorebox=[score, bbox];
scorebox=sortrows(scorebox, 'descend');
```

Next, insert the annotation to the image.
```matlab
img = insertObjectAnnotation(img, 'rectangle', scorebox(1,2:end),...
    strcat('Stop Sign: Conf.Score:', num2str(scorebox(1,1))));
```

Let's introduce a loop for the case of an image with more than one stop sign. It means that in that case, we need more than one `bbox` and `annotation` and we achieve that using the code below:
```Matlab
for i=2:nobox
    if score(i)==1
        img=insertObjectAnnotation(img, 'rectangle', scorebox(i,2:end),...
            strcat('StopSign: Conf. Score: ', num2str(score(i,1))));
    end
end
```

We then finally show the output:
```Matlab
figure
imshow(img)
```

![tested image](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopTen.png)

### Matlab code for testing videos (offline mode)
First input the video:
```matlab
% Reading input video
[filename, pathname] = uigetfile('*.*', 'select test video');
filewithpath=strcat(pathname, filename);
```

Then, define the video reader object that you will use to read the video and initialize the video player.
```matlab
v = VideoReader(filewithpath);  %Declare video object
videoplayer=vision.VideoPlayer();  %Initialize video player
```

Next,introduce a `while` loop to read the video frames one by one. The loop reads the frame, detects the stop sign, and inserts annotation.

```Matlab
runloop= true;   %conditions for the while loop

while runloop
img = readFrame(v); %Reading one frame
[bbox, score, ~] = detect(rcnn, img, 'MiniBatchSize', 32);  %Detecting Stop sign
[score1, idx]=max(score);   %getting max. Score

bbox1 = bbox(idx, :);  %getting Bounding box corresponding to max. Score
img = insertObjectAnnotation(img, 'rectangle', bbox1,...
    strcat('sStop Sign: Conf. Score:', num2str(score1)));  %Insertig anotation
step(videoplayer, img); %Displaying image as frame in the video player
runloop = isOpen(videoplayer);   %checking video player is ON or OFF
end
```

The `step(videoplayer,img)` means that all the images with bounding boxes and annotations are given to the video player object for display. You get the output with the stop sign detected if you execute the program.

![Output for offline video](/engineering-education/detect-stop-traffic-deep-rcnn-in-matlab/stopEleven.png)

### Matlab code for testing video (realtime)
In this case, we will be using the webcam to capture the live video. Now, this is the difference between the offline and the online case. 

The rest of the code is similar for both cases. Also, instead of reading the frames, we take snapshots and read them.

```Matlab
% Reading input video
cam = webcam;

videoplayer=vision.VideoPlayer();  %Initialize video player

runloop= true;   %conditions for the while loop

while runloop
img = snapshot(cam); %Reading one frame
[bbox, score, ~] = detect(rcnn, img, 'MiniBatchSize', 32);  %Detecting Stop sign
[score1, idx]=max(score);   %getting max. Score

bbox1 = bbox(idx, :);  %getting Bounding box corresponding to max. Score
img = insertObjectAnnotation(img, 'rectangle', bbox1,...
    strcat('sStop Sign: Conf. Score:', num2str(score1)));  %Insertig anotation
step(videoplayer, img); %Displaying image as frame in the video player
runloop = isOpen(videoplayer);   %checking video player is ON or OFF
end
clear cam;
```

When we run the training program, we see all the information about our pre-trained network.

### Conclusion
Traffic stop sign detection is a very important capability of Matlab. The implementation of this feature is possible on the vehicles to avoid accidents. Matlab's ability to handle deep learning is incredible.

As we have seen, the training code is easy, and its implementation is effective. The training algorithm is also very accurate. Matlab has in-built functions that are easy to use and very effective.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)

