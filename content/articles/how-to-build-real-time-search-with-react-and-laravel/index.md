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
CREATE DATABASE movies_search_app;
```

Ensure that the database configuration in the .env file corresponds to your local database settings.

7. Run the migrations.

```
php artisan migrate --seed
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

### Frontend Code Walkthrough

The movie search page starts with an empty movies state, a query state for typed text and the input box component that feeds the query state.

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

To keep the codebase organized, a `searchByTitle` function is defined in `api/movies.ts`.

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

The function calls the `/movies` end point with the given title and an option to fetch cached items as URL search parameters. It uses the global http configuration defined in `api/index.ts`. The http object is an axios instance that contains the base URL and the request timeout.

```ts
import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 90000,
});

export default http;
```

A `useEffect` hook is then added which fires a callback when the page mounts and when the query state is updated by the input box.

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

The server response contains a movies array and the query duration in milliseconds. Below is the base state of the server response.

```json
{
  "movies": [],
  "duration_in_milliseconds": 0
}
```

### Backend Architecture

The backend follows a simple flow of running search queries on the database. Whenever the frontend sends a request to the backend, it processes it and sends it to the database.

![Sending database responses for every request](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/no-cache-backend-flow.png)

### Backend Code Walkthrough

The two most important files in the backend are

1. app/Http/Controllers/MoviesController.php that contains the querying logic, and
2. routes/api.php that contains the API routes

The API endpoint for fetching movies calls the index method in the movies controller

```php
Route::get('/movies', [MoviesController::class, 'index']);
```

The index method in MoviesController.php validates the request data and resolves the request to either fetch from the database or from the cache.

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

When you make a request without specifying the `fetchCached` query parameter or setting its value to "0", the `index` method resolves to the `fetchFromDB` method. This method uses the eloquent `Film` model to perform a query with the sql "LIKE" operator under the hood. It also records the start and end time of this query and returns the milliseconds differnce in the response object.

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

### Testing the Application

With both the frontend and backend servers running, open the frontend http://localhost:3000 in a browser. You should be presented with the view below.

![Base Frontend View](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/base-frontend-view.png)

Make a query with `bird` as input in the search box. It should returns 9 results in an average time of 60 milliseconds.

![Initial Search Results](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/initial-query-results.png)

If you analyze the current situation, you'll notice that each character inputed fires the `searchByTitle` function which makes the HTTP call. If it takes an average of 60 ms to make one HTTP request, it means will take roughly 240 ms for four HTTP requests. These requests correspond to the number of characters in the word `bird`.

### Improving Query Time with Redis

If you introduce Redis to the backend, the backend architecture transforms to the representation below.

![Redis Architecture](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/redis-cache-backend-flow.png)

The `fetchFromCache` method in `MovieController.php` contains the code that interacts with Redis. First, the start time is saved to a variable and the function attempts to get the movies which correspond to the search title from Redis. If cached data exits, the function records the request end time and returns a serialized object of the cached movies alongside the duration in milliseconds. If there's no cached data for the corresponding request, the `fetchFromCache` function fetches the movies directly from the database, records the finish time and sets the search title and response as key value pairs in Redis.

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

### Testing the Application with Cache Enabled

To test the app with cached enabled, turn on the fetch cached filter in the filters dropdown.

![Enabling redis cache filter on the frontend](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/enabling-cache-switch-filter-on-frontend.png)

Now, make a query with bird as input. You should still get a query time close to 60 seconds, because the backend still fetches data from the database while caching the result.

![Initial Query with Cache Enabled](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/initial-query-with-cache-enabled.png)

If you repeat the bird query, you should get query time as low as 10 milliseconds. This is an 80% average decrease in the query time.

![Subsequent query with cached enabled](/engineering-education/how-to-build-real-time-search-with-react-and-laravel/subsequent-query-with-cache-enabled.png)

### Recommendations in Building Real-time Systems

1. Create a user-friendly search bar
2. Add search filters for narrowing relevant results
3. Use a Cache to reduce query time

### Conclusion

Modern systems that rely on search have to produce results in milliseconds. You can build such a system using a Single Page Application, AJAX requests and a cache such as Redis. In this article, you learned about the components and architecture of a real-time search system. You learned how to optimize the queries using Redis. Finally, you learned some recommendations when building such systems.

### References and Attributions

1. [Hero image by Markus Winkler](https://unsplash.com/@markuswinkler)
2. [Caching with Redis](https://redis.com/blog/query-caching-redis/)
3. [Best practices for site search](https://www.algolia.com/blog/product/learn-about-site-search-best-practices/)
