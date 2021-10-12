### Introduction

![Hero Image](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/hero-image.png)

Modern data-driven applications usually contain terabytes of searchable data. Users expect search queries to produce results in milliseconds and give concise results. Developers build such functionality using technologies such as [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started), Single-Page Applications and Caches.

In this tutorial, you will build a real-time movie search application using React and Laravel. You will also learn about query optimization and how to reduce the search query time of the app using Redis.

### Prerequisites

#### Frontend Requirements: Node.js

Next.js powers the frontend of this application which in turn, runs on Node.js.

![nodejs-logo.png](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/nodejs-logo.png)

Ensure you are running Node.js version 12 or higher. If you have a lower version, install the latest LTS version from the [official website](http://nodejs.org/).

#### Backend Requirements: PHP, Composer and MySQL

Laravel, a PHP framework, powers the backend of the application. It uses Composer for dependency management. To set up the backend, ensure you have

1. PHP version 7.4 and greater. Install the latest version [here](https://www.php.net/manual/en/install.php)
2. Composer version 2.1 and greater. Install the latest version [here](https://getcomposer.org/download/)
3. MySQL version 5.7 and greater. Install the latest version [here](https://www.mysql.com/downloads/)

If you are on windows, consider installing [XAMPP](https://www.mysql.com/downloads/). It contains PHP and MYSQL in one package.

#### Redis

![Redis Logo](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/redis.png)

Redis is an in-memory key-value store used for quick data retrieval and as a cache. Applications with time-sensitive query requirements use Redis. This Movie Search application will use Redis as a cache to reduce query time for already performed queries.

Follow the [instructions here](https://redis.io/topics/quickstart#installing-redis) to install Redis on your machine. For windows users, follow [these instructions](https://redis.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/) instead.

### Frontend Setup

The frontend code lives on [this Github repo](https://github.com/vicradon/movie-search-frontend). Follow the instructions below to clone the repo and install dependencies.

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

The backend code lives on [this Github repo](https://github.com/vicradon/movie-search-backend). To set it up, follow these steps.

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

Ensure that the database configuration in the .env file corresponds to your local database settings.

7. Run the migrations.

```
php artisan migrate
```

The migrations create a film table that contains fictional movies. The original source of the data is the sakila MySQL sample database.

8. Start the application

```
php artisan serve
```

If the backend server runs without crashing, you should be able to make requests on the frontend.

### Frontend Architecture

The frontend is a basic page component with an input box. Whenever you type a letter in the search box, the app makes an API call to the search endpoint.

![Frontend Architecture](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/frontend-architecture.png)

### Backend Architecture

The backend follows a simple flow of running search queries on the database. Whenever the frontend sends a request to the backend, it processes it and sends it to the database.

![Sending database responses for every request](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/no-cache-backend-flow.png)

### Testing the Application

With both the frontend and backend servers running, open the frontend http://localhost:3000 in a browser. Then, make a query for `dog` in the search box.

![Initial Search Results](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/initial-query-results.png)

It should take a few seconds to complete the search. If you decide to paste the `dog` query, the search should take an average of 3 seconds to complete.

![Pasted Search Results](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/pasted-query-results.png)

### Improving Query Time with Redis

The average query time of the movie search app is 3 seconds. Imagine typing 12 characters into the search box. It will take you close to a minute before you see results. You can limit requests made to the DB if you cache the queries in Redis. As said earlier, Redis will serve as a cache in this application.

![Redis Architecture](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/redis-cache-backend-flow.png)

### Conclusion

Modern systems that rely on search have to produce results in milliseconds. You can build such a system using a Single Page Application, AJAX requests and a cache such as Redis. In this article, you learned about the components of a real-time search system. You also learned about the architecture of the system. Finally, you learned how to optimize the queries using Redis.

### References and Attributions

1. [Hero image by Markus Winkler](https://unsplash.com/@markuswinkler)
2. [Caching with Redis](https://redis.com/blog/query-caching-redis/)
