---
layout: engineering-education
status: draft
published: true
url: /full-stack-reactive-website-in-django/
title: Full-Stack Reactive Website in Django (No JavaScript)
description: This tutorial will enable the reader to understand how to create a full-stack reactive web application in Django without any dedicated frontend.
author: samuel-torimiro
date: 2021-10-06T00:00:00-14:06
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/full-stack-reactive-website-in-django/hero.jpg
    alt: Fullstack Reactive Website in Django (no JavaScript) Hero Image
---
Modern websites that require complex user interaction are built using dedicated frontend frameworks like [React](https://reactjs.org/), [Vue.js](https://vuejs.org/) among others. However, some complexities come with them. These include time, cost of hosting, SEO optimization, syntax differences, and in some cases having a duplicate business logic.
<!--more-->
You can achieve the same reactive website with technologies like React without leaving your Django project or learning another language. It, therefore, is less complex, less code intensive and has a faster development time.

There are several technologies out there that can achieve these functionalities like [Sockpuppet](https://sockpuppet.argpar.se/), [reactor](https://github.com/edelvalle/reactor/), and [Unicorn](https://www.django-unicorn.com/docs/). However, you could use Unicorn for this tutorial to achieve interactivity within our Django application without any custom JavaScript.

> Note that there may be benefits to using a dedicated frontend; for instance, it can be helpful to have a dedicated team responsible for coding the frontend and backend of a piece of software.

### Tutorial requirements
To follow along with this tutorial, the reader needs:
- A basic understanding of the Django web framework.
- A working knowledge of Docker.

### Project setup and overview
Here is a quick look at the app you will be building:

![Home Page](/engineering-education/full-stack-reactive-website-in-django/homepage-2.png)

In this application, you can add and delete a new book without refreshing the page, and the same functionality is possible with Single Page Applications (SPAs).

To start, clone down the [base](https://github.com/Samuel-2626/django-reactive/tree/base) branch from the [django-reactive](https://github.com/Samuel-2626/django-reactive) repo:

```bash
$ git clone https://github.com/Samuel-2626/django-reactive --branch base --single-branch
$ cd django-reactive
```

You will use Docker to simplify setting up and running Django with the dependencies. From the project root, create the images and spin up the Docker containers:

```bash
$ docker-compose up -d --build
```

Next, apply the migrations, create a superuser and run the development server:

```bash
$ docker-compose exec web python manage.py migrate
$ docker-compose exec web python manage.py createsuperuser
$ docker-compose exec web python manage.py run server
```

Take note of the `Book` model in *books/models.py*:

```python
from django.db import models
class Book(models.Model):
    title = models.CharField(max_length=200)
    def __str__(self):
        return self.title
```

### Working with Unicorn
[Unicorn](https://www.django-unicorn.com/docs/) is a component framework that progressively enhances a standard Django view. It dynamically updates the DOM with AJAX calls in the background. 

Add it to your installed application:

```py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party
    "django_unicorn", # new
]
```

Update your project `urls.py` file like so:

```py
from django.urls import path, include
path("unicorn/", include("django_unicorn.urls")), # new
```

#### How it works?
1. Unicorn is an open-source library that progressively enhances a standard Django view; therefore, the initial render of the component is quick and great for SEO.
2. Next, Unicorn binds to the elements stipulated and automatically performs AJAX calls when required.
3. Finally, the DOM is updated dynamically by Unicorn.

### Project URLs, views & template
In this section, you will be setting up your project URLs, Views and Templates.

Update your project `urls.py` file like so:

```py
path("", views.index), # new
```

Update your books' application `views.py` file like so:

```py
def index(request):
    return render(request, "index.html", {})
```

Update your books' template `index.html` file like so:

```html
{% load unicorn %}

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Django Books</title>

    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    {% unicorn_scripts %}
  </head>
  <body>
    {% csrf_token %}
    <div class="container">
      <h2>Favourite Django Books</h2>

      {% unicorn 'book' %}
    </div>
  </body>
</html>
```

### Explaining the logic
1. You created a basic Django template for your project while linking the views and URLs together.
2. Take note that you have to load `unicorn` at the top of the Django HTML template.
3. You also added the `unicorn_scripts` into the Django HTML template and added the `crsf_token` in the template as well.

> According to Unicorn, the library follows the best practices of Django and therefore, it requires a `CRSF` token to be set on any page that is a component. This guarantees that no nefarious AJAX Posts can be done.

Additionally, according to Unicorn, it has the concept of component, to refer to a set of interactive functionality that can be put inside the template. So, for example, in the `index.html` file, you added a `book` component.

Furthermore, a component consists of:
**Django HTML template** including particular tags.
**Python view class**, which gives the backend logic for the template.

### Adding and deleting books
In this section, you will be implementing the functionality to add and delete books without refreshing your browser using `Unicorn`.

#### Step 1
From your project root, create a new folder called `unicorn`, create a new folder called `components`, and finally, create a new file called `book.py`.

#### Step 2
From the `unicorn` folder you created earlier on, create another folder called `templates`, inside this folder create a new folder called `unicorn` and finally, inside this folder, create a new file called `book.html`.

#### Step 3
Inside the `book.html`, add the following code:

```html
<div class="row">
  <div class="col-md-6">
    <section>
      <ul class="list-group">
        {% for book in books %}
        <li class="list-group-item">
          {{ book.title }}
          <button
            class="btn btn-outline-danger"
            style="float: right;"
            unicorn:click="delete_book('{{ book.id }}')"
          >
            Delete Book
          </button>
        </li>
        {% empty %}
        <p>Database Empty | Add your favourite Django book</p>
        {% endfor %}
      </ul>
    </section>
  </div>
  <div class="col-md-6">
    <form>
      <input
        type="text"
        class="form-control"
        placeholder="Enter title of the book..."
        unicorn:model.defer="title"
      />
      <br />
      <button
        class="btn btn-secondary"
        style="min-width: 100%;"
        unicorn:click.prevent="add_book"
      >
        Add Books
      </button>
    </form>
  </div>
</div>
```

#### What is Happening Here?
1. Inside the component, you have access to your normal Django syntax.
2. Note the input element; this is familiar except for the `Unicorn: model` attribute. This would specify what field in your backend component would be bound to this input. In this case, the field name would be `title`.

> `unicorn: model` is the magic that ties the input to the backend component.

3. Notice the `Add Books` button with an attribute `unicorn: click`, which tells `unicorn` to bind the `add_book` backend method to the click browser event.
4. Likewise, the `Delete Book` button tells `unicorn` to bind the `delete_book` backend method. You also passed the book `id` to the `delete_book` function to uniquely identify each book.

> To prevent updates from occurring on every input, you can add a lazy or defer modifier to the end of `unicorn: model`.

Attributes used in component templates habitually start with `unicorn:` but the shortcut `u:` is also supported. Note that properties of the component can be of many types, including `str`, `int`, `list`, `dictionary`, `decimal`, and `Django Model`. 

Finally, `Unicorn` requires one root element that envelopes the component template.

#### Step 4
Inside the `book.py`, add the following code:

```py
from django_unicorn.components import UnicornView
from books.models import Book
class BookView(UnicornView):
    title: str = ""
    books = Book.objects.none()
    def hydrate(self):
        self.books = Book.objects.all()
    def add_book(self):
        if self.title != "":
            book = Book(title=self.title)
            book.save()
        self.title = ""
    def delete_book(self, id):
        try:
            book = Book.objects.get(id=id)
            book.delete()
        except:
            pass
```

### Explaining the code logic
1. You are importing the `UnicornView`, a subclass of `TemplateView` under the hood. Therefore, the process of switching from a standard class-based view should be straightforward.
2. The `hydrate` method is called when the component is instantiated to grab the latest books from the database so that the information is up-to-date.
3. The `add_book` method will create a new book model from the title, save it in the database, and then clear the title.
4. The `delete_book` method will delete a book that matches the id.

Once done, navigate to [http://127.0.0.1:8080/](http://127.0.0.1:8080/) to ensure the app works as expected. You should see the following:

![Home Page 2](/engineering-education/full-stack-reactive-website-in-django/homepage.png)

Try adding and deleting some of your favourite Django books.

### Conclusion
This tutorial introduced you on how to build a full-stack reactive web application in Django without any JavaScript. You built a simple application with `unicorn` that can add and delete a book without refreshing the page, hence, **reactive**.

You can download the complete code from [here](https://github.com/Samuel-2626/django-reactive).

Happy coding!

### References
- [Unicorn](https://www.django-unicorn.com/)

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
