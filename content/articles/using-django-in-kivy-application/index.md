Kivy is a popular library for developing media-rich multi-touch enabled applications that can run across all major platforms.

There may, however, be situations that need your application to get access to and manipulate data being provided by a web server hosted at a site.

In this tutorial, we are going to learn how to create a kivy application and how to make requests to a server using the `requests` library.

We are going to use Django to develop the server that holds the data we want to manipulate.

### Prerequisites
For you to follow along, it's important that:
- You have `Django` and `djangorestframework` installed.
- You are familiar with building APIs using Django REST framework.
- You have the `kivy` library installed. You can run `pip install kivy`.
- Basic knowledge of python is important, especially the concept of object-oriented programming in python.

### Key takeaways
- Improve your python skills.
- Learn how to build applications using the `kivy` library.
- Learn how to use Django for your kivy applications.

### Getting started
We are going to create a simple to-do application that allows one to view available tasks  offers an option for adding a new task.We will begin by creating the tasks API with `djangorestframework` and then create our application using `kivy`. We will use the `requests` library to make
requests to our Django server.

### Creating the tasks API
In a folder of choice, let's create a new project by running `django-admin startproject TodoAPI`.Cd into the `TodoAPI` project and create a new app `tasks` that will handle creation of tasks.

Run `python3 manage.py startapp tasks`.

Your project structure should look something like this:

```
.
└── TodoAPI
    ├── manage.py
    ├── tasks
    │   ├── admin.py
    │   ├── apps.py
    │   ├── __init__.py
    │   ├── migrations
    │   │   └── __init__.py
    │   ├── models.py
    │   ├── tests.py
    │   └── views.py
    └── TodoAPI
        ├── asgi.py
        ├── __init__.py
        ├── settings.py
        ├── urls.py
        └── wsgi.py
```

We need to register our `tasks` app and `rest_framework` in order to use our app and use the  Django REST framework. Edit the `settings.py` file as follows under `INSTALLED APPS`:

`TodoAPI/settings.py`

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'tasks',
    'rest_framework'
```

Let's go ahead and create our tasks model.Edit the `models.py` file to look as follows:

`tasks/models.py`

```python
from django.db import models

# Create your models here.
class Task(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
```

Let's create a `serializer.py` file that handles serialization and deserialization of task instances.Serialization is the process of saving an object in a way that can be accessed in a uniform format by different applications.Deserialization is the reverse of serialization.You may learn more about serialization and deserialization in Django REST framework by visiting [here](https://www.django-rest-framework.org/api-guide/serializers/). Add the following lines of code to it:

`tasks/serializer.py`

```python
from rest_framework import serializers
from .models import *


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        field = '__all__'
```

### Creating views
We are going to also create some views to render data to a web page. Views are python functions that handle web requests and return web responses. There are different ways to create the views and we will use
fuction-based views.Function-based views are views in Django written as python functions. Edit the `views.py` file to match the following:

`tasks/views.py`

```python
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *
from .models import *

# Create your views here.

@api_view(['GET'])
def all_tasks(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_task(request):
    data = request.data
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
        return Response(serializer.data, status=status.HTTP_200_OK)
```

We begin by defining a function `all_tasks` that will return a response containing all our tasks. The function gets all the tasks with the line `tasks = Task,objects.all()`.

The data is then serialized on the succeeding line and the function returns the response.The line `@api_view(['GET'])` is a decorator takes `GET` as the HTTP method our function should respond to.

The same concept applies to the our second function, only that this time it takes a `POST` HTTP method.

### Routing views
We then create a `urls.py` file to for routing our views. Create the file and add the following code:

`tasks/urls.py`

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.all_tasks, name='all_tasks'),
    path('create', views.create_task, name='create_task')
]
```

The above mappings imply that our requests will first be handled by this file and then routed to a corresponding view function. For instance, when we visit `http://127.0.0.1:8000/create`, the `create_task` function is called and implemented.

We have to create a route for our `tasks` app.This way, the routing first occurs on the `TodoAPI/urls.py` file and then `tasks/urls.py`. We therefore configure our `urls.py` file in `TodoAPI` like this:

`TodoAPI/urls.py`

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('tasks.urls'))
]
```

We can now run `python3 manage.py makemigrations` and `python3 manage.py migrate`.

When we run `python3 manage.py runserver`, we should have a page similar to this:

`http://127.0.0.1:8000/`

