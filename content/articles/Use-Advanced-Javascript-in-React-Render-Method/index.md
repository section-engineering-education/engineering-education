# Use Advanced Javascript in React Render Method

date:2/19/2022

#### Topics:Reactjs

![Reactjs](/engineering-education/content/articles/Use-Advanced-Javascript-in-React-Render-Method/hero.png "by the end, you will be able to do this")

### Introduction to React Render Method
---

The render() method is the only required method in a class component. When called, it should examine props and this.state and return one of the following React elements Arrays, fragments, Portals, String, numbers and Booleans or null.

As I was going through react tutorials I noticed something, most React code has minimal use of advanced JavaScript. Through the use of if-else statements and conditions such as && lot can be achieved while rendering components, From choosing the data to be rendered at specific times of the day to eye catching front-end design achievements.

At first, I was not using advanced JavaScript in my web apps but now through this knowledge I have confidence in React and I hope by the end you will also have.
Let's get coding guys.

### Prerequisites
---

The only thing that you should have is an Environment setup for Reactjs
1. Have Nodejs installed in your local machine click [here](https://nodejs.org/en/download/)
2. Create a React app 

```cmd 
npm create-react-app <nameofapp>
```

### What Will be Covered
---
1. Render With an If Else Condition.
2. Use a Ternary Expression for Conditional Rendering.
3. Use && for a more Concise Conditional.
4. Render Conditionally from Props.
5. Use Array.map() to Dynamically Render Elements.
6. Render React on the Server with .renderToString.


### Render with an If Else Condition.
---

JavaScript conditionals render what you want.
Using JavaScript to control the rendered view is like tying elements to a rendered condition.
If Else statements are the most used in programing across popular Programing languages for condition evaluation.
When the condition is true, one view renders. When it's false, a different view is rendered. You can do this with an if/else statement in the render() method of a React component.

let's get into the code world, pay attention to the comments.
first, let's create a component and call it ConditionComponent and then create an arrow function for a click handler that will be used if the state is true and else won't work.

```javascript
class ConditionComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true
    }
 }

  toggleDisplay=()=>{
    this.setState({
      display: !this.state.display
    });
  }
  render() {

    if (this.state.display) {
      return (
         <div>
           <button onClick={this.toggleDisplay}>click to display</button>
           <h2>Displayed</h2>
         </div>
      );
```
The render in this case uses an if/else statement to check the condition of this.state.display and evaluates if it should render anything when a button click is called.

### Use a Ternary Expression for Conditional Rendering.
---

The ternary operator is utilized as a shortcut for if/else statements, they are very popular among React developers. the reason for this is because of how JSX is compiled, if/else statements can't be inserted directly into JSX code.

Ternary expressions can be an excellent alternative if you want to implement conditional logic within your JSX. A ternary operator has three parts  the condition part lets us state the condition we want, the second part is rendered if condition is true and the third part is rendered if condition is false , here's the basic syntax:

```javascript
condition ? expressionIfTrue : expressionIfFalse;
 ```

In the example that am about to show you, a user will only be able to access restricted content if only he satisfies the conditions given.

1. Lets create the state for holding users age and state for input field.
2. handle functionality of input field.
3. handle the submition of input entered as age.
4. create elements to be used for condition rendering.

```javascript
class Authapp extends React.Component {
    //create the state for holding users age and state for input field 
  constructor(props) {
    super(props);
    this.state = {
      ageOfUser: '',
      input: ''
    }

  }

  //handles functionality of input field
  handleChange=(e)=>{
    this.setState({
      input: e.target.value,
      ageOfUser: ''
    });
  }
  //handles the submition of input  entered as age
  submit=()=>{
    this.setState(state => ({
      ageOfUser: state.input
    }));
  }
  render() {
      //the elements to be used for condition rendering
    const button1 = <button onClick={this.submit}>Submit</button>;
    const button2 = <button>You May Enter</button>;
    const button3 = <button>You Shall Not Pass</button>;
    return (
      <div>
        <h3>Enter Your Age to Continue</h3>
        <input
          type="number"
          value={this.state.input}
          onChange={this.handleChange} /><br />
          {
          this.state.ageOfUser === ''
            ? button1
            : this.state.ageOfUser >= 18
              ? button2
              : button3
          }
      </div>
    );
  }
};
```

In Real Projects You can also combine several ternary expressions and still work.


### Use && for a more Concise Conditional.
---

We have gone through if/else statements but in React we don’t have to do a full if/then statement if you dont want to. You can Just write the condition you are checking using this syntax

```javascript
{condition && <h1>content</h1>}
```
 We only need to check the condition and see if it returns true or false. We are checking the value of the state. If the value is true, then you return the value to the right of &&, if the condition is false, it returns nothing.

The demonstration below is using the "condition" which is set in the state as a boolean.
If the boolean is true the content included in the {} with the condition will display, if not it will not display

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: true
    }
  }
  toggleDisplay=()=>{
    this.setState(state => ({
      display: !state.display
    }));
  }
  render() {
    return (
       <div>
         <button onClick={this.toggleDisplay}>click</button>
         {this.state.content && <h1>Displayed!</h1>}
       </div>
    );
  }
};
```

This works because in JavaScript, true && expression always evaluates to expression, and false && expression always evaluates to false.


### Render Conditionally from Props.
---

So far, we have seen how to use if/else, &&, and the ternary operator (condition ? expressionIfTrue : expressionIfFalse) to make conditional decisions about what to render and when as UI.

Then what am about to show you lets you combine any or all of these concepts with another powerful React feature: props. Using props for conditional rendering is very common with developers that is, they use the value of a given prop to automatically make decisions about what to render.

am going to show you how this works out with a game that I got from my favorite website the game of chance.

first, we have to Use Math.random() with the ternary operator to return true or false.

```javascript
const chanceCreation = Math.random() >= 0.5 ? true : false
```
This will be used to evaluate our results through props, Let's create a component and call it Ouranswers.


```javascript
class Ouranswers extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <h1>
      {this.props.chance ? "You Win" : "You Lose"}
      </h1>
    )
  };
};

