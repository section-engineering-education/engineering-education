---
layout: engineering-education
status: publish
published: true
url: /integrating-youtube-videos-into-a-django-application/
title: Integrating Youtube Videos Into a Django Application
description: This article will discuss the simple steps required to add youtube videos into a Django app. The reader will also learn how to adjust the youtube videos to suitable sizes.
author: samuel-mwangi
date: 2021-09-30T00:00:00-11:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/integrating-youtube-videos-into-a-django-application/hero.png
    alt: Integrating Youtube Videos Into a Django App Hero Image
---
Modern organizations, bloggers, companies, and brands, are featuring both pictures and videos on their websites to strengthen their content and to promote their YouTube channels.
<!--more-->
It is very convenient because using YouTube, unlike directly uploading a video, saves you space, cost, and compatibility issues. It is important to know how this can be achieved using Django. This is because Django is rising rapidly.

We will create a simple blogging app and embed youtube videos in it so that when we write a blog, we can add a youtube video to it.

### Prerequisites
1. Install and set up a programming environment for python 3.
2. Have some fundamental knowledge of python and the Django framework.

### Step 1: Setting up the environment
We will begin by creating a directory that will contain our project.

Open the command line and type in the following command:

```bash
mkdir projectX
```

Change your current directory to projectX:

```bash
cd projectX
```

Then create and activate the virtual environment `.venv` which shall help us isolate our project and all its dependencies from other projects in our computer.

The creation process for windows will be as follows:

```bash
py -m venv .venv
```

For the activation:

```bash
.venv\Scripts\activate.bat
```

### Step 2: Downloading required packages
We can install Django and Django-embed-video simultaneously using the following command:

```bash
pip install django django-embed-video
```

Django is the Django framework package while Django-embed-video is the Django app that makes the embeding of videos from Youtube, Vimeo, and music from soundcloud easy.

### Step 3: Creating the Django project
Create a Django project using the following command:

```bash
django-admin startproject demo
```

Change directory to demo:

```bash
cd demo
```

Create a Django app:

```bash
py manage.py startapp blog
```

### Step 4: Setting up the backend
#### 4.1: Register apps
In `settings.py` under `INSTALLED_APPS` add our new apps embed_video and blog:

```python
INSTALLED_APPS = [
#...
'embed_video',
'blog',
]
```

#### 4.2: Creating the models
In `models.py` create the following model and remember to make the necessary import `EmbedVideoField` as shown below:

```python
from  embed_video.fields  import  EmbedVideoField
#Create your models here.
class  tutorial(models.Model):
	tutorial_Title = models.CharField(max_length=200)
	tutorial_Body = models.TextField()
	tutorial_Video = EmbedVideoField()

	class  Meta:
		verbose_name_plural = "Tutorial"

	def  __str__(self):
		return  str(self.tutorial_Title) if  self.tutorial_Title  else  " "
```

The `tutorial` class is where we create our model. In `Meta` class, we told Django the plural name of our model (if there is more than one object).

The `__str__` function ensures that our objects are listed with their name properties in Django admin i.e. the tutorials shall be listed according to their `tutorial_Title`.

Then run the following commands respectively to make migrations and migrate our model:

```bash
py manage.py makemigrations
```

```bash
py manage.py migrate
```

`makemigrations` tells Django to store the new changes made in our models, and `migrate` tells Django to apply those changes to the database.

#### 4.3: Registering the models
In order to have access to our model using Django admin, we have to register our model in `admin.py`.

Import `AdminVideoMixin` and `tutorial` then register your model as shown below:

```python
from  embed_video.admin  import  AdminVideoMixin
from .models  import  tutorial
#Register your models here.

class  tutorialAdmin(AdminVideoMixin, admin.ModelAdmin):
	pass

admin.site.register(tutorial, tutorialAdmin)
```

#### 4.4: Creating the views
We will need two views, namely: `blog`, and `blog_detail`. The blog will be responsible for fetching all the objects when `blog.html` is requested.

Blog_detail will be responsible for fetching the contents of a specific object when `blogdetail.html` is requested.

In `views.py`:

```python
from .models  import  tutorial
#Create your views here.

def  blog(request):
	Tut = tutorial.objects.all()
	context = {
	'Tut': Tut,
	}
	return  render(request, 'blog.html', context)

def  blog_detail(request,pk):
	Tut = tutorial.objects.get(pk=pk)
	context = {
	'Tut': Tut,
	}
	return  render(request, 'blogdetail.html', context)
```

Tut in `blog()` fetches all objects, in this case all the tutorials created, while Tut in `blog_detail()` fetches a specific tutorial that matches the requested id, in this case `pk`

#### 4.5: Configuring url's
Inside `urls.py` in the `demo` directory, we will point the root `URLconf` at the `blog.urls` module.

