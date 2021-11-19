---
layout: engineering-education
status: publish
published: true
url: /representing-data-in-django-using-matplotlib/
title: Representing Data in Django using Matplotlib
description: In this article, we are going to learn how to create a Django application that visualizes and represents data using Matplotlib.
author: john-kiguru
date: 2021-11-15T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/representing-data-in-django-using-matplotlib/hero.jpg
    alt: Representing Data in Django Using Matplotlib hero image
---
When building applications using Django, you may need to present data visualizations using graphs and charts. Matplotlib is one of the popular Python libraries that lets you achieve this functionality.
<!--more-->
In this article, we are going to create a sample Django application that uses Matplotlib to visualize data.

### Prerequisites
- You should have `Django` installed. You also need to be familiar with creating a simple Django application.
- Install `matplotlib` library using `pip install matplotlib` comamnd.
- Some basic knowledge of Python is important.

### Key takeaways
In this article, we are going to:
1. Learn how to build a Django application.
2. Learn how to use `matplotlib` to visualize data in a Django application.

### Getting started
We will create a simple web application to keep track of sales and inventory. This application holds information about customers, products, salespeople, and sales.

To create the project, move to your preferred folder and run the command below:

```bash
django-admin startproject SALES
```

This command will create a basic setup for the project with a folder structure as shown:

```txt
├── db.sqlite3
├── manage.py
├── SALES
│   ├── asgi.py
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── static
│   ├── book.jpg
│   ├── bootstrap-5.0.0-beta1-dist
│   │   ├── css
│   │   │   ├── bootstrap.css
│   │   │   ├── bootstrap.css.map
│   │   │   ├── bootstrap-grid.css
│   ├── style.css
```

We will then create an app called `sales`. You can run it using `python3 manage.py startapp sales` command.

We will need to edit our `settings.py` file to register the app and configure the static files for styling the application.

Edit the `SALES/settings.py` file and add these lines in the `INSTALLED_APPS` array as follows:

```python
INSTALLED_APPS = [
    'sales',
    'crispy_forms'
]
CRISPY_TEMPLATE_PACK = 'bootstrap4'
STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

In the above code, we have registered the app and added `django-crispy-forms` to style our forms. 

We have also declared that static files will be handled in the `/static` folder. We will store all uploaded media files in a folder called `/media`.

To route our settings, we need to edit the `urls.py` file as follows:

```python
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [path('admin/', admin.site.urls)]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### Building models
We are now going to build model classes. Edit the `models.py` file as follows:

```python
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.utils import timezone
from sales.utils import generate_code

# Customer class to keep track of name and image
class Customer(models.Model):
    name = models.CharField(max_length=120)
    logo = models.ImageField(upload_to='customers')

    def __str__(self):
        return self.name

# SalesPerson class to keep track of the the sales person's information
class SalesPerson(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(default='No bio yet...')
    avatar = models.ImageField(upload_to='avatars')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Salesperson {self.user.username}"

# Sale class to keep track of the sales information
class Sale(models.Model):
    transaction_id = models.CharField(max_length=12, blank=True)
    total_price = models.FloatField(blank=True, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    salesman = models.ForeignKey(SalesPerson, on_delete=models.CASCADE)
    created = models.DateTimeField(blank=True)
    updated = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.transaction_id == "":
            self.transaction_id = generate_code()
        if self.created is None:
            self.created = timezone.now()
        return super().save(*args, **kwargs)
   
    def __str__(self):
        return f"Sales for the amount of Kshs {self.total_price}"
```

- We are going to represent the sales data using the `Sale` class.
- We have overridden the `save` method such that if the `transaction_id` is null, one will be generated automatically.
- We have also declared if the `created time` is not defined then the time will be set to the `current time`.

We now need to create the `generate_code` function. Let's create a `utils.py` file and add the following lines of code:

```python
import uuid

def generate_code():
    return str(uuid.uuid4()).replace('-', '').upper()[:12]
```

`generate_code()` returns a random code consisting of 12 alphanumeric characters in uppercase.

