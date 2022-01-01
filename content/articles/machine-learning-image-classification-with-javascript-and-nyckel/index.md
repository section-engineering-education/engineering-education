---
layout: engineering-education
status: publish
published: true
url: /machine-learning-image-classification-with-javascript-and-nyckel/
title: Machine Learning Image Classification with Javascript and Nyckel
description: This article shows how to implement machine learning models in a web application to classify images. In this case, we will classify and identify the images of people wearing and those not wearing a mask.
author: kamau-victor
date: 2021-12-23T00:00:00-17:10
topics: [Machine Learning]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/hero.png
    alt: machine learning nyckel image hero
---
Artificial intelligence has become the future of technology, and everyone is trying to apply it in all areas. Artificially intelligent applications contribute to AI technology, with trading bots and other apps. Web developers, also want to integrate these models into their applications.
<!--more-->
This article will show how to implement machine learning models in a web application to classify images. Here, we will classify and identify the images of people wearing and those not wearing a mask.

### Table of contents
- [Requirements](#requirements)
- [JavaScript CSS and HTML website build](#javascript-css-and-html-website-build)
- [Building the Machine Learning model using Nyckel](#building-the-machine-learning-model-using-nyckel)
- [Machine learning model integration with the Web Application](#machine-learning-model-integration-with-the-web-application)
- [App live testing](#app-live-testing)
- [Conclusion](#conclusion)

### Requirements
To follow this tutorial along, the reader will need the following:
- A suitable editor like visual studio, sublime, or another.
- Prior knowledge of Nyckel, JavaScript.
- Basic knowledge of HTML and CSS.

### What is Nyckel?
Nyckel is a machine learning API that provides automated training to models instead of manually writing the code. It also allows these models to be integrated into applications with the best simplicity. Follow each step below to develop your own machine learning-enabled web application.

### JavaScript CSS and HTML website build
We will build a simple web application to upload a photo from the desktop into the app. The layout will only need a section to place your photo and a button to make a system call to the file explorer.

#### HTML Build-up
First, create a file with a `.html` extension that will hold the html code. The script tag is then placed under the `<head>` tag to create a connection to the JavaScript file which will be created at a later stage.

```html
<html>
<head>
  <script src="https://code.jquery.com/jquery-latest.min.js"></script>
</head>

```

Under the body tag is where the upload section lies. This code creates a clickable upload section for uploading photos.
```html
<body>

  <div id="main" class="container">

    <h1 id="title">Mask or no mask?</h1>

    <!-- Drag and Drop container-->
    <div class="upload-area" id="uploadfile">
      <h2>Drop Your photo here</h2>
    </div>
    <input type="file" name="file" id="file">
    <a id="nyckel" href="https://www.nyckel.com">Machine Learning application created by Victor</a>
  </div>
</body>
```

The division class `upload-area` in the code above creates a container for holding the photo being uploaded. When you run the code combination above, you should have a web page with a button and an upload section only, as shown in the screenshot below.

![htmlResult](/engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/htmlResult.png)

> Since this tutorial is not deeply involved in website styling, you can use your styles and learn how to link them to the application. For more information on CSS styling, you can refer to this [article](/engineering-education/getting-started-with-css/) for CSS beginners.  

>To get my styles that have been used for this particular tutorial, you can refer to my [Github repository](https://github.com/del-ui/Machine-Learning-Image-Classifier-Application/blob/main/style.css) to get the full CSS code.

When you use the code from the above link, similar results as those in the photo below can be obtained.

![styled](/engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/styled.png)

#### JavaScript functions
JavaScript helps in client-side scripting. However, it primarily uses functions to enable some activities in a webpage. Examples of such actions to be encouraged by these functions in this page include; upload by dragging, sending AJAX requests to Nyckel to run against the machine learning model, ensuring that an image is uploaded, resizing large images, and many more.

The following code contains such functions. First, create a JavaScript file (.js) and copy & paste the code below. 

```JavaScript
$(function ()
{
    // preventing the page from redirecting
    
    $("html").on("dragover", function (d)
    {
        d.preventDefault();
        d.stopPropagation();
        $("h2").text("Drag here");
    });

    $("html").on("drop", function (d) 
      { 
        d.preventDefault();
        d.stopPropagation();
        });

    // Dragging entry as 'dragenter'
    
    $('.upload-area').on('dragenter', 
    function (d)
       {
        d.stopPropagation();
        d.preventDefault();
        $("h2").text("Drop");
    });

    // Dragging over as 'dragover.'
    
    $('.upload-area').on('dragover', function (d)
    {
        d.stopPropagation();
        d.preventDefault();
        $("h2").text("Drop");
    });

    // This allows the image being dragged to be droppable
    $('.upload-area').on('drop', 
    function (d)
      {
      // after dropping the image(propagation), this prevents the page from going back to default but instead let the image stick

        d.stopPropagation();
        d.preventDefault();
        $("h2").text("Checking...");

        var file = d.originalEvent.dataTransfer.files;

        showImage(file[0]);

        resizeAndUploadImage(file[0]);
    });

    // Open file selector on div click
    // When you click on the upload area, this opens your local files location (file explorer if it is a computer)
    $("#uploadfile").click(function ()
    {
        $("#file").click();
    });

    // file selected
    $("#file").change(function ()
    {
        var file = $('#file')[0].files[0];
        showImage(file);
        resizeAndUploadImage(file);
    });
});
// This function reads the uploaded file into your application.
function showImage(file)
{
    var reader = new FileReader();
    reader.onload = function (d)
    {
        $('.upload-area').css("background-image", "url(" + d.target.result + ")");
    }
    reader.readAsDataURL(file);
}

function resizeAndUploadImage(file)
{
    // Ensure it's an image (the file must be a photo)
    if (file.type.match(/image.*/))
    {
        // Load the image
        var reader = new FileReader();
        reader.onload = function (readerEvent)
        {
            var image = new Image();
            image.onload = function (imageEvent)
            {
                // this gives the specifications to the canvas about the measurements of the uploaded image
                // It checks the image size and if it does not match the required dimensions, it is resized to fit the canvas
                var canvas = document.createElement('canvas'),
                    max_size = 600, //maximum size of any uploaded file
                    width = image.width,
                    height = image.height;
                if (width > height)
                {
                    if (width > max_size)
                    {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else
                {
                    if (height > max_size)
                    {
                        width *= max_size / height;
                        height = max_size;
                    }
                    //New dimensions are given to the image if it exceeds the defined maximum
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                var resizedImage = dataURLToBlob(dataUrl); //the resized image is then interpreted as raw data
                
                checkImageWithNyckel(resizedImage);
            }
            image.src = readerEvent.target.result;
        }
        //this ensures that Nyckel reads the image as raw data
        reader.readAsDataURL(file);
    }
    else
    {
    // If the file is not an image, upload is rejected with an alert, and the page is reset to default
        alert("You must choose an image");
        resetPage();
    }
}
```

The first section of the above code script enables different functionalities like photo drag-over, image resizing, and file type, as indicated in the comments. The rectangular area for hosting the uploaded image is called a **canvas** in HTML. A **blob**, on the other hand, represents objects in the form of raw data. 

Converting canvas to blob translates the images uploaded to your application so that the model can understand. The code below is a utility function extending the JavaScript file to convert a canvas to a blob.

```JavaScript
/* Utility function to convert a canvas to a BLOB */
var dataURLToBlob = function (dataURL)
{
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1)
    {
    // The file is converted to url data which is the raaw data and split into two parts
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], { type: contentType });
        // Once the image is uploaded, this function returns it as raw url data
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);
// the blob url data parts are stored in form of an array that adjust with the data size 
    for (var i = 0; i < rawLength; ++i)
    {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

```

Once the conversion is complete, the page needs to be reset to receive another upload. This can be done by the following function added right after the conversion function.

```JavaScript
/* End Utility function to convert a canvas to a BLOB*/
function displayResult(response)
{
    resetPage();
    $("#title").text(response.labelName);
}
// After a result is obtained, this function resets the page to be ready to receive another file.
function resetPage()
{
    $("#thinking").hide();
    $(".upload-area").show();
    $("h2").text("Drop JPG here");
}
```

The last section of the script introduces AJAX (Asynchronous JavaScript and XML) which invokes the machine learning model. By sending a request to Nyckel to run against your saved model using the url. Copy the url provided by Nyckel after training your model and replace the one given in this code.

```JavaScript
// Sending AJAX request to Nyckel to run against ML model
function checkImageWithNyckel(image)
{
    var formdata = new FormData();
    formdata.append('file', image);
// this get your model to function as if it is in your application
    $.ajax({
        url: 'https://www.nyckel.com/v1/functions/j3l3xdfs0fv4tec7/invoke',
        type: 'post',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response) // the image is checked against the model for classification
        {
        // Once checked, the right classification response is displayed as "with mask" or "without mask."
            displayResult(response);

            //Show the JSON response in the console
            console.log(response);
        },
        error: function (response)
        {
        //In case the model cannot classify the image, the page is reset to indicate a classification error.
            alert("Error checking image", response);
            $("#title").show();
            resetPage();
        }
    });
}
```

To link this file to the HTML file, you will create a JavaScript reference link in the HTML file below the CSS link as indicated below.

```html
<script type="text/Javascript" src="../mlApp/js/main.js"></script>

```

Now refresh your page and try clicking on the upload area. It opens windows explorer to allow you to upload a photo.

### Building the machine learning model using Nyckel
This section will train a model using Nyckel to classify images of people wearing a mask and those not wearing a mask. You will require a web association with access 'Nyckel website' to prepare the model. The steps below will produce a successfully trained model for our web application.

#### Create a Nyckel account
Creating an account will allow you to use the Nyckel training site for your model. To sign-up, go to [nyckel.com](https://www.nyckel.com) sign-up page to set up your connection with this API.

- After signing up, select input type (image for this case), add output categories as  `with mask` and `without mask`, then hit the `create function` button. 
- In the area provided, upload your photos, two with the mask on and two without masks, then label them correctly using the two labels. 
- Upload more photos and import while checking their categorization accuracy. 

> The more photos used for training, the higher the model's accuracy.

After categorizing, you will get a notification that your model is trained. Navigate to invoke section and perform a satisfaction test on the model by uploading a different photo from the ones used to check the output function.

Having done all that, your model is trained and ready to use.

### Machine learning model integration with the web application
To integrate the trained model to the web application, navigate to the API section and copy the url given and paste in the JavaScript code under `$ajax`. The url looks almost familiar to the one shown below, ending with `invoke`.

```bash
https://www.nyckel.com/v1/functions/j3l3xdfs0fv4tec7/invoke
```

Once done, your application is ready for testing with photos not included during training. 

### App live testing
After integrating the model with the web application, you can now upload photos to see how good the app is. The photo below shows how a successful categorization is displayed.

#### Result for a picture with a mask
![with mask](/engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/withmask.png)

#### Result for a picture without a mask 
![without mask](/engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/withoutmask.png)

### Conclusion
In this tutorial you learned how to train a model, a web application compatible with a machine learning model, and integrate the model into web applications. Having learned this, developers can build any machine learning-enabled web application. 

Furthermore, the flexibility and easy usability with Nyckel will greatly help grow Artificial Intelligence technology. I hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Miller Juma](/engineering-education/content/authors/miller-juma/)
