---
layout: engineering-education
status: publish
published: true
url: /django-unit-testing/
title: Getting Started with Django unit testing
description: This tutorial will go over the basics of Django unit testing. It explains how to write unit tests for various components like `view`, `models` and `API views`.
author: quinter-awuor
date: 2021-07-14T00:00:00-20:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/django-unit-testing/hero.png
    alt: Getting Started with Django unit testing image
---

Testing is an essential step in the software development process. Many software developers ignore this step and test their code manually.
<!--more-->
Manual testing of code becomes tedious as the application size grows. Unit tests ensure that every component you add to your application works as expected without breaking the functionality of other features.

This tutorial will go through a simple Django application that allows school administrators to store admitted students' information. We will write unit tests for the various components in our application.

### Table of contents
- [Prerequisites](#prerequisites)
- [Project Set up](#project-set-up)
- [Models](#models)
- [Serializer](#serializer)
- [View](#view)
- [API View](#api-view)
- [URLs](#urls)
- [Template](#template)
- [Writing Unit Tests](#writing-unit-tests)
- [Testing Views](#testing-views)
- [Testing Models](#testing-models)
- [Testing API Views](#testing-api-views)
- [Conclusion](#conclusion)

### Prerequisites
1. [Python](https://www.python.org/) installed on your computer.
2. Knowledge of [Django](https://www.djangoproject.com/) framework.

### Project Set up
1. Create a new Django project by executing the command below.
        
```bash
$ django-admin startproject djangotesting
```
- The above command generates a Django application named `djangotesting`.

2. A Django project is usually organized into applications. This makes it easy to manage larger projects. Let's create a new Django application in our project by executing the command below.
        
```bash
$ python manage.py startapp testing
```

3. Add `django restframework` to the application by executing the command below.

```bash
$ pip install djangorestframework
```

- Once `djangorestframework` is installed in our application, we need to add it to the `settings.py` file in the `INSTALLED_APPS` list as shown below.

```python
# code
INSTALLED_APPS = [
 'django.contrib.admin',
 'django.contrib.auth',
 'django.contrib.contenttypes',
 'django.contrib.sessions',
 'django.contrib.messages',
 'django.contrib.staticfiles',
 'testing.apps.TestingConfig',
 'rest_framework'
]   
```

### Models
In the `models.py` file, add the code snippet below.
        
```python
# models.py
class Student(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    reg_number = models.CharField(max_length=50)
    date_of_admission = models.DateField(null=True, blank=True)

    def get_absolute_url(self):
        return reverse("student-detail", args=[str(self.id)])

    def __str__(self):
        return f"Name: {self.first_name} {self.last_name}"
```

The code snippet above contains a Student model created in the database as a student table. The model has two methods:-
1. `get_absolute_url(self):` returns the URL to a specific student detail page.
2. `__str__(self):` returns a string with students' first and last names.

### Serializer
In the `testing` application, create a new Python file named `serializers.py` and add the code below. 

```python
# serializers.py
class StudentSerializer(ModelSerializer):
     class Meta:
         model = Student
         fields = "__all__"        
```

The code snippet above converts the `Student` model to a JSON and vice versa. JSON data is easy to transmit over HTTP. That's why the data is converted to JSON.

### View
In the `views.py` file, add the code snippet below.

```python
class StudentListView(generic.ListView):
     model = Student
     paginate_by = 10 # the number of students to return in each page
        
        
class StudentView(generic.DetailView):
     model = Student      
```

The code snippet above has two view classes:-
1. `StudentListView` that returns a list of students.
2. `StudentView` that returns detailed information about the student.
        
### API View
Create a new python file named `api_views.py` in the `testing` application and add the code snippets below.

```python
# api_view.py
class CreateStudentApiView(generics.CreateAPIView):
     queryset = Student.objects.all()
     serializer_class = StudentSerializer
        
```
The above code snippets contain a class that allows the creation of students through a REST API.
        
### URLs
In the `testing` application, create a new python file named `urls.py` and add the code snippets below.

```python
# testing/urls.py
urlpatterns = [
 path('students', StudentListView.as_view(), name="students"),
 path('students/create', CreateStudentApiView.as_view(), name="create-student"),
 path('students/<int:id>', StudentView.as_view(), name="student-detail")
]
```

The above code snippets contain the paths to various views in the application.
        
> Make sure to update the `testing` application URLs in the root project `urls.py` file as shown below.

```python
# djangotesting/urls.py
urlpatterns = [
 path('admin/', admin.site.urls),
 path('', include('testing.urls'))
]
```     
### Template
1. In the project directory, create a new directory named `templates`.
2. In the `templates` directory created above, create another directory named `testing`. This will hold template files for the `testing` application.
3. Create a new HTML file named `student_list.html` in the `testing` directory within the templates directory and add the code snippet below.
        
```html
<!-- testing/student_list.html -->
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>Hello, world!</title>
</head>

<body>
    <div class="container" style="margin-top: 100px;">
        <table class="table">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Reg. No.</th>
                </tr>
            </thead>
            <tbody>
                <!-- prints out the students details in a table -->
                {% for student in student_list %}
                <tr>
                    <th scope="row">{{ student.id }}</th>
                    <td>{{ student.first_name }}</td>
                    <td>{{ student.last_name }}</td>
                    <td>{{ student.reg_number }}</td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </div>


    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
</body>

</html>
```

Run the application to ensure everything is working correctly by executing the commands below.

```bash
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```
### Writing Unit Tests
We are going to start by writing tests for our views. In the `testing` application, create a new python package named `tests`.
        
#### Testing Views
In the `tests` package created above, create a new python file named `tests_views.py`.

> **Note** It is a convention that the test files should begin with the word tests.

Add the code snippet below to the `tests_views.py` file created above.
```python
### test_views.py
class StudentListViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        number_of_students = 30
        for student_id in range(number_of_students):
            Student.objects.create(first_name=f"John{student_id}", last_name=f"Doe{student_id}")

    def test_url_exists(self):
        response = self.client.get("/students")
        self.assertEqual(response.status_code, 200)

    def test_url_accessible_by_name(self):
        response = self.client.get(reverse('students'))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('students'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'testing/student_list.html')

    def test_pagination_is_correct(self):
        response = self.client.get(reverse('students'))
        self.assertEqual(response.status_code, 200)
        self.assertTrue('is_paginated' in response.context)
        self.assertTrue(response.context['is_paginated'] is True)
        self.assertEqual(len(response.context['student_list']), 10)

```

- `setUpTestData(cls)` method is marked ` @classmethod` since its executed first when the class is executed. Within this function, we create student objects stored in a temporary test database and used throughout the test class.
- `test_url_exists` method makes a HTTP request to the provided path and checks if the result code is successful.
- `test_url_accessible_by_name` methods construct a URL from the given name and make a HTTP request to the created URL, then checks the status code of the request.
- `test_view_uses_correct_template` method checks if the correct template is loaded when the specified path is visited.
- `test_pagination_is_correct` method tests if the data returned is paginated.
        

#### Testing Models
in the `test` package, create a new file named `test_models.py` and add the code snippets below.

```python
# test_models.py
class StudentModelTestcase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Student.objects.create(first_name="Peter", last_name="John", reg_number="111b2")

    def test_string_method(self):
        student = Student.objects.get(id=1)
        expected_string = f"Name: {student.first_name} {student.last_name}"
        self.assertEqual(str(student), expected_string)

    def test_get_absolute_url(self):
        student = Student.objects.get(id=1)
        self.assertEqual(student.get_absolute_url(), "/students/1")
```

In the above test code:-
- `setUpTestData` method sets up the object that will be used throughout the test class.
- `test_string_method` method tests whether the string returned from the `__str__` method of the `Student` model is valid.
- `test_get_absolute_url` method tests if the absolute URL returned from the model is valid.

#### Testing API Views
In the `tests` package, create a new Python file named `tests_api_view.py` and add the code snippets below.

```python
# test_api_view.py
class StudentSerializerTestCase(APITestCase):
    def student_creation_test(self):
        payload = {
            "first_name": "Joan",
            "last_name": "Keith",
            "reg_number": "Abrt1",
            "date_of_admission": datetime.date.today()
        }
        response = self.client.post(reverse("student-create"), payload)
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)      
```

In the above code snippet, we only have one method:-
- `student_creation_test` to test the student creation endpoint. In the method, we create a payload containing all the data required to create a student and then make a POST request to the `students/create` endpoint with the payload.
        

> **Note** in the test_api_view we used `APITestCase` from restframework instead of using `TestCase` from django.

To run our tests, execute the command below in the terminal within the current working directory.

```bash
$ python manage.py test

Creating test database for alias 'default'...
System check identified no issues (0 silenced).
../home/quinter/PycharmProjects/djangoTest/venv/lib/python3.8/site-packages/django/views/generic/list.py:86: UnorderedObjectListWarning: Pagination may yield inconsistent results with an unordered object_list: <class 'testing.models.Student'> QuerySet.
  return self.paginator_class(
----------------------------------------------------------------------
Ran 6 tests in 0.044s

OK
Destroying test database for alias 'default'...
```
From the results above, we can see that all of our six tests were run and they passed.
                
### Conclusion
Now that you have learned how to write a unit test for various components in a Django application, create a RESTful endpoint for our book student admission application and add unit tests for the serializers and the API views.

You can download the full source code [here](https://replit.com/@qawuor/djangotests#).

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
