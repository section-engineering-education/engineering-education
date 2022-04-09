---
layout: engineering-education
status: publish
published: true
url: /image-handling-and-cropping-component-in-react.js/
title: Creating Image Handling and Cropping Component in React.js
description: In this tutorial, we will discuss the operations, logic, and dependencies required to create an image handler and cropper in React.js.
author: fred-benson
date: 2022-01-26T00:00:00-10:50
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/image-handling-and-cropping-component-in-react.js/hero.jpg
    alt: Creating image handling and cropping component in React.js
---
Media management is a primary focus of dynamic content websites such as blogs, social media websites, and entertainment websites. As user media upload rises exponentially, platforms must adapt to the constantly changing behavior and reduce server usage and cost.
<!--more-->
One way of handling media (image) files in front-end web development is cropping and compression practices. React.js and vanilla CSS could be a powerful combination in handling media and multi-media files in front-end web development.

In this tutorial, we will discuss the operations, logic, and dependencies required to create an image handler and cropper in React.js. We will also look at how to optimize image display with CSS.

### Key takeaways
By the end of this tutorial, the reader will understand:
- Getting started with the React.js development cycle.
- Creating an image cropping component with React.js.
- Limiting the numbers and size of unloadable files in React.js.
- Image compression with React.js and CSS.
- Error handling in image management.

### Prerequisites
To follow along with this tutorial, basic knowledge of React.js and CSS is required. Also, I recommend using Visual Studio Code as the preferred text editor.

