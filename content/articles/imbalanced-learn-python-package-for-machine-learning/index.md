---
layout: engineering-education
status: publish
published: true
url: /imbalanced-learn-python-package-for-machine-learning/
title: Understanding the Imbalanced-Learn Package for Handling Imbalanced Datasets
description: Imbalanced-learn is a Python library that is used for handling imbalanced datasets. In this article, we will understand 2 important techniques that we use for handling imbalanced datasets. Also, we will be analyzing its performance by measuring the accuracy score from the models of each dataset.
author: charles-kariuki
date: 2021-12-09T00:00:00-11:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/imbalanced-learn-python-package-for-machine-learning/hero.jpg
   alt: Imbalanced-Learn package Imbalanced Datasets example image
---
Imbalanced-learn is a Python package used to handle imbalanced datasets in machine learning. In an imbalanced dataset, the number of data samples is not equally distributed between the classes.
<!--more-->
In an imbalanced dataset, the class labels are not equal. One class has a higher number of data samples, while the other class label has a significantly lower amount of data samples. For example, if you are predicting if a student will pass or not pass an exam, based on various input parameters. In this example, we have two class labels: `pass` and `not pass`.

The dataset is imbalanced when we have 2000 data samples for the `pass` class and 200 for the `not pass` class. The `pass` class label is ten times more than the `not pass` class label. When an imbalanced dataset is used, it will lead to model bias and inaccurate results. That's why we have to use various techniques and libraries to balance the dataset.

In this tutorial, we will use the `imbalanced-learn` library to handle this problem. It helps us balance the sample dataset by having an equal split among the classes.

