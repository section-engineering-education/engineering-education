---
layout: engineering-education
status: publish
published: true
url: /automated-fake-news-detection/
title: Introduction to Automated Fake News Detection
description: Fake news refers to information content which is false, misleading or whose source cannot be verified. This content may be generated to intentionally damage reputation, deceive, to gain attention.
author: collins-ayuya
date: 2020-09-18T00:00:00-15:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/automated-fake-news-detection/hero.jpg
    alt: fake news example image
---
Misinformation presents a huge challenge in online society. As a result, there have been many attempts to identify and classify misinformation. Specifically, in social networking sites, blogs, as well as online newspapers.
<!--more-->

Since this is a very broad research area, in this article we’ll look at:

- What is fake news and why you should care?

- Manual vs automated fake news detection efforts.

- A brief introduction to machine learning and deep learning techniques for fake news detection.

- Bonus: BERT.

The goal is to give you a gentle introduction to automated fake news detection. This should hopefully challenge you to join the fight.

### What is Fake News
Fake news refers to information content that is false, misleading or whose source cannot be verified. This content may be generated to intentionally damage reputations, deceive, or to gain attention. The term rose to popularity during the 2016 US Presidential Elections. It was reported that fake news likely influenced the [results of the elections](https://news.stanford.edu/2017/01/18/stanford-study-examines-fake-news-2016-presidential-election/).

Various types of fake news include:

- Clickbait. Often eye-catching content to capture readers at the expense of being factual.

- Satire/parody. This type of content is considered to be fun and humorous thus considered to be entertaining, yet some readers may interpret the content as fact.

- Propaganda. This is content meant to mislead and influence the reader.

- Biased/partisan/hyper-partisan. Oftentimes this is biased political content claiming to be impartial.

- Unreliable news. Journalists may publish news whose sources are unverified, or without carrying out any form of fact checking themselves.

#### How Fake News Works
Social media platforms are incredibly influential. According to [internet live stats](https://www.internetlivestats.com/twitter-statistics/) the estimated daily number of tweets is about 500 million. These platforms are ubiquitous. They are the go-to environment to share thoughts, feelings, opinions, and intentions. This provides ideal conditions to distribute news with minimal guidelines and restrictions.

In today’s world, it is normal to receive news from online sources like social media. News is often subjective to readers. We often choose to ingest content that appeals to the different emotions we have. So, considering this, the information that gets the most reach may not be real or accurate news. Additionally, real news may be twisted in transmission. A reader may end up with different versions of the same news. This may lead to information overload.

#### Why you Should Care
![misinformation](/engineering-education/automated-fake-news-detection/misinformation.jpg)

[*Image Source*](https://unsplash.com/photos/zw3ExyW6x3Y)

At a time when the globe is defined by a pandemic, public health depends on reliable information. Yet we stare down the barrel of an infodemic. An infodemic is the combination of the word information and epidemic. It is an excessive amount of information about a problem that makes the solution more difficult. It also defines a wide and rapid spread of misinformation.

This means that our individual health is a collective responsibility. It is tied to the behavior of other people since news influences the behavior of the audience.
The World Health Organization has highlighted the dangers of a COVID-19 driven infodemic. It presents as much danger as the virus itself. According to WHO, fake news spreads faster and more easily than the virus.


Examples of challenges of such an infodemic include:

- Promoting and selling of fake coronavirus cures.

- Spreading myths and rumors about the nature and spread of the virus.

- Conspiracy theories about the origin and intention of the virus.

- Encouraging unfounded remedies. Some touted remedies are harmless, others are comical, while others can be quite hazardous.

#### What’s being done to combat fake news
Companies like Facebook, Twitter, TikTok, Google, Pinterest, Tencent, YouTube, and others are working with WHO to mitigate the spread of rumors. Their efforts are geared at filtering out content that is a danger to public health. There are ways to contribute to this fight. But first, we need to understand the types of fake news detection being used. We will look at it from the perspective of being either manual or automatic.

### Manual Fake News Detection
Manual fake news detection often involves all the techniques and procedures a person can use to verify the news. It could involve visiting fact checking sites. It could be crowdsourcing real news to compare with unverified news. But, the amount of data generated online daily is overwhelming. Also noting how fast information spreads online, manual fact checking quickly becomes ineffective. Manual fact checking struggles to scale with the volume of data generated. Therefore, highlighting the reason behind the creation of automated fake news detection.

### Automated Fake News Detection
Automated detection systems provide value in terms of automation and scalability. There are various techniques and approaches implemented in fake news detection research. And it is worth noting that these approaches often overlap depending on perspective. From my personal perspective, I choose to discuss only two approaches.

These two approaches focus on the methods used, as opposed to the content being analyzed. They may also both involve Natural Language Processing (NLP) in their methodology.

[Natural Language Processing](https://en.wikipedia.org/wiki/Natural_language_processing) enables computers to understand natural/human language and respond appropriately. Hence, there are two aspects involved:

- Natural Language Understanding

- Natural Language Generation

The two approaches to fake news detection are:

- Machine Learning approach

- Deep Learning approach

#### Machine Learning Approach
[Machine learning](https://en.wikipedia.org/wiki/Machine_learning) refers to giving computers the ability to learn without explicitly being programmed.
A machine learning approach uses machine learning algorithms to detect misinformation. Examples of these algorithms include:

**Naïve Bayes:** uses probabilistic approaches based on Bayes theorem. This algorithm is often used for text classification.

**Decision Tree:** a supervised learning algorithm that has a tree-like flow. It helps in decision making. A useful algorithm for both classification and regression tasks.

**Random forest:** simply a combination of decision trees.

**Support Vector Machine:** a supervised learning algorithm. It examines data for classification and regression analysis. It classifies data into two categories.

**Logistic Regression:** contrary to the name, it is a classification algorithm used to estimate discrete values.

**K-nearest-neighbor:** a simple algorithm that is used for both classification and regression tasks. Though it is more widely used for classification problems.

Datasets are used to refine the algorithms. These datasets may be split as training data or test data.
I have come across a lot of research where a system combines various machine learning algorithms and data mining. This is often carried out on social media platforms, especially Twitter data. For example, a model may combine machine learning, through Naïve Bayes, Support Vector Machine(SVM), and Natural Language Processing (NLP) to detect fake news. Naïve Bayes and Support Vector Machine are classification models in this process.

Depending on the nature of the data, the two classifiers can be applied to a dataset and their performance compared. On the other hand, these classifiers can be used in an ensemble method to enhance each other's results in classification tasks, therefore improving model accuracy. As mentioned above, Naïve Bayes is popular in text classification tasks therefore it's considered for such tasks often.

SVM classifies data into two categories. In the context of fake news detection, these categories are likely to be "true" or "false". It is also an algorithm that works well on semi-structured datasets and is very adaptable. Pairing SVM and Naïve Bayes is therefore effective for fake news detection tasks.

NLP may play a role in extracting features from data. It may also come in handy when attempting to contextualize text data since this is not a strong suit of traditional machine learning models. NLP may also be utilized through sentiment analysis of the data, given sentiment analysis is a subfield of NLP.

[Sentiment analysis](/sentiment-analysis/) is the process of deriving meaningful patterns in text data. It can provide information on the context of data by describing the sentiments of a given population.  

The accuracy of the results is usually determined by the combinations of models used and the datasets involved. A combination of available toolkits with Bayesian learning may be used to develop a fake news detector. These toolkits include Textblob, Natural Language, and SciPy.

But a challenge exists with some of these traditional machine learning approaches. They treat fake news detection as a binary classification task. These models alone struggle to contextualize text data. They need structured/labeled data. In fact, machine learning models struggle to solve complex queries with huge amounts of data. This is where deep learning models come into play.

#### Deep Learning Approach
Deep learning algorithms function similar to machine learning algorithms. But there is a key difference. Deep learning algorithms have layers that interpret data differently. Artificial neural networks refer to the network of such algorithms.

Purely deep learning perspectives towards fake news detection have been explored in many cases. I have provided links to some of these published works at the end of the article.

A methodology may involve building classifiers to predict the validity of news based only on news content. This may be achieved using Recurrent Neural Network (RNN) models and long-short term memories (LSTM). For more information on RNN click on this [article](/text-generation-nn/), which explains text generation with RNN + TensorFlow.

RNN is a neural network containing loops that allow information to be stored within the network. Previous experiences influence upcoming events in RNNs. The storage of information can be attributed to LSTM. LSTM refers to artificial recurrent neural networks that allow information to persist within them. They are the building blocks for RNN layers. LSTM units provide the ability to “recall” values over a time interval. This influences the relationships between words and their occurrences.

This [published paper](http://dx.doi.org/10.1145/3341161.3342957) was an attempt to label fake news as early as possible using Recurrent Neural Networks. The goal was to reduce the time gap between a news release and detection.

A combination of machine learning and deep learning techniques is feasible. There are many published works that combine the two. The aim is not only to detect fake news, but to also achieve the highest possible accuracy levels in the detection.

### Bonus: BERT
My favorite technique involves the use of Bidirectional Encoder Representations from Transformers (BERT).
Transformers are a fundamental block in most state-of-the-art NLP architectures. BERT is Google’s state of the art transformer-based language model. It has been revolutionizing the field of Natural Language Processing.

BERT has been key to contextual language understanding. Which is a huge driving factor for its use in fake news detection tasks. The contextual language understanding sets BERT apart. It ensures BERT outperforms traditional machine learning models at this task. Furthermore, traditional machine learning models take in numbers as inputs. BERT converts words into numbers. This makes it much easier to train models on textual data.

For fake news detection (and most NLP tasks) BERT is my ideal choice. Here’s why:

**Contextual language understanding:** BERT can account for the contexts of words in a sentence. It is easier to determine news as either real or fake. As mentioned before, this is an upgrade to traditional machine learning approaches.

**BERT is pre-trained:** The amount of data used to train the original BERT model is insane. The base model was trained on [800 million words](https://ai.googleblog.com/2018/11/open-sourcing-bert-state-of-art-pre.html). And we are yet to factor in all the languages BERT is pre-trained in. This makes its flexible to use on both small and large datasets.

**Convenience:** BERT is not only pretrained, in many languages, but also open source. It would only take a few minutes to download a model and start tweaking it to a task. You are only limited by your creativity.

I have come across literature where BERT was used to pre-train Korean data and create a pre-trained model to judge fake news. In another study, it was used to classify [hyper-partisan news](https://doi.org/10.1109/IConDA47345.2019.9034917).

### Conclusion
Fake news research has never been more important than it is now. Especially during a time when the world is fighting a pandemic. The approaches explored in this article only scratch the surface. There are so many more approaches and criteria for fake news detection. Datasets also impact the accuracy of fake news detection tasks.

Their quality and quantity are impactful. It is also worth noting that, as much as our focus is on automated approaches, the human element is key to this fight. A combination of human and automated approaches gives rise to a hybrid approach. I hope this article challenges you to join the fight against fake news by creating better and greater solutions.

### References
1. [Approaches to Identify Fake News: A Systematic Literature Review](https://doi.org/10.1007/978-3-030-49264-9_2)

2. [International Conference on Smart Computing & Communications:](https://doi.org/10.1109/ICSCC.2019.8843612)

3. [Deep Learning Algorithms for Detecting Fake News in Online Text](https://doi.org/10.1109/ICCES.2018.8639198)

4. [News Labeling as Early as Possible: Real or Fake?](http://dx.doi.org/10.1145/3341161.3342957)

5. [Transformer Model Paper:](https://arxiv.org/abs/1706.03762)

6. [Natural Language Contents Evaluation System for Detecting Fake News using Deep Learning](https://doi.org/10.1109/JCSSE.2019.8864171)

7. [Hyperpartisan News and Articles Detection Using BERT and ELMo](https://doi.org/10.1109/IConDA47345.2019.9034917)

8. [Detection of Fake News Using Transformer Model](https://doi.org/10.1109/iCoMET48670.2020.9074071)

---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)
