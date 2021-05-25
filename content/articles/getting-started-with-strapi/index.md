---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-strapi/
title: Getting Started with Strapi API CMS
description: This tutorial will introduce the reader to the Strapi Node.js API CMS. We will create a simple CRUD API using Strapi. We will also test these endpoints using Postman.
author: geoffrey-mungai
date: 2021-05-25T00:00:00-10:00
topics: [Node.js, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/getting-started-with-strapi/hero.jpg
    alt: Strapi API example
---
[Strapi](https://strapi.io) is an open-source headless CMS used for building fast and easily manageable APIs written in JavaScript. It enables developers to make flexible API structures easily using a beautiful user interface. 
<!--more-->
Strapi can be used with various databases including MongoDB, PostgreSQL, etc.
### Prerequisites
To follow along with this tutorial, you need [some understanding of REST APIs](https://www.smashingmagazine.com/2018/01/understanding-using-rest-api/). You will also need [Postman](https://www.postman.com/downloads/) for testing API endpoints.

In this tutorial, we are going to:
1. Create an API using Strapi.
2. Test CRUD API endpoint using Postman.

Let's get started.

### Step 1 -- Installing Node.js and Yarn
To create a Strapi project, you need at least Node.js 14 installed in your machine. If you are running on Windows or Mac, head over to the [downloads page](https://nodejs.org/en/download/) to get the Node.js installer.

If you are running on Linux, open a terminal window and run the following commands to install Node.js 14.

```bash
$ curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

We will be using [Yarn package manager](https://yarnpkg.com/) to create the Strapi project. Open a new terminal window and run the following command to install Yarn.

```bash
$ npm install --global yarn
```

### Step 2 -- Creating the Strapi project
Let's create a file manager API to demonstrate basic Strapi usage. Run the following command on a terminal.

```bash
$ yarn create strapi-app file-manager --quickstart
```

Please be patient as this command will take some time to execute.

> Strapi uses a SQLite database by default. To setup Strapi using another database, e.g. MongoDB or PostgreSQL, remove the `--quickstart` flag from the above command.

The command creates a new folder `file-manager` containing the project files and directories. It also serves your Strapi at http://localhost:1337/admin.

![Strapi first launch](/engineering-education/getting-started-with-strapi/strapi_first_launch.jpg)

Before you can use the newly created Strapi, you need to create an administrator. Fill in and submit the form to create one.

### Step 3 -- Creating the FILES collection
A Strapi collection provides a way of creating object templates. It acts like a [class in Object-Oriented Programming](https://brilliant.org/wiki/classes-oop/).

Let's create a `file` item (collection) containing a name and description field.

1. Click **[Content-Types Builder](http://localhost:1337/admin/plugins/content-type-builder)** from the sidebar. 
2. Then, click **Create new collection type** under **COLLECTION TYPES**.

![Creating new Strapi collection](/engineering-education/getting-started-with-strapi/collection.png)

3. Type `Files` under **display name** and hit `Continue`. 
4. Click the **Text** field and type `name` under **Name**.
5. Check the `Required field` and the `Unique field` in the **ADVANCED SETTINGS** tab.
6. Click **Add another field**.
7. Select **Rich text** and type `description` in the **Name** field. Then hit **Finish**.
8. Hit **Save** to save the collection and wait for the server to restart.

### Step 4 -- Creating the TYPES collection
Let's add another field to the `file` item: the `type` field. This field will indicate the type of file. eg. a document, video, audio, etc.

To see how we can do this, we'll create another collection type. 

1. Head over to the **[Content-Types Builder](http://localhost:1337/admin/plugins/content-type-builder)** and click **Create a new collection type**.
2. Type `Type` under **Display name** and hit **Continue**.
3. Click the **Text** field and type `name` under **Name**.
4. Check the `Required field` and the `Unique field` in the **ADVANCED SETTINGS** tab and hit **Finish**.
5. Click **Save** to save the collection.
6. Navigate to **[Content-Type Builder > COLLECTION TYPES > Files](http://localhost:1337/admin/plugins/content-type-builder/content-types/application::files.files)** and click **ADD ANOTHER FIELD TO THIS COLLECTION TYPE**.
7. Select the **Relation** field. 
8. On the right-hand dropdown, select `Type`. Then select the relationship that reads `File has one Type`.

![Creating relations in Strapi collections](/engineering-education/getting-started-with-strapi/relations.png)

5. Hit **Finish** and then **Save** the collection.

### Step 5 -- Adding data to the collections
1. Navigate to **Types** in the left-hand menu and click **Add New Types**.
2. Type `Document` under the **Name** field and click **Save**.
3. Navigate to **Files** in the left-hand menu and click **Add New Files**. 
4. Type `statement.pdf` under **Name** and `Your monthly spending` under **Description**.
5. Select `Document` from the **Type** dropdown and click **Save**.

Feel free to add other items to your collections.

### Step 6 -- Publishing your content
To publish your collections, you need to allow CRUD operations for those specific collections. Let's publish the `Files` and `Types` collections.

1. Navigate to [**GENERAL > Settings > USERS & PERMISSIONS PLUGIN > Roles**](http://localhost:1337/admin/settings/users-permissions/roles).
2. Click **Public**.
3. Scroll down to **FILE** and **TYPE** under **Permissions > APPLICATION** and check the following checkboxes:

    | Operation | Description                  |
    |-----------|------------------------------|
    | `create`    | for adding a single item   |
    | `find`      | for getting all items      |
    | `findone`   | for getting a single item  |
    | `update`    | for updating a single item |
    | `delete`    | for deleting a single item |

4. Click **Save**.
5. Navigate to the [`statement.pdf`](http://localhost:1337/admin/plugins/content-manager/collectionType/application::files.files/1) and [`Document`](http://localhost:1337/admin/plugins/content-manager/collectionType/application::type.type/1) you created earlier and click **Publish**.

![Publish collection Strapi](/engineering-education/getting-started-with-strapi/publish.png)

You can now access your collections at http://localhost:1337/files and http://localhost:1337/types.

### Step 7 -- Testing the endpoints
#### Retrieving items in a collection
Open Postman and make a `GET` request to http://localhost:1337/files as shown below. The endpoint returns a list of the items you added to the `Files` collection.

![GET all files](/engineering-education/getting-started-with-strapi/postman-get.png)

Similarly, you can get a list of the items in the `Type` collection by performing a GET to http://localhost:1337/types.

#### Retrieving a single item
A GET request to http://localhost:1337/files/1 will return the `file` with the id `1`.

![GET a single item](/engineering-education/getting-started-with-strapi/get-single-item.png)

Similarly, a GET request to http://localhost:1337/types/1 will return the `type` with id `1`.

#### Creating an item
A POST request to http://localhost:1337/files/ will create a new entry in the `Files` collection. The endpoint returns the created object upon a successful POST request, as shown below.

![Create a single item](/engineering-education/getting-started-with-strapi/post-item.png)

Similarly, a POST request to http://localhost:1337/types will create a new entry in the `Types` collection.

#### Updating an item
A PUT request to http://localhost:1337/files/2 will update the `file` with id `2`. The endpoint returns the updated object on a successful PUT request, as shown below.

![Updating an item](/engineering-education/getting-started-with-strapi/update-item.png)

#### Deleting an item
A `DELETE` request to http://localhost:1337/files/2 will delete the entry with id `2`.

Trying to hit the same endpoint again will return the text `Not Found`.

![Deleting an item](/engineering-education/getting-started-with-strapi/delete-item.png)

### The next steps
With the collections in place, you can now consume your API using your awesome frontend. Strapi offers integrations for some frontend frameworks like [Vue.js](https://strapi.io/integrations/vuejs-cms), [Angular](https://strapi.io/integrations/angular-cms), [React](https://strapi.io/integrations/react-cms), etc. 

It also offers integrations with static site generators like [Hugo](https://strapi.io/integrations/hugo-cms). Strapi also has an Apollo-based [GraphQL plugin](https://strapi.io/documentation/developer-docs/latest/development/plugins/graphql.html) for querying content.

You can also browse through some of the available Strapi starters [here](https://strapi.io/starters). 

Strapi has many official and community-made [plugins](https://github.com/strapi/awesome-strapi#plugin--providers) which you can install to add functionality to your Strapi backend.

To deploy your Strapi API see the [deployment guidelines](https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/deployment.html#hosting-provider-guides).

### Conclusion
Strapi is such a cool and awesome tool when it comes to increasing productivity. It reduces the amount of code the developer has to write and manage. Strapi enables the developer to build a strong backend using an easy-to-use interface. Feel free to play around with Strapi. 

It has more than just collections to offer.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)
