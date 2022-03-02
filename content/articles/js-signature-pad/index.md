### Introduction

Hand signatures are a good way to authenticate official documents. But what about if the parties involved are far from each other? We have to think of a way to enable them to sign the documents. Good for us, we can do that in our web applications without much effort using an open-source JavaScript library called Signature Pad. We will build a simple invoice with an embedded section where one’s signature will appear after signing. Later on, we will convert the webpage to a PDF document using another open-source library called jsPDF. This will be our final output.

![Generated pdf](/engineering-education/js-signature-pad/generated.png)

### Prerequisites

1. An understanding of HTML and CSS.
2. Knowledge of JavaScript and Document Object Manipulation(DOM) Manipulation.

### Goals 
We will learn about:
- Creating a signature feature for a web app.
- Generating PDFs using the jsPDF library.
- Converting the signature generated to an image.

### An overview of the two libraries

Let’s have a quick walk-through of the [Signature Pad](https://github.com/szimek/signature_pad) and [jsPDF](http://raw.githack.com/MrRio/jsPDF/master/docs/index.html) libraries.

#### Signature Pad

It allows us to draw smooth curves on a canvas element. This capability makes it suitable to create a signing pad for the end-users. This explains its name. Signature Pad provides features such as undoing, clearing, changing the curve colors, converting the signatures to different image formats- _.png_, _.jpeg_, and SVG graphics, etc. For our article, we will convert the signatures fed into _.png_ images. It is very easy to use as we will witness.

#### jsPDF

This one is for generating a PDF document from a web page. It provides options such as setting the font type, font size, line width, text color, etc. However, we won't go deep into its uses. We will simply generate a PDF using it. I will leave the other functionalities for you to carry your research on them through the links at the end.

With that, let’s first design a layout of our page.

### The page layout

We will use Bootstrap for styling which doesn’t matter since you can use your styling and completely different design. The main bootstrap styling classes we will use are:

1. `col-md-*` grid partitioning for a page- This system breaks a page into 12 columns. For example, if you want a certain element to cover a third of the page width, you use the `col-md-4` class.
2. `d-flex`- This allows us to make an element conform to the CSS’s flexbox properties where we will use `justify-content-*` positioning to arrange items on a page. If we want the elements of a `div` to be in the center, we will use the `d-flex justify-content-center` class.

Let's briefly look at the components.

The `<head>` sets the cjharacter code to UTF-8, the title of the page, and the link to Bootstrap's styling.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title>Signature pad HTML2PDF</title>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
      integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      crossorigin="anonymous"
    />
  </head>
  ```

We head on to the `<body>` section where we have several `<div>` elementsin which we will only look at the important ones.

> We have the `onselectstart` attribute set to return false to allow us to only make selections on our `canvas`, which we are going to talk about.

The second `<div>` contains the table and the image where the signature will appear.

```html
          <div id="toPrint" class="col-md-12">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Toothbrush</td>
                  <td>KES. 180</td>
                  <td>3</td>
                  <td>KES. 540</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Toothpaste</td>
                  <td>KES. 560</td>
                  <td>1</td>
                  <td>KES. 560</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Cookies</td>
                  <td>KES. 120</td>
                  <td>2</td>
                  <td>KES. 240</td>
                </tr>
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <th class="text-danger">GRAND TOTAL</th>
                  <td>KES. 1340</td>
                </tr>
              </tbody>
            </table>
            <div class="col-md-12 d-flex justify-content-end">
              <div class="col-md-3 d-flex justify-content-center">
                <span class=" mb-4">Your Signature</span>
              </div>
            </div>
            <div class="col-md-12 d-flex justify-content-end">
              <div class="col-md-3 d-flex justify-content-center">
                <img
                  id="signature"
                  style="border: 1px solid black;"
                  width="250px"
                  height="100px"
                />
              </div>
            </div>
          </div>
```

The next one is the one containing the canvas element where we will write our signature.

```html
          <div class="col-md-12 d-flex justify-content-center ">
            <span class="col-md-3 mb-4">Sign here</span>
          </div>
          <div class="col-md-12 d-flex justify-content-center ">
            <canvas
              id="canvas"
              height="500"
              width="800"
              style="border: 1px solid black"
            ></canvas>
          </div>
```
The last one contains the four action buttons. The buttons will perform the signature processing(**Save**), clearing the signature(**Clear**), undoing(**Undo**), and generating the PDF document(**Get PDF**) when clicked.

```html
          <div class="col-md-12 d-flex justify-content-around ">
            <button
              type="button"
              style="margin-top: 2%; margin-bottom: 3%"
              class="btn btn-dark"
              data-action="action-save"
            >
              Save
            </button>
            <button
              type="button"
              style="margin-top: 2%; margin-bottom: 3%"
              class="btn btn-dark"
              data-action="action-undo"
            >
              Undo
            </button>
            <button
              type="button"
              style="margin-top: 2%; margin-bottom: 3%"
              class="btn btn-dark"
              data-action="action-clear"
            >
              Clear
            </button>
            <button
              type="button"
              style="margin-top: 2%; margin-bottom: 3%"
              class="btn btn-dark"
              data-action="action-pdf"
            >
              Get PDF
            </button>
          </div>
```



[Here](https://github.com/munubi254/js-signature-pad/blob/main/signature.html) is the link to the complete snippet.

> Note the script and styling tags where we reference the JavaScript and Bootstrap styling files.

In the next section, we will look at how we perform the actions after the button clicks using JavaScript.

### The JavaScript Code

> You can create a file and name it _sign-handler.js_ or any other name as long as you update the HTML code script referencing.

We will start by initializing variables for accessing the DOM elements.

```javascript
var canvas = document.getElementById("canvas");
var saveSignBtn = document.querySelector("[data-action=action-save]");
var undoBtn = document.querySelector("[data-action=action-undo]");
var clearBtn = document.querySelector("[data-action=action-clear]");
var createPDFBtn = document.querySelector("[data-action=action-pdf]");
```

Next, we initialize our `SignaturePad` class while passing in a white background color styling in the constructor. We will also be using the 2D context for the canvas.

```javascript
var ourPad = new SignaturePad(canvas, {
  backgroundColor: "rgb(255, 255, 255)",
});

canvas.getContext("2d");
```

After that, we create a function for creating a blob. We use the blob to get an image path, which will be set to the image's `src`path. More about the canvas' `toBlob()` function is found in the [official MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob).

```javascript
function processImage() {
  //creating a blob and displaying the image in the image element
  canvas.toBlob(function (blob) {
    var targetImg = document.querySelector("img"),
      url = URL.createObjectURL(blob);
    targetImg.src = url;
  });
}
```

The next three functions are straightforward. They are for adding click event listeners to the three buttons- `saveSignBtn`, `clearBtn`, and `undoBtn`. For the `undo` button, we delete the last dot or curve drawn to the canvas using the `pop()` function and then update the canvas using the `fromData()` method.

```javascript
saveSignBtn.addEventListener("click", function (event) {
  if (ourPad.isEmpty()) {
    alert("Please sign first.");
  } else {
    processImage();
  }
});

//clearing the signature drawing
clearBtn.addEventListener("click", function (event) {
  if (ourPad.isEmpty()) {
    alert("Please sign first.");
  } else {
    ourPad.clear();
  }
});

undoBtn.addEventListener("click", function (event) {
  var signMark = ourPad.toData();
  if (ourPad.isEmpty()) {
    alert("Please sign first.");
  } else {
    if (signMark) {
      signMark.pop(); // deletinging the last marked dot or drawn line
      ourPad.fromData(signMark);
    }
  }
});
```

Finally, we have the button click listener function for generating a PDF document.

```javascript
//creating a pdf using the jsPDF library
createPDFBtn.addEventListener("click", function (event) {
  window.html2canvas = html2canvas;
  window.jsPDF = window.jspdf.jsPDF;
  var doc = new jsPDF("l", "pt", "a4");

  doc.html(document.getElementById("toPrint"), {
    callback: function (doc) {
      doc.save();
    },
    x: 10,
    y: 10,
  });
});
```

We initialize the html2canvas and jsPDF library. In case you are wondering why we are initializing the html2canvas, the jsPDF library uses it for capturing the page screenshots. The jsPDF constructor is passed in the orientation(`l` for landscape), units of measurement(`pt` for points), and A4 sizing. We chose the landscape portrait for our page to fit in the PDF document. The `html()` function is called where we pass in the element to be printed and an `options` object. The object contains a `save()` callback function for saving the PDF and the X and Y positioning of the document. There are a bunch of other options which you can add to this object.

You can find the link to the full code [here](https://github.com/munubi254/js-signature-pad/blob/main/js/sign-handler.js).

### Conclusion

We had an overview of the two libraries, created a HTML layout, and looked at the JavaScript code. You can further enhance this signature feature and use it for biometric authentication. The Signature pad library is very protable in that you can use it in your React-Native apps, web frameworks such as Express, and even desktop apps.

### Further reading
There are other PDF generator libraries which you can have a look at. They include:
[Puppeteer](https://github.com/puppeteer/puppeteer)
[Electron-PDF](https://github.com/fraserxu/electron-pdf)
[ATHENA PDF](https://github.com/arachnys/athenapdf)
[TCPDF](https://tcpdf.org/)
[pdfKit](https://pdfkit.org/)

Have a good one!
