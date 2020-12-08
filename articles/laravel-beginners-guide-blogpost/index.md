---
layout: engineering-education
status: publish
published: true
url: /engineering-education/laravel-beginners-guide-blogpost/
title: Building Your First Laravel Application (Blog Application)
description: This article will show a developer how to use Kotlin extensions, understanding when and how to use them.
author: 
date: 2020-12-08T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/laravel-beginners-guide-blogpost/hero.jpg
    alt: kotlin extensions image
---
Short version, Laravel is a PHP MVC Framework. Long version, Laravel is a free and open-source PHP Framework for Web Artisans based on Symfony which helps craft Web Applications following the MVC (Model View Controller) design pattern.
<!--more-->
### Laravel Tutorial: Step by Step Guide to Build Your First Laravel Application (Blog Application)
- **Framework:** Laravel 
- **Author:** Taylor Otwell
- **Initial Release Date:** June 2011
- **Current Version:** 8 (September 8th, 2020)
- **Stable Release:** 8.11.2 (October 28th, 2020)
 
### What is Laravel?
For us to understand Laravel better, we will build a simple blog application with Laravel from scratch.
Requirements.

To create a Laravel application you will need a few tools installed in your computer. 
These tools include:-

- PHP >= 7.3.
- Database (MySql).
- A localhost Web Server – In our case we will use WAMP (for Windows), LAMP (for Linux), or MAMP (for MacOs). This localhost webserver comes installed with latest PHP and MySQL database so you will not need to install them manually.
To install either MAMP, LAMP, or WAMP go to http://ampps.com/downloads and choose the software your platform.
- Composer – This is a dependency management software for PHP. To install the composer visit https://getcomposer.org/ and download it there for your platform.
- Node JS – This is a free and open source JavaScript runtime environment that executes JavaScript outside of the browser. We will not write any NodeJS code but it will be used in the background by Laravel to streamline our development.
- Code editor – A code editor will be required. Use Visual Studio Code; it is free.
- A browser – Google Chrome, Edge, Safari, or Mozilla Firefox will do just fine.
- Knowledge of PHP Programming Language.

With our machine setup, it's time to start developing.

### Crafting a new Laravel Application
There are two ways to create a Laravel application; one is using the Laravel installer and the other is through requiring the Laravel package; using composer create-project command. For this tutorial we will use the latter.
- Open your console and cd to www directory in your MAMP, LAMP, or WAMP installation directory.
- Type the following command:-

  ```sh
  composer create-project --prefer-dist laravel/laravel my-blog
  ```
It will create a directory called `my-blog` and load all the primary Laravel files there. 

### Configuring our Laravel Application
After installing our Laravel application we will need to configure our database for it to work.
- Go to `http://localhost/phpmyadmin/ `
- Create a new Database by clicking on new (shown below in red)

![new data base](images/1_db_create.PNG)

- Name it `my_blog` and click Create

    Now that we have a database we can proceed to set up the application to work with the database.

-	Open your file explorer and navigate to `my-blog` folder
-	Open the `.env` file in your code editor
-	Change the following in the file:-

        `APP_NAME` key to name of your blog i.e. “My Blog”

        `DB_DATABASE` key to database name i.e. my_blog

The final file should look like this

```env
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

With everything configured it's time to run our app and see what it is. To run the Application, type the following command. 
```sh
php artisan serve
```
It will start the Application and give you a URL, mostly `http://127.0.0.1:8000` open the URL in your browser and see the Application (shown below)

![home-page](images/2_home.PNG)

### Understanding the Laravel Application file structure.
Before we start coding, let us understand the file structure of a Laravel application. 
For example, most of you don't understand why we changed the `.env` file. Below is the Laravel App file structure

![files](/engineering-education/laravel-beginners-guide-blogpost/images/3_files.PNG)

`app` folder – this contains all the logic in our application, this includes the models, controllers, service providers e.t.c

![app files](/engineering-education/laravel-beginners-guide-blogpost/images/4_app_files.png)

As a beginner you will spend most of your time in Models and Controllers folders, these are what we will discuss in details.
- `Models` folder- This is where the business logic of your App is stored in a model is a representation of a real life object e.g. a blog post. 
Models will be generated using php artisan command make:model and follow a convention of singular title case wording e.g. for a blog post model we will call it BlogPost.php.

    > Note: Laravel comes with User.php Model out of the box which defines user details
		
-	`Http/Controllers` folder – This will contain all the controller files of your application. 
A controller creates a link between your Models and your Views e.g. When a new blog post form is submitted by the user, the data comes into the controller where it is sanitized and then passed to the model to be stored in the database, then the controller sends feedback back to the view saying the blog post has been created.
Controllers will be generated using php artisan command make:controller and follow a convention of singular title case wording with the word Controller trailing e.g. for a blog post controller we will call it BlogPostController.php
A controller has 7 signature methods that enables crud operations.

        - `index()` – to fetch all the resources e.g. all blog posts available.
        - `show()` – to fetch a single resource e.g. a single blog post, say, post 5.
        - `create()` – shows the form to use to create a resource (not available for API controllers).
        - `store()` – to commit the resource to database e.g. save blog post.
        - `index()` – to show the form to edit the resource (not available for API controllers).
        - `update()` – to commit the edited resource to database.
        - `destroy()` – to delete a resource from database.

- `Http/Middleware` folder – This contains all the middleware, a middleware is code that is to be executed before the request gets to the controller e.g. Authenticating a user before allowing access.
- `Exceptions` folder – This contains all the Exception handling in your App, you can add custom exceptions here too.
- `Console` folder – This contains all the PHP artisan commands (PHP Artisan is the command line tool that ships with Laravel to help us design our application faster). These commands are used to create application files and also do some actions like start development server example of artisan command is the one we ran at the beginning after installing Laravel i.e. php artisan serve.
- `Providers` folder – This contains all the service providers in your App, a service provider in Laravel is a group of code that does specific task across the app whenever needed to e.g. A billing service provider will be designed to allow multiple payment platforms but all you have to do is call the service provider and it will dynamically provide a payment platform instead of specifying a platform in the controller.
        
    >NOTE: Service Providers are a hard concept to grasp for beginners, but once you get used to them they are really handy.

`bootstrap` folder – This contains the app file that bootstraps the framework by initializing it (setting up path & environment), it also contains the cache folder which contained framework generated files for the optimization of the app.

>NOTE: bootstrap folder has nothing to do with Bootstrap CSS Framework.

`config` folder – This contains all the configuration files of the App. To get a certain configuration, Laravel provides a helper method to do it i.e. config method.
For example: - getting the App name we use:-
 ```php
config('app.name', 'Default Name')
```
		 
In that example app is the configuration file we are looking in, name is the key while 'Default Name' is the name that will be used in case the key or file does not exist.

`database` folder – This folder contains database migrations, factories and seeds. Migrations are database tables definitions i.e. columns and their datatypes, necessary keys definitions e.t.c, factories are blueprints used to create sample data for the database while the seeds are the sample data for our database, well, they are actually commands that trigger creation of sample data when ran. You can also choose to store the SQLite database files here too.
>Note: Laravel comes with users_table migration and UserFactory.php factory out of the box which will help create users table and define sample data for our users table.


`public` folder – this folder contains the index file which is the entry point of the app, once the request is made, it hits that file and then directed to the necessary route. We will learn about routes later. You can also store public assets here like public images, css, js e.t.c

`resources` folder – This folder contains our app's compliable source files, these include views, sass and raw JavaScript (mostly nodeJS, or from JS Frameworks) files. Views are made using HTML with a mixture of a laravel templating engine called blade, we will learn about it later.

`routes` folder – this folder contains all the route files to our app, these route files include web.php, api.php, channels.php, console.php. Each files contains multiple routes as defined by the user. A route is simply a web address that points to a certain function either in the routes file or in the controller.

`storage` folder – this contains all the private files, e.g. customer profile pictures, a dynamic link can be created from here to public though. Also, all the app logs are stored here.

`tests` folder – This is where your app tests are stored.

