 Introduction To PHP Graphic Techniques
### Introduction
PHP has the inherent ability to create and manipulate graphics independently. The scope and capabilities of PHP graphic handling is quite deep and powerful. It does this with the aid of the GD library which currently supports image formats in jpeg, png, gif and wbmp. 
This tutorial aims at providing a solid foundation on the first steps to take to start doing exploits with PHP graphics. If you’re as excited as I am, then let’s proceed. 

### Prerequisites
To follow along with this tutorial, you need to have the following:
•	 A code editor like Visual Studio Code[link].
•	 Apache web server, Preferably WAMP[link] or XAMPP[link].
•	 GD library/extension. You can confirm if you have it installed by searching for “gd” in your php.ini file. You should find “etension=php_gd2.dll” else download it for free on the internet. 
•	Basic knowledge of PHP.
### Create a Canvas, Ink and Paint Brush
Assuming you are a conventional artist and you want to draw a picture, you will likely require three things: a canvas to draw on, a paint brush to draw with and you’ll need ink for the paint brush to use. That is the same convention we employ while working with PHP graphics and thankfully, the GD extension offers us functions that can serve as the canvas, paint brush and ink.
#### Creating a blank canvas
There are two options to use in creating a blank canvas. We can use a function ```php
<?php
Imagecreate($width,$height);
?>
```
Or another function
```php
<?php
Imagecreatetruecolor($width,$height);
?>
```
The latter is preferable and in fact recommended because the final graphic quality would be better. So that’s what we’re going to use for this tutorial.
```php
<?php
$image = imagecreatetruecolor($width,$height);
?>
```
Parameters:
$width = The width of the canvas.
$height = The height of the canvas.
$image = The function returns a resource so we store it in variable.
Since we can’t see the blank canvas at this point, you can use the var_dump() function to be sure it was created.
```php
<?php
Var_dump($image);
?>
```
 If it returns a resource then everything went well.
#### Creating the ink
 Creating the ink is just as easy. The function that can create ink for us is called imagecolorallocate() function and it needs four argments. It is necessary to create the blank canvas before calling the imagecolorallocate() function.
```php
<?php
$color = Imagecolorallocate($image, $red, $green, $blue);
?>
```
Parameters:
$image = A resource representing the canvas already created.
$red = An integer corresponding to the RGB value for red.
$green = An integer corresponding to the RGB value of green.
$blue = An integer corresponding to the RGB value of blue.
$color = The function returns an integer which is stored in the variable.
You can also var_dump() the value returned by the imagecolorallocate() function to be sure it was successful. You should get an integer if everything went well. A working example is shown below:
```php
<?php
$image = imagecreatetruecolor(500,250);
$red = imagecolorallocate($image,255,0,0);
$green = imagecolorallocate($image,0,255,0);
$blue = imagecolorallocate($image,0,0,255);
?>
```
In the code snippet above, we attempt to create three primary colors to be used when required.
#### Create the paint brush 
The imagefill() function is worthy to take the responsibility of a paint brush because it helps us apply the ink to the canvas. It fills up the canvas with the chosen color starting from a point corresponding to the $x and $y coordinates.
```php
<?
Imagefill($image,$x,$y,$color);
?>
```
Parameters:
$image = A variable representing a resource returned by one of the image creation functions e.g imagecreatetruecolor().
$x = This variable stores a value corresponding to the x-coordinate.
$y = This variable stores a value corresponding to the y-coordinate.
$color = Represents a color that has been generated using the imagecolorallocate() function.
#### Output your image
What is art without visualization? We sure need a way to showcase all what we’ve been doing. To output your image on the browser we need the help of two functions, the header() function and the image(format)() function and they both take one argument each.
```php
<?php
header(“content-type: image/jpeg”);
imagejpeg($image);
?>
```
Parameters:
$image = A variable representing a resource returned by one of the image creation functions e.g imagecreatetruecolor(). This is the actual image we want to output.
Consider the example below where we try to put things together and output our image.
```php
<?php
//creates the image
$image = imagecreatetruecolor(500,250);
//Allocate colors to the image
$red = imagecolorallocate($image,255,0,0);
$green = imagecolorallocate($image,0,255,0);
$blue = imagecolorallocate($image,0,0,255);
Imagefill($image,0,0,$blue);
//display the image
header(“content-type: image/jpeg”);
imagejpeg($image);
imagedestroy($image);
?>
```
In the code snippet above, we create a blue image that can be viewed on the browser. The file format of the image can be easily changed by switching jpeg to any file format you want and at the end, don’t forget to destroy the resource. The picture below shows the expected output.
![Demo-output](\engineering-education\introduction-to-php-graphic-techniques\image1.jpg)
### Drawing geometric shapes
Let’s take our skills to the net level by drawing a few geometric shapes. The GD library still got us covered on this.
#### Drawing a rectangle
Drawing a rectangle is quite easy, we employ the help of a function called imagerectangle(). This function needs 6 arguments. Let’s take a closer look at it 
```php
<?php
Imagerectangle($image, $x1, $y1, $x2, $y2, $color);
?>
```
Parameters:
$image = A variable representing a resource returned by one of the image creation functions e.g imagecreatetruecolor(). This is where we would draw the rectangle on.
$x1, $y1 = X and Y coordinates for point 1
$x2, $y2 = X and Y coordinates for point 2
$color = A variable representing a color created using the imagecolorallocate() function.
Let’s consider the example below:
```php
<?php
//creates the image
$image = imagecreatetruecolor(500,250);
//Allocate colors to the image
$red = imagecolorallocate($image,255,0,0);
$green = imagecolorallocate($image,0,255,0);
$blue = imagecolorallocate($image,0,0,255);
Imagefill($image,0,0,$blue);
//draw a rectangle
Imagerectangle($image, 30, 100, 200, 200, $red)
//display the image
header(“content-type: image/jpeg”);
imagejpeg($image);
imagedestroy($image);
?>
```
And then we get this as the output:
![image-rectangle](\engineering-education\introduction-to-php-graphic-techniques\image2.jpg)

