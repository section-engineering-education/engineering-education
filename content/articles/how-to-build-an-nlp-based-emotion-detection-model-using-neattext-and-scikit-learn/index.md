 Natural language processing helps computers to understand speech and written text like a human being. This helps machines to compute necessary responses.

 One of the NLP applications is emotion detection in text. The emotion detection model is a type of model that is used to detect the type of feeling and attitude in a given text. It may be a feeling of joy, sadness, fear, anger, surprise, disgust, or shame. An emotion detection model can classify a text into the following categories.

Using emotion detection in the text, businesses can know how customers feel about their brand and products. This helps businesses to improve product quality and service delivery.

In this tutorial, we will use Neattext and Scikit-learn in building our model.  Neattext is a Python library that is used to pre-process our dataset. Neattext will clean the text dataset by removing stop words and other noise. This makes it easy for the model to use the dataset during training.

We then use Scikit-learn in building our model. It contains all the algorithms required for classification. This is a practical guide from data preprocessing to model building and testing.

### Table of contents
- [Prerequisites](#prerequisites)
- [Exploring our dataset](#exploring-our-dataset)
- [Loading dataset](#loading-dataset)
- [Getting started with Neattext](#getting-started-with-neattext)
- [Importing machine learning packages](#importing-machine-learning-packages)
- [Model features and labels](#model-features-and-labels)
- [Dataset splitting](#dataset-splitting)
- [Pipeline approach](#pipeline-approach)
- [Model fitting](#model-fitting)
- [Calculating the accuracy score](#calculating-the-accuracy-score)
- [Making a single prediction](#making-a-single-prediction)
- [Conclusion](#conclusion)
- [Reference](#references)

### Prerequisites
- You must know [Python](/engineering-education/python-projects-for-beginners/) programming.
- You must know how to build [machine learning models.](/engineering-education/house-price-prediction/).
- You must know how to work with [Pandas](https://numpy.org/) and [Numpy.](https://numpy.org/).
- Have some knowledge of [natural language processing.](/engineering-education/how-to-create-nlp-application-with-flair/)

> NOTE: In this tutorial, we will use [Google Colab](https://research.google.com/) to build our model.

### Exploring our dataset
In this tutorial, we will use a dataset that contains various texts with different emotion labels. The dataset has a total of eight emotion labels as follows. Joy, sadness, fear, anger, surprise, neutral, disgust, and shame.

The dataset will be used during the training phase. The trained model will then be used to classify a given text into the emotion labels.

The snip of the dataset is shown below.

![Dataset snip](/engineering-education/how-to-build-an-nlp-based-emotion-detection-model-using-neattext-and-scikit-learn/dataset-snip.png)

To get this dataset in CSV format, click [here](https://drive.google.com/file/d/1tamvXZzgcYcHRr3GwFk8C4LVVaWHMqt0/view?usp=sharing)

Let's now load this dataset into our Google Colab notebook.

#### Loading exploratory data analysis packages
We import two exploratory data analysis packages, pandas and Numpy. We will use pandas to read our CSV file and load it into our Google Colab notebook. Numpy is used to perform mathematical computations in our dataset. It also works with arrays.

```python
import pandas as pd
import numpy as np
```
Let's use `pandas` to load our dataset.

### Loading dataset
Use the following command to load the dataset.

```python
df = pd.read_csv("emotion-dataset.csv")
```
To see how the dataset is structured use this command.

```python
df.head()
```
The output is shown below.

![Dataset structure](/engineering-education/how-to-build-an-nlp-based-emotion-detection-model-using-neattext-and-scikit-learn/dataset-structure.png)

From the image above we can see that our dataset has two columns: `Emotion` and `Text`. The emotion column represents the various emotion labels. The text shows all the texts in our dataset.

Let's now show the value count for each emotion. This will give the total number of texts for each emotion label.

```python
df['Emotion'].value_counts()
```
The output is shown below.

![Value count](/engineering-education/how-to-build-an-nlp-based-emotion-detection-model-using-neattext-and-scikit-learn/emotion-value-count.png)

Let's now start cleaning our dataset using Neattext.

### Getting started with Neattext
As mentioned earlier, Neattext is a Python library that is used to pre-process our dataset. Neattext will clean the text dataset by removing stop words and other noise.

To install Neattext, run this command.

```python
!pip install neattext
```
Let's import `neattext` as follows.

```python
import neattext.functions as nfx
```
To use `neattext`, let's list all the methods and attributes used by `neattext` for data cleaning.

```python
dir(nfx)
```
The output for the methods and attributes is shown below.

![Methods and attributes](/engineering-education/how-to-build-an-nlp-based-emotion-detection-model-using-neattext-and-scikit-learn/methods-attributes.png)

We are interested in only two methods from the list: `remove_stopwords` and `remove_userhandles`.

#### Removing user handles
The dataset contains some Twitter handles of different users. This is noise to our dataset, and it's unnecessary. We use`remove_userhandles` to remove them from our dataset.

```python
df['Clean_Text'] = df['Text'].apply(nfx.remove_userhandles)
```
We use `apply()` to add `remove_userhandles`. We save the cleaned dataset into a new column named `Clean_Text`.

#### Removing stopwords
Stopwords is a list of all the commonly used words in any language. The words being common they have little classification power. These words may lead to model bias during training.
Common stopwords are like articles of a given language.  In the English language they include: `the`, `is`, `and` and `are`.

```python
df['Clean_Text'] = df['Clean_Text'].apply(nfx.remove_stopwords)
```
In this section, we also use `apply()` to add `remove_stopwords`. We save the cleaned dataset into a new column named `Clean_Text`.

To get the output of the clean dataset, run this command.

```python
df
```
The output of the dataset after removing user handles and stopwords is shown below.

![Clean dataset](/engineering-education/how-to-build-an-nlp-based-emotion-detection-model-using-neattext-and-scikit-learn/clean-dataset.png)

Now that we cleaned our dataset, let's load our machine learning packages.

### Importing machine learning packages

```python
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
```
From the code above, we have imported the following.

#### LogisticRegression

`LogisticRegression` is an algorithm used for both classification and regression. This algorithm is imported from [Scikit-learn](https://scikit-learn.org/stable/). Will be used for emotion classification.

#### CountVectorizer

Machine learning models have a problem comprehending raw text. Machines cannot process the raw text data and it has to be converted into a matrix of numbers. Machines work well with numbers.

CountVectorizer is used to convert the raw text into a matrix of numbers. This process depends on the frequency of each word in the entire text. During this process, `CountVectorizer` extracts important features from the text. They are then used as input for the model during training.

#### train_test_split

This method is important during the splitting of the dataset. It splits the dataset set into two sets, a train set, and a test set. This depends on the percentage specified by the user.

#### accuracy_score

This is important when calculating the accuracy score of our model during prediction.

Let's now specify our features and labels.

### Model features and labels

Features are the attributes and variables extracted from the dataset. These extracted features are used as input for the model during training. The model learns from features. Our feature is the `Clean_Text` column.

Labels are the output or the target variable. Our label is the `Emotion` column, this is what the model is predicting.

```python
Xfeatures = df['Clean_Text']
ylabels = df['Emotion']
```
### Dataset splitting

We need to split our dataset into a train set and test set. The model will learn from the train set. The test set will be used to evaluate the model performance. It also measured the model's knowledge capability.

We specify the `test_size=0.3`, this will spit our dataset as follows. `70%` of data will be used for training and `30%` for testing.

To make the process of our model faster and automated, we will use a machine learning pipeline. Machine learning pipelines automate the machine learning workflows such as model fitting and training.  Doing so saves the developers time and reduces model errors.
Machine learning pipeline is a new approach adopted by many developers. It produces quality models which are free from bugs.

To use this pipeline approach, we need to import the `Pipeline` package.

### Pipeline approach

Let's import the `Pipeline` using the following code.

```python
from sklearn.pipeline import Pipeline
```
To use `Pipeline` we need to specify the machine learning stages we want to automate. In this tutorial, we have two processes we want to automate.

The first stage is the `CountVectorizer` process. This stage is used to convert the raw text dataset into a matrix of numbers that a machine can understand.

The second stage is the model training process using the `LogisticRegression` algorithm. In this stage, the model learns from the dataset. During training, it understands patterns. It gains knowledge and uses the knowledge to make predictions.

Let's initialize the two stages.

```python
pipe_lr = Pipeline(steps=[('cv',CountVectorizer()),('lr',LogisticRegression())])
```
After initializing the two stages, we need to fit these stages into our dataset. We will use the train set dataset which is specified as `x_train` and `y_train`

### Model fitting

To fit the pipeline stages into `x_train` and `y_train`, run this code.

```python
pipe_lr.fit(x_train,y_train)
```
The `Pipeline` will run the following stages automatically and produce the following output.

![Pipeline ouput](/engineering-education/how-to-build-an-nlp-based-emotion-detection-model-using-neattext-and-scikit-learn/pipeline-otput.png)

This process produces the optimal model that will give the best results. With time the model will improve on its own and give better prediction results.

Let's check the accuracy score produced by our `Pipeline.`

### Calculating the accuracy score

To check the accuracy score, run this command.

```python
pipe_lr.score(x_test,y_test)
```
The output is shown below.

```bash
0.8200421536692853
```
When the accuracy score is expressed as a percentage it becomes `82.0%`. This is a high accuracy after the first phase of training. Through continuous training, the model will increase the accuracy score. The higher the accuracy score the better model in making predictions.

Let's use this model to make a prediction.

### Making a single prediction

A model should be able to classify a given text into emotion labels. Let's use a sample text.

```python
sample1 = "This chocolate was very sweet it made me happy"
```
Let's now use our model to make the prediction.

```python
pipe_lr.predict([sample1])
```
We use the `predict` method to predict our sample text. The prediction outcome is shown below.

```bash
array(['joy'], dtype=object)
```
The prediction outcome is `joy`, this is the right prediction. This shows that our model can accurately predict. It can be adopted and deployed to production.

### Conclusion

In this tutorial, we have learned how to build an emotion detection model using Neattext and Scikit-learn. We started by cleaning our dataset using Neattext. The dataset has to be in the right shape before it is used for training.

We then started exploring the different machine learning packages and algorithms to use. We used the logistic regression algorithm to build our emotion detection model. We also introduced a concept known as machine learning pipeline. The pipeline approach made our work easier. It automates the `CounterVectorizer` process and model building.

Finally, we used this model to make a prediction, the model was able to make accurate predictions. This concludes that the model can be adopted by any business. Using the model, a business can use to monitor online conversations and reviews made by customers. This gives businesses an added advantage on how to improve their brand image.

To get the Google Colab notebook for this tutorial, click [here](https://colab.research.google.com/drive/1y6Xd9DqAtKgTE8P4wkwjbK1X7Mu90oMD?usp=sharing)

### References
- [Google Colab notebook](https://colab.research.google.com/drive/1y6Xd9DqAtKgTE8P4wkwjbK1X7Mu90oMD?usp=sharing)
- [Neattext documentation](https://pypi.org/project/neattext/)
- [Scikit-learn documentation](https://scikit-learn.org/stable/)
- [Getting started with machine learning pipeline](https://valohai.com/machine-learning-pipeline/)
- [Pandas Documentation](https://pandas.pydata.org/)
- [NumPy Documentation](https://numpy.org/)
