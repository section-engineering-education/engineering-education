![hero](/engineering-education/correcting-data-shift.jpg)
[Image Source]( https://images.unsplash.com/photo-1585073883526-8e5c4acd9085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80)

Dataset shift manifests when there is a change in the distribution of data. In the real world, data distribution may be influenced by socioeconomic factors, varying consumer habits among other factors. These factors can alter the underlying relationships between input and output data. As a result, the performance of a model is degraded. It is worth exploring how to handle dataset shift.

### Table of Contents

1. Dataset shift definition

2. Causes of dataset shift

3. Types of dataset shift

4. Correcting dataset shift

### Prerequisites

A general understanding of machine learning is required. This [post](Supervised Learning Algorithms | Section) can provide an introduction or refresher.

### Dataset Shift

The phenomenon of dataset shift is defined by a change in the distribution of data. This change is between the training sets and test sets. When creating a machine learning model, we use training data to train a model with the expectation that when the same model is used on test data, it would produce similar results. However, in the real-world deployment of machine learning models, this may not be the case. For example, consumer habits keep shifting. Thus, the distribution of data definitely shifts as well. The consequence of such shifts is the degradation of the performance of a model. To better our understanding of this drift of data, let’s glance at a couple of causes of this phenomenon.

### Causes of Dataset Shift

Let’s discuss a couple of potential reasons for dataset shift.

**Sample selection bias** – when training data consists of bias, it fails to reflect the environment in which the model is meant to be deployed. This difference between biased training data and the test data defines sample selection bias.

**Change of environments** – also known as non-stationary environments, refers to when there exists a difference between the training environment and test environment. This could be as a result of a change of a spatial or temporal nature.

### Types of Dataset Shift

There are three major types of dataset shift. We explore each in detail.

#### Covariate Shift

![covariate](/engineering-education/correcting-data-shift.png)

Covariate Shift

[Source](iwann.ugr.es/2011/pdf/InvitedTalk-FHerrera-IWANN11.pdf)

Covariate shift is the most common type of shift which is characterized by the change of the input variables existing in the training and test datasets. It may occur as a result of a change in the environment which only affects the input variables. The target variable remains unchanged.

![covariate2](/engineering-education/correcting-data-shift.png)

[Source](iwann.ugr.es/2011/pdf/InvitedTalk-FHerrera-IWANN11.pdf)

The change in distribution is problematic. Here’s why. From the above image, the learning function attempts to fit the training data. However, the distribution of the training and test data is contrasting. As such, using the learned function to make predictions, in this case, will lead to wrong results.

Let’s give another example of how problematic this shift can be. Consider facial recognition algorithms. An algorithm that has been trained on faces that are mostly of younger people but dealing with a dataset with a majority of older faces will definitely lead to wrong results. In this case, the relationship between input and output is the same but the relationship is misrepresented since the test and training data reflect different distributions.

#### Prior Probability Shift

Prior probability shift is characterized by a scenario where the target variable distribution changes but the input feature distribution does not. This is basically the reverse of covariate shift.

![prior2](/engineering-education/correcting-data-shift.png)

Prior Probability Shift

[Source](http://www.acad.bg/ebook/ml/The.MIT.Press.Dataset.Shift.in.Machine.Learning.Feb.2009.eBook-DDU.pdf)

We can use the context of spam emails to better understand this type of shift. The contents of spam mail may vary over time. Their ratio to the total daily received email number may also vary over time. As a result, spam filters that were developed on emails received last month may not be quite as effective today as a result of a change in the composition of the traffic of the emails.

Still, in the context of spam filters, let’s have an example of an unbalanced dataset. Consider a training set with equal prior probabilities on the count of received spam mail. If the prior probabilities are equal, the training set would contain 50% spam and 50% non-spam mail. However, if in actuality about 75% of our mail is spam, the prior probability of the class variables has been altered. The effect of this does not influence the input distribution, but rather the output distribution.

For more on this type of shift, check out this [book]( Dataset Shift in Machine Learning (Neural Information Processing) (acad.bg)).

#### Concept Drift

Concept drift is the type of shift defined by the change in relationships between the input and output variables in the given problem over time. It is neither related to the data distribution nor the class distribution.

The relationship between input and output variables may be unknown or hidden. For example, consumer purchasing habits over a period of time may be swayed by the strength of the economy. Yet, economic strength is not clearly specified in the data. Another example is in the context of weather data. Seasons may not be clearly defined in temperature data, but ultimately influence the temperature data.

From the above examples, we note that this change in data has the ability to take any form. It makes it much easier to consider cases where there is some form of temporal consistency to the shift. This would mean that data obtained during a given time period would show the change in the relationship between input and output variables over time. Concept drift is more likely to manifest in various domains dependent on time, such as time series forecasting.

### Correcting Dataset Shift

Dataset shift can be corrected in many ways. The three methods listed below are considerate of all three types of shift.

#### Feature Dropping

The gist of this method is getting rid of features that are deemed to be drifting. Firstly, an acceptable level of the shift may be determined. Individual features may then be scrutinized to determine which features contribute most to shifting. This may be done through a very specific scientific examination of the machine learning system in consideration, by training the model on a different set of dataset features to get insights into their impact on the outcomes. This is what we call a feature ablation trial. After determining which features contribute most to shifting, these features are shed from the dataset.

It is worth noting that the dropping of features may lead to the loss of useful information.  However, a feature that exhibits a lot of shift between training and test but provides little predictive power should be dropped.

#### Adversarial Search

Adversarial search generally refers to a “game-playing” technique between various agents in a competitive environment. The agents are tasked with conflicting objectives. As a result, these agents compete against each other in an attempt to win the game.

A minimax approach is used in adversarial search. In game theory, a minimax approach refers to a decision-making scheme that is used to maximize chances of victory and minimize the possibility of loss.

In this context, adversarial search defines an approach where an adversarial model is used where the learning algorithm tries to build a predictor resilient to deletion of features during testing. The goal of adversarial search is to find the best minimax approach. This is by considering an adversary that deletes features, to find the best strategy. As is the nature of adversarial search, we note that one model attempts to maximize its score while the other one opposes it.

#### Importance Reweighting

When you have training examples that are very similar to test examples, it is necessary to up-weight the training examples. This makes it seem like the training data was taken from the test set. Each of the training instances is reweighted by the relative probability of the training set and test set. This can be done through density ratio estimation.

Density ratio estimation involves the separate estimation of test and training densities first. This is then followed by estimating the importance by considering the ratio of the approximated densities of the training and test sets. The densities represent the weights of each instance of the training data.

### It’s a Wrap

Dataset shift deteriorates the performance of a model. No engineer wants to build a good model that ends up underperforming due to drift. When dealing with data that has a high chance of experiencing drift, it is important to anticipate it, and correct it if it manifests. We have shed some light on the types of shift as well as the methods of correction. I hope they are of use to you. Good luck!

### References and Further Reading

1. [Dataset Shift in Classification: Approaches and Problems](iwann.ugr.es/2011/pdf/InvitedTalk-FHerrera-IWANN11.pdf)


2. [Understanding Dataset Shift](https://towardsdatascience.com/understanding-dataset-shift-f2a5a262a766)

3. [Covariate Shift – Unearthing hidden problems in Real World Data Science](https://www.analyticsvidhya.com/blog/2017/07/covariate-shift-the-hidden-problem-of-real-world-data-science/)

4. [Data Shift in Machine Learning: what is it and how to detect it](https://gsarantitis.wordpress.com/2020/04/16/data-shift-in-machine-learning-what-is-it-and-how-to-detect-it/)

5. [A Gentle Introduction to Concept Drift in Machine Learning](https://machinelearningmastery.com/gentle-introduction-concept-drift-machine-learning/)

6. [Dataset Shift in Machine Learning](http://www.acad.bg/ebook/ml/The.MIT.Press.Dataset.Shift.in.Machine.Learning.Feb.2009.eBook-DDU.pdf)
