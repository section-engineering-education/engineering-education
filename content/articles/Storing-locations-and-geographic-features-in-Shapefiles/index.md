

A shapefile is a vector data having geometric attributes defined by projection. When sending a shapefile as a zipped file it is advisable that the files are stored in the rooted directory and not in another folder so that they can be easily accessed. 

## Requirements: 
- How to create a flask app 
-  How to create a flask API using Flask Restful 
- How to create a virtualenv 

## Table of contents

- [Requirements:](#requirements)
- [Table of contents](#table-of-contents)
- [Point](#point)
- [Linestring](#linestring)
- [Polygon](#polygon)
- [Upload file](#upload-file)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

A shapefile contains at least 4 different file with the following extension .shp, .shx, .dbf, and .prj each file is used for storing different data: 
**shp**: This is the main file and it contains the features of the geometry it could be point, lines or polygon.
**shx**: This is the index file it is used to search forward and backwards. 
**dbf**: It is the standard database file and it contains the attribute data and object IDs. 
**prj**: This is an optional file its main purpose is to store the metadata associated with the projection and coordinate system it also helps in understanding the data in the .shp file.
The 3 main files in a shapefile are .shp, .shx and .dbf while the .prj is an optional file, its absence will result in “unknown coordinate system” error. A shapefile can be created by using different software such as: 
- Software: Qgis, Arcgis, Google earth 
-  Website: Geojson.io 
- Python library: Pyshp, Geopandas 

In this tutorial, we will use a python library called Pyshp, Flask and Flask Restful for reading and creating shapefiles. Coordinates can be stored as points, lines or polygons we will start by creating a shapefile that contains on point .
## Point 
The first step in creating a shapefile is to install the required library using pip and also set up the project. You can read [this article](https://www.section.io/engineering-education/complete-guide-on-installing-flask-for-beginners/) on how to create a flask app and [this one](https://www.section.io/engineering-education/flask-crud-api/) on how to create Flask API. 
```bash 
pip install Flask, Flask-RESTful, pyshp 
``` 
We will start by creating a shapefile that contains a point and some records about the point. 
```python 
class CreatePoint(Resource): 
	def post(self): 
		point_a_lat = request.json.get('point_a_lat') 
		point_a_lon = request.json.get('point_a_lon') 
		shp = shapefile.Writer('point') 
		shp.field('name', 'C') 
		shp.point(point_a_lat, point_a_lon) 
		shp.record('point1') 
		shp.close() 
	return 'done' 
``` 

- The variables point_a_lat and point_a_lon accept the data sent via the API request. 
- The shp initiates a new Writer instance 
-  shp.field('name', 'C') is the field name and its described data at the column index, while the letter 'C' is the field type(Character or Text) 
- shp.point() the point method creates a point using the X and Y values. 
- shp.record() it contains the records that we want to store in a field.
The CreatePoint class will create a shapefile called 'point' with the following extensions: .shp, .dbf and .shx 

## Linestring 
A linestring contains a minimum of 2 point(point a & point b) that are joined together, a shapefile can contain multiple lines and different methods. The code snippet below will create a linstring. 
```python 
class CreateLine(Resource): 
	def post(self): 
		point_a_lat = request.json.get('point_a_lat') 
		point_a_lon = request.json.get('point_a_lon') 
		point_b_lat = request.json.get('point_b_lat') 
		point_b_lon = request.json.get('point_b_lon') 
		shp = shapefile.Writer('line') 
		shp.field('state', 'C') 
		shp.field('School', 'C', size=250) 
		shp.line([[[point_a_lat, point_a_lon], [point_b_lat, point_b_lon]]]) 
		shp.record('Lagos', 'ABC') 
		shp.close() 
	return 'done' 
``` 
The code snippet above will create a linestring from point a to point b and will also contain 2 records with fields state and school. You will observe that we have 2 fields and 1 record, this is because we have only 1 linestring. If we want to have multiple records we need to create more line strings. A linestring can only 1 record while a record can contain multiple fields.
 ## Polygon 
 We will follow the same procedure in creating a polygon the major difference between a polygon and linestring is that a polygin needs a minimum of 3 vertices . Let's create a polygon using the code snippets below. 
```py 
class CreatePolygon(Resource): 
	def post(self): 
		point_a_lat = request.json.get('point_a_lat') 
		point_a_lon = request.json.get('point_a_lon') 
		point_b_lat = request.json.get('point_b_lat') 
		point_b_lon = request.json.get('point_b_lon') 
		point_c_lat = request.json.get('point_c_lat') 
		point_c_lon = request.json.get('point_c_lon') 
		point_d_lat = request.json.get('point_d_lat') 
		point_d_lon = request.json.get('point_d_lon') 
		shp = shapefile.Writer('poly') 
		shp.field('name', 'C') 
		shp.poly([ [[point_a_lat,point_a_lon], [point_b_lat,point_b_lon],[point_c_lat,point_c_lon], [point_d_lat,point_d_lon], [point_a_lat,point_a_lon]] ]) 
		shp.record('polygon') 
		shp.close() 
		return 'done' 
``` 
The polygon has 4 vertices, we also notice that the first and the last point are the same, this means that a polygon starts and ends from the same point. ## Reading Shapefile After creating shapefiles, we need to be able to read the information that is stored in them. When uploading a shapefile it's recommended that all the files are zipped in the root directory, so we will upload a zipped shapefile and create a python function that will unzip and upload it to the right directory.

```py
from  zipfile  import  ZipFile
#unzip shapefile
def  unzip_shapefile(shp):
	shape_files = []
	with  ZipFile(shp) as  zipObj:
		zipObj.extractall('media/shapefile/')
		list_files = zipObj.namelist()
		for  elem  in  list_files:
			shape_files.append(elem)
		shape_file = shape_files[0]
		file_name = os.path.splitext(shape_file)[0]
		file_path = 'media/shapefile/' + file_name + '.shp'
	return  file_path
```

Using the Zipfile module we will extract the zipped file, the zipfile initializer accepts the file path and extract it to the shapefile directory created inside the media directory. Using a for loop, we looped thorugh all the files in the folder and append them to the shape_files list. The python splitext() method will split the path into the pair root and extension. The shapefile path is stored in the file_path variable and is returned by the function.

## Upload file
The uploaded shapefile will saved in a shapefile folder created inside the media folder. you can read more about how to upload files on flask using this [link](https://flask.palletsprojects.com/en/2.1.x/patterns/fileuploads/).
```py
class  ReadShapefile(Resource):

	def  post(self):
		file = request.files['file']
		if  'file'  not  in  request.files:
			flash('No file part')
			return  redirect(request.url)

		if  file.filename == '':
			flash('No selected file')
			return  redirect(request.url)

		if  file  and  allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
			
		with shapefile.Reader(unzip_shapefile(file)) as  shp:
			print(shp.bbox)
			print(shp.records())
			print(len(shp))

		return  'done'
```

We used the Reader class as a context manager so that it can close teh file object when we are done reading, we also checkrd for the meta-data such as the bounding box(bbox), records and lenght.

## Conclusion
In this tutorial, we learnt how to create and read data from shapefiles using Pyshp, the data stored in the shapefile can be analyzed using pyshp, geopandas, Qgis and other.
 Shapefiles can store different types of data and the data can be transferred to a database using python or gis softwares. Shapefile should not be used for storing large because they have a size limit of 2gb which is around 70 million point features.
## Further Reading
- [Pyshp](https://pypi.org/project/pyshp/)

[Github Link](https://github.com/yahaguman/Storing-locations-and-geographic-features-in-Shapefiles)

