### Introduction
Ruby on Rails is a popular web framework for developing server-side applications. Most of the applications found worldwide are built with Ruby on Rails. Developers find it useful since it provides various tools needed to develop and maintain modern web applications. It is supported by experienced programmers and an active online community that keeps on improving it.

On the other hand, React is a frontend JavaScript library used to build client-side user interfaces. With React, the frontend development is made easy, organized, and efficient since it supports state management, component architecture, and virtual Document Object Model (DOM).

The web application benefits from the latest advancements in frontend development and JavaScript through React in rendering components from Rails. Also, powerful applications suited for current trends are assured when frontend development using frameworks are separated from the server-side coding.

In this article, we will utilize React and Ruby on Rails to create a simple to-do list application. We will use React to create the application's frontend that retrieves data in JSON format from the backend, which will run on Rails.

### Prerequisites
- [Ruby on Rails](https://www.ruby-lang.org/en/downloads/) framework installed
- [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) package installed
- [Yarn](https://yarnpkg.com/) package manager installed
- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#download-and-install) installed
- A text editor installed preferably [VS code](https://code.visualstudio.com/download)
- A web browser installed, preferably [Google Chrome](https://www.google.com/chrome/)
- Proficient in [React](https://reactjs.org/tutorial/tutorial.html), [Ruby on Rails](https://guides.rubyonrails.org/), [JavaScript](https://www.codecademy.com/learn/introduction-to-javascript), [Heroku](https://devcenter.heroku.com/start), and [Axios](https://masteringjs.io/axios)

### Setting up the backend – The Rails API
First, we will create the backend and browse to the project directory created by running the below commands in the terminal:

```bash
$ rails new tdlist-api --api
$ cd tdlist-api
```

We will proceed and open the project directory in the VS code editor and modify the file `Gemfile` by adding the below lines:

```gem
gem 'rack-cors', :require => 'rack/cors'
```

Note, we will use `Heroku` to deploy our application later. We will need to add `sqllite3` in the file `Gemfile` development group section for development and testing purposes as below:

```gem
group :development, :test do
  # for development purposes
  gem 'sqlite3'
end
```

If the need arises, we can then proceed to add `pg` gem to the production group section for production purposes in order to utilize `Postgresql` as below:

```gem
group :production do
  # for production purposes
  gem 'pg'
end
```

We will need to generate our model and controller for our application’s backend. We will start by generating the model named `Tdlist` by running the below command:

```bash
$ rails g model Tdlist title:string done:boolean
```

Then, we proceed to generate our controller called `Tdlists` by executing the below command:

```bash
$ rails g controller Tdlists index create update destroy
```

Finally, the below command will generate a table that contains data in the `SQLite` database instance called `tdlists`:

```bash
$ rails db:migrate
```

Our backend is now set. Next, we will start by editing the file `config/routes.rb`. Here, we will specify the new routes for our backend API as below:

Rails.application.routes.draw do

```rb
Rails.application.routes.draw do
  scope '/api/version1' do
    resources :tdlists
  end
end
```

We have used `resources` to utilize `POST`, `PUT`, `GET`, and `DELETE` actions in our backend.

As of now, we are dealing with the controller. Next, we are going to utilize the above actions we have defined in the below code. We will navigate to the file `app/controller/tdslist_controller.rb` and paste the following code:

```rb
class TdslistController < ApplicationController
  def index
    tdlists = Tdlist.order("created_at DESC")
    render json: tdlists
  end

  def create
    tdlist = Tdlist.create(tdlist_param)
    render json: tdlist
  end

  def update
    tdlist = Tdlist.find(params[:id])
    tdlist.update(tdlist_param)
    render json: tdlist
  end

  def destroy
    tdlist = Tdlist.find(params[:id])
    tdlist.destroy
    head :no_content, status: :ok
  end

  private
    def tdlist_param
      params.require(:tdlist).permit(:title, :done)
    end
end
```

Next, we will start our server by running the below command in the terminal:

```bash
$ rails server
```

Then, we navigate to the link <http://localhost:3000/api/version1/tdlists>. A blank page will be displayed since there have no data so far.

We will proceed and edit file `db/seeds.rb` to populate some to-do items and check if our API works as expected:

```rb
Tdlist.create(title: "Schedule meetings: IT, Accounts, HR", done: false)
Tdlist.create(title: "Visit children's home: perform duties", done: false)
```

Then we execute the below command:

```bash
$ rails db:seed
$ rails server
```

We can then proceed and refresh our page, and the following JSON data will be displayed on the browser:

![json](/engineering-education/how-to-implement-a-react-application-using-rails-api/json-capture.PNG)

Our backend is now complete.  We will configure our frontend to run on port 4000 and the backend to run on port 3000. Then will run our application in a local development environment using `Heroku CLI`.  To achieve this, we will proceed and create a file named `Procfile.windows` in the project root directory and paste the below lines of commands:

```dev
api: bundle exec rails server –p 3000
web: yarn --cwd tdlist-app start
```

The above commands execute both React application and the Rails server on Heroku.

### Creating the frontend – React Application
We will start by creating the React application globally by running the below commands:

```bash
$ npm install -g create-react-app
$ create-react-app tdlist-app
```

In the Rails root directory, a new folder called `tdlist-app` containing React files and components will be generated. Then we will execute the below command to start the React application:

```bash
$ yarn --cwd tdlist-app start
```

The below default React page will be displayed after running the above command:

![React app default page](/engineering-education/how-to-implement-a-react-application-using-rails-api/reactapp-default-page.PNG)

Next, we will specify the React application on which port our Rails server is running on in development mode. To achieve this, we will edit the file `tdlist-app/package.json` by adding the below line of command:

"proxy": "http://localhost:3000"

The above line instructs the React application to communicate through a proxy in development mode to the backend using port 3000. To call our backend API running on the link <http://localhost:3000/api/version1/tdlists>  from the application, we will only need to call `/api/version1/tdlists` instead of the whole link**.**

We will also need to update our `package.json` with the following lines to ensure that our React application runs on port 4000 instead of default port 3000:

```json
"start": "set PORT=4000 && react-scripts start"
```

Our updated `package.json` will appear as below:

![package.json](/engineering-education/how-to-implement-a-react-application-using-rails-api/package-json.PNG)

We will now call our `Procfile.windows` file we earlier created by running the below command:

```bash
$ heroku local -f Procfile.windows
```

The above command runs the Rail API and the React application. To access it, we can browse to <http://localhost:4000>.

### Creating React components
In this section, we will build the components our application will use. We navigate to `tdlist-app/src/components` directory and create a new file named `TdlistsContainer.js` and paste the below code:

```typescript
import React, { Component } from 'react'

class TdlistsContainer extends Component {
  render() {
    return (
      <div>
    <div className="taskContainer">
      <input className="newTask" type="text"
        placeholder="Input a New Task and Press Enter" maxLength="75" />
    </div>
    <div className="wrapItems">
       <ul className="listItems">
       </ul>
    </div>
      </div>
    )
  }
}

export default TdlistsContainer
```

Then we will edit the file `App.js` to import our new component as below:

```typescript
import React, { Component } from 'react';
import './App.css';
import TdlistsContainer from './components/TdlistsContainer'

class App extends Component {
  render() {
    return (
      <div className="mainContainer">
        <div className="topHeading">
          <h1>A Simple To-Do List App</h1>
        </div>
        <TdlistsContainer />
      </div>
    );
  }
}

export default App;
```

Then edit `App.css` as below:

```css
.mainContainer {
    width: 35%;
    height: 500px;
    position: relative;
    border-radius: 7px;
    margin: 0 auto;
}

.wrapItems {
    position: absolute;
    bottom: 55px;
    top: 170px;
    right: 0;
    left: 0;
    overflow: auto;
}

.topHeading {
    color: rgb(48, 2, 2);
    font-family: 'Times New Roman', Times, serif, sans-serif;
    padding: 7px;
    text-align: center;
}

ul.listItems {
    padding: 0 30px;
}

input.itemCheckbox {
    margin-right: 8px;
    position: relative;
    -webkit-appearance: none;
    float: left;
    border: 1.5px solid #ccc;
    width: 18px;
    height: 18px;
    border-radius: 7px;
    cursor: pointer;
    text-align: center;
    outline: none;
    margin-left: 7px;
    font-weight: bold;
}

li.item {
    font-family: 'Times New Roman', Times, serif;
    list-style-type: none;
    font-size: 1.5em;
    border-bottom: 2px solid rgba(80, 2, 90, 0.411);
    padding: 5px 0;
}

li.item:hover .removeItemButton {
    opacity: 2;
    visibility: visible;
}

input.itemCheckbox:checked:after {
    color: green;
    width: 15px;
    content: "\2713";
    font-size: 15px;
    display: block;
    height: 15px;
    left: 0.7px;
    position: absolute;
    bottom: 1.8px;
}

input.itemCheckbox:checked + label.itemDisplay {
    color: #f807a8;
    text-decoration: line-through;
}

input.itemCheckbox + label.itemDisplay {
    color: black;
}

input[placeholder] {
    font-size: 1.2em;
}

.taskContainer {
    padding: 15px;
}

.removeItemButton {
    float: right;
    visibility: hidden;
    color: red;
    background: rgba(0,0,0,0);
    font-size: 25px;
    font-weight: bold;
    line-height: 0;
    border: 1px solid white;
    border-radius: 50%;
    padding: 10px 5px;
    opacity: 0;
    margin-right: 7px;
    cursor: pointer;
}

.taskContainer .newTask {
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 25px;

}
```

Next, we will refresh the frontend link: <http://localhost:4000>. The below page will be displayed:

![to-do list](/engineering-education/how-to-implement-a-react-application-using-rails-api/todo-list.PNG)

### Calling the API
In this section, we will fetch the data from our backend. We will use `Axios` to fetch or store data. First, we will install `Axios` by running the below command and then import it into our component as below:

```bash
$ cd tdlist-app
$ npm install axios --save
```

#### Getting to-do list items
We will edit our component to initialize the state and the component’s behavior. We will then add the `componentDidMount` function to load the to-do item lists as below:

```typescript
import React, { Component } from 'react'
import axios from 'axios'

class TdlistsContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          tdlists: []
        }
      }

      loadTdlists() {
        axios.get('/api/version1/tdlists')
        .then(res => {
          this.setState({tdlists: res.data})
        })
        .catch(error => console.log(error))
      }

      componentDidMount() {
        this.loadTdlists()
      }

  render() {
    return (
      <div>
    <div className="taskContainer">
      <input className="newTask" type="text"
        placeholder="Input a New Task and Press Enter" maxLength="75"
        onKeyPress={this.createTodo} />
    </div>
    <div className="wrapItems">
       <ul className="listItems">
           {this.state.tdlists.map((tdlist) => {
               return(
              <li className="item" tdlist={tdlist} key={tdlist.id}>
                  <input className="itemCheckbox" type="checkbox" />
                  <label className="itemDisplay">{tdlist.title}</label>
                  <span className="removeItemButton">x</span>
              </li>
              )
              })}
       </ul>
    </div>
      </div>
    )
  }
}

export default TdlistsContainer
```

Then we need to restart our `Heroku local` and refresh the page, and the below results will be displayed:

![to-do list updated](/engineering-education/how-to-implement-a-react-application-using-rails-api/todo-list-updated.PNG)

#### Adding new to-do list item
To add a new to-do list item, we will call `POST/api/version1/tdlists`. We need a new function that will enable us to add new to-do list items, and then we proceed to update the state. We will utilize the [immutability-helper](https://www.npmjs.com/package/immutability-helper) to update the state. We will run the below commands to install the package, and then we import it into our component:

```bash
$ npm install immutability-helper --save
```

```typescript
import update from 'immutability-helper'
```

We will then update the textbox attributes to have an `onKeyPress` event as below:

```typescript
<input className="newTask" type="text"
  placeholder="Input a New Task and Press Enter" maxLength="75"
  onKeyPress={this.newTdlist} />
```

Then, we create a `newTdlist` function as below:

```typescript
newTdlist = (e) => {
  if (e.key === 'Enter' && !(e.target.value === '')) {
    axios.post('/api/version1/tdlists', {tdlist: {title: e.target.value}})
    .then(res => {
      const tdlists = update(this.state.tdlists, {
        $splice: [[0, 0, res.data]]
      })

      this.setState({
        tdlists: tdlists,
        inputValue: ''
      })

    })
    .catch(error => console.log(error))
  }
}
```

In the above code snippet, we added a new to-do list item at the top of the `tdlists` array through the use `$splice` function. We can then proceed and add a new to-do list item to test the application.

We can note that after adding a new to-do list item, the value of textbox remains the same. To clear the text box we add the below code:

```typescript
this.state = {
  tdlists: [],
  inputValue: ''
}
```

To update the state with new parameter we defined in the above code snippet we paste the below code:

```typescript
this.setState({
  tdlists: tdlists,
  inputValue: ''
})
```

We will proceed and add a new function that is invoked whenever value of textbox changes:

```typescript
handleChange = (e) => {
  this.setState({inputValue: e.target.value});
}
```

Finally we will edit the textbox to have new attributes:

```typescript
<input className="newTask" type="text"
 placeholder="Input a New Task and Press Enter" maxLength="75"
 onKeyPress={this.newTdlist}
 value={this.state.inputValue} onChange={this.handleChange} />
```

#### Updating to-do list items
To mark the to-do list as done we will modify the checkbox element and create a new function that updates the state as below:

```typescript
<input className="itemCheckbox" type="checkbox"
  checked={tdlist.done}
  onChange={(e) => this.modifyTdlist(e, tdlist.id)} />
```

```typescript
modifyTdlist = (e, id) => {
  axios.put(`/api/version1/tdlists/${id}`, {tdlist: {done: e.target.checked}})
  .then(res => {
    const tdlistIndex = this.state.tdlists.findIndex(x => x.id === res.data.id)
    const tdlists = update(this.state.tdlists, {
      [tdlistIndex]: {$set: res.data}
    })
    this.setState({
      tdlists: tdlists
    })
  })
  .catch(error => console.log(error))
}
```

#### Deleting to-do list items
To delete a to-do list item, we will update span element as below:

```typescript
<span className="removeItemButton"
  onClick={(e) => this.removeTdlist(tdlist.id)}>
  x
</span>
```

We will then create a `removeTdlist` function:

```typescript
removeTdlist = (id) => {
axios.delete(`/api/version1/tdlists/${id}`)
 .then(res => {
   const tdlistIndex = this.state.tdlists.findIndex(x => x.id === id)
   const tdlists = update(this.state.tdlists, {
    $splice: [[tdlistIndex, 1]]
   })
   this.setState({
    tdlists: tdlists
   })
 })
.catch(error => console.log(error))
}
```

The application is now ready for testing.

### Wrapping up
We have successfully implemented a React application and created the component, `TdlistsContainer`. We have handled the behavior of our application using the React state.

On the other hand, with Rails, we have built our backend that handles the JSON data as we deal with our frontend. We used the main container to render the User Interface instead of using components to make things simple. This gave us more time to focus on other significant concepts and data flow.
The code used in this tutorial can be found at my [GitHub Repo](https://github.com/kerubo-tech/my-projects).
