---
layout: engineering-education
status: publish
published: true
url: /laravel-language-localization/
title: Laravel Language Localization
description: This tutorial introduces the basic concepts of localization in Laravel 8.x. This feature ensures that an application adapts to different languages depending on the region.
author: miller-juma
date: 2021-01-19T00:00:00-15:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/laravel-language-localization/hero.jpg
    alt: laravel language localisation
---
Developers can target users from different regions and cultures using language localization. In Laravel, it is easy to implement language localization due to the well-defined file structure. In software applications, language localization refers to how a given product is adapted to a specific language translation depending on regions or countries. 
<!--more-->
### Introduction
A perfect example is an online shopping site such as Alibaba. Chinese citizens can access this site in Chinese while those in other regions such as the US can navigate the e-commerce website using English. This is known as internationalization, commonly denoted as (i18n).  

Therefore, localization simply involves presenting your website in different languages. Developers can thus, use this feature to design applications that fit various cultures and languages through translations.  

### Objectives
At the end of this tutorial, you should be able to:

- Present your application in multiple languages.
- Configure locales.
- Discover how to define translation strings.
- Learn how to retrieve translation strings.
- Work with package language files.  

### Requirements
- PHP 7.4.x
- Laravel 8.x

### Getting started
Localization in Laravel can be achieved in two different ways.  

- Storing the language strings within the `resources/lang`  directory.

- Defining translation strings within the `JSON`  file which are located in the `resources/lang` directory.  

### Configuring locale
Laravel configurations are always stored in the `app/config` directory. Files such as the database and other file systems are all also configured here. This includes the application's default language. Let us start by building a simple application to help you follow along.  

### Setting Up Laravel
As noted, we will be using Laravel 8.x and PHP 7.4.x in our application. PHP dependencies are managed via Composer. Think of it as NPM for Javascript. Therefore, to install Laravel, we should have a composer on our computer.  

Follow these simple steps to install Composer.  

