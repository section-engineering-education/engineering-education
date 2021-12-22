#### Implementing Pre-Loading and Buffering Videos in Android with ExoPlayer
Just like Youtube App, it is the wish of every Android Developer to understand how a video can be loaded so that a user doesn't have to wait while a video is loading.

### Table of contents
- [Prerequisites](#prerequisites)
- [What is Video Preloading and Buffering](#what-is-video-preloading-and-buffering)
- [Getting Started](#getting-started)
- [Creating an Android Project](#step-1---creating-an-android-project)
- [Setting Up the Project](#step-2---setting-up-the-project)
- [Creating a User Interface](#step-3---creating-a-user-interface)
- [Creating a Base Application Class](#step-4---creating-a-base-application-class)
- [Creating a Video Preloading Worker](#step-5---creating-a-video-preloading-worker)
- [PreCaching](#step-6---precaching)
- [Playing the Video](#step-7---playing-the-video)
- [Demo](#demo)
- [Conclusion](#conclusion)

### Prerequisites
To follow along with this tutorial, the reader should:
- Have good knowledge in creating Android Apps.
- Good knowledge of Kotlin Programming language.
- An understanding of using Work manager.
- Some knowledge in using Kotlin Coroutines.
- Basic knowledge of ViewBinding.

### What is Video Preloading and Buffering
Buffering occurs in video streaming when the software downloads a particular amount of data before beginning to play the video. While the next section of the file downloads in the background, you may see the data stored in the buffer. Before the consumer opens the video, it can be loaded and cached. When the user finally decides to watch the video. It's simply for fun. ExoPlayer is a library developed by Google. 

### Getting Started
In this tutorial, we will create a simple app that displays a video from the internet and caches it before the user views it.

### Step 1 - Creating an Android Project
Launch your Android Studio and create an empty project

![New Android App](section-engineering/implementing-preloading-and-buffering-videos-in-android-with-exoplayer/create_app.png)

### Step 2 - Setting Up the Project
In this step, we will add the necessary dependencies so that we can proceed.

```Gradle
def exoplayer_version = "2.16.1"
implementation "com.google.android.exoplayer:exoplayer:$exoplayer_version"
implementation "com.google.android.exoplayer:exoplayer-ui:$exoplayer_version"

def work_version = "2.5.0"
implementation "androidx.work:work-runtime-ktx:$work_version"
```

> While still in your app-level `build.gradle` enable `viewBinding`

> In your Manifest file, add Internet permission

### Step 3 - Creating a User Interface
In `activity_main.xml` Design a simple layout that will contain a `PlayerView`

```Xml
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

![Demo2](section-engineering/implementing-preloading-and-buffering-videos-in-android-with-exoplayer/demo2.png)




#### Explanation
We have defined the cache size that our app will use. Also, we have defined the cache evictor which clears our cache,`ExoDatabaseProvider`, and passed all of them inside our `cache` instance.


### Step 5 - Creating a Video Preloading Worker
Here, we create a Worker class from the Workmanager library that will do the preloading and precaching work in the background.

```Kotlin
class VideoPreloadWorker(private val context: Context, workerParameters: WorkerParameters) :
    Worker(context, workerParameters) {

    private var videoCachingJob: Job? = null
    private lateinit var mHttpDataSourceFactory: HttpDataSource.Factory
    private lateinit var mDefaultDataSourceFactory: DefaultDataSourceFactory
    private lateinit var mCacheDataSource: CacheDataSource
    private val cache: SimpleCache = VideoApp.cache
    
    ...
}        
```

Inside the class, define a companion object that will contain a method for receiving arguments from where the Worker class will be instantiated.

```Kotlin
companion object {
    const val VIDEO_URL = "video_url"
        
    fun buildWorkRequest(yourParameter: String): OneTimeWorkRequest {
        val data = Data.Builder().putString(VIDEO_URL, yourParameter).build()
        return OneTimeWorkRequestBuilder<VideoPreloadWorker>().apply { setInputData(data) }
        .build()
    }
}
```

For the video caching logic, let's define two methods that will make that work

```Kotlin
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
        CacheWriter(
            mCacheDataSource,
            mDataSpec,
            null,
            mProgressListener,
        ).cache()
    }.onFailure {
        it.printStackTrace()
    }
}
```

#### Explanation
The first function `preCacheVideo` -  takes in a video url and passes it into a `DataSpec` which defines a region of data in a resource. Also, we have defined a `CacheWriter.ProgressListener` that receives progress updates during cache operations. Finally, inside the function, we do the video caching job that runs inside a Coroutine `GlobalScope` and calls the caching method.

The second function `cacheVideo` - does the caching of the video with the help of a caching-related utility method - `CacheWriter`.


After defining the two methods, inside the `doWork` method, we do initializations and call our `preCacheVideo` function.

```Kotlin
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

### Step 6 - PreCaching
When pre-caching a video, it is good to do it in a different `Activity` or `Fragment`. So that when the user navigates to the actual Destination, he/she finds the video is ready. Like on youtube, videos are displayed in a list, when a user selects a particular video, that when they are navigated to a different screen, where the video now plays. In some cases, other developers prefer displaying thumbnails of videos in a recyclerview, then when a user selects a particular one, the video is played on a different screen.

In our case, we are going to define an Activity that does the preloading, then when a user clicks on the play video `Button`, He/she is navigated to another activity where the video plays.

Create an empty activity (mine will be called `FirstActivity`)  

In its layout, just create a single button.

![Demo1](section-engineering/implementing-preloading-and-buffering-videos-in-android-with-exoplayer/demo1.png)

> In real life you may have a recyclerview.

#### FirstActivity Logic

First of all, let's define a variable that will hold the URL for the video which we'll be caching

`private val videoUrl =
        "https://firebasestorage.googleapis.com/v0/b/testi-30703.appspot.com/o/Android%20Kotlin%20Developer%20-%20Wake%20Up%2C%20Aleks!%201.mkv?alt=media&token=251ab4ab-284c-4820-9d5c-09d656bc8739"`

Then define a method that will schedule our preloading work

```Kotlin
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
The `schedulePreloadWork` function does the instantiation `WorkManager` and passes the url of the video that is to be cached. We then enqueue the work and add an `ExistingWorkPolicy.KEEP` policy. If there is existing pending (uncompleted) work with the same unique name, do nothing.  


In `onCreate`, we'll invoke the `schedulePreloadWork` method and pass our `videoUrl`. Also, set an `OnClickListener` to the button, so that we can navigate to `MainActivity` carrying the url of the video that will be played.

### Step 7 - Playing the Video
For MainActivity, let's define the same variables that we had defined, in the Worker Class.

```Kotlin
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private lateinit var mHttpDataSourceFactory: HttpDataSource.Factory
    private lateinit var mDefaultDataSourceFactory: DefaultDataSourceFactory
    private lateinit var mCacheDataSourceFactory: DataSource.Factory
    private lateinit var exoPlayer: SimpleExoPlayer
    private val cache: SimpleCache = VideoApp.cache

    ...


```

Inside the `onCreate` method:

You will receive the Url of the video

`val videoUrl = intent.getStringExtra("VIDEO_URL")`

We will then do the initialization of the variables

```Kotlin
mHttpDataSourceFactory = DefaultHttpDataSource.Factory()
    .setAllowCrossProtocolRedirects(true)

this.mDefaultDataSourceFactory = DefaultDataSourceFactory(
    applicationContext, mHttpDataSourceFactory)

mCacheDataSourceFactory = CacheDataSource.Factory()
    .setCache(cache)
    .setUpstreamDataSourceFactory(mHttpDataSourceFactory)
    .setFlags(CacheDataSource.FLAG_IGNORE_CACHE_ON_ERROR)
```

To our `exoPlayer` we will initialize it and pass a `CacheDataSourceFactory` as its default media source factory. We then parse our video Url and pass it to the `MediaSource`.



We then bind our `exoPlayer` to the `playerView` in the `activity_main.xml`. We then set some properties to `exoPlayer` such as to play when ready, to seek to `(0,0)` and also give it the `MediaSource`.

```Kotlin
binding.playerView.player = exoPlayer
exoPlayer.playWhenReady = true
exoPlayer.seekTo(0, 0)
exoPlayer.setMediaSource(mediaSource, true)
exoPlayer.prepare()
```
### Demo
That's all, when you run the app, you should be having something similar to this:

![Gif](section-engineering/implementing-preloading-and-buffering-videos-in-android-with-exoplayer/demo.gif)

### Conclusion
In this tutorial, we have understood what preloading and precaching are. We went ahead and implemented a simple app that preloads video Url. With this knowledge, go ahead and implement it in your media app.

For the full implementation of the code, check out this Github repository [VideoPreLoadingExoplayer](https://github.com/JoelKanyi/VideoPreLoadingExoplayer)
