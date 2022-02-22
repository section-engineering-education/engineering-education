---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-jina-ai/
title: An Overview of Jina AI
description: This tutorial will walk our readers through how to use the Jina AI framework to get their ML tasks done.
author: wilkister-mumbi
date: 2022-02-14T00:00:00-21:40
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-jina-ai/hero.png 
    alt: An Overview of Jina AI Example Image
---
Searching for information on the web is not new. We use search every day on Twitter, LinkedIn, Stack Overflow, and Amazon. 
<!--more-->
The most common way we've all been searching for a long time now is with the Google Search platform. But, that's not what we will be discussing today. We will be discussing neural search and how it is different from the standard search that we are accustomed to. Besides, the tutorial will walk you through how to use the Jina AI framework to get your ML tasks done.

### Prerequisites
To follow along with this tutorial, you need to be familiar with:
- Machine Learning.
- Deep learning.

### Outline
- [What is neural search](#standard-search-vs-neural-search)
- [What is Jina AI](#what-is-jina-ai)
- [How to install Jina AI](#how-to-install-jina-ai)
- [Fundamental concepts](#fundamental-concepts)
- [Implementing an example to demonstrate how one can use the framework](#implementing-an-example-to-demonstrate-how-one-can-use-the-framework)
- [Wrapping-up](#wrapping-up)
- [Further reading](#further-reading)

### What is neural search 
Before neural search, developers had to write every instruction to help an application retrieve information. This process is time-consuming and would give developers headaches as they try to develop these applications. But this isn't the case with neural search. With the advent of neural networks, the way developers write rules changed. One could train a neural network to perform a task, and the network gets better with the more data it sees. It is the same case with neural search. In simple words, it is bringing neural networks to search.

Pre-trained neural networks are deployed to retrieve information. These networks are trained to retrieve information and get better at information retrieval when fed with a lot of data. Jina AI is a neural search framework that uses deep neural networks to perform the search.

### What is Jina AI
Jina AI is an open-source, cloud-native neural search framework. It is used for building state-of-the-art and scalable deep learning search applications for any kind of modality. For example, videos, images, source code, long text, etc. The framework allows you to import a "lightweight" version of the Google search engine into your project.     

It was first introduced in May 2020 by [Dr. Han Xiao](https://hanxiao.io/about/). He is also the creator of well-known open-source projects such as [bert-as-a-service](https://github.com/hanxiao/bert-as-service) and the popular [fashion-MNIST](https://github.com/zalandoresearch/fashion-mnist) dataset. Currently, the framework is maintained by [Jina AI](https://jina.ai/), an open-source tech startup based in Berlin, Germany.

### How to install Jina AI
The Jina AI framework is easy to set up using a quick `pip` install as shown below:

```bash
!pip install -U jina
```
> Make sure to include `-U` if you want to download the latest version of Jina.

### Fundamental concepts
The framework has three fundamental concepts:
- Document
- Executor
- Flow

#### Document
It is the basic data type in Jina. A document can be a text, image, video, or whatever data type that you have.

#### Executor
It processes the data. In this case, our data comes from the `Document`.

#### Flow
The Flow streamlines and distributes the `Executors`.

1. It consists of pods. They are the "brains" of Jina. These pods help us achieve specific tasks such as segmenting, encoding, and ranking.
2. Context manager.
3. Abstraction of high-level tasks i.e., index or query.

Let's create a sample flow.

```python
from jina import Flow

f = Flow()
```
We've imported `Flow` and made an instance of it. With those two lines of code, you have your flow ready. However, we know that flow is a manager. As it is, the flow is useless as it is not managing anything. So, we need to add some parts to it using `.add()`.

```python
from jina import Flow

f = Flow().add(uses = 'cnn-encoding').add(uses = 'simple-indexer')
```
The code above tells flow to use the `cnn-encoder`. You can use any encoder you want. It also tells the flow to use the `simple-indexer`. Here, we have a flow for encoding and indexing. Finally, we tell the flow what to do with these as shown:

```python
from jina import Flow

f = Flow().add(uses = 'cnn-encoding').add(uses = 'simple-indexer')

with f:
    f.index(docs)
```
Here, we are saying that with the flow we created, `f`, let's index some documents (docs).

### Implementing an example to demonstrate how one can use the framework
Let's implement a simple `Multimodal Search` example to demonstrate how we can use the framework. We will leverage the [People Image Dataset](https://www.kaggle.com/ahmadahmadzada/images2000) on Kaggle. It contains 2,000 image-caption pairs `MobileNet` and `MPNet`. We will use Jina to index those 2,000 documents. Given a multimodality query, the framework should give us some results in return. Also, we will use `QueryLang` to help us achieve this task. `QueryLang` is a basic data type in Jina. It provides a Python interface that allows users to manage and access Jina and represent query language structure.

The code below downloads the dataset and indexes the image-caption pairs.

```bash
!pip install "jina[demo]" && jina hello multimodal
```
> Make sure to include the exclamation `!` before the `pip`. Otherwise, you'll get an error. 
 
After it has finished downloading, it will open up a web page where you can query multimodal documents.

From the left panel, you can perform a multimodality query. You can drag the slider to change which modality the results will focus on. You can also change the search text to see how the results change accordingly. 
 
To access the full code, please refer to this [link](https://colab.research.google.com/drive/1GRChs4OuMtl580nW-SjXaupfYOikkJfq?usp=sharing).

### Wrapping up
This tutorial has shown you how you can build your neural search application using a simple example. Of course, this is a basic example, but it contains all the necessary concepts that'll get you started using the framework. For more information about the framework, please read their [documentation](https://github.com/jina-ai/jina).

### Further reading
- [Jina AI](https://jina.ai/)
- [Documentation](https://github.com/jina-ai/jina)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