![Tasks Home Page](/engineering-education/content/articles/using-djnago-in-kivy-application/tasks_home_page.png)

When you create a task instance as follows:

`http://127.0.0.1:8000/create`

![Create Task Page](/engineering-education/content/articles/using-djnago-in-kivy-application/create_task_page.png)

You should be able to see something like this:

`http://127.0.0.1:8000/`

![Task Created](/engineering-education/content/articles/using-djnago-in-kivy-application/task_created.png)

Our Django API is working and we can now proceed to creating the `kivy` application.

### Creating the Kivy application
Let's create a `main.py` in a folder of choice.I am going to keep the file in the same directory as our `TodoAPI` project folder.We are going to get started with these lines of code in our `main.py` file.The `TodoApp` is our main entry point of our application and every execution begins from there.

`Your folder/main.py`

```python
from kivy.app import App

class TodoApp(App):
    pass

if __name__ == '__main__':
    TodoApp().run()
```

When you run the file, you should get the following result:

![Original Kivy App](/engineering-education/content/articles/using-djnago-in-kivy-application/original_kivy_app.png)

We are now going to replace the `main.py` file with the following lines of code.

`Your folder/main.py`

```python
from kivy.app import App

from kivy.uix.screenmanager import ScreenManager
from kivy.uix.boxlayout import BoxLayout

#menu
class Menu(BoxLayout):
    pass
#Screen Management
class ScreenManagement(ScreenManager):
    pass
#app class
class TodoApp(App):
    pass
 
if __name__ == '__main__':
    TodoApp().run()
```

We also need to create a `kv` file where all details of user interface is entailed.Create a
`todo.kv` file and make sure it's in the same folder as the `main.py` file. The file should resemble this one.

`Your folder/todo.kv`

```kv

BoxLayout:
    orientation: 'vertical'
    Menu:
        size_hint_y: .1
        manager: screen_manager
    ScreenManagement:
        size_hint_y: .9
        id: screen_manager

<Menu>:
    orientation: "vertical"
    ActionBar:
        top: 0
        ActionView:
            ActionPrevious:
            ActionButton:
                text: 'Home'

            ActionButton:
                text: 'Add New'
```

This is what is happening to our files:

- We begin by creating a `Menu ` class that inherits from `BoxLayout` class.This menu will contain the buttons we will use to explore the application.
- We then proceed by creating the `ScreenManger` class that manages the display of what is displayed where in the application.
- In the `todo.kv` file, we declare a `BoxLayout` as our main interface that our program will show.We then  give the menu a position of bottom set by ` size_hint_y: .1`. We also declare that it's managed by `ScreenManager` by declaring ` manager: screen_manager`.By setting the `id` property of the `ScreenManager` as `screen_manager` the position of the Menu is now on top.
- We the declare the properties of our `Menu` class. The class will have an action bar which will contain two buttons, the `Home` action button and the `Add New`     action button.

Your application should be similar to the one below:

![Creating The Action Bar](/engineering-education/content/articles/using-djnago-in-kivy-application/creating_the_action_bar.png)

We now need to transition to a different screen when creating a task. We therefore need to declare two screens so that one
displays the tasks and another one to add a new task. Both of these screens will be managed by `ScreenManager` class.

Edit your `main.py` file to look as this:

`Your folder/main.py`

```python
from kivy.app import App

from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout

#menu
class Menu(BoxLayout):
    pass
#screens
class HomeScreen(Screen):
    pass
class AddScreen(Screen):
    pass
#Screen Management
class ScreenManagement(ScreenManager):
    pass
#app class
class TodoApp(App):
    pass

if __name__ == '__main__':
    TodoApp().run()
```

And also make the `todo.kv` file to be:

`Your folder/todo.kv`

