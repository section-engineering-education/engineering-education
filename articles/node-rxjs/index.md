---
layout: engineering-education
status: publish
published: true
url: /engineering-education/node-rxjs/
title: Node.js Rxjs
description: This article shows developers how to use the RxJs library and will also look at the various operators found in the library.
author: linus-muema
date: 2020-09-14T00:00:00-10:00
topics: [Node.js]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/node-rxjs/hero.jpg
    alt: RxJs image computer
---
ReactiveX stands for *Reactive Extensions*. It is a collection of projects done by the ReactiveX community. They bring asynchronous programming into different programming languages and platforms. Their observable patterns also help in making the code smaller (less) and easier to read.
<!--more-->

They also have a well-managed error handling mechanism. When compared to the old `try/catch` method, it performs better. Some of these projects include [RxJava](https://github.com/ReactiveX/RxJava), [RxJs](https://github.com/ReactiveX/rxjs), [RxSwift](https://github.com/ReactiveX/RxSwift), etc.

Companies like GitHub, Netflix, and Microsoft use these projects.

Today we will look at how we can add RxJs to our Node.js applications using Typescript. We will also look at the various operators found in the library.

To begin with, RxJs makes use of `observables` to observe and emit data. There are several ways to create observables. We can create them using the `create` function or use the `of`, `from`, `interval`, `range`, etc. operators. But, as from v.6+, `create` is deprecated and so we must create the Observable module.

```typescript
import {Observable} from 'rxjs'

const observable = new Observable(subscriber => {
    subscriber.next("Hello,")
    subscriber.next("My name is...")
    subscriber.next("Linus :)")
    subscriber.complete()
})

observable.subscribe({
    next: x =>  {console.log(x)},
    error: err => {console.log("Error : "+err)},
    complete: () => {console.log("Done...")}
})
```

From the code above, we import the Observable module. We then create the `Observable` object and pass the `subscriber` object as an argument. We will be calling the `subscribe callbacks` on this subscriber object. The methods are:

- `next` : executed when a value emission occurs
- `error` : executed when an error occurs
- `complete` : executed when emission ends. It does not emit values unlike the others. The output of the code above is:

![observer](/engineering-education/node-rxjs/rx-observer.png)

Another way to create an observable is by using the `interval` operator. This creates an observable that emits values after a specified duration.

```typescript
import { interval } from 'rxjs';

//Emits a number after every 2 seconds
interval(2000).subscribe(val => console.log(val));

//Output : 0,1,2,3,4....
```

It is as simple as that.

Another operator we will be looking at is the `merge` operator. This operator joins two or more observables into one observable. This means that data is emitted at once from all the observables.

```typescript
import {interval, merge} from "rxjs";
import {mapTo} from "rxjs/operators";

//emits every second
const ones = interval(1000);
//emit every 2 seconds
const twos = interval(2000);

merge(
    ones.pipe(mapTo("Ones")),
    twos.pipe(mapTo("Twos"))
).subscribe(val => console.log(val));

//Output : "Ones", "Twos", "Ones, "Ones", "Twos", "Ones", "Ones"...
```

In the code above, we created two observables. `ones` emits data after 1 second while `twos` emits after 2 seconds. We then use `merge` to join the two observables to one. Merge takes in the observables to join as arguments. But in our code we have something new: `pipe`.

This function is used to attach operators to observables. We have operators in RxJs to change the data emitted by the observables. In the code, I have used `mapTo` to change the value emitted to a String. The `pipe` function takes in operators as arguments. Then it applies them to the observable. We can have more than one operator in the pipe function. For more info, take a look at this [tutorial](https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer#pipe).

Our code emits data as follows...

```log
1st second : "Ones"
2nd second : "Twos", "Ones"
3rd second : "Ones"
4th second : "Twos", "Ones"
...
```

We also have the `map` operator. This is also used to change the values from an observable.

```typescript
import {from} from 'rxjs'
import {map} from "rxjs/operators";

from([1,2,3,4,5]).pipe(map(val => Math.pow(val, 2)))
    .subscribe(value => {console.log(value)})

//Output : 1,4,9,16,25
```

Here we have created an observable using the `from` operator. It creates observables from an array, promise or an iterable. It emits the values in the array one by one. Then we use `pipe` to attach operators to our observable. `map` takes every emitted value then squares it and the result is emitted.

The last operator we will look into is `filter`. As the name says, it is used to filter the emitted data based on a criteria. If the value does not meet the criteria, it is not emitted. Let's say we want to find even numbers in a list.

```typescript
import {from} from "rxjs";
import {filter} from "rxjs/operators";

from([1, 2, 3, 4, 5]).pipe(filter(val => val % 2 == 0))
    .subscribe(value => {console.log(value)})

//Output : 2,4
```

This checks if every value is an even number then emits the value. We can also filter out objects based on values.

```typescript
import {from} from "rxjs";
import {filter} from "rxjs/operators";

from([
    { name: 'Linus', age: 20 },
    { name: 'Lilly', age: 13 },
    { name: 'Peter', age: 17 },
    { name: 'Penny', age: 25 }
]).pipe(
    filter(user => user.age >= 18))
    .subscribe(value => { console.log(value.name +" is old enough to drink")})

/**
Output:
    * Linus is old enough to drink
    * Penny is old enough to drink
**/
```

These are some of the RxJs operators that you can use on your observables. There are many more operators with different functions. You can get more info from the [official documentation](https://github.com/ReactiveX/rxjs) or use [learnrxjs.io](https://www.learnrxjs.io/). The code samples can be found on [Github](https://github.com/LinusMuema/node-rxjs). Feel free to raise a PR or an issue.

---
Peer Review Contributions by: [Nadiv Gold Edelstein](/engineering-education/authors/nadiv-gold-edelstein/)
