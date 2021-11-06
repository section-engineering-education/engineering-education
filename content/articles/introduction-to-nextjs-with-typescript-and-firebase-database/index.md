---
layout: engineering-education
status: publish
published: true
url: /introduction-to-nextjs-with-typescript-and-firebase-database/
title: Introduction to Next.js, TypeScript, and Firebase Database
description: This article will provide a step-by-step guide on how to create a web application using Next.js, TypeScript, and the Firebase database.
author: rose-waitherero 
date: 2021-11-06T00:00:00-15:40
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/hero.png
    alt: Introduction Next.js and Firebase Hero Image
---
Next.js is a React-based framework that enables developers to create production-ready web applications with ease. It features a variety of predefined functionalities that allow developers to quickly scale applications.
<!--more-->
Next.js is a hybrid framework. This means it can be used for both client-side and server-side rendering. It can also be utilized in Static Generation functions that you can you use to fetch data and pre-render at build time. This produces fast web pages.

### Prerequisites
To follow along with this article, you'll need:
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Some basic knowledge of HTML, CSS, and JavaScript fundamentals.
- Some prior knowledge of working with [React](https://reactjs.org/), [Next.js](https://nextjs.org/), and [TypeScript](https://www.typescriptlang.org/).

### Setting up TypeScript
We will build this application using TypeScript. Next.js is bundled with TypeScript. 

TypeScript comes with additional features that make your code minimalistic. These features include static typing, type notation, types checking, etc. Check this guide to [compare and contrast TypeScript and JavaScript](/engineering-education/javascript-vs-typescript/).

To use TypeScript, you'll need to install the TypeScript JavaScript library. This will make TypeScript accessible to our project. 

With Next.js, you just need to add a `--ts` flag to the `create-next-app` command. For example, running `npx create-next-app@latest --ts next-js-firebase-app` will automatically set the default TypeScript environment. 

This will add `typescript`, and `@types/react` to our Next.js project. Note that Next.js is a React.js framework.

So while using TypeScript, we need React type definitions. `@types/` provides TypeScript features to third-party frameworks such as React. 

### Creating a Firebase project
To setup Firebase, use the following steps:

First, go to the [Firebase console](https://console.firebase.google.com/) and *Add project*. Enter the preferred name of your project, i.e., `next-js-todos-app`. Then click continue.

Then `Configure Google Analytics` and click continue.

*Create a project* and give it some time to complete the process. When the project is ready, click *Continue*.

### Adding a Firebase app
The next step is to create a Firebase app. We can implement this functionality using the code below:

On the newly created project page, click the web icon (`</>`).

Enter your preferred app name, i.e., `next-js-todos-app`. Then click *Register app* and *Continue to console*.

In the next step, we will set up `Firestore`.

### Setting up Firestore
To set up Firestore, follow the steps below:

In the Firebase App, navigate to the left menu, under `build`, and click *Firestore Database* then *Create database*.

Since we are not building a production application, select the *start in test mode* and move to the *Next* step.

Choose the Cloud Firestore location from the list of options available and then click *Enable* to set the selected location. 

In the resulting page, we will start by creating a Collection to be populated from our Next.js application.

Click *Start Collection* and add the Collection id as *todos* and move to the *Next* step.

Auto-populate the document id field by clicking *Auto-ID* and add a *title* field as a string.

Click *Add field*, add a *description* field as a string, and give it a value of *Cook a delicious dinner*.

Add a new field *done*, which is a Boolean, and give it a value of *false*. 

Your form should be similar to:

![initial-collection-setup-form](/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/initial-collection-setup-form.png)

The document should now be reflected in the Collection as shown below:

![initial-collection](/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/initial-collection.png)

In the next step, we will set up our Next.js application.

### Setting up Next.js app
To set up our Next.js application, we will use [create-next-app](https://nextjs.org/docs/api-reference/create-next-app).

To set it up, we will follow these steps:

Create a folder where you want the project to reside.

```bash
cd ./your-project-folder-path
```

Run the following command to bootstrap the Next.js application with TypeScript:

```bash
npx create-next-app@latest --ts next-js-firebase-app
```

The above command will create the Next.js application inside the `next-js-firebase-app` folder. 

We have also added a `--ts` flag. This means that the generated Next.js app will be TypeScript friendly. All files will be set to `.tsx` and not the usual `.js`.

Since we will be working with Firebase, the next step is to install the Firebase package. 

This will add the Firebase SDK to the Next.js project. Change the directory and make sure your command line points to the `next-js-firebase-app` folder. 

Then run this command to get the Firebase JavaScript library installed:

```bash
npm install firebase
```

With Firebase installed, run the following command to start the development server:

```bash
npm run dev
```

In your browser, navigate to `http://localhost:3000`. You should be able to view the following default Next.js landing page:

![default-landing-page](/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/default-landing-page.png)

This shows that the Next.js boilerplate is working. 

Let's start by integrating Firebase and adding TypeScript.

### Initializing Firebase app
The next step will be to initialize the Firebase database in the Next.js app.

In simple terms, initializing a Firebase app means connecting the Firebase database instance/SDK so that we can work and scale the Next.js application. 

This simply involves collecting the Firebase credentials that are specific to our Firebase application.

To initialize it, we will use the following steps:

Create an `env.local` file in your project root folder. This will host the environmental variables.

In your Firebase dashboard, navigate to the *project settings*. Scroll down to *your apps* section and then to the *SDK setup and configuration*. 

In the app settings, we will take `firebaseConfig` object. Extract its contents to the `.env.local` file, as demonstrated below:

```js
NEXT_PUBLIC_FIREBASE_API_KEY = "your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "your_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "your_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "your_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID = "your_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "your_measurement_id"
```

Replace every environment with the credentials listed in the `firebaseConfig` object.

Next, create a new `firebase` directory inside the project root folder. 

Inside the `firebase` folder, create a file `clientApp.ts`. 

We will configure the Firebase instance in `clientApp.ts` file, as demonstrated below:

Start by importing `initializeApp` from the Firebase package.

```ts
import {initializeApp} from "firebase/app";
```

Call the `initializeApp` function and pass in your credentials as listed in the `env.local` file:

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

Import `getFirestore` from firebase.

```ts
import {getFirestore} from "firebase/firestore";
```

Create a `Firestore` instance.

```ts
const firestore = getFirestore();
```

Export `firestore` so that it can be accessible by the files that we will create later in this project.

```ts
export {firestore};
```

Since we have environmental variables, we will have to restart the development server.

Press `ctrl + c` to close it, and then `npm run dev` to start it.

#### Querying documents from Firestore
To query documents from Firestore, we will work on `pages/index.tsx`:

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

We have changed the `pages/index.tsx`, which means the existing linked CSS code won't work on the newly added code. 

Edit `styles/Home.module.css` file as follows:

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

In `pages/index.tsx`, import Firestore from the `clientApp.ts` file and create a pointer in the todos Collection. 

Then use `useState` to host the state of our todos, as shown below:

```ts
import { firestore } from '../firebase/clientApp';

import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";

const todosCollection = collection(firestore,'todos');

import { useState } from 'react';
const [todos,setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
const [loading,setLoading] = useState<boolean>(true);
```

A `todo` object will have a type of `QueryDocumentSnapshot<DocumentData>`. We will initialize loading to `true` to avoid accessing `todos` when they are not fully loaded. 

Next, create a function to get these todos and construct a `useEffect` hook that will invoke the `getTodos` method:

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

From above, we are getting `todos` objects and resetting them after every two seconds.

We need to show these `todos` in a browser. Let's create a Next.js view to show the fetched todos. 

Add the following code just below the `index.tsx` `title`, i.e., `<h1className={styles.title}> Todos app</h1>`. 

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

Above we are displaying a `loading` text that checks whether we have todos or not. If we don't have any, we will display a message; otherwise, existing todos will be mapped and displayed.

In this case, since we added a todo when setting up the Firestore database, you should now be able to see it from the homepage. 

![querying-todos](/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/querying-todos.png)

### Adding a document to Firestore
To add a document to Firestore, we need to create a form to input a new todo `title`, and `description`. 

In the `pages` folder, create a file `add-todo.tsx` setup and add the following code:

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

We are setting a basic form with `title` and `description` fields. We also have a `handleSubmit` function that gets called when the form is submitted. 

For now, it just checks for `null` values. Let's now handle data to our `Collection`. 

Start by importing the necessities:

```ts
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection
import { firestore } from '../firebase/clientApp'; // firestore instance
```

Create a `addTodo()` function to add a new `Document` to the `todos` Collection:

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

In the code sample above, we are obtaining a timestamp as the `Document id`. We are saving the data to the Collection. 

If there is an error, we will catch it. Otherwise, we are setting the message. From your browser, open `http://localhost:3000/add-todo`. 

Your page should be similar to:

![add-todo-form](/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/add-todo-form.png)

Fill in the form fields and `submit`. When the form is successfully submitted, you will get a success message with a link to the home page, as shown below:

If you get an error, revisit the steps above and see what you may have missed:

![successful-add-todo-form](/engineering-education/introduction-to-nextjs-with-typescript-and-firebase-database/successful-add-todo-form.png)

In the next step, we will work on updating a `document`.

### Updating a document in Firestore
In our scenario, updating a document will involve setting a `todo` object. 

To do this, navigate to `pages/index.tsx` and import `updateDoc`. 

Next, create a `updateTodo()` function, as shown below:

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

For any fetched todo, click the `Mark as done` button. That `todo` object will disappear because it will be updated as a `done`.

Uncompleted `todos` items will then be fetched based on the query set in the `getTodos()` method.

In the next step, we will work on deleting a todo.

### Deleting a document in Firestore
To delete a document, navigate to `pages/index.tsx`, import the `deleteDoc` function, and create a method that will handle the delete (`deleteDoc`) functionality, as shown below:

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

Add a `delete` button that is linked to the above function using the `onClick` event:

```ts
<button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
```

When you click the `delete` button on any fetched `todo` item, that object will be deleted from the `Collection`.

### Conclusion
In this tutorial, we have learned how to handle CRUD operations in a Next.js application. 

This functionality is implemented using a Firebase database which allows us to handle basic backend requests.

You can access all this project's code in this [GitHub repository](https://github.com/Rose-stack/full-stack-nextjs-with-typescript-and-firebase-database).

Happy coding!

### Further readings
- [Next.js Firebase full course](https://fireship.io/courses/react-next-firebase/)
- [How to Create Responsive Layouts with Material UI and Next.js](/engineering-education/creating-responsive-layouts-with-materialui-in-reactjs/)
- [How to build a Next.js application with MongoDB and deploy it on Vercel](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/)
- [Node.js versus Next.js - A React Approach](/engineering-education/node-versus-next-react-approach/)


---
Peer Review Contributions by: [Wanja Mike](/engineering-education/authors/michael-barasa/)
