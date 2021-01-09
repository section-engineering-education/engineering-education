---
layout: engineering-education
status: publish
published: true
url: /engineering-education/threading-workmanager/
title: Threading in WorkManager
description: This article goes through how `WorkManager` manages threading and how to use the RxJava and Coroutines libraries in WorkManager using Kotlin.
author: linus-muema
date: 2021-01-05T00:00:00-12:00
topics: []
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/threading-workmanager/hero.png
    alt: Threading in WorkManager image example
---
Threading is a critical area in Android that every developer must be well informed in. Thread management determines how an application uses the devices resources. This ultimately affects the general performance of an application.
<!--more-->
### Introduction
In `WorkManager`, threading is vital as it determines whether it will execute our work to completion.  This article goes through how `WorkManager` manages threading and how to use the RxJava and Coroutines libraries in `WorkManager`.

### Prerequisites
- Have Android studio installed.
- Experience in Android application development using Kotlin.
- Basic understanding of the `WorkManager` library. You can go through [this article](/engineering-educaion/android-workmanager) to get up to speed.
- Experience using RxJava and Coroutines.

### Threading in Worker class
In a normal workmanager setting, we make use of the `Worker` class to execute our background task. Under the hood, this class makes use of a special background thread from the `Executor` class. This however has one downside, the `doWork()` is a synchronous method. This means that if you had several operations, they are executed one after the other, i.e. the operations block the next operation until they are complete. 

Take the example below:
```kotlin
val users = api.getUsers()
database.saveUsers(users)
return Result.success()
```

We first get data from an network source, save it to a database and return a result. This is not efficient as sometimes the result may be returned before all our tasks are done. Especially if the tasks are long running. This is where rxjava and coroutines come in to help. They bring the aspect of asynchronous operations in our workmanager.

### Getting started
To get the starting code for this tutorial, clone [this repository](https://github.com/LinusMuema/kotlin) from Github and open it in Android studio.

Open the terminal in the IDE and run the following commands.

```bash
git checkout workmanager-threading
git checkout 36ce58e7bad912efbd3a3aba2a630738def9db5e
```

### Using RxJava with WorkManager
`WorkManager` has support for RxJava. We can use RxJava observables in our tasks. To use RxJava, we make use of the `RxWorker` class. This class makes use of a background thread, i.e. it is subscribed on a background thread. It is however started on the main thread. 

Another advantage of using RxJava is that we do not need to dispose our observables manually. Once the work is stopped or completed, disposing of the subscription is taken care of automatically.

Go ahead and create a class named `RxWork` in the `work` directory of the project. Make the class extend `RxWorker` and pass in the required arguments.

```kotlin
class RxWork(context: Context, params: WorkerParameters): RxWorker(context, params) {

}
```

We will be getting a user from a data source and saving them to a local database. So override the `createWork` method and add the code below.

```kotlin
override fun createWork(): Single<Result> {
    val dao = AppDatabase.getDatabase(applicationContext).dao()

    return Data.getRxUser(inputData.getInt("USER_ID", 0))
        .flatMap {
            dao.addRxUser(it)
                .toSingleDefault(Result.success())
                .onErrorReturn{ Result.failure() }
        }
}
```

The method should return a `Single` containing the result of our work.

We get an instance of the database and use it to access the DAO. We then get a user from the `getRxUser` function. This function takes in an `Int` as an argument so we use the `inputData` method to get the data passed in `WorkManager`. We shall look at how to pass in data later in this article.

The `createWork` function returns a `Single` containing our user object. The `flatMap` operator is used to join our two observables. It passes the user object to the second function, which saves the user to the database and returns a `Completable`. We then convert the completable to a `Single<Result>` upon the completion of the operation and handle any errors accordingly.

### Using coroutines with WorkManager
Coroutines work differently from RxJava. The coroutines support is included in the `WorkManager` runtime dependency so no need to add any extra dependencies. To create work that runs on coroutines, you make use of the `CoroutineWorker` class. This runs our work on the `Dispatchers.Default` thread.

In the same work package, create a class named `CoroutineWork` and make it extend `CoroutineWorker`. Then pass in the required arguments.

```kotlin
class CoroutineWork(context: Context, params: WorkerParameters):CoroutineWorker(context, params) {

}
```

In this class, we override the `doWork` method. But this time, the method is a `suspend` function.

```kotlin
override suspend fun doWork(): Result {
    val dao = AppDatabase.getDatabase(applicationContext).dao()
    return try {
        val user = Data.getCoroutineUser(inputData.getInt("USER_ID", 0))
        dao.addCoroutineUser(user)
        Result.success()
    }catch (e: Exception){
        Result.failure()
    }
}
```

With coroutines, the lines of code are fewer and much more readable. The `dao.addCoroutineUser(user)` block waits for the first block to execute, hence it is not skipped. To change the default dispatcher, you can make use of the `withContext` method.

```kotlin
override suspend fun doWork(): Result {
    val dao = AppDatabase.getDatabase(applicationContext).dao()
    return withContext(Dispatchers.IO){
        try {
            val user = async { Data.getCoroutineUser(inputData.getInt("USER_ID", 0)) }
            dao.addCoroutineUser(user.await())
            Result.success()
        }catch (e: Exception){
            Result.failure()
        }
    }
}
```

Here, we define that the work should run on the IO thread. We get the data on a different thread and once the user is retrieved, we save them to the database and return our result.

### Passing data to WorkManager
We can pass in data to our worker classes in `WorkManager`. It accepts the data of type `Data` as described [here](https://developer.android.com/topic/libraries/architecture/workmanager/advanced#params). Data accepts values in key-value pairs. So, in our `MainActivityViewmodel` class, add the following code to generate the data we will pass into our worker classes.

```kotlin
// Create our data
private fun getData() = Data.Builder().putInt("USER_ID", (9999..99999).random()).build()
```

***NOTE: Data only accepts values less than 1024 bytes. You should only use it to pass small data values otherwise, retrieve the data inside the worker class instead.***

Then in the same class, add the following code to create our work.

```kotlin
// Work using RxJava
private val rxWork = PeriodicWorkRequestBuilder<RxWork>(15, TimeUnit.MINUTES)
    .setInputData(getData())
    .build()

// Work using coroutines
private val coroutinesWork = PeriodicWorkRequestBuilder<CoroutineWork>(15, TimeUnit.MINUTES)
    .setInputData(getData())
    .build()
```

We then enqueue our work using the `WorkManager` instance.

```kotlin
fun startWork(){
    manager.enqueue(listOf(rxWork, coroutinesWork))
}
```

Once you run your application, you should see two users on the screen as the first results from the two jobs.

![demo](/engineering-education/threading-workmanager/demo.png)

### Conclusion
We just went over how you use RxJava or Coroutines in `WorkManager`. You can go ahead and explore the various RxJava operators and Kotlin flow in your application. All the `Worker`, `RxWorker` and `CoroutineWorker` classes derive from the `ListenableWorker` class. This class does not handle any threading and so it would not be advisable to use it. 

You can it use to handle a callback based operation where you define your threading mechanism. Otherwise, just choose from the three available classes. Go ahead and raise a PR or issue in the [Github](https://github.com/LinusMuema/kotlin/tree/workmanager-threading) repository for any suggestions and comments.

---
Peer Review Contributions by: [Peter Kayere](/engineering-education/authors/peter-kayere/)
