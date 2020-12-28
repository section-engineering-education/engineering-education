---
layout: engineering-education
status: publish
published: true
url: /engineering-education/node-mvc-architecture/
title: Node.js applications following an MVC architecture
description: The article is about creating your Node.js applications following an MVC architecture pattern that divides the whole application into three parts.
author: linus-muema
date: 2020-07-27T00:00:00-07:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/node-mvc-architecture/hero.jpg
    alt: Node.js applications following an MVC architecture
---
Good architecture is key to any software development success. This not only ensures easy development processes among teams, but also the scalability of the application. It makes sure that whenever new changes are needed, the developers will not have a hard time refactoring various aspects of the code.
<!--more-->

### MVC Architecture
There are many architecture patterns in different languages like MVT in Python, MVVM in Android, and MVC in JavaScript applications.

MVC architecture divides the whole application into three parts; the `Model`, the `View` and the `Controller`.

#### Model
This part defines our data. It is where our schemas and models are located, i.e the blueprint of our application's data.

#### View
This includes templates and any other form of interaction the user has with the application. It is where the data defined by our `Model` is presented to the user.

#### Controller
The business logic is handled in this part. This includes the database reading and writing, and any other modifications that the data undergo. This connects the `Model` and `View`.

### Refactoring to MVC
With that in mind, we can get into our code and start refactoring it to follow the MVC pattern. The base code (prior to alterations) can be found on [Github](https://github.com/LinusMuema/node-authentication-api/tree/heroku-deployment).

In order to transition our application to an MVC pattern, we will need controllers. Note that we already have our models, i.e the model files in the `models` directory, and our views will be the routes files in the `routes` folder, as we are not rendering any pages when the user interacts with the API endpoints.

Go ahead and create a directory called `controllers` in the root level. Then add a file named `auth.controller.js` which will handle all our auth route's logic.

![mvc-files](/engineering-education/node-mvc-architecture/mvc-files.png)<br>
Next, add the following exports in the `auth.controller.js` file.  Here we are exporting two functions.

```javascript
exports.login = (req, res) => {

}

exports.signup = (req, res) => {

}
```

The `login` and `signup` functions will have access to the request and response bodies of our requests, and we will handle the signup and login processes here.

In the controller, import the `bcrypt` and `User` model. Then move the entire password hashing functions and mongoose CRUD methods to the respective functions in the controller file.

![function-blocks](/engineering-education/node-mvc-architecture/function-blocks.png)<br>
Import the controller in the `routes/auth.js` file. This will allow you to access the exported functions. Then, where there were the `login` and `signup` implementations, call the controller methods respectively.

```javascript
const controller = require('../controllers/auth.controller')

router.get('/login', controller.login);

router.post('/signup', controller.signup);
```

In case you haven't noticed, we did not move the `generateToken` method. This is because we can place it in its own file so that you can reuse it in all controllers. So I will create a root-level directory called `utils` and create a file known as `utils.js`. And in here is where I will place my `generateToken` function and any other reusable functions.     

```javascript
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET

exports.generateToken = (user) => jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})

```

Then, in my controller, I will import the `utils` file to access the exported functions.

![controller-utils](/engineering-education/node-mvc-architecture/controller-utils.png)<br>
And with that, you have some clean MVC architecture. This follows the principle of "separation of concerns" where we decouple our code into very small units which can be handled independently. This is an important aspect to follow, especially in a team, to allow smooth collaboration.

The fully refactored code can be found on [Github](https://github.com/LinusMuema/node-authentication-api/tree/mvc).

<section class="section-rich-text xs-pb-80 xs-pt-80">
  <div class="section-container">
    <div class="section-rich-text-inner prl-5">
      <a class="decoration-none" href="/modules/node-js/">
        <div class="cta-block-box relative xs-mt-10 xs-mb-50">
          <div class="cta-block-box-left-block absolute"></div>
          <div class="cta-block-box-left-stripes absolute"></div>
          <div class="cta-block-box-inner pa-5 cta-shadow">
            <h3 class="title-3" style="text-align: center;"><img src="/assets/images/blog/featured-images/Node.js_logo.png" width="150" style="margin: 0;"><br>Edge Hosting</h3>
            <p class="xs-mb-20">Section’s Node.js Edge Hosting empowers DevOps teams to run mission critical Node.js applications at the network edge for blazingly fast results with enterprise level AppSec protection.</p>
            <span class="link-with-arrow-blue text-blue text-18-medium">Learn more and get started on a free plan</span>
          </div>
          <div class="cta-block-box-right-block absolute"></div>
          <div class="cta-block-box-right-stripes absolute"></div>
        </div>
      </a>
    </div>
  </div>
</section>
