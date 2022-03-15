---
layout: engineering-education
status: publish
published: true
url: /custom-template-tags-and-filters-in-django/
title: Custom Template Tags and Filters in Django
description: In this article, we will look at how to create and use custom template tags and filters in Django.
author: john-kiguru
date: 2021-07-16T00:00:00-07:17
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/custom-template-tags-and-filters-in-django/hero.jpg
   alt: Django Filter Tag Example Image
---
In this tutorial, we will look at how to create custom template tags and filters in Django.

Django template language comes with built-in template tags such as `{% if %}` and filters such as `safe`. You may however find that you require functionality not included in Django by default. In this case, you create filters and tags using Python and avail them using the `load ` tag.

Let’s get started!

### Prerequisites
To follow along, you must have:
- The ability to create a simple Django application.
- Python and Django installed.
- A suitable IDE such as Pycharm, VS Code, etc.

### Goal
By the end of this tutorial, you will be able to:
- Understand the use of custom template tags and filters and how they work.
- Create your customized template tags and filters to suit your needs.

### Getting started
Your custom tags and filters must be within a Django app. If you want your tags and filters to be used across your entire project, you may create an app to accomplish that.

Follow the following steps to create the files needed for this tutorial.
1. Create an app called `Contacts` and add it to your `INSTALLED_APPS`. 
2. Inside your app, create a directory called `templatetags` at the same level as the views, models, etc.
3. Make the `templatetags` directory a Python package by creating an `__init__.py` file.
4. Create another file `custom_tags.py` to hold your custom tags and filters.

Your app structure will now look something similar to this:

```bash
.Contact
├── contact
│   ├── admin.py
│   ├── apps.py
│   |
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── templatetags
│   │  └── custom_tags.py
│   ├── tests.py
│   ├── url.py
│   └── views.py
├── Contact
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── db.sqlite3
└──  manage.py
```

You can create as many modules as you can inside the `templatetags` folder. You should, however, note that using the `{% load %}` tag will only work for a particular module, not the app.

For us to be able to load our custom template tags and filters, we need to create a `Library` instance to register them in the Django template. We will add the following lines of code to do that:

```python
from django import template
register = template.Library()
```

To load the tags and filters, we will do the following in our template:

```jinja
{% load custom_tags %}
```

### Writing custom filters
Filters are usually written either as `{{value|filter}}` or `{{value|filter:'arg'}}` . This means that the filter will or will not take an argument when acting on a value.

Consider a simple contacts list application showing contacts and when they were created.

The `models.py` looks as follows:

```python
from django.db import models

class Contact(models.Model):
    name = models.CharField(max_length=50)
    date = models.DateField()
```

The application looks as follows with just a little styling:

![Initial Contacts Page](/engineering-education/custom-template-tags-and-filters-in-django/initial_contacts_page.png)

Now let's create two simple filters that capitalize all strings in a given name, the first character of a word, and also sets a color.

We use `@register` to register our filter and give it a name in Django. Our function takes a name as its value.

To use our filter we use the line `{% load custom_tags %}` in our templates.

`template_tags/custom_tags.py`
```python
# create the register instance by initializing it with the Library instance.
from django import template

register = template.Library()

# An upper function that capitalizes word passed to it. We then register the filter using a suitable name.
@register.filter(name='upper')
def upper(value):
  return value.upper()
  
# An upper function that capitalizes the first letter of the word passed to it. We then register the filter using a suitable name.
@register.filter(name='modify_name')
def modify_name(value):
    return value.title()

# An upper function that sets returns a red color. We then register the filter using a suitable name.
@register.filter(name='get_color')
def color(value):
    if value:
        return "#FF0000"
```

`contact.html`
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

![Contact page with the filters](/engineering-education/custom-template-tags-and-filters-in-django/contact_page_with_filters.png)

The `upper ` filter capitalizes the contact name while the `get_color ` filter sets a new color to the div.

Likewise, you can create your custom filters to cater to whatever needs you may have for your templates.

