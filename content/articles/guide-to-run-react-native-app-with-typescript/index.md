---
layout: engineering-education
status: publish
published: true
url: /guide-to-run-react-native-app-with-typescript/
title: How to Run React Native Apps with Typescript 
description: This tutorial will guide the reader on how to set up and run React Native apps with TypeScript.
author: joseph-chege
date: 2022-02-02T00:00:00-06:00
topics: [Languages]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/guide-to-run-react-native-app-with-typescript/hero.jpg
    alt: A Guide to Run your React Native Apps with Typescript Hero Image
---
React Native runs on JavaScript by default. However, it is possible to set up a React Native app to run entirely on TypeScript. 
<!--more-->
This tutorial will introduce the reader to running React Native apps with TypeScript. We will discuss the advantages of running React Native apps with TypeScript, as well as how to set it up. 

In the end, we will create a simple blog application that uses TypeScript.

### Table of contents
- [Prerequisites](#prerequisites)
- [Initializing your first React Native project with TypeScript](#initializing-your-first-react-native-project-with-typescript)
- [Setting up a TypeScript blog app using React Native](#set-up-a-typescript-blog-app-using-react-native)
- [Creating application components](#creating-application-components)
- [Adding posts](#adding-posts)
- [Fetching posts](#fetching-posts)
- [Fetching a single post](#fetching-a-single-post)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial, you'll need the following:

- Some knowledge of TypeScript, React.js, and React Native
- [Expo Go](https://expo.dev/client) and [Node.js](https://nodejs.org/en/) installed.

### Initializing your first React Native project with TypeScript
To get the project running, use the [Expo CLI](https://docs.expo.dev/workflow/expo-cli/), a command-line tool that supports a variety of use-cases.

The first step is to download and install *Expo CLI*. Go ahead and run the following command:

```bash
npm install --global expo-cli
```

The `--global` flag installs `Expo` globally so that any project across your operating system can access it.

You can check if `Expo CLI` was successfully installed by running the below command in your terminal:

```bash
expo whoami
```

If `Expo CLI` was correctly installed, the installed version will be logged on to your terminal.

To create our React Native project using TypeScript, navigate to the directory where you want your project to live and run the following command:

```bash
expo init -t expo-template-blank-typescript react-native-blog-app
```

Our application will be bootstrapped with a blank TypeScript application template. You can now navigate to the project folder, as shown below:

```bash
cd react-native-blog-app
```

Let's install the following packages to improve the navigation between different React Native screens:

```bash
npm install @react-navigation/native @react-navigation/native-stack
```

Install the peer dependencies of the above packages using `Expo`:

```bash
expo install react-native-screens react-native-safe-area-context
```

Then run your project by using the commands below:

```bash
npm run android # for android
npm run ios # for ios
```

Scan the QR code logged on your terminal using the `Expo Go` application on your device. The application will automatically load.

![default-landing-screen](/engineering-education/guide-to-run-react-native-app-with-typescript/default-landing-screen.jpg)

### Setting up a TypeScript blog app using React Native
Now that a basic TypeScript React Native app is set, let's extend this and create a handly application. 

In this guide, we will create a blog app using TypeScript and React Native.

### Creating application components
Create a directory inside the project folder and name it `components`. Inside the `components` directory, create two files:

- `Posts.tsx`: For rendering multiple posts.
- `Post.tsx`: For rendering a single post.

Add the following code to your `Posts.tsx`:

```ts
import {Text,View} from "react-native";

export default function Posts(){
    return(
        <View>
            <Text>Posts content will be here</Text>
        </View>
    )
}
```

Add the following code to your `Post.tsx`:

```ts
import {Text,View} from "react-native";

export default function Post(){
    return(
        <View>
            <Text>Post content will be here</Text>
        </View>
    )
}
```

In your `App.tsx`, import the navigation packages as follows:

```ts
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
```

Next, import the two screens:

```ts
import Posts from './components/Posts';
import Post from './components/Post';
```

Create the stack navigator:

```ts
const Stack = createNativeStackNavigator();
```

We need to return a view containing the screens to be displayed:

```ts
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Posts" component={Posts} options={{
                    title: 'Posts',
                }} />
                <Stack.Screen name="Post" component={Post} options={{
                    title: 'Post',
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
```

The screens are inside the `NavigationContainer` and the `Stack.Navigator`. When we navigate from one screen to the other, the app will use the name of that particular screen.

Your application should now change the text displayed since the app is calling the `Posts` component.

![skeleton-posts-screen](/engineering-education/guide-to-run-react-native-app-with-typescript/skeleton-posts-screen.jpg)

### Adding posts
This article will use static posts stored in the application. Create a `lib` directory inside the project folder. Inside `lib`, create a `posts.ts` file to host the posts. Edit `posts.ts` as follows:

```ts
export default [
    {
        id: 1,
        title: 'Dummy title for the first post.',
        excerpt: "Dummy excerpt for the first post.",
        content: "Dummy content here for the first post."
    },
    {
        id: 2,
        title: 'Dummy title for the second post.',
        excerpt: 'Dummy excerpt for second post.',
        content: 'Dummy content here for the second post.'
    },
    {
        id: 3,
        title: 'Dummy title for the third post',
        excerpt: 'Dummy excerpt for third post.',
        content: 'Dummy content here for the third post.'
    },
    {
        id: 4,
        title: 'Dummy title for the fourth post',
        excerpt: 'Dummy excerpt for the fourth post',
        content: 'Dummy content here for the fourth post.'
    },
    {
        id: 5,
        title: 'Dummy title for the fifth post',
        excerpt: 'Dummy excerpt for the fifth post',
        content: 'Dummy content here for the fifth post.'
    }
]
```

In this case, we're exporting a list of posts. Each post contains the following data:

- `id`: A unique integer value.
- `title`: The post's title.
- `excerpt`: Small description of the title.
- `content`: Dummy article content.

### Fetching posts
To fetch posts, navigate to your `components/Posts.tsx` file. First;

Import  `StyleSheet` and the dummy posts:

```ts
import {StyleSheet,Button} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import posts from '../lib/posts';
```

Then define a post's structure:

```ts
interface Post {
    id: number;
    title: string;
    excerpt: string;
    content: string;
}
```

Define the structure of the props:

```ts
interface Props{
    navigation:NavigationProp<any>;
}
```

Map the posts to the view:

```ts
const Posts:React.FC<Props> = ({navigation}) => {
    return(
        <View>
            {
                posts.map((post:Post)=>{
                    return (
                        <View key={post.id} style={styles.postCard}> 
                            <Text style={styles.postTitle}>{post.title}</Text>
                            <Text style={styles.postExcerpt}>{post.excerpt}</Text>
                            <Button title="Read more" onPress={()=>navigation.navigate('Post',{post:item})} />
                        </View>
                    )
            })}
        </View>
    )
}

export default Posts;
```

Each post has `title`, `excerpt`, and a `read more` button handled by its `onPress` listener. Append the CSS styles as follows:

```ts
const styles = StyleSheet.create({
    postCard:{
        width:'100%',
        padding:10,
    },
    postTitle:{
        fontSize:18,
        fontWeight:'bold',
    },
    postExcerpt:{
        fontSize:15,
        color:'#666',
    }
});
```

In `App.tsx`, edit the styles and remove the center alignment:

```ts
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
});
```

Your posts should now be shown on your screen:

![posts-screen](/engineering-education/guide-to-run-react-native-app-with-typescript/posts-screen.jpg)

### Fetching a single post
To fetch a single post, navigate to the `components/Post.tsx` file and import `navigation` and `view` utilities:

```ts
import {Text,View} from "react-native";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
```

Implement the Interface for a `PostItem`:

```ts
interface PostItem {
    id:number;
    title:string;
    excerpt:string;
    content:string;
}
```

Define the type of post:

```ts
type Post =  {
    PostDetails:PostItem
}
```

Define the `route` prop structure:

```ts
type Props  ={
    route: NativeStackScreenProps<Post,'PostDetails'>
}
```

Obtain the post item from the route and display it on the view:

```ts
const Post: React.FC<Props> = ({ route }) => {
    const post: PostItem = route.params.post;
    return (
        <View>
            <Text>{post.title}</Text>
            <Text>{post.excerpt}</Text>
            <Text>{post.content}</Text>
        </View>
    )
}
export default Post;
```

When you click on a post, you will be redirected to a specific page showing the post's content:

![post-screen-example](/engineering-education/guide-to-run-react-native-app-with-typescript/post-screen-example.jpg)

### Conclusion
This tutorial introduced you to TypeScript and React Native. We created an app that uses React Native to run the Typescript code. 

You can find the code used in this article on this [GitHub repository](https://github.com/kimkimani/React-native-typescript-blog-app).

I hope you found this helpful. Happy coding!

### Further reading
- [A Friendly Beginner's Guide to TypeScript](/engineering-education/a-friendly-beginner-guide-to-typescript/)
- [Why Static Typing & Why is TypeScript so popular?](/engineering-education/typescript-static-typing/)
- [JavaScript vs. TypeScript](/engineering-education/javascript-vs-typescript/)
- [Getting Started with Firebase 9 with React Native](/engineering-education/firebase-nine-and-above-with-react-native/)
- [Getting Started with React-Query for Data Fetching and State Management](/engineering-education/react-query-data-fetching-and-server-state-management/)
- [Creating a React App using Vite](/engineering-education/creating-a-react-app-using-vite/)
- [Native vs Hybrid Applications](/engineering-education/choose-native-vs-hybrid/)

---
Peer Review Contributions by: [Jethro Magaji](/engineering-education/authors/jethro-magaji/)