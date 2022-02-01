---
layout: engineering-education
status: publish
published: true
url: /understanding-embeddings-in-machine-learning/
title: Understanding embeddings in Machine Learning
description: This article will look at embeddings in detail and solve real-world problems involving complex data.
author: lilian-ogoti
date: 2022-01-29T00:00:00-07:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-embeddings-in-machine-learning/hero.jpeg
    alt: Understanding embeddings in Machine Learning hero image
---
Handling non-numerical data poses challenges to data scientists since most machine learning models tend to prefer working with numbers. 
<!--more-->
Data that contains words or sentences, graphs, lists, and probability distributions tend to be more complex to deal with when it comes to machine learning. However, it is impossible to avoid such data in the real world and hence needs first to be transformed into [vector space](https://machinelearningmastery.com/a-gentle-introduction-to-vector-space-models/).

Existing approaches are not helpful and applicable as they tend to have flaws when transforming the data. A better approach would be to use [embedding](https://towardsdatascience.com/neural-network-embeddings-explained), a low dimensional representation of high dimensional data. The article will look at embeddings in detail and solve real-world problems involving complex data.

### The concept of embedding in data transformation
The concept of embeddings is highly dependent on machine learning models. To grasp the concept better, we must first know the requirements of the machine learning models. One of the most common features of machine learning algorithms is that they only accept low-dimensional data as their inputs. Each input feature in a neural network is a number meaning that non-numeric variables must be converted into numbers and vectors.  

For instance, variables such as users and items in [recommender systems](https://www.analyticssteps.com/blogs/what-are-recommendation-systems-machine-learning) are non-numeric. We can use the product ID to represent the items. However, to achieve this, we have to treat the ID as the continuous numeric variables the way it is done in neural networks. It would imply that the higher numbers are more significant than the lower numbers.
The same happens with similar numbers, assuming the same numbers represent the same items. The analogy makes sense for variables like age. However impossible to represent [categorical variables](https://www.sciencedirect.com/topics/mathematics/categorical-variable). Before using embeddings, one of the commonly used methods to represent categorical variables was called [one-hot encoding](https://machinelearningmastery.com/how-to-one-hot-encode-sequence-data-in-python/), as discussed in the following section.

### Understanding One-Hot encoding
It refers to an unsupervised technique that represents categorical variables by mapping them to a vector to generate a binary. The process was easy as it would need one to create a vector of the same size as the number of categories while all the values have been set to 0. Then the rows could be set to 1. 

Since the technique transforms categorical variables into continuous variables, many zeros and ones will be produced. Due to this, an issue of the unmanageable number of dimensions arises, especially where the variables have a variety of unique characters. The main reason is that each item in the vector space is equally distanced and impossible to compare. In addition, there is no way to compare the categories with differences in variance when it comes to vector space. This, in turn, means it is not possible to determine whether the entities are related to each other. Extensive manual labeling that is not logical has to be done to generate one-to-one mappings and grouping, looking for similarities.

To solve the issue above, the categorical variables must be represented well and keep the relationship information between the items. Also, categorical variables have to be minimized to keep the items of the same categories packed together. The following section explains how we can use embeddings to solve this encoding problem.

### Use of embeddings in solving an encoding problem
Embeddings represent data from the object as numbers. The vector space measures the similarities in the categories. The vectors are said to be similar if they neighbor one another. 

Embeddings can be combined to work alongside other models in an online store. The models can use the same learnings between the same items instead of handling them as different separate categories. Therefore, embeddings become useful in downstreaming the models and representing the sparse data. On the downside, embeddings are complex to understand and require more computing resources compared to one-hot encodings.

### Creating embeddings
Before building embeddings, it is essential to have a supervised ML model well defined. This means that the model must be trained to transform the categories into vectors. For instance, we can assume a model that tells the type of meal the person will take based on their previous meals preferences. We can then create a model that will take our data as the input and transform it into a vector. Then the vector will predict the meal the person will take next. This implies that similar vectors refer to the meal taken frequently. The representation can be used for customization. In our case, we have used embeddings to solve a supervised problem. However, it is better to note that creating an embedding can be an unsupervised problem.

### Commonly used models in embeddings
#### PCA
[PCA](https://www.keboola.com/blog/pca-machine-learning) method is used to reduce the variables into small subsets to minimize the size of an entity. We can take a case of a word embedding assuming we are using the pre-trained model. Each word would be mapped into embedding space using its vector representation. However, word embeddings tend to have high dimensions meaning that words cannot be visualized on how they occupy the embedding space.
With PCA method, the dimensionality of a given word embedding is reduced. The technique achieves this by combining all the variables then dropping the least important ones while still retaining the valuable parts of the variables. Then the resulting word embedding can be visualized either in 2D or 3D based on user preferences. 
This method makes the variables complex to understand, which may cause data loss; however, it makes the model efficient.

#### Singular Value Decomposition (SVD)
This technique uses matrix factorization to minimize the data set size. For instance, we can take an example of a user's video ratings that can be represented as a matrix. We can calculate the size of the matrix by using the formula: [the number of items] multiplied by the [number of users]. Here each cell value represents each video rating the user gave. We can then let the letter `K` be our vector size, and we will be able to divide our matrix into two with [SVD](https://towardsdatascience.com/understanding-singular-value-decomposition-and-its-application-in-data-science-388a54be95d). The first matrix will appear as [the number of items] multiplied by `K`, and the second is `K` multiplied by the [number of users].

Multiplying the user vector with the item vector is the predicted user rating. Then if we multiply both the user vector matrix and the item vector matrix, the result will be the original matrix. However, it will be combined with the predicted ratings. Therefore we can deduce that multiple items with the same vectors will give the same ratings from similar users. Finally, we have been able to develop both item and user embeddings.

#### Word2Vec
This technique creates embeddings from the words, whereby the words are transformed into one-hot vectors. They are transferred to a hidden layer where hidden weights are produced. The hidden weights play a role in predicting other neighboring similar words. Also, hidden weights play a role in training a model. However, [word2vec](https://towardsdatascience.com/introduction-to-word-embedding-and-word2vec-652d0c2060fa) does not utilize them for that task but returns them as embeddings when the model is no longer used.

A challenge experienced when using the word2vec technique is that a word is only mapped to a single vector. This implies that the use of that particular word is only restricted to one representation. A good example will be a word like `sing` used in two different sentences as `I am going to sing` and `I want to sing`, and the two will have the exact embeddings regardless of the context they have been used in.

#### BERT
It is a pre-trained model designed to solve Word2vec's context problems. The training of this model involves two steps. The first step involves training the model over a massive amount of data to generate embeddings. End-users perform the second training, and it involves training the model using a massive amount of data based on their contexts.

[BERT](https://towardsdatascience.com/bert-explained-state-of-the-art-language-model-for-nlp-f8b21a9b6270) pays attention to the word context before even creating an embedding. Like in the previous example, the word `sing` will have different embeddings. Therefore this technique is a preferred model for generating text embeddings.

### Examples of embeddings in the modern applications
The applications of embeddings were first started and tested in the laboratories. However, they have started being adopted in different production systems with more advancement and improvements. Some of these fields include:

#### Recommender systems
This system suggests different products to the users based on their ratings and preferences. To implement embeddings in these kinds of systems, two approaches are followed: the [content-based approach](https://towardsdatascience.com/introduction-to-recommender-systems-1-971bd274f421) and the [collaborative filtering](https://developers.google.com/machine-learning/recommendation/collaborative/basics) approach. In collaborative filtering, the system is trained by actions to give the preferred recommendations. These systems make use of embeddings to give out recommendations.

In the SVD example we earlier highlighted, we noticed that if we multiply both item and user embeddings, we end up with a rating prediction. This shows that products and their users are closely related, and thus we can conclude that the same items will get the same ratings from the same users.

#### Semantic search
The search boxes in a given system should give more relevant results than just using regular expressions. They should tend to predict the intention and query context of the users rather than just using words. 

Earlier in the day, search queries used the [TF-IDF](https://monkeylearn.com/blog/what-is-tf-idf/) algorithm, which worked by looking for document embeddings similar to the NN algorithm's query text. Nowadays, semantic search has improved and advanced. It uses better and uses techniques such as BERT in its query.

#### Computer vision
In this field, embeddings assist in switching between different contexts. For instance, we can take a case of training a self-driving car. The image captured by the car is converted into an embedding. The car system can decide which action to take depending on the embedded context. It is possible to take a generated image from a video game like GTA. The image can be transformed to create an embedding in the same vector space and assist in training the driving model with no need to use the costly authentic images. An excellent example of this technique is Tesla.

### Common embedding operations
In the above applications of embeddings in the real world, it is possible to notice that operations are applied to embeddings for them to work. Some of these operations include:

#### Averaging
In the word2vec technique, embeddings are created for individual words. However, at times we may require the embeddings for the entire sentence. Again, it is possible to predict the items the user has recently checked in recommender systems. However, their user embeddings may need to be trained again, which might not have happened recently. It is possible to compute a higher-level embedding in these kinds of scenarios. This is achieved by averaging the existing embeddings. 

For instance, we can take the average embeddings of every word to end up with the sentence embeddings. The same applies to the recommender system, where we can have a user embedding by taking the average of the items that have been checked recently.

#### Addition/subtraction
It is possible to use an analogy from the word embeddings using the differences in their vectors. These vector differences help in performing several tasks. For instance, it is possible to average the differences between an expensive car and a cheap car. Then data can be stored and used whenever a system needs to recommend an expensive brand to the user that is the same as the current brand, based on what the user is searching for.

#### Nearest Neighbor (NN)
This is the most valuable operation in embeddings. Its purpose is to look for the same items as the current item embedding. For instance, it is possible to have a user embedding that predicts the items that the user may prefer in recommender systems. Also, in search bars, it is possible to have document embedding that gives search results close to the query text.

[NN](https://www.sciencedirect.com/topics/mathematics/nearest-neighbor-method) technique is a much complex operation in computations. NN can be computed as `O(N*K)`, where `N` represents the number of items and `K` represents the size of each embedding. Typically, we only need the approximation when computing the nearest neighbor. Therefore, in most cases, we prefer using the [Approximate Nearest Neighbor](https://neo4j.com/docs/graph-data-science/current/alpha-algorithms/approximate-nearest-neighbors/) (ANN) to reduce the computational cost involved with the NN algorithm. 

### Conclusion
Embeddings are gradually growing and impacting the machine learning and data science space. More research is drawn to make embeddings applicable in production systems. They have made significant improvements and impacts to NLP and recommender systems. Embeddings have all it takes to become the future of the machine learning infrastructure.

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
