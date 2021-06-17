---
layout: engineering-education
status: publish
published: true
url: /ensemble-bias-var/
title: Ensemble Learning on Bias and Variance
description: This article will provide an overview on on the errors of bias and variance. The goal is to understand the two errors. We will explore their relationship with each other and how ensemble methods affect them.
author: collins-ayuya
date: 2021-01-20T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/ensemble-bias-var/hero.jpg
    alt:  image example
---
In my previous [article](/engineering-education/ensemble-learning/), we covered ensemble learning and how it improves machine learning. We mentioned that it reduces the errors of bias and variance. These errors can affect the performance of a machine learning model.
<!--more-->
It's always preferable to have a low bias and variance. In this article, we will dissect the two errors and the effect of ensemble learning on them.

### Contents
1. Overview of bias and variance errors.
2. Relationship between bias and variance.
3. Effect of ensemble methods on bias and variance.

### Prerequisites
Aside from the aforementioned [article](/engineering-education/ensemble-learning/) on ensemble methods, I recommend have a basic understanding on the machine learning basics. This [post](/engineering-education/supervised-learning-algorithms/) should help with that.

### Prediction errors
Prediction errors are defined as the collection of bias, variance, and irreducible errors. We can refer to the irreducible error as noise since we cannot reduce it, regardless of the algorithm chosen. The focus of this article is on the errors of bias and variance. The goal is to understand the two errors. We shall explore their relationship with each other and how ensemble methods affect them.

#### Bias and variance
**Bias Error:** High bias refers to when a model shows high inclination towards an outcome of a problem it seeks to solve. It is highly biased towards the given problem. This leads to a difference between estimated and actual results. When the bias is high, the model is most likely not learning enough from the training data. 

It does not learn the key features therefore the resulting predictions are unreliable, and the generalization is poor. This is what is known as underfitting. To solve this, it is advisable to use a more complex model. However, that is not our focus today. Rather, we shall explore how to deal with bias using boosting.

![bias](/engineering-education/ensemble-bias-var/bias.png)

*Bias Error. High bias, showing how poorly a function fits datapoints, depicting underfitting.*

