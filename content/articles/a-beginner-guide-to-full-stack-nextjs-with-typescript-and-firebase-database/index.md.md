[Next.js](https://nextjs.org/) is a [React](https://reactjs.org/) Framework that enables developers to create production-ready React apps with ease. It features a variety of predefined functionalities that allow you to easily build React applications. This abstracts redundant functionalities and allows you to focus on the application implementation.

Next.js is a hybrid framework that can be used for both Client-Side and Server-Side Rendering. It can be used for both projects and it can also be used for static site generation. to produce blazingly fast pages. With Next.js all of our pages will be pre-rendered which is generally better for performance your user isn't having to wait around while you're while your application loads.

By default, Next.js pre-renders every page meaning Next.js generates HTML and the data files for each page in advance instead of having it done client-side JavaScript.

Next.js has two levels of pre-rendering, static generation and server-side rendering. static generation generates the HTML at build time. server-side rendering generates the HTML on each request. So before a page is served to the visitor's browser, it's handled on the request and then serve it.

All these pre-renderings allow you to handles the data fetching and process a lot of the heavy data lifting from the server. when we deploy our site. This saves our visitors the time to wait for the code to fetch some external data before they can get the content.

So Next.js is a cool technology and it has a torn of great features such as

- Good SEO support. It is generally better for SEO sites, so your pages get in front of more users.
- Next.js provides out on box zero-configuration setups. For example, to create the Next js app you run a one-time command that generated a well-structured Next.js app that you can start building on. With the support of TypeScript, Next.js has in-build TypeScript support. This means you don't have to manually configure TypeScript to run typescript code with Next.js. You just run one command and TypeScript is set within your project.

So this is a very cool framework worth learning and building applications with. Check this [Next.js get started documentation](https://nextjs.org/) and learn why Next.js.

### Introduction to Firebase
Firebase is a cloud-hosted NoSQL database. That means we don't store data here in tables and we don't use the structured query language to perform database operations. One of the advantages of using the firebase database is that it is real-time. The data is synced in real-time. This means any changes you perform on your database are reflected in all the devices in real-time. This database can be implemented across multiple devices and different platforms.

When using the firebase database, you don't need to configure a server. This means the application you build is completely serverless. You don't have to configure a server, worry about security issues, or build APIs to communicate with the server.

When using the firebase database, you have two main options to select from. These are the firebase realtime database and the firebase cloud firestore. Unlike SQL-based databases, firebase's real-time database uses JSON trees to store data.

For example, here is how data is represented in an SQL database.

![sql-table](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/sql-table.png)

[Image Source](https://youtu.be/kXYalWgc_rU?t=242)

As you can see, there are two tables for storing Authors and Stories. Each author has a unique ID that will be associated with every story. This shows the relation between the author and the stories that belong to that specific author. However, the case is different when using a NoSQL database such as the firebase realtime database. This data is represented in JSON and the relation is shown in JSON nodes. For example, here is how the above SQL tables can be represented in a firebase real-time database.

![nosql-json-trees](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/nosql-json-trees.png)

[Image Source](https://youtu.be/kXYalWgc_rU?t=254)

Here is the data is saved in JSON form with two main nodes, the authors and stories. Then each story will have an author id that will help to identify the other of the story.

On the other side, there is a difference between the firebase real-time database and the firebase cloud firestore and how they store data. Unlike a real-time database that stores data in the JSON object, cloud firestore stores data in horizontally scaling documents. Data is stored in a tree-like hierarchical structure. Unlike real-time databases where data are stored in JSON objects, cloud firestore is made up of documents and collections.

To learn more about the firebase cloud firestore, we will use it as a use-case in this guide and implement it with Next.js and TypeScript.

### Setting up TypeScript
We want to run this application using TypeScript. Next.js is buddled with JavaScript. However, it has automatic TypeScript support. TypeScript is a close relative to JavaScript. It comes with additional features that make your code minimalistic. These features include static typing, type notation.

So to use TypeScript, you need to install the TypeScript JavaScript library. This will make TypeScript accessible to our project. But in our case running `npx create-next-app@latest --ts next-js-firebase-app` will automatically set the default TypeScript environment, which will be used to execute any TypeScript-related code. This will add `typescript` and `@types/react` to our Next.js project. Next.js is a React.js framework. That means Next.js will use React as its base code. So while using TypeScript we need React type definitions. `@types/` provides TypeScript features to third-party frameworks such as React. That's why `@types/react` gets installed along with `typescript`. Check this [guide](/engineering-education/a-friendly-beginner-guide-to-typescript/) to learn more about [TypeScript](/engineering-education/javascript-vs-typescript/).

Now let's dive in and see how we can implement an application using these cool technologies.

### Goal
In this article, we will go through Next.js with TypeScript and Firebase from a beginner's perspective by building a simple todos app with all the CRUD operations involved.

### Prerequisites
To continue in this article, the following are the requirements:

- Have [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge of HTML CSS and JavaScript fundamentals.
- Prior knowledge of working with [React](https://reactjs.org/).
- Beginner knowledge working with [Next.js](https://nextjs.org/).
- Beginner knowledge working with [TypeScript](https://www.typescriptlang.org/).

### Creating a firebase project
The very first will be to create a firebase project. To do this, we will follow the following steps:

- Go to the [firebase console](https://console.firebase.google.com/).
- Click *Add project* to set up our project.
- Enter the preferred name of your project e.g next-js-todos-app. Then click continue.
- In the next step, you can enable or disable google analytics for your project. It is not a requirement in the article.
- Then click *Create project*. Give it some time to complete the process. When the project is ready click *Continue*.

In the next step, we will set up a firebase app.

### Adding a firebase app
After creating a firebase project, in this step we will create a firebase app by following the following steps:

- On the page you are directed to, click the web icon (`</>`).
- Enter your preferred app name e.g next-js-todos-app. Then click *Register app*.
- We will add the firebase SDK in a later step, for now, scroll down and click *Continue to console*.

In the next step, we will set up a firestore.

### Setting up firestore
To setup firestore, follow the following steps:

- On the left menu, under build, click *Firestore Database*.
- In the resulting page, click *Create database*.
- In the resulting popup, since we are not building for production, click *start in test mode*. Then *Next*.
- Choose the cloud firestore location from the list of options available and then click *Enable*. Give it time to set up.

In the resulting page, we will start by creating a collection that will be populated from our Next.js application. To do this:

- Click *Start collection*.
- Give the collection an id of *todos* and then click *Next*.
- Auto-populate the document id field by clicking *Auto-ID*.
- Add a *title* field which is a string and give it a value of *Cooking*.
- Add a *description* field which is a string and give it a value of *Cook a delicious dinner*.
- Add a *done* field which is a Boolean and give it a value of *false*.
- Your form should be similar to:
  
![initial-collection-setup-form](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/initial-collection-setup-form.png)

- Then submit it.

- The document should not be reflected in the collection as below:

![initial-collection](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/initial-collection.png)

In the next step, we will set up our Next.js application.

### Setting up Next.js app
To set up our Next.js application, we will use [create-next-app](https://nextjs.org/docs/api-reference/create-next-app), a tool provided by the Next.js team to bootstrap your project on the fly.

To set it up, we will follow these steps:

First, create a folder where you want the project to reside and proceed to it:

```bash
cd ./your-project-folder-path
```

Run the following command to bootstrap the Next.js application with TypeScript:

```bash
npx create-next-app@latest --ts next-js-firebase-app
```

The above command will create the Next.js application inside the `next-js-firebase-app` folder. We have also added a `--ts` flag. This means the Next.js app generated will be TypeScript friendly. All files will be set to `.tsx` and not the usual `.js` for JavaScript-related code.

Since we will be working with firebase, the next step is to install the firebase package. So change the directory and make sure your command line points to the `next-js-firebase-app` folder. Then run this command to get the firebase JavaScript library installed.

```bash
npm install firebase
```

With firebase installed, run the following command to start the development server. This will help you visualize how the sample Next.js template looks like. It has ready-made code and project structure that will start a simple server to execute Next.js on the browser.

```bash
npm run dev
```

Now navigate to your browser and go to `http://localhost:3000`. You should be able to view the following default Next.js landing page rendered on your browser.

![default-landing-page](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/default-landing-page.png)

This shows the Next.js boilerplate is working and ready to be worked on by adding more code as you scale up your application. We can start on building on our codebase by integrating firebase and adding TypeScript.

### Initializing firebase app
The next step will be to initialize the firebase so that our Next.js app can be able to communicate with firebase and perform any necessary operation.

In simple terms, initializing a firebase app mean connecting the firebase database instance so that we can work on and scale on the Next.js application we created. This simply involves collecting the firebase credentials that are specific to the firebase application we earlier created.

To initialize it, we will follow the following steps:

First, create an `env.local` file in the project root folder. This will host the environmental variables or rather the firebase database credentials that Next.js needs to establish a communication between the two.

Then from the dashboard of your firebase project, click on the gear icon on the left menu of your firebase application, and head to *project settings*.

Finally, scroll down to *your apps* section, and then to the *SDK setup and configuration*. In the code provided, we have a `firebaseConfig` object. extract its contents to the `.env.local` file as below:

```js
NEXT_PUBLIC_FIREBASE_API_KEY = "your_api_key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = "your_auth_domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "your_project_id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = "your_storage_bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = "your_messaging_sender_id"
NEXT_PUBLIC_FIREBASE_APP_ID = "your_app_id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = "your_measurement_id"
```

Replace every environment with the credentials listed on the `firebaseConfig` object of your firebase application.

Now create a folder `firebase` in the project root folder. Inside the `firebase` folder, create a file `clientApp.ts`. In the `clientApp.ts` file:

- Start by importing `initializeApp` from the firebase package.

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

- Create a firestore instance.

```ts
const firestore = getFirestore();
```

- Export `firestore` so that it can be accessible by other files that we will create later in this project.

```ts
export {firestore};
```

Since we have environmental variables, we will have to restart the development server. Press `ctrl + c` to close it, and then `npm run dev` to start it.

In the next step, we will query the documents from the firestore.

#### Querying documents from firestore
To query the documents from firestore, we will work on the `pages/index.tsx` file. So start by editing the default boilerplate code as such.

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

The above is the skeleton of where we will start working from.

- Edit `styles/Home.module.css` file. We have changes the `pages/index.tsx`, which means the existing linked CSS code won't work on the newly added code. The following CSS code will format the newly added code and update its appearance where necessary.

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

Feel free to edit the styles to match your look and feel but the above configuration is okay to work with.

In `pages/index.tsx`, start by importing the firestore:

```ts
import { firestore } from '../firebase/clientApp';
```

Create a pointer to todos collection:

```ts
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
const todosCollection = collection(firestore,'todos');
```

Use `useState` to host the state of our todos and loading:

```ts
import { useState } from 'react';
const [todos,setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
const [loading,setLoading] = useState<boolean>(true);
```

A todo will have a type of `QueryDocumentSnapshot<DocumentData>`. We are also initializing loading to `true` so that to avoid accessing `todos` when they have not been fully loaded.

Create a function to get todos:

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
```

Construct a `useEffect` hook and call the method `getTodos` from there:

```ts
useEffect( () => {
   // get the todos
   getTodos();
   // reset loading
   setTimeout( () => {
     setLoading(false);
   },2000)
},[]);
```

From above, we are getting the todos and resetting the todos after two seconds.

In this view, we will show the fetched todos. After the title, add the following:

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

From above, we are displaying a `loading` text, if it's loading, and checking whether we have todos or not. If we don't have, we are displaying a message, else we are mapping the todos to show them in the UI.

You should now be able to see your todos from the homepage. Your homepage should resemble:

![querying-todos](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/querying-todos.png)

Since we only added one todo from the previous process.

In the next step, we will work on a form for creating a todo.

### Adding a document to firestore
To add a document to firestore we will need to create a form to gain the user input. To do this, we will follow the following steps:

In the `pages` folder, create a file `add-todo.tsx`. In the `add-todo.tsx`, add the following basic form setup:

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

From above, we are setting a basic form with a `title`, and `description` fields. We also have a `handleSubmit` function that gets called when the form is submitted. For now, it just checks for null values.

Handle the functionality of sending data to our collection. Start by importing the necessities:

```ts
import { doc } from '@firebase/firestore'; // for creating a pointer to our document
import { setDoc } from 'firebase/firestore'; // for adding the document to collection
import { firestore } from '../firebase/clientApp'; // firestore instance
```

Create a function to handle the functionality:

```ts
const addTodo = async () => {
   // get the current timestamp
   const timestamp: string = Date.now().toString();
   // create a pointer to our document
   const _todo = doc(firestore, `todos/${timestamp}`);
   // structure the todo data
   const todoData = {
     title,
     description,
     done: false
   };

   try {
     //add the document
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

From the above code sample, we are obtaining a timestamp which will be the document id, we are saving the data to the collection. If there is an error, we are catching it else we are setting the message and resetting the fields. From your browser, open `http://localhost:3000/add-todo`. Your page should be similar to:

![add-todo-form](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/add-todo-form.png)

Fill in the form fields and hit `submit`. When the form is successfully submitted you will get a success message with a link to the home page as shown below. If you get an error, revisit the above steps and see what you may have missed to include.

![successful-add-todo-form](/engineering-education/a-beginner-guide-to-full-stack-nextjs-with-typescript-and-firebase-database/successful-add-todo-form.png)

In the next step, we will work on updating a document.

### Updating a document in firestore
In our scenario, updating a document will involve setting a todo as done. To do this, in `pages/index.tsx`, start by importing `updateDoc`:

```ts
import {updateDoc} from "@firebase/firestore";
```

Create a function to handle the functionality:

```ts
const updateTodo = async (documentId: string) => {   
   // create a pointer to the document id
   const _todo = doc(firestore,`todos/${documentId}`);

   // update the doc by setting done to true
   await updateDoc(_todo,{
   "done":true
   });

   // retrieve todos
   getTodos();

}
```

While mapping a todo, in todo card, add an `onclick` function to the `Mark as done` button and call the function as follows:

```ts
<button type="button" onClick={() => updateTodo(todo.data().id)}>Mark as done</button>
```

For any todo, click the `Mark as done` button. You will observe that the todo will disappear because it will be updated and then todos that are not done will be fetched based on the query on `getTodos()`.

In the next step, we will work on deleting a todo.

### Deleting a document in firestore
To be able to delete a document, we will follow the following steps:

- In `pages/index.tsx`, start by importing the `deleteDoc` funtion as shown below.

```ts
import {deleteDoc} from "@firebase/firestore";
```

Create a function that will then handle the delete (`deleteDoc`) functionality.

```ts
const deleteTodo = async (documentId:string) => {
   // create a pointer to the document id
   const _todo = doc(firestore,`todos/${documentId}`);

   // delete the doc
   await deleteDoc(_todo);

   // retrieve todos
   getTodos();
}
```

Connect a todo card delete button with the above function using the `onClick` event:

```ts
<button type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
```

When you now click the `delete` button for any todo, it will be deleted from the collection.

Up to this point, we have been able to handle all the CRUD operations revolving around our simple todos app. This is done with the help of the firebase database that allows us to handle the necessary basic backend requests.

### Further readings
Check out the materials listed below to learn more about the topics discussed.

- [Next.js firebase full course](https://fireship.io/courses/react-next-firebase/)
- [How to Create Responsive Layouts with Material UI and Next.js](/engineering-education/creating-responsive-layouts-with-materialui-in-reactjs/)
- [How to build a Nextjs application with MongoDB and deploy on Vercel](/engineering-education/build-nextjs-with-mongodb-and-deploy-on-vercel/)
- [Node.js versus Next.js - A React Approach](/engineering-education/node-versus-next-react-approach/)

You can also access all the code snippets explained here from this [GitHub repository]().

Happy coding.