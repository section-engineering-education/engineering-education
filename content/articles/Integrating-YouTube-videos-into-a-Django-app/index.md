### Introduction

Modern Organisations, bloggers, companies, and brands are featuring both pictures and videos on their websites to strengthen their content and to also promote their YouTube channels.

It is very convenient because using YouTube unlike directly uploading a video, saves you space, cost, and compatibility issues. Django being on the rise, it is important to know how this can be achieved using Django.

We will create a simple blogging app and embed youtube videos in it so that when we write a blog, we can add a youtube video to it.

### Prerequisites

1.  Install and set up a programming environment for python 3
2.  Have some fundamental knowledge in python and the Django framework

#### Step 1: Setting up the environment and downloading required packages

We will begin by creating a directory that will contain our project.
Open the command line and type in the following:

```bash
mkdir projectX
```

Change your current directory to projectX:

```bash
cd projectX
```

Then create and activate the virtual environment respectively (for windows):

```bash
py -m venv .venv
```

```bash
.venv\Scripts\activate.bat
```

Now we can install Django and Django-embed-video simultaneously using:

```
pip install django django-embed-video
```

Create a Django project:

```bash
django-admin startproject demo
```

Change directory to demo

```bash
cd demo
```

Create a Django app

```bash
py manage.py startapp blog
```

### Step 2: Setting up the backend

#### 2.1: Register apps

In `settings.py` under `INSTALLED_APPS` add embed_video and blog

```python
INSTALLED_APPS = [
#...
'embed_video',
'blog',
]
```

#### 2.2: Creating the models

Our article will have three parts: the title, the body where the content is and lastly the YouTube video.
In `models.py` create the following model

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

Then run the following commands respectively to make migrations and migrate our model.

```bash
py manage.py makemigrations
```

```bash
py manage.py migrate
```

#### 2.3: Registering the models

In order to have access to our model using Django admin we have to register our model in `admin.py`

```python
from  embed_video.admin  import  AdminVideoMixin
from .models  import  tutorial
#Register your models here.

class  tutorialAdmin(AdminVideoMixin, admin.ModelAdmin):
	pass

admin.site.register(tutorial, tutorialAdmin)
```

#### 2.4: Creating the views

We will need two views namely `blog` and `blog_detail`. The blog will be responsible for fetching all the objects when `blog.html` is requested.
Blog_detail will be responsible for fetching the contents of a specific object when `blogdetail.html` is requested.
In `views.py` add this code

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

#### 2.5: Configuring urls

In `demo>urls.py` add the following and remember to import `include`

```python
from  django.urls  import  path, include # new

urlpatterns = [
	path('', include('blog.urls')),  #new
	path('admin/', admin.site.urls),
]
```

Then create another `urls.py` file in your blog directory and then point the urls to their corresponding views

```python
from  django.urls  import  path
from .import  views

urlpatterns =[
path('', views.blog, name= 'blog'),
path('<int:pk>/', views.blog_detail, name='blog_detail'),
]
```

#### 2.6: Creating the superuser

Create the superuser account using the following commands
`py manage.py createsuperuser`

### Step 3: Frontend

Create a new directory in the `blog` directory and name it `templates` then create three files named `base.html`, `blog.html`, and `blogdetail.html` inside it.
In `base.html`, we will add the primary HTML code that is shared by both `blog.html` and `blogdetail.html`.
In `base.html`:

```HTML
<!doctype  html>
<html  lang="en">
	<head>
		<!-- Required meta tags -->
		<meta  charset="utf-8">
		<meta  name="viewport"  content="width=device-width, initial-scale=1">
		<!-- Bootstrap CSS -->
		<link  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"  rel="stylesheet"  integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"  crossorigin="anonymous">

	<title>Hello, world!</title>
	</head>
<body>
	<div  class="container-fluid">
	<nav  class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div  class="container-fluid">
			<button  class="navbar-toggler"  type="button"  data-bs-toggle="collapse"  data-bs-target="#navbarTogglerDemo03"  aria-controls="navbarTogglerDemo03"  aria-expanded="false"  aria-label="Toggle navigation">
				<span  class="navbar-toggler-icon"></span>
			</button>
		<a  class="navbar-brand"  href="#">BLOG</a>
		<div  class="collapse navbar-collapse"  id="navbarTogglerDemo03">
		<ul  class="navbar-nav me-auto mb-2 mb-lg-0">
			<li  class="nav-item">
			<a  class="nav-link active"  aria-current="page"  href="http://127.0.0.1:8000/">Home</a>
		</ul>
		</div>
	</div>
	</nav>

	{% block page_content %}{%endblock%}

	</div>

	<!-- Option 1: Bootstrap Bundle with Popper -->

	<script  src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"  integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"  crossorigin="anonymous"></script>

</body>
</html>
```

In `blog.html` we will display all the tutorials that will be added, but we will only display the titles and a small part of the tutorial body in a list fashion.

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

In `blogdetail.html` we will display the title, body and video of the selected tutorial.

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

The tag `{% video Tut.tutorial_Video 'tiny' %}` is responsible for rendering our youTube video.
The videos can be rendered in different sizes as follows: tiny (420x315), small (480x360), medium (640x480), large (960x720) and huge (1280x960) ie: {% video Tut.tutorial_Video 'huge' %} can be used for huge videos.
We can also set custom dimensions for the video if the default ones don't fit our requirements ie:
{% video Tut.tutorial_Video '600x400' %}

### Step 4: Testing

Now that we have set up everything, we can run our app, we can run the server

```bash
py manage.py runserver
```

then login into your [admin site](http://127.0.0.1:8000/admin/) and add a few dummy tutorials to your site for testing purposes.

![my admin site after adding a few tutorials](/engineering-education/Integrating-YouTube-videos-into-a-Django-app/admin.jpg)

After adding the tutorials you can check out the [blog](http://127.0.0.1:8000)

![my homepage after adding some tutorials](/engineering-education/Integrating-YouTube-videos-into-a-Django-app/blog.jpg)

Here is how my dummy tutorials look like.

![my dummy tutorial](/engineering-education/Integrating-YouTube-videos-into-a-Django-app/blogdetail.jpg)

### Futher reading

For more, you can check out the [documentation](https://django-embed-video.readthedocs.io/en/latest/)

### Conclusion

In this tutorial you have :

1.  Created a simple Django app that can render YouTube videos.
2.  Created a frontend that supports embedded youtube videos.
3.  Learned how to adjust the YouTube videos into various sizes.

You can now use the knowledge on your projects.
Happy coding!
