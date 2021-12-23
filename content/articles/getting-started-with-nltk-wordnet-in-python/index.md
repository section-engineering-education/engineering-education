---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-nltk-wordnet-in-python/
title: Getting started with nltk-wordnet  in Python
description: The WordNet English dictionary is part of Python's Natural Language Tool Kit (NLTK). In this article, the reader will learn the basics of nltk-wordnet and get into basic examples used in natural language processing.
author: jacinta-kyulu
date: 2021-12-23T00:00:00-08:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

- url: /engineering-education/getting-started-with-nltk-wordnet-in-python/hero.jpg
  alt: Getting started with nltk-wordnet Image
---

The WordNet English dictionary is part of the Natural Language Tool Kit (NLTK) in Python.  Natural Language Processing (NLP) is made simple and straightforward using this comprehensive set of tools. 
<!--more-->
This tutorial will cover the basic actions that can be done using this tool.

### Prerequisites
To have a better understanding of this article, the reader should:
- Have basic knowledge of the python language.
- Have [python](https://www.python.org/downloads/) installed.
- Have [nltk](https://www.nltk.org/install.html) and its [corpus](https://www.nltk.org/data.html) installed.
 
### Table of contents
- [A start with Synonyms and Synsets](#a-start-with-synonyms-and-synsets)
- [Understanding NLTK Hypernyms and Hyponyms](#understanding-nltk-hypernyms-and-hyponyms)
- [A look into Meronyms and Holonyms](#a-look-into-meronyms-and-holonyms)
- [Understanding NLTK Entailments](#understanding-nltk-entailments)
- [Conclusion](#conclusion)

### A start with Synonyms and Synsets
WordNet categorizes English words into synonyms, referred to as Synsets (short for a set of synonyms). Every Synset contains a name, a part-of-speech (nouns, verbs, adverbs, and adjectives), and a number. 

Synsets are used to store synonyms, where each word in the Synset shares the same meaning. Essentially, each Synset is a collection of synonyms. Some words have just one Synset, while others have multiple Synsets.  Every Synset has a definition associated with it. Synset makes it easier for users to look up words in the WordNet database.

#### Getting the Synsets of a word
Synsets of a word are other words with the same meaning as the supplied word. To get the Synsets of the word given, we use the function `wordnet.synsets('word')`. The function returns an array containing all the Synsets related to the word passed as the argument.

```python
import nltk
from nltk.corpus import wordnet as wn 
wn.synsets('book')
```

Output:

```bash
[Synset('book.n.01'),Synset('book.n.02'),Synset('record.n.05'),Synset('script.n.01'),Synset('ledger.n.01'),Synset('book.n.06'),Synset('book.n.07'),Synset('koran.n.01'),Synset('bible.n.01'),Synset('book.n.10'),Synset('book.n.11'),Synset('book.v.01'),Synset('reserve.v.04'),Synset('book.v.03'),Synset('book.v.04')]
```

The function also allows you to restrict the word's part of speech by providing an optional position argument—for example, if we want to get all the synsets of a word that are verbs:

```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('book', pos=wn.VERB)
```

Output:

```bash
[Synset('book.v.01'),
 Synset('reserve.v.04'),
 Synset('book.v.03'),
 Synset('book.v.04')]
```

On the other hand, if we want to get all the Synsets of a noun word, we specify the same in the positional argument.

```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('book', pos=wn.NOUN)
```

Output:

```bash
[Synset('book.n.01'),Synset('book.n.02'),Synset('record.n.05'),Synset('script.n.01'),Synset('ledger.n.01'),Synset('book.n.06'),Synset('book.n.07'),Synset('koran.n.01'),Synset('bible.n.01'),Synset('book.n.10'),Synset('book.n.11')]
```

#### Getting the definition of a Synset
To get the definition of a Synset, you can utilize the `definition()` function, which can further analyze the Synset for a common definition to all of its lemmas. 

This method returns a string that conforms to the essential specification. There are two ways of achieving this:

**Example one**: In order to get at one of the items in the array provided by Synsets('word'), we can do the following:

```python
import nltk
from nltk.corpus import wordnet as wn
synset_array = wn.synsets('book')
synset_array[1].definition()
```

Output:

```bash
'physical objects consisting of a number of pages bound together
```

**Example two**

```python
import nltk
from nltk.corpus import wordnet as wn
synset_array = wn.synsets('book')
synset_array[3].definition()
```

Output:

```bash
'a written version of a play or other dramatic composition; used in preparing for a performance.'
```

Names, a part of speech, and how many times a Synset has been defined can be obtained using the `synset()` function. For instance:

```python
import nltk
from nltk.corpus import wordnet as wn
wordnet.synset('book.n.02').definition()
```

Output:

```bash
physical objects consisting of a number of pages bound together
```

Example two

```python
import nltk
from nltk.corpus import wordnet as wn
wordnet.synset('script.n.01').definition()
```

Output:

```bash
physical objects consisting of a number of pages bound together
```

#### How to get Lemmas of a Synset
Lemmas are all the words that are in a Synset. Using the `Lemma_names()` method, the user can get all lemmas of the specified Synset. This method can be used in two different ways to get an array of all the Lemma names:

**First way**

```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('book')
synset_array = wn.synsets('book')
print(synset_array[3].lemma_names())
```

Output:

```bash
['script', 'book', 'playscript']
```

**Second way**

```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('book')
print(wn.synset('book.n.07').lemma_names())
```

Output:

```bash
['book', 'rule_book']
```

### Understanding NLTK Hypernyms and Hyponyms
A Hyponym is a type of Synset that has been modified for a specific purpose instead of a generic Synset. In terms of inheritance, it is similar to the concept of a "child class." 

A synonym is a function returning an array containing all Synsets that form the hyponyms of the Synset passed as an argument to the function.

Hypernyms exist in several shapes and sizes, but the Synset is the most popular. The terms hyponym and hypernym are opposed. A Synset's hypernyms are returned in the form of an array of numbers.

For example, the words 'banana' and 'mango' are hyponyms for the word 'fruit'. In this case, they are more specific concepts of the word 'fruit'. Furthermore, the term "fruit" is a hypernym for the words "banana" and "mango" because it refers to the general idea of fruits.

Example:

```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('eclipse')
```

Output:

```bash
[Synset('eclipse.n.01'), Synset('overshadow.v.01'), Synset('eclipse.v.02')]
```

To get hyponym:

```python
import nltk
from nltk.corpus import wordnet as wn
print(wn.synset('eclipse.n.01').hyponyms())
```

Output:

```bash
[Synset('lunar_eclipse.n.01'), Synset('partial_eclipse.n.01'), Synset('solar_eclipse.n.01'), Synset('total_eclipse.n.01')]
```

To get hypernym:

```python
import nltk
from nltk.corpus import wordnet as wn
print(wn.synset('partial_eclipse.n.01').hypernyms())
```

Output:

```bash
[Synset('eclipse.n.01')]
```

### A look into Meronyms and Holonyms
Meronyms and Holonyms create a part-to-whole relationship. 

The Meronym represents the half, whereas the Holonym represents the whole. As you can see, the Meronym and Holonym both refer to the same thing, but in different ways.

For example, the word 'bedroom' is a Meronym for home. This is because the bedroom is considered a component of the house. Likewise, the nose, eyes, and mouth are Meronyms for the face.

Examples:

```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('face') 
```

Output:

```bash
[Synset('face.n.01'),Synset('expression.n.01'),Synset('face.n.03'), Synset('face.n.04'), Synset('face.n.05'),Synset('side.n.04'),Synset('face.n.07'),Synset('face.n.08'),Synset('grimace.n.01'),Synset('font.n.01'),Synset('face.n.11'),Synset('boldness.n.02'),Synset('face.n.13'), Synset('confront.v.02'),Synset('confront.v.01'),Synset('front.v.01'),Synset('face.v.04'),Synset('face.v.05'),Synset('confront.v.03'),Synset('face.v.07'),Synset('face.v.08'),Synset('face.v.09')]
```

Example for Holonym:

```python
import nltk
from nltk.corpus import wordnet as wn
wn.synset('face.n.01').part_holonyms() 
```

Output:

```bash
[Synset('head.n.01'), Synset('homo.n.02')]
```

Example for Meronym

```python
import nltk
from nltk.corpus import wordnet as wn
wn.synset('face.n.01').part_meronyms()  
```

Output:

```bash
[Synset('beard.n.01'),Synset('brow.n.01'),Synset('cheek.n.01'),Synset('chin.n.01'),Synset('eye.n.01'),Synset('eyebrow.n.01'),Synset('facial.n.01'),Synset('facial_muscle.n.01'),Synset('facial_vein.n.01'),Synset('feature.n.02'),Synset('jaw.n.02'),Synset('jowl.n.02'),Synset('mouth.n.02'),Synset('nose.n.01')]
```

### Understanding NLTK Entailments
An entailment is similar to an insinuation, a conclusion that can only be derived from something even though it is not specifically expressed.

For example
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('eat')
```

Output:

```bash
[Synset('eat.v.01'),
 Synset('eat.v.02'),
 Synset('feed.v.06'),
 Synset('eat.v.04'),
 Synset('consume.v.05'),
 Synset('corrode.v.01')]
 ```
 Example for Entailments
 
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synset('eat.v.01').entailments()
```

Output:

```bash
[Synset('chew.v.01'), Synset('swallow.v.01')]
```

### Conclusion
In this article, we have looked at the different concepts applied using the nltk wordnet in python. 

We started with understanding the synonyms and synsets by discussing how to use different methods to get Synsets, the definition, and all lemmas of a Synset. 

Then, we also looked at the Hypernyms and Hyponyms. Lastly, we went through Meronyms, Holonyms, and Entailments. 

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