`vendor` folder – this is where all third party packages brought by composer are stored

`.env` file – This file contains the environment variables these variables are brought in through config files using the `env` helper method.
 ```php
env('KEY','default')
```
>NOTE: Avoid using env() helper method inside your code, only use it in config files. This is because, during deployment when you cache the environment (you will learn how) all the environment variables will be loaded to config and the .env file will be dropped.

### Understanding a request lifecycle.
Laravel like any other serverside platform, works on a request response model, i.e. the user sends a request and they get a response in return.

For illustration, let's assume the user wants to read a blog post 5, they will send a get request to fetch that post; the request route (URL) will be as follows http://my-blog.test/blog/5

First, the request will go to `public/index.php` file, the app will register a new request and check the `routes/web.php` file to see if the route is registered, in not, it throws a 404 error, otherwise, the app checks if there are any middleware which needs to be ran before the request is forwarded to the controller method assigned to the route. Once all the middleware have been executed, the request is forwarded to the necessary method, in this case, the method will be `show()` in `BlogPostController.php`.

Inside the controller, the request is executed i.e. the post is fetched from the database then the BlogPost object is passed to the view and the user receives the view as a response. The view is then rendered in the browser.

That finalizes the request process.

### Let's code!
Now that we have understood how a request works and different files and folders of a Laravel application, we will start developing our blog now.

#### Making BlogPost Model
First, we will create a BlogPost Model, to create a model, we use the php artisan `make:model` command followed by the name of the model.

```sh
php artisan make:model BlogPost
```
This will create a file called `BlogPost.php` inside our `App/Models` Folder, and ladies and gentlemen, that's all you need to do to create a model nothing else.

#### Making `blog_posts` table migration & migrating the database.
Now, let us create a migration for the model. 
To create a migration, we use the php artisan `make:migration` command followed by `action_table_name_table` words. 
In our case:-
```sh
php artisan make:migration create_blog_posts_table
```

>TIP: Always make sure your table name is the plural of your model's name in small letters.

This will create a file inside the `database/migrations` folder. The file will have current timestamp preceding the name you gave in the command e.g. `2020_11_17_163409_create_blog_posts_table.php`.

Once you have created the migration, we have to fill it with the fields we need inside the `Schema::create` method, our final file will look like this:-

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

The three fields I have indicated with block comment are all I added the rest are prefilled;

`$table->id();` - Creates ID field which is also primary key in our table.

`$table->timestamps();` - Creates two TIMESTAMP fields (`created_at` & `updated_at`).

After creating the migration, all we have to do is migrate to create tables in our database. 
To migrate, run the migration command (below). 
This will create tables in the database for us.


```sh
php artisan migrate
```

####Creating a Factory and seed for our `blog_post` table
Now that we have created our table it's time to fill it with data, User factory (`UserFactory.php`) already exists and now we will create a factory for Blog post.
To make a Factory we use the `make:factory` command followed by the name of the class, also we add `-m` flag followed by model name to assign a factory to that model.

```sh
php artisan make:factory BlogPostFactory –m BlogPost
```

Inside the `database/factories` folder, a file will appear with the name `BlogPostFactory.php`

Inside the definition method, we will edit the return array to define our blog post data, we will put the following:-

```php
...

'title' => $this->faker->sentence, //Generates a fake sentence
'body' => $this->faker->paragraph(30), //generates fake 30 paragraphs
'user_id' => User::factory() //Generates a User from factory and extracts id

...
```

Now that we have created our factory, it's time to create a seeder to seed our database.
We will do this using PHP artisan tinker. Tinker is a command line tool that is shipped with Laravel to enable data manipulation without changing the code during development, it is a good tool to do seeding and test relationships

To open tinker, type:-
```sh
php artisan tinker
```

This will fire up a command line that looks like this:-

![Tinker](/engineering-education/laravel-beginners-guide-blogpost/images/5_tinker.png)

Start typing your code there and hit enter to run it. To seed, type:-

```php
\App\Models\BlogPost::factory()->times(10)->create();
```
This will generate 10 blogposts and save them to the database and generate 10 users too, each user will own one blog post.