Remember to add an import for the `from django.urls import path, include`:

```python
from  django.urls  import  path, include # new

urlpatterns = [
	path('', include('blog.urls')),  #new
	path('admin/', admin.site.urls),
]
```

We used the `include()` to reference `blog.urls`.

Then create another `urls.py` file in your blog directory and then point the urls to their corresponding views as shown below:

```python
from  django.urls  import  path
from .import  views

urlpatterns =[
path('', views.blog, name= 'blog'),
path('<int:pk>/', views.blog_detail, name='blog_detail'),
]
```

#### 4.6: Creating the superuser account
The superuser account will enable us to login to our site as an admin to post, update, or delete a blog.

To create a superuser account, use the following commands which will prompt you to enter your username, email and password:

```bash
py manage.py createsuperuser
```

### Step 5: Frontend
Create a new directory in the `blog` directory and name it `templates` then create three files named `base.html`, `blog.html`, and `blogdetail.html` inside it.

In `base.html`, we will add the primary HTML code that is shared by both `blog.html` and `blogdetail.html`.

Add the following code in `base.html`:

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- Bootstrap CSS -->
		<link
			href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
			rel="stylesheet"
			integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
			crossorigin="anonymous"
		/>

		<title>Hello, world!</title>
	</head>
	<body>
		<div class="container-fluid">
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<div class="container-fluid">
					<button
						class="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo03"
						aria-controls="navbarTogglerDemo03"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span class="navbar-toggler-icon"></span>
					</button>
					<a class="navbar-brand" href="#">BLOG</a>
					<div class="collapse navbar-collapse" id="navbarTogglerDemo03">
						<ul class="navbar-nav me-auto mb-2 mb-lg-0">
							<li class="nav-item">
								<a
									class="nav-link active"
									aria-current="page"
									href="http://127.0.0.1:8000/"
									>Home</a
								>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			{% block page_content %}{%endblock%}
		</div>

		<!-- Option 1: Bootstrap Bundle with Popper -->

		<script
			src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
			crossorigin="anonymous"
		></script>
	</body>
</html>
```

In `blog.html`, we will display all the tutorials that will be added, but we will only display the titles and a small part of the tutorial body in a list fashion:

```HTML
{% extends 'base.html' %}

	{% block page_content %}

	<div  class="col-md-8 offset-md-2">
		<h1>Blog Index</h1>
		<hr>
		{% for t in Tut %}
		<h2><a  href="{% url 'blog_detail' t.pk %}">{{ t.tutorial_Title}}</a></h2>
		<p>{{ t.tutorial_Body | slice:':400' }}...</p>
		{% endfor %}
	</div>

	{%endblock%}
```

In `blogdetail.html` we will display the title, body, and a video of the selected tutorial:

```HTML
{% extends 'base.html' %} {% load embed_video_tags %}
{% block page_content %}

	<div  class="col-md-8 offset-md-2">
		<h1>{{ Tut.tutorial_Title }}</h1>
		<p>{{ Tut.tutorial_Body | linebreaks }}</p>
		<h3>Here is the video:</h3>

		{% video Tut.tutorial_Video 'tiny' %}

	</div>

{%endblock%}
```

The tag `{% video Tut.tutorial_Video 'tiny' %}` is responsible for rendering our YouTube video.

The videos can be rendered in different sizes as follows:
- tiny (420x315)
- small (480x360)
- medium (640x480)
- large (960x720)
- huge (1280x960)

`{% video Tut.tutorial_Video 'huge' %}` can be used for huge videos.

We can also set custom dimensions for the video if the default ones does not fit our requirements. For example, `{% video Tut.tutorial_Video '600x400' %}`.

### Step 6: Testing our application
Now that we have set up everything, we can run our app.

Use the command below to run the server:

```bash
py manage.py runserver
```

Then login to the [admin site](http://127.0.0.1:8000/admin/) and add a few dummy tutorials for testing purposes:

![My admin site after adding a few tutorials](/engineering-education/integrating-youtube-videos-into-a-django-application/admin.jpg)

After adding the tutorials, you can check out the [blog](http://127.0.0.1:8000):

![My homepage after adding some tutorials](/engineering-education/integrating-youtube-videos-into-a-django-application/blog.jpg)

Here is how my dummy tutorials look like:

![My dummy tutorial](/engineering-education/integrating-youtube-videos-into-a-django-application/blog-detail.jpg)

### Further reading
For more information, you can check out the [documentation](https://django-embed-video.readthedocs.io/en/latest/) for django embed video.

### Conclusion
Through this article, we have created a Django application into which we have added a youtube video. We have gone through the simple steps of how to embed Youtube videos into projects using Django framework.

I hope you find this tutorial beneficial.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
