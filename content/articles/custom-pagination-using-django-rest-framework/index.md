---
layout: engineering-education
status: publish
published: true
url: /custom-pagination-using-django-rest-framework/
title: Custom Pagination Using Django REST Framework with Vue
description: This tutorial aims to help the reader understand how to paginate web applications for a better user experience and readability. It also looks at how one can customize and modify the default pagination styles using Django REST Framework with Vue.
author: atonya-dennis
date: 2021-11-15T00:00:00-11:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/custom-pagination-using-django-rest-framework/hero.jpg
    alt: Custom Pagination Example image
---

One will need to split the app content mainly when displaying large items on the web page.  We can achieve this with Django as it comes with a pre-built class, Paginator, to create and manage paginated data of applications.
<!--more-->
This article will cover how we can use the Django REST Framework with Vue to customize and modify pagination styles. 

In the end, the reader will understand the various ways of data pagination and its importance in web development.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Pagination](#pagination)
- [Ways of Pagination](#ways-of-pagination)
- [Custom Pagination Using Django Rest Framework](#custom-pagination-using-django-rest-framework)
- [Conclusion](#conclusion)

### Prerequisites
To get the most out of this tutorial, you should have:
- Knowledge of Python and Django concepts.
- A solid understanding of Django REST Framework and Vue.
- A suitable IDE installed such as Pycharm, Visual Studio Code, etc.

This article will use the Pycharm IDE. Use this [page](https://www.jetbrains.com/pycharm/download/#section=windows) to download and install it on your machine.

### Pagination
Pagination is the process of splitting the content of a web page into discrete pages to make it more efficient to use and read when working with large lists of items. 

Django comes with a pre-built class, `Paginator`, for creating the paginations and managing the paginated items using the default styles.

Paginations can be done either with `Class-Based Views` or `Function-Based Views`. Sometimes, one may use the `Django REST Framework` to customize and modify the pagination format, as discussed in this tutorial.

Splitting of web page data has its advantages:
- Increases content readability as they are less crowded.
- Reduces server load as it is easier to get a portion of data from the server.
- Increases the number of page views per user and total page views of the website, maximizing the number of impressions they can serve and the number of advertising units websites can sell.

### Ways of Pagination
A generic `ListView` is a class-based view in Django instead of using something else, such as a function-based view.

So in this article, we take the approach of showing you how to create a list view from a generic class-based `ListView`.

#### Project Structure.
Now, let's structure our project and build a blog site for posting items which we'll then paginate.

>We'll be using use a [blog application](https://djangocentral.com/building-a-blog-application-with-django/) and [this](https://github.com/dentonya/Blog_Post_Site/tree/master/blogsite) source code for the sake of this tutorial on class and function-Based Views. So make sure to have cloned the project to follow along.

Check the Django version and install if not already installed:

``` bash
pip install django
```

Next,create the Django project by running the following command:

```bash
django-admin startproject blogsite
```

Proceed and create the `blog` app in the same directory as shown below:

```bash
python manage.py startapp blog
```

Below is the project structure:
```bash
└── blogsite         # < project root package
    ├── blog             # < blog app
    │   ├── admin.py
    │   ├── apps.py
    │   ├── migrations
    │   ├── models.py
    │   ├── urls.py
    │   └── views.py
    ├── manage.py  
    ├── templates   # < templates folder
    └── blogsite    
        ├── settings.py # Django settings file
        ├── urls.py
        └── wsgi.py
```
After successfully creating the Django project,on the terminal and `cd` to the working directory and start the Django development server by running the following command:
```bash
python manage.py runserver
```

Output:
![Django Output](/engineering-education/custom-pagination-using-django-rest-framework/django.jpg)

#### Class-Based Views
We can  write our API views using class-based views, rather than function based views. As we'll see, this is a powerful pattern that allows us to reuse common functionality on our application, and helps us keep our code `DRY`.

To create this view, add the following to the `views.py` file.
```python
from django.shortcuts import render
from django.views import generic
from .models import Post

class PostList(generic.ListView):
    queryset = Post.objects.filter(status=1).order_by('-created_on')
    template_name = 'index.html'

class PostDetail(generic.DetailView):
    model = Post
    template_name = 'post_detail.html'
```

We will then introduce a new attribute `paginate_by` under the `PostList` view to specify the number of blog items to be displayed per page.

```python
class PostList(generic.ListView):
    queryset = Post.objects.filter(status=1).order_by('-created_on')
    template_name = 'index.html'
    paginate_by = 3
```

To display the paginated content on the screen, we will use the `index.html` file in the templates folder. The file content as follows:

```html
{% extends "base.html" %}
{% block content %}
<style>
    body {
        font-family: "Roboto", sans-serif;
        font-size: 18px;
        background-color: #fdfdfd;
    }

    .head_text {
        color: white;
    }

    .card {
        box-shadow: 0 16px 48px #E3E7EB;
    }
</style>

<header class="masthead">
    <div class="overlay"></div>
    <div class="container">
        <div class="row">
            <div class=" col-md-8 col-md-10 mx-auto">
                <div class="site-heading">
                    <h3 class=" site-heading my-4 mt-3 text-white"> Welcome to my awesome Blog </h3>
                    <p class="text-light">We Love Django As much as you do..! &nbsp
                    </p>
                </div>
            </div>
        </div>
    </div>
</header>
<div class="container">
    <div class="row">
        <!-- Blog Entries Column -->
        <div class="col-md-8 mt-3 left">
            {% for post in post_list %}
            <div class="card mb-4">
                <div class="card-body">
                    <h2 class="card-title">{{ post.title }}</h2>
                    <p class="card-text text-muted h6">{{ post.author }} | {{ post.created_on}} </p>
                    <p class="card-text">{{post.content|slice:":200" }}</p>
                    <a href="{% url 'post_detail' post.slug  %}" class="btn btn-primary">Read More &rarr;</a>
                </div>
            </div>
            {% endfor %}
        </div>
        {% block sidebar %} {% include 'sidebar.html' %} {% endblock sidebar %}
    </div>
</div>
{%endblock%}
```

The above code snippet displays the database row content to the user using the template tags with inline CSS styling.
The `{% extends% }` tag instructs Django to inherit from the `base.html` file. We then inject our content to other HTML files using the `{% block content %}` tag.

Learn more about template tags from [here](https://docs.djangoproject.com/en/3.2/ref/templates/builtins/).

A `for loop`  iterates through the various fields from our `post` model. These fields are then fetched from the database using the model and field name. For example, `post.author`, fetches the author's name of the article and displays it on the screen.

Now, proceed and restart your server. You should be able to see the following on the view:
![Class Based Views](/engineering-education/custom-pagination-using-django-rest-framework/class_based.jpg)

#### Function-Based Views
Function-based views are views in Django that are defined by functions.
Using functions, we can create views using certain functions in Django such as `HttpResponse()` (to hardcode HTML into a view) or `render()` to render a template file into a view.

Now proceed and open the `views.py` and add the following code snippets.

```python
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

# Create your views here.
def PostList(request):
    object_list = Post.objects.filter(status=1).order_by('-created_on')
    paginator = Paginator(object_list, 3)  # 3 posts in each page
    page = request.GET.get('page')
    try:
        post_list = paginator.page(page)
    except PageNotAnInteger:
           
        post_list = paginator.page(1)
    except EmptyPage:
        
        post_list = paginator.page(paginator.num_pages)
    return render(request,
                  'index.html',
                  {'page': page,
                   'post_list': post_list})
```
In the above view, we've instantiated the `Paginator` class with the number of objects(three) to be displayed on each page. 

The `request.GET.get('page')` argument returns the current page number. We have used the `page()` method to get the items from the appropriate page number. 

We then have two exception statements for `PageNotAnInteger` and `EmptyPage`, both subclasses of `InvalidPage`,then, finally rendering the HTML content.

In your  `index.html`, paste the following code below the snippets.
```python
{% if post_list.has_other_pages %}
  <nav aria-label="Page navigation conatiner"></nav>
  <ul class="pagination justify-content-center">
    {% if post_list.has_previous %}
    <li><a href="?page={{ post_list.previous_page_number }}" class="page-link">&laquo; PREV </a></li>
    {% endif %}
    {% if post_list.has_next %}
    <li><a href="?page={{ post_list.next_page_number }}" class="page-link"> NEXT &raquo;</a></li>
   {% endif %}
  </ul>
  </nav>
</div>
{% endif %}
```
Now proceed and restart your server; you should be able to see the following content displayed.
![Function Based Views](/engineering-education/custom-pagination-using-django-rest-framework/function_based.jpg)

### Custom Pagination Using Django Rest Framework
For custom pagination as we had discussed previosuly, we install the Django REST Framework and Vue with the following commands:
```bash
pip install djangorestframework
npm install vue
```

Then proceed to create a Django `pagination` project following the previous procedure. The project structure is as shown below:

```bash
└── pagination         # < project root package
    ├── pagination            # < todo app
    │   ├── admin.py
    │   ├── apps.py
    │   ├── migrations
    │   ├── models.py
    │   ├── serializers.py
    │   ├── urls.py
    │   └── views.py
    ├── manage.py  
    ├── templates/blog
    └── pagination   
        ├── settings.py # Django settings file
        ├── urls.py
        └── wsgi.py
```
Open the `settings.py` and add the following content:

```python
INSTALLED_APPS = [
    'rest_framework',
    'blog.apps.BlogConfig',
]
```
Now, proceed and create the `Post` model in the `models.py` file by adding the following code snippets;
```python
from django.db import models
from django.contrib.auth.models import User

STATUS = (
    (0, "Draft"),
    (1, "Publish")
)


class Post(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField()
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)

    class Meta:
        ordering = ['-created_on']

    def __str__(self):
        return self.title
```
In the `views.py`, specify the number of posts displayed per page using the `page_size` variable and the pagination class.
```python
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.pagination import PageNumberPagination
from .models import Post
from .serializers import PostSerializer
# Create your views here.
def index(request):
    return render(request, 'blog/index.html')

# Create Pagination class how many post
class PostPagination(PageNumberPagination):
    page_size = 3

class PostViewSet(viewsets.ModelViewSet):
    pagination_class = PostPagination
    serializer_class = PostSerializer
    queryset = Post.objects.all()

```
Add the code below to the `urls.py` and link the views and models to the URLs.

```python
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from . import  views

router = DefaultRouter()
router.register("posts",views.PostViewSet, basename="posts")
urlpatterns = [
    path('',views.index, name='index'),
    path('',include(router.urls))
]
```
For the REST API, import the `serializers`  and the `Post ` model, then add the following code to `serializers.py` that specifies all the fields to be obtained from the database.
```python
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'slug', 'author', 'updated_on', 'content', 'created_on', 'status',)

```
Update the database by making and migrating all the migrations from the `models.py` using:

```bash
python manage.py makemigrations
python manage.py migrate.
```

After successfully migrating the database, run the app using the command below. 
```python
python manage.py runserver
```
Output:
![Post List](/engineering-education/custom-pagination-using-django-rest-framework/post_rest.jpg)

To display the post content on the homepage, we will use Vue.js to render the static files. Under the created `templates` folder inside the blog app, add the code below to the `index.html` file.
```python
<!DOCTYPE html>
<html>
    <body>
        <div id="blog">
            <div
                v-for="post in posts"
                v-bind:key="post.id"
            >
                <h2>[[ post.title]]</h2>
                <p>[[ post.updated_on]]</p>
                <p>[[ post.User]]</p>
                <p>[[ post.content]]</p>
            </div>

            <template v-if="showPrevButton">
                <button @click="loadPrev()">Prev</button>
            </template>

            <template v-if="showNextButton">
                <button @click="loadNext()">Next</button>
            </template>
        </div>

        <script src="https://unpkg.com/vue@next"></script>
        <script>
            const Blog = {
                data() {
                    return {
                        posts: [],
                        currentPage: 1,
                        showNextButton: false,
                        showPrevButton: false
                    }
                },
                delimiters: ['[[', ']]'],
                mounted() {
                    this.getPosts()
                },
                methods: {
                    loadNext() {
                        this.currentPage += 1
                        this.getPosts()
                    },
                    loadPrev() {
                        this.currentPage -= 1
                        this.getPosts()
                    },
                    getPosts() {
                        fetch(`/posts/?page=${this.currentPage}`)
                            .then(response => {
                                return response.json()
                            })
                            .then(data => {
                                console.log(data)

                                this.showNextButton = false
                                this.showPrevButton = false

                                if (data.next) {
                                    this.showNextButton = true
                                }

                                if (data.previous) {
                                    this.showPrevButton = true
                                }

                                this.posts = data.results
                            })
                            .catch(error => {
                                console.log(error)
                            })
                    }
                }
            }

            Vue.createApp(Blog).mount('#blog')
        </script>
    </body>
</html>
```
We fetch the database fields using the `post` model we had previously created from the above code. We then use Vue.js to render the content depending on the current page or the next/previous pages. 

More on using Vue and Django REST Framework can be found [here](https://www.udemy.com/course/the-complete-guide-to-django-rest-framework-and-vue-js/?utm_source=adwords&utm_medium=udemyads&utm_campaign=LongTail_la.EN_cc.ROW&utm_content=deal4584&utm_term=_._ag_77879424134_._ad_535397245863_._kw__._de_c_._dm__._pl__._ti_dsa-1007766171312_._li_9073682_._pd__._&matchtype=b&gclid=Cj0KCQjww4OMBhCUARIsAILndv4-9Q4w804CQ1DfpSJK_IoVMnHWgLy5AA8oC7HXI6nEwIKk8jUZhbkaAk2zEALw_wcB).

Now proceed and restart your server. The expected output is as shown below:

![Custom Pagination](/engineering-education/custom-pagination-using-django-rest-framework/custom_pagination.jpg)


You can get the code for this application on [GitHub.](https://github.com/dentonya/Custom_Pagination_With_Django_REST_Framework)

### Conclusion
This tutorial has taken you through the basic concepts of paginations using the Django framework and Vue.js. We have seen how this feature helps in rendering a well-structured output on web pages.

Happy coding

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
