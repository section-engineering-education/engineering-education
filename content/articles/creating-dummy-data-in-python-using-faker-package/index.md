---
layout: engineering-education
status: publish
published: true
url: /creating-dummy-data-in-python-using-faker-package/
title: Creating Dummy Data using Python Faker Package
description: This tutorial will help the reader understand how to create various types of dummy data using Faker package. We will also learn how to build a fake dataset for training machine learning models.
author: diana-peter
date: 2022-01-12T00:00:00-07:59
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-dummy-data-in-python-using-faker-package/hero.jpg
    alt: Creating Dummy Data using Python Faker Package Hero Image
---
It is critical to test and evaluate software and hardware with dummy data before working with actual data. Running the code through various scenarios and test cases allows the detection of possible bugs.
<!--more-->
Faked data can be easily generated with a Python library faker. In this tutorial, we will learn how dummy data is generated using the Python Faker library.

### Table of contents
- [Methods and types for generating dummy data](#methods-and-types-for-generating-dummy-data)
- [Other dummy data creation methods](#other-dummy-data-creation-methods)
- [A few more words regarding dummy data](#a-few-more-words-regarding-dummy-data)
- [Conclusion](#conclusion)
- [References](#references)

### Pre-requisites
To follow along, you must have:
- A good understanding of the Python programming language.
- Python IDE installed. To install Python visit [this documentation](https://www.python.org/).

To begin with, let's install the Python library, `Faker`, as shown:

```bash
pip install faker
```

### Methods and types for generating dummy data
#### Create and initialize faker generators
You can generate and initialize fake generators using `Faker().` Using the Faker generator, you'll be able to generate any data you desire.

```Python
from faker import Faker
ourFake = Faker()
```

#### Create random text
We use `text()` method to create a paragraph with random text message:

```Python
ourFake.text()
```

**Output:**

```bash
Business happy black arrives end. Election wear list. Would lay though.\nCentury collection everybody key fight. Goal nation woman assume both.
```

For generating addresses, we use `address()` and for names we use `name()` methods:

```Python
ourFake.address()
```

**Output:**

```bash
3722 Garza Port\nSmithshire, UT 28618
```

```python
ourFake.name()
```

**Output:**

```bash
Dana Williams
```

#### Create dummy data using `seed()`
You may wish to use the same collection of data again. Here, seeding the generator is a viable option.

A random function's state is saved using the seed function, allowing the process to create the same random numbers again and over again, whether the code is executed on the same system or not. The number created by the generator serves as the seed.

In addition to seeding, the dummy data is generated using faker. So, you don't have to use a faker to write dummy data.

You can read more about seeding [here](https://docs.python.org/3/library/random.html#random.seed).

The following code creates dummy data using the `seed()` method:

```Python
Faker.seed(111)
print(ourFake.text())
```

**Output:**

```bash
Management huge pay college cover instead. Consumer leg start research her.
Sound finish set draw notice imagine that. Blue between least democratic down week wait. Reduce inside me.
```

#### Unique data generation
You can utilize the generators property `unique` to ensure that the dummy data created is always unique.

```python
# generates 10 unique texts 
texts = [ourFake.unique.name() for b in range(10)]
```

#### Command-line usage
Command-line invocation of the faker package allows you to generate dummy data by directly typing for it in the command prompt.

Here is an example in the command prompt:

```Python
faker address
```

**Output:**

```bash
173 Castro Ferry\nSouth Alexandriafort, WI 38412
```

#### Locales
The Faker generator may generate localized fake data if a locale is provided as an input.

Moreover, localized dummy data can be translated into various languages.

The following are some names where we have specified the locale to be `en-US`:

```Python
ourFake = Faker('en-US')
for b in range(10):
    print(ourFake.name())
```

**Output:**

```bash
Daniel Davidson
Kristin Stewart
Derrick Tran
Matthew Mccarty
Kevin Davis
Kim Watkins
Ashley Humphrey
Corey Webb
Melissa Barrera
Juan Greene
```

> Similarly, you can view the full list of locales [here](https://faker.readthedocs.io/en/master/locales.html).

#### Currency
The Faker generator may generate fake data about currencies using the `currency()` method.

Here is one such example:

```python
ourFake.currency()
```

**Output:**

```bash
('CUC', 'Cuban convertible peso')
```

You can also use the `Faker()` properties to generate dummy data about cryptocurrencies as well:

```Python
ourFake.cryptocurrency()
```

**Output:**

```bash
('POT', 'PotCoin')
```

#### Create a dummy dataset
Now, let's try to create a dummy dataset that can be used for Machine Learning.

Let's assume dataset generation for 20 people containing their employment status, type of job, company name, residence, and so on.

We'll construct the dataset using a [Standard Provider](https://faker.readthedocs.io/en/master/providers.html) called `profile()` and save it in Pandas Dataframes.

```python
import pandas as pan
ourProfile = [ourFake.profile() for i in range(20)]
ourDataFrame = pan.DataFrame(ourProfile)
print(ourDataFrame)
```

![Profile data](/engineering-education/creating-dummy-data-in-python-using-faker-package/profile-data.png)

Let's understand more about providers.

Assembling the items is made easier with the assistance of providers. Create an object by calling the provider as if it were a function.

The service provider is responsible for retrieving and injecting the underlying dependencies into the newly generated data.

Providers include many valuable attributes, such as `names()` and `address()`. Many standard providers are basic, like the internet and a person, while others are community-created, like music.

### Other dummy data creation methods
They are as follows:

#### Using NumPy's `random()`
Pseudorandom numbers can be generated with the random package functions like `rand()`, `randint()`, and many more.

```python
import numpy as num
myArray = num.random.rand(5)
print("Array : \n", myArray);
```

**Output:**

```bash
Array : 
 [0.02471149 0.41561035 0.76783821 0.89628689 0.8540258 ]
```

#### Fauxfactory
Automated testing is made easier with FauxFactory's random data generator. When building tests for your application, you may need to provide the sections you're testing with random, non-specific data.

To test your code quickly, you can use this anytime.

You can learn more about Fauxfactory [here](https://fauxfactory.readthedocs.io/en/latest/#).

### A few more words regarding dummy data
Highly interconnected attributes that predict the value of each other are known as the [dummy variable traps](https://www.geeksforgeeks.org/ml-dummy-variable-trap-in-regression-models/).

Dummy variable traps can be avoided if you have many characteristics that are highly connected (Multicollinear).

Multicollinearity occurs when the correlations between two or more independent variables are incredibly high in a regression model.

### Conclusion
We were able to generate various types of dummy data using faker, a Python library. In the past, we learned how to create fictitious data like names, addresses, and currency data.

During our investigation of the providers, we discovered the possibility of creating data specific to a specific location.

We also learned how dummy datasets can be generated for training your machine learning models.

You will save a lot of time and effort if you follow this information when testing your application.

Happy coding!

### References
- To see the whole code for this tutorial, click [here](https://colab.research.google.com/drive/1X9VLRsKpKOZisIzpRlfzIU_MneD1busP?usp=sharing).
- Dummy data [generation](https://dev.to/petercour/dummy-data-generation-with-python-1kjg) with Python.
- [Faker documentation](https://faker.readthedocs.io/en/master/index.html).

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)