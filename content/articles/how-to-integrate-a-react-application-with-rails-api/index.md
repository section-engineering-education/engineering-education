---
layout: engineering-education
status: publish
published: true
url: /how-to-integrate-a-react-application-with-rails-api/
title: How to Integrate a React Application With Rails API
description: This tutorial discusses about the Ruby on Rails framework and its API-only mode feature that helps in the development of backend applications. We will create a to-do list app using React then build its backend using Ruby API.
author: lilian-kerubo
date: 2021-10-29T00:00:00-10:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/how-to-integrate-a-react-application-with-rails-api/hero.jpg
    alt: How to Integrate a React Application With Rails API Hero Image
---
Ruby on Rails is a popular web framework for developing server-side applications. Most of the applications found worldwide are built with Ruby on Rails. Developers find it useful since it provides various tools needed to develop and maintain modern web applications. It is supported by experienced programmers and an active online community that keeps improving it.
<!--more-->
On the other hand, React is a frontend JavaScript library used to build client-side user interfaces. With React, frontend development is made easy, organized, and efficient since it supports state management, component architecture, and virtual Document Object Model (DOM).

Powerful applications suited for current trends are assured when frontend development is separated from the server-side coding.

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
First, we will create the backend and browse to the project directory created by running the commands below in the terminal:

```bash
$ rails new tdlist-api --api
$ cd tdlist-api
```

We will proceed to open the project directory in the VS code editor and modify the file `Gemfile` by adding the lines below:

```bash
gem 'rack-cors', :require => 'rack/cors'
```

Note, we will use `Heroku` to deploy our application later. We will need to add `sqllite3` in the `Gemfile` development group section for development and testing purposes as shown below:

```bash
group :development, :test do
  # for development purposes
  gem 'sqlite3'
end
```

If the need arises, we can proceed to add `pg` gem to the production group section for production purposes in order to utilize `Postgresql` as shown below:

```bash
group :production do
  # for production purposes
  gem 'pg'
end
```

We will need to generate our model and controller for our application’s backend. We will start by generating the model named `Tdlist` by running the command below:

```bash
$ rails g model Tdlist title:string done:boolean
```

Then we proceed to generate our controller named `Tdlists` by executing the command below:

```bash
$ rails g controller Tdlists index create update destroy
```

Finally, the command below will generate a table that contains data in the `SQLite` database instance named `tdlists`:

```bash
$ rails db:migrate
```

Our backend is now set.

Next, in the `config/routes.rb` file, specify the new routes for our backend API as shown below:

```rb
Rails.application.routes.draw do
  scope '/api/version1' do
    resources :tdlists
  end
end
```

We have used `resources` to utilize `POST`, `PUT`, `GET`, and `DELETE` actions in our backend.

As of now, we are dealing with the controller. Next, we are going to utilize the actions we defined above in the code below.

Navigate to the `app/controller/tdslist_controller.rb` file and paste the following code:

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

Next, we will start our server by running the command below in the terminal:

```bash
$ rails server
```

Then, we navigate to the link <http://localhost:3000/api/version1/tdlists>. A blank page will be displayed since there is no data so far.

In the `db/seeds.rb` file, populate some to-do items and check if our API works as expected:

```rb
Tdlist.create(title: "Schedule meetings: IT, Accounts, HR", done: false)
Tdlist.create(title: "Visit children's home: perform duties", done: false)
```

Then we execute the command below:

```bash
$ rails db:seed
$ rails server
```

We can proceed to refresh our page, the following JSON data will be displayed on the browser:

![json](/engineering-education/how-to-integrate-a-react-application-with-rails-api/json-capture.png)

Our backend is now complete. We will configure our frontend to run on `port 4000` and the backend to run on `port 3000`. Then we will run our application in a local development environment using `Heroku CLI`.

To achieve this, we will proceed and create a file named `Procfile.windows` in the project root directory and paste the lines of commands below:

```bash
api: bundle exec rails server –p 3000
web: yarn --cwd tdlist-app start
```

The commands above execute both React application and the Rails server on Heroku.

### Creating the frontend – React Application
We will begin by creating the React application globally by running the commands below:

