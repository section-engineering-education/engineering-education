---
layout: engineering-education
status: publish
published: true
url: /django-model-polymorphism/
title: Getting Started with Django Polymorphic Models
description: This tutorial will discuss the concept of Django model design. It will help the reader understand different modeling techniques and their use cases.
author: flavian-adhiambo
date: 2022-02-22T00:00:00-03:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-model-polymorphism/hero.png
    alt: Getting started with Django polymorphic models
---
Polymorphism is a technique for modeling data in a database. It allows applications to store different types of data in the same database table. 
<!--more-->
This tutorial will model an online book store dealing with print books and ebooks sales. 

We will begin by creating simple models and adding more fields to our models as the online store expands and handles more products.

In an online bookstore, a user can order an ebook version of a novel while another user orders a print version of the same book. 

In the database, it's the same book but with different properties. The ebook version will include a download link which the print version won't have. 

The print version can have a weight property that we can use to calculate the ebook version's delivery charges.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Polymorphic modeling](#polymorphic-modeling)
  - [Default modeling](#default-modeling)
  - [Sparse modeling](#sparse-modeling)
  - [Semi-structured modeling](#semi-structured-modeling)
  - [Abstract base modeling](#abstract-base-modeling)
- [Conclusion](#conclusion)
  
### Prerequisites
To follow along with this article, you need to have:
- [Python](https://www.python.org/) and [virtualenv](https://virtualenv.pypa.io/en/latest/) installed on your computer.

- Some knowledge of [Django](https://docs.djangoproject.com/en/4.0/intro/overview/) and [Python](https://www.python.org/).
   
### Polymorphic modeling
Django ORM provides several ways to model polymorphic data. As we will study below, we can either use the standard Django features or the advanced Django ORM features. 

We will begin with the simplest method to the complex way of implementing polymorphic models.

The first step is to create a new Django project that we will use throughout this guide. 

Create a new working directory named `models` by executing the following command:

```bash
mkdir modeling
```

Execute the command below to change the working directory to the one we have created above and create a new virtual environment. 

Django projects use virtual environments to manage the project's dependencies in isolations to avoid dependency conflict in other projects.

```bash
virtualenv venv
source venv/bin/activate
pip install django
```

Execute the following command to create a new Django project named `polymorphic`:

```bash
django-admin startproject polymorphic
```

Since the Django project is organized into applications, execute the command below to create a `modeling` application. This is where we will model our application database:

```bash
python manage.py startapp modeling
```

Django provides several modeling patterns that we will go through in this guide. They include:
- Default modeling pattern
- Sparse modeling pattern
- Semi-structured modeling pattern
- Abstract modeling pattern

#### Default modeling
This section will model our online bookstore using the default Django modeling features. Add the following code in the `models.py` file:

```py
from django.contrib.auth import get_user_model
from django.db import models

# Publication is a journal that can be ordered from the bookstore a hard copy file
class Publication(models.Model):
    publication_title = models.CharField(max_length=50)
    publication_price = models.PositiveIntegerField()
    publication_weight = models.PositiveIntegerField()  # The weight of the print publication is required for calculations of the delivery fees

    def __str__(self) -> str:
        return self.publication_title


# UserCart manages the user publications add on the cart
class UserCart(models.Model):
    visitor_cart = models.OneToOneField(
        get_user_model(),  # Maps the visitor fields with the currently logged-in user
        primary_key=True,
        on_delete=models.CASCADE,
    )
    publications = models.ManyToManyField(Publication)
```

In the code snippet above, we create a publication model which will hold the information about the books being sold in the store.

The `UserCart` model holds the information about the currently logged-in user and the publications a user has added to the cart before checking out.

|**Advantages**   |  **Disadvantages** |
|---|---|
| Easy to model and maintain  | Only suitable for products with the same attributes  |

#### Sparse modeling
Now that our online store has gained several customers, they request ebooks instead of print books. Therefore, we need to modify the `Publication` model to accommodate print and ebooks.

Replace the code snippet in the `models.py` file with the code below:

```py
# Publication is a journal that can be ordered from the bookstore a hard copy file
class Publication(models.Model):
    PUBLICATION_CHOICES = (
        ("Print", 'Print'),
        ("Ebook", 'Ebook'),
    )
    publication_title = models.CharField(max_length=50)
    publication_price = models.PositiveIntegerField()
    publication_type = models.CharField(
        max_length=50,
        choices=PUBLICATION_CHOICES,
    ) # Publication type is required to check wether a download link is required for the publication
    publication_download_link = models.URLField(null=True,
                                                blank=True, )  # The ebook publications require a download link that can be used to download the book
    publication_weight = models.PositiveIntegerField()  # The weight of the print publication is required for calculations of the delivery fees

    def __str__(self) -> str:
        return self.publication_title


# UserCart manages the user publications add on the cart
class UserCart(models.Model):
    visitor_cart = models.OneToOneField(
        get_user_model(),  # Maps the visitor fields with the currently logged-in user
        primary_key=True,
        on_delete=models.CASCADE,
    )
    publications = models.ManyToManyField(Publication)
```

In the code snippet above, we added two fields to the `Publication` model. 

The `publication_weight` property stores the weight of the print publication. We can use this field to calculate the delivery charges of the publication. 

The `publication_download_link` field stores the download link for the publication if it is an ebook.

|**Advantages**   | **Disadvantages**  |
|---|---|
| Easy to model and maintain  | Does not utilize the NOT NULL database constraints   |
| | Adding new attributes to the model requires model changes |

#### Semi-structured modeling
With the increase in book sales in our online store, there is an increase in the number of nullable fields. Unfortunately, this is becoming hard to maintain.

To address the increasing number of nullable fields, we can use a `JSONField` to store other properties and a model to store the common properties.

Update the `models.py` file in the `modeling` application with the code below:

```python
from django.contrib.auth import get_user_model
from django.db import models

# Publication is a journal that buyers can order from the bookstore a hard copy file
from django.db.models import JSONField

class Publication(models.Model):
    PUBLICATION_CHOICES = (
        ("Print", 'Print'),
        ("Ebook", 'Ebook'),
    )
    publication_title = models.CharField(max_length=50)
    publication_price = models.PositiveIntegerField()
    publication_type = models.CharField(
        max_length=50,
        choices=PUBLICATION_CHOICES,
    )  # Publication type is required to check wether a download link is required for the publication
    publication_download_link = models.URLField(null=True,
                                                blank=True, )  # The ebook publications require a download link that can be used to download the book
    publication_extra_fields = JSONField() # The extra fields will be stored in the database as Json field

    def __str__(self) -> str:
        return self.publication_title

# UserCart manages the user publications add on the cart
class UserCart(models.Model):
    visitor_cart = models.OneToOneField(
        get_user_model(),  # Maps the visitor fields with the currently logged-in user
        primary_key=True,
        on_delete=models.CASCADE,
    )
    publications = models.ManyToManyField(Publication)

```

The semi-structured model allows us to keep the common fields on the model and other fields like `weight` and `download link` in the `JSONField`.

| **Advantages**  | **Disadvantages**  |
|---|---|
|  Reduces the number of nullable fields | Complex validation, we have to validate all the JSON data fields independently before saving |
|  Easier to add new attributes.| Restricted database support since not all databases support JSON as a data type|

#### Abstract base modeling
So far, we have modeled our product using a single Django model. Our online book store has expanded, and we now want to sell other products i.e journals. 

Our previous model design is not efficient enough to allow us to sell different types of products. Therefore, we need to develop an optimal solution for our database model.

Update the `models.py` in the `modeling` application with the code snippet below:

```python
from django.db import models

# Publication is a journal that can be ordered from the bookstore a hard copy file
from django.db.models import JSONField

# This model represents the pdf downloadable version of a publication
class Ebook(models.Model):
    ebook_download_link = models.URLField()

# This the new type of publication that the users can download
class Journal(models.Model):
    journal_download_link = models.URLField()
```
- In the code snippet above, we create a standard model `Publication` that other products will extend. With this type of design, the common properties of the products we sell are in the `Publication` model, while the specific properties of the product we sell are in the particular product model. For example, the `Ebook` product has a specific field `book_weight`.

|**Advantages**   | **Disadvantages**  |
|---|---|
| Easy to maintain, design, and test  | Hard to scale since every new product requires an additional model  |

### Conclusion
In this article, you have learned how to create polymorphic Django models. 

You can now implement polymorphic Django models in your application to reduce complexity. Ensure that you use a suitable polymorphic approach that fits your use case.

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)