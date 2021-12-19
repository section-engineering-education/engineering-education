### Intoduction
The WordNet English dictionary is part of Python's Natural Language Tool Kit (NLTK).  Natural Language Processing (NLP) may be made simple and straightforward using this comprehensive set of tools. This tutorial will cover the basic actions that can be done using this tool.

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
WordNet categorizes English words into groups of synonyms, which are referred to as synsets (short for set of synonyms). Every Synset contains a name, a part-of-speech ( include nouns, verbs, adverbs, and adjectives) and a number. Synsets are used to store synonyms, where each word in the synset shares the same meaning . Essentially, each synset is a collection of synonyms. Some of the words have just one Synset, while others have multiple Synsets.  Every synset has a definition associated with it. Synset make it easier for users to look up words in the WordNet database.

#### 1. Getting Synsets.
The function wordnet.synsets('word') is used to return an array containing all the Synsets related to the word passed to it as the argument.

```python
import nltk
from nltk.corpus import wordnet as wn 
wn.synsets('book')
```

OUTPUT
```bash
[Synset('book.n.01'),Synset('book.n.02'),Synset('record.n.05'),Synset('script.n.01'),Synset('ledger.n.01'),Synset('book.n.06'),Synset('book.n.07'),Synset('koran.n.01'),Synset('bible.n.01'),Synset('book.n.10'),Synset('book.n.11'),Synset('book.v.01'),Synset('reserve.v.04'),Synset('book.v.03'),Synset('book.v.04')]
```
The function also allows you to restrict the word's part of speech by providing an optional position argument.

Example for verbs
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('book', pos=wn.VERB)
```
OUTPUT
```bash

[Synset('book.v.01'),
 Synset('reserve.v.04'),
 Synset('book.v.03'),
 Synset('book.v.04')]
 
```
Example for nouns
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('book', pos=wn.NOUN)
```
OUTPUT
```bash
[Synset('book.n.01'),Synset('book.n.02'),Synset('record.n.05'),Synset('script.n.01'),Synset('ledger.n.01'),Synset('book.n.06'),Synset('book.n.07'),Synset('koran.n.01'),Synset('bible.n.01'),Synset('book.n.10'),Synset('book.n.11')]
```
#### 2.  Getting the definition of a Synset.
To get the definition of a Synset, you can utilize the definition() function, which can be used to further analyze the Synset for a definition that is common to all of its Lemmas. This method returns a string that conforms to the most basic specification. There are two ways of achieving this:

Example one

In order to get at one of the items in the array provided by synsets('word'), we can do the following:
```python
import nltk
from nltk.corpus import wordnet as wn
synset_array = wn.synsets('book')
synset_array[1].definition()
```
OUTPUT
```bash
'physical objects consisting of a number of pages bound together
```
Example two
```python
import nltk
from nltk.corpus import wordnet as wn
synset_array = wn.synsets('book')
synset_array[3].definition()
```
OUTPUT
```bash
'a written version of a play or other dramatic composition; used in preparing for a performance'
```
Names, a part of speech, and how many times a Synset has been defined can be obtained using Synset () 

Example one
```python
import nltk
from nltk.corpus import wordnet as wn
wordnet.synset('book.n.02').definition()
```
OUTPUT
```bash
'physical objects consisting of a number of pages bound together
```
Example two
```python
import nltk
from nltk.corpus import wordnet as wn
wordnet.synset('script.n.01').definition()
```
OUTPUT
```bash
'physical objects consisting of a number of pages bound together
```
#### 3. How to get Lemmas of a Synset.
Lemmas are all the words that are in a Synset. Using the Lemma_names() method the user is able to get all lemmas of the specified synset. This method can be used in two different ways to get an array of all the Lemma names:

First way
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('book')
synset_array = wn.synsets('book')
print(synset_array[3].lemma_names())
```
OUTPUT
```bash
['script', 'book', 'playscript']
```
Second way
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('book')
print(wn.synset('book.n.07').lemma_names())
```
OUTPUT
```bash
['book', 'rule_book']
```
### Understanding NLTK Hypernyms and Hyponyms.
A Hyponym is a type of Synset that has been modified for a specific purpose instead of a generic Synset. 

