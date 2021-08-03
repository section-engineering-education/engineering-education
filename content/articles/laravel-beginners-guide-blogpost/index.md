---
layout: engineering-education
status: publish
published: true
url: /laravel-beginners-guide-blogpost/
title: Building Your First Laravel Application (Blog Application)
description: This article will be a step by step guide on how to build a Laravel (which is a is a PHP MVC Framework) application (blog application) using CRUD operations.
author: mauline-mwaniki
date: 2020-12-13T00:00:00-14:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/laravel-beginners-guide-blogpost/hero.jpg
    alt: Laravel blog application image
---
Laravel is a free and open-source PHP Framework for Web Artisans based on Symfony that helps craft Web Applications following the MVC (Model View Controller) design pattern.
<!--more-->
There are two ways to create a Laravel application, one is to use the Laravel installer. The other requires the Laravel package and for us to use a composer and a create-project command. 

In this tutorial, we will use the latter.

### Step by step guide on how to build your first Laravel (blog) application 

Below is some information on the Laravel framework:
- **Framework:** Laravel 
- **Author:** Taylor Otwell
- **Initial Release Date:** June 2011
- **Current Version:** 8 (September 8th, 2020)
- **Stable Release:** 8.11.2 (October 28th, 2020)
 
### What is Laravel?
The short version, is that Laravel is a PHP MVC Framework. The long version would be, Laravel is a free and open-source PHP Framework for Web Artisans based on Symfony.

It helps craft Web Applications following the MVC (Model View Controller) design pattern. In order for us to better understand Laravel, we will build a simple blog application with Laravel from scratch.

*Requirements:*
To create a Laravel application you will need a few tools installed in your computer. 

These tools include:
- PHP >= 7.3.
- Database (MySql).
- A localhost Web Server – In our case we'll use WAMP (for Windows), LAMP (for Linux), or MAMP (for MacOs). This localhost webserver comes installed with latest PHP and MySQL database so you will not need to install them manually.
To install either MAMP, LAMP, or WAMP go to http://ampps.com/downloads and choose the software your platform.
- Composer – This is a dependency management software for PHP. To install the composer visit https://getcomposer.org/ and download it there for your platform.
- [Node.js](/why-node-js-is-popular/) – This is a free and open source JavaScript runtime environment that executes JavaScript outside of the browser. We will not write any Node.js code but it will be used in the background by Laravel to streamline our development.
- Code editor – A [code editor](/atom-vs-visual-studio-code-functionality-and-features-comparison/) will be required. We recommend to use Visual Studio Code: It is free.
- A browser – Google Chrome, Edge, Safari, or Mozilla Firefox will do just fine.
- Background knowledge of the PHP Programming Language.

With our machine setup complete, it's time to start developing.

### Crafting a new Laravel application
As we mentioned before, there are two ways to create a Laravel application; one is using the Laravel installer and the other is through installing the Laravel package; and using a composer and a create-project command. 

In this tutorial we will use the latter:
- Open your console and cd to www directory in your MAMP, LAMP, or WAMP installation directory.
- Type the following command:

  ```sh
  composer create-project --prefer-dist laravel/laravel my-blog
  ```

It will create a directory called `my-blog` and load all the primary Laravel files there. 

### Configuring our Laravel application
After installing our Laravel application we will need to configure our database for it to work.
- Go to `http://localhost/phpmyadmin/ `
- Create a new Database by clicking on new (shown below in red)

![new data base](/engineering-education/laravel-beginners-guide-blogpost/1_db_create.PNG)

- Name it `my_blog` and click Create

Now that we have a database we can proceed to set up the application to work with the database.

-	Open your file explorer and navigate to `my-blog` folder
-	Open the `.env` file in your code editor
-	Change the following in the file:-

`APP_NAME` key to name of your blog i.e. “My Blog”

`DB_DATABASE` key to database name i.e. my_blog

The final file should look like this:

```bash
...

APP_NAME="My Blog"
...

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_blog
DB_USERNAME=root
DB_PASSWORD=

...
```

