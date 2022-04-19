
---
layout: engineering-education
status: publish
published: true
url: /implementing-gan-from-scratch/
title: How to forecast time series data using Neural Network toolbox in Matlab
description: In this tutorial, we will look at the general view of neural networks and see how to use the Neural Network toolbox to implement neural networks. 
author: linet-achieng
date: 2022-03-29T00:00:00-18:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/implementing-gan-from-scratch/hero.jpg
   alt: forecast time series data using Neural Network toolbox example image
---


### Introduction
Forecasting, also known as prediction, is the process of telling the future results depending on current and past events. Time series is the data gathered over some time repeatedly by measurement. A neural network toolbox is a Matlab toolbox that helps implement neural networks without writing code. Using this toolbox, we can forecast time series data easily.

This tutorial will look at the general view of neural networks. Also, we will see how to use this toolbox to implement the neural network. Finally, we will see how to develop a model and generate the code for that model. You can use this code elsewhere for various forecasting purposes.

### Prerequisites
For proper understanding and moving along with this tutorial, you will require:

- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### How to use the neural network toolbox
We execute the `nnstart` in the command window to open this toolbox. For example, this command opens a new window shown below:

![Openning window](/engineering-education/forecasting-time-series-data-in-matlab/image-one.png)

This toolbox provides various options that we can use to implement our data. It means that you can also perform some other operations apart from the prediction. For example, we have the fitting app, pattern recognition app, clustering app and time series app. We can use all these apps to analyze the input data. These apps within the app are known as wizards. Since we will perform a prediction, we select the `pattern recognition app`.

Note that this app provides other resources to help you understand the neural network toolbox and neural network. Select the `more information tab` at the top of the window above to get these sources. They also provide an external source of a dataset.

When you open the `pattern recognition app`, you get the interface shown below:

![Pattern recognition app](/engineering-education/forecasting-time-series-data-in-matlab/image-two.png)

This app uses a two-layer feed-forward network to predict data. What is a feed-forward network? Well, this is a classification algorithm that is biologically inspired. It consists of simple neurons organized in layers, and each neuron in a layer is connected to the previous layers. The meaning of this explanation is shown below:

![Feed forward network](/engineering-education/forecasting-time-series-data-in-matlab/image-three.png)

The neural recognition app will help you select data create, and train networks. It then evaluates its performance using cross-entropy and confusion matrix. A confusion matrix is a layout table that shows the performance of a neural network on test data. It is mainly used to visualize supervised machine learning.

When you click on `next`, you get a window that allows you to select your input data. For example, the interface is shown below:

![Select input data](/engineering-education/forecasting-time-series-data-in-matlab/image-four.png)

Click on the three dots labelled `2` to input your data. The dialogue that allows you to select your data from it opens up when you click it. In some instances, you may not have the input data. The neural network toolbox has some sample data that you can use to create the neural network. Click on the `load example data set` below the window above to get this dataset. When you click it, it opens sample datasets that you can use to create your neural network. Let us begin with the sample dataset in Matlab. The dataset interface is shown below:

![Dataset](/engineering-education/forecasting-time-series-data-in-matlab/image-five.png)

There is a brief description of the selected dataset. For example, we have selected `breast cancer`. A brief description of this dataset is on the right side of the window. You can go through this description to understand your dataset. It also gives alternative ways to create your neural network from the command window using the tool properties. To do this in the command window, we execute the code below:

```matlab
[x,t] = cancer_dataset; 
net = patternnet(10); 
net = train(net,x,t); 
view(net) y = net(x); 
plotconfusion(t,y)
```

The `cancer_dataset` is loaded into Matlab, and the input data is stored in the `x` variable. The target is stored in the variable `y`. The function `patternnet()` creates the neural pattern with `10` neurons. This pattern is trained by the `train()` function. This function uses the network(net), input data and the target. The confusion matrix is also plotted using the `plotconfusion()` function.

Since we are not creating and training the dataset in the command window, click on `import` at the bottom of the window above. after selecting your sample data. Once you import your dataset, both the input and target are filled as shown below:

![Selecting data](/engineering-education/forecasting-time-series-data-in-matlab/image-six.png)

Our dataset is arranged column-wise.

