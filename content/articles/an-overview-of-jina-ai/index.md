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
The most common way we've all been searching for a long time now is with the Google Search platform. But, that's now what we will be discussing today, we will be discussing neural search and how it is different from the standard search that we are used to. Besides, the tutorial will walk you through how to use the Jina AI framework to get your ML tasks done.

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
- Cross modality.
- Multi-modality.
- GIF search.

### What is Jina AI
Jina AI is an open-source, cloud-native neural search framework for building state-of-the-art and scalable deep learning search applications in minutes for any kind of modality. For example, videos, images, source code, long text, etc. The framework allows you to import a "lightweight" version of the Google search engine into your project.     

Jina AI was first introduced in May 2020 by [Dr. Han Xiao](https://hanxiao.io/about/). He is also the creator of well-known open-source projects such as [bert-as-a-service](https://github.com/hanxiao/bert-as-service) and the popular [fashion-MNIST](https://github.com/zalandoresearch/fashion-mnist) dataset. Currently, the framework is maintained by [Jina AI](https://jina.ai/), an open-source tech startup based in Berlin, Germany. .

### How to install Jina AI
The Jina AI framework is easy to set up using a quick `pip` install as shown below:

```bash
!pip install -U jina
```
### Fundamental concepts
The framework has three fundamental concepts:
- Document
- Extractor
- Flow

#### Flow
1. It consists of pods. They are the "brains" of Jina. These pods help us achieve specific tasks such as segmenting, encoding, and ranking.
2. Context manager
3. Abstraction of high-level tasks i.e., index or query

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
Let's implement a simple `Hello World` example to demonstrate how we can use the framework. We will leverage the [Fashion-MNIST](https://github.com/zalandoresearch/fashion-mnist) dataset. We will make some random queries of items in the dataset (shoes, dresses, or shirts), and the framework should give us some results in return. Also, we will use `QueryLang` to help us achieve this task. `QueryLang` is a basic data type in Jina. It provides a Python interface that allows users to manage and access Jina and represent query language structure.

To get started, we will perform the following tasks:
- Download data and labels.
- Create our flow-index yml file. 
- Query the data updating the label.
- Get the results.

### Wrapping up
This tutorial has shown you how you can build your neural search application using a simple example. Of course, this is a basic example, but it contains all the necessary concepts that'll get you started using the framework. For more information about the framework, please read their [documentation](https://github.com/jina-ai/jina).

### Further reading
- [Jina AI](https://jina.ai/)
- [Documentation](https://github.com/jina-ai/jina)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
