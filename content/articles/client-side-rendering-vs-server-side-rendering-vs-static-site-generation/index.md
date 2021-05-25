---
layout: engineering-education
status: publish
published: true
url: /client-side-rendering-vs-server-side-rendering-vs-static-site-generation/
title: Client Side Rendering vs. Server Side Rendering vs. Static Site Generation
description: This article will go through the three approaches of rendering websites, their technical terms, pros and cons and when to choose one. The three approaches include Client Side Rendering (CSR), Server Side Rendering (SSR) and Static Site Generation (Pre-rendering).
author: moses-m
date: 2021-05-02T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/client-side-rendering-vs-server-side-rendering-vs-static-site-generation/hero.jpg
   alt: Website rendering example image
---

Today, websites are much like applications. You can send messages, transact, shop, and much more. In short, more interaction is needed on the users end. Hence server-side rendering can longer handle all this at once. It is taking a backseat and giving way to many advanced rendering technologies. 
<!--more-->
In the past history of development, websites were just basic information with less or no on-page interactions. They were static web pages with no dynamic elements. HTML, CSS, and JavaScript are the standard ways to style, script, and display a page on a browser. To display these HTML elements on the screen, you had to prepare an HTML document and send it in on the server-side.

When a user requested a page, the server would convert the HTML elements to meaningful information on the user's screen. Websites were pretty much static. Server-side rendering was the only approach to load a `.html` page. This approach worked great at the time as most pages displayed plain text and images.

Fast-forward to today, this is no longer the case, and websites have advanced. Corporates want to get the dynamic content and display it right. They want websites that load fast and smooth, with flawless performance, to have a good user experience, and get search engine optimization right on search ranking results. As websites are the sales lead for most companies.

These new advanced rendering technologies include Client-Side Rendering (CSR), Server-Side Rendering (SSR), and Static-Site Generation (Pre-rendering). Developers often find themselves confused about these terms. If you find yourself in this circle, this tutorial is for you. We'll discuss these technical terms, explore their pros and cons, and when to consider approach A or B.

