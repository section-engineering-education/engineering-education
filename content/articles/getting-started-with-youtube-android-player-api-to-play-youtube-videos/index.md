As an Android developer, you may be in need of playing videos in your app, the source of the video might be your backend or some API. However, YouTube offers an API that you can use to play different Videos in your app.

In this tutorial, we will create a simple android app that plays a YouTube video with the help of the API that I have mentioned above.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Obtaining your KEY](#step-1---obtaining-your-key)
- [Creating a project](#step-2---creating-a-project)
- [Setting up the project](#step-3---setting-up-the-project)
- [Creating a youtube playerview](#step-4---creating-a-youtube-playerview)
- [Playing video](#step-5---playing-video)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [Reference](#reference)

### Prerequisites
To follow along and learn more from this tutorial, make sure you have:
- Android Studio installed on your computer.
- Basic skills in creating Android apps.
- Some knowledge in using Kotlin.

### Introduction
YouTube Android Player API  helps you play Youtube videos in your Android apps, the API does not have a direct dependency that you can add to your `Gradle` files. You need to download the API as a zip file and add it manually to your app.

The API also requires that we have a key and we register our application in the Google cloud console. All in all, the API is simple to use and has different features that we can leverage to make our apps attractive.

Let us get started.

### Step 1 - Obtaining your KEY
Launch your browser and go to the [Google Cloud Platform](https://console.cloud.google.com/) and use your google account to get started. 

Create a new project and give it a name of your choice : 

![cloud-project](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/cloud-project.png)

Click on the side navigation drawer > select Api & Services > Click on Library. You will then be navigated to another screen.

![library](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/library.png)

In the APIs library, search for youtube data api 3, select it and enable it.

> Make sure your project is selected (at the top navigation bar, you should see the name of your project)

On the side navigation drawer > select Api & Services > click on credentials, you will be navigated to another screen. At the top bar click on Create credentials, then click on api key, and then boom, now you have your API key, copy it, and keep it somewhere as we will be using it in our app.

![api-key](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/api-key.png)


### Step 2 - Hiding the KEY
Before we begin the implementation, we need to keep our Youtube API key safe so that when you push the code to Github, the key is not pushed.

Open your `gradle.properties` file and this line and replace the "YOUTUBE_API_KEY_VALUE" with your key:`YOUTUBE_API_KEY = "YOUTUBE_API_KEY_VALUE"`.

Open your app-level `build.gradle` and inside the the `defaultConfig`, add this line - `buildConfigField("String", "YOUTUBE_API_KEY", YOUTUBE_API_KEY)` :

defaultConfig {
        ...

        buildConfigField("String", "YOUTUBE_API_KEY", YOUTUBE_API_KEY)
}

Finally, add the `gradle.properties` file in `gitignore` : `/gradle.properties`.

### Step 3 - Creating a project
Once your IDE is launched, create a new Android app project : 

![new-project](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/new-project.png)

### Step 4 - Setting up the project
We don't directly add the Youtube API directly to our project, follow the given steps below to get it and add it to your project: 

Click [here](https://developers.google.com/youtube/android/player/downloads) to go to the official site and download the API.

![player-api](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/player-api.png)

When you have successfully downloaded the `.jar` file, go to the directory where it has been downloaded, extract it and open the `libs` folder in the unzipped content. Copy the `.jar` file.

In your Android Studio, switch to project view > click on app > then on libs and paste the `.jar` file.

![paste-lib](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/paste-lib.png)

Right-click on the `.jar` file and select `Add as Library`, it will then be added to our app-level `build.gradle` as a dependency.

If you switch back to Android view, navigate to the `Gradle` section, and open the Module `build.gradle`, you should see the newly added dependency : 

`implementation files('libs/YouTubeAndroidPlayerApi.jar')`

Go to your `Manifest` file and add the internet permission as our app requires an internet connection in order to play the video.

### Step 5 - Creating a youtube playerview
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

You should have something similar to this: 

![layout](/engineering-education/getting-started-with-youtube-android-player-api-to-play-youtube-videos/layout.png)

### Step 6 - Playing video
The youtube API requires that you have the YOUTUBE_ID of the video that you want to play. If you are integrating the API into your app, you can declare a function that takes in the whole URL for a Youtube video, then it extracts the ID from the URL.

For us, we will be playing this video - "https://www.youtube.com/watch?v=yunF2PgJlHU". From the URL, you can see that at the end there is that written "v=yunF2PgJlHU". That is the YOUTUBE_ID of the video that we'll be playing.

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

Inside the `initialize` method, we pass our `YOUTUBE_API_KEY` and `OnInitializedListener` interface. The interface has two functions that are overridden. The first method is when initialization of the was successful and the other one is when initialization failed.

If the API initializes successfully, with the `player` from the `onInitializationSuccess` function; you can load the video that you want to play. Write  - `player?.loadVideo(VIDEO_ID)`. Make sure you pass the ID of the video to be played. The call `.play()` so that when the video is loaded, it plays automatically.

When initialization is not successful, you can use the result variable to debug and see the root cause of the error. For me, I have just included a `Toast` to toast a simple message.

### Demo
When you compile and run the app on your emulator or physical device, your app should be somewhat similar or closer to this:

![demo](/engineering-education/creating-a-flipped-box-card-in-android-jetpack-compose/demo.gif)

### Conclusion
In this brief tutorial, we learned what the YouTube Android Player API is, how to create a project on the Google cloud platform, how to obtain the key, secure the key, and finally integrate the API in our Android app. Keep researching and learning more about the API. For the whole implementation of the app, we created, please check out this Github repository that I have pushed the code - [YoutubeVideoPlayerDemo](https://github.com/mosestakai/YoutubeVideoPlayerDemo). 

### Further reading
- [API's Docs](https://developers.google.com/youtube/android/player).

Happy coding!
