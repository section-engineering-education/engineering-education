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
|[^xyz]|A negated set. Doesn't check for anything included in the range|
|[A-Za-z0-9]|Checks all alphanumeric characters|
|x(?=y)|Returns x if and only if it is followed by y e.g (?=.*[A-Za-z0-9]) returns true if the string contains atleast one alphanumeric letter|

#### The JavaScript program