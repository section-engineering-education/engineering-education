Before the concept of microservice services, developers used the monolith architecture to develop applications. Every part of the application is designed as interconnected and interdependent.

This architecture runs the application components as tightly coupled. This means each component and its associated components must be present in order to execute the whole application. Each component is dependent on the other. If one component fails prematurely, the entire application will be affected and will fail to execute as expected.

As technology progresses, more development architectures are being designed to mitigate the disadvantages of monolith architecture. Microservices are among the most popular architectures that help developers avoid the monolith of interdependent components.

A microservice architecture (MSA) is a logical structure for designing an application involving loosely-coupled modular components called microservices. It allows you to build different components with unique capabilities. Each component is called a microservice.

Each microservice can focus on only one single capability. With microservice architecture, all the components are divided into separate modules. They communicate with each other using a well-defined interface. They communicate through APIs. These APIs are loosely-coupled; if one fil, it does not affect the whole system.

In this tutorial, you will understand the concept of microservice architecture while implementing it as a Flask REST API.

### Prerequisites

To follow along with this tutorial, ensure you have:

- [Python 3 and PIP](https://www.python.org/downloads/) are installed on your computer.
- Some basic understanding of how to write Python script.
- [Visual Studio Code](https://code.visualstudio.com/) is installed on your computer.

- [Prerequisites](#prerequisites)
- [Installing Flask](#installing-flask)
- [Creating an MSA with Flask](#creating-an-msa-with-flask)
  - [Step 1: Install Flask-RESTPlus](#step-1-install-flask-restplus)
  - [Step 2: Create a Data Source](#step-2-create-a-data-source)
  - [Step 3: Import the Application Dependencies](#step-3-import-the-application-dependencies)
  - [Step 4: Set the API Entry Point](#step-4-set-the-api-entry-point)
  - [Step 5: Load the JSON Data to the Application](#step-5-load-the-json-data-to-the-application)
  - [Step 6: Create the Data Model](#step-6-create-the-data-model)
  - [Step 7: Define the Application Routes](#step-7-define-the-application-routes)
  - [Step 8: Access Specific Microservice Data](#step-8-access-specific-microservice-data)
  - [Step 9: Execute the API](#step-9-execute-the-api)
- [Conclusion](#conclusion)

### Installing Flask

First, create a project folder where you want your application to live. Open this folder using the Visual Studio Code editor.

Using the editor, open a terminal that points to this directory and set the Virtual environments. Virtual environments allow you to manage python dependencies for your application. To set up run:

For Windows:

```bash
python3 -m venv venv
```

For macOS/Linux:

```bash
py -3 -m venv venv
```

To activate the environment, run:

For Windows:

```bash
venv\Scripts\activate
```

For macOS/Linux:

```bash
. venv/bin/activate
```

To install Flask now is very straightforward as it only takes one command. Run the following PIP command to get Flask installed:

```bash
pip install flask
```

To test if Flask has installed correctly, create an `app.py` file inside the project directory and run this Flask hello world code block:

```py
```

To run it:

```bash
set FLASK_APP=app.py
```

Followed by:

```bash
flask run
```

Then opne `http://127.0.0.1:5000/` on your fovorte browser. A hello world works version of Flask will be served on your browser.

### Creating an MSA with Flask

Once you have a Flask environment running correctly, it's time to dive in and implement an MSA REST API with Flask. To create the API, follow these steps:

#### Step 1: Install Flask-RESTPlus

Flask-RESTPlus is a Flask-based extension that allows you to create REST APIs fast. It has a minimal setup that enables you to develop minimalistic flask APIs. To install this extension, run the following command:

```bash
pip install flask-restx
```

#### Step 2: Create a Data Source

An API consumes data from a server. This can include a database or a datastore files sucH JSON and XML. In this example, the API will interact with data from a JSON source. Therefore, create a `data.json` file in the root directory of your project. Then add some data using the following example as an illustration:

```JSON
{
    "movies_list": [
        {
            "title": "The Dare",
            "year": 2020,
            "cast": [
                "Richard Short",
                "Daniel Schutzmann",
                "Harry Jarvis"
            ],
            "image": "https://cdn.pixabay.com/photo/2018/01/03/01/17/film-3057394_1280.jpg",
            "description": "Evil Dead is some film."
        },
        {
            "title": "Don't Click",
            "year": 2020,
            "cast": [
                "Valter Skarsgård",
                "Mark Koufos",
                "Catherine Howard"
            ],
            "image": "https://cdn.pixabay.com/photo/2016/06/03/12/42/popcorn-1433327_1280.jpg",
            "description": "Annabelle Creation is some film."
        }
    ]
}
```

Use data to mimic the actual data that can be saved to a database.

#### Step 3: Import the Application Dependencies

This app will use the following dependencies:

```py
from flask import Flask, Response, request, abort
from flask import JSON, jsonify
from flask_restx import Api, Resource, fields
```

#### Step 4: Set the API Entry Point

- Create a Flask instance:

```py
app = Flask(__name__)
```

- Initialize Flask application entry point:

```py
api = Api(app)
```

- Add a namespace factory. This registers resources for the current API instance.

```py
ns_movies = api.namespace('ns_movies', description='Movies API')
```

#### Step 5: Load the JSON Data to the Application

This application needs access to the data source. The `data.json` is the resource required by the API. Thus Flask needs access to this file and reads the data as follows:

```py
f = open("./json.json", "r")
loaded_json = json.load(f)
movie_info = {
    f'{dct["title"]}-{dct["year"]}': dct for dct in loaded_json.get("movies_list")}
```

#### Step 6: Create the Data Model

The API access data is based on different parameters. This includes the field name, data type, etc. A data source can have many parameters. Thus you need a data model to dine the data the API will require from the source as follows:

```py
movie_data = api.model(

    'Movie Data',
    {
        "title": fields.String(description="Title of movie", required=True),
        "year": fields.Integer(description="Year released", required=True),
        "cast": fields.List(fields.String, description="Cast of movie", required=True),
        "image": fields.Url(description="Image Url", required=True),
        "description": fields.String(description="Description of movie", required=True)
    }
)
```

#### Step 7: Define the Application Routes

An API uses routes to access data. These routes are executed based on HTTP methods such as GET, POST, DELETE, etc.

- First, create the access route:

```py
@ns_movies.route("/")
```

- Add the data source

```py
class movies(Resource):
```

- Add the API get method:

```py
def get(self):
    return jsonify(movie_info)

```

- Define the API POST method:

```py
@api.expect(movie_data)
 def post(self):
      params = request.get_json()
       if (t := params.get("title", "")) and (y := params.get("year", "")):
            try:
                new_id = f'{t}-{y}'
                if new_id in movie_info.keys():
                    abort(status=409, description='Already Exists.')

                movie_info[new_id] = params
                for p in params:
                    if p not in movie_data.keys():
                        raise KeyError
            except:
                abort(status=400, description='Bad parameters')
        else:
            abort(status=400, description='Missing Title or Year.')
        return Response(status=200)
```

This basically executes a POST method within your microservice. to the JSON data. This mimics how you run the API and add the data to a database. The method has the need. This includes verifying the data being added by the POST method and checking any HTTP request status such as 400 and 200.

#### Step 8: Access Specific Microservice Data

Assume you want to execute HTTP methods that access a specific route. You need a path that will send a request to that particular resource to get specific movie detail. Methods that need such patterns include DELETE, PUT and GET(if you want to fetch a single resource). To add this to the API, create a new route that takes the id parameter to the data as follows:

- Create the access route:

```py
@ns_movies.route("/<string:id>")
```

- Add the data source

```py
class movies(Resource):
```

GET method to fetch a specific movie.

```py
def get(self, id):
    if id not in movie_info:
        abort(status=404, description=f"Movie '{id}' doesn't exists.")
    return movie_info.get(id)
```

PUT to update specific movie details.

```py
@api.expect(movie_info)
  def put(self, id):
       if id not in movie_info:
            abort(status=404, description=f"Movie '{id}' doesn't exists.")
        if not (params := request.get_json()):
            abort(status=400, description='No parameters')

        for p in params:
            if p not in movie_data.keys():
                abort(status=400, description='Bad parameters')
        for p in params:
            movie_info[id][p] = params[p]
        return Response(status=200)
```

DELETE method to delete a single movie.

```py
def delete(self, id):
    try:
        del movie_info[id]
    except KeyError:
        abort(status=404, description=f"Movie '{id}' doesn't exists.")
    return Response(status=200)
```

#### Step 9: Execute the API

To run the API on the localhost, add the following code:

```py
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
```

Your MSA API is ready. Run it using `flask run`. You can now test the routes using your favorite API testing utilities.

### Conclusion

Building lightweight APIs is an integral part of your application. A microservice architecture allows you to define different sub-components that can be executed without having to depend on other components. An API can delete a resource without worrying if the update component is working. A failure of one doesn't affect the other. They are loosely coupled to build highly scalable applications.