---
layout: engineering-education
status: publish
published: true
url: /feedforward-and-recurrent-neural-networks-python-implementation/
title: Feed-forward and Recurrent Neural Networks Python Implementation
description: In this article we will learn about feed-forward neural network and recurrent neural network using Python.
author: vincent-kimanzi
date: 2022-06-16T00:00:00-12:10
topics: [Machine Learning, Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/feedforward-and-recurrent-neural-networks-python-implementation/hero.png
    alt: Feed-forward and Recurrent Neural Networks Python Implementation Hero Image
---
A computational learning system that understands and translates data inputs in one form into desired outputs is called a `neural network`. It can also be defined as a computer's ability to learn and improve over time by recognizing hidden patterns and correlations from the raw data.
<!--more-->
In this tutorial, we will discuss feed-forward and recurrent neural networks. We'll work our way up to the recurrent neural network starting with the feed-forward neural network. Both networks will be implemented in python, and their differences will be examined. 

### Prerequisites
To follow along the reader should have the following:
- Have a basic knowledge of [Python](https://www.python.org/).
- Have the Python environment of your choice installed.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Neural networks](#neural-networks)
- [Importance of neural networks](#importance-of-neural-networks)
- [Feed-forward neural network](#feed-forward-neural-network)
- [Feed-forward neural network implementation](#feed-forward-neural-network-implementation)
  - [Import libraries](#import-libraries)
  - [Create sample weights](#create-sample-weights)
  - [Include weights](#include-weights)
  - [Forward propagation of the input signal](#forward-propagation-of-the-input-signal)
- [Applications of Feed-forward neural network](#applications-of-feed-forward-neural-network)
- [Recurrent neural network](#recurrent-neural-network)
- [RNN implementation](#rnn-implementation)
  - [Import libraries](#import-libraries-1)
  - [Create a simple RNN and define weights](#create-a-simple-rnn-and-define-weights)
  - [Reshaping inputs](#reshaping-inputs)
  - [Test the network](#test-the-network)
- [Difference between RNN and Feed-forward neural network](#difference-between-rnn-and-feed-forward-neural-network)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Neural networks 
Neural networks mimic the human brain's ability to spot patterns in a dataset. With neural networks, we can teach computers to learn and interpret data in a manner inspired by the human brain.

In this tutorial, we will be discussing:
- Recurrent Neural Networks (RNN)
- Feed-forward neural network (FFN)

### Importance of neural networks 
Complex problems such as pattern recognition and facial recognition are solved with neural networks. Handwriting recognition for check processing, signal processing, data analysis, speech-to-text transcription, and weather forecasting are a few other examples.

You can learn more about them [here](https://mindmajix.com/neural-network-in-artificial-intelligence).

### Feed-forward neural network
A feed-forward neural network (FFN) is a single-layer perceptron in its most fundamental form. Components of this network include the hidden layer, output layer, and input layer. 

![Feed-forward neural network](/engineering-education/feedforward-and-recurrent-neural-networks-python-implementation/feedforward.png)

In the above image, the neural network has input nodes, output nodes, and hidden layers. Due to the absence of connections, information leaving the output node cannot return to the network. As the name of the network suggests, the information goes in only one direction.

- The input layer comprises neurons that receive input.
- The hidden layer contains a large number of neurons that modify the inputs and interact with the output layer.
- The output layer contains the result of the computation.

### Feed-forward neural network implementation
Let's implement a feed-forward neural network in Python.

#### Import libraries
```python 
import numpy as num # Contains a variety of mathematical functions, including random number generators, linear algebra procedures, Fourier transforms, and more
from sklearn import datasets
```

#### Create sample weights
Weights are used to describe the strength of a neural connection. It varies from 0 to 1.

```python
num.random.seed(0)
X, y = datasets.make_moons(200, noise=0.20)# Generating and plotting the dataset 
# nodes
inputlayer_dimensionality = 4 
outputlayer_dimensionality = 3 
hiddenlayer_dimensionality = 6 
```

In the above code:
- We generated and plotted the datasets.
- We defined our neural network architecture, including the three nodes.
- On each node, we gave a different dimension. The dimensions will be used later to calculate the weighted sum of neurons.

#### Include weights
```python
a1 = num.random.randn(inputlayer_dimensionality, hiddenlayer_dimensionality)# weights for layer 1
c1 = num.zeros((1, hiddenlayer_dimensionality))# bias for layer 1

a2= num.random.randn(hiddenlayer_dimensionality, hiddenlayer_dimensionality)# weights for layer 2
c2 = num.zeros((1, hiddenlayer_dimensionality))# bias for layer 2

a3= num.random.randn(hiddenlayer_dimensionality, outputlayer_dimensionality)# weights for layer 3
c3 = num.zeros((1, outputlayer_dimensionality))# bias for layer 3
```

> Note that the weighted sum is the sum of weights, input signal, and bias element.

In the above code:
- All weights provided in the first, second, and third layers are used to calculate the weighted sum of neurons in the first, second, and third hidden layers.
- A softmax function is applied in the last layer. The list of numbers sent to this function is transformed into a probability list whose probabilities are proportional to the numbers in the list.

#### Forward propagation of the input signal 
To reach the output layer, the propagation will occur over several layers which include the first, second and the third hidden layer.

```python
#First hidden layer
d1 = X.dot(a1) + c1
q1 = num.tanh(z1)
#second hidden layer
d2 = q1.dot(a2) + c2
q2 = num.tanh(z2)
#third hidden layer
d3 = q2.dot(a3) + c3

probs = num.exp(d3) / num.sum(num.exp(d3), axis=1, keepdims=True)
```

> How the weighted sum of the input is transformed into an output from a layer of the network is defined by an activation function.

In the above code:
- Forward propagation of activation is calculated based `tanh` function to 6 neurons in the first layer.
- Forward propagation of activation from the first layer is calculated based `tanh` function to 6 neurons in the second layer.
- Forward propagation of activation from the second layer is calculated based `tanh` function to 3 neurons in the output layer.
- Probability is calculated as an output using the softmax function.

### Applications of Feed-forward neural network
- An illustrious network of genetic regulation is a feedforward system to detect non-temporary atmospheric modifications.
- In automation and machine management, feedforward control may be a discipline.
- Derivative parallel feedforward compensation can be used to transform an open-loop transfer system into one that operates at its minimum.

### Recurrent neural network
One of the most frequent types of artificial neural networks is called a recurrent neural network. It is commonly used for automatic voice recognition and machine translation (RNN). It is possible to forecast the most likely future situation utilizing patterns in sequential data by employing recurrent neural networks.

Recurrent neural networks (RNN) make it easier to model sequence data. RNNs, which come from feedforward networks, act in a way that is similar to how human brains do. In other words, recurrent neural networks can predict sequential data in ways that other algorithms can't.

### RNN implementation
As strong as they are, recurrent neural networks are vulnerable to gradient-related training issues. The $n$ derivatives of a network with $n$ hidden layers will be multiplied.

When these derivatives are significant, the gradient increases exponentially as it propagates backward until it bursts. This is known as the `exploding gradient` problem.

A problem known as the `vanishing gradient` problem occurs when the gradient propagates yet the derivatives are so small that the gradient finally vanishes.

We will minimize the issues in the following ways:
- We will limit the number of gradients when training the model to prevent them from exploding. It's called Gradient Clipping.
- We will prevent the weights from shrinking to zero by setting their initial values to identity matrices and zero for their biases. Weight initialization is the technical term for this procedure.

We will use this [dataset](https://raw.githubusercontent.com/jbrownlee/Datasets/master/monthly-sunspots.csv) to train a simple RNN.

#### Import libraries
```python
import numpy as num# contains various mathematical functions, including random number generators, linear algebra procedures, Fourier transforms, and more.
from keras.models import SequentialW# A simple stack of layers with only one input, and one output tensor can be modeled using the sequential model.
from keras.layers import Dense, SimpleRNN#  does operations on the input and return the output.
from sklearn.preprocessing import MinMaxScaler#Scale each feature to a specific range to transform it.
import matplotlib.pyplot as mpl#A collection of Matplotlib's most useful functions.
from sklearn.metrics import mean_squared_error#Mean squared error regression loss.
import math#Mathematical functions must be applied to any functions that you employ.
from pandas import read_csv#will be used to return a new DataFrame with the data and labels from the CSV file.
```

#### Create a simple RNN and define weights
Below we create a model that includes a SimpleRNN layer and a Dense layer. Afterward, they are utilized to learn sequential data.

```python 
def create_RNN(hidden_units, dense_units, input_shape, activation):#Create a recurrent neural network to compute a control policy. 
    ourModel = Sequential()#appropriate for a plain stack of layers where each layer has exactly one input
    ourModel.add(SimpleRNN(hidden_units,input_shape=input_shape,activation=activation[0]))#fully-connected RNN where the output from previous timestep is to be fed to next timestep
    ourModel.add(Dense(units=dense_units, activation=activation[1]))#the regular deeply connected neural network layer.
    ourModel.compile(loss='mean_squared_error', optimizer='adam')#Once the model is created, you can config the model with losses and metrics 
    return ourModel # Returns our model
 
demo_ourModel = create_RNN(2, 1, (3,1), activation=['linear', 'linear'])# used as a builder to create RNN model

x1 = demo_ourModel.get_weights()[0]
x2 = demo_ourModel.get_weights()[1]
a1 = demo_ourModel.get_weights()[2]
x3 = demo_ourModel.get_weights()[3]
a2 = demo_ourModel.get_weights()[4]
 # Displaying weights 
print('x1 = ', x1, ' x2 = ', x2, ' a1 = ', a1, ' x3 =', x3, 'a2 = ', a2) # Returns the weights on screen
```

Output:

```bash
x1 =  [[0.10581112 1.1404327 ]]  x2 =  [[-0.32814407  0.9446277 ]
 [ 0.9446277   0.32814407]]  a1 =  [0. 0.]  x3 = [[-0.5538285]
 [-0.5600237]] a2 =  [0.]
```

In the above code:
- The SimpleRNN layer creates two hidden units, while the Dense layer creates one dense unit, all returned in the demo model object. Both layers utilize a linear activation function with a `3*1` input shape value.
- My interpretations of the data may differ from yours because we employed a randomized weighting technique in our analysis. The most critical component is figuring out how the elements work together to create the final output.

#### Reshaping inputs
We reshape the input to the required `imput_shape,` `time_steps`, and features. In this case, `time_steps` indicates the number of prior time steps to use for forecasting the next value of the time-series data, and `input_shape` defines the parameter. 

> Time-series data is data that is recorded over consistent intervals of time.

```python
x = num.array([1, 2, 3])#  returns an array, or any sequence. 
inputX = num.reshape(x,(1, 3, 1))#Gives a new shape to an array without changing its data.
prediction_ourModel = demo_ourModel.predict(inputX)# Model groups layers into an object with training and inference features

z = 2
d0 = num.zeros(z)
d1 = num.dot(x[0], x1) + d0 + a1
d2 = num.dot(x[1], x1) + num.dot(d1,x2) + a1
d3 = num.dot(x[2], x1) + num.dot(d2,x2) + a1
c3 = num.dot(d3, x3) + a2
# Displaying vectors
print('d1 = ', d1,'d2 = ', d2,'d3 = ', d3)# Prints the values of the given vectors

#Displaying predictions
print("Network Prediction", prediction_ourModel)# displays the Network Prediction
print("Computational Prediction", c3)# displays the Computational Prediction
```

Output:

```bash
d1 =  [[0.10581112 1.14043272]] d2 =  [[1.25418528 2.75504378]] d3 =  [[2.50837057 5.5100876 ]]
Network Prediction [[-4.474987]]
Computational Prediction [[-4.47498683]]
```

In the above code:
- We provided the network with an input of $x$ and let it generate output for three-time steps.
- We then figured out what the hidden units were doing at each of the first three points in time. 
- The zero vector is used to set the value of $d0$. $d3$ and $x3$ are used to calculate $c3$. We don't need an activation function because we work with linear units.

#### Test the network
To test the RNN, we'll use a simple time-series dataset. 

```python
def get_train_test(url, split_percent=0.8):# Quick utility that wraps input validation 
    diff = read_csv(url, usecols=[1], engine='python')#supports optionally iterating or breaking of the file into chunks.
    ourdata = num.array(diff.values.astype('float32'))#  returns an array, or any sequence. 
    ourscaler = MinMaxScaler(feature_range=(0, 1))# Feature transformations are accomplished by scaling each individual feature to a predetermined range. Each feature is scaled and translated separately by this estimator to fit within the specified range.
    ourdata = ourscaler.fit_transform(ourdata).flatten()#transformations are done on individual  data 
    pn = len(data)# returns the number of items in a data
    
    datasplit = int(pn*split_percent)# splits data into the predetermined number
    ourtrain_data = data[range(datasplit)]# training data
    ourtest_data = data[datasplit:]# testing the data
    return ourtrain_data, ourtest_data, ourdata# Returns our test data,trained data and our data

# targets and inputs as Y and X are created here
def get_XY(dat, time_steps):# Return only metrics/values that we will base our predictions 
    inputy = num.arange(time_steps, len(dat), time_steps)#Return evenly spaced values within a given interval
    Y = dat[inputy]#Create and modify a dat repository. 
    inputx = len(Y)# returns the number of items in a data
    X = dat[range(time_steps*inputx)]#Create and modify a dat repository and return evenly spaced values within a given interval
    X = num.reshape(X, (inputx, time_steps, 1)) #Gives a new shape to an array without changing its data.   
    return X, Y # Returns the target Y and inputs X

def create_RNN(hidden_units, dense_units, input_shape, activation):#Create a recurrent neural network to compute a control policy. 
    ourModel = Sequential()#appropriate for a plain stack of layers where each layer has exactly one input
    ourModel.add(SimpleRNN(hidden_units,input_shape=input_shape,activation=activation[0]))#  fully-connected RNN where the output from previous timestep is to be fed to next timestep
    ourModel.add(Dense(units=dense_units, activation=activation[1]))#the regular deeply connected neural network layer.
    ourModel.compile(loss='mean_squared_error', optimizer='adam')#Once the model is created, you can config the model with losses and metrics 
    return ourModel # Returns our model

def print_error(trainY, testY, train_predict, test_predict):    
    # Error of predictions
    train_error = math.sqrt(mean_squared_error(trainY, train_predict))# computes the mean squred root of th mean squred error and trains it
    test_error = math.sqrt(mean_squared_error(testY, test_predict))# computes the mean squred root of th mean squred error and tests it
    # Displaying the Root mean squred error
    print('Train RMSE: %.3f RMSE' % (train_error))# Prints the trained rmse
    print('Test RMSE: %.3f RMSE' %(test_error)) # Prints the tested rmse   

# Displaying a plot of the result
def plot_result(trainY, testY, train_predict, test_predict):# Plots the result
    actualData = num.append(trainY, testY)# adds the items to the end of the list
    predictions = num.append(train_predict, test_predict)# adds trained and test prediction items to the end of the list
    rows = len(actualData)# returns the number of items in a data
    mpl.figure(figsize=(15, 6), dpi=80)# Figure instance supports callbacks through a callbacks attribute 
    mpl.plot(range(rows), actualData)# makes a plot on the actual data
    mpl.plot(range(rows), predictions)# makes a plot on the predicted data
    mpl.axvline(x=len(trainY), color='r')#Add a vertical line across the Axes.
    mpl.legend(['Actual data', 'Predicted data'])#Place a legend on the Axes.
    mpl.xlabel('Observation number ')# adds Parameters on the x axis
    mpl.ylabel('Dataset scaled')# adds Parameters on the y axis
    mpl.title('Actual and Predicted Values.')# adds a title
#dataset usrl 
dataset_url = 'https://raw.githubusercontent.com/jbrownlee/Datasets/master/monthly-sunspots.csv'# this includes a link to the dataset that we will be using
time_steps = 12# rounds in sets of time
train_data, test_data, data = get_train_test(dataset_url)#includes training, fetching and testing our dataset from the url
trainX, trainY = get_XY(train_data, time_steps)#training the inputs and the targets
testX, testY = get_XY(test_data, time_steps)#testing the inputs and the targets

#initializing our Model 
ourModel = create_RNN(hidden_units=3, dense_units=1, input_shape=(time_steps,1), activation=['tanh', 'tanh'])# creatin RNN and its dense layers 
ourModel.fit(trainX, trainY, epochs=20, batch_size=1, verbose=2)#Running 20 epochs and traing the targets and the inputs

# make predictions
tp = ourModel.predict(trainX)# makes a prediction on trainX
ts = ourModel.predict(testX)# makes a prediction on testX
# Display the error
print_error(trainY, testY, tp, ts)# Show error 
#Displays a graph
plot_result(trainY, testY, tp, ts)# Shows a graph result
```

Output:

![Plot](/engineering-education/feedforward-and-recurrent-neural-networks-python-implementation/plot.png)


> The red line separates the training and test examples.

In the above code:
- You read the data from an URL to get a percentage of the data for the test, and then you can divide that percentage by the percentage of train data. The train and test data are returned as single-dimensional arrays once the data has been scaled.
- We begin by creating rows of non-overlapping time steps for Keras model training. This is done in preparation for training with time-series data.
- We create the RNN model and train.
- Afterward, we calculate the mean square error, which measures how far the actual values deviate from the forecasted ones.
- In the end, we plot the result using `plot_result()` method.

You can run the above code [here](https://colab.research.google.com/drive/12qCImoXnP-WesLZXJZzRqZ0FMlsvEjwc?usp=sharing).

### Difference between RNN and Feed-forward neural network
- In contrast to feedforward networks, recurrent neural networks feature a single weight parameter across all network layers. Reinforcement learning can still be achieved by adjusting these weights using backpropagation and gradient descent.
- Unlike recurrent neural networks, which continuously feed information from input to output, feedforward neural networks constantly feed data back into the input for further processing and final output.
- Recurrent neural networks contain a feedback loop that allows data to be recycled back into the input before being forwarded again for further processing and final output. Whereas feedforward neural networks just forward data from input to output. Data can only flow in one direction in feedforward neural networks. Data from prior levels can't be saved because of this forward traveling pattern; hence there is no internal state or memory. RNN, on the other hand, uses a loop for cycling through the data, allowing it to keep track of both old and new information.

### Conclusion
In this tutorial, we learned about both feed-forward and recurrent neural networks. We also learned about their implementations using Python language, and in addition, we covered their difference. 

Find the whole code for this tutorial [here](https://github.com/vincentkims49/NeuralNetworks.git).

Happy coding!

### Reference
- [Recurrent Neural Network Algorithms for Deep Learning](https://machinelearningmastery.com/recurrent-neural-network-algorithms-for-deep-learning/).
- [Introduction to Backpropagation Through Time](https://machinelearningmastery.com/gentle-introduction-backpropagation-time/).
- [Feed-forward neural network](https://towardsdatascience.com/deep-learning-feedforward-neural-network-26a6705dbdc7).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)