Let's register the models to the admin site by adding the following code to the `admin.py` file:

```python
from django.contrib import admin
from .models import Customer, Sale, SalesPerson

# Register your models here.
admin.site.register(Customer)
admin.site.register(Sale)
admin.site.register(SalesPerson)
```

Create a `superuser` by running `python3 manage.py createsuperuser` command.

When you log in to `http://127.0.0.1:8000/admin`, you should be able to create different sale records.

> Note that if the `transaction_id` field is blank, a new value will be generated automatically.

### Representing data
Now that we have added data to our database, let's work on representing them in our application.

We will begin by creating a search form that allows a user to search for particular data. We will filter information based on `date`, `transaction`, `customer address`, and `total price`.

Let's create a `forms.py` file to define the form fields:

```python
from django import forms

CHART_CHOICES = (
    ('#1', 'Bar Graph'),
    ('#2', 'Pie Chart'),
    ('#3', 'Line Graph')
)
RESULTS_CHOICES = (
    ('#1', 'Transaction'),
    ('#2', 'Sales Date'),
    ('#3', 'Customer ID'),
    ('#4', 'Total Price')
)

class SalesSearchForm(forms.Form):
    date_from = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    date_to = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))
    chart_type = forms.ChoiceField(choices=CHART_CHOICES)
    results_by = forms.ChoiceField(choices=RESULTS_CHOICES)
```

The form will allow the user to choose a date, select chart type that groups results according to `CHART_CHOICES` and `RESULTS_CHOICES` as outlined in the above file.

We need to create some views to retrieve data to our web page. In our `views.py` file, let's edit it as follows:

```python
import pandas
from django.shortcuts import render
from django.views.generic import ListView
from .forms import SalesSearchForm

def sales(request):   
    search_form = SalesSearchForm(request.POST or None)
    context = {
        'search_form': search_form,
    }
    return render(request, 'sales.html',  context)
```

The `sales()` function will render the search form to the HTML file. 

### Creating templates
We need to create an HTML file that holds these visualizations.

Let's begin by modifying the settings on the template configuration by editing `settings.py` as shown:

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

This setting will tell Django to look for HTML files from a folder called `templates`.

Create a folder called `templates` in the same level as `manage.py`, and add the new HTML files in it.

The `templates` folder should look as follows:

`SALES/templates`
```buildoutcfg
└── templates
    ├── base.html
    ├── sales.html
```

Edit the `base.html` as follows:

`templates/base.html`
```html
<!DOCTYPE html>
{% load static %}
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="{% static 'style.css' %}">
        <link rel="stylesheet" href="{% static 'bootstrap-5.0.0-beta1-dist/css/bootstrap.css' %}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.js"></script>
        <title>Report App | {% block title %} {% endblock title %}</title>
    </head>
    <body>
        <div class="ui secondary  menu">
            <a class="item"><img style="height:100px;width:100px;" src="{% static 'book.jpg' %}" alt=""></a>
            <a href="#" class="  active item">Home</a>
        </div>
        <div class="container mb-3 mt-3">
            {% block content %}
            {% endblock content %}
        </div>
    </body>
</html>
```

This is the base HTML file that will be used by other files. All common stylings are defined here.

This file allows us to avoid rewriting the same lines of code. We will only need to use `{% extends 'base.html' %}` in other files that require styling.

This base file links different routes in the application. We have a route `Home` to navigate to the data representation page.

The `sales.html` file should be similar to this:

```html
{% extends 'base.html' %}
{% load static %}
{% load crispy_forms_tags %}
 {% block scripts %}

  {% endblock scripts %}
{% block title %}
Home
{% endblock title %}
{% block content %}

<form action="" method="post">
    {% csrf_token %}
    {{search_form|crispy}}
    <button class="btn btn-primary mt-3" type="submit">Search</button>
</form>
{% endblock content %}
```

This file allows us to display our search form in the file. The user can fill the form and submit using the `search` button.

### Routing views
To see our views in action, we will need to configure the routes.

Let's create a `urls.py` file that will handle routing to our function and class.

