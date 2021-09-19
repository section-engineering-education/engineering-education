### Introduction

---

A website with `multi-language` support attracts visitors from all over the world, and users with varying language preferences are satisfied with the content provided in their preferred language.
It displays its content in a variety of languages dependent on the user's preferences.

There are numerous countries in the world that do not speak English.
Local readers can select to view articles published in their own language.

You can expand your website's readership by supporting these languages.
## Table of contents

---

- [Features of a multi language support website](#features-of-a-multi-language-support-website)

- [Ways to add multi-language support to a website](#ways-to-add-multi-language-support-to-a-website)

- [About this example](#about-this-example)

- [PHP examples files created to enable multi-language support](#php-examples-files-created-to-enable-multi-language-support)

- [Database script](#database-script)

- [How to make a web page HTML for multi language support](#how-to-make-a-web-page-HTML-for-multi-language-support)

- [HTML language specification](#html-language-specification)

- [How to switch the language of the content in PHP](#how-to-switch-the-language-of-the-content-in-PHP)

- [Loading non-database text from language files](#loading-non-database-text-from-language-files)

- [How to localize content from the database](#how-to-localize-content-from-the-database)

- [Multi-language PHP example demo](#multi-language-PHP-example-demo)

- [PHP example output multilingual page supporting two-languages](#php-example-output–multilingual-page-supporting-two-languages)

- [conclusion](#conclusion)
## Features of a multi-language support website

---

To change the language of the content, there is a `menu or an input`.
By default, content is loaded in the reader's language.
- If the reader's language isn't supported, this option allows for a default language setup.

- Allows you to switch between static and dynamic content depending on the language you choose.

- Converts page URLs based on the language specified.

## Why website needs  multi-language support

---
Other reasons for our website's need for your assistance are listed below;
- It will help you create your brand regardless of where you are, who you are, or what language you speak.
- It will demonstrate your commitment to and support for your readers.

- It helps to promote yourself as a content creator for a global audience.

- It will cause readers to prioritize you above your competition.

### Ways to add multi-language support to a website

---
There are several methods for enabling `multi-language` support in an application:
- By having duplicate pages in the required languages with the same content.
- Using files containing texts in several languages to manage language configuration (localization).



I prefer the second option because the first will result in discrepancies among the duplicate pages.

It will load material on a page template that is common for all languages if localization is done via files.

## About this example

---
 Various methods for enabling multi-language support in an application include:
- Duplicating pages with the identical content in the required languages.

 - Managing language configuration (localization) with files that contain texts in many languages. 
  
  Because the first way leads to inconsistencies among duplicate pages, I favor the second method. 
  
  It will load material on a page template that is common to all languages if localization is done via files

## PHP examples files created to enable multi-language support

---
This is a set of example files for utilizing `PHP` to enable two-language compatibility on a webpage.

The `language` and `SQL` `files`, as well as the file hierarchy, are shown in the image below.
**Example**

![language and SQL files](https://phppot.com/wp-content/uploads/2017/03/multi-language-support-in-a-page-using-php-files.jpg)
## Database script

---
This is the `SQL script` that contains the table structure and data that is necessary.
Make a development database and drop this script in there.
Set up the datasource with the proper credentials.

Then, in your `PHP environment`, execute this example..

**Example**
```database script

-- database:'blog_samples'
--
--table structure for table `tbl_newsletter`
--
CREATE TABLE `tbl_newsletter`(
--
`id` int(11) NOT NULL,
`en_title` varchar(255) NOT NULL,
`en_description` text NOT NULL,
`de_title` varchar(255) NOT NULL,
`de_description` text NOT NULL
) ENGINE=innoDB DEFAULT CHARSET=latin1;
--
-- dumping data for table`tbl_newsletter`
--
INSERT INTO `tbl_newsletter` (`id`, `en_title`, `en_description`, `de_title`, `de_description`) VALUES
(1, 'Example Content', 'It was popularised in the 1960s with the release of Letraset sheets containing passages, and more recently with desktop publishing software like Aldus PageMaker including versions', 'Beispiel Inhalt', 'Bekannt wurde es 1960, mit dem erscheinen von \"Letraset\", welches Passagen von enhielt, so wie Desktop Software wie ebenfalls mit.'),
(2, 'Usage Example', 'The standard chunk of used since the 1500s is reproduced below for those interested. Also reproduced in their exact original form.', 'Anwendungsbeispiel', 'Der Standardteil von, genutzt seit 1500, ist reproduziert für die, die es interessiert abgeleitet von der Englischen Version aus.');
---
-- indexes for table `tbl_newsletter`
--
ALTER TABLE `tbl_newsletter`
 ADD PRIMARY KEY (`id`);
--
-- AUTO_INCREMENT for table `tbl_newsletter`
--
ALTER TABLE `tbl_newsletter`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
```
## How to make a web page HTML for multi-language support

---
This is a one-page demonstration of how to use `PHP` to provide multi-language support.
The page title, language menu, and database tabular data will all be displayed on this page.
There is static text content on this sample web page.

The page title and the sentence "no record found" are from that page. 


These are excerpts from PHP's language files.

For this example, two language files were produced. In the page header, the language menu with the languages 'english' and'deutsche' is displayed.

Each language menu uses the lang parameter to target the page link.

The material is loaded based on the selected language when you click the menu.
## HTML language specification

----

I utilized the selected language code in the HTML element's `lang` property.
It will make it easier for persons with visual impairments to read your information.
The screen reader tool can read the text aloud to the users using this specification.



The codes are listed below.

**Example**

``` php
<?php
namespace phppot;

require_once("./model/newsletter.php");
use phpot/datasource;
$newsLetter = new NewsLetter();
$result = $newsLetter->getAllRecords();
?>
<html lang="<?php echo $lang; ?>">
<head>
<title>How to Enable Multi-language Support to Website using PHP</title>
<link href='./assets/css/phppot-style.css' rel='stylesheet'
    type='text/css' />
<link href='./assets/css/multi-lingual-page.css' rel='stylesheet'
    type='text/css' />
</head>
<body>
    <div class="phppot-container">
<?php require_once "./view/home.php"; ?>
</div>
</body>
</html>
```
**Example**

```php
<div class="page-heading">
    <h1>Enable Multi-Language Support for a Webpage in PHP</h1>
</div>
<div class="language-header">
    <div class="demo-page-title"><?php echo $language["LIST_TITLE"]; ?></div>
    <div class="language-link">
        <a class="language-link-item" href="index.php?lang=en"
            <?php if($lang == 'en'){?> style="color: #ff9900;"
            <?php } ?>>English</a> | <a class="language-link-item"
            href="index.php?lang=de" <?php if($lang == 'de'){?>
            style="color: #ff9900;" <?php } ?>>Deutsche</a>
    </div>
</div>
<?php
if (! empty($result)){
    foreach ($result as $k => $v){
        ?>
        <div class="demo-row-data">
        <div>
            <strong><?php echo $result[$k][$lang.'_title']; ?></strong>
        </div>
        <p class="demo-row-description"><?php echo $result[$k][$lang.'_description']; ?>
        </p>
    </div>  
    <?php
    }
} else{
    ?>
    <div class="no-result"><?php echo $language["NOTIFY_NO_RESULT"]; ?></div>
    <?php 
}
?>
```
I've put the language links in a horizontal menu bar on this `HTML`, along with the full names of the languages.
There may be a space constraint if more languages are supported.



Otherwise, we can display the language code or make it a dropdown menu instead of the full name.
## How to switch the language of the content in PHP

---
To display as texts, this example page comprises the following:
- The title of the page

- Language selection menu.

- Results from the database.

- Message "No Results Found" .



The page-title and no-results-found messages are static in the example above.

I'm using files to manage the language-based content for these messages.

For English and German, I produced language configuration (localization) files.

For this example, they contain an array of text to show.

view/language/lang.en.php code is

**Example**
```PHP
<?php
$language["LIST_TITLE"] ="popular tutorial";
$langauge["NOTIFY_NO_RESULT"] ="no results found";
?>
```
view/language/lang.de.php code is 

**Example**

```PHP
<?php
$language["LIST_TITLE"] ="populair zelfstudie";
$langauge["NOTIFY_NO_RESULT"] ="green resultaten gevonden";
?>
```
Separate columns for English and German are present in the database table. Take a look at the image below.

**Example**

![database screenshot](https://phppot.com/wp-content/uploads/2017/03/database-table-with-multilingual-column.jpg)

The code to load material based on the specified language is described in the section below. It explains how to alter the language of database and non-database information.
## Loading non-database text from language files

---
I pass the specified language code in the `querystring` when I click language links. The PHP variable `$lang` is used to set the specified language code.
This variable was interpolated when the language configuration file was included.

The code for loading a language file for the language you've selected.



**Example**

```PHP
<?php
	// include language configuration file based on selected language
	$lang = "en";
	if(isset($_GET['lang'])){ 
		$lang = $_GET['lang']; 
	} 
	require_once("./view/Language/lang.".$lang.".php");
?>
...
<div class="demo-page-title"><?php echo $language["LIST_TITLE"]; ?></div>
...
<div class="no-result"><?php echo $language["NOTIFY_NO_RESULT"]; ?></div>
```
## How to localize content from the database

---
We connect the `datasource` and run the `query` to get the results in PHP code.
The database column name has the language prefix, as we can see.
With the en_ and de prefixes, there are separate title and description columns.
They have information in both English and German.


I use the `$lang` prefix with the title and description array index when iterating the database results.


The proper language-based results are then displayed.



Code for displaying database results in the language of your choice.


**Example**

```PHP
<?php 
	if(!empty($result)){ 
		foreach($result as $k=>$v){
?>
	<div class="demo-row-data">
	<div><strong><?php echo $result[$k][$lang.'_title']; ?></strong></div> 
	<p class="demo-row-description"><?php echo $result[$k][$lang.'_description']; ?>
	</p>
	</div>
<?php 	
		} 
	}
?>
```
This is the newletter.php PHP model class.
It creates database queries and runs them through datascource.
It uses `dual-language` to fetch and return data from the database.

**Example**
```PHP
<?php
namespace Phppot;

use \Phppot\DataSource;

class NewsLetter
{

    private $ds;

    function __construct()
    {
        require_once __DIR__ . './../lib/DataSource.php';
        $this->ds = new DataSource();
    }

    public function getAllRecords()
    {
        $query = 'select * from tbl_newsletter';
        $result = $this->ds->select($query);
        return $result;
    }
}
```

This is a datasource library that can be used by anyone. This class was built to handle database operations.
This class contains functions for performing `CRUD` activities on databases.


The code snippet from datasource is shown below.

**Example**
```PHP
<?php
namespace phppot
/**
 * generic datasource class for handling DB opertaions
 * use MYSQL and prepared statements
 */
class daatasource
{
    // when using above 7.1.0,declare the below constant as private
    const HOST ='localhost' ;
    const USERNAME ='root';
    const PASSWORD ='test' ;
    const DATABASENAME ='blog_samples' ;
    private $conn;
   /**
    * PHP takes care of cleanup for default connection types
    *singletons not required in PHP as there is no
    *every object lives for a request
     */
    function __construct()
    {
        $this->conn =$this->getconnection();

    }
/**
 * if connection object is needed use this method and get access to it
 * otherwise,use the below methods for insert / update / etc
 */
public function getconnection()
{
    $conn =new /mysqli(self::HOST::USERNAME,self::PASSWORD, self::DATABASENAME);
    if (mysqli_connect_errno()){
        trigger_error("problem with connecting to database.");
    }
    $conn->set_charset("utf8");
    return $conn;
}
/**
 * to get database results
 * @param string $query
 * @param string $paramtype
 * @param array $paramarray
 * @return array
 */
public function select($query,$paramtype ="", $paramarray = array())
{
    $stmt =$this->conn->prepare($query);
    if (! empty($paramType) && ! empty($paramArray)) {
        $this->bindQueryParams($stmt, $paramType, $paramArray);

        $stmt->execute();
        $result = $stmt->get_result();  

        if ($result->num_rows > 0){
            while ($row = $results->fetch_assoc(){
                $resultset[] =$row;
            )}
        }
        if (! empty($resultset)){
            return $resultset;
      }  }

}
```
## Multi-language PHP example demo

---
For this example, I've set up a page.
See how the PHP multi language code interacts with the `dual-language switch control` in the demo.


- Here's a link to the github repository where you can find the source code.

- [view source code at github](https://github.com/Techwiz254/multi-language-e)

## PHP example output – multilingual page supporting two-languages



---
The content of the website is shown in the specified English and German languages in these screenshots.
The selected language is highlighted in orange.



Readers selection in English

![User selection of English language](https://phppot.com/wp-content/uploads/2017/03/multi-language-page-content-in-english-550x272.jpg)

Readers selection in German

![user selection of German language](https://phppot.com/wp-content/uploads/2017/03/multi-language-page-content-in-german-550x243.jpg)

## Conclusion

---
This ends our introductory lesson on using PHP to enable multi-language support on a website.
We saw how to change the language of these contents by picking a language, and PHP makes it easy to do so with a small amount of files and functions.
Building a website with multi-language support increases the rate of attracting different people to your website and increases readership globally by bringing in new audiences.


I hope this code makes it easier for you to multilingualize your application.