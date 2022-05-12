---
layout: engineering-education
status: publish
published: true
url: /hierarchical-clustering-in-python/
title: Getting Started with Hierarchical Clustering in Python
description: In this article, we will be learning about the basics of hierarchical clustering in Python. Hierarchical clustering is one of the popular unsupervised learning algorithms.
author: dennis-kimutai-koech
date: 2021-12-15T00:00:00-00:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/hierarchical-clustering-in-python/hero.png
    alt: Getting Started with Hierarchical Clustering in Python Hero Image
---
Hierarchical clustering is one of the popular unsupervised learning algorithms. Hierarchical clustering obtained its name from the word hierarchy, this word means ranking things according to their importance.
<!--more-->
This is what hierarchical clustering does. It finds elements of the dataset with similar properties under consideration and groups them together in a cluster.

In the end, we obtain a single big cluster whose main elements are clusters of data points or clusters of other clusters. Hierarchical clustering approaches clustering problems in two ways. Let's look at these two approaches of hierarchical clustering.

### Prerequisites
To follow along, you need to have:
1. Python 3.6 or above installed on your computer.
2. Knowledge of Python programming language.

### Types of Hierarchical Clustering
#### Agglomerative clustering
In this clustering approach, we start with the cluster leaf and then move upward until the cluster root is finally obtained. Initially, this approach assumes each data point in the dataset is an independent cluster.

In the beginning, each data point is considered a single-element cluster (leaf). Since the two most similar clusters are combined at each step, we obtain fewer clusters at each current iteration than the previous iteration.

This process continues until we obtain one big cluster (root) whose elements are clusters of comparable properties. Once all clustering is completed, we visualize data clusters using a scatter plot.

We can further enhance our understanding of this algorithm by considering the flowchart below.

![Agglomerative Clustering](/engineering-education/hierarchical-clustering-in-python/agglomerative-clutsering.png)

