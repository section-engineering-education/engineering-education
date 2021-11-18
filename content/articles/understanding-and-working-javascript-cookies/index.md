---
layout: engineering-education
status: publish
published: true
url: /understanding-and-working-with-javascript-cookies/
title: Understanding and Working with JavaScript Cookies
description: In this article, we'll be looking at how JavaScript cookies work. We will learn how to create, update and delete them.
author: bernard-mburu
date: 2021-08-06T00:00:00-08:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

 - url: /engineering-education/understanding-and-working-with-javascript-cookies/hero.png
   alt: Cookies JavaScript Image
---

A cookie is a short text file that stores some data on a computer (about 4KB). They usually keep track of information such as preferencess for a website, prompting the user to improve the web page the next time they visit.
<!--more-->
Cookies are an antiquated method of preventing customers from using third-party writing scripts like PHP, ASP, and others.

Using JavaScript, cookies can be created, retrieved, and modified directly, and the process is simple. The name, value and the length of the cookie can be restricted. 

All cookie data is transferred to the application server immediately when a page is requested from the browser server. Cookies should not be used to store sensitive information such as passwords or credit card numbers, as this information could be accessed by malevolent users.

### Table of contents
- [Types of cookies](#various-types-of-cookies)
- [Creating a cookie](#creating-a-cookie)
- [Reading a cookie](#reading-a-cookie)
- [Updating a cookie](#updating-a-cookie)
- [Deleting a cookie](#deleting-a-cookie)
- [Conclusion](#conclusion)

### Various types of cookies
There are three types of cookies:
1. **First Party Cookies** - These are cookies that are created by your website and can only be read by your website.
2. **Third-party cookies** - These cookies are produced by third-party advertising on your website. These cookies can only be read on any site that displays the same ad using the advertising code.
3. **Session cookies** - These cookies are saved on your browser. They are destroyed when the browser is closed.

### Creating a cookie
You can make a cookie using the `document.cookie` property. In JavaScript, you can use this property to set up, read, and delete cookies.

Additionally, any cookies linked with the document are represented by this property. We create a cookie in the form of `name=value` using the `document.cookie` property.

You can only set one cookie at a time using this property.

Take a look at the example below.

```js
document.cookie = "UserName = fabuluosDesigns";
```

You must use an in-built javascript function called `encodeURIComponent()` to use special characters when creating cookies. 

Before saving the cookie, this function encodes special characters like white spaces, semicolons, and others.

Take a look at the example below.

```javascript
document.cookie = "UserName=" + encodeURIComponent("fabulous designs");
```

Similarly, you must utilize the `decodeURIcomponent()` function to read the cookie value when you want to read the cookies.

The cookie's lifespan is limited to the duration of the current browser session, thus, it will be removed when the user quits the browser.

If you need to use cookies beyond the current browser session, use the age-appropriate attribute to specify their lifetime (in seconds).The setting `max-age` sets the amount of time a cookie can be stored before it is removed from your system.

Take a look at the example below. This cookie has a 30-day expiration date.

```javascript
document.cookie = "Username = coolDesign; max-age =" + 30 * 24 * 60 * 60;
```

A valid cookie time can also be specified using the `expires` element. This cookie will not be destroyed based on duration but will take the actual date the cookie expires (in GMT/UTC format).

Take a look at the example below.

```javascript
document.cookie = "Username = stunningDesign; expires =Fri, 31 jan 2022 23:59:59 GMT";
```

On all web pages, or in any subdirectory of that directory, a cookie is always available. If you specify the `path`, the cookie will be available to all pages in that subdirectory as well. For instance, if the path is set to `/`, the cookie will be available across the whole website, regardless of the page it was created on.

```javascript
document.cookie = "Username = ExcellentDesign; Path = /";
```

If you want a cookie to work across many subdomains, use the `domain` attribute. The cookie will only be accessible the pages from the domain in which the cookie was set.

```javascript
document.cookie = "Username = ExcellentDesign; path = /; domain = sample.com";
```

Additionally, if the `secure` property is set, the cookie will only be delivered over secure (encrypted) connections, such as HTTPS.

```javascript
document.cookie = "Username = ExcellentDesign; path = /; domain = sample.com; secure";
```

### Reading a cookie
The `document.cookie` attribute simply returns a string containing a semicolon and a space separated list of all cookies (i.e. `name=value` pairs, for example, `firstName=Fabulous; lastName=Designs;`). This string does not include any of the cookie's characteristics, such as expires, path, domain, and so on.

To obtain an individual cookie from this list, use the `split()` method to break it down into individual `name=value` pairs, then search for the name you want, as shown in the example below:

```javascript
function setCookie(name, value, daysToLive) {
    var cookie = name + "=" + encodeURIComponent(value);
    if(typeof daysToLive === "number") {
        cookie += "; max-age=" + (daysToLive*24*60*60);
        document.cookie = cookie;
    }
}

function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if(name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

function checkCookie() {
    var UserName = getCookie("UserName");
    if(UserName != "") {
        alert("Welcome again, " + UserName);
    } else {
        firstName = prompt("Please enter your UserName:");
        if(UserName != "" && UserName != null) {
            setCookie("UserName", UserName, 30);
        }
    }
}
```

In the above code, we created three functions: `setCookie()`, `getCookie()`, and `checkCookie()`.
- **setCookie()** - Creates a cookie with an optional `max-age` attribute.
- **getCookie()** - This function, reads the value of a cookie.
- **checkCookie()** - Using `getCookie()`, this function checks whether the `UserName` is set or not. If set, it will display a greeting message. If it isn't set, it will prompt the user to enter their user name and store it in the cookie using `setCookie()`.

### Updating a cookie
A cookie can be updated by setting new values to the cookie attributes. 

Take a look at the example below. We update the `max-age` attribute of the `UserName` cookie from 30 days to 365 years.

```javascript
document.cookie = "UserName=fabulousDesign; path=/; max-age=" + 30 * 24 * 60 * 60;

document.cookie = "UserName=beautifulDesign; path=/; max-age=" + 365 * 24 * 60 * 60;
```

### Deleting a cookie
To delete a cookie, simply rename it using the same `name`, specifying an empty value, or setting its `max-age` attribute to 0. 

```javascript
document.cookie = "UserName=; max-age=0";
```

You'll need to include the cookie's path and domain property when deleting it if you had specified them.

```javascript
document.cookie = "UserName=; path=/; domain=example.com; max-age=0";
```

To delete a cookie using the expires property, just change the value (the expiration date) to a past date, as shown below.

```javascript
document.cookie = "UserName=; path=/; expires=Thu, 01 feb 1990 00:00:00 GMT";
```

### Conclusion
Some pages and services will not work properly if cookies are disabled. Cookies are necessary for a website to work properly. Although it's neccesary to ask for the user's permission to use cookies, some essential cookies do not require permission to use them.

In conclusion, the user's permission to use the site isn't needed, but the user's permission to use the **site information** is **required**.

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
