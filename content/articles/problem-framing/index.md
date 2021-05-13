---
layout: engineering-education
status: publish
published: true
url: /problem-framing/
title: Problem Framing in Machine Learning
description: Choosing a machine learning method to implement on data is not the easiest of processes. It is essential first to understand the precise business problem and its objectives. For instance, understanding what is to be predicted and the potential outcomes is critical. In this article, we look at how to frame a machine learning problem correctly.
author: collins-ayuya
date: 2021-02-18T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/problem-framing/hero.jpg
   alt: Problem framing in machine learning example image
---
Choosing a machine learning method to implement data is not the easiest of processes. It is essential to first understand the precise business problem and its objectives. For instance, understanding what needs to be predicted and understanding potential outcomes is critical. 
<!--more-->
One also needs to know what data should be used to train a model, among other factors. Such considerations help with the framing of a machine learning problem. In this article, we will look at how to frame a machine learning problem correctly.
### Contents
1. Problem framing in a basic ML workflow.
2. Why problem framing is not a straightforward process.
3. Best practices to frame a problem.

### Prerequisites
A basic understanding of machine learning concepts. Some introductory concepts of machine learning are covered in this [article](/supervised-learning-algorithms/) may prove helpful. This [article](/feature-engineering-in-machine-learning/) may also provide value.

### Machine learning workflow
A basic machine learning project workflow has four stages:
-	Problem framing. 
-	Data analysis.
-	Model building. 
-	Deployment.

The data analysis stage involves handling and refining the data that is available to build the model. Model building is a stage where the desired model is selected for use. 

The available dataset is divided into a training and test sets (validation sets as well, when necessary). The model is trained and tested. The last stage involves the application of the model. Its performance is evaluated in a production setting.

We are concerned with the first stage. Problem framing is the stage that involves defining the problem one seeks to solve. 

It involves outlining the goals of a given project. This stage shapes the rest of the machine learning process. It provides some sort of “checklist” before proceeding with the subsequent stages. 

We get to better understand the problem that needs to be solved. We get to understand whether machine learning is a suitable solution. The availability and sources of the data are examined, among other considerations. In this article, we will consider problem framing in a business/organizational context.

### Why problem framing is a challenge
Framing the correct problem in real-world data science projects may involve more processes than one would think. As much as it is worth noting that a data scientist’s role varies from company to company, problem framing is a challenge in organizations yet to become data-driven. Let’s look at a few reasons why.

#### Complex datasets
Often during experimentation, we tend to work with simple and straightforward datasets. Furthermore, the task to be carried out is usually well defined. 

These two conditions make it easy to know what kind of model to use for the task. However, the above conditions change when it comes to the real-world implementation of a data science project. 

It is common to find that the datasets available for use are complex. A dataset could have millions of examples. It could contain features that number in the thousands. 

This kind of complexity creates some difficulty in determining what kind of model to build. In addition to that, it makes it challenging to select features to use to create a model.

#### Little or no domain knowledge
The understanding of a specialized field or discipline is what we refer to as domain knowledge. A data scientist with domain knowledge in a field that a machine learning system intends to operate has the edge over one that lacks it. It might be a challenge to gather domain knowledge as a data scientist. 

Consider a context where a data scientist typically works on projects in different or unrelated domains. Since the domain often changes, a data scientist may have to rely on the organization they work for to determine features to use in a model. 

For a healthcare dataset, such a data scientist may have to work with doctors to cover the lack of domain experience. The features or variables for use in the model end up being dependent on medical professionals' guidance. This complicates the process of problem framing.

#### Organizational inability to leverage data
In this day and age, a huge number of organizations generate massive amounts of data. Some companies know exactly how to leverage this data to improve their operational efficiency, sales, and profits. 

However, there exist several organizations that are not yet data-driven. Such organizations do not know how to leverage data to improve their operations and income.

A data scientist working in such an organization may be tasked with using such data to formulate and frame a problem. The data scientist would have to figure out how to carry out this process. This may be quite cumbersome as well as challenging for the individual to execute.

#### Inadequate data
To frame a machine learning problem, an essential requirement is data. Let’s look at a scenario where a data scientist works for a company attempting to leverage data science. Let’s assume the company is looking to use data to help in attaining product-market fit. The company may not have enough (or any) data for analysis.

