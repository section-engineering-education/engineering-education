### Representing data in  Django using matplotlib

### Introduction

When building applications  using Django, you may find that you need to represent some or all of your application's data using graphs and charts. Matplotlib is one of the popular python libraries
that you can use to achieve this goal. In this article, we are going to create a simple Django application that uses matplotlib to represent data.

### Prerequisites
For you to follow along, it is important that:

1. You have `Django` installed and you are familiar with creating a simple Django application.
2. You have installed `matplotlib`  which we are going to use during representation of data in our application.
3. Basic knowledge of python is a very important.

### Takeaways
1. Learn how to create a Django application.
2. Learn how to use `matplotlib` to represent data in your Django application.
3. Improve your python skills.

### Getting started
We are going to create a simple sales application that holds information on customers, products, salesperson and the sales. To create the project, cd into your preferred folder and run 
`bash
django-admin startproject SALES
`
This will create the project with the starting files and your folder structure should look as follows:


```buildoutcfg
.
├── db.sqlite3
├── manage.py
├── SALES
│   ├── asgi.py
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── static
│   ├── book.jpg
│   ├── bootstrap-5.0.0-beta1-dist
│   │   ├── css
│   │   │   ├── bootstrap.css
│   │   │   ├── bootstrap.css.map
│   │   │   ├── bootstrap-grid.css
│   ├── style.css

```
We will then create an app called `sales` that we will be working on. Run `python3 manage.py startapp sales`. We will need to edit our `settings.py` file in order to register our app
and configure static files in order to have some styling for our application. Edit the file as follows:

`SALES/settings.py`
```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'sales',
    'crispy_forms'
]
CRISPY_TEMPLATE_PACK = 'bootstrap4'



STATIC_URL = '/static/'
STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
```

With those done, we have registered our app and added `django-crispy-forms` to style our forms. We have also declared that static files will be handled in the `static` folder. We will also store all uploaded media files in a file called `media`. To route the settings for files, we need to  edit the `urls.py` file as follows:

`SALES/urls.py`
```python
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
   
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
### Working with the sales app

We are now going to create some model classes that we are going to manipulate later. Edit the `models.py` as follows:

`sales/models.py`
```python
from django.contrib.auth.models import User
from django.db import models

# Create your models here.
from django.utils import timezone

from sales.utils import generate_code


class Product(models.Model):
    name = models.CharField(max_length=120)
    image = models.ImageField(upload_to='products')
    price = models.FloatField(help_text='in Kenyan Shillings')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.created.strftime('%d/%m/%Y')}"
class Customer(models.Model):
    name = models.CharField(max_length=120)
    logo = models.ImageField(upload_to='customers')

    def __str__(self):
        return self.name
