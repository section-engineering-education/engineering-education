---
layout: engineering-education
status: publish
published: true
url: /android-workmanager/
title: Basics of Android Workmanager
description: This article goes through the basics of Andriod workmanager, which is an AndroidX library that helps in running tasks asynchronously. It ensures that the work is done even if the user exits the app or the device restarts.
author: linus-muema
date: 2020-12-15T00:00:00-17:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/android-workmanager/hero.jpg
    alt: Android work manager image
---
Background work has been a core part of Android application development for a long time. This is because it allows the execution of tasks without any interference with the user interface. However, implementing such functionality is not an easy task. One has to consider resources such as threads and when to start running the task.
<!--more-->
### Introduction
Some tasks may even require running at time intervals. Several solutions have come up. A couple of these solutions are `IntentServices` and `JobSchedulers`. But they too come with their challenges like chaining tasks and setting constraints. This is where `WorkManager` comes in to help.

### What is WorkManager
This is an AndroidX library that helps in running tasks asynchronously. It ensures that the work is done even if the user exits the app or the device restarts. It makes use of the existing job services to do the work. This means that it can support devices up to API level 14. `WorkManager` makes running background tasks easier and gives other awesome perks such as:

- **constraints**: with `WorkManager`, you can easily set conditions that should be met for the task to run.
- **chaining**: you can easily tie multiple tasks to run at the same time or one after another.
- **threading**: like most AndroidX libraries, it comes with support for `coroutines` and `rxjava` for better thread management.
- **work execution**: you have two options to define the execution of work. i.e. either once or periodically.

In a normal `WorkManager` setting, you have three parts:
1. ***the work definition***: this is where you define the task or rather, the job.
2. ***the work creation***: you create the job and set constraints to it. You may create it as a one time job or one that runs at intervals.
3. ***queueing the work***: you use the `WorkManager` instance to start/launch your job.

### Prerequisites
To comfortably follow through, you will need:
- Android Studio installed.
- Knowledge of Android application development.
- Basic understanding of the AndroidX Room library.
- Basic information of the Kotlin programming language.

Let's get to it.

