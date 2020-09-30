
# Feature Engineering in Machine Learning: An Overview

![hero](/engineering-education/feature-engineering-in-machine-learning/hero.jpg)

[Image source](https://images.unsplash.com/photo-1581093806997-124204d9fa9d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)

The features used in a machine learning model are often the difference between model success, mediocrity and failure. Therefore, it is not enough building models, but also making sure they offer the best possible performance. The process of feature engineering serves this purpose.

This article is meant to be most useful to anyone new to the machine learning space. It intends to provide a light overview of feature engineering concepts in machine learning. The contents include:

• Introduction to machine learning.

• Understand the need/ importance of feature engineering in ML.

• Explore a few types of data features and processes.

• Differentiate between feature selection and feature engineering.

• Compare automated and manual feature engineering.


### Introduction to Machine Learning

Machine learning is a subset of artificial intelligence. It refers to giving computers ability to learn without explicitly being programmed. This means that computer systems learn from data. Machine learning uses algorithms to find patterns in data. The patterns help the system improve at the given task. Improvement is often an iterative task. Data is used to train machine learning algorithms. Training results in machine learning models. We may define machine learning models as the output of training machine learning algorithms. Examples of machine learning models include:

• **Classification models** – classification tasks involve predicting the type of an object. The types of objects are finite. These models handle classification tasks. Examples of these models include; [Naïve Bayes](https://www.machinelearningplus.com/predictive-modeling/how-naive-bayes-algorithm-works-with-example-and-full-code/), [Decision Tree](http://mines.humanoriented.com/classes/2010/fall/csci568/portfolio_exports/lguo/decisionTree.html#:~:text=Decision%20Tree%20Classifier%20is%20a%20simple%20and%20widely,an%20answer%2C%20a%20follow-up%20question%20is%20asked%20), [Support Vector Machine](https://towardsdatascience.com/support-vector-machine-introduction-to-machine-learning-algorithms-934a444fca47) among others. A brief definition of these classification models can be found in my [previous article](https://www.section.io/engineering-education/automated-fake-news-detection/)

• **Regression models** – unlike classification models, these tasks give output variables that take continuous values. An example of such a model is a linear regression model.

#### Machine Learning Categories

There are three types of machine learning:

• **Supervised learning**- an example of this is a student being supervised by a teacher. The student is trying to solve a problem in class. The teacher oversees that the student solves the problem correctly. For a model, this happens through use of labelled data. The labelled data, as input, guides the model. Classification and regression models are supervised learning algorithms.

• **Reinforcement learning**- learning is through a trial-and-error approach. An agent/machine performs actions and is either rewarded or learns from errors.

• **Unsupervised learning**- simply the opposite of supervised learning. There is no clean, complete or labelled dataset provided. While supervised learning output relies on labelled data, unsupervised output is based on the patterns identified in input data. Input data has no pre-existing labels.

We are now acquainted with machine learning. But, in order to understand what feature engineering is, we need to have an overview of the entire machine learning process.

#### Machine Learning Process

It is important to understand the machine learning lifecycle. These are more or less the steps of the machine learning process:

• **Collecting data**- data is gathered from various sources. In any machine learning workflow, this is the first step. It is a very important step since the right data translates to better results.

• **Preparing that data**- to make meaning out of data, a number of processes take place in this stage. Datasets are evaluated for missing values, outliers, trends and so on. Oddities in data are rectified. Data is cleaned. It is worth noting that the feature engineering process takes place here. I argue this to be the most Important step in the lifecycle.

• **Choosing a model**- this step involves selection of a model best suited to the prepared data.

• **Training**- model is trained in this stage (using data). Data may be split as test data and training data. Test data is used to test the model. Training data trains the model.

• **Evaluation**- model performance is evaluated at this stage through a number of metrics.

• **Model deployment**- models are deployed. They are integrated to their intended processes or applications.

• **Performance monitoring**- a model should always be monitored after deployment. This ensures the model works correctly. It also provides the chance to update models or carry out maintenance on them.

### Feature Engineering

As mentioned previously, feature engineering falls in data preparation stage of the machine learning process. Let us finally define feature engineering. Feature engineering is the process of creating new input features for machine learning. Features are extracted from raw data. These features are then transformed into formats compatible with the machine learning process. Domain knowledge of data is key to the process. It, along with programming and math skills, is required to perform feature engineering. The correct features make machine learning algorithms successful.

This is one of the most effective ways to improve model performance. But what is a feature?  According to Wikipedia, a [feature](https://en.wikipedia.org/wiki/Feature_engineering) is a property shared by all the independent units on which analysis is to be done. It is a characteristic that might assist in problem solving.
As beneficial as this process is, it is often described as being time consuming. It also is a difficult process. Furthermore, it requires domain expertise for the data in being analysed. So, why exactly do we need this process?

#### Need for feature engineering

Features influence results of predictive models. I highlight two points on the importance of this process:

1. **Reduced complexity**. Algorithms are fed raw data in order to build these models. However, these algorithms make predictions without a clear guide. Feature engineering guides these algorithms. But what is the benefit of this? For starters, with correct features, model complexity will reduce. Correct scope and purpose of the model makes the process more efficient. This makes it simpler to understand, build, modify and maintain models.

2. **Increased accuracy**. Feature engineering is a broad process. It involves transforming variables into suitable formats. It involves creation of new variables from existing ones. Filling in missing values, among other processes, is also under this umbrella. These processes ultimately influence accuracy of the model. When done correctly, with the correct data, it increases the accuracy of the models.

#### Features and Techniques

We have defined what a feature is. But, for wholesome understanding, it is important that we delve deeper to understand what kinds of features exist. After that, we finally go over a few feature engineering techniques.

Below are three general types of features.

##### Examples of Features

• **Categorical features**. These are features derived from categorical data. Categorical data is data that is grouped into categories. It is often in non-numerical form. An example of such data is, type of pet. This could be a dog, cat, snake, hamster and so forth.

• **Text features**. Text features are derived from text data. This means that text is encoded to corresponding numerical values.

• **Image features**. Images are converted into suitable formats for analysis. The result is image-based features.

Understanding of features puts us in a good position to get into feature engineering techniques.  Let’s briefly define 5 techniques.

##### 5 Feature Engineering Techniques

###### Imputation

It is common to deal with incomplete datasets. As we mentioned previously, feature engineering involves handling missing values. The technique responsible for this is imputation.

###### Outliers

Outliers are datapoints observed to be too far from the rest. They distort the results of the models therefore they must be handled. This technique deals with first identifying then trimming the outliers.

###### Log Transform

Skewness refers to the measure of how asymmetric a data distribution can be. When a dataset is skewed, it impacts performance of a model. Log transform comes in to fix skewness of dataset. It has a purpose to make the dataset distribution as close to normal as possible. This technique also reduces the impact of outliers. It is worth noting that this technique works only with positive values.

###### Binning

Overfitting refers to when a model contains more parameters than can be accounted for by dataset. Noisy data contributes to overfitting. As a result, we use binning technique to smooth noisy data. This involves dividing features into different bins. These features may be numerical or categorical.

###### Feature Split

This simply refers to splitting of a feature into two or more parts. This may be done to create new features or to aid an algorithm to get a better understanding of the dataset.

#### Feature Engineering vs Feature Selection

We have already defined and explored the feature engineering process. Nonetheless, it is common to have newbies use feature engineering and feature selection interchangeably.
As we learnt, feature engineering creates new features from raw data. However, feature selection is a process that involves selection of features of the highest influence on the target variable, from a set of existing features. This means the selection is a subset of existing features. The benefits of feature selection include:

• Improving model accuracy when correct features are selected.

• Reduction in data dimensionality. The result is reduced complexity of the model. This in turn means a model can be trained faster.

• Reduction in overfitting. We mentioned that the more the parameters in data, the higher the chance of overfitting. Reducing features through feature selection reduces these parameters. As a result, overfitting is reduced.

Feature engineering is often applied first for generation of additional features. Feature selection follows to reduce features to only the most influential ones.


#### Automated vs Manual Feature Engineering

If you’re concerned that feature engineering is an intimidating process, you are right to be. However, there is a solution to ease these concerns.
As mentioned previously, feature engineering is often a difficult and time-consuming task. Domain experience is also important. Manual feature engineering is prone to errors. Furthermore, this process must start from scratch for every dataset. Resultant features may be subjective to the engineer creating them. This is a sticking point for most companies who find value in these techniques but may not have the resources to hire an experienced team of data scientists. It is also an obstacle for practitioners who may be dealing with strict deadlines or multiple data science problems therefore time is of the essence. With some of these high stakes involved, errors in such environments can discredit the whole problem-solving process.

In response to the above obstacle, automated machine learning (AutoML) frameworks have been created. These frameworks automate most processes in the machine learning pipeline that would be created by specialized data science teams. Feature engineering is one of those processes. A framework worth checking out for automated machine learning is [Auto_ml](https://auto-ml.readthedocs.io/en/latest/). [Featuretools](https://featuretools.alteryx.com/en/stable/index.html) is a framework specifically for automated feature engineering. To read more on automated machine learning frameworks check out this [paper](https://arxiv.org/pdf/1808.06492v1.pdf).

Automated feature engineering automatically creates viable features from a dataset. The best of these features can be used for training. This greatly assists data scientists avoid the struggles of the manual process. It also offers an aspect of reusability of feature engineering approaches. Let us not mention the precious time that is saved through automating the process.

### It’s a Wrap

Feature engineering is key to building effective machine learning models. It is often the difference between an average model and a successful model. In addition to introducing machine learning, we have dissected feature engineering in this post. I am confident you now know what feature engineering is, why it is important and a few techniques associated with it. I do hope this lengthy article makes it less intimidating to approach feature engineering (and machine learning as a whole). Good luck!


### References

1. [Feature engineering for detecting spammers on Twitter: Modelling and analysis](https://doi.org/10.1177%2F0165551516684296)

2. [Feature selection for classification: A review](http://eprints.kku.edu.sa/170/1/feature_selection_for_classification.pdf)

3. [Benchmarking automatic machine learning frameworks](https://arxiv.org/pdf/1808.06492v1.pdf)

4. [Feature Engineering in Python](https://towardsdatascience.com/feature-engineering-in-python-part-i-the-most-powerful-way-of-dealing-with-data-8e2447e7c69e)

5. [Feature Engineering Techniques](https://towardsdatascience.com/feature-engineering-techniques-9a57e4901545)

6. [Create Features](https://docs.microsoft.com/en-us/azure/machine-learning/team-data-science-process/create-features)

7. [Feature Engineering: What powers machine learning](https://towardsdatascience.com/feature-engineering-what-powers-machine-learning-93ab191bcc2d)

8. [A practical guid to Feature Engineering in Python](https://heartbeat.fritz.ai/a-practical-guide-to-feature-engineering-in-python-8326e40747c8)
