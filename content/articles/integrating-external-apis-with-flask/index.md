---
layout: engineering-education
status: publish
published: true
url: /integrating-external-apis-with-flask/
title: Integrating an External API into a Flask Application
description: This tutorial will show the reader how to integrate an external API into a Flask application. We will create a simple Flask application that will allow us to retrieve data from an external API.
author: geoffrey-mungai
date: 2021-08-26T00:00:00-08:30
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/integrating-external-apis-with-flask/hero.png
    alt: Integrating an External API with Flask
---
APIs are a major part of applications nowadays. There are often times that we need to use a third-party APIs either for authentication, file uploads, or getting other information.
<!--more-->
APIs allow us to use features provided by other applications without having to build the logic ourselves. This also enables us to build applications that integrate with many other services, since the interfaces are provided.

### Prerequisites
Before proceeding, you are required to have a TMDB (The Movie DB) API key. To obtain one, you must have an account at [themoviedb.org](https://www.themoviedb.org/login). Then, follow [these instructions](https://developers.themoviedb.org/3/getting-started/introduction) to obtain an API key.

### Step 1 -- Setting up the working environment
Create the following folder structure:

```bash
├─────────────────┐
├── app.py
└── templates
    └── movies.html

1 directory, 2 files
```

Then create a new virtual environment using venv and install Flask, using the commands below.

```bash
$ python3 -m venv venv
$ source venv/bin/activate
$ pip install flask
```

> **Note**: If you are using Windows, you may need to use `venv\Scripts\activate` instead of `venv\bin\activate`.
>
> Tip 💡: **Pipenv** is a tool that makes it easier to manage Python virtual environments. It is a great alternative to venv and virtualenv. You can learn more about it [here](https://docs.pipenv.org/).

### Step 2 -- Creating a simple view
Let's configure Flask by creating a simple view.

Open `app.py` and add the following code:

```python
from flask import Flask

app = Flask(__name__)

@app.route("/hello")
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.run(debug=True)
```

We have imported `Flask` and created a simple `hello_world` view, that returns a simple HTML page.

Open your terminal and run the app using the following command:

```bash
python app.py
```

You can head over to <http://localhost:5000/hello> to see the result.

### Step  3 -- Sending a request to the TMDB API
Now, let's send a request to the TMDB API.

Open your `app.py` and add the following code:

```python
from flask import Flask, render_template
import urllib.request, json

import os

@app.route("/")
def get_movies():
    url = "https://api.themoviedb.org/3/discover/movie?api_key={}".format(os.environ.get("TMDB_API_KEY"))

    response = urllib.request.urlopen(url)
    data = response.read()
    dict = json.loads(data)

    return render_template ("movies.html", movies=dict["results"])
```

The imported [`urllib.request`](https://docs.python.org/3/library/urllib.request.html) is a Python module that will be used to send the request to the TMDB API. The imported `os` module will be used to obtain the TMDB API key.

We have created a new route `/` that returns the TMDB API response. We have also added a new view function `get_movies()` that will be executed when the route is called.

Inside the `get_movies()` function, we:
- Create a URL using the TMDB API key.
- Send the request to the TMDB API.
- Read the response.
- Convert the response to a Python dictionary.
- Return the dictionary to the template.

To keep your API key safe, you should not store it in your code. Instead, you should store it in an environment variable.

On your terminal, run the following command to export your TMDB API key as an environment variable.

```bash
export TMDB_API_KEY="<your_api_key>"
```

If you are using Windows, you may need to use `set TMDB_API_KEY=<your_api_key>` instead of `export`.

Now, open your `templates/movies.html` and add the following code:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Movies</title>
</head>

<body>
    <div>
    {% block content %}
        {% for movie in movies %}
        <div id="movie" style="background-image: url(http://image.tmdb.org/t/p/w500{{movie.backdrop_path}});">
        </div>
        {% endfor %}
    {% endblock %}
    </div>
</body>
</html>
```

The `{% block content %}` tag is a special tag that will be used to render the content of the template. Inside the block, we iterate over the `movies` using a `for` loop, rendering the backdrop image for each movie.

> **Note:** The `backdrop_path` is not a direct URL to the image. Instead, it is a path to the image. We append the `backdrop_path` to <http://image.tmdb.org/t/p/w500> to obtain the direct URL to the image. You can learn more about images in the [TMDB documentation](https://developers.themoviedb.org/3/getting-started/images).

You can display more movie properties in the template. For example, you can display the title, the release date, the rating, etc. Check the [TMDB documentation](https://developers.themoviedb.org/3/movies/get-movie-details) to see all the available properties.

Let's add a little CSS to make the movie images look better.

```css
<style>
  #movie {
    float: left;
      width: 400px;
      height: 250px;
      margin: 10px;
      border-radius: 7px;
      box-shadow: 0px 0px 5px grey;
      background-size: cover;
  }
</style>
```

Now serve the app and navigate to <http://localhost:5000/>. You should see the movies posters.

### Step 4 -- Sending request-response to an endpoint as a JSON
Suppose we want to send the title and the overview properties for each movie to an endpoint as JSON.

Open `app.py` and create a new endpoint as shown below:

```python
@app.route("/movies")
def get_movies_list():
    url = "https://api.themoviedb.org/3/discover/movie?api_key={}".format(os.environ.get("TMDB_API_KEY"))

    response = urllib.request.urlopen(url)
    movies = response.read()
    dict = json.loads(movies)

    movies = []

    for movie in dict["results"]:
        movie = {
            "title": movie["title"],
            "overview": movie["overview"],
        }
        
        movies.append(movie)

    return {"results": movies}
```

In the `get_movies_list()` function, we:
- Create a URL using the TMDB API key.
- Send the request to the TMDB API.
- Read the response.
- Convert the response to a Python dictionary.
- Extract the `results` property from the dictionary.
- Iterate over the `results` property and create a new dictionary for each movie, containing the title and the overview.
- Return the JSON data to the template.

Serve the app and navigate to <http://localhost:5000/movies>. You should see the titles and overviews of the movies.

### Conclusion
In this tutorial, we have looked at how to send a request to a third-party API. In this case, we have used the TMDB API. We have also seen how to send a request-response to your app's endpoint as JSON.

The code in this tutorial can be found in [this GitHub repo](https://github.com/geoffrey45/flask-request).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
