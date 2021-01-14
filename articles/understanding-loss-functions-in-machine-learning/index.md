### Understanding Loss Functions in Machine Learning

Loss functions play an important role in any statistical model - they define an objective against which the performance of the model is evaluated and the parameters learned by the model are determined by minimizing a chosen loss function. Loss functions define what a good prediction is and isn't. In short, choosing the right loss function dictates how well your estimator is. This article probes into loss functions, the role they play in validating predictions and the various loss functions used.

### Pre-Requisities

The reader is expected to have a faint idea of machine learning concepts such as regression and classification, and the basic building blocks that formulate a statistical model that can churn out predictions. [Machine Learning Mastery](https://machinelearningmastery.com/types-of-learning-in-machine-learning/) has an excellent compilation of the concepts that would help in understanding this article.

### Table of Contents

1. [Introduction](#introduction)
2. [Loss Functions for Regression](#loss-functions-for-regression)
3. [Loss Functions for Classfication](#loss-functions-for-classification)
4. [Conclusion](#conclusion)
5. [Further Reading](#further-reading)

### Introduction

A loss function takes a theoretical proposition to a practical one. Building a highly accurate predictor requires constant iteration of the problem through questioning, modeling the problem with the chosen approach and testing. The only criteria by which a statistical model is scrutinized is its performance - how accurate the model's decisions are. This calls for a way to measure how far a particular iteration of the model is from the actual values. This is where loss functions come into play. [Loss functions](https://en.wikipedia.org/wiki/Loss_function) measure how far an estimated value is from its true value. [A loss function maps decisions to their associated costs](https://www.analyticsvidhya.com/blog/2019/08/detailed-guide-7-loss-functions-machine-learning-python-code/). Loss functions are not fixed, they change depending on the task in hand and the goal to be met. 

### Loss Functions for Regression

Regression involves predicting a specific value that is continuous in nature. Estimating the price of a house or predicting stock prices are examples of regression because one works towards building a model that would predict a real-valued quantity. Let's take a look at some loss functions which can be used for regression problems and try to draw comparisons among them.

#### Mean Absolute Error 

[Mean Absolute Error (also called L1 loss)](https://en.wikipedia.org/wiki/Mean_absolute_error) is one of the most simple yet robust loss functions used for regression models. Regression problems may have variables that are not strictly Gaussian in nature due to outliers. Mean Absolute Error would be an ideal option in such cases because it does not take into account the direction of the outliers (unrealistically high positive or negative values) As the name suggests, MAE takes the average sum of the absolute differences between the actual and the predicted values.

![MAE](/engineering-education/understanding-loss-functions-in-machine-learning/mean-absolute-error.png)     

*Source: [Google](https://www.gstatic.com/education/formulas2/-1/en/mean_absolute_error.svg)*

#### Mean Squared Error

[Mean Squared Error (also called L2 loss)](https://en.wikipedia.org/wiki/Mean_squared_error) is almost every data scientist's preference for a loss function for regression. This is because most variables can be modeled into a Gaussian distribution. Mean Squared Error is the average of the squared differences between the actual and the predicted values.

![MSE](/engineering-education/understanding-loss-functions-in-machine-learning/mean-squared-error.png)

*Source: [Google](https://www.gstatic.com/education/formulas2/-1/en/mean_squared_error.svg)*

#### Mean Bias Error

Mean Bias Error is used to calculate the average bias in the model. Corrective measures can be taken to reduce the bias post-evaluating the model using MBE. Mean Bias Error takes the actual difference between the target and the predicted value and not the absolute difference. One has to be cautious as the positive and the negative errors could cancel each other out, which is why it is one of the lesser-used loss functions.

![MBE](/engineering-education/understanding-loss-functions-in-machine-learning/mean-bias-error.png)

*Source: [Medium](https://miro.medium.com/max/992/1*IRC-jYMJehmHl96GIUAT4Q.png)* 

#### Mean Squared Logarithmic Error

Sometimes, one may not want to penalize the model too much for predicting unscaled quantities directly. Relaxing the penalty on huge differences can be done with the help of Mean Squared Logarithmic Error. Calculating the Mean Squared Logarithmic Error is the same as Mean Squared Error, except the natural logarithm of the predicted values is used rather than the actual values.

#### Huber Loss

A comparison between L1 and L2 loss yields the following results:

1) L1 loss is more robust than its counterpart.

    On taking a closer look at the formulas, one can observe that if the difference between the predicted and the actual value is high, L2 loss magnifies the effect when compared to L1. Since L2 succumbs to outliers, L1 loss function is the more robust loss function.

2) L1 loss is less stable than L2 loss.

    Since L1 loss deals with the difference in distances, a small horizontal change can lead to the regression line jumping a large amount. Such an effect taking place across multiple iterations would lead to a significant change in the slope between iterations. On the other hand, MSE ensures the regression line moves lightly for a small adjustment in the data point. 
    
[Huber Loss](https://en.wikipedia.org/wiki/Huber_loss) combines the robustness of L1 with the stability of L2, essentially the best of L1 and L2 losses. For huge errors, it is linear and for small errors, it is quadratic in nature. Huber Loss is characterized by the parameter delta (𝛿).

![Huber Loss](/engineering-education/understanding-loss-functions-in-machine-learning/huber-loss.png)

*Source: [Analytics Vidhya](https://cdn.analyticsvidhya.com/wp-content/uploads/2019/08/huber.jpg.jpg)* 

### Loss Functions for Classification 

Classification problems involve predicting a discrete class output. It involves dividing the dataset into different and unique classes based on different parameters so that a new and unseen record can be put into one of the classes. A mail can be classified as a spam or not a spam and a person's dietary preferences can be put in one of three categories - vegetarian, non-vegetarian and vegan. Let's take a look at loss functions that can be used for classification problems.

#### Binary Cross Entropy Loss

This is the most common loss function used for classification problems that have two classes. The word "entropy", seemingly out-of-place, has a statistical interpretation. [Entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory)#:~:text=Entropy%20measures%20the%20expected%20(i.e.,of%20a%20coin%20toss%20(%20).) is the measure of randomness in the information being processed. If the divergence of the predicted probability from the actual label increases, the cross-entropy loss increases. Going by this, predicting a probability of .011 when the actual observation label is 1 would result in a high loss value. In an ideal situation, a "perfect" model would have a log loss of 0. Looking at the loss function would make things even clearer - 

![Binary Cross Entropy Loss](/engineering-education/understanding-loss-functions-in-machine-learning/binary-cross-entropy-loss.png)

*Source: [Rohan Varma](https://rohanvarma.me/Loss-Functions/)* 

Since binary classification means the classes take either 0 or 1, if y<sub>i</sub> = 0, that term ceases to exist and if y<sub>i</sub> = 1, the (1-y<sub>i</sub>) term becomes 0. Pretty clever, isn't it?

#### Categorical Cross Entropy Loss

Categorical Cross Entropy loss is essentially Binary Cross Entropy Loss expanded to multiple classes. One requirement when categorical cross entropy loss function is used is that the labels should be one-hot encoded. That way, there would be only one element in the target vector which will not be zero and hence, the elements which have zeros would be discarded by virtue of multiplication with zero. This property is extended to an activation function called softmax, more of which can be found in [this article](https://www.section.io/engineering-education/activation-functions/)

#### Hinge Loss

Another commonly used loss function for classification is the hinge loss. Hinge loss is primarily developed for [support vector machines](https://en.wikipedia.org/wiki/Support-vector_machine) for calculating the maximum margin from the hyperplane to the classes. Loss functions penalize wrong predictions and does not for the right predictions. So, the score of the target label should be greater than the sum of all the incorrect labels by a margin of (at the least) one. This very margin is the maximum margin from the hyperplane to the data points, which is why hinge loss is preferred for SVMs. The mathematical formulation of hinge loss is as follows:

![Hinge Loss](/engineering-education/understanding-loss-functions-in-machine-learning/hinge-loss.png)

*Source: [Towards Data Science](https://towardsdatascience.com/common-loss-functions-in-machine-learning-46af0ffc4d23)* 

Hinge Loss is extended to [Squared Hinge Loss Error](https://peltarion.com/knowledge-center/documentation/modeling-view/build-an-ai-model/loss-functions/squared-hinge) and [Categorical Hinge Loss Error](https://www.tensorflow.org/api_docs/python/tf/keras/losses/categorical_hinge)

#### Kullback Leibler Divergence Loss

Kullback Leibler Divergence Loss (simply KL Loss) is a measure of how a distribution varies from a reference distribution (or a baseline distribution). A Kullback Leibler Divergence Loss of zero means that both the probability distributions are identical. The number of information lost in the predicted distribution is used as a measure. The KL Divergence of a distribution P from Q is given by

![KL Divergence Loss](/engineering-education/understanding-loss-functions-in-machine-learning/kl-divergence-loss.png)

*Source: [Analytics Vidhya](https://www.analyticsvidhya.com/blog/2019/08/detailed-guide-7-loss-functions-machine-learning-python-code/)* 

### Conclusion

This article was a run-through of the loss functions used in classification and regression problems. Although picking a loss function is not given much importance and overlooked, one must understand that there is no one-size-fits-all and choosing a loss function is as important as choosing the right machine learning model for the problem in hand. 

### Further Reading

1. [Algorithmia](https://algorithmia.com/blog/introduction-to-loss-functions)

2. [Analytics Vidhya](https://www.analyticsvidhya.com/blog/2019/08/detailed-guide-7-loss-functions-machine-learning-python-code/)

3. [Machine Learning Mastery](https://machinelearningmastery.com/how-to-choose-loss-functions-when-training-deep-learning-neural-networks/)

4. [Medium](https://towardsdatascience.com/loss-functions-when-to-use-which-one-718ebad36e0)

5. [Rohan Varma](https://rohanvarma.me/Loss-Functions/)
