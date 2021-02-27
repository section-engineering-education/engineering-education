---
layout: engineering-education
url: /engineering-education/vue2-crud-app-with-localstorage/
title: Vuejs 2 CRUD App With LocalStorage
description: This article is a tutorial on how to build a crud app with vuejs version 2 and store the app data in localStorage.
author: espira-marvin
date: 2021-02-16T00:00:00-09:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/vue2-crud-app-with-localstorage/hero.jpg
    alt: vuejs 2 crud app with localstorage
---

### Introduction

Vue.js is a progressive, versatile front-end JavaScript framework. It is highly adoptable due to its simplicity, and small bundle size.

Local storage is a Web Storage API in modern browsers that allows us to store data as key-value pairs of strings on the user's browser. With this we can work with data without communicating with a back-end application, enhancing data persistence. Unlike traditionally, cookies were used which stored a maximum of 4kb of data on the client. They were sent to the server when HTTP requests were made and they could be modified by the server.

### Table of Contents

- Create a Vue.js Project with Vue CLI
- Install Vue.js dev tools 
- Create Books, BookItem, AddBookItem components
- working with data with local storage

### Prerequisites

1. Node.js 6.x or newer
2. Npm 5.10 or newer
3. Vue/CLI
4. Some knowledge of JavaScript, CSS, HTML

### Create project with Vue CLI
To create a Vue.js project first check if Vue CLI is globally installed in your computer. Using the terminal run:
```bash
 $ vue –version 
```
If it is not installed, run the following command to install it.
```bash
 $ npm install -g @vue/cli 
```
Go to your workspace folder and run the command below to create a Vue.js app.
```bash
$ vue create books-app
```
Using the arrow keys select:
```bash
❯ Default ([Vue 2] babel, eslint) 
```
Then hit enter. After creating, navigate to the created folder `books-app` and serve it by running the commands:
```bash
$ cd books-app
$ npm run serve
```
Then open the URL http://localhost:8080 in your browser to view the app.

### Installing Vuejs DevTools
This is a browser extension for debugging Vue.js apps. It inspects components, props, routing, vuex, and more. Open your browser of choice, and install Vue.js DevTools extension for [Mozilla](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) or [Chrome]( https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en). To open the browser's DevTools press `SHIFT + CTRL + J` on Windows/Linux or `Command + Option + j` on macOS.

### Creating Books component
This app will be a list of books to read, open a code editor of your choice, the component displayed on our browser is the `HelloWorld` component located in the `src/components` folder.

