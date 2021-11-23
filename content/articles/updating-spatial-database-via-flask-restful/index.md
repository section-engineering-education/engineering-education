We are building a REST API that can be used to update a geospatial database. Using flask restful, we will perform basic CRUD(create, read, update and delete) operations on spatial data. It is recommended that readers should know how to create a geospatial database. You can click here to learn how to create a geodatabase using flask, PostgreSQL and Postgis. 

In this tutorial, we will learn how to create, read, update and delete spatial data from a geospatial database using flask_restful. We will be converting the code in this [tutorial](https://www.section.io/engineering-education/how-to-create-a-geoserver-and-geodatabase/) to API, so that it can accept a request from different apps such as mobile apps, web-apps and desktop apps.

### Table of Contents
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Post Request](#post-request)
- [Get Request](#get-request)
- [Get coordinate by ID](#get-coordinate-by-id)
- [Update Coordinate](#update-coordinate)
- [Delete](#delete)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)



### Prerequisites
* How to create a Flask app
* How to use Postman

Readers need to know how to create a geospatial database and server, you can [click here](https://www.section.io/engineering-education/how-to-create-a-geoserver-and-geodatabase/) to read this tutorial on how to create a geospatial database, server and a new flask app.

### Setup
First, install Flask Restful, by typing in your terminal 
```bash
pip install flask_restful
```
The next step is to import the  API object from flask_restful and store it in a variable called `api` 
```py
from flask_restful import Api
api = Api(app)
```
After creating the api variable we will need to create our API endpoints. The api object and the add_resource() method will be used in creating our endpoints.

### Post Request
Flask-Restful resources give us access to different HTTP methods and one resource can contain multiple HTTP methods such as: get, post, put and delete. Each method will return a value and a response code after execution. Using the code snippet below let's create our first class Coordinate using flask restful resource. The route will use the post request method for saving coordinates to the database

```py
from flask_restful import Api, Resource

class Coordinate(Resource):
    def post(self):
        response = {
            "status": 400,
            "message": "Coordinate not saved"
        }
        aoi = request.form.get('aoi')
        file = request.files['coordinate']
        read_file = file.read()
        file_json = json.loads(read_file)
        aoi_coordinate = file_json["features"][0]['geometry']
        coordinate = AoiCoordinate(aoi=aoi, coordinate=json.dumps(aoi_coordinate))
        db.session.add(coordinate)
        db.session.commit()

        response['status'] = 201
        response['message'] = "Coordinate saved successfully"

        return response, 201
```
We imported Resource from flask_restful and used it in creating the class `Coordinate` this enables us to add the post method to the class, this means that it will accept only a post request. The response variable will be returned to the users after each submission. If the form is not saved successfully, the default response will be returned with a status code of 400(bad requested) which means the request was not fulfilled but if the form was saved successfully the updated response is an update tis returned  `Coordinate saved successfully` and the status code changed to 201(created) which means the request has been fulfilled. 

In order to make the resource accessible, we will create an endpoint using the api object that was created earlier and the  `add_resource()` method from flask_restful. The add_resource() accepts some parameters such as the route and the endpoint. Let's create our first endpoint.
```py
api.add_resource(Coordinate, "/api/coordinate")
```
We passed the Coordinate class and the endpoint as parameters to the add_resource() method. 

### Get Request
Get request is used for retrieving data from the database, in this method, we will retrieve all the data that has been saved in the geodatabase using the get request method.

```py
class Coordinates(Resource):
    def get(self):
        response = {
            "status": 204,
            "message": "No coordinate available"
        }

        coordinates = AoiCoordinate.query.all()

        if coordinates:

            all_cord = []
            for location in coordinates:

                location_details = {
                    'id': location.id,
                    'location_coordinate': str(to_shape(location.coordinate)),
                    'location_aoi': location.aoi
                }
                all_cord.append(location_details)
            response['status'] = 200
            response['message'] = all_cord
            return response, 200
        return response, 200
```
We created a new class called Coordinates. The name is plural because it will retrieve all the coordinates that are saved in the database. The naming convention is important in API because it represents what the class entails. We used only one method because we want to retrieve only the saved data. If it fetches coordinates from the database it will return the updated response message and 200 status code but if none is available it returns 204.

In order to create the endpoint, we will also pass the class and endpoint name as parameters to the add_resource method.

```py
api.add_resource(Coordinates, "/api/coordinates")
```

### Get coordinate by ID
We can retrieve a specific coordinate using its id, it will be passed as a parameter to the URL.
```py
class CoordinateId(Resource):
    def get(self, coordinate_id):
        response = {
            "status": 204,
            "message": "Coordinate not available"
        }
        aoi_details = AoiCoordinate.query.filter_by(id=coordinate_id).first()
        if aoi_details:

            details = {
                "id": aoi_details.id,
                "location_coordinate": str(to_shape(aoi_details.coordinate)),
                "location_aoi": aoi_details.aoi
            }
            response['status'] = 200
            response['message'] = details
            return response, 200
        return response, 204
```

We created a new class `CoordinateId`. ID was added to its name because we will retrieve coordinates using their ID. We added a new parameter `cordinate_id` to the get method because it will display the ID that is passed to the method. The ID is also passed to the search query in order to retrieve it from the database. If the ID is available it will be displayed and status code 200 is returned but if it's not available the default response message is displayed and the status code 204 is returned. The `coordinate_id` will be passed as a parameter to the URL also.
```py
api.add_resource(CoordinateId, '/api/coordinate/<int:coordinate_id>')
```
We can only pass an integer to the URL because we specify our variable type as an integer. The coordinate_id will be passed from the URL to the get method, which will be used to fetch the coordinate from our database.

### Update Coordinate
After retrieving a coordinate using its ID we can update it by sending a put request from Postman with the updated fields.
```py
 def put(self, coordinate_id):
        response = {
            "status": 204,
            "message": "AOI is not available"
        }
        aoi_details = AoiCoordinate.query.filter_by(id=coordinate_id).first()
        if aoi_details:
            file = request.files['coordinate']
            aoi = request.form.get('aoi')
            read_file = file.read()
            file_json = json.loads(read_file)
            aoi_coordinate = file_json["features"][0]['geometry']

            aoi_details.coordinate = aoi_coordinate
            aoi_details.aoi = aoi
            db.session.commit()

            response['status'] = 200
            response['message'] = "aoi updated successfully"
            return response, 200
        return response, 204
```
Just like the last get method, the Put method also accepts the coordinate_id that was passed from the URL, and it will use the same endpoint.

### Delete
This method is used for deleting the selected coordinate by sending a delete request from Postman. We will add the method to the CoordinateId class so that it will receive the coordinate_id.

```py

    def delete(self, coordinate_id):
        response = {
            "status": 204,
            "message": "AOI is not available"
        }
        aoi = AoiCoordinate.query.filter_by(id=coordinate_id)
        if aoi:
            db.session.delete(aoi)
            db.session.commit()
            response['status'] = 200
            response['message'] = 'Aoi deleted successfully'
            return response, 200
```

If the coordinate is deleted successfully it will return the updated response code and status 200, but if not the default response will be returned.

### Conclusion
We have created an API that can be used for creating, reading, updating and deleting records from a database. It can be deployed for mobile, web and desktop apps.

### Further Reading
- [How to create a Geoserver and Geodatabase](https://www.section.io/engineering-education/how-to-create-a-geoserver-and-geodatabase/)
- [Flask Restful](https://flask-restful.readthedocs.io/en/latest)
- [HTTP status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)


[Github repository](https://github.com/isaiaholadapo/api-geodatabase)
