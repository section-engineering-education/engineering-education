---
layout: engineering-education
status: publish
published: true
url: /backup-services-with-google-drive-api-in-android/
title: Backup Services with Google Drive API in Android
description: This tutorial takes the reader through the process of saving and retrieving data from Google Drive using the Google Drive API in Android. Google Drive is a cloud-based service that allows users to save, share, and view files using their Google account. 
author: maurine-muthoki
date: 2021-08-08T00:00:00-04:50
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/backup-services-with-google-drive-api-in-android/hero.png
    alt: Backup Services with Google Drive API in Android image
---

Almost every Android app needs some form of cloud storage to save user's data. **Google Drive** is one of the cloud-based storage solutions. It works similarly to other cloud storage services in that it is used to augment storage capacity for important files that the user would want to recover in case they get lost.
<!--more-->
Google Drive synchronizes all documents, images, and other types of files across all of a user's devices, including mobile phones, tablets, and computers.

### Prerequisites
To follow through this tutorial, you'll need:
- A good understanding of [Kotlin Coroutines](https://kotlinlang.org/docs/coroutines-overview.html) and `higher order` functions.
- An active Google account. If you don't have one, you can create one [here](https://accounts.google.com/signup).
- To be familiar with [Google sign in](https://firebase.google.com/docs/auth/android/google-sign-in) authentication.

### Getting Started
To begin with, launch an Android project in which you have previously integrated Google sign-in authentication. If you don't have one already, you can create it by either following:

- The [official documentation](https://firebase.google.com/docs/android/setup).
- [This YouTube tutorial](https://www.youtube.com/watch?v=-tCIsI7aZGk&pp=sAQA).
- [This tutorial on Section](https://www.section.io/engineering-education/google-authentication-for-android/).

### Setting up the dependencies
Open the app level `build.gradle` file and add the following dependencies:

#### Kotlin Coroutines

```gradle
implementation ('org.jetbrains.kotlinx:kotlinx-coroutines-android:1.4.3-native-mt')
```

#### Google Drive API

```gradle
implementation('com.google.api-client:google-api-client-android:1.23.0')
implementation('com.google.apis:google-api-services-drive:v3-rev136-1.25.0')
```

### Instantiating Google Drive
To use Google Drive, we need to construct a `Drive` object. Drive is one of the Google Drive API classes. Its uses include uploading, downloading, searching, and adjusting Drive sharing rights.

The procedures for creating a Drive instance using its builder is as follows:

#### Step 1
As mentioned earlier, we need a Google account authenticated using your Android App. We can then get the latest account using the `getLastSignedInAccount` function as shown below.

```kotlin
GoogleSignIn.getLastSignedInAccount(this)?.let { googleAccount -> }
```

#### Step 2
To access the user's Google Drive contents, we need to build a `GoogleAccountCredential` that authenticates the signed-in account with `DRIVE_FILE` permissions. These permissions are used to decide whether or not a file may be accessed.

```kotlin
val credential = GoogleAccountCredential.usingOAuth2(
    this, listOf(DriveScopes.DRIVE_FILE)
)
// select account
credential.selectedAccount = googleAccount.account!!
```

#### Step 3
This is the final step when creating a `Drive` instance. Here, We need to construct the Drive service instance using its builder, passing `AndroidHttp`, `JacksonFactory`, and `GoogleAccountCredential` as arguments.

We can combine the above steps into one function as shown below:

```kotlin
private fun getDriveService(): Drive? {
    GoogleSignIn.getLastSignedInAccount(this)?.let { googleAccount ->
        val credential = GoogleAccountCredential.usingOAuth2(
            this, listOf(DriveScopes.DRIVE_FILE)
        )
        credential.selectedAccount = googleAccount.account!!
        return Drive.Builder(
            AndroidHttp.newCompatibleTransport(),
            JacksonFactory.getDefaultInstance(),
            credential
        )
            .setApplicationName(getString(R.string.app_name))
            .build()
    }
    return null
}
```

The above function returns a `Drive` instance if the user is signed in and has the `DRIVE_FILE` permissions. Otherwise, it returns `null`.

### How to access Google Drive's contents
Now that we have a `Drive` instance, we can access the user's Google Drive contents. We have a method named `files` within the drive class which is used as an accessor for making requests from the file collections.

#### Parameters of the `files` function
1. **q** — is a request for sorting the file results.
2. **spaces** — A list of storage locations where data is stored. Google Drive stores all materials in one of these three distinct categories: drive, appDataFolder, and pictures. We'll use drive in this context.
3. **fields** — The data requested for each file, such as the id and name.

The following code example shows how to access all files on the `drive` space:

```kotlin
private fun accessDriveFiles() {
    getDriveService()?.let { googleDriveService ->
        CoroutineScope(Dispatchers.IO).launch {
            var pageToken: String?
            do {
                val result = googleDriveService.files().list().apply {
                    spaces = "drive"
                    fields = "nextPageToken, files(id, name)"
                    pageToken = this.pageToken
                }.execute()

                result.files.forEach { file ->
                    Log.d("FILE", ("name=${file.name} id=${file.id}"))
                }
            } while (pageToken != null)
        }
    }
}
```

Here we've used a coroutine scope to launch a coroutine that makes a request to the Google Drive API. The coroutine scope is used to ensure that the request job is executed in the background.

The `name` and `id` of each file is printed on the logcat.

### How to upload a file to Google Drive
This involves three steps.

#### Step 1
To start with, you need to construct an instance of the file you wish to upload from the local storage.

```kotlin
val localFileDirectory = File(getExternalFilesDir("backup")!!.toURI())
val actualFile = File("${localFileDirectory}/$FILE_NAME_BACKUP")
```

#### Step 2
Create the Google Drive file and replace the filename with the real file name.

```kotlin
val gFile = com.google.api.services.drive.model.File()
gFile.name = actualFile.name
```

#### Step 3
Create an instance of the `FileContent` comprising of the content and mime-type of the actual file then upload it as shown below.

```kotlin
val fileContent = FileContent("text/plain", actualFile)
googleDriveService.Files().create(gFile,fileContent).execute()
```

Compiling this into one function, we have the following:

```kotlin
fun uploadFileToGDrive() {
    getDriveService()?.let { googleDriveService ->
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val localFileDirectory = File(getExternalFilesDir("backup")!!.toURI())
                val actualFile = File("${localFileDirectory}/FILE_NAME_BACKUP")
                val gFile = com.google.api.services.drive.model.File()
                gFile.name = actualFile.name
                val fileContent = FileContent("text/plain", actualFile)
                googleDriveService.Files().create(gFile, fileContent).execute()
            } catch (exception: Exception) {
                exception.printStackTrace()
            }
        }
    } ?: Toast.makeText(this, "Please Log In first!", LENGTH_SHORT).show()
}
```

If the user is not signed in, the `uploadFileToGDrive` function will display a toast message.

### How to download a file from Google Drive
To obtain a file from the Drive, you need to pass its `id` to the service's `get()` method and execute the request.

```kotlin
fun downloadFileFromGDrive(id : String){
    getDriveService()?.let {googleDriveService->
        CoroutineScope(Dispatchers.IO).launch {
            googleDriveService.Files().get(id).execute()
        }
    } ?: Toast.makeText(this, "Please Log In first!", LENGTH_SHORT).show()
}
```

### How to fix crashes when working with Google Drive API
- Ensure that the user is signed in with an active Google account and has the `DRIVE_FILE` permission.
- On the server-side, ensure that the file is not already present on the server.
- On the client-side, ensure that the file is not already present in the local storage when downloading.

### Conclusion
In this tutorial, we've covered the fundamental steps of accessing Google Drive API and using it to upload and download files from Google Drive. You can implement this knowledge in a more complicated project in your desired approach.

For further reading, you can refer to the following links:

- [Google Drive](https://developers.google.com/drive/v3/web/about-sdk) documents.
- [Google Drive API Reference](https://developers.google.com/drive/v3/reference/).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
