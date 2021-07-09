### Introduction
In this tutorial, we are going to look at how to create custom template tags and filters in Django.

Django template language comes with built-in template tags such as `{% if %}` and filters such as `safe`. You may however find that you require a functionality not included in Django by default. In this case, you create them using Python and avail them using the `load ` tag.

Let’s get started!

###  Prerequisites
To follow along it's important that you have:
1. The ablility to create a simple Django application
2. Python and Django installed.
3. A suitable IDE such as Pycharm, VS Code etc.

### Takeaways
By the end of this tutorial, you will be able to:
1. Understand the use of custom template tags and filters and how they work.
2. Create your own customized template tags and filters to suit your needs.

### Getting Started.
Your custom tags and filters must be within a Django app. If you want your tags and filters to be used across your entire project, you may create an app just to accomplish that.

1. Create an app called `Contacts` and add it in your `INSTALLED_APPS`. Inside your app , create a directory called `templatetags` in the same level as the views, models etc.
2. Make the `templatetags` directory a Python package by creating an `__init__.py` file. Create another file `custom_tags.py` to hold your custom tags and filters.

Your app structure will now look something similar to this:

```python
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

You can create as many modules as you can inside the `templatetags` folder. You should, however, note that using the `{% load %}` tag will only work for a particular module name, not the app name.

For us to be able to load our custom template tags and filters, we need to create an instance of Library instance in order to register them in the Django Template.We will add the following lines of code to do that.
```python
from Django import template
register = template.Library()
```

To load the tags and filters, we will do the following in our template:

```jinja
{% load custom_tags %}
```

### Writing Custom Filters
Filters are usually written either as `{{value|filter}}` or `{{value|filter:'arg'}}` . This means that the filter will or will not take a argument when acting on a value.

Consider a simple contacts list application showing a contact and when they were created.

The `models.py` looks as follows:

```Python
from Django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField()
```

The application looks as follows with just a little of styling...

![Initial Contacts Page](/engineering-education/Django-custom-template-tags-and-filters/initial_contacts_page.png)

Now let's create two simple filters that capitalize all strings in a given name, the first character of a word and also sets a color.

We use `@register` to register our filter and give it a name in Django. Our function takes a name as it's value.

To use our filter we use the line `{% load custom_tags %}` in our templates.

template_tags/custom_tags.py

```python
#We create the register instance by initialising it with the Library instance from the earlier step.
from Django import template

register = template.Library()

#We create an upper function that capitalizes word passed to it.We then register the filter using a suitable name
@register.filter(name='upper')
def upper(value):
  return value.upper()
  
#We create an upper function that capitalizes the first letter of the word passed to it.We then register the filter using a suitable name
@register.filter(name='modify_name')
def modify_name(value):
    return value.title()
#We create an upper function that sets returns a red color.We then register the filter using a suitable name
@register.filter(name='get_color')
def color(value):
    if value:
        return "#FF0000"
```

contact.html

```jinja
 <!-- Loading the custom_tags file to avail our tags and filters -->
{% load custom_tags %}


{% block content %}

{% for contact in contacts %}
<div class="flex-box-container">
  <!-- We now use the get_color and upper filters to change color and capitalize the contact name respectively -->
    <div style="background-color: {{contact.name|get_color}};"><p >{{contact.name|upper}}</p></div>
    <div><b>Created:</b> {{ contact.date }}</div>
</div>
{% endfor %}

{% endblock content %}
```

The resulting view will look as shown below:

![Contact page with the filters](/engineering-education/Django-custom-template-tags-and-filters/contact_page_with_filters.png)

The `upper ` filter capitalizes the contact name while the `get_color ` filter sets a new color to the div.

Likewise, you can create your own custom filters to cater for whatever needs you may have for your templates.

You should consider the names supplied to your views. They should match those used with `@register.filter()`. For instance, using `color` instead of `get_color` would result to an error. You may also have to consider the auto-escaping behaviour of Django with the filter. You may look up on[Django documentation](https://docs.djangoproject.com/en/3.2/howto/custom-template-tags/) to learn more.

### Writing Custom Template Tags
Template tags are more advanced than filters. They are powerful in that they can process any data and made available to any template regardless of view being executed. Django provides two commonly used helper functions to create tags.

1. Simple tags
2. Inclusive tags

We are going to implement them in our `custom_tags.py` file.

### Simple tags
These tags take any number of arguments and return a result after some processing. The simple tag is a function that takes one or more arguments, wraps it in a render function and registers it with the template system.

We are going to do two examples on the simple tags. Our first simple tag will count the number of contacts we have. The second function will get the current date in `d/m/y` format.

The code in `custom_tags.py` is as follows:

```python
import datetime
#We create the register instance by initialising it with the Library instance from the earlier step.
from Django import template