In terms of inheritance, it is similar to the concept of a "child class." A synonym is a function that returns an array containing all of the Synsets that are Hyponyms of the Synset that was passed in as an argument to the function (). 

Hypernyms exist in several shapes and sizes, but the Synset is by far the most popular. The terms Hyponym and Hypernym are opposed. A Synset's hypernyms are returned in the form of an array of numbers ().

For example, the words 'banana' and 'mango' are hyponyms for the word 'fruit'. In this case, they are more specific concepts of the word 'fruit'. Furthermore, the term "fruit" is a hypernym for the words "banana" and "mango" because it refers to the general idea of fruits.

EXAMPLE
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('eclipse')
```
OUTPUT
```bash
[Synset('eclipse.n.01'), Synset('overshadow.v.01'), Synset('eclipse.v.02')]
```
To get Hyponym 
```python
import nltk
from nltk.corpus import wordnet as wn
print(wn.synset('eclipse.n.01').hyponyms())
```
OUTPUT
```bash
[Synset('lunar_eclipse.n.01'), Synset('partial_eclipse.n.01'), Synset('solar_eclipse.n.01'), Synset('total_eclipse.n.01')]
```
To get Hypernym
```python
import nltk
from nltk.corpus import wordnet as wn
print(wn.synset('partial_eclipse.n.01').hypernyms())
```
OUTPUT
```bash
[Synset('eclipse.n.01')]
```
### A look into Meronyms and Holonyms
Meronyms and Holonyms create a part-to-whole relationship. The meronym represents the half, whereas the holonym represents the whole. As you can see, the Meronym and holonym both refer to the same thing, but in different ways.

For example, the word 'bedroom' is a meronym for the word home. This is because the bedroom is considered a component of the house. Likewise, the words nose, eyes, and mouth are all meronyms for the word face.

Examples
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('face') 
 ```
 OUTPUT
```bash
[Synset('face.n.01'),Synset('expression.n.01'),Synset('face.n.03'), Synset('face.n.04'), Synset('face.n.05'),Synset('side.n.04'),Synset('face.n.07'),Synset('face.n.08'),Synset('grimace.n.01'),Synset('font.n.01'),Synset('face.n.11'),Synset('boldness.n.02'),Synset('face.n.13'), Synset('confront.v.02'),Synset('confront.v.01'),Synset('front.v.01'),Synset('face.v.04'),Synset('face.v.05'),Synset('confront.v.03'),Synset('face.v.07'),Synset('face.v.08'),Synset('face.v.09')]
 ```
Example for Holonym
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synset('face.n.01').part_holonyms() 
```
OUTPUT
```bash
[Synset('head.n.01'), Synset('homo.n.02')]
```
Example for Meronym
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synset('face.n.01').part_meronyms()  
 ```
 OUTPUT
 ```bash
[Synset('beard.n.01'),Synset('brow.n.01'),Synset('cheek.n.01'),Synset('chin.n.01'),Synset('eye.n.01'),Synset('eyebrow.n.01'),Synset('facial.n.01'),Synset('facial_muscle.n.01'),Synset('facial_vein.n.01'),Synset('feature.n.02'),Synset('jaw.n.02'),Synset('jowl.n.02'),Synset('mouth.n.02'),Synset('nose.n.01')]
```
### Understanding NLTK Entailments
An entailment is similar to an insinuation which ia a conclusion that can only be derived from something even though it is not specifically expressed.

For example
```python
import nltk
from nltk.corpus import wordnet as wn
wn.synsets('eat')
```
OUTPUT
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
OUTPUT
```bash
[Synset('chew.v.01'), Synset('swallow.v.01')]
```

### Conclusion
In this article, we have looked at the different concepts that are applied using the nltk wordnet in python. We started with understanding the Synonyms and Synsets by discussing how to use different methods to get Synsets, the definition of Synsets, and all Lemmas of a Synset. We also looked at the Hypernyms and Hyponyms. Lastly, we went through Meronyms, Holonyms, and Entailments. 
