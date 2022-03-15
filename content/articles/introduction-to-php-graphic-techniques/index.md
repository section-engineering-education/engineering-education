---
layout: engineering-education
status: publish
published: true
url: /introduction-to-php-graphic-techniques/
title: Introduction To PHP Graphic Techniques
description: This tutorial will provide a solid foundation on the steps and processes required to create and manipulate graphical elements in PHP. 
author: sarah-asuquo
date: 2022-02-21T00:00:00-10:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-php-graphic-techniques/hero.jpg
    alt: Introduction to php graphic techniques img
---
PHP can be used to create and manipulate graphical elements independently. Therefore, the scope and capabilities of PHP graphic handling are very powerful.
<!--more-->
It does this with the aid of the `GD` library, which currently supports image formats in `jpeg`, `png`, `gif`, and `wbmp`.

This tutorial will provide a solid foundation on the steps and processes required to create and manipulate graphical elements in PHP. 

### Prerequisites
To follow along with this tutorial, you'll need to have the following:
- Basic knowledge of PHP.
- An editor such as [Visual Studio Code](https://code.visualstudio.com/).
- A Web server such as Apache and Nginx locally installed.
- `GD` library/extension. You can confirm if you have it installed by searching for `gd` in your `php.ini` file. You should find `extension=php_gd2.dll` else download it for free on the internet.

### How to create a canvas, ink, and paintbrush
Assuming you are a conventional artist and want to draw a picture, you will require a canvas to draw on, a paintbrush to draw with, and ink for the paintbrush to use. 

That is the same convention we employ while working with PHP graphics, and thankfully, the `GD` extension offers us functions that can serve as the canvas, paintbrush, and ink.

#### Step 1: Creating a blank canvas
There are two options to use in creating a blank canvas. We can use either of the functions below:
```php
<?php
imagecreate($width,$height);
?>
```

Or another function:

```php
<?php
imagecreatetruecolor($width,$height);
?>
```

The `imagecreate()` function is an inherent PHP function that helps you create a new image/canvas. The function accepts two arguments and returns a blank canvas whose size is determined by the width and height parameters passed to the function.

Also, the `imagecreatetruecolor()` function is used to create a new blank canvas. It accepts two arguments that represent the length and breadth of the canvas. 

It is preferable and usually recommended because the final graphic quality would be superior to the `imagecreate()`. In this tutorial, we will be using the `imagecreatetruecolor()` function.

To create a blank canvas, we implement the snippet below:
```php
<?php
 
$image = imagecreatetruecolor($width,$height);
?>
```

Below are the parameters required:
- `$width` :The width of the canvas.
- `$height`: The height of the canvas.
- `$image`: The function returns a resource, so we store it in a variable.

Since we can't see the blank canvas at this point, you can use the `var_dump` function to be sure it was created.
```php
<?php
 
Var_dump($image);
?>
```

If the function returns a resource in the terminal, everything is going well.

#### Step 2: Creating the ink
The `imagecolorallocate()` function can be used to create the link, and it requires four arguments. This is a default PHP function used to assign colors to an image. 

The function returns an RGB color value determined by the supplied argument or returns `false` if the operation fails.
```php
<?php
 
$color = Imagecolorallocate($image, $red, $green, $blue);
?>
```

Here are the parameters in the snippet:
- `$image`: A resource representing the canvas already created.
- `$red`: An integer corresponding to the RGB value for red.
- `$green`: An integer corresponding to the RGB value of green.
- `$blue`: An integer corresponding to the RGB value of blue.
- `$color`: The function returns an integer stored in the variable.

You can also `var_dump()` the value returned by the `imagecolorallocate()` function to ensure it was successful. You should get an integer if everything goes well. 

A working example is shown below:
```php
<?php
 
$image = imagecreatetruecolor(500,250);
 
$red = imagecolorallocate($image,255,0,0);
 
$green = imagecolorallocate($image,0,255,0);
 
$blue = imagecolorallocate($image,0,0,255);
?>
```

In the code snippet above, we created three primary colors to be used when required.

First, a blank canvas with dimensions `500x250` was created using the `imagecreatetruecolor()` function and stored in the `$image` variable.

Then, three different colors were created using the `imagecolorallocate()` function. The first argument represents the already created blank canvas, while the last three arguments are the RGB values of the desired colors.

#### How to create the paintbrush
The PHP `imagefill()` function enables us to apply the ink to the canvas. But, first, it fills up the canvas with the chosen color, starting from a point corresponding to the `$x` and `$y` coordinates.

The function returns a Boolean value, true or false, on failure.

> Note that the top-left corner can be gotten by setting `x` and `y` coordinates to zero (0). This will flood fill the entire canvas irrespective of the size.
```php
<?php
imagefill($image,$x,$y,$color);
?>
```

Here are the parameters from the snippet:
- `$image` = A variable resource returned by any image creation functions, for example `imagecreatetruecolor()`.
- `$x` = This variable stores a value for the x-coordinate.
- `$y` = This variable stores a value for the y-coordinate.
- `$ color` = Represents a color generated using the `imagecolorallocate()` function.

#### Output your image
What is art without visualization? To output your image on the browser, you need two functions, which are:
1. The `header()` function.
2. The `image(format)` function requires one argument each.

The argument of the `header()` function accepts a string used to indicate the media type of the resource. The media type is a string sent along with the file showing the file format.

The `image(format)` function is a default PHP function used to display an image on the browser or store the image as a file.
```php
<?php
 
header('content-type: image/jpeg');
 
imagejpeg($image);
?>
```

Parameters from the snippet are:
`$image` = A variable resource returned by one of the image creation functions, e.g `imagecreatetruecolor()` function. This is the actual image we want to output.

Consider the example below where we try to put things together and output our image.
```php
<?php
 
//how to create our first image
 
$image = imagecreatetruecolor(500,250);
 
//Allocate colors to the image
 
$red = imagecolorallocate($image,255,0,0);
 
$green = imagecolorallocate($image,0,255,0);
 
$blue = imagecolorallocate($image,0,0,255);
 
Imagefill($image,0,0,$blue);
 
//display the image
 
header('content-type: image/jpeg');
 
imagejpeg($image);
 
imagedestroy($image);
?>
```

From the code snippet above, we:
- Created a blank canvas of dimension 500x250 using the `imagecreatetruecolor()` function.
- We assigned colors to variables `$red`, `$green`, and `$blue` using the `imagecolorallocate()` function.
- After that, we performed a flood fill of the blank canvas we had already created, using the `imagefill()` function.
- We then displayed our image on the browser in `jpeg` format using a combination of the `header` and the `imagejpeg` functions.
- Lastly, we destroy the resource stored as `$image`.
  
Output:

![Demo-output](/engineering-education/introduction-to-php-graphic-techniques/image1.jpg)

### Drawing geometric shapes
Let's take our skills to the next level by drawing a few geometric shapes. The `GD` library can accommodate all of these. 

#### How to draw a rectangle
Drawing a rectangle is relatively easy. We employ the help of a function called `imagerectangle()`. This function needs six arguments. Let's take a closer look at it.
```php
<?php
Imagerectangle($image, $x1, $y1, $x2, $y2, $color);
?>
```

The parameters required are:
- `$image` = A variable resource returned by one of the image creation functions, for example, `imagecreatetruecolor()`. This is where we will draw the rectangle on.
- `$x1`, `$y1` = X and Y coordinates for point 1.
- `$x2`, `$y2` = X and Y coordinates for point 2.
- `$color` = A variable representing a color created using the `imagecolorallocate()` function.
  
Let's consider the example below:
```php
<?php
//create the image
 
$image = imagecreatetruecolor(500,250);
 
//Allocate colors to the image
 
$red = imagecolorallocate($image,255,0,0);
 
$green = imagecolorallocate($image,0,255,0);
 
$blue = imagecolorallocate($image,0,0,255);
 
Imagefill($image,0,0,$blue);
 
//draw a rectangle
 
Imagerectangle($image, 30, 100, 200, 200, $red);
 
//display the image
 
header('content-type: image/jpeg');
 
imagejpeg($image);
 
imagedestroy($image);
?>
```

The code above should look familiar to you because we have already explained some parts of it in earlier examples. Nevertheless, we'll go over it again.

To draw a rectangle:
- We first create a blank canvas on which the rectangle will be drawn using the `imagecreatetruecolor()` function. Then we store the returned resource in the `$image` variable.
- Next, we create three different colors using the `imagecolorallocate()` function and assign them to variables `$red`, `$green`,  and `$blue`.
- Then, we perform a flood fill to give the canvas a blue background color, which is done using the `imagefill()` function.
- We then draw the rectangle using the `imagerectangle` function.
- Then the image is viewed on the browser using the `header()` and `imagejpeg()` functions, after which it is destroyed using the `imagedestroy()` function.

Output:

![image-rectangle](/engineering-education/introduction-to-php-graphic-techniques/image2.jpg)

In the example above, we drew a rectangle with red borders on an image we created having a blue background color.

#### How to draw a polygon
We use the `imagepolygon()` function to draw a polygon. The function accepts four arguments, as shown below:
```php
<?php
 
imagepolygon($image, $points, $totalpoints, $color);
?>
```

Let's go over the Parameters:
- `$image` = A variable resource returned by one of the image creation functions, for example, `imagecreatetruecolor()`. This is where we will draw the rectangle on.
- `$points` = An array contains vertices of the polygon.
- `$totalpoints` = total number of points.
- `$color` = A variable representing a color created using the `imagecolorallocate` function.

Take a pip at the sample code below:
```php
<?
 
$image = Imagecreatetruecolor(500,250);
 
$white = imagecolorallocate($image, 255, 255, 255);
 
$blue = imagecolorallocate($image, 0, 0, 255);
 
Imagefill($image, 0, 0, $blue);
 
//Draw polygon
 
Imagepolygon($image, array(20,20,
 
50,140,
 
100,200,
 
220,180), 4, $white);
 
//display the image
 
header('content-type: image/jpeg');
 
imagejpeg($image);
 
imagedestroy($image);
?>
```

Considering that some parts of the code snippet are repetitive, let's bother with the code from the `//draw polygon` comment.

We use the `imagepolygon()` function to draw the polygon. The function accepts four arguments, as shown below:
- The first argument represents the canvas we want to draw on.
- The second argument is an array that comes in pairs as per X1, Y1, X2, Y2, and so on, representing the polygon's vertices. You can add more vertices by adding more X and Y pairs to the array.
- The third argument confirms the total number of points, which is `4`, while the last argument $white would make the polygon drawn with white color.
- We then display the output, as usual, using the `header()` and `imagejpeg()` functions and finally destroy the resource.

After running the codes above, you're expected to get an output similar to this:

![image-polygon](/engineering-education/introduction-to-php-graphic-techniques/image3.JPG)

### How to write words on the canvas
They are several functions provided by the `GD` library that can be used to write text on the canvas. 

We'll be using the `imagestring()` function because it is easy to use and understand.

```php
<?php
 
imagestring($image, $size, $x, $y, $string, $color);
?>
```

Here are the required parameters:
- `$image`: A variable resource returned by one of the image creation functions, for example, `imagecreatetruecolor()`. This is where we would write the text on.
- `$size`: A variable represents the size of the words written on the canvas (available size is 1 to 5).
- `$x`: is the distance from the left canvas border to the left bottom corner of the first word.
- `$y`: is the distance from the top canvas border to the left bottom corner of the first word.
  
> Note: `$y` should not be zero (0), or you won't be able to view the words on the canvas.

- `$color` : A variable representing a color created using the `imagecolorallocate()`function.
- `$string`: Represents the text that would be written on the canvas.

A working example of how to write words on the canvas is shown below:
```php
<?php
 
//creates the image
 
$image = imagecreatetruecolor(500,250);
 
//Allocate colors to the image
 
$red = imagecolorallocate($image,255,0,0);
 
$green = imagecolorallocate($image,0,255,0);
 
$blue = imagecolorallocate($image,0,0,255);
 
$white = imagecolorallocate($image,255,255,255);
 
imagefill($image,0,0,$blue);
 
//write on the canvas
 
imagestring($image, 5, 100, 50, 'I love PHP', $white);
 
//display the image
 
header('content-type: image/jpeg');
 
imagejpeg($image);
 
imagedestroy($image);
?>
```

After creating a blank canvas, we allocate different colors to variables `$red`, `$green`, `$blue`, `$white`, and carry out a flood fill to give the canvas background blue color. 

We then call the `imagestring()` function to help us write a text on the canvas.
- The first argument is our blank canvas which is where we'll write.
- The following argument is an integer representing the font size of the text (available values are from 1 to 5).
- The subsequent two arguments represent X and Y coordinates of the first letter of the string.
- The fifth argument is the string we want to write in this case. It is `I love PHP`.
- The last argument represents the text color.

The image is then displayed on the browser using the `header()` and `imagejpeg()` functions, and lastly, the image resource is destroyed with the `imagedestroy()` function.

The output of the code snippet above is shown below:

![image-text](/engineering-education/introduction-to-php-graphic-techniques/image4.jpg)

### Conclusion
Congratulations! You have now completed the introductory lessons necessary to facilitate your progress with PHP graphics. 

However, there are still other exciting things to learn about the application of PHP graphics, such as making captchas, picture watermarks, etc. Therefore, I encourage you to do more study in this regard.

In this article, we have learned how to create a canvas, ink and paintbrush, draw some basic geometric shapes, and write words on the canvas.

Happy coding!

### References
- [techrepublic](https://www.techrepublic.com/article/create-graphics-on-the-fly-using-php/)
- [PHP Net](https://www.php.net/manual/en/book.image.php/)

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
