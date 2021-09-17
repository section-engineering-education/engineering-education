---
layout: engineering-education
status: publish
published: true
url: /google-drive-api-nodejs/
title: Getting Started with Google Drive Node.js API
description: This tutorial will go through a step by step tutorial on how to integrate Google Drive API into a Node.js application. We will write functions to upload, delete, and share a file in Google Drive. 
author: paul-romans
date: 2021-06-09T00:00:00-14:00
topics: [Node.js, API]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/google-drive-api-nodejs/hero.png
    alt: Getting Started with Google sheets API in Node.js
---
Google Drive API is a Google product developed to enable developers to create applications that use Google Drive cloud storage. Through the API, you can develop an application that seamlessly integrates Google Drive for data storage and sharing.
<!--more-->
### Introduction
Among the functionalities provided by the API are uploading, deleting, sharing, and downloading files that exist in a Google Drive account. 

### Table of contents
- [Goal](#goal)
- [Project Setup](#project-setup)
- [Setting up Auth Credentials](#setting-up-auth-credentials)
- [Import dependencies](#import-the-dependencies)
- [Fetch Client ID and Secret](#client-id-and-secret)
- [Redirect URL and Refresh Token](#redirect-url-and-refresh-token)
- [The Auth Client Initialization](#the-auth-client)
- [Initializing Google Drive](#initialize-google-drive)
- [The Google Drive Functions](#the-google-drive-functions)
    - [Upload file to Google Drive](#upload-file-to-google-drive)
    - [Delete an existing file](#the-delete-file-function)
    - [Generate a sharable public URL](#the-generate-link-function)
- [Conclusion](#conclusion)
- [Further Reading](#further-reading)

### Goal
By the end of this tutorial, we'll have built a basic `Node.js` application that uploads, deletes, and generate a sharable link of a file uploaded in Google Drive. We will use the API to carry out all these activities.

>This tutorial mainly focuses on the backend integration of the API.

### Project setup
Create a directory named `drive-api-node` by executing the command below.

```bash
mkdir drive-api-node
cd drive-api-node
```

To create the Node.js application, we will run the command below to initialize a `package.json` file. 

```bash
npm init -y
```

Next, we will install the `googleapis` dependency by the following command.

```bash
npm install –save googleapis
```

Create a file named `index.js` in the root folder. We will write most of our code in this file. This file is the entry point of the application.

### Setting up Auth credentials
We need a client ID and secret to access the drive storage.
1. Visit the [console.cloud.google.com](https://console.cloud.google.com/).
2. Create a new project if you do not have an existing project.
3. Select the project and select `APIs and services`.
4. Click on `ENABLE APIS AND SERVICES`
5. In the search box, search for `google drive api` then enable it for the project created.
6. Once you have enabled the API, select `CREATE CREDENTIALS` for accessing the API. In the drop-down menu, select `Oath client ID`. This option will generate a key pair of client ID and client secret.
7.  Next, select `CONFIGURE CONSENT SCREEN` which will ask the user if they want the application to access their Drive using the created client ID and secret. Select on `External` then click the `CREATE` button. 
8. Enter the `appname` for your application, the support email. I ignored the app logo for now because it will request verification.  Provide the requested details then click `Save` to return to the `Credentials screen`.
9. Select `Web Application` for the Application Type. Follow the instructions to enter JavaScript origins, redirect URLs I used [this](https://developers.google.com/oauthplayground) for the redirect URL. Click `Create`.
10. We can now copy the client ID and client secret to our application.
11. On the `Auth Comscent Screen`, click `ADD USER` then insert a valid email whose Google account will be used for testing the application.

### Import the dependencies
Add the code snippets below to include the installed dependencies to the project. The `file system` and `path` modules will enable us to get the path of the file to be uploaded to Google drive.

```js
//googleapis
const { google } = require('googleapis');

//path module
const path = require('path');

//file system module
const fs = require('fs');
```

### Client ID and secret
We can obtain the  `CLIENT_ID` and `SECRECT` from the dashboard as we had created them earlier. In the `index.js`, add the snippets below to include the `client ID` and `secret`.

```js
//client id
const CLIENT_ID = 'YOUR CLIENT IS'

//client secret
const CLIENT_SECRET = 'YOUR CLIENT SECRET';
```

### Redirect URL and refresh token
Use the [oathplayground](https://developers.google.com/oauthplayground) link as the redirect_url.

To generate the refresh token,
1. Head over to [oathplayground](https://developers.google.com/oauthplayground) and select `Drive Api v3`. 
2. Under the `Drive Api v3`, select this link https://www.googleapis.com/auth/drive to enable the access, edit, creation, and deletion of Google Drive files.
3. On the top right, click the `setting icon` then in the drop down menu, check the `use your own Auth credentials` checkbox. 
4. In the input boxes, fill in the client ID and secret then click `close` then `Authorize Apis`.
5. In the next step, we will select the Google account for which we will use with the Drive. Use the account which you added as a test user in the `Auth Consent Screen`.
6. In the next screen, click `allow` to grant the API access to Google Drive for editing, creation, and deletion of files.
7. You will be redirected back to the oathplayground. Click `exchange authorization code for tokens` to get the refresh token.

Now store the refresh token in constant as shown below.

```js
//redirect URL
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

//refresh token
const REFRESH_TOKEN = 'YOUR REFRESH TOKEN`
```

### The cuth client
To initialize the auth client, add the snippets below in the `index.js` file.
```js
//intialize auth client
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
```

Next, we need to set auth credentials in the initialized auth client. To set the auth credentials, add the snippets below to the initialized auth client.
```js
//setting our auth credentials
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
```

### Initialize Google Drive
To initialize the Google Drive, add the snippets below.

```js
//initialize google drive
const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});
```

Next, we specify the path to the file for which we want to upload to Google drive.

```js
//file path for out file
const filePath = path.join(__dirname, 'filename.format');
```

### The Google Drive functions
We have set up everything for the project. Now we need to add the code snippets for the basic functionalities as specified in the project goal. 

We will write three functions to upload a file to the Google drive, delete a specified file, and generate a shareable link of a given file existing in the Google Drive.

#### Uploading a file to Google Drive
The `uploadfile` function taken no parameter. It is an asynchronous function that sends a request and waits for a response from the server. In the `request body` we supply the `filename` and `mimeType`. 

The `mimeType` specifies the file format. You can find more about `mimeType` [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types). 

The snippets below shows the function to upload a file to Google drive:
```js
//function to upload the file
async function uploadFile() {
    try{
      const response = await drive.files.create({
            requestBody: {
                name: 'hero.png', //file name
                mimeType: 'image/png',
            },
            media: {
                mimeType: 'image/png',
                body: fs.createReadStream(filePath),
            },
        });  
        // report the response from the request
        console.log(response.data);
    }catch (error) {
        //report the error message
        console.log(error.message);
    }
}  
```

#### The delete file function
Each file in the Google Drive has a unique ID. The `delete file function` will delete the file specified by the ID in the request body. The snippets below are added to the `index.js` file to delete a file.

```js
//delete file function
async function deleteFile() {
    try {
        const response = await drive.files.delete({
            fileId: 'File_id',// file id
        });
        console.log(response.data, response.status);
    } catch (error) {
        console.log(error.message);
    }
  }
```

For the file ID, when the `Upload file()` function is called, the function returns the `file id` of the uploaded file in the response. During testing, be sure to copy the file ID in the response. Data for use in the `deleteFile()` function.

#### The generate link function
This function is responsible for creating a link to access the file in the drive folder. First, the function should change the permission to public for anyone to access. This process is necessary because during upload, only the user who uploaded the file has access to the file.

```js
//create a public url
async function generatePublicUrl() {
    try {
        const fileId = '19VpEOo3DUJJgB0Hzj58E6aZAg10MOgmv';
        //change file permisions to public.
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
            role: 'reader',
            type: 'anyone',
            },
        });

        //obtain the webview and webcontent links
        const result = await drive.files.get({
            fileId: fileId,
            fields: 'webViewLink, webContentLink',
        });
      console.log(result.data);
    } catch (error) {
      console.log(error.message);
    }
  }
```

The `webContent` link downloads the file to the system directly. The `webViewLink` is a link for viewing the file in a browser without any credentials.

### Conclusion
In this tutorial, I explained how to set up Google Drive with Node.js. We wrote functions to upload, delete, and share a file in Google Drive. 

You can go ahead and try out the application on your computer by the source code [here](https://replit.com/@paulromans/Drive-api-node#index.js).

Happy coding!

### Further Reading
- [Google Drive API](https://developers.google.com/drive/api/v3/about-sdk)
- [Google APIs](https://www.npmjs.com/package/googleapis)

---
Peer Review Contributions by: [Odhiambo Paul](/engineering-education/authors/odhiambo-paul/)
