 ![hero](/engineering-education/ensemble-bias-var/hero.jpg)

[Source](https://images.unsplash.com/photo-1556884201-c949a3bbf6ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=878&q=80)

In a previous [article](/engineering-education/ensemble-learning/), we covered ensemble learning and how it improves machine learning. We mentioned that it reduces the errors of bias and variance. These errors have an impact on the performance of a machine learning model. It is preferable to have low bias and variance. In this article, we dissect the two errors and the effect of ensemble learning on them.

### Contents

1. Overview of bias and variance errors
2. Relationship between bias and variance
3. Effect of ensemble methods on bias and variance

### Prerequisites

Aside from the aforementioned [article](/engineering-education/ensemble-learning/) on ensemble methods, I recommend understanding the basics of machine learning. This [post](/engineering-education/supervised-learning-algorithms/) should help with that.

### Prediction Errors

Prediction errors are defined as the collection of bias, variance, and irreducible errors. We can refer to the irreducible error as noise since it cannot be reduced, regardless of the algorithm chosen. The focus of this article is on the errors of bias and variance. The goal is to understand the two errors. We shall explore their relationship with each other and how ensemble methods affect them.

#### Bias and Variance

**Bias Error**. The bias error of a model is the difference between estimated and actual results. When the bias is high, the model is most likely not learning enough from the training data. The resulting predictions are unreliable and the generalization is poor. This is what is known as underfitting. A solve this, it is advisable to use a more complex model. However, that is not our focus today. Rather, we shall explore how to deal with bias using boosting.

![bias](/engineering-education/ensemble-bias-var/bias.png)

*Bias Error. High bias, showing how poorly a function fits datapoints, depicting underfitting.*

[Source](https://medium.com/ml-research-lab/ensemble-learning-relation-with-bias-and-variance-431cdc0a3fc9)

**Variance Error**. The sensitivity of models to slight fluctuations in the training data describes the variance. When a function fits a bit too close to a given number of data points, we say that the model is overfitting. High variance is an indication of overfitting. To deal with this, we can get more training data if the data is inadequate. We could also use a less complex model. We shall however look at how to reduce variance using bagging.

![variance](/engineering-education/ensemble-bias-var/variance.png)

*Variance Error. High variance. The function fits the points too closely. Overfitting is present.*

[Source](https://medium.com/ml-research-lab/ensemble-learning-relation-with-bias-and-variance-431cdc0a3fc9)

### Bias Variance Trade-Off

It is desirable to achieve low bias and variance to ensure accurate predictions. High bias and high variance hint at lower performance.

![biasvariancetrade](/engineering-education/ensemble-bias-var/biasvariancetrade.png)

*Bias-Variance Trade-off.*

[Source](https://medium.com/ml-research-lab/ensemble-learning-relation-with-bias-and-variance-431cdc0a3fc9)

Let’s interpret the image above.
The actual value is represented by the center of the circles. The center of these circles depicts a model with perfect prediction ability. The crosses show the predicted value. The more we move from the center, the more the quality of prediction reduces.
If predictions are concentrated in one area (which happens not to be the center) underfitting is present. This is because of high bias and low variance. The notable distance from the center of the circles is due to high bias. The crosses being so close to each other shows how variance.
The scattering of predictions around the outer circles shows that overfitting is present. Low bias ensures the distance from the center of the circles is low. On the other hand, a high variance is responsible for the crosses existing at a notable distance from each other.

Increasing bias leads to a decrease in variance. If we reduce bias, variance increases. An ideal model would have low variance and low bias. This is shown in the image below.

![modelcomplexity](/engineering-education/ensemble-bias-var/modelcomplexity.png)

*Model Complexity.*

[Source](https://www.geeksforgeeks.org/ml-bias-variance-trade-off/?ref=rp)

Ensemble learning is especially useful when trying to control the two errors.

### Ensemble Methods, Bias and Variance

We covered ensemble learning techniques like bagging, boosting, and stacking in a previous [article](/engineering-education/ensemble-learning/). As a result, we won’t reintroduce them here. We mentioned that bagging helps to reduce then variance while boosting reduces bias. In this section, we seek to understand how bagging and boosting impact variance and bias.

#### Bagging and Variance

Bagging is meant to reduce the variance without increasing the bias. This is a technique that is especially effective where minute changes in the training set of a learner lead to huge changes in the predicted output. Bagging reduces the variance by aggregating individual models. These models have dissimilar statistical properties like means and standard deviations among others.

Let’s demonstrate how bagging reduces variance with a simple equation:

• Assume we are measuring a random variable (x), with a normal distribution, which is denoted as N(µ,σ^2). µ is the mean of the distribution. It could also represent its median or mode. The parameter σ is the standard deviation.

• Say we carry out only one measurement of the mean and variance of variable x. The mean we expect for variable x1 is µ. On the other hand, the variance of the distribution will be σ^2.

• Suppose we measure our random variable (x), P times (x1, x2…… xp). That is, measurement in the form of (x1, x2…… xp)/P. The mean will still be µ. However, as per the equation below, the variance will be smaller.

$$ \frac {Var(x_{1})+…..Var(x_{P}}{P^2} = \frac {P * \sigma^2}{P^2} = \frac {\sigma^2}{P} $$

• It is evident that as much as the mean stays the same, the variance is averaged. Hence the variance is reduced.

Bagging performs well on high variance models like decision trees. On lower variance models such as linear regression, it is not expected to affect the learning process. However, as per an experiment documented in this [article](https://towardsdatascience.com/bagging-on-low-variance-models-38d3c70259db#:~:text=As%20we%20have%20discussed%20earlier%2C%20bagging%20should%20decrease,difference%20between%20training%20accuracy%20and%20test%20accuracy%20smaller.), the accuracy reduces when bagging is carried out on models with high bias.
Carrying out bagging on models with high bias leads to a drop in accuracy. This is clear when comparing the performance of the model with and without bagging. Without bagging, the accuracy will be higher in contrast to when we implement bagging on such a model. I encourage checking out the above-mentioned article to understand the experiment and findings in detail.

#### Boosting and Bias

In this [article](/engineering-education/ensemble-learning/), we mentioned that boosting converts a collection of weak learners into strong learners. Boosting is especially useful in models that exhibit underfitting. These models are highly biased and have low variance.
From the image depicting underfitting in the [Bias and Variance](#bias-and-variance) section, we get to visualize the bias error. It shows how poorly a function fits the given data points. To deal with this error, we train a learner and identify where it exhibits bias errors. The observations that are wrongly classified are assigned higher weights. The weighting allows each new model to concentrate its efforts on the observations that have proven difficult to fit correctly. A new classifier is then introduced and intuitively used to make predictions on the same data. With each iteration, these misclassified/difficult-to-fit data points are fit better, and the error is reduced. This is how bias is reduced through boosting. The steps involved in the boosting process are outlined in the article linked in the previous paragraph.

![boosting](/engineering-education/ensemble-bias-var/boosting.jpg)

*Boosting illustration.*

[Image Source](https://in.pinterest.com/pin/334744184801199587/)

It is worth noting that boosting can also have an effect of lowering variance, but has a focus on the reduction of bias.

### Wrapping Up

We can simply conclude that ensemble methods reduce the errors of boosting and bagging. We have dissected these two errors. Their relationship with each other is now clear. We have also explored the impact of boosting and bagging on them. Bagging and boosting primarily reduce variance and bias respectively. Until next time, happy reading!

### References and Further Reading

1. [A bias-variance analysis of ensemble learning for classification](https://www.researchgate.net/publication/315067126_A_bias-variance_analysis_of_ensemble_learning_for_classification)

2. [Ensemble Learning Relation With Bias and variance](https://medium.com/ml-research-lab/ensemble-learning-relation-with-bias-and-variance-431cdc0a3fc9)

3. [Gentle Introduction to the Bias-Variance Trade-Off in Machine Learning](https://machinelearningmastery.com/gentle-introduction-to-the-bias-variance-trade-off-in-machine-learning/)

4. [Why Use Ensemble Learning?](https://machinelearningmastery.com/why-use-ensemble-learning/)

5. [Bias-Variance Tradeoff – Machine Learning](https://www.geeksforgeeks.org/ml-bias-variance-trade-off/?ref=rp)

6. [Bagging on Low Variance Models](https://towardsdatascience.com/bagging-on-low-variance-models-38d3c70259db#:~:text=As%20we%20have%20discussed%20earlier%2C%20bagging%20should%20decrease,difference%20between%20training%20accuracy%20and%20test%20accuracy%20smaller.)

7. [How to Reduce Variance in a Final Machine Learning Model](https://machinelearningmastery.com/how-to-reduce-model-variance/)

8. [Understanding the Effect of Bagging on Variance and Bias visually](https://towardsdatascience.com/understanding-the-effect-of-bagging-on-variance-and-bias-visually-6131e6ff1385)

9. [Boosting- Ensemble meta Algorithm for Reducing bias](https://medium.com/ml-research-lab/boosting-ensemble-meta-algorithm-for-reducing-bias-5b8bfdce281)