### Table of contents
- [Prerequisites](#prerequisites)
- [Imbalanced-Learn installation](#imbalanced-learn-installation)
- [Imbalanced dataset](#imbalanced-dataset)
- [Class distribution](#class-distribution)
- [Split dataset](#split-dataset)
- [Class balancing techniques](#class-balancing-techniques)
- [Random Undersampling Technique](#random-undersampling-technique)
- [Random Oversampling Technique](#random-oversampling-technique)
- [Model building using the undersampled balanced class](#model-building-using-the-undersampled-balanced-class)
- [Model building using the oversampled balanced class](#model-building-using-the-oversampled-balanced-class)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should know the following:
- Introduction to [Python programming](/engineering-education/python-projects-for-beginners/).
- Introduction to [machine learning](/engineering-education/house-price-prediction/).
- A brief introduction to [Pandas](/engineering-education/data-analytics-using-pandas/).
- Introduction to [Random forest classification algorithm](/engineering-education/introduction-to-random-forest-in-machine-learning/).

### Imbalanced-Learn installation
To start using this library. Let's install it using the following command:

```python
pip install -U imbalanced-learn
```

Let's load our imbalanced dataset.

### Imbalanced dataset
The dataset used here is for Hepatitis C virus classification. The dataset has an `Activity` column with two class labels: `active` and `inactive`. The two-class labels are imbalanced. Let's import `pandas` which will be used to load our dataset.

```python
import pandas as pd
```

To load the dataset run this code:

```python
df = pd.read_csv('https://drive.google.com/file/d/1zbAbWIA9uBarN7TdmN6pQsEX8E5vOW9o/view?usp=sharing', index_col=False)
```

Let's check the `Activity` column in our dataset using the following command:

```python
print(df)
```

The output is shown below:

![Dataset columns](/engineering-education/imbalanced-learn-python-package-for-machine-learning/dataset-columns.png)

For any dataset, we usually have two variables, the `X` variable, and the `y` variable. The `X` variable represents all the columns that are used as input during model training.

The `y` variable represents the output column. The output is the prediction results of any machine learning model. In our case, the `y` variable is the `Activity` column.

Let's remove the `Activity` column from the `X` variable and save it in the `y` variable.

```python
X = df.drop(['Activity'], axis=1)
y = df['Activity']
```

Now that we have separated our two variables, let's see the class distribution.

### Class distribution
To see the class distribution run the following command.

```python
activity_count = y.value_counts()
print(activity_count)
```

The output is shown below:

![Class distribution](/engineering-education/imbalanced-learn-python-package-for-machine-learning/class-distribution.png)

From the output above, we can see that we have an imbalanced dataset. The `active` class which is the "majority", the class has more data samples as compared to the `inactive` class which is the "minority" class.

Let's see the visual representation using a pie chart.

#### Pie chart
To plot a pie for the class distribution run the following command.

```python
y.value_counts().plot.pie(autopct='%.2f')
```

The diagram is shown in the image below:

![Pie Chart](/engineering-education/imbalanced-learn-python-package-for-machine-learning/pie-chart.png)

From the image above, the `active` class is `71.28%`, while the `inactive` class is `28.72%`. We need to balance this dataset before model training.

Before we balance our dataset, let's split our dataset into a training set and a testing set. We will then balance the training set before we use it for model training.

Splitting the dataset into train and test sets allows us to avoid [overfitting or underfitting](https://machinelearningmastery.com/overfitting-and-underfitting-with-machine-learning-algorithms/) of models.

### Split dataset
Let's import the `train_test_split` package for dataset splitting.

```python
from sklearn.model_selection import train_test_split
```

Let's now split the dataset.

```python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

The dataset will be split using a `test_size=0.2`. It means that 80% of the split dataset will be the training set and 20% will be the testing set. Let's have a look at the sizes of both splits.

```bash
((462, 881), (462,), (116, 881), (116,))
```

Our training set is `(462, 881)`. It has `462` data samples and `881` columns. This is the set we will balance. Let's see the size of the `active` and `inactive` classes in this test set.

```python
print(y_train.value_counts())
```

The output is shown below:

![Class distribution](/engineering-education/imbalanced-learn-python-package-for-machine-learning/class-distribution1.png)

We can now plot a pie chart to show this distribution.

```python
y_train.value_counts().plot.pie(autopct='%.2f')
```

The plot is shown below:

![Pie chart](/engineering-education/imbalanced-learn-python-package-for-machine-learning/pie-chart-train-set.png)

Let's now balance the training set dataset using the following techniques.

### Class balancing techniques
Imbalanced-learn has various techniques that handle imbalanced datasets.

In this tutorial, we will be focusing only on two techniques:
1. Random undersampling
2. Random oversampling

#### Random undersampling technique
In the random undersampling technique, the "majority" class which is the `active` class will be reduced. This makes it have the same proportion as that of the "minority" class, which is the `inactive` class.

The "majority" class has `330` data samples while the "minority" class has `132` data samples.  Using this technique, the `330` data samples of the `active` class will be reduced to `132`. This will make the two classes balanced.

The random undersampling technique has functions and algorithms that balance the dataset. Let's import one of the functions.

```python
from imblearn.under_sampling import RandomUnderSampler
```

`RandomUnderSampler` is the function used to balance our dataset. Let's now use it.

```python
rus = RandomUnderSampler(sampling_strategy=1)
X_train_rus, y_train_rus = rus.fit_resample(X_train, y_train)
```

In the code above, we specify the `sampling_strategy=1`. This ensures that the "majority" class and the "minority" class will have a `1:1` class distribution. We then add `X_train, y_train` which contain the training dataset that we are balancing.

`rus.fit_resample` method ensures that our function fully fits in the training set. No data sample is left out during balancing. We then save our balanced dataset into a new variable `X_train_rus, y_train_rus`.

Let's plot a pie chart of the new balanced dataset.

```python
ax = y_train_rus.value_counts().plot.pie(autopct='%.2f')
_ = ax.set_title("Under-sampling")
```

The plot is shown below:

![Balanced dataset using random undersampling](/engineering-education/imbalanced-learn-python-package-for-machine-learning/random-undersampling.png)

From the image above, we can see that both the `active` class and the `inactive` class are `50%`. This shows that our dataset is balanced. Let's see the size of both the `active` and `inactive` classes.

```python
print(y_train_rus.value_counts())
```

The output is shown below:

![Class distribution](/engineering-education/imbalanced-learn-python-package-for-machine-learning/class-distribution2.png)

The `active` and `inactive` classes are balanced.

#### Random oversampling technique
In the random oversampling technique, the "minority" class is increased so that it's equal to the "majority" class. Here, the "majority" class has `330` data samples while the "minority" class has `132` data samples. 

In this technique, `132` data samples of the `inactive` class will be increased to `330`. This will make the two classes to be balanced. The random oversampling technique has functions and algorithms used to balance the dataset. Let's import one of the functions.

```python
from imblearn.over_sampling import RandomOverSampler
```

`RandomOverSampler` is the function used to balance our dataset. Let's now implement it.

```python
ros = RandomOverSampler(sampling_strategy=1)
X_train_ros, y_train_ros = ros.fit_resample(X_train, y_train)
```

In the code above, we specify the `sampling_strategy=1`. This ensures that the "minority" class and the "majority" class will have a `1:1` class distribution. We then add `X_train, y_train` which is the training dataset that we are balancing.

`rus.fit_resample` method ensures that our function fully fits in the training set. No data sample is left out during balancing. Now we save our balanced dataset into a new variable `X_train_ros, y_train_ros`.

Let's plot a pie chart of the new balanced dataset.

```python
ax = y_train_ros.value_counts().plot.pie(autopct='%.2f')
_ = ax.set_title("Over-sampling")
```

The plot is shown below.

![Balanced dataset using random oversampling](/engineering-education/imbalanced-learn-python-package-for-machine-learning/random-oversampling.png)

Using this technique we can still see that both the `active` class and the `inactive` class are `50%`. This shows that our dataset is balanced. Let's see the size of both the `active` and `inactive` classes.

```python
print(y_train_ros.value_counts())
```
The output is shown below:

![Class distribution](/engineering-education/imbalanced-learn-python-package-for-machine-learning/class-distribution3.png)

Now that we have balanced our dataset using the techniques, let's start building our model. We will build our model using the dataset balanced by the techniques. We will then compare the accuracy score of both the models and see which technique is better.

### Model building using the undersampled balanced class
Let's import the algorithm used to build our model.

```python
from sklearn.ensemble import RandomForestClassifier
```

We will use the `RandomForestClassifier` when building our model.

```python
model = RandomForestClassifier(random_state=42)
model.fit(X_train_rus, y_train_rus)
```

Let's now fit our dataset into our balanced dataset. We saved our balanced dataset into a variable named `X_train_rus, y_train_rus`.

```python
model.fit(X_train_rus, y_train_rus)
```

The model will learn from the sample dataset and eventually improve on its own. Let's calculate the model accuracy score. We calculate the model accuracy score with the model's ability to make predictions. We use the testing dataset to make predictions. 

The model will classify the data sample into either the `active` or `inactive` class. Let's import the package required to make predictions:

```python
from sklearn.metrics import matthews_corrcoef
```

`matthews_corrcoef` will be used to automatically calculate the model's accuracy score. It also helps in making predictions. Let's apply the `model.predict` to make predictions.

`matthews_corrcoef` will output the accuracy score of the predictions using the `X_test` and `y_test`. These two variables holds the test split dataset.

```python
y_test_pred = model.predict(X_test)
mcc_test = matthews_corrcoef(y_test, y_test_pred)
```

Let's display the model's performance results:

```python
df_labels = pd.Series(['MCC_test'], name = 'Performance_metric_names')
df_values = pd.Series([mcc_test], name = 'Performance_metric_values')
df2 = pd.concat([df_labels, df_values], axis=1)
print(df2)
```

We save our model in the `mcc_test` variable. The code above will plot a diagram that displays the `Performance_metric_values` as shown:

![Accuracy score](/engineering-education/imbalanced-learn-python-package-for-machine-learning/accuracy-score.png)

The model accuracy score is `0.712435`, which is `71.2435%`.

Now, let's use the next technique to build our model and see the accuracy score.

### Model building using the oversampled balanced class
Let's repeat the process as from above. The only difference is we are using a different dataset variable. The dataset is saved in a variable known as `X_train_ros, y_train_ros`. 

Let's import a random forest algorithm.

```python
from sklearn.ensemble import RandomForestClassifier
```

Let's build the model.

```python
model = RandomForestClassifier(random_state=42)
model.fit(X_train_ros, y_train_ros)
```

Let's import the packages required to calculate the accuracy score of our model.

```python
from sklearn.metrics import matthews_corrcoef
```

We can apply the model to make predictions. Eventually, calculate the accuracy score of these models.

```python
y_test_pred = model.predict(X_test)
mcc_test = matthews_corrcoef(y_test, y_test_pred)
```

Same as the first approach let's display model performance results.

```python
df_labels = pd.Series(['MCC_test'], name = 'Performance_metric_names')
df_values = pd.Series([mcc_test], name = 'Performance_metric_values')
df3 = pd.concat([df_labels, df_values], axis=1)
df3
```

The model accuracy score is shown below:

![Accuracy score](/engineering-education/imbalanced-learn-python-package-for-machine-learning/accuracy-score1.png)

The model accuracy score is `0.744225`, which is `74.4225%`. This is higher compared to the accuracy score of the first approach. This shows the random oversampling technique is better than the random undersampling technique.

> NOTE: These techniques also depend on the dataset that we work with.

### Conclusion
In this tutorial, we have learned about the `imbalanced-learn` package. We went through the installation process of `imbalanced-learn` and explored various techniques used to handle imbalanced datasets.

We then implemented both the random oversampling technique and the random undersampling technique. We then built our model using the dataset balanced by both techniques. Finally, we concluded that, for this dataset, random oversampling is the better technique.

To get the Google Colab link for this tutorial, click [here](https://colab.research.google.com/drive/15yNJImOflD40-AAjSarVvz8qiN93GfSG?usp=sharing).

### References
- [Google Colab link](https://colab.research.google.com/drive/15yNJImOflD40-AAjSarVvz8qiN93GfSG?usp=sharing)
- [Handling Imbalanced Datasets in Machine Learning](/engineering-education/imbalanced-data-in-ml/)
- [Imbalanced dataset techniques](https://towardsdatascience.com/handling-imbalanced-datasets-in-machine-learning-7a0e84220f28)
- [Imbalanced-learn documentation](https://imbalanced-learn.org/stable/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)