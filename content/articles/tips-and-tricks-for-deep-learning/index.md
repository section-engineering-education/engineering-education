---
layout: engineering-education
status: publish
published: true
url: /tips-and-tricks-for-deep-learning/
title: Tips and Tricks for Deep Learning
description: This article will explore various tips and tricks that may be useful when training deep learning models. We tweak deep learning models to improve them with more training and to improve the accuracy of results.
author: willies-ogola
date: 2020-11-26T00:00:00-20:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/tips-and-tricks-for-deep-learning/hero.jpg
    alt: tips and tricks for deep learning image example
---
This article assumes a basic understanding of Machine Learning (ML) and Deep Learning (DL). For an introduction to ML and DL, feel free to check out my previous [article](/differences-between-artificial-intelligence-machine-learning-and-deep-learning/).
<!--more-->

### Table of contents
1. [Prerequisites](#prerequisites)

2. [Introduction](#introduction)

3. [Data Processing](#data-processing)

4. [Parameter Tuning](#parameter-tuning)

5. [Regularization](#regularization)

6. [Good Practices](#good-practices)

7. [References](#references)

### Prerequisites
A comprehensive understanding of [Deep Learning (DL)](/introduction-to-deep-learning/) is essential before reading this article, as most of the concepts and techniques you'll encounter are advanced. If you're still new to neural networks and DL, please read my previous [article](https://www.section.io/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/). It will be a good place to start to understand the basics of DL. 

### Introduction
What's the use in tweaking our Deep Learning (DL) models?

We tweak DL models to allow them to improve with more training and to improve the accuracy of results. This process makes them perform well with new unseen data. 

This article will explore various tips and tricks that may be useful when training deep learning models.

Let's get started.

### Data processing
#### Data augmentation
This technique was first introduced in 2012 by the author of [AlexNet](https://papers.nips.cc/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf/), Alex Krizhevsky. Data augmentation is used when the training data is not sufficient enough to learn from for a more generalizable model. This technique can be achieved by slightly altering the original image in various ways. 

Let's take a look at pictorial examples of how the original image is altered.

##### Original image
![An original image of a dog](/engineering-education/tips-and-tricks-for-deep-learning/original-image.jpg)<br>

This image represents the original image, that has not been altered in any way.

##### Rotated image
![Rotated Image](/engineering-education/tips-and-tricks-for-deep-learning/rotate-image.jpg)<br>

This image is slightly rotated to the right.

##### Flipped image
![Flipped Image](/engineering-education/tips-and-tricks-for-deep-learning/flip-image.jpg)<br>

##### Cropped image 
![Cropped Image](/engineering-education/tips-and-tricks-for-deep-learning/cropped-image.jpg)<br>

This image is cropped. The focus has been put on one side of the image. 

##### Noisy image
![Noisy Image](/engineering-education/tips-and-tricks-for-deep-learning/noisy-image.jpg)<br>

This image is the version of the original image with added noise. 

##### Color shifted image
![Color shifted Image](/engineering-education/tips-and-tricks-for-deep-learning/color-shifted-image.jpg)<br>

##### Contrast changed image
![Contrast changed Image](/engineering-education/tips-and-tricks-for-deep-learning/contrast-changed-image.jpg)<br>

If done correctly, data augmentation can be a very powerful tool. It forces the neural network to focus more on an image's attributes instead of the image themselves. This also increases the data needed for training.

#### Batch normalization (Batch norm)
Batch normalization is also known as batch norm. This is a technique used in deep learning to stabilize models and speed up learning.  

Before we dive into how batch normalization works, let's first briefly discuss the working of a typical normalization technique. This discussion will help us better understand why we use batch normalization.

Normalization is a pre-processing step on input data that helps us put data on a standard scale. This process is an important step as there might be variations in input data. Some input data might have higher values while some, very low values. Let's consider an example to demonstrate non-normalized data. 

Consider a scenario where data related to two car drivers exists. One of them, aged 50, has driven 10,000 kilometers while another, aged 25, has driven 1,000 kilometers (km). The distance and age data from these two drivers vary widely and thus might not fit on the same scale. 

Using such imbalanced data as inputs to our neural network can cause four major issues:
1. An unstable neural network. 
2. An imbalanced gradient that leads to the exploding gradient problem. A problem that results during the training process in a deep neural network where large error gradients compound, causing the weight updates to be very large. This problem results in the model becoming unstable and unable to learn any meaningful information from the training data. Read more about it [here](https://deepai.org/machine-learning-glossary-and-terms/exploding-gradient-problem/).
3. It makes the network very difficult to train. 
4. It decreases the training speed.      

To avoid the problems mentioned above, we normalize their ages and distance inputs to fit the same scale. From our example, we can scale down our two input data to a scale of between 0 to 1. Normalization reduces the wide ranges between the data points. However, normalization only solves part of the problem.

In my previous [article](/basics-of-convolution-neural-networks/), I discussed how training is achieved by updating the weights of the neural network iteratively through a process known as backpropagation. But, there is a problem that occurs during training. 

As the distribution of each layer's input keeps changing, the previous layers' parameters also change simultaneously. The inputs to each hidden layer should have a minimal to no change as the neural network trains, but it keeps changing as training happens. 

This ends up slowing down the training process as there is a need to use lower learning rates so that the neural network can learn. Also, it makes it harder to train models as a careful initialization of the parameters is needed. This phenomenon is known as the [Internal Covariate Shift](https://machinelearning.wtf/terms/internal-covariate-shift/). 

Batch norm normalizes the information being passed between hidden layers to mitigate the internal covariate shift problem. This means that when information is passed from one hidden layer to another, the mean and standard deviation are calculated for every training mini-batch. This then helps us obtain a normalized output on each batch using the formula:

![Batch Normalization formula](/engineering-education/tips-and-tricks-for-deep-learning/batch-normalization.PNG)<br>

*[Image Source: StanFord](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-deep-learning-tips-and-tricks)*

We can simplify the formula into two steps:
1. The first step subtracts the batch mean from every output value, dividing the result by the standard deviation. 
2. The second step involves using the result obtained from the first step, multiplying it by the gamma hyperparameter, and adding it to the beta hyperparameter. 

As a result, batch normalization allows the use of higher learning rates, increasing the training speed. It also eliminates the worry of initializing the parameters.

### Parameter tuning
#### Weight initialization
The initial weight initialization of a neural network can affect how fast the model converges, how good the converged point is, and if the model converges at all.

So, how do we choose the initial weight values?

We could initialize all weights to zero. But is this a good idea?

No. If we initialize all the parameters to the same value, we will get the same updates during training. This results in the model learning the same features. That's not something we'd want in our model. Each neuron needs to learn something different to be useful.

We could initialize the weights randomly. 

Will this work? Yes, it usually works just fine, but it doesn't guarantee absolute asymmetry.

There are two commonly used ways in which we could initialize the weights of our neural network. These include the use of Transfer Learning and the Xavier Initializer. 

Let's discuss these two.

##### Transfer learning
[Transfer learning](/basics-of-transfer-learning/) is a deep learning technique whereby a model is developed for one task but then re-used as a starting point for a separate task. This technique helps leverage the pre-trained weight of that model in our new model. Besides, transfer learning saves a lot of time as training a deep learning model from scratch requires a lot of training data and computing power. 

We can use this technique in various ways, depending on the amount of data one has. These include leveraging transfer learning with small, medium, and large training sizes. 

Let's take a look at pictorial examples of how this is done.

![Transfer Learning with a small training size](/engineering-education/tips-and-tricks-for-deep-learning/small-tl.PNG)<br>

*[Image Source: StanFord](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-deep-learning-tips-and-tricks)* 

Here, all layers in the neural network with pre-trained weights are frozen. It's only the softmax layer whose weights can be trained on. This is ideal if you have a small training size.

![Transfer Learning with a medium training size](/engineering-education/tips-and-tricks-for-deep-learning/medium-tl.PNG)<br>

*[Image Source: StanFord](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-deep-learning-tips-and-tricks)*

If you have a medium training size, perform transfer learning on a neural network where most of the layers with the pre-trained weights, excluding the last layer and the softmax layer, have been frozen as shown above. This gives you a little more room to train your data on. 

![Transfer Learning with a large training size](/engineering-education/tips-and-tricks-for-deep-learning/large-tl.PNG)<br>

*[Image Source: StanFord](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-deep-learning-tips-and-tricks)*

In cases where you have a large training data, you can leverage training weights on almost all the layers and softmax layer while initializing your weights on the pre-trained data. 

Transfer Learning works well in two fields of Artificial Intelligence:
1. Computer Vision
2. Natural Language Processing (NLP)

##### Xavier initialization
Xavier initialization is also known as the Glorot Initialization. It's a weight initialization technique that attempts to better the initialization of weights in a deep neural network. It helps avoid neuron activation functions, starting in very "saturated" or "dead regions." It describes those regions whose weights don't facilitate the neural network to converge. 

This technique initializes the weights by making sure the variances of the activations across every layer are matching. These matching variances help prevent the gradient from vanishing and exploding. It also assumes that all the bias parameters are set to zero and that all inputs and weights are centered at the zero value.

There are three points worth noting about this technique:

1. The initialized weights at the start shouldn't be set too small. The signal will propagate within the neural network, shrinking as it passes through the layers. The signal will be too tiny to be of any importance.
2. On the contrary, the weights at the beginning shouldn't set too large. These signals will propagate within the neural network making our output signal too large.
3. The initialized weight should be set right in the middle. Not too large and too small. Once this is accomplished, it helps prevent the neural network from experiencing both the vanishing and exploding gradient problem.  

Xavier initialization is the default initialization in some frameworks. It's an excellent choice for both the sigmoid and hyperbolic tangent (tanh) activation functions. Regarding the popular [ReLU function](https://machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/), [He initialization](https://www.machinecurve.com/index.php/2019/09/16/he-xavier-initialization-activation-functions-choose-wisely/) is preferred as it performs poorly with Xavier initialization.

#### Optimizing convergence
Optimization involves finding a set of parameters that minimize or maximize a function. 

##### Learning rate
Learning rate is commonly denoted with the alpha hyperparameter. It can be described as the rate at which the weights in a neural network get updated.

##### Adaptive learning rates
By allowing the learning rate to vary during training, the training time tends to reduce and improves the results. Several methods set a different learning rate for each trainable parameter and adaptively adjust the learning rates. 

They include:  

- Momentum

Momentum is a method that helps accelerate the Stochastic Gradient Descent (SDG) algorithm.

- AdaGrad

AdaGrad decreases the learning rates for faster parameters with a large gradient component and slower for those parameters with a slower gradient.

- RMSProp

RMSProp uses a moving average of the gradients to make the optimization more suitable for optimizing the non-convex cost function.

- Adam

The term Adam is not an acronym for ADAM. It stands for Adaptive Moment Estimation. Adam is the most popular optimizer in deep learning models today. It tends to combine the best parts of RMSProp and Momentum optimizers.

The figure below shows a comparison (in regards to convergence) of the different adaptive learning rate algorithms on the MNIST neural network.

![A comparison of convergence of the different algorithms](/engineering-education/tips-and-tricks-for-deep-learning/convergence.PNG)<br>

*[Image Source: ResearchGate](https://www.researchgate.net/figure/Comparison-of-different-optimizer-by-training-of-multilayer-neural-networks-on-MNIST_fig1_324808725/)*

From the figure above, it's evident that the Adam Optimizer outperforms and convergence faster when compared to the other algorithms.

### Regularization
Regularization is a technique in deep learning that often helps prevent overfitting and reduce variance in our network. Dropout and Early stopping are the two main regularization techniques used in deep learning models. 

Let's discuss each of them.

#### Dropout
Dropout is a technique used in deep learning to prevent neural networks from overfitting, which is a common problem in deep learning where models cannot generalize their performance on unseen data. 

The fundamental idea behind dropout is to drop units together with their connections during training temporarily. This technique forces the neural network to not rely heavily on specific sets of features.

![Dropout](/engineering-education/tips-and-tricks-for-deep-learning/dropout.PNG)<br>

*[Image Source: StanFord](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-deep-learning-tips-and-tricks)*

We can see that the neural units that are colored grey and their connections have been dropped out from the image. It forces the neural network to find new sets of features to connect with. 

Besides preventing overfitting, the dropout technique improves the performance of the network. 

The image below shows features learned on the MNIST database before and after a dropout value of 50% is applied.

![Before and after dropout](/engineering-education/tips-and-tricks-for-deep-learning/before-after-dropout.PNG)<br>

*[Image Source: Journal of Machine Learning Research](https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf)*

#### Early stopping
It's a regularization technique whereby training is stopped as soon as the validation's error increases. It keeps you from training too far.

It helps prevent overfitting in neural networks. Early stopping happens when the neural network is trained to a certain point where it starts to memorize the training data rather than generalize it. 

![Early stopping](/engineering-education/tips-and-tricks-for-deep-learning/early-stopping.PNG)<br>

*[Image Source: StanFord](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-deep-learning-tips-and-tricks)*

### Good practices
1. As far as optimizers are concerned, RMSProp and Adam are the two algorithms that have been found to work well across a wide range of deep learning architectures.
2. Dropouts of 20-50% are recommended in practice. A minimum of 20% and a maximum of 50%.
3. It's recommended to not interfere with the first layers, especially in pre-trained models. These initial layers capture generalized features. These include shapes and curves, which are general across most domains. 

### Wrapping up
That's all there is for this article. I hope the mentioned techniques help you improve your models in your Deep Learning (DL) projects.  

### References
1. [Dropout:  A Simple Way to Prevent Neural Networks from Overfitting](https://jmlr.org/papers/volume15/srivastava14a/srivastava14a.pdf)
2. [Keras](https://keras.io/)
3. [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/pdf/1502.03167.pdf/) 
4. [On weight initialization in deep neural networks](https://arxiv.org/pdf/1704.08863.pdf/) 
5. [An improvement of the convergence proof of the ADAM-Optimizer](https://www.researchgate.net/figure/Comparison-of-different-optimizer-by-training-of-multilayer-neural-networks-on-MNIST_fig1_324808725/)
6. [Differences between Artificial Intelligence, Machine Learning, and Deep Learning](https://www.section.io/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/) 
7. [Hero image](https://unsplash.com/photos/-rF4kuvgHhU?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

 


