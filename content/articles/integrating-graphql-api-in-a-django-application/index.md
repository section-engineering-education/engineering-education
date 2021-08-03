---
layout: engineering-education
status: publish
published: true
url: /integrating-graphql-api-in-a-django-application/
title: Integrating GraphQL API into a Django application
description: This tutorial will focus on integrating a GraphQL API into a Django project and effectively using it to query data. GraphQL provides a runtime environment for Application Program Interfaces.
author: anita-achu
date: 2021-06-08T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/integrating-graphql-api-in-a-django-application/hero.jpg
    alt: Integrating GraphQL API in a Django application Hero Image
---
GraphQL is an open-source query language used to communicate data between the client and the server. As explained in [GraphQL doc](https://graphql.org/)s, "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data..."
<!--more-->
 
### Introduction
Created by Facebook in 2012, GraphQL provides a runtime environment for Application Program Interfaces (API) which is easy to use, fast, and developer-friendly. Over time, GraphQL has gained a wide range of use by companies such as Microsoft, GitHub, Shopify, Amazon, etc.

The most outstanding attribute of GraphQL is that it returns the requested data from multiple sources with just a single request this makes it more preferred than RESTAPI which is the alternative.

In essence, the client can request only the data they need in the response, which means you have complete control over the data structure, and in a single request, you can access a large number of services. GraphQL has a lot of advantages however, the features of GraphQL are outside of the scope of this tutorial. 

In this tutorial, our focus will be on integrating a GraphQL API into a Django project and effectively using it to query data.

### Prerequisites
To follow along with this tutorial, you should have:
- A basic knowledge of [Python](https://www.python.org/downloads/).
- A good understanding of [Django](https://www.djangoproject.com/).

### Project setup
We will create an e-commerce catalog project. Let's start by creating a directory for this project in our terminal. 

Add the following to your terminal:

```bash
mkdir ecommerce
cd ecommerce
```

#### Setting up a virtual environment
We'll set up a virtual environment for this project. A virtual environment helps in the installation of packages to keep packages required by different projects separated by creating isolated Python virtual environments for them.

To create a virtual environment, let's begin by installing `virtualenv`. 

Run the following commands on your terminal: 

```bash
pip install virtualenv
virtualenv env
```

Let’s activate our virtual environment:

- Mac OS / Linux:

```bash
source env/bin/activate
```

- Windows:

```bash
env\Scripts\activate
```

Let's proceed to set up our Django dependency:

```bash
pip install django
```

Once we have Django installed, we'll create our E-commerce project and app respectively:

```bash
django-admin startproject ecommerce
cd ecommerce
django-admin startapp products
```

Now, we will proceed to our code editor. Open project in your code editor and in your project *settings.py* file, register your app by:

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'products',
]
```

### Creating models
Next step, we will create our product app models in the **'products/models.py'** file.

```python
from django.db import models

# Create your models here.
class Category(models.Model):
    title = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = 'Categories'
    def __str__(self):
        return self.title

class Book(models.Model):
    title = models.CharField(max_length=150)
    author = models.CharField(max_length=100, default='John Doe')
    isbn = models.CharField(max_length=13)
    pages = models.IntegerField()
    price = models.IntegerField()
    quantity = models.IntegerField()
    description = models.TextField()
    status = models.BooleanField()
    date_created = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return self.title

class Grocery(models.Model):
    product_tag = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='grocery', on_delete=models.CASCADE)
    price = models.IntegerField()
    quantity = models.IntegerField()
    imageurl = models.URLField()
    status = models.BooleanField()
    date_created = models.DateField(auto_now_add=True)

    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return self.name
```

So let’s discuss exactly what we've done in the above code:

- We created three models classes, **Category, Book** and **Grocery.**
- We added fields for the model classes.
- By `-date_created` the models will be ordered according to the date they were created at.

Next step, let's register our models in our `products/admin.py` file.

```python
from django.contrib import admin
from .models import Category, Book, Grocery

# Register your models here.

admin.site.register(Category)
admin.site.register(Book)
admin.site.register(Grocery)
```

Let's proceed to our terminal to run migrations of models. By running migration, these models are added to our database. 

Run the following commands in your terminal:

```bash
python manage.py makemigrations
python manage.py migrate
```

Once migration is done, run the following command in your terminal to start the app:

```bash
python manage.py runserver
```

Click on the link `[http://127.0.0.1:8000/](http://127.0.0.1:8000/)` in your terminal. If the app is displayed on your browser, then you are on the right track.

### Integrating GraphQL into our project
We will integrate GraphQL into our Django project. To begin, let's first install a package called [Graphene-Django](https://docs.graphene-python.org/projects/django/en/latest/). 

On your terminal run:

```bash
pip install graphene-django
```

Next step, add ***graphene_django*** to `INSTALLED_APPS` in your `settings.py` file.

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'products',
    'graphene_django',
]
```

### Adding GraphQL to URL
The only endpoint/API accessible to the client while working with GraphQL is **/graphql**. This is the sole endpoint via which a client can request and change data. As a result, in comparison to REST, we have fewer endpoints to manage.

To add a GraphQL view to our URL, in `ecommerce/urls.py` file. 

Add the following:

```python
from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from products.schema import schema

urlpatterns = [
    path('admin/', admin.site.urls),
    path("graphql", GraphQLView.as_view(graphiql=True, schema=schema)),
]
```

The URL contains our endpoint, where our GraphQL communications will be made. We imported `GraphQLView` which is a unique view provided by `graphene_django` which will be executed when Graphql url is called.

Then, we added a URL called **"graphql"**. Then, we set *`graphiql=True`* which will enable us to use graphiql.

### Creating a schema
GraphQL is a query language with a powerful type system that can be used to define an API's data structures. The GraphQL Schema is used to represent this information.

A schema is a contract between the client and the server that describes how the client can acquire access to the database.

You'll need to add a Schema, Object Types, and a view function that receives the GraphQL queries to be able to perform GraphQL queries in your web application.
 
Let's define our schema, in the `products/` directory, we'll create a file called **schema.py** and add the following:

```python
import graphene
from graphene_django import DjangoObjectType
from .models import Category, Book, Grocery

class CategoryType(DjangoObjectType):
    class Meta: 
        model = Category
        fields = ('id','title')

  
class BookType(DjangoObjectType):
    class Meta: 
        model = Books
        fields = (
            'id',
            'title',
            'author',
            'isbn',
            'pages', 
            'price',
            'quantity', 
            'description',
            'imageurl',
            'status',
            'date_created',
        )  

class GroceryType(DjangoObjectType):
    class Meta:
        model = Grocery
        fields = (
            'product_tag',
            'name',
            'category',
            'price',
            'quantity',
            'imageurl',
            'status',
            'date_created',
        )

class Query(graphene.ObjectType):
    categories = graphene.List(CategoryType)
    books = graphene.List(BookType)
    groceries = graphene.List(GroceryType)

    def resolve_books(root, info, **kwargs):
        # Querying a list
        return Book.objects.all()

    def resolve_categories(root, info, **kwargs):
        # Querying a list
        return Category.objects.all()

    def resolve_groceries(root, info, **kwargs):
        # Querying a list
        return Grocery.objects.all()
schema = graphene.Schema(query=Query)
```

In the code above:
- We created a schema for our three models (Category, Book, and Grocery).
- We also included `DjangoObjectType`: which uses GraphQL to display all fields on a Model.
- `class Query`: inherits from *'graphene.ObjectType'* and provides the setting for our Graphql queries.
- `resolve_categories, books, groceries`: are used to open up categories, books, groceries queryset. These methods take in two parameters (root and info).
- `graphene.Schema`: this query brings in data from our type(database).

### Testing our GraphQL API
Next, we will test our API to make sure it's running successfully. To do this, let's simply run `python manage.py runserver`. 

Let's check our URL [http://120.0.0.1:8000/graphql](http://127.0.0.1:8000/graphql) .

Let's try some features to query the data in our database. We'll do this by using the GraphQL preview which is the play button at the top left of the navigation bar. 

```bash
{
  books{
      id
      title
      author
      isbn
      pages 
      price
      quantity
      description
      status
    }
}
```

Our data is empty because we have added no data to our database. One important step we must not forget is creating an admin user. Let's briefly do this by running the following lines of code on our terminal.

```bash
python manage.py createsuperuser
```

Add username and password. Superuser successfully created and now you can run the admin site on your browser using `http://127.0.0.1:8000/admin/`.

You can add data into any of the models. 

### Adding mutation
In GraphQL, a mutation is used when adding, updating, and deleting data. It performs a similar function to the POST, DELETE, and PUT method in REST API.

In your **schema.py** file add the following lines of code:

```python
class UpdateCategory(graphene.Mutation):
    class Arguments:
        # Mutation to update a category 
        title = graphene.String(required=True)
        id = graphene.ID()


    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, title, id):
        category = Category.objects.get(pk=id)
        category.title = title
        category.save()
        
        return UpdateCategory(category=category)

class CreateCategory(graphene.Mutation):
    class Arguments:
        # Mutation to create a category
        title = graphene.String(required=True)

    # Class attributes define the response of the mutation
    category = graphene.Field(CategoryType)

    @classmethod
    def mutate(cls, root, info, title):
        category = Category()
        category.title = title
        category.save()
        
        return CreateCategory(category=category)

class BookInput(graphene.InputObjectType):
    title = graphene.String()
    author = graphene.String()
    pages = graphene.Int()
    price = graphene.Int()
    quantity = graphene.Int()
    description = graphene.String()
    status = graphene.String()

class CreateBook(graphene.Mutation):
    class Arguments:
        input = BookInput(required=True)

    book = graphene.Field(BookType)
    
    @classmethod
    def mutate(cls, root, info, input):
        book = Book()
        book.title = input.title
        book.author = input.author
        book.pages = input.pages
        book.price = input.price
        book.quantity = input.quantity
        book.description = input.description
        book.status = input.status
        book.save()
        return CreateBook(book=book)

class UpdateBook(graphene.Mutation):
    class Arguments:
        input = BookInput(required=True)
        id = graphene.ID()

    book = graphene.Field(BookType)
    
    @classmethod
    def mutate(cls, root, info, input, id):
        book = Product.objects.get(pk=id)
        book.name = input.name
        book.description = input.description
        book.price = decimal.Decimal(input.price)
        book.quantity = input.quantity
        book.save()
        return UpdateBook(book=book)

class Mutation(graphene.ObjectType):
    update_category = UpdateCategory.Field()
    create_category = CreateCategory.Field()
    create_book = CreateBook.Field()
    update_book = UpdateBook.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
```

- We created classes to add and update data to our models.
- '*class argument*' allows us to define a parameter to save data to the database.
- '*class Mutation'* defines our mutations and sends parameters such as updating and creating data to the model.
- Lastly, we updated our schema by adding mutation to the Schema constructor.

Next, we proceeded to test our mutations and queries. Let's create a new category.

Paste the mutation below on the left side and click the Play button:

```bash
mutation {
 create_category:createCategory(title :"Plastic") {
  category {
   id,
   title,
  }
 }
}
```

```bash
mutation {
  create_book: createBook(input: {title:"Imagine this",author: "Shola", pages: 12, price: 1200, quantity: 4, description:"a brief description", status: "True"}){
    book {
      id,
      title,
      author,
      pages,
      price,
      quantity,
      description,
      status
    }
  }
}
```

Successfully added to our database! 🎉

### Conclusion
Using the Graphene-Django package, we were able to incorporate GraphQL into Django in this tutorial.

If implemented correctly, GraphQL in Django will result in an application that is extremely scalable and versatile. However, we did not use all the features of the graphene package.

Features such as updating and deleting data in all the models provided above but you can read more on it in the [GraphQL Docs](https://docs.graphene-python.org/projects/django/en/latest/installation/) for more guidance.

This tutorial provides a sneak peek of how GraphQL and Django can be integrated. GraphQL may be used to add a variety of extra functionalities to your Django application.

If you are getting started with GraphQL and Django, I hope this tutorial was of help to you! 

Happy coding!🙂

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