In this setup, a data scientist may need to liaise with upper management, product development teams, marketing, and sales teams to understand its aspirations and needs before devising how the problem may be framed. 

The team may then carry out methods to collect data. These methods may be in the form of experiments as well as surveys. If the company already has a product in the market, data such as user reviews may be instrumental. The collected data may be used as sample data.

### Problem framing best practices
It is essential to acknowledge problems vary from domain to domain. As such, this is not a one size fits all approach. The steps to framing a machine learning problem may differ based on context. I attempted to highlight the steps I find to be most important.

#### Defining success
A critical step in problem framing is first determining what would be considered a successful project. It is common to say a model is successful if it performs well during the testing stage. We observe metrics such as classification accuracy for classification problems. 

A model with a high degree of accuracy may be interpreted as being successful. However, it is worth noting that high accuracy does not necessarily mean that a model performs well. 

But that is beyond the scope of this article. For more on evaluation of a model’s performance, read this [article](/evaluating-ml-model-performance/).

In a business context, we may take a step back from metrics like accuracy and define success in a more general way. A less technical point of view may be taken. For instance, a successful project may be one that can analyze and segment customers into various categories based on their purchasing habits.

#### Setting observable and quantifiable performance metrics
Once we understand what counts as a successful project, we may deliberate on which metrics would best reflect said success. Quantifiable metrics provide adequate information for evaluating real-world success. 

A number of metrics are covered in this [article](/evaluating-ml-model-performance/). Important questions to ask at this stage include:
- How will the metrics be measured? 
- When can the metrics be measured? 
- What period will it take to evaluate the success (or failure) of the model?

Let’s use our example of categorizing customers based on their habits. Success would involve correctly categorizing customers into their respective segments. As a result, a key performance metric may be classification accuracy. 

We can measure these metrics after a set period that would allow us to gather enough data. The data should also be obtained from the right sources and be of the right quality. The duration to evaluate whether the model is a success or failure would depend on the organization's goals. 

For example, quarterly goals would help in determining a period for assessment. It might be said that if no product-market fit is attained within a given quarter, it may be deemed as an unsuccessful model.

#### Assessing feasibility of machine learning
It is worth noting that the two steps mentioned above do not need machine learning to be carried out. Let’s consider our example that involves segmenting customers. We have defined what the objective is. We have mentioned what we would consider being a successful outcome and a metric that would show this. 

Before wrapping machine learning around the task, it is wise to assess how feasible a machine learning approach would be. The reasoning behind this is that not all business problems would require a machine learning solution. We may realize that customers' segmentation may be done through the use of excel sheets then analyzed by a single person. This might be due to a small customer base.

Furthermore, the organization may not be ML-ready. It may not have the necessary support and eco-system required to sustain such a solution. A machine learning solution may be expensive to implement at such a time. 

Data may not be readily available to define the machine learning solution. For these scenarios, non-machine learning approaches to achieve the end goal may be more appropriate. We may opt to implement a machine learning approach at a later time.

On the other hand, machine learning may prove to be the most feasible approach. The organization may have enough resources to implement and maintain a machine learning solution. 

For instance, the organization may be capable of hiring a team of data scientists. In such a case, a strategy would have to be developed around the proposed approach. This would first involve formulating a machine learning question.

#### Formulating a machine learning question
At this point, we have already identified and defined the business problem. To formulate a machine learning question, we first need to understand the problem domain. In this case, we seek to classify customers into their correct segments based on their buying habits.

Relating the problem to machine learning would result in understanding the algorithm that could provide the best value. We would have to ask questions such as; could it be best framed as a classification problem? Is it a regression problem? 

To determine what kind of algorithm would solve a given problem, let us go through what we would expect from different algorithms:

#### Classification
A question we would have to ask is how many categories our problem would yield. This would give us either a binary classification problem or a multi-class classification problem. 

**Binary classification:** This offers only two classes for the problem. An example is giving binary output such as yes or no (or 0 or 1). The pair of possible outcomes are mutually exclusive.

**Multi-class classification:** We would expect many possible outcomes that would happen to be mutually exclusive.   

#### Regression
A regression problem would have us considering whether to implement linear, logistic, or multiple linear regression. 

**Linear regression:** If our problem involves just a single independent variable, then linear regression would be most appropriate. 

