---
layout: engineering-education
status: publish
published: true
url: /engineering-education/an-introduction-to-graph-neural-network/
title: An Introduction to Graph Neural Networks
description: This article will explore some of the popular graph learning libraries, the various GNN models currently available, and the use cases for GNN.
author: willies-ogola
date: 2020-10-28T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/an-introduction-to-graph-neural-network/hero.jpg
    alt: Artificial intelligence machine learning and deep learning
---
Over the years, [Deep Learning (DL)](/engineering-education/introduction-to-deep-learning/) has been the key to solving many machine learning problems in fields of image processing, natural language processing, and even in the video games industry.
All this generated data is represented in spaces with a finite number of dimensions i.e. 2D or 3D spaces.
<!--more-->
Yet, in most current applications, generated data is generated from non-Euclidean domains that represent data as graphs with relationships and mutual dependency between objects.
This has led to a growing interest in deep learning research that focuses on the structure of graph data.

In this article, we will cover on:

- What is a Graph?

- What are Graph Neural Networks?

- How CNNs and Network Embedding plays a role in GNN.

- Graph Learning Python Libraries.

- Models of Graph Neural Networks.

- Applications of Graph Neural Networks.


### Prerequisites
This article assumes a basic understanding of Machine Learning (ML) and Deep Learning (DL). For an introduction to ML and DL, feel free to check out my previous [article](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning).

### What is a Graph?
Graphs are powerful data structures that model a set of objects and their relationships. These objects represent the nodes and the relationships represent edges.

![A graph data structure](/engineering-education/an-introduction-to-graph-neural-network/edges-links.png)

Let's assume a graph, G. This graph describes:
- V as the vertex set
- E as the edges

Then, G = (V,E)

In our article, we will refer to vertex, V, as the nodes.

Let's take an example of a transportation system. The locations in the system represent the vertices, V, and the connections between these locations representing the edges.

### What is Graph Neural Network (GNN)?
GNN is a technique in deep learning that extends existing [neural networks](/engineering-education/introduction-to-neural-networks/) for processing data on graphs.

![Structure of a GNN implementing a drug interaction network](/engineering-education/an-introduction-to-graph-neural-network/gnn-structure.PNG)<br>

*[Image Source: Aalto University](https://users.aalto.fi/~falconr1/RecentAdvances2019/How%20Powerful%20Are%20Graph%20Neural%20Networks/How_Powerful_Are_Graph_Neural_Networks(3).pdf)*

Using neural networks, nodes in a GNN structure add information gathered from neighboring nodes. The last layer then combines all this added information and outputs either a prediction or classification.

GNN output performs:
1. Node classification  
2. Link prediction
3. Graph classification

Let's discuss each of these outputs in detail.

### Node classification
Here, every node in the network is assigned a label. The network then determines the labels of new nodes introduced without the ground truth.

A clear example of node classification is illustrated in the image above where the GNN establishes whether node A is either a toxic or safe drug.

Another application of node classification is on protein interaction networks. Here, the nodes of the graph represent different types of proteins. The edges describe the types of biological interactions between them.

Let's take an example of two proteins in a network of 16 proteins. The 0th (node 0) and 15th (node 15) protein are related to a cancerous disease. The network should classify which proteins are the most related to each of them.

### Link prediction
The goal in a link prediction task is to predict the likelihood of two nodes being inter-linked.

Link prediction is used in maps to predict the occurrence of traffic jams enabling the suggestion of alternative routes (links) given the current traffic pattern.

It's applied in social networking sites such as Facebook. I'm sure we've all encountered the friend suggestion notification on Facebook. This is a good application of link prediction.

The nodes are the friends on Facebook while the edges are the relationships between these friends. The network is able to establish the link between two friends (nodes) i.e. mutual friends. Once it establishes a link, it's able to make a prediction and suggest the friend to you.

The image below depicts the link prediction problem in social networks

![Link Prediction in social networks](/engineering-education/an-introduction-to-graph-neural-network/social-network.PNG)<br>

*[Image Source: Arxiv](https://arxiv.org/abs/1812.08434)*

### Graph classification
The idea behind graph classification is to classify graphs into different classes. This is related to image classification but the target changes into classifying graphs rather than images.

Social networks have changed the way we socialize and communicate in this era. Graph classification in social network analysis help discover patterns in user's interaction.

This analysis helps summarize the perspectives and interests of social media users. Information gathered from these analysis can then be used for targeted online advertising.

For example, the network could categorize users into different age groups. Targeted advertisements could then be tailored for these different classes of users.

### How CNNs and Network Embedding plays a role in GNN
GNNs motivation stems from two areas of study:
- Convolution Neural Networks (CNN)
- Network Embeddings

#### Convolution Neural Networks (CNN)
These are deep neural networks used to analyze image data. They solve image processing tasks.

CNNs structures share weights, local connections and consist of many layer stacked together.
These structural properties of a CNN are also shared within a GNN:

- The shared weight property is important in graphs as it leads to a reduction in the computation cost.
- Many layers stacked together are able to capture meaningful features in graphs networks.
- The existence of local connections are what graphs networks are all about. They are locally connected structures.

#### Network Embedding
Network embedding enables the transformation of input networks such as the edges and nodes of a graph into low-dimensional vectors.

The success in the implementation of ideas such as representation learning and word embeddings gave rise to [DeepWalk](https://arxiv.org/pdf/1403.6652.pdf) which is a graph embedding technique based on learning latent representations.

### Graph Learning Python Libraries
Why would you need to use a library? You might wonder.

As a beginner, the use of libraries enables a faster and efficient way of experimenting with GNNs. These libraries contain:
- Implemented examples that make it easier for a beginner to understand.
- Free and easy to use examples.
- The most benchmarked datasets in the graph domain have already been integrated into these libraries.

The top three libraries include:
#### 1. PyTorch Geometric
It has the latest types of Graph Networks, already built in for you. These graph networks are available as single line functions that are ready to be called in the PyTorch library.

Read more about it [here](https://pytorch-geometric.readthedocs.io/en/latest).

#### 2. Graph Nets
It's a python library created by DeepMind Technologies. It helps build graph networks in platforms such as TensorFlow and Sonnet.
This library provides a lot of documentation and ready-made collaboration notebooks to showcase how to use their graph network library.

But, it's important to note that their code isn't friendly for beginners when compared to the other two libraries.

Learn more about it [here](https://github.com/deepmind/graph_nets).

#### 3. Deep Graph Library (DGL)
The Distributed Machine Learning community on GitHub created DGL. This platform has readable code, maintained, and cross-platform.

DGL is the top pick for beginners.

Learn more about it on their official [website](https://www.dgl.ai).

To better understand the use of these libraries, [here](https://docs.dgl.ai/tutorials/basics/1_first.html#sphx-glr-download-tutorials-basics-1-first-py) is an example problem implemented using the DGL library.

It is based on the Zachary's Karate club problem. Zachary's karate club is a popular social network of a university used in networks that dates back to the year 1970. The club consisted of a total of 34 members each with close associations outside the club setting.

Due to internal conflicts, the club was forced to split into two communities. One community was led by the instructor (Oth node) while the other was led by the club's president (33rd node).
The task is to predict which of the two communities, node 0 or node 33, each member of the club is likely to join.

### Models of Graph Neural Networks
GNNs models consists of four types:
1. Recurrent Graph Neural Networks (RGNNs)
2. Convolutional Graph Neural Networks (CGNNs)
3. Graph Auto-Encoders (GAEs)
4. Spatial-Temporal Graph Neural Networks (STGNNs)

#### Recurrent Graph Neural Networks (RGNNs)
The earliest studies of Graph Neural Networks fall under this model.

These neural networks aim to learn node representations using Recurrent Neural Networks (RNNs). RGNNs work by assuming that nodes in the graph exchange messages (message passing) constantly. This exchange continues until a stable equilibrium is achieved.  

#### Convolutional Graph Neural Networks (CGNNs)
![CGNN with multiple graph convolution layers](/engineering-education/an-introduction-to-graph-neural-network/CGNN.PNG)<br>

*[Image Source: Arxiv](https://arxiv.org/pdf/1901.00596.pdf)*

CGNNs work by generalizing the operations of convolutions from a grid format to a graph format. In comparison to RGNN, CGNN employs many layers of graph convolutions. This helps to extract high-level node representations.

![Image to Graph](/engineering-education/an-introduction-to-graph-neural-network/image-as-graph.PNG)<br>

*[Image Source: Arxiv](https://arxiv.org/abs/1812.08434)*

CGNNs set the base for building other GNN models.

An example of an CGNN application is the [PinSage](https://medium.com/pinterest-engineering/pinsage-a-new-graph-convolutional-neural-network-for-web-scale-recommender-systems-88795a107f48)  recommendation system at Pinterest. The PinSage algorithm works by learning the graph node embeddings operating on 3 and 18 billion nodes and edges respectively.

#### Graph Auto-Encoders (GAEs)
![Graph Auto-Encoder](/engineering-education/an-introduction-to-graph-neural-network/GAE.PNG)<br>

*[Image Source: Arxiv](https://arxiv.org/pdf/1901.00596.pdf)*

GAEs are deep neural networks that learn to generate new graphs. They map nodes into latent vector spaces. Then, they reconstruct graph information from latent representations.

They are used to learn the embedding in networks and the generative distribution of graphs.

GAEs have been used to perform link prediction tasks in [citation networks](https://arxiv.org/pdf/1611.07308.pdf). These networks contain articles that are linked together via citationships. GAEs are able to categorize these articles into different groupings.

#### Spatial-Temporal Graph Neural Networks (STGNNs)
![A Spatial-Temporal Graph Neural Network](/engineering-education/an-introduction-to-graph-neural-network/GAE.PNG)<br>

*[Image Source: Arxiv](https://arxiv.org/pdf/1901.00596.pdf)*

The idea behind these networks is to simultaneously consider spatial and temporal dependencies. In the current research, graph convolutions capture the spatial dependency. CNNs or RNNs capture the temporal dependence.

STGNNs are applied in:
- [Human action recognition](https://arxiv.org/pdf/1801.07455.pdf)
- [Traffic speed forecasting](https://arxiv.org/pdf/1707.01926.pdf)
- [Driver maneuver anticipation](https://openaccess.thecvf.com/content_cvpr_2016/papers/Jain_Structural-RNN_Deep_Learning_CVPR_2016_paper.pdf)  

For more details on these models, feel free to read this [paper](https://ieeexplore.ieee.org/abstract/document/9046288).

### Applications of Graph Neural Networks
#### Computer Vision
In computer vision, GNNs have been applied to solve problems in:

- Scene graph generation
The goal of this model is to separate image data to achieve a semantic graph. This graph consists of objects and the semantic relationship between them.

- Point clouds' classification
These are sets of 3-D data points in space. They are commonly recorded using LiDAR scans. They transform point clouds into graphs. Thereafter, use CGNNs to explore their topological structures.

- Action recognition
STGNN is applied to learn the various patterns in human action. They detect the locations of human joints in videos. Naturally, human joints form a graph as they are linked by skeletons.

#### Recommendation Systems
In graph-based recommendation systems, users and items are regarded as the nodes within the network. These systems leverage a couple of relationships towards producing recommendations of higher quality.

These include:
- Users to user's relationship
- Items to items relationship
- Users to items relationship

The goal of the system is to tell the importance of an item to a user. This can be regarded as a link prediction problem. To find and predict the missing links between users and product items.

#### Natural Language Processing (NLP)
In NLP, GNNs are used in the classification of text data. They use the mutual relationship between words in documents to work out the labels in documents.

![Graphs in NLP](/engineering-education/an-introduction-to-graph-neural-network/text-to-graphs.PNG)<br>

*[Image Source: Arxiv](https://arxiv.org/abs/1812.08434)*

#### Traffic Systems
In smart transportation systems, STGNNs are deployed to solve the traffic prediction problem.
This is essential in a smart transportation system as there is a need for an accurate estimation of the traffic volume, speed, and density of roads.

In a traffic network, the nodes are represented by the various wireless sensors installed on the roads. The edges are represented by the measured distance between pairs of nodes.

GNNs have also been used together with Long Short Term Memory (LSTM) and CNN to forecast the number of taxi demands in a particular location within a time interval. It takes into account past taxi demands, weather data, and location information.

#### Chemistry
Here, GNNs focuses on the study of the structures of graph in different protein molecules. In these molecules, atoms are considered as the nodes and the chemical bonds between these atoms considered the edges.

![Image depicting a molecule as a graph](/engineering-education/an-introduction-to-graph-neural-network/molecule-as-a-graph.PNG)<br>

*[Image Source: Arxiv](https://arxiv.org/abs/1812.08434)*

### Conclusion
To sum up, this article has only scratched the surface of Graph Neural Networks (GNN). The article discusses some of the popular graph learning libraries, the various GNN models currently available, and the use cases for GNN.

To learn more about Graph Neural Networks, please read this comprehensive survey [paper](https://ieeexplore.ieee.org/abstract/document/9046288).

### References
1. Zhou, J., Cui, G., Zhang, Z., Yang, C., Liu, Z., Wang, L., & Sun, M. (2018). Graph neural networks: A review of methods and applications. arXiv preprint arXiv:1812.08434.
2. Wu, Z., Pan, S., Chen, F., Long, G., Zhang, C., & Philip, S. Y. (2020). A comprehensive survey on graph neural networks. IEEE Transactions on Neural Networks and Learning Systems.
3. [Graph Nets library](https://github.com/deepmind/graph_nets)
4. [Deep Graph Library](https://www.dgl.ai)
5. [PyTorch Geometric](https://pytorch-geometric.readthedocs.io/en/latest/)
6. [A Comprehensive Survey on Graph Neural Networks](https://ieeexplore.ieee.org/abstract/document/9046288)
7. [Spatial Temporal Graph Convolutional Networks for Skeleton-Based ActionRecognition](https://arxiv.org/pdf/1801.07455.pdf)
8. [Diffusion Convolutional Recurrent Neural Network: Data-Driven Traffic Forecasting](https://arxiv.org/pdf/1707.01926.pdf)
9. [Structural-RNN: Deep Learning on Spatio-Temporal Graphs](https://openaccess.thecvf.com/content_cvpr_2016/papers/Jain_Structural-RNN_Deep_Learning_CVPR_2016_paper.pdf)
10. [Hero image](https://unsplash.com/photos/BW0vK-FA3eg)
11. [PinSage](https://medium.com/pinterest-engineering/pinsage-a-new-graph-convolutional-neural-network-for-web-scale-recommender-systems-88795a107f48)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
