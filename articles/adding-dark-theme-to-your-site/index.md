The dark theme has gained prevalence in screens today. With this trend in iOS, macOS, windows, and google, most systems adopt dark themes. Application of dark theme in website context make your website more exciting and attractive to users who love dark them. The experience is even better if you include functionality to switch between light and dark themes.

This article will help you learn how to implement switching between light and dark themes using [CSS Variables](https://www.w3schools.com/css/css3_variables.asp).

Click [this](https://replit.com/@PhinaKersly/dark-theme#index.html) link to find the source code and a runnable program for the implementation.

### Prerequisites
As a prerequisite, the reader must have a good understanding of:
- Basic Knowledge of HTML, SCSS, and Javascript
- Understand CSS variables

### Table of contents
- Adding HTML
- Adding CSS
- The toggle theme switch
- Adding JavaScript
- Storing them in local storage
- Conclusion

### Adding the HTML
Lets begin by adding the HTML that we will use for the tutorial. We add the `theme` name and `switch` id to the checkbox input so that we will used theme to refer to it in our `javascript`. We are creating a simple webpage with consisting of a container, in which we add a heading, togglle button, and a paragraph.
```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/main.css">
    <title>Adding dark theme to your site</title>
</head>
<body>
    <!-- container -->
    <div class="container">
        <!-- heading -->
        <h1>Section Engineering Education</h1>
        <-- toggle switch contaner -->
        <div class="toggle-container">
            <input type="checkbox" id="switch" name="theme" /><label for="switch">Toggle</label>
        </div>
            <!-- close toggle switch container -->
            <!-- paragraph -->
        <p>Section partners with university students in Computer Science related fields of study to research and write about topics that are relevant to engineers in the modern technology landscape. You can find more information and program guidelines in the GitHub repository. If you're currently enrolled in a Computer Science related field of study and are interested in participating in the program, please complete <a href="https://docs.google.com/forms/d/e/1FAIpQLSfTbj3kqvEJEb5RLjqJurfbHa8ckzQx0CjRzaizblue9ZOK5A/viewform">this form </a></p>
            <!-- close paragraph -->
    </div>
       <!-- close container -->
    <script src="main.js"></script>
</body>
</html>
```

### Adding the CSS
In the same directory as the HTML file, we will add the CSS file that will be used for toggling the default "Light theme" to the "Dark theme". I recommend installing a live SCSS Compiler to compile our CSS Code in real-time. You can the SCSS compiler's installation [here](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass)


The CSS variables for the default light theme are as shown below. You can change the color code to your favorite color which looks attractive in both dark and light themes.

The CSS styling for the default white theme is shown below:
```css
/* default the styling variables */
html{
    --bg: #fff;
    --bg-panel: #ebebeb;
    --color-heading: rgb(27, 168, 14); 
    --color-text: #333333;
}
```

CSS styling for dark theme:
```css
/* dark theme styling */
html[data-theme='dark'] {
    --bg: #333333;
    --bg-panel: #434343;
    --color-heading: #0077ff; 
    --color-text: #B5B5B5;
}
```
Next, we need to specify the CSS variables' use through the CSS file so that all the website elements will change when we click the toggle theme button.

```css
body { 
    background-color: var(--bg);/* background color variable */
}

.container {
    background-color: var(--bg-panel); /* panel baackground  color variable */

    h1{
        margin: 0;
        color: var(--color-heading);/* heading 1 background color variable */
    }

    p{
        color: var(--color-text); /* text-color variable */
       
    }

}
```
Here is the output after we add our CSS.
![Output After Adding CSS](/engineering-education/adding-dark-theme-to-your-site/after-addding-css.png)

### Switch Theme Button
In the next section, we will style our toggle switch which will be checked to switch between the dark and light theme. The code for this toggle button is as below.

You can find the code to this switch [here](https://codepen.io/mburnette/pen/LxNxNg)

```css
    input[type=checkbox] {
        height: 0;
        width: 0;
        visibility: hidden;
    }

    label {
        cursor: pointer;
        text-indent: -9999px;
        width: 52px;
        height: 27px;
        background: #1ba80e;
        float: right;
        border-radius: 100px;
        position: relative;
    }

    label:after {
        content: '';
        position: absolute;
        top: 3px;
        left: 3px;
        width: 20px;
        height: 20px;
        background: #fff;
        border-radius: 90px;
        -webkit-transition: 0.3s;
        transition: 0.3s;
    }

    input:checked + label {
        background: var(--color-heading);
    }

    input:checked + label:after {
        left: calc(100% - 5px);
        -webkit-transform: translateX(-100%);
                transform: translateX(-100%);
    }

    label:active:after {
        width: 45px;
    }
```
![Toggle theme switch](/engineering-education/adding-dark-theme-to-your-site/toggle-switch.png)
### Adding the JavaScript
We will handle the theme switching through JavaScript by changing the toggle switch's class name to either light or dark, as defined above. In doing so, we write two functions `changeThemeToDark()` and `chnageThemeToWhite()`.

#### Change the theme to dark
```javascript
    // Change theme to dark by adding the `dark` classname to html element.
   const changeThemeToDark = () =>{
    document.documentElement.setAttribute("data-theme", "dark")//set theme to light
}

```

#### Change the theme to Light
```javascript
    // Reset the html class to default
   const changeThemeToDark = () =>{
    document.documentElement.setAttribute("data-theme", "light"); //set theme to light
}
```

### Using Local Storage to remember the theme.
The local storage provides a store for key and value pairs from a browser. Data store with local storage do not expire even after the browser is refreshed or closed. The `setItem` and `getItem` methods are used to store and retrieve the stored data respectively.
We will use local storage to store our currently set theme so that in subsequent visits or page refreshing, users will see their previously set themes.
The below pieces of code are used to save and retrieve the theme from local storage:
```javascript
    const changeThemeToDark = () =>{
        document.documentElement.setAttribute("data-theme", "dark") //set theme to dark
        localStorage.setItem("data-theme", "dark")// save theme to local storage
    }

    const changeThemeToLight = () =>{
        document.documentElement.setAttribute("data-theme", "light") //set theme light
        localStorage.setItem("data-theme", 'light')// save theme to local storage
    }
```
After writing, the functions, we check to see what theme is set currently and toggle it.
```javascript
    // Apply retrived them to the website
    checkbox.addEventListener('change', ()=> {
        let theme = localStorage.getItem('data-theme'); // Retrieve saved them from local storage
        if (theme ==='dark'){
            changeThemeToLight()
        }else{
            changeThemeToDark()
        }   
    });
```
![Dark Theme](/engineering-education/adding-dark-theme-to-your-site/dark-theme.png)
### Conclusion
To sum up, since dark themes are trendy recently, this article explained how to implement dark themes and light themes switching using CSS variables and Javascript's LocalStorage. You can now try out the dark theme on your website following this article. You can find the link to the code used in the article [here](https://replit.com/@PhinaKersly/dark-theme#index.html). For further reading, I recommend you check out [CSS Variables](https://www.w3schools.com/css/css3_variables.asp) and [Local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) for a deeper understanding.