With everything configured it's time to run our app and see what it looks like. 

To run the application, type the following command: 

```sh
php artisan serve
```
It will start the application and give you a URL, `http://127.0.0.1:8000`, open the URL in your browser and see the application (shown below).

![home-page](/engineering-education/laravel-beginners-guide-blogpost/2_home.png)

### Understanding the Laravel application file structure
Before we start coding, let's understand the file structure of a Laravel application. 

For example, most of you may not understand why we changed the `.env` file. 

Below is the Laravel App file structure:

![files](/engineering-education/laravel-beginners-guide-blogpost/3_files.png)

`app` folder – This contains all the logic in our application, this includes the models, controllers, service providers etc.

![app files](/engineering-education/laravel-beginners-guide-blogpost/4_app_files.png)

As a beginner you will spend most of your time in Models and Controllers folders, these two is what we will discuss in detail.

- `Models` folder- This is where the business logic of your App is stored in, a model is a representation of a real life object. For example, a blog post. 

Models will be generated using php artisan command `make:model` and follow a convention of singular title case wording. For example, for a blog post model we could call it BlogPost.php.

> Note: Laravel comes with a User.php Model out of the box that defines user details:
		
- `Http/Controllers` folder – This will contain all the controller files of your application. 

A controller creates a link between your Models and your Views. When a new blog post form is submitted by the user, the data comes into the controller where it's sanitized and then passed to the model to be stored in the database, then the controller sends feedback back to the view saying the blog post has been created.

Controllers will be generated using php artisan command `make:controller` and follow a convention of singular title case wording with the word Controller trailing. For our blog post controller we will call it BlogPostController.php

A controller has 7 signature methods that enables crud operations:
1. `index()` – to fetch all the resources e.g. all blog posts available.
2. `show()` – to fetch a single resource e.g. a single blog post, say, post 5.
3. `create()` – shows the form to use to create a resource (not available for API controllers).
4. `store()` – to commit the resource to database e.g. save blog post.
5. `index()` – to show the form to edit the resource (not available for API controllers).
6. `update()` – to commit the edited resource to database.
7. `destroy()` – to delete a resource from database.

Now back to our Laravel app file structure:
- `Http/Middleware` folder – This contains all the middleware, middleware is code that is to be executed before the request gets to the controller e.g. Authenticating a user before allowing access.
- `Exceptions` folder – This contains all the Exception handling in your App, you can add custom exceptions here too.
- `Console` folder – This contains all the PHP artisan commands (PHP Artisan is the command line tool that ships with Laravel to help us design our application faster). These commands are used to create application files and also do some actions like start a development server. An example of artisan command is the one we ran at the beginning after installing Laravel (php artisan serve).
- `Providers` folder – This contains all the service providers in your App, a service provider in Laravel is a group of code that does specific task across the app whenever needed. For example a billing service provider will be designed to allow multiple payment platforms but all you have to do is call the service provider and it will dynamically provide a payment platform instead of specifying a platform in the controller.
        
>NOTE: Service Providers are a hard concept to grasp for beginners, but once you get used to them they are really handy.

- `bootstrap` folder – This contains the app file that bootstraps the framework by initializing it (setting up path & environment), it also contains the cache folder that contains the framework generated files for the optimization of the app.

>NOTE: bootstrap folder has nothing to do with Bootstrap CSS Framework.

- `config` folder – This contains all the configuration files of the App. To get a certain configuration, Laravel provides a helper method to do it. 

For example: 

Getting the App name we would use:

 ```php
config('app.name', 'Default Name')
```
		 
In that example, app is the configuration file we are looking in, name is the key while 'Default Name' is the name that will be used in case the key or file does not exist.

- `database` folder – This folder contains database migrations, factories and seeds. Migrations are database tables definitions such as columns and their datatypes, necessary keys definitions etc. 

Factories are blueprints used to create sample data for the database while the seeds are the sample data for our database. They are actually commands that trigger creation of sample data when ran. 

You can also choose to store the SQLite database files here as well.

