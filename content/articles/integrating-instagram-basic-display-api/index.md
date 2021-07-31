---
layout: engineering-education
status: publish
published: true
url: /integrating-instagram-basic-display-api/
title: Integrating Instagram Basic Display API on a Node.js GraphQL API
description: In this article, we will learn how to integrate the Instagram basic display API on a Node.js GraphQL API.
author: kennedy-mwangi
date: 2021-07-01T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/integrating-instagram-basic-display-api/hero.jpg
    alt: Instagram basic display api
---
Instagram is a photo and video-sharing social networking service launched in 2010. It is currently one of the most used social media applications with more than one billion users.
<!--more-->
As of October 2019, Facebook, the parent organization of Instagram, released the Instagram basic display API. The API allows users to get profile information, media (photos and videos) of their Instagram accounts. The restriction is that you cannot access the data of another Instagram user.

### Goals
In this article, we will integrate the Instagram basic display API on a Node.js GraphQL API.

### Prerequisites
To follow along in this article, it is necessary to have:

- [Node.js](https://nodejs.org/en/) installed on your computer.
- Working knowledge of [GraphQL](https://graphql.org/).
- Working knowledge of JavaScript.

### Overview
- [Creating a Facebook developer account](#creating-a-facebook-developer-account)
- [Creating an app](#creating-an-app)
- [Adding an Instagram test user](#adding-an-instagram-test-user)
- [Setting up the project](#setting-up-the-project)
- [Installing the necessary dependencies](#installing-the-necessary-dependencies)
- [Getting the authorization code](#getting-the-authorization-code)
- [Getting the short lived access token](#getting-the-short-lived-access-token)
- [Getting the long lived acccess token](#getting-the-long-lived-access-token)
- [Getting user profile data](#getting-user-profile-data)
- [Getting user media data](#getting-user-media-data)

### Creating a Facebook developer account
To create a Facebook developer account, follow the following steps:

- Visit the [Facebook developer page](https://developers.facebook.com/) and on the right side, click [Login](https://www.facebook.com/login).
- In the resulting page, key in your credentials and click _Log In_.
- After signing in, you will be directed to your [dashboard page](https://developers.facebook.com/apps).

### Creating an app
To consume the Instagram API, we will need to have created an app. To do that, we will follow the following steps:

- From your dashboard page, in the apps section, click the _Create App_ button.
- In the resulting pop-up, select _Consumer_ and then click _Continue_.
- Enter your _App Display Name_ and then click _Create App_.
- In the resulting page, in the products section, on the _Instagram Basic Display_ product click _Set Up_.
- On the following page, read through the information provided and then click _Create App_ down below. Confirm the name of the app in the resulting pop-up.
- In the resulting page, we will need to add some valid URLs in the entries provided. For this article, we will use [httpstat.us](https://httpstat.us/). It's a service for generating [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) based on the nature of the request.
  
  For example, a *https://httpstat.us/200* will return a `200` status code.
  
  In the form, we will enter the link to yield a `200` status code as follows
  
  ![urls-insta-display-app](/engineering-education/integrating-instagram-basic-display-api/urls-insta-display-app.png)
  
- In the _App Review for Instagram Basic Display_ section, hit _Add to Submission_ for _instagram_graph_user_profile_and_instagram_graph_user_media_ to be able to access Instagram's user profile and media.
- Hit the `Save Changes` button below.

### Adding an Instagram test user
To use the Instagram basic display API in development, we will have to add a test user. To do so, we will follow the following steps:

- In the left sidebar, click on _Roles_ and then _Roles_.
- Scroll to the bottom, and hit the _Add Instagram Testers_ button.
- In the resulting pop-up, enter the username of the Instagram account you are going to use throughout the article. Make sure it's an Instagram account you can log in to because you will be required to accept the request sent.
- On hitting _Submit_, the account will appear in the section with a `Pending` text attached to it. The owner of the Instagram account is supposed to accept it first to be complete.
- Log in to that particular Instagram account you have entered its username.
- In the _settings_ section, find _Apps and Websites_. In the resulting section, click on the _TESTER INVITES_ tab. Your recently created app should be listed there as follows:
  
  ![tester-invites](/engineering-education/integrating-instagram-basic-display-api/tester-invites.png)
  
  Click on the _Accept_ button.
  
- Hurray!!, your Instagram app is now configured, it's time to set up our project.

### Setting up the project
To set up the project, we will follow the following steps:

- Create a folder _instagram-display-api-graphql_.
- Open VS Code to that specific folder.
- Open the VS Code terminal by pressing **ctrl+shift+`**.
- In the resulting terminal, type in :
  
  ```bash
  npm init --y
  ```

  to initialize the application with default settings.

- Structurize the application as follows:
  ![project_structure](/engineering-education/integrating-instagram-basic-display-api/project-structure.png)

### Installing the necessary dependencies
To start, we will install all the dependencies that we will need throughout the application.

The dependencies are as follows:

- **express**: Minimalist web application framework for Node.js.
- **apollo-server-express**: For providing an [Express.js](https://expressjs.com/) based integration for GraphQL server.
- **axios**: For sending requests and receiving responses from Instagram API.
- **cors**: For controlling client access.
- **dotenv**: For accessing the environmental variables from the `.env` file.
- **graphql**: For providing a query language for our API.
- **request**: For sending requests that require form data to the Instagram API and receiving appropriate responses.
- **nodemon**: For automatically restarting our Node.js server whenever we make a change.

We install them as follows:

```bash
npm i express apollo-server-express axios cors dotenv graphql request nodemon
```

### Getting the authorization code
For us to use the API, the first step is to get the authorization code. It provides an authentication mechanism to the Instagram API.

To get an authorization code, we follow the following steps:

- Start with getting our application's credentials. To do this, go to your dashboard page. On the left sidebar to the bottom, click on _Instagram Basic Display_ and _Basic Display_.
- In the resulting page, scroll down to find the _Instagram App ID_, and _Instagram App Secret_, copy them and paste them appropriately to the `.env` file in the root of the project. Your `.env` file should be similar to:
  
  ![credentials](/engineering-education/integrating-instagram-basic-display-api/credentials.png)
  
- After setting your credentials, its time we set up the server in the `src/index.js` file by adding the following:

  ```javascript
  const express = require("express");
  const cors = require("cors");
  require("dotenv").config();
  const PORT = process.env.PORT || 4000;
  
  // initialize express
  const app = express();
  
  // express configs
  app.use(cors()); // cors set up
  app.use(express.json()); // json format
  app.use(express.urlencoded({ extended: false })); // data parsing
  
  // routes
  
  // getting-authorization-code
  app.get("/get-auth-code", (req, res, next) => {
    return res.send(
      `<a href='https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=user_media,user_profile&response_type=code'> Connect to Instagram </a>`
    );
  });
  
  // start server on the PORT.
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  ```

  From above, we are:
  - Requiring the packages we need.
  - Setting the port for our application to run to.
  - Initializing express.
  - Adding some configuration to the express app.
  - Setting up the route for getting an authorization code.
  - Starting the server by listening to the specified port.

- Edit the `scripts` section of `package.json` as follows:
  
  ![scripts-section](/engineering-education/integrating-instagram-basic-display-api/scripts-section.png)
  
- In your recently opened VsCode terminal, run the following command:
  
  ```bash
  npm run dev
  ```
  
  This will start the server on PORT 4000.

- From your web browser, open _http:localhost:4000/get-auth-code_. In there, click the link _Connect to Instagram_ to connect to your Instagram account.
- In the resulting pop-up, click _Allow_, after which you will be redirected to a different page. On this new page, in the URL section, we have a code parameter which is as below:
  ![url-code](/engineering-education/integrating-instagram-basic-display-api/url-code.png)
  
  Copy the entire code up to where we have `#`. Don't include the `#`. Paste the code to your `.env` file. Your `.env` file should now be similar to:
  
  ![new-env](/engineering-education/integrating-instagram-basic-display-api/new-env.png)

### Getting the short-lived access token
After getting the authorization code, we can now get the short-lived access token. It is defined as short-lived because it is only valid for one hour. An access token is usually sent along with every request you make to the API for authentication.

To get the short-lived access token, we will follow the following steps:

- Introduce `Apollo server` to our app. To do this, we will edit our `src/index.js` as follows:
  - Require it as a package at the top:

    ```js
    const { ApolloServer } = require("apollo-server-express");
    ```

  - Require the type definitions and the resolvers:

    ```js
    const typeDefs = require("./schema");
    const resolvers = require("./resolvers");
    ```

  - After the express configurations, we configure `Apollo server` as follows:

    ```js
    const server = new ApolloServer({ typeDefs, resolvers });
    server.start().then(() => {
      return server.applyMiddleware({ app });
    });
    ```

    The above configuration takes in the _typeDefs_ which is the _schema_ and the _resolvers_. The server is started and then the express instance, _app_ is applied as a middleware.
- In the `schema/index.js` file, we set up the schema:
  - Start by requiring `gql` from `apollo-server-express`. It will add some highlights to the queries we will write:

    ```js
    const { gql } = require("apollo-server-express");
    ```

  - We define the schema of the response sent by the API when getting a short lived access token:

    ```js
    const AccessTokenResponse = gql`
      type AccessTokenResponse {
        access_token: String!
        user_id: Float!
      }
    `;
    ```

    The response will consist of an `access_token` which is a `String` and a `user_id` which is a `Float`.
  - We then define the overall `Query` for the schema. It will hold all the methods and their respective response schemas:

    ```js
    const Query = gql`
      type Query {
        getShortLivedAccessToken: AccessTokenResponse
      }
    `;
    ```

    From above, the method `getShortLivedAccessToken` will return a response with the schema `AccessTokenResponse`.
  - We then export the `Query`, and `AccessTokenResponse`:

    ```js
    module.exports = [AccessTokenResponse, Query];
    ```

    We are exporting it as an array because, throughout the article, we will define other schemas.
- After the definition in the schema, we now work out the resolvers. To do this, proceed to `resolvers/Instagram.js`:
  - Start by requiring the necessary packages:

      ```js
      const { UserInputError } = require("apollo-server-express");
      const { get } = require("axios").default;
      const { post } = require("request");
      const { promisify } = require("util");
      require("dotenv").config();
      ```

  - **UserInputError**: Will be used for sending an error to the user.
  - **get**: For sending _GET_ request to the Instagram API.
  - **post**: For sending _POST_ request to Instagram API with `Form Data`.
  - **promisify**: For turning a callback to a promise-based function.
  - **dotenv**: For loading environmental variables.
  - Promisify the `post` function from request:

    ```js
    const postAsync = promisify(post);
    ```

  - Initialize the function to get the `access token`:

    ```js
    async function getShortLivedAccessToken() {
      // sending the request.
      let { body, statusCode } = await postAsync({
        url: `https://api.instagram.com/oauth/access_token `,
        formData: {
          client_id: process.env.INSTAGRAM_APP_ID,
          client_secret: process.env.INSTAGRAM_APP_SECRET,
          redirect_uri: "https://httpstat.us/200",
          code: process.env.AUTHORIZATION_CODE,
          grant_type: "authorization_code",
        },
        headers: {
          "content-type": "multipart/form-data",
          host: "api.instagram.com",
        },
      });

      // getting the response.
      let response = JSON.parse(body);

      // checking the status code for error.
      if (statusCode !== 200) {
        let error_message = response.error_message;
        // if error exists, sending the error.
        return new UserInputError(error_message);
      }

      // if no error exists, returning the response.
      return response;
    }
    ```
  
From above, we are:

- Sending the request to the API.
- Getting the response from the API.
- Checking the status code of the response to detect an error.
- If an error exists, sending the error.
- If an error does not exist, sending the response.

- Export the function from the file:

  ```js
  module.exports = {
    getShortLivedAccessToken,
  };
  ```

- After declaring the function in the `resolvers/Instagram.js` file, We also need to make it known in the `resolvers/index.js` file. From this file, it's where we will export the general `Query` object we declared in the `schema/index.js` file. Therefore, for all the functions we will declare in the `resolvers/Instagram.js` file, we have to make each of them known here. For now, we will add the following:

  ```js
  // get the defined function(s)
  const { getShortLivedAccessToken } = require("./instagram");

  // general query object
  const Query = {
    Query: {
      getShortLivedAccessToken: () => getShortLivedAccessToken(),
    },
  };

  // export the Query object
  module.exports = Query;
  ```

- After adding the **getShortLivedAccessToken** to the `resolvers/index.js`, we are ready to test the functionality. To do so, we will follow the following steps:

- Start the development server if not yet started by running:

    ```bash
    npm run dev
    ```

  - From your browser, visit: `http://localhost:4000/graphql`.

  - In the space provided on the left side, write the following query:

    ```js
    query GetShortToken{
      getShortLivedAccessToken{
        access_token
        user_id
      }
    }
    ```

The above query calls the `getShortLivedAccessToken` method and then extracts the `access_token` and `user_id` from the response of the method.

- Hit the play button aligned at the center between the left pane and the right pane.

- Observe the results. If you get an error of invalid `client secret` and `code` or that your `authorization code` has expired, revisit the [previous step](#getting-the-authorization-code) and restart the server manually by pressing `ctrl + c` to stop it and then `npm run dev` to start it. Else if you got no error, your response on the right side should be similar to:

![short-lived-at-response](/engineering-education/integrating-instagram-basic-display-api/short-lived-at-response.png)
  
- Copy the access token value from the response to your `.env` file. Your `.env` file now should be similar to:

![env-with-sat](/engineering-education/integrating-instagram-basic-display-api/env-with-sat.png)

### Getting the long-lived access token
Since short-lived access tokens have a limited time-space, it is vital to generate an access token with a longer time-space. They are called **long-lived access tokens**. They are valid for **60 days**.

To get a long-lived access token, we will follow the following steps:

- In the `schema/index.js`, we add its schema definition as follows:

  ```js
  const LongLivedAccessToken = gql`
    type LongLivedAccessToken {
      access_token: String!
      token_type: String!
      expires_in: Float!
    }
  `;
  ```

  The above schema defines that the response of getting a **long-lived access token** will comprise of: an **access token**, a **token type**, and an **expires in** value.
- Add the method of getting a **long-lived access token** to the query object:

  ```js
  const Query = gql`
    type Query {
      getShortLivedAccessToken: AccessTokenResponse
      getLongLivedAccessToken: LongLivedAccessToken
    }
  `;
  ```

- Add the schema definition to the exported array:

  ```js
  module.exports = [AccessTokenResponse, LongLivedAccessToken, Query];
  ```

- After exporting the schema, we proceed to the `resolvers/Instagram.js` and define a function to get the **long-lived access token** from the API:

  ```js
  // getting a long lived access token
  async function getLongLivedAccessToken() {
    let response;

    try {
      // send a request to the API
      response = await get("https://graph.instagram.com/access_token", {
        params: {
          grant_type: "ig_exchange_token",
          client_secret: process.env.INSTAGRAM_APP_SECRET,
          access_token: process.env.SHORT_LIVED_AT,
        },
        headers: {
          host: "graph.instagram.com",
        },
      });
    } catch (error) {
      // If an error occurs, return it.
      return new UserInputError(error);
    }

    // If no error, get the response and return it.
    response = response["data"];
    return response;
  }
  ```

  From above, we are:

- Sending a GET request to the API.
- Listening for any error that might occur and returning it.
- If no error occurs, we are sending back the response.
- Add the function to the exported object:

```js
module.exports = {
  getShortLivedAccessToken,
  getLongLivedAccessToken,
};
```

- In the `resolvers/index.js` file, import the function:

    ```js
    const {
      getShortLivedAccessToken,
      getLongLivedAccessToken,
    } = require("./instagram");
    ```

  - Add it to the **Query** object:

    ```js
    const Query = {
      Query: {
        getShortLivedAccessToken: () => getShortLivedAccessToken(),
        getLongLivedAccessToken: () => getLongLivedAccessToken(),
      },
    };
    ```

- After that, we can test the functionality now. To do that:
- Ensure that your development server is up and running.
- In your browser, In the same tab we were previously, click the `+` to open another pane.
- In the resulting pane, on the left side, add the following query:

```js
      query GetLongLivedToken {
        getLongLivedAccessToken{
          access_token
          token_type
          expires_in
        }
     }
```

The above query calls the _getLongLivedAccessToken_ method and extracts the _access_token, _token_type_ and _expires_in_.

- Click the play button in the middle and observe the results.
- If your short-lived access token is expired, go to the [previous step](#getting-short-lived-access-token). Else, your response should be similar to:

![long-lived-at-response](/engineering-education/integrating-instagram-basic-display-api/long-lived-at-response.png)

- Copy your access token from the response to your `.env` file. Your `.env` file should be similar to:

![env-with-llat.png](/engineering-education/integrating-instagram-basic-display-api/env-with-llat.png)

### Getting user profile data
On an Instagram account, we can be able to get the profile data of that specific account. The profile data here involves the _account type_, _id_, _media count_, and _username_.

To implement the above functionality, we will follow the following steps:

- Add its schema definition in `schema/index.js`:

  ```js
  const ProfileData = gql`
    type ProfileData {
      account_type: String!
      id: String!
      media_count: Int!
      username: String!
    }
  `;
  ```

From above, we are setting our response to contain the _account_type_, _id_, _media_count_, and _username_ since it is what we want to get.

- Add the method of getting profile data to the Query object:

  ```js
  const Query = gql`
    type Query {
      getShortLivedAccessToken: AccessTokenResponse
      getLongLivedAccessToken: LongLivedAccessToken
      getProfileData: ProfileData
    }
  `;
  ```

- Add the schema defined above to the exported array:

  ```js
  module.exports = [
    AccessTokenResponse,
    LongLivedAccessToken,
    ProfileData,
    Query,
  ];
  ```

- After defining the schema, we set up the function for getting the profile data from the API in the `resolvers/Instagram.js` file as follows:

  ```js
  // getting profile data
  async function getProfileData() {
    let response;
    // send request to the API
    try {
      response = await get("https://graph.instagram.com/me", {
        params: {
          fields: "id,username,media_count,account_type",
          access_token: process.env.LONG_LIVED_AT,
        },
        headers: {
          host: "graph.instagram.com",
        },
      });
    } catch (error) {
      // catch and return the error
      return new UserInputError(error);
    }

    // get the data and return it.
    response = response["data"];
    return response;
  }
  ```

From above, we are:

- Sending request to the API.
- Listening to any error that occurs. If it does, we return the error.
- Else if, no error, we return the data sent.

- Add the above function to the exported object:

  ```js
  module.exports = {
    getShortLivedAccessToken,
    getLongLivedAccessToken,
    getProfileData,
  };
  ```

- In the `resolvers/index.js`, import the function:

```js
const {
    getShortLivedAccessToken,
    getLongLivedAccessToken,
    getProfileData,
  } = require("./instagram");
```

- Add the function to the Query object:

```js
const Query = {
  Query: {
    getShortLivedAccessToken: () => getShortLivedAccessToken(),
    getLongLivedAccessToken: () => getLongLivedAccessToken(),
    getProfileData: () => getProfileData(),
  },
};
```

- Test the functionality:

- Ensure that the development server is up and running.
- In the same browser tab as previously, click the `+` to open a separate pane. On the left side of the pane, add the following query:

```js
query getProfileData {
  getProfileData{
    account_type
    id
    media_count
    username
  }
}
```

From above, we are calling the _getProfileData_ function and extracting the _account_type_,_id_,_media_count_,_username_.

- Click the play button in the center, If everything was okay, you should receive a response similar to:

![profile-data-response](/engineering-education/integrating-instagram-basic-display-api/profile-data-response.png)

In case of an error, revisit the steps.

### Getting user media data
Media data is the data that the user has posted in his or her Instagram account. The _media_count_ value from the previous process is the count of the media data that the user has posted.

The media here can be a photo, a video, or a carousel album. To set up the functionality of getting a user's media, we will follow the following steps:

- Start by setting up the schema for the data we will receive:

```js
const MediaData = gql`
  scalar Date
  type MediaData {
    caption: String
    id: String
    media_type: String
    media_url: String
    permalink: String
    thumbnail_url: String
    timestamp: Date
    username: String
  }
`;
  ```

From above, we are setting that the media data will comprise of _caption_, _id_,_media_type_, _media_url_, _permalink_, _thumbnail_url_, _timestamp_, _username_.

- Add the method of getting a user's media data to the Query object:

```js
const Query = gql`
  type Query {
    getShortLivedAccessToken: AccessTokenResponse
    getLongLivedAccessToken: LongLivedAccessToken
    getProfileData: ProfileData
    getUserMediaData: [MediaData]
  }
`;
```

From above, we are adding the _getUserMediaData_ method, which will return an array of data with type _MediaData_.

- Add the _MediaData_ type to the exported array:

```js
module.exports = [
  AccessTokenResponse,
  LongLivedAccessToken,
  ProfileData,
  MediaData,
  Query,
];
```

- In the `resolvers/Instagram.js`, we set up a function for getting media data as follows:

```js
// getting media data
async function getUserMediaData() {
  let response;

  // sending request to API
  try {
    response = await get("https://graph.instagram.com/me/media", {
      params: {
        fields:
          "id,caption,media_url,media_type,permalink,thumbnail_url,timestamp,username",
        access_token: process.env.LONG_LIVED_AT,
      },
      headers: {
        host: "graph.instagram.com",
      },
    });
  } catch (error) {
    // Catching an error, and returning it.
    return new UserInputError(error);
  }

  // If no error, returning the response.
  response = response["data"];
  return response.data;
}
```

From above, we are:

- Sending request to the API.
- Listening to any error, catching it, and returning it.
- If there is no error, returning the response from the API.

- Add the function to the exported object:

```js
module.exports = {
  getShortLivedAccessToken,
  getLongLivedAccessToken,
  getProfileData,
  getUserMediaData,
};
```

- In the `resolvers/index.js`:

- Import the function:

  ```js
  const {
    getShortLivedAccessToken,
    getLongLivedAccessToken,
    getProfileData,
    getUserMediaData,
  } = require("./instagram");
  ```

- Add the function to the Query object:

  ```js
  const Query = {
    Query: {
      getShortLivedAccessToken: () => getShortLivedAccessToken(),
      getLongLivedAccessToken: () => getLongLivedAccessToken(),
      getProfileData: () => getProfileData(),
      getUserMediaData: () => getUserMediaData(),
    },
  };
  ```

- To test the functionality:

- Ensure that the development server is up and running.
- In your browser, in the previous tab, hit the `+` to open a separate tab. In the new tab, on the left pane, add the following query:

  ```js
  query getMediaData{
    getUserMediaData{
      caption
      id
      media_type
      media_url
      permalink
      thumbnail_url
      timestamp
      username

    }
  }
  ```

The following query calls the _getUserMediaData_ function and extracts the _caption_, _id_, _media_type, _media_url_, permalink_, _thumbnail_url_, timestamp_, username_ from the response.

- Hit the play button in the center. Observe the response on the right side. If you encounter any error, revisit the steps. Else if you have some media posted to that Instagram account, your response should be similar to:

![media-data-response](/engineering-education/integrating-instagram-basic-display-api/media-data-response.png)

If you don't have some media data posted, your response will be an empty array.

### Summary

In this article, we have managed to integrate the Instagram basic display API on a Node.js GraphQL API by following the below steps:

- [Creating a Facebook developer account](#creating-a-facebook-developer-account)
- [Creating an app](#creating-an-app)
- [Adding an Instagram test user](#adding-an-instagram-test-user)
- [Setting up the project](#setting-up-the-project)
- [Installing the necessary dependencies](#installing-the-necessary-dependencies)
- [Getting the authorization code](#getting-the-authorization-code)
- [Getting the short lived access token](#getting-the-short-lived-access-token)
- [Getting the long lived acccess token](#getting-the-long-lived-access-token)
- [Getting user media data](#getting-user-media-data)
- [Getting user profile data](#getting-user-profile-data)

### References

To gain more insights on the tools and technologies involved in this article, it is advisable to go through the following resources:

- [Official docs](https://developers.facebook.com/docs/instagram-basic-display-api).
- [HTTP Status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [httpstat.us](https://httpstat.us/)
- [GraphQL](https://graphql.org/)
- [Apollo server](https://www.apollographql.com/docs/apollo-server/)

### Conclusion

With the Instagram basic display API, you can be able to integrate an Instagram account into various applications to provide various automation schemes.

In the finalized code, which can be accessed from this [GitHub repository](https://github.com/mwangiKibui/consuming-insta-basic-display-api-node-js-graphql), there is added functionality concerning the following use cases:

- Getting information on a single media.
- Getting information on an album.
- Refreshing a long-lived access token.

Be sure to check it out.

Happy hacking!!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
