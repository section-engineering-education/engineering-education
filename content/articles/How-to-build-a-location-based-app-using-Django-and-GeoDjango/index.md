In this tutorial, we will display facilities that are close to a user using the geolocation feature from GeoDjango. We will also store the facilities in our Geospatial database. We will build a web app that shows hotels in a particular region using the packages listed below.

### Table of contents
- [Prerequisite](#prerequisite)
- [Setup](#setup)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Prerequisite
- GeoDjango 
- Django
- PostgreSQL
- PostGIS extension
- Overpass Turbo.
- PostgreSQL
- Pycharm or any text editor

Let us look at the tools that we will use to build our app:
**GeoDjango:** is a Django module that is used for creating geographic applications, manage spatial databases in Python and is integrated with Django but it can work as a standalone framework as well.
**Django:** is a python framework that uses the model–template–views (MTV) architectural pattern and is used for building a web-apps.
**PostgreSQL:** A Relational Database Management System that is free and open-source, focuses on maintaining extensibility and SQL compliance.
**PostGIS:** is a PostgreSQL addon that manages spatial data. 
Overpass Turbo is an OpenStreetMap web-based tool for analysing large data.

### Objectives
The aim of this tutorial is to teach reader, how to:
- Build a gis application from scratch
- Create a spatial database use spatial features
- Implement geolocation features

### Setup
We will create our virtual environment and also install the prerequisites that we will use for the project: Let's type the following codes in our terminal to create and activate the virtual environment. 
```
virtualenv env 
env\scripts\activate
```
The virtual environment has been activated, the next step is to install prerequisites using Python3-pip. The codes below will install Django and Psycopg2
` pip install django psycopg2-binary ` The next step is to install GeoDjango use the link below to download the step up and also follow the instruction on this page on how to install it.
`https://docs.djangoproject.com/en/3.2/ref/contrib/gis/install/#windows`
We will use the codes below to create our spatial database from the terminal. Type your Postgres password when prompted for a password.
```
psql -U postgres CREATE DATABASE hotel; \c hotel;
CREATE EXTENSION postgis;
```
Now that we are done setting up the prerequisites, we create our web app and start coding. In your terminal type
```
django-admin startproject mysite
``` 
The code above created a project called mysite inside the src folder.

The next step is to create a hotel app that will display all the hotels in a given area. But before we do that we need to add Deodjango to our installed app sections in the `settings.py` file. Ad d this code to the last line: 'django.contrib.gis'
```
INSTALLED_APPS = [ 
    'django.contrib.admin', 
    'django.contrib.auth', 
    'django.contrib.contenttypes',
    'django.contrib.sessions', 
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis', ]
```
Type the following code in your terminal to create a new app. `py manage.py` startapp hotels We will also add the new app to the list of the installed app in the `settings.py` file: 'hotels'
The updated installed app should look like this
```
INSTALLED_APPS = [ 
    'django.contrib.admin',
    'django.contrib.auth', 
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.gis',
    'hotels', 
    ] 
```
### Database Connection
Now that we have created our project, we will connect it to our database by editing the code in `settings.py`. Open the src folder in your Pychamr or any text editor. Open mysite folder and click the `settings.py` file.
```
 DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'facility',
        'USER': 'myprojectuser',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}
```
Ensure to edit the database credentials accordingly to what you have on your pc. 
Let's create our models, it will contain the following fields name, location and address. Let add these codes to the `hotel/models.py` file
```
from django.db import models 
from django.contrib.gis.db import models 

class Hotel(models.Model): 
name = models.CharField(max_length=100) 
location = models.PointField() 
address = models.CharField(max_length=100)
```
The location field is created as a point field because we want to save the coordinate of each hotel. In Django we don't need to write SQL queries to create our tables, the codes in the model file will be will create the table during migration because the model act as an abstraction layer between Django and the database. So type the following codes in your terminal to create our tables.
```
python manage.py makemigrations
python manage.py migrate
```
We need to update the `admin.py` file in hotels/admin.py with these codes so that we can view the tables in the admin dashboard.
```
from django.contrib.gis.admin import OSMGeoAdmin 
from .models import Hotel 

@admin.register(Hotel) 
class HotelAdmin(OSMGeoAdmin): 
list_display = ('name', 'location', 'address')
```
Before we can access the admin panel, we will create the superuser. Let's type some codes in our terminal and following the instructions.
```
python manage.py createsuperuser
```
Let login to the admin dashboard by typing the following codes in our terminal to start the server.
```
python manage.py runserver
```
The web app is running on ```http://127.0.0.1:8000/``` but we need to populate the database with a dummy database from Overpass Turbo. We will do that from the admin dashboard using the URL below: ```http://127.0.0.1:8000/admin```.

### Importing Dummy Data
 Click on the link below: `https://overpass-turbo.eu/` and  click the wizard button. Type `tourism=hotel in Miami` in the text field. Now select the build and run query wizard button. It will build the query, so the next step is to select the export button. Locate the data, section and click on download/copy as raw OSM data. This is to download a JSON file. Copy the downloaded file to the project folder and rename it as hotels.json To populate our database, we need to create an empty migration. Run this code in your terminal
```
python manage.py makemigrations hotels --empty
```
The next step is for us to edit the migration file in hotels/migrations/0002_auto_20210821_1617.py`. So let's do some import.
```
import json
from django.contrib.gis.geos import fromstr
from pathlib import Path
```
Next we will create the load_data() function
```
DATA_FILENAME = 'export.json'
def load_data(apps, schema_editor):
    Facility = apps.get_model('facilities', 'Facility')
    jsonfile = Path(__file__).parents[2] / DATA_FILENAME

    with open(str(jsonfile), encoding="utf8") as datafile:
        objects = json.load(datafile)
        for obj in objects['elements']:
            try:
                objType = obj['type']
                if objType == 'node':
                    tags = obj['tags']
                    name = tags.get('name','no-name')
                    longitude = obj.get('lon', 0)
                    latitude = obj.get('lat', 0)
                    location = fromstr(f'POINT({longitude} {latitude})', srid=4326)
                    Facility(name=name, location=location).save()
            except KeyError:
                pass 
```

We loop through the objects of the element containing the location and tags shop, inside the loop we extracted the name and coordinates. Then we return a valid GEOSGeometry object that is corresponding to spatial data. The with statement automatically close the file. We will call the function inside the Migration class.

```
operations = [
        migrations.RunPython(load_data)
    ]
```
Here is a copy of the migration file


    from django.db import migrations  
    import json  
    from django.contrib.gis.geos import fromstr  
    from pathlib import Path  
    DATA_FILENAME = 'hotels.json'  
    def load_data(apps, schema_editor):  
    Hotel = apps.get_model('hotels', 'Hotel')  
    jsonfile = Path(__file__).parents[2] / DATA_FILENAME  
 
    with open(str(jsonfile)) as datafile:  
        objects = json.load(datafile)  
        for obj in objects['elements']:  
            try:  
                objType = obj['type']  
                if objType == 'node':  
                    tags = obj['tags']  
                    name = tags.get('name','no-name')  
                    longitude = obj.get('lon', 0)  
                    latitude = obj.get('lat', 0)  
                    location = fromstr(f'POINT({longitude} {latitude})', srid=4326)  
                    Hotel(name=name, location=location).save()  
            except KeyError:  
                pass  
    class Migration(migrations.Migration):  
    dependencies = [  
        ('hotels', '0001_initial'),  
    ]  
  
    operations = [  
        migrations.RunPython(load_data)  
    ]

So let's finish the migration by running:
```
python manage.py migrate
```
from the terminal.

You can log in to the admin dashboard to view all the imported hotels.

### Creating Homepage 

Right now we will display all the hotels using Django views, we will use the generic ListView class function. Let's open the hotels/views.py file and type some code.
```
from django.views import generic
from django.contrib.gis.geos import fromstr
from django.contrib.gis.db.models.functions import Distance
from .models import Hotel
```
We will create a variable that stores the user current coordinates.

    longitude = -80.191788  
    latitude = 25.761681  
      
    user_coordinate = Point(longitude, latitude, srid=4326)

Next, we will query our database for hotels that are within the user coordinate.

    class HotelListView(generic.ListView):  
        model = Hotel  
        context_object_name = 'shops'  
      queryset = Hotel.objects.annotate(distance=Distance('location', user_coordinate)).order_by('distance')[0:6]  


The queryset uses the .annotate() to calculate the distance between the user coordinate and the nearest hotel. Next, we will create the home page where the user will see the hotels that are within his region. We will create the index.html file in `hotels/templates/hotels/home_list.html`

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Nearby Hotels</title>
        </head>
    <body>
    <h1>Nearby Hotels</h1>
    {% if hotels %}
    <ul>
    {% for hotel in hotels %}
        <li>
        {{ hotel.name }}: {{hotel.distance}}
        </li>
    {% endfor %}
    </ul>
    {% endif %}
    </body>
    </html>
    

We need to add the HotelListView class to our `url.py` file so that we can view the web app. So let edit the file in mysite/urls.py. We will import views and create a URL for the home page

    from hotels import views
    urlpatterns = [  
      path('admin/', admin.site.urls),  
      path('', views.HotelListView.as_view())  
    ]
Let start our server `python manage.py runserver` in our terminal. All the hotels that are closed to the user will be displayed on the homepage.


## Conclusion
Congratulations on building a location-based web-app using Django, GeoDjango, POSTGIS, Overpass Turbo and PostgreSQL. The web-app can be upgraded to get the user location automatically using HTML5 Geolocation API. 
[Link to GitHub repository](https://github.com/isaiaholadapo/Djang-Geodjango-location-app.git)


## Further Reading
[How to install Gdal](https://docs.djangoproject.com/en/2.1/ref/contrib/gis/install/#windows)

[How to make Overpass turbo queries](http://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_QL)

[Geodjango tutorial](https://docs.djangoproject.com/en/3.2/ref/contrib/gis/tutorial/)