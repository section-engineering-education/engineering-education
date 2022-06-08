---
layout: engineering-education
status: publish
published: true
url: /uploading-deleting-and-downloading-images-uploaded-to-sanity-io/
title: Uploading, Deleting, and Downloading Images to Sanity.io
description: This tutorial will help the reader upload delete and download images uploaded to sanity.io.
author: benson-raro
date: 2022-06-08T00:00:00-12:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/uploading-deleting-and-downloading-images-uploaded-to-sanity-io/hero.jpg
    alt: Uploading deleting and downloading images uploaded to sanity.io Hero Image
---
[Sanity.io](https://sanity.io/) is a structured content platform that uses the Content Lake database to store different data uploaded to its platform.
<!--more-->
You can use sanity.io in two ways:
1. As a Content Management System (CMS), the administrator usually has all the permissions, e.g., managing text, images, and any other type of information.
2. Only to store data and perform updates on the website.

In this blog, we will build a simple web application using sanity.io to store data. Then, we will upload the photos to the database and retrieve them using GROQ. Functionality such as uploading, deleting, and downloading uploaded images can be integrated into the website.

Let us begin!

### Prerequisites
To follow along the reader should have the following:
- Have basic knowledge of ReactJS.
- Have a code editor, i.e., [VS code](https://code.visualstudio.com/download).
- Install [Node.js](https://nodejs.org/en/) on the computer.
- Have a basic knowledge of creating React applications.
- Install the following packages necessary for the project:

1.  [Sanity.io](https://sanity.io/)
2.  [@sanity/client](https://www.npmjs.com/package/@sanity/cli)
3.  [@sanity/image-url](https://www.npmjs.com/package/@sanity/image-url)
4.  [Tailwind CSS](https://tailwindcss.com/docs/installation)
5.  [React Masonry CSS](https://www.npmjs.com/package/react-masonry-css)
6.  [React-icons](https://react-icons.github.io/react-icons)
7.  [React-router-dom](https://www.npmjs.com/package/react-router-dom)

### Installation
To install [Sanity.io](https://sanity.io/), follow the steps below:
- Start by creating a new folder in any directory and naming it. After that, create a new folder in that folder, namely, the backend.
- Open your terminal and change the directory by typing the command below:

```bash
cd backend
```

> Note: Open the terminal on your code editor.
- In this folder, we will install sanity.io using the commands below:

This command will install the sanity.io command line.

```bash
npm install -g @sanity/cli
```

After installing the sanity.io command line, we initialize the sanity system using the command below:

```bash
sanity init
```

For the Sanity API to set up the best project structure for us, select the following in the terminal dialog:
- Log in using your email.
- Create a new project.
- Choose the default dataset configuration by typing `y`, then enter.
- Select the project template. Then, choose a clean project with no pre-defined schemas.

### Setting up a React.js project
To set up the React.js project, create a new folder in the same directory where you made the backend folder, namely "frontend."

After that, open the terminal and input the command below:

```bash
npx create-react-app ./
```

#### Install all the necessary packages for the project
We must install the packages in the same directory as React.js. Therefore, change the directory.

To use sanity.io in a react.js project, we must install these two packages:

1. [@sanity/client](https://www.npmjs.com/package/@sanity/cli)
   
```bash
npm i @sanity/cli
```

2. [@sanity/image-url](https://www.npmjs.com/package/@sanity/image-url)
   
```bash
npm i @sanity/image-url
```

Now let us install the other packages:

3. [Tailwind CSS](https://tailwindcss.com/docs/installation)

```bash
npm install -D tailwindcss
npx tailwindcss init
```

After that, we need to change the tailwind CSS configuration file:

```css
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      height: {
        420: '420px',
      },
      backgroundColor: {
        secondaryColor: '#F0F0F0',
      },
    },
  },
  plugins: [],
};
```

4. [React Masonry CSS](https://www.npmjs.com/package/react-masonry-css)
   
```bash
npm i react-masonry-css
```

5. [React-icons](https://react-icons.github.io/react-icons)
   
```bash
npm install react-icons --save
```

6. [React-router-dom](https://www.npmjs.com/package/react-router-dom)
   
```bash
npm i react-router-dom
```
After installation, you should have a file structure:

![sanity project file structure](/engineering-education/uploading-deleting-and-downloading-images-uploaded-to-sanity-io/filestructure.PNG)

### Creating the database
#### Creating a schema
- Schema's function is to create content models in a sanity.io CMS. Schemas are usually simple JavaScript code.
- In the backend folder, select folder schemas and create a new file `photo.js`.
- Write the following script in the `photo.js`:
  
```javascript
export default {
  name: "photo",
  title: "Photo", // name of the model
  type: "document",
  fields: [
    {
      name: "image", // name of the field
      title: "Image",
      // photos are identified in the sanity database by the keyword image
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
```
The `hotspot` will enable us to display images on our website responsively at different ratios during display.

Let us import the file above into the `schema.js` file.

```javascript
import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";

import photo from "./photo";

export default createSchema({
  name: "default",

  types: schemaTypes.concat([
    //type photo and import the file above
    photo,
  ]),
});
```
Ensure you are in the backend directory to view the output design. Then type in the terminal:

```bash
sanity start
```
Your sanity.io CMS should look like this:

![sanity.io CMS](/engineering-education/uploading-deleting-and-downloading-images-uploaded-to-sanity-io/sanitycms.PNG)

### Working on the web application
#### Step 1: Working with react.js
First, we delete the src folder in the frontend directory and then create a new folder with the same name in the same directory. Second, create the following files in the src folder:

`index.js` , `App.js` , `index.css` , `user.js`, `data.js` , `Add.jsx`, `Images.jsx`, ` masonryLayout.jsx`, `UploadImage.jsx`

> Note: These files depend on each other. Therefore, if one file is not working, it may cause errors.

In the `index.css` file, write the following script:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: "Lato", sans-serif;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
```
In the `index.jsx` file, write the following script:

```js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
```

`Router`, `Route`, and `Routes` help us navigate between different web pages.

In the `App.js` file, write the following script:

```js
import { Routes, Route } from "react-router-dom";
import Add from "./Add";
import UploadImage from "./UploadImage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Add />} />
      <Route path="/upload_image" element={<UploadImage />} />
      //To change to UploaImage page, type /upload_image after localhost:3000
    </Routes>
  );
}
export default App;
```

#### Step 2: Connecting the Sanity.io database to the web application
Here we need to have a project ID and its token. We need to create a file, namely, `.env,` in the frontend directory. By doing this, the project's ID and token will not be visible to the website users.

Next, type the command below on the terminal.

```bash
sanity manage
```
This command will open a page in your browser.

To generate the project's token, click `API` -> `Add API token` and enter any name.

Next, select "Editor" and save for the token to be generated. Copy and paste the project token into the `.env` file, as shown below:

```bash
REACT_APP_SANITY_PROJECT_ID = projectid
REACT_APP_SANITY_TOKEN = projectToken
```

In the `user.js` file, write the following script:

```js
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

export const user = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2022-11-16",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const build = imageUrlBuilder(user);

export const urlFor = (source) => build.image(source);
```
The `user` function will help us upload, delete, and retrieve images from the CMS. `Build` and `urlFor` are the functions required in sanity.io when working with images.

#### Step 3: Writing a GROQ query
In the `data.js` file, write the following script:

This query will help us query images from the content management system.

```js
export const addQuery = `*[_type == "photo"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
  _id
    } `; //make sure you use back-ticks (``) instead of quotes.
//_id is the specific image id, and the URL retrieves all images with the help of order (_createdAt desc).
```

#### Step 4: Uploading pictures to the database
In the `UploadImage.jsx` file, write the following script:

```js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import { user } from "./user";
```
Then create the following hooks:

```js
const uploadImage = () => {

    const navigate = useNavigate();
    const [imagesAssets, setImagesAssets] = useState(null);
    const [wrongTypeofImage, setWrongTypeofImage] = useState(false);
    const [setField] = useState();
```

This part of the script is where we check if the input image meets the criteria. If it doesn't, an error will be displayed.

```js
    const uploadImage = (e) => {
       const selectedImage = e.target.files[0];

    //to input an image to the upload field
(selectedImage.type === 'image/png' ||
selectedImage.type === 'image/svg' ||
selectedImage.type === 'image/jpeg' ||
selectedImage.type === 'image/gif' ||
selectedImage.type === 'image/tiff') {
        setWrongTypeofImage(false);

          user.assets
          .upload('image', selectedImage, { contentType: selectedImage.type, filename: selectedImage.name })
          .then((document) => {
            setImagesAssets(document);

          })
          .catch((error) => {
            console.log('Upload failed:', error.message);
          });
      } else {
        setWrongTypeofImage(true);
      }
    };

```
This function will save the image to the sanity database. We use the `if statement` to check if the image asset has an id. If true, the image will form a document (`doc`) with the type of `photo`.

> Note: We need to specify the `photo` to correspond to a specific schema in the sanity database.

Images are stored somewhere else in the sanity system; therefore, we need to reference the image and connect it to our document by using `_ref: imagesAssets?._id,`

Next, the `user` function will save the document to the database and redirect the user to the feed page.

```js
//saves the image to the database
const saveImage = () => {
  if (imagesAssets?._id) {
    const doc = {
      _type: "photo",
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imagesAssets?._id,
        },
      },
    };
    user.create(doc).then(() => {
      navigate("/");
    });
  } else {
    setField(true);

    setTimeout(() => {
      setField(false);
    }, 2000);
  }
};
```
For the last part, write the following code:

```js
  return (
    <div className='flex flex-col justify-center items-center mt-5 lg:hh-4/5'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
           <div className='flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420 '>
//the ternary operation
                {!imagesAssets ? (
                     <label>
                         <div className='flex flex-col items-center justify-center h-full'>
                             <div className='flex flex-col justify-center items-center'>
                                  <p className='font-bold text-2xl'>
                                     <AiOutlineCloudUpload/>
                                  </p>
                                  <p className='text-lg'>Click to upload</p>
                             </div>
                         </div>
                         <input
                        type="file"
                        name="upload-image"
                        onChange={uploadImage}
                        className="hidden"
                      />
                     </label>
                ) :(
                    <div className='relative h-full'>
                        <img src={imagesAssets?.url} alt='uploaded_image'
                        className='h-full w-full'
                        />
                        <button
                        type='button'
                        className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                        onClick={() => setImagesAssets(null)}
                        >
                          <MdDelete/>
                        </button>
                    </div>
                )}
           </div>
        </div>
  //The paragraph tag contains the error.
                {wrongTypeofImage && <p>Wrong type of image</p>}
                 <div className='flex justify-end items-end mt-5'>
                 <button
                type="button"
                onClick={saveImage}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
                >
                Save Image
              </button>
                 </div>
             </div>
  )
}

export default uploadImage
```

Now, try to upload an image from your website. After inputting the image, you should have something like this:

![sanity.io CMS after upload](/engineering-education/uploading-deleting-and-downloading-images-uploaded-to-sanity-io/afterinput.PNG)

At your sanity CMS desk, you should have the photo below.

![sanity.io CMS after upload](/engineering-education/uploading-deleting-and-downloading-images-uploaded-to-sanity-io/sanitycmsafterupload.PNG)

By writing the above code, we created a ternary operation to do the following:
- To check if there is an image asset entered. If none, we display the field to input an image.
- In the other case, to display the image. A delete icon on the image, onClick, will set the input field to null to input a new idea.
- Call the `wrongTypeofImage` usaState hook so that what's in the paragraph tag can be displayed if the input image is the wrong type of image, as stated in the `if-else` statement above.
- In the button tag, we call the `saveImage` function so that onClick to save the image to the database.

#### Step 5: Creating the feed page
The feed page is where we will render the images.

In the `Add.jsx` file, write the following script:

```js
import React, { useState, useEffect } from "react";
import MasonaryLayout from "./masonryLayout"; // we'll use masonryLayout later to style the feed page
import { addQuery } from "./data";
import { user } from "./user";
```
In a functional component just before the return method, we create two hooks, `useState` and `useEffect`. `useState` to set up the image state and `useEffect` to query the images from the Sanity.io database with the help of the query we created earlier.

```js
const Feed = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {

    user.fetch(addQuery)
    .then((data) => {
      setImages(data);
    })
  }, [])
```
After that, we need to render the images from the Sanity.io database below the return method.

```js
  return (
    <div>
       {images && <MasonaryLayout images={images}/>}
    </div>
  )
  }
  export default Feed
```

#### Step 6: Styling the Feed Page
We are going to use masonry-CSS to style the feed page. A masonry layout is a grid that is not straight with rows and columns, and the items do not have the same height.

In the `masonryLayout.jsx` file, write the following script:

Import the following:

```js
import React from "react";
import Masonry from "react-masonry-css";
import Images from "./Image";
```
Create an object containing an option for the breakpoint, as shown below.

The breakpoint is the responsiveness of the web application when it comes to different devices. For example, there will be 500 images for 1 row on a mobile phone, hence the ratio of 500:1.

```js
const breakpoint = {
  default: 4, //Default number of rows
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};
```
In the return method, we will provide the breakpoint. After that, loop through the images since we imported the image file above.

```js
const MasonaryLayout = ({ images }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpoint}>
      {images?.map((photos) => (
        <Images key={photos._id} photos={photos} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonaryLayout;
```

#### Step 7: Retrieving, deleting, and downloading images from the sanity database
In the `Images.jsx` file, write the following script:

Begin by importing the following:

```js
import React, { useState } from "react";

import { AiTwotoneDelete } from "react-icons/ai";
import { MdDownloadForOffline } from "react-icons/md";
import { urlFor, user } from "./user";
```
In a functional component just before the return method, we want to set an event using the `useState` hook such that when we hover over the image, the icons will appear.

Also, create a function that we will use to delete uploaded images. We will call the image from the database using the `user` function we imported above and delete it using its specific ID.

```js
const Image = ({ photos }) => {

  const [imageHovered, setImageHovered] = useState(false);

  const {_id,image} = photos;

  const deleteImage = (id) => {
    user.delete(id)
        .then(() => {
        window.location.reload();
      });
     };
```
Then, add the following script:

```js
  return (
    <div className='m-2'>
      <div
      onMouseEnter={() => setImageHovered(true)}
      onMouseLeave={() => setImageHovered(false)}
      className=" relative hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
   //Retrieves images
      <img className='rounded-lg w-full' alt="users_post" src={urlFor(image).width(250).url()}/>

      {imageHovered && (
        <div
        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
        style={{ height: '100%' }}
        >
              <div className="flex items-center justify-between">
              <div className="flex gap-2">
    //download images from the database
                <a
                  href={`${image?.asset?.url}?dl=`}//make sure you use back-ticks(``) instead of quotes
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                ><MdDownloadForOffline />
                </a>
   //delete the image from the database
                <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteImage(_id);
                }}
             className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
           >
             <AiTwotoneDelete />
           </button>

              </div>
              </div>
     </div>
      )}
      </div>

    </div>
  )
}

export default Image
```
What we did above was:
- Retrieved images from the database using the image tag and the `urlFor` function we imported from the `user.js` file.
- Checked if the image has been hovered by calling the `imageHovered` from the `useState` hook.
- Then, we set the functionality of the hovered icons. For example, when you click the delete icon, you delete that image. Also, when you click the download icon, you download that image.

Below is an example of an output:

![sanity.io CMS](/engineering-education/uploading-deleting-and-downloading-images-uploaded-to-sanity-io/websiteview.PNG)

With this view, you can fully see the advantages of masonry CSS.

### Conclusion
In this tutorial, we learned how to upload, delete, and download images uploaded to the sanity database. But you can go further and learn how to upload videos and other types of information to the Sanity database.

For the complete source code, click [here](https://github.com/ben-cdm/Uploading-deleting-and-downloading-images-uploaded-to-sanity.io/tree/master).

Happy coding!

### Other resources
- [How to Get Started with Sanity CMS](/engineering-education/getting-started-with-sanity-cms/)

---
Peer Review Contributions by: [Mohamed Alghadban](/engineering-education/authors/mohamed-alghadban/)
