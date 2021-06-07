### Creating a Custom Data Transformer using Scikit-Learn

### Introduction

In machine learning, a data transformer is a tool used to make a dataset fit for the training process. Scikit-Learn is a Python library containing methods that help us achieve ou r machine learning process faster. Scikit-Learn provides built-in methods for data preparation before the data is fed into a training model. However, as a data scientist, you may need to perform more custom cleanup processes or adding more attributes that may improve your model's performance. To do that, you will need to create your own custom transformer for your data.

In this article, we will look at how to do that.

### Prerequisites

1. A good understanding of the Python language.
2. Familiarity with the Numpy and Pandas library.
3. A basic knowledge in using Jupyter Notebooks or any other notebook-based technology e.g Google Colabs.
4. Python and the above mentioned libraries installed.

Let's jump into it.

### Getting Started

#### Loading the data

 We will get our dataset from this [repository](https://raw.githubusercontent.com/ageron/handson-ml/master/) using the following script.

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
      zipfile_path = os.path.join(our_path, "housing.tgz")
      urllib.request.urlretrieve(our_path, zipfile_path)
      our_zip_file = tarfile.open(zipfile_path)
      our_zip_file.extractall(path=our_path)
      our_zip_file.close()

get_data()
```

The code is for downloading the data from the url so we won't dwell so much on it.
We first import the `os` module for interacting with the Operating System. Thereafter, we import the `tarfile` module for acccessing and manipulating tar files. Lastly, we import the `urllib` for using url manipulation functions.
 
We then set our paths appropriately. In the `get_data()` function, we make a directory for our data, retrieve it from the url then extracting and storing it. So, in youir workijng directory, you will notice a directory called *datasets* created. On opening it, you will get another directory called *housing* with a file named **housing.csv** in it. We will use this file.

We call the function.

We then have this code for loading the csv file.

```python
import pandas as pd

def load_our_data(our_path=OUR_PATH):
    our_file_path = os.path.join(our_path, "housing.csv")
    return pd.read_csv(our_file_path)

our_dataset = load_our_data()

```
We first import the `pandas` library  which later loads the csv data from the specified path, `our_file_path`.

#### Cleaning the data

The cleaning operation we will do here is filling empty numeric attributes with their median values. We will use the `SimpleImputer`, an estimator, to do that.

```python 
from sklearn.impute import SimpleImputer

imputer = SimpleImputer(strategy="median")

our_dataset_num = our_dataset.drop("ocean_proximity", axis=1)
imputer.fit(our_dataset_num)
X = imputer.transform(our_dataset_num)
our_dataset_num = pd.DataFrame(X, columns=our_dataset_num.columns)

```

We drop the *ocean_proximity* attribute because it's a text attribute which will handle in the next section.

The result produced is an array so we convert it to a DataFrame.

#### Handling text and categorical attributes

We cannot handle text and numerical attributes in the same manner e.g we cannot compute the median of text.

We will use a transformer for this called the `OrdinalEncoder`. `OrdinalEncoder` is chosen because it is more pipeline friendly.

```python
from sklearn.preprocessing import OrdinalEncoder

our_text_cats = our_dataset[['ocean_proximity']]
our_encoder = OrdinalEncoder()
our_encoded_dataset = our_encoder.fit_transform(our_text_cats)

```

### Our transformer

This is where we will create the custom transformer. We will be adding these three attributes:
- Rooms per household
- Population per household
- Bedrooms per household

```python

import numpy as np
from sklearn.base import BaseEstimator, TransformerMixin

rooms,  bedrooms, population, household = 3,4,5,6

class CustomTransformer(BaseEstimator, TransformerMixin):
    def __init__(self, add_bedrooms_per_room = True):
        self.add_bedrooms_per_room = add_bedrooms_per_room
        
    def fit(self, X, y = None):
        return self
    
    def transform(self, X, y = None):
        rooms_per_household = X[:, rooms] / X[:, household]
        population_per_household = X[:, population] / X[:, household]
        if self.add_bedrooms_per_room:
            bedrooms_per_room = X[:, bedrooms] / X[:, rooms]
            return np.c_[X, rooms_per_household, population_per_household, bedrooms_per_room]
        else:
            return np.c_[X, rooms_per_household, population_per_household]

attrib_adder = CustomTransformer(add_bedrooms_per_room=False)
our_extra_attributes = attrib_adder.transform(our_dataset.values            

```

For our transformer to work smoothly with Scikit-Learn, we should have 3 methods:

1. `fit()`
2. `transform()`
3. `fit_transform`

The last one is gotten automatically by using the `TransformerMixin` as a base class. The `BaseEstimator` lets us get the `set_params()` and `get_params()` methods that are helpful in hyperparameter tuning.

We get the three extra attributes in the `transform()` method by dividing appropriate attributes e.g to get the rooms per household, we divide the number of rooms by the number of households.

#### Our pipeline