class Choosengame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }
  handleClick=()=>{
    this.setState({
      count: this.state.count + 1
    });
  }
  render() {
    const chanceCreation = Math.random() >= 0.5 ? true : false
    return (
      <div>
        <button onClick={this.handleClick}>Play</button>
        <Results chance={chanceCreation} />
        <h2>{'Turn: ' + this.state.count}</h2>
      </div>
    );
  }
};
```

### Use Array.map() to Dynamically Render Elements.
---

As conditional rendering is useful, you may need your components to render an unknown number of jsx elements.

In reactive programming, a programmer does not know the state of an application until runtime as much depends on the user interactivity with the application so the program should be able to handle the unknown state ahead even before users get to use it, this is where Array.map() in React comes in to help.

in this example we will see Array,map being used in a simple Shopping List App, in an application like this the programmer can't tell the number of list a user may create a day.

Lets create a component for our ShoppingApp.

```javascript
class ShoppingApp extends React.component{
    constructor(){
        super(props)
        //create state for the user input and List made 
        this.state={
            userList:'',
            shoppingList:''
        }
    }
    handleSubmit=()=>{
        const itemsArray=this.state.userList.split('')
        this.setState({
            shoppingList:itemsArray
        })
    }
    handleChange=(e)=>{
        this.setState({
            userList:e.target.value
        });
    }
    render(){
        const items=this.state.shoppingList.map(i=> <li>{i}</li>);
    }
    return(
        <div>
         <textarea
              onChange={this.handleChange}
              value={this.state.userlist}
              placeholder="one item at a time"
            />
            <br/>
            <button onClick={this.handleSubmit}>
            add item
            </button>
            <h2>
            Shopping List
            </h2>
            <ul>
            {items}
            </ul>
        </div>
    )
}
```

### Render React on the Server with .renderToString.
---


So far, we have been rendering React components on the client. This is not what you will always do. However, there are some use cases where it makes sense to render a React component on the server.React provides a renderToString() method you can use for this purpose.

There are reasons why rendering on the server may be used in a real-world app. 
1. It's ideal for search engines that are trying to index the content of your pages so people can find you. If you render the initial HTML markup on the server and send this to the client, the initial page load contains all of the page's markup which can be crawled by search engines.
This can help with search engine optimization (SEO).
2. This creates a faster initial page load experience because the rendered HTML is smaller than the JavaScript code of the entire app.

In order to put this in action we are going to pass a class to .renderToString() just like you would pass a component to a render method.
Here is the code example for clarity

```javascript
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>
  }
};


ReactDOMServer.renderToString(<App />);
```

For more examples on renderToString using Nodejs, you can click [here](https://www.tabnine.com/code/javascript/functions/react-dom/renderToString)



### Resources
1. [React.org](https://reactjs.org/)
2. [create-react-app](https://create-react-app.dev/docs/getting-started/)
3. [React (JavaScript library)](https://en.wikipedia.org/wiki/React_(JavaScript_library))

### Conclusion
In this tutorial, you have an understanding of the usage of Render() method in a React application and enabled server-side rendering.

This is just the surface of what’s possible. Things tend to get a bit more complicated once data fetching and Redux also need to be part of development.

If you’d like to learn more about React, take a look at Codecademy or check out [React page](https://reactjs.org/) for documentation.
