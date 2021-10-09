### Building data driven  application in react

It is not very convenient to have to upgrade components every time we have a change in our application data .Hard-cording data in our application is inflexible and makes modifying data later on much more troublesome , hence its not the perfect solution .It takes more than data to have a credible data-driven application that is compelling to a wide range of business users. Lets learn about data-driven applications in react.

#### Prerequisites
- A suitable IDE such as VS Code
- A basic knowledge of React
- A basic uderstanding of Relay framework

#### key takeaways
- Get to know what is data driven applications
- data-driven components
- How to build data-driven applications


#### Some of React frameworks used to build Data-driven applications
- Relay - Relay keeps management of data-fetching easy, whether your app has tens, hundreds, or thousands of components.

- React-admin - React-admin stores the dataProvider object in a React context, so it’s available from anywhere in your application code. The useDataProvider hook exposes the Data Provider to let you call it directly.

- data-driven forms - Data Driven Forms is a React library used for rendering and managing forms with a lot of provided features based on React Final Form.

### building data-driven React  components

React allows us to send data to a component in the same syntax as HTML, using attributes or properties on a component.

#### Getting Started

Lets build a react header  with 2 components

          <Header/>

          <App/>

#### Header component
    class Header extends React.Component {
       render() {
    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop"></div>
          <div className="dashBottom"></div>
          <div className="circle"></div>
        </div>
        <span className="title">Profile</span>

         <input
          type="text"
          className="searchInput"
          placeholder="Search ..." />

        <div className="fa fa-search searchIcon"></div>
      </div>
      )
     }
    }


#### App Component 
      class App extends React.Component {
        render() {
          return (
            <div>
              <Header  title="Profile" />
            </div>
          );
        }
      }

We use Header component by placing it in App component as shown above .

### Going data-driven

Now lets give our component data to use to display .Let's start with the  Header component . Looking at our [Header](https://codepen.io/1-creator/pen/qBXWVXd) as it stands right now , the Header component only shows the title of the element as profile .

It's a nice element and it would be nice to be able to reuse it in other parts of our page, Hence the title of Profile doesn't make sense for every use . So lets tell react we want to be able to set the title to something else.

Now lets change our                                                 
                
                <span className="title">Profile</span> 
by passing it  as a prop on the

       <Header />
 by updating the usage of the component setting the attribute called title to some string, like so: 

      <span className="title">{this.props.title}</span>

Now call our Header component three times by addding the following code inside div in our App component.

            <Header  title="Profile" />
            <Header title="Settings" />
              <Header title="Chat" />

Don't forget to call react.Dom to place your app on the page

       ReactDOM.render(
        <App />, document.querySelector("#app"));

This results in four Header  components to mount like [so](https://codepen.io/1-creator/full/XWarzzL):

 Now we can reuse the Header component with a dynamic title property.

 ### Some Examples of data-driven react github projects you can folk and practice

 - [Relay-starter-example](https://github.com/1-creator/relay-starter-example) fully documented .
 A simple example of how to get started with Relay using some slightly different approaches to relay-starter-kit that may make it easier to navigate for first-   time users, especially Node.js users.Unlike relay-starter-kit, this project uses Browserify instead of Webpack, does not use a proxy for the GraphQL endpoint and does not require ES6 features for any server-side code, so it can be run directly with node  resulting in less boilerplate and making it easier to understand the code.
 - [React-data-menu](https://github.com/dkozar/react-data-menu)
 - [Data-driven-carousel](https://github.com/JasonShin/React-Carousel-Data-Driven)
 - [data-driven-motion](https://github.com/tkh44/data-driven-motion) 

### Some Examples of data-driven real-world applications
- survey monkey-you can make a questionnaire and have people answer. The output you see is driven by data. Data in this case is what has been input and its processing “drives” the result.
- Quora - data in general is input.Quora but in a different way. While it still has statistics, the real value of the application isn’t so much in what is written but rather in what is read and output is not entirely driven by data because you can still google and reach an answer that wouldn’t show up in your digest (for example).
- Login form -Here the data (username, password) is transferred from database of that particular website (vice-versa).

#### Reference

https://stackoverflow.com/questions/828207/what-is-your-attitude-towards-hard-coding

https://github.com/fullstackreact/30-days-of-react/blob/master/day-05/post.md

https://www.newline.co/fullstack-react/assets/media/sGEMe/MNzue/30-days-of-react-ebook-fullstackio.pdf

 #### Conclusion
 "Data-driven programming can probably have different meanings, but here is the one I use it for: it is a style of programming in which specialization is done through data structures and not boilerplate code."~Pierre Chapuis . I hope you have learned something from this article. Make sure to practice from the projects.

 Happy Coding
