#### RxJava in Android
ReactiveX has created libraries for almost all programming languages. It has also extended this to frameworks like Android. This has helped bring the functional reactive paradigm to the languages and frameworks we use. In Android, it helps bring efficiency in application performance. It also ensures a clean and maintainable code. This article will go through the basics of RxJava and how to use it in Android development.

#### Prerequisites
To follow through this article, you need :
* Android Studio installed
* Basic understanding of Android development using Kotlin
* Experience with retrofit and room

#### What we'll look at :
1. [Observables](#Observables)
    * [observable](#observable)
    * [flowable](#flowable)
    * [single](#single)
    * [completable](#completable)

2. [Schedulers](#Schedulers)
    * [newThread](#newThread)
    * [io](#io)
    * [computation](#computation)
    * [mainThread](#mainThread)

3. [Application in Android](#Application-in-Android)
    * [retrofit](#retrofit)
    * [room](#room)


#### Observables
RxJava, like the other ReactiveX libraries, uses the observable pattern. This pattern involves an `observer` who subscribes to an `observable`. The observer then receives data emitted by the observable and performs actions on it. An observable is an object or entity that emits data. We have five types of observers in RxJava, but we will look at only four. This is because the `Maybe` observable is not encouraged in Android applications. These observables have some standard methods in their classes to help in managing the emissions. The methods are `onNext`, `onCompleted`, `onSuccess` and `onError`.

- **_onNext_** - the observable invokes this method when data when it receives data. The result contains data that has it has received. It is available in observable and flowable types since they can emit data more than once.

- **_onSuccess_** - as the name states, it is called when an operation is successful. It is mostly used in `single` observables since they emit data only once.

- **_onCompleted_** - observables call this method once it finishes emitting data or doing a task. It is available in all observable types.

- **_onError_** - this is called when an error occurs. It emits a `Throwable` through which a developer can get the error details.


##### `observable`
This is the primary type of observable. It emits data as it receives it. It can be data from a collection like a list or a map. It has the `onNext`, `onError`, and `onCompleted` methods. It calls the onCompleted once onNext emits that last piece of data.

##### `flowable`
Flowable works the same way as an observable but with one extra capability. It is backpressure-aware. Sometimes the observable may emit data at a faster rate than the observer can consume. This can cause the application to crash or get an OOM (Out Of Memory) exception. Due to this, we use the flowable observable, which handles backpressure on behalf of the developer. A common way to get a backpressure issue is when loading a massive list of data from a local database.

##### `single`
This is another observable which emits data only once, as the name suggests. It does not have the onNext callback since it emits data once. It has the onSuccess instead. It emits the single piece of data in that callback. It is best used when making network calls or retrieving a single entity from a local database.

##### `completable`
This observable does not emit any data, and so it does not have the `onNext` or `onSuccess` callbacks. We use it to check the completion of a specific action by calling the onCompleted function. It is used for tasks like writing to a local database, uploading an image to a server, etc.

#### Schedulers
ThThreading is a crucial factor to consider when creating an application. One needs to handle operations on threads carefully. In Android, we have the main thread and UI thread, which do most of the work. It is therefore not advisable to run extra operations like network calls on them. RxJava comes in handy to manage how we deal with threads as we add observers to the application. Schedulers allow us to define where to perform actions and where to receive the data from observables. To specify where an event is to occur, we call the `subscibeOn` method and pass in the thread. We have several options to pass into the subscibeOn method. They are :

##### `newThread`
We call `Schedulers.newThread()` to specify that the task is to be done on a new thread. This creates a new thread dedicated to that specific task. However, it should be done carefully to prevent having many threads created and running at the same time. That leads to low performance and high CPU usage by the application.

##### `io`
This creates a new thread that does tasks that do not require a lot of computational power. The observable can also reuse these threads, and if none is available, it creates a new one. We call the `Schedulers.io()` to specify this scheduler to be used. It handles tasks like making network calls and file system tasks.

##### `computation`
Computation works in the same way as the io scheduler, only that we use it for CPU intensive work. However, it creates a limited number of threads according to the number of cores in the Android device. We use it for tasks like reading local databases, and should be used carefully. Due to the limited number of threads, if a job finds all the threads in use, it has to wait for them to finish the current tasks. Observables use `Schedulers.computation()` to run tasks using this scheduler.

##### `mainThread`
This is not a scheduler available in RxJava but is found in RxAndroid. It deals explicitly with Android-based threads like the UI thread and the main thread. You should, however, use it only when observing the data rather than running the task. To define where the scheduler should emit the data, we call the `observeOn()` method and pass it into the scheduler. So to observe data on the main thread, we call `observeOn(AndroidSchedulers.mainThread())`. Notice that the method resides in the AndroidSchedulers class and not the original `Schedulers` class.

#### Application in Android
In Android applications, we normally define on which thread the task will run and where to receive the data. And to get the data, we call the   `subscribe` method. It gives us either the emitted data or the throwable. The code structure resembles the one below.

```Kotlin
observable
  .subscibeOn(Schedulers.io())
  .observeOn(AndroidSchedulers.mainThread())
  .subscribe(
    { // it = emitted data},
    { // it = throwable})
```

You can also define other methods for fallback mechanisms. For instance, you can call the `doOnError` method to specify what action to be taken once an error is received. RxJava is widely used in Android in that most libraries come in with RxJava support. This means we can attach RxJava observables to the various operations in the libraries. We will look at how to use the integrated RxJava support in Retrofit and Room. You can find the source code for the tutorial on [Github](https://github.com/LinusMuema/kotlin/tree/rx-android). Go ahead and clone it to follow through.

##### retrofit
We use retrofit to make network calls in Android applications. It has support for RxJava so we can observe data from the network. There is an adapter that converts the Retrofit calls to RxJava observables. We add the support library in the app-level *build.gradle*.

```gradle
// RxJava retrofit support
implementation 'com.squareup.retrofit2:adapter-rxjava2:2.8.1'
```

You only need to add it when initializing retrofit. We also initialize the RxJava call adapter with a Scheduler. This is because all network calls are not CPU intensive, so we use the `io` scheduler. We do not need to define the scheduler when getting the data. We define the return of our retrofit calls as `Single` since we get one entity.

```kotlin

// In the Service.kt file
Retrofit.Builder()
  ...
  .addCallAdapterFactory(RxJava2CallAdapterFactory.createWithScheduler(Schedulers.io()))
  ...
  .build()

// In the Endpoints.kt file
@GET("/users")
fun getUsers(): Single<Users>

```
##### room
AndroidX Room also has support for RxJava. It helps us create observables for the actions performed on the local database. With Room, you need to be careful as getting huge lists of data requires more computation power. In the application, once we get data from the network, we save it to the database. Once data insertion is successful, we send a Toast to the user to notify them. We observe completion using completable. The support library is added using the dependency below.

```gradle
//RxJava room support
implementation "androidx.room:room-rxjava2:2.2.5"
```

Then in the `Dao.kt` file, we insert the entire list of data and check for completion. Then, once the `Room` button is clicked, we get one random `User` item from the local database's data. We use Single since we are getting only one value.

```kotlin
// In the Dao.kt file
@Query("SELECT * FROM user WHERE id=:id")
fun getOneUser(id: Int): Single<List<User>>

@Insert(onConflict = OnConflictStrategy.REPLACE)
fun addUsers(users: Users): Completable
```

And those are some of the ways to integrate RxJava to the common tasks in the application. But there is a new word in the `MainViewModel` file, i.e., `CompositeDisposable`. A compositedisposable holds multiple disposables. When we subscribe to an observer, we create a disposable. A disposable is a link between the observable and the observer. This disposable needs to be destroyed if it is no longer in use. If not disposed, it leads to memory leaks, which is very bad for an application. We dispose them using the `.dispose()` method. The preferred time to dispose them is after the activity is destroyed. Once an activity is destroyed, the `onCleared` method in the viewmodel is called. So in that method is where we dispose our disposables. But what if we had 100 disposables. It would lead to 100 statements from clearing each disposable. That is where compositedisposables come in. Once a compositedisposable is disposed, all the disposables in it are also disposed. So we use it to hold all our disposables and have only one method call to clear all our disposables.

#### Conclusion
With that, you have the basics of RxJava and some of its observables. You can see how the code is clean and readable. It also ensures better thread management to avoid memory leaks that were available in Async tasks. Go ahead and clone the repo to try out different observables. An insallation package for the demo application can be found on [Google Drive](https://drive.google.com/file/d/1hW3fXiUErFSNzMSB4ZahTcnvUgK92Stg/view?usp=sharing). Next up we will look at the different RxJava operators and their different roles.
