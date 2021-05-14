---
layout: engineering-education
status: publish
published: true
url: /meta-learning/
title: An Overview of Meta-Learning
description: This article will provide an overview on meta-learning. Techniques like meta-learning contribute to the quest to achieve artificial general intelligence. They move artificial intelligence closer to emulating how humans learn and solve problems.
author: collins-ayuya
date: 2021-01-13T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/meta-learning/hero.jpg
    alt: Meta-learning Machine Learning image example
---
The application of machine learning to real-world problems is a very involving task for data scientists. For instance, they need to assess algorithms and tune many parameters. This may be based on their experience, biases, or assumptions.
<!--more-->
Machine learning may be used to learn the most suitable parameters and algorithms for a given task to automate this process. They implement meta-learning to achieve this automation.

### Contents
1. Introduction to Meta-Learning
2. Steps involved in Meta-Learning
3. Meta-Learning Approaches

### Prerequisites
To fully appreciate this article, I recommend having a grasp on the basic concepts of [machine learning](/supervised-learning-algorithms/) and [deep learning](/introduction-to-deep-learning/).

### Meta-Learning
Very simply defined, meta-learning means learning to learn. It is a learning process that applies to understand algorithms to metadata. Metadata is data that describes other data. Traditional machine learning has us use a sizeable dataset exclusive to a given task to train a model. 

This is a very involving process. It contrasts with how humans take in new information and learn new skills. Human beings do not need a large pool of examples to know. We learn very quickly and efficiently from a handful of examples. Taking inspiration from how human beings learn, meta-learning attempts to automate traditional machine learning challenges. It seeks to apply machine learning to learn the most suitable parameters and algorithms for a given task.

A hypothesis space may be defined as a set of all hypotheses that may be returned by a machine learning model. Meta-learning impacts the hypothesis space for learning algorithms. This might be through the tuning of hyperparameters or the selection of features. It may also change an algorithm's learning rules by altering how the algorithm searches the hypothesis space. We shall better understand meta-learning in the later sections of this article by exploring this technique's approaches.

### Steps
**Inclusion of a learning algorithm:** A learning algorithm is critical in the process of "learning how to learn". The learner is used to learn the optimal parameters as well as algorithms for a given task. To carry out meta-learning, we need such a learning algorithm.

**Dynamic inductive bias:** Inductive bias is the set of assumptions a learning algorithm uses to make predictions. This is when the algorithm is given inputs it has never come across. Dynamic bias induction refers to where bias is constructed as a function of the learning task. This simply means that the inductive bias of a learner is altered to match a given task. Essential aspects of the learner can be changed to achieve a dynamic inductive bias. These aspects include the representation of the hypothesis or parameters.

**Extracting insights from Metadata:** Metadata is a set of data that describes other data. We could call it data about data. In the context of meta-learning, it is made up of knowledge of prior learning experiences. This helps the development of a hypothesis for a new task.

### Approaches to meta-learning algorithms
Various literature details different kinds of approaches to meta-learning. We cover three approaches in this section.

