---
layout: engineering-education
status: publish
published: true
url: /building-a-debt-tracker-application-with-python-and-fauna/
title: Building a Debt Tracker Application with Python and Fauna
description: This tutorial will guide the reader through building a debt tracker application using Fauna. It will use Fauna to store data and use GraphQL to query the database.
author: geoffrey-mwangi
date: 2022-03-17T00:00:00-02:52
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/building-a-debt-tracker-application-with-python-and-fauna/hero.jpg
   alt: Building a Debt Tracker Application with Python and Fauna Hero Image
---
[Fauna](https://fauna.com) is a cloud-based database with two interfaces; GraphQL and Fauna Query Language (FQL). Databases can hold collections, indexes, and even other databases (multi-tenancy). 

Documents are located within collections and do not have special schema requirements. Fauna can handle a wide range of data types (including temporal), but it is most known for its relational data handling.

In this tutorial, we will build a debt tracker application using Fauna. We will use Fauna to store our data and use GraphQL to query it.

Let us get started!

### Prerequisite
To follow along with this tutorial, you are required to have the following:
- A text editor.
- Some knowledge of Python, Fauna, and Flask.
- Python installed.

### Table of Contents
- [Getting started with Fauna](#getting-started-with-fauna)
- [Creating a database in Fauna](#creating-a-database-in-fauna)
- [Creating a collection in Fauna](#creating-a-collection-in-fauna)
- [Creating an API key for the Fauna database](#creating-an-api-key-for-the-fauna-database)
- [Creating a Flask app](#creating-a-flask-app)
- [Connecting Python with Fauna](#connecting-python-with-fauna)
- [Saving data with Fauna](#saving-data-with-fauna)
- [Updating data in Fauna](#updating-data-in-fauna)
- [Conclusion](#conclusion)

### Getting started with Fauna
To begin using Fauna,  first, create an account on their [official website](https://dashboard.fauna.com/accounts/register)  using your email address.

### Creating a database in Fauna
After creating an account, we will create a database to store our data by going to the Fauna dashboard and clicking on the `CREATE DATABASE` button:

![create database](/engineering-education/building-a-debt-tracker-application-with-python-and-fauna/create-database.png)

Enter the desired name for the database and click `CREATE`.

### Creating a collection in Fauna
Fauna organizes its data into collections and uses indexes to search them. The user's collection, for example, comprises database user information and is similar to SQL tables in that it contains data with similar qualities.

Far from being a database, a collection is a container for documents. We will create a collection to store our data by going to the Fauna dashboard and clicking on the `create collection` button:

![create collection](/engineering-education/building-a-debt-tracker-application-with-python-and-fauna/create-collection.png)

The `History Days` are the numbers of days that you will wish Fauna to retain the history of your data. The default is 30 days, and you can change this number by entering a new number. The `TTL` is the expiration time of the data in the collection.

Enter a name for the collection and click `SAVE.`

### Creating a Fauna Index
The Fauna index is a way to search for specific data. For example, if you wanted to find all the users in the database, you could search for all the users by entering `users` in the search bar.

To create indexes, click on the `Indexes` tab and click on the `New Index` button:

![create indexes](/engineering-education/building-a-debt-tracker-application-with-python-and-fauna/create-indexes.png)

Here, you are supposed to choose the name of the collections to be searched and the index. 

`Terms` are the fields you want to search for from the collection. You can enter multiple terms by adding another field. In our case, we want to search for the `data.pending`. Once you are done, click `SAVE.`

### Creating an API key for the Fauna database
To access the database, we will need to generate an API key. Go to the Fauna dashboard and select the 'Security' tab, then the `NEW KEY` button:

![create api key](/engineering-education/building-a-debt-tracker-application-with-python-and-fauna/create-api-key.png)

After filling in the form, click `SAVE`. Fauna will provide the secret key to access the database.

### Installing Fauna Client
Fauna Client is a Python library that allows developers to access a database. To use Fauna Client, install the following packages via the terminal.

```bash
$ sudo apt install python3-pip
$ pip install faunadb
```

Install Flask bootstrap locally in your machine:

```bash
# Installing Flask
$ pip install Flask
# Installing Flask-Bootstrap
$ pip install Flask_Bootstrap4
```

### Project structure
We will create a working directory called `fauna-python-tutorial` and then create a `static` directory inside it to store our static files. We will also create a `templates` directory inside the working directory to store our templates. Finally, we will create our `app.py` file in the `fauna-python-tutorial` directory. 

The file structure should look as below:

```bash
.
├── static
│   ├── script.js
├── templates
│   ├── index.html
└── app.py
```

### Creating a Flask app
I have created a Flask application with the bootstrap user interface. Clone this repository by running the following commands:

```bash
$ git clone git@github.com:Jeff-mwangi/Debt-Tracker-Application-with-Python-and-Fauna.git
```

To run the app, we need to run the following command:

```bash
$ python3 app.py
```

We should see a default page that looks like this:

![dept-tracker](/engineering-education/building-a-debt-tracker-application-with-python-and-fauna/dept-tracker.png)

The default page is the home page of our app. We can add debt by clicking on the `Add Loan` button.

### Connecting Python with Fauna
In our `app.py` file, we need to import the Fauna Client libraries as below.

```python
from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
```

Use the `secret_key` that we created earlier to connect to the database. We will also set up the `client` variable to be used in our app:

```python
app = Flask(__name__)
Bootstrap(app)
app.config["SECRET_KEY"] = "SECRET_KEY"
client = FaunaClient(secret="YOUR_KEY'S_SECRET_HERE")
```

From here, we will explore the four primary operations of a database system; Create (C), Read (R), Update (U), and Delete (D) (CRUD) operations that we can perform on our Fauna database.

### Saving data with Fauna
Let us start integrating our debt tracker application with Fauna. We will first create an `add` route to our `app.py` file:

```python
@app.route("/add/", methods=["POST"])
def add_loan():
    name = request.form.get("name")
    amount = request.form.get("amount")
    date = request.form.get("date")

    loan_data = client.query(
        q.create(
            q.collection("debt"), {
                "data": {
                    "name": name,
                    "amount": float(amount),
                    "pending": True,
                    "date_created": datetime.strptime(date, "%Y-%m-%d").astimezone(tz=tz.tzlocal())
                }
            }
        )
    )

    flash("You have successfully added the Debt")
    return redirect(url_for("debt"))
```
We have utilized Fauna create operation from the code above to register the data in the `debt` collection database. Then, we have created a `data` field that contains the `name`, `amount`, `pending`, and `date_created` of the debt. Finally, we have used the `flash` function to display a message to the user.

### Fetching data from Fauna
In this section, we shall fetch our added data from the database. We will create a  default `/` route to our `app.py` file:

```python
@app.route("/")
def debt():
    debt = client.query(
        q.paginate(
            q.match(q.index("pending-debt"), True),
            size=100_000
        )
    )
    debt_data = [
        q.get(
            q.ref(q.collection("debt"), loan.id())
        ) for loan in debt["data"]
    ]
    return render_template("index.html", debt_data=client.query(debt_data))
```

We created a `debt()` function from the code above to fetch all the data from the `debt` collection. Then, we used the `paginate` function to fetch the data from the database.

The `match` function matches the data with the `pending` field. Next, we used the `index` function to create an index on the `pending` field. Then, we used the `size` function to set the size of the data we wanted to fetch. Finally, we get the data from the database using the `get` function and render the `index.html` page, passing the fetched data to it.


### Updating data in Fauna
In this section, we will be using the `update` operation to update the data in the database. We will create an `update` route to our `app.py` file:

```python
@app.route("/update/", methods=["POST"])
def update_loan():
    action = request.form.get("action")
    amount = request.form.get("amount")
    loan_id = request.form.get("loanID")

    loan_data = client.query(
        q.get(
            q.ref(q.collection("debt"), int(loan_id))
        )
    )

    old_amount = loan_data["data"]["amount"]
    if action == "Borrow More":
        new_amount = old_amount + float(amount)
    elif action == "Repay Loan":
        new_amount = old_amount - float(amount)

    client.query(
        q.update(
            q.ref(q.collection("debt"), int(loan_id)), {
                "data": {
                    "amount": new_amount
                }
            }
        )
    )

    flash("You have successfully updated your debt")
    return redirect(url_for("debt"))
```

From the code above, we have utilized the `update` function to update the data in the database.

### Deleting data in Fauna
Here, we will use the delete operation to delete the data from the database. We will create a `delete` route to our `app.py` file:

```python
@app.route("/clear/<int:loan_id>/")
def clear_loan(loan_id):
    client.query(
        q.delete(
            q.ref(q.collection("debt"), loan_id)
        )
    )

    flash("You have successfully cleared loan information!", "success")
    return redirect(url_for("debt"))
```

We have utilized the `delete` function from the code above to delete the data from the database. Next, we have used the `int` function to convert the `loan_id` to an integer. Finally, we have used the `query` function to query the data from the database.

You can find the source code [here](https://github.com/Jeff-mwangi/Debt-Tracker-Application-with-Python-and-Fauna). 

### Conclusion
In this tutorial, we have learned the basics of the Fauna database while working with Flask and the CRUD operations that come with it.

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)