### Introduction
Working with files on the server side environment is a very common task yet complex. However, most PHP installations do not provide enough memory to handle large files.

In this tutorial, we will learn how to handle large files in PHP using the concept of streams.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Objectives](#objectives)
- [Getting started with streams](#getting-started-with-streams)
- [The file system handler](#the-file-system-handler)
- [Conclusion](#conclusion)


### Prerequisites
To follow along this tutorial, you will need the following:
- Basic knowledge in PHP.
- Basic concepts in PHP streams.
- Local development environment.

### Objectives
This tutorial will teach you how to handle large files in PHP using streams.

### Getting started with streams
Stream is a very powerful concept in PHP. It allows you to handle large files without memory issues.

Streams simplify the process of reading and writing files. They work by providing a way to read and write data in chunks.

This on-demand data read ensures that you do not have to load the entire file into memory.

> It's important to note that PHP installations have a memory limit. If you try to load a file that is too large, you will get an error.

Streams have implementation wrappers that allow you to handle specific protocols.

### The file system handler
To let us understand the file system handler, let's create a file called `test.txt` in the `/tmp` directory.

Proceed and add texts in the file, in our case, `test.txt` will contain the following text:
```text
hello world
```

Next, open `streams.php` file and add the following code:
```php
<?php
$content = file_get_contents(__DIR__ . '/test.txt');
echo $content;
```

In the above code, we are using the `file_get_contents()` function to read the contents of the file.

When we run the above code, we get the following result:
```bash
hello world
```

You notice that the code runs smoothly. However, this will not always be the case while handling large files as shown below:

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

The above error is due to the fact that the file is too large to be loaded into memory. As we may recall, PHP has the memory limit set to `128M`.

Now that we understand how files are handled in PHP, 
### Conclusion
