![local storage with vuejs](/engineering-education/vue2-crud-app-with-localstorage/hero.jpg)


### Introduction

Vuejs is a progressive, approachable, and versatile front-end JavaScript framework that’s highly being adopted by developers due to its simplicity, short learning curve, and its little bundle size.

---
 
By now you should have already come across the acronym CRUD plenty of times, these are create, read, update, and delete functions required to implement persistent storage application.

---
Local storage is a Web Storage API in modern browsers that allows us to store data as key-value pairs of strings on the user’s browser. With this we can work with data without communicating with a back-end application, enhancing data persistence. Unlike traditionally, cookies were used which stored a maximum of 4kb of data on the client, they were sent to the server when HTTP requests were made and they could be modified by the server.

### Table of Contents

1. Create a Vuejs Project with Vue CLI
2. Install Vuejs dev tools 
3. Create Books, BookItem, AddBookItem components
4. working with data with local storage

### Prerequisites

1. Installed Node.js 6.x and above
2. Installed NPM 5.10 and above
3. Installed Vue/CLI
4. Basic understanding of JavaScript, CSS, HTML

### 1. Create Project with Vue CLI
To create a Vuejs project first check if vue/cli is globally installed in your computer, using the terminal run
``` Vue –version ```
, if it does not show a number version run the following command
```npm install –g @vue/cli ```
Otherwise, proceed. Go to your workspace folder, run the command to create a Vuejs app with the app name
```vue create books-app ```
Using the arrow keys select ````Default ([Vue 2 babel, eslint])````, this should be the 1st one and hit enter.
After installing, navigate into the books-app folder and run npm run serve, open the URL ```localhost:8080``` in your browser.

### 2. Installing Vuejs dev tools
This is an extension for debugging Vuejs apps, it inspects details such as components, props, routing, vuex, and more.
  Open your browser of choice, search vuejs dev tool extension for [Mozilla](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/) or [Chrome]( https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg?hl=en). 
  Install, check the Vue tab in browser’s dev tool. To open browser dev tool click ```SHIFT + CTRL + J``` on Windows/Linux or ```Command + Option + j``` on macOS

### 3. Create Books Component and BookItem Component
#### 3.1 Creating Books component
This app will show a list of books to read, open a code editor of your choice, the component displayed on our browser is the HelloWorld component located in the src/components folder. We will delete it and its references in the root component (App.vue) including the image logo in the root component. Now create a Books.vue file in the components folder, add the below code 
```
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
Always note in Vue2 component template should only contain one root element. Otherwise, it will throw an error.
We can then import the Books Component into the root component. The App.vue component should look like below. The data function returns an empty array of books, books that we'll add later will populate the array.
```
<template>
  <div id="app">
    <Books />
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

```v-bind``` is a Vue directive that is used to attach data to a Vue component. This will help us bind the data passed to the Books component. As illustrated below make changes to match below
```
<Books v-bind:books="books"/>
```
```Props``` are used to pass data from parent to child component, in this case App.vue is the parent component while Books.vue is the child. Add the below code to the child component to make use of props

```
<script>
    export default {
        name: "Books",
        props: ["books"]
    }
</script>
```

#### 3.2 Creating BookItem Component
In the components folder create a file BookItem.vue. This component will represent a single book.
The code for the BookItem.vue should look like below.
```
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
Now, import BookItem into the Books component as a child and declare it in the components object. Here we will loop through the data and display the BookItems to the user using a Vue directive ```v-for```. The code is below.
```
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
Notice the ```v-bind:key``` this is important as it gives Vue a hint so that it can track each node’s identity.
The ```v-bind:book``` above binds data to a Vue component.
To display a book(s) add the following code to BookItem.vue
```
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
You can add your own data in the books array in App.vue just like below to display data to the UI.
```
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
#### 3.3 Creating AddBookItem component
You can now delete the test JSON data above. Under the components folder, create a file name AddBook.vue. Import it into App.vue and declare it in components object. Just like we have done earlier on the Books.vue (child) and App.vue (parent) components. Let the AddBookItem be just above the Book component in the template. You’ll see a form to add books.
Now, add the following code to the AddBookItem.vue file
```
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
This code has a form that you can use to add a book, it has a method addBook, and a vue-directive v-model which creates a 2-way binding between user-input and vuejs component, any changes to an input value the bound data will be changed and vice versa. In this case the title.

---

Each book needs a unique id, we will use javascript Math.random function to generate unique ids.

---

The emit method emits an event referred to as ```add-book-event ``` this is used to pass data based on the user’s action from a child to a parent component, when the user adds a book and submits this event is emitted to the parent. 
For the parent (App.vue) to listen to this event from the child (AddBookItem.vue), we create a method ```addBook``` and assign it to the event emitted. Make changes to the App.vue to this.

```
<template>
  <div id="app">
    <AddBookItem  v-on:add-book-event="addBook" />
    <Books v-bind:books="books"/>
  </div>
</template>
```
Just after data add the method addBook, the code is below
```
methods: {
  addBookItem(newBook){
    this.books = [...this.books, newBook]
  }
}
```
The method adds a new book to the books array, we are using the [spread operator](https://www.geeksforgeeks.org/javascript-spread-operator/), and this adds the new book to the end of the array, without creating a new array.
### 4. Working with data with local storage
#### 4.1 Save the data
Using vuejs inbuilt method [Watch](https://vuejs.org/v2/api/#watch), we need to add it in App.vue, it automatically watches for change in the books array and saves data to local storage. The watch method has a property called deep that is set to true to inform the Vue instance to always watch for changes in the books array. Watch is used when working with data outside your component like the browser API or fetching data.
Add the following code.
```
watch: {
  books: {
    handler() {
      localStorage.setItem('books',JSON.stringify(this.books))
    },
    deep: true
  }
}
```
localStorage uses the setItem method to save data as key-value pair, the data must be a string so we convert the JSON into a string in order to save it using [JSON.stringify](https://www.geeksforgeeks.org/javascript-json-stringify-method/#:~:text=The%20JSON.,the%20form%20of%20the%20strings.) method.
4.2 Load data from local storage
We need to display the saved data from local storage to the user, we use a lifecycle hook called [mounted](https://vuejs.org/v2/api/#mounted) that’s executed after Vue instance has been created.
In the cycle hook, we use the method ```localStorage.getItem(‘key’)``` to retrieve data from localStorage. The same key we used to store is the same we’ll use to retrieve the data.
Add the code below just after the watch method.
```
mounted() {
  if (localStorage.getItem("books")){
    this.books = JSON.parse(localStorage.getItem("books"))
  }
}
```
The JSON.parse method converts a string to a javascript object since we can only store data as a string in localStorage. The data is then set to the books array which is displayed to the user. You’ll now be able to see a list of books after adding.
#### 4.2 Deleting data 
Update the BookItem.vue file with the following code
```
<div class="float-left">
    <span class="float-right">
        {{book.title}}
        <i class="glyphicon glyphicon-trash" @click="$emit('del-book-item', book.id)">delete</i>
    </span>
</div>
```
I added a bootstrap CSS CDN link in the index.html file, you can style yours to look much better.
When you click delete, an event is emitted to pass book id to the parent (Books.vue).
In the Books.vue file update code to this below
```
<BookItem  v-bind:book="book"  v-on:del-book-item="delBookMethod"  />
```
Assign the event from the child to a method called ```delBookMethod```.
Add the method and send an event to its parent (App.vue) passing the book id with it.

```vue
methods: {
    delBookMethod(id){
        //send to parent
        this.$emit('del-book-event', id);
    },
 }
```

In the parent component, let’s make some changes.
<Books v-bind:books="books" v-on:del-book-event="deleteBookItem" />
 The child event was captured and assigned to a method ```deleteBookItem```, this method will help us delete the book item that was clicked on. Remember the ID we passed from BookItem to Books up to the App component will be used to delete the book. Using JavaScript filter method to create the books array excluding the book with the passed id. We will use es6 arrow function as below, this returns all the books except the one with the ID passed.
 ```vue
  deleteBookItem(id){
     this.books = this.books.filter(book => book.id !== id);
}
```

#### 4.3 Edit data
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

 An event called ```edit-book-item``` is emitted and passed with it the book id to its parent (Books.vue) Remember to style your app to look much better. In the Books.vue listen to the event and assign it to a method called ```editBookMethod``` just like below
<BookItem  v-bind:book="book"  v-on:del-book-item="delBookMethod" v-on:edit-todo-item="editBookMethod" />
Using the method send an event to its parent (App.vue) and along with it pass the book id.

```vue
editBookMethod(id){
    //send to parent (App.vue)
    this.$emit('edit-book-event', id)
}

```

In the parent make changes to capture the event edit-book-event from Books component, and assign it to a method ```editBookItem```. In the data create a new object called editBook which will hold the data being edited. The object should have a title and an ID both should be empty strings.
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

Now in the method ```editBookItem``` we need to find the index of the object’s id, we do this using JavaScript ```findIndex``` method. We go through the books array to find the book object matching the ID passed from the child component and assign it to a variable objIndex, this variable helps us access the title of the book from the books array and assign it to the title in the editBook object together with its ID. As below
```vue

editBookItem(id){
  //find the index of the book's id
  var objIndex = this.books.findIndex(obj=> obj.id === id);
  console.log('objIndex',objIndex)
  this.editBook.title = this.books[objIndex].title;
  this.editBook.id = id;
},
```

We still cannot edit a book, we capture the earlier event ```edit-book-event``` in the AddBookItem component and assign it to a method ```editBookItemEvent```, we then bind the ```editBook``` property to the component with v-bind directive and pass it as a prop to the child (AddBookItem). As illustrated below;
```vue
<AddBookItem v-model="editBook.title" v-on:add-book-event="addBookItem"  v-bind:editBook="editBook”/>
```

Let’s open AddBookItem.vue. We receive the editBook data object from parent as props. Then add ID as empty string and edit as false in the data function.
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

 We will use this edit property to decide whether to edit or add a new book, we first check if the user is not editing we save the data else we edit the data. If we’re editing, we emit an ```edit-book-event``` and pass the variable that holds the edited data ‘bookItem’ along with the event to the parent, and clear the input field. The addBookItem method should be updated
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
The Watch method comes in handy again, to help us watch for any changes in the editBook data, we set ```deep:true``` property to let the Vue instance continuously watch changes, so while editing the edit property will always be true, it also watches the title property and if it’s empty it sets the edit property to false, here we don’t need the deep property.
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

Now we create a method ```editBookItemEvent``` to handle saving of data. In the method we find the index of the ID’s object, this index will be used to reassign the title of the book being edited. If you’ve reached this far you’re now capable of editing a book title. As below
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

We just finished creating a CRUD vue2 application with local storage. You can improve the user interface of your application using materialize components or other UI design materials. Vue is quite a work of art if you ask me. It is much cleaner with great awesome features under the scene. In case you get stuck, here is the link to the code in my [Github repo](https://github.com/EspiraMarvin/vue2-crud-localstorage). 