>Note that you can import input data and the target differently. It is done by clicking on the three dots beside that dataset.
Click `next`. It opens a new window shown below:

![Validation and Test data](/engineering-education/forecasting-time-series-data-in-matlab/image-seven.png)

In this section, the dataset is divided into three, i.e. train, validation, and test data. As we can see, 70% of the dataset is for training, 15% for validation and the remaining 15% for testing. The total samples in our dataset are 699. These are the default division ratio, but you can change this to your prefered ratio by clicking on the drop-down menu.

On the right side of this window, we have a brief description of the role of the samples.
First, the training data is used to train the network. Also, it adjusts according to the error.
- The validation sample is used to generalize the network and stops the training once the training is done. 
- Finally, the test samples are used to measure the accuracy of the network. These samples have no dependency on the samples used for training.

Click `next` to get the interface below:

![Network architecture](/engineering-education/forecasting-time-series-data-in-matlab/image-eight.png)

Here, you specify the number of hidden neurons your network should use. The number of hidden neurons you use is based on your dataset's type. As you increase the number of hidden neurons, the accuracy increases. When the number of these hidden neurons is so high, the models learn more parameters than required, leading to the inaccuracy of the network.

The default value of these hidden neurons is `10`. We can change this value to our prefered value for accuracy purposes. Click `next`. It opens the training interface shown below:

![Train network](/engineering-education/forecasting-time-series-data-in-matlab/image-nine.png)

When you click on the `train`, the training begins. The training stops once the generalization or validation stops improving. At this point, the neural network is assumed to have completed learning.

If we train our network multiple times, you obtain different results. It is because of different initial conditions and sampling.

Once the training is done, the window shown below opens:

![Training output](/engineering-education/forecasting-time-series-data-in-matlab/image-ten.png)

This window shows the algorithm, training progress, and output plots. These outputs are the performance, training state, error histogram and error matrix. For example, this network uses 23 iterations. The performance is 0.227. It is low performance. We never set our neural network properly because the sample data was not large. When the dataset is very small, the training performance is likely poor.

You can visualize the plot of the training process. For example, if you want to visualize the plot for the performance, you click on the performance, and you will get the plots as shown below:

![Performnace plot](/engineering-education/forecasting-time-series-data-in-matlab/image-eleven.png)

Also, if you want to visualize the confusion matrix, you click on the `confusion` which is shown below:

![Confusion matrix](/engineering-education/forecasting-time-series-data-in-matlab/image-twelve.png)

When you go back to the training window, we get this window to be very different. This new window allows you to retrain your data, import large datasets, or adjust network size. These are options that are done in case the training result is not as good as expected.

Click `next` to deploy the solutions. These are the Matlab code and the Simulink model for the neural network we have created. The interface is shown below:

![Deployed solutions](/engineering-education/forecasting-time-series-data-in-matlab/image-thirteen.png)

When you select the `Matlab function`, a code is generated for the neural model that we have created. The Simulink model for deploying our model is also shown below:

![Simulink model](/engineering-education/forecasting-time-series-data-in-matlab/image-fourteen.png)

Also, we can get the diagram for our neural network.

![Neural network diagram](/engineering-education/forecasting-time-series-data-in-matlab/image-fifteen.png)

Since we are creating a neural network, we can save this network. We can use this network in any dataset that you train for prediction. This network is saved as a Matlab script. We can use this network in future.

Click `next` to save your network in the deploy solution window. It opens the interface below:

![Save results](/engineering-education/forecasting-time-series-data-in-matlab/image-sixteen.png)

We can save your network as a simple or advanced script. The advanced script has additional options that help you improve your neural network. Also, the saving options are shown here. We can choose whichever options we prefer.

> Note that you must first generate the Matlab code or the Simulink model before saving your network.
Once this is done, we click the `finish` button to complete this whole process.

That is how easy it is to use this neural network toolbox in Matlab. The advantage of this tool is that the interface is user friendly.

### Conclusion
Using the neural network toolbox is very easy. It has an interface that even beginners can use. To use this toolbox, you need an advanced understanding of your dataset. Apart from that, understanding the machine learning concept is very important. However, it will make it possible to attain better performance. Also, to use this toolbox, you don't need to understand the generated script. We only need to ensure that the output results attained by our network are good and then generate the script.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