#### Optimized meta-learning
A [hyperparameter](https://en.wikipedia.org/wiki/Hyperparameter_(machine_learning)) is a parameter whose value is used to control the learning process. It is a parameter that is defined before the start of the learning process. Hyperparameters have a direct impact on the quality of the training process. Hyperparameters can be tuned. An example of a hyperparameter is the number of branches in a decision tree.

A good number of machine learning models have many hyperparameters that are optimizable. We mentioned that hyperparameters have a great impact on the training process. It means that the process of choosing hyperparameters dramatically affects how well an algorithm learns.

However, with the ever-increasing complexity of models, more so neural networks, a challenge arises. The complexity of models makes them increasingly difficult to configure. Consider a neural network. Human engineers can optimize a few parameters for configuration. This is done through experimentation. Yet, deep neural networks have hundreds of hyperparameters. Such a system has become too complicated for humans to optimize fully.

There exist many ways to optimize hyperparameters. We shall give a simple definition of a couple of methods and cover them in detail in a future article.

**Grid Search:** This method makes use of manually predetermined hyperparameters. The group of predetermined parameters is searched for the best performing one. Grid search involves the trying of all possible combinations of hyperparameter values. The model then decides the best-suited hyperparameter value. However, this method is referred to as traditional since it is very time consuming and inefficient.

**Random Search:** Grid search is an exhaustive method. It involves the tying of all possible combinations of values. The random search method replaces this exhaustive process with a random search. The model makes random combinations and attempts to fit the dataset to test for accuracy. Since the search is random, there is a possibility that the model may miss a few potentially optimal combinations. On the upside, it uses much less time compared to grid search and often gives ideal solutions. Random search can outperform grid search. This is under the condition that a few hyperparameters are required to optimize the algorithm.

We shall cover these two and other methods of optimization in a different article. But for now, to learn more about grid search and random search, check out this [conceptual guide](https://medium.com/@jackstalfort/hyperparameter-tuning-using-grid-search-and-random-search-f8750a464b35) to hyperparameter tuning.

#### Few-shot meta-learning
Deep learning algorithms are great at carrying out one task by using a sizeable dataset. Even so, it is desirable to be able to train a neural network to learn multiple tasks using a handful of data examples per task. Few-shot meta-learning algorithms help us fulfill this desire.

The purpose of few-shot meta-learning is to train a model that can rapidly adapt to a new task. This is to be achieved using a handful of data points and iterations in training. A meta-learning stage is used to train a model on a given number of tasks. The expectation is that the trained model will quickly adapt to new tasks with a few trials or training examples. Entire tasks are taken as training examples in meta-learning.

An example of few-shot meta-learning is the use of [memory-augmented neural networks](http://proceedings.mlr.press/v48/santoro16.pdf).

[Gradient descent](https://ml-cheatsheet.readthedocs.io/en/latest/gradient_descent.html#:~:text=Gradient%20Descent.%20Gradient%20descent%20is%20an%20optimization%20algorithm,descent%20to%20update%20the%20parameters%20of%20our%20model.) minimizes a given function by moving towards the direction of the steepest descent iteratively. It is used to update the parameters of a model. Traditional gradient descent networks need tons of data to learn. The training process is extensive and iterative. The models have to learn their parameters again to quickly add new information when exposed to new data. This is a very inefficient process.

Compared to conventional models, neural networks with augmented memory capacities can speedily encode and get new information. Memory-augmented neural networks can make sense of new data. They can leverage the data to produce highly accurate predictions. This is using only a few training examples. An example of architecture with augmented memory is the [Neural Tuning machine](https://towardsdatascience.com/hands-on-memory-augmented-neural-networks-implementation-part-one-a6a4a88beba3#:~:text=Memory-augmented%20Neural%20Network%20%28MANN%29%2C%20which%20is%20extensively%20used,new%20addressing%20schema%20called%20least%20recently%20used%20access.). Neural Tuning Machine refers to an algorithm with the ability to store and get information from memory. The NTM augments a neural network with external memory. The link above provides a detailed description of NTM architecture.

#### Model agnostic meta-learning
[Model agnostic meta-learning (MAML)](https://www.borealisai.com/en/blog/tutorial-3-few-shot-learning-and-meta-learning-ii) refers to a framework that applies to any model that is trained using gradient descent. We can argue that this is similar to or a variation of few-shot meta-learning. Like few-shot meta-learning, the goal is to learn a general model that can simply undergo fine-tuning for several different tasks. This includes a scenario where training data is insufficient. Let's visualize the MAML framework.

![maml](/engineering-education/meta-learning/maml.png)

*MAML approach*

[Source](https://arxiv.org/pdf/1703.03400.pdf)

From the image, the symbol theta represents the parameters of the model. The thick black line represents the meta-learning stage. If we have tasks 1, 2, and 3 that differ from each other, a gradient step is taken for the three of them. The grey lines represent this.

MAML gives a good [initialization](https://www.deeplearning.ai/ai-notes/initialization/) of the parameters of a model. As a result, attaining quick and optimal learning on a new task with a handful of gradient steps. More on model-agnostic meta-learning can be found in this [paper](https://arxiv.org/pdf/1703.03400.pdf). The paper also offers an in-depth explanation of the image above.

### Wrapping up
Techniques like meta-learning contribute to the quest to achieve artificial general intelligence. They move artificial intelligence closer to emulating how humans learn and solve problems. Meta-learning aims to make it easy for algorithms to not only learn better but also perform better. 

This makes the machine learning process easier for data scientists. The algorithm can, for instance, tune its hyperparameters. We have covered a general overview of meta-learning. Some concepts shall be covered in more detail in follow-up articles. Until then, happy reading!

### References and further reading
1. [Meta-Modelling Meta-Learning](https://medium.com/datathings/meta-modelling-meta-learning-34734cd7451b)

2. [Meta-Learning: Learning to Learn Fast](https://lilianweng.github.io/lil-log/2018/11/30/meta-learning.html)

3. [What is Meta-Learning?](https://hub.packtpub.com/what-is-meta-learning/)

4. [What Is Meta-Learning in Machine Learning?](https://robotronblog.com/2017/10/25/what-is-meta-learning-in-machine-learning/)

5. [Learning to learn Artificial Intelligence | An overview of Meta-Learning](https://www.geeksforgeeks.org/learning-to-learn-artificial-intelligence-an-overview-of-meta-learning/)

6. [What is Model-Agnostic Meta-learning (MAML) ?](https://towardsdatascience.com/model-agnostic-meta-learning-maml-8a245d9bc4ac)

7. [Model-Agnostic Meta-Learning for Fast Adaptation of Deep Networks](https://arxiv.org/pdf/1703.03400.pdf)

8. [Meta-Learning with Memory-Augmented Neural Networks](http://proceedings.mlr.press/v48/santoro16.pdf)

9. [Understanding Few-shot intelligence as a Meta-Learning Problem](https://codeburst.io/understanding-few-shot-intelligence-as-a-meta-learning-problem-7823a4cd4a0c)
---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
