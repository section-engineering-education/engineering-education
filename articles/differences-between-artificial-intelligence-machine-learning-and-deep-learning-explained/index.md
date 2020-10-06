### Introduction

In 1956, [John McCarthy,](/https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)/) a professor of mathematics and a group of scientists set out for an ambitious two-months project to create computers that could form abstractions, process language, improve themselves and solve all kinds of problems reserved for humans. Though they were never able to solve the biggest part of the AI equation, this ambitious project kick started the field that has come to be known as Artificial Intelligence (AI) today. 

Research in Artificial Intelligence then gave rise to Machine Learning and finally Deep Learning.  
However, these three terms, Artificial Intelligence, Machine learning and Deep Learning often overlap and are easily confused by readers. Although used interchangeably, these three terminologies do not quite refer to the same thing.

By the end of this article, the reader should be able to answer these 3 questions:
1. What is AI?
2. What is Machine Learning?
3. What is Deep Learning?

So, how do these three differ? 

**Artificial Intelligence (AI)** refers to the ability of computers to think and mimic actions displayed in humans.
**Machine Learning (ML)** is a sub-field of AI that gives computers the capability to learn without being explicitly programmed.
**Deep Learning (DL)** is a sub-field of ML which uses neural networks to identify patterns within a structure.

Let's depict these three terminologies visually to better understand them.

![ai-ml-dl](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning-explained/ai-ml-dl.png)

From the above image of three concentric circles, you can see that AI encompasses them all. DL is a sub-field of ML while ML is a subfield of AI. 

Interesting, right?

In this article, we will be able to explore further each of these terminologies and provide a little more background on which is better for your specific use case.

### What is Artificial Intelligence (AI)?
Artificial Intelligence can be simply interpreted as incorporating human intelligence to machines. That "intelligent" behavior exhibited whenever a machine solves a problem based on a defined set of rules (algorithm) is what is called Artificial Intelligence.

AI is generally divided into 3 main categories:
* Artificial Narrow Intelligence (ANI)
* Artificial General Intelligence (AGI) 
* Artificial Super Intelligence (ASI)

We will discuss each of these three categories.

#### Artificial Narrow Intelligence (ANI)
Artificial Narrow Intelligence (also referred to as weak AI) is a category of AI that is skilled at only one specific task. In most cases, they tend to outperform humans in that particular task it's been trained on. However, presented with a new task outside their problem domain, they tend to fail.

