---
layout: engineering-education
status: publish
published: true
url: /ten-uiux-mistakes-to-avoid/
title: Ten UI/UX Mistakes to Avoid
description: In this article, we will look at the ten UI/UX mistakes that lead to poor user experience. We will also discuss how to fix these mistakes.
author: wanjiru-alice
date: 2021-09-08T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/ten-uiux-mistakes-to-avoid/hero.png
   alt: Ten UI/UX Image hero
---
User experience is not only about the look and feel of the interface, but also how users interact with it. The ease of use is a big factor in the effectiveness of your product.
<!--more-->
Here are a few UI/UX mistakes that annoy users.

### 1. Images
Graphics play a major in passing information. Images that are too large will increase the software's load time. 

Developers must balance between the image size and the amount of detail that needs to be displayed.

For example, when listing users with their avatars side by side. The avatars should be small since loading large images will consume a lot of time. 

Banner images, on the other hand, should be large, because they tend to display important information.

It is also crucial to avoid low-quality images. Optimization can help in analyzing image quality and size.

Optimization reduces the image size to the minimum necessary to display it. This is done by compressing the image, reducing certain colors, and removing unnecessary information.

When dealing with many images, you should consider using services like [Cloudinary](https://cloudinary.com/) to host, cache, and optimize your images.

### 2. Placing validation warnings in the same place
Each form field should have its validation warnings just below the input. This makes it easier to find which fields are throwing the errors.

![validation warnings placement](/engineering-education/ten-uiux-mistakes-to-avoid/form-validation.png)

### 3. Showing premature validation errors
Throwing validation errors before the user has finished inputting values is annoying.

You should wait for the user to finish typing in a field before showing the validation errors. The errors should be shown only when the user clicks outside the field and not after every keystroke.

### 4. Design inconsistencies
You should use consistent styling for your components. If you decide to use a border radius of 20, stick to that all through.

![design inconsistencies](/engineering-education/ten-uiux-mistakes-to-avoid/inconsistent-design.png)

Using too many colors in your design is also a bad idea. It makes it hard to organize related components.

You can access balanced color palettes from [coolors.co](https://coolors.co)

If you have a multi-platform app, its appearance should be consistent on all platforms.

### 5. Wide paragraph
Lengthy paragraphs that span the full width of the screen are difficult to read.

Paragraphs should take a maximum of 50 to 75 characters per line. 

They should also be centered to help users concentrate on what they are reading.

![good paragraphs](/engineering-education/ten-uiux-mistakes-to-avoid/paragraphs.png)

### 6. Small clickable areas
Small clickable areas such as handles and cancel buttons are an issue, especially to mobile users.

Buttons such as cancel buttons ❎ should be large enough for the user to click easily. They should not be close to the edges. 

They should also be clickable without triggering other events, such as scroll.

### 7. Clickable vs unclickable elements
Clickable elements should look clickable.

One way of making effective clickable elements is by adding a hover state. When a pointer is hovering over the element, it should change its color or do something else to make it look clickable. 

You can add a border, border-radius, and also change the pointer to a user hovers over the element.

Since there are no pointers on mobile devices, you can use a different styling approach to make the button look clickable.

### 8. Non-responsive components
All elements in your design should be responsive on small screens. 

Consider a page where a user must scroll horizontally to read half of the paragraph. The user will have to zoom out to read the full paragraph. This makes the font size small and thus, harder to read. 

You should test your web app on multiple devices or browsers to make sure that all the elements are responsive.

### 9. Video autoplay
It's quite disturbing when one opens a web article and a video starts playing automatically at the bottom of the page.

Autoplay is one of the most annoying features of the web. It is a major concern especially for mobile devices, where users are more likely to be on a limited data connection.

If you want to add a video to your page, you should disable the autoplay functionality.

### 10. Poor search engines
Search engines are one way people find content on your site. Providing the most relevant results is quite helpful to users.

Returning relevant results might involve a lot of work, but it's beneficial. For example, you will have to manually identify all the keywords for each item, if you are working with static site generators.

Precise keywords increase the accuracy of search results.

The most relevant results should always be in the top rows or the first page of the search results.

### Conclusion
We have looked at a few mistakes that lead to a poor user experience. Some of them may not make a lot of sense to a developer, but they are an issue to the user.

To avoid these UI/UX mistakes, it's recommended that you have a team to test your product.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
