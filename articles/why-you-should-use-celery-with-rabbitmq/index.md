---
layout: engineering-education
status: publish
published: true
url: /engineering-education/why-you-should-use-celery-with-rabbitmq/
title: Why You Should Use Celery With RabbitMQ
description: This article will provide an overview of task queues & message brokers, why a user should choose celery with rabbitmq, and finally an example that shows how to use the two technologies.
author: edidiong-etuk
date: 2021-04-04T00:00:00-14:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/why-you-should-use-celery-with-rabbitmq/hero.png
    alt: Celery and RabbitMQ hero image
---
In today's technology space, there is an increase in event-driven architectures as companies develop solutions that require asynchronous communication between their microservices. Ingesting these events faster in system architecture and processing them enables system architectures to be persistent, resilient and allows batch processing of data. Celery and RabbitMQ are some tools used in these architectures. Choosing the right combination of tools and viewing an example of these tools that goes beyond the ["hello world"](https://docs.celeryproject.org/en/stable/getting-started/brokers/rabbitmq.html) is what this article cover.

### Outline

1. [What We Will Cover In This Article](#what-we-will-cover-in-this-article)
2. [Understanding Celery & RabbitMQ](#understanding-celery-&-rabbitmq)
    - [What is a Task Queue](#what-is-a-queue)
    - [Examples of Task Queues](#examples-of-task-queues)
    - [What is a Message Broker](#what-is-a-message-broker)
    - [Examples of Message Brokers](#examples-of-message-brokers)
3. [Why We Should Choose The Celery & RabbitMQ Combo](#why-we-should-choose-the-celery-&-rabbitmq-combo)
4. [Setting up Celery with RabbitMQ](#setting-up-celery-with-rabbitmq)
    - [Installation & Configuration](#installation-&-configuration)
    - [Simple Use Case](#simple-use-case)
5. [Conclusion](#conclusion)

### What We Will Cover In This Article

In this article, we’ll walk through what tasks queue are, see the examples of task queues (which includes celery), learn about message brokers. We will also look at why we need to use Celery and RabbitMQ while also seeing a basic tutorial that shows its installation and usage.

### Understanding Celery & RabbitMQ

Before going into why we should use Celery & RabbitMQ, let us understand what they are and what similar tools are available. Celery is classified as a *Task Queue* and RabbitMQ is classified as a *Message Broker*. Let's dive deeper into what these are.

#### What is a Task Queue?

A task queue is a data structure maintained by a job scheduler containing jobs to run.
Task queue software also manages background work that must be executed outside of the usual HTTP request-response cycle. They are designed for asynchronous work.
To further explain their usefulness, let’s say we have a web application that uses artificial intelligence to enhance images.
As the number of users increase, the time to enhance an image drastically increases, which leads to a significant delay while enhancing.
Hence, the need for a task queu/e software as it efficiently manages requests and ensures the application runs smoothly.

#### Examples of Task Queue Software

- Celery
- Redis Queue
- Taskmaster
- Huey
- tasq

#### What is a Message Broker ?

A message broker allows applications, systems and services to communicate and exchange information with each other. Now, with a task queue software in the background, the web app needs to know the status of the job in progress, plus any errors that might occur and the end result of the enhancement. A message broker dramatically eases this process since it’s built to make independent processes “talk to each other”

#### Examples Of Message Brokers

- IBM MQ
- Beanstalk
- RabbitMQ
- Redis
- Gearman
- Solace

### Why We Should Choose The Celery & RabbitMQ Combo

Having understood what task queues are, let's look at celery. Celery is an open-source task queue software written in python. It’s incredibly lightweight, supports multiple brokers (RabbitMQ, Redis and Amazon SQS) and it also integrates with multiple web frameworks, e.g. Django, etc. Celery's asynchronous task queue allows execution of tasks and its concurrency makes it used in several production systems. For example, Instagram uses Celery to scale thousands of tasks to millions.

However, task execution needs message brokers to work smoothly. Celery supports three message brokers as mentioned above. Although, for Amazon SQS, there is no support for remote monitoring.

Redis as a message broker has its limitations, as doing replication is manual and requires additional work to implement it. Also, because Redis is an in-memory solution, if the machine runs out of memory when building queues up, there's a risk to lose tasks. Beanstalk also does not support replication.

RabbitMQ is the better choice as it guarantees message delivery, is fault tolerant, supports synchronous replication allows for SSL for establishing an encrypted connection, and it’s superb for real-time applications. In contrast, Redis has a problem with retaining data when a crash happens since it’s memory based and the SSL option is part of the paid version.

### Setting Up Celery With RabbitMQ

For this setup, we will use an Ubuntu 18.04 machine to set up the celery app and the message queue (RabbitMQ). We'll configure the machine to work with celery and rabbitmq.

#### Installation & Configuration

**Tools Needed:**

- virtualenv
- celery
- rabbitmq

We install and activate the virtual environment by entering the commands below on the terminal

```bash
sudo pip install virtualenv
mkdir my_project && cd my_project
virtualenv celery_project
source celery_project/bin/activate
```

We install celery using pip. We don't use sudo as we’re installing celery to our virtual environment.

```bash
pip install celery
```

However, we also need to install rabbitmq on the system as it runs in the background.

```bash
sudo apt-get install rabbitmq-server
sudo rabbitmq-server -detached
```

The *`-detached`* option allows us to run *rabbitmq-server* in the background. Now, we could use defaults, but it’s always a good option to create a separate virtual host for our program.

```bash
sudo rabbitmqctl add_user myuser mypassword
sudo rabbitmqctl add_vhost myvhost
sudo rabbitmqctl set_permissions -p myvhost myuser ".*" ".*" ".*"
```

First  `".*"` *gives the user the ability to configure every entity, the* second *`".*"`* gives the *user write permissions on every entity*, and the third `".*"` gives the *user read permissions on every entity.*

We install `dotenv` as we use environmental variables to protect sensitive information in our app.

```bash
pip install python-dotenv
```

Then, we create and add our environmental variables in a `.env` file:

```bash
CELERY_BROKER_URL=amqp://myuser:mypassword@localhost/myvhost
CELERY_BACKEND_URL=db+sqlite:///test.db
```

As sqlite is used in our backend url, it needs to be installed alongside `sqlalchemy`. However, sqlite is available by default as it’s part of the standard libraries python uses.

```bash
pip install sqlalchemy
```

Finally, we install flask as it’s our web framework to link the client with the server. requests is also installed to make api calls.

```bash
pip install flask
pip install requests
```

### Simple Use Case

To explain how task queues and message broker works, we’d take on an interesting project. It’s a Dog Pic Generator, so let's call it **GenDog**. It works by making an API call to **[dog.ceo](https://dog.ceo/dog-api/)** based on the breed selected by the user and the number of pictures selected. On refresh, the pictures of the dogs get updated on the page. The code for this example is at [this repository](https://github.com/edeediong/dog-generator-celery.git).

Since we are using flask, our project structure would look like this.

```
.
├── app.py
├── routes.py
├── static
│   └── css
│       └── main.css
├── templates
│   └── template.html
├── test.db
├── .env
└── url.txt
```

For simplicity, we’ve opted to use a text file to store our image links from the API call. RabbitMQ creates a `test.db` file that’s used to store all metadata about the tasks ran. Now, we have our project setup and we’re ready to code our **GenDog** app.

Let’s start by writing some code in our `app.py` file.

```python
#!/usr/bin/python

import os
from dotenv import load_dotenv
from celery import Celery
from flask import Flask, render_template
import requests
import json

load_dotenv()

# used to load our env variables

# used to setup celery with flask as per the official documentation

def make_celery(app):
    celery = Celery(
        app.import_name,
        backend=app.config["CELERY_BACKEND_URL"],
        broker=app.config["CELERY_BROKER_URL"],
    )
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery

# We use the Flask framework to create an instance of the flask app
# We then update our broker and backend urls with the env variables

flask_app = Flask(__name__)
flask_app.config.update(
    CELERY_BROKER_URL=os.environ.get("CELERY_BROKER_URL"),
    CELERY_BACKEND_URL=os.environ.get("CELERY_BACKEND_URL"),
)

# create an instance of celery using the function created earlier

celery = make_celery(flask_app)

# This fetches the links and return an array of what's consumed

@celery.task()
def get_dog_pics(breed_type, limit):
    url = "<https://dog.ceo/api/breed/>" + breed_type + "/images/random/" + limit
    r = requests.get(url)
    files = r.json()

    for file in files["message"]:
        with open("url.txt", "a") as myfile:
            myfile.write(" " + file)
    return files["message"]

# import routes as this is the client-side

import routes
```

We use `json()` to convert the JSON retrieved into a dictionary so that we could pass the values retrieved into our `url.txt` file. Our `routes.py` is next. As the name shows, we define endpoints here in to interact with the server-side.

```python
#!/usr/bin/python
from app import flask_app, get_dog_pics
from flask import render_template, request, redirect, url_for, jsonify

@flask_app.route("/", methods=["GET", "POST"])
def index():
    # we define dog breeds so the user chooses from this list
    dog_breeds = [
        "affenpinscher",
        "dalmatian",
        "germanshepherd",
        "kelpie",
        "labrador",
        "husky",
        "otterhound",
        "pitbull",
        "pug",
        "rottweiler",
    ]

    # we store links in this list
    pictures = []

    open_file = open("url.txt", "r")

    for images in open_file:
        image = images.replace(",", " ")
        image = image.replace('"', "")
        pictures.extend(image.split())

    # on form submission, the task is ran
    if request.method == "POST":
        if request.form["submit"] == "getDogPics":
            breed_type = request.form.get("breed")
            limit = request.form.get("limit")
            get_dog_pics.delay(breed_type, limit)
            return redirect(url_for("index"))

        # an option for clearing all the links
        elif request.form["submit"] == "clearDogPics":
            f = open("url.txt", "w")
            f.close()
            return redirect(url_for("index"))

    # Results
    return render_template("template.html", breeds=dog_breeds, link=pictures)
```

In our `routes.py` file, we import our function for fetching the API and call it as this triggers the task. We also open the `url.txt` file to use the results (if any) in our route.

Last, there’s a link for clearing out the images fetched. The last line renders an HTML template, we write that below. We used [Bulma](http://bulma.io/) as it’s responsive, easy to use, and it’s purely CSS.

`template.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- <meta http-equiv="refresh" content="5" > -->
    <title>GenDog&#8482;</title>
    <link
      rel="stylesheet"
      href="<https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css>"
    />
    <link
      rel="stylesheet"
      href="{{ url_for('static', filename='css/main.css') }}"
    />
  </head>
  <body>
    <section class="section">
      <div class="columns">
        <div class="column is-one-third">
          <div class="container">
            <h1 class="title">GenDog&#8482;</h1>
            <p class="subtitle">Generate Dog Pictures By Breed</p>
            <form method="POST">
              <div class="field">
                <label class="label">Pick A Breed</label>
                <div class="control">
                  <div class="select">
                    <select name="breed" required>
                      {% for breed in breeds %}
                      <option value="{{breed}}">{{breed}}</option>
                      {% endfor %}
                    </select>
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="label">Limit</label>
                <div class="control">
                  <input
                    class="input"
                    type="number"
                    style="width: 200px"
                    name="limit"
                    required
                  />
                </div>
              </div>
              <div class="field is-grouped">
                <div class="control">
                  <button
                    class="button is-link"
                    value="getDogPics"
                    name="submit"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <form method="POST">
              <div class="control mt-4">
                <button
                  class="button is-link is-danger"
                  value="clearDogPics"
                  name="submit"
                >
                  Clear Photos
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="column">
          {% if link|length > 0 %}
          <ul>
            {% for links in link %}
            <li style="margin: 5px">
              <img src="{{links}}" />
            </li>
            {% endfor %}
          </ul>
          {% endif %}
        </div>
      </div>
    </section>
  </body>
</html>

```

Additional styling for the gallery done in our `main.css` file.

```css
ul {
  display: flex;
  flex-wrap: wrap;
}
li {
  height: 40vh;
  flex-grow: 1;
}
img {
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
}
li:last-child {
  flex-grow: 10;
}
@media (max-aspect-ratio: 1/1) {
  li {
    height: 30vh;
  }
}
@media (max-height: 480px) {
  li {
    height: 80vh;
  }
}
@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
  ul {
    flex-direction: row;
  }
  li {
    height: auto;
    width: 100%;
  }
  img {
    width: 100%;
    max-height: 75vh;
    min-width: 0;
  }
}

```

![gendog1.png](/engineering-education/why-you-should-use-celery-with-rabbitmq/gendog1.png)


![gendog2.png](/engineering-education/why-you-should-use-celery-with-rabbitmq/gendog2.png)

With our code setup and everything in order, the last 2 steps are starting the celery worker and our flask server.

```bash
celery -A app worker -l info
```

Then, open a new bash terminal, activate virtualenv and start flask

```bash
source celery_project/bin/activate
flask run
```

Congratulations, you’ve made your first app that implements a task scheduler and a message broker. At first, it’ll seem like nothing’s fetched. Refresh the page and you’d see the pictures. To inspect the progress of tasks, a web-based monitoring tool called [Flower](https://flower.readthedocs.io/en/latest/) is used. We won’t cover that aspect, as this is more of a “getting started” guide.

### Conclusion

In this tutorial, we've seen what task queues and message brokers are, their examples, and the best types of queues and brokers to use. We've also seen rabbitmq brokers and the async celery and how to use that in a backend architecture.

This article aimed to introduce you to task queues, message brokers, and their examples and best queues and brokers to use in your backend architecture.

In this article, you understood task queues, message brokers, you built a dog generator web application that fetches dog images.

Also, we highlighted some reasons why you should use Celery and RabbitMQ ahead of other task queues and message brokers.

Happy Building!