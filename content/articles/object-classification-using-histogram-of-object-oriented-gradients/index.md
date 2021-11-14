---
layout: engineering-education
status: publish
published: true
url: /object-classification-using-histogram-of-object-oriented-gradients/
title: Object Classification Using Histogram of Object Oriented Gradients
description: This tutorial will discuss the multi-class object classification with the help of HOG features. Also, it provides a step by step guide of how one can use this technique using Matlab.
author: joseph-odhiambo
date: 2021-11-12T00:00:00-07:10
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/object-classification-using-histogram-of-object-oriented-gradients/hero.jpg
    alt: Object Classification Using Histogram of Object Oriented Gradients Hero Image
---
The Histogram of Oriented Gradients (HOG) is a method used in computer vision and image processing to describe the features of a given piece of data. It considers the number of times the gradient orientation in a localized part of an image occurs. 
<!--more-->
Support vector machine (SVM) is also known as the discriminative method. The hyperplane defines this method. The hyperplane separates the given data into parts according to the defined distinguishing features.

SVM model separates a given data into two using a hyperplane. A hyperplane is the point of separation of the provided data. A point to note is that SVM does not create one hyperplane. Instead, it creates two more hyperplanes that are parallel to each other.

These two hyperplanes are the points closest to each part. A hyperplane gives the caution to accurately and efficiently classify your data.

In this tutorial, we will look at the multi-class object classification with the help of HOG features. For classification, we use the ECOC based multi-class SVM.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### The overall scheme

![Image of the scheme](/engineering-education/object-classification-using-histogram-of-object-oriented-gradients/classification-one.png)

In the training image database, we have all the training images in the training database folder. First, all these images are converted to their corresponding HOG features. These HOG features are then stored in the feature database and used to train the ECOC based multi-class SVM classifiers. So once the training is complete, we get a trained classifier. The trained classifier is ready to classify the input images. 

To test its performance, we give a test image. So all the test images stored in the test image database are first converted to their corresponding HOG features and then given to the trained classifier. The trained classifier then classifies all the input images, and we get the test outcomes. Based on the outcomes, we can go for accuracy and plot for the confusion matrix, e.t.c.