### Step 1 - Setting up the project
To get the starting code for this tutorial, clone the project from [GitHub](https://github.com/LinusMuema/kotlin/tree/workManager) and open it in Android Studio. Open the terminal in the IDE and run the following commands to rollback the project.

```bash
git checkout workManager
git checkout f1a4d683563ffe5c6eb00b3ea91353db0db2ca9a
```

After the gradle build finishes, add the following dependencies in the app-level `build.gradle` file.

```gradle
//Room
kapt 'androidx.room:room-compiler:2.2.5'
implementation 'androidx.room:room-runtime:2.2.5'
implementation 'androidx.room:room-rxjava2:2.2.5'

// WorkManager
implementation 'androidx.work:work-runtime-ktx:2.4.0'
```

***NOTE: Don't forget to add `kotlin-kapt` as a plugin on the top of the gradle file.***

Click `sync` to download the new dependencies and sync them to your project.

The application follows a basic `MVVM architecture` approach so go ahead and create a `ViewModel` class for your `MainActivity` class. You can go ahead an download [this](https://github.com/LinusMuema/kotlin/blob/workManager/app/src/main/java/com/moose/androidkt/data/Data.kt) file or copy it's code and add it to your application. 

The code is in charge of generating random data for us.

The Room database is also set up in the [db package](https://github.com/LinusMuema/kotlin/tree/workManager/app/src/main/java/com/moose/androidkt/db). You can read more about Room in [this article](/introduction-to-room-db).

### Step 2 - Defining our work
Create a new package and name it `work`. In here we will place our jobs or work.

Add a new Kotlin class named `Work` and add the following code.

```Kotlin
class Work(context: Context, params: WorkerParameters): Worker(context, params) {

}
```

A worker class holds the tasks to be run by our job. The class receives `Context` and `WorkerParameters` as parameters. There is one method that needs to be implemented i.e. the `doWork` method.

```Kotlin
    override fun doWork(): Result {}
```

This method runs our job on a different thread provided by `WorkManager`. The return type is `ListenableWorker.Result` which informs `WorkManager` the state of the job/work. 

Go ahead and add the implementation of the work in the `doWork` method.

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

First, we initialize the Room Dao and pass in the context available during the work execution. Then we create a `CompositeDisposable` that holds the disposables created during our job execution. We dispose it in the `onStopped` method when the work is done. To read more about `RxJava` in Android, you can go through [this article](/android-rxjava/).

We then use a try-catch block to execute our job, namely, to get a user and save them to our Room database. If any error occurs, the catch block returns a `Result.failure()` otherwise, we return a `Result.success()`.

With that, our work is ready to go!

### Step 3 - Scheduling the work
The next step is to register the work and set it rolling.

In our `ViewModel` class, we create a `WorkManager` instance and pass in a context.

```Kotlin
// WorkManager instance
private val manager = WorkManager.getInstance(application)
```

Then we create our constraints. These are conditions that need to be met for our work to be done. Constraints range from network availability to device's battery power. In our case, we will require the device's battery level to not be low and for the device to be connected to the internet.

```Kotlin
// Our work constraints
private val constraints = Constraints.Builder()
    .setRequiredNetworkType(NetworkType.CONNECTED)
    .setRequiresBatteryNotLow(true)
    .build()
```

You can explore more constraints by checking the `Constraints.java` file available in the library.

***NOTE: To access the library file and other core framework files, hold the `ctrl`/`cmd` key and click the `Constraints` object.***

The only thing remaining is creating the work and setting the constraints. As mentioned earlier, there are two types of jobs in `WorkManager`.

#### 1. One time work
This is a work/job that is run only once. It is created using the `OneTimeWorkRequest` class that takes one parameter, i.e. our worker class. We create one in our code and name it `oneTimeWorker`. We set constraints using the `.setConstraints()` method and pass in our constraints.

```Kotlin
  // Define OneTime work
  private val oneTimeWorker = OneTimeWorkRequest.Builder(Work::class.java)
      .setConstraints(constraints)
      .build()
```

#### 2. Periodic work
Sometimes we may need the work to be run in intervals. In this case, we use the `PeriodicWorkRequest` class. This takes in three parameters, known as our worker class, the interval, and the `TimeUnit`. 

Add the following code.

```Kotlin
// Define Periodic work
private val periodicWork = PeriodicWorkRequest.Builder(Work::class.java, 15, TimeUnit.MINUTES)
    .setConstraints(constraints)
    .build()
```

We set our time interval to 15 minutes. This is the minimum interval defined in the [documentation](https://developer.android.com/reference/kotlin/androidx/work/PeriodicWorkRequest).

To start our work, we pass in the defined work into the `WorkManager` instance we created. We call the `enqueue()` method and pass in our work. Since we have multiple jobs defined, we can pass in a list of jobs as a parameter. Create a function called `startWork()` and add the following code.

```Kotlin
fun startWork(){
    manager.enqueue(listOf(oneTimeWorker, periodicWork))
}
```

This starts the work for us provided the constraints are met.

Sometimes you may want to chain work, or start with one job and after completion, begin a second job. Then we can make use of `beginWith()` and `then()` methods. 

Each of these methods receive one job as a parameter. They however receive work of `OneTimeWorkRequest` type only. So periodic work cannot be used in a chain.

### Step 4 - Finishing up
Now that we have our work completely set up. You can go ahead and follow through the repository to check the UI setup.

Once the application starts, it calls the `startWork` function that starts our work. This starts both the `oneTimeWork` and `periodicWork`. The one time work completes immediately and adds one user to the Room database. 

The `periodicWork` also starts by adding one user to the database and another user after 15 minutes. After 2 hours, the `periodicWork` will have added 8 users. On the first run the application should show 2 users. One from the `oneTimeWork` and another from the `periodicWork`.

### Conclusion
With that, you have the basic information about `WorkManager`. As you can see, it makes it easier to schedule background tasks. You are able to run tasks like network calls even if the application closes. 

A good use case could be backing up data on a different network like cloud services. This can be done when some constraints are met and you have the assurance of your work being done. Feel free to raise a PR or an issue with any updates.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
