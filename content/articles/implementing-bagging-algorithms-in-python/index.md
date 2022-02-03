In machine learning, we can use a single algorithm or combine multiple algorithms to build a model. When we use multiple algorithms to build the same model it is known as ensemble learning. Ensemble learning models give better prediction results than using a single algorithm.

The most common types of ensemble learning techniques are bagging and boosting. In bagging, multiple homogenous algorithms are trained independently in parallel. After training, the algorithms are combined to determine the model average.

Boosting is an ensemble technique where we train multiple homogenous algorithms sequentially. These individual algorithms create a final model which give the best results. The performance of one algorithm is influenced by the performance of the previously built algorithm.

In this tutorial, we will use two approaches in building a machine learning model. In the first approach, we will use a single algorithm to build the model. Then, we will get the accuracy of the model when using a single algorithm. We will use the Decision Tree Classifier as the single algorithm.

In the second approach, we will use the bagging algorithms to build the same model. The bagging algorithms used will be Bagging Classifier and the Random Forest Classifier. We will then get the accuracy score of the model when using the bagging algorithms.

### Table of contents
- [Prerequisites](#prerequisites)
- [Bagging vs Boosting](#bagging-vs-boosting)
- [How Bagging works](#how-bagging-works)
- [Bootstrapping](#bootstraping)
- [Parallel training](#parallel-training)
- [Aggregation](#aggregation)
- [Benefits of using Bagging algorithms](#benefits-of-using-bagging-algorithms)
- [Dataset used](#dataset-used)
- [Loading the dataset](#loading-the-dataset)
- [Dataset scaling](#dataset-scaling)
- [Splitting the dataset](#splitting-the-dataset)
- [Model building using the Decision Tree Classifier](#model-building-using-the-decision-tree-classifier)
- [Getting the mean accuracy score](#getting-the-mean-accuracy-score)
- [Implementing the bagging algorithms](#implementing-the-bagging-algorithms)
- [Building the model using Bagging Classifier](#building-the-model-using-bagging-classifier)
- [Fitting the model](#fitting-the-model)
- [Accuracy score](#accuracy-score)
- [Building the model using Random Forest Classifier](#building-the-model-using-random-forest-classifier)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should know the following:

- [Python programming](/engineering-education/python-projects-for-beginners/)
- [Machine learning workflows](/engineering-education/house-price-prediction/)
- [Machine learning in Python using Scikit-learn](https://scikit-learn.org/stable/)
- Data analysis using [Pandas](https://pandas.pydata.org/)

> NOTE: In this tutorial, we will use [Google Colab notebook](https://research.google.com/)

### Bagging vs Boosting
As mentioned, in bagging multiple homogenous algorithms are trained independently in parallel. In boosting multiple homogenous algorithms are trained sequentially. The image below shows the difference between bagging and boosting.

![Bagging Vs Boosting](/engineering-education/implementing-bagging-algorithms-in-python/bagging-vs-boosting.jpg)

*Image Source: [Pluralsight](https://pluralsight2.imgix.net/guides/81232a78-2e99-4ccc-ba8e-8cd873625fdf_2.jpg)*

In this tutorial, we will only be focusing on implementing bagging algorithms. To implement boosting algorithms, read this [article](/engineering-education/boosting-algorithms-python/)

### How Bagging works
The bagging technique is also known as Bootstrap Aggregation. The bagging algorithms can be used to solve both classification and regression problems. Bagging algorithms are used to improve the model's accuracy score. 

These algorithms prevent model [overfitting](https://en.wikipedia.org/wiki/Overfitting) and reduce models variance. Overfitting is when the model performs well using the training dataset but poorly using the testing dataset. This means the model will not be able to make accurate predictions.

Variance refers to the changes in the model when using different portions/splits of the training data set. Bagging algorithms produce a model with low variance.

To understand variance in machine learning, read this [article](https://www.javatpoint.com/bias-and-variance-in-machine-learning)

Bagging is made up of three processes: bootstrapping, parallel training, and aggregation.

#### Bootstrapping
Bootstrapping is a data sampling technique used to create samples from the training dataset. Bootstrapping randomly samples the rows and columns of the training dataset with replacement. Using sampling with replacement, we can select the same data samples multiple times.

The bootstrapping process generates multiple subsets from the original datasets. The multiple subsets have equal tuples and can be used as a training dataset.

The image below shows the bootstrapping process:

![Bootstrapping Process](/engineering-education/implementing-bagging-algorithms-in-python/bootstrapping-process.png)

*Image Source: [Data Aspirant](https://i0.wp.com/dataaspirant.com/wp-content/uploads/2020/09/4-Bootstrapping-Example.png?resize=768%2C465&ssl=1)*

#### Parallel training
The process of bootstrapping generates multiple subsets. On each subset, a machine learning algorithm is fitted. The fitting algorithm is trained using multiple subsets to produce various models. The various models produced are called weak learners or base models. By the end of this stage, we will have multiple base models that were trained in parallel.

The image below shows the parallel training process:

![Parallel Training](/engineering-education/implementing-bagging-algorithms-in-python/parallel-training.png)

*Image Source: [Data Aspirant](https://i0.wp.com/dataaspirant.com/wp-content/uploads/2020/09/3-Weak-Learners-Exmple.png?resize=768%2C647&ssl=1)*

#### Aggregation
This is the last stage in bagging. The multiple predictions made by the base models are combined to produce a single final model. The final model will have low variance and a high accuracy score.

The final model is produced depending on the voting technique used. We have two common voting techniques used: Hard voting and soft voting.

**Hard Voting**
Hard voting is also known as majority voting. Hard voting is majorly used when dealing with a classification problem. In classification problems, the prediction made by each base model is seen as a vote. The most common prediction made by the base models is taken to be the right prediction.

The image below shows the hard voting process:

![Hard Voting](/engineering-education/implementing-bagging-algorithms-in-python/hard-voting.png)

*Image Source: [Data Aspirant](https://i1.wp.com/dataaspirant.com/wp-content/uploads/2020/09/6-Bagging-majority-voting.png?w=750&ssl=1)*

**Soft Voting**
Soft voting is majorly used when dealing with a regression problem. In soft voting, we find the average of the predictions made by the base models. The average value is what is taken as the prediction result.

The image below shows the hard vs soft voting side-by-side:

![Hard vs Soft voting](/engineering-education/implementing-bagging-algorithms-in-python/soft-vs-hard-voting.png)

*Image Source: [Medium](https://miro.medium.com/max/2000/1*IG6Pe5FmrkEJlCmEQt1e5g.png)*

The image below further shows the process of bagging. The image has a clear description of how each process is done.

![How bagging works](/engineering-education/implementing-bagging-algorithms-in-python/how-bagging-works.jpg)

### Benefits of using Bagging algorithms
- Bagging algorithms improve the model's accuracy score.
- Bagging algorithms can handle overfitting.
- Bagging algorithms reduce bias and variance errors.
- Bagging can easily be implemented and produce more robust models.

Now that we have discussed the theory part, let's implement the bagging algorithm using Python.

### Dataset used
We will use the diabetes dataset to predict if a person is diabetic or not. The collected dataset has features such as `Age` and `blood pressure`. They help the model to determine if the person is diabetic or not.
To download the diabetes dataset, click [here](https://drive.google.com/file/d/1d8j3lAmVFbwRpxyAYY2RmFMtFwTOoSAp/view?usp=sharing).

#### Loading the dataset
To load the dataset that we have downloaded using the link above, we will use the Pandas library. Lets import Pandas

```python
import pandas as pd
```
To load the dataset, use this code:

```python
df = pd.read_csv("/content/diabetes.csv")
```
Lets now see how our dataset is structured using the following code:

```python
df.head()
```
The dataset structure is shown in the image below:

![Diabetes dataset](/engineering-education/implementing-bagging-algorithms-in-python/diabetes-dataset.jpg)

From the image above, our dataset has columns such as `Age` and `blood pressure`. They will be used as input for the model. The last column labeled `Outcome` will be used as an output column. The `Outcome` column is either labeled 0(non-diabetic) or 1(diabetic).

Let's check for missing values in this dataset.

#### Checking for missing value
Missing values makes the dataset incomplete. The dataset with missing values leads to inconsistent results and poor model performance. To check for missing values, use this code:

```python
df.isnull().sum()
```
The output is shown below:

![Missing Values](/engineering-education/implementing-bagging-algorithms-in-python/missing-values.jpg)

From the image above, there are no missing values. Therefore, our dataset is complete and ready for use.

#### Adding X and y variables
We need to specify the X and y variables. X variable holds all the columns that are used as model inputs. The y variable will hold the output column.

In our case, our output column is the `Output` column. The remaining columns will be used as model inputs. We add the X and y variables using the following code:

```python
X = df.drop("Outcome",axis="columns")
y = df.Outcome
```

The next step is to scale our dataset.

### Dataset scaling
Dataset scaling is the process of transforming a dataset so that it fits within a specific range/scale. For example, you can scale a dataset to fit within a range of 0-1, -1-1, or 0-100.  Dataset scaling ensures that no data point value is left out during model training. 

To understand the concept of dataset scaling better, read this [article](https://towardsdatascience.com/what-is-feature-scaling-why-is-it-important-in-machine-learning-2854ae877048)

We have different scalers that are used for dataset scaling. In our case, we use the `StandardScaler` to scale our dataset.

To further understand how the `StandardScaler` works to perform scaling, click [here](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html).

Let's import the `StandardScaler`

```python
from sklearn.preprocessing import StandardScaler
```
To scale our input columns(The x variable), use this code:

```python
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
```
If the code is executed, it will scale the entire dataset. To see some of the scaled datasets, use this code:

```python
X_scaled[:3]
```
The output will show the 4th row of the scaled dataset:

![Scaled dataset](/engineering-education/implementing-bagging-algorithms-in-python/scaled-dataset.jpg)

After scaling the dataset, we can split the scaled dataset.

### Splitting the dataset
We will split the scaled dataset into two. The first set will be for model training and the second set for model testing. To split the dataset we will use the `train_test_split` method.

```python
from sklearn.model_selection import train_test_split
```
To perform the splitting, use this code:

```python
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, stratify=y, random_state=10)
```
The code above will use the default splitting ratio when splitting the dataset. 80% of the data will be the training set and 20% the testing set.

To check the number of data samples in the training set, use this code:

```python
X_train.shape
```
The output is shown below:
```bash
(576, 8)
```
Also, we can see the size of the testing dataset using the following code:

```bash
X_test.shape
```
The output is shown below:
```bash
(192, 8)
```
The next step is to build the model. As mentioned, we will use two approaches in building a machine learning model. In the first approach, we will use a single algorithm which is the Decision Tree Classifier. In the second approach, we build the same model using the Bagging Classifier and the Random Forest Classifier. These are the common bagging algorithms.

### Model building using the Decision Tree Classifier
The decision tree classifier is the Sckit-learn algorithm best suited for classification. To import this algorithm, use this code:

```python
from sklearn.tree import DecisionTreeClassifier
```
We will use k-fold cross-validation to build our decision tree classifier. K-fold cross-validation allows us to split our dataset into various subsets or portions. The model is then trained using each subset and then gets the accuracy scores after each iteration. Finally, the mean accuracy score is calculated. K refers to the number of subsets/portions we split the dataset.

For a detailed understanding of K-fold cross-validation, read this [guide](https://scikit-learn.org/stable/modules/cross_validation.html)

Let's import the method that will help to perform K-fold cross-validation.

```python
from sklearn.model_selection import cross_val_score
```
To use the `cross_val_score` method, run this code:

```python
scores = cross_val_score(DecisionTreeClassifier(), X, y, cv=5)
scores
```
In the code above, we will split the dataset into 5 folds. It produces the model accuracy score after each iteration. This is shown in the output below:

```bash
array([0.69480519, 0.68181818, 0.71428571, 0.77777778, 0.73856209])
```
The output above shows the model's accuracy score after each iteration. We can now calculate the mean of these accuracy scores.

#### Getting the mean accuracy score
This is done using the following code:

```python
scores.mean()
```
The output is shown below:

```bash
0.7214497920380273
```
Using the cross-validation score, we get the accuracy score to be `0.7214497920380273`. We can build the same model using the bagging algorithms so that we can compare the accuracy scores.

### Implementing the bagging algorithms

Let's first build the model using the `BaggingClassifier`.

#### Building the model using Bagging Classifier
The `BaggingClassifier` classifier will follow all the bagging steps and build an optimized model. The `BaggingClassifier` will fit the weak/base learners on the randomly sampled subsets. 

It will then use the voting techniques to produce an aggregated final model. We will use the `DecisionTreeClassifier` algorithm as our weak/base learners.

To import the BaggingClassifier, use this code:

```python
from sklearn.ensemble import BaggingClassifier
```
To use this model, use this code:

```python
bag_model = BaggingClassifier(
 base_estimator=DecisionTreeClassifier(), 
 n_estimators=100, 
 max_samples=0.8, 
 bootstrap=True,
 oob_score=True,
 random_state=0
)
```
In the code above we have used the following parameters:
**base_estimator**
It represents the algorithm that is used as the base/weak leaners. We will use the `DecisionTreeClassifier` algorithm as our weak/base learners.

**n_estimators**
It represents the number of weak learners used. We will use 100 decision trees to build the bagging model.

**max_samples**
It is the maximum number of data that is sampled from the training set. We use 80% of the training dataset for resampling.

**bootstrap**
It allows for resampling of the training dataset without replacement.

**oob_score**
It is used to compute the model's accuracy score after training.

**random_state**
It allows us to reproduce the same dataset samples. Ensures that the same ratio is used when producing the multiple subsets.

The next step is to fit the initialized model into our training set.

#### Fitting the model
Fitting will enable the model to learn from the training dataset. This enables the model to understand the dataset and gain useful insight.

To fit the model, use this code:

```python
bag_model.fit(X_train, y_train)
```
Finally, let's calculate the model accuracy score.

#### Accuracy score
To get the accuracy score, run this code:

```python
bag_model.oob_score_
```
The accuracy score is shown below:

```bash
0.7534722222222222
```
The model improves the accuracy score. The accuracy score improved from `0.7214497920380273` to `0.7534722222222222`.

We can also check the accuracy score using the testing dataset. This helps determine model overfitting. To get the accuracy score, use this code:

```python
bag_model.score(X_test, y_test)
```
The output is shown below:

```bash
0.7760416666666666
```
This is a good accuracy score and shows our model is not overfitting. Overfitting occurs when we get a lower accuracy when using the testing dataset.

Let's now use the Random Forest Classifier.

#### Building the model using Random Forest Classifier
Random Forest Classifier has several decision trees that are trained on the various subsets. This algorithm is a typical example of a bagging algorithm.

Random Forests uses the bagging techniques underneath to randomly sample the dataset with replacement. Random Forests not only samples data rows, but also the columns. It also follows the bagging steps to produce an aggregated final model.

Let's now import the Random Forest Classifier.

```python
from sklearn.ensemble import RandomForestClassifier
```
To use the `RandomForestClassifier` algorithm, run this code:

```python
scores = cross_val_score(RandomForestClassifier(n_estimators=50), X, y, cv=5)
```
We have also used the K-fold cross-validation to train the model. To get the mean accuracy score, use this code:

```python
scores.mean()
```
The output is shown below:

```bash
0.7618029029793736
```
This is a higher accuracy score. It shows that the bagging algorithms increase the model accuracy score. It also prevent model overfitting.

### Conclusion
This tutorial guides a reader on how to implement bagging algorithms in Python. We discussed the difference between bagging and boosting. We also went through all the steps involved in bagging with a clear illustration of how each step works.

We were able to build a diabetes classification model using both a single algorithm and bagging algorithms. The bagging algorithms produced a model with a higher accuracy score. This shows that bagging algorithms are best suited for building better models.

The get the Python code, click this Google Colab [link](https://colab.research.google.com/drive/1SjL5eZN-ziMJ4oEvtSlCKVpa7vwCzUsR?usp=sharing)

### References
- [Bootstrap aggregating](https://medium.com/nerd-for-tech/bootstrap-aggregating-and-random-forest-model-9460e235537)
- [How bagging works](https://www.simplilearn.com/tutorials/machine-learning-tutorial/bagging-in-machine-learning)
- [Ensemble Learning: Bagging & Boosting](https://dataaspirant.com/ensemble-methods-bagging-vs-boosting-difference/)
- [Ensemble methods](https://towardsdatascience.com/ensemble-methods-bagging-boosting-and-stacking-c9214a10a205)
- [Cross-validation](https://scikit-learn.org/stable/modules/cross_validation.html)
- [Boosting Algorithms in Python](/engineering-education/boosting-algorithms-python/)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)

