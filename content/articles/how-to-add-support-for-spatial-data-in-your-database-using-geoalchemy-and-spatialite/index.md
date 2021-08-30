---
layout: engineering-education
url: /how-to-add-support-for-spatial-data-in-your-database-using-geoalchemy-and-spatialite/
title: How To Add Support For Spatial Data in your Database Using GeoAlchemy and Spatialite
description: This tutorial will show a step-by-step guide on how to add support to store and query spatial data for their database in their development environment.
author: paul-asalu
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-build-a-clock-with-javascript-and-svg/hero.png
    alt: Building a clock using JavaScript and SVG
---

When building certain kinds of applications, it is important to know what kind of data you'll be working with, so you can make adequate preparations to hold and process them. One such instance is when you need to work with "spatial data" - a typical example of which might be:
<!--more-->

## Table of Contents

- Introduction
- Building A Simple Web Server
- Adding Support For Spatial Data
- Conclusion


## Introduction

When building certain kinds of applications, it is important to know what kind of data you'll be working with, so you can make adequate preparations to hold and process them. One such instance is when you need to work with "spatial data" - a typical example of which might be: storing location ( in terms of longitude and latitude values). In addition, you may want to be able to make queries based on these kinds of information, for example, you could imagine querying your database for "10 closest entities to a given location (lon,lat)".

How does one make provisions for such data?, the aim of this article is to show you how to implement a spatial database in your development environment, with the aid of a typical Flask server using GeoAlchemy and Spatialite (for development purposes using SQLite).


## Building A Simple Web Server
We'll start by creating a simple backend server for a service-hailing platform, where users can connect with 'service providers' in close proximity to them, and get them to offer their services to them for a fee. For this kind of platform, we have to deal with spatial information like `"location of client"`, `"location of service-providers"`, and we might also want to make queries to the database to perhaps find `"the closest 10 service-providers"` to a given location for example. We can only achieve this if we set things up correctly and add support for these kind of information to our database, since they don't directly have that kind of support for spatial data.

### <u>Pre-Requisites</u>
- Python3 Installed
- Basic Flask Knowledge

We'll start by creating a folder called `server` and in this folder, we'll add a new folder called `core` and three other files called `wsgi.py`, `models.py` and `config.py`. Inside the `core` folder, add two new files called: `__init__.py`, and `views.py`. Once you're done your `server` folder should have a structure like this one below:

```
-server/
    -core/
        -__init__.py
        -views.py
    -models.py
    -wsgi.py
    -config.py
```

### <u>Installing Dependencies</u>
From the command prompt/terminal, navigate to the server folder we just created and create a new virtual environment for the project, using `virtualenv`. If you don't have `virtualenv` installed you can install via `pip` as follows:

```
 pip install virtualenv
```

If you already have it installed, you can skip that step and install the libraries we need as follows:

``` 
pip install flask flask-sqlalchemy flask-migrate geoalchemy2
```

