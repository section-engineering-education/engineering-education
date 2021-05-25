---
layout: engineering-education
status: publish
published: true
url: /vue2-crud-app-with-localstorage/
title: How to Make a CRUD app with Local Storage using Vue 2
description: In this article, we will look at how to make a CRUD application that implements a Web browser's Local storage using Vue.js 2.
author: espira-marvin
date: 2021-03-03T00:00:00-10:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/vue2-crud-app-with-localstorage/hero.jpg
    alt: Vue CRUD Local Storage example
---
Vue.js is a progressive, versatile front-end JavaScript framework. It is highly adoptable due to its simplicity and small bundle size. Local storage is a Web Storage API in modern browsers that allows us to store data as key-value pairs of strings on the user's browser.
<!--more-->
With this we can work with data without communicating with a back-end application, which enhances data persistence. Unlike when cookies are used, which store a maximum of 4kb of data on the client. They are sent to the server when HTTP requests are made and can be modified by the server.

### Prerequisites
To follow this tutorial along the reader will need:
- Node.js 6.x or newer
- Npm 5.10 or newer
- Vue CLI
- Some knowledge of JavaScript, CSS, & HTML

### Create project with Vue CLI
To create a Vue.js project, first check if Vue CLI is globally installed in your computer. 

Using the terminal run:

```bash
 $ vue –version 
```

If it is not installed, run the following command to install it.

```bash
 $ npm install -g @vue/cli 
```

Go to your workspace folder and run the command below to create a new Vue.js app.

```bash
$ vue create books-app
```

Using the arrow keys select:
```bash
❯ Default ([Vue 2] babel, eslint) 
```

Then hit enter. After creating, navigate to the created folder `books-app` and serve the app by running the commands:
```bash
$ cd books-app
$ npm run serve
```

Then, open the URL http://localhost:8080 in your browser to view the app.

### Installing Vue.js DevTools
This is a browser extension for debugging Vue.js apps. It inspects components, props, routing, vuex, and more. 

Open your browser, and install Vue.js DevTools extension for [Mozilla](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) or [Chrome]( https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en). 

To open the browser's DevTools press `SHIFT + CTRL + J` on Windows/Linux or `Command + Option + j` on MacOS.

### Creating Books component
This app will manage a list of books to read. Open the app with a code editor of your choice. The component displayed on our browser is the `HelloWorld` component located in the `src/components` folder.

We will delete it and its references in `App.vue` including the image logo. Now create a `Books.vue` file in the `components` folder. Add the code below to this file.

```vue
<template>
    <div>
        <h2>My Books List</h2>
    </div>
</template>

<script>
    export default {
        name: "Books"
    }
</script>

<style scoped>

</style>
```

Note that in Vue 2, component template should only contain one root element. Otherwise, it will throw an error. We can then import the `Books` Component into the root component. The `App.vue` component should now look as shown below. 

The data function returns an empty array of books, books that we'll add later to populate the array.

```vue
<template>
  <div id="app">
    <Books/>
  </div>
</template>

<script>
import Books from "./components/Books";

export default {
  name: 'App',
  components: {
    Books
  }, 
  data () {
    return {
      books: []
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

`v-bind` is a Vue directive that is used to attach data to a Vue component. This will help us bind the data passed to the `Books` component. 

Make changes to `App.vue` as shown below.
```html
<Books v-bind:books="books"/>
```

`props` are used to pass data from parent to child component. In this case, `App.vue` is the parent component while `Books.vue` is the child. 

To make use of props, edit the `<script>` of the child component to look as shown below.
```vue
<script>
    export default {
        name: "Books",
        props: ["books"]
    }
</script>
```

### Creating the 'BookItem' component
In the components folder create a file `BookItem.vue`. This component will represent a single book. The code for the `BookItem.vue` should look like the snippet shown below.
```vue
<template>
    <div>
        <p></p>
    </div>
</template>

<script>
    export default {
        name: "BookItem"
    }
</script>
```

Now, import `BookItem` into the `Books` component as a child and declare it in the components object. Here we will loop through the data and display the `BookItems` to the user using a Vue directive `v-for`. 

The code for `Books.vue` should now look as shown below.
```vue
<template>
    <div>
        <h2>My Books List</h2>
        <div v-bind:key="book.id" v-for="book in books">
            <BookItem  v-bind:book="book"></BookItem>
        </div>
    </div>
</template>

<script>
    import BookItem from "./BookItem";
    export default {
        name: "Books",
        props: ["books"],
        components: {
            BookItem
        }
    }
