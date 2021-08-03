---
layout: engineering-education
status: publish
published: true
url: /understanding-browser-caching/
title: Understanding Browser Caching
description: In this article, we will explore the basics of browser caching in web browsing and understand how it works. We will go through the main headers used in caching and highlight some of the limitations of this phenomenon.  
author: margret-munganyinka
date: 2021-03-30T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/understanding-browser-caching/hero.jpg
    alt:  browser caching example image
---
Caching is a feature in web browsing that allows recent web pages to be stored temporally in web browsers. This feature is important because it improves the page load time and reduces browsing costs. It is a resourceful technique that can be used by developers to improve web browsing experience.
<!--more-->
This article provides an overview of browser caching and how it works. It also recommends the best practices for optimizing browser caching.

### What is browser caching?
Before understanding the meaning of the term ‘browser caching’, it is important to know the concept of caching. Caching is a process in which data is kept in a cache. A cache is simply a storage area that stores data for a short time. 

Browser caching is a process that involves the temporary storage of resources in web browsers. A visitor's web browser downloads various website resources and stores them in the local drive. These include images, HTML files, and JavaScript files. When the user visits the website subsequently, the web page will load faster and the bandwidth usage will be reduced.

### How browser caching works
The following image shows an overview of how browser caching works. 

![How Browser Caching Works](/engineering-education/understanding-browser-caching/how-browser-caching-works.png)

[Image Source: Pressidium](https://cdn.pressidium.com/wp-content/uploads/2017/05/Pressidium_blogpost_04_05_2017-05.png)

The web server collects information from the website and passes it to the web browser. Caching is done depending on whether the user is a first-time visitor or has used the site before. Let's look at these two cases to understand how caching works.

#### Case 1: A first-time user
The following image summarizes a situation where a user visits a website for the first time. 

![First Time User](/engineering-education/understanding-browser-caching/first-time-user.png)

[Image Source: Square Space](https://images.squarespace-cdn.com/content/v1/54dd763ce4b01f6b05bab7db/1500929956175-BSHCBXNKVLOYA7SQALND/ke17ZwdGBToddI8pDm48kOlFUBfJxpXVGWigDn9WvsVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpyYnEE_v2jAnY7dzuv3yZ4jMuw6HAWdrXinR21iqkdZSawaMjy-dbGOo66KiVJ5ZCo/image-asset.png?format=750w)

When you visit a website for the first time, the web browser will collect data from the web server. This is because the web resources have not yet been stored in a cache. The web browser will then store the web resources in a cache to improve your experience in the subsequent visit to the website. 

#### Case 2: The user used the website before
If a user visits a website for the second time using the same computer device, the web page will load faster than the first visit. This is because the web browser will retrieve the static web resources like images, CSS, and JavaScript from the cache. The web browser will be used to provide the HTML page. 

The following image summarizes this case scenario. 

![Second Time User](/engineering-education/understanding-browser-caching/second-time-user.png)

[Image Source: Square Space](https://images.squarespace-cdn.com/content/v1/54dd763ce4b01f6b05bab7db/1500994738580-9SU7J5VBB90VPZ7U37R8/ke17ZwdGBToddI8pDm48kII892lw0xls72lO21Q9XbVZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpwHTuzmK1oUKM3h2UCt2VwL5QT4uAsMd3RAMkIY_uS5-OcwnZ4GtDYemfJYE0HTnhA/image-asset.png?format=750w)

The image above assumes that the content is fresh. Fresh content means that it has not expired and it can be retrieved from the cache. Stale content means that its cache period has expired and it can only be retrieved from the web server. 

### HTTP response headers commonly used for caching
The owner of a website has control over the cache policy. This control is exercised using HTTP cache headers. These headers are used to define the maximum time that web resources can be cached before expiring. 

The following are the HTTP response headers commonly used for caching:

#### ETag
This is an abbreviation for the term ‘Entity Tag’. It works as a cache validation token. It is used when the cached files have expired. The web browser uses ETag in its requests to establish whether there is a stale copy existing in the cache. 

#### Cache-Control
This header consists of various parameters that control validation, cache behavior, and expiration. 

Some of the directives of this header include:
- **no-cache:** This directive instructs the browser to validate the content in the cache to check whether it corresponds to the content in the web server. If the content is fresh, then the browser can fetch it from the cache. 
- **public:** This means that the browser or any intermediary party (like CDN or proxies) can cache the web resources.
- **private:** This means that only the browser can cache the web resources.
- **no-store:** This directive instructs the browser not to cache. 

#### Expires
This header defines when the resources stored in the cache will expire. When the expiry date reaches, the browser will consider the content stale. For example, *Expires: Mon, 14 June 2021 10:30:00 GMT*. 
  
#### Last modified
This header provides information regarding when the web content was modified. The main content of this information includes date and time of modification. For example, *Last Modified: Tue, 11 February 2021 10:30:00 GMT*. 

### Pitfalls of browser caching
- Incorrect caching setup may make the browser retrieve outdated content, which may affect the user experience negatively.
- Sometimes new information on the website may fail to be updated in the cache. 
- Caching may utilize proxy servers that are shared by various users. If these servers are hacked, many users may be affected adversely.
- Implementing caching may call for many requirements such as data, maintenance, servers, and performance. 

### Best practices for optimizing browser caching
If you are thinking of implementing browser caching, consider the following as best practices for optimizing its use:
- Use headers like ETag and Cache-Control to control the behavior of static content in the cache.
- Avoid defining the cache behavior using HTML metatags.
- Ensure there are long max-age values for content that changes frequently. This will enhance cache busting, which makes the browser retrieve the updated content from the server. 
- Use versioning or fingerprinting to perform cache busting. In versioning, a version number is given to the name of the file. Fingerprinting involves adding fingerprints to the file based on the contents.
- Avoid performing cache busting using query strings.

### Conclusion
This article has provided a basic understanding of browser caching, which is an important concept in web browsing. 

The following is a summary of what we have learned:
-	Browser caching is a process that involves the temporary storage of web resources in web browsers. 
-	In browser caching, web resources are stored in a cache and retrieved by the web browser. This happens if the cached content is fresh (has not expired). 
-	The HTTP headers used for controlling cache behavior include ETag, Cache-Control, Expires, and Last-Modified. 
-	Some of the pitfalls of browser caching include security risks, maintenance requirements, and the existence of stale content. 
-	We have also learned the best practices for optimizing browser caching. 

Happy learning.

---
Peer Review Contributions by: [Onesmus Mbaabu](/engineering-education/authors/onesmus-mbaabu/)