The earliest example of narrow AI, [IBM's Deep Blue,](/https://www.ibm.com/ibm/history/ibm100/us/en/icons/deepblue/) a popular computer program which beat chess grandmaster Garry Kasparov at the game of chess in 1996, and [AlphaGo](/https://deepmind.com/research/case-studies/alphago-the-story-so-far/), also a computer program developed by Google's DeepMind which was able to beat Lee Sedol (a Korean Go champion) in 2016 are good examples of narrow AI.

Presently, ANI is widely used in healthcare, business and science. In business, for example, ANI is used by Google in their Google Search platform to answer your search queries. Amazon's Alexa and Apples’ Siri, which have become a part of the majority of people's lives, are powered by narrow AI. Lastly, recommendation systems which suggest relevant movies and music to Netflix and YouTube users respectively, also make use of narrow AI. 

In actual fact, most companies that claim to use AI to solve a particular problem, are using artificial narrow intelligence.

#### Artificial General Intelligence (AGI)

In contrast, Artificial General Intelligence (also known as strong AI/full AI) are intelligent machines capable of performing a wide range of intellectual tasks.

AGI doesn't exist at the moment. Nevertheless, AGI has been popularized and has featured in science fiction movies for over a decade now. Fictional depictions of AGI have varied widely, with science fiction movies depicting a doomsday scenario in movies such as The Matrix and The Terminator where intelligent machines eradicate and enslave humanity.

In 2020, OpenAI developed [GPT-3,](/https://en.wikipedia.org/wiki/GPT-3/) a language model with a capability of performing a diverse range of tasks without any specific training. There is a clear consensus among the AI community that GPT-3, though close, cannot be fully considered an example of AGI but its still considered being too advanced to be classified as an ANI. 

Since no sort of AGI is even close to being created or has been created yet, it is still hard to tell whether these ideas would bear any similarity to real-world artificial general intelligence.

#### Artificial Super Intelligence (ASI)

Artificial Super Intelligent machines take the AGI concept even a notch higher. [According to Nick Bostrom,](/https://www.nickbostrom.com/superintelligence.html/) he refers to ASI as machines which are much smarter than the best human brains in nearly every field, including general wisdom, social skills and scientific creativity.

The idea of creating a super intelligent machine has prompted world-renown scientists such as Nick Bostrom and Elon Musk to warn of dire risks posed by such powerful machines. Space X and Tesla's founder, Elon Musk, has termed AGI as the biggest existing threat facing humanity with Nick Bostrom warning of what might happen once super intelligence is reached. 

On the other hand, [Bill Gates, Microsoft's co-founder totally disagrees with Elon Musk](/https://www.cnbc.com/2017/09/25/bill-gates-disagrees-with-elon-musk-we-shouldnt-panic-about-a-i.html/) saying that we shouldn't panic terming the problem as not being imminent.
 
The problem with discussing the effects of AGI and ASI is that most current works in the field of AI stress that AGI and ASI is currently fiction, and may remain like that for quite some time.

### What is Machine Learning (ML)?
Machine Learning is a sub-field of AI that gives computers the ability to learn without being programmed the conventional way. 

As the name suggests, it can be loosely interpreted as empowering computer systems with the ability to learn by themselves using provided data enabling the machines make accurate predictions. 

Machine Learning algorithms are grouped into three categories:

1. Supervised Learning
In supervised learning, all the data is labeled and the algorithm learns to predict the output from the input data. 
Let's take an example of a dog. We train our algorithm on pictures a dog labelling it as "a dog". We can later introduce a new picture of another dog which it wasn't trained on and it'll still classify it as a dog.

Examples of algorithms in this category include Decision Trees, Naive Bayes, Support Vector Machines, K-Nearest Neighbors and Logistic Regression.

2. Unsupervised Learning
In unsupervised learning, all the data we feed into the algorithm is unlabeled and the algorithm learns the underlying structure from the input data.

Back to our dog example. We train our algorithm on pictures of a dog but we don't associate that picture with the label "a dog". So, how will the algorithm know that if we introduce a new picture, it's not a bird but a dog? 

Well, it's easy. 

The algorithm learns the underlying structure of a dog, for example, if the new picture has a fluffy fur, floppy ears, a curly tail, then it must be a dog. In the same way, if the picture has feathers, a beak, wings etc. then it is a bird. 

Learning the underlying structure from the input data is the key for unsupervised learning.

Examples of algorithms include Principal Component Analysis (PCA), Singular Value Decomposition (SVD), and K-Means Clustering.
Unsupervised learning algorithms are mainly used for recommendation systems such as Neflix, anomaly detection and in the analysis of fake images.

3. Reinforcement Learning (RL)
Reinforcement Learning is a technique which allows an agent to take actions and interact with an environment to maximize the total rewards for completing a task. 
In a simpler term, the RL agent is rewarded for correct moves and punished for the wrong ones. In turn, the agent tries to maximize the right moves while minimizing the wrong moves. 

Examples of algorithms in this category include Q-learning, Policy Gradient (PG) and Actor-Critic (AC) methods.

RL has been used in solving computer games problem such as in [AlphaGo](/https://deepmind.com/research/case-studies/alphago-the-story-so-far/), in robotics [to manage part of Google's cooling infrastructure](/https://deepmind.com/blog/article/safety-first-ai-autonomous-data-centre-cooling-and-industrial-control/), and in [trading and finance](/https://link.springer.com/chapter/10.1007%2F978-3-030-38364-0_28/) for predicting stock prices as well as predicting future sales.

### What is Deep Learning (DL)?
Deep Learning is a sub-field of ML inspired by the structure of our human brain. It uses neural networks to identify patterns within unstructured data.

![deep-learning](/engineering-education/differences-between-artificial-intelligence-machine-learning-and-deep-learning-explained/neural-networks.PNG)
*[Image Source: Math Works](https://www.mathworks.com/discovery/deep-learning.html)*

DL allows computers to solve a host of complex problems that couldn't otherwise be tackled using ML. This is accomplished by the use of neural networks such as the one in the figure above.

Neural networks are basically mathematical models whose structure is inspired by that of the human brain.
They are organized in layers consisting of a set of interconnected neurons. Each individual neuron is a function that takes in data through an input layer, transforms that data mathematically, and then produces a prediction through the output layer.

Unlike in neural networks which consists of one or two layers, deep neural networks contain multiple "hidden" layers of neurons with as many as 100 layers between their input layer and the output layer each feeding data into each other. Hence the term "deep" in deep learning. This is in reference to the large number of hidden layers at the core of these neural networks.

### Some well-known applications of deep learning include:

**Automated driving**
Companies such as Waymo and Tesla are using deep learning in their self-driving cars to detect stop signs, traffic lights and pedestrians which help prevent accidents. 

**Image recognition**

DL has been used in industries to improve safety by the detection of people and objects in unsafe distances around heavy work machinery.

It has also been used in security cameras to detect intruders. This is a common phenomenon in China used to improve security.

**Healthcare**

DL has been used in by medical researchers at [UCLA](/https://www.nature.com/articles/s41598-019-47193-6/) to help in the detection of cancer cells in the blood of patients. This allows cancerous cells to be extracted in real time preventing cancer from spreading.

DL has also been used to identify pulmonary pneumonia using images from chest X-rays, heart arrhythmias using data from electrocardiogram, and malignant skin lesions at accuracy levels which are at par with trained dermatologists 

**Speech recognition** 

DL has been used in speech recognition such as Amazon Alexa, Google Assistant and Apple's Siri. Sound waves, which basically consist of words, are converted into waveforms of different frequencies.
Long Short Term Memory (LSTM), a neural network with the capability of remembering sequential inputs recognizes and processes the spatial-temporal input signals of such sequences.

#### Final Thoughts
I hope this article has helped you understand the differences between AI, ML and DL. It's clear now that AI, ML and DL, though used interchangeably, are not the same. 
Artificial Intelligence encompasses them all. Deep Learning is a sub-field of ML while ML is a sub-field of AI.

### References

1. Michie, D., Spiegelhalter, D. J., & Taylor, C. C. (1994). Machine learning. Neural and Statistical Classification, 13(1994), 1-298.
2. Goodfellow, I., Bengio, Y., Courville, A., & Bengio, Y. (2016). Deep learning (Vol. 1). Cambridge: MIT press.
3. Russell, S., & Norvig, P. (2002). Artificial intelligence: a modern approach.
