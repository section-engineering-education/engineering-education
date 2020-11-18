## Clustering in Unsupervised Machine Learning

### Introduction to Unsupervised Machine Learning
Unsupervised learning is a machine learning (ML) technique that does not require the supervision of models by users. It is one of the categories of machine learning. The other two categories include reinforcement and supervised learning. 

In unsupervised machine learning, a learning algorithm is utilized to discover unknown patterns in unlabeled datasets. 

This is contrary to supervised machine learning that uses human-labeled data. Unsupervised learning algorithms use unstructured data that is grouped based on similarities and patterns.

### Why Unsupervised Learning is Important

Unsupervised learning is an important concept in machine learning. It saves data analysts’ time by providing algorithms that enhance the grouping and investigation of data. It is also important in well-defined network models. Many analysts prefer using unsupervised learning in network traffic analysis (NTA) because of frequent data changes and scarcity of labels. 

It is needed to create better forecasting, especially in threat detection. This can be achieved by developing network logs that enhance threat visibility. 

This category of machine learning is also resourceful in the reduction of data dimensionality. Dimensionality reduction is needed in datasets that have very many features. Unsupervised learning can analyze complex data to establish less relevant features. The model can then be simplified by dropping these features with insignificant effects on valuable insights. 

For example, an e-commerce business may use customers' data to establish shared habits. Using algorithms that enhance dimensionality reduction, irrelevant features of the data such as home address and weight may be dropped to simplify the analysis.

### Clustering Analysis
Clustering is the process of dividing uncategorized data into similar entities. This process ensures that similar data points are identified and grouped. Clustering algorithms are important in the processing of data and identification of groups (natural clusters). 

The following image shows an example of how clustering is done.

