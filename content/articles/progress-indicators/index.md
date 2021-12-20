---
layout: engineering-education
status: publish
published: true
url: /progress-indicators/
title: Web Application Progress Indicators
description: This article explains the benefits of a progress indicator by developing a web project to demonstrate the concept.
author: dianne-sandra
date: 2021-10-27T00:00:00-11:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/progress-indicators/hero.png
    alt: Web Application Progress Indicator Image
---
In contemporary development environments, it is known by convention that a good web design must follow some preset guidelines to have an intuitive user interface/experience.
<!--more-->
One of the best ways to ensure a user has a good UI/UX is by using progress indicators. Progress indicators show a user their progress in the system, for instance, when logging in, uploading a file or downloading a file.

This article explains the benefits of a progress indicator by developing a web project to demonstrate the concept.

### Contributions of progress indicators to the UI/UX
User interface & interaction define whether a given webpage is easy and friendly to use to achieve the intended purpose. On the same note, conventionally, a system users need to understand what is going on in the system, and the results of their actions for them to consider the UI/UX friendly.

### Types of progress indicators
There are several classifications of progress indicators. However, the most relevant one classifies them as either determinant or non-determinant.

Determinant progress bars are progress indicators that shows the level of completion of an operation.

On the other hand, non-determinant progress indicators are indefinite, as they do not disclose how close to completion a task is. These progress indicators are primarily used when loading web pages since the process depends on several variables, such as network speed.

### Project setup
To demonstrate progress indicators in action, I will build a single page application that uploads files to local storage and display the progress of the upload in real-time.

We will do a demonstration for a `progress bar` and `percentage of completion` indicators. With the two implementations, you will have grasped the concept of progress indicators.

This project is simple for beginners and senior developers too. We will use JavaScript to write the functions, CSS to style the webpage, and HTML to build the actual webpage.

### Building the webpage
To get started, create your project folder, then add three files in it:
- The first file should be named `index.html`. This file contains all the HTML tags required for the webpage and its components.
- The second file, `style.css`, is responsible for containing the CSS definition that styles the HTML components of the website.
- The last file is `script.js`, which contains the functions that ensure the progress indicator works as intended.

Add the following snippet below the head tag of the `index.html` file.

```html
<body>
  <div class="wrapper">
    <header>Progress Indicators Project</header>
    <form action="#">
      <input class="file-to-upload-input" type="file" name="file" hidden />
      <i class="fas fa-cloud-upload-alt"></i>
      <p>Click here to select file to upload</p>
    </form>
    <section class="upload-progress-section"></section>
    <section class="uploaded-area"></section>
  </div>
  <script src="script.js"></script>
</body>
```