We will delete it and its references in the `App.vue` including the image logo. Now create a `Books.vue` file in the `components` folder. Add the code below to this file.
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
Always note that in Vue 2 component template should only contain one root element. Otherwise, it will throw an error. We can then import the `Books` Component into the root component. The `App.vue` component should now look as shown below. The data function returns an empty array of books, books that we'll add later to populate the array.
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
`v-bind` is a Vue directive that is used to attach data to a Vue component. This will help us bind the data passed to the `Books` component. Make changes as shown below.
```vue
<!-- ... -->
<Books v-bind:books="books"/>
<!-- ... -->
```
`props` are used to pass data from parent to child component, in this case `App.vue` is the parent component while `Books.vue` is the child. To make use of props, edit the `<script>` of the child component to look as shown below.
```vue
<script>
    export default {
        name: "Books",
        props: ["books"]
    }
</script>
```
### Creating the `BookItem` Component
In the components folder create a file `BookItem.vue`. This component will represent a single book. The code for the `BookItem.vue` should look like shown below.
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
Now, import `BookItem` into the `Books` component as a child and declare it in the components object. Here we will loop through the data and display the `BookItems` to the user using a Vue directive `v-for`. The code should now look as shown below.
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
Notice the `v-bind:key`. This is important as it gives Vue a hint so that it can track each node’s identity. The `v-bind:book` binds data to a Vue component. To display a book(s) edit `BookItem.vue` to look as shown below.
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
```vue
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
### Creating `AddBookItem` component
You can now delete the test JSON data above. Under the `components` folder, create a file name `AddBook.vue`. Import it into `App.vue` and declare it in components object inside the script as below.
```vue
import Books from "./components/Books";
import AddBookItem from "./components/AddBookItem";
   export default {
     name: 'App',
     components: {
       Books,
       AddBookItem
     }
```
Let the `AddBookItem` be above the `Book` component in the template. You’ll see a form to add books. Now, add the following code to the `AddBookItem.vue`.
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
This code has a form that you can use to add a book, it has a method `addBook()`. It alsp has a vue-directive `v-model` which creates a 2-way binding between user-input and vuejs component. Any changes to an input value changes the bound data and vice versa. In this case the `title`.

Each book needs a unique id. We will use javascript's `Math.random()` method to generate unique ids.

The `$emit()` method emits an event `add-book-event` used to pass data based on the user’s action from a child to a parent component. When the user adds a book and submits it, this event is emitted to the parent.

For the parent (`App.vue`) to listen to this event from the child (`AddBookItem.vue`), we create a method `addBook` and assign it to the emitted event. Make changes to the `App.vue` to look like this.
```vue
<template>
  <div id="app">
    <AddBookItem  v-on:add-book-event="addBook" />
    <Books v-bind:books="books"/>
  </div>
</template>
```
Just after `data()`, add a method `addBook()` using the code below.
```vue
methods: {
  addBookItem(newBook){
    this.books = [...this.books, newBook]
  }
}
```
The method adds a new book to the books array, we are using the [spread operator](https://www.geeksforgeeks.org/javascript-spread-operator/), this adds the new book to the end of the array, without creating a new array.

### Save the data
Using Vuejs inbuilt method [watch()](https://vuejs.org/v2/api/#watch), the method automatically watches for change in the books array and saves data to local storage. The `watch` method has a property called `deep` that is set to true to inform the Vue instance to always watch for changes in the books array.

`watch` is used when working with data outside your component like the browser API or fetching data. Add the following code to `<script>` in `App.vue`.
```vue
watch: {
  books: {
    handler() {
      localStorage.setItem('books',JSON.stringify(this.books))
    },
    deep: true
  }
}
```
localStorage uses the `setItem()` method to save data as key-value pairs, the data must be a string so we convert the JSON into a string in order to save it using [JSON.stringify()](https://www.geeksforgeeks.org/javascript-json-stringify-method/) method.

### Load data from local storage
We need to display the saved data, from the local storage to the user. We will use a lifecycle hook called [mounted()](https://vuejs.org/v2/api/#mounted) that’s executed after Vue instance has been created.
In the cycle hook, we use the method `localStorage.getItem('key')` to retrieve data from localStorage. The same key we used to store is the same we’ll use to retrieve the data. Add the code below just after the `watch` method.
```vue
mounted() {
  if (localStorage.getItem("books")){
    this.books = JSON.parse(localStorage.getItem("books"))
  }
}
```
The `JSON.parse()` method converts a string to a javascript object since data is only stored as a string in local storage. The data is then set to the books array which is displayed to the user. You’ll now be able to see a list of books after adding.
### Deleting data 
Update the `BookItem.vue` file with the following code
```vue
<div class="float-left">
    <span class="float-right">
        {{book.title}}
        <i class="glyphicon glyphicon-trash" @click="$emit('del-book-item', book.id)">delete</i>
    </span>
</div>
```
I added a bootstrap CSS CDN link in the `index.html` file, you can style yours to look much better.
```html
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```
When you click delete button, an event is emitted to pass book id to the parent(`Books.vue`). `$emit` is the way Vue passes data from child to parent component. In `Books.vue` update `<BookItem/>` as shown below.
```vue
<BookItem v-bind:book="book" v-on:del-book-item="delBookMethod" />
```
Assign the event from the child to a method called `delBookMethod`. Add it to methods object and emit an event to its parent (`App.vue`) passing the book id with it.
```vue
methods: {
    delBookMethod(id){
        //send to parent
        this.$emit('del-book-event', id);
    },
 }
```
In the parent component(`App.vue`), let’s make some changes.
```vue
<Books v-bind:books="books" v-on:del-book-event="deleteBookItem" />
```
The child event was captured and assigned to a method `deleteBookItem`, this method will help us delete the book item that was clicked on. Remember the ID we passed from BookItem.vue to Books.vue up to the App.vue  component? 

It will be used to delete the book. Using JavaScript `filter()` method to create the books array excluding the book with the passed id. We will use es6 arrow function as below, this returns all the books except the one with the ID passed.
```vue
  deleteBookItem(id){
     this.books = this.books.filter(book => book.id !== id);
}
```

#### Editing data
Just like we did while deleting data, make changes to the BookItem.vue to add an edit button, the code should look like this
```vue
<template>
    <div class="float-left">
        <span class="float-right">
            {{book.title}}
            <i class="glyphicon glyphicon-pencil" @click="$emit('edit-book-item', book.id)">edit</i>
            <i class="glyphicon glyphicon-trash" @click="$emit('del-book-item', book.id)">delete</i>
        </span>
    </div>
</template>
```
An event called ```edit-book-item``` is emitted and passed with it the book id to its parent(`Books.vue`). In the Books.vue listen to the event and assign it to a method called ```editBookMethod``` just like below
```vue
    <BookItem  v-bind:book="book"  v-on:del-book-item="delBookMethod" v-on:edit-todo-item="editBookMethod" />
```
Using the method send an event to its parent(`App.vue`) and along with it pass the book id.

```vue
editBookMethod(id){
    //send to parent (App.vue)
    this.$emit('edit-book-event', id)
}
```

In the parent make changes to capture the event `edit-book-event` from Books component, and assign it to a method `editBookItem`. In the data create a new object called editBook which will hold the data being edited. The object should have a title and an ID both should be empty strings.
```vue
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

Now in the method ```editBookItem``` we need to find the index of the object’s id, we do this using JavaScript `findIndex()` method. We go through the books array to find the book object matching the ID passed from the child component and assign it to a variable `objIndex`, this variable helps us access the title of the book from the books array and assign it to the title in the editBook object together with its ID. 
As below;
```vue
editBookItem(id){
  //find the index of the book's id
  var objIndex = this.books.findIndex(obj=> obj.id === id);
  this.editBook.title = this.books[objIndex].title;
  this.editBook.id = id;
},
```

We still cannot edit a book, we capture the earlier event `edit-book-event` in the AddBookItem component and assign it to a method `editBookItemEvent`, we then bind the `editBook` property to the component with v-bind directive and pass it as a prop to the child (`AddBookItem`). As illustrated below;
```vue
<AddBookItem v-model="editBook.title" v-on:add-book-event="addBookItem"  v-bind:editBook="editBook"/>
```

Let’s open AddBookItem.vue. We receive the editBook data object from parent as props. Then add ID as an empty string and edit as false in the data function.
```vue
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

We will use this edit property to decide whether to edit or add a new book, we first check if the user is not editing we save the data else we edit the data. If we’re editing, we emit an `edit-book-event` and pass the variable that holds the edited data `bookItem` along with the event to the parent, and clear the input field. 
>The addBookItem method should be updated as below.
 ```vue
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

By now you can click on the edit button and the input field will be populated with the book title. 
The Watch method comes in handy again, to help us watch for any changes in the editBook data, we set `deep:true` property to let the Vue instance continuously watch for changes, so while editing a book, the edit property will always be true. 

It also watches the title property and if it’s empty it sets the edit property to false, here we don’t need the deep property.
```vue
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

Go back to the App.vue file, after editing a title an event ```edit-book-event``` is sent to App.vue file we assign the event to a method in order to save the changes to localStorage. Update the code
```vue
<AddBookItem v-model="editBook.title" v-on:add-book-event="addBookItem"  v-bind:editBook="editBook" v-on:edit-book-event="editBookItemEvent" />
```

Now we create a method `editBookItemEvent` to handle saving of data. In the method we find the index of the ID’s object, this index will be used to reassign the title of the book being edited. If you’ve reached this far you’re now capable of editing a book title. As below
```vue
editTodoItemEvent(todoItem){
    //find index of this id's object
    var objIndex = this.todo_items.findIndex(obj => obj.id === todoItem.id);
    //update the item
    this.todo_items[objIndex].title = todoItem.title;
}
```

This is how the App.vue should look like
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


Conclusion

We've just finished creating a CRUD vue2 application with local storage. You can improve the user interface of your application using materialize components or other UI design materials. Vue is quite a work of art if you ask me. It is much cleaner with great awesome features under the scene. In case you get stuck, here is the link to the code in my [Github repo](https://github.com/EspiraMarvin/vue2-crud-localstorage). 
