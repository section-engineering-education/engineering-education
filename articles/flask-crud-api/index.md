In this tutorial, we will create a fully working Restful API with flask and Mysql database. Restful APIs makes it possible to establish communication between the backend and the frontend mobile and web applications, we will be using Flask-SQLAlchemy. Flask-SQLAlchemy is an extension python library for the flask web framework that adds SQLAlchemy to the flask project. SQLAlchemy is an Object Relational Mapper that provides access to SQL databases through python objects.

### Prerequisites
1. [Python](https://www.python.org/downloads/) installed on your computer.
2. [Postman](https://www.postman.com/downloads/) installed on your computer.
3. [Apache XAMPP](https://www.apachefriends.org/download.html) installed on your computer.
4. Favourite IDE installed. I use [Pycharm](https://www.jetbrains.com/pycharm/download/).
5. Basic [Python](https://www.w3schools.com/python/) knowledge. 

### Project setup
On the terminal execute the below command to create the projects' working directory and move into that directory.
```bash
$ mkdir flasktodo
cd flasktodo
```
In the projects' working directory execute the below command to create a virtual environment for our project. Virtual environments make it easier to manage packages for various projects separately.
```bash
$ virtualenv venv
```
To activate our virtual environment, execute the below command.
```bash
$ source venv/Script/activate
```
Once the virtual environment has been activated, we need to install flask and flask-SQLAlchemy into our virtual environment using the below command.
```bash
(venv)$ pip install flask flask-sqlalchemy
```
We now need to install PyMySQL, a driver that allows for connection to the MYSQL database in python. Execute the below command to install PyMySQL.
```bash
(venv)$ pip install pymysql
```
Lastly, we need to install flask-marshmallow and marshmallow libraries which eases the work of converting Python objects to JSON and JSON to Python objects. To install flask-marshmallow and marshmallow run the below command.
```bash
(venv)$ pip install flask-marshmallow marshmallow
(venv)$ pip install marshmallow_sqlalchemy
```

Open the project folder in your favorite IDE and create a new file name `app.py` in the project folder.

Paste the below code into the `app.py` file created above.
```python
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema
```

In the above section, we import all of the required modules that we will use in our application.
`from flask import Flask` imports the Flask web module that we use to create an instance of the Flask web application.
`from flask_sqlalchemy import SQLAlchemy` imports SQLAlchemy module which we use to connect to the database.
`from marshmallow import fields` and `from marshmallow_sqlalchemy import ModelSchema` imports the modules that we will use to serialize Python objects.

### Project configuration
In this section, we create an instance of the flask application, setup the database configurations and create a database object.
```python
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/todo'
db = SQLAlchemy(app)
```
`app = Flask(__name__)` creates an instance of the flask web application.

`app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://<username>:<password>@localhost:
<database port>/<database name>'
` contains the information required to connect to our database. Our database username is `root` ,the password is ` ` ,the database port is `3306` and the database name is `todo`.

On your computer start the XAMPP control panel, start the apache and MySQL servers then visit `http://localhost/phpmyadmin/index.php` in your browser and create a database with the name `todo`.

`db = SQLAlchemy(app)` creates an object of the SQLAlchemy and stores it in a variable `db`.

### Creating the Todo model
We are going to the `Todo` model which will be a Python class representing the `Todo` table in the database.

```python
# Model
class Todo(db.Model):
    __tablename__ = "todos"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20))
    todo_description = db.Column(db.String(100))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, title, todo_description):
        self.title = title
        self.todo_description = todo_description

    def __repr__(self):
        return f"{self.id}"


db.create_all()
```
`Todo` model class has an id property which is used as the primary key.</br> 
`db.create_all()` makes the application to create all the defined tables in the database.</br> 
`db.session.add(self)` adds the `Todo` instance into the SQLAlchemy database connection session.</br> 
`db.session.commit()` executes all the database operations that are available in the session.

```python
class TodoSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Todo
        sqla_session = db.session

    id = fields.Number(dump_only=True)
    title = fields.String(required=True)
    todo_description = fields.String(required=True)
```
The `TodoSchema` class above makes it possible to return JSON from the Python objects from the SQLAlchemy.

### Creating the API endpoints

**GET endpoint**
```python
@app.route('/api/v1/todo', methods=['GET'])
def index():
    get_todos = Todo.query.all()
    todo_schema = TodoSchema(many=True)
    todos = todo_schema.dump(get_todos)
    return make_response(jsonify({"todos": todos}))
```
`@app.route('/api/v1/todo', methods=['GET'])` defines the URL to the endpoint and the HTTP method allowed for the endpoint.
The above endpoint returns a list of `todos`.
`get_todos = Todo.query.all()` queries all the `todos` from the database.
`todo_schema = TodoSchema(many=True)` and `todos = todo_schema.dump(get_todos)` serializes the objects from SQLAlchemy.
`return make_response(jsonify({"todos": todos}))` returns a list of `todos` as JSON.

```python
@app.route('/api/v1/todo/<id>', methods=['GET'])
def get_todo_by_id(id):
    get_todo = Todo.query.get(id)
    todo_schema = TodoSchema()
    todo = todo_schema.dump(get_todo)
    return make_response(jsonify({"todo": todo}))
```
The above endpoint allows for a GET request passing in the id of the `Todo` in the URL path. It returns a single `Todo` with the specified id.

**POST endpoint**
```python
@app.route('/api/v1/todo', methods=['POST'])
def create_todo():
    data = request.get_json()
    todo_schema = TodoSchema()
    todo = todo_schema.load(data)
    result = todo_schema.dump(todo.create())
    return make_response(jsonify({"todo": result}), 200)
```
The above endpoint allows for a POST request and creates a new `Todo` in the database.
`data = request.get_json()` gets the data from the request body.

**PUT endpoint**
```python
@app.route('/api/v1/todo/<id>', methods=['PUT'])
def update_todo_by_id(id):
    data = request.get_json()
    get_todo = Todo.query.get(id)
    if data.get('title'):
        get_todo.title = data['title']
    if data.get('todo_description'):
        get_todo.todo_description = data['todo_description']
    db.session.add(get_todo)
    db.session.commit()
    todo_schema = TodoSchema(only=['id', 'title', 'todo_description'])
    todo = todo_schema.dump(get_todo)
    return make_response(jsonify({"todo": todo}))
```
The above endpoint allows for a PUT request and updates the `Todo` with the specified id in the database.

**DELETE endpoint**
```python
@app.route('/api/v1/todo/<id>', methods=['DELETE'])
def delete_todo_by_id(id):
    get_todo = Todo.query.get(id)
    db.session.delete(get_todo)
    db.session.commit()
    return make_response("", 204)

```
The above endpoint allows for DELETE request deleting the `Todo` with the specified id in the database.

**Complete source code**
```python
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/todo'
db = SQLAlchemy(app)


# Model
class Todo(db.Model):
    __tablename__ = "todos"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(20))
    todo_description = db.Column(db.String(100))

    def create(self):
        db.session.add(self)
        db.session.commit()
        return self

    def __init__(self, title, todo_description):
        self.title = title
        self.todo_description = todo_description

    def __repr__(self):
        return f"{self.id}"


db.create_all()


class TodoSchema(ModelSchema):
    class Meta(ModelSchema.Meta):
        model = Todo
        sqla_session = db.session

    id = fields.Number(dump_only=True)
    title = fields.String(required=True)
    todo_description = fields.String(required=True)


@app.route('/api/v1/todo', methods=['GET'])
def index():
    get_todos = Todo.query.all()
    todo_schema = TodoSchema(many=True)
    todos = todo_schema.dump(get_todos)
    return make_response(jsonify({"todos": todos}))


@app.route('/api/v1/todo/<id>', methods=['GET'])
def get_todo_by_id(id):
    get_todo = Todo.query.get(id)
    todo_schema = TodoSchema()
    todo = todo_schema.dump(get_todo)
    return make_response(jsonify({"todo": todo}))


@app.route('/api/v1/todo/<id>', methods=['PUT'])
def update_todo_by_id(id):
    data = request.get_json()
    get_todo = Todo.query.get(id)
    if data.get('title'):
        get_todo.title = data['title']
    if data.get('todo_description'):
        get_todo.todo_description = data['todo_description']
    db.session.add(get_todo)
    db.session.commit()
    todo_schema = TodoSchema(only=['id', 'title', 'todo_description'])
    todo = todo_schema.dump(get_todo)
    return make_response(jsonify({"todo": todo}))


@app.route('/api/v1/todo/<id>', methods=['DELETE'])
def delete_todo_by_id(id):
    get_todo = Todo.query.get(id)
    db.session.delete(get_todo)
    db.session.commit()
    return make_response("", 204)


@app.route('/api/v1/todo', methods=['POST'])
def create_todo():
    data = request.get_json()
    todo_schema = TodoSchema()
    todo = todo_schema.load(data)
    result = todo_schema.dump(todo.create())
    return make_response(jsonify({"todo": result}), 200)


if __name__ == "__main__":
    app.run(debug=True)

```
To run our application, execute the command below in the command line.
```bash
$ flask run
```
### Testing the API endpoints
**GET endpoint**

![Get all todos](/engineering-education/flask-crud-api/get-todos.png)

![Get todo by id](/engineering-education/flask-crud-api/get-todo-by-id.png)

**POST endpoint**

![Create todo](/engineering-education/flask-crud-api/create-todo.png)

**PUT endpoint**

![Update todo](/engineering-education/flask-crud-api/update-todo.png)

**DELETE endpoint**

![Delete todo](/engineering-education/flask-crud-api/delete-todo.png)

### Conclusion
Now that you have learned how to create a CRUD API using flask, add the `date_created` and `last_modified` fields to our `Todo` model and make modifications to various API endpoints to include the added fields in the API requests and responses.

Happy Coding.