#### Creating controllers
Controllers help us perform resource manipulation actions i.e. CRUD Ops. 
To create a controller we use the `make:controller` command followed by controller name, to associate the controller with a model you use the `-m` flag followed by model name. 
The naming convention of controllers in Laravel is ModelName followed by the name Controller e.g. for `BlogPost.php` model the controller will be `BlogPostController.php`

This will create a file called `BlogPostController.php` in `app/Http/Controllers` folder.
The file will look like this:-

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

####Working with Routes
Now that we have created our controller let us target one of the method say `index()` using a route. 
All web routes are stored in `routes/web.php` file.

Open the file and you will see the default (root) route to our application, immediately below the root route we will create the blog route which will open blog and show all the posts available. to show that we will have to target the index method inside the `BlogPostController.php` class.

It will be a `get` route since we are fetching data.

Our `routes/web.php` file will look like this:-

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
If you visit that route now, it will show a blank screen. 
In the next sections we will create more routes and implement the methods available.

### Implementing the controller methods.
#### 1. Showing all blog posts with `index()` method.

```php
...

public function index()
{
	$posts = BlogPost::all(); //fetch all blog posts from DB
	return $posts; //returns the fetched posts
}

...
```

If we navigate to `http://127.0.0.1:8000/blog` you will see a JSON dump of the posts available (10 posts). Like this:-
 
![Blog Dump](/engineering-education/laravel-beginners-guide-blogpost/images/6_blog_dump.png)

I have installed a chrome extension called JSON Formatter to help me format the JSON dumped, it's a free plugin, you don't have to install it I you don't need it.

##### 2. Showing one blog post
Create a route to show 1 post i.e. the route will be:-

```php
...

Route::get('/blog/{blogPost}', [\App\Http\Controllers\BlogPostController::class, 'show']);
...
```

Here, we have introduced `{blogPost}` this is called a wildcard – 
this means that `{blogPost}` will be replaced by anything that is typed after `blog/` and that value will get stored in variable called `$blogPost`.

On the show method, we will have:-

```php
...

public function show(BlogPost $blogPost)
{
	return $blogPost; //returns the fetched posts
}

...
```

So, if we visit `http://127.0.0.1:8000/blog/5` it will automatically fetch the BlogPost with id of 5 and store it in `$blogPost` as an instance of BlogPost Model.

This is called route-model binding in Laravel! You provide a route with a wildcard which gets replaced by the value provided in the URL, then Laravel uses that value to try to find the record associated with that value, especially the record with that ID. If it is not found, you get 404 error.

This is the response you will see in your browser:-

![Blog Post](/engineering-education/laravel-beginners-guide-blogpost/images/7_blog_post.png)

>WARNING: The key we use on the wildcard must be the same name as the variable name inside show method for model-route binding to occur. 
>E.g. if in the route wildcard is `{blogPost}` the variable name on `public function show(BlogPost $blogPost)` method has to be `$blogPost`.

#### Working with other methods
So far we have been working on `get` routes only, the `create()` and `edit()` methods will be get verbs too but they are supposed to show the create and edit forms respectfully.

The `store()` method will be a `post` verb since we will be posting the create BlogPost form to store the data, the `update()` method will need a `put` or `patch` verb to update data and the `destroy()` method will need a `delete` verb to delete the post.

We will implement these after we have learnt how to create the user interface, for the time being, we can create their routes.

```php
...

Route::get('/blog/create/post, [\App\Http\Controllers\BlogPostController::class, 'create']); //shows create post form
Route::post('/blog/create/post, [\App\Http\Controllers\BlogPostController::class, 'store']); //saves the created post to the databse
Route::get('/blog/{blogPost}/edit', [\App\Http\Controllers\BlogPostController::class, 'edit']); //shows edit post form
Route::put('/blog/{blogPost}/edit', [\App\Http\Controllers\BlogPostController::class, 'update']); //commits edited post to the database 
Route::delete('/blog/{blogPost}', [\App\Http\Controllers\BlogPostController::class, 'destroy']); //deletes post from the database
...
```