To download Composer, click [here](https://getcomposer.org/download/). 

Once Composer has been successfully downloaded, the next step is to run the following command in the command prompt.

```bash
composer global require laravel/installer
```

In the above command, we use the `global` keyword. This makes the Laravel installer available globally.  

Now that we have Laravel installed globally in our system, we can `cd` into a directory and create our application. In our case, we will create our application in the directory,  

```bash
 cd /var/www/html/Project/Laravel/ 
```

While in your preferred directory, create your application by running the following command:  

```bash
laravel new localization_app
```  

This will take a few minutes depending on your internet speed.  

We now have the `localization_app` in our system, open this application in your text editor of choice, like PhpStorm. 

If you have reached this far, congratulations, we can now host our application using the `serve` command. Make sure you're in the `localization_app` directory.

Run the command:
```bash
 php artisan serve
 ```

 Note Laravel application will start on port `8000` by default. It will automatically retry another immediate port such as 8001, in case port  8000 is in use.

 If you wish to stop any application running on port 8000, use the following command to kill the process in Linux distribution.

 ```bash
 sudo fuser -k 8000/tcp
 ```  

This gives a response like  ` 8000/tcp:    10017`.

> Note that your `process ID` might be different from mine.  

Congratulations, you're now free to use port 8000 to run your Laravel application.

In case you wish to run the Laravel application on a specific port of your choice, use the following command:  
```bash
php artisan serve --port myPortNumber
```

Now that we have our Laravel application up and running, let us have a look at Laravel localization.  


### Configuring locales in action
Our default application language is English. Remember, our application's configurations are stored in the `app/config` folder.

In this directory, there are several files arranged in an alphabetical order. 

The first file is app.php. Open this file in your text editor.  

```php

<?php

return [
   
    'locale' => 'en',
    'fallback_locale' => 'en',
    'faker_locale' => 'en_US',

];

```

We are interested in the portion above. Scroll down within the file to find this section.  
A closer look at this part reveals that the default `locale`  is set to `en` (English).

```bash
'locale'=>'en'
```

Let's discuss where `en` is coming from:  
Remember at the beginning we said there are two ways to manage translation strings in Laravel. One technique involved storing translation strings in the `resources/lang` directory.

### Lang directory
In this directory, there is an `en` folder which is included by default. It contains a few translation strings.  

Let's have a look at the `resources/lang/en/auth.php` file that also comes with Laravel by default:

```php

<?php
return [

    /*
  
    | Authentication Language Lines
   
    | The following language lines are used during 
    | authentication for various
    | messages that we need to display to the user.
    | You are free to modify
    | these language lines according to your 
    | application's requirements.
    |
    */

    'failed' => 'These credentials do not match our records.',
    'password' => 'The provided password is incorrect.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',
];

```

Whenever this PHP file is called, it returns an associative array, in case you have no clue what associative arrays are, you can check [here](https://www.php.net/manual/en/language.types.array.php)  .

The first element in this array:

 ```bash
 'failed' => 'These credentials do not match our records.'
 ```

This line simply states that assign `failed` a string `These credentials do not match our records`. 

This allows us to call the `failed` variable without necessarily assigning it to a string in our controller. This is an important point that we will need in the future.  

Now, let us build a simple translation string for English to Spanish.  

In our directory:
```bash
 resources/lang/en
```
Create a file and name it `language.php`.  

Create a new directory named `es` in the `lang` folder to hold our Spanish translation file.  

```bash
 resources/lang/es
```

Next, create another `language.php` file to hold English translations. Note that the file names should match.

>If you have reached this far, great work, this is the first step in creating our translation strings.  

Next step, open the `language.php` file in your text editor for the English translation, `en` directory and copy and paste the following:  

```php

 <?php
    return [
        "name"          => "Enter your name",
        "passport"      => "Enter your passport",
        "sector"        => "Select your sector",
        "employer"      => "Select your employer",
        "dateOfBirth"   => "Enter your date of birth",
        "gender"        => "Select your gender",
    ];
 ?>

 ```

Open the `language.php` file in your text editor for Spanish translation, `es` directory and copy and paste the following: 

```php

 <?php

    return [
        "name"          => "introduzca su nombre",
        "passport"      => "Ingrese su pasaporte",
        "Sector"        => "Seleccione su sector",
        "employer"      => "Seleccione su empleador",
        "dateOfBirth"   => "Introduzca su fecha de nacimiento",
        "gender"        => "Selecciona tu género",
    ];
 ?>

 ```
Pay attention to what's going on in these two files:
- The filenames to hold strings are the same.
- The array element names are the same for files.
- The assignment strings have been translated to respective languages, in this case, Español and English.

Thus far we have learned the basics of localization in Laravel, let's look at an example.

### View directory
By default, Laravel comes with a view `welcome.blade.php`, open this file and add the following:

```html
    <body>
    <div class="container">
        <div class="form-group">
            <label >{{__("language.name")}}</label>
            <input type="text">
        </div>
        <div class="form-group">
            <label >{{__("language.passport")}}</label>
            <input type="text">
        </div>
        <div class="form-group">
            <label >{{__("language.sector")}}</label>
            <input type="text">
        </div>
        <div class="form-group">
            <label >{{__("language.employer")}}</label>
            <input type="text">
        </div>
        <div class="form-group">
            <label >{{__("language.gender")}}</label>
            <select>
                <option value="male">{{__("male")}}</>
                <option value="female">{{__("female")}}</>
            </select>
        </div>
        <div class="form-group">
            <label >{{__("language.dateOfBirth")}}<label>
            <input type="text">
        </div>
    </div>
</body>
</html>

```

### Navigate to the Home Page
Now that we have everything set, visit the link: 
```bash
http://localhost:8000
```

Note that this URL might be different from yours. A few things you might have noted is the use of `{{__("filename.shortKey")}}` syntax.

This is used to present translation strings. You can also use the @lang directive.   

```php
    @lang("filename.shortKey")
```

If you open the browser, you will notice that the form is presented in English. To change locale to Spanish, follow these simple steps:

- Open `app.php` in the `config` directory.  
- Scroll down to line:
```php
    <?php
        return [
            "locale"=>"en"
        ];
    ?>

```

- Replace this line with:
```php
    <?php
        return [
            "locale"=>"es"
        ];
    ?>

```

Refresh your browser and you will notice that the form labels are now presented in Spanish.

### Conclusion
In this tutorial, we have designed a simple form that can be presented in English or Spanish. We have also learned how to define and use translation strings for different languages. You can now use this knowledge and skills to build more interactive Laravel applications.

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)