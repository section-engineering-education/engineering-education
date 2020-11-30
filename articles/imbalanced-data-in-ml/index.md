![hero](/engineering-education/imbalanced-data-in-ml/hero.jpg)
[Image Source]( https://images.unsplash.com/photo-1561127958-3fc7908a2398?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)

Data powers machine learning algorithms. It is important to have balanced datasets in a machine learning workflow. Imbalanced datasets mean that the number of observations differ for the classes in a classification dataset. This imbalance can lead to inaccurate results. We explore techniques to handle imbalanced data.

### Table of Contents

1. Need for balanced datasets

2. Balanced vs imbalanced datasets

3. Techniques to handle imbalanced data

### Prerequisites

One only needs to understand general machine learning concepts. They can be found in this [article](https://www.section.io/engineering-education/supervised-learning-algorithms/).

### Why exactly is imbalance an issue?

Machine learning algorithms are fuelled by data. In the absence of a dataset of good quality, even the best of algorithms struggles to produce good results. An imbalanced dataset is defined by great differences in the distribution of the classes in the dataset. This means that a dataset is biased towards a class in the dataset. If the dataset is biased towards one class, an algorithm trained on the same data will be biased towards the same class. The model learns more from biased examples as opposed to the examples in the minority class. One might end up with a scenario where a model assumes that any data you feed it belongs to the majority class. This, as a result, makes a model seem naïve in its predictions, regardless of achieving high accuracy scores.

### Balanced and Imbalanced Datasets

A balanced dataset refers to a dataset whose distribution of labels is approximately equal. Labels in this context refer to a class associated with each data point. For example, consider a dataset with two classes; male and female. If approximately half the distribution represents the male class and the other half represents the female class, we say the dataset is balanced.

The distribution of an imbalanced dataset is characterized by very high differences between the classes involved. Taking the above example of male and female classes, an imbalanced dataset may have a very high difference between the two classes.

### Techniques

Now that we know of the impact of imbalanced datasets, it is a relief to know that there are methods to correct the said imbalance. We look at a handful of them.

#### Oversampling

Oversampling is a technique to alter unequal classes of data to create balanced datasets. This technique attempts to increment the size of rare samples to create balance when data is insufficient. For example, let’s have a classification problem with two classes and 100K data points. 20K data points are of the positive class, 80K for the negative class. The positive class, which is the minority class, would need to be oversampled.

To do this, we take the 20K data points and replicate them four times to produce 80K. This yields an equal number of examples for both positive and negative classes. The size of the dataset would increase to 160K as a result.

As per our example, although balance is achieved, no new or extra information is added to the model. A technique used to carry out oversampling is [Synthetic Minority Over-sampling Technique(SMOTE))](https://arxiv.org/pdf/1106.1813.pdf). This technique offers an improvement in the approach where examples in a minority class are duplicated to create balance. SMOTE synthesizes new examples as opposed to duplicating examples. Here’s how. SMOTE selects examples that happen to be in proximity in a feature space. It then takes a new example at a point along the segment joining adjacent examples.

To elaborate further, it finds the [k-nearest-neighbors](https://deepai.org/machine-learning-glossary-and-terms/kNN#:~:text=The%20k-nearest%20neighbors%20algorithm%2C%20or%20kNN%2C%20is%20one,the%20longer%20it%20takes%20to%20perform%20the%20classification.) (k-NN) in the minority class. The k-NN refers to a classification approach where the likelihood of a data point to belong to one group or another depending on the data points in closest proximity to the data point.

SMOTE chooses an instance of the minority class at random and computes its k-NN. A neighbor to it is then chosen randomly. After that, a synthetic example is created at a point selected at random between the two examples. This process can be used to generate as many synthetic examples as would be needed for a minority class to create balance.

A benefit of oversampling is that there is no data loss from the original training set. All the data from both the majority and minority classes are used. Yet, the downside of oversampling is that it causes overfitting.

#### Undersampling

When there exists a class that is in abundance, underfitting aims to reduce the size of the abundant class to balance the dataset. Using a similar context to the oversampling example given, we have a classification problem with two classes and 100K data points. 20K data points are of the positive class, 80K for the negative class. We would need to undersample the majority class. This would involve choosing 20K data points randomly from the 80K available. We will then have 20K positive and 20K negative data points, bringing the total dataset size to 40K data points.

For classification problems, there exists a method known as [Tomek links](http://www.samdrazin.com/classes/een548/project1report.pdf). It aims to improve the accuracy of the classification of data. This is by removing as much class label noise as possible. It also works to remove borderline examples with a higher probability of being incorrect. This is known as Tomek link removal. Tomek links are points that are the closest neighbors to each other but have different class labels. Since this technique makes it possible to identify points near different class labels, it makes it easy to get rid of them until none are left. In the context of undersampling, this technique gets rid of unwanted overlap between classes. The result is having only neighbors of the same class in close proximity.

#### Ensemble Learning

An ensemble-based method can be used to deal with imbalanced datasets. The belief is that multiple learning methods are more effective than a single one. It is an approach that combines the performance or results of many classifiers to better the performance of a single classifier.

Let’s briefly define a couple of ensemble methods;

**Bagging**– this is a method that attempts to apply similar learners on tiny sample populations then takes the mean of all predictions made.

![bagging](/engineering-education/imbalanced-data-in-ml/bagging.png)

Bagging

[Source](https://www.analyticsvidhya.com/blog/2015/08/introduction-ensemble-learning/)

**Boosting**– a technique that adjusts the weight of an observation based on the most recent classification. Boosting attempts to increase the weight of an observation that has been incorrectly classified. This is an iterative process since new models are then trained on such inefficiencies of prior models. This makes the new models better and stronger than the previous ones. The resulting ensemble has many machine learning models. These models boast different accuracies and can provide better accuracies when used together. Boosting reduces bias error of models as well.

#### The Right Evaluation Metrics

Whenever there is an imbalance in class labels, the classification accuracy metric is not an ideal indicator of model performance. Here’s what we mean. Classification accuracy is a good metric when the samples belonging to each class are equal in number. Consider a scenario with 93% samples of class C and 7% class F in a training set. A model can very simply achieve 93% training accuracy by predicting each training sample in class C. This is even assuming that it fails to predict any samples in class F correctly.

Thus, when dealing with imbalanced datasets, it is wise to use the correct evaluation metrics. It is not advisable to use accuracy as a measure of performance. We may consider metrics such as F1-score, precision, and recall.

Here is an [article](https://towardsdatascience.com/metrics-to-evaluate-your-machine-learning-algorithm-f10ba6e38234) that defines the below metrics in greater detail.

As defined in my previous [article](https://www.section.io/engineering-education/evaluating-ml-model-performance/):

Precision is the number of true positives against the total positive results predicted by a classifier.

Precision = True Positives / (True Positives + False Positives)

Recall is the number of true positives divided by all the samples that should have been predicted as positive.

Recall = True Positives / (True Positives + False Negatives)

F1-score shows us how accurate a model is by showing how many correct classifications are made. F1-score has a range between 0 and 1. The greater the score, the better the performance of the model.

F1-score = (2 * Precision * Recall) / (Precision + Recall)

#### More Data

To deal with an imbalanced dataset, there exists a very simple approach; collect more data! The data to be collected is for the class with a low distribution ratio. This method would be advisable if it is cheap and is not time-consuming. However, data collection is often an expensive, tedious, and time-consuming process. This makes further data collection unfeasible.

### Wrapping Up

Imbalanced datasets can deceive both human beings and the model itself into believing that it generalizes well. To avoid such a scenario, it is important to understand how to correct the imbalance of the datasets. We have explored a few of the possible techniques to carry out this correction. However, the choice of technique is dependent on the nature of the problem in consideration. Below are some links to some useful publications on imbalanced datasets for further reading. Good luck!

### References and Further Reading

1. [5 Important Techniques To Process Imbalanced Data In Machine Learning](https://analyticsindiamag.com/5-important-techniques-to-process-imbalanced-data-in-machine-learning/)

2. [Handling imbalanced datasets in machine learning](https://towardsdatascience.com/handling-imbalanced-datasets-in-machine-learning-7a0e84220f28)

3. [Dealing with Imbalanced Data in Machine Learning](https://heartbeat.fritz.ai/dealing-with-imbalanced-data-in-machine-learning-18e45fea7bb5)

4. [What Is Balanced And Imbalanced Dataset?](https://medium.com/analytics-vidhya/what-is-balance-and-imbalance-dataset-89e8d7f46bc5)

5. [Addressing Challenges Associated with Imbalanced Datasets in Machine Learning](https://www.einfochips.com/blog/addressing-challenges-associated-with-imbalanced-datasets-in-machine-learning/)

6. [Dealing with Imbalanced Data in Machine Learning](https://www.kdnuggets.com/2020/10/imbalanced-data-machine-learning.html)

7. [Unbalanced Datasets & What To Do About Them](https://blog.strands.com/unbalanced-datasets)

8. [SMOTE: Synthetic Minority Over-sampling Technique](https://arxiv.org/pdf/1106.1813.pdf)

9. [SMOTE for Imbalanced Classification with Python](https://machinelearningmastery.com/smote-oversampling-for-imbalanced-classification/)

10. [Under-sampling : A Performance Booster on Imbalanced Data](https://towardsdatascience.com/under-sampling-a-performance-booster-on-imbalanced-data-a79ff1559fab)

11. [Classification of Imbalance Data using Tomek Link (T-Link) Combined with Random Under-sampling (RUS) as a Data Reduction Method](https://www.researchgate.net/publication/326590590_Classification_of_Imbalance_Data_using_Tomek_Link_T-Link_Combined_with_Random_Under-sampling_RUS_as_a_Data_Reduction_Method)

12. [What is ensemble learning?](https://bdtechtalks.com/2020/11/12/what-is-ensemble-learning/)