### <u>Creating and configuring the Flask server</u>
In the `__init__.py` file in the **core/** folder we will add the following lines of code to create an application factory. This is a function that we can call to help with creating and configuring out flask application - this is great, because it can take arguments that we need to create an application at any point when we call the function.

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
Let's add some configuration options that our flask app can use, in the `config.py` file we created earlier. So navigate to that file and add the following lines of code to add the configuration options.

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
The `_config` variable in the last line holds a  dictionary that maps each config option to their names, so we can use the `config's name` to reference them when we need to add the config to our flask application. This is what we did in the `__init__.py` file, in the app factory, as shown below:

```python
# .. code ommited for brevity
from config import config_
# .. 
# ...
app.config.from_object(config_[config_name])
```

### <u>Running Our Flask Server</u>

To run our flask app we need to add some final instructions in the `wsgi.py` which is what will help us run the flask app. So go to that file and add the following lines of code:

```python
from core import create_app
import os

# call create_app() to create and configure flask app
app = create_app('default' or os.getenv('FLASK_CONFIG'))
```
Let's also set the `FLASK_ENV` environment variable to `development` from the terminal so we don't have to restart our server each time we make a change.
```
FLASK_ENV=development
```

Now let's run our flask app from the command-prompt/terminal using the following command :

```
flask run
```

_**Note**: This command works because flask looks for any file named `wsgi.py` or `app.py` by default. If you changed your naming convention for this file, you'll have to set the FLASK_APP environment variable to the name of the file you're using._ 

```
set FLASK_APP=myfilename.py
```

Once you run this command, you should see the logs on the terminal indicate that the server is running, as shown bellow:

![Demo1](demo1.png)

## Adding Support For Spatial Data

### <u>Pre-requisite</u>
- Spatialite
- Pandas

The first we want to do is to add models for the data we'd be collecting and storing. This is done via the `models.py` file, so open that file and add the following lines of code:


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
Our models defines `User` objects as well as `Gig` objects - a user could be a regular customer who needs to request for a service on the platform, or a user that identifies as a handyman (or a service-provider). In each of these models we collect `lon` and `lat` values which should be used to define their location, however these don't mean anything geometrically (they're just floating point values), until we add the support for it, so that our database can handle them correctly. 

### <u>Installing Spatialite</u>
In order to add support for proper handling of the spatial data we're collecting, we need to install an extension called `Spatialite` which adds the support for us to the database. To install `Spatialite`, visit this [link](http://www.gaia-gis.it/gaia-sins/windows-bin-amd64/) to download the binaries for windows. This should take you to a page like the one shown below:

![spatialite-download-page](demo2.Png)

___
_If you're on Linux, follow the instructions in this [link](https://xl-optim.com/spatialite-and-python-in-2020/) to get it installed on linux._
___

Once you're on the download page, you need to select the first option to download the compressed file containing Spatialite binaries. Once downloaded, you can extract the folder using any file extractor tool like winrar. The extracted folder should containing files like these:

![](demo3.png)

Next, copy the path to this folder and add it as an environment variable called `spat_path` from the terminal
```
set spat_path=/path/to/your/spatialite/folder
```
Next go to the `wsgi.py` file where we created the app instance. We'll add some cnofiguration options so that we can load the `Spatialite` extension when we create our application. Update the `wsgi.py` file so it contains these lines of code:

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
___
_`Spatialite` is an sqlite extension so this extension works for sqlite only, if you're using a different database like PostgresQL, you need to install the extension for it too (in which case is called PostGIS). However, you may not need to load the extension this way with other databases too. This is just for demonstration purposes on how this could be done in a development environment._
___

Lastly, we need to get a later version of sqlite3 installed because the one that comes preinstalled with python, doesn't include 'RTree' which is a datastructure thats used for handling spatial information. So head over to [Sqlite3's website](https://sqlite.org/download.html) and download the latest one (available under Pre-compiled Binaries for Windows). We will replace this with the one in the python binaries. 

Once downloaded, extract the contents and you should find a `sqlite3.dll` file - this is what we need. So copy it and look for the sqlite.dll that comes preinstalled with python, this should be in a folder called `DLLS` that's usually in the same location where python is installed. Mine is found at 

```
C:\Users\Paulo\AppData\Local\Programs\Python\Python38\DLLs
```
once there copy the old one to a safe location as backup, and paste the newly downloaded one in there to replace the old one, it might ask for admin-access so grant it access to copy the file there, and we'll be on our way.

### <u>Updating Our Models And Creating The Database</u>

Now that we've added the support for spatial data to the database engine, we will now add some special fields to the models from earlier, these are the spatial fields that hold geometric information that can be handled by the database as such. 

We add them with the aid of `GeoAlchemy2` which we have installed earlier on, so go to the `models.py` file and update it so that the two models now contain these new fields that will hold spatial data.

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
Geoalchemy2 helps us to define these 'geometrical' fields which can have different `geometry_type` as specified by the [WKT](https://en.wikipedia.org/wiki/Well-known_text_representation_of_geometry) (Well Known Text) format. The longitude and latitude values for my application would be in the form of a point, or at least thats what I anticipate:

```
X(lon, lat)
```
Hence I specify the `geometry_type` attribute for the field as `POINT`, this may differ depending on your usecase. You can always check the geolalchemy2 reference docs [here](https://geoalchemy-2.readthedocs.io/en/latest/types.html) to see the available options.

### <u>**Creating The Database**</u>

We can now get to creating the database - we will begin by running migrations on the models using flask_migrate. We have already added configuration for this extension in the `__init__.py` file earlier on, so we can initialize migrations, run them and upgrade our database with the current versions of our models. So run the following commands from the terminal:

```
flask db init
```
This would initialize migrations for our database and create a `migrations/` folder for us in our project folder, this would contain metadata on the current version(s) of our models in a subfolder called `versions/`. We can edit these files before applying them to the database. Next we run migrations to create a version file for us to introspect.
```
flask db migrate
```

Once we run migrations it creates a new version file on our behalf describing the current models, and the changes to be applied to the database once we run the upgrade command. Open the `migrations/versions/` folder in your project directory and open the first file there, it should look like the one below:

![](demo4.png)

This file describes what flask_migrate sees from the models as the changes to be applied to the database. These changes are applied by calling the `upgrade` function in this file, and reverted by calling the `downgrade` function. What we want is to apply the changes, so we need to call `upgrade`. 

However, Alembic (which is what flask_migrate runs on) doesn't import the required dependency for the geoalchemy2 field for us in the migration script. So we need to add that before running the upgrade function. Otherwise we would get an error, so we need to edit this script before using it, this is what makes flask_migrate so flexible as it allows us to introspect before running upgrades on the database.

Add the following import in this version file:

```python
import geoalchemy2
```
According to the Spatialite docs we must also run the `InitSpatialMetaData()` function before any other thing right after the database is created. If you haven't noticed the database was created the moment we ran the `migrate` command. So we must now add a call to this function as the first thing to run in the `upgrade` function before anything else.

Update the script so the first lines in the `upgrade` function are as follows:
```python
def upgrade():
    conn = op.get_bind()
    conn.execute(sa.text('SELECT InitSpatialMetaData();'))
    # .. 
```
Save this file and run the upgrade command from the terminal as follows:

```
flask db upgrade
```
This should update the database with our tables along with some other tables that are required by geoalchemy for the database to manage our data properly. 

### Running Queries
Let's populate the database with some user information. I have generated a random list of longitude and latitude values using https://epitools.ausvet.com.au/rgcs, the generated list of values is shown below:

![](demo5.png)

The site also allows you to download this as an excel spreadsheet, so head over to the website to get your own list of random lon/lat values. I had to do some editing on the file to remove some unneeded columns and fields, in order for it to look like the image shown above, I also saved it as a csv file instead into the root level of our project directory for ease of access.

 So I'm going to use pandas to parse this file. We can do this from a new file called `data.py`, create this file in the root level of your project folder on the same level as `wsgi.py`. If you don't have `Pandas` installed, you can install it using the pip command as follows:

```
pip install pandas
```

In the `data.py` file add the following lines of code to it to feed data from the spreadsheet (or csv file):

```python
from wsgi import app
from core import db
from models import *
import pandas as pd
import random

with app.app_context():
    data_ = pd.read_csv('sample_locations.csv')
    df = pd.DataFrame(data_)
    names = ["Joe", "Mike", "Paul"]
    for index, row in df.iterrows():
        new_user = User(
            name=names[random.randint(0,2)],
            lon=row.X,
            lat=row.Y,
            is_handyman=bool(random.randint(0,1)),
            geometry='SRID=4269;POINT(%.8f %.8f)'%(row.X, row.Y)
        )
        db.session.add(new_user)
    db.session.commit()
```
Now we have data we can query and work with. Let's say we need to find if there are any handymen located within a 10,000meter radius to a certain user located at `POINT(145.67, -30.513)`, we can make a spatial query to the database, from `data.py` as follows:

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
Typically, you might want to add these to your api-endpoints or have them as functions that your endpoints can call and serve you the required information. Whichever case you want, you can surely achieve using these steps.

## Conclusion

In this tutorial, we have seen how to set up and configure a basic web application, that utilizes Spatialite and sqlite to perform read and write operations to a spatial database. I covered how to install spatiallite, and also showed how to update your existing instance of sqlite to support spatial data. Now you are fully equipped to set-up your development environment for your projects using spatialite and geoalchemy2. 

**Note**: While sqlite3 is great for your development environment, it is advised to not use it for heavy duty applications, you might instead want to consider using a more sophisticated tool like PostgresQL, and PostGIS as an extension for it's support of spatial data.
