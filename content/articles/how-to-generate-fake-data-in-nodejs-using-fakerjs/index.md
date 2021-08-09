---
layout: engineering-education
status: publish
published: true
url: /how-to-generate-fake-data-in-node-using-faker.js/
title: How to Generate Fake Data in Node.js Using Faker.js
description: In this tutorial, we will learn how to generate fake data in Node.js using the Faker module. We will then output the fake data in a webpage as a table. 
author: justus-mbuvi
date: 2021-05-20T00:00:00-07:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/how-to-generate-fake-data-in-node-using-faker.js/hero.png
    alt: Faker API example
---
During system development and testing, employment of Fake data can be very useful. This is because it prevents one from using ones real identity, especially in for data like identification numbers, full names, and date of birth, among others. Manually generating fake data takes time, hence slowing down the testing process since it is hard to come up with a lot of new data.
<!--more-->
In this tutorial, we will learn how to generate fake data in Node.js using the Faker module. We will then output the fake data in a webpage as a table. We shall run our process locally on our computer but fetch the information from an online server.

### Key takeaways
By the end of this tutorial, you will know the following:
- Main components of Faker.js.
- How to create a simple webpage structure.
- How to generate the fake data.
- Storing the fake data in a table.
- Linking the Fake data generated to the webpage.

### Pre-requisites
The basic requirements for this course include:
- Basic knowledge of Web development.
- Node.js basics.
- A basic IDE is installed on the machine. We shall preferably use Visual Studio Code.
- A stable internet connection.
- MongoDB installed on your computer. You can check out how to install MongoDB on your computer [here](/working-with-databases-part1/).

