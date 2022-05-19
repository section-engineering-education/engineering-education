---
layout: engineering-education
status: publish
published: true
url: /how-to-test-django-applications-with-locust/
title: How to Load Test Django Applications with Locust
description: This article demonstrates how to sync and update a forked repo using GitHub desktop and Git bash with examples.
author: kolapo-olamidun
date: 2022-05-19T00:00:00-12:00
topics: [API]
excerpt_separator: <!--more-->
images:		
  - url: /engineering-education/how-to-test-django-applications-with-locust/hero.jpg
    alt: How to sync to forked repo
---
Load testing is the practice of testing how an application performs when users start using it concurrently. TThe load we are referring to here is simply the various requests being made to that application at the same time by the users.
<!--more-->

### Table of Contents
- [Introduction](#how-to-use-locust-to-test-django-applications)
- [Building The API](#building-the-api)
- [Testing With Locust](#testing-with-locust)
- [Conclusion](#conclusion)

### How To Use Locust To Load Test Django Applications
Most times, we build applications and we have no idea how they will perform when hundreds or even thousands of users try to use them concurrently until we launch. How do we properly test our applications to make sure they can handle multiple concurrent requests. 

This is what we will learn in this article, we will also learn some helpful tips to enable us to construct efficient queries in Django to further boost the performance of our application.  

This article is for those with basic knowledge of Django and Djangorestframework. Without any further ado, let's get right into it.

We are going to be building a simple API that allows users to log in, create posts and comments, and view all the posts and comments in our database. We will need to install the [Faker](https://faker.readthedocs.io/en/master/) library to populate our database with posts and comments programmatically instead of doing it manually. We will also need to install [Locust](https://docs.locust.io/en/stable/what-is-locust.html) to load test our application when we are done building it.

To get started, we can install the packages we mentioned after setting up our Django project. If you do not know how to set up a Django project and create an app in our project called **blog**, you can check [here](https://docs.djangoproject.com/en/4.0/intro/tutorial01/), and to do this, we can run:

`pip install djangorestframework locust Faker`

The above command installs djangorestframework (the package we will use to build out the API), locust (the library to load test the API we want to build), and finally Faker (the library that we will use to generate data for our database). We need to add djangorestframework as an installed app to get it to work so we will do that by adding it to the list of installed apps in the settings.py file:

```bash
INSTALLED_APPS = [
    .... # other apps
    'rest_framework', #djangorestframework

]

```

### Building the API
Now, let's start writing the code for our Post and Comment model.

```bash
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=500)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.user}'s comment {self.pk}"


```

Let's break down the code:

```bash
class Post(models.Model):
    title = models.CharField(max_length=500)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

```

We are defining what our Post table will look like in the database. It is going to have a title, the body (content), and a user attached to it because only authenticated users can create posts. `__str__` tells Django how to display a particular post in the Django Admin, in our case, the title will be displayed.

```bash
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    body = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


    def __str__(self):
        return f"{self.user}'s comment {self.pk}"

```

We did the same thing for comments, the only difference being it doesn't have a title, a post, and a user will be attached to a comment, and we are telling Django to display comments using their ID/Primary key, and the user attached to them.

The next step is to register our newly created models in our project's `admin.py` file so we can show the models in the Django Admin dashboard. We can do that with the code snippet below:

```bash
from django.contrib import admin
from .models import Comment, Post

admin.site.register(Comment)
admin.site.register(Post)

```
Don't forget to run migrations so Django can generate the models we just created as tables for our database.

Before we start creating our API endpoints, let's generate some data for our database using the Faker library we installed earlier on. We are going to create a new python file and name it "post_generator.py" (you can name yours anything). In the file, copy and paste the code snippet below:

```bash
from faker import Faker
from django.contrib.auth.models import User
from .models import Post, Comment
fake = Faker()
user = User.objects.get(pk=1)
def generate_post():
    body = [Post(title=f"title {_ + 1}", body=fake.text(), user=user) for _ in range(5000)]
    Post.objects.bulk_create(body)
    print("Done")


def generate_comment():

    body = [Comment(post=Post.objects.get(pk= _ + 1), body=fake.text(), user=user) for _ in range(5000)]

    Comment.objects.bulk_create(body)
    print("Done")

```

Let's explain what is going on here:
- The first line is to import the Faker class from the faker library that we installed.
- The second line is to import the built-in user model in Django because we will be needing it to create posts and comments.
- We instantiated the Faker class that was imported.
- Line 5 is to get a user that was created via Django admin by its primary key.
- Line 6-8 is where we are generating the posts for our database. The faker object we instantiated has a .text() attribute that returns random sentences, so we are using that for the body of our post.

We decided to use [bulk_create](https://docs.djangoproject.com/en/4.0/ref/models/querysets/#bulk-create) instead of calling the `.create()` function in a forloop because `bulk_create()` is faster. The user being assigned to the Post we are creating has been created in Django admin. We can run `generate_post()` multiple times using different users so our database won't just contain posts with the same user.

The same idea was used for `generate_comment()` function.

Now that we have populated our database, let's start building the endpoints. In our serializers file, we will create the following serializers:

```bash
from .models import Post, Comment
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

        extra_kwargs = {
            "id":{
                "read_only": True
            },
            "username": {
                "read_only": True
            }
        }

class ListPostSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'url', 'title', 'body', 'user']

        extra_kwargs = {
            'url': {'view_name': 'blog:post-detail'},
            
        }

class CreatePostSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'title', 'body', 'user']


class CreateCommentSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)
    post = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Comment
        fields = ['post', 'body', 'user']


class PostForCommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields = ['id', 'title']


class ListCommentSerializer(serializers.HyperlinkedModelSerializer):
    user = UserSerializer(read_only=True)
    post = PostForCommentSerializer(read_only=True)
    class Meta:
        model = Post
        fields = ['id', 'url', 'body', 'user', 'post']

        extra_kwargs = {
            'url': {'view_name': 'blog:comment-detail'},
            
        }

```

Let's break down the code we have here:
- `UserSerializer` is a serializer that returns the most important information we want from a user in our application i.e the id/pk and username fields in JSON format. Since we are going to be using this serializer to represent the user linked to a post when we serialize it, we must get just the required user information. Doing this will make the endpoint using any serializer that calls `UserSerializer` faster compared to returning all the fields in the user table.
- `ListPostSerializer` returns the list of posts in the database, it could either be a list of all the posts or a list of posts filtered by certain parameter(s). Since each post has a user attached to it, we are representing the user field with the `UserSerializer`, this will return along with the title and body of the post, the username, and the id of the user that created that post in JSON format.
- `CreatePostSerializer` is the serializer used to create posts. We are representing the users with their primary key.
- The idea behind `PostForCommentSerializer` is the same with `UserSerializer`. Post and User models are foreign keys to the Comment model, which means we need to serialize them too, so we are inheriting PostForCommentSerializer and UserSerializer. We are also serializing just two Post fields in PostForCommentSerializer the same way we did for UserSerializer; any endpoint that will be calling ListCommentSerializer or PostForCommentSerializer will run faster compared to serializing all the fields that we probably do not need.

Various serializers have been built out, let's go ahead and start writing code for our views file:

View that returns list of all posts in the db:

```bash
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import ListCommentSerializer, ListPostSerializer, CreatePostSerializer, RegistrationSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from .models import Post, Comment

class ListPostAPIView(ListAPIView):
    serializer_class = ListPostSerializer
    def get_queryset(self):
        posts = Post.objects.all()
        return posts

```

Here, we are importing all the functions and classes we need to build our endpoints. We are inheriting the `ListAPIView` class which returns a QuerySet (QuerySet of post objects in our case).


View that creates post in our database:
```bash
class CreatePostAPI(APIView):
    permission_classes = (IsAuthenticated, )
    
    def post(self, request):
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

Here, we are inheriting from the `APIView` class to create objects in our database. Since we only want authenticated users to create posts, we need to restrict the view by using `permission_classes = (IsAuthenticated, )`. `IsAuthenticated` class checks if the user accessing the URL/endpoint attached to this view is authenticated. 

We also called the `CreatePostSerializer` that we defined in our serializers.py file. Then we defined a `post` method where we called the `CreatePostSerializer` class we defined and passed in `request.data` as a keyword argument; `request.data` is the data coming from the frontend. 

We then check if the data is in the right format using the`.is_valid()` method on the serializer, if the data is valid, then save the data and the user sending it by calling `.save(user=self.request.data)` on the serializer, if the data is not valid, we tell Djangorestframework to return the appropriate error message to the frontend.

View to get a single post from the database:
```bash
class RetrievePostAPIView(RetrieveAPIView):
    serializer_class = ListPostSerializer
    lookup_field = "pk"
    def get_queryset(self):
        return Post.objects.filter(id=self.kwargs.get('pk'))
```

We inherited from the `RetrieveAPIView` class. `RetreiveAPIView` is used to get a single object from the database. We are setting the `lookup_field` to "pk" to get a particular object using its primary key(pk). This also dictates how we will set up the URL which we will see later on. Now we can overwrite the `get_queryset` method to fetch an object by its pk.


View that lists all the comments in the database:

```bash
class ListCommentAPIView(ListAPIView):
    serializer_class = ListCommentSerializer
    def get_queryset(self):
        return Comment.objects.all()
```

The same explanation done for `ListPostAPIView` will suffice for `ListCommentAPIView`.


View to retrieve a single comment from the database
```bash
class RetrieveCommentAPIView(RetrieveAPIView):
    serializer_class = ListCommentSerializer
    lookup_field = 'pk'
    def get_queryset(self):
        return Comment.objects.filter(id=self.kwargs.get('pk'))

```

Same explanation done for `RetrievePostAPIView` suffices for `RetrieveCommentAPIView`.

View to create comments on a post:

```bash
class CreateCommentAPI(APIView):
    # authentication_classes = [BasicAuthentication]
    permission_classes = (IsAuthenticated, )
    
    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
        except Post.DoesNotExist:
            return Response({"error": "Post does not exist"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CreateCommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=self.request.user, post=post)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

```

The same explanation provided for `CreatePostAPIView` will suffice. The only difference a comment doesn't only have a user model as a foreign key but also the post model. We are getting the post using the primary key and passing it as an argument into the `.save()` method along with `self.request.user`.

We will now create a **urls.py** file so we can construct our urls or endpoints.

In the created urls.py file, enter the code below:

```bash
from django.urls import path
from . import views


app_name = "blog"

urlpatterns = [
    path("posts", views.PostList.as_view()),
    path("post/<int:pk>", views.RetrievePostAPIView.as_view(), name="post-detail"),
    path("create", views.CreatePostAPIView.as_view(), name="create-post"),
    path("create_post", views.CreatePostAPI.as_view(), name="add-post"),
    path("hello/", views.hello, name='hello'),

    # comment endpoints
    path('comments', views.ListCommentAPIView.as_view()),
    path('comment/<int:pk>', views.RetrieveCommentAPIView.as_view(), name='comment-detail'),
    path('post/<int:pk>/comment/create', views.CreateCommentAPIView.as_view())
]

```

In the project folder's urls.py file, we will enter the following code snippets to register our app's URLs with Django and also to configure the login endpoint provided by Djangorestframework.

```bash
urlpatterns = [
    ... # admin dashboard url

    path('blog/', include('blog.urls')),
    path('login/', token_view.obtain_auth_token) # login url provided by djangorestframework
]
```

To make the login URL work, we need to add `rest_framework.auth` token to our installed apps and run `python manage.py migrate`

Now that we are done building the endpoints, let's start load testing with Locust.

In the project root folder, we will create a python file and name it `locustfile.py`. We must give it that name otherwise it won't work.

### Testing with Locust
Let's start by testing the endpoint that returns list of posts from the database:
```bash
from locust import HttpUser, task

class ListPostUser(HttpUser):
    @task
    def post_detail(self):
        self.client.get("blog/posts")

```

Let's break this down:
- The first line is used to import two utilities, `HttpUser` is a class that is inherited, depending on the number of users we create when we start testing. Locust will create an instance of this class for those users. `HttpUser` gives each user the `client` attribute which is used to make HTTP requests to the API or application we want to load test.
- `task` is a decorator that tells locust that any method that is decorated with it should be picked for execution, you can still define your own functions inside `locustfile.py` but they won't be seen as an endpoint we want to load test. Any method that is decorated with the `task` decorator is called a TASK.
- We created a class that inherits `HttpUser` class, inside this class, we created a method decorated with the `task` decorator. Of course and in the method, we are accessing the `client` attribute so we can make HTTP requests to our API. In the attribute we pass in the path to the endpoint we want to load test, in our case it is the "blog/posts" endpoint, there is no need to enter the full url.

The next thing to do is run our `locustfile.py` file and we can do this by running `locust` in another command line window after running `python manage.py runserver`. 

You should get a response like this:

![locust running on the command line](/engineering-education/how-to-test-django-applications-with-locust/locust_response.png)

In the browser, enter "http://localhost:8089" and you will see the page below displayed:

![locust homepage](/engineering-education/how-to-test-django-applications-with-locust/locust_homepage.png)

- The form fields are initially empty, but we have decided to fill them out. The first field is the total number of users we want to access our API at the same time, we have decided to start with 5 users. 
- The second field is the number of users we want locust to spin up per second, we decided to go with 2, and finally the last field is the host i.e the url to the API we want to test, since we are testing locally, our localhost is what we entered. This is also the reason we entered just the path to the endpoint we want to test as an argument in `client` since locust is going to ask for the host when we want to test. By pressing enter, locust starts to spin up users and simulates them making requests to the endpoint we have specified. 

There is a table and a chart that shows us how our application is performing with these requests, below is a picture of our own:

![test chart 1](/engineering-education/how-to-test-django-applications-with-locust/five_users_test_chart.png)

As we can see, 5 users are hitting the endpoint that returns all the 5000 posts in our database at the same time and our API takes about 19 to 29s to return all the posts.This is not what we want and as the users grow, it will definitely take more time to return all posts, what can we now do? 

How can we improve this? Let's talk about `select_related`.

According to Django [documentation]https://docs.djangoproject.com/en/4.0/ref/models/querysets/#select-related)

> select_related() returns a queryset that will "follow" foreign-key relationships, selecting additional related-object data when it executes a query. This is a performance booster which results in a single more complex query but means later use of foreign-key relationships will not require database queries.

>Ddjango will make database queries to fetch information for fields that are foreign-keys. After hitting the database to fetch the "non-foreignkey" fields. It will do everything in a single query thus making the queries execute faster. We will see the result of using `select_related` shortly. 

>Note that `select_related` only works for ForeignKey, OneToOneField and reverse OneToOneField, it doesn't work for ManyToManyField, `prefetch_related` is used for ManyToManyField and since we are not using ManyToManyField in our project, we are not going to talk about it.

To use `select_related`, let's modify the ORM calls we are making in the views inheriting from `ListAPIView` and `RetrieveAPIView`. 

Our views should now look like this:

```bash
class ListPostAPIView(ListAPIView):
    serializer_class = ListPostSerializer
    def get_queryset(self):
        posts = Post.objects.select_related('user').all() # added select_related here
        return posts

class RetrievePostAPIView(RetrieveAPIView):
    serializer_class = ListPostSerializer
    lookup_field = "pk"
    def get_queryset(self):
        return Post.objects.select_related('user').filter(id=self.kwargs.get('pk')) # added select_related here

class ListCommentAPIView(ListAPIView):
    serializer_class = ListCommentSerializer
    def get_queryset(self):
        return Comment.objects.select_related('user', 'post').all() # added select_related here

class RetrieveCommentAPIView(RetrieveAPIView):
    serializer_class = ListCommentSerializer
    lookup_field = 'pk'
    def get_queryset(self):
        return Comment.objects.select_related('user', 'post').filter(id=self.kwargs.get('pk')) # added select_related here


```

The way to use `select_related` is to call it and then pass in the fields that are ForeignKey as argument and Django will handle the rest. In the case of Post model, user field is the only ForeignKey we have and that is what we passed in as an argument.

In the case of Comment model, we have two ForeignKey field; post and user, and those are the fields we passed in as arguments. The order of placement of `select_related` also doesn't matter.

It could come before or after `.all()` or `.filter()` or `.get()`. Let's see our API's performance after this changes. Typing `locust` on the command line after running the server and testing with 5 users at the rate of 2 users per second, the performance of the API when 5 users are hitting the endpoint that returns all the 5000 posts in the database looks like this:

![test chart 2](/engineering-education/how-to-test-django-applications-with-locust/five_users_test_chart2.png)

We can see the improvement from the chart, to return all 5000 posts it takes about 0.6 to 2.3s as opposed to about 29s, that is a whooping 92% improvement. 

Of course as the number of users increase, the response time also increases, so how can we further improve our API? What else can we do? Well, thinking about it, we do not actually want to return all the 5000 posts back to the frontend all at once.

Users don't usually have the patience of scrolling through a page that contains 5000 items. What we can do instead is implement pagination, we are going to split the result into pages that returns fewer number of items, this will certainly improve our API.

To implement pagination with Djangorestframework is really simple since we are using classes from `rest_framework.generics` to create our views, I mean classes like `ListAPIView`. 

All we have to do is just add the snippet below to our settings.py file and we are good to go.
```bash
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
 
    'PAGE_SIZE': 20 # It could be any number of your choosing
}
```

The new endpoint format will now be "/blog/posts?page=1". "page=1" is telling Django to start from the first page, to move to the next page, the value of page will be 2 and so on.

After running our locust file and testing, the new chart looks like the one below:
![test chart 3](/engineering-education/how-to-test-django-applications-with-locust/two_fifty_users_chart.png)

Below is the graph for it:

![test graph 1](/engineering-education/how-to-test-django-applications-with-locust/two_fifty_users_chart.png)

We decided to increase the number of users to a more realistic number like 250, and we told locust to spin up new users after every two seconds, and as we can see from the chart above, it takes about 0.008 to 0.17s to return a response, that is another 92.6% improvement in the response time from when it took 2.3s to return a response. 

We can see from the graph that the response time jumped momentarily to about 4s and in no time came crashing down again. Now we have seen some of the ways to improve our API to handle more users, more tests can be carried out with more users but we will just keep things simple. 

Let's look at how we can test some other endpoints. We are going to paste the following code into our locustfile.py file
```bash
import time
from locust import HttpUser, TaskSet, events, task, between


@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    print("Test started!")

```
The `events` decorator allow us run some setup code as part of our test. In our case we want to print out a message when the test starts, so we are wrapping `on_test_start` function with `@events.test_start.add_listener` decorator.

```bash
@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    print("Test has ended!")
```

The same idea here, after the test is stopped, we are printing out a message on the console.

```bash
class PostSection(TaskSet):
    login_token = ''
    wait_time = between(2, 7)

    @task(10)
    def list_posts(self):
        self.client.get("blog/posts?page=1")

    @task
    def post_detail(self):
        for id in range(20):
            self.client.get(f"blog/post/{id + 1}", name="/blog/post/{id}")
            time.sleep(5)

    @task
    def create_post(self):
        data = {
            "title": "This is another random title", 
            "body": "This is the body of a randomly titled post"
        }
        headers = {
            "Authorization": f"Token {self.user.login_token}"
        }
        self.client.post("blog/create", json=data, headers=headers)

    @task
    def comments(self):
        self.client.get("blog/comments?page=1")
    
    @task
    def create_comment(self):
        data ={
            "title": "This is another random title", 
            "body": "This is the body of a randomly titled post"
        }
        headers = {
            "Authorization": f"Token {self.user.login_token}"
        }

        self.client.post("blog/post/17472/comment/create", json=data, headers=headers)


    @task
    def stop(self):
        self.interrupt()
```

We are inheriting from `TaskSets` class, according to locust documentation:

> TaskSets is a way to structure tests of hierarchical web sites/systems. This allows us to simulate a user making use of our app from seeing the first page to whatever page they choose to go to. Since we can't know for certain which page a user visits before hand, locust's idea of picking tasks randomly suits this perfectly. It mimicks a user using our website by picking Tasks randomly. Since there is always a page users are shown when they visit our website, we can add an integer value to the task decorator of any Task we want and this will make locust 4 times more likely to pick that Task than other Tasks. 

`wait_time` will make the users generated to wait between a certain number of seconds, this number of seconds is determined by the the first and second argument of `between()`, in our case, we have decided to go with between 2-7 seconds.

We then created tasks for the endpoints we want to test. Endpoint to create posts and comments require users to be authenticated, so we are passing in a token gotten from `on_start()`. We will talk about this function shortly. 

Before these two endpoints can be tested properly, we need to add the code snippet below to the `REST_FRAMEWORK` variable we defined in our settings.py file:

```bash
'DEFAULT_AUTHENTICATION_CLASSES': [
    'rest_framework.authentication.TokenAuthentication',
    'rest_framework.authentication.BasicAuthentication'
]
```

`post_detail` is the endpoint for fetching details of a single post, so we wrote a for loop to get the details of 20 different posts. We decided to just fetch 20 for the sake of simplicity. To prevent getting 20 seperate endpoints in locust test result table, we use the name parameter to group all those requests under a single entry that we called `"/blog/post/{id}"`.

It is important to define `stop()` method when using `TaskSets` or else they will never stop executing their tasks and won't be able to hand over execution back to their parent TaskSet by themselves.

```bash
class TestUser(HttpUser):
    wait_time = between(5, 10)
    tasks = [PostSection]
    login_token = ''
    def on_start(self):
        response = self.client.post("login/", json={"username": "admin", "password": "admin"})
        self.login_token = response.json()['token']

```

We can call our class that inherited from `TaskSets` inside `TestUser` by putting it into a list and giving it a variable called tasks, it is important the variable name is called "tasks". We also defined an `on_start()` method which will be called for each user generated by locust. 

In our case, we want to log each simulated user in and save their token, then use that token to access endpoints that needs authentication. Locust starts execution from `TestUser`; it executes the `on_start()` method before picking `PostSection` from the list and executing the Tasks under it.

Below is the full code snippet:
```bash
import time
from locust import HttpUser, TaskSet, events, task, between


@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    print("Test started!")


@events.test_stop.add_listener
def on_test_stop(environment, **kwargs):
    print("Test has ended!")

class PostSection(TaskSet):
    login_token = ''
    wait_time = between(2, 7)

    @task(10)
    def list_posts(self):
        self.client.get("blog/posts?page=1")

    @task
    def post_detail(self):
        for id in range(20):
            self.client.get(f"blog/post/{id + 1}", name="/blog/post/{id}")
            time.sleep(5)

    @task
    def create_post(self):
        data = {
            "title": "This is another random title", 
            "body": "This is the body of a randomly titled post"
        }
        headers = {
            "Authorization": f"Token {self.user.login_token}"
        }
        self.client.post("blog/create", json=data, headers=headers)

    @task
    def comments(self):
        self.client.get("blog/comments?page=1")
    
    @task
    def create_comment(self):
        data ={
            "title": "This is another random title", 
            "body": "This is the body of a randomly titled post"
        }
        headers = {
            "Authorization": f"Token {self.user.login_token}"
        }

        self.client.post("blog/post/1/comment/create", json=data, headers=headers)


    @task
    def stop(self):
        self.interrupt()


class ListPostUser(HttpUser):
    wait_time = between(5, 10)
    tasks = [PostSection]
    login_token = ''
    def on_start(self):
        response = self.client.post("login/", json={"username": "admin", "password": "admin"})
        self.login_token = response.json()['token']

```

If we test our API with 250 users at the rate of 2 users per seconds, we will have something like this:


![Test result of all endpoints](/engineering-education/how-to-test-django-applications-with-locust/all_endpoints_test_table.png)

### Conclusion
An application performance after it has been deployed cannot be known beforehand. Monitoring will still need to be done to ensure our application runs smoothly. With locust we can have an idea of how our application will perform. Locust can also be used to test any other application you might have built with another language or framework that is not Python or Django.


Happy coding!

### References:
- [Faker](https://faker.readthedocs.io/en/master/)
- [Locust](https://docs.locust.io/en/stable/what-is-locust.html)
- [Django](https://docs.djangoproject.com/en/4.0/intro/tutorial01/)
- [Djangorestframework](https://www.django-rest-framework.org/)
