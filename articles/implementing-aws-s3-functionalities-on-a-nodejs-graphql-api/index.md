### Implementing AWS S3 functionalities on a Node.js GraphQL API

AWS is a subsidiary of amazon offering cloud computing services. The services revolve around storage, application, and infrastructure. S3 is the storage service provided by AWS. Node.js SDK from AWS enables one to access functionalities offered by the platform from a Node.js application. GraphQL on the other hand is a server-side runtime for executing queries based on a type system defined on the data providing a query language.

### Goals

In this article we will:

- Implement basic s3 functionalities using Node.js AWS SDK.

### Prerequisites

To follow along in this article, it is helpful to have the following:

- [Node.js](https://nodejs.org/en/) installed on your computer.

- [Altair GraphQl Client](https://altair.sirmuel.design/) installed on your computer.

- An AWS account. If you don't have one, follow this [article](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

- Basic knowledge of JavaScript.

- Basic knowledge of implementing GraphQL API using [apollo server](https://www.apollographql.com/docs/apollo-server/).

### Overview

- [Obtaining your security credentials](#obtaining-your-security-credentials)

- [Setting up the development server](#setting-up-the-development-server)

- [Creating an s3 bucket](#creating-an-s3-bucket)

- [Fetching created s3 buckets](#fetching-created-s3-buckets)

- [Uploading a single object to s3 bucket](#uploading-a-single-object-to-s3-bucket)

- [Uploading multiple objects to s3 bucket](#uploading-multiple-objects-to-s3-bucket)

- [Fetching uploaded objects from s3 bucket](#fetching-uploaded-objects-from-s3-bucket)

- [Deleting a single object from s3 bucket](#deleting-a-single-object-from-s3-bucket)

- [Deleting multiple objects from s3 bucket](#deleting-multiple-objects-from-s3-bucket)

- [Deleting a s3 bucket](#deleting-a-s3-bucket)

### Obtaining your security credentials.

To obtain your security credentials, follow the following steps:

- Head over to [AWS console](https://aws.amazon.com/console/).

- On the top right corner, click `Sign in to the console`.

- Enter your email address and click `Next`.

- Enter your password and click `Sign in`.

- In the redirected page, search for s3 in the search bar and click the first result.

- You will be redirected to your s3 account page.

- On the top right, there is your username and a dropdown arrow. Click here and then click `My security credentials`.

- On the new page, click on `Access keys (access key ID and secret access key)`.

- If you already have an `Access Key ID` and a `Secret access key` feel free to use them. But if you don't have one, click the `Create New Access Key` button.

- Download the `Key File`.

- From the current URL, you pick your region. For example, considering this URL: `https://console.aws.amazon.com/iam/home?region=us-east-2#/security_credentials`, the region is set to us-east-2.

- In the `Key File` you downloaded, add the following:

```javascript
region=//the region from the URL. e.g us-east-2
```

- After setting the region, you are good for the next step.

### Setting up the development server

To set up the development server, clone this [Github repository](https://github.com/mwangiKibui/aws-sdk-node.js-s3-graphql). In the repository, in the `src` directory, there is the start and final folder. Throughout the article, we will be working on the start folder. In case you encounter an error or you want to compare your code, feel free to check the final folder.

From the `Key File` you downloaded copy the data to the `.env` file appropriately. Ensure you match the names so that there is no conflict.

In the cloned folder, run the following command to install the necessary dependencies:

```bash
npm install
```

Proceed to the start folder and go through the schema files to understand how we are structuring the data. Our focus throughout the article will be on the resolvers folder. It is therefore helpful to have a grasp of the underlying schema.

### Creating an s3 bucket

An s3 bucket is the foundational storage instance in s3. It consists of folders and objects. The objects are the files. Data in the bucket is stored as either a folder or an object.

To create a bucket, we implement the following functionality in the `resolvers/mutation-resolvers.js` under `createBucket()` function:

```javascript
//create a bucket.
async createBucket(bucketName){

    const params = {
        Bucket:bucketName
    };

    let create_bucket = promisify(this.s3.createBucket.bind(this.s3));

    await create_bucket(params).catch(console.log);

    return {
        success:true,
        message:"Bucket created successfully."
    };

};
```

From the above implementation:

- Create params object with the key `Bucket` to hold the sent `bucketName`.

- Promisify the `createBucket()` function from s3 so that we can use *async/await* syntax.

- Call the `createBucket()` function passing along the params object.

- Send back a response matching the schema.

To test this:

- Start your development server by running the following command from your terminal:

```bash
npm run dev
```

- Open your Altair GraphQl Client.

- In the URL section, enter the URL logged in the console.

- In the workspace paste the following mutation:

```javascript
mutation CreateBucket {
  createBucket(bucketName:"simple-image-upload-bucket"){
    message
    success
  }
}
```

- Feel free to change the value of `bucketName`.

- Hit the play button and examine the results.

- Having created a bucket, we will fetch the created buckets to verify the bucket was created.

### Fetching created s3 buckets

In the `resolvers/query-resolvers.js`, we add up the functionality of fetching created buckets under `fetchBuckets()` function:

```javascript
//fetching buckets.
async fetchBuckets(){

    const listBuckets = promisify(this.s3.listBuckets.bind(this.s3));

    let result = await listBuckets().catch(console.log);

    result = result.Buckets.map(result => result.Name);

    return result;

};
```

From above:

- Promisify `listBuckets()` function from s3 so that we can use the  *async/await* syntax.

- Fetch the buckets from s3.

- Map through the result to correspond with the schema.

To test this:

- Ensure that the development is still running.

- Head over to Altair GraphQl Client, open a different tab, and paste the following query in the workspace:

```javascript
query FetchBuckets{
  fetchBuckets
}
```

- Hit the play button. The newly created bucket should be present.

### Uploading a single object to s3 bucket

After confirming that the bucket was created successfully, it's time we upload some objects to the bucket. The objects are the files. They can be images, videos, audio, texts, and so much more. In this article, we will focus on images. Feel free to choose any file you want.

In `resolvers/mutation-resolvers.js` under `uploadObject()` function, we add up the functionality of uploading a single object to s3 bucket:

```javascript
//upload object.
async uploadObject(file,bucketName){

    const params = {
        Bucket:bucketName,
        Key:'',
        Body:'',
        ACL:'public-read'
    };

    let {createReadStream,filename} = await file;

    let fileStream = createReadStream();


    fileStream.on("error", (error) => console.error(error));

    params.Body = fileStream;

    let timestamp = new Date().getTime();

    let file_extension = extname(filename);

    params.Key = `images/${timestamp}${file_extension}`;

    let upload = promisify(this.s3.upload.bind(this.s3));

    let result = await upload(params).catch(console.log);

    let object = {
        key:params.Key,
        url:result.Location
    };

    return object;

};
```

From above:

- Create params object comprising of the name of the bucket, key of the object, the body of the object, and the permission of the object.

- Destructure the `createReadStream` and `filename` from the file.

- Stream the contents of the file. Upon error, log the error.

- Set the streamed content as the body of the object.

- Set the key of the object using a specific timestamp and its file extension. The object will be stored in the images folder.

- Promisify the `upload()` function from s3 so that we can use the *async/await* syntax.

- Call the function sending the params object. We also get the result from the function.

- Structure a sample object to match the schema output.

To test this:

- Ensure that the development server is still running.

- Head over to Altair GraphQl Client, open a separate tab, and in the workspace paste the following mutation:

```javascript
mutation ObjectUpload($object:Upload!) {
  uploadObject(file:$object,bucketName:"simple-image-upload-bucket"){
    url
    key
  }
}
```

- The `$Object` is the dynamic object we are going to select from the computer, `Upload` is its type from GraphQl.

- To select the object, click `variables` down there. Then click `Add files`. In the field that pops up, change the name from `file` to `object`. Then click `select files` on the right to select any object from your computer. For consistency with the article, make sure you select an image.

- After having selected an object, hit the play button and examine the results.

- To confirm your object, after the response is sent back, copy the url sent back from the response and paste it in your browser. You should see your image.

### Uploading multiple objects to s3 bucket

In the same way, we upload a singular object to the s3 bucket, we can also upload multiple objects to the s3 bucket.

In the same file, under `uploadObjects()`, we add up the functionality of uploading multiple objects:

```javascript
//upload objects.
async uploadObjects(files,bucketName){

    let params = {
        Bucket:bucketName,
        Key:'',
        Body:'',
        ACL:'public-read'
    };

    let objects = [];

    for(let i = 0; i < files.length; i++){

        let file = files[i];

        let {createReadStream,filename} = await file;

        let stream = createReadStream();

        stream.on("error", (error) => console.error(error));

        params.Body = stream;

        let timestamp = new Date().getTime();

        let file_extension = extname(filename);

        params.Key = `images/${timestamp}${file_extension}`;

        let upload = promisify(this.s3.upload.bind(this.s3));

        let result = await upload(params).catch(console.log);

        objects.push({
            key:params.Key,
            url:result.Location
        });

    };

    return objects;

};
```

From above:

- Create params object with the bucket to upload to, the key of an object, body of an object, and the permission of reading the file.

- Initialize an array to hold the data to be sent back as the response.

- Loop through all of the uploaded objects. For each object, we read its content to set it as the body, get the timestamp and its file extension as its key in the images folder. Upload the file to the s3 bucket and then restructure the data returned as per the schema and push it to the previous initialized array.

- Return the array we have been pushing to as the output.

To test this:

- Ensure that the development server is still running.

- Head over to Altair GraphQl Client, open another tab and paste in the following mutation in the workspace:

```javascript
mutation ObjectsUpload($objects:[Upload!]!) {
  uploadObjects(files:$objects,bucketName:"simple-image-upload-bucket"){
    url
    key
  }
}
```

- The `$objects` represent the dynamic objects we are uploading from the computer. They shall be multiple hence the array with type `Upload`. The array should not be empty and none of the files should be `null`. We also pass in the name of the bucket to upload to. If you are using a different bucket name feel free to change.

- To select the files, click on `Variables` at the bottom left, click on `Add files`. In the field that pops up, toggle the button labeled `1` to represent `*` by simply clicking it. Change the name from `file` to `objects`. On the right, click `select files`. Using the `command` key of your computer, select multiple objects. Preferably, select images only. After selecting, you will see the number of files you have selected adjacent to the field.

- Hit the play button and examine the results.

- You can verify the objects by visiting each url sent back as response from your browser.

### Fetching uploaded objects from s3 bucket

After uploading your objects, you can be able to fetch those objects.

In `resolvers/query-resolvers.js` under `fetchObjects()` function, we implement the functionality of fetching uploaded objects:

```javascript
//fetching objects.
async fetchObjects(bucketName){

    const params = {
        Bucket:bucketName
    };

    let getObjects = promisify(this.s3.listObjects.bind(this.s3));

    let result = await getObjects(params).catch(console.log)

    let objects = [];

    result.Contents.forEach( content => {
        return objects.push({
            key:content.Key,
            url:getUrl.bind(this,bucketName,content.Key)
        })
    } );

    return objects;

};
```

From above:

- Create params object with a key of `Bucket` representing the bucket name from which we are fetching the uploaded objects.

- Promisify the `listObjects()` function from s3 so that we can use the *async/await* syntax.

- Fetch the objects.

- Loop through the result sent back structuring data to match the sample output as per the schema and then send back the result.

To test this:

- Ensure that the development server is running.

- Head over to Altair GraphQl Client, open a separate tab and paste the following query in the workspace:

```javascript
query FetchObjects {
  fetchObjects(bucketName:"simple-image-upload-bucket"){
    url
    key
  }
}
```

- If you are using a different bucket name feel free to change.

- Hit the play button and examine the results.

- Feel free to copy the URL of any object, paste it in the browser and view that object.

### Deleting a single object from s3 bucket

Once an object is not needed anymore, to free up space, you can always delete it from the bucket.

In `resolvers/mutation-resolvers.js` , under `deleteObject()` function, we implement the functionality of deleting a single object from s3 bucket:

```javascript
//delete object.
async deleteObject(bucketName,key){

    const params = {
        Bucket:bucketName,
        Key: key
    };

    let removeObject = promisify(this.s3.deleteObject.bind(this.s3));

    await removeObject(params).catch(console.log);

    return {
        success:true,
        message:"Object successfully deleted."
    };

};
```

From above:

- Create a params object, with keys of the bucket name and the specific key of the object.

- Promisify the `deleteObject()` function from s3 so that we can use the *async/await* syntax.

- Delete the object.

- Send back the response as per the schema.

To test this:

- Ensure that the development server is still running.

- Head over to Altair GraphQl Client, open a separate tab, and paste in the following mutation in the workspace:

```javascript
mutation DeleteObject {
  deleteObject(bucketName:"simple-image-upload-bucket",key:"enter key of the object"){
    success
    message
  }
}
```

- In the tab where we fetched the objects, copy any key from there and paste in the `key` parameter value.

- In case you are using a separate bucket name, make sure you change the name.

- Hit the play button and examine the results.

### Deleting multiple objects from s3 bucket

Deleting multiple objects that are relevant any more frees up space in the bucket.

In the same file, under `deleteObjects()` function, we implement the functionality of deleting multiple objects:

```javascript
//delete objects.
async deleteObjects(bucketName,objectKeys){

    const params = {
        Bucket:bucketName,
        Delete:{
            Objects:[]
        }
    };

    objectKeys.forEach((objectKey) => params.Delete.Objects.push({
        Key:objectKey
    }));

    let removeObjects = promisify(this.s3.deleteObjects.bind(this.s3));

    await removeObjects(params).catch(console.log);

    return {
        success:true,
        message:"Successfully deleted objects"
    };

};
```

From above:

- Create a params object which encompasses the name of the bucket to be deleted under `Bucket` key, and an array of `Objects` to be deleted under the `Delete` key.

- Loop through the `objectKeys` passed populating the `Objects` array of the `Delete` key in the `params` object.

- Promisify the `deleteObjects()` function from s3 so that we can use the *async/await*  syntax.

- Delete the objects.

- Send back a response as per the schema.

To test this:

- Ensure that the development server is up and running.

- Head over to Altair GraphQl Client, open a separate tab and paste in the following mutation in the workspace:

```javascript
mutation DeleteObjects {
  deleteObjects(
    bucketName:"simple-image-upload-bucket",
    objectKeys:["enter_object_key","enter_object_key"]
  ){
    success
    message
  }
}
```

- From the tab of fetching objects, copy and paste at least two object keys to the `objectKeys` array. If you have more objects, feel free to include more.

- In case you are using a different bucket name, make sure you change it.

- Hit the play button and examine the results.

### Deleting an s3 bucket

In case an s3 bucket is of no use anymore, you can always delete it. But to delete an s3 bucket, you have to make sure that there are no objects in it. Else it will fail.

In the same file, under `deleteBucket()` function, we implement the functionality of deleting a bucket:

```javascript
//delete bucket.
async deleteBucket(bucketName){

    const params = {
        Bucket:bucketName
    };

    let removeBucket = promisify(this.s3.deleteBucket.bind(this.s3));

    await removeBucket(params).catch(console.log);

    return {
        success:true,
        message:"Successfully deleted bucket"
    }

};
```
From above:

- Creating a params object which holds the name of the bucket to be deleted under `Bucket` key.

- Promisify the `deleteBucket()` method so that we can use the *async/await* syntax.

- Remove the bucket and send back a response.

To test this:

- Ensure that the development server is running.

- Head over to Altair GraphQl Client, open a separate tab, and paste in the following mutation in the workspace:

```javascript
mutation DeleteBucket {
  deleteBucket(bucketName:"enter-a-bucket-name"){
    success
    message
  }
}
```

- If you have one bucket, and it has files, go through [creating an s3 bucket](#creating-an-s3-bucket) and create a dummy bucket.

- In the mutation, paste in its name in the `bucketName` value.

- Hit the play button and examine the results.

### Conclusion

AWS S3 bucket is by far the most used cloud storage service. It provides the agility to be able to perform various operations on objects. Uploading objects to a cloud storage service is better than flooding your server with bulk data.

AWS Node.js SDK provides more functionalities to s3 and other services than described in this article. To check them out, visit the [official docs](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/tutorials.html).

Happy coding!!
