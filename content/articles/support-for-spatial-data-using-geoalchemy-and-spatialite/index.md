---
layout: engineering-education
status: publish
published: true
url: /support-for-spatial-data-using-geoalchemy-and-spatialite/
title: Support For Spatial Data in your Database Using GeoAlchemy and Spatialite
description: This tutorial will be a step-by-step guide on how to add support to store and query spatial data for their database in their development environment.
author: paul-asalu
date: 2021-10-07T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/support-for-spatial-data-using-geoalchemy-and-spatialite/hero.png
    alt: Spatialite database example image
---
When building certain kinds of applications, it is important to know what kind of data you will be working with, so you can make adequate preparations to hold and process them. 
<!--more-->
One such instance is when you need to work with "spatial data" (location data - in terms of longitude and latitude). In addition, you may want to be able to make queries based on these kinds of information. 

For example, you could imagine querying a database for the "10 closest entities to a given location (longitude, latitude)".

In this article, we will use [SQLite](https://www.sqlite.org/index.html) and its spatial extension to create a database that supports spatial data read and write operations for a simple flask server.

We will also see how to read and write spatial data from and to the database on our server.

### Table of contents         
- [Building A Simple Web Server](#building-a-simple-webserver)
- [Adding Support for Spatial Data](#adding-support-for-spatial-data)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Building a simple webserver
We'll start by creating a simple backend server for a service-hailing platform, where users can connect with 'service providers' in proximity to them, to avail offers for the services with a fee. 

For this kind of platform, we have to deal with spatial information like "location of the client", "location of service-providers", and we might also want to make queries to the database to perhaps find "the closest 10 service-providers" to a given location.

This section shows how to set things up for the backend server.

#### Prerequisites
- Python3 Installed
- Basic Flask knowledge

We'll start by creating a folder called `server` and in the root folder. We'll add a new folder called `core`, and three other files called `wsgi.py`, `models.py`, and `config.py`.

Inside the `core` folder, add two new files called: `__init__.py`, and `views.py`.

Once you're done your `server` folder should have a structure like this one below:

```bash
server
|   models.py
|   wsgi.py
|   config.py
|___core/
    |   __init__.py
    |   views.py
```

#### Installing dependencies
From the command prompt/terminal, navigate to the `server` folder that we just created.

Now, create a new virtual environment for the project using `virtualenv`.

If you don't have `virtualenv` installed you can install via `pip` as follows:

```bash
pip install virtualenv
```

If you already have it installed, you can skip that step and install the libraries we need as follows:

```bash
pip install flask flask-sqlalchemy flask-migrate geoalchemy2
```

#### Creating and configuring the Flask server
In the `__init__.py` file of the `core/` folder, we will add the following lines of code to create an application factory.

This is a function that we call to create and configure the flask application.

This is great because it can take arguments that we need to create an application at any point we call the function.

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import config_

# initialize extensions
db = SQLAlchemy()
migrate = Migrate()

# app factory
def create_app(config_name):
    # create app instance
    app = Flask(__name__)

    # configure app
    app.config.from_object(config_[config_name])

    # initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)

    return app
```

Let's add some configuration options in the `config.py` file that we created earlier.

So, navigate to that file and add the following lines of code to add the configuration options.

```python
import os

base_dir = os.path.abspath(os.getcwd())

class Config:
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('app-secret')
    # other generic configuration
    # ..options

class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{base_dir}/devdb.sqlite"
    DEBUG = True
    FLASK_ENV = 'development'

class ProdConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI')
    FLASK_ENV = 'production'

config_ = {
    'default': DevConfig,
    'development': DevConfig,
    'production': ProdConfig
}
```

The `config_` variable in the last line holds a dictionary that maps each config option to the respective type of environment.

This is what we did in the `__init__.py` file, in the app factory, as shown below:

```python
# .. code omitted for brevity
from config import config_
# .. 
# ...
app.config.from_object(config_[config_name])
```

#### Running Flask server
To run our flask app, we need to add some final instructions in the `wsgi.py` that will help us run the flask app.

So, go to that file and add the following lines of code:

```python
from core import create_app
import os

# call create_app() to create and configure flask app
app = create_app('default' or os.getenv('FLASK_CONFIG'))
```

Let's also set the `FLASK_ENV` environment variable to `development` from the terminal, so that we don't have to restart our server each time we make a change.

```bash
FLASK_ENV=development
```

Now, let's run our flask app from the command prompt/terminal using the following command:

```bash
flask run
```

>**Note**: This command works because flask looks for any file named `wsgi.py` or `app.py` by default. If you change the naming convention, you'll have to set the FLASK_APP environment variable to the name of the file you're using.

```bash
set FLASK_APP=myfilename.py
```

Once you run this command, you should see the logs on the terminal indicate that the server is running, as shown below:

![server-logs](/engineering-education/support-for-spatial-data-using-geoalchemy-and-spatialite/demo1.PNG)

### Adding support for spatial data
#### Prerequisite
The reader should have installed the following libraries:
- [Spatialite](https://pypi.org/project/spatialite/)
- [Pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html)
 
The first thing we want to do is to add models for the data we will be collecting and storing. This is done via the `models.py` file.

Open that file and add the following lines of code:

```python
from core import db
from datetime import datetime as d

# Base class
class Base:
    id = db.Column(db.Integer, primary_key=True, nullable=False)

class User(Base, db.Model):
    name = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)
    signup_date = db.Column(db.DateTime, default=d.utcnow())
    profile_photo = db.Column(db.String(200))
    telephone = db.Column(db.String(20), unique=True)
    address = db.Column(db.String(100))
    lon = db.Column(db.Float)
    lat = db.Column(db.Float)
    is_handyman = db.Column(db.Boolean, default=False)
    email_verified = db.Column(db.Boolean, default=False)
    personal_id = db.Column(db.String(200))
    # relationships
    gigs_ = db.relationship('Gig', backref='owner')

class Gig(Base, db.Model):
    title = db.Column(db.String(50))
    description = db.Column(db.Text)
    price = db.Column(db.Float)
    glat = db.Column(db.Float)
    glon = db.Column(db.Float)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    date_created = db.Column(db.DateTime(), default=d.utcnow())
```

Our models defines `User` objects as well as `Gig` objects - a user could be a regular customer who requests for a service on the platform, or a user that identifies as a handyman (or a service-provider).

In each of these models, we collect `lon` and `lat` values that define their location.

However, these values don't mean anything geometrically (they're just floating-point values), until we add the support for it so that our database can handle them correctly. 

#### Installing Spatialite
To add the support needed when handling the spatial data, we'll need to install an extension called `Spatialite` that adds support to the database.

To install `Spatialite`, visit [this](http://www.gaia-gis.it/gaia-sins/windows-bin-amd64/) link to download the binaries for Windows.

This should take you to a page like the one shown below:

![spatialite-download-page](/engineering-education/support-for-spatial-data-using-geoalchemy-and-spatialite/demo2.PNG)

> *If you're on Linux, follow the instructions in this [link](https://xl-optim.com/spatialite-and-python-in-2020/) to get it installed on Linux.*

Once you're on the download page, you'll need to select the first option to download the compressed file containing Spatialite binaries.

Once downloaded, you can extract the folder using any file extractor tool like WinRAR.

The extracted folder should contain the following files:

![spatialite-folder](/engineering-education/support-for-spatial-data-using-geoalchemy-and-spatialite/demo3.PNG)

Next, copy the path to this folder and add it as an environment variable called `spat_path` from the terminal:

```bash
set spat_path=/path/to/your/spatialite/folder
```

Next, go to the `wsgi.py` file where we created the app instance.

We'll add some configuration options so that we can load the `Spatialite` extension when we create our application.

Update the `wsgi.py` file so it contains these lines of code:

```python
from sqlalchemy import event
from models import *
import os
import sqlite3

# spatialite path
spatialite_path = os.getenv('spat_path')
os.environ['PATH'] = spatialite_path + ';' + os.environ['PATH']

# create server instance from app factory
app = create_app(os.getenv("FLASK_CONFIG") or "default")

# add extension to sqlite3
with app.app_context():
    @event.listens_for(db.engine, "connect")
    def load_spatialite(dbapi_conn, connection_record):
        dbapi_conn.enable_load_extension(True)
        dbapi_conn.load_extension('mod_spatialite')
```

Here, we can fetch the `spat_path` variable that we stored the location of the spatialite extension in and append it to the user **PATH** variables on your computer. 

Next, we invoke the flask app context that allows us to access the properties of the running server from outside its original scope (usually this means running code that depends on a running instance of the server, without using the original flask context).

You can find more information about Flask's context from [here](https://flask.palletsprojects.com/en/2.0.x/appcontext/). 

Under this "context", we listen for the `connect` event once the server starts running and loads the spatialite extension.

> *`Spatialite` is an SQLite extension that works for SQLite only. If you're using a different database like PostgreSQL, you need to install the extension for it as well (in which case is called PostGIS). However, you may not need to load the extension this way with other databases too. This is just for demonstration purposes on how this could be done in a development environment.*

Then we need to get a later version of `sqlite3` installed because the one that comes preinstalled with Python doesn't include `RTree` which is a data structure that's used for handling spatial information.

Head over to [SQLite3's website](https://sqlite.org/download.html) and download the latest one (available under pre-compiled binaries for Windows).

Once downloaded, extract the contents and you should find a `sqlite3.dll` file.

Copy the file and look for the `sqlite.dll` that comes preinstalled with Python, this should be in a folder called `DLLs`.

This would be the folder path:

```bash
C:\Users\Paulo\AppData\Local\Programs\Python\Python38\DLLs
```

Then, copy the old one to a safe location as a backup, and paste the newly downloaded one.

It might ask for admin access, so grant the access to copy the file there, and we'll be on our way.

#### Updating models and creating the database
Now that we've added the support for spatial data to the database engine, we will now add some special fields to the models that hold geometric information that can be handled by the database as such. 

We add them with the aid of `GeoAlchemy2` that we have installed earlier on, go to the `models.py` file and update it such that the two models contain these new fields.

```python
from geoalchemy2 import Geometry

class User(db.Model):
    # .. code ommited for brevity
    # ..
    geometry = db.Column(Geometry(geometry_type='POINT', management = True, srid='4269'))

class Gig(db.Model):
    # .. code ommited for brevity
    # ..
    gig_geometry = db.Column(Geometry(geometry_type='POINT', management = True, srid='4269'))
```

Geoalchemy2 helps us define these 'geometrical' fields which can have different `geometry_type` as specified by the [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) (Well Known Text) format.

The longitude and latitude values for this application would be in the form of a point as shown below:

```bash
X(lon, lat)
```

Hence we specify the `geometry_type` attribute for the field as `POINT`, which may differ depending on the use case.

You can always check the `geolalchemy2` reference docs [here](https://geoalchemy-2.readthedocs.io/en/latest/types.html) to see the available options.

#### Creating the database
We can now begin creating the database - we will start by running migrations on the models using `flask_migrate`.

We have already added configuration for this extension in the `__init__.py` file earlier on, so we can initialize migrations, run them and upgrade our database with the current versions of our models.

So, run the following commands from the terminal:

```bash
flask db init
```

This would initialize migrations for our database and create a `migrations/` folder for us in our project folder, that contains the metadata of our models in a subfolder called `versions/`.

We can edit these files before applying them to the database. 

Next, we run migrations to create a version file for us to introspect.

```bash
flask db migrate
```

Once we run migrations, it creates a new version file on our behalf describing the current models, and the changes to be applied to the database once we run the upgrade command.

Open the `migrations/versions/` folder in your project directory and open the first file there, it should look like the one below:

![migrations-script-image](/engineering-education/support-for-spatial-data-using-geoalchemy-and-spatialite/demo4.PNG)

This file describes what flask_migrate sees from the models as the changes are applied to the database.

These changes are applied by calling the `upgrade` function in this file and reverted by calling the `downgrade` function. What we want is to apply the changes, so we need to call `upgrade`. 

However, Alembic (which is what flask_migrate runs on) doesn't import the required dependency for the geoalchemy2 field for us in the migration script.

We need to add that before running the upgrade function. Otherwise, we would get an error, so we need to edit this script before using it.

This is what makes flask_migrate so flexible as it allows us to introspect before running upgrades on the database.

Add the following import in this version file:

```python
import geoalchemy2
```

According to the Spatialite docs, we must also run the `InitSpatialMetaData()` function before any other thing right after the database is created.

If you haven't noticed the database was created the moment we ran the `migrate` command.

Now, we must add a call to this function as the first thing to run in the `upgrade` function before anything else.

Update the script so the first lines in the `upgrade` function are as follows:

```python
def upgrade():-
    conn = op.get_bind()
    conn.execute(sa.text('SELECT InitSpatialMetaData();'))
    # .. 
```

Save this file and run the upgrade command from the terminal as follows:

```bash
flask db upgrade
```

This should update the database with our tables along with few other tables that are required by geoalchemy for the database to manage our data properly. 

#### Running queries
Let's populate the database with some user information.

I have generated a random list of longitude and latitude values using [Epitools](https://epitools.ausvet.com.au/rgcs), the generated list of values is shown below:

![example-spatial-data](/engineering-education/support-for-spatial-data-using-geoalchemy-and-spatialite/demo5.PNG)

This site also allows you to download this as an excel spreadsheet.

So, head over to the website to get your list of random longitude and latitude values.

I had to do some editing on the file to remove some unneeded columns and fields, for it to look like the image shown above. This file is saved as a CSV file, instead of being saved at the root level of our project directory for easier access.

So I'm going to use pandas to parse this file. 

We can do this from a new file using:

`db.session.commit()`

Now, we have data we can query and work with.

Let's say we need to find if there are any handymen located within a 10,000-meter radius to a certain user located at `POINT(145.67, -30.513)`, we can make a spatial query to the database, from `data.py` as follows:

```python
from sqlalchemy.sql import func
# ..

with app.app_context():
    lng, lat = 148.523, -35.40
    geo_wkb = func.ST_PointFromWKB(User.query.all()[0].geometry)

    new_point = db.session.query(User).filter(
        func.PtDistWithin(
            User.geometry,
            geo_wkb,
            10000
        )
    ).one()
    print(new_point)
```

Typically, you might want to add these to your API endpoints or have them as functions that your endpoints can call and serve you the required information.

### Conclusion
In this tutorial, we have seen how to set up and configure a basic web application that utilizes Spatialite and SQLite to perform read and write operations to a spatial database.

We've covered how to install spatiallite, and also showed how to update your existing instance of SQLite to support spatial data.

Now, you are fully equipped to set up your development environment for your projects using Spatialite and geoalchemy2. 

You can find the full code [here](https://github.com/Curiouspaul1/spatial-database-demo).

>**Note**: While sqlite3 is great for your development environment, it is advised to not use it for heavy-duty applications, you might instead want to consider using a more sophisticated tool like PostgreSQL, and PostGIS as an extension for its support of spatial data.

Happy coding!

### Further reading
- [Geoalchemy documentation](https://geoalchemy-2.readthedocs.io/en)
- [Spatialite download guide](https://xl-optim.com/spatialite-and-python-in-2020/)
- [Spatialite Documentation](http://www.gaia-gis.it/gaia-sins/spatialite-sql-latest.html)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)