Here is a link to download [Visual Studio Code](https://code.visualstudio.com/download) for free. You may also enroll in a [React crash course](https://scrimba.com/learn/learnreact) by Scrimba for free if you are not comfortable with React.js.

### Getting started with React.js development cycle
React development cycle is pretty straightforward. React gets you started with a clean slate boilerplate for your code snippets with all the default dependencies installed. A simple bash command will bootstrap the `react-app` for you.

Open up the command terminal on your computer and run the command below to create a new React application:

```bash
npx create-react-app image-app-demo
```

Yarn users can use:

```bash
yarn create-react-app image-app-demo
```

The command takes a few minutes to install and set up all the default packages your new React application needs. Internet connection is required for this operation so ensure your Wi-Fi or modem is connected.

Once the process is completed, we will start up the development server to have a real-time view of the application by running the command below:

```bash
cd image-app-demo
npm start
```

For yarn users:

```bash
cd image-app-demo
yarn start
```

If correctly implemented, a new tab will open up on your default browser and a React landing page will be displayed on [http://localhost:3000](http://localhost:3000).

### Image optimization in React.js
To frontend web developers, image optimization involves the various techniques used to improve image rendering and upload. It involves cropping, compression, resizing, and other best practices.

We will be looking at the cropping and compression techniques in this article. We will go through the steps and processes involved in performing the following:
- Building an image cropping component with React and `react-image-crop`.
- How to outline the allowed file types.
- Using `FileReader` as an alternative for previewing images.
- Preventing multiple files upload in React.js.
- Resizing images with React.js and CSS.

### Creating image cropping component with React.js
Image cropping can be done the hard way with a lot of code and manipulations but we have a package dependency that reduces the burden of image cropping. The `react-image-crop` package proves to be efficient in front-end image cropping.

#### Step 1 – Installing the react-image-crop dependency
To install the `react-image-crop` package in our project, we open up the `command terminal` and run the command below to install it:

```bash
npm install react-image-crop
```

For yarn users:

```bash
yarn add react-image-crop
```

Once it is completed, we will import and use the package in our project.

#### Step 2 – Setting up the cropping component (App.js)
The component will allow a user to select an image file from their local device. Thereafter, the user can go ahead and crop the image to their desired dimensions.

Uploading the cropped image is not covered in this article, but platforms like [Cloudinary](https://cloudinary.com/) provide cloud-based services which you could utilize for image upload. Feel free to check up on their free and paid services.

To create an image cropping component, in the `App.js` file, paste the code snippet below:

```JavaScript
import React, { useState } from "react";
import ReactCrop from "react-image-crop";

export function ImageCropper() {
  const allowedFileTypes = `image/gif image/png, image/jpeg, image/x-png`;
  const [viewImage, setViewImage] = useState(undefined);
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    height: 468,
    unit: "px",
    width: 468,
    x: 0,
    y: 107,
  });
  const [image, setImage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState(undefined);

  const handleFileChange = (e) => {
    let image = e.target.files[0];
    if (image) {
      const imageReader = new FileReader();
      imageReader.readAsDataURL(image);
      imageReader.onloadend = () => {
        setViewImage(imageReader.result);
      };
    }
  };
  const imageLoaded = (image) => {
    setImage(image);
  };
  function imageCrop(crop) {
    setCrop(crop);
  }
  function imageCropComplete(crop) {
    userCrop(crop);
  }
  async function userCrop(crop) {
    if (image && crop.width && crop.height) {
      await getCroppedImage(image, crop, "newFile.jpeg");
    }
  }
  function getCroppedImage(image, crop, fileName) {
    const imageCanvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    imageCanvas.width = crop.width;
    imageCanvas.height = crop.height;
    const imgCx = imageCanvas.getContext("2d");
    imgCx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
    return new Promise((reject, resolve) => {
      imageCanvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("the image canvas is empty"));
          return;
        }
        blob.name = fileName;
        let imageURL;
        window.URL.revokeObjectURL(imageURL);
        imageURL = window.URL.createObjectURL(blob);
        resolve(imageURL);
        setImageUrl(blob);
      }, "image1/jpeg");
    });
  }

  return (
    <>
      <label htmlFor="upload-image">
        <input
          style={{ display: "none" }}
          id="upload-image"
          name="upload photo"
          type="file"
          multiple={false}
          accept={allowedFileTypes}
          onChange={handleFileChange}
        />
        <button
          className="upload-btn"
          variant="contained"
          component="span"
        ></button>
      </label>
      <ReactCrop
        src={viewImage}
        crop={crop}
        onImageLoaded={imageLoaded}
        onChange={imageCrop}
        onComplete={imageCropComplete}
      />
    </>
  );
}
```

From the code snippet above, we:
- Imported and used `ReactCrop` from the `react-image-crop` package installed earlier.
- Used an `input` tag to allow the user to select a file for cropping.
- To prevent multiple files selection, we added the `multiple={false}` flag.
- Created the `allowedFileTypes` constant to specify the allowed file types which the user can upload which included gif, png, jpeg, and x-png.
- Defined some default arguments such as `aspect`, `height`, `unit`, `width`, etc. which we will use in the image cropping and reconstruction process.
- We also created some functions which included `handleFileChange` that accepts files. With the help of the `FileReader` method, we loaded the image to the `ReactCrop` component for cropping.

The second part of the code snippet covered the cropping operation. In that part, we did the following:
- Created the `imageLoaded` function to load and get the image ready for cropping.
- We also created the `userCrop` function that accepts the crop dimensions ie. `cropHeight` and `cropWidth` from the user, which will be provided by adjusting the cropping lines shown on the screen.
- Once the user sets the crop dimensions, the `getCroppedImage` function receives the new image data (filename, crop, and image). This will be used to reconstruct the final image for upload. The process is achieved using a 2D canvas which is used to generate, manipulate and render graphical elements in React.js.
- Finally, a new image is drawn to scale with the dimensions and image meta-data provided in the canvas. If no error occurs, a new file name (image1.jpeg) is attached to the image and displayed.

Save the changes and open up the browser to test out the `ImageCropper` component.

### Image optimization and resizing with CSS
Large image files may display beyond the allowed container size thereby distorting the page layout. Image overflow may also be displayed on top of another page element if unchecked, and we do not want that to happen.

A simple CSS trick to optimize and reduce the file size of an image is to perform a resizing operation. Also, hiding the image overflow helps check outsized image display.

Let us run an example code snippet to show how it is achieved:

```JavaScript
import React from "react";
import './App.css'

function imageResize() {
  return (
    <div className="image-container">
      <h3 classname="page-header"></h3>
      <img
      className='display-image'
        src="https://www.pexels.com/photo/red-field-summer-agriculture-70741/"
        alt="medium size flower image"
      />
    </div>
  );
}

export default imageResize;
```

From the code snippet above, we copied the URL of a large image and displayed it using the React `img` tag. We assigned `classNames` to the `div` container and `img` tag which we will apply some CSS styles.

In the CSS file (App.css), copy and paste the code snippet below:

```CSS
.image-container {
  height: 100%;
  width: 100%;
  justify-content: center;
}
.page-header{
  font-size: large;
  font-weight: bold;
  text-decoration: none;
}
.display-image img {
  width: auto;
  height: 100%;
  object-fit: contain;
  overflow: hidden;
}
```

In the CSS snippet above, we targeted the `classNames` assigned earlier to our page elements and added some styles. We prevented the image overflow from going beyond the container by adding the `overflow:hidden` flag.

Finally, we resized the image `height` and `width` to ensure it is properly displayed.

### Conclusion
In this article, we used the React.js alongside `react-image-crop` package to create an image cropping component. This component is capable of cropping an image to the size desired by the user. We also looked at how to specify the acceptable file type a user can upload and prevent multiple files selection.

Finally, we explored the ways to optimize image display in CSS. I hope this article was helpful to your web development journey.

Happy coding!

### References
[https://www.geeksforgeeks.org/resize-image-proportionally-with-css/](https://www.geeksforgeeks.org/resize-image-proportionally-with-css/)
[https://www.npmjs.com/package/react-image-crop](https://www.npmjs.com/package/react-image-crop)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
