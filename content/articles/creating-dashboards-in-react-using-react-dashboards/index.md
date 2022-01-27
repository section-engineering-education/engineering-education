### Introduction

[Flatologic](https://flatlogic.com/) Customizable React dashoards are available to download and use. As a result, the development time for react dashboards has been lowered. Flatologic's react dashboards are described in detail in this post.

### Table of contents

- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Objectives](#objectives)
- [Prerequisites](#prerequisites)
- [Step 1: Installing and configuring React Dashboard](#step-1-installing-and-configuring-react-dashboard)
- [Step 2: Setting up React Database table and dashboard.](#step-2-setting-up-react-database-table-and-dashboard)
- [Step 3: Connecting the database server to the application](#step-3-connecting-the-database-server-to-the-application)
- [Testing Phase](#testing-phase)
- [Conclusion](#conclusion)

### Objectives

After reading this article the reader will be entitled to:

- Installing and configuring React Dashboard
- Setting up React Database table and dashboard
- Connecting the database server to the application

### Prerequisites

- Fundamentals of React
- Mamp Server

### Step 1: Installing and configuring React Dashboard

To begin, we'll create a local copy of the react Dashboard source code, as seen in the image below.

![clone](/engineering-education/tree/creating-dashboards-in-react-using-react-dashboards/clone.jpg)

As soon as we have react Dashboard, we can configure it to use the template of our choice.
![install](/engineering-education/tree/creating-dashboards-in-react-using-react-dashboards/install.jpg)

Problems with React Dashboard installation are filled in the form of a bug report. This is where you've gone wrong:

![error](/engineering-education/tree/creating-dashboards-in-react-using-react-dashboards/error.jpg)

To be safe from the error, set-up `sqlite3` and followed by `yarn install` before proceding to the other steps.

To proceed, we need to configure our servers to execute both the frontend and backend on different port . To access our dashboard head on to: http://localhost:3000/

![react-dashboard-interface](/engineering-education/tree/creating-dashboards-in-react-using-react-dashboards/react-dashboard-interface.png)

The GraphQL package supplied in the project that we have just copied fron github, will allow us to execute our backend. Consult the GraphQL reference for further information and examples [here](https://graphql.org/)

### Step 2: Setting up React Database table and dashboard.

The MAMP server and a MySQL database will be the backbone of our dashboard. Please visit [MAMP](https://mamp.info/en/downloads/) if you don't already have it. Webstart should be enabled if MAMP is installed.

![mamp-interface](/engineering-education/tree/creating-dashboards-in-react-using-react-dashboards/mamp-interface.png)

As soon as you enable webstart, you'll be sent to the MAMP index page. You'll be brought to a page with tools for setting up a MySQL database when you click phpMyAdmin. By choosing Database from the current menu, you may create a new database with a name. Five tuples in this example are connected to each other, as shown in the diagram below.

![mysql-posts](/engineering-education/tree/creating-dashboards-in-react-using-react-dashboards/mysql-posts.png)

We must save our data now that we have everything.

### Step 3: Connecting the database server to the application

In order to connect to the database we just built, we will need to use Sequelize.js, which is provided by the'sequelize.js' file in our copied project.
The first step in setting up a database is to choose a database name, a password, and a port number.

```javascript
let connect = new sequlize("react_db", "react", "react", {
  host: "localhost",
  port: 5000,
  dialect: "mysql",
  operatorsAliases: false,
});
export default connect;
```

As a result, we can now add new posts to our relation by uncommenting the `schema.js` file's post creation mutation. GraphQL's [documentation](https://graphql.org/) has further information about it.

![mutation](/engineering-education/tree/creating-dashboards-in-react-using-react-dashboards/mutation.jpg)

### Testing Phase

The server must be restarted before we can run our software. Assuming everything goes according to plan, we should be able to add a new post to our dashboard without any issues assuming everything goes according to plan.

![post-creation](/engineering-education/tree/creating-dashboards-in-react-using-react-dashboards/post-creation.png)

### Conclusion

Ready-made dashboard templates from Flatologic have shown how straightforward the creation and implementation of an intuitive dashboard can be. As an added bonus, you learnt how to create a database for your dashboard design and put your data there. The study's purpose was to inform readers about the time-consuming nature of starting from scratch when creating React applications when pre-made templates may be adapted to match your individual needs.