>Note: Laravel comes with users_table migration and UserFactory.php factory out of the box that will help create users table and define sample data for our users table.

- `public` folder – This folder contains the index file that is the entry point of the app, once the request is made, it hits that file and then is directed to the necessary route. We will learn about routes later. You can also store public assets here like public images, css, and js.

- `resources` folder – This folder contains our app's compliable source files, these include views, sass, and raw JavaScript (mostly Node.js, or from JS Frameworks) files. Views are made using HTML with a mixture of a Laravel templating engine called blade, we will learn more about this later.

- `routes` folder – This folder contains all the route files to our app, these route files include web.php, api.php, channels.php, console.php. Each files contains multiple routes as defined by the user. A route is simply a web address that points to a certain function either in the routes file or in the controller.

- `storage` folder – This contains all the private files, such as customer profile pictures. A dynamic link can be created from here to public. All the app logs are stored here also.

- `tests` folder – This is where your app tests are stored.

- `vendor` folder – This is where all third party packages brought by composer are stored.

- `.env` file – This file contains the environment variables these variables are brought in through config files using the `env` helper method.

 ```php
env('KEY','default')
```

>NOTE: Avoid using the env() helper method inside your code, only use it in config files. This is because, during deployment when you cache the environment (you will learn how) all the environment variables will be loaded to config and the .env file will be dropped.

### Understanding a request lifecycle
Laravel like any other serverside platform, works on a request response model, i.e. the user sends a request and they get a response in return.

As an example, let's assume the user wants to read blog post 5, they will send a get request to fetch that post; the request route (URL) would be as follows http://my-blog.test/blog/5

First, the request will go to `public/index.php` file, the app will register a new request and check the `routes/web.php` file to see if the route is registered, if not, it throws a 404 error, otherwise, the app checks if there are any middleware that needs to be ran before the request is forwarded to the controller method assigned to the route. 

Once all the middleware have been executed, the request is forwarded to the necessary method, in this case, the method will be `show()` in `BlogPostController.php`.

Inside the controller, the request is executed i.e. the post is fetched from the database then the BlogPost object is passed to the view and the user receives the view as a response. The view is then rendered in the browser.

That finalizes the request process.

### Let's code!
Now that we better understand how a request works and what different files and folders of a Laravel application are needed, we will start developing our blog now.

#### Making BlogPost model
First, we will create a BlogPost Model, to create a model, we use the php artisan `make:model` command followed by the name of the model.

```sh
php artisan make:model BlogPost
```

This will create a file called `BlogPost.php` inside our `App/Models` folder, and ladies and gentlemen, that's all you need to do to create a model.

#### Making `blog_posts` table migration & migrating the database
Now, let's create a migration for the model. 

To create a migration, we use the php artisan `make:migration` command followed by `action_table_name_table` words. 

In our case:
```sh
php artisan make:migration create_blog_posts_table
```

>TIP: Always make sure your table name is in the plural tense of your model's name in small letters.

This will create a file inside the `database/migrations` folder. The file will have current timestamp preceding the name you gave in the command: `2020_11_17_163409_create_blog_posts_table.php`.

Once you have created the migration, we have to fill it with the fields we need inside the `Schema::create` method, our final file will look like this:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_posts', function (Blueprint $table) {
            $table->id();

          /* We started adding code here*/

            $table->text('title');  // Title of our blog post          
            $table->text('body');   // Body of our blog post                  
            $table->text('user_id'); // user_id of our blog post author

          /* We stopped adding code here*/

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_posts');
    }
}

```

The three fields I have indicated with a block comment are all I added the rest are prefilled.

`$table->id();` - Creates ID field that is also primary key in our table.

`$table->timestamps();` - Creates two TIMESTAMP fields (`created_at` & `updated_at`).

After creating the migration, all we have to do is migrate to create the tables in our database. 
To migrate, run the migration command (below). 

This will create tables in the database for us:
```sh
php artisan migrate
```

#### Creating a factory and seed for our `blog_post` table
Now that we have created our table it's time to fill it with data. User factory (`UserFactory.php`) already exists and now we will create a factory for our Blog post.

To make a factory we use the `make:factory` command followed by the name of the class, we also add the `-m` flag followed by model name to assign a factory to that model.

```sh
php artisan make:factory BlogPostFactory –m BlogPost
```

Inside the `database/factories` folder, a file will appear with the name `BlogPostFactory.php`.

Inside the definition method, we will edit the return array to define our blog post data, we will put the following:

```php
...

