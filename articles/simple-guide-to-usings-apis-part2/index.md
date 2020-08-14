# Getting to Grips with APIs: Authentication

You've worked with the Goodreads API to create a full-stack Node.js web app that will search the Goodreads database for a book query and return a list of relevant matches. If you haven't, read [part 1](link to part 1). 

That's a good start but what if you want to be able to add books to one of your users' shelves? You'll need to find a way to authenticate users' Goodreads accounts with the Goodreads API so you can discover their user ID so the API knows which account made the request.

[oAuth](link to a Section article discussing this) is the main authentication standard for APIs. We will be using oAuth 1 because that's the only version the Goodreads API supports but it's recommend to use oAuth 2 wherever possible. Similar to [Part 1](link to Part 1), `goodreads-api-node-wrapper` will make the process easier.

## Authentication with the Goodreads API


* * *
Building on Part 1, we will use the Goodreads API to authenticate (oAuth 1) with a user's GoodReads account so they can return their own book data such as their shelves and books they've added.

Be able to use oAuth 1 authentication with the Goodreads API in order to make authenticated requests

Be able to use callback URLs so the user will be redirected back to their web app after signing in to GoodReads

Be able to store the current user's Goodreads ID so they can make authenticated requests on their behalf

Make authenticated Goodreads API requests for information such as a user's shelves or books

https localhost required