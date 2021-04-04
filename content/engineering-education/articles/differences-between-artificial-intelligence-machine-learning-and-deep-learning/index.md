---
layout: engineering-education
status: publish
published: true
url: /engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/
title: Differences between Artificial Intelligence, Machine Learning, and Deep Learning
description: This article explores Artificial Intelligence, Machine Learning and Deep Learning to better understand use cases in each.
author: willies-ogola
date: 2020-10-16T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/hero.png
    alt: Artificial intelligence machine learning and deep learning
---
These three terms: Artificial Intelligence  (AI), Machine learning (ML), and Deep Learning (DL) are often confusing. Although used interchangeably, these terminologies refer to different things. This article will explain the differences of each.
<!--more-->
### Introduction
**Artificial Intelligence (AI):** incorporates human intelligence to machines.
**Machine Learning (ML):** gives computers the ability to learn without programming it.
**Deep Learning (DL):** uses neural networks to identify patterns within a structure.

Let's depict these three terminologies to better understand them.

![ai-ml-dl](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/ai-ml-dl.png)

From the above image, you can see that AI encompasses them all. DL is a sub-field of ML while ML is a subfield of AI.

By the end of this article, the reader should be able to answer these 3 questions:
1. What is AI?
2. What is Machine Learning?
3. What is Deep Learning?

This article further explores each of these terminologies. It will also provide a little more background on which is better for your specific use case.

### What is Artificial Intelligence (AI)?
Artificial Intelligence incorporates human intelligence to machines. AI machines exhibit an intelligent behavior whenever a machine solves a problem based on a defined set of rules (algorithm).

AI is generally divided into 3 main categories:

- Artificial Narrow Intelligence (ANI)
- Artificial General Intelligence (AGI)
- Artificial Super Intelligence (ASI)

We will go through each of these three categories.

#### Artificial Narrow Intelligence (ANI)
Artificial Narrow Intelligence is also known as weak AI. It is a category of AI skilled at only one specific task. In most cases, they tend to outperform humans in that particular task they've been trained on. Yet, presented with a new task outside their problem domain, they tend to fail.

