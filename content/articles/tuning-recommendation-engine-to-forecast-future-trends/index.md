![](hero.jpg.jpg)
### How To Tune Recommendation  Engine To Forecast Future Trends.
#### Introduction
We begin this article by describing what a recommendation system is and how we can go about to tune it. To achieve this, we would follow the steps listed below in no particular order:
- What is a Recommendation Engine?
- Deeper Look into building a Recommendation Model.
- Building the Algorithm and Classification Model.
- Fine-tuning our Recommendation model.
- Conclusion.

In this article, we will consider some steps required to build a recommendation engine using an educational recommendation engine as a case study. This engine is capable of recommending the best learning materials to users and is going to be built with an algorithm that functions from the user’s history pattern. 
This educational app aims to assist users by suggesting the choicest materials to aid their study. This article further explains how users’ history patterns can suggest better ways to source for these materials using a recommendation model. 

#### Prerequisite:
- Knowledge of Python programming.
- Knowledge of Data Science.
- Basic knowledge of mathematical concepts (statistics).

                      
#### What is a recommendation model?

In the second half of 1970s, the first manifestation of recommender systems was noticed at the Usenet communication system which was created by the Duke University. This discovery was carried out during some research work by researchers in the field of cognition science and information retrieval. 

Some years later, the recommender system evolved into two different directions, namely: 
-  Collaborative filtering.
-  Content-based filtering.

Collaborative filtering attempts to map (profile) the taste of users and offers content to the user based on past similar preferences they made. While  Content-based filtering is about knowing the dimensions of the entity to be recommended. A good example is a musical content recommendation system that can consider the following dimensions: style, artist, era, orchestration, etc and the user’s preferences for these characteristics. Thus, every time a user likes another song, this new information to their profile.

In 1994, the first solution on how to combine these two recommender systems became possible, achieved by two Stanford students. They pointed out that the hybrid system helps reduce the individual shortcomings of the two systems. This hybrid model consists of two basic processes: first, to collect content for specific topics (such as websites or articles about financial topics), then for each user they select those items collected from specific subjects which will interest them.

We are now going to combine these two recommender systems using two approaches: 
By embedding one approach in another.
Giving a joint recommendation as a result of the two procedures, such as Netflix. Netflix’s and CineMatch’s algorithms are good examples of how these approaches have been successful. In early 2000s, these approaches acted as a serious catalyst for both research, and the scientific fields.
Also, from the 2006 Netflix Award’s challenge, it's evident that the recommender algorithms are at least 10% better than the results of CineMatch due to the 100 million film reviews received.

Today, Recommendation systems are all around us and used to suggest relevant items to users based on different factors and data. Top companies including Netflix, LinkedIn, and Amazon the power of recommendation systems to suggest personalized items to users.
Some companies now resolve to use customer data and machine learning(ML) algorithms to build a recommendation model that can accurately suggest the best and most suitable service or product to their customers. Some of the benefits of the Recommendation system include but are not limited to the following:

The Recommender system helps to quickly provide personalized suggestions.
- The Recommender system provides personalized suggestions.
- It supports precise marketing.
- It facilitates smarter travel choices for tourists.

It also supports precise marketing.

These techniques are widely adopted by online businesses to track customers' orders and history patterns. The information gathered from customers data sets helps these businesses in the following areas: 
- Making less error-prone decisions.
- Sales/marketing departments to improve their sales figures.
- Digital marketers and SEO experts can project where their line of advertisements should focus on to convert and onboard target audiences into loyal and reliable customers. 
- Data Analysts rely on good sources of information like is Google Analytics and the likes to forecast future trends and make informed business decisions.
- The recommender systems operating in the online customer space helps to customize the storefront according to the current taste and needs of the customers. This also creates an almost unbeatable competitive advantage for online shops over traditional onsite store purchases.

The next subtopic below contains some well-explained procedures involved in tuning a recommendation model.

#### Deeper Look into building a Recommendation Model
Getting alternatives or close substitutes for goods or some certain goods is an issue to a certain individual. Let’s consider parents who are concerned about monitoring  what content their wards consume online. Such a parent would purchase the right movies that are free from adult content for their children. Therefore, the Recommendation Model, plays a key role here and can be used to recommend movies, music, e.t.c based on certain features in the data set to an individual, a group, or a parent.

There are three (3)  types of recommendation models. They are:
- Simple recommender.
- Content-based recommender.
- Collaborative filtering engines.

In this article, we will be using the content-based recommendation model. The content-based recommendation model suggests similar items based on a particular item. This system uses item metadata, such as genre, director, description, actors for the movie recommendation. The general idea behind this particular type of recommendation system is that if a person likes a particular item, they will also like an item that is similar to it. This similarity in choices makes it easier for the recommendation model to recommend the next item. Here, the recommendation model makes use of the user's past item metadata. A good example is YouTube, with a lot of videos online and topics on different subject matter. The recommendation system is then used to determine the favorite choice of a user’s video ‘suggestion list’ based on the previous history. This algorithm pattern continues and keeps on suggesting new videos that you could potentially watch.

