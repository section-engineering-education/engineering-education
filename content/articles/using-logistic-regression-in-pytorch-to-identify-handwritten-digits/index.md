### Introduction
The odds ratio can be calculated using logistic regression when there are multiple explanatory variables. The approach is quite similar to multiple linear regression, except that the response variable is a binomial. An event's odds ratio is the final result of each variable's influence on the odds ratio.
To predict a binary result, we use the statistical technique of logistic regression. The MNIST dataset contains handwritten digits, therefore we'll use Logistic Regression in PyTorch to figure out which ones they are.
### Prerequisite
1. Install [PyTorch](https://pytorch.org/) into your Python environment.
2. Having some knowledge of the Python programming language is a good idea.
### Table of contents
- [Library functions and objects](#library-functions-and-objects)
- [Defining our hyperparameters](#defining-our-hyperparameters)
- [Building The Neural Network](#building-the-neural-network)
- [References ](#references )
- [Conclusion](#conclusion)
### Library functions and objects
Importing Library functions and objects into your code is necessary once your installation is complete.
Here are the functions and objects to import:

- The **torch.nn** module: Contains code for the required model.
- The **torchvision.datasets**: Includes MNIST dataset of handwritten digits that we shall be using here.
- The **torchvision.transforms**: We shall be using it here to tt from images to PyTorch tensors.
- The **torch.autograd**: Will be used to define our tensors.

Type the code below to import the library functions and objects;
```Python
import torch
import torch.nn as tn
import torch.nn.functional as tF
import torch.optim as optim
import torchvision.datasets as dsets
import torchvision.transforms as transforms
from torch.autograd import Variable

```
After importing we shall now download and load our dataset to memory. This will be done in the following code:
```Python
# MNIST Dataset 
train_dataset = dsets.MNIST(root ='./data',train = True, download = True)

test_dataset = dsets.MNIST(root ='./data', train = False, transform = transforms.ToTensor())

# Dataset Loader (Input Pipeline)
train_loader = torch.utils.data.DataLoader(dataset = train_dataset, shuffle = True)

test_loader = torch.utils.data.DataLoader(dataset = test_dataset,shuffle = False)
```
### Defining our hyperparameters
Let us define our hyperparameters:
```Python
input_size = 400
number_classes = 10
nummber_epochs = 5
batch_size = 100
reading_rate = 0.001
```
The image size that we will use for our image will be 20*20. This means that our input size will be 400. In addition, there are 10 digits in this, thus we can generate 10 alternative results. In this way, number_classes will be set to ten. In addition, we'll run the full dataset through five iterations of training. Finally, we will train in small batches of 100 images each so that the software does not crash because of memory overflow.

After that, we'll lay out our model in the following manner. In this section, we'll define the forward pass after setting up our model as a subclass of **torch.tn.Module**. As we are building the code, we will not need to mention the softmax in the **forward()** function because it will be determined internally during each forward run.
```Python
class LogisticRegression(tn.Module):
	def __init__(self, input_size, num_classes):
		super(LogisticRegression, self).__init__()
		self.linear = tn.Linear(input_size, num_classes)

	def forward(self, x):
		out = self.linear(x)
		return out
```
Now that our class has been established, we may create an instance of it.
```Python
model = LogisticRegression(input_size, num_classes)
```
### Building The Neural Network
Our loss function and optimizer are now set. As specified in the hyperparameter above, we'll use the cross-entropy loss and the stochastic gradient descent algorithm with a reading rate of 0.001 for the optimizer.
Let's import some modules first before building a new class for the network we're developing.
```python
class NeuralNetwork(tn.Module):
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
To get the network and the optimizer up and running;
```python
criterion = tn.CrossEntropyLoss()
network = NeuralNetwork()
opti = torch.optim.SGD(newmodel.parameters(), lr = reading_rate)
```
We're ready to begin training now. Resetting all gradients to 0 will be the first step here, followed by a forward pass, the loss calculation, backpropagation, and the updating of all weights.
```python
# Training the Model
for epoch in range(num_epochs):
	for i, (images, labels) in enumerate(train_loader):
		images = Variable(images.view(-1, 28 * 28))
		labels = Variable(labels)

		# Forward + Backward + Optimize
		optimizer.zero_grad()
		outputs = model(images)
		loss = criterion(outputs, labels)
		loss.backward()
		optimizer.step()

		if (i + 1) % 100 == 0:
			print('Epoch: [% d/% d], Step: [% d/% d], Loss: %.4f'% (epoch + 1, num_epochs, i + 1, len(train_dataset) // batch_size, loss.data))
```
Finally, we'll run the model through its paces using the code below.
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
To put it another way, if you followed the instructions exactly, you would have an accuracy rate of 82%, which is significantly lower than the current best model, which makes use of a different sort of neural network architecture.

You can run the whole code [here](https://colab.research.google.com/drive/1eL6a4_QxAZxqLV83vJOsLkPF09hYwThn?usp=sharing)
### References 
[To see whole code click here](https://colab.research.google.com/drive/1eL6a4_QxAZxqLV83vJOsLkPF09hYwThn?usp=sharing)

[PyTorch](https://drive.google.com/drive/folders/0B41Zbb4c8HVyUndGdGdJSXd5d3M?resourcekey=0-s90CYmIbmbqbO1Mvtwmlog)

[Linear Regression](https://machinelearningmastery.com/linear-regression-for-machine-learning/)
### Conclusion
With the help of Logistic Regression and PyTorch, we learned how the MNIST handwritten digits dataset may be identified.

In the data folder, the MNIST dataset is initially downloaded. The hyperparameters are then set up and loaded into the environment. The Logistic Regression model can then be defined and used. The MNIST dataset is used to train and test the model.
