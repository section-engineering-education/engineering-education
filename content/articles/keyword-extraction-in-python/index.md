---
layout: engineering-education
status: publish
published: true
url: /keyword-extraction-in-python/
title: Keyword Extraction in Python
description: The article covers the basics of keywords extraction and introduces the users to a method called TF-IDF for extracting important words from a document.
author: adith-bharadwaj
date: 2020-08-05T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/keyword-extraction-in-python/hero.jpg
    alt: keyword extraction in python image example
---
*Big data refers to a large and diverse amount of information that is continually growing - in terms of size, scope, and complexity*. As more and more business activities are digitized, massive amounts of data get generated. Data comes from various sources such as social media, transactions, machines (sensors and IoT devices), web, etc. Because of the sheer amount of data, it becomes impossible for humans to manually analyze and extract valuable information from this massive dataset. An automated method to accomplish this is imperative and is called Keyword Extraction.
<!--more-->

### What is Keyword Extraction?
*Keyword extraction is a text analysis technique in which we automatically extract the most relevant words and expressions from the text in a given document*. It can help us analyze large amounts of data by **summarizing** the content of the text and making it concise by identifying the main topics being discussed. This makes it highly scalable and efficient in analyzing large amounts of data.

Keyword extraction allows companies to obtain the most important words from huge documents in a very short amount of time. This allows them to obtain insights on the topics their customers are interested in or reviews on their products.

