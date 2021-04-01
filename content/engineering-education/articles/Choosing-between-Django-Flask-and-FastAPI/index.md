---
layout: engineering-education
status: publish
published: true
url: /engineering-education/choosing-between-django-flask-and-fastapi/
title: Choosing between Django, Flask, and FastAPI
description: This article will highlight some features that will enable a beginner to make an informed decision between Django, Flask, or Fast API.
author: james-sandy
date: 2021-01-04T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/choosing-between-django-flask-and-fastapi/hero.jpg
    alt: Django, Flask, and FastAPI example image
---
A framework is a collection of packages and modules used to develop software and help developers avoid handling low-level details. When learning Python, you will come across Python frameworks used to work with Python efficiently. 
<!--more-->
The three major Python frameworks used when developing web applications are [Django](https://www.djangoproject.com/), [Flask](https://en.wikipedia.org/wiki/Flask_(web_framework)), and [Fast API](https://fastapi.tiangolo.com/). They come in handy in various use cases. We will evaluate each framework to help you decide on your use cases.

### Table of contents
- Django: Pros, cons and use cases
- Flask: Pros, cons and use cases
- FastAPI: Pros, cons and use cases
- Comparing the three frameworks
- Conclusion

### Django
Django is a free and open-source Python web development framework used in building websites. It was created by Adrian Holovaty and Simon Willison in [2003](https://en.wikipedia.org/wiki/Django_(web_framework)) and used the Model-Template-View pattern. 

It is popular for its robust and straightforward nature. It's one of the most popular frameworks globally and is used by Tech giants like Instagram, Youtube, etc. Django is also popular because it encourages reusable code.

#### Pros
- The Django code structure is very efficient, making it easy for developers to add more functionalities to their websites.
- The Rest framework (Representational state transfer can be defined as a software architectural style that defines a set of constraints to be used when creating web services) in Django. This is called Django Rest Framework (DRF). It's a flexible toolkit used to build Web APIs in Django. 
- REST is the general framework, while DRF is a specific REST framework used in Django. It's easy to build Web APIs with Django because of it's modular and customizable architecture.
- Django emphasizes security by providing defense against joint [SQL injection](https://en.wikipedia.org/wiki/SQL_injection) and [cross-site request forgery attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery).

#### Cons
- Django's cumbersome software may limit development speed because of the many reusable modules. It also needs to make sure that previous versions are still compatible with new releases, contributing to its slow nature. 
- Django Models can have no mixins, they just have simple inheritance. 
- Django uses ORM, which was created before SQLAlchemy, making Django ORM inferior to SQLAlchemy because it is less flexible.

#### Django: Use cases
Django can tackle projects of any size and capacity. We can use it for simple sites or high-performance sites. A few example use cases would be: 
- [High load booking engines](https://github.com/amadeus4dev/amadeus-flight-booking-django).
- [Shopping platforms](https://github.com/benedictchen/django-shopping-cart).
- [School management systems](https://github.com/adigunsherif/Django-School-Management-System). 
- Built-in custom CRM systems for internal data. 
- IOS and Android applications supporting web-based applications. 

Some developer features that can be implemented with Django are admin dashboards, photo-based verification, emailing systems for sending user notifications, etc.

### Flask
Flask is a micro web framework written in Python. A micro web framework is a web development framework with an easy setup and can be used in developing minimalistic web applications. Flask comes with options like template engines such as ORM, caching, and authentication.

It was created to build web apps with the Python programming languange. It was designed to be easy, fast, and to scale up complex applications and microservices (which is a lightweight application that provides a narrowed list of features with a well-defined contract).  

Flask was more like an April fool's prank by the creator Armin Ronacher on the 1st of April, where he wrapped [Werkzeug](https://werkzeug.palletsprojects.com/en/1.0.x/) and [Jinja](https://jinja.palletsprojects.com/en/2.11.x/). Surprisingly, it was appreciated, which made them work more on it.

#### Pros
- Flask is flexible and comfortable. Most parts of Flask have the possibility of changing, which is very unlikely for some other web frameworks.
- Flask allows unit testing and would enable you to transit to a web framework by tweaking some extensions because of its built-in-development server, integrated support, etc.
- Flask is very beginner-friendly because of its simplicity, giving developers room to learn and understand it better. It also enables developers to create apps effortlessly and quickly. 

#### Cons
- Flask uses Modules, which is a third-party involvement and is prone to cause security breaches. The modules are in between the framework and the developer.
- Flask has a singular source that implies that it will handle every request in turns, one after the other, so regardless of how many multiple requests, it still takes them in turns, which takes more time.

#### Flask: Use cases
We can use Flask for commercial projects. It can help you get started quickly but doesn't work well when resembling a real load. 

You can quickly implement Flask projects such as:
- E-commerce systems.
- Facebook/Twitter bot.
- An online social network.
- Static sites.

It's not advisable to use it for high-load enterprise software.

### FastAPI  
Fast API is a modern, open-source, fast, and highly performant Python web framework used for building Web APIs and is based on Python 3.6+ standard type hints. 

#### Pros
- Fast API validates the developer's data type even in deeply nested JSON requests.
- Fast API is built on standards like JSON Schema (a tool used for validating the structure of JSON data), OAuth 2.0 (it's the industry-standard protocol for authorization), and OpenAPI (which is a publicly available application programming interface)
- FastAPI makes it easy to build a GraphQL API with a Python library called *graphene-python*.

#### Cons
- Because FastAPI is relatively new, the community is small compared to other frameworks, and regardless of its detailed documentation, there is very little external educational materials.

#### FastAPI Use cases
Fast API, works perfectly if your concern is speed. Netflix uses it for its internal crisis management. It also scales perfectly in deploying production-ready machine learning models because ML models work best in production when they are wrapped around a REST API and deployed in a microservice.

### Comparison 
Now we're going to compare Django, Flask, and FastAPI based on their *packages*, *community*, *performance*, *flexibility*, *job opening*, and *education*.

**Packages**
Among Django, Flask, and FastAPI, Django has the most packages that enable reusability of code. It is a full-stack web development framework, unlike Flask and FastAPI, that are minimalistic frameworks used for building fast websites.

**Community**
Django has the most significant community because of its wide use and popularity next to Flask, which also has a thriving community. FastAPI, on the other hand, has a small community because it's relatively new.

**Performance**
In performance, FastAPI is the leader because it is speed-oriented, then next to Flask, and finally Django, which is not very fast.

**Flexibility**
Flexibility is something developers value a lot, and Flask is more flexible than Django. Fast API, on the other hand, is flexible code-wise and doesn't restrict the code layout. So we can say Flask is the most flexible among all three.

**Job openings**
No doubt there are more job openings in the Python web ecosystem with Django requirements, next is Flask and finally Fast API, which has far less, so if you aim to get a job quickly, then Django should be your go-to guy.

**Education**
Django is more strenuous to learn but has many online materials and resources. Flask is easy and straightforward and has many online materials and resources as well, while Fast API is the easiest if you're starting with web development but has the fewest online resources.

### Conclusion
After looking at them throughly, you might be able to choose which one works best for you. In summary, Django is perfect if you want to build robust full-stack websites because it has several functionalities and works very well in production. 

Flask is ideal for machine learning engineers or developers who want to quickly prototype a web application and build APIs easily and quickly. At the same time, FastAPI is perfect if you’re looking for speed or scalability. It is always wise to choose a framework based on what you want to use it for, but generally, they are all good and have a good market demand.

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
