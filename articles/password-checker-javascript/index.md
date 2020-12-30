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

![Strong password](strong-password.png)

- **Medium**</br>
The password can either be medium if it atleast 6 characters long and meets all the requirements or has no digit but meets the rest of the requirements.</br>
```
((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))
```
</br>

![Medium password](medium-password.png)

- **Weak**</br>
If the entered password does not meet the strong or medium level requirements then it is deemed weak.</br>

![Weak password](weak-password.png)

</br>
We will use Bootstrap 5 for UI styling.</br>
A badge, basically a span, is used to show the password strength and colour.</br>
Green for strong, Blue for medium and Red for weak.</br></br>

#### HTML Code</br>
<html>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href= "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
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
<body>
    <p>
          <div class="d-flex text-danger justify-content-center">
              <ul style="list-style-type:none">
             <li class="fs-4" style="margin-top: 10%; text-align :center">
                Password Strength Checker
             </li>
               <li>
                <input id="0101" class="form-control passwordInput" type="password" placeholder="Type your password" id="inputPassword">
               </li>
               <li>
                <span id="0102" class="badge displayBadge">Weak</span>
               </li>
            </ul>
              </div>  
    </p>     
</body>
</html>


#### JavaScript Code</br>
The full code can be accessed in my [Github repository](https://github.com/Agusioma/Password-Strength-Checker).</br>

```
    <script type="text/javascript">

        //timeout before a callback is called

        let timeout;

        //traversing the DOM and getting the input and span using their IDs

        let password = document.getElementById('0101')
        let strengthBadge = document.getElementById('0102')

        //The strong and weak password Regex pattern checker

        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
        let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

        //Adding an input event listener when a user types to the  password input 

        password.addEventListener("input", () => {

            //The badge is hidden by default, so we show it

            strengthBadge.style.display= 'block'
            clearTimeout(timeout);

            //We then call the StrengChecker function as a callback then pass the typed password to it

            timeout = setTimeout(() => StrengthChecker(password.value), 500);

            //Incase a user clears the text, the badge is hidden again

            if(password.value.length !== 0){
                strengthBadge.style.display != 'block'
            }else{
                strengthBadge.style.display = 'none'
            }
        });


        function StrengthChecker(PasswordParameter){

        //We then change the badge's colour and text based on the password strength

            if(strongPassword.test(PasswordParameter)){
                strengthBadge.style.backgroundColor = "green"
                strengthBadge.textContent = 'Strong'
            }else if(mediumPassword.test(PasswordParameter)){
                strengthBadge.style.backgroundColor = 'blue'
                strengthBadge.textContent = 'Medium'
            }else{
                strengthBadge.style.backgroundColor = 'red'
                strengthBadge.textContent = 'Weak'
            }

        }

    </script>

```
</br>

In the event listener, we check the strengh when the user has typed something, but
we won't do it immeadiately after every input event.</br>
When typing quickly, we wait until a pause occurs so instead of immeadiately performing an action in the event handler, we set a timeout.</br>
We also clear the previous timeout (if any) so that when the input events occur close together,closer than our timeout delay, the timeout from the previous input event will be cancelled.</br>

```
       password.addEventListener("input", () => {
            strengthBadge.style.display= 'block'
            clearTimeout(timeout)
            timeout = setTimeout(() => StrengthChecker(password.value), 500)
            if(password.value.length !== 0){
                strengthBadge.style.display != 'block'
            }else{
                strengthBadge.style.display = 'none'
            }
        });
```

In the function ```StrengthChecker```, we test for the match through the ```RegExp.prototype.test()``` method. It returns true if there is a match or false if there is no match.</br>
It then sets the background colour and text of the badge.</br>

```
        function StrengthChecker(PasswordParameter){
            if(strongPassword.test(PasswordParameter)){
                strengthBadge.style.backgroundColor = "green"
                strengthBadge.textContent = 'Strong'
            }else if(mediumPassword.test(PasswordParameter)){
                strengthBadge.style.backgroundColor = 'blue'
                strengthBadge.textContent = 'Medium'
            }else{
                strengthBadge.style.backgroundColor = 'red'
                strengthBadge.textContent = 'Weak'
            }
        }
```