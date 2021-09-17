---
layout: engineering-education
status: publish
published: true
url: /consuming-unsplash-api-using-node.js-graphql-api/
title: Consuming the Unsplash API using Node.js Graphql API
description: In this article, we will cover the process of creating an Unsplash developer account and implemented various functionalities provided by Unsplash API on a Node.js Graphql API.
author: kennedy-mwangi
date: 2021-02-08T00:00:00-21:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/consuming-unsplash-api-using-node.js-graphql-api/hero.jpg
    alt: extending classes example image
---
Unsplash is a photography sharing application. It has millions of users who post photos related to different topics every day. It is estimated the platform has over two million photos. With the need to bring their services closer to developers, Unsplash released their developer API.
<!--more-->
### Consuming Unsplash API using Node.js graphql API
With over six billion requests per month, it provides an infrastructure for developers to build an experience for their users using services provided by Unsplash. 

In this article, we will walk through the steps of creating an Unsplash developer account and implement various functionalities of the API on a Graphql API.

#### Prerequisites
To follow along in this article, it would be helpful to have the following:

- [Node.js](https://nodejs.org/en/) installed on your computer.

- Some basic knowledge of JavaScript.

- Some basic knowledge of implementing a GraphQl API in Node.js

### What we will cover
- [Creating an Unsplash developer account](#creating-an-unsplash-developer-account)

- [Setting up the development server](#setting-up-the-development-server)

- [Fetching photos](#fetching-photos)

- [Fetching a single photo](#fetching-a-single-photo)

- [Searching for photos based on topic](#searching-for-photos-based-on-topic)

- [Fetching user details](#fetching-user-details)

- [Fetching user photos](#fetching-user-photos)

- [Important take aways](#important-take-aways)

### Creating an Unsplash developer account
If you already have an Unsplash developer account, make sure that you are logged in from the [Unsplash developer site](https://unsplash.com/developers). 

If so follow the next steps:

- Proceed to the [Unsplash developer site](https://unsplash.com/developers).

- On the top right, click [Register as a developer](https://unsplash.com/join).

- Fill in the fields and click `Join`.

- After submitting the form, confirm your email address.

- Proceed to the newly created [developer dashboard](https://unsplash.com/oauth/applications).

- At the applications section, click [New Application](https://unsplash.com/oauth/applications/new). 

- Read through the guidelines as you check them and then click Accept terms.

- In the modal that tops up, enter any name of the application and describe it.

- The application will be created, and you can see it in the [applications section](https://unsplash.com/oauth/applications).

- For now, it is okay as `Demo`, later when you are pushing to production, be sure to change to `Production`.

- With that, you are ready for the next step.

### Setting up the development server
To follow along, clone this [GitHub repository](https://github.com/mwangiKibui/unsplash_api_graph_ql_server.git). In the repo, you will find the start and the final folder. 

The start folder is where we will be implementing the functionality throughout this article. The final folder is already implemented and you are free to check it out in case you encounter any errors. 

To get started, follow the following guidelines:

- Shift to the start folder:

```bash
cd ./start
```

- Install the necessary dependencies:

```bash
npm install
```

- Head over to your [Unsplash developer account](https://unsplash.com/oauth/applications), select the application you created, scroll down to the keys section, and copy the `Access Key` to the `.env` file.

- Go through the schema folder, to btter understand the different types and how the data is structured.

### Fetching photos
On the resolvers folder, open the `image.js` file and add the functionality of fetching photos:

```javascript

//get photos

async listPhotos(page,perPage){

    let result = await this.api.photos.list({
        page,
        perPage
    }).catch(console.log);

    //error checking
    if(result.errors) throw new Error(result.errors[0]);

    return result.response['results'].map((photo) => {

        let image = this.structureImage.bind(this,photo);

        let user = this.structureUser.bind(this,photo['user']);

        return {
            image,
            user
        };

    });

};
```

From the snippet above:
- Query for photos from the API passing in the page, and the number of photos per page.

- Check for any error encountered while querying. If there is, throw it.

- Map through each record sent, structuring it to match schema's expected output.

To test the above functionality, let's follow the next steps:
- In your terminal, in the start folder, start the development server by:

```bash
npm run dev
```

- Navigate to the Graphql playground through the link logged on the console.

- Open a new tab and input the following query:

```javascript
query GetPhotos {
    getPhotos(page:1,perPage:3){
        image {
            url
            id
            link
            created_at
        }
        user {
            name
            username
        }
    }
}
/** Note that: 
 * You are free to enter any value for the parameters:  page and perPage
 * You are free to query more or different fields as long as they are supported by the schema.
/**
```

- Hit the play button and observe the results.

- In case any of the fields return `null`, this means that Unsplash API does not have the data for that field.

### Fetching a single photo
In the same `/resolvers/image.js` file, we add up the functionality of fetching a single photo:

```javascript

//getting an image.
async getImage(photoId){

    let result = await this.api.photos.get({photoId})
    .catch(console.log);

    //error checking
    if(result.errors) throw new Error(result.errors[0]);

    let image = this.structureImage.bind(this,result['response']);

    let user = this.structureUser.bind(this,result['response']['user']);

    return {
        image,
        user
    };

}
```

From the above snippet:
- Query for the photo from the API based on the `photoId`.

- Check for any error resulting from the query. If there is, throw it.

- Structure data to match the schema's expected output.

To test the above functionality:
- Ensure that your development server is running.

- Open another tab on the Graphql playground and enter the following query:

```javascript
query GetImage {
    fetchImage(photoId:"any_id"){
        image{
            url
            id 
            link 
            created_at
        }
        user {
            name
            username
        }
    }
}
/**Note
 * Get any id of a photo from the prior query and use it as `photoId` value
 * You are free to query more or different fields as long as they are supported by the schema
/**
```

- Hit the play button and observe the results.

- In case any of the fields return `null`, it means that Unsplash API does not have the data for that field.

### Searching for photos based on the topic
Based on a topic, we are able to get relevant photos from Unsplash API.  

Let's add the functionality on the `image.js` file:

```javascript

//searching for photos.
async searchPhotos(key,page,perPage,orientation){

    let result = await this.api.search.getPhotos({
        query: key,
        page,
        perPage,
        orientation,
    })
    .catch(console.log);

    //error checking
    if(result.errors) throw new Error(result.errors[0]);

    return result['response']['results'].map((photo) => {

        let image = this.structureImage.bind(this,photo);

        let user = this.structureUser.bind(this,photo['user']);

        return {
            image,
            user
        }

    });
    
};
```

From above:
- Search for photos from the API based on the key, which is the topic. We are also sending the page, the number of photos per page, and the orientation which can be `portrait`, `squarish`, or `landscape`.

To test the above functionality:

- Ensure that the development server is still running.

- Open another tab in the Graphql playground and enter the following:

```javascript
query SearchPhotos{
    searchPhotos(key:"enter_any_topic",page:1,perPage:3,orientation:"portrait"){

        image {
            id
            url
            link 
            created_at
        }

        user {
            name
            username
        }

    }
}
/** Note
 * You must enter a topic for the key, ensure you use double quotes
 * You can change page, perPage value. For orientation, you can only change to landscape or squarish.
 * You can query for more or different fields as long as they are supported by the schema
/**
```

- Hit the play button and observe the results.

- In case any of the fields return `null`, it means that Unsplash API does not have the data for that field.

### Fetching user details
A user is the one who uploaded a photo to Unsplash. Based on that, we can get user details from the API.

On the resolvers folder, in `user.js`, we add up the functionality:

```javascript
//fetching user details
async getUserDetails(username){

    let result = await this.api.users.get({username})
    .catch(console.log);

    //error checking
    if(result.errors) throw new Error(result.errors[0]);

    let user = this.structureUser(result.response);
    
    return user;

};
```

From above:

- Query for a user based on the username.

- Check if there is an error as a result of the query.

- Structure the expected output as per the schema.

- Return the structured output.

To test the above functionality:

- Ensure that the development server is running.

- Open another tab in Graphql playground and enter the following:

```javascript
query GetUserDetails{
    getUserDetails(username:"enter_any_username"){
        name
        username
        total_photos
    }
}
/**
 * You must enter the username value which can be any user's username from prior queries.
 * You can query for more or different fields as long as they are supported by the schema
**/
```

- Hit the play button and observe the results.

- In case any of the fields return `null`, it means that Unsplash API does not have the data for that field.

### Fetching user photos
Apart from fetching the details, we can also fetch the photos uploaded by a particular user from the API.

In the same `user.js` file, we add up the functionality:

```javascript
    //fetching user photos.
    async getUserPhotos(username,page,perPage,orientation){

    let result = await this.api.users.getPhotos({
        username,
        page,
        perPage,
        orderBy:'latest',
        orientation
    })
    .catch(console.log);

    //error checking
    if(result.errors) throw new Error(result.errors[0]);

    return result.response.results.map((photo) => {

        let image = this.structureImage.bind(this,photo);
        let user = this.structureUser.bind(this,photo['user']);

        return {
            image,
            user
        };

    });

}
```

From the snippet above:

- Query for the photos of the user based on the username. We also passed along other data, such as: page, number of photos per page, order to follow which could be: `latest` or `oldest`, and orientation which could be: `portrait`, `squarish` or `landscape`.

- Check if there is an error as a result of the query, if there is, throw it.

- Map through the response structuring each record to match the schema's expected output.

To test the above functionality:

- Ensure that the development server is running.

- Open another tab on the Graphql playground and enter the following:

```javascript
query GetUserPhotos {
    getUserPhotos(username:"enter_any_username",page:1,perPage:3,orientation:"portrait"){

        image {
            id
            url
            link 
            created_at
        }

        user {
            name
            username
        }
    }
}
/** Note
 * You must enter the username value which can be any user's username from before queries.
 * You can change the page and perPage value. For orientation, you can only change to landscape or squarish
 * You can query more or different fields as they are supported by the schema
**/
```

- Hit the play button and observe the results.

- In case any of the fields return `null`, it means that Unsplash API does not have the data for that field.

### Important takeaways
- The Unsplash API sends a lot of data on a single query. Therefore, you need to have your own schema so that you can extract only the data that you need.

- [Unsplash official docs](https://github.com/unsplash/unsplash-js) support more functionalities than the ones discussed above.

### Conclusion
In this article, we covered the process of creating an Unsplash developer account and implemented various functionalities provided by Unsplash API on a Node.js Graphql API.

The ease of use of the API makes peace with every software developer interested in exploring it. It is by far the best API for exploring stock photography.

Happy coding!

---
Peer Review Contributions by: [Daniel Katungi](/engineering-education/authors/daniel-katungi/)
