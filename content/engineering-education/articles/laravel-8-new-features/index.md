---
layout: engineering-education
status: publish
published: true
url: /engineering-education/laravel-8-new-features/
title: Laravel 8 New Features
description: This tutorial provides a detailed overview of the Laravel 8.x version. The article discusses the file structures, as well as the new features.
author: miller-juma
date: 2020-12-28T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/laravel-8-new-features/hero.jpg
    alt: laravel 8.x image example
---
If you have learned Laravel, then you are in the right place. This tutorial will help you explore the fantastic features in Laravel 8.x. This tutorial will go over how to use the Larvavel installer, and Jetstream scaffolding.
<!--more-->
The article discusses the file structures, and the new features.

### What's new in Laravel 8
#### What we will learn
- Requirements
- Installation
- Jetstream Scaffolding
- Tailwind CSS Framework with Blade Template
- Authentication

### Requirements
This tutorial assumes that you have basic skills in PHP and HTML. If you're starting to learn Laravel, you're in the right place. For a basic refresher on how to build an API in Laravel refer to [this article](/engineering-education/how-to-create-an-api-using-laravel/).

### Installation
To get started with Laravel, you have two options.
- Using Laravel Homestead as your local development environment.
- Using local servers such as Apache or Nginx or any other server of your choice.

### Laravel Homestead
Virtual machines are great choices for software development. 

To get started, follow the steps below.
- Install your virtual machine, e.g. Virtual Box 6.x, VMware, Parallels, or Hyper-V.
- Install vagrant to manage your virtual machine(s).
- To install Homestead vagrant box,
    - run command `vagrant box add Laravel/homestead`   
This will take a while to download. It fails on occasions. Simple solution, check your vagrant whether it's up to date.

