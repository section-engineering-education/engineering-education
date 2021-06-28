---
layout: engineering-education
status: publish
published: true
url: /custom-transformer/
title: Creating a Custom Data Transformer using Scikit-Learn
description: In this article, we will learn how to build the custom data transformers using Scikit-Learn and look at an example to implement the same.   
author: terrence-aluda
date: 2021-06-28T00:00:00-01:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/custom-transformer/hero.jpg
   alt: Scikit-Learn Hero Image
---
In machine learning, a data transformer is used to make a dataset fit for the training process. Scikit-Learn enables quick experimentation to achieve quality results with minimal time spent on implementing data pipelines involving preprocessing, machine learning algorithms, evaluation, and inference.
<!--more-->
### Introduction
Scikit-Learn provides built-in methods for data preparation before the data is fed into a training model. However, as a data scientist, you may need to perform more custom cleanup processes or adding more attributes that may improve your model's performance. To do that, you will need to create a custom transformer for your data.

In this article, we will look at how to do that.

### Prerequisites
To follow along with this tutorial, you should have:
1. A good understanding of the [Python](https://www.python.org/) programming language.
2. Familiarity with the [Numpy](https://numpy.org/) and [Pandas](https://pandas.pydata.org/) libraries.
3. A basic knowledge in using Jupyter Notebooks or any other notebook-based technology, e.g., [Google Colab](https://research.google.com/colaboratory/).
4. Python and the libraries mentioned above installed.

Let's jump into it.

> The code snippets are tailored for a notebook, but you can also use regular python files.

### Getting Started

#### Loading the data
We will get our dataset from this [repository](https://raw.githubusercontent.com/ageron/handson-ml/master/) using the following script:

```python
import os
import tarfile
from six.moves import urllib

OUR_ROOT_URL = "https://raw.githubusercontent.com/ageron/handson-ml/master/"
OUR_PATH = "datasets/housing"
OUR_DATA_URL = OUR_ROOT_URL + OUR_PATH + "/housing.tgz"

def get_data(our_data_url=OUR_DATA_URL, our_path=OUR_PATH):
      if not os.path.isdir(our_path):
            os.makedirs(our_path)
      #setting the zip file path      
      zipfile_path = os.path.join(our_path, "housing.tgz")
      #getting the file from the url and extracting it
      urllib.request.urlretrieve(our_data_url, zipfile_path)
      our_zip_file = tarfile.open(zipfile_path)
      our_zip_file.extractall(path=our_path)
      our_zip_file.close()

get_data()
```

The code is for downloading the data from the URL to not dwell on it.
First, we imported the `os` module for interacting with the Operating System. After that, we imported the `tarfile` module for accessing and manipulating tar files. Lastly, we imported the `urllib` for using URL manipulation functions.
 
Then, we set our paths appropriately. In the `get_data()` function, we made a directory for our data, retrieved it from the URL then extracted and stored it. 

So, in your working directory, you will notice a directory called *datasets* created. On opening it, you will get another directory called *housing* with a file named **housing.csv** in it. We will use this file.

We call the function. Then, we will load the CSV file:

```python
import pandas as pd

def load_our_data(our_path=OUR_PATH):
    #setting the csv file path
    our_file_path = os.path.join(our_path, "housing.csv")
    #reading it using Pandas
    return pd.read_csv(our_file_path)

our_dataset = load_our_data()
```
First, we imported the `pandas` library, which loads the CSV data from the specified path, `our_file_path`.

You can view the data by:

```python
our_dataset.head()
```

```python
our_dataset.info()
```

#### Cleaning the data
The cleaning operation we will do here is filling empty numeric attributes with their median values. We will use the `SimpleImputer`, an estimator, to do that. But, first, we set the `strategy` to `median` to calculate the median value for each column's empty data.

```python 
from sklearn.impute import SimpleImputer
'''setting the `strategy` to `median` so that it calculates the median value for each column's empty data'''
imputer = SimpleImputer(strategy="median")
#removing the ocean_proximity attribute for it is textual
our_dataset_num = our_dataset.drop("ocean_proximity", axis=1)
#estimation using the fit method
imputer.fit(our_dataset_num)
#transforming using the learnedparameters
X = imputer.transform(our_dataset_num)
#setting the transformed dataset to a DataFrame
our_dataset_numeric = pd.DataFrame(X, columns=our_dataset_num.columns)
```

We dropped the *ocean_proximity* attribute because it's a text attribute that will handle in the next section.

The result produced is an array, so we converted it to a DataFrame.

#### Handling text and categorical attributes
We cannot handle text and numerical attributes similarly. So, for example, we cannot compute the median of text.

We will use a transformer for this called the `OrdinalEncoder.` It is chosen because it is more pipeline friendly. Moreover, it assigns numbers to the corresponding text attributes, e.g., 1 for NEAR and 2 for FAR.

```python
from sklearn.preprocessing import OrdinalEncoder
#selecting the textual attribute
our_text_cats = our_dataset[['ocean_proximity']]
our_encoder = OrdinalEncoder()
#transforming it
our_encoded_dataset = our_encoder.fit_transform(our_text_cats)
```

### Our Data Transformer
This is where we will create the custom transformer. We will be adding these three attributes:
- Rooms per household.
- Population per household.
- Bedrooms per household.

For our transformer to work smoothly with Scikit-Learn, we should have three methods:

1. `fit()`
2. `transform()`
3. `fit_transform`

> We include the three methods because Scikit-Learn is based on duck-typing. A class is also used because that makes it easier to include all the methods.

The last one is gotten automatically by using the `TransformerMixin` as a base class. The `BaseEstimator` lets us get the `set_params()` and `get_params()` methods that are helpful in hyperparameter tuning.

We get the three extra attributes in the `transform()` method by dividing appropriate attributes. An example would be the following: To get the rooms per household, we divide the number of rooms by the number of households.

```python
import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin
#initialising column numbers
rooms,  bedrooms, population, household = 3,4,5,6

class CustomTransformer(BaseEstimator, TransformerMixin):
    #the constructor
    '''setting the add_bedrooms_per_room to True helps us check if the hyperparameter is useful'''
    def __init__(self, add_bedrooms_per_room = True):
        self.add_bedrooms_per_room = add_bedrooms_per_room
    #estimator method
    def fit(self, X, y = None):
        return self
    #transfprmation
    def transform(self, X, y = None):
        #getting the three extra attributes by dividing appropriate attributes
        rooms_per_household = X[:, rooms] / X[:, household]
        population_per_household = X[:, population] / X[:, household]
        if self.add_bedrooms_per_room:
            bedrooms_per_room = X[:, bedrooms] / X[:, rooms]
            return np.c_[X, rooms_per_household, population_per_household, bedrooms_per_room]
        else:
            return np.c_[X, rooms_per_household, population_per_household]

attrib_adder = CustomTransformer()
our_extra_attributes = attrib_adder.transform(our_dataset.values)            
```

#### Our pipeline
We implement them in a pipeline for the data transformation steps to be executed in the correct order:

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
#the numeric attributes transformation pipeline
numeric_pipeline = Pipeline([
        ('imputer', SimpleImputer(strategy="median")),
        ('attribs_adder', CustomTransformer()),
    ])
numeric_attribs = list(our_dataset_numeric)
#the textual transformation pipeline
text_attribs = ["ocean_proximity"]
#setting the order of the two pipelines
our_full_pipeline = ColumnTransformer([
        ("numeric", numeric_pipeline, numeric_attribs),
        ("text", OrdinalEncoder(), text_attribs),
    ])
'''Finally, scaling the data and learning the scaled parameters from the pipeline
'''
our_dataset_prepared = full_pipeline.fit_transform(our_dataset)

```

The `ColumnTransformer` is used to transform columns separately and combine the features produced by each transformer to form a single feature space. The code can be run on Google Colab [here](https://colab.research.google.com/drive/1DVIh0LhGOU0rwVU2bbZw_VmjiXWV-daM?usp=sharing).

### Conclusion
We have seen the various steps for getting the data, transforming it, and then implementing all the steps in a pipeline. So I hope you got some insights.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