#### BUILDING THE ALGORITHM MODEL
In building this algorithm (model) for our case study, we are going to use the Python programming language because of its robust libraries and the fact that it is faster, precise, and more accurate when it comes to scientific calculations. 

#### BUILDING THE CLASSIFICATION MODEL
We will build this classification model using the ‘Cosine Similarity matrix’. The cosine similarity matrix helps to take the distance between points. For instance, let us consider some points and we name them : X1, X2, X3, X4…….Xn. 
We will then check closely and make our observations on the relationship within these points X1,X2,X3,X4...........Xn. 
Note that, if the distance between two certain points are close ,we will group them as related i.e(positive) but if the distance between points   X1,  X2,  X3, X4……….Xn are far apart, we will group them as (negative) or we can also refer to them as dissimilar or unrelated.
Furthermore, we are going to use a set of movie data-set to build these models. The movie set we will make use of here was gotten from UCI which is a machine learning repository for the data source.
Now we will go through the process of building the recommendation model in python, using some specific libraries.
In building this model, the first thing we will have to do is to build our environment using this command: ‘Python -m venv venv’.
After that you install the following packages using ‘pip install’ for windows users while for Linux users you use ‘pip3 install’:
- Sklearn
- Numpy
- Pandas
- Matplotlib
- Jupyter notebook/Jupyter lab

The sklearn is used for scientific calculation, pandas are used for loading the data into the notebook in other for me to be able to work with, Matplotlib is used for plotting of graphs, Numpy is being used for mathematical computation while Jupyter notebook/Jupyter lab is an environment where the python code will be written.

#### About Data-set
This dataset files contain metadata for all 45,000 movies listed in the Full MovieLens Dataset. The dataset consists of movies released on or before July 2017. This dataset captures feature points like overview, plot, budget, revenue, posters, release dates, languages, production companies, countries, TMDB vote counts, and vote averages.
These feature points could be potentially used to train machine learning models for content and collaborative filtering.

This dataset consists of the following files:
movies_metadata.csv: This file contains information on approximately 45,000 movies featured in the Full MovieLens dataset. Features include posters, backdrops, budget, genre, revenue, overview, release dates, languages, production countries, and companies.  And this will be the dataset we would use for building the recommendation model.

