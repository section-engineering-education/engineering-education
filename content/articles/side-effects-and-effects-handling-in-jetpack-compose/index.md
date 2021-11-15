### Side-effects and Effects Handling in Jetpack Compose
A side effect is everything that escapes the scope of a function. For compose specifically, this means that everything inside a composable function does not have anything to do with compose. Such effects can cause our app to fail by changing the state of the application outside the composable state. To handle these effects, we use Effects Handlers which is a safe environment to handle side-effects that may occur.

### Prerequisites
To follow along with this tutorial, the reader should:
- Have an understanding of the `Kotlin` programming language.
- Have a basic understanding and experience with `Compose`.
- Have a basic understanding of composable [lifecycle](https://developer.android.com/jetpack/compose/lifecycle)
- Have a basic understanding of [States](https://developer.android.com/jetpack/compose/state) in Jetpack Compose.
 
### Objective
 The reader will be able to do the following by the course of this tutorial:
- Understand what are Side-effects and how they occur.
- Know how to create side-effect-free Composables
- Know how to handle side-effects on our code

### Introduction
 There should be no negative consequences to utilizing composables. Effects should be invoked from a controlled environment that knows the lifecycle of the composable when they are needed to modify the app`s states. The Effect APIs are used when you need to modify the state of the program so that side effects are executed predictably. Let's get started and see how all this happens.
 
### Side-effects and how they occur
As we have seen, a side-effect is anything that goes outside of the scope of a composable function. Side effects can cause adverse effects to an app.  This is because they are capable to modify the state of the application beyond the scope of the composable. This implies that every time a composable function is invoked, it may respond differently. 

Composable functions run several times or even skip execution. This means that they cannot be completely depended on. Having to rely on their global state can result in problems
 
Compose has a number of strategies for dealing with side effects. This is done anytime it is desired in a safe environment. These techniques will assist in regulating the lifespan of side effects and removing them after they are no longer needed. There are several ways on how we can perform side-effects in Compose. We will look into some of these ways in this article.

### Effects Handlers
To tackle this, we will need to get some understanding of `@Compose` lifecycle. I will explain this briefly for better understanding. All we need to know is that Composables joins the composition when rendered on the screen and departs when they are removed from the UI tree. It might occur that effects will cross from one event to the next. Effects usually have a different lifespan and this means that some effects can have a long lifespan while others shorter lifespan. This will help in allowing you to utilize them in many compositions.

The effect handlers can be divided into two:
- Suspended side-effects
- Non-Suspended side-effects

### Suspended Effects
These are effects that may occur when we make a network call to load some data to be used for the UI state. Under the suspended effects, we have `rememberCoroutineScope` and `launchedEffect` techniques. 


### LaunchedEffect
`LaunchedEffect` may be used to do tasks during the lifetime of a composable. The coroutine will self-destruct if the composable quits composition, or is no longer shown on the screen. This will help in avoiding memory leaks.
Basically, the `lauchedEffect` does the following: 
 - When an effect enters composition, the `launchedEffect` executes it.
 - When an effect leaves composition, the `launchedEffect` cancels it.
 - When keys change, the effect is terminated and restarted.
 - We can use it to extend over a task in a composition.

Let's say we have a timer. We want this timer to start when a Composition of a composable begins and stop when the composition ends. We are going to do this regardless ending of the timer.
In such a scenario, we start the timer inside the `LaunchedEffect` block . When the composable departs composition, we don't have to bother about suspending or cleaning up timer-related code.
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
In the `launchedEffect` part of the aforementioned code, we call `initTimer()`. A toast will appear if the time completes, or when it terminated before it completes.
The `launchedEffect` block takes `key1` and `block` parameters. When the value of the first argument `key1` updates, the `launchedEffect` is notified to start the coroutine afresh and destroy the old one. The value of `key1` is Unit. This will prevent the coroutine from restarting depending upon the value. 
The second parameter is `block`. It is this composable's function that executes inside the coroutine scope.

###  RememberCoroutineScope
In some special cases, `launchedEffect` is not used because of the following reasons: 
- A `launchedEffect` is composable by itself. As a result, it will always begin with some other composable function.
- Using `launchedEffect` limits controlling coroutine lifecycle. There is no way to explicitly terminate the coroutine. This is because it starts and ends according to the Composable lifecycle.

Because of these constraints, we prefer to use `rememberCoroutineScope` in these circumstances.

> NOTE: `rememberCoroutineSope`  generally returns a scope. This method produces a CoroutineScope that may be used to construct tasks that are children of the composition.

By using it, we can initiate coroutines from any composables or callbacks. This can be done without  having to worry about the coroutine's lifespan.
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
The `rememberCoroutineScope()` method in the sample code is used to access the scope. It's worth noting that the scope is linked to the lifespan of the composable. So, if any coroutine is executing when this composable leaves composition, it will be stopped immediately.

When the button is clicked, the coroutine is launched. This will start the timer in 2 seconds. A toast will appear indicating that the timer has started. When 2 seconds elapses, another toast appears indicating that the time has ended.
> LaunchedEffect differs from RememberCoroutineScope in that it is used to scope tasks that are launched by the composition, whereas rememberCoroutineScope is used to scope tasks that are started by user interaction. 

### Non-Suspended Effects
In Non-Suspended effects, we can launch a side-effect to initialize a callback. This is done when the Composition of a composable begins. After the composition is done and the composable leaves composition, it is destructed.

Under the non-suspended side effects, we will only look at the `DisposableEffect` and `SideEffect`. You can also read more on `sideEffect` from [here](https://developer.android.com/jetpack/compose/side-effects)

### DisposableEffect
`DisposableEffect` is used for side-effects that need to be fixed up once the keys change or if the composable departs the Composition. In such a case where the `DisposableEffect` key updates, the Composable must be able to destruct its current effect. This will be followed by calling the effect again to restart.

Basically,  `DisposableEffect` is used to eliminate non-suspended effects. It commences when a Composable begins Composition and when the key of the Composable updates.

It is necessary to, in the end, throw a callback. When the composable departs the composition, it is usually destroyed. This also happens when they key updates in every recomposition.  In this case, the effect will be disposed of and relaunched.
Suppose we have a composable function to handle on-back-pressed action as follows:
```kotlin
    @Composable
    fun MyComposable(backPressedDispatcher: OnBackPressedDispatcher) {
        val callback = remember {
            object : OnBackPressedCallback(true) {
                override fun handleOnBackPressed() {
                    // Perform some actions
                }
            }
        }
        DisposableEffect(backPressedDispatcher) { // restart if dispatcher changes
            backPressedDispatcher.addCallback(callback) //attach the call back here
            onDispose {
                callback.remove() // this is done so as to refrain from memory leaks
            }
        }
    }
```
In this example, our back dispatcher is called when we press the back button on our phone. Our `DisposableEffect` block will handle the back pressed dispatcher callback. This will help us avoid side effects that can occur. We intend to attach the callback when the composable joins the composition, as well as when the dispatcher updates. The dispatcher is used as the effect handler key in order to accomplish this. In such a case, the effect will be disposed of and reintroduced.

When the Composable finishes Composition, the callback is destroyed.

You may provide a constant as the key if you just want the effect to execute once when it joins the composition and then dispose of it when you leave. This can be done by:
 `DisposableEffect(true)`or `DisposableEffect(Unit)`.
 
 > NOTE:  It's worth noting that `DisposableEffect` always necessitates the use of at least one key.
 
### SideEffect
This is the most simple side-effect handler. With it, we have access to a block of code that is executed after every successful recomposition of our composition. Let's have an example.

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
In the above code, we assume we have that we have a global variable `i` which we need to increment in our composable function. Incrementing `i` in the composable function will cause side effects. The value of the variable `i` will not be as per expectations. This can be worse if you need to make a network call to update the UI inside the composable function without providing a safe environment to handle the side effect.
So, the best way to handle the side effect that may occur when you increment the variable `i` is by wrapping the code performing the incrementation in a side effect block as follows:

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
So, the code inside the `SideEffect` block will be called once the Composable successfully recomposes. If the Composition fails, the code will not be executed.

 ### Conclusion
In any app, we can encounter side-effects that we don't intend to handle in the `@Composable` body immediately. This could be because at some point we may want it to be tied lifecycle of the Composable.   We make sure that it executes in the correct lifecycle phase. We also ensure that it gets a chance to be stopped to avoid memory leaks, and runs in a handy context `(CoroutineContext)`. This context is supplied by the effect handler when necessary by packaging it with the effective effect handler.

You can expound by reading more on effects handling on the official [Google Documentation](https://developer.android.com/jetpack/compose/side-effects).

Keep Composing
Happy Coding :)
