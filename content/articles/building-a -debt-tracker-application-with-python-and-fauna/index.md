### Building a Debt Tracker Application with Python and Fauna
[Fauna](https://fauna.com) is a cloud-based database at its core, with two interfaces: GraphQL and Fauna Query Language (FQL). Databases can hold collections, indexes, and even other databases (multi-tenancy). Documents are located within collections and do not have special schema requirements by default. Fauna can handle a wide range of data types (including temporal), but it is most known for its relational data handling.

In this tutorial, we will build a debt tracker application using Fauna. We will use Fauna to store our data and use GraphQL to query it.

Let us get started!

### Prerequisite
To follow along with this tutorial, you are required to have the following:
- A text editor.
- Some knowledge of Python, Fauna, and Flask.
- Python installed.

### Table of content
- [Getting started with Fauna](#getting-started-with-fauna)
- [Creating a database in Fauna](#from faunadb. obcreating-a-database-in-fauna)
- [Creating a collection in Fauna](#creating-a-collection-in-fauna)
- [Creating an API key for the Fauna database](#creating-an-api-key-for-the-fauna-database)
- [Creating a Flask app](#creating-a-flask-app)
- [Connecting Python with Fauna](#connecting-python-with-fauna)
- [Saving data with Fauna](#saving-data-with-fauna)
- [Updating data in Fauna](#updating-data-in-fauna)
- [Conclusion](#conclusion)

### Getting started with Fauna
To begin using Fauna, you must first create an account on the official website. Using your email address, you may do so [here](https://dashboard.fauna.com/accounts/register) (https://dashboard.fauna.com/accounts/register).

### Creating a database in Fauna
After creating an account, we will be able to create a database that will help us to store our data. You can do so by going to the Fauna dashboard and clicking on the `CREATE DATABASE` button:

![create database](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/create-database.png)

Enter the desired name for your database and click `CREATE`.

### Creating a collection in Fauna
Fauna organizes its data into collections and uses indexes to search them. The user's collection, for example, comprises database user information and is similar to SQL tables in that it contains data with similar qualities.

Far from being a database, a collection is a container for documents. We will create a collection to store our data.
Now that you have a database, you can create a collection. To do so, go to the Fauna dashboard and click on the `create collection` button:

![create collection](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/create-collection.png)

The `History Days` are the numbers of days that you will wish Fauna to retain the history of your data. The default is 30 days, and you can change this number by entering a new number. The `TTL` is the expiration time of the data in the collection.

Enter a name for your collection and click `SAVE.`

### Creating a Fauna Index
The Fauna index is a way to search for specific data. For example, if you wanted to find all the users in the database, you could search for all the users by entering `users` in the search bar.

To create indexes, click on the `Indexes` tab and click on the `New Index` button:

![create indexes](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/create-indexes.png)

Here, you are supposed to choose the collection name you want and enter the name you wish to call the index under the `Index Name` area. Terms are the fields that you want to search for from the collection. You can enter multiple terms by adding another field. In our case, we want to search for the `data.pending`. Once you are done, click `SAVE.`

### Creating an API key for the Fauna database
Fauna is a cloud-based database service that allows you to query and store data securely. 

To access the database, we will need to generate an API key. To do so, go to your Fauna dashboard and select the 'Security' tab, then the `NEW KEY` button:

![create api key](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/create-api-key.png)

The key name is the name of the key that you want to give to the key. The key is the key that you will use to access the database. The key is a secret that is only known to you. 

After filling in the form, click `SAVE`. Fauna will provide you with the secret key that you can use to access the database.

### Installing Fauna Client
Fauna Client is a Python library that allows you to access the database. To install Fauna Client, you need to install the following packages under your terminal:

```bash
$ sudo apt install python3-pip
$ pip install faunadb
```

Install Flask bootstrap in your local machine:

```bash
# Installing Flask
$ pip install Flask
# Installing Flask-Bootstrap
$ pip install Flask_Bootstrap4
```

### Project structure
Let us create a working directory for our project. We will create a working directory called `fauna-python-tutorial` and then create a ' static' directory inside it to store our static files. We will also create a' templates' directory inside the working directory to store our templates. Finally, we will create our `app.py` file in the `fauna-python-tutorial` directory.

Let us look at what our new project structure will look like from inside our app project directory:

```
.
├── static
│   ├── script.js
├── templates
│   ├── index.html
└── app.py
```

### Creating a Flask app
Now that we have our working directory, we need to create a Flask app.

Since our article is focused on the app's functionality, I have created a Flask application with the bootstrap user interface. We need to clone this repository by running the following commands:

```bash
$ git clone git@github.com:Jeff-mwangi/Debt-Tracker-Application-with-Python-and-Fauna.git
```

To run the app, we need to run the following command:

```bash
$ python3 app.py
```

We should see a default page that looks like this:

![dept-tracker](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/dept-tracker.png)

The default page is the home page of our app. We can add debt by clicking on the `Add Loan` button.

### Connecting Python with Fauna
In our `app.py` file, we need to import the Fauna Client libraries. We will import the Fauna Client libraries by using the following code:

```python
from faunadb import query as q
from faunadb.objects import Ref
from faunadb.client import FaunaClient
```

Let us now set up our Fauna Client. We will use the `secret_key` that we created earlier to connect to the database. We will also set up the `client` variable to be used in our app:

```python
app = Flask(__name__)
Bootstrap(app)
app.config["SECRET_KEY"] = "SECRET_KEY"
client = FaunaClient(secret="YOUR_KEY'S_SECRET_HERE")
```

We shall replace `YOUR_KEY'S_SECRET_HERE` with the secret key that we created earlier.

From here, we shall now explore the four primary operations of a database system, i.e., Create (C), Read (R), Update (U), and Delete (D) (CRUD) operations that we can perform on our Fauna database.

### Saving data with Fauna
Now, let us start integrating our debt tracker application with Fauna. We will first create an `add` route to our `app.py` file:

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
We have utilized Fauna create operation from the code above to register the data in the `dept` collection database. Then, we have created a `data` field that contains the `name`, `amount`, `pending`, and `date_created` of the debt. Finally, we have used the `flash` function to display a message to the user.

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

We have created a `debt()` function from the code above to fetch all the data from the `debt` collection. Then, we have used the `paginate` function to fetch the data from the database.

We have used the `match` function to match the data with the `pending` field. Next, we have used the `index` function to create an index on the `pending` field. Then, we used the `size` function to set the size of the data we wanted to fetch. Finally, we have used the `get` function to get the data from the database. 

We have used the `ref` function to get the data reference. Next, we have used the `id()` function to get the id of the data. Then, we have used the `query` function to query the data from the database. Finally, we have used the `render_template` function to render the template. We have passed the `debt_data` variable to the template.

### Updating data in Fauna
In this section, we shall be using the `update` operation to update the data in the database. We will create an `update` route to our `app.py` file:

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

We have used the `get` function to get the data from the database. We have used the `update` function to update the data in the database. We have used the `flash` function to display a message to the user. Finally, we have used the `redirect` function to redirect the user to the `debt` route.

### Deleting data in Fauna
Here, we shall use the delete operation to delete the data from the database. We will create a `delete` route to our `app.py` file:

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

We have used the `delete` function to delete the data from the database. We have used the `flash` function to display a message to the user. Finally, we have used the `redirect` function to redirect the user to the `debt` route.

Here is my [Github Repo](https://github.com/Jeff-mwangi/Debt-Tracker-Application-with-Python-and-Fauna) for the source code of this tutorial. 

### Conclusion
In this tutorial, we have learned how to create a Fauna database and fetch data from the database. We have also learned how to update and delete data from the database.

Happy coding!
