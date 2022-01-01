---
layout: engineering-education
status: publish
published: true
url: /handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/
title: Handling Web App authentication using Auth0, ASP.NET Core and Nuxt.js
description: This tutorial will use `Auth0` to authenticate the users into the system using `ASP.NET Core API` and `Nuxt.js`.
author: lilian-ogoti
date: 2021-11-19T00:00:00-07:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/hero.jpg
    alt: Handling Web App authentication using Auth0, ASP.NET Core and Nuxt.js hero image
---

Modern applications have implemented several mechanisms to authenticate and verify their visitors. Each developer tends to devise their methods of authenticating and verifying the users accessing the system. 
<!--more-->
It might seem like a simple approach, but building own authentication system or even integrating it with third parties social media platforms like [Google](https://www.google.com/) and [Facebook](https://www.facebook.com/) can be tedious, time-consuming, and at times complex.

A better approach would be to use an already dedicated authentication platform to verify and authenticate users into the system. A good example is [Auth0](https://auth0.com/), which relieves the developers of dealing with sensitive user data as it handles the authentication. The platform is backed by a dedicated team of security experts specializing in handling user data privacy.

This guide will use the `Auth0` platform to authenticate and verify the users into the system using `ASP.NET Core API` and `Nuxt.js`.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Understanding the concept of Auth0](#understanding-the-concept-of-auth0)
- [How Auth0 authentication works](#how-auth0-authentication-works)
- [Setting up Auth0](#setting-up-auth0)
- [Creating an ASP .NET Core backend API](#creating-an-asp-net-core-backend-api)
- [Creating the Nuxt client application](#creating-the-nuxt-client-application)
- [Wrapping up](#wrapping-up)
- [Further reading](#further-reading)

### Prerequisites
- Latest [Visual Studio](https://visualstudio.microsoft.com/vs/) installed
- A good understanding of [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0), [JavaScript](https://www.javascript.com/), [Vue.js](https://vuejs.org/v2/guide/) and [Nuxt.js](https://nuxtjs.org/docs/get-started/installation)
- A web browser installed, preferably [Google Chrome](https://www.google.com/intl/en_us/chrome/)
- [Npm](https://www.npmjs.com/package/npm) packages installed
- [Auth0](https://auth0.com/) account

### Understanding the concept of Auth0
`Auth0` deals with the user management in a given system. Its purpose is to authenticate and verify requests in a system. Auth0 comes with many features used in authentication. Some of these features include social media sign-in using `Facebook` or `Google`, [Single-Sign-On](https://www.onelogin.com/learn/how-single-sign-on-works) (SSO), and also supports [Multi-Factor Authentication](https://www.onelogin.com/learn/what-is-mfa).

### How Auth0 authentication works
The user will login from the client-side application using their correct username and password or social media platforms. Next, the sign-in request is then forwarded to the `Auth0` platform, and upon successful authentication, it responds with an access token.

The client application can then request data from the backend, which it sends along with the previous access token. On receipt of the request, the backend API will first verify the token with `Auth0` to confirm that it is valid, and upon successful verification, it responds with the requested data.

### Setting up Auth0
We will first create the `Auth0` account by visiting [this link](https://auth0.com/signup). We will access our `Auth0` after signing in and then navigate to the `Application` tab. Click on `Create Application` option and click on the `Single Page Web Application` option to create it as shown below:

![create auth0 app](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/create-app-auth0.png)

Next, go to the setting tab of our new `Auth0` application and note down the `Domain` and `Client ID` that we will use later in this tutorial.

![auth0 domain](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/auth0-domain.png)

On the same application page, locate the `Application URLs` and fill the following fields as below:

```bash
Origins (CORS) = http://localhost:3000
Web Origins = http://localhost:3000
Callback URL = http://localhost:3000/login
```

Then we save the changes done.

Note that the link <http://localhost:3000> will be the URL of our Nuxt application. Also, one can change port `3000` if they are using a different port as per their preferences.

Next, we need our `Auth0` to connect to our API. First, we navigate to the APIs and click on `Create API` button. Then we input the required details: `Name` and an `Identifier` and click the `Create` button as shown below. We should note the `Identifier` since we will need it later.

![auth0 API](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/auth-api.png)

### Creating an ASP .NET Core backend API

In this section, we will create a new project using Visual Studio `ASP.NET Core API` project templates. We first launch our Visual Studio application, create a new project, select `ASP.NET Core Web Application`, and click on the `API` option.

The below `NuGet packages` have to be pre-installed in the Visual Studio:

```bash
Microsoft.AspNetCore.Authentication.OpenIdConnect
Microsoft.AspNetCore.Authentication.JwtBearer
```

Since we will have to verify access tokens using `Auth0`, our `ASP.NET API` must know the `Domain` and `Identifier` values we earlier got from `Auth0 API`. We are going to use [User Secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows) variables to ensure enhanced security in our application.

Browse to the ASP.NET Core project directory and execute the below commands in the terminal:

```bash
dotnet user-secrets init
dotnet user-secrets set "Config:Auth:Audience" "<The Auth0 API Unique Identifier>"
dotnet user-secrets set " Config:Auth:Authority" "<The Auth0 API Domain>"
```

Note that `Domain` and `Identifier` values should be substituted with the Domain and Identifier we earlier got from the API we created in `Auth0`.

Next, edit the `ConfigureServices` method inside the `Startup` Class as below:

```c#
public void ConfigureServices(IServiceCollection config_serv)
{
    config_serv.AddAuthentication(auth_opt =>
    {
        auth_opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        auth_opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    }).AddJwtBearer(jwt_opt =>
    {
        var config_auth0 = Configuration.GetSection("Config:Auth");

        jwt_opt.Audience = config_auth0["Audience"];
        jwt_opt.Authority = config_auth0["Authority"];
    });
}
```

In the above code snippet, we have configured `ASP.NET Core` to authenticate the requests with a JWT Bearer's help and validated them against `Auth0` using the values we previously stored in the `User Secrets` variables.

We also edit our `Configure` method as we configure the [middleware pipeline](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/) property as below:

```c#
public void Configure(IApplicationBuilder config_app, IWebHostEnvironment env)
{

    config_app.UseHttpsRedirection();

    config_app.UseCors(builder =>
    {
        builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });

    config_app.UseRouting();

    config_app.UseAuthentication();
    config_app.UseAuthorization();

    config_app.UseEndpoints(my_end_point =>
    {
        my_end_point.MapControllers();
    });
}
```

In the above code snippet, we have added a CORS policy that forwards the requests to the backend API from the Nuxt application running on the address <http://localhost:3000>. 

Next, we have invoked the function `config_app.UseAuthentication()` allows the application to use the configuration we earlier defined in the `ConfigureServices` method.

Finally, we'll protect one of the controllers in our application. In this case, since we used Visual Studio `ASP.NET Core Web template`, we already have a `WeatherForecastController` in place. To protect that controller, we will add the `[Authorize]` attribute on the top of that class: the `WeatherForecassController class`.

### Creating the Nuxt client application

In this section, we will create the `Nuxt` client application. Start by running the below command in the terminal:

```bash
yarn create nuxt-app <the-application-name>
```

The command will prompt for options to select, and we will leave them as they are to keep things simple.

Then, we install several dependencies and modules that our client `Nuxt` application requires. First, browse to the Nuxt project root folder and execute the below commands:

```bash
yarn add @nuxtjs/auth @nuxtjs/dotenv @nuxtjs/axios
```

The above command fetches the [Axios](https://www.npmjs.com/package/axios) package, which assists in making the requests to our backend API. The `Auth` module handles authentication on the Nuxt client application. The `Dotenv` module saves the secret `Auth0` values in environment variables stored inside a `.env` file.

Declare the environment variables and store them in a `.env` file in the Nuxt project directory as below:

```
CONFIG_AUTH_DOMAIN=My_Domain
CONFIG_AUTH_CLIENTID=My_ClientID
CONFIG_AUTH_AUDIENCE=My_Identifier
```

Note that the values `My_Domain`, `My_ClientID`, and `My_Identifier` will come from `Auth` application we earlier created in the `Auth0` account.

Edit the file `nuxt.config.js` as below for Nuxt application to make use of previously installed modules:

```js
modules: [
  '@nuxtjs/auth', '@nuxtjs/axios',
],
buildModules: [
  '@nuxtjs/dotenv'
]
```

Next, `Axios` needs to be set up in order to connect to our backend. Note that the `base URL` of the `ASP.NET Core Web` will be, by default, the <https://localhost:5001>. Also, note that it can be different depending on the developer’s project configuration.

```js
axios: {

  baseURL: 'https://localhost:5001'

},
```

Then, we will set up the Nuxt router so that if the application user is not authenticated by `Auth` middleware one cannot access secure pages in the application and instead will be redirected to the sign-in page. The below configuration ensures all the routes in our client application are protected:

```js
router: {

  middleware: ['auth'],

},
```

Finally, we will make the `Auth` middleware to fetch the `Auth0` values from environment variables stored in the `.env` file we earlier created and store them in a strategy with the name `auth0` as below:

```js
auth: {
  strategies: {
    auth0: {
      audience: process.env.CONFIG_AUTH_AUDIENCE,
      client_id: process.env.CONFIG_AUTH_CLIENTID,
      domain: process.env.CONFIG_AUTH_DOMAIN
          }
  }
}
```

We have successfully configured the file `nuxt.config.js`. Next, in the `store` folder, we will add an empty file, `index.js`. The reason being `Auth` middleware utilizes the Nuxt store to save authentication details. The file also assists in activating the store.

Finally, we will add more pages to our frontend application. First, we will add an `index.vue` page in the new directory named `pages` that fetches data from our backend API and renders it in our client-side application. The user has to be authenticated before accessing the page, and if not, the user will be redirected to the sign-in page.

As discussed earlier, we have also secured our backend, meaning any unauthorized users who may visit our frontend will not get any data since the backend will not allow it.

Note that this is an essential principle in web application development, whereby you protect the front end of the application and its backend.

We will start by creating the file `index.vue` as below:

```typescript
<script>
  export default {
    data() {
      return {
        res_display: []
      }
    },
    async mounted() {
      const res_display = await this.$axios.$get('weatherforecast')
      this.res_display = res_display
    }
  }
</script>
<template>
  <td>
    <h2>Index Page</h2>
    {{ res_display }}
  </td>
</template>
```

The sign-in page will display a sign-in button that loads the default sign-in with the `Auth0` page when clicked.

We will create the file `login.vue` inside the `pages` folder as below:

```typescript
<script>
export default {
  methods: {
    name: 'LoginButton',
    btn() {
      this.$auth.loginWith('auth0')
    }
  }
}
</script>
<template>
  <td>
    <h2>Sign-In Page</h2>
    <button @click="btn">Auth0 Sign-In</button>
  </td>
</template>
```

In the above code snippet, the login method will send the sign-in request according to the earlier set-up in the `Auth` module

We will then proceed to run both the API and the Nuxt client projects. To run our API, we browse to the API project root directory and execute the below commands:

```bash
dotnet build
dotnet run
```

To execute the Nuxt client project, browse to the Nuxt project root directory and run the below commands in the terminal:

```bash
yarn build
yarn start
```

Browse to the `base URL` of our Nuxt application: <http://locahost:3000>, and a login page will be displayed as below:

![login page](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/login-page.png)

Then, we will click the login button, which will redirect us to the `Auth0` sign-in page as below:

![auth0 login](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/auth-login.png)

Then we will sign in with any method we specified when setting up the `Auth0` account. Upon successful authentication, we will then be redirected to the index page of our client application. 

This makes it possible for the frontend to send a request for data from the backend and request a bearer token from `Auth0`. The API then verifies if the token is valid against `Auth0`, and on successful verification, it returns the weather forecast data as shown below:

![weather-forecast](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/weather-forecast.png)

### Wrapping up

As we have seen, it is possible to restrict access to a `Nuxt` frontend application and a backend API using a third-party yet secure authentication platform, `Auth0`. Developers should embrace the use of `Auth0` to authenticate their applications’ users. This will help them avoid the hassle and complexity of developing their authentication system.

In addition, third-party authentication platforms such as `Auth0` provide a secure, fastest and easy way of authenticating and managing the users in a given system.
The code used in this tutorial can be found at my [GitHub Repo](https://github.com/ogoti-lilian/my-projects/tree/main/aspnetcorewebapinuxtapp).

### Further reading

The following links can be used as the references by developers and learners to expound more on the topic:

- [Create web APIs with ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-5.0)
- [Getting Started with NuxtJS](https://nuxtjs.org/tutorials)
- [Learn Auth0](https://auth0.com/learn/)
- [Understanding Axios](https://masteringjs.io/axios)
- [Understanding Third-party Authentication](https://medium.com/@sellarafaeli/no-more-username-passwords-just-use-a-3rd-party-for-authentication-59b12db092a4)

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
