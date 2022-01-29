H2O is an open-source platform used for machine learning. H2O supports the implementation of popular machine learning algorithms. H20 supports both supervised and unsupervised machine learning algorithms.

The following algorithms are supported by H20. [Naive Bayes algorithms](https://en.wikipedia.org/wiki/Naive_Bayes_classifier), [Random Forests](https://en.wikipedia.org/wiki/Random_forest), [Gradient Boosting Machine](https://en.wikipedia.org/wiki/Gradient_boosting), [Generalized Linear Models](https://en.wikipedia.org/wiki/Generalized_linear_model), [K-Means algorithms](https://en.wikipedia.org/wiki/K-means_clustering), [Principal component analysis](https://en.wikipedia.org/wiki/Principal_component_analysis) and [Deep Neural Networks](https://en.wikipedia.org/wiki/Deep_learning). The complete list of the algorithms that H2O supports is found [here](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science.html).

H2O is fast and scalable. This makes it the best platform for building powerful machine learning models. H2O is also used for automated machine learning using the [H2O AutoML.](https://github.com/h2oai/h2o-3) pipeline.

In this tutorial, we will be focusing on the Gradient Boosting Machine algorithm. The gradient Boosting Machine is used for both classification and regression problems. In the Gradient Boosting Machine, we build multiple decision trees sequentially. We then combine them to create a final model with the best results. 
We will use the Gradient Boosting Machine to build the model. The model will be used to perform sentiment analysis. Sentiment analysis is a type of natural language processing. The sentiment analysis model will be able to classify a customer review as either positive or negative.

### Table of contents

- [Prerequisites](#prerequisites)
- [Introduction to Gradient Boosting Machine](#introduction-to-gradient-boosting-machine)
- [Getting started with H2O](#getting-started-with-h2o)
- [Initializing H2O](#initializing-h2o)
- [Dataset for sentiment analysis](#dataset-for-sentiment-analysis)
- [Converting the dataset into an array](#converting-the-dataset-into-an-array)
- [Selecting the columns](#selecting-the-columns)
- [Creating the data frame](#creating-the-data-frame)
- [Adding the output column](#adding-the-output-column)
- [Text preprocessing](#text-preprocessing)
- [Installing the Natural Language Toolkit](#installing-the-natural-language-toolkit)
- [Downloading stopwords](#downloading-stopwords)
- [Creating the function](#creating-the-function)
- [Applying the function](#applying-the-function)
- [Vectorization](#vectorization)
- [Training the vectorization model](#training-the-vectorization-model)
- [Saving the vectorization model](#saving-the-vectorization-model)
- [Applying the model](#applying-the-model)
- [Adding the vectorized columns to the data frame](#adding-the-vectorized-columns-to-the-data-frame)
- [Splitting the data frame](#splitting-the-data-frame)
- [Model training using the Gradient Boosting Machine](#model-training-using-the-gradient-boosting-machine)
- [Feeding the model with the dataset](#feeding-the-model-with-the-dataset)
- [Accuracy score](#accuracy-score)
- [Making predictions](#making-predictions)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
To follow along with this tutorial, you need to be familiar with:

- [Natural language processing](https://www.ibm.com/cloud/learn/natural-language-processing)
- [Steps in text preprocessing](https://towardsdatascience.com/nlp-text-preprocessing-a-practical-guide-and-template-d80874676e79)
- [Popular machine learning algorithms](https://www.analyticsvidhya.com/blog/2017/09/common-machine-learning-algorithms/)
- [Ensemble learning techniques](/engineering-education/ensemble-learning/) in machine learning.

> NOTE: The reader must use [Google Colab notebook](https://research.google.com/) when building the natural language processing model. Google Colab notebook has fast CPUs and GPUs. This makes it best suited to run the H2O library which needs an extremely fast CPU or a GPU.

### Introduction to Gradient Boosting Machine
As mentioned earlier, Gradient Boosting Machine creates multiple decision trees sequentially. It then combines them to create a final model with the best results. The initial decision tree model is known as the base model. Multiple decision trees are then built on top of the base model. The base learner is also known as a weak learner.

In Gradient Boosting Machine, weak learners work poorly when alone. But when they work together they produce the best results.

For further reading on Gradient Boosting Machine, read this [article](/engineering-education/boosting-algorithms-python/).

Let's get started with H2O.

### Getting started with H2O
To use H2O the platform, we need to install important dependencies. H2O depends on the [64-bit JDK](https://www.oracle.com/java/technologies/downloads/) to run. H2O is written using Java, to install the 64-bit JDK, run this command:

```bash
!apt-get install default-jre
!java -version
```
After installing the dependencies, we can install H2O using the following command:

```bash
!pip install h2o
```

This command will install the latest H2O version. To import the H2O, use this code:

```python
import h2o
```

To use H2O let's initialize it

#### Initializing H2O
To initialize H2O, use this code:

```python
h2o.init()
```
Initializing H2O will enable us to connect to the H2O clusters. This enables us to use its memory for machine learning. When we run the code above, it produces the following output:

![Initializing H2O](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/h2o-cluster.jpg)

From the image above, we can see we have connected to our H2O cluster. It also shows the cluster version and the total free cluster memory.

Let's now explore the dataset we will use for sentiment analysis.

### Dataset for sentiment analysis
We will use the dataset collected from Amazon. The Amazon dataset is made up of customers' reviews of personal care appliances. The dataset is downloaded from the `tensorflow_datasets`. `tensorflow_datasets` is a TensorFlow repository that has ready-to-use datasets.

Let's import the `tensorflow_datasets` TensorFlow package.

```python
import tensorflow_datasets as tfds
```
To download the dataset from `tensorflow_datasets`, use the following code:

```python
dowloaded_dataset, dataset_info = tfds.load('amazon_us_reviews/Personal_Care_Appliances_v1_00', with_info=True, batch_size=-1)
```
From the code above, the `tfds.load` method is used to load the dataset from the `tensorflow_datasets` repository. We will save the downloaded dataset into the `train` variable using the following code:

```python
train_dataset = dowloaded_dataset['train']
```
To see the dataset information run this command:

```python
dataset_info
```
The output of the sentiment analysis dataset is shown below:

![Sentiment analysis dataset](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/dataset-information.jpg)

From the image above, the dataset has over 130 million customer reviews. The dataset has many columns. In this tutorial, we will use these columns, `review_body`, `review_headline`, `star_rating`, and `helpful_votes`.

- `review_body`
It is the column that shows a detailed description of the product review.

- `review_headline`
It is the column that shows the title Amazon product review.

- `star_rating`
It is the column that shows the 1-5 star rating of the product purchased.

- `helpful_votes`
It is the column that shows the number of votes given to an Amazon product.

The dataset is now loaded, we need to convert the Amazon dataset into an array using NumPy. An array dataset can be easily manipulated and used by the model.

#### Converting the dataset into an array
To import the NumPy package, use the following code:

```python
import numpy as np
```
We use Numpy to convert the dataset into an array using the following code:

```python
dowloaded_dataset=tfds.as_numpy(train_dataset)
```
To see the dataset array, run this code:

```python
dowloaded_dataset
```
The output is shown below:

![Converted dataset array](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/dataset-array.jpg)

From the image above, the Amazon dataset is converted into an array format. Next, we need to select the necessary columns that we will use to build our sentiment analysis model.

### Selecting the columns
To select the necessary columns, use this code:

```python
review_body=dowloaded_dataset['data']['review_body']
review_headline=dowloaded_dataset['data']['review_headline']
helpful_votes=dowloaded_dataset['data']['helpful_votes']
rating=dowloaded_dataset['data']['star_rating']
```
The code above selects four columns from our dataset. The four columns will be used as inputs columns for the model during the training phase. In the next step, we will create a data frame using the H2O data frame function. A data frame is used to organize a dataset into labeled columns and rows.

### Creating the data frame
We will the data frame using the H2O data frame function. This is done using the following code:

```python
h2o_df=h2o.H2OFrame(np.hstack((helpful_votes[:,None],review_headline[:,None],review_body[:,None],rating[:,None])),column_names=['votes','headline','reviews','rating'],column_types=['numeric','string','string','numeric'])
```
The code above will create a data frame using the `h2o.H2OFrame` function. The function is also used to assign human-readable column names. The assigned column names are, `votes`, `headline`, `reviews`, and `rating`. 

To see the created data frame, run this code:

```python
h2o_df
```
The code produces the following output:

![Created dataframe](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/converted-dataframe.jpg)

From the image above, our dataset has four columns with the assigned dataset columns. 

### Adding the output column
We need to add an output column to our data frame. The output column will contain the output of the model after making a prediction. The model will be used to classify the customer's reviews as either positive or negative. Positive reviews are represented by 1 while negative reviews are represented by 0.

For a customer review to be positive the `star_rating` should be greater than 4. If the `star_rating` is less than 4, the review is negative. For us to add the output column, we will use this logic.

The code that represents this logic is shown below:

```python
h2o_df["output"] = h2o_df["rating"].apply(lambda x: 1 if x>= 4 else 0) 
```

When the code is executed, it will add the output column. To see the new data frame with the added output column, use this code:

```python
h2o_df
```
The output is shown below:

![Output column](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/output-column.jpg)

The next step is to start text preprocessing.

### Text preprocessing
Text processing is an essential step in natural language processing. In-text preprocessing, we clean and remove noise from the dataset. Text processing makes our dataset ready for use by the model. 

Some of the text preprocessing steps we will perform in this tutorial are as follows:
- Removing stop words
- Converting text to lower case
- Tokenization

For a detailed understanding of all the steps in text preprocessing, read this [article](https://towardsdatascience.com/nlp-text-preprocessing-a-practical-guide-and-template-d80874676e79).

In this tutorial, we will only focus on three steps. To perform these steps, we will use the Natural Language Toolkit(NLTK).

### Installing the Natural Language Toolkit
To install the Natural Language Toolkit(NLTK), use this command:

```bash
!pip install nltk
```
To import the `nltk` use this code: 

```python
import nltk
```
Let's now use `nltk` for text preprocessing.

### Downloading stopwords
Stopwords are the most commonly used words in a given language. Stopwords carry very little information. They have a minor impact on the model during training. Removing stop words allows the model to focus on the unique words in the dataset. These words have a greater impact on the model during training.

We will use `nltk` to download the stop word of the English language.

```python
from nltk.corpus import stopwords
nltk.download('stopwords')
stop_words = set(stopwords.words('english'))
```
These stopwords will then be filtered out from the dataset.

We will create a function that will remove the stopwords, perform tokenization, and convert text to lower case.

### Creating the function
The function will be used to remove the stopwords, tokenization, and convert text to lower case. Tokenization is the process of splitting the text into smaller word units called tokens. The created tokens are used as the input for the model during training. Converting text to lower case ensures we have a uniform dataset.

The function is created using the following code snippet:

```python
def tokenize(line):
  tokenized = line.tokenize("\\W+")
  tokenized = tokenized.tolower()
  tokenized = tokenized[(tokenized.nchar() >= 2) | (tokenized.isna()),:]
  tokenized_filter = tokenized[(tokenized.isna()) | (~ tokenized.isin(stop_words)),:]
 return tokenized_filter
```
The created function is named `tokenize`. From the function above, `line.tokenize` method is used for tokenization. The `tokenized.tolower` method is used to convert the text to lower case. `(~ tokenized.isin(stop_words))` method will only tokenize words that are not found in the stop words list. This will ensure that all of the stop words are filtered out of the dataset.

Finally, the function will return a clean text that has undergone all three steps. Let's now apply this function to our `reviews` and `headline` columns.

### Applying the function
The `reviews` and `headline` columns are columns that contain text. To apply the function into these two columns, use this code:

```python
words_reviews = tokenize(h2o_df["reviews"])
words_headline = tokenize(h2o_df["headline"])
```
To see the `reviews` column after applying the function, use this code:

```python
words_reviews.head()
```
The output is shown below:

![Reviews column](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/reviews-column.jpg)

To see the `headline` column after applying the function, use this code:

```python
words_headline.head()
```
The output is shown below:

![Headline column](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/headline-column.jpg)

The steps above show how to remove stop words, convert text into lower and perform tokenization. The next step is to perform vectorization of our tokenized text.

### Vectorization
Vectorization is the process of converting the tokenized text to a list of numbers. The list of numbers is known as word vectors which the model uses as input during training.

Machines do not understand text, that's why we convert the text into numeric form. In H2O, we use the `H2OWord2vecEstimator` algorithm to convert the tokenized text to word vectors.

For further reading on how the `H2OWord2vecEstimator` algorithm converts the tokenized text to word vectors, read this [documentation](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science/word2vec.html)

Let's now import the `H2OWord2vecEstimator` using the following code:

```python
from h2o.estimators.word2vec import H2OWord2vecEstimator
```
The `H2OWord2vecEstimator` algorithm is used to train a model that will be used for vectorization. The model will be applied to the `words_reviews` and the `words_headline` columns. This produces the corresponding word vectors.

Let's now train the model used for vectorization.

### Training the vectorization model
We will train the vectorization model using the `words_reviews` and the `words_headline` columns. This is done using the following code:

```python
vec_model = H2OWord2vecEstimator(vec_size = 100, model_id = "w2v_amazon.model")
vec_model.train(training_frame=words_reviews)
vec_model.train(training_frame=words_headline)
```
From the code above, we have set the methods and parameters:
- `vec_size = 100`.
This represents the number of columns that the word vectors will have.

-`model_id = "w2v_amazon.model"`. 
This is the name of our vectorization model.

- `vec_model.train`
This is the function we have used to train our vectorization model. We have passed `training_frame` as a parameter. This parameter is used to specify the dataset used to train the vectorization model. In our case, we have used both the `words_reviews` and the `words_headline` columns to train the model.

The code above will build our vectorization model. Let's save the model so that we can use it.

#### Saving the vectorization model
To save the model, use this code:

```python
h2o.save_model(vec_model,path='./')
```
After saving the model, we can now use it to transform/convert the tokenized text to word vectors.

### Applying the model
We will apply the trained model to both the `words_reviews` and the `words_headline`. These two columns contain the tokenized text.

#### `words_reviews` column
```python
review_vecs = vec_model.transform(words_reviews, aggregate_method = "AVERAGE")
```
From the code above the `vec_model.transform` function is used to convert/transform the tokenized text to word vectors. The function has the following parameter:

- `words_reviews`
This is the input column.

- `aggregate_method = "AVERAGE"`
It is used to specify how the function will convert the tokenized text to word vectors. `"AVERAGE"` is the most commonly used type to ensure that no words lose meaning after the conversion.

To see the size of converted word vectors, use this code:

```python
review_vecs.shape
```
The output is shown below:

```bash
(85981, 100)
```
From the output above, we have `85981` word vectors and they are organized into `100` columns.

To see the output of converted word vectors, use this code:

```python
review_vecs.head()
```
The output is shown below:

![Converted word vectors](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/converted-word-vectors.jpg)

From the image above, the `words_reviews` column has been converted to word vectors. Let's also vectorize the `words_headline` column using the same process.
#### `words_headline` column
We will use the following code:

```python
headline_vecs = vec_model.transform(words_headline, aggregate_method = "AVERAGE")
headline_vecs.names = ["headline_" + s for s in headline_vecs.names]
```
We use the same `vec_model.transform` function to vectorize the `words_headline` column. We also use the same `aggregate_method = "AVERAGE"` parameter when performing the vectorization.

When the code is executed it will vectorize our text. To see the vectorized text, use this code:

```python
headline_vecs.head()
```
The output is shown below:

![Converted word vectors](/engineering-education/natural-language-processing-using-gradient-boosting-machine-and-h2o-library/converted-word-vectors.jpg)

From the image above, the `words_headline` column has been converted to word vectors

To use the `review_vecs` and the `headline_vecs` as inputs for our mode, we need to add them to our original data frame.

### Adding the vectorized columns to the data frame
We will add the vectorized columns to the original `h2o_df` data frame.  We will use the `cbind` function.

```python
h2o_df_ext=h2o_df.cbind(review_vecs)
h2o_df_ext = h2o_df_ext.cbind(headline_vecs)
```
The `cbind` function will add the `review_vecs` dataframe to the `h2o_df`. The same function will also add the `headline_vecs` dataframe to the created `h2o_df_ext`.

After merging all the data frames, we now need to split the final `h2o_df_ext` data frame into two sets. The first set will be used for model training. The second set will be used for model validation.

### Splitting the data frame
To split the dataset into a training and validation set, use this code:

```python
h2o_train,h2o_valid = h2o_df_ext.split_frame(ratios=[.8])
```
The model will learn from the training set so that it can understand sentiment analysis. The validation set will be used to fine-tune the hyper-parameters during training. This ensures that we can have an optimized model that gives the best prediction results.

From the code above, we have used a splitting ratio of `.8`. 80% of the data frame will be used for training and 20% will be used for model validation.

We can use the Gradient Boosting Machine to train the model.

### Model training using the Gradient Boosting Machine
We will import the `H2OGradientBoostingEstimator` algorithm from the H2O library. `H2OGradientBoostingEstimator` is the Gradient Boosting Machine algorithm used to train the model.

```python
from h2o.estimators import H2OGradientBoostingEstimator
```
Let's initialize the `H2OGradientBoostingEstimator`. We will also set the hyper-parameters that will produce the best results.

```python
Gradient_Boosting_Machine= H2OGradientBoostingEstimator(ntrees=100,
 max_depth = 6,  learn_rate=0.1
                                             )
```
The initialized `H2OGradientBoostingEstimator` algorithm has the following parameters:

- `ntrees`
It is used to specify the number of decision trees used to build the model. We have set the number of trees to be `100`. The `H2OGradientBoostingEstimator` algorithm will create the 100 decision trees sequentially. It then combines them to create a final model with the best results.

- `max_depth`
It is the maximum depth of the decision trees used. We have set the value to `6`. Increasing the `max_depth` value may lead to model overfitting.

- `learn_rate`
It is used to specify the learning rate of the model during training.

After, initializing the model, let's now feed the model with the prepared dataset.

### Feeding the model with the dataset
To feed the model with the dataset, use this code:

```python
Gradient_Boosting_Machine.train(x=headline_vecs.names+review_vecs.names, y='output', training_frame = h2o_train, validation_frame=h2o_valid)
```
From the code above, the `train` function is used to train the model. The function has the following parameters.

- `x` variable
It is the variable that contains all the data frames that are used as input for the model. The `headline_vecs` and the `review_vecs` data frame are used as input.

- `y` variable
It is the variable that contains the output column. 

- `training_frame`
It is used to specify which of the two spit data frames is used for training. We are using the `h2o_train` data frame for training.

- `validation_frame`
It is used to specify which of the two spit data frames is used for validation. We are using the `h2o_valid` data frame for validation.

This process will train our model and produce the model with the best results. We can calculate the accuracy score for this model.

### Accuracy score
To get the accuracy score, use this code:

```python
print(" Hyperparameter AUC: " + str(round(Gradient_Boosting_Machine.auc(valid = True), 3)))
```
The code above will print the accuracy score. The accuracy score is shown below:

```bash
Hyperparameter AUC: 0.934
```
The accuracy score is `0.934`, which is 93.4%. This is a high accuracy score. It shows our model was well trained and understands sentiment analysis.

Let's use this model to make a prediction.
### Making predictions
We will the model to classify if a given customer review is negative or positive. We will use the following text input.

```python
predictions = ["The shippers and loaders were great....willing to consider speedier shipping options, the good news is that at the end the standard shipping arrived quickly enough"]
```
Let's vectorize this text input.

```python
predictions = vec_model.transform(predictions)
```
After the vectorization, let's use the converted word vectors to make a prediction. To make the prediction, we will use the `predict` function.

```python
prediction_result = Gradient_Boosting_Machine.predict(predictions)
print(prediction_result)
```
The prediction result is shown below:

```bash
array([1])
```
The prediction result is 1. This represents a positive review. This shows our model can make accurate predictions.

### Conclusion
In this tutorial, we went through the process of setting up our working environment and installing the H2O library. We also discussed the Gradient Boosting Machine in detail. This gives a reader a better understanding of the algorithm. The tutorial also covers text preprocessing. In-text preprocessing, we clean and remove noise from the dataset.

Finally, we used to clean dataset to build a sentiment analysis model. The model has been trained using`H2OGradientBoostingEstimator` algorithm. The final model was able to make accurate predictions.

The complete Google Colab code for this tutorial is found [here](https://colab.research.google.com/drive/1MS3ziVfG2UIgCbvJ8nRyciJcfDyZVDq1?usp=sharing).

### References
- [Gradient Boosting](https://en.wikipedia.org/wiki/Gradient_boosting)
- [Ensemble Learning Techniques](/engineering-education/ensemble-learning/)
- [Boosting Algorithms in Python](/engineering-education/boosting-algorithms-python/)
- [Algorithms supported by H2O](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science.html)
- [Steps in text preprocessing](https://towardsdatascience.com/nlp-text-preprocessing-a-practical-guide-and-template-d80874676e79).
- [Word2vec algorithm](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science/word2vec.html)
- [H2O GitHub](https://github.com/h2oai)