**Multiple linear regression:** If our regression problem involves more than a single independent variable, we will use multiple linear regression.

**Logistic regression:** For a logistic regression model, we would have to model data in binary values. It involves the use of dependent variables that can be represented as binary values. 

For example, if our problem requires us to compute the probability of an event's success or failure, logistic regression would prove useful.

Going back to our problem of classifying customers into their respective segments. Analysis of the problem shows that it is a multi-class classification problem. As a result, a classification algorithm would be an obvious choice.

The next step would involve understanding how the output of the proposed classification algorithm would impact decision-making. The solution would have to fit into the overall picture of the organization. 

For instance, the classification of customers would potentially allow the organization to develop better products. 

It could allow the production of more personalized products. It could also result in a better understanding of how to produce the right number of products for a given customer segments that allows better inventory clearance. The model’s output data would help make all these decisions.

#### Data and its sources
The problem framing process involves defining the data collection process. It is important to identify the sources of data for our model. Data powers machine learning algorithms. The data that would offer the best value would have to be of the utmost quality. Data of lesser quality would undermine the goals of our model. 

Questions worth asking at this point include:
- How much labeled data does the organization have?
- What is the source of the organization's data?
- Will the data have an impact on the problem's decision-making?

We should also think about potential bias in data at this stage. The data we feed our model may be biased in one way or another. As such, biased data will affect the quality of the predictions made. 

The predictions may not reflect the real-world nature of consumers of the organization's product. This would provide an underwhelming experience for the organization. In such an environment, such experiences tend to prove costly since they may translate into losses.

It is also worth considering the ethical and legal implications of obtaining the desired data. We would need to understand whether the data we are seeking has sensitive information about potential clients that might infringe individuals' rights. Are there aspects of the data that would be considered to be illegal? Are the methods of data collection legal as well? 

We should also consider the integrity of data. Is the data we are collecting both accurate and consistent? How do we ensure that the data is not degraded or compromised as it moves through a pipeline to another? How many people have access to said data? Data storage should also be considered. 

Would it be expensive to store data? Does the organization possess the adequate infrastructure to store the required data? Is the right data being collected? Is it stored in the right form? 

As such, a data strategy should be clearly defined to avoid ending up on the wrong side of the points mentioned above. It would also help avoid collecting unnecessary data. 

It could help deal with missing data, outliers as well as preventing gaps in data entirely. This would help maintain high standards of data quality, integrity, and consistency.

#### Beginning with a simple model
To allow for an explainable but interpretable model, one may consider using a simple model at this stage. A simple model may be described as one with the least possible complexity required to carry out a task correctly. The use of such a model allows for controllable debugging. Simple models also provide a good baseline. 

They can help evaluate whether there is a need for a more complex model. Complex models provide less explainability. They are harder and take longer to train when compared to simple ones. If the need for more complexity is justified, one may implement it later on.

We should also assess the ability of a model to learn. It is essential to point out the sections of our problem that might make learning difficult. 

A few factors that might be responsible for such difficulty include:
- The number of examples in a training set. If the number is low, the model's ability to learn will be impacted due to inadequate data.
- Noise. The learning process will be impacted if the examples contain too much noise.
- Performance on training data contrasts performance on unseen data. Performing poorly on unseen data means the model struggles to generalize to new data. A reason for such might be [overfitting](/regularization-to-prevent-overfitting/).

### Wrapping up
Problem framing is a key step in the machine learning workflow. Since it’s arguably less technical than other stages in a machine learning workflow, it might be inaccurately perceived as an easy step. 

Yet, the challenges we covered show otherwise. The best practices we have covered should be of help when framing machine learning problems.

Happy coding.

### References
1. [Problem Framing: The Most Difficult Stage of a Machine Learning Project Workflow](https://medium.com/towards-artificial-intelligence/problem-framing-the-most-difficult-stage-of-machine-learning-1a7f208ea414#:~:text=%20Problem%20Framing%3A%20The%20Most%20Difficult%20Stage%20of,Building.%20Pick%20the%20machine%20learning%20tool...%20More%20)

2. [Machine Learning Problem Framing](https://medium.com/towards-artificial-intelligence/machine-learning-problem-framing-2a0eba4c0d6d)

3. [ML Problem Framing](https://docs.aws.amazon.com/wellarchitected/latest/machine-learning-lens/ml-problem-framing.html)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

