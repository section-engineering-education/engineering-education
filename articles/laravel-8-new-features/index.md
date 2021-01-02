# What's New In Laravel 8

## What We WIll Learn.

* Requirements
* Installation
* Jetstream Scaffolding
* Tailwind CSS Framework with Blade Template
* Authentication

## Requirements

This tutorial assumes that you have grasped basic skills in PHP, in general and HTML.  
If you're just starting to learn Laravel,you're at the right place to explore.  
the amazing features of the current version of Laravel,8.x.

## Installation

To get started with Laravel,you have 2 options.
* Using Laravel Homestead as your local development environment.
* Using local server e.g Apache or Nginx or any other server of your own choice.

### Laravel Homestead
Virtual machines are great choices when it comes to software development,
to get started,follow steps below.
* Install your virtual machine e.g Virtual Box 6.x,VMware,Parallels or Hyper-V
* Install vagrant to manage your virtual machine(s).
* To install Homestead vagrant box,
    * run command ```vagrant box add laravel/homestead```   
    This will take awhile to download. It fails on occassions.  
    Simple solution,check your vagrant whether it's upto date.

* Finally install Homestead by running this git clone on your terminal, 
    * git clone [https://github.com/laravel/homestead.git]( https://github.com/laravel/homestead.git) ~/Homestead

Congratulations,you have your Homestead ready to start coding in laravel.  

## Local Server
Ensure your system has PHP version 7.3.,to install laravel,you have 2 options:-  
* Install Laravel via composer
* Install Laravel via Laravel installer

    ### Using Composer Create-project command
    Simply run this command on your terminal:-  
     ```composer create-project --prefer-dist laravel/laravel MyAppName```    
    Run another command:-   
    ```php artisan key:generate```    
    to generate a secure key for your app  

    ## using laravel Installer
    To use this option,you need to download the laravel via the composer.  
    NB **Remember composer is the package manager for PHP,think of it as NPM for Javascript.**  
    ***Composer can be installed globally in your system or just for a particular project!!***

    Run this command on the terminal:-  
    ```composer global require laravel/installer```   
    To create your app,run  
     ```laravel new MyApp```   
    NB:- **If you encounter command not found error,find your composer global installation locations** by running   
    ```composer global about```,  
    make your $PATH laravel-executable.

Congratulations,you have created your Laravel 8 APP.  

## Laravel Jestream Scaffolding

**Whats Jestream?** 
 
This is a new package used to generate the laravel scaffolding in Laravel 8 APPs.  
In earlier versions,the default vue scaffolding were used,okay,thats now a thing of the past,atleast for now. 

It comes with two stacks,Livewire and Inertia scaffoldings,either of the 2 you select depends on your personal taste.  
Use Livewire with Blade template(sounds familiar?),while Inertia goes with Vue.  
You'll probably go with Blade + Livewire stack if you're not familiar with Vue.Good luck

***What's so special about this new way of doing things in Laravel?***  
Okay,lets install jetstream package before we dig deeper into laravel new way....  

### Jestream Installation
As we said at the start,composer is the most popular package manager in PHP,others include yarn(topic for another day)  
and most package installations are via composer,with Jetstream included.  

To install Jetstream into your laravel project, ***cd***  into your project root e.g ***cd  /var/www/html/MyApp***  
Then run the command, ```composer require laravel/jetstream```.      
Ensure that you've strong internet connection,as its installation may fail,reverting composer.json file back to its default.   

If successful,we need to choose our stack(Livewire or Inertia),therefore we need to run an artisan command,  
```php artisan jetstream:install livewire``` for Livewire stack.   
```php artisan jetstream:install inertia``` for Inertia stack.

To complete installation,we will need to build our Node Package Managers(NPM) dependencies and migrate our database.  
    ``` npm install && npm run dev ```  
    ``` php artisan migrate ```  
Remember we said Jetstream comes with new changes,i.e Tailwind CSS,doing away with Bootstrap as its default ui framework?  
It will scaffold your application with Tailwind framework,with a beatifully designed UI.  
Don't worry if you don't understand,things are all done under the hood,and you only need to build your NPM dependencies   which you achieved above.

### Quick Laravel 8 Jetstream Structure
* Tailwind Framework is installed into your system:-you'll notice a file webpack.mix.js and tailwind.config.js   
  at the root of your application

* In the views directory,new folders are created for you,they include:-
    * api folder:-which has api token manager and index.blade.php,these helps with api management.
    * profile folder:-This handles user profil management,some tasks include deleting user.
    * auth folder:-This existed in Laravel 7,the only new files are the two-factor authentications.
    * navigation-dropdown.blade.php file,as the name suggests,it handles the navigation in your app.Its a new feature.
    * dashboard.blade.php file:-this has replaced the home.blade.php which existed in other versions of laravel.
    * vendor:-by default it's doesnt exist,unless you publish Blade components while using Livewire stack.
* If you run your application, ```php artisan serve ```,you will notice a jetstream logo has been set for you,  
  you can modify this to meet your needs,by customizing the jetstream components.

### What's Tailwind CSS Framework?
&minus; You're probably wondering what's this new css framework,why not Boostrap?
* Tailwind CSS uses utility classes to style your HTML markups,think of utility classes as inline css.
    * What makes Tailwind special unlike inline css is because you can do everything e.g hover which you can't  
        achieve with Inline CSS,let's look at an example:-
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
        #### Tailwind explanation in the code above
        * max-width is indicated as ***max-w-md***,if you have noticed the use of **md**,okay Tailwind also has
          breaking point just like bootstrap,they include:-  
            * sm-small screen
            * md -medium screen
            * lg- large screen
            * xl- extra large screen
            * 2xl -extra extra large screen
            * Note:- 
            ```CSS
                
                sm	640px	@media (min-width: 640px) { ... }
                md	768px	@media (min-width: 768px) { ... }
                lg	1024px	@media (min-width: 1024px) { ... }
                xl	1280px	@media (min-width: 1280px) { ... }
                2xl	1536px	@media (min-width: 1536px) { ... }
            ```
            To learn more about Tailwind,visit [https://tailwindcss.com/docs/responsive-design](https://tailwindcss.com/docs/responsive-design)


* User Registration
    * Unlike the other versions,a new folder is created on the ***app*** folder i.e ***MyApp/app/Actions/Fortify***  
    * In this directory,there are 5 files generated,including ***createNewUser.php*** file.  
    * Lets dive in to see what happens in this file.

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
    * Upon registration,the developer has an option for email verification link.  
        * It's a little different in Laravel 8,apart from the MustImplementEmail in the Model,
          a new fortify feature  is needed to enable this functionality.  
          This is available in the **config/fortify.php**,Features option,enable emailVerification()  

* Profile Photo
    This feature was not available in other versions,it was initially enabled by default in the earlier  
    version lof Laravel 8 before being disabled due to "community" demands.
    * To achieve this functionality:-
        Laravel 8 comes with new files in the app/config.php files,including Jetstream.php file,now in this file  
        we have the Features option which has a few methods,uncomment the Feature::profilePhotos()  

        Next step,remember images are stored in the database as url,and original photos stored in the public  
        directory of the Storage folder,remember,this is solely for images that are required to be  
        publicly accessible.

        Run a sysmbolic link to enable you access your images in the blade template  
        ``` php artisan storage:link```  
        ## How to manage profile photos with jetstream
        Always remember that new auth scaffolding are configured to use the App/Models/User.php model by default.  
        In this new version, another functionality has been added by defaulf when you install Jestream.  
        ```Laravel\Jetstream\HasProfilePhoto```  
        This new trait comes hand in hand with its own predefined methods,  
        * ```updateProfilePhoto,``` 
        * ```getProfilePhotoUrlAttribute,```
        * ```defaultProfilePhotoUrl, and```
        * ```profilePhotoDisk ```
        All these methods can be customised in the model,depending on your personal interest.  

* Account Deletion
    This is another feature that has been introduced in the laravel 8 scaffolding.  
    It's an option for a user to delete their account.  
    The functionality to implement this is located at the  
    ```App\Actions\Jetstream\DeleteUser```

            
            
    


    

