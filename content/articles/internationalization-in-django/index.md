---
layout: engineering-education
status: publish
published: true
url: /internationalization-in-django/
title: Internalization in Django
description: This article shows how to utilize i18n to reduce language barriers in web applications. Internationalization, abbreviated as i18n, involves making a software application translatable to have a broader audience in the international market.
author: ifenna-okoye
date: 2021-01-15T00:00:00-11:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/internationalization-in-django/hero.jpg
    alt: Internalization in Django example image
---
Django is one of the most popular web frameworks known for its battery-inclusion. One of the inbuilt features of Django is internationalization (popularly referred to as i18n). This article shows how to utilize i18n to reduce language barriers in web applications by offering their content in languages tailored to the audience.
<!--more-->
### Table of content
- [Internalization in Django](#internalization-in-django)
  - [Table of Content](#table-of-content)
    - [What is internationalization and why it is needed](#what-is-internationalization-and-why-it-is-needed)
    - [Translation strings and message files](#translation-strings-and-message-files)
    - [Language file creation](#language-file-creation)
    - [Pluralization](#pluralization)
    - [Using Translations in Template](#using-translations-in-template)
    - [Summary](#summary)
    - [References](#references)

### What is internationalization and why it is needed
Internationalization, abbreviated as i18n, involves making a software application translatable to have a broader audience in the international market.

The internet's borderlessness binds different individuals speaking different languages to come across your web application.

Considering language being a significant barrier in software adoptions, the introduction of i18n in web frameworks helps translators perform translations for varied languages.

Why should developers care?  
When one intends to scale their applications beyond the immediate environment, the need for internationalization arises.

Django supports text translation. 

According to the Django official documentation:
> Essentially, Django does two things:  
>
> - It allows developers and template authors to specify which parts of their apps should be translated or formatted for local languages and cultures.
> - It uses these hooks to localize Web apps for particular users according to their preferences.

Developers implement internationalization since it involves preparing the software for localization -- or the target audience.

### Translation strings and message files
I18n involves translating from one language to another. We need to know which information (dynamic and static data) will be translated. One may choose to translate a fraction of a software application, whereas another can choose to translate the whole application.

The selected information translated to the end user's language is referred to as "translation strings."

The message file is a file that contains these translation strings and their equivalent end-user target language.
Translators fill message files with translations for the target language.

### Language file creation
Let's create a Django project titled **transy**.

```bash
>> django-admin startproject transy
>> cd transy
```

We create an app named **simple**.

```bash
>> python manage.py startapp simple
```

Add it to `INSTALLED_APPS` in **settings.py**.

```python
...
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'simple', # new
]
...
```

Setup URLs in **transy/urls.py** and **simple/urls.py**.

```python
# in transy/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('simple.urls')),
]
```

In **simple/views.py**:

```python
from django.views.generic import TemplateView
from django.http import HttpResponse

def user_dashboard(request, count):
    statistics =  {
        'transactions_today': 4,
        'account_balance': 5439
    }
    return HttpResponse(statistics)

class HomePageView(TemplateView):
    template_name = 'home.html'
```

In **simple/urls.py**:

```python
from django.urls import path

import users.views as views

urlpatterns = [
    path('', views.user_dashboard),
    path('home/', views.HomePageView.as_view(), name='home'),
    path('about/', views.about)]
```

To specify texts in your web application that you will like to make translatable, we use the **gettext()** function in the views.py file, for example:

```python
from django.http import HttpResponse
from django.utils.translation import gettext

def about(request, count):
    page = gettext('Welcome to Section.io blog, a home to so many wonderful articles.')
    return HttpResponse(page)
```

To use gettext() on Windows, you will need to download the executable file from [here](https://mlocati.github.io/articles/gettext-iconv-windows.html)

Django comes with the `django-admin makemessages` command, which creates and updates the message files by pulling out all strings marked for translation. Run the command to create a message file for our simple app:

If you execute `django-admin makemessages --all` and run into CommandError like below, make sure you have the gettext binary file installed. `de` and `fr` are the language codes for German and French, respectively.

```bash
>> django-admin makemessages -l de   
```

Error:

```bash
CommandError: Cannot find msguniq. Make sure you have GNU gettext tools 0.15 or newer installed
```

This command is used when creating message files is in this format `django-admin makemessages -l <LANGUAGE_CODE>`. If you would like to find out the available language codes in Django, check out [this list](https://github.com/django/django/blob/bebd4cfa8f5e0d2dff2de5e50d86e849a40f4bb2/django/conf/global_settings.py#L51)

```bash
>> django-admin makemessages -l fr
```

You will run into a CommandError like the one below:

```bash
>> django-admin makemessages -l fr  
CommandError: Unable to find a locale path to store translations for file simple/__init__.py
```

This is because Django is looking for a folder named *" locale"*. By default, the script `django-admin makemessages -l fr` is expected to run from one of these two places:

1. The base folder of the Django project itself.
2. The base folder of one of the Django apps, in our case, "simple."

To direct Django, we add`LANGUAGE_PATHS,` a list similar to **TEMPLATES.DIR** that gives several locations to search.

In ***settings.py***:

```python
LANGUAGE_PATHS = [
    os.path.join(BASE_DIR, 'locale'),  # base folder where manage.py resides
    os.path.join(BASE_DIR, 'simple/locale')  # app folder
]
```

We include the languages we want to make available for translation in the **settings.py** file. This restricts the languages a user can have the site translated to. Of course, you can choose to remove `LANGUAGES` from your settings.py file.

```python
from django.utils.translation import ugettext_lazy as _

# create a list of tuples ('LANGUAGE_CODE,' 'LANGUAGE NAME')
LANGUAGES = [
   ('de', _('German')),
   ('en', _('English')),
   ('fr', _('French')),
   ('es', _('Spanish')),
   ('pt', _('Portuguese'))
]
```

We can include a default language for users visiting the website as below:

```python
...
LANGUAGE_CODE = 'de'
LANGUAGES = [
   ('de', _('German')),
   ('en', _('English')),
   ('fr', _('French')),
   ('es', _('Spanish')),
   ('pt', _('Portuguese'))
]
```

We can include Django's `LocaleMiddleware,` which allows the user to specify their preferred language.

```python
MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    
'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',  # <-- here
    'django.middleware.common.CommonMiddleware',
]
```

Because `LocaleMiddleware` makes use of session and cache (if set) data, it is advised to place `LocaleMiddleware` after the two (or one, if the `CacheMiddleware` is not set).

```python
MIDDLEWARE_CLASSES = [
    'django.middleware.security.SecurityMiddleware',
    
'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.locale.LocaleMiddleware',  # <-- here
    'django.middleware.common.CommonMiddleware',
]
```

Our **simple** app creates a folder named *locale*, storing the message file for our application. Then rerun the `makemessages` command in the app-level (**simple**):

```bash
>> cd simple
>> django-admin makemessages -l fr
processing locale fr
>> django-admin makemessages -l de
processing locale de
>> django-admin makemessages -l en
processing locale en
```

The folder structure of your app should be similar to this:

```bash
---transy
    |
    |---simple
        |
        |---locale
        |   |---de
        |       |---LC_MESSAGES
        |           |
        |           |-django.po
        |   |---fr
        |       |---LC_MESSAGES
        |           |
        |           |-django.po
        |   |---en
                |---LC_MESSAGES
                    |
                    |-django.po
```

Translators will use the **.po** files to provide the strings' equivalent in different languages based on their folders. Example, `/locale/de/LC_MESSAGES/django.po` will have translations in German.

Upon translations made available, we compile them by running the following command, making these translations available on the website.

```bash
>> django-admin compilemessages
```

Note that the above command should run in the same directory `django-admin makemessages` was executed, **simple** app. Each time changes are made to message (**.po**) files, you must compile them.

`django-admin compilemessages` create **.mo** files, which according to the Django documentation, are binary files optimized to be use by **gettext**.

### Pluralization
Pluralization means providing a singular word with its plural form. The function responsible for pluralization in Django is **ngettext()**, which takes three arguments; the singular string, the plural string, and the number of objects expected to be represented.

For example:

```python
from django.http import HttpResponse
from django.utils.translation import ngettext

def user_dashboard(request, count):
    statistics = ngettext(
        'there is %(count)d transaction today',
        'there are %(count)d transactions today',
        count,
    ) % {
        'count': count,
    }
    return HttpResponse(statistics)
```

### Using translations in template
Often, one would like to apply translations directly in the Django template. To achieve this in our Django project named **trans**, we need to load an internationalization tag similar to how *"static"* is loaded in the template files.

In our app template folder, create a **home.html** file:

```html
{% load static %}
{% load i18n %}

<title>Ifenna's Section.io blog</title>
<p>Good morning! How are you?</p>
```

To include translations in the template folder, Django provides `{% translate '<STRING TO TRANSLATE>' %}` and `{% blocktranslate %} STRING with VARIABLES {% endblocktranslate %}`.

```html
{% load i18n %}
{% get_current_language as LANGUAGE_CODE %}
{% block content %}

<h1>Home Page</h1>
<p>{% translate 'Good morning! How are you?' %}</p>

{% translate "Good afternoon" as afternoon %}
{% translate "Good evening" as evening %}

<p>
    {% blocktranslate %} 
        This is the proper way to say "Good afternoon": {{afternoon}}. 
        This is "Good evening": {{evening}}
    {% endblocktranslate %}
</p>
{% endblock content%}

```

`translate` accepts either a string or a variable but never both.
`blocktranslate` accepts a mix of strings, variables and template literals.  

For example:

```html
{% for house in houses %}
<ul>
    <li>{% blocktranslate %}
            Name: {{ house }}
        {% endblocktranslate %}
    </li>
</ul>
{% endfor %}
```

We update the messages file for our **home.html** file. Django detects the changes and automatically updates the messages file.

```bash
>> django-admin makemessages -l de
processing locale de
```

Take a look at the generated message (**.po**) file for German (de). 

You will find something similar to this:

```txt
# SOME DESCRIPTIVE TITLE.
# Copyright (C) YEAR THE PACKAGE'S COPYRIGHT HOLDER
# This file is distributed under the same license as the PACKAGE package.
# FIRST AUTHOR <EMAIL@ADDRESS>, YEAR.
#
#, fuzzy
msgid ""
msgstr ""
"Project-Id-Version: PACKAGE VERSION\n"
"Report-Msgid-Bugs-To: \n"
"POT-Creation-Date: 2020-12-17 09:14+0100\n"
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\n"
"Last-Translator: FULL NAME <EMAIL@ADDRESS>\n"
"Language-Team: LANGUAGE <LL@li.org>\n"
"Language: \n"
"MIME-Version: 1.0\n"
"Content-Type: text/plain; charset=UTF-8\n"
"Content-Transfer-Encoding: 8bit\n"
"Plural-Forms: nplurals=2; plural=(n != 1);\n"

#: .\templates\home.html:7
msgid "Good morning! How are you?"
msgstr "Guten Morgen! Wie geht's?"         <------- ADD THIS

#: .\templates\home.html:9
msgid "Good afternoon"
msgstr "Guten Nachmittang"         <------- ADD THIS

#: .\templates\home.html:10
msgid "Good evening"
msgstr "Good Abend"         <------- ADD THIS

#: .\templates\home.html:13
msgid ""
" \n"
"        This is the proper way to say \"Good afternoon\": %(afternoon)s. \n"
"        This is \"Good evening\": %(evening)s\n"
"    "
msgstr ""
" \n"
"        Dies ist der richtige Weg zu sagen \"Good afternoon\": afternoon. \n"
"        Das ist \"Good evening\": \n"
"    "         <------- ADD THIS

```

You will notice that the message file has additional information like email, full name, and language team. These are documented by the translator(s) working on the message file.

`msgstr` is where translators input translation strings based on the `msgid` it references.

Start your local server:

```python
>> python manage.py runserver
```

Visit <http://localhost:8000/home/>, there are no apparent changes. Let's compile the messages file.

```bash
>> django-admin compilemessages
```

Now, visiting <http://localhost:8000/home/>, you should see the translated version since we previously set `LANGUAGE_CODE='de'`, the browser detects this and uses the translation provided for German.

### Summary
In this article, we discussed what internationalization is and how Django handles it. We discussed the developer's role in relation to internationalization and how translators can access message files. We also showed how translations could be done in the Django templates.

### References
[Django Software Foundation Documentation: Internationalization and Localization](https://docs.djangoproject.com/en/3.1/topics/i18n/#internationalization-and-localization)

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
