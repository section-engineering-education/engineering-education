---
layout: engineering-education
status: publish
published: true
url: /engineering-education/feature-engineering-in-machine-learning/
title: Feature Engineering in Machine Learning
description: This article will go over a light overview of feature engineering concepts used in machine learning and help a developer distinguish between feature selection and feature engineering.
author: collins-ayuya
date: 2020-10-19T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/feature-engineering-in-machine-learning/hero.jpg
    alt: feature engineering machine learning image
---
The features used in a machine learning model are often the difference between model success, mediocrity, and failure. Therefore, it is not enough to simply build models, but also making sure they offer the best possible performance. Let us learn more about the process of feature engineering and how it serves this purpose.
<!--more-->
This article is meant to be most useful to anyone new to the machine learning space. It intends to provide a light overview of feature engineering concepts in machine learning.

The contents include:
- Introduction to machine learning.

- Understand the need/importance of feature engineering in ML.

- Explore a few types of data features and processes.

- Differentiate between feature selection and feature engineering.

- Compare automated and manual feature engineering.

### Introduction to Machine Learning
[Machine learning](https://en.wikipedia.org/wiki/Machine_learning) is a subset of [artificial intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence). It refers to giving computers the ability to learn without explicitly being programmed. This means that computer systems learn from data. Machine learning uses algorithms to find patterns in data.

The patterns help the system improve at the given task. Improvement is often an iterative task. Data is used to train machine learning algorithms. Training results in machine learning models. We may define machine learning models as the output of training machine learning algorithms.

Examples of machine learning models include:

- **Classification models** – classification tasks involve predicting the type of object. The types of objects are finite. These models listed below handle classification tasks. Examples of these models include; [Naïve Bayes](https://www.machinelearningplus.com/predictive-modeling/how-naive-bayes-algorithm-works-with-example-and-full-code/), [Decision Tree](http://mines.humanoriented.com/classes/2010/fall/csci568/portfolio_exports/lguo/decisionTree.html#:~:text=Decision%20Tree%20Classifier%20is%20a%20simple%20and%20widely,an%20answer%2C%20a%20follow-up%20question%20is%20asked%20), [Support Vector Machine](https://towardsdatascience.com/support-vector-machine-introduction-to-machine-learning-algorithms-934a444fca47) among others. A brief definition of these classification models can be found in my [previous article](/engineering-education/automated-fake-news-detection/)

- **Regression models** – unlike classification models, these tasks give output variables that take continuous values. An example of such a model is a linear regression model.

#### Machine Learning Categories
There are three types of machine learning:

- **Supervised learning** - an example of this is a student being supervised by a teacher. The student is trying to solve a problem in class. The teacher oversees the student solving the problem correctly. For a model, this happens through the use of labeled data. The labeled data, as input, guides the model. Classification and regression models are supervised learning algorithms.

- **Reinforcement learning** - learning is through a trial-and-error approach. An agent/machine performs actions and is either rewarded or learns from errors.

- **Unsupervised learning** - is simply the opposite of supervised learning. There is no clean, complete, or labeled dataset provided. While supervised learning output relies on labeled data, unsupervised output is based on the patterns identified within input data. Input data has no pre-existing labels.

We are now a bit more acquainted with machine learning. But, to understand what feature engineering is, we need to have an overview of the entire machine learning process.

#### Machine Learning Process
It is important to understand the machine learning lifecycle. These are more or less the steps of the machine learning process:

- **Collecting data**- data is gathered from various sources. In any machine learning workflow, this is the first step. It is a very important step since the right data translates to better results. For example, if your machine learning problem involves data that is available on the web, you may write scripts to scrape data and create a dataset. Furthermore, several platforms offer great datasets. Compared to building your datasets, this makes it convenient and provides vast datasets for experimentation. Examples of such platforms include; [Kaggle Datasets](https://www.kaggle.com/datasets), [Amazon Datasets](https://registry.opendata.aws/), [Google Dataset Search Engine](https://datasetsearch.research.google.com/), [Microsoft Datasets](https://msropendata.com/) and [Visual Data](https://www.visualdata.io/discovery).  

- **Preparing that data**- to get some form of meaning out of data, many processes take place in this stage. Datasets are evaluated for missing values, outliers, trends, and so on. Oddities in data are rectified. The data is cleaned. It is worth noting that the feature engineering process takes place here. I argue this to be the most important step in the lifecycle.

- **Choosing a model**- this step involves the selection of a model best suited to the prepared data. To select the best model, some factors have to be considered. The right model needs to meet the goals of the task in consideration. It needs to offer an acceptable degree of accuracy. The complexity of the model concerning the available dataset has to be considered as well. A more complex model increases the likelihood of overfitting, which we shall define later on. It might also be crucial to validate the effectiveness and stability of your model. A useful technique for this is [cross validation](https://towardsdatascience.com/cross-validation-in-machine-learning-72924a69872f#:~:text=%20Cross-Validation%20in%20Machine%20Learning%20%201%20Validation.,removing%20a%20part%20of%20it%20for...%20More%20).

Simply put, cross-validation gives us an idea of how well our model performs on training data. Various machine learning models may be compared to select the best one for a given task. To compare performance, cross-validation may be carried out on different models. The cross-validation scores for different models would show us which is the most accurate for the given data. Visualization of the performance of machine learning models also makes comparison easy. We get to compare properties such as variance and average accuracy among others.  

- **Training**-  the model is trained in this stage (using data). Data may be split as test data and training data. Test data is used to test the model. Training data trains the model.

- **Evaluation**- the model performance is evaluated at this stage through several metrics. An example of an evaluation metric is the [confusion matrix](https://machinelearningmastery.com/confusion-matrix-machine-learning/). The confusion matrix is a summary of the results of prediction when dealing with a classification problem. It summarizes the correct and incorrect predictions and highlights the types of errors being made by a classifier. Another evaluation metric is classification accuracy. This is a ratio of correct predictions made to all predictions made. An example of a metric when dealing with a regression problem is the mean squared error, which gives an idea of the magnitude of error.   

- **Model deployment**- the models are deployed. They are integrated into their intended processes or applications. Python libraries that can be used to package and deploy machine learning models include [Flask](https://flask.palletsprojects.com/en/1.0.x/tutorial/), [Django](https://www.djangoproject.com/start/), and [Bottle](https://bottlepy.org/docs/dev/tutorial.html). Machine learning models can be deployed as APIs. The reasons for deployment as an API include the ease of scaling and ease of integration with multiple systems. An example of a machine learning model deployed as an API is [Foodivisus](https://appsource.microsoft.com/vi-vn/product/web-apps/devissoftware.foodivisus), which recognizes food categories from input images.    

- **Performance monitoring**- a model should always be monitored after deployment. This ensures the model works correctly. It also provides the chance to update models or carry out maintenance on them.

### Feature Engineering
As mentioned previously, feature engineering falls into the data preparation stage of the machine learning process. Let us finally define feature engineering. Feature engineering is the process of creating new input features for machine learning.

Features are extracted from raw data. These features are then transformed into formats compatible with the machine learning process. Domain knowledge of data is key to the process. Along with domain knowledge, both programming and math skills are required to perform feature engineering. The correct features make machine learning algorithms successful.

This is one of the most effective ways to improve model performance. But what is a feature? According to Wikipedia, a [feature](https://en.wikipedia.org/wiki/Feature_engineering) is a property shared by all the independent units on which analysis is to be done.

It is a characteristic that might assist in problem-solving. As beneficial as this process is, it is often described as being time-consuming. It also is a difficult process. Furthermore, it requires domain expertise for the data being analyzed. So, why exactly do we need this process?

#### Need for Feature Engineering
Features influence the results of predictive models. I'd like to highlight two points on the importance of this process:

1. **Reduced complexity**: Algorithms are fed raw data to build these models. However, these algorithms make predictions without a clear guide. Feature engineering guide these algorithms. But what is the benefit of this? For starters, with correct features, model complexity will reduce. The correct scope and purpose of the model will make the process more efficient. This makes it simpler to understand, build, modify, and maintain models.

2. **Increased accuracy**: Feature engineering is a broad process. It involves transforming variables into suitable formats. Consider numerical data. It is already in a format that machine learning models can ingest. However, there may be situations where you may need to convert continuous values into discrete values. For example, when dealing with a feature whose data accumulates, it means it has an infinite upper boundary and has a high chance of attracting outliers. It would make sense to transform data from a continuous format to a discrete format. A technique such as binning, which is described later, can be used to carry out this transformation.     
Feature engineering also involves the creation of new variables from existing ones. Filling in missing values, among other processes, is also under this umbrella. These processes ultimately influence the accuracy of the model. When done correctly, with the correct data, it increases the accuracy of the models.

#### Features and Techniques
We have defined what a feature is. But, for a wholesome understanding, we must delve deeper to understand what kinds of features exist. After that, we finally will go over a few feature engineering techniques.

Below are three general types of features.

##### Examples of Features
- **Categorical features**. These are features derived from categorical data. Categorical data is data that is grouped into categories. It is often in a non-numerical format. An example of such data could be, a type of pet. This could be a dog, cat, snake, hamster, and so forth.

- **Text features**. Text features are derived from text data. This means that text is encoded to corresponding numerical values. A couple of techniques could be used to convert both text data and categorical data into numerical data. The first one is Label Encoding. This simply involves the conversion of every text value in a column into a number. It replaces all the text cases by assigning a different number to them and storing them in a single column. However, the downside of this technique is that algorithms can misinterpret numerical values to have some sort of non-existent hierarchy between them. A second technique is the One-Hot Encoder, which solves the aforementioned issue by converting text data into a new column and assigning each a 0 or 1 value. As much as this technique deals with the issue of hierarchy, it adds a lot more columns to the data-set. For more on categorical/text encoding, here is a useful [article](https://towardsdatascience.com/categorical-encoding-using-label-encoding-and-one-hot-encoder-911ef77fb5bd).     

- **Image features**. Images are converted into suitable formats for analysis. The result is image-based features. Features can be extracted through the use of image feature extraction algorithms like ORB and Vantage Point Tree. ORB (Oriented FAST and Rotated BRIEF) algorithm finds the "corners" of the image. It picks out features as image areas with high contrast. After detecting features, the extracted point are converted into binary feature vectors, which are strings of 0s and 1s between 128 and 526. Vantage Point Tree is a method that does analysis on image contents and compresses information into a 32-bit integer. It is capable of finding nearly identical images to a query image. To read more on these feature extraction algorithms check out this [article](https://towardsdatascience.com/comparing-the-feature-extraction-algorithms-for-images-e27c3c662874).

Feature extraction in machine learning occurs differently from feature extraction in deep learning. In machine learning, it is often a manual process. For example, features from an image, like parts of a car, would need to be extracted manually by a practitioner to be fed to a model. In deep learning, feature extraction takes place automatically during the learning process. Consider a convolutional neural network.

The first layer of the network learns small details from a given image. The subsequent layers combine previous information to compile more complex information. In a CNN, feature extraction is done by use of a filter. A convolution kernel acts as a filter. Convolution describes a mathematical process describing a rule of combining two functions to form a third function. Input data (or feature map) and the kernel are combined to produce a transformed feature map.

The feature map is filtered for useful information such as edges as an example. Convolutional networks adjust automatically to identify the best features for a given task. For more on convolutional neural networks read this [post](https://developer.nvidia.com/discover/convolutional-neural-network).   

Understanding of features puts us in a better position to dive into feature engineering techniques.  

Let’s briefly define 5 techniques.

##### 5 Feature Engineering Techniques

###### Imputation
It is common to deal with incomplete datasets. As we mentioned previously, feature engineering involves handling missing values. Missing values may be a result of data restrictions, human error, or interruption in the flow of data. Missing values affect the performance of machine learning models. The technique responsible for handling this is imputation. A simple solution to missing values is dropping entire rows or columns with a large percentage of missing values. But, to preserve the size of the data, it might be better to impute the missing data. For numerical imputation, one may consider a default value to impute in a column. One may also consider filling missing values with the medians of the columns. For categorical imputation, we may replace missing values with maximum occurred value in a column.

###### Outliers
Outliers are data points observed to be too far from the rest. They distort the results of the models therefore they must be handled. This technique deals with first identifying then trimming the outliers. Outliers can be identified through standard deviation. For example, if a value has a distance to the average that's greater than a certain value, it can be considered to be an outlier. [Z-score](https://www.statisticshowto.com/probability-and-statistics/z-score/) can be used to detect outliers. Outliers can be detected using percentiles. It can be assumed that a certain percentage from the bottom or the top is an outlier.

###### Log Transform
Skewness refers to the measure of how asymmetric a data distribution can be. When a dataset is skewed, it impacts the performance of a model. Log transform comes in to fix the skewness of a dataset. It has a purpose to make the dataset distribution as close to normal as possible. Log transform normalizes the magnitude differences in data. For example, the difference between the ages of 5 and 10 is different from the difference between the ages of 50 and 55. They are the same in terms of years but considering the magnitude, it will be much higher from the perspective of the younger ages. This technique also reduces the impact of outliers. The result of log transform is a more robust model. It is worth noting that this technique works only with positive values.

###### Binning
Overfitting refers to a model that contains more parameters than can be accounted for by the dataset. Noisy data contributes to overfitting. As a result, we use a binning technique to smooth noisy data. This involves dividing features into different bins. These features may be numerical or categorical. However, this technique has a trade-off between performance and overfitting. Every time binning occurs, data becomes more regularized. Regularization involves the shrinking of data coefficient estimates toward zero to avoid the risk of overfitting.  

###### Feature Split
This simply refers to the splitting of a feature into two or more parts. This may be done to create new features or to aid an algorithm to get a better understanding of the dataset. Splitting of features makes it possible to group and bin new features. New and potentially useful information may be uncovered through this process, resultantly improving the performance of the model. We get more useful features. However, there is no single method to split features. It is dependent on the characteristics of the column.  

#### Feature Engineering vs Feature Selection
We have already defined and explored the feature engineering process. Nonetheless, it is common to have newcomers use feature engineering and feature selection interchangeably.

As we learned, feature engineering creates new features from raw data. However, feature selection is a process that involves the selection of features of the highest influence on the target variable, from a set of existing features.

This means the selection is a subset of existing features. The benefits of feature selection include:

- Improving model accuracy when correct features are selected.

- Reduction in [data dimensionality](https://www.statisticshowto.com/dimensionality/#:~:text=Dimensionality%20in%20statistics%20refers%20to,one%20column%20representing%20each%20dimension.). The result is reduced complexity of the model. This in turn means a model can be trained faster. High dimensional data refers to data with so many dimensions that calculations become incredibly difficult. The number of features may end up exceeding the number of observations.

When you keep adding more variables to a multivariate model, it becomes increasingly difficult to predict certain quantities. An increase in variables leads to an exponential decrease in predictive power. This is what we refer to as the curse of dimensionality. More is not always better.

This explains why machine learning models with high dimensional data offer poor performance. It is important to reduce the dimensionality of data for better performance.

- Reduction in overfitting. We mentioned the higher number of parameters in data, the higher the chance of overfitting. Reducing features through feature selection reduces these parameters. As a result, overfitting is reduced.

Feature engineering is often applied first for the generation of additional features. Feature selection follows to reduce features to only the most influential ones.

#### Automated vs Manual Feature Engineering
If you’re concerned that feature engineering is an intimidating process, you are rightfully so. However, there is a solution to ease these concerns.

As mentioned previously, feature engineering is often a difficult and time-consuming task. Domain experience is also important. Manual feature engineering is prone to errors.

Furthermore, this process must start from scratch for every dataset. Resultant features may be subjective to the engineer creating them. This is a sticking point for most companies who find value in these techniques but may not have the resources to hire an experienced team of data scientists.

It is also an obstacle for practitioners who may be dealing with strict deadlines or multiple data science problems, therefore time is of the essence. With some of these high stakes involved, errors in such environments can discredit the whole problem-solving process.

In response to the obstacle above, automated machine learning (AutoML) frameworks have been created. These frameworks automate most processes in the machine learning pipeline that would be created by specialized data science teams. Feature engineering is one of those processes.

A framework worth checking out for automated machine learning is [Auto_ml](https://auto-ml.readthedocs.io/en/latest/). [Featuretools](https://featuretools.alteryx.com/en/stable/index.html) is a framework specifically for automated feature engineering. To read more on automated machine learning frameworks check out this [paper](https://arxiv.org/pdf/1808.06492v1.pdf).

Automated feature engineering automatically creates viable features from a dataset. The best of these features can be used for training. This greatly assists data scientists in avoiding the struggles of the manual process. It also offers an aspect of the reusability of feature engineering approaches. Let's not forget to mention the precious time that is saved by automating the process.

### It’s a Wrap
Feature engineering is key to building effective machine learning models. It is often the difference between an average model and a successful model. In addition to introducing machine learning, we have dissected feature engineering in this post. I am confident you now know what feature engineering is, why it is important, and a few techniques associated with it. I do hope this lengthy article makes it less intimidating to approach feature engineering (and machine learning as a whole).

Good luck!


### References
1. [Feature engineering for detecting spammers on Twitter: Modelling and analysis](https://doi.org/10.1177%2F0165551516684296)

2. [Feature selection for classification: A review](http://eprints.kku.edu.sa/170/1/feature_selection_for_classification.pdf)

3. [Benchmarking automatic machine learning frameworks](https://arxiv.org/pdf/1808.06492v1.pdf)

4. [Feature Engineering in Python](https://towardsdatascience.com/feature-engineering-in-python-part-i-the-most-powerful-way-of-dealing-with-data-8e2447e7c69e)

5. [Feature Engineering Techniques](https://towardsdatascience.com/feature-engineering-techniques-9a57e4901545)

6. [Create Features](https://docs.microsoft.com/en-us/azure/machine-learning/team-data-science-process/create-features)

7. [Feature Engineering: What powers machine learning](https://towardsdatascience.com/feature-engineering-what-powers-machine-learning-93ab191bcc2d)

8. [A practical guide to Feature Engineering in Python](https://heartbeat.fritz.ai/a-practical-guide-to-feature-engineering-in-python-8326e40747c8)

9. [Convolutional Neural Network (CNN)](https://developer.nvidia.com/discover/convolutional-neural-network)

10. [Categorical encoding using Label-Encoding and One-Hot-Encoder](https://towardsdatascience.com/categorical-encoding-using-label-encoding-and-one-hot-encoder-911ef77fb5bd)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
