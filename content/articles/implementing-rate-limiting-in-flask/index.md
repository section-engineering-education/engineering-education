---
layout: engineering-education
status: publish
published: true
url: /implementing-rate-limiting-in-flask/
title: Implementing Rate Limiting in Flask APIs
description: This tutorial introduces the reader to the Rate limiting is a technique for limiting network traffic in a system.
author: solomon-esenyi
date: 2021-03-31T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/implementing-rate-limiting-in-flask/hero.jpg
    alt: How to Build a Music Player Using Django Hero Image
---
Rate limiting is a technique for limiting network traffic in a system. It sets a limit when a user can repeat an operation in a system within a specific timeframe.
<!--more-->
In this article, you will learn:

- What rate limiting is.
- Benefits of limiting network request rates.
- Rate limiting techniques.
- How to implement rate limiting techniques in Flask APIs.

### Prerequisites
To follow and fully understand this tutorial, you will need to have:
- Python 3.6 or newer.
- Basic understanding of Flask.
- A text editor.

### Introduction
Rate limiting controls the frequency of the repetition of an operation and ensures the set constraint guiding this operation is not exceeded (usually within a specific timeframe).

Essentially, the process of rate limiting involves the following procedure:
1. The system defines the rate limit rules for specific operations.
2. The system counts every operation or request made by the user initiating it.
3. The frequency of the request increases based on the user’s demand.
4. Once the frequency reaches the system’s threshold (rate limit), further requests are not processed until the limitation is lifted (or modified).

#### Benefits of rate limiting
- Increase in efficiency of security by mitigating cyber attacks such as DDoS.
- Prevents web scraping/bots/spam users.
- Prevents server resource exhaustion.
- Manages internal/external services, policies, and quotas.
- Controls the flow of system processes and data.
- Avoids high maintenance costs.

