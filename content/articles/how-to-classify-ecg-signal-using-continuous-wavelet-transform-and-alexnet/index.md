---
layout: engineering-education
status: publish
published: true
url: /how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/
title: How to Classify ECG Signals Using Continuous Wavelet Transform and AlexNet
description: This tutorial will look at how one can use AlexNet to classify ECG signals via transfer learning in Matlab.
author: paul-juma
date: 2021-12-16T00:00:00-08:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/hero.jpg
    alt: How to Classify ECG Signals Using Continuous Wavelet Transform and AlexNet Hero Image
---
ECG signals represent the electrical activity of the heart observed from a strategic point of the human body, characterized by Quasi-periodic voltage. AlexNet is a convolutional neural network that has eight different layers. This method is commonly used in the science sector and for image studies.
<!--more-->
Transfer learning (TL) is a research problem in machine learning that focuses on storing knowledge gained while solving one problem and applying it to a different but related problem.

For example, knowledge gained while learning to recognize cars could be used when trying to recognize trucks.

This tutorial will classify the ECG signals using pre-trained deep CNN (AlexNet) via transfer learning in Matlab. For this purpose, we utilized the strength of a container wavelet transforms to represent the one dimension ECG signals as images. It makes it possible to be used as an input in the AlexNet.

### Prerequisites
To follow along with this tutorial, you'll need to have:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB](https://www.section.io/engineering-education/getting-started-with-matlab/) basics.

### Types of ECG signal for classification
Primarily, we are taking three types of ECG signals:
- ARR: Arrhythmias
- CHF: Congestive heart failure, and
- NSR: Normal Sinus Rhythm

They are shown below:

![types of signals](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-one.png)

The main objective here is to train a CNN to distinguish between ARR, CHF, and NSR. These three signals (162 ecg recording) are obtained from ecg signal databases from the physionet. The databases include:
1. MIT-BIH Arrhythmia database (96recordings)[ARR signals]
2. MIT-BIH Normal Sinus Rhythm Database (30recordings)[NSR signals]
3. BIDMC Congestive Heart failure Database (36recordings)[CHF signals]

