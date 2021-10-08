---
layout: engineering-education
status: publish
published: true
url: /phpunit-bigger-picture/
title: PHPUnit, The Bigger Picture
description: This tutorial introduces the reader the basic concepts of unit testings in PHP. Then we will go over how to get started with this tool to write basic tests for your PHP application.
author: odongo-albert
date: 2021-09-09T00:00:00-16:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/phpunit-bigger-picture/hero.png
    alt: phpunit bigger picture Hero Image
---
Developers mainly write unit tests in PHP or any other language as a good practice to help them identify and fix bugs in time, refactor code and document a unit of the program under test.
<!--more-->

### Introduction
In this tutorial, we'll be discussing the basic concepts of PHPUnit. Then, I'll show you how to get started with this tool to write basic tests for your PHP application.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with PHPUnit](#getting-started-with-phpunit)
- [Installing PHPUnit](#installing-phpunit)
- [Test case rules](#test-case-rules)
- [Writing unit tests](#writing-unit-tests)
- [Creating application for testing](#creating-application-for-testing)
- [Running PHPUnit tests](#running-phpunit-tests)
- [Conclusion](#conclusion)
  
### Prerequisites
To follow this tutorial along, you should already be familiar with basic PHP concepts. It would be best to have PHP installed on your local development environment to help you test as you read.

### Objectives
This tutorial aims to teach you everything you need to know about Unit Testings. By the end, you should be able to structure your PHP application, write basic unit tests using assertions and show the results on your terminal.

### Getting started with PHPUnit
Unit testing ensures that every single unit of your source code is working as expected. Writing these tests is very important as they help in error diagnosis if an error occurs while running your application.  One way to achieve this is by using the PHPUnit.

It would be best if you did unit testings so that they are independent of each other, which means that when a test case returns false, for instance, it should only pinpoint the error location and not otherwise.  

### Installing PHPUnit
In this tutorial, we'll be installing PHPUnit 9.5. This package works well with PHP 7.3, but the latest version of PHP would work best. The current version as at the time of writing is PHP version 8.  

Now, to install PHPUnit on your local development environment, run the following command on your terminal:
```bash
composer require --dev phpunit/phpunit ^8 # this version may vary
```

Depending on your internet connectivity, this takes a few minutes. On completion, proceed and check the installed version by running the following commands:

```bash
./vendor/bin/phpunit --version
```

***Expected Output***

```bash
# note that this version may vary from your PHPUnit version
PHPUnit 8.5.2 by Sebastian Bergmann and contributors.
```

### Test case rules
Writing unit tests has a set of rules to be followed as described below:  
- The test takes the format `<prefix>Test`. For example, `exampleTest`.
- The test class methods MUST take the format `test<suffix>`. For example, `testMethod`.
- The test class must extend the `\PHPUnit\Framework\TestCase` class.
- Each test case file MUST have the same name as the class name, as shown in the next section.

### Writing unit tests
Now that we've installed PHPUnit, let's proceed and structure our project as shown in the screenshot below:  

![project structure](/engineering-education/phpunit-bigger-picture/folder-structure.png)

As a rule of the thumb, it's essential to write the tests before writing the actual code. So now, let's proceed and write our test cases which we'll then use in our application.  

In the `myTests` directory, create a file `ModularArithmenticTest.php` and add the following:  

```php
class ModularArithmenticTest extends \PHPUnit\Framework\TestCase
{
public function testDivisionTheorem()
   {
    $divisionTheorem = new Application\Division;
    $divisionTheorem->setValues(61,20);
    $this->assertEquals(40, $divisionTheorem->modulus());
   }
}
```

In the file above, you'll notice that we've followed every rule we defined in the previous section. We begin by creating a file, `ModularArithmenticTest.php`.  

Inside this script, we create a class with the same name as that of the file. We then extend the `\PHPUnit\Framework\TestCase` class. Inside the class, we define the method `testDivisionTheorem()` prefixed with `test`.

This method `testDivisionTheorem()` has `$divisionTheorem` object that we instantiate from the `Division` class. It's important to note that we've not defined the `Division` class, as we're defining our test cases first. The `divisionTheorem` has the `setValues(arg1,arg2)` that takes two arguments.

This method also calls the `assertEquals()` method from the current class. This method takes in two parameters and compares them to check if they are indeed equal.

### Creating application for testing
Now that we've defined our unit tests to check if two numbers are equal using the PHPUnit's in-built method `assertEquals()`, let's proceed and create the `Division` class.

In the `application` folder we created earlier, create a file `Division.php` and add the following:  

```php
<?php
namespace Application;
// create a class Division
class Division
{
    //define properties
    private $first_number;
    private $last_number;

  /**
   * create a function setValues that takes in arrays 
   */
    public function setValues($first_number,$last_number)
   {
    $this->first_number = $first_number;
    $this->last_number = $last_number
   }
   /**
    * Find the modulus of the two numbers
    */

    public function modulus()
    {
        return $last_number % $first_number;
    }
}

```

In the script above, we've created a class, `Division`, with two properties:
- `$first_number`
- `$last_number`

We've also defined two methods:
- `setValues()` - this method takes two arguments of the type number. It takes the `first_number` and the `last_number`.
- ` modulus()` - this function returns the modulus of the two numbers created previously.

### Running PHPUnit tests
Now that we've defined our two classes, the `Division` and the `ModularArithmenticTest`. In this section, we'll be executing the PHPUnit tests to assert that they are working or not.

First, update your `composer.json` file as shown below:  
```json
{
    "require-dev": {
        "phpunit/phpunit": "^8"
    },
    "autoload": {
        "psr-4": {
            "Application\\":"Application"
        }
    }
}
```

The update states that we're using the directory `Application` and `Application` namespace.

Run the following command to update this composer file:

```bash
composer update
```

Next, add the `phpunit.xml` file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<phpunit bootstrap = "vendor/autoload.php"
    backupGlobals               = "false"
    backupStaticAttributes      = "false"
    colors                      = "true"
    convertErrorsToExceptions   = "true"
    convertNoticesToExceptions  = "true"
    convertWarningsToExceptions = "true"
    processIsolation            = "false"
    stopOnFailure               = "false"
    syntaxCheck                 = "false">

    <testsuites>
        <testsuite name="Modulus">
            <directory>myTests</directory>
        </testsuite>
    </testsuites>
    <filter>
        <whitelist>
            <directory suffix=".php">src/</directory>
        </whitelist>
    </filter>
    <php>
        <env name="APP_ENV" value="testing"/>
    </php>
</phpunit>

```

At the root of your application, run the followings commands:
```bash
./vendor/bin/phpunit
```

### Conclusion
In this tutorial, we've discussed the basic concepts of PHPUnit 8. Then, we saw how to create the test classes to test an application. We've also configured the XML file for ease of testings.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/authors/miller-juma/)