### Table of contents
- [What is Faker.js](#What-is-Faker.js)
- [What type of data does Faker.js generate](#What-type-of-data-does-Faker.js-generate)
- [Setting up the overall project structure](#Setting-up-the-overall-project-structure)
- [Setting up our environment](#Setting-up-our-environment)
- [Testing Faker.js module](#Testing-Faker.js-module)
- [How the project will run](#How-the-project-will-run)
- [Setting up the application starting point](#Setting-up-the-application-starting-point)
- [Setting up models](#Setting-up-models)
- [Setting up views](#Setting-up-views)
- [Run the project](#Run-the-project)
- [Conclusion](#conclusion)
- [Further projects](#Further-projects)
- [References](#References)

### What is Faker.js
Faker.js is a Node.js library that allows users to generate massive amounts of fake data for their project use. This can be generated either while running your program locally or remotely by deploying it in a web browser as a webpage. It does this generation by randomly choosing from an online server some of the variables requested for each time it is executed.

It can generate a massive amount of data thereby allowing a developer to push their programs to the limit during testing. Developers can then analyze the data as one would have done in real-life situations and come up with desired decisions.

### What type of data does Faker.js generate
Some examples of data that can be generated include, but not limited to the below categories:
- Address
- Animals
- Companies
- Commerce
- Dates
- Data types
- Images
- Names
- Time and many more...

You can choose a sub-category by first requiring "faker", calling the main category, then adding the sub-category after a period. An example is `console.log('faker.animal.dog');`

You can check out others as documented [here](https://www.npmjs.com/package/faker).

Now that we know all that, let us dive into the tutorial.

### Setting up the overall project structure
First, create the main directory and name it "Fakedata". This'll be the base directory of our program. Open the directory in Visual Studio Code.

Open the integrated terminal in Visual Studio Code and run `npm init -y` to quickly create a "package.json" file.

Create a file in the main directory named "app.js". This will be the program's starting point.

Once done, let us create two new folders in the main directory namely "views" and "models". Inside the "views" directory, create "home.ejs" file. Create another file and name it "user.js" inside the "models" folder.

#### Folder structure
The folder structure will be as shown below:

> Fakedata (Root Directory)
>
> > node_modules (folder)
> >
> > models (folder)
> >
> > > user.js (file)
> >
> > views (folder)
> >
> > > home.ejs (file)
> >
> > app.js (file)

Now that we have completed the tasks above, let's get into the code and some explanations.

### Setting up our environment
Let's do the following in sequence:

#### Installing packages
The Node.js libraries required for this tutorial include:
- nodemon
- express
- ejs
- mongoose
- faker

In the integrated terminal, run the following command to install the packages above all at once:

```bash
npm i nodemon express ejs mongoose faker
```

The installation may take some time depending on your internet speed. Just be patient till the process comes to a halt.

You can choose to run an additional command, `npm update` to update the installed packages.

#### Configuring package.json
Now open the "package.json" file and configure it so that you can start the application using nodemon. Under the scripts, add the "dev" and "start" configurations. 

The code should look as follows:

```Json
{
	"name": "fakedata",
	"version": "1.0.0",
	"description": "",
	"main": "app.js",
	"scripts": {
		"start": "node app.js",
		"dev": "nodemon app.js",
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC",
	"dependencies": {
		"ejs": "^2.7.4",
		"express": "^4.17.1",
		"faker": "^4.1.0",
		"mongoose": "^5.12.5",
		"nodemon": "^2.0.7"
	}
}
```

Once done, let's now write our code to build and run a test application.

### Testing Faker.js module
First, let us give a test to the faker.js library on the console. Write in the code below inside the "app.js" file. These will give back random data twenty times due to the for loop used. You can see the data generated in the control panel.

```Javascript
var faker = require("faker");

// Initializing our variables with a different random data each time it is run
var randomName = faker.name.findName(); // Generates a random name
var randomEmail = faker.internet.email(); // Generates a random email
var randomProduct = faker.commerce.productName(); // Generates a random product name
var randomCompany = faker.company.companyName(); // Will give back a random company name
var randomCard = faker.helpers.createCard(); // It's output is a random contact card containing many properties

// Iteration
// This code runs twenty times
// It produces each time different data
for (i = 0; i < 20; i++) {
	console.log(randomName); // Outputs a random name
	console.log(randomEmail); // Outputs a random email
	console.log(randomProduct); // Outputs the random product name generated
	console.log(randomCompany); // Produces a random company name
	console.log(randomCard); // Gives back a random card
	console.log(faker.date.past()); // Generates a random past date
}
```

Run the "app.js" file in the terminal using the command `node index.js`.

You can change it as you please to get different inputs basing your code on the documentation given [here](https://www.npmjs.com/package/faker).

In case of the "script is disabled" error, such as one shown below, follow these easy steps to remove them:

![Script running disabled](/engineering-education/how-to-generate-fake-data-in-a-node-using-faker.js/script-running-disabled.png)

- Open a new PowerShell terminal and run it as Admin.
- Type in `get-executionpolicy` to check the current status.
- If it returns as "Restricted", run `set-executionpolicy remotesigned`.
- Type "A" in the command line dialogue, to quickly accept all the changes, then press Enter.

For further errors, you can find help [here](https://windowsloop.com/enable-powershell-scripts-execution-windows-10/) or you can copy and paste the error and search for help in [Stack overflow](https://stackoverflow.com/).

Now that we have seen our tests running successfully, we can get into the main application.

### How the project will run
The code when executed will use the faker.js library to generate the data needed several times. It will store each value generated in a local database. We'll then see the results in a web browser as a webpage from the database.

### Setting up the application starting point
"app.js" will be used as our application's starting point.

#### app.js
Inside this file, do the following, step by step:

- Require the packages we just installed as shown below:

```Javascript
// Require needed packages
var express = require("express");
var mongoose = require("mongoose");
var faker = require("faker");
var path = require("path");
var fakerModel = require("./models/user");
```

- Connect to a new database called "fakedata" inside Mongodb database. 

This is shown below:

```Javascript
// Connect to a local Mongodb database called fakedata
// If successful log out on the console "connected to db"
//    else "connection error"
mongoose
	.connect("mongodb://localhost:27017/fakedata", { useNewUrlParser: true })
	.then(() => console.log("connected to db"))
	.catch((error) => console.log("connection error", error));
```

- Use express to set up our Template engine (view engine) to "ejs" and set up our absolute directory path to the source directory. 

This is shown below:

```Javascript
// Use express to set up our view engine to "ejs"
// Set up our absolute directory path to the source directory
var app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
```

- Set up our simple routing system to take us to the home webpage whenever the application is launched or new data generated. We'll also save all our data generated and stored in the variables inside our database:

```Javascript
// Set up our simple routing system to take us to the "home.ejs" file
// or the home webpage whenever the application is launched
app.get("/", (req, res) => {
	fakerModel.find((err, data) => {
		if (err) {
			console.log(err);
		} else if (data) {
			res.render("home", { data: data });
		} else {
			res.render("home", { data: {} });
		}
	});
});

// Return each data generated to the variables below and save all of them
// This will  be done ten times due to the for loop
// You can add the number of data to be generated by changing the value
app.post("/", (req, res) => {
	for (var i = 0; i < 10; i++) {
		var fakee = new fakerModel({
			firstname: faker.name.firstName(),
			lastname: faker.name.lastName(),
			phonenumber: faker.phone.phoneNumber(),
			city: faker.address.city(),
			state: faker.address.state(),
			country: faker.address.country(),
		});
		fakee.save((err, data) => {
			if (err) {
				console.log(err);
			}
		});
	}
	res.redirect("/");
});
```

- Configure the ports to be used:

```Javascript
// Set up our ports in which we shall see the webpage and data generated
// We will use 5000 as our port number
var port = process.env.PORT || 5000;

app.listen(port, () => console.log("server running at port " + port));
```

As you can see, we have added a *for loop* which will be repeated ten times. This in turn adds ten new rows of data each time it is run. You can increase or decrease the number of data to be generated by changing the value as you please.

### Setting up models

#### user.js
Inside the "models" folder, navigate to the "user.js" file. 

Do the following in that file:

- Create a new database and name it "fakedata", insert these columns: firstname, lastname, phonenumber, city, state, and country. 

Their datatypes are as shown in the code below:

```Javascript
// Require the mongoose model
var mongoose = require("mongoose");

// Add the following columns in it and their datatypes
var fakerSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	phonenumber: String,
	city: String,
	state: String,
	country: String,
});

// Require it as the output
module.exports = mongoose.model("fakerCollection", fakerSchema);
```

### Setting up views
#### home.ejs
In this file, we will create a web structure to display the data. It will have a button that when pressed, will generate new data and automatically save while displaying it. 

We'll also add a table that will have the same number of columns as the ones generated. We shall then add some quick formatting using bootstrap and Google fonts.

- Set up the overall page structure and a heading to be used:

```HTML
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Fake Data Generator</title>
		<!-- Required meta tags -->
		<meta charset="utf-8" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, shrink-to-fit=no"
		/>

		<!-- Bootstrap CSS -->
		<link
			rel="stylesheet"
			href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
			integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
			crossorigin="anonymous"
		/>

		<!-- Custom CSS -->
		<style>
			@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
			* {
				font-family: Montserrat;
			}

			.card {
				margin: 0 auto;
				/* Added */
				float: none;
				/* Added */
				margin-bottom: 10px;
				/* Added */
			}
		</style>
	</head>

	<body>
		<!-- Optional JavaScript -->
		<!-- jQuery first, then Popper.js, then Bootstrap JS -->
		<script
			src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
			integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
			crossorigin="anonymous"
		></script>
		<script
			src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
			integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
			crossorigin="anonymous"
		></script>
		<script
			src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
			integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
			crossorigin="anonymous"
		></script>

		<!-- Main Container -->
		<div class="container">
			<!-- Header -->
			<br />
			<h1 class="text-center">FAKE DATA GENERATOR</h1>
			<hr />
			<p class="text-secondary">This is a simple Fake Data generator website</p>
			<hr />
			<!-- Header end.//-->
		</div>
		<!--container end.//-->
	</body>
</html>
```

- Add a button to generate the data inside the "container" div element tags as shown in the code below:

```html
<!-- Generate button -->
<form action="/" method="post">
	<input
		type="submit"
		class="btn btn-primary btn-lg btn-block"
		value="click to generate the data"
	/>
</form>
<br />
<!-- Generate button end.//-->

<a class="btn btn-primary stretched-link" href="#footer">Go to the bottom</a>
<hr />
```

As you can see, it will trigger the process when clicked. The additional link will enable us to use the in-page HTML links to navigate from the top to bottom of the page quickly at a button click as we shall see later on.

- Add a table and use the "ejs" template engine format when referring to the variables to be used. This shall be placed below the button in the "container" div. 

See the code below:

```HTML
<!-- Table -->
<%if(data.length>0){%>
<table
	class="table table-striped table-inverse table-responsive"
	border="1"
	style="text-align: center;"
>
	<thead class="thead-inverse">
		<tr>
			<th>s.no</th>
			<th>firstname</th>
			<th>lastname</th>
			<th>phonenumber</th>
			<th>city</th>
			<th>state</th>
			<th>country</th>
		</tr>
	</thead>
	<tbody>
		<%for(var i=0;i< data.length; i++){%>
		<tr>
			<td><%= i%></td>
			<td><%= data[i].firstname%></td>
			<td><%= data[i].lastname%></td>
			<td><%= data[i].phonenumber%></td>
			<td><%= data[i].city%></td>
			<td><%= data[i].state%></td>
			<td><%= data[i].country%></td>
		</tr>
		<%}%>
	</tbody>
</table>
<%}%>
<!-- Table end.//-->
```

- Just to make it easy for one with large amounts of data, we'll add another "Generate" button at the end of the page. We will now add another link that has the id of "footer". We had set the initial "Go to the bottom" link to point at it through its id. 

All these we shall put inside the footer element as shown below:

```HTML
<!-- Footer section-->
<hr />
<p class="text-secondary">This is the end of the page!</p>

<hr />

<p class="text-secondary">Click the button below to generate more data...</p>

<!-- Generate button-->
<form action="/" method="post">
	<input
		type="submit"
		class="btn btn-primary btn-lg btn-block"
		value="click to generate the data"
	/>
</form>
<br />
<!-- Generate button end.//-->
<footer id="footer">Bye...</footer>
<!-- Footer section end.//-->
```

### Run the project
Before running the code, make sure that MongoDB is running in the background.

In your integrated terminal, run the following command:

```bash
nodemon run dev
```

If it outputs a running message or "connected to db" as we had set earlier on in our code, open a web browser. In the web browser, type `localhost:5000` and press enter.

Once the page has been displayed, click on the "click to generate the data" button. 

The results will be as shown in the image below:

![Fakedata home.ejs webpage](/engineering-education/how-to-generate-fake-data-in-a-node-using-faker.js/fakedata-home.ejs-webpage.png)

You can view the generated data in MongoDB installed on your computer. Just open the "MongoDB Compass" and connect to the default localhost, that is, at `localhost:27017`. You will see a new database called "fakedata". Once you open it, you will see a collection by the name "fakercollection". 

All the data generated in the session will be found there.

You can find, clone, and use the code above in the repository found [here](https://github.com/justusmbuvi/Faker.js-node-application).

Congratulations! You have generated fakedata for your need using Node.js.

### Conclusion
Fake data is very important for system testing. One can obtain as much as needed and store it locally for immediate or future use using Node.js modules. One can choose a variety as he/she needs depending on the underlying purpose.

We have briefly learned the importance of fake data, what faker.js is, how to integrate it in a simple node project, how to run, view, and store the generated results.

### Further projects
- You can further your project by injecting the data generated or that which is stored directly into your system that you want to test.
- You can also decide to do an intense AI-driven analysis on the data generated to know more about the patterns the data generated has.

Happy coding!

### References
The following were used as references:

- [Faker.js documentation](https://www.npmjs.com/package/faker).

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
