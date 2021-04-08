# Diagnosis of Diabetes using Support Vector Machines
       
In this guide, we will learn how to use machine learning to diagnose if a patient has diabetes. We can do this by using their medical records. We will use the Support Vector Machine Algorithm (from Sci-kit Learn) to build our model. The GitHub repo for this project is [here](http://github.com/Inyrkz/diagnose-diabetes-svm).

## Prerequisite
- A PC with Jupyter Notebook
- Basic Python Knowledge
- Basic knowledge of Support Vector Machines 
- Diabetes dataset from [Kaggle](https://www.kaggle.com/uciml/pima-indians-diabetes-database)

## Outline
- Exploratory Data Analysis with Pandas-Profiling
- Feature Extraction
- Split Dataset into Training and Test Set
- Creating the SVM Model
- Diagnosing a New Patient
- Assess Model Performance

## EXPLORATORY DATA ANALYSIS WITH PANDAS-PROFILING
The pandas-profiling library helps us do quick exploratory data analysis with minimal effort. To install pandas-profiling, run the code below:

```python
pip install pandas-profiling
```

If you are using Anaconda, then you can run the following code in Anaconda Prompt:

```python
conda install -c conda-forge pandas-profiling
```

Now we can import pandas-profiling and generate a report for our dataset. Before we load our dataset, let us import the libraries we will be using.

```python
# importing libraries
import numpy as np
import pandas as pd
import pandas_profiling
from sklearn import svm
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
```

We import our dataset using the read_csv function from pandas. We pass the dataset filename as an argument.

```python
# Getting Data
dataset = pd.read_csv("diabetes.csv")
```

```python
# generate report with panda-profiling
profile = dataset.profile_report(title='Diabetes Profiling Report')
profile
```

Pandas-profiling gives us the dataset statistics.

![Overview](/engineering-education/diagnose-diabetes-with-svm/1.jpg)

From the report above, we have nine variables and 768 rows. There are no missing data in the dataset. There are no duplicate data.

Pandas-profiling also looks at each of the nine variables. For each variable, it gives us descriptive statistics. It generates a histogram that shows the data distribution of each variable.

![Variables](/engineering-education/diagnose-diabetes-with-svm/2.jpg)
![Variables](/engineering-education/diagnose-diabetes-with-svm/3.jpg)
![Variables](/engineering-education/diagnose-diabetes-with-svm/4.jpg)
![Variables](/engineering-education/diagnose-diabetes-with-svm/5.jpg)
![Variables](/engineering-education/diagnose-diabetes-with-svm/6.jpg)

We can see the mean, minimum and maximum values of each variable. We can observe the correlation plot between each of the variables. 

![Interactions](/engineering-education/diagnose-diabetes-with-svm/7.jpg)

We can see the Pearson, Spearman, Kendall, and Phik correlation matrix heat map.

![Correlations](/engineering-education/diagnose-diabetes-with-svm/8.jpg)

We can visualize the missing values and know exactly where we have missing values in the dataset. None of the variables contain any missing value, so we can proceed to build our model.

![missing-values](/engineering-education/diagnose-diabetes-with-svm/9.jpg)

Finally, we can view the first ten rows and last ten rows of the dataset.

![first-rows](/engineering-education/diagnose-diabetes-with-svm/10.jpg)
![last-rows](/engineering-education/diagnose-diabetes-with-svm/11.jpg)

## FEATURE EXTRACTION
We separate the features and the target variable. We have eight features.

```python
# Extract Features
X = dataset.iloc[:, :8]
X.head()
```

![extract-features](/engineering-education/diagnose-diabetes-with-svm/12.jpg)

Our target variable is the outcome column. The value 1 represents patients with diabetes, while 0 represents patients without diabetes.

```python
# Extract Class Labels
y = dataset["Outcome"]
y.head()
```

![class-labels](/engineering-education/diagnose-diabetes-with-svm/13.jpg)

## SPLIT DATASET INTO TRAINING AND TEST SET
We split our dataset into the training and test set. We use 75% of our dataset for training the model, and we use the remaining 25% for testing the model after training.

```python
# Split Dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, train_size=0.75, random_state=0)
    
print(X_train.shape)
```

![X_train-shape](/engineering-education/diagnose-diabetes-with-svm/14.jpg)

```python
print(y_train.shape)
```

![y_train-shape](/engineering-education/diagnose-diabetes-with-svm/15.jpg)

```python
print(X_test.shape)
```

![X_test-shape](/engineering-education/diagnose-diabetes-with-svm/16.jpg)

```python
print(y_test.shape)
```

![y_test-shape](/engineering-education/diagnose-diabetes-with-svm/17.jpg)

We can see the amount of data that we will use for training and testing.

```python
X_train.head()
```

![X_train](/engineering-education/diagnose-diabetes-with-svm/18.jpg)

We need to normalize the features in our training set. Normalizing adjusts each column in our dataset to have a mean of 0 and a standard deviation of 1. It will make the training process faster.

```python
# Normalize Features
scaler = StandardScaler()
scaler.fit(X_train)
X_train = scaler.transform(X_train)
```
Let us view the first five rows of our training set after normalization.

```python
# View first 5 rows
X_train[:5, :]
```

![normalize training set](/engineering-education/diagnose-diabetes-with-svm/19.jpg)

## CREATING THE SVM MODEL
The Sci-kit Learn library has four SVM kernels. We have the linear, poly, rbf, and sigmoid kernels. We do not know which of these kernels will give us a better decision boundary. So we iterate through the kernels and see which one gives us the best decision boundary for the dataset. The decision boundary separates the positive class and the negative class. It could be linear or non-linear. The polynomial and RBF kernels are suitable when the classes are not linearly separable.

We fit the SVM model for each kernel to our training set. We make predictions on our training set to see which kernel will give us the highest accuracy score. We call this *Hyper-Parameter Optimization*.

```python
# SVM Kernels
for k in ('linear', 'poly', 'rbf', 'sigmoid'):
    model = svm.SVC(kernel=k)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_train)
    print(k)
    print(accuracy_score(y_train, y_pred))
```

![svm kernels](/engineering-education/diagnose-diabetes-with-svm/20.jpg)

The RBF (radial basis function) kernel gives us the highest accuracy score. So for this dataset, it offers the best decision boundary. The RBF kernel finds a decision boundary that separates 82.4% of the patients correctly. Now let us create our model using the RBF kernel.

```python
# Using the best model
model = svm.SVC(kernel='rbf')
model.fit(X_train, y_train)
```

## DIAGNOSING A NEW PATIENT
We use our model to make predictions on a new patient.

```python
# Making a Single Prediction
# 'pregnancies', 'glucose', 'bpressure', 'skinThickness'
# 'insulin', 'bml', 'pedigree', 'age'
    
patient = np.array([[ 1., 150., 70., 45., 0., 40., 1.5, 25]])
    
# Normalize the data with the values used in the training set
patient = scaler.transform(patient)
    
model.predict(patient)
```

![single-prediction](/engineering-education/diagnose-diabetes-with-svm/21.jpg)

Let us create a numpy array containing the new patient record. We normalize the data before passing it to the model for prediction. We use the transform method this time instead of the fit_transform method. That will use the same mean and standard deviation that normalized the training set.  The result is 1, so the patient has diabetes. Let us see what our model will predict if we change the glucose level from 150 to 50.

```python
patient = np.array([[ 1., 50., 70., 45., 0., 40., 1.5, 25]])
    
# Normalize the data
patient = scaler.transform(patient)
    
model.predict(patient)
```

![single-prediction](/engineering-education/diagnose-diabetes-with-svm/22.jpg)

We get 0, which means this patient does not have diabetes. Let us view our test set.

```python
# Viewing Test Set
X_test
```

![X_test](/engineering-education/diagnose-diabetes-with-svm/23.jpg)

Now let us try to diagnose the third patient in the test set (with id 113). Remember, the index of the third patient is two since we start counting from 0.

```python
# Checking the third patient in the test set with index 2
X_test.iloc[2]
```

![single-prediction](/engineering-education/diagnose-diabetes-with-svm/24.jpg)

```python
# Convert dataframe to a numpy array
t_patient = np.array([ X_test.iloc[2]])

# Predicting on third patient in Test Set
t_patient = scaler.transform(t_patient)
    
print("Model's Prediction:", model.predict(t_patient))
print("Actual Prediction:", y_test.iloc[2])
```

![patient-prediction](/engineering-education/diagnose-diabetes-with-svm/25.jpg)

We can see that our model prediction is 0, and the actual prediction is also 0. This means our model made the correct prediction for this patient. The third patient does not have diabetes.

## ASSESS MODEL PERFORMANCE
Let us see the accuracy of the entire test set.

```python
# Accuracy on Testing Set
X_test = scaler.transform(X_test)
y_pred = model.predict(X_test)
print("Accuracy Score:", accuracy_score(y_test, y_pred))
```

![accuracy score](/engineering-education/diagnose-diabetes-with-svm/26.jpg)

We normalize the test set before making predictions. We have an accuracy of 77.60, which is lower than what we had on the training set. This is because the test set contains data our model has not seen before.

What if our model had predicted that no one had diabetes? What would be our accuracy in that case? Let us find out what the accuracy would be if our model had predicted 0 (no diabetes) for all the patients. To do this, we create an array of zeros with the same shape as our test set classes.

```python
# Comparison to All-Zero Prediction
y_zero = np.zeros(y_test.shape)
print(accuracy_score(y_test, y_zero))
```

![all-zero prediction](/engineering-education/diagnose-diabetes-with-svm/27.jpg)

When we compare our test set with an all-zero array,  we get an accuracy score of 67.7%. Our model accuracy is 67.7%, even when it predicts that no one in the test set has diabetes. This means our dataset is unbalanced. There are more samples of the class without diabetes in our dataset. So accuracy score will not help us evaluate our model. We can measure the performance of our model by using Precision and Recall. 

Precision tells us what fraction has diabetes from all the patients our model predicted to have diabetes. Recall gives us the fraction our model correctly detected as having diabetes out of all the diabetic patients.

A model with high precision helps us avoid treating people without diabetes. But we may end up not treating some patients with diabetes. A model with high recall allows us to treat all patients with diabetes. But we may end up treating patients that do not have diabetes. What we need is a trade-off between precision and recall.
That is where f1-score comes in. The f1-score finds a good balance between precision and recall.

Let us calculate the precision, recall, and f1 score. We can also generate a classification report.

```python
# Compute precision, recall and f1 score
from sklearn.metrics import recall_score, precision_score, f1_score
    
precision = precision_score(y_test, y_pred)
recall = recall_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
    
print("Precision is", precision)
print("Recall is", recall)
print("F1 score is", f1)
```

![precision recall f1](/engineering-education/diagnose-diabetes-with-svm/28.jpg)

We can also generate a classification report.

```python
# Generate classification report
print(classification_report(y_test, y_pred))
```

![classification report](/engineering-education/diagnose-diabetes-with-svm/29.jpg)

Our precision, recall, and f1-score are approximately 0.71, 0.52, and 0.60 respectively. The model is not too good. For a healthcare problem, we could end up misdiagnosing patients that have diabetes. This is why we pay more attention to the recall score. We can improve our results by collecting more data.

## CONCLUSION
In this guide, we learned how to use the four SVM kernels from Sci-kit Learn to build a machine learning model. Different kernels work better on distinct datasets. You can use pandas-profiling to do quick exploratory data analysis.

Accuracy score is not a good metric for evaluating a dataset with skewed classes. That is, an imbalanced dataset, where there are more samples of one class than the other. We can use precision, recall, and f1-score to check our model. We can improve our model performance by collecting more data. Remember, “It's not who has the best algorithm that wins; it's who has the most data.”
