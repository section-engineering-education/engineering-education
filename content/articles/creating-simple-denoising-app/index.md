---
layout: engineering-education
status: publish
published: true
url: /creating-simple-denoising-app/
title: Creating a Simple Denoising App
description: This tutorial will look at how we can use an app designer to create a simple app. We will use their methods to create an App to denoise input 2-D signals and view the outputs.
author: florence-akinyi
date: 2022-07-27T00:00:00-03:41
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/creating-simple-denoising-app/hero.jpg
    alt: Creating Responsive Layouts with Material UI and Next.js
---
Signal denoising is the process of removing the available noise in a signal. Signal denoising application is widely used in various fields. Using an app designer, we can create an app that does this. 
<!--more-->

An app designer is a development environment with an interactive user interface for the layout design and programming of the behavior of apps. In addition, it has a layout grid manager. It allows you to organize your components. It also has automatic reflow options that detect and make changes to your application depending on the screen size.

### Introduction
This tutorial will look at how we can use an app designer to create a simple app. First, we will look at the various components used by the in-app designer and how to write their callback function. Now we will use their methods to create an App to denoise input 2-D signals and view the outputs.

### Prerequisites
To fully understand and follow along with this tutorial, the reader will require:
- [MATLAB](https://www.mathworks.com/products/get-matlab.html?s_tid=gn_getml) installed.
- Proper understanding of [MATLAB basics](/engineering-education/getting-started-with-Matlab/).

### Understanding app designer environment
App designer is a readily available toolbox in Matlab. You can create interactive Apps using this toolbox. To access the App Designer in Matlab, you can execute the command below in the command window:

```Matlab
app designer
```

This command opens the interface that you will use in the design of your app. The interface is as shown below:

![App designer interface](/engineering-education/creating-simple-denoising-app/App-Interface.png)

The interface is divided into sections. These sections are as shown in the image above. 

Let us look at every one of them.

**1. Component library** - This is where all the components are stored. From this library, we drag all the components necessary for our application. Then, you select the component and drag it to the design view to add components.

**2. Views** - The app designer has two views: the design view and the code view. We use the design view to layout our components to create an interactive user interface. The code view is used when writing the `callback function` for the components. A `callback function` is a program that forms the behaviour of your application.

**3. Components browser** - In this section, you can search for the components added to your layout.

**4. Component properties** - In this section, you modify the properties of the components. This could include changing the text, background color, font size, etc. All the modifications for the components are done here. 

The properties are as shown in the image below:

![Component properties](/engineering-education/creating-simple-denoising-app/Components.png)

**5. Canvas**- In this section, you create the various components' alignment, grouping, etc. Then, when you select the designer sections, it provides you with the app details and shares your apps.

### How to create a denoising application
We want to create a denoising App. This app will allow you to select your input image from your PC. Then, this image is displayed, and to this image, noise is added, and now this image is denoised.

The design of the image should be as shown below:

![Our design](/engineering-education/creating-simple-denoising-app/Design.png)

This App has three axes and three buttons. The first axes display the selected image, the second axes displays the image with the added noise and the third displays the filtered image.

When we click on the `add image` button, it opens the dialog that allows us to select the input image. Next, the `add noise` button is used to add a button to the input image, and the third image performs a denoising process.

### Steps of creating the application

#### Step 1: Add the axes
We will add three axes. It is done by selecting the axes in the component library and dragging them to the design view. All the components we add to the design view are visible in the component browser.

We will perform a modification of our axes. These modification includes changing the title and the axes. Change the title of the first axes to `original image`, the second axes to `noisy image` and the third to `image after removing noise`. We can modify the text style, the font and the text size depending on our design. For now, we will leave the default values.

Since we are dealing with the images here, we do not need the `X` and `Y` labels. So we will delete them. 

The output should be as shown below:

![Added axes](/engineering-education/creating-simple-denoising-app/Axes.png)

#### Step 2: Add the buttons
At this point, we will add three buttons. The buttons that input the image, the second adds noise to the input image, and the third removes the added noise.

Let us drag and drop our buttons to the button view just as we did for the axes.
Modify the texts of the buttons. Below the edition section, we can choose the text alignment of the buttons we want. We will also leave those values at the default. This includes the text alignment, which by default is the center.

The final output after adding the buttons should look as shown below:

![The design](/engineering-education/creating-simple-denoising-app/Output-design.png)

Above is the design that we wanted. Once this is done, Matlab automatically generates the code for our layout. To see this code, we select the `code view` option. 

This section is as shown below:

![Code view](/engineering-education/creating-simple-denoising-app/AutoGenerated-code.png)

Now for the functionality of our application, we will add the callback functions.

#### Step 3: Add the callback function
It forms the most important part of the application. To add the callback function for our buttons, we will select the button and right-click. 

This opens selections as seen below:

![Adding callback function](/engineering-education/creating-simple-denoising-app/Callback-function.png)

We then select the `Add ButtonPushedFcn callback`. It creates a function that will determine the action of our button.

We will begin by adding the callback function for the `add image` button. The callback function will be as shown below:

```Matlab
% Button pushed function: TakeanImageButton
 function TakeanImageButtonPushed(app, event)
            
            global a
            [filename, pathname] = uigetfile('*.*', 'Select your input image');
            filename1 = strcat(pathname, filename);
            a = imread(filename1);
            imshow(a, 'Parent', app.UIAxes);
```
The `uigetfile()` function opens the dialog that allows you to select your input image. This function gives the `filename` and the `pathname` as the input arguments. This `Strcat` concatenates the arguments.

The `imread()` function reads the input image and stores it in the `a` variable. We then show the input using the ` imshow()` function. This function uses the read values of the image.

Since we require that this output be displayed on the first axes, we will define this. Set the first access to `parent` to define where to display the image. 

Also, since we need these read values of the image for display in the second axes, we will make it `global`. It means that it is accessible to other functions.
Now we will add the callback function for the `add noise` button. We will add the callback function. 

The callback function for it is as shown below:
```matlab
 % Button pushed function: AddNoiseButton
        function AddNoiseButtonPushed(app, event)
            global a
            J = imnoise(a, 'Salt & pepper', 0.4);
            imshow(J, 'Parent', app.UIAxes2)
        end
```
We use the `imnoise()` function to add noise to the input image. In this case, we add `salt & pepper` noise. The density of the noise is defined as 0.4. We then display the output using the `imshow()` function and specify where to display this image. It should be displayed on the second axes `app.UIAxes2`, which we set as the parent.

We will also make `a` the global variable here.

Finally, we add the callback function for the `image after noise removal` button. This button removes the noise from the denoised image. 

The callback function is as shown below:
```matlab
 % Button pushed function: ImageAfterNoiseRemovalButton
        function ImageAfterNoiseRemovalButtonPushed(app, event)
            global a
            p = medfilt3(a, [5, 5, 3]);
            imshow(p, 'Parent', app.UIAxes3);
        end
```
Here, we use the median filter to remove the noise. The median filter is applied using the `medfilt3()` function. The `medfilt3` performs a median filter of a 3-D matrix, in this case, `a`.

We then show the output using the `imshow()` function and set the parent to the third axes `app.UIAxes3`.

At this point, our application is now ready to function. We will save it and then run the program. 

When we run the program, the output should be as shown below:

![The designed layout](/engineering-education/creating-simple-denoising-app/Final-design.png)

Let us test the functionality of our App by clicking on the buttons.
When we click on the buttons, we should have the output shown below:

![Final application](/engineering-education/creating-simple-denoising-app/Application.png)

It means that our App works as required.

This shows how simple it is to create Apps using app designer in Matlab. 

### Conclusion
Using the App designer, we can create, share and even deploy our applications. This makes it a very important tool in the creation of applications. One advantage of this toolbox is that it is easy to use when designing the user interface. Furthermore, if you understand the program behind the various components, it is also easier to write the corresponding callback function.

Happy coding!
