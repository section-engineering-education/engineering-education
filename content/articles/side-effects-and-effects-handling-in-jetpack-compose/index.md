---
layout: engineering-education
status: publish
published: true
url: /side-effects-and-effects-handling-in-jetpack-compose/
title: SideEffects and Effects Handling in Jetpack Compose
description: This tutorial will guide readers on how to use the Jetpack Compose EffectHandler APIs to manage side-effects and effects in Jetpack Compose.
author: samantha-namenya
date: 2021-12-10T00:00:00-09:00
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/side-effects-and-effects-handling-in-jetpack-compose/hero.png
    alt: Side-Effects and Effects Handling in Jetpack Compose Hero Image
---
A side effect is anything that escapes the scope of a function. In Jetpack Compose, it refers to the content inside a composable function.
<!--more-->
To handle such effects, we use an `EffectHandler` which is a safe environment.

### Prerequisites
To follow along with this tutorial, the reader should have:
- An understanding of the `Kotlin` programming language.
- A basic understanding and experience with [Jetpack Compose](https://developer.android.com/jetpack/compose) and the [composable lifecycle](https://developer.android.com/jetpack/compose/lifecycle).

### Goals
By the end of this tutorial, the reader will be able to:
- Understand side-effects, as well as how they occur.
- Create side-effect-free Composables.

### Introduction
Effects should be invoked from a controlled environment that is aware of the composable's lifecycle. These components are needed to modify the app's state.

The Effect APIs are used when you need to modify the state of the composable so that side effects are executed predictably. 

Let's get started and see how this happens.

### Side-Effects and how they occur
As discussed, a side-effect is anything that exists outside the scope of a composable function. 

Side effects can cause adverse effects to an app. This is because they can modify the application state beyond the scope of the composable. 

This implies that every time a composable function is invoked, it may respond differently.

Composable functions run several times or even skip execution. Therefore, relying on their global state can result in unexpected behavior.

Compose has several strategies for dealing with side effects. These techniques assist in managing the lifespan of side effects and removing them after they are no longer needed.

There are several ways we can perform side-effects in Compose.

### Effects handlers
To understand Effect handlers, we first need to know the `Compose` lifecycle.

Composables join the composition when rendered on the screen and depart when they are removed from the UI tree. On some occasions, effects may cross from one event to another. 

Effects may have long lifespans while others have shorter lifespans. This allows you to utilize them in many compositions.

Effect handlers can be divided into two:
- SuspendedEffect
- Non-Suspended side-effects

### SuspendedEffect
These are effects that may occur when we make long-running operations such as network calls inside a Composable. 

The popular techniques in this effect are `rememberCoroutineScope` and `launchedEffect`.

### LaunchedEffect
`LaunchedEffect` may be used to do tasks during the lifetime of a composable. The coroutine will self-destruct if the composable is no longer shown on the screen. This helps to avoid memory leaks.

In general, the `lauchedEffect` does the following: 
- When an effect enters composition, the `launchedEffect` executes it and clears it when it exits.
- When the key(s) changes, the effect is terminated and restarted.
- We can also use it to extend over a task in a composition.

Let's take a timer for example. We want this timer to start when the execution of a composable begins and stop when the composition ends. 

In such a scenario, we start the timer inside the `LaunchedEffect` block. When the composable exits, we don't have to bother about suspending or cleaning up timer-related code.

```kotlin
@Composable
fun Timer() {
    LaunchedEffect(key1 = Unit, block = {
        try {
            initTimer(2000) {
                Toast.makeText(this@MainActivity, "The timer ended", Toast.LENGTH_SHORT).show()
            }
        } catch(e: Exception) {
            Toast.makeText(this@MainActivity, "The timer was cancelled: $e", Toast.LENGTH_SHORT).show()
        }
    })
}

suspend fun initTimer(time: Long, onEnd: () -> Unit) {
    delay(timeMillis = time)
    onEnd()
}
```

In the `LaunchedEffect` part of the above code, the `initTimer()` function will show a toast message when the time completes, or when it's terminated.

The `LaunchedEffect` block takes `key1` and `block` parameters. When the value of the first argument `key1` changes, the `launchedEffect` is notified to start the coroutine afresh and destroy the old one.

The second parameter is `block`. It is a lambda that is executed when the `launchedEffect` is invoked. Suspend functions are executed inside this block.

### RememberCoroutineScope
In some special cases, `LaunchedEffect` is not used because of the following reasons: 
- A `launchedEffect` is composable by itself. As a result, it will always begin with some other composable function.
- Using `launchedEffect` limits the control of the coroutine lifecycle. There is no way to explicitly terminate the coroutine. This is because it starts and ends according to the composable lifecycle.

Due to these constraints, `rememberCoroutineScope` is preferred in such circumstances.

> `rememberCoroutineScope` generally returns a scope. This method produces a CoroutineScope that may be used to construct tasks that are part of the composition.

`rememberCoroutineScope` allows us to initiate coroutines from any composables or callbacks. This can be done without having to worry about the coroutine's lifespan.

```kotlin
@Composable  
fun Timer() {  
    val coroutineScope = rememberCoroutineScope()
        Button(onClick = {
            Toast.makeText(this@MainActivity, "The timer Started", Toast.LENGTH_SHORT).show()  
            coroutineScope.launch {
                try {
                    initTimer(2000) {
                        Toast.makeText(this@MainActivity, "The timer ended", Toast.LENGTH_SHORT).show()
                    }
                } catch (e: Exception) {
                    Toast.makeText(this@MainActivity, "The timer was cancelled: $e", Toast.LENGTH_SHORT).show()
                }
            }
        }) {
            Text("Start")
        }
}
suspend fun initTimer(time: Long, Finish : () -> Unit){
    delay(timeMillis = time)
    Finish()
}
```

The `rememberCoroutineScope()` method in the above code is used to access the scope. It's worth noting that the scope is linked to the lifespan of the composable. 

So, if any coroutine is executing when this composable exits, it will be stopped immediately.

When the button is clicked, the coroutine is launched. This will start the timer in 2 seconds. 

A toast will appear indicating that the timer has started. After 2 seconds, another toast appears indicating that the allocated time has ended.

> `LaunchedEffect` differs from `rememberCoroutineScope` in that it is used to scope tasks that are launched by the composition. 

`rememberCoroutineScope`, on the other hand, manages tasks that are started by user interaction.

### Non-Suspended effects
In Non-Suspended effects, we can launch a side-effect to initialize a callback. This is done when the composition initializes. After the composition is done, it is destroyed.

Under the non-suspended side effects, we will look at the `DisposableEffect` and `SideEffect`.

### DisposableEffect
`DisposableEffect` is used for side-effects that need to be fixed up once the keys change or if the composable departs the composition. 

In such a case where the `DisposableEffect` key updates, the composable must be able to destruct its current effect. This will be followed by calling the effect again to restart.

`DisposableEffect` is used to eliminate non-suspended effects. It commences when a composable starts and when the key of the composable updates.

It's necessary to throw a callback in the end. When the composable departs the composition, it is destroyed. 

This also happens when they key updates in every recomposition. In this case, the effect will be disposed of and relaunched.

Suppose we have a composable function to handle on-back pressed action as follows:

```kotlin
@Composable
fun MyComposable(backPressedDispatcher: OnBackPressedDispatcher) {
    val callback = remember {
        object:OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                // Perform some actions
            }
        }
    }
    DisposableEffect(backPressedDispatcher) { // restart if dispatcher changes
        backPressedDispatcher.addCallback(callback) //attach the call back here
        onDispose {
            callback.remove() // this prevents memory leaks
        }
    }
}
```

In this example, the dispatcher is called when the device's back button is pressed. Our `DisposableEffect` block will handle the back pressed dispatcher callback.

We intend to attach the callback when the composable begins the composition, as well as when the dispatcher updates. 

The dispatcher is used as the effect handler key to accomplish this functionality. In such a case, the effect will be disposed off and reintroduced.

You may provide a constant as the key if you just want the effect to execute once when it joins the composition and then dispose it when you leave. This can be done by:
`DisposableEffect(true)`or `DisposableEffect(Unit)`.

> It's worth noting that `DisposableEffect` always necessitates the use of at least one key.

### SideEffect
This is the simplest side-effect handler. It grants us access to a block of code that is executed after every successful composition.

```kotlin
var i = 0
@Composable
fun MyComposable(){
    i++ // incrementing this variable here will cause a side-effect
    Button(onClick = {}){
        Text(text = "Click")
    }
}
```

In the code above, we assume that we have a global variable `i` which we need to increment in our composable function. Incrementing `i` in the composable function will cause a side effects.

The value of the variable `i` will not be as per expectations after recomposition. This can be worse if you need to make a network call to update the UI inside the composable function without providing a safe environment to handle the side effect.

The best way to handle the side effect that may occur when you increment the variable `i` is by wrapping the code in a side effect block as shown below:

```kotlin
var i = 0
@Composable
fun MyComposable(){
    SideEffect { //this will handle the side effect that may occur
        i++
    }
    Button(onClick = {}){
        Text(text = "Click")
    }
}
```

The code inside the `SideEffect` block will be executed upon a successful composition. If the composition fails, the code will not be executed.

### Conclusion
In a Jetpack Compose app, you may encounter side-effects that you don't intend to handle in the `Composable`. 

At some point, we may want it to be tied to the lifecycle of the Composable. We make sure that it executes in the correct lifecycle phase. 

We also ensure that it gets stopped to avoid memory leaks, and runs in a `CoroutineContext`. This context is supplied by the effect handler.

---
Peer Review Contributions by: [Eric Gacoki](/engineering-education/authors/eric-gacoki/)