The Full MovieLens Dataset comprises 26 million ratings and 750,000 tag applications, from 270,000 users on all the 45,000 movies in this dataset. It can be accessed from [GroupLens website] (https://grouplens.org/datasets/movielens/latest/)

```python
import os. types
import pandas as pd
import joblib
import numpy as matplotlib.pyplot as pil

from sklearn.feature_extraction.text import Tfidfvectorizer
from sklearn.feature_extraction.text import Countvectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval

```
The above code snippet shows a function that loads a dataset.

#### Snippet of libraries 
To load the dataset, we will make use of the pandas DataFrame library. The panda’s DataFrame library is mainly used for data manipulation and analysis. It helps to represent your data set in a row-column format. Pandas DataFrame library is backed by the NumPy array for the implementation of pandas data objects. Pandas offer off-the-shelf data structures and operations for manipulating numerical tables, time series, imagery, and natural language processing datasets. Pandas are useful for those datasets which can be easily represented in a tabular fashion.


#### Loading Dataset

![ Fig 1 shows some set of loaded dataset](image2.0.PNG)
 Fig. 1 shows some datasets that have been loaded

Next, we will check for missing values in our data set. This is done to avoid bias in our models. From the code snippet below there are missing values in our dataset. To avoid the models from being biased, we deal with the missing values by replacing them with the mean and mode of the column.

![Fig 2 showing: checks for missing values](image3.0.PNG)
Fig. 2 shows the for missing values checks that has been carried out


![Fig 3 showing the fixing missing values of the mean and mode](image4.0.PNG)
Fig. 3 shows how the missing values of the mean and mode were fixed
#### Plot Description Based Recommender
In this section, we will be building a system that recommends movies that are similar to a particular movie. To achieve this, we will compute pairwise cosine similarity scores for all movies based on their plot descriptions and recommend movies based on that similarity score threshold.
The plot description is available as the overview feature in my movie dataset. Let's inspect the plots of these movies:
 

![Fig 4  shows an Overview](image5.0.PNG)
Fig. 4  shows an Overview 

Since we have to deal with the Natural Language Processing problem. And it is not possible to compute the similarity between any two overviews in their raw forms. To do this we will have to compute the word to vectors of each overview or document. 
As the name suggests, word vectors are vectorized representations of words in a document. The vectors carry a semantic meaning with them. For example, man & king will have vector representations close to each other while man & woman would have representation far from each other.
We will be computing Term Frequency-Inverse Document Frequency (TF-IDF) vectors for each document. This will give us a matrix where each column represents a word in the overview vocabulary (all the words that appear in at least one document), and each column represents a movie, as before.
The TF-IDF score is the frequency of a word occurring in a document, down-weighted by the number of documents in which it occurs. This is done to reduce the importance of words that frequently occur in plot overviews and, their significance in computing the final similarity score.

In this case, we are going to use the sci-kit-learn library which has a built-in TF-IDFVectorizer class that produces the TF-IDF matrix. To make the algorithm work properly without any bias, we remove words that are not relevant to the topic. An example of such words includes ‘like’, ‘the’, ‘an’, ‘on’, e.t.c.
				

#### A Snippet of TF-IDF Matrix

![Fig 5 showing TF-IDF matrix.](image6.0.PNG)
Fig. 5 shows the TF-IDF matrix

From the above output, we can observe that 22645 different vocabularies or words in our dataset have 5157 movies. With the TFI-DF matrix, it will be easier for us to compute the cosine similarity. This cosine similarity helps to calculate a numeric quantity that denotes the similarity between two movies. 
This can be mathematically expressed as:

![Cosine formula calculation](image6.0b.PNG)
The image above shows the cosine formula calculation that shows similarity.

Since we used the TF-IDF vectorizer, calculating the dot product between each vector will directly give us the cosine similarity score. Next, we will use sklearn’s linear_kernel() instead of cosine_similarities() because it is faster. This would return a matrix of shape 5157x5157, which means each movie overview cosine similarity score with every other movie overview. Hence, each movie will be a 1x5157 column vector where each column will be a similarity score with each movie.

![Fig 6 shows the computation of the TF-IDF matrix.](image7.0.PNG)
Fig. 6 shows the computation of the TF-IDF matrix

We are now going to define a function that takes in a movie title as an input and outputs a list of the 10 most similar movies. For us to do this, we will need a reverse mapping of movie titles and DataFrame indices. Also, we will need a mechanism to identify the index of a movie in the Movie DataFrame, given its title. 

```python
def get_recommendations[title, cosine_sim=cosine_sim]:
	idx = indices[title]

	sim_scores = list(enumerate(cosine_sim[idx]))

	sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

	sim_scores = sim_scores[1:11]

	movie_indices = [i[0] for i in sim_scores]

	return metadata['title'].iloc[movie_indices]

```
The above code snippet shows a function of our recommendation model

A snippet of the Recommendation model

![Fig 7 showing recommendation model.](image8.0.PNG)
Fig. 7 shows the recommendation model of our movie

After getting the function, we will then save it using joblib and generate the requirements using the command pip freeze > requirements.txt. This will help us to avoid some environmental variable issues while deploying the model on any hosting site, also it will make it easier for other machine learning engineers to contribute and improve on the model. 
  

#### FINE-TUNING THE RECOMMENDATION MODEL.

To fine-tune the recommendation system model, we will have to build a system based on some metadata which includes: ‘casts’, ‘crew’, ‘keywords’, and ‘genres’.
This will help to increase the performance of the recommendation model by capturing more of the finer details.
Here, we will be using a Kaggle notebook to run the model because of the availability of GPU. GPU means Graphics Processing Unit, it is useful because it helps in faster execution of the model.

```python
import warnings
warnings.filterwarnings('ignore')


import os, types

import pandas as pd
from botocore.client import config

import joblib
import numpy as np
import matplotlib.pyplot as plt

from sklearn.feature_extraction.text import Tfidfvectorizer
from sklearn.feature_extraction.text import Countvectorizer
from sklearn.metrics.pairwise import linear_kernel
from sklearn.metrics.pairwise import cosine_similarity
from ast import literal_eval
from sklearn.model_selection import train_test_split

```
		

#### Loading Dataset
We are going to load the dataset from three different data tables and merge them all in one dataframe.
To do this, we will, first of all, convert the id’s columns of the individual dataframe to integers, this conversion makes it easier for them to be merged as one.

```python
recom_model_mov = pd.read('..input/the-movies-dataset/movies_metadata.csv', low_memory=True)
recom_model_key = pd.read('..input/the-movies-dataset/keywords.csv', low_memory=True)
recom_model_credits = pd.read('..input/the-movies-dataset/credits.csv', low_memory=True)

recom_model_mov = recom_model_mov.drop([19730, 29583,35587])
recom_model_mov['id'] = recom_model_mov['id'].astype(int)
recom_model_key['id'] = recom_model_key['id'].astype(int)
recom_model_credits['id'] = recom_model_credits['id'].astype(int)

Merging Dataframe tables by id

recom_model_mov = recom_model_mov.merge(recom_model_credits, on='id')
recom_model_mov = recom_model_mov.merge(recom_model_key, on='id')

```

#### Loading and Merging dataframe

			
#### Selecting the Features
Since we are trying to tune the model to get a more robust recommendation system that will be perfect for recommending movies that have similar features. We can achieve this by extracting four features from the merged dataframe. These features include cast, crew, genres, and keywords. With these features, we will be able to build a model that can tell us the movies that have the same storyline and actions. For instance, if you have watched a movie, and perhaps went ahead to like it, a similar movie will be recommended to you, this is not done by accident or magic, it is all algorithm model at play here. This is why you notice that there are certain movies that children of a certain age can view (parental guidance and restrictions).
Back to our steps, so next, we will have to first convert the data from Stringfield lists using the literal_eval for safe evaluation and expression.

#### Features Selections

```python
features = ['cast', 'crew','keywords','genres']
for feature in features:
	recom_model_mov[feature] = recom_model_mov[feature].apply(literal_eval)
```

#### Function for Extraction of Required Information.

We create a function that will help in extracting the required information from our features such as the directors, title, cast, keywords, and genres.

#### Snippet of Function
```python
def get_director(x)
for i in x:
	if i['job'] == 'Director':
		return i['name']
return np.nan

def get_list(x):
	if isinstance(x, list):
		names = [i['name'] for i in x]

		if len(names) > 3:
			names = names[:3]
		return names

	return []		
```

```python
recom_model_mov['director'] = recom_model_mov['crew'].apply(get_director)
features = ['cast', 'keywords','genres']
for feature in features:
	recom_model_mov[feature] = recom_model_mov[feature].apply(get_list)


	recom_model_mov[['title','cast','director','keywords', 'genres']].head(3)

```

#### Function For Cleaning Dataset
To improve the quality of our recommendation model, increase productivity and do away with incorrect information we will have to clean our dataset.

```python
def clean_data(x):
	if isinstance(x, list):
		return [list.lower(i.replace(" "," ")) for i in x]
    else:
		if isinstance(x, str):
		return [str.lower(x.replace(" "," "))
    else:
	return ''
recom_model_mov[feature] = recom_model_mov[feature].apply(get_list)

features = ['cast','keywords','director','genres']

for feature in feautures:

recom_model_mov[feature] = recom_model_mov[feature].apply(clean_data)

```

#### Snippet


Since we have cleaned our dataset, we are now in a position to create a function that contains all the features that we have to feed to our vectorizer.
This function will join all the feature columns and the output will be used to build the model.
				

#### Snippet

```python
def create_soup(x):
	return " ".join(x['keywords'])+" "+" ".join(x['director']+" "+" ".join(x['genres']))


	recom_model_mov['soup'] = recom_model_mov.apply(create_soup, axis=1)

	
	recom_model_mov[['soup']].head()

	tfidf_count = TfidfVectorizer(stop_words='english')
	tfidf_matrix = tfidf_count.fit_transform(recom_model_mov['soup'])


	tfidf_matrix.shape
```

From the output, we can see that there are 9879 vocabularies in the features that we feed to our vectorizers. 
Next, we will use the cosine similarity to measure the distance between two embeddings.

	
#### Application of cosine-similarity

```python
cosine_similarity_matric = cosine_similarity(tfidf_matrix, tfidf_matrix)

metadata = recom_model_mov.reset_index()
indices = pd.series(metadata.index, index=metadata['title'])


def get_recommendations(title, cosine_sim=cosine_sim):
	idx = indices[title]

	sim_scores = list(enumerate(cosine_sim[idx]))

	sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

	sim_scores = sim_scores[1:11]

	movie_indices = [i[0] for i in sim_scores]

	return metadata['title'].iloc[movie_indices]
```

#### Snippet of output

```python
get recommendations('The Godfather', cosine_similarity_matric)

```
The above code snippet shows a function for Fine-tuned model for better perfomance
![Fig 8 shows output of recommended movies.](image9.0.PNG)
Fig. 8 shows the output of recommended movies

#### CONCLUSION
In this article, we were able to fine-tune our movie recommendation model. We also gave a brief introduction to Machine Learning and Artificial Intelligence. By now, we all agree that recommender systems are here to stay. They are widespread and popular among users drowning in the flood of information. The success of these solutions is indisputable and has irrevocably become part of our lives, let’s just think about Youtube or Facebook, we will then realize that we can also consider ways where we can channel this knowledge or data sets into positive use. 
If you have any questions, don't hesitate to contact me on: 

- [Peter Aideloje LinkedIn] (https://www.linkedin.com/in/peter-aideloje-64aab6116//)
- [Peter Aideloje Github] (https://github.com/aidelojep)
- [Peter Aideloje Twitter handle] (https://twitter.com/PAideloje)
