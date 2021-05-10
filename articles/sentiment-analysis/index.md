---
layout: engineering-education
status: publish
published: true
url: /engineering-education/sentiment-analysis/
title: Sentiment Analysis of Twitter Data
description: Sentiment analysis is the process of extracting the *sentiment* from a piece of text and to classify it as positive, negative or neutral accordingly.
author: rohan-reddy
date: 2020-08-04T00:00:00-05:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/sentiment-analysis/hero.jpg
    alt: sentiment analysis image example
---
Social networks are a primary resources to gather information about people’s opinions and sentiments towards different topics as they spend hours daily on social media and share their opinion. In this article, we shall discuss the applications of sentiment analysis and how to connect to Twitter and run sentiment analysis queries. Basic knowledge of [Python](https://www.python.org/about/gettingstarted/) is required for understanding the code.
<!--more-->

Sentiment analysis is the process of extracting the *sentiment* from a piece of text and classifying it as **positive**, **negative**, or **neutral** accordingly.

### Why Sentiment Analysis on Twitter?
Sentiment analysis has many applications for different domains. For example, companies can learn about users' feedback and reviews via social media - and get actual feedback about their products. A social network is a rich platform to learn about people's opinions and sentiment regarding different topics as they communicate and share their opinions.

[Twitter](https://twitter.com/) has 1.3 billion accounts with 330 million monthly active users and 145 million daily users. Twitter data is the most comprehensible source of live, public conversations worldwide and therefor can serve as a valuable tool for understanding customer sentiment as people and markets respond to product and business decisions.

Sentiment analysis can predict the outcome of upcoming events, evaluate the impact of a recent product launch, pivot the direction or content of an ad campaign, and more.  

### Sentiment analysis with Python

We will be using the Twitter API to get real-time tweets and perform sentiment analysis and visualize our findings.

### Setup development environment
Install the required libraries using `pip`. Make sure you have [Python 3](https://www.python.org/downloads/) installed.

```bash
pip install tweepy

pip install textblob
 
pip install nltk
 ```
 
 
You should have a Twitter account. Apply for a [developer account](https://developer.twitter.com/en/apply-for-access). Fill out the details asked in the subsequent steps.

![img](/engineering-education/sentiment-analysis/apply.png)

Submit the application and wait for developer access.

After getting access, we need to create an [app](https://developer.twitter.com/en/apps/) and API key in order to authenticate and integrate with most Twitter developer products.

![img](/engineering-education/sentiment-analysis/create1.png)

Fill out the required details. Ignore the fields you don't need (these are used for authenticating with Twitter and other use cases.)

![img](/engineering-education/sentiment-analysis/form.png)

Go to the `Keys and Tokens` tab under your app to get the API key and API secret key. (Do not share with others.)

![img](/engineering-education/sentiment-analysis/tokens.png)

### Lets get started
Let's start coding. We use a Python library called [tweepy](https://tweepy.org) for authenticating and getting information from the Twitter API. You can also use [twitter](https://pypi.org/project/twitter/).

```python
import tweepy

access_token = "xxxx"
access_token_secret = "xxxx"
consumer_key = "xxxx"
consumer_secret = "xxxx"

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
```
Tweepy's API class provides access to the entire twitter [RESTful](https://www.tutorialspoint.com/restful/restful_introduction.htm) API methods. Each method can accept various parameters and return responses.

We will use [API.search](http://docs.tweepy.org/en/latest/api.html) which returns a collection of relevant tweets matching a specified query. A raw tweet may contain many unwanted characters and information which may not be necessary like emoji, "@" mentions, "#" hashtags, etc. These may be useful in some other scenario.

![img](/engineering-education/sentiment-analysis/search.png)

```python
query=""
count=""
tweets = api.search(q=query, count=count)
text = []
for i in tweets:
	text.append(i.text)
#we are extracting text and excluding metadata from the tweet
#this method is useful for getting tweets related to a particular topic
```
We can also use `API.mentions_timeline` to get the most recent tweets where your organizations has been tweeted about.

Next, we clean the text before using sentiment analysis.

```python
import re
text = re.sub('@[A-Za-z0–9]+', '', text)
text = re.sub('#', '', text)
text = re.sub('RT[\s]+', '', text)
text = re.sub('https?:\/\/\S+', '', text)
#removed @mentions, #hastags and URLs
```
We will use the [TextBlob](https://textblob.readthedocs.io/en/dev/quickstart.html?highlight=sentiment#sentiment-analysis) library to get the sentiment of the text.

```python
from textblob import TextBlob
text = cleaned_tweet

blob = TextBlob(text)
sentiment = blob.sentiment.polarity
#blob.sentiment returns (polarity,  subjectivity)
#polarity is within the range [-1.0, 1.0]. -1 very negative. 0 neutral. 1 very positive
#The subjectivity is a float within the range [0.0, 1.0] where 0.0 is very objective and 1.0 is very subjective.
```
TextBlob has [Naive-Bayes](https://en.wikipedia.org/wiki/Naive_Bayes_classifier) classifier which we can use to classify text.

#### How Sentiment Analysis works
Let's examine two statements:
- *This is a beautiful day, I am very happy.*
- *What a horrible person.*

When we read these sentences, the words `happy`, `beautiful` describe the positivity of sentence 1 and the word `horrible` describes the negativity of sentence 2. Words like `is`, `a` don't convey any particular sentiment and are neutral.

We can have *rule-based* systems that perform sentiment analysis based on a set of manually crafted rules or *automatic* systems that rely on machine learning techniques to learn from data. These systems learn which words represent a positive sentiment and which represent a negative.

Of course, words can have different meanings in different contexts and to different persons. Therefore - we can train a supervised machine learning algorithm to perform sentiment analysis. If you are interested you can look at my code [here](https://github.com/rohanreddych/stuff), where I implemented Sentiment Analysis using neural networks.

### Sample Results and Conclusion
As a sample use case, I made an analysis on tweets related to **JavaScript**. The following are the results.

* An example of a raw tweet.

`RT @kennyrecruiter: Microsoft has released tutorials on building #Javascript applications using #nodejs. They look good and are easy to fol…`

* After cleaning the text

`: Microsoft has released tutorials on building Javascript applications using nodejs. They look good and are easy to fol…`

* Our algorithm predicts this as `1`, meaning positive.

* The sentiment of 125 random tweets.

![img](/engineering-education/sentiment-analysis/bar.png)

* Word Clouds are used to visually represent words in a text, the bigger the font size, the more a word is repeated.

Without cleaning:

![img](/engineering-education/sentiment-analysis/dirty-word.png)

With cleaning:

![img](/engineering-education/sentiment-analysis/clean-word.png)

As you can see, cleaning text is a very important step, because it allows us to get the main information the text is trying to convey.

Sentiment analysis can be useful for a team in a similar manner to find out how their users are liking their product.

#### References and Resources
* [https://en.wikipedia.org/wiki/Sentiment_analysis](https://en.wikipedia.org/wiki/Sentiment_analysis)
* [https://monkeylearn.com/sentiment-analysis/](https://monkeylearn.com/sentiment-analysis/)
* [https://www.geeksforgeeks.org/twitter-sentiment-analysis-using-python/](https://www.geeksforgeeks.org/twitter-sentiment-analysis-using-python/)
* [https://medium.com/better-programming/twitter-sentiment-analysis-15d8892c0082](https://medium.com/better-programming/twitter-sentiment-analysis-15d8892c0082)
* [https://arxiv.org/pdf/1711.10377](https://arxiv.org/pdf/1711.10377)
* [Twitter](https://developer.twitter.com/en/use-cases/analyze)