#### Flask Web Framework
Flask is a lightweight web framework written in Python. It is designed to make web development using Python quick and easy and can build complex applications. Popular websites built with Flask include [Airbnb](https://www.airbnb.com), [Netflix](https://www.netflix.com/), [Reddit](http://reddit.com/), [Uber](https://www.uber.com/), [Mailgun](https://www.mailgun.com), and [many more.](https://github.com/rochacbruno/flask-powered)

### Rate limiting techniques
In a general context, a rate is a count of the number of times an operation is run in a system. There are different techniques for measuring and limiting rates. 

They include:
- Fixed Window: This technique defines a fixed amount of requests accommodated within a specific duration. For example, setting a window size of 100 requests per hour means that the system will process only the first 100 requests the user makes within that hour, and every subsequent request will be discarded until the next hour.
- Sliding Window: This technique is very similar to the Fixed Window, where a fixed amount of requests are allowed within a specific duration. However, it implements a Rolling Time Window to account for substantial request spikes that would have reduced the Fixed Window technique’s efficiency.
- [Token Bucket](https://en.wikipedia.org/wiki/Token_bucket): In this technique, the system keeps counting the number of tokens a user can utilize to make requests in its memory (bucket). Whenever requests are made, tokens are reduced from the bucket and fulfilled until tokens are exhausted. An advantage of this technique is assigning a varying amount of tokens to different operations depending on the process’s operational power.
- [Leaky Bucket](https://en.wikipedia.org/wiki/Leaky_bucket): This technique is very similar to the Token Bucket. However, the rates are limited by the number of requests that leak out of the memory (bucket). This technique first confirms that the system has sufficient processing power to handle the incoming request before processing it and discards it if it cannot.

### Building a simple Flask API
Rate limiting is commonly used in web applications and APIs to prevent user requests’ excessive inflow into a server. Using Python, lets us build a Flask API and implement rate limiting techniques in it.

First, you must install the [Flask](https://palletsprojects.com/p/flask/) web framework, which you will use to build the API.

**Step 1:** 

In the terminal, type:

```Bash
pip install Flask
```

**Step 2:** 

Write the code responsible for setting up the endpoints of the Flask API. Start by creating a file named `app.py` and save the following code in it:

```Python
from flask import Flask

app = Flask(__name__)


@app.route("/")
def index():
  return "Welcome to my Flask API"

if __name__ == "__main__":
  app.run()
```

In the code above, you created a simple Flask application that renders the text `"Welcome to my Flask API"` when the index route is requested. You should get a response similar to the image below after running the Flask application.

![Flask API response](/engineering-education/implementing-rate-limiting-in-flask/oqahhiaqcfeigq1urdwe.png)

### Implementing rate limiting in Flask
After installing the Flask Framework and saving the code responsible for setting up the endpoints described in the steps above, the next step here is to install the [Flask-Limiter](https://flask-limiter.readthedocs.io/en/stable/) library. 

Flask-Limiter is a Flask extension that helps to implement rate limiting rules in a Flask application quickly.

In the terminal, type:

```Bash
pip install Flask-Limiter
```

Now, you need to update your `app.py` file and integrate the `Flask-Limiter` library to define rate limiting rules for specific endpoints in your API.

#### Importing the Flask-Limiter library

```Python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
```

#### Setting Up Flask-Limiter

```Python
limiter = Limiter(app, key_func=get_remote_address)
```

#### Applying Rate Limiting Rules

```Python
@app.route("/")
@limiter.limit("10/minute") # maximum of 10 requests per minute
def index():
  return "Welcome to my Flask API"
```

In the code above, you defined the rate limiting rule for the endpoint by setting it to accept `10` requests per `60` seconds from every API user. 

If the limit is exceeded, the user receives the response - `status code 429 (Too Many Requests)` with an error page like the image below.

![Flask-Limiter limit exceeded error](/engineering-education/implementing-rate-limiting-in-flask/osw9-4n2ilprrg2m_i9g.png)

Flask-Limiter provides a set of string notations for defining rate limit rules in its [documentation](https://flask-limiter.readthedocs.io/en/stable/%23rate-limit-string-notation) with the given format:

```bash
[count] [per|/] [n (optional)] [second|minute|hour|day|month|year]
```

You can also combine multiple rate limits by separating them with a delimiter of your choice. 

Examples include:
- 10 per second
- 60/hour
- 5/second;60 per minute;2500 per hour
- 50/day, 250/7days

### Exploring Flask-Limiter functionalities
The Flask-Limiter [documentation](https://flask-limiter.readthedocs.io/en/stable/) showcases a lot of features in the extension. We will briefly illustrate some of them in this section.

#### Setting default rate limit rules
Flask-Limiter provides the functionality to set default rate limit rules that Flask-Limiter would automatically apply to every endpoint in your Flask API.

To set default rules, use:

```Python
limiter = Limiter(
  app,
  key_func=get_remote_address,
  default_limits=["200/day", "50/hour"]
)
```

> NOTE: If an endpoint defines its rate limit rules when a default already exists, the newly defined rule is applied on the route alone, and the defaults are ignored.

To enable a route use the default rules and define its own simultaneously, use the `override_defaults` parameter in the decorator as shown:

```Python
@app.route("/ping/")
@limiter.limit("1/second", override_defaults=False)
def ping():
  return "PONG"
```

Certain endpoints can also be excluded from applying the default rate limit rules with the `@limiter.exempt` decorator, as shown:

```Python
@app.route("/ping/")
@limiter.exempt
def ping():
  return "PONG"
```

#### Using custom rate limit keys
By default, Flask-Limiter uses the `remote address` of the request to identify each user interacting with the API. Flask-Limiter provides the functionality to use a custom [user identifier function](https://en.wikipedia.org/wiki/User_identifier) for events where you need to limit rates with API keys and usernames.

You can achieve this by passing the custom functions to the `key_func` parameter when initializing the limiter or when applying the `@limiter.limit` decorator on a route.

```Python
limiter = Limiter(app, key_func=custom_function_here)
```

```Python
@limiter.limit("10/minute", key_func=custom_function_here)
```

> NOTE: The custom function is called from a [Flask Request Context](https://flask.palletsprojects.com/en/1.1.x/reqcontext/%23request-context) and must return a string. You can read more about key functions in the Flask-Limiter [documentation](https://flask-limiter.readthedocs.io/en/stable/%23rate-limit-key-functions).

#### Having multiple rate limit rules
Flask-Limiter can be used to define multiple rate limit rules for a particular route. 

This can be done using the code:

```Python
@app.route("....") # for a single decorator
@limiter.limit("100/day;10/hour;1/minute")
```

```Python
@app.route("....") # for multiple decorators
@limiter.limit("100/day")
@limiter.limit("10/hour")
@limiter.limit("1/minute")
```

#### Generating custom limit exceeded responses
By default, Flask-Limiter triggers `abort(429)` each time a rate limit is exceeded for any particular route. You can customize this response for users by registering an error handler for `429 error code` as shown below:

```Python
@app.errorhandler(429)
def ratelimit_handler(e):
  return "You have exceeded your rate-limit"
```

![custom rate limit exceeded error](/engineering-education/implementing-rate-limiting-in-flask/nulbeq2kwcnmek9ucrn2.png)

### Conclusion
In this article, I introduced you to what rate limiting is, discussed the importance of limiting request rates, including mitigating cyberattacks, preventing server resource exhaustion, amongst other benefits. Also highlighted some standard rate limiting techniques and built a Flask application where you implemented rate limiting techniques with varying rules and customized responses.

I hope you find this tutorial as helpful as I anticipate. 

Happy coding.

### Resources
- [Rate Limiting](https://www.cloudflare.com/en-gb/learning/bots/what-is-rate-limiting/)
- [Token Bucket](https://en.wikipedia.org/wiki/Token_bucket)
- [Leaky Bucket](https://en.wikipedia.org/wiki/Leaky_bucket)
- [Flask Web Framework](https://palletsprojects.com/p/flask/)
- [Flask Powered Companies](https://github.com/rochacbruno/flask-powered)
- [Flask-Limiter Documentation](https://flask-limiter.readthedocs.io/en/stable/)

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