#### Working with Views i.e. designing the User Interface.
Laravel uses a templating engine called blade which is injected into HTML and ends up being evaluated as HTML.

First, we will learn a few blade syntax that will help us get started. We will compare the syntax we use on blade to that of regular PHP inside views:-

![Blade Syntax](/engineering-education/laravel-beginners-guide-blogpost/images/8_blade_syntax.PNG)

>TIP: The PHP syntax is still accepted in Laravel views but as you have seen, it's clumsy. Using blade syntax is better.

Blade has more terms and directive that we need to understand:-
1.	View – an HTML file in Laravel, i.e. user interface
2.	Layout – This is the skeleton of the App, it defines the major elements like headers and footers for consistency and also includes the major scripts and styles.
3.	Component – Components are reusable views, e.g. a button can be a component.

Blade directives and their meaning

![Blade Directives](/engineering-education/laravel-beginners-guide-blogpost/images/9_blade_directives.PNG)

These are the ones we are going to use right now, you can always learn more on Laravel documentation here: https://laravel.com/docs/8.x/blade

With this knowledge now we are ready to design our Laravel app


#### 1. Designing our app layout
Inside the `resource/views` folder create a new folder and name it layouts then create a file in the folder and name it `app.blade.php`.
Below is the final code of how the file will look like.

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

At the title `{{ config('app.name') }}` – Is a Laravel config accessor helper method to access our app name to show as the title of our page.

In the body, `@yield('content)` – is a blade directive that will be used to bring content from children views to the layout.

#### 2. Designing the welcome page
This is the page that we saw when we created our first application, we will redesign it to show the welcome page afresh extending our layout using `@extend` directive. It is located in `resources/views` folder, named `welcome.blade.php`

The final code in the page will look like this:-

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

This is how it looks like in the browser. The `Show Blog` button will show the blog page which we will design next

![Home Page](/engineering-education/laravel-beginners-guide-blogpost/images/10_home.png)

#### 3. Designing the Blog Page
In our current blog page, we are returning raw json data to user. 

In this section, we will return a view to user, to do that, Laravel gives us a method for that. i.e. Instaed of saying `return $posts` we say `return view('view.name', [$data]);` so, 
we will modify the code in `BlogPostController.php` in `index()` method to return view instead of json.

Before we modify the code, first go to `resources/views` folder and create a folder named `blog` and in that folder create a view file named `index.blade.php`, this will be our index method view i.e. the view to show all the blog posts.

Then modify the code in your `BlogPostController.php` in `index()` method to look like this:-

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

With this, we will have access to a variable called `$posts` inside our view which an object containing multiple blog posts.

Now let us design our blog posts page. The code will look like this:-

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
In this page, the blade will loop through posts if it’s not null and spit a link to the particular post and with post title as the link text. 
It will attach the post id to the link.
`<li><a href="./blog/{{ $post->id }}">{{ ucfirst($post->title) }}</a></li>`
- `./blog/{{ $post->id }}` – BlogPost id is attached to the URLs so the formed URL e.g. for post 5 it will be `http://127.0.0.1:8000/blog/5`
- `{{ ucfirst($post->title) }}` – Post title formatted with first letter as capital letter.
- The Add Post button will help us create a new Post.

In the browser the page will look like this:-

![Blog Page](/engineering-education/laravel-beginners-guide-blogpost/images/11_blog_page.png)

#### 4. Designing the BlogPost Page (`http://127.0.0.1:8000/blog/5`)
In our current blog-post page, we are returning raw json data to user, in this section, we will return a view to user. 
So, we will modify the code in `BlogPostController.php` in `show()` method to return view instead of json.

Before we modify the code, first go to `resources/views/blog` folder create a view file named `show.blade.php`, this will be our show method view i.e. the view to show a particular blog post.

Then modify the code in your `BlogPostController.php` in `show()` method to look like this:-

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

With this, we will have access to a variable called `$post` inside our view which an object containing the blog post we want to display.

Now let us design our blog post page. The code will look like this:-
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

