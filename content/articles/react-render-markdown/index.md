
React makes it painless to compose interactive UI components. Such UIs can be a blog or documentations for your applicationn. When building a text-heavy website, it can easily become tedius to handle the complexity of JSX tags. The React markdown library makes this less frustrating by allowing developers to write content in markdown syntax for your app without worring about formatting and code placements.

### Goal
There are different flavours of markdown syntax. For our case, we will use [GitHub] markdown syntax to build a React blog app. The app previews markdown we render on the webpage. In the process, we will learn what markdown is, its syntax, advantages, and its limitations.


### Pre-requisites
To follow along and implement the application, you need a basic knowledge in: 

- Basics in [JavaScipt](https://developer.mozilla.org/en-US/docs/Web/JavaScript) programming.
- A text editor such as [VS Code](https://code.visualstudio.com/download).
- A [web browser](https://www.google.com/chrome/) such as Google Chrome.

### Why Markdown?

According to the markdown original creator, John Gruber:
> Markdown is a text-to-HTML tool for writers. It allows us to have an easy-to-write, easy-to-read plain text format.

With markdown, writing content on the web has taken a new shift. For example, in markdown, we can simply write:

```markdown
## Hello EngEd!
We optimize the [Edge](https://www.section.io/) for your Apps. Happy coding!
```

Translating the same in HTML looks like:

```html
<h2>Hello EngEd!</h2>
<p>We optimize the <a href="">Edge</a> for your Apps. Happy coding!</p>
```

To developers, writing markdown is similar to writing plain text with features that stuctured HTML offers. For React developers, markdown components uses an abstract syntax tree to build the elements in a virtual DOM. 

### Set Up React project
To generate a basic React app, we will use [Vite](https://vitejs.dev/), a frontend build tool that will optimize our build process. Vite bundles any pre-configured code using Rollup rather than Webpack.

To start a new Vite application with a basic React template, run your terminal with the command:
```bash
yarn create vite markdown-demo --template react
```

Next, navigate inside the markdown-demo folder on your terminal and run `npm i` to install dependencies:

```bash
npm i
```

Next, we need to add `react-markdown` packages:

```
npm install react-markdown
```

To install `tailwindcss` as a `devDependency` package.

```bash
npm install -D tailwindcss autoprefixer postcss
```
- postcss - Helps in linting and transforming our styles with using plugins for JavaScript.

To initialize tailwind within our project, type the command:
```bash
npx tailwindcss init -p
```
This generates a `tailwind.config.js` file in our root directory.

Finally, we need to run a command to spin up a new dev server:

```bash
npm run dev
```

[IMG]()

Our application should be running at `port 3000`. If we switch back to the browser, we can access the URL `http://localhost:3000/`, this endpoint should render:

[IMG]()

### Creating elements with React markdown

- Creating heading tags
In normal HTML syntax, headings tags include `<h1>`, `<h2>`, all the way to `<h6>`. However in Markdown, we use `#` syntax to denote `h1`, `##` to denote `h1` and so forth. Let's render a simple `h2` tag in markdown in React:

```jsx
     <ReactMarkdown 
      remarkPlugins={[gfm]}
      rehypePlugins={[rehypeHighlight]}
      className='text-slate-400 text-lg'
      >
       ## Happy coding!
     </ReactMarkdown>   
```


> Unlike other libraries that utilize the `dangerouslySetInnerHML`, `react-markdown` relies on the syntax tree to build and update the virtual DOM accordingly.

### Creating a simple Blog with React Markdown and Tailwind CSS

### Navbar

First, import the `Link`, and social media icons from the `react-icons` package.
```jsx
import { Link } from 'react-router-dom'
import {FiMoon, FiSun, FiSearch, FiTwitter, FiGithub, FiRss} from 'react-icons/fi'
```

Our component is a function named `NavBar`. Inside it, we return JSX that includes a brand name(sectionIO), and links to various resources.
```jsx
function NavBar() {

  return (
    <nav className='flex justify-between flex-col gap-3 md:flex-row items-center py-6 bg-[#111827]'>
        <Link to='/' className='font-semibold text-white text-3xl ml-3 p-4'>sectionIO</Link>

        <ul className='flex text-white'>
          <li className='px-2'>Templates</li>
          <li className='px-2'>Handbook</li>
          <li className='px-2'>Snippets</li>
        </ul>

        <div className='mr-3 flex items-center'>
           <Link to='/' className='text-2xl text-white px-2'><FiTwitter/></Link>
           <Link to='/' className='text-2xl text-white px-2'><FiGithub/></Link>
           <Link to='/' className='text-2xl text-white px-2'><FiRss/></Link>
        </div>
    </nav>
  )
}
```

Export the `NavBar` component as default:
```jsx
export default NavBar
```

### Syntax Highlighting
```jsx
const ArticleDetails = () => {
  return (
    <div className='w-[80vw] mx-auto mt-6'>
    <ReactMarkdown
    children={markdown}
    components={{
      code({ node, children, inline, className, ...props }) {
        const match = /language-(\w+)/.exec(className || "");
        return !inline && match ? (
          <SyntaxHighlighter
          language={match[1]}
            PreTag="div"
            children={String(children).replace(/\n$/, "")}
            style={oneDark}
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        );
      },

      h3: ({node, ...props}) => <h3 className='text-slate-700 font-bold text-2xl mt-3 mb-2' {...props}/>,
      em: ({node, ...props}) => <em className='text-[#333] bg-[#f5f5f5] p-1' {...props}/>,
      ul: ({node, ...props}) => <ul className='my-2' {...props}/>,
      li: ({node , ...props}) => <li className='text-slate-600 list-disc ml-5' {...props}/>,
    }}
  />
  </div>
  )
}
 
export default ArticleDetails
```



## The `App.js` component 
```jsx
import NavBar from './components/navbar/NavBar.jsx'
import Articles from './screens/Articles.jsx'
import ArticleDetails from './screens/ArticleDetails.jsx'
import Footer from './components/footer/Footer.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'

const App = () =>{

  return(

    <BrowserRouter>
    <NavBar />

    <Routes>
      <Route path='' element={<Articles />} />
      <Route path='blog/:id' element={<ArticleDetails/>} />
    </Routes>

    <Footer />
    </BrowserRouter>
  )
} 

export default App
```


### Footer

```jsx

function Footer() {
  return (
    <>
    <hr className="h-[2px] bg-slate-500 text-green-400 max-w-[90vw] mx-auto"/>

    <footer className="flex flex-col items-center justify-between px-4 py-8 mx-auto max-w-7xl md:flex-row">
     <p className="mb-8 text-sm text-center text-gray-700 md:text-left md:mb-0">This Blog has <strong>no user tracking</strong> scripts.</p>
  
     <div className="text-md text-gray-600 "> 
     &copy; 2022 - All Rights Reserved.
     </div>
     </footer>
    </>)
}

export default Footer
```

### A Demo
[IMG]()

Check the project source code on GitHub

### Conclusion
Being able to create and write structured content for a blogs or documentation has never been easy. The traditional word processors or even HTML limitations in matching formatting and the final output results in developers seeking for other options. Markdown and `react-markdown` bridges this gap by providing a lightweight way to create rich text in your applications without need for formatting JSX or HTML tags. 

### Further reading

- [React Markdown](https://github.com/remarkjs/react-markdown).
- [Markdown syntax](https://gist.github.com/cuonggt/9b7d08a597b167299f0d).
