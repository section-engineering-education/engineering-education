### Introduction
A cookie is a short text file that stores a little bit of data on a user's computer (about 4KB). They typically keep track of information such as a user's preference for a website, prompting the user to improve the web page the next time they visit. Cookies are an antiquated method of preventing customers from using third-party writing scripts like PHP, ASP, and others. 

Using JavaScript, cookies can be created, retrieved, and modified directly, and the process is simple. The cookie can be up to 4 KB with name and value and the length of the cookie can be restricted. All cookie data is transferred to the application server immediately when a page is requested from the browser server. Cookies should not be used to store sensitive information such as passwords or credit card numbers, as this information could be accessed by malevolent users.

### Table of content
- [Types of cookies](#various-types-of-cookies)
- [Creating a cookie](#creating-a-cookie)
- [Reading a cookie](#reading-a-cookie)
- [Updating a cookie](#updating-a-cookie)
- [Deleting a cookie](#deleting-a-cookie)
- [Conclusion](#conclusion)

### Various types of cookies
There are three types of cookies.

- **First Party Cookies** - These are cookies that are created by your website and can only be read by your website.
- **Third party cookies** - These cookies are produced by third-party advertising on your website. These cookies can only be read on any site that displays the same ad using the advertising code.
- **Session cookies** - These cookies are saved on your browser. They are destroyed when the browser is closed.

### Creating a cookie
You can make a cookie from the `document.cookie` property. In JavaScript, you can use this property to set up, read, and delete cookies.

Additionally, any cookies linked with the document are represented by this position.
Set this property to `name=value` string to store a new cookie.

You can only set one cookie at a time using this property.

Take a look at the example below.

```javascript
document.cookie = "codeName = fabuluosDesigns";
```

You must use an in-built javascript function called `encodeURIComponent()` if you wish to use special characters when creating cookies. 

Before saving the cookie, this function encodes special characters like as white spaces, semicolons, and others.

Take a look at the example below.

```javascript
document.cookie = "codeName=" + encodeURIComponent("fabulous designs");
```

Similarly, you must utilize the appropriate function: `decodeURIcomponent()` to read the cookie value when you want to read the cookies.

The cookie's lifespan is limited to the duration of the current browser session, thus, it will be removed whenever the user quits the browser.

If you need to see cookies beyond the current browser session, use the `age-appropriate` attribute to specify their lifetime (in seconds).The setting `max-age` sets the amount of time a cookie can be stored before it is removed in your system.

Take a look at the example below. This cookie has a 30-day expiration date.

```javascript
document.cookie = "Username = coolDesign; max-age =" + 30 * 24 * 60 * 60;
```

A valid cookie time can also be specified using the `expires` element. This functionality will not be destroyed in seconds and will take the actual date the cookie expires (in GMT/UTC format).

Take a look at the example below.

```javascript
document.cookie = "Username = stunningDesign; expires =Fri, 31 jan 2022 23:59:59 GMT";
```

On all web pages, or in any subdirectory of that directory, a cookie is always available. If you specify the `path`, the cookie will be available on all web sites in that subdirectory as well. For instance, if the path is set to `/`, the cookie will be available across the whole website, regardless of the page it was created on.

```javascript
document.cookie = "Username = ExcellentDesign; Path = /";
```

If you want a cookie to work across many subdomains, use the `domain` attribute. Only the pages in the domain in which the cookie was set are accessible.

```javascript
document.cookie = "Username = ExcellentDesign; path = /; domain = sample.com";
```

Additionally, if the `secure` property is set, the cookie will only be delivered over secure (i.e. encrypted) connections, such as HTTPS.

```javascript
document.cookie =
  "Username = ExcellentDesign; path = /; domain = sample.com; secure";
```

### Reading a cookie
Because the `document.cookie` item provides a string comprising the semicolon and the space separated by all cookies (ie., `name = value pair`, e.g., `firstName = excellent; lastName = design;`), a cookie is more difficult to comprehend. 

There are no properties defined for the cookie in this thread, such as expires, domain, path, and others. To locate each cookie in a list, partition the cookie into individual `name = value pairs` and search for a specific name using the `split()` method.

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
In the above code, we created three functions: `setCookie()`, `getCookie()`, and `checkCookie()`.
- **setCookie()** - Creates a cookie with an optional `max-age` attribute.
- **checkCookie()** - Using `getCookie()`, this function will check whether the `firstName` cookie is set or not, and if it is, it will display a greeting message; if it is not, it will prompt the user to enter their first name and store it in the cookie using `setCookie()`.
- **getCookie()** - Reads the cookie.

### Updating a cookie
A cookie can be updated by setting new values to the cookie attributes. 

Take a look at the example below. We update the `max-age` attribute of the `firstName` cookie from 30 days to 365 years.

```javascript
document.cookie =
  "firstName=fabulousDesign; path=/; max-age=" + 30 * 24 * 60 * 60;

document.cookie =
  "firstName=beautifulDesign; path=/; max-age=" + 365 * 24 * 60 * 60;
```

### Deleting a cookie
To erase a cookie, simply give it a new name, an empty or random value, and a max-age value of 0. You'll need to include the cookie's path and domain property when deleting it if you specified them.

```javascript
document.cookie = "firstName=; max-age=0";

document.cookie = "firstName=; path=/; domain=example.com; max-age=0";
```

To delete a cookie using the expires property, just change the value (i.e. the expiration date) to a past date, as shown below.

```javascript
document.cookie = "firstName=; path=/; expires=Thu, 01 feb 1990 00:00:00 GMT";
```

### Conclusion
Some services will not function properly if cookies are disabled, and some pages will not load properly. Some cookies might not necessitate agreement.

For a website to function properly, cookies technicians are required.

As a conclusion, the user's permission to use the site isn't really required; rather, the user's permission to use the site information is needed.

Happy coding!
