
![hero](/engineering-education/basics-of-transfer-learning/hero.jpg)

[Image source]( https://images.unsplash.com/photo-1569437061241-a848be43cc82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)

When we as human beings learn new things, we do not always learn from scratch. We often transfer past knowledge and apply them to new tasks. For example, knowing how to ride a bike makes it easier to learn how to ride a motorcycle. Learning to code in C makes it easy to learn to code in Python. This is the gist of transfer learning.

In the quest to achieve artificial general intelligence, transfer learning can be applied to machine learning models. We look at the theoretical concepts of transfer learning.

### Table of Contents

1. Defining transfer learning

2. Need for transfer learning

3. A few transfer learning approaches

4. Applications of transfer learning

### Prerequisites

Basic understanding of machine learning and deep learning. For an introduction or refresher on some basic machine learning concepts check out this [article](https://www.section.io/engineering-education/supervised-learning-algorithms/). Some machine learning and deep learning concepts are also covered [here](https://www.section.io/engineering-education/automated-fake-news-detection/).

### Useful Terms

**Pre-trained models** – models trained on a sizeable benchmark dataset to solve a problem similar to a problem one might want to solve.

**Neural network** – a series of algorithms that are modeled on the human brain, to identify underlying relationships in data.

**Artificial general intelligence (AGI)** – hypothetical machine intelligence with the capacity to learn or understand any intellectual task a human being can.

**Domain knowledge** – knowledge about the environment in which a target system operates.

**Feature** – an individual measurable property that is being observed. It is an attribute shared by all the independent units on which analysis is to be done.

### Transfer Learning

In traditional machine learning, learning is isolated. To carry out specific tasks, one would need to train isolated models. One would also need very specific datasets. Even if tasks between the two models are related, you would not be able to transfer knowledge from one model to another. This makes the machine learning process very tedious. Moreso in tasks that could benefit from the transfer of previous knowledge to solve a problem. Transfer learning allows us to train newer models and satisfy a variety of tasks. These tasks are satisfied by leveraging knowledge from previously trained models.

We can define transfer learning as a machine learning method where a model built for a specific task is reused as a starting point for a model on another task. Transfer learning involves two key concepts; tasks and domains.

A domain consists of feature space and a marginal probability distribution over the feature space. A feature space can be defined as a set of features identified from data. Marginal probability distribution is the marginal probability of a random variable in the presence of more random variables.

Since we have defined transfer learning, it is important to understand the "why" behind it. Below we explore the motivation for transfer learning.

### Motivation/ Need for Transfer Learning

#### Saving training time

For complex tasks, it may take a long time to train a neural network from scratch. Access to useful training data may be limited. The process of obtaining training data is time-consuming. The data has to be collected and prepared. Data preparation involves analyzing data, rectifying irregularities, and finally cleaning the data. Then it can be decided which portions of the data can be used to train the neural network.

Using a pre-trained model significantly shortens model training time. We only need to tweak the model and we can put the saved time into efficient use.

#### Better NN performance

Deep learning models are often specialized in a specific domain or task. They might offer state-of-the-art performance but only on very particular datasets. This means that, given a similar task to one in which a model offered high performance, the model may perform poorly. This lack of reusability backs up the value of transfer learning. The use of transfer learning traverses domains and tasks. When dealing with tasks like those they were trained on, pre-trained models ensure performance is satisfactory.

#### Not needing a lot of data

To train a neural network from scratch requires a significant amount of data. This data may not always be readily available. As mentioned above, the processes of data collection and preparation are time consuming and tiresome. Furthermore, sometimes domain knowledge is required to build large labeled datasets. It may also be expensive to build or acquire said datasets. Especially considering a deep learning approach, some datasets may take years to create. Sometimes it may involve collaboration with many domain experts to create high-quality datasets. The use of transfer learning eases the burden on data scientists and makes the machine learning process more efficient.

#### Contribution towards AGI

To achieve artificial general intelligence, machines will need to learn common sense. The very nature of transfer learning works to achieve some aspect of common sense since. Specifically, the ability to compare different problem scenarios and use previous knowledge to carry out a task is common sense to a human being. Data scientists and researchers believe transfer learning is playing its role in achieving artificial general intelligence.

### Transfer Learning Strategies and Approaches

#### Transfer Learning Strategies

In line with this [paper](https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf), the strategies explored below are a representation of the relationship between transfer learning and traditional machine learning. They show the transfer learning possibilities in different traditional machine learning contexts.

![strategies](/engineering-education/basics-of-transfer-learning/strategies.jpg)

Image of Transfer Learning Strategies [Image source](https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf)

##### Inductive Transfer Learning

Inductive learning algorithms are traditional machine learning algorithms that are used to produce a set of classification rules. These algorithms produce rules of an "if-then" fashion. The algorithms are iterative, meaning they generate rules at each iteration. These inductive algorithms come up with a strategy to carry out a task. Their iterative nature means they don't need separate instructions at each step.

With inductive transfer learning, the source domain and the target domain are the same. But, the source tasks and target tasks differ. Algorithms try to apply inductive biases of the domain of the source to improve the target task. [Inductive bias](https://en.wikipedia.org/wiki/Inductive_bias) refers to a set of assumptions a learning algorithm uses to predict outputs given inputs it has never before encountered.

##### Unsupervised Transfer Learning

Unsupervised learning algorithms are algorithms whose output relies on finding patterns in input data. In unsupervised learning, there are no complete or labeled datasets given.

Unsupervised transfer learning is like inductive transfer learning. The target and source domains are similar but the tasks differ. But, unsupervised transfer learning focuses on unsupervised tasks in the target domain. As we had mentioned above, unsupervised learning has no labeled datasets. Thus, in unsupervised transfer learning, no labeled data is available in both the source and target domains.

##### Transductive Transfer Learning

Here we deal with a context that has similar source and target tasks but different domains. The domain of the source boasts of having lots of labeled data yet the target domain has none. In traditional machine learning, transductive learning defines a situation where all test data is required to be seen at the time of training. The model cannot be reused for future data. Here, we define transductive learning as a transfer learning setting where some unlabelled data has to be available in the target domain and tasks have to be the same.

#### Transfer Learning Approaches

The strategies discussed above help us understand where transfer learning can be implemented. The approaches explored below shed some light on what can be transferred in the context of the above strategies.

##### Instance Transfer

In an ideal context, reusing all the knowledge from a source domain on a target task would be a common occurrence. Realistically, it is not possible to re-use data from the source domain directly. But, various instances from the source domain can be re-used. These instances of the source are transferred to the target task. These instances combined with data of the target domain define the instance transfer technique.

##### Feature-Representation Transfer

A feature may be defined as a property shared by independent units of data on which analysis should be done. The goal of feature representation transfer is to find suitable feature representations. These feature representations reduce the difference between the source and target domains. We are basically "transferring features" from the source domain to the target. This technique also reduces the error of classification and regression models. Supervised or unsupervised methods may be used for this technique but it is dependent on the availability of labeled data.

##### Parameter Transfer

Parameter transfer is based on two assumptions. The first one is that models with related tasks share some parameters. The second is that these models share prior distribution of hyperparameters. This technique, therefore, aims to discover shared parameters between source domain models and target domain models. Shared parameters make it possible to carry out transfer learning.

##### Relational-Knowledge Transfer

Relational-knowledge transfer maps out relational knowledge between source and target domains. This method involves data that is not independent and identically distributed. For example, networked data and social network data. It looks to transfer the relationship within data from a source to a target domain.

For a deep dive into these transfer learning approaches, take a look at this [paper]( https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf).

### Applications of Transfer Learning

Several transfer learning algorithms are used in related fields. Examples of these fields include medicine, image detection, speech recognition, and recommendation systems.

#### Medicine

Many algorithms have been proposed and implemented in medical imaging to reduce the workload of doctors. They also serve the purpose of improving the accuracy of judgment. One method involves using a CNN for model transfer. The goal is the segmentation of white matter lesions of multiple sclerosis (MS) in patient images.

An approach involves segmentation tasks of chest X-ray images using domain adaptation. Domain adaptation refers to where a model is trained on a different source domain from the target domain. Both domains are related.

Another method involves the use of adversarial domain adaptation. This method is used to classify prostate histopathology whole-slide images. Adversarial domain adaptation is a method used to transform the features of many target domains to be uniform with source domain features.

#### Computer Vision

Deep learning has been a driver of computer vision. Different neural network architectures are used to carry out computer vision tasks. An example of such a task is object recognition. Transfer learning for computer vision may occur through transferring of features in neural networks to improve the performance of the target network. The layers of a neural network may act as feature extractors. Some layers may extract image features such as detecting edges. Other layers may focus on task-specific features. For a more technical read on this application, [paper](https://arxiv.org/abs/1411.1792) discusses the transferability of features in deep neural networks.

#### Speech Recognition

Automatic speech recognition models provide a very straightforward application of transfer learning. These models for the English language have been applied to improve the performance of speech recognition models of other languages. Here is a basic description of how this would work. A trained neural network may be used to extract features from vast speech data. It may then be used to inject this information into an algorithm like support vector machine, thus achieving transfer learning.

### Wrapping up

We have taken a high-level approach to introduce transfer learning. Transfer learning is an asset to researchers and data scientists. For one, it can make the machine learning process more efficient. Models not having to be built and trained from scratch saves a lot of time and effort for engineers. Now that we understand the basics, I aim to write an article delving deeper into transfer learning in deep learning soon. See you then!

### References

1. H. Liang, W. Fu, and F. Yi, ["A Survey of Recent Advances in Transfer Learning,"]( https://ezproxy.ku.ac.ke:2546/document/8947072) 2019 IEEE 19th International Conference on Communication Technology (ICCT), Xi'an, China, 2019, pp. 1516-1523, doi: 10.1109/ICCT46805.2019.8947072.

2. [A Survey on Transfer Learning](https://www.cse.ust.hk/~qyang/Docs/2009/tkde_transfer_learning.pdf)

3. [A Comprehensive Hands-on Guide to Transfer Learning with Real-World Applications in Deep Learning](https://towardsdatascience.com/a-comprehensive-hands-on-guide-to-transfer-learning-with-real-world-applications-in-deep-learning-212bf3b2f27a)

4. [A Gentle Introduction to Transfer Learning for Deep Learning](https://machinelearningmastery.com/transfer-learning-for-deep-learning/)

5. [Transfer Learning: Leverage Insights from Big Data](https://www.datacamp.com/community/tutorials/transfer-learning)
