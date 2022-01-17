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

#### Default modeling
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
    visitor = models.OneToOneField(
        get_user_model(),  # Maps the visitor fields with the currently logged-in user
        primary_key=True,
        on_delete=models.CASCADE,
    )
    publications = models.ManyToManyField(Publication)

```
#### Sparse Modelling
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
    visitor = models.OneToOneField(
        get_user_model(),  # Maps the visitor fields with the currently logged-in user
        primary_key=True,
        on_delete=models.CASCADE,
    )
    publications = models.ManyToManyField(Publication)
```
#### Semi-structured modelling
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
    visitor = models.OneToOneField(
        get_user_model(),  # Maps the visitor fields with the currently logged-in user
        primary_key=True,
        on_delete=models.CASCADE,
    )
    publications = models.ManyToManyField(Publication)

```
#### Abstract base modelling
```python
from django.db import models

# Publication is a journal that can be ordered from the bookstore a hard copy file
from django.db.models import JSONField


class Publication(models.Model):
    class Meta:
        abstract = True

    publication_name = models.CharField(
        max_length=100,
    )
    publication_price = models.PositiveIntegerField()

    def __str__(self) -> str:
        return self.publication_name


class Book(Publication):
    book_weight = models.PositiveIntegerField()


# UserCart manages the user publications add on the cart
class Ebook(models.Model):
    ebook_download_link = models.URLField()
```
### Conclusion
In this article, you have learned how to create polymorphic Django models. However, you have learned a few approaches that you can use to build complex polymorphic Django models. Try implementing polymorphic Django models in your application to reduce complexity in your models using the best polymorphic approach that fits best your use case.
