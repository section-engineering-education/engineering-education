---
url: /how-to-build-real-time-search-with-react-and-laravel/
title: How to Build Real-Time Search with React and Laravel
description: This article goes over the architecture of real-time search and gives a step-by-step explanation on its implementation using React and Laravel.
author: osinachi-chukwujama
date: 2021-01-27T00:00:00-09:00
topics: [React.js, Laravel, Redis]
---

### Introduction

Modern data-driven applications usually contain terabytes of searchable data that is used by thousands of users. Users expect these applications to respond to search queries in miliseconds and give consise results. To build such functionality into applications, developers use technologies such as AJAX (Asynchronous Javascript and XML), Single-Page Applications (SPAs) and a Cache like Redis.

In this tutorial, you will learn how to build a real-time movie search application using React and Laravel. You will also learn about query optimization and reduce the search query time of the app using Redis.

### Prerequisites

#### Frontend Requirements: Node.js

Node.js is required to run the SPA frontend of this movie search app.

![nodejs-logo.png](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/nodejs-logo.png)

First, check that your Node.js version is >= 12 by running the command below.

```bash
$ node -v
```

If you are running an older version of Node.js, install the latest LTS version from the [official website](http://nodejs.org/).

#### Backend Requirements: PHP, Composer and MySQL

Laravel is a PHP framework that uses Composer for dependency management. To get up and running on the backend side of things, ensure you have

1. PHP version 7.4 and greater
2. Composer version 2.1 and greater
3. MySQL version 5.7 and greater
   If your version do not meet these requirements, install the latest version of [PHP](https://www.php.net/manual/en/install.php) here and [Composer here](https://getcomposer.org/download/) and [MySQL here](https://www.mysql.com/downloads/). If you are on windows, consider installing [XAMPP](https://www.mysql.com/downloads/) which contains PHP and MYSQL.

#### Redis

![Redis Logo](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/redis.png)

Redis is an in-memory key-value store used for quick data retrival and as a cache. Redis is used by applications where data is to be retrieved in miliseconds and applications where round trip to the disk is a significant factor. In this Movie Search application, Redis will work as a cache to reduce query time for queries that have been performed.

Follow the [instructions here](https://redis.io/topics/quickstart#installing-redis) to install Redis on your machine. For windows users, follow [these instructions](https://redis.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/) instead.

### Frontend Setup

The frontend is hosted on [this github repo](https://github.com/vicradon/movie-search-frontend). It is a Typescript flavoured Next.js application. To set it up locally, clone the repo and install dependencies.

```
git clone https://github.com/vicradon/movie-search-frontend.git
cd movie-search-frontend
npm i
```

After installing dependencies, start the local server.

```
npm run dev
```

### Backend Setup

The backend code is hosted on [this github repo](https://github.com/vicradon/movie-search-backend). To set it up locally, follow these steps.

1. Clone the repo

```
git clone https://github.com/vicradon/movie-search-backend.git
```

2. Change directory into the repo

```
cd movie-search-backend
```

3. Install dependencies

```
composer install
```

4. Set up the application key

```
php artisan key:generate
```

5. Create a .env file

```
cp .env.example .env
```

6. Create the database in the MySQL shell

```
CREATE DATABASE sakila;
```

Check that the database configuration defined in the .env file corresponds to your local database settings.

7. Run the migrations.

```
php artisan migrate
```

The migrations creates a film table which contains fictional movies. The original source of the data is the sakila mysql sample database.

8. Start the application

```
php artisan serve
```

If the backend server runs without crashing, you should be able to successfully make requests on the frontend.

### Frontend Architecture

The frontend is a basic page component with an input box. Whenever a letter is typed in the box, an API call is made to the search endpoint.

![Frontend Architecture](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/frontend-architecture.png)

### Backend Architecture

The backend follows a simple flow of running search queries on the database whenever a request is sent from the frontend.

![Sending database responses for every request](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/no-cache-backend-flow.png)

### Testing the Application

With both the frontend and backend servers running, open the frontend URL in http://localhost:3000 and make a query for `dog` in the search box.

![Initial Search Results](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/initial-query-results.png)

It should take a few seconds to complete the search. If you decide to paste the `dog` query directly, the search should take an average of 3 seconds to complete.

![Pasted Search Results](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/pasted-query-results.png)

### Improving Query Time with Redis

The average query time of the movie search app is 3 seconds. Imagine typing 12 characters into the search box. It will take you close to a minute before you see results. You can limit requests made to the DB if queries typed in the input box are cached. As said earlier, Redis can serve as a cache in this application.

### Conclusion

Modern systems that rely on search have to produce results in miliseconds. Such optimization can be acheived using Single Page Applications, AJAX requests and a cache such as Redis. In this article, you learned how to build a real-time movie search application using React, Laravel and Redis. You also learned about the architecture of such system and recommendations if query time is to be further reduced.

### References and resources

1. [Caching with Redis](https://redis.com/blog/query-caching-redis/)
