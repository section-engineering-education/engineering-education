### Building data driven  application in react

It is not very convenient to have to upgrade components every time we have a change in our application data  .It takes more than data to have a credible data-driven application that is compelling to a wide range of business users.In data-driven application , the application flow is governed by data processed by the application. The data-set  input may change your applications behavior .This means your decisions are influenced by data. Lets learn about data-driven applications in react.

#### Prerequisites
- A suitable IDE such as VS Code,IntelliJ,NetBeans e.t.c
- A basic knowledge of React
- A basic understanding of Relay framework

#### key takeaways
- Get to know what is data driven applications
- data-driven components
- How to build data-driven applications


#### Some of React frameworks used to build Data-driven applications
- Relay - Relay helps in management of data-fetching it does not matter the number of components in your application.

- React-admin - React-admin reserves the dataProvider object in a React context, this makes it available from anywhere in your application . The useDataProvider hook displays the Data Provider , this makes it possible for you to call it directly.

- data-driven forms - Data Driven Forms is open source react library it allows you to store complex forms in the database so you can reuse them in numerous developer environments.

### building data-driven React  components

React allows us to send data to a component in the same syntax as HTML, using attributes or properties on a component.

#### Getting Started

Lets build a react header  with two components which are;

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

Lets add some data in our Component . Looking at our [Header](https://codepen.io/1-creator/pen/qBXWVXd) as it stands right now , the Header component only shows the title of the element as profile .

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

 - [Relay-starter-example](https://github.com/1-creator/relay-starter-example) fully documented .(If you are a beginner  you can begin practicing using this project due to its simplicity.It will help you get started with relay.It contains less boilerplate making the code easier to uderstand)
 - [React-data-menu](https://github.com/dkozar/react-data-menu)
 - [Data-driven-carousel](https://github.com/JasonShin/React-Carousel-Data-Driven)
 - [data-driven-motion](https://github.com/tkh44/data-driven-motion) 

### Some Examples of data-driven real-world applications
- survey monkey-you can make a questionnaire and have people answer. The output you see is driven by data. Data in this case is what has been input and its processing “drives” the result.
- Quora - data in general is input.Quora is a data-driven application but in a different way.It has statistics but the value of the application is not particularly in what is written but rather in what is read .Hence the output is not entirely driven by data .
- Login form -Here the data (username, password) is transferred from database of that particular website (vice-versa).
- twitter-twitter is data-driven in a case that you input data in the app e.g by posting tweets.And the data you add allows you to create an account and login.Also twitter uses data-driven practices  for ads.


 #### Conclusion
 "Data-driven programming can probably have different meanings, but here is the one I use it for: it is a style of programming in which specialization is done through data structures and not boilerplate code."~Pierre Chapuis . Make sure to practice from the projects and aspire to learn something new.

 Happy Coding
