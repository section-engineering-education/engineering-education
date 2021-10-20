### Object Classification using Histogram of Oriented Gradients(HOG) features and Error-correcting output codes(ECOC) Multi-Class Support Vector Machine(SVM) in Matlab

### Introduction
The Histogram of Oriented Gradients(HOG) is a feature descriptor used in computer visions and image processing for object detection. The technique counts the occurrence of the gradient orientations in the localized portion of an image. Support vector machine(SVM) is a supervised machine learning algorithm that helps in classification. It aims to find an optional boundary between the possible outputs.
SVM tries to find a line that maximizes the separation between a two-class data set of 2-dimensional space points. The objective is to find a hyperplane that maximizes the separation of the data points to their potential classes in a given dimensional space. The data points with the minimum distance to the hyperplane (closest points) are called Support Vectors.
In this tutorial, We will look at the multi-class object classification with the help of HOG features. For classification, we use the ECOC based multi-class SVM.

### Prerequisites
To follow along with this tutorial, you'll need:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.


### Overall scheme
![image of the scheme](/engineering-education/object-classification-using-histogram-of-oriented-gradients-features-and-multi-class-support-vector-machine-in-matlab/classification_one.png)

In the training image database, we have all the training images in the training database folder. You first convert all these images to their corresponding HOG features. These HOG features are then stored in the feature database and used to train the ECOC based multi-class SVM classifiers. So once the training is complete, we get a trained classifier. The trained classifier is ready to classify the input images. 

To test its performance, we give the test image. So all the test images stored in the test image database are first converted to their corresponding HOG features and then given to the trained classifier. The trained classifier then classifies all the input images, and we get the test outcomes. Based on the outcomes, we can go for accuracy and plot for the confusion matrix, e.t.c.

