React Native runs of JavaScript by default. However, to leverage the advantages that Typescript (a superset of JavaScript) offers, it is possible to set up your whole React Native apps to run wholes on Typescript. This guide aims to thoroughly introduce you to running React Native apps with Typescript. We will learn the advantages of running React Native apps with Typescript and how to set them up with React Native. In the end, we will create a very handy blog application that uses Typescript to run the React Native application.

### Requirements
To follow along with this tutorial, you'll need the following:

- Beginner knowledge working with React.js for the web or React Native.
- Beginner knowledge working with TypeScript.
- [Expo Go](https://expo.dev/client) installed on your mobile device.
- [Node.js](https://nodejs.org/en/) installed on  your computer.

### Overview
- [Requirements](#requirements)
- [Overview](#overview)
- [Setting up the project](#setting-up-the-project)
- [Creating application components](#creating-application-components)
- [Adding posts](#adding-posts)
- [Fetching posts](#fetching-posts)
- [Conclusion](#conclusion)

### Setting up the project
To set up the project, we will use [Expo CLI](https://docs.expo.dev/workflow/expo-cli/), a command-line tool whose various use-cases involves setting up a React Native project.

The first step is to install `Expo CLI`. You can check if you have `Expo CLI` installed by running the following command from your terminal:

```bash
expo whoami
```

If you have it installed, the installed version will be logged on to your terminal. If you don't have it installed, run the following command:

```bash
npm install --global expo-cli
```

`--global` so as it can be used all across your operating system.

Navigate to a location you intend your project to reside and run the following command to bootstrap our React Native project with TypeScript:

```bash
expo init -t expo-template-blank-typescript react-native-blog-app
```

Our application will be bootstrapped from a blank typescript application template from the above command. After the process is done:

- Navigate to the project folder:

```bash
cd react-native-blog-app
```

- Run your project by using:

```bash
npm run android # for android
npm run ios # for ios
```

Scan the QR code logged on your terminal using the `Expo Go` application on your device. The application will automatically load from there:

![default-landing-screen](/engineering-education/guide-to-run-react-native-app-with-typescript/default-landing-screen.jpg)

### Creating application components
Create a directory inside the project directory and name it `components`. Inside the `components` directory, create two files:

- `Posts.tsx`: For rendering multiple posts.
- `Post.tsx`: For rendering a single post.

Edit `Posts.tsx` with dummy text:

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

Edit `Post.tsx` with dummy text:

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

In `App.tsx`, import the `Posts` component:

```ts
import Posts from './components/Posts';
```

Call the `Posts` component:

```ts
export default function App() {
  return (
    <View style={styles.container}>
      <Posts />
      <StatusBar style="auto" />
    </View>
  );
}
```

Your application should now change the text displayed since we are now calling a component:

![skeleton-posts-screen](/engineering-education/guide-to-run-react-native-app-with-typescript/skeleton-posts-screen.jpg)

### Adding posts
In this article, we will use static posts sourced inside the application. Create a `lib` directory inside the project folder. Inside `lib`, create a `posts.ts` file to host the posts. Edit `posts.ts` as follows:

```ts
export default [
    {
        id: 1,
        title: 'First Post',
        excerpt: 'This is the first post',
        content: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee.'
    },
    {
        id: 2,
        title: 'Second Post',
        excerpt: 'This is the second post',
        content: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee.'
    },
    {
        id: 3,
        title: 'Third Post',
        excerpt: 'This is the third post',
        content: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee.'
    },
    {
        id: 4,
        title: 'Fourth Post',
        excerpt: 'This is the fourth post',
        content: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee.'
    },
    {
        id: 5,
        title: 'Fifth Post',
        excerpt: 'This is the fifth post',
        content: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee.'
    }
]
```

From above, we are exporting an array of posts. Each post has the following data:

- `id`: A unique integer value.
- `title`: The posts title.
- `excerpt`: Small description of the title.
- `content`: Dummy article content.

### Fetching posts

To implement the functionality of fetching the posts, we will work on `components/Posts.tsx`.

- Import  `StyleSheet` and the dummy posts:

```ts
import {StyleSheet} from 'react-native';
import posts from '../lib/posts';
```

- Define a post's structure:

```ts
interface Post {
    id: number;
    title: string;
    excerpt: string;
    content: string;
}
```

- Map the posts to the view:

```ts
export default function Posts(){
    return(
        <View>
            {
                posts.map((post:Post)=>{
                    return (
                        <View key={post.id} style={styles.postCard}> 
                            <Text style={styles.postTitle}>{post.title}</Text>
                            <Text style={styles.postExcerpt}>{post.excerpt}</Text>
                        </View>
                    )
            })}
        </View>
    )
}
```

- Append the styles:

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

In `App.tsx`, edit the styles as follows, removing the centre alignment:

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

### Conclusion
This guide walked you through a reflective introduction to Typescript and React Native. For better understanding, we have created a whole application that uses React Native to run the Typescript code.

I hope you found this helpful. Happy coding!