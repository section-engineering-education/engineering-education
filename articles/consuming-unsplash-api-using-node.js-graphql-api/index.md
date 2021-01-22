Unsplash is a photography sharing application. It has millions of users who post photos related to different topics every day. It is estimated to have more than two million photos. With the need to bring their services closer to developers, Unsplash released their developer API. With over six billion requests per month, it provides an infrastructure for developers to build an experience for their users using services provided by Unsplash. In this article, we will walk through the steps of creating an Unsplash developer account and implement various functionalities of the API on a Graphql API.

#### prerequisites.
- Have [Node.js](https://nodejs.org/en/) installed on your computer.
- Working knowledge of JavaScript.
- Working knowledge of implementing a GraphQl API in Node.js

### What we will cover
- [Creating an Unsplash developer account](#creating-an-unsplash-developer-account)
- [Setting up the development server](#setting-up-the-development-server)
- [Fetching photos](#fetching-photos)
- [Fetching a single photo](#fetching-a-single-photo)
- [Searching for photos based on topic](#searching-for-photos-based-on-topic)
- [Fetching user details](#fetching-user-details)
- [Fetching user photos](#fetching-user-photos)
- [Important take aways](#important-take-aways)

### Creating an Unsplash developer account.
If you already have an Unsplash developer account, ensure that you are logged in from the [Unsplash developer site](https://unsplash.com/developers). Else follow the following steps:
- Proceed to the [Unsplash developer site](https://unsplash.com/developers).
- On the top right, click [Register as a developer](https://unsplash.com/join).
- Fill in the fields and click `Join`.
- After submitting the form, confirm your email address.
- Proceed to the newly created [developer dashboard](https://unsplash.com/oauth/applications).
- At the applications section, click [New Application](https://unsplash.com/oauth/applications/new). 
- Read through the guidelines as you check them and then click Accept terms.
- In the modal that tops up, enter any name of the application and describe it in any way.
- The application will be created, and you can see it in the [applications section](https://unsplash.com/oauth/applications).
- For now, it is okay as `Demo`, later when you are pushing to production, be sure to change to `Production`.
- With that, you are ready for the next step.

### Setting up the development server.
To follow along, clone this [repo](https://github.com/mwangiKibui/unsplash_api_graph_ql_server.git). In the repo, there is the start and the final folder. The start folder is where we will be implementing the functionality throughout this article. The final folder is already implemented and you are free to check it out in case you encounter any errors. On your cloned folder, navigate to the start folder and run the following command to install the necessary dependencies.
```bash
npm install
```

To be able to understand the functionalities following, I recommend going through the schema folder to get to know the different types and how data is structured.

### Fetching photos.
Before proceeding, head over to your [Unsplash developer account](https://unsplash.com/oauth/applications), select the application you created, scroll down to the keys section, and copy your `Access Key` to the `.env` file.

On the resolvers folder, open the `image.js` file and add the functionality of fetching photos:

```javascript

//listPhotos function

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

From above:
- Query for photos from the  API passing in the page, and the number of photos per page.
- Check for any error encountered while querying. If there is, throw it.
- Map through each record sent, structuring it to match schema's expected output.

To test the above functionality, follow the following steps:
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
            created_at
            description
            link
            id
        }
        user {
            name
            username
            profile_image
        }
    }
}
/** Note that: 
 * You are free to enter any value for the parameters:  page and perPage
 * You are free to query more or different fields as long as they are supported by the schema.
/**
```
- Hit the play button and observe the results.

### Fetching a single photo.
In the same `image.js`, we add up the functionality of fetching a single photo:

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

From above:
- Query for the photo from the API based on the id.
- Check for any error resulting from the query. If there is, throw it.
- Structure data to match the schema's expected output.

To test the above functionality:
- Ensure that your development server is running.
- Open another tab on the Graphql playground and enter the following query:

```javascript
query GetImage {
    fetchImage(photoId:"any_id"){
        image{
            created_at
            description
            link
            id
        }
        user {
            name
            username
            profile_image
        }
    }
}
/**Note
 * Get any id of a photo from the prior query and set it as photoId's value
 * You are free to query more or different fields as long as they are supported by the schema
/**
```
- Hit the play button and observe the results.

### Searching for photos based on topic.
Based on a topic, we can be able to get relevant photos from Unsplash API.  Let's add the functionality on the `image.js` file:

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
- Search for photos from the API based on the key, which is the topic. We are also sending the page, the number of photos per page, and the orientation which can either be `portrait` or `landscape`.

To test the above functionality:
- Ensure that the development server is still running.
- Open another tab in the Graphql playground and enter the following:

```javascript
query SearchPhotos{
    searchPhotos(key:"enter_any_topic",page:1,perPage:3,orientation:"portrait"){

        image {
            created_at
            description
            link
            id
        }

        user {
            name
            username
            profile_image
        }

    }
}
/** Note
 * You must enter a topic for the key, ensure you use double quotes
 * You can change page, perPage value. For orientation you can only change to landscape.
 * You can query for more or different fields as long as they are supported by the schema
/**
```
- Hit the play button and observe the results.

### Fetching user details.
A user is the one who uploaded a certain photo to Unsplash. Based on that, we can get user details from the API.

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
- Check if there is any error as a result of the query.
- Structure the expected output as per the schema.
- Return the structured output.

To test the above functionality:
- Ensure that the development server is running.
- Open another tab in Graphql playground and enter the following:

```javascript
query GetUserDetails{
    getUserDetails(username:"enter_any_username"){
        name
        profile_image
        location
        bio
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

### Fetching user photos.
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

From above:
- Query for the photos of the user based on the username. We also pass along other data: page, number of photos per page, order to follow, and orientation which can be `portrait` or `landscape`.
- Check if there is any error as a result of the query, if there is, throw it.
- Map through the response structuring each record to match the schema's expected output.

To test the above functionality:
- Ensure that the development server is running.
- Open another tab on the Graphql playground and enter the following:

```javascript
query GetUserPhotos {
    getUserPhotos(username:"enter_any_username",page:1,perPage:3,orientation:"portrait"){

        image {
            created_at
            description
            url
            id
        }

        user {
            name
            profile_image
            username
            bio
            location
        }
    }
}
/** Note
 * You must enter the username value which can be any user's username from before queries.
 * You can change the page and perPage value. For orientation you can only change to landscape
 * You can query more or different fields as they are supported by the schema
**/
```
- Hit the play button and observe the results.

### Important take aways.
From the above implementation, you understand that some of the data we are receiving have to be structured to match our schema. This is because the API sends more data than is included and you have to select the data you need. I would therefore recommend going through the [Unsplash official docs](https://github.com/unsplash/unsplash-js) to expand your knowledge.
The API also supports more functionalities than the ones discussed above. You can find all these in the [docs](https://github.com/unsplash/unsplash-js).

### Conclusion.
A simple JSON API from Unsplash makes the difference summing up more than six billion requests every month. The ease of use of the API makes peace with every software developer interested in exploring it. It is by far the best API for exploring stock photography.

In this article, we covered the process of creating an Unsplash developer account and implemented various functionalities of Unsplash API on a Graphql API.