React Native runs of JavaScript by default. However, to leverage Typescript's advantages (a superset of JavaScript) offers, it is possible to set up your whole React Native apps to run entirely on Typescript. This guide aims to briefly introduce you to running React Native apps with Typescript. We will learn the advantages of running React Native apps with Typescript and how to set them up with React Native. In the end, we will create a very handy blog application that uses Typescript to run the React Native application.

### Requirements
To follow along with this tutorial, you'll need the following:

- Beginner knowledge working with React.js for the web or React Native.
- Beginner knowledge working with TypeScript.
- [Expo Go](https://expo.dev/client) installed on your mobile device.
- [Node.js](https://nodejs.org/en/) installed on  your computer.

### Overview
- [Requirements](#requirements)
- [Overview](#overview)
- [Initializing your first React Native project with Typescript](#initializing-your-first-react-native-project-with-typescript)
- [Set up a Typescript Blog app using React Native](#set-up-a-typescript-blog-app-using-react-native)
- [Creating application components](#creating-application-components)
- [Adding posts](#adding-posts)
- [Fetching posts](#fetching-posts)
  - [Fetching a single post](#fetching-a-single-post)
- [Conclusion](#conclusion)

### Initializing your first React Native project with Typescript
To set up the project, we will use [Expo CLI](https://docs.expo.dev/workflow/expo-cli/), a command-line tool whose various use-cases involve setting up a React Native project.

The first step is to install `Expo CLI`. You can check if you have `Expo CLI` installed by running the following command from your terminal:

```bash
expo whoami
```

If you have it installed, the installed version will be logged on to your terminal. If you don't have it installed, run the following command:

```bash
npm install --global expo-cli
```

The `--global` flag install Expo globally so that it can be accessed by any project across your operating system.

To bootstrap our React Native project using TypeScript, navigate to the directory where you want your project to live and run the following command.

```bash
expo init -t expo-template-blank-typescript react-native-blog-app
```

Our application will be bootstrapped from a blank typescript application template. After this process is done, navigate to the project folder:

```bash
cd react-native-blog-app
```

To enhance navigation between the various screens, we will install the following packages:

```bash
npm install @react-navigation/native @react-navigation/native-stack
```

Install the peer dependencies of the above packages using `Expo` as shown below:

```bash
expo install react-native-screens react-native-safe-area-context
```

Then run your project by using:

```bash
npm run android # for android
npm run ios # for ios
```

Scan the QR code logged on your terminal using the `Expo Go` application on your device. The application will automatically load from there.

![default-landing-screen](/engineering-education/guide-to-run-react-native-app-with-typescript/default-landing-screen.jpg)

### Set up a Typescript Blog app using React Native
Now that we have a basic Typescript React Native app set, we can extend this and create a handly application. This guide will create a blog app that will show you how to run your apps with both Typescript and React Native.

### Creating application components
Create a directory inside the project folder and name it `components`. Inside the `components` directory, create two files:

- `Posts.tsx`: For rendering multiple posts.
- `Post.tsx`: For rendering a single post.

Add the following dummy text to your `Posts.tsx`.

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

Add the following dummy text to your `Post.tsx`.

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

In your `App.tsx`, import the navigation packages:

```ts
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
```

Import the two different screens:

```ts
import Posts from './components/Posts';
import Post from './components/Post';
```

Create the stack navigator:

```ts
const Stack = createNativeStackNavigator();
```

  Return a view with the screens we need to show:

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

The screens are inside the `NavigationContainer` and the `Stack.Navigator`, so while navigating from one screen to the other, we will be using the name of that particular screen.

Your application should now change the text displayed since we are now calling the `Posts` component.

![skeleton-posts-screen](/engineering-education/guide-to-run-react-native-app-with-typescript/skeleton-posts-screen.jpg)

### Adding posts
In this article, we will use static posts stored inside the application. Create a `lib` directory inside the project folder. Inside `lib`, create a `posts.ts` file to host the posts. Edit `posts.ts` as follows:

```ts
export default [
    {
        id: 1,
        title: 'Dummy title for first post.',
        excerpt: "Dummy excerpt for first post.",
        content: "Dummy content here for the first post."
    },
    {
        id: 2,
        title: 'Dummy title for second post.',
        excerpt: 'Dummy excerpt for second post.',
        content: 'Dummy content here for the second post.'
    },
    {
        id: 3,
        title: 'Dummy title for third post',
        excerpt: 'Dummy excerpt for third post.',
        content: 'Dummy content here for the third post.'
    },
    {
        id: 4,
        title: 'Dummy title for fourth post',
        excerpt: 'Dummy excerpt for fourth post',
        content: 'Dummy content here for the fourth post.'
    },
    {
        id: 5,
        title: 'Dummy title for fifth post',
        excerpt: 'Dummy excerpt for fifth post',
        content: 'Dummy content here for the fifth post.'
    }
]
```

Here we are exporting an array of posts. Each post has the following data:

- `id`: A unique integer value.
- `title`: The post's title.
- `excerpt`: Small description of the title.
- `content`: Dummy article content.

### Fetching posts
To implement the functionality of fetching the posts, we will work on `components/Posts.tsx`. First;

- Import  `StyleSheet` and the dummy posts:

```ts
import {StyleSheet,Button} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
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

- Define the structure of the props:

```ts
interface Props{
    navigation:NavigationProp<any>;
}
```

- Map the posts to the view:

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

For each and every post, we are showing it's `title`, `excerpt`, and a button to read more, handled by it's `onPress` listener.

- Append the CSS styles:

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

In `App.tsx`, edit the styles as follows, removing the center alignment:

```ts
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
});
```

Your posts should now be shown on your screen.

![posts-screen](/engineering-education/guide-to-run-react-native-app-with-typescript/posts-screen.jpg)

#### Fetching a single post
To fetch a single post, navigate to the `components/Post.tsx` file and import navigation and view utilities:

```ts
import {Text,View} from "react-native";
import {NativeStackScreenProps} from '@react-navigation/native-stack';
```

- Implement the Interface for a `PostItem`:

```ts
interface PostItem {
    id:number;
    title:string;
    excerpt:string;
    content:string;
}
```

- Define the type of a post:

```ts
type Post =  {
    PostDetails:PostItem
}
```

- Define the `route` prop structure:

```ts
type Props  ={
    route: NativeStackScreenProps<Post,'PostDetails'>
}
```

- Obtain the post item from the route and display it on the view:

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

When you click on a post, you will be redirected to the specific page of the page as shown below:

![post-screen-example](/engineering-education/guide-to-run-react-native-app-with-typescript/post-screen-example.jpg)

### Conclusion
This guide walked you through a reflective introduction to Typescript and React Native. For better understanding, we have created a whole application that uses React Native to run the Typescript code.

I hope you found this helpful. Happy coding!