---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-geoserver-and-geodatabase/
title: Creating a Geoserver and a Geodatabase
description: In this tutorial, we will learn how to create a geospatial server and database. The server will power the database and serve as the gateway between the users and the spatial database. 
author: isaiah-olatunbosun
date: 2021-10-13T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-create-a-geoserver-and-geodatabase/hero.jpg
    alt: Creating a Geoserver and a Geodatabase Image
---

In this tutorial, we will learn how to create a geospatial server and database. The server will power the database and serve as the gateway between the users and the spatial database. 
<!--more-->
Spatial data is any data that contains the longitude and latitude of any location. Thus, they provide information about a physical location . Spatial data is also referred to as Geographic Information System (GIS). 

Geoserver is a server that processes spatial data and also powers a geodatabase. It serves as the link between geodatabase and users by giving them access to spatial data.

The geodatabase is a database that stores spatial data. It allows users to create, update, retrieve and delete spatial data. The data can be stored as points, lines or polygons. We will use a PostgreSQL extension call `Postgis` so that the database can handle spatial data.

### Table of content
- [Prerequisites](#prerequisites)
- [Building the database](#building-the-database)
- [Saving the Coordinates](#saving-the-coordinates)
- [Displaying Coordinates](#displaying-the-coordinates)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Prerequisites
-   Basic understanding of Python, HTML and Jinja Templating
-   PostgreSQL
-   PostGIS

Before we start coding, we need to do basic setup. Then, we will create and activate a new environment called env. [Click here](https://www.section.io/engineering-education/introduction-to-virtual-environments-and-dependency-managers/) to learn how to create a new virtual environment.

### Building the database
We begin database installation by installing `Postgis`. 

First, download and install the software from this [link](https://postgis.net/install). Next, we will create the database from our terminal and sign in as a `Postgres user` by running the command below. Ensure you enter your user password once the command executes.

```bash
psql -U Postgres
```

The next step is to create the database:
```bash
CREATE DATABASE geodata
```

We need to connect the database to the project and also enable the Postgis extension on it using the code below:

```bash
\c geodata;
CREATE EXTENSION postgis;
\q
```

We connected to the database using `\c geodata;` while `CREATE EXTENSION postgis;` enables the PostGIS extension, and we quit psql using `\q`.

The next step is to connect our database to the project so let us install Flask, geoalchemy2, flask_sqlalchemy and psycopg2.

```bash
pip install flask geoalchemy2 flask_sqlalchemy psycopg2
```

Create a new file `app.py` and type the following code snippet:

```py
from flask import Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'Thisissecret!'
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:password@localhost/geodata'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000", debug=True)
```

We created a new Flask instance in the app variable, which we can use in our project. We also created a secret key that should be changed to a secure key.  You can generate a random number using UUID. The last section tells the app to run when the condition __name__ == "__main__" is true.

```py
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:password@localhost/geodata'
```
PostgreSQL tells sqlalchemy that we are using a PostgreSQL database management system.

- Postgres: is our database user
- password: is the database user password
- geodata: is the database that we will use


We will connect our database to the project using flask_sqlalchemy.

```py
from flask_sqlalchemy import SQLAlchemy
```

After importing, we will merge the instance to our app using:

```py
db = SQLAlchemy(app)
```

We will use the `db` object to create our models and save data to our database. 

It is time to create our table. Let us call it `AoiCordinate`, and it will have a geometry column called `coordinate` to store all our coordinates:

```py
class AoiCoordinate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    aoi = db.Column(db.String(50), nullable=False)
    coordinate = db.Column(Geometry('POLYGON'))
```

We will use Python shell to create our database by importing the db object.

```py
from app import db
db.create_all()
exit()
```

### Saving the coordinates
Users can submit their coordinates by filling up a form and uploading a `geojson` file or `shapefile`, so let us create the submission endpoint. 

Let us add the snippet below to our `app.py` file.

```py
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        aoi = request.form.get('aoi')
        file = request.files['file']
        read_file = file.read()
        file_json = json.loads(read_file)
        aoi_coordinate = file_json["features"][0]['geometry']
        coordinate = AoiCoordinate(aoi=aoi, coordinate=json.dumps(aoi_coordinate))
        db.session.add(coordinate)
        db.session.commit()

        return aoi
return render_template('index.html')
```

The `@app.route('/', methods=['GET', 'POST'])` creates the endpoint that accepts GET and POST requests. We create a function called `index` and it renders the `index.html` page. 

Inside the function, we check if the request is a POST request to process the form. The variable `aoi` stores the user area of interest, while the `file` stores the uploaded coordinate. 

The file content was read using the `read()` method and converted to a JSON object using `json. loads()`. 

The `aoi_coordinate` variable selects the coordinates of the Polygon from `file_json`. The coordinate variable adds the `aoi` and `coordinate` as defined in our model.

Finally, we added the coordinate to our database and committed the changes using the db object.

Flask uses the Jinja templating method to render HTML pages, and that Is what we will use in this tutorial. [Click here](https://hackersandslackers.com/flask-jinja-templates/)  to read more about Jinja templating.

HTML pages are stored in the templates folder, so let Us create a new folder called `templates` in our root directory. Inside the templates folder, we will also create a new file called ``index.html. Finally, we will use bootstrap 5.1 to style our form.

```html
<form action="{{url_for('index')}}",  method="post">
   <div class="mb-3">
      <label for="exampleInputText" class="form-label">Location</label>
      <input type="text" class="form-control" id="exampleInputText" >
   </div>
   <div class="mb-3">
      <label for="formFile" class="form-label">Upload Coordinate</label>
      <input class="form-control" name="coordinate" type="file" id="formFile">
   </div>
   <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Displaying the coordinates
Create another route that will display all the saved coordinates. The coordinates are saved as binary, so we will use `geoalchemy2 to_shape` to convert it to readable coordinates. 

We will import `to_shape` and use these snippets to retrieve all our coordinates.

```py
from geoalchemy2.shape import to_shape

@app.route('/all')
def all_coordinate():
    coordinates = AoiCoordinate.query.all()

    all_cord = []
    for location in coordinates:
        location_coordinate = to_shape(location.coordinate)
        location_aoi = location.aoi
        location = {
            'location_coordinate': location_coordinate,
            'location_aoi': location_aoi
        }
        all_cord.append(location)

    return render_template('all.html', all_coordinates=all_cord)
```

We queried the database and retrieved all the coordinates in the coordinates variable. Since they are stored as binary, we need to convert them back to coordinates by looping through them and appending them to the empty list `all_cord`. 

While looping, each coordinate is saved in the `location_coordinate` variable.

The location dictionary stores each location Aoi and coordinate and is appended to the `all_coord` list. We stored the list in `all_coordinates` and passed it to the `all.html` page.


Let us create the `all.html` page that extends the `., using the codes below:

```html
{% extends 'base.html' %}

{% block main %}

<div class="container">
    <table class="table">
  <thead>
    <tr>
      <th scope="col">AOI</th>
      <th scope="col">Coordinate</th>
    </tr>
  </thead>
  <tbody>
  {% for coordinate in all_coordinates %}
    <tr>
      <td>{{coordinate.location_aoi}}</td>
       <td>{{coordinate.location_coordinate}}</td>
    </tr>
    {% endfor %}
  </tbody>
</table>
```

### Conclusion
This tutorial taught us how to create a geospatial server and database that saves and returns location coordinates. The app can be further built as an API service and rendered to logistics companies because they can quickly coordinate a particular location. 

### Further Reading
- [Python Virtual Environment](https://www.section.io/engineering-education/introduction-to-virtual-environments-and-dependency-managers/) 
- [Flask Jinja Templating](https://hackersandslackers.com/flask-jinja-templates/) 
- [Github Repository](https://github.com/isaiaholadapo/geoserver-and-geodatabase)

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
