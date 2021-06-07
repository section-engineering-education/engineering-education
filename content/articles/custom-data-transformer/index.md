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

def fetch_housing_data(our_data_url=OUR_DATA_URL, our_path=OUR_PATH):
      if not os.path.isdir(our_path):
            os.makedirs(our_path)
      zipfile_path = os.path.join(our_path, "housing.tgz")
      urllib.request.urlretrieve(our_path, zipfile_path)
      our_zip_file = tarfile.open(zipfile_path)
      our_zip_file.extractall(path=our_path)
      our_zip_file.close()

```

The code is for downloading the data from the url so we won't dwell so much on it.
We first import the `os` module for interacting with the Operating System. 
Thereafter, we import the `tarfile` module for acccessing and manipulating tar files.
Lastly, we import the `urllib` for using url manipulation functions.