`{!! $post->body !!}` – we have used this directive to make sure we allow html in the body to be displayed, e.g. bold text.

`<a href="/blog/{{ $post->id }}/edit" class="btn btn-outline-primary">Edit Post</a>` -
This will be clicked to edit the post.

```html
<form id="delete-frm" class="" action="" method="POST">
    @method('DELETE')
    @csrf
    <button class="btn btn-danger">Delete Post</button>
</form>
```
This form will be used to delete the post. The `@method(‘DELETE’)` directive creates a field that will override the default post method to `DELETE` method. Same will happen for `@csrf` directive. As shown below:-

![csrf and method expands](/engineering-education/laravel-beginners-guide-blogpost/images/12_expand.png)

The `Go Back` button will take us back to the Blog page.

This is how the page will look like in the browser.

![Blog post Page](/engineering-education/laravel-beginners-guide-blogpost/images/13_blog_post_page.png)

##### 5. Create a new post page.
We have already created a route for this page `http://127.0.0.1:8000/blog/create/post`.

We will first modify the code in `BlogPostController.php` in `create()` method to return the view.

Before we modify the code, first go to `resources/views/blog` folder create a view file named `create.blade.php`, 
this will be our create method view i.e. the view to show a form to create blog post.

`create()` method code will look like this:-
```php
...

public function create()
    {
        return view('blog.create');
    }
...
```
Now let us design our view. The code will look like this:-
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

![New post Page](/engineering-education/laravel-beginners-guide-blogpost/images/14_new_post_form.png)

#### 6. Accepting and saving the submitted post
Inside our `BlogPostController.php` in `store()` method we will implement the code to save the post to the database the redirect the user to the created post.

The code will look like this:-
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
Here, we are using the `Model::create()` static method which accepts an associative array with keys being the table field and value being the data to be inserted in the table,

Here, we are assigning our post to `user_id` 1. Later, you can learn about Laravel authentication and know how to associate a post with the logged in user, Laravel has many authentication techniques see them here https://laravel.com/docs/8.x/authentication .

The return value is a redirection which will redirect to our single post route with the ID of the post.

Now, before we finish we have to modify our model (`BlogPost.php`) to show the fields which are fillable so as to protect from unwanted entries. 

The modified model will look like this:-
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
With that, we are done with adding a post.

#### 7. Editing a post.
We have already created a route for this page `http://127.0.0.1:8000/blog/{blogPost}/edit`.

We will first modify the code in `BlogPostController.php` in `edit()` method to return the view.

Before we modify the code, first go to `resources/views/blog` folder create a view file named `edit.blade.php`, this will be our edit method view i.e. the view to show a form to edit blog post.
Then modify the code in your `BlogPostController.php` in `edit()` method to look like this:-

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
With this, we will have access to a variable called `$post` inside our view which an object containing the blog post we want to edit.

The view will look like this:-
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

`@method('PUT')` – will expand to a input field which will be used to override the default POST verb like we saw with the `@method('DELETE')`.

#####8. Updating the post
Inside our `BlogPostController.php` in `update() method we will implement the code to save the post to the database then redirect the user to the edited post.

The code will look like this.
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
Here, we are using the `$modelInstance->update()` method which accepts an associative array with keys being the table field and value being the data to be updated.

That’s all we need to update our post.

#### 9. Deleting a Post
Inside our `BlogPostController.php` in `destroy()` method we will implement the code to save the post to the database then redirect the user to the edited post.

The code will look like this:-
```php
...

public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect('/blog');
    }

...
```
Here, we are using the `$modelInstance->delete()` method which will delete the post from database.

That’s all we need to delete a post.


### Conclusion
With this article you have learned how to create a Laravel project from scratch to a functional blog.

This was a beginner course so I didn’t want to overwhelm you with a lot of information. But you have at least learned all the Laravel core concepts starting from models, controllers, views, routes, migrations and factories. 

You have learned the major actions needed for any application, i.e. Create, Update, Read and Delete data. Also known as CRUD.

With that knowledge you can now extend the application to add more functionalities.

For full Laravel documentation visit https://laravel.com/docs/8.x/ 






