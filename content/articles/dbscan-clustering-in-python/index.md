### DBSCAN Algorithm in Python
DBSCAN is a popular **density-based** data clustering algorithm compared to the K-means clustering and the hierarchical clustering algorithms. First of all, DBSCAN stands for ''Density-Based Spatial Clustering of Applications with Noise''. This algorithm clusters the data points by separating the high-density regions from the low-density areas. Unlike the K-Means algorithm, the best thing with this algorithm is that we need not provide the number of clusters required prior. DBSCAN algorithm group points based on distance measurement, usually the *Euclidean distance*and the *minimum number of points*. An essential property of this algorithm is that it helps us track down the outliers as the points in low-density regions; hence it's not sensitive to outliers as is the case of K-Means clustering.

### Prerequisites
1. Python installed on your system or access to the Google Colab.
2. Dataset is available in the form of a CSV file.

### Introduction
DBSCAN algorithm works with two parameters. These parameters are:

 1. **Epsilon(Eps):** This is the maximum distance between two points so that we can consider them as neighbours. We consider *Eps* as a threshold for considering two points as neighbours. If the distance between any two points is less than or equal to the *Eps*, these points are considered neighbours. 
2. **MinPoints:** This refers to the minimum number of points required to form a cluster. We consider MinPoints as a threshold for considering a cluster as a cluster. A cluster is only recognized if the number of points is greater than or equal to the *MinPts*.
   
Based on these two parameters, we classify data points into three categories. So let's look at these categories.

### Types of data points in a DBSCAN Clustering
After the DBSCAN clustering is complete, we end up with three types of data points as follows:
1. **Core:** This is a point with at least *Minpoints* including itself within the distance *Eps* from itself.
2. **Border:** This point has at least one Core point at a distance *Eps*, but itself is not a core point, i.e., it does not satisfy the definition of core point.
3. **Noise:** This is the point that is neither a *Core* nor a *Border*. This point usually has less than *Minpoints* within distance *Eps* from itself.

Now, let's look at the algorithmic steps for DBSCAN.

### DBSCAN Algorithm 
The algorithmic steps for the DBSCAN clustering are as follows:

- **Step 1:** Initially, the algorithms start by selecting a point (x) randomly from the data set and finding all the neighbour points within *Eps* from it. If the number of *Eps-neighbours* is greater than or equal to **MinPoints**, we consider x a core point. Then, together with its *Eps-neighbours*, x forms the first cluster. 

  After creating the first cluster, we examine all other points and find their respective *Eps -neighbours*. If a member has at least *MinPoints* *Eps-neighbours*, expand the initial cluster by adding those *Eps-neighbours* to the cluster. This continues until there are no more points to add to this cluster.
  
- **Step 2:** For any other core point not assigned to a cluster, create a new cluster.
  
- **Step 3:** Find all its density recursively connected points and assign them to the same cluster as the core point.
  
- **Step 4:** Iterate through the remaining unvisited points in the dataset and assign them to the nearest cluster at *Eps* distance from themselves. We then set to the noise those points that do not belong to any cluster

### Python Implementation of DBSCAN
As usual to any implementation, we get started with fetching the dataset and preparing it ready for our model implementation. But, first, let's download this data  [here](https://github.com/Daniel695/datasets/blob/main/Mall_Customers.csv).

### Data Preprocessing
```python
# importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
# reading the data
data = pd.read_csv("/content/drive/MyDrive/Mall_Customers.csv")

```
#### Data Exploratory Analysis 

- #### checking the head of the data.
```python
data.head()

```
- #### Output
![dataset head](/engineering-education/dbscan-clustering-in-python/data-head.png)


- #### checking the shape of the dataset

```python
print("Dataset shape:", data.shape)

```
- #### Output
```bash
Dataset shape: (200, 5)

```
Next, we check if the dataset has any missing values.

```python

# checking for NULL data in the dataset
data.isnull().any().any()

```
- #### Output

```bash
False

```
The above output means there are no missing values in our dataset.

Since our data is ready to use, let's extract the `Annual Income` and the `Spending Score` columns and apply our DBSCAN model to them.

```python
# extracting the above mentioned columns
x = data.loc[:, ['Annual Income (k$)',
                 'Spending Score (1-100)']].values

```
- let's check the shape of x
  
```python
print(x.shape)

```
- #### Output

```bash
(200, 2)

```
Before we apply the DBSCAN model, first, we need to obtain its two parameters.
1. MinPoints:  We can obtain the  minimum number of Points to be used to recognize a cluster, as follows:
- If the dataset has two dimensions, use the min sample per cluster as 4.
- If the data has more than two dimensions, the min sample per cluster should be,
 Min_sample(MinPoints) = 2 * Data dimension
Since our data is two dimensional, we shall use the default value of 4 as our MinPoint parameter. 

2. Epsilon(Eps): To calculate the value of *Eps*, we shall calculate the distance between each data point to its closest neighbour using the Nearest Neighbours. After that, we sort them and finally plot them. From the plot, we identify the maximum value at the curvature of the graph. This value is our *Eps*.

#### Calculate the distances between data points using Nearest Neighbours.
```python
from sklearn.neighbors import NearestNeighbors # importing the library
neighb = NearestNeighbors(n_neighbors=2) # creating an object of the NearestNeighbors class
nbrs=neighb.fit(x) # fitting the data to the object
distances,indices=nbrs.kneighbors(x) # finding the nearest neighbours

```
#### Sorting and plot the distances between the data points.
```python
# Sort and plot the distances results
distances = np.sort(distances, axis = 0) # sorting the distances
distances = distances[:, 1] # taking the second column of the sorted distances
plt.rcParams['figure.figsize'] = (5,3) # setting the figure size
plt.plot(distances) # plotting the distances
plt.show() # showing the plot

```
#### Output
Executing the code above, we obtain the following plot:
![plot](/engineering-education/dbscan-clustering-in-python/distances-plot.png)

From the above plot, we note the maximum curvature of the curve is about eight, and thus we chose our *Eps* as 8.

We now have our two parameters as:
- *MinPoints = 4*
- *Eps = 8*
  Now that we have the parameters let's implement the DBSCAN model.

  ### Implementing the DBSCAN model

```python
from sklearn.cluster import DBSCAN
# cluster the data into five clusters
dbscan = DBSCAN(eps = 8, min_samples = 4).fit(x) # fitting the model
labels = dbscan.labels_ # getting the labels

```

```python
# Plot the clusters
plt.scatter(x[:, 0], x[:,1], c = labels, cmap= "plasma") # plotting the clusters
plt.xlabel("Income") # X-axis label
plt.ylabel("Spending Score") # Y-axis label
plt.show() # showing the plot

```
#### Clusters plot
![clusters plot](/engineering-education/dbscan-clustering-in-python/clusters-plot.png)
### Conclusion
In this article, we have covered the DBSCAN algorithm. First, we looked at its key parameters and how this algorithm clusters the data points. We also learned about three types of data points associated with the DBSCAN algorithm. Later we looked at how we implement this algorithm. 
Here is the end of this session.

Happy learning.