The mappings above imply that the requests will be handled by this file and then routed to a corresponding view function and class.

Add the following lines of code to it:

```python
from django.urls import path
from . import views

urlpatterns = [path('', views.sales, name='sales')]
```

Let's handle routing for our `sales` app in `SALES/urls.py`:

```python
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('sales.urls'))
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

Let's also edit `base.html` to access the view. Edit it as follows:

```html
<!DOCTYPE html>
{% load static %}
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="{% static 'style.css' %}">
        <link rel="stylesheet" href="{% static 'bootstrap-5.0.0-beta1-dist/css/bootstrap.css' %}">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.js"></script>
        <title>Report App | {% block title %} {% endblock title %}</title>
    </head>
    <body>
        {% url 'sales' as sales_home %}
        <div class="ui secondary  menu">
            <a class="item"><img style="height:100px;width:100px;" src="{% static 'book.jpg' %}" alt=""></a>
            <a href="{{sales_home}}" class=" active item">Home</a>
        </div>
        <div class="container mb-3 mt-3">
            {% block content %}
            {% endblock content %}
        </div>
    </body>
</html>
```

When you visit `http://127.0.0.1:8000` you should get the following page:

![Sales Page](/engineering-education/representing-data-in-django-using-matplotlib/SalesPage.png)

### Creating the graphical representations.
Now, we are going to start building the graphical representations part of our web page.

Firstly, we need to install the `pandas` library to create data frames for the sales data.

The resulting data frame will be used for plotting with `matplotlib`.

Now, run `pip install pandas` to install it.

We are going to handle the plotting in the `utils.py` file, and it will be used in the `views.py` file as shown:

```python
import pandas
from django.shortcuts import render
from django.views.generic import ListView
from django.contrib import messages
from .forms import SalesSearchForm
from .models import *
# Create your views here.
from .utils import get_chart

def sales(request):
    sales_df = None
    chart = None
    no_data = None
    search_form = SalesSearchForm(request.POST or None)

    if request.method == 'POST':
        date_from = request.POST.get('date_from')
        date_to = request.POST.get('date_to')
        chart_type = request.POST.get('chart_type')
        results_by = request.POST.get('results_by')
        print(date_from, date_to, chart_type)
        sales_qs = Sale.objects.filter(created__date__lte=date_to, created__date__gte=date_from)
        
        if len(sales_qs) > 0:
            sales_df = pandas.DataFrame(sales_qs.values())
            print(sales_df)

            sales_df['created'] = sales_df['created'].apply(lambda x: x.strftime('%d/%m/%Y'))
            sales_df.rename({'customer_id': 'customer', 'salesman_id': 'salesman', 'id': 'sales_id'}, axis=1,
                            inplace=True)

            chart = get_chart(chart_type, sales_df, results_by)
            sales_df = sales_df.to_html()

        else:
            messages.warning(request, "Apparently no data available...")

    context = {
        'search_form': search_form,
        'sales_df': sales_df,
        'chart': chart,
    }
    return render(request, 'sales.html',  context)
```

- Firstly, the function checks if we have received a `POST` request. If so, then we have to initialize variables to get the `date_from`, `date_to`, `chart_type`, and the `results_by`.
- The value of chart type and result type will be `#1`, `#2` depending on the choice of the user.
- If a user chooses a pie chart, then the `chart_type` variable will be `#2`, as we had declared in our `forms.py` file.
- We then filter all sales that are in the range between `date_from` and `date_to`. If there are any sales, we create a data frame using the sales queryset values.
- We also reset the `created year` value to the format `d/m/Y`.
- We rename `customer_id` to `customer`, `salesman_id` to `salesman`, and `id` to `sales_id`.
- Then, we initialize the variable `chart` with the function `get_chart()` as defined in `utils.py`, which takes in the chart type, the sales data frame, and the results by values.
- Finally, we convert the sales data frame to HTML format, so that we will be able to display it on the web page by passing the data frame and the chart to the HTML page.

Let's now work with the `utils.py` file, as shown below:

```python
import uuid, base64
from .models import *
from io import BytesIO
from matplotlib import pyplot

def generate_code():
    return str(uuid.uuid4()).replace('-', '').upper()[:12]
def get_key(res_by):
    if res_by == '#1':
        key = 'transaction_id'
    elif res_by == '#2':
        key = 'created'
    elif res_by == '#3':
        key = 'customer'
    elif res_by == '#4':
        key = 'total_price'
    return key
def get_graph():
    buffer = BytesIO()
    pyplot.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode('utf-8')
    buffer.close()
    return graph
def get_chart(chart_type, data, results_by, **kwargs):
    pyplot.switch_backend('AGG')
    fig = pyplot.figure(figsize=(10, 4))
    key = get_key(results_by)
    d = data.groupby(key, as_index=False)['total_price'].agg('sum')
    if chart_type == '#1':
        print("Bar graph")
        pyplot.bar(d[key], d['total_price'])
    elif chart_type == '#2':
        print("Pie chart")
        pyplot.pie(data=d,x='total_price', labels=d[key])
    elif chart_type == '#3':
        print("Line graph")
        pyplot.plot(d[key], d['total_price'], color='gray', marker='o', linestyle='dashed')
    else:
        print("Apparently...chart_type not identified")
    pyplot.tight_layout()
    chart = get_graph()
    return chart
```

When the function `get_chart()` is called the following takes place:
1. The `pyplot.switch_backend('AGG')` prevents plotting on the screen. We want to pass our charts as images.
2. The `fig` variable defines the dimensions of the plotted chart.
3. The statement `key = get_key(results_by)` sets a key variable according to what a user chose. This corresponds to what was defined in `RESULTS CHOICES` in `forms.py`.
4. The fourth statement groups our data frame by the key using the sum of the total price.
5. The charts are then plotted according to the user's choice.
6. The statement ` pyplot.tight_layout()`adjusts the size of the chart to the size of `fig`
7. We lastly initialize a chart variable with `get_graph()` function and return it. The method begins by creating a buffer variable as a file object.
8. The charts are saved in the buffer as an image. The buffer content is encoded using `base64.b64encode()` function. The bytes are then decoded and returned. The buffer is discarded when the close() function is called.

We will now edit our `sales.html` file in order to see our dataframe and chart:

```html
{% extends 'base.html' %}
{% load static %}
{% load crispy_forms_tags %}

{% block title %}
Home
{% endblock title %}
{% block content %}
    {% for message in messages %}
        <div role="alert" class="alert alert-warning">
            {{message}}
        </div>
    {% endfor %}
    <form action="" method="post">
        {% csrf_token %}
        {{search_form|crispy}}
        <button class="btn btn-primary mt-3" type="submit">Search</button>
    </form>
    <hr>
    {% if sales_df %}
        <b>Sales Dataframe</b>
        {{sales_df|safe}}
        <hr>
        <hr>
        <b>Chart</b>
        <img src="data:image/png;base64, {{chart|safe}}" alt="" id="img">
    {% endif %}<br>
{% endblock content %}
```

If we have a sales data frame, we display it after the form. We use the `safe` filter to make the data frame more readable on our page.

The part `data:image/png;base64` is responsible for handling displaying the image of our chart. Without this, we cannot see the image.

When you fill the form, you should have something like this when you select `bar chart`.

`http://127.0.0.1:8000/`

![Bar Graph](/engineering-education/representing-data-in-django-using-matplotlib/bargraph.png)

When you select the pie chart:

![Pie Chart](/engineering-education/representing-data-in-django-using-matplotlib/piechart.png)

When you select line graph:

![Line Graph](/engineering-education/representing-data-in-django-using-matplotlib/linegraph.png)

### Conclusion
You have now successfully created a Django application that uses matplotlib to represent data.

You can find the full code [here](https://github.com/JohnKiguru/Working-with-matplotlib-and-Django).

### Further reading
- [Matplotlib documentation](https://matplotlib.org/)
- [Python IO documentation](https://docs.python.org/3/library/io.html#io.BytesIO)
- [Pandas documentation](https://pandas.pydata.org/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)