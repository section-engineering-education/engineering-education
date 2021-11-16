# Getting Started with Hierarchical Clustering in Python
Hierarchical clustering is one of the popular unsupervised learning algorithms. It is used in grouping data points into groups of similar properties. Also known as, Hierarchical cluster analysis, this algorithm inherits its name from the word *hierarchy*, which means ranking or arranging things in order of their importance. This is what hierarchical clustering does. It identifies elements with a particular similarity in a dataset and clusters them until, in the end, we have a single cluster. Hierarchical clustering approaches clustering problems in two ways. These two approaches form the two types of hierarchical clustering. Let us look at each of them.

### Types of Hierarchical Clustering
#### Agglomerative clustering.
- **Agglomerative clustering:** Agglomerative clustering is a bottom-up approach. Initially, it assumes that each data point in the dataset is an independent cluster. So, in the beginning, each data point is considered a single-element cluster (leaf). Then, it tries to reduce the number of these clusters at each stage by merging the two most similar clusters into a new cluster. This process continues until we obtain one big cluster(root) whose elements are clusters of comparable properties. Once all clustering is completed, we visualize data clusters using a scatter plot.

We can further enhance our understanding of this algorithm by considering the flowchart below.

![Agglomerative Clustering](/engineering-education/hierarchical-clustering-in-python/agglomerative-clutsering.png)
Source:[Displayr](https://www.displayr.com/what-is-hierarchical-clustering/)

In this flowchart, we assumed a dataset with N elements where N = 6. Below are the steps involved in the above clustering.
- *Step 0:* Initially, assume each data point is an independent cluster.
- *Step 1:* Make each data point a single-point cluster, i.e., 6 clusters.
- *Step 2:* Take the two closest data points and merge them into a single cluster. By so doing, we ended up with 5 clusters.
- *Step 3:* Take the two closest clusters and merge them into a single cluster. By so doing, we ended up with 4 clusters.
- *Step 4:* Reapt step three until we have only one cluster.

If we visualize the dendrogram, we should obtain a tree-like structure with the root at the top like the one shown below. 

![Dendrogram](/engineering-education/hierarchical-clustering-in-python/dendogram.png)

Generally, this is the Agglomerative clustering algorithm.

#### Divisive hierarchical clustering:
 Divisive clustering is a top-down approach. In other words, we can comfortably say it is a reverse order of Agglomerative clustering. It begins with the root, in which all objects are included as a single cluster. Then, the most heterogeneous group gets **divided** into two different clusters at each iteration step. The process continues until all the optimal number of clusters is attained.

In the real world, however, the initial assumption of the Divisive clustering, the data is homogeneous, holds less weight than the Agglomerative clustering assumption that all data points are different from each other. This makes this algorithm less utilized in the clustering tasks than agglomerative clustering. With this said, this article will give close attention to Agglomerative clustering as it is the algorithm we are most likely to apply in future clustering tasks,

Our agglomerative clustering algorithm talked about $two\ closest\ clusters$. So how do we determine how fur clusters are from each other?

 In machine learning, there are various distance metrics that we can utilize and measure the distance between various points.
These metrics include:
- Euclidean distance
- Minkowski distance
- Hamming distance
- Manhattan distance

The Euclidean distance has shown a wide range of use in distance measurement compared to other metrics. This metrics is calculated as:

![Euclidean](/engineering-education/hierarchical-clustering-in-python/euclidean-distance.png)

Since we know the metrics we can use and measure the distance between fixed points, now it's time to go back and answer our question; how do we take this measurement between clusters?

 When we talk about clusters, we refer to a group of points. To measure the distance between these groups of points, we need to develop a well-defined approach to enhance consistency in our clustering task. There are five ways we can adopt and measure distances between clusters. Generally, these methods are known as **Linkage methods**.

Let us look at them and try to understand how they work. 
1. **Single-linkage:** According to this method, the distance between two clusters is the distance between the closest points between the two clusters, say cluster \(C_1\) and \(C_2\).

![Single-linkage](/engineering-education/hierarchical-clustering-in-python/single-linkage.png)

2. **Complete-linkage:** This method computes dissimilarities of all pairwise elements between two clusters, \(C_1\) and \(C_2\), and chooses the maximum value as the distance between these clusters.
![Complete-linkage](/engineering-education/hierarchical-clustering-in-python/complete-linkage.png)

3. **Average Linkage:** According to this method, the distance between two clusters, \(C_1\), and \(C_2\), is the average of all pairwise distances between the two clusters.


4. **Centroid linkage:** According to the centroid linkage, we first find the centroid for each cluster and then take the distance between these centroids in the two clusters.

![Centroid distance](/engineering-education/hierarchical-clustering-in-python/centroid.png)

5. **Ward's Minimum variance method:** Ward distance is one of the better metrics for taking distances between clusters. This method looks for the aggregate deviation. For instance, if we have two clusters, we can pretend to merge them into one cluster and then estimate the centroid of the resulting cluster. After that, we find the sum of the squared deviation for all points from the new centroid. For different merges, we shall obtain other variations. Therefore, we choose the distance with the minimum merge as our distance.


### Implementing Hierarchical Clustering
Now is the time to put all we have discussed above into action. Here we shall use a real-world dataset to implement an Agglomerative clustering model and finally visualize how the model could discover various clusters from the data. So let download this dataset [here](https://github.com/DennisKimt/datasets/blob/main/Mall_Customers.csv) and get started as follows:

Once we have downloaded our data, the first thing is to import all the necessary libraries for this session. The following code import these libraries.
### Importing the libraries
```python
import numpy as np # linear algebra
import matplotlib.pyplot as plt # this is used for the visualization
import pandas as pd # this is used for data preprocessing

```
### Import the dataset
Now that our libraries are imported, let us read THE data to OUR workspace and print the first five rows using the `head()` function.

```python
ourData = pd.read_csv('Mall_Customers.csv') # read the data
ourData.head() # print the first five rows of our dataset

```
![data head](/engineering-education/hierarchical-clustering-in-python/data-head.png)

We shall implement our hierarchical clustering model on the  `Annual Income (k$)` and `Spending Score()1-100` columns using this dataset. So we need to extract these two features from our dataset. The code below accomplishes this activity.

```python
newData = ourData.iloc[:, [3, 4]].values # extract the two features from our dataset

```
The two features of our *newData* are almost on the same scale. Therefore, we do not need to scale the data up. However, this will not always be the case. For example, we shall be working with datasets whose values are totally on a different scale. In such a situation, we shall have to scale the data so that various features are comparable; otherwise, we will end up with an inferior model. The reason is that hierarchical clustering, like many other algorithms in machine learning, is distance-based (Euclidean distance).

The next thing is to find the optimal number of clusters we should cluster our data. To do this, we shall first implement a dendrogram using our dataset.

### Finding the optimal number of clusters using dendrogram.

```python
import scipy.cluster.hierarchy as sch # importing scipy.cluster.hierarchy for dendrogram
dendrogram = sch.dendrogram(sch.linkage(X, method = 'ward')) # finding the optimal number of clusters using dendrogram
plt.title('Dendrogram') # title of the dendrogram
plt.xlabel('Customers') # label of the x-axis
plt.ylabel('Euclidean distances') # label of the y-axis
plt.show() # show the dendrogram

```
#### Output
The code above returns a dendrogram, as shown below.
![Dendrogram](/engineering-education/hierarchical-clustering-in-python/dendogram.png)

To determine the optimal number of clusters using a dendrogram, we extrapolate all the horizontal lines of the dendrogram across it. We then find the longest verticle line that does not cross those hypothetical lines. Across that longest line, we establish a threshold. The total number of verticle lines this threshold cuts across is optimal clusters.

In the dendrogram we have just obtained, the longest verticle line with no extended horizontal line crosses is at the green section. The third line is between euclidian distance (110 - 250). If we take the threshold like 150, we get the optimal number of clusters as 5.

We know the number of clusters our data can be grouped into, and now we train our model to obtain these clusters.

### Training the Hierarchical Clustering model on the dataset

```python
from sklearn.cluster import AgglomerativeClustering # importing the AgglomerativeClustering model from scikit learn
'''
build an object of AgglomerativeClustering and pass the following parameters:

n_cluster= 5 so that the model returns an exact 5 clusters
affinity=euclidean to specify our distance computation metric.
linkage= ward to regulate how distance calculation will be carried out between different clusters.
'''
hc = AgglomerativeClustering(n_clusters = 5, affinity = 'euclidean', linkage = 'ward') 
y_hc = hc.fit_predict(X) # fitting the model to the dataset

```
The code above successfully trained our model, and we can now go on and visualize how our data was classified as follows.

### Viaualizing clusters
```python
plt.scatter(newData[y_hc == 0, 0], newData[y_hc == 0, 1], s = 100, c = 'red', label = 'Cluster 1') # plotting the first cluster
plt.scatter(newData[y_hc == 1, 0], newData[y_hc == 1, 1], s = 100, c = 'blue', label = 'Cluster 2') # plotting the second cluster
plt.scatter(newData[y_hc == 2, 0], newData[y_hc == 2, 1], s = 100, c = 'green', label = 'Cluster 3') # plotting the third cluster
plt.scatter(newData[y_hc == 3, 0], newData[y_hc == 3, 1], s = 100, c = 'cyan', label = 'Cluster 4')  # plotting the fourth cluster
plt.scatter(newData[y_hc == 4, 0], newData[y_hc == 4, 1], s = 100, c = 'magenta', label = 'Cluster 5') # plotting the fifth cluster
plt.title('Clusters of customers') # title of the plot
plt.xlabel('Annual Income (k$)') # label of the x-axis
plt.ylabel('Spending Score (1-100)') # label of the y-axis
plt.legend() # print the legend
plt.show() # show the plot

```
![Scatter plot](/engineering-education/hierarchical-clustering-in-python/customer-clusters.png)

The final thing we need to know about hierarchical clustering is that it's time and space complexity and therefore is not a suitable solution for clustering problems with large datasets. 

### Conclusion
In this article, we looked at hierarchical clustering and its types. First, we learned how these types of hierarchical clustering work and later concluded that the most appropriate type is agglomerative clustering. Also, we looked at various methods used to measure distances between data points and criterion that guides us on how to take these measurements (*Linkage Methods*).

Finally, we implemented our model, and in the process, we learned how to obtain an optimal number of clusters using a dendrogram. Here we reach the end of this session.
