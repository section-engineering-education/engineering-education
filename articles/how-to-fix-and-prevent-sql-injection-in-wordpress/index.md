---
layout: engineering-education
status: publish
published: true
url: /engineering-education/how-to-fix-and-prevent-sql-injection-in-wordpress/
title: How to fix and Prevent SQL Injection in WordPress
description: Introduction to SQLi in WordPress, SQL injection (SQLi) is the injection or insertion of SQL code, usually via data transmitted from a website.
author: james-kahwai
date: 2020-10-08T00:00:00-13:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-fix-and-prevent-sql-injection-in-wordpress/hero.jpg
    alt: SQLi injection image example
---
SQLi in [WordPress](https://kinsta.com/knowledgebase/what-is-wordpress/) is [ranked as the second most critical vulnerability](secure.wphackedhelp.com). [Updating your WordPress website](https://wordpress.org/support/article/updating-wordpress/) can shield you from SQLi; however, third-party themes and plugins still pose a significant threat.
<!--more-->
### Introduction
SQLi is the manipulation of a security flaw in database systems. WordPress, as a platform, runs server-side scripts in PHP and uses SQL databases. Hence, SQL and PHP make WordPress websites vulnerable to attackers. They could insert malicious URLs (which are embedded with commands) that trigger unwanted behaviors from your database.

Consequently, your database's sensitive information is exposed or leaked to hackers, which they can use to manipulate your WordPress website.

#### What is SQLi?
SQL injection (SQLi) is the injection or insertion of SQL code, usually via [data transmitted from a website](http://web.archive.org/web/20200817021102/https://secure.wphackedhelp.com/blog/wordpress-sql-injection-prevention). When an SQLi attack is deployed successfully, it gives them access to sensitive information and the ability to add/edit/delete data from a database.

Every action you can take regarding a database can be executed by the attacker. Other than PHP, [the ASP language](https://www.w3schools.com/asp/default.ASP) is also prone to SQLi.

An attacker uses data input by the user into the database that isn't sufficiently masked and contains meta-characters, i.e. semicolons, quotation marks, and double hyphens. These parameters have specific functions with which the SQL interpreter uses to execute external commands.

SQLi targets old interfaces that often do not necessarily mask key parameters such as ASP and PHP, making them a perfect target for an SQLi attack.

### Types of SQLi Attacks
Now we know the basics of SQLi, let's dive into the various types of attacks and why they happen. There are several types of SQLi attacks, and they are classified depending on their technique. They are:

#### In-Band SQLi
- Error-Based SQLi
- Union Based Attack

#### Inferential/Blind SQLi
- Boolean Blind SQLi
- Time-Based Attack

#### Out-of-Band SQLi

### Inferential/Blind SQLi
In some scenarios, the attacker will generate an error in an SQL query, but the response may not be transmitted as he may expect to a webpage. The attacker will need to probe further into the error.

In this type of SQLi, the attacker needs to send various queries to the database and see how it analyses data hence known as an Inferential attack or Blind SQLi. We shall look into two types of blind SQLi attacks, namely: boolean SQLi and time-based SQLi.

#### Boolean SQLi
An attacker will send an SQL request with an intent to list the database. If it results in an SQL error that has not been handled internally within the application, the webpage displays an error, loads partially, or a blank page.

In a boolean attack, the attacker will assess what part of a user's input is susceptible to SQLi through two versions of a boolean clause. They are:
~~~~sql
“and 1=1”
~~~~
~~~~ sql
“and 1=2”
~~~~

If the application works as expected on the first clause but works anomaly with the second clause, it is vulnerable to an SQLi.

#### Time-based SQLi
This attack is used to determine if a vulnerability exists in an SQL database. A pre-defined time function is put in place by an attacker targeting the database management system. For instance, the function sleep() in MySQL instructs a database to wait for several seconds. See below;
~~~~sql
select * from comments WHERE post_id=1-SLEEP(15);
~~~~

If the query results in a delay, then the database is vulnerable to an attack.

### In-Band SQLi
This type of SQLi is, by far, the simplest. An attacker uses the same channel to input malicious SQL codes and gathers results on the same. Let's look into two types of In-Band SQLi, namely: Error-based SQLi and Union-based SQLi.

#### Error-Based Injection
This type of attack is used in the earlier phases of SQLi. The attacker uses the error-based injection to learn more about the database structure and table names used in the web application.

For example, once an attack has been initiated, the corresponding error messages may include table names and column table names. The information can be useful to further the attack.

#### Union Based Injection
This injection type uses the [SQL UNION command](https://www.w3schools.com/sql/sql_union.asp) to append or combine requests, which are then displayed as a partial HTTP response. This SQLi attack targets a band where the UNION operator can simultaneously extract data from several tables within the database.

Besides, for the attack to be successful, the table must have the same type of data and the same number of columns. Hackers manipulate the SELECT statement to collect the information they are looking out for.

#### WordPress Plugins Vulnerability
WordPress is the most popular open-source Content Management System (CMS), running millions of websites. It's approximated the [CMS enjoys a 61% market share](https://kinsta.com/blog/wordpress-statistics/). Your WordPress website is secure from SQLi only if the WordPress core files are up-to-date.

##### What are WordPress Core files?
These are the files that make up the open-source CMS project. Below is an image of what [WordPress core files](https://wpsupergeek.com/what-are-the-wordpress-core-files) look like.
![wordpress-core-files](/engineering-education/how-to-fix-and-prevent-sql-injection-in-wordpress/wordpress-core-files.png)
Are your WordPress core files running on the latest version?

As we have found out, your WordPress site is secure from any SQLi if your core files are updated. Nevertheless, the use of third-party plugins and themes change the narrative and can expose you exponentially.

Here is a list of the most prone types of WordPress plugins that you should be on the lookout for. They include;

1. Subscription pop-ups
2. Login/Signup forms
3. E-commerce checkout pages/carts
4. Search bars
5. Contact forms
6. Feedback forms
7. Generic contact forms
8. Blog comment forms
9. Search parameters

The [Exploit-DB website](https://www.exploit-db.com/search?q=) provides a detailed context of vulnerabilities occurring in WordPress plugins. Furthermore, it points out how the attacks affected victim websites and the solution deployed.  

### How to Detect and Fix WordPress SQLi Attack?

##### Fix WordPress SQLi Attack: Damage Control
An attacker targets the database at any given point, as that is the only source for information on your website. Firstly, disable admin privileges on your database. Henceforth, the attacker is tied down to a read-only database that is not of much help.

Proceed to sanitize the UDF files the attacker used to obtain the OS Shell. Also, change your encrypted password to stronger values. Finally, check if the port 3306 is open on the internet and, if so, block it.

##### Fix WordPress SQLi Attack: Database Clean Up
A database clean-up is required to fix any possible SQLi on your site's database. Here are steps to do so as well as the function cheatsheet.

Step 1: Look up all your tables using the command show tables; Look out for a table named Sqlmap.

Step 2: If the table Sqlmap is present, it has been used against your website. Delete the Sqlmap table using the command:
~~~~sql
DROP TABLE Sqlmap;
~~~~

Step 3: Look out for new/foreign users in your database using the following code:

~~~~sql
Select * FROM users  AS u AND u.created > UNIX_TIMESTAMP(STR_TO_DATE('sept 22 2020', '%M %d %Y '));
~~~~
Manipulate the string in the code to determine when any of the users found were created.

Step 4: Delete any rogue users using the command below:

~~~~sql
DROP USER 'malicious'@'localhost';
~~~~

Step 5: Change and secure your passwords using the command below:
~~~~sql
UPDATE users SET pass = concat('ZZZ', sha(concat(pass, md5(rand()))));
~~~~

##### Fix WordPress SQLi Attack: Vital updates
Updates for your WordPress site are very vital in keeping ahead of the day to day vulnerabilities. Make sure to update your WordPress Core files often as well as your theme and plugins.

Avoid using [nulled themes or nulled plugins](https://wordpress.stackexchange.com/questions/232041/what-are-nulled-themes/) on your WP site. Also, make sure to use reputable plugins on your site.

##### Fix WordPress SQLi Attack: Use a Firewall
A firewall detects and shields your website from SQLi and other attacks, depending on your firewall service provider's features. There are several WordPress firewall security solutions on the internet such as [Sucuri](https://wordpress.org/plugins/sucuri-scanner/), [WordFence](https://wordpress.org/plugins/wordfence/), [iThemes](https://wordpress.org/plugins/better-wp-security/), [Cerber Security](https://wordpress.org/plugins/wp-cerber/), and [All In One Wp Security](https://wordpress.org/plugins/all-in-one-wp-security-and-firewall/). You should also check with your hosting provider, they may have one already.

##### Fix WordPress SQLi Attack: Pentesting
[Pentesting/penetration testing](https://www.cloudflare.com/learning/security/glossary/what-is-penetration-testing/) or rather a website security audit is vital to keep your WP site protected. WordPress Pentesting involves making simulated SQLi attacks on your site to make sure all loopholes are covered. This process ensures all loopholes are found and sealed before an attacker finds and takes advantage of them.

### How to Prevent SQLi in WordPress
As they say, prevention is better than cure. Don't wait to prove if that's right or wrong with a successful SQLi. Proper site maintenance practices will save you from SQLi attacks.

These practices include regular updates for WordPress core files, plugins updates, using reputable plugins, avoid nulled themes, and minimize user input such as subscription pop-up forms as much as possible.

[WordPress has prepared statements for database operations](https://developer.wordpress.org/reference/classes/wpdb/) that are well structured to mitigate risk on your website. Ensure context data filtering is enabled on your website, such as only allowing digits for phone number fields.

##### Use Secure WordPress themes and Plugins.
Themes and plugins are unavoidable while using the WordPress CMS; hence they are the silver lining to the open-source project. Nevertheless, ensure you are using reputable plugins and themes from the WordPress repository.

If you plan to use premium plugins and themes, you want to look for them at top-rated repositories such as [Envato Market.](https://envato.com/)

Be more vigilant with contact form and subscription plugins as any user input poses a threat to your site.

##### Mask your WordPress version
Another way to give hackers a hard time cracking your website is to hide your WP version. To do so, use the code below:

```php
remove_action(‘wp_head’, ‘wp_generator’);
```

##### Minimize database user privileges
Grant the minimum possible user privileges for users connecting to your database, but they also must have the right privileges to execute actions on the database.

NB: Never use the root user (because it has all access) to access the database as this poses more risk to your website if hackers target your site.

##### Verify data entered by the user
This is one of the best ways to outsmart a possible SQLi in your database. Different programming languages have different functions to verify data from query responses. In this article, we shall look at the PHP language.

For numbers use;
```php
ctype_digit ()
```

For text strings use;
```php
 ctype_alpha ()
 ```
##### Delimit the value of your queries
Practice enclosing the value of your queries using single quotes. Look at the example below;
~~~~ sql

SELECT name FROM users WHERE id_user = $ id
~~~~

The above SQL statement is more prone to SQLi than the statement below

~~~~ sql
SELECT name FROM users WHERE id_user = '$ id'
~~~~
Where $ id is an integer.

### Summary
A WordPress web developer should keep abreast of recent tricks and loopholes that hackers are manipulating. Ensure you implement clean coding practices on your WordPress website project and mitigate possible SQLi attacks.

All SQLi exploits happening day-to-day are all listed on the [Exploit-DB](https://www.exploit-db.com/search?q=) platform.

---
Peer Review Contributions by: [Louise Findlay](/engineering-education/authors/louise-findlay/)
