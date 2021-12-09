---
layout: engineering-education
status: publish
published: true
url: /save-and-load-stacked-ensembles-in-onnx/
title: Saving and Loading Stacked Ensemble Classifiers in ONNX Format in Python
description: In this tutorial, the reader will learn how to build an ensemble classifiers. They will learn to save and load these models using ONNX format.
author: ian-njari
date: 2021-12-09T00:00:00-13:40
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/save-and-load-stacked-ensembles-in-onnx/hero.jpg
    alt: Stacked Ensemble Classifiers in ONNX format in Python example image
---
Stacked ensemble models are learners that increase predictive performance over stand-alone learners by combining the results of two or several machine learning models and running them through a meta-learner.
<!--more-->
The stacked models are different (not a single type), unlike in bagging methods (just decision trees) where each model in the stack does not correct the predictions of the previous ones like it happens in boosting. You can learn how to build one such Ensemble model by reading [this article](/engineering-education/ensemble-learning-based-regression-model-using-python/) by [Adhinga Fredrick](/engineering-education/authors/adhinga-fredrick/).

[Open Neural Network Exchange](https://onnx.ai/) (ONNX) is an open-source format for deep learning and traditional machine learning developed by Microsoft that has a unified schema for saving models despite the library they were developed in.

Launched in December 2017, this gave data scientists and machine learning engineers a way to persist models without worrying about platform inconsistencies and library version deprecation.
It acts as a means to avoid vendor locking since ONNX models can be deployed on any platform - not just where they were trained.

Assume you trained an image recognition model on NVIDIA's GPUs. But, for operations purposes, you decide to deploy it to a production environment on Google's TPUs. Well, ONNX is a nifty tool to transfer the model between the two. Container-based methods for pushing models to the production environment using Docker can also be bypassed altogether. 

For machine learning engineers who may want to ship models across platforms, or containerizing them, ONNX models can help avoid that all together. 

### Table of contents
- Preparing the environments.
- Importing and preparing the data.
- Building and evaluating the classifier.
- Serializing the model to ONNX format.
- Loading the model using the ONNX runtime inference session.

### Prerequisites
- Basic knowledge of Python.
- Machine learning model building, evaluation, and validation in Scikit-Learn.
- Basic data manipulation skills.
- Python (with `pip`, `numpy`, `pandas`, and `sklearn`) installed on your computer or an online environment like Google Colab or Kaggle.

### Goal
In this article, you will learn how to:
- Install ONNX and `onnxruntime`
- Determine the ONNX input initial types.
- Serializing and saving a stacked ensemble to ONNX format.
- Loading it to production using an ONNX runtime inference session.

### Setting up environments
To install ONNX and `onnxruntime` on a local environment, run the following commands:

If you're using `pip`, on your terminal:

```bash
pip install onnx
pip install onnxruntime
```

If you're using Anaconda, on anaconda terminal:

```bash
conda install -c conda-forge onnx
conda install -c conda-forge onnxruntime
```

> Note: ONNX is not pre-installed in the runtime environments on Google Colab and Kaggle notebooks.

To install ONNX and `onnxruntime` on Google Colab or Kaggle:

```bash
!pip install onnx
!pip install onnxruntime
```

> Note: Online editors like `repl.it` may fail to run our code due to insufficient memory allocations.

### Importing and preparing the data
Let's start by importing `pandas` library and the dataset.

```python
import pandas as pd
path='https://raw.githubusercontent.com/iannjari/datasets/main/diabetes.csv'
df=pd.read_csv(path,engine='python')
print(df)
```

#### Dataset
We will be using the "Heart Failure Prediction Dataset" from [Kaggle](https://www.kaggle.com/fedesoriano/heart-failure-prediction).

This dataset is a combination of 5 other datasets containing 11 features in total. Here, the target feature to be classified is `Heart Disease`. A patient having heart disease or not is represented by 1 or 0, respectively.

You can read more about the dataset [here](https://www.kaggle.com/fedesoriano/heart-failure-prediction).

##### Output:

![DataFrame](/engineering-education/save-and-load-stacked-ensembles-in-onnx/df1.png)

*Screenshot of the dataset by author*

We will separate out the target data column `Outcome` from the other feature columns as shown:

```python
target_name = "Outcome"
target = df[target_name]

data = df.drop(columns=[target_name])
print(data)
```

Split the data into training and testing partitions with a split of 70-30, as shown:

```python
from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(
    data,target, test_size=0.33, random_state=42)
```

### Training and evaluating the stacked classifier
We shall employ a stack with a [random forest classifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html), [kNN classifier](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html), [gradient boosting classifier](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.GradientBoostingClassifier.html), and a [logistic regressor](https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LogisticRegression.html) as a final model.

A random forest classifier uses a number of decision trees on randomly selected subsets of the data and makes decisions out of these trees based on votes. A k-Nearest Neighbors classifier classifies possible data points based on distance similarity.

A gradient boosing classifier combines many weak learning classifiers together to create a strong predictive model. The logistic regression is used to model data like linear regression and then predict the outcome that falls into classes, instead of having them as continuous values.

Let's import all the necessary packages:

```python
from sklearn.ensemble import (RandomForestClassifier, StackingClassifier, GradientBoostingClassifier)
from sklearn.linear_model import LogisticRegression
from  sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
```

Then, we initialize the stack:

```python
clf=StackingClassifier(estimators=[
            ("rf",RandomForestClassifier(n_estimators=10,random_state=42)),
            ("gb",GradientBoostingClassifier(n_estimators=10,random_state=42)),
            ("knn",KNeighborsClassifier(n_neighbors=5))],final_estimator=LogisticRegression())
```

Now, let's build a pipeline, fit it on training data, and score it on test data:

```python
pipeline = make_pipeline(
            StackingClassifier(estimators=[
            ("rf",RandomForestClassifier(n_estimators=10,random_state=42)),
            ("gb",GradientBoostingClassifier(n_estimators=10,random_state=42)),
            ("knn",KNeighborsClassifier(n_neighbors=5))],final_estimator=LogisticRegression()))

pipeline.fit(x_train,y_train)
print(pipeline.score(x_test,y_test))
```

**Output:**

```bash
0.7716535433070866
```

When evaluating the model using a confusion matrix as shown, we can get the precision, recall, and F1 scores:

```python
from sklearn.metrics import confusion_matrix
preds=pipeline.predict(x_test)
c_matrix=confusion_matrix(y_test, preds)
tn, fp, fn, tp = c_matrix.ravel()
precision= tp/(tp+fp)
misclassification= (fp+fn)/(tn+fn+tp+fp)
f_one=tp/(tp+0.5*(fp+fn))

print('Precision=',precision)
print('Misclassification=',misclassification)
print('F1 score=',f_one)
```

**Output:**

```bash
Precision= 0.6842105263157895
Misclassification= 0.2283464566929134
F1 score= 0.6419753086419753
```

Now that the model is trained and scoring well, let's save it and infer from it.

### Saving the model
To serialize (save) the model, we need to import ` convert_sklearn` from the `skl2onnx` package, along with `common.data_types` to define the types of our features as a parameter `initial_types`.

```python
from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import FloatTensorType
```

The `convert_sklearn` function requires a parameter `initial_types` to save the model. Each data type of the data columns must be assigned to this parameter. For example, if the data contains 3 columns with `float` followed by 2 of `String` types, and 1 with `int64`, then the following would be the declaration:

```python
initial_types =  [('feature_input', FloatTensorType([None, 3])),
                   ('feature_input', StringTensorType([None, 2])),
                   ('feature_input', FloatTensorType([None, 1]))]
```

In our case, the dataset has 8 `float` types.

> NOTE: Int can be treated as float, since it can be type casted.

So, we shall make the variable `initial_types` as:

```python
initial_types =  [('feature_input', FloatTensorType([None, 8]))]
```

Now, we will go ahead and save the model by passing the model `pipeline` and `initial_types` to the `convert_sklearn` function as shown:

```python
onx = convert_sklearn(pipeline,
                      initial_types=
                      initial_types)

with open("stacked_clf.onnx", "wb") as f:
    f.write(onx.SerializeToString())
```

The model is saved sucessfully.

> NOTE: If establishing the initial types is too challenging. For example, if the data has too many features, then the `to_onnx` method can do be used.

You just need to pass the `x_test` data (or one of it's column) as an argurment and ONNX extracts it automatically.

```python
# Use a section of data instead of x_test to avoid key errors
x=data.loc[44].to_numpy(dtype='float32')
# Give x as a keyword argument by using X=x
# Note case-sensivity
onx=skl2onnx.to_onnx(pipeline, X=x)

with open("stacked_clf.onnx", "wb") as f:
    f.write(onx.SerializeToString())
```

### Loading the model using ONNX runtime inference session
To make predictions from the model, import `onnxruntime` and call `InferenceSession`.

```python
import onnxruntime as rt
sess = rt.InferenceSession("stacked_clf.onnx")
input_name = sess.get_inputs()[0].name
label_name = sess.get_outputs()[0].name
pred_onx = sess.run([label_name], 
                 {input_name:
                   x_test.to_numpy(dtype='float32')})
```

`x_test` can be replaced by an array of the shape and type of the test data.

Let us see our predictions:

```python
print(pred_onx)
```

**Output:**

```bash
[array([0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0,
        0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1,
        0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0,
        0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1,
        0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1,
        0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
        0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0,
        0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1,
        1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], dtype=int64)]
```

As you can see here, we have saved models in the ONNX format, and then tried to load them for prediction.

### Conclusion
In this tutorial, we learned how to install ONNX and `onnxruntime`, determine ONNX input initial types, serializing, saved a stacked ensemble to ONNX format, and, loaded it to production using an ONNX runtime inference session.

This model can now be served via any web application framework like Streamlit or Dash using Django or Flask via an API. In case of any issues with ONNX, you can raise an issue on [ONNX's GitHub](https://github.com/onnx/sklearn-onnx/issues).

You can find the full code [here](https://github.com/iannjari/scrapbook/blob/main/Stacked_Ensemble.ipynb).

Happy ML-ing!

### References
- [Tutorial on Building an Ensemble Learning Based Regression Model using Python](https://www.section.io/engineering-education/ensemble-learning-based-regression-model-using-python/), *Adhinga Fredrick, Sections Engineering*
- [ONNX Homepage](https://onnx.ai/)
- [ONNX sklearn documenation](http://onnx.ai/sklearn-onnx/introduction.html)
- [Common errors with onnxruntime](http://onnx.ai/sklearn-onnx/auto_examples/plot_errors_onnxruntime.html?highlight=errors)
- [Notebook with accompanying Source Code](https://github.com/iannjari/scrapbook/blob/main/Stacked_Ensemble.ipynb).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)