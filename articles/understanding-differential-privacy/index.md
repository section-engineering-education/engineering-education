---
layout: engineering-education
status: publish
published: true
url: /engineering-education/understanding-differential-privacy/
title: Understanding Differential Privacy
description: Introduction to differential privacy and methods used to preserve privacy in Databases
author: srishilesh-p-s
date: 2020-10-06T00:00:00-12:00
topics: [Security]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/understanding-differential-privacy/hero.jpg
    alt: Understanding Differential Privacy
---

In this article, we will get an overview of resolving the privacy issue using Differential privacy. You will understand the basics of how privacy is preserved in Databases used for Machine learning and Deep learning. Though understanding differential privacy requires a Mathematics background, this article covers a very basic overview of the concepts. You will also be coding a sample database and check if it is differentially private or not.
<!--more-->

### Table of contents

- [Introduction](#introduction)
- [Differential Privacy](#differential-privacy)
- [Differencing attacks](#differencing-attacks)
- [Implementing differential privacy](#implementing-differential-privacy)
- [Types of Differential privacy](#types-of-differential-privacy)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Introduction

In this digital era, most of the companies are data-driven. Our data is harvested to keep growing their economic incentives, in exchange for services provided to us. Research institutions often use and share data containing confidential information about individuals. Improper disclosure of such data can have adverse consequences for a data subject’s private information, or even lead to civil liability or bodily harm.

In the late 2000s, Netflix ran a competition for building a recommendation system. To build, they released a large dataset by anonymizing the data which didn’t leak the movie names or users' ratings. Two professors from the University of Texas [de-anonymized](https://www.cs.utexas.edu/~shmat/shmat_oak08netflix.pdf) them completely by comparing them with IMDB ratings,  thus revealing the personal information about the dataset. Data privacy is compromised! Similarly, one such data breach of health records happened in 1997 too.

This sort of data leakage is very alarming both to the users as well as organizations. To resolve this, we can either completely randomize the way the data is sent, using keys that are only decipherable at either end (Differential Learning). Well, there is an alternative to use Federated learning, where we bring the model to the data instead of vice-versa. Fundamentally, we must understand the concept of Differential Privacy to check for leakage in data.

### Differential Privacy

#### Former definition

*Anything that can be learned from a statistical database can be learned without accessing the database*

This definition does not hold always. We need to consider two things, first is people and the second is data. We need to protect people's rights as well as predict rightly using their data. In certain cases, the whole database must be kept private, to protect the information, because there are chances of data leaks.

#### Modern definition

*It’s a promise made by a data holder to a data subject, that “You will not be affected, adversely or otherwise, by allowing your data to be used for study analysis, no matter what other studies, datasets or information is available”
-Cynthia Dwork (Godfather of Differential Privacy)*

A simple way to explain the modern definition is

Assume, we have a small database of 5000 entries with 0 or 1 as a value for each row, specifying certain property like 'people with cancer' as 1, and 'people without cancer' as 0. So, here our goal is "Even if we remove detail of 1 person, the query of the database must not change” then the privacy of the information is protected. We will see its implementation very shortly.

![Differential Privacy working](/engineering-education/understanding-differential-privacy/differential_privacy.png)

[Image source](https://www.winton.com/research/using-differential-privacy-to-protect-personal-data)

### Differencing attacks

In continuation with the previous example, let's say we want to find if a specific person has cancer or not, so what we do is, find the sum of all the values, and then find the sum of all values after removing that person. On finding the difference between both the summations, we get the exact value of that person, thus we will know if he has cancer or not. This is one of the simplest differencing attacks, using summation.

Similarly, there are other types of differencing attacks using various other functions like mean(), median(), and so on. This measure of how much data is leaked through a query can be measured with **sensitivity.**

### Implementing differential privacy

Now, we are going to implement Differential privacy for a simple database query. The database has only 1 column with boolean types. The boolean type denotes if a person possesses some private attribute or not (example, if a person has a particular disease or not). And, we are going to learn, if the database is differentially private or not.

#### Creating a database

Create a simple database containing 5000 entries consisting of values True/False (1/0). Here, we randomly generate boolean values using `torch.rand()`

```python
  import torch

  # the number of entries in our database
  num_entries = 5000

  db = torch.rand(num_entries) > 0.5
  db
```

```bash
Out[0]: tensor([0, 1, 0,  ..., 0, 1, 1], dtype=torch.uint8)
```

To demonstrate Differential privacy, we try to manually omit certain values from the database, and check if privacy is till preserved or not. So, we create a method to accept `remove_index` as an argument and remove it from the database.

```python
  def get_parallel_db(db, remove_index):
      return torch.cat((db[0:remove_index], db[remove_index+1:]))
  
  get_parallel_db(db, 3)
```

```bash
Out[1]: tensor([ True, False, False,  ..., False, False, False])
```

Now, we create a set of such databases (Parallel databases), where index `i` is removed from each of the databases.

```python
  def get_parallel_dbs(db):
      parallel_dbs = list() # A list containing all the databases
      for i in range(len(db)):
          pdb = get_parallel_db(db, i) # Create a database after removing index i from it
          parallel_dbs.append(pdb) # Append the new database to the list of databases
      return parallel_dbs

  get_parallel_dbs(db)
```

```bash
Out[2]: [tensor([ True,  True,  True, False,  True,  True,  True,  True,  True, False,
         False,  True, False, False,  True,  True, False, False, False]),
 tensor([ True,  True,  True, False,  True,  True,  True,  True,  True, False,
         False,  True, False, False,  True,  True, False, False, False]),
 tensor([ True,  True,  True, False,  True,  True,  True,  True,  True, False,
         False,  True, False, False,  True,  True, False, False, False]), .................
 tensor([ True,  True,  True, False,  True,  True,  True,  True,  True, False,
         False,  True, False, False,  True,  True, False, False, False]),
```

Now, we create a set of databases based on the users' input

```python
  def create_db_and_parallels(num_entries):
      db = torch.rand(num_entries) > 0.5
      pdbs = get_parallel_dbs(db)
      return db, pdbs

  db, pdbs = create_db_and_parallels(5000) # Create 5000 different parallel databases with each database having 1 missing value
```

#### Evaluating differential privacy of a function

Having created a sample database for demonstration of Differential privacy. We should be able to query the information and check if the query leaks private information or not.

Evaluation of privacy leakage is measured in terms of `sensitivity`. On iterating through each row of the database, we measure the difference in the output of the query.

Finding the sum of all values in the Original database (without removing values)

```python
  # A query to find the sum of values in each of the databases
  def query(db):
      return db.sum()

  full_db_result = query(db) # Store the summation
  print(full_db_result)
```

```bash
Out[4]: tensor(2454)
```

Finding the sum of all values in New database (each containing 1 missing value)

```python
  sensitivity = 0 # Assume there is no leakage
  for pdb in pdbs:
      pdb_result = query(pdb) # Query each new database

      db_distance = torch.abs(pdb_result - full_db_result) # Compare the new database with original database

      if(db_distance > sensitivity):
          sensitivity = db_distance # Measure if privacy has been leaked
  print(sensitivity)
```

```bash
>> tensor(1)
```

This demonstrates that the new set of databases containing 1 missing value in each of the databases has leaked information about the missing value. Thus, we conclude that the privacy of that person has been leaked.

Now, let us have a look at how the leakage can be resolved.

### Types of Differential privacy

Database administrators have all rights to query anything from the database, but what if we don't give our original data in the database. Even if they query for finding leakage, they won't be able to find if the data is valid or not. That leads to the next idea of adding noise to the inputs.

#### 1) Local Differential Privacy

- Adding noise to the function inputs. This is done by the users, who share their data and add to the database. It is more secure, in case the Database Administrators is not trustworthy.
- Adding Noise before appending to the database

#### 2) Global Differential Privacy

- Adding noise to the function outputs. This is done by the Database Administrator, who adds noise to the information that he has in the database. If the Database Administrator is not trustworthy, there are chances of privacy leakage.
- Adding Noise before extracting the information from the database

    **Trusted Curator**

    An owner of the database upon which the Global Differential Privacy is applied. They are trusted to apply the Differential Privacy correctly.

![Local & Global differential privacy](/engineering-education/understanding-differential-privacy/local_global_privacy.png)

[Image source](https://www.accessnow.org/understanding-differential-privacy-matters-digital-rights/)

#### 3) Randomized Response

A technique used in social sciences when trying to learn about the high-level trends for taboo behavior.

Let us understand this by performing a social experiment.

Imagine, you are experimenting in your neighborhood, to find out how many people have jaywalked before. So, you decide to ask every person in your neighborhood, if they had jaywalked before, and they must reply with a binary answer (yes/no). Since they would not tell you the truth, you follow the below steps

- Flip a coin two times
- If the first coin flips heads, answer honestly to the yes/no question
- If the first coin flips tails, answer according to the second flip

Some do not wish to disclose their private information to the public, therefore the questions posted by the socialist must be questioning such that the people are forced to answer the question honestly.

This is known as **Plausible deniability,** it is a condition in which a subject can safely and believably deny knowledge of any particular truth that may exist because the subject is deliberately made unaware of said truth to benefit or shield the subject from any responsibility associated with the knowledge of such truth.

The below code shows the implementation of Plausible deniability

```python
import torch

# Number of entries in the sample database
num_entries = 5000
# Generating random numbers
db = torch.rand(num_entries) > 0.5

def query(db):
  true_result = torch.mean(db.float())
  # Mean on the original database
  first_flip_coin = (torch.rand(0,len(db)) > 0.5).float()
  # Finding the first coin flip
  second_flip_coin = (torch.rand(0,len(db)) > 0.5).float()
  # Finding the second coin flip
  augmented_database = db.float() * first_flip_coin + (1 - first_flip_coin) * second_flip_coin
  # Removing the skew in the second coin flip
  db_result = torch.mean(augmented_database.float()) * 2 -0.5
  return db_result,true_result
```

The above code shows a demonstration on how Randomized response noise can be added to perform plausible deniability

> Differential privacy always requires some noise added to the queries to protect from Differential attacks

### Differential privacy in real life

1) Tech giants like Google and Apple use it in every one of their services. For example, they collect your web searches or purchase history to improve your recommendations.

2) Hospitals collect personal data from several patients. Now, you decide to predict if a person has diabetes based on symptoms that other patients had. So, you collect the information from your neighborhood hospitals. You must ensure that you must never leak information about any patient while working on your prediction models.

There are several such use-cases, where differential privacy is used. In the near future, you will find this everywhere.

### Conclusion

We have had an overview of what Differential privacy is, and its importance in helping us preserve privacy. This blog serves only as an introduction to differential privacy, more about it can be found in the referenced articles below. To understand the concepts, you must try implementing them, [this](https://github.com/udacity/private-ai/blob/master/completed) would be a starting point.

To summarize:

- We learnt the importance of privacy.
- We learnt what differential privacy is.
- We implemented privacy leakage in databases, to prove the need for differential privacy.
- We studied various methods to resolve data leakages.
- We learnt a few use-cases of differential privacy.

### Further reading

- [https://arxiv.org/abs/1910.02578](https://arxiv.org/abs/1910.02578)
- [https://arxiv.org/abs/1911.00222](https://arxiv.org/abs/1911.00222)
- [https://medium.com/sap-machine-learning-research/client-sided-differential-privacy-preserving-federated-learning-1fab5242d31b](https://medium.com/sap-machine-learning-research/client-sided-differential-privacy-preserving-federated-learning-1fab5242d31b)
- [https://www.comparitech.com/blog/information-security/federated-learning/](https://www.comparitech.com/blog/information-security/federated-learning/)
- [https://towardsdatascience.com/ai-differential-privacy-and-federated-learning-523146d46b85](https://towardsdatascience.com/ai-differential-privacy-and-federated-learning-523146d46b85)
- [https://blog.cryptographyengineering.com/2016/06/15/what-is-differential-privacy/](https://blog.cryptographyengineering.com/2016/06/15/what-is-differential-privacy/)