'title' => $this->faker->sentence, //Generates a fake sentence
'body' => $this->faker->paragraph(30), //generates fake 30 paragraphs
'user_id' => User::factory() //Generates a User from factory and extracts id

...
```

Now that we have created our factory, it's time to create a seeder to seed our database. We will do this using PHP artisan tinker. Tinker is a command line tool that is shipped with Laravel to enable data manipulation without changing the code during development, it's a good tool to do seeding and test relationships.

To open tinker, type:
```sh
php artisan tinker
```

This will fire up a command line that looks like this:

![Tinker](/engineering-education/laravel-beginners-guide-blogpost/5_tinker.png)

Start typing your code and hit enter to run it. 

To seed, type:
```php
\App\Models\BlogPost::factory()->times(10)->create();
```

This will generate 10 blog posts and save them to the database and generate 10 users too, each user will own one blog post.

#### Creating controllers
Controllers help us perform resource manipulation actions, such as CRUD Ops. To create a controller we use the `make:controller` command followed by controller name, to associate the controller with a model you use the `-m` flag followed by model name.

The naming convention of controllers in Laravel is ModelName followed by the name Controller. For `BlogPost.php` model the controller will be `BlogPostController.php`.

This will create a file called `BlogPostController.php` in `app/Http/Controllers` folder.

The file will look like this:
```php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;

class BlogPostController extends Controller
{
    
    public function index()
    {
        // show all blog posts
    }

    public function create()
    {
        //show form to create a blog post
    }

   
    public function store(Request $request)
    {
        //store a new post
    }

    public function show(BlogPost $blogPost)
    {
        //show a blog post
    }

    
    public function edit(BlogPost $blogPost)
    {
        //show form to edit the post
    }

    
    public function update(Request $request, BlogPost $blogPost)
    {
        //save the edited post
    }

    
    public function destroy(BlogPost $blogPost)
    {
        //delete a post
    }
}

```

The file will be created with all resource manipulation methods available and the BlogPost Model injected to the file by default.

#### Working with routes
Now that we have created our controller let's target one of the method, lets say `index()` using a route. 

All web routes are stored in `routes/web.php` file.

Open the file and you will see the default (root) route to our application, immediately below the root route we will create the blog route that will open blog and show all the posts available. 

To show that we will target the index method inside the `BlogPostController.php` class.

It will be a `get` route since we are fetching data.

Our `routes/web.php` file will look like this:
```php
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Predefined root route - Shows the welcome page we show when we ran the app for the first time.
Route::get('/', function () {
    return view('welcome');
});

// The route we have created to show all blog posts.
Route::get('/blog', [\App\Http\Controllers\BlogPostController::class, 'index']);

```

If you visit that route now, it will show a blank screen. In the next sections we will create more routes and implement the methods available.

### Implementing the controller methods
#### 1. Showing all blog posts with the `index()` method

```php
...

public function index()
{
	$posts = BlogPost::all(); //fetch all blog posts from DB
	return $posts; //returns the fetched posts
}

...
```

If we navigate to `http://127.0.0.1:8000/blog` you will see a JSON dump of the posts available (10 posts). 

Like this:
 
![Blog Dump](/engineering-education/laravel-beginners-guide-blogpost/6_blog_dump.png)

I have installed a chrome extension called JSON Formatter to help me format the JSON dumped, it's a free plugin, you don't have to install it if you don't need it.

##### 2. Showing one blog post
Create a route to show 1 post.

The route will be:
```php
...

Route::get('/blog/{blogPost}', [\App\Http\Controllers\BlogPostController::class, 'show']);
...
```