A lot of the data we generate is [unstructured](https://en.wikipedia.org/wiki/Unstructured_data) ― meaning it is disorganized and does not conform to any model or arrangement and is hard to analyze and process. *Keyword extraction can help users find relevant words in new articles, papers, or journals, etc., without having to read the whole document manually*. In this article, we are going to look at one such technique used to extract keywords, called **TF-IDF** (Term Frequency-Inverse Document Frequency).

#### Preprocessing
The input or raw text data needs to be parsed and cleaned. [Tokenization](https://www.analyticsvidhya.com/blog/2020/05/what-is-tokenization-nlp/) is the process of splitting a sequence of text (sentence) into pieces, called tokens (a single word), and discard certain unwanted characters, such as punctuations, unwanted symbols, numbers,  etc. Once the data is cleaned and tokenized, the TF-IDF scores for the words in the data are calculated. *The higher the TF-IDF score, the more important is the word*.

TF-IDF is a **mathematical score** that tells us how important a word is in a piece of text or document. *This is done by multiplying how many times a word appears in a document (TF) with the inverse document frequency of the word across a set of sentences*.

#### Term Frequency (TF)
*Term frequency measures how frequently a term occurs in a text*. The term frequency is often divided by the text length (the total number of words) as a way of [normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization). The TF-formula is the ratio of a term’s occurrences in a document and the total number of words within the same document.

`TF(w) = (Number of times w appears in the text) / (Total number of words in the document)`

#### Inverse Document Frequency (IDF)
*IDF measures how important a word is in a given text*. All the words in the text are considered equally important in TF. However, a lot of words in the text such as "is", "of", etc., are abundant but are not important. Therefore, we need to give less weight to these frequent terms and increase the weight given to rare words. IDF is used to calculate the weight of rare words across all sentences in the text. *The words that occur rarely in the text have a high IDF score*.

`IDF(w) = log_e(Total number of sentences or text / Number of sentences with term w in it)`

#### TF-IDF
*The TF-IDF score for a word is defined as the product of the Term Frequency and the Inverse Document Frequency*.

`TF-IDF(w) = TF(w) * IDF(w)`

Consider a file containing 100 words in which "cat" occurs three times. Hence, The term frequency(TF) for cat is (3 / 100) = 0.03.

Now, if we have 1000 sentences and the word cat appears in 10, Then the inverse document frequency is calculated as log(1000 / 10) = 2. Thus, the TF-IDF weight is the product of these quantities: 0.03 * 2 = 0.06

![flowchart](/engineering-education/keyword-extraction-in-python/flowchart.png)

### Building the keyword extraction engine in Python
The most important words (keywords) from a document can be extracted by their tf-idf scores. The words with high tf-idf scores are more important than the words with lower tf-idf scores.

**Prerequisites**:

1. [Pandas](https://pypi.org/project/pandas/): `sudo pip3 install pandas`

2. [orderedset](https://pypi.org/project/orderedset/): `sudo pip3 install orderedset`

`Note: The complete code for the project can be found on` [GitHub](https://github.com/adithbharadwaj/Keywords-Extraction)

#### Vectorization
Before we process words, we need a way to represent words as numbers to allow mathematical operations on them. *A mathematical way of representing word is called [vectorization](https://medium.com/@paritosh_30025/natural-language-processing-text-data-vectorization-af2520529cf7)*. In the vectorized representation, we consider the bag of words model (unique words in the text).
We count the occurrence of each word in a sentence and represent it in a vector (an array) whose length is equal to the number of unique words in the text. For example:

```python
Let sentence_1 = "i am a boy"
Let sentence_2 = "i am a girl"
unique_words = ["i", "am", "a", "boy", "girl"] (length = 5)
vector representation of sentence_1 = [1, 1, 1, 1, 0] (corresponding to the positions of "i", "am", "a", "boy" in the vector)
vector representation of sentence_2 = [1, 1, 1, 0, 1] (corresponding to the positions of "i", "am", "a", "girl" in the vector)
```

Once we have a vector that represents each sentence in the text, we can compute the TF-IDF scores for each word in every sentence.

```python
def vectorize(sentences):
	# set of unique words in the whole document.
	unique_words = OrderedSet()
	for sent in sentences:
		for word in sent:

			unique_words.add(word)
	unique_words = list(unique_words) # converting the set to a list to make it easier to work with it.
	# a list of lists that contains the vectorized form of each sentence in the document.
	vector = list()
	# in the vectorized representation, we consider the bag of words (unique words in the text).
	# then, we count the occurence of each word in a sentence and represent it in a vector whose length = length(unique_words)
	# ex: sent1 = "i am a boy" | sent2 = "i am a girl"
	# unique_words = ["i", "am", "a", "boy", "girl"]
	# vector representation of sent1 = [1, 1, 1, 1, 0]
	# vector representation of sent2 = [1, 1, 1, 0, 1]
	for sent in sentences: # iterate for every sentence in the document
		temp_vector = [0] * len(unique_words) # create a temporary vector to calculate the occurence of each word in that sentence.
		for word in sent: # iterate for every word in the sentence.
			temp_vector[unique_words.index(word)] += 1
		vector.append(temp_vector) # add the temporary vector to the list of vectors for each sentence (list of lists)
	return vector, unique_words
```

The `vectorize` function takes a list (array) of sentences in the text and returns a vectorized representation (as a 2-D array/vector) and a unique list of words in the entire text.

#### Calculating TF scores
To calculate the TF scores, we use the formula described above.

```python
# function to calculate the tf scores
def tf(vector, sentence, unique_words):
	tf = list()
	no_of_unique_words = len(unique_words)
	# Go through each word in the document and calculate the TF scores.
	for i in range(len(sentence)):
		tflist = list()
		sent = sentence[i]
		count = vector[i]
		for word in sent:
			score = count[sent.index(word)]/ float(len(sent)) # tf = no. of occurence of a word/ total no. of words in the sentence.
			if(score == 0):
				score = 1/ float(len(sentence))
			tflist.append(score)
		tf.append(tflist)
	return tf
```

The `tf` function takes a vector representation of the text, a `list` of sentences, and a `list` of unique words in the text as arguments. It returns the TF scores for each word in the document (as a 2-D array/vector). We iterate through all the sentences and for each word in that particular sentence, we use the TF formula to calculate the scores.

#### Calculating IDF scores
We use the IDF formula described above to calculate the IDF scores.

```python
#function to calculate idf.
def idf(vector, sentence, unique_words):
	# idf = log(no. of sentences / no. of sentences in which the word appears).
	no_of_sentences = len(sentence)
	idf = list()
	# Go through each word in a sentence and calculate its IDF value
	for sent in sentence:
		idflist = list()
		for word in sent:
			count = 0 # no. of times the word occurs in the entire text.
			for k in sentence:
				if(word in k):
					count += 1
			score = math.log(no_of_sentences/float(count)) # caclulating idf scores
			idflist.append(score)
		idf.append(idflist)
	return idf
```

The `idf` function takes a vector representation of the text, a `list` of sentences, and a `list` of unique words in the text as arguments and returns the IDF scores as a 2-D array.

#### Calculating TF-IDF
TF-IDF can be calculated by multiplying the TF scores of each word with their IDF scores.

```python
# function to calculate the tf-idf scores.
def tf_idf(tf, idf):
	# tf-idf = tf(w) * idf(w)
	tfidf = [[0 for j in range(len(tf[i]))] for i in range(len(tf))]
	for i in range(len(tf)):
		for j in range(len(tf[i])):
			tfidf[i][j] = tf[i][j] * float(idf[i][j])
	return tfidf
```

The `tf_idf` function takes the TF and IDF scores as the argument and returns the computed TF-IDF scores of all the words in the document.

#### Extracting the Keywords
Once we have the scores, we need to sort them and extract the words with the greatest score. Words with a higher TF-IDF score are theoretically more important than words with a lower score.

```python
def extract_keywords(tfidf, processed_text):
	# create a mapping between the word and its corresponding TF-IDF score
	mapping = {}
	for i in range(len(tfidf)):
		for j in range(len(tfidf[i])):
			mapping[processed_text[i][j]] = tfidf[i][j]
	# Sort the words based on their TF-IDF scores so that words with highest scores appear first.
	word_scores = sorted(mapping.values(), reverse = True)
	keywords = []
	scores_to_word = {}
	# since mapping is a dictionary, we cannot sort it. We need to sort the values first and map the
	# words to the values.
	for i in range(len(tfidf)):
		for j in range(len(tfidf[i])):
			scores_to_word[tfidf[i][j]] = processed_text[i][j]
	for i in range(len(word_scores)):
		if(word_scores[i] != 0):
			keywords.append(scores_to_word[word_scores[i]])
		else:
			keywords.append(scores_to_word[word_scores[i]])
			break
	keywords = OrderedSet(keywords)
	for i in mapping:
		if(mapping[i] == 0):
			keywords.append(i)

	return keywords
```

The `extract_keywords` function takes the TF-IDF scores and the processed text (cleaned and converted into an array) as the argument and returns the keywords in sorted order (decreasing order of TF-IDF scores).

And it is done! We have successfully built a keyword extractor in Python.