- Finally install Homestead by running this git clone on your terminal, 
    - git clone [https://github.com/laravel/homestead.git]( https://github.com/laravel/homestead.git) 

Congratulations, you have your Homestead ready to start coding in Laravel.  

### Local server
Ensure your system has PHP version 7.3., to install Laravel. 

You can use any of the following options:
- Install Laravel via composer.
- Install Laravel via Laravel installer.

#### Using composer create-project command

Simply run this command on your terminal: 

`composer create-project --prefer-dist laravel/laravel MyAppName`    

Run another command:  

`php artisan key:generate` to generate a secure key for your app.  

#### Using Laravel installer
To use this option, you need to download the Laravel via the composer.  
Note: **Remember composer is the package manager for PHP, think of it as NPM for Javascript.**  

***Composer can be installed globally in your system or just for a particular project!!***

Run this command on the terminal:

`composer global require laravel/installer`

To create your app, enter:  

`laravel new MyApp`

Note: **If you encounter command not found error, find your composer global installation locations** by running `composer global about`, make your $PATH laravel-executable.

Congratulations, you have created your Laravel 8 APP.  

### Laravel Jetstream scaffolding

**Whats Jetstream?** 

This is a new package used for scaffolding in Laravel 8 apps. In earlier versions, the default scaffolding package was Vue. That's now a thing of the past. 

Jetstream comes with two stacks, `Livewire` and `Inertia` scaffoldings. Once again, you can apply any of these options. Use Livewire with Blade template (sounds familiar?), while Inertia goes with Vue. You'll probably go with Blade + Livewire stack if you're not familiar with Vue. 

***What's so special about this new way of doing things in Laravel?***  

Okay, let's install the Jetstream package before we dig deeper into the Laravel new way...  

### Jestream installation
As we said at the start, the composer is the most popular package manager in PHP. Most package installations are done via composer, with Jetstream included.  

To install Jetstream into your laravel project, `cd`  into your project root e.g `cd  /var/www/html/MyApp`

Then run the command, `composer require laravel/jetstream`.      

Ensure that you've got a strong internet connection, as the installation may fail, thus, reverting the composer.json file to its default.   

If successful, we need to choose our stack (Livewire or Inertia), therefore we need to run an artisan command: 

`php artisan jetstream:install livewire` for Livewire stack. 

`php artisan jetstream:install inertia` for Inertia stack.

To complete the installation, we will need to build our Node Package Managers (NPM) dependencies and migrate our database. 

` npm install && npm run dev `
    
```bash 
    php artisan migrate 
    //before running this command, you must create a database. 
```

Remember we said Jetstream comes with new changes, i.e. Tailwind CSS, doing away with Bootstrap as its default UI framework?  
It will scaffold your application with the Tailwind framework. It features a beautifully designed UI.  

Don't worry if you don't understand, things are all done under the hood, and you only need to build your NPM dependencies that you achieved above.

### Quick Laravel 8 Jetstream structure
- Once the Tailwind Framework is installed into your system: You'll notice a file `webpack.mix.js` and `tailwind.config.js` at the root of your application

- In the `resources/views` directory, new folders are created for you, they include:
    - API folder: Which has an API token manager and index.blade.php, these help with API management.
    - profile folder: This handles user profile management, some tasks include deleting a user.
    - auth folder: This existed in Laravel 7. The only new files are the two-factor authentications.
    - navigation-dropdown.blade.php file: As the name suggests, it handles the navigation in your app. It's a new feature.
    - dashboard.blade.php file: This has replaced the home.blade.php that existed in other versions of Laravel.
    - vendor: By default it's doesn't exist, unless you publish Blade components while using Livewire stack.
- If you run your application, `php artisan serve`, you will notice a jetstream logo has been set for you. You can modify this to meet your needs by customizing the Jetstream components.

### What's the Tailwind CSS framework?
You're probably wondering what is this new CSS framework, and why not Boostrap?

- Tailwind CSS uses utility classes to style your HTML markups, think of utility classes as inline CSS.
- What makes Tailwind special (unlike inline css) is because you can do everything. For example, hover, which you can't achieve with Inline CSS, let's look at an example:

```HTML 
            <div class="max-w-md bg-white mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
                    <div class="md:flex">
                        <div class="md:flex-shrink-0">
                            <img class="h-48 w-full object-cover md:w-48" src="yourimage.jpg"alt="img"/>
                        </div>
                        <div class="p-8">
                            <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                                case study
                            </div>
                            <a class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"href="">link</a>
                            <p class="mt-2 text-gray-500">It has amazing features.</p>
                        </div>
                    </div>
                </div>
```

#### Tailwind explanation from the code above

- max-width is indicated as ***max-w-md***, if you have noticed the use of **md**, Tailwind also has breaking point just like bootstrap, they include:

- sm-small screen
- md -medium screen
- lg- large screen
- xl- extra large screen
- 2xl -extra extra large screen

Note: 

```CSS
               
        sm  640px   @media (min-width: 640px) { ... }
        md  768px   @media (min-width: 768px) { ... }
        lg  1024px  @media (min-width: 1024px) { ... }
        xl  1280px  @media (min-width: 1280px) { ... }
        2xl 1536px  @media (min-width: 1536px) { ... }
```

To learn more about Tailwind, visit [tailwindcss](https://tailwindcss.com/docs/responsive-design)

- User Registration
- Unlike the other versions, a new folder is created on the ***app/actions*** folder i.e ***MyApp/app/Actions/Fortify***.  
- In this directory, there are 5 files generated, including ***createNewUser.php*** file.  

Lets dive in to see what happens in this file.

```php
    <?php
    namespace App\Actions\Fortify;
    use App\Models\User;//model
    use Illuminate\Support\Facedes\Hash;
    use Illuminate\Support\Facades\Validator;
    use Laravel\Fortify\Contracts\createNewUsers; //a new feature introduced in Laravel 8

    class CreateNewUser implements CreatenewUsers
    {
        //code goes here...
        //not passwordRules() has been added
    }
```

- Upon registration, the developer has an option for the email verification link.  
- It's a little different in `Laravel 8`, apart from the `MustImplementEmail` in the model, a new fortify feature is needed to enable this functionality. This is available in the **config/fortify.php**, features option, enable `emailVerification()`  
- Profile Photo: This feature was not available in other versions. It was initially enabled by default in the earlier version of Laravel 8 before being disabled due to "community" demands.
- To achieve this functionality: Laravel 8 comes with new files in the `app/config.php` files, including the `Jetstream.php` file, now in this file, we have the features option that has a few methods, uncomment the `Feature::profilePhotos()`.  

Next step, remember `images` are stored in the database as `URL`, and original photos stored in the `public` directory of the `Storage` folder. 

Note that this is solely for images which need to be publicly accessible.

Run a symbolic link to enable you to access your images in the `blade` template.

`php artisan storage: link`

### How to manage profile photos with the jetstream
Always remember that new auth scaffolding is configured to use the App/Models/User.php model by default. In this new version, another functionality has been added by default when you install Jetstream.  

`Laravel\Jetstream\HasProfilePhoto`

This new trait comes in hand with its predefined methods:
- `updateProfilePhoto,`
- `getProfilePhotoUrlAttribute,`
- `defaultProfilePhotoUrl`
- `profilePhotoDisk `

All these methods can be customized in the `model`, depending on your interest.  

- Account Deletion: This is another feature that has been introduced in the laravel 8 scaffolding. It's an option for a user to delete their account. The functionality to implement this is located at the `App\Actions\Jetstream\DeleteUser`.

### Conclusion
You have now learned the basics of Laravel 8.x. You can use this knowledge to develop more interactive applications that make use of full Laravel features.

Happy Coding!

---
Peer Review Contributions by: [Michael Barasa](/engineering-education/authors/michael-barasa/)
