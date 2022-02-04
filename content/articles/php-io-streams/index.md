---
layout: engineering-education
status: publish
published: true
url: /php-io-streams/
title: Getting Started with Input and Output Streams in PHP 8
description: In this tutorial, we will learn how to handle large files in PHP using the concept of streams.
author: theresa-atieno
date: 2022-02-04T00:00:00-11:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/php-io-streams/hero.png
    alt: PHP Streams data I/O img
---
Working with files on the server-side environment is a common task yet it remains complex. However, most PHP installations do not provide enough memory to handle large files.
<!--more-->
In this tutorial, we will learn how to handle large files in PHP using the concept of streams.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with streams](#getting-started-with-streams)
- [The file system handler](#the-file-system-handler)
- [Working with streams](#working-with-streams)
- [Retrieving file contents](#retrieving-file-contents)
- [Writing to a file](#writing-to-a-file)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, you will need the following:
- Basic knowledge of PHP.
- Basic concepts in PHP streams.
- Local development environment.

### Objectives
This tutorial will teach you how to handle large files in PHP using streams. By the end, you will appreciate the benefits of streams over the traditional file system.

### Getting started with streams
Stream is a compelling concept in PHP. It allows you to handle large files without memory issues.

Streams simplify the process of reading and writing files. They work by providing a way to read and write data in chunks.

This on-demand data read ensures that you do not have to load the entire file into memory.

> It is important to note that PHP installations have a memory limit. So if you try to load a too large file, you will get an error.
Streams have implementation wrappers that allow you to handle specific protocols.

### The file system handler
To understand the file system handler, let's create a file called `test.txt` in the `/tmp` directory.

Proceed and add texts in the file. In our case, `test.txt` will contain the following text:
```text
hello world
```

Next, open `streams.php` file and add the following code:
```php
<?php
$content = file_get_contents(__DIR__ . '/test.txt');
echo $content;
```

In the above code, we are using the `file_get_contents()` function to read the file's contents.

When we run the above code, we get the following result:
```bash
hello world
```

You notice that the code runs smoothly. However, this will not always be the case while handling large files, as shown below:

```php
<?php
$content = file_get_contents(__DIR__ . '/large-test-file.txt');
echo $content;
```

When the above code is run, you will get the following error:
```bash
# php fatal error:  Allowed memory size of 33554432 bytes exhausted (tried to allocate 524288 bytes) in /tmp/streams.php on line 3
PHP Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 1048576000 bytes)
```

The above error is because the file is too large to be loaded into memory. As we may recall, PHP has the memory limit set to `128M`.

Now that we understand the problem of handling large files, let's introduce the concept of streams in the next section.

### Working with streams
Previously, we have seen how PHP default configurations restrict us to work within a set memory limit.

In this section, let's first create a sample script to solve our above error using the concept of streams.
```php
//open the stream.php file and add the following:
<?php
$large_file = fopen(__DIR__ . '/large-test-file.txt', 'r');
//the result is printed until the end of the file
while(! feof($large_file)) {
  $endLine = fgets($large_file);
  echo $endLine. "<br>";
}
fclose($large_file);
```

We use the `fopen()` function to open the file in the above code. The `fopen()` function takes in 2 parameters. The first is the file path, and the second is the mode.

Next, we use the `fgets()` function to read the file's contents.
Finally, we use the `fclose()` function to close the file.

When you execute the above code, you notice that it doesn't give you an error, as was the case when we used the `file_get_contents()` function. This is the power of streams.

With streams, we can read any file size without running into memory management problems that may be frustrating to a developer.

### Retrieving file contents
In the previous section, we have seen how we can use the power of streams in PHP to handle large files, in our case, using the `fopen()` function. 

Now, let's understand how to retrieve the file's contents using the `fgets()` function.
```php
...
while(! feof($large_file)) {
  $endLine = fgets($large_file);
  echo $endLine. "<br>";
}
...
```

In the above code, we have a `while` loop that will run until the end of the file. The `feof()` function will return `true` if the end of the file is reached.

Next, the `fgets()` function takes the file stream as the first parameter. We then use the `echo` function to print the file's contents.

### Writing to a file
Now that we understand how to read file contents using the concept of streams, let's learn how to write to a file in this section.  

Let's create another file called `test2.txt` in the `/tmp` directory to simplify our streams code.

> Note: we had already created a file called `test.txt` in the `/tmp` directory. You should create it if it's not there.

In the following script, we will read the contents of the file `test.txt` and write it to the file `test2.txt` as described below:
```php
<?php
//open the stream.php file and add the following:
// the source file
$file_stream_source = fopen(__DIR__ . '/test.txt', 'r');
// the destination file
$file_stream_destination = fopen(__DIR__ . '/test2.txt', 'w');
// while the end of the file is not reached
while (true) {
  // read the file
    $file_line = fgets($file_stream_source);
    // if the end of the file is reached
    if (!$file_line) {
      // break the loop
        break;
    }
    // write the file to the destination file
    fputs($file_stream_destination, $file_line);
}
// close the source file
fclose($file_stream_destination);
// close the destination file
fclose($file_stream_source);
```

Output:
```bash
# contents of the test.txt file equal to the test2.txt file
```

When you execute the above script, you notice that the file `test.txt` contents are written to the file `test2.txt`.

This is achieved in the above script by using the `fputs()` function. The `fputs()` function takes the file stream as the first parameter and the file's contents as the second parameter.

We first open the source file using the `fopen()` function. The `fopen()` function takes in 2 parameters, the first is the file path, and the second is the mode.

Next, we use the `while(true)` loop to check if the end of the file is reached. We read each file line inside the loop using the `fgets()` function.

However, we also check if the end of the line is reached. If it is, we break the loop. Otherwise, we write the line to the destination file using the `fputs()` function.

Finally, we close the source and the destination files using the `fclose()` function.

### Conclusion
In this article, we have extensively covered the concepts of streams and how to use them in PHP.

I hope this article helps you build a strong foundation on these concepts to help you build a solid foundation on PHP.

Happy reading!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
