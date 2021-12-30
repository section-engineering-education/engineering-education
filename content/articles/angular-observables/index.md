### Introduction
Observables concept in JavaScript is very crucial when it comes to asynchronous programming or whenever you're handling events. 

They play a significant role whenever message passage is required within an Angular application.

In this tutorial, we discuss the concepts of Observables, learn what they are, how they are used in Angular applications, and finally build a sample project.

### Table of contents
- [Introduction](#introduction)
- [Table of contents](#table-of-contents)
- [Prerequisites](#prerequisites)
- [Getting started with observables](#getting-started-with-observables)
- [Sample JavaScript observable](#sample-javascript-observable)
- [Setting up the project](#setting-up-the-project)
- [Define and create observables in Angular](#define-and-create-observables-in-angular)
- [Defining manual observables](#defining-manual-observables)
- [Conclusion](#conclusion)

### Prerequisites
- Basic knowledge of TypeScript and JavaScript.
- Basic knowledge of Angular 2+.
- Local development environment setup.
- Basic concepts of reactive programming, especially the RxJs.

### Getting started with observables
When discussing the concept of observables, we may think of a web application with a newsletter form where subscribers receive messages while no subscribers do not.

It's a declarative way of defining methods in your application for publishing specified values that won't be executed until a consumer subscribes.

One concept we always interact with when discussing observables is the use of an observer. Observers are used to defining the functions (callback). These methods include  `next()`, `error()`, and `complete()`.

The observer objects are typically passed to observable methods as arguments. Then, due to triggers such as events, the observable function calls these observer functions. 

### Sample JavaScript observable
With a basic idea on observables, let's implement a sample observer class to get in-depth knowledge on how they work.

Open `index.js` file and add the following:
```javascript
//define observable class here
class ObservableExample {
    //class constructor
    // add the argument to pass the function to take the observer
    constructor(methodToTakeObserver){
      this._methodToTakeObserver_ = methodToTakeObserver;
    }
    // add a subscriber method and pass observer as argument
    // this method returns function that takes an observer
    subscribe(observer) {
      return this._methodToTakeObserver_(observer)
    }
}
// create an instance of the observer class we defined above
let myObservableExample = new ObservableExample(observer => {
  setTimeout(() => {
    // observer next data executed after 5s
    observer.next("I have got the response!")
    observer.complete()
  }, 5000)
})
//

let myObserverExample = {
  next(response) {
    console.log(response)
  },
  error(err) {
    console.log(err)
  },
  complete() {
    console.log("The request has been completed successfully")
  }
}

myObservableExample.subscribe(myObserverExample)
// Upon execution
// ( 5 seconds) I have got the response!
// (5 seconds ) The request has been completed successfully
```

![observer response](/observer-response.png)

You notice from the above script that we define our class and its constructor. We then proceed to pass an argument to this constructor.

We then proceeded to define another function, `subscriber()`. It takes an argument, observer, and then passes to our defined constructor.

Next, we instantiate our class `ObservableExample` which is then assigned to our local variable `myObservableExample`.

Previously, we had created a constructor for this class; hence we pass in an observer as a parameter function.

Additionally, we use the timer method since we assume that an HTTP response takes some time hence the mimic. In our case, we use a rather worst-case scenario of 5s.

As you may recall, we discussed that observers have some methods. In this case, we call the `next()` and `complete()` operations.

Finally, we implement the callback functions that our observable sends. We then run our observable whenever a subscription occurs (via the `subscribe()` method).

### Setting up the project
Now that we've basic concepts of an observable, let's proceed and set up our Angular project.

First, open terminal (Ctrl+Alt+T), and run the following commands:
```bash
ng new observable-example
```

![project-setup](/project-setup.png)

Next, create an observable component by running the following commands:
```bash
ng g c observable
```

To ensure that obsevable component works effectively, edit the `app.component.html` template as shown below:
```html
<app-observable></app-observable>
```

Now your component is fully functional!

### Define and create observables in Angular
To create an observer is simple in Angular, unlike the previous example where we defined everything from scratch.

Here, we call the already defined class `Observable` and pass the necessary arguments, as we will see shortly.

Create an API service by running the following commands:
```bash
ng g s api
```

Next, proceed and edit the service as shown below:
```typescript
import {Observable} from "rxjs";
...
// define our class constructor
// inject the http client (Dependency injection)
constructor(private httpClient:HttpClient) { }
// a method to fetch all clients from some server 
public getAll(): Observable<any>{
   return this.httpClient.get('http://127.0.0.1:8080/api/clients');
 }
...
```

We have defined the above service since we interact primarily with observable concepts when making API requests in Angular.

Next, we are now sure that our api returns an observable. To subscribe to this observable, let's  now edit the observable component as shown below:
```typescript
...
clients$: Observable<User[]>
  constructor(private apiService:ApiService) { }

  ngOnInit(): void {
  }

  /**
   * get all users
   */
  getClients(){
    this.apiService.getAll()
      .subscribe(data => {
        this.clients$ = data;
      })
  }
...
```

Next, edit the template to list the clients as follows:
```html
<h3>Clients List</h3>
<ol>
    <li *ngFor="let client of clients$">
        {{ client.first_name }} {{ client.last_name }}
    </li>
</ol>
```

You notice from the script above that we're importing the service we had previously created. 

We then use the concept of dependency injection to inject this service into our component constructor.

We have also created a `User` interface to act as our user model. We then define the public property `clients$` with the suffix `$` to indicate that it's observable.

Next, we define the method `getClients()`. This method does that we subscribe to it such that whenever we receive the user's list, we get that value and pass it to the `clients$`.

We may also modify the `getClients()` method to handle errors that may result from the API.
```typescript
...
 getClients(){
    this.apiService.getAll()
      .subscribe(data => {
        this.clients$ = data;
      }, error=>{
          console.log(error);
      })
  }
...

```

Notice that we pass both the response and the error as callbacks, as we had defined them manually in the previous section.

Well, this is just one way of working with observables in Angular. The other way involves using pipes in the template, as we will learn shortly.
```typescript
...
// define another method in the observable component
  getClients2(){
    this.clients$ = this.apiService.getAll();
  }
```

The reason why this method is more efficient as compared to the previous is that it avoids memory leaks since our subscriptions are not left open. 

Additionally, this method ensures that we don't have to worry about our subscriptions management since it's being handled for us by the application.

Now that we understand the importance of this methods, let's edit our template to ensure subscription during the lifecycle of our component.
```html
<ol>
    <li *ngFor="let client of clients$ | async">
        {{ uclientser.first_name }}  {{ client.last_name }}
    </li>
</ol>
```

Notice that we're using the `async` pipe. The async pipe ensures an automatic `subscribe/unsubscribe`  operations of our observable.

### Defining manual observables
Previously, we defined our class for observables and worked on basic examples. 

However, JavaScript has a library, RxJS (Reactive Extension for Javascript), that we can use to handle our observables.

Now, create a file, `index.ts`, and edit it as followed:
```typescript
//import an observable from the rxjs
import { Observable } from "rxjs/Observable"
// next,create observable
const exampleObservable = new Observable((observer) => {}
...
```

After defining the above instance, you can follow our previous examples to implement observables that meet your needs.


### Conclusion
This article has explored the concepts of observables in both JavaScript, TypeScript, and Angular.

We have seen how to create a sample class to build our observables. However, we have also noticed alternatives to building observables in TypeScript.

This involves the use of reactive programming concepts, i'e RxJS.

Additionally, we have seen how we can subscribe to our observables in Angular. This involves the use of pipe and open subscription in the component.

Happy coding!
