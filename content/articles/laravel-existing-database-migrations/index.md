---
layout: engineering-education
status: publish
published: true
url: /laravel-existing-database-migrations/
title: Running Laravel Migrations on an Existing Database
description: In this article, we will learn how to run Laravel migrations on an existing database
author: terrence-aluda
date: 2021-12-03T00:00:00-11:10
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/laravel-existing-database-migrations/hero.jpg
    alt: Running Laravel migrations database Hero Image
---
In this article we will run migrations on an existing database using Laravel with a sample table without installing any package.
<!--more-->
Imagine your company needs to change and use Laravel from the raw PHP technology or shift from another framework to Laravel. In addition to this, there is an existing database with thousands, if not millions, of records.

Would you delete the database first and run fresh Laravel migrations? Or would you create fresh migrations and do some fragile data exportations? You could also advise the company on the complexity of the issue, right?

All the options discussed above are not the best suitable option. We need a way to run our migrations on the existing tables carefully. This article will show how to do that without interfering with any preexisting data.

### Table of contents
- [Table of contents](#table-of-contents)
- [Brief overview](#brief-overview)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Modifying the model file](#modifying-the-model-file)
- [Modifying the migration file](#modifying-the-migration-file)
- [Running the migrations](#running-the-migrations)
- [Summary](#summary)
- [Conclusion](#conclusion)

### Brief overview
When we want to create a database table in Laravel, we first need to create the table’s model. Next, in the model, we set the table name and its fields. Then, we create the migration for the table using the model’s values. 

A migration file contains the fields’ names and data types. Laravel, by default, creates timestamp fields for the table together with the fields you provided. But what if you don’t want the timestamp fields? How would you approach this? 

Then, we run all the migrations, we create the tables in the database we specified in our environment variables. Laravel’s official [documentation](https://laravel.com/docs/8.x/eloquent) only caters to freshly created tables and databases. It does not show how to handle already existing ones.

We will see how to do this for existing tables and databases. This article is based on Laravel’s Eloquent ORM, which I have given the link pointing to its documentation. Eloquent Object Relational Mapper (ORM) gives us an easier way to manipulate our database without caring much about the SQL query codes. For raw database manipulation, you can find more about them [here](https://laravel.com/docs/8.x/database).

### Prerequisites
The article is a bit advanced, so a prior experience with Laravel is required. You can check the basics of creating a Laravel application [here](/engineering-education/laravel-beginners-guide-blogpost/) where you will go through a step by step process of creating a blog. Moreover, you need a knowledge of PHP.

### Getting started
We will create some migration on an existing database shown in these screenshots. It does not have many records. It’s only for demonstrating the article.

![database screenshot](/engineering-education/laravel-existing-database-migrations/screen-one.png)

As we can see, it has five fields:
1. ID
2. SUB_NAME
3. CLASS_NAME
4. TEACHER_CODE
5. STATUS

The table is named *class_subjects* and the database, *terrence_time*. You can choose your preferred name. We proceed to create a simple Laravel application. For this article, let's call it *migration-test*.

```bash
    $laravel new migration-test
```

Next step is to create the Laravel model and the migration.

```bash
$php artisan make:model class_subjects -m
```

The `-m` flag creates the corresponding migration. Otherwise, you can do both of them as shown below:

#### Model
```bash
$php artisan make:model class_subjects
```

#### Migration
```bash
$php artisan make:migration class_subjects
```

When you check your working directory, you will see the migration and model files.

![migration screenshot](/engineering-education/laravel-existing-database-migrations/screen-two.png)

*Migration file (It’s the bottom-most one)*

![model screenshot](/engineering-education/laravel-existing-database-migrations/screen-three.png)

*Model file (The topmost one)*

### Modifying the model file
```php
<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class class_subjects extends Model
{
    use HasFactory;
    protected $table = ‘class_subjects’;
    public $timestamps = false;
    protected $primaryKey = ‘ID’;
    protected $fillable = [‘ID’,‘SUB_NAME’,‘CLASS_NAME’,‘TEACHER_CODE’,‘STATUS’];
}
```

We add the table name and the fields in the table. `$fillable` in Laravel is used to set fields that are mass-assignable. There is also `$guarded`, which sets fields that cannot be mass-assigned(protected fields). In this case, we want all our fields to be modifiable. We will use `$fillable`.

> Mass-assigning is modifying the values of multiple fields all at once using a data structure such as an array.

We set the timestamps variable to `false` since we had not added timestamp fields to our table. Setting this to `false` instructs Laravel not to create the default timestamp fields.

### Modifying the migration file
```php
<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateClassSubjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable(‘class_subjects’)) {
            // Code to create table
            Schema::create(‘class_subjects’, function (Blueprint $table) {
                $table->id();
                $table->integer(‘ID’);
                $table->string(‘SUB_NAME’, 30);
                $table->string(‘CLASS_NAME’, 30);
                $table->integer(‘TEACHER_CODE’);
                $table->string(‘STATUS’, 30);
            });
        }
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(‘class_subjects’);
    }
}
```

Here, we check first if the table exists, as is the norm, using this `if` statement:
```php
if (!Schema::hasTable(‘class_subjects’)){
    //code
}
```

We do that so that Laravel does not replace our existing table. If it does not exist, then it creates the table with the predefined fields. You can leave the code inside the `if` statement empty since we already have the table. But due to proper coding ethics, we add the code.

### Running the migrations
If you’re working in your localhost, you can run the migrations using this terminal command:
```bash
$php artisan migrate
```

If you’re on a live server, you will have to run a script that automatically runs the migration. For simplicity, we will put our code in the `routes/web` file and call the route by typing it in the browser.
```php
Route::get(‘run-migrations’, function () {
    try {
        //the migrate command
        return Artisan::call(‘migrate’);
    } catch (Exception $e) {
        //get the error message and display the error
        $e->getMessage();
        print($e);
    }
});
```

On a successful run, we should find the migrations in the phpMyAdmin.

![migration two](/engineering-education/laravel-existing-database-migrations/migration-two.png)

Opening it, we should see:

![migration three](/engineering-education/laravel-existing-database-migrations/migration-three.png)

We will also see that our table is untampered with.

![final table screenshot](/engineering-education/laravel-existing-database-migrations/screen-final.png)

That’s it.

### Summary
In a nutshell, we created a Laravel application, added the model and the migration, then ran the migrations to suit an already created table.

This was an article for Laravel, but you can use the same logic to the technology that you use. I hope you got some insights. 

Have a great coding adventure.

---
Peer Review Contributions by: [Okelo Violet](/engineering-education/authors/okelo-violet/)
