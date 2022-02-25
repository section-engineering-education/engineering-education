---
layout: engineering-education
status: publish
published: true
url: /an-overview-of-jina-ai/
title: An Overview of Jina AI
description: This tutorial will walk readers through how to use the Jina AI framework to get their ML tasks done.
author: wilkister-mumbi
date: 2022-02-25T00:00:00-01:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-overview-of-jina-ai/hero.png
    alt: An Overview of Jina AI Example Image
---
Searching for information on the web is not new. We search every day on Twitter, LinkedIn, Stack Overflow, and Amazon. The most common way we have all been searching for a long time now is with the Google Search platform. However, that's not what we will be discussing today. 
<!--more-->
We will be discussing neural search and how it is different from the standard search that we are accustomed to. Besides, this tutorial will walk you through how to use the Jina AI framework to get your ML tasks done.

### Prerequisites
To follow along, you need to be familiar with:
- Machine Learning.
- Deep learning.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [What is neural search](#what-is-neural-search)
- [What is Jina AI](#what-is-jina-ai)
- [How to install Jina AI](#how-to-install-jina-ai)
- [Fundamental concepts](#fundamental-concepts)
  - [Document](#document)
  - [Executor](#executor)
  - [Flow](#flow)
- [Implementing an example to demonstrate how one can use the framework](#implementing-an-example-to-demonstrate-how-one-can-use-the-framework)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### What is neural search
Before neural search, developers had to write every instruction to help an application retrieve information. This process is time-consuming and would give developers headaches as they try to develop these applications.

That is not the case with neural search. With the advent of neural networks, the way developers write rules changed. One could train a neural network to perform a task, and the network gets better with the more data it sees. It is the same case with neural search. In simple words, it is bringing neural networks to search.

Pre-trained neural networks are deployed to retrieve information. These networks are trained to retrieve information and get better at information retrieval when fed with a lot of data. Jina AI is a neural search framework that uses deep neural networks to perform the search.

### What is Jina AI
Jina AI is an open-source, cloud-native neural search framework. It is used for building state-of-the-art and scalable deep learning search applications for any kind of modality. For example, videos, images, source code, long text, etc. The framework allows you to import a "lightweight" version of the Google search engine into your project.

It was first introduced in May 2020 by [Dr. Han Xiao](https://hanxiao.io/about/). He is also the creator of well-known open-source projects such as [bert-as-a-service](https://github.com/hanxiao/bert-as-service) and the popular [fashion-MNIST](https://github.com/zalandoresearch/fashion-mnist) dataset. Currently, [Jina AI](https://jina.ai/), an open-source tech startup based in Berlin, Germany, maintains the framework.

### How to install Jina AI
The Jina AI framework is easy to set up using a quick `pip` install, as shown below:

```bash
!pip install -U jina
```

> Make sure to include `-U` if you want to download the latest version of Jina. Also, don't forget to include the exclamation `!` before the `pip`. Otherwise, you'll get an error.

### Fundamental concepts
The framework has three fundamental concepts:
- Document
- Executor
- Flow

#### Document
It is the basic data type in Jina. A document can be a text, image, video, or whatever data type that you have. You can learn more about it [here](https://docarray.jina.ai/).

#### Executor
It processes the data. In this case, our data comes from the `Document`. You can read more about it [here](https://docs.jina.ai/fundamentals/executor/).

#### Flow
The Flow streamlines and distributes the `Executors`. It allows you to chain together the `DocumentArray` and `Executor`, to bring real value and to build and serve an application out of it.

1. It consists of pods. They are the "brains" of Jina. These pods help us achieve specific tasks, such as segmenting, encoding, and ranking.
2. Context manager.
3. Abstraction of high-level tasks, i.e., index or query.

Let's create a sample flow:

```python
from jina import Flow

f = Flow()
```

We've imported `Flow` and made an instance of it. With those two lines of code, you have your flow ready. However, we know that flow is a manager. As it is, the flow is useless as it is not managing anything. Thus we need to add some parts to it using the `.add()` method:

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

Other methods included in Flow are: `.start()`, `.stop()`, `.block()`, `.plot()`, and `with context manager`. You can read more about Flow [here](https://docs.jina.ai/fundamentals/flow/).

### Implementing an example to demonstrate how one can use the framework
Leveraging the three fundamental concepts, let's implement a simple `Neural Search` service to demonstrate how to use the framework. We will leverage the [Totally-Looks-Like Dataset](https://sites.google.com/view/totally-looks-like-dataset) on Google. The dataset contains 6016 image pairs from the wild, shedding light upon a rich and diverse set of criteria employed by human beings.

Given a query, the framework should give us some results in return. Also, we will use `QueryLang` to help us achieve this task. `QueryLang` is a basic data type in Jina. It provides a Python interface that allows users to manage and access Jina and represent query language structure.

Let's import the necessary dependencies into our code:

```python
from docarray import Document, DocumentArray
from jina import Executor, Flow, requests
```

The class below performs some preprocessing and wraps it via an `Executor`:

```python
class PreprocImg(Executor):
    @requests
    async def foo(self, docs: DocumentArray, **kwargs):
        for d in docs:
            (
                d.load_uri_to_image_tensor(200, 200)  # load
                .set_image_tensor_normalization()  # normalize color
                .set_image_tensor_channel_axis(
                    -1, 0
                )  # switch color axis for the PyTorch model later
            )
```

The class below performs embedding and wraps it via an `Executor`:

```python
class EmbedImg(Executor):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        import torchvision
        self.model = torchvision.models.resnet50(pretrained=True)

    @requests
    async def foo(self, docs: DocumentArray, **kwargs):
        docs.embed(self.model)
```

The class below performs matching and wraps it via an `Executor`:

```python
class MatchImg(Executor):
    _da = DocumentArray()

    @requests(on='/index')
    async def index(self, docs: DocumentArray, **kwargs):
        self._da.extend(docs)
        docs.clear()  # clear content to save bandwidth

    @requests(on='/search')
    async def foo(self, docs: DocumentArray, **kwargs):
        docs.match(self._da, limit=9)
        del docs[...][:, ('embedding', 'tensor')]  # save bandwidth as it is not needed
```

Let's use the `Flow` to connect all the `Executors`. We use the `.add()` method to add each `Executor` to the `Flow`:

```python
f = (
    Flow(port_expose=12345)
    .add(uses=PreprocImg)
    .add(uses=EmbedImg, replicas=3)
    .add(uses=MatchImg)
)
```

We can use the `.plot()` method to visualize this `Flow`. We save the image as `flow.svg`. You can name yours as you wish:

```python
f.plot('flow.svg')
```

The next step involves downloading the image dataset. We save this result inside the variable, `index_data`:

```python
index_data = DocumentArray.pull('demo-leftda', show_progress=True)
```

We then index these image data using the code below:

```python
with f:
    f.post(
        '/index',
        index_data,
        show_progress=True,
        request_size=8,
    )
    f.block()
```

> This process might take a while. Please be patient as it performs the indexing.

After successful indexing, we can use a Python client to access the service:

```python
from jina import Client

c = Client(port=12345)  # connect to localhost:12345
print(c.post('/search', index_data[0])['@m'])  # '@m' is the matches-selector
```

Finally, we switch from the GRPC interface to a REST API by writing the following code:

```python
with f:
    ...
    f.protocol = 'http'
    f.block()
```

> `.block()` is a method in `Flow`. It blocks execution until the program is terminated. It is useful to keep the `Flow` alive so that it can be used from other places (clients, etc).

To access the service on a web browser, we can use this URL: http://0.0.0.0:12345/docs. To access the full code, please refer to this [link](https://colab.research.google.com/drive/1GRChs4OuMtl580nW-SjXaupfYOikkJfq?usp=sharing).

### Wrapping up
This tutorial has shown you how to build a neural search application using a simple example. Of course, this is a basic example, but it contains all the necessary concepts that should get you started using the framework. For more information about the framework, please read their [documentation](https://github.com/jina-ai/jina).

### Further reading
- [Jina AI](https://jina.ai/)
- [Documentation](https://github.com/jina-ai/jina)
- [Jina Hub](https://hub.jina.ai/)
- [Totally Looks Like - How Humans Compare, Compared to Machines](https://arxiv.org/abs/1803.01485v3)

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