</script>
```

Notice the `v-bind:key`. This is important as it gives Vue a hint to track each node’s identity. The `v-bind:book` binds data to a Vue component. 

To display a book, edit `BookItem.vue` to look as shown below.
```vue
<template>
    <div>
        <p>{{book.title}}</p>
    </div>
</template>

<script>
    export default {
        name: "BookItem",
        props: ["book"]
    }
</script>
```

You can add your own data in the books array in `App.vue` as shown below to display data to the UI.
```JavaScript
books: [
  {
    id:1,
    title: "1000 Leagues Under the Sea"
  },
  {
    id:2,
    title: "The Scorpion"
  },
]
```

### Creating 'AddBookItem' component
You can now delete the **JSON test data** above. Under the `components` folder, create a file named `AddBook.vue`. Import it into `App.vue` and declare it in components object inside the script as demonstrated below.

```JavaScript
import Books from "./components/Books";
import AddBookItem from "./components/AddBookItem";
export default {
  name: 'App',
  components: {
     Books,
     AddBookItem
  },
}
```

Now add the following code to the `AddBookItem.vue`.
```vue
<template>
    <div>
        <form @submit="addBook">
            <input type="text" name="title" v-model="title" placeholder="Add Book">
            <button type="submit">Add Book</button>
        </form>
    </div>
</template>

<script>
    export default {
        name: "AddBookItem",
        data () {
            return {
                title: ''
            }
        },
        methods: {
            addBook(e){
                e.preventDefault();
                const newBook = {
                    title: this.title,
                    id: Math.floor(Math.random() * 100)
                };
                if (newBook.title !== ''){
                    this.$emit('add-book-event', newBook);
                }
                this.title = ''
            }
        }

    }
</script>
```

This code has a form that you can use to add a book. It also has a method `addBook()` and a vue-directive `v-model` that creates a 2-way binding between user-input and Vue.js component. Any changes to an input value changes the bound data and vice versa. In this case the `title`. You’ll see a form to add books.

Each book needs a unique id. We will use JavaScript's `Math.random()` method to generate unique ids.

The `$emit()` method emits an event `add-book-event` used to pass data based on the user’s action from a child to a parent component. When the user adds a book and submits it, this event is emitted to the parent.

For the parent (`App.vue`) to listen to the `add-book-event` event from the child (`AddBookItem.vue`), we create a method `addBook()` and assign it to the emitted event. 

Make the changes to the `App.vue` to look like the one below. Let `AddBookItem()` be above the `Book` component in the template.

```vue
<template>
  <div id="app">
    <AddBookItem  v-on:add-book-event="addBook" />
    <Books v-bind:books="books"/>
  </div>
</template>
```

Just after `data()`, add a method `addBook()` using the code below.
```javascript
methods: {
  addBookItem(newBook){
    this.books = [...this.books, newBook]
  },
}
```

The method adds a new book to the books array, we are using the [spread operator](https://www.geeksforgeeks.org/javascript-spread-operator/), this adds the new book to the end of the array, without creating a new array.

### Save the data to local storage
We will be using the Vue.js inbuilt method [watch()](https://vuejs.org/v2/api/#watch). This method automatically watches for changes in the books array and saves data to local storage. 

The `watch()` method has a property called `deep` that is set to true to inform the Vue instance to always watch for changes in the books array.

`watch()` is used when working with data outside your component like the browser API or fetching data. 

Add the following code to `<script>` in `App.vue`.

```javascript
watch: {
  books: {
    handler() {
      localStorage.setItem('books',JSON.stringify(this.books))
    },
    deep: true
  }
}
```

Local storage uses the `setItem()` method to save data as key-value pairs, the data must be a string so we convert the JSON into a string in order to save it from using [JSON.stringify()](https://www.geeksforgeeks.org/javascript-json-stringify-method/) method.

### Load data from local storage
We need to display the saved data, from the local storage to the user. We will use a lifecycle hook called [mounted()](https://vuejs.org/v2/api/#mounted) that’s executed after Vue instance has been created.

In the cycle hook, we use the method `localStorage.getItem('key')` to retrieve data from local storage. The same key we used to store is the same we will use to retrieve the data. 

Add the code below just after the `watch()` method in `App.vue`.

```javascript
mounted() {
  if (localStorage.getItem("books")){
    this.books = JSON.parse(localStorage.getItem("books"))
  }
}
```

The `JSON.parse()` method converts a string to a JavaScript object since data is only stored as a string in local storage. 

The data is then set to the books array that is displayed to the user. 

You’ll now be able to see a list of books after adding it.

### Deleting data from local storage
Update `BookItem.vue` with the following code:

```html
<div class="float-left">
    <span class="float-right">
        {{book.title}}
        <button>
          <i class="glyphicon glyphicon-trash" @click="$emit('del-book-item', book.id)">delete</i>
       </button>
    </span>
