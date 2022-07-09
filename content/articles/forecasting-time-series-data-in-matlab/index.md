---
layout: engineering-education
status: publish
published: true
url: /forecasting-time-series-data-in-matlab/
title: How to Forecast Time Series Data using Neural Network Toolbox in Matlab
description: In this tutorial, we will look at the general overview of neural networks and understand how to use the toolbox to implement neural networks. 
author: linet-achieng
date: 2022-06-23T00:00:00-04:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/forecasting-time-series-data-in-matlab/hero.jpg
   alt: Forecast Time Series Data using Neural Network Toolbox in Matlab Hero Image
---
Forecasting is the process of predicting future results based on current and past events. 
<!--more-->
Time series data is gathered over time. A neural network toolbox is a Matlab toolbox that helps implement neural networks without writing code. We can use this toolbox to forecast time series data easily.

This tutorial will look at the general overview of neural networks. We will also discuss how to use this toolbox to implement the neural network. 

Finally, we will determine how to develop and generate the code for a model. You can use this code for other forecasting purposes.

### Prerequisites
For a proper understanding of this tutorial, you need:

- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### How to use the neural network toolbox
We execute `nnstart` in the command window to open this toolbox. For example, this command opens a new window shown below:

![Openning window](/engineering-education/forecasting-time-series-data-in-matlab/Openning-Window.png)

This toolbox provides various options that we can use to implement our data. It means that you can also perform other operations apart from the prediction. 

For example, we have the fitting app, pattern recognition app, clustering app and time series app. We can use all these apps to analyze the input data. These apps are known as wizards. Since we will perform a prediction, we select the `pattern recognition app`.

Note that this app provides other resources to help one understand the neural network toolbox and neural network. They also provide an external source of a dataset. Select the `more information tab` at the top of the window above to access these sources.

When you open the `pattern recognition app`, you get the following interface:

![Pattern recognition app](/engineering-education/forecasting-time-series-data-in-matlab/Recognition-App.png)

This app uses a two-layer feed-forward network to predict data. A feed-forward network is a classification algorithm that is biologically inspired. 

It consists of simple neurons organized in layers, and each neuron is connected to the previous layers. The meaning of this explanation is shown below:

![Feed forward network](/engineering-education/forecasting-time-series-data-in-matlab/FeedForward-network.png)

The neural recognition app will help you select data, as well as create, and train networks. It then evaluates its performance using cross-entropy and confusion matrix. 

A confusion matrix is a layout table that shows the performance of a neural network on test data. It is mainly used to visualize supervised machine learning.

When you click on `next`, you get a window that allows you to select input data, as shown below:

![Select input data](/engineering-education/forecasting-time-series-data-in-matlab/Input-Data.png)

Click on the three dots labelled `2` to input your data. The dialogue that allows you to select data from it will open. 

In some instances, you may not have the input data. The neural network toolbox has some sample data that you can use to create the neural network. 

Click on the `load example data set` below the window above to get this dataset. It will open sample datasets that you can use to create a new neural network. Let's begin with the sample dataset in Matlab. The dataset interface is shown below:

![Dataset](/engineering-education/forecasting-time-series-data-in-matlab/Datasets.png)

There is a brief description of the selected dataset. For example, we have selected `breast cancer`. A brief description of this dataset is on the right side of the window. 

You can use this description to understand the dataset. It also gives alternative ways to create a neural network from the command window using the tool properties. To do this in the command window, we execute the code below:

```matlab
[x,t] = cancer_dataset; 
net = patternnet(10); 
net = train(net,x,t); 
view(net) y = net(x); 
plotconfusion(t,y)
```

In the code above, the `cancer_dataset` is loaded into Matlab, and the input data is stored in the `x` variable. 

The target is stored in the variable `y`. The `patternnet()` function creates the neural pattern with `10` neurons. This pattern is trained by the `train()` function which uses the network(net), input data and the target. The confusion matrix is also plotted using the `plotconfusion()` method.

Since we are not creating and training the dataset in the command window, click on `import` at the bottom of the window above. Once you import the dataset, both the input and target are filled, as shown below:

![Selecting data](/engineering-education/forecasting-time-series-data-in-matlab/Selecting-Data.png)

Our dataset is arranged column-wise.

>Note that you can import input data and the target differently. This is done by clicking on the three dots beside that dataset.

When you click `next`, it opens a new window shown below:

![Validation and Test data](/engineering-education/forecasting-time-series-data-in-matlab/Test-Data.png)

In this section, the dataset is divided into three, i.e. train, validation, and test data. As we can see, 70% of the dataset is for training, 15% for validation and the remaining 15% for testing. 

The total samples in our dataset are 699. These are the default division ratio, but you can change this to your prefered ratio using the drop-down menu.

On the right side of this window, we have a brief description of the role of the samples. First, the training data is used to train the network. Also, it adjusts according to the error.

- The validation sample is used to generalize the network and stops the training once it's complete. 

- The test samples are used to measure the accuracy of the network. These samples have no dependency on the samples used for training.

Click `next` to access the following interface:

![Network architecture](/engineering-education/forecasting-time-series-data-in-matlab/Network-Architecture.png)

Here, you specify the number of hidden neurons that the network should use. The number of hidden neurons you use is based on the dataset's type. 

As you increase the number of hidden neurons, the accuracy increases. However, when the number of these hidden neurons is so high, the model will learn more parameters than required, which leads to network inaccuracy.

The default value of these hidden neurons is `10`. We can change this number to our prefered value for accuracy purposes. When you click `next`, it opens the training interface shown below:

![Train network](/engineering-education/forecasting-time-series-data-in-matlab/Train-Network.png)

When you click on the `train`, the training begins. The training stops once the generalization or validation stops improving. At this point, the neural network is assumed to have completed learning.

If we train our network multiple times, we will obtain different results. This is because of different initial conditions and sampling.

Once the training is done, the window shown below appears:

![Training output](/engineering-education/forecasting-time-series-data-in-matlab/Training-Output.png)

This window shows the algorithm, training progress, and output plots. These outputs are the performance, training state, error histogram and error matrix. 

For example, this network uses `23` iterations. The performance is `0.227` which is low. We never set our neural network properly because the sample data was not large. When the dataset is too small, the training performance is likely to be poor.

You can visualize the plot of the training process. For example, if you want to visualize the plot for the performance, click on the performance to see the following plots:

![Performnace plot](/engineering-education/forecasting-time-series-data-in-matlab/Performance-Plot.png)

Also, if you want to visualize the confusion matrix, click on the `confusion` which is shown below:

![Confusion matrix](/engineering-education/forecasting-time-series-data-in-matlab/Confusion-Matrix.png)

When you navigate back to the training window, it will be different. This new window allows you to re-train using certain data, import large datasets, or adjust network size. 

Click `next` to deploy the solutions. These are the Matlab code and the Simulink model for the neural network that we have created. The interface is shown below:

![Deployed solutions](/engineering-education/forecasting-time-series-data-in-matlab/Deployed-Solutions.png)

When you select the `Matlab function`, a code is generated for the neural model that we have created. The Simulink model for deploying our model is also highlighted below:

![Simulink model](/engineering-education/forecasting-time-series-data-in-matlab/Simulink-Model.png)

We can also get the diagram for our neural network:

![Neural network diagram](/engineering-education/forecasting-time-series-data-in-matlab/Network-Diagram.png)

We can use this network in any dataset that you train for prediction. This network is saved as a Matlab script.

Click `next` to save your network in the deploy solution window:

![Save results](/engineering-education/forecasting-time-series-data-in-matlab/Save-Results.png)

We can save the network as a simple or advanced script. The advanced script has additional options that help you improve your neural network. 

> Note that you must first generate the Matlab code or the Simulink model before saving your network. Once this is done, we click the `finish` button to complete this whole process.

### Conclusion
The advantage of the neural network toolbox in Matlab is that it has a user-friendly interface. 

However, to use this toolbox, you need an advanced understanding of your dataset. Understanding the machine learning concept is also critical.

Also, to use this toolbox, you don't need knowledge of the generated script. We should only ensure that the output results attained by our network are good and then generate the script.

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)