The first step is downloading the data from the [github repository](https://github.com/mathworks/physionet_ECG_data/). Next, click on the `code` tab and select `download the zip` to download the database.

![github repository](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-two.png)

In this `.zip` file, we only need the `ECGData.mat`. It means that we `unzip` this file to get it. Afterwards, we place it in Matlab's current directory. Then, executing the `load` function with the database as the argument to download it to Matlab:

```matlab
load(ECGData.mat);   %load ecg
```

To get the signal in your data, execute the code below:

```Matlab
data=ECGData.Data;
```

Also, if you want to store the labels, we use the `ECGData.Labels`. This command reads all the signals and stores all the labels available here:

```Matlab
labels=ECGData.Labels;          %getting labels
```

Now, this signal is a matrix of size `162 x 65536`. So it means that it carries 162 ECG signals of size 65536 samples each.

### ECG signal database preparation
For our problem, we pre-process the database. Each recording is `65536` samples. It means we will break the signals into small signals of length 500 samples. This is done to increase the size of the database to make it appropriate to train CNN.

For this purpose:
- We take 30 recordings of each type to have equal distribution.
- Each record is broken down to 10 pieces, each of length 500 samples.
- Out of the 900 recordings, we are using 750 recordings for training and 150 for testing.

### ECG signal to image conversion using cwt
Now, we want to convert all the 1-D signals into images cwt to be used as inputs to CNN for classification.

The deep CNN that we are using is Alex, and it takes images as the input. For this purpose, we take the CWT of each one dimension signal, and all the coefficients are arranged to form a cwt scalogram.

Each scalogram is represented in the color map of the type jet of 128 colors. Scalograms are then converted into images and saved into folders corresponding to each class since we create folders for each signal type. Each image is of the size `227x227` and in the RGB color format.

For cwt, the wavelet used is `analytic Morlet(amor)`. These are wavelets with one-sided spectra and are complex-valued in the time domain. These wavelets are suitable for obtaining a time-frequency analysis using the cwt. The wavelet has equal variance in time and frequency.

![ecg signal vs image](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-three.png)

### Transfer learning via AlexNet
Transfer learning is called fine-tuning a pre-trained CNN to perform classification on a new collection of images. Transfer learning is quick and easier rather than training a CNN from scratch, which requires millions of inputs, lots of training time, and high-speed, efficient hardware.

For ecg signal classification, we use a pre-trained deep CNN. AlexNet has been trained on over one million images and can classify images into 1000 objects categories.

![transfer learning procedure](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-four.png)

### Matlab code for database creation (image signal to scalogram image conversion)
We first load the ecg signal using the `load` command and the labels giving the data a `.Label` extension. This extension extracts the data labels:

```matlab
% program to create CWT image database from ecg signal
load('ECGData.mat');       %loading ECG database
data = ECGData.Data;    %getting database
labels = ECGData.Labels;    %getting labels
```

Now we will take 30 recordings of each signal:

```matlab
ARR = data(1:30,:);     %Taken first 30 recordings
CHF = data(97:126,:);
NSR = data(127:156,:);
signallength = 500;
```

The signal length is specified in the database and is equal for all the signals.

Define the cwt filter `cwtfilterbank`, used to find the cwt coefficients. This function takes in the signal length, wavelet type `amor`, and the wavelet bandpass filter `VoicesPerOctave`:

```Matlab
%Defining filters for CWT with Amor wavelet and 12 filtering per octave
fb = cwtfilterbank('SignalLength', signal length, 'Wavelet', 'amor', 'VoicesPerOctave', 12);
```

Make a folder for each label in the current directory. To make a folder using matlab command window, we use the `mkdir` function. This function creates the folder automatically. The function uses the folder's name as the argument.

To create a subfolder inside the main folder, you re-run the command with the `mainfolder\subfolder` as shown below:

```matlab
mkdir('ecgdataset');   %main folder
mkdir('ecgdataset\arr'); %sub folder
mkdir('ecgdataset\chf');
mkdir('ecgdataset\nsr');

ecgtype = {'ARR', 'CHF', 'NSR'};
```

`ecgtype` is a cell array that carries the names of the signal by string.

Now we are converting these ecg signals to images. This is done using the `ecg2cwtscg` function:

```matlab
%Function to convert ECG to image
ecg2cwtscg(ARR, fb, ecgtype{1});
ecg2cwtscg(CHF, fb, ecgtype{2});
ecg2cwtscg(NSR, fb, ecgtype{3});
```

This function takes the signal type and the filterbank `fb` as inputs. It takes the signal, gets its coefficient using `fb`, and then converts it to an image.

`ecgtype` are the string types. `ecgtype{1}` represents `ARR`, `ecgtype{2}` represents `CHF`, and `ecgtype{3}` represents `NSR`.

It is how we create our databases. We have the main folder `dataset` created with the subfolder `arr`, `nsr`, and `chf` as shown below when we execute this program:

![show current directory](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-five.png)
_mainfolder_

![current directory](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-six.png)
_subfolders_

![current directory](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-seven.png)
_Inside the subfolders_

The `ecg2cwtscg` is not a matlab function. It is a custom function that we created for the conversion purpose. The function is as shown:

```matlab
function ecg2cwtscg(ecgdata, cwtfb, ecgtype)
nos = 10;  %number of signals
no1 = 500; %signal length
colormap = jet(128);
if ecgtype == 'ARR'
    folderpath = strcat('mainpathfolder/arr/');
    findx = 0;
    for i = 1:30
        indx = 0;
        for k = 1:nos
            ecgsignal = ecgdata(i, indx+1: indx+no1);
            cfs = abs(cwtfb.wt(ecgsignal));
            im = ind2rgb(im2uint8(rescale(cfs)), colormap);
            filenameindex = findx + k;
            filename = strcat(folderpath, sprintf('%d.jpg', filenameindex));
            imwrite(imresize(im, [227 227]), filename);
            indx = indx + no1;
        end
        findx = findx + nos;
    end

elseif ecgtype == 'CHF'
    folderpath = strcat('mainfolderpath/chf/');
    findx = 0;
    for i = 1:30
        indx = 0;
        for k = 1:nos
            ecgsignal = ecgdata(i, indx+1: indx+no1);
            cfs = abs(cwtfb.wt(ecgsignal));
            im = ind2rgb(im2uint8(rescale(cfs)), colormap);
            filenameindex = findx + k;
            filename = strcat(folderpath, sprintf('%d.jpg', filenameindex));
            imwrite(imresize(im, [227 227]), filename);
            indx = indx + no1;
        end
        findx = findx + nos;
    end

    else ecgtype == 'NSR'
    folderpath = strcat('mainfolderpath/nsr/');
    findx = 0;
    for i = 1:30
        indx = 0;
        for k = 1:nos
            ecgsignal = ecgdata(i, indx+1: indx+no1);
            cfs = abs(cwtfb.wt(ecgsignal));
            im = ind2rgb(im2uint8(rescale(cfs)), colormap);
            filenameindex = findx + k;
            filename = strcat(folderpath, sprintf('%d.jpg', filenameindex));
            imwrite(imresize(im, [227 227]), filename);
            indx = indx + no1;
        end
        findx = findx + nos;
    end
    end
end
```

The number of signal `nos` is 10. Since we have three signals, 10 by 3 gives you the number of recordings we said to be 30. The colormap we are using is `jet(128)`, and the signal length remains the same.

There is a section of this function that is repeated. The `else` and the `elseif` statements are repeated with only the signal type changed.

Lets look at a section of that:

```matlab
if ecgtype == 'ARR'
    folderpath = strcat('mainfolderpath/arr/');
    findx = 0;
    for i = 1:30
        indx = 0;
        for k = 1:nos
            ecgsignal = ecgdata(i, indx+1: indx+no1);   %extracting signals
            cfs = abs(cwtfb.wt(ecgsignal));
            im = ind2rgb(im2uint8(rescale(cfs)), colormap);
            filenameindex = findx + k;
            filename = strcat(folderpath, sprintf('%d.jpg', filenameindex));
            imwrite(imresize(im, [227 227]), filename);
            indx = indx + no1;
        end
        findx = findx + nos;
    end
```

This program means that if the signal is of `ARR` type, create a folder `arr` and store the images there. The `for` loop defines the number of iterations which is 30 for the first 30 recordings.

Inside the `for` loop, we extract the signals using `ecgdata(i, indx+1: indx+no1)`. We then find the wavelet coefficients with the filter `fb`.

The `abs(cwtfb.wt(ecgsignal))` command gives the wavelet coefficients stored in the variable `cfs`. The `abs` means taking the absolute value since the coefficients are complex:

```matlab
im = ind2rgb(im2uint8(rescale(cfs)), colormap);
```

Convert the coefficients to images using `ind2rgb`, but first rescale these coefficients using `rescale` function. `im2uint8` converts the signals to the `uint8` type so that it becomes an image. The `colormap` defines the color since the images are in `rgb` form:

```matlab
 filenameindex = findx + k;
            filename = strcat(folderpath, sprintf('%d.jpg', filenameindex));
            imwrite(imresize(im, [227 227]), filename);
            indx = indx + no1;
```

The image is saved using the `imwrite` function with the proper name after resizing it to `227 x 227` pixels. The images are saved in the indexed form, i.e. `1.jpg`, `2.jpg` etc. using the `indx` function.

This procedure remains the same for other signals. The only thing that we change is the signal type, hence the long function above.

### Matlab code for training AlexNet (transfer learning)
For this, we need to download a toolbox (deep learning toolbox for AlexNet network). Click on the `adds on` and select `get add on` on the home page to get the toolbox. When you click this, you get a window requesting your Mathworks account. Log in and search for `deep learning toolbox for alexnet network` and download it.

Afterwards, start the training process. The first step is reading the images in the database folder (images that we converted):

```Matlab
% Training and validation using AlexNet
DatasetPath = 'folderpath/ecgdataset';

% reading images from the image database folder
images = imageDatastore(DatasetPath, 'IncludeSubfolders', true, 'LabelSource', 'foldernames');
```

The `DatasetPath` stores the path of our datasets. `imageDatastore` is used to read multiple images from a database. It includes images in the `folder` and `IncludeSubfolders' subfolder`.

We need to distribute the images into training and testing. We will take 250 images from each folder, and we will have a total of 750 images for training. Since each subfolder has 300 images, the number of images used for testing will be 50 from each folder giving a total of 150 images:

```Matlab
% Distributing images in the set of training and testing
numTrainFiles = 250;
[TrainImages, TestImages] = splitEachLabel(images, numTrainFiles, 'randomsize');
```

All the training images are stored in the `TrainImages` variable, and test images are stored in the `TestImages`. The splitting is done by the `splitEachLabel` function, which is `randomized`.

Load the pre-trained network `alexnet`. To load this network, we execute the command `alexnet`. This command is not functional until you download the toolbox:

```Matlab
net = alexnet;  %importing pre-trained alexnet(requires support package)
layersTransfer = net. Layers(1:end-3); %preserving all layers except last three layers
```

`net.Layers` loads all the layers of the network. We preserve all the layers in the variable `layersTransfer` and modify the last three, thus `1:end-3`.

Define the number of output classes:

```Matlab
numClasses = 3; %Number of output classes: ARR, CHF, NSR
```

Now, lets define the three layers that we are modifying, that is `fullyConnectedLayer`, `softmaxLayer` and the `classificationLayer`:

```matlab
%defining layers of alexnet
layers = [layersTransfer
    fullyConnectedLayer(numClasses, 'WeightLearnRateFactor', 20, 'BiasLearnRateFactor', 20)
    softmaxLayer
    classificationLayer];
```

For for more information on the layers, check [here](https://www.section.io/engineering-education/deep-neural-systems-matlab/).

Now we want to define the training options. It gives the direction in which the training should be carried. We define the solver, `sgdm`, the learning rate, `1e-4`, validation frequency training progress in plot form:

```Matlab
%training options
options = trainingOptions('sgdm', 'MiniBatchSize', 20, 'MaxEpochs', 8, ...
    'InitialLearnRate', 1e-4, 'Shuffle', 'every-epoch', 'ValidationData', TestImages, ...
    'ValidationFrequency', 10, 'Verbose', false, 'Plots', 'training-progress');
```

After defining all the layers and the transfer options, we start the training. To begin, we use the command `trainNetwork` function. The function takes the images and trains them according to the `options`. It means the arguments of this function are the training images, layers, and options:

```Matlab
% training the Alexnet
netTransfer = trainNetwork(TrainImages, layers, options);
```

Now let us classify the images using the `classify` command:

```matlab
%Classifying images
YPred = classify(netTransfer, TestImages);
YValidation = TestImages.Labels;
accuracy = sum(YPred == YValidation)/numel(YValidation);
```

The `classify` command takes the trained network and the test images and stores them in `YPred` variable for the classified. They are the predicted classifications.

`Yvalidation` will store the actual validation or labels of the images, thus `TestImages.Labels`. When comparing the predicted classification `YPred` and the actual validation `YValidation`, we get the accuracy.

For proper visualization, plot the confusion matrix. This plot shows the number of correctly classified data and how many are misclassified:

```Matlab
%plotting Confusion Matrix
plotconfusion(YValidation, YPred)
```

Let's now execute our program.

When we run the program, we see the training progress as shown below:

![training progress](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-eight.png)

We have the two graphs here. The upper one shows the accuracy, while the lower one shows the loss. As the accuracy increases, the losses decreases. The number of epochs is 8. Also, we have the plots for training and that for validation.

The plot for the final training is as shown below:

![final training](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-nine.png)

In the final training, we see that the accuracy achieved is 96.67%, which is good.

Let's look at the confusion matrix:

![confusion matrix](/engineering-education/how-to-classify-ecg-signal-using-continuous-wavelet-transform-and-alexnet/class-ten.png)

The confusion matrix shows the relation between the output class and the target class regarding classification and misclassifications. For example, in `arr`, we see that out of 50 testing images, 48 are correctly classified, 2 are misclassified as `chf`. On the other hand, for `chf`, 49 images are correctly classified, and one is misclassified as `nsr`.

### Conclusion
This is how we can train our deep CNN, a pretrained network, via transfer learning. It is also how we can use the cwt to represent a dimensional signal in the form of two-dimensional images.

The funny part is that the output or the accuracy of this method depends on the signal length and the colormap you choose. Although we use the `jet(128)`, if you choose some other colormap, you receive a different result.

I hope you found this tutorial helpful.

Happy Coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
