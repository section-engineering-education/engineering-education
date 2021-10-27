It is unsuitable to have to reform our aplication components every time we have a change in our application data . More than data/statistics is needed to have a credible data-driven application that is captivating to an extensive variety of business users.

In data-driven application , the application flow is governed by data processed by the application. The data-set input may change your applications behavior. This means your decisions are influenced by data.

This article will focus on data-driven applications in react.

#### Prerequisites

- A suitable IDE such as VS Code , IntelliJ , NetBeans e.t.c
- Basic knowledge of React
- Basic understanding of Relay framework

#### key takeaways

- Get to know what is data driven applications
- data-driven components
- How to build data-driven applications

#### Examples of React frameworks used to build Data-driven applications

1. Relay - Relay helps in management of data-fetching , it does not matter the number of components in your application.

2. React-admin - This a react framework used to build data-driven applications. React-admin component guesses the format to apply based totally on the records fetched from the API. React-admin needs Data provider function for it to translate data.

3. Data-driven forms - Data Driven Forms is open source react library that allows you to store complex forms in the database so you can reuse them in numerous developer environments.

### How to build data-driven components in react
I will showcase how to build data-driven app header.

React permits us to send data to an element within the same syntax as HTML, using attributes or properties on a factor.

When building our components we will be using static JSX templates. We will be adding our React code within our HTML code .
Begin by adding html ,head,meta tag,body and title
```html
   <html>
  <head>
    <meta charset="utf-8" />
    <title>Hello</title>
 ```
 
Then we will add react library cdnjs using the code below followed by babel
 <!-- Script tags including React -->
 ```js
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.3.1/react-dom.min.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  ```
 
Lets now add font and icon toolkit (Font Awesome) ,link our css to our code and then add head closing tag and body which will contain class demo,
class notificationsFrame , id app and then add script tag text/babel variable scope followed by the rest of the code.
```html
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
   rel="stylesheet"type="text/css" />
    </head>
    <body>
    <div class="demo">
      <div class="notificationsFrame">
        <div id="app"></div>
      </div>
    </div>
    <script type="text/babel">
  ```

Lets now build our app header using  two components:
- Header component
- App component
    
  
#### The Header component
```js
   class Header extends React.Component {
        render() {
          return (
            <div className="header">
         <span className="title">Profile</span>
 </div>
          );
        }
      }
```


#### App Component
We use Header component by placing it in App component as shown below .

```js
      class App extends React.Component {
        render() {
          return (
            <div>
            <Header  title="Profile" />
            </div>
          );
        }
```


### Going data-driven

So lets begin to add some features in our app header by adding the code below in our header component below className header:

```html
      <div className="menukey"></div>
      <div className="dashTop"></div>
      <div className="dashBottom"></div>
      <div className="circle"></div>
```

Lets add some data in our Component . When we look at our [Header](https://codepen.io/1-creator/pen/qBXWVXd) as it is right now , the header component only has profile as our title.

This means we can not set the title to anything else . It would be satisfactory for us to reuse it in different elements/components of our page, the title of Profile isn't suitable for every use . Subsequently we could tell react what we want for you to set the title to something else like settings, chat e.t.c. we could exchange our

       <span className="title">Profile</span>

by passing it as a prop on the

       <Header />

by updating the usage of the component setting the attribute called title to a string, like so:

      <span className="title">{this.props.title}</span>
      
Lets now add a search bar in our app header to make it more interactive.

```js
      <input type="text"
        className="search"
       placeholder="Search ..."
       />
```

below is our search icon in our code below our search bar above our closing tags.
```js
      <div className="fa fa-search searchIcon"></div>
      </div>
```

Now call our Header component three times by addding the following code inside the `div` in our App component as shown below:
```js
    <div>
    <Header  title="Profile" />
    <Header title="Settings" />
    <Header title="Chat" />
    </div>
```

Don't forget to call `react.Dom` to place your app on the page:
```js
   ReactDOM.render(
  <App />, document.querySelector("#app"));
```
Lastly add the closing tags
      </script>
    </body>
   </html>
   
This results in three Header components to mount like [so](https://codepen.io/1-creator/full/XWarzzL):

Now we are able to reuse the Header component with a dynamic title property.

### Some Examples of data-driven react github projects you can folk and practice

- [Relay-starter-example](https://github.com/1-creator/relay-starter-example) fully documented .(If you are a beginner you can begin practicing using this project due to its simplicity.It will help you get started with Relay framework.The project contains less boilerplate making the code easier to uderstand)
- [React-data-menu](https://github.com/dkozar/react-data-menu)
- [Data-driven-carousel](https://github.com/JasonShin/React-Carousel-Data-Driven)
- [data-driven-motion](https://github.com/tkh44/data-driven-motion)

### Other examples of data-driven real-world applications

1. Survey monkey where you can make a questionnaire and have people answer. The output you see is driven by data. Data in this case is what has been input and its processing “drives” the result.

2.  Quora - data in general is input.Quora is a data-driven application but in a different way.It has statistics but the value of the application is not particularly in what is written but rather in what is read .Hence the output is not entirely driven by data.

3. Login form -Here the data (username, password) is transferred from database of that particular website (vice-versa).

4. Twitter which is data-driven in a case that you input data in the app e.g by posting tweets. Then the data you add allows you to create an account and login. Also twitter uses data-driven practices for ads.

#### Conclusion

"Data-driven programming can probably have different meanings, but here is the one I use it for: it is a style of programming in which specialization is done through data structures and not boilerplate code." ~Pierre Chapuis .

Be sure to practice from the projects and aspire to learn something new.

Happy Coding!
