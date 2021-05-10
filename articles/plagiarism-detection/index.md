---
layout: engineering-education
status: publish
published: true
url: /engineering-education/plagiarism-detection/
title: Automated Plagiarism Detection Bot
description: Plagiarism Detection is how one can compare two documents and find out how similar they are. This article explores one of the more basic algorithms in finding the similarity of a document.
author: earl-potters
date: 2020-09-18T00:00:00-08:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/plagiarism-detection/hero.jpg
    alt: Plagiarism Detection example image

---
**Plagiarism** or taking another persons ideas without proper credit or representation can feel like someone just kidnapped your idea. Actually, plagiarism derives its Latin root from *plagiarius* which literally means "kidnapper". So plagiarism is widely considered bad overall.
<!--more-->

>**A:** What's worse than someone stealing your work?
![Funny](/engineering-education/plagiarism-detection/funny.jpg)
>
>
>**Q:** Someone stealing your work and claiming it's theirs!!!
>
>[Image Source:](https://imgur.com/gallery/VrgyDwC)


### Plagiarism Detection
Anyway, I won't discuss the ethical upset and academic dishonesty plagiarism can bring because that's not what this article is about. If you want to know more about it I recommend you visit this [article](https://www.scribbr.com/category/plagiarism/).

### Overview  
In this article, I will split the content in two parts:
- Overview of Text Similarity
  - Brief Introduction
  - Math Formulation
  - Example


- Overview of the Algorithm
  - Installation and Setup
  - Code Walk-through
  - Demo Plagiarism Detector


*Let's get to it!*

### Text Similarity: Formulating the Problem
**Text Similarity** is determining the likeness of two textual documents.

We want to find the numerical value that will indicate how *"close"*  or how similar two text documents are. Let's divide the steps involved in finding how two texts are similar.

1.   We need to define a textual document in a **algebraic model** we can actually do useful calculations with. A word document would not a useful representation therefore we will define a useful model to work with the data.
2.  After we have converted the text document to a useful model, we want to define **(mathematical) operations** that will be used as a *proxy for similarity* next. It is important to demonstrate how the operation will be used in the model.
3.  Finally, we must get a useful **normalized numerical value** that will tell us how similar two text are. That will give us an indication whether our method is effective in finding the similarity of text documents.

>The following steps are actually rather simple but how you go about answering it can vary greatly.

### Math Formulation

#### Step 1:
A popular way of characterizing text documents is by using a [Vector space model](https://en.wikipedia.org/wiki/Vector_space_model). The idea is to represent terms as vectors. A term can be anything: single word, multiple keywords or even a phrase. Each will count as a non-zero vector corresponding to a separate dimension.

According to this [paper](https://ptabdata.blob.core.windows.net/files/2017/IPR2017-01039/v20_EX1020_Salton,%201975.pdf), mathematically we can define a document space as:

`$$D_i = (d_{i1}, d_{i2}, ... , d_{it})$$

$\textit{Where}$

$$ D_i~~represents~the~documents~within~a~document~space\\
   d_{it}~~represents~the~i^{th}~document's~t^{th}~term $$`


Every index term will represent a **dimension** in our vector space.
For example, if we were to use the English dictionary as our document we would have as many dimension as the English vocabulary.

Now that we have our model let's move on!

#### Step 2:
Using this model, we can now apply an operation to evaluate the similarity coefficient. In this article we will use a method called the **Cosine Similarity**. The cosine similarity metric measures the *cosine angle* of two non-zero vectors.

The mathematical definition, as shown from [wiki](https://en.wikipedia.org/wiki/Cosine_similarity), can be defined as:

`$$ {\displaystyle {\text{similarity}}=\cos(\theta )={\mathbf {A} \cdot \mathbf {B}  \over \|\mathbf {A} \|\|\mathbf {B} \|}={\frac {\sum \limits _{i=1}^{n}{A_{i}B_{i}}}{{\sqrt {\sum \limits _{i=1}^{n}{A_{i}^{2}}}}{\sqrt {\sum \limits _{i=1}^{n}{B_{i}^{2}}}}}},} $$`


`$ where~A_i~and~B_i~are~components~of~vector~A~and~B~respectively$`

#### Step 3:
Finally, the cosine similarity will give an outcome bounded by $ [0,1] $ (Not $[-1,1]$ because the document space is bounded in positive space only).

- 1 - very similar
- 0 - not similar

### Example Plagiarism
For this example, I am going to replicate the example from [Selva Prabhakaran](https://www.machinelearningplus.com/nlp/cosine-similarity/). Let us take 3 documents on the topic of inheritance.

`Document 1` is a snippet from the educba site on [*what is inheritance in programming*](https://www.educba.com/what-is-inheritance-in-programming/).

`Document 2` and `Document 3` are from the Wikipedia page on [*inheritance(object oriented programming)*](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)).

Only difference is that `Document 3` is a subsection of `Document 2`. How do you think their similarities will compare?

#### Three Document Similarity Example
![plagiarism_blog_post](/engineering-education/plagiarism-detection/plagarism_blog_post.png)
Image Source: Author -- Earl Potters


From the example above you can see three similar documents that share a central theme, namely inheritance.

With the example above, I am quantitatively measuring the similarity between the 3 documents using 3 different metrics: **total common words** (similar but not the same as [Jaccard index](https://en.wikipedia.org/wiki/Jaccard_index)), [**Euclidean distance**](https://en.wikipedia.org/wiki/Euclidean_distance) and [**Cosine similarity**](https://en.wikipedia.org/wiki/Cosine_similarity).

We have limited our quantitative analysis scope by only looking at three key-words: **'inheritance'**, **'class'**, and **'object'**. We have briefly talked about cosine similarity but I want to explain what it means in graphical terms.

To explain what I mean, here is a 3D projection of the 3 documents.

#### 3D Document Projection
![3D Projection](/engineering-education/plagiarism-detection/3d-projection-plagarism-blog.png)

Image Source: Author -- Earl Potters

As illustrated by this example, we can see that `doc 2` and `doc 3` are closer in orientation by magnitude. Conversely, `doc 1` and `doc 3` are the closest using the Euclidean distance metric.

The graphical representation of common words is a intersection which can be seen as a Venn diagram.

#### Document Intersection
![total common words](/engineering-education/plagiarism-detection/ven-diagrahm.png)
Image Source: Author -- Earl Potters

You can see 3 intersecting circles that contain the set of all words in their document space. The intersection of circles is the intersection of both word sets.

#### Compare and Contrast
As you can figure out, all 3 similarity metrics have their own interpretation of similarity.

- Cosine similarity checks the **orientation** of two documents
- Euclidean distance checks the **distance magnitude** of two documents
- Total common words checks the **intersection** of two documents.

Looking at the example we can see why cosine similarity is a good metric for judging similarity, rather than using total common words or Euclidean distance.

The reason for that is because total common words is very biased on file sizes while Euclidean distance is biased when comparing two different document sizes.

### Plagiarism Detector Code
Now we are at the coding step! By now you should know the following things:

- A document can be converted into a **Vector space model** where the documents are represented as vectors, mostly determined by term frequency.
- **Cosine Similarity** is an operation on vectors that will allow us to determine the similarity of two documents.
- We can display a **normalized numerical value** between 0-1 that indicates the similarity between two documents.

#### Getting Started
In this short overview I will assume you are on an **Ubuntu** Linux operating system with **Conda** package manager.

##### 1. Installing Dependencies
You we need to install the following: `Pandas` and `scikit-learn`

```Bash
$ conda install scikit-learn pandas
```

##### 2. Verification
To ensure that the packages are installed properly open up your Python interpreter and run the follow code.

```Python
# loading python modules
import sklearn
import pandas as pd

# Verifying version
sklearn.show_versions()
pd.show_versions()
```
> You may need to install pytest and hypothesis for pandas to run command `pd.show_versions()`
> Just run command`$ conda install pytest hypothesis`

#### Code Walkthrough
Now that we have everything set up it's time to code!

##### 1. Load Python Modules
Let's first import important modules

```Python
# Load Python Modules
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import pandas as pd

```

##### 2. Defining Data Set
Here we define the data. I have set up a list of `tuples(name, data)`.

```Python
# define data
corpus = [
        ('doc_1', 'This is the first document.'),
        ('doc_2', 'This document is the second document.'),
        ('doc_3' ,'And this is the third one.'),
        ('doc_4', 'Is this the first document?')
    ]

```

##### 3. Process the Data/Helper Functions
*Using Count Vectorize*
Now we need to process the data. Here is a neat trick to separate the names and data into lists.

```Python
# split doc_names and doc_data
doc_names, doc_data = zip(*corpus)
```
Output:
```Python
doc_names -> ('doc_1', 'doc_2', 'doc_3', 'doc_4')
```
```Python
doc_data -> ('This is the first document.', \
            'This document is the second document.', \
            'And this is the third one.', \
            'Is this the first document?')
```

##### 4. Vectorize Data
This is the most crucial step. We need to convert the data into a vector space. Luckily `sklearn` as a function called `CountVectorizer()` that will do the heavy lifting.

```Python
#create an instance of the class Countvectorizer that converts a collection of text document to a matrix of token counts
vectorizer = CountVectorizer()


# vectorize doc_data
document_term_matrix = vectorizer.fit_transform(doc_data).toarray() -> array([[0, 1, 1, 1, 0, 0, 1, 0, 1],
                                                                              [0, 2, 0, 1, 0, 1, 1, 0, 1],
                                                                              [1, 0, 0, 1, 1, 0, 1, 1, 1],
                                                                              [0, 1, 1, 1, 0, 0, 1, 0, 1]])

# returns full list of tokenized words
tokenized_words =  vectorizer.get_feature_names() -> ['and', 'document', 'first', 'is', 'one', 'second', 'the', 'third', 'this']

# output pandas table document_term_matrix
df_document_term_matrix = pd.DataFrame(data=document_term_matrix,
                                      columns= tokenized_words,
                                      index=doc_names)
df
```

![table](/engineering-education/plagiarism-detection/screenshot1.png)

Image Source: Author -- Earl Potters

###### *Now we have our Data set in a Model!*
With the vectorized data from the previous step we can calculate the cosine similarity by using `cosine_similarity` by `sklearn`.

##### 5. Create Similarity feature aka Cosine Similarity

```Python
# return compute dot product on itself which will give the cosine_similarity matrix
cosine_matrix = cosine_similarity(document_term_matrix) -> array([[1.        , 0.79056942, 0.54772256, 1.        ],
                                                                  [0.79056942, 1.        , 0.4330127 , 0.79056942],
                                                                  [0.54772256, 0.4330127 , 1.        , 0.54772256],
                                                                  [1.        , 0.79056942, 0.54772256, 1.        ]])
# output pandas table of cosine_matrix
df_cosine_matrix = pd.DataFrame(data=cosine_matrix,
                    columns= doc_names,
                    index=doc_names)
df
```

![table 2](/engineering-education/plagiarism-detection/screenshot2.png)

Image Source: Author -- Earl Potters

##### 6. Test Feature
Finally we can print the result and see if we have a reasonable output.

```Python
# print pandas table
print(df_document_term_matrix)
# print pandas table
print(df_cosine_matrix)
```

Your output should look like this.

`df_document_term_matrix`

![table](/engineering-education/plagiarism-detection/screenshot1.png)

Image Source: Author -- Earl Potters

`df_cosine_matrix`

![table 2](/engineering-education/plagiarism-detection/screenshot2.png)

Image Source: Author -- Earl Potters


##### 7. Review/Refactor
Here is the refactored original code.

```Python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import pandas as pd


class Plagiarism_Checker():

    def __init__(self, corpus, vectorizer=None):
        self.doc_names , self.doc_data = zip(*corpus)
        self._vectorizer = vectorizer


    @property
    def vectorizer(self):
        if self._vectorizer is None:
            raise TypeError("Vectorizer can't be None")
        if not hasattr(self._vectorizer, '_fit_transform'):
            self.__compute_document_term_matrix()
        return self._vectorizer

    @vectorizer.setter
    def vectorizer(self, value):
        if not isinstance(value, None):
            self._vectorizer = value
            self.__compute_document_term_matrix()
        else:
            self._vectorizer = value

    def __compute_document_term_matrix(self):
        self._vectorizer._fit_transform= self._vectorizer.fit_transform(self.doc_data)



    def get_document_term_matrix(self):
        count_vector = self.vectorizer._fit_transform.toarray()
        return count_vector


    def get_feature_words(self):
        return  self.vectorizer.get_feature_names()


    def get_document_term_matrix_dataframe(self):
        df = pd.DataFrame(data= self.get_document_term_matrix(),
                  columns= self.get_feature_words(),
                  index=self.doc_names)

        return df


    def get_cosine_similarity_dataframe(self):
        # compute cosine similarity matrix
        df = pd.DataFrame(data= cosine_similarity(self.get_document_term_matrix()),
                  columns=self.doc_names,
                  index=self.doc_names)

        return df


class Count_Vectorizer_Detector(Plagiarism_Checker):

    def __init__(self, corpus):
        super().__init__(corpus, vectorizer= CountVectorizer())

```

##### BONUS
I added tdif vectorizer which also fits with the class above

```Python
from sklearn.feature_extraction.text import TfidfVectorizer

class Tdif_Vectorizer_Detector(Plagiarism_Checker):

    def __init__(self, corpus):
        super().__init__(corpus , vectorizer=TfidfVectorizer(smooth_idf=True,use_idf=True) )




    def get_tfidf_weights_dataframe(self):
        # print idf values # need to compute self.vectorizer.idf_ if not computed
        df_idf = pd.DataFrame(self.vectorizer.idf_, index=self.get_feature_words(),columns=["idf_weights"])

         # sort ascending
        df_idf.sort_values(by=['idf_weights'])

        return df_idf
```




### Final Demo visualizations
```Python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import pandas as pd


class Plagarism_Checker():

    def __init__(self, corpus, vectorizer=None):
        self.doc_names , self.doc_data = zip(*corpus)
        self._vectorizer = vectorizer


    @property
    def vectorizer(self):
        if self._vectorizer is None:
            raise TypeError("vecotrizer can't be None")
        if not hasattr(self._vectorizer, '_fit_transform'):
            self.__compute_document_term_matrix()
        return self._vectorizer

    @vectorizer.setter
    def vectorizer(self, value):
        if not isinstance(value, None):
            self._vectorizer = value
            self.__compute_document_term_matrix()
        else:
            self._vectorizer = value

    def __compute_document_term_matrix(self):
        self._vectorizer._fit_transform= self._vectorizer.fit_transform(self.doc_data)



    def get_document_term_matrix(self):
        count_vector = self.vectorizer._fit_transform.toarray()
        return count_vector


    def get_feature_words(self):
        return  self.vectorizer.get_feature_names()


    def get_document_term_matrix_dataframe(self):
        df = pd.DataFrame(data= self.get_document_term_matrix(),
                  columns= self.get_feature_words(),
                  index=self.doc_names)

        return df


    def get_cosine_simularity_dataframe(self):
        # compute cosine simularity matrix
        df = pd.DataFrame(data= cosine_similarity(self.get_document_term_matrix()),
                  columns=self.doc_names,
                  index=self.doc_names)

        return df


class Count_Vectorizer_Detector(Plagarism_Checker):

    def __init__(self, corpus):
        super().__init__(corpus, vectorizer= CountVectorizer())






class Tdif_Vectorizer_Detector(Plagarism_Checker):

    def __init__(self, corpus):
        super().__init__(corpus , vectorizer=TfidfVectorizer(smooth_idf=True,use_idf=True) )




    def get_tfidf_weights_dataframe(self):
        # print idf values # need to compute self.vectorizer.idf_ if not computed
        df_idf = pd.DataFrame(self.vectorizer.idf_, index=self.get_feature_words(),columns=["idf_weights"])

         # sort ascending
        df_idf.sort_values(by=['idf_weights'])

        return df_idf

if __name__ == "__main__":


    # define document data
    corpus = [
    ('doc_1', 'This is the first document.'),
        ('doc_2', 'This document is the second document.'),
    ('doc_3' ,'And this is the third one.'),
        ('doc_4', 'Is this the first document?')
    ]

    obj = Count_Vectorizer_Detector(corpus)

    cosine_matrix = obj.get_cosine_simularity_dataframe()

    print(cosine_matrix)
```

Link to my code online is [here](https://repl.it/join/phfqwtnd-slyracoon23).

Link to the GitHub code is [here](https://github.com/Slyracoon23/plagarism_detector).


### References:
https://ptabdata.blob.core.windows.net/files/2017/IPR2017-01039/v20_EX1020_Salton,%201975.pdf

https://en.wikipedia.org/wiki/Cosine_similarity

https://www.machinelearningplus.com/nlp/cosine-similarity/

---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)
