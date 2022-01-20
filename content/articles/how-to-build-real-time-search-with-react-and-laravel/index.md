---
layout: engineering-education
status: publish
published: true
url: /how-to-build-real-time-search-with-react-and-laravel/
title: Implementing Realtime Search using React and Laravel 
description: This article will provide a step-by-step guide on how to implement realtime search using React and Laravel.
author: osinachi-chukwujama
date: 2021-11-03T00:00:00-12:06
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-build-real-time-search-with-react-and-laravel/hero.png
    alt: Realtime Search using React and Laravel
---
Modern data-driven applications usually contain terabytes of searchable data. Users expect search queries to produce concise results in milliseconds. 
<!--more-->
Developers build such functionality using technologies such as [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started), Single-Page Applications, and Caches.

In this tutorial, you will build a real-time movie search application using React and Laravel. 

You will also learn about query optimization and how to reduce an app's query search time using Redis.

### Prerequisites
To follow along, you should have some basic understanding of React and Laravel.

#### Frontend requirements: Node.js
Next.js powers the frontend of this application which in turn, runs on Node.js.

Ensure that you are running Node.js version 12 or higher. If you have a lower version, install the latest LTS version from the [official website](http://nodejs.org/).

#### Backend requirements: PHP, Composer and MySQL
Laravel, a PHP framework, powers the backend of the application. It uses [Composer](https://getcomposer.org/) for dependency management. To set up the backend, ensure that you have:

1. PHP version 7.4 and greater. Install the latest version [here](https://www.php.net/manual/en/install.php).
2. Composer version 2.1 and greater. Install the latest version [here](https://getcomposer.org/download/).
3. MySQL version 5.7 and greater. Install the latest version [here](https://www.mysql.com/downloads/).

If you are on windows, consider installing [XAMPP](https://www.mysql.com/downloads/). It contains PHP and MYSQL in one package.

#### Redis
Redis is an in-memory key-value store used for quick data retrieval and cache management. Applications with time-sensitive query requirements use Redis. 

This movie search application will use Redis as a cache to reduce query time for already performed operations.

Follow the [instructions here](https://redis.io/topics/quickstart#installing-redis) to install Redis on your machine. 

For windows users, use [these instructions](https://redis.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/) instead.

### Frontend setup
The frontend code can be found on [this Github repo](https://github.com/vicradon/movie-search-frontend). Follow the instructions below to clone the repo and install dependencies.

```bash
git clone https://github.com/vicradon/movie-search-frontend.git
cd movie-search-frontend
npm i
```

After installing dependencies, start the local server:

```bash
npm run dev
```

### Backend setup
The backend code is available on [this Github repo](https://github.com/vicradon/movie-search-backend). To set it up, follow these steps:

1. Clone the repo:

```bash
git clone https://github.com/vicradon/movie-search-backend.git
```

2. Change directory into the repo:

```bash
cd movie-search-backend
```

3. Install dependencies:

```bash
composer install
```

4. Set up the application key:

```bash
php artisan key:generate
```

5. Create a `.env` file:

```bash
cp .env.example .env
```

6. Create the database in the MySQL shell:

```bash
CREATE DATABASE movies_search_app;
```

Ensure that the database configuration in the `.env` file corresponds to your local database settings.

7. Run the migrations:

```bash
php artisan migrate --seed
```

The migrations create a `film` table that contains fictional movies. The original source of the data is the sakila MySQL sample database.

8. Start the application:

```bash
php artisan serve
```

If the backend server runs without crashing, you should be able to make requests on the frontend.

### Frontend architecture
The front-end is a basic page component with an input box. Whenever you type a letter in the search box, the app makes an API call to the search endpoint.

![Frontend Architecture](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/frontend-architecture.png)

### Frontend code walkthrough
The movie search page starts with an empty `movies state`, a query state for the typed text, and an input box component.

```ts
function Index() {
  const [query, setQuery] = useState("");

  return (
    <Input
      size="lg"
      placeholder="Search by title, e.g. Bird"
      mb="1rem"
      name="query"
      value={query}
      onChange={({ target }) => setQuery(target.value)}
      type="search"
      width={{ base: "90vw", md: "600px" }}
      bg="white"
    />
  );
}
```

To keep the codebase organized, a `searchByTitle` function is defined in the `api/movies.ts` file.

```ts
import http from ".";

export const searchByTitle = async ({ title, fetchCached }) => {
  const searchParams = new URLSearchParams({
    title,
    fetchCached: String(Number(fetchCached)),
  });

  const { data } = await http.get(`/movies?${searchParams}`);
  return data;
};
```

The function calls the `/movies` endpoint with the given `title` and an option to fetch cached items in the URL search parameters. 

The method uses the global `http` configuration defined in `api/index.ts`. The http object is an `axios instance` that contains the base `URL` and the timeout request.

```ts
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 90000,
});

export default http;
```

A `useEffect` hook is then added which fires a callback when the page mounts and when the query state changes.

```ts
import { searchByTitle } from "../api/movies";

function Index() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  ...

  useEffect(() => {
    if (query) {
      setLoading(true);
      setMovies([]);

      searchByTitle({ title: query, fetchCached })
        .then(({ data }) => {
          setLoading(false);
          setMovies(data.movies);
          setQueryTime(data.duration_in_milliseconds);
        })
        .catch((error) => {
          handleError(error);
          setLoading(false);
        });
    }
  }, [query]);

  return (
  ...
}
```

The server response contains a `movies array` and the `query duration` in milliseconds. Below is the base state of the server's response:

```json
{
  "movies": [],
  "duration_in_milliseconds": 0
}
```

### Backend architecture
The backend follows a simple flow of running search queries on the database. Whenever the frontend sends a request to the backend, it processes it and sends it to the database.

![Sending database responses for every request](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/no-cache-backend-flow.png)

### Backend code walkthrough
The two most important files in the backend are:

1. `app/Http/Controllers/MoviesController.php` contains the query logic.
2. `routes/api.php` contains the API routes.

The API endpoint for fetching movies calls the `index` method in the `movies` controller:

```php
Route::get('/movies', [MoviesController::class, 'index']);
```

The `index` method in the `MoviesController.php` validates the request data and resolves the request to either fetch data from the database or from the cache.

```php
class MoviesController extends Controller
{
    public function index(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required'],
            'fetchCached' => ['boolean'],
        ]);

        $fetchCached = $validatedData['fetchCached'];
        $title = $validatedData['title'];

        if ($fetchCached) {
            return $this->fetchFromCache($title);
        } else {
            return $this->fetchFromDB($title);
        }
    }
    ...
}
```

When you make a request without specifying the `fetchCached` query parameter or setting its value to "0", the `index` method resolves to the `fetchFromDB` method. 

This method uses the eloquent `Film` model to perform a query with the sql "LIKE" operator under the hood. 

It also records the start and end time of this query and returns it as a response object.

```php
    public function fetchFromDB($title)
    {
        $start_time = now();
        $movies = Film::where('title', 'like', "%{$title}%")->get();
        $finish_time = now();

        return response()->json([
            'data' => [
                'movies' => $movies,
                'duration_in_milliseconds' => $finish_time->diffInMilliseconds($start_time)
            ],
        ]);
    }

```

### Testing the application
With both the frontend and backend servers running, navigate to http://localhost:3000 in a browser. You should be presented with the following results:.

![Base Frontend View](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/base-frontend-view.png)

Make a query with `bird` as the input in the search box. It should return `9` results in an average time of `60` milliseconds.

![Initial Search Results](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/initial-query-results.png)

If you analyze the current situation, you'll notice that each character entered by the user invokes the `searchByTitle` function which makes the HTTP call. 

If it takes an average of `60ms` to make one HTTP request. This means that we will take roughly `240ms` for `four` HTTP requests. These requests correspond to the number of characters in the word `bird`.

### Improving query time with Redis
Redis helps to transform the backend architecture, as shown below:.

![Redis Architecture](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/redis-cache-backend-flow.png)

The `fetchFromCache` method in `MovieController.php` contains the code that interacts with Redis. 

First, the `start time` is saved to a variable, then the function attempts to retrieve movies that correspond to the search title from Redis. 

If cached data exists, the function records the request's `end time` and returns a serialized object of the cached movies alongside the duration in milliseconds. 

If there's no cached data for the corresponding request, the `fetchFromCache` function fetches movies directly from the database, records the finish time, and sets the search title and response as key-value pairs in Redis.

```php
    public function fetchFromCache($title)
    {
        $start_time = now();
        $cached_movies = Redis::get($title);

        if ($cached_movies) {
            $finish_time = now();

            return response()->json([
                'data' => [
                    'movies' => json_decode($cached_movies),
                    'duration_in_milliseconds' => $finish_time->diffInMilliseconds($start_time),
                ]
            ]);
        } else {
            $movies = Film::where('title', 'like', "%{$title}%")->get();
            $finish_time = now();
            Redis::set($title, $movies);

            return response()->json([
                'data' => [
                    'movies' => $movies,
                    'duration_in_milliseconds' => $finish_time->diffInMilliseconds($start_time)
                ],
            ]);
        }
    }
```

### Testing the application with Cache
To test the app, turn on the `fetch cached filter` in the `filters` dropdown.

![Enabling Redis cache filter on the frontend](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/enabling-cache-switch-filter-on-frontend.png)

Now, make a query with` bird` as input. You should still get a query time close to 60 seconds because the backend still fetches data from the database while caching the result.

![Initial Query with Cache Enabled](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/initial-query-with-cache-enabled.png)

If you repeat the `bird` query, you should see query time as low as 10 milliseconds. This is an 80% average decrease in the query time.

![Subsequent query with cached enabled](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/subsequent-query-with-cache-enabled.png)

### Conclusion
Modern systems with search functionality have to produce results in milliseconds. You can build such a system using a Single Page Application, AJAX requests, and a cache such as Redis. 

In this article, you learned about the components and architecture of a real-time search system. 

You also learned how to optimize queries using Redis. You can, therefore, use this knowledge to craft more quality web applications.

### Further learning
- [Hero image by Markus Winkler](https://unsplash.com/@markuswinkler)
- [Caching with Redis](https://redis.com/blog/query-caching-redis/)
- [Best practices for site search](https://www.algolia.com/blog/product/learn-about-site-search-best-practices/)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
