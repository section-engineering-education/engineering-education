---
layout: engineering-education
status: publish
published: true
url: /how-to-analyze-machine-learning-models-using-shap/
title: How to Analyze Machine Learning Models using SHAP
description: In this tutorial the reader will learn how to use SHAP to analyze and explain a diabetes prediction model.
author: james-omina
date: 2021-11-25T00:00:00-13:20
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-analyze-machine-learning-models-using-shap/hero.png
    alt: SHAP example image 
---
Explainable AI describes the general structure of the machine learning model. It analyzes how the model features and attributes impact the model results.
<!--more-->
Model analyzing determines the logical reasoning of the model when making a prediction and explains the decisions made by the model. The concept of analyzing these prediction results is known as explainable AI. Explainable AI enables us to understand the prediction results made and builds trust and confidence when using the model.

During production, we must have a model that we can trust. If a model fails in production, it may have a great impact on the business operation. This leads to business losses. 

In this tutorial, we will start by building a diabetes prediction model. We will then use SHAP to analyze and explain the prediction results made by this model.

### Table of contents
- [Prerequisites](#prerequisites)
- [Importance of Explainable AI](#importance-of-explainable-ai)
- [Modelling dataset](#modelling-dataset)
- [Importing exploratory data analysis packages](#importing-exploratory-data-analysis-packages)
- [Checking for missing values](#checking-for-missing-values)
- [Checking for our data types](#checking-for-our-data-types)
- [Diabetic vs non-diabetic](#diabetic-vs-non-diabetic)
- [Adding features and labels](#adding-features-and-labels)
- [Dataset scaling](#dataset-scaling)
- [Splitting our dataset](#splitting-our-dataset)
- [Building the model](#building-the-model)
- [Calculate the accuracy score](#calculate-the-accuracy-score)
- [Testing our model](#testing-our-model)
- [Making a single prediction](#making-a-single-prediction)
- [Getting started with SHAP](#getting-started-with-shap)
- [Initialize KernelExplainer](#initialize-kernelexplainer)
- [Creating shapley values](#creating-shapley-values)
- [Force plot diagram](#force-plot-diagram)
- [Analyzing the force plot](#analyzing-the-force-plot)
- [Plotting a summary plot](#plotting-a-summary-plot)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To understand this tutorial, a reader should:
- Install [Python](https://www.python.org/) on their machine.
- Understand [Python programming.](/engineering-education/python-projects-for-beginners/)
- Know how to build [machine learning models](engineering-education/house-price-prediction/) using [Scikit-learn](https://scikit-learn.org/stable/)
- Know how to use [Google colab notebooks](https://colab.research.google.com) for projects.
- Know how to use [Pandas](https://pandas.pydata.org/) and [Numpy](https://numpy.org/) for machine learning.

### Importance of Explainable AI
The reasons are as follows.

1. *Understand the model internal functionalities and decision-making processes*: Through Explainable AI, we can understand the internal functionalities of the model. It gives us a deeper understanding of how these models made the decisions it did. It enables the user to understand the criteria used to make these decisions.
2. *Reduce model bias*: When analyzing the machine learning model, we select the best features to build the model. This reduces the bias made by the model during prediction.
3. *Improve the model performance*: It improves model performance by selecting the best features to make predictions.
4. *Helps in model debugging*: Through model debugging, it removes bugs and errors in the model.
5. *Identify the wrong prediction*: Explainable AI determines the wrong predictions made by a model. The model which makes the wrong prediction will not be deployed to production.

Let's start working with our dataset.

### Modeling dataset
The dataset collected contains information for both diabetic and non-diabetic patients. This dataset will be used to train our model.

Our model will learn from this dataset, understand patterns. The model will improve from experience. It eventually uses this information to make predictions.

Let's have a look at this dataset.

![Dataset image](/engineering-education/how-to-analyze-machine-learning-models-using-shap/dataset-image.jpg)

From the image above, our image does not have column names or headers. To add column names or headers, we import the exploratory data analysis (EDA) packages.

To download this dataset, click [here](https://drive.google.com/file/d/1f7KKV91gu5Dvl3O2jIvThbhbp1YHy03f/view?usp=sharing)

### Importing exploratory data analysis packages
We will import two packages, Pandas and Numpy.

We use Pandas to import our dataset. It also adds column names into our dataset. Numpy will be used for mathematical operations.

Let's initialize our column names.

#### Initializing column names
We initialize the column name as follows.

```python
names = ["Num_of_Preg","Glucose_Conc","BP","Skin_Thickness","TwoHour_Insulin","BMI","DM_Pedigree","Age","Class"]
```

The names shown above are the information collected from patients. The information is used to determine if a person is diabetic or non-diabetic.

Let's add these names to our dataset.

```python
df = pd.read_csv("diabetes-prediction.csv",names=names)
```

From the code above we have used Pandas to import our dataset. It also adds the initialized column names. Let's see if the column names have been added to our dataset.

```python
df.head()
```

![Dataset image](/engineering-education/how-to-analyze-machine-learning-models-using-shap/dataset-structure.jpg)

Let's check for missing values in our dataset.

### Checking for missing values
To check for missing values, run this command.

```python
df.isna().sum()
```

Let's see the output.

![Missing values](/engineering-education/how-to-analyze-machine-learning-models-using-shap/missing-values.jpg)

From the image above we do not have any missing values. This shows that all of the data points are available. From here, we can check the data types of our dataset column.

### Checking for our data types
To check the data types, use this code.

```python
df.dtypes
```

The output is shown below.

![Data types](/engineering-education/how-to-analyze-machine-learning-models-using-shap/dataset-datatypes.jpg)

From the image above we have two data types: `int64` and `float64`. These are both numbers, these show that our data types are uniform.

> NOTE: All the data types must be in numbers. Numbers are more machine-readable compared to other data types.
> If you find that your data types are not numbers, you need to convert them to either `int64` or `float64.

Our dataset contains information on both diabetic and non-diabetic patients. Let's check how they are distributed in our dataset.

### Diabetic vs non-diabetic
To check for the numbers, run this command.

```python
df.groupby('Class').size()
```

The output is as shown below.

```bash
Class
0    500
1    268
dtype: int64
```

From the output, we have two classes `0` and `1`. `0` represents non-diabetic patients while `1` represents diabetic patients.

From the numbers we can see we have `500` non-diabetic patients and `268` diabetic patients.

We need to add information on both diabetic and non-diabetic patients. This allows the model to learn from both of them. This helps to reduce model bias.

### Adding features and labels
Features are the unique attributes and variables in the dataset. They are used as input for the model. Features will train our model during the training phase.

Labels are the target or the output variable. Labels are what the model is trying to predict during the prediction phase.

From our dataset, we have `8` features. Thes are: `Num_of_Preg`, `Glucose_Conc`, `BP`, `Skin_Thickness`,
`TwoHour_Insulin`, `BMI`, `DM_Pedigree` and `Age`.

Let's add these features.

```python
df.iloc[:,0:8]
```

We use `iloc` to select from the `0` index of our dataset to the `8` index.

The output is as shown below.

![Features](/engineering-education/how-to-analyze-machine-learning-models-using-shap/features.jpg)

The image above shows all the `8` features added to our dataset. We now save the features into a variable called `Xfeatures`.

```python
Xfeatures = df.iloc[:,0:8]
```

Let's now add our label.

Our label is the `class` column. The `class` column is labeled as either `1` or `0`. `0` represents non-diabetic patients while `1` represents diabetic patients.

```python
Ylabels = df['Class']
```

Let's now scale our dataset.

### Dataset scaling
Dataset scaling ensures that our dataset fits into the model. It removes the overlapping dataset using a specified scale. It also converts all the input data types of `int64` to `float64`.

Let's import the Python package that will be used to scale our dataset.

```python
from sklearn.preprocessing import MinMaxScaler as Scaler
```

The `MinMaxScaler` will be used to scale our dataset.

For further reading on how the `MinMaxScaler` works, read this [article](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html).

Since we are scaling the input variables, we will scale our `Xfeatures`. Let's run this code to scale our `Xfeatures`.

```python
scaler = Scaler()
X = scaler.fit_transform(Xfeatures)
```

From the code above we have initialized our scaler function as `Scaler()`. We also use the `fit_transform` method. It ensures that our `Xfeatures` fits into the model during the training phase.

We then need to transform our scaled dataset into a data frame. Data frame will structure our dataset into rows and columns as shown below.

```python
X = pd.DataFrame(X,columns=names[0:8])
```

To see our scaled data frame run this command.

```python
X.head()
```

The output is shown below.

![Data frame](/engineering-education/how-to-analyze-machine-learning-models-using-shap/scaled-dataframe.jpg)

Let's now split our dataset.

### Splitting our dataset
We split the dataset into two sets, the training set, and test set. The training set is used during the training phase. The model learns from this dataset.

The test set is used to evaluate the model performance. It also measures the model's accuracy score.

Let's import the package required to split our dataset into two.

```python
from sklearn.model_selection import train_test_split
```

We use `train_test_split` to split our dataset.

```python
X_train,X_test,y_train,y_test = train_test_split(X,Ylabels,test_size=0.2,random_state=42)
```

In the code above we used `test_size=0.2`. This implies that `80%` will be used as a training set. The remaining `20%` will be the test set.

Let's start building our model.

### Building the model
Let's start by importing the machine learning packages.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
```

As shown above, we have imported the following.

- LogisticRegression: This is the algorithm used to train our model.

- accuracy_score: This method is used to calculate the accuracy score of the model when making predictions.

Let's now build the model using the `LogisticRegression` algorithm.

```python
logit = LogisticRegression()
logit.fit(X_train,y_train)
```

In the code above, we have initialized our algorithm as `LogisticRegression()`. We then use the `fit()` method to fit our model into the train set.

The model will learn from the training set and understand patterns. It will also improve from experience. It eventually uses the information it gained to make predictions.

Let's calculate the accuracy score of this model.

### Calculate the accuracy score
We calculate the accuracy score using the `accuracy_score`.

```python
print("Accuracy Score of Logistic::",logit.accuracy_score(X_test,y_test))
```

The accuracy score is as shown below.

```bash
Accuracy Score of Logistic:: 0.7727272727272727
```

When converted into a percentage is `77.27%`. As we continue training our model, the accuracy score will increase.

### Testing our model
During this phase, we use our model to make predictions. Our model should predict if a given input sample belongs to diabetic or non-diabetic.

Let's extract a sample input from the test set. The sample input is the 1st data point of the test set dataset. Its represented by the `0` index of the array.

```python
X_test.values[0]
```

The values of the sample input are shown below.

```bash
array([0.35294118, 0.3483871 , 0.34693878, 0.33333333, 0.22458629,
       0.32310838, 0.15029889, 0.36666667])
```

Let's now make a single prediction using these values.

### Making single a prediction
To make a prediction, we use the `predict()` method as shown below.

```python
logit.predict(np.array(X_test.values[0]).reshape(1,-1))
```

We also use `np.array` to read the first index of the array. Then, we use `reshape(1,-1)` to output the prediction results in a singular column.

Let's see the prediction results.

```bash
array([0])
```

The prediction result is `0`. This shows that the input sample belongs to a non-diabetic person.

We now need to explain this prediction result. This enables us to see why and how the model reached this conclusion.

Let's get started with SHAP.

### Getting started with SHAP
Shapley Additive Explanations (SHAP) is a game-theoretic technique that is used to analyze results. It explains the prediction results of a machine learning model. It uses Shapley values.

Shapley values are weights assigned to the model features. It shows how each feature contributed to the prediction results. It determines the impact of features on the prediction results.

Let's install SHAP. We can install SHAP using the following command.

```python
!pip install shap
```

Let's import SHAP.

```python
import shap
```

We also need to initialize JavaScript. JavaScript enables us to plot visualization diagrams. SHAP uses different plotting techniques to explain the prediction results.

#### Initializing JavaScript

```python
shap.initjs()
```

Let's now start explaining the prediction results. We use the `KernelExplainer` function to explain the prediction results made above. `KernelExplainer` is a SHAP function that works well with the `LogisticRegression` algorithm.

Let's initialize the `KernelExplainer` function.

### Initialize KernelExplainer
We need to add `KernelExplainer` to our train set to learn from the dataset. This makes it easier for the function to explain the prediction results.

```python
explainer = shap.KernelExplainer(logit.predict_proba, X_train)
```

In the code above we have passed the `X_train`. This enables the `KernelExplainer` to understand patterns. We also specify the algorithm used as `logit`. `logit` represents the `LogisticRegression` algorithm.

From here, we can now create Shapley values. Shapley values will assign weights to the features available in the data set.

#### Creating Shapley values
This code will create the Shapley values of the `Xfeatures` available in the input sample. We are using our input sample from the previous section. We will explain the prediction made at this instance.

```python
shap_values = explainer.shap_values(X_test.iloc[0,:])
```

To see the generated Shapley values run this command.

```python
X_test.iloc[0,:]
```

The generated Shapley values are as shown below.

![Shapley Values](/engineering-education/how-to-analyze-machine-learning-models-using-shap/shapley-values.jpg)

We now use these generated values to plot a force plot diagram.

### Force plot diagram
Force plots are diagrams that give a visual representation of how each feature contributed to the prediction results. They give an intuitive understanding of how the weights impacted the prediction results.

To plot a force plot diagram run this command.

```python
shap.force_plot(explainer.expected_value[0], shap_values[0], X_test.iloc[0:])
```

The plotting function has the following parameters.

- expected_value[0]

This represents the input sample to be used to make the prediction. In the previous section, we used the same input sample to make the prediction.

The sample input is the 1st data point of the test set. Its represented by the `0` index in the array. SHAP will explain why this input sample was predicted as a non-diabetic person.

- shap_values[0]

We specify the shapely values as `0`. This selects the shapely values that contribute to non-diabetic prediction.

- X_test.iloc[0:]

The `iloc` method selects the 1st data point of the `X_test` array.

The force plot output is as shown below.

![Force plot](/engineering-education/how-to-analyze-machine-learning-models-using-shap/shapley-values.jpg)

Let's analyze this force plot.

### Analyzing the force plot
The force plots have the following attributes.

#### Base value
This is the average prediction probability after the training phase. In our case, the base value is `0.67`. This value is used to determine if a prediction is true or false.

If we get an output value that is below `0.67`, it will imply that our model has a wrong prediction. However, if we get a value that is equal to or greater than `0.67`, it will imply the model made the right prediction.

#### Output value
This is the real prediction value after training. In our case, the output value is `0.70`

#### Assigned feature weights and value
They contribute to a prediction score of 0.70. This value is shown in bold.

#### Red color block
This represents features that influence the prediction results positively. They push the prediction results from the base value of `0.67` to the output value of `0.70` 

From the image above we have features such as: `TwoHour_Insulin` and `Glucose_Conc`.

#### Blue color block
This represents features that influence the prediction results negatively. They try to drag the prediction value from the base value of `0.67`.

#### Size of the color block
The size of the color block represents the importance of the features. The larger the size, the greater impact the feature had on prediction results.

For example, in the red color block, the `Glucose_Conc` has the largest size. This indicates that it had a greater impact on the prediction results.

In the blue color block, `Age` has the greatest impact.

From the above force plot, we can make the following conclusion.

- Our model was able to make the right prediction.

This is because the `Output value` is `0.70`. This value is above the base value of `0.67`.

We can also use a summary plot. Summary plots are used to show how all the features contributed to the prediction results.

### Plotting a summary plot
To plot a summary plot, use this code.

```python
shap.summary_plot(shap_values,X_test)
```

The output of the summary plot is shown below.

![Summary plot](/engineering-education/how-to-analyze-machine-learning-models-using-shap/summary-plot.jpg)

From the summary plot, we can see that `Glucose_Conc` has the highest impact. `Skin_Thickness` has the least impact.

We have now successfully analyzed our prediction results.

To get the Google Colab link for this tutorial, click [here](https://colab.research.google.com/drive/1ZwNXFGMvSlM24W66TlJt5Fiu4MlYdQA5?usp=sharing)

### Conclusion
In this tutorial, we learned how to analyze machine learning models using SHAP. We started by learning the importance of analyzing machine learning prediction results. This helps humans trust and confidence when using models.

We then moved to dataset pre-processing. This involved cleaning our data to ensure that there is no missing values. It also involves scaling the dataset to ensure it fits. After this, we were able to build a machine learning model. The model was able to predict if a patient is diabetic or not.

Finally, we used SHAP to explain the prediction results of our model. After the analysis, we concluded that our model made the right prediction. This is because the output value was higher than the base value.

Happy coding!

### References
- [Google colab link](https://colab.research.google.com/drive/1ZwNXFGMvSlM24W66TlJt5Fiu4MlYdQA5?usp=sharing)
- [Basics of explainable AI](https://en.wikipedia.org/wiki/Explainable_artificial_intelligence)
- [SHAP for machine learning](https://christophm.github.io/interpretable-ml-book/shap.html)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [How to create Shapely values](https://neptune.ai/blog/ml-model-interpretation-tools)
- [Force plot basics](https://www.stardat.net/post/force-plot)
- [Summary plot basics](https://christophm.github.io/interpretable-ml-book/shap.html)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