### Image dataset
You can get the image dataset that we are going to use [here](https://www.kaggle.com/smeschke/four-shapes). This database has a total of 16000 greyscale images of the size `200 x 200`. We classify the images into four categories, that is, circle, square, triangle and star.

From the 16000 images, we are using only 4800 images for our training and testing. We are taking 1000 images from each category for training purposes. It totals 4000 images. We then use 200 images from each category for testing purposes. It sums to a total of 800 images for testing. The folder structure should be as shown below:

![The folder structure](/engineering-education/object-classification-using-histogram-of-object-oriented-gradients/classification-two.png)

### Error-correcting output codes(ECOC) based multi-class SVM
In machine learning, many algorithms, such as linear regression, SVM, e.t.c, can deal with binary classification problems. A binary classification problem is one where there are only two target classes, for example, yes or no, black or white, e.t.c. It means that you can only classify two input objects into the two classes.

In practice, many classification problems belong to multi-class classification problems; therefore, binary SVM cannot handle our objective of classifying four different shapes. However, there are modified SVM also for multi-class problems such as `one vs rest` and `one vs one`. These methods classify by dividing a given multi-class problem into a fixed number of binary problems.

Unlike `one vs rest` and `one vs one`, the ECOC technique allows each class to be encoded at an arbitrary number of classification problems. Furthermore, using an overdetermined presentation allows the extra models to act as `error correction` predictions, resulting in better predictive performance.

### Implementation of ECOC classifiers for multi-class SVM in Matlab
Matlab has in-built function `fitcecoc` for this, and the syntax is:

```Matlab
fitcecoc(x, y, name, value)
```

where:
- `x`represents predictors (sets of the feature vector of all images).
- `y`represents the class labels.
- `name, value` represents Name value pair arguments. It has many options, but here we are using two, that is, `coding` and `learners`. The default option for coding is `onevsone`, and `learners` is `SVM`.

### Matlab code for object classification using HOG features
Now, we prepare the image database. We prepare it by giving the directory for both the train and test folders we prepared before:

```Matlab
path1 = 'trainimg';     %input all the training images
path2 = 'testimg';      %input all the test images 
```

We then read all these train and test images:

```matlab
traindb = imageDatastore(path1,'IncludeSubfolders', true, 'LabelSource', 'foldernames'); 
testdb = imageDatastore(path2,'IncludeSubfolders', true, 'LabelSource', 'foldernames'); 
```

In the `imageDatastore`, we have to include all the subfolders and the folder names. The folder name is the `LabelSource`. So all the trained images will go into the `traindb` variable while the test images go to the `testdb` variable.

### Training
First, we read one single image from the training database and define the cell size. The cell size we are using here is `16x16` for HOG features. Note that you can change this cell size to `8x8` or even `32x32`. 

```Matlab
img = readimage(traindb, 1);
CS = [16, 16];
```

Now, find the HOG feature of the first image:

```matlab
[hogfv, hogvis] = extractHOGFeatures(img, 'CellSize', CS);
```

All the HOG features are stored in the `hogfv` variable. We then find the length of our `hogfv` variable, which is the hog feature variable. Then, read the total number of images in the `traindb` folder:

```Matlab
hogfeaturesize = length(hogfv);
totaltrainimages = numel(traindb.Files);
```

With these two pieces of information, that is, the number of images and size of the HOG features, we are defining one feature database. This feature database is a matrix. The number of rows equals the number of images in the train folder, while the number of columns equals the length of the features.

```Matlab
trainfeatures = zeros(totaltrainimages, hogfeatures, 'single');    %feature database
```

The code above shows that the `trainfeature` is the database that stores all the HOG features in the images.

After that, we read all these images from the `traindb` one by one to find their HOG features. These HOG features are stored in the `trainfeatures` matrix:

```matlab 
for i = 1:totaltrainimages
    img = readimage(traindb, i);
    %img = rgb2gray(img);
    trainingfeatures(i,:) = extractHOGFeatures(img, 'CellSize', CS);
end
```

We will also read the labels of the four different shapes using the command below:

```Matlab 
traininglabels = traindb.Labels;
```

Then, we will use the `fitcecoc` function to implement the ECOC feature classifiers for multi-class SVM:

```Matlab
%fitcecoc uses SVM learner and a 'one-vs-one' encoding scheme
classifiers = fitcecoc(trainingfeatures, traininglabels);
```

The training features are the x-values, while `traininglabels` are the y-values. We don't define any other parameter, which means that all the parameters are at their default values. Once this is complete, the classifier parameter will go into the `classifier` variable.

### Testing all the images
Here, we read the number of the total images in the test folder and the `testfeatures`. It is also a matrix, with the rows being the total number of the test images and the columns being the size of the HOG features:

```matlab 
totaltestimages = numel(testdb.Files);
testfeatures = zeros(totaltestimages, hogfeatures, 'single');
```

We then read the test images one by one just as we did before:

```matlab
for i = 1:totaltestimages
    imgt = readimage(testdb, i);
    testfeatures(i,:) = extractHOGFeatures(imgt, 'CellSize', CS);
end
```

Then the labels:

```Matlab
testlabels = testdb.Labels;      %getting labels
```

Now that we have all the test images in the `testfeatures` matrix and have trained our classifier, we test the classifier using the `predict` function:

```Matlab  
predictedlabels = predicted(classifiers, testfeatures);
```

So here, we have taken the trained classifier and the features of all the test images and stored them in the test feature variable. Next, the predicted labels are stored in the `predictedlabels` variable.

After this, we find the accuracy of our classifier. This accuracy is the comparison of the predicted labels and the pre-defined labels. Also, you can plot the confusion matrix, which helps in interpretation of the results:

```matlab
accuracy = (sum(predictedlabels == testlabels)/numel(testlabels))*100;
plotconfusion(testlabels, predictedlabels)
```

If we run this program, we get the confusion matrix as shown in the image below. It shows that our classifier is already classified.

![confusion matrix](/engineering-education/object-classification-using-histogram-of-object-oriented-gradients/classification-three.png)

Also, in the command window, we can see the accuracy displayed as 100%. This is because the database is quite simple. If you use a more challenging database, it will be less than 100%.

### Discrete testing
The code for the discrete testing should be in a different script. At this point, we give one image at a time and display the output that our classifier gives. It begins by reading one image, which the user inputs:

```Matlab
%program to test HOG based object detection
[filename, filepath] = uigetfile('*.*', 'Select input image');
filewithpath = strcat(pathname, filename);
imgt = imread(filewithpath);
```

We then define the cell size and extract the HOG features of it:

```Matlab
CS = [16, 16];    %cell size
[hogfvt, hogvist] = extractHOGFeatures(imgt, 'CellSize', CS); %getting HOG features
```

It then gives the HOG features to the classifiers for prediction:

```Matlab
predictedLabel = predict(classifier, hogfvt);
```

We print the predicted label on the image as the title:

```Matlab
figure
imshow(imgt)
title(['Shape recognized is' char(predictedLabels)])
```

Now let us run the program for the discrete testing. When you run it, Matlab asks the user to input the shape, and once this is complete, the shape is recognized, as shown below:

![image recognition](/engineering-education/object-classification-using-histogram-of-object-oriented-gradients/classification-four.png)

To see the robustness of our classifier, we are going to use a distorted image and see if the classifier can still identify it. For image distortion, you can use your prefered software. So you distort the image and use it as the input. Let's see how this works:

![distorted image](/engineering-education/object-classification-using-histogram-of-object-oriented-gradients/classification-five.png)

As we can see, the scheme is working fine. It means that it is accurate and robust.

### Conclusion
The object classification using HOG features and ECOC multi-class SVM is a procedural process. You need to understand the scheme so that you can know what is happening in your program. It is important for error identification.

Also, the scheme is accurate and robust. It means that it is more reliable for more complex datasets. Even though the accuracy will not be 100% for complex datasets, the accuracy will be as high as possible. It makes it a good method for object identification.

I hope you find this helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
