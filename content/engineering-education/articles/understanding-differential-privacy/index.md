---
layout: engineering-education
status: publish
published: true
url: /engineering-education/understanding-differential-privacy/
title: Understanding Differential Privacy
description: Introduction to differential privacy and methods used to preserve privacy in databases and how it is used with machine learning, and deep learning.
author: srishilesh-p-s
date: 2020-10-15T00:00:00-08:00
topics: [Security]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/understanding-differential-privacy/hero.png
    alt: Understanding Differential Privacy
---
In this article, we will get an overview on resolving the privacy issue using differential privacy. You will understand the basics on how privacy is preserved in databases, used with machine learning, and deep learning. Although understanding differential privacy requires a mathematical background, this article will cover a very basic overview of the concepts. We will also be coding a sample database and check if it is differentially private or not.
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
In this digital era, most companies are data-driven. Our data is harvested to help keep growing their economic incentives, in exchange for services provided to us. Research institutions often use and share data containing confidential information about individuals. Improper disclosure of such data can have adverse consequences for a data subject’s private information, or even lead to civil liability or [bodily harm](https://tinyurl.com/y37fnb94) related to [physical or mental health](https://fas.org/sgp/crs/misc/R45631.pdf).

In the late 2000s, Netflix ran a competition for building a recommendation system. To build it, they released a large dataset by anonymizing the data which didn’t leak the movie names or users' ratings. Two professors from the University of Texas [de-anonymized](https://www.cs.utexas.edu/~shmat/shmat_oak08netflix.pdf) them completely by comparing them with IMDB ratings, thus revealing the personal information about the dataset. This a great example of how data privacy has been compromised! Similarly, one such [data breach of health records happened in 1997](https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1748-720X.1997.tb01885.x), where medical records of the governor of Massachusetts were identified by matching anonymized medical encounter data with voter registration records.

This sort of data leakage is very alarming to both the users as well as organizations. To resolve this, we can either completely randomize the way the data is sent, using keys that are only decipherable at either end (Differential Learning). An alternative, being [federated learning](https://en.wikipedia.org/wiki/Federated_learning), where we bring the model to the data instead of or vice-versa. For the scope of this article, we will mainly focus on the concept of differential privacy to check for leakage in data.

### Differential Privacy

#### Former definition
*Anything that can be learned from a statistical database can be learned without accessing the database*

This definition does not hold. We need to consider two things, the first is people and the second is data. We need to protect people's rights while (correctly predicting) using their data. In certain cases, the whole database must be kept private, to protect the information, because there are chances of data leaks.

#### Modern definition
*It’s a promise made by a data holder to a data subject, that “You will not be affected, adversely or otherwise, by allowing your data to be used for study analysis, no matter what other studies, datasets or information is available” - Cynthia Dwork (Godfather of Differential Privacy)*

A simpler way to understand this modern definition is to go over an example:

Assume, we have a small database of 5000 entries with 0 or 1 as a value for each row, specifying certain property like 'people with cancer' as 1, and 'people without cancer' as 0. So, here our goal would be "Even if we removed detail of 1 person, the query of the database must not change” then the privacy of the information is protected. We will see its implementation very shortly.

![Differential Privacy working](/engineering-education/understanding-differential-privacy/differential_privacy.png)

[Image source](https://www.winton.com/research/using-differential-privacy-to-protect-personal-data)

### Differencing attacks
To continue with the previous explanation, let's say we want to check if privacy has been preserved for every individual in the database, what we can do is:

- Find the sum of all the values before removal of 1 persons' data (the original values)
- Then find the sum of all values after removing that person (a new database with 1 missing value)
- On finding the difference between both the summations, we get the exact detail of that person
thus we will know if he/she has cancer or not. This shows that the privacy of that individual has been leaked. This is one of the simplest differencing attacks, using a summation query.

Similarly, there are other types of differencing attacks using various other functions like `mean()`, `median()`, and so on. This measure of how much data is leaked through a query can be measured with **sensitivity** (evaluation of privacy leakage is measured in terms of `sensitivity`). In simple terms, it can be said as the largest possible difference for that one row, for any dataset. For our example, the sensitivity is 1, which means that adding or removing a single row from the dataset will change the count by at most 1.

### Implementing differential privacy
Now, we are going to implement differential privacy for a simple database query using a summation differencing attack. The database has only 1 column with Boolean types. The Boolean type denotes if a person possesses some private attribute or not (for example, if a person has a particular disease or not). And, we are going to learn, if the database is differentially private or not.

#### Creating a database
Create a simple database containing 5000 entries consisting of values 0s and 1s. Here, we randomly generate binary values using `random.choice()`

```python
  import random

  # the number of entries in our database
  num_entries = 5000

  original_database = [] # The original database containing 0s and 1s

  for i in range(num_entries):
    original_database.append(random.choice([0,1])) # Generate random number from choice of 0 and 1

  print(original_database)
```

**Output:**

```bash
Out[0]: [1, 1, 0, 0, 1, .., 0, 1, 1]
```

To demonstrate differential privacy, we try to manually omit certain values from the database, and check if privacy is still preserved or not. So, we create a method to accept `remove_index` as an argument and remove it from the database.

```python
  def create_database_with_missing_value(database,remove_index):
    database_before = database[0:remove_index] # List slicing till remove_index (0, remove_index)
    database_after = database[remove_index+1:] # List slicing after remove_index (remove_index + 1, len(original_database))
    return database_before + database_after # Concatenating both the lists

  create_database_with_missing_value(original_database, 3) # A sample output on removal of 3rd index
```

**Output:**

```bash
Out[1]: [ 1, 1, 0, 1, 0..., 0, 0, 0]
```

Now, we create a set of such databases (parallel databases), where index `i` is removed from each of the databases.

```python
  def create_set_of_databases(database):
    databases = list() # Contains lists of list - A set of databases

    for i in range(len(database)):
      new_database = create_database_with_missing_value(database,i) # Create a database after removing index i from it
      databases.append(new_database) # Append the new database to the list of databases

    return databases

  print(create_set_of_databases(original_database))
```

**Output:**

```bash
Out[2]: [[ 1, 1, 1, 0, 1, 1, 1, 1, 1, ...., 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
        [ 1, 1, 1, 0, 1, 1, 1, 1, 1, ...., 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
        [ 1, 1, 1, 0, 1, 1, 1, 1, 1, ...., 0, 0, 1, 0, 0, 1, 1, 0, 0, 0],
        .................
        [ 1, 1, 1, 0, 1, 1, 1, 1, 1, ...., 0, 0, 1, 0, 0, 1, 1, 0, 0, 0]]
```

Next, we create a set of databases based on the users' input. Modularizing the previous snippets as `create_database(num_entries)`

```python
  def create_databases(num_entries):
  
    original_database = [] # A list containing binary values
    for i in range(num_entries):
      original_database.append(random.choice([0,1])) # Generate random choices and append to the list

    databases = get_set_of_databases(original_database) # Create a set of databases, having 1 missing value in each

    return original_database, databases

  original_database, databases = create_set_of_databases(5000) # Create 5000 different set of databases with each database having 1 missing value
```

#### Evaluating differential privacy of a function
Seeing as we have created a sample database for demonstration of differential privacy. We should now be able to query the information and check if the query leaks private information or not.

As we mentioned before, the evaluation of privacy leakage is measured in terms of `sensitivity`. On iterating through each row of the database, we measure the difference in the output of the query.

Finding the mean and sum of all values in the original database (without removing values)

```python
  # A query to find the mean of values in each of the databases
  def query_mean(db):
      return sum(db)/len(db)

  # A query to find the sum of values in each of the databases
  def query_sum(db):
    return sum(db)

  full_db_result = query_mean(db) # Store the mean
  print(full_db_result)
```

**Output:**

```bash
Out[3]: 0.5130
```

Performing the query for all values in the new database (each containing 1 missing value)

```python
  def sensitivity(query,num_entries):
    original_db,dbs = create_db_and_parallels(num_entries)
    sensitive = 0 # Assume there is no leakage

    full_db_result = query_mean(original_db) # Query each new database

    for db in dbs:
      db_distance = abs(query_mean(db) - full_db_result) # Compare the new database with original database

    if(db_distance > sensitive):
      sensitive = db_distance # Measure if privacy has been leaked

    return sensitive
```

Now, let us compare how sensitivity varies for different differential attacks queries.

```python
  print('Sensitivity using Sum query:', sensitivity(query_sum, 5000))
  print('Sensitivity using Mean query: ', sensitivity(query_mean, 5000))
```

**Output:**

```bash
Out[4]: Sensitivity using Sum query: 1
Sensitivity using Mean query: 0.00010106021204242532
```

This demonstrates that the new set of databases containing 1 missing value in each of the databases has leaked information about the missing value. Thus, we can conclude that the privacy of that person has been leaked. The lower the value of sensitivity shows less privacy leakage.

Now, let's look at how the leakage can be resolved.

### Types of differential privacy
Database administrators have all the rights to query anything from the database, but what if we don't give our valid data in the database. Even if the administrators run a query to find any leakage, they won't be able to find out if the data is valid or not. That leads us to the next idea of adding noise to the inputs.

#### 1) Local differential privacy
- With this method, users share their data and add it to the database. It is more secure, but in case the database administrators, not as trustworthy.
- Adding noise before appending to the database.

#### 2) Global differential privacy
- With this method, the database administrator adds noise to the information that he/she has in the database. If the database administrator is not trustworthy, there are chances of privacy leakage.
- Adding noise before extracting the information from the database

- A *trusted curator* is the owner of the database upon which the global differential privacy is applied. They are trusted to apply differential privacy correctly.

![Local & Global differential privacy](/engineering-education/understanding-differential-privacy/local_global_privacy.png)

[Image source](https://www.accessnow.org/understanding-differential-privacy-matters-digital-rights/)

#### 3) Randomized response
This is a technique used in social sciences when trying to learn about the high-level trends for taboo behavior.

Let's understand this by performing a social(thought) experiment.

Imagine, we are conducting research in our neighborhood, to find out how many people have jaywalked before. So, we decide to ask every person in our neighborhood, if they had jaywalked before, and they must reply with a binary answer (yes/no). Since they may not tell us the truth, we can follow the steps below.

- Flip a coin two times
- If the first coin flips heads, we assume they answered honestly to the yes/no question
- If the first coin flips tails, we record the answer according to the second flip

Some people do not wish to disclose their private information to the public, therefore the questions posted by the social scientist must be formatted as such that the people are forced to answer the question honestly.

This is known as [**plausible deniability,**](https://en.wikipedia.org/wiki/Plausible_deniability#:~:text=Plausible%20deniability%20is%20the%20ability,confirm%20their%20participation%2C%20even%20if) it is a condition in which a subject can safely and believably deny knowledge of any particular truth that may exist because the subject is deliberately made unaware of said truth to benefit or shield the subject from any responsibility associated with the knowledge of such truth.

Below we have a code snippet that shows the implementation of plausible deniability:

```python
import torch # For installation, refer to this https://anaconda.org/pytorch/pytorch

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

db,_ = create_databases(5000)
db = torch.Tensor(db)
private_result,true_result = query(db)
print("With Noise: ",private_result)
print("Without Noise: ",true_result)
```

**Output:**

```bash
Out[5]: With Noise:  tensor(0.4880)
Without Noise:  tensor(0.4892)
```

The code above shows a demonstration of how randomized response noise can be added to perform plausible deniability. On adding noise, we can reduce the sensitivity of the query (reducing the data leakage).

> Differential privacy always requires some noise added to the queries to protect from differential attacks

### Differential privacy in real life
#### 1) Google and Apple
Tech giants like Google and Apple use it in every one of their services. For example, they collect your web searches or purchase history to improve the recommendations they give.

#### 2) Hospitals
Hospitals collect personal data from several patients. Now, let's say we decide to predict if a person has diabetes based on symptoms that other patients had. We must ensure that we must never leak information about any patient while working on our prediction models.

There are several such use-cases, where differential privacy is used. In the near future, we will find  more use case like these everywhere.

### Conclusion
We had an overview of what differential privacy is, and its importance in helping us preserve privacy. This blog serves only as an introduction to differential privacy, more about it can be found in the referenced articles below. To best understand the concepts, we must try implementing them, [this link](https://github.com/udacity/private-ai/blob/master/completed) would be a good starting point.

To summarize:
- We learned the importance of privacy.
- We learned what differential privacy is.
- We implemented privacy leakage in databases, to prove the need for differential privacy.
- We studied various methods to resolve data leakages.
- We went over a few use-cases of differential privacy.

### Further reading
- [https://arxiv.org/abs/1910.02578](https://arxiv.org/abs/1910.02578)
- [https://arxiv.org/abs/1911.00222](https://arxiv.org/abs/1911.00222)
- [https://medium.com/sap-machine-learning-research/client-sided-differential-privacy-preserving-federated-learning-1fab5242d31b](https://medium.com/sap-machine-learning-research/client-sided-differential-privacy-preserving-federated-learning-1fab5242d31b)
- [https://www.comparitech.com/blog/information-security/federated-learning/](https://www.comparitech.com/blog/information-security/federated-learning/)
- [https://towardsdatascience.com/ai-differential-privacy-and-federated-learning-523146d46b85](https://towardsdatascience.com/ai-differential-privacy-and-federated-learning-523146d46b85)
- [https://blog.cryptographyengineering.com/2016/06/15/what-is-differential-privacy/](https://blog.cryptographyengineering.com/2016/06/15/what-is-differential-privacy/)

---
Peer Review Contributions by [Saiharsha Balasubramaniam](/engineering-education/authors/saiharsha-balasubramaniam/)
