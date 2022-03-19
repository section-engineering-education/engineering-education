Neural networks are an algorithmic set of rules for discovering patterns in data. Using a neural network model will help us understand how our brains process information in the same way. The networks are constructed from discrete pieces that resemble neurons and are often called "neurons" or "units." There are a certain number of weighted inputs for each unit. 

In this tutorial, we'll learn how to use Pytorch to create a neural network from beginning to end.

### Prerequisites
To get started, you'll need to have:
- Basic understanding of neural networks.
- Basic understanding of Pytorch.


### Table of Contents
- [Introduction to Pytorch](#introduction-to-pytorch)
- [Creating a neural network](#creating-a-neural-network)
- [Training the neural network](#training-the-neural-network)
- [Conclusion](#conclusion)

Nodes in a neural network may be divided into three types, namely:
- Input nodes - These nodes bring in data from the outside world. The Input nodes do nothing more than transmitting data to the hidden nodes; they do not undertake any computations.
- Hidden nodes - These nodes are the ones that perform computations. They are the ones that are responsible for learning the weights of the connections between the input nodes and the output nodes. 
- Output nodes - These nodes are the ones that are responsible for the final output. They are the ones that are responsible for the final decision.

### Introduction to Pytorch
Pytorch is a [Python](https://pytorch.org/) library that allows us to create neural networks. It is a high-level library that enables us to build neural networks straightforwardly. It is also a prevalent library for deep learning.

#### Install Pytorch
To install Pytorch, we need to install the [Python](https://www.python.org/) library. We can do this by using the command:

```bash
$ pip install torch
```

### Creating a neural network
Pytorch has an `nn` module that contains all the building blocks for neural networks. The `nn` module contains the following submodules:
- `nn.Module` - This is a base class for all the other modules.
- `nn.Linear` - This is a fully connected layer and it takes in a matrix of inputs and outputs a matrix of outputs.
- `nn.Sigmoid` - This is an activation function. It also takes in a matrix of inputs and outputs a matrix of outputs.
- `nn.MSELoss` - This is a loss function. It takes in a matrix of outputs and targets and outputs a scalar.

Let's begin by creating a neural network that takes in a matrix of inputs and outputs a matrix of outputs:
#### Importing the necessary packages
We need to import the `torch` library and other modules from the `torch` library:

```python
import torch.utils.data as data
import torchvision.datasets as datasets
import torchvision.transforms as transforms
```

Let's go through them one by one to see what they do:

```python
import torch
```
This line imports the `torch` library. It is a high-level library that allows us to create neural networks. It is also a popular library for deep learning.

```python
import torch.nn as nn
```

Essentially, this imports the `nn` module from the `torch` library. This module contains all the building blocks for neural networks.

```python
import torch.nn.functional as F
```

This module has the `F` function used to create the activation functions.

```python
import torch.optim as optim
```

This line imports the `optim` module from the `torch` library. This module contains all the optimizers we can use to train our neural networks.

```python
import torch.utils.data as data
```

This module contains all the data loading and preprocessing functions that we can use to load and preprocess our data.

```python
import torchvision.datasets as datasets
```

This module contains all the datasets we can use to train our neural networks.

```python
import torchvision.transforms as transforms
```

This module contains all the transformations we can use to preprocess our data.

#### Create a fully connected neural network
Let's create a fully connected neural network. We will use the `nn.Linear` module to create a fully connected neural network:

```python
#imported modules here

class Net(nn.Module):
    def __init__(self, input_size, num_classes):#input_size will be 784, num_classes will be 10
        super(Net, self).__init__()
        self.fc1 = nn.Linear(input_size, 50)
        self.fc2 = nn.Linear(50, num_classes)
        
    def forward(self, x):
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return x
```
Let's go through the code to see what it does.

```python
class Net(nn.Module):
```

In this line, we are creating a class called `Net`. This class is derived from the `nn.Module` class. This class is the base class for all the other modules.

```python
def __init__(self, input_size, num_classes):
```
The input size will be 784 since the amnesty image is 28x28 pixels. The `num_classes` will be ten since we want to classify the images into ten categories.

```python
self.fc1 = nn.Linear(input_size, 50)
```

This line creates a fully connected layer with an input size of 784 and an output size of 50.

```python
self.fc2 = nn.Linear(50, num_classes)
```

Here, we create a fully connected layer with an input size of 50 and an output size of 10.

```python
super(Net, self).__init__()
```

```python
def forward(self, x):
```

`forward` is the method that is called when we call the `forward` method of the class. It takes in a single parameter, `x`. This parameter is the input to the neural network.

```python
x = F.relu(self.fc1(x))
```

Pytorch has an ` F` module that contains all the activation functions. We use the `F.relu` function to create an activation function in this line. This function takes in a single parameter, `x`. 

```python
x = self.fc2(x)
```

We use the `self.fc2` function to create an output. This function takes in a single parameter, `x`. 

#### Setting up the device
In section, we will be using the GPU to train our neural network. To use the GPU, we need to set the device to `cuda`:

```python
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
```

Here, we have created a `device` object. We have assigned the `device` object to `cuda:0` if the GPU is available. Otherwise, we have set the `device` object to `CPU`.

#### Hyperparameters
Let's create the hyperparameters for our neural network:

```python
input_size = 784
num_classes = 10
batch_size = 64
learning_rate = 0.001
num_epochs = 1
```

The input size will be 784 since the amnesty image is 28x28 pixels. The num_classes will be ten since we want to classify the images into ten categories. We made the batch size 64 since we want to train our neural network on 64 images at a time while the learning rate will be 0.001 and the number of epochs will be 1.

#### Loading the data
Let's load the data. We will be using the `MNIST` dataset from the `torchvision` library, which consists of handwritten digits. We shall also use the `torchvision.transforms` module to preprocess the data and `transforms.ToTensor()` function to convert the data to a tensor:

```python
train_dataset = datasets.MNIST(root='./data', train=True, transform=transforms.ToTensor(), download=True)
train_loader = data.DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
test_dataset = datasets.MNIST(root='./data', train=False, transform=transforms.ToTensor(), download=True)
test_loader = data.DataLoader(test_dataset, batch_size=batch_size, shuffle=True)
```

From the code above, we have created the `MNIST` dataset. From there, we have made the `train_dataset` object that is responsible for loading the training data.

Here, the `train_loader` object is responsible for loading the training data in batches, while the `test_dataset` is used to load the test data.

#### Initializing the weights
Initializing the weights is essential for training a neural network:

```python
net = Net(input_size =input_size, num_classes=num_classes).to(device)
```

#### Loss and optimizer function
We will be using the `nn.CrossEntropyLoss` function to calculate the loss and the `optim.Adam` function to optimize the weights:

```python
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(net.parameters(), lr=learning_rate)
```

From the code above, we have created the `criterion` that will be used to calculate the loss. We have also utilized the `optimizer` that will be used to optimize the weights.

### Training the neural network
So far, we have created a neural network that doesn't know the function that maps inputs to outputs. We'll use 'real data' to teach the network and then tweak the network settings (weight and bias) to improve its intelligence. With this method, we iteratively change the parameters of our model (the weights and biases) to improve its accuracy.

#### Process of Training
Let's see how we can train the neural network:
- First, we need to perform a forward pass through the network.
- Calculate the loss by looking at the network output.
- Perform a backward pass through the network.
- Calculate the loss gradient for the weights and biases.
- Update the weights and biases.

We shall create a for loop that will iterate over the number of epochs. We will iterate over the training data in each iteration while performing a forward pass through the network. We will then calculate the loss and achieve a backward pass through the network. Finally, calculate the loss gradient for the weights biases and update the weights.

#### Checking the accuracy of the model and testing the neural network
Let's test the neural network:

```python
def check_accuracy_of_model(loader, model):
    with torch.no_grad():
        for images, labels in loader:
            images = images.to(device)
            labels = labels.to(device)
            outputs = model(images)
            _, predictions = torch.max(outputs.data, 1)
            num_correct += (predictions == labels).sum()
            num_samples += predictions.size(0)
        acc = float(num_correct) / num_samples
        print('Got {} / {} correct ({:.2f}%)\n'.format(num_correct, num_samples, 100 * acc))
        return acc
check_accuracy_of_model(train_loader, net)
check_accuracy_of_model(test_loader, net)
```

When we run the code above, we will see that the accuracy of the neural network is not very high. We can improve the accuracy of the neural network by tweaking the weights and biases:

#### Output

```bash
Checking accuracy on validation set
Got 45982 / 50000 correct (93.30%)
Checking accuracy on test set
Got 9432 / 10000 correct (93.60%)
```

From the code above, we have created a function that will check the model's accuracy. We have created a for loop that will iterate over the training or test data. We will be using the `torch.no_grad()` function to prevent Pytorch from calculating the gradients and the `torch.max()` function to get the maximum value from the output.

### Conclusion
In this tutorial, we have learned how to create a neural network, train a neural network, and test a neural network. We also know how to use the `torch.nn` library to create a neural network and use the `torch.optim` library to optimize the weights and biases of the neural network.