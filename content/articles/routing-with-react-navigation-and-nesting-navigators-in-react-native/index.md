---
layout: engineering-education
status: publish
published: true
url: /routing-with-react-navigation-and-nesting-navigators-in-react-native/
title: Routing with React Navigation and Nesting Navigators in React Native
description: In this article we will learn about feed-forward neural network and recurrent neural network using Python.
author: vincent-kimanzi
date: 2022-07-13T00:00:00-12:10
topics: [Languages, Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/routing-with-react-navigation-and-nesting-navigators-in-react-native/hero.png
    alt: Feed-forward and Recurrent Neural Networks Python Implementation Hero Image
---
Changing between screens is a requirement in nearly all mobile applications. React Native's `react-navigation` library is stunning and simple to use. It is a well-known library for React Native application routing and navigation. 
<!--more-->
In this tutorial, we will add multiple screens to a basic React Native application. Using nested react navigators, we will design a method for navigating between displays. We will also use React Context to provide a way for screens to share data.

### Table of contents
- [Developing a simple React Native application](#developing-a-simple-react-native-application)
  - [First Step-Application development and module installation](#first-step-application-development-and-module-installation)
  - [Second Step-Creating screens](#second-step-creating-screens)
  - [Third Step-Navigating React screens using nested navigators](third-step-navigating-react-screens-using-nested-navigators)
  - [Fourth Step-Adding buttons](#fourth-step-adding-buttons)
  - [Fifth Step-Passing data to other screens using context](#fifth-step-passing-data-to-other-screens-using-context)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Prerequisites
The reader will require the following to follow along with this tutorial:
1. An on-disk Node.js development environment. Make a Local Development Environment with Node.js by following this [installation guide](https://www.digitalocean.com/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment).

2. Another advantage for this project is familiarity with the iOS or Android simulators and setting up a new [React Native environment](https://reactnative.dev/docs/environment-setup) in your development environment.

### Developing a simple React Native application 
When you nest navigators, the screens of one navigator are rendered inside the screens of another. If there is a stack, switching to a different screen will cause a new screen to be displayed.

Navigators are in charge of making the switch between different screens. Numerous navigation types are supported by react-navigation, including stack, drawer, and tab navigators. In addition to navigating between screens, we can transfer information between them.

There will be several steps that we will walk through to achieve our goal in this tutorial.

### First Step-Application development and module installation

1. Use the command below to create a new project.

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

4. Open the iOS or Android application, depending on your device, using the following code:

```bash
$ npm run ios

$ npm run android
```

### Second Step-Creating screens 
We will create two screens:
- Home screen 
- Workers screen: Will contain the names of the workers.

It will be necessary for your app to start with the `HomeScreen` and another screen that we will name `WorkersScreen`. These two screens will be essential for us to navigate through.

Since there is already a file named `App.js` created upon running the terminal commands, we will copy the file's content and modify it in a file called `HomeScreen.js` that we create.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>You have some workers.</Text>
      </View>
    );
  }
}

export default HomeScreen;
```

Output:
```bash
You have some workers.
```

Now, copy the `App.js` content to a new file called `WorkersScreen.js` and modify it. On this screen, you will be able to add new workers.

```js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class WorkersScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Add new workers here!</Text>
      </View>
    );
  }
}

export default WorkersScreen;
```

### Third Step-Navigating react screens using nested navigators
Nesting navigators are the same as standard nesting components in that it renders a navigator within a screen of another navigator. Nesting numerous navigators are frequently required to get the desired UI behaviour.

You'll utilize a StackNavigator inside a tab navigator to move between screens. In this regard, a StackNavigator is similar to a call stack in functionality. As you move through the screens, the one before it rises to the top of the stack of screens.

We need to open the `app.js` and then replace its content. The content that we'll replace it with includes the two screens that we created.

```js
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import HomeScreen from './HomeScreen';
import WorkersScreen from './WorkersScreen';

export const screenNames = {
  home: "HomeScreen",
  workers: "WorkersScreen",

};

const HomeScreen = createStackNavigator();

function HomeScreen() {
  return (
    <HomeScreen.Navigator
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName={screenNames.home}
    >
      <HomeScreen.Screen name={screenNames.home} component={Home} />
    </HomeScreen.Navigator>
  );
}

const WorkersScreen = createStackNavigator();

function WorkersScreen({ navigation, route }) {
  const tabHiddenRoutes = ["HomeScreen"];
  useEffect(() => {
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

  return (
    <WorkersScreen.Navigator
      headerMode="none"
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      initialRouteName={screenNames.home}
    >
      <WorkersScreen.Screen name={screenNames.home} component={home} />
      <WorkersScreen.Screen
        name={screenNames.HomeScreen}
        component={HomeScreen}
      />
    </WorkersScreen.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName={screenNames.HomeScreen}
      tabBarOptions={{
        activeTintColor: "#688E26",
        inactiveTintColor: "#6C6C6C",
      }}
    >
      <Tab.Screen
        name={screenNames.HomeScreen}
        component={HomeScreenScreen}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "ri-home-fill" : "ri-home-line"}
              size="24"
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screenNames.WorkersScreen}
        component={WorkersScreen}
        options={{
          abBarLabel: "",
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? "ri-information-fill" : "ri-information-line"}
              size="24"
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

```

In the code above:
- In our `App.js`, we'll find that we added `NavigationContainer`, `TabNavigator` and `StackNavigator` to ease and allow navigation from one screen to another. 
- We also added the two screens: `HomeScreen` and `WorkersScreen`. 
- The stack navigator is nested in the tab navigator.

### Fourth Step-Adding buttons 
We will add buttons to switch between the two screens, if necessary. Many of its useful attributes will be transmitted down to our screen as long as the navigation object is included in the stack navigator.

Add the following code in the `HomeScreen.js`. This will add a button to the home screen. Repeat it the same way to add another button in the `WorkersScreen.js.`

```js
<Button
  title="Add new workers"
  onPress={() =>
    this.props.navigation.navigate('WokersScreen')
  }
/>

```

Now, in `WorkersScreen.js`, add a button for the `Home Screen`:

```js
<Button
  title="Home"
  onPress={() => this.props.navigation.navigate('HomeScreen')}
/>
```

### Fifth Step-Passing data to other screens using context
Let's create an array of potential workers, for example, Jeff, Kim, and Cal, and an empty array of the already existing workers. In addition, we will implement a feature that allows users to add new workers to their existing list of workers.

Add the possible workers and current workers to the component’s state in the `WorkersScreen.js`: 

```js
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      possibleWorkers: [
        'Jeff',
        'Kim',
        'Cal',
      ],
      currentWorkers: [],
    }
  }
  
}
```

Let's now add a function to move a possible Workers into the list of current Workers:

```js
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      possibleWorkers: [
        'Jeff',
        'Kim',
        'Cal',
      ],
      currentWorkers: [],
    }
  }

  addWorker = (index) => {
    const {
      currentWorkers,
      possibleWorkers,
    } = this.state

    // Pull wokers out of possibleWorkers
    const addedwokers = possibleWorkers.splice(index, 1)

    // And put wokers in currentWorkers
    currentWorkers.push(addedwokers)

    // Finally, update the app state
    this.setState({
      currentWorkers,
      possibleWorkers,
    })
  }

}
```

#### Adding 'WorkersContext' to 'App'
To see our workers on `HomeScreen.js`, you'll need to add them to `WorkersScreen.js` first. 

We need to create a new `WorkersContext` file and export it.

```js
import React from 'react';

