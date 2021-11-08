---
layout: engineering-education
status: publish
published: true
url: /using-a-hard-margin-vs-soft-margin-in-support-vector-machines/
title: Using a Hard Margin vs Soft Margin in Support Vector Machines
description: This tutorial aims to help the reader understand the concept of a hard margin and a soft margin SVM and how to use each of them.
author: dorcas-wambui
date: 2021-11-08T00:00:00-19:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/hero.jpg
    alt: Hard Margin vs Soft Margin in Support Vector Machines Hero image
---
Support vector machines (SVMs) are a type of vector machine which supports vectors. Support vector machines, popularly called support vector classifications and support vector regression, deal with classification and regression problems (SVR). 
<!--more-->
Support Vectors are the data points or vectors nearest to the hyperplane that affect the hyperplane's location. They're known as support vectors since they help to stabilize the hyperplane. The time required to evaluate a big dataset using this technique makes it unfeasible even for smaller datasets. 

### Table of contents
- [Overview on support vector machines](#overview-on-support-vector-machines)
- [The role of hard and soft margin in support vector machines](#the-role-of-hard-and-soft-margin-in-support-vector-machines)
- [Support vector machines with a hard margin](#support-vector-machines-with-a-hard-margin)
- [Support vector machines with a soft margin](#support-vector-machines-with-a-soft-margin)
- [Hard margin and soft margin comparisons](#hard-margin-and-soft-margin-comparisons)

### Overview on support vector machines
It is possible to utilize vector machines for both classification and regression. Vector Machines are a powerful machine learning method. Because it has such a significant impact, we must carefully consider the margin we employ to solve a problem. When performing SVM calculations, this section of the course will discuss the distinctions between using a hard margin and using a soft margin.

These are the benefits of using this technique:
- SVM works effectively whenever we have a clear difference between classes.
- SVM outperforms other techniques in high-dimensional spaces.
- It works well when the number of parameters exceeds the number of samples.

### The role of hard and soft margin in support vector machines
Consider first a set of data that we want to categorize. Based on this knowledge, they may be differentiable, or the splitting of hyperplanes may be non-linear. We utilize SVMs with a large margin to prevent misclassifications for linearly separable. Soft margins are used when a linear border is not usable or when we desire to tolerate some misclassifications to increase the generality of the classification system.

### Support vector machines with a hard margin
If the hyperplane separating our two classes is defined as `wTx + b = 0`:

![Classes separation in hyperplane](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/margin.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/uploads/sites/4/2021/07/fig1-300x232.png)*

Then we can define the margin by using two parallel hyperplanes such as `wTx + alpha = 0`.

SVMs are represented by the green and purple lines in the above picture, respectively. Our goal is to narrow the distance between these two hyperplanes to the greatest extent feasible while preventing misclassifications in the hard margin. We may apply the formula for calculating a point's distance from a plane to discover this distance. In other words, the distances from  the blue and red dots, including the ranges between them, are:

![Distance of blue and red points from black line](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/distance.jpg) 

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-af94f334591a0560111114d1b5564e84_l3.svg)*

We must utilize our available area to realize this potential. We can look at `alpha = b + 1` and `beta = b - 1` without sacrificing generality. We must solve the problem in terms of maximizing or minimization. To compute gradients, we will use the term in its squared form:

![Squared for formula](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/gradient.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-2c76788516d46a04f3ff8b2739f02182_l3.svg)*

**Explanation** The above equation is used to minimize the margin without the loss of generality.

This optimization has several drawbacks. Suppose our classes are `-1` and `+1` for argument's sake. `wx+b>=1`, while `wx=b=-1` classifies the data as positive. These two requirements may be linked to a single one. As a solution, our optimization issue would be as shown below:

![Optimization problem](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/formula.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-b2857d7e569235a5d36162dbcbfa47e0_l3.svg)*

**Explanation** Above equation is used to express and combine two constraints for optimization of the problem. 

This kind of optimization problem is a primal problem since it always results in the production of a globally minimal value. We may solve the dual issue by using `alpha i` Lagrange multipliers in the equation.

![Primal problem](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/primal.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-51d090cd83bcdfc3945920d9d8b83c09_l3.svg)*

**Explanation** The above equation solves the problem by introducing Lagrange multipliers and converting it to the dual problem.

The `Lagrangian function` is the name used to describe this kind of function, which is distinct in terms of (omega) and `b` which is generated from the SVM's Lagrangian function.

![Lagrangian function](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/function.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-51d090cd83bcdfc3945920d9d8b83c09_l3.svg)*

**Explanation** Substituting the above equation in the second term of the lagrangian function, we would get the dual problem of the SVM.

We will have the SVM dual-issue if we substitute them into the second term of the Lagrangian function.

![Dual problem of svm](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/dual.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-51d090cd83bcdfc3945920d9d8b83c09_l3.svg)*

As a result, the dual issue is simpler to solve. It can be utilized for non-linear boundaries since it does not need to divide the data for training into dual issues and inner products.

### Support vector machines with a soft margin
The soft margin SVM optimization method has undergone a few minor tweaks to make it more effective. To begin, unchecking this scenario invites mistakes. Reduce the quantity of wrongly categorized data, which means we already have one more barrier to clear. Second, we should indeed create a loss function to reduce error which is the hinge loss function.

The [hinge loss](https://towardsdatascience.com/a-definitive-explanation-to-hinge-loss-for-support-vector-machines-ab6d8d3178f1) function is a soft margin loss function that is often seen. The hinge loss is a loss function used for classifier training, most notably in support vector machines (SVM) training. Hinges lose a lot of energy when they are close to the border. If we are on the wrong side of that line, then our instance will be classed wrongly.

![Common loss's function (hinge loss)](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/hinge.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-883e9d572dd28d577b2c059d18199ab9_l3.svg)*

Slack variables, or misclassified features, are lost when using hard margin SVM. So, a major issue for something such as the soft margin is as illustrated below:

![Primal problem for the soft margin](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/marg.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-be1276a088f9cf7beae6797ba1559071_l3.svg)*

**Explanation** The above equation is utilized to control the trade-off between maximizing the margin and minimizing the loss.

We may use the regularization parameter `C`  to control the trade-off between margin expansion and loss reduction. As shown in the image, loose factors have been added to both the fundamental and hard margin problems. Because it contains slack variables, the model is more lenient when misclassifications occur. This is illustrated below:

![Addtion of slack variables](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/slack.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/uploads/sites/4/2021/07/fig2-300x234.png)*

Finally, we may make the following comparison between the two issues that are shown in the diagram below:

![Primal problem for the soft margin](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/max.jpg)

*[Image Source: Baeldung](https://www.baeldung.com/wp-content/ql-cache/quicklatex.com-bbbfbebf6bca6465b721c9b83466f350_l3.svg)*

**Explanation**
As shown above, the change in the dual form is merely the upper constraint given to the Lagrange multipliers, which is the only different thing.

### Hard margin and soft margin comparisons
#### Hard margin
Assume there are three hyperplanes denoted by the letters `(π, π+, π-)`, so that on the positive side of each of them, `π+` is parallel to the support vectors, and on the negative side of each of them, `π-` is parallel to the support vectors. On the other hand, `π` is parallel to the support vectors on both of its positive sides.

![Hyperplanes (π, π+, π−)](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/negative.jpg)

*[Image Source: Towards data science](https://miro.medium.com/max/687/1*doKKm0KlPusiazXs-W8Mvg.png)*

Each hyperplane's equations may well be summarized as follows:
(for the sake of point X1)

![Equations for hyperplane](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/hyper.jpg)

*[Image Source: Towards data science](https://miro.medium.com/max/239/1*PrLTv8_JR0jdP7iljVQSow.png)*

**Explanation** As shown above, the equation determines that the product of the actual output and the hyperplane equation is `1`, meaning that the point is correctly classified in the positive domain.

> For point X3 is shown below:

![For the point at X3](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/three.jpg)

*[Image Source: Towards data science](https://miro.medium.com/max/151/1*ADzK9WGKUApRD7hpZKutfw.png)*

**Explanation**
X3 is beyond the hyperplane's domain when it is further away from it. This indicates the point is positive.

As stated above, if `Yi(WT*Xi +b) > 1`, then `Xi` is properly categorized; otherwise, `Xi` is wrongly classified.

If we add an outlier, our hyperplane becomes worthless since it cannot differentiate linearly separable points. As a result, we must use `hard margin` SVMs to classify each piece of data.

#### Soft margin
We presume data can be split linearly, although this might not be the case. This technique eliminates outliers, enabling us to categorize locations almost linearly. Thus, the slack variable `Xi` is generated. If we add  `ξ` to our previous equation, we get:

![Introducing ξ](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/xi.jpg)

*[Image Source: Towards data science](https://miro.medium.com/max/183/1*0N2rw2v2UFFGyjggQ5CxHw.png)*

**Explanation** This equation above updates the function to skip a few outliers and be able to classify almost linearly separable points.

If `ξi= 0`, then the points are properly classified. If that's not the case, we receive`ξi> 0`, which is miscategorized.

If `ξi> 0`, then the variables will be in the wrong dimension (variable). How to compute the error of  standard deviation is shown below:

![Average error](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/error.jpg)

*[Image Source: Towards data science](https://miro.medium.com/max/245/1*xnM6vrvKPdcC0Ttex-5heQ.png)*

**Explanation** The above equation calculates the average error of the variable in the incorrect dimension associated with the variable `Xi`.

As a result, we can express our goal mathematically as;

![Mathematical description of the formula](/engineering-education/using-a-hard-margin-vs-soft-margin-in-support-vector-machines/min.jpg)

*[Image Source: Towards data science](https://miro.medium.com/max/200/1*caObJmWU4iaMdzPNwMQ87Q.gif)*

As long as all points are correctly classified, we can find the vector `w` and `b` whereby the hyperplane given by `w` and `b` maximizes the margin length while minimizing the loss term.

The soft margin method is the name given to this kind of formulation. Hard margins are more exact than soft margins in SVMs because the data is more separable. When our dataset is split linearly, we strive for a small margin of error. Because the error margin is so small in certain instances, overfitting or excessive sensitivity to outliers is possible. We may also employ a softer margin SVM with a larger margin to improve the model's generalization.

### Conclusion
In this tutorial, we have looked at the concept of a hard margin and a soft margin SVM and how to use each one of them. The margins for support vector machines were also discussed.

Happy Learning!

---
Peer Review Contributions by: [Willies Ogola](/engineering-education/authors/willies-ogola/)
