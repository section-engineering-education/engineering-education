---
layout: engineering-education
status: publish
published: true
url: /how-to-set-up-and-configure-redis-caching-for-wordpress/
title: How to Set Up and Configure Redis Caching for WordPress
description: This guide will teach you how to set up and configure Redis object cache for your WordPress website or blog. Redis is an open-source in-memory data structure store that can be used as a caching system.
author: catherine-macharia
date: 2021-07-29T00:00:00-03:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/hero.png
    alt: Redis Image Example
---

[WordPress](https://wordpress.org/) is an Open Source Content Management System (CMS). It allows you to manage content without learning how to code any web scripting language. You can build your website or blog and publish it on the Internet by simply adding texts, images, and videos. WordPress is run with PHP and a MySQL database.
<!--more-->
When building a WordPress-powered website, you will probably use themes and plugins to customize content features and appearance. You can also add more components to enhance your website iteratively and third-party extensions, such as SEO and analytics. The dependencies of these themes and plugins are stored in a MySQL database that you use to host the content of your page.

On the other end, [Redis](https://redis.io/) is an open-source in-memory data structure store that can be used as a caching system. It is a memory caching software that runs as a service in the background. This allows you to cache and store data in memory for high-performance data retrieval and storage. As a result, the strategy will enhance the server response time as well as the website speed.

This guide will teach you how to set up and configure Redis object cache for your WordPress website or blog. But first, let's see how the two works and why we should use them together.

### How WordPress works
There are foundational cores that are required for WordPress to work. These are WordPress core files and directories. There are also two essential folders in the WordPress core;

- The `wp-admin` - directory consists of WordPress admin pages that allow you to update and manage your website easily. In addition, it gives you access to the WordPress admin dashboard. These admin tasks include adding and editing posts and pages, managing users, uploading media files, deleting content, managing themes, and plugins, etc.

- The `wp-content` - It mainly consists of themes and plugin files. It also includes any media and data that upload to your page.

Two of the most important WordPress files include:

- The `wpconfig.php` - this file controls all the basic settings and configuration details of your WordPress website. It includes MySQL database connection settings, WordPress salts and keys, database table prefix, WordPress Language, and ABSPATH. As well as other information required to run your WordPress website.

- The `functions.php` - this file is one of the most important operating files of WordPress. WordPress themes also have a functions PHP file, and that's the file you need to edit, not the core file contained in the base directory of your website.

WordPress is built on top of a MySQL database. When you first install WordPress, you need to set up this one database on your website host. Then, every time you add new content to your website, it will be stored correctly in this database. So whenever a user accesses this website, a request is sent to the MySQL database server, and then the request is served back to the user from the same server to serve that user with the right content.

These operations can be time, and resource-consuming if you have a large backend WordPress panel such as a robust eCommerce engine.

### How Redis works
Assume you have a web application running on a server using a database like MySQL. That web application needs to retrieve some records from this database. Such queries take some time to return the requested records. And, if the query is expensive, a user waiting for that data for more than one minute may have a bad experience.

However, Redis is made to make such processing faster and efficient. With it, it's possible to store data processed by a MySQL database query inside of a Redis cache instance. This allows data to be retrieved directly from the server's memory. This way, the application will not go all the way back to the database.

Instead, the web server can check with Redis if it has the data it wants. So when another call is made and requires the same query transaction, instead of hitting the MySQL server again, the Redis object will serve the request from the object cache.

When you're running a large-scale fleet of hundreds of web servers, one Redis cache can even pool the requests and answers for all those webservers. This eliminates the need for them to go all the way to the database each time.

### Why set up Redis with WordPress
The benefit of enabling Redis Cache to your WordPress Core installation is to deliver the content to the client faster. WordPress does many MySQL query lookups, and it is very slow when you get lots of traffic.

In such a case, Redis cache plays a vital role and can be able to accomplish that use case. Redis will be a memory-based key-value pair database where it stores all the key-value data in the memory. Therefore, it is a fast caching solution for server-side such as WordPress.

We will set up a Redis object cache that will optimize WordPress database usage. Redis object can be used to store the cache of request outputs for a particular query sent to the MySQL server. When other users have accessed the same post or same article, it will serve the request from the object cache instead of hitting the MySQL server.

Thus eliminate the frequent WordPress MySQL database calls by caching the complex queries, and serve cached output for similar next request. This will eliminate the one round trip of going back to the MySQL server and enhance the server response time and site speed.

### Prerequisites
To follow along with this guide, you need a running WordPress website on a remote server. After all, we can't optimize a site running locally on your computer since WordPress is server-side rendered. Thus, you need to host WordPress to a remote server if you need to configure a Redis cache and optimize server response time and the site speed.

Check these tutorials and see how you can host one to [Cpanel](https://www.youtube.com/watch?v=0Zp9kGiYeDw), [Cloudways](https://www.youtube.com/watch?v=vVvEkeT2wOQ), [DigitalOcean clouds](youtube.com/watch?v=Owa2VKk9ghQ), or any remote hosting service of your choice. Basic knowledge of [using WordPress](https://www.wpbeginner.com/guides/) will be essential.

### Installing WordPress with AWS EC2 server
In this tutorial, I have set WordPress using AWS. Here are quick steps on how to set up one. First, make sure you have an [AWS account](https://aws.amazon.com/). A free tier account will work for this example.

- Head over to AWS console, navigate [EC2](https://aws.amazon.com/ec2/?ec2-whats-new.sort-by=item.additionalFields.postDateTime&ec2-whats-new.sort-order=desc) and launch instance. Then on the AWS marketplace, search for WordPress. Again this setup is free tier eligible. So go ahead and select WordPress packaged by Bitnami that this is running an apache server.

![aws-marketplace](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/aws-marketplace.png)

- Select AWS instance type. In this case, select t2 micro, which is free tie eligible. Then click review launch and finally launch the instance.

![choose-aws-instance-type](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/choose-aws-instance-type.png)

- Create a new key pair. This will allow us to connect to this server securely from a local computer. Make sure you download this key pair you have created and then launch the instances.

![aws-key-pair](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/aws-key-pair.png)

- Wait for AWS to initiate and launch your instances. To access the instance launches, click the launch id as shown below.

![launch-instances](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/launch-instances.png)

- Now you see the instance is running and WordPress is set. And if you select the instance, you can see the IP address assigned to it. Now you can open the Public IPv4 address on a browser to access the newly set WordPress blog. If you are running on production, you will just use your domain name.

![running-wordpress-instances](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/running-wordpress-instances.png)

### Accessing the server using PuTTY
Next, you need to download PuTTY. PuTTY is an open-source SSH and telnet client for the Windows platform. [Download PuTTY](https://www.putty.org/) and install it on your computer.

Once PuTTY is installed, search for PuTTYgen on your computer and launch it. Here we need to convert the key pair we previously created to a public-private key file. Then, on PuTTYgen, load the key, click generate and save a private key.

![ppk](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/ppk.png)

Open PuTTY and enter the server hostname/domain name. So navigate to the session and enter your IP address or a domain name (if you have set one).

![putty-ip-address-session](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/putty-ip-address-session.png)

Navigate to Connections 🡪 SSH 🡪 Auth and load the SSH key that you have just saved above and click open to connect

![load-ppk](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/load-ppk.png)

Once a terminal is launched, enter bitnami as login. Bitnami is the default username set when installing WordPress. If you have modified your username, just enter that in the terminal. We have an interactive terminal that we can use to add libraries and extensions to the WordPress server.

![login-terminal](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/login-terminal.png)

> As a note, to access your server in a terminal, you need a server that will allow you to install and run extensions from the hosting server.

### Adding Redis to the root server
Now we need to add Redis to the same root server that is running the WordPress. To do so, run the following command on the PuTTY terminal that we have just logged into.

```bash
sudo apt install redis
```

That's going to install Redis on this IP address. You can restart it to let everything get configured using `sudo systemctl restart redis.service`. Let's check if the Redis server is up and running by executing;

```bash
sudo systemctl status redis
```

![sudo-systemctl-status-redis](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/sudo-systemctl-status-redis.png)

Redis is well set inside our server. However, if you run `redis-cli` and the `keys *`, you can see we have no Redis cache keys registered yet.

![redis-empty-key-list](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/redis-empty-key-list.png)

Now we need to head to WordPress `wp-admin` and add a Redis plugin to set up everything together. So you will just enter your IP address or the domain and `wp-admin` as shown below.

```bash
your-ip-address/wp-admin
```

To access the wp-admin login details, head over to your running instance on AWS, right-click 🡪 Monitor and troubleshoot 🡪 Get system log. You will get your default Bitnami WordPress login details to access wp-admin. And you have accessed the admin Dashboard.

![wp-login-details](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/wp-login-details.png)

### Adding Redis to WordPress
Before setting Redis, I want you to go ahead and install and activate a Query Monitor plugin.

![query-monitor](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/query-monitor.png)

[Query Monitor](https://wordpress.org/plugins/query-monitor/) enables debugging of database queries, PHP errors, hooks and actions, block editor blocks, enqueued scripts and stylesheets, HTTP API calls, and more. Also, it helps to show total database queries grouped by a plugin.

Go to the home page of your website and click the Query Monitor menu.

![query-monitor-menu](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/query-monitor-menu.png)

This will launch a Query Monitor dashboard.

![query-monitor-dashboard](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/query-monitor-dashboard.png)

Now take a look at these metrics derived from this page. This is a pretty simple page, and you can see it load with a total of 23 Database Queries that takes 0.0013 milliseconds to run.

Now go ahead and add a new plugin. For example, search Redis and select this specific Redis Object Cache plugin.

![redis-object-cache-plugin](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/redis-object-cache-plugin.png)

Install and activate this plugin. Then head over to Redis settings (on your dashboard menu). Now you should enable Object Cache.

![enable-object-cache](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/enable-object-cache.png)

This will set Redis using the default settings.

![redis-object-cache-set](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/redis-object-cache-set.png)

### Verify if Redis working
If you go to your website and access a blog, let’s say the default hello world WordPress blog, the results of this request will be saved to Redis.

Go to the terminal and access Redis CLI using `redis-cli` and the `keys *`. And now you can see Redis has registered some new wp keys.

![redis-wp-keys](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/redis-wp-keys.png)

That is it. Redis is ready to do some caching for your WordPress.

Now refresh the home page that you loaded Query Monitor.

![query-monitor-dashboard](/engineering-education/how-to-set-up-and-configure-redis-caching-for-wordpress/query-monitor-dashboard2.png)

And you can see the page is now loading with only 3 Database Queries taking 0.0003 milliseconds. Our total database query time is now considerably lighter than where it was. All those queries are now being saved into memory, reducing the calls you have to do directly to the MySQL database. This makes the backend faster to return requests.

### Conclusion
If you are running an extensive website such as woo-commerce, this will play a big part in making your website faster. Also, this will cache database-intensive tasks make the site more resilient.

Even when you have many users placing orders, they are pulling information from the cache. You will use fewer resources and have a faster backend experience.

Redis only caches database queries and objects. This means you can still continue using other cache plugins such as [Cache Enabler](https://wordpress.org/plugins/wp-cloudflare-page-cache/) and [WP Cloudflare](https://wordpress.org/plugins/wp-cloudflare-page-cache/) to cache your pages and make your website even more faster.

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
