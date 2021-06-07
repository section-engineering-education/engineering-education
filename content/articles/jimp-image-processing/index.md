### Getting started with Node.js and JIMP image processing
In a web application that involves dealing with images, image manipulation becomes one of the sought-after features.

In a Node.js application, [Javascript Image Manipulation Program](https://github.com/oliver-moran/jimp) makes it easier to manipulate images to achieve whatever design we want. JIMP provides the functionality to crop, resize, blur, and add effects to Images.

### Table of contents
- [Getting started with Node.js and JIMP image processing](#getting-started-with-nodejs-and-jimp-image-processing)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Project setup](#project-setup)
- [Image editing](#image-editing)
  - [Supported Image formats](#supported-image-formats)
  - [Reading an image](#reading-an-image)
  - [Resizing an images](#resizing-an-images)
  - [Cropping an images](#cropping-an-images)
  - [Rotating an image](#rotating-an-image)
  - [Blurring an image](#blurring-an-image)
  - [Adding an image overlay](#adding-an-image-overlay)
- [Conclusion](#conclusion)

### Prerequisites
1. [Node.js](https://nodejs.org/en/) installed on your computer.
2. Knowledge of [Javascript](https://www.w3schools.com/js/).
   
### Project setup
1. Create a project directory named `image-processing`.
2. In the folder created above, run the command below to initialize Node.js in our project directory.
   ```bash
   $ npm init
   ```
3. Run the command below to add `JIMP` package into our application.
   ```bash
   $ npm install --save jimp
   ```
4. Create a file name `index.js` in the project directory.
   
### Image editing
#### Supported Image formats
JIMP supports several image formats which includes:-
- `@jimp/jpeg`
- `@jimp/png`
- `@jimp/bmp`
- `@jimp/tiff`
- `@jimp/gif`

#### Reading an image 
JIMP is built on the callback and promise base APIS for image manipulations. We use the JIMP static method `jimp. read` to read the image that is to be processed. `jimp. read` takes an image as the input.

`jimp. read` image input can be:-
1. URL to the image.
2. Image path on the file system.

Add the code snippet below into the `index.js` file created above.
```javascript
Jimp.read('https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')
  .then(image => {
    // Process the image
  })
  .catch(err => {
    // Handle exceptions.
  });
```

#### Resizing an images
JIMP uses the two-pass bilinear algorithm to resize the width and height of an image through its `resize()` method.

Image resize syntax
```javascript
resize( w, h[, mode] )
```

Add the code snippet below into `index.js` file.
```Javascript
const Jimp = require('jimp');
async function resize() {
  // reads the image
  const image = await Jimp.read('https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  // resizes the image to width 150 and heigth 150.
  await image.resize(150, 150);
  // saves the image on the file system
  await image.writeAsync(`resize_${Date.now()}_150x150.png`);
}
resize();
```

Original image.
![]()

Resized image.
![]()

`Jimp. AUTO` can be passed in the place of height or width to resize the image while maintaining the aspect ratio. `Jimp. AUTO` can only be passed for either height or width at a time.

Whenever a resizing algorithm is not passed then JIMP applies the `Jimp.RESIZE_BILINEAR` algorithm. Othe resizing algorithms available in JIMP include:-
- `Jimp.RESIZE_BEZIER`
- `Jimp.RESIZE_BICUBIC`
- `Jimp.RESIZE_NEAREST_NEIGHBOR`
- `Jimp.RESIZE_HERMITE`

#### Cropping an images
JIMP has a `resize()` method that crops the image to a specified `x` and `y` coordinates.

Syntax
```javascript
crop( x, y, w, h)
```

Add the code snippet below into the `index.js` file.
```javascript
async function crop() {
  // reads the image
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
  // crops the image
  await image.crop(500, 500, 150, 150);
  // Saves the image to the file system
  await image.writeAsync(`${Date.now()}_crop_150x150.png`);
}
crop()
```

Cropped image:
![]()

#### Rotating an image
JIMP provides a `rotate()` method that can be used to rotate an image through the angle provided while maintaining the dimensions of the image.

syntax:
```javascript
rotate( deg[, mode] );
```


Add the code snippet below into the `index.md` file.
```javascript
async function rotate() {
  // reads the image
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
  // rotates the image
  await image.rotate(45);
  // Saves the image into the file system
  await image.writeAsync(`${Date.now()}_rotate_150x150.png`);
}
rotate()
```

Rotated image:
![]()

#### Blurring an image
JIMP uses the blur algorithm which blurs an image by a given `x` pixels. JIMP provides the `blur()` method which takes in the blur pixes.

Syntax:
```Javascript
blur(r)
```

Add the code snippet below into the `index.md` file.

```javascript
async function blur() {
  // reads the image
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
  // blurs the image with the given number of pixels
  await image.blur(20);
  // Saves the image into the disk
  await image.writeAsync(`${Date.now()}_blur_150x150.png`);
}
blur()
```
Blurred image
![]()

#### Adding an image overlay
JIMP provides a `composite()` method that adds an image over another image at `x` and `y` positions.

Syntax:
```javascript
composite( src, x, y, [{ mode, opacitySource, opacityDest }] ); 
```

Add the code snippet below into the `index.md` file.
```javascript
async function waterMark(waterMarkImage) {
  // reads the watermark image
  let  watermark = await Jimp.read(waterMarkImage);
  // resizes the watermark image
  watermark = watermark.resize(300,300);
  // reads the image
  const image = await Jimp.read('https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg');
  //adds the watermark to the image at point 0, 0
 watermark = await watermark
  image.composite(watermark, 0, 0, {
    mode: Jimp.BLEND_SOURCE_OVER,
    opacityDest: 1,
    opacitySource: 0.5
  })
  //Saves the image into the file system
  await image.writeAsync(`test/${Date.now()}_waterMark_150x150.png`);
}
waterMark('https://destatic.blob.core.windows.net/images/nodejs-logo.png');
```
Overlay image:

![]()

### Conclusion
Now that you have learned how to use JIMP in a Node.js application, add watermarks to images that users upload to your Node.js application using JIMP. You can download the full source code [here]().
