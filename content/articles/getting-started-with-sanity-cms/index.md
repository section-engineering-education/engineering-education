### Getting Started with Sanity CMS
It is inefficient to build applications while also worrying about the content or database.

Sanity is a React open source content management system. In case you are unfamiliar with the term, a content management system (CMS) is a software application that allows users to create, manage, publish, and store digital content. CMS helps to create apps without having to start from scratch and it is mostly utilized in web and business content management systems.

Sanity lets us focus on apps designs rather than worrying about content file storage and databases. This tool provides efficient methods to create scalable and user-friendly applications. 

Sanity is a content management and delivery platform that makes it simple to manage and provide structured information in our database. With the Sanity studio dashboard, we can edit, update, contribute, and manage all of our content.
#### Prerequisites
- Install Node.js 
- Code Editor (Visual Studio Code is recommended)
### Getting Started
#### Setting up our Sanity application - Sanity CLI Installation
To get started with Sanity, install Sanity CLI.

Run the command below in your code editior.
- `npm install -g @sanity/cli` 
- `npx sanity init` (project initialization)
#### Sanity Command Line Interface
We have arrived at the Sanity command-line interface, and we will need to answer a few questions so that we can create the ideal project structure.
##### steps:
- Sign in with Google, GitHub, or an email address and password.
- Fill in the name of your project.
- Use the dataset's default settings.
- Select a project route.
- Choose a blank project with no predefined schema to start sanity
#### Starting sanity content studio
- Run `sanity start` in your terminal.
- In your browser tab go to `http://localhost:3333` (Launching sanity)

![sanity-studio](/engineering-education/getting-started-with-sanity-cms/terminal.png)

>Note: Whenever you want to launch sanity, run localhost:3333, this is the default port for Sanity CMS.

Below is what our project should look like with no predetermined data.

![sanity-studio](/engineering-education/getting-started-with-sanity-cms/sanity-screenshot1.png)

Take a peek at the files and folders that sanity has created automatically, particularly the schema folder.
#### Creating Schema
Schema is a representation of a plan; it depicts how our database will be structured.
######  Default sanity schema.js
```js
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
  ]),
})

```

By default, we only have one schema, we will need to define our schemas and types as a result.
Create `new .js` file to create a custom schema file. For example `nameofSchema.js` file in the schema folder, inside the file, you will write plain javascript code.
###### Example below
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
 Import custom schema inside the default schema.js file
```js
// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
//My custom schema
import user from './user';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    //My schema type here which is basicaly the name of the schema i am importing 
    user
  ]),
})
```
![sanity-studio](/engineering-education/getting-started-with-sanity-cms/sanity-screenshot2.png)

 It appears to be different from the initial layout because now we have the content and our first document type which is the user. 
 
 Go ahead and fill in the username and the image link to publish a new user, we just implemented a database by establishing a schema that provides the ability for users to add new content. 

#### Deploying Sanity project
Go ahead and run `sanity deploy` to deploy a sanity project. Sanity deployed applications are real-time, meaning that any changes you make locally after deployment will be reflected in the deployed version.
### Conclusion
Finally, we understood what Sanity CMS is and its concepts, installing and setting up the sanity CLI, schemas, and deployment.

 We can construct sophisticated apps quickly using Sanity since we don't have to worry about the content file or database query.
### Further reading
[The Sanity Official Documentation](https://www.sanity.io)
[Sanity slack channel](https://slack.sanity.io/)
[Read more on CMS](https://www.sitecore.com/knowledge-center/digital-marketing-resources/what-is-a-cms)



