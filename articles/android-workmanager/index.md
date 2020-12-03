### Introduction
Background work has been a core part in android application development for a long time now. This is because it allows for the execution of tasks without any interference to and from the user interface. But implementing such tasks is not an easy task. One has to consider resources like threads and when to start running the task. Some tasks may even require running at time intervals. Several solutions have come up like `IntentServices` and `JobScheduler` which help in execution of these tasks. But they too come with their challenges like chaining tasks and setting constraints. This is where WorkManager comes in to help.

### What is WorkManager
This is an AndroidX library that helps in running tasks asynchronously. It ensures that the work is done even if the user exits the app or the device restarts. It makes use of the existing job services to do the work. This means that it can support devices up to API level 14. Running background tasks is made easier using WorkManager and has other awesome perks too:

* **constraints**: with WorkManager, you can easily set conditions to be met for the task to be run
* **chaining**: you can easily tie multiple tasks to be run at the same time or one after another
* **threading**: like most AndroidX libraries, it comes with support for `coroutines` and `rxjava` for better thread management
* **work execution**: you have two options to define how the work is executed i.e either once or periodically.

In a normal WorkManager setting, you have three parts:
1. **_the work definition_**: this is where you define the task to be done or rather, the job
2. **_the work creation_**: you create the job and set constraints to it. You may create it as a one time job or one that runs at an interval.
3. **_queueing the work_**: you use the `WorkManager` instance to start/launch your job.

### Prerequisites
In order to comfortably follow through, you will need:
* Android Studio installed
* Knowledge of Android application development
* Basic understanding of the AndroidX Room library
* Basic information of the Kotlin programming language

This article will go through how to get started with WorkManager and how to use it as well as what classes are involved. The final code for this tutorial is available on [Github](https://github.com/LinusMuema/kotlin/tree/workManager). Use it as a reference to follow through the article.

Let's get to it.

### Step 1 - Setting up the project
Create an android application and give it a name of your choice. Use the `Empty Activity` template.

After gradle build finishes, add the following dependencies in the app-level `build.gradle` file

```gradle
//Room
kapt 'androidx.room:room-compiler:2.2.5'
implementation 'androidx.room:room-runtime:2.2.5'
implementation 'androidx.room:room-rxjava2:2.2.5'

// WorkManager
implementation 'androidx.work:work-runtime-ktx:2.4.0'
```

**NOTE: _Don't forget to add `kotlin-kapt` as a plugin on the top of the gradle file._**

Click `sync` to download the new dependencies and sync them to your project.

The application follows a basic `MVVM architecture` approach so go ahead and create a ViewModel class for your `MainActivity` class. You can go ahead an download [this](https://github.com/LinusMuema/kotlin/blob/workManager/app/src/main/java/com/moose/androidkt/data/Data.kt) file or copy it's code and add it to your application. The code is in charge of generating random data for us.

The Room database is also setup in the [db package](https://github.com/LinusMuema/kotlin/tree/workManager/app/src/main/java/com/moose/androidkt/db). You can read more about Room in [this article](/engineering-education/android-room)

### Step 2 - Defining our work
Create a new package and name it `work`. In here we will place our jobs or work.

Add a new Kotlin class named `Work` and add the following code.

```Kotlin
class Work(context: Context, params: WorkerParameters): Worker(context, params) {

}
```

A worker class holds the tasks to be run by our job. Here is where we define our specific tasks. The class receives `Context` and `WorkerParameters` as parameters. There is one method that needs to be implemented i.e the `doWork` method.

```Kotlin
    override fun doWork(): Result {}
```

This method runs our job on a different thread provided by WorkManager. The return type is `ListenableWorker.Result` which informs WorkManager the state of the job/work. Go ahead and add the implementation of the work in the `doWork` method.

```Kotlin
private val dao = AppDatabase.getDatabase(context).dao()
private val composite = CompositeDisposable()

override fun doWork(): Result {
    return try {
        composite.add(dao.addUsers(Data.getUser()).subscribeOn(Schedulers.io()).subscribe())
        Result.success()
    }
    catch (e: Exception){
        Result.failure()
    }
}

override fun onStopped() {
    super.onStopped()
    composite.dispose()
}
```

First, we initialise the Room Dao and pass in the context available during the work execution. Then we create a `CompositeDisposable` that holds the disposables created during our job execution. We dispose it in the `onStopped` method when the work is stopped. To read more about RxJava in Android, you can go through [this article](/engineering-education/rxjava-android)

We then use a try-catch block to execute our job i.e get a user and save them to our Room database. If any error occurs, the catch block returns a `Result.failure()` otherwise, we return a `Result.success()`

And with that, our work is ready to go!

### Step 3 - Scheduling the work

### Step 4 - Finishing up

### Conclusion
