title: Choosing between Django, Flask, and FastAPI
description: Describe the what, why, and how of your content idea in 2-5 sentences.
Most developers who start off learning Python are often confused after the introductory Python course if they should learn Django, Flask, or Fast API. This article will highlight some features that will enable a beginner to make the right choice.

### Choosing between Django Flask and FastAPI



![Simple](https://github.com/jamessandy/engineering-education/blob/new-article/articles/prototyping-machine-learning-models-with-streamlit/hero.jpg)

Python is a very beginner-friendly language with a great community. After learning Python you would need to know a Python framework to work with Python efficiently. A framework is a collection of packages and modules used to develop software and help developers avoid handling low-level details. The three major Python frameworks used in developing web applications are Django, Flask, and Fast API. They come in handy in various use cases and we are going to evaluate each of them to help you make a decision.

#### Tabel of Content
1. Django Pros & Cons
2. Flask Pros & Cons
3. FastAPI Pros & Cons
4. Comparison
5. Conclusion


#### Django
Django is a free and open-source Python web development framework used in building websites. It was created by Adrian Holovaty and Simon Willison in 2003 and made use of the Model-Template-View pattern. It is trendy for its robust and straightforward nature. It is one of the most popular frameworks globally and is used by Tech giants like Instagram, Youtube, etc. Django is popular because it encourages reusable code.

##### Pros
1. Django makes its code structure very efficient which makes it easy for developers to add more functionalities to their websites
2. The Rest framework(Representational state transfer can be defined as a software architectural style that defines a set of constraints to be used for creating Web services) and in Django it is called Django Rest Framework(DRF)and it's a flexible toolkit for building Web APIs in Django, while REST is the general framework DRF is the specific REST framework used in Django. It’s easy to build Web APIs with Django because of it’s modular and customizable architecture.
3. Django emphasizes security by providing defense against joint [SQL injection](https://en.wikipedia.org/wiki/SQL_injection) and [cross-site request forgery attacks](https://en.wikipedia.org/wiki/Cross-site_request_forgery).

##### Cons
1. Django’s cumbersome software limits the speed of development because of the several reusable modules by the community, and also it needs to make sure that previous versions are still compatible with new releases, which contribute to its slow nature. 
2. Django object-relational mapper(ORM) which enables you to interact with your database like you would with SQL, Django models can save themselves and transactions because it was created before SQLAlchemy came into existence.

##### Django: Use cases
You can use Django to tackle projects of any size and capacity, from simple sites to high-performance sites. It can be used for high load booking engines or shopping platforms, documentary management systems, built-in custom CRM systems for internal data, and even IOS and Andriod applications that support web-based applications. Some developer features that can be efficiently implemented with django is admin dashboards, photo-based verification, emailing systems for sending user notifications, etc.

#### Flask
It is a micro web framework written in Python. A micro web framework is a web development framework with easy setup and used in developing minimalistic web applications with options like template engine, ORM, caching, authentication etc. It is built to make building web apps with Python easy and fast and scales up very complex applications and a  Microservice is a lightweight application that provides a narrowed list of features with a well-defined contract. Flask was more like an April fool’s prank by the creator Armin Ronacher on the 1st of April, where he wrapped [Werkzeug](https://werkzeug.palletsprojects.com/en/1.0.x/) and [Jinja](https://jinja.palletsprojects.com/en/2.11.x/) which were both created by him and. Surprisingly it was appreciated which made it to be taken seriously and more work was done on it based on the Pocoo projects.

##### Pros
1. Flask is flexible and easy, most of the parts of Flask have the possibility of changing, which is very unlikely for some other web frameworks.
2. Flask allows unit testing and would enable you to transit to a web framework by tweaking some extensions because of its built-in-development server, integrated support, etc.
3. Flask is pretty much very beginner-friendly because of its simplicity, giving room to learn and understand it better. It also enables devs to create apps effortlessly quickly. 

#### Cons
1. Flask uses Modules, a third-party involvement prone to cause security breaches. The modules are now like a third-party between the framework and the developer.
2. Flask has a singular source that implies that it will handle every request in turns, one after the other, so regardless of how many multiple requests it still takes them in turns, it takes more time.

##### Flask: Use cases
Flask can be used for commercial projects. It can help you get started quickly but doesn’t work well for resembling a real load. You can easily implement projects with Flask: E-commerce systems, Facebook/ Twitter bot, An online social network, static sites, etc. Still, it’s not advisable to be used for high-load enterprise software.

#### FastAPI  
Fast API is a modern open-source fast and highly performant Python web framework for building Web APIs and is based on Python 3.6+ standard type hints. 

##### Pros
1. Fast API validates the developer’s data type even in deeply nested JSON requests.
2. Fast API is built on standards like JSON Schema(a tool for validating the structure of JSON data), OAuth 2.0(it's the industry-standard protocol for authorization), and OpenAPI(which is a publicly available application programming interface)
3. FastAPI makes it easy to build a GraphQL API with a Python library called *graphene-python*.

#### Cons
1. Because FastAPI is relatively new, the community is small compared to other frameworks and regardless of its detailed documentation there are few external educational materials.

##### FastAPI Use cases
Fast API which is relatively new amongst the three works perfectly if your concern is speed. Netflix uses it for its internal crisis management. It also scales perfectly in deploying production-ready machine learning models because ML models work best in production when they are wrapped around a REST API and deployed in a microservice.

Now we’re going to compare Django, Flask, and FastAPI based on their *packages*, *community*, *performance*, *flexibility*, *job opening*, and *education*.

**Packages**

Among Django, Flask, and FastAPI, Django has the most packages that enable reusability of code. It is a full-stack web development framework, unlike Flask, a microservice, and FastAPI, a minimalistic framework for building fast websites.

**Community**
Django has the biggest community because of its wide use and popularity next to the Flask, which also has a thriving community, FastAPI on the other hand has a small community because it’s fairly new.

**Performance**
In performance, FastAPI leads because it is speed-oriented, then next to Flask, and finally Django, which is not very fast.

**Flexibility**
Flexibility is something developers value a lot and flask is more flexible than Django, Fast API on the other hand is flexible code-wise and doesn't restrict the code layout. So we can say Flask is the most flexible among all of the above.

**Job openings**
No doubt they are more job openings in the python web ecosystem with Django requirement next to flask and finally Fast API which is few so if your aim is to get a quick job then Django should be your go-to guy.

**Education**
Django is more strenuous to learn but has a lot of online materials and resources, flask is easy and straightforward and has a lot of online materials and resources and Fast API which is the easiest if you're starting out with web development but has few online resources.


#### Conclusion
After looking at them, you might be able to choose which one works better for you. I would love to share my thoughts on each of them. Firstly Django is perfect if you want to build robust full-stack websites because it has several functionalities and works very well in production. Flask is ideal for Machine learning Engineers or developers who want to quickly prototype a web application and build APIs easily and quickly. At the same time, FastAPI is perfect if you’re looking for speed or scalability. You should choose based on what you want to use it for, but all of them generally are good and have good market demand.
