---
layout: engineering-education
status: publish
published: true
url: /password-strength-checker-javascript/
title: Password Strength Checker using Regular Expressions in JavaScript
description: This tutorial will give readers a detailed guide on how to build a password strength checker using regular expressions in JavaScript.
author: terrence-aluda
date: 2021-01-24T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/password-strength-checker-javascript/hero.jpg
    alt: Password Strength Regular Expressions JavaScript Image
---
Passwords are very important in application security. Everyone needs a strong password to secure their systems and accounts. In this tutorial, we are going to discuss how to ensure that end-users choose passwords that are strong enough to secure their account using Regular Expressions in JavaScript.
<!--more-->

### Prerequisites
A basic understanding of HTML, CSS, and JavaScript will be required to follow along with this tutorial.

### The regular expressions class
Regular expressions are patterns used to match character combinations in strings. In JavaScript, regular expressions are also objects.

Regex is also denoted as `RegExp`. 

They can be constructed using:

- The Regular Expression literal where the pattern is enclosed between two slashes.

```JavaScript
    let check = /vet/
```

- The constructor function of the `RegExp()` class and by passing a string that has to be checked.

```JavaScript
    let check = new RegExp('vet');
```

We use the constructor function when the pattern keeps changing or if we get it from a different source, such as a user input. For this reason, we are going to use the constructor function since we will get the password from the user.

### Patterns
|Characters|Meaning|
--|--|
\d|Checks for a digit match e.g: it returns 2 in "U2". |
|\W|Checks for a special character e.g: returns % in "2%".|
|x{n,}|Checks for at least n terms from the preceding term x e.g: O{2,} does not return anything in "BOY" but returns all Os in GOOOOOAL!.|
|xIy |Matches either x or y in a string| e.g: YouIHim returns You in "You aren't lucky".
|[^vet]|A negated set. Doesn't check for anything included in the range ie Does not check for *vet* in "veterinary"  |
|[A-Za-z0-9]|Checks all alphanumeric characters|
|[a-z]|Checks for lowercase letters|
|[A-Z]|Checks for uppercase letters|
|x(?=y)|Returns x if and only if it is followed by y|
|**.**|Checks for any single character except line terminators |
|x*|Checks for x 0 or more times|

### RegEx for testing password strength
We are going to check the strength of a password that a user enters based on the following rules:

- The password is at least 8 characters long (`?=.{8,}`).

- The password has at least one uppercase letter (`?=.*[A-Z]`).

- The password has at least one lowercase letter (`?=.*[a-z]`).

- The password has at least one digit (`?=.*[0-9]`).

- The password has at least one special character (`[^A-Za-z0-9]`).

>NOTE: That two groups of parentheses `(x)(y)` is the same as checking for both x and y while two groups of parentheses with `|` between them `(x)|(y)` is the same as either check x or y as shown in the table above.

We are going to have three levels to denote how secure a password is. 

They are:

1. Strong: The password has to meet all the requirements.

Using the metrics above, we are going to create a strong level password that has at least one lowercase letter (`?=.*[a-z]`), one uppercase letter (`?=.*[A-Z]`), one digit (`?=.*[0-9]`), one special character (`?=.*[^A-Za-z0-9]`), and is at least eight characters long(`?=.{8,}`).

```JavaScript
    (?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})
```

![Strong password](/engineering-education/password-strength-checker-javascript/strong-password.png)

2. Medium: If the password is at least six characters long and meets all the other requirements, or has no digit but meets the rest of the requirements.

The code is the same as for the Strong level only that `?=.{6,}` shows that we are checking for at least six characters. It also has `|` to check for either of the two conditions `(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})` or `(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,})`.

```JavaScript
    ((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))
```

![Medium password](/engineering-education/password-strength-checker-javascript/medium-password.png)

3. Weak: If the password entered does not meet the strong or medium-level requirements, then it is deemed weak.

![Weak password](/engineering-education/password-strength-checker-javascript/weak-password.png)

### HTML code
```HTML
<html>
<head>
    <!-- Bootstrap 5 link -->
    <link href= "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <!-- CSS Styling -->
    <style>
        .passwordInput{
            margin-top: 5%; 
            text-align :center;
        }

        .displayBadge{
            margin-top: 5%; 
            display: none; 
            text-align :center;
        }
    </style>
</head>
<body>
    <div class="d-flex text-danger justify-content-center">
        <h4 style="margin-top: 10%; text-align :center">
            Password Strength Checker
        </h4>
        <br>
        <input type="password" placeholder="Type your password" id="PassEntry" class="form-control passwordInput">
        <br>
        <span id="StrengthDisp" class="badge displayBadge">Weak</span>
        <br>
    </div>     
</body>
</html>
```

- We'll use Bootstrap 5 for styling by adding the CDN link for the Bootstrap stylesheet and link it to the HTML file using the `<link>` tag.