I have uploaded the `CSS` file [here](https://gist.github.com/diannesandra/3e1bfb5dd1358d0eae20dbf598222f80). It describes all the components of the webpage, and here is how the page looks after applying the CSS styling:

![CSS styling result](/engineering-education/progress-indicators/webpage-style.png)

The webpage has a form that defines a file to be uploaded. When the area is clicked, the system allows the user to select the file to upload.

Once the file is selected, the system uploads the file to local storage, indicating the level of completion as the progress bar is filled with a green colour.

### Working with the JavaScript
JavaScript is the core of this project. It determines how to script our functions to perfume the intended actions as described before.

The first step is to import the various components that we need to work with from the webpage. The import happens according to how you gave the HTML components class name.

From my `html` file, I will use the `form`, `file-to-upload`, `upload-progress-area` and `uploaded-files-area` class names. These are the main components we need in the JavaScript file:

```js
const uploadForm = document.querySelector("form"),
  fileToUpload = document.querySelector(".file-to-upload"),
  uploadProgressArea = document.querySelector(".progress-area"),
  uploadedFilesArea = document.querySelector(".uploaded-files-section");
```

Next, we add an `on click()` method to the form so that when we hover over it, we can click on any place to call a function to select the file to upload to a buffer.

```js
//add click event to the form
uploadForm.addEventListener("click", () => {
  fileToUpload.click();
});
```

#### Selecting file function
Notice that we do not have a submit button. So once our file is selected (clicked), it also fires another function, `onchange` that gets the name of the file to upload and truncates it if it is too long to fit the `upload-progress-area` and `uploaded-files-area` sections.

Afterwards, the `uploadfile` function is called to proceed:

```js
fileToUpload.onchange = ({ target }) => {
  let file = target.files[0];
  if (file) {
    // name of the file to upload
    let fileToUploadName = file.name;

    //check the length of the name and trancate accordingly
    if (fileToUploadName.length >= 12) {
      let splitName = fileToUploadName.split(".");
      fileToUploadName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }

    // call the upload function
    uploadFile(fileToUploadName);
  }
};
```

![Selecting file](/engineering-education/progress-indicators/select-file.png)

#### The upload file function
Here is where most of the work is done. First, since we already have our file to upload, we need to find a way of calculating the real-time uploaded size and translate that math to a progressive live update on the user interface.

Since this is a progressive event, we will use a `progress` event listener to fire the function continuously as long as the file is not completely uploaded:

```js
function uploadFile(name){
    //We use `XMLHttpRequest()` to retrieve the file without having to refresh webpage.
    let specialRequets = new XMLHttpRequest();

    //Initializes a request.
    specialRequets.open("POST", "");

    // progress event listener
    specialRequets.upload.addEventListener("progress", ({loaded, total}) =>{
        let fileLoaded = Math.floor((loaded / total) * 100);
        let fileTotal = Math.floor(total / 1000);
         let fileSize;
        (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    });

    // the upload progress html
    ...

}
```

#### Upload progress HTML
This section describes the behavior of the website during the upload process. First, we take the percentage calculated in the step above and display it progressively. We also display the file name.

Lastly, we take the updated values and convert them to a progress bar, which we update periodically:

```js
let progressHTML = `<li class="row">
                    <i class="fas fa-file-alt"></i>
                    <div class="content">
                        <div class="details">
                        <span class="name">${name} • Uploading</span>
                        <span class="percent">${fileLoaded}%</span>
                        </div>
                        <div class="upload-progress-bar">
                        <div class="progress" style="width: ${fileLoaded}%"></div>
                        </div>
                    </div>
                    </li>`;
uploadedFilesArea.classList.add("onprogress");
uploadProgressArea.innerHTML = progressHTML;
```

![Uploading The file](/engineering-education/progress-indicators/upload-progress.png)

When the entire file has been uploaded, we check and update the webpage by showing a tick icon and setting the `ploadProgressArea` to empty. This tick tells the user that the upload process is complete, and he can proceed to the following action.

```js
if (loaded == total) {
  //set the progress area to empty and disply finished tick icon
  uploadProgressArea.innerHTML = "";
  let uploadedHTML = `<li class="row">
                            <div class="content upload">
                            <i class="fas fa-file-alt"></i>
                            <div class="details">
                                <span class="name">${name} • Uploaded</span>
                                <span class="size">${fileSize}</span>
                            </div>
                            </div>
                            //display the check icon
                            <i class="fas fa-check"></i>
                        </li>`;
  uploadedFilesArea.classList.remove("onprogress");

  // add the uploaded html to be the contents of the uploaded files area
  uploadedFilesArea.insertAdjacentHTML("afterbegin", uploadedHTML);
}
```

![progress finished check](/engineering-education/progress-indicators/progress-complete.png)

### Applications of progress indicators
Progress indicators have a wide range of applications in a webpage:
- They give the user an estimate of how long the execution of the action they performed has gone.
- By indicating the level of completion, progress indicators can determine the speed at which a given activity is performed, for instance, upload speed.
- By informing the user about the progress of their actions, a user gets to see how the system is performing instead of being left out wondering what goes on as the system acts.

### Conclusion
In this article, we discussed the benefits of having a progress bar in an application. We further sought the contributions of progress bars to the UI/UX of an application and how it facilitates user satisfaction.

We also built a web project and added a progress indicator to emulate the file upload procedure. You can find the link to the project [here](https://replit.com/@diannesandra/Progress-indicatpors-1?v=1) and run it [here.](https://progress-indicatpors-1.diannesandra.repl.co/)

### Further reading
Since there are many progress indicators, you can style yours differently into a circular or using a GIF, but the JavaScript implementation remains similar. You can play with the CSS to give it a more stunning look.

Happy coding!

---
Peer Review Contributions by: [Mercy Meave](/engineering-education/authors/mercy-meave/)