[Source](https://medium.com/ml-research-lab/ensemble-learning-relation-with-bias-and-variance-431cdc0a3fc9)

**Variance error:** The sensitivity of models to slight fluctuations in the training data describes the variance. When a function fits a bit too close to a given number of data points, we say that the model is overfitting. High variance is an indication of overfitting. 

To deal with this, we can get more training data if the data is inadequate. We could also use a less complex model. We shall, however, look at how to reduce variance using bagging.

![variance](/engineering-education/ensemble-bias-var/variance.png)

*Variance Error. High variance. The function fits the points too closely. Overfitting is present.*

[Source](https://medium.com/ml-research-lab/ensemble-learning-relation-with-bias-and-variance-431cdc0a3fc9)

### Bias variance trade-off
It is desirable to achieve a low bias and variance to ensure accurate predictions. High bias and high variance hint at lower performance.

![biasvariancetrade](/engineering-education/ensemble-bias-var/biasvariancetrade.png)

*Bias-Variance Trade-off.*

[Source](https://medium.com/ml-research-lab/ensemble-learning-relation-with-bias-and-variance-431cdc0a3fc9)

Let’s interpret the image above.

The center of the circles represents the actual value. The center of these circles depicts a model with perfect prediction ability. The crosses show the predicted value. The more we move from the center, the more the quality of prediction reduces.

If predictions are concentrated in one area (that happens not to be the center), underfitting is present. This is because of the high bias and low variance. The notable distance from the center of the circles is due to high bias. The crosses being so close to each other shows a low variance.

The scattering of predictions around the outer circles shows that overfitting is present. Low bias ensures the distance from the center of the circles is low. On the other hand, high variance is responsible for the crosses existing at a notable distance from each other.

Increasing the bias leads to a decrease in variance. Suppose we reduce bias, and variance increases. An ideal model would have low variance and low bias. This is shown in the image below.

![modelcomplexity](/engineering-education/ensemble-bias-var/modelcomplexity.png)

*Model Complexity.*

[Source](https://www.geeksforgeeks.org/ml-bias-variance-trade-off/?ref=rp)

Ensemble learning is especially useful when trying to control the two errors.

### Ensemble methods, bias, and variance
We covered ensemble learning techniques like bagging, boosting, and stacking in a previous [article](/ensemble-learning/). As a result, we won’t reintroduce them here. We mentioned that bagging helps reduce the variance while boosting reduces bias. In this section, we will seek to understand how bagging and boosting impact variance and bias.

#### Bagging and variance
Bagging is meant to reduce the variance without increasing the bias. This technique is especially effective where minute changes in a learner’s training set lead to huge changes in the predicted output. Bagging reduces the variance by aggregating individual models. These models have dissimilar statistical properties like the means and standard deviations, among others.

Let’s demonstrate how bagging reduces variance with a simple equation:

- Assume we measure a random variable $(x)$, with a normal distribution, which is denoted as $N(\mu,\sigma^2)$. $\mu$ is the mean of the distribution. It could also represent its median or mode. The parameter $\sigma$ is the standard deviation.

- Say we carry out only one measurement of the mean and variance of variable $x$. The mean we expect for variable $x_1$ is $\mu$. On the other hand, the variance of the distribution will be the square of $\sigma$.

- Suppose we measure our random variable $(x)$, $P$ times $(x_1, x_2……, x_p)$. That is, measurement in the form of $(x_1, x_2……, x_p)/P$. The mean will still be $\mu$. However, as per the equation below, the variance will be smaller.

$$ \frac {Var(x_{1})+…..Var(x_{P})}{P^2} = \frac {P\sigma^2}{P^2} = \frac {\sigma^2}{P} $$

- It is evident that the mean stays the same, while the variance is averaged. Hence the variance is reduced.

Bagging performs well on high variance models like decision trees. On lower variance models such as linear regression, it is not expected to affect the learning process. However, as per an experiment documented in this [article](https://towardsdatascience.com/bagging-on-low-variance-models-38d3c70259db#:~:text=As%20we%20have%20discussed%20earlier%2C%20bagging%20should%20decrease,difference%20between%20training%20accuracy%20and%20test%20accuracy%20smaller.), the accuracy reduces when bagging is carried out on models with high bias.

Carrying out bagging on models with high bias leads to a drop in accuracy. This is clear when comparing the performance of the model with and without bagging. Without bagging, the accuracy will be higher than when we implement bagging on such a model. I encourage checking out the article mentioned above to understand the experiment and findings in detail.

#### Boosting and bias
In this [article](/engineering-education/ensemble-learning/), we mentioned that boosting converts a collection of weak learners into strong learners. Boosting is especially useful in models that exhibit underfitting. These models are highly biased and have low variance.

We get to visualize the bias error from the image depicting underfitting in the [Bias and Variance](#bias-and-variance) section. It shows how poorly a function fits the given data points. To deal with this error, we train a learner and identify where it exhibits bias errors. The observations that are wrongly classified are assigned higher weights. 

The weighting allows each new model to concentrate its efforts on the observations that have proven difficult to fit correctly. A new classifier is then introduced and intuitively used to make predictions on the same data. With each iteration, these misclassified/difficult-to-fit data points can fit better, and the error will be reduced. 

This is how bias is reduced through boosting. The steps involved in the boosting process are outlined in the article linked in the previous paragraph.

![boosting](/engineering-education/ensemble-bias-var/boosting.jpg)

*Boosting illustration.*

[Image Source](https://in.pinterest.com/pin/334744184801199587/)

It is worth noting that boosting can also affect lowering variance but has a focus on reducing bias.

### Wrapping up
We now can conclude that ensemble methods reduce the errors of boosting and bagging. We have dissected these two errors. Their relationship with each other is now clearer. We have also explored the impact of boosting and bagging on them. Bagging and boosting primarily reduce variance and bias, respectively. 

Until next time, happy reading!

### References and further reading
1. [A bias-variance analysis of ensemble learning for classification](https://www.researchgate.net/publication/315067126_A_bias-variance_analysis_of_ensemble_learning_for_classification)

2. [Ensemble Learning Relation With Bias and variance](https://medium.com/ml-research-lab/ensemble-learning-relation-with-bias-and-variance-431cdc0a3fc9)

3. [Gentle Introduction to the Bias-Variance Trade-Off in Machine Learning](https://machinelearningmastery.com/gentle-introduction-to-the-bias-variance-trade-off-in-machine-learning/)

4. [Why Use Ensemble Learning?](https://machinelearningmastery.com/why-use-ensemble-learning/)

5. [Bias-Variance Tradeoff – Machine Learning](https://www.geeksforgeeks.org/ml-bias-variance-trade-off/?ref=rp)

6. [Bagging on Low Variance Models](https://towardsdatascience.com/bagging-on-low-variance-models-38d3c70259db#:~:text=As%20we%20have%20discussed%20earlier%2C%20bagging%20should%20decrease,difference%20between%20training%20accuracy%20and%20test%20accuracy%20smaller.)

7. [How to Reduce Variance in a Final Machine Learning Model](https://machinelearningmastery.com/how-to-reduce-model-variance/)

8. [Understanding the Effect of Bagging on Variance and Bias visually](https://towardsdatascience.com/understanding-the-effect-of-bagging-on-variance-and-bias-visually-6131e6ff1385)

9. [Boosting- Ensemble meta Algorithm for Reducing bias](https://medium.com/ml-research-lab/boosting-ensemble-meta-algorithm-for-reducing-bias-5b8bfdce281)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)

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
