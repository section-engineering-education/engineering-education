### How to classify digits using simple classifiers
### Introduction
Classification automatically categorizes data into one or more subsets or classes using a classifier. A classifier is an algorithm of machine learning capable of classifying data in sub-sets. Classifiers classify into three processes, i.e. low, middle and high-level processes.
In this tutorial, we will see how to create a simple classifier. We will cover the classification process, the digit dataset and the Matlab code to create this classifier. You can find this digit dataset in Matlab, and we will see how they can be located and imported into Matlab. Also, we will see how we can train the classifier and validate its performance.

### Prerequisites
For proper understanding and moving along with this tutorial, you will require:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### Digit classification
Classifying objects is an important computer process such as surveillance, automatic cars, and image retrieval. For example, in automatic car development, we can use it to classify the surrounding objects like vehicles or pedestrians. The simple classification process is:
- Acquire a dataset with the object of interest labelled.
- Separate the dataset into train and testing.
- Depending on the features of interest extracted from the dataset, we train the object.
- Finally, using the extracted features, we test the effectivity of our classifier.

To illustrate this, we will create a digit classifier using the HOG features and the SVM.

### Digit dataset
In this classification, we use synthetic digit images for the Training. These synthetic digit images contain images surrounded by other digits, which are surrounded by other digits, which are copies of how the digits are normally seen together. Using these synthetic images enables you to create various training samples without manual collection.
For the testing, we use scanned handwritten digits. Note that there is a wide variety of data that helps you train and test your classifiers. Synthetic digit is the most prefered dataset because it is feasible.


### Matlab code for creating the classifiers
We will first begin by loading the training and testing datasets. In this case, we will load both the synthetic digit dataset for Training and the handwritten dataset for testing.
One advantage of using Matlab is that it has both the synthetic and handwritten dataset that helps you create the classifiers. These datasets are stored in the vision toolbox. It means that you don't have to search for the data externally. This helps save time.
Now we will load this dataset as shown below:
```matlab
% Loading both the training and testing dataset from the vision toolbox
Training = fullfile(toolboxdir('vision'),'visiondata','digits','synthetic');
Testing = fullfile(toolboxdir('vision'),'visiondata','digits','handwritten');
```
The function `fullfile()` is used to build a fullfile specification for the specified folders and files. The function `toolboxdir()` provides the root folder for the specified toolbox. In this case, the function `toolboxdir()` provides the root folder for the vision toolbox. Using the `fullfile()` function, we get the full path for our dataset from the root folder to the specified files.
We have to perform a preprocessing for our data. This is done by specifying the data to be used for the training and for testing. This can be done using the `imageDatastore()` function as shown below:
```matlab
% In the dataset, the image folders are used as the labels.
training_dataSet = imageDatastore(Training,'IncludeSubfolders',true,'LabelSource','foldernames');
testSet = imageDatastore(Testing,'IncludeSubfolders',true,'LabelSource','foldernames');
```
Here, the `imageDatastore()` function scans the image directories. This function considers the subfolders and the dataset labels. In this case, the folder name for the images is used as the label.
We can tabulate the number of images associated with all the labels using the `countEachLabel()` function and the dataset type.
The training dataset is made of 101 images for each digit label in our dataset. The test dataset is made of 12 images for each digit label.
We can view the nature of our images using the `imshow()` function as shown below:
```Matlab
figure;

subplot(2,3,1);
imshow(training_dataSet.Files{102});

subplot(2,3,2);
imshow(training_dataSet.Files{304});

subplot(2,3,3);
imshow(training_dataSet.Files{809});

subplot(2,3,4);
imshow(test_dataSet.Files{13});

subplot(2,3,5);
imshow(test_dataSet.Files{37});

subplot(2,3,6);
imshow(test_dataSet.Files{97});
```
We specify the image digit number in the folders. For example, `imshow(test_dataSet.Files{37})` displays the file in the 37th position of the `test_dataSet` folder.
The output is as shown below:

![Display of the sample images](/engineering-education/digit-classifiers-in-matlab/sample-images.png)

As we can see from the images, there is a lot of noise. It means we have to perform a pre-processing of the images. We will remove the noise introduced during the data collection. It gives a better feature vector to train the classifiers. The pre-processing code is as shown below:
```Matlab
% Perform a pre-process for our datasets
extract_TestImage = readimage(test_dataSet,37);
imageProcessed = imbinarize(rgb2gray(extract_TestImage));
```
The `readimage()` function reads a specified image from a dataset folder. So, we first read the image and then perform a pre-process. Next, we use the `imbinarize()` function to binarize the image. Binarization is the conversion of an image to bi-level documents. It separates the image pixels into dual collections, i.e. white and black.
This `imbinarize()` function is only applied to a grayscale image. To convert the coloured image to grayscale, we use the `rgb2gray()` function. The output of this pre-processing is as shown below:

![Image pre-processing](/engineering-education/digit-classifiers-in-matlab/pre-processing.png)

### Extracting the HOG function
Since we are using the extracted HOG features to train our classifier, we should ensure that our vector encodes a lot of information about the objects. In this case, we use the `extractHOGFeatures()` as shown below:
```Matlab
% Extract HOG features and HOG visualization
[hog2x2, vis_2x2] = extractHOGFeatures(img,'CellSize',[2 2]);
[hog4x4, vis_4x4] = extractHOGFeatures(img,'CellSize',[4 4]);
[hog8x8, vis_8x8] = extractHOGFeatures(img,'CellSize',[8 8]);
```
This `extractHOGFeatures()` extracts the HOG features of the input image and gives these features as a 1xN vector. Here, we are extracting the HOG features using different cell sizes. This enables us to choose the right cell size to use.
We can visualize the original image and the corresponding plot for the HOG feature for various cell sizes. It is done by the code below:
```Matlab
% Plot of the original image
figure; 
subplot(2,3,1:3); imshow(img);

% Plot of HOG features
subplot(2,3,4);  
plot(vis_2x2); 
title({'CellSize = [2 2]'; ['Length = ' num2str(length(hog2x2))]});

subplot(2,3,5);
plot(vis_4x4); 
title({'CellSize = [4 4]'; ['Length = ' num2str(length(hog4x4))]});

subplot(2,3,6);
plot(vis_8x8); 
title({'CellSize = [8 8]'; ['Length = ' num2str(length(hog8x8))]});
```
The output is as shown below:

![Plot of the HOG features](/engineering-education/digit-classifiers-in-matlab/hog-features.png)

If we look at that output, we can see the cell size of [2 2] extracts more features than that of the cell size of [8 8]. One weakness of the [2 2] cell size is that it significantly increases the vector's dimensionality. It means that the [4 4] is the prefered cell size to use in this case. Nevertheless, it extracts enough information that can help identify the digit while reducing the dimensionality of the vector. This helps to reduce the time used for Training.
We can now use our chosen cellsize as shown below:
```matlab
cellSize = [4 4];
hogFeatureSize = length(hog4x4);
```
Let us now train our classifier.

### Training the digit classifier
We use the `fitcecoc()` function to train the classifiers. This function is from the statistical toolbox. This function creates classifiers using the binary SVM.
The first step is extracting the HOG features and perform a pre-processing for the images. This is done in a loop for all the images in the train dataset as shown below:
```matlab
numImages = numel(training_dataSet.Files);
trainingFeatures = zeros(numImages,hogFeatureSize,'single');

for i = 1:numImages
    img = readimage(training_dataSet,i);
    
    img = rgb2gray(img);
    
    % preprocess the images
    img = imbinarize(img);
    
    trainingFeatures(i, :) = extractHOGFeatures(img,'CellSize',cellSize);  
end

% Get labels for each image.
trainingLabels = training_dataSet.Labels;

% Implementing fitcecoc.
classifiers = fitcecoc(trainingFeatures, trainingLabels);
```
Hereafter extracting the HOG features, we use the `fitcecoc()` function to train the classifier depending on the extracted features and the labels. This function uses the extracted features and the labels as the arguments.

### Evaluating the classifier
In this section, we will test our classifier. First, this is done using the test images. Then, we extract the HOG features of these test images and classifier them depending on the prediction. Also, we will plot the confusion matrix.
```Matlab
[testFeatures, testLabels] = ExtractHOGFeaturesFromImageSet(testSet, hogFeatureSize, cellSize);

% Predict the images depending on the HOG extracted.
predictedLabels = predict(classifier, testFeatures);

% Show the confusion matrix of the classifier.
confMat = confusionmat(testLabels, predictedLabels);

DisplayConfusionMatrix(confMat)
```
In the evalution, we use the helper function `ExtractHOGFeaturesFromImageSet()` that extract the HOG features and the helper function `DisplayConfusionMatrix()` function for plotting the confusion matrix. This fuctions extracts the features just as we explained before.
The helper functions used can be found [here](link)
The confusion matrix of our classifier is as shown below:

![Confusion matrix](/engineering-education/digit-classifiers-in-matlab/confusion-matrix.png)

The columns represent the predicted labels in this confusion matrix, while the rows represent the known labels. This matrix is in the percentage form.

### Conclusion
This is how simple it is to create our classifiers. Matlab has various functions from various toolboxes. These functions make your code appear neat and easy to understand. Also, you can validate the performance of your classifier, which is a very important feature.

Happy coding!
