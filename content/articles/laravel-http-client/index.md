---
layout: engineering-education
status: publish
published: true
url: /laravel-http-client/
title: Laravel 8 HTTP Client Introduction
description: The tutorial will show you how to make requests using HTTP client in Laravel. This library will improve productivity by eliminating boilerplate code.
author: miller-juma
date: 2021-02-01T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/laravel-http-client/hero.jpg
    alt: laravel language localisation
---
Laravel has evolved significantly since the release of version 7.x.x. One of the key areas of improvement revolves around the Guzzle HTTP Client. This article will serve as an introduction to Laravel 8 HTTP Client.
<!--more-->
### Requirements
- PHP 7.4.x
- Laravel 8.x
- Postman

### A quick introduction to the Guzzle API
Imagine you are building a web application, and you want it to communicate with other online services. For instance, you may want to fetch movies from the [Movie Database](https://www.themoviedb.org/), and display them in your application. How do you achieve this in PHP?  

Well, as you might have already guessed, Guzzle HTTP Client is the simple solution to the above problem. Guzzle HTTP client allows your application to make HTTP requests. 

With this in mind, in order to get movies from the `Movie Database` API we would do the following:

```php
<?php
$client= new GuzzleHttp\Client();
$res=
$client->request('GET','https://api.themoviedb.org/3/movie/550?api_key={api_key}&callback=test');
echo $res->getBody();
?>
```

Note:
- To test the above code, you need to install Guzzle HTTP Client.
- You should replace the `api_key` value with your key from [themoviedb.org](https://developers.themoviedb.org/3/getting-started).
- You can also modify the link to return different data.  

>Guzzle HTTP Client was used as the primary way of making HTTP requests in earlier Laravel versions.  

### HTTP Client
Now that we've got a little knowledge on how the Guzzle HTTP client works, let's focus on the new  `HTTP Client`. Why would Laravel creators migrate from that simple implementation to the new `HTTP Client`? Is there a difference?  

The objective of a framework is to make a programmer's life easier while reducing the development period. As a rule of thumb, you should minimize code to make it more efficient and eliminate unnecessary statements.  

That's exactly what the `HTTP Client` is doing, it's simply an improvement of the ` Guzzle HTTP Client`. HTTP Client facilitates outgoing HTTP requests without the need for 'unnecessary code', like in the past.  

### Guzzle package installation
Throughout this tutorial, we will use PHP 7.4.x and Laravel 8.x.x. Therefore, make sure that they are installed in order to follow along.  

To get started with HTTP Client, we will need to have the Guzzle package installed in our project. By default, Laravel ships with this package. 

In case you have accidentally deleted it, install it via:

```bash
composer require guzzlehttp/guzzle
```

### Making HTTP requests
Since Laravel 7.x, `HTTP Client` is included as a built-in feature. With working examples, I want to show you the new way of making HTTP requests.  

If you have used [Postman](https://learning.postman.com/) before, you may have encountered some HTTP methods for RESTful (Representational state transfer) services. 

For newbies, don't worry, RESTful APIs simply uses HTTP requests to access and use data. You can learn more [here](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/).  

The HTTP client in Laravel uses the same concept we have discussed above. 

To make requests we need a few methods listed below:
- POST
- GET
- PUT
- PATCH
- DELETE

As noted, the HTTP client ships with the Laravel framework since version 7. This means that it's built-in, hence no need for any installation. The only concept in Laravel that you should know by now is the use of Laravel Facades. This is a class that provides an interface to access objects directly from the container.  

As a quick reminder, Laravel facades are defined in the namespace. 

```
Illuminate\Support\Facades 
```

Let's look at an example:

```php
use Illuminate\Support\Facades\Cache;

Route::get('/cache', function () {
    return Cache::get('key');
});
```

From the example above, we have demonstrated one use case of Laravel facade, `Cache`, which has a method called `get`, that is used to retrieve items from the cache.  

In case you're not familiar with facades, the [Laravel facades](https://laravel.com/docs/8.x/facades) documentation could be of great help, feel free to learn more before you continue with this tutorial.  

Now that we have learned how to use Laravel facades, it's time to have a look at how to make requests using HTTP Client. Remember the example at the beginning of the tutorial, of getting movies using Guzzle HTTP client? Check it out if you have forgotten how we made a simple `GET ` request.  

In this example, let's see how to make a simple GET request to get movies from the [moviedb](https://www.themoviedb.org/).  

``` php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class MoviesController extends Controller
{
    /**
     * Show a list of all movies.
     *
     * @return Response
     */
    public function index()
    {
       $response = 
            Http::get('https://api.themoviedb.org/3/movie/550?api_key=APIKEY');
       return response()->json($response);
    }
}
```

>Note:-themoviedb.org gives each developer an API key to use their services. You're therefore advised to create one with them via [themoviedb.org](https://developers.themoviedb.org/3). 

Feel free to modify the link above to any other link.

To test this code on Postman, start your server by navigating into your project root, as shown below.

```bash 
cd /var/www/html/TestHttp
```

Run `php artisan serve` to start your application, copy this link and paste onto Postman, ensure the HTTP method is `GET` then press the send button to fetch data.  

Congratulations, you have made your first HTTP request using Laravel built-in feature, HTTP Client.  

### HTTP response
If you ran the above example correctly, you will receive a response such as the one below:  

```json
{
    "adult": false,
    "backdrop_path": "/52AfXWuXCHn3UjD17rBruA9f5qb.jpg",
    "belongs_to_collection": null,
    "budget": 63000000,
    "genres": [
        {
            "id": 18,
            "name": "Drama"
        }
    ],
    "homepage": "http://www.foxmovies.com/movies/fight-club",
    "id": 550,
    "imdb_id": "tt0137523",
    "original_language": "en",
    "original_title": "Fight Club",
    "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "popularity": 45.184,
    "poster_path": "/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
    "production_companies": [
        {
            "id": 508,
            "logo_path": "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
            "name": "Regency Enterprises",
            "origin_country": "US"
        },
        {
            "id": 711,
            "logo_path": "/tEiIH5QesdheJmDAqQwvtN60727.png",
            "name": "Fox 2000 Pictures",
            "origin_country": "US"
        },
        {
            "id": 20555,
            "logo_path": "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
            "name": "Taurus Film",
            "origin_country": "DE"
        },
        {
            "id": 54051,
            "logo_path": null,
            "name": "Atman Entertainment",
            "origin_country": ""
        },
        {
            "id": 54052,
            "logo_path": null,
            "name": "Knickerbocker Films",
            "origin_country": "US"
        },
        {
            "id": 25,
            "logo_path": "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
            "name": "20th Century Fox",
            "origin_country": "US"
        },
        {
            "id": 4700,
            "logo_path": "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
            "name": "The Linson Company",
            "origin_country": ""
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "DE",
            "name": "Germany"
        },
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "1999-10-15",
    "revenue": 100853753,
    "runtime": 139,
    "spoken_languages": [
        {
            "english_name": "English",
            "iso_639_1": "en",
            "name": "English"
        }
    ],
    "status": "Released",
    "tagline": "Mischief. Mayhem. Soap.",
    "title": "Fight Club",
    "video": false,
    "vote_average": 8.4,
    "vote_count": 20780
}
```

The HTTP client's `Get` method returns an instance of the `Illuminate\Http\Client\Response`. This response has several methods that could be used to get more information about the response. 

For instance, the above example could be rewritten to return `Illuminate\Http\Client\Response`. This response has a method such as `status()` that can be used to get the status of the HTTP response. 

Take a look at the following example:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class MoviesController extends Controller
{
    /**
     * Show a list of all movies.
     *
     * @return Response
     */
    public function index()
    {
       $response = 
            Http::get('https://api.themoviedb.org/3/movie/550?api_key=APIKEY');
       return $response;
    }
}
?>
```

To get a status from the above response, you would simply do the following:

```php
$response->status() : int;
```

Other methods for inspecting your response include:

```php
$response->body() : string;
$response->json() : array|mixed;
$response->ok() : bool;
$response->successful() : bool;
$response->failed() : bool;
$response->serverError() : bool;
$response->clientError() : bool;
$response->header($header) : string;
$response->headers() : array;
```

### Making HTTP Post request
This method is used to send additional data together with the request. Let's say, for example, you have an application that requires users to register via [APIs](https://www.restapitutorial.com/). How do you achieve this functionality in Laravel?  

Let's have a look at an example of a simple Laravel auth application:  

```php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class HttpAuthController exends Controller
{
    public function create(Request $request)
    {
        $response = 
        Http::post('http://example.com/users', [
                'name' => 'Miller Juma',
                'role' => 'Laravel Contributor',
        ]);
        return $response;
    }
}

```

The above HTTP post method accepts an array of data as the second argument which is sent in `JSON` format. The Post method above accepts `username` and `role`, this array is then sent to the indicated web application URL to register the user.  

### Making HTTP PUT request
This method is used to send additional data together with the request to modify the targeted resource.      

```php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class HttpAuthController exends Controller
{
    public function create(Request $request)
    {
        $response = 
        Http::put('http://example.com/users', [
                'name' => 'Wendy Brilliant',
        ]);
        return $response;
    }
}

```

The HTTP put method accepts an array of data as the second argument which is sent in a JSON format to modify the resource.    

### Making HTTP delete request
This method is used to send additional data together with the request to delete the targeted resource.      

```php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;


class HttpAuthController exends Controller
{
    public function create(Request $request)
    {
        $response = 
        Http::delete('http://example.com/users', [
                'user_id' => '1',
        ]);
        return $response;
    }
}
```

The HTTP delete method accepts an array of data as the second argument that is sent in a JSON format to modify the resource.  
In this case, the resource deleted is `user_id=1`.  

### Conclusion
In this tutorial, we have learned how to use the new Laravel HTTP Client. We have seen how to make `GET`, `POST`, `PUT` and `DELETE` requests. To gain more insights on other features of HTTP requests,  follow [this link](https://laravel.com/docs/8.x/http-client) as it will be of great help.  

Happy Coding!

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)
