---
layout: engineering-education
status: publish
published: true
url: /an-introduction-to-pytorch-lightning/
title: Introduction to PyTorch Lightning
description: This tutorial will introduce users to the Pytorch Lightning framework. This is a lightweight Python wrapper for machine learning researchers that is built on top of PyTorch. 
author: willies-ogola
date: 2021-12-01T00:00:00-14:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-introduction-to-pytorch-lightning/hero.png
    alt: Pytorch Example Image
---
PyTorch Lightning is an open-source, lightweight Python wrapper for machine learning researchers that is built on top of PyTorch. 
<!--more-->
With this framework, you don't have to remember all the tiny details of the PyTorch framework because it handles it.

Pytorch Lightning is a high-level framework built on top of Pytorch. As we know, Pytorch is already great. Therefore, Pytorch lightning is in a lot of ways even greater. 

It is very similar as is Keras to TensorFlow. The framework is built to make training neural networks easier, as well as reduce the required training code. 

The framework lets you spend less time on engineering and more time on research. 

This tutorial will introduce this Pytorch Lightning. We will implement an example to demonstrate how it can be used.

### Table of contents
- [PyTorch](#pytorch)
- [PyTorch Lightning](#pytorch-lightning)
- [Advantages of PyTorch Lightning](#advantages-of-pytorch-lightning)
- [Who is PyTorch Lightning for](#who-is-pytorch-lightning-for)
- [Demonstration on how PyTorch Lightning is used](#demonstration-on-how-pytorch-lightning-is-used)
- [Further reading](#further-reading)

### PyTorch Lightning
PyTorch Lightning lessens the load and lets you focus more on research rather than on engineering. 

A noteworthy feature of this framework is that it prints warnings and gives a developer machine learning tips. 

Many machine learning developers are skeptical about frameworks that tend to hide the underlying engineering. 

That's why numerous developers preferred PyTorch to TensorFlow in the first place. But on the other hand, PyTorch Lightning makes things even much easier. 

With that said, it would be advisable to learn the underlying basics of PyTorch first before getting started with PyTorch Lightning. 

Please refer to this [article](/engineering-education/tensorflow-vs-pytorch/) to understand the basics of PyTorch.

### Advantages of PyTorch Lightning 
- It is easy to install using `pip`.
- The framework's code tends to be simple, clean, and easy to reproduce. This is because the engineering code is separate from the main code.
- It supports 16-bit precision. This helps in speeding up model training.
- It can run distributed training. It supports training on multiple machines at the same time.
- It supports model checkpointing. Checkpointing is a way to save the current state of your experiment so that you can pick up from where you left off. This helps to recover previous states in case something happens i.e., power outages. 
- It integrates easily with other popular machine learning tools. For example, it supports Google's [Tensorboard](https://www.tensorflow.org/tensorboard). 
- Compared to PyTorch, it has a minimum running speed overhead of about 300ms which makes it pretty fast. 
- Its models are hardware agnostic. It can run on any CPU, GPU, or TPU machine.
- It prints out warnings and gives a developer machine learning tips if the developer happens to make mistakes in the code. This can be helpful. 

### Demonstration on how PyTorch Lightning is used

#### Installing and importing dependencies
As mentioned earlier, Pytorch Lightning is built on top of Pytorch. So, we still need to import `vanilla Pytorch` before installing PyTorch Lightning. 

The PyTorch installation has been covered in a lot of tutorials, please refer to this [tutorial](/engineering-education/building-a-grammar-correction-python-app-with-gramformer-and-gradio/) to install PyTorch. 

```bash
!pip install pytorch-lightning
```

If you are performing an `Anaconda install`, use the following command:

```bash
conda install pytorch-lightning -c conda-forge
```

After installation, we need to import the following dependencies into our code:

```python
import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
import torch.nn.functional as F
import matplotlib.pyplot as plt
import pytorch_lightning as pl
from pytorch_lightning import Trainer
```

Let's define some hyperparameters that we will use later in our code:

```python
input_size = 784
hidden_size = 500
num_classes = 10
num_epochs = 3
batch_size = 100
learning_rate = 0.001
```

The code below shows how you would describe a PyTorch Lightning module. Notice this is a `lightning module` instead of a `torch.nn.Module`. 

We first need to initialize our model with an input size of `784` neural networks, `500` hidden neurons, and `10` output classes. 

We've set the number of epochs to only `3` as we are not training on a GPU machine. It would take a long time to train if we increased the number of epochs.

In PyTorch lightning, `forward` defines the prediction/inference actions. The `training_step` defines the train loop. It is independent of forward. 

We are also calculating the cross-entropy and returning the loss. Finally, [tensorboard](https://www.tensorflow.org/tensorboard) is one of the most common loggers used by machine learning researchers. 

To log to Tensorboard, you can use the key `log` which can be called from any method in the LightningModule.

```python
class LitNeuralNet(pl.LightningModule):
    def __init__(self, input_size, hidden_size, num_classes):
        super(LitNeuralNet, self).__init__()
        self.input_size = input_size
        self.l1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.l2 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out = self.l1(x)
        out = self.relu(out)
        out = self.l2(out)
        # no activation and no softmax at the end
        return out

    def training_step(self, batch, batch_idx):
        images, labels = batch

        images = images.reshape(-1, 28 * 28)

        # Forward pass
        outputs = self(images)
        loss = F.cross_entropy(outputs, labels)
        
        tensorboard_logs = {'train_loss': loss}
        # use key 'log'
        return {"loss": loss, 'log': tensorboard_logs}
```

### Training
In the training step, we'll discuss five functions. 

We have the `train_dataloader`, `val_dataloader`, `validation_step`, `validation_epoch_end`, and the `configure_optimizers` function. 

Let's discuss what each function does: 

```python
   def train_dataloader(self):
        # MNIST dataset
        train_dataset = torchvision.datasets.MNIST(
            root="./data", train=True, transform=transforms.ToTensor(), download=True
        )
        # Data loader
        train_loader = torch.utils.data.DataLoader(
            dataset=train_dataset, batch_size=batch_size, num_workers=2, shuffle=False
        )
        return train_loader
```

The `train_dataloader()` function generates the training data loader. It allows us to load the dataset we want to use for our project. 

In this project, we are loading the MNIST dataset. The number of workers, `num_workers`, changes depending on the numbers of CPUs in your machine. 

Most computers have 4 CPUs. If so, change that value to 4 or the number of CPUs available on your machine.

```python
    def val_dataloader(self):
        test_dataset = torchvision.datasets.MNIST(
            root="./data", train=False, transform=transforms.ToTensor()
        )

        test_loader = torch.utils.data.DataLoader(
            dataset=test_dataset, batch_size=batch_size, num_workers=2, shuffle=False
        )
        return test_loader
```

The `val_dataloader` generates the validation data loader. It allows us to load the validation dataset to give us an unbiased evaluation of the model performance.

```python
    def validation_step(self, batch, batch_idx):
        images, labels = batch
        images = images.reshape(-1, 28 * 28)

        # Forward pass
        outputs = self(images)
                        
        loss = F.cross_entropy(outputs, labels)
        return {"val_loss": loss}
    
    def validation_epoch_end(self, outputs):
        # outputs = list of dictionaries
        avg_loss = torch.stack([x['val_loss'] for x in outputs]).mean()
        tensorboard_logs = {'avg_val_loss': avg_loss}
        # use key 'log' to load Tensorboard
        return {'val_loss': avg_loss, 'log': tensorboard_logs}
```

```python
    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters(), lr=learning_rate)
        
if __name__ == '__main__':
    model = LitNeuralNet(input_size, hidden_size, num_classes)
    
    trainer = Trainer(max_epochs=num_epochs)
    trainer.fit(model)
```

In the `configure_optimizer` function, we can pass in any optimizer you want to use. For our case, we've chosen the `Adam` optimizer. 

Besides, we can pass in the `learning_rate` parameter; a learning rate of `0.001` is selected for this experiment.

In PyTorch Lightning, anything that is critical to this project is listed and organized in a way that is cohesive across every single project. 

For instance, if you want to know which data is used, you need to go to the `train_dataloader()` function. 

If you want to determine which optimizer is used,  you only need to look at the `configure_optimizers()` function, and you'll find it. 

You may have noticed that there is no GPU code or half-precision code. All these functionalities are done under the hood in PyTorch Lightning. 

To better understand how PyTorch Lightning saves us a great deal of time and to summarize what we've learned in this tutorial, let's take a look at how it converts a vanilla PyTorch code by removing all the boilerplate code.

<iframe width="478" height="269" src="https://www.youtube.com/embed/xTTFQE2_pYY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Please find the full code [here](https://colab.research.google.com/drive/1tYa4uaxqCQDuFmwaNQ_90C2HVzOcI-kq?usp=sharing).

### Wrapping up
This tutorial has introduced PyTorch Lightning and demonstrated an example to show how the framework can be used. 

PyTorch Lightning is a powerful library that removes unnecessary boilerplate code and makes training neural networks easier. 

You don't want to spend most of your time learning how to distribute your model among multiple GPUs, or doing the complex engineering bit. 

You'd rather focus your time on research and development, and this is the main idea behind the creation of this lightweight python wrapper. 

If you're a frequent PyTorch user, you can give PyTorch Lightning a try in your next project, or rather, convert your code into PyTorch Lightning and see whether it has lived up to its expectations.

Happy coding!

### Further reading
- [PyTorch Lightning](https://www.pytorchlightning.ai/)
- [PyTorch Lightning GitHub Repo](https://github.com/PyTorchLightning/pytorch-lightning)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
