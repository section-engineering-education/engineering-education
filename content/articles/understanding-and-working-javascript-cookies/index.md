# Understanding and working with JavaScript cookies

- [introduction](#introduction)
- [Types of cookies](#types-of-cookies)
- [Create cookie with javascript](#creating-a-cookie-with-javascript)
- [Read a cookie](#reading-a-cookie)
- [cookie update](#updating-a-cookie)
- [deleting a cookie](#deleting-a-cookie)
- [Conclusion](#conclusion)

## Introduction

A cookie is a short text file that stores a little bit of data on a user's computer (about 4KB). They typically keep track of information such as a user's preference for a website, prompting the user to improve the web page the next time they visit. Cookies are an antiquated method of preventing customers from using third-party writing scripts like PHP, ASP, and others. Using JavaScript, cookies can be created, retrieved, and modified directly, but the process is simple. The cookie can be up to 4 KB with name and value and the length of the cookie can be restricted. All cookie data is transferred to the server in the application immediately when a page is requested from the browser server. Cookies should not be used to store sensitive information such as passwords or credit card numbers, as this information could be accessed by malevolent users.

## Various types of cookies
 There are three types of cookies.

- **First Party Cookies** - These are cookies that are created by your website and can only be read by your website.
- **Third party cookies** - produced by third-party advertising on your website. These cookies can only be read on any site that displays the same ad using the advertising code.
- **session cookies** - are saved on your browser. They lasts when the browser is on.

## Creating a cookie with JavaScript

You can make a cookie from the property `document.cookie` In JavaScript, you can use this property to set up, read, and delete cookies.
Additionally, any cookies linked with the document are represented by this position.
Set this property to `name=value` string to store a new cookie.
You can only set one cookie at a time with this feature.

**Illustration 1**: -

```JavaScript
document.cookie = "codeName = fabuluosDesigns";
```

You must use an in-built javascript function called `encodeURIComponent()` if you wish to use special characters when creating cookies. Before saving the cookie, this function encodes special characters like as white spaces, semicolons, and others.

**Illustration 2:**

```javascript
document.cookie = "codeName=" + encodeURIComponent("fabulous designs");
```

Similarly, you must utilize the appropriate function decodeURIcomponent() to read the cookie value when you want to read the cookies.
The cookie's lifespan is limited to the duration of the current browser session, thus, it will be removed whenever the user quits the browser.

If you need to see cookies beyond the current browser session, use the age-appropriate attribute to specify their lifetime (in seconds).The setting `max-age` sets the amount of time a cookie can be stored before it is removed in your system.

**Illustration 3:**

- This cookie has a 30-day expiration date.

```JavaScript
document.cookie = "Username = coolDesign; max-age =" + 30 * 24 * 60 * 60;
```

A valid cookie time can also be specified using the `expires` element. This functionality will not be destroyed in seconds and will take the actual date the cookie expires (in GMT / UTC format).

**Illustration 4:**

```JavaScript
document.cookie = "Username = stunningDesign; expires =Fri, 31 jan 2022 23:59:59 GMT";
```

On all web pages, or in any subdirectory of that directory, a cookie is always available. If you specify the `path`, the cookie will be available on all web sites in that subdirectory as well. For instance, if the path is set to `/`, the cookie will be available across the whole website, regardless of the page it was created on.

```JavaScript
document.cookie = "Username = ExcellentDesign; Path = /";
```

If you want a cookie to work across many subdomains, use the `domain` attribute. Only the pages in the domain in which the cookie was set are accessible.

```javascript
document.cookie = "Username = ExcellentDesign; path = /; domain = Sample.com";
```

Additionally, if the `secure` property is set, the cookie will only be delivered over secure (i.e. encrypted) connections, such as HTTPS.

```javascript
document.cookie =
  "Username = ExcellentDesign; path = /; domain = sample.com; secure";
```

## Reading a Cookie

Because the `document.cookie` item provides a string comprising the semicolon and the space separated by all cookies (e.g., name = value pair, e.g., firstName = excellent; lastName = design), a cookie is more difficult to comprehend. There are no properties defined for the cookie in this thread, such as expires, domain, path, and others. To locate each cookie in a list, partition the cookie into individual name = value pairs and search for a specific name using the `split()` method.

```JavaScript
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
    var firstName = getCookie("firstName");
    if(firstName != "") {
        alert("Welcome again, " + firstName);
    } else {
        firstName = prompt("Please enter your first name:");
        if(firstName != "" && firstName != null) {
            function
            setCookie("firstName", firstName, 30);
        }
    }
}
```

- **setCookie()** - creates a cookie with an optional `max-age` attribute.
- **checkCookie()** - using the above getCookie() function, this function will check whether the firstName cookie is set or not, and if it is, it will display a greeting message; if it is not, it will prompt the user to enter their first name and store it in the cookie using the setCookie() function.
- **getCookie()** - will read the cookie.

## updating a cookie

To change a cookie, make a new one with the same name and path as the old one. Making a new cookie with the same name but a different path than the old one will result in the creation of a new cookie.

Example:

```javascript
document.cookie =
  "firstName=fabulousDesign; path=/; max-age=" + 30 * 24 * 60 * 60;

document.cookie =
  "firstName=beautifulDesign; path=/; max-age=" + 365 * 24 * 60 * 60;
```

## Deleting a Cookie

To erase a cookie, simply give it a new name, an empty or random value, and a max-age value of 0. You'll need to include the cookie's path and domain property when deleting it if you specified them.

```javascript
document.cookie = "firstName=; max-age=0";

document.cookie = "firstName=; path=/; domain=example.com; max-age=0";
```

To delete a cookie using the expires property, just change the value (i.e. the expiration date) to a date that has past, as shown below.

```javascript
document.cookie = "firstName=; path=/; expires=Thu, 01 feb 1990 00:00:00 GMT";
```

## conclusion

Some services will not function properly if cookies are disabled, and some pages will not load properly.
Some cookies might not necessitate agreement.

For a website to function properly, cookies technicians are required.

As a result, it does not necessitate the user's consent to use the site, but simply the user's consent to use the site.

communication.
