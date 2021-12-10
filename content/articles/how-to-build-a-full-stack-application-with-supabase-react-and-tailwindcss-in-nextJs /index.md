
Serverless databases are all the rage these days since they allow you to develop a fully functional app without building a server or writing any server code. A serverless database is a cloud computing solution that enables resources to be distributed and managed flexibly.

In this tutorial, we will learn how to build a full stack application with  ***Supabase***, ***React***, and ***tailwindcss*** in ***nextJs***.

### Prerequisite

- Practical React.js experience
- A basic grasp of async functions
- A Github account

### What Is Supabase?

[Supabase](https://supabase.io) is a PostgreSQL-based open-source serverless database that allows you to build a real-time backend for your application in a few minutes.

PostgreSQL is an object-relational database system that has been actively developed for more than 25 years and is known for its dependability and performance.

[Supabase](https://supabase.io) includes several out-of-the-box services/functionalities that are designed to make your life easier. These include the following, but are not limited to:

- Authentication
- Realtime Database
- UI components
- RLS(Row Level Security)

### Why Should You Use Supabase?

- Supabase takes care of the scaling (even though it uses an SQL database).
- Although Supabase is based on PostgreSQL, data migration is trivial.
- You can run complicated queries or text searches, unlike Firebase.

### Step 1: Setting Up A Project

We'll build our project and learn how to integrate supabase in our app in this section.

#### Sign up for a Supabase account and create a project

To get started, let us sign up for a Supabase account [here](https://api.supabase.io/platform/login). To continue, we'll need a Github account; and we can also register [here](http://github.com) if we are yet to create an account.

![Supabase Dashboard](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/welcome-screen.png)

After we logged in, we were redirected to our dashboard, as shown in the screenshot above.

Next, we can now click on the `New Project` Button to create a new project for our demo application, as shown below.

![Supabase Dashboard](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/create-project.png)

Then we'll see the screen below, which displays that the project is now being built.

![Supabase Dashboard](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/project-setup.png)

Next, we will need to create our database by clicking the database icon shown on the sidebar and also the plus icon shown on the top right of the screen to make each column needed, as shown below.

![Supabase Database](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/database.png)

##### Creating Columns required for our application

For this project, we will be creating five columns:

- `Name`: This is the task's name with the type of `text.`
`Activity`: This is the task's activity related to the type of `text.`
- `StatDate`: This is when the task is expected to start with the type of `date.`
- `EndDate`: This is the date that the task is expected to end with the type of `date.`

After creating all these fields, we should have something similar to what we have below.

![Supabase Database Table](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/database-table.png)

We have created our project and created individual columns. We will proceed to the next step by setting up our frontend application in the next section.

### Step 2: Setting Up Our Frontend Application

To create a new project, we use the `npx create-next-app -e with-tailwindcss .` command to scaffold a new project in a directory of our choice.

This command sets up a TailwindCSS project in Next.js. TailwindCSS is a CSS framework containing a lot of classes to help us style our website.

We use the following commands to install the dependencies:

```Bash
    cd <project name> 
    yarn add @supabase/supabase-js
```

We'll see a message with instructions for browsing our site and running it locally after the app is created and the dependencies have been installed. Using the command, we can execute this.

```Bash
    npm run dev
```

Next.js will start a hot-reloading development environment accessible by default at <http://localhost:3000>.

We should have something similar to what we have below.

![NextJs Welcome Page](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/next-welcome.png)

### Step 3: Building Our Frontend Application Layout and Adding the Supabase Client

Since we have our frontend setup completed, we can now build our frontend application.

Let us update our `pages/index.js` file to include the following code:

```Javascript
import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div>
        <Head>
          <title>Supabase and NextJs Demo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold mt-20">
            <a className="text-blue-600" href="/">
              Full Stack Application With Tailwind CSS and Supabase in NextJs
            </a>
          </h1>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div className="p-8 mt-6 border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <div className="w-full max-w-sm">
                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="taskName"
                    >
                      Task Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="taskName"
                      type="text"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="taskActivity"
                    >
                      Task Activity
                    </label>

                    <textarea
                      className="form-textarea mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"
                      placeholder="Task Activity"
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="startDate"
                    >
                      Task Start Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="startDate"
                      type="date"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="endDate"
                    >
                      Task End Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="endDate"
                      type="date"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="p-2 mt-6 w-96 rounded-xl focus:text-blue-600">
              <table className="shadow-lg bg-white">
                <tbody>
                  <tr>
                    <th className="bg-blue-400 border text-left px-4 py-4">
                      S/N
                    </th>
                    <th className="bg-blue-400 border text-left px-8 py-4">
                      Name
                    </th>
                    <th className="bg-blue-400 border text-left px-8 py-4">
                      Activity
                    </th>
                    <th className="bg-blue-400 border text-left px-14 py-4">
                      Start Date
                    </th>
                    <th className="bg-blue-400 border text-left px-16 py-4">
                      End Date
                    </th>

                    <th className="bg-blue-400 border text-left px-4 py-4">
                      Action
                    </th>
                  </tr>
                  <tr>
                    <td className="border px-4 py-4"></td>
                    <td className="border px-4 py-4"></td>
                    <td className="border px-8 py-4"></td>
                    <td className="border px-8 py-4"></td>
                    <td className="border px-8 py-4"></td>
                    <td className="border px-8 py-4">
                      {" "}
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

```

We should have something similar to what we have below if we visit our application in the browser.

![NextJs Supabase](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/updated-index.png)

We'll use the `Supabase` package to link our application to our database. Using environment variables is the best approach for us to configure this.

Environment variables can be set in Next.js by creating a file called `.env` in the project's root directory and saving them there.

It would be best to precede a variable with `NEXT_PUBLIC_` to expose it to the browser.

Add the following configuration to a file called `.env` in the project's root directory:

```
NEXT_PUBLIC_SUPABASE_URL=https://app-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-api-key
```

We can find the values of our API URL and API Key in the Supabase dashboard settings, as shown below.

![NextJs Index](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/api-1.png)

![NextJs Index Result](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/api-2.png)

Next, we will create a file called `client.js` in the root of the project and then add the following code:

```

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_TOKEN
);
```

After importing it, we can now utilize the supabase instance everywhere in our app.

### Step 4: Building our Application

Let us Update our `pages/index.js` file to be able to add a new task using the supabase instance with the following code:

```Javascript
// ...
import { useState, useEffect } from "react";
import { supabase } from "../client";

export default function Home() {

  // Declare a new state variable to store task details
  const [task, setTask] = useState({
    Name: "",
    Activity: "",
    StartDate: "",
    EndDate: "",
  });

  const { Name, Activity, StartDate, EndDate } = task;

  // Create a function that handles the new task creation
  async function addTask() {
    await supabase
      .from("Task") // Select the Table
      .insert([
        {
          Name,
          Activity,
          StartDate,
          EndDate,
        },
      ]) // Insert the new task
      .single();
    setTask({
      Name: "",
      Activity: "",
      StartDate: "",
      EndDate: "",
    }); // Reset the task details
  }

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div>
       // ...
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold mt-20">
            <a className="text-blue-600" href="/">
              Full Stack Application With Tailwind CSS and Supabase in NextJs
            </a>
          </h1>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div className="p-8 mt-6 border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <div className="w-full max-w-sm">
                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="taskName"
                    >
                      Task Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="taskName"
                      type="text"
                      value={Name.toString()}
                      onChange={(e) =>
                        setTask({ ...task, Name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="taskActivity"
                    >
                      Task Activity
                    </label>

                    <textarea
                      className="form-textarea mt-1 block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      rows="3"
                      placeholder="Task Activity"
                      value={Activity.toString()}
                      onChange={(e) =>
                        setTask({ ...task, Activity: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="startDate"
                    >
                      Task Start Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="startDate"
                      type="date"
                      value={StartDate.toString()}
                      onChange={(e) =>
                        setTask({ ...task, StartDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="endDate"
                    >
                      Task End Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="endDate"
                      type="date"
                      value={EndDate.toString()}
                      onChange={(e) =>
                        setTask({ ...task, EndDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={addTask} // Call the addTask Function
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="p-2 mt-6 w-96 rounded-xl focus:text-blue-600">
              // ...
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

```

Next, After testing our application, we will notice that nothing happens after entering the task details and clicking on the button `Add Task`. This is because we have not handled task retrieval from our database.

Let us update our `pages/index.js` file to be able to retrieve all the tasks from our database as shown below:

```Javascript
// ...
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);

  // ...

  async function getTasks() {
    const { data } = await supabase.from("Task").select(); // Select all the tasks from the Task Table
    setTasks(data);
    setLoading(false);
  }

  // Run the getTasks function when the component is mounted
  useEffect(() => {
    getTasks();
  }, []);

  // Check if loading
  if (loading)
    return (
      <div className="flex justify-center items-center">
        <div
          className="
      animate-spin
      rounded-full
      h-32
      w-32
      border-t-2 border-b-2 border-blue-500 mt-36
    "
        ></div>
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div>
       // ...
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-4xl font-bold mt-20">
            <a className="text-blue-600" href="/">
              Full Stack Application With Tailwind CSS and Supabase in NextJs
            </a>
          </h1>

          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <div className="p-8 mt-6 border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              // ...
              </div>
            </div>

            <div className="p-2 mt-6 w-96 rounded-xl focus:text-blue-600">
              <table className="shadow-lg bg-white">
                <tbody>
                  <tr>
                    <th className="bg-blue-400 border text-left px-4 py-4">
                      S/N
                    </th>
                    <th className="bg-blue-400 border text-left px-8 py-4">
                      Name
                    </th>
                    <th className="bg-blue-400 border text-left px-8 py-4">
                      Activity
                    </th>
                    <th className="bg-blue-400 border text-left px-14 py-4">
                      Start Date
                    </th>
                    <th className="bg-blue-400 border text-left px-16 py-4">
                      End Date
                    </th>

                    <th className="bg-blue-400 border text-left px-4 py-4">
                      Action
                    </th>
                  </tr>
                  {task &&
                    tasks.map((task, index) => (
                      <tr key={task.id}>
                        <td className="border px-4 py-4">{index + 1}</td>
                        <td className="border px-4 py-4">{task.Name}</td>
                        <td className="border px-8 py-4">{task.Activity}</td>
                        <td className="border px-8 py-4">{task.StartDate}</td>
                        <td className="border px-8 py-4">{task.EndDate}</td>
                        <td className="border px-8 py-4">
                          {" "}
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
```

Let's test our application, and we should be able to add a new task and see all of the tasks we've created so far.

![NextJs App Result](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/app-result.png)

It works! However, in order to see the new task, we had to refresh the page when a new task was added. We don't want it to happen. Let us update out `addTask` function with the  code snippet below:

```Javascript
  async function addTask() {
    await supabase
      .from("Task")
      .insert([
        {
          Name,
          Activity,
          StartDate,
          EndDate,
        },
      ])
      .single();
    setTask({
      Name: "",
      Activity: "",
      StartDate: "",
      EndDate: "",
    });
    getTasks(); // Refresh the tasks
  }
```

We will now see a new task added to our task table without refreshing the page.

Let us make the `Delete` Button that appears on the right side of the table to delete the task from our database.

Update out `pages/index.js` file with the following snippet:

```Javascript
 async function deleteTask(id) {
    await supabase.from("Task").delete().eq("id", id); // the id of row to delete
    getTasks();
  }

```

Updating the delete button onClick attribute as shown below:

```Javascript
     // ...

      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={() => deleteTask(task.id)} // Delete the task
       >
        Delete
      </button>
```

Testing our application now, we should add a new task, get all the tasks added and delete any task we want, as shown in the image below where we deleted one of the tasks we created earlier.

![NextJs-Supabase-result](/engineering-education/how-to-build-a-full-stack-application-with-supabase-react-and-tailwindcss-in-nextJs/final-result.png)

You can [click here](https://github.com/Olanetsoft/supabase-and-nextjs-demo) to check the complete code on GitHub.

### Conclusion

This tutorial teaches us how to build a full-stack application with Supabase, React, and tailwindcss in nextJs.

Happy coding!

### Resources

- [Supabase Docs](https://supabase.io/docs/)
- [NextJs Docs](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
