---
layout: engineering-education
status: publish
published: true
url: /can-blockchain-improve-machine-learning-privacy/
title: The Case for Blockchain for Machine Learning
description: In this article, we will explore whether blockchain technology can improve machine learning privacy. 
author: wilkister-mumbi
date: 2021-07-27T00:00:00-04:37
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/can-blockchain-improve-machine-learning-privacy/hero.png
    alt: ML Privacy image
---
Machine Learning algorithms have thrived in the era of big data. But to use data safely and effectively, we have to take privacy into account when developing Machine Learning systems.
<!--more-->

Machine Learning algorithms have thrived in the era of big data. But to use data safely and effectively, we have to take privacy into account when developing Machine Learning systems. This is especially the case when it comes to using sensitive data such as protected health records. There have been previous attempts to solve this problem using Federated Learning and Differential Privacy but it turns out that these systems have a flaw that Blockchain technology might help us solve.

### Prerequisites
Before reading this article, have a read of these two articles on [Differential Privacy](https://www.section.io/engineering-education/understanding-differential-privacy/) and [Federated Learning](https://www.section.io/engineering-education/secured-deeplearning-in-remote-devices/) to get an in-depth understanding of these methods.

### Table of contents
1. [Differential Privacy](#differential-privacy)
2. [Federated Learning](#federated-learning)
3. [Blockchain and Machine Learning](#blockchain-and-machine-learning)
4. [Use cases](#use-cases)
5. [Wrapping Up](#wrapping-up)
6. [References](#references)

When it comes to protecting a users' privacy when developing machine learning algorithms, there are two broad approaches that you can take. First, you can focus on protecting the data before it enters the model. Secondly, you can focus on building security into the model itself. Differential Privacy handles the first approach while Federated Learning handles the second approach.

Let's start with Differential Privacy.

### Differential Privacy
Differential Privacy (DP) allows companies to collect information from users without compromising the privacy of the individual. It is a potential approach that medical centers and hospitals can use to share information about their patient data without sharing the patient they are tracking in the process.

But, DL only works if you have a dataset that's large enough to be able to make the data private while still being able to pull the useful information from it. If your dataset is too small, you may make the data private at the expense of making it unusable. It is only accurate when used on large data sources but tends to provide inaccurate data when used on small datasets.

Alternatively, you can be able to recover the patterns that you're interested in sharing at the expense of making it easy to identify the patient that you're sampling from.

But what if you don't want to deal with protecting the data itself? Then you might turn to Federated Learning instead.

### Federated Learning
Unlike DP, Federated Learning (FL) does not focus on changing the data itself, instead, it focuses on training an algorithm across multiple separate datasets without sharing the information between the datasets themselves.

In this type of learning, each person's data must remain on their device. You build the main model on the cloud and send it to each person's phone. The model is trained on their device and a copy of all the trained models are transmitted back to the cloud to be compiled into one large model.

Depending on your goals, you may send copies of the global model back to each user's device to incorporate it into their personalized models for better generalization.

At this point, you have used FL to create a global model without it having seen the data that your model was trained on. You have also built different models that are user-specific. This improves individual performance compared to the global model itself.

If you have an iPhone, you're already reaping the benefits of Federated Learning. Earlier complaints about Apple's Siri and Amazon's Alexa were that they weren't able to distinguish the voice of the owner of the phone and that of everyone else. Anybody could go to your phone and trigger Siri and Alexa using the default trigger words.

Apple fixed this problem by using FL to locally train Siri on your phone so that it can recognize the way that you speak distinguishing it from other people. This would simultaneously improve their global model with the general characteristics of how you talk.

More broadly, FL is useful when you have distributed data sources that you either need or want to keep separate for whichever reason.

Yet, the training speed of FL tends to be slower due to the limited bandwidth and low computing power available in users' mobile devices. It is also difficult to inspect data without having full access to it. This brings about problems during the data preprocessing stages.

So, could blockchain technology help us solve these problems and ensure privacy is preserved in our machine learning systems?

Let's find out!

### Blockchain and Machine Learning
![Blockchain Structure](/engineering-education/can-blockchain-improve-machine-learning-privacy/blockchain-structure.png)

*[Image Source: IEEE](DOI:10.1109/ACCESS.2019.2961372)*

A Blockchain is a list of records or blocks that are linked together by a cryptographic hash. Each block contains the hash value of the information stored in the block before it. These blocks are distributed across many computers in a network so that everyone has access to the current state of the blockchain.

This is one of the perks of blockchain as there's no central arbiter on the entire system. As such, there is no single point of failure.

If someone tries to alter a block, it changes the hash value associated with that block. Thus, changing the hash value of every block that comes after it. This means that that block no longer agrees with every other device that's on the network. So, it's clear that a block has been tampered with within the network.

In Machine Learning, we can use this system to train models in a decentralized but still secure way.

### Use cases
#### Distributed machine learning
[LearningChain](https://ieeexplore.ieee.org/document/8622598) is a blockchain-based machine learning framework that allows us to perform distributed machine learning without a central arbiter. In this framework, a blockchain is initialized with several distributed devices including the data source, the computing nodes that will update the model, or any other users that are involved in the development of the model.

From here, we can perform an encrypted version of Federated Learning where the computers hosting the data will take the current global version of the model, train it on that local data and encrypt the resulting weights of that model. It then sends these results back out to all the compute nodes in the network.

The computing nodes then compete to add the next block to the blockchain by solving a complex math puzzle. The winning node collects all the gradients to update that global model which is stored in the next block along with all the training information which needs to be appended to the chain.

In this framework, all the identities of the data sources are anonymized and all the weights of the model are encrypted using differential privacy. So, both the identity of the users and their data are private.

Additionally, before the next block is added to the chain by the computing node, that node will first go through and make sure that the encrypted identities of the data sources and the gradients match with the historical record on the blockchain. If they don't match, then they will not be included in the update.

#### Data privacy
When it comes to data privacy, blockchain can be used to help secure data sharing, allowing people to gain ownership over their data and make data more accessible to researchers.

For example, patients would be able to efficiently and securely share their medical records with a new doctor, or share anonymized versions of their records with researchers who are interested in investigating a particular condition.

You could use blockchain to sell your data using smart contracts which usually run on the Ethereum blockchain. These are programs that only execute when specific pre-conditions are met, and which store and maintain a record of those conditions, and the result of the program in the blockchain itself.

You can use smart contracts to do things such as pay someone when a product is sold, issuing a parking ticket, or analyzing a patient's encrypted data when the patient permits for that data to be analyzed.

### Wrapping Up
Blockchain technology can be the missing piece that fills in some of the gaps in current privacy-preserving machine learning frameworks. Of course, this doesn't come without caveats. Still, blockchain systems are not perfect in a lot of ways. Some of the issues are on their environmental impacts and as still subject to some security failures. Several cryptocurrencies have been on the news for security breaches over the past few months.

But, machine learning might help solve some of these problems as it has been proposed as a tool to make blockchain mining more energy-efficient as well as to create more intelligent smart contracts to better suit the needs of users.

### References
1. [Machine Learning Adoption in Blockchain-Based Smart Applications: The Challenges, and a Way Forward](DOI:10.1109/ACCESS.2019.2961372)
2. [Machine learning in/for blockchain: Future and challenges](https://arxiv.org/pdf/1909.06189.pdf)
3. [Trustless Machine Learning Contracts; Evaluating and Exchanging Machine Learning Models on the Ethereum Blockchain](https://arxiv.org/pdf/1802.10185.pdf)
4. [When Machine Learning Meets Blockchain: A Decentralized, Privacy-Preserving and Secure Design](https://ieeexplore.ieee.org/document/8622598)
5. [Federated Learning](https://www.section.io/engineering-education/secured-deeplearning-in-remote-devices/)
6. [Differential Privacy](https://www.section.io/engineering-education/understanding-differential-privacy/)
7. [Federated Learning: Collaborative Machine Learning without Centralized Training Data](https://ai.googleblog.com/2017/04/federated-learning-collaborative.html)
