---
layout: engineering-education
status: publish
published: true
url: /autonlp-using-autoviml-library-for-natural-language-processing/
title: AutoNLP using AutoVIML library for Natural Language Processing
description: This tutorial will show a reader how to build an Amazon product review model using AutoVIML. The model will classify customers reviews as either positive or negative.
author: james-omina
date: 2022-02-21T00:00:00-11:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/hero.jpg 
    alt: AutoNLP AutoVIML Natural Language Processing example image 
---
Natural language processing enables machines to understand texts and spoken words. This process is usually hectic and has many text preprocessing activities such as, [stemming](https://en.wikipedia.org/wiki/Stemming), [lemmatization](https://en.wikipedia.org/wiki/Lemmatisation), [removing stopwords](https://en.wikipedia.org/wiki/Stop_word), [tokenization](https://www.geeksforgeeks.org/nlp-how-tokenizing-text-sentence-words-works/) and [vectorization](https://neptune.ai/blog/vectorization-techniques-in-nlp-guide).
<!--more-->
AutoVIML is used to simplify natural language processing. AutoVIML is an AutoNLP library that automates the process of natural learning processing using a machine learning [pipeline](https://valohai.com/machine-learning-pipeline/). 

Natural language processing involves a number of steps. The pipeline then automates all the initialized steps in sequential order. The output of the pipeline is an optimized model.

In this tutorial, we will build an Amazon product review model using AutoVIML. The model classifies customers reviews as either positive or negative.

### Table of contents
- [Prerequisites](#prerequisites)
- [Installing AutoVIML](#installing-autoviml)
- [AutoVIML key features](#autoviml-key-features)
- [Dataset used](#dataset-used)
- [Convert dataset to array](#convert-dataset-to-array)
- [Extracting important columns](#extracting-important-columns)
- [Creating a data frame](#creating-a-data-frame)
- [Columns datatypes](#columns-datatypes)
- [Adding the target column](#adding-the-target-column)
- [Dataset splitting](#dataset-splitting)
- [Using AutoVIML](#using-autoviml)
- [Input and output columns](#input-and-output-columns)
- [Using the imported function](#using-the-imported-function)
- [Vectorization process](#vectorization-process)
- [The best algorithm and machine learning pipeline](#the-best-algorithm-and-machine-learning-pipeline)
- [Making predictions](#making-predictions)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To easily understand the concepts explained in this tutorial, a reader should:

- Know [Python programming](/engineering-education/python-projects-for-beginners/).
- Understand the steps involved in [natural language processing.](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn)
- Be able to build a [machine learning model.](/engineering-education/house-price-prediction/)
- Have some data analysis skills using [Pandas](https://pandas.pydata.org/) and [NumPy](https://numpy.org/).

> NOTE: The reader must use [Google Colab notebook](https://research.google.com/). This will speed up the AutoVIML process.

### Installing AutoVIML
To install AutoVIML, run this command:

```bash
!pip install autoviml
```

#### AutoVIML key features
The key AutoVIML features are as follows:

- Automatic dataset preprocessing: AutoVIML will automatically perform the dataset preprocessing. This ensures we have a clean dataset that is ready for us.

- Automatic selection of the best algorithm: We have many algorithms that can be used for model training. AutoVIML searches through all the algorithms and selects the algorithm that produces the best results.

- Automatic model fine-tuning: AutoVIML will automatically fine-tune the model to meet the developer's needs and specifications.

- Automatic model hyper-parameters optimization: AutoVIML automatically adjusts the model's parameters to give an optimized solution.

- Automatic model deployment and predictions: AutoVIML automatically deploys the model to make predictions.

These features are essential and help in producing an optimized model. As mentioned earlier, all the automation process is done using machine learning pipelines. An example of a pipeline workflow is as shown below:

![Pipeline steps](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/pipeline-steps.jpg)

*[Image source: Algorithmia](https://algorithmia.com/blog/wp-content/uploads/2020/09/ML-Pipeline-1_A-2048x799.jpg)*

We will follow this workflow and build our model.

### Dataset used
We will use the dataset from Amazon. The dataset contains customers' reviews of personal care appliances. We will download the dataset from `tensorflow_datasets`. `tensorflow_datasets` is a TensorFlow repository that contains a collection of ready-to-use datasets.

Lets import the `tensorflow_datasets` TensorFlow package.

```python
import tensorflow_datasets as tfds
```

To download the dataset from `tensorflow_datasets`, use the following code:

```python
dataset, info = tfds.load('amazon_us_reviews/Personal_Care_Appliances_v1_00', with_info=True, batch_size=-1)
```

From the code above, the `tfds.load` method will load the dataset from `tensorflow_datasets`. We save the Amazon dataset into a new variable using the following code:

```python
train_dataset = dataset['train']
```

To see the information available in our dataset, run this command:

```python
info
```

The output is shown below:

![Dataset information](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/dataset-information.jpg)

From the image above, the dataset has over 130 million customer reviews collected by researchers over the years. The dataset has different columns. We are interested in the following columns: `helpful_votes`, `review_headline`, `review_body` and `star_rating`. 

- `star_rating`: It shows the 1-5 star rating of the product purchased.

- `helpful_votes`: It shows the number of votes for a purchased product.

- `review_headline`: It shows the title product review.

- `review_body`: It shows a detailed description of the review.

After loading the dataset, we need to convert the dataset into a NumPy array. We perform this process using the NumPy library. A NumPy array is stored at one continuous place in memory so that a model can access and manipulate it easily.

#### Convert dataset to array
We import the NumPy package using the following code:

```python
import numpy as np
```

To convert the dataset, use this code:

```python
dataset=tfds.as_numpy(train_dataset)
```

To see the structure of the new dataset, use this code:

```python
dataset
```

The output is shown below:

![Dataset array](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/dataset-array.jpg)

From the image above, our dataset is in an array format. The next step is to extract the four important columns from our dataset.

### Extracting important columns
To extract the important columns, use this code:

```python
helpful_votes=dataset['data']['helpful_votes']
review_headline=dataset['data']['review_headline']
review_body=dataset['data']['review_body']
rating=dataset['data']['star_rating']
```

The code above will enable us to use these four columns as inputs for our model during training. Next, we will create a data frame for our dataset. A data frame neatly organizes a dataset into columns and rows.

### Creating a data frame
To create a data frame, we will use the Pandas library. Let's import the Pandas library.

```python
import pandas as pd
```

The data frame is then created using the following code:

```python
reviews_df=pd.DataFrame(np.hstack((helpful_votes[:,None],review_headline[:,None],review_body[:,None],rating[:,None])),columns=['votes','headline','reviews','rating'])
```

The code above will create a data frame. It also assigns columns names as `votes`, `headline`, `reviews`, and `rating`. We need to specify the data types of these four columns.

#### Columns datatypes
Our columns will have the following data types:

```python
convert_dict = {'votes': int, 
 'headline': str,
 'reviews': str,
 'rating': int
               }
```

We then save the data types into a new variable. 

```python
reviews_df = reviews_df.astype(convert_dict) 
```

To see the structure of our data frame, run this command.

```python
reviews_df
```

The output is shown below:

![Dataframe structure](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/dataframe-structure.jpg)

From the image above, our dataset is neatly organized into rows and columns. It has four columns and 85981 rows.

### Adding the target column
We need to add a target column. The target column represents the model output after making a prediction. The model classifies customers reviews as either positive or negative. Positive reviews are represented by `1`, while negative reviews are represented by `0`.

For a review to be positive, the `star_rating` should be greater than 4. If the `star_rating` is less than 4, the review is negative. To add the target column, we will use this logic as follows:

```python
reviews_df["target"] = reviews_df["rating"].apply(lambda x: 1 if x>= 4 else 0) 
```

This code will add the target column. It will ensure that if the `rating` is greater than `4`, the review is labeled `1`. If the `rating` is less than `4`, the review is labeled `0`.

To see our newly added target column, use this code:

```python
reviews_df
```

The output is shown below:

![Target column](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/target-column.jpg)

The image above shows the dataset with the added target column. The target column is either labeled `1` or `0`.

Our dataset is neatly and correctly formatted. We now need to split our dataset into two sets.

### Dataset splitting
We will split our dataset into two sets. We use one set to train the model, while the other set to test the model. 

Let's import the package used for dataset splitting.

```python
from sklearn.model_selection import train_test_split
```

To split the dataset, use this code:

```python
train, test = train_test_split(reviews_df, test_size=0.25)
```

From the code above, we have used `test_size=0.25`. It is the ratio used for dataset splitting. We use 75% of the data for training and 25% for testing.

After splitting the dataset, let's now use AutoVIML to automate natural language processing.

### Using AutoVIML
AutoVIML has in-built functions that automate natural language processing. We will use the `Auto_NLP` function, which is imported from AutoVIML.

To import `Auto_NLP`, use this code:

```python
from autoviml.Auto_NLP import Auto_NLP
```

After importing `Auto_NLP`, we will specify the input column and output column.

#### Input and output columns
The input column will feed the model with data during training. The output column will show the model output after making a prediction.

```python
nlp_column = 'reviews'
target = 'target'
```

The input column is the `reviews` column, while the output column is the `target` column.

Let's now use `Auto_NLP` to automate natural language processing steps.

### Using the imported function
To use the `Auto_NLP` function, run this code:

```python
nlp_transformer= Auto_NLP(
                nlp_column, train, test, target, score_type='balanced_accuracy',
 modeltype='Classification',top_num_features=50, verbose=2,
 build_model=True)
```

The `Auto_NLP` function has the following important parameters:

- `nlp_column`: The model uses this column as the input column. It feeds the model with data during training.

- `target`: It shows the model's output after making a prediction.

- `train`: It is the split dataset that the model uses during training.

- `test`: It is the split dataset that the model uses during testing.

- `score_type='balanced_accuracy'`: It calculates the accuracy score for the model.

- `modeltype='Classification'`: It specifies the type of model we are building. We are building a classification model.

- `top_num_features=50`: It specifies the number of important features the model uses during training. Features are the important attributes found in the dataset.

- `build_model=True`: It tells the `Auto_NLP` function to build the model. `Auto_NLP` function will then use the key, AutoVIML features, to produce an optimized model.

After running this code, the process will produce outputs. The outputs show the model-building progress. These outputs will also show the best parameters and algorithms the model uses during training.

#### First output
The first output is shown below:

![Output 1](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/nltk-download.jpg)

In the first output, the function dowloads the Natural Language Toolkit (NLTK). [Natural Language Toolkit](https://www.nltk.org/) is used to perform text-prepocessing. NLTK will perform tasks such as [stemming](https://en.wikipedia.org/wiki/Stemming), [lemmatization](https://en.wikipedia.org/wiki/Lemmatisation), [removing stopwords](https://en.wikipedia.org/wiki/Stop_word), [tokenization](https://www.geeksforgeeks.org/nlp-how-tokenizing-text-sentence-words-works/) and [vectorization.](https://neptune.ai/blog/vectorization-techniques-in-nlp-guide).

#### Second output 
The second output is shown below:

![Output 2](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/word-count.jpg)

This output shows the number of words and characters in our dataset.

#### Third output
The third output is shown below:

![Output 3](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/stop-words-url-counts.jpg)

This output shows the number of stop words and URLs in our dataset.

#### Forth output
The fourth output is shown below:

![Output 4](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/punctuation-hashtags.jpg)

This output shows the number of punctuations and hashtags in our dataset.

The next output shows the vectorization process.

### Vectorization process
The vectorization process converts the text data into numeric data, which the model can use. Machine learning models do not understand the raw text.

![Vectorization process](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/vectorization-process.jpg)

In the image above, the vectorization process is done using the [Count Vectorizer](https://www.geeksforgeeks.org/using-countvectorizer-to-extracting-features-from-text/) and the [TFIDF vectorizer](https://medium.com/@cmukesh8688/tf-idf-vectorizer-scikit-learn-dbc0244a911a) packages.  The `Auto_NLP` function then selects the algorithm that produces the best results.

The image below shows the best-selected vectorizer.

![Best vectorizer](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/best-vectorizer.png)

From the image above, the `Auto_NLP` function selects the TFIDF vectorizer as the best vectorizer. The `Auto_NLP` function also adds the best parameters for the TFIDF vectorizer.

The next output shows the best algorithm and the machine learning pipeline.

### The best algorithm and machine learning pipeline
The `Auto_NLP` function searches through all of the available algorithms. It then selects the one with the best results. The selected algorithm is shown in the output below.

![Best algorithm](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/best-algorithm.png)

From the image above, the best algorithm is the `Multinomial Naive Bayes algorithm`.

The image also shows the created pipeline. The pipeline will automate the steps involved in building the NLP model. In our case, we have two steps. The first step is vectorization using `TFIDF vectorizer`. The second step is model training using the `Multinomial Naive Bayes algorithm`.

The pipeline will run the two steps and produce the following output.

![Pipeline output](/engineering-education/autonlp-using-autoviml-library-for-natural-language-processing/pipeline-output.png)

From the image above, the process has run successfully. The process produces an optimized model. This marks the end of the AutoNLP process. We can use this model to make predictions.

### Making predictions
In this stage, we will use the model to classify some of the customer reviews found in the test dataset. To make predictions, use this code:

```python
nlp_transformer.predict(test[nlp_column])
```
The prediction results are shown below:

```bash
array([1,1,1,0,1, ..., 0, 1, 0])
```

From the output above, our model can make predictions. It has classified some of the reviews as positive (1) and others as negative (0).

### Conclusion
In this tutorial, we learned how to automate natural language processing using the AutoVIML library. We started by discussing all the processes involved in natural language processing. After installing the AutoVIML library, we explored the key features it uses to produce an optimized model. 

We then used the AutoVIML library to build the natural language processing model. Finally, we used the model to make predictions. The model was able to classify customer reviews as either positive or negative.

You can find the Google Colab notebook used in this tutorial [here](https://colab.research.google.com/drive/1UlXBkOZj2iOmJjS0QKPnOdErXOfEgnux?usp=sharing).

Happy Coding!

### References
- [Google Colab link](https://colab.research.google.com/drive/1UlXBkOZj2iOmJjS0QKPnOdErXOfEgnux?usp=sharing)
- [Tensoflow dataset](https://www.tensorflow.org/datasets)
- [Text preprocessing activites](https://www.analyticsvidhya.com/blog/2021/09/essential-text-pre-processing-techniques-for-nlp/)
- [Natural language processing](https://www.ibm.com/cloud/learn/natural-language-processing)
- [AutoVIML documentation](https://github.com/AutoViML/Auto_ViML)

---
Peer Review Contributions by: [Wilkister Mumbi](/engineering-education/authors/wilkister-mumbi/)
