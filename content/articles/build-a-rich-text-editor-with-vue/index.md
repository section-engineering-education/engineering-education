### Introduction
A rich text editor is a necessary feature for all web applications that receive user input that requires a degree of formatting.

For example, if you wanted to implement any of the following:
- A page for lengthy reviews.
- A page for a user to write blog posts.

You would probably need to build a rich text editor for your application.

But that raises a question: how do you build one? It seems like a daunting task, and it would be if you had to do it from scratch.

Thankfully, TipTap solves this problem for us. TipTap is a free, open-source, framework-agnostic JavaScript library that allows us to create rich text editors that completely fit our needs.

This article will guide the reader through the process of using TipTap to quickly implement a rich text editor in their Vue.js application.

You can check out the finished project [here](https://article-tiptap-demo.vercel.app).

### Intended Audience
This article is intended for readers who:
- already understand the basics of front end web development with Vue.js(Vue 2)
- are comfortable with TailwindCSS

### Introduction to TipTap
TipTap is a headless library. Like a [headless CMS](https://strapi.io/what-is-headless-cms), TipTap doesn't provide a user interface for you.

Instead, TipTap gives you a set of tools, and it's up to you to use them to assemble your own user interface, giving you complete control over the look and behavior of your editor.

TipTap is a wrapper around a more complex, lower-level library called [ProseMirror](https://prosemirror.net/).

All the content in the editor you will build will be rendered as HTML on the page.

Before we move on, let's define some jargon:
- [Nodes](https://tiptap.dev/api/nodes). Nodes are parts of TipTap that allow you to create and manipulate new HTML elements in an editor instance. For example, if you want to give the editor the ability to add a list, you need to add the list node to your TipTap setup.

- [Marks](https://tiptap.dev/api/marks). Marks are parts of TipTap that allow you to modify an existing node. For example, if you wanted to make a paragraph in the editor bold, you need to install and use the bold mark.

- [Extensions](https://tiptap.dev/api/extensions). Extensions are parts of TipTap that confer extra functionality onto an editor instance but don't directly affect nodes or marks. For example, the history extension enables the editor to perform undo and redo operations.

- [Commands](https://tiptap.dev/api/commands). Commands are methods you call on an instance of the editor to achieve some effect.

TipTap allows you to output the current content of an editor instance in one of two formats: HTML or JSON.

### Approach to the Project
As you build this project, you will execute the following steps:
- Project setup
- Building the editor menu
- Getting the editor output

Let's begin.

### Project Setup
Before building your editor, you need to put some things in place.

You're going to install and set up Vue CLI, Tailwind CSS, and TIpTap.

#### Setting up Vue CLI
Begin by installing Vue CLI(If you haven't before) by running the following command in your terminal.

```sh
npm install -g @vue/cli
```

Once that has finished running, run this command:

```sh
vue create my-tiptap-demo
```

This will create the folder your project will live in and install everything you need to write Vue.

After running `vue create`, you will see a prompt that asks you to choose between three options: two defaults and a manual selection.

We'll be using Vue 2 in this demo, so pick the option that looks like this:

```
Default ([Vue 2] babel, eslint)
```

After `vue create` is done, enter the project folder by running:

```sh
cd my-tiptap-demo
```
Now that Vue is installed, you will lay the groundwork for your project.

Delete the `HelloWorld.vue` component in your `src/component` folder.

Next, create a Vue component called `TipTap.vue` in the same folder.

Replace the contents of `src/App.vue` in src with the following code:

```html
<template>
  <div id="app">
    <h1 class="mt-16 text-center text-2xl mb-4 font-semibold">TipTap Vue Demo</h1>

    <tip-tap />

  </div>
</template>

<script>
import TipTap from './components/TipTap.vue'


export default {
  name: 'App',
  components: {
    TipTap
  }
}
</script>
```
The classes attached to the header don't have any styling, but they will once you set up Tailwind.

Start the Vue development server by running the following in your terminal:

```sh
npm run serve
```

Visit localhost:8080 to see your Vue project running.

#### Setting up Tailwind CSS
Close your dev server, then run the following commands in your terminal:

```sh
npm install -D tailwindcss
npx tailwindcss init
```

This will install and initialize TailwindCSS for you.

Create a file called `input.css` in the `src/assets` folder of your Vue project, and put the following code into it:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
}
```
This will be the source file for your project CSS.

In your tailwind.config.js, put the following code:

```js
module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

And then run the following in your terminal:

```sh
npx tailwindcss -i ./src/assets/input.css -o ./public/output.css --watch
```
Tailwind will generate a file called `output.css` in your project's `public` folder when you run that command.

Link your output.css file to your `public/index.html` file by putting the following in the head of your index.html.

```html
<link rel="stylesheet" href="<%= BASE_URL %>output.css">
```

That concludes the setup for Tailwind.

#### Setting up TipTap
To begin, open a new terminal window. Run the following code in the terminal window:

```sh
npm install @tiptap/vue-2 @tiptap/starter-kit
```

This code will install the core components of TipTap. It will also install a bundle of the most commonly used nodes, marks and extensions called the starter kit.

Go to the `src/components/TipTap.vue` file you created earlier and insert the following code in the scripts section of the component.

```js
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent,
  },

  data() {
    return {
      editor: new Editor({
        content: '<p>TipTap works, Yay!</p>',
        extensions: [
          StarterKit,
        ],
      })
    }
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
```

This code imports the `Editor` object and `editor-content` component from your TipTap installation. It also initializes the editor property of `data`.

It also provides a method to destroy your TipTap instance when the Vue component is destroyed.

The `Editor` object you imported is responsible for creating the editor instance of the page. The properties you passed to it are used to initialize your editor instance.

Let's go over the properties you passed to it:
- The `content` property describes what the initial content of the editor should be.
- The `extensions` property is a list of nodes, marks, and extensions you want the instance to have access to.

Now, put the following code in the template section of your component.

```html
<template>
  <editor-content :editor="editor" />
</template>
```

This code puts the `editor-content` component into the template.

Start your Vue development server if you've closed it, and go to localhost:8080.

This is a screenshot of what your app should look like after you're done with the above:

![setup screenshot](/setup.png)

And you're done with the setup!

### Building the editor menu
In the setup section, you installed TipTap and created the base of your editor.

Next, you're going to build the menu of your editor.

The menu will have the following features:

- Heading(H1 and H2) buttons
- Bold and italic buttons
- A link button
- A list button
- An image button

Let's get started.

You're going to start by building the container for the menu buttons.

Place the following in the template section of your `src/components/TipTap.vue` file:

```html
<div>
    <div class=" md:w-3/4 lg:w-1/2 mx-4 sm:mx-auto border border-black rounded-md mb-4">
        <div class="flex flex-wrap justify-start items-center py-2 border-b border-black px-2 shadow-xs"></div>

        <editor-content :editor="editor" />
    </div>
</div>
```

The code puts a div on top of your editor with some styling. This is what the page should look like at this point:

![empty menu screenshot](/empty-menu.png)

Now, for the buttons.

#### Building the heading buttons
Inside the div just on top of the `editor-content` component, place the following code:

```html
    <button
    class="menu-button"
    :class="{'active-button': editor.isActive('heading', { level: 1 })}"
    @click="makeH1"
    >
    H1
    </button>

    <button
    class="menu-button"
    :class="{'active-button': editor.isActive('heading', { level: 2 })}"
    @click="makeH2"
    >
    H2
    </button>

```

That code creates the buttons inside your div and adds event listeners that call two functions when the user clicks on the buttons.

`editor.isActive` is a TipTap command that returns true or false if the cursor is currently over a node or mark passed to it.

We're using it here combined with a class binding to apply a new class to your buttons when the cursor is on top of a matching node or mark.

Let's style the buttons. Add the following code to your input.css file inside the `@layer components` section:

```css
.menu-button {
    @apply mb-2 md:mb-0 uppercase mx-1 shadow-sm h-8 px-3 font-semibold border border-black rounded;
}

.active-button {
    @apply bg-black text-white;
}
```

That code gives the buttons:
- some padding
- a rounded border and margin
- a small shadow

And defines the CSS for your `active-button` class.

Next, define the functions you already passed to the event listeners.

Add the following to the script section in `src/components/TipTap.vue`:

```js
methods: {
    makeH1() {
        this.editor.chain().toggleHeading({ level: 1 }).focus().run();
    },

    makeH2() {
        this.editor.chain().toggleHeading({ level: 2 }).focus().run();
    },
},
```

The functions `makeH1` and `makeH2` only have one job: to run a chain of TipTap commands.

Let's explain the function of each command:
- The `chain` command is necessary for you to chain multiple commands.
- The `focus` command keeps focus inside the editor.
- The `toggleHeading` command comes from the heading node, allowing you to create a new heading or remove an existing one.

At this point, if you take a moment to type in the editor and try your new buttons, you'll notice they don't seem to do anything.

The text will look the same, even though the active class is present on the buttons. So what's wrong?

Remember that all content in your editor is rendered as HTML.

TailwindCSS applies CSS resets to specific elements to allow you to style them without fighting the default CSS on them.

You're going to apply some styling to the editor, so you can see the effects your buttons are having.

Put the following code in your `src/assets/input.css`, below the `@layer component`:

```css
.ProseMirror {
    @apply py-2 px-3 focus:outline-none;
    max-height: 60vh;
    overflow-y: auto;
}

.ProseMirror h1, h2 {
    @apply font-semibold;
}

.ProseMirror h1 {
    @apply text-2xl mb-4;
}

.ProseMirror h2 {
    @apply text-xl mb-2;
}

.ProseMirror p {
    @apply mb-1;
}

.ProseMirror ul {
    list-style-type: disc;
    padding: revert;
}

.ProseMirror a {
    text-decoration: underline;
}
```
This code also adds some styling in advance for some other types of nodes.

Now, the changes are quite visible when you try and use the buttons.

#### Building the bold and italic buttons
You're going to follow a similar process to build the bold and italic buttons.

Place this markup in the template of `src/components/TipTap.vue`, after the markup for the header buttons:

```html
<button
class="menu-button"
:class="{'active-button': editor.isActive('bold')}"
@click="makeBold"
>
B
</button>

<button
class="menu-button"
:class="{'active-button': editor.isActive('italic')}"
@click="makeItalic"
>
I
</button>
```

Then add the relevant functions to the method object.

```js
makeBold() {
    this.editor.chain().toggleBold().focus().run();
},

makeItalic() {
    this.editor.chain().toggleItalic().focus().run()
},
```

The only new commands here are `toggleBold` and `toggleItalic`. These commands are responsible for creating/destroying the bold and italic marks respectively, just like the `toggleHeading` command.

Test the buttons to see the effects, then continue to the next section.

#### Building the link button
You have to approach the link button a little differently. Why? You can't just toggle a link on and off: you need to give the user some interface to enter the URL of the link.

Because TipTap is headless, it doesn't provide a user interface, so you need to build it yourself.

You also need to install the link mark from npm, as it is not included in the starter kit.

Install the mark by running this code in your:

```sh
npm install @tiptap/extension-link
```

Now that you've installed the mark, add the markup for the button in the template of `src/components/TipTap.vue` after the italic button.

```html
<button
class="menu-button"
:class="{'active-button': editor.isActive('link')}"
@click="toggleLinkDialog"
>
<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path
    fill="currentColor"
    d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
</svg>
</button>
```

Instead of trying to directly create a link, this button will toggle the presence of a dialog that the user can enter the URL in.

Next, add the markup for the dialog into the template, just above the `editor-content` component.

```html
<div v-show="editingLink" class="flex py-4 justify-start items-center border-b border-black">
    <input
        type="text"
        v-model="prevLink"
        class="w-3/5 inline-block mx-2 shadow-sm p-1 border border-black rounded"
        placeholder="Type URL here"
    >

    <button
        class="mx-2 px-2 inline-block shadow-sm border border-black rounded"
        title="save"
        @click="makeLink"
    >
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
    </button>

    <button
        class="mx-2 px-2 inline-block shadow-sm border border-black rounded"
        title="close dialog"
        @click="closeLinkDialog"
    >
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        </svg>
    </button>
</div>

<editor-content :editor="editor"/>
```
The SVGs inside the buttons render to icons.

Next, you'll add the scripts.

First, you need to import the link mark.

Add this code to the top of your scripts section in `src/components/TipTap.vue`, below the other import statements.

```js
import Link from "@tiptap/extension-link"
```

replace the data function of your component with this:

```js
data() {
    return {
        editor: new Editor({
            content: '<p>TipTap works, Yay!</p>',
            extensions: [
                StarterKit,
                Link,
            ],
        }),

        editingLink: false,
        prevLink: null,
    }
},
```

Add the following to your methods object after the `makeItalic` function.

```js
toggleLinkDialog() {
  if (this.editingLink) {
    this.editingLink = false
    return
  }

  this.editingLink = true

  this.prevLink = this.editor.getAttributes("link").href
},

makeLink() {
  const url = this.prevLink

  // empty
  if (!url || url.trim() === "") {
    this.editor.chain().focus().extendMarkRange("link").unsetLink().run();
    this.editingLink = false

    return;
  }

  this.editor.chain().toggleLink({ href: url }).focus().run();

  this.editingLink = false
},

closeLinkDialog() {
  this.prevLink = null
  this.editingLink = false
},
```

`toggleLinkDialog` is the function tied to the link button in the menu. It shows/hides the link dialog when it is clicked.

`closeLinkDialog` hides the dialog when called. It is tied to the cancel button in the dialog.

`makeLink` gets the current value of the input in the dialog. It then creates a link in the editor with the value of the input as its URL.
 If the value of the input is empty or whitespace, `makeLink` removes any link that might've been selected.

#### Building the list button
To build the list button, you need to install two new nodes: `bulletList` and `listItem`.

Install them by running the following in your terminal:

```sh
npm install @tiptap/extension-bullet-list @tiptap/extension-list-item
```
Import the new extensions at the top of the script tag of your component, below the other import statements.

```js
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
```

Replace the editor property in your data method with:

```js
editor: new Editor({
        content: '<p>TipTap works, Yay!</p>',
        extensions: [
            StarterKit,
            Link,
            BulletList,
            ListItem
        ],
}),
```
That code adds the new nodes to the object's `extensions` property, registering them with your editor instance.

Next, write the markup. Insert it inside the menu div, after the button that triggers the link dialog.

```html
<button
    class="menu-button"
    :class="{'active-button': editor.isActive('bulletList')}"
    @click="makeList">
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path
        fill="currentColor"
        d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
    </svg>
</button>
```

Write the `makeList` function in the method object of your script section after the `closeLinkDialog` method.

```js
makeList() {
    this.editor.chain().focus().toggleBulletList().run()
},
```

The `toggleBulletList` command is similar in function to the `toggleHeading` command.

#### Building the image button
The image node isn't in the starter kit, so you need to install it first.

Run the following in your terminal:

```sh
npm install @tiptap/extension-image
```

After that, import the node into your component by adding this code to the top of the script section:

```js
import Image from "@tiptap/extension-image"
```

Then add it to your list of extensions in data with:

```js
editor: new Editor({
        content: '<p>TipTap works, Yay!</p>',
        extensions: [
            StarterKit,
            Link,
            BulletList,
            ListItem,
            Image
        ],
}),
```

Continue by adding the markup for the button:

```html
  <button
    class="menu-button"
    :class="{'active-button': editor.isActive('image')}"
    @click="triggerImage"
  >
    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
      <path
      fill="currentColor"
      d="M7 19L12 14L13.88 15.88C13.33 16.79 13 17.86 13 19H7M10 10.5C10 9.67 9.33 9 8.5 9S7 9.67 7 10.5 7.67 12 8.5 12 10 11.33 10 10.5M13.09 20H6V4H13V9H18V13.09C18.33 13.04 18.66 13 19 13C19.34 13 19.67 13.04 20 13.09V8L14 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H13.81C13.46 21.39 13.21 20.72 13.09 20M18 15V18H15V20H18V23H20V20H23V18H20V15H18Z" />
    </svg>
  </button>

  <input type="file" id="img-upload" class="hidden" @change="makeImage" />

```

You're adding an input tag of type file to allow users to upload files from their device. The input tag is hidden, so users can't click on it directly.

Now, add the functions in the method object of your script tag:

```js
triggerImage() {
  document.getElementById("img-upload").click();
},

makeImage(e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string with reader.result
      this.editor.chain().focus().setImage({ src: reader.result }).run();
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
},
```

Clicking the button triggers a click on the hidden input.

The code adds a change event listener to the hidden input tag. Whenever the user selects a new image, the function adds the image to the editor.

When the image changes, the function gets the image and passes it to the file reader object to convert the image to a base 64 string and use that as a URL.

Once you have the URL, you pass it to the `setImage` command, which adds the image to the editor.

At this point, you have a fully functional editor, but how can you output all the content your user has typed? Find out in the next section.

### Getting the editor output
In a complete application, you would need to send the editor output to a backend for storage or processing.

You don't have a backend in this demo, so you'll just display the editor output on the page. How are you going to do that?

You're going to use two new commands:
- `editor.getJSON()`
- `editor.getHTML()`

As you can probably guess from the names, those methods output the editor instance's current content as either JSON or HTML.

Let's use them. Start by adding the following markup to your `src/components/TipTap.vue` template beneath the editor div.

```html
<div class="text-center">
  <button
    type="button"
    class="border border-black rounded shadow-sm px-3 py-1 font-semibold mb-2"
    @click="produceOutput"
  >
    Show editor output
  </button>

  <div>
    <input type="radio" value="html" name="h-output" v-model="outputFormat" >
    <label for="h-output mr-2">As HTML</label>

    <input type="radio" value="json" name="j-output" v-model="outputFormat">
    <label for="h-output">As JSON</label>
  </div>

  <div>
    {{ editorOutput }}
  </div>
</div>
```

That code creates a button to trigger the output generation and a radio button to select which output format the user wants it in.

Add the `outputFormat` and `editorOutput` properties to your data function:

```js
data() {
  return {
    editor: new Editor({
      content: '<p>TipTap works, Yay!</p>',
      extensions: [
        StarterKit,
        Link,
        BulletList,
        ListItem,
        Image,
      ],
    }),

    editingLink: false,
    prevLink: null,
    outputFormat: null,
    editorOutput: '',
  }
},
```

Next, write the following code at the end of your list of methods:

```js
produceOutput() {
  if (!this.outputFormat) {
    return
  }

  if (this.outputFormat === "json") {
    this.editorOutput = this.editor.getJSON()
  } else {
    this.editorOutput = this.editor.getHTML()
  }
},
```

This code calls the commands for the output generation, but only if one of the radio buttons is selected.

And that's the end of this tutorial!

Here's what everything should look like when you put it together:

![finished demo screenshot](/finished-demo.png)

### Conclusion
In this article, you learned how to use TipTap to build a rich text editor. I hope you found it helpful.

You can find a link to the complete codebase [here](https://github.com/Morgenstern2573/article-tiptap-demo).

If you would like to learn more about some of the concepts covered in this article, I've added links below.

Useful links:
- [File reader](https://javascript.info/file)
- [TipTap documentation](https://tiptap.dev/introduction)
