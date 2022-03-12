YouTube offers an API that allows developers to play different videos in an app.

In this tutorial, we will create a simple android app that plays a YouTube video with the help of the YouTube API.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Obtaining your KEY](#obtaining-your-key)
- [Creating a project](#creating-a-project)
- [Setting up the project](#setting-up-the-project)
- [Creating a youtube playerview](#creating-a-youtube-playerview)
- [Playing video](#playing-video)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Prerequisites
To follow along and learn more from this tutorial, make sure you have:
- Android Studio installed on your computer.
- Basic skills in creating Android apps.
- Some knowledge in using Kotlin.

### Introduction
YouTube Android Player API  helps developers add the capability of playing Youtube videos in Android apps. However, the API does not have a direct dependency that one can be added to the `Gradle` files. Instead, one must download the API as a zip file and add it manually to the app.

The API also requires an API key and registration in the Google cloud console. The API is simple to use and has different features that we can leverage to make our apps attractive.

### Obtaining the API-key
- Launch your browser and go to the [Google Cloud Platform](https://console.cloud.google.com/). Use your google account to get started. 

- Create a new project and give it a name of your choice.

![cloud-project](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/cloud-project.png)

- Click on the side navigation drawer > select Api & Services > Click on Library. You will then be directed to another screen.

![library](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/library.png)

- In the APIs library, search for youtube data api 3, select it and enable it.

> Make sure your project is selected (at the top navigation bar, you should see the name of your project)

- On the side navigation drawer > select Api & Services > click on credentials, you will be directed to another screen. 

- At the top bar, click on Create credentials, then click on api key. 
Copy the API-Key, and keep it somewhere as we will be using it in our app.

![api-key](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/api-key.png)


### Hiding the API-Key
Before we begin the implementation, we need to keep our Youtube API key safe so that when you push the code to Github, the key is not published.

Open your `gradle.properties` file and this line and replace the "YOUTUBE_API_KEY_VALUE" with your key:`YOUTUBE_API_KEY = "YOUTUBE_API_KEY_VALUE"`.

Open your app-level `build.gradle` and inside the the `defaultConfig`, add this line - `buildConfigField("String", "YOUTUBE_API_KEY", YOUTUBE_API_KEY)` :

```kotlin

defaultConfig {
        
    buildConfigField("String", "YOUTUBE_API_KEY", YOUTUBE_API_KEY)
}
```

Finally, add the `gradle.properties` file in `gitignore` : `/gradle.properties`.

### Creating an Android project
Once your IDE is launched, create a new Android app project.

![new-project](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/new-project.png)

### Setting up the project
We do not add the Youtube API directly to our project. Instead, follow the given steps below to get it and add it to your project: 

Click [here](https://developers.google.com/youtube/android/player/downloads) to go to the official site and download the API.

![player-api](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/player-api.png)

After you have successfully downloaded the `.jar` file, go to the directory where it has been downloaded, extract it and open the `libs` folder in the unzipped content. Then, copy the `.jar` file.

In your Android Studio, switch to project view > click on app > then on libs and paste the `.jar` file.

![paste-lib](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/paste-lib.png)

Right-click on the `.jar` file and select `Add as Library`. It will then be added to our app-level `build.gradle` as a dependency.

If you switch back to Android view, navigate to the `Gradle` section, and open the Module `build.gradle`, you should see the newly added dependency : 

`implementation files('libs/YouTubeAndroidPlayerApi.jar')`

Go to your `Manifest` file and add the internet permission as our app requires an internet connection to play the video.

### Creating a youtube player view
Open your `activity_main.xml` file and add the `YouTubePlayerView` view.

```Xml
<com.google.android.youtube.player.YouTubePlayerView
    android:id="@+id/youtubePlayerView"
    android:layout_width="match_parent"
    android:layout_height="300dp"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />
```

It would be best if you had something similar to this: 

![layout](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/layout.png)

### Using the API to play the videos
The youtube API requires that you have the YOUTUBE_ID of the video that you want to play. 

If you are integrating the API into your app, you can declare a function that takes in the whole URL for a Youtube video, and then it extracts the ID from the URL.

For us, we will be playing this video - "https://www.youtube.com/watch?v=yunF2PgJlHU". From the URL, the string "v=yunF2PgJlHU" at the end is the YOUTUBE_ID of the video that we will be playing.

Declare a variable to hold the ID - `private val YOUTUBE_ID = "yunF2PgJlHU"`

To use the Youtube API, our `Activity` need to stop extending the `AppCompatActivity` and extend the `YouTubeBaseActivity` : 

```kotlin
class MainActivity : YouTubeBaseActivity() {
    ...
}
```

Inside the `onCreate` function, reference our `YoutubePlayerView` :

`val youTubePlayerView : YouTubePlayerView = findViewById(R.id.youtubePlayerView)`

Then we need to initialize it :

```kotlin
youTubePlayerView.initialize(YOUTUBE_API_KEY, object : YouTubePlayer.OnInitializedListener {
    override fun onInitializationSuccess(
        provider: YouTubePlayer.Provider?,
        player: YouTubePlayer?,
        bln: Boolean
    ) {
        player?.loadVideo(VIDEO_ID)
        player?.play()
    }

    override fun onInitializationFailure(
        provider: YouTubePlayer.Provider?,
        result: YouTubeInitializationResult?
    ) {
        Toast.makeText(applicationContext, "Something went wrong", Toast.LENGTH_SHORT).show()
    }
})
```

Inside the `initialize` method, we pass our `YOUTUBE_API_KEY` and `OnInitializedListener` interface. The interface has two functions that are overridden. The first method is overridden when initialization is successful, and the other when the initialization fails.

If the API initializes successfully, with the `player` from the `onInitializationSuccess` function, you can load the video that you want to play. Write  - `player?.load video(VIDEO_ID)`. 

Make sure you pass the ID of the video to be played. Then call `.play()` so that it plays automatically when the video is loaded.

When initialization is not successful, you can use the result variable to debug and see the root cause of the error. 

### Demo
When you compile and run the app on your emulator or physical device, your app should be similar  to this:

![demo](/engineering-education/creating-a-flipped-box-card-in-android-jetpack-compose/demo.gif)

### Conclusion
In this brief tutorial, we learned what the YouTube Android Player API is, how to create a project on the Google cloud platform, obtain the key, secure the key, and finally integrate the API in our Android app. 

Keep researching and learning more about the API. Also, please check out this [Github repository](https://github.com/mosestakai/YoutubeVideoPlayerDemo) for the fully implemented  app

### Further reading
- [API's Docs](https://developers.google.com/youtube/android/player).

Happy coding!
