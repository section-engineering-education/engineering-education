---
layout: engineering-education
status: publish
published: true
url: /introduction-to-nextjs-with-typescript-and-firebase-database/
title: Introduction to Next.js, TypeScript, and Firebase Database
description: This article will provide a step-by-step guide on how to create a web application using Next.js, TypeScript, and the Firebase database.
author: 
date: 2021-10-26T00:00:00-03:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/hero.png
    alt: Introduction Next.js and Firebase Hero Image
---
Next.js is a React-based framework that enables developers to create production-ready web applications with ease. It features a variety of predefined functionalities that allow developers to quickly set up applications at scale.
<!--more-->

Next.js is a hybrid framework. This means it can be used for both client-side and server-side Rendering. It can also be utilized in Static Generation functions that you can you use to fetch data and pre-render at build time, which produces fast web pages.

Some of the key features of Next.js include:

- Good SEO support. It's generally better for SEO sites. This means that your site will appear at the top of search results.
- Next.js provides pre-configured setups. For example, to create a Next.js app, you run a one-time command that generates a well-structured project that you can then scale up to a full-fledged application.
- Built-In CSS Support. This means it extends the concept of `import` that allows you to import CSS files from a JavaScript file.
- It provides TypeScript integration out of the box. This means when creating Next.js with TypeScript, you don't have to set up TypeScript manually. Instead, you just run a one-time command that automatically sets up TypeScript within your Next.js project.

