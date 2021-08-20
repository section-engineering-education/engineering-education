### Introduction
In the early times, developers had to use frameworks to develop and manage their PHP projects. With the use and implementation of the [composer](https://getcomposer.org/doc/00-intro.md) package manager and [PHP standards](https://php7.org/guidelines), developers could easily write and maintain their PHP code.

This tutorial will guide the learners on how to build a blog API project with basic routing using third-party packages and perform testing without utilizing any framework.

Our main objective is to develop a small blog API with a unique `id`, `title`, and `body`. The users of blog API will list, create, and view a new blog post. We will use a JSON file to act as a database, and therefore all requests and responses will be in a JSON format.

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
- [PHP 7.0](https://www.php.net/downloads.php) or greater installed
- [Composer](https://getcomposer.org/doc/00-intro.md) installed
- Working knowledge of [PHP classes](https://www.php.net/manual/en/language.oop5.php), [composer](https://getcomposer.org/doc/00-intro.md), and [MVC](https://www.javatpoint.com/php-mvc-architecture) pattern.

### Setting up composer
First, we will create the `composer.json` file. It is essential in adding third-party packages and managing projects using the [autoload](https://getcomposer.org/doc/04-schema.md) feature that makes importing classes easy. 

We will create our project root directory, then execute the following command in the terminal and fill in the required information or leave them as default:

```bash
$ composer init
```

The above command will create a `composer.json` file in the root directory. Then we will create another folder named `App` and two other files called `index.php` and `config.php`. Our project folder structure will appear as below:

![folder structure](/engineering-education/getting-started-with-php7-without-using-a-framework/folder-structure.PNG)

Next, we will add our first package by executing the below command in the terminal:

```bash
$ composer require monolog/monolog:1.25.1
```

The command creates a `vendor` folder with the `monolog` package and a file named `autoload.php`. The file `autoload.php` contains all the paths to the classes we will add from third parties and our classes, a `monolog` package assists in generating logs files.

Next we will edit the `index.php` with the following code:

```php
<?php
require __DIR__ . '/vendor/autoload.php';
```

Then, we will modify our `composer.json` file as shown below:

```json
"description": "Simple Blog Api",
"type": "project",
"autoload": {
  "psr-4": {
    "App\\": "App/"
   }
},
```

We will execute the below command to update the autoload entry.

```bash
$ composer dump-autoload
```

The `autoload` entry registers all our classes used anywhere in our application. The [psr-4](https://www.php-fig.org/psr/psr-4/) offers more flexible autoloading standard specifications compared to [psr-0](https://www.php-fig.org/psr/psr-0/). Whenever we add classes to our application, we do not need to regenerate the autoloader.

As of now, our application can work with a composer. To verify this, we can execute the below command in the terminal:

```bash
$ php index.php
```

If the above command returns no error, everything is working as expected since no output was expected.

### Adding first class
First, we will deal with `config` files to be used across our project. We will have two `config` files in our project.

First, we will start with the `config.php` file located at the root directory. We will put the API Key, Cache setting, and other settings for our application in this file. The other `config` file will be placed at `App/Lib/Config.php` to read the variables.

We will edit the `config.php` file located at the project root directory as follows:

```php
<?php
return [
 'LOG_PATH' => __DIR__ . './logs',
];
```

Next, we will create a new `Config.php` file inside the directory `App/Lib/` and paste the below code into it:

```php
<?php namespace App\Lib;

class Config
{
    private static $config;

    public static function get($key, $default = null)
    {
        if (is_null(self::$config)) {
            self::$config = require_once(__DIR__.'/../../config.php');
        }

        return !empty(self::$config[$key])?self::$config[$key]:$default;
    }
}
```

The above code snippet reads the array from `config.php` in the root project directory and verifies if the key exists in the array. If the key already exists, it returns a value. Otherwise, it returns the default value specified.

Next, we will edit the `index.php` file to check if the above is working as below:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

// New lines to be added
use App\Lib\Config;
$LOG_PATH = Config::get('LOG_PATH', '');
echo "[LOG_PATH]: $LOG_PATH";
```

We will then execute the below command:

```bash
$ php index.php
```

The above command displays the path of the logs we specified on `config.php`.

We will add more classes into the `App` folder, and because of autoloading feature, they will be accessible anywhere in the application.

### Adding logging
Logging is essential in any application module since it verifies whether everything is working as expected. Packages such as `monolog` make logging easy and send the logs to email, slack, telegram, and any other platforms as preferred.  

In our case, we will create three log files, `errors.log`, `request.log`, and `app.log`. The `errors.log` and `request.log` files will stay active, and the `app.log` file will be used when required to display the desired information. The `errors.log` file will contain any error that may occur in the application. The `request.log` file logs any HTTP requests made to the application.

We will create the file `Logger.php` in the folder `App/Lib` and paste the below code. This will act as our wrapper to manage our different logs.

```php
<?php namespace App\Lib;

use Monolog\ErrorHandler;
use Monolog\Handler\StreamHandler;

class Logger extends \Monolog\Logger
{
    private static $loggers = [];

    public function __construct($key = "app", $config = null)
    {
        parent::__construct($key);

        if (empty($config)) {
            $LOG_PATH = Config::get('LOG_PATH', __DIR__ . '/../../logs');
            $config = [
                'logFile' => "{$LOG_PATH}/{$key}.log",
                'logLevel' => \Monolog\Logger::DEBUG
            ];
        }

        $this->pushHandler(new StreamHandler($config['logFile'], $config['logLevel']));
    }

    public static function getInstance($key = "app", $config = null)
    {
        if (empty(self::$loggers[$key])) {
            self::$loggers[$key] = new Logger($key, $config);
        }

        return self::$loggers[$key];
    }

    public static function enableSystemLogs()
    {

        $LOG_PATH = Config::get('LOG_PATH', __DIR__ . '/../../logs');
        // Error Log
        self::$loggers['error'] = new Logger('errors');
        self::$loggers['error']->pushHandler(new StreamHandler("{$LOG_PATH}/errors.log"));
        ErrorHandler::register(self::$loggers['error']);

        // Request Log
        $data = [
            $_SERVER,
            $_REQUEST,
            trim(file_get_contents("php://input"))
        ];
        self::$loggers['request'] = new Logger('request');
        self::$loggers['request']->pushHandler(new StreamHandler("{$LOG_PATH}/request.log"));
        self::$loggers['request']->info("REQUEST", $data);
    }
}
```

We have created two main functions the `Logger::enableSystemLogs()`, which enables our error and request logs, then the `Logger::getInstance()`, which will be our App log.

We can try it out by adding the below lines of code to our `index.php` file:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use App\Lib\Config;
$LOG_PATH = Config::get('LOG_PATH', '');
echo "[LOG_PATH]: $LOG_PATH";

//New Lines
use App\Lib\Logger;

Logger::enableSystemLogs();
$logger = Logger::getInstance();
$logger->info('Hello World');
```

We will then run a built-in PHP web server by executing the below command:

```bash
$ php -S localhost:8000
```

Then, we navigate to <http://locahost:8000>. We will see the `LOG_PATH`, but we notice we have two files if we navigate our logs folder. One file will be showing the requested content, whereas the other will contain `Hello World` text. Developers can change the request to suit their needs and show or remove specific information.

Finally, we can bootstrap or application by creating a new file named `App.php` in the location `App/Lib` as below:

```php
<?php namespace App\Lib;

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

App::run();
```

### Adding routing
Routing is vital in the development of any modern application. It means that a specific code block is called depending on the path placed in the URL. For instance, `/` can display the homepage, and `/post/1` displays the post information with `id 1`.

In our case, we will create three classes `Router.php`, `Request.php`, and `Response.php`. The `Router.php` will verify the request method and match the path using regex. If it matches, it runs a callback function we will specify using two parameters, `Request`, and `Response`.

The `Request.php` has methods that fetch the data sent in the request. For instance, the POST data such as title and body.

The `Response.php` will have functions that output JSON with specific HTTP status.

We will create the three files in the location `App/Lib` as below:

`Router.php`

```php
<?php namespace App\Lib;

class Router
{
    public static function get($route, $callback)
    {
        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'GET') !== 0) {
            return;
        }

        self::on($route, $callback);
    }

    public static function post($route, $callback)
    {
        if (strcasecmp($_SERVER['REQUEST_METHOD'], 'POST') !== 0) {
            return;
        }

        self::on($route, $callback);
    }

    public static function on($regex, $cb)
    {
        $params = $_SERVER['REQUEST_URI'];
        $params = (stripos($params, "/") !== 0) ? "/" . $params : $params;
        $regex = str_replace('/', '\/', $regex);
        $is_match = preg_match('/^' . ($regex) . '$/', $params, $matches, PREG_OFFSET_CAPTURE);

        if ($is_match) {
            // first value is normally the route, lets remove it
            array_shift($matches);
            // Get the matches as parameters
            $params = array_map(function ($param) {
                return $param[0];
            }, $matches);
            $cb(new Request($params), new Response());
        }
    }
}
```

And then we code `Request.php`

```php
<?php namespace App\Lib;

class Request
{
    public $params;
    public $reqMethod;
    public $contentType;

    public function __construct($params = [])
    {
        $this->params = $params;
        $this->reqMethod = trim($_SERVER['REQUEST_METHOD']);
        $this->contentType = !empty($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';
    }

    public function getBody()
    {
        if ($this->reqMethod !== 'POST') {
            return '';
        }

        $body = [];
        foreach ($_POST as $key => $value) {
            $body[$key] = filter_input(INPUT_POST, $key, FILTER_SANITIZE_SPECIAL_CHARS);
        }

        return $body;
    }

    public function getJSON()
    {
        if ($this->reqMethod !== 'POST') {
            return [];
        }

        if (strcasecmp($this->contentType, 'application/json') !== 0) {
            return [];
        }

        // Receive the RAW post data.
        $content = trim(file_get_contents("php://input"));
        $decoded = json_decode($content);

        return $decoded;
    }
}
```

Then code `Response.php`

```php
<?php

namespace App\Lib;

class Response
{
    private $status = 200;

    public function status(int $code)
    {
        $this->status = $code;
        return $this;
    }
    
    public function toJSON($data = [])
    {
        http_response_code($this->status);
        header('Content-Type: application/json');
        echo json_encode($data);
    }
}
```

We will update our `index.php` with the following code:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use App\Lib\App;
use App\Lib\Router;
use App\Lib\Request;
use App\Lib\Response;

Router::get('/', function () {
    echo 'Hello World';
});

Router::get('/post/([0-9]*)', function (Request $req, Response $res) {
    $res->toJSON([
        'post' =>  ['id' => $req->params[0]],
        'status' => 'ok'
    ]);
});


App::run();
```

We will then execute the below command to test it:

```bash
$ php -S localhost:8000
```

We will browse to <http://localhost:8000/>, and a `Hello World` message will be displayed. If we navigate to <http://localhost:8000/post/1>, we get the following JSON response: 

```json
{"status": "ok", "post": { "id" : 1} }
```

The above results show that our application has routing.

### Implementing the Blog API
We will implement three endpoints:
- `GET /post` – which will list all the available posts
- `POST /post` – which will assist in creating a new post
- `GET /post/{id}` which shows specific post

First, we will create a `Posts` model and later call them from our router. We will create the `Posts.php` file inside `App/Model` and paste the below code:

```php
<?php namespace App\Model;

use App\Lib\Config;

class Posts
{
    private static $DATA = [];

    public static function all()
    {
        return self::$DATA;
    }

    public static function add($post)
    {
        $post->id = count(self::$DATA) + 1;
        self::$DATA[] = $post;
        self::save();
        return $post;
    }

    public static function findById(int $id)
    {
        foreach (self::$DATA as $post) {
            if ($post->id === $id) {
                return $post;
            }
        }
        return [];
    }

    public static function load()
    {
        $DB_PATH = Config::get('DB_PATH', __DIR__ . '/../../db.json');
        self::$DATA = json_decode(file_get_contents($DB_PATH));
    }

    public static function save()
    {
        $DB_PATH = Config::get('DB_PATH', __DIR__ . '/../../db.json');
        file_put_contents($DB_PATH, json_encode(self::$DATA, JSON_PRETTY_PRINT));
    }
}
```

Then, we will create a `db.json` file in the root directory with the following content into it:

```json
[
   {
     "id": 1,
     "title": "My Post 1",
     "body": "My First Content"
   }
]
```

We will edit our `config.php` file as below:

```php
<?php
return [
 'LOG_PATH' => __DIR__ . './logs',
 'DB_PATH' => __DIR__ . '/db.json'
];
```

Now that we have our database set up, we can use it with our router. We can modify our `index.php` file to add the routes and call the database as below:

```php
<?php
require __DIR__ . '/vendor/autoload.php';

use App\Lib\App;
use App\Lib\Router;
use App\Lib\Request;
use App\Lib\Response;
use App\Model\Posts;

Posts::load();

Router::get('/', function () {
    (new Home())->indexAction();
});

Router::get('/post', function (Request $req, Response $res) {
    $res->toJSON(Posts::all());
});

Router::post('/post', function (Request $req, Response $res) {
    $post = Posts::add($req->getJSON());
    $res->status(201)->toJSON($post);
});

Router::get('/post/([0-9]*)', function (Request $req, Response $res) {
    $post = Posts::findById($req->params[0]);
    if ($post) {
        $res->toJSON($post);
    } else {
        $res->status(404)->toJSON(['error' => "Not Found"]);
    }
});


App::run();
```

In the above code snippet, we have added `Posts::load()` to load our database from the `db.json` file. We have used three routes: `GET /post` that lists the existing posts, `POST /post` creates new posts, and `GET /post([0-9]\*)` that fetches specific posts.

We can now use POSTMAN or curl to test and simulate the POST request. In our case, we will use curl.

We can list all the posts using the following command:

```bash
$ curl -X GET http://localhost:8000/post
```

The output is:

```json
[{"id":1,"title":"My Post 1","body":"My First Content"}]
```

We can then list one post using the below command:

```bash
$ curl -X GET http://localhost:8000/post/1
```

And the output would be:

```json
[{"id":1,"title":"My Post 1","body":"My First Content"}]
```

We can also create a post using the below command:

```bash
$ curl -X POST http://localhost:8000/post -H 'Content-Type: application/json' -d '{"title": "Hello World" "body": "My Content"}'
```

We can confirm that the Blog API is working as expected. Next, we will add testing.

### Adding testing
Here we can test the `Router.php` file with use cases and [psr-2](https://www.php-fig.org/psr/psr-2/) coding style standard. 

We will add more packages to our project by executing the below commands:

```bash
$ composer require --dev squizlabs/php_codesniffer
$ composer require --dev peridot-php/peridot
$ composer require --dev peridot-php/leo
$ composer require --dev eloquent/phony-peridot
```

The below command checks the correctness of our code syntax:

```bash
$ composer ./vendor/bin/phpcs — standard=psr2 App/
```

For white spaces errors we use the below command to fix them automatically:

```bash
$ composer ./vendor/bin/phpcbf — standard=psr2 App/
```

We can perform unit testing using [peridot](https://peridot-php.github.io/), which offers two plugins, [leo](http://peridot-php.github.io/leo/plugins.html) - which provides [expect](http://peridot-php.github.io/leo/expect.html) functionality, and [phony-peridot](https://github.com/eloquent/phony-peridot), which provides [stubs](https://eloquent-software.com/phony/latest/#stubs) functionality necessary in checking if a function was called.

We will create the file `Test/Router.spec.php` and paste the following code into it:

```php
<?php namespace App\Test;

use App\Lib\Router;
use function Eloquent\Phony\stub;

describe("App\\Lib\\Router", function () {
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
            $req = $stub->firstCall()->argument();
            expect($req->params[0])->to->be->equal("12");
        });
    });

    describe("->post", function () {

        it("match regex and execute the callback", function () {
            // Mock Request
            $_SERVER['REQUEST_METHOD'] = 'POST';
            $_SERVER['REQUEST_URI'] = '/post';

            $stub = stub(function () { });
            Router::post('/post', $stub);

            $stub->called();
        });

        it("shouldn't execute the callback if not POST request method", function () {
            // Mock Request
            $_SERVER['REQUEST_METHOD'] = 'GET';
            $_SERVER['REQUEST_URI'] = '/post';

            $stub = stub(function () { });
            Router::post('/post', $stub);

            expect($stub->checkCalled())->to->be->null();
        });
    });
});
```

We will also modify the `composer.json` by adding the following content:

```json
"scripts": {
   "test": [
     "./vendor/bin/peridot Test/"
     "./vendor/bin/phpcs --standard=psr2 App/",
   ]
```

We can run the test by executing the below command:

```bash
$ composer test
```

The error messages will be displayed if it encounters problems with our code. Otherwise, no error will be returned.

### Wrapping up
We have successfully implemented our blog API project. A lot more can be added, but we cannot implement them at once to keep everything simple. However, a learner can utilize the knowledge gained here as a base and even improve the features.

All the code snippets used in this guide can be accessed at GitHub [Repo](https://github.com/lewe01/php7-blog-API).
