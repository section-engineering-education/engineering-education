### Introduction
SQL injection in [WordPress](https://kinsta.com/knowledgebase/what-is-wordpress/) is [ranked the second most critical vunerability](secure.wphackedhelp.com). [Updating your WordPress website](https://wordpress.org/support/article/updating-wordpress/) to the latest release shields you from SQL injection. Nevertheless, third party themes and plugins still pose a big threat to WordPress users. When you hear SQL injection, you understand it is the manipulation of a security flaw in database systems. WordPress as a platform runs server-side scripts in PHP. SQl and PHP hence make WordPress vulnerable to attackers via inserting malicious URLs embedded with commands that trigger behaviours from the database. Consequently,  sensitive information from your database is exposed or leaked to hackers which they can use to manipulate your WordPress website.

#### What is SQLi?

SQLi is an abbreviation for SQL injection.

SQL injection is the injection or insertion of SQL code usually via data transmitted from a website. When an SQL injection attack is deployed successfully, it gives them access to sensitive information as well as ability to add/edit/delete data from a database. Generally, SQLi gives an attacker the possibility to execute all actions related to a database. SQLi takes advantage of PHP and SQl database hence posing a big risk to WordPress. Other than PHP, [the ASP language](https://www.w3schools.com/asp/default.ASP) is also prone to SQLi.

An attacker makes use of data input by the user in to the database that is not masked sufficiently and that which contains meta characters i.e. semicolon, quotation marks and double hyphen. These parameters have specific functions with which the SQL interpreter uses to execute external commands. SQL injection targets old interfaces which often do not necessarily mask key parameters hence making ASP and PHP programs a perfect SQLi target for an attack.

### Types of SQl Injection Attacks

We are now in a position to understand the basics of SQLi, now let's dive into the various types of SQLi attacks and why they happen. There are several types of SQL injection attacks and they are classified depending on their technique. They are;

#### In-Band SQl Injection

- Error-Based SQl Injection
- Union Based Attack

#### Inferential/Blind SQL Injection

- Boolean Blind SQL injection
- Time-Based Attack

#### Out-of-Band SQL Injection

### Inferential/Blind SQL Injection

In some scenarios the attacker will generate an error in an SQL query but the response may not be transmitted as he may expect to a webpage. The attacker will need to probe further into the error.

In this type of SQLi, the attacker needs to send various queries to the database and see how it analyses data hence known as an Inferential attack or Blind SQL Injection. We shall look into two types of blind SQLi attacks namely: boolean SQLi and time-based SQLi.

#### Boolean SQL Injection

An attacker will send SQL request with an intent to list the database. If it results in an SQL error that has not been handled internally within the application, the webpage displays an error, loads partially or a blank page. In a boolean attack, the attacker will assess what part of a user's input are susceptible to SQLi through two versions of a boolean clause. They are;
~~~~ sql
“and 1=1”
~~~~
~~~~ sql
“and 1=2”
~~~~

If the application works as expected on the first clause but works anomaly with the second clause then it is vulnerable to an SQLi.

#### Time-based SQL Injection

This attack is used to determine if a vulnerability exists in an SQl database. A pre-defined time function is put in place by an attacker targeting the database management system. For instance, the function sleep() in MySQl instructs a database to wait for a number of seconds. See below;
~~~~sql
select * from comments WHERE post_id=1-SLEEP(15);
~~~~ 

if the query results in a delay, then the database is vulnerable to an attack.

### In-Band SQL Injection

This is by far the simplest form of SQLi. An attacker uses the same channel to input malicious SQL codes as well gather results on the same. Let's look into twotypes of In-Band SQLi namely: Error-based SQL injection and Union-based SQL injection.

#### Error- Based Injection

This type of an attack is used in the earlier phases of SQLi. The attacker uses the error-based injection to learn more about the database structure and table names as used in the web application. For example, once an attack has been initiated the corresponding error messages may include table names and column table names. The information can be useful to further the attack.

#### Union Based Injection

This type of injection uses the [SQL UNION command](https://www.w3schools.com/sql/sql_union.asp#:~:text=The%20SQL%20UNION%20Operator,also%20have%20similar%20data%20types) to append or combine requests which are then displayed as a partial HTTP response. This type of SQL injection attack targets a band where the UNION operator is able to simultaneously extract data from several table with the database. Nevertheless, for the attack to be successful the table must have the same type of data and same number of columns. Hackers manipulate the SELECT statement to collect the information they are looking out for.

#### WordPress Plugins Vulnerability

WordPress is the most popular open-source Content Management System (CMS) running millions of websites. It's approximated the [CMS enjoys a 61% market share](https://kinsta.com/blog/wordpress-statistics/). Your WordPress website is secure from SQL injection only if the WordPress core files are up-to-date.

##### What are WordPress Core files?

This are the files that make up the open-source CMS project. Below is an image of what [WordPress core files](https://wpsupergeek.com/what-are-the-wordpress-core-files/#:~:text=When%20you%20install%20WordPress%2C%20you,admin%20interface%20of%20your%20website.&amp;text=Core%20files%20make%20up%20the,themes%2C%20plugins%2C%20and%20images.) look-like.
![](RackMultipart20200924-4-vev2ug_html_234a53423f395fab.png)
Ask yourself, is WordPress Core running on the updated patch?

As we have found out, your WordPress site is secure from any SQL injection if your core files are updated. Nevertheless, use of third-party plugins and themes change the narrative and exposes you exponentially. We shall list the most prone WordPress plugin installation areas that you be on the look-out. They include;

1. Subscription pop-ups
2. Login/Signup forms
3. E-commerce checkout pages/carts
4. Search bars
5. Contact forms
6. Feedback forms
7. Generic contact forms
8. Blog comment forms
9. Search parameters

For more detailed context on WordPress plugin vulnerability updates as they happen, how they impacted websites and how they were fixed, check the [Exploit-DB website](https://www.exploit-db.com/search?q=).

### How to Detect &amp; Fix WordPress SQL Injection Attack?

##### Fix WordPress SQL Injection Attack: Damage Control

An attacker targets the database at any given point as that is the only source for information on your website. Firstly, disable admin privileges on your database. Henceforth, the attacker is tied down a read-only database that is not of much help to them.

Proceed to sanitize the UDF files the attacker used to obtain the OS Shell. In addition, change your encrypted password to more stronger values. Finally, check if the port 3306 is open on the internet and if so, block it.

##### Fix WordPress SQL Injection Attack: Database Clean Up

A database clean-up is required to fix any possible SQL injection on your site's database. Here are steps to so as well with the function cheat-sheet.

Step 1: Look up all your tables using the command show tables; Look out for a table named Sqlmap.

Step 2: If the table Sqlmap is present, it has been used against your website. Delete the Sqlmap table using the command 
~~~~sql
Drop table Sqlmap;
~~~~

Step 3: Look out for new/foreign users in your db using the following code

~~~~sql
Select * from users  as u AND u.created > UNIX_TIMESTAMP(STR_TO_DATE('sept 22 2020', '%M %d %Y '));
~~~~
Manipulate the string in the code to determine when any of the users found were created.

Step 4: Delete any rogue users using the command below:

~~~~sql
DROP USER 'malicious'@'localhost';
~~~~

Step 5: Change and secure your passwords using the command below.
~~~~sql
update users set pass = concat('ZZZ', sha(concat(pass, md5(rand()))));
~~~~

##### Fix WordPress SQL Injection Attack: Vital updates

Updates for your WordPress site are very vital in keeping ahead of day to day vulnerabilities. Make sure to update your WordPress Core files oftenly as well as your theme and plugins. Avoid using nulled themes on your WP site. In addition, make sure to use reputable plugins on your site.

##### Fix WordPress SQL Injection Attack: Use a Firewall

A firewall detects and shields your website from SQL injection as well other attacks depending on the features of your firewall service provider. There are quite of firewall security solutions on the internet; look out for one that suits your WP security needs.

##### Fix WordPress SQL Injection Attack: Pentesting

[Pentesting/penetration testing](https://www.cloudflare.com/learning/security/glossary/what-is-penetration-testing/) or rather website security audit is a vital operation to keep your WP site away from possible SQL injection attacks. WordPress Pentesting involves doing simulated SQLi attacks on your site to make all loopholes are covered. This process ensures all loopholes are found and sealed before an attacker finds and takes advantage of the same.

### How to Prevent SQL Injection in WordPress

As they say, prevention is better than cure. Don't wait to prove if that is right or wrong with a successful SQLi on your WordPress website. Proper site maintenance practices will save you from SQL injection attacks. These practices include regular updates for WordPress core files, plugins updates, use of reputable plugins, avoid nulled themes and minimal user inputs fields as much as possible.

Normalize use of ready-made commands for your database operations. WordPress has prepared statements for database operations which are well structured to mitigate risk on your website. Ensure your website is enabled for context data filtering such as only allowing digits for phone number fields.

##### Use Secure WordPress themes &amp; Plugins

Themes and plugins are unavoidable while using the WordPress CMS hence they are the silver lining to the open source project. Nevertheless, ensure you are using reputable plugins and themes from the WordPress repository. If you are going to use premium plugins and themes you want to look for such at top rated repositories such as [Envato Market.](https://envato.com/)

Be more vigilant with contact form and subscription plugins as they pose user input threat to your site.

##### Mask your WordPress version

This may seem nagging but you may want to give hackers a hard time cracking your website. To hide your WP version, use the code below;

```php
remove_action(‘wp_head’, ‘wp_generator’);
```

##### Minimize user privileges for database user

Grant the minimum possible user privileges for users connecting to your database but they also must have the right privileges to execute actions on the database.

NB: Never use the root user (has all access to all databases) to access the database as this pose more risk to your website in case hackers targeted your site.

##### Verify data entered by the user

This is one of the best ways to outsmart a possible SQL injection in your database. Different programming languages have different functions to verify data from query responses. In this article, we shall look at PHP language.

For number data type use; 
``` php
ctype_digit ()
```

For text string use;
``` php
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

In a close-up, we have largely covered different areas in SQL injection. As a WordPress web developer, you should be able to keep abreast of recent tricks and loopholes that hackers are taking advantage of. All SQLi exploits happening day-to-day are all listed on [Exploit-DB](https://www.exploit-db.com/search?q=) platform.