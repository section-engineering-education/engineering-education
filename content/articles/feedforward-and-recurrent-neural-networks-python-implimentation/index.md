It is possible to create a computational learning system that uses a neural network to understand and translate data inputs in one form into desired outputs in another, and this is called a neural network learning algorithm or neural network. A computer's ability to learn and improve over time is enhanced by its ability to recognize hidden patterns and correlations in raw data.

This post will go into great detail about feed-forward and recurrent neural networks.

### Prerequisites
- Have a basic knowledge of [Python](https://www.python.org/).
- Have python environment of your choice installed.

### Table of contents
- [Importance of neural networks ](#importance-of-neural-networks)
- [Feed-forward neural network](#feed-forward-neural-network)
- [Feed-forward neural network implimentation](#feed-forward-neural-network-implimentation)
- [Applications of Feed-forward neural network](#applications-of-feed-forward-neural-network)
- [Recurrent neural network](#recurrent-neural-network)
- [Recurrent neural network gradient problems ](#recurrent-neural-network-gradient-problems )  
- [RNN implementation](#rnn-implementation)
- [Difference between RNN and Feed-forward neural network](#difference-between-rnn-and-feed-forward-neural-network)
- [Conclusion](#conclusion)
- [Reference](#reference)
### Importance of neural networks 
1. Rather than relying on a database, neural netwworks store data on the network as a whole, as is the case with traditional programming. Even if a few bits of data are lost, the network as a whole continues to operate normally.
2. These networks have a lot of computational power, so they can handle multiple tasks at once.
3. A network gradually degrades and slows down over time. However, the network is not immediately harmed.
4. Corruption of one or more artificial neural network cells has no effect on the output. As a result, networks are better able to deal with errors.
5. They are able to work with limited information.

### Feed-forward neural network
A Feed-Forward Neural Network (FFN) is a single-layer perceptron in its most fundamental form. In this model, the weight values are multiplied by a series of inputs. Finally, the weighted input values are multiplied together to arrive at a final output. Once a predetermined threshold, which is commonly set to 0, has been crossed, one of two numbers is returned: one for exceeding the threshold, and one for failing to do so.

### Feed-forward neural network implimentation
A feed-forward neural network will be represented in Python.

#### Step one: Importing libraries

```python 
import numpy as num
from sklearn import datasets
```

#### Step Two: Creating sample weights
The input hidden layer will use these samples.

```python
num.random.seed(0)
X, y = datasets.make_moons(200, noise=0.20)

inputlayer_dimensionality = 4 
outputlayer_dimensionality = 3 
hiddenlayer_dimensionality = 6 
```

#### Step Three: Including weights 
In the first hidden layer, weights will be used to calculate the weighted sum that arrives at the neurons.

```python
a1 = num.random.randn(inputlayer_dimensionality, hiddenlayer_dimensionality)
c1 = num.zeros((1, hiddenlayer_dimensionality))

a2= num.random.randn(hiddenlayer_dimensionality, hiddenlayer_dimensionality)
c2 = num.zeros((1, hiddenlayer_dimensionality))

a3= num.random.randn(hiddenlayer_dimensionality, outputlayer_dimensionality)
c3 = num.zeros((1, outputlayer_dimensionality))
```

#### Step four: Foward propagation of the input signal 
To reach the output layer, the propagation will take place over several layers.

```python
d1 = X.dot(a1) + c1
q1 = num.tanh(z1)

d2 = q1.dot(a2) + c2
q2 = num.tanh(z2)

d3 = q2.dot(a3) + c3

probs = num.exp(d3) / num.sum(num.exp(d3), axis=1, keepdims=True)
```

A linear neural network is one that does not have any activation functions in any of its layers. Non-linear neural networks are those that have action functions such as the relu, sigmoid, or tanh in any of their layers, or even in multiple layers.

In most cases, joining two different curves results in a more complicated shape. In addition to introducing hyper-curves like hyperplanes and non-linear objects, these activation functions introduce non-linearity at every layer. When we apply nonlinear functions to nonlinear objects, we're creating a nonlinear entity out of a nonlinear object.

A single linear regression model can simply replace a neural network in the absence of an activating function.

$y = ax + d$

$Q= ky + t $

$=k(ax+d) + t $

$=kax + kd + t$

$ =(ka)x + (kc+t)$

### Applications of Feed-forward neural network
1. An illustrious network of genetic regulation and feedforward has been found to be a feedforward system for the detection of non-temporary atmospheric modifications.
2. In the field of automation and machine management, feedforward control may be a discipline.
3. Derivative parallel feedforward compensation can be used to transform an open-loop transfer system into one that operates at its minimum.

### Recurrent neural network
One of the most frequent types of artificial neural networks, it is called a recurrent neural network. As a tool for automatic voice recognition and machine translation (RNN). It is possible to forecast the most likely future situation utilizing patterns in sequential data by employing recurrent neural networks.
### Recurrent neural network gradient problems 
Recurrent neural networks, as strong as they are, are vulnerable to gradient-related training issues. The $n$ derivatives of a network with $n$ hidden layers will be multiplied together. When these derivatives are significant, the gradient increases exponentially as it propagates backwards until it bursts. This is known as the `exploding gradient` problem. A problem known as the `vanishing gradient` problem occurs when the gradient propagates yet the derivatives are so small that the gradient finally vanishes.

We will minimise the issues in the following ways:

- We will simply limit the amount of the gradients when training the model to prevent them from exploding. Gradient Clipping is a term for this.
- We will prevent the weights from shrinking to zero by setting their initial values to identity matrices and zero for their biases. Weight initialization is the technical term for this procedure.

### RNN implementation
We will use this [dataset](hhttps://raw.githubusercontent.com/jbrownlee/Datasets/master/monthly-sunspots.csv) to train a simple RNN.

#### Importing libraries

```python
import numpy as num# Contains a variety of mathematical functions, including random number generators, linear algebra procedures, Fourier transforms, and more.
from keras.models import SequentialW# A simple stack of layers with only one input and one output tensor can be modelled using the equential model.
from keras.layers import Dense, SimpleRNN#  does operations on the input and return the output.
from sklearn.preprocessing import MinMaxScaler#Scale each feature to a specific range to transform it.
import matplotlib.pyplot as mpl#A collection of Matplotlib's most useful functions.
from sklearn.metrics import mean_squared_error#Mean squared error regression loss.
import math#Mathematical functions must be applied to any functions that you employ.
from pandas import read_csv#will be used to return a new DataFrame with the data and labels from the csv file.
```
#### Creating a simple RNN and defining weights
Below we create a model that includes a SimpleRNN layer and a Dense layer. Afterwards, they are utilized to learn sequential data.

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

In the above code;
- The SimpleRNN layer creates two hidden units, while the Dense layer creates one dense unit, all of which are returned in the demo model object. Both layers utilize a linear activation function with a 3*1 input shape value.
- My interpretations of the data may differ from yours because we employed a randomized weighting technique in our analysis The most critical component of the process is figuring out how the many elements work together to create the final output.

#### Reshaping Inputs
Here, we reshape the input to the required `sample_size`, `time_steps` and features.

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

In the above code, for three time steps, we provide the network with an input of $x$ and let it generate an output. We then figure out what the hidden units were doing at each of the first three points in time. The zero vector is used to set the value of $d0$. $d3$ and $x3$ are used to calculate $c3$. We don't need an activation function because we're working with linear units.

#### Testing the network
To test the RNN, we'll use a simple time series dataset using the SimpleRNN and Dense layers we learned about earlier.

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

![Plot](/section-engineering/feedforward-and-recurrent-neural-networks-python-implimentation/plot.png)


> The Red Line Separates the training and test examples.

In the above code;
- You can read the data from a URL to get a percentage of the data for the test, and then you can divide that percentage by the percentage of train data. The train and test data are returned as single-dimensional arrays once the data has been scaled.
- We begin by creating rows of non-overlapping time steps for Keras model training. This is done in preparation for training with time series data.
- We create the RNN model and train.
- Afterwards, we calculate the mean square error, which measures how far the actual values deviate from the forecast ones.
- At the end, we view the result.

You can view the whole code [here](https://colab.research.google.com/drive/12qCImoXnP-WesLZXJZzRqZ0FMlsvEjwc?usp=sharing).

### Difference between RNN and Feed-forward neural network
- In contrast to feedforward networks, recurrent neural networks feature a single weight parameter across all layers of the network. Reinforcement learning can still be achieved by adjusting these weights using backpropagation and gradient descent.
- Unlike recurrent neural networks, which continuously feed information from input to output, feedforward neural networks constantly feed data back into the input for further processing and final output.
- Recurrent neural networks contain a feedback loop that allows data to be recycled back into the input before being forwarded again for further processing and final output, whereas feedforward neural networks just forward data from input to output. Data can only flow in one direction in feedforward neural networks. Data from prior levels can't be saved because of this forward traveling pattern, hence there is no internal state or memory. RNN, on the other hand, uses a loop to cycle through the data, allowing it to keep track of both old and new information.

### Conclusion
In this tutorial we learned about both feed forward and recurrent neural networks. We also lerned about their implimentations using python language and in addition, we coverd their difference. 

Happy coding!

### Reference
- [Recurrent Neural Network Algorithms for Deep Learning](https://machinelearningmastery.com/recurrent-neural-network-algorithms-for-deep-learning/).
- [Introduction to Backpropagation Through Time](https://machinelearningmastery.com/gentle-introduction-backpropagation-time/).
- [Feed-forward neural network](https://towardsdatascience.com/deep-learning-feedforward-neural-network-26a6705dbdc7).
