---
layout: engineering-education
status: publish
published: true
url: /engineering-education/simple-guide-to-using-apis-part2/
title: Getting to Grips with APIs - Authentication
description: Using the Goodreads API, goodreads-api-node wrapper and oAuth1 to authenticate users with their Goodreads account to make authenticated requests such as returning a user's owned books.
author: louise-findlay
date: 2020-08-28T00:00:00-10:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/simple-guide-to-using-apis-part2/hero.png
    alt: hero image using APIs authentication using Goodreads API
---
You have worked with the Goodreads API to create a full-stack Node.js web app that will search the Goodreads database for a book query and return a list of relevant matches. If you haven't, read [part 1](/engineering-education/simple-guide-to-using-apis-nodejs/).

That's a good start but what if you want to see books a user has already added? You'll need to find a way to authenticate users' Goodreads accounts with the Goodreads API so you can discover their user ID and the API knows which account made the request.
<!--more-->

[oAuth](https://en.wikipedia.org/wiki/OAuth) is the main authentication standard for APIs. We will be using oAuth 1 because that's the only version the Goodreads API supports but it's recommend to use oAuth 2 wherever possible. Similar to [Part 1](/engineering-education/simple-guide-to-using-apis-nodejs/), `goodreads-api-node-wrapper` will make the process easier.

### Authenticating with the Goodreads API

#### Setting a Callback URL
The first step to authenticating with the Goodreads API is to set a callback URL. A callback URL is the link that Goodreads should send users to once they've been authenticated. Since authentication takes place on the Goodreads website, and the API needs to know how to get back to your web app.

Go to the [Goodreads API Key page](https://www.goodreads.com/api/keys) and set the Callback URL to `https://localhost:8080/goodreads-user`. Further on, we will create the goodreads-user route which will obtain the logged in user's Goodreads ID.

#### Adding SSL to our Local Web Server
Note that the Callback URL is https and not http. You must use https or it won't work. To add SSL to our local web server, install the `https-localhost` npm package using `npm install https-localhost --save-dev`. Then change the `const app` line in `server.js` to `const app = require("https-localhost")();`
The start of your `server.js` should look like:

```js
// Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
require('dotenv').config();
const goodreads = require('goodreads-api-node');
const app = require("https-localhost")();
```
Now you can view your web app by running `npm start` in the terminal and going to `https://localhost:8080` in your browser.

#### Initializing oAuth (Adding the Callback URL to our Credentials)

Next, we need to initialize the oAuth Goodreads authentication.

**Note**: the `goodreads-api-node` documentation states that there are two methods to do so but currently, only this one works.

In `server.js`, modify your Goodreads credentials section to match the following:

```js
// Goodreads API - NodeJS
const myCredentials = {
    key: process.env.GOODREADS_KEY,
    secret: process.env.GOODREADS_SECRET
};
// Callback URL - https
var callbackURL = "https://localhost:8080/goodreads";
const gr = goodreads(myCredentials);
// Initialise oAuth
gr.initOAuth(callbackURL);
```
The value of the `callbackURL` should match the callback URL you set in the Goodreads API settings. `gr.initOAuth(callbackURL)`, starts the authentication process using `goodreads-api-node`'s built-in function and passes your callback URL so the user can be redirected to the correct page.

#### Getting a Request Token
Now that the callback URL has been configured, we now need to create a route that when users navigate to it will redirect them to a Goodreads login screen so they can login. The `gr.getAccessToken()` function will do this.

Add the following to `server.js`:

```js
// Get Request Token and Redirect to Goodreads Login
app.get("/authenticate", function (req, res) {
    gr.getRequestToken()
        .then(url => {
            console.log(url);
            res.redirect(url);
        }).catch(function () {
            console.log("Goodreads Authentication Rejected");
        });
});
```
The authenticate route will request an access token and return an OAuth authorization URL with a unique access token and your callback URL appended to it. The user is then redirected to the special URL, prompted to login to their Goodreads account and then returned to the callback URL.

Go to `https://localhost:8080/authenticate` and try it out for yourself.

#### Getting an Access Token (Obtaining the User ID)
Congratulations, you've managed to authenticate users with Goodreads using the Goodreads API and oAuth1 but there's still one thing we're missing. The user ID of the logged in account. All authenticated requests (requests using a user's Goodreads account) requires one so that's where the `gr.getAccessToken()` function comes in.

To finish authenticating with the API and to allow us to view the current user's account information (such as their ID), we need to get an access token.

In `server.js` create a route called `goodreads` (our callback URL route that users are redirected to after authenticating) and add the following:

```js
// Callback URL Redirect - Get Access Token
app.get("/goodreads", function (req, res) {
    gr.getAccessToken()
        .then(url => {
            var userinfo = gr.getCurrentUserInfo();
            userinfo.then(function (result) {
                console.log(result);
                res.redirect("/");
            });
        }).catch(function () {
            console.log("Goodreads User Info Rejected");
        });
});
```
Once the access token has been obtained, the `gr.getCurrentUserInfo()` function runs to obtain the account information of the current Goodreads user and `console.log()` the result so we can find out how to obtain the User ID.

Run `npm start` and go to `https://localhost:8080/authenticate`. It may take a minute or two but in the terminal, you should see a similar response:

```json
{
  Request: {
    authentication: 'true',
    key: 'your_goodreads_api_key',
    method: 'api_auth_user'
  },
  user: {
    id: '15080042',
    name: 'Louise Findlay',
    link: 'https://www.goodreads.com/user/show/15080042-louise-findlay?utm_medium=api'
  }
}
```
From the response, we can see that the user id is `result.user.id` so replace the `console.log(result)` with `var userid = result.user.id`;

### Listing a User's Shelves (Making Your First Authenticated Request with the Goodreads API)
Congratulations. You've obtained the user ID of your first Goodreads user and have everything in place to make your first authenticated request: listing their shelves.

Goodreads users have different preferences for naming their shelves so it's important to find out what shelves they have before trying to manipulate books on a shelf. `to-read`, `currently-reading` and `read`, are three shelves that Goodreads creates by default for every user.

Create a new route in `server.js` called `shelves` and add the following:

```js
// List Shelves Route
app.get('/shelves', function (req, res) {
    var usersshelves = gr.getUsersShelves(userid);
    usersshelves.then(function (result) {
        console.log(result);
    }).catch(function () {
        console.log("Goodreads Get Shelves Rejected");
        console.log(result);
    });
});
```
This time while running one of the Goodreads API's functions we will pass along the `userid` variable. This lets the Goodreads API know which user it should return shelves for. Similar to obtaining the user ID, we will `console.log()` the result to find out which part of the response we need.

Run the app using `npm start` and go to `https://localhost:8080/authenticate`. Once you've been authenticated go to `https://localhost:8080/shelves` and you should see a response in the terminal.

```json
{
  start: '1',
  end: '2',
  total: '2',
  user_shelf: [
    {
      id: [Object],
      name: 'read',
      book_count: [Object],
      exclusive_flag: [Object],
      sort: [Object],
      order: [Object],
      per_page: [Object],
      display_fields: '',
      featured: [Object],
      recommend_for: [Object],
      sticky: [Object]
    },
    {
      id: [Object],
      name: 'currently-reading',
      book_count: [Object],
      exclusive_flag: [Object],
      sort: [Object],
      order: [Object],
      per_page: [Object],
      display_fields: '',
      featured: [Object],
      recommend_for: [Object],
      sticky: [Object]
    }
  ]
}
```
From this, we can tell that we want the `result.user_shelf` so like before, replace the `console.log(result)` with `var usershelf = result.user_shelf`.

### Returning A User's Owned Books
Finally, we can proceed to get books the user has already added to Goodreads. For simplicity in this example, we will use owned books (a special category of books that isn't a shelf) but the principle is the same. If you want to manipulate books on a user's shelf, make sure the shelf already exists by using the `gr.getUsersShelves()` function which we just did.

Create a route called `owned-books` and add the following:

```js
// Owned Books Route
app.get('/owned-books', function (req, res) {
    var usersbooks = gr.getOwnedBooks({
        userID: userid,
        page: 1
    });
    usersbooks.then(function (result) {
        console.log(result);
    }).catch(function () {
        console.log("Goodreads Get Owned Books Rejected");
    });
});
```
As before, go to `https://localhost:8080/authenticate` and login to your Goodreads account. Then go to your newly created route (`https://localhost:8080/owned-books`) and check the console for the result. The result should be:

```js
{
  Request: {
    authentication: 'true',
    key: 'your api key here',
    method: 'owned_books_user'
  },
  owned_books: { owned_book: [ [Object], [Object] ] }
}
```

You can see that we need to amend our request to `result.owned_books.owned_book`. We also want to display the titles of owned books to the user on a new page and link (when clicked) to the book pages we created in [part 1](https://www.section.io/engineering-education/simple-guide-to-using-apis-nodejs/). Change the route according like so:

```js
// Owned Books Route
app.get('/owned-books', function (req, res) {
    var usersbooks = gr.getOwnedBooks({
        userID: userid,
        page: 1
    });
    usersbooks.then(function (result) {
        var userbooklist = result.owned_books.owned_book;
        res.render('pages/owned-books', {
            userbooklist: userbooklist
        });
    }).catch(function () {
        console.log("Goodreads Get Owned Books Rejected");
    });
});
```

In the `views/pages` folder, create a new file called `owned-books.ejs`. In the new file, add:

```html
!DOCTYPE html>
<html lang="en">
<head>
    <%- include('../partials/head') %>
</head>
<body>
    <header>
        <%- include('../partials/header') %>
    </header>
    <main>
        <h2>Your Owned Books</h2>
          <% for(var i=0; i < userbooklist.length; i++) { %>
            <a id="<%= userbooklist[i].book.id._ %>" href="/book">
                <p><%= userbooklist[i].book.title %></p>
            <% } %>
            </a>
    </main>
    <footer>
        <%- include('../partials/footer') %>
    </footer>
</body>
</html>

```
Finally, we should test to make sure it works. Go to `https://localhost:8080/authenticate` to login and then go to `https://localhost:8080/owned-books`. You should now see only the books you've marked as owned in your Goodreads account. Clicking on a book title should you take you to a book page exactly the same as the book search in [part 1](https://www.section.io/engineering-education/simple-guide-to-using-apis-nodejs/).

See final result below:

![Your Owned Books from Goodreads](/engineering-education/simple-guide-to-using-apis-part2/final-result.png)

### Next Steps
Congratulations. You've authenticated with the Goodreads API and made your first authenticated request. Explore the [goodreads-api-node](https://github.com/baahrens/goodreads-api-node) documentation to discover more ways to use the Goodreads API.

Looking for an example? Check out my [Library Trackr web app](https://github.com/louisefindlay23/library-trackr) where I'm aiming to solve the needs of bibliophiles who collect books in both print and ebook format.

Need more ideas? Why not try to add books to a user's shelf or use different APIs like [Spotify](https://developer.spotify.com/documentation/web-api) or [Unsplash](https://unsplash.com/developers)?
