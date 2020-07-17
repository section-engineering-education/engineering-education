---
layout: engineering-education
status: publish
published: true
slug: node-heroku-deployment
title: Node Heroku Deployment
description: This is an article about deploying a NodeJS app to Heroku and the other small processes involved. Keys and secrets, migrating to a remote database service and pushing applications to Heroku.
author: linus-muema
date: 2020-07-16T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/node-heroku-deployment/hero.jpg
    alt: Node Heroku Deployment example
---
From the previous tutorial, we created a basic authentication API with NodeJS. Now it's time to deploy it to Heroku and have it as a remote service. In this tutorial, we will deploy the app in three stages:
<!--more-->


1. Hide our keys and secrets
2. Migrate to a remote database service
3. Push the application to Heroku.

Now let's get to it.

### 1. Hiding keys and secrets

You must have noticed that we had our `tokenSecret` as a variable in our files. This is not secure because it can be accessed easily and when in the wrong hands, it can be a great problem. In order to hide such values, we can store them as environment variables.

Go ahead and run `npm i dotenv` to install the [dotenv](https://www.npmjs.com/package/dotenv) package. It will help us manage our environment variables. Then in your root-level project directory, create a new file named `.env` i.e. a hidden file. We will then move our `tokenSecret` in this file by adding

```env
TOKEN_SECRET=my-token-secret
```

Then in your `index.js` file, import the dotenv package and make it read your env file by calling the `config()` method. Add the following to the top of the index file

```javascript
require('dotenv').config()
```

In the `auth.js` file, replace the actual value of `tokenSecret` with `process.env.TOKEN_SECRET`. This will get our token secret from our .env file. And that's how you hide your values as environment variables.


### 2. Migrating to remote database

We have been testing our server with a local MongoDB database, but when we deploy it, we will need a remoter service. We have various options [AWS](https://aws.amazon.com/), [Azure](https://azure.microsoft.com/en-us/) or [Google Cloud](https://cloud.google.com/). But I personally prefer the [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and it is what I will be using in this tutorial. So go ahead and create an account if you don't have. You will also be prompted to create a cluster. They have a free sandbox option where you are given 500MB free of storage which is enough for us to test our app on.

![cluster](/engineering-education/node-heroku-deployment/cluster.png)

Once you are done with the creation, we need to get a URL link which we can use to directly access the remote database. So go ahead and click connect in your cluster section.

The first modal will need you to add an IP address. So go ahead and add a different IP address. If we set our own, the deployed application will not work. We need to allow everyone who uses the application to be able to perform read and write operations. So go ahead and add the following IP address. Then You will also need to add a MongoDB user too. Keep the username and password well. We will use them later.

![atlas-ip](/engineering-education/node-heroku-deployment/atlas-ip.png)

The next section is selecting the mode of connection. We will need to connect our application. This will give us a url to use in our server.

![atlas-connect](/engineering-education/node-heroku-deployment/atlas-connect.png)

Now we will be provided with a url. Copy it and add it to the `.env` file as we do not want to expose it.

![atlas-url](/engineering-education/node-heroku-deployment/atlas-url.png)
```script
MONGODB_URL=<YOUR_URL_HERE>
```

If you look at the URL, there are two variables/values inside `<>` brackets. One is for the password of the user you created and the other one is for a database name. The database name can be anything you'd like. In my case I used `authentication`. And with that we have a remote database and a URL to connect to it. Next, we will modify the URL in our `index.js` file. Change the URL to the following.

```javascript
mongoose.connect(process.env.MONGODB_URL || dbURI , ...)
```

This tells the application to use `MONGODB_URL` and if not available, to use the `dbURI` value. To confirm the connection, you can handle the promise returned by the `mongoose.connect` method.

```javascript
mongoose.connect(process.env.MONGODB_URL || dbURI , ...)
    .then(res => {console.log(res.connections[0].client);})
    .catch(err => {console.log(err);})
```

And with that, the remote database service is set up.

### 3. Deploying the application
This is the final stage. We will be pushing our application to [Heroku](https://www.heroku.com/). Go ahead and create an account if you do not have one. You can go ahead and install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) as it allows for easy deployment.

First, we do not want to push the node modules. We all know how large they are 😆. So go ahead and create a `.gitingore` file before you initialize git and paste the following code.

```.gitignore
/node_modules
npm-debug.log
.DS_Store
/*.env
```

This even ignores our environment variables. Now run the following command to initialize and create an application in Heroku.

```shell
heroku create node-authentication-api
```

`node-authentication` is the name of our project. You can use whichever name. Next up, create a file known as `Procfile` in the root-level of the project. Paste the code below.

```Procfile
web: npm run start
```

This tells Heroku to start a `web` process with the script we have defined. Now let us make changes to out `package.json` file.

![package-json](/engineering-education/node-heroku-deployment/package-json.png)

We add the `start` script to start our server and define the version of node in the `engines` section. Now we are ready to push application to Heroku. We use the normal git commands to commit our latest changes. Then to push our application we run:

```bash
git push heroku master
```

But now when we run our application, we get an error. The reason is, we ignored our environment variables hence they were not pushed to Heroku also. We have to move them to Heroku as well. Heroku does have it's way of saving environment variables. In Heroku, they are known as `config vars`. And we can set them using the Heroku CLI. Let us upload our environment variables using the following commands

```bash
heroku config:set MONGODB_URL=<YOUR_URL_HERE>

heroku config:set TOKEN_SECRET=<YOUR_SECRET_HERE>
```

And with that, our application is deployed to Heroku and we can go ahead and test our API endpoints.
The API base URL is usually `https://<NAME_OF_APPLICATION>.herokuapp.com/`.

You can find the code to this tutorial on [Github](https://github.com/LinusMuema/node-authentication-api/tree/heroku-deployment). In the next tutorial we will clean up our code and follow an MVC pattern for ease of working and code decoupling. 😄
