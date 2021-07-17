### Introduction

Laravel framework has several features easing the development process.   
In this tutorial, I'll show you how to use Laravel collections, which work just like PHP arrays, although with additional wrapper features. We'll see how to use them in our codes with a simple demonstration project.  

### Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [What is a Laravel collection?](#what-is-a-laravel-collection)
- [Creating Laravel collections](#creating-laravel-collections)
- [Eloquent ORM Collections](#eloquent-orm-collections)
- [Finding data](#finding-data)

### Prerequisites

- This tutorial requires the reader to create a Laravel project to follow along. Additionally, you should have basic knowledge of Laravel, especially routing and controllers.

### Objectives

This tutorial teaches you everything you need to know about Laravel collections. By the end, you should have substantial know-how to get you started.

### What is a Laravel collection?

It's a modified class version of PHP arrays located in the ` Illuminate\Support\Collection ` providing a wrapper to work with arrays of data.  

Consider the following code snippet:  

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

In the above snippet, we use the `collect()` method to create a Collection instance from the defined array modifying each element to uppercase then removing empty elements. We can as well see that this class allows us to chain different methods to achieve our objective.

In the next section, let's see how we can create collections.  

### Creating Laravel collections

There are two ways to create a Laravel collection

1. Using the `collect()` method on arrays:

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

In the above code snippet, we declare an array and pass it to the `collect()` helper method to create a collection.  

1. Using a Collection class instance.

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

In the above code, we instantiate the `Illuminate\Support\Collection` class and pass it our arrays to create a collection.

You can use either of the two ways to create your Laravel collections.  

### Eloquent ORM Collections

ORM (object-relational mapping), is a technique for database data manipulation. Therefore we'll use the Eloquent ORM to return these data as a collection.  For us to demonstrate this, let's create a simple database with dummy data and try to manipulate them using the Laravel collections.

Let's first edit our environmental variables as shown below:

```properties
..............................................
DB_CONNECTION=mysql # we're using MySQL but you can modify it to meet your requirements
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=collections
DB_USERNAME=EnterYourUsername
DB_PASSWORD=EnterYourDBPassword
...............................................
```

Now let's seed our `User` table as follows:

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

In the `database/seeders/DatabaseSeeder`, add the following:  

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

Now seed the database by running the following command on your project root:  

```bash
 php artisan db:seed

 # expected seeding output
Seeding: Database\Seeders\UserSeeder
Seeded:  Database\Seeders\UserSeeder (72.82ms)
Database seeding completed successfully.
# if you don't get this output, check if you have added the UserSeeder in the DatabaseSeeder call method

```

Now that we've set up our logic, let's query our database to return all users.

```php
 //get users from db
public function get_db_users(){
    dd(User::all());
}
```

Output:  
[Collections Output](/engineering-education/laravel-collections/collection.png)

From the screenshot above, you realize that the `lluminate\Database\Eloquent\Collection {#1210 ▶}` class is returned.  With this collection, you can then chain different methods on the output and manipulate data, however, you like.

### Finding data

Previously, we've seen how to create collections, but how can we find data in these collections we create?   
In this section, I'll show you a few tricks on how to find data in a collection.  

1. Using `where()` method

We use this method to filter a collection using the `key/value pair.
Let's create a collection with data and filter it using the `where` method. 

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
# NOTE: this is an output on the browser
[{"Tutorial":"Laravel Collection","price":250}]
```

In the above code, we create a collection and then apply the filter `where()` method to return data we specify/ empty if there is no match.   

2. Using `contains()` method

As the name suggests, use this method to check where a given item is available in a collection or not. Let's look at an example:  

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
In the above snippet, we check whether an item exists in the collection. If it exists, it returns `true` otherwise `false`.   

For a complete set of methods that you may use in the collection, check them [here](https://laravel.com/docs/8.x/collections).   

### Conclusion

In this tutorial, I've tried to explain the usage of Laravel collections.  
I've also set up a database that returns a collection. We also looked at how we can chain different methods on a collection to return a set of data depending on our requirements.   