![Illustration of Clustering](/engineering-education/clustering-in-unsupervised-machine-learning/illustration-of-clustering.png)
[Image Source: Guru 99]( https://www.guru99.com/unsupervised-machine-learning.html#:~:text=Supervised%20vs.%20Unsupervised%20Machine%20Learning%20%20%20Parameters,%20%20Less%20accurate%20and%20trustworthy%20method.%20)

The left side of the image shows uncategorized data. On the right side, data has been grouped into clusters that consist of similar attributes. 

#### Why Clustering is Important 
Clustering is important because of the following reasons;
+ Through clusters, attributes of different entities can be profiled. This can subsequently enable users to sort data and analyze specific groups.
+ Clustering enables businesses to approach customer segments differently based on their similarities and attributes. This helps in profit maximization.
+ It can help in dimensionality reduction if the dataset consists of too many variables. Irrelevant clusters can be identified easily and removed from the dataset.

#### Types of Clustering in Unsupervised Machine Learning 
The main types of clustering in unsupervised machine learning include K-means, hierarchical clustering, Density-Based Spatial Clustering of Applications with Noise (DBSCAN), and Gaussian Mixtures Model (GMM). 

##### K-Means Clustering
In K-means clustering, data is grouped in terms of characteristics and similarities. K is a letter that represents the number of clusters. For example, if K=5, then the number of desired clusters is 5. If K=10, then the number of desired clusters is 10.

###### Key Concepts
Squared euclidean distance and cluster inertia are the two main concepts in K-means clustering. Learning these concepts will help in understanding the algorithm steps of K-means clustering. 

- _Squared Euclidean distance:_ If we have two points x and y, and the dimensional space given by m, the squared Euclidean distance will be given as;
![Squared Euclidean Distance](/engineering-education/clustering-in-unsupervised-machine-learning/squared-euclidean-distance.png)

- _Cluster inertia:_ This refers to the Sum of Squared Errors in the cluster. The cluster inertia is given as;
![Cluster Inertia](/engineering-education/clustering-in-unsupervised-machine-learning/cluster-inertia.png)
In the above equation, μ(j) represents cluster j centroid. If x(i) is in this cluster(j), then w(i,j)=1. If it is not, then w(i,j)=0.

Based on this information, we should note that the K-means algorithm aims at keeping the cluster inertia at a minimum level. 

###### Algorithm Steps
1. Choose the value of K (the number of desired clusters). The optimal value of K can be chosen through three main methods: field knowledge, business decision, and elbow method. The elbow method is the most commonly used. More information about this method can be found [here](https://bl.ocks.org/rpgove/0060ff3b656618e9136b). 

2.	Select K number of cluster centroids randomly
3.	Use the Euclidean distance (between centroids and data points) to assign every data point to the closest cluster. 
4.	Recalculate the centers of all clusters (as an average of the data points that have been assigned to each of them). 
5.	Steps 3-4 should be repeated until there is no further change.

![K-Mean Algorithm](/engineering-education/clustering-in-unsupervised-machine-learning/k-mean-algorithm.jpg)
[Image Source: Tutorial Ride](https://www.tutorialride.com/data-mining/k-means-clustering-in-data-mining.htm)

###### Advantages
+ It is very efficient in terms of computation
+ K-Means algorithms can be implemented easily

###### Disadvantages
+ K-Means algorithms are not effective in identifying classes in groups that are spherically distributed.
+ The random selection of initial centroids may make some outputs (fixed training set) to be different. This may affect the entire algorithm process. 

##### Hierarchical Clustering
In this type of clustering, an algorithm is used to construct a hierarchy (of clusters). This algorithm will only end if there is only one cluster left. 

Unlike K-means clustering, hierarchical clustering does not start by identifying the number of clusters. Instead, it starts by allocating each point of data to its cluster. 

A dendrogram is a simple example of how hierarchical clustering works. 
![Hierarchical Clustering Dendrogram](/engineering-education/clustering-in-unsupervised-machine-learning/hierarchical-clustering-dendrogram.png)
[Image Source: Scikit-Learn](https://scikit-learn.org/stable/_images/sphx_glr_plot_agglomerative_dendrogram_001.png)

In the above diagram, the bottom observations that have been fused are similar, while the top observations are different. 

###### Algorithm steps
1.	Allocate each data point to its cluster. 
2.	Use Euclidean distance to locate two closest clusters. These clusters should be merged to form one cluster.
3.	Determine the distance between clusters that are near each other. The nearest clusters should be combined until all the data items have been grouped to form a single cluster.

###### Advantages
+ The representations in the hierarchy provide meaningful information.
+ It does not require the specification of the number of clusters.
+ It is resourceful for the construction of dendrograms.

###### Disadvantages
+ Hierarchical models have a high sensitivity to outliers. In the presence of outliers, the models do not perform well
+ The computation of hierarchical clustering is costly.

##### Density-Based Spatial Clustering of Applications with Noise (DBSCAN)
This is a density-based clustering that involves the grouping of data points that are close to each other. Data points that are far from each other are marked as outliers. Data is sorted based on commonalities. 

###### Key Concepts
_MinPts:_ This is a certain number of neighbours or neighbour points

_Epsilon neighbourhood:_ This is a set of points that consist of a specific distance from an identified point. The distance between these points should be less than a specific number (epsilon).

_Core Point:_ This is a point in the density-based cluster with at least MinPts within the epsilon neighbourhood.

_Border point:_ This is a point in the density-based cluster with fewer than MinPts within the epsilon neighbourhood.

_Noise point:_ This is an outlier that does not fall in the category of a core point or border point. It is not part of any cluster.

###### Algorithm steps
1.	In the first step, a core point should be identified. The core point radius is given as ε. Create a group  for each core point.
2.	Identify border points and assign them to their designated core points. 
3.	Any other point that is not within the group of border points or core points is treated as a nose point. 

![DBSCAN Clustering](/engineering-education/clustering-in-unsupervised-machine-learning/dbscan-clustering.png)
[Image Source: Git Book](https://yongle.gitbooks.io/datamining/content/figures/dbscan.png)

###### Advantages 
+ It does not require the specification of the number of clusters.
+ It is very resourceful in the identification of outliers.
+ It offers flexibility in terms of the size and shape of clusters.

###### Disadvantages
+ It is not effective in clustering datasets that consist of varying densities.
+ Failure to understand the data well may lead to difficulties in choosing a threshold core point radius. 
+ In some rare cases, a border point can be reached by two clusters, which may create difficulties in determining the exact cluster for the border point. 

##### Gaussian Mixture Models (GMM)
This is an advanced clustering technique in which a mixture of Gaussian distributions is used to model a dataset. These mixture models are probabilistic. GMM clustering models are used to generate data samples. 

In these models, each data point is a member of all clusters in the dataset, but with varying degrees of membership. The probability of being a member of a specific cluster is between 0 and 1.

In Gaussian mixture models, the main information includes the latent Gaussian centers and the covariance of data. This makes it similar to K-means clustering. 

The following diagram shows a graphical representation of these models.
![Gaussian Mixture Model](/engineering-education/clustering-in-unsupervised-machine-learning/gaussian-mixture-model.png)

[Image Source: Daum](https://t1.daumcdn.net/cfile/tistory/99BC00385AC75F9A03)

###### Algorithm steps
1.	Initiate K number of Gaussian distributions. This is done using the values of standard deviation and mean. 
2.	Expectation Phase-Assign data points to all clusters with specific membership levels.
3.	Maximization Phase- The Gaussian parameters (mean and standard deviation) should be re-calculated using the ‘expectations’.
4.	Evaluate whether there is convergence by examining the log-likelihood of existing data. 
5.	Repeat steps 2-4 until there is convergence. 

###### Advantages
+ It offers flexibility in terms of size and shape of clusters.
+ Membership can be assigned to multiple clusters, which makes it a fast algorithm for mixture models. 

###### Disadvantages
+ If a mixture consists of insufficient points, the algorithm may diverge and establish solutions that contain infinite likelihood. This may require rectifying the covariances between the points (artificially). 
+ A sub-optimal solution can be achieved if there is a convergence of GMM to a local minimum.

### Conclusion
Unsupervised machine learning is needed for better forecasting, network traffic analysis, and dimensionality reduction. Clustering algorithms in unsupervised machine learning are resourceful in grouping uncategorized data into segments that consist of similar characteristics. Various types of clustering can be employed, including K-means, hierarchical clustering, DBSCAN, and GMM. An ideal clustering method can be chosen based on outcomes, nature of data, and computational efficiency.

### Resources
[Pathmind](https://wiki.pathmind.com/unsupervised-learning#k-means)

[The App Solutions](https://theappsolutions.com/blog/development/unsupervised-machine-learning/)





