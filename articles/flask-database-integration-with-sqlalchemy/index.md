### Flask Database Integration With SQLAlchemy
Databases are integral components of building web applications. Throughout the lifecycle of a web application, the user sends bits of data that are needed to be stored for future reference purposes. Simultaneously, the user also requests information from where they are stored.

Data and information are facets that make web applications valuable. If the user can’t send or receive data from your web application, then it’s not providing value in its usage. Therefore, the information supplied by the user has to be stored in a database so it can be accessed later.

In Flask web applications, to manipulate databases, we will be using SQL and Object Relational Mapping (ORM). An ORM makes writing SQL queries easier for a programmer, because it enables us to write queries in an object-oriented language, and then ORM automatically translates it to SQL and retrieves the result in the form of an object.

### Prerequisite
The prerequisites for this article include:
- Basic usage and implementation of a Flask web app.
- Understanding of Object-Oriented Programming concepts with Python.
- Understanding of Flask views and templates.
- Intermediate knowledge with the use of terminal.
- Basic understanding of databases.

### Table of contents
- [Setting up the work environment](#setting-up-the-work-environment)
- [Install and setup SQLAlchemy](#install-and-setup-sqlalchemy)
- [Database relationship](#database-relationship)
- [One to many relationship](#one-to-many-relationship)
- [Creating a model in Flask](#creating-a-model-in-flask)
- [Storing user registration data with SQLAlchemy](#storing-user-registration-data-with-sqlalchemy)
- [Adding user data to registration database](#adding-user-data-to-registration-database)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Setting up the work Environment
Before we can work with the SQLAlchemy library, we need to have a Flask application running. To make the process easier, we will clone a Flask web application used in a previous tutorial that already has the registration form templates and routes all setup.

We proceed to clone the starter pack file from [this](https://github.com/corpsgeek/flask-form-handling.git) Github repository.
```bash
$ git clone https://github.com/corpsgeek/flask-form-handling.git
```
Change the directory to the cloned folder and install the packages in the `requirement.txt` file using the command:
```bash
$ pip install -r requirement.txt
``` 
We also need to set up the flask develop environment, where the default state is the production environment.

```bash
$ export FLASK_ENV="DEVELOPMENT"
```

The above terminal command sets the Flask environment as a development environment. Now, we can run our flask app using the following command:

```bash
$ flask run
```

Our flask web application should be live, follow the host URL(127.0.0.1:5000) and you should be able to view the homepage displaying “Hello world”. Navigate to the registration route `127.0.0.1:5000/register` to view the registration page.

### Install and Setup SQLAlchemy
To work with SQLAlchemy, we need to install the SQLAlchemy library first.

```bash
$ pip install SQLAlchemy
```
With SQLAlchemy installed, to work with it on our application, we have to import the SQLAlchemy class from the `flask_sqlalchemy` module in the main application file of our project, which is the `__init__.py` file in our `app` folder.

```python
# import sqlaclhemy from the flask_sqlachemy module
from flask_sqlalchemy import SQLAlchemy
```

Next, proceed to configure the variable to the database file. In this case, we are using the SQL database, therefore we make use of SQLite to run queries through our database.

```python
# set the database uniform resource identifier for the database
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///registration.db'
``` 
In the code above, the SQLite uniform resource indicator will receive the name of the database, which in our case is `registration.db`. With this setup, we have to initialize the database connection by creating an object of the SQLAlchemy class, then we pass our application as a parameter.

```python
# create an instance of the database module
db = SQLAlchemy(app)
``` 
By following the process above, we have our database initialized and ready to work with, but we can’t add data to this database because it has no tables or columns, neither has it been created for user registration data to be stored. 

However, to solve this problem we have to start working with database models for the application. 

In the process of creating models, we find that some models do have some relationship to one another or with other data, e.g a user might have a specific ID, such that this specific ID also refers back to the user, but how do we tell the database about the existence of this symbiotic relationship? To do this, we first need to understand the basic database relationship and how they are being initialized in our models.

### Database Relationship
In the process of working with databases, the following are the two types of relationship that you would frequently interact with when working with tables:
- One to Many
- One to One

In our understanding of the various database relationships, consider the creation of a Pet management system. The application will consist of the following models: PetHandler, PetCategory, PetComment and the implementation of this model is as follows:
```python
# pet handler class 
class PetHandler(db.Model):
   # create handler id column
   handler_id = db.Column(db.Integer, primary_key = True)
  
   # create handler name column
   handler_name = db.Column(db.String(150), nullable = False)

# pet category class 
class PetCategory(db.Modle):
   # create pet id column
   pet_id = db.Column(db.Integer, primary_key = True)
  
   # create pet name column
   pet_name = db.Column(db.String(100), nullable = False)
  
   # create pet category column
   pet_category = db.Column(db.String(50), nullable = False )
 
class PetComnment(db.Model):
   # create comment id column
   comment_id = db.Column(db.Integer, primary_key = True)
   # create comment content column
   comment_content = db.Column(db.String(200), nullable = False)
```
You might not understand the implementation of the above code, but focus on the concept of database relationship, we will get to the point of you understanding the components of creating a database.

### One-to-Many Relationship
From our Pet management system as an analogy, an example of a one-to-many relationship is analyzed between a Pet Handler and a Pet in the Pet Category, such that a pet handler can be assigned to multiple (many) pets to care for. 

The representation of this relationship in our model is by following this process:

We create a column containing a `ForeignKey()` in the `PetCategory` class. Simply, the pet handler is the attribute having multiple relationships with the pets, therefore the pets will have a column consisting of a `ForeignKey()` to the pet handler's unique identify key which is the pet handler’s id.

```python
# create pet category table
class PetCategory(db.Model):
    # create pet id, name, category column
    pet_id = db.Column(db.Integer, primary_key = True)
    pet_name = db.Column(db.String(100), nullable = False)
    pet_category = db.Column(db.String(50), nullable = False )
    
    # create a handler id column establishing a relationship with the foreign key class table
    handler_id = db.Column(db.Integer, db.ForeignKey('pethandler.handler_id'), nullable = False)
```

The last line of code, with the handler_id variable name, initializes the existence of a one-to-many relationship from the pet handler to the pets. The db.ForeignKey receives an argument pointing to the handler_id column in the pethandler table. Note that the pethandler class name has to be in lowercase which tells SQLAlchemy that we are referring to a table.

Now, the pets are aware of a relationship from the handlers, but the handler table isn’t yet aware of any relationship with any table. To do this, we have to add a line of code to the pethandler class:

```python
# create pet handler table
class PetHandler(db.Model):
    # create pet handler id and handler name column
    handler_id = db.Column(db.Integer, primary_key = True)
    handler_name = db.Column(db.String(150), nullable = False)
    
    # initialize the relationship from the pet handler table with pet category table 
    pet_category =  db.relationship('PetCategory', backref='pet_handler', lazy = True)
``` 
In the pet handler class, we wrote the code to inform the handler that it has a relationship with the PetCategory table. The backref argument creates a pet_handler virtual variable in the PetCategory table, such that we can access the handler of the pet by using PetCategory.pet_handler.

### Creating a Model in Flask
With a firm understanding of the two most common database relationships, we can proceed with the creation of models in our Flask web app for storing registration data of users.

To define a model, we follow the template below:

```python
Class ModelTableName(db.Model):
    #table column unique id with a primary key
    data_column_uniqueid = db.Column(db.Integer, primary_key = True)
    
    #table column field with data type
    data_column_field = db.Column(db.ColumnDataType, nullable = False) 
```
In the process of defining a model, a model must have a unique ID, which serves as its primary key and that’s the first thing you define in your model table. Next, you can proceed to define another data field for your table.

 Also, in each column, you have to specify a data type(String, Integer, and other data types that fit the data being stored). It is also a good practice to set nullable to false on data fields if you know they shouldn't be empty.

Implementation of the above template is as follows:

```python
Class UserDetails(db.Model):
    # table column id
    User_id = db.Column(db.Integer, primary_key = True)
    
    # table column name with data type of String
    user_name = db.Column(db.String, nullable = False) 
```

### Storing User Registration Data With SQLAlchemy
We now have a firm understanding of the implementation of SQLAlchemy, now, let’s delve into some practical application through our cloned flask web app, let’s navigate to the registration route in our browser http://127.0.0.1:5000/register.

From our page, we can see that there are three data fields, which consist of the username, email, and user password. For the scope of this article, we won’t be delving into password encryption, we would be storing our password in plain format (although not a good practice).

### Creating User Registration Model
In the app folder, create a new file and name it models.py. In our models file, this is where we define the models for the user registration form.

In our model, we start by importing the db object we initialized in our app __init__.py file

```python
 # import the db object from the flask app
 from app import db
```

Next let’s create the User model to handle the registration form data for the username, email, and password.

```Python 
 from app import db

# create user table with required field
class User(db.Model):
    id = db.Column(db.Integer, primary_key =True)
    username = db.Column(db.String(100), nullable = False)
    user_email = db.Column(db.String(100), nullable= False)
    user_password = db.Column(db.String(150), nullable = False)
```
In the model declaration, you can observe the arguments passed to the String data type, they simply are the length of data I expect the user to not surpass. 

Next, in our __init__.py file, beneath the database object initialization, we import the models file. The reason for this is that when we create our database, Flask will not be able to access the database models in our models.py file, therefore we have to draw it back into the app initialization file for the database object to be aware of its existence.

```python
# import the models module
from app import models
```
At this point, your __init__.py file should look like this:

```python
# import flask and sqlaclhemy
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)

# app configuration
app.config["SECRET_KEY"] = '571ebf8e13ca209536c29be68d435c00'
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///registration.db'
db = SQLAlchemy(app)

# import views/routes and models
from app import views
from app import models
```

And your models.py file should look exactly like this;

```python
#import db object from flask pp
from app import db

# databse tables
class User(db.Model):
   id = db.Column(db.Integer, primary_key =True)
   username = db.Column(db.String(100), nullable = False)
   user_email = db.Column(db.String(100), nullable= False)
   user_password = db.Column(db.String(150), nullable = False)

```

We have the data models created, let’s now create this database for usage, to do this, we need to open our terminal to our working directory and follow this process:

Initialize the Python interpreter
```bash
$ python
```
Next, import the database variable from the __init__.py file where we initialized the SQLAlchemy instance of the object, then create the database.

```bash
# import db object and create all tables in the database from the models file
$>> from app import db
$>> db.create_all()
```
Remember that the database variable is the variable name we used in our __init__.py, if you intend to use a different variable, you have to call that variable name itself and not the database variable created here.

To confirm our database is created, check your app folder, you should see a new file title registration.db, which is the db name we specified in our __init__.py file.

Next, we can import the User table in our models file, via this command

```bash
# import the user table from the models
$>> from app.models import User
```
 To ensure the functionality of the database is intact, let’s create a dummy user from the python interpreter

```bash
# create an instance of a user with required arguments from the database table
>>> user1 = User(username = "Demo User", user_email = "demouser@gmail.com", user_password = "demouserpassword")
```
In the above command, we specified the data for each variable defined in our User models, now hit the enter key. Next, we have to add the new user to the database, then commit the changes

```bash
# add the user instance to the database
>>> db.session.add(user1)
```
Next, we commit the changes made to our database
```bash
# commit the changes to the database
>>> db.session.commit()
```
To confirm our database works, if we query the database it should return an object of the new user manually added to the registration database:

```bash
# query all data from the User table
>>> User.query.all()
```
Note that we are querying the User table. Now, we can add data manually to the registration database, but how do we add data to the database when the user submits data through the frontend?

### Adding User Data To Registration Database
In our views, we start by importing the User model and the db object from our app.

```python
# import db object and User table
from app import db
from app.models import User
```
In our registration route logic, we create a user object and store our fetched data from the previous tutorial in the User models column.

```python
@app.route("/register", methods=["GET", "POST"])
def register():
    # check the request method to ensure the handling of POST request only
    if request.method == "POST":
        # store the form value
        user_name = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]
        
        # create an instance of the user table
        user = User(username = user_name, user_email = email, user_password = password)
        
        return username + " <br/> " + email
    return render_template('register.html')
```
Next, we add the user and commit the changes to the database and we replace the return statement with “User registration successful”. By the end of the implementation, your registration route should like this.

```python

@app.route("/register", methods=["GET", "POST"])
def register():
    #check the request method to ensure the handling of POST request only
    if request.method == "POST":
        #store the form value
        user_name = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]
        
        # store the user details in the user database table
        user = User(username = user_name, user_email = email, user_password = password)
        
        # add the user object to the database
        db.session.add(user)
        
        # commit changes to the database 
        db.session.commit()
        
        return 'User registration successful'

    return render_template('register.html')

```

### Test Running Our App
Let’s test run our app. If you have the server running, terminate and restart. Now, you should have your server running, then proceed to the registration page on your web app. Let’s fill the data with this dummy data: username = Peter, email = peterdury@gmail.com, password= password.

![Registration successful](/engineering-education/flask-database-integration-with-sqlalchemy/response.png)


We received the registration successful message, but let’s check the database to check if our user data is stored.

```bash
# import db and User table
>>> from app import db
>>> from app.models import User

# query User table
>>> User.query.all()
[<User 1>, <User 2>]
```
When you run the following command in sequential order, you should get a response indicating the new User added. In our case, we add a user when we added one manually, and due to the registration, we now have a new user.

Let’s delve deeper and run a new command to query the User table by the username of the registered user.

```bash
# store queried data in the user_data variable
>>>> user_data = User.query.all()
# loop through the user data
>>>> for user in user_data:
      # print user username in the User table
….    print(user.username)
Demo user
Peter
```
If you run the statement in sequential order, you should get the username data of all registered users in the database.

### Summary
This article has covered the usage of SQLAlchemy in building Flask Web applications, storing data, accessing stored data through the Python interpreter, database modelling and the understanding of database relationships. 

We also covered the types of database relationships that could exist in building database models. 

### Further Reading and References
I recommend you look up how to implement a Many-to-Many database relationship [here](https://flask-sqlalchemy.palletsprojects.com/en/2.x/models/).

### Conclusion
As a practice test to improve your skills, try creating a contact form in your flask web app, and then store the content in your custom database. 

You can find the codebase for this article [here](https://github.com/corpsgeek/flask-sqlalchemy).
