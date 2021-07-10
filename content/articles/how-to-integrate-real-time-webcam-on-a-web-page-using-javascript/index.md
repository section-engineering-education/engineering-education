Most websites nowadays offer real-time webcam integration for profile picture upload or any other account verification step.

We'll learn how to include a webcam into a webpage using Vanilla JavaScript in an HTML5 web page in this tutorial. So let's get this ball rolling.

### What is a WebCam

A [webcam](https://en.wikipedia.org/wiki/Webcam) is a video camera that sends or streams an image or video to or through a computer network, such as the Internet, in real-time. Small cameras that sit on a desk, attach to a user's monitor, or are incorporated into the hardware are known as webcams. Webcams can be utilized during a video chat session between two or more persons, with live audio and video chats.

### What is Javascript

JavaScript is a scripting or programming language that allows you to add advanced functionality to your web pages.

### Building the application

To get started, we'll need to set up our project.

Open Visual Studio Code by navigating to a directory of your choice on your machine and opening it on the terminal. 

Then execute:

```bash
code.
```

> **Note**: `code .` won't work if you don't have Visual Studio Code installed on your system.

#### Step 1 - Create a directory

Create a directory and initialize `npm` by typing the following command:

- Windows power shell

```bash
mkdir jwebcam-with-javascript-demo

cd webcam-with-javascript-demo

npm init -y
```

- Linux

```bash
mkdir webcam-with-javascript-demo

cd webcam-with-javascript-demo
```

#### Step 2 - Create files

We need to create the `script.js` and `index.html` files using the commands below.

```bash
touch index.html script.js
```

### Step 3 - Setting up Index.html

We will setup a simple html base template as show below:

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>
        How to Integrate Real-time Webcam on a Web Page Using Javascript
    </title>
</head>

<body>
    <div class="container">
        <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">How to Integrate Real-time Webcam on a Web Page Using Javascript</h5>
                <div class="video-card">
                    <video id="video" autoplay></video>
                </div>
                <a href="#" class="btn btn-primary">Click Here to Start Cam</a>
                <a href="#" class="btn btn-danger">Click Here to Stop Cam</a>
            </div>
        </div>
    </div>

</body>

</html>
```

### Step 4 - Referencing Script.js, Jquery, Bootstrap JS and CSS CDN

Although we have added the necessary classes, our application does not appear to be aesthetically pleasing. Instead, let us import the bootstrap CDN and jquery as shown below:

```HTML
// ...

</title>

<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />

</head>

// ...
```

Adding bootstrap js CDN and JQuery

```HTML
// ...

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js"></script>
 <script src="/script.js"></script>

</body>

// ...
```

### Step 5 - Integrating Webcam on the Web Page With Javascript

To gain the user's permission to use the webcam with video track options, we'll use `navigator.mediaDevices.getUserMedia`. We will specify video: true to indicate that we only want to use the webcam and not the audio.

The function `getUserMedia()` delivers a promise that resolves when the user grants permission to view the webcam and rejects it when the user denies it. As a result, we used `.then` and `.catch` to deal with the promise.

To access and display the camera output in the video tag, let's write the function called `startCam` as shown below:

```Javascript
// Start Cam function
const startCam = () => {

    //Initialize video
    const video = document.getElementById("video");

    // validate video element
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
            })
            .catch(function(error) {
                console.log("Something went wrong!");
            });
    }
};
```

Before Implementing the stopCam function, let's test our `startCam` function. To do that, let us refer to the `startCam` function on page load using jquery as shown below:

```Javascript
// ...

$(() => {
    startCam();
});
```

### Step 6 - Adding OnClick Functionality

Let's proceed to `index.js` to update our button with the text `Click Here to Start Cam` with onClick attribute using the snippet below:

```html
    <a href="#" class="btn btn-primary" onClick="startCam()">Click Here to Start Cam</a>
```

Testing our application, we should see a request to accept turning `ON` our webcam on your browser. We can see how Powerful Javascript is to turn to integrate webcam in our web page.

### Step 7 - Implementing Stop Cam

We have seen how super easy it is to integrate a webcam in our web page using javascript, but what about turning the cam `OFF`? Of course, we should do that with ease, just like we did for turning the webcam `ON`. Let's stop the video tracks and turn off the webcam when the button stop is clicked.

```Javascript
//  ...

// Stop the webcam function
const stopCam = () => {
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
    video.srcObject = null;
};

// ...
```

### Step 8 - Adding OnClick Functionality

Let's proceed to `index.js` to update our button with the text `Click Here to Stop Cam` with onClick attribute using the snippet below:

```html
<a href="#" class="btn btn-danger" onClick="stopCam()">Click Here to Stop Cam</a>
```

Congratulations! We should successfully run our application, start and stop the WebCam, as shown below.

![success](/engineering-education/how-to-integrate-real-time-webcam-on-a-web-page-using-javascript/result.png)

You can [click here](https://github.com/Olanetsoft/webcam-with-javascript-demo) to check the complete code on GitHub.

### Conclusion

In this tutorial, we learned about How to integrate WebCam using Javascript on a web page.

Happy coding!

### Resources

- [WebCam](https://en.wikipedia.org/wiki/Webcam)
- [Javascript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript)