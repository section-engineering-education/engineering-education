#### Improving User Experience With Code Splitting and Content Delivery Networks

#### Introduction

Websites are an excellent source of information nowadays. Every website is evaluated based on its user appeal and overall performance. Website speed and User Experience (UX) have improved due to developers knowing how to use Content Delivery Networks (CDN) and code splitting strategies. But, how can the above strategies be used to improve page loading?

This article expounds on the art of code splitting and how to use Sirv, a CDN service, to boost page performance and improve UX for your next creation.

#### What You Will Learn

1. Code splitting in React
2. How to use Sirv, an image optimization, processing, and hosting service.
3. How to refactor your code to increase performance.

#### 1. Code Splitting

As websites become larger by including more third-party libraries, they become bulky. This impacts their performance. Statistical data from Google Analytics shows users abandon websites that take longer than five seconds to load.

Code splitting involves dividing code into smaller bundles or components that load in parallel or when needed. The technique limits the website from downloading enormous files that are not crucial to the basic functioning of a website. The enormous files lazy load after the web app is interactive, improving web page performance and user experience.

You can implement code splitting using bundlers like Webpack and Browserify. The bundlers create several smaller bundles of files that dynamically load at runtime or request. This eliminates code that users might never need and reduces the amount of code loaded initially.

#### Implementing Code Splitting in React

#### a. Using the Dynamic Import() Syntax

It is one of the popular methods of implementing code-splitting. It is done through the dynamic import() syntax.

For instance, the below code shows an example of a funcFunc method that executes when a form is submitted.

```js
import module_one from "certain_library";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  funcFunc();
});
const funcFunc = () => {
  // utilizes module_one
};
```
In this code, funcFunc uses a module imported from a specified library. If this module is not being utilized elsewhere, the code is restructured to use a dynamic import to get it only when the form is submitted by a user.

The code will look like this:

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  import("certain_library.module_one")
    .then((module) => module.default) // using the default export
    .then(funcFunc())
    .catch(handleError());
});
const funcFunc = () => {
  // uses module_one
};
```

The code inside the module `module_one` is not included in the initial bundle of code. Instead, the code lazy-loads only when a user submits a form.

#### b. React.lazy and Suspense

Another way of implementing code-splitting is using React. lazy together with Suspense. React. lazy is used to lazy load bundles of imports in many contexts. The React.lazy function allows you to dynamically import and render that dependency or module as a regular component in a single line of code.
The lazy component is parsed inside a suspense component that reflects fallback content when the lazy component is loading.
Before React.lazy is implemented in code:

```js
import someComponent from "./someComponent";
```

The code after React.lazy’s dynamic import is implemented:

```js
const Component = React.lazy(() => import("./someComponent"));
```

The Bundle will load on its own.

The JS code when it is implemented:

```js
import React, { Suspense } from 'react';
const someComponent = React.lazy(() => import('./someComponent'));
function funcComponent() {
return (<div>
<Suspense fallback={<div>please wait...</div>}>
</div>);
}
```

The fallback prop receives React elements that are parsed while waiting for the `someComponent` to load. You can place the suspense component anywhere above the lazy component.additionally, you can choose to wrap many lazy components with a single suspense component.

Example in JS code:

```js
import React, { Suspense } from 'react';
const someComponentOne = React.lazy(() => import('./someComponentOne'));

