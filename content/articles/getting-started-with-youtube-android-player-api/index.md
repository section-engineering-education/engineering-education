---
layout: engineering-education
status: publish
published: true
url: /getting-started-with-youtube-android-player-api/
title: Getting Started with YouTube Android Player API 
description: In this tutorial we will use the API to create an android app that allows users to search for YouTube videos and then play them in their android applications.
author: moses-takai
date: 2022-04-25T00:00:00-12:30
topics: [API]
excerpt_separator: <!--more-->
images:
  - url: /engineering-education/getting-started-with-youtube-android-player-api/hero.jpg
    alt: YouTube Android Player API  example image
---
YouTube offers an Android API that allows developers to add the capability of playing YouTube videos in their app.
<!--more-->
In this tutorial, we will use the YouTube API to create an Android app that allows users to search for YouTube videos and then play them in their Android applications.

### Table of contents
- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Obtaining your KEY](#obtaining-api-key)
- [Creating a project](#creating-an-android-project)
- [Setting up the project](#setting-up-the-project)
- [Defining a model class](#defining-a-model-class)
- [Designing user interfaces](#designing-user-interfaces)
- [Making a search network call](#making-a-search-network-call)
- [Playing videos](#playing-videos)
- [Demo](#demo)
- [Conclusion](#conclusion)
- [Further reading](#further-reading)

### Prerequisites
To follow along with this tutorial, the reader should have the following:
- Android Studio installed on thier computer.
- Basic skills in creating Android apps.
- Some knowledge in using Kotlin.
- Knows how to use ViewBinding in Android.

### Introduction
The YouTube API does not have a direct dependency that one can add to the `Gradle` files. Instead, one must download the API as a zip file and add it manually to the app.

The API also requires an API key and registration in the Google cloud console. The API is simple and has different features that we can leverage to make our apps attractive.

### Obtaining API-key
- Launch your browser and go to the [Google Cloud Platform](https://console.cloud.google.com/). Use your google account to get started. 

- Create a new project and give it a name of your choice.

![cloud-project](/engineering-education/getting-started-with-youtube-android-player-api/cloud-project.png)

- Click on the side navigation drawer > select Api & Services > Click on Library. You will then be directed to another screen.

![library](/engineering-education/getting-started-with-youtube-android-player-api/library.png)

- In the APIs library, search for `youtube data api 3`, select it and enable it.

> Make sure your project is selected (at the top navigation bar, you should see the name of your project).

- On the side navigation drawer > select Api & Services > click on credentials, you will be directed to another screen. 

- At the top bar, click on Create credentials, then click on `api key`. 
Copy the API-Key, and keep it somewhere as we will be using it in our app.

![api-key](/engineering-education/getting-started-with-youtube-android-player-api/api-key.png)

### Creating an Android project
Once your IDE is launched, create a new Android app project.

![new-project](/engineering-education/getting-started-with-youtube-android-player-api/new-project.png)

### Hiding the API-Key
Before we begin the implementation, we need to keep our Youtube API key safe so that when you push the code to GitHub, the key is not published.

Open your `gradle.properties` file and replace the "YOUTUBE_API_KEY_VALUE" with your key:`YOUTUBE_API_KEY = "YOUTUBE_API_KEY_VALUE"`.

Open your app-level `build.gradle` and inside the the `defaultConfig`, add this line - `buildConfigField("String", "YOUTUBE_API_KEY", YOUTUBE_API_KEY)` :

```kotlin

defaultConfig {
    buildConfigField("String", "YOUTUBE_API_KEY", YOUTUBE_API_KEY)
}
```

Then add the `gradle.properties` file in `gitignore` : `/gradle.properties`.

### Setting up the project
We will not add the Youtube API directly to our project. Instead, follow the given steps below to get it and add it to your project: 

Click [here](https://developers.google.com/youtube/android/player/downloads) to go to the official site and download the API.

![player-api](/engineering-education/getting-started-with-youtube-android-player-api/player-api.png)

After you have successfully downloaded the `.jar` file, go to the directory where it has been downloaded, extract it and open the `libs` folder in the unzipped content. Then, copy the `.jar` file.

In your Android Studio, switch to project view > click on app > then on libs and paste the `.jar` file.

![paste-lib](/engineering-education/getting-started-with-youtube-android-player-api/paste-lib.png)

Right-click on the `.jar` file and select `Add as Library`. It will then be added to our app-level `build.gradle` as a dependency.

If you switch back to the Android view, navigate to the `Gradle` section, and open the Module `build.gradle`, you should see the newly added dependency: 
```kotlin
implementation files('libs/YouTubeAndroidPlayerApi.jar')
```

Add these other dependencies to the app-level `build.gradle`:

```gradle
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
```

Go to your `Manifest` file and add the internet permission as our app requires an internet connection to play the video.

### Defining a model class
As we will be searching for videos from the YouTube API, a model class is needed to model the JSON response. This class will provide the 'ids' of the videos we need.

```kotlin
data class SearchResponse(
    @SerializedName("items")
    val items: List<Item>,
){
    data class Item(
        @SerializedName("etag")
        val etag: String,
        @SerializedName("id")
        val id: Id,
        @SerializedName("kind")
        val kind: String
    ){
        data class Id(
            @SerializedName("kind")
            val kind: String,
            @SerializedName("videoId")
            val videoId: String
        )
    }
}
```

### Designing user interfaces
Let us define a UI with a search `EditText` that lets the user search for a given video and a `RecyclerView` to display the search result.

Go ahead and design the layout for your `activity_main.xml` to be similar to this: 

![layout-main](/engineering-education/getting-started-with-youtube-android-player-api/layout.png)

> Do not forget to create a corresponding `RecyclerView` row item and its Recycler adapter based on the model class that was created (You can take a look at how my recycler adapter looks like in this [Github gist](https://gist.github.com/mosestakai/e21a114822b7d7c6b53b6920b8190f98)).

> In other cases, you may include the thumbnails of the videos that were searched, but we will not do that here as that is out of the scope of this tutorial. Instead, we will display the 'ids' of the search results.

We will do that in another `Activity` where the videos are played. To create a new 'PlayerActivity' and the `activity_player.xml`, add the snippets below to the `YouTubePlayerView` view.

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

![layout](/engineering-education/getting-started-with-youtube-android-player-api/layout.png)

### Making a search network call
To query for videos from the YouTube API, use the following API URL - "https://www.googleapis.com/youtube/v3/search/"

Create an API service and in it define the following function:

```kotlin
@GET("search/")
fun search(
    @Query("q") searchString: String,
    @Query("key") apiKey: String = YOUTUBE_API_KEY
) : Call<SearchResponse>
```

The function takes in a search query, and the Youtube API key then returns a response of the searched word. 

Creating an instance of the API service:

```kotlin
object YoutubeApi {
    fun apiInstance(): ApiService {
        return Retrofit.Builder()
            .baseUrl("https://www.googleapis.com/youtube/v3/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(ApiService::class.java)
    }
}
```

In your `MainActivity`, inside the `onCreate` method, when the user clicks on the search icon, using the instance of your API service, call the search function, and pass the content that is inside the search `EditText`. `onResponse`, pass the response data to your recycler adapter and then bind the adapter to your `RecyclerView`. 

```kotlin
binding.searchButton.setOnClickListener {
    binding.progressBar.isVisible = true
    val searchTerm = binding.edtSearch.text.toString().trim()

    YoutubeApi.apiInstance.search(searchTerm).enqueue(object : Callback<SearchResponse>{
        override fun onResponse(
            call: Call<SearchResponse>,
            response: Response<SearchResponse>
        ) {
            Log.d(TAG, "onResponse: ${response.isSuccessful}")
            binding.progressBar.isVisible = false
            val result = response.body()?.items
            adapter.submitList(result)
            binding.videosRecycler.adapter = adapter
        }

        override fun onFailure(call: Call<SearchResponse>, t: Throwable) {
            binding.progressBar.isVisible = false
            Toast.makeText(applicationContext, "An error occurred", Toast.LENGTH_SHORT).show()
        }
    })
}
```

### Playing videos
When a video from the `RecyclerView` is clicked, we navigate the user to the `PlayerActivity` to play the video.

The YouTube API requires that you have the YOUTUBE_ID of the video that you want to play. So we will be passing this 'id' to the `PlayerActivity`.

```kotlin
adapter = VideosAdapter(VideosAdapter.OnClickListener{ item ->
    val intent = Intent(this, PlayerActivity::class.java)
    intent.putExtra("YOUTUBE_VIDEO_ID", item.id.videoId)
    startActivity(intent)
})
```

To use the Youtube API, our `Activity` need to stop extending the `AppCompatActivity` and extend the `YouTubeBaseActivity`: 

```kotlin
class PlayerActivity : YouTubeBaseActivity() {
    ...
}
```

Inside the `onCreate` function we will receive the 'YOUTUBE_VIDEO_ID' that we passed:

```kotlin
val videoId = intent.getStringExtra("YOUTUBE_VIDEO_ID")
``` 

Then reference our `YoutubePlayerView`:

```kotlin
val youTubePlayerView : YouTubePlayerView = findViewById(R.id.youtubePlayerView)
```

Also, we need to initialize:

```kotlin
youTubePlayerView.initialize(YOUTUBE_API_KEY, object : YouTubePlayer.OnInitializedListener {
    override fun onInitializationSuccess(
        provider: YouTubePlayer.Provider?,
        player: YouTubePlayer?,
        bln: Boolean
    ) {
        player?.loadVideo(videoId)
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

Inside the `initialize` method, we pass our `YOUTUBE_API_KEY` and `OnInitializedListener` interface. The interface has two overridden functions. The first method is overridden when initialization is booming, and the other when the initialization fails.

If the API initializes successfully, with the `player` from the `onInitializationSuccess` function, you can load the video that you want to play using this snippet:

```kotlin
 player?.load video(VIDEO_ID)
```

Make sure you pass the ID of the video to be played. Then call `.play()` so that it plays automatically when the video is loaded.

If the initialization is not successful, you can use the result variable to debug and see the root cause of the error. 

### Demo
When you compile and run the app on your emulator or physical device, your app should look like this:

![demo](/engineering-education/getting-started-with-youtube-android-player-api/demo.gif)

### Conclusion
In this tutorial, we learned about the YouTube Android Player API, we learned how to create a project on the Google cloud platform, obtain the key, secure the key, and finally integrate the API into our Android app. 

Keep researching and learning more about the API. Also, please check out this [GitHub repository](https://github.com/mosestakai/YoutubeVideoPlayerDemo) for the fully implemented applciation.

Happy coding!

### Further reading
- [API's Docs](https://developers.google.com/youtube/android/player).

---
Peer Review Contributions by: [Jerim Kaura](/engineering-education/authors/jerim-kaura/)