</div>
```

I added a bootstrap CSS CDN link in the `index.html` file. You can style yours to look much better.

```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```

When you click the delete button, an event is emitted to pass book id to the parent(`Books.vue`). `$emit()` is the way Vue passes data from child to parent component. 

In `Books.vue` update `<BookItem/>` as shown below.
```html
<BookItem v-bind:book="book" v-on:del-book-item="delBookMethod" />
```

Assign the event from the child to a method called `delBookMethod()`. Add it to methods object and emit an event to its parent (`App.vue`) passing the book id with it. 

```JavaScript
methods: {
    delBookMethod(id){
        //send to parent
        this.$emit('del-book-event', id);
    },
 }
```

In the parent component(`App.vue`), let’s make some changes.
```html
<Books v-bind:books="books" v-on:del-book-event="deleteBookItem" />
```

The child event was captured and assigned to a method `deleteBookItem()`. This method will help us delete the book item that was clicked on. Remember the ID we passed from `BookItem.vue` to `Books.vue` up to `App.vue`? 

It will be used to delete the book, using the JavaScript `filter()` method to create the books array excluding the book with the passed id. We will use ES6 arrow function as shown below, this returns all the books except the one with the id passed. 

Add this method to `methods` in `AppVue`.

```JavaScript
deleteBookItem(id){
  this.books = this.books.filter(book => book.id !== id);
}
```

#### Editing the data
Just like we did while deleting data, make changes to the `BookItem.vue` to add an edit button, the code should look like this.

```vue
<template>
    <div class="float-left">
        <span class="float-right">
            {{book.title}}
            <button>
              <i class="glyphicon glyphicon-pencil" @click="$emit('edit-book-item', book.id)">edit</i>
            </button>
            <button>
              <i class="glyphicon glyphicon-trash" @click="$emit('del-book-item', book.id)">delete</i>
            </button>
        </span>
    </div>
