### Introduction
Machine Learning is an area of AI that explores how computers can learn without needing to be explicitly taught. Machine learning can help tackle many real-world problems.

In order to ascertain if cancer cells are `malignant` or `benign`, we need to look at their physical properties, which can be utilized to identify them. Scikit-learn will be used to address a machine learning problem. Python framework Scikit-learn is a free and open-source tool for machine learning, machine mining, and data analysis.
### Prerequisites
1. Using Scikit-learn will be a necessity for our project. 
2. Jupyter notebooks are preferred for this project, however you are free to use any IDE of your choice.
### Table of contents
- [Naive Bayes algorithm](#naive-bayes-algorithm)
    - [Advantages of the Naive Bayes classification](#advantages-of-the-Naive-Bayes-classification)
    - [Disadvantages of the Naive Bayes classification](#disadvantages-of-the-Naive-Bayes-classification)
- [The dataset](#the-dataset)
- [Classification implemented with the Scikit-learn framework](#classification-implemented-with-the-scikit-learn-framework)
- [Conclusion](#conclusion)
### Naive Bayes algorithm
Despite its simplicity, Naive Bayes is a potent algorithm for predicting outcomes. In Naive Bayes, each input variable is assumed to be independent, which is why it's named naive. In reality, this is a big assumption, and the technique works well for a wide range of difficult tasks.

This popular method for binary classification, dubbed Naive Bayes, will be selected for use in this model.
### Advantages of the Naive Bayes classification
- It's a snap to put into action.
- Less training data is needed.
- Continuous and discrete data are also supported.
- The number of predictors and data points can be increased indefinitely, making it extremely flexible and adaptable.
- It is rapid and can be used to make predictions in real-time.
### Disadvantages of the Naive Bayes classification
- In naive Bayes, all predictors (or traits) are assumed to be independent, however, this is rarely the case in reality.
- To avoid assigning zero probability to a categorical variable whose category was not accessible in the training dataset, this technique uses the 'zero-frequency problem.
### Installations
Run the following line on the command prompt to download and install it on your computer, or [follow this documentation.](https://scikit-learn.org/0.17/install.html)
```
pip install scikit-learn
```
> For this project, Jupyter notebooks are encouraged, although you are free to use any IDE you choose. Instead of developing an entire script from scratch, one can execute a few lines of code and see what happens one by one rather than writing the entire script and running it.

To set it up, use the command line and enter the following code:
```
pip install jupyter
```
### The dataset
We will be classifying cancer cells based on their features and identifying them if they are malignant or benign using scikit-learn library for python programming language. We will be using the breast cancer Wisconsin dataset for our machine learning problem.

Malignant and benign breast cancer tumors are included in the data set, as well as their respective classification labels. The following function can be used to load it:
```
load_breast_cancer([return_X_y])
```
The data set has data of 569 tumors and includes data on 30 attributes of a tumor that we will be using to train our model.
### Classification implemented with the Scikit-learn framework
#### 1. Adding the required modules and data to the import

Scikit-learn and Breast cancer wisconsin (diagnostic) dataset will be imported into our program as a first step.
```Python
import sklearn
from sklearn.datasets import load_breast_cancer
```
#### 2. Creating a variable from the dataset
We must take into account the labels, classification labels, feature meanings, and the data to be learned from this dataset.
```Python
data = load_breast_cancer()
```
#### 3. Arranging and analyzing data
Before we can learn how to train our model, we need to organize the data and and if you wish to what it contains then you can use the **print()** function in order to gain a better sense of what we have.
```python
namesForlabels = data['target_names']
ourlabels = data['target']
namesForfeature = data['feature_names']
ourfeatures = data['data']
```
You can then use the **print()** method to examine the data.
```Python
print(namesForlabels)
```
OUTPUT
```bash
['malignant' 'benign']
```
Tumor data is classified as `malignant` or `non-malignant` as you can see.

Labels 0 and 1 are binary values representing labels where 0 indicates malignant tumors and 1 indicates benign tumors when they are written.
```Python
print(ourlabels)
```
The tumor's 30 distinct characteristics and properties may be seen in full detail when the features are printed. Training our model on factors such as a tumor's malignant or benign status will help us make an accurate prediction.
```Python
print(ourfeatures)
```
There are 569 instances of tumor data in the dataset in question, each with a numerical value for one of the 30 variables in question. Data you have acquired indicates that the first tumor is malignant and has a mean radius of 1.79900000e+01 based on the information you know.

#### 4. Creating sets of data to organize the information
We need to evaluate our classifier's accuracy by running it on data that has never been seen before.This means we'll divide our data into two sets, the training and test sets, before we begin creating our model. Training and evaluation of the model will be done on the training set, and then it will be used to predict the unknown test set.

Sklearn comes with a function called **train test split()**, which automatically divides the data into these two groups for us.
```Python 
from sklearn.model_selection import train_test_split

train, test, trainingLabels, testingLabels = train_test_split(ourfeatures, ourlabels, test_size = 0.33, random_state = 42)
```
It is possible to utilize the test size as a parameter to randomly divide the data. We've divided the original data into test data by a third of its original size. Other than that, the rest of the data is used for training. A different label for the train and test variables is used for each.

Refer to the [documentation](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.train_test_split.html) for further information on how to use **train_test_split**() function.
#### 5. Building the Model
You can select from a wide variety of machine learning models to meet your needs. Each one has advantages and cons of its own. A popular method for binary classification, dubbed `Naive Bayes,` has been selected for use in this model. GaussianNB is the first module that needs to be imported and initialized using **GaussianNB()** function. then use the **fit()** method to train your model on the dataset's data.
```Python
from sklearn.naive_bayes import GaussianNB

gaussiannb = GaussianNB()
ourModel = gaussiannb.fit(train, trainingLabels)
```
To generate predictions on our test set, we first need to finish training the model. The built-in **predict()** function returns a prediction value array for each data point in the test set. Our forecasts will be displayed using the **print()** method.
```Python
ourPredictions = gaussiannb.predict(test)
print(ourPredictions)
```
#### 6. Accuracy testing of the model trained
If we want to make sure our model is accurate, we may compare the predictions it makes to the actual labels in the testing set. Use the sklearn module built-in **accuracy_score()** function for this task.
```Python
from sklearn.metrics import accuracy_score

print(accuracy_score(testingLabels, ourPredictions))
```
OUTPUT
```bash
0.9414893617021277
```
If a tumor is malignant or benign, our studies show that this machine learning classifier based on the `Naive Bayes` algorithm is 94.15% accurate.
### Conclusion
Determination can be done by looking at the features of cancer cells, which can indicate whether they are `malignant` or `benign.` We used `scikit-learn` to address a machine learning problem. Python framework Scikit-learn is a free and open-source tool for machine learning, machine mining, and data analysis.

To see the whole code for this tutorial, click [here](https://colab.research.google.com/drive/1Ztr7e9qZ9nrLHSGXJ1EAjBplNGXXtjC7#scrollTo=x_YKyDySkY8e)
