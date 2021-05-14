---
layout: engineering-education
status: publish
published: true
url: /php-yii2-framework/
title: Getting Started with Yii 2 PHP Framework
description: A tutorial that provides a detailed guide on how to use the Yii 2 framework to create web applications. The Yii 2 framework supports the development of both the backend and the frontend.
author: erastus-muriithi
date: 2021-01-13T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/php-yii2-framework/hero.jpg
    alt: Yii 2 PHP Framework example image
---
Nowadays, many developers are using frameworks when designing websites. This has led to improved production speeds. PHP is a server-side scripting language that can be embedded in [HTML](https://en.wikipedia.org/wiki/HTML).
<!--more-->
### Introduction
Yii 2 is a generic PHP framework used for developing web applications with many ties. Yii 2 implements the MVC (Model, View, and Controller) development principle.

Model, View, and Controller help web developers work with a single part of the website at a time. To learn more on MVC, click [here](https://www.guru99.com/php-mvc-frameworks.html).

### Prerequisites
To follow along with this tutorial, you need to have the following:
- A code editor like [Visual Studio Code](https://code.visualstudio.com/download).
- Knowledge of PHP, HTML, and CSS.
- Apache Web server. Download it [here](https://www.apachefriends.org/download.html). After installation, a folder `/opt/lampp` will be created but not a folder `/opt/xampp`. This folder is only created in Linux OS like Ubuntu.

### Step 1 - Install Yii 2
Yii 2 can be installed from an archive file.

This involves the following steps:

1. Downloading the archive file from [yiiframeworks.com](https://www.yiiframework.com/download). Download the advanced application template.

2. Move the archive file to the `/htdocs` inside where Xampp was installed. In my case it is `/opt/lampp/htdocs`.

```bash
$ sudo mv yii-advanced-app-2.0.39.tgz /opt/lampp/htdocs
```
3. Using the terminal, open the  `/opt/lampp/htdocs` and unzip the yii-2-advanced file. After unzipping, a folder named `advanced` will be created.
```bash
$ sudo tar -xvzf yii-advanced-app-2.0.39.tgz
```

Click [here](https://askubuntu.com/questions/499807/how-to-unzip-tgz-file-using-the-terminal) if you encounter any problem. 

4. Initialize your project by entering the following command in `/opt/lampp/htdocs/advanced.`
```
$ sudo php init
```

To initialize your application, you should select 0 (Development environment).

At this point, you have installed Yii 2 Advanced Template. Open your browser and navigate to http://localhost/advanced/frontend/web.

When the Congratulations page is displayed on your browser, it means that the installation was successful.

![A congratulatory note](/engineering-education/php-yii2-framework/congratulations.png)

### Step 2 - Understanding the folder structure and directories
Below are the folders inside the `advanced`. Open `/opt/lampp/htdocs/advanced` folder using your favorite code editor to see them.

```bash
.
├── backend
├── codeception.yml
├── common
├── composer.json
├── composer.lock
├── console
├── docker-compose.yml
├── environments
├── frontend
├── init
├── init.bat
├── LICENSE.md
├── README.md
├── requirements.php
├── vagrant
├── Vagrantfile
├── vendor
└── yii.bat
```

In this `advanced` folder, we have three main directories:
1. backend
2. common
3. frontend

Let us look at the work of the folders above:

### Folder 1. backend
The backend directory serves the admin services, which are restricted to the users.
Inside this `backend` folder, we have the following main directories.


**`/assets`**: This directory consists of asset configurations. It has an `AppAsset.php` file, that contains the configurations of the CSS and the JAVASCRIPT. This is where we will be adding our CSS and JAVASCRIPT files.


**`/controllers`**: Yii 2 Controller is written in this folder. Yii 2 takes the convention of <NameController> to name the controllers. 


**`/models`**: In Yii 2, processing data and manipulating the values takes place here. In this directory, we have classes that link to the databases. Tables in databases and the models have one to one mapping.


**`/views`**: In Yii 2, the views directory is used to store files that will be displayed in the browser as HTML. The code placed in this directory is always in PHP format but shown in the browser in HTML format.

Inside the `view` folder, we have two directories:

- **`views/layout`**: The layout directory contains the application's views. These views are displayed on all website pages, and their files are in `main.php`. For instance, most websites store their footer and header files in this directory. So, all pages on that website contain a similar footer and header.

- **`views/site`**: Unlike files in layout, files in the site are not fixed. That is, one page does not have the same view as another page. The only similar thing is the header and the footer since they were placed in `main.php`.

#### Folder 2: common
Here, we have files that are common to both the backend and frontend directory. For instance, database configurations in `/common/config` takes place here.

#### Folder 3: frontend
The `/frontend` project contains the contents displayed to the users. This folder has similar directories to those of `/backend`.

### Step 3 - Creating our first web application using Yii 2
To create a web page, we need to change the different parts of our website to fit our preferences. Let us change the footer of our website. Replace the whole `<footer>` in `/frontend/views/layout/main.php` with the following code:

```PHP
// ...
<footer class="footer">
    <div class="container">
        <div class="col-md-6">
            <div>
           <h5>This is a classic footer</h5>
            </div>
        </div>
    
    </div>

  
</footer>

//...

```
### Step 4 - Configure CSS and JavaScript
All CSS files in a project are stored under `/web/CSS`, and all JavaScript is stored under `/web/js`. 

Let us customize the footer we created above. Create a `footer.css` under `/web/css` and put the code below. 
```css

h5:hover{
    color: blue;
}
h5{
    color: white;
}

```

Then register the styles above in `assets/AppAsset.php`.
```css
/* ... */
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
        'css/footer.css',
    ];
    /* ... */
}
```
### Step 5 - Modifying site contents
Now let us change the contents of our website. Replace the contents of `frontend/views/site/index.php` with the following code:

```PHP
<?php

/* @var $this yii\web\View */

$this->title = 'My Yii Application';
?>
<div class="site-index">

    <div class="jumbotron">

       <h1>Hello World!</h1>
       <p>My first webpage using yii2.</p>
       <h2>Look at my <a href="<?= Yii::$app->urlManager->createUrl(['site/portfolio'])?>">Portfolio<a> </h2>
    </div>
</div>
```

Open your browser and navigate to `http://localhost/advanced/frontend/web` for testing.

You should have a page like the one below:

![web display](/engineering-education/php-yii2-framework/web.png)

The code above replaces the default homepage content with bootstrap jumbotron. We also add a link that points to a portfolio page using the PHP URL manager. The URL Manager is used to link pages throughout Yii 2 framework. On clicking the link, you get a 404 error as the portfolio page does not exist. Let us now create the portfolio page.

### Step 6 - Adding a new page to our website
To add a new page to our website, we need to create a view and an action. A view is an interface that the user will see on the browser. Create a new file, `frontend/views/site/portfolio.php`, and paste the following code in it.

```php
<?php

/* @var $this yii\web\View */

$this->title = 'My Website';
?>
<div class="site-index">

    <div class="jumbotron">

       <h1>Hello World!</h1>
       <p>My first yii2 powered site.</p>
       <h2>This is my portfolio</a></h2>
    </div>
</div>
```
For the view code above to work, we need to create an action. We will put Actions in controllers. 


To display the portfolio page, we need to declare an action to show the portfolio page. Open `frontend/controllers/SiteController.php` and add the following:

```PHP
<?PHP
// ...
class SiteController extends Controller
{
// ...

/**
     * Displays portfolio  page
     * 
     * @return mixed
     */
    public function actionPortfolio()
     {
         $this->layout='main';
         return $this->render('portfolio');

    }

}
```

After creating the action and the view, you can access the new page by clicking on "Portfolio" link on the main page.

You should have a page like the one below:

![web display](/engineering-education/php-yii2-framework/1.png)

### Conclusion
Congratulations! Now you have a better understanding of the basics of the Yii 2 framework. Yii 2 pushes you to create a securable and testable site by doing a lot of the heavy lifting for you. I encourage you to use Yii 2 in your next project.

In this article;
- We have installed Yii 2 framework.
- We have looked at Yii 2 directories.
- We have created a portfolio page using yii2.

**Happy Yii 2 coding ahead**

---
Peer Review Contributions by [Wanja Mike](/engineering-education/authors/michael-barasa/)