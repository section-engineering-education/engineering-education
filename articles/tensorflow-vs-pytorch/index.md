---
layout: engineering-education
status: publish
published: true
url: /engineering-education/tensorflow-vs-pytorch/
title: TensorFlow vs. PyTorch - Which one to pick? 
description: This article will compare the Tensorflow and Pytorch frameworks used in deep learning and neural networks. These frameworks are used to design, test, and deploy deep learning models.
author: willies-ogola
date: 2021-01-04T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/tensorflow-vs-pytorch/hero.png
    alt: TensorFlow vs PyTorch example image
---
Deep Learning (DL) frameworks are gradient computing engines widely used in deep learning and neural networks. If you haven't studied neural networks and how they function, please feel free to read this [article](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/) before diving into reading this article.  
<!--more-->
### Introduction
Given how powerful and transformative Deep Learning (DL) is, several libraries have sprung up in recent years to make designing, testing, and deploying DL models easy. Some of these libraries include Microsoft's [Cognitive Toolkit](https://docs.microsoft.com/en-us/cognitive-toolkit/) (CNTK), Apache's [MXNET](https://mxnet.apache.org/versions/1.7.0/), Facebook's [PyTorch](https://pytorch.org/), and Google's [TensorFlow](https://www.tensorflow.org/).

Today, we have a lot of people using both TensorFlow and PyTorch. These are the two most popular DL frameworks. Discussing these two popular frameworks will be the subject of our article today. But first, let's get to know what TensorFlow and PyTorch are.

### What is TensorFlow (TF)?
TensorFlow is a software application popular for implementing deep learning algorithms. The Google Brain team developed it, and it was released as an open-source platform in 2015. It supports both the R and Python programming languages. It was initially started as a research-based architecture for Google's in-house applications but was eventually open-sourced to be used commercially.

It is known as "TensorFlow" because it takes in inputs as tensors or multi-dimensional arrays (MDAs). These tensors (MDAs) then flow through a system of operations and comes out the other end as outputs.

The key features of TensorFlow include:
- It is actively maintained by the developers at Google. Currently, [TF2.3](https://blog.tensorflow.org/2020/07/whats-new-in-tensorflow-2-3.html) is the latest released version.
- It is an open-source software that grants developers access to use and distribute the software for different purposes.
- It makes use of TensorBoard for visualizing model graphs, tracking and visualizing metrics, and displaying data such as images and texts.
- It is a flexible framework. It supports the experimentation of new deep learning models.

An extra feature to note is that TensorFlow 2.x now adopts the Keras API as its default standard. This eliminates the need to import the Keras API onto TensorFlow separately.

### What is PyTorch?
PyTorch is a relatively new deep learning framework as it came out a year later after TensorFlow was released. The name PyTorch was inspired by a popular "[torch](http://torch.ch/)" deep learning framework, which was written in the [Lua](https://www.lua.org/) programming language. 

However, learning the Lua programming language was a significant barrier, especially when learning deep learning. It also didn't offer the modularity necessary to interface with other deep learning libraries currently present. 

This problem was solved by a team of AI researchers inspired by the torch's programming style. They decided to develop an improvised form of torch with the Python (py) programming language, that later became known as PyTorch. 

Some notable features of PyTorch include:
- It is swift and feels native.
- It has native support for Python and all of its libraries. This feature makes it very easy to learn. 
- Its easy to use API that ensures easy usability when making use of the API.
- It is actively maintained and used by the developers at Facebook.
- It supports Nvidia's [CUDA](https://en.wikipedia.org/wiki/CUDA), ensuring that the code runs on a GPU, decreasing the time needed to run the code.
- Dynamic Computation Graphs is a crucial feature in PyTorch. It ensures that the graphs build up dynamically as you code.

Let's begin by discussing some of the comparisons between TensorFlow and PyTorch. 

### Computation graphs
#### Static graphs vs Dynamic graphs
From the start, the computation graph was a notable difference between TensorFlow and PyTorch.

From its onset, PyTorch was built around the concept of dynamism. It provided developers with the ability to dynamically define and manipulate graphs at runtime while it is executing. This feature offered PyTorch developers an advantage over TensorFlow as manipulating graphs during runtime helped quickly troubleshoot the model in case of any issue with the code. The dynamic nature of PyTorch graphs enabled its code to run faster, thus increasing its performance.

By default, when [TensorFlow](https://www.tensorflow.org/) was developed, it let developers create static computation graphs at compile time. It didn't allow us to define and manipulate graphs at runtime. If we wanted to make any changes, we would have to rebuild the neural network from the start. It is also challenging to debug static graphs as many logic errors have to wait until execution time to be uncovered. 

With the release of [TensorFlow 2.0](https://www.tensorflow.org/guide/effective_tf2), TensorFlow developers introduced the "eager mode." They aimed to allow graphs to be defined and manipulated dynamically in computation while executing as was the case with PyTorch, which already had this feature (that worked well). Rather than waiting until everything is coded up and connected before you can see if everything was done right, you could now "eagerly" execute your operations as you're working. 

It is important to note that static graphs are advantageous in cases where a developer needs to store fixed graph data structures, distribute computations over large amounts of hardware, and ship models independent of code. However, this tends to add a lot more complexity, which wastes computation and reduces the networks' overall performance.

Today, both frameworks allow the use of static and dynamic computation of graphs. As far as computational graphs are concerned, there is not much difference between the two.

### Visualization
Besides computational graphs, the visualization tools used between these two frameworks show notable distinctions.

TensorFlow comes on-board with the [TensorBoard](https://www.tensorflow.org/tensorboard) visualization toolkit that helps researchers understand graphs and how their code runs. It is also an easy-to-use toolkit that helps track and visualize metrics such as accuracy and losses in your model. 

PyTorch does not have a native in-build visualizing tool like TensorFlow does. A researcher has to import external visualization libraries such as [matplotlib](https://matplotlib.org/) and [seaborn](https://seaborn.pydata.org/) to be able to achieve the same objective.

They both achieve the same visualization goal, but TensorBoard offers researchers a more significant advantage. It has more features and a good number of visualization tools that transform graphs into beautiful-looking visualizations.

### Community
As I mentioned earlier, TensorFlow has been around for a longer time compared to PyTorch. Due to this factor, and partly because Google's technology giants develop it, TensorFlow has a much more expansive community around its ecosystem. This community helps make the learning of the framework easier.

Recently, the number of developers using PyTorch among the research community has grown. The community around TensorFlow is still broader, but PyTorch is catching up fast. Especially with companies like Tesla and Facebook adopting it as their default framework of choice. 

### Distributed computing
Both frameworks currently allow distributed computing both on the GPU and CPU, enabling faster processing of models.
However, TensorFlow's distributed computing platform does offer an added advantage over PyTorch's. Google, TensorFlow's parent company, released the Tensor Processing Unit (TPU), which processes faster than GPUs. It is much easier to run code on a TPU using TensorFlow than it is on PyTorch. 

### Debugging
Here, PyTorch wins. 

This is because PyTorch uses the standard Python debugger (pdb) that most developers are familiar with. There is no need to start learning on a new debugger to use it to debug your code. This makes it easier and flexible, especially for beginners.

In TensorFlow, a developer is required to use the TensorFlow debugger (tfdbg). An extra amount of time is needed to learn how to use the debugger and request to use variables requested from the session. 

### Deployment
When deploying deep learning models for production, TensorFlow has an advantage over PyTorch. TensorFlow provides tools such as TensorFlow.js, TensorFlow Serving, and TensorFlow Lite that enable the easy deployment of models on browsers, the cloud, and IoT devices. This is the main reason why a lot of companies have chosen TensorFlow as their preferred framework of choice when it comes to production.

PyTorch hasn't been left behind. In a recent update, they introduced [TorchServe](https://github.com/pytorch/serve) (still relatively new) to serve PyTorch models for production purposes. Though not as robust as the one TensorFlow has with many functionalities, it's still able to provide PyTorch developers with an easy and flexible way for serving models. 

### Wrapping Up
To wrap up, I'd say that TensorFlow and PyTorch are two prevalent frameworks. PyTorch is the most popular framework of choice in the research community. Big companies such as OpenAI, Apple, Microsoft, and Tesla have recently embraced PyTorch as their default framework of choice. The reason is that PyTorch lets you prototype and to try out new unseen projects with little hassle. 

TensorFlow is still being used by many companies, including the industry giants, Google. They keep improving it and introducing newer features. It's still the framework of choice when building models for production purposes.

In their initial years of release, the differences between the two frameworks were evident. Updates to the frameworks over the years has narrowed that gap. Presently, the two popular frameworks' differences are negligible as PyTorch seems to be catching up with TensorFlow. 

I would be wrong if I said that one framework is better than the other. The frameworks both have their merits. Just pick one framework and get started with it. The more you interact with these two deep learning frameworks, the better you'll become at developing instincts on which framework suits you the best for your project.

### References
1.  [MXNET](https://mxnet.apache.org/versions/1.7.0/)
2.  [TensorFlow](https://www.tensorflow.org/) 
3.  [Cognitive Toolkit](https://docs.microsoft.com/en-us/cognitive-toolkit/) 
4.  [PyTorch](https://pytorch.org/) 
5.  [Lua](https://www.lua.org/) 
6.  [torch](http://torch.ch/)  
7.  [CUDA](https://en.wikipedia.org/wiki/CUDA) 
8.  [TensorBoard](https://www.tensorflow.org/tensorboard) 
9.  [Matplotlib](https://matplotlib.org/) 
10. [Seaborn](https://seaborn.pydata.org/) 
11. [Difference between AI, ML, and DL](https://www.section.io/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/) 
12. [TorchServe](https://github.com/pytorch/serve)   
13. [TensorFlow 2.0](https://www.tensorflow.org/guide/effective_tf2)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
