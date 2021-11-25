#### Implementing Frontend Pagination in React Using Class Components and Tailwind CSS
To improve the user experience and allow easy navigation on a website, most websites do not show all the fetched data on a single web page. Most developers implement pagination that enables the data to be displayed on a sequence of pages. The user can easily navigate from one page to another with the click of a button.

Pagination can be implemented on the server-side or the client-side. On the server-side, the client requests data in groups e.g., the client can request a list of the first ten items from an API or the database. Then when the user clicks the next button on the webpage, another group of data is requested from the server.

In this article, we will take a look at client-side pagination. This is where the client fetches all the data and stores it in a state. Pagination can then be implemented on the front end. We will use React(a JavaScript library for building user interfaces) and we will style our webpage using Tailwind CSS.

#### Prerequisites
To be able to follow along, the reader should have:
- Basic React knowledge.
- Node.js installed.
- Basic understanding of the Fetch API
- A code editor and a browser.

#### Goal
This article will enable the user to:
- Implement front-end pagination in React.
- Use React class component.
- Style a webpage using Tailwind CSS.
- Implement a loading state when the data is being fetched.

#### Setting up our Project
To get started, open a terminal and navigate to where you want to create your project, and then run the following command:
```bash
npx create-react-app react-tailwind-pagination
```
The above command will create your React app.

Run the following commands to `cd` into your project and open it in your code editor, in this case, VS Code.

```bash
cd react-tailwind-pagination

code .
```