### Client-Side Rendering (CSR)
Client-Side rendering became popular after the introduction of JavaScript frameworks, which incorporated this style of development. These frameworks include [Angular](https://www.youtube.com/watch?v=xGpHfFf18Ns), [React](https://www.youtube.com/watch?v=w7ejDZ8SWv8), [Vue.js](https://www.youtube.com/watch?v=qZXt1Aom3Cs), etc.

In a client-Side Rendered web application, JavaScript controls what is displayed on the page. Typically, instead of loading all the web content using the HTML documents, a JavaScript file is included to handle the dynamic architecture of the website loading.

This is what happens when the website is rendered on the client-side.

- A user sends a request to access the web content on a browser using the website address (link).
- The server serves up the static files (CSS and HTML) to the client's browser on the client's first request for the website.
- The client browser will download the HTML content first and then JavaScript. These HTML files link the JavaScript. This loading process happens as the user sees the loading symbols defined by the web developer. The site is not yet visible to the user.
- After the browser downloads the JavaScript, content is dynamically generated on the client's browser.
- The web content becomes visible as the client navigates and interacts with the website.

This process means that the initial load is prolonged. After initial load time, the website's navigation will be super smooth and super fast, only having to make API calls to get the content dynamically.

The initial load is naturally slow since the browser is trying to load the initial run-time data of the website to the client's browser.

After this is over, the web will load dynamically. The JavaScript framework controls the website navigation using a {Content Delivery Network}(/cdn-edge-compute-platform/) to process DOM in the client's browser.

The process involves fetching and processing data on the client-side (browser) and not the web server, hence the name "client-side rendering".

A great use case of Client-Side Rendering is a single-page application (SPA). In a SPA, each page is rendered on the client browser. The server only serves one single HTML document. 

Once the HTML is loaded, the JavaScript frameworks such as [React](https://www.youtube.com/watch?v=w7ejDZ8SWv8) will control the website's DOM structure on the browser. In this case, each page will load from the data history as fetched by the framework's API. Once the initial load is over, accessing a different route or reloading the page will be super fast.

The JavaScript frameworks that supports client-side rendering development style includes [React](https://www.youtube.com/watch?v=w7ejDZ8SWv8), [Angular](https://www.youtube.com/watch?v=xGpHfFf18Ns), and [Vue.js](https://www.youtube.com/watch?v=qZXt1Aom3Cs).

Let's take a simple example of CSR using Vue.js.

There are two main files here, the HTML mark-ups and the JavaScript file.

In most cases, content is wrapped inside containers `divs` with root `ids` to control states and data for the application.

Here is an example.

**index.html**

```html
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Learning Vue</title>
		<script src="https://unpkg.com/vue@3.0.0"></script>
	</head>
	<body>
		<div id="app">
			<p>{{ title }} - by {{ author }}, {{ age }} years old</p>

			<button v-on:click="age++">Increase age</button>
			<button @click="age--">Decrease age</button>
			<div @click="changeTitle('Oathbringer')">Change book title</div>
		</div>
		<script src="app.js"></script>
	</body>
</html>
```

When you serve this file to a client browser, the web page is normally a blank bare-bones HTML document. It normally contains virtually no visible content.

In this case, Vue.js will take full control of this page. That is, the content is rendered using JavaScript.

Let's go ahead and include that in the `app.js`.

```js
const app = Vue.createApp({
	data() {
		return {
			title: "The Way of Kings",
			author: "Brandon Sanderson",
			age: 45,
		};
	},
	methods: {
		changeTitle(title) {
			// this.title = 'Words of Radiance'
			this.title = title;
		},
	},
});
app.mount("#app");
```

Refresh the page. The website content is now visible. Vue.js renders the different components that are needed for that page.

If you click the `OnClick` handlers, the linking and routing between different views and components are rendered in the browser instead of the server. JavaScript intercepts these requests. It doesn't go to the server. Instead, Vue.js handles this in the browser. The website feels faster and smoother.

### Server-Side Rendering (SSR)
SSR is one of the commonly used rendering solutions. It is pretty much the opposite of the client-side rendering.

With the SSR solution, rendering is conducted by the server. The user makes a request to the server; the server processes the HTML, CSS, and JavaScript on-demand and delivers a fully populated page to the user's browser.

Unlike Client-Side Rendering, every subsequent time the user takes action to visit a different page, the rendering process repeats. The server will serve the page on demand every single time. The browser is constantly making requests to the server for every new page, and each request.

The downside of SSR is that it is resource-intensive and delays the content delivery to the user. It increases the page load time compared to single-paged apps. This is because the server has to render the dynamic content repeatedly. Whereas, on the CSR, the content is static and is displayed almost instant on page reload.

When your site is experiencing an influx of users, it might result in connection errors. This happens when too many users are trying to access the resources, and your backend server does not have enough computing power to process all of those requests.

In this approach, everything sent to the browser comes from a server. The server handles getting the web content and processing and displaying it on the browser. Every processing is done on the server every single time a request comes in, hence the name Server-Side Rendering.

Take a look at this example. Assume you have an imaginary server with an HTTP address `test.com`, and you are hosting the following `index.html` document as the main page.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<title>My Home page</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <a href="blog.html">Go to blog page</a>
    <h1>My new website</h1>
    <p>This is the Home page</p>
</html>
```

When you open the address `test.com`, the browser will make a request to the server. The server returns a response to the browser with the requested content. In this case, a link, a title, and a paragraph.

Assume you now want to click the link on this rendered home page and load the `blog.html` mark-up as shown below.

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Blog Page</title>
    <meta name="description" content="My awesome blog">
    <meta name="keywords" content="design blog, web blog">
</head>
<body>
    <a href="index.html">Go to Home page</a>
    <h3>Blog Post One</h3>
    <small>Posted by Section on April 5 2021</small>
    <p></p>
</head>
<body>
</html>
```

When you click the link to access the `blog.html`, the entire page will be rendered fresh with the new content.

If you then click on `Go to Home page`. The browser will hit the internet and make a request to the server. The server will render the `index.html` file fresh, even though this page was previously rendered. You get the point? Every page is independent and is rendered independently.

### Static-Site Generation (SSG)
Basically, a Static-Site Generator is a program or a tool used to generate static HTML websites and pages based on raw data and templates. Static-Site Generator automates the process of having to code HTML pages manually.

These generators pre-build HTML pages and make them available to the user ahead of time. This means that whenever a user requests a page, it loads with no delay. This happens so fast as the site is static and the generator renders the pages at build time.

A close relative of Static-Site Generators is content management systems (CMS) such as WordPress. A content management tool is used to generate and manage web content and web pages. They both use the concept of templates to avoid writing, formatting, and coding the web pages manually.

In a CMS case, content is stored in the CMS databases, and when the user requests the page, the server queries this content from this database, fills it in a template that fits this web content, generates the requested page, and serves it to the user on the browser.

On the other hand, Static-Site Generation uses the same concept on templates to automatically generate the pages. However, unlike CMS, the content is static, and templates load ahead of time. The pages are instantly ready to be displayed on the user's browser. 

This means that the server makes no API calls to renders any HTML documents. The pages are rendered during the build-up phase. All of your pages are going to load super quickly because they're already pre-cached, pre-generated, and pre-rendered.

Common platforms that offer static site hosting services include [Section](/modules/nodejs-edge-hosting/), [GitHub](https://pages.github.com/), and [Netlify](https://www.netlify.com/). You don't need a database of your own. Thus, this makes it incredibly easier to use such hosting services and run statically generated pages with automated builds.

Some of the popular Static-Site Generator tools include [Next.js](https://nextjs.org/), [Gatsby](/how-to-build-astatic-site-with-gatsbyjs/), [Jekyll](/build-a-jekyll-site/), and [Hugo](/documentation-website-hugo/), etc.

One of the Static-Site Generator tools I would recommend checking out is Next.js. Next.js gives you the benefits of static site generation with server-side rendering flexibility. [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching) provides the benefits of Static Site Generation (SSG) and Server Side Rendering (SSR). 

The feature allows you to update static content after you have already built your site. Meaning your users get a blazing fast experience with the latest data. Check out this [tutorial](https://www.youtube.com/watch?v=IkOVe40Sy0U) and learn how to use Next.js. 

Try out other generators as well.

### Cheatsheet
#### Client-Side Rendering

#### Pros:
They are fast. Although the site's first load might be slow, once rendered, other requested pages served instantaneously.

#### Cons:
They have prolonged initial load time. This increases the likelihood of poor user experience, and users can leave your site when they get frustrated waiting for the CSR to fully render the website.

Search engine optimization takes a hit. One of the biggest downsides of CSR is that it affects search engine robots. CSR uses JavaScript. This slows down search engine robots as they crawl on a website. Search engine robots crawl and index an HTML file page first. 

This means that JavaScript content might be missed and not included during indexing, resulting in partial indexing and affecting the SEO. When the page is fully loaded, the site only loads one initial HTML mark-up. You will only have one meta tag for all pages.

#### When to use CSR
This approach fits well when you have a large number of users accessing your web content. The content is rendered once upon every user request.

This goes hand in hand if your application has a complex UI and a lot of dynamic content that doesn't necessarily depend on SEO.

CSR is a good choice for hybrid web applications. A single-page app use-case will be if you want to create a website that will feel more like a mobile app. For example, Twitter, where you don't have page refresh when you switch pages, you also have spinners when the data is loading, etc.

#### Server-Side Rendering

#### Pros:
It is the best when it comes to search engine optimization. Every page is rendered on the website's server independently. Take a look at a blog website. Each blog post is an independent page and is fetched independently from the server. Thus you can insert meta tags based on the page's content.

SSR allows page content to be focused and relevant to the social crawlers. Google and other search engine robots will thus be able to take account of your web page's performance to enhance your web content ranking.

#### Cons:
With SSR, the page reloads, and visiting a new page has to hit a server request again. This comes with the burden of high memory usage and high processing power on the server. It consumes unnecessary internet bandwidth and will obviously increase the hosting cost.

#### When to use SSR
Every web page content is served independently. This would be a great chance to catch up with the social Crawlers to target a high SEO ranking.

It has an overall slow rendering speed, thus it fits well when you have fewer users, a simple UI, few pages, less dynamic data, and less interactivity.

#### Static-Site Generation

#### Pros:
They are ultra-fast. All of the content of your website is generated as HTML files ahead of time. When a user comes to your application and requests a home page or whatever page they request, the server will quickly respond and load it. It doesn't have to do any processing. It doesn't have to generate any HTML; it just serves it.

They are more secure when compared to dynamic websites. When you build a static site, you are giving the user accessing the website everything you have. There are no backend to hack or databases or text boxes to inject malicious code into. 

A static website is plain and simple, just a collection of HTML files hosted on a server. Compared to other content management systems such as WordPress, where content is hosted on databases on the backend, which can be hacked, and malicious activity can be injected into your website.

They are straightforward to host. They have nothing to configure and no environments to set up. It is just as easy as uploading a couple of HTML files into a web server.

Hosting a static website is very cheap. They are not many resources to serve up a static website, hence the low bandwidth and memory usage, thus cutting the cost of hosting services. Hosting a web static can even be free. You can take all your static files and put them in hosting services such as [Section](https://www.section.io/modules/nodejs-edge-hosting/) or the [GitHub pages](https://pages.github.com/).

You can host your website anywhere. You can host it on an s3 bucket or any cloud CDN, making your application easier to scale globally and serves data very quickly.

#### Cons:
The data served may be stale and old. The only way to update it is to build the application again, which can take some time. You still have to deploy the content to the CDN/server to see the updates. If your application needs to update, you'll have to re-kick the build process off. 

This can be mitigated by employing the concept of Incremental Static Regeneration (ISR), supported by Next.js. This way, you can get the latest data without having to rebuild your application fully.

#### When to use SSG
SSG fits well when you have a lot of static content; it is fast and improves loading time for static HTML files.

It is considered a good choice for SEO-ranked content.

### Conclusion
This guide has explained the three main rendering approaches. Every approach is perfect and scalable. A lot depends on the kind of application you want to build (UI, features, and number of web pages), the content to display (dynamic or static), and what you want to achieve (SEO and loading time).

I hope you found the blog helpful in understanding and deciding which approach best fits your web content.

Happy learning!

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
