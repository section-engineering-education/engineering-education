---
layout: engineering-education
status: publish
published: true
url: /understanding-embeddings-in-machine-learning/
title: Understanding Embeddings in Machine Learning
description: This article will look at embeddings in detail and solve real-world problems involving complex data using machine learning.
author: lilian-ogoti
date: 2022-02-28T00:00:00-12:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-embeddings-in-machine-learning/hero.jpeg
    alt: Embeddings in Machine Learning hero image
---
Handling non-numerical data poses challenges to data scientists. The reason is that most machine learning models tend to prefer working with numbers. Data that contains words, sentences, graphs, lists, and probability distributions are complex. A machine learning model cannot handle such data.
<!--more-->
Yet, it is impossible to avoid complex data in the real world. Thus, complex data needs to first be transformed into [vector spaces](https://machinelearningmastery.com/a-gentle-introduction-to-vector-space-models/).

Existing approaches are not helpful and/or applicable. They tend to have flaws when transforming the data. A better approach would be to use [embeddings](https://towardsdatascience.com/neural-network-embeddings-explained). These are a low-dimensional representation of high-dimensional data. This article will look at embeddings in detail and how they solve problems with complex data.

### The concept of embedding in data transformation
The concept of embeddings is dependent on machine learning models. This means the requirements of the machine learning models have to be known first. Machine learning algorithms only accept low-dimensional data as the inputs. Each input feature in a neural network is a number. This means every non-numeric variable must be converted into numbers and vectors.  

For instance, variables such as users and items in [recommender systems](https://www.analyticssteps.com/blogs/what-are-recommendation-systems-machine-learning) are non-numeric. We can use the product ID to represent the items. However, to achieve this, we have to treat the ID as the continuous numeric variable, as it is in neural networks. It would imply that the higher numbers are more significant than the lower numbers.

The same applies to similar numbers, where the same numbers represent the same items. The analogy makes sense for variables like age. However, it is impossible to represent [categorical variables](https://www.sciencedirect.com/topics/mathematics/categorical-variable). Before embeddings, the method used to represent categorical variables was [one-hot encoding](https://machinelearningmastery.com/how-to-one-hot-encode-sequence-data-in-python/). We will discuss it in the following section.

### Understanding One-Hot encoding
It is an unsupervised technique that represents categorical variables. This is through mapping them to a vector to generate a binary. One will need to create a vector of the same size as the number of categories while all the values have been set to 0. Then the rows could be set to 1. 

This technique transforms categorical variables into continuous variables. As a result, many zeros and ones are produced. Due to this, an issue arises with the unmanageable number of dimensions. This is especially the case where the variables have a variety of unique characters. The main reason is that each item in the vector space is equally distanced and impossible to compare. 

Besides, we cannot compare the categories with differences in variance in vector space. This, in turn, means it is not possible to determine whether the entities are related to each other. The illogical extensive manual labeling has to be done. This is to generate one-to-one mappings and grouping to look for similarities.

When solving this issue, the categorical variables must be well represented. Also, the information relationship between the items must be maintained. Furthermore, the number of categorical variables has to be reduced. This helps to keep the items of the categories compact. The following section explains how to use embeddings to solve the encoding problem.

### Use of embeddings in solving an encoding problem
Embeddings represent data from the object as numbers. The vector space measures the similarities in the categories. The vectors are said to be similar if they neighbor one another. 

Embeddings can be combined to work alongside other models in an online store. The models can use the same learnings for the same items. Thus, embeddings become useful in down-streaming the models and representing the sparse data. 

On the downside, embeddings are complex to understand. They also consume much computing resources compared to one-hot encodings.

### Creating embeddings
Before creating embeddings, it is important to have a supervised ML model well-defined. The model must be trained to transform the categories into vectors. For instance, we can assume a model that tells the type of meal the person will take based on their preferred meals. 

We can then create a model that will take our data as the input and transform it into a vector. Then the vector will predict the meal the person will take next. This implies that similar vectors refer to the meal taken frequently. The representation can be used for customization. 

In this case, we use embeddings to solve a supervised problem. However, it is better to note that creating an embedding can be an unsupervised problem.

### Commonly used models in embeddings
#### PCA
[PCA](https://www.keboola.com/blog/pca-machine-learning) method is used to reduce the variables into small subsets to shrink the size of an entity. We can take a case of a word embedding, assuming we are using the pre-trained model. We can map each word into embedding space using its vector representation. 

However, word embeddings tend to have high dimensions. This means that words cannot be visualized on how they occupy the embedding space. With the PCA method, the dimensionality of a given word embedding is reduced. PCA achieves this by combining all the variables. It then drops the least important variables and retains the valuable variables parts. Then, the resulting word embedding can be visualized either in 2D or 3D based on user preferences. 

This method makes the variables complex to understand, which may cause data loss. However, it makes the model efficient.

#### Singular Value Decomposition (SVD)
This technique uses matrix factorization to minimize the data set size. For instance, we can take an example of a user's video ratings that can be represented as a matrix. We can calculate the size of the matrix by using the formula: [the number of items] multiplied by the [number of users]. Here, each cell value represents each video rating the user gave. 

We can then let the letter `K` be our vector size, and we will be able to divide our matrix into two with [SVD](https://towardsdatascience.com/understanding-singular-value-decomposition-and-its-application-in-data-science-388a54be95d). The first matrix equals (the number of items) multiplied by `K`. The second is `K` multiplied by the (number of users).

Multiplying the user vector with the item vector produces the predicted user rating. Then, if we multiply the user vector matrix with the item vector matrix, the result will be the initial matrix. However, it will be combined with the predicted ratings. So, we can deduce that many items with the same vectors will give the same ratings from similar users. Finally, we can develop both item and user embeddings.

#### Word2Vec
Word2vec creates embeddings from the words, where words are transformed into one-hot vectors. They are transferred to a hidden layer where hidden weights are produced. The hidden weights play a role in predicting other neighboring similar words. 

Also, hidden weights play a role in training a model. However, [word2vec](https://towardsdatascience.com/introduction-to-word-embedding-and-word2vec-652d0c2060fa) does not use them for the task but returns them as embeddings when the model is no longer used.

A challenge when using the word2vec technique is that a word is only mapped to a single vector. It implies that the use of that particular word is only restricted to one representation. A good example will be a word like `sing` used in two different sentences as `I am going to sing` and `I want to sing`. The two sentences will have the exact embeddings regardless of the context used.

#### BERT
It is a pre-trained model designed to solve Word2vec's context problems. The training of this model involves two steps. The first step involves training the model over a huge amount of data to generate embeddings. The end-users perform the second training. It involves training the model using a massive amount of data based on their contexts.

[BERT](https://towardsdatascience.com/bert-explained-state-of-the-art-language-model-for-nlp-f8b21a9b6270) pays attention to the word context before even creating an embedding. Like in the previous example, the word `sing` will have different embeddings. Therefore, this technique is a preferred model for generating text embeddings.

### Examples of embeddings in the modern applications
The applications of embeddings were first started and tested in the laboratories. However, it is being adopted in different production systems as it advances and improves. Some of these fields include:

#### Recommender systems
This system suggests different products to users based on their ratings and preferences. We follow two approaches when building embeddings in these kinds of systems. These are the [content-based approach](https://towardsdatascience.com/introduction-to-recommender-systems-1-971bd274f421) and the [collaborative filtering](https://developers.google.com/machine-learning/recommendation/collaborative/basics) approach. In collaborative filtering, the system is trained by actions to give recommendations. These systems make use of embeddings to give out recommendations.

In the previous SVD example, we saw that the multiplication of item and user embedding gives a rating prediction. It shows that products and their users are related. Thus, we can conclude that the same items will get the same ratings from the same users.

#### Semantic search
The search boxes should give more relevant results than using regular expressions only. They should predict the intention and query context of the users rather than using words.

Earlier in the day, search queries used the [TF-IDF](https://monkeylearn.com/blog/what-is-tf-idf/) algorithm. It used to look for document embeddings same as the NN algorithm's query text. Nowadays, semantic search has improved and advanced. It uses better and uses techniques such as BERT in its query.

#### Computer vision
In this field, embeddings assist in switching between different contexts. For instance, we can take a case of training a self-driving car. The image captured by the car is converted into an embedding. The car system can decide which action to take depending on the embedded context. 

It is possible to take a generated image from a video game like GTA. The image can be transformed to create an embedding in the same vector space. It can then assist in training the driving model without using costly authentic images. An excellent example of this technique is Tesla.

### Common embedding operations
There are operations applied to embeddings for them to work. Some of these operations include:

#### Averaging
In the word2vec technique, embeddings are created for individual words. However, at times we may need the embeddings for the entire sentence. Again, it is possible to predict the items the user has recently checked in a recommender system. However, their user embeddings may need to be trained again if it has not happened recently. It is possible to compute a higher-level embedding in these kinds of scenarios. This is possible by averaging the existing embeddings. 

For instance, we can take the average embeddings of every word to end up with the sentence embeddings. The same applies to the recommender system. We can create a user embedding by averaging the items checked recently.

#### Addition/subtraction
It is possible to use an analogy from the word embeddings using the differences in their vectors. These vector differences help in performing several tasks. 

For instance, it is possible to average the differences between an expensive car and a cheap car. Then data can be stored and used whenever a system needs to recommend an expensive brand to the user. The brand can be the same as the current brand, based on what the user is searching for.

#### Nearest Neighbor (NN)
NN is the most valuable operation in embeddings. Its purpose is to look for the same items as the current item embedding. For instance, we can have a user embedding to predict items that the users prefer in a recommender system. Also, in search bars, we can have document embedding that gives search results close to the query text.

[NN](https://www.sciencedirect.com/topics/mathematics/nearest-neighbor-method) technique is a very complex operation in computations. We can compute NN as `O(N*K)`, where `N` represents the number of items and `K` represents the size of each embedding. We only need the approximation when computing the nearest neighbor in most cases. So, we can use the [Approximate Nearest Neighbor](https://neo4j.com/docs/graph-data-science/current/alpha-algorithms/approximate-nearest-neighbors/) (ANN) to reduce the NN algorithm complexity. 

### Conclusion
Embeddings are growing and impacting the machine learning and data science space. More research is drawn to make embeddings applicable in production systems. They have made significant improvements and impacts to NLP and recommender systems. Embeddings have all it takes to be the future of the machine learning infrastructure.

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
