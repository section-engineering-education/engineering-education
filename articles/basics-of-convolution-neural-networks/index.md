### Prerequisites

This article assumes a basic understanding of Machine Learning (ML) and Deep Learning (DL). For an introduction to ML and DL, feel free to check out my previous [article](/https://www.section.io/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/)

### Introduction

Vision is one of the key senses in humans. We rely on vision a lot, from recognizing physical objects to navigating in the real world. It's a huge part of our lives.
The way humans see images isn't the same way computers see them. Computers see images as an array of numbers. As numbers in computers are stored as 8-bit integers, these allow a range of pixel values from 0 to 255 to be displayed. These values correspond to the pixel brightness in the image.

Let's take an example of an image with the number 8 shown below:

![Image as an array](/engineering-education/basics-of-convolution-neural-networks/image-as-array.PNG)<br>

*[Image Source: The MNIST Database](http://yann.lecun.com/exdb/mnist/)*

In computer science, a pixel value of 0 represents black (dull) while 255, white (bright). As seen in the image, the pixels surrounding the image tend to be much brighter (closer to 255) than pixels away from it. This is how a computer sees an image. 

Convolution Neural Networks (CNNs) builds on this idea. 

### Terminologies

1. Parameter

These are placeholders that change during training. Weights and Biases are the two main parameters in CNNs.

2. Hyperparameter

A hyperparameter is also a placeholder, but unlike the parameter, hyperparameters need to set before training starts. The learning rate is one of the important hyperparameters that need to be set before training starts. 

3. Kernel

A kernel is an integral component of the structure of a CNN. It consists of a set of learnable parameters that are applied to the operations of convolutions. 

4. Stride

Stride refers to the number of pixels a convolution filter moves. It can be compared to a sliding window. The image below shows the stride, S moving with a pixel of 2

![Stride, S](/engineering-education/basics-of-convolution-neural-networks/stride.PNG)<br>

*[Image Source: Stanford](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-convolutional-neural-networks)*

### What is Convolution Neural Networks (CNN)?

Convolution Neural Networks (CNN) is a class of deep learning techniques popularly use to solve computer vision tasks.
CNN learns the spatial features of inputs through a process known as backpropagation, as we will see in the image below. Backpropagation can be described as the backward propagation of errors. It is the core algorithm behind how neural networks learn. Learn more about it in this [video](/https://www.youtube.com/watch?v=Ilg3gGewQ5U/).

Let's take a look at the architecture of a CNN.

### Architecture Overview

![Architecture of a CNN together with the training process](/engineering-education/basics-of-convolution-neural-networks/cnn-architecture.PNG)<br>

*[Image Source: CrossMark](https://doi.org/10.1007/s13244-018-0639-9)*

The CNN architecture consists of a stacking of three building blocks:

1. Convolution layers

2. Pooling layers, i.e., max pooling

3. Fully connected (FC) layers

#### Convolution layer

A convolution layer is a key component of the CNN architecture. This layer helps us perform feature extractions on input data. This feature extraction is achieved using both convolution layers (linear operation) and activation functions (non-linear operation). Rectified Linear Unit (ReLU) is one of the most used activation functions in deep learning. 

Let's touch a little bit on it.

##### Rectified Linear Unit (ReLU)

From the image above, we note that a convolution layer is combined with the ReLU layer. The purpose of the ReLU activation function is to introduce non-linearity into the network. Introducing non-linearity is important in deep learning because, in real life, almost all data is non-linear. ReLU returns a 0 value for all negative inputs, while for positive values, it returns that same value back (x).

Mathematically, this is defined by: 

f(x) = max (0, x)

![Rectified Linear Unit](/engineering-education/basics-of-convolution-neural-networks/relu-function.PNG)<br>

*[Image Source: Papers with code](https://paperswithcode.com/method/relu)*

ReLU is the default activation function when working with CNNs, as it tends to have a faster training time. 

Other activation functions used in neural networks include the sigmoid and the hyperbolic tangent. Read more about them [here](/https://en.wikipedia.org/wiki/Activation_function/).

#### Pooling layer

A pooling layer is a form of non-linear downsampling that reduces the dimensionality of the feature maps of an input image, making its representation smaller and more manageable. This process reduces the number of parameters and computation resources in the network.

It is important to note that a 2 x 2 filter size applied with a stride of 2 is the most used in CNN.

##### Max Pooling

**Max pooling** is the most popular among the pooling operations. It extracts patches from the input feature maps, picks the largest value on each patch, and discards the rest.

Below is an example of a max-pooling operation. It consists of a filter size of 2 x 2 that extracts a 2 x 2 patch from the input tensor. It outputs the largest value in each patch. Max-pooling results in the downsampling of the input by a factor of 2.

![Max Pooling](/engineering-education/basics-of-convolution-neural-networks/max-pooling.PNG)

##### Average Pooling

Besides, **average pooling** is another type of pooling operation that's worth mentioning. It performs downsampling by performing an average of all values in a feature map. Thus, picking this averaged value as the new value of the feature space. 

![Average Pooling](/engineering-education/basics-of-convolution-neural-networks/average-pooling.png)

#### Fully Connected layer

The Fully Connected (FC) layer is the last building block in a Convolution Neural Network. 
The output feature maps of the layer before the FC layer are transformed into a one-dimension (1D) array of numbers, i.e., flattened. That layer is connected to one or more fully connected layers. 

The FC layer maps the extracted features from the convolution and pooling layers onto the final output, i.e., classification.

![A fully connected layer with a flattened input](/engineering-education/basics-of-convolution-neural-networks/fully-connected.PNG)<br>

*[Image Source: Stanford](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-convolutional-neural-networks)*

### Applications of Convolution Neural Networks

#### Computer Vision

Image classification is a very common problem in computer vision. The goal in image classification is to learn features directly from image data. These learned features are then used for classification. For instance, feeding an image of a cat as our input, the network should classify the image as a cat. 

Recently, CNN has been used for image captioning. Here, the goal is to generate a sentence that describes the semantic content in an image. It is achieved by combining CNN with a [Recurrent Neural Network](/https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks/)(RNN). In the last layer in the CNN architecture, instead of a fully connected (FC) layer, the last layer of the CNN is replaced with an RNN.   

#### Natural Language Processing (NLP)

Traditionally, CNNs have only been applied in solving Computer Vision problems. This has changed over the years. CNN's are now being applied to solve NLP problems such as speech recognition and text classification. 
The rapid development of speech recognition systems has been on the increase over the years. Apple's Siri and Amazon's Alexa are a few examples of such systems available today.
As for text classification, texts are first converted into vectors. These vectors are then passed as inputs to the CNN. In a forward propagating manner, these vectors pass through the convolution and pooling layer to extract features and reduce dimensions.
Finally, the fully connected (FC) layer and activation function on the output classify texts into different text categories.

#### Medical & Healthcare

In radiology, CNN is used to classify whether the computed tomography (CT) scans of lung nodules are benign or malignant (cancerous).  

![Classification of lung nodules](/engineering-education/basics-of-convolution-neural-networks/benign-malignant.PNG)<br>

*[Image Source: CrossMark](https://doi.org/10.1007/s13244-018-0639-9)*

In medical image analysis, CNN is used in the segmentation of organs. For example, it has been used to segment cancerous tumors in the uterus, as shown below.

![Segmentation of a cancerous uterus tumor](/engineering-education/basics-of-convolution-neural-networks/malignant-tumor.PNG)<br>

*[Image Source: CrossMark](https://doi.org/10.1007/s13244-018-0639-9)*

A CNN that uses a pretty standard architecture is used to identify facial phenotypes' genetic disorders from a picture of a child's face. The identification is shown below. 

![DeepGestalt's network architecture](/engineering-education/basics-of-convolution-neural-networks/deepgestalt.PNG)<br>

*[Image Source: Nature Medicine](https://www.gwern.net/docs/genetics/heritable/2019-gurovich.pdf)*

#### Self Driving Cars

CNN is used in self-driving cars to map raw pixel values from the camera inputs to various steering commands. Using CNN, these cars detect traffic signs, pedestrians, and other cars, enabling them to predict control signals. 
The companies implementing CNNs into their self-driving cars include [Tesla](https://www.tesla.com/) and [Waymo](https://waymo.com/).

### Wrapping Up

To wrap up what we've covered in this article, we've introduced how computers see images as an array of numbers. We've also discussed the three building blocks of convolution neural networks; convolution layers, pooling layers, and fully connected (FC) layers. Finally, we've gone in-depth on the applications of CNNs. This article only scratches the surface on CNN's basics that one needs to know before diving deeper into the field. 
You can learn more advanced concepts of CNN [here](https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-convolutional-neural-networks/)

### References
1. Yamashita, R., Nishio, M., Do, R. K. G., & Togashi, K. (2018). Convolutional neural networks: an overview and application in radiology. Insights into Imaging, 9(4), 611-629.
2. [Applications of Convolution Neural Networks](/https://ijcsit.com/docs/Volume%207/vol7issue5/ijcsit20160705014.pdf/)
3. [Applications of Convolution Neural Network in Natural Language Processing](/https://ieeexplore.ieee.org/document/8666928/)
4. [Identifying facial phenotypes of genetic disorders using deep learning](/https://www.gwern.net/docs/genetics/heritable/2019-gurovich.pdf/)
5. [Recurrent Neural Network](/https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-recurrent-neural-networks/)
6. [Convolution Neural Network](/https://stanford.edu/~shervine/teaching/cs-230/cheatsheet-convolutional-neural-networks/)
7. [Hero](/https://unsplash.com/photos/11KDtiUWRq4/)