To get further insights about Next.js basic features, check their [documentation](https://nextjs.org/docs).

This article will go through Next.js with TypeScript and Firebase from a beginner's perspective by building a simple todos app with all the CRUD operations involved.

### Prerequisites
To follow along with this article, the following requirements are essential;

- Have [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge of HTML, CSS, and JavaScript fundamentals.
- Prior knowledge of working with [React](https://reactjs.org/).
- Beginner knowledge of working with [Next.js](https://nextjs.org/).
- Basic knowledge of working with [TypeScript](https://www.typescriptlang.org/).

### Introduction to Firebase
Firebase is a cloud-hosted NoSQL database. That means data is not stored in tables or use the structured query language(SQL) to perform database operations. Check this guide to [compare and contrast NoSQL and SQL databases](/engineering-education/sql-or-nosql-when-to-choose-what/).

One of the advantages of using the Firebase database is that it is real-time. The data is synced in real-time. This database can be implemented across multiple devices and different platforms. This means any changes you perform on your database are reflected in all the devices in real-time.

When using the Firebase database, don't need to configure a server, worry about security issues, or build APIs to communicate with the server. This means the application you build is completely serverless.

When using the Firebase database, you have two main options to select from, the Firebase real-time database and the Firebase cloud Firestore.

Unlike SQL-based databases, Firebase's real-time database uses JSON trees to store data. For example, here is how data is represented in an SQL database.

![sql-table](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/sql-table.png)

[Image Source](https://youtu.be/kXYalWgc_rU?t=242)

As you can see, there are two tables for storing Authors and Stories. Each author has a unique ID associated with every story. This shows the relation between the author and the stories that belong to that specific author.

However, the case is different when using a NoSQL database such as the Firebase real-time database. This data is represented in JSON, and the relation is shown in JSON nodes. For example, here is how the above SQL tables can be represented in a Firebase real-time database.

![nosql-json-trees](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/nosql-json-trees.png)

[Image Source](https://youtu.be/kXYalWgc_rU?t=254)

Data is saved in JSON form with two main nodes, the authors and stories. Then each story will have an author id to identify the other of the story.

On the other side, there is a difference between the Firebase real-time database and the Firebase cloud Firestore and how they store data. Unlike a real-time database that stores data in the JSON object, cloud Firestore stores data in horizontally scaling Documents. Data is stored in a tree-like hierarchical structure. A cloud Firestore database is made up of Documents and Collections.

To learn more about the Firebase cloud Firestore, we will use it as a use-case in this guide and implement it with Next.js and TypeScript.

### Setting up TypeScript
We want to run this application using TypeScript. Next.js is buddled with JavaScript. It has automatic TypeScript support. TypeScript is a close relative to JavaScript. It comes with additional features that make your code minimalistic. These features include static typing, type notation, types checking, etc. Check this guide to [compare and contrast TypeScript and JavaScript](/engineering-education/javascript-vs-typescript/).

To use TypeScript, you need to install the TypeScript JavaScript library. This will make TypeScript accessible to our project. With Next.js, you just need to add a `--ts` flag to the `create-next-app` command. For example, running `npx create-next-app@latest --ts next-js-firebase-app` will automatically set the default TypeScript environment, which will be used to execute any TypeScript-related code. This will add `typescript`, and `@types/react` to our Next.js project. Next.js is a React.js framework. That means Next.js will use React as its base code. So while using TypeScript, we need React type definitions. `@types/` provides TypeScript features to third-party frameworks such as React. That's why `@types/react` gets installed along with `typescript`. Check this [guide to learn more about TypeScript](/engineering-education/a-friendly-beginner-guide-to-typescript/).

Now let's dive in and see how we can implement an application using these cool technologies.

### Creating a Firebase project
The very first thing will be to set up a Firebase project so that we can use the Firebase database. To do this, follow the following steps:

- First, go to the [Firebase console](https://console.firebase.google.com/) and *Add project*. Enter the preferred name of your project, i.e., `next-js-todos-app`. Then click continue.
- Then `Configure Google Analytics` and click continue.

- Finally, *Create project* and give it some time to complete the process. When the project is ready, click *Continue*.

In the next step, we will set up a Firebase app.

### Adding a Firebase app
After creating a Firebase project, we will create a Firebase app. To get started by adding Firebase to your app
following these steps:

- On the newly created project page, click the web icon (`</>`).
- Enter your preferred app name, i.e., `next-js-todos-app`. Then click *Register app* and *Continue to console*.

In the next step, we will set up a Firestore.

### Setting up Firestore
To set up Firestore, follow the following steps:

- On the Created Firebase App, navigate to the left menu, under build, and click *Firestore Database* then *Create database*.
- Since we are not building a production application, select the *start in test mode* and move to the *Next* step.
- Choose the cloud Firestore location from the list of options available and then click *Enable* to set the selected location. Give it time to set up and *Provision Cloud Firestore*.

In the resulting page, we will start by creating a Collection to be populated from our Next.js application. To do this:

- Click *Start Collection* and add the Collection id as *todos* and move to the *Next* step.
- Auto-populate the Document id field by clicking *Auto-ID* Add a *title* field as a string, and give it a value of *Cooking*.
- Click *Add field*, add a *description* field as a string, and give it a value of *Cook a delicious dinner*.
- Add a new field *done*, which is a Boolean, and give it a value of *false*. Your form should be similar to:

![initial-collection-setup-form](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/initial-collection-setup-form.png)

Save the above-created Document. The Document should now be reflected in the Collection as shown below:

![initial-collection](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/initial-collection.png)

In the next step, we will set up our Next.js application.

### Setting up Next.js app
To set up our Next.js application, we will use [create-next-app](https://nextjs.org/docs/api-reference/create-next-app), a tool provided by the Next.js team, to bootstrap your project on the fly.

To set it up, we will follow these steps:

First, create a folder where you want the project to reside, then change the directory to the created folder.

```bash
cd ./your-project-folder-path
```

Run the following command to bootstrap the Next.js application with TypeScript:

```bash
npx create-next-app@latest --ts next-js-firebase-app
```

The above command will create the Next.js application inside the `next-js-firebase-app` folder. We have also added a `--ts` flag. This means the Next.js app generated will be TypeScript friendly. All files will be set to `.tsx` and not the usual `.js` for JavaScript-related code.

Since we will be working with Firebase, the next step is to install the Firebase package. This will add the Firebase SDK to the Next.js project. Change the directory and make sure your command line points to the `next-js-firebase-app` folder. Then run this command to get the Firebase JavaScript library installed.

```bash
npm install firebase
```

With Firebase installed, run the following command to start the development server. This will help you visualize how the sample Next.js template looks like. It has ready-made code and project structure that starts a simple server to execute Next.js on the browser.

```bash
npm run dev
```

Now navigate to your browser and go to `http://localhost:3000`. You should be able to view the following default Next.js landing page rendered on your browser.

![default-landing-page](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/default-landing-page.png)

This shows the Next.js boilerplate is working and ready to be worked on by adding more code as you scale up your application. We can start on building on our codebase by integrating Firebase and adding TypeScript.

### Initializing Firebase app
The next step will be to initialize the Firebase so that our Next.js app can be able to communicate with Firebase and perform any necessary operation.

In simple terms, initializing a Firebase app means connecting the Firebase database instance/SDK so that we can work on and scale on the Next.js application we created. This simply involves collecting the Firebase credentials that are specific to the Firebase application we earlier created.

To initialize it, we will follow the following steps:

First, create an `env.local` file in your project root folder. This will host the environmental variables or, rather, the Firebase database credentials that Next.js needs to establish a communication between the two.

Then, from your Firebase project dashboard, click on the gear icon on the left menu of your Firebase application and head *project settings*.

Finally, scroll down to *your apps* section and then to the *SDK setup and configuration*. In the provided application settings, we will take `firebaseConfig` object. Extract its contents to the `.env.local` file as below:

```js
NEXT_PUBLIC_FIREBASE_API_KEY = "your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "your_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "your_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "your_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID = "your_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "your_measurement_id"
```

Replace every environment with the credentials listed on the `firebaseConfig` object of your Firebase application.

Now create a folder `firebase` inside the project root folder. Inside the `firebase` folder, create a file `clientApp.ts`. Below is how we will configure the Firebase instance. So follow these steps and add the necessary code to your `clientApp.ts` file.

- Start by importing `initializeApp` from the Firebase package.

```ts
import {initializeApp} from "firebase/app";
```

- Call the `initializeApp` function and pass in your credentials as listed in the `env.local` file.

```ts
initializeApp( {
   apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
   authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
   projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
   storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
   messagingSenderId:process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
   appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
   measurementId:process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});
```

- import `getFirestore` from firebase.

```ts
import {getFirestore} from "firebase/firestore";
```

- Create a Firestore instance.

```ts
const firestore = getFirestore();
```

- Export `firestore` so that it can be accessible by other files that we will create later in this project.

```ts
export {firestore};
```

Since we have environmental variables, we will have to restart the development server if your server is up and running. Press `ctrl + c` to close it, and then `npm run dev` to start it.

In the next step, we will query the Documents from the Firestore.

#### Querying Documents from Firestore
To query the Documents from Firestore, we will work on the `pages/index.tsx` file. Navigate to this file and start by editing the default boilerplate code as such.

```ts
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
const Home: NextPage = () => {
return (
   <div className={styles.container}>
   <Head>
     <title>Todos app</title>
     <meta name="description" content="Next.js firebase todos app" />
     <link rel="icon" href="/favicon.ico" />
   </Head>
   <main className={styles.main}>
     <h1 className={styles.title}>
     Todos app
     </h1>
   </main>
   <footer className={styles.footer}>
     <a
     href="#"
     rel="noopener noreferrer"
     >
     Todos app
     </a>
   </footer>
   </div>
)
}
export default Home
```

The above is just a skeleton of where we will start working on this todos app.

We have changed the `pages/index.tsx`, which means the existing linked CSS code won't work on the newly added code. The following CSS code will format the newly added code and update its appearance where necessary. Edit `styles/Home.module.css` file as follows:

```css
.container {
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.main {
  padding: 1rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.footer {
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
}
.footer a {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
}
.title a {
  color: #0070f3;
  text-decoration: none;
}
.title a:hover,
.title a:focus,
.title a:active {
  text-decoration: underline;
}
.title {
  margin: 0;
  line-height: 1.15;
  font-size: 1.5rem;
}
.title,
.description {
  text-align: center;
}
.description {
  line-height: 1.5;
  font-size: 1.5rem;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  margin-top: 1rem;
}
.card {
  margin: 1rem auto;
  padding: 0.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  width: 60%;
}
.card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}
.card p {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.5;
}
.cardActions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
}
.form {
  width: 50%;
  margin: 1rem auto;
  padding: 10px;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
}
.formGroup {
  width: 100%;
  margin: 1rem 0px;
}
.formGroup label {
  display: block;
  margin-bottom: 0.5rem;
}
.formGroup input[type="text"] {
  width: 100%;
  padding: 10px;
}
.formGroup textarea {
  width: 100%;
  padding: 10px;
}
.error {
  color: red;
  text-align: center;
}
.success {
  color: green;
  text-align: center;
}
.success a {
  color: blue;
  text-decoration: underline;
}
@media (max-width: 600px) {
  .grid {
   width: 100%;
   flex-direction: column;
  }
}
```

Feel free to edit these styles to your preferred appearance.

In `pages/index.tsx`, import the Firestore from the `clientApp.ts` file and create a pointer to the todos Collection. Then use `useState` to host the state of our todos and loading as shown below:

```ts
import { firestore } from '../firebase/clientApp';

import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
const todosCollection = collection(firestore,'todos');

import { useState } from 'react';
const [todos,setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
const [loading,setLoading] = useState<boolean>(true);
```

A todo will have a type of `QueryDocumentSnapshot<DocumentData>`. We are also initializing loading to `true` to avoid accessing `todos` when they are not fully loaded. So now create a function to get these todos and construct a `useEffect` hook and call the method `getTodos`:

```ts
const getTodos = async () => {
   // construct a query to get up to 10 undone todos 
   const todosQuery = query(todosCollection,where('done','==',false),limit(10));
   // get the todos
   const querySnapshot = await getDocs(todosQuery);
   
   // map through todos adding them to an array
   const result: QueryDocumentSnapshot<DocumentData>[] = [];
   querySnapshot.forEach((snapshot) => {
   result.push(snapshot);
   });
   // set it to state
   setTodos(result);
};

useEffect( () => {
   // get the todos
   getTodos();
   // reset loading
   setTimeout( () => {
     setLoading(false);
   },2000)
},[]);
```

From above, we are getting the todos and resetting the todos after every two seconds.

We need show these todos in a browser. Let's create a Next.js view to show the fetched todos. Add the following code just below the `index.tsx` `title`, i.e., `<h1className={styles.title}> Todos app</h1>` Check this on [GitHub](https://github.com/Rose-stack/full-stack-nextjs-with-typescript-and-firebase-database/blob/main/pages/index.tsx) if you get stuck

```ts
<div className={styles.grid}>
{
  loading ? (
   <div className={styles.card}>
    <h2>Loading</h2>
   </div>
  ): 
  todos.length === 0 ? (
   <div className={styles.card}>
    <h2>No undone todos</h2>
    <p>Consider adding a todo from <a href="/add-todo">here</a></p>
   </div>
  ) : (
   todos.map((todo) => {
    return (
     <div className={styles.card}>
      <h2>{todo.data.arguments['title']}</h2>
      <p>{todo.data.arguments['description']}</p>
      <div className={styles.cardActions}>
      <button type="button">Mark as done</button>
      <button type="button">Delete</button>
      </div>
     </div>
    )
   })
  )
}
</div> 
```

From above, we are displaying a `loading` text that checks whether we have todos or not. If we don't have, we are displaying a message; otherwise, existing todos will be mapped and shown through the set UI.

In this case, since we added a todo when setting up the Firestore database, you should now be able to see your todos from the homepage. In this case, ensure your server is running, and if not, run `npm run dev` and open `http://localhost:3000` in your browser. Your homepage should resemble:

![querying-todos](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/querying-todos.png)

Since we only added one todo, in the next step, we will work on a form for creating a todo to add more todos to our database.

### Adding a Document to Firestore
To add a Document to Firestore, we need to create a form to input a new todo `title`, and `description`. To do this, we will follow the following steps:

In the `pages` folder, create a file `add-todo.tsx` setup and the following basic form:

```ts
import type { NextPage } from 'next'
import Head from "next/head";
import { useState } from 'react';
import styles from '../styles/Home.module.css'
const AddTodo:NextPage = () => {
   const [title,setTitle] = useState<string>(""); // title
   const [description,setDescription] = useState<string>("");// description
   const [error,setError] = useState<string>("");// error
   const [message,setMessage] = useState<string>("");// message
   const handleSubmit = (e: { preventDefault: () => void; }) => {
     e.preventDefault(); // avoid default behaviour
     
     if(!title || !description){ // check for any null value
       return setError("All fields are required");
     }
   }
   return (
     <div className={styles.container}>
       <Head>
         <title>Add todo</title>
         <meta name="description" content="Next.js firebase todos app" />
         <link rel="icon" href="/favicon.ico" />
       </Head>
       <div className={styles.main}>
         <h1 className={styles.title}>
           Add todo
         </h1>
         <form onSubmit={handleSubmit} className={styles.form}>
           {
             error ? (
               <div className={styles.formGroup}>
                 <p className={styles.error}>{error}</p>
               </div>
             ) : null
           }
           {
             message ? (
               <div className={styles.formGroup}>
                 <p className={styles.success}>
                   {message}. Proceed to <a href="/">Home</a>
                 </p>
               </div>
             ) : null
           }
           <div className={styles.formGroup}>
             <label>Title</label>
             <input type="text" 
             placeholder="Todo title" 
             onChange={e => setTitle(e.target.value)} />
           </div>
           <div className={styles.formGroup}>
             <label>Description</label>
             <textarea 
             placeholder="Todo description"  
             onChange={e => setDescription(e.target.value)}
             />
           </div>
           <div className={styles.formGroup}>
             <button type="submit">Submit</button>
           </div>
         </form>
       </div>
     </div>
   )
}
export default AddTodo;
```

We are setting a basic form with `title` and `description` fields. We also have a `handleSubmit` function that gets called when the form is submitted. For now, it just checks for null values. Let's now add functionality to handle the sending data to our Collection. Start by importing the necessities:

```ts
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection
import { firestore } from '../firebase/clientApp'; // firestore instance
```

Create a `addTodo()` function to add a new Document to the todos Collection:

```ts
const addTodo = async () => {
   // get the current timestamp
   const timestamp: string = Date.now().toString();
   // create a pointer to our Document
   const _todo = doc(firestore, `todos/${timestamp}`);
   // structure the todo data
   const todoData = {
     title,
     description,
     done: false
   };
   try {
     //add the Document
     await setDoc(_todo, todoData);
     //show a success message
     setMessage("Todo added successfully");
     //reset fields
     setTitle("");
     setDescription("");
   } catch (error) {
     //show an error message
     setError("An error occurred while adding todo");
   }
};
```

From the above code sample, we are obtaining a timestamp as the Document id. We are saving the data to the Collection. If there is an error, we are catching it. Otherwise, we are setting the message and resetting the fields. From your browser, open `http://localhost:3000/add-todo`. Your page should be similar to:

![add-todo-form](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/add-todo-form.png)

Fill in the form fields and hit `submit`. When the form is successfully submitted, you will get a success message with a link to the home page, as shown below. If you get an error, revisit the above steps and see what you may have missed to include.

![successful-add-todo-form](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/successful-add-todo-form.png)

In the next step, we will work on updating a Document.

### Updating a Document in Firestore
In our scenario, updating a Document will involve setting a todo as done. To do this, navigate `pages/index.tsx` and import `updateDoc`, then create a `updateTodo()` function to handle the `updateTodo()` functionality, as shown below:

```ts
import {updateDoc} from "@firebase/firestore";

const updateTodo = async (documentId: string) => {   
   // create a pointer to the Document id
   const _todo = doc(firestore,`todos/${documentId}`);
   // update the doc by setting done to true
   await updateDoc(_todo,{
   "done":true
   });
   // retrieve todos
   getTodos();
}
```

While mapping a todo, add an `onClick` function to the `Mark as done` button and call the function as follows:

```ts
<button type="button" onClick={() => updateTodo(todo.data().id)}>Mark as done</button>
```

If you get lost, check the above boilerplates code on [GitHub](https://github.com/Rose-stack/full-stack-nextjs-with-typescript-and-firebase-database/blob/main/pages/index.tsx).

For any fetched todo, click the `Mark as done` button. That the todo will disappear because it will be updated as a done todo, and then todos that are not done will be fetched based on the query set on `getTodos()`.

In the next step, we will work on deleting a todo.

### Deleting a Document in Firestore
To delete a Document, navigate to `pages/index.tsx`, import the `deleteDoc` function, and create a function that will handle the delete (`deleteDoc`) functionality, as shown below.

```ts
import {deleteDoc} from "@firebase/firestore";

const deleteTodo = async (documentId:string) => {
   // create a pointer to the Document id
   const _todo = doc(firestore,`todos/${documentId}`);
   // delete the doc
   await deleteDoc(_todo);
   // retrieve todos
   getTodos();
}
```

Add a delete button with the above function using the `onClick` event:

```ts
<button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
```

When you click the `delete` button for any fetched todo, that todo will be deleted from the Collection.

Up to this point, we have been able to handle all the CRUD operations with our simple todos app. This is done with the help of the Firebase database that allows us to handle the necessary basic backend requests.

### Further readings
Check out the materials listed below to learn more about the topics discussed.
- [Next.js Firebase full course](https://fireship.io/courses/react-next-firebase/)
- [How to Create Responsive Layouts with Material UI and Next.js](/engineering-education/creating-responsive-layouts-with-materialui-in-reactjs/)
- [How to build a Next.js application with MongoDB and deploy it on Vercel](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/)
- [Node.js versus Next.js - A React Approach](/engineering-education/node-versus-next-react-approach/)

You can also access all the code snippets explained here from this [GitHub repository](https://github.com/Rose-stack/full-stack-nextjs-with-typescript-and-firebase-database).

Happy coding!