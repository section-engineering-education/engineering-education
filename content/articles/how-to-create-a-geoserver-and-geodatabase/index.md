In this tutorial, we will learn how to create a geospatial server and database, the server will power the database and will serve as the gateway between the users and the spatial database. Let's define some keywords:

Spatial data is any data that contains the longitude and latitude  of any location, they provide information about a physical location and are also referred to as Geographic Information System(GIS). 

Geoserver is a server that processes spatial data and also powers a geodatabase. It serves as the link between geodatabase and users by giving them access to spatial data.

The geodatabase is a database that stores spatial data, it allows users to create, update, retrieve and delete spatial data. The data can be stored as points, lines or polygons. We will use PostgreSQL extension call Postgis so that the database can handle spatial data.

## Table of Contents
-  [Prerequisites](#prerequisites)
- [Database](#database)
- [Saving Coordinates](#saving-coordinates)
- [Displaying Coordinates](#displaying-coordinates)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

##Prerequisites
-   Basic understanding of Python, HTMl and Jinja Templating
-   PostgreSQL
-   PostGis


Before we start coding we need to do some basic setup, We will create and activate a new environment called env, [click here](https://www.section.io/engineering-education/introduction-to-virtual-environments-and-dependency-managers/) to learn how to create a new virtual environment

let's create a database called geodata in PostgreSQL

##Database
Let's start by installing Postgis, download and install the software from `https://postgis.net/install`. We will create the database from our terminal. let's sign in as a postgres user and type your postgres user password:

`psql -U postgres`

The next step is to create the database type:
`CREATE DATABASE geodata;`

We need to connect the database and also enable the Postgis extension on it using the code below:
```
\c geodata;
CREATE EXTENSION postgis;
\q
```
We connected to the database using `\c geodata;` while `CREATE EXTENSION postgis;` enabled the postgis extension and we quit psql using `\q`

The next step is to connect our database to the project so let's install Flask, geoalchemy2, flask_sqlalchemy and psycopg2

we will install flask by using:
`pip install flask geoalchemy2 flask_sqlalchemy psycopg2`

let's start building our project, let's create a new file app.py and type the following codes:
```
from flask import Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'Thisissecret!'
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:password@localhost/geodata'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


if __name__ == "__main__":
    app.run(host="127.0.0.1", port="5000", debug=True)
```

We created a new Flask instance in the app variable which we can use in some parts of our project. We also created a secret key, it should be changed to a secure key you can generate a random number using UUID. The last section tells the app to run when the condition __name__ == "__main__" is true.

The code app.run starts our server and it's running on the ip 127.0.01 and on the default port 5000 the port can be changed to any 4 number as long as it's not being used by any app/software and the server will work effectively.
```
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:password@localhost/geodata'
```
postgresql tells sqlalchemy that we are using a PostgreSQL database management system
postgres: is our database user
password: is the database user password
geodata: is the database that we will use


We will connect our database to the project using flask_sqlalchemy, we will import from SQLAlchemy using:
`from flask_sqlalchemy import SQLAlchemy`

After importing we will merge the instance to our app using:
`db = SQLAlchemy(app)`
We will use the db object to create our models and for saving data to our database. 

It's time to create our table, let's call it AoiCordinate and it will have a geometry column called coordinate  it will store all our coordinates:
```
class AoiCoordinate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    aoi = db.Column(db.String(50), nullable=False)
    coordinate = db.Column(Geometry('POLYGON'))
```
We will use Python shell to create our database by importing the db object, in your terminal type python next import the db object
```
from app import db
db.create_all()
exit()
```

## Saving Coordinates

Users can submit their coordinates by filling a form and uploading a geojson file or shapefile, so let's create the submission endpoint. Let's add these codes to our app.py file

```
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

The `@app.route('/', methods=['GET', 'POST'])` creates the endpoint it means that the form will be displayed on the homepage and it will accept GET and POST requests. We create a function called index and it renders the index.html page. Inside the function, we checked if the request is a POST request so that we can processing the form. The variable aoi stores the user area of interest, while the file variable stores the uploaded coordinate. The file content was read using the read() method and converted to a JSON object using `json.loads()`. 

The aoi_coordinate variable selects the coordinates of the Polygon from file_json, the coordinate variable adds the aoi and coordinate as defined in our model. We added the coordinate to our database and committed the changes using the db object.

Flask uses the Jinja templating method to render HTML pages and that's what we will used in this tutorial. [Click here](https://hackersandslackers.com/flask-jinja-templates/)  to read more about Jinja templating.

HTML pages are stored in the templates folder, so let's create a new folder called templates in our root directory. Inside the templates folder, we will also create a new file called index.html. We will use bootstrap 5.1 to style our form.
```
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
The form action attributes tell the browser that the request will be processed on the homepage, while the methods mean that it's a post request. 

## Displaying Coordinates
Let's create another route that will display all the saved coordinates, the coordinates are saved as binary so we will use geoalchemy2 to_shape to convert it to coordinates. 
We will import to_shape and use these codes to retrieve all our coordinates.
```
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
We queried the database and retrieve all the coordinates in the coordinates variable. Since they are stored as binary we need to convert them back to coordinates by looping through them and appending them to the empty list all_cord. While looping each coordinate is saved in the location_coordinate variable, while the aoi is saved in the location_aoi variable.

The location dictionary stores each location aoi and coordinate and it's appended to the all_coord list. We stored the list in all_coordinates and passed it to the all.html page.


Let's create the all.html page and it will extend the base.html, the page will display all our coordinates, using the codes below:
```
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

We looped through the all_coordinates that was passed from the app.py so that we can get each location aoi and coordinate.


##Conclusion
In this tutorial we learnt how to create a soespatial server and database, that saves and return a location coordinates. The app can be further built as an API service and rendered to logistics company because they can easily get's the coordinate of a prticular location. 

## Further Reading
- [Python Virtual Environment](https://www.section.io/engineering-education/introduction-to-virtual-environments-and-dependency-managers/) 

- [Flask Jinja Templating](https://hackersandslackers.com/flask-jinja-templates/) 

[Github Repository](https://github.com/isaiaholadapo/geoserver-and-geodatabase)