register = template.Library()

#We create an upper function that capitalizes word passed to it.We then register the filter using a suitable name
@register.filter(name='upper')
def upper(value):
  return value.upper()
  
#We create an upper function that capitalizes the first letter of the word passed to it.We then register the filter using a suitable name
@register.filter(name='modify_name')
def modify_name(value):
    return value.title()
#We create an upper function that sets returns a red color.We then register the filter using a suitable name
@register.filter(name='get_color')
def color(value):
    if value:
        return "#FF0000"
 


#We create a my_contacts function that sets returns the number of contacts we have.We then register the filter using a suitable name
@register.simple_tag(name='my_contacts')
def my_contacts():
    return Contact.objects.all().count()

#We create a current_date function that sets returns the current date.We then register the filter using a suitable name
@register.simple_tag(name='current_date')
def current_date(format):
    return datetime.datetime.now().strftime(format)
```

Change the html to this:

```jinja

 <!-- Loading the custom_tags file to avail our tags and filters -->
{% load custom_tags %}


{% block content %}
<!-- Using the my_contacts simple tag -->
<h3>You have {% my_contacts %} contacts</h3>

{% for contact in contacts %}
<div class="flex-box-container">
  <!--We now use the get_color and upper filters to change color and capitalize the contact name respectively -->
    <div style="background-color: {{contact.name|get_color}};"><p >{{contact.name|upper}}</p></div>
    <!-- Using the current_date simple tag -->
    <div><b>Created:</b>  {% current_date "%d/%m/%Y" %} </div>
</div>
{% endfor %}

{% endblock content %}
```

The resulting template would look as shown below:

![Contact page with the filters and simple tags](/engineering-education/Django-custom-template-tags-and-filters/contact_page_with_simple_tags.png)

Likewise, you can create your own simple tags and use them how you deem fit.

### Inclusion Tags. 
This tags work by rendering another template and are essential when working with information that is to be found in several pages.

Let’s create a simple inclusion tag that counts the number of users.

Create a `users.html` file that will be rendered by the inclusion tag. In your `custom_tags.py` file, edit and append the following:

```python
from Django.contrib.auth.models import User
#we create show_users inclusion tag that will return all users and register it using and indicate its going to render a users.html view.
@register.inclusion_tag('users.html')
def show_users():
      obj = User.objects.values_list('username', flat=True)
      return {'users': obj}
```

The template file `users.html` will look as shown below:
```jinja
<ul>
{% for user in users %}
    <li> {{ user }} </li>
{% endfor %}
</ul>
```

Then make `contact.html` look like this:

```jinja
 <!-- Loading the custom_tags file to avail our tags and filters -->
{% load custom_tags %}


{% block content %}
<-- Using the my_contacts simple tag -->
<h3>You have {% my_contacts %} contacts</h3>

{% for contact in contacts %}
<div class="flex-box-container">
  <!--We now use the get_color and upper filters to change color and capitalize the contact name respectively-->
    <div style="background-color: {{contact.name|get_color}};"><p >{{contact.name|upper}}</p></div>
    <!-- Using the current_date simple tag -->
    <div><b>Created:</b>  {% current_date "%d/%m/%Y" %} </div>
</div>
{% endfor %}
<!--using the show_users inclusion tag -->
{% show_users %}
{% endblock content %}

```

The resulting template will now look as shown below:

![Contact page with filters and the tags](/engineering-education/Django-custom-template-tags-and-filters/contact_page_with_inclusion_tags.png)

Notice that by adding `show_users` tag, we now have a user added below the contacts.

### Conclusion
You have now successfully created your custom template tags and filters.You should now be able to create new template tags and filters and apply them anywhere they are needed in your Django application.

I also recommend look through the [Django documentation](https://docs.djangoproject.com/en/3.2/howto/custom-template-tags/)  to have a clear understanding of how tags and filters work.