As we are going to use Tailwind CSS to style our webpage, click [here](https://tailwindcss.com/docs/guides/create-react-app) to get step-by-step instructions on how to install it in our project.

#### Installing Dependencies
in this project we will only require one dependency. Use the command below to install it:

```bash
npm i react-loader-spinner
```
The above command installs a package that we will use to show the loading animation as the data is being fetched from the API.

#### Getting Started with Pagination
Open the `App.js` file and modify the code with the one provided below.

```js
import React, { Component } from "react";
import Loader from "react-loader-spinner"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      posts: [], 
      loading: null,
      postsPerPage: 5
    };
  }
  render() {
   

    return (
      <div className="w-4/5 mx-auto">

        <h2 className="text-2xl text-center font-bold">React Pagination Using Class Components and Tailwind CSS</h2>
        <hr />
      </div>
    );
  }
}

export default App;
```
**Code explanation:**

In our code, we have defined five initial states as described below;
- `currentPage` - This state will hold the value of the page the client is currently on. The default value is page 1. This state will be continuously updated as the user navigates from one page to the other. 
- `posts` - This state will be the data that will be fetched from the API. Its initial state is an empty array.
-  `loading` - This state will hold the value of the loading state. It can only take two values, `true` or `false`. If the loading state is true, a loading spinner will be displayed. If it is false, the actual content, i.e the posts, will be displayed.
- `postsPerPage` - This state will hold the number of posts that will be displayed per page. This can be adjusted to suit a person's needs.


#### Fetching the Data
To fetch the data, paste the following code under the `constructor()` method:
```js
componentDidMount() { 
    this.setState({loading: true})
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then(data => {
        this.setState({ posts: data });
        this.setState({loading: false})
    })
  }
```
**Code explanation**:

In the code above, we are fetching the data after the component mounts. We achieve this by use of the `componentDidMount()` method.

When the component mounts, we set the loading state to true by use of the `setState()` method that updates the value of the state.

We then get the data from the `jsonplaceholder` API using the fetch API. After the data has been fetched, we store it in the posts state using `this.setState({ posts: data })`. The loading state is then set to `false`.

#### Displaying the Data on the Webpage
To display the data on the webpage, we will use the `map()` method. Click [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to learn more about how the map method works.

Paste in the following code below the in the `return()` section below the `<hr />` tag:
```js
{
    this.state.loading === true
    ? 
    <div className="w-full h-screen flex items-center justify-center">
        <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
        />
    </div>
    :          
    posts.map((post, id) => (
    <div key={id} className="border-2 border-blue-500 rounded m-4 p-4">
        <div className="text-lg font-bold">{post.title}</div>
        <div className="mt-2">{post.body}</div>
    </div>
    ))
}
```

**Code explanation:**

In the code above, we are using the [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to conditionally render our posts. If the loading state is `true`, we are rendering a spinner from the `react-loader-spinner` package that shows that the data is still being fetched. If the loading state is `false`, we are rendering the posts.

#### Implementing Pagination
To implement pagination, paste in the following code below the `render()` method:
```js
const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;

const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;

const currentPosts = this.state.posts.slice(indexOfFirstPost, indexOfLastPost);
```
**Code explanation:**

We use the above code to get the `currentPosts`, i.e the posts we want to display on a certain page. To get this, we need to calculate the `indexOfLastPost` that is the last post on a certain page and `indexOfFirstPost` that is the first post on a certain page.

We then use the [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) array method to set posts we want to show on a certain page.

To only show the `currentPosts()`, go to the part where we render our posts and set the `map()` method to loop on the `currentPosts` array as shown below:
```js
currentPosts.map((post, id) => (
    <div key={id} className="border-2 border-blue-500 rounded m-4 p-4">
        <div className="text-lg font-bold">{post.title}</div>
        <div className="mt-2">{post.body}</div>
    </div>
))
```

#### Implementing Page Numbers
We now need to implement page numbers that the user will click on to navigate to a certain page. In the `render()` method section, add the following lines of code:

```js
const pageNumbers = []

for (let i = 1; i <= Math.ceil(this.state.posts.length / this.state.postsPerPage); i++) {
    pageNumbers.push(i);
}
```

In the above code, we create a constant `pageNumbers` that is an array that will be used to hold the number of pages. We then use `for` loop to loop through the quotient of `(posts.length / postsPerPage)` where the `posts.length` is the total number of posts and the `postsPerPage` is the number of posts on each page. We then push the values obtained from the `for` loop into the  `pageNumbers` array.

To display the values in the `pageNumbers`, paste the following code below the code that renders the posts.
```js
<div className="w-full flex justify-around">
          {
            pageNumbers.map((pageNum, index) => (
              <span key={index} 
                className={pageNum === this.state.currentPage 
                ? "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full bg-blue-500 text-white" 
                : "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full"} 
              
                onClick={() => {setPage(pageNum)}}>

                {pageNum}

              </span>
            ))
          }
        </div>
```

In the above code, we are using the `map()` method to loop through the `pageNumbers` array and display the page numbers. We are also using conditional rendering to check whether the page number is equal to the current page number. If it is, we are styling it differently to make sure that the user knows which page he/she is on.

Also, with the click of a certain page number, we are calling the `setPage()` method that we are using to help the user navigate from one page to another. The code for the `setPage()` method is provided below:

```js
const setPage = (pageNum) => {
    this.setState({currentPage: pageNum})
}
```
The function takes in the `pageNum` as an argument and uses it to update the current page state. After the `currentPage` state is updated, new values `indexOfLastPost`, `indexOfFirstPost` and `currentPosts` are calculated and the page content is updated immediately.

#### Full Code for Pagination
```js
import React, { Component } from "react";
import Loader from "react-loader-spinner"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1, //Holds the value for the current page
      posts: [], //Array where the data is stored
      loading: null, //Holds the value for the loading state.. can either be true or false
      postsPerPage: 5 //Holds the value for the number of posts per page. You can adjust to suit your needs
    };
  }

  //Fetch data on component mount
  componentDidMount() { 
    this.setState({loading: true})
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then(data => {
        this.setState({ posts: data });
        this.setState({loading: false})
    })
  }

  render() {
    //Get currentPosts
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.posts.slice(indexOfFirstPost, indexOfLastPost);

    //Implement page numbers
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(this.state.posts.length / this.state.postsPerPage); i++) {
      pageNumbers.push(i);
    }

    //Set current page
    const setPage = (pageNum) => {
      this.setState({currentPage: pageNum})
    }

    return (
      <div className="w-4/5 mx-auto">

        <h2 className="text-2xl text-center font-bold">React Pagination Using Class Components and Tailwind CSS</h2>
        <hr />

        {
          this.state.loading === true
            ? <div className="w-full h-screen flex items-center justify-center">
                <Loader
                  type="BallTriangle"
                  color="#00BFFF"
                  height={100}
                  width={100}
                />
            </div>
          :          
          currentPosts.map((post, id) => (
            <div key={id} className="border-2 border-blue-500 rounded m-4 p-4">
              <div className="text-lg font-bold">{post.title}</div>
              <div className="mt-2">{post.body}</div>
            </div>
          ))
        }

        <div className="w-full flex justify-around">
          {
            pageNumbers.map((pageNum, index) => (
              <span key={index} className={pageNum === this.state.currentPage ? "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full bg-blue-500 text-white" : "cursor-pointer flex items-center justify-center w-12 h-12 border-2 rounded-full"} onClick={() => {setPage(pageNum)}}>
                {pageNum}
              </span>
            ))
          }
        </div>
        

        <div></div>
      </div>
    );
  }
}

export default App;
```

#### Running the Project
To run the project, open your terminal and run the following command:
```bash
npm start
```

This will start a local development server. Go to `127.0.0.1:3000` and you will be able to view your webpage.

#### Conclusion
This is one way of implementing front-end pagination in react. You can go ahead and modify the code to suit your needs. You can also apply this code to your project.

Happy coding!
