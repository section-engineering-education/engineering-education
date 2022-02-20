### Building a Debt Tracker Application with Python and Fauna

[Fauna](https://fauna.com) is a cloud-based database at its core, with two interfaces: GraphQL and Fauna Query Language (FQL). Databases can hold collections, indexes, and even other databases (multi-tenancy). Documents are located within collections and do not have special schema requirements by default. Fauna can handle a wide range of data types (including temporal), but it's most known for its relational data handling.

In this tutorial, we will build a debt tracker application using Fauna. We will use Fauna to store our data and use GraphQL to query it. We will also use FQL to query the data.

Let's get started!

### Prerequisite
To follow along with this tutorial, you are required to have the following:
- A text editor.
- Python installed.
- Prior knowledge of Python and Flask.

### Table of content
- [Prerequisite](#prerequisite)
- [Getting started with Fauna](#getting-started-with-fauna)
- [Creating a database in Fauna](#creating-a-database-in-fauna)
- [Creating a collection in Fauna](#creating-a-collection-in-fauna)
- [Creating a secret key for the Fauna database](#creating-a-secret-key-for-the-fauna-database)
- [Creating a Flask app](#creating-a-flask-app)
- [Connecting Python with Fauna](#connecting-python-with-fauna)
- [Saving data with Fauna](#saving-data-with-fauna)
- [Updating data in Fauna](#updating-data-in-fauna)
- [Conclusion](#conclusion)

### Getting started with Fauna
To begin using Fauna, you must first create an account on the official website. You may do so [here](https://dashboard.fauna.com/accounts/register) using your email address.

### Creating a database in Fauna
After creating an account, you will be able to create a database. Our database will help us to store our data. You can do so by going to the Fauna dashboard and clicking on the `CREATE DATABASE` button:

![create database](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/create-database.png)

Enter the desired name for your database and click `CREATE`.

### Creating a collection in Fauna
Fauna is a relational database that organizes its data into collections and uses indexes to search them, so we must create a collection to store our data. The user's collection, for example, comprises database user information and is similar to SQL tables in that it contains data with similar qualities.

Far from being a database, a collection is a container for documents. We will create a collection to store our data.
Now that you have a database, you can create a collection. To do so, go to the Fauna dashboard and click on the `create collection` button:

![create collection](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/create-collection.png)

The `History Days` are the numbers of days that you will wish Fauna to retain the history of your data. The default is 30 days, and you can change this number by entering a new number. The `TTL` is the expiration time of the data in the collection.

Enter a name for your collection and click `SAVE.`

### Creating a Fauna index
The Fauna index is a way to search for specific data. For example, if you wanted to find all the users in the database, you could search for all the users by entering `users` in the search bar.

To create indexes, click on the `Indexes` tab and click on the `New Index` button:

![create indexes](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/create-indexes.png)

Here, you are supposed to choose the collection name you want and enter the name you wish to call the index under the `Index Name` area. Terms are the fields that you want to search for from the collection. You can enter multiple terms by adding another field. In our case, we want to search for the `data.pending`. Once you are done, click `SAVE.`

### Creating a secret key for the Fauna database
Fauna is a cloud-based database. It is a service that allows you to store data securely. It is also a service that will enable you to query data. 

To access the database, we'll need to generate an API key. To do so, go to your Fauna dashboard and select the 'Security' tab, then the 'NEW KEY' button:

![create api key](/engineering-education/building-a -debt-tracker-application-with-python-and-fauna/create-api-key.png)

The key name is the name of the key that you want to give to the key. The key is the key that you will use to access the database. The key is a secret that is only known to you. 

After filling in the form, click `SAVE`. Fauna will provide you with the secret key that you can use to access the database.

### Installing Fauna client
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

### Project Structure
Let's create a working directory for our project. We will create a working directory called `fauna-python-tutorial` and then create a ' static' directory inside it to store our static files. We will also create a directory called `templates` inside the working directory to store our templates. Finally, we will create our `app.py` file in the `fauna-python-tutorial` directory.

Let's look at what our new project structure will look like from inside our app project directory:

```bash
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
Let's now set up our Fauna Client. We will use the `secret_key` that we created earlier to connect to the database. We will also set up the `client` variable to be used in our app:

```py
app = Flask(__name__)
Bootstrap(app)
app.config["SECRET_KEY"] = "SECRET_KEY"
client = FaunaClient(secret="YOUR_KEY'S_SECRET_HERE")
```

We shall replace `YOUR_KEY'S_SECRET_HERE` with the secret key that we created earlier.

From here, we shall now explore the four main CRUD operations of a database system.

### Saving data with Fauna
Now, let's start integrating our debt tracker application with Fauna. We will first create an `add` route to our `app.py` file:

```py
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
We have utilized Fauna create operation from the code above to register the data in the `dept` collection database. We have created a `data` field that contains the `name`, `amount`, `pending`, and `date_created` of the debt. Finally, we have used the `flash` function to display a message to the user.

### Fetching data from Fauna
In this section, we shall fetch our added data from the database. We will create a  default `/` route to our `app.py` file:

```py
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

We have created a `debt()` function from the code above to fetch all the data from the `debt` collection. We have used the `paginate` function to fetch the data from the database. We have used the `match` function to match the data with the `pending` field. We have used the `index` function to create an index on the `pending` field. We have used the `size` function to set the size of the data that we want to fetch. We have used the `get` function to get the data from the database. 

We have used the `ref` function to get the data reference. We have used the `id()` function to get the id of the data. We have used the `query` function to query the data from the database. Finally, we have used the `render_template` function to render the template. We have passed the `debt_data` variable to the template.

### Updating data in Fauna
In this section, we shall be using the `update` operation to update the data in the database. We will create an `update` route to our `app.py` file.

We shall utilize the `update` function to update the data in the database.

We have used the `get` function to get the data from the database. We have used the `update` function to update the data in the database. We have used the `flash` function to display a message to the user. We have used the `redirect` function to redirect the user to the `debt` route.

### Cleaning up data in Fauna
Here, we shall use the delete operation to delete the data from the database. We will create a `delete` route to our `app.py` file:

We shall utilize the `delete` function from the code above to delete the data from the database. We have used the `int` function to convert the `loan_id` to an integer. We have used the `query` function to query the data from the database.

We have used the `delete` function to delete the data from the database. We have used the `flash` function to display a message to the user. We have used the `redirect` function to redirect the user to the `debt` route.

Here is my [Github Repo](https://github.com/Jeff-mwangi/Debt-Tracker-Application-with-Python-and-Fauna) for the source code of this tutorial. 

### Conclusion
In this tutorial, we have learned how to create a Fauna database and fetch data from the database. We have also learned how to update and delete data from the database.

Happy coding!