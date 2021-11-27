---
layout: engineering-education
status: draft
published: true
url: /building-autocorrect-feature-using-nlp-with-python/
title: Build an Autocorrect Feature using NLP with Python.
description: The objective of this tutorial is to help the reader understand how Natural Language processing can be used with Python in building autocorrect features in systems. 
author: antony-lia
date: 2021-11-13T00:00:00-2:30
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/building-autocorrect-feature-using-nlp-with-python/hero.jpg
    alt: Natural Language processing example image
---
One of the fields that use Natural Language Processing (NLP) is the Autocorrect function. This feature works on every smartphone keyboard regardless of the brand. It is specially programmed to generalize all the correct words in the dictionary and looks for the words that are the most comparable to those words not in the vocabulary. 
<!--more-->
To understand how it works, we will cover Natural Language Processing in this article and use it with Python to build the autocorrect feature showing all the steps involved.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Natural Language Processing(NLP)](#natural-language-processingnlp)
- [Autocorrect Feature](#autocorrect-feature)
- [Build the Autocorrect Feature](#build-the-autocorrect-feature)
  - [Installing Libraries](#installing-libraries)
  - [Reading text file(dictionary)](#reading-text-filedictionary)
  - [Frequency and Probability of Dictionary Words](#frequency-and-probability-of-dictionary-words)
  - [Implement 4 edit word functions](#implement-4-edit-word-functions)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should:
- Have a prior understanding of the basics of Natural Language Processing and Machine Learning concepts.
- Have a basic understanding of Python and the various python libraries used in Natural language processing.
- Know how to use Pycharm or any other IDE or code editor for running Python.

To download and install the Pycharm IDE on your PC, go to this [website](https://www.jetbrains.com/pycharm/download/#section=windows).

### Natural Language Processing(NLP)
Natural Language Processing (NLP) is a branch of computer science and artificial intelligence that allows computers to understand and process natural human language. NLP is a programming language that enables computers to evaluate and interpret large volumes of natural language data.
It paves the door for more interactivity and productivity in a variety of fields:
- Search Autocorrect and Autocomplete.
- Language Translation and Grammar checkers.
- Chatbots and Social Media monitoring.
- Email filtering and Voice Assistants.

We'll look at how it's employed in autocorrection systems in this tutorial.

### Autocorrect Feature
The Autocorrect model is programmed to correct spellings and errors while inputting text and locating the most comparable related words. It is completely based on Natural Language Processing (NLP) and compares the words in the vocabulary dictionary and the typed words on the keyboard. 
If the typed word is found in the dictionary, the autocorrect feature assumes you typed the correct term. If the word does not exist, the tool identifies the most comparable words in our smartphone's history, as it indicates.

When building this model/feature the following steps are involved:
 - *Identifying Misspelled Word* - a word is misspelled if it is not found on the vocabulary of the corpus(dictionary) of the text the autocorrect system is working with hence flagged out for correction.
 - *Find Strings that are n Edit distance away from misspelled word* - editing is an operation  performed on the string to change it to another string. The `n` represents the edit distance like 1,2,3...which will keep track of the number of edit operations that need to be done. Hence the `edit distance` is the count of the number of operations performed on a word to edit it.
The following are examples of edits:
      `INSERT` - a letter should be added.
      `DELETE` - remove a letter.
      `SWAP` - swap two adjacent letters.
      `REPLACE` - changes one letter to another.

  >NOTE: We usually take n between 1 to 3 edits for autocorrect systems.
  
 - *Filtering Suggested Candidates* - Only correctly spelled real words from our created candidate list are considered, so we can compare them to the words in the dictionary and then filter out the ones that don't exist in the dictionary.
 - *Order Filtered Candidates based on word probabilities* - Probabilities of the words is calculated based on the following formula: P(w) = C(w)/V, where;
      `P(w)`- the probability of a word,w.
      `C(w)` - number of times(frequency) word appears in the vocabulary dictionary.
      `V` - the total sum of words in the dictionary.
 - *Choose the most Likely candidate* - When the probabilities are calculated, the actual list of words is used  to get the most likely word from our created candidates.

### Build the Autocorrect Feature
We will need a dictionary to develop the autocorrect system, much as our smartphone use prior history to match entered words whether they are correct or not. For this tutorial, we will use a [sample.txt](https://github.com/dentex22/Autocorrect_System/blob/main/sample.txt) file found in the project folder containing the 1000 most used vocabularies.

#### Installing Libraries
We start by installing all the libraries general to machine learning using `pip` command from the terminal.
```bash
pip install pattern
pip install pyspellchecker
pip install autocorrect
pip install textblob
pip install textdistance
```
#### Reading text file(dictionary)
We import all the necessary libraries and packages then read the text file containing our vocabulary dictionary with the code below.
```python
# Step 1: Data Preprocessing
import re  # regular expression
from collections import Counter
import numpy as np
import pandas as pd


# Implement the function process_data which
# 1) Reads in a corpus
# #2) Changes everything to lowercase
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
The following output is displayed in the terminal showing  number of unique words and the top 10 words in the dictionary. 

```bash
The first 10 words in our dictionary are: 
['a', 'ability', 'able', 'about', 'above', 'accept', 'according', 'account', 'across', 'act']
The dictionary has 1001 words 
```
#### Frequency and Probability of Dictionary Words 
We use the `counter function` to find the frequency of the words by applying the code below.
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
The output shown below is displayed with 1001 key values pairs: 

```bash
There are 1001 unique words in the vocabulary.
There are 1001 key values pairs
```
The probability is calculated that any word will appear if randomly selected from the dictionary of words using the `get_probs function` as shown in the code.
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
Each of the four edit functions is implemented below, each performing different tasks as illustrated earlier. We can also combine the functions with finding a list of all the strings that are n edited to execute.

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
From the code above, we use the `DeleteLetter` function which removes a letter from  a given word. The word is first split `split_list=[]` into its component; the left and the right. We then loop over the sequence character of the words using `for` loop and the length of the word. We then use the list compression to return all the instances of words with a letter deleted stored in the `delete_list` array list. For example;

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
The `SwitchLetter` functions takes a word, splits its and switches `switch_1`all the letters in that word from left to right using `for` loop. For example;

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
The `replace_letter` function takes a letter and goes through all the characters in the English alphabet and swaps that letter with English alphabet. For example;
```python
print(replace_letter("trash"))
```
The output:
```bash
['arash', 'brash', 'crash', 'drash', 'erash', 'frash', 'grash', 'hrash', 'irash']
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
The `insert_letter` function takes a word, and for every character in the English alphabet it is going to take the left component of the words and appends the right components. For example:
```python
print(insert("trash"))
```
```bash
['atrash', 'btrash', 'ctrash', 'dtrash', 'etrash', 'ftrash', 'gtrash', 'htrash', 'itrash', 'jtrash', 'ktrash', 'ltrash', 'mtrash', 'ntrash', 'otrash', 'ptrash', 'qtrash', 'rtrash']
```
>NOTE: All the four edit functions uses the `split` method for every word.

We then combine the edit functions to allow the autocorrect feature delete, replace,insetrt and swap the letters in a word to produce another correct word from the dictionary similar to the input word.
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
The program will prompt the user to input a word then will go through the dictionary and produce words similar to the input word. For instance when a user tries to type the word `daed` to mean `dead`. The autocorrect system produces a similar word `dead` with a probability of `0.000999`.
![Autocorrect Output](/engineering-education/building-autocorrect-feature-using-nlp-with-python/output.jpg)

### Conclusion
As we have seen, Natural Language Processing plays a crucial role in enabling computers to understand and process natural human language. This is as implemented above using the autocorrect system.
The full combined code can be found on [GitHub](https://github.com/dentex22/Autocorrect_System).

To summarize, we have:
- Learned what Natural Language Processing its applications.
- Explored the autocorrect system and the various steps taken to build it.
- Implemented an autocorrect system using NLP with Python.

One can find more information about natural language processing [here](https://realpython.com/nltk-nlp-python/).

Happy coding!

---
Peer Review Contributions by: