## Implementing Flask API using Linked list Data Structure
![linked_list](/implementing-flask-api-using-linked-list/hero.jpg)

### Introduction
Understanding data structures is an important aspect when developing applications. As real-world applications consider space and time complexities when designing applications to save on the memory and time taken to run specific programs. Despite the useful trade-offs, they offer to the pool of developers, most rarely use them. These make their programs and software not being to the quality and standards expected and can make organizations incur huge losses in terms of budgeting for storage and consumer loading time of these applications.

In this article, we will build a hands-on Flask API using a Linked list data structure. In the process we will see how applicable these data structure is and the benefits a user can incur by using it.

### Table of Contents
1. [Prerequisites](#prerequisites)
2. [Introduction to Flask](#introduction-to-flask)
3. [Understanding Linked List data structure](#understanding-linked-list-data-structure)
4. [Implementing Flask API using Linked List](#implementing-flask-api-using-linked-list)
5. [Testing the API using Postman](#testing-the-api-using-postman)
6. [Conclusion](#conclusion)


### Prerequisites
Before we start building the application, you should have the latest version of [Python](https://www.python.org/downloads/) installed or at least version `Python 3.6+`. To help us install the necessary packages and dependencies you should have `pip` installed. If not check out the [link](https://pip.pypa.io/en/stable/installation/) to have it in your machine depending on your operating system. We will be using the DB Browser for SQLite to visually see our database and tables. You can download it from [here](https://sqlitebrowser.org/). For testing our APIs you'll need [Postman](https://www.postman.com/downloads/). Depending on your preference you can choose a text editor of your choice. There are a number ranging from [Visual Studio Code](https://code.visualstudio.com/download), [Atom](https://atom.io/), [Sublime](https://www.sublimetext.com/3), [Vim](https://www.vim.org/download.php) among others. For this tutorial, I will be using Ubuntu 20.04 and Vim as my text editor.  

### Introduction to Flask
Flask is a micro-framework of Python that is used to create custom web applications. It is lightweight and does not come with any bundled packages and dependencies enabling developers to be on the wheel while building any application on it. If you want to get into more details to understand how Flask works check the official [documentation](https://flask.palletsprojects.com/en/2.0.x/).

### Understanding Linked List data structure
A linked List is a linear data structure that includes a chain of connected nodes. Where each node stores the `data` and `address` of the next node.
You have to start at a certain point, so we give the address of the first node a special name called `head`. The last node in the linked list can also be identified as it points to `Null`.

Linked lists are of multiple types: `singly`, `doubly` and `circular linked list`. For this particular article, we will focus mainly on singly-linked lists. For more in-depth discussions on various types of linked lists visit this [article](https://www.javatpoint.com/ds-types-of-linked-list#:~:text=The%20following%20are%20the%20types,Circular%20Linked%20list).

Let's dive into implementing our linked list. Open your terminal and create a directory to hold our files. Then change to that directory and create a linked list file as shown below:

```bash
mkdir FlaskAPI
cd FlaskAPI
touch linked_list.py
```
In our linked list file write the code below:

```python
class Node:
def __init__(self, data=None, next_node=None):
self.data = data
self.next_node = next_node

class LinkedList:
def __init__(self):
self.head = None
self.last_node = None

def to_list(self):
  pass

def insert_beginning(self, data):
pass

def insert_at_end(self, data):
pass

def print_ll(self):
pass
```

We first begin by creating a Node class which we initialize with three parameters self, data, and next_node. The `self` keyword in Python represents a specific instance of a class and is used to access the attributes and methods of the class in Python. The `self.data` and `self.next_node` will either default to None or equals the value pass to data or next_node during the time of instantiation. The `__init__()` method is a constructor and it allows the class to initialize its attributes.

The `LinkedList()` class constructor takes `head` and `last_node` as its attribute and we assign them to None. We then create four methods `to_list()`, `insert_beginning`, `insert_at_end` ,and `print_ll` which we will implement in a moment.

With that said, let's visualize how a linked list works:

![linked_list](/implementing-flask-api-using-linked-list/linked-list.jpg)

The rectangles in the image above represent nodes in a linked list and each node has two separate compartments. The left compartment represents the data and has the string value Data in it. The right compartment represents the pointer that points to the next node. If we look at our Node class we see it has the data and next_node pointer as well. The `LinkedList()` wrapper class only helps us keep track of the head of our linked list. From the image above the first node in the linked list represents the head. So for instance, if we want to add to the head of our linked list as we'll see in a bit it will be easier to do so.

The `toList()` takes a returned linked list object and converts it into a list: The implementation is shown below:

```python
def to_list(self):
  l = []
  if self.head is None:
    return l
  node = self.head
  while node:
    l.append(node.data)
    node = node.next_node
  return l
```

First, we create an empty list. We then check if the head of the linked list is `None`. If so we return the empty list. If our head has a value it's appended onto the list and the node is assigned to the node's next node. We then return the list.

The `insert_beginning()` implementation is shown below:

```python
def insert_beginning(self, data):
new_node = Node(data, self.head)
self.head = new_node
```

We pass in `self` and `data` as arguments in the function. This means that if data is added at the beginning of our linked list, it assumes being the head and the current head becomes the next_node pointer. We then assign our `new_node` as the head using `self` to instantiate it.
We'll write a function to test this later, for now, let's proceed and implement the `insert_at_end()`.

```python
def insert_at_end(self, data):
if self.head is None:
return self.insert_beginning(data)

node = self.head
while node.next_node:
node = node.next_node
node.next_node = Node(data, None)
```

We check if the current head is none, if so we call the `insert_beginning()` to insert data and return it. The head value is assigned to `node` variable and we perform a while loop if the node's next node is true, we assign it to our node. If the `while` loop checks to false, it adds data to our node using the `Node` class.

Let's now write a function to test our two linked list functions:

```python
def print_ll(self):
ll_string = ''
node = self.head
if node is None:
print(None)
while node:
ll_string += f'{str(node.data)} ->'
node = node.next_node
ll_string += ' None'
print(ll_string)
```

We start by creating an empty string called `ll_string` then assign our head to a variable  `node`. If the node is none; empty, the console will print `None`. The `while` loop iterates through the block if the node is true. Data passed will be concatenated to the `ll_string` variable. The `->` is just for visualizing our linked list when it is printed. That particular node will become the node's next node. If our while loop is finished we add the `None` to the end of our linked list and print the string.

You can test this by creating a linked list instance as shown below:

```python
ll = LinkedList()

ll.insert_beginning(3)
ll.insert_beginning(7)
ll.insert_at_end(11)
ll.print_ll()
```

This will output:

```bash
7 -> 3 -> 11 -> None
```

Our whole linked list file will look like this:

```python
class Node:
def __init__(self, data=None, next_node=None):
  self.data = data
  self.next_node = next_node

class LinkedList:
def __init__(self):
  self.head = None
  self.last_node = None

def insert_beginning(self, data):
  new_node = Node(data, self.head)
  self.head = new_node

def insert_at_end(self, data):
  if self.head is None:
      return self.insert_beginning(data)

  node = self.head
  while node.next_node:
      node = node.next_node
  node.next_node = Node(data, None)

def print_ll(self):
  ll_string = ''
  node = self.head
  if node is None:
      print(None)
  while node:
      ll_string += f' {str(node.data)} ->'
      node = node.next_node

  ll_string += ' None'
  print(ll_string)

ll = LinkedList()
ll.insert_beginning(3)
ll.insert_beginning(7)
ll.insert_at_end(11)
ll.print_ll()
```
With the fundamentals of linked list grounded let's go ahead and create the API endpoints.

### Implementing Flask API using Linked List
Our Flask API will have four endpoints defined, that is `get_all_users_descending()`, `get_all_users_ascending()`, `get_user()` ,and `delete_user()`. First, we'll do the database configuration using and import the necessary packages to get our application started. In our `FlaskAPI` directory, create a file called `server.py`. It will hold the functionality of our API endpoints. Before we get to it let's install `Flask` and `Flask_SQLAlchemy` as shown below:

```bash
pip install Flask Flask-SQLAlchemy
```

We'll discuss them in the preceding chapters.
The code below shows the basic structure of our Flask app:

```python
from sqlite3 import Connection as SQLite3Connection
from flask import Flask, request
from sqlalchemy import event
from sqlalchemy.engine import Engine
from flask_sqlalchemy import SQLAlchemy

#app initialization
app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///sqlitedb.file"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = 0

# configure sqlite3 to enforce foreign key constraints
@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, connection_record):
if isinstance(dbapi_connection, SQLite3Connection):
  cursor = dbapi_connection.cursor()
  cursor.execute("PRAGMA foreign_keys=ON;")
  cursor.close()


db = SQLAlchemy(app)

#models
class User(db.Model):
pass

#routes
@app.route('/user', methods=['POST'])
def create_user():
pass

@app.route('/user/descending_id/', methods=['GET'])
def get_all_users_descending():
pass

@app.route('/user/descending_id/', methods=['GET'])
def get_all_users_ascending():
pass

@app.route('/user/<user_id>', methods=['GET'])
def get_user():
pass

@app.route('/user/<user_id>', methods=['DELETE'])
def delete_user():
pass

if __name__ == '__main__':
app.run(debug=True)
```
### Database Setup and API Skeleton
In our `server.py`, we first import `sqlite3`, `Flask`, `sqlalchemy`, `Flask_SQLAlchemy`, and `datetime`. The `Flask_SQLAlchemy` acts as an extension of `SQLAlchemy` to our application and allows us to play with the ORM and use the database in our application. The `SQLAlchemy` is the Python Object Relational Mapper(ORM) that gives our application full power and flexibility of SQL. The `event` and `Engine` we import from `sqlalchemy` are python database API that enables us to perform core event hooks to a particular connection. For more in-depth on how the ORM works check the [SQLAlchemy documentation](https://docs.sqlalchemy.org/en/14/).

The `sqlite3` will act as our database `SQLite` database so we import it and give it an alias `SQLite3Connection`.

We initialize our application by assigning the Flask instance to the `app` variable. This creates a flask object that implements the WSGI application and acts as the central registry for our application packages and modules. Setting the configuration dictionary allows us to specify the path to our database using the `SQLALCHEMY_DATABASE_URI`. The `SQLALCHEMY_TRACK_MODIFICATIONS` is set to True as Flask-SQLAlchemy tracks the modification of objects and emits signals.

The configuration of our database takes a `listens_for` decorator from the event API which accepts the `Engine` and `"connect"` as arguments. The `"connect"` identifies the event to be intercepted, and a user-defined listening function. The `_set_sqlite_pragma()` creates a connection based on our `sqlite3` database, enable the foreign key constraints, and closes the connection. For more on event registration check the [event documentation](https://docs.sqlalchemy.org/en/14/core/event.html).

The `db` variable creates the instance of our database.

Our application will have one model `User` which its adds their attributes in a few.

We define five functions that will handle various logic and takes different method parameters. The `create_user()` function takes the route decorator and we pass two arguments the `/user` and `POST` HTTP request. This HTTP method uses the `request` module we imported from the flask package to create a user.

The `get_all_users_descending()`, `get_all_users_ascending()`, and `get_user()` functions takes the `GET` HTTP request to get particular users with the given `id` in a descending and ascending order. The `get_user()` fetches a single user of any given `id`. The `delete_user()` function deletes a specified user with given `id` and uses the `DELETE` HTTP request.

We end our file by setting the debug mode to `True`. This will provide a useful debugger tool to track any errors in our application.

#### Models
Our `User` model will have various attributes as shown below:

```python
class User(db.Model):
  __tablename__ = 'users'
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(50))
  email = db.Column(db.String(200))
  address = db.Column(db.String(50))
  phone = db.Column(db.String(50))
```

The `__tablename__` overrides and sets the table name of our model. The `Column` keyword defines a column in our table. The `id` attribute takes the type `Integer` since a primary key cannot be of any other type. We then mark it True as the `primary_key`. The `name`, `email`, `address`, and `phone` take the `String` type and it takes the size parameter of maximum length.

We can now generate our database based on the model we created by running our file through the python shell by saving the file and going to the terminal and executing the commands below:

```bash
python
from server import db
db.create_all()
exit()
```
By typing the word `python` in the terminal it enters into an interactive shell and we then execute the preceding commands. If we now `ls` to list the contents of the `FlaskAPI` directory we're able to see a `sqlitedb.file` file and that's our database. We can go ahead and open it using the DB Browser for SQLite by clicking the `open database`. We can see the User model with its corresponding tables.

#### Routes
Let's begin by defining the `get_user()` function:

```python
@app.route('/user', methods=['POST'])
def get_user():
  data = request.get_json()
  new_user = User(
          name = data['name'],
          email = data['email'],
          address = data['address'],
          phone = data['phone']
  )
  db.session.add(new_user)
  db.session.commit()
  return jsonify({"message": "User created"}), 200
```

We had earlier covered what the decorator does. The `data` will hold our requests being parsed in JSON format using the `get_json()` Flask API function. The `new_user` variable is the instance of the User model and we assign its properties to the data in dictionary format. We then use add the instance to the database and commit it. If the user is created successfully a JSON formatted response will be displayed with the status `200`. We import the `jsonify` from the Flask's flask.json module. It serializes data to JavaScript Object Notation(JSON) format.  We'll test this in a bit using `Postman` in the next chapter for now let's create the routes.

In the `get_all_users_descending()`, `get_all_users_ascending()`, and `get_user()` we'll be using the linked list file that we created by importing the `LinkedList` class. So, in our `server.py` file import the `LinkedList` by:

```python
from linked_list import LinkedList
```

Let's now implement our endpoints.

```python
@app.route('/users/descending_id', methods=['GET'])
def get_all_users_descending():
  users = User.query.all()
  all_users_ll = LinkedList()
  for user in users:
    all_users_ll.insert_beginning(
        {
          'id':user.id,
          'name':user.name,
          'email':user.email,
          'address':user.address,
          'phone':user.phone,
        }
    )
  return jsonify(all_users_ll.to_list())
```

The `users` variable holds all the queried Users from the database. The `all_users_ll` will be the instance of the `LinkedList()`. We use a for loop to iterate through all the users using the `insert_beginning()` from the `LinkedList()` to insert at the beginning a dictionary that contains our user data. We then return the linked list by converting it into a list using the `to_list()`. This will return our users with the highest `id` on top.

The `get_all_users_ascending()` will be similar to the `get_all_users_descending()` but will use the `insert_at_end()` and return the user's `id` in ascending order. The implementation is as shown below:

```python
@app.route('/users/ascending_id', methods=['GET'])
def get_all_users_ascending():
  users = User.query.all()
  all_users_ll = LinkedList()
  for user in users:
    all_users_ll.insert_beginning(
        {
          'id':user.id,
          'name':user.name,
          'email':user.email,
          'address':user.address,
          'phone':user.phone,
        }
    )
  return jsonify(all_users_ll.to_list())
```

To get a specific user we'll use the `get_all_users_ascending()` with a `get_user_by_id()` that we'll create in a moment to retrieve that particular single user. Let;s go ahead and write the program:

```python
@app.route('/user/<user_id>', methods=['GET'])
def get_user(user_id):
  users = User.query.all()
  all_users_ll = LinkedList()
  for user in users:
    all_users_ll.insert_beginning(
        {
          'id':user.id,
          'name':user.name,
          'email':user.email,
          'address':user.address,
          'phone':user.phone
        }
    )
  user = all_users_ll.get_user_by_id(user_id)
  return jsonify(user), 200
```

The  `get_user()` takes in the `user_id` as an argument. After querying the users and iterating the data to a dictionary we pass the data to the `get_user_by_id()` and pass the same arguments. We then return the variable storing that particular user and serializing it to JSON format. The status `200` shows a success message. Now let's implement the `get_user_by_id()` and add it to `linked_list.py` file.

```python
def get_user_by_id(self, user_id):
  node = self.head
  while node:
    if node.data[id] is int(user.id):
      return node.data
    node = node.next_node
  return None
```

In this function, if our linked list has a head, it checks the id of that node's data to the passed `user.id`. If so, it returns that data, if not it moves to the next node. If that loop evaluates to false it returns `None`.

The last endpoint, `delete_user()` is pretty direct. It checks the passed `user_id` to the one filtered from the database. It's stored in a `user` variable. The variable is passed to the delete instance of the database and deletes it upon commit. It returns an empty JSON with the status `200`. The implementation is as below:

```python
@app.route('/user/<user_id>', methods=['DELETE'])
def delete_user(user_id):
  user = User.query.filter_by(id = user_id),first()
  db.session.delete(user)
  db.session.commit()
  return jsonify({}), 200
```

Next, we'll test our endpoints using a Postman.

### Testing the API using Postman
To begin the testing of our endpoints fire up `Postman` and also the `server.py` file by the `python server.py` command.
Once our application is running we open Postman and create a new collection and name it `flask api`. We then add a request called `create_user` and a `POST` request to it. To begin testing the `create_user()` we paste the running server and paste it to Postman and add the `/user` to appear like `http://127.0.0.1:5000/user`. We choose the `body` tab and select `raw` this enables us to select the `JSON` format for writing our data. We write our request payload in the canvas space using the User model attributes, `name`, `email`, `address`, and `phone`. The image below shows a snap of that endpoint.

![linked_list](/implementing-flask-api-using-linked-list/create-user.jpg)

We create at least five users to enable us to test other endpoints.
In order to avoid running into `sqlite3.OperationalError` close the DB Browser for SQLite when sending requests.

Performing the payload request `get_all_users_descending()`, `get_all_users_descending()`, and `get_user()` is easier as we just only specify the routes and select the `GET` request and send. This will perform the logic implemented in each function. The `get_all_users_descending` will fetch the users in descending order and `get_all_users_ascending` will perform the same in ascending order. The `get_user()` returns the payload of that particular `id` specified. The `delete_user()` deletes a user with the specified id passed for example if you want to delete a user with id 3, you pass `http://127.0.0.1:5000/user/3` with the `DELETE` request and send. If you check it in the DB Browser it won't be available.

### Conclusion
To recap on what this article has covered, we first introduce what Flask is and a few reasons why it is most preferred. We then got a better understanding of what linked lists are and implemented some of their use-cases. It then implemented the Flask API by first going through a basic Flask script and adding models and routes to it and finally implemented the core API endpoints using the LinkedList class. We later tested the endpoints created with Postman and used DB Browser for SQLite to visually check our database tables.

Happy Coding!!
