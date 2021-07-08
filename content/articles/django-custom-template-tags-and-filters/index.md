
### Introduction.
We are going to cover how to create Django custom template tags and filters.Django template language comes with built-in template tags such as `{% if %}` and filters such as `safe`.You may however find that  you require a functionality not included in Django.You create them using Python and avail them using the `load ` tag.Let’s get started! 
###  Prerequisites.
For you  to follow along its important that:
1. You are able to create a simple Django application
2. You have Python and Django installed.
3. An suitable IDE such as Pycharm, VS Code etc.
### Takeaways.
By the end of this tutorial, you will be able to:
1. Understand  use of custom template tags and filters and how they work.
2. Create your own customized template tags and filters to suit your needs.
### Getting started.
Your custom tags and filters must be within a Django app. If you wish that your tags and filters be used across your entire project, you may create an app just to accomplish that.

- Create an app called Contacts and add it in your INSTALLED_APPS.Inside your app , create a directory called templatetags in the same level as views,  models etc.
- Make the templatetags directory a package in Python by creating an `__init__.py` file.Create another file custom_tags.py or any other name that will hold your custom tags
and filters.

Your app structure will now look something similar to this:
```Python
.Contact
├── contact
│   ├── admin.py
│   ├── apps.py
│   
│   ├── migrations
│   │   └──  __init__.py
│   │  
│   │       
│   ├── models.py
│   
│   ├── templatetags
│   │  └──  custom_tags.py
│   │
│   ├── tests.py
│   ├── url.py
│   └── views.py
├── Contact
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
└──  manage.py

```
You can create as many modules as you can inside the templatetags folder. You should, however, note that using `{% load %}` tag will work for a particular module name, not the app name. 
```Python
from Django import template
register = template.Library()
```

To load the tags and filters, we will do the following in our template:
```html
{% load custom_tags %}
```

### Writing Custom Filters.
Filters are usually written either as `{{value|filter}}` or `{{value|filter:'arg'}}` . This means that the filter will or will not take a argument when acting on a value.

Consider a simple Contacts list application showing a contact and when they were created.The model.py looks as follows:
```Python
from Django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField()
```
The application looks as follows with just a  little of styling...

![Contact App](/engineering-education/Django-custom-template-tags-and-filters/image1.png)

Now let's create two simple filters that capitalizes all strings in a given name, 
capitalizes the first character of a word and  also sets a color.
We use `@register` to register our filter with Django and give it a name.Our function takes name as value.
To use our filter we use the line `{% load custom_tags %}` in our template

template_tags/custom_tags.py
```Python
from Django import template

register = template.Library()

@register.filter(name='upper')
def upper(value):
  return value.upper()

@register.filter(name='modify_name')
def modify_name(value):
    return value.title()

@register.filter(name='get_color')
def color(value):
    if value:
        return "#FF0000"
```
contact.html
```html
{% load custom_tags %}


{% block content %}

{% for contact in contacts %}
<div class="flex-box-container">
    <div style="background-color: {{contact.name|get_color}};"><p >{{contact.name|upper}}</p></div>
    <div><b>Created:</b> {{ contact.date }}</div>
</div>
{% endfor %}

{% endblock content %}

```
The resulting view will look as follows

![Contact App](/engineering-education/Django-custom-template-tags-and-filters/image2.png)

The `upper ` function capitalizes the contact name while the `get_color ` filter sets a new color to the div.
Likewise, you can create your own custom filters to cater for whatever needs you may have for your templates.
You should consider the names supplied to your views.They should match those used with `@register.filter`.For instance, using `color` instead of `get_color` would result to an error.You may also have to consider the auto-escaping behaviour of Django with the filter.You may look up on Django Documentation to learn more.
### Writing Custom Template tags.
Template tags are more advanced than filters.They are powerful in that they can process any data and made available to any template regardless of view being executed.Django provides two commonly used helper functions to create tags
1. Simple tags
2. Inclusive tags

We are going to implement them in our `custom_tags.py` file.
### Simple Tags.
These tags take any number of arguments and return a result after some processing.The simple tag takes a function that takes one or more arguments, wraps it in a render function and registers it with the template system.
We are going to do two examples on the simple tags.Our first simple tag will count the number of contacts we have.The second function gets the current in d/m/y format.The code in custom_tags.py is as follows:
```Python
from Django import template
import datetime
from contact.models import Contact

register = template.Library()


@register.filter(name='upper')
def upper(value):
  return value.upper()
@register.filter(name='modify_name')
def modify_name(value):
    return value.title()
@register.filter(name='get_color')
def color(value):
    if value:
        return "#FF0000"
    
@register.simple_tag(name='my_contacts')
def my_contacts():
    return Contact.objects.all().count()
@register.simple_tag(name='current_date')
def current_date(format):
    return datetime.datetime.now().strftime(format)
```
Change the html to this:
```html
{% load custom_tags %}
{% block content %}
<h3>You have {% my_contacts %} contacts</h3>
{% for contact in contacts %}
<div class="flex-box-container">
    <div style='background-color: {{contact.name|get_color}};'><p >{{contact.name|upper}}</p></div>
    <div><b>Created:</b>  {% current_date "%d/%m/%Y" %} </div>
</div>
{% endfor %}

{% endblock content %}
```
The resulting template would look as follows:

![Contact App](/engineering-education/Django-custom-template-tags-and-filters/image3.png)

Likewise, you can create your own simple tags and use them how you deem fit.
### Inclusion Tags. 
This tag works by rendering another template and is essential when working with information that is to be found  in several pages.

Let’s create a simple inclusion that counts the number of users.
We would need to create a `users.html` file that will be rendered by the inclusion tag.
In your `custom_tags.py` file, edit and append the following:
```Python
from Django.contrib.auth.models import User
@register.inclusion_tag('users.html')
def show_users():
      obj = User.objects.values_list('username', flat=True)
      return {'users': obj}
```
Then create the `users.html` as follows:
```html
<ul>
{% for user in users %}
    <li> {{ user }} </li>
{% endfor %}
</ul>
```
Then make the contact.html look like this:
```html
{% comment %} users.html {% endcomment %}
{% load custom_tags %}


{% block content %}
<h3>You have {% my_contacts %} contacts</h3>
{% for contact in contacts %}
<div class="flex-box-container">
    <div style='background-color: {{contact.name|get_color}};'><p >{{contact.name|upper}}</p></div>
    <div><b>Created:</b>  {% current_date "%d/%m/%Y" %} </div>
</div>
{% endfor %}
{% show_users %}
{% endblock content %}

```
The resulting template will now look as follows:

![Contact App](/engineering-education/Django-custom-template-tags-and-filters/image4.png)

Notice that by adding `show_users` tag, we now have a user added below the contacts.

### Conclusion.
You have now successfully created your custom template tags and filters.You should now be able to create new template tags and filters and apply anywhere you want in your Django application.I also recommend having a thorough look at Django documentation and have a clear understanding of how they work.

You will find the Django documentation [here](https://docs.djangoproject.com/en/3.2/)