```kv
BoxLayout:
    orientation: 'vertical'
    Menu:
        size_hint_y: .1
        manager: screen_manager
    ScreenManagement:
        size_hint_y: .9
        id: screen_manager
<Menu>:
    orientation: "vertical"
    ActionBar:
        top: 0
        ActionView:
            ActionPrevious:
            ActionButton:
                text: 'Home'
                on_press: root.manager.current = 'screen_home'

            ActionButton:
                text: 'Add New'
                on_press: root.manager.current = 'screen_add'
<ScreenManagement>:
    id: screen_manager
    HomeScreen:
        name: 'screen_home'
        manager: 'screen_manager'
    AddScreen:
        name: 'screen_add'
        manager: 'screen_manager'
<HomeScreen>:
    Label:
        text: "Home"
<AddScreen>:
    Label:
        text: "Add to list..."
```

We declare the `HomeScreen` class and give it a `Label` instance with the text "home".We also do the same for the `AddScreen` with the label text "Add to list..."

We have given both screens as children of `ScreenManagement`. We also have given functionality to our action buttons by
making them being able to access the screen by defining ` on_press: root.manager.current = 'screen_home'` and ` on_press: root.manager.current = 'screen_add'`.

You should now be able to explore the two screens and see the "Home" text in the `HomeScreen` and "Add to list..." in the `AddScreen`

### Using the Django API
Let's create a class that has a function that send requests to our server for available tasks.

Under the `class Menu(BoxLayout):` declaration, add the following lines of code:

`Your folder/main.py`

```python
#recycle view for home screen
class MyRecycleView(RecycleView):

    def __init__(self, **kwargs):
        super(MyRecycleView, self).__init__(**kwargs)
        self.load_data()
        Clock.schedule_interval(self.load_data, 1)

    def load_data(self, *args):
        store = requests.get('http://127.0.0.1:8000/').json()

        list_data = []
        for item in store:
            list_data.append({'text': item['name']})

        self.data = list_data
```

You need to make this imports at the top of the file:

```python
import requests
from kivy.clock import Clock
from kivy.uix.recycleview import RecycleView
```

Make your `todo.kv` file to look like this:

`Your folder/todo.kv`
```kv

BoxLayout:
    orientation: 'vertical'
    Menu:
        size_hint_y: .1
        manager: screen_manager
    ScreenManagement:
        size_hint_y: .9
        id: screen_manager
<Menu>:
    orientation: "vertical"
    ActionBar:
        top: 0
        ActionView:
            ActionPrevious:
            ActionButton:
                text: 'Home'
                on_press: root.manager.current = 'screen_home'

            ActionButton:
                text: 'Add New'
                on_press: root.manager.current = 'screen_add'
<ScreenManagement>:
    id: screen_manager
    HomeScreen:
        name: 'screen_home'
        manager: 'screen_manager'
    AddScreen:
        name: 'screen_add'
        manager: 'screen_manager'
<HomeScreen>:
    BoxLayout:
        orientation: "vertical"
        MyRecycleView:
<MyRecycleView>:
    viewclass: 'Label'
    RecycleBoxLayout:
        color: 1,1,1,1
        default_size: None, dp(56)
        default_size_hint: 1, None
        size_hint_y: None
        height: self.minimum_height
        orientation: 'vertical'
<AddScreen>:
    Label:
        text: "Add to list..."
```

The `MyRecycleView` class is initialized by having a function `load_data` that make requests to our server using the `requests` library.

The data is appended to a list containing dictionaries of our tasks with the key `text`. The function returns the list as a `data` variable.

The function is called every second by setting a clock interval of 1.

In the `todo.kv` file, we replace the contents of our `HomeScreen` with a `BoxLayout` that contains our `MyRecycleView` class.
We then declare the properties of our `MyRecycleView ` as having BoxLayout that contains a list of labels, each whose text is a task received from our server.

You should now be able to see the `code` task we created in our web-based interface earlier.

![Displaying Tasks from server](/engineering-education/content/articles/using-djnago-in-kivy-application/displaying_tasks_from_server.png)

Let us now handle the functionality of creating a new task. We begin by creating form to submit the creation request to our server
We then add the form to our `AddScreen` screen. This will make our application complete.

Let's make our `main.py` file to this:

`Your folder/main.py`
```python
import requests
from kivy.app import App
from kivy.clock import Clock
from kivy.properties import ObjectProperty, StringProperty
from kivy.uix.label import Label
from kivy.uix.recycleview import RecycleView

from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout

#menu
from kivy.uix.widget import Widget

class Menu(BoxLayout):
    pass
#recycle view for home screen
class MyRecycleView(RecycleView):

    def __init__(self, **kwargs):
        super(MyRecycleView, self).__init__(**kwargs)
        self.load_data()
        Clock.schedule_interval(self.load_data, 1)

    def load_data(self, *args):
        store = requests.get('http://127.0.0.1:8000/').json()

        list_data = []
        for item in store:
            list_data.append({'text': item['name']})
        self.data = list_data
#screens
class HomeScreen(Screen):
    pass
class AddNewForm(Widget):
    text_input = ObjectProperty(None)

    input = StringProperty('')

    def submit_input(self):
        self.input = self.text_input.text
        post = requests.post('http://127.0.0.1:8000/create', json={'name': self.input})

        self.input = ''
class AddScreen(Screen):
    def __init__(self, **kwargs):
        super(AddScreen, self).__init__(**kwargs)
        self.box = BoxLayout()
        self.box.orientation = "vertical"
        self.box.add_widget(Label(text="Add To List...", color="blue",pos_hint={"top": 1}))
        self.addNewForm = AddNewForm()
        self.box.add_widget(self.addNewForm)
        self.add_widget(self.box)
#Screen Management
class ScreenManagement(ScreenManager):
    pass
#app class
class TodoApp(App):
    pass

if __name__ == '__main__':
    TodoApp().run()
```

Let us also edit the `todo.kv ` to:

`your folder/todo.kv`
```kv

BoxLayout:
    orientation: 'vertical'
    Menu:
        size_hint_y: .1
        manager: screen_manager
    ScreenManagement:
        size_hint_y: .9
        id: screen_manager
<Menu>:
    orientation: "vertical"
    ActionBar:
        top: 0
        ActionView:
            ActionPrevious:
            ActionButton:
                text: 'Home'
                on_press: root.manager.current = 'screen_home'

            ActionButton:
                text: 'Add New'
                on_press: root.manager.current = 'screen_add'
<ScreenManagement>:
    id: screen_manager
    HomeScreen:
        name: 'screen_home'
        manager: 'screen_manager'
    AddScreen:
        name: 'screen_add'
        manager: 'screen_manager'
<HomeScreen>:
    BoxLayout:
        orientation: "vertical"
        MyRecycleView:
<MyRecycleView>:
    viewclass: 'Label'
    RecycleBoxLayout:
        color: 1,1,1,1
        default_size: None, dp(56)
        default_size_hint: 1, None
        size_hint_y: None
        height: self.minimum_height
        orientation: 'vertical'
<AddNewForm>:
    text_input: input
    TextInput:
        id: input
        pos: root.center_x - 220, 300
        size: 400,50
    Button:
        size: 130,40
        pos: root.center_x - 100, 200
        text: 'Submit'
        on_release: root.submit_input()
```

The `AddNewForm` contains a function `submit_input` that makes a post request to our server passing the input text as data.
The form has a textinput that one can type the task, and a button that calls the `submit_input` function when released.
We then declare a `BoxLayout ` class that will contain the `AddNewForm` and a label text "Add to list..."

When you now click `Add New` you should now see the following:

![Creating a task](/engineering-education/content/articles/using-djnago-in-kivy-application/creating_a_task.png)

When you create a task, say "Complete application" and click submit button once and click `Home`, you should have the following:

![Task submitted successfully](/engineering-education/content/articles/using-djnago-in-kivy-application/task_submitted_successfully.png)

### Conclusion
In this tutorial, we have covered the basics of kivy by  creating a simple todo kivy appication that allows one to view and add tasks. We have also seen how we can use Django as a back-end for our application by creating a server that holds our tasks. With this knowledge, you can create similar applications to suit your different needs.

### Further reading
The following are important links that will help you create kivy applications and build APIs using Django and the Django REST framework:
1. [Kivy documentation](https://kivy.org/doc/stable/)
2. [Django documentation](https://docs.djangoproject.com/en/3.2/)
3. [Django REST framework documentation](https://www.django-rest-framework.org/)