Here, we have introduced `{blogPost}` this is called a wildcard. This means that `{blogPost}` will be replaced by anything that is typed after `blog/` and that value will get stored in variable called `$blogPost`.

On the show method, we will have:
```php
...

public function show(BlogPost $blogPost)
{
	return $blogPost; //returns the fetched posts
}

...
```

If we visit `http://127.0.0.1:8000/blog/5` it will automatically fetch the BlogPost with the ID of 5 and store it in `$blogPost` as an instance of BlogPost Model.

This is called route-model binding in Laravel. You provide a route with a wildcard that gets replaced by the value provided in the URL, then Laravel uses that value to try to find the record associated with that value, especially the record with that ID. 

If it is not found, you get 404 error.

This is the response you will see in your browser:

![Blog Post](/engineering-education/laravel-beginners-guide-blogpost/7_blog_post.png)

>WARNING: The key we use on the wildcard must be the same name as the variable name inside the show method for model-route binding to occur. 
>For example, if in the route wildcard is `{blogPost}` the variable name on `public function show(BlogPost $blogPost)` method has to be `$blogPost`.

#### Working with other methods
So far we have been working with `get` routes only. The `create()` and `edit()` methods are supposed to show the create and edit forms respectfully.

The `store()` method will be a `post` http verb since we will be posting the create BlogPost form to store the data, the `update()` method will need a `put` or `patch` verb to update data and the `destroy()` method will need a `delete` verb to delete the post.

>TIP: Http verbs are also reffered as methods or actions, they are normally used to define the action that is taken on the sever. 
>
>E.g. A POST verb/action/method will be used to post data to the server, a GET method will be used to get data from server,
>PATCH / PUT method will be used to update data and DELETE method will be used to delete data from server. 
>
>There are other verbs but you will rarely use them even in a professional development environment.

We will implement these after we have learned how to create the user interface, for the time being, we can create their routes.

```php
...

Route::get('/blog/create/post, [\App\Http\Controllers\BlogPostController::class, 'create']); //shows create post form
Route::post('/blog/create/post, [\App\Http\Controllers\BlogPostController::class, 'store']); //saves the created post to the databse
Route::get('/blog/{blogPost}/edit', [\App\Http\Controllers\BlogPostController::class, 'edit']); //shows edit post form
Route::put('/blog/{blogPost}/edit', [\App\Http\Controllers\BlogPostController::class, 'update']); //commits edited post to the database 
Route::delete('/blog/{blogPost}', [\App\Http\Controllers\BlogPostController::class, 'destroy']); //deletes post from the database
...
```

#### Working with views and designing the user interface
Laravel uses a templating engine called blade that is injected into HTML and ends up being evaluated as HTML.

First, we will learn blade syntax, that will help us get started.

We will compare the syntax we use on blade to that of regular PHP inside views:

![Blade Syntax](/engineering-education/laravel-beginners-guide-blogpost/8_blade_syntax.PNG)

>TIP: The PHP syntax is still accepted in the Laravel views but as you have seen, it's clumsy. Using blade syntax is better.

Blade has more terms and directive that we need to understand:
- View – an HTML file in Laravel, such as the user interface.
- Layout – This is the skeleton of the app, it defines the major elements like headers and footers for consistency and also includes the major scripts and styles.
- Component – Components are reusable views, they can be a button for example.

Blade directives and their meaning:

![Blade Directives](/engineering-education/laravel-beginners-guide-blogpost/9_blade_directives.PNG)