- We'll write our custom styles using the `<style>` tag. We have two classes, `passwordInput` and `displayBadge`. The `passwordInput` styles the password input by allowing a 5% margin from the top and also aligns the text typed to it at the center. The `displayBadge` does the same for the span and hides it since we only display it when a user starts typing the password.

- In the `<body>` tag we have a `<div>` element with three elements.

- The first element is a simple heading (`h4`) with some inline styles.

- The second element is an input where the user will type the password. We have used the `form-control` class from Bootstrap and our custom class `passwordInput` to style the element.

- The third element is a `<span>` which is where the password strength will be labeled as a badge with color: Green for strong, Blue for medium, and Red for weak.

### JavaScript code
Let's create five variables:

1. `timeout`: for referencing the timeout before a callback is called.

2. `password`: for the input where the password will be entered.

3. `strengthBadge`: for storing the span used for displaying the strength of the password (that we can access using the DOM element's ID).

4. `strongPassword`: for storing the Regex conditions.

5. `mediumPassword`: also used to store the Regex conditions.

```JavaScript
let timeout;
let password = document.getElementById('PassEntry');
let strengthBadge = document.getElementById('StrengthDisp');
let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
```

Let's create a function called `StrengthChecker` where we test for the strength of the passwords using the regular expressions that we wrote with the `RegExp.prototype.test()` method. It returns `true` if there is a match or `false` if there is no match.

Then, let's set the background colour (`strengthBadge.style.backgroundColor`) and text of the badge (`strengthBadge.textContent`) according to the result.

```JavaScript
function StrengthChecker(PasswordParameter) {
    if(strongPassword.test(PasswordParameter)) {
        strengthBadge.style.backgroundColor = "green";
        strengthBadge.textContent = 'Strong';
    } else if(mediumPassword.test(PasswordParameter)) {
        strengthBadge.style.backgroundColor = 'blue';
        strengthBadge.textContent = 'Medium';
    } else {
        strengthBadge.style.backgroundColor = 'red';
        strengthBadge.textContent = 'Weak';
    }
}
```

Let's add an input event listener to the `password` input and check the strength with the `StrengthChecker` function when the user has typed something. We won't call the function immediately after every keystroke. When the user types quickly, we should wait until a pause occurs. So, instead of checking the strength immediately, we'll set a timeout.

We should clear the previous timeout if there is any. When the events occur closer together than our timeout duration, the timeout from the preceding input event should be canceled.

```JavaScript
password.addEventListener("input", () => {
    strengthBadge.style.display = 'block';
    clearTimeout(timeout);
    timeout = setTimeout(() => StrengthChecker(password.value), 500);
    if(password.value.length !== 0) {
        strengthBadge.style.display != 'block';
    } else {
        strengthBadge.style.display = 'none';
    }
});
```

### The full JavaScript code
Instead of writing JavaScript inline with the HTML file, we will create a new JavaScript file, write the following code and then link it to the HTML using the script tag such as `<script src="pathtothefile"></script>`.

```JavaScript
    
    // timeout before a callback is called

    let timeout;

    // traversing the DOM and getting the input and span using their IDs

    let password = document.getElementById('PassEntry')
    let strengthBadge = document.getElementById('StrengthDisp')

    // The strong and weak password Regex pattern checker

    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
    let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
    
    function StrengthChecker(PasswordParameter){
        // We then change the badge's color and text based on the password strength

        if(strongPassword.test(PasswordParameter)) {
            strengthBadge.style.backgroundColor = "green"
            strengthBadge.textContent = 'Strong'
        } else if(mediumPassword.test(PasswordParameter)){
            strengthBadge.style.backgroundColor = 'blue'
            strengthBadge.textContent = 'Medium'
        } else{
            strengthBadge.style.backgroundColor = 'red'
            strengthBadge.textContent = 'Weak'
        }
    }

    // Adding an input event listener when a user types to the  password input 

    password.addEventListener("input", () => {

        //The badge is hidden by default, so we show it

        strengthBadge.style.display= 'block'
        clearTimeout(timeout);

        //We then call the StrengChecker function as a callback then pass the typed password to it

        timeout = setTimeout(() => StrengthChecker(password.value), 500);

        //Incase a user clears the text, the badge is hidden again

        if(password.value.length !== 0){
            strengthBadge.style.display != 'block'
        } else{
            strengthBadge.style.display = 'none'
        }
    });

```

#### Conclusion
You've learned how to use JavaScript RegEx to create a three level password checker. You can build on the example by implementing more levels like Too Strong and Too Weak.

To find out more about JavaScript RegEx, read the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions).

Thanks for reading!

---
Peer Review Contributions by: [Mohan Raj](/engineering-education/authors/mohan-raj/)