const someComponent_two = React.lazy(() => import('./someComponent_two'));
function funcComponent() {

return (<div><Suspense fallback={<div>please wait...</div>}></div>);
}
```

#### Route Based Code Splitting

This approach is cumbersome to execute since the bundles are split evenly, which improves the UX.
Example:

```js
import Suspense from 'react';
import React from 'react';
import lazy from 'react';
import {Route, Switch, BrowserRouter}
from 'react-router-dom';
const firstPage = lazy(() =>import('./routes/firstPage'));
const secondPage = lazy(() =>import('./routes/secondPage'));
const App = () =>(<Suspense fallback={<div>please wait...</div>}>
);
```

#### 2. CDNs (Sirv)
Sirv is an example of a CDN that comes with e-commerce benefits. The company is an image hosting platform that carries out functions that optimize and deliver images fast. This accelerates website performance and provides rich features for e-commerce purposes. Examples of these eCommerce needs include responsive imaging, 360-degree spin used in advertisements, and deep image zooming.
> A CDN is a network of servers that cache content from a host server in different points of the world. This brings the content close to where clients are accessing the internet hence improving webpage performance.

#### How To Use Sirv

File Transfer Protocol (FTP) is a popular method of uploading huge images to Sirv. There are a lot of FTP programs available in the market. However, FileZilla is the most popular.

#### How to Use FileZilla

Begin by signing up for an account on FileZilla. Then, follow the following instructions to upload your photos with FileZilla.

1. Download and install FileZilla from their official website.
2. Open FileZilla and go to `File`, then navigate to `site manager.`
3. Click on `New Site` and rename the site as you wish.

![1](/engineering-education/improving-user-experience-with-code-splitting-and-content-delivery-networks/1.png)

4. Click on the `General` tab to open and enter your Sirv FTP details as provided on your Sirv account page.
![2](/engineering-education/improving-user-experience-with-code-splitting-and-content-delivery-networks/2.png)
5. Click `Connect.`
6. After FileZilla connects to your Sirv account, your directory listing will appear in the right-hand panel.
![3](/engineering-education/improving-user-experience-with-code-splitting-and-content-delivery-networks/3.png)
7. In the left-hand pane, your local files are displayed. Browse through to find and select the images or folders you wish to upload.
8. In the right-hand pane, open the folder on your listings where you wish to upload your images to. You can drag and drop your image(s) from the left-hand to the right-hand pane to upload images. You can also achieve this by simply double-clicking on the file you wish to upload, and it will transfer to the open remote folder. 

![4](/engineering-education/improving-user-experience-with-code-splitting-and-content-delivery-networks/4.png)

You can also right-click and click on `Upload.`

![5](/engineering-education/improving-user-experience-with-code-splitting-and-content-delivery-networks/3.png)

9. To create a new folder, right-click anywhere in the remote server pane and click on `Create directory` then assign your folder a new name.

![6](/engineering-education/improving-user-experience-with-code-splitting-and-content-delivery-networks/6.png)

10. You can now close the program. If you prefer to disconnect from your Sirv account, click on `Server` and select `Disconnect.`

![7](/engineering-education/improving-user-experience-with-code-splitting-and-content-delivery-networks/8.png)

#### Fetching Images Automatically

Sirv can automatically transfer images from your server by HTTPS or by HTTP. This means that when an image is requested by your account, or missing, Sirv will attempt to fetch it from your server. After fetching, Sirv saves the original image in your account.

> This article will concentrate on HTTP/HTTPS fetching.

#### HTTP/HTTPS Fetching

Sirv can request and get images from a specified folder on your server by HTTPS or HTTP. For instance, if a file is in a folder: `https://your-domainname.com/all-images/` and you want to serve the file:`https://your-domain.com/my-images/some-folder/the-image.jpg,`from Sirv, you can request the image as follows: `https://your-account.sirv.com/some-image-folder/the-image.jpg.` If it is not stored in your Sirv account, Sirv will transfer it from your server, optimize and then serve it.

The process of transferring data from another server (Fetching) has little latency. The transfer process occurs in under a second, depending on the response speed of your server and the pricing plan you have on your Sirv account.

#### Refactoring Code for Performance.

Refactoring involves restructuring code into an efficient and simplified form. Refactoring enhances the internal code structure without messing with its external functionality. It is an iterative process that simplifies your website’s code and speeds up download and execution speed.
One of the most basic ways of refactoring code is by replacing an assignment with an initialization.
Assignment:

```js
function do_sth() {
  var first_number;
  // ...
  first_number = 5;
}
```

Do this:

```js
function do_sth() {
  var first_number = 5;
  // ...
}
```

(add other ways of refactoring code)

#### Conclusion

Code splitting is one of the best ways to optimize your website’s performance. CDNs are a great way to increase performance. Although, the size of media files on your website might not be so heavy. Finally, refactoring helps your code load faster by eliminating code that would make the website slow.

I hope you enjoyed the article. Leave a comment below on how I can improve other future articles, happy coding!
