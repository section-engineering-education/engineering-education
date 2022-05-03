---
layout: engineering-education
status: publish
published: true
url: /creating-a-simple-hunt-the-wumpus-game-using-python-flask-and-socketio/
title: How to Build a Hunt the Wumpus Game Using Python, Flask, and Socket.io
description: In this tutorial, the reader will learn what Hunt the Wumpus game is, how it works, as well as how to clone it from scratch using Python and JavaScript.
author: samuel-santos
date: 2022-05-03T00:00:00-13:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-a-simple-hunt-the-wumpus-game-using-python-flask-and-socketio/hero.jpg
    alt: Build Hunt the Wumpus Game Using Python Flask and SocketIO Hero Image
---
In this tutorial, we will create a simple app based on the Hunt the Wumpus game. This was one of the first computer games.
<!--more-->
By reading this article, the reader will learn about the history of [Hunt the Wumpus](https://en.wikipedia.org/wiki/Hunt_the_Wumpus). 

Individuals will also understand how to build a clone of it from scratch, using Flask and Socket.io in Python.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [A brief history of the game and its contributions to AI](#a-brief-history-of-the-game-and-its-contributions-to-ai)
- [What is Socket.io and how does it work?](#what-is-socketio-and-how-does-it-work)
- [Project structure](#project-structure)
- [The content of `index.html`](#the-content-of-indexhtml)
- [Building the backend](#building-the-backend)
- [Interacting with the game using JavaScript and Socket.io](#interacting-with-the-game-using-javascript-and-socketio)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Introduction
Hunt the Wumpus, developed in 1973, was among the most popular games during the introduction of the personal computers.

In this game, the player is an adventurer who enters a dungeon looking for a treasure. The goal is to find the treasure and get out of the dungeon by avoiding the pitfalls and the Wumpus (a monster).

To do that, the player has to pay attention to the signals. When he is near a pit, he can feel the breeze, and when he is near the Wumpus, he can smell the Wumpus' stink.

Hunt the Wumpus was studied by computer scientists in the early days of AI technology. In this tutorial, we will build a simple graphical web-based "Hunt the Wumpus" game using Flask and Socket.io in Python.

### Prerequisites
To follow this tutorial, you should know:
- Basic aspects of HTML and CSS.
- How to interact with elements of a web page using JavaScript and jQuery.
- The basics of Python programming and Flask.

### A brief history of the game and its contributions to AI
Hunt the Wumpus is a text-based adventure game developed in 1973 by Gregory Yob for PC. 

In the game, the player enters a dungeon made of several connected rooms and has to avoid pitfalls, bats that can move him to a random room, and kill the monster Wumpus with an arrow.

The player will know if there's a pit nearby when he feels a breeze and he knows when there's a Wumpus nearby when he feels a stink.

The "Wumpus World" is a slightly modified version of the Hunt the Wumpus game as mentioned in one of the most influential books: [*Artificial Intelligence: a Modern Approach*](https://www.amazon.com.br/Artificial-Intelligence-Approach-Stuart-Russell/dp/0134610997).

In the book, it is described as:

*"The wumpus world is a cave consisting of rooms connected by passageways. Lurking somewhere in the cave is the terrible wumpus, a beast that eats anyone who enters its room. The wumpus can be shot by an agent, but the agent has only one arrow. Some rooms contain bottomless pits that will trap anyone who wanders into these rooms (except for the wumpus, which is too big to fall in). The only mitigating feature of this bleak environment is the possibility of finding a heap of gold."* (Artificial Intelligence: A Modern Approach)

This Wumpus World exemplifies the use of propositional logic in AI to build knowledge-based agents.

 The book also shows how one can build an agent that can play Wumpus World "rationally", that is, by choosing the safest rooms based on the available knowledge.

In this tutorial, we will develop a game similar to Wumpus World. However, instead of building a text-based game, we will focus on a graphical version of the game. 

Furthermore, instead of killing the Wumpus, we set the goal of the player only to find the treasure.

### What is Socket.io and how does it work?
[Socket.io](https://socket.io/) is a library that allows us to build apps with bidirectional communication between the server and client using an event-based approach.

With Socket.io, we can *emit* events with messages and *hear* the events and messages. This way we can create communication between a server and a client.

One side emits events and sends a message. The other side receives the message with some data and then processes it.

Here, we use Socket.io because we can't reveal information about the dungeons to the player on the client-side. Only when a player enters a room he will know what's around.

Here is what the flow would like:
- We will store the dungeon's information on the server.
- When the player makes a move on the client-side, we emit events asking for information about the new player's position.
- The server listens to the client, processes the player's position, and sends another event with the required information about the player's surroundings.
- The client then displays the information to the player.

### Project structure
This project's structure is similar to any other Flask project. First, we create a directory `app` for the project and add a file `wsgi.py`.

Now, add a new file `app.py` along with two other directories `static` and `templates`. 

Under the `templates/` directory, add two files - `base.html` and `index.html`. In the `static/` directory, create two more directories - `scripts` and `styles`.

Next, create a `main.js` file under `scripts/`, and `main.css` under `styles/`.

It's almost done! Your directory structure should look like this:

```txt
|   wsgi.py
|   
+---app
|   |   app.py
|   |   
|   +---static
|   |   +---scripts
|   |   |       main.js
|   |   |       
|   |   \---styles
|   |           main.css
|   |           
|   +---templates
|   |       base.html
|   |       index.html
```

Create a virtual environment using `python -m venv myenv` and activate it. Then, install the following packages:

- Flask: `python -m pip install Flask`
- Flask-SocketIO: `python -m pip install Flask-SocketIO`
- Flask-Session: `python -m pip install Flask-Session`

Now, let's define the initial visuals of the app inside the `base.html` and `main.css` by adding the page's meta information. We will create the header and footer in the `base.html`. 

We also add the Google fonts that link to `main.css` and `main.js`, as well as the CDNs to Socket.io and jQuery.

> Feel free to create the visuals of the header and the footer as you want, but don't forget to add the links and CDNs.

Between the header and the footer, you should also add the following code: `{% block content %}{% endblock %}`. This is where we are going to put the page content:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Hunt the Wumpus</title>

        <meta charset="utf-8"/>
        <meta name="description" content="In Hunt the Wumpus, the player is an adventurer entering a dungeon looking for a treasure. The goal of the adventurer is to find the treasure and get out of the dungeon avoiding the pits where he can fall in and the Wumpus: a monster who kills anyone it sees.">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--Fonts from Google Fonts-->
        <!--Eczar-->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Eczar:wght@400;500;600;700;800&display=swap" rel="stylesheet"> 

        <!--CSS-->
        <link rel= "stylesheet" type= "text/css" href= "{{ url_for('static',filename='styles/main.css') }}">

        <!--JavaScript-->
        <!--Socketio-->
        <script src="https://cdn.socket.io/4.4.1/socket.io.min.js" integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H" crossorigin="anonymous"></script>
        <!--jQuery-->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
        <!--Feather Icons-->
        <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
        <!--main.js-->
        <script src="{{ url_for('static', filename='scripts/main.js') }}"></script>
    </head>
    <body>

        <div class='header'>
            <div class='title'>
                <a href='#'><h2>Hunt the Wumpus</h2></a>
            </div>
        </div>

        {% block content %}
        {% endblock %}

        <div class='bottom'>
            <p>Created by <em>your name here</em>, 2022</p>
        </div>

    </body>
</html>
```

Let's add some styles too in the `main.css`. Navigate to this link to see the [CSS code snippet](https://github.com/csamuelsm/wumpus/blob/47d2cbca6b8aded580c0daec66fe21d145922fc0/app/static/styles/main.css#L1-L37).

Let's now extend the `base.html` in the `index.html` file. We will also add a `Hello World!` to the page as shown:

```html
{% extends 'base.html' %}

{% block content %}

<div class='main'>
    <h1>Hello World!</h1>
</div>

{% endblock %}
```

Then, we add a few more styles to the main `div` in `main.css`. You can check out [this link for the stylings](https://github.com/csamuelsm/wumpus/blob/47d2cbca6b8aded580c0daec66fe21d145922fc0/app/static/styles/main.css#L39-L45).

Now, in `app.py` add the following code:

```python
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from uuid import uuid4

app = Flask(__name__)
app.config['SECRET_KEY'] = uuid4().hex

socketio = SocketIO(app)

@app.route("/")
def hello_world():
    return render_template('index.html')
```

From the above code:
- First, we import `Flask` and `render_template`.
- `render_template` renders the `.html` pages that we create.
- We import the `flask_socketio` module to allow us to use Socket.io on the server, and listen to and emit events.
- We import `uuid4` to get a unique secret key for the app.
- We initialize the app with this secret key and enable Socket.io.
- Finally, we render `index.html` in the route  `"/"`.

Finally, add to `wsgi.py`:

```python
from app.app import app, socketio

if __name__ == "__main__":
    socketio.run(app, debug=True)
```

Now, we run this file, which will run a local server with our app in debug mode.

You can run using the command `python wsgi.py` in your terminal and navigate to `http://localhost:5000` in your browser. You should see something like this:

![Simple 'Hello World' page using Python and Flask](/engineering-education/creating-a-simple-hunt-the-wumpus-game-using-python-flask-and-socketio/hello-world-page.png)

### The content of `index.html`
Now that we have created the base template, it's time to create the content of the page. Delete the `<h1>Hello World!</h1>` from `index.html`.

We need to add a `div` with information about the game inside `main`:

```html
<div class='info'>
    <h1>Welcome, Noble Adventurer!</h1>
    <p>In <strong>Hunt the Wumpus</strong>, you are an adventurer entering a dungeon looking for a <em>treasure</em>.</p>
    <p>Your goal is to find the treasure and get out of the dungeon <em>avoiding</em> the <strong>pits where you can fall in</strong> and the </strong>Wumpus</strong>: <em>a monster who kills <strong>anyone</strong> it sees.</em></p>
</div>
```

Add a `form` where the player can select the dimensions of the dungeon, as shown below:

```html
<div class='setup'>
    <h1>Select the size of the dungeon</h1>
    <form method='POST'>
        <input type="number" id="height" class="size_input" name="height" min="5" max="10" value="5"/>
        <large>X</large> 
        <input type="number" id="width" class="size_input" name="width" min="5" max="10" value="5"/>
        <button class='play' type="submit">Enter the Dungeon</button>
    </form>
</div>
```

We wil style the elements in [main.css.](https://github.com/csamuelsm/wumpus/blob/47d2cbca6b8aded580c0daec66fe21d145922fc0/app/static/styles/main.css#L47-L81)

Refresh your page and now it should look like this:

![Ready index.html page](/engineering-education/creating-a-simple-hunt-the-wumpus-game-using-python-flask-and-socketio/ready-index-page.png)

But the page still doesn't do anything. Let's make it work!

### Building the backend
Let's go back to `app.py`. It's where the magic happens. We need to create sessions to store some user data using `flask-session` as shown:

```python
from flask import session
from flask_session import Session
```

The next step is to configure the session, making it permanent and setting the session type to the `filesystem`. Add this to the beginning of your code:

```python
app.config["SESSION_PERMANENT"] = True
app.config["SESSION_TYPE"] = "filesystem"
Session(app)
```

In the above code snippet:
- We set the session to permanent. This means that the session cookies won't expire when the browser closes.
- We set the session type to the `filesystem`, which means that the cookies are going to be stored locally on the server-side.

The first thing we are going to store in the session is the user socket ID `sid`. We store it when the user first connects to the page using `@socketio.on('connect')`:

```python
@socketio.on('connect')
def connect():
    session['sid'] = request.sid
```

When the `connect()` event happens, we store the user socket ID on the session variable `sid`.

Now, let's get the data from the `form` in `index.html`. First, import `request` from `flask`:

```python
from flask import request
```

We need to inform flask that we accept POST requests from `/` route. Change the `@app.route("/")` to `@app.route("/", methods=['GET', 'POST'])`.

Let's also change the function name from `hello_world()` to `index()`. Inside `index()`, we can check if there was a `POST` request and retrieve the values from the `form`.

```python
@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        session['width'] = int(request.form['width'])
        session['height'] = int(request.form['height'])
        return render_template('game.html')
    return render_template('index.html')
```

When we receive a `POST` request, we store the `width` and `height` of the dungeon in the session variables `width` and `height`. Then, we render the `game.html` page.

> Note that, we didn't create the `game.html` page yet.

Proceed to the `templates/` directory and create it. Let's also extend the `base.html` as shown:

```html
{% extends 'base.html' %}

{% block content %}

<div class='main'>
    <!--Nothing in here yet-->
</div>

{% endblock %}
```

If you refresh the page in your browser and click on the "Enter the Dungeon" button, the page `game.html` will get rendered. There's nothing in `game.html` yet, so you probably will see just a blank page with only the header and the footer.

Also, note that we stored the sizes of the dungeon but we didn't do anything with them. Let's use them to create the dungeon now. We are going to store the dungeon as a `height` x `width` matrix (a list of lists in Python).

Let's import `random` so that we can generate the random positions of the Wumpus, the treasure, and the pits.

```python
import random
```

Create a function called `generate_dungeon(w, h)`. The parameter of the function: `w` and `h` are the `width` and `height` of the dungeon. 

We store the dungeon in a session variable with random positions for the Wumpus and the treasure:

```python
def generate_dungeon(w, h):
    session['dungeon'] = []
    wumpus_x = random.randrange(2, w)
    wumpus_y = random.randrange(2, h)
    gold_x = random.randrange(2, w)
    gold_y = random.randrange(2, h)
    while (gold_x == wumpus_x and gold_y == wumpus_y):
        gold_x = random.randrange(2, w)
        gold_y = random.randrange(2, h)
```

In the above code:
- We set the session variable `dungeon` to an empty list.
- Then, we compute the random positions for the wumpus and treasure.

Note that we are getting random coordinates `(x, y)` such that `2 <= x < width` and `2 <= y < height`. 

This is because the player will start in the position `(0, 0)` of the dungeon and if there's a wumpus or a treasure in the positions `(0, 0)` or `(0, 1)` or `(1, 0)` or `(1, 1)`, it would be very easy to win or lose the game.

So, let's avoid this by making the Wumpus and the treasure does not appear in these positions. It would also be very tragic if the Wumpus and the treasure appear in the same position. We are avoiding these scenarios with the `while` loop.

Now, let's build our matrix:

```python
for i in range(h):
    line = []
    # 0 - free
    # 1 - pit
    # 2 - wumpus
    for j in range(w):
        if (i == 0 or i == 1) and (j == 0 or j == 1):
            # the beginning of the dungeon cannot have pits or wumpus
            line.append(0)
        elif i == wumpus_x and j == wumpus_y:
            # wumpus location
            line.append(2)
        elif i == gold_x and j == gold_y:
            # gold location
            line.append(3)
        elif ((i == wumpus_x - 1 or i == wumpus_x + 1) and (j == wumpus_y)) or ((j == wumpus_y - 1 or j == wumpus_y + 1) and (i == wumpus_x)):
            # nothing around the wumpus
            line.append(0)
        else:
            # random pits distributed
            if random.random() <= 0.15:
                line.append(1)
            else:
                line.append(0)
            
    session['dungeon'].append(line)
```

In the above code, we position the Wumpus and the treasure, and we make the positions around the wumpus, free of pits. 

The pits are positioned in the rest of the map with a probability of 15% of appearing in some random position.

Then, we store the player's initial position as the current position in the session. The `generate_dungeon` function will call `game.html` with the dungeon already created. 

Add this code to the end of the function:

```python
session['curr_pos'] = [0, 0]
return render_template('game.html', width=w, height=h)
```

We just store the player's current position in a session variable. As the player starts the game in position `(0, 0)`, we store `[0, 0]` in session variable `curr_pos`.

Your code should appear as follows:

```python
def generate_dungeon(w, h):
    session['dungeon'] = []
    wumpus_x = random.randrange(2, w)
    wumpus_y = random.randrange(2, h)
    gold_x = random.randrange(2, w)
    gold_y = random.randrange(2, h)
    while (gold_x == wumpus_x and gold_y == wumpus_y):
        gold_x = random.randrange(2, w)
        gold_y = random.randrange(2, h)
    for i in range(h):
        line = []
        # 0 - free
        # 1 - pit
        # 2 - wumpus
        for j in range(w):
            if (i == 0 or i == 1) and (j == 0 or j == 1):
                # the beginning of the dungeon cannot have pits or wumpus
                line.append(0)
            elif i == wumpus_x and j == wumpus_y:
                # wumpus location
                line.append(2)
            elif i == gold_x and j == gold_y:
                # gold location
                line.append(3)
            elif ((i == wumpus_x - 1 or i == wumpus_x + 1) and (j == wumpus_y)) or ((j == wumpus_y - 1 or j == wumpus_y + 1) and (i == wumpus_x)):
                # nothing around the wumpus
                line.append(0)
            else:
                # random pits distributed
                if random.random() <= 0.15:
                    line.append(1)
                else:
                    line.append(0)
                
        session['dungeon'].append(line)
    session['curr_pos'] = [0, 0]
    return render_template('game.html', width=w, height=h)
```

In `index()`, delete `return render_template('game.html')` and add `return generate_dungeon(session['width'], session['height'])`. This is how `index()` should appear:

```python
@app.route("/", methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        session['width'] = int(request.form['width'])
        session['height'] = int(request.form['height'])
        return generate_dungeon(session['width'], session['height'])
    return render_template('index.html')
```

The function `generate_dungeon()` renders the `game.html` page, so there's no need to render it again in `index()`.

Now when the player selects the dimensions of the dungeon and clicks on "Enter the Dungeon", we create the dungeon and render the `game.html` by passing the `width` and `height` of the dungeon as arguments.

It's time to create the content of `game.html`. Let's create two `div`s: `win` and `lose`, with the messages that will appear when the player wins or loses the game. Inside `.main` div add:

```html
<div class="win">
    <h4>Congratulations! You won!</h4>
    <a href='/'><button class='play'>Play again</button></a>
</div>

<div class="lose">
    <h4>Game Over!</h4>
    <a href='/'><button class='play'>Play again</button></a>
</div>
```

Let's also create the dungeon map. Below the `win` and `lose` `div`s, add:

```html
{% for i in range(height) %}
    <div class="line">
    {% for j in range(width) %}
        {% if i == 0 and j == 0 %}
            <div class="room curr_room" x="{{j}}" y="{{i}}"></div>
        {% else %}
            <div class="room" x="{{j}}" y="{{i}}"></div>
        {% endif %}
    {% endfor %}
    </div>
{% endfor %}
```

We create a line for each `i` in the range `[0, height)`. Inside each line, we add a `.room`. If the position is `(0, 0)`, we make the `.room` a `.curr_room`. 

Let's style all this components. Let's make the `.curr_room` stand out from the other `.room`s, since it differentiates the room that the player is currently in.

Let's also make `.win` and `.lose` hidden: they will appear only when the player wins or loses the game. [Here is the CSS snippet for doing this.](https://github.com/csamuelsm/wumpus/blob/47d2cbca6b8aded580c0daec66fe21d145922fc0/app/static/styles/main.css#L83-L116)

Let's add the controls too. Include the following code below the for loop in `game.html`:

```html
<div class="controls">
    <div class="left"><i data-feather="arrow-left"></i></div>
    <div class="up_down">
        <div class="up"><i data-feather="arrow-up"></i></div>
        <div class="down"><i data-feather="arrow-down"></i></div>
    </div>
    <div class="right"><i data-feather="arrow-right"></i></div>    
</div>

<script>
    feather.replace()
</script>
```

They're simple controls with arrow keys. We shall add some stylings [here](https://github.com/csamuelsm/wumpus/blob/47d2cbca6b8aded580c0daec66fe21d145922fc0/app/static/styles/main.css#L118-L140).

Let's see how it is now:

![Game screen](/engineering-education/creating-a-simple-hunt-the-wumpus-game-using-python-flask-and-socketio/game-screen.png)

### Interacting with the game using JavaScript and Socket.io
Now, it's time to develop the interaction with the game. First, let's capture the actions of the player. Go to `main.js` and add:

```javascript
playing = true
$(document).ready(function(){
    const socket = io();
    //actions
    $('.left').click(function(){
        if (playing) socket.emit('next_pos', {'action':'left'})
    })
    $('.right').click(function(){
        if (playing) socket.emit('next_pos', {'action':'right'})
    })
    $('.up').click(function(){
        if (playing) socket.emit('next_pos', {'action':'up'})
    })
    $('.down').click(function(){
        if (playing) socket.emit('next_pos', {'action':'down'})
    })
})
```

In the above code, we emit the event `next_pos` and specify the `action`: `left`, `right`, `up` or `down` in the message. 

Now, the Flask app in the server will receive the event `next_pos` and the message. When this happens, the app needs to calculate the next position of the player, and send it back to the client. Go back to `app.py` and add:

```python
@socketio.on('next_pos')
def next_pos(message):
    if message['action'] == 'left':
        if 0 <= session['curr_pos'][0] - 1 < session['width']:
            session['curr_pos'][0] -= 1
    elif message['action'] == 'right':
        if 0 <= session['curr_pos'][0] + 1 < session['width']:
            session['curr_pos'][0] += 1
    elif message['action'] == 'up':
        if 0 <= session['curr_pos'][1] - 1 < session['height']:
            session['curr_pos'][1] -= 1
    elif message['action'] == 'down':
        if 0 <= session['curr_pos'][1] + 1 < session['height']:
            session['curr_pos'][1] += 1
    elif message['action'] == 'arrow':
        pass

    pos = session['curr_pos']
    
    socketio.emit('update_status', 
                {"x": pos[0],
                "y": pos[1]}, 
                room=session['sid'])
```

In the above code:
- When the server receives the `next_pos` event, it will update the `curr_pos` variable in the user session and send it back to the client using `socketio.emit('update_status')` with the player's new coordinates in the message. 
- Note the line `room=session['sid']`. This is extremely important. This line says that the message will be sent only to the user's room. 
- If this line wasn't there, the event would be sent to every user, messing up the game of players who were playing simultaneously. You can test this by removing this line and playing the game with two or more devices simultaneously.

Now, navigate back to `main.js` and let's handle the `update_status` event. Inside the `$(document).ready()` add:

```javascript
socket.on('update_status', (data)=>{
        curr = $(".curr_room")
        curr.removeClass("curr_room")

        room = $(".room[x='" + data['x'] + "'][y='" + data['y'] + "']")
        room.addClass("curr_room")
    })
```

We remove the `.curr_room` style from the old player's room and add it to the new player's room. But, how will the player know where's the pits, the Wumpus, or the treasure?

Let's use the Feather icons to signalize this to the player.

First, we need to go back to `app.py` and verify what is in the adjacency of the player. Inside `next_pos()`, after the computation of the new position, let's add:

```python
pos = session['curr_pos']
print(pos)

adj = []

pit = 0
wumpus = 0
treasure = 0

if session['dungeon'][pos[1]][pos[0]] == 1:
    pit = 2
    socketio.emit('lose', room=session['sid'])
elif session['dungeon'][pos[1]][pos[0]] == 2:
    wumpus = 2
    socketio.emit('lose', room=session['sid'])
elif session['dungeon'][pos[1]][pos[0]] == 3:
    treasure = 2
    socketio.emit('win', room=session['sid'])
else:
    try:
        adj.append(session['dungeon'][pos[1]-1][pos[0]])
    except:
        pass

    try:
        adj.append(session['dungeon'][pos[1]+1][pos[0]])
    except:
        pass

    try:
        adj.append(session['dungeon'][pos[1]][pos[0]-1])
    except:
        pass

    try:
        adj.append(session['dungeon'][pos[1]][pos[0]+1])
    except:
        pass

    if 3 in adj:
        treasure = 1

    if 2 in adj:
        wumpus = 1
        
    if 1 in adj:
        pit = 1
```

With this, we can track the player's adjacency:
- If `pit = 1`, then there's a pit around
- If `wumpus = 1`, then the Wumpus is around
- If `treasure = 1`, then the treasure is around
- If `pit = 2`, then the player fell into a pit and lost the game
- If `wumpus = 2`, then the player was eaten by the Wumpus and lost the game
- If `treasure = 2`, then the player found the treasure and won the game

When the player loses or wins the game, we emit the `lose` or `win` event. We also need to pass what is in the player's adjacency to the client. Let's change the `socketio.emit('update_status')` in the end of `next_pos()` to:

```python
socketio.emit('update_status', 
                {"x": pos[0],
                "y": pos[1],
                "pit": pit,
                "wumpus": wumpus,
                "treasure": treasure}, 
                room=session['sid'])
```

The `next_pos()` should be looking like this:

```python
@socketio.on('next_pos')
def next_pos(message):
    if message['action'] == 'left':
        if 0 <= session['curr_pos'][0] - 1 < session['width']:
            session['curr_pos'][0] -= 1
    elif message['action'] == 'right':
        if 0 <= session['curr_pos'][0] + 1 < session['width']:
            session['curr_pos'][0] += 1
    elif message['action'] == 'up':
        if 0 <= session['curr_pos'][1] - 1 < session['height']:
            session['curr_pos'][1] -= 1
    elif message['action'] == 'down':
        if 0 <= session['curr_pos'][1] + 1 < session['height']:
            session['curr_pos'][1] += 1
    elif message['action'] == 'arrow':
        pass

    pos = session['curr_pos']
    adj = []
    pit = 0
    wumpus = 0
    treasure = 0

    if session['dungeon'][pos[1]][pos[0]] == 1:
        pit = 2
        socketio.emit('lose', room=session['sid'])
    elif session['dungeon'][pos[1]][pos[0]] == 2:
        wumpus = 2
        socketio.emit('lose', room=session['sid'])
    elif session['dungeon'][pos[1]][pos[0]] == 3:
        treasure = 2
        socketio.emit('win', room=session['sid'])
    else:
        try:
            adj.append(session['dungeon'][pos[1]-1][pos[0]])
        except:
            pass

        try:
            adj.append(session['dungeon'][pos[1]+1][pos[0]])
        except:
            pass

        try:
            adj.append(session['dungeon'][pos[1]][pos[0]-1])
        except:
            pass

        try:
            adj.append(session['dungeon'][pos[1]][pos[0]+1])
        except:
            pass

        if 3 in adj:
            treasure = 1

        if 2 in adj:
            wumpus = 1
        
        if 1 in adj:
            pit = 1
        

    socketio.emit('update_status', 
                {"x": pos[0],
                "y": pos[1],
                "pit": pit,
                "wumpus": wumpus,
                "treasure": treasure}, 
                room=session['sid'])
```

Now, the client will know what is in the player's adjacent position and we can add the icons to signalize this. Navigate back to `main.js` and let's handle this new data. Change the handle of `update_status` in `main.js` to:

```javascript
socket.on('update_status', (data)=>{
        curr = $(".curr_room")
        curr.removeClass("curr_room")

        room = $(".room[x='" + data['x'] + "'][y='" + data['y'] + "']")
        room.empty()
        if (data['pit'] == 2) {
            room.append("<i data-feather='x-circle'></i>")
        } else if (data['wumpus'] == 2) {
            room.append("<i data-feather='frown'></i>")
        } else if (data['treasure'] == 2) {
            room.append("<i data-feather='award'></i>")
        } else {
            if (data['pit'] == 1) {
                room.append("<i data-feather='wind'></i>")
            }
            if (data['wumpus'] == 1) {
                room.append("<i data-feather='alert-triangle'></i>")
            }
            if (data['treasure'] == 1) {
                room.append("<i data-feather='star'></i>")
            }
        }
        feather.replace()
        room.addClass("curr_room")
    })
```

We add the following icons:
- `wind` icon when there's a pit nearby (`data['pit'] == 1`)
- `alert-triangle` icon when the Wumpus is nearby (`data['wumpus'] == 1`)
- `star` icon when the treasure is nearby (`data['treasure'] == 1`)
- `award` icon when the player finds the treasure (`data['treasure'] == 2`)
- `frown` icon when the player is killed by Wumpus (`data['wumpus'] == 2`)
- `x-circle` icon when the player falls in a pit (`data['pit'] == 2`)

We need to handle the `win` and `lose` events too. Add this to `$(document).ready()`:

```javascript
    // win or lose  
    socket.on('win', (data)=>{
        $('.win').css("display", "flex")
        $('.win').show("fast")
        playing = false
    })

    socket.on('lose', (data)=>{
        $('.lose').css("display", "flex")
        $('.lose').show("fast")
        playing = false
    })
```

We show the `.lose` or `.win` div and set `playing` to `false`, making it impossible for the player to move.

Finally, let's just make it possible to move around the map using the keyboard by detecting the arrows keypress:

```javascript
// detecting arrow keys
$(document).keydown(function(e) {
    if (e.keyCode == 37) {
        //left
        if (playing) socket.emit('next_pos', {'action':'left'})
    } else if (e.keyCode == 38) {
        //up
        if (playing) socket.emit('next_pos', {'action':'up'})
    } else if (e.keyCode == 39) {
        //right
        if (playing) socket.emit('next_pos', {'action':'right'})
    } else if (e.keyCode == 40) {
        //down
        if (playing) socket.emit('next_pos', {'action':'down'})
    }
})
```

And that's it! The game is ready to play! Go on and test it. What do you think?

![Game round](/engineering-education/creating-a-simple-hunt-the-wumpus-game-using-python-flask-and-socketio/game-round.png)

### Conclusion
In this tutorial, you learned about the "Hunt the Wumpus" game and its influence on Artificial Intelligence. 

We also developed a simple clone of the game using Python, Flask, HTML, CSS, JavaScript, and Socket.io.

You can see how it's possible to create games in a very easy way using these technologies. You can now explore the endless possibilities of applications that you can build with them!

Feel free to add additional functionalities to the game.

You can download this project from this [GitHub repository](https://github.com/csamuelsm/wumpus).

### Further reading
- [Hunt the Wumpus - Wikipedia](https://en.wikipedia.org/wiki/Hunt_the_Wumpus)
- [AI | The Wumpus World Description - GeeksforGeeks](https://www.geeksforgeeks.org/ai-the-wumpus-world-description/)
- [Artificial Intelligence: A Modern Approach](https://www.amazon.com.br/Artificial-Intelligence-Approach-Stuart-Russell/dp/0134610997)
- [Flask](https://flask.palletsprojects.com/en/2.0.x/)
- [Socket.io](https://socket.io/)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)