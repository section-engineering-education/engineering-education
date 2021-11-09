---
layout: engineering-education
status: publish
published: true
url: /laravel-8-collections/
title: Understanding Laravel 8 Collections
description: This tutorial will guide the reader on how to retrieve and manipulate data using Laravel collections. We will build a simple project to showcase the full power of this component.
author: odongo-albert
date: 2021-08-09T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/laravel-8-collections/hero.jpg
    alt: Understanding Laravel 8 Collections
---
The Laravel framework has numerous features that ease development. This article will focus on Laravel collections. We will build a simple project to showcase the full power of this component.
<!--more-->
### Table of contents
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Defining Laravel collections](#defining-laravel-collections)
- [Creating Laravel collections](#creating-laravel-collections)
- [Eloquent ORM Collections](#eloquent-orm-collections)
- [Finding data](#finding-data)

### Prerequisites
To follow this article along, you need some basic knowledge of Laravel and PHP.

### Objectives
This tutorial will help you understand Laravel collections and how they can be implemented in a web project.

### Defining Laravel collections
Laravel collections can be regarded as modified versions of PHP arrays. They are located in the `Illuminate\Support\Collection` directory and provide a wrapper to work with data arrays.

We create Laravel collections using the following code snippet:  

```php
//creating a test for collection for insights
public function collect(){
    //return the collection in uppercase
    return collect(['john', 'doe', null])->map(function ($test_name) {
        return strtoupper($test_name);
    })->reject(function ($test_name) {
        return empty($test_name);
    });
}
```

Output:

```bash
["JOHN", "DOE"] # output displayed on the browser
```

In the code snippet above, we used the `collect()` method to create a `Collection` instance from the defined array.

We then modified each element to uppercase and remove empty elements. Laravel collections allow us to use several methods to analyze data.

### Creating Laravel collections
We can create a Laravel collection using two major ways:

1. Using the `collect()` method:

```php
<?php
........................
//using the collect() helper
public function test_helper_collection(){
    $my_test_array=['john','doe'];
    return collect($my_test_array);
}
............................................

```

In the code above, we declared an array and passed it to the `collect()` helper method which then created the Laravel collection.  

2. Using a `Collection` class instance.

```php
<?php
...........................................
//using the Collection instance
    public function test_collection_instance(){
        $my_test_array=['john','doe'];
        return new Collection($my_test_array);
}
..............................
```

In the code above, we instantiated the `Illuminate\Support\Collection` class and included our array. The class then converted the array to a collection.

### Eloquent ORM collections
ORM (Object Relational Mapping) is a database manipulation technique. Therefore, we will use the `Eloquent ORM` to return these data as a collection.

Let's create a simple database with dummy data and try to manipulate it using Laravel collections.

The first step is to edit our project's `environmental variables`, as shown below:

```bash
..............................................
DB_CONNECTION=mysql # we're using MySQL but you can modify it to meet your requirements
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=collections
DB_USERNAME=EnterYourUsername
DB_PASSWORD=EnterYourDBPassword
...............................................
```

Now, let's seed our `User` table as follows:

```bash
# create user seeder
php artisan make: seeder UserSeeder
```

Then edit the `database/seeders/userSeeder` as follows:

```php
<?php
............................................
/**
 * here, we are running the database seeds to create random users.
 *
 * @return void
 */
public function run()
{
    ................................................
    // 
    DB::table('users')->insert([
        //generate random string name with 8 characters
        'name' => Str::random(8),
        //generate random string email with 6 characters
        'email' => Str::random(6).'@gmail.com',
        //hasing the password
        'password' => Hash::make('password'),
    ]);
}
.....................................
```

In the `database/seeders/DatabaseSeeder` file, add the following code:  

```php
<?php
..............................................
/* When you run db: seed, this is the seeder run by default
*
* @return void
*/
public function run()
{
    // call UserSeeder upon seeding your database
    $this->call([
        UserSeeder::class,
    ]);
}
```

We can now seed the database by running the command below:  

```bash
 php artisan db:seed

 # expected seeding output
Seeding: Database\Seeders\UserSeeder
Seeded:  Database\Seeders\UserSeeder (72.82ms)
Database seeding completed successfully.
# if you don't get this output, check if you have added the UserSeeder in the DatabaseSeeder call method
```

Since we've set up our logic, let's now query our database to return all users.

```php
 //get users from db
public function get_db_users(){
    dd(User::all());
}
```

Output:

![Collections Output](/engineering-education/laravel-8-collections/collection.png)

In the image above, the `lluminate\Database\Eloquent\Collection {#1210 ▶}` class returns a collection. We can therefore use different methods to analyze the data.  

### Finding data
In this section, we will learn how to find data in a collection. 

Some of the techniques that we can use are discussed below:

1. The `where()` method.
In this method, we filter a collection using the `key/value` pair.

Let's create a collection with data and filter it using the `where()` method. 

```php
.................................................
  ///filter a collection using the where() method
public function apply_where_on_collections(){
    $collection = collect([
        ['Tutorial' => 'Laravel Collection', 'price' => 250],
        ['Tutorial' => 'Introduction to Laravel 8', 'price' => 140],
        ['Tutorial' => 'Laravel Cron Jobs', 'price' => 300],
        ['Tutorial' => 'Laravel Tests', 'price' => 400],
    ]);
    //filter to get a tutorial which costs $250.
    $filtered = $collection->where('price', 250);
    //return the result
    return $filtered->all();
}
........................................
```

Result:

```bash
[{"Tutorial":"Laravel Collection","price":250}]
``` 

2. The `contains()` method.
We use the `contains()` method to check whether a given item is available in a collection or not.

Let's look at the example below:

```php
<?php
..............................
//filter method to check item exisitence
public function apply_contains_on_collections(){
    $collection = collect([
        ['Tutorial' => 'Laravel Collection', 'price' => 250],
        ['Tutorial' => 'Introduction to Laravel 8', 'price' => 140],
        ['Tutorial' => 'Laravel Cron Jobs', 'price' => 300],
        ['Tutorial' => 'Laravel Tests', 'price' => 400],
    ]);
    //returns true/false
    dd($collection->contains('Tutorial','Laravel Collection'));
}
...............................................
```

Output:

```bash
True
```

In the example above, we checked whether an item exists in the collection and returned a boolean value depending on its availability.   
  
### Conclusion
In this tutorial, we have learned how to use Laravel collections. We have also learned how to set up a database and retrieved data using a collection.

You can now use this knowledge to craft quality Laravel applications.

Happy coding!

### Further reading
- [Laravel collections](https://laravel.com/docs/8.x/collections)

---
Peer Review Contributions by: [Wanja Mike](/engineering-education/content/authors/michael-barasa/)
