title: Choosing between Django, Flask and FastAPI
description: Describe the what, why, and how of your content idea in 2-5 sentences.
Most developers that start off learning python are often confused after the introduction to python course if they should learn Django, Flask, or Fast API so this article will highlight some features that will enable a beginner make a good choice.

### Choosing between Django Flask and FastAPI



![Simple](https://github.com/jamessandy/engineering-education/blob/new-article/articles/prototyping-machine-learning-models-with-streamlit/hero.jpg)

Python is a very beginner-friendly language with a great community, after learning python you would need to learn a python framework to help you work with python easily, a framework is a collection of packages and modules used to develop software and help developers avoid handling low-level details. The three major python frameworks used in developing web applications are  Django, Flask, and Fast API and they come in handy in a various use case, we are going to evaluate each of them to help you make a decision.

#### Tabel of Content
1. Django Pros & Cons
2. Flask Pros & Cons
3. FastAPI Pros & Cons
4. Comparison
5. Conclusion


#### Django
Django is a free and open-source python web development framework used in building websites, It was created by Adrian Holovaty and Simon Willison in 2003 and makes use of the Model-Template-View pattern. It is particularly popular for its simple and robust nature, It is one of the most popular frameworks in the world and is used by Tech giants like Instagram, Youtube, etc. Django is very exciting because it encourages reusable code.

##### PROS
1. Standardized Structure: Django makes its code structure very efficient which makes it easy for developers to add more functionalities to their websites
2. REST Framework: The Rest framework for Django which is DRF is used for building APIs, it’s easy to build Web APIs because of it’s modular and customizable architecture.
3. Security: Django places emphasis on security by providing defense against common SQL injection and Cross-site Request forgery attacks.


##### CONS
1. Django’s slow development: It’s cumbersome software limits the speed of development because of the several reusable modules by the community and also it needs to make sure that previous versions are still compatible with new releases which contribute to its slow nature. 
2. Django ORM: Django models can save themselves and transactions of the default because it was created before SQLAlchemy came into existence.

##### Django Use cases
You can use Django to tackle projects of any size and capacity, from simple sites to high-performance sites. It can be used for high load booking engines or shopping platforms, Documentary management systems, Built-in custom CRM systems for internal data, and even IOS and Andriod applications that support web-based applications. Some developer features that can be efficiently implemented with Django is Admin dashboards, Photo-based verification, Emailing systems for sending user notifications, etc.

#### Flask
It is a micro web framework written in python, it is built in a way that makes building web apps with python easy and fast and able to scale up very complex applications. It was more like an April fool’s prank by the creator Armin Ronacher on the 1st of April where he wrapped Werkzeug and Jinja which were both created by him and surprisingly it was appreciated which made it to be taken seriously and more work was done on it.

##### PROS
1. Flexible and Easy: Most of the parts of flask have the possibility of changing which is very unlikely for some other web frameworks.
2. Testing: Flask allows unit testing and would enable you to transit to a web framework by tweaking some extensions because of its built-in-development server, integrated support, etc.
3. Easy to Understand: Flask is pretty much very beginner-friendly because of its simplicity which gives room to learn and understand it better. It also enables devs to quickly create apps effortlessly. 

#### CONS
1. Modules: Flask uses Modules which is a third-party involvement that is prone to cause a breach security-wise, the modules are now like a third-party between the framework and the developer.
2. Scale: Flask has a singular source which implies that it will handle every request in turns one after the other, so regardless of how many multiple requests it still takes them in turns which takes more time.

##### Flask Use cases
Flask can be used for commercial projects, it can help you get started easily but doesn’t work well for resembling real load. Projects that you can easily implement with flask are E-commerce systems, Facebook/ Twitter bot, An online social network, static sites, etc but it’s not advisable to be used for high-load enterprise software.

#### FAST API  
Fast API is a modern open-source fast and highly performant python web framework for building Web APIs and Is based on python 3.6+ standard type hints. 

##### PROS
1. Data validation: Fast API validates the data type declared by the developer even in JSON requests that were nested deeply.
2. Standards: Fast API is built on standards like JSON Schema, OAuth 2.0 and OpenAPI
3. GraphQL support: FastAPI makes it easy to build a GraphQL API with the help of a python library called graphene-python.

#### CONS
1. Small Community: Due to the fact that FastAPI is fairly new the community is small compared to other frameworks
2. Limited Educational materials: Inasmuch as FastAPI provides awesome documentation there are very few external educational materials.

##### FastAPI Use cases
Fast API which is fairly new amongst the three works perfect if your concern is speed, it is used by Netflix for their internal crisis management. It also scales perfectly in deploying production-ready machine learning models because ML models work best in production when they are wrapped around a REST API and deployed in a microservice.

Now we’re going to do a little comparison between Django, Flaks, and FastAPI based on their  Packages, Community, and Performance.

**Packages**

Among Django, Flask, and FastAPI; Django has the most packages which enable reusable code because it is a full-stack web development framework, unlike Flask which is a microservice, and FastAPI which is a minimalistic framework for building fast websites.

**Community**
Django has the biggest community because of its wide use and popularity next to the flask which also has a thriving community but FastAPI, on the other hand, has a small community because it’s fairly new.

**Performance**
In performance, FastAPI leads because it is speed-oriented then next to a flask and finally Django which is not very fast.

#### Conclusion
After looking at them you might be able to choose which one works better for you but I’ll love to give my personal thoughts on each of them, firstly Django is perfect if you want to build robust full-stack websites because it has several functionalities and works very good in production. Flask is perfect for mostly Machine learning Engineers or developers who want to quickly prototype a web application and build APIs easily and quickly while FastAPI is perfect if you’re looking for speed or scalability. You should be able to make a choice based on what you want to use it for but all of them generally are good and have good market demand.
