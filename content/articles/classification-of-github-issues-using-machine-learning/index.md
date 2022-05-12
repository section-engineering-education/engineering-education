---
layout: engineering-education
status: publish
published: true
url: /classification-of-github-issues-using-machine-learning/
title: Classification of GitHub Issues using Machine Learning
description: In this article, we will understand how to automatically classify GitHub labels based on GitHub issue title using machine learning.
author: charles-kariuki
date: 2022-01-11T00:00:00-04:03
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/classification-of-github-issues-using-machine-learning/hero.jpg
   alt: Classification of GitHub Issues using Machine Learning example image
---
Classification of [GitHub issues](https://github.com/features/issues) involves analyzing GitHub issues and assigning labels using models. In GitHub, we have in-built labels such as `bug`, `help wanted`, `revision needed`, `enhancement`, and `question`. We also have custom labels that one can create.
<!--more-->
These labels help reviewers to know the status and progress of a given open GitHub issue. This ensures that we have an enhanced collaboration.

In the classification of GitHub issues, we will train a machine learning model using a dataset that has different GitHub issues. The model will learn from the dataset and will be able to make predictions. Using this prediction, the model will be able to classify a given issue and assign the label.

For example, if an issue requires a revision or enhancement, it will assign either the `enhancement` or `revision needed` label.

In this tutorial, we will implement the model using the Scikit-Learn library. We will then test the model using the [Streamlit GitHub repository](https://github.com/streamlit/streamlit/issues) to see if the model can make accurate predictions.

### Table of contents
- [Prerequisites](#prerequisites)
- [GitHub issues dataset](#github-issues-dataset)
- [Dataset preparation](#dataset-preparation)
- [Adding column names](#adding-column-names)
- [Concat data frames](#concat-dataframes)
- [Convert dataset to CSV](#convert-dataset-to-csv)
- [Text cleaning](#text-cleaning)
- [Adding features and labels](#adding-features-and-labels)
- [Dataset splitting](#dataset-splitting)
- [Importing machine learning packages](#importing-machine-learning-packages)
- [Importing Pipeline package](#improrting-pipeline-package)
- [Pipeline stages](#pipeline-stages)
- [Pipeline fitting](#pipeline-fitting)
- [Calculating the accuracy score](#calculating-the-accuracy-score)
- [Making predictions](#making-predictions)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along easily, a reader should:
- Know [Python programming](/engineering-education/python-projects-for-beginners/).
- Have some knowledge about [machine learning models](/engineering-education/house-price-prediction/).
- Know some concepts of [natural language processing](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/).
- know how to use some of the [Scikit-learn](https://scikit-learn.org/stable/) algorithms in building machine learning models.
- Must use [Google Colab notebook](https://research.google.com/) for easy code reproducibility.

### GitHub issues dataset
We will use the GitHub issues dataset to train our model. The dataset contains GitHub issues from popular GitHub repositories with their respective labels. We need to download the dataset so that we can use it. 

You can view the dataset [here](https://tickettagger.blob.core.windows.net/datasets/dataset-labels-top3-30k-real.txt).

To download the dataset, run the following command:

```python
!wget https://tickettagger.blob.core.windows.net/datasets/dataset-labels-top3-30k-real.txt
```

> NOTE: We will be using [Google Colab](colab.research.google.com) to run the code snippets.

A snip of the downloaded dataset is shown below.

![Downloaded dataset](/engineering-education/classification-of-github-issues-using-machine-learning/downloaded-dataset.jpg)

From the image above, our dataset is in text format.

The dataset is unorganized and is not correctly formatted. Our model will not be able to easily understand the dataset. We, therefore, need to prepare the dataset and format it correctly before using it.

Before we can prepare our dataset, we will load the dataset into our working notebook.

#### Loading dataset
To load the dataset we will use the `pandas` library. Let's import `pandas` as shown:

```python
import pandas as pd
```

Pandas help to load the dataset and manipulate data.

To load the downloaded dataset, use the following code:

```python
df = pd.read_csv("dataset-labels-top3-30k-real.txt",header=None)
```

To see the structure of our dataset, use the following code:

```python
df.head()
```

The output of the dataset is shown below:

![Loaded dataset](/engineering-education/classification-of-github-issues-using-machine-learning/loaded-dataset.jpg)

Let's now prepare this dataset.

### Dataset preparation
We will start by extracting the labels from the dataset. This dataset has three labels: `enhancement`, `question`, and `bug`.

To extract the labels, use this code:

```python
df_new = df[0].str.split(r'(__label__enhancement)|(__label__bug)|(__label__question)',expand=True)
```

The code above will specify the three labels in our dataset. To see this new dataset with the labels, use this code.

```python
df_new.head()
```

The output is shown below:

![Dataset with labels](/engineering-education/classification-of-github-issues-using-machine-learning/dataset-with-labels.jpg)

From the image above, the dataset has columns numbered from `0` to `4`.

- The column numbered `1` represents GitHub issues with `__label__enhancement`. 
- The column numbered `2` represents GitHub issues with `__label__bug`. 
- The column numbered `3` represents GitHub issues with `__label__question`. 
- The column numbered `4` represents the actual GitHub issues (title of the issue).

#### Creating data frames
Further, we need to format the dataset by creating separate data frames for each label. This will ensure that we have three data frames. These data frames will organize our dataset into rows and columns.

To create the three data frames, run this code:

```python
enh_df = df_new[df_new[1] == '__label__enhancement'][[1,4]]
bug_df = df_new[df_new[2] == '__label__bug'][[2,4]]
question_df = df_new[df_new[3] == '__label__question'][[3,4]]
```

To have a look at the structure of the three data frames, use the following code:

##### `__label__enhancement` dataframe
```python
enh_df.head()
```

This code will output all GitHub issues with the `__label__enhancement` labels as shown below:

![Enhancement label](/engineering-education/classification-of-github-issues-using-machine-learning/enhancement-label.jpg)

##### `__label__bug` dataframe
```python
bug_df.head()
```

This code will output all GitHub issues with the `__label__bug` labels as shown below:

![Bug label](/engineering-education/classification-of-github-issues-using-machine-learning/bug-label.jpg)

##### `__label__question` dataframe
```python
question_df.head()
```

This code will output all GitHub issues with the `__label__question` labels as shown below:

![Question label](/engineering-education/classification-of-github-issues-using-machine-learning/question-label.jpg)

The next step in the dataset preparation process is to add descriptive columns names.

#### Adding column names
Currently, the columns of the data frames are numbered. Instead, we need to add descriptive column names that are more human-readable.

We have two columns for each data frame where the first column must be named `label` and the second column named as `description`.

The `label` column represents the labels, while the `description` column represents the GitHub issues.

To add the column names, use this code:

```python
enh_df.columns = ['label','description']
bug_df.columns = ['label','description']
question_df.columns = ['label','description']
```

We have prepared each data frame separately and formatted them correctly. We can now concatenate the three data frames together. This ensures we have a single data frame that will be easy for the model to use. The single data frame will be correctly labeled and easy to manipulate. 

#### Concat dataframes
To contact the data frames, use this code:

```python
df = pd.concat([enh_df, bug_df, question_df])
```

To see the structure of this new dataset, use this code:

```python
df.head()
```

The output is shown below:

![Concatenated dataset](/engineering-education/classification-of-github-issues-using-machine-learning/concatenated-dataset.jpg)

We also need to remove the prefix `__label__` from the labels. This makes the `label` column more readable. 

To remove prefix `__label__`, use this code:

```python
df['label'] = df['label'].str.replace('__label__', '')
```

The new dataset with the removed `__label__`, run this code:

```python
df.head()
```

The output is shown below:

![New dataset](/engineering-education/classification-of-github-issues-using-machine-learning/new-dataset.jpg)

Finally, we will convert the dataset into CSV format from text format.

#### Convert dataset to CSV
The comma-separated values (CSV) dataset is easy to use and understand by the model.

```python
df.to_csv("github-issues-dataset-labels.csv")
```

The code will convert our dataset into CSV format. We now need to clean the dataset by removing stopwords and converting the text into lower case.

### Text cleaning
Text cleaning will involve removing stop words and converting the text into lower case.

Stopwords are the commonly used words in a given language. These words being very common, they carry little information during model training. Removing the stopwords enables the model to focus on the most important words adding value to the model during training.

We convert all the text to lowercase to bring uniformity to them. To perform text cleaning we will use `NeatText`.

`NeatText` is a Python library that has in-built functions that help in text cleaning. Let's install `NeatText` as shown:

```python
!pip install neattext
```

After installing `NeatText`, let's import the functions that will be used for text cleaning using the following code:

```python
import neattext.functions as nfx
```

To remove the stopwords and convert the text into lower case, use the following code:

```python
df['description_clean'] = df['description'].apply(lambda x: nfx.remove_stopwords(str(x).lower()))
```

From the code above, the `nfx.remove_stopwords` method will be used to remove the stopwords. The `lower` method will be used to convert the text into lower case. This dataset is now ready for use.

### Adding features and labels
Another crucial step in machine learning is to add features and labels to our dataset.

Features are all the columns that are used as input for our model during training. Labels are the columns that are used as the output of the model during prediction.

Our feature will be the `description_clean` column and the label will be the `label` column.

```python
Xfeatures = df['description_clean']
ylabels = df['label']
```

The code above will add the features and labels. The next step is to split our dataset into two. This will ensure we have one set for training and another set for testing.

### Dataset splitting
To split our dataset, let's import the machine learning package that will be used for dataset splitting.

```python
from sklearn.model_selection import train_test_split
```

Let's use `train_test_split` to split our dataset into two.

```python
x_train,x_test,y_train,y_test = train_test_split(Xfeatures,ylabels,test_size=0.3,random_state=42)
```

In the code above, we have specified `test_size=0.3`. This is the ratio used to split our dataset with  `70%` of the dataset used for training and `30%` used for testing.

After splitting the dataset, we can start building our model. To build our model, let's import the machine learning packages that we will use.

### Importing machine learning packages
Let's import all the important machine learning packages using the following code:

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import CountVectorizer
```

Let's explore the function of each imported package as follows:

#### DecisionTreeClassifier
This is a [Scikit-learn](https://scikit-learn.org/stable/) algorithm that we will use to build our GitHub issue classification model.

We have chosen to use this algorithm because it will balance our dataset improving the model's performance. Generally, the models built using the `DecisionTreeClassifier` algorithm have a higher accuracy score.

#### accuracy_score
We use this package to get the accuracy score of the model after training. This is the probability of the model making an accurate prediction.

#### CountVectorizer
This package enables machine learning models to understand the text. Machines learning models have a problem of understanding and using raw texts. However, machine learning models work well with numbers.

`CountVectorizer` converts the raw text into vectors of numbers. It ensures that the converted vectors of numbers represent the original text.

To further understand how the `CountVectorizer` work behind the scene to convert the raw text into vectors of numbers, click [here](https://towardsdatascience.com/basics-of-countvectorizer-e26677900f9c).

We will use these packages to build our model. To make the process of building our machine learning model easier and faster, we will use the `Pipeline` package.

The `Pipeline` package automates all the stages and processes used in building the model. To use the `Pipeline` package, we will import it from [Scikit-learn](https://scikit-learn.org/stable/).

### Importing Pipeline package
We import the package using the following code:

```python
from sklearn.pipeline import Pipeline
```

To automate the process of a model building using this `Pipeline` package, we initialize all the stages in building the model. After initializing the stages, they will be automated.

We have two stages as follows:
1. `CountVectorizer` converting the input text to vectors of numbers.
2. Using the `DecisionTreeClassifier` algorithm to train the model.

We can now initialize the two stages using the following code:

#### Pipeline stages
```python
pipe_dt = Pipeline(steps=[('cv',CountVectorizer()),('dt',DecisionTreeClassifier())])
```

The code above has initialized the two stages in sequential order. After initializing the two stages, we can fit this pipeline onto our train set dataset. The pipeline will learn from the train set dataset and gain useful insight.

#### Pipeline fitting
We fit the pipeline as follows:

```python
pipe_nb.fit(x_train,y_train)
```

This process will train our model and produce the following output:

![Model output](/engineering-education/classification-of-github-issues-using-machine-learning/model-output.jpg)

Our model is now trained using the machine learning pipeline. We can now calculate the accuracy score of this model.

### Calculating the accuracy score
The accuracy score represents the probability of the model making an accurate prediction. The higher the accuracy score, the higher chance of the model to make an accurate prediction.

Let's calculate the accuracy score using the following code:

```python
pipe_dt.score(x_test,y_test)
```

After running this code, the accuracy score is shown in the output below:

```bash
0.866
```

This represents `86.6%`. Using this accuracy score, our model has a higher chance of making accurate predictions. We will use this model to make predictions.

### Making predictions
In making predictions, we test our model's ability to classify GitHub issues using the three labels. The model will be used to predict if a given GitHub issue is an `enhancement`, `bug`, or `question`.

To test the model, we will use the [Streamlit](https://github.com/streamlit/streamlit/issues) GitHub repository to see if the model can make accurate predictions. This repository has different issues that our model can predict.

We can extract some of the issues (issue title) from the repository for the model to make predictions.

```python
issue1 = "st.file_uploader returns HTTP code 400 with invalid session_id when deployed on Kubernetes"
issue2 = "Cannot set Plotly theme because Streamlit overrides user values"
```

After extracting the two features, let's use the model to make the predictions. The model will analyze these issues and provide the labels for each issue.

We will use the following code to predict the first issue.

```python
pipe_dt.predict([issue1])
```

The prediction output is shown below:

```bash
array(['bug'], dtype=object)
```

The model has correctly predicted the issue as a `bug` from the [Streamlit](https://github.com/streamlit/streamlit/issues) GitHub repository.

Let's make another prediction.

```python
pipe_dt.predict([issue2])
```

The prediction output is shown below:

```bash
array(['enhancement'], dtype=object)
```

The model has correctly predicted the issue as an `enhancement`.

Using these two predictions, our model can make accurate predictions. This model can be further deployed and used in production to classify GitHub issues.

### Conclusion
In this tutorial, we have learned how to classify GitHub issues using machine learning. This involves analyzing open GitHub issues using models and assigning labels.

We started with dataset preparation ensuring we correctly format our dataset. After this stage, we cleaned the dataset by removing stopwords and converting the text into lower case.

Finally, we used the clean dataset to build our model. After training the model, we used the model to make predictions. Our model was able to predict if a given GitHub issue is an `enhancement`, `bug`, or `question`. This model is ready to be deployed and used in production.

To get the GitHub issues classification model, click [here.](https://colab.research.google.com/drive/1H9ZSa3S6E0inX8zDK9LxDdFbeQ2yNXsr?usp=sharing)

### References
- [Google Colab notebook](https://colab.research.google.com/drive/1H9ZSa3S6E0inX8zDK9LxDdFbeQ2yNXsr?usp=sharing)
- [Streamlit GitHub repository](https://github.com/streamlit/streamlit/issues)
- [Scikit-learn official documentation](https://scikit-learn.org/stable/)
- [Text cleaning with NeatText](https://pypi.org/project/neattext/)
- [GH Archive](https://www.gharchive.org/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)