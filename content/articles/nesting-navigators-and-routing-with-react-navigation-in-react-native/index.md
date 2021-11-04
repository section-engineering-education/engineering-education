Changing between screens is a requirement in nearly all mobile applications. React Native's `react-navigation` library is stunning and simple to use for this purpose. It's a well-known library for React Native application routing and navigation. 

When you nest navigators, the screens of one navigator are rendered inside the screens of another. If there is a stack, switching to a different screen will cause a new screen to be displayed.

Navigators are in charge of making the switch between different screens. There are numerous navigation types supported by React Navigation, including Stack, Drawer, and Tab Navigators. In addition to navigating between screens, it can be used to transfer information between them.

Table of content:
- [First Step- Application development and module installation](#first-step--application-development-and-module-installation)
- [Second Step- Creating a HomeScreen and NewworkerScreen](#second-step--creating-a-homescreen-and-newworkerscreen)
- [Third Step - Navigating React Pages using StackNavigator](#third-step--navigating-react-pages-using-stacknavigator)
- [Fourth Step - Adding Buttons to HomeScreen and NewWorkerScreen](#fourth-step--adding-buttons-to-homescreen-and-newworkerscreen)

### Prerequisites
You'll require the following supplies to follow along with this tutorial:

1. An on-disk Node.js development environment. Make a Local Development Environment with Node.js and the [Installation Guide.](https://www.digitalocean.com/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment)  

2. An advantage for this project is familiarity with the iOS or Android simulators and setting up a new React Native environment in your development environment.

### Goals of the Tutorial
1. This post will teach you how to make a multi-screen React Native app.
2. React Navigation will teach you how to navigate from one screen to the next if you're working with the library.

There will be several steps that we will walk through to achieve our goal in this tutorial.

### First Step- Application development and module installation

1. The next step is to use the commands below to create a new project.

```bash
$ npx react-native init react-navigation-routing --version 0.63.2
```

2. After that, go to the newly created directory by using the following command here:

```bash
$ cd react-navigation-routing
```

3. Use the following command to install the necessary packages:

```bash
npm install –save react-navigation react-navigation-stack react-native-reanimated react-native-gesture-handler react-native-screens react-native-vector-icons
```

4. Open the iOS or Android application, depending on your device respectively using the following code:

```bash
$ npm run ios

$ npm run android
```

### Second Step- Creating a HomeScreen and NewWorkerScreen

It will be necessary for your app starting with the HomeScreen and another screen that we will name new wrokers screen. These two screen will be essential for us to navigate through. In this section we will be creating the two screens. In the HomeScreen.js you will have to create a new file, paste the App.js code and open:

```
nano HomeScreen.js
nano app.js
```

Instead of using App, let's use `HomeScreen.js` instead and change its content:

```js
import React from 'react';
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#006600", fontSize: 40 }}>Home Screen!</Text>
        <Text>You have some workers.</Text>
      </View>
    );
  }
}


export default HomeScreen;
```

Secondly, the NewWorkerScreen will be required for your app. Add the App.js code to a new file called NewWorkerScreen.js and open it:

```
nano NewWorkerScreen.js
```

Instead of using App, we will use HomeScreen instead in NewWorkerScreen.js.

```js
import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Text, View } from 'react-native';

class WorkersScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#006600", fontSize: 40 }}>NewWorkerScreen
        <Text>Add new workers here!</Text>
      </View>
    );
  }
}



export default NewWorkerScreen;
```

### Third Step - Navigating React Pages using StackNavigator

You'll utilize a StackNavigator to move between screens. In this regard, a StackNavigator is similar to a call stack in functionality. You'll notice that as you move through the screens, the one before it rises to the top of the stack of screens.
Now we need to open the `app.js` and then replace its content. The content that we'll replace with includes two screens that we created i.e the home and NewWorker screens. 

```js
import 'react-native-gesture-handler';
import React from "react";
import { StyleSheet, Text, View } from 'react-native';

import HomeScreen from "./HomeScreen";
import NewWorkerScreen from "./NewWorkerScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";


const Stack = createStackNavigator();

class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            name="NewWorker"
            component={NewWorkerScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
```

While revisiting our `App.js` we'll find that we added `NavigationContainer` and `createStackNavigator` to ease and allow navigation from one screen to another. We also added the two screens: `HomeScreen` and `NewWorkerScreen` between the **<Stack.Navigator>** that we will be navigating through and thus navigator is aware of your two screens.


### Fourth Step - Adding Buttons to HomeScreen and NewWWorkerScreen

Add buttons to switch between the two screens, if necessary. As long as the navigation object is included in the StackNavigator, many of its useful attributes will be transmitted down to your screen.

Add the following code in the HomeScreen.js to add a button and use the same way to another button in the NewWorkerScreen.js.

```js
<Button
  title="Add new workers"
  onPress={() =>
    this.props.navigation.navigate('NewWokerScreen')
  }
/>

```
Now, in NewWorkerScreen.js, build a button for YHomescreen:

```js
<Button
  title="Home"
  onPress={() => this.props.navigation.navigate('HomeScreen')}
/>
```
Now that's it, you can now navigate from one screen to another as well as add data.

### Conclusion

This tutorial has shown you how to build a multi-screen React Native app. You figured out how to navigate between screens using React Navigation. You created a mechanism for transferring data between screens using React Context.

Happy coding!