```bash
$ npm install -g create-react-app
$ create-react-app tdlist-app
```

In the Rails root directory, a new folder called `tdlist-app` containing React files and components will be generated. Then we will execute the command below to start the React application:

```bash
$ yarn --cwd tdlist-app start
```

The default React page will be displayed after running the command above:

![React app default page](/engineering-education/how-to-integrate-a-react-application-with-rails-api/reactapp-default-page.png)

Next, we will specify the React application on which port our Rails server is running on in development mode. To achieve this, we will edit the file `tdlist-app/package.json` by adding the line of command below:

```bash
"proxy": "http://localhost:3000"
```

The line above instructs the React application to communicate through a proxy in development mode to the backend using port 3000. To call our backend API running on the link <http://localhost:3000/api/version1/tdlists> from the application, we will only need to call `/api/version1/tdlists` instead of the whole link.

We will also need to update our `package.json` with the following lines to ensure that our React application runs on `port 4000` instead of default `port 3000`:

```json
"start": "set PORT=4000 && react-scripts start"
```

Our updated `package.json` will appear as shown below:

![package.json](/engineering-education/how-to-integrate-a-react-application-with-rails-api/package-json.png)

We will now call our `Procfile.windows` file that we created earlier by running the command below:

```bash
$ heroku local -f Procfile.windows
```

The command above runs the Rail API and the React application. To access it, we can browse to <http://localhost:4000>.

### Creating React components
In this section, we will build the components that our application will use. Navigate to `tdlist-app/src/components` directory, create a new file named `TdlistsContainer.js` and paste the below code:

```typescript
import React, { Component } from "react";

class TdlistsContainer extends Component {
  render() {
    return (
      <div>
        <div className="taskContainer">
          <input
            className="newTask"
            type="text"
            placeholder="Input a New Task and Press Enter"
            maxLength="75"
          />
        </div>
        <div className="wrapItems">
          <ul className="listItems"></ul>
        </div>
      </div>
    );
  }
}

export default TdlistsContainer;
```

Then import the new component in `App.js`.

```typescript
import React, { Component } from "react";
import "./App.css";
import TdlistsContainer from "./components/TdlistsContainer";

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

Then edit `App.css`:

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
  font-family: "Times New Roman", Times, serif, sans-serif;
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
  font-family: "Times New Roman", Times, serif;
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
  background: rgba(0, 0, 0, 0);
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

Next, we will refresh the frontend link: <http://localhost:4000>, and the following page will be displayed:

![to-do list](/engineering-education/how-to-integrate-a-react-application-with-rails-api/todo-list.png)

### Calling the API
In this section, we will fetch the data from our backend. We will use `Axios` to fetch or store data. First, we will install `Axios` by running the following command and then import it into our component:

```bash
$ cd tdlist-app
$ npm install axios --save
```

#### Getting to-do list items
We will edit our component to initialize the state and the component’s behavior. We will then add the `componentDidMount` function to load the to-do item lists as shown:

```typescript
import React, { Component } from "react";
import axios from "axios";

class TdlistsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tdlists: [],
    };
  }

  loadTdlists() {
    axios
      .get("/api/version1/tdlists")
      .then((res) => {
        this.setState({ tdlists: res.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadTdlists();
  }

  render() {
    return (
      <div>
        <div className="taskContainer">
          <input
            className="newTask"
            type="text"
            placeholder="Input a New Task and Press Enter"
            maxLength="75"
            onKeyPress={this.createTodo}
          />
        </div>
        <div className="wrapItems">
          <ul className="listItems">
            {this.state.tdlists.map((tdlist) => {
              return (
                <li className="item" tdlist={tdlist} key={tdlist.id}>
                  <input className="itemCheckbox" type="checkbox" />
                  <label className="itemDisplay">{tdlist.title}</label>
                  <span className="removeItemButton">x</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default TdlistsContainer;
```

Now, we need to restart our `Heroku local` and refresh the page, and the results below will be displayed:

![to-do list updated](/engineering-education/how-to-integrate-a-react-application-with-rails-api/todo-list-updated.png)

#### Adding a new to-do list item
To add a new to-do list item, we will call `POST/api/version1/tdlists`. We need a new function that will enable us to add new to-do list items, and then we proceed to update the state. We will utilize the [immutability-helper](https://www.npmjs.com/package/immutability-helper) to update the state. We will run the commands below to install the package, and then we import it into our component:

```bash
$ npm install immutability-helper --save
```

```typescript
import update from "immutability-helper";
```

We will then update the textbox attributes to have an `onKeyPress` event as below:

```typescript
<input
  className="newTask"
  type="text"
  placeholder="Input a New Task and Press Enter"
  maxLength="75"
  onKeyPress={this.newTdlist}
/>
```

Then, we create a `newTdlist` function as below:

```typescript
newTdlist = (e) => {
  if (e.key === "Enter" && !(e.target.value === "")) {
    axios
      .post("/api/version1/tdlists", { tdlist: { title: e.target.value } })
      .then((res) => {
        const tdlists = update(this.state.tdlists, {
          $splice: [[0, 0, res.data]],
        });

        this.setState({
          tdlists: tdlists,
          inputValue: "",
        });
      })
      .catch((error) => console.log(error));
  }
};
```

In the code snippet above, we added a new to-do list item at the top of the `tdlists` array through the use of `$splice` function. We can then proceed to add a new to-do list item to test the application.

We can note that after adding a new to-do list item, the value of textbox remains the same. To clear the textbox, we add the following code:

```typescript
this.state = {
  tdlists: [],
  inputValue: "",
};
```

To update the state with the new parameter we defined in the code snippet above, we paste the code below:

```typescript
this.setState({
  tdlists: tdlists,
  inputValue: "",
});
```

We will proceed to add a new function that is invoked whenever the value of the textbox changes:

```typescript
handleChange = (e) => {
  this.setState({ inputValue: e.target.value });
};
```

Finally, we will edit the textbox to have new attributes:

```typescript
<input
  className="newTask"
  type="text"
  placeholder="Input a New Task and Press Enter"
  maxLength="75"
  onKeyPress={this.newTdlist}
  value={this.state.inputValue}
  onChange={this.handleChange}
/>
```

#### Updating to-do list items
To mark the to-do list as done, we will modify the checkbox element and create a new function that updates the state as below:

```typescript
<input
  className="itemCheckbox"
  type="checkbox"
  checked={tdlist.done}
  onChange={(e) => this.modifyTdlist(e, tdlist.id)}
/>
```

```typescript
modifyTdlist = (e, id) => {
  axios
    .put(`/api/version1/tdlists/${id}`, { tdlist: { done: e.target.checked } })
    .then((res) => {
      const tdlistIndex = this.state.tdlists.findIndex(
        (x) => x.id === res.data.id
      );
      const tdlists = update(this.state.tdlists, {
        [tdlistIndex]: { $set: res.data },
      });
      this.setState({
        tdlists: tdlists,
      });
    })
    .catch((error) => console.log(error));
};
```

#### Deleting to-do list items
To delete a to-do list item, we will update the `span` element as seen below:

```typescript
<span
  className="removeItemButton"
  onClick={(e) => this.removeTdlist(tdlist.id)}
>
  x
</span>
```

We will then create a `removeTdlist` function:

```typescript
removeTdlist = (id) => {
  axios
    .delete(`/api/version1/tdlists/${id}`)
    .then((res) => {
      const tdlistIndex = this.state.tdlists.findIndex((x) => x.id === id);
      const tdlists = update(this.state.tdlists, {
        $splice: [[tdlistIndex, 1]],
      });
      this.setState({
        tdlists: tdlists,
      });
    })
    .catch((error) => console.log(error));
};
```

The application is now ready for testing.

### Wrapping up
We have successfully implemented a React application and created the component, `TdlistsContainer`. We have handled the behavior of our application using the React state.

On the other hand, with Rails, we have built a backend that handles the JSON data as we deal with our frontend. We used the main container to render the User Interface instead of using components to make things simple. This gave us more time to focus on other significant concepts and data flow.

The code used in this tutorial can be found on [GitHub](https://github.com/kerubo-tech/my-projects).

Hope you find this tutorial helpful.

Happy coding!

---
Peer Review Contributions by: [Monica Masae](/engineering-education/authors/monica-masae/)
