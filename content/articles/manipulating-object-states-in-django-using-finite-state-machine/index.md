---
layout: engineering-education
status: publish
published: true
url: /manipulating-object-states-in-django-using-finite-state-machine/
title: Manipulating Object States using Finite State Machine in Django
description: In this article, we will look at how to manipulate the object states of FSM using Django.
author: ayemobola-tolulope
date: 2021-10-06T00:00:00-12:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/manipulating-object-states-in-django-using-finite-state-machine/hero.jpg
    alt: FSM Django Example Image
---
As projects get bigger, the tendency to tilt towards spaghetti code becomes inevitable. One way to avoid these complications is to apply the Finite State Machines (FSM) concept in handling state changes of objects.
<!--more-->
FSM helps you simplify code, avoid numerous if-else conditions by defining states and the connections between them.

In this article, we will learn how to manipulate and change an object's state at runtime.

To demonstrate how this works, we will be building a lightweight cylinder tracking system with basic CRUD operations.

### Table of contents
The tutorial will cover:
- What finite state machines are?
- How the Finite State Machine (FSM) works in Django?
- Points to note when choosing approach to change the state
- Conclusion and Recommendation

### Prerequisites
To make the most of this tutorial, it is required to have:
- Basic understanding of Python.
- Familiarity with the Django framework and Django Rest framework.
- Familiarity with the Django rest framework browseable API interface.
- PyCharm professional code editor installed.
- A quick walk-through on [Introduction to Theory of Computation](https://www.section.io/engineering-education/introduction-to-theory-of-computation/) and [Regular Expressions](https://www.section.io/engineering-education/regular-expressions-in-python/)

### What is Finite State Machine?
A Finite State Machine (FSM) is a system that facilitates an object’s dynamism in object-oriented programming.

The idea is that objects can only assume one state per time. The most popular, most relatable example would be the traffic lights.

At any given point, regardless of the number of traffic lights on a junction, each board can only have one light at a time, or it leads to chaos.

In this tutorial, we would be implementing transitions of objects states using the `CynTrack` application built in Django to explain how FSM works.

### How does the Finite State Machine work in Django?
`CynTrack` is a simple application that tracks a cylinder based on who is in possession at the time of checking.

As the cylinder moves around, the possessor changes on the fly, and the new possessor is always recorded against the cylinder object.

![How FSM works in Django image](/engineering-education/manipulating-object-states-in-django-using-finite-state-machine/image-one.jpg)

Let us dive into the implementation.

To create this system, we will work with four steps:
1. Define the states that this object can assume
2. Create the object’s model
3. Define the transitions between the states of the object
4. Implement the views that are responsible for this transition

We want to assume readers are familiar with the quick setup of a Django project. However, the commands for quickly setting up one are shared below:

```bash
django-admin startproject project .
python manage.py startapp tracker
```

You can read more about setting up a Django project [here](https://www.section.io/engineering-education/search/?q=django).

Before we create the object’s model class, we need to install the `django-fsm` library.

You can use the following command to do this:

```bash
pip install django-fsm
```

This is what the cylinder object would look like after defining its states and creating the object:

```python
from django.db import models
from django_fsm import FSMField, transition

LOCATION = (
    ('with-retailer', 'with-retailer'),
    ('with-dispatch', 'with-dispatch'),
    ('with-user', 'with-user')
)

class Cylinder(models.Model):
    cylinder_number = models.CharField(max_length=20)
    assigned_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)
    assigned_to = FSMField(choices=LOCATION, default='with-retailer', protected=True)

    def __str__(self):
        return self.cylinder_number
```

From the code snippet above, we see a field name `assigned_to` that checks for the current location of a cylinder.

It is assigned an `FSMField` with the following parameters:
- `choices` - the list of states that any cylinder can assume
- `default` - the initial state that a cylinder object assumes upon creation
- `protected` - initialized to `True`; meaning the state cannot be changed unless they are defined

Now, we can define the transitions between the different states for any given cylinder using the `@transition` decorator.

Have a look at it below:

```python
from django.db import models
from django_fsm import FSMField, transition

LOCATION = (
    ('with-retailer', 'with-retailer'),
    ('with-dispatch', 'with-dispatch'),
    ('with-user', 'with-user')
)

class Cylinder(models.Model):
    cylinder_number = models.CharField(max_length=20)
    assigned_on = models.DateTimeField(auto_now=True)
    created_on = models.DateTimeField(auto_now_add=True)
    assigned_to = FSMField(choices=LOCATION, default='with-retailer', protected=True)

    def __str__(self):
        return self.cylinder_number

    @transition(field=assigned_to, source='with-retailer', target='with-dispatch')
    def issue_cylinder_for_delivery(self):
        return "Cylinder has been issued for delivery to user"

    @transition(field=assigned_to, source='with-dispatch', target='with-user')
    def issue_cylinder_to_final_user(self):
        return "Cylinder has been delivered to the final user"

    @transition(field=assigned_to, source='with-user', target='with-dispatch')
    def return_cylinder_from_final_user(self):
        return "Cylinder has been retrieved from final user for return"

    @transition(field=assigned_to, source='with-dispatch', target='with-retailer')
    def return_cylinder_to_retailer_store(self):
        return "Cylinder has been returned to the retailer"
```

The transition between states in FSM is powered by the `@transition` decorator.

This decorator takes primarily three parameters:
- `field` - the field on which the transition is to take place
- `source` - the state from which the object is to be changed or be transitioned
- `target` - the state to which the same object to be changed or be transitioned

Let us create a minimalistic serializer for our object.

We would use this serializer to create a cylinder object with which we will work throughout this tutorial.

Below is our serializer:

```python
from rest_framework import serializers
from tracker.models import Cylinder

class CylinderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cylinder
        fields = '__all__'
```

Now, it is time to create a cylinder object, create views to manipulate the object’s state and URLs to see these changes as they happen.

The views and URLs respectively for creating and fetching an instance of a cylinder are shown below:

```python
from rest_framework import generics

from tracker.models import Cylinder
from tracker.serializer import CylinderSerializer

class CylinderCreateView(generics.ListCreateAPIView):
    queryset = Cylinder.objects.all()
    serializer_class = CylinderSerializer

class CylinderDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cylinder.objects.all()
    serializer_class = CylinderSerializer
```

In the code listing above, we import generics functionality from the rest framework module.

We also import `Cylinder` and `CylinderSerializer` models from `models.py` and `serializers.py` respectively.

The `CylinderCreateView` lets us create a new Cylinder object with its `POST` method to fetch all the created Cylinders.

With the `GET` method, the `CylinderDetailView` lets you fetch an instance of (a single entity) a Cylinder, so we can update or delete it from the store (database).

```python
from django.urls import path

from tracker.views import CylinderCreateView, CylinderDetailView,

urlpatterns = [
    path("cylinder/", CylinderCreateView.as_view()),
    path("cylinder/<int:pk>/", CylinderDetailView.as_view()),
]
```

With the endpoints above, we can create a cylinder.

Run the project’s server with the command:

![Django runserver outcome image](/engineering-education/manipulating-object-states-in-django-using-finite-state-machine/run-server.jpg)

The default server port for Django is `8000`, except when specified with another value.

Navigate to the endpoint: [http://127.0.0.1:9000/cylinder](http://127.0.0.1:9000/cylinder) and create a cylinder as shown:

![Create cylinder object image](/engineering-education/manipulating-object-states-in-django-using-finite-state-machine/new-one.jpg)

From the picture above, we see that the cylinder is resident with the retailer.

Now, let us try to issue it by dispatching. A simple view will get this done.

The view and URL to do this are shown below:

```python
@api_view(['GET', 'PATCH'])
def change_location_from_retailer_to_dispatch(self, cylinder_name):
    obj = get_object_or_404(Cylinder, cylinder_number=cylinder_name)
    obj.issue_cylinder_for_delivery()
    obj.save()
    return Response("Changed state to dispatch")
```

```python
from django.urls import path

from tracker.views import CylinderCreateView, change_location_from_retailer_to_dispatch, CylinderDetailView,

urlpatterns = [
    path("cylinder/", CylinderCreateView.as_view()),
    path("cylinder/<int:pk>/", CylinderDetailView.as_view()),

    path("retailer_to_dispatch/<str:cylinder_name>/", change_location_from_retailer_to_dispatch), # New line
    ]
```

Now, we can visit the URL; [http://127.0.0.1:9000/retailer-to-dispatch/cylinderone/](http://127.0.0.1:9000/retailer-to-dispatch/cylinderone/) to see that the cylinder has been dispatched from the retailer.

Check the cylinder object by its database index ID, which is `1`, through the endpoint: [http://127.0.0.1:9000/retailer-to-dispatch/cylinder/1/](http://127.0.0.1:9000/retailer-to-dispatch/cylinder/1/)

![Cylinder object image](/engineering-education/manipulating-object-states-in-django-using-finite-state-machine/new-three.jpg)

To pass the same cylinder from the dispatch to the end-user, visit the endpoint: [http://127.0.0.1:8000/dispatch-to-user/cylinderone/](http://127.0.0.1:8000/dispatch-to-user/cylinderone/,)

![Cylinder object image](/engineering-education/manipulating-object-states-in-django-using-finite-state-machine/new-five.jpg)

We can see that the location of the cylinder has changed from ‘with-dispatch’ to ‘with-user’.

![Cylinder object image](/engineering-education/manipulating-object-states-in-django-using-finite-state-machine/new-six.jpg)

The same approach can be used to pass the cylinder from the user to dispatch and from the dispatch to the retailer as shown below:

[http://127.0.0.1:8000/user_to_dispatch/cylinderone/](http://127.0.0.1:8000/user_to_dispatch/cylinderone/)

[http://127.0.0.1:8000/dispatch_to_retailer/cylinderone/](http://127.0.0.1:8000/dispatch_to_retailer/cylinderone/)

```python
@api_view(['GET', 'PATCH'])
def change_location_from_user_to_dispatch(self, cylinder_name):
    obj = get_object_or_404(Cylinder, cylinder_number=cylinder_name)
    obj.return_cylinder_from_final_user()
    obj.save()
    return Response("Changed state to dispatch")

@api_view(['GET', 'PATCH'])
def change_location_from_dispatch_to_retailer(self, cylinder_name):
    obj = get_object_or_404(Cylinder, cylinder_number=cylinder_name)
    obj.return_cylinder_to_retailer_store()
    obj.save()
    return Response("Changed state to retailer")
```

```python
from django.urls import path

from tracker.views import CylinderCreateView, change_location_from_retailer_to_dispatch, CylinderDetailView, \
    change_location_from_dispatch_to_user, change_location_from_user_to_dispatch, \
    change_location_from_dispatch_to_retailer

urlpatterns = [
    path("cylinder/", CylinderCreateView.as_view()),
    path("cylinder/<int:pk>/", CylinderDetailView.as_view()),

    path("retailer_to_dispatch/<str:cylinder_name>/", change_location_from_retailer_to_dispatch),
    path("dispatch_to_user/<str:cylinder_name>/", change_location_from_dispatch_to_user),
    path("user_to_dispatch/<str:cylinder_name>/", change_location_from_user_to_dispatch),
    path("dispatch_to_retailer/<str:cylinder_name>/", change_location_from_dispatch_to_retailer),
]
```

The code listing above shows the endpoints for each of the views created:
- `cylinder/` is used to create a cylinder object and fetch all the created cylinders.
- `cylinder/pk` fetches a cylinder from the database indexed by the primary key (pk) appended in the URL.
- `retailer_to_dispatch/<str:cylinder_name>/` controls the view that basically hands a cylinder from a retailer to a dispatch person.
- `dispatch_to_user/<str:cylinder_name>/` controls the view that transfers a cylinder from a dispatch guy to an end user.
- `user_to_dispatch/<str:cylinder_name>/` implements a cylinder return from an end user to a dispatch guy.
- `dispatch_to_retailer/<str:cylinder_name>/` implements a cylinder return from a delivery guy back to the original custodian, the retailer.

### Points to note
For a moment, let's assume that we want to alter more than one field.

For instance, in our cylinder tracker project, we might want to check the gas level of each cylinder – whether empty or filled – as it moves from one location to another.

For this, we simply create another tuple of choices, like the location tuple in the model. We then include a field in the model to refer to this new tuple and then write transitions for this gas volume states.

Finally, we call the transition state for each gas volume state in the corresponding views file.

### Bonus
#### Handling exceptions
A mechanism is provided in FSM for you to set a custom state and response, should a transition result in an exception.

This is shown below:

```python
@transition(field=assigned_to, source='with-lpg', target='with-retailer', on_error='failed')
def close(self):
   """ Some exception could happen here """
   pass
```

#### Permission-based transition
Permission can be passed as a reference in the argument of the transition decorator, to control who can carry out this state changePermission-based transition.

Permission can be passed as a reference in the argument of the transition decorator, to control who can carry out this state change.

```python
@transition(field=assigned_to, source='with-user', target='with-retailer', permission='tracker.can_move_cylinder')
def close(self):
   """ This method will contain the action that needs to be taken once state is changed. """
   pass
```

### Conclusion
To conclude, using FSM offers us a wonderful way to deal with complex issues of projects.

By adopting it, we can lower the total amount of errors that can arise as a result of a system’s inconsistency. Also, code structures would be better organized, cleaner to the eyes, easier to read, and easily scalable.

You can clone the project from this [repository](https://github.com/teevyne/mini-tracker).

I hope you were able to learn a few things by reading this tutorial.

Happy coding!

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
