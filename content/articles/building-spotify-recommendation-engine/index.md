---
layout: engineering-education
status: publish
published: true
url: /building-spotify-recommendation-engine/
title: Building a Music Recommendation Engine
description: In this article we will discuss and build a recommendation engine from scratch using popular deep learning frameworks.
author: tanmoy-ghosh
date: 2021-10-07T00:00:00-18:00
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-spotify-recommendation-engine/hero.png
    alt:  example image
---
Ever wondered how Spotify predicts a new playlist to a user based on the users current playlist or how YouTube predicts the following video users might want to watch next. Is this magic? 
<!--more-->
This happens because of machine learning-based recommendation systems. The recommendation system is a machine learning-based model that helps users discover new products or services based on users' past preferences. 

The recommender system has become an essential element in the digital world, where users may confuse themselves due to an abundance of data. Thus, this feature can help users pick a product or service that perfectly fits their preference.

### Table of contents
- [Prerequisites](#prerequisites)
- [Key takeaways](#key-takeaways)
- [Introduction](#introduction)
  - [What is a Recommendation System?](#what-is-a-recommendation-system)
  - [Types of Recommendation Systems](#types-of-recommendation-systems)
  - [Content-Based Filtering](#content-based-filtering)
  - [Collaborative Filtering](#collaborative-filtering)
  - [How to use Spotify Web API to fetch data](#how-to-use-spotify-web-api-to-fetch-data)
- [Implementation](#implementation)
  - [Feature Engineering](#feature-engineering)
  - [Connecting to Spotify Web API](#connecting-to-spotify-web-api)
  - [Creating Playlist Vector](#creating-playlist-vector)
  - [Generating Recommendations](#generating-recommendations)
- [Few Points to Ponder](#few-points-to-ponder)
- [Conclusion](#conclusion)
  
### Prerequisites
The reader should have basic knowledge of Python libraries like [pandas](https://pandas.pydata.org/), [numpy](https://scikit-learn.org/stable/), [scikit-learn](https://scikit-learn.org/stable/), and the basics of vector algebra. 

Readers are also requested to go through the documentation of the [Spotipy](https://spotipy.readthedocs.io/en/2.19.0/) library. *Spotipy* is a lightweight Python library that we will be using to access the [Spotify Web API](https://developer.spotify.com/documentation/web-api/).

### Key takeaways
By the end of this blog, you will know the following:
- How Recommendation Systems work.
- Types of Recommendation Systems.
- Mathematics behind Recommendation Systems.
- Implementing a Spotify playlist Recommender Engine from scratch using Python.

### Introduction
#### What is a Recommendation System?
A Recommendation System aims to predict the user's choices and recommend the product or service that is likely to be interesting. 

These systems can do so because of user data. The function of a Recommendation System mainly depends on two kinds of information:
1. Characteristic information: Information that defines the profile of a product (tag, category, etc.) or a user (preferences, profile, etc.).
2. User-item interactions: Information that defines user-item relationship (rating, like/dislike, etc.).

Based on this, we can categorize two broad classes of the algorithm used in a Recommendation System.

#### Types of Recommendation Systems
- Content-Based Filtering
- Collaborative Filtering 

#### Content-Based Filtering
Content-Based Filtering systems use characteristic information that recommends new items/products to a user based on their past actions or explicit feedback. To explain it further, we will be taking an example of a simple Spotify song recommender. 

The figure below shows a feature matrix where each row represents a song, and each column represents a feature. Let's say features of the song include genre, and the matrix is binary such that the non-zero value represents that the song has that feature present. 

The user will also be represented in the same feature space. Some user-related features will be provided explicitly by the user, and other features will be implicit based on the characteristic information.

![feature-matrix](/engineering-education/building-spotify-recommendation-engine/feature-matrix.JPG)
 
Now, this model should recommend songs that users may find interesting. First of all, we will have to pick a similarity metric, like **cosine similarity**. Then the model must score each candidate according to this similarity metric, and then the model will recommend according to this score. 

The higher the score, the more the probability of the user finding that song of his/her interest.
This blog will use cosine similarity as a similarity metric to implement the Spotify Playlist recommender. But, first, let us understand it mathematically.

#### Cosine similarity
>Cosine similarity is the cosine of the angle between two n-dimensional vectors in an n-dimensional feature space. It is the dot product of the two vectors divided by the product of the magnitude of two vectors.

![equation](/engineering-education/building-spotify-recommendation-engine/equation.jpg)

To understand it better, let us take an example of two items, item 1 and item 2, and two features $x_1$ and $x_2$, which define an item. The plot below represents item 1 and item 2 as vectors in a feature space.

![cosine-similarity](/engineering-education/building-spotify-recommendation-engine/cosine-similarity.png)

The lesser the angle between vectors more the cosine similarity.

#### Collaborative filtering
Collaborative filtering systems use user-item interactions to generate recommendations. This means collaborative filtering uses similarities between users and items simultaneously to provide recommendations. Let us refer to the diagram below.

![collaborative-filtering](/engineering-education/building-spotify-recommendation-engine/collaborative-filtering.JPG)

As we can see in the diagram, there are two users, user A, and user B. Both users have similar tastes in music as both of them liked song-1 and song-2, but there is a song-3 which user A likes, but user B never listened to it. The system will recommend song-3 to user A based on these user-item interactions.

As in this blog, the recommender system that we will implement is based on Content-Based Filtering. Therefore, we are going to limit our discussion of the Collaborative-Filtering system up to its definition. 

For further reference, you can refer to this informative [article](https://developers.google.com/machine-learning/recommendation/collaborative/basics) from Google.

#### How to use Spotify Web API to fetch data
For this blog, we will implement a custom playlist recommender for which we will require our current Spotify playlist data, which we will generate further recommendations.

For this purpose, Spotify provides a web API to create a custom application and fetch Spotify data. The Spotify Web API endpoints return JSON metadata about music artists, albums, and tracks directly from the Spotify Data Catalogue based on simple REST principles.

![api](/engineering-education/building-spotify-recommendation-engine/web-api.JPG)

#### Simple steps to use Spotify Web API
Open the Spotify Web API [dashboard](https://developer.spotify.com/dashboard/login). Log in using your Spotify account credentials. After logging in, your homepage will look something like this:

![dashboard](/engineering-education/building-spotify-recommendation-engine/dashboard.png)

Now click on create an application. This will generate a unique client id and password, which will be used further.
Let us open the application.

![application-page](/engineering-education/building-spotify-recommendation-engine/spotify-api.png)

Go to the edit settings options and add your localhost URL. It will be used for user authentication later. Now we are all set to implement a Spotify-based playlist recommender system. 

For more information on Spotify Web API and its usability, you can refer to this [blog](https://stmorse.github.io/journal/spotify-api.html) by Steven Morse, which explains the above process in more detail.


### Implementation
To access the Spotify Web API, we will use a python-based library known as Spotipy, so let us first install this library. 

```python
pip install spotipy
```
Now import the following libraries

```python
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
from spotipy.oauth2 import SpotifyOAuth
import spotipy.util as util

from skimage import io
import matplotlib.pyplot as plt
import pandas as pd
from datetime import datetime


from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
```

We will require additional data related to the features of songs present in the Spotify application for this implementation. Using these features, we will determine the similarity between our playlist and the songs not in our playlist. Based on the similarity, we will get a new playlist recommended.

For this purpose, I have used a Kaggle dataset. You can download the dataset from [here](https://www.kaggle.com/zaheenhamidani/ultimate-spotify-tracks-db). 

```python
spotify_data = pd.read_csv('data\SpotifyFeatures.csv')
spotify_data.head()
```

![snapshot](/engineering-education/building-spotify-recommendation-engine/snapshot-1.JPG)

#### Feature engineering
In the dataset, we can observe that multiple columns represent the possible features for a song. Out of these, few features are categorical (columns having discrete values) like genre, key, popularity index, etc. 

Therefore, the first step would be to convert these categorical features into one-hot encoding (OHD) so that our songs can be represented as vectors in a feature space.

To keep it simple, for now, we are only taking two categorical features into our consideration.

```python
spotify_features_df = spotify_data
genre_OHE = pd.get_dummies(spotify_features_df.genre)
key_OHE = pd.get_dummies(spotify_features_df.key)
```

As we can see that the numerical columns have different ranges, we will perform a max-min normalization to change the values of numeric columns in the dataset to a standard scale. 

It is the most common normalization approach where the minimum value in the feature column gets transformed to 0, and the maximum value in the feature column gets transformed to 1. 

The equation for max-min normalization is given as follows:

![equation](/engineering-education/building-spotify-recommendation-engine/normalization-equation.jpg)

```python
scaled_features = MinMaxScaler().fit_transform([
  spotify_features_df['acousticness'].values,
  spotify_features_df['danceability'].values,
  spotify_features_df['duration_ms'].values,
  spotify_features_df['energy'].values,
  spotify_features_df['instrumentalness'].values,
  spotify_features_df['liveness'].values,
  spotify_features_df['loudness'].values,
  spotify_features_df['speechiness'].values,
  spotify_features_df['tempo'].values,
  spotify_features_df['valence'].values,
  ])
```

```python
#Storing the transformed column vectors into our dataframe
spotify_features_df[['acousticness','danceability','duration_ms','energy','instrumentalness','liveness','loudness','speechiness','tempo','valence']] = scaled_features.T
```

We drop the features that are not considered to determine the similarity and the categorical features that are already converted into OHE vectors.

```python
#discarding the categorical and unnecessary features 
spotify_features_df = spotify_features_df.drop('genre',axis = 1)
spotify_features_df = spotify_features_df.drop('artist_name', axis = 1)
spotify_features_df = spotify_features_df.drop('track_name', axis = 1)
spotify_features_df = spotify_features_df.drop('popularity',axis = 1)
spotify_features_df = spotify_features_df.drop('key', axis = 1)
spotify_features_df = spotify_features_df.drop('mode', axis = 1)
spotify_features_df = spotify_features_df.drop('time_signature', axis = 1)
```

```python
#Appending the OHE columns of the categorical features
spotify_features_df = spotify_features_df.join(genre_OHE)
spotify_features_df = spotify_features_df.join(key_OHE)
```

```python
spotify_features_df.head()
```

![snapshot](/engineering-education/building-spotify-recommendation-engine/snapshot-4.JPG)

#### Connecting to Spotify Web API
In the next step, I will fetch my Spotify playlist data. To connect to the Spotify Web API, you will need a unique client id and a client secret key that I have already shown you how to generate.

```python
client_id = #write yours 
client_secret= #write yours

```

In the cell below, you can see that I have used my localhost URL. This URL is used to validate the client. I have talked about this in the Spotify Web API section. Here we are storing our playlist details in a python dictionary.

```python
#Fetching the playlist
scope = 'user-library-read'
token = util.prompt_for_user_token(
    scope, 
    client_id= client_id, 
    client_secret=client_secret, 
    redirect_uri='http://localhost:8881/callback'
  )
sp = spotipy.Spotify(auth=token)
playlist_dic = {}
playlist_cover_art = {}

for i in sp.current_user_playlists()['items']:
    playlist_dic[i['name']] = i['uri'].split(':')[2]
    playlist_cover_art[i['uri'].split(':')[2]] = i['images'][0]['url']

print(playlist_dic)
```

![snapshot](/engineering-education/building-spotify-recommendation-engine/snapshot-3.JPG)

The cell below contains the method which creates a new dataframe for our playlist using the Spotify song features dataset that we have downloaded from Kaggle.

```python
#creating the playlist dataframe with extended features using Spotify data
def generate_playlist_df(playlist_name, playlist_dic, spotify_data):
    
    playlist = pd.DataFrame()

    for i, j in enumerate(sp.playlist(playlist_dic[playlist_name])['tracks']['items']):
        playlist.loc[i, 'artist'] = j['track']['artists'][0]['name']
        playlist.loc[i, 'track_name'] = j['track']['name']
        playlist.loc[i, 'track_id'] = j['track']['id']
        playlist.loc[i, 'url'] = j['track']['album']['images'][1]['url']
        playlist.loc[i, 'date_added'] = j['added_at']

    playlist['date_added'] = pd.to_datetime(playlist['date_added'])  
    
    playlist = playlist[playlist['track_id'].isin(spotify_data['track_id'].values)].sort_values('date_added',ascending = False)

    return playlist
playlist_df = generate_playlist_df('MixedMood', playlist_dic, spotify_data) 
```

```python
playlist_df.head()
```

![snapshot](/engineering-education/building-spotify-recommendation-engine/snapshot-2.JPG)

The cell below is used to visualize the cover-art of the song tracks with the help of the Matplotlib library.

```python
from skimage import io
import matplotlib.pyplot as plt

def visualize_cover_art(playlist_df):
    temp = playlist_df['url'].values
    plt.figure(figsize=(15,int(0.625 * len(temp))) , facecolor='#8cfc03')
    columns = 5
    
    for i, url in enumerate(temp):
        plt.subplot(len(temp) / columns + 1, columns, i + 1)

        image = io.imread(url)
        plt.imshow(image)
        plt.xticks([])
        plt.yticks([])
        s='' 
        plt.xlabel(s.join(playlist_df['track_name'].values[i].split(' ')[:4]), fontsize = 10, fontweight='bold')
        plt.tight_layout(h_pad=0.8, w_pad=0)
        plt.subplots_adjust(wspace=None, hspace=None)

    plt.show()
```

```python
visualize_cover_art(playlist_df)
```

![coverart-playlist](/engineering-education/building-spotify-recommendation-engine/album-cover-art.png)

#### Creating playlist vector
To perform the cosine similarity between our playlist and the songs not present in our playlist, we will try to summarize our playlist in one vector. This vector will represent our playlist in the feature space, and we will be able to find songs similar to the songs in our playlist.

The cell below contains the method that returns our playlist as a single vector and all the songs not present in our playlist in a dataframe.

```python
def generate_playlist_vector(spotify_features, playlist_df, weight_factor):
    
    spotify_features_playlist = spotify_features[spotify_features['track_id'].isin(playlist_df['track_id'].values)]
    spotify_features_playlist = spotify_features_playlist.merge(playlist_df[['track_id','date_added']], on = 'track_id', how = 'inner')
    
    spotify_features_nonplaylist = spotify_features[~spotify_features['track_id'].isin(playlist_df['track_id'].values)]
    
    playlist_feature_set = spotify_features_playlist.sort_values('date_added',ascending=False)
    
    
    most_recent_date = playlist_feature_set.iloc[0,-1]
    
    for ix, row in playlist_feature_set.iterrows():
        playlist_feature_set.loc[ix,'days_from_recent'] = int((most_recent_date.to_pydatetime() - row.iloc[-1].to_pydatetime()).days)
        
    
    playlist_feature_set['weight'] = playlist_feature_set['days_from_recent'].apply(lambda x: weight_factor ** (-x))
    
    playlist_feature_set_weighted = playlist_feature_set.copy()
    
    playlist_feature_set_weighted.update(playlist_feature_set_weighted.iloc[:,:-3].mul(playlist_feature_set_weighted.weight.astype(int),0))   
    
    playlist_feature_set_weighted_final = playlist_feature_set_weighted.iloc[:, :-3]
    

    
    return playlist_feature_set_weighted_final.sum(axis = 0), spotify_features_nonplaylist

```

```python
playlist_vector, nonplaylist_df = generate_playlist_vector(spotify_features_df, playlist_df, 1.2)
print(playlist_vector.shape)
print(nonplaylist_df.head())
```

![snapshot](/engineering-education/building-spotify-recommendation-engine/snapshot-5.JPG)

#### Generating recommendations
Now comes the final part of our implementation, generating recommendations. As stated before, we are going to use cosine similarity as a similarity metric to determine the songs that are very much similar to our playlist. 

We will perform the cosine similarity between our playlist vector and songs not present in our playlist. 

Then we will perform cosine similarity using a python-based library, Scikit and store the cosine similarity values in a separate column. 

Next, we will reverse sort the dataframe based on the cosine similarity column. Finally, we will generate the top 15 recommendations of songs as our recommended playlist.

```python
def generate_recommendation(spotify_data, playlist_vector, nonplaylist_df):

    non_playlist = spotify_data[spotify_data['track_id'].isin(nonplaylist_df['track_id'].values)]
    non_playlist['sim'] = cosine_similarity(nonplaylist_df.drop(['track_id'], axis = 1).values, playlist_vector.drop(labels = 'track_id').values.reshape(1, -1))[:,0]
    non_playlist_top15 = non_playlist.sort_values('sim',ascending = False).head(15)
    non_playlist_top15['url'] = non_playlist_top15['track_id'].apply(lambda x: sp.track(x)['album']['images'][1]['url'])
    
    return  non_playlist_top15
```

```python
top15 = generate_recommendation(spotify_data, playlist_vector, nonplaylist_df)  
top15.head()
```

![snapshot](/engineering-education/building-spotify-recommendation-engine/snapshot-6.JPG)

```python
#Visulaizing the cover-art of the recommended playlist
visualize_cover_art(top10)
```

![snapshot](/engineering-education/building-spotify-recommendation-engine/recommendation.png)

I have uploaded the notebook file for this implementation to my GitHub account. You can access it from [here](https://github.com/tanmay69/Spotify-Recommendation-Engine).

### Few points to ponder
- One thing to note is that in our case, we have implemented the Content-Based Filtering mechanism. Thus the model will only be able to make recommendations based on that specific user's interests. Therefore, it limits the ability of a user to expand their existing interests.
- The Spotify song features data that we have used to develop the recommendation system will not necessarily contain all the songs in your playlist. Therefore sometimes, we will not be able to harness the playlist fully to generate recommendations.
- To use this recommender, users should have at least one playlist on their Spotify account, which is a disadvantage in the case of an entirely new user of the Spotify application.

### Conclusion
Using the concept of cosine similarity, we have seen that we were able to generate recommendations of songs that are similar to the songs in our playlist. Therefore, you can follow the steps above to develop your custom Spotify playlist recommender as well.

Happy coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
