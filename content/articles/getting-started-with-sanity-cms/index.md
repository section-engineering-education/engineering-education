### Getting Started with Sanity CMS
It is inefficient to build applications while also worrying about the content or database.

Sanity is a React open-source content management system. In case you are unfamiliar with the term, a content management system (CMS) is a software application that allows users to create, manage, publish, and store digital content. CMS helps to create apps without having to start from scratch, and it is mostly utilized in web and business content management systems.

Sanity lets us focus on app designs rather than worrying about content file storage and databases. This tool provides efficient methods to create scalable and user-friendly applications. 
### Sanity as a Headless CMS
A headless CMS is a backend-only content management system that makes content available via an API to any client device without the need for a built-in display layer. Headless CMS relies on JAMstack, which stands for (JavaScript, APIs, and Markup) to turn your web application content into a cloud-based API where it can be accessed from any application. In JAMstack, sanity is the A or (API) as it is decoupled from your app, giving you a single source of truth for your database to model and custom tail the content. Sanity provides an open-source studio to manage content where the data is stored in a content lake. It supports queries from a CDN using GraphQL, webhooks, and real-time updates.
#### Prerequisites
- Install Node.js 
- Code Editor (Visual Studio Code is recommended)
### Getting Started
#### Setting up our Sanity application - Sanity CLI Installation
To get started with Sanity, install the Sanity CLI.

Run the command below in your terminal.
- `npm install -g @sanity/cli` 
- `npx sanity init` (project initialization)
#### Sanity Command Line Interface
We have arrived at the Sanity command-line interface, and we will need to answer a few questions so that we can create the ideal project structure.
##### Steps:
- Sign in with Google, GitHub, or an email address and password.
- Fill in the name of your project.
- Use the dataset's default settings.
- Select a project route.
- Choose a blank project with no predefined schema to start sanity.
#### Starting sanity content studio
- Run `sanity start` in your terminal.
- In your browser tab, go to `http://localhost:3333` (Launching sanity)

![sanity-studio](/engineering-education/getting-started-with-sanity-cms/terminal.png)
>Note: Whenever you want to launch sanity, run localhost:3333, this is the default port for Sanity CMS.

Below is what our project should look like with no predetermined data.

![sanity-studio](/engineering-education/getting-started-with-sanity-cms/sanity-screenshot1.png)

Take a peek at the files and folders that sanity has created automatically, particularly the schema folder.
#### Creating Schema
Schema is a representation of a plan. It depicts how our database will be structured.
######  Default sanity schema.js
Our sanity default schema.js should look exactly like this.
![sanity-studio](/engineering-education/getting-started-with-sanity-cms/default-schema.png)

By default, we only have one schema.js file. We will need to define our schemas and types as a result.
Create a `new.js` file to create a custom schema file. For example `nameofSchema.js` file in the schema folder, inside the file, you will write plain Javascript code.
###### See the example below
```js
export default{
    name: 'user',
    title: 'User',
    type: 'document',
    fields: [
        {
            name: 'userName',
            title: 'Username',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'string'
        }
    ]
}
```
#### Importing custom schema 
 To make use of our custom schema, we need to import it into the default schema.js file and also declare the type. We can make as many schema files as we need; all we have to do is import them all.
 ###### See the example below
![import custom schema](/engineering-education/getting-started-with-sanity-cms/import-schema.png)

Let us take a look at our sanity studio to see the changes.
![sanity-studio](/engineering-education/getting-started-with-sanity-cms/sanity-screenshot2.png)

It appears to be different from the initial layout because now we have the content and our first document type, which is the user. 
 
 Go ahead and fill in the username and the image link to publish a new user. We just implemented a database by establishing a schema that provides the ability for users to add new content.
#### Deploy Sanity project
Go ahead and run `sanity deploy` to deploy a sanity project. Sanity deployed applications are real-time, meaning that any changes you make locally after deployment will be reflected in the deployed version.
### Conclusion
Finally, we understood what Sanity CMS is and its concepts, installing and setting up the sanity CLI, schemas, and deployment.

We can construct sophisticated apps quickly using Sanity since we don't have to worry about the content file or database query.
### Additional Reading
[The Official Sanity Documentation](https://www.sanity.io)
[Sanity slack channel](https://slack.sanity.io/)
[Read more on CMS](https://www.sitecore.com/knowledge-center/digital-marketing-resources/what-is-a-cms)



