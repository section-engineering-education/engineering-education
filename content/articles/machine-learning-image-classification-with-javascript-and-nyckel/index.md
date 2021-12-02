### Machine Learning Image Classification with Javacsript and Nyckel.

### Introduction
Artificial intelligence has become the future of technology and everyone is trying to apply it in all areas. Artificially intelligent applications are a huge contribution to AI technology with the likes of trading bots and others. Web developers too want to integrate these models into their applications.

This article shows how you can implement machine learning models in a web application to classify images. In this case, we will classify and identify the images of people that are wearing and those who are not wearing a mask.

### Table of Contents
- [Introduction](#introduction)
- [Requirements](#requirements)
- [JavaScript CSS and HTML website build](#javascript-css-and-html-website-build)
- [Building the Machine Learning model using Nyckel](#building-the-machine-learning-model-using-nyckel)
- [ML model integration with the Web Application](#ml-model-integration-with-the-web-application)
- [App live testing](#app-live-testing)
- [Conclusion](#conclusion)
### Requirements
To develop, you will need the following;
- A suitable editor like visual studio, sublime and others.
- Prior knowledge to Nyckel, css, JavaScript.
- HTML basics.
### What is Nyckel?
Nyckel is a Machine Learning API that provides automated training to models instead of manually writing the code. It also allows these models to be integrated into applications with the best simplicity.

With these requirements in place, the coding journey can kick off.
Follow each step below to develop your own machine learning-enabled web application.
### JavaScript CSS and HTML website build
We are going to build a simple web application where you can upload a photo from the desktop into the app. The layout will only need a section to place your photo and an button to make a system call to the file explorer.
#### **HTML Build-up**
Below are the steps involved in HTML build-up. Create a file with .html extension and follow the following steps.
This code is placed under the head tag creates a connection to the JavaScript file.

```html
<html>

<head>
  <script src="https://code.jquery.com/jquery-latest.min.js"></script>
</head>

```
Under the body tag is where the upload button and the upload section lies. This code creates what is required under the body section without any styling.

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
When you run the combination of the code above, you should have a web page with a button and an upload section only as shown in the photo below.

![htmlResult](/engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/htmlResult.png)

The photo above shows the results with no styling applied. Since this tutorial is not deeply involved in website styling, you can apply your own styles
and learn how to link them to the application. For more information on css styling, you can refer to this [article](https://www.section.io/engineering-education/getting-started-with-css/) for CSS beginners.. To get my styles that have been used for this particular tutorial, you can refer to my github [repository](https://github.com/del-ui/Machine-Learning-Image-Classifier-Application/blob/main/style.css) to get the full CSS code.

When you use the code from the above link, similar results as those in the photo below are obtained.
![styled](/engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/styled.png)
#### **JavaScript functions**
JavaScript helps in client-side scripting. It mostly uses functions to enabled some activities in a webpage. Example of such activities to be enabled by these functions in this page include; upload by dragging, sending AJAX request to Nyckel to run against machine learning model, ensure what is uploaded is an image, resizing large images and many more.

The following code contains such functions. Create a JavaScript file(.js) and place the code below in it. The functions have been clearly explained using comments to help you get everything right.

```JavaScript
$(function ()
{
    // preventing page from redirecting
    
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

    // Dragging over as 'dragover'
    
    $('.upload-area').on('dragover', function (d)
    {
        d.stopPropagation();
        d.preventDefault();
        $("h2").text("Drop");
    });

    // Drop
    $('.upload-area').on('drop', 
    function (d)
      {
        d.stopPropagation();
        d.preventDefault();

        $("h2").text("Checking...");

        var file = d.originalEvent.dataTransfer.files;

        showImage(file[0]);

        resizeAndUploadImage(file[0]);
    });

    // Open file selector on div click
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
    // Ensure it's an image
    if (file.type.match(/image.*/))
    {
        // Load the image
        var reader = new FileReader();
        reader.onload = function (readerEvent)
        {
            var image = new Image();
            image.onload = function (imageEvent)
            {
                // Resize the image
                var canvas = document.createElement('canvas'),
                    max_size = 600,
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
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                var resizedImage = dataURLToBlob(dataUrl);

                checkImageWithNyckel(resizedImage);
            }
            image.src = readerEvent.target.result;
        }
        reader.readAsDataURL(file);
    }
    else
    {
        alert("You must choose an image");
        resetPage();
    }
}
/* Utility function to convert a canvas to a BLOB */
var dataURLToBlob = function (dataURL)
{
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1)
    {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];

        return new Blob([raw], { type: contentType });
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i)
    {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}
/* End Utility function to convert a canvas to a BLOB      */
function displayResult(response)
{
    resetPage();
    $("#title").text(response.labelName);
}

function resetPage()
{
    $("#thinking").hide();
    $(".upload-area").show();
    $("h2").text("Drop JPG here");
}


// Sending AJAX request to Nyckel to run against ML model
function checkImageWithNyckel(image)
{
    var formdata = new FormData();
    formdata.append('file', image);

    $.ajax({
        url: 'https://www.nyckel.com/v1/functions/j3l3xdfs0fv4tec7/invoke',
        type: 'post',
        data: formdata,
        contentType: false,
        processData: false,
        dataType: 'json',
        success: function (response)
        {
            displayResult(response);

            //Show the JSON response in the console
            console.log(response);
        },
        error: function (response)
        {
            alert("Error checking image", response);
            $("#title").show();
            resetPage();
        }
    });
}
```
To link this file to the html file, you will similarly create a Javascript reference link in the html file below the css link as indicated below.

```html
<script type="text/Javascript" src="../mlApp/js/main.js"></script>

```
Now refresh your page and try clicking on the upload area. It opens the windows explorer to allow you upload a photo.
### Building the Machine Learning model Using Nyckel

In this section, we are going to train a model using Nyckel to classify images of people wearing a mask and those not wearing a mask. You will require a web association with access 'Nyckel website' for worked on preparing of the model. The steps below will produce a successfully trained model for our web application.
#### **Create a Nyckel account**
Creating an account will allow you to use Nyckel training site for your model. To sign-up, go to [nyckel.com](https://login.nyckel.com/login?state=hKFo2SBTbW16WjhGLWFjQ1A5UU5sbjZ5SmVSVG0ySmhLSVhYWaFupWxvZ2luo3RpZNkgdjd6bWtmdGRHUFRkNmpaOHNoVEdOSW0tX202QTg5clKjY2lk2SBJdnlPaktQa011YXJHMzZIb2xYb3NUU1BNVnJaT0xtOQ&client=IvyOjKPkMuarG36HolXosTSPMVrZOLm9&protocol=oauth2&redirect_uri=https%3A%2F%2Fwww.nyckel.com%2Fauthentication%2Flogin-callback&response_type=code&scope=openid%20profile%20email&code_challenge=hQvJg-KMgpHyRS8Z7JXGLBtZ1Kg31lFTdjh1Ns566Yc&code_challenge_method=S256&response_mode=query) sign-up page to set up your connection with this API.

- After signing up, select input type (image for this case) then add output categories as  `with mask` and `without mask` then hit `create function` button. 
- In the area provided, upload your photos, two with mask on and two without masks then label them correctly using the two labels. 
- Upload more photos and import while checking their categorization accuracy. The more photos used for training, the higher the accuracy of the model.

After categorizing, you will get a notification that your model is trained.
Navigate to invoke section and perform a satisfaction test on the model by upload a different photo from the ones used in training the check the output function.

Having done all that, your model is trained and ready to use.
### ML model integration with the web application
To integrate the trained model to the web application, navigate to API section and copy the url given and paste in the JavaScript code under `$ajax`. The url looks almost familiar to the one shown below ending with the word `invoke`.

Once done, your application is ready for testing with photos which were not included during training. 
### App live testing
After integrating the model with the web application, you can now upload photos to see how good the app is. The photo below shows how a successful categorization is displayed.
#### Result for a picture with a mask
![with mask](/engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/withmask.png)
#### Result for picture without a mask 
![without mask](/engineering-education/machine-learning-image-classification-with-javascript-and-nyckel/withoutmask.png)
### Conclusion
To this extent, you must have learnt how to train a model, a web application that is compatible with a machine learning model and how to integrate the model into web applications.
Having learnt this, developers can build any type of a machine learning-enable web application. The flexibility and easy usability with Nyckel will highly help in growth of Artificial Intelligence technology in the near future.

I hope you find this tutorial helpful.

---
Happy coding...
