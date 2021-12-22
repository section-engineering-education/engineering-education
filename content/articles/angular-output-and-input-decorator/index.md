---
layout: engineering-education
status: publish
published: true
url: /angular-output-and-input-decorator/
title: Angular Output and Input Decorators
description: In this article, we will learn how to create links between child and parent components using the input and output decorators in Angular.
author: odiwuor-amos
date: 2021-07-08T00:00:00-07:41
topics: [Languages]
excerpt_separator: <!--more-->
images:

  - url: /engineering-education/angular-output-and-input-decorator/hero.png
    alt: Angular input output decorator
---
By the end of this tutorial, you should be able to create a link between the parent and child Angular components. As we will discuss shortly, you will be able to 'talk' to other components, bypassing the default behavior of Angular of single directional data flow. 
<!--more-->
### Table of contents
- [Prerequisites](#prerequisites)
- [What's Angular @Output decorator](#whats-angular-output-decorator)
- [Exploring Child component](#exploring-child-component)
- [How does an Angular @Output work?](#how-does-an-angular-output-work)
- [Conclusion](#conclusion)

### Prerequisites
- Basics of [Angular](https://angular.io/docs) framework. This includes the data binding concept using the `ngModel` directive.  
- You should be well knowledgeable on the Angular components. How these components are created and interact with each other to build a full Angular application.

> To follow along with examples, ensure you've got a working application or follow [this](https://angular.io/docs) link to install a new application. 

### What are Angular's @Output and @Input decorators
By default, Angular supports data flow in one direction. This limits interactions between the parent and child components to share data. Luckily, Angular has a solution to this problem, the use of @Output and @Input.  

Let's use an example to understand this concept:

```HTML
<angular-parent-component>
  <angular-child-component></angular-child-component>
</angular-parent-component>
```

In the above example, we've both the parent (which acts as the child component context) and child component.  For these two components to communicate to each other, we need both the @Ouput and @Input decorators provided by Angular.

Now, these two decorators have distinct functions:  
1. @Ouput - A decorator that lets the child component communicates with the parent component.  
2. @Input - A decorator that allows the parent to communicates with the child component.

### Exploring child components
In this section, we're exploring how to create a link between the parent and the child component. Let's get started by following the instructions below:  

1: Create a new component `musicDetailsComponent` by running the following command:

```bash
ng g component music-details
```

#### Output
```bash
CREATE src/app/music-details/music-details.component.css (0 bytes)
CREATE src/app/music-details/music-details.component.html (28 bytes)
CREATE src/app/music-details/music-details.component.spec.ts (669 bytes)
CREATE src/app/music-details/music-details.component.ts (302 bytes)
UPDATE src/app/app.module.ts (422 bytes)

```

2: Update the `music-details.component.ts` with the following contents:

```javascript
// we import the `Input` decorator from Angular Core first.
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-music-details',
  templateUrl: './music-details.component.html',
  styleUrls: ['./music-details.component.css']
})
export class MusicDetailsComponent implements OnInit {

  // in this line, we've a property MusiciaName declared as an Input.(refer to Input decorator role in the previous section)
  @Input () musicianName: string | undefined;
  constructor() { }

  ngOnInit(): void {
  }
}
```

As shown above, the `@Input` decorator is applied to the `musicianName` property, consequently decorating it. This implies that the value of the `musicianName` will be derived from the parent component.  

3: Display the `musicianName` in the template:

```html
<p>
  The divide is the third studio album by the world-renown English singer, {{musicianName}}
</p>

```

4: Using parent component.
Now that we've defined our `musicianName` property in the child component, let's see how we can pass it a value from the parent component.  

In the `app.component.html` which is our parent component, add the following:

```html
<!-- We're using the child selectors in the parent component -->
<app-music-details></app-music-details>
```

5: Assign musician a name in the parent component's `app.component.ts`:

```javascript
-------------------------------
export class AppComponent {
  name = 'Edward Christopher Sheeran';
}
---------------------------------
```

Now that we've the musician name, the parent component passes this value to the child component as shown below using the `@Output` decorator:  

```html
<!-- update the app.component.ts file as shown below -->
<app-music-details [musicianName]="name"></app-music-details>

```

In the above example, we pass the value of the `musicianName` using the parent `name` property which we defined in the parent component and assigned the value to.  

Serve the application by running the following command:  

```bash
ng serve
```

#### Output

![Input decorator output](/engineering-education/angular-output-and-input-decorator/input.png)

### How does Angular's @Output work?
In the previous section, we explored the usage of the child component and how to use the `@Input` decorator. In this section, we look at the `@Output` decorator, which is the reverse of the `@Input` decorator.

This decorator allows for the sharing of data from the child component. It invokes an event that in turn notifies the parent component.  

> It's important to note that the `@Output` decorator uses `EventEmitter` from the `angular/core` to accomplish its task. We import it as shown below:

```ts
import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

```

Edit the previous child component as shown below:

```javascript
export class MusicDetailsComponent implements OnInit {

  @Input() musicianName: string | undefined;
  @Output() newMusicianEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  /**
   * add new musician
   * @param value
   */
  addNewArtist(val: string) {
    this.newMusicianEvent.emit(val);
  }
```

```html
<label>Add a Musician: <input #newArtist ></label><button type="button" (click)="addNewArtist(newArtist.value)">Add to parent's  musician list</button>
```

In the above children component, we create an event to add new artists to our already existing list in the parent component.  

In the template, we provide users with input to add artists.  

In the parent component, add the following:  

```html
<app-music-details [musicianName]="name" (newMusicianEvent)="addArtists($event)"></app-music-details>
<ul>
  <li *ngFor="let musician of musicians">{{musician}}</li>
</ul>
```

```javascript
export class AppComponent {
  musicians = ['Ed Sheeran', 'Prince Indah', 'Emma Jalamo'];
  name: string | undefined;
  addArtists(newMusician: any) {
    this.name = newMusician;
    this.musicians.push(newMusician);
  }
```
#### Initial output

![Initial Application](/engineering-education/angular-output-and-input-decorator/original-output.png)

#### Output on adding a new artist

![Initial Application](/engineering-education/angular-output-and-input-decorator/added-artist.png)

In this parent component, we define a method to add new artists while in the template we have an event handler that picks new musicians then loops the list to display.

### Conclusion
In this tutorial, we've seen how we can use the `@Input()` and the `@Output()` decorators. We've worked with examples to see how we can share data between the child and the parent components. We also worked with the `EventEmitter` class to create events for the main component from the child component.  

For more examples, visit my [GitHub](https://github.com/odiwuoramos/angular-output) for complete code.

Happy coding!

---
Peer Review Contributions by: [Adrian Murage](/engineering-education/authors/adrian-murage/)