Model interpretation finds out why a model makes a certain decision during the prediction phase, this ensures we have fair, accountable and a transparent model.

In model interpretation we try to answer the question why should we trust the model? and why did the model make this conclusion?. Through model interpretation we should be able to explain what the model is doing and why its making a certain prediction. Regardless of what machine learing problem the model is trying to solve, model interpretation will always be the better solution because the involved stakeholders and end-users can understand what the model is actually doing and how to apply it in different scenarios.

This makes users to have trust and confidence to use these models to solve mission critical real-world problems that have a great impact to society and business such as self-driving cars model and health system models which are matter of life or death situations.

In this tutorial, we build a simple machine learning model then use [LIME](https://christophm.github.io/interpretable-ml-book/lime.html) to interpret our model.

### Table of contents

- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Creating features](#creating-features)
- [Creatinng labels](#creatinng-labels)
- [Model building](#model-building)
- [Model training using logistic regression](#model-training-using-logistic-regression)
- [Model testing](#model-testing)
- [Calculating the accuracy score](#calculating-the-accuracy-score)
- [Making a single prediction](#making-a-single-prediction)
- [Model interpretation with LIME](#model-interpretation-with-lime)
- [LIME explainer](#lime-explainer)
- [Applying the LIME explainer](#applying-the-lime-explainer)
- [Showing the explainer results](#showing-the-explainer-results)
- [Conclusion](#conclusion)
- [References](#References)

### Prerequisites

- Ensure you have [Python](https://www.python.org/) installed.
- You must know [Python programming.](/engineering-education/python-projects-for-beginners/)
- Be familiar with [machine learning modelling.](engineering-education/house-price-prediction/)
- Be familiar with [Google colab notebooks.](https://colab.research.google.com)

### Introduction

Model interpration has made a greater impact in todays machine learning building, through interpretation we can build more robust, accurate and most trust worthy model. These are reasons why model interpretation is important.

#### Importance of model interpretation

- Detect errors and bugs in the model.
- To detect bias during model training.
- To know model reliability.
- To improve model perfomance and generilization.
- To identify wrong classifications during predictions.

When in comes to model interpretation we have different methods and techniques used depending on the type of algorithm used, the type of machine learning problem and the complexity of these problems.
The model interpretation techniques and methods are as follows.

#### Model-specific method

This technique is specific to only certain model and may not be applied to other machine learning models. It checks on the specific features and attributes within a model and their impact to the general functionalaties of the model.

#### Local or Global scope method

The local scope is used in individual prediction and tries to explain why the model made a certain single prediction. In global scope goes beyond the indidual prediction and tries to explain the general behaviour of the model.

In this tutorial we will build a simple classification model using the iris dataset. The model classifies the flower species based on the user input. From there we will use LIME to interpret this model.

To dowload the dataset for this tutorial click [here.](https://drive.google.com/file/d/1Sk-ajxQ30vUHMHRffypb3l6fYApkU244/view?usp=sharing)

Lets start building our model.

#### Importing exploratory data analysis packages

These packages are used for data analysis and manipulation. We use Pandas to load our dataset and Numpy to conduct mathematical and scientific computations on our dataset.

```python
import pandas as pd
import numpy as np
```

Lets use Pandas to load our dataset.

```python
df = pd.read_csv("iris-dataset.csv")
```

Lets check the dataset structure.

```python
df.head()
```

The output is shown.

![Dataset structure](/engineering-education/model-interpretation-using-lime/dataset-structure.jpg)

This shows that our model has columns such as: `sepal_width`, `petal_length`, `petal_width`, and `species` columns. These columns are used as inputs when making predictions.

### Creating features

Features are the key attributes in the dataset that are used as inputs during model training. These are features are used by the model to enhance pattern recognition during model training.

```python
X = df[['sepal_length', 'sepal_width', 'petal_length', 'petal_width']]
```

### Creatinng labels

Labels are the target variable that the model is trying to predict. In this case our label is the `species` column, the model is trying to predict the species of a given flower.

```python
Y = df['species']
```

Lets makes the output unique, this ensures that we can have unique ouputs and reduce model bias.

```python
class_names = Y.unique()
```

### Model building

We import all the packages needed to build our machine learninng model.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split
```

In the code above we import the followin.

#### LogisticRegression

This is a [Scikit-learn](https://scikit-learn.org/stable/) algorithm which is used to solve classification problems.

#### accuracy_score

This is used to calculate the accuracy score of our model during making prediction. The higher the accuracy score the better out model is at making predictions.

#### train_test_split

This method is used to split our datset into two sets. The first set is used to train our model while the second set is used to test the model.

Lets now split our dataset.

```python
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.30, random_state=7)
```

In the code above we specify the splittind ratio as `0.30`. This implies that `70%` of the dataset will be used to train our model and `30%` to test the same model.

Lets see the training values. The training values are the length and width of the flowers, these sizes are specific to the flower species.

The flower species are `virginica`, `setosa` and `versicolor`. Their length and width are shown in the image below stored in an array.

![Flower sizes](/engineering-education/model-interpretation-using-lime/flower-sizes.jpg)

Lets check the available datapoints in our training set.

```python
X_train.shape
```

The output is shown.

```python
(105, 4)
```

This shows that there is a total of `105` flower species and `4` columns in the training set.

Lets use Logistic regression to build and train our model.

### Model training using logistic regression

We start by initializing the `LogisticRegression()` method which is used for trainng our model.

```python
model_logreg = LogisticRegression()
```

After initializing our model, we now fit the model into the dataset. We fit our model using the training dataset, the model uses this dataset to recognize pattern which is important during predictive analysis.

During the training phase, the model gains knoweldge through learning, stores this knowledge and eventually this model when making predictions.

```python
model_logreg.fit(X_train, Y_train)
```

During the training phase, the model fine tunes the model and outputs the best parameters for the model which will give the optimal solution as shown in the image below.

![Model output](/engineering-education/model-interpretation-using-lime/flower-sizes.jpg)

Lets test our model using the testing dataset.

### Model testing

This ensures that we evalaute the model quality and perfomance. It ensure we do not have a biased model.

```python
model_logreg.predict(X_test)
```

The model is used to make prediction of the data points instances found in the testing set. The prediction output are shown below.

![Testing output](/engineering-education/model-interpretation-using-lime/testing-output.jpg)

To evaluate this prediction, we need to calculate the accuracy score of this model when making these test predictions.

### Calculating the accuracy score

Accuracy score shows the number of correct predictions made by our model. This is usually expressed as a percentage, the higher the accuracy score the better the model is in making predictions.

The accuracy score is calculated as follows.

```python
accuracy_score(Y_test,model_logreg.predict(X_test))
```

The output is as shown.

```python
0.8888888888888888
```

When we convert into a percentage it becomes `88.89%`. This shows that our model has `88.89%` chance of making accurate predictions.

### Making a single prediction

Making single prediction involves using a single data point in the dataset to make a prediction.

Lets a single data point from the dataset.

```python
ex_specie = np.array(X_test.iloc[8]).reshape(1,-1)
```

We use `X_test.iloc()` method to extract the 8th row in our data set. This 8th is what our model will use to make a single prediction. We then use `reshape(1,-1)` function to ensure that have one column with the prediction result.

Lets now use this column to make a prediction.

```python
model_logreg.predict(ex_specie)
```

The prediction results are as shown below.

```python
array(['setosa'], dtype=object)
```

The prediction results is `setosa` which is true according to our test dataset.

Accorrding to our model these are the prediction results, but should we trust these results blindly?, should we try to understand how this model reached at this conclusion.

That why we need to use model interpretation techniques to verify these results and increase our trust in the model. This ensures that we know how the model works and its level of reliability.

Lets start model interpretation with LIME

### Model interpretation with LIME

LIME stands for Local Interpretable Model-Agnostic Explanations, it covers a local scope. Local scope is used in individual prediction and tries to explain why the model made a single prediction.

LIME is an interpretation algorithm that can explain the single predictions of any classification or regression model in a simple and understandable way.

To use LIME, lets install it. We install LIME usig the following command.

```python
!pip install lime
```

LIME has different methods used for interpretation depending on the kind of data that is used as input.

- Tabular data interpretation technique
- Textual data interpretation technique
- Image data interpretation technique

In this tutorial we are using tabular data, tabular data is type of data organized in rows and columns.

Let import LIME and tabular data interpretation technique.

```python
import lime
import lime.lime_tabular
```

Lets now create an explainer for the prediction made above, an explainer will explain why the model made that prediction.

In the example above the model predicted the 8th row as the `setosa` species.

The explainer instance is as follows.

### LIME explainer

```python
explainer = lime.lime_tabular.LimeTabularExplainer(X_train.values, feature_names=feature_names, class_names=class_names, discretize_continuous=True)
```

In the code above we have have to specify which kind of LIME interpretation we are dealing with, in this case we have specified as `lime_tabular.LimeTabularExplainer`.

We also need to pass the `X_train.values`, `feature_names` and `class_names` as parameters. This allows LIME to understand the patterns in the input dataset so that it can be able to verify the prediction results.

### Applying the LIME explainer

Lets apply this explainer to the 8th row of the dataset.

```python
exp = explainer.explain_instance(X_test.iloc[8],model_logreg.predict_proba,num_features=4,top_labels=1)
```

In the code above we have specified the row we want LIME to interpret its prediction as `X_test.iloc[8]`.

We also pass `model_logreg` which is the logistic regression model so that LIME can be able to verify its prediction results using `predict_proba`.

`predict_proba` will provide the prediction probability of that instance.

We finally specify the features in our dataset as `num_features=4` and the labels in our dataset as `top_labels=1`.

Lets now see the results of this explainer.

#### Showing the explainer results

To see the explainer results, run this command.

```python
exp.show_in_notebook(show_table=True, show_all=False)
```

This enables us to see the results in our notebook as shwon in the image below.

![Explainer results](/engineering-education/model-interpretation-using-lime/explainer-resultst.jpg)

From the image above we can see that LIME has given the prediction probability as follows.

- setosa with a probability of 0.88
- versicolor with a probability of 0.12
- virginica with a probability of 0.0

This shows setosa with a higher probability of 0.88 this makes it the right prediction result.

The middle of the image provide the rules that must be achieved so that the prediction is `setosa`. The rules are as follows.

- petal_length >= 1.50
- sepal_width > 3.30
- sepal_length <= 5.10

All these rules are achieved according to the right side of the image which gives the dimensions of our input features.

Using this visual representation, we can clearly see that our model model made the right prediction and now we can trust this model.

### Conclusion

In this tututorial we have learned about model interpretation using LIME. We stated with building our simple model that will be used to expain the concept of model interpretation.

In this tutorial, we followed all the stages of machine learning and came up with a model that was able to predict the type of flower species.

Finally we used LIME to interpret and explain why this model made certain prediction. We were able to understand the model functionality and what criteria it used to arrive at this conclusion, this enables user to trust these models when using them.

To get the Google colab notebook for this tutorial click [here](https://colab.research.google.com/drive/149GrO47OiHYDQfqlTB4NKMixWJXtp_-v?usp=sharing)

### References

- [Google Colab notebook for this tutorial](https://colab.research.google.com/drive/149GrO47OiHYDQfqlTB4NKMixWJXtp_-v?usp=sharing)
- [LIME documentation](https://christophm.github.io/interpretable-ml-book/lime.html)
- [Basic model interpretation tools](https://neptune.ai/blog/ml-model-interpretation-tools)
- [Introduction to model interpretation](https://gilberttanner.com/blog/introduction-to-machine-learning-model-interpretation)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
