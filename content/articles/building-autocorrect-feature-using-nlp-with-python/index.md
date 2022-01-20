---
layout: engineering-education
status: publish
published: true
url: /building-autocorrect-feature-using-nlp-with-python/
title: Building an Autocorrect Feature using NLP with Python.
description: The objective of this tutorial is to help the reader understand how Natural Language processing can be used in building autocorrect features for systems using Python.
author: antony-lia
date: 2021-12-04T00:00:00-06:40
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-autocorrect-feature-using-nlp-with-python/hero.jpg
    alt: Natural Language processing example image
---
One of the features that use [Natural Language Processing (NLP)](https://en.wikipedia.org/wiki/Natural_language_processing) is the Autocorrect function. This feature works on every smartphone keyboard regardless of the brand.
<!--more-->
It is specially programmed to generalize all the correct words in the dictionary and looks for the words that are the most comparable to those words not in the vocabulary. 

To understand how it works, we will learn a little about Natural Language Processing in this article and then we will use Python to build the autocorrect feature.

### Table of contents
- [Prerequisites](#prerequisites)
- [Natural Language Processing (NLP)](#natural-language-processing-nlp)
- [Autocorrect feature](#autocorrect-feature)
- [Building autocorrect feature](#build-the-autocorrect-feature)
  - [Installing libraries](#installing-libraries)
  - [Reading text file (dictionary)](#reading-text-filedictionary)
  - [Frequency and probability of dictionary words](#frequency-and-probability-of-dictionary-words)
  - [Implement 4 edit word functions](#implement-4-edit-word-functions)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should:
- Have a prior understanding of the basics of Natural Language Processing and Machine Learning concepts.
- Have a basic understanding of Python and the various python libraries used for Natural language processing.
- Know how to use Pycharm or any other IDE for working with Python.

To download and install the Pycharm IDE on your PC, go to this [website](https://www.jetbrains.com/pycharm/download/#section=windows).

### Natural Language Processing (NLP)
Natural Language Processing (NLP) is a branch of Artificial Intelligence that allows computers to understand and process natural human language.

NLP uses a programming language that enables computers to evaluate and interpret large volumes of natural language data.

It paves the door for more interactivity and productivity in a variety of fields, like:
- Search autocorrect and autocomplete.
- Language translation and grammar checkers.
- Chatbots and social media monitoring.
- Email filtering and voice assistants.

We'll look at how it's employed in auto-correction systems in this tutorial.

### Autocorrect feature
The Autocorrect model is programmed to correct spellings and errors while inputting text and locating the most comparable related words.

It is completely based on NLP that compares the words in the vocabulary dictionary and the typed words on the keyboard.

If the typed word is found in the dictionary, the autocorrect feature assumes you typed the correct term. If the word does not exist, the tool identifies the most comparable words in our smartphone's history, as it indicates.

When building this model/feature, the following steps are involved:

#### Identifying misspelled word
A word is misspelled if the text is not found on the vocabulary of the corpus (dictionary), then the autocorrect system flags out for correction.

#### Find strings that are N-edit-distance away from the misspelled word
Editing is an operation performed on the string to change it to another string.

The `n` represents the edit distance like 1, 2, 3, so on, which keeps track of the number of edit operations to be done.

Hence, the `edit distance` is the count of the number of operations performed on a word to edit it.

The following are examples of edits:
- `INSERT` - a letter should be added.
- `DELETE` - removes a letter.
- `SWAP` - swaps two adjacent letters.
- `REPLACE` - changes one letter to another.

> NOTE: For autocorrect systems, `n` is usually between 1 and 3 edits.

#### Filtering suggested candidates
Only correctly spelled words from the created candidate list are considered, so that we can compare them to the words in the corpus to filter out the ones that don't exist.

#### Order filtered candidates based on word probabilities
The probabilities of the words are calculated based on the following formula:

`P(w) = C(w)/V`

- `P(w)`- the probability of a word `w`.
- `C(w)` - number of times (frequency) word appears in the vocabulary dictionary.
- `V` - the total sum of words in the dictionary.

#### Choose the most-likely candidate
When the probabilities are calculated, the actual list of words is grouped by the most likely word from the created candidates.

### Building autocorrect feature
We will need a dictionary to develop an autocorrect system where the smartphone uses history to match the typed words to see if they are correct or not.

For this tutorial, we will use a [sample.txt](https://github.com/dentex22/Autocorrect_System/blob/main/sample.txt) file found in the project folder containing the 1000 most used vocabularies.

#### Installing libraries
We start by installing all the libraries general to machine learning using the `pip` command from the terminal.

```bash
pip install pattern
pip install pyspellchecker
pip install autocorrect
pip install textblob
pip install textdistance
```

#### Reading text file (dictionary)
We import all the necessary libraries and packages to read the text file containing a vocabulary dictionary:

```python
# Step 1: Data Preprocessing
import re  # regular expression
from collections import Counter
import numpy as np
import pandas as pd

# Implement the function process_data which
# 1) Reads in a corpus
# 2) Changes everything to lowercase
# 3) Returns a list of words.

w = [] #words
with open('sample.txt','r',encoding="utf8") as f:
    file_name_data = f.read()
    file_name_data = file_name_data.lower()
    w = re.findall('\w+', file_name_data)

v = set(w) #vocabulary
print(f"The first 10 words in our dictionary are: \n{w[0:10]}")
print(f"The dictionary has {len(v)} words ")
```

The number of unique words and the top 10 words from the dictionary is displayed as output:

```bash
The first 10 words in our dictionary are: 
['a', 'ability', 'able', 'about', 'above', 'accept', 'according', 'account', 'across', 'act']
The dictionary has 1001 words 
```

#### Frequency and probability of dictionary words 
We use the `get_count()` to find the frequency of the words as shown below:

```python
 # a get_count function that returns a dictionary of word versus frequency
def get_count(words):
    word_count_dict = {}
    for word in words:
        if word in word_count_dict:
            word_count_dict[word] += 1
        else:
            word_count_dict[word] = 1
    return word_count_dict
word_count_dict = get_count(words)
print(f"There are {len(word_count_dict)} key values pairs")
```

The output shown below displays that there are 1001 key-value pairs: 

```bash
There are 1001 key values pairs.
```

The probability is calculated that any word will appear if randomly selected from the dictionary of words using the `get_probs()` as shown in the code:

```python
# implement get_probs function
# to calculate the probability that any word will appear if randomly selected from the dictionary

def get_probs(word_count_dict):
    probs = {}
    m = sum(word_count_dict.values())
    for key in word_count_dict.keys():
        probs[key] = word_count_dict[key] / m
    return probs
```

#### Implement 4 edit word functions
Each of the four edit functions is implemented below, each performing different tasks as illustrated earlier.

```python
# Now we implement 4 edit word functions

# DeleteLetter:removes a letter from a given word
def DeleteLetter(word):
    delete_list = []
    split_list = []
    for i in range(len(word)):
        split_list.append((word[0:i], word[i:]))
    for a, b in split_list:
        delete_list.append(a + b[1:])
    return delete_list

delete_word_l = DeleteLetter(word="cans")
```
From the code above, we use the `DeleteLetter` function that removes a letter from  a given word.

The word is first split `split_list=[]` into its components - the left and the right. We then loop over the sequence of characters using a `for` loop.

Then, we use the compress the list to return all the instances of words without the deleted letter stored in the `delete_list` array list.

For example:

```python
print(DeleteLetter("trash"))
```

The output:

```bash
['rash', 'tash', 'trsh', 'trah', 'tras']
```

```python
# SwitchLetter:swap two adjacent letters
def SwitchLetter(word):
    split_l = []
    switch_l = []
    for i in range(len(word)):
        split_l.append((word[0:i], word[i:]))
    switch_l = [a + b[1] + b[0] + b[2:] for a, b in split_l if len(b) >= 2]
    return switch_l

switch_word_l = SwitchLetter(word="eta")
```

The `SwitchLetter` function take a word, splits, and swaps all the letters in that word from left to right using `switch_1`.

For example:

```python
print(SwitchLetter("trash"))
```

The output:

```bash
['rtash', 'tarsh', 'trsah', 'trahs']
```

```python
# replace_letter: changes one letter to another
def replace_letter(word):
    split_l = []
    replace_list = []
    for i in range(len(word)):
        split_l.append((word[0:i], word[i:]))
    alphabets = 'abcdefghijklmnopqrstuvwxyz'
    replace_list = [a + l + (b[1:] if len(b) > 1 else '') for a, b in split_l if b for l in alphabets]
    return replace_list

replace_l = replace_letter(word='can')
```

The `replace_letter` function takes in a word and loops through all the characters of the English alphabet and swaps the first letter with the English alphabet.

For example:

```python
print(replace_letter("trash"))
```

The output:

```bash
['arash', 'brash', 'crash', 'drash', 'erash', 'frash', 'grash', 'hrash', 'irash', ...]
```

```python
# insert_letter: adds additional characters
def insert_letter(word):
    split_l = []
    insert_list = []
    for i in range(len(word) + 1):
        split_l.append((word[0:i], word[i:]))
    letters = 'abcdefghijklmnopqrstuvwxyz'
    insert_list = [a + l + b for a, b in split_l for l in letters]
    # print(split_l)
    return insert_list
```

The `insert_letter` function takes in a word, and for every character of the English alphabet, it is going to append the right component to the left component.

For example:

```python
print(insert("trash"))
```

```bash
['atrash', 'btrash', 'ctrash', 'dtrash', 'etrash', 'ftrash', 'gtrash', 'htrash', 'itrash', 'jtrash', 'ktrash', 'ltrash', 'mtrash', 'ntrash', 'otrash', 'ptrash', 'qtrash', 'rtrash', ...]
```

> NOTE: All the four edit functions use the `split` method for every word.

We then combine these edit functions to allow the autocorrect features, like delete, replace, insert, and swap the letters.

```python
# combining the edits
# switch operation optional
def edit_one_letter(word, allow_switches=True):
    edit_set1 = set()
    edit_set1.update(DeleteLetter(word))
    if allow_switches:
        edit_set1.update(SwitchLetter(word))
    edit_set1.update(replace_letter(word))
    edit_set1.update(insert_letter(word))
    return edit_set1

# edit two letters
def edit_two_letters(word, allow_switches=True):
    edit_set2 = set()
    edit_one = edit_one_letter(word, allow_switches=allow_switches)
    for w in edit_one:
        if w:
            edit_two = edit_one_letter(w, allow_switches=allow_switches)
            edit_set2.update(edit_two)
    return edit_set2

# get corrected word
def get_corrections(word, probs, vocab, n=2):
    suggested_word = []
    best_suggestion = []
    suggested_word = list(
        (word in vocab and word) or edit_one_letter(word).intersection(vocab) or edit_two_letters(word).intersection(
            vocab))
    best_suggestion = [[s, probs[s]] for s in list(reversed(suggested_word))]
    return best_suggestion

my_word = input("Enter any word:")
probs = get_probs(word_count)
tmp_corrections = get_corrections(my_word, probs, v, 2)
for i, word_prob in enumerate(tmp_corrections):
    print(f"word {i}: {word_prob[0]}, probability {word_prob[1]:.6f}")
```

The program will prompt the user to input a word then will go through the dictionary and produce words similar to the input word.

For instance, when a user tries to type the word `daed` to mean `dead`. The autocorrect system produces a similar word `dead` with a probability of `0.000999`.

![Autocorrect Output](/engineering-education/building-autocorrect-feature-using-nlp-with-python/output.jpg)

### Conclusion
As we have seen, NLP plays a crucial role in enabling computers to understand and process natural human language. This is as implemented above using the autocorrect system.

You can find the full working code [here](https://github.com/dentex22/Autocorrect_System).

To summarize, we have:
- Learned what Natural Language Processing is and its ability to autocorrect words.
- Explored the autocorrect system and the various steps taken to build it.
- Implemented an autocorrect system using NLP with Python.

Happy coding.

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)