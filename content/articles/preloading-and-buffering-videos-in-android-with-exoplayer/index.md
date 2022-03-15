---
layout: engineering-education
status: publish
published: true
url: /preloading-and-buffering-videos-in-android-with-exoplayer/
title: Preloading and Buffering Videos in Android with ExoPlayer
description: This tutorial will show the reader how to pre-load and buffer videos in Android using ExoPlayer.
author: judy-wangari
date: 2022-01-18T00:00:00-13:30
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/preloading-and-buffering-videos-in-android-with-exoplayer/hero.jpg
    alt: Pre-Loading and Buffering Videos in Android with ExoPlayer
---
Every Android developer needs to understand how a video can be preloaded so that users do not have to wait while a video is loading, just as the YouTube app does.
<!--more-->
A video can be loaded and cached before it is played. TThis is fun because we minimize the waiting time.

### Table of contents
- [Prerequisites](#prerequisites)
- [What is Video Preloading and Buffering](#what-is-video-preloading-and-buffering)
- [Getting started](#getting-started)
- [Creating an Android project](#step-1---creating-an-android-project)
- [Setting up the project](#step-2---setting-up-the-project)
- [Creating a user interface](#step-3---creating-a-user-interface)
- [Creating a base application class](#step-4---creating-a-base-application-class)
- [Creating a video preloading worker](#step-5---creating-a-video-preloading-worker)
- [Caching the video](#step-6---caching-the-video)
- [Playing the video](#step-7---playing-the-video)
- [Demo](#demo)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should have:
- Good knowledge in creating Android Apps.
- Good knowledge of the Kotlin Programming language.
- Basic understanding of using work manager, ViewBinding, and Kotlin Coroutines.

### What is Video Preloading and Buffering?
Buffering occurs in video streaming when the software downloads a particular amount of data before beginning to play the video. While the next section of the file downloads in the background, you may stream the data that has already been preloaded and stored in the buffer. 

ExoPlayer is a library developed by Google. It provides an alternative to Android’s MediaPlayer API for playing audio and video both locally and over the Internet. ExoPlayer support features that are not currently supported by Android’s MediaPlayer API.

### Getting started
In this tutorial, we will create a simple application that plays a video from the internet and caches it before the user views it.

### Step 1 - Creating an Android project
Launch your Android Studio and create an empty project.

![New Android App](/engineering-education/preloading-and-buffering-videos-in-android-with-exoplayer/create_app.png)

### Step 2 - Setting up the project
In this step, we will add the necessary dependencies so as to proceed.

```bash
def exoplayer_version = "2.16.1"
def work_version = "2.5.0"

implementation "com.google.android.exoplayer:exoplayer:$exoplayer_version"
implementation "com.google.android.exoplayer:exoplayer-ui:$exoplayer_version"
implementation "androidx.work:work-runtime-ktx:$work_version"
```

> Remember to enable `viewBinding`.
>
> In your Manifest file, add internet permission because we will be streaming the video from the internet.

### Step 3 - Creating a user interface
In `activity_main.xml` design a simple layout that will contain Exoplayer `PlayerView`.

```xml
<com.google.android.exoplayer2.ui.PlayerView
    android:id="@+id/player_view"
    android:layout_width="0dp"
    android:layout_height="0dp"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintHorizontal_bias="0.5"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent"
    app:show_buffering="when_playing"
    app:show_shuffle_button="true" />
```

![Player View](/engineering-education/preloading-and-buffering-videos-in-android-with-exoplayer/demo2.png)

### Step 4 - Creating a base application class
In this step, we will create a base class that will inherit from the `Application` class.

```kotlin
class VideoApp : Application() {
    companion object{
        lateinit var cache: SimpleCache
    }
 
    private val cacheSize: Long = 90 * 1024 * 1024
    private lateinit var cacheEvictor: LeastRecentlyUsedCacheEvictor
    private lateinit var exoplayerDatabaseProvider: ExoDatabaseProvider

    override fun onCreate() {
        super.onCreate()
        cacheEvictor = LeastRecentlyUsedCacheEvictor(cacheSize)
        exoplayerDatabaseProvider = ExoDatabaseProvider(this)
        cache = SimpleCache(cacheDir, cacheEvictor, exoplayerDatabaseProvider)
    }
}
```

#### Explanation
In this class, we have defined the cache size that our app will use. We also defined the cache evictor which clears our cache, an `ExoDatabaseProvider`, and passed them in our `cache` instance.

### Step 5 - Creating a video preloading worker
Here, we will create a `Worker` class from the Workmanager library that will do the preloading and precaching work in the background.

```kotlin
class VideoPreloadWorker(private val context: Context, workerParameters: WorkerParameters) : Worker(context, workerParameters) {
    private var videoCachingJob: Job? = null
    private lateinit var mHttpDataSourceFactory: HttpDataSource.Factory
    private lateinit var mDefaultDataSourceFactory: DefaultDataSourceFactory
    private lateinit var mCacheDataSource: CacheDataSource
    private val cache: SimpleCache = VideoApp.cache

    ...
}        
```

Inside the class, define a companion object that will contain a method for receiving arguments from where the Worker class will be instantiated.

```kotlin
companion object {
    const val VIDEO_URL = "video_url"
        
    fun buildWorkRequest(yourParameter: String): OneTimeWorkRequest {
        val data = Data.Builder().putString(VIDEO_URL, yourParameter).build()
        return OneTimeWorkRequestBuilder<VideoPreloadWorker>().apply { setInputData(data) }
        .build()
    }
}
```

For the video caching logic, let's define two methods that will do that work:

```kotlin
private fun preCacheVideo(videoUrl: String?) {

    val videoUri = Uri.parse(videoUrl)
    val dataSpec = DataSpec(videoUri)

    val progressListener = CacheWriter.ProgressListener { requestLength, bytesCached, _ ->
        val downloadPercentage: Double = (bytesCached * 100.0 / requestLength)
        // Do Something
    }

    videoCachingJob = GlobalScope.launch(Dispatchers.IO) { 
        cacheVideo(dataSpec, progressListener)
        preCacheVideo(videoUrl)
    }
}

private fun cacheVideo(mDataSpec: DataSpec, mProgressListener: CacheWriter.ProgressListener) {
    runCatching {
        CacheWriter(mCacheDataSource,mDataSpec,null,mProgressListener,).cache()
    }.onFailure {
        it.printStackTrace()
    }
}
```

#### Explanation
The first function `preCacheVideo` takes in a video URL and passes it into a `DataSpec` which defines a region of data in a resource. Also, we have defined a `CacheWriter.ProgressListener` that receives progress updates during cache operations.

Then inside the function, we do the video caching job that runs inside a Coroutine `GlobalScope` and calls the caching method. The second function `cacheVideo` does the caching of the video with the help of a caching-related utility method, `CacheWriter`.

After defining the two methods, inside the `doWork` method, we do initializations and call our `preCacheVideo` function.

```kotlin
override fun doWork(): Result {
    try {
        val videoUrl: String? = inputData.getString(VIDEO_URL)

        mHttpDataSourceFactory = DefaultHttpDataSource.Factory()
            .setAllowCrossProtocolRedirects(true)

        mDefaultDataSourceFactory = DefaultDataSourceFactory(context, mHttpDataSourceFactory)

        mCacheDataSource = CacheDataSource.Factory()
            .setCache(cache)
            .setUpstreamDataSourceFactory(mHttpDataSourceFactory)
            .createDataSource()

        preCacheVideo(videoUrl)

        return Result.success()

    } catch (e: Exception) {
        return Result.failure()
    }
}
```

### Step 6 - Caching the video
When pre-caching a video, it is good to do it in a different `Activity` or `Fragment` so that when the user navigates to the actual destination, he/she finds the video ready. Like on youtube, videos are displayed in a list, when a user selects a particular video, that is when they are navigated to a different screen, where the video plays.

In some cases, developers prefer displaying thumbnails of videos in a RecyclerView, then, when a user selects a particular one, the video is played on a different screen. In our case, we are going to define an Activity that does the preloading, then when a user clicks on the play video `Button`, He/she is navigated to another activity where the video plays.

Create an empty activity (mine will be called `FirstActivity`).

In its layout, create a single button.

![Play Button](/engineering-education/preloading-and-buffering-videos-in-android-with-exoplayer/demo1.png)

> In a more complex scenario, you may have a `RecyclerView`.

#### FirstActivity Logic
First of all, let's define a variable that will hold the URL for the video which we'll be caching.

```kotlin
private val videoUrl = "VIDEO_URL"
```

Then define a method that will schedule our preloading work:

```kotlin
private fun schedulePreloadWork(videoUrl: String) {
    val workManager = WorkManager.getInstance(applicationContext)
    val videoPreloadWorker = VideoPreloadWorker.buildWorkRequest(videoUrl)
    workManager.enqueueUniqueWork(
        "VideoPreloadWorker",
        ExistingWorkPolicy.KEEP,
        videoPreloadWorker
    )
}
```

#### Explanation
The `schedulePreloadWork` function does the instantiation `WorkManager` and passes the URL of the video to be cached. We then queue the work and add an `ExistingWorkPolicy.KEEP` policy. If there is existing pending (uncompleted) work with the same unique name, do nothing.  

In our FirstActivity's `onCreate` method, we'll invoke the `schedulePreloadWork` method and pass the `videoUrl`. Also, set an `OnClickListener` to the button, so that we can navigate to `MainActivity` carrying the URL of the video that will be played.

### Step 7 - Playing the video
For MainActivity, let's define the same variables that we had defined, in the Worker Class.

```kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var mHttpDataSourceFactory: HttpDataSource.Factory
    private lateinit var mDefaultDataSourceFactory: DefaultDataSourceFactory
    private lateinit var mCacheDataSourceFactory: DataSource.Factory
    private lateinit var exoPlayer: SimpleExoPlayer
    private val cache: SimpleCache = VideoApp.cache

    ...
```

Initialize the variables inside the `onCreate` method:

```kotlin
val videoUrl = intent.getStringExtra("VIDEO_URL")

mHttpDataSourceFactory = DefaultHttpDataSource.Factory()
    .setAllowCrossProtocolRedirects(true)

this.mDefaultDataSourceFactory = DefaultDataSourceFactory(
    applicationContext, mHttpDataSourceFactory)

mCacheDataSourceFactory = CacheDataSource.Factory()
    .setCache(cache)
    .setUpstreamDataSourceFactory(mHttpDataSourceFactory)
    .setFlags(CacheDataSource.FLAG_IGNORE_CACHE_ON_ERROR)
```

We will initialize `exoPlayer` and pass a `CacheDataSourceFactory` as its default media source factory. We then parse our video URL and pass it to the `MediaSource`.

```kotlin
exoPlayer = SimpleExoPlayer.Builder(applicationContext)
    .setMediaSourceFactory(DefaultMediaSourceFactory(mCacheDataSourceFactory)).build()
 
val videoUri = Uri.parse(videoUrl)
val mediaItem = MediaItem.fromUri(videoUri)
val mediaSource =
ProgressiveMediaSource.Factory(mCacheDataSourceFactory).createMediaSource(mediaItem)
```

We then bind our `exoPlayer` to the `playerView` in the `activity_main.xml` and set some properties to `exoPlayer` such as to play when ready, to seek to `(0,0)` and also give it the `MediaSource`.

```kotlin
binding.playerView.player = exoPlayer
exoPlayer.playWhenReady = true
exoPlayer.seekTo(0, 0)
exoPlayer.setMediaSource(mediaSource, true)
exoPlayer.prepare()
```

### Demo
That's all. When you run the app, you should expect something similar to this:

![Demo Gif](/engineering-education/preloading-and-buffering-videos-in-android-with-exoplayer/demo.gif)

### Conclusion
In this tutorial, we learned what video preloading and precaching are. We have used Exoplayer and Workmanager to schedule background work that preloads a video before it is played.

You can go ahead and implement this knowledge in your media app. For a full code implementation, check out this [GitHub repository](https://github.com/codewithjudy/VideoPreLoadingExoplayer).

Happy coding!

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
