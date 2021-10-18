---
layout: engineering-education
status: publish
published: true
url: /handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/
title: Handling Web App authentication using Auth0, ASP.NET Core and Nuxt.js
description: This tutorial will use `Auth0` to authenticate the users into the system using `ASP.NET Core API` and `Nuxt.js`.
author: lilian-ogoti
date: 2021-08-21T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/hero.jpg
    alt: Handling Web App authentication using Auth0, ASP.NET Core and Nuxt.js hero image
---

### Introduction

Most applications have a mechanism to verify the users. Developers tend to devise their own methods of authenticating users into the system. It may seem like a simple approach, but integrating the authentication with third parties like [Google](https://www.google.com/) and [Facebook](https://www.facebook.com/) can be tedious and overly complex at times.

A good approach would be to implement a dedicated system that deals with authentication. A good example is [Auth0](https://auth0.com/) that allows the developers not to worry about the user data as it handles the authentication. It consists of a team of dedicated security experts specialized in handling the privacy of the user data.

This tutorial will use `Auth0` to authenticate the users into the system using `ASP.NET Core API` and `Nuxt.js`.

### Prerequisites

- Latest [Visual Studio](https://visualstudio.microsoft.com/vs/) installed
- A good understanding of [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0), [JavaScript](https://www.javascript.com/), [Vue.js](https://vuejs.org/v2/guide/) and [Nuxt.js](https://nuxtjs.org/docs/get-started/installation)
- A web browser installed, preferably [Google Chrome](https://www.google.com/intl/en_us/chrome/)
- [Npm](https://www.npmjs.com/package/npm) packages installed
- [Auth0](https://auth0.com/) account

### Understanding Auth0

`Auth0` is a user management system that is used to authenticate requests in a given application. It offers a lot of built-in features that a modern authentication requires. Some features include social media sign-in using `Facebook` or `Google`, [Single-Sign-On](https://www.onelogin.com/learn/how-single-sign-on-works) (SSO), and [Multi-Factor Authentication](https://www.onelogin.com/learn/what-is-mfa).

### How Auth0 authentication works

First, the user has to login from the client-side application by providing their correct username and password or social media platforms. Then the sign-in request is directed to `Auth0`, and when successfully authenticated, `Auth0` responds with an access token.

Then the client application requests a resource from the backend API, which it sends along with an access token. On receipt of the request, the backend API first verifies the token with `Auth0` to confirm that it is valid, and on successful verification, it responds with the requested resource.

### Setting up Auth0

We will start by creating the Auth0 account by visiting [this link](https://auth0.com/signup). Then we will access our `Auth0` account after signing in and navigate to the `Application` tab. We will then click on `Create Application` option and click on the `Single Page Web Application` option to create it as shown below:

![create auth0 app](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/create-app-auth0.PNG)

Next we will go to the setting tab of our new application and note down the `Domain` and `Client ID` that we will use later in this tutorial.

![auth0 domain](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/auth0-domain.PNG)

On the same application page, we will locate the `Application URLs` and fill the following fields as below:

```bash
Origins (CORS) = http://localhost:3000
Web Origins = http://localhost:3000
Callback URL = http://localhost:3000/login
```

Then we save the changes done.

Note that the link <http://localhost:3000> is the URL of our Nuxt application. Also, one can change port `3000` if they are using a different port as per their preferences.

Next, we need our `Auth0` to connect to our API. First, we will navigate to the APIs and click on `Create API`. Then we input the required details: `Name` and an `Identifier` and click `Create` as shown below. We should note the `Identifier` since we will need it later.

![auth0 API](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/auth-api.PNG)

### Creating an ASP .NET Core API

First, we will create a new project using Visual Studio `ASP.NET Core API` project templates. We launch our Visual Studio, create a new project, select `ASP.NET Core Web Application`, and click on `API`.

The following NuGet packages need to be installed in the Visual Studio:

```bash
Microsoft.AspNetCore.Authentication.OpenIdConnect
Microsoft.AspNetCore.Authentication.JwtBearer
```

Since we will have to verify access tokens using `Auth0`, our `ASP.NET API` must know the `Domain` and `Identifier` values we earlier got from `Auth0 API`. We are going to use [User Secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-5.0&tabs=windows) variables to add more security to our application.

We will browse to the ASP.NET Core project directory and execute the below commands in the terminal:

```bash
dotnet user-secrets init
$ dotnet user-secrets set "Config:Auth:Audience" "<The Auth0 API Unique Identifier>"
$ dotnet user-secrets set " Config:Auth:Authority" "<The Auth0 API Domain>"
```

Note that `Domain` and `Identifier` values should be substituted with the Domain and Identifier we earlier got from the API we created in `Auth0`.

Next, we will modify the `ConfigureServices` method inside the `Startup` Class by adding the following lines of code:

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

In the above code snippet, we have configured `ASP.NET Core` to authenticate the requests with a JWT Bearer's help and verify them against `Auth0` using the values we previously stored in the `User Secrets`.

We also have to modify our `Configure` method as we configure the [middleware pipeline](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/middleware/) property. We will modify the method as below:

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

In the above code snippet, we add a CORS policy that forwards the requests to the API from the Nuxt application, which is served on <http://localhost:3000>. Next, we have called the function `config_app.UseAuthentication()` allows the application to use the configuration we earlier added in the `ConfigureServices` method.

In addition, we have to decide the controllers or actions to protect. In our case, since we used Visual Studio `ASP.NET Core Web template`, we already have a `WeatherForecastController` in place. To protect that controller, we will add the `[Authorize]` attribute on the top of that class: the `WeatherForecassController class`.

### Creating the Nuxt client

In this section, we will create the `Nuxt` client application. We will start by running the below command in the terminal:

```bash
yarn create nuxt-app <the-application-name>
```

Next, we will select the default options.

Then, we will install several dependencies and modules that our client `Nuxt` application requires. First, we will browse to the Nuxt project root directory and execute the below command:

```bash
yarn add @nuxtjs/auth @nuxtjs/dotenv @nuxtjs/axios
```

The above command will install [Axios](https://www.npmjs.com/package/axios), which assists in making the requests to our backend API. The `Auth` module handles authentication on the Nuxt client application. The `Dotenv` module saves the secret `Auth0` values in environmental variables stored inside a `.env` file.

Then, we will declare the environmental variables and store them in a `.env` file in the Nuxt project directory as below:

```
CONFIG_AUTH_DOMAIN=My_Domain
CONFIG_AUTH_CLIENTID=My_ClientID
CONFIG_AUTH_AUDIENCE=My_Identifier
```

We note that the values `My_Domain`, `My_ClientID`, and `My_Identifier` will come from `Auth` application we earlier created in the `Auth0` account.

Next, we will edit the `nuxt.config.js` file as we configure `Nuxt`. First, we will configure `Nuxt` to use the modules we previously installed by adding the below lines:

```js
modules: [
  '@nuxtjs/auth',
  '@nuxtjs/axios',
],
buildModules: [
  '@nuxtjs/dotenv'
],
```

Then, we will configure `Axios` to connect with our API. Note that the `base URL` of the `ASP.NET Core Web` will be, by default, the <https://localhost:5001>. Also, note that it may be different depending on your project configuration.

```js
axios: {
  baseURL: 'https://localhost:5001'
},
```

Next, we need to configure the router to utilize the `Auth` module to act as our middleware. It implies that the user must be authenticated by `Auth` middleware to access our secure pages in the application. If not, the user is redirected to the login page. The below configuration ensures all the routes in our client application are protected:

```js
router: {
  middleware: ['auth'],
},
```

Finally, we will make the `Auth` middleware to fetch the `Auth0` values from environmental variables stored in the `.env` file we earlier created and store them in a strategy with the name `auth0` as below:

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

Our configuration for the `nuxt.config.js` file is now complete. In the final part of the configuration, we will create an empty `index.js` file in the `store` directory. The reason is that `Auth` middleware utilizes the `Nuxt` store to save authentication details. Also, it is essential to note that the store file has to be there in Nuxt, even if empty for activating the store.

Finally, we will create some more pages. First, we will build an `index.vue` page in the new directory named `pages` that fetches data from our backend API and renders it in our client application. The user has to be authenticated before accessing the page, and if not, the user will be redirected to the sign-in page.

As discussed earlier in this guide, the API is also secured, meaning unauthenticated users who may access the index page will not get any data since the API will not allow it.

Note that this is an essential principle in web application development, whereby you protect the front end of the application and its backend.

The below code is for the `index.vue` file:

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

The sign-in page will display a sign-in button that when clicked the user is redirected to the `Auth0` sign in page. The `loginWith(‘auth0’)` method will send the sign in request according to the initial configuration in the `Auth` module. The code for `login.vue` file inside the `pages` directory is as below:

```typescript
<template>
  <td>
    <h2>Sign-In Page</h2>
    <button @click="btn">Auth0 Sign-In</button>
  </td>
</template>

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
```

We will run both the API and the Nuxt client projects. To run our API, browse to the API project root directory and execute the below commands:

```bash
dotnet build
dotnet run
```

To execute the Nuxt client project, we will browse to the Nuxt project root directory and run the below commands in the terminal:

```bash
yarn build
yarn start
```

Then we will browse to the `base URL` of our Nuxt application: <http://locahost:3000>, and we will be redirected to the login page as below:

![login page](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/login-page.PNG)

Then, we will click the login button, which will redirect us to the `Auth0` sign-in page as below:

![auth0 login](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/auth-login.PNG)

Then we will sign in with the method we specified in `Auth0`, and on successful authentication, we will be redirected to the index page of our client application. Since we have been authenticated, our `Nuxt` client application can request the weather forecast from the backend API, which will respond to the request for the Auth0 Bearer token. The API then verifies if the token is valid against `Auth0`, and on successful verification, it returns the weather forecast object as shown below:

![weather-forecast](/engineering-education/handling-web-app-authentication-using-auth0-aspnet-core-and-nuxtjs/weather-forecast.PNG)

### Wrapping up

In the above tutorial, we have seen it is possible to restrict access to a `Nuxt` client application and a backend `ASP.NET Core API` using a third-party yet secure authentication platform, `Auth0`. Developers should embrace the use of `Auth0` to authenticate their applications’ users. This will help them avoid the hassle and complexity of developing their authentication system.

In addition, `Auth0` is a secure, easy-to-use, and fastest way of authentication and managing the users in a given system.
The code used in this tutorial can be found at my [GitHub Repo](https://github.com/ogoti-lilian/my-projects/tree/main/aspnetcorewebapinuxtapp).

---

Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
