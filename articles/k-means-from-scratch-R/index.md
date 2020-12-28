---
layout: engineering-education
status: publish
published: true
url: /engineering-education/k-means-from-scratch-r/
title: Step by Step Guide to Implement K-Means Algorithm in R
description: This article will go over how to code the K-means algorithms from scratch and will visualize the results.
author: lalithnarayan-c
date: 2020-10-23T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/k-means-from-scratch-r/hero.jpg
    alt: K-Means Algorithm in R example image
---
In this article, we will be coding the K-means algorithm from scratch and will visualize the results. Going through this article should result in a more intuitive understanding of the K-means algorithm.
<!--more-->
K-Means is an [unsupervised machine learning algorithm](https://www.guru99.com/unsupervised-machine-learning.html). Unsupervised learning algorithms learn from unlabeled data. [Supervised learning algorithms](engineering-education/supervised-learning-algorithms/), on the other hand, need data to be labeled to learn from it.

It belongs to the subclass of [clustering algorithms](/engineering-education/clustering-algorithms/) under unsupervised learning.

### Theory
K-Means is a clustering algorithm. Clustering algorithms form clusters so that data points in each cluster are similar to each other to those in other clusters. This is used in [dimensionality reduction](https://www.geeksforgeeks.org/dimensionality-reduction/) and [feature engineering](https://medium.com/mindorks/what-is-feature-engineering-for-machine-learning-d8ba3158d97a).

Consider the data plot given below.

![plot](/engineering-education/k-means-from-scratch-r/plot1.jpg)

To find a decision boundary that divides the data into k-different clusters, we use K-means. Let's assume we want to divide the given dataset into two clusters. What would be the optimal distribution of data points?

![plot](/engineering-education/k-means-from-scratch-r/plot2.jpg)

The example shown is one possible scenario after clustering. The green dots represent the centroids of the clusters. A centroid is a central point that is closest to all the points.

Let's take a closer look at the K-means algorithm, and try to understand what the algorithm is trying to accomplish:

1. Initialize `k.` `k` defines the number of clusters being formed.
2. Choose `k` data points `(x,y)` randomly represent the centroids of `k` clusters.
3. Calculate the distances between these `k` points and all the remaining points. Upon completion of this step, we obtain a list of pair-wise distances between all the points. It is worth noting that various other [distance measures](https://machinelearningmastery.com/distance-measures-for-machine-learning/) can also be used. This ensures the algorithm can be used in a wide variety of cases.
4. Using the obtained list, we compute the clusters. The k-clusters are formed with data points having the least distance from the randomly chosen centroids. Data points can belong to either of the k-clusters. The closer the data point to a given cluster, the higher the probability it belongs to that cluster.
5. Using the newly formed clusters, the centroid is recalculated as the x and y coordinates' average.

### Implementation
#### Step 1: Generation of Data
To get us started we will generate some random data. We will define two vectors and create a 2-D array that defines the (x,y) coordinate pairs.

```r
vector1 <- c(1, 1.5, 3, 5, 3.5, 4.5, 3.5)
vector2 <- c(1, 2, 4, 7, 5, 5, 4.5)
dataPoints<- array(c(vector1, vector2), dim = c(7, 2))
print(dataPoints)
```

The `dataPoints` is a 2-D array. The first column consists of the X coordinates, and the second column consists of the Y-coordinates.

It is defined as shown below:

```txt
 [,1] [,2]
[1,] 1.0 1.0
[2,] 1.5 2.0
[3,] 3.0 4.0
[4,] 5.0 7.0
[5,] 3.5 5.0
[6,] 4.5 5.0
[7,] 3.5 4.5
```

Let's us plot the data points and visualize them using the `plot` function in R. The output is shown below the code snippet:

```r
plot(dataPoints[,1], dataPoints[,2])
```

![plot](/engineering-education/k-means-from-scratch-r/plot1.jpg)

#### Step 2: Initiate Random Centroids for k-Clusters
We will initialize 2 clusters with centroids (1, 1) and (5, 7). Ideally, a random generator function such as runif() or rnorm() should be used to initialize clusters to assert the algorithm's generalization. For the reproducibility of results, we will consider pre-defined clusters.

```r
k=2
vec1 = c(1,5)
vec2 = c(1,7)
centroid = array(c(1,5,1,7), dim = c(k, 2))
print(centroid)
```

We define the number of clusters `k` equal to 2. The centroids are defined as an array of two co-ordinate pairs. The array `centroid` containing the coordinates of the two clusters is shown below:

```txt
 [,1] [,2]
[1,] 1 1
[2,] 5 7
```

We will plot the data points and the initial centroids on the same plot using the `plot` function. To specify the centroids, we use the `points` function. The `points` function is used to highlight points of interest using different colors. We represent the centroids using the color `red.`

```r
plot(dataPoints[,1], dataPoints[,2])
points(centroid[,1], centroid[,2],col="red")
```

![plot 3](/engineering-education/k-means-from-scratch-r/plot3.jpg)

#### Step 3: Calculating the Distance from each Point
To calculate the distance between the centroid and the remaining points, we will use Euclidean distance. The Euclidean distance is defined as follows:

$$ d = \sqrt{ \sum_i (x-x_i^2) + (y-y_i)^2}  $$

Where $(x,y)$ represent the centroid's coordinates, and $(x_i,y_i)$ represent the data-point's coordinates.

We will code the equation above in the following sub-section. There are three steps in computing the Euclidean distance.

-  Compute the difference between the corresponding X and Y coordinates of the data-points and the centroid.
-  Compute the sum of the square of the differences computed in Step 1.
-  Find the square root of the sum of squares of differences computed in Step 2.

1. Difference: $datapoint_i – centroid$
    ```r
    distance_from_cluster_1 = dataPoints[,]-centroid[1,]
    distance_from_cluster_1
    ```

    ```txt
    [,1] [,2]
    [1,] 0.0 0.0
    [2,] 0.5 1.0
    [3,] 2.0 3.0
    [4,] 4.0 6.0
    [5,] 2.5 4.0
    [6,] 3.5 4.0
    [7,] 2.5 3.5
    ```
2. Square of difference: $(datapoint_i – centroid)^2$

    ```r
    distance_from_cluster_1 = (dataPoints[,] - centroid[1,])^2
    distance_from_cluster_1
    ```

    ```txt
    [,1] [,2]
    [1,] 0.00 0.00
    [2,] 0.25 1.00
    [3,] 4.00 9.00
    [4,] 16.00 36.00
    [5,] 6.25 16.00
    [6,] 12.25 16.00
    [7,] 6.25 12.25
    ```
3. Addition and Square root:

    ```r
    distance_from_cluster_1 = sqrt(distance_from_cluster_1[,1] + distance_from_cluster_1[,2])
    distance_from_cluster_1
    ```
    ```txt
    [1] 0.000000 1.118034 3.605551 7.211103 4.716991 5.315073 4.301163
    ```

This `distance_from_cluster_1` represents the distance between each point and the centroid-1. Similarly, we calculate the distances for centroid-2.

```r
distance_from_cluster_2 = (dataPoints[,] - cent[2,])^2
distance_from_cluster_2 = sqrt(distance_from_cluster_2[,1] + distance_from_cluster_2[,2])
distance_from_cluster_2
```

The values of `distance_from_cluster_2` is given as follows:

```txt
[1] 5.376453 4.419417 1.776584 2.899353 0.728869 1.237437 1.075291
```

Combining `distance_from_cluster_1` and `distance_from_cluster_2`, we get the total distance array called `total_distance.` This array contains the distances between points and the centroids. We use this array to determine which cluster a given point belongs to.

```r
total_distance = array(c(distance_from_cluster_1, distance_from_cluster_2), dim = c(7, 2))
total_distance
```

The array `total_distance` is shown below:

```txt
 [,1] [,2]
[1,] 0.000000 7.211103
[2,] 1.118034 6.264982
[3,] 3.605551 3.605551
[4,] 7.211103 2.828427
[5,] 4.716991 2.500000
[6,] 5.315073 2.500000
[7,] 4.301163 2.915476
```

#### Step 4: Compare and Find the Closest Centroids
Let's create a logical vector comparing `distance_from_cluster_1` and `distance_from_cluster_2`. This vector will be comprised of the Boolean values `TRUE` and `FALSE.` Consider the example of creating this vector using a conditional statement.

The condition would be as follows: distance to the first cluster is less than the second cluster's distance. Points that satisfy this condition belong to cluster 1. The remaining points belong to cluster 2.

```r
c(total_distance[,1] <= total_distance[,2])
```
```txt
TRUE TRUE TRUE FALSE FALSE FALSE FALSE
```

Using the logical vector above, we obtain the elements of the first cluster. The operation used below is an example of conditional selection. Elements that satisfy this condition in the array `dataPoints` are printed.

```r
dataPoints[,1][c(total_distance[,1] <= total_distance[,2])]
```

```txt
1.0 1.5 3.0
```

To find the centroid of the newly formed cluster, we take the mean of all the points obtained above.
The thinking is as follows: We need to find a point closest to all the cluster data points. Therefore, averaging the data points results in a point closest to the remaining points.

```r
mean(dataPoints[,1][c(total_distance[,1] <= total_distance[,2])])
```

We calculate the mean using the R function `mean.` This is an example of how we select elements conditionally that belong to a cluster and how we find its centroid.

```txt
1.83333
```

We compute the X and Y coordinates of the centroid using the code above. We store the X coordinate in c1 and y-coordinates in c2. We copy the data in these lists to a new array called `new_centroid.`

```r
new_centroid = centroid
# Initialize new_centroids with previous values. Previous values are used as centroids are modified at the end of the algorithm.
c1 = c(mean(dataPoints[,1][c(total_distance[,1] <= total_distance[,2])]), mean(dataPoints[,2][c(total_distance[,1] <= total_distance[,2])]))
c2 = c(mean(dataPoints[,1][!c(total_distance[,1] <= total_distance[,2])]), mean(dataPoints[,2][!c(total_distance[,1] <=total_distance[,2])]))
new_centroid[1,] = c1
new_centroid[2,] = c2
new_centroid
```

The `new_centroid` contains the updated centroid of the formed clusters. Therefore, we have implemented the algorithm successfully.

```txt
 [,1] [,2]
[1,] 1.833333 2.333333
[2,] 4.125000 5.375000
```

Let's plot the new centroids using the following code:

```r
plot(dataPoints[,1], dataPoints[,2])
points(new_centroid[,1], new_centroid[,2],col="red")
```

The updated centroids are shown in the figure below.

![](/engineering-education/k-means-from-scratch-r/plot4.jpg)

### Advantages and Disadvantages
K-means is useful in implementing [dimensionality reduction](https://www.imperva.com/blog/clustering-and-dimensionality-reduction-understanding-the-magic-behind-machine-learning/) and [image compression](https://towardsdatascience.com/k-means-clustering-algorithm-applications-evaluation-methods-and-drawbacks-aa03e644b48a). Dimensionality reduction is used as a pre-processing step to reduce data dimensions during the execution of other machine learning algorithms. Image compression aims to eliminate data by reducing the size and still maintaining the relevant features and information.

Every algorithm has its own set of advantages and disadvantages. Understanding the pros and cons helps us understand when the algorithm is best suited for a problem and when it's not.

#### Advantages
- Easy to implement.
- Computationally less intensive.
- Scales to large datasets.

#### Disadvantage
- K-means chooses the initial centroid point randomly, and since the clustering accuracy depends on the initial choice of centroids, the accuracy can be low if the chosen centroids aren't proper.
- Considering only the distance between centroids of the cluster may not be efficient for categorical data.
- As the cluster size grows, it becomes a challenge to distinguish between two clusters based on a few attributes.

### Conclusion
All algorithms can be broken down into smaller pieces and be implemented from scratch. Understanding the theory and reasoning behind the algorithms helps one make better decisions while building applications.

That was a fantastic journey implementing the K-means algorithm from scratch. Pat yourselves on the back. Do connect with me on [Linkedin](https://www.linkedin.com/in/lalithnarayan-c-27a89a1b/) to share what you think about the article. Your feedback is highly appreciated.

### Additional Resources
[Clustering Algorithms](https://www.analyticsvidhya.com/blog/2016/11/an-introduction-to-clustering-and-different-methods-of-clustering/)

<!-- MathJax script -->
<script type="text/javascript" async
    src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-AMS-MML_HTMLorMML">
    MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      displayMath: [['$$','$$']],
      processEscapes: true,
      processEnvironments: true,
      skipTags: ['script', 'noscript', 'style', 'textarea', 'pre'],
      TeX: { equationNumbers: { autoNumber: "AMS" },
           extensions: ["AMSmath.js", "AMSsymbols.js"] }
    }
    });
    MathJax.Hub.Queue(function() {
      // Fix <code> tags after MathJax finishes running. This is a
      // hack to overcome a shortcoming of Markdown. Discussion at
      // https://github.com/mojombo/jekyll/issues/199
      var all = MathJax.Hub.getAllJax(), i;
      for(i = 0; i < all.length; i += 1) {
          all[i].SourceElement().parentNode.className += ' has-jax';
      }
    });
    MathJax.Hub.Config({
    // Autonumbering by mathjax
    TeX: { equationNumbers: { autoNumber: "AMS" } }
    });
  </script>
