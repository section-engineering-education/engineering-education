---
layout: engineering-education
status: publish
published: true
url: /snorkel-python-for-labeling-datasets-programmatically/
title: Snorkel Python for Labelling Datasets Programmatically
description: Snorkel is a Python library that is used for data labelling. In this article, we will build an application that labels sentences as a question or not a question using Snorkel.
author: charles-kariuki
date: 2021-11-11T00:00:00-10:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/snorkel-python-for-labeling-datasets-programmatically/hero.jpg
   alt: Snorkel python for labelling datasets example image
---
Snorkel is a Python library that is used for data labelling. It programmatically manages and builds training datasets without manual labelling. In machine learning, labels are the target or the output variable in a dataset. This is what the model is attempting to predict.

Instead of humans labelling large datasets manually, Snorkel assigns labels to the extensive training data automatically. This is done using a set of user rules, labelling functions, and other in-built techniques.

Snorkel requires users to come up with functions that contain explicit rules. We will use these rules to label the unlabeled data.

In this tutorial, we will have an unlabeled dataset that contains a list of sentences. The list of sentences is made up of questions, while others are general statements.

This tutorial aims to label a sentence as either a question or not a question. If a sentence is a question, it is labelled `1`, and a non-question sentence(general statement) is labelled `-1`. All this will be done programmatically using Snorkel.

### Table of contents

- [Prerequisites](#prerequisites)
- [How to install Snorkel Python](#how-to-install-snorkel-python)
- [Unlabeled dataset](#unlabeled-dataset)
- [Load the dataset](#load-the-dataset)
- [Convert to a data frame](#convert-to-a-data-frame)
- [Dataset splitting](#dataset-splitting)
- [Define our labeling functions](#define-our-labeling-functions)
- [Rules](#rules)
- [Keyword lookup function](#keyword-lookup-function)
- [Pattern lookup function](#pattern-lookup-function)
- [A second pattern lookup function](#a-second-pattern-lookup-function)
- [Combining the labeling functions](#combining-the-labeling-functions)
- [Building the labeling model](#building-the-labeling-model)
- [Adding labels to the unlabeled dataset](#adding-labels-to-the-unlabeled-dataset)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

To follow along easily, the reader should:

- Be familiar with [Python programming.](/engineering-education/python-projects-for-beginners/)
- Know about [machine learning modelling.](engineering-education/house-price-prediction/)
- Know how to use [Google Colab notebooks.](https://colab.research.google.com)
- Have some knowledge of [Pandas.](https://pandas.pydata.org/)
- Be familiar with [Scikit-learn.](https://scikit-learn.org/stable/)

### How to install Snorkel Python

We install Snorkel Python using the following command.

```python
!pip install snorkel
```

After installing Snorkel, let's start working with our unlabeled dataset.

### Unlabeled dataset

Our unlabeled dataset is in text file format.

A snip of our dataset is shown below.
![Unlabeled dataset](/engineering-education/snorkel-python-for-labeling-datasets-programmatically/dataset-snip.jpg)

To download this text file, click [here.](https://drive.google.com/file/d/1H7FOMagrtQP1KHzvY93sGeYWe2Ro-U1E/view?usp=sharing)

### Load the dataset

We load this dataset using Pandas. Pandas is a Python package that is used for data manipulation and analysis.

It also allows us to import data from different file formats such as CSV files, text files, JSON files, and SQL files.

Let's import Pandas.

```python
import pandas as pd
```

Let's load our dataset.

```python
data = pd.read_table('unlabeled-dataset.txt')
```

Let's see if our dataset is loaded.

To see if the dataset is loaded in our machine, use this command.

```python
data
```

The output is shown below.

![Loaded dataset](/engineering-education/snorkel-python-for-labeling-datasets-programmatically/loaded-dataset.jpg)

Let's shuffle our dataset. Shuffling our dataset ensures that our dataset is properly reorganized and formatted. This reduces bias.

To shuffle our dataset, we use a Python package called `random`.

Let's import the `random` package.

```python
import random
```

Let's now shuffle our dataset using the `random.shuffle()` method.

```python
random.shuffle(data)
```

To see the output after the dataset is shuffled, run this command.

```python
data
```

The output below shows a dataset that is adequately organized and formatted.

![Loaded dataset](/engineering-education/snorkel-python-for-labeling-datasets-programmatically/shuffled-dataset.jpg)

### Convert to a data frame

A data frame is the representation of data in rows and columns. When data is represented in this form, it is easy for the model to understand and use.

Our dataset will have one column. It will have a `sentences` column, which contains all the unlabeled sentences.

Let's create this column.

```python
df = pd.DataFrame({'sentences':data})
```

Let's now see our dataset with the `sentences` column.

```python
df.head()
```

The output is as shown in the image below.

![Dataset structure](/engineering-education/snorkel-python-for-labeling-datasets-programmatically/dataset-structure.jpg)

Let's now split our dataset.

### Dataset splitting

We split our dataset into two sets, train set and test set. The train set is used during the training phase so that model can learn from it.

The test set is used to evaluate the general performance of the model.
It also checks if the model can make accurate predictions.

Let's import the required method to split our dataset.

```python
from sklearn.model_selection import train_test_split
```

`train_test_split` will be used to split our dataset.

```python
df_train,df_test = train_test_split(df,train_size=0.5)
```

In the code above, we have specified the `train_size=0.5`. This implies that `50%` of the dataset will be used for training, and the remaining `50%` will be used for testing.

Let's check the total number of sentences in our test set.

```python
print(df_train.shape)
```

The output is shown below.

```bash
(44, 1)
```

This shows we have a total of `44` sentences in our test set and `1` column.

### Define our labelling functions

Labelling functions define the rules that the labelling model uses. These rules are used to predict the label of unlabeled data.

Let's import the method that will allow us to come up with labelling functions.

```python
from snorkel.labeling import labeling_function
```

So that we can come up with an accurate labelling model, we need to come up with at least three labelling functions.

The imported `labeling_function` method allows us to create three labeling functions.

To come up with the best labeling functions, we need to know how to label the dataset.

In this case, we want to label our dataset with two labels as follows. A sentence can be labelled as either a question or a general statement. If the sentence is a question, it is labelled `1`, and a general statement is labelled `-1`.

The following are rules for a statement to qualify to be a question.

### Rules

- A sentence should start with the following phrases: `why`, `what`, `when`, `who`, `where`, and `how`.
- A sentence should end with a question mark, `?`.

We then need to assign constants for our labels.

#### Constants for our labels

We will use this to label the sentences. For example, `QUESTION` is used to label sentences that qualify as questions.
`ABSTAIN` will be used to label the other sentences.

```python
QUESTION = 1
ABSTAIN = -1
```

Using the rules above, we can now come up with the labelling functions.

### Keyword lookup function

This function is used to check for phrases at the beginning of sentences.
These phrases are as follows: `why`, `what`, `when`, `who`, `where`, and `how`.

If this rule is met, the sentence is labelled as `QUESTION = 1`. If it's not met, the sentence is labelled `ABSTAIN = -1`.

```python
@labeling_function()
def lf_keyword_lookup(x):
  keywords = ["why","what","when","who","where","how"]
  return QUESTION if any(word in x.sentences.lower() for word in keywords) else ABSTAIN
```

We have defined our function as `lf_keyword_lookup(x)` with the help of the `@labeling_function()` decorator.

We then pass our rule. Finally, we loop through our `sentences` in the dataset to see if the condition is met.

Let's go to the second labeling function.

### Pattern lookup function

This function checks if the sentence contains the phrase `what` at the beginning.

It also checks if the sentence ends with a question mark, `?`.

To find `?` in a sentence, we use Python [regular expression](https://docs.python.org/3/library/re.html).

It searches through the sentence patterns until it finds a `?`.

For further reading on Python regular expression, read this [documentation](https://docs.python.org/3/library/re.html).

```python
import re
@labeling_function()
def lf_regex_contains_what(x):
  return QUESTION if re.search(r"what.*?",x.sentences,flags=re.I) else ABSTAIN
```

First, we have import `re`, which represents the regular expression. Then, we use the `re.search()` method to search through the sentences to find instances of the phrase `what` and the `?`.

If the condtion is met the sentence is labeled `QUESTION = 1` and if not met it's labeled `ABSTAIN = -1`.

Let's look at the last labelling, which will also use a pattern lookup function.

### A second pattern lookup function

This function will also use Python regular expression. However, it only searches for question marks, `?` in the sentences.

```python
import re
@labeling_function()
def lf_regex_contains_question_mark(x):
  return QUESTION if re.search(r".*?",x.sentences,flags=re.I) else ABSTAIN
```

We now need to apply all these labelling functions to our train set dataset.

### Combining the labeling functions

First, we need to combine all these labelling functions and save them into a single variable, `lfs`. When they are combined, they build an optimal labelling model.

```python
lfs = [lf_keyword_lookup,lf_regex_contains_what,lf_regex_contains_question_mark]
```

We then import the `PandasLFApplier` method. This is a `Pandas` method used to apply more than one labelling function to the dataset.

```python
from snorkel.labeling import PandasLFApplier
```

Let's pass our combined labelling function, `lfs` into the `PandasLFApplier` method.

```python
applier = PandasLFApplier(lfs=lfs)
```

We then apply all the combined labelling functions to the training dataset. Finally, the training dataset is saved in a variable called `df_train`.

The labeling functions learn patterns in the dataset. This process is known as pattern recognition.

```python
L_train = applier.apply(df=df_train)
```

Now that we have applied all the three labelling functions in our `df_train`, it's time to build our dataset.

### Building the labeling model

We need to import the method that we will use to build our model.

```python
from snorkel.labeling.model import LabelModel
```

The `LabelModel` method will be used to build our model.

Let's now build the model.

```python
label_model = LabelModel(cardinality=2,verbose=True)
label_model.fit(L_train=L_train,n_epochs=500,log_freq=100,seed=123)
```

The `LabelModel` uses the `fit()` method to fit the model into the `L_train`. `L_train` contains the labeling functions and the training dataset.

During this phase, the model gains knowledge through training. It eventually uses the knowledge gained to make predictions.

We also use the following parameters.

- `n_epochs=500` - The number of iterations the model passes through the `L_train`.

- `cardinality=2` - This shows the possible labels outputs. In our case, we have `1` and `-1`.
- `verbose=True` - This allows us to use regular expressions when searching for `?`.
- `log_freq=100` - It checks the frequency in which specific phrases are distributed in the dataset.
- `seed=123` - Random numbers that our model will use during model training.

After 500 epochs, we would have successfully trained our model.

Let's now use this model to label the dataset.

### Adding labels to the unlabeled dataset

We use this model to add labels to our dataset. Our two labels are: `QUESTION = 1` and `ABSTAIN = -1`.

We use the `predict` method to make the predictions. This method is used to classify the sentences as either a question or not.

```python
df_train['Labels'] = label_model.predict(L=L_train,tie_break_policy="abstain")
```

After running the code above, the model should be able to classify the various sentences.

Let's see the prediction results.

![Prediction results](/engineering-education/snorkel-python-for-labeling-datasets-programmatically/prediction-results.jpg)

The image above shows that the sentence `What's your favorite ice cream topping?` was labelled as `1`. Therefore, this represents `QUESTION`.

Another sentence is, `There is no Ctrl-Z in life.` This was labelled `-1`, which is a general statement.

Using the two examples above, we can see that our model could make the correct predictions. Furthermore, this shows that our model can successfully assign labels to the unlabeled dataset.

### Conclusion

In this tutorial, we have learned how to label a dataset programmatically using Snorkel. First, we started with data pre-processing. This involves cleaning the dataset and adding columns to our dataset.

From there, we split our dataset into two sets so that one set can be used for training and the other one for testing. We then created a labelling function that contains essential rules to be used by the model.

After successfully applying all the labelling functions to our dataset, we started to build our model. In the end, we had a model that could classify various sentences into questions or general statements.

Using this tutorial, a reader should be able to label a dataset programmatically using Snorkel.

To get the notebook for this tutorial, click [here.](https://colab.research.google.com/drive/1fY85B0_JDogI4_d2isWBEJAbfQyoyfsl?usp=sharing)

### References

- [Google Colab link](https://colab.research.google.com/drive/1fY85B0_JDogI4_d2isWBEJAbfQyoyfsl?usp=sharing)
- [Snorkel documentation](https://www.snorkel.org/blog/hello-world-v-0-9)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Intoduction to labeling functions](https://www.snorkel.org/use-cases/01-spam-tutorial)
- [Python regular expressions](https://docs.python.org/3/library/re.html)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