export const WorkersContext = React.createContext();
```

Add the `WorkersContext`:

```js
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { WorkersContext } from './WorkersContext';
import Home from './Home';
import Wokers from './Wokers';

```

`Context.Provider` components are used to encapsulate the `NavigationContainer` in a new context object so that any children in the component tree can subscribe to changes in the context of the application.

Consumers will only be able to access your data if you supply them with a value. Let us do that:

```js
class App extends React.Component {
 
  render() {
    return (
      <WorkersContext.Provider
        value={
          {
            currentWorkers: this.state.currentWorkers,
            possibleWorkers: this.state.possibleWorkers,
            addWorker: this.addWorker
          }
        }
      >
       <NavigationContainer>

       //...

      </WorkersContext.Provider>
    );
  }
}
```

`HomeScreen` and `WokersScreen` can now refer to `current workers` and `possible workers` in the event of any context changes.

#### Adding 'WorkersContext' to 'HomeScreen'
This step will set the application to display the current number of workers.

```js
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WorkersContext } from './WorkersContext';

class HomeScreen extends React.Component {
  //...
}
HomeScreen.contextType = WorkersContext;

//...
```

The `Class.contextType` allows access context in our screens. For instance, let’s make our `HomeScreen` display how many current workers we have:

```js
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WorkersContext } from './WorkersContext';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>You have { this.context.currentWorkers.length } wokers!</Text>

        <Button
          title="Add some wokers"
          onPress={() =>
            this.props.navigation.navigate('Workers')
          }
        />
      </View>
    );
  }
}
HomeScreen.contextType = WorkersContext;
//...
```
Output:
```bash
 You have 0 workers!.
```

#### Adding 'WorkersContext' to 'WokersScreen'
This step will set up the application to display the possible workers and provide buttons for adding them to the current workers.

```js
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { WorkersContext } from './WorkersContext';

class Workers extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Add wokers here!</Text>

        {
          this.context.possibleWorkers.map((worker, index) => (
            <Button
              key={ worker }
              title={ `Add ${ worker }` }
              onPress={() =>
                this.context.addWorker(index)
              }
            />
          ))
        }

        <Button
          title="Back to home"
          onPress={() =>
            this.props.navigation.navigate('Home')
          }
        />
      </View>
    );
  }
}
WorkersScreen.contextType = WorkersContext;
//...
```

### Conclusion
In this tutorial, we built a multi-screen React Native app. We figured out how to navigate between screens using React Navigation. We also created a mechanism for transferring data between screens using React Context.

Happy coding!

### References
- [Introduction to nested navigators](https://medium.com/@vkim20/an-introduction-to-nested-navigation-in-react-native-4695fda86974).
- [Nested React Native navigators](https://blog.logrocket.com/nested-react-native-navigators/).
- [How to navigate between different nested stacks in react ](https://stackoverflow.com/questions/49826920/how-to-navigate-between-different-nested-stacks-in-react-navigation).