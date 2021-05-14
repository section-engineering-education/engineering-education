---
layout: engineering-education
status: publish
published: true
url: /clustering-algorithms/
title: Basics of Clustering Algorithms
description: Clustering algorithms are procedures for partitioning data into groups or clusters such that the clusters are distinct, and members of each cluster belong together.
author: justin-osborne
date: 2020-06-28T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/clustering-algorithms/hero.jpg
    alt: cluster image example
---
When presented with a plethora of scattered data points, it can prove helpful to find the trends and similarities within the randomness that is data collection. However, it can be a daunting challenge on how to analyze large scatters of points. The process of testing every single data point as valid to a group or cluster will prove to be tedious and time-consuming, especially when there are hundreds of data points to verify. 
<!--more-->

Thankfully, clustering is a widely utilized tool in [unsupervised learning](https://towardsdatascience.com/unsupervised-learning-and-data-clustering-eeecb78b422a) algorithms to speed up the organization without any human input, taking a process that could have taken hundreds of man-hours and reducing it to short computing time. Unsupervised learning is one of the go-to methods of organizing large sums of data but is a topic for another discussion.

### What is clustering?
Clustering is the act of gathering data points and assorting these points into sectors based on similarities. In the more popular forms, cluster algorithms determine the similarities of data points by varying degrees of distance between one point and another. Computationally, the proximity of data points is typically calculated using Euclidean distances based functions or similar derivations.

The algorithm processes the data array and builds a structure from the determined similarities. Depending on the structure of the cluster, it may be optimal to choose one type of [cluster algorithm](https://www.kdnuggets.com/2019/10/right-clustering-algorithm.html#:~:text=The%20centers%20of%20clusters%20should,the%20dataset%20and%20every%20cluster) over another; doing this may reduce the processing time or increase the accuracy. To increase understanding of these organization types, we will cover two basic types of cluster algorithms popularly used across the industry.

### Centroid-based
This type of algorithm identifies a cluster of data according to the closeness of a determined focal point. The algorithm finds an optimum center in a group and does an iterative method of calculations to process the validity of these clusters. Something to note of this method is that this requires prior knowledge of the number of clusters in the data set. For example, in the infographic below, it would be stated that there are three known sets of clusters in the data set and separate these accordingly.
![Cluster Image 1](/engineering-education/clustering-algorithms/cluster-image1.png)<br>
One of the best examples of this algorithm is known as [K-means](https://towardsdatascience.com/k-means-clustering-algorithm-applications-evaluation-methods-and-drawbacks-aa03e644b48a), where “k” is defined as the total number of determined center points. Some of the benefits of K-means is that it is easily implemented, has relatively quick processing speed, is scalable, consistently converges, and easily adapts to new data sets.

Some of the caveats of this simplicity may be that it does not handle outliers well, requires a manual k value, may produce varying results from the same information, and can have trouble identifying clusters of varying size and density and identifying values that are in multiple dimensions. K-means may be used in areas where there is linear information, such as determining test scores or the probability of having heart attacks.

### Connectivity-based
As can be guessed, this model is based on the Euclidean distance of data points. It classifies the data points close in proximity as having more similarity than data points that are wildly spaced apart. Connectivity can be broken down into 2 different approaches: top-down and bottom-up.

The bottom-up method treats every data point as a single cluster and merges each cluster from the increasing distance until all of the points are contained within a single cluster; much like mitosis performed in reverse. Top-down approaches use the same method in reverse, where all data points start as a single cluster and are divided into independent clusters varying on the subjective distance of the points. These algometric methods are typically visualized through a hierarchical dendrogram chart much like the infographic below.  
![Cluster Image 2](/engineering-education/clustering-algorithms/cluster-image2.png)<br>
One of the main examples of this algorithm is known as hierarchal clustering. Unlike K-means, hierarchical does not require prior knowledge of the total number of cluster points and is not linear, rather it is quadratic. Given that it has increased complexity it also requires more processing power and offers low efficiency. That being said, it will have reproducible results, can work in multiple dimensions, is not sensitive to the distance metric, and has the unique feature of being able to recover parts of the hierarchy. This type of algorithm can be useful areas such as identifying different classes of plants and animals through similarities in DNA, predicting the stock market, or even determining different classes of cells.
