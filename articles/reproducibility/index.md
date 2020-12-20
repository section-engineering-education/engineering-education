![hero](/engineering-education/reproducibility/hero.jpg)

[Source](https://images.unsplash.com/photo-1586975122469-c9467e6a83f7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80)

Reproducibility in machine learning involves getting the same results, using the same algorithm, data, and parameters on every run. It helps to remove variations when rerunning experiments, which helps in refining the models. Reproducing results in machine learning projects can be very difficult. It may even be impossible in some cases. We explore the most important concepts of reproducibility in this article.

### Contents

1. Defining reproducible ML

2. Significances of reproducibility in ML

3. Challenges to attaining reproducible ML

4. Simple measures to attain reproducibility

### Prerequisites

One simply needs to understand the basics of [machine learning](/engineering-education/supervised-learning-algorithms/).

### Reproducible Machine Learning

Reproducibility refers to the ability to be replicated or recreated. In machine learning, it refers to recreating a workflow and achieving the same results as the initial work. Consider an algorithm from new research. We may want to dissect it and ultimately implement it. But if it proves difficult to reproduce, it makes it difficult to implement the model. If we seek to implement such an algorithm on a real-world problem without fully understanding it, or being able to replicate its results, the outcome may prove to be inconsistent with the original model.

Reproducible machine learning also has implications in terms of budget constraints. When a machine learning workflow is reproducible, it is worth the resources invested in the process. We are guaranteed our goal, which is achieving the same results as some prior model. But, if we struggle to understand what kind of training data, hardware, and hyperparameters were used, attempting to reproduce a model may prove to be quite costly. The results may be inconclusive. This does not justify the resources invested in such a process.

To further understand reproducibility, let’s explore its importance.

### Importance of Reproducible Machine Learning

Reproducibility is important for several reasons. Let’s highlight a few.

**Correctness**. Correctness needs to be proved. If many models are built using the same data and the same processes but giving different results, it challenges the correctness of the whole process.

**Credibility**. We rely very heavily on machine learning in our daily lives. Being dependent on these models in production systems spells out trouble if we cannot rebuild or explain them. End users expect these systems to be unbiased, reliable, and explainable. If we are unable to replicate such models, it is difficult to explain them. This in turn challenges the credibility of these models.

**Having a baseline**. A baseline refers to a starting point that can be used for comparisons. To show improvement over an original technique, we first have to reproduce the technique. Say we’re attempting to improve a model. In an attempt to deploy a better version of such a model, we must first be able to replicate the model. It would be unfair to claim improvement when comparing two models that are inherently different. The ability to reproduce such models provides us with a baseline which makes it easy to refine the models.

**Skill versus randomness**. Consider a context where creators of machine learning models may claim to have improved the overall performance of a model by tweaking a parameter. The performance may improve but, it might be impossible to tell whether the improvement is as a result of scientific skill, or due to some source of randomness. The only way to validate the improvement is to replicate the process.

### Challenges to Attaining Reproducibility

There exist many factors that hinder the efforts to attain reproducibility. Let’s go over a few of them.

#### Data

Data is a key input to machine learning algorithms. These models are highly dependent on the data that is used to train them. Therefore, data that is fed into the model has not only a significant impact on performance but also reproducibility. A model will only produce the same results as another only if the same data and flows are used to train it.

In a research context, researchers may use a training set that programmers/data scientists attempting to implement the model may not have access to. Furthermore, some research databases rewrite or regularly make updates to data. This means that the training set for a given algorithm may not be available after a given period.

#### Concept Drift

One may struggle to deploy a model more than once. A key reason for this is concept drift. [Concept drift](/engineering-education/correcting-data-shift/) refers to the shift in the relationships between input and output variables in a given problem. Our models are powered by data. But if the distribution of this data keeps changing, it proves to be a challenge for reproducibility. For example, consumer habits may be reflected by data that we seek to use to train our model. However, consumer habits always change with time. If someone would want to reproduce our model and get similar results, using up-to-date data, it would be a tall order.

#### Algorithm

Deterministic algorithms produce the same output given the same input, even on different iterations. However, there exist many algorithms that display non-determinism. Reproducibility in such algorithms is a difficult task since we expect randomness. Non-deterministic algorithms may be fed with the same input yet produce different results upon different iterations. The randomness in results may be a result of the algorithm using various paths to arrive at contrasting outcomes. A huge factor that influences the non-deterministic nature of an algorithm is the complexity of the model. The routes and processes used to achieve output may be non-reproducible, therefore ensuring an element of randomness. It is impossible to reproduce that which is random.

#### Software

Just as in the case of algorithms above, software that may enable one to carry out severe computation may not adhere to reproducible routines. For example, [cuDNN](https://developer.nvidia.com/cudnn), a deep learning library by NVIDIA, does not promise reproducibility across runs. In some cases, reproducibility is not affected by just computational factors and attempts to attain precision over and over again. Something as basic as a software bug has the power to hinder reproducibility. Another factor that affects reproducibility is slight variations in the software used between environments.

### Attaining Reproducibility

In this section, we consider possible solutions at various stages of the machine learning process.

#### Data Gathering

A key enabler of reproducibility is first having the same training data as a previous model that we seek to replicate. As mentioned in the previous section, data that may be available in a research context may not be available in a production environment. However, there are a couple of ways to consider to address this.

The first potential solution is the use of snapshots. Researchers/programmers/data scientists could take a snapshot of training data and save it. You might wonder how this helps since we mentioned that the databases are often updated. It would thus help to save the data elsewhere. However, this would prove to be a challenge when dealing with a very large dataset. It might be a tiring process to take snapshots of very large sets of data and storing them elsewhere for future use.

A second possible solution is the use of timestamps. This method would prove to be more effective than the abovementioned one. Here’s how. The data sources could be designed with timestamps of great accuracy. For example, a database could capture the timestamps. The timestamps could be used to pinpoint training data. It is worth noting that this only works when using databases with the ability to capture said timestamps. If dealing with databases that lack this ability, it may take a lot of effort to redesign them to do so. Plus, this method does not fix the challenge of updating and replacing data in databases.

#### Creation of Features

A parameter that is extracted from data will remain the same in multiple environments only if the data is the same in those environments. Consider a scenario where data has missing values. A common practice to replace a missing value is to have the mean of the variable in focus. However, if training data is different between two environments, this impacts the value of the mean as well.

If [feature extraction](https://deepai.org/machine-learning-glossary-and-terms/feature-extraction) requires complex equations, it makes reproducibility that much harder to achieve. Let’s have a scenario where a feature is the sum total of another feature over time. It is impossible to recalculate such in the absence of all the previous data present in each environment. Furthermore, if features are reliant on random samples, the seed values and random samples have to be spawned in the same order. The seed value has to be the same for each of the environments.

To aid in reproducibility, features that are implemented should not change after being created. They need to immutable. A new feature that is dependent on an already existing one should be represented separately. For example, it should have its own new column. Such measures help in the reduction of dependencies which in turn assists in achieving uniformity across environments. This in turn reduces the potential errors when duplicating a machine learning pipeline in contrasting environments.

#### Model Building

Algorithms themselves pose a challenge to reproducibility. As we mentioned before, many models have an element of randomness in their machine learning process. This randomness has models using the same training data giving different outcomes. For example, [cross validation](/engineering-education/evaluating-ml-model-performance/) may be reliant on random partitioning of data for folds.

The potential solution to this is a simple one; keenness to order. Engineers should be keen on the order in which they pass features, hyperparameters as well as when to introduce [seed values](https://en.wikipedia.org/wiki/Initial_condition).

#### Deployment

We mentioned that differing software versions may end up creating nuances between pipelines in different environments. This might not be the most common challenge. Yet it is advisable to keep the same type and versions of software throughout the machine learning process.

It is also necessary to use the same programming languages across environments. Switching languages between environments opens up the possibility of human as well as deployment errors. {Deployment errors](https://docs.microsoft.com/en-us/azure/azure-resource-manager/templates/common-deployment-errors#:~:text=Deployment%20errors%20arise%20from%20conditions%20that%20occur%20during,types%20of%20errors%20appear%20in%20the%20activity%20log.) are as a result of conditions occurring during deployment. In this case, a condition may be the change in languages. Many errors can be avoided by using not only the same language all through but the same code too.

### Closing

There are so many challenges to reproducibility. We have only managed to go through a few of them. It is indeed a tall order to eliminate every challenge. Nonetheless, some of these challenges have very basic solutions that seem like a reminder to us to always be meticulous in our approach to the machine learning process.

### References and Further Reading

1. [Reproducible Machine Learning](https://towardsdatascience.com/reproducible-machine-learning-cf1841606805#:~:text=%20Reproducible%20Machine%20Learning%20%201%20A%20step,authors%20use%20non-parametric%20Mann%E2%80%93Whitney%20U%20test...%20More%20)

2. [Reproducibility in Machine Learning - Research and Industry](https://suneeta-mall.github.io/2019/12/21/Reproducible-ml-research-n-industry.html)

3. [Reproducibility in ML: why it matters and how to achieve it](https://determined.ai/blog/reproducibility-in-ml/)

4. [Reproducible Machine Learning Results By Default](https://machinelearningmastery.com/reproducible-machine-learning-results-by-default/)

5. [The Machine Learning Reproducibility Crisis](https://blog.dominodatalab.com/machine-learning-reproducibility-crisis/)

6. [How To Build And Deploy A Reproducible Machine Learning Pipeline](https://www.trainindatablog.com/building-and-deploying-reproducible-machine-learning-pipelines/)

7. [Reproducibility, Replicability, and Data Science](https://www.kdnuggets.com/2019/11/reproducibility-replicability-data-science.html)

8. [5 – Reproducibility](https://blog.ml.cmu.edu/2020/08/31/5-reproducibility/)
