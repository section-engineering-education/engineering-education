### Password strength check using JavaScript Regex</br></br>

![hero image](hero.jpg)

For us to secure our systems and accounts, we need a strong password.</br>
The person developing the system has to ensure that the password the end-user chooses is strong enough to guard his/her account.</br>
We are going to discuss one of the tools offered to developers to achieve that, **Regular Expression** class in JavaScript.</br>

#### The Regular Expressions Class</br>
It is a class containing patterns used to check character combinations in strings.</br>
It can be taken as an object in JavaScript.</br>
We can either use **simple patterns** such as /vet/ for finding a direct much or **special  characters** like /?=/ for getting more than a direct match.</br></br>

**How to use Regex**</br>
Regex, also denoted as *RegExp*, can be constructed in one of these two ways:</br></br>
- Using Regular Expression literal where the pattern is enclosed between two forward slashes.</br></br>

```
let check = /vet/
```

- Using the constructor function of the **RegExp** object and passing the pattern as a parameter.</br></br>

```
let check = new RegExp('vet')
```
We use the constructor function when we know the pattern keeps changing or like if we get it from a different source, such as the user input.</br>

For that reason we are going to use the constructor function for we are getting the password from the user input.</br></br>

#### Patterns we are going to use</br></br>
|Characters|Meaning|
--|--|
\d|Checks for a digit match e.g it returns 2 in "U2" |
|\W|Checks for a special character e.g returns % in "2%"|
|x{n,}|Matches at least n terms from the preceding term x e.g o{2,} does not return anything in boy but returns all o<sub>s</sub> in gooooal.|
|xIy |matches either x or y in a string|
|[^vet]|A negated set. Doesn't check for anything included in the range ie Does not check for **vet** |
|[A-Za-z0-9]|Checks all alphanumeric characters|
|[a-z]|Checks for lowercase letters|
|[A-Z]|Checks for uppercase letters|
|x(?=y)|Returns x if and only if it is followed by y e.g a(?=.*[A-Za-z0-9]) returns true if the **a**  is followed by atleast one alphanumeric letter|
|**.**|Checks for any single character except line terminators |
|x*|Checks for x 0 or more times|


#### The JavaScript program</br></br>
We are going to discuss how to check the strength of  a password a user enters basing on if the password:</br>
- Is at least 8 characters long(**?=.{8,}**)
- Has at least one uppercase letter(**?=.*[A-Z]**)
- Has at least one lowercase letter(**?=.*[a-z]**)
- Has at least one digit(**?=.*[0-9]**)
- Has at least one special character(**[^A-Za-z0-9]**)

We are going to have three levels:</br>
- **Strong**</br>
The password has to meet all the requirements to be strong.</br>
```
(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})
```
</br>

- **Medium**</br>
The password can either be medium if it atleast 6 characters long and meets all the requirements or has no digit but meets the rest of the requirements.</br>
```
((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))
```
</br>

- **Weak**</br>
If the entered password does not meet the strong or medium level requirements then it is deemed weak.</br>