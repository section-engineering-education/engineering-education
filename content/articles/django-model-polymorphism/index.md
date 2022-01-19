### Django polymorphic database modelling
Polymorphism is a technique for modelling data in a database so that applications can use it to store different types of data in the same table. For example, in an online bookstore, a user can order an ebook version of a novel while another user orders a print version of the same book. In the database, it's the same book but with different properties. The ebook version will include a download link which the print version won't have. The print version can have a weight property that we can use to calculate the ebook version's delivery charges.

### Table of contents
- [Django polymorphic database modelling](#django-polymorphic-database-modelling)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Polymorphic Modelling](#polymorphic-modelling)
  - [Default modeling](#default-modeling)
  - [Sparse Modelling](#sparse-modelling)
  - [Semi-structured modelling](#semi-structured-modelling)
  - [Abstract base modelling](#abstract-base-modelling)
- [Conclusion](#conclusion)
  
### Prerequisites
1. [Python](https://www.python.org/) and [Virtualenv](https://virtualenv.pypa.io/en/latest/) installed in your computer.
2. Knowledge in [Django](https://docs.djangoproject.com/en/4.0/intro/overview/) and [Python](https://www.python.org/).
   
### Polymorphic Modelling
Django ORM provides several ways to model polymorphic data. We can either use the standard Django features or the advanced Django ORM features, as we will study below. As we will see below, there are several ways to model polymorphic data. We will begin with the simplest method to the complex way of implementing polymorphic models.

This tutorial will model an online book store data dealing with print books and ebooks sales. We will begin by creating simple models, then add more fields to our models as we proceed.

We will start by creating a new Django project that we will use throughout this guide. 

1. Create a new working directory name `models` by executing the command below on the command line.
   ```bash
    mkdir modelling
   ```
2. Execute the command below to change the working directory to the one we have created above and create a new virtual environment. Django projects use virtual environments to manage the project's dependencies in isolations to avoid dependency conflict between different projects.
   ```bash
   virtualenv venv
   source venv/bin/activate
   pip install django
   ```
3. Execute the command below to create a new Django project named `polymorphic`.
   ```bash
   django-admin startproject polymorphic
   ```
4. Since the Django project is organised into applications, execute the command below to create a `modelling` application. This is where we will model our application database.
   ```bash
   python manage.py startapp modelling
   ```
#### Default modeling
This section will model our online bookstore using the default Django modelling features. Add the code snippet below in the `models.py` file in the `modelling` application.

```python
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
- In the code snippet above, we create a publication model which will hold the information about the books being sold in the store.
- `UserCart` model holds the information about the currently logged in user and the publications a user has added to the cart before checking out.

|**Advantages**   |  **Disadvantages** |
|---|---|
| Easy to model and maintain  | Only suitable for products with same attributes  |

#### Sparse Modelling
Now that our online store has gained several customers, they are requesting ebooks instead of print books. Therefore, we need to modify the `Publication` model to accommodate print and ebooks.

Replace the code snippet in the `models.py` file in the `modelling` application that we created earlier with the code snippet below.

```python
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
- In the code snippet above, we added two fields to the `Publication` model. The `publication_weight` property stores the weight of the print publication. We can use this field to calculate the delivery charges of the publication. The `publication_download_link` field stores the download link for the publication if it is an ebook.

|**Advantages**   | **Disadvantages**  |
|---|---|
| Easy to model and maintain  | Does not utilize the NOT NULL database constraints   |
| | Adding new attributes to the model requires model changes |

#### Semi-structured modelling
With the increase in book sales in our online store, there is an increase in the number of nullable fields. Unfortunately, this is becoming hard to maintain.

To address the increasing number of nullable fields, we can use a `JSONField` to store other properties and a model to store the common properties.

Update the `models.py` file in the `modelling` application with the code snippet below.


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
- With the semi-structured model, we keep the common fields on the model and other fields like `weight` and `download link` in the `JSONField`.

| **Advantages**  | **Disadvantages**  |
|---|---|
|  Reduces the number of nullable fields | Complex validation, we have to validate all the JSON data fields independently before saving |
|  Easier to add new attributes.| Restricted database support since not all databases support JSON field|

#### Abstract base modelling
So far, we have modelled our product using a single Django model. Our online book store has expanded, and we now want to sell other products i.e journals. Our previous model design will not be efficient enough to allow us to sell different types of products. We need to develop an optimal solution to design our database model.

Update the `models.py` in the `modelling` application with the code snippet below.

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
| Easy to maintain, design and test  | Hard to scale since every new product requires an additional model  |

### Conclusion
In this article, you have learned how to create polymorphic Django models.Try implementing polymorphic Django models in your application to reduce complexity in your models using the best polymorphic approach that fits best your use case.
