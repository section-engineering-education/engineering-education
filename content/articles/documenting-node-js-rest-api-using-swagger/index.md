---
layout: engineering-education
status: publish
published: true
url: /documenting-node-js-rest-api-using-swagger/
title: Documenting a Node.js REST API using Swagger
description: In this article, we will learn about API documentation using Swagger. Also, we will learn to document Node.js APIs using Swagger from scratch.
author: kennedy-mwangi
date: 2021-04-17T00:00:00-14:00
topics: [Node.js,API]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/documenting-node-js-rest-api-using-swagger/hero.jpg
    alt: Swagger example image
---
Swagger is a software tool used for designing, building, documenting, and using RESTful APIs. It follows the OpenAPI specification.
<!--more-->
An API (Application Programming Interface) is an intermediary that enables two different software applications to communicate with each other.

The OpenAPI specification is a specification used for creating interfaces used in describing, producing, consuming, and visualizing RESTful APIs. It is also known as the swagger specification.

### Goals
In this article, we will document a simple Node.js REST (Representational State Transfer) API using swagger.

### Prerequisites
To follow along in this article, it is essential to have the following:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Some basic knowledge of JavaScript.
- Familiarity with building REST APIs using [Express.js](https://expressjs.com/). 

If you are not familiar, you can reference this [article](/restful-web-api-using-nodejs-postgressql-and-express/).

### Overview
- [Introduction](#introduction)
- [Setting up the development server](#setting-up-the-development-server)
- [Documenting API general information](#documenting-api-general-information)
- [Documenting API servers](#documenting-api-servers)
- [Documenting API tags](#documenting-api-tags)
- [Documenting API components](#documenting-api-components)
- [Documenting API paths](#documenting-api-paths)

### Introduction
Swagger relies on specifications in developing the documentation of an API. The specifications can be in `YAML` or `JSON` format.

YAML (YAML Ain't Markup Language) is a data serialization standard for writing configuration files.

JSON (JavaScript Object Notation) is a lightweight data-serialization standard that follows the JavaScript object syntax. Data is arranged in key/value pair.

In this article, we will implement the specifications using the `JSON` format. With this format we will document from `.js` files.

### Setting up the development server
Since the main focus is on documenting a REST API, we won't deal with creating one, but we will clone one from this [GitHub repository](https://github.com/mwangiKibui/node.js-simple-api).

The API will use the following dependencies:
- [lowdb](https://www.npmjs.com/package/lowdb): For storing the data.
- [morgan](https://www.npmjs.com/package/morgan): For logging the requests.
- [nanoid](https://www.npmjs.com/package/nanoid): For generating the ID's.
- [cors](https://www.npmjs.com/package/cors): For setting up the cross-origin policy.
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express): For serving the swagger user interface in our API.
- [nodemon](https://www.npmjs.com/package/nodemon): For restarting the development server in case of any change.

To install the dependencies, we need to run the following command at the root of the project:

```bash
npm install
```

After installing the dependencies, you can start the development server by running:

```bash
npm run dev
```

Now that the development server is set up, our focus will be on documenting the API. I encourage you to go through the API and understand the various endpoints and how data is being exchanged.

At this point, you can use [postman](https://www.postman.com/).

If you are not familiar with it, you can check out this [post](https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-use-postman-to-call-api.html).

From here onwards, we will be concentrating on the `docs` folder in the `src` folder.

### Documenting API general information
API's general information comprises the openAPI version `openapi` and the API's specific information under the `info` object.

The `info` object comprises a `title`,`description`,`version`, `contact` information, etc.

The information is highly recommended for publicly available APIs to enhance the developer's experience.

In our API, we will document the general information in the `docs/basicInfo.js` file. 

We will include but not limited to the following information:

```js
module.exports = {
  openapi: "3.0.3", // present supported openapi version
  info: {
    title: "Simple Todos API", // short title.
    description: "A simple todos API", //  desc.
    version: "1.0.0", // version number
    contact: {
      name: "John doe", // your name
      email: "john@web.com", // your email
      url: "web.com", // your website
    },
  },
};
```

At the time of writing this article, the latest supported version of `openapi` was `3.0.3`. Make sure to modify it to a latest supported version.

Since our API is simple, there is not much information under the `info` object. Feel free to add more in case you have a complex API as described [here](https://swagger.io/docs/specification/api-general-info/).

To test the above:
- Ensure that the development server is up and running from your terminal.
- In your browser, open your documentation page from `http://localhost:4000/api-docs`.
- In case of errors, revisit the steps. 

Otherwise, your webpage should resemble the following:

![general_info_screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/general-info-screenshot.png)

*A screenshot of general info about the API*

### Documenting API servers
Depending on the current environment of the API, it will be operating on different servers.

While in a development environment, the API operates on a local server. While in a testing environment, it is on a testing server, and while in production, it is on a production server.

While documenting, you specify the different servers that the API is operating on depending on the environment.

In our API, we will document it in the development environment by editing the `docs/servers.js` as follows:

```js
module.exports = {
  servers: [
    {
      url: "http://localhost:4000/todos", // url
      description: "Local server", // name
    },
  ],
};
```

Since we will only be operating in development for this API, we have only specified the local server. In case, you are pushing to testing and production environments, make sure you include the information. It follows the same format.

To test this:
- Make sure that your development server is up and running.
- In your browser, refresh the documentation page.
- In case of any errors, revisit the steps. 

Otherwise, the following section should be added to your page:

![servers-screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/servers-screenshot.png)

*A screenshot of the API servers*

### Documenting API tags
Tags are used in grouping different related operations. For example, in an API where you deal with users and stores, you can use tags to differentiate their respective operations.

In our API, since we are dealing only with `todos`, we will only add one tag to the `docs/tags.js` file as follows:

```js
module.exports = {
  tags: [
    {
      name: "Todo CRUD operations", // name of a tag
    },
  ],
};
```

In a more complex API where you have different parties, you could add each party as above in the tags array.

To test this:
- Make sure that the development server is running.
- In your browser, refresh the documentation page.
- In case of errors, revisit the steps. 

Otherwise, this section should be added to your page:

![tags_screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/tags-screenshot.png)

*A screenshot of the API tags*

### Documenting API components
Components are used in containerizing different reusable definitions. The reusable definitions involve schemas, parameters, securitySchemes, requestBodies, responses, headers, examples, links, and callbacks. After their definition, components are accessed using `$ref`.

In our API, we document components by editing the `docs/components.js` file as follows:

```js
module.exports = {
  components: {
    schemas: {
      // id model
      id: {
        type: "string", // data type
        description: "An id of a todo", // desc
        example: "tyVgf", // example of an id
      },
      // todo model
      Todo: {
        type: "object", // data type
        properties: {
          id: {
            type: "string", // data-type
            description: "Todo identification number", // desc
            example: "ytyVgh", // example of an id
          },
          title: {
            type: "string", // data-type
            description: "Todo's title", // desc
            example: "Coding in JavaScript", // example of a title
          },
          completed: {
            type: "boolean", // data type
            description: "The status of the todo", // desc
            example: false, // example of a completed value
          },
        },
      },
      // Todo input model
      TodoInput: {
        type: "object", // data type
        properties: {
          title: {
            type: "string", // data type
            description: "Todo's title", // desc
            example: "Coding in JavaScript", // example of a title
          },
          completed: {
            type: "boolean", // data type
            description: "The status of the todo", // desc
            example: false, // example of a completed value
          },
        },
      },
      // error model
      Error: {
        type: "object", //data type
        properties: {
          message: {
            type: "string", // data type
            description: "Error message", // desc
            example: "Not found", // example of an error message
          },
          internal_code: {
            type: "string", // data type
            description: "Error internal code", // desc
            example: "Invalid parameters", // example of an error internal code
          },
        },
      },
    },
  },
};
```

Since our API is not that complex, we have only included the `schemas` in the components.

In the `schemas`, we have defined the `id`, `Todo`, `TodoInput`, and `Error`. For each schema definition, we are describing its respective data using keys such as `type`, `description`, `example`, and `properties`.

To test this:
- Ensure that the development server is running.
- In your browser, refresh the documentation page.
- In case of errors, revisit the steps. 

The following section should be added to the documentation page:

![schemas_screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/schemas-screenshot.png)

*A screenshot of the API components*

### Documenting API paths
Paths are the routes that are to be accessed. Each route is different from the other based on the method of operation and the data passed.

To document the paths in our API, we will cover each route separately.

#### Getting todos (/todos)
When getting the `todos`, we are sending a `GET` request to `/todos`.

To document this path, we edit the `/docs/todos/get-todos.js` file as follows:

```js
module.exports = {
  // method of operation
  get: {
    tags: ["Todo CRUD operations"], // operation's tag.
    description: "Get todos", // operation's desc.
    operationId: "getTodos", // unique operation id.
    parameters: [], // expected params.
    // expected responses
    responses: {
      // response code
      200: {
        description: "Todos were obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Todo", // Todo model
            },
          },
        },
      },
    },
  },
};
```

From the code snippet above, we have:
- Specified the method of the operation, `get`.
- Specified the tags of the operation.
- Described the operation with a short `description` and an `operationId`.
- Defined the `parameters`. For this case, there is none.
- Defined the expected `responses`. Only a `200` response is expected since we are fetching data. In the response, we also describe the content type and match the schema to that from the components using `$ref`.

To test this:
- Ensure that the development server is running.
- In your browser, refresh the documentation page.
- In case of errors, revisit the steps. 

Otherwise, the following section should be added to the page:

![get_todos_screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/get-todos-screenshot.png)

*A screenshot of getting todos route*

To test it out, click on the `Try it out`, then click `Execute`, and then examine the server response.

#### Getting single todo (/todos/:id)
When getting a single todo, we are sending a `GET` request to `/todos/:id`. The `:id` is for dynamic `id`.

To document this path, we will edit the `/docs/todos/get-todo.js` file as follows:

```js
module.exports = {
  // operation's method
  get: {
    tags: ["Todo CRUD operations"], // operation's tag.
    description: "Get a todo", // operation's desc.
    operationId: "getTodo", // unique operation id
    parameters: [
      // expected params.
      {
        name: "id", // name of the param
        in: "path", // location of the param
        schema: {
          $ref: "#/components/schemas/id", // data model of the param
        },
        required: true, // Mandatory param
        description: "A single todo id", // param desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Todo is obtained", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Todo", // todo data model
            },
          },
        },
      },
      // response code
      404: {
        description: "Todo is not found", // response desc.
        content: {
          // content-type
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Error", // error data model
            },
          },
        },
      },
    },
  },
};
```

From above, we have:
- Specified the method of the operation, `get`.
- Defined the `tags` of the operation.
- Described the operation with a short `description` and an `operationId`.
- Specified the parameters for the operation. 

We describe the `name` of the parameter, the `in` which can be `path`, `header`, `query`, or `cookie`. For our case it's `path`. We point the parameter to its equivalent schema component using `$ref`, specify that it's `required`, and give a short `description` of the parameter.

- Specified the expected responses. For this case, we have two. `200` and `404`. In case todo is found, it will return `200` else `404`. For each response, we are giving a short description, expounding on the content type, and matching the schema to its components equivalent using `$ref`.

To test this:
- Ensure that the development server is running.
- In your browser, refresh the documentation page.
- In case of errors, revisit the steps. 

The following section should be added to the page:

![get_todo_screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/get-todo-screenshot.png)

*A screenshot of getting a single todo route*

To try it out, from the previous operation, get an `id`. Click the `Try it out` button of the current operation, paste in the `id` in the parameters section, and observe the server responses.

#### Creating a todo (/todos)
When creating a todo, we are sending a `POST` request to `/todos` with the data of the todo. The data is in the `requestBody`.

To document this path, we need to edit the `docs/todos/create-todo.js` file as follows:

```js
module.exports = {
  // operation's method
  post: {
    tags: ["Todo CRUD operations"], // operation's tag
    description: "Create todo", // short desc
    operationId: "createTodo", // unique operation id
    parameters: [], // expected params
    requestBody: {
      // expected request body
      content: {
        // content-type
        "application/json": {
          schema: {
            $ref: "#/components/schemas/TodoInput", // todo input data model
          },
        },
      },
    },
    // expected responses
    responses: {
      // response code
      201: {
        description: "Todo created successfully", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
```

From above, we have:
- Specified the method of the operation, `post`.
- Specified the `tags` of the operation.
- Described the operation with a short `description` and an `operationId`.
- Specified the `parameters` of the operation. For this case, there is none.
- Specified the `requestBody`. With it, we have specified the content type and matched the schema to its equivalent in the components using `$ref`.
- Specified the expected responses. `201` if the todo is created successfully and `500` if there is a server error.

To test this:
- Ensure that the development server is running.
- In your browser, refresh the documentation page.
- In case of errors, revisit the steps. 

The following section should be added to your page:

![create_todo_screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/create-todo-screenshot.png)

*A screenshot of creating todo route*

To test the functionality, click the `Try it out` button, fill the data in the `Request Body`, click `Execute`, and then observe the server responses.

#### Updating a todo (/todos/:id)
When updating a todo, we are sending a `PUT` request to `/todos/:id`. The dynamic `id` is `:id`. An update for todo in this API involves toggling the completed value.

To document this path, we have to edit the `docs/todos/update-todos.js` file as follows:

```js
module.exports = {
  // operation's method
  put: {
    tags: ["Todo CRUD operations"], // operation's tag
    description: "Update todo", // short desc
    operationId: "updateTodo", // unique operation id
    parameters: [
      // expected params
      {
        name: "id", // name of param
        in: "path", // location of param
        schema: {
          $ref: "#/components/schemas/id", // id model
        },
        required: true, // mandatory
        description: "Id of todo to be updated", // short desc.
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Todo updated successfully", // response desc.
      },
      // response code
      404: {
        description: "Todo not found", // response desc.
      },
      // response code
      500: {
        description: "Server error", // response desc.
      },
    },
  },
};
```

From above, we have:
- Specified the method of operation, `put`.
- Specified the `tags` of the operation.
- Described the operation with a short `description` and an `operationId`.
- Specified the parameters for the operation. We have described the `name`, `in`, `schema`, `required`, and `description` properties. With the `schema`, we have pointed to the components equivalent using `$ref`.
- Specified the different responses we expect. `200` if a todo is updated successfully, `404` if the todo with that `id` is not found, and `500` if there is a server error updating the todo.

To test this:
- Ensure that the development server is running.
- In your browser, refresh the documentation page.
- In case of errors, revisit the steps. 

The following section should be added to your page:

![update_todo_screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/update-todo-screenshot.png)

*A screenshot of updating todo route*

To try it out, get an `id` of a todo from the first operation, click the `Try it out` button, paste in the `id` in the parameters section, click `Execute`, and observe the server response.

#### Deleting a todo (/todos/:id)
When deleting a todo, we are sending a `DELETE` request to `/todos/:id`. The dynamic `id` is `:id`.

To document this path, we have to edit the `/docs/todos/delete-todo.js` file as follows:

```js
module.exports = {
  // operation's method.
  delete: {
    tags: ["Todo CRUD operations"], // operation's tag
    description: "Deleting a todo", // short desc
    operationId: "deleteTodo", // unique operation id
    parameters: [
      // expected parameters
      {
        name: "id", // name of param
        in: "path", // location of param
        schema: {
          $ref: "#/components/schemas/id", // id model
        },
        required: true, // mandatory
        description: "Deleting a done todo", // param desc
      },
    ],
    // expected responses
    responses: {
      // response code
      200: {
        description: "Todo deleted successfully", // response desc
      },
      // response code
      404: {
        description: "Todo not found", // response desc
      },
      // response code
      500: {
        description: "Server error", // response desc
      },
    },
  },
};
```

From above, we have:
- Specified the method of operation, `delete`.
- Specified the `tags` of the operation.
- Described the operation with a short `description` and `operationId`.
- Specified the `parameters`. For a parameter, we have described the `name`, `in`, `schema`, `required`, and `description` properties.
- Specified the `responses`. In this operation, we can get a `200` response if the todo is deleted successfully, a `404` response if the todo with that `id` is not found, and a `500` response if there is a server error deleting the todo.

To test this:
- Ensure that the development server is running.
- In your browser, refresh the documentation page.
- In case of errors, revisit the steps. 

Otherwise, the following section should be added to your page:

![delete_todo_screenshot](/engineering-education/documenting-node-js-rest-api-using-swagger/delete-todo-screenshot.png)

*A screenshot of deleting todo route*

To try this out, get the `id` of the updated todo, click the `Try it out` button, paste the `id` in the parameters section, click the `Execute` button, and then observe the server response.

### Summary
In this article, we have documented a simple Node.js REST API using swagger by following the below steps:

- [Documenting API general information](#documenting-api-general-information)
- [Documenting API servers](#documenting-api-servers)
- [Documenting API tags](#documenting-api-tags)
- [Documenting API components](#documenting-api-components)
- [Documenting API paths](#documenting-api-paths)

### Conclusion
Documenting an API serves as an advantage towards the usability of the API, since anyone can understand and consume it. 

Swagger does the heavy lifting process in documenting a RESTful API. Depending on the API you are building, swagger offers vast [functionalities](https://swagger.io/docs/specification/about/).

You can find the finalized code for this article from this [GitHub repository](https://github.com/mwangiKibui/node.js-rest-api-documentation).

In case of any query, you can reach me via [Twitter](https://twitter.com/itsmkibui).

Happy coding!

### References
Feel free to ponder upon the following resources:
- [YAML tutorial](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started/)
- [JSON tutorial](https://www.tutorialspoint.com/json/index.htm)
- [Automatic API documentation in Node.js using swagger](https://medium.com/swlh/automatic-api-documentation-in-node-js-using-swagger-dd1ab3c78284)

---
Peer Review Contributions by: [Srishilesh P S](/engineering-education/authors/srishilesh-p-s/)