These are the ones we are going to use right now, you can always learn more on Laravel documentation [here}(https://laravel.com/docs/8.x/).

With this knowledge, we are now ready to design our Laravel app.

#### 1. Designing our app layout
Inside the `resource/views` folder create a new folder and name it layouts then create a file in the folder and name it `app.blade.php`.

Below is the final code of how the file will look like:
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name') }}</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        //Include bootstrap CSS CDN here

        <style>
            body {
                font-family: 'Nunito';
            }
        </style>

    </head>

    <body>

    @yield('content')

    </body>
    //Include bootstrap JS CDN here 
</html>
```

With this we have created our layout, it's just an HTML page with Google font and Bootstrap in it.

At the title `{{ config('app.name') }}` – Is a Laravel config accessor helper method to access our app name that shows up as the title of our page.

In the body, `@yield('content)` – is a blade directive that will be used to bring content from children views to the layout.

#### 2. Designing the welcome page
This is the page that we saw when we created our first application, we will redesign it to show the welcome page. We will extend our layout using the `@extend` directive. It's located in `resources/views` folder, named `welcome.blade.php`.

The final code in the page will look like this:
```html
@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-12 text-center pt-5">
                <h1 class="display-one mt-5">{{ config('app.name') }}</h1>
                <p>This awesome blog has many articles, click the button below to see them</p>
                <br>
                <a href="/blog" class="btn btn-outline-primary">Show Blog</a>
            </div>
        </div>
    </div>
@endsection
```

This is what is should look like in the browser. The `Show Blog` button will show the blog page, which we will design next.

![Home Page](/engineering-education/laravel-beginners-guide-blogpost/10_home.png)

#### 3. Designing the blog page
In our current blog page, we are returning raw json data to user. 

In this section, we will return a view to the user, to do this, we can use a method that Laravel gives. Instaed of saying `return $posts` we say `return view('view.name', [$data]);` so, we will modify the code in `BlogPostController.php` within the `index()` method to return a view instead of a json file.

Before we modify the code, first go to `resources/views` folder and create a folder named `blog` and in that folder create a view file named `index.blade.php`, this will be our index method view or the view to show all the blog posts.

Then modify the code in your `BlogPostController.php` in `index()` method to look like this:
```php
...

public function index()
{
	$posts = BlogPost::all(); //fetch all blog posts from DB
	return view('blog.index', [
            'posts' => $posts,
        ]); //returns the view with posts
}

...
```

With this, we will have access to a variable called `$posts` inside our view which is an object containing multiple blog posts.

Now let's design our blog posts page. 

The code will look like this:
```html
@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-12 pt-2">
                 <div class="row">
                    <div class="col-8">
                        <h1 class="display-one">Our Blog!</h1>
                        <p>Enjoy reading our posts. Click on a post to read!</p>
                    </div>
                    <div class="col-4">
                        <p>Create new Post</p>
                        <a href="/blog/create/post" class="btn btn-primary btn-sm">Add Post</a>
                    </div>
                </div>                
                @forelse($posts as $post)
                    <ul>
                        <li><a href="./blog/{{ $post->id }}">{{ ucfirst($post->title) }}</a></li>
                    </ul>
                @empty
                    <p class="text-warning">No blog Posts available</p>
                @endforelse
            </div>
        </div>
    </div>
@endsection
```

In this page, the blade will loop through posts (if it’s not null) and spit a link to the particular post and with a post title as the link text. 

It will attach the post ID to the link.

`<li><a href="./blog/{{ $post->id }}">{{ ucfirst($post->title) }}</a></li>`
- `./blog/{{ $post->id }}` – A BlogPost ID is attached to the URLs so the formed URL example for post 5 will be `http://127.0.0.1:8000/blog/5`
- `{{ ucfirst($post->title) }}` – Post title formatted with each first letter as capital letter.
- The Add Post button will help us create a new Post.

The page will look like this in the browser:

![Blog Page](/engineering-education/laravel-beginners-guide-blogpost/11_blog_page.png)

#### 4. Designing the BlogPost page (`http://127.0.0.1:8000/blog/5`)
In our current blog-post page, we are still returning raw json data to the user, in this section, we will return a view to the user. 

We will modify the code in `BlogPostController.php` in `show()` method to return a view instead of json data.

Before we modify the code, we must first go to `resources/views/blog` folder to create a view file named `show.blade.php`, this will be our show method view or the view to show in a particular blog post.

Then modify the code in your `BlogPostController.php` in `show()` method to look like this:

```php
...

public function show(BlogPost $blogPost)
{
    return view(‘blog.show’, [
        ‘post’ => $blogPost,
    ]); //returns the view with the post
}

...
```

With this, we will have access to a variable called `$post` inside our view which is the object containing the blog post we want to display.

Now let us design our blog post page. 

The code will look like this:
```html
@extends('layouts.app')
@section('content')
    <div class="container">
        <div class="row">
            <div class="col-12 pt-2">
                <a href="/blog" class="btn btn-outline-primary btn-sm">Go back</a>
                <h1 class="display-one">{{ ucfirst($post->title) }}</h1>
                <p>{!! $post->body !!}</p> 
                <hr>
                <a href="/blog/{{ $post->id }}/edit" class="btn btn-outline-primary">Edit Post</a>
                <br><br>
                <form id="delete-frm" class="" action="" method="POST">
                    @method('DELETE')
                    @csrf
                    <button class="btn btn-danger">Delete Post</button>
                </form>
            </div>
        </div>
    </div>
@endsection
```

`{!! $post->body !!}` – We have used this directive to make sure we allow HTML in the body to be displayed as bold text.

`<a href="/blog/{{ $post->id }}/edit" class="btn btn-outline-primary">Edit Post</a>` - This will be clicked to edit the post.

```html
<form id="delete-frm" class="" action="" method="POST">
    @method('DELETE')
    @csrf
    <button class="btn btn-danger">Delete Post</button>
</form>
```

This form will be used to delete the post. The `@method(‘DELETE’)` directive creates a field that will override the default post method to the `DELETE` method. The same will happen for the `@csrf` directive. 

As shown below:

![csrf and method expands](/engineering-education/laravel-beginners-guide-blogpost/12_expand.png)

The `Go Back` button will take us back to the Blog page.

This is how our page will look like in the browser now.

![Blog post Page](/engineering-education/laravel-beginners-guide-blogpost/13_blog_post_page.png)

##### 5. Create a new post page
We have already created a route for this page `http://127.0.0.1:8000/blog/create/post`.

We will first modify the code in `BlogPostController.php` file in `create()` method to return the view.

Before we modify the code, first go to `resources/views/blog` folder and create a view file named `create.blade.php`, 
this will be our create method view or the view to show a form needed to create blog post.

The `create()` method code will look like this:
```php
...

public function create()
    {
        return view('blog.create');
    }
...
```

Now let us design our view. 

The code will look like this:
```html
@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-12 pt-2">
                <a href="/blog" class="btn btn-outline-primary btn-sm">Go back</a>
                <div class="border rounded mt-5 pl-4 pr-4 pt-4 pb-4">
                    <h1 class="display-4">Create a New Post</h1>
                    <p>Fill and submit this form to create a post</p>

                    <hr>

                    <form action="" method="POST">
                        @csrf
                        <div class="row">
                            <div class="control-group col-12">
                                <label for="title">Post Title</label>
                                <input type="text" id="title" class="form-control" name="title"
                                       placeholder="Enter Post Title" required>
                            </div>
                            <div class="control-group col-12 mt-2">
                                <label for="body">Post Body</label>
                                <textarea id="body" class="form-control" name="body" placeholder="Enter Post Body"
                                          rows="" required></textarea>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="control-group col-12 text-center">
                                <button id="btn-submit" class="btn btn-primary">
                                    Create Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

@endsection
```

This form will submit a POST request to this route `http://127.0.0.1:8000/blog/create/post`.

The `@csrf` directive will expand in the browser to give us the token field in the form.

The page will look like this in our browser.

![New post Page](/engineering-education/laravel-beginners-guide-blogpost/14_new_post_form.png)

#### 6. Accepting and saving the submitted post
Inside our `BlogPostController.php` in the `store()` method we will implement the code to save the post to the database the redirect the user to the created post.

The code will look like this:
```php
...

public function store(Request $request)
    {
        $newPost = BlogPost::create([
            'title' => $request->title,
            'body' => $request->body,
            'user_id' => 1
        ]);

        return redirect('blog/' . $newPost->id);
    }
...
```

Here, we are using the `Model::create()` static method that accepts an associative array with keys being the table field and value being the data to be inserted in the table.

Here, we are assigning our post to `user_id` 1. You can learn about Laravel authentication later to learn how to associate a post with the logged in user, Laravel has many authentication techniques. You can see them [here](https://laravel.com/docs/8.x/authentication).

The return value is a redirection that will redirect to our single post route with the ID of the post.

Now, before we finish we have to modify our model (`BlogPost.php`) to show the fields that are fillable so as to protect them from unwanted entries. 

The modified model will look like this:
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'body', 'user_id'];
}
```

With that, we are done adding a post.

#### 7. Editing a post
We have already created a route for this page `http://127.0.0.1:8000/blog/{blogPost}/edit`.

We will first modify the code in the `BlogPostController.php` file in the `edit()` method to return the view.

Before we modify the code, first go to `resources/views/blog` folder create a view file named `edit.blade.php`, this will be our edit method view or the view to show a form to edit blog post.

Then modify the code in your `BlogPostController.php` file in the `edit()` method to look like this:
```php
...

public function edit(BlogPost $blogPost)
{
	return view(‘blog.edit’, [
‘post’ => $blogPost,
]); //returns the edit view with the post
}

...
```

With this, we will have access to a variable called `$post` inside our view which is the object containing the blog post we want to edit.

The view will look like this:
```html
@extends('layouts.app')

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-12 pt-2">
                <a href="/blog" class="btn btn-outline-primary btn-sm">Go back</a>
                <div class="border rounded mt-5 pl-4 pr-4 pt-4 pb-4">
                    <h1 class="display-4">Edit Post</h1>
                    <p>Edit and submit this form to update a post</p>

                    <hr>

                    <form action="" method="POST">
                        @csrf
                        @method('PUT')
                        <div class="row">
                            <div class="control-group col-12">
                                <label for="title">Post Title</label>
                                <input type="text" id="title" class="form-control" name="title"
                                       placeholder="Enter Post Title" value="{{ $post->title }}" required>
                            </div>
                            <div class="control-group col-12 mt-2">
                                <label for="body">Post Body</label>
                                <textarea id="body" class="form-control" name="body" placeholder="Enter Post Body"
                                          rows="5" required>{{ $post->body }}</textarea>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="control-group col-12 text-center">
                                <button id="btn-submit" class="btn btn-primary">
                                    Update Post
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>

@endsection
```

This will show a prefilled form.

`@method('PUT')` – This will expand to a input field that will be used to override the default POST verb like we saw with the `@method('DELETE')`.

#### 8. Updating the post
Inside our `BlogPostController.php` file in our `update() method we will implement the code to save the post to the database then redirect the user to the edited post.

The code will look like this:
```php
...

public function update(Request $request, BlogPost $blogPost)
    {
        $blogPost->update([
            'title' => $request->title,
            'body' => $request->body
        ]);

        return redirect('blog/' . $blogPost->id);
    }

...
```

Here, we are using the `$modelInstance->update()` method that accepts an associative array with keys of the table field and the value will be the data to we are updating.

That’s all we need to update our post.

#### 9. Deleting a post
Inside our `BlogPostController.php` file in our `destroy()` method we will implement the code to save the post to the database then redirect the user to the edited post.

The code will look like this:
```php
...

public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect('/blog');
    }

...
```

Here, we are using the `$modelInstance->delete()` method that will delete the post from database.

That’s all that is needed to delete a post.

### Conclusion
With this article, we have learned how to create a Laravel project from scratch, we used the example of a functional blog.

This was a beginner course, so I didn’t want to overwhelm you with a lot of information. But you have at least learned all the Laravel core concepts starting from models, controllers, views, routes, migrations, and factories. 

You have learned the major actions needed for any application, such as Create, Update, Read and Deleting data. Also known as CRUD.

With that knowledge, you can now improve the application to add more functionalities.

For full Laravel documentation click [here](https://laravel.com/docs/8.x/).

---
Peer Review Contributions by: [Michael Barasa](/engineering-education/authors/michael-barasa/)