### Image dataset
You can get the image dataset that we are going to use [here](https://www.kaggle.com/smeschke/four-shapes). This database has a total of 16000 greyscale images of the size 200 x 200. We classify the images into four categories, that is, circle, square, triangle and star.

From the 16000 images, we are using only 4800 images for our training and testing. We are taking 1000 images from each category for training purposes. It totals 4000 images. We then use 200 images from each category for testing purposes. It sums to a total of 800 images for testing. The folder structure should be as shown below;

![folder structure](/engineering-education/object-classification-using-histogram-of-oriented-gradients-features-and-multi-class-support-vector-machine-in-matlab/classification_two.png)

### Error-correcting output codes(ECOC) based multi-class SVM
In machine learning, many algorithms, such as linear regression, SVM, e.t.c, can deal with binary classification problems. A binary classification problem is one where only there are only two target classes, for example, yes or no, black or white, e.t.c. It means you can only classify two input objects into the two classes.

In practice, many classification problems belong to multi-class classification problems; therefore, binary SVM cannot handle our objective of classifying four different shapes. However, there are modified SVM also for multi-class problems such as `one vs rest` and `one vs one`. These can classify by dividing the multi-class problem into a fixed number of binary classification problems.

Unlike `one vs rest` and `one vs one`, the ECOC technique allows each class to be encoded at an arbitrary number of classification problems. Furthermore, using an overdetermined presentation allows the extra models to act as `error correction` predictions, resulting in better predictive performance.

### Implementation of ECOC classifiers for multi-class SVM in Matlab
Matlab has in-built function `fitcecoc` for this, and the syntax is;
```Matlab
fitcecoc(x, y, name, value)
```
where;
`x`: Predictors(sets of the feature vector of all images).
`y`: Class labels.
`name, value`: Name value pair arguments. It has many options, but here we are using two, that is, `coding` and `learners`. The default option for coding is `onevsone`, and `learners` is `SVM`.

### Matlab code for object classification using HOG features
Here, we begin by preparing the image database. We prepare it by giving the directory for both the train and test folders we prepared before.  
```Matlab
path1 = 'trainimg';     %input all the training images
path2 = 'testimg';      %input all the test images 
```
We then read all these train and test images.
```matlab
traindb = imageDatastore(path1,'IncludeSubfolders', true, 'LabelSource', 'foldernames'); 
testdb = imageDatastore(path2,'IncludeSubfolders', true, 'LabelSource', 'foldernames'); 
```
In this `imageDatastore`, we have to include all the subfolders and the folder names. The folder name is the `LabelSource`. So all the trained images will go into the `traindb` variable while the test images go to the `testdb` variable.

### Training
First, we read one single image from the training database and define the cell size. The cell size we are using here is 16x16 for HOG features. Note that you can change this cell size to 8x8 or even 32x32. 
```Matlab
img = readimage(traindb, 1);
CS = [16, 16];
```
Now, find the HOG feature of the first image.
```matlab
[hogfv, hogvis] = extractHOGFeatures(img, 'CellSize', CS);
```
All the HOG features are stored in the `hogfv` variable. We then find the length of our `hogfv` variable, which is the hog feature variable. Then, read the total number of images in the traindb folder.
```Matlab
hogfeaturesize = length(hogfv);
totaltrainimages = numel(traindb.Files);
```
With these two pieces of information, that is, the number of images and size of the HOG features, we are defining one feature database. This feature database is a matrix. The number of rows equals the number of images in the train folder, while the number of columns equals the length of the features.
```Matlab
trainfeatures = zeros(totaltrainimages, hogfeatures, 'single');    %feature database
```
We mean that the `trainfeature` is the database that stores all the HOG features in the images.

After that, we read all these images from the `traindb` one by one to find their HOG features. These HOG features and storing in the `trainfeatures` matrix.
```matlab 
for i = 1:totaltrainimages
    img = readimage(traindb, i);
    %img = rgb2gray(img);
    trainingfeatures(i,:) = extractHOGFeatures(img, 'CellSize', CS);
end
```
Also, we read the labels of the four different shapes using the command below.
```Matlab 
traininglabels = traindb.Labels;
```
We now use the `fitcecoc` function to implement the ECOC feature classifiers for multi-class SVM.
```Matlab
%fitcecoc uses SVM learner and a 'one-vs-one' encoding scheme
classifiers = fitcecoc(trainingfeatures, traininglabels);
```
The training features are the x-values, while `traininglabels` is the y-values. We don't define any other parameter, which means that all the parameters are at their default values. Once this is complete, the classifier parameter will go into the `classifier` variable.

### Testing all the images
Here, we read the number of the total images in the test folder and the `testfeatures`. It is also a matrix, with the rows being the total number of the test images and the columns being the size of the HOG features.
```matlab 
totaltestimages = numel(testdb.Files);
testfeatures = zeros(totaltestimages, hogfeatures, 'single');
```
We then read the test images one by one just as we did before.
```matlab
for i = 1:totaltestimages
    imgt = readimage(testdb, i);
    testfeatures(i,:) = extractHOGFeatures(imgt, 'CellSize', CS);
end
```
Read the labels.
```Matlab
testlabels = testdb.Labels;      %getting labels
```
Now that we have all the test images in the `testfeatures` matrix and have trained our classifier, we test the classifier using the `predict` function.
```Matlab  
predictedlabels = predicted(classifiers, testfeatures);
```
So here, we have taken the trained classifier and the features of all the test images and stored them in the test feature variable. Next, the predicted labels are stored in the `predictedlabels` variable. After this, we find the accuracy of our classifier. This accuracy is the comparison of the predicted labels and the pre-defined labels. Also, you can plot the confusion matrix, which helps interpret the results.
```matlab
accuracy = (sum(predictedlabels == testlabels)/numel(testlabels))*100;
plotconfusion(testlabels, predictedlabels)
```
If we run this program, we get the confusion matrix is displayed as shown below. It is because it shows that our classifier is already classified.

![confusion matrix](/engineering-education/object-classification-using-histogram-of-oriented-gradients-features-and-multi-class-support-vector-machine-in-matlab/classification_three.png)

Also, in the command window, we can see the accuracy displayed as 100%. It is basically because the database is quite simple. If you use a more challenging database, it will be less than 100%.

### Discrete testing
The code for the discrete testing should be in a different script. Here, we give one image at a time and display the output that our classifier gives. It begins by reading one image, which the user inputs.
```Matlab
%program to test HOG based object detection
[filename, filepath] = uigetfile('*.*', 'Select input image');
filewithpath = strcat(pathname, filename);
imgt = imread(filewithpath);
```
We then define the cell size and extract the HOG features of it.
```Matlab
CS = [16, 16];    %cell size
[hogfvt, hogvist] = extractHOGFeatures(imgt, 'CellSize', CS); %getting HOG features
```
It then gives the HOG features to the classifiers for prediction.
```Matlab
predictedLabel = predict(classifier, hogfvt);
```
We print the predicted label on the image as the title.
```Matlab
figure
imshow(imgt)
title(['Shape recognized is' char(predictedLabels)])
```
Now let us run the program for the discrete testing. When you run it, Matlab asks the user to input the shape, and once this is complete, the shape is recognized, as shown below.

![image recognition](/engineering-education/object-classification-using-histogram-of-oriented-gradients-features-and-multi-class-support-vector-machine-in-matlab/classification_four.png)

To see the robustness of our classifier, we are going to use a distorted image and see if the classifier can still identify it. For image distortion, you can use your prefered software. So you distort the image and use it as the input. Let's see how this works.

![distored image](/engineering-education/object-classification-using-histogram-of-oriented-gradients-features-and-multi-class-support-vector-machine-in-matlab/classification_five.png)

As we can see, the scheme is working fine. It means that it is accurate and robust.

### Conclusion
The object classification using HOG features and ECOC multi-class SVM is a procedural process. You need to understand the scheme so that you can know what is happening in your program. It is important for error identification. Also, the scheme is accurate and robust. It means that it is more reliable for more complex datasets. Even though the accuracy will not be 100% for complex datasets, the accuracy will be as high as possible. It makes it a good method for object identification.

Happy coding!