class SalesPerson(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(default='No bio yet...')
    avatar = models.ImageField(upload_to='avatars')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Salesperson {self.user.username}"

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
We are going to represent our data using the `Sale` class.We have overridden the `save` method such that if the transaction_id is null, one will be generated automatically.
We have also declared if the created time is not defined then the time will be set to the current time. We need to create the `generate_code` function. Let's create a `utils.py` file and add the following lines of code:

`sales/utils.py`
```python

import uuid

def generate_code():
    return str(uuid.uuid4()).replace('-', '').upper()[:12]
```
The result of that function is a random code consisting of 12 alphanumeric characters in uppercase.

Let's register our models to the admin site. In your `admin.py` file, add these lines of code:

`sales/admin.py`
```python
from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Sale)
admin.site.register(SalesPerson)
```
Create a superuser by running `python3 manage.py createsuperuser`. When you log in to `http://127.0.0.1:8000/admin` you should be able to create different sales.
Notice that even when you leave the `transaction_id` blank, it is generated for you.Take your time to create different sales for different times.

### Working with our data
Now that you have been able to add data to our database, let's now work on representing it in our application. We will begin by creating a search form that will allow a user to search for particular data
by filtering the dates, transaction, customer id and total price. Let's create a `forms.py` file to define our form. Add these lines of code to it:

`sales/forms.py`
```python

from django import forms

CHART_CHOICES = (
    ('#1', 'Bar Chart'),
    ('#2', 'Pie Chart'),
    ('#3', 'Line Chart')
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
The form will allow the user to choose a date and select chart type and results according to `CHART_CHOICES` and `RESULTS_CHOICES`
given in the file. We are going to create some views to render data to a web page.

Views are python functions that handle web requests and return web responses. There are different ways to create the views, we will use function-based views.In our `views.py` file, let's edit it as follows:

`sales/views.py`
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
def sales_list(request):
    object_list = Sale.objects.all()
    return render(request, 'saleslist.html', {'object_list':object_list})

```
The `sales` function will render the search form to the html file while the `sales_list` function will render all our sales to the html file defined above

### Creating our templates
We need to create our html files first. Let's begin by changing our settings on template configuration. Edit the `settings.py` to the following:

`SALES/settings.py`
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
This setting will tell Django to look for our html files from a folder called `templates`.
Create a folder called `templates` in the same level as `manage.py` e.t.c and create four new html files. The templates folder should look as follows:

`SALES/templates`
```buildoutcfg
└── templates
    ├── base.html
    ├── navbar.html
    ├── sales.html
    └── saleslist.html

```
Edit `navbar.html` to look like this:

`templates/navbar.html`
```jinja
{% load static %}


<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a href="#" class="navbar-brand"><img style="height:100px;width:100px;" src="{% static 'book.jpg' %}" alt=""
                                              class="logo-sm"></a>
        <div id="navbarNav" class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a href="#" >Sales</a>
                </li>


            </ul>
        </div>

    </div>
</nav>
```
This file will be used to set up links across our application. We will have two links `Home` and `Sales`
to navigate between our data representation page and sales list page. We will configure routing a little bit later.

Edit the `base.html` as follows:

`templates/base.html`
```jinja
<!DOCTYPE html>
{% load static %}
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="{% static 'style.css' %}">
    <link rel="stylesheet" href="{% static 'bootstrap-5.0.0-beta1-dist/css/bootstrap.css' %}">



    {% block scripts %}
    {% endblock scripts %}
    <title>Report App | {% block title %} {% endblock title %}</title>
</head>
<body>
{% include 'navbar.html' %}
<div class="container mb-3 mt-3">
    {% block content %}
    {% endblock content %}
</div>

</body>
</html>
```
This is the basic html file that is used by other files. All common styling are defined here. The file is used to avoid 
rewriting the same lines of code across many files. Any other file that needs it will only need to have
`{% extends 'base.html' %}` in order to borrow its styling.

The `sales.html` file should be similar to this:

`templates/sales.html`
```jinja
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
<hr>



{% endblock content %}

```
This file allows us to display our search form in the file. The user can fill the form and submit using the 
`Search` button.Later we will add our data representations here.

Finally the `saleslist.html` file should look as follows:

`templates/saleslist.html`
```jinja
{% extends 'base.html' %}

{% block title %}
Sales List
{% endblock title %}
{% block content %}
{% for obj in object_list %}
<div class="card mb-3">
    <a  class="card-body"> {{obj.transaction_id}}</a>
</div>
{% endfor %}
{% endblock content %}
```
This file will list our sales in a card-body using transaction_id. You should be able to see all transaction_ids when you visit the page.

### Routing views
In order to see our views in action, we will need to configure routing. Let's create a `urls.py` file that will handle routing to our function and class.The mappings above imply that the requests will first be handled by this file and then routed to a corresponding view function and class.
Add the following lines of code to it:

`sales/urls.py`
```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.sales, name='sales'),
    path('saleslist', views.SalesListView.as_view(), name='saleslist')
]
```
Let's handle routing for our `sales` app. In `SALES/urls.py` edit it to look  like this:

```python

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('sales.urls'))
]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```
Let's also edit `navbar.html` to be able to access the different  views. Edit it as follows:

`navbar.html`
```jinja
{% load static %}
{% url 'sales' as sales_home %}
{% url 'saleslist' as sales_list %}

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a href="#" class="navbar-brand"><img style="height:100px;width:100px;" src="{% static 'book.jpg' %}" alt=""
                                              class="logo-sm"></a>
        <div id="navbarNav" class="collapse navbar-collapse">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="{{sales_home}}" class=" {% if request.path == sales_home %} active {% endif %} nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="{{sales_list}}" class="{% if request.path == sales_list %} active {% endif %} nav-link">Sales</a>
                </li>


            </ul>
        </div>

    </div>
</nav>
```
When you visit `http://127.0.0.1:8000` you should have something a page with our search form  similar to this:

![Sales Page](/engineering-education/content/articles/Representing data in Django using matplotlib/Sales_Page.png)

When you click on the `Sales` link, you should have the sales listed in transaction_ids as follows:

![SalesList Page](/engineering-education/content/articles/Representing data in Django using matplotlib/SalesList_Page.png)

### Creating the graphical representations.
We are now going to get our graphical representations on our web page. First, we are going to need to install the `pandas` library to create dataframes of our sales.
The resulting dataframe is what we will use during plotting with `matplotlib`. Just run `pip install pandas` to install it.
We are going to handle the plotting in our `utils.py` file. The functionality will be used in our `views.py` file. Edit the `views.py` file to the 
following.

`sales/views.py`
```python
import pandas
from django.shortcuts import render
from django.views.generic import ListView

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
            no_data = "Apparently...no data available"

    context = {
        'search_form': search_form,
        'sales_df': sales_df,
        'chart': chart,
        'no_data': no_data
    }
    return render(request, 'sales.html',  context)
def sales_list(request):
    object_list = Sale.objects.all()
    return render(request, 'saleslist.html', {'object_list':object_list})

```
The function first checks if there is a POST request to our application.If there is, we initialize variables to get the date from, 
date to, chart type and the results type.The value of chart type and result type will be `#1`, `#2`
e.t.c depending on the choice of the user.If a user chooses a pie chart , then the `chart_type` variable will be `#2` as we declared in our `forms.py` file.
We then filter all sales that are in the range between `date_from` and `date_to`.If there are any sales, we create a dataframe using the sales queryset values.
We also reset the created year value to the format `d/m/Y`. We also renamed `customer_id` to `customer`, `salesman_id` to `salesman` and `id` to `sales_id`.
We then initialize the variable `chart` with the function `get_chart` defined in `utils.py` that takes the chart type , our sales dataframe and results by vlaues.
We have finally set our sales dataframe to a html format so that we will be able to display it on the web page.We pass the dataframe and the chart to our html page.

Let's now work with the `utils.py` file.Edit it to the following:

`sales/utils.py`
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
When the `get_chart` is called the following takes place:
1. The `pyplot.switch_backend('AGG')` prevents plotting on the screen. We want to pass our charts as images.
2. The `fig` variable defines the dimensions of our plotted chart.
3. The statement `key = get_key(results_by)` sets a key variable according to what a user chose.This corresponds to what was defined in `RESULTS CHOICES` in `forms.py`.
4. The fourth statement groups our dataframe by the key using the sum of the total price.
5. The charts are then plotted according to user choices. If a user chose a bar graph, that is what will be plotted.
6. The statement ` pyplot.tight_layout()`adjusts the size of the chart to the size of `fig`
7. We lastly initialize a chart variable with `get_graph` function and return it. The function begins by creating a buffer variable which is a file like object.
   Our charts are saved in the buffer as a image in the png format.The buffer content is encoded using base64.b64encode() function. The bytes are then decoded and returned.
   The buffer is discarded when the close() function is called.

We will now edit our `sales.html` file in order to see our dataframe and chart. Make it look similar to this:

`templates/sales.html`
```jinja
{% extends 'base.html' %}
{% load static %}
{% load crispy_forms_tags %}

{% block title %}
Home
{% endblock title %}
{% block content %}

{% if no_data %}
<div role="alert" class="alert alert-warning">
    {{no_data}}
</div>
{% endif %}
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
If we have a sales dataframe, we display it after the form. We use the `safe` filter to make our dataframe
more readable in our page. The part `data:image/png;base64` is responsible for handling displaying the image of our chart. Without it we cannot see our image.

When you fill the form you should have something like this when you select bar chart.

`http://127.0.0.1:8000/`
![Bar Graph](/engineering-education/content/articles/Representing data in Django using matplotlib/Bar_chart.png)

When you select pie chart:

![Pie Chart](/engineering-education/content/articles/Representing data in Django using matplotlib/Pie_graph.png)

When you select line graph:

![Line Graph](/engineering-education/content/articles/Representing data in Django using matplotlib/Line_chart.png)

### Conclusion
You have now successfully created a Django application that uses matplotlib to represent data. You can create similar applications
to suit your needs. The following links will be helpful incase you want to learn more:

1. [Matplotlib Documentation](https://matplotlib.org/)
2. [Python's io documetation](https://docs.python.org/3/library/io.html#io.BytesIO)
3. [Pandas Documetation](https://pandas.pydata.org/)
