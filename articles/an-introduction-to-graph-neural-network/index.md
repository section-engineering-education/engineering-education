Over the years, Deep Learning (DL) has been the key to solving many machine learning problems in fields such as image processing, natural language processing, and games.
The data generated in the above-mentioned fields are represented in a Euclidean space. That is, spaces with a finite number of dimensions i.e. 2D or 3D spaces.
However, in most current applications, generated data is generated from non-Euclidean domains that represent data as graphs with relationships and mutual dependency between objects. A good example is e-commerce. The interaction between users and products can be exploited to make accurate recommendations. 
This has led to an increasingly growing interest in deep learning research that focuses on the structure of graph data.

In this article, we provide a comprehensive overview of:

1. What is a Graph?

2. What is Graph Neural Networks?

3. Graph Learning Python Libraries

4. Models of Graph Neural Networks

5. Applications of Graph Neural Networks


### Prerequisites

This article assumes a basic understanding of Machine Learning (ML) and Deep Learning (DL). For an introduction to ML and DL, feel free to check out my previous [article](/https://www.section.io/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning//) 

### What is a Graph?

In Computer Science, Graphs are data structures that model a set of objects and their relationships. These objects represent the nodes and the relationships represent edges. 

![A Graph data structure](/engineering-education/an-introduction-to-graph-neural-network/edges-links.png)

Let's assume a graph, G. This graph can be described by:
* V as the vertex set 
* E as the edges

Then,   G = (V,E)

It is important to note that the vertex, V, often refers to the nodes.

Let's take an example of a transportation system. This can be thought of as a graph. The locations in the system represent the vertice, V, and the connections between these locations representing the edges.

### What is Graph Neural Network (GNN)?

Graph Neural Networks is a technique in deep learning which extends existing neural networks for processing data on graphs. 

GNNs motivation stems from three areas of study:

* Convolution Neural Networks (CNN)
These are deep neural networks used to analyze image data. It is used to solve image processing tasks.

* Recurrent Neural Networks (RNN)
RNN is a type of neural network that passes information internally from one time step to the next to process a sequence. It's commonly used to solve Natural Language Processing (NLP) and speech recognition tasks.  

* Auto-Encoders (AE)
This is a type of Artificial Neural Network (ANN). It consists of an encoder, code, and a decoder. It encodes the representations of a set of data. It then decodes the reduced encoded data generating new data similar to that of its original input. 

Based on these three motivations, GNNs can collectively combine information from the graph structure.

Common applications of GNN are in node classification, link prediction, and graph classification. 

In **node classification**, every node in the network is assigned a label. The network can classify new nodes introduced without the ground truth.
In **link prediction**, the goal is to  predicts the likelihood of two nodes being inter-linked.
In **graph classification**, the idea is to classify graphs into different classes. This is related to image classification but the target changes into classifying graphs rather than images.

### Graph Learning Python Libraries

Don't know where to start?

Well. Several freely available tools will let you start working on your project using GNN. 

The top three libraries include:

1. PyTorch Geometric

It has the latest types of Graph Networks already built in for you. This graph networks are available as single line functions that are ready to be called in the PyTorch library. 

Read more about it [here](/https://pytorch-geometric.readthedocs.io/en/latest/) 

2. Graph Nets

It is a python library created by DeepMind Technologies. It helps build graph networks in platforms such as TensorFlow and Sonnet.
This library provides a lot of documentation and ready-made collab notebooks to showcase how to use their graph network library.

However, it is important to note that their code isn't beginner-friendly when compared to the other two libraries. It is not advisable to start with this library.

Learn more about it [here](/https://github.com/deepmind/graph_nets/)

3. Deep Graph Library (DGL)

DGL was created by the Distributed Machine Learning community on GitHub. This platform has readable code, maintained, and cross-platform.

DGL is the top pick for beginners.

Learn more about it on their official [website](/https://www.dgl.ai/)

### Models of Graph Neural Networks

GNNs models can be categorized into four groups:

#### Recurrent Graph Neural Networks (RecGNNs)

The earliest studies of Graph Neural Networks fall under this model.

These neural networks aim to learn node representations using Recurrent Neural Networks (RNNs). RecGNNs work by assuming that nodes in the graph exchange messages (message passing) constantly. This exchange continues until a stable equilibrium is achieved.  

#### Convolutional Graph Neural Networks (ConvGNNs)

ConvGNNs work by generalizing operations of convolution from grid data to graph data. In comparison to RecGNN, ConvGNN employs many layers of graph convolutions. This helps to extract high-level node representations.

ConvGNNs set the base for building other GNN models.

#### Graph Auto-Encoders (GAEs)

GAEs are deep neural networks that learn to generate new graphs. They map nodes into latent vector spaces. Thereafter, reconstruct graph information from latent representations. 

They are used to learn the embedding in networks and the generative distribution of graphs. 

#### Spatial-Temporal Graph Neural Networks (STGNNs)

The idea behind these networks is to simultaneously consider spatial and temporal dependencies. In the current research, graph convolutions are used to capture the spatial dependency while CNNs or RNNs are used for temporal dependence. 

STGNNs are applied in: 

1. [Human action recognition](/https://arxiv.org/pdf/1801.07455.pdf/) 
2. [Traffic speed forecasting](/https://arxiv.org/pdf/1707.01926.pdf/) 
3. [Driver maneuver anticipation](/https://openaccess.thecvf.com/content_cvpr_2016/papers/Jain_Structural-RNN_Deep_Learning_CVPR_2016_paper.pdf/)  

For more details about these models, feel free to read this [paper](/https://ieeexplore.ieee.org/abstract/document/9046288/) 

### Applications of Graph Neural Networks

#### Computer Vision

GNNs have been applied to solve computer vision problems in areas such as:

1. Scene graph generation
The goal of this model is to separate an image into a semantic graph consisting of objects and their semantic relationships.

2. Point clouds' classification
These are sets of 3-D data points in space. They are commonly recorded using LiDAR scans. They convert point clouds into k-nearest neighbor graphs. They then use ConvGNNs to explore their topological structures.

3. Action recognition 
STGNN is applied to learn human action patterns. They detect the locations of human joints in videos. Naturally, human joints form a graph as they are linked by skeletons. 

#### Recommendation Systems

In graph-based recommendation systems, users and items are regarded as the nodes in the network.
These systems leverage a couple of relationships in order to produce quality recommendations.
These include:
* Users to users relationship
* Items to items relationship
* Users to items relationship

The goal of the system is to tell the importance of an item to a user. This can be regarded as a link prediction problem. To find and predict the missing links between users and product items.

#### Natural Language Processing (NLP)

In NLP, GNNs have been used for text classification. They utilize the mutual relationship between words in documents to work out the labels in documents. 

#### Traffic Systems

In smart transportation systems, STGNNs are deployed to solve the traffic prediction problem.
This is essential in a smart transportation system as there is a need for an accurate estimation of the traffic volume, speed, and density of roads.

STGNN considers the traffic network as a spatial-temporal graph. The nodes are represented by the various wireless sensors installed on the roads. The edges are represented by the measured distance between pairs of nodes.

GNNs have also been used together with Long Short Term Memory (LSTM) and CNN to forecast the number of taxi demands in a particular location within a time interval. It takes into account past taxi demands, weather data, and location information. 

#### Chemistry

In chemistry, GNN is applied to study the graph structure of molecules. In these molecules, atoms are considered as the nodes and the chemical bonds between these atoms considered the edges.

### Conclusion

To sum up, this article only scratches the surface of Graph Neural Networks (GNN). The article discusses some of the popular graph learning libraries, the various GNN models currently available, and the use cases for GNN. 

To learn more about Graph Neural Networks, please read this comprehensive survey [paper](/https://ieeexplore.ieee.org/abstract/document/9046288/)

### References

1. Zhou, J., Cui, G., Zhang, Z., Yang, C., Liu, Z., Wang, L., & Sun, M. (2018). Graph neural networks: A review of methods and applications. arXiv preprint arXiv:1812.08434.
2. Wu, Z., Pan, S., Chen, F., Long, G., Zhang, C., & Philip, S. Y. (2020). A comprehensive survey on graph neural networks. IEEE Transactions on Neural Networks and Learning Systems.
3. [Graph Nets library](/https://github.com/deepmind/graph_nets/)
4. [Deep Graph Library](/https://www.dgl.ai/)
5. [PyTorch Geometric](/https://pytorch-geometric.readthedocs.io/en/latest//) 
6. [A Comprehensive Survey on Graph Neural Networks](/https://ieeexplore.ieee.org/abstract/document/9046288/)
7. [Spatial Temporal Graph Convolutional Networks for Skeleton-Based ActionRecognition](/https://arxiv.org/pdf/1801.07455.pdf/) 
8. [Diffusion Convolutional Recurrent Neural Network: Data-Driven Traffic Forecasting](/https://arxiv.org/pdf/1707.01926.pdf/)
9. [Structural-RNN: Deep Learning on Spatio-Temporal Graphs](/https://openaccess.thecvf.com/content_cvpr_2016/papers/Jain_Structural-RNN_Deep_Learning_CVPR_2016_paper.pdf/) 
10. [Hero image](/https://unsplash.com/photos/BW0vK-FA3eg/)

