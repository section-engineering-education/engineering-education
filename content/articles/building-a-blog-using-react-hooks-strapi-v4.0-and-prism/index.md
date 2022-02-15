Leprechauns, fairies, dragons, Strapi, and so on are a few fantasies of the world. Oh! Are you shocked to see Strapi on that list? Let us tell you why Strapi feels like a fantasy for developers. Strapi saves significant development time while giving developers freedom in using their preferred tools and frameworks.

Strapi, a Headless Content Management System, is a back-end only manager that allows access to contents through APIs for display on any device. The integration of Strapi with several frameworks like Angular, React, Nuxt or Vue eases the building of projects like blogs. 

In the case of blogs, we will show you how to build one using state hooks, Strapi, and Prism. We deliver each content from Strapi, and the blog will be markdown enabled. It is a beautiful journey, and we will like you to follow us every step of the way.

### Table of contents
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Aim](#aim)
- [Getting started](#getting-started)
- [Backend](#backend)
  - [Initializing strapi](#initializing-strapi)
  - [Adding content](#adding-content)
- [Front-end](#front-end)
  - [Initializing react](#initializing-react)
  - [Creating the front end](#creating-the-front-end)
- [Conclusion](#conclusion)

### Prerequisites
To do this, the reader should meet the following requirements:
- Have intermediate to professional knowledge about React.
- Must be proficient with CSS.
- Built projects using Node.js.
- Understanding of state hooks.

### Aim
We are not building a whole blog but rather a shell that will contain a preview area of a few articles and a page containing our markdown-enabled content. We want to show you how to:
- Store content in Strapi.
- Use state hooks to fetch data from Strapi.
- Create a markdown enabled blog using the content on Strapi and Prism.

### Getting started
### Backend
#### Initializing strapi
On Vscode, we create a root folder within our computer called Base project and use the command `cd Base project` within your terminal. Next, we type in the following command in the terminal:

```bash
npx create-strapi-app my-project
```

The above command will utilize the `node package manager` to create our Strapi project. It will create a folder called `my-project` and install the necessary Strapi node modules.

To start the development server, we run the following command in our terminal:
```bash
npm run develop
```

Running the above command opens a registration area in our browser. This registration area is for registering the first admin user. We can not show you currently since we have registered the first admin.

By completing the form, you become the first admin user of the Strapi application.

![strapi-admin](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/strapi-admin.png)

#### Adding content
In this section, we are adding our desired contents to Strapi. To get started, we followed the steps below:
- Click on `content-type builder` in the plugin section.
- Next, select `create new collection type` under the collection type dropdown.
- A modal as below should popup. Use any display name of your choice, and Strapi will pluralize it.

  ![collection-type](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/collection-type.png)
- In our newly created collection type, we added five new fields (Title, Rating, Body, Hero, Url).

  ![fields](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/fields.png)

- After this, click on `content manager` on the sidebar and select your collection type. Next, click on `create new entry` in the top right corner and to be taken to a page that looks like this:

  ![new-entry](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/new-entry.png)

Each new entry contains entries for the fields created earlier. Next, we add the desired article title, rating, the article's content (body), hero, and URL (hero image link) and click on save and publish. 

- To read the content from Strapi, we head to the settings section, and under the `users and permissions plugin` section, we select roles.

  ![roles](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/roles.png)

- Next, click on `PUBLIC` and scroll to permissions. In the permissions area, click on review and select find and findone. Scroll down to upload and do the same thing with the addition of selecting upload.

  ![review](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/review.png)

Now we are good to go on the front end.

### Front-end
#### Initializing react
We start by creating a React project within our initial root folder using the command below:
```bash
npx create-react-app frontend
```

The above will create a folder called frontend, and within contains the React package within the node_module folder. To start the development server, use the command `npm start`. The above command runs the React project on a local server and displays it on a browser.

#### Creating the front end
To get started, within the front end folder, create three folders within the src folder. Name them components, hooks, and pages. We begin with the pages folder; create two new javascript files called Homepage and Contents.

> Quick tip: On Vscode, install the ES7 plugin. It allows you to create a react functional component by quickly typing `rfc + Enter`. 

Thus, type in your React functional component within the two Homepage and Content files. Next, head back to the App.js file and
do the following:
- Clear the default React template.
- Type `rfc + Enter` (if you have installed the ES7 plugin) to add the React functional component.
- Import the Javascript files in the pages folder.
- Install and import `react-router-dom` (usually installed by default when we install React) using the command on the terminal:
    ```bash
    npm install react-router-dom
    ```
- Create a div with the className `App` and create routes to the imported pages using the react-router-dom.

Below is an implementation of the above explanation:
```javascript
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//Page and layout imports
import Homepage from './pages/Homepage'
import Contents from './pages/Contents'

function App() {
  return (
    <Router>
      <div className="App">
        <Siteheader />
        <Routes>
          <Route exact path="/" element={<Homepage />}>
          </Route>
          <Route path="/contents/:id" element={<Contents />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

Next, we go to the Homepage.js file. Before we get started, we will need to create our state hooks. Thus, within the hooks folder, we'll create a file called Usefetch.js. Within the Usefetch.js file, we do the following:
- Import `useEffect and useState` from React.
- Create the `useFetch function` that takes in the value `url` and export the useFetch function.
    ```javascript
    import { useEffect, useState } from "react"

    const useFetch = (url) => {

    }

    export default useFetch
    ```

    > Note: The hook takes in the endpoint(wherever we are getting the data from)

- Within the function, add the code below:
    ```javascript
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    ```
    - The first const is for the data eventually gotten from the fetch request and is usually set as null. While the setData updates the data received from Strapi.
    - The second const is for the error gotten from the fetch request and is usually set as null. The setError updates the error received from Strapi.
    - The third const initializes the loading state as `true` when we utilize the hook use fetch. Once we finish fetching the data, it makes it false.
- Next, we will create a useEffect hook function which works when the component renders whatever component we are using this hook. Within useEffect, we create another function called fetchData, and we make it `async.`
    - We make setLoading `true` in case it becomes false above when we try to setData.
    - We use the `try and catch` statement. We use `try` and fetch API to get data from the endpoint. Below is an implementation of the explanation above.

    ```javascript
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const res = await fetch(url)
                const json = await res.json()
                console.log(json)

                setData(json);
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData();
    }, [url])
    ```
- We need to return the values at the end of the hook. Thus, we use the code:
    ```javascript
    return { loading, error, data }
    ```

With this, our useFetch is ready to be used in our Homepage.js file and Content.js files.

Back to the Homepage.js file. This part of the blog is responsible for the header and preview of the article (some article content, title, and hero). To achieve this, we followed the steps below:]
- Import `Link` from react-router-dom and `useFetch` from our useFetch.js file.
  ```javascript
    import useFetch from '../hooks/useFetch'
    import { Link } from 'react-router-dom'
  ```
- Within the `Homepage` function, insert the useFetch component by adding the code below:
  ```javascript
  const{loading, error, data} = useFetch('http://localhost:1337/api/reviews')
  ```
    The above code destructures loading, error, and data from useFetch, while the `url` is the Strapi endpoint.
- Create two `if statements` to return a loading message and an error message if there's one.
  ```javascript
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
  ```
    > Note: This is possible if loading is `true` or error is `true.` In this case, loading is `true` to begin with, and until we have done the fetching, it remains `true.`
- Next, once the above is done, we will need to return the template containing some of our articles content. Thus, we used the code below to do that:
  ```javascript
    return (
    <div>
      {data.data.map(review => (
        <div key={review.attributes.id} className="review-card">
          <div className="rating">{review.attributes.rating}</div>
          <Link to={`/contents/${review.id}`}>
          <img src={review.attributes.url}/>
          <h2>{review.attributes.title}</h2>
          </Link>
          
          <small>console list</small>

          <p>{review.attributes.body.substring(0, 200)}...</p>
          
        </div>
      ))}
    </div>
  )

  ```
  - What we did above is we mapped through the data received from Strapi using the `data.data.map` function, and we get access to each item in the array by using a function called `review.`
  - We return a div template with the `key` property having a dynamic value `review.attributes.id`. It is so because React needs the parent element inside the map to have a `key` property to keep track of all the `elements` in Strapi.
  - we give the div a className `review-card` to style it later.
  
    > Note: Regarding the CSS, we aren't going to explain it because we believe the reader already has a good ground in it before getting to this stage.

   - Using the previously imported `{Link}` from react-router-dom, we create a link tag to the content page. We then add the image and title to the link.

Below is what the homepage looks like at the moment.

![homepage](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/homepage.png)

For the Content.js file, we start by:
- importing useFetch from useFetch.js and useParams from react-router-dom.
  ```javascript
    import { useParams } from 'react-router-dom'
    import useFetch from '../hooks/useFetch'
  ```
  useParams is a hook used to grab single records, and in this case, we are capturing the records from Strapi.
- Next, within the `export default function,` we create a const and destructure the name of the parameter we want (id) and, it equals useParams.
  ```javascript
  const { id } = useParams()
  ```
> Note: we call it id because it was named id in the routes in our App.js file.
- insert the useFetch component by adding the code below:
  ```javascript
  const{loading, error, data} = useFetch('http://localhost:1337/api/reviews' + id)
  ```
    The above code destructures loading, error, and data from useFetch, while the `url` is the Strapi endpoint and the `id` is our destructured parameter.
- Create two `if statements` to return a loading message and an error message if there's one.
  ```javascript
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>
  ```
- Next, once the above is done, we will need to return the template containing the selected articles content. Thus, we used the code below to do that:
  ```javascript
  return (
    <div className="review-card">
      <div className="rating">{data.data.attributes.rating}</div>
      <h2>{data.data.attributes.title}</h2>

      <small>console list</small>

    </div>
  )
  ```

![content](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/content.png)

- To make it markdown enabled, we have to go back to the preveiously created components folder. Within the folder, we create a file called Codeblock.js and we add the code below:
  ```javascript
  import React from "react"
  import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
  import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism';

  const CodeBlock = {
    code({node, inline, className, children, ...props}) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
      <SyntaxHighlighter 
        style={dracula} 
        language={match[1]} 
        PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>

      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  }

  export default CodeBlock
  ```
  - There are a few prerequisites to using the code above.
  - First, we need to install `react-syntax-highlighter.` We do this using the code below:
    ```bash
    npm install react-syntax-highlighter
    ```
  - Next, we import Prism and Dracula from the `react-syntax-highlighter` module.
  >Note: this is not our syntax, so we can not give a full explanation of its usage.
- To use this for our content's body, we will head back to the Content.js file. Within the content.js file, we will need to import `markdown` from `react-markdown.` To install react-markdown, use the code below:
  ```bash
  npm install react-markdown
  ```
- Next, we will need to import Codeblock.js (file containing our syntax highlighter) from the components folder.

  **Example**
  ```javascript
  import Markdown from 'react-markdown'
  import CodeBlock from '../components/CodeBlock'
  ```
- Finally, we will add the body of the article in our div, encased in a markdown tag while using the syntax from Codeblock.js as a component attribute in the markdown tag.

  **Example**
  ```javascript
  <Markdown components={CodeBlock}>{data.data.attributes.body}</Markdown>
  ```
[Here](https://github.com/muyiwexy/blog/blob/main/frontend/src/index.css) is the link to the entire CSS used for the blog.

Proper implementation of the above gives us the result below:

![content-body](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/content-body1.png) 

![content-body](engineering-education/building-a-blog-using-react-hooks-strapi-v4.0-and-prism/content-body2.png)

Our blog looks great, and it's good to go.
### Conclusion
It has been great every step of the way, and we hope you enjoyed the journey with us. We have shown you how to use state hooks, Strapi, and Prism to create a masterpiece. We believe you can take it a step higher and expand your scope with this project. Strapi enables developers' a wide range of possibilities and how they use the content. [Here](https://github.com/muyiwexy/blog) is the link to the entire code. Happy coding🚀, and as said in node.js, happy hacking💻!
