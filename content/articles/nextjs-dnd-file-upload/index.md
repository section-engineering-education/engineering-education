---
layout: engineering-education
status: publish
published: true
url: /nextjs-dnd-file-upload/
title: How to Implement Drag and Drop File Upload in Next.js
description: In this tutorial, we will learn how to create a file upload dropzone component in Next.js using the Drag and Drop API's.
author: gisiora-elvis
date: 2022-04-22T00:00:00-05:20
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/nextjs-dnd-file-upload/hero.png
    alt: How to Implement Drag and Drop File Upload in Next.js Hero Image
---
It is a common requirement for web applications to be able to upload files to a server. This can be achieved using the HTML5 Drag and Drop API and the JavaScript FileReader API.
<!--more-->
The Drag and Drop API allows you to drag and drop files onto a web page and the FileReader API allows you to read the contents of a file. 

In this tutorial, we will learn how to create a file upload dropzone component in Next.js using the above-named APIs.

By the end of this tutorial, you will have a working Next.js dropzone component that can be used to upload files to a server. The final app you will have by the end of this tutorial will look like the image shown below:

![Drag and drop file upload in Next.js](/engineering-education/nextjs-dnd-file-upload/drag-n-drop-final-app.png)

### Prerequisites
To follow along with this tutorial, you will need to:
- Have [VS Code](https://code.visualstudio.com/) and [Node.js](https://nodejs.dev/download) installed on your machine.
- Be familiar with HTML5 file Drag and Drop API and FileReader API.
- Be familiar with styling interfaces using CSS.
- Have worked with Next.js.

### Table of contents
- [Prerequisites](#prerequisites)
- [Table of contents](#table-of-contents)
- [Setup](#setup)
- [App Components](#app-components)
- [Managing state](#managing-state)
- [File drag and drop](#file-drag-and-drop)
- [File select](#file-select)
- [File upload](#file-upload)
- [Conclusion](#conclusion)
- [References](#references)

### Setup
Make sure your development environment is set up and ready with [Node.js](https://nodejs.dev/download) and [VS Code](https://code.visualstudio.com/). The simplest of creating a new Next.js app is using `create-next-app`, which sets up everything automatically for you.

To create a project, run:

```bash
npx create-next-app@latest
```

This makes use of `npx` and the `create-next-app` to bootstrap a basic Next.js app with the latest version. Run the following command to start the development server:

```bash
npm run dev
```

This starts the development server and allows you to preview the app in your browser on `http://localhost:3000`.

### App Components
Within the project's root folder, create a new folder and name it components. This directory will contain the components that will make up the application.

Within the components directory, create the following files:

1. The `FilePreview.js` component:

```js
import React from "react";
import styles from "../styles/FilePreview.module.css";

const FilePreview = ({ fileData }) => {
  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>
        {/* loop over the fileData */}
        {fileData.fileList.map((f) => {
          return (
            <>
              <ol>
                <li key={f.lastModified} className={styles.fileList}>
                  {/* display the filename and type */}
                  <div key={f.name} className={styles.fileName}>
                    {f.name}
                  </div>
                </li>
              </ol>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;
```

The `FilePreview.js` component will be used to display the files that have been selected. It uses the `FilePreview.module.css` file to style the component. This component takes in a single prop, `fileData`, which is an object containing the file data.

The `fileData` object contains a `fileList` array. This will be the selected or dropped files.

Iterate over the `fileList` array and display the file name. Afterwards, set the list key to the last modified date and file name div key to the file name.

2. The `DropZone.js` component:

```js
import React from "react";
import Image from "next/image";
import FilePreview from "./FilePreview";
import styles from "../styles/DropZone.module.css";

const DropZone = () => {
  return (
    <>
      <div className={styles.dropzone}>
        <Image src="/upload.svg" alt="upload" height={50} width={50} />
        <input id="fileSelect" type="file" multiple className={styles.files} />
        <label htmlFor="fileSelect">You can select multiple Files</label>
        <h3 className={styles.uploadMessage}>
          or drag &amp; drop your files here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={data} />
    </>
  );
};

export default DropZone;
```

This component will be used to create and display the dropzone region. It makes use of the HTML `input` element to allow the user to select files from their computer.

It also imports the `filePreview` component to display the images that have been uploaded. The `filePreview` component uses the `DropZone.module.css` file to style the component.

Ultimately, the logic to select or handle the drag and drop files and upload them to the server will be contained within the `DropZone.js` file. Import the `DropZone` component from the `components` directory and add it to the `index.js` file in the pages directory.

3. The `index.js` file:

```js
import React from "react";
import Head from "next/head";
import DropZone from "../components/DropZone";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Drag And Drop File Upload</title>
        <meta name="description" content="Nextjs drag and drop file upload" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Drag And Drop File Upload</h1>
        <DropZone />
      </main>

      <footer className={styles.footer}>
        <div>{new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
```

The index.js file will be used to render the application. It imports the `DropZone` component from the `components` directory. It uses the `Home.module.css` file to style the page.

The logic to handle and manage the state (the selected files) will be contained within the `index.js` file.

Here is the UI of the application up to this point:

![The dropzone ](/engineering-education/nextjs-dnd-file-upload/dropzone.png)

### Managing state
To keep track of the dropped files, you will need to manage the state of the application. We will keep track of the following states:
- `inDropZone` - A boolean value, will be set to `true` when the user drags a file over the dropzone region.
- `fileList` - An array of files (file objects) that have been selected.

The app state will depend on the previously selected files (previous state) and makes use of the `useReducer` hook to manage state changes. The hook takes in a reducer function and an initial state.

The reducer function will be used to update the state i.e `(state, action) => newState` . To read more about the useReducer hook, click [here](https://reactjs.org/docs/hooks-reference.html#usereducer).

In the `index.js` file before the return, add the following code:

```js
...
 // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });
...

```

The `useReducer` hook takes in a reducer function, the initial state then returns the current state and a dispatch function. The dispatch function will be used to update the state.

Add the following code to `index.js` file:

```js
...

        {/* Pass state data and dispatch to the DropZone component */}
        <DropZone data={data} dispatch={dispatch} />

...
```

This passes data and dispatch to the `DropZone` component as props.

### File drag and drop
Next, implement the drag and drop functionality. In this tutorial of the 8 [HTML5 drag and drop events](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API), we will use 4 that are fired when a file is dropped onto the dropzone region.

The following are the HTML5 drag and drop events:
1.  `dragenter` event - This event is fired when the user drags a file over the dropzone region.
2.  `dragover` event - This event is also fired when the user drags a file over the dropzone region.
3.  `drop` event - This event is fired when the user drops a file onto the dropzone region.
4.  `dragleave` event - This event is fired when the user drags a file past the dropzone region.

Add the following event listeners to the `DropZone.js` component:
  
```js
...

const DropZone = ({ data, dispatch }) => {
  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  return (
    <>
      <div
        className={styles.dropzone}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <Image src="/upload.svg" alt="upload" height={50} width={50} />

        <input
          id="fileSelect"
          type="file"
          multiple
          className={styles.files}
        />
        <label htmlFor="fileSelect">You can select multiple Files</label>

        <h3 className={styles.uploadMessage}>
          or drag &amp; drop your files here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={data} />
    </>
  );
};

export default DropZone;
```

This will turn the `DropZone.js` component into a dropzone region. The `handleDragEnter`, `dragenter`, `handleDragLeave`, `handleDragOver` and the `handleDrop` function will be used to prevent the default behavior, i.e event propagation from child to parent.

The `handleDrop` function will be used to prevent the default behavior which is to open the file on the browser. It instead lets you define the custom behavior to handle the file drop.

`onDragEnter` and `onDragOver` set the `inDropZone` state to true since the user is dragging a file over the valid dropzone region. `onDragLeave` set the `inDropZone` state to false since the user is dragging a file away from the valid dropzone region.

`onDrop` will set the `inDropZone` to get the fileList from the event on the dataTransfer object as an array, iterate over existing files and checks if the file already exists. If it does, it doesn't add it to the fileList, this is to prevent duplicates. Then, it dispatches an action to add dropped files or files to fileList. Finally, reset `inDropZone` to false.

### File select
To handle file selection, add the following code to the `DropZone.js` component and the `onchange` event listener to the `input` element:

```js
...

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };

  return (
    <>
      ...

        <input
          id="fileSelect"
          type="file"
          multiple
          className={styles.files}
          onChange={(e) => handleFileSelect(e)}
        />
        <label htmlFor="fileSelect">You can select multiple Files</label>

        <h3 className={styles.uploadMessage}>
          or drag &amp; drop your files here
        </h3>

      ...
    </>
  );
```

Use the `onChange` event on the `input` element. This occurs when the value of an element has been changed. In this case, the event is fired when the user selects a file or files.

The `handleFileSelect` function will be used to get the files from the event on the input element as an array. Then it iterates over existing files and checks if the file already exists. If true, it does not add it to the fileList, this is to prevent duplicates. Afterwards, it dispatches an action to add selected file or files to fileList.

### File upload
Add the following code to the `DropZone.js` component to handle file upload:

```js
...

// to handle file uploads
  const uploadFiles = async () => {
    // get the files from the fileList as an array
    let files = data.fileList;
    // initialize formData object
    const formData = new FormData();
    // loop over files and add to formData
    files.forEach((file) => formData.append("files", file));

    // Upload the files as a POST request to the server using fetch
    // Note: /api/fileupload is not a real endpoint, it is just an example
    const response = await fetch("/api/fileupload", {
      method: "POST",
      body: formData,
    });

    //successful file upload
    if (response.ok) {
      alert("Files uploaded successfully");
    } else {
      // unsuccessful file upload
      alert("Error uploading files");
    }
  };

  return (
    <>
      ...
      {data.fileList.length > 0 && (
        <button className={styles.uploadBtn} onClick={uploadFiles}>
          Upload
        </button>
      )}
    </>
  );
```

The upload button will be shown only if there are files in the fileList. The `uploadFiles` function will be used to get the files from the fileList as an array, initialize formData object, loop over files and add to formData. It then uploads the files as a POST request to the server using fetch.

The `response` object will be used to check if the file upload was successful. If successful, alert the user that the files were uploaded successfully. If unsuccessful, alert the user that there was an error uploading the files.

> `/api/fileupload` is not a real endpoint, it is just an example for the purpose of this tutorial.

Here is the [link](https://github.com/gisioraelvis/nextjs-dnd-fileupload-code.git) to the complete code of the app on GitHub.

### Conclusion
File upload is a common and essential requirement for web applications. In this tutorial, we have implemented a drag and drop file upload component in Next.js.

We used the HTML5 drag and drop API and the FileReader API to listen and detect when files are dragged and dropped onto the application or when files are selected via the input element. We finally read the file contents to show a preview and uploaded the files to a server.

Feel free to use the code in this tutorial as a starting point to create your file upload components that suit your application needs. 

You are welcome to share this article and give feedback in the comments section below.

Cheers!

### References
- [HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)
- [FileReader API](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)
- [Reactjs useReducer hook](https://reactjs.org/docs/hooks-reference.html#usereducer)
- [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
- [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Implementing an image upload application with Vanilla JavaScript](https://www.javascripttutorial.net/web-apis/javascript-filereader/)

---
Peer Review Contributions by: [Dawe Daniel](/engineering-education/authors/dawe-daniel/)