The earliest examples of narrow AI include:
- [IBM's Deep Blue,](https://www.ibm.com/ibm/history/ibm100/us/en/icons/deepblue/) a popular computer program which beat chess grandmaster Garry Kasparov at the game of chess in 1996.
- [AlphaGo](https://deepmind.com/research/case-studies/alphago-the-story-so-far/), a computer program developed by Google's DeepMind which was able to beat Lee Sedol (a Korean Go champion) in 2016.

Presently, ANI is widely used in business. For instance:

- Google uses ANI in their Google Search platform to answer your search queries.
- Google Assistant, Amazon's Alexa and Apples’ Siri, are powered by narrow AI.  
- Recommendation systems in Netflix and YouTube also make use of narrow AI.

In fact, most companies that claim to use AI to solve a particular problem, use ANI.

#### Artificial General Intelligence (AGI)
Artificial General Intelligence is also known as strong AI. They are machines capable of performing a wide range of tasks. AGI doesn't exist at the moment. Even so, AGI popularization has featured in science fiction movies for over a decade now. In The Matrix and The Terminator movies, intelligent machines eradicate and enslave humanity. This view has depicted AGI to be evil which hasn't been the case.

[GPT-3](/engineering-education/introducing-gpt3/) is a language model developed by OpenAI. It has the ability to perform a diverse range of tasks without any specific training. GPT-3 tends to fall in the middle. Not an AGI, but still too advanced to be an ANI.

Since no sort of AGI is even close to being created, it is still hard to tell whether these ideas would bear any similarities to real-world AGI.

#### Artificial Super Intelligence (ASI)
Artificial Super Intelligent machines take the AGI concept even a notch higher.
ASI are machines that are much smarter than the best human brains in every field. These fields include general wisdom, social skills, and scientific creativity.

Elon Musk, has named AGI as the biggest existing threat facing humanity. Nick Bostrom warns of what might happen once we reach super intelligence. Bill Gates [totally disagrees](https://www.cnbc.com/2017/09/25/bill-gates-disagrees-with-elon-musk-we-shouldnt-panic-about-a-i.html/) with Elon Musk on this. He says that we shouldn't panic terming the problem as not being a cause of alarm.

Most current works in the field of AGI and ASI is currently fiction, and may remain like that for quite some time.

### What is Machine Learning (ML)?
Machine Learning gives computers the ability to learn without programming it. Computers learn by themselves using provided data. Using provided data, they generate their rules. This enables these machines make accurate predictions.

Machine Learning algorithms are grouped into three categories:

1. **Supervised Learning (SL)**

In SL, all the input data is labeled. The algorithm then learns to predict an outcome of a new unseen example from the input data. Let's take an example of a dog. We train our algorithm on pictures of dogs labelling it as "a dog". We can later introduce a new picture of a dog which it wasn't trained on and it  will still classify it as a dog.

Examples of algorithms in this category include:
Decision Trees, Naive Bayes, Support Vector Machines, K-Nearest Neighbors, and Logistic Regression.

For a more detailed look at SL, you can read [this article](/engineering-education/supervised-learning-algorithms/).

2. **Unsupervised Learning (UL)**

In UL, all the data we feed into the algorithm is unlabeled. The algorithm then learns the underlying structure from the input data.

Back to our dog example. We train our algorithm on pictures of a dog but we don't associate that picture with the label "a dog". So, how will the algorithm know that if we introduce a new picture, it's not a bird but a dog? Well, it's easy. The algorithm learns the underlying structure of a dog. For example, if the new picture has a fluffy fur, floppy ears, a curly tail, then it must be a dog. In the same way, if the picture has feathers, a beak, wings etc. then it is a bird. Learning the underlying structure from the input data is the key for UL.

Examples of UL algorithms include:
Principal Component Analysis (PCA), K-Means, and Apriori.

UL algorithms are used in:
- Recommendation systems such as in Netflix.
- In anomaly detection.
- In the analysis of fake images.

3. **Reinforcement Learning (RL)**

It is a sub-field of Machine Learning (ML). It concerns how agents take actions in an environment to maximize a cumulative reward. To express this, an RL agent is given rewards for all the correct moves it makes and punished for the wrong moves. In turn, the agent tries to maximize the right moves while minimizing the wrong moves.

Examples of algorithms in this category include:
Q-learning, Policy Gradient (PG), and Actor-Critic (AC) methods.

The applications of RL include:
- Solving computer games problem such as in [AlphaGo](https://deepmind.com/research/case-studies/alphago-the-story-so-far/).
- In robotics to manage part of Google's [cooling infrastructure](https://deepmind.com/blog/article/safety-first-ai-autonomous-data-centre-cooling-and-industrial-control/).
- In [trading and finance](https://link.springer.com/chapter/10.1007%2F978-3-030-38364-0_28/) for predicting stock prices and future sales.

### What is Deep Learning (DL)?
Deep Learning is a sub-field of ML inspired by the structure of our human brain. It uses [neural networks](https://en.wikipedia.org/wiki/Artificial_neural_network) to identify patterns within unstructured data.

![deep-learning](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning/neural-networks.png)

*[Image Source: Math Works](https://www.mathworks.com/discovery/deep-learning.html)*

DL allows computers to solve complex problems. This is accomplished by the use of neural networks such as the one in the figure above. Neural networks draw inspiration from the human brain. They are organized in layers consisting of a set of interconnected neurons. Each individual neuron is a function that takes in data through an input layer. It transforms that data producing a prediction through its output layer.

Deep neural networks contain many layers of neurons. Some contain as many as 100 layers between their input & output layers. These layers feed data from one layer to another in [forward propagation](https://en.wikipedia.org/wiki/Feedforward_neural_network). That's where the term "deep" in deep learning comes about.  

It refers to the number of deep layers hidden at the core of these networks.

### Some well-known applications of deep learning include:
**Automated driving**
DL is used in self-driving cars to detect stop signs, traffic lights, and pedestrians. This help prevent accidents.

**Image recognition**
DL is used in security cameras to detect intruders is common in companies and homes. This helps improve security.

**Healthcare**
Medical researchers at [UCLA](https://www.nature.com/articles/s41598-019-47193-6/) use DL to help in the detection of cancer cells in the blood of patients. This allows the extraction of cancerous cells in real time preventing its spread.
DL has also been used to:
- Identify pulmonary pneumonia using images from chest X-rays.
- Detect heart arrhythmias using data from electrocardiograms.
- Identify malignant skin lesions.

**Speech recognition**
DL has been used in speech recognition software such as Amazon's Alexa, Google Assistant, and Apple's Siri. Sound waves, consist of words, converted into waveforms of different frequencies. The algorithm recognizes these sequential waveform inputs and processes them.

#### Final Thoughts
Artificial Intelligence (AI) is a general term that encompasses Machine Learning and Deep Learning. Deep Learning (DL) and Machine Learning (ML) are both sub-fields of Artificial Intelligence. It is important to note that even though both ML and DL revolve around data in order to effectively deliver results, their use cases are not the same.

DL is ideal for complex tasks such as image recognition and speech recognition due to such tasks requiring a lot of data and where most of the data is unstructured. This is one place where DL excels as it utilizes the many layers within neural networks to extract different features.

ML is suitable for solving simple tasks where data is labeled and structured. A simple example of its use case would be to classify whether a ball is green or yellow. You definitely don't need to use DL here as the task is too simple and does not require a lot of data during training.

### References
1. [Machine learning. Neural and Statistical Classification](https://dl.acm.org/doi/book/10.5555/212782#:~:text=HomeBrowse%20by%20TitleBooks,June%201995).
2. [Deep learning (Vol. 1). Cambridge: MIT press](https://mitpress.mit.edu/books/deep-learning).
3. [Artificial intelligence: a modern approach](http://aima.cs.berkeley.edu/).

---
Peer Review Contributions by: [Linus Muema](/engineering-education/authors/linus-muema/)

