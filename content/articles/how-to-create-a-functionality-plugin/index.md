---
layout: engineering-education
status: publish
published: true
url: /how-to-create-a-functionality-plugin/
title: How to Create a Functionality Plugin
description: This article will walk you through WordPress plugins. WordPress plugins are crucial while designing any WordPress website. Plugins determine how your website functions by adding extra functionality to it.
author: esther-waithera
date: 2021-08-04T00:00:00-13:30
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/content/how-to-create-a-functionality-plugin/hero.jpg
    alt: Functionality plugin example image
---
WordPress plugins are crucial while designing any WordPress website. Plugins determine how your website functions by adding extra functionality to it.
<!--more-->
Some functionalities are either too basic or too customized for there to be a plugin for it. Therefore it can sometimes be challenging to find a plugin that meets your needs.


This article will walk you through WordPress plugins and how to create one.
### Table of contents
[An overview of WordPress plugins](#an-overview-of-wordpress-plugins)
[How WordPress plugins work](#how-wordpress-plugins-work)
[WordPress plugin development](#wordpress-plugin-development)
[Step 1: Requirements definition](#step-1-requirements-definition)
[Step 2: Navigate to WordPress plugins folder and create your plugin file](#step-2-navigate-to-wordpress-plugins-folder-and-create-your-plugin-file)
[Step 3: Create the main PHP file for your plugin](#step-3-create-the-main-php-file-for-your-plugin)
[Step 4: Set up your plugin to add functions](#step-4-set-up-your-plugin-to-add-functions)
[Functionality plugin](#functionality-plugin)

### Prerequisites
To create and run a plugin on your WordPress website, you will need ;
- A comprehensive understanding of WordPress, Html, CSS, JavaScript, and PHP
- A text editor
- WordPress installed on your computer

### An overview of WordPress plugins
[Plugins](https://www.wpbeginner.com/glossary/plugin/) are extra tools that you install to add additional features and functionality to your WordPress website. A default WordPress installation is like a computer with no applications and software. With WordPress, plugins are like those extra applications and software you install to do different things.

Customizing a WordPress website may not be enough. You might need to add more for it to satisfy your requirements. That is why plugins are powerful tools that can bring changes to your website. In this WordPress plugin development tutorial, we will create a functionality plugin that will display a link that is a fixed link inside the footer of our website and will show up on every page. The link can direct you to another page or website for a service to satisfy your needs.

Plugins such as Yoast help your site rank high in the search engines, WooCommerce helps you set up an online store, while others allow you to improve your site's performance.

To use plugins, you can either build and import your plugin to add specific functionality or install them on your website. Do not install plugins from sources you do not trust. You can generally trust plugins available through wordpress.org. Also, make sure the plugin you install does an excellent job and matches your website's needs.

### How WordPress plugins work
A WordPress plugin works by integrating and running a set of functions on the WordPress software. WordPress is programmed in a way that developers can add their code to it. In simpler terms, WordPress is written in a way that it can be extended using plugins.

The plugin adds extra code to your WordPress website, thus making it more functional. As a result, it enables you to customize your website as per your need. Unfortunately, adding a plugin to your site is heavier than you may think.

Data in WordPress is stored in the WordPress database. Each plugin installed on a WordPress website is installed in your WordPress database. Therefore, you can activate and deactivate the plugins at any time.

Once you access the website, WordPress connects to the database, loads the main software, and loads the active plugins. After that, the code runs and gets processed on your server and then sent to the browser.

### WordPress plugin development
When WordPress is updated, its main files override. Therefore, if a custom functionality is added to the original WordPress code directly, your changes are wiped out upon the WordPress update. That is why plugins are essential. Thus, adding any feature and functionality should be done using plugins.

With that, let us go through the steps of WordPress plugin development:

#### Step 1: Requirements definition
The first step of creating a functional WordPress plugin is defining the development requirements. First, make sure you have a clear idea of the objective of the plugin. Also, the issue the plugin will resolve.

Consider what the features and the functionality of the plugin are. When you gather all the requirements, you can move to the second step of plugin development. In our case, we will create a plugin that will display a fixed link on the footer of our website to show up on all pages.

#### Step 2: Navigate to WordPress plugins folder and create your plugin file
To create a WordPress plugin directory structure, first navigate to the default WP directory for storing the plugin code. On your text editor, head to the wp-contents/plugins/ folder of your WordPress directory. In our case, we will use Visual Studio Code editor. Create a new folder and name it using the plugin's name, then separate the words using hyphens such as `functionality-plugin`.

The next step is to create a PHP file inside the folder: `functionality-plugin.php` as shown below:
![PHP file](/engineering-education/how-to-create-a-functionality-plugin/php-file.jpg)

#### Step 3: Create the main PHP file for your plugin
Before adding a code that adds functionality to your plugin file, it is vital to provide and define the information of the plugin you are developing. WordPress wants all the plugins to follow its standards. Below is basic information about the plugin we are developing:  

```
/*
* Plugin Name: Functionality Plugin
* Description: This plugin will display a fixed link on your website's footer.
* Version: 1.0.0
* Author: Your Name or Your Company
* Author URI: http://yourdomain.com
* License: GPL2
*/
```

Ensure that you save the PHP file, then navigate to your WP dashboard and click on Plugins on the left panel. You will see your plugin listed there.

![Plugin description](/engineering-education/how-to-create-a-functionality-plugin/plugin-desc.jpg)

#### Step 4: Set up your plugin to add functions
Our plugin is empty after the basic plugin setup and can't add any functionality to a website. So the next step of plugin development is setting up the plugin code and adding functions. This is the step where you bring the idea to life.

Our plugin example will display a fixed button that acts like a link in our website's footer, which will show up on each page. We will use CSS to style the plugin and JavaScript to show how to do it. JavaScript displays an alert if the code is well executed.

First, to make the button appear, we need a function, and we need to hook this function into an action hook. Action hooks add or override the core functionality of WordPress.

We will use the `functionality-plugin.php` file to add the plugin's functionality and the complete code will look as below:

```php
//include CSS and JS
function dl_enqueue_assets () {
    wp_enqueue_style( 'functionality-styles', plugin_dir_url( __FILE__ ) . 'styling/style.css' );
    wp_enqueue_script( 'functionality-scripts', plugin_dir_url( __FILE__ ) . 'styling/script.js', array('jquery') );
}
add_action ("wp_enqueue_scripts", "dl_enqueue_assets");

// action fixed button
function dl_fixed_button (){
    ?>
    <a href="#" class="dl_fixed_button">Click Here!</a>
<?php
}
add_action ("wp_footer","dl_fixed_button");
```
We created a new folder inside `functionality-plugin` folder and named it `styling`. Inside folder `styling` we created the `style.css` and`script.js` files that style the plugin and show how the plugin functions. In our main plugin code we included the `style.css` and`script.js` files. Below is the CSS and JavaScript code you will include in your php file.`style.css`:

```css
.dl_fixed_button {
    display:inline-block;
    background:#fd63dc;
    color:#fff;
    padding:5px 10px;
    font-size:12px;
    font-weight:bold;
    position:fixed;
    z-index:100;
    bottom:20px;
    left:20px;
    text-decoration: none;
}
```
`script.js`:

```JavaScript
 jQuery (function($){
   $ ('.dl_fixed_button').click(function(){
       alert('A good click!');
   });
 });
```

This is how the plugin works in a WordPress website:

![Functionality Plugin](/engineering-education/how-to-create-a-functionality-plugin/plugin.gif)

You can download the source code from [here](https://github.com/essy258/how-to-create-a-wordpress-plugin/)

### Functionality plugin
Hopefully, if you have made it this far, we agree that developing a WordPress plugin is relatively easy. However, if you're creating a plugin, I suggest you familiarize yourself with how [actions and filters work](https://docs.presscustomizr.com/article/26-wordpress-actions-filters-and-hooks-a-guide-for-non-developers).

Coding WP plugins help you to gain a more profound knowledge of how WordPress works. Furthermore, you can freely share your plugin with others via the [WordPress plugin directory](https://wordpress.org/plugins/) if you develop useful plugins.

### Conclusion
Congratulations! You developed a WordPress plugin. This tutorial gives you steps to follow while creating a WP functionality plugin. We created a plugin that displays a fixed link inside the website's footer and showing up on every page. Following and putting this tutorial into practice enables you to build plugins, thus expanding your WordPress website's functionality.

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
