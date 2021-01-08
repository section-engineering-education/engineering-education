### Introduction
In software applications, Language localization refers to how a given product is adapted to a specific language translation depending on regions or countries. A perfect example is an online shopping site.

For instance, Chinese can access Alibaba site in chinese while those in other regions such as the US can navigate the website using English. This is known as internationalization, commonly denoted as (i18n).  

It simply involves presenting your website in different languages.  
Developers can use this feature to design applications that fit various cultures and languages through translations.  

### Objectives
At the end of this tutorial, you should be able to:

* Present your application in multiple languages.
* Configure locales.
* Discover how to define translation strings.
* Learn how to retrieve translation Strings.
* Work with package language files.  

### Requirements
* PHP 7.4.x
* Laravel 8.x

### Getting Started
Localization in Laravel can be achieved in two different ways.  

* Storing the language strings within the `resources/lang`  directory

* Defining translation strings within the `JSON`  files which are located in the `resources/lang` directory  

### Configuring Locale
Laravel configurations are always stored in the `app/config` directory. Files such as database and other file systems are all configured here. This includes the application's default language. Let us start by building a simple application to help you follow along.  

### Setting Up Laravel
We will be using Laravel 8.x and PHP 7.4.x in our application. Php dependencies are managed via composer. Think of it as NPM for Javascript. Therefore, to install Laravel, we should have composer on our computer.  
Follow these simple steps to make the composer available in your system.  

To download composer, click [here](https://getcomposer.org/download/).  
Once composer has been successfully downloaded, the next step is to run the following command in the command prompt.

``` 
composer global require laravel/installer
```

You have noticed the use of the `global` keyword in our command above, this makes laravel installer available globally.  

Now that we have Laravel installed globally in our system, we can ``cd`` into a directory and create our application. In our case, we will create our application in the directory,  

```
 cd /var/www/html/Project/Laravel/ 
```

While in your preferred directory, create your application by running the following command:-  

```
laravel new localization_app
```  
This will take a few minutes depending on your internet speed.  
We now have `localization_app` in our system, open this application in your text editor of choice, like PhpStorm. 

If you have reached this far, congratulations, we can now serve our application, make sure you're in the ```localization_app ``` directory.  
Run the command:-
 ```
 php artisan serve
 ```
 Note Laravel application will start on port `8000` by default. It will automatically retry another immediate port such as 8001, in case this port is already in use.

 If you wish to stop any application running on port 8000, use the following command to kill the process in Linux distribution.

 ```
 sudo fuser -k 8000/tcp
 ```  
This gives a response like  ``` 8000/tcp:    10017```,
your `process Id` might be different from mine.  

Congratulations, you're now free to use port 8000 to run your Laravel application.  
And in case you wish Laravel application on a specific port of your choice, run the following command  
```
php artisan serve --port myPortNumber
```
Now that we have our Laravel application up and running, let us have a look at Laravel localization.  


### Configuring Locales in action:-
Our default application language is in English, remember from the beginning we said our application configuration 

In this directory, there are several files arranged in alphabetical order, by default 

The first file is app.php. Open this file in your text editor.  

```php

<?php

return [
   
    'locale' => 'en',
    'fallback_locale' => 'en',

    'faker_locale' => 'en_US',

];

```
This is the part we're interested in, you can scroll down within the file to find this section.  
A closer look at this part, the default `locale`  is set to `en ` , English

```
'locale'=>'en'
```
Let's discuss where `en` is coming from:-  
Remember at the beginning we said there are two ways to manage translation strings in Laravel. One techique involved storing translation strings in the `resources/lang` directory.

### Lang Directory

In this directory, there is a `en` folder which is included by default. It contains a few translation strings.  
Let's have at the `resources/lang/en/auth.php` fil which also comes with Laravel by default:-

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
Whenever this PHP file is called, it returns an associative array, in case you have no clue what associative arrays are, you can check it in the following link quickly:- 
 [https://www.php.net/manual/en/language.types.array.php](https://www.php.net/manual/en/language.types.array.php)  .

 The first element in this array:-
 ```
 'failed' => 'These credentials do not match our records.'
 ```
 This line simply states that assign ```' failed'``` a string ``` 'These credentials do not match our records.' ```  
 This will allow us to call ``` 'failed'``` without necessarily assigning it to string in our controller while performing authentication or any other task that requires us to return this array.  
This is an important point, we will need it in the future.  

Now, let us build a simple translation string for English to Spanish.  

In our directory
```
 resources/lang/en

```
Create a file and name it as `language.php`.  

Create a new directory names `es` in the `lang` folder to hold our Spanish translation file.  

 ```
 resources/lang/es
 ```
 Next, create another `language.php` file to hold English translations, note that the file names should match.

 If you have reached this far, congratulations, that is the first step to create our translation strings.  

 Next step, open the ``` 'language.php' ``` file in your text editor for the English translation,```en``` directory and copy and paste the following:-  

 ```php

 <?php
    return [
        "Name"          => "Enter your name",
        "passport"      => "Enter your passport",
        "Sector"        => "Select your sector",
        "Employer"      => "Select your employer",
        "DateOfBirth"   => "Enter your date of birth",
        "Gender"        => "Select your gender",
    ];
 ?>

 ```

Open the `language.php` file in your text editor for Spanish translation, ``es`` directory and copy and paste the following:- 

```php

 <?php

    return [
        "Name"          => "introduzca su nombre",
        "passport"      => "Ingrese su pasaporte",
        "Sector"        => "Seleccione su sector",
        "Employer"      => "Seleccione su empleador",
        "DateOfBirth"   => "Introduzca su fecha de nacimiento",
        "Gender"        => "Selecciona tu género",
    ];
 ?>

 ```
Pay attention to what's going on in these two files.
* Filename to hold strings are the same.
* The array element names are the same for files.
* The assignment strings have been translated to respective languages, in this case, Espanol and English.

If you're comfortable with whats we have learned so far, it's time to make this simple application into action. 

### View Directory
By default, Laravel comes with a view `welcome.blade.php`, open this file and add the following:-

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
### Browse to Home Page
Now that we have everything set, visit the link 
```
http://localhost:8000
```
Note that this URL might be different from yours.  
A few things you might have noted, in case strange, is the use of this syntax
```
{{__("filename.shortKey")}}

```
This is used to present translation strings, you can also use the @lang directive.   

```php
    @lang("filename.shortKey")
```

If you open the browser, you will notice that the form is presented in English.  
To change locale to Spanish,follow these simple steps:-  
* Open ```app.php``` in the ```config``` directory.  
* Scroll down to line:-
```php
    <?php
        return [
            "locale"=>"en"
        ];
    ?>

```
* Replace this line with:-
```php
    <?php
        return [
            "locale"=>"es"
        ];
    ?>

```

Refresh your browser and you will notice that the form labels are now presented in Spanish.

### Conclusion
Congratulations, you have built your first Laravel localization application.  
Practice with more examples are you wait for part two of this tutorial.
