---
layout: engineering-education
status: publish
published: true
url: /logistic-regression-for-digits-recognition-pytorch/
title: Using Logistic Regression in PyTorch to Identify Handwritten Digits
description: In this article we will covers the various properties of logistic regression and its Python implementation in PyTorch to Identify Handwritten Digits.
author: masese-gavin
date: 2022-02-08T00:00:00-07:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/logistic-regression-for-digits-recognition-pytorch/hero.jpg
   alt: Logistic Regression in PyTorch example image
---
Logistic regression is a widely used statistical method for predicting a binary outcome from a set of independent variables. This [article](https://www.geeksforgeeks.org/understanding-logistic-regression/) covers the various properties of logistic regression and its Python implementation.
<!--more-->
### Introduction
First, we will look at implementing this in PyTorch. Then, we will use Logistic Regression to classify handwritten digits from the MNIST dataset.

### Prerequisites
1. Install [PyTorch](https://pytorch.org/) into your Python environment.
2. Python programming concepts

### Table of contents
- [Library functions and objects](#library-functions-and-objects)
- [Defining our hyperparameters](#defining-our-hyperparameters)
- [Building The Neural Network](#building-the-neural-network)
- [Extra information](#extra-information)
- [Conclusion](#conclusion)
- [References](#references)

### Library functions and objects
Import library functions and objects into your code to get the required functionality to implement neural networks. Here are the functions and objects we import:

- The **torch.nn** module: Contains code that we will be using in our model.
- The **torchvision.datasets**: Includes MNIST dataset of handwritten digits that we shall be using here.
- The **torchvision.transforms**: We shall be using it to transform from images to PyTorch tensors.
- The **torch.autograd**: Allows for the rapid and straightforward computation of multiple partial derivatives. 

Type the code below to import the library functions and objects:
```Python
import torch
import torch.nn as tn
import torch.nn.functional as tF
import torch.optim as optim
import torchvision.datasets as dsets
import torchvision.transforms as transforms
from torch.autograd import Variable

```

After importing, we download and load the dataset to memory. This will be done in the following code:

```Python
# MNIST Dataset 
train_dataset = dsets.MNIST(root ='./data',train = True, download = True)

test_dataset = dsets.MNIST(root ='./data', train = False, transform = transforms.ToTensor())

# Dataset Loader 
train_loader = torch.utils.data.DataLoader(dataset = train_dataset, shuffle = True)

test_loader = torch.utils.data.DataLoader(dataset = test_dataset,shuffle = False)
```

### Defining our hyperparameters
Let us define our hyperparameters:
```Python
input_size = 784
num_classes = 10
num_epochs = 5
batch_size = 100
learning_rate = 0.001

```

The image size we will use for our image will be 28*28. This means that our input size will be 784. In addition, there are ten digits in this. Thus we can generate ten alternative results. 

This way, `number_classes` will be set to ten. In addition, we'll run the full dataset through five iterations of training. Then we will train in small batches of 100 images each so that the software does not crash because of memory overflow. After that, we'll lay out our model in the following manner. 

In this section, we'll define the forward pass after setting up our model as a subclass of __torch.nn.Module__. As we are building the code, we do not need to mention softmax in the __forward()__ function. It will be determined internally during each forward run.

```Python
class LogisticRegression(tn.Module):
    def __init__(self, input_size, num_classes):
        super(LogisticRegression, self).__init__()
        self.linear = tn.Linear(input_size, num_classes)

    def forward(self, x):
        out = self.linear(x)
        return out
```

Now that our class has been established, we can create an instance.

```python3
model = LogisticRegression(input_size, num_classes)
```

### Building the neural network
Our loss function and optimizer are now set. As specified in the hyperparameters above, we'll use the [cross-entropy loss](https://en.wikipedia.org/wiki/Cross_entropy) and the [stochastic gradient descent algorithm](https://en.wikipedia.org/wiki/Stochastic_gradient_descent) for the optimizer.

Let's build a new class for the network we're developing.

```Python
# create a new class for the network
class NeuralNetwork(tn.Module):
# constructing our network with two-dimensional convolutional layers, followed by two fully-connected layers
   def __init__(self):
      super(NeuralNetwork, self).__init__()
      self.c1 = tn.Conv2d(1, 10, kernel_size=5)
      self.c2 = tn.Conv2d(10, 20, kernel_size=5)
      self.c2_drop = tn.Dropout2d()
      self.fch1 = tn.Linear(320, 50)
      self.fch2 = tn.Linear(50, 10)

   def forward(self, b):
      b = tF.relu(tF.max_pool2d(self.c1(b), 2))
      b = tF.relu(tF.max_pool2d(self.c2_drop(self.c2(b)), 2))
      b = b.view(-1, 320)
      b = tF.relu(self.fch1(b))
      b = tF.dropout(b, trai=self.training)
      b = self.fch2(b)
      return tF.log_softmax(b)
```

To get the network and the optimizer up and running:

```python
criterion = tn.CrossEntropyLoss()
network = NeuralNetwork()
opti = torch.optim.SGD(newmodel.parameters(), lr = reading_rate)
```

We're ready to begin training now. Resetting all gradients to 0 will be the first step here, followed by a forward pass, the loss calculation, backpropagation, and updating weights. 

Dataloader will load the individual batches. We set the gradients to zero using `optimizer.zero_grad().` The `backward()` call will now collect a new set of gradients which we propagate back into each of the network’s parameters using the `optimizer.step()`.

```python
# Training the Model
for epoch in range(num_epochs):
    for i, (images, labels) in enumerate(train_loader):
        images = Variable(images.view(-1, 28 * 28))
        labels = Variable(labels)

        optimizer.zero_grad()
        outputs = model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

        if (i + 1) % 100 == 0:
            print('Epoch: [% d/% d], Step: [% d/% d], Loss: %.4f'% (epoch + 1, num_epochs, i + 1, len(train_dataset) // batch_size, loss.data))
```

Now we'll run the model through its paces using the code below.

```Python
correct = 0
total = 0
for images, labels in test_loader:
    images = Variable(images.view(-1, 28 * 28))
    outputs = model(images)
    _, predicted = torch.max(outputs.data, 1)
    total += labels.size(0)
    correct += (predicted == labels).sum()

print('Accuracy of the model on the 10000 test images: % d %%' % (
            100 * correct / total))
```

To put it another way, I got 91 percent by following the steps, which is significantly lower than the current best model, which also uses a different type of neural network architecture.

You can run the whole code [here](https://colab.research.google.com/drive/1eL6a4_QxAZxqLV83vJOsLkPF09hYwThn?usp=sharing)

### Extra information 
Recognizing and classifying human handwritten numbers from various media (such as photographs, documents, and touch displays) is known as handwritten digit recognition (0-9). In deep learning, this has been a constant focus of investigation.

Deep Learning/CNN, SVM, and Gaussian Naive Bayes are just a few algorithms recognizing handwritten digits.

Logistic regression is used in statistical software to estimate probabilities to better understand the relationship between a dependent variable and one or more independent variables. For example, this type of analysis can predict the likelihood of an event occurring or a decision being made.

### Conclusion
With the help of Logistic Regression and PyTorch, we learned how the MNIST handwritten digits are identified.

In the data folder, the MNIST dataset is initially downloaded. The hyperparameters are then set up, loaded into the environment, and built into a neural network. The logistic regression model can then be defined and used. The MNIST dataset is used here to train and test the model.

Happy coding!

### References 
1. [To run the code, click here](https://colab.research.google.com/drive/1eL6a4_QxAZxqLV83vJOsLkPF09hYwThn?usp=sharing)
2. [PyTorch](https://pytorch.org/)
3. [Linear Regression](https://machinelearningmastery.com/linear-regression-for-machine-learning/)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

