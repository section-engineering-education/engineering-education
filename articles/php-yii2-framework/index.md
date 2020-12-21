## Getting started with Yii 2 PHP framework
 
Nowadays,many people has turned out to use framework in web designing and apps development..This has played a great role in improving developers codding skill since they don't have to have the whole knowledge of a language so as to use it..

## Introduction
Yii is a generic Web programming  application best for developing complex WEb applications with multiple ties.It  works together with Database.When developing webs with yii2 you need to be familia with classes and objects..
Like other PHP frameworks,Yii implements the MVC (Model-View-Controller) .
It include three tiers:front end,back end and console, each of which is a separate Yii console.
in this template we are going to focus on front end.

## Requirements
To use this tutorial,you need to;
- install a type editor like sublime or vscode.feel free to use any other.
- install yii2.
- be familia with  html and css
- have basic knowledge of object-oriented programming (OOP),
- have Web server supports PHP 5.6.0.
 
## step 1- install yii2
The first thing you need to do so that you can use yii2 is to install it.In linux you can install it via composer or download an archive file.

## 1. install via composer
If you do not have a composer with you in your PC you may install it by following the instruction at https://getcomposer.org/download/.
On linux and Mac OS X, you will run the following commands:

```bash
$ curl -sS https://getcomposer.org/installer | php
$ sudo mv composer.phar /usr/local/bin/composer
```

On Windows,you'll download and run https://getcomposer.org/Composer-Setup.exe.

If you encounter a problem,please refer to https://getcomposer.org/doc/articles/troubleshooting.md