In the example above, we draw a rectangle with red borders on an image we created having a blue background color.
#### Drawing a polygon
To draw a polygon, we make use of the imagepolygon() function. The function accepts four arguments as can be seen below:
```php
<?php
Imagepolygon($image, $points, $totalpoints, $color);
?>
```
Parameters:
$image = A variable representing a resource returned by one of the image creation functions e.g imagecreatetruecolor(). This is where we would draw the rectangle on.
$points = An array containing vertices of the polygon.
$totalpoints = total number of points.
$color = A variable representing a color created using the imagecolorallocate() function.
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
header(‘content-type: image/jpeg’);
imagejpeg($image);
imagedestroy($image);
?>
```
After running the codes above, you’re expected to get an output similar to this:
![image-polygon](\engineering-education\introduction-to-php-graphic-techniques\image3.jpg)

### Writing words on the canvas
They are a bunch of functions provided by the GD library that can be used to write text on the canvas, we’ll be using the imagestring() function because of its ease of use and simplicity.
```php
<?php
Imagestring($image, $size, $x, $y, $string, $color); 
?>
```
Parameters:
$image = A variable representing a resource returned by one of the image creation functions e.g imagecreatetruecolor(). This is where we would write the text on.
$size = A variable representing the size of the words written on the canvas (available size is from 1 to 5).
$x = Represents the distance from the left canvas border to the left bottom corner of the first word.
$y = Represents the distance from the top canvas border to the left bottom corner of the first word. Take note that $y shouldn’t be zero (0) else you won’t be able to view the words on the canvas.
$color = A variable representing a color created using the imagecolorallocate() function.
$string = Represents the text that would be written on the canvas.
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
Imagefill($image,0,0,$blue);
//write on the canvas
Imagestring($image, 5, 0, 100, 50, ‘I love PHP’, $white);
//display the image
header(“content-type: image/jpeg”);
imagejpeg($image);
imagedestroy($image);
?>
```
The output of the code snippet above is shown below:
![image-text](\engineering-education\introduction-to-php-graphic-techniques\image4.jpg)

### Conclusion
Congratulations! you have now successfully completed the introductory lessons necessary to facilitate your progress with php graphics. There are still other exciting things to learn in terms of the application of php graphics such as making captcha’s, picture watermarks etc. I encourage you to do more study in this regard.
In this article we have learnt;
•	 how to create a canvas, ink and paint brush.
•	 how to draw some basic geometric shapes.
•	 how to write words on the canvas.
Happy coding!
### References
-	https://www.techrepublic.com/article/create-graphics-on-the-fly-using-php/
-	https://www.php.net/manual/en/book.image.php/



