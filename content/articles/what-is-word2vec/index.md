---
layout: engineering-education
status: publish
published: true
url: /what-is-word2vec/
title: What is Word2Vec?
description: In this article, we will explore a classic method that creates word embeddings in NLP. It assists computers to better understand human beings through natural language.
author: wilkister-mumbi
date: 2021-03-21T00:00:00-20:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/what-is-word2vec/hero.jpg
    alt: Word2vec example image
---
We want computers to understand us better so that they can do more for us. So, how can we make computers understand us better using natural language?
<!--more-->

### Table of contents
1. [Prerequisites](#prerequisites)
2. [Introduction](#introduction)
3. [What is Word2Vec?](#what-is-word2vec)
4. [Key takeaways](#key-takeaways)
5. [Wrapping Up](#wrapping-up)
6. [References and Further Reading](#references-and-further-reading)

### Prerequisites
Before reading this article, a reader should be familiar with basic Natural Language Processing (NLP) concepts.

### Introduction
Words play a vital role in our lives as human beings. We think, we edescribe the world around us, we communicate, and learn using words. As such, we have this intrinsic and innate ability as humans to understand words. But that's not an ability that computers share. 

That becomes a problem when we are developing systems that we want to integrate more closely into our world. We want computers to understand us better so that they can do more for us.

So, how can we make computers understand us better using natural language?

We know that computers are good at understanding numbers. They are good at taking large matrices and applying linear algebra to them. By converting words into vectors, we can make computers understand natural language words' meanings and contexts.

It turns out that the Word2vec algorithm can help us achieve this. 

### What is Word2Vec? 
Word2Vec is a classical method that creates word embeddings in the field of Natural Language Processing (NLP). It was developed by [Tomas Mikolov](https://en.wikipedia.org/wiki/Tomas_Mikolov) and his team at Google in 2013. Word2vec takes in words from a large corpus of texts as input and learns to give out their vector representation. 

In the same way CNNs extract features from images, the word2vec algorithm extracts features from the text for particular words. Using those features, word2vec creates vectors that represent a word in the vector space. These vectors are chosen using the cosine similarity function, which indicates the semantic similarity between words. 

Cosine similarity of 1 would mean that the angle between two words is 0; and would denote that the words are similar. Two similar words will occupy locations close to each other in that vector space, whereas words that are very different will occupy far away spaces. In that way, using its ability with linear algebra, the algorithm can recognize context and words that have similar meanings. 

For example, the words "intelligent" and "smart" would appear closer together in this vector space, whereas the words "engine" and "car" will be far from "intelligent" and "smart". This is because these words have that contextual understanding within a vector space.

#### Model Architecture

![Word2Vec model architecture](/engineering-education/what-is-word2vec/cbow-skipgram.PNG)

*[Image Source: Arxiv](https://arxiv.org/pdf/1301.3781.pdf)*

The algorithm uses a neural network architecture that consists of two learning models:

#### 1. Continuous Bag-of-Words model (CBOW)
In this approach, the model uses context words to predict the target words. The input may be a group of words or a single word. It predicts a missing word given a window of context words or word sequence.

Suppose we have the sentence:
An apple is green in color. If we remove the word "green" from the sentence and leave it blank, the model should predict the missing word.

It is referred to as the Bag of Words (BOW) model as the word order in history doesn't influence the outcome. Further denoting the BOW model as continuous, i.e., Continous Bag Of Words (CBOW), means that the model uses distributed representation of the context continuously.

The weight matrix between the projection layer and the input layer is also shared for all the word positions.

#### 2. Continuous skip-gram model 
The continuous skip-gram model works the other way around. It uses the target words to predict the context words. It involves training a neural network to learn the weights of the hidden layer. These learned weights correspond to the word vectors that we are trying to learn.

Given a specific word as its input, the model's goal is to look into the dictionary and pick a word whose context is closely related to the target word. 

For example, if you trained the model with the input word China, the output probability is going to be higher for words 
such as "Beijing" and "Shanghai" than for words such as "dog" as they are unrelated.

Besides, those far apart words are assigned fewer weights while the words that are closer together are assigned more weights.

#### Training
The system is trained using [backpropagation](https://en.wikipedia.org/wiki/Backpropagation) and [stochastic gradient descent](https://en.wikipedia.org/wiki/Stochastic_gradient_descent) to tune the weights and reduce the cost function. By doing so, those weights become the vectors for the words in question. 
 
### Key takeaways
1. The Continuous Bag-of-Words (CBOW) model uses context words to predict the target words. Conversely, the skip-gram model, uses the target words to predict the context words.
2. The Word2Vec algorithm causes words that have similar contexts to have similar vector embeddings (be closer together) and words that have different contexts to be far apart.
3. Skipgram is relatively slower than CBOW and usually works well with a large corpus of training data.
4. CBOW is faster to train than skip-gram. 

### Wrapping Up
I hope this article has been helpful to you. Word2vec has until recently been an extremely influential algorithm in NLP. However, as far as research is concerned, especially due to the rise of language models such as Google's [BERT](https://en.wikipedia.org/wiki/BERT_(language_model)) and [ELMo](https://allennlp.org/elmo) the influence of Word2vec has decreased. Despite this, it is still very relevant.

It is also important to note that Word2vec isn't the only word embedding model that works well. Stanford's [GloVe](https://en.wikipedia.org/wiki/GloVe_(machine_learning)) and Facebook's [FastText](https://fasttext.cc/) are examples of other popular word embedding models you can explore that also work well. 

Feel free to also have a read on them.

Happy coding.

### References and further reading
1. [Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/pdf/1301.3781.pdf)
2. [word2vec Parameter Learning Explained](https://arxiv.org/pdf/1411.2738.pdf)
3. [Tomas Mikolov](https://en.wikipedia.org/wiki/Tomas_Mikolov)
4. [GloVe](https://en.wikipedia.org/wiki/GloVe_(machine_learning))
5. [FastText](https://fasttext.cc/)
6. [BERT](https://en.wikipedia.org/wiki/BERT_(language_model))
7. [ELMo](https://allennlp.org/elmo)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)


