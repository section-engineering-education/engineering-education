PySpark is a python API written as a wrapper around the Apache Spark framework. Apache Spark is an open-source Python framework used for processing [Big Data](https://en.wikipedia.org/wiki/Big_data) and [data mining.](https://www.investopedia.com/terms/d/datamining.asp)

Apache Spark is best known for its speed when it comes to data processing and its ease of use. It has a high computation power that's why its best suited for Big Data.
It supports popular libraries such as [Pandas](https://pandas.pydata.org/), [Scikit-Learn](https://scikit-learn.org/) and [NumPy](https://numpy.org/) used in data preparation and model buidling.

### Introduction

Pyspark uses the Spark API in data processing and model building. Spark API consists of the following libraries.

#### [Spark SQL](https://spark.apache.org/docs/latest/api/python/)

This is the structured query language used in the data processing. It's used to query the datasets in exploring the data used in model building.

#### Spark Streaming

Allows processing and analysis of real-time data from various sources such as [Flume](https://flume.apache.org/), [Kafka](https://kafka.apache.org/) and [Amazon Kinesis.](https://aws.amazon.com/kinesis/)

The image below shows the components of spark streaming.
![Spark Streaming](/engineering-education/multiclass-text-classification-with-pyspark/spark_streaming.png)

#### [MLib](https://spark.apache.org/mllib/)

Contains a uniform set of high-level APIs used in model creation. Help to train our model and find the best algorithm.

#### [Spark Core](https://spark.apache.org/docs/latest/api/python/)

This is the root of the Spark API. It's involved with the core functionalities such as basic I/O functionalities, task scheduling, and memory management.

#### [GraphX](https://spark.apache.org/docs/latest/graphx-programming-guide.html)

Used in plotting of graphs for Spark computations.

The image below shows components of the Spark API.
![Components-of-Spark-API](/engineering-education/multiclass-text-classification-with-pyspark/components_of_spark.jpg)
Pyspark supports two data structures that are used during data processing and machine learning building.

#### [Resilient Distributed Dataset(RDD)](https://www.tutorialspoint.com/apache_spark/apache_spark_core_programming.htm)

This is a distributed collection of data spread and distributed across multiple machines in a cluster.

RDD is best described in three ways.

- Resilient: Fault-tolerant and can rebuild itself if a failure occurs.
- Distributed: Data is distributed and spread across multiple machines in a cluster.
- Dataset: Collection of partitioned data with values.

#### [Dataframe](https://www.tutorialspoint.com/apache_spark/apache_spark_core_programming.htm)

This is distributed collection of either structured or semi-structured datasets. Dataset has organized columns in relational databases and excels sheets and its current dataset structure.

These two are what defines the nature of the dataset that we will be using when building a model.

There are two APIs that are used for machine learning.

#### [PySpark.ML](https://spark.apache.org/docs/3.0.2/api/python/pyspark.ml.html)

Contains high-level API built on top of Dataframes in building machine learning models. It has easy to use [machine learning pipelines](https://spark.apache.org/docs/2.3.1/api/python/pyspark.ml.html) used to automate machine learning workflow.

#### [PySpark.MLib](https://spark.apache.org/docs/latest/ml-guide.html)

Contains high-level API built on top of RDD in building machine learning models. It consists of common learning algorithms for regression, classification, clustering, and collaborative filtering.

In this tutorial, we shall use `PySpark.ML API` in building our multiclass text classification model.

> NOTE: We are using `PySpark.ML API` in building our model because `PySpark.MLib` is deprecated and will be removed in the next PySpark releases.

To further read about the components of PySpark and how it’s useful in processing [Big Data](https://en.wikipedia.org/wiki/Big_data) [click here](https://www.section.io/engineering-education/introduction-to-spark/)

### Table of Contents

- [Prerequisites](#prerequisites)
- [PySpark Installation](#pyspark-installation)
- [Creating SparkContext and SparkSession](#creating-sparkcontext-and-sparksession)
- [Initialize TextClassifier app](#initialize-textclassifier-app)
- [Loading Dataset](#loading-dataset)
- [Selecting the needed columns](#selecting-the-needed-columns)
- [Checking for missing values](#checking-for-missing-values)
- [Feature Engineering](#feature-engineering)
- [Pipeline stages](#pipeline-stages)
- [Split Dataset](#split-dataset)
- [Building the pipeline](#building-the-pipeline)
- [Building model](#building-model)
- [Model evaluation](#model-evaluation)
- [Making single prediction](#making-single-prediction)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites

1. A good understanding of [Python](https://www.section.io/engineering-education/python-projects-for-beginners/)
2. Have [Anaconda] installed in your machine.
3. Have a good knowledge of [Jupyter Notebook](https://jupyter.org/).
4. Understand [machine learning modeling][https://www.section.io/engineering-education/house-price-prediction/].
5. Download the Udemy dataset [here](https://drive.google.com/file/d/1-TfybHeSWpP9UJLxeNDIFT1CPfxn7XWT/view?usp=sharing)

> NOTE: To follow along easily, use [Jupyter Notebook](https://jupyter.org/) in building our text classification model.

### PySpark Installation

We install PySpark by creating a virtual environment that keeps all the dependencies required for our project.
Before we install PySpark we need to have `Pipenv` in our machine and we install it using the following command.

```python
pip install pipenv
```

We can now install PySpark using this command.

```python
pipenv install pyspark
```

Since we are using [Jupyter Notebook](https://jupyter.org/) in this tutorial we install it using the following command:

```python
pipenv install jupyterlab
```

In order to launch PySpark use this command.

```python
pipenv run pyspark
```

This will launch PySpark to show if it is successfully installed in our machine.

Let's activate virtual environment we have created.

```python
pipenv shell
```

To launch our notebook use this command.

```python
pipenv run jupyter lab
```

This will launch the notebook and from here we can start working on our model.

### Creating SparkContext and SparkSession

In this tutorial, we will be building a multiclass text classification model that can predict the subject category given a course title or text. We will use the Udemy dataset in the building of our model.

Let's import our machine learning packages.

```python
import SparkContext from pyspark
```

`SparkCOntext` creates an entry point of our application and creates a connection between the different clusters in our machine allowing communication between them.

The 'SparkContext' will also give a user interface that will show us all the jobs running.

```python
sc = SparkContext(master="local[2]")
```

To launch the UI using the following command.

You then click `SparkUI` to launch the Spark dashboard on `http://192.168.0.6:4040/`. This will show the available jobs running on our machine. Currently, we have no running jobs.

```python
sc
```

```bash
Spark UI

Version
v3.0.2
Master
local[2]
AppName
pyspark-shell
```

#### Creating SparkSession

By creating a `SparkSession` enables us to interact with the different Spark functionalities. The functionalities are data analysis and creating our text classification model.

```python
import SparkSession from pyspark.sql
```

### Initialize TextClassifier app

Using the imported `SparkSession` we can now initialize our app.

```python
spark = SparkSession.builder.appName("TextClassifierApp").getOrCreate()
```

We use the `builder.appName()` method to give a name to our app.

After initializing our app, we can now view our launched UI to see the running jobs. The running jobs are shown below.

![Spark UI](/engineering-education/multiclass-text-classification-with-pyspark/sparkcontext_ui_1.jpg)
![Details for job](/engineering-education/multiclass-text-classification-with-pyspark/sparkcontext_ui_2.jpg)

### Loading dataset

We use the Udemy dataset that contains all the courses offered by Udemy. The dataset contains the course title and subject they belong to.

![Dataset Used](/engineering-education/multiclass-text-classification-with-pyspark/dataset.jpg)

To get the CSV file of this dataset [click here](https://drive.google.com/file/d/1-TfybHeSWpP9UJLxeNDIFT1CPfxn7XWT/view?usp=sharing)

After you have downloaded the dataset using the link above, we can now load our dataset into our machine using the following snippet.

```python
df = spark.read.csv("udemy_dataset.csv",header=True,inferSchema=True)
```

To show the structure of our dataset use this command

```python
df.show()
```

We can see the available columns in our dataset as shown.

```python
df.columns
```

Output:

```bash
['_c0',
 'course_id',
 'course_title',
 'url',
 'is_paid',
 'price',
 'num_subscribers',
 'num_reviews',
 'num_lectures',
 'level',
 'content_duration',
 'published_timestamp',
 'subject',
 'clean_course_title']
```

In this tutorial, we will only be using the `course_title` and `subject` columns in building our model.

### Selecting the needed columns

Since we will be using only `course_title` and `subject` columns in building our model, we have to select them from our dataset.

```python
df.select('course_title','subject').show()
```

The output of the available `course_title` and `subject` in our dataset is shown.

```bash
+--------------------+----------------+
|        course_title|         subject|
+--------------------+----------------+
|Ultimate Investme...|Business Finance|
|Complete GST Cour...|Business Finance|
|Financial Modeling...|Business Finance|
|Beginner to Pro -...|Business Finance|
|How To Maximize Y...|Business Finance|
|Trading Penny Sto...|Business Finance|
|Investing And Tra...|Business Finance|
|Trading Stock Cha...|Business Finance|
|Options Trading 3...|Business Finance|
|The Only Investme...|Business Finance|
|Forex Trading Sec...|Business Finance|
|Trading Options W...|Business Finance|
|Financial Managem...|Business Finance|
|Forex Trading Cou...|Business Finance|
|Python Algo Trading...|Business Finance|
|Short Selling: Le...|Business Finance|
|Basic Technical A...|Business Finance|
|The Complete Char...|Business Finance|
|7 Deadly Mistakes...|Business Finance|
|Financial Stateme...|Business Finance|
+--------------------+----------------+
only showing the top 20 rows
```

Saving our selected columns in the `df` column.

```python
df = df.select('course_title','subject')
```

### Checking for missing values

We need to check for any missing values in our dataset, this ensures that we have a well-formated dataset that can easily train our model.

```python
df.toPandas()['subject'].isnull().sum()
```

We use the `toPandas()` method to check for missing values in our `subject` column and drop the missing values.

```python
df = df.dropna(subset=('subject'))
```

This will drop all the missing values in our `subject` column.

### Feature Engineering

Feature engineering is the process of getting the relavant features and characteristics from our raw data. We extract various characteristics from our Udemy dataset that will act as inputs into our machine.

Features will be used by our model in making predictions.

Machine learning algorithms do not understand the text so we have to convert them into numeric values during this stage.

We import all the packages required for feature engineering.

```python
import pyspark.ml.feature
```

To list all the available methods, run this command.

```python
dir(pyspark.ml.feature)
```

These features are in form of an extractor, vectorizer, and tokenizer.

1. Tokenizer
   It involves splitting of a sentence into smaller words. This tutorial shall convert the input text in our dataset into word tokens that our machine can understand.

   For a detailed understanding about Tokenizer [click here](https://huggingface.co/transformers/main_classes/tokenizer.html)

2. CountVectorizer
   It is a great tool in machine learning that converts our given text into vectors of numeric numbers. Machines understand numeric values easily rather than text.

   For a detailed understanding about CountVectorizer [click here](https://towardsdatascience.com/basics-of-countvectorizer-e26677900f9c)

3. Extractor

Process of extract various characteristics and features from our dataset. This enables our model to easily understand patterns in predictive analysis.

In order to automate these processes, we shall use a machine learning pipeline. This will simplfy machine learning workflow.

### Pipeline stages

We shall use the pipeline to automate the process of machine learning from the process of feature engineering to model building.

The pipeline stages are categorized into two.

![Pipeline Stages](/engineering-education/multiclass-text-classification-with-pyspark/pipeline_stages.jpg)

1. Transformers

This includes different methods that take data and fit them into the data or feature.

Transformers involve the following stages.

#### Tokenizer

Convert the input text and converts it into word tokens. This word tokens into short phrases that act as input into our model.

For a detailed information about Tokenizer [click here](https://huggingface.co/transformers/main_classes/tokenizer.html)

#### StopWordsRemover

Extract all the stop word available in our dataset. Stop words are set of words that are used in a given language frequently. These words may be biased when building the classifier.

For a detailed information about StopWordsRemover [click here](https://spark.apache.org/docs/latest/api/python/reference/api/pyspark.ml.feature.StopWordsRemover.html)

#### CountVectorizer

Convert from text to vectors of numbers. Numbers are easily understood by the machine rather than text.

For a detailed information about CountVectorizer [click here](https://towardsdatascience.com/basics-of-countvectorizer-e26677900f9c)

#### Inverse Document Frequency(IDF)

Its statistic measure which indicates how important a word is relative to other documents in a collection of documents. This creates a relation between different words in a document. If a word frequently appears in a given document and also frequently appears in other documents, it shows that it has no predictive power towards classification.
The more the word is rare in given documents the more it has value in predictive analysis.

For a detailed understanding about IDF [click here](https://medium.com/the-programmer/how-does-bag-of-words-tf-idf-works-in-deep-learning-d668d05d281b)

2. Estimators

Takes data as input, fits model into the data, and produces a model into a model we can use to make predictions.

The estimator is as shown.

#### LogisticRegression

This is the algorithm that we shall use in building our model. It's a statistical analysis method used to predict an output based on prior pattern recognition and analysis.

We shall have five pipeline stages: Tokenizer, StopWordsRemover, CountVectorizer, Inverse Document Frequency(IDF), and LogisticRegression.

Let's import the packages required to initialize the pipeline stages.

```python
from pyspark.ml.feature import Tokenizer,StopWordsRemover,CountVectorizer,IDF
```

We also need to import `StringIndexer`.

`StringIndexer` is used to add labels to our dataset. Labels are the output we intend to predict.

```python
from pyspark.ml.feature import StringIndexer
```

#### Initliaze the pipeline stages

We need to initialize the pipeline stages as shown. We saved the stages in the following variables: `tokenizer`, `stopwords_remover`, `vectorizer`, and `idf`.

Our initial output column is `course_title` which is transformed into `mytoken` as the output column. The columns are further transformed until we reach the `vectorizedFeatures` after the four pipeline stages.

`vectorizedFeatures` will now become the input of the last pipeline stage which is `LogisticRegression`.The last stage is where we build our model.

This is a sequential process starting from the `tokenizer` stage to the `idf` stage as shown below.

```python
tokenizer = Tokenizer(inputCol='course_title',outputCol='mytokens')
stopwords_remover = StopWordsRemover(inputCol='mytokens',outputCol='filtered_tokens')
vectorizer = CountVectorizer(inputCol='filtered_tokens',outputCol='rawFeatures')
idf = IDF(inputCol='rawFeatures',outputCol='vectorizedFeatures')
```

This will create the pipeline stages.

#### Adding labels

```python
labelEncoder = StringIndexer(inputCol='subject',outputCol='label').fit(df)
```

We add labels into our `subject` column to be used when predicting the type of subject. This helps our model to know what it intends to predict. We use the `StringIndexer` function to add our labels.

To see how the different subjects are labeled using the following code.

```python
labelEncoder.transform(df).show(5)
```

The output is as shown:

```bash

labelEncoder.transform(df).show(5)
+--------------------+----------------+-----+
|        course_title|         subject|label|
+--------------------+----------------+-----+
|Ultimate Investme...|Business Finance|  1.0|
|Complete GST Cour...|Business Finance|  1.0|
|Financial Modeling...|Business Finance|  1.0|
|Beginner to Pro -...|Business Finance|  1.0|
|How To Maximize Y...|Business Finance|  1.0|
+--------------------+----------------+-----+
only showing the top 5 rows
```

#### Dictionary of all labels

We have to assign numeric values to the subject categories available in our dataset for easy predictions.

```python
label_dict = {'Web Development':0.0,
 'Business Finance':1.0,
 'Musical Instruments':2.0,
 'Graphic Design':3.0}
```

As shown `Web Development` is labeled `0.0`, `Business Finance` labeled `1.0`, `Musical Instruments` labeled `2.0`, and `graphic design` assigned `3.0`.

Adding these labels into our dataset as shown.

```python
df = labelEncoder.transform(df)
```

We use the `transform()` method to add the labels to the respective subject categories.

### Split Dataset

Before we start we finish our last stage of the pipeline where we build a model using the `LogisticRegression` we have to split our dataset into a train set and test set.

```python
(trainDF,testDF) = df.randomSplit((0.7,0.3),seed=42)
```

70% of our dataset will be used for training and 30% for testing.

### Importing LogisticRegression

We import the `LogisticRegression` algorithm which we shall use in building our model to perform classification.

```python
from pyspark.ml.classification import LogisticRegression
```

#### Creating estiator

This is the function that takes data as input, fits the data, and creates a model used to make predictions.

```python
lr = LogisticRegression(featuresCol='vectorizedFeatures',labelCol='label')
```

The `IDF` stage inputs `vectorizedFeatures` into this stage of the pipeline. `vectorizedFeatures` will be used as the input column used by the LogisticRegression algorithm to build our model and our target label will be the `label` column.

We have initialized all the five pipeline stages, we can start building the pipeline to perform these tasks.

### Building the pipeline

Let's import the `Pipeline()` used to build our model.

```python
import Pipeline from pyspark.ml
```

#### Fitting the five stages

We add the initialized 5 stages into the `Pipeline()` method.

```python
pipeline = Pipeline(stages=[tokenizer,stopwords_remover,vectorizer,idf,lr])
```

### Building model

We build our model by fitting our model into our training dataset by using the `fit()` method and pass `trainDF` as our parameter.

Let's initialize our model pipeline as `lr_model`.

```python
lr_model = pipeline.fit(trainDF)
```

#### Testing model

We test our model using the test dataset to see if it can classify the course title and assign the right subject.

```python
predictions = lr_model.transform(testDF)
```

To see if our model was able to do the right classification use this command.

```python
predictions.show()
```

![Prediction Output](/engineering-education/multiclass-text-classification-with-pyspark/prediction_output.jpg)

We select the `prediction` column to see the predictions of the first `10` rows.

```python
predictions.select('rawPrediction','probability','subject','label','prediction').show(10)
```

The output is as shown.

```bash
+--------------------+--------------------+-------------------+-----+----------+
|       rawPrediction|         probability|            subject|label|prediction|
+--------------------+--------------------+-------------------+-----+----------+
|[8.22575678849003...|[0.86083740538013...|Musical Instruments|  2.0|       0.0|
|[-1.5816511969981...|[6.40379189870091...|Musical Instruments|  2.0|       2.0|
|[0.38747123626564...|[1.29430064456987...|Musical Instruments|  2.0|       2.0|
|[-2.0540053505355...|[3.67476794956146...|   Business Finance|  1.0|       1.0|
|[24.7266193282529...|[0.99999999908079...|    Web Development|  0.0|       0.0|
|[22.2213462251437...|[0.99999999175336...|    Web Development|  0.0|       0.0|
|[20.1005546377385...|[0.99999995838555...|    Web Development|  0.0|       0.0|
|[-5.9910327938499...|[2.64083766762944...|Musical Instruments|  2.0|       2.0|
|[-19.729920863390...|[4.16984026967754...|     Graphic Design|  3.0|       3.0|
|[-2.6725325296694...|[9.29048167255554...|Musical Instruments|  2.0|       2.0|
+--------------------+--------------------+-------------------+-----+----------+
only showing the top 10 rows
```

From the above output, we can see that our model can accurately make predictions since the `label` columns match with the `prediction` columns.

### Model evaluation

This is checking the model accuracy so that we can know how well we trained our model.
We import `MulticlassClassificationEvaluator` which will be used to evaluate our model and calculate the accuracy score.

```python
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
```

The `MulticlassClassificationEvaluator` uses the `label` column and `prediction` column in calculating the `accuracy`. If the two column matches, it increases the accuracy score of our model.

```python
evaluator = MulticlassClassificationEvaluator(labelCol='label',predictionCol='prediction',metricName='accuracy')
```

```python
accuracy = evaluator.evaluate(predictions)
```

To get the accuracy run the following command.

```python
accuracy
```

The output is shown.

```bash
0.9163498098859315
```

This shows that our model is 91.635 accurate.

### Making a single prediction

We use our trained model to make a single prediction. We input a text into our model and see if our model can classify the right subject.
Single predictions expose our model to a new set of data that was not available in the training set or the testing set. This makes sure that our model makes new predictions on its own under a new environment.

To perform a single prediction we need to prepare our sample input as a string using the `StringType()` function.

```python
from pyspark.sql.types import StringType
```

Create a sample data frame made up of the `course_title` column.

```python
sample1 = spark.createDataFrame([
    ("Building Machine Learning Apps with Python and PySpark",StringType())
],
["course_title"]

)
```

Let's output our data frame without truncating.

```python
sample1.show(truncate=False)
```

After we formatting our input string, now let's make a prediction.

```python
pred1 = lr_model.transform(sample1)
```

To show the result of the prediction, we select the columns that are required to show our prediction result.

```python
pred1.select('course_title','rawPrediction','probability','prediction').show()
```

Output:

```bash
+--------------------+--------------------+--------------------+----------+
|        course_title|       rawPrediction|         probability|prediction|
+--------------------+--------------------+--------------------+----------+
|Building Machine ...|[14.6893212262828...|[0.99999805300087...|       0.0|
+--------------------+--------------------+--------------------+----------+
```

The prediction is `0.0` which is web development according to our created label dictionary.

This shows that our model can accurately classify the given text into the right subject with an accuracy of `99.999999`.

### Conclusion

In the tutorial, we have learned about multi-class text classification with PySpark.
We started with PySpark basics, learned the core components of PySpark used for Big Data processing.

This gives us a good foundation and a good understanding of PySpark. From here we then started preparing our dataset by removing missing values, the Udemy dataset is what is used in building our model.

We then followed the stages in machine learning workflow, we started with feature engineering then applied the pipeline approach to automate certain workflows. Pipeline makes the process of building a machine learning model easier, after following all the pipeline stages we ended up with a machine learning model.

Finally, we used this model to make predictions, this is the goal of any better. If a model can accurately make predictions the better the model. Using these steps, a reader should comfortably build a multi-class text classification with PySpark.

### References

- [Introduction to PySpark](https://www.section.io/engineering-education/introduction-to-spark/)
- [PySpark Tutorial](https://www.tutorialspoint.com/pyspark/index.htm)
- [PySpark Components](https://spark.apache.org/docs/latest/api/python/)
- [PySpark Documentation](https://spark.apache.org/docs/latest/api/python/)
- [PySpark Basics](https://towardsdatascience.com/a-brief-introduction-to-pyspark-ff4284701873)
- [Getting started with PySpark](https://www.section.io/engineering-education/getting-started-with-pyspark-spark-part2/)