<!-- ## installing yii -->
With a composer Installed,you can install YII application by running the following command under a Web-accessible folder:
```bash
composer create-project --prefer-dist yiisoft/yii2-app-basic basic
```
The command above will install the latest version of YII in the basic directory.
In case of an error,please refer[Troubleshooting section of th Composer Documentationt](https://getcomposer.org/doc/articles/troubleshooting.md),then resume to the installation by running composer updates inside of the basic directory.

Once your done with installation you can rename the yii2 into your favorite name.  In this case we will rename it to test.

## 2. install from an archive file.
This Involves three steps;

1.Download the archive file from [yii2frameworks.com](https://www.yiiframework.com/download).

2.Unpack the download file to a web-accessible folder.

3.Modify the config/web.php file by entering a secret key for the cookieValidationkey configuration item.

NB if you install yii using composer this will done automatically for you.
```
// !!! insert a secret key in the following(if it is empty) - this is required by cookie validation
'cookieValidationKey' =>'enter you secret key here',
```
 ## step2 veryfy the installation
 After your done with the installation,you can either configure your web server or use the build in server[built-in-web server](https://www.php.net/manual/en/features.commandline.webserver.php)by running the following command in you terminal while in the project directory .
 ```bash
 $ php yii serve
 ```
 ### Understanding the Folder Structure and directories
 First, let's check what happens when we just open the advanced template in the browser. So now if you have put the advanced directory correctly into the document root, you can visit your localhost/advanced
 NB.You can rename  the `advanced` from `advanced` to any favorite name that you think about.later we will see how we rename.In our case lets rename the `advanced` from `advanced` to `test`. <br>
You should see the following directories on your type editor;
```bash
/
	backend/
	common/
		components/
		config/
			params.php
			params-local.php *
		lib/
			Pear/
			yii/
			Zend/
		migrations/
		models/
			Comment.php
			Extension.php
			...
	console/
		commands/
			SitemapCommand.php
			...
		config/
			main.php
			main-local.php *
			params.php
			params-local.php *
		runtime/
		yiic.php *
	frontend/
		components/
		config/
			main.php
			main-local.php *
			params.php
			params-local.php *
		controllers/
			SiteController.php
			...
		lib/
		models/	
			ContactForm.php
			SearchForm.php		
		runtime/
		views/
			layouts/
			site/
		www/
			assets/
			css/
			js/
			index.php *
	yiic
	yiic.bat

```
Here, we will cover the just the necessary directories and files. In advanced series.
At the top level, we have four directories;
- backend <br>
While development of any web application, we have two things to be considered, the consumer/user facing side of the website and the admin panel or the dashboard. <br>
The backend directory serve the service of admin or the services which are restricted from the users. <BR>
Now lets see whats inside the backend..Click the backend is this is what you should see.
![backend](3.png)   
## assets <br>
This directory consists the configurations for the assets managed in the backend and frontend project. By default, it has AppAsset.php file inside, which include the configurations of the javascript and the css files.This is where we will adding all our css and js styles link <br>
## controllers
In the MVC Pattern of coding, the C stands for Controllers. These controllers are present in the controller's directory. Yii follows the convention of <NameController> for naming the controllers. Example, UserController.php is the name of the file and the class is UserController.
## models
Models are the classes which contain the 'business logic'. When we say business logic it's the processing of data, manipulating the values, etc. In Yii, this directory also has classes which are a link to the Database through which we can access the database tables. These models and tables have one to one mapping.
## views
Views store the files which are displayed via a browser. The data is passed from the controller in the view and then sent to the browser in HTML format. Thus separating the business logic in Models and display logic in Views. <br>
Inside views we have two directories;<br>
1)layout <br> In this directory we have the files that we will always get displayed on the web page.This files are mainly the navigation bar and the footer .To prove this click either about or login and notice that it will take you to the about page and login page respectively but the entire navigation  bar will remain. <BR>
The files in this directory are under main.php folder .In our case this is the codding we have under main.php;
```php
//  <?php

// /* @var $this \yii\web\View */
// /* @var $content string */

// use yii\helpers\Html;
// use yii\bootstrap\Nav;
// use yii\bootstrap\NavBar;
// use yii\widgets\Breadcrumbs;
// use frontend\assets\AppAsset;
// use common\widgets\Alert;

// AppAsset::register($this);
// ?>
// <?php $this->beginPage() ?>
// <!DOCTYPE html>
// <html lang="<?= Yii::$app->language ?>">
// <head>
//     <meta charset="<?= Yii::$app->charset ?>">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <?php $this->registerCsrfMetaTags() ?>
//     <title><?= Html::encode($this->title) ?></title>
//     <?php $this->head() ?>
// </head>
<body>
<?php $this->beginBody() Haikufika 

<div class="wrap">
    <?php
    NavBar::begin([
        'brandLabel' => Yii::$app->name,
        'brandUrl' => Yii::$app->homeUrl,
        'options' => [
            'class' => 'navbar-inverse navbar-fixed-top',
        ],
    ]);
    $menuItems = [
        ['label' => 'Home', 'url' => ['/site/index']],
        ['label' => 'About', 'url' => ['/site/about']],
        ['label' => 'Contact', 'url' => ['/site/contact']],
    ];
    if (Yii::$app->user->isGuest) {
        $menuItems[] = ['label' => 'Signup', 'url' => ['/site/signup']];
        $menuItems[] = ['label' => 'Login', 'url' => ['/site/login']];
    } else {
        $menuItems[] = '<li>'
            . Html::beginForm(['/site/logout'], 'post')
            . Html::submitButton(
                'Logout (' . Yii::$app->user->identity->username . ')',
                ['class' => 'btn btn-link logout']
            )
            . Html::endForm()
            . '</li>';
    }
    echo Nav::widget([
        'options' => ['class' => 'navbar-nav navbar-right'],
        'items' => $menuItems,
    ]);
    NavBar::end();
    ?>

    <div class="container">
        <?= Breadcrumbs::widget([
            'links' => isset($this->params['breadcrumbs']) ? $this->params['breadcrumbs'] : [],
        ]) ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</div>

<footer class="footer">
    <div class="container">
        <p class="pull-left">&copy; <?= Html::encode(Yii::$app->name) ?> <?= date('Y') ?></p>

        <p class="pull-right"><?= Yii::powered() ?></p>
    </div>
</footer>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>

```
To have the best navigation bar and the footer other than the one yii2 have provided,edit the content inside the body.For example You may modify the menu items to customize its content  lets say services.you will do that in this part below;
```php
 $menuItems = [
        ['label' => 'Home', 'url' => ['/site/index']],
        ['label' => 'About', 'url' => ['/site/about']],
		['label' => 'Contact', 'url' => ['/site/contact']],
		 ['label' => 'Services', 'url' => ['/site/services']],
```

2) Site <br>
As you can see above we have site/contacts,site/services etc..Its now time to see what this site is all about.<br>
When for example you click about in the navigation bar,you wil be taken to about page.The files of this page are in about.php,a folder in site directory.Therefore we can say that site store the files which are displayed via a browser but unlike layout the files are not fixed when opened in the browser.
In our case, we have the following;
```php
<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>This is the About page. You may modify the following file to customize its content:</p>

    <code><?= __FILE__ ?></code>
</div>
```
As you can see above your directed on the part to modify.This is the part that you will add everything that you want to be in your about page..Lets modify our about page to look like the one below.
```html
<div class="container">
 <div class="card">
  <div class="title">
   <h3>About </h3>
    <div class="body">
     <p>This Is how our body will look like </p>
    </div>
  </div>
 </div>  
</div> 
```
## common
This is a directory which is located inside test(my project name which I renamed from advanced) directory. <br>
Lets have a look at it.
![common](4.png)
As the name suggests, the common directory has the config, models, etc. which are used in the backend and the frontend projects. For example, you can have database configuration in common/config if, both of them uses the same database. We we look at database configuration later as we move forward.

- frontend
The frontend application which provides the main interfaces to our target end users.
Frontend has similar directories to those of backend
 -->
    <!-- -console-the console application that consists of the console commands needed by the system.
    -common-the directory whose content are shared among the above applications. -->


In our case we will give more attention to the frontend directory.

## Database configuration
As we had said we would look at the database configuration as we move forward.Its now the time.
 Edit the file config/main-local.php in the backend directory:
You should see the following;
```php
<?php
return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=yii2advanced',
            'username' => 'root',
            'password' => '',
            'charset' => 'utf8',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'viewPath' => '@common/mail',
            // send all mails to a file by default. You have to set
            // 'useFileTransport' to false and configure a transport
            // for the mailer to send real emails.
            'useFileTransport' => true,
        ],
    ],
];
```

NOTES:

- Yii won't create the database for you, this has to be done manually before you can access it.
- Check and edit the other files in the config/ directory to customize your application as required.
- edit this line `'dsn' => 'mysql:host=localhost;dbname=yii2advanced'`, and rename the `dbname` from `yiiadvanced` to `test`.

## step 3  accessing the installed Yii application using a browser
Its time to test whether the installed yii is working.You can use your browser to access the installed Yii application.Open your browser and type localhost/test.
Nb test is the name that we renamed our yiiadvanced name to.
You should first see the following directory;
```bash
Index of /test
[ICO]	Name	Last modified	Size	Description
[PARENTDIR]	Parent Directory 	 	- 	 
[ ]	LICENSE.md 	2020-08-07 23:30 	1.5K	 
[ ]	Vagrantfile 	2020-08-07 23:30 	2.6K	 
[DIR]	backend/ 	2020-08-07 23:30 	- 	 
[ ]	codeception.yml 	2020-08-07 23:30 	167 	 
[DIR]	common/ 	2020-08-07 23:30 	- 	 
[ ]	composer.json 	2020-08-07 23:30 	1.4K	 
[ ]	composer.lock 	2020-08-07 23:31 	169K	 
[DIR]	console/ 	2020-08-07 23:30 	- 	 
[ ]	docker-compose.yml 	2020-08-07 23:30 	864 	 
[DIR]	environments/ 	2020-08-07 23:30 	- 	 
[DIR]	frontend/ 	2020-08-07 23:30 	- 	 
[ ]	init 	2020-08-07 23:30 	8.6K	 
[ ]	init.bat 	2020-08-07 23:30 	319 	 
[ ]	requirements.php 	2020-08-07 23:30 	5.7K	 
[DIR]	vagrant/ 	2020-08-07 23:30 	- 	 
[DIR]	vendor/ 	2020-08-07 23:31 	- 	 
[ ]	yii 	2020-11-22 22:36 	717 	 
[ ]	yii.bat 	2020-08-07 23:30 	323 	 
[ ]	yii_test 	2020-11-22 22:36 	928 	 
[ ]	yii_test.bat 	2020-11-22 22:36 	328 	 
```
Inside frontend directory click the web directory and if the installation was successful you should  see the below "Congratulations!" page in your browser which include;
- MVC
- Some static pages
- contact via email form
- login and logout
- bootstrap  Ul template
- powerful debugger.


![A congratulatory note](congratulations.png)


## Congratulation for creating your first yii program.
Nb-Don't panic if you don't get a congratulation note,just go back a little and follow the steps.

## Step 4 Creating our first web application using yii 
Now that we have yii installed and working in our pc lets create our first yii frontend project.
We will start by creating the navigation bar.In our view directory we will open main.php under layout file and  enter the following;
```html
      <div>
<a style="padding-right: 20px"  href="<?= Yii::$app->urlManager->createUrl(['site/index'])?>">  Home</a>
      <li> <a style="padding-right: 20px"  href="<?= Yii::$app->urlManager->createUrl(['site/contacts'])?>">  Contacts</a> </li>
      <li> <a style="padding-right: 20px"  href="<?= Yii::$app->urlManager->createUrl(['site/about'])?>">  about</a> </li>
       <li> <a style="padding-right: 20px"  href="<?= Yii::$app->urlManager->createUrl(['site/signup'])?>">  sigh up</a> </li>> nv
        <li> <a style="padding-right: 20px"  href="<?= Yii::$app->urlManager->createUrl(['site/login'])?>">  login</a> </li>
      <br>
```
In the above code we have used PHP URL manager to root.
As we had discussed earlier about styles all your styles should be under the directory assets.You add all the css and js styles that you wish to.
```css
{
    public $basePath = '@webroot';
    public $baseUrl = '@web';
    public $css = [
        'css/site.css',
        'css/bootstrap.min.css',
        'css/styles.css',
    ];
    public $js = [
 
```
In our case all the style are in css folder and that how we will be linking  them.

## Body
Now lets design the body..This will be done inside the index.php file which is in the site directory.
This file contains the entire page of the website..
When we modify the index.php file we will have;
```html
<section id="introText">
  <div class="container">
    <div>
       <h3 class="panel-title" style="text-align: center"> <strong>Welcome</strong> </h3>  
         <P>
          Wow!Iam proud of myself,I have just created my first project using yii2.
         </P>
      <p> </p>
    </div>
   </div>
   </section> 
```
### Is framework important when codding?
This one depends on you as an individual,some people  will prefer framework while others won't.However,I would recommend someone to use framework especially the beginners since;
1. it is easy to install
2. encourages testing
3. utilizes modern technology


### conclusion
    Like any other good framework,Yii help you create modern web application quickly and make sure they
    perform well.It pushes you to create securable and testable site by doing a lot of the heavy lifting for you.
    I really encourage you to check it out for the next web project..

    Have You tried yii2??Why not?Try today!


