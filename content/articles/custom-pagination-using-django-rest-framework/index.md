---
layout: engineering-education
status: publish
published: true
url: /custom-pagination-using-django-rest-framework/
title: Custom Pagination Using Django REST Framework with Vue
description: The objective of this tutorial is to help the reader understand how to paginate web applications for better user experience and readability and how one can customize and modify the default pagination styles using Django REST Ramework with Vue.
date: 2021-08-19T00:00:00-11:45
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/custom-pagination-using-django-rest-framework/hero.jpg
    alt: Custom Pagination Example image
---

On most modern web applications and websites, one will need to split the app content mostly when displaying huge lists of content sliced in multiple pages for better user experience and readability. It made this easier with Python Django as it comes with a pre-built class, Paginator, to create and manage paginated data of applications.
<!--more-->
This article will cover how we can use the Django REST Framework with Vue to customize and modify pagination styles and help the reader understand the various ways of data pagination and its importance in web development.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Pagination](#pagination)
- [Ways of Pagination](#ways-of-pagination)
  - [Project Structure.](#project-structure)
  - [Class-Based Views](#class-based-views)
  - [Function-Based Views](#function-based-views)
- [Custom Pagination Using Django Rest Framework](#custom-pagination-using-django-rest-framework)
- [Conclusion](#conclusion)

### Prerequisites
To follow through this tutorial, the reader should:
- Have prior knowledge of Python and Python Django concepts.
- Have a good understanding of Python Django REST Framework and Vue.
- Have a suitable IDE installed such as Pycharm, VS Code, etc.

For this article will use the Pycharm IDE, use this [page](https://www.jetbrains.com/pycharm/download/#section=windows) to download and install it on your machine.

### Pagination
This is the process of splitting the content of a website or web application into discrete pages to make it more efficient to use and read when working with huge lists of data. Python Django comes with a pre-built class, **Paginator** for creating the paginations and managing the paginated data using the default styles. The process can be done either with **Class-Based Views** or **Function-Based Views** as will be discussed in the tutorial.
Sometimes, one may want to customize and modified the pagination format, this is made possible using **Django REST Framework** which includes support for customized pagination styles. This pagination API may handle links that are embedded in the response's text or URLs that are contained in response headers like `Content-Range `or `Link`.
This splitting of web data has its own advantages:
- Increases content readability by making websites and web apps that are not overcrowded with content making it easier for visitors to focus on small content at a time.
- Reduces server load as it is easier to get a small amount of data from the database than retrieving all the information at once which may slow page loading.
- Increases the number of page views per user and total pageviews of the website maximizing the number of impressions they can serve and the number of advertising units websites can sell.

### Ways of Pagination
Pagination can be accomplished with the Django `ListView` class, which is controlled by the `GET` parameter, which specifies which page to display. This will create a simple Django project for posting blogs and implementing the pagination styles.

#### Project Structure.
We are going to use a [blog application](https://djangocentral.com/building-a-blog-application-with-django/) — [Github repo](https://github.com/dentonya/Blog_Post_Site/tree/master/blogsite) – for the sake of this tutorial on class and function-Based Views. Make sure to have cloned the project to follow along.

Check the Python Django version and install it if it isn't already installed:

``` bash
pip install django
```

Create the Django project

```bash
django-admin startproject blogsite
```

Create the `blog` app in the same directory.

```bash
python manage.py startapp blog
```

Below is the project structure.
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
After successfully creating the Django project, go to the terminal and change the working directory to the project directory and run the Django development server using the following command:
```bash
python manage.py runserver
```
The output below should be displayed on the screen.
![Django Output](/engineering-education/custom-pagination-using-django-rest-framework/django.jpg)

#### Class-Based Views
To create this view, enter the blog app's `views.py` file, add the following to the file.
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
To display the pagination on the screen, we will use the templates `index.html` file contained in the templates folder and add the code below.
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
Re-running the project the output below will be produced for class-based view pagination.
![Class Based Views](/engineering-education/custom-pagination-using-django-rest-framework/class_based.jpg)

#### Function-Based Views
For the function-based views open the `views.py` and add the code below.

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
As a result, in the view, we instantiate the `Paginator` class with the number of objects to be displayed on each page, which is 3. The `request.GET.get('page')`argument returns the current page number.To get the items from the appropriate page number, use the `page()` function. Below that are two exception statements for `PageNotAnInteger` and `EmptyPage`, both of which are subclasses of InvalidPage, and finally the HTML content is rendered.
Then in the templates `index.html` paste the following code below the snippets.

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
Upon re-reloading the server, u will see the next or previous button below the posts.
![Function Based Views](/engineering-education/custom-pagination-using-django-rest-framework/function_based.jpg)

### Custom Pagination Using Django Rest Framework
For custom pagination will install the Django REST Framework and Vue with the following commands:

```bash
pip install djangorestframework
```

```bash
npm install vue
```
Then create a Django `pagination` project using the same method above and add the `blog` app. The project structure is as shown below:

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
Open the `settings.py` and add the blog app and the REST framework under installed apps.

```python
INSTALLED_APPS = [
    'rest_framework',
    'blog.apps.BlogConfig',
]
```
Create the post models under the `models.py` by adding code below, create the views in the `views.py` and create new files in the blog app, `urls.py` and for the Django REST Framework, use  `serializers.py.`

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
Inside the `views.py` specify the number of posts to be displayed per age using the `page_size` variable and the pagination class.
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
For the REST API Import `serializers` from REST Framework and the `Post ` model then add code to `serializers.py` that specifies all the fields to be obtained from the database.
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

After successful updating, the database, run the app using the command below and the output displayed is as shown below displaying the post list.
![Post List](/engineering-education/custom-pagination-using-django-rest-framework/post_rest.jpg)

```python
python manage.py runserver
```
Now, to display the post content on the homepage will use Vue js to render the static files. Under the created `templates` folder inside the blog app and add the code below to the `index.html` file.
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
Re-running the program the following output should be displayed containing the next and previous buttons.
![Custom Pagination](/engineering-education/custom-pagination-using-django-rest-framework/custom_pagination.jpg)


The full combined code can be found on [GitHub.](https://github.com/dentonya/Custom_Pagination_With_Django_REST_Framework)

### Conclusion
As we have seen that it is easier for one to display a huge list of content sliced on multiple pages by splitting the web content for easier readability and usage by web visitors using the Django paginator class. The tutorial has also equipped the reader with knowledge of how to customize the pagination styles using Django rest framework using `pagination-class` and the `page_size `variable.


To summarize, we have:

- Learned what is Pagination and its uses in web development.
- Explored some of the ways of paginations together with sample code examples.
- Learned how to customize Default pagination styles using Django REST Framework with Vue.
- Worked on the blog project as an illustration for custom pagination.

You can find more information about custom pagination with Django REST Framework [here](https://www.django-rest-framework.org/api-guide/pagination/).

Happy coding!

---
Peer Review Contributions by: 