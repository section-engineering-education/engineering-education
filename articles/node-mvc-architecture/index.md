A good architecture is key to any software development success. This not only ensures easy development process among teams, but also the scalability of the software. It makes sure that whenever new changes are needed, the developers will not have a hard time refactoring various aspects of the code. There are many architecture patterns in the different languages like MVT in Python, MVVM in Android and MVC. We can MVC in our Javascript application.

MVC architecture divides the whole application into three parts; the `Model`, the `View` and the `Controller`. 

## 1. Model
* This part defines our data. It is where our schemas and models are located i.e the blueprint of our application's data.

## 2. View
* This includes templates and any other form of interaction the user has to the application. It is where the data defined by our `Model` is presented to the user.

## 3. Controller
* The business logic is handled in this part. This includes the database reading and writing, and any other modification the data undergoes. Any change happens here. This connects the `Model` and `View`. 

With that in mind, we can get into our code and start refactoring and changing it to follow the MVC pattern. The code before changing can be found on [Github](https://github.com/LinusMuema/node-authentication-api/tree/heroku-deployment)

In order to change our application to an MVC pattern. We will need controllers. Since we already have our models i.e the model files in the `models` directory. Our `views` will be the routes files in the `routes` folder as we are not rendering any pages and the user interacts with the API endpoints. 

Go ahead and create a directory known as `controllers` in the root level. Then add a file known as `auth.controller.js` which will handle all our auth route's logic.

![mvc-files](/engineering-education/node-mvc-architecture/mvc-files.png)

Next, add the following exports in the `auth.controller.js` file.  Here we are exporting two functions. 

```javascript
exports.login = (req, res) => {

}

exports.signup = (req, res) => {

}
```

The `login` and `signup` functions. They will have access to the request and response bodies of our requests and we will handle the signup and login processes here. 


In the controller, import the `bcrypt` and `User` model. They will be used in the controller. Then move the whole password hashing functions and mongoose CRUD methods to the respective functions in the controller file.

![function-blocks](/engineering-education/node-mvc-architecture/function-blocks.png)

Import the controller in the `routes/auth.js` file. This will allow you to access the exported functions. Then where there was the `login` and `signup` implementations, call the controller methods respectively. 

```javascript
const controller = require('../controllers/auth.controller')

router.get('/login', controller.login);

router.post('/signup', controller.signup);
```

In case you have not noticed, we had not moved the `generateToken` method. This is because we can place it in its own file so that you can reuse it in all controllers. So I will create a root-level directory called `utils` and create a file known as `utils.js`. And in here is where I will place my `generateToken` function and any other reusable function.     

```javascript
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.TOKEN_SECRET

exports.generateToken = (user) => jwt.sign({data: user}, tokenSecret, {expiresIn: '24h'})

```

Then in my controller, I will import the utils file to access the exported functions. 

![controller-utils](/engineering-education/node-mvc-architecture/controller-utils.png)

And with that, you have some clean MVC architecture. This follows the principle of "separation of concerns" where we decouple our code into very small units which can be handled independently. This is an important aspect to follow especially in a team to allow smooth collaboration. The code to the refactored code can be found on [Github](https://github.com/LinusMuema/node-authentication-api/tree/mvc)