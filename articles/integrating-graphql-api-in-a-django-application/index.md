---
layout: engineering-education
status: publish
published: true
url: /engineering-education/integrating-graphql-api-in-a-django-application/
title: Integrating GraphQL API in a Django application
description: This article provides a guide to using GraphQL in a Django application.
author: anita-achu
date: 2021-05-16T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images: 

  - url: /engineering-education/integrating-graphql-api-in-a-django-application/hero.jpg
    alt: graphql+django
---


GraphQL is an open-source query language used to communicate data between the client (the browser) and the server. As explained in [GraphQL doc](https://graphql.org/)s, "GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data..."

Created by Facebook in 2012, GraphQL provides a runtime environment for Application Program Interfaces (API) which is easy to use, fast and developer-friendly. Over time, GraphQL has gained a wide range of use by companies such as Microsoft, Github, Shopify, Amazon, etc.

The most outstanding attribute of GraphQL is that it returns the requested data from multiple sources with just a single request this makes it more preferred than RESTAPI which is the alternative.

In essence, the client can request only the data they need in the response, which means you have complete control over the data structure, and in a single request, you can access a large number of services. GraphQL has a lot of advantages however, the features of GraphQL are outside of the scope of this tutorial. 

In this tutorial, our focus would be on integrating a GraphQL API into a Django project and effectively using it to query data.

### Prerequisites:

- Basic knowledge of python
- Basic knowledge of Django

## Project setup

We will be creating an e-commerce catalog project. Firstly, let's create a directory for this project in our terminal. Add the following to your terminal:

```bash
> mkdir ecommerce
> cd ecommerce
```

 **Setting up a virtual environment**

We'll be setting up a virtual environment for this project, a virtual environment helps in the installation of packages to help keep packages required by different projects separate by creating isolated Python virtual environments for them.

  To create a virtual environment, let's begin by installing virtual env add on your terminal, 

```python
> pip install virtualenv
> virtualenv env
```

Let’s activate our virtual environment

Mac OS / Linux:

```python
source env/bin/activate
```

Windows:

```bash
env\Scripts\activate
```

 
Let's proceed to set up our Django dependency:

```bash
> pip install django
```

 Once we have Django installed, we'll create our ecommerce project and app respectively:

```bash
> django-admin startproject ecommerce
> cd ecommerce
> django-admin startapp products
```

 

Now, we will proceed to our code editor. Open project in your code editor and in your project *settings.py* file, register your app. This way:

```bash
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

## Creating models

Next step, we will be creating our products app models in the **'products/models.py'** file.

```bash
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
- By `-date_created` the models will be ordered according to the date they were created.

Next step, let's register our models in our `products/admin.py` file.

```python
from django.contrib import admin
from .models import Category, Book, Grocery

# Register your models here.

admin.site.register(Category)
admin.site.register(Book)
admin.site.register(Grocery)
```

Let's proceed to our terminal to run migrations of models. By running migration these models are added to our database. In your terminal, add the following code:

```bash
> python manage.py makemigrations

> python manage.py migrate
```

Once migration is done, run local host to see if our app is running. To do this simply add the following code to your terminal

```python
python manage.py runserver
```

Click on the link `[http://127.0.0.1:8000/](http://127.0.0.1:8000/)` in your terminal. If this shows on your browser,  then you are on a good track.

### Integrating GraphQL to our project

We will be integrating GraphQL into our Django project. To begin, let's first install a package called *Graphene-Django.* On your terminal run

```python
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

## Adding GraphQL to URL

When working with GraphQL, the only endpoint/API exposed to the client is **/graphql**. Client can request and update data through this and only this endpoint. So then and there, we have fewer endpoints to maintain as compared to REST.

Adding GraphQL view to our URL, in `ecommerce/urls.py` file. Add the following:

```python
from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView

urlpatterns = [
    path('admin/', admin.site.urls),
		path("graphql", GraphQLView.as_view(graphiql=True)),
]
```

The URL contains our endpoint, where our GraphQL communications will be made. From the code above: 

- We imported `GraphQLView` which is a unique view provided by `graphene_django` which will be executed when graphql url is called.
- Then, we added a URL called **"graphql".** Lastly, we set *`graphiql=True`* this will enable us to use graphiql.


## Creating a schema

GraphQL is a query language with a powerful type system that can be used to define an API's data structures. This data is represented in the GraphQL Schema!

The schema can be thought of as a contract between the client and the server that specifies how the client can gain access to the database. 

To be able to run GraphQL queries on your web application, you need to add a Schema, Object Types, and a view function that receives the GraphQL queries.

 

Let's define our schema, firstly in our app directory, we'll create a file called **schema.py** and add the following lines of code. 

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

In the above code,

- We created schema for our three models (Category, Book, and Grocery).
- We also imported, `DjangoObjectType` : which will present all fields on a Model through GraphQL.
- `class Query` :  inherits from *'graphene.ObjectType'* class and supply the configuration for our            Graphql queries.
- `resolve_categories, books, groceries`:  are used to open up categories, books, groceries queryset. These methods take in two parameters (root and info).
- `graphene.Schema` : This query brings in data from our type(database)

### Testing our GraphQL API

Next, we will test our API to make sure it's running successfully. To this my simply running `python manage.py runserver`. Check our URL [http://120.0.0.1:8000/graphql](http://127.0.0.1:8000/graphql) 

Let's try some features to query the data in our database. We'll do this by using the GraphQL preview which is the play button at the top left of the navigation bar. 

```python
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
      imageurl
      status
    }
}
```

Our data is empty because we have not added any data to our database. One important step we must not forget is creating an admin user. Let's briefly do this by running the following lines of code on our terminal.

```python
python manage.py createsuperuser
```

Add username and password. 

Superuser successfully created. 

Run the admin site on your browser using http://127.0.0.1:8000/admin/

You can add data into any of the models. 

### Adding Mutation

In GraphQL mutation is used in adding, updating, and deleting data. It performs a similar function to the POST, DELETE and PUT method in REST API.

In your **schema.py** file add the following lines of code:

```python
class UpdateCategory(graphene.Mutation):
    class Arguments:
        # Mutation to update a category 
        title = graphene.String(required=True)
        id = graphene.ID()

    # Class attributes defines the response of the mutation
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
- '*class argument*' allows us define parameter to save data to database.
- '*class Mutation'* defines our mutations and sends parameters such as updating and creating data to the model
- Lastly, we updated our schema by adding mutation to the Schema constructor.

Next, we proceed to testing our mutations and queries. Let's create a new category.

Paste below mutation on the left side and click Play button

```python
mutation {
 create_category:createCategory(title :"Plastic") {
  category {
   id,
   title,
  }
 }
}
```

```python
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

Successful added to our database! 🎉


## Conclusion

In this tutorial we were able to integrate GraphQL into Django using the Graphene-Django package. 

If implemented correctly, GraphQL in Django will result in an application that is extremely scalable and versatile. We however did not use all the features of the graphene package  such as updating and deleting data in all the models provided above but you can read more on it in the [GraphQL Docs](https://docs.graphene-python.org/projects/django/en/latest/installation/) for more guide. This tutorial provides a sneak peek of how GraphQL and Django can be integrated. There are lots of other functions you can add to your Django application using GraphQL. 

If you are getting started with GraphQL + Django, I hope this tutorial was of help to you! 

Happy coding!🙂