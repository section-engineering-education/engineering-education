Text classification is an important task in natural language processing that categorizes text into predefined classes. We train the text classification model using a text dataset. The model learns from the text dataset and finally it will make predictions. Text classification models perform tasks such as [intent detection](https://sentione.com/blog/new-state-of-the-art-intent-detection-model-from-sentione), [topic labeling](https://medium.com/@gab.choojj/airline-topic-labeling-and-classification-using-latent-dirichlet-allocation-lda-d88d91b2c6ef), [sentiment analysis](/engineering-education/sentiment-analysis-with-spacy-and-scikit-learn/) and [spam detection](/engineering-education/spam-detection-model-using-scikit-learn).

Multiclass text classification is a text classification task with more than two predefined classes. We have more than two classes but each data sample can only be classified into one class.

For example, classifying news headlines into predefined news categories. The predefined news categories can be business, sports, tech, entertainment, and politics. 

In this tutorial, we will build a model that classifies customer complaints into 5 pre-defined classes. We will use [Scikit-learn](https://scikit-learn.org/stable/) for text preprocessing and vectorization. [H2O](https://github.com/h2oai/h2o-3) will automate the model building process using [H2O AutoML](https://github.com/h2oai/h2o-3) algorithm.

### Table of contents
- [Prerequisites](#prerequisites)
- [H2O library](#h2o-library)
- [Benefits of H2O](#benefits-of-h2o)
- [H2O dependencies](#h2o-dependencies)
- [Initializing H2O](#initializing-h2o)
- [Customer complaints dataset](#customer-complaints-dataset)
- [Creating a dictionary object](#creating-a-dictionary-object)
- [Dataset splitting](#dataset-splitting)
- [Text Preprocessing for natural language processing](#text-preprocessing-for-natural-language-processing)
- [Function](#function)
- [Text vectorization](#text-vectorization)
- [Converting the train and test sets into an array](#converting-the-train-and-test-sets-into-an-array)
- [Creating H2O Data Frame](#creating-h2o-data-frame)
- [Adding the target column](#adding-the-target-column)
- [Using H2O AutoML to run multiple models](#using-h2o-automl-to-run-multiple-models)
- [Calling the train function](#calling-the-train-function)
- [Performance of the models](#performance-of-the-models)
- [Using the best model](#using-the-best-model)
- [Conclusion](#conclusion)
- [References](#references)

### Prerequisites
A reader should:

- Know how to implement [Scikit-learn algorithms.](https://scikit-learn.org/stable/)
- Understand [text pre-processing-techniques](https://www.analyticsvidhya.com/blog/2021/09/essential-text-pre-processing-techniques-for-nlp/)
- Know how to build a [natural language processing model](/engineering-education/nlp-based-detection-model-using-neattext-and-scikit-learn/)
- Use Google [Colab](https://research.google.com/colaboratory/)

### H2O library
H2O is an open-source library for machine learning. It allows the use of most supervised and unsupervised machine learning algorithms. It is robust and easily scalable.

[H2O](https://github.com/h2oai/h2o-3) also automates the model building process using [H2O AutoML](https://github.com/h2oai/h2o-3). During the automation process, it selects the best algorithm and performs the model evaluation.

#### Benefits of H2O

- It saves developers time.
H2O AutoML algorithm automates most tasks in the machine learning tasks, saving the developers time. This increases productivity 

- H20 builds simple and interactive interfaces during the automation process. 
This enables users to easily gain insights from the H2O interfaces.

- It simplifies the machine learning process.
H2O automates complex machine learning tasks. 

- It helps to avoid model errors that might occur due to human error.
Since most processes are automated, model errors are reduced. H2O is also a debugging tool that detects and removes underlying model errors. The final model will make accurate predictions.

- It enables automatic training and tuning of multiple models.
H2O runs multiple models during training. It then selects the best model and performs the model evaluation. This produces an optimized model that will make accurate predictions.

- It produces an easily deployable model
The final model can be easily deployed to production.

### H2O dependencies
H2O requires [64-bit JDK](https://www.oracle.com/java/technologies/downloads/). It is written using Java. Let's install 64-bit JDK.

```bash
!apt-get install default-jre
!java -version
```
After installing the dependencies, let's install H2O.

#### Installing H2O
Use the code:

```python
!pip install h2o
```
To import H2O, use this code:

```python
import h2o
from h2o.automl import H2OAutoML
```
We `H2OAutoML` to run multiple machine learning algorithms during training and then selects the best algorithm.

### Initializing H2O
Let's use this code:

```python
h2o.init()
```
It will make the H2O clusters start running. We will use the H2O clusters to train the model.

The image below shows the H2O clusters.

![H2O clusters](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/h2o-clusters.png)

### Customer complaints dataset
We will use the customer complaints dataset to train the classification model. When we have a new customer complaint, the model will classify it into one of the 5 pre-defined classes. The text classification model classifies a complaint into one and only one class. You can download the customer complaints dataset [here](https://drive.google.com/file/d/1tC7KWKJzWYdLtrYdwlXHRti4nFCdHHip/view?usp=sharing)

We will use `Pandas` to read the dataset. 

```python
import pandas as pd
```
To read the dataset, use this code:

```python
df=pd.read_csv('customer_complaints')
```
To see the loaded dataset, use this command:

```python
df
```
The dataset output:

![Dataset output](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/dataset-output.png)

From the image above, the dataset has 18 columns. We are interested in the `Product`, `Company` and `Consumer complaint narrative` columns.

The `company` columns show the company from which the customer complaint originated. The `Consumer complaint narrative` column contains the actual customer complaints. The `Product` columns contain the pre-defined complaints classes.

To see the pre-defined complaints classes, run this code:

```python
df['Product'].value_counts()
```
The pre-defined complaints classes output:

![Pre-defined complaints classes](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/pre-defined-complaints-classes.png)

From the image above we have 5 pre-defined complaints classes. The model will classify a customer complaint into one of the complaints classes.

#### Company column
To check the company column, use this code:

```python
df['Company'].value_counts()
```
The company output:

![Company output](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/company-output.png)

The image shows the companies with customer complaints.

#### Renaming `Consumer complaint narrative` column
We rename the column into complaints, using this code: 

```python
complaints_df=df[['Consumer complaint narrative','Product','Company']].rename(columns={'Consumer complaint narrative':'complaints'})
```
The check the dataset with the renamed column, use this code:

```python
complaints_df
```
The dataset output:

![Renamed column](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/renamed-column.png)

### Creating a dictionary object
The dictionary object will encode the pre-defined complaints classes as integer/numeric values. The integer values will be 1-5 and will represent the categorical complaints classes. They will be saved in the `target` variable.

```python
target={'Debt collection':0, 'Credit card or prepaid card':1, 'Mortgage':2, 'Checking or savings account':3, 'Student loan':4, 'Vehicle loan or lease':5}
```
Let's add the `target` variable to our dataset.

```python
complaints_df['target']=complaints_df['Product'].map(target)
```
To check the new dataset, with the added target variable, run this code:

```python
complaints_df
```
The new dataset output:

![New dataset](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/new-dataset.png)

### Dataset splitting
We will split the customer complaints dataset into two sets. One set for model training and the other for model testing. 

We use `train_test_split`.

```python
from sklearn.model_selection import train_test_split
```
To split the dataset, use this code:

```python
X_train, X_test = train_test_split(complaints_df, test_size=0.2, random_state=111)
```
### Text Preprocessing for natural language processing
Text preprocessing is very important in natural language processing. It transforms the raw text into a format that the machine learning model can understand. At this stage, we clean the text dataset making it ready for use.

There are many text preprocessing steps. In this tutorial, we will focus on the following:

- Stemming
Stemming reduces a word into its stem word or root. It removes the word affixes so that only the root remains.

For example, the words “climbing”, “climbed” and “climbers” are all stemmed from the root form “climb”.

- Removing stop words
Stop words are very frequently occurring words in any language. Stop words do not add any value to the model in training. Examples of stop words are conjunctions, pronouns, and articles. Removing stop words will enable the model to focus on words that add value in training. 

- Lower Casing: 
It converts the text dataset to lower case. 

- Tokenization
It breaks up the sentences into smaller units such as phrases and words. This process enables the model to understand the sentences through analyzing the word tokens.

- Removing unnecessary characters
The text dataset may have unnecessary characters that do not add any value to the model in training. We can remove these characters to ensure the model focus on important words.

Natural Language Toolkit (NLTK) will perform these steps. Let's install NLTK.

```bash
!pip install nltk
```
Import `nlt` using this code:

```python
import nltk
```
We can also install the library from NLTK that will perform tokenization.

```bash
nltk.download('punkt')
```
- `punkt` is a pre-trained sentence tokenizer.

#### Stemming
Let's import the algorithm we will use for stemming.

```python
from nltk.stem.snowball import SnowballStemmer
```
To initialize the stemming algorithm, use this code:

```python
stemmer = nltk.stem.SnowballStemmer('english')
```
We will use the `SnowballStemmer` algorithm for stemming.

#### Downloading stop words
We download the English stop words using this code:

```python
nltk.download('stopwords')
stop_words = set(nltk.corpus.stopwords.words('english'))
```
Let's now create a function that will apply all the initialized methods and functions.

### Function
To create the function, we will use Python regular expression RegEx module.

```python
import re
```
From the code above we have imported `re`. It will help us with the regular expression operations(RegEx).

To create the function, use this code:

```python
def preprocessing(text):
   tokens = [word for word in nltk.word_tokenize(text) if (len(word) > 3 and len(word.strip('Xx/')) > 2 and len(re.sub('\d+', '', word.strip('Xx/'))) > 3) ] 
   tokens = map(str.lower, tokens)
   stems = [stemmer.stem(item) for item in tokens if (item not in stop_words)]
   return stems
```
The function is named `preprocessing`. The `nltk.word_tokenize` method will tokenize the text. `word.strip` will remove the unnecessary characters. `str.lower` will perform lower casing and `stemmer.stem` will perform stemming. The function returns the stemmed words.

The function will perform text preprocessing, the next step is to perform vectorization.

### Text vectorization
Text vectorization converts the stemmed words to numerical values. The numerical values are called word vectors. We feed the model with the word vectors in training.

We will use `TfidfVectorizer` for text vectorization.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
```
Let's initialize `TfidfVectorizer` function.

```python
vectorizer_tf = TfidfVectorizer(tokenizer=preprocessing)
```
We now apply the method to both the training and testing dataset.

#### Applying `TfidfVectorizer`

```python
train_vectors = vectorizer_tf.transform(X_train.complaints)
test_vectors = vectorizer_tf.transform(X_test.complaints)
```
### Converting the train and test sets into an array
We convert the train and test sets into an array using the `toarray` method, Run this code:

```python
train_df=pd.DataFrame(train_vectors.toarray())
test_df=pd.DataFrame(test_vectors.toarray())
```
### Creating H2O Data Frame
We will convert our Pandas Data Frame to H2O Data Frame. The H2O will use the created Data Frame during algorithm selection and training.

```python
h2o_train_df = h2o.H2OFrame(train_df)
h2o_test_df = h2o.H2OFrame(test_df)
```
The next step is to add the `target` column to the created H2O Data Frame.

### Adding the target column
The target column contains the model output after making a prediction. The model will classify the customer complaints into the 5 complaints classes.

```python
h2o_train_df['target'] = h2o_train_df['target'].asfactor()
h2o_test_df['target'] = h2o_test_df['target'].asfactor()
```
We are now ready to use H2O AutoML to run multiple models. We will then select the best model.

### Using H2O AutoML to run multiple models
Let's initialize the H2O AutoML algorithm and its parameters.

```python
aml = H2OAutoML(max_models = 10, seed = 10, exclude_algos = ["StackedEnsemble"], balance_classes=True)
```
From the code above we have initialized the `H2OAutoML` algorithm. It has the following parameters:

- `max_models`
It specifies the maximum number of models that `H2OAutoML` will run. It will run 10 models.

- `seed`
It is set to ensure model reproducibility.

- `exclude_algos`
It specifies the algorithms `H2OAutoML` should not use during model training. `H2OAutoML` will skip the `StackedEnsemble` algorithms.

- `balance_classes`
It will handle the imbalanced dataset. We set it to `true` to balances the 5 classes.

### Specifying the y and x variables
The `x` variable contains all the input features during training. The `y` variable contains the output/target column.

```python
x=vectorizer_tf.get_feature_names()
y='target'
```
### Calling the train function
The train function will train the model using the training set. It also performs model evaluation using the testing set.

```python
aml.train(x = x, y = y, training_frame = h2o_train_df, validation_frame=h2o_test_df)
```
- `x`
It specifies the x variable/input features.

- `y`
It specifies the `y` variable/target column.

- `training_frame`
It contains the training dataset.

- `validation_frame`
It contains the testing dataset.

When the code is executed, it will run ten models and produce the following output that shows the AutoML progress:

![Model training](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/model-training.png)

We can check the performance of the ten models using this code:

### Performance of the models

```python
aml.leaderboard
```
`leaderboard` will show the performance of the ten models. It lists the models from the best performing to the least performing. The listed models are shown below:

![Listed models](/engineering-education/building-a-multi-class-text-classification-model-using-h2o-and-sckit-learn/listed-models.png)

From the image above, the best model has a `model_id` of `XGBoost_1_AutoML_1_20220228_125829 `. The least performing model has a `model_id` of `DRF_1_AutoML_1_20220228_125829`. Lets use the best model to make predictions.

### Using the best model
We will use the model to classify an input customer complaint. We use the following input:

```python
input_text = ['I was trying to make a payment toward my university loans on the HELB portal. I was unable login into my HELB portal, the site kept on loading without displaying my student loan balance. I want to know my balance before I can make the payments']
```
Let's apply our `vectorizer_tf` method to this text.

```python
vectorized_text = vectorizer_tf.transform(input_text)
```
Let's now use the best model to make the prediction.

```python
predict= aml.leader.predict(vectorized_text)
```
The `aml.leader` method selects the best model from the list above. The `predict` will classify the input customer complaint.

To print the prediction results, use this code:

```python
print(predict)
```
The prediction output:

```bash
array([4])
```
Using our created dictionary object, 4 represents the `Student loan` class. The input text is related to the `Student loan` class, thus our model has made an accurate prediction.

### Conclusion
We have learned how to build a multi-class text classification model. We developed the model using Scikit-learn and the H2O library. The tutorial also explains the benefits of H2O and how to install it.

We also performed text preprocessing using Natural Language Toolkit. Using the clean dataset, we trained a model that classifies customer complaints. H2O runs multiple models and we used the best model to make predictions.

To get the multi-class text classification model we have trained in this tutorial, click [here](https://colab.research.google.com/drive/1R2lUqZlaXOTHJSlY65ykxoKEw47JyHMx?usp=sharing)

### References
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Text-pre-processing-techniques](https://www.analyticsvidhya.com/blog/2021/09/essential-text-pre-processing-techniques-for-nlp/)
- [H2O AutoML documentation](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/automl.html)
- [H2O GitHub](https://github.com/h2oai/h2o-3)
- [Notebook for this tutorial](https://colab.research.google.com/drive/1R2lUqZlaXOTHJSlY65ykxoKEw47JyHMx?usp=sharing)