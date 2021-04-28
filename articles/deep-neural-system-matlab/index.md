---
layout: engineering-education
status: publish
published: true
url: /engineering-education/deep-neural-systems-matlab/
title: Getting started with deep neural networks in Matlab
description: This article gives the reader a guide on how to prepare a digit dataset, the structure of a convolution neural network and training of the models.
author: paul-juma
date: 2021-04-28T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/deep-neural-systems-matlab/hero.jpg
    alt: Deep neural systems in Matlab example image
---

### Creating deep neural network in MATLAB.
### Introduction.
A neural network is one of the classes of deep learning and subclass of machine learning. The algorithms are encouraged by the architecture of the human brain. The system grips data uses the algorithm to identify the trend in the data, and then predicts the result of a new similar dataset.
MATLAB provides a deep learning toolbox for implementing the deep neural network. MATLAB includes the digit dataset so you don't need to download it from an external source.
In this article, we will look at how to prepare your digit dataset, the structure of a convolution neural network. We will also look at the Matlab code for training and validation and code for discrete testing.

### Prerequisite.
1. Knowledge in [Matlab](https://www.section.io/engineering-education/getting-started-with-matlab/).
2. [Matlab](https://www.mathworks.com/downloads/) installed on your computer.

In this tutorial, we take the problem of digit recognition.

### MATLAB’S digit dataset.
Matlab itself includes the digit dataset. The digit dataset consists of 10,000 grayscale images of handwritten digits and each digit has 1000 images of the respective folders. The images are of size 28 by 28 pixels and they have associated labels.

### How to locate the image dataset.
- Open the directory where Matlab is installed.
![this is how the window appear](/engineering-education/deep-neural-systems/matlab/dataset1.jpg)
- Select the toolbox folder.
![](/engineering-education/deep-neural-systems/matlab/dataset2.jpg)
- Click the nnet and then choose the nndemos folder
![](/engineering-education/deep-neural-systems/matlab/dataset3.jpg)
![](/engineering-education/deep-neural-systems/matlab/dataset4.jpg)
- Select the mdataset folder.
![](/engineering-education/deep-neural-systems/matlab/dataset5.jpg)
- Select the digit database folder.
![](/engineering-education/deep-neural-systems/matlab/dataset6.jpg)
When we open this folder, we have ten folders that contain 1000 images of each number. 
![this how the digit database appears](/engineering-education/deep-neural-systems/matlab/dataset7.png)
When you open a folder of any number you will be able to see the 1000 images. Below is sample images in folder 1.
![images in folder 1](/engineering-education/deep-neural-systems/matlab/dataset8.png)

> Note that after locating the dataset folder, you can duplicate it to your preferred folder.

For training, we take 750 images from each folder of the digit dataset. This means that the total training images are 7500 images since the folders are 10. The remaining 250 images which sum up to 2500 images will be used for validation. This division is done by writing Matlab code.

### Structure of convolutional neural network(CNN/convnet).
CNN is the common category apropos to neural networks. CNN revolves around the features discovered from the input data. The network operates a 2D convolutional layer making this constitution in a better position for analyzing data for instance images.
The first layer of the CNN is the input layer that we have to define when we will define the CNN in Matlab. We then define the various layers during feature detection. The CNN is made up of 3 layers. The top layer is the input layer. The middle layer includes a 2D convolutional layer, batch normalization layer, relu layer, max pooling layer. The last layer involves a fully connected layer, softmax layer, classification layer.
The second layer which has 4 layers will be used repeatedly. They are not only four because we have different bunches of the 4 layers.

### Matlab syntax of the layers and the specifications.

#### Input layer.
This is where we specify the image size.
```Matlab
ImageInputLayer([M N n], ‘name’, ‘input’)
```
example
```matlab
ImageInputLayer([28 28 1], ‘name’, ‘input’)
```
The M and N depend on the size of the image. The ‘n’ is the no. of layers of the images. In our example, we used 1 since the grayscale is a single layer. If your image is colored, then ‘n’ holds the value of 3, since colored images have 3 layers, that is, RGB.

#### Convolutional layer.
It is the main layer responsible for the features extraction. Filters keep updating with training data.
```Matlab
convolution2dLayer(filterSize, numFilter, ‘stride’, n, ‘padding’,’same’,’name’,’conv_1’)
```
```Matlab
convolution2dLayer(3,8,’padding’, ‘same’,’name’,’conv_1’)
```
In this example we will have a 3X3 pixel for filter size and they will be 8 filters. The no. of filters means the no. of neurons in this layer while the strides mean by what pixels should the filters shift to the next group of filters.
Its default value is one but it varies according to your precision. In padding, you also require to cover the first column or first group. Adding ‘same’ means after doing the padding, the resulting image, and the input image should be of equal size.

#### Batch normalization layer.
It normalizes the activation and gradients. This easen the optimization problem, quickens the training of the network, and minimizes the sensitivity to initializing the network.
```Matlab
batchNormalizationLayer(‘name’,’BN_1’)  
```

#### Relu layer(rectified linear unit).
It is the popular random activation function
```Matlab
ReluLayer(‘name’,’Relu_1’)
```

#### Max pooling layer.
It is an operation of downsampling the features in an image to predict the future image.
```Matlab
maxPooling2dLayer(2,’stride’,2,’name’,’m,maxPool_1’)
```

#### Fully connected layer.
The fully connected layer analyzes sampled features and categorizes the images.
```Matlab
fullyConnectedLayer(‘outputSize’,’name’,’value’)
```
```matlab
fullyConnectedLayer(10,’name’,’FC’)
```
The output represents the no. of neurons in this layer. In my example, we used 10 since the output size depends on the categories of objects diagnosed using the CNN.

#### Softmax layer.
It has an activation function that changes the result of the fully connected layer. The result of the softmax layer are positive numbers that add to one and might be used by the classification layer for classification possibilities.
```Matlab
softmaxLayer(‘name’, ’name’)
```
```matlab
softmaxLayer(‘name’,’softmax’)
```

#### Classification layer.
It is the final layer. It solves the possibilities from the softmax activation function to their predicted form.
```Matlab
classificationLayer(‘name’, ’name’)
```
example
```matlab
classificationLayer(‘name’,’outputClassification’)
```

#### Training parameters.
```matlab
trainingOption(solverName,’name’,’value’)
```
In the training option, we have to define the solver name.
Example
```Matlab
trainingOption(‘sgdm’,’learnRateSchedule’,’piecewise’,’learnRateDropFactor’,0.2,
learnRateDropPeriod’,5,’maxEpochs’,20,’miniBatchSize’,64,’plots’,’trainingProgress’)
```
We use the plot factor here to see the progress of the training in a graph. The graph will be of output against epochs.
There are various parameters and if you want to learn all, check the [documentation](https://www.mathworks.com/help/deeplearning/ref/trainingoptions.html).


### Solver options.
`sgdm`:stochastic gradient descent with momentum optimizer. It needs a momentum rate.
`rmsprop`:RMSProp optimizer. The squared gradient moving average decay rate must be included.
`adam`:adam optimizer. The gradient and squared gradient moving average decay rate must be included.

### Matlab code for training and validation.
We first give the path of the dataset folder and read the image database folder.
```Matlab
digitDatasetPath = ‘directory’;
```
```matlab
digitImages =    imageDatastore(digitDatabasePath,’includeSubfolder’,true,’labelSource’,’folderNames’
```

we then distribute the images in the set of training and testing using the code below
```matlab
numTrainingFiles = 750; %you can use percentages to represent the divisions.    
[trainImages,testImages] = splitEachLabel(digitImage, numTrainFiles,’randomize’); %the spliting is done randomly.
```

### Building of the CNN.
We first define the different layer of the CNN
```matlab
layer = [
    imageInputLayer([28 28 1],’name’,’input’)
    convolution2dLayer(3,8,’padding’,’same’,’name’,’conv_1’)
    batchNormalizationLayer(‘name’,’BN_1’)
    reluLayer(‘name’,’Relu_1’)
    maxPooling2dLayer(2,’stride’,2,’name’,’maxPool_1’)
```
> note that the CNN layer is repeated but you have to increase the size of the filters. This gives more complexity to your network and more strength and capability to your network.
```matlab
convolution2dLayer(3,16,’padding’,’same’,’name’,’conv_2’)
batchNormalizationLayer(‘name’,’BN_2’)
eluLayer(‘name’,’Relu_2’)
maxPooling2dLayer(2,’stride’,2,’name’,’maxPool_2’)
convolution2dLayer(3,32,’padding’,’same’,’name’,’conv_3’)
batchNormalizationLayer(‘name’,’BN_3’)
reluLayer(‘name’,’Relu_1’)
maxPooling2dLayer(2,’stride’,2,’name’,’maxPool_3’)
```

In this last part of the CNN we don’t use the max pooling layer.
```matlab
convolution2dLayer(3,64,’padding’,’same’,’name’,’conv_4’)
batchNormalizationLayer(‘name’,’BN_4’)
reluLayer(‘name’,’Relu_4’)
fullyConnectedLayer(10,’name’,’FC’)
softmaxLayer(‘name’,’softmax’)
classificationLayer(‘name’,’output’,’classification’);
];
```

This is the general structure of the network. If you want to see graphically this network, you have to execute the code below.
```Matlab
Igraph = layerGraph(layers)
plot(Igraph)
```

### Training option.
This is the last section
```Matlab
option = trainingOptions(‘sgdm’,’initialLearnRate’,0.001,’maxepochs’,4,’shuffle’,’everyepoch’,   ‘validation data’,’test images’,’validation frequency’, 30, ‘verbose’,’false’,  ‘plots’,’trainingProgress’)
```
We then initiate the training
```matlab
net = trainNetwork(trainImages,layers,options);
```
We then classify the images
```matlab
Ypred = classify(net,testImages)
```
Once the training is done, you can export this function net and be used by someone else to identify the various objects.
We then run the script in Matlab and this may take some time since there is a lot of images used.
The first graph is for training and the second graph is the loss of error in the workspace.

![graph for training process](/engineering-education/deep-neural-systems/matlab/trainingProgress.png)

### Matlab code of discrete testing.
We create a separate script for discrete testing and call the training option in it.
We first read the image for clasification
```matlab
[fileName, pathName] = uigetfile(‘*.*’,’select the input grayscale’);
fileWithPath = strcat(pathName,fileName)
I = imread(fileWithPath);
figure
imshow(I)
```

We then classify the image using the network.
```matlab
Label = classify(net,I);
title([‘recognized digit is:’ char(label)])
```

![recognized dataset](/engineering-education/deep-neural-systems/matlab/recognizedDigit.png)

Apart from the images in the dataset, you can create your image and recognize it using the program. This image should be of grayscale.

### Conclusion.
Matlab is a good language for the deep neural system. It has a toolbox that provides the data that can be used for the training and the testing of the neural system. Because it has the dataset to be used for the process, this makes it more efficient for use. 

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
