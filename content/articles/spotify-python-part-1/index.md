---
layout: engineering-education
status: publish
published: true
url: /spotify-python-part-1/
title: Spotify API with Spotipy
description: We will understand how to set up a spotipy project, the authentication process, and finishing it off, we'll start using some of the spotipy endpoints.
author: joshua-welsh
date: 2021-01-28T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/spotify-python-part-1/hero.jpg
    alt: Spotify API with Spotipy example image
---
Spotify is a wonderful music streaming app with a powerful API functionality. The API is both beginner-friendly and offers a wide range of endpoints. This makes the Spotify API a great way to get started for beginner programmers who are interested in getting involved in web APIs and even data science, or advanced programmers who want more control over their playlists. 
<!--more-->
### Introduction 
[Spotipy](https://spotipy.readthedocs.io/en/2.16.1/) is a popular wrapper for the Spotify API. It enables and supports all the features of the Spotify API but allows them to be designed and run in Python. This allows for scalability and also will come in handy when we start dealing with large amounts of data.

### Goals 
This is part one of a three-part tutorial series on Spotipy and its applications. By the end, you should be able to design and implement algorithms to create unique playlists, search for recommended music, and analyze metadata about your music selection.

To achieve these lofty goals, it will require a strong foundation. That's the goal of part 1 of this series. By the end, you should understand how to set up a spotipy project, the authentication process, and finishing it off, we'll start using some of the spotipy endpoints.

### Prerequisites
- You need a Spotify account. It doesn't have to be a Spotify premium account, a free account will work. 

- I try to make my tutorials as simple as possible so even if you are a beginner prorammer you can follow along and achieve something you're proud of. That being said you should have some basic knowledge of Python before starting. If you know how to use the [enumerate()](https://docs.python.org/3/library/functions.html#enumerate) function, how to [import modules](https://docs.python.org/3/tutorial/modules.html), and how to use [pip3](https://pip.pypa.io/en/stable/) you should be able to complete this part of the tutorial. If you are not confident in these skills yet it is okay! Click on the provided links and when you feel confident, return to the article.

- You should understand how to use the terminal.

### Step 1: Set up a Developer account
The first step is to create a [Spotify developer account](https://developer.spotify.com/dashboard/). Click on the link, sign in to your Spotify account, and follow the instructions to create a developer account.

After creating a developer account, click on the *Create an App* button, name your Spotify app, and give it a description. It can be whatever you want. Once you are in your Spotify app dashboard, go to edit settings and add a redirect url. You can leave the other fields blank, scroll to the bottom and hit save. 

For the redirect URL, it is highly recommended to use http://localhost:9000 or the localhost port of your choosing.

I have tried using a different website and it usually creates bugs so I am speaking from experience when I say that localhost is in most cases the best option for the redirect link.

You will need to save your client ID and client secret for the authentication process.

### Step 2: Creating a Python environment 
A good developer practice is to have an organized file system. If this is your first Python project consider making a directory called PythonScripts (you can name it whatever you want). Inside that directory create a folder called spotipy_tutorial.

Now run the following command to recreate a virtual environment. **Do not skip this step**. If you already have virtualenv installed run the line:

`~/PythonScripts/spotipy_tutorial >> virtualenv venv`

If you have never installed a virtual environment before or the line above doesn't work, do the following: 

`~/PythonScripts/spotipy_tutorial >> python3 -m pip3 install --user virtualenv`

`~/PythonScripts/spotipy_tutorial >> virtualenv venv`

#### Why create a venv?
Creating a virtual environment is usually overlooked by beginner programmers, yet this can be a bad mistake to make. New versions of Python are released almost every year and this can cause problems when you want to return to a project. Modules start to become incompatible with the new versions of Python and your code begins to break. 

It is much harder to fix your program after it breaks (especially after 6+ months of not reading your code). Additionally, some modules can have bugs that can do some nasty stuff to your system. By creating a self-contained directory you can avoid  stress and worry. 

*Note: Spotipy is a well-built module and has an active team supporting development, so you don't have to worry about catastrophic bugs, but it is still better to get in the habit of creating virtual environments for your project.*

After the venv is created, run this command to start your virtual environment. 

`~/PythonScripts/spotipy_tutorial >> source venv/bin/activate`

And to deactivate run:

`~/PythonScripts/spotipy_tutorial >> deactivate`  

Now that you have a Python environment set up, you should install spotipy.

Run the following command in your terminal window with the active virtual environment:

`~/PythonScripts/spotipy_tutorial >> pip install spotipy`

### Step 3: Authenticate and Run 
You are going to need to client ID, client Secret, and redirect url for this part. You can either set these values as environment variables:

`export SPOTIPY_CLIENT_ID='your-spotify-client-id'`

`export SPOTIPY_CLIENT_SECRET='your-spotify-client-secret'`   

`export SPOTIPY_REDIRECT_URI='your-spotify-redirect-url'`

I recommend you create a file called cred.py and store your values inside it. It goes without saying that this file should not be committed to a repository. 

Create a _cred.py_ file and put the following in your file: 
```py
    client_ID='your-spotify-client-id'
    client_SECRET='your-spotify-client-secret'   
    redirect_url='your-spotify-redirect-url'
```

Now create a file main.py and add the following boilerplate code: 
```py
    import spotipy
    from spotipy.oauth2 import SpotifyOAuth
    import cred 
```

Before going any further, you should have an idea of scopes. Spotify uses scopes to ensure programs only have permission to do what you specify they can do. You can read the list of scopes available [here](https://developer.spotify.com/documentation/general/guides/scopes/). You always need to specify the scope you want to use. 

For part 1 of this tutorial, you should use the following scope: 
```py
    scope = "user-read-recently-played"
```

Now for authentication. Like I said at the beginning, Spotipy makes it easy! 
```py
    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cred.client_id, client_secret= cred.client_secret, redirect_uri=cred.redirect_url, scope=scope))
```

Now that you have your authenticated spotipy object you can now request data from your spotify client. Lets get our 50 most recent songs and list them out:
```py
    results = sp.current_user_recently_played()
    for idx, item in enumerate(results['items']):
        track = item['track']
        print(idx, track['artists'][0]['name'], " – ", track['name'])

```

If everything went well, your code should look like this:
```py
    import spotipy
    from spotipy.oauth2 import SpotifyOAuth
    import cred

    scope = "user-read-recently-played"

    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=cred.client_id, client_secret= cred.client_secret, redirect_uri=cred.redirect_url, scope=scope))

    results = sp.current_user_recently_played()
    for idx, item in enumerate(results['items']):
        track = item['track']
        print(idx, track['artists'][0]['name'], " – ", track['name'])
```

Voila! If you want to learn about other spotipy functions, check out their [website](https://spotipy.readthedocs.io/en/2.16.1/).

### Conclusion
In the next tutorial, we will start analyzing our data, and to do this, we have to beat Spotify's data limit, that restrict the number of items the API can call. For now, play around with other spotipy functions, so you are comfortable with the API.  

Happy Coding!

---
Peer Review Contributions by: [Lalithnarayan C](/engineering-education/authors/lalithnarayan-c/)