</template>
```

An event called `edit-book-item` is emitted, and passed with it the book id to its parent(`Books.vue`). In `Books.vue` listen to the event and assign it to a method called `editBookMethod()` as shown below.

```html
<BookItem v-bind:book="book" v-on:del-book-item="delBookMethod" v-on:edit-book-item="editBookMethod" />
```

Using the method, send an event to its parent (`App.vue`) and pass the book id along with it. 

Add this methods to `methods` in `Books.vue`.

```JavaScript
editBookMethod(id){
    //send to parent (App.vue)
    this.$emit('edit-book-event', id)
}
```

In the parent, make changes to capture the event `edit-book-event` from `Books` component, and assign it to a method `editBookItem()`. In the `data` create a new object `editBook` that will hold the data being edited. 

The object should have a title and an id. 

Both should be empty strings.

```JavaScript
data () {
  return {
    books: [],
    editBook: {
      title: '',
      id: ''
    }
  }
}
``` 

Now in the `editBookItem` method, we need to find the index of the object’s id. We do this using JavaScript's `findIndex()` method. We go through the books array to find the book object matching the ID passed from the child component and assign it to a variable `objIndex`. 

This variable helps us to access the title of the book from the books array and assign it to the title in the `editBook` object together with its id as shown below.

```JavaScript
editBookItem(id){
  //find the index of the book's id
  var objIndex = this.books.findIndex(obj=> obj.id === id);
  this.editBook.title = this.books[objIndex].title;
  this.editBook.id = id;
},
```

We still cannot edit a book. We capture the earlier event `edit-book-event` in the `AddBookItem` component and assign it to a method `editBookItemEvent()`. 

We then bind the `editBook` property to the component with `v-bind` directive and pass it as a prop to the child (`AddBookItem`) as illustrated below.

```html
<AddBookItem v-model="editBook.title" v-on:add-book-event="addBookItem"  v-bind:editBook="editBook"/>
```

Let’s open `AddBookItem.vue`. We receive the `editBook` data object from parent as props. Then add `id` as an empty string and `edit` as false in the data function.

```JavaScript
name: "AddBookItem",
props: ['editBook'],
data () {
    return {
        title: '',
        id: '',
        edit: false
    }
}
```

We will use this `edit` property to decide whether to edit or add a new book. We first check if the user is not editing. We save the data, otherwise we will edit the data. 

If we’re editing, we emit an `edit-book-event` and pass the variable that holds the edited data `bookItem` along with the event to the parent. 

We also clear the input field. Now update `addBookItem()` method to look as shown below.
```javascript
addBook(e){
    e.preventDefault();
    if (this.edit === false){
        // add new book
        const newBook = {
            title: this.title,
            id: Math.floor(Math.random() * 100)
        };
        if (newBook.title !== ''){
            this.$emit('add-book-event', newBook);
        }
        this.title = ''
    }else{
        //edit book
        const bookItem = {
            title: this.title,
            id: this.id
        }
        //send to parent (App.vue)
        this.$emit('edit-book-event', bookItem)
        // clear input field
        this.title = '';
        this.edit = false;
    }
}
``` 

Now you can click on the edit button and the input field will be populated with the book title. The `watch()` method comes in handy again, to help us watch for any changes in the editBook data. 

We set `deep:true` property to let the Vue instance continuously watch for changes. So, while editing a book, the `edit` property will always be true.

It also watches the title property and if it’s empty, it sets the `edit` property to false. 

Here we don’t need the `deep` property.
```javascript
watch: {
    editBook: {
        handler() {
            this.title = this.editBook.title;
            this.id = this.editBook.id;
            this.edit = true
        },
        deep: true
    },
    title: {
        handler() {
            if (this.title === ''){
                this.edit = false;
            }
        }
    }
}
``` 

Back to `App.vue`, after editing a title, an event `edit-book-event` is sent to `App.vue`. We assign the event to a method in order to save the changes to local storage. Update your code to look like shown below.

```html
<AddBookItem v-model="editBook.title" v-on:add-book-event="addBookItem"  v-bind:editBook="editBook" v-on:edit-book-event="editBookItemEvent" />
```

Now we create an `editBookItemEvent()` method to handle the saving of data. In the method we find the index of the id’s object. 

This index will be used to reassign the title of the book being edited. If you’ve reached this far you can edit a book title.  

Add the code below to `methods` in `App.vue`.

```JavaScript
editBookItemEvent(bookItem){
    //find the index of this id's object
     let objIndex = this.books.findIndex(obj => obj.id === bookItem.id)
     //update the item
     this.books[objIndex].title = bookItem.title;
}
```

Now, your `App.vue` should look like the code shown below.

```vue
<template>
  <div id="app">
    <AddBookItem v-on:add-book-event="addBookItem" v-on:edit-book-event="editBookItemEvent" v-bind:editBook="editBook"/>
    <div>
      <Books v-bind:books="books" v-on:del-book-event="deleteBookItem" v-on:edit-book-event="editBookItem" />
    </div>
  </div>
</template>

<script>
import Books from "./components/Books";
import AddBookItem from "./components/AddBookItem";

export default {
  name: 'App',
  components: {
    Books,
    AddBookItem
  },
  data () {
    return {
      books: [],
      editBook: {
        title: '',
        id: ''
      }
    }
  },
  methods: {
    addBookItem(newBook){
      // console.log('newbook', newBook.title);
        this.books = [...this.books, newBook];
      // this.books.unshift(newBook)
    },
    deleteBookItem(id){
      this.books = this.books.filter(book => book.id !== id);
    },
    editBookItem(id){
      //find the index of the book's id
      let objIndex = this.books.findIndex(obj=> obj.id === id);
      this.editBook.title = this.books[objIndex].title;
      this.editBook.id = id;
    },
    editBookItemEvent(bookItem){
      //find the index of this id's object
      let objIndex = this.books.findIndex(obj => obj.id === bookItem.id)
      //update the item
      this.books[objIndex].title = bookItem.title;
    }
  },
  watch: {
    books: {
      handler() {
        localStorage.setItem('books',JSON.stringify(this.books))
      },
      deep: true
    }
  },
  mounted() {
    if (localStorage.getItem("books")){
      this.books = JSON.parse(localStorage.getItem("books"))
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### Conclusion
We've just finished creating a CRUD Vue2 application with local storage. You can improve the user interface of your application using materialize components or other UI design materials. 

Vue is quite a work of art if you ask me. It is much cleaner with awesome features under the scene. In case you get stuck, here is the link to the code in my [GitHub repo](https://github.com/EspiraMarvin/vue2-crud-localstorage).

That is it. 

Happy coding!

---
Peer Review Contributions by: [Geoffrey Mungai](/engineering-education/authors/geoffrey-mungai/)
