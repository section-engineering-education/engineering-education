---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-php7-without-using-a-framework/
title: Getting Started with PHP 7+ without using a Framework
description: This tutorial will guide readers on how to build a Blog API project with basic routing using third-party packages, as well as testing the application without utilizing any framework.
author: lewel-murithi
date: 2021-09-13T00:00:00-10:00
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-php7-without-using-a-framework/hero.jpg
    alt: Understanding PHP 7+
---
Many developers use frameworks to develop and manage their PHP projects. However, the introduction of packages such as composer and new PHP standards allows developers to write and maintain their PHP code easier.
<!--more-->
The main objective for this article is to develop a small Blog API with a unique `id`, `title`, and `body`. The users of this Blog API will list, create, and view a new blog post. 

We will use a JSON file to act as a database, and therefore all requests and responses will be in a JSON format.

### Table of contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setting up composer](#setting-up-composer)
- [Adding first class](#adding-first-class)
- [Adding logging](#adding-logging)
- [Adding routing](#adding-routing)
- [Implementing the Blog API](#implementing-the-blog-api)
- [Adding testing](#adding-testing)
- [Wrapping up](#wrapping-up)

### Prerequisites
To follow along, you need:
- The latest version of [PHP](https://www.php.net/downloads.php) installed.
- [PHP Composer](https://getcomposer.org/doc/00-intro.md) installed.
- Practical knowledge of [PHP classes](https://www.php.net/manual/en/language.oop5.php), [composer](https://getcomposer.org/doc/00-intro.md), and [MVC](https://www.javatpoint.com/php-mvc-architecture) pattern.

### Setting up composer
First, we will create the `composer.json` file. It is essential, when adding third-party packages and managing projects to use the [autoload](https://getcomposer.org/doc/04-schema.md) feature. 

We will create our project root directory, then run the command below in the terminal and fill in the required information or leave them as default:

```bash
$ composer init
```

The command above will create a `composer.json` file in the root directory. Then we will create another folder named `Application` and include two other files called `index.php` and `app_config.php`. 

Our project folder structure will appear as below:

![folder structure](/engineering-education/getting-started-with-php7-without-using-a-framework/folder-structure.PNG)

Next, we will add our first package by executing the following command in the terminal:

```bash
$ composer require monolog/monolog:1.25.1
```

The command above creates a `vendor` folder with the `monolog` package and a file named `autoload.php`. 

The `autoload.php` file contains all the paths to the classes that we will add from third parties and our classes, a `monolog` package assists in generating log files.

Next, we will edit the `index.php` file with the following code:

```php
<?php
require __DIR__ . '/vendor/autoload.php';
```

Then, we will modify our `composer.json` file, as shown below:

```json
"description": "Sample PHP Blog API",
"type": "project",
"autoload": {
  "psr-4": {
    "Application\\": "Application/"
   }
},
```

We will execute the command below to update the `autoload` entry.

```bash
$ composer dump-autoload
```

The `autoload` entry registers all our classes. The [psr-4](https://www.php-fig.org/psr/psr-4/) offers more flexible autoloading standard specifications compared to [psr-0](https://www.php-fig.org/psr/psr-0/). 

If we add classes to our application, we do not have to regenerate the autoloader.

As of now, our application can work with `composer`. 

To verify this, we can execute the command below in the terminal:

```bash
$ php index.php
```

If the command above returns no error, everything is working as expected.

### Adding the first class
We will deal with `config` files required across our project. Note that we will have two `config` files in our project.

We will start with the `app_config.php` file located at the root directory. We will put the `API Key`, `Cache setting`, and other `settings` for our application in this file. 

The other `config` file will be placed at `Application/Controller/App_config.php` to read the variables.

We will edit the `app_config.php` file located at the project root directory as follows:

```php
<?php
return [
 'LOG_PATH' => __DIR__ . './log-files',
];
```

Next, we will create a new `App_config.php` file inside the directory `Application/Controller/` and paste the following code into it:

```php
<?php namespace Application\Controller;

class App_config
{
    private static $app_config;

    public static function get($key, $default = null)
    {
        if (is_null(self::$app_config)) {
            self::$app_config = require_once(__DIR__.'/../../app_config.php');
        }

        return !empty(self::$app_config[$key])?self::$app_config[$key]:$default;
    }
}
```

The above code snippet iterates through the array from `app_config.php` in the root project directory and verifies a key in the array. 

If the key already exists, it returns a value. Otherwise, it returns the default value specified.

Next, we will edit the `index.php` file, as demonstrated below:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

// New lines to be added
use Application\Controller\App_config;
$LOG_PATH = App_config::get('LOG_PATH', '');
echo "[LOG_PATH]: $LOG_PATH";
```

We will then execute the command below:

```bash
$ php index.php
```

The above command displays the logs' path that is specified on `app_config.php`.

We will add more classes into the `Application` folder, and because of the autoloading feature, they will be accessible anywhere in the application.

### Adding logging
Logging is essential in any application module since it ensures that everything is working as expected. 

Packages such as `monolog` simplify logging. They also send the logs to email, slack, telegram, and any other specified platforms.  

In our application, we will have three log files, `errors.log`, `request.log`, and `app.log`. 

The `errors.log` and `request.log` files will remain active, and the `app.log` file will be used to display the desired information. 

The `errors.log` file will contain any errors that may occur in the application. The `request.log` file logs any HTTP requests made to the application.

We will create the `Logger.php` file in the folder `Application/Controller` and paste the code below:

This will act as our wrapper to manage our different logs.

```php
<?php namespace Application\Controller;

use Monolog\ErrorHandler;
use Monolog\Handler\StreamHandler;

class Logger extends \Monolog\Logger
{
    private static $log_sys = [];

    public function __construct($key = "app", $app_config = null)
    {
        parent::__construct($key);

        if (empty($app_config)) {
            $LOG_PATH = App_config::get('LOG_PATH', __DIR__ . '/../../log-files');
            $app_config = [
                'logFile' => "{$LOG_PATH}/{$key}.log",
                'logLevel' => \Monolog\Logger::DEBUG
            ];
        }

        $this->pushHandler(new StreamHandler($app_config['logFile'], $app_config['logLevel']));
    }

    public static function getInstance($key = "app", $app_config = null)
    {
        if (empty(self:: $log_sys[$key])) {
            self:: $log_sys[$key] = new Logger($key, $app_config);
        }

        return self:: $log_sys[$key];
    }

    public static function enableSystemLogs()
    {

        $LOG_PATH = App_config::get('LOG_PATH', __DIR__ . '/../../log-files');
        // Error Log
        self::$log_sys['error'] = new Logger('errors');
        self:: $log_sys['error']->pushHandler(new StreamHandler("{$LOG_PATH}/errors.log"));
        ErrorHandler::register(self::$log_sys['error']);

        // Request Log
        $data = [
            $_SERVER,
            $_REQUEST,
            trim(file_get_contents("php://input"))
        ];
        self::$log_sys['request'] = new Logger('request');
        self::$log_sys['request']->pushHandler(new StreamHandler("{$LOG_PATH}/request.log"));
        self::$log_sys['request']->info("REQUEST", $data);
    }
}
```

In the above code, we have created two main functions; the `Logger::enableSystemLogs()`, which enables our error and request logs, then the `Logger::getInstance()`, which will be our App log.

We can try it out by adding the following lines of code to our `index.php` file:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Application\Controller\App_config;
$LOG_PATH = App_config::get('LOG_PATH', '');
echo "[LOG_PATH]: $LOG_PATH";

//New Lines
use Application\Controller\Logger;

Logger::enableSystemLogs();
$log_msg = Logger::getInstance();
$log_msg->info('Hello World');
```

We will then run a built-in PHP web server using the following command:

```bash
$ php -S localhost:8000
```

When you navigate to `<http://locahost:8000>`, you will see the `LOG_PATH`. You will also notice that we have two files in the `log-files` folder. 

One file will be showing the `requested content`, whereas the other will contain `Hello World` text. 

Developers can change the request to suit their needs and show or remove specific information.

We can then bootstrap our application by creating a new file named `App.php` in the location `Application/Controller`, as demonstrated below:

```php
<?php namespace Application\Controller;

class App
{
    public static function run()
    {
        Logger::enableSystemLogs();
    }
}
```

And then update the file `index.php` as below:

```php
<?php
require __DIR__ . '/vendor/autoload.php';
use Application\Controller\App;

App::run();
```

### Adding routing
Routing is vital in the development of any modern application. It means that a specific code block is called depending on the path placed in the URL. 

For instance, `/` can display the homepage, and `/post/1` displays the post information with `id 1`.

In our case, we will create three classes `Router.php`, `Request.php`, and `Response.php`. 

The `Router.php` verifies the request method and matches the path using regex. If it matches, it runs a callback function we will specify using two parameters; `Request` and `Response`.

The `Request.php` has methods that fetches the data sent in the request. For instance, the POST data like title and body.

The `Response.php` will have functions that output `JSON` with specific `HTTP status`.

We will create the three files in the location `Application/Controller`, as illustrated below:

`Router.php`

```php
<?php namespace Application\Controller;

class Router
{
    public static function get($app_route, $app_callback)
    {
        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') !== 0) {
            return;
        }

        self::on($app_route, $app_callback);
    }

    public static function post($app_route, $app_callback)
    {
        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') !== 0) {
            return;
        }

        self::on($app_route, $app_callback);
    }

    public static function on($exprr, $call_back)
    {
        $paramtrs = $_SERVER['REQUEST_URI'];
        $paramtrs = (stripos($paramtrs, "/") !== 0) ? "/" . $paramtrs : $paramtrs;
        $exprr = str_replace('/', '\/', $exprr);
        $matched = preg_match('/^' . ($exprr) . '$/', $paramtrs, $is_matched, PREG_OFFSET_CAPTURE);

        if ($matched) {
            // first value is normally the route, lets remove it
            array_shift($is_matched);
            // Get the matches as parameters
            $paramtrs = array_map(function ($paramtr) {
                return $paramtr[0];
            }, $is_matched);
            $call_back(new Request($paramtrs), new Response());
        }
    }
}
```

And then we code `Request.php`

```php
<?php namespace Application\Controller;

class Request
{
    public $paramtrs;
    public $req_method;
    public $content_type;

    public function __construct($paramtrs = [])
    {
        $this->paramtrs = $paramtrs;
        $this->req_method = trim($_SERVER['REQUEST_METHOD']);
        $this->content_type = !empty($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    }

    public function getBody()
    {
        if ($this->req_method !== 'POST') {
            return '';
        }

        $post_body = [];
        foreach ($_POST as $key => $value) {
            $post_body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
        }

        return $post_body;
    }

    public function getJSON()
    {
        if ($this->req_method !== 'POST') {
            return [];
        }

        if (strcasecmp($this->content_type, 'application/json') !== 0) {
            return [];
        }

        // Receive the RAW post data.
        $post_content = trim(file_get_contents("php://input"));
        $p_decoded = json_decode($post_content);

        return $p_decoded;
    }
}
```

Then code `Response.php`

```php
<?php

namespace Application\Controller;

class Response
{
    private $p_status = 200;

    public function p_status(int $p_code)
    {
        $this->p_status = $p_code;
        return $this;
    }
    
    public function toJSON($data = [])
    {
        http_response_code($this->p_status);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
```

We will update our `index.php`, as shown below:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Application\Controller\App;
use Application\Controller\Router;
use Application\Controller\Request;
use Application\Controller\Response;

Router::get('/', function () {
    echo 'Hello World';
});

Router::get('/post/([0-9]*)', function (Request $request, Response $response) {
    $response->toJSON([
        'post' =>  ['id' => $request->paramtrs[0]],
        'status' => 'ok'
    ]);
});


App::run();
```

We will then execute the below command to test it:

```bash
$ php -S localhost:8000
```

We will browse to <http://localhost:8000/>, and a `Hello World` message should be displayed. 

If we navigate to <http://localhost:8000/post/1>, we get the following JSON response: 

```json
{"status": "ok", "post": { "id" : 1} }
```

The above results show that our application has routing.

### Implementing the Blog API
We will implement three endpoints:
- `GET /post` – displays all blog posts.
- `POST /post` – assists in creating a new post.
- `GET /post/{id}`-  shows specific post.

We will create a `Posts` model and call it from our router. We will create the `Posts.php` file inside `Application/Model` directory and include the code below: 

```php
<?php namespace Application\Model;

use Application\Controller\App_config;

class Posts
{
    private static $P_DATA = [];

    public static function all()
    {
        return self::$P_DATA;
    }

    public static function add($b_post)
    {
        $b_post->id = count(self::$P_DATA) + 1;
        self::$P_DATA[] = $b_post;
        self::save();
        return $b_post;
    }

    public static function findById(int $id)
    {
        foreach (self::$P_DATA as $b_post) {
            if ($b_post->id === $id) {
                return $b_post;
            }
        }
        return [];
    }

    public static function load()
    {
        $DB_PATH = App_config::get('DB_PATH', __DIR__ . '/../../db.json');
        self::$P_DATA = json_decode(file_get_contents($DB_PATH));
    }

    public static function save()
    {
        $DB_PATH = App_config::get('DB_PATH', __DIR__ . '/../../db.json');
        file_put_contents($DB_PATH, json_encode(self::$P_DATA, JSON_PRETTY_PRINT));
    }
}
```

Then, we will create a `db.json` file in the root directory with the following content:

```json
[
   {
     "id": 2,
     "title": "The Post 2",
     "body": "The Post Content"
   }
]
```

We will edit our `app_config.php` file, as illustrated below:

```php
<?php
return [
 'LOG_PATH' => __DIR__ . './log-files',
 'DB_PATH' => __DIR__ . '/db.json'
];
```

Our database is now set up. We can use it with our router. We can modify the `index.php` file to add the routes and call the database, as shown below:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use Application\Controller\App;
use Application\Controller\Router;
use Application\Controller\Request;
use Application\Controller\Response;
use Application\Model\Posts;

Posts::load();

Router::get('/post', function (Request $request, Response $response) {
    $response->toJSON(Posts::all());
});

Router::post('/post', function (Request $request, Response $response) {
    $b_post = Posts::add($request->getJSON());
    $response->p_status(201)->toJSON($b_post);
});

Router::get('/post/([0-9]*)', function (Request $request, Response $response) {
    $b_post = Posts::findById($request->paramtrs[0]);
    if ($b_post) {
        $response->toJSON($b_post);
    } else {
        $response->p_status(404)->toJSON(['error' => "Not Found"]);
    }
});

App::run();
```

In the code snippet above, we have added the `Posts::load()` function to load our database from the `db.json` file. 

We have used three routes: `GET /post` that lists the existing posts, `POST /post` creates new posts, and `GET /post([0-9]\*)` that fetches specific posts.

We can now use POSTMAN or curl to test and simulate the POST request. In our case, we will use curl. We will first fire up our PHP server using the below command:

```bash
$ php -S localhost:8000
```

We can list all the posts using the following command:

```bash
$ curl -X GET http://localhost:8000/post
```

The output is:

```json
[{"id":2,"title":"The Post 2","body":"The Post Content"}]
```

We can then list one post using the below command:

```bash
$ curl -X GET http://localhost:8000/post/2
```

And the output should be:

```json
[{"id":2,"title":"The Post 2","body":"The Post Content"}]
```

We can also create a post using the below command:

```bash
$ curl -i -X POST -H "Content-Type: application/json" -d "{\"title\":\"Hello World\",\"body\":\"My Content\"}" http://localhost:8000/post
```

We can confirm that the application is working as expected. \

Next, we will go through some testing.

### Testing
We can test the `Router.php` file with use cases and [psr-2](https://www.php-fig.org/psr/psr-2/) coding style standard. 

We will add more packages to our project by executing the below commands:

```bash
$ composer require --dev squizlabs/php_codesniffer
$ composer require --dev peridot-php/peridot
$ composer require --dev peridot-php/leo
$ composer require --dev eloquent/phony-peridot
```

The below command checks the correctness of our code syntax:

```bash
$ composer ./vendor/bin/phpcs — standard=psr2 Application/
```

For white spaces errors, we use the following command to fix them automatically:

```bash
$ composer ./vendor/bin/phpcbf — standard=psr2 Application/
```

We can perform unit testing using [peridot](https://peridot-php.github.io/), which offers two plugins, [leo](http://peridot-php.github.io/leo/plugins.html) - that provides [expect](http://peridot-php.github.io/leo/expect.html) functionality, and [phony-peridot](https://github.com/eloquent/phony-peridot), which provides [stubs](https://eloquent-software.com/phony/latest/#stubs) vital for checking if a function was called.

We will create the `Test/Router.spec.php` file and add the following code:

```php
<?php namespace Application\Test;

use Application\Controller\Router;
use function Eloquent\Phony\stub;

describe("Application\\Controller\\Router", function () {
    describe("->get", function () {

        it("match regex and execute the callback", function () {
            // Mock Request
            $_SERVER['REQUEST_METHOD'] = 'GET';
            $_SERVER['REQUEST_URI'] = '/post';

            $stub = stub(function () { });
            Router::get('/post', $stub);

            $stub->called();
        });


        it("shouldn't execute the callback if not GET request method", function () {
            // Mock Request
            $_SERVER['REQUEST_METHOD'] = 'POST';
            $_SERVER['REQUEST_URI'] = '/post';

            $stub = stub(function () { });
            Router::get('/post', $stub);

            expect($stub->checkCalled())->to->be->null();
        });

        it("match regex and get params", function () {
            // Mock Request
            $_SERVER['REQUEST_METHOD'] = 'GET';
            $_SERVER['REQUEST_URI'] = '/post/12';

            $stub = stub(function ($req) { });
            Router::get('/post/([0-9]*)', $stub);

            $stub->called();
            $request = $stub->firstCall()->argument();
            expect($request->paramtrs[0])->to->be->equal("12");
        });
    });

    describe("->post", function () {

        it("match regex and execute the callback", function () {
            // Mock Request
            $_SERVER['REQUEST_METHOD'] = 'POST';
            $_SERVER['REQUEST_URI'] = '/post';

            $stub = stub(function () { });
            Router::b_post('/post', $stub);

            $stub->called();
        });

        it("shouldn't execute the callback if not POST request method", function () {
            // Mock Request
            $_SERVER['REQUEST_METHOD'] = 'GET';
            $_SERVER['REQUEST_URI'] = '/post';

            $stub = stub(function () { });
            Router::b_post('/post', $stub);

            expect($stub->checkCalled())->to->be->null();
        });
    });
});
```

We will also edit the `composer.json` file, as illustrated below:

```json
"scripts": {
   "test": [
     "./vendor/bin/peridot Test/",
     "./vendor/bin/phpcs --standard=psr2 Application/"
   ]
```

We can run the test by executing the below command:

```bash
$ composer test
```

The following output will be displayed:

![app test](/engineering-education/getting-started-with-php7-without-using-a-framework/app-test.PNG)

The error messages will be displayed in case of any issues. Otherwise, no error will be returned.

### Conclusion
We have successfully implemented our Blog API project. A lot more can be added, but we cannot implement them at once to keep everything simple. However, a learner can utilize the knowledge to craft more powerful applications.

All the code snippets used in this guide can be accessed at this [GitHub Repo](https://github.com/lewe01/php7-blog-API).

Happy coding!

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)