You should check the names assigned to your views. They should match those used with `@register.filter()`. For instance, using `color` instead of `get_color` would result in an error. You may also have to consider the auto-escaping behavior of Django with the filter. You may look at the [Django documentation](https://docs.djangoproject.com/en/3.2/howto/custom-template-tags/) to learn more.

### Writing custom template tags
Template tags are more advanced than filters. They are powerful in that they can process any data and made it available to any template regardless of the view being executed. Django provides two commonly used helper functions to create tags:
1. Simple tags.
2. Inclusive tags.

We are going to implement these tags in our `custom_tags.py` file.

#### Simple tags
These tags take any number of arguments and return a result after some processing. The simple tag is a function that takes one or more arguments, wraps it in a render function, and registers it with the template system.

We are going to do two examples of simple tags. Our first simple tag will count the number of contacts we have. The second function will get the current date in `d/m/y` format.

The code in `custom_tags.py` is as follows:

```python
import datetime

# Create the register instance by initializing it with the Library instance.
from Django import template
register = template.Library()

# An upper function that capitalizes word passed to it.
@register.filter(name='upper')
def upper(value):
  return value.upper()

# An upper function that capitalizes the first letter of the word passed to it.
@register.filter(name='modify_name')
def modify_name(value):
    return value.title()

# An upper function that sets returns a red color.
@register.filter(name='get_color')
def color(value):
    if value:
        return "#FF0000"

# A function that sets returns the number of contacts.
@register.simple_tag(name='my_contacts')
def my_contacts():
    return Contact.objects.all().count()

# A function that sets returns the current date.
@register.simple_tag(name='current_date')
def current_date(format):
    return datetime.datetime.now().strftime(format)
```

Change the HTML to this:

```jinja

 <!-- Loading the custom_tags file to avail our tags and filters -->
{% load custom_tags %}

{% block content %}
<!-- Using the my_contacts simple tag -->
<h3>You have {% my_contacts %} contacts</h3>

{% for contact in contacts %}
<div class="flex-box-container">
  <!--Using the get_color and upper filters to change color and capitalize the contact name respectively -->
    <div style="background-color: {{contact.name|get_color}};"><p >{{contact.name|upper}}</p></div>
    <!-- Using the current_date simple tag -->
    <div><b>Created:</b>  {% current_date "%d/%m/%Y" %} </div>
</div>
{% endfor %}

{% endblock content %}
```

The resulting template would look as shown below:

![Contact page with the filters and simple tags](/engineering-education/custom-template-tags-and-filters-in-django/contact_page_with_simple_tags.png)

Likewise, you can create your simple tags and use them how you deem fit.

#### Inclusion tags
These tags work by rendering another template and are essential when working with information that is to be found on several pages.

Let’s create a simple inclusion tag that counts the number of users.

Create a `users.html` file that will be rendered by the inclusion tag.

In your `custom_tags.py` file, edit and append as the following:

```python
from django.contrib.auth.models import User
#  Create show_users inclusion tag that will return all users and register it and indicate that it's going to render a users.html view.

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

Then make `contact.html` looks like this:

```jinja
 <!-- Loading the custom_tags file to avail our tags and filters -->
{% load custom_tags %}


{% block content %}
<-- Using the my_contacts simple tag -->
<h3>You have {% my_contacts %} contacts</h3>

{% for contact in contacts %}
<div class="flex-box-container">
  <!--Using the get_color and upper filters to change color and capitalize the contact name respectively-->
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

![Contact page with filters and the tags](/engineering-education/custom-template-tags-and-filters-in-django/contact_page_with_inclusion_tags.png)

Notice that by adding `show_users` tag, we now have a user added below the contacts.

### Conclusion
You have now successfully created your custom template tags and filters. You should now be able to create new template tags and filters and apply them anywhere they are needed in your Django application.

I also recommend looking through the [Django documentation](https://docs.djangoproject.com/en/3.2/howto/custom-template-tags/)  to have a clear understanding of how tags and filters work.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)