---
layout: engineering-education
status: publish
published: true
url: /firebase-nine-and-above-with-react-native/
title: Getting Started with Firebase 9 with React Native
description: This tutorial will teach the reader how to get started with Firebase 9 with React Native, we will create a simple todo application to demostrate how to use Firebase 9.
author: julius-gikonyo
date: 2021-12-06T00:00:00-12:10
topics: [API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/firebase-nine-and-above-with-react-native/hero.jpg
    alt: Getting Started with Firebase 9 with React Native Hero Image
---
Recently, Firebase introduced Firebase version 9 of their library. This has created some differences with how we use Firebase from the previous versions. One of the significant changes in version 9 of Firebase is adopting a more modular and functional approach. 
<!--more-->
This means that we only import the Firebase functions that we need from the libraries. Previous versions used an object-oriented approach, where we call those functions and methods directly on Firebase objects. With Firebase 9, you only import the functions you need for your specific application. Thus, allowing you to remove any unused codes within your application.

### Goal
In this guide will use Firebase 9 with React native and implement the new features to a React native application. First, we will build a todos application using React Native and Firebase 9.

### Prerequisites
It is essential to have the following tools to follow this tutorial.
- [Node.js](https://nodejs.org/en/) installed on your computer.
- Basic knowledge of React Native.
- Basic understanding of the Firebase ecosystem.
- An already set up account on [Firebase](https://firebase.google.com/).

### Creating and configuring a firebase project
Ensure that you have logged in on [Firebase](https://firebase.google.com/). Head over to [Firebase console](https://console.firebase.google.com/) and add a new Firebase project, name it `React Native Todo App`.

![add-a-new-project](/engineering-education/firebase-nine-and-above-with-react-native/add-a-new-project.png)

Once the project is set and ready, click Continue. You will be redirected to the console of that newly created project. React Native is cross-platform. It supports both iOS and Android. Depending on the device you are building on, click on its icon to add Firebase to the application.

Register the application package name or the Apple bundle ID on the resulting section to build for Ios. Then click the Register app.

![application-registration](/engineering-education/firebase-nine-and-above-with-react-native/application-registration.png)

Then Download the `google-services.json` configuration file provided for the created application. Click Next to add the Firebase SDK. We are going to install it using NPM. 

You can now head over to the project console. We will be using the Firebase Firestore database. Create a cloud Firestore database and select start in test mode.

![cloud-firestore](/engineering-education/firebase-nine-and-above-with-react-native/cloud-firestore.png)

Select your location from the available locations and click on **Enable**. Give it some time to finish the provisioning, and then the database will be ready.

At this point, our project is created and configured. In the next step, we will set up the react native project.

### Setting up the React Native app
While setting up a React Native app, we will use [Expo CLI](https://docs.expo.dev/workflow/expo-cli/), which offers the easiest way to get started using React Native.

Install the Expo CLI tool if you have it installed on your computer:

```bash
npm i -g expo-cli
```

Run the following command to ensure we safely installed the Expo CLI. The version of the installed Expo CLI will be logged in your console.

```bash
expo-CLI --version
```

To create a React Native app using Expo CLI, navigate to your desired project folder and run the following command:

```bash
expo-cli init react-native-firebase-app
```

Choose a blank template and press enter. Give it some time to complete the setup.

After the installation is done, navigate to the project folder:

```bash
cd react-native-firebase-app
```

Install the Firebase SDK from NPM.

```bash
npm i firebase
```

Install the vector icons from Expo.

```bash
expo-cli install @expo/vector-icons
```

The application is now set up for the next step.

### Configuring Firebase in the application
Create an `src` directory in your project folder, and then inside `src` create a `firebase` directory. Inside the `firebase` directory, create a `config.js` file. 

In this `config.js` file:

- Start by importing Firebase and Firestore.

```js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
```

- Create a `firebaseConfig` as follows:

```js
const firebaseConfig = {
    projectId: 'your_project_id',
    appId: 'your_app_id',
}
```

Edit the credentials above based on the credentials saved in the `google-services.json` configuration file you downloaded earlier.

- Initialize the application if it is not initialized.

```js
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
```

- Export `firebase`.

```js
export {firebase}
```

With that, Firebase is configured within our application. In the next step, we will implement adding todos.

### Working with todos
In the `src` folder, create a `components` folder. Then, inside the `components` folder, create two files:

- `Todos.js` to add the todos view and communicating with Firebase SDK.

- `styles.js` to add styles to the todos.

In the `Todos.js` file:

- Start by importing the following packages:

```js
import React,{useState,useEffect} from 'react'
import { Text, View,TextInput,TouchableOpacity,FlatList ,Keyboard} from 'react-native';
import { firebase } from "../firebase/config";
import { FontAwesome } from "@expo/vector-icons";
import styles from './styles';
```

- Create the component function:

```js
export default function Todos() {

    const [todo, setTodo] = useState(''); // todo
    const [todos, setTodos] = useState([]); // todos
    const todoRef = firebase.firestore().collection('todos'); // todos collection reference

    // fetch the saved todos realtime
    useEffect(() => {

        todoRef
            // order by time of creating
            .orderBy('createdAt', 'desc')
            // fetch todos in realtime
            .onSnapshot(
                querySnapshot => {
                    const newTodos = []
                    // loop through the saved todos
                    querySnapshot.forEach(doc => {
                        const todo = doc.data()
                        todo.id = doc.id
                        newTodos.push(todo)
                    });
                    // set the todos to the state
                    setTodos(newTodos)
                },
                error => {
                    // log any error
                    console.error(error);
                }
            )
    }, []);

    // add a todo
    const addTodo = () => {
        // check if we have a todo.
        if (todo && todo.length > 0) {
            // get the timestamp
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            // structure the data  to save
            const data = {
                text: todo,
                createdAt: timestamp
            };
            // add the data to firestore db
            todoRef
                .add(data)
                .then(() => {
                    // release todo state
                    setTodo('');
                    // release keyboard
                    Keyboard.dismiss();
                })
                .catch((error) => {
                    // show an alert in case of error
                    alert(error);
                })
        }
    }

    // delete a todo
    const deleteTodo = (todo) => {
        // delete todo from firestore db
        todoRef
            .doc(todo.id)
            .delete()
            .then(() => {
                // show a successful alert
                alert("Deleted successfully");
            })
            .catch(error => {
                // show an error alert
                alert(error);
            })
    }

    // render a todo
    const renderTodo = ({ item }) => {
        return (
            <View style={styles.todoContainer} >

                <Text style={styles.todoText}>
                    {item.text[0].toUpperCase() + item.text.slice(1)}
                </Text>

                <View style={styles.textIcons}>

                    <FontAwesome name="trash-o" color="red" onPress={() => deleteTodo(item)} style={styles.todoIcon} />

                </View>

            </View>
        )
    }

    // View
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new todo'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setTodo(text)}
                    value={todo}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TouchableOpacity style={styles.button} onPress={addTodo}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
            {todos.length > 0 && (
                <View style={styles.listContainer}>
                    <FlatList
                        data={todos}
                        renderItem={renderTodo}
                        keyExtractor={(todo) => todo.id}
                        removeClippedSubviews={true}
                    />
                </View>
            )}
        </View>
    )
}
```

In the code block above, we are:
- Initializing state for todo and todos.
- Setting a reference to our todos collection from `firestore`.
- Fetching the saved todos in real-time by using the `querySnapshot` function.
- Handling the functionality of adding a todo.
- Handling the functionality of deleting a todo.
- Showing a single todo from a render function.
- Displaying a form for adding a todo and showing the fetched todos.

Finally add the following styles to the `styles.js` file.

```css
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop:20
    },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingLeft: 16,
        flex: 1,
        marginRight: 5
    },
    button: {
        height: 47,
        borderRadius: 5,
        backgroundColor: '#788eec',
        width: 80,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    todoContainer: {
        marginTop: 16,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 16,
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        width:"100%"
    },
    todoText: {
        fontSize: 16,
        color: '#333333'
    },
    todoIcons:{
        display:'flex',
        flexDirection:"row"
    },
    todoIcon:{
        marginTop:5,
        fontSize:20,
        marginLeft:14,
    },
})
```

Edit the `App.js` file on the root of the project folder as follows.

```js
import React from 'react';
import Todos from "./src/components/Todos";

export default function App() {

  return (
    <Todos />
  );
}
```

We are replacing the boiler-plate code to return the `Todos` component.

### Testing
At this point, our application is ready for testing. Ensure you have a connected device, i.e., an actual device or an emulator. Then, run the following command from the terminal in the current project folder location:

```bash
npm run android # for android
npm run ios # for ios
```

Since we are using Expo, the application will be built and launched from the Expo Go application.

For the home screen when you first land in, you should have a similar screen:

![homepage](/engineering-education/firebase-nine-and-above-with-react-native/home-page.jpg)

Add some todos, and your screen should look similar to:

![home-page-with-todos](/engineering-education/firebase-nine-and-above-with-react-native/home-page-with-todos.jpg)

Once you delete a todo, you should receive an alert, and the list of todos is updated:

![home-page-todos-delete](/engineering-education/firebase-nine-and-above-with-react-native/home-page-todos-delete.jpg)

To view the data from the collection, go to your project's console, click on the `Firestore database`. You should be able to view your collection and data from there.

### Conclusion
This article covered building a simple todos application using React Native and Firebase version 9. Refer to the following resources for further information on the technology discussed in this article.

- [React Native docs](https://reactnative.dev/docs/getting-started)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)
- [Working with Styled-components in React](/engineering-education/working-with-styled-components-in-react/)
- [Google OAuth using Firebase in React Native](/engineering-education/react-native-firebase-google-authentication/)
- [Email/Password Authentication using Firebase in React Native](/engineering-education/react-native-firebase-email-password-authentication/)

Happy coding!

---

Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
