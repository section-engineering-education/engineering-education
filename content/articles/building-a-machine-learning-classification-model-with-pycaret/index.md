---
layout: engineering-education
status: publish
published: true
url: /building-a-machine-learning-classification-model-with-pycaret/
title: Building a Machine Learning Classification Model with PyCaret
description: In this article we will learn how to build a machine learning classification model using PyCaret.
author: sharon-kinyan
date: 2021-08-01T00:00:00-05:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-a-machine-learning-classification-model-with-pycaret/hero.png
    alt: PyCaret model example image 
---
PyCaret is a machine learning (ML) library that is written in Python. It allows developers to train and deploy ML models. When compared with other open-source ML libraries such as scikit-learn, it is a good alternative low-code library that can be used to perform complex machine learning tasks with only a few lines of code.
<!--more-->

PyCaret is a machine learning (ML) library that is written in Python. It allows developers to train and deploy ML models. When compared with other open-source ML libraries such as scikit-learn, it is a good alternative low-code library that can be used to perform complex machine learning tasks with only a few lines of code. 

We will be using PyCaret with the [Default of Credit Card Clients Dataset](https://www.kaggle.com/uciml/default-of-credit-card-clients-dataset) dataset from Kaggle to predict whether a customer will default on payment or not. This prediction will be based on several features which we'll see in this tutorial.

### Prerequisites
A reader needs to:

1. Use [Jupyter Notebook](https://jupyter.org/) or [Google Colab](https://research.google.com). In my tutorial, I used Google Colab.
2. Be familiar with the Python programming language.
3. Install Python 3.x
4. Install the latest version of PyCaret. Currently, PyCaret 2.3 is the latest version. Its release notes are available [here](https://github.com/pycaret/pycaret/releases).

### Outline
1. [What is PyCaret?](#what-is-pycaret)
2. [Why use PyCaret?](#why-use-pycaret)
3. [Functionalities of PyCaret](#functionalities-of-pycaret)
4. [Getting started](#getting-started)
    - [Installing dependencies](#installing-dependencies)
    - [Importing dependencies](#importing-dependencies)
5. [Loading custom dataset from Kaggle using Pandas](#loading-custom-dataset-from-kaggle-using-pandas)
6. [Training and evaluating our ML classification model](#training-and-evaluating-our-ml-classification-model)
7. [Testing our model](#testing-our-model)
8. [Saving our model](#saving-our-model)
9. [Wrapping up](#wrapping-up)

### What is PyCaret?
PyCaret is a machine learning library that is written in Python. It allows developers to train and deploy ML models in an easy and fast way.  

PyCaret has really good documentation that explains more about PyCarets features on their [website](https://pycaret.org/). The documentation contains a lot more information on how to get started using it. In our tutorial, we are only using it for classification. But, you can also use this library to perform clustering, regression, anomaly detection, and natural language processing tasks.

### Why use PyCaret?
1. It is an open-source library. It is available to anyone interested in using it.
2. It is built using Python. Most developers are familiar with this programming language.
3. It is fast. Within only a few minutes, developers can deploy complex models.
4. It is a low-code ML library. Since you spend less time coding, it makes developers more productive.
5. It is a Python wrapper that is based on existing libraries such as scikit-learn. Thus, doesn't require a separate learning curve.
6. It integrates seamlessly with other Python environments such as PyCharm. Developers can integrate PyCaret into their existing ML workflows with ease.
7. It is ideal for both students and experienced developers.  

### Functionalities of PyCaret 
1. Data preparation.
2. Model training.
3. Hyperparameter tuning.
4. Analysis and interpretability.
5. Model selection.
6. Experiment logging.

Let's now get started with PyCaret. The first step involves installing and importing dependencies.

### Getting started
There are three main dependencies that we are going to import: PyCaret, Pandas, and Shap.

1. PyCaret

PyCaret will be our main dependency. It allows us to leverage the ML pipeline to build our models.

2. Pandas

We are using pandas to load our CSV data into the data frame. We use this library to read, clean, and manipulate our dataset to be able to build a custom machine learning model.

3. Shap

Shap helps us interpret machine learning model results.

Let's now install these dependencies.

#### Installing dependencies
Installing dependencies is relatively straightforward using the `pip install` command. Since you're using Google Colab, the `pip` command should automatically have been installed. Just type in the following code:

```python
pip install pycaret pandas shap 
```

If you're installing these dependencies using your local jupyter notebook, no need to put the exclamation `!` before the `pip` command.

#### Importing dependencies
Let's now import these dependencies into our Google Colab:

```python
import pandas as pd
from pycaret.classification import *
```

### Loading custom dataset from Kaggle using Pandas
Let's go ahead and download the [Default of Credit Card Clients Dataset](https://www.kaggle.com/uciml/default-of-credit-card-clients-dataset) dataset from Kaggle. Grab the downloaded dataset from the Downloads folder on your computer and copy it into the Google Colab folder that you're working on.

We can then load this dataset in our Colab using the pandas library:

```python
df = pd.read_csv(UCI_Credit_Card.csv)
```

To view it, let's type in the following:

```python
df.head()
```

Alternatively, there exists a built-in PyCaret's data repository. Using the `get_data()` function, you can directly load the data into your Colab. But, this option requires you to have an internet connection.  

```python
from pycaret.datasets import get_data
credit_dataset = get_data('credit')
```

![Loading the Default of Credit Card Clients Dataset](/engineering-education/building-a-machine-learning-classification-model-with-pycaret/loaded-dataset.png

### Training and evaluating our ML classification model
To train and evaluate our ML model, we need to use the `setup()` function. The function creates our ML transformation pipeline and initializes the environment in PyCaret. PyCaret's rules state that it must be the first function to be called before executing any other function. 

The `setup()` function takes in two parameters; data, and target. An extra parameter can be added called `categorical_features` and `numeric_features` if you want PyCaret to infer data types in your dataset i.e., infer features with numerical data types into categorical types used in classification. But, we won't use that extra parameter today. I'll introduce it in a follow-up article.

```python
exp_name = setup(data = credit_dataset, target='default', session_id=5041)
```

![Training and evaluating our ML classification model](/engineering-education/building-a-machine-learning-classification-model-with-pycaret/setup-function-results.png)

As shown above, running the code generates information concerning the pre-processing pipeline which is constructed when `setup()` is executed. For example, we have 14 `numeric features` and 9 `categorical features` in our data. 

In our experiment, we've also used the `session_id = 5041` parameter. We've set ours to attain reproducibility. Using it is not compulsory, but excluding it will prompt a random number to be generated.

With our experiment set up, all that's left to do now is to go on and train the model.

```python
best_model = compare_models()
```
![Best performing model](/engineering-education/building-a-machine-learning-classification-model-with-pycaret/best-model.png)

The code above is going to train our model. To train it, we run the `compare_models()` function. This function trains all models in the model library and scores them using the commonly used classification metrics: Accuracy, AUC, Recall, Precision, F1, Kappa. The results obtained show a list of the best-performing models at a particular point in time. 

In our case, the Ridge Classifier is our best-performing model. The list contains different learning algorithms. But, we are only interested in the learning algorithm that is the best performing. We drop the rest.

### Testing our model
```python
predict_model(best_model)
```
![Predicting the best model](/engineering-education/building-a-machine-learning-classification-model-with-pycaret/predict-model-best.png)

The accuracy recorded after testing our model is `0.8159`. There isn't much difference with the accuracy recorded earlier of `0.8228`. This could be due to overfitting or other factors that may need investigation. 

By employing techniques such as as [early stopping](https://en.wikipedia.org/wiki/Early_stopping) and [dropout](https://en.wikipedia.org/wiki/Dilution_(neural_networks)) will help us prevent our model from overfitting and would reduce significantly the difference between training and validation accuracy.

### Prediction on our dataset
To perform prediction on our `credit_dataset` dataset, type in the following code:

```python
prediction = predict_model(best_model, data = credit_dataset)
prediction.tail()
```

![Prediction on the dataset](/engineering-education/building-a-machine-learning-classification-model-with-pycaret/prediction-dataset.png)

Please note that the `Label` column has now been added at the end of our dataset. This `Label` column denotes our prediction. The value `1` predicting true (customer will default) while a `0` predicts false (customer won't default). We use the `head()` and `tail()` functions to perform predictions on the first 5 and last 5 rows respectively. You can play around with it. To perform prediction on all the rows, remove the `prediction.tail()` code.

### Saving our model
The last thing that we have to do is go ahead and save this model. We save our model using the following code:

```python
save_model(best_model, model_name='ridge-model')
```

![Saved model](/engineering-education/building-a-machine-learning-classification-model-with-pycaret/saved-model-results.png)

### Loading our saved model
To load our saved model, type in the following code:

```python
model = load_model('ridge-model')
```

With a few lines of code, our transformation pipeline and model have successfully Loaded!

Please find the full code [here](https://colab.research.google.com/drive/1wnKtM8zIfdpJlJlwZE1TYqeocuH3F8W1?usp=sharing).

### Wrapping up
That, in a nutshell, is how to get started with PyCaret. PyCaret is a very strong competitor to [scikit-learn](https://scikit-learn.org/stable/), and I do not doubt that it will become one of the most used libraries such as the likes of TensorFlow and pandas. Feel free to try and build your ML classification model using your custom dataset.

That wraps it up! Happy coding!

### Further reading
1. [PyCaret](https://pycaret.org/)
2. [Default of Credit Card Clients Dataset](https://www.kaggle.com/uciml/default-of-credit-card-clients-dataset)
3. [Google Colab](https://research.google.com)
4. [Jupyter Notebook](https://jupyter.org/)

---
Peer Review Contributions by: [Collins Ayuya](https://www.section.io/engineering-education/authors/collins-ayuya/)
