---
layout: engineering-education
status: publish
published: true
url: /applying-ai-and-ml-to-predict-consumer-behavior/
title: Applying AI and Machine Learning to Predict Consumer Behavior
description: In this article, we will understand how AI has helped in predicting the consumer behavior, to improve the strategies for increasing the revenue of a company.
author: skay-ai
date: 2021-07-14T00:00:00-10:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/applying-ai-and-ml-to-predict-consumer-behavior/hero.jpg
    alt: AI Consumer behavior image
---
In this article, we will learn and analyze general consumer behavior. We will also understand how Artificial Intelligence has helped in uncovering valuable insights, that led the companies to make the right decisions, for the vision of providing better value and generating better revenue.
<!--more-->
We will also analyze this using a case study, where we use data science and analytics to uncover valuable insights for deriving better solutions.

### Prerequisites
As a prerequisite, the reader must have a little understanding of Python, and machine learning.

### What is Artificial Intelligence?
Artificial Intelligence is the ability of a machine to learn like a human, thus achieving the level of human intelligence and much more.

With advancements in the field of AI, it has led to improvements across several industries like Automation, Supply chain, eCommerce, Manufacturing, and many more.

Not only that, sub-parts of AI i.e., Data Science and Machine Learning have enabled businesses to make the right decisions. In simpler words, for improving the revenue of an eCommerce store, we could analyze and provide personalized recommendations to customers based on their likes and dislikes, most frequently purchased items, previous searches, correlations between item purchases, and many more.

AI has played a significant role in eCommerce by planning inventory, logistics, finding trends, patterns, predicting future outcomes based on historical trends, inform fact-based decisions, etc.

### Understanding consumer behavior
Consumer Behavior, in its broadest sense, is concerned with how consumers select, decide, use and dispose of goods and services. It covers individuals, groups, or organizations of any verticals.

It gives a good idea and insights about consumer’s emotions, attitudes, and preferences which affect buying behavior. Thus, helping marketers to understand the needs of customers, bringing value to the customers, and in return generating revenue for the company.

### Predicting the consumer behavior
Big companies understand that predicting customer behavior fills the gap in the markets and identifies products that are needed and which could generate bigger revenue.

Consumer behavior prediction can be done by:

1. Segmentation: separating customers into smaller groups based on buying behaviors. This helps in the separation of concerns, which in turn helps us identify the region of the market.
2. Predictive Analytics: we use statistical techniques to analyze previous historical data to predict the future behavior of customers.

### Step by step implementation
Now, let's understand this is done, using a real-time example.

#### Understanding dataset
In this dataset, we have information related to customers like:

- `CustomerID` - ID of the customer
- `Gender` - Gender of the customer
- `Age` - Age of the customer
- `AnnualIncome` - annual income of the customer
- `SpendingScore` - score assigned based on the customer's behavior and their purchasing data

You can download the dataset [here](https://www.kaggle.com/vjchoudhary7/customer-segmentation-tutorial-in-python).

#### Objective
The objective of this tutorial is to understand the behaviors of your customer based on their purchasing data. This helps the marketing team to understand and plan new strategies accordingly.

#### Importing libraries
For data exploration, it is mandatory to have a few Python libraries installed.

You can download Python using [this](https://www.python.org/downloads/) link.

The libraries to download are:

- [NumPy](https://pypi.org/project/numpy/)
- [Pandas](https://pypi.org/project/pandas/)
- [Matplotlib](https://pypi.org/project/matplotlib/)
- [Sklearn](https://pypi.org/project/sklearn/)
- [Seaborn](https://pypi.org/project/seaborn/)

```python
import numpy as np
import pandas as pd
import sklearn
import matplotlib.pyplot as plt
import seaborn as sns
```

#### View dataset
Before we start, let's have a look at the dataset. To view the dataset, we have to import by reading the CSV file as shown below:

```python
df = pd.read_csv(r'../input/Mall_Customers.csv')
df.head()
```

![First 5 rows of the dataset](/engineering-education/applying-ai-and-ml-to-predict-consumer-behavior/dataset.png)
*First 5 rows of the dataset*

#### Data visualizations
##### Correlation between Age, Income and Spending scores
A better strategy to marketing is to analyze the spending patterns. Here, let's try to analyze and find how age, annual incomes and spending scores of the customers are.

```python
plt.figure(1 , figsize = (15 , 6)) # sets the dimensions of image
n = 0 
for x in ['Age' , 'Annual Income (k$)' , 'Spending Score (1-100)']:
    n += 1
    plt.subplot(1 , 3 , n) # creates 3 different sub-plots
    plt.subplots_adjust(hspace =0.5 , wspace = 0.5)
    sns.distplot(df[x] , bins = 20) # creates a distribution plot
    plt.title('Distplot of {}'.format(x)) # sets title for each plot
plt.show() # displays all the plots
```

**Output:**

![Distribution plots of Age, Annual Income and Spending scores](/engineering-education/applying-ai-and-ml-to-predict-consumer-behavior/distribution-plots.png)
*Distribution plots of Age, Annual Income, and Spending scores*

##### Gender analysis
The second most important thing in deciding the strategy is to analyze the spending patterns based on Gender. Here, we find that Females tend to purchase more than Males do.

```python
plt.figure(1 , figsize = (15 , 5))
sns.countplot(y = 'Gender' , data = df)
plt.show()
```

**Output:**

![Count plot describing the Males' and Females' spending patterns](/engineering-education/applying-ai-and-ml-to-predict-consumer-behavior/gender-count-plot.png)
*Count plot describing the Males' and Females' spending patterns*

#### Customer segmentation
Segmentation helps in dividing a set of large data into groups of smaller observations that are similar in specific ways relevant to marketing.

Each group contains individuals that are similar in-between themselves, and different from individuals from the other groups.

Segmentation is widely used as a marketing tool to create clusters of clients and adapt a relevant strategy for each of them.

Here, we will learn to segment this data based on several factors and understand how it helps in improving the existing strategy.

##### Segmentation using Age and Spending score
Let's try to segment the customers based on their age and their spending scores. This helps us understand the age category of the customers, which could possibly improve spending score, thereby increasing the revenue for the company.

Here, we have to decide the possible number of clusters (segments) that would return the best results. To do that, we loop through `1` to `11`, and find which cluster would be the right choice.

```python
X_age_spending = df[['Age' , 'Spending Score (1-100)']].iloc[: , :].values # extracts only age and spending score information from the dataframe
inertia = []
for n in range(1 , 11):
    model_1 = (KMeans(n_clusters = n ,init='k-means++', n_init = 10 , max_iter=300, 
                        tol=0.0001,  random_state= 111  , algorithm='elkan')) # use predefined Kmeans algorithm
    model_1.fit(X_age_spending) # fit the data into the model
    inertia.append(model_1.inertia_)
```

To read more about KMeans algorithm refer [this](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html) documentation. And, to understand working of the algorithm, refer [here](https://www.analyticsvidhya.com/blog/2019/08/comprehensive-guide-k-means-clustering/).

Let's visualize this via a graph:

```python
plt.figure(1 , figsize = (15 ,6)) # set dimension of image
plt.plot(np.arange(1 , 11) , inertia , 'o') # Mark the points with a solid circle
plt.plot(np.arange(1 , 11) , inertia , '-' , alpha = 0.5) # connect remaining points with a line
plt.xlabel('Number of Clusters') , plt.ylabel('Inertia') # label the x and y axes
plt.show() # display
```

![Line graph displaying clusters](/engineering-education/applying-ai-and-ml-to-predict-consumer-behavior/clusters-line-graph.png)
*Line graph displaying clusters*

As you may notice that after cluster `4`, the line graph starts becoming stable. This method is known as Elbow method.

Now, let's explore more with having 4 clusters.

```python
model_2 = (KMeans(n_clusters = 4 ,init='k-means++', n_init = 10 ,max_iter=300, 
                        tol=0.0001,  random_state= 111  , algorithm='elkan') ) # set number of clusters as 4
model_2.fit(X_age_spending) # fit the model
labels1 = model_2.labels_
centroids1 = model_2.cluster_centers_
```

Let's visualize them now:

Before that, there some prerequisites for plotting a graph - like setting the maximum and minimum ranges of values, initializing a `meshgrid()`, and so on.

```python
h = 0.02
x_min, x_max = X_age_spending[:, 0].min() - 1, X_age_spending[:, 0].max() + 1
y_min, y_max = X_age_spending[:, 1].min() - 1, X_age_spending[:, 1].max() + 1
xx, yy = np.meshgrid(np.arange(x_min, x_max, h), np.arange(y_min, y_max, h))
Z = model_2.predict(np.c_[xx.ravel(), yy.ravel()])  # returns flattened 1D array
```

You can read more about Meshgrids [here](https://numpy.org/doc/stable/reference/generated/numpy.meshgrid.html).

Now, let's plot the graph:

```python
plt.figure(1 , figsize = (15 , 7) )
plt.clf()
Z = Z.reshape(xx.shape)
plt.imshow(Z , interpolation='nearest', 
           extent=(xx.min(), xx.max(), yy.min(), yy.max()),
           cmap = plt.cm.Pastel2, aspect = 'auto', origin='lower')

plt.scatter( x = 'Age' ,y = 'Spending Score (1-100)' , data = df , c = labels1 , 
            s = 200 )
plt.scatter(x = centroids1[: , 0] , y =  centroids1[: , 1] , s = 300 , c = 'red' , alpha = 0.5)
plt.ylabel('Spending Score (1-100)') , plt.xlabel('Age')
plt.show()
```

**Output:**

![KMeans with 4 clusters](/engineering-education/applying-ai-and-ml-to-predict-consumer-behavior/kmeans-cluster-4.png)
*KMeans with 4 clusters*

From the above plot, we can infer many information about the spending patterns:

- The average spending score irrespective of age would be around `20`
- In the topmost cluster, Customers below age `40` has the highest spending scores. The cluster is less sparse.
- Above age `40`, the spending score remains consistently within the range of `30 - 60`.

More insights about these data could be extracted with deeper data analysis by correlating with all possible parameters that are directly or indirectly related.

### Conclusion
As we learned from the above simple case-study, we find that AI has played a significant role in almost all the industries. With rise in the trend of data analysis, the customers behavior is being continuously monitored for improving strategies and taking better decisions.

This article acts only as a guide for beginners, to get them started in this field.

At Section, you can find related topics below:

- [Why Python is essential for Data Analysts?](https://www.section.io/engineering-education/why-python-is-essential-for-data-analysis/)
- [Introduction to Data analysis using Pandas](https://www.section.io/engineering-education/data-analytics-using-pandas/)
- [10 Powerful Business Intelligence Tools for Data Analysts](https://www.section.io/engineering-education/ten-powerful-bi-tools-for-data-analysts/)
- [Roles in Data Science Industry](https://www.section.io/engineering-education/roles-data-science/)

### References
- [https://clootrack.com](https://clootrack.com/)
- [https://logicai.io](https://logicai.io/)
- [https://www.sprintzeal.com](https://www.sprintzeal.com/)
- [http://www.predictiveanalyticsworld.com](http://www.predictiveanalyticsworld.com/)
- [https://medium.com/omdena/](https://medium.com/omdena/)
- [https://www.sprintzeal.com/blog/](https://www.sprintzeal.com/blog/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