Source: [Displayr](https://www.displayr.com/what-is-hierarchical-clustering/)

In this flowchart, we assumed a dataset with N elements where N = 6. Below are the steps involved in the clustering above:
- **Step 1:** Initially, assume each data point is an independent cluster, i.e. 6 clusters.
- **Step 2:** Into a single cluster, merge the two closest data points. By so doing, we ended up with 5 clusters.
- **Step 3:** Again, merge the two closest clusters into a single cluster. By so doing, we ended up with 4 clusters.
- **Step 4:** Repeat step three above until a single cluster of all data points is obtained.

If we visualize the dendrogram, we should obtain a tree-like structure with the root at the top like the one shown below:

![Dendrogram](/engineering-education/hierarchical-clustering-in-python/dendogram.png)

Generally, this is what the Agglomerative clustering algorithm is.

#### Divisive clustering
Divisive clustering is a top-down approach. In other words, we can comfortably say it is a reverse order of Agglomerative clustering. At the beginning of clustering, all data points are considered homogeneous, and hence it starts with one big cluster of all data points.

Then, at each clustering iteration, the most heterogeneous group is **divided** into two different clusters such that the variance in them is reduced. The process continues until all the optimal number of clusters is attained.

In the real world, however, the initial assumption of the Divisive clustering, the data is homogeneous, holds less weight than the Agglomerative clustering assumption that all data points are different from each other. This makes this algorithm less utilized in the clustering tasks than agglomerative clustering.

With that said, this article will give close attention to Agglomerative clustering as it is the algorithm we are most likely to apply in future clustering tasks.

Our agglomerative clustering algorithm talked about $two\ closest\ clusters$. So how do we determine how fur clusters are from each other?

In machine learning, there are various distance metrics that we can utilize and measure the distance between various points.

These metrics include:
- Euclidean distance
- Minkowski distance
- Hamming distance
- Manhattan distance

The Euclidean distance has shown a wide range of use in distance measurement compared to other metrics. This metrics is calculated as:

![Euclidean](/engineering-education/hierarchical-clustering-in-python/euclidean-distance.png)

Since we know the metrics we can use and measure the distance between fixed points.

Now it's time to go back and answer our question; how do we take this measurement between clusters?

When we talk about clusters, we refer to a group of points. To measure the distance between these groups of points, we need to develop a well-defined approach to enhance consistency in our clustering task.

The distance between two clusters can be taken in five different approaches. These approaches are generally known as **Linkage methods**.

Let us look at them and try to understand how they work.

1. **Single-linkage:** This method computes dissimilarities between all pairs of elements in the two clusters. The minimum dissimilarity is what qualifies to be the distance between the two clusters. This is illustrated in the figure below.

![Single-linkage](/engineering-education/hierarchical-clustering-in-python/single-linkage.png)

2. **Complete-linkage:** This method computes dissimilarities between all pairs of elements in the two clusters. The maximum dissimilarity is what qualifies to be the distance between the two clusters. This is illustrated in the figure below.

![Complete-linkage](/engineering-education/hierarchical-clustering-in-python/complete-linkage.png)

3. **Average Linkage:** This method computes the distance between two clusters by finding all possible dissimilarities between the two clusters. All the dissimilarities are then averaged, and the average value is then taken as the distance between these clusters.
4. **Centroid linkage:** This method involves centering each cluster and then measuring the distance between the obtained centers of the two clusters.

![Centroid distance](/engineering-education/hierarchical-clustering-in-python/centroid.png)

5. **Ward's Minimum variance method:** Ward distance is one of the better metrics for taking distances between clusters. This method looks for the aggregate deviation. For instance, if we have two clusters, we can pretend to merge them into one cluster and then estimate the centroid of the resulting cluster. After that, we find the sum of the squared deviation for all points from the new centroid. For different merges, we shall obtain other variations. Therefore, we choose the distance with the minimum merge as our distance.

### Implementing Hierarchical Clustering
Now is the time to put all we have discussed above into action. Here, we shall use a real-world dataset to implement an Agglomerative clustering model and finally visualize how the model could discover various clusters from the data.

With that said, you can download this [dataset](https://github.com/DennisKimt/datasets/blob/main/Mall_Customers.csv) and get started as below:

Once we have downloaded our data, the first thing is to import all the necessary libraries for this session. The following code imports these libraries.

### Importing necessary libraries

```python
import numpy as np # to handle numeric data
import matplotlib.pyplot as plt # for visualization
import pandas as pd # for handling dataframe
```

### Reading the dataset to workspace
Now that our libraries are imported, let us read THE data to OUR workspace and print the first five rows using the `head()` function.

```python
ourData = pd.read_csv('Mall_Customers.csv') # read the data
ourData.head() # print the first five rows of our dataset
```

![data head](/engineering-education/hierarchical-clustering-in-python/data-head.png)

We shall implement our hierarchical clustering model on the `Annual Income (k$)` and `Spending Score()1-100` columns using this dataset. So we need to extract these two features from our dataset. The code below accomplishes this activity:

```python
newData = ourData.iloc[:, [3, 4]].values # extract the two features from our dataset
```

The two features of our _newData_ are almost on the same scale. Therefore, we do not need to scale the data up. However, this will not always be the case.

We will be working with datasets whose values are totally on a different scale. In such a situation, we have to scale the data so that various features are comparable; otherwise, we will end up with an inferior model. The reason is that hierarchical clustering, like many other algorithms in machine learning, is distance-based (Euclidean distance).

Before attempting to cluster our data, we need to know how many clusters our data can optimally be clustered to. So let's first implement a dendrogram on our dataset to gain this knowledge.

### Determining the optimal number of clusters with dendrogram
The code below will build a dendrogram on our dataset:

```python
import scipy.cluster.hierarchy as sch # importing scipy.cluster.hierarchy for dendrogram
dendrogram = sch.dendrogram(sch.linkage(X, method = 'ward')) # finding the optimal number of clusters using dendrogram
plt.title('Dendrogram') # title of the dendrogram
plt.xlabel('Customers') # label of the x-axis
plt.ylabel('Euclidean distances') # label of the y-axis
plt.show() # show the dendrogram
```

#### Output
The code above returns a dendrogram, as shown below:

![Dendrogram](/engineering-education/hierarchical-clustering-in-python/dendogram.png)

Considering the dendrogram above, the optimal number of clusters can be determined as follows; hypothetically, extrapolate all the horizontal lines across the entire dendrogram and then find the longest vertical line that does not cross those hypothetical lines.

Across that longest line, establish a threshold. The number of clusters we can optimally cluster our data equals the count of euclidean distances (vertical lines) the established threshold cuts across.

In the dendrogram we have just obtained, the longest vertical line with no extended horizontal line crosses is at the green section. The third line is between euclidian distances (110 - 250). Taking our threshold to be 150, the optimal number of clusters obtained is five.

Knowing the optimal number our data should cluster into; we can now train our clustering model to achieve this goal.

### Hierarchical Clustering model training on the data

```python
from sklearn.cluster import AgglomerativeClustering # this line of code imports AgglomerativeClustering model from sk-learn
'''
we need to create an AgglomerativeClustering object, and in it, we pass the following parameters:
n_cluster= 5, the number of clusters our model should return
affinity=euclidean, specify metric to be used to calculate distances
linkage= ward to regulate how distance calculation will be carried out between different clusters.
'''
Agg_hc = AgglomerativeClustering(n_clusters = 5, affinity = 'euclidean', linkage = 'ward')
y_hc = Agg_hc.fit_predict(newData) # model fitting on the dataset
```

The code above trained our model, and we can now go on and visualize how the data was clustered. To do this, run the code below:

### Clusters viaualization

```python
# plotting cluster 1
plt.scatter(newData[y_hc == 0, 0], newData[y_hc == 0, 1], s = 100, c = 'red', label = 'Cluster 1') # plotting cluster 2
plt.scatter(newData[y_hc == 1, 0], newData[y_hc == 1, 1], s = 100, c = 'blue', label = 'Cluster 2') # plotting cluster 3
plt.scatter(newData[y_hc == 2, 0], newData[y_hc == 2, 1], s = 100, c = 'green', label = 'Cluster 3') # plotting cluster 4
plt.scatter(newData[y_hc == 3, 0], newData[y_hc == 3, 1], s = 100, c = 'cyan', label = 'Cluster 4')  # plotting cluster 5
plt.scatter(newData[y_hc == 4, 0], newData[y_hc == 4, 1], s = 100, c = 'magenta', label = 'Cluster 5')
# plot title addition
plt.title('Clusters of customers')
# labelling the x-axis
plt.xlabel('Annual Income (k$)')
# label of the y-axis
plt.ylabel('Spending Score (1-100)')
# printing the legend
plt.legend()
# show the plot
plt.show()
```

![Scatter plot](/engineering-education/hierarchical-clustering-in-python/customer-clusters.png)

The final detail we need to know about hierarchical clustering is that it's time and space complex and therefore is not a suitable solution for clustering problems with large datasets.

### Conclusion
In this article, we looked at hierarchical clustering and its types. First, we learned how these types of hierarchical clustering work and later concluded that the most appropriate type is agglomerative clustering.

We also looked at various methods used to measure distances between data points and criterion that guides us on how to take these measurements (_inkage Methods_).

Finally, we implemented our model, and in the process, we learned how to obtain an optimal number of clusters using a dendrogram.

Hope you find this article helpful.

Happy